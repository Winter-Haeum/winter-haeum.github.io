/**
 * HomePage — Winter Dev Archive 메인 페이지
 *
 * 구성: Hero (제목 + 검색 + 캐릭터) + Category Grid + Footer
 * 검색 기능은 Stage 5에서 구현
 */
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import CategoryCard from '@/components/ui/category-card';
import { categories } from '@/data/navigation';
import winterHelloImg from '@/assets/characters/character-hello.png';

function HomePage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <Header />

      {/* ── Hero Section ───────────────────────────────────────────── */}
      <Box
        component='section'
        aria-label='소개'
        sx={(theme) => ({
          backgroundColor: theme.palette.mode === 'light' ? '#F6F3FE' : '#221E38',
          pt: { xs: 4, md: 5 },
          pb: { xs: 3, md: 5 },
          px: { xs: 2, md: 3 },
          minHeight: { xs: 'auto', md: '480px' },
          display: 'flex',
          alignItems: 'center',
        })}
      >
        <Container maxWidth='md' sx={{ width: '100%', maxWidth: { md: '1000px' } }}>
          {/* CSS Grid — MUI Grid보다 align-items: center가 정확하게 동작 */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) 340px' },
              alignItems: 'center',
              columnGap: { md: '40px' },
              rowGap: { xs: '8px', md: 0 },
            }}
          >
            {/* Hero 텍스트 */}
            <Box>
              <Typography
                variant='h1'
                sx={{ mb: 1.5, fontSize: { xs: '1.75rem', md: '2.25rem' } }}
              >
                Winter Dev Archive
              </Typography>

              <Typography
                variant='body1'
                sx={{ color: 'text.secondary', fontWeight: 500, mb: 1 }}
              >
                프론트엔드를 배우며 쌓아온 나만의 디지털 참고서
              </Typography>

              <Typography
                variant='body2'
                sx={{ color: 'text.disabled', lineHeight: 1.8, mb: { xs: 1.5, md: 3 } }}
              >
                개념이 헷갈릴 때, 처음부터 다시 보고 싶을 때 —<br />
                여기서 먼저 찾아보세요.
              </Typography>

              {/* 검색창 플레이스홀더 — 기능은 Stage 5에서 구현 */}
              <Box
                component='button'
                onClick={() => navigate('/search')}
                aria-label='검색 페이지로 이동'
                sx={(theme) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  width: '100%',
                  maxWidth: '420px',
                  py: 1.5,
                  px: 2,
                  border: '1px solid',
                  borderColor: theme.palette.divider,
                  borderRadius: '8px',
                  backgroundColor: theme.palette.background.paper,
                  cursor: 'pointer',
                  textAlign: 'left',
                  mb: { xs: 1.5, md: 3 },
                  transition: 'border-color 0.15s ease',
                  '&:hover': { borderColor: theme.palette.primary.main },
                  '&:focus-visible': {
                    outline: `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: '2px',
                  },
                  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                })}
              >
                <SearchIcon sx={{ color: 'text.disabled', fontSize: '1.1rem', flexShrink: 0 }} />
                <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                  Flexbox, useState, HTTP...
                </Typography>
              </Box>

              {/* 메타 정보 — categories 데이터가 아닌 고정 문구라 VITE_PUBLIC_BUILD로 직접 분기 */}
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                {import.meta.env.VITE_PUBLIC_BUILD === 'true'
                  ? 'HTML · CSS · JavaScript · React · TypeScript'
                  : 'HTML · CSS · JavaScript · React · TypeScript · AI & Vibe Coding'}
              </Typography>
            </Box>

            {/* 캐릭터 이미지 wrapper */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: { xs: 0, md: 'unset' },
                // character-hello.png는 이전 winter-laptop.webp보다 투명 여백이 적어
                // 보정폭을 축소함(텍스트 블록과의 간격만 살짝 당김)
                transform: { xs: 'translateY(-8px)', md: 'translate(-12px, -8px)' },
              }}
            >
              <Box
                component='img'
                src={winterHelloImg}
                alt='인사하는 겨울하음'
                sx={{
                  width: '100%',
                  maxWidth: { xs: '220px', md: '340px' },
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── Category Grid ───────────────────────────────────────────── */}
      <Box
        component='section'
        aria-label='카테고리 목록'
        sx={{ flex: 1, py: { xs: 6, md: 10 }, px: { xs: 2, md: 3 } }}
      >
        <Container maxWidth='lg'>
          <Typography
            variant='overline'
            component='p'
            sx={{ color: 'text.disabled', mb: 3 }}
          >
            Categories
          </Typography>

          <Grid container spacing={3}>
            {categories.map((category) => (
              <Grid key={category.id} size={{ xs: 12, sm: 6, md: 4, xl: 3 }}>
                <CategoryCard category={category} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

export default HomePage;
