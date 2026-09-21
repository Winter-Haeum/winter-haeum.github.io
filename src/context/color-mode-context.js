/**
 * ColorModeContext — Light / Dark 모드 컨텍스트 객체
 *
 * ColorModeContext.jsx(ColorModeProvider)와 use-color-mode.js(useColorMode) 양쪽에서
 * 공유하는 컨텍스트 정의만 이 파일에 둔다. 컴포넌트(ColorModeProvider)를 export하는
 * 파일에 컨텍스트 객체 같은 비-컴포넌트 값을 함께 export하면 Fast Refresh가 그 파일을
 * 온전히 컴포넌트 전용 모듈로 취급하지 못한다(react-refresh/only-export-components) —
 * 이 파일을 분리해 ColorModeContext.jsx는 컴포넌트만 export하도록 한다.
 *
 * createContext(null) — Provider 누락 시 useColorMode에서 명확한 에러 발생
 */
import { createContext } from 'react';

export const ColorModeContext = createContext(null);
