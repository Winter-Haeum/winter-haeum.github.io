/**
 * AboutPage — 겨울하음 소개 페이지
 *
 * URL: /about
 * 구성: Header + 캐릭터 + 소개 텍스트 + 아카이브 링크 + Footer
 *
 * Props: 없음
 */
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import winterStudyImg from '@/assets/characters/character-study.png';

function AboutPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      <Box
        component='main'
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: { xs: 6, md: 10 },
          px: 2,
        }}
      >
        <Container maxWidth='sm'>
          <Box sx={{ textAlign: 'center' }}>
            <Box
              component='img'
              src={winterStudyImg}
              alt='공부하는 겨울하음'
              sx={{
                maxWidth: { xs: '220px', sm: '260px', lg: '320px' },
                width: '100%',
                height: 'auto',
                display: 'block',
                mx: 'auto',
                mb: 4,
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            />

            <Typography
              variant='h1'
              sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, mb: 1 }}
            >
              Winter Haeum
            </Typography>

            <Typography
              variant='overline'
              component='p'
              sx={{ color: 'text.disabled', mb: 3 }}
            >
              겨울하음
            </Typography>

            <Typography
              variant='body1'
              sx={{
                color: 'text.secondary',
                lineHeight: 1.8,
                mb: 2,
                maxWidth: '42ch',
                mx: 'auto',
              }}
            >
              프론트엔드를 배우며 쌓아온 나만의 디지털 참고서입니다.
              개념이 헷갈릴 때, 처음부터 다시 보고 싶을 때 꺼내보는 공간입니다.
            </Typography>

            {/* categories 데이터가 아닌 고정 문구라 VITE_PUBLIC_BUILD로 직접 분기 */}
            <Typography
              variant='body2'
              sx={{
                color: 'text.disabled',
                lineHeight: 2,
                mb: 5,
              }}
            >
              {import.meta.env.VITE_PUBLIC_BUILD === 'true'
                ? 'HTML · CSS · JavaScript · React · TypeScript'
                : 'HTML · CSS · JavaScript · React · TypeScript · AI & Vibe Coding'}
            </Typography>

            <Button
              component={Link}
              to='/'
              variant='outlined'
              sx={{ borderRadius: '8px' }}
            >
              아카이브로 돌아가기
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

export default AboutPage;
