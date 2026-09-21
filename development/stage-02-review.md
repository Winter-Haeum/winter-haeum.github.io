# Stage 02 Review

> 검토일: 2026-06-03
> 검토 대상: App.jsx / category-page.jsx / not-found-page.jsx / sidebar.jsx / breadcrumb.jsx / section-card.jsx / slugify.js / navigation.js
> 빌드 상태: ✅ `vite build` 성공 (423 modules, 경고 없음)

---

## 프로젝트 상태

| 항목 | 상태 |
|---|---|
| 빌드 | ✅ 성공 |
| 라우터 구조 | ✅ `/` · `/:category` · `*` 3단 구조 정상 |
| CategoryPage 라우팅 | ✅ 슬러그 매칭, 미매칭 시 NotFoundPage 렌더링 |
| Simplified Sidebar | ✅ 정적 목록 + active 표시 |
| SectionCard Link | ✅ `/:category/:sectionSlug` 연결 |
| Breadcrumb | ✅ Home > 카테고리명 구조 |
| slugify | ✅ 전체 섹션명 정상 변환 확인 |
| 접근성 기초 | ✅ aria-label, aria-current, aria-hidden, focus-visible |
| prefers-reduced-motion | ✅ 전체 인터랙티브 요소 적용 |
| description 필드 | ✅ 11개 카테고리 전체 추가 |

---

## 잘된 점

### 구조 설계

- **컴포넌트 단일 책임 원칙 철저 준수** — sidebar, breadcrumb, section-card가 각각 독립된 파일로 분리되어 Stage 3 Accordion 추가 시 sidebar.jsx만 수정하면 됨
- **SectionCard의 Link 선행 구현** — Stage 3에서 SectionPage Route만 추가하면 별도 수정 없이 연결되는 구조. 미래 확장을 위한 올바른 판단
- **`return <NotFoundPage />`** — 유효하지 않은 카테고리 슬러그 진입 시 URL을 유지하면서 404 콘텐츠 표시. `<Navigate>` 대비 UX 자연스러움
- **React Router v6 route 순서** — `/` → `/:category` → `*` 순서가 v6 rank 알고리즘과 일치. 향후 `/search` 등 정적 경로를 추가해도 `/:category`보다 높은 rank를 자동 부여받아 충돌 없음

### 접근성

- `aria-current='page'` — sidebar 활성 항목에 정확히 적용
- `aria-label` — `<aside aria-label='카테고리 탐색'>`, `<nav aria-label='카테고리 목록'>`, 각 section에 label 부여
- 이모지 전체 `aria-hidden='true'` 일관 적용
- `prefers-reduced-motion` — sidebar, section-card, breadcrumb 모든 transition에 적용

### 코드 품질

- **`slugify` 별도 유틸 분리** — 섹션 슬러그 생성 로직을 한 곳에서 관리. Stage 3에서 동일 로직 재사용 가능
- **JSDoc Props 주석 형식** — code-convention.md 기준 일관 준수
- **`isActive` 삼항 spread 패턴** — active/inactive 스타일을 sx 내에서 명확히 분기, 가독성 높음
- **navigation.js description 문체** — 11개 전체가 `~합니다` 종결어미로 일관성 유지

---

## 개선 권장 사항

---

### High Priority

반드시 수정 권장 — Stage 3 전에 처리하는 것이 좋음

---

#### H-1. Sidebar `md` (900px) 기준 → 섹션 카드 레이아웃 붕괴

**파일**: `src/components/common/sidebar.jsx`
**위치**: `display: { xs: 'none', md: 'block' }`

**문제**

설계 의도 (07-project-plan.md):
- 태블릿 (768px–1023px): 사이드바 숨김
- 데스크톱 (≥ 1024px): 사이드바 고정

현재 구현은 `md` = 900px부터 사이드바를 표시한다. 900px는 설계상 '태블릿' 영역이다.

**실측 레이아웃 계산 (viewport 900px 기준)**

| 구성 | 너비 |
|---|---|
| viewport | 900px |
| Sidebar | 260px |
| content Box | 640px |
| Box px (md: 4, 양쪽 32px) | - 64px |
| Grid 실사용 너비 | 576px |
| Grid spacing={2} gap 합계 | - 32px |
| **3열 각 카드 너비** | **≈ 181px** |
| SectionCard px={3} (양쪽 24px) | - 48px |
| **카드 텍스트 영역** | **≈ 133px** |

0.9375rem Pretendard 기준 문자당 약 8–8.5px:

| 섹션명 | 추정 너비 | 결과 |
|---|---|---|
| Regular Expression | ~144px | ❌ 2줄 wrap |
| React + TypeScript | ~144px | ❌ 2줄 wrap |
| State Management | ~128px | ⚠️ 경계 (폰트에 따라 wrap) |
| Arrays & Objects | ~128px | ⚠️ 경계 |

900–1023px 구간에서 SectionCard 텍스트 줄바꿈 발생. section-card.jsx의 Typography는 `whiteSpace: nowrap` 처리가 없으므로 카드 높이가 불균일해짐.

**수정 방향 (두 가지 중 선택)**

옵션 A — `lg` (1200px) 사용 (권장, MUI 기본 breakpoint 활용):
```js
// sidebar.jsx
display: { xs: 'none', lg: 'block' }
```
- 장점: MUI 내장 breakpoint, 코드 변경 최소
- 단점: 1024–1199px 구간에서도 사이드바 숨김 (설계상 허용 가능)

옵션 B — custom 1024px media query (설계 의도에 정확히 부합):
```js
// sidebar.jsx
display: 'none',
'@media (min-width: 1024px)': { display: 'block' },
```
- 장점: 07-project-plan.md 기준 정확히 구현
- 단점: MUI responsive 객체 외 별도 media query

> **Stage 7에서 반응형을 종합 처리할 예정이므로 옵션 A로 임시 처리 후 Stage 7에서 정리하는 것이 현실적.**

---

### Medium Priority

시간 될 때 수정 — Stage 3 진행 중에 처리 가능

---

#### M-1. `not-found-page.jsx` — DOM에 `<h1>` 두 개 존재

**파일**: `src/pages/not-found-page.jsx`
**위치**: 24번 줄, 33번 줄

**문제**

```jsx
// 현재: variant='h1' → <h1 aria-hidden="true">404</h1> 렌더링
<Typography variant='h1' aria-hidden='true' ...>
  404
</Typography>

// 현재: component='h1' → <h1>페이지를 찾을 수 없습니다</h1>
<Typography variant='h4' component='h1' ...>
  페이지를 찾을 수 없습니다
</Typography>
```

`aria-hidden='true'`로 스크린 리더는 두 번째 h1만 읽어 기능적으로는 문제없으나, DOM에 `<h1>` 두 개가 존재해 HTML 시맨틱 위반. Lighthouse 접근성 감사 및 SEO 크롤러에서 플래그될 수 있음.

**수정 방향**

```jsx
// 수정 후: 장식용 숫자에 component='p' 사용
<Typography variant='h1' component='p' aria-hidden='true' ...>
  404
</Typography>
```

`variant='h1'`은 시각적 크기만 제어하고, 실제 HTML 요소는 `<p>`로 렌더링하면 두 h1 문제 해결.

---

#### M-2. Sidebar `top: '64px'` / `height: 'calc(100vh - 64px)'` 하드코딩

**파일**: `src/components/common/sidebar.jsx`
**위치**: `top: '64px'`, `height: 'calc(100vh - 64px)'`

**문제**

Header의 minHeight(`64px`)가 변경되면 sidebar의 sticky 위치와 높이가 함께 어긋남. 현재 header.jsx에도 `64px`가 하드코딩(`minHeight: '64px !important'`)되어 있어 두 파일이 암묵적으로 결합됨.

**수정 방향 (Stage 6 이후 적용 권장)**

```js
// theme.js에 상수 정의
export const HEADER_HEIGHT = 64;

// sidebar.jsx
import { HEADER_HEIGHT } from '@/theme';
top: `${HEADER_HEIGHT}px`,
height: `calc(100vh - ${HEADER_HEIGHT}px)`,

// header.jsx Toolbar도 동일 상수 사용
minHeight: `${HEADER_HEIGHT}px`,
```

Stage 6에서 Header를 수정할 때 함께 처리 권장.

---

#### M-3. `category-page.jsx` — 메인 콘텐츠 최대 너비 없음

**파일**: `src/pages/category-page.jsx`
**위치**: `<Box component='main' sx={{ flex: 1, ... }}>` 내부

**문제**

사이드바 제외 콘텐츠 영역에 `maxWidth` 제한이 없음. 1920px 모니터 기준:

```
viewport 1920px − sidebar 260px − padding 64px = 1596px 콘텐츠 영역
```

breadcrumb, 카테고리 제목은 `maxWidth: '60ch'`로 제한되지만 섹션 Grid는 제약 없이 늘어남. 3열 기준 카드 1개가 약 521px로 과도하게 넓어짐.

**수정 방향**

```jsx
// 수정 후: 메인 콘텐츠에 maxWidth 추가
<Box
  component='main'
  sx={{ flex: 1, py: ..., px: ..., maxWidth: 'calc(100% - 0px)' }}
>
  <Box sx={{ maxWidth: '1100px' }}>  {/* 또는 Container maxWidth='lg' disableGutters 활용 */}
    ...
  </Box>
</Box>
```

또는 sections Grid에만 적용:
```jsx
<Grid container spacing={2} sx={{ maxWidth: '900px' }}>
```

---

#### M-4. `section-card.jsx` — `height: '100%'` 미적용으로 그리드 행 높이 불균일 가능

**파일**: `src/components/ui/section-card.jsx`
**위치**: 최상단 Box sx

**문제**

SectionCard Typography는 `whiteSpace: nowrap` 처리가 없어 좁은 그리드에서 줄바꿈 발생 시 카드 높이가 달라짐. H-1 수정(사이드바 lg 기준 변경) 후 대부분 해결되지만 일부 좁은 구간에서 잔존 가능.

**수정 방향**

```jsx
// section-card.jsx 최상단 Box에 height: '100%' 추가
sx={(theme) => ({
  height: '100%',   // 추가
  display: 'flex',
  alignItems: 'center',
  ...
})}
```

Grid 행 내 모든 카드 높이를 일치시켜 시각적 정렬 유지.

---

### Low Priority

선택 사항 — 기능에 영향 없음, 코드 품질 개선

---

#### L-1. Sidebar 텍스트 span에 `minWidth: 0` 누락 — 이론적 ellipsis 미작동 가능성

**파일**: `src/components/common/sidebar.jsx`
**위치**: 텍스트 span sx

**문제**

Flexbox 자식 요소의 기본 `minWidth`는 `auto`(콘텐츠 크기). `minWidth: 0` 또는 `flex: 1`이 없으면 텍스트 span이 `overflow: hidden` + `textOverflow: ellipsis` 설정에도 줄어들지 않아 ellipsis가 작동 안 할 수 있음. 현재 카테고리명 최장("Frontend Fundamentals", 22자)은 추정 사용 가능 너비(~192px)에 수렴하여 실제 문제 미발생. 향후 더 긴 카테고리명 추가 시 버그 표면화.

**수정 방향**

```jsx
// 현재
<Box component='span' sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>

// 수정 후
<Box component='span' sx={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
```

---

#### L-2. `slugify.js` null/undefined 입력 방어 없음

**파일**: `src/utils/slugify.js`

**문제**

`slugify(null)` 호출 시 `TypeError: Cannot read properties of null (reading 'toLowerCase')`. 현재 호출처(section-card.jsx)는 navigation.js의 정적 문자열만 전달하므로 실제 오류 없음. Stage 3 이후 동적 데이터 연동 시 위험도 증가.

**수정 방향**

```js
export function slugify(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
```

---

#### L-3. `category-page.jsx`가 `not-found-page.jsx`를 직접 import

**파일**: `src/pages/category-page.jsx`
**위치**: `import NotFoundPage from '@/pages/not-found-page'`

**문제**

페이지 컴포넌트 간 직접 의존 관계 생성. 기술적 문제는 없으나, 향후 NotFoundPage를 크게 리팩토링하면 CategoryPage도 영향받는 암묵적 결합.

**현재 유지 이유**

`<Navigate to='/not-found' replace />`를 사용하면 추가 Route가 필요하고 URL이 변경됨. 현재 방식(`return <NotFoundPage />`)은 URL을 유지하여 사용자가 잘못 입력한 슬러그를 직접 볼 수 있어 오히려 자연스러운 UX. 즉시 변경 불필요.

---

#### L-4. Stage 3 대비 — Sidebar prop 확장 필요 예고

**파일**: `src/components/common/sidebar.jsx`

**현재 구조**

```jsx
function Sidebar({ currentCategoryId }) { ... }
```

**Stage 3에서 필요한 변경**

Accordion 사이드바 구현 시 현재 펼쳐진 섹션(활성 섹션)을 표시하기 위해 `currentSectionSlug` prop 추가 필요 예상:

```jsx
// Stage 3 예상 시그니처
function Sidebar({ currentCategoryId, currentSectionSlug }) { ... }
```

**현재 조치 불필요** — Stage 3 시작 시 prop 추가. 현재 구조는 확장에 친화적으로 설계되어 있어 영향 범위 최소.

---

#### L-5. `section-card.jsx` — `slugify` 매 렌더 재계산

**파일**: `src/components/ui/section-card.jsx`
**위치**: `const sectionSlug = slugify(section)`

**문제**

렌더마다 `slugify`가 실행됨. 섹션명은 고정 문자열이므로 결과도 항상 동일. SectionCard는 사실상 정적 컴포넌트라 성능 영향 무시 가능.

**수정 방향 (선택)**

```jsx
// useMemo 사용 또는 부모에서 미리 계산하여 prop으로 전달
// Stage 3에서 section 데이터 구조를 확장할 때 함께 처리 권장
```

---

## Stage 3 진행 전 체크리스트

```
[x] H-1 수정 — sidebar display를 md → lg 변경 완료 (2026-06-03)
[x] M-1 수정 — not-found-page.jsx 404 Typography에 component='p' 추가 완료 (2026-06-03)
[ ] M-2 검토 — 64px 하드코딩은 Stage 6 Header 수정 시 함께 처리 여부 결정
[ ] M-3 검토 — maxWidth 실제 화면 확인 후 필요 시 추가
[x] M-4 수정 — section-card height: '100%' 추가 완료 (2026-06-03)
[ ] 브라우저 확인 — /frontend, /javascript 등 6개 이상 카테고리 직접 탐색
[ ] 브라우저 확인 — 잘못된 슬러그 입력 시 NotFoundPage 표시 여부
[ ] 브라우저 확인 — 섹션 카드 클릭 → /:category/:section URL → NotFoundPage 표시 여부
[ ] 브라우저 확인 — Sidebar active 표시가 카테고리 이동 시 정확히 전환되는지
[ ] L-1~L-5 — 기능 영향 없음, 시간 될 때 처리
```

Stage 3에서 **반드시 선행**해야 하는 작업:
- `/:category/:section` Route 추가 (App.jsx)
- `src/pages/section-page.jsx` 생성
- `sidebar.jsx`에 Accordion 및 `currentSectionSlug` prop 추가
- `content/` 디렉토리에 Markdown 파일 생성 (최소 1개)

---

## 최종 판단

### Stage 3 진행 가능 여부: ✅ 진행 가능 (H-1 수정 후 권장)

**근거**

1. **H-1 (Sidebar breakpoint)** 은 900–1023px 구간에서 레이아웃 문제를 유발하지만, 일반적인 개발 환경(1440px+)에서는 체감되지 않음. 단, `lg`로 변경하는 것이 1줄 수정이므로 Stage 3 시작 전에 처리 강력 권장.

2. **M-1~M-4** 는 Stage 3 구현을 막는 문제가 아님. 특히 M-4(height: 100%)는 H-1 해결 후 자연스럽게 완화됨.

3. **핵심 구조** — 라우터 설계, 컴포넌트 분리, slugify 유틸, SectionCard Link 구조 모두 Stage 3 확장에 적합하게 설계되어 있음.

### 권장 처리 순서

```
① H-1 수정 (sidebar.jsx 1줄: md → lg)
② M-1 수정 (not-found-page.jsx 1줄: variant='h1' component='p')
③ M-4 수정 (section-card.jsx 1줄: height: '100%' 추가)
④ Stage 3 구현 시작
```
