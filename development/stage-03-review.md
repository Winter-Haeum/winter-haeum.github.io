# Stage 03 Review

> 검토일: 2026-06-03
> 검토 대상: section-page.jsx / sidebar.jsx / breadcrumb.jsx / App.jsx / slugify.js
> 빌드 상태: ✅ `vite build` 성공 (425 modules, 경고 없음)

---

## 프로젝트 상태

| 항목 | 상태 |
|---|---|
| 빌드 | ✅ 성공 |
| 라우터 구조 | ✅ `/` · `/:category` · `/:category/:section` · `*` 4단 구조 정상 |
| SectionPage 라우팅 | ✅ 슬러그 역조회, 미매칭 시 NotFoundPage 렌더링 |
| Accordion Sidebar | ✅ URL 기반 상태, grid-template-rows 애니메이션 |
| Breadcrumb 3단계 | ✅ section prop 유무로 2단/3단 자동 전환 |
| 접근성 기초 | ✅ aria-hidden(섹션 목록 접힘 시), aria-current, aria-controls |
| prefers-reduced-motion | ✅ 신규 transition 전체 적용 (accordion, ExpandMoreIcon, 섹션 링크) |
| slugify 역조회 | ✅ 전체 섹션명 정상 복원 확인 |
| Stage 4 연결 지점 | ✅ `<Box component='section' aria-label='문서 목록'>` 명시적 구분 |

---

## 잘된 점

### 구조 설계

- **`grid-template-rows: 0fr ↔ 1fr` 트랜지션** — 하드코딩 없는 CSS 기반 Accordion 높이 애니메이션. 섹션 수·아이템 높이 변화에 완전히 자동 대응
- **URL 기반 Accordion 상태** — `useState` 없이 `currentCategoryId` prop 하나로 열림/닫힘 제어. 페이지 새로고침 후 상태 자동 복원, 직접 URL 입력으로도 올바른 Accordion 상태 보장
- **`aria-hidden` on collapsed ul** — `aria-hidden={isActive ? undefined : true}` 패턴으로 접힌 섹션 목록을 스크린 리더 접근에서 정확히 차단
- **`linkSx` 모듈 레벨 상수 분리** — breadcrumb.jsx 내 Home 링크·카테고리 링크 스타일 중복 제거. 일관성 유지
- **`flex: 1, minWidth: 0`** — sidebar 텍스트 span에 적용, Stage 2 L-1(ellipsis 미작동 가능성) 자연스럽게 해소

### 접근성

- `aria-controls` + `aria-expanded` — 카테고리 헤더가 어떤 요소를 제어하는지 스크린 리더에 명시
- `aria-current='page'` — Breadcrumb 마지막 항목 + Sidebar 활성 섹션 링크에 정확히 적용
- active section dot indicator `aria-hidden='true'` — 장식 요소 스크린 리더 노출 차단
- `prefers-reduced-motion` — accordion `grid-template-rows` 트랜지션, ExpandMoreIcon `transform` 트랜지션 모두 적용

### 코드 품질

- **slugify 역조회 패턴** — `sections.find(s => slugify(s) === sectionSlug)` 로 URL slug → 실제 섹션명 결정론적 복원. slug 충돌 없는 현재 데이터에서 정확히 작동
- **JSDoc Props 주석** — code-convention.md 기준 일관 준수, `[Optional]` 표기 정확
- **카테고리 뱃지 링크** — SectionPage에서 상위 카테고리로 쉽게 이동 가능, UX 동선 자연스러움

---

## 개선 권장 사항

---

### High Priority

반드시 수정 권장 — Stage 4 전에 처리하는 것이 좋음

---

#### H-1. `aria-expanded` on `<a>` — WAI-ARIA 스펙 위반

**파일**: `src/components/common/sidebar.jsx`
**위치**: 카테고리 헤더 `<Box component={Link} aria-expanded={isActive} ...>`

**문제**

WAI-ARIA 1.2 스펙에 따르면 `aria-expanded` 속성은 다음 역할(role)에만 유효하다:
`button`, `checkbox`, `combobox`, `gridcell`, `heading`, `listbox`, `option`, `row`, `rowheader`, `scrollbar`, `select`, `switch`, `tab`, `treeitem`

`<a>` 요소는 암묵적으로 `role='link'`를 가지며, `link` 역할은 위 목록에 포함되지 않는다. 따라서 현재 구현은 `aria-expanded`를 스펙에서 허용하지 않는 요소에 사용하고 있다.

**실제 영향 분석**

| 환경 | 동작 |
|---|---|
| Chrome + NVDA | `aria-expanded` 인식, "축소됨/확장됨" 안내 (비표준이지만 동작) |
| Safari + VoiceOver | `aria-expanded` 무시 가능성 높음 — link role에 미적용 |
| Firefox + NVDA | Chrome과 유사, 비표준 허용 |
| JAWS | 브라우저에 따라 다름 |

Safari + VoiceOver는 전체 iOS 사용자와 맥 사용자에게 영향. Winter Dev Archive의 주요 사용 환경이 될 수 있음.

**근본 원인**

Accordion 헤더가 동시에 링크(네비게이션)와 accordion 버튼(상태 제어)의 두 역할을 하도록 설계됨. WAI-ARIA 표준 Accordion 패턴은 `<button>`을 헤더로 사용할 것을 권고한다.

**수정 방향 (두 가지 옵션)**

옵션 A — `role='button'` + keyboard handler 명시 (표준 Accordion 패턴 준수):
```jsx
// Link 대신 Box + role='button'으로 변경
<Box
  role='button'
  tabIndex={0}
  aria-expanded={isActive}
  aria-controls={`sidebar-sections-${cat.id}`}
  onClick={() => navigate(`/${cat.slug}`)}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(`/${cat.slug}`);
    }
  }}
  ...
>
```
- 장점: WAI-ARIA 완전 준수, Space/Enter 모두 동작
- 단점: `navigate` import 필요, 브라우저 링크 미리보기 없음

옵션 B — `aria-expanded` 제거, 시각적 상태만 유지 (현재 기능 보존):
```jsx
// aria-expanded 제거, aria-controls 유지
<Box
  component={Link}
  to={`/${cat.slug}`}
  aria-controls={`sidebar-sections-${cat.id}`}
  ...
>
```
- 장점: 기존 Link 구조 유지, 탐색 UX 그대로
- 단점: 스크린 리더에 accordion 상태 미전달

> **권장**: 옵션 A. WAI-ARIA 표준 준수 + Space/Enter 양쪽 키보드 지원.  
> 단, 이 사이드바는 순수 accordion이 아닌 "탐색형 accordion"이므로,  
> 옵션 B로 수용하고 주석으로 명시적 문서화하는 것도 합리적 결정임.

---

### Medium Priority

시간 될 때 수정 — Stage 4 진행 중에 처리 가능

---

#### M-1. Sidebar ul — `list-style: none` 적용 시 VoiceOver list role 소멸 가능성

**파일**: `src/components/common/sidebar.jsx`
**위치**: `<Box component='ul' sx={{ overflow: 'hidden', listStyle: 'none', m: 0, p: 0 }}>`

**문제**

Safari + VoiceOver 조합에서 CSS `list-style: none`이 적용된 `<ul>`의 암묵적 `list` 역할을 제거하는 알려진 동작이 있다. 스크린 리더가 목록 항목 수("4개 항목 중 1번째")를 안내하지 않게 됨.

현재 `<ul>`에 `role` 속성이 명시되어 있지 않아 VoiceOver에서 목록 시맨틱이 소실될 수 있다.

**수정 방향**

```jsx
// role='list' 명시적 추가
<Box
  id={`sidebar-sections-${cat.id}`}
  component='ul'
  role='list'
  aria-hidden={isActive ? undefined : true}
  sx={{ overflow: 'hidden', listStyle: 'none', m: 0, p: 0 }}
>
```

---

#### M-2. `section-page.jsx` 콘텐츠 영역 `aria-label='문서 목록'` — Stage 4 이후 의미 불일치

**파일**: `src/pages/section-page.jsx`
**위치**: `<Box component='section' aria-label='문서 목록'>`

**문제**

현재 label은 "문서 목록"이나, Stage 4에서 SectionPage는 섹션의 개별 문서 또는 단일 Markdown 콘텐츠를 렌더링할 예정이다. 콘텐츠 구조에 따라 적합한 label이 달라진다:

| Stage 4 구조 | 적합한 aria-label |
|---|---|
| 단일 Markdown 콘텐츠 렌더링 | `'본문'` 또는 `'문서 내용'` |
| 섹션 내 문서 목록 → 각 문서 클릭 | `'문서 목록'` (현재) |

Stage 4 설계 확정 전까지 현재 값 유지. Stage 4 시작 시 콘텐츠 구조에 맞게 조정 필요.

---

#### M-3. `section-page.jsx` 콘텐츠 영역 — 프로젝트 계획의 `65ch` 최대 너비 미적용

**파일**: `src/pages/section-page.jsx`
**위치**: `<Box component='section' aria-label='문서 목록'>`

**문제**

`07-project-plan.md`에는 "본문 최대 너비 `65ch` — 한 줄이 너무 길지 않게"가 명시되어 있다. 현재 콘텐츠 영역에는 너비 제한이 없어 Stage 4에서 Markdown 콘텐츠가 추가되면 넓은 화면에서 가독성이 저하될 수 있다.

Stage 2 Review M-3(category-page maxWidth 미적용)과 동일한 패턴.

**수정 방향 (Stage 4 시작 시 함께 처리 권장)**

```jsx
// 콘텐츠 섹션에 maxWidth 추가
<Box
  component='section'
  aria-label='문서 목록'
  sx={{ maxWidth: '65ch' }}  // 또는 구체적 px 값 (약 700-800px)
>
```

또는 MarkdownRenderer 컴포넌트 자체에서 `max-width: 65ch` 적용.

---

### Low Priority

선택 사항 — 기능에 영향 없음, 코드 품질 개선

---

#### L-1. `section-page.jsx` — `react-router-dom` import 분리

**파일**: `src/pages/section-page.jsx`
**위치**: 2–3번 줄

**문제**

```jsx
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
```

동일한 외부 모듈에서 두 번 import. code-convention.md 기준("import 순서: 외부 라이브러리 → 내부 모듈")에서 명시적으로 금지하지는 않지만 관례적으로 하나로 합쳐야 한다.

**수정 방향**

```jsx
import { useParams, Link } from 'react-router-dom';
```

---

#### L-2. `sidebar.jsx` — 카테고리 헤더와 섹션 링크 간 sx 스타일 중복

**파일**: `src/components/common/sidebar.jsx`

**문제**

카테고리 헤더 링크와 섹션 링크 양쪽에 동일한 패턴이 반복된다:

```jsx
transition: 'background-color 0.1s ease, color 0.1s ease',
'&:focus-visible': {
  outline: `2px solid ${theme.palette.primary.main}`,
  outlineOffset: '-2px',
},
'@media (prefers-reduced-motion: reduce)': { transition: 'none' },
```

값은 동일하고 `px`/`py`/`pl`/`fontWeight`/`fontSize` 등만 다르다.

**수정 방향 (선택)**

파일 내 공통 sx 팩토리 함수 추출:
```js
const sidebarLinkBaseSx = (theme, isActiveState) => ({
  textDecoration: 'none',
  transition: 'background-color 0.1s ease, color 0.1s ease',
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: '-2px',
  },
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
  ...(isActiveState ? { /* active styles */ } : { /* default + hover */ }),
});
```

현재 규모에서는 인라인 유지도 허용 가능. Stage 7 Mobile Drawer 추가 시 코드량이 더 늘어날 수 있으므로 그 때 리팩토링 권장.

---

#### L-3. `grid-template-rows` 트랜지션 브라우저 지원 현황

**파일**: `src/components/common/sidebar.jsx`
**위치**: Accordion 애니메이션 Box

**현황**

| 기능 | 지원 시작 |
|---|---|
| `grid-template-rows` 값 (0fr/1fr 적용) | Chrome 57, Firefox 52, Safari 10.1 |
| `grid-template-rows` **트랜지션 애니메이션** | Chrome 107 (2022.10), Firefox 127 (2024.06), Safari 18 (2024.09) |

**영향**

- **트랜지션 미지원 브라우저**: 애니메이션 없이 즉시 show/hide. 기능적 문제 없음 (progressive enhancement)
- **0fr/1fr 적용 자체**: 매우 광범위하게 지원 — 기능적 accordion(숨김/표시)은 모든 브라우저에서 정상

`@media (prefers-reduced-motion: reduce)` 처리도 이미 되어 있으므로 별도 조치 불필요. 다만 내부 문서 또는 주석에 이 동작을 기록해두면 유지보수 시 혼선 방지.

---

#### L-4. `slugify.js` null 입력 방어 미적용 (Stage 2 L-2 이월)

**파일**: `src/utils/slugify.js`

Stage 2 Review L-2에서 이미 식별된 사항. Stage 3에서도 미수정 상태.

`sidebar.jsx`에서 `slugify(section)` 호출이 중첩 루프(categories.map → sections.map) 내에서 발생. navigation.js 데이터가 정적이므로 현재 문제 없으나, Stage 4 이후 동적 콘텐츠 로딩 시 위험도 상승.

---

#### L-5. Stage 4 대비 — 문서 상태(status) 표시 슬롯 부재

**파일**: `src/pages/section-page.jsx`

**문제**

`07-project-plan.md`에 "문서 상태(Draft/In Progress/Review/Completed)로 학습 진도를 추적"이 명시되어 있다. 현재 SectionPage 레이아웃에는 status badge를 표시할 위치가 없다.

**Stage 4 시작 시 추가 필요 위치**

```jsx
<Box component='section' aria-label='섹션 소개' sx={{ mb: 6 }}>
  <Typography component={Link} ...>{카테고리 뱃지}</Typography>
  <Typography variant='h1'>{sectionName}</Typography>

  {/* Stage 4 추가: 문서 상태 배지 */}
  {/* <StatusBadge status={frontmatter.status} /> */}
</Box>
```

Stage 4 설계 시 섹션 헤더 아래 또는 h1 우측에 status badge 영역을 명시적으로 배치하도록 설계 필요.

---

#### L-6. 하드코딩 hex 색상 — sidebar.jsx

**파일**: `src/components/common/sidebar.jsx`

Stage 2에서 category-card.jsx가 사용하던 동일한 hex 값들이 sidebar.jsx에도 하드코딩됨:

| 색상 | 용도 |
|---|---|
| `#EDE8FA` / `#2A2544` | 카테고리 active 배경 |
| `#F6F3FE` / `#221E38` | 카테고리/섹션 hover 배경 |
| `#F4F0FC` / `#241E40` | 섹션 active 배경 (신규) |

Stage 6 다크모드 작업 시 theme.js에 `palette.action.selected` 등의 커스텀 토큰으로 통합 권장.

---

## Stage 4 진행 전 체크리스트

```
[x] H-1 처리 — 옵션 B 채택: aria-expanded 제거, aria-controls 유지, 설계 주석 추가 (2026-06-03)
[x] M-1 수정 — sidebar ul에 role='list' 추가 완료 (2026-06-03)
[ ] M-2 확인 — Stage 4 콘텐츠 구조 확정 후 aria-label 업데이트
[ ] M-3 예정 — Stage 4 시작 시 콘텐츠 영역 maxWidth: '65ch' 적용
[ ] 브라우저 확인 — /frontend/html 직접 접속 → SectionPage + sidebar HTML active 확인
[ ] 브라우저 확인 — sidebar 카테고리 클릭 시 accordion 펼침/접힘 애니메이션 확인
[ ] 브라우저 확인 — 잘못된 섹션 slug(/frontend/없는섹션) → NotFoundPage 표시
[ ] 브라우저 확인 — Breadcrumb 3단계에서 카테고리 링크 클릭 → CategoryPage 이동
[x] L-1 수정 — section-page.jsx react-router-dom import 1줄로 정리 완료 (2026-06-03)
[ ] L-4 검토 — slugify null guard 추가 여부 결정 (Stage 4 동적 로딩 전 처리 권장)
[ ] L-5 예정 — Stage 4 설계 시 status badge 위치 명시
```

Stage 4에서 **반드시 선행**해야 하는 작업:
- `content/` 디렉토리 생성 + `.md` 파일 (frontmatter 포함, 최소 1개)
- `src/utils/markdownLoader.js` — `import.meta.glob('/content/**/*.md', { as: 'raw' })` 기반 수집
- `src/components/markdown/MarkdownRenderer.jsx` 생성
- `section-page.jsx` placeholder → MarkdownRenderer 교체
- 콘텐츠 영역 `maxWidth: '65ch'` (M-3) 이때 함께 처리

---

## 최종 판단

### Stage 4 진행 가능 여부: ✅ 진행 가능

**근거**

1. **H-1 완료** — 옵션 B 채택(aria-expanded 제거 + 설계 주석 명시). Link 기반 Navigation Accordion 구조로 확정.

2. **M-1 완료** — `role='list'` 추가로 VoiceOver list 시맨틱 소멸 문제 해소.

3. **M-2, M-3** — Stage 4 구현을 막는 문제 아님. M-2(aria-label)는 Stage 4 콘텐츠 구조 확정 시, M-3(`65ch`)는 MarkdownRenderer 작성 시 함께 처리.

4. **핵심 구조** — Accordion URL 기반 상태, slugify 역조회, Breadcrumb 3단계 전환, Stage 4 연결 지점 모두 Stage 4 확장에 적합하게 설계되어 있음.

### 권장 처리 순서

```
① 브라우저 수동 확인 (SectionPage, Accordion, Breadcrumb 3단계 동작 검증)
② Stage 4 설계 (Markdown 시스템 아키텍처 확정)
③ 테스트용 Markdown 파일 작성 (frontmatter 포함, 최소 1개)
④ Markdown 시스템 구현 (markdownLoader → MarkdownRenderer → Callout/CodeBlock)
```

---

## Stage 4 선행 체크리스트

```
[ ] content/ 디렉토리 생성
[ ] 테스트용 Markdown 파일 1개 작성 (frontmatter 구조 포함)
[ ] frontmatter 구조 확정 (title, category, section, tags, date, status)
[ ] markdownLoader.js 설계 (import.meta.glob 기반 수집 방식)
[ ] MarkdownRenderer 설계 (react-markdown + rehype-highlight 연동)
[ ] Callout 설계 (6가지 유형: Concept · Caution · Best Practice · Practice · Official Docs · Remember)
[ ] CodeBlock 설계 (언어 라벨 + syntax highlighting)
[ ] Status Badge 위치 확정 (section-page.jsx h1 아래 배치 여부 결정)
[ ] maxWidth: '65ch' 적용 위치 확정 (MarkdownRenderer 내부 vs section-page.jsx 콘텐츠 Box)
```
