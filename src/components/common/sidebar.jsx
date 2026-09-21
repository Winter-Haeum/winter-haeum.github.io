/**
 * Sidebar — Accordion 카테고리 탐색 사이드바
 *
 * nestedSidebar 카테고리는 섹션이 2단계 Accordion으로 표시되고
 * sectionDocs에 정의된 문서가 3단계 항목으로 노출된다.
 *
 * Props:
 * @param {string} currentCategoryId    - 현재 활성 카테고리 id [Required]
 * @param {string} [currentSectionSlug] - 현재 활성 섹션 슬러그 [Optional]
 * @param {string} [currentDocSlug]     - 현재 활성 문서 슬러그 [Optional] — 한 단원에 여러 폴더의
 *                                        문서가 섞여 있을 때(예: 함수 · 배열 · 객체) 활성 단원을 판별하는 데 사용
 *
 * Example usage:
 * <Sidebar currentCategoryId='frontend' />
 * <Sidebar currentCategoryId='ai-vibe-coding' currentSectionSlug='setup' />
 */
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useLocation } from 'react-router-dom';
import { categories } from '@/data/navigation';
import { slugify, stripSectionNumber } from '@/utils/slugify';

/**
 * currentSectionSlug(URL의 section 파라미터)는 표시 단원의 슬러그일 수도 있고,
 * (JavaScript처럼) 문서가 실제로 위치한 콘텐츠 폴더명일 수도 있다.
 * 폴더명이 표시 단원 슬러그와 다른 경우, sectionDocs를 역으로 검색해 문서가 속한
 * 표시 단원을 찾아 그 단원의 Accordion 키를 반환한다 (doc-page.jsx의 groupSlug 계산과 동일한 방식).
 */
function resolveOpenSectionKey(categoryId, sectionSlug, docSlug) {
  if (!sectionSlug) return null;

  const cat = categories.find((c) => c.id === categoryId);
  if (!cat?.nestedSidebar) return `${categoryId}/${sectionSlug}`;

  const directMatch = cat.sections.find((s) => slugify(s) === sectionSlug);
  if (directMatch) return `${categoryId}/${sectionSlug}`;

  const sectionViaFolder = cat.sectionDocs
    ? Object.keys(cat.sectionDocs).find((name) =>
        cat.sectionDocs[name].some(
          (d) => d.slug === docSlug && (d.folder ?? slugify(name)) === sectionSlug
        )
      )
    : null;

  return sectionViaFolder ? `${categoryId}/${slugify(sectionViaFolder)}` : `${categoryId}/${sectionSlug}`;
}

function Sidebar({ currentCategoryId, currentSectionSlug, currentDocSlug }) {
  const location = useLocation();

  // Accordion — 한 번에 하나의 카테고리만 열림
  const [openCategoryId, setOpenCategoryId] = useState(currentCategoryId);

  // Accordion — 한 번에 하나의 섹션만 열림 (nestedSidebar용)
  const [openSectionKey, setOpenSectionKey] = useState(
    resolveOpenSectionKey(currentCategoryId, currentSectionSlug, currentDocSlug)
  );

  // currentCategoryId prop이 바뀌면 렌더링 중에 즉시 openCategoryId를 동기화한다
  // (effect 안에서 setState를 동기 호출하지 않기 위한 render-phase adjustment 패턴 —
  // React 공식 문서의 "Adjusting state when a prop changes"와 동일).
  const [prevCategoryId, setPrevCategoryId] = useState(currentCategoryId);
  if (currentCategoryId !== prevCategoryId) {
    setPrevCategoryId(currentCategoryId);
    setOpenCategoryId(currentCategoryId);
  }

  // currentSectionSlug/currentDocSlug 등 섹션 관련 prop이 바뀌면 렌더링 중에 즉시
  // openSectionKey를 재계산한다 (위와 동일한 이유). currentSectionSlug가 없을 때는
  // 기존 effect처럼 아무 것도 하지 않는다(카테고리 페이지 등에서 섹션 아코디언 상태를
  // 그대로 유지).
  const [prevSectionParams, setPrevSectionParams] = useState([currentCategoryId, currentSectionSlug, currentDocSlug]);
  const sectionParamsChanged =
    currentSectionSlug &&
    (currentCategoryId !== prevSectionParams[0]
      || currentSectionSlug !== prevSectionParams[1]
      || currentDocSlug !== prevSectionParams[2]);
  if (sectionParamsChanged) {
    setPrevSectionParams([currentCategoryId, currentSectionSlug, currentDocSlug]);
    setOpenSectionKey(resolveOpenSectionKey(currentCategoryId, currentSectionSlug, currentDocSlug));
  }

  const toggle = (catId) => {
    setOpenCategoryId((prev) => (prev === catId ? null : catId));
  };

  const toggleSection = (key) => {
    setOpenSectionKey((prev) => (prev === key ? null : key));
  };

  return (
    <>
      {/* 레이아웃 공간 확보 — 실제 사이드바는 position: fixed */}
      <Box
        aria-hidden='true'
        sx={{ width: 260, flexShrink: 0, display: { xs: 'none', lg: 'block' } }}
      />
      <Box
        component='aside'
        aria-label='카테고리 탐색'
        sx={(theme) => ({
          width: 260,
          flexShrink: 0,
          display: { xs: 'none', lg: 'block' },
          borderRight: '1px solid',
          borderColor: theme.palette.divider,
          backgroundColor: theme.palette.background.default,
          position: 'fixed',
          top: '64px',
          left: 0,
          height: 'calc(100vh - 64px)',
          overflowY: 'auto',
          py: 3,
          zIndex: theme.zIndex.appBar - 1,
        })}
      >
      <Typography
        variant='overline'
        component='p'
        sx={{ color: 'text.disabled', px: 2.5, mb: 1 }}
      >
        Categories
      </Typography>

      <Box component='nav' aria-label='카테고리 목록'>
        {categories.map((cat) => {
          const isActive = cat.id === currentCategoryId;
          const isExpanded = openCategoryId === cat.id;
          const isNested = Boolean(cat.nestedSidebar);

          return (
            <Box key={cat.id}>

              {/* 카테고리 행 */}
              <Box
                sx={(theme) => ({
                  display: 'flex',
                  alignItems: 'center',
                  borderLeft: '2px solid',
                  transition: 'background-color 0.1s ease',
                  ...(isActive
                    ? {
                        borderLeftColor: theme.palette.primary.main,
                        backgroundColor: theme.palette.mode === 'light' ? '#EDE8FA' : '#2A2544',
                      }
                    : {
                        borderLeftColor: 'transparent',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'light' ? '#F6F3FE' : '#221E38',
                        },
                      }),
                  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                })}
              >
                <Box
                  component={Link}
                  to={`/${cat.slug}`}
                  sx={(theme) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    pl: 2.5,
                    pr: 0.5,
                    py: 0.875,
                    flex: 1,
                    minWidth: 0,
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    ...(isActive
                      ? { color: theme.palette.primary.main, fontWeight: 600 }
                      : {
                          color: theme.palette.text.secondary,
                          fontWeight: 400,
                          '&:hover': { color: theme.palette.text.primary },
                        }),
                    '&:focus-visible': {
                      outline: `2px solid ${theme.palette.primary.main}`,
                      outlineOffset: '-2px',
                    },
                  })}
                >
                  <Box component='span' aria-hidden='true' sx={{ fontSize: '1rem', flexShrink: 0, lineHeight: 1 }}>
                    {cat.emoji}
                  </Box>
                  <Box component='span' sx={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {cat.name}
                  </Box>
                </Box>

                <IconButton
                  size='small'
                  onClick={() => toggle(cat.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`sidebar-sections-${cat.id}`}
                  aria-label={`${cat.name} 섹션 목록 ${isExpanded ? '닫기' : '열기'}`}
                  sx={(theme) => ({
                    mr: 1,
                    flexShrink: 0,
                    borderRadius: '4px',
                    color: isActive ? theme.palette.primary.main : theme.palette.text.disabled,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                      color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                    },
                    '&:focus-visible': {
                      outline: `2px solid ${theme.palette.primary.main}`,
                      outlineOffset: '2px',
                    },
                  })}
                >
                  <ExpandMoreIcon
                    sx={{
                      fontSize: '1rem',
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                      '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                    }}
                  />
                </IconButton>
              </Box>

              {/* 섹션 목록 */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateRows: isExpanded ? '1fr' : '0fr',
                  transition: 'grid-template-rows 0.25s ease',
                  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                }}
              >
                <Box
                  id={`sidebar-sections-${cat.id}`}
                  component='ul'
                  role='list'
                  aria-hidden={isExpanded ? undefined : true}
                  sx={{ overflow: 'hidden', listStyle: 'none', m: 0, p: 0 }}
                >
                  {cat.sections.map((section) => {
                    const sectionSlug = slugify(section);

                    if (isNested) {
                      // ── 3단계 Accordion (nestedSidebar) ────────────────
                      const sectionKey = `${cat.id}/${sectionSlug}`;
                      const docs = cat.sectionDocs?.[section] ?? [];
                      const isSectionActive = isActive && (
                        currentSectionSlug === sectionSlug
                        || docs.some((d) => d.slug === currentDocSlug)
                      );
                      const isOnSectionPage = location.pathname === `/${cat.slug}/${sectionSlug}`;
                      const hasDocs = docs.length > 0;
                      const isSectionExpanded = openSectionKey === sectionKey;

                      return (
                        <Box key={section} component='li'>

                          {/* 섹션 헤더 행 */}
                          <Box
                            sx={(theme) => ({
                              display: 'flex',
                              alignItems: 'center',
                              transition: 'background-color 0.1s ease',
                              ...(isSectionActive
                                ? { backgroundColor: theme.palette.mode === 'light' ? '#F4F0FC' : '#241E40' }
                                : {
                                    '&:hover': {
                                      backgroundColor: theme.palette.mode === 'light' ? '#F6F3FE' : '#221E38',
                                    },
                                  }),
                              '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                            })}
                          >
                            <Box
                              component={Link}
                              to={`/${cat.slug}/${sectionSlug}`}
                              aria-current={isOnSectionPage ? 'page' : undefined}
                              sx={(theme) => ({
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                pl: 4.5,
                                pr: hasDocs ? 0.5 : 2.5,
                                py: 0.875,
                                flex: 1,
                                minWidth: 0,
                                textDecoration: 'none',
                                fontSize: '0.8125rem',
                                lineHeight: 1.5,
                                fontWeight: isSectionActive ? 600 : 400,
                                color: isSectionActive
                                  ? theme.palette.primary.main
                                  : theme.palette.text.secondary,
                                '&:hover': { color: theme.palette.text.primary },
                                '&:focus-visible': {
                                  outline: `2px solid ${theme.palette.primary.main}`,
                                  outlineOffset: '-2px',
                                },
                              })}
                            >
                              <Box
                                component='span'
                                aria-hidden='true'
                                sx={(theme) => ({
                                  width: '5px',
                                  height: '5px',
                                  borderRadius: '50%',
                                  flexShrink: 0,
                                  backgroundColor: isSectionActive
                                    ? theme.palette.primary.main
                                    : 'transparent',
                                  border: `1.5px solid ${
                                    isSectionActive
                                      ? theme.palette.primary.main
                                      : theme.palette.text.disabled
                                  }`,
                                })}
                              />
                              <Box component='span' sx={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {stripSectionNumber(section)}
                              </Box>
                            </Box>

                            {hasDocs && (
                              <IconButton
                                size='small'
                                onClick={() => toggleSection(sectionKey)}
                                aria-expanded={isSectionExpanded}
                                aria-label={`${stripSectionNumber(section)} 문서 목록 ${isSectionExpanded ? '닫기' : '열기'}`}
                                sx={(theme) => ({
                                  mr: 1,
                                  flexShrink: 0,
                                  borderRadius: '4px',
                                  color: isSectionActive
                                    ? theme.palette.primary.main
                                    : theme.palette.text.disabled,
                                  '&:hover': {
                                    backgroundColor: theme.palette.action.hover,
                                    color: isSectionActive
                                      ? theme.palette.primary.main
                                      : theme.palette.text.primary,
                                  },
                                  '&:focus-visible': {
                                    outline: `2px solid ${theme.palette.primary.main}`,
                                    outlineOffset: '2px',
                                  },
                                })}
                              >
                                <ExpandMoreIcon
                                  sx={{
                                    fontSize: '0.875rem',
                                    transform: isSectionExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.25s ease',
                                    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                                  }}
                                />
                              </IconButton>
                            )}
                          </Box>

                          {/* 문서 목록 (3단계) */}
                          {hasDocs && (
                            <Box
                              sx={{
                                display: 'grid',
                                gridTemplateRows: isSectionExpanded ? '1fr' : '0fr',
                                transition: 'grid-template-rows 0.25s ease',
                                '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                              }}
                            >
                              <Box
                                component='ul'
                                role='list'
                                aria-hidden={isSectionExpanded ? undefined : true}
                                sx={{ overflow: 'hidden', listStyle: 'none', m: 0, p: 0 }}
                              >
                                {docs.map((doc) => {
                                  const docPath = `/${cat.slug}/${doc.folder ?? sectionSlug}/${doc.slug}`;
                                  const isDocActive = location.pathname === docPath;
                                  return (
                                    <Box key={doc.slug} component='li'>
                                      <Box
                                        component={Link}
                                        to={docPath}
                                        aria-current={isDocActive ? 'page' : undefined}
                                        sx={(theme) => ({
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: 1.5,
                                          pl: 7,
                                          pr: 2.5,
                                          py: 0.625,
                                          textDecoration: 'none',
                                          fontSize: '0.75rem',
                                          lineHeight: 1.5,
                                          transition: 'background-color 0.1s ease, color 0.1s ease',
                                          ...(isDocActive
                                            ? {
                                                color: theme.palette.primary.main,
                                                fontWeight: 600,
                                                backgroundColor: theme.palette.mode === 'light' ? '#F4F0FC' : '#241E40',
                                              }
                                            : {
                                                color: theme.palette.text.secondary,
                                                fontWeight: 400,
                                                '&:hover': {
                                                  backgroundColor: theme.palette.mode === 'light' ? '#F6F3FE' : '#221E38',
                                                  color: theme.palette.text.primary,
                                                },
                                              }),
                                          '&:focus-visible': {
                                            outline: `2px solid ${theme.palette.primary.main}`,
                                            outlineOffset: '-2px',
                                          },
                                          '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                                        })}
                                      >
                                        <Box
                                          component='span'
                                          aria-hidden='true'
                                          sx={(theme) => ({
                                            width: '4px',
                                            height: '4px',
                                            borderRadius: '50%',
                                            flexShrink: 0,
                                            backgroundColor: isDocActive
                                              ? theme.palette.primary.main
                                              : 'transparent',
                                            border: `1px solid ${
                                              isDocActive
                                                ? theme.palette.primary.main
                                                : theme.palette.text.disabled
                                            }`,
                                          })}
                                        />
                                        <Box component='span' sx={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                          {doc.title}
                                        </Box>
                                      </Box>
                                    </Box>
                                  );
                                })}
                              </Box>
                            </Box>
                          )}

                        </Box>
                      );
                    }

                    // ── 기존 2단계 섹션 링크 ──────────────────────────────
                    const sectionDirectLink = cat.sectionLinks?.[section];
                    const sectionLink = sectionDirectLink ?? `/${cat.slug}/${sectionSlug}`;
                    const isSectionActive = sectionDirectLink
                      ? location.pathname === sectionDirectLink
                      : isActive && currentSectionSlug === sectionSlug;

                    return (
                      <Box key={section} component='li'>
                        <Box
                          component={Link}
                          to={sectionLink}
                          aria-current={isSectionActive ? 'page' : undefined}
                          sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            pl: 5,
                            pr: 2.5,
                            py: 0.75,
                            textDecoration: 'none',
                            fontSize: '0.8125rem',
                            lineHeight: 1.5,
                            transition: 'background-color 0.1s ease, color 0.1s ease',
                            ...(isSectionActive
                              ? {
                                  color: theme.palette.primary.main,
                                  fontWeight: 600,
                                  backgroundColor: theme.palette.mode === 'light' ? '#F4F0FC' : '#241E40',
                                }
                              : {
                                  color: theme.palette.text.secondary,
                                  fontWeight: 400,
                                  '&:hover': {
                                    backgroundColor: theme.palette.mode === 'light' ? '#F6F3FE' : '#221E38',
                                    color: theme.palette.text.primary,
                                  },
                                }),
                            '&:focus-visible': {
                              outline: `2px solid ${theme.palette.primary.main}`,
                              outlineOffset: '-2px',
                            },
                            '@media (prefers-reduced-motion: reduce)': {
                              transition: 'none',
                            },
                          })}
                        >
                          <Box
                            component='span'
                            aria-hidden='true'
                            sx={(theme) => ({
                              width: '5px',
                              height: '5px',
                              borderRadius: '50%',
                              flexShrink: 0,
                              backgroundColor: isSectionActive
                                ? theme.palette.primary.main
                                : 'transparent',
                              border: `1.5px solid ${
                                isSectionActive
                                  ? theme.palette.primary.main
                                  : theme.palette.text.disabled
                              }`,
                            })}
                          />
                          <Box
                            component='span'
                            sx={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                          >
                            {stripSectionNumber(section)}
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>

            </Box>
          );
        })}
      </Box>
      </Box>
    </>
  );
}

export default Sidebar;
