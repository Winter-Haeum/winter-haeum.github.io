/**
 * SectionPage — 섹션 상세 페이지
 *
 * URL: /:category/:section
 * 구성: Sidebar + Breadcrumb + 섹션 헤더 + (index.md 본문 OR 문서 카드)
 *
 * index.md 본문이 있으면: 마크다운 본문 + "시작하기" 버튼 표시 (카드 숨김)
 * index.md 본문이 없으면: 문서 카드 목록 표시 (기존 동작)
 *
 * Props: 없음 (URL 파라미터로 카테고리/섹션 slug 수신)
 */
import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import Sidebar from '@/components/common/sidebar';
import NavigationDrawer from '@/components/common/NavigationDrawer';
import Breadcrumb from '@/components/common/breadcrumb';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer';
import CategoryBadgeLink from '@/components/ui/CategoryBadgeLink';
import StatusBadge from '@/components/ui/StatusBadge';
import NotFoundPage from '@/pages/not-found-page';
import { getSectionIndex, getSectionDocs, getDoc } from '@/utils/markdownLoader';
import { categories } from '@/data/navigation';
import { slugify, stripSectionNumber } from '@/utils/slugify';

function SectionPage() {
  const { category: categorySlug, section: sectionSlug } = useParams();
  // loadedKey: 로딩 완료된 파라미터 식별자. 현재 파라미터와 다르면 로딩 중으로 판단
  const [loadedKey, setLoadedKey] = useState(null);
  const [sectionIndex, setSectionIndex] = useState(null);
  const [sectionDocs, setSectionDocs] = useState([]);
  const [loadError, setLoadError] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const category = categories.find((c) => c.slug === categorySlug);
  const sectionName = category?.sections.find((s) => slugify(s) === sectionSlug);
  // nestedSidebar 대단원은 sectionDocs에 문서가 직접 등록되어 있을 수 있고,
  // 문서들이 표시 단원명과 슬러그가 다른 실제 폴더(folder)에 흩어져 있을 수 있다
  // (예: '2. 함수 · 배열 · 객체' 아래 functions/arrays-objects 두 폴더).
  // 이 경우 폴더 기준 파일시스템 스캔(getSectionDocs) 대신 등록된 목록을 folder별로 직접 조회한다.
  const declaredDocs = sectionName ? category?.sectionDocs?.[sectionName] : null;
  const currentKey = `${categorySlug}/${sectionSlug}`;
  const loading = loadedKey !== currentKey;

  useEffect(() => {
    let active = true;
    // setState를 effect의 동기 실행 프레임이 아니라 마이크로태스크에서 호출해
    // react-hooks/set-state-in-effect를 구조적으로 피한다 (기존 동작은 동일 —
    // 새 섹션 로딩을 시작하기 전에 이전 섹션의 실패 상태를 초기화한다).
    Promise.resolve().then(() => {
      if (active) setLoadError(false);
    });

    const loadPromise = declaredDocs
      ? (() => {
          const folders = [...new Set(declaredDocs.map((d) => d.folder ?? sectionSlug))];
          const indexFolder = folders.length === 1 ? folders[0] : null;
          return Promise.all([
            indexFolder ? getSectionIndex(categorySlug, indexFolder) : Promise.resolve(null),
            Promise.all(declaredDocs.map((d) => getDoc(categorySlug, d.folder ?? sectionSlug, d.slug))),
          ]).then(([idx, docs]) => [idx, docs.filter(Boolean)]);
        })()
      : Promise.all([
          getSectionIndex(categorySlug, sectionSlug),
          getSectionDocs(categorySlug, sectionSlug),
        ]);

    loadPromise
      .then(([idx, docs]) => {
        if (!active) return;
        setSectionIndex(idx);
        setSectionDocs(docs);
        setLoadedKey(`${categorySlug}/${sectionSlug}`);
      })
      .catch((err) => {
        if (!active) return;
        console.error('[SectionPage] 문서 로딩 실패:', err);
        setLoadError(true);
        setLoadedKey(`${categorySlug}/${sectionSlug}`);
      });
    return () => { active = false; };
  }, [categorySlug, sectionSlug, declaredDocs]);

  if (!category || !sectionName) return <NotFoundPage />;

  const sectionDirectLink = category.sectionLinks?.[sectionName];
  if (sectionDirectLink) return <Navigate to={sectionDirectLink} replace />;

  // draft 상태의 index.md는 아직 정리되지 않은 자리표시자로 간주하고 무시한다.
  // (예: 여러 대단원이 폴더 하나를 공유할 때, 그 폴더의 초안 index.md가
  //  모든 대단원의 실제 문서 목록을 가려버리는 문제를 방지)
  const hasUsableIndex = Boolean(sectionIndex?.content) && sectionIndex?.frontmatter?.status !== 'draft';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <Header
        onMenuClick={() => setDrawerOpen(true)}
        isDrawerOpen={drawerOpen}
      />
      <NavigationDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentCategoryId={category.id}
        currentSectionSlug={sectionSlug}
      />

      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar currentCategoryId={category.id} currentSectionSlug={sectionSlug} />

        <Box
          component='main'
          sx={{ flex: 1, minWidth: 0 }}
        >
          <Box
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              px: { xs: 2, md: 4 },
              py: { xs: 4, md: 6 },
            }}
          >
          <Breadcrumb category={category} section={sectionName} />

          {/* 섹션 헤더 */}
          <Box component='section' aria-label='섹션 소개' sx={{ mb: 5 }}>

            <CategoryBadgeLink category={category} />

            <Typography
              variant='h1'
              sx={{ fontSize: { xs: '1.75rem', md: '2rem' } }}
            >
              {stripSectionNumber(sectionName)}
            </Typography>
          </Box>

          {loading ? (
            /* 로딩 중 스켈레톤 */
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[1, 2, 3].map((i) => (
                <Box
                  key={i}
                  sx={(theme) => ({
                    height: '72px',
                    borderRadius: '10px',
                    backgroundColor: theme.palette.divider,
                  })}
                />
              ))}
            </Box>
          ) : loadError ? (
            /* 로딩 실패 안내 */
            <Box
              sx={(theme) => ({
                border: '2px dashed',
                borderColor: theme.palette.divider,
                borderRadius: 2,
                px: 4,
                py: 6,
                textAlign: 'center',
              })}
            >
              <Typography variant='body1' sx={{ color: 'text.secondary', mb: 0.5 }}>
                문서를 불러오지 못했습니다
              </Typography>
              <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                페이지를 새로고침하거나 잠시 후 다시 시도해주세요.
              </Typography>
            </Box>
          ) : (
            <>
              {hasUsableIndex ? (
                /* ── index.md 본문이 있는 경우: 마크다운 + 시작하기 버튼 ── */
                <>
                  <Box component='section' aria-label='섹션 소개 본문' sx={{ mb: 5 }}>
                    <MarkdownRenderer content={sectionIndex.content} />
                  </Box>

                  {/* 첫 번째 문서로 이동하는 시작하기 버튼 */}
                  {sectionDocs.length > 0 && (() => {
                    const firstDoc = [...sectionDocs].sort((a, b) => a.slug.localeCompare(b.slug))[0];
                    return (
                      <Box
                        component={Link}
                        to={`/${categorySlug}/${firstDoc.section ?? sectionSlug}/${firstDoc.slug}`}
                        sx={(theme) => ({
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 1,
                          textDecoration: 'none',
                          backgroundColor: theme.palette.primary.main,
                          color: theme.palette.primary.contrastText,
                          borderRadius: '8px',
                          px: 3,
                          py: 1.25,
                          fontSize: '0.9375rem',
                          fontWeight: 600,
                          transition: 'background-color 0.15s ease',
                          '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                          },
                          '&:focus-visible': {
                            outline: `2px solid ${theme.palette.primary.main}`,
                            outlineOffset: '3px',
                          },
                          '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                        })}
                      >
                        Step 1부터 시작하기
                        <ArrowForwardIcon sx={{ fontSize: '1rem' }} />
                      </Box>
                    );
                  })()}
                </>
              ) : (
                /* ── index.md 본문이 없는 경우: 문서 카드 목록 ── */
                <>
                  {sectionDocs.length > 0 && (
                    <Box component='section' aria-label='문서 목록'>
                      <Typography
                        variant='overline'
                        component='p'
                        sx={{ color: 'text.disabled', mb: 2 }}
                      >
                        Documents
                      </Typography>

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {[...sectionDocs].sort((a, b) => a.slug.localeCompare(b.slug)).map((doc) => (
                          <Box
                            key={doc.slug}
                            component={Link}
                            to={`/${categorySlug}/${doc.section ?? sectionSlug}/${doc.slug}`}
                            sx={(theme) => ({
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              textDecoration: 'none',
                              backgroundColor: theme.palette.background.paper,
                              border: '1px solid',
                              borderColor: theme.palette.divider,
                              borderRadius: '10px',
                              px: 3,
                              py: 2,
                              gap: 2,
                              transition: 'background-color 0.15s ease, border-color 0.15s ease',
                              '&:hover': {
                                backgroundColor: theme.palette.mode === 'light' ? '#EAE3D8' : '#2E2A48',
                                borderColor: theme.palette.mode === 'light' ? '#BCA4EC' : '#5C5490',
                                '& .doc-arrow': { color: theme.palette.primary.main },
                              },
                              '&:focus-visible': {
                                outline: `2px solid ${theme.palette.primary.main}`,
                                outlineOffset: '3px',
                              },
                              '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                            })}
                          >
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography
                                variant='body1'
                                sx={{ fontWeight: 500, color: 'text.primary', fontSize: '0.9375rem', lineHeight: 1.5 }}
                              >
                                {doc.frontmatter.title}
                              </Typography>
                              {doc.frontmatter.description && (
                                <Typography
                                  variant='body2'
                                  sx={{ color: 'text.secondary', mt: 0.25, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                >
                                  {doc.frontmatter.description}
                                </Typography>
                              )}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
                              {doc.frontmatter.status && <StatusBadge status={doc.frontmatter.status} />}
                              <ArrowForwardIcon
                                className='doc-arrow'
                                sx={(theme) => ({
                                  fontSize: '1rem',
                                  color: theme.palette.mode === 'light' ? '#7A7490' : '#8880A0',
                                  transition: 'color 0.15s ease',
                                  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                                })}
                              />
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}

                  {sectionDocs.length === 0 && (
                    <Box
                      sx={(theme) => ({
                        border: '2px dashed',
                        borderColor: theme.palette.divider,
                        borderRadius: 2,
                        px: 4,
                        py: 6,
                        textAlign: 'center',
                      })}
                    >
                      <Typography variant='body1' sx={{ color: 'text.secondary', mb: 0.5 }}>
                        문서 준비 중
                      </Typography>
                      <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                        이 섹션의 학습 문서가 곧 추가됩니다.
                      </Typography>
                    </Box>
                  )}
                </>
              )}
            </>
          )}
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}

export default SectionPage;
