# 02. Site Map

## URL 구조 개요

> 아래 URL 구조는 `src/data/navigation.js` 기준 실제 운영 구조다(2026-08 개편 — 카테고리 taxonomy를 [01-information-architecture.md](01-information-architecture.md)와 함께 실제 구현 기준으로 정리했다).

```
/                             ← Home (대시보드)
/search                       ← 전체 검색

/html/                        ← HTML 목차 (독립 카테고리, 하위 섹션 없이 flat)

/css/                         ← CSS 목차
/css/css                      ← 7개 단원(기본 문법~반응형 웹)이 모두 이 폴더 하나에 있다

/devtools-layout/             ← DevTools & Layout 목차
/devtools-layout/devtools
/devtools-layout/layout

/javascript/                  ← JavaScript 목차
/javascript/basics
/javascript/functions
/javascript/arrays-objects
/javascript/dom
/javascript/es6
/javascript/async

/typescript/                  ← TypeScript 목차
/typescript/basics
/typescript/react-typescript
/typescript/patterns

/react/                       ← React 목차
/react/basics
/react/core
/react/hooks
/react/state-management
/react/routing

/dev-tools/                   ← Git & GitHub 목차 (카테고리 slug는 dev-tools 유지, 표시명은 "Git & GitHub")
/dev-tools/git
/dev-tools/github

/web-network/                 ← Web & Network 목차 (하위 섹션 없이 flat)

/http/                        ← HTTP 목차 (독립 카테고리, 하위 섹션 없이 flat)

/jquery/                      ← jQuery 목차 (독립 카테고리, 하위 섹션 없이 flat)

/regular-expression/          ← Regular Expression 목차 (독립 카테고리, 문서 1개)

/firebase/                    ← Firebase 목차 (독립 카테고리)
/firebase/basics
/firebase/services
/firebase/deployment
/firebase/appendix

/css-framework/               ← CSS Framework 목차 (하위 섹션 없이 flat)

/testing/                     ← Testing 목차 (하위 섹션 없이 flat)

/build-tools/                 ← Build Tools 목차 (하위 섹션 없이 flat, 초기 기획에는 없던 카테고리)

/coding-test/                 ← Coding Test 목차
/coding-test/intro
/coding-test/arrays
/coding-test/string-math
/coding-test/problem-solving

/ai-vibe-coding/              ← AI & Vibe Coding 목차
/ai-vibe-coding/setup
/ai-vibe-coding/lesson-1
/ai-vibe-coding/lesson-2
/ai-vibe-coding/lesson-3
/ai-vibe-coding/lesson-4
```

---

## 페이지 유형

### 1. Home `/`
전체 섹션을 카드 그리드로 보여주는 대시보드.
각 카드는 섹션 이름, 이모지, 하위 목차 수를 표시한다.

### 2. 섹션 목차 `/섹션/`
해당 섹션의 하위 문서 목록을 보여주는 인덱스 페이지.
`content/섹션/index.md`를 렌더링한다.

### 3. 문서 페이지 `/섹션/토픽`
MD 파일 한 개를 렌더링하는 콘텐츠 페이지.
좌측 사이드바에 섹션 내 문서 목록을 표시한다.

### 4. 검색 `/search`
문서 제목과 본문 내용을 기준으로 전체 문서를 검색한다. placeholder와 안내 문구도 제목/내용 중심으로 표시하며, 태그는 검색 UI 안내에서 강조하지 않는다.

---

## 파일-URL 대응 규칙

| 파일 경로 | URL |
|---|---|
| `content/html/html/1-3-html-document-structure.md` | `/html/html/1-3-html-document-structure` |
| `content/css/css/1-1-css-syntax-and-apply.md` | `/css/css/1-1-css-syntax-and-apply` |
| `content/javascript/basics/1-2-variables-and-scope.md` | `/javascript/basics/1-2-variables-and-scope` |
| `content/ai-vibe-coding/lesson-1/1-1-web-basics.md` | `/ai-vibe-coding/lesson-1/1-1-web-basics` |

- `index.md` → 섹션 목차 페이지 (`/섹션/토픽`)
- 일반 `.md` 파일 → 개별 문서 페이지 (`/섹션/토픽/파일명`)

---

## 네비게이션 구조

### 글로벌 네비게이션 (상단)
- 로고 (Home 링크)
- 검색 아이콘

### 사이드 네비게이션 (문서 페이지 좌측)
현재 섹션의 하위 문서 목록을 트리 형태로 표시.
현재 문서는 활성화(active) 표시.

```
🖍 CSS
  ├ 1. CSS 기본 문법   ← 현재 위치 표시
  ├ 2. 선택자 심화
  ├ 3. Flexbox
  ├ 4. Grid
  ├ 5. 위치와 변형
  ├ 6. 전환과 애니메이션
  └ 7. 반응형 웹
```

### 이전 / 다음 (문서 페이지 하단)
같은 섹션 내에서 이전 문서, 다음 문서로 이동하는 링크.

---

## 라우팅 구현 방식

React Router v6 기준.

```
/                         → <HomePage />
/search                   → <SearchPage />
/:category                → <CategoryPage />       ← 섹션 목차
/:category/:section       → <SectionPage />        ← 하위 섹션 목차
/:category/:section/:doc  → <DocPage />            ← 개별 문서
```

MD 파일은 빌드 타임 또는 런타임에 `import.meta.glob`으로 불러와 파싱한다.

```js
// 예시: content 하위 모든 md 파일 수집
const modules = import.meta.glob('/content/**/*.md', { as: 'raw' });
```
