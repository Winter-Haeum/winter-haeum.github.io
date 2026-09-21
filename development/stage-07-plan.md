# Stage 7 구현 계획 — Mobile Navigation Drawer

> 기준: `stage-07-design.md` 승인 완료  
> 구현 시작 전 확정 계획서

---

## 1. 생성 파일 목록

| 파일 | 역할 |
|---|---|
| `src/components/common/NavigationDrawer.jsx` | 모바일 카테고리 탐색 Drawer 컴포넌트 |

---

## 2. 수정 파일 목록

| 파일 | 변경 요약 |
|---|---|
| `src/components/common/header.jsx` | `onMenuClick`, `isDrawerOpen` optional props 추가 + 햄버거 버튼 조건부 렌더링 |
| `src/pages/category-page.jsx` | `drawerOpen` state + Header props 연결 + NavigationDrawer 렌더링 |
| `src/pages/section-page.jsx` | 위와 동일 |
| `src/pages/doc-page.jsx` | 위와 동일 |

---

## 3. 구현 순서

```
Step 1  NavigationDrawer.jsx 생성
        가장 독립적인 컴포넌트. 이 파일만으로 Drawer 내부가 완성됨.

Step 2  header.jsx 수정
        NavigationDrawer와 연결 고리인 onMenuClick/isDrawerOpen props 추가.
        조건부 햄버거 버튼 렌더링.

Step 3  category-page.jsx 수정
        drawerOpen state + Header/NavigationDrawer 연결.
        currentSectionSlug 없이 currentCategoryId만 전달.

Step 4  section-page.jsx 수정
        Step 3과 동일 + currentSectionSlug 추가 전달.

Step 5  doc-page.jsx 수정
        Step 4와 동일.
```

---

## 4. 각 파일별 수정 내용

### 4-1. `NavigationDrawer.jsx` (신규)

**Props**:

```jsx
/**
 * NavigationDrawer — 모바일 카테고리 탐색 Drawer
 *
 * Props:
 * @param {boolean}  open               - Drawer 열림 여부 [Required]
 * @param {function} onClose            - Drawer 닫기 핸들러 [Required]
 * @param {string}   currentCategoryId  - 현재 활성 카테고리 id [Required]
 * @param {string}   [currentSectionSlug] - 현재 활성 섹션 슬러그 [Optional]
 *
 * Example usage:
 * <NavigationDrawer
 *   open={drawerOpen}
 *   onClose={() => setDrawerOpen(false)}
 *   currentCategoryId={category.id}
 *   currentSectionSlug={sectionSlug}
 * />
 */
```

**imports**:

```js
import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { categories } from '@/data/navigation';
import { slugify } from '@/utils/slugify';
```

**자동 닫힘 (useLocation)**:

```jsx
const location = useLocation();

useEffect(() => {
  onClose();
}, [location.pathname]);
```

**MUI Drawer 기본 설정**:

```jsx
<Drawer
  open={open}
  onClose={onClose}
  anchor='left'
  PaperProps={{
    id: 'mobile-navigation-drawer',
    sx: {
      width: 280,
      backgroundColor: 'background.default',
      backgroundImage: 'none',   // 다크 모드 elevation gradient 제거
    },
  }}
>
```

**Drawer 내부 구조**:

```
Drawer
├── Drawer 헤더 Box (justifyContent: space-between)
│    ├── Typography overline "Navigation"
│    └── IconButton CloseIcon (aria-label='메뉴 닫기')
│
├── Divider
│
└── 네비게이션 Box (py: 2, overflowY: auto)
     ├── Typography overline "Categories"
     └── Box component='nav' aria-label='카테고리 목록'
          └── categories.map(cat)
               ├── 카테고리 Link
               │    ├── emoji span (aria-hidden)
               │    ├── 카테고리명 span
               │    └── ExpandMoreIcon (aria-hidden, rotate on isActive)
               └── Accordion Box (grid-template-rows 트랜지션)
                    └── ul role='list' aria-hidden={!isActive}
                         └── li > section Link
                              ├── dot indicator span (aria-hidden)
                              └── 섹션명 span
```

**카테고리 링크 식별자**: `aria-controls={`drawer-sections-${cat.id}`}`  
**섹션 목록 id**: `id={`drawer-sections-${cat.id}`}`  
*(Sidebar의 `sidebar-sections-` 접두사와 구분)*

---

### 4-2. `header.jsx` (수정)

**변경 전 함수 시그니처**:

```jsx
function Header() {
```

**변경 후 함수 시그니처**:

```jsx
/**
 * Header 컴포넌트 — sticky 상단 네비게이션
 *
 * Props:
 * @param {function} [onMenuClick]   - 햄버거 버튼 클릭 핸들러 [Optional]
 *   제공 시 lg 미만에서만 햄버거 버튼 표시.
 *   미제공 시 기존 Header와 동일 (HomePage, SearchPage, NotFoundPage용).
 * @param {boolean}  [isDrawerOpen]  - Drawer 열림 여부, aria-expanded에 사용 [Optional, 기본값: false]
 *
 * Example usage:
 * <Header />  ← Sidebar 없는 페이지 (기존 동일)
 * <Header onMenuClick={() => setDrawerOpen(true)} isDrawerOpen={drawerOpen} />
 */
function Header({ onMenuClick, isDrawerOpen = false }) {
```

**추가 import**:

```js
import MenuIcon from '@mui/icons-material/Menu';
```

**햄버거 버튼 조건부 렌더링** (Toolbar 내 로고 앞):

```jsx
{onMenuClick && (
  <IconButton
    onClick={onMenuClick}
    aria-label='모바일 메뉴 열기'
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
```

**Toolbar 구조 변경**:

```jsx
// 변경 전
<Toolbar sx={{ justifyContent: 'space-between', ... }}>
  <Typography ...>🏠 Winter Dev Archive</Typography>
  <IconButton ...>  {/* 다크모드 */}

// 변경 후
<Toolbar sx={{ justifyContent: 'space-between', ... }}>
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    {onMenuClick && ( <IconButton ...> <MenuIcon /> ... )}  {/* 햄버거 */}
    <Typography ...>🏠 Winter Dev Archive</Typography>
  </Box>
  <IconButton ...>  {/* 다크모드 */}
```

---

### 4-3. `category-page.jsx` (수정)

**추가 import**:

```js
import { useState } from 'react';
import NavigationDrawer from '@/components/common/NavigationDrawer';
```

**추가 state** (함수 상단):

```jsx
const [drawerOpen, setDrawerOpen] = useState(false);
```

**Header 변경**:

```jsx
// 변경 전
<Header />

// 변경 후
<Header
  onMenuClick={() => setDrawerOpen(true)}
  isDrawerOpen={drawerOpen}
/>
```

**NavigationDrawer 추가** (Header 바로 아래):

```jsx
<NavigationDrawer
  open={drawerOpen}
  onClose={() => setDrawerOpen(false)}
  currentCategoryId={category.id}
/>
```

---

### 4-4. `section-page.jsx` (수정)

category-page와 동일. `currentSectionSlug` 추가 전달.

```jsx
// 추가 import
import { useState } from 'react';
import NavigationDrawer from '@/components/common/NavigationDrawer';

// 추가 state
const [drawerOpen, setDrawerOpen] = useState(false);

// Header 변경
<Header
  onMenuClick={() => setDrawerOpen(true)}
  isDrawerOpen={drawerOpen}
/>

// NavigationDrawer 추가
<NavigationDrawer
  open={drawerOpen}
  onClose={() => setDrawerOpen(false)}
  currentCategoryId={category.id}
  currentSectionSlug={sectionSlug}
/>
```

---

### 4-5. `doc-page.jsx` (수정)

section-page와 동일.

```jsx
// 추가 import
import { useState } from 'react';
import NavigationDrawer from '@/components/common/NavigationDrawer';

// 추가 state
const [drawerOpen, setDrawerOpen] = useState(false);

// Header 변경
<Header
  onMenuClick={() => setDrawerOpen(true)}
  isDrawerOpen={drawerOpen}
/>

// NavigationDrawer 추가
<NavigationDrawer
  open={drawerOpen}
  onClose={() => setDrawerOpen(false)}
  currentCategoryId={category.id}
  currentSectionSlug={sectionSlug}
/>
```

---

## 5. Header 햄버거 버튼 조건부 렌더링 방식

```
onMenuClick prop 존재 여부
         │
    ┌────┴────┐
    있음      없음
     │         │
햄버거 버튼   기존 Header 동일
표시           (HomePage, SearchPage, NotFoundPage)
(lg 미만에서만)
```

**핵심**: `{onMenuClick && (...)}` 패턴으로 prop 존재 여부에만 의존.  
`useMediaQuery`나 breakpoint 조건 판별 코드를 Header에 추가하지 않는다.  
`display: { xs: 'flex', lg: 'none' }` sx 속성으로 lg 이상 자동 숨김.

---

## 6. Drawer 상태 관리 방식

```
CategoryPage    SectionPage    DocPage
     │               │            │
drawerOpen       drawerOpen   drawerOpen   ← 각각 독립 useState(false)
     │               │            │
  Header          Header       Header      ← onMenuClick, isDrawerOpen props
     │               │            │
NavigationDrawer NavigationDrawer NavigationDrawer  ← open, onClose props
```

> **의도적 중복**  
> Stage 7에서는 페이지별 `drawerOpen` state 중복을 허용한다.  
> Phase 2에서 `DocsLayout` 공통 레이아웃으로 통합 예정.

---

## 7. NavigationDrawer 내부 구조

```
<Drawer anchor='left' PaperProps={{ id, width: 280, bg: background.default }}>

  ┌─ Drawer 헤더 ───────────────────────────────┐
  │  Typography overline "Navigation"    [X btn] │
  └─────────────────────────────────────────────┘
  <Divider />

  ┌─ 네비게이션 영역 (overflowY: auto) ──────────┐
  │  Typography overline "Categories"            │
  │  <Box component='nav'>                       │
  │    {categories.map(cat => (                  │
  │      // 카테고리 Link                         │
  │      [emoji] [카테고리명]          [▼/▲]     │
  │                                              │
  │      // Accordion (grid-template-rows 트랜지션) │
  │      isActive 시에만 펼침                    │
  │        · [섹션명]   (inactive dot)           │
  │        ● [섹션명]   (active dot, aria-current) │
  │    ))}                                       │
  └─────────────────────────────────────────────┘

</Drawer>
```

**Sidebar와 동일한 요소**:
- `isActive = cat.id === currentCategoryId` 비교
- `isSectionActive = isActive && currentSectionSlug === sectionSlug`
- `grid-template-rows: isActive ? '1fr' : '0fr'` Accordion 트랜지션
- 카테고리 active 스타일 (borderLeft, bg, color, fontWeight)
- 섹션 active 스타일 (dot indicator filled/outline)
- `@media (prefers-reduced-motion: reduce)` 트랜지션 비활성화

**Sidebar와 다른 요소**:
- `component='aside'` 없음 → `Drawer` 컴포넌트가 감쌈
- `position: sticky` 없음 → `variant='temporary'` Drawer가 오버레이로 표시
- 섹션 id 접두사: `sidebar-sections-` → `drawer-sections-`
- Drawer 헤더 + Divider 추가

---

## 8. useLocation으로 route 변경 시 자동 닫힘

```jsx
// NavigationDrawer.jsx 내부
const location = useLocation();

useEffect(() => {
  onClose();
}, [location.pathname]);
```

**동작 시나리오**:

| 시나리오 | 결과 |
|---|---|
| 섹션 링크 클릭 → 새 route | `location.pathname` 변경 → effect 실행 → `onClose()` |
| 카테고리 링크 클릭 → 새 route | 위와 동일 |
| 브라우저 뒤로가기/앞으로가기 | `location.pathname` 변경 → effect 실행 → `onClose()` |
| Drawer 마운트 시 (초기) | effect 실행되지만 `drawerOpen === false` → `setDrawerOpen(false)` → no-op |
| 동일 route 내 hash 변경 | `pathname` 불변 → effect 미실행 → Drawer 유지 |

**`onClose` 안정성**: `onClose = () => setDrawerOpen(false)` — setState는 이미 false일 때 호출해도 리렌더링을 일으키지 않는다 (React bailout).

---

## 9. 접근성 처리

### 햄버거 버튼 (header.jsx)

```jsx
aria-label='모바일 메뉴 열기'
aria-controls='mobile-navigation-drawer'
aria-expanded={isDrawerOpen}
```

- `aria-label`: 스크린 리더에 버튼 용도 전달
- `aria-controls`: 제어 대상 id 명시 (NavigationDrawer PaperProps id와 일치)
- `aria-expanded`: Drawer 현재 상태 전달 (열림/닫힘)

### NavigationDrawer 닫기 버튼

```jsx
<IconButton onClick={onClose} aria-label='메뉴 닫기'>
  <CloseIcon />
</IconButton>
```

### 카테고리 링크

```jsx
aria-controls={`drawer-sections-${cat.id}`}
```

### 섹션 링크

```jsx
aria-current={isSectionActive ? 'page' : undefined}
```

- 현재 보고 있는 섹션 링크에 `aria-current='page'` 적용
- 스크린 리더가 "현재 페이지" 위치를 인지

### 접힌 섹션 목록

```jsx
aria-hidden={isActive ? undefined : true}
```

- 접힌(비활성) 카테고리의 섹션 목록을 스크린 리더에서 차단

### focus trap

MUI `Drawer`는 내부적으로 `Modal` 기반으로 동작하며 focus trap을 기본 제공한다.
- Drawer 열림 시: 내부 첫 포커스 가능 요소(닫기 버튼)로 포커스 이동
- Drawer 닫힘 시: 열기 버튼(햄버거)으로 포커스 복귀
- 별도 구현 불필요

### ESC 닫기

MUI `Drawer`의 `onClose` prop이 ESC 키 이벤트를 처리한다.
- 별도 `onKeyDown` 핸들러 불필요

---

## 10. 다크모드 대응

NavigationDrawer는 `ThemeProvider` 하위에서 렌더링되므로 자동 대응된다.

**명시적 처리 항목**:

| 항목 | 처리 방법 |
|---|---|
| Drawer Paper 배경 | `PaperProps.sx.backgroundColor: 'background.default'` 명시 |
| Drawer Paper elevation gradient | `PaperProps.sx.backgroundImage: 'none'` — MUI 다크 모드 기본 그레이디언트 제거 |
| 카테고리/섹션 색상 | Sidebar와 동일한 `sx={(theme) => (...)}` 콜백 패턴 |

**색상 토큰**: Sidebar와 100% 동일 (`#EDE8FA`/`#2A2544` 등).

---

## 11. 반응형 기준

| viewport | Sidebar | 햄버거 버튼 | NavigationDrawer |
|---|---|---|---|
| xs ~ lg-1 (0–1199px) | `display: none` (기존 유지) | `display: flex` (조건: `onMenuClick` 있을 때) | 사용 가능 |
| lg+ (1200px~) | `display: block` | `display: none` | 렌더되지만 실질적 미사용 |

**관련 코드**:
- Sidebar: 기존 `display: { xs: 'none', lg: 'block' }` **변경 없음**
- 햄버거 버튼: `display: { xs: 'flex', lg: 'none' }` (신규)

---

## 12. 테스트 URL

| 목적 | URL |
|---|---|
| CategoryPage Drawer 테스트 | `/react` |
| SectionPage Drawer 테스트 | `/react/hooks` |
| DocPage Drawer 테스트 | `/ai-vibe-coding/setup/step-1-env` |
| Sidebar 없는 페이지 (햄버거 미표시 확인) | `/` (HomePage) |
| Sidebar 없는 페이지 (햄버거 미표시 확인) | `/search` (SearchPage) |
| 다크 모드 + Drawer | 위 URL에서 다크 모드 전환 후 확인 |

---

## 13. 테스트 방법

| Step | 확인 항목 | 방법 |
|---|---|---|
| Step 1 완료 | 기존 Desktop 레이아웃 회귀 없음 | 브라우저 1200px 이상, `/react` 진입 → Sidebar 정상 표시 |
| Step 2 완료 | 햄버거 버튼 조건부 표시 | DevTools 반응형 1199px → CategoryPage에서 햄버거 표시, HomePage에서 미표시 확인 |
| Step 3 완료 | Drawer 열림 | 1199px → 햄버거 클릭 → Drawer 슬라이드 인 확인 |
| Step 3 완료 | 활성 카테고리 펼침 | `/react` → Drawer 열기 → React 카테고리 자동 펼침 확인 |
| Step 3 완료 | backdrop 닫힘 | Drawer 열린 상태 → 오버레이 클릭 → Drawer 닫힘 확인 |
| Step 3 완료 | ESC 닫힘 | Drawer 열린 상태 → ESC 키 → Drawer 닫힘 확인 |
| Step 3 완료 | 닫기 버튼 | Drawer 내 X 버튼 클릭 → Drawer 닫힘 확인 |
| Step 4–5 완료 | 링크 클릭 자동 닫힘 | Drawer 열린 상태 → 섹션 클릭 → Drawer 닫힘 + 페이지 이동 확인 |
| Step 4–5 완료 | aria-current 적용 | 활성 섹션 링크 → DevTools Elements → `aria-current="page"` 확인 |
| 전체 완료 | 다크 모드 Drawer | 다크 모드 전환 → Drawer 열기 → Paper 배경 `#1C182C`, 텍스트/border 정상 확인 |
| 전체 완료 | focus trap | Drawer 열기 → Tab 반복 → Drawer 외부로 포커스 이탈 없음 확인 |
| 전체 완료 | 1200px 이상 회귀 | lg 이상 → 햄버거 버튼 완전 숨김, Sidebar 정상 표시 확인 |

---

## 14. 예상 리스크

| 리스크 | 가능성 | 대응 |
|---|---|---|
| **Sidebar와 NavigationDrawer 스타일 코드 중복** | 높음 (구조적) | Stage 7 허용 범위. Phase 2 DocsLayout 통합 시 공통 컴포넌트 추출 |
| **MUI Drawer Paper 다크모드 elevation gradient** | 중간 | `PaperProps.sx.backgroundImage: 'none'` 명시로 선제 차단 |
| **useLocation effect 불필요 호출** | 낮음 | `drawerOpen = false` 시 `setDrawerOpen(false)` → React bailout (리렌더 없음) |
| **Header props 추가로 기존 사용처 영향** | 없음 | optional props, 기존 `<Header />` 호출 무변경 |
| **카테고리 링크 클릭 시 Drawer 상태** | 없음 | route 변경 → useLocation effect → 자동 닫힘 |
| **섹션 목록 id 충돌** | 없음 | Sidebar `sidebar-sections-`, Drawer `drawer-sections-` 접두사 구분 |
