/**
 * Footer 컴포넌트 — 사이트 하단 공통 푸터
 *
 * Props: 없음 (전역 공통 컴포넌트)
 *
 * Example usage:
 * <Footer />
 */
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import { categories } from '@/data/navigation';

const FEATURED_IDS = ['frontend', 'javascript', 'react', 'ai-vibe-coding', 'coding-test'];

function Footer() {
  const featured = FEATURED_IDS
    .map((id) => categories.find((c) => c.id === id))
    .filter(Boolean);

  return (
    <Box
      component='footer'
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        borderTop: '1px solid',
        borderColor: theme.palette.divider,
        pt: { xs: 5, md: 6 },
        pb: { xs: 3, md: 4 },
      })}
    >
      <Container maxWidth='lg' sx={{ px: { xs: 2, md: 3 } }}>
        <Grid container spacing={4}>
          {/* About */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography
              variant='overline'
              component='p'
              sx={{ color: 'text.disabled', mb: 1.5 }}
            >
              About
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.8 }}>
              Winter Dev Archive는 프론트엔드 학습 여정을 담은 개인 아카이브입니다.
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              Made by{' '}
              <Box component='span' sx={{ color: 'text.primary', fontWeight: 600 }}>
                Winter (겨울하음)
              </Box>
            </Typography>
            <Typography
              variant='caption'
              sx={{ color: 'text.disabled', display: 'block', mt: 0.5 }}
            >
              프론트엔드 학습 시작: 2025년 11월
            </Typography>
          </Grid>

          {/* Categories + Links */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 7 }}>
                <Typography
                  variant='overline'
                  component='p'
                  sx={{ color: 'text.disabled', mb: 1.5 }}
                >
                  Categories
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                  {featured.map((cat) => (
                    <Typography
                      key={cat.id}
                      component={Link}
                      to={`/${cat.slug}`}
                      variant='body2'
                      sx={(theme) => ({
                        color: theme.palette.text.secondary,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.75,
                        transition: 'color 0.15s ease',
                        '&:hover': { color: theme.palette.primary.main },
                        '&:focus-visible': {
                          outline: `2px solid ${theme.palette.primary.main}`,
                          outlineOffset: '2px',
                          borderRadius: '2px',
                        },
                        '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                      })}
                    >
                      <Box component='span' aria-hidden='true'>{cat.emoji}</Box>
                      {cat.name}
                    </Typography>
                  ))}
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 5 }}>
                <Typography
                  variant='overline'
                  component='p'
                  sx={{ color: 'text.disabled', mb: 1.5 }}
                >
                  Links
                </Typography>
                <Typography
                  component='a'
                  href='https://github.com/Winter-Haeum'
                  target='_blank'
                  rel='noopener noreferrer'
                  variant='body2'
                  sx={(theme) => ({
                    color: theme.palette.text.secondary,
                    textDecoration: 'none',
                    transition: 'color 0.15s ease',
                    '&:hover': { color: theme.palette.primary.main },
                    '&:focus-visible': {
                      outline: `2px solid ${theme.palette.primary.main}`,
                      outlineOffset: '2px',
                      borderRadius: '2px',
                    },
                    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                  })}
                >
                  GitHub ↗
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Divider sx={{ my: { xs: 3, md: 4 } }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { sm: 'center' },
            gap: 1,
          }}
        >
          <Typography variant='caption' sx={{ color: 'text.disabled' }}>
            © 2025– Winter Dev Archive
          </Typography>
          <Typography variant='caption' sx={{ color: 'text.disabled', fontStyle: 'italic' }}>
            "크림 노트에 보라 잉크로 필기한 디지털 참고서"
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
