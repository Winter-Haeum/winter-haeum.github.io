/**
 * ChapterComments 컴포넌트 — 챕터 하단 Giscus 댓글 영역
 *
 * Props: 없음
 *
 * 기본 접힘 상태로 라벨 버튼만 표시하고, 클릭 시에만 Giscus를 마운트한다.
 * 사이트 다크모드(useColorMode)에 따라 Giscus 테마를 light / dark_dimmed로 연동한다.
 *
 * Example usage:
 * <ChapterComments />
 */
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Giscus from '@giscus/react';
import { useColorMode } from '@/hooks/use-color-mode';

function ChapterComments() {
  const [open, setOpen] = useState(false);
  const { mode } = useColorMode();
  const giscusTheme = mode === 'dark' ? 'dark_dimmed' : 'light';

  return (
    <Box component='section' aria-label='챕터 댓글' sx={{ mt: 6 }}>
      <Divider sx={{ mb: 2.5 }} />

      <Button
        onClick={() => setOpen((prev) => !prev)}
        disableRipple
        aria-expanded={open}
        sx={(theme) => ({
          textTransform: 'none',
          fontSize: '0.85rem',
          fontWeight: 500,
          color: theme.palette.text.secondary,
          backgroundColor: 'transparent',
          border: '1px solid',
          borderColor: theme.palette.divider,
          borderRadius: '8px',
          px: 1.75,
          py: 0.75,
          minWidth: 0,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
            borderColor: theme.palette.divider,
          },
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.primary.main}`,
            outlineOffset: '2px',
          },
        })}
      >
        💬 질문 / 오타 제보 / 의견 남기기
      </Button>

      {open && (
        <Box sx={{ mt: 3 }}>
          <Typography
            variant='caption'
            sx={(theme) => ({
              display: 'block',
              mb: 1,
              fontSize: '0.72rem',
              lineHeight: 1.6,
              color: theme.palette.mode === 'light' ? '#8C8C8C' : '#9B9B9B',
            })}
          >
            댓글 작성은 현재 GitHub 계정이 필요합니다.
            <br />
            GitHub는 Google 계정으로 가입하거나 로그인할 수 있습니다.
          </Typography>
          <Giscus
            id='chapter-comments'
            repo='Winter-Haeum/winter-dev-archive'
            repoId='R_kgDOSw_xmA'
            category='Comments'
            categoryId='DIC_kwDOSw_xmM4DBSlL'
            mapping='pathname'
            strict='0'
            reactionsEnabled='1'
            emitMetadata='0'
            inputPosition='bottom'
            theme={giscusTheme}
            lang='ko'
            loading='lazy'
          />
        </Box>
      )}
    </Box>
  );
}

export default ChapterComments;
