/**
 * useColorMode — ColorModeContext 접근 훅
 *
 * @returns {{ mode: 'light' | 'dark', toggleColorMode: () => void }}
 *
 * ColorModeProvider 외부에서 호출하면 즉시 에러를 throw한다.
 *
 * Example usage:
 * const { mode, toggleColorMode } = useColorMode();
 */
import { useContext } from 'react';
import { ColorModeContext } from '@/context/color-mode-context';

export function useColorMode() {
  const ctx = useContext(ColorModeContext);
  if (ctx === null) {
    throw new Error(
      'useColorMode는 ColorModeProvider 내부에서만 사용할 수 있습니다.'
    );
  }
  return ctx;
}
