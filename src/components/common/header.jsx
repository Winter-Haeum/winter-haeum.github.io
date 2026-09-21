/**
 * Header 컴포넌트 — sticky 상단 네비게이션
 *
 * Props:
 * @param {function} [onMenuClick]   - 햄버거 버튼 클릭 핸들러 [Optional]
 *   제공 시 lg 미만에서 햄버거 버튼 표시. 미제공 시 기존 Header와 동일.
 *   (HomePage, SearchPage, NotFoundPage는 이 prop을 전달하지 않음)
 * @param {boolean}  [isDrawerOpen]  - Drawer 열림 여부, aria-expanded에 사용 [Optional, 기본값: false]
 *
 * Example usage:
 * <Header />                                                    ← Sidebar 없는 페이지
 * <Header onMenuClick={() => setDrawerOpen(true)} isDrawerOpen={drawerOpen} />
 */
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useColorMode } from '@/hooks/use-color-mode';
import VisitorCounter from '@/components/ui/VisitorCounter';

function Header({ onMenuClick, isDrawerOpen = false }) {
  const { mode, toggleColorMode } = useColorMode();

  const toggleLabel = mode === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환';

  return (
    <>
    <AppBar
      position='fixed'
      elevation={0}
      sx={{
        backgroundColor: 'background.default',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          minHeight: '64px !important',
          px: { xs: 2, md: 3 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {onMenuClick && (
            <IconButton
              onClick={onMenuClick}
              aria-label={isDrawerOpen ? '모바일 메뉴 닫기' : '모바일 메뉴 열기'}
              aria-controls='mobile-navigation-drawer'
              aria-expanded={isDrawerOpen}
              sx={{
                display: { xs: 'flex', lg: 'none' },
                color: 'text.secondary',
                borderRadius: '6px',
                mr: 0.5,
                '&:hover': { backgroundColor: 'action.hover', color: 'text.primary' },
                '&:focus-visible': {
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: '2px',
                },
              }}
            >
              <MenuIcon sx={{ fontSize: '1.25rem' }} />
            </IconButton>
          )}

          <Typography
            component={Link}
            to='/'
            sx={{
              fontFamily: 'inherit',
              fontSize: '1rem',
              fontWeight: 600,
              textDecoration: 'none',
              color: 'text.primary',
              transition: 'color 0.15s ease',
              '&:hover': { color: 'primary.main' },
              '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
            }}
          >
            🏠 Winter Dev Archive
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <VisitorCounter />

          <IconButton
            onClick={toggleColorMode}
            aria-label={toggleLabel}
            title={toggleLabel}
            aria-pressed={mode === 'dark'}
            sx={{
              color: 'text.secondary',
              borderRadius: '6px',
              '&:hover': { backgroundColor: 'action.hover', color: 'text.primary' },
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '2px',
              },
            }}
          >
            {mode === 'light'
              ? <DarkModeOutlinedIcon sx={{ fontSize: '1.25rem' }} />
              : <LightModeOutlinedIcon sx={{ fontSize: '1.25rem' }} />
            }
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
    {/* 고정 Header 높이만큼 본문이 가려지지 않도록 공간 확보 */}
    <Toolbar sx={{ minHeight: '64px !important', flexShrink: 0 }} />
    </>
  );
}

export default Header;
