/**
 * CategoryPage — 카테고리 소개 페이지
 *
 * URL: /:category
 * 구성: Sidebar + Breadcrumb + 카테고리 소개 + 학습 순서 (클릭 가능) + CTA 버튼
 *
 * Props: 없음 (URL 파라미터로 카테고리 slug 수신)
 */
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useParams, Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import Sidebar from '@/components/common/sidebar';
import NavigationDrawer from '@/components/common/NavigationDrawer';
import Breadcrumb from '@/components/common/breadcrumb';
import NotFoundPage from '@/pages/not-found-page';
import { categories } from '@/data/navigation';
import { slugify, stripSectionNumber } from '@/utils/slugify';

function CategoryPage() {
  const { category: categorySlug } = useParams();
  const category = categories.find((c) => c.slug === categorySlug);
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (!category) {
    return <NotFoundPage />;
  }

  const firstSectionSlug = slugify(category.sections[0]);

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
      />

      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar currentCategoryId={category.id} />

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
          <Breadcrumb category={category} />

          {/* 카테고리 소개 */}
          <Box
            component='section'
            aria-label='카테고리 소개'
            sx={{ mb: 6 }}
          >
            <Box
              component='span'
              aria-hidden='true'
              sx={{ fontSize: '2.5rem', lineHeight: 1, display: 'block', mb: 2 }}
            >
              {category.emoji}
            </Box>

            <Typography
              variant='h1'
              sx={{ fontSize: { xs: '1.75rem', md: '2rem' }, mb: 1.5 }}
            >
              {category.name}
            </Typography>

            <Typography
              variant='body1'
              sx={{
                color: 'text.secondary',
                maxWidth: '60ch',
                lineHeight: 1.8,
                mb: 3,
              }}
            >
              {category.description}
            </Typography>

            {/* 섹션 수 */}
            <Box
              sx={(theme) => ({
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                px: 1.5,
                py: 0.5,
                borderRadius: '6px',
                border: '1px solid',
                borderColor: theme.palette.divider,
                backgroundColor: theme.palette.background.paper,
              })}
            >
              <Typography variant='caption' sx={{ color: 'text.disabled', fontWeight: 600 }}>
                섹션
              </Typography>
              <Typography variant='caption' sx={{ color: 'text.primary', fontWeight: 700 }}>
                {category.sections.length}개
              </Typography>
            </Box>
          </Box>

          {/* 학습 순서 — 클릭 가능한 링크 목록 */}
          <Box
            component='section'
            aria-label='학습 순서'
            sx={{ mb: 6 }}
          >
            <Typography
              variant='overline'
              component='p'
              sx={{ color: 'text.disabled', mb: 2 }}
            >
              학습 순서
            </Typography>

            <Box
              component='ol'
              sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}
            >
              {category.sections.map((section, index) => {
                const sectionSlug = slugify(section);
                const sectionLink = category.sectionLinks?.[section] ?? `/${category.slug}/${sectionSlug}`;
                return (
                  <Box key={section} component='li'>
                    <Box
                      component={Link}
                      to={sectionLink}
                      sx={(theme) => ({
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        textDecoration: 'none',
                        py: 1,
                        px: 1.5,
                        borderRadius: '8px',
                        transition: 'background-color 0.1s ease',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'light' ? '#F6F3FE' : '#221E38',
                          '& .section-arrow': { opacity: 1 },
                        },
                        '&:focus-visible': {
                          outline: `2px solid ${theme.palette.primary.main}`,
                          outlineOffset: '2px',
                        },
                        '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                      })}
                    >
                      <Box
                        component='span'
                        aria-hidden='true'
                        sx={(theme) => ({
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          border: '1px solid',
                          borderColor: theme.palette.divider,
                          backgroundColor: theme.palette.background.paper,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          color: theme.palette.text.disabled,
                        })}
                      >
                        {index + 1}
                      </Box>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.5, flex: 1 }}
                      >
                        {stripSectionNumber(section)}
                      </Typography>
                      <ArrowForwardIcon
                        className='section-arrow'
                        sx={(theme) => ({
                          fontSize: '0.875rem',
                          color: theme.palette.text.disabled,
                          opacity: 0,
                          transition: 'opacity 0.1s ease',
                          '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                        })}
                      />
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* CTA 버튼 */}
          <Button
            component={Link}
            to={`/${category.slug}/${firstSectionSlug}`}
            variant='contained'
            size='large'
            sx={{ borderRadius: '8px' }}
          >
            {stripSectionNumber(category.sections[0])}부터 시작하기
          </Button>
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}

export default CategoryPage;
