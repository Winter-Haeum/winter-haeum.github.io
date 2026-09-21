# Stage 6 설계 — Dark Mode 시스템

> 기준 문서: `04-color-palette.md` · `05-design-system.md` · `06-reference-analysis.md` · `07-project-plan.md`  
> 현재 구현 기준 (Stage 5 완료 상태)

---

## 1. Stage 6 목표

| 목표 | 의미 |
|---|---|
| **다크 모드 완전 지원** | 사이트 전체가 라이트/다크 두 모드에서 동일한 품질로 표시된다 |
| **명시적 선택 우선** | 사용자가 직접 선택한 모드가 OS 설정보다 우선된다 |
| **설정 영속** | 페이지를 새로고침하거나 재방문해도 이전 선택이 유지된다 |
| **하드코딩 색상 제거** | Callout · CodeBlock · StatusBadge · MarkdownRenderer 표에 남아 있는 light-only 색상을 테마 반응형으로 교체한다 |

**Stage 6 범위 외**:
- Mobile Drawer (Stage 7)
- 캐릭터 적용 (Stage 8)
- Ctrl+K, 검색 확장

---

## 2. 현재 theme.js 구조 분석

`src/theme.js`는 이미 양쪽 테마를 모두 정의하고 있다.

```
theme.js 현재 구조
├── typography       — 공통 폰트 스케일 (lightTheme / darkTheme 공유)
├── shape            — borderRadius: 8 (공통)
├── spacing          — 8 (공통)
├── lightTheme       — named export (ColorModeProvider에서 사용)
├── darkTheme        — named export (ColorModeProvider에서 사용)
└── default export   — lightTheme (유지 — 기존 코드 호환성)
```

**핵심 관찰**:
- `lightTheme` / `darkTheme` named export 분리가 이미 완성되어 있어 Stage 6에서 theme.js 자체는 수정 불필요.
- `default export`(lightTheme)는 **이번 Stage에서 제거하지 않는다**. 기존 코드에서 default import를 사용하는 경우를 보호하기 위해 그대로 유지한다.
- `ColorModeProvider`는 `lightTheme` / `darkTheme` named export를 사용해 동적으로 테마를 선택한다.

---

## 3. Light / Dark Theme 전환 구조

### 상태 흐름

```
사용자 클릭(Header 버튼)
    ↓
toggleColorMode()  ← ColorModeContext에서 제공
    ↓
setMode('dark' | 'light')  ← useState
    ↓
localStorage.setItem(KEY, mode)  ← 영속화
    ↓
useMemo → 해당 theme 객체 선택
    ↓
ThemeProvider theme={theme}  ← 하위 모든 컴포넌트 재렌더
```

### 상태 관리 위치

`src/context/ColorModeContext.jsx` 내 `ColorModeProvider` 컴포넌트가 단일 출처로 관리한다.

- `useState(getInitialMode())` — 모드 상태
- `useMemo(() => mode === 'dark' ? darkTheme : lightTheme, [mode])` — 테마 객체
- `ThemeProvider` + `CssBaseline` 내장 — 하위 전체에 테마 공급

---

## 4. ThemeProvider 구성 방식

### 현재 구조 (Stage 5 이전)

```jsx
// main.jsx
<ThemeProvider theme={theme}>     ← 고정 lightTheme
  <CssBaseline />
  <App />
</ThemeProvider>
```

### Stage 6 목표 구조

```jsx
// main.jsx
<ColorModeProvider>               ← 내부에서 ThemeProvider + CssBaseline 래핑
  <App />
</ColorModeProvider>
```

```jsx
// ColorModeContext.jsx
function ColorModeProvider({ children }) {
  const [mode, setMode] = useState(getInitialMode);   // lazy initializer
  const theme = useMemo(
    () => (mode === 'dark' ? darkTheme : lightTheme),
    [mode]
  );
  const toggleColorMode = useCallback(() => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
```

**이 구조의 이유**:
- `ColorModeContext.Provider`와 `ThemeProvider`를 `ColorModeProvider` 안에서 함께 관리해 `mode` 상태와 `theme` 객체를 한 곳에서 동기화한다.
- `CssBaseline`이 내부에 있으므로 모드 전환 시 body 배경색도 자동 업데이트된다.

---

## 5. ColorModeContext 필요 여부

**필요합니다.**

MUI의 `useTheme()`만으로는 현재 모드 판별과 토글 함수 공유가 불가능하다.

| 방식 | 장점 | 단점 |
|---|---|---|
| Context + Provider | 토글 함수를 어디서든 사용 가능 | 파일 하나 추가 |
| Props drilling | 별도 파일 없음 | Header까지 prop 전달 경로 복잡 |
| Zustand/Jotai | 외부 라이브러리로 간단 | 의존성 추가 |

단일 파일(`ColorModeContext.jsx`)이면 충분하므로 **Context 방식**을 선택한다.

```
src/context/ColorModeContext.jsx
  ├── ColorModeContext      — createContext({ mode: 'light', toggleColorMode: () => {} })
  └── ColorModeProvider     — state + localStorage + ThemeProvider 래핑
```

---

## 6. useColorMode Hook 필요 여부

**필요합니다.** Context 직접 사용을 추상화한다.

```js
// src/hooks/use-color-mode.js
import { useContext } from 'react';
import { ColorModeContext } from '@/context/ColorModeContext';

export function useColorMode() {
  return useContext(ColorModeContext);
}
```

**사용처**: `header.jsx` (토글 버튼 연결)만 사용. 다른 컴포넌트는 MUI `useTheme()` 또는 `sx` 함수 콜백으로 처리하므로 `useColorMode`를 직접 쓸 필요가 없다.

---

## 7. Header 다크모드 버튼 동작

### 현재 상태

```jsx
// header.jsx — onClick 없음, 아이콘 고정
<IconButton aria-label='다크 모드 전환'>
  <DarkModeOutlinedIcon />
</IconButton>
```

### Stage 6 변경 내용

```jsx
const { mode, toggleColorMode } = useColorMode();

<IconButton
  onClick={toggleColorMode}
  aria-label={mode === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'}
  aria-pressed={mode === 'dark'}
>
  {mode === 'light'
    ? <DarkModeOutlinedIcon sx={{ fontSize: '1.25rem' }} />
    : <LightModeOutlinedIcon sx={{ fontSize: '1.25rem' }} />
  }
</IconButton>
```

**변경 포인트**:
- `onClick` → `toggleColorMode` 연결
- `aria-label` → 현재 상태에 따라 동적 변경 (다음 동작을 설명)
- `aria-pressed` → 토글 버튼 상태 전달
- 아이콘 → 현재 모드에 반대 아이콘 표시 (dark 상태 → LightModeOutlinedIcon)
- `LightModeOutlinedIcon` import 추가

---

## 8. localStorage 저장 전략

```js
const STORAGE_KEY = 'winter-dev-archive-color-mode';
// 저장 값: 'light' | 'dark' (그 외 값은 무시)
```

**쓰기**: `toggleColorMode` 호출 시 setMode 내에서 동기 저장

**읽기 / 초기값 결정**:

```js
function getInitialMode() {
  // SSR 또는 window 미지원 환경 방어
  if (typeof window === 'undefined') return 'light';

  // localStorage 접근 — 스토리지 비활성화 환경(시크릿 모드 제한 등) 방어
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;  // 명시적 선택 우선
  } catch {
    // localStorage 접근 불가 시 무시하고 다음 단계로
  }

  // OS/브라우저 기본 설정 반영
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';

  return 'light';   // 기본값
}
```

`useState(getInitialMode)` — lazy initializer로 전달해 렌더마다 localStorage 읽기 방지.

**localStorage 쓰기도 방어**:

```js
const toggleColorMode = useCallback(() => {
  setMode((prev) => {
    const next = prev === 'light' ? 'dark' : 'light';
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // 저장 실패 시 메모리 상태만 전환 (무시)
    }
    return next;
  });
}, []);
```

**삭제**: 제공하지 않음 (단순화). 사용자가 다시 토글하면 최신 값이 덮어쓰인다.

---

## 9. prefers-color-scheme 초기 진입 처리

| 우선순위 | 소스 | 조건 |
|---|---|---|
| 1 | `localStorage` | 유효한 값(`'light'` \| `'dark'`)이 있을 때 |
| 2 | `prefers-color-scheme` | localStorage에 값 없을 때 OS/브라우저 설정 반영 |
| 3 | 기본값 `'light'` | 위 두 조건 모두 해당 없을 때 |

**초기 렌더 플래시(FOUC (Flash Of Unstyled Content)) 대책**:

정적 사이트(GitHub Pages)에서 JS가 로드되기 전 라이트 모드 배경이 먼저 보일 수 있다. 완전한 해결책(HTML `<script>` 태그 inline)은 복잡도가 높으므로 Stage 6에서는 허용한다. 실제로는 번들이 로드될 때까지의 시간이 짧아 체감 영향이 낮다.

---

## 10. 수정 대상 컴포넌트 목록

### ① 코드 변경 필요 (하드코딩 색상 또는 미연결 로직)

| 파일 | 변경 내용 |
|---|---|
| `src/main.jsx` | ThemeProvider+CssBaseline 제거 → ColorModeProvider 사용 |
| `src/components/common/header.jsx` | toggleColorMode 연결 + 아이콘/aria 동적화 |
| `src/components/markdown/Callout.jsx` | 6개 유형 하드코딩 → useTheme() + 이중 토큰 |
| `src/components/markdown/CodeBlock.jsx` | 25+ 하드코딩 → sx 콜백 + 다크 hljs 토큰 |
| `src/components/ui/StatusBadge.jsx` | 4개 상태 하드코딩 → useTheme() + 이중 토큰 |
| `src/components/markdown/MarkdownRenderer.jsx` | 표 + 인라인 코드 하드코딩 → sx 콜백 |

### ② 이미 테마 반응형 (변경 불필요)

| 파일 | 근거 |
|---|---|
| `sidebar.jsx` | `theme.palette.mode`로 분기 처리 완료 |
| `header.jsx` (비버튼 부분) | palette 토큰 사용 |
| `footer.jsx` | palette 토큰 사용 |
| `breadcrumb.jsx` | palette 토큰 사용 |
| `category-card.jsx` | `theme.palette.mode` 분기 완료 |
| `section-card.jsx` | `theme.palette.mode` 분기 완료 |
| `category-page.jsx` | palette 토큰만 사용 |
| `search-page.jsx` | palette 토큰 + mode 분기 완료 |
| `doc-page.jsx` | palette 토큰 사용 |
| `section-page.jsx` | palette 토큰 + mode 분기 완료 |
| `home-page.jsx` | `theme.palette.mode` 분기 완료 |
| `search-bar.jsx` | palette 토큰 + mode 분기 완료 |
| `search-result-card.jsx` | `theme.palette.mode` 분기 완료 |
| `search-empty-state.jsx` | palette 토큰 사용 |
| `not-found-page.jsx` | palette 토큰 사용 (확인 필요) |

---

## 11. 하드코딩 색상 제거 계획

### 11-1. Callout.jsx

**현재 문제**: `CALLOUT_CONFIG`에 light 모드 색상만 정의됨.

```js
// 현재 — light only
const CALLOUT_CONFIG = {
  'concept': { bar: '#BCA4EC', bg: '#F4F0FC' },
  // ...
};
```

**변경 방향**: 이중 토큰 구조로 교체 + `useTheme()` 사용

```js
// 변경 후 — dual mode
const CALLOUT_CONFIG = {
  'concept': {
    light: { bar: '#BCA4EC', bg: '#F4F0FC' },
    dark:  { bar: '#6858A8', bg: '#221E38' },
  },
  'caution': {
    light: { bar: '#8464C8', bg: '#F0EAF8' },
    dark:  { bar: '#7050A0', bg: '#281E3C' },
  },
  'best-practice': {
    light: { bar: '#6070C0', bg: '#EAEef8' },
    dark:  { bar: '#5060A8', bg: '#20243C' },
  },
  'practice': {
    light: { bar: '#A080DC', bg: '#EDE8FA' },
    dark:  { bar: '#9070C8', bg: '#2A2544' },
  },
  'official-docs': {
    light: { bar: '#7080C8', bg: '#E8EDF8' },
    dark:  { bar: '#5870A8', bg: '#1E2238' },
  },
  'remember': {
    light: { bar: '#C890C8', bg: '#F5E8F4' },
    dark:  { bar: '#9060A8', bg: '#2C1A30' },
  },
  'note': {
    light: { bar: '#BCA4EC', bg: '#F4F0FC' },
    dark:  { bar: '#6858A8', bg: '#221E38' },
  },
};
```

컴포넌트에서 `useTheme()` import 후 `theme.palette.mode`로 선택.

**`role` 개선도 함께 처리**: `caution` 유형에 `role='alert'` 적용 (Stage 4 리뷰 지적 사항).

---

### 11-2. CodeBlock.jsx

**현재 문제**: 컨테이너 배경, 헤더, 25개 이상 hljs 토큰이 모두 light 하드코딩.

**변경 방향**: `Box component='pre'`의 `sx`를 콜백 함수로 전환

```jsx
// 변경 후
<Box
  component='pre'
  sx={(theme) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#EAE3D8' : '#16142A',
    border: `1px solid ${theme.palette.mode === 'light' ? '#CEC8BC' : '#3C3858'}`,
    // ...
    '& .hljs-keyword': {
      color: theme.palette.mode === 'light' ? '#8464C8' : '#C8B4F0',
    },
    '& .hljs-string': {
      color: theme.palette.mode === 'light' ? '#7A96C0' : '#A8C4D8',
    },
    // ...
  })}
>
```

헤더 Box도 동일하게 콜백으로 전환:

```jsx
<Box
  sx={(theme) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#DDD5C8' : '#24203A',
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#CEC8BC' : '#3C3858'}`,
  })}
>
```

언어 라벨 Typography와 복사 버튼 IconButton도 theme 콜백으로 전환.

**다크 토큰 매핑** (04-color-palette.md 기준):

| 요소 | Light | Dark |
|---|---|---|
| 블록 배경 | `#EAE3D8` | `#16142A` |
| 블록 border | `#CEC8BC` | `#3C3858` |
| 헤더 배경 | `#DDD5C8` | `#24203A` |
| 언어 라벨 | `#7A7490` | `#8880A0` |
| 기본 텍스트 | `#2C2840` | `#E8E4EE` |
| `.hljs-keyword` | `#8464C8` | `#C8B4F0` |
| `.hljs-string` | `#7A96C0` | `#A8C4D8` |
| `.hljs-number` `.hljs-literal` | `#A87EB0` | `#D4A8CC` |
| `.hljs-function` `.hljs-built_in` `.hljs-title` | `#9060B8` | `#B090D4` |
| `.hljs-comment` `.hljs-doctag` | `#B8B2C8` | `#6C6880` |
| `.hljs-tag` `.hljs-name` `.hljs-selector-tag` | `#7080C8` | `#A4AADA` |
| `.hljs-attr` `.hljs-attribute` `.hljs-property` | `#A880C0` | `#C8A4C4` |
| `.hljs-operator` `.hljs-punctuation` `.hljs-params` `.hljs-variable` | `#4A4560` | `#C4BCCE` |

---

### 11-3. StatusBadge.jsx

**현재 문제**: `STATUS_CONFIG`에 light 색상만 존재.

**변경 방향**: 이중 토큰 구조 + `useTheme()` 사용

```js
const STATUS_CONFIG = {
  'draft': {
    label: 'DRAFT',
    light: { bg: '#EAE3D8', color: '#7A7490', border: '#DDD5C8' },
    dark:  { bg: '#24203A', color: '#8880A0', border: '#3C3858' },
  },
  'in-progress': {
    label: 'IN PROGRESS',
    light: { bg: '#EDE8FA', color: '#8464C8', border: '#BCA4EC' },
    dark:  { bg: '#2A2544', color: '#B39EDD', border: '#5C5490' },
  },
  'review': {
    label: 'REVIEW',
    light: { bg: '#D4C8F4', color: '#5E3EA8', border: '#A080DC' },
    dark:  { bg: '#2E2A48', color: '#C8B8F0', border: '#6858A8' },
  },
  'completed': {
    label: 'COMPLETED',
    light: { bg: '#EAEef8', color: '#6070C0', border: '#8898D8' },
    dark:  { bg: '#20243C', color: '#A4AADA', border: '#5060A8' },
  },
};
```

컴포넌트에서 `useTheme()` 후 `theme.palette.mode`로 분기.

---

### 11-4. MarkdownRenderer.jsx (표 + 인라인 코드)

**현재 문제**: 표 관련 4개 컴포넌트와 인라인 code에 하드코딩 색상 존재.

`markdownComponents`는 모듈 스코프에 있으나, MUI `Box`의 `sx` 콜백 함수는 렌더 시점에 테마를 받으므로 수정만으로 반응형이 된다.

**변경 대상**:

```jsx
// thead — 배경
thead: ({ children }) => (
  <Box component='thead' sx={(theme) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#F2EDE6' : '#24203A',
  })}>

// tr — border
tr: ({ children }) => (
  <Box component='tr' sx={(theme) => ({
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#DDD5C8' : '#3C3858'}`,
  })}>

// th — 텍스트 색상 + border
th: ({ children }) => (
  <Box component='th' sx={(theme) => ({
    p: '8px 12px',
    fontWeight: 600,
    textAlign: 'left',
    color: theme.palette.mode === 'light' ? '#2C2840' : '#F0EBE3',
    borderRight: `1px solid ${theme.palette.mode === 'light' ? '#DDD5C8' : '#3C3858'}`,
    '&:last-child': { borderRight: 0 },
  })}>

// td — 동일 방식

// code (인라인) — 배경 + 텍스트
code: ({ className, children }) => {
  if (/\blanguage-/.test(className ?? '')) { ... }
  return (
    <Box component='code' sx={(theme) => ({
      backgroundColor: theme.palette.mode === 'light' ? '#EAE3D8' : '#2E2A48',
      color: theme.palette.mode === 'light' ? '#5E3EA8' : '#C8B8F0',
      // ...
    })}>
  );
}
```

---

## 12. 디자인 시스템과의 충돌 여부

`04-color-palette.md`에 CSS 예시로 `[data-theme='dark']` 선택자가 사용되어 있으나, 이 프로젝트는 **MUI ThemeProvider 방식**을 사용하므로 CSS 파일의 `[data-theme]` 선택자는 사용하지 않는다.

대신 MUI의 `sx` 콜백 + `useTheme()` 방식으로 동일한 토큰을 구현한다.

**충돌 없음**: 디자인 시스템 문서의 색상 토큰 값 자체는 동일하게 사용. 적용 메커니즘만 다르다.

**주의**: `theme.js`에 정의된 MUI 팔레트 토큰(`palette.primary.main`, `palette.background.paper` 등)은 두 테마에서 서로 다른 값으로 이미 매핑되어 있으므로 이 토큰을 사용하는 컴포넌트는 자동으로 전환된다. 하드코딩 HEX는 이 자동 전환에서 빠져 있으므로 수동으로 교체한다.

---

## 13. 접근성 고려사항

### 명도 대비 (WCAG 2.1 AA)

`04-color-palette.md`에 정의된 다크 모드 조합:

| 텍스트 | 배경 | 대비비 | 기준 |
|---|---|---|---|
| `#F0EBE3` (primary) | `#1C182C` (bg) | ≥ 7:1 | ✅ AAA |
| `#B39EDD` (violet-500 dark) | `#1C182C` | ≥ 4.5:1 | ✅ AA |

Callout 내부, CodeBlock 배경, StatusBadge도 동일 비율로 설계됨.

### focus-visible

현재 컴포넌트들은 `primary.main` 토큰 기반으로 `outline`을 지정한다. 다크 모드에서 `primary.main`은 `#B39EDD`(light-violet)로 자동 전환되어 크림 배경 대비 AA 이상을 유지한다. **별도 수정 불필요**.

### prefers-reduced-motion

현재 구현에 이미 `@media (prefers-reduced-motion: reduce) { transition: none; }`가 적용되어 있다. 다크/라이트 전환 애니메이션을 추가할 경우에도 동일하게 처리해야 한다. Stage 6에서는 애니메이션 없이 즉각 전환하므로 별도 처리 없음.

---

## 14. 구현 순서

의존성이 낮은 것부터 쌓아올리는 bottom-up 순서.

```
Step 1  ColorModeContext.jsx 생성
        getInitialMode() + useState + localStorage + ThemeProvider 내장
        export { ColorModeContext, ColorModeProvider }

Step 2  use-color-mode.js 생성
        useContext(ColorModeContext) 래퍼

Step 3  main.jsx 수정
        ThemeProvider + CssBaseline 제거 → <ColorModeProvider> 교체

Step 4  header.jsx 수정
        useColorMode() 연결 + 아이콘/aria-label 동적화

Step 5  StatusBadge.jsx 수정
        STATUS_CONFIG 이중 토큰 + useTheme()

Step 6  Callout.jsx 수정
        CALLOUT_CONFIG 이중 토큰 + useTheme()
        caution 유형에 role='alert' 추가 (Stage 4 리뷰 사항)

Step 7  CodeBlock.jsx 수정
        모든 sx를 콜백 함수로 전환 + 다크 hljs 토큰 추가

Step 8  MarkdownRenderer.jsx 수정
        표 컴포넌트 + 인라인 코드 sx 콜백으로 전환
```

---

## 15. 테스트 방법

| Step | 확인 항목 |
|---|---|
| Step 1–3 완료 후 | 개발 서버 기동. 기존 라이트 모드 화면이 정상 렌더링되는지 확인 (회귀 없음) |
| Step 4 완료 후 | 헤더 버튼 클릭 → 전체 배경/텍스트/사이드바 색상 전환 확인. 새로고침 후 모드 유지 확인 |
| Step 4 완료 후 | OS 설정 다크 모드 후 페이지 최초 진입 → 다크 모드로 시작하는지 확인 |
| Step 4 완료 후 | localStorage `winter-dev-archive-color-mode` 키에 `'dark'` 저장 확인 |
| Step 5 완료 후 | `/ai-vibe-coding/setup/step-1-env` → StatusBadge 4가지 상태가 다크 모드에서 정상 색상 표시 |
| Step 6 완료 후 | 동일 URL → 6가지 Callout 유형이 다크 배경과 바 색상으로 표시 |
| Step 7 완료 후 | 동일 URL → 코드 블록 헤더/배경/토큰 색상이 다크 팔레트로 전환 |
| Step 7 완료 후 | 복사 버튼 hover 시 보라 하이라이트가 다크 모드에서도 동작 확인 |
| Step 8 완료 후 | 동일 URL → 표 헤더 배경이 `#24203A`, 셀 border가 `#3C3858`로 표시 |
| Step 8 완료 후 | 인라인 코드 배경이 `#2E2A48`, 텍스트가 `#C8B8F0`으로 표시 |
| 전체 완료 후 | `/search` 검색 결과 카드, SearchBar, EmptyState 다크 모드 표시 확인 (이미 구현됨) |
| 전체 완료 후 | 라이트 ↔ 다크 반복 전환 시 레이아웃 깨짐 없음 확인 |

---

## 16. 예상 리스크

| 리스크 | 가능성 | 대응 방향 |
|---|---|---|
| **초기 렌더 플래시** (FOUC (Flash Of Unstyled Content)) | 중간 | localStorage 읽기가 JS 로드 후 실행되어 dark mode 설정 시 순간 light 화면이 보일 수 있다. 개인 아카이브 수준에서는 허용 |
| **CodeBlock `sx` 콜백 양** | 낮음 | 25개 이상 토큰을 mode 분기로 작성하면 코드가 길어진다. 토큰 맵 객체로 분리하면 관리 용이 |
| **MarkdownRenderer `markdownComponents` 모듈 스코프 문제** | 낮음 | `sx` 콜백 함수는 렌더 시점에 테마를 참조하므로 모듈 스코프에서 정의해도 정상 작동. 단, 잘못 작성 시 캐시된 값을 참조할 수 있어 주의 필요 |
| **prefers-color-scheme 미지원 환경** | 매우 낮음 | `window.matchMedia` 미지원 브라우저에서 TypeError. `try/catch` 또는 조건 체크로 방어 |
| **Callout 다크 텍스트 색상 미지정** | 낮음 | 설계 문서에 텍스트 색상이 누락된 유형 있음. 04-color-palette.md 기준으로 `dark-text-primary (#F0EBE3)` 또는 유형별 명시 색상 사용 |

---

## 17. Stage 6 완료 후 기대 효과

| 항목 | 현재 | Stage 6 완료 후 |
|---|---|---|
| 야간 사용 편의 | 라이트 모드만 | 눈 피로 감소하는 딥 퍼플 잉크 배경 사용 가능 |
| OS 연동 | 없음 | 초기 진입 시 OS 설정 반영 |
| 사용자 선택 영속 | 없음 | 재방문 시 이전 설정 유지 |
| 하드코딩 색상 | 4개 파일 잔존 | 전체 제거, 디자인 토큰 기반 관리 |
| 코드 일관성 | Callout/CodeBlock 등 특수 컴포넌트만 분리 처리 | 모든 컴포넌트가 동일한 MUI sx 패턴 사용 |
| 디자인 시스템 완성도 | Light 반쪽 구현 | "크림 노트" + "딥 퍼플 잉크" 양쪽 컨셉 완성 |
