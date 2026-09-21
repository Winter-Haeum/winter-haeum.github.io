# 03. Content Structure

## 디렉토리 구조

> 아래 트리는 실제 카테고리(최상위 폴더) 구조 기준이다(2026-08 개편 — `src/data/navigation.js`/[01-information-architecture.md](01-information-architecture.md)와 함께 정리). 각 카테고리 하위 파일명은 실제 파일명 예시가 아니라 구조를 보여주기 위한 예시다 — 실제 파일명은 해당 카테고리의 기존 문서를 따른다.

```
content/
├── html/                     ← 독립 카테고리, 하위 섹션 없이 flat
│   ├── index.md
│   ├── html-basics.md
│   ├── semantic-markup.md
│   └── html-tags.md
│
├── css/
│   └── css/                  ← 7개 단원이 모두 이 폴더 하나에 있다
│       ├── index.md
│       ├── css-basics.md
│       ├── box-model.md
│       ├── flexbox.md
│       ├── grid.md
│       ├── animation.md
│       └── responsive.md
│
├── devtools-layout/          ← "DevTools & Layout" 카테고리
│   ├── devtools/
│   │   ├── index.md
│   │   └── devtools-basics.md
│   └── layout/
│       ├── index.md
│       └── layout-thinking.md
│
├── javascript/                ← jQuery/Regular Expression은 포함하지 않음(각각 독립 카테고리)
│   ├── basics/
│   │   ├── index.md
│   │   ├── variables-scope.md
│   │   ├── data-types.md
│   │   └── control-flow.md
│   ├── functions/
│   ├── arrays-objects/
│   ├── dom/
│   ├── es6/
│   └── async/
│
├── typescript/
│   ├── basics/
│   ├── react-typescript/
│   └── patterns/
│
├── react/
│   ├── basics/
│   ├── core/
│   ├── hooks/
│   ├── state-management/
│   └── routing/
│
├── dev-tools/                ← 카테고리 표시명은 "Git & GitHub" (Webpack/Vite는 build-tools로 분리)
│   ├── git/
│   └── github/
│
├── web-network/              ← 하위 섹션 없이 flat (HTTP/Fetch/CORS는 http/로 분리)
│
├── http/                     ← 독립 카테고리, 하위 섹션 없이 flat
│
├── jquery/                   ← 독립 카테고리, 하위 섹션 없이 flat
│
├── regular-expression/       ← 독립 카테고리, 문서 1개
│
├── firebase/                 ← 독립 카테고리
│   ├── basics/
│   ├── services/
│   ├── deployment/
│   └── appendix/
│
├── css-framework/            ← 하위 섹션 없이 flat
│
├── testing/                  ← 하위 섹션 없이 flat
│
├── build-tools/              ← 하위 섹션 없이 flat (초기 기획에는 없던 카테고리)
│
├── coding-test/
│   ├── intro/
│   ├── arrays/
│   ├── string-math/
│   └── problem-solving/
│
└── ai-vibe-coding/
    ├── setup/
    │   ├── index.md
    │   ├── step-1-env.md
    │   ├── step-2-settings.md
    │   ├── step-3-github.md
    │   ├── step-4-check.md
    │   └── step-5-claude-code.md
    ├── lesson-1/
    │   ├── index.md
    │   ├── 1-1-web-uiux.md
    │   ├── 1-2-ui-elements.md
    │   ├── 1-3-boxmodel-flexbox.md
    │   ├── 1-4-color-palette.md
    │   └── 1-5-portfolio.md
    ├── lesson-2/
    │   ├── index.md
    │   ├── 2-1-supabase-mcp.md
    │   ├── 2-2-db-concepts.md
    │   ├── 2-3-register-page.md
    │   ├── 2-4-post-list.md
    │   ├── 2-5-post-detail.md
    │   └── 2-6-db-connection.md
    ├── lesson-3/
    │   ├── index.md
    │   ├── 3-1-web-app-diff.md
    │   ├── 3-2-mobile-ui.md
    │   ├── 3-3-sns-db.md
    │   ├── 3-4-mini-sns.md
    │   └── 3-5-projects-tab.md
    └── lesson-4/
        ├── index.md
        ├── 4-1-portfolio-reference.md
        ├── 4-2-about-me.md
        ├── 4-3-hero-section.md
        ├── 4-4-portfolio-complete.md
        ├── 4-5-domain.md
        └── 4-6-deploy-strategy.md
```

---

## 프론트매터 스펙

모든 MD 파일은 파일 상단에 다음 프론트매터를 포함한다(2026-08 개편 — `date` 필드는 v1에서 필수로 요구하지 않는다. 문서 정렬·라우팅은 `navigation.js`의 등록 순서와 파일 경로를 기준으로 관리하며, `date`는 향후 메타데이터 확장 후보로만 둔다. `wda-document-policy.md`의 "date frontmatter는 넣지 않는다" 기준과 통일했다).

```yaml
---
title: "문서 제목"
status: "completed"
description: "문서 내용에 맞는 한 줄 설명"
category: "카테고리 슬러그"
section: "섹션 슬러그"
tags: ["태그1", "태그2"]
---
```

### 필드 정의

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `title` | string | ✅ | 문서 제목. 사이드바와 검색 결과에 표시됨 |
| `status` | string | ✅ | 문서 상태 (`draft` / `in-progress` / `review` / `completed`) |
| `description` | string | ✅ | 검색 결과·카드에 표시되는 한 줄 설명 |
| `category` | string | ✅ | 최상위 카테고리 슬러그 (예: `html`, `javascript`) |
| `section` | string | ✅ | 하위 섹션 슬러그 (예: `css`, `basics`) |
| `tags` | string[] | 권장 | 검색 인덱스에 사용. 모든 문서에 필수는 아니며, 없어도 오류로 보지 않는다 |
| `date` | string | ❌ | 필수 아님. 넣지 않는 것을 기본으로 한다(위 안내 참고) |

### 카테고리 슬러그 목록

| 카테고리 | 슬러그 |
|---|---|
| HTML | `html` |
| CSS | `css` |
| DevTools & Layout | `devtools-layout` |
| JavaScript | `javascript` |
| TypeScript | `typescript` |
| React | `react` |
| Git & GitHub | `dev-tools` |
| Web & Network | `web-network` |
| HTTP | `http` |
| jQuery | `jquery` |
| Regular Expression | `regular-expression` |
| Firebase | `firebase` |
| CSS Framework | `css-framework` |
| Testing | `testing` |
| Build Tools | `build-tools` |
| Coding Test | `coding-test` |
| AI & Vibe Coding | `ai-vibe-coding` |

---

## 파일 네이밍 규칙

- **소문자 + 하이픈(kebab-case)** 사용
- 의미 있는 이름으로 작성 (번호 접두사는 순서가 중요한 경우만)
- 섹션 진입점은 항상 `index.md`

```
✅ css-basics.md
✅ box-model.md
✅ 1-1-web-uiux.md        ← Lesson 내부처럼 순서가 중요한 경우
❌ CSS Basics.md
❌ cssBasics.md
❌ doc1.md
```

---

## 문서 작성 규칙

### 헤더 구조

```md
# 제목 (H1)             ← 문서당 하나만. 프론트매터 title과 동일하게
## 대주제 (H2)
### 소주제 (H3)
```

- H1은 문서 최상단에 한 번만 작성한다
- H4 이하는 사용하지 않는다

### 코드 블록

언어를 반드시 명시한다.

````md
```html
<div class="container">
```

```css
.container { display: flex; }
```

```js
const name = 'winter';
```

```jsx
function App() { return <div />; }
```
````

### 내용 구성 권장 순서

```
## 개요
한 줄 요약 + 왜 이것을 배우는지

## 핵심 개념
이론 설명

## 예제
코드 블록 + 설명

## 주의사항 (선택)
자주 틀리거나 헷갈리는 포인트

## 참고
관련 문서 링크
```

---

## index.md 작성 규칙

각 섹션 폴더의 `index.md`는 하위 문서 목록을 직접 명시한다.

```md
---
title: "CSS"
status: "completed"
description: "선택자, 박스 모델, Flexbox, Grid, 반응형까지 CSS 전 범위"
category: "css"
section: "css"
tags: ["css", "styling"]
---

# CSS

CSS는 HTML 요소에 스타일을 적용하는 언어다.

## 문서 목록

- [CSS 기초 문법](./css-basics)
- [박스 모델](./box-model)
- [Flexbox](./flexbox)
- [Grid](./grid)
- [Animation & Transition](./animation)
- [반응형 디자인](./responsive)
```

---

## 예시 문서

```md
---
title: "Flexbox 완전 이해"
status: "completed"
description: "Container와 Item, 주요 속성까지 Flexbox 핵심 정리"
category: "css"
section: "css"
tags: ["css", "flexbox", "layout"]
---

# Flexbox 완전 이해

## 개요

Flexbox는 1차원(행 또는 열) 레이아웃을 위한 CSS 기술이다.
요소를 정렬하고 공간을 분배할 때 가장 많이 사용한다.

## 핵심 개념

### Container와 Item

Flexbox는 **컨테이너**와 **아이템** 두 역할로 나뉜다.

```css
.container {
  display: flex;          /* flex 컨테이너 활성화 */
  flex-direction: row;    /* 기본값: 가로 방향 */
  justify-content: center;
  align-items: center;
}
```

### 주요 속성

| 속성 | 대상 | 설명 |
|---|---|---|
| `flex-direction` | container | 주축 방향 설정 |
| `justify-content` | container | 주축 정렬 |
| `align-items` | container | 교차축 정렬 |
| `flex` | item | flex-grow, shrink, basis 단축 |

## 예제

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```

```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}
```

## 참고

- [CSS Grid](./grid)
- [반응형 디자인](./responsive)
```
