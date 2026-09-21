# Stage 6 Review

검토 파일 9개 전체 직접 열람 및 분석 완료.

---

## High Priority
(즉시 수정 필요)

**없음.** 구조적 오류, 문법 오류, 중복 선언, 런타임 버그 가능성 모두 발견되지 않음.

---

## Medium Priority
(Stage 7 전 수정 권장)

### M-1. `theme.js` — 미사용 default export

**위치**: `src/theme.js` 90~91번째 줄

```js
// main.jsx의 기본 import를 위한 default export (lightTheme)
// Stage 6에서 main.jsx를 동적 전환 방식으로 업데이트할 예정
export default lightTheme;
```

**문제**:
- 전체 `src/` 디렉토리에서 `theme.js`의 default import를 사용하는 파일이 존재하지 않음.
- `ColorModeContext.jsx`는 이미 named import(`{ lightTheme, darkTheme }`)를 사용하고 있음.
- 주석이 "Stage 6에서 업데이트 예정"이라는 미래형으로 남아 있어 혼란을 줌 (실제로는 이미 완료된 상태).

**권장 조치**: dead export 및 obsolete 주석 두 줄 모두 제거.

---

## Low Priority
(선택 사항)

### L-1. `header.jsx` — `aria-label`과 `title` 동일 값 중복

**위치**: `src/components/common/header.jsx` 60~61번째 줄

```jsx
aria-label={toggleLabel}
title={toggleLabel}
```

`aria-label`은 스크린 리더용, `title`은 마우스 툴팁용으로 역할이 다르므로 둘 다 선언하는 것은 의도적인 접근성 구현이다. 그러나 일부 스크린 리더(NVDA 등)에서 두 속성을 순서대로 읽어 같은 내용이 두 번 출력될 수 있다. `aria-label`만 선언하는 것이 더 일반적인 패턴이지만, 현재 구현이 틀린 것은 아님.

**권장 조치**: `title` prop 제거 검토 (선택). 또는 현행 유지.

---

## 각 파일별 확인 결과

### `main.jsx`
- ThemeProvider 중복: **없음**. `ColorModeProvider` 하나만 감싸고 있고, `ThemeProvider`는 `ColorModeContext.jsx` 내부에서만 선언됨.
- ColorModeProvider 구조: **정상**. `ColorModeContext.Provider` → `ThemeProvider` → `CssBaseline` → `children` 순서 올바름.

### `header.jsx`
- `aria-label` 중복 선언: **없음**. 단 하나의 `aria-label` 선언.
- `title` / `aria-label` / `aria-pressed` 적용: **모두 정상**. 각각 올바른 값으로 선언됨.

### `Callout.jsx`
- `const config` 중복 선언: **없음**. `CALLOUT_CONFIG`는 모듈 레벨에 1회, `config`는 컴포넌트 내 1회 선언.
- 다크모드 토큰 적용: **정상**. `CALLOUT_CONFIG[type][theme.palette.mode]` 패턴으로 모드 전환 시 올바른 색상 반영.

### `CodeBlock.jsx`
- `sx` 객체와 `sx` 콜백 중복 선언: **없음**. 모든 `sx` prop이 `sx={(theme) => {...}}` 콜백 형태 또는 단순 정적 속성으로 일관되게 사용됨.
- 문법 오류: **없음**. JSX 구조 및 React hook 사용 모두 정상.

### `StatusBadge.jsx`
- `STATUS_CONFIG` 구조: **정상**. 4가지 상태 + `light`/`dark` 분기 구조 일관됨.
- `theme.palette.mode` 분기: **정상**. `entry[theme.palette.mode]`로 올바르게 접근.
- 미지원 status fallback: **정상**. `STATUS_CONFIG[status] ?? STATUS_CONFIG['draft']`로 방어 처리.

### `MarkdownRenderer.jsx`
- 인라인 코드 다크모드 대응: **정상**. `sx={(theme) => (...)}` 콜백으로 ThemeContext에서 동적 읽기.
- 표 헤더/행/셀 다크모드 대응: **정상**. `thead`, `tr`, `th`, `td` 모두 `sx` 콜백 패턴 사용.
- `markdownComponents` 모듈 레벨 정의: **의도적 최적화**. 컴포넌트 함수들이 외부 상태를 클로저로 잡지 않고 MUI `sx` 콜백으로만 ThemeContext에 접근하므로, 정적 객체로 정의해도 모드 전환 시 올바르게 반응함.

### `ColorModeContext.jsx`
- `localStorage` 처리: **정상**. 읽기/쓰기 모두 `try/catch`로 보호.
- `prefers-color-scheme` 처리: **정상**. `window` 미지원 환경 방어 포함.
- `useMemo` 사용: **정상**. `theme` 객체와 `value` 객체 두 개 모두 메모이제이션. `toggleColorMode`는 `useCallback([], [])` 으로 참조 고정.
- Error 처리: **정상**. `createContext(null)` + `useColorMode`의 null 체크로 Provider 미사용 시 명확한 에러 throw.

### `use-color-mode.js`
- `useColorMode()` 훅: **정상**. context 가 null 이면 즉시 에러 throw, Provider 외부 호출 방지 패턴 올바름.

### `code-theme-tokens.js`
- `CODE_THEME.light` / `CODE_THEME.dark` 구조: **정상**. `CodeBlock.jsx`에서 사용하는 모든 토큰 키가 빠짐없이 선언됨.

---

## 최종 판단

| 항목 | 결과 |
|------|------|
| Stage 6 즉시 승인 여부 | **승인** |
| 수정 후 승인 여부 | 해당 없음 (High Priority 이슈 없음) |
| Stage 7 진행 가능 여부 | **가능** |
| M-1 처리 여부 | **완료** (2026-06-04) |

High Priority 이슈가 없으므로 Stage 7 즉시 진행 가능하다.  
M-1(`theme.js` dead export 정리) 처리 완료 — Stage 7 착수 준비 완료.
