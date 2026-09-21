/**
 * QuestionSearchTab — 교안 질문 검색 탭
 *
 * 기존 useSearchIndex()(Fuse.js)를 그대로 재사용해 질문(자연어) 검색을 수행하고,
 * docStructure.scoreRelevance()로 "실제 단어가 함께/가까이 등장하는지"를 기준으로
 * 후처리(재정렬 · 약한 매치 제외/안내)만 이 컴포넌트 내부에서 수행한다.
 * 새 검색 인덱스를 만들지 않으며, 결과는 실제 교안 원문에서 발췌한 텍스트만
 * "검색 결과"로 표시한다 — AI가 작성한 답변처럼 보이는 문구는 쓰지 않는다.
 *
 * "교안 바로가기"를 누르면 검색어를 ?find= 쿼리로 실어 이동시켜, 문서 페이지의
 * DocFindBar가 자동으로 그 자리를 찾아 하이라이트하도록 한다. 단, 결과가 현재
 * 보고 있는 문서 자신이면 같은 경로로의 Link는 클릭해도 아무 반응이 없어
 * "링크가 안 눌린다"처럼 보이므로, 그 경우는 링크 대신 "현재 보고 있는 문서"로
 * 표시한다.
 *
 * Props:
 * @param {object} currentDocMeta - 현재 문서 { category, section, slug, url } [Optional]
 *
 * Example usage:
 * <QuestionSearchTab currentDocMeta={{ category, section, slug, url }} />
 */
import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import SearchBar from '@/components/ui/SearchBar';
import StatusBadge from '@/components/ui/StatusBadge';
import { useSearchIndex } from '@/hooks/use-search-index';
import { categories } from '@/data/navigation';
import { buildExcerpt, scoreRelevance } from '@/utils/docStructure';

const CANDIDATE_POOL = 40; // Fuse에서 넉넉히 뽑은 뒤 관련성 재정렬·필터링
const RESULT_LIMIT = 10;

function QuestionSearchTab({ currentDocMeta }) {
  const [query, setQuery] = useState('');
  const { fuse, indexing, indexError } = useSearchIndex();

  const results = useMemo(() => {
    if (!fuse || !query.trim()) return null;
    const raw = fuse.search(query.trim(), { limit: CANDIDATE_POOL });
    return raw
      .map((r) => ({ ...r, relevance: scoreRelevance(r.item, query) }))
      .filter((r) => r.relevance.tier < 5) // 실제 단어가 전혀 없는 순수 퍼지매치는 제외
      .sort((a, b) => a.relevance.tier - b.relevance.tier || a.refIndex - b.refIndex)
      .slice(0, RESULT_LIMIT);
  }, [fuse, query]);

  const hasQuery = query.trim().length > 0;
  const showEmpty = !indexing && !indexError && hasQuery && Array.isArray(results) && results.length === 0;
  const findQueryString = `?find=${encodeURIComponent(query.trim())}`;

  return (
    <Box>
      <Typography variant='body2' sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.6 }}>
        궁금한 내용을 입력하면 기존 교안 검색(Fuse.js)으로 제목·내용이 비슷한 문서를 찾아드립니다.
        AI가 새로 작성한 답변이 아니라 검색 결과이며, 실제로 질문에 대한 답이 되는지는 원문에서 직접 확인해주세요.
      </Typography>

      <SearchBar
        value={query}
        onChange={setQuery}
        onClear={() => setQuery('')}
        isLoading={indexing}
        autoFocus={false}
      />

      {indexError && (
        <Typography variant='body2' sx={{ color: 'error.main', mt: 2 }}>
          검색 인덱스를 불러오지 못했습니다. 페이지를 새로고침해주세요.
        </Typography>
      )}

      {!indexError && hasQuery && indexing && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress size={22} />
        </Box>
      )}

      {showEmpty && (
        <Typography variant='body2' sx={{ color: 'text.disabled', mt: 3 }}>
          관련 내용을 찾지 못했습니다. 다른 키워드로 다시 질문해보세요.
        </Typography>
      )}

      {!indexing && Array.isArray(results) && results.length > 0 && (
        <Box
          component='ul'
          role='list'
          aria-label='질문 검색 결과'
          sx={{ listStyle: 'none', m: 0, mt: 2.5, p: 0, display: 'flex', flexDirection: 'column', gap: 1.25 }}
        >
          {results.map(({ item, relevance }) => {
            const category = categories.find((c) => c.slug === item.category);
            const excerpt = buildExcerpt(item, query);
            const isCurrentDoc = currentDocMeta?.url && item.url === currentDocMeta.url;
            const target = { pathname: item.url, search: findQueryString };

            return (
              <Box
                component='li'
                key={item.id}
                sx={(theme) => ({
                  border: '1px solid',
                  borderColor: theme.palette.divider,
                  borderRadius: '10px',
                  p: 2,
                })}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, mb: 0.75 }}>
                  <Typography
                    variant='caption'
                    sx={{ color: 'text.disabled', display: 'flex', alignItems: 'center', gap: 0.5 }}
                  >
                    {category && (
                      <Box component='span' aria-hidden='true'>{category.emoji}</Box>
                    )}
                    {category?.name ?? item.category}
                    {item.isIndex && <Box component='span' sx={{ ml: 0.5 }}>· 섹션</Box>}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    {relevance.tier === 4 && (
                      <Chip
                        label='일부 단어만 일치'
                        size='small'
                        variant='outlined'
                        sx={{ fontSize: '0.65rem', height: '20px', color: 'text.disabled', borderColor: 'divider' }}
                      />
                    )}
                    {item.status && <StatusBadge status={item.status} />}
                  </Box>
                </Box>

                {isCurrentDoc ? (
                  <Typography
                    sx={{ display: 'block', fontWeight: 700, fontSize: '0.92rem', color: 'text.primary', mb: 0.5 }}
                  >
                    {item.title}
                  </Typography>
                ) : (
                  <Box
                    component={Link}
                    to={target}
                    sx={(theme) => ({
                      display: 'block',
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      color: theme.palette.text.primary,
                      textDecoration: 'none',
                      mb: 0.5,
                      '&:hover': { color: theme.palette.primary.main },
                      '&:focus-visible': {
                        outline: `2px solid ${theme.palette.primary.main}`,
                        outlineOffset: '2px',
                      },
                    })}
                  >
                    {item.title}
                  </Box>
                )}

                {excerpt ? (
                  <Typography variant='body2' sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    “{excerpt}”
                  </Typography>
                ) : (
                  item.description && (
                    <Typography variant='body2' sx={{ color: 'text.disabled', lineHeight: 1.6, fontStyle: 'italic' }}>
                      {item.description}
                    </Typography>
                  )
                )}

                {isCurrentDoc ? (
                  <Typography
                    variant='caption'
                    sx={{ display: 'inline-block', mt: 1, color: 'text.disabled', fontStyle: 'italic' }}
                  >
                    현재 보고 있는 문서입니다
                  </Typography>
                ) : (
                  <Box
                    component={Link}
                    to={target}
                    sx={(theme) => ({
                      display: 'inline-block',
                      mt: 1,
                      fontSize: '0.78rem',
                      color: theme.palette.primary.main,
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                      '&:focus-visible': {
                        outline: `2px solid ${theme.palette.primary.main}`,
                        outlineOffset: '2px',
                      },
                    })}
                  >
                    교안 바로가기 →
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}

export default QuestionSearchTab;
