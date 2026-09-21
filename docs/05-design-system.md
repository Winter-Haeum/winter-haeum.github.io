# 05. Design System

> Winter Dev Archive 전용 디자인 시스템.  
> 컬러는 `04-color-palette.md`, 구조는 `01-information-architecture.md` 기준.

---

## 설계 원칙

Winter Dev Archive는 기술 블로그가 아닌 **두고두고 꺼내보는 학습 아카이브**다.  
모든 디자인 결정은 아래 세 원칙을 기준으로 판단한다.

| 원칙 | 의미 |
|---|---|
| **읽기 좋은 것이 우선** | 화려함보다 장시간 읽어도 피로하지 않은 가독성 |
| **찾기 쉬운 것이 우선** | 탐색 동선과 정보 계층이 직관적이어야 한다 |
| **일관성이 신뢰를 만든다** | 같은 요소는 항상 같은 모습으로 보여야 한다 |

---

## 1. 타이포그래피

### 폰트 패밀리

| 용도 | 폰트 | 비고 |
|---|---|---|
| 한국어 본문 / UI | `Pretendard` | 가독성과 현대적 감각을 겸비한 한국어 폰트 |
| 영문 보조 | `Inter` | Pretendard 미지원 영문 fallback |
| 코드 | `JetBrains Mono` | 리가처 지원, 코드 가독성 최우선 |
| 시스템 fallback | `system-ui, sans-serif` | |

```css
--font-body: 'Pretendard', 'Inter', system-ui, sans-serif;
--font-code: 'JetBrains Mono', 'Fira Code', monospace;
```

### 타입 스케일

| 토큰 | 크기 | 굵기 | 용도 |
|---|---|---|---|
| `text-4xl` | 2.25rem (36px) | 700 | 페이지 H1 (문서 제목) |
| `text-3xl` | 1.875rem (30px) | 700 | H2 (대단원) |
| `text-2xl` | 1.5rem (24px) | 600 | H3 (소단원) |
| `text-xl` | 1.25rem (20px) | 600 | H4 (항목 제목) |
| `text-base` | 1rem (16px) | 400 | 본문 |
| `text-sm` | 0.875rem (14px) | 400 | 캡션, 날짜, 메타 |
| `text-xs` | 0.75rem (12px) | 400 | 태그, 라벨 |
| `text-code` | 0.875rem (14px) | 400 | 코드 블록 내부 |

### 행간 (Line Height)

| 용도 | line-height | 이유 |
|---|---|---|
| 제목 (H1–H2) | `1.25` | 타이트하게, 제목다운 밀도 |
| 소제목 (H3–H4) | `1.4` | 중간 밀도 |
| 본문 | `1.75` | 장문 읽기 피로 최소화 |
| 코드 | `1.6` | 코드 라인 구분 명확히 |
| 캡션 / 라벨 | `1.4` | 짧은 텍스트, 간결하게 |

### 자간 (Letter Spacing)

| 용도 | letter-spacing |
|---|---|
| 제목 | `-0.02em` |
| 본문 | `0em` |
| 캡션, 태그 | `0.01em` |
| 대문자 라벨 (UPPERCASE) | `0.08em` |

### 문단 규칙

- 본문 최대 너비: **`65ch`** — 한 줄에 너무 많은 글자가 들어오지 않도록 제한
- 문단 간격: `margin-bottom: 1.5rem`
- 첫 문단 들여쓰기 없음

---

## 2. 카드 디자인

### 카드 유형

**Default Card** — 일반 문서 목록, 섹션 진입 카드

```
┌─────────────────────────────┐
│  🏷 카테고리 태그            │
│                              │
│  **문서 제목**               │
│  설명 텍스트 한 두 줄        │
│                              │
│  날짜 · 섹션명              │
└─────────────────────────────┘
```

**Highlight Card** — 추천 문서, 섹션 대표 카드

- 배경에 `violet-50` 틴트 적용
- 좌측 상단에 보라 accent bar (4px)
- 제목 폰트 굵기 700

**Compact Card** — 검색 결과, 관련 문서 목록

- 높이 고정 (72px)
- 제목 + 카테고리 태그만 표시
- hover 시 배경색 변화만으로 피드백

### 카드 공통 규칙

| 속성 | 값 |
|---|---|
| border-radius | `12px` |
| padding | `24px` |
| border | `1px solid cream-300` |
| transition | `background 0.15s, border-color 0.15s` |
| cursor | `pointer` |

- 카드 내부에 클릭 가능한 링크가 하나뿐이면 카드 전체가 클릭 영역
- 그림자(box-shadow)는 사용하지 않는다 — 크림 배경에서는 border로 충분
- 이미지 없는 텍스트 카드가 기본 — 썸네일 이미지는 선택 사항

---

## 3. 버튼 스타일

### 버튼 유형

| 유형 | 용도 | 시각적 특징 |
|---|---|---|
| **Primary** | 핵심 행동 (문서 열기, 다음으로 이동) | 채워진 보라 배경 |
| **Secondary** | 보조 행동 (카테고리 이동, 필터) | 연한 보라 배경, 보라 텍스트 |
| **Ghost** | 텍스트에 가까운 버튼 (이전/다음 링크) | 투명 배경, 보라 테두리 |
| **Icon Button** | 복사, 다크모드 토글, 검색 | 아이콘만, 배경 없음 |

### 버튼 크기

| 크기 | height | padding | font-size | 용도 |
|---|---|---|---|---|
| `sm` | 32px | `0 12px` | `text-xs` | 태그 수준, 인라인 |
| `md` | 40px | `0 20px` | `text-sm` | 기본 버튼 |
| `lg` | 48px | `0 28px` | `text-base` | 강조 CTA |

### 버튼 공통 규칙

- border-radius: `8px` (pill 형태는 사용하지 않는다)
- 모든 버튼은 `transition: 0.15s` 적용
- 아이콘과 텍스트가 함께 있을 때 간격: `8px`
- 비활성(disabled) 상태에서는 opacity가 아닌 색상 토큰으로 처리
- 로딩 상태: 텍스트를 spinner로 교체, 너비 고정

---

## 4. 사이드바 스타일

### 구조

```
┌────────────────────────┐
│  Winter Dev Archive    │  ← 로고 / 사이트명
│                        │
│  📚 Frontend           │  ← 카테고리 (접기/펼치기 가능)
│    └ HTML              │
│    └ CSS ←────────── 활성 항목 (violet-500 바 + 배경)
│    └ Layout            │
│                        │
│  💛 JavaScript         │
│    └ Basics            │
│    └ Functions         │
│                        │
│  ─────────────────── │  ← 구분선
│  🔍 Search             │
└────────────────────────┘
```

### 사이드바 규칙

| 속성 | 값 |
|---|---|
| 너비 | `280px` (데스크톱 고정) |
| 배경 | `cream-100` `#F2EDE6` |
| border-right | `1px solid cream-300` |
| position | `fixed` (스크롤에 고정) |
| overflow-y | `auto` (내용이 길면 독립 스크롤) |

**카테고리 레이블**
- 텍스트: `ink-500`, `text-xs`, 대문자 + `letter-spacing: 0.08em`
- 이모지는 카테고리 레이블 앞에만 사용 (하위 항목에는 없음)

**메뉴 항목**
- padding: `8px 16px`
- border-radius: `6px`
- 활성 항목 좌측에 `3px` 보라 bar 표시
- 활성 항목 배경: `violet-100`

**접기/펼치기**
- 카테고리 클릭 시 하위 항목 토글
- 애니메이션: `max-height` transition `0.2s ease`
- 현재 페이지가 속한 카테고리는 기본 펼침 상태

---

## 5. 코드 블록 스타일

### 구조

```
┌─ language-label ─── [복사 버튼] ─┐
│ css                          Copy │
├───────────────────────────────────┤
│ .container {                      │
│   display: flex;                  │
│   justify-content: center;        │
│ }                                 │
└───────────────────────────────────┘
```

### 코드 블록 규칙

| 속성 | 값 |
|---|---|
| border-radius | `8px` |
| padding | `16px 20px` |
| font-family | `JetBrains Mono` |
| font-size | `0.875rem` |
| line-height | `1.6` |
| overflow-x | `auto` (가로 스크롤, 줄바꿈 없음) |

- **언어 라벨**은 항상 표시한다. 언어를 명시하지 않은 코드 블록은 `text`로 표시
- **복사 버튼**은 우측 상단, hover 시에만 완전히 보임 (기본은 30% opacity)
- 긴 코드(30줄 이상)는 **최대 높이 400px** + 내부 스크롤 적용
- 인라인 코드(`` `code` ``)는 배경 `cream-200`, 보라 텍스트, border-radius `4px`, padding `2px 6px`

### 언어별 라벨 표기

| 언어 | 라벨 표기 |
|---|---|
| JavaScript | `js` |
| TypeScript | `ts` |
| JSX | `jsx` |
| TSX | `tsx` |
| HTML | `html` |
| CSS | `css` |
| Bash / Shell | `bash` |
| JSON | `json` |
| Markdown | `md` |
| 예시 텍스트 | `text` |

---

## 6. 이모지 사용 규칙

### 사용 가능한 위치

| 위치 | 규칙 |
|---|---|
| **사이드바 카테고리** | 카테고리당 1개, IA에 정의된 이모지만 사용 |
| **Callout 아이콘** | ✅ Tip · ⚠️ Caution · 🚫 Danger · 💡 Note |
| **홈 대시보드 카드** | 섹션 대표 이모지 1개 |
| **문서 제목** | 사용 금지 (제목은 텍스트만) |
| **본문 텍스트** | 사용 금지 |
| **버튼** | 사용 금지 |

### 카테고리 이모지 (실제 `navigation.js` 기준, 2026-08 개편 — [01-information-architecture.md](01-information-architecture.md) 참고)

| 카테고리 | 이모지 |
|---|---|
| Home | 🏠 |
| HTML | 📄 |
| CSS | 🖍 |
| DevTools & Layout | 🔍 |
| JavaScript | 💛 |
| TypeScript | 🔷 |
| React | ⚛ |
| Git & GitHub | 🐙 |
| Web & Network | 🌐 |
| HTTP | 📡 |
| jQuery | 💠 |
| Regular Expression | 🔎 |
| Firebase | 🔥 |
| CSS Framework | 🎨 |
| Testing | 🧪 |
| Build Tools | 📦 |
| Coding Test | 🏆 |
| AI & Vibe Coding | 🤖 |
| Search | 🔍 |

### 사용 금지 규칙

- 감정 표현 이모지 사용 금지 (😊🎉👍 등)
- 같은 이모지를 한 화면에 두 번 이상 반복 금지
- 장식 목적으로만 이모지를 쓰는 것 금지

---

## 7. 여백 규칙

### 간격 단위 체계

4px를 기본 단위로 사용한다. (1 unit = 4px)

| 토큰 | 값 | 용도 |
|---|---|---|
| `space-1` | 4px | 아이콘–텍스트 간격, 태그 내부 패딩 |
| `space-2` | 8px | 인라인 요소 간 간격 |
| `space-3` | 12px | 버튼 아이콘 간격, 소형 여백 |
| `space-4` | 16px | 컴포넌트 내부 패딩 기본값 |
| `space-6` | 24px | 카드 패딩, 섹션 내 요소 간격 |
| `space-8` | 32px | H2 하단 여백, 카드 그리드 간격 |
| `space-12` | 48px | 섹션 간 구분 여백 |
| `space-16` | 64px | 페이지 상하 패딩 |
| `space-24` | 96px | 페이지 최상단/최하단 여백 |

### 문서 본문 여백 규칙

| 요소 | margin-top | margin-bottom |
|---|---|---|
| H1 | `0` | `space-8 (32px)` |
| H2 | `space-12 (48px)` | `space-6 (24px)` |
| H3 | `space-8 (32px)` | `space-4 (16px)` |
| H4 | `space-6 (24px)` | `space-3 (12px)` |
| 문단 `p` | `0` | `space-6 (24px)` |
| 코드 블록 | `space-6 (24px)` | `space-6 (24px)` |
| Callout | `space-6 (24px)` | `space-6 (24px)` |
| 구분선 `hr` | `space-12 (48px)` | `space-12 (48px)` |
| 표 `table` | `space-6 (24px)` | `space-6 (24px)` |

### 레이아웃 여백 규칙

- 사이드바 너비: `280px`
- 본문 콘텐츠 좌측 여백(사이드바 포함): `280px + 48px`
- 본문 최대 너비: `720px` (사이드바 제외)
- 본문 좌우 padding: `48px` (데스크톱), `24px` (태블릿), `16px` (모바일)

---

## 8. 컴포넌트 규칙

### Border Radius 통일

| 요소 유형 | border-radius |
|---|---|
| 카드 | `12px` |
| 버튼 | `8px` |
| 입력 필드 | `8px` |
| 태그 / 배지 | `6px` |
| 코드 블록 | `8px` |
| 인라인 코드 | `4px` |
| Callout | `8px` |
| 아이콘 버튼 | `6px` |
| 툴팁 | `6px` |

> pill 형태(border-radius: 9999px)는 태그에서도 사용하지 않는다.

### 그림자 (Shadow)

그림자는 최소한으로 사용한다. 크림 배경에서 그림자는 무거운 느낌을 준다.

| 상황 | 처리 방식 |
|---|---|
| 카드 구분 | border로 처리 (`cream-300`) |
| 드롭다운 / 검색 결과 | `box-shadow: 0 4px 16px rgba(44, 40, 64, 0.08)` |
| 모달 오버레이 | `box-shadow: 0 8px 32px rgba(44, 40, 64, 0.12)` |
| 툴팁 | `box-shadow: 0 2px 8px rgba(44, 40, 64, 0.1)` |

### 트랜지션 규칙

| 속성 | 기본 트랜지션 |
|---|---|
| 색상, 배경색 | `0.15s ease` |
| 테두리 색상 | `0.15s ease` |
| 높이 (펼치기/접기) | `0.2s ease` |
| 불투명도 | `0.15s ease` |
| 변환 (transform) | `0.2s ease` |

- 레이아웃 변경(width, height 직접 변경)에는 트랜지션을 넣지 않는다
- `prefers-reduced-motion` 미디어쿼리에서는 모든 트랜지션 비활성화

### 구분선 사용 규칙

- 섹션 구분: `<hr>` 대신 **여백(margin)만으로** 구분하는 것을 우선한다
- 구분선이 꼭 필요한 경우: `border-top: 1px solid cream-300`, 좌우 여백 없음
- 사이드바 카테고리 구분: 구분선 사용 가능

---

## 9. 모바일 규칙

### 브레이크포인트

| 이름 | 너비 | 대상 기기 |
|---|---|---|
| `mobile` | `< 768px` | 스마트폰 |
| `tablet` | `768px – 1023px` | 태블릿, 작은 노트북 |
| `desktop` | `≥ 1024px` | 노트북, 데스크톱 |

### 레이아웃 변화

| 요소 | Desktop | Tablet | Mobile |
|---|---|---|---|
| 사이드바 | 좌측 고정 `280px` | 숨김 → 햄버거 메뉴 | 숨김 → 햄버거 메뉴 |
| 본문 너비 | 사이드바 제외 최대 `720px` | 전체 폭 | 전체 폭 |
| 본문 padding | `48px` 좌우 | `24px` 좌우 | `16px` 좌우 |
| 카드 그리드 | 2–3열 | 2열 | 1열 |
| 코드 블록 | 가로 스크롤 | 가로 스크롤 | 가로 스크롤 |
| 이전/다음 내비 | 좌우 배치 | 좌우 배치 | 상하 배치 |

### 모바일 사이드바 (Drawer)

- 햄버거 아이콘 탭 → 좌측에서 슬라이드인
- 드로어 배경: `cream-100`
- 드로어 외부 오버레이: `rgba(44, 40, 64, 0.4)`
- 닫기: 외부 오버레이 탭 또는 X 버튼

### 모바일 타이포그래피 조정

| 토큰 | Desktop | Mobile |
|---|---|---|
| H1 | `2.25rem` | `1.75rem` |
| H2 | `1.875rem` | `1.5rem` |
| H3 | `1.5rem` | `1.25rem` |
| 본문 | `1rem` | `1rem` (유지) |
| 코드 | `0.875rem` | `0.8rem` |

### 모바일 전용 규칙

- 버튼 최소 터치 영역: `44px × 44px`
- 탭 간 최소 간격: `8px`
- 코드 블록 폰트 크기 소폭 축소 (`0.8rem`)
- 검색은 탭 시 전체 화면 검색 오버레이로 전환

---

## 10. 접근성 규칙

### 색상 대비 기준

WCAG 2.1 AA 기준을 준수한다.

| 조합 | 대비비 | 기준 충족 여부 |
|---|---|---|
| `ink-900` `#2C2840` ↔ `cream-50` `#FAF8F5` | ≥ 7:1 | ✅ AAA |
| `violet-500` `#8464C8` ↔ `cream-50` `#FAF8F5` | ≥ 4.5:1 | ✅ AA |
| `ink-500` `#7A7490` ↔ `cream-50` `#FAF8F5` | ≥ 4.5:1 | ✅ AA (최소) |
| `dark-text-primary` `#F0EBE3` ↔ `dark-bg` `#1C182C` | ≥ 7:1 | ✅ AAA |

- `ink-300` `#B8B2C8`은 단독 텍스트에 사용하지 않는다 (대비 부족)
- 색상만으로 정보를 전달하지 않는다 (아이콘, 텍스트 병행 사용)

### 키보드 접근성

- 모든 인터랙티브 요소는 키보드로 접근 가능해야 한다
- `Tab` 순서는 시각적 순서와 일치해야 한다
- Focus 상태: `outline: 2px solid violet-500`, `outline-offset: 2px`
- 사이드바 메뉴: `↑` `↓` 방향키로 항목 이동 지원
- 코드 블록 복사 버튼: Enter / Space로 실행 가능

### 스크린 리더 지원

| 요소 | 처리 방법 |
|---|---|
| 이모지 | `aria-hidden="true"` + 인접 텍스트로 의미 전달 |
| 아이콘 버튼 | `aria-label` 필수 |
| 코드 블록 | `<code role="region" aria-label="코드 예제">` |
| 현재 페이지 링크 | `aria-current="page"` |
| 사이드바 | `<nav aria-label="문서 목차">` |
| Callout | `role="note"` 또는 `role="alert"` (유형에 따라) |
| 카드 그리드 | `<ul>` + `<li>` 구조 권장 |

### 포커스 가시성 규칙

- 마우스 사용자: 기본 outline 숨김 가능 (`:focus-visible` 활용)
- 키보드 사용자: 항상 명확한 outline 표시 (`violet-500` 2px)
- 다크모드에서는 `dark-violet-400` `#C8B8F0`으로 자동 전환

### 텍스트 크기 및 확대

- 브라우저 기본 폰트 크기 설정 존중 (rem 단위 사용)
- 200% 확대 시 레이아웃이 깨지지 않아야 한다
- 최소 폰트 크기: `12px` (0.75rem)

---

## 컴포넌트 구조 요약

| 컴포넌트 | 색상 참조 | 여백 | 특이사항 |
|---|---|---|---|
| Header | `04-color-palette` Header 섹션 | `h: 64px` | sticky, z-index 최상단 |
| Sidebar | `04-color-palette` Sidebar 섹션 | `w: 280px` | 모바일 Drawer 전환 |
| Card | `04-color-palette` Card 섹션 | `p: 24px, r: 12px` | 그림자 없음 |
| Button | `04-color-palette` Button 섹션 | `h: 40px 기본` | 3가지 유형 |
| Code Block | `04-color-palette` Code Block 섹션 | `p: 16px 20px, r: 8px` | 언어 라벨 필수 |
| Callout | `04-color-palette` Callout 섹션 | `p: 16px 20px, r: 8px` | 4가지 기본 + 6가지 학습용 |
| Tag | `04-color-palette` Tag 섹션 | `p: 4px 10px, r: 6px` | pill 없음 |
| Status Tag | 11번 섹션 | `p: 3px 10px, r: 6px` | 4가지 학습 진행 상태 |
| Footer | `04-color-palette` Footer 섹션 | `py: 48px` | |

---

## 11. 문서 상태(Status) 컴포넌트 규칙

Winter Dev Archive의 문서에는 학습 진행 상태를 표시하는 Status 태그를 붙일 수 있다.  
문서 제목 옆 또는 카드 우측 상단에 위치하며, 프론트매터의 `status` 필드와 연동된다.

### 상태 종류와 의미

| 상태 | 의미 | 사용 시점 |
|---|---|---|
| `DRAFT` | 초안 작성 중 | 내용이 완성되지 않은 문서 |
| `IN PROGRESS` | 학습 진행 중 | 현재 공부하고 있는 문서 |
| `REVIEW` | 복습 단계 | 1회 이상 학습 완료, 복습 예정 |
| `COMPLETED` | 학습 완료 | 내용 정리 및 복습까지 마친 문서 |

### 색상 토큰

#### DRAFT — 비활성, 아직 시작하지 않음

크림 계열의 무채색에 가까운 톤. "아직 채워지지 않은 빈 노트" 느낌.

| 속성 | Light Mode | Dark Mode |
|---|---|---|
| background | `cream-200` `#EAE3D8` | `dark-surface` `#24203A` |
| color | `ink-500` `#7A7490` | `dark-text-muted` `#8880A0` |
| border | `cream-300` `#DDD5C8` | `dark-border` `#3C3858` |

#### IN PROGRESS — 진행 중, 활성 상태

기본 포인트 컬러 바이올렛. "지금 펼쳐 놓은 노트" 느낌.

| 속성 | Light Mode | Dark Mode |
|---|---|---|
| background | `violet-100` `#EDE8FA` | `dark-violet-100` `#2A2544` |
| color | `violet-500` `#8464C8` | `dark-violet-500` `#B39EDD` |
| border | `violet-300` `#BCA4EC` | `#5C5490` |

#### REVIEW — 복습 단계, 거의 완료

진한 바이올렛. "밑줄 긋고 다시 읽는 단계" 느낌.

| 속성 | Light Mode | Dark Mode |
|---|---|---|
| background | `violet-200` `#D4C8F4` | `dark-elevated` `#2E2A48` |
| color | `violet-700` `#5E3EA8` | `dark-violet-400` `#C8B8F0` |
| border | `violet-400` `#A080DC` | `#6858A8` |

#### COMPLETED — 학습 완료

차분한 퍼리윙클 블루. "다 읽고 덮어둔 노트" 느낌.  
IN PROGRESS의 따뜻한 바이올렛과 구분되는 차가운 계열로 완료감을 표현.

| 속성 | Light Mode | Dark Mode |
|---|---|---|
| background | `#EAEef8` | `#20243C` |
| color | `#6070C0` | `#A4AADA` |
| border | `#8898D8` | `#5060A8` |

### 태그 형태 디자인

```
┌──────────────────────┐
│  • DRAFT             │  ← 점 아이콘 + 대문자 텍스트
└──────────────────────┘
```

| 속성 | 값 |
|---|---|
| padding | `3px 10px` |
| border-radius | `6px` |
| border | `1px solid` (각 상태 색상 토큰) |
| font-size | `text-xs` `0.75rem` |
| font-weight | `600` |
| letter-spacing | `0.06em` |
| text-transform | `uppercase` |
| 앞 점 아이콘 | `●` 6px, 동일 색상 |

### 시각화

```
Light Mode
──────────────────────────────────────────
  [ ● DRAFT      ]  #EAE3D8 bg / #7A7490 text  ← 크림-회보라
  [ ● IN PROGRESS]  #EDE8FA bg / #8464C8 text  ← 바이올렛
  [ ● REVIEW     ]  #D4C8F4 bg / #5E3EA8 text  ← 진한 바이올렛
  [ ● COMPLETED  ]  #EAEef8 bg / #6070C0 text  ← 퍼리윙클

Dark Mode
──────────────────────────────────────────
  [ ● DRAFT      ]  #24203A bg / #8880A0 text
  [ ● IN PROGRESS]  #2A2544 bg / #B39EDD text
  [ ● REVIEW     ]  #2E2A48 bg / #C8B8F0 text
  [ ● COMPLETED  ]  #20243C bg / #A4AADA text
```

### 사용 위치

| 위치 | 표시 방식 |
|---|---|
| 문서 페이지 제목 우측 | H1 옆에 인라인으로 태그 1개 |
| 카드 우측 상단 | 카드 내부 absolute 또는 flex justify-between |
| 사이드바 항목 우측 | 항목 텍스트 옆 소형 태그 |
| 섹션 index 목록 | 문서 제목 행 오른쪽 끝 |

### 프론트매터 연동

```yaml
---
title: "Flexbox 완전 이해"
category: "css"
section: "css"
status: "completed"   ← draft | in-progress | review | completed
---
```

---

## 12. 학습용 Callout 규칙

Winter Dev Archive는 학습 아카이브이므로, 일반 Callout(Tip/Caution/Danger/Note) 외에  
**학습 흐름에 특화된 6가지 Callout 유형**을 추가로 정의한다.

모든 Callout 공통 규칙:
- `border-left: 4px solid` — 좌측 Accent Bar로 유형 구분
- `border-radius: 8px`
- `padding: 16px 20px`
- `margin: 24px 0`
- 아이콘은 텍스트 앞에 고정, 제목은 **bold** 처리

---

### 💡 Concept — 핵심 개념

**사용 목적**: 이 문서에서 가장 중요한 개념 정의를 강조할 때.  
"이것만 이해하면 된다"는 핵심 내용에 사용.

```
Light  배경: #F4F0FC   좌측 바: #BCA4EC (violet-300)   텍스트: #2C2840
Dark   배경: #221E38   좌측 바: #6858A8                  텍스트: #E0D8F8
```

```md
> 💡 **Concept**: `display: flex`를 선언한 요소가 Flex Container가 되고,
> 그 직계 자식이 자동으로 Flex Item이 된다.
```

**사용 시점**
- 섹션 첫 번째 개념 정의
- 용어의 정확한 의미를 짚어줄 때
- 개념 간 관계를 설명할 때

---

### ⚠️ Caution — 자주 하는 실수

**사용 목적**: 학습 중 흔히 틀리거나 헷갈리는 지점을 미리 경고.  
"나도 여기서 막혔다"는 포인트에 사용.

```
Light  배경: #F0EAF8   좌측 바: #8464C8 (violet-500)   텍스트: #3A2060
Dark   배경: #281E3C   좌측 바: #7050A0                  텍스트: #E0D4F8
```

```md
> ⚠️ **Caution**: `useEffect` 의존성 배열을 생략하면 컴포넌트 렌더링마다 실행된다.
> 빈 배열 `[]`과 배열 생략은 동작이 완전히 다르다.
```

**사용 시점**
- 초보자가 자주 범하는 오류
- 비슷해 보이지만 다른 개념을 구분할 때
- 특정 조건에서만 발생하는 버그 패턴

---

### ✅ Best Practice — 실무 권장 방식

**사용 목적**: "이렇게 하는 것이 더 좋다"는 실무 관점의 권장 패턴을 안내.  
단순 동작 여부가 아닌 품질과 유지보수를 고려한 방향 제시.

```
Light  배경: #EAEef8   좌측 바: #6070C0   텍스트: #2A3060
Dark   배경: #20243C   좌측 바: #5060A8   텍스트: #C4CCEC
```

```md
> ✅ **Best Practice**: 이벤트 핸들러 함수는 컴포넌트 내부보다
> `useCallback`으로 감싸거나 외부로 분리하면 불필요한 리렌더링을 줄일 수 있다.
```

**사용 시점**
- 동작하지만 더 좋은 방법이 있을 때
- 팀 협업이나 코드 리뷰에서 자주 지적되는 패턴
- 성능 또는 가독성 개선 포인트

---

### 🧪 Practice — 직접 해보는 실습

**사용 목적**: 읽기에서 멈추지 않고 직접 코드를 따라해볼 것을 안내.  
"지금 바로 해보세요" 신호.

```
Light  배경: #EDE8FA (violet-100)   좌측 바: #A080DC (violet-400)   텍스트: #2C2840
Dark   배경: #2A2544               좌측 바: #9070C8                  텍스트: #D8D0F0
```

```md
> 🧪 **Practice**: 아래 코드를 CodeSandbox에 붙여넣고
> `flex-direction: column`으로 바꾸면 어떻게 달라지는지 확인해보세요.
```

**사용 시점**
- 코드 예제 다음에 변형 실습을 유도할 때
- 스스로 확인해봐야 이해되는 동작 설명
- 챕터 마지막 복습 활동 안내

---

### 🔗 Official Docs — 공식 문서 링크

**사용 목적**: 이 아카이브의 내용은 요약본임을 인지시키고,  
공식 문서에서 더 정확하고 최신인 정보를 확인하도록 안내.

```
Light  배경: #E8EDF8   좌측 바: #7080C8   텍스트: #1C2858
Dark   배경: #1E2238   좌측 바: #5870A8   텍스트: #C0C8E8
```

```md
> 🔗 **Official Docs**: CSS Flexbox의 전체 속성 목록은
> [MDN Web Docs — Flexbox](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_flexible_box_layout)에서 확인할 수 있다.
```

**사용 시점**
- 주제의 공식 레퍼런스를 안내할 때
- 버전이나 브라우저 호환성 변화가 있는 내용
- 이 문서에서 다루지 않은 심화 내용이 있을 때

---

### 📌 Remember — 암기 포인트

**사용 목적**: 외워두면 앞으로 계속 쓰이는 핵심 공식, 규칙, 값을 강조.  
"노트에 형광펜 치는 것"과 같은 역할.

```
Light  배경: #F5E8F4   좌측 바: #C890C8   텍스트: #4A1850
Dark   배경: #2C1A30   좌측 바: #9060A8   텍스트: #E8D0EC
```

```md
> 📌 **Remember**: `position: absolute`는 가장 가까운 `position: relative` 부모를 기준으로 배치된다.
> 부모에 `relative`가 없으면 `<body>`가 기준이 된다.
```

**사용 시점**
- 규칙, 공식, 기본값처럼 외워야 하는 내용
- 매번 검색하게 되는 반복 포인트
- 시험이나 코딩테스트에서 자주 나오는 것

---

### 학습용 Callout 전체 요약

| 아이콘 | 유형 | 좌측 바 색상 (Light) | 배경 (Light) | 한 줄 설명 |
|---|---|---|---|---|
| 💡 | Concept | `#BCA4EC` (violet-300) | `#F4F0FC` | 핵심 개념 정의 |
| ⚠️ | Caution | `#8464C8` (violet-500) | `#F0EAF8` | 자주 하는 실수 경고 |
| ✅ | Best Practice | `#6070C0` | `#EAEef8` | 실무 권장 패턴 |
| 🧪 | Practice | `#A080DC` (violet-400) | `#EDE8FA` | 따라해볼 실습 |
| 🔗 | Official Docs | `#7080C8` | `#E8EDF8` | 공식 문서 링크 |
| 📌 | Remember | `#C890C8` | `#F5E8F4` | 암기 포인트 |

### Callout 사용 빈도 가이드

한 문서에서 각 유형의 권장 사용 횟수:

| 유형 | 권장 횟수 |
|---|---|
| 💡 Concept | 1–2개 (핵심만) |
| ⚠️ Caution | 1–3개 |
| ✅ Best Practice | 1–2개 |
| 🧪 Practice | 0–1개 (챕터 단위) |
| 🔗 Official Docs | 1개 (문서 하단) |
| 📌 Remember | 2–4개 |

- 같은 유형을 3개 이상 연속으로 배치하지 않는다
- Callout이 본문보다 많은 문서는 구조를 다시 검토한다
