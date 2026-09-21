# Learning Content Directory Structure

## 목적

수십~수백 개로 증가할 학습 문서를 체계적으로 관리하기 위한 디렉토리 구조 설계 문서.
`navigation.js`의 카테고리·섹션 구조와 완전히 일치하며, `markdownLoader.js`가 요구하는
`/content/{category}/{section}/{slug}.md` 경로 규칙을 그대로 따른다.

---

## 전제: 역할 분리

| 디렉토리 | 역할 |
| --- | --- |
| `content/` | **학습 문서 전용** — navigation.js 카테고리 구조와 1:1 매핑 |
| `docs/` | 프로젝트 설계 문서 (IA, 사이트맵, 색상 팔레트 등) |
| `development/` | 개발 진행 기록 (stage review, plan 등) |

> `docs/`에 임시 저장된 학습 문서(ex. `08-dev-environment-setup.md`)는
> `content/` 하위 올바른 경로로 이동해야 한다. 하단 **마이그레이션 안내** 참고.

---

## 전체 디렉토리 구조

```
content/
│
├── _templates/                          # 템플릿 (markdownLoader 수집 제외)
│   ├── document.md                      # 일반 문서 템플릿
│   └── section-index.md                 # 섹션 index 템플릿
│
├── frontend/                            # 📚 Frontend Fundamentals
│   ├── html/
│   │   ├── index.md
│   │   ├── semantic-elements.md
│   │   └── forms-and-input.md
│   ├── css/
│   │   ├── index.md
│   │   ├── box-model.md
│   │   └── selectors.md
│   ├── layout/
│   │   ├── index.md
│   │   ├── flexbox.md
│   │   └── grid.md
│   └── devtools/
│       ├── index.md
│       └── debugging.md
│
├── javascript/                          # 💛 JavaScript
│   ├── basics/
│   │   ├── index.md
│   │   ├── variables.md
│   │   └── data-types.md
│   ├── functions/
│   │   ├── index.md
│   │   └── arrow-functions.md
│   ├── arrays-and-objects/              # "Arrays & Objects"
│   │   ├── index.md
│   │   └── array-methods.md
│   ├── dom/
│   │   ├── index.md
│   │   └── event-handling.md
│   ├── es6-plus/                        # "ES6+"
│   │   ├── index.md
│   │   ├── destructuring.md
│   │   └── modules.md
│   ├── async/
│   │   ├── index.md
│   │   ├── promise.md
│   │   └── async-await.md
│   ├── browser-apis/                    # "Browser APIs"
│   │   ├── index.md
│   │   └── fetch-api.md
│   ├── jquery/
│   │   ├── index.md
│   │   └── selectors.md
│   └── regular-expression/              # "Regular Expression"
│       ├── index.md
│       └── patterns.md
│
├── typescript/                          # 🔷 TypeScript
│   ├── basics/
│   │   ├── index.md
│   │   └── types.md
│   └── react-typescript/                # "React + TypeScript"
│       ├── index.md
│       └── component-typing.md
│
├── react/                               # ⚛ React
│   ├── basics/
│   │   ├── index.md
│   │   └── jsx.md
│   ├── core/
│   │   ├── index.md
│   │   └── components.md
│   ├── hooks/
│   │   ├── index.md
│   │   ├── use-state.md
│   │   └── use-effect.md
│   ├── state-management/                # "State Management"
│   │   ├── index.md
│   │   └── context-api.md
│   └── routing/
│       ├── index.md
│       └── react-router.md
│
├── dev-tools/                           # 🛠 Development Tools
│   ├── git/
│   │   ├── index.md
│   │   └── basic-commands.md
│   ├── github/
│   │   ├── index.md
│   │   └── pull-request.md
│   ├── webpack/
│   │   ├── index.md
│   │   └── config.md
│   └── vite/
│       ├── index.md
│       └── setup.md
│
├── web-network/                         # 🌐 Web & Network
│   ├── http/
│   │   ├── index.md
│   │   └── methods.md
│   ├── fetch/
│   │   ├── index.md
│   │   └── api-call.md
│   ├── cors/
│   │   ├── index.md
│   │   └── policy.md
│   ├── api/
│   │   ├── index.md
│   │   └── rest.md
│   └── saas/
│       ├── index.md
│       └── overview.md
│
├── database/                            # 🗄 Database & Backend
│   ├── firebase/
│   │   ├── index.md
│   │   └── firestore.md
│   └── supabase/
│       ├── index.md
│       └── auth.md
│
├── css-framework/                       # 🎨 CSS Framework
│   ├── bootstrap/
│   │   ├── index.md
│   │   └── grid-system.md
│   └── tailwind/
│       ├── index.md
│       └── utility-classes.md
│
├── testing/                             # 🧪 Testing
│   └── tdd/
│       ├── index.md
│       └── test-cycle.md
│
├── coding-test/                         # 🏆 Coding Test
│   ├── intro-and-strategy/              # "Intro & Strategy"
│   │   ├── index.md
│   │   └── problem-approach.md
│   ├── array-methods/                   # "Array Methods"
│   │   ├── index.md
│   │   └── map-filter-reduce.md
│   ├── string-and-math/                 # "String & Math"
│   │   ├── index.md
│   │   └── string-methods.md
│   └── problem-solving/                 # "Problem Solving"
│       ├── index.md
│       └── two-pointer.md
│
└── ai-vibe-coding/                      # 🤖 AI & Vibe Coding
    ├── setup/
    │   ├── index.md
    │   ├── step-1-env.md                # ← 이미 존재
    │   └── step-2-settings.md           # ← 이미 존재
    ├── lesson-1/                        # "Lesson 1"
    │   ├── index.md
    │   └── claude-code-basics.md
    ├── lesson-2/                        # "Lesson 2"
    │   └── index.md
    ├── lesson-3/                        # "Lesson 3"
    │   └── index.md
    └── lesson-4/                        # "Lesson 4"
        └── index.md
```

---

## 섹션 슬러그 매핑

`navigation.js`의 `sections` 배열 이름 → 실제 폴더명 대응표.

| 카테고리 | navigation.js 섹션 이름 | 폴더명 (슬러그) |
| --- | --- | --- |
| frontend | HTML | `html` |
| frontend | CSS | `css` |
| frontend | Layout | `layout` |
| frontend | DevTools | `devtools` |
| javascript | Basics | `basics` |
| javascript | Functions | `functions` |
| javascript | Arrays & Objects | `arrays-and-objects` |
| javascript | DOM | `dom` |
| javascript | ES6+ | `es6-plus` |
| javascript | Async | `async` |
| javascript | Browser APIs | `browser-apis` |
| javascript | jQuery | `jquery` |
| javascript | Regular Expression | `regular-expression` |
| typescript | Basics | `basics` |
| typescript | React + TypeScript | `react-typescript` |
| react | Basics | `basics` |
| react | Core | `core` |
| react | Hooks | `hooks` |
| react | State Management | `state-management` |
| react | Routing | `routing` |
| dev-tools | Git | `git` |
| dev-tools | GitHub | `github` |
| dev-tools | Webpack | `webpack` |
| dev-tools | Vite | `vite` |
| web-network | HTTP | `http` |
| web-network | Fetch | `fetch` |
| web-network | CORS | `cors` |
| web-network | API | `api` |
| web-network | SaaS | `saas` |
| database | Firebase | `firebase` |
| database | Supabase | `supabase` |
| css-framework | Bootstrap | `bootstrap` |
| css-framework | Tailwind | `tailwind` |
| testing | TDD | `tdd` |
| coding-test | Intro & Strategy | `intro-and-strategy` |
| coding-test | Array Methods | `array-methods` |
| coding-test | String & Math | `string-and-math` |
| coding-test | Problem Solving | `problem-solving` |
| ai-vibe-coding | Setup | `setup` |
| ai-vibe-coding | Lesson 1 | `lesson-1` |
| ai-vibe-coding | Lesson 2 | `lesson-2` |
| ai-vibe-coding | Lesson 3 | `lesson-3` |
| ai-vibe-coding | Lesson 4 | `lesson-4` |

### 슬러그 변환 규칙

```
1. 소문자로 변환
2. 공백 → 하이픈(-)
3. & → and
4. + → 생략 후 단어 연결  (React + TypeScript → react-typescript)
5. 특수문자 제거          (ES6+ → es6-plus)
```

---

## 예시 문서 경로

```
# 수업 내용 학습 문서 (가장 많이 생성될 유형)
content/ai-vibe-coding/setup/dev-environment-setup.md
content/ai-vibe-coding/lesson-1/claude-code-basics.md

# JavaScript 개념 문서
content/javascript/async/promise.md
content/javascript/es6-plus/destructuring.md

# React 개념 문서
content/react/hooks/use-state.md
content/react/state-management/context-api.md

# 코딩 테스트 풀이 문서
content/coding-test/array-methods/map-filter-reduce.md
content/coding-test/problem-solving/two-pointer.md

# 섹션 인덱스 (섹션 소개 페이지)
content/react/hooks/index.md
content/javascript/async/index.md
```

---

## 파일명 규칙

```
# 형식
{주제를-설명하는-키워드}.md

# 예시
dev-environment-setup.md    ← 개발 환경 구축
use-state.md                ← useState 훅
promise-basics.md           ← Promise 기초
two-pointer.md              ← 투 포인터 알고리즘

# 금지
01-useState.md              ← 앞에 번호 붙이지 않음 (docs/ 스타일 사용 금지)
useState.md                 ← 대문자 사용 금지
use_state.md                ← 언더스코어 사용 금지
```

---

## frontmatter 형식

모든 문서는 파일 최상단에 아래 형식의 frontmatter를 포함해야 한다.
`markdownLoader.js`의 검색 인덱스가 이 필드들을 사용한다.

```yaml
---
title: "문서 제목"
category: "ai-vibe-coding"      # navigation.js의 id 값
section: "setup"                 # 폴더명과 동일한 슬러그
tags: ["claude-code", "node"]
date: "2026-06-05"
status: "draft"                  # draft | completed
description: "한 줄 설명"
---
```

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| `title` | ✅ | 문서 제목 (검색 및 목록 표시에 사용) |
| `category` | ✅ | `navigation.js`의 `id` 값과 동일 |
| `section` | ✅ | 폴더명(슬러그)과 동일 |
| `tags` | ✅ | 검색 키워드 배열 |
| `date` | ✅ | 작성일 `YYYY-MM-DD` |
| `status` | ✅ | `draft` (작성 중) 또는 `completed` (완료) |
| `description` | ✅ | 검색 결과 미리보기에 표시되는 한 줄 설명 |

---

## 기존 docs/ 문서 마이그레이션 안내

`docs/` 폴더에 임시 저장된 학습 문서는 `content/`로 이동 후 frontmatter를 추가해야 한다.

| 현재 위치 | 이동 위치 |
| --- | --- |
| `docs/08-dev-environment-setup.md` | `content/ai-vibe-coding/setup/dev-environment-setup.md` |

이동 시 처리 사항:
1. 파일을 올바른 `content/` 경로로 이동
2. 파일 최상단에 frontmatter 추가
3. `docs/` 원본 파일 삭제 (중복 방지)

---

## 새 문서 작성 체크리스트

```
□ content/{category}/{section}/ 폴더가 존재하는가?
□ 파일명이 kebab-case 소문자인가?
□ frontmatter 7개 필드가 모두 작성되었는가?
□ category 값이 navigation.js id와 일치하는가?
□ section 값이 폴더명(슬러그)과 일치하는가?
□ 섹션에 index.md가 없다면 함께 생성했는가?
```
