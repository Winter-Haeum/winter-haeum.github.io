# Stage 8 설계 — Winter Haeum Character System

> 기준: Stage 7 완료 상태 (Dark Mode · Search · Mobile Drawer 구현 완료)  
> 이미지 파일은 사용자가 직접 준비 · 배치하며, 코드는 해당 경로를 참조한다.

---

## 1. Stage 8 목표

| 목표 | 의미 |
|---|---|
| **아카이브 정체성 형성** | Winter Haeum 캐릭터를 통해 개인 아카이브로서의 고유한 분위기를 만든다 |
| **맥락에 맞는 UX 강화** | 빈 상태(Empty State) / 오류 상황에서 캐릭터가 방문자에게 친근하게 안내한다 |
| **콘텐츠 방해 최소화** | 학습 흐름을 깨지 않도록 캐릭터 노출 위치와 빈도를 엄격히 제한한다 |

**Stage 8 범위 외**:
- Markdown 본문 내 캐릭터 삽입
- Sidebar / Drawer 내 캐릭터
- Search 결과 카드 내 캐릭터
- 캐릭터 애니메이션 (hover, 클릭 이펙트 등)

---

## 2. 캐릭터 사용 목적

| 상황 | 목적 |
|---|---|
| **Home Hero** | 방문자를 맞이하는 환영 역할. 사이트 첫인상에 개성 부여 |
| **About 페이지** | Winter Haeum이 누구인지 소개. 캐릭터가 주인공 역할 |
| **Search Empty State** | 검색 전 / 결과 없음 상태에서 딱딱한 빈 화면 대신 친근한 안내 |
| **404 페이지** | 길을 잃은 상황을 유머러스하게 표현. 귀환 버튼으로 자연스럽게 유도 |

---

## 3. 캐릭터 사용 원칙

1. **페이지당 최대 1개** — 복수의 캐릭터 이미지를 병렬 배치하지 않는다.
2. **장식 보조** — 캐릭터는 텍스트 내용을 강조할 뿐, 단독으로 정보를 전달하지 않는다.
3. **콘텐츠 영역 분리** — 문서 읽기 흐름(Breadcrumb, Markdown, Sidebar, Drawer)에 캐릭터를 개입시키지 않는다.
4. **접근성 우선** — 캐릭터 이미지를 장식으로 처리(`alt=''`)하고, 주변 텍스트가 내용을 완전히 설명한다.
5. **다크모드 자연스러운 융화** — 투명 배경 PNG를 사용해 라이트/다크 배경 모두에서 어색함 없이 표시된다.

---

## 4. 허용 위치

| 위치 | 파일 | 이미지 |
|---|---|---|
| Home Hero 섹션 | `src/pages/home-page.jsx` | `winter-wave.png` |
| About 페이지 | `src/pages/about-page.jsx` (신규) | `winter-study.png` |
| Search Empty State | `src/components/ui/SearchEmptyState.jsx` | `winter-thinking.png` |
| 404 페이지 | `src/pages/not-found-page.jsx` | `winter-error.png` |

---

## 5. 금지 위치

| 위치 | 이유 |
|---|---|
| Markdown 본문 내부 | 학습 집중도 방해, 문서별 다른 이미지 필요성 발생 |
| Sidebar | 탐색 UI의 밀도 높은 영역, 이미지로 인한 레이아웃 불안정 |
| Drawer (모바일 네비게이션) | 좁은 공간에서 탐색 방해 |
| Search 결과 카드 | 검색 결과 정보에 집중해야 하는 영역 |
| Header / Footer | 전역 컴포넌트로 모든 페이지에 표시 → 과도한 반복 노출 |
| Breadcrumb | 내비게이션 정보 전달 영역 |
| CategoryPage / SectionPage | 목록 탐색 흐름 방해 |

---

## 6. 노출 빈도 규칙

- **전체 페이지 중 4개 페이지에서만 노출**: Home, About, Search, 404
- **페이지당 단 1개의 캐릭터 이미지**
- 같은 이미지를 다른 페이지에서 중복 사용 금지 (각 페이지마다 상황에 맞는 포즈 사용)
- 카테고리/섹션/문서 페이지 등 학습 콘텐츠 영역에는 캐릭터 없음

---

## 7. Home Hero 적용 방식

### 현재 상태

```jsx
// home-page.jsx
import heroImg from '@/assets/hero.png';

<Box component='img' src={heroImg} alt='' sx={{ width: '160px', ... }} />
```

`src/assets/hero.png`가 이미 배치되어 있다. Stage 8에서는 이 이미지를 새 경로로 교체한다.

### Stage 8 변경 내용

```jsx
import winterWaveImg from '@/assets/characters/winter-wave.png';

<Box component='img' src={winterWaveImg} alt='' ... />
```

**레이아웃 규칙 (기존 유지)**:

| 뷰포트 | 표시 크기 | 표시 여부 |
|---|---|---|
| md 이상 (900px+) | 160px | 표시 |
| md ~ lg (900~1024px) | 120px | 표시 |
| 768px 미만 | — | 숨김 |

**배치**: Hero 텍스트 우측 Grid(size `{ xs: 12, md: 5 }`) — 기존 위치 유지.

---

## 8. About 페이지 적용 방식

### 개요

`/about` 라우트를 신규 생성한다.  
캐릭터가 메인 비주얼로 등장하는 유일한 페이지.

### URL 및 라우팅

```
URL: /about
Route: <Route path='/about' element={<AboutPage />} />
```

### 레이아웃 구조

```
AboutPage
├── Header
├── main
│    ├── Container (maxWidth='sm')
│    │    ├── 캐릭터 이미지 (winter-study.png, 중앙 정렬)
│    │    ├── 제목: "Winter Haeum"
│    │    ├── 소개 텍스트
│    │    └── 홈으로 돌아가기 링크
└── Footer
```

### 캐릭터 이미지 크기

| 뷰포트 | 표시 크기 |
|---|---|
| md 이상 | 200px |
| xs ~ md | 140px |

**배치**: `display: 'block', mx: 'auto'` — 중앙 정렬, 텍스트 위에 배치.

### Header 연결

AboutPage는 Sidebar가 없으므로 `<Header />` 호출 시 `onMenuClick` 전달 없음.  
햄버거 버튼 미표시 (기존 Header 조건부 렌더링 그대로 적용됨).

---

## 9. Empty State 적용 방식

### 대상 컴포넌트

`src/components/ui/SearchEmptyState.jsx`

### 현재 상태

캐릭터 이미지 없이 텍스트 + 카테고리 링크만 렌더링.

### Stage 8 변경 내용

```jsx
import winterThinkingImg from '@/assets/characters/winter-thinking.png';

// 텍스트 블록 위에 이미지 추가
<Box component='img' src={winterThinkingImg} alt=''
  sx={{ width: '80px', height: 'auto', mb: 3, userSelect: 'none', pointerEvents: 'none' }}
/>
```

**표시 조건**:
- 검색 전(empty query) / 결과 없음 양쪽 모두 동일 이미지 표시
- 이미지 크기: **80px 고정** (작게 유지 — 검색 UX 방해 최소화)
- 위치: 제목 텍스트 바로 위

**현재 텍스트/링크 구조 변경 없음** — 이미지만 상단 추가.

---

## 10. 404 페이지 적용 방식

### 현재 상태

```
"404" 대형 텍스트 (aria-hidden) → 제목 → 설명 → 홈 버튼
```

### Stage 8 변경 내용

"404" 숫자 텍스트를 유지하되, **텍스트 위에 캐릭터 이미지를 추가**한다.

```
winter-error.png (120px)
↓
"404" 대형 텍스트 (aria-hidden)
↓
"페이지를 찾을 수 없습니다"
↓
설명 텍스트
↓
홈으로 돌아가기 버튼
```

**이미지 크기**:

| 뷰포트 | 표시 크기 |
|---|---|
| md 이상 | 120px |
| xs | 80px |

**접근성**: `alt=''` — "404" 텍스트와 제목이 의미를 충분히 전달.

---

## 11. 이미지 파일 구조

```
src/assets/
├── hero.png               ← 기존 (Stage 8 이후 미사용, 삭제 가능)
├── react.svg
├── vite.svg
└── characters/            ← Stage 8 신규 디렉토리
     ├── winter-wave.png
     ├── winter-study.png
     ├── winter-thinking.png
     └── winter-error.png
```

**기존 `hero.png`**: `home-page.jsx` import가 `winter-wave.png`로 교체된 후 참조가 없어진다.  
Stage 8 구현 시 `hero.png` 삭제 여부는 선택사항.

---

## 12. 파일명 규칙

| 파일명 | 사용 위치 | 캐릭터 상황 |
|---|---|---|
| `winter-wave.png` | Home Hero | 인사하는 / 환영하는 포즈 |
| `winter-study.png` | About 페이지 | 공부하는 / 앉아있는 포즈 |
| `winter-thinking.png` | SearchEmptyState | 생각하는 / 고민하는 포즈 |
| `winter-error.png` | 404 페이지 | 당황한 / 헤매는 포즈 |

**규칙**:
- 접두사 `winter-` 고정
- 소문자 kebab-case
- 상황을 명확히 표현하는 단어 사용
- 확장자 `.png` 고정

---

## 13. PNG 규격

### 기본 규격

| 항목 | 기준 |
|---|---|
| 포맷 | PNG-24 (트루컬러 + 알파채널) |
| 배경 | 완전 투명 (alpha = 0) |
| 원본 해상도 | 400×500px 이상 권장 (세로형 캐릭터 기준) |
| 파일 크기 | 이미지당 150KB 이하 권장 |

### Retina 대응

별도 `@2x` 파일을 생성하지 않는다. 대신 **원본 이미지를 CSS 표시 크기의 2배 이상 해상도로 제작**한다.

| CSS 표시 크기 (최대) | 원본 권장 해상도 |
|---|---|
| 200px (About 페이지) | 400px 이상 |
| 160px (Home Hero) | 320px 이상 |
| 120px (404 페이지) | 240px 이상 |
| 80px (SearchEmptyState) | 160px 이상 |

→ 단일 파일(400×500px 원본)이 모든 사용처의 Retina 요구사항을 충족한다.

### 공통 스타일 속성

모든 캐릭터 이미지에 아래 sx 속성을 공통 적용한다.

```jsx
sx={{
  height: 'auto',
  userSelect: 'none',
  pointerEvents: 'none',
  display: 'block',
}}
```

---

## 14. 반응형 규칙

| 컴포넌트 | xs | sm | md | lg 이상 |
|---|---|---|---|---|
| Home Hero (`winter-wave.png`) | 숨김 | 숨김 | 120px | 160px |
| About (`winter-study.png`) | 140px | 140px | 200px | 200px |
| SearchEmptyState (`winter-thinking.png`) | 80px | 80px | 80px | 80px |
| 404 (`winter-error.png`) | 80px | 80px | 120px | 120px |

**Home Hero 숨김 기준**: 기존 `@media (max-width: 768px)` 유지 (현재 코드 변경 없음).

---

## 15. 접근성 규칙

**모든 캐릭터 이미지에 `alt=''` 적용** (장식 이미지 처리).

이유:
- 이미지 자체가 의미 정보를 전달하지 않음
- 주변 텍스트(제목, 설명)가 맥락을 완전히 설명
- 스크린 리더가 `alt=''`인 이미지를 건너뜀으로써 불필요한 반복 방지

**각 위치별 텍스트 보완 확인**:

| 위치 | 보완 텍스트 |
|---|---|
| Home Hero | "Winter Dev Archive" 제목 + 소개 텍스트 |
| About | "Winter Haeum" 제목 + 소개 텍스트 |
| SearchEmptyState | "검색어를 입력해..." / "'query'에 대한 결과가 없습니다" 텍스트 |
| 404 | "페이지를 찾을 수 없습니다" h1 + 설명 텍스트 |

---

## 16. 다크모드 고려사항

### PNG 투명 배경의 동작

PNG 투명 배경은 CSS `background-color`를 그대로 비춘다.  
라이트 모드(`#FAF8F5`)와 다크 모드(`#1C182C`) 배경 모두에서 별도 처리 없이 자연스럽게 표시된다.

### 캐릭터 디자인 주의사항 (이미지 제작 시)

| 항목 | 권장 사항 |
|---|---|
| 선(outline) 색상 | 흰색 또는 매우 밝은 색 사용 금지 — 라이트 배경에서 보이지 않음 |
| 전체 테두리 | 어두운 선(#2C2840 수준)으로 캐릭터 외곽 정의 |
| 내부 색상 | 중간 채도의 색상 — 라이트/다크 양쪽에서 선명하게 보임 |
| 그림자 효과 | CSS drop-shadow 사용 금지 — 모드 전환 시 어색함 가능 |

### CSS 처리 없음

별도 `filter: invert()` 또는 모드 분기 sx가 필요 없다.  
투명 PNG + 적절한 캐릭터 색상 설계만으로 해결.

---

## 17. 향후 확장 계획

| 시기 | 항목 | 설명 |
|---|---|---|
| Phase 2 | `winter-celebration.png` | 특정 학습 달성 시 축하 화면용 |
| Phase 2 | `DocsLayout` 통합 후 캐릭터 관리 중앙화 | 페이지별 분산 import → 공통 관리 |
| Phase 3 | 캐릭터 hover 인터랙션 (선택) | Home Hero에서 캐릭터 클릭 시 짧은 반응 |

현재 Stage 8은 정적 이미지 배치에만 집중한다. 애니메이션 · 인터랙션은 범위 외.

---

## 18. 수정 대상 파일

| 파일 | 변경 내용 |
|---|---|
| `src/pages/home-page.jsx` | `heroImg` import 경로를 `@/assets/characters/winter-wave.png`로 교체 |
| `src/pages/not-found-page.jsx` | `winter-error.png` 이미지 추가 |
| `src/components/ui/SearchEmptyState.jsx` | `winter-thinking.png` 이미지 추가 |
| `src/App.jsx` | `/about` 라우트 추가 |

---

## 19. 신규 생성 파일

| 파일 | 설명 |
|---|---|
| `src/pages/about-page.jsx` | About 페이지 컴포넌트 |
| `src/assets/characters/winter-wave.png` | Home Hero 이미지 (사용자 제공) |
| `src/assets/characters/winter-study.png` | About 이미지 (사용자 제공) |
| `src/assets/characters/winter-thinking.png` | SearchEmptyState 이미지 (사용자 제공) |
| `src/assets/characters/winter-error.png` | 404 이미지 (사용자 제공) |

> **이미지 파일은 코드 구현 전 `src/assets/characters/` 디렉토리에 배치되어야 한다.**  
> 이미지 없이 코드만 작성하면 빌드 시 import 오류가 발생한다.

---

## 20. 예상 작업량

| Step | 대상 | 예상 복잡도 |
|---|---|---|
| 0 (사전 작업) | 이미지 4개 `src/assets/characters/`에 배치 | 사용자 작업 |
| 1 | `about-page.jsx` 신규 생성 | 중간 (레이아웃 설계 포함) |
| 2 | `App.jsx` — `/about` 라우트 추가 | 낮음 (1줄) |
| 3 | `home-page.jsx` — import 경로 교체 | 낮음 (1줄) |
| 4 | `not-found-page.jsx` — 이미지 추가 | 낮음 |
| 5 | `SearchEmptyState.jsx` — 이미지 추가 | 낮음 |

전체: 신규 파일 1개(JSX), 수정 파일 4개, 이미지 파일 4개(사용자 준비).  
코드 구현 자체는 단순하며, **이미지 준비가 선행 조건**.
