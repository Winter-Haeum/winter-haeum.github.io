/**
 * CompareDocsTab — 두 교안 비교 탭
 *
 * buildSearchIndex()/getDoc()를 그대로 재사용해 문서 목록과 원문을 가져오고,
 * docStructure의 추출 함수로 얻은 실제 개념 섹션·핵심 요약을 나란히 표시한다.
 * 두 문서의 차이점을 새로 생성하지 않는다(1차 버전 범위 제외).
 *
 * Props:
 * @param {object} defaultDocMeta - 현재 보고 있는 문서 { category, section, slug, url } [Optional]
 *   제공되면 좌측 선택값의 초기값으로 사용하고, 두 컬럼 중 이 url과 같은 쪽은
 *   "원문" 링크 대신 "현재 문서"로 표시한다(같은 경로로의 Link는 클릭해도
 *   반응이 없어 실사용 중 "바로가기가 안 된다"처럼 보이는 문제가 있었다).
 *
 * 교안 2 기본 동작: 교안 1과 같은 카테고리(실제 문서 ID의 category, 제목 텍스트
 * 매칭 아님)만 선택지로 보여준다. "전체 카테고리에서 선택"을 켜면 카테고리 제한을
 * 풀고 전체 문서를 보여준다. 카테고리 전환/변경으로 두 선택이 서로 다른 카테고리가
 * 되어도 선택값은 그대로 두고 안내 문구만 보여준다(임의로 선택 해제하지 않음).
 *
 * Example usage:
 * <CompareDocsTab defaultDocMeta={{ category, section, slug }} />
 */
import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { buildSearchIndex, getDoc } from '@/utils/markdownLoader';
import { categories } from '@/data/navigation';
import { extractConceptSections, extractKeySummary } from '@/utils/docStructure';

// Autocomplete 옵션이 많을 때(전체 카테고리 184개) 팝업 높이가 뷰포트 위치에 따라
// 짧게 잡혀 "일부가 빠진 것처럼" 보이던 문제 — 목록 높이를 명시적으로 고정해 항상
// 충분한 스크롤 영역을 보장한다(디자인은 기존 그대로, 높이만 지정).
const LISTBOX_SLOT_PROPS = { listbox: { style: { maxHeight: 320, overflow: 'auto' } } };

// navigation.js의 카테고리 순서(사이드바와 동일 순서)를 그대로 그룹 순서로 사용한다.
// MUI Autocomplete의 groupBy는 옵션 배열에서 그룹 값이 바뀌는 지점마다 새 그룹을
// 시작하므로, 배열 자체가 카테고리 기준으로 미리 정렬돼 있지 않으면(예: 제목만으로
// 정렬) 같은 카테고리가 여러 조각으로 쪼개져 나타난다 — 실사용 중 발견된 버그.
const CATEGORY_ORDER = new Map(categories.map((c, i) => [c.slug, i]));

/**
 * 문서 선택 Autocomplete의 옵션 한 줄 — 제목 + 섹션(폴더) 보조 텍스트.
 * 같은 제목의 문서가 생기더라도 섹션으로 구별할 수 있도록 항상 두 줄로 표시한다.
 * MUI v6+ 는 renderOption의 key를 props에서 분리해서 넘기므로 구조분해로 꺼내 써야 한다.
 */
function renderDocOption(props, option) {
  const { key, ...optionProps } = props;
  return (
    <Box component='li' key={key} {...optionProps} sx={{ display: 'block !important', py: '6px !important' }}>
      <Typography variant='body2' sx={{ fontWeight: 600, lineHeight: 1.4 }}>{option.title}</Typography>
      <Typography variant='caption' sx={{ color: 'text.disabled' }}>{option.section}</Typography>
    </Box>
  );
}

function useAllDocs() {
  const [docs, setDocs] = useState(null);
  useEffect(() => {
    let active = true;
    buildSearchIndex().then((items) => {
      if (!active) return;
      const sorted = [...items].sort((a, b) => {
        const ca = CATEGORY_ORDER.get(a.category) ?? Number.MAX_SAFE_INTEGER;
        const cb = CATEGORY_ORDER.get(b.category) ?? Number.MAX_SAFE_INTEGER;
        if (ca !== cb) return ca - cb;
        if (a.section !== b.section) return a.section.localeCompare(b.section, 'ko');
        return a.title.localeCompare(b.title, 'ko');
      });
      setDocs(sorted);
    });
    return () => { active = false; };
  }, []);
  return docs;
}

function useDocContent(item) {
  const key = item ? `${item.category}/${item.section}/${item.slug}` : null;
  // key가 바뀌면(선택 문서 변경) 렌더링 중에 즉시 content를 초기화한다.
  // React 공식 "Adjusting state when a prop changes" 패턴 — effect 아님(doc-page.jsx와 동일 패턴).
  const [loadedKey, setLoadedKey] = useState(null);
  const [content, setContent] = useState(null);
  if (key !== loadedKey) {
    setLoadedKey(key);
    setContent(null);
  }

  useEffect(() => {
    if (!item) return undefined;
    let active = true;
    getDoc(item.category, item.section, item.slug).then((doc) => {
      if (active) setContent(doc?.content ?? '');
    });
    return () => { active = false; };
  }, [item]);

  return content;
}

function DocColumn({ item, currentUrl }) {
  const content = useDocContent(item);
  const category = item ? categories.find((c) => c.slug === item.category) : null;
  const isCurrentDoc = Boolean(item && currentUrl && item.url === currentUrl);

  if (!item) {
    return (
      <Box
        sx={(theme) => ({
          flex: 1,
          minWidth: 0,
          border: '1px dashed',
          borderColor: theme.palette.divider,
          borderRadius: '10px',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        })}
      >
        <Typography variant='body2' sx={{ color: 'text.disabled' }}>비교할 교안을 선택하세요.</Typography>
      </Box>
    );
  }

  if (content === null) {
    return (
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'center', py: 3 }}>
        <CircularProgress size={20} />
      </Box>
    );
  }

  const concepts = extractConceptSections(content);
  const summary = extractKeySummary(content);

  return (
    <Box
      sx={(theme) => ({
        flex: 1,
        minWidth: 0,
        border: '1px solid',
        borderColor: theme.palette.divider,
        borderRadius: '10px',
        p: 2,
      })}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, mb: 1.5 }}>
        <Typography
          variant='body2'
          sx={{ fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {category && <Box component='span' aria-hidden='true' sx={{ mr: 0.5 }}>{category.emoji}</Box>}
          {item.title}
        </Typography>
        {isCurrentDoc ? (
          <Typography
            variant='caption'
            sx={{ color: 'text.disabled', flexShrink: 0, fontStyle: 'italic' }}
          >
            현재 문서
          </Typography>
        ) : (
          <Box
            component={Link}
            to={item.url}
            sx={(theme) => ({
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.4,
              fontSize: '0.75rem',
              color: theme.palette.primary.main,
              textDecoration: 'none',
              flexShrink: 0,
              '&:hover': { textDecoration: 'underline' },
              '&:focus-visible': { outline: `2px solid ${theme.palette.primary.main}`, outlineOffset: '2px' },
            })}
          >
            <OpenInNewIcon sx={{ fontSize: '0.85rem' }} /> 원문
          </Box>
        )}
      </Box>

      <Typography variant='caption' sx={{ color: 'text.disabled', display: 'block', mb: 0.5 }}>핵심 개념</Typography>
      {concepts.length ? (
        <Box component='ul' sx={{ m: 0, mb: 1.5, pl: 2.25 }}>
          {concepts.map((c, i) => (
            <Typography key={i} component='li' variant='body2' sx={{ lineHeight: 1.55 }}>{c}</Typography>
          ))}
        </Box>
      ) : (
        <Typography variant='body2' sx={{ color: 'text.disabled', fontStyle: 'italic', mb: 1.5 }}>
          구분된 개념 섹션이 없습니다.
        </Typography>
      )}

      <Typography variant='caption' sx={{ color: 'text.disabled', display: 'block', mb: 0.5 }}>핵심 정리 원문</Typography>
      {summary ? (
        <Box component='ul' sx={{ m: 0, pl: 2.25 }}>
          {summary.map((s, i) => (
            <Typography key={i} component='li' variant='body2' sx={{ lineHeight: 1.55, color: 'text.secondary' }}>
              {s}
            </Typography>
          ))}
        </Box>
      ) : (
        <Typography variant='body2' sx={{ color: 'text.disabled', fontStyle: 'italic' }}>
          핵심 요약 섹션이 없습니다.
        </Typography>
      )}
    </Box>
  );
}

function CompareDocsTab({ defaultDocMeta }) {
  const docs = useAllDocs();
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);
  const [showAllCategories, setShowAllCategories] = useState(false);
  // 문서 목록이 처음 준비됐을 때 한 번만 현재 문서를 좌측 기본값으로 채운다.
  // docs 참조가 바뀌는 시점(최초 로딩 완료 1회)을 렌더링 중에 비교 — effect 아님(useDocContent와 동일 패턴).
  const [initializedFor, setInitializedFor] = useState(null);
  if (docs && initializedFor !== docs) {
    setInitializedFor(docs);
    if (defaultDocMeta) {
      const match = docs.find(
        (d) => d.category === defaultDocMeta.category && d.section === defaultDocMeta.section && d.slug === defaultDocMeta.slug
      );
      if (match) setLeft(match);
    }
  }

  // 교안 2 옵션 — 기본은 교안 1과 같은 카테고리(문서 ID의 category 필드 기준,
  // 제목 텍스트 매칭 아님)만. "전체 카테고리에서 선택"이 켜져 있거나 교안 1이
  // 아직 없으면 전체 문서를 보여준다.
  const rightOptions = useMemo(() => {
    if (!docs) return [];
    if (showAllCategories || !left) return docs;
    return docs.filter((d) => d.category === left.category);
  }, [docs, showAllCategories, left]);

  const leftCategoryName = left ? categories.find((c) => c.slug === left.category)?.name ?? left.category : null;
  const rightCategoryName = right ? categories.find((c) => c.slug === right.category)?.name ?? right.category : null;
  // 카테고리 필터가 꺼진 상태에서 두 선택이 서로 다른 카테고리가 되는 경우
  // (교안 1을 바꿨거나, 전체 카테고리를 껐을 때) — 선택을 임의로 지우지 않고
  // 안내만 보여준다.
  const categoryMismatch = Boolean(
    !showAllCategories && left && right && right.category !== left.category
  );

  return (
    <Box>
      <Typography variant='body2' sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.6 }}>
        두 교안을 선택하면 각 문서의 실제 개념 섹션과 핵심 요약 원문을 나란히 보여줍니다.
        새로운 비교 설명을 만들지 않고, 두 문서에 각각 적힌 내용만 그대로 표시합니다.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5, mb: 1 }}>
        <Autocomplete
          options={docs ?? []}
          loading={!docs}
          value={left}
          onChange={(_, v) => setLeft(v)}
          getOptionLabel={(o) => o.title}
          groupBy={(o) => categories.find((c) => c.slug === o.category)?.name ?? o.category}
          isOptionEqualToValue={(o, v) => o.id === v.id}
          renderOption={renderDocOption}
          slotProps={LISTBOX_SLOT_PROPS}
          renderInput={(params) => <TextField {...params} label='교안 1' size='small' />}
          sx={{ flex: 1 }}
        />
        <Autocomplete
          options={rightOptions}
          loading={!docs}
          value={right}
          onChange={(_, v) => setRight(v)}
          getOptionLabel={(o) => o.title}
          groupBy={(o) => categories.find((c) => c.slug === o.category)?.name ?? o.category}
          isOptionEqualToValue={(o, v) => o.id === v.id}
          renderOption={renderDocOption}
          slotProps={LISTBOX_SLOT_PROPS}
          renderInput={(params) => <TextField {...params} label='교안 2' size='small' />}
          sx={{ flex: 1 }}
        />
      </Box>

      <FormControlLabel
        sx={{ mb: 2, ml: 0 }}
        control={
          <Switch
            size='small'
            checked={showAllCategories}
            onChange={(e) => setShowAllCategories(e.target.checked)}
          />
        }
        label={
          <Typography variant='caption' sx={{ color: 'text.secondary' }}>
            전체 카테고리에서 선택{left && !showAllCategories ? ` (현재: ${leftCategoryName}만 표시)` : ''}
          </Typography>
        }
      />

      {categoryMismatch && (
        <Alert severity='info' sx={{ mb: 2.5, fontSize: '0.82rem' }}>
          교안 2({rightCategoryName})가 교안 1({leftCategoryName})과 다른 카테고리입니다. 이대로 비교할 수 있고,
          같은 카테고리에서 다시 고르려면 아래 목록(현재 {leftCategoryName}만 표시)에서 선택하거나
          위의 &lsquo;전체 카테고리에서 선택&rsquo;을 켜세요.
        </Alert>
      )}

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
        <DocColumn item={left} currentUrl={defaultDocMeta?.url} />
        <DocColumn item={right} currentUrl={defaultDocMeta?.url} />
      </Box>
    </Box>
  );
}

export default CompareDocsTab;
