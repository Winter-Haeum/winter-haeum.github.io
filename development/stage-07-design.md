# Stage 7 설계 — Mobile Navigation Drawer

> 기준: Stage 6 완료 상태 (Dark Mode 시스템 구현 완료)  
> 현재 미구현: lg(1200px) 미만 화면에서 카테고리 네비게이션 접근 불가

---

## 1. Stage 7 목표

| 목표 | 의미 |
|---|---|
| **모바일 네비게이션 접근성 확보** | lg 미만 화면에서 카테고리 탐색이 전혀 불가능한 현재 상태를 해결한다 |
| **기존 Sidebar 동작 유지** | lg 이상에서 Sidebar의 현재 동작과 스타일을 그대로 유지한다 |
| **일관된 UI** | Drawer 내부 네비게이션이 Sidebar와 동일한 정보 구조 및 활성 표시를 갖는다 |
| **접근성 표준 준수** | aria-expanded, focus trap, ESC 닫기 등 WAI-ARIA 권고를 따른다 |

**Stage 7 범위 외**:
- 캐릭터 기능 추가
- 검색 기능 확장 (Ctrl+K 등)
- TOC(Table of Contents) 추가
- Sidebar 자체의 구조 변경

---

## 2. 현재 Sidebar 구조 분석

`src/components/common/sidebar.jsx` 기준.

```
Sidebar 현재 구조
├── display: { xs: 'none', lg: 'block' }   ← lg 미만 완전 숨김
├── width: 260px, flexShrink: 0
├── position: sticky, top: 64px
├── height: calc(100vh - 64px)
├── overflowY: auto
│
├── "Categories" overline 라벨
└── nav > categories.map(cat)
     ├── 카테고리 Link (isActive 스타일 분기)
     │    ├── emoji span
     │    ├── 카테고리명 span
     │    └── ExpandMoreIcon (isActive 시 rotate 180deg)
     └── 섹션 목록 (grid-template-rows 트랜지션 Accordion)
          └── ul > li > section Link (isSectionActive 스타일 분기)
               ├── dot indicator
               └── 섹션명 span
```

**핵심 관찰**:
- Accordion 토글이 `useState`가 아닌 `currentCategoryId === cat.id` 비교로 작동한다.
  - 즉, 활성 카테고리만 자동 펼쳐지며, 사용자가 직접 열고 닫는 기능은 없다.
  - Drawer도 동일한 방식을 유지한다.
- 카테고리/섹션 활성 표시 로직이 `props`에만 의존하므로 그대로 재사용 가능하다.

**Sidebar를 사용하는 페이지** (3개):

| 페이지 | 파일 | Sidebar props |
|---|---|---|
| CategoryPage | `pages/category-page.jsx` | `currentCategoryId` |
| SectionPage | `pages/section-page.jsx` | `currentCategoryId`, `currentSectionSlug` |
| DocPage | `pages/doc-page.jsx` | `currentCategoryId`, `currentSectionSlug` |

**Sidebar를 사용하지 않는 페이지** (Drawer 불필요):

| 페이지 | 이유 |
|---|---|
| HomePage | 카테고리 그리드 자체가 네비게이션 역할 |
| SearchPage | 전체 너비 레이아웃, 사이드바 없음 명시 |
| NotFoundPage | 에러 페이지 |

---

## 3. Desktop Sidebar와 Mobile Drawer 관계

```
lg(1200px) 이상          │  lg 미만
─────────────────────────┼─────────────────────────
Sidebar 표시             │  Sidebar 숨김 (기존 유지)
Header 햄버거 버튼 숨김  │  Header 햄버거 버튼 표시
NavigationDrawer 없음    │  NavigationDrawer 렌더링
                         │  (open 상태에서만 화면에 표시)
```

**분리 원칙**:
- Sidebar와 NavigationDrawer는 별개 컴포넌트로 구현한다.
- 두 컴포넌트가 동일한 데이터(`categories`)와 props 패턴(`currentCategoryId`, `currentSectionSlug`)을 공유한다.
- NavigationDrawer는 Sidebar를 내부에 포함하는 방식이 아니라, 동일 로직을 독립적으로 가진다.
  - 이유: Sidebar는 `component='aside'`, sticky 포지션, border-right 등 Desktop 전용 속성을 가지고 있어 Drawer 내부에서 그대로 재사용하기 어렵다.

---

## 4. Drawer 열기/닫기 상태 관리 방식

### 상태 관리 위치: 페이지 레벨

```jsx
// CategoryPage / SectionPage / DocPage 각각
const [drawerOpen, setDrawerOpen] = useState(false);
```

**이 방식을 선택한 이유**:

| 방식 | 장점 | 단점 |
|---|---|---|
| **페이지 레벨 useState** | 간단, Context 추가 없음, 페이지별 독립 | Header에 props 2개 추가 필요 |
| DrawerContext (전역) | Header 수정 최소화 | 파일 추가, Stage 6의 ColorModeContext와 유사한 복잡도 |
| Layout 컴포넌트 도입 | 중복 제거 | 3개 페이지 전체 리팩터링 필요 (범위 초과) |

**선택**: 페이지 레벨 useState.  
범위가 3개 페이지로 제한적이고, Drawer 상태가 페이지 고유 상태이므로 Context 도입은 과도하다.

> **의도적 중복 허용 메모**  
> Stage 7에서는 페이지별 `drawerOpen` state 중복을 허용한다.  
> 이유는 `DocsLayout` 공통 레이아웃 리팩토링까지 포함하면 Stage 7 범위가 커지기 때문이다.  
> Phase 2에서 `CategoryPage` / `SectionPage` / `DocPage`를 `DocsLayout`으로 통합하는 것을 검토한다.

### 상태 흐름

```
사용자 햄버거 클릭
    ↓
Header.onMenuClick() 호출
    ↓
setDrawerOpen(true)  ← PageLevel state
    ↓
NavigationDrawer open={true}  → MUI Drawer 열림

──────────────────────────────
Drawer 닫힘 트리거 (세 가지)
──────────────────────────────
① 배경(backdrop) 클릭   →  MUI Drawer 기본 제공 → onClose 호출
② ESC 키               →  MUI Drawer 기본 제공 → onClose 호출
③ 내부 링크 클릭       →  useLocation pathname 변경 감지 → onClose 호출
④ 내부 닫기 버튼       →  onClose 직접 호출
    ↓
setDrawerOpen(false)  ← PageLevel state
```

### 링크 클릭 시 자동 닫힘 (useLocation 방식)

NavigationDrawer 내부에서 `useLocation`으로 route 변경을 감지해 자동 닫음.

```jsx
// NavigationDrawer.jsx 내부
const location = useLocation();

useEffect(() => {
  onClose();
}, [location.pathname]);
```

**이 방식을 선택한 이유**:
- 링크마다 `onClick={onClose}` 삽입이 불필요해 컴포넌트가 단순해진다.
- 뒤로가기/앞으로가기 브라우저 네비게이션에서도 자동으로 닫힌다.
- 초기 마운트 시에도 effect가 실행되지만 `drawerOpen === false` 상태에서 `onClose()`는 no-op이므로 문제 없다.

---

## 5. Header 햄버거 버튼 설계

### 현재 Header 구조

```jsx
// header.jsx — Props 없음
function Header() { ... }
```

### Stage 7 변경 내용

```jsx
/**
 * Header 컴포넌트 — sticky 상단 네비게이션
 *
 * Props:
 * @param {function} [onMenuClick]   - 햄버거 버튼 클릭 핸들러 [Optional]
 *   제공 시 lg 미만에서 햄버거 버튼을 표시한다.
 * @param {boolean}  [isDrawerOpen]  - Drawer 열림 여부, aria-expanded에 사용 [Optional, 기본값: false]
 */
function Header({ onMenuClick, isDrawerOpen = false }) { ... }
```

**햄버거 버튼 표시 조건**:

Header는 `HomePage`, `SearchPage`, `NotFoundPage`에서도 사용된다.  
이 페이지들은 Sidebar가 없으므로 햄버거 버튼이 표시되어서는 안 된다.

따라서 **`onMenuClick` prop이 전달된 경우에만** 햄버거 버튼을 렌더링한다.  
`onMenuClick`이 없으면 기존 Header와 완전히 동일하게 표시된다.

```jsx
{onMenuClick && (
  <IconButton
    onClick={onMenuClick}
    aria-label='모바일 메뉴 열기'
    aria-controls='mobile-navigation-drawer'
    aria-expanded={isDrawerOpen}
    sx={{ display: { xs: 'flex', lg: 'none' }, ... }}
  >
    <MenuIcon />
  </IconButton>
)}
```

**햄버거 버튼 위치**: 로고 왼쪽 앞에 배치

```
┌─────────────────────────────────────────────────────┐
│  [☰]  🏠 Winter Dev Archive           [다크모드 버튼] │
└─────────────────────────────────────────────────────┘
```

Sidebar가 없는 페이지(HomePage 등)에서는 `onMenuClick`을 전달하지 않으므로:

```
┌─────────────────────────────────────────────────────┐
│  🏠 Winter Dev Archive                [다크모드 버튼] │
└─────────────────────────────────────────────────────┘
```

**Toolbar 내 배치 변경**:
- 현재: `justifyContent: 'space-between'` (로고 좌 / 다크모드 버튼 우)
- 변경: 햄버거 버튼은 로고 좌측에 추가 (lg 이상에서는 숨겨지므로 레이아웃 영향 없음)

---

## 6. Drawer 내부 정보 구조

```
NavigationDrawer (MUI Drawer)
├── Drawer 헤더
│    ├── Typography "Navigation"    (좌측 라벨)
│    └── IconButton X (CloseIcon)   (우측 닫기 버튼)
│
├── Divider
│
└── 네비게이션 영역 (Sidebar 내부와 동일)
     ├── Typography "Categories" overline
     └── Box component='nav'
          └── categories.map(cat)
               ├── 카테고리 Link (isActive 스타일 동일)
               └── 섹션 목록 (Accordion 동일)
```

**Drawer 헤더 닫기 버튼 접근성**:
```jsx
<IconButton onClick={onClose} aria-label='메뉴 닫기'>
  <CloseIcon />
</IconButton>
```

**Drawer Paper 커스터마이징**:
```jsx
<Drawer
  PaperProps={{
    sx: {
      width: 280,
      backgroundColor: 'background.default',
      backgroundImage: 'none',    // MUI 기본 Paper elevation gradient 제거
    },
  }}
  ...
>
```
- Sidebar 배경(`background.default`)과 통일
- MUI Drawer Paper의 기본 `backgroundImage` elevation 효과를 제거해 다크 모드에서 배경이 뜨지 않도록 함

---

## 7. Accordion 구조 유지 여부

**유지한다.**

현재 Sidebar의 Accordion은 `useState` 없이 `currentCategoryId === cat.id` 비교로만 동작한다. NavigationDrawer도 동일한 방식을 그대로 사용한다.

| 항목 | Sidebar | NavigationDrawer |
|---|---|---|
| 펼침 기준 | `isActive = cat.id === currentCategoryId` | 동일 |
| 애니메이션 | `grid-template-rows: 0fr ↔ 1fr` 트랜지션 | 동일 |
| reduced-motion 대응 | `transition: none` | 동일 |
| 다중 펼침 | 불가 (활성 카테고리만) | 동일 |

**Drawer에서 사용자가 다른 카테고리를 탭하면?**
- 해당 카테고리 페이지로 이동(Link) → route 변경 → `useLocation` effect가 Drawer를 자동으로 닫음
- Accordion 상태를 별도로 관리할 필요 없음

---

## 8. 현재 활성 카테고리 / 섹션 표시 방식

Sidebar와 완전히 동일한 스타일 토큰을 사용한다.

| 상태 | 카테고리 링크 | 섹션 링크 |
|---|---|---|
| 활성 (light) | `borderLeft: primary.main`, `bg: #EDE8FA`, `color: primary.main`, `fontWeight: 600` | `color: primary.main`, `bg: #F4F0FC`, `fontWeight: 600` |
| 활성 (dark) | `borderLeft: primary.main`, `bg: #2A2544`, `color: primary.main`, `fontWeight: 600` | `color: primary.main`, `bg: #241E40`, `fontWeight: 600` |
| 비활성 hover (light) | `bg: #F6F3FE`, `color: text.primary` | 동일 |
| 비활성 hover (dark) | `bg: #221E38`, `color: text.primary` | 동일 |

**섹션 dot indicator**:
- Active: 채워진 원 (`backgroundColor: primary.main`)
- Inactive: 테두리 원 (`border: 1.5px solid text.disabled`)

**`aria-current='page'`**: 현재 활성 섹션 링크에 적용.

---

## 9. 반응형 기준

MUI 기본 `lg` breakpoint = **1200px**

| breakpoint | Sidebar | 햄버거 버튼 | NavigationDrawer |
|---|---|---|---|
| xs ~ md (0–1199px) | `display: none` (기존 유지) | `display: flex` | 사용 가능 (open 시 표시) |
| lg ~ (1200px+) | `display: block` | `display: none` | 렌더는 되지만 실질적으로 사용 안 함 |

**현재 Sidebar 코드 변경 없음**: 기존 `display: { xs: 'none', lg: 'block' }` 그대로 유지.

---

## 10. 접근성 고려사항

### 햄버거 버튼

```jsx
aria-label={isDrawerOpen ? '메뉴 닫기' : '메뉴 열기'}
aria-expanded={isDrawerOpen}
aria-controls='navigation-drawer'
```

- `aria-expanded`: 스크린 리더에 Drawer 현재 상태 전달
- `aria-controls`: 제어 대상 요소 명시 (`id="navigation-drawer"` 와 연결)

### NavigationDrawer

```jsx
// MUI Drawer에 id 부여
<Drawer
  id='navigation-drawer'    // id 또는 PaperProps에 id 부여 방법 선택 (설계 시점 확인)
  aria-label='카테고리 탐색'
  ...
>
```

**실제로는 `PaperProps.id`로 부여**:
```jsx
PaperProps={{ id: 'navigation-drawer', sx: { ... } }}
```

### Focus Trap

MUI `Drawer` 컴포넌트가 기본적으로 focus trap을 제공한다.
- Drawer 열림 시: 내부 첫 번째 포커스 가능 요소(닫기 버튼)로 포커스 이동
- Drawer 닫힘 시: 열기 버튼(햄버거)으로 포커스 복귀 (MUI 기본 동작)

### ESC 닫기

MUI `Drawer`의 `onClose` prop에 연결 시 ESC 키 처리는 MUI가 기본 제공한다.

```jsx
<Drawer
  open={open}
  onClose={onClose}   // ESC 키 + 배경 클릭 모두 이 핸들러로 처리
  ...
>
```

### 추가 고려사항

- Drawer가 열린 상태에서 배경 콘텐츠는 스크린 리더에서 `aria-hidden='true'` 처리됨 (MUI 기본 `Modal` 기반 동작)
- 섹션 링크의 `aria-current='page'` — Sidebar와 동일하게 유지

---

## 11. 다크모드 대응 방식

NavigationDrawer는 `ColorModeProvider` → `ThemeProvider` 하위에서 렌더링되므로 별도 처리 없이 자동으로 다크 모드에 반응한다.

**색상 적용 방식**: Sidebar와 동일한 `sx={(theme) => (...)}` 콜백 패턴 사용.

**추가 주의점**:
- `PaperProps.sx`에서 `backgroundColor: 'background.default'`로 명시 (11-6 참고)
- MUI Drawer Paper의 `backgroundImage: 'none'` 설정으로 다크 모드 elevation 그레이디언트 제거 필요

---

## 12. 수정 대상 파일 목록

| 파일 | 변경 내용 |
|---|---|
| `src/components/common/header.jsx` | `onMenuClick`, `isDrawerOpen` optional props 추가, 햄버거 IconButton 추가 |
| `src/pages/category-page.jsx` | `drawerOpen` state 추가, Header에 props 전달, NavigationDrawer 렌더링 |
| `src/pages/section-page.jsx` | 위와 동일 |
| `src/pages/doc-page.jsx` | 위와 동일 |

---

## 13. 신규 생성 파일 목록

| 파일 | 설명 |
|---|---|
| `src/components/common/NavigationDrawer.jsx` | MUI Drawer 기반 모바일 네비게이션 컴포넌트 |

---

## 14. 구현 순서

의존성이 낮은 것부터 쌓아올리는 bottom-up 순서.

```
Step 1  NavigationDrawer.jsx 생성
        MUI Drawer + Drawer 헤더(닫기 버튼) + 카테고리/섹션 네비게이션
        Props: open, onClose, currentCategoryId, currentSectionSlug
        내부: useLocation으로 route 변경 시 자동 닫힘

Step 2  header.jsx 수정
        onMenuClick, isDrawerOpen optional props 추가
        lg 미만에서만 보이는 햄버거 IconButton 추가
        MenuIcon import 추가

Step 3  category-page.jsx 수정
        drawerOpen state 추가 (useState(false))
        Header에 onMenuClick, isDrawerOpen props 전달
        NavigationDrawer 렌더링 (open, onClose, currentCategoryId)

Step 4  section-page.jsx 수정
        Step 3과 동일 + currentSectionSlug 추가

Step 5  doc-page.jsx 수정
        Step 4와 동일
```

---

## 15. 테스트 방법

| Step | 확인 항목 |
|---|---|
| Step 1 완료 후 | 개발 서버 기동. 기존 Desktop 레이아웃(lg 이상)에 변화 없음 확인 |
| Step 2 완료 후 | 브라우저 개발자 도구 → 반응형 모드 → 1199px 이하 설정. CategoryPage 진입 시 Header에 햄버거 버튼 표시 확인 |
| Step 2 완료 후 | 1200px 이상: 햄버거 버튼 숨김, Sidebar 정상 표시 확인 |
| Step 3 완료 후 | 햄버거 클릭 → Drawer 열림 확인 |
| Step 3 완료 후 | 활성 카테고리가 Accordion에서 자동으로 펼쳐짐 확인 |
| Step 3 완료 후 | Drawer 배경 클릭 → Drawer 닫힘 확인 |
| Step 3 완료 후 | ESC 키 → Drawer 닫힘 확인 |
| Step 3 완료 후 | Drawer 내 닫기 버튼(X) → Drawer 닫힘 확인 |
| Step 4–5 완료 후 | 섹션 링크 클릭 → Drawer 닫힘 + 페이지 이동 확인 |
| Step 4–5 완료 후 | `aria-current='page'` 활성 섹션에 적용 확인 (브라우저 접근성 패널) |
| 전체 완료 후 | 다크 모드 전환 → Drawer 배경/텍스트/border 색상 정상 전환 확인 |
| 전체 완료 후 | Drawer 열린 상태에서 다크 모드 전환 → Paper 배경 `background.default` 유지 확인 |
| 전체 완료 후 | 탭 키로 Drawer 내 요소 순환 → Drawer 외부로 포커스 이탈 없음 확인 |
| 전체 완료 후 | 스크린 리더(NVDA/VoiceOver) → 햄버거 버튼 aria-label, aria-expanded 정상 읽힘 확인 |

---

## 16. 예상 리스크

| 리스크 | 가능성 | 대응 방향 |
|---|---|---|
| **Sidebar와 NavigationDrawer 코드 중복** | 높음 (구조적) | 현재 규모(11개 카테고리, 고정 구조)에서는 두 파일 유지가 허용 범위. 향후 네비게이션 구조 변경 시 공통 컴포넌트 추출 고려 |
| **Header props 추가에 따른 기존 사용처 영향** | 낮음 | optional props이므로 HomePage, SearchPage, NotFoundPage의 `<Header />` 호출은 변경 없음 |
| **MUI Drawer Paper 다크모드 elevation gradient** | 중간 | MUI 다크 모드에서 Paper에 흰색 오버레이가 추가됨. `backgroundImage: 'none'` 명시로 해결 |
| **useLocation effect 초기 실행** | 낮음 | 컴포넌트 마운트 시 effect 실행되지만, `drawerOpen` 초기값이 `false`이므로 `onClose()`는 사실상 no-op |
| **lg breakpoint 경계값(1200px) 근처 레이아웃** | 낮음 | Sidebar와 햄버거 버튼의 display 조건이 동일 breakpoint를 기준으로 상호 배타적이므로 중복 표시 없음 |

---

## 17. Stage 7 완료 후 기대 효과

| 항목 | 현재 (Stage 6) | Stage 7 완료 후 |
|---|---|---|
| 모바일 네비게이션 | 완전 차단 (Sidebar `display: none`) | 햄버거 버튼 → Drawer로 전체 카테고리 탐색 가능 |
| 모바일 UX | 검색(/search)만 가능 | 카테고리 직접 탐색 + 검색 모두 가능 |
| 접근성 | 모바일에서 키보드/스크린 리더 네비게이션 불가 | focus trap, ESC, aria-expanded 표준 준수 |
| 다크 모드 일관성 | Desktop Sidebar만 다크 모드 지원 | Drawer도 동일 다크 팔레트로 표시 |
| 코드 구조 | Sidebar 단독 | Sidebar(Desktop) + NavigationDrawer(Mobile) 역할 분리 |
