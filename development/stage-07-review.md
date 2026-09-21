# Stage 7 Review

검토 파일 6개 직접 열람 및 분석 완료.  
(NavigationDrawer, Header, CategoryPage, SectionPage, DocPage, Sidebar 비교)

---

## High Priority
(즉시 수정 필요)

**없음.** 런타임 오류, 기능 버그, 구조적 문제 없음.

---

## Medium Priority
(Stage 8 전 수정 권장)

### M-1. `header.jsx` L52 — `aria-label` 고정값

**위치**: `src/components/common/header.jsx` 52번째 줄

```jsx
aria-label='모바일 메뉴 열기'   // 현재 — 항상 "열기" 고정
```

**문제**:  
`aria-expanded={isDrawerOpen}`이 `true`인 상태(Drawer 열림)에서도 `aria-label`이 "모바일 메뉴 열기"로 고정되어, 스크린 리더가 "열림 상태" + "열기 버튼"이라는 모순된 정보를 함께 읽는다.

설계 문서(`stage-07-design.md`)에서는 동적 aria-label을 명시했으나 구현에서 누락됨.  
`aria-expanded`가 상태를 전달하므로 기능적 오류는 아니지만, WAI-ARIA 권고에 따라 레이블을 현재 동작에 맞게 변경하는 것이 더 명확하다.

**권장 수정**:
```jsx
aria-label={isDrawerOpen ? '모바일 메뉴 닫기' : '모바일 메뉴 열기'}
```

---

### M-2. `section-page.jsx` L40 — `drawerOpen` state 선언 위치

**위치**: `src/pages/section-page.jsx` 40번째 줄

```jsx
// L32–34: state 선언 그룹
const [loadedKey, setLoadedKey] = useState(null);
const [sectionIndex, setSectionIndex] = useState(null);
const [sectionDocs, setSectionDocs] = useState([]);

// L36–39: derived values (hooks 아님)
const category = categories.find(...);
const sectionName = category?.sections.find(...);
const currentKey = `${categorySlug}/${sectionSlug}`;
const loading = loadedKey !== currentKey;

// L40: state 선언이 derived values 다음에 등장
const [drawerOpen, setDrawerOpen] = useState(false);   // ← 위치 문제
```

**문제**:  
React hooks 규칙 위반은 아니지만, `drawerOpen` state가 다른 state 선언 그룹과 분리되어 derived values 사이에 위치해 가독성을 해친다. `DocPage`와 `CategoryPage`는 state를 연속으로 선언하는 일관된 패턴을 따른다.

**권장 수정**: `drawerOpen` state를 L35 (state 선언 그룹 바로 다음)로 이동.

```jsx
const [loadedKey, setLoadedKey] = useState(null);
const [sectionIndex, setSectionIndex] = useState(null);
const [sectionDocs, setSectionDocs] = useState([]);
const [drawerOpen, setDrawerOpen] = useState(false);   // ← 이 위치로 이동

const category = categories.find(...);
// ...
```

---

## Low Priority
(선택 사항)

**없음.**

---

## 각 파일별 확인 결과

### `NavigationDrawer.jsx`

**햄버거 버튼 조건부 렌더링**: 해당 없음 (이 파일에서 렌더링하지 않음).

**Sidebar와 정보 구조 비교**:

| 항목 | Sidebar | NavigationDrawer | 일치 여부 |
|---|---|---|---|
| `isActive` 판단 | `cat.id === currentCategoryId` | 동일 | ✅ |
| `isSectionActive` 판단 | `isActive && currentSectionSlug === sectionSlug` | 동일 | ✅ |
| Accordion 트랜지션 | `grid-template-rows: isActive ? '1fr' : '0fr'` | 동일 | ✅ |
| 카테고리 active bg (light) | `#EDE8FA` | `#EDE8FA` | ✅ |
| 카테고리 active bg (dark) | `#2A2544` | `#2A2544` | ✅ |
| 섹션 active bg (light) | `#F4F0FC` | `#F4F0FC` | ✅ |
| 섹션 active bg (dark) | `#241E40` | `#241E40` | ✅ |
| hover bg (light) | `#F6F3FE` | `#F6F3FE` | ✅ |
| hover bg (dark) | `#221E38` | `#221E38` | ✅ |
| dot indicator | active: filled / inactive: outline | 동일 | ✅ |
| `aria-current='page'` | 활성 섹션에 적용 | 동일 | ✅ |
| `aria-hidden` on collapsed | `true` | 동일 | ✅ |
| `reduced-motion` 대응 | `transition: none` | 동일 | ✅ |
| 섹션 목록 id 접두사 | `sidebar-sections-` | `drawer-sections-` | ✅ (의도적 구분) |

**useLocation effect**:
- `eslint-disable-next-line react-hooks/exhaustive-deps` 주석으로 의도적 exhaustive-deps 무시 명시 ✅
- 초기 마운트 시 `onClose()` 호출 → `setDrawerOpen(false)` (이미 `false`이므로 no-op) ✅

**Drawer 설정**:
- `anchor='left'` ✅
- `PaperProps.id='mobile-navigation-drawer'` — Header `aria-controls`와 일치 ✅
- `PaperProps.sx.backgroundColor: 'background.default'` ✅
- `PaperProps.sx.backgroundImage: 'none'` — 다크 모드 elevation gradient 제거 ✅

**Drawer 닫기 버튼**:
- `aria-label='메뉴 닫기'` ✅
- focus-visible outline 적용 ✅

**코드 품질**:
- Stage 7 범위를 넘는 리팩토링 없음 ✅
- 불필요한 prop, import 없음 ✅

---

### `header.jsx`

**햄버거 버튼 조건부 렌더링**:
- `{onMenuClick && (...)}` 패턴 — prop 존재 여부로만 제어 ✅
- `display: { xs: 'flex', lg: 'none' }` — lg 이상 자동 숨김 ✅
- `aria-controls='mobile-navigation-drawer'` — NavigationDrawer id와 일치 ✅
- `aria-expanded={isDrawerOpen}` ✅
- `aria-label='모바일 메뉴 열기'` — **M-1 참조** (고정값 문제)

**Sidebar 없는 페이지 영향 없음**:
- `HomePage`, `SearchPage`, `NotFoundPage`는 `<Header />` 호출 시 `onMenuClick` 미전달
- `{onMenuClick && (...)}` 조건으로 햄버거 버튼 렌더링 차단 ✅

**기존 기능 회귀 없음**:
- 다크모드 버튼 `aria-pressed`, `aria-label`, 아이콘 전환 — 변경 없음 ✅
- 로고 링크 스타일 — 변경 없음 ✅
- 로고를 감싸는 `Box` 추가가 레이아웃에 영향 없음 (`display: flex, alignItems: center`) ✅

---

### `category-page.jsx`

- `drawerOpen` state L26 — `if (!category)` 조건 이전에 선언 (hooks 규칙 준수) ✅
- `Header`에 `onMenuClick`, `isDrawerOpen` 전달 ✅
- `NavigationDrawer`에 `open`, `onClose`, `currentCategoryId` 전달 ✅
- `NavigationDrawer` 위치: `Header` 바로 아래, `Box(display:flex)` 밖 — 오버레이 레이아웃에 적절 ✅
- `currentSectionSlug` 없이 `currentCategoryId`만 전달 — CategoryPage에서 섹션 미선택이므로 올바름 ✅

---

### `section-page.jsx`

- `drawerOpen` state L40 — **M-2 참조** (위치 문제)
- `Header`에 `onMenuClick`, `isDrawerOpen` 전달 ✅
- `NavigationDrawer`에 `currentSectionSlug={sectionSlug}` 포함 전달 ✅
- Drawer 관련 연결 로직 자체는 올바름 ✅

---

### `doc-page.jsx`

- `drawerOpen` state L32 — `loadedKey`(L30), `doc`(L31) 다음에 연속 선언 ✅
- `Header`에 `onMenuClick`, `isDrawerOpen` 전달 ✅
- `NavigationDrawer`에 `currentSectionSlug={sectionSlug}` 포함 전달 ✅
- 조건부 `if (!category || !sectionName)` 이전에 모든 hooks 완료 ✅

---

### `sidebar.jsx` (비교 확인)

- 기존 `display: { xs: 'none', lg: 'block' }` 유지 — Stage 7에서 변경 없음 ✅
- Desktop Sidebar 구조 리팩토링 없음 ✅

---

## 최종 판단

| 항목 | 결과 |
|---|---|
| Stage 7 즉시 승인 여부 | **조건부 승인** — M-1, M-2 수정 후 완전 승인 |
| 수정 후 승인 여부 | **승인** |
| Stage 8 진행 가능 여부 | **가능** |
| M-1 처리 여부 | **완료** (2026-06-04) |
| M-2 처리 여부 | **완료** (2026-06-04) |

M-1, M-2 모두 처리 완료 — **Stage 7 완전 승인, Stage 8 착수 준비 완료**.
