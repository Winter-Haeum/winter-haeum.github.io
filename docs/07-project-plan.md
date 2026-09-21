# 07. Project Plan

> Winter Dev Archive 최종 기획 문서.  
> 이 문서는 프로젝트의 헌법이다. 설계, 개발, 운영의 모든 판단은 이 문서를 기준으로 한다.

**참조 문서**  
`01-information-architecture` · `02-site-map` · `03-content-structure` · `04-color-palette` · `05-design-system` · `06-reference-analysis`

---

## 프로젝트 개요

| 항목 | 내용 |
|---|---|
| **프로젝트명** | Winter Dev Archive |
| **유형** | 개인 학습 아카이브 사이트 |
| **제작자** | Winter (겨울하음) |
| **목적** | 프론트엔드 및 AI 바이브 코딩 학습 내용을 주제별로 정리하고 언제든 참고할 수 있게 한다 |
| **기술 스택** | React + Vite + MUI + react-markdown |
| **콘텐츠 형식** | Markdown 파일 (프론트매터 기반) |
| **배포 환경** | GitHub Pages |

---

## 프로젝트 목표

### 기능적 목표

1. 학습한 내용을 **주제별**로 정리하여 빠르게 재참조할 수 있는 사이트를 만든다
2. Markdown 파일을 콘텐츠 소스로 사용해 **글쓰기와 개발이 분리**된 구조를 만든다
3. 프론트매터 기반 검색으로 **원하는 문서를 즉시 찾을 수 있게** 한다
4. **문서 상태(Draft/In Progress/Review/Completed)** 로 학습 진도를 추적한다

### 경험적 목표

1. 처음 방문해도 어디서 시작할지 즉시 알 수 있는 **명확한 탐색 구조**
2. 10번 이상 방문해도 지치지 않는 **눈이 편안한 색감**
3. "내 노트를 꺼내본다"는 느낌의 **개인 아카이브 정체성**

---

## 핵심 가치

| 우선순위 | 가치 | 의미 |
|---|---|---|
| 1 | **학습 효율** | 콘텐츠를 빠르게 찾고 집중해서 읽을 수 있어야 한다 |
| 2 | **일관성** | 같은 요소는 항상 같은 방식으로 보인다. 예측 가능한 구조 |
| 3 | **지속 가능성** | 오래 관리할 수 있는 단순한 구조와 명확한 운영 규칙 |
| 4 | **정체성** | Winter만의 다꾸 감성과 보라 잉크 컨셉이 사이트 전체에 일관되게 흐른다 |

> **콘텐츠보다 디자인이 앞서지 않는다.**  
> 디자인이 아무리 아름다워도 내용을 찾기 어렵거나 읽기 불편하면 실패한 사이트다.

---

## 타겟 사용자

### 1순위 — 본인 (Winter)

- 프론트엔드를 학습하며 정리한 내용을 나중에 다시 찾아보는 용도
- 개념이 헷갈릴 때 Google 대신 여기서 먼저 찾는다
- 새로운 프로젝트 시작 전 빠르게 개념을 복기한다

### 2순위 — 같은 학습 과정을 밟는 사람

- 프론트엔드를 배우기 시작한 사람
- 강사님 강의를 듣거나 비슷한 커리큘럼을 따르는 사람
- 정제된 학습 노트가 필요한 사람

### 타겟이 아닌 사람

- 최신 트렌드를 빠르게 소비하려는 사람 → 기술 블로그를 찾아야 한다
- 깊은 심화 내용을 찾는 시니어 개발자 → 공식 문서가 더 적합하다

---

## 프로젝트 범위

### 포함

- 17개 카테고리, 각 카테고리별 섹션 문서(정보 구조 요약 참고)
- Markdown 기반 콘텐츠 렌더링
- 제목/내용 기반 검색 (search UI 안내는 태그를 강조하지 않음 — [정보 구조 요약](#정보-구조-요약) 및 아래 참고)
- 문서 상태 표시 (Draft / In Progress / Review / Completed)
- 라이트 모드 / 다크 모드
- 반응형 (모바일 대응)
- 6가지 학습용 Callout 유형
- 사이드바 accordion 탐색
- 방문자 수 카운터 (Supabase 기반, Header 노출)
- 댓글(Giscus, GitHub Discussions 기반) — 챕터별 스레드 분리, 다크모드 연동
- GitHub Actions 기반 자동 빌드·배포 (main push 시 GitHub Pages로 자동 배포)

### 제외 (v1 기준)

- 좋아요 / 팔로우 등 소셜 피드형 기능 (댓글 자체는 위 "포함" 항목으로 구현됨)
- 사용자 계정 / 로그인
- 진도 저장 / 학습 기록 서버
- 다국어 지원

---

## 정보 구조 요약

`01-information-architecture.md` 기준. 총 17개 카테고리(2026-08 개편 — 초기 기획 당시 13개에서, jQuery/Regular Expression/HTTP/Build Tools 분리와 Database & Backend 제거를 거쳐 실제 운영 중인 개수로 갱신했다. 상세 내역은 `01-information-architecture.md` 참고).

```
🏠 Home
📄 HTML
🖍 CSS                    (1. 기본 문법 · 2. 선택자 심화 · 3. Flexbox · 4. Grid · 5. 위치와 변형 · 6. 전환과 애니메이션 · 7. 반응형 웹)
🔍 DevTools & Layout      (DevTools · Layout)
💛 JavaScript             (1. 기본 문법 · 2. 함수·배열·객체 · 3. DOM · 4. ES6+ 심화 문법 · 5. 비동기·모듈·저장소)
🔷 TypeScript             (TypeScript 기본 · React + TypeScript · TypeScript 실전 패턴)
⚛ React                  (Basics · Core · Hooks · State Management · Routing)
🐙 Git & GitHub           (Git 기본 · GitHub 연결과 협업 기본 · Git 프로젝트 관리 문서 · GitHub 중급)
🌐 Web & Network          (웹 서비스 종류 · 프론트엔드와 백엔드 · API의 세계)
📡 HTTP                   (HTTP 통신의 기초 · Fetch API와 JSON · CORS)
💠 jQuery                 (jQuery의 역할과 역사 · jQuery 핵심 기능 및 기본 효과)
🔎 Regular Expression
🔥 Firebase               (Firebase 기본 · 주요 서비스 · 배포 · 부록. Database & Backend에서 분리, Supabase는 문서 없어 미노출)
🎨 CSS Framework          (프레임워크 개념 · Component vs Utility · Bootstrap · TailwindCSS)
🧪 Testing                (TDD · Jest · 컴포넌트 테스트)
📦 Build Tools            (번들러 이해 · 번들러 설정 · 빌드와 배포. 초기 기획에는 없던 카테고리)
🏆 Coding Test
🤖 AI & Vibe Coding       (Setup · Lesson 1 · Lesson 2 · Lesson 3 · Lesson 4)
🔍 Search
```

**탐색 구조**: 상단 GNB(대단원) + 좌측 Accordion 사이드바(소단원) + 본문 — 강사님 교안 사이트 구조 계승

---

## 콘텐츠 운영 방식

### 파일 구조

`03-content-structure.md` 기준.

```
content/
└── 카테고리/
    └── 섹션/
        ├── index.md        ← 섹션 목차 + 소개
        └── 문서명.md       ← 개별 문서
```

### 프론트매터 표준

모든 MD 파일은 다음 프론트매터를 포함한다. `date`는 v1에서 필수로 요구하지 않는다(2026-08 개편 — `wda-document-policy.md`의 "date frontmatter는 넣지 않는다" 기준과 통일. 상세 근거는 `03-content-structure.md` 프론트매터 스펙 참고).

```yaml
---
title: "문서 제목"
status: "draft"   # draft | in-progress | review | completed
description: "문서 내용에 맞는 한 줄 설명"
category: "카테고리 슬러그"
section: "섹션 슬러그"
tags: ["태그1", "태그2"]
---
```

### 문서 작성 흐름

```
학습 → MD 파일 작성 (status: draft)
     → 내용 정리 (status: in-progress)
     → 복습 및 보완 (status: review)
     → 완료 (status: completed)
```

### 콘텐츠 업데이트 원칙

- 새 학습 내용은 기존 문서에 추가하거나 새 파일로 생성한다
- 이미 작성된 문서는 삭제하지 않고 개정한다
- 문서 정렬·순서는 `date`가 아니라 `navigation.js`의 등록 순서와 파일 경로 기준으로 관리한다

---

## 디자인 방향

`04-color-palette.md` · `05-design-system.md` · `06-reference-analysis.md` 기준.

### 컨셉

> **"크림 노트에 보라 잉크로 필기한 디지털 참고서"**

### 색상 시스템 핵심

| 역할 | Light Mode | Dark Mode |
|---|---|---|
| 페이지 배경 | `#FAF8F5` cream-50 | `#1C182C` 딥 퍼플 잉크 |
| 카드 배경 | `#F2EDE6` cream-100 | `#24203A` |
| 기본 포인트 | `#8464C8` violet-500 | `#B39EDD` |
| 본문 텍스트 | `#2C2840` ink-900 | `#F0EBE3` 크림화이트 |

### 폰트

| 용도 | 폰트 |
|---|---|
| 본문 / UI | Pretendard |
| 코드 | JetBrains Mono |

### 디자인 3원칙

1. **읽기 좋은 것이 우선** — 장시간 읽어도 피로하지 않은 가독성
2. **찾기 쉬운 것이 우선** — 탐색 동선과 정보 계층이 직관적
3. **일관성이 신뢰를 만든다** — 같은 요소는 항상 같은 모습

### 레퍼런스 계승

| 계승 요소 | 출처 |
|---|---|
| GNB + Accordion 사이드바 구조 | 강사님 교안 사이트 |
| 크림화이트 배경 · 색온도 통일 | Yan Liu Portfolio |
| 다꾸 감성 · 보라 잉크 정체성 | Winter 본인 |

### 캐릭터 (겨울하음) 사용 원칙

캐릭터는 콘텐츠보다 앞서지 않는다. **보조 역할**만 수행한다.

- **사용 위치**: Home · Empty State · 학습 완료 화면 · 404 · About
- **사용 금지**: 본문 · 코드블록 · 사이드바 · 카드 목록 · 헤더/푸터
- **노출 빈도**: 한 세션 최대 2회

---

## 기술 스택

| 분류 | 기술 | 선택 이유 |
|---|---|---|
| 프레임워크 | React 18 | 컴포넌트 기반, 기존 학습 스택과 일치 |
| 빌드 도구 | Vite | 빠른 개발 서버, 기존 템플릿 활용 |
| UI 라이브러리 | MUI v6 | 디자인 시스템 토큰, 반응형, 접근성 |
| MD 파싱 | react-markdown | MD 파일을 React 컴포넌트로 렌더링 |
| 프론트매터 파싱 | gray-matter | MD 파일 메타데이터 추출 |
| 라우팅 | React Router v6 | SPA 멀티 페이지 탐색 |
| 코드 하이라이팅 | rehype-highlight | 코드 블록 신택스 컬러링 |
| 배포 | GitHub Pages | 정적 사이트 무료 배포 |

### MD 파일 수집 방식

```js
// Vite glob import로 빌드 타임에 모든 MD 파일 수집
const modules = import.meta.glob('/content/**/*.md', { as: 'raw' });
```

---

## 폴더 구조

```
winter-dev-archive/
├── docs/                          ← 기획 문서 (이 파일 포함)
│   ├── 01-information-architecture.md
│   ├── 02-site-map.md
│   ├── 03-content-structure.md
│   ├── 04-color-palette.md
│   ├── 05-design-system.md
│   ├── 06-reference-analysis.md
│   └── 07-project-plan.md
│
├── content/                       ← 학습 콘텐츠 MD 파일 (실제 카테고리 폴더는 03-content-structure.md 참고)
│   ├── html/
│   ├── css/
│   ├── devtools-layout/
│   ├── javascript/
│   ├── typescript/
│   ├── react/
│   ├── dev-tools/                 ← Git & GitHub
│   ├── web-network/
│   ├── http/
│   ├── jquery/
│   ├── regular-expression/
│   ├── firebase/
│   ├── css-framework/
│   ├── testing/
│   ├── build-tools/
│   ├── coding-test/
│   └── ai-vibe-coding/
│
└── src/                           ← React 소스
    ├── components/
    │   ├── common/                ← Header, Sidebar, Footer
    │   ├── ui/                    ← Card, Button, Tag, Callout
    │   └── markdown/              ← MD 렌더러, 코드블록
    ├── pages/                     ← Home, CategoryPage, DocPage, SearchPage
    ├── hooks/                     ← useSearch, useTheme, useSidebar
    ├── utils/                     ← MD 파싱, 프론트매터 처리
    ├── theme.js                   ← MUI 테마 (light/dark)
    ├── App.jsx
    └── main.jsx
```

---

## 개발 원칙

### 코드 품질

- 컴포넌트는 단일 책임 원칙을 따른다 — 하나의 파일에 하나의 컴포넌트
- MUI `sx` prop으로 스타일링, 별도 CSS 파일은 최소화
- 디자인 토큰은 `theme.js`에서 중앙 관리 — 하드코딩 금지
- Grid는 반드시 `size={{ xs: 12, md: 6 }}` 형태 사용

### 성능

- 이미지 없는 텍스트 중심 구성으로 번들 크기 최소화
- 코드 블록 하이라이팅은 lazy load 고려
- MD 파일은 빌드 타임에 처리

### 접근성

- 모든 인터랙티브 요소 키보드 접근 가능
- 이모지에 `aria-hidden="true"` 처리
- 색상 대비 WCAG AA 기준 준수
- Focus visible 스타일 항상 표시

### 반응형

- 모바일(`< 768px`): 사이드바 Drawer 전환, 터치 영역 44px 이상
- 태블릿(`768px–1023px`): 사이드바 숨김
- 데스크톱(`≥ 1024px`): 사이드바 고정 280px

---

## 콘텐츠 작성 원칙

`03-content-structure.md` · `05-design-system.md` 기준.

### 구조 규칙

- H1은 문서당 하나, 프론트매터 `title`과 동일하게
- H4 이하 사용 금지
- 본문 최대 너비 `65ch` — 한 줄이 너무 길지 않게
- 코드 블록에는 언어 반드시 명시

### Callout 사용 규칙

| 아이콘 | 유형 | 사용 시점 |
|---|---|---|
| 💡 | Concept | 핵심 개념 정의 (문서당 1–2개) |
| ⚠️ | Caution | 자주 하는 실수 (1–3개) |
| ✅ | Best Practice | 실무 권장 패턴 (1–2개) |
| 🧪 | Practice | 따라해볼 실습 (0–1개) |
| 🔗 | Official Docs | 공식 문서 링크 (1개, 하단) |
| 📌 | Remember | 암기 포인트 (2–4개) |

### 금지 사항

- 본문에 이모지 삽입 금지
- 제목에 이모지 삽입 금지
- 같은 Callout 유형 3개 이상 연속 배치 금지
- Callout이 본문보다 많은 문서 금지

---

## 향후 확장 계획

### Phase 2 (콘텐츠 확충 후)

- **관련 문서 링크** — 문서 하단에 "관련 문서" 섹션 자동 생성
- **태그 탐색 페이지** — 프론트매터 tags 기반 태그 클라우드 / 목록
- **문서 TOC** — 긴 문서에서 H2/H3를 우측에 목차로 표시

### Phase 3 (장기)

- **학습 통계** — status별 문서 수, 카테고리별 완료율 시각화
- **북마크** — 자주 참조하는 문서 로컬 저장
- **인쇄 모드** — 문서를 PDF로 출력하기 좋은 CSS

### 확장 금지 항목 (정체성 유지)

- 좋아요 / 팔로우 등 소셜 피드형 기능 — 댓글(Giscus)은 조용한 보조 기능으로 이미 구현했지만, 그 이상의 소셜 기능은 확장하지 않는다(→ [wda-document-policy.md > 부가 기능(방문자 수 / 댓글) 정책](wda-document-policy.md#부가-기능방문자-수--댓글-정책-★))
- 광고 / 애드센스 — 개인 학습 노트에 광고는 어울리지 않는다
- 다른 사람이 콘텐츠를 올리는 구조 — 이건 Winter의 아카이브다

---

## 완료 기준

### v1.0 출시 기준

다음 항목이 모두 충족되면 v1.0으로 본다.

- [ ] 전체 17개 카테고리 페이지 구성 완료
- [ ] 각 카테고리당 최소 1개 이상 문서 존재
- [ ] AI & Vibe Coding 섹션 (Setup + Lesson 1–4) 전체 문서 완료
- [ ] 검색 기능 동작
- [ ] 라이트 모드 / 다크 모드 전환
- [ ] 반응형 (모바일 Drawer) 동작
- [ ] 문서 상태 태그 표시
- [ ] GitHub Pages 배포 완료

### 품질 기준

- 빈 페이지 없음 (모든 URL이 콘텐츠를 가짐)
- 코드 블록 언어 라벨 전체 적용
- 모든 문서 프론트매터 완비
- 404 페이지 구현

---

## 유지보수 원칙

### 콘텐츠 유지보수

- 새 학습 내용 추가 시 관련 섹션에 MD 파일 생성
- 기존 내용이 구식이 되었을 때는 삭제가 아닌 개정
- `status: completed` 문서도 정기 복습 후 내용 점검

### 구조 유지보수

- 새 카테고리 추가는 `01-information-architecture.md` 업데이트 후 진행
- 컴포넌트 변경은 `05-design-system.md` 업데이트와 함께
- 컬러 토큰 변경은 `04-color-palette.md` 업데이트 후 `theme.js` 반영

### 금지 사항

- 즉흥적인 UI 컬러 변경 — 팔레트 문서 밖의 색상 임의 사용 금지
- 문서 구조 없이 페이지 추가 — IA 문서 반영 후 개발
- 기획 문서와 실제 구현 불일치 방치 — 구현 변경 시 반드시 문서 동기화

---

## 최종 한 문장 정의

> **Winter Dev Archive는 날짜가 아닌 주제로 찾아보는, 크림 노트에 보라 잉크로 필기한 프론트엔드 학습 아카이브다.**

---

## 프로젝트 선언문

Winter Dev Archive는 기술 블로그가 아니다.  
이 사이트는 한 사람이 프론트엔드를 배우며 쌓아온 지식을 두고두고 꺼내볼 수 있도록 만든 **디지털 참고서**다.

날짜 순으로 읽는 것이 아니라, 필요할 때 주제를 찾아보는 방식으로 설계되었다.  
HTML이 다시 헷갈릴 때, Flexbox 속성이 기억나지 않을 때, async/await의 작동 방식이 모호해질 때 — Google이 아닌 여기서 먼저 찾는다.

구조는 명확하다. 정보 계층이 직관적이어서 처음 방문해도 길을 잃지 않는다.  
색은 차분하다. 크림화이트 위에 더스티 바이올렛 잉크가 스며들듯, 오래 봐도 눈이 피로하지 않다.  
감성은 따뜻하다. 겨울하음 캐릭터는 학습의 특별한 순간에만 조용히 등장해 응원한다.

이 사이트는 화려함을 택하지 않는다. 학습 효율이 최우선이다.  
디자인이 콘텐츠보다 앞서는 순간, 이 사이트는 목적을 잃는다.

Winter Dev Archive는 Winter가 만들었고, Winter를 위한 곳이다.  
하지만 같은 길을 걷는 누군가에게도 도움이 된다면, 그것으로 충분하다.
