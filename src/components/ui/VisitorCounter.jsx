/**
 * VisitorCounter 컴포넌트 — Header에 표시하는 조용한 방문자 수 정보
 *
 * Props: 없음
 *
 * 로딩 중과 실패(미설정 포함) 시 모두 "집계 준비 중"을 짧게 표시하고,
 * 성공 시에만 실제 Today/Total 숫자를 표시한다(가짜 숫자 금지).
 * 화면이 좁을 때는 Today 부분을 생략하고 Total만 표시한다.
 *
 * Example usage:
 * <VisitorCounter />
 */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useVisitorCount } from '@/hooks/use-visitor-count';

function VisitorCounter() {
  const { status, data } = useVisitorCount();

  if (status === 'loading') {
    return (
      <Typography
        variant='caption'
        sx={{ color: 'text.disabled', whiteSpace: 'nowrap' }}
      >
        👀 집계 준비 중
      </Typography>
    );
  }

  if (status === 'error') {
    return (
      <Typography
        variant='caption'
        sx={{ color: 'text.disabled', whiteSpace: 'nowrap' }}
      >
        👀 집계 준비 중
      </Typography>
    );
  }

  return (
    <Typography
      variant='caption'
      sx={{ color: 'text.disabled', whiteSpace: 'nowrap' }}
    >
      👀{' '}
      <Box component='span' sx={{ display: { xs: 'none', sm: 'inline' } }}>
        Today {data.today.toLocaleString()} ·{' '}
      </Box>
      Total {data.total.toLocaleString()}
    </Typography>
  );
}

export default VisitorCounter;
