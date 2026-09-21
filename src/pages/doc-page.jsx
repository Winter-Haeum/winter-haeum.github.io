/**
 * DocPage — 개별 Markdown 문서 페이지
 *
 * URL: /:category/:section/:doc
 * 구성: Sidebar + Breadcrumb + Doc 헤더(제목 + StatusBadge) + MarkdownRenderer
 *
 * Props: 없음 (URL 파라미터로 category / section / doc slug 수신)
 */
import { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import Sidebar from '@/components/common/sidebar';
import NavigationDrawer from '@/components/common/NavigationDrawer';
import Breadcrumb from '@/components/common/breadcrumb';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer';
import ChapterComments from '@/components/markdown/ChapterComments';
import StudyAssistantPanel from '@/components/study-assistant/StudyAssistantPanel';
import DocFindBar from '@/components/study-assistant/DocFindBar';
import CategoryBadgeLink from '@/components/ui/CategoryBadgeLink';
import StatusBadge from '@/components/ui/StatusBadge';
import NotFoundPage from '@/pages/not-found-page';
import { getDoc, getSectionDocs } from '@/utils/markdownLoader';
import { categories } from '@/data/navigation';
import { slugify, stripSectionNumber } from '@/utils/slugify';

function DocPage() {
  const { category: categorySlug, section: sectionSlug, doc: docSlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  // loadedKey: 로딩 완료된 파라미터 식별자. 현재 파라미터와 다르면 로딩 중으로 판단
  const [loadedKey, setLoadedKey] = useState(null);
  const [doc, setDoc] = useState(null);
  const [sectionDocs, setSectionDocs] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const contentRef = useRef(null);
  const findQuery = searchParams.get('find');

  const category = categories.find((c) => c.slug === categorySlug);

  // sectionSlug(URL)는 문서가 실제로 위치한 폴더명이다. 표시용 단원(section)의 슬러그와
  // 다를 수 있으므로(예: '2. 함수 · 배열 · 객체' 아래 functions/arrays-objects 두 폴더가 섞여 있음),
  // 먼저 폴더 슬러그 매칭을 시도하고 실패하면 sectionDocs를 역으로 검색해 문서가 속한 단원을 찾는다.
  let sectionName = category?.sections.find((s) => slugify(s) === sectionSlug);
  if (!sectionName && category?.sectionDocs) {
    sectionName = Object.keys(category.sectionDocs).find((name) =>
      category.sectionDocs[name].some(
        (d) => d.slug === docSlug && (d.folder ?? slugify(name)) === sectionSlug
      )
    );
  }
  // 돌아가기/Breadcrumb 링크용 — 표시 단원 자체의 슬러그(섹션 개요 페이지로 이동)
  const groupSlug = sectionName ? slugify(sectionName) : sectionSlug;
  const currentKey = `${categorySlug}/${sectionSlug}/${docSlug}`;
  const loading = loadedKey !== currentKey;

  // 슬러그 정렬 기준으로 섹션 내 이전/다음 문서 계산
  const sortedDocs = [...sectionDocs].sort((a, b) => a.slug.localeCompare(b.slug));
  const docIndex = sortedDocs.findIndex((d) => d.slug === docSlug);
  const prevDoc = docIndex > 0 ? sortedDocs[docIndex - 1] : null;
  const nextDoc = docIndex < sortedDocs.length - 1 ? sortedDocs[docIndex + 1] : null;

  // 문서 이동 시 즉시 상단으로 이동 — anchor(#) 링크는 이 파라미터를 바꾸지 않아 영향 없음
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categorySlug, sectionSlug, docSlug]);

  // 스크롤 300px 초과 시 맨 위로 버튼 표시
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    let active = true;
    Promise.all([
      getDoc(categorySlug, sectionSlug, docSlug),
      getSectionDocs(categorySlug, sectionSlug),
    ]).then(([result, docs]) => {
      if (!active) return;
      setDoc(result);
      setSectionDocs(docs);
      setLoadedKey(`${categorySlug}/${sectionSlug}/${docSlug}`);
    }).catch(() => {
      if (!active) return;
      setLoadedKey(`${categorySlug}/${sectionSlug}/${docSlug}`);
    });
    return () => { active = false; };
  }, [categorySlug, sectionSlug, docSlug]);

  const handleScrollToTop = () => {
    const instant = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: instant ? 'instant' : 'smooth' });
  };

  if (!category || !sectionName) return <NotFoundPage />;
  if (!loading && !doc) return <NotFoundPage />;

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
        currentDocSlug={docSlug}
      />

      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar currentCategoryId={category.id} currentSectionSlug={sectionSlug} currentDocSlug={docSlug} />

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
          {/* ← 섹션으로 돌아가기 */}
          <Box
            component={Link}
            to={`/${categorySlug}/${groupSlug}`}
            sx={(theme) => ({
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              color: theme.palette.mode === 'light' ? '#2C2840' : '#C8B8F0',
              fontSize: '0.9rem',
              fontWeight: 600,
              mb: 2.5,
              px: '12px',
              py: '7px',
              border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(43,37,32,0.18)' : 'rgba(200,184,240,0.25)'}`,
              borderRadius: '999px',
              backgroundColor: theme.palette.mode === 'light' ? 'rgba(123,94,167,0.06)' : 'rgba(123,94,167,0.12)',
              transition: 'background-color 0.15s ease, border-color 0.15s ease',
              '&:hover': {
                backgroundColor: theme.palette.mode === 'light' ? 'rgba(123,94,167,0.12)' : 'rgba(123,94,167,0.22)',
                borderColor: theme.palette.mode === 'light' ? 'rgba(123,94,167,0.35)' : 'rgba(200,184,240,0.45)',
              },
              '&:focus-visible': {
                outline: `2px solid ${theme.palette.primary.main}`,
                outlineOffset: '2px',
              },
              '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
            })}
          >
            <ArrowBackIcon sx={{ fontSize: '0.85rem' }} />
            {stripSectionNumber(sectionName)}으로 돌아가기
          </Box>

          {/* 현재 위치 Breadcrumb */}
          <Breadcrumb
            category={category}
            section={sectionName}
            sectionSlug={groupSlug}
            doc={loading ? '...' : doc?.frontmatter.title}
          />

          {loading ? (
            /* 로딩 중 — 제목 영역 스켈레톤 */
            <Box sx={{ mb: 6 }}>
              <Box
                sx={(theme) => ({
                  height: '2.25rem',
                  width: '60%',
                  borderRadius: '6px',
                  backgroundColor: theme.palette.divider,
                  mb: 2,
                })}
              />
              <Box
                sx={(theme) => ({
                  height: '1.5rem',
                  width: '30%',
                  borderRadius: '6px',
                  backgroundColor: theme.palette.divider,
                })}
              />
            </Box>
          ) : (
            <>
              {/* Doc 헤더: 카테고리 뱃지 + 제목 + StatusBadge */}
              <Box component='section' aria-label='문서 헤더' sx={{ mb: 5 }}>

                <CategoryBadgeLink category={category} />

                {/* 제목 + StatusBadge */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    flexWrap: 'wrap',
                  }}
                >
                  <Typography
                    variant='h1'
                    sx={{ flex: 1, fontSize: { xs: '1.45rem', md: '1.65rem' }, fontWeight: 700, lineHeight: 1.3 }}
                  >
                    {doc.frontmatter.title}
                  </Typography>
                  <StatusBadge status={doc.frontmatter.status} />
                </Box>

                {/* 날짜 */}
                {doc.frontmatter.date && (
                  <Typography
                    variant='caption'
                    sx={{ color: 'text.disabled', mt: 1, display: 'block' }}
                  >
                    {doc.frontmatter.date}
                  </Typography>
                )}
              </Box>

              {/* Markdown 본문 — ref는 DocFindBar가 텍스트 노드를 찾을 대상 컨테이너 */}
              <Box ref={contentRef}>
                <MarkdownRenderer
                  content={doc.content}
                  docId={`${categorySlug}/${sectionSlug}/${docSlug}`}
                />
              </Box>

              {/* 문서 내부 찾기 — 학습 도우미 검색 결과의 "교안 바로가기"에서 ?find=로 전달됨.
                  key를 문서+검색어에 묶어 다른 문서로 이동하거나 새 검색어로 다시 넘어오면
                  항상 첫 번째 일치 위치부터 새로 시작하도록 한다. */}
              {findQuery && (
                <DocFindBar
                  key={`${currentKey}:${findQuery}`}
                  targetRef={contentRef}
                  initialQuery={findQuery}
                  onClose={() => {
                    setSearchParams((prev) => {
                      const next = new URLSearchParams(prev);
                      next.delete('find');
                      return next;
                    }, { replace: true });
                  }}
                />
              )}

              {/* 이전 / 다음 문서 내비게이션 */}
              {(prevDoc || nextDoc) && (
                <>
                  <Divider sx={{ mt: 8, mb: 4 }} />
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      gap: 2,
                    }}
                  >
                    {/* 이전 문서 */}
                    {prevDoc && (
                      <Box
                        component={Link}
                        to={`/${categorySlug}/${sectionSlug}/${prevDoc.slug}`}
                        sx={(theme) => ({
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          textDecoration: 'none',
                          color: 'text.primary',
                          border: '1px solid',
                          borderColor: theme.palette.divider,
                          borderRadius: '10px',
                          px: 2.5,
                          py: 2,
                          maxWidth: { xs: '100%', md: '300px' },
                          transition: 'border-color 0.15s ease, background-color 0.15s ease',
                          '&:hover': {
                            borderColor: theme.palette.primary.main,
                            backgroundColor: theme.palette.mode === 'light' ? '#F7F4FF' : '#1E1A30',
                          },
                          '&:focus-visible': {
                            outline: `2px solid ${theme.palette.primary.main}`,
                            outlineOffset: '3px',
                          },
                          '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                        })}
                      >
                        <ArrowBackIcon sx={(theme) => ({ fontSize: '1rem', color: theme.palette.text.disabled, flexShrink: 0 })} />
                        <Box sx={{ minWidth: 0 }}>
                          <Typography variant='caption' sx={{ color: 'text.disabled', display: 'block' }}>
                            이전 문서
                          </Typography>
                          <Typography
                            variant='body2'
                            sx={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                          >
                            {prevDoc.frontmatter.title}
                          </Typography>
                        </Box>
                      </Box>
                    )}

                    {/* 다음 문서 */}
                    {nextDoc && (
                      <Box
                        component={Link}
                        to={`/${categorySlug}/${sectionSlug}/${nextDoc.slug}`}
                        sx={(theme) => ({
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          gap: 1.5,
                          textDecoration: 'none',
                          color: 'text.primary',
                          border: '1px solid',
                          borderColor: theme.palette.divider,
                          borderRadius: '10px',
                          px: 2.5,
                          py: 2,
                          maxWidth: { xs: '100%', md: '300px' },
                          ml: { md: 'auto' },
                          textAlign: 'right',
                          transition: 'border-color 0.15s ease, background-color 0.15s ease',
                          '&:hover': {
                            borderColor: theme.palette.primary.main,
                            backgroundColor: theme.palette.mode === 'light' ? '#F7F4FF' : '#1E1A30',
                          },
                          '&:focus-visible': {
                            outline: `2px solid ${theme.palette.primary.main}`,
                            outlineOffset: '3px',
                          },
                          '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                        })}
                      >
                        <Box sx={{ minWidth: 0 }}>
                          <Typography variant='caption' sx={{ color: 'text.disabled', display: 'block' }}>
                            다음 문서
                          </Typography>
                          <Typography
                            variant='body2'
                            sx={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                          >
                            {nextDoc.frontmatter.title}
                          </Typography>
                        </Box>
                        <ArrowForwardIcon sx={(theme) => ({ fontSize: '1rem', color: theme.palette.text.disabled, flexShrink: 0 })} />
                      </Box>
                    )}
                  </Box>
                </>
              )}

              {/* 학습 도우미 (기본 접힘) — 기존 Fuse.js 검색·Markdown 원문 구조를 재사용하는 무료 기능 */}
              <StudyAssistantPanel
                currentDoc={doc}
                currentDocMeta={{
                  category: categorySlug,
                  section: sectionSlug,
                  slug: docSlug,
                  url: `/${categorySlug}/${sectionSlug}/${docSlug}`,
                }}
              />

              {/* 챕터 하단 댓글 영역 (기본 접힘) */}
              <ChapterComments />
            </>
          )}
          </Box>
        </Box>
      </Box>

      <Footer />

      {/* 맨 위로 가기 버튼 — 스크롤 300px 초과 시 표시 */}
      <Fab
        size='small'
        onClick={handleScrollToTop}
        aria-label='맨 위로 이동'
        sx={(theme) => ({
          position: 'fixed',
          bottom: { xs: 16, md: 24 },
          right: { xs: 16, md: 24 },
          backgroundColor: theme.palette.mode === 'light'
            ? theme.palette.background.paper
            : '#2A2544',
          color: theme.palette.mode === 'light'
            ? theme.palette.text.secondary
            : '#B39EDD',
          border: '1px solid',
          borderColor: theme.palette.mode === 'light' ? '#DDD5C8' : '#3C3858',
          boxShadow: theme.palette.mode === 'light'
            ? '0 2px 8px rgba(0,0,0,0.12)'
            : '0 2px 8px rgba(0,0,0,0.4)',
          opacity: showScrollTop ? 1 : 0,
          transform: showScrollTop ? 'translateY(0)' : 'translateY(8px)',
          pointerEvents: showScrollTop ? 'auto' : 'none',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
          '&:hover': {
            backgroundColor: theme.palette.mode === 'light' ? '#EDE8FA' : '#3C3460',
            color: theme.palette.primary.main,
            borderColor: theme.palette.mode === 'light' ? '#BCA4EC' : '#5C5490',
          },
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.primary.main}`,
            outlineOffset: '2px',
          },
          '@media (prefers-reduced-motion: reduce)': {
            transition: 'none',
          },
        })}
      >
        <KeyboardArrowUpIcon sx={{ fontSize: '1.25rem' }} />
      </Fab>
    </Box>
  );
}

export default DocPage;
