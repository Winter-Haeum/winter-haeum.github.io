/**
 * ColorModeContext — Light / Dark 모드 상태 관리
 *
 * 초기값 결정 순서:
 *   1. localStorage (사용자 명시 선택 우선)
 *   2. prefers-color-scheme (OS/브라우저 설정)
 *   3. 'light' (기본값)
 *
 * ColorModeProvider 내부에서 ThemeProvider + CssBaseline을 함께 래핑해
 * mode 상태와 theme 객체를 한 곳에서 동기화한다.
 */
import { useCallback, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from '@/theme';
import { ColorModeContext } from './color-mode-context';

const STORAGE_KEY = 'winter-dev-archive-color-mode';

function getInitialMode() {
  // SSR 또는 window 미지원 환경 방어
  if (typeof window === 'undefined') return 'light';

  // localStorage 명시적 선택 우선
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // 시크릿 모드 등 접근 불가 시 무시
  }

  // OS/브라우저 설정 반영
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';

  return 'light';
}

/**
 * ColorModeProvider — 앱 루트에서 사용
 *
 * @param {{ children: React.ReactNode }} props
 */
export function ColorModeProvider({ children }) {
  const [mode, setMode] = useState(getInitialMode);

  const toggleColorMode = useCallback(() => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // 저장 실패 시 메모리 상태만 전환 (UX 정상 유지)
      }
      return next;
    });
  }, []);

  const theme = useMemo(
    () => (mode === 'dark' ? darkTheme : lightTheme),
    [mode]
  );

  // value 메모이제이션 — 불필요한 Provider 리렌더링 방지
  const value = useMemo(
    () => ({ mode, toggleColorMode }),
    [mode, toggleColorMode]
  );

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
