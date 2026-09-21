# Stage 01 Review

> 검토일: 2026-06-03  
> 검토 대상: App.jsx / home-page.jsx / category-card.jsx / navigation.js / header.jsx / footer.jsx  
> 빌드 상태: ✅ `vite build` 성공 (393 modules, 경고 없음)

---

## 프로젝트 상태

| 항목 | 상태 |
|---|---|
| 빌드 | ✅ 성공 |
| 라우터 구조 | ✅ BrowserRouter + basename 정상 |
| 카테고리 카드 11개 | ✅ 렌더링 |
| 반응형 기본 구조 | ✅ xs/sm/md breakpoint |
| 다크모드 토큰 | ✅ 준비 완료 (표시는 Stage 6) |
| 접근성 기초 | ✅ aria-label, aria-hidden, focus-visible |
| prefers-reduced-motion | ⚠️ 대부분 적용, 일부 누락 |

---

## 잘된 점

### 구조 설계
- **`import.meta.env.BASE_URL`** 을 BrowserRouter `basename`에 사용 — dev/build 환경 자동 분기, 하드코딩 없음
- **`Divider sx={{ mt: 'auto' }}`** 기법 — flex-column 카드에서 footer(섹션 수 + 화살표)를 항상 카드 하단에 정렬. 카드 높이가 달라도 모든 카드의 footer가 동일 위치
- **`height: '100%'`** 카드에 적용 — Grid 행 내 모든 카드가 가장 높은 카드에 맞게 늘어남
- **`(theme) => ({...})` sx 함수 패턴** — 다크모드 색상 분기를 Stage 6 이전에 미리 준비
- **`filter(Boolean)`** — footer.jsx의 `FEATURED_IDS.map().find()` 체인에서 null 방어

### 접근성
- `<Box component='section' aria-label='소개'>`, `<Box component='section' aria-label='카테고리 목록'>` — 섹션에 시맨틱 구조 적용
- 이모지에 `aria-hidden='true'` 일관 적용
- 카드, 링크, 버튼 전체에 `:focus-visible` 스타일 정의
- 외부 링크에 `target='_blank' rel='noopener noreferrer'` 적용

### 코드 품질
- `MAX_VISIBLE = 3` 상수를 모듈 레벨로 분리
- `FEATURED_IDS` 상수를 모듈 레벨로 분리
- 컴포넌트 JSDoc Props 주석 형식 준수 (code-convention.md 기준)
- `prefers-reduced-motion` 처리를 대부분의 transition에 적용

---

## 개선 권장 사항

---

### High Priority

반드시 수정 권장 — Stage 2 전에 처리하는 것이 좋음

---

#### H-1. 카드 hover 시 chip 태그가 배경에 흡수되는 시각적 버그

**파일**: `src/components/ui/category-card.jsx`  
**위치**: 46번 줄 (hover bg), 110번 줄 (chip bg)

**문제**

| 상태 | 카드 배경 | chip 배경 |
|---|---|---|
| Default | `#F2EDE6` (cream-100) | `#EAE3D8` (cream-200) |
| **Hover** | `#EAE3D8` (cream-200) | `#EAE3D8` (cream-200) ← **동일!** |

카드에 마우스를 올리면 카드 배경이 chip과 동일한 `#EAE3D8`이 되어 chip이 보이지 않게 됨.

**수정 방향**
- chip 배경을 `cream-300` (`#DDD5C8`) 으로 한 단계 진하게 변경하면 default/hover 양쪽에서 구분됨
- 또는 chip에 border를 추가하는 방식도 가능

```js
// 현재
backgroundColor: theme.palette.mode === 'light' ? '#EAE3D8' : '#2E2A48',

// 수정 후 (chip이 항상 구분되도록 cream-300 사용)
backgroundColor: theme.palette.mode === 'light' ? '#DDD5C8' : '#3C3858',
```

---

#### H-2. `prefers-reduced-motion` 누락 — Footer GitHub 링크

**파일**: `src/components/common/footer.jsx`  
**위치**: 118번 줄 (GitHub 링크 sx)

**문제**  
같은 파일의 카테고리 링크(94번 줄)에는 `prefers-reduced-motion` 처리가 있지만 GitHub 링크(118번 줄)에는 없음. 접근성 일관성 위반.

```js
// GitHub 링크 sx에 추가 필요
'@media (prefers-reduced-motion: reduce)': { transition: 'none' },
```

---

### Medium Priority

시간 될 때 수정 — Stage 2~3 진행 중에 처리 가능

---

#### M-1. Hero 769px–899px 구간 레이아웃 어색함

**파일**: `src/pages/home-page.jsx`  
**위치**: 106–127번 줄

**문제**  
MUI Grid의 `size={{ xs: 12, md: 5 }}`와 사용자 지정 `@media (max-width: 768px)` 숨김 처리가 충돌하는 구간이 있음.

| 구간 | 상황 | 실제 동작 |
|---|---|---|
| `≤ 768px` | 숨김 의도 | ✅ 숨김 |
| `769px–899px` | 텍스트와 나란히 의도 | ❌ xs:12 적용 → 캐릭터가 텍스트 아래 전체 너비로 쌓임 |
| `≥ 900px (md)` | 텍스트와 나란히 | ✅ 7:5 비율 |

현재 769–899px 범위에서 캐릭터가 가로 전체로 텍스트 아래에 등장함.

**수정 방향**  
Stage 7(반응형) 전 임시 처리: Grid item 크기를 `sm` 부터 설정하거나 `sm: 5`를 추가

```js
// 현재
size={{ xs: 12, md: 5 }}

// 수정 후 (sm부터 옆에 배치)
size={{ xs: 12, sm: 5, md: 5 }}
```

텍스트 컬럼도 함께:
```js
size={{ xs: 12, sm: 7, md: 7 }}
```

---

#### M-2. Box + Container 이중 px 처리

**파일**: `src/pages/home-page.jsx`  
**위치**: 27–34번 줄, 132–136번 줄

**문제**  
외부 `<Box px={{ xs: 2, md: 3 }}>` 안에 `<Container maxWidth='lg'>`가 있는 구조. MUI Container는 자체적으로 내부 padding을 가짐(`16px` mobile, `24px` desktop). Box의 `px`까지 더해지면 의도보다 여백이 넓어질 수 있음.

```
Box px (16px) + Container default px (16px) = 32px 양쪽 여백 (모바일)
```

**수정 방향 (둘 중 하나)**
- Box에서 `px` 제거하고 Container에만 위임 (`disableGutters` 없이 Container 기본값 사용)
- 또는 Box에 `px` 유지하고 Container에 `disableGutters` 추가

Footer.jsx(35번 줄)는 Container에 `px`를 직접 주는 방식으로 일관성도 없어 함께 정리 필요.

---

#### M-3. 와일드카드 Route 인라인 JSX

**파일**: `src/App.jsx`  
**위치**: 16–37번 줄

**문제**  
`path='*'`의 fallback UI가 App.jsx 내부에 인라인 JSX로 작성되어 있음. Stage 2에서 새 Route가 추가될수록 App.jsx가 복잡해지며, not-found 로직을 테스트하거나 수정하기 어려움.

**수정 방향**

```jsx
// src/pages/not-found-page.jsx 생성 후
import NotFoundPage from '@/pages/not-found-page';

<Route path='*' element={<NotFoundPage />} />
```

Stage 2 시작 전 또는 Stage 8(캐릭터 적용) 때 함께 처리 권장.

---

### Low Priority

선택 사항 — 기능에 영향 없음, 코드 품질 개선

---

#### L-1. `navigation.js`의 `id`와 `slug` 중복

**파일**: `src/data/navigation.js`

**문제**  
모든 항목에서 `id`와 `slug`가 동일한 값 (예: `id: 'frontend', slug: 'frontend'`). 하나가 불필요.

**현재 유지 이유**  
향후 `slug`와 `id`가 달라질 가능성이 있다면 분리가 합리적. 현재는 `slug`를 URL 전용, `id`를 React key 전용으로 역할을 구분하는 의도가 있을 수 있어 즉시 제거하지 않아도 됨.

**수정 방향 (선택)**  
`slug`를 제거하고 `id`를 URL 슬러그로 사용. CategoryCard에서 `to={`/${category.id}`}` 로 변경.

---

#### L-2. Footer의 `featured` 배열 렌더마다 재계산

**파일**: `src/components/common/footer.jsx`  
**위치**: 20–22번 줄

**문제**  
```js
const featured = FEATURED_IDS.map((id) => categories.find((c) => c.id === id)).filter(Boolean);
```
컴포넌트 함수 내부에서 계산하므로 렌더마다 재실행. Footer는 현재 사실상 정적이라 영향 없지만 코드 의도가 명확하지 않음.

**수정 방향**  
모듈 레벨 상수로 이동:
```js
// 함수 외부
const FEATURED_CATEGORIES = FEATURED_IDS
  .map((id) => categories.find((c) => c.id === id))
  .filter(Boolean);
```

---

#### L-3. Header Toolbar `minHeight: '64px !important'`

**파일**: `src/components/common/header.jsx`  
**위치**: 32번 줄

**문제**  
MUI `!important`는 코드 스멜. MUI Toolbar는 모바일(56px)과 데스크톱(64px)을 기본으로 구분하는데, `!important`로 강제 고정하면 모바일에서 헤더가 의도보다 약간 높게 표시될 수 있음.

**수정 방향 (선택)**  
theme.js에서 Toolbar 기본 높이를 오버라이드:
```js
components: {
  MuiToolbar: {
    styleOverrides: {
      root: { minHeight: '64px' },
    },
  },
},
```

---

#### L-4. 검색 버튼에 `type='button'` 없음

**파일**: `src/pages/home-page.jsx`  
**위치**: 63번 줄

**문제**  
`<Box component='button' onClick=...>` 에 `type` 속성이 없음. HTML 기본값은 `type='submit'`이므로, 만약 나중에 form 안에 들어가면 의도치 않게 form을 제출할 수 있음. 현재는 form 밖이라 동작 문제 없음.

**수정 방향**
```jsx
<Box component='button' type='button' onClick={...}>
```

---

#### L-5. 카드의 `cursor: 'pointer'` 중복

**파일**: `src/components/ui/category-card.jsx`  
**위치**: 41번 줄

**문제**  
`<Box component={Link}>` 는 `<a>` 로 렌더링되고, `<a>`의 cursor는 기본으로 `pointer`. `cursor: 'pointer'`를 명시적으로 다시 지정하는 것은 중복.

**현재 유지 이유**  
의도를 명확히 하는 방어적 코드로 볼 수 있어 즉시 제거할 필요는 없음.

---

## Stage 2 진행 전 체크리스트

```
[ ] H-1 수정 — chip 배경색 cream-300으로 변경 (hover 시 chip 소멸 버그)
[ ] H-2 수정 — Footer GitHub 링크 prefers-reduced-motion 추가
[ ] M-1 검토 — Hero 769-899px 캐릭터 레이아웃 (Stage 7 전 임시 처리 여부 결정)
[ ] M-2 검토 — px 이중 적용 여부 실제 화면 확인 후 결정
[ ] M-3 예정 — NotFoundPage 컴포넌트 분리 (Stage 2 시작 시 함께 처리)
[ ] L-1~L-5 — 기능 영향 없음, 시간 될 때 처리
```

Stage 2에서 **반드시 선행**해야 하는 작업:
- `src/pages/not-found-page.jsx` 생성 (M-3) — Stage 2 Route 추가 전에 처리하면 App.jsx가 깔끔해짐
- `navigation.js`에 `description` 필드 추가 검토 — CategoryPage 헤더에 카테고리 설명이 필요할 수 있음

---

## 최종 판단

### Stage 2 진행 가능 여부: ✅ 진행 가능

**근거**

1. **H-1 (chip 소멸 버그)** 는 시각적 버그이지만 기능적 오류는 아님. Stage 2 진행을 막지 않음. 단, 사용자 경험 관점에서 **Stage 2 시작 전 또는 시작 직후 수정 권장**.

2. **H-2 (prefers-reduced-motion 누락)** 는 접근성 이슈이지만 대다수 사용자에게 영향 없음. 빠르게 수정 가능.

3. **M-1~M-3, L-1~L-5** 는 Stage 2 구현을 막는 문제가 아님.

4. 핵심 구조(Router, 컴포넌트 분리, 데이터 레이어, 다크모드 준비)는 Stage 2 확장에 적합하게 설계되어 있음.

### 권장 처리 순서

```
① H-1, H-2 수정 (약 10분)
② M-3 NotFoundPage 분리 (Stage 2 시작 시 함께)
③ Stage 2 구현 시작
```
