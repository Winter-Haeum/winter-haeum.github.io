# 01. Information Architecture

## 프로젝트 개요

**Winter Dev Archive**는 프론트엔드와 AI 바이브 코딩 학습 내용을 두고두고 참고하는 사이트다.
기술 블로그(날짜 기반)가 아닌 참고서(주제 기반)로 설계한다.

- **목적**: 학습한 내용을 주제별로 정리하고 빠르게 다시 찾아볼 수 있도록 한다
- **대상**: 본인(Winter) 및 같은 학습 과정을 밟는 사람
- **핵심 가치**: 검색 가능성, 일관된 구조, 빠른 탐색

---

## IA 전체 구조

> 아래 트리는 `src/data/navigation.js` 기준 실제 운영 구조다(2026-08 개편 — 초기 기획 당시의 "Frontend Fundamentals" 상위 그룹, JavaScript 하위 jQuery/Regular Expression, Development Tools 하위 Webpack/Vite 구조를 실제 구현 기준으로 정리했다). 카테고리 추가·이름 변경 시 이 파일과 `navigation.js`를 함께 업데이트한다.

```
🏠 Home

📄 HTML
 (하위 섹션 없이 6개 문서 flat 구성)

🖍 CSS
 ├ 1. CSS 기본 문법
 ├ 2. 선택자 심화
 ├ 3. Flexbox
 ├ 4. Grid
 ├ 5. 위치와 변형
 ├ 6. 전환과 애니메이션
 └ 7. 반응형 웹

🔍 DevTools & Layout
 ├ DevTools
 └ Layout

💛 JavaScript
 ├ 1. JavaScript 기본 문법
 ├ 2. 함수 · 배열 · 객체
 ├ 3. DOM
 ├ 4. ES6+ 심화 문법
 └ 5. 비동기 · 모듈 · 저장소

🔷 TypeScript
 ├ TypeScript 기본
 ├ React + TypeScript
 └ TypeScript 실전 패턴

⚛ React
 ├ Basics
 ├ Core
 ├ Hooks
 ├ State Management
 └ Routing

🐙 Git & GitHub
 ├ Git 기본
 ├ GitHub 연결과 협업 기본
 ├ Git 프로젝트 관리 문서
 └ GitHub 중급

🌐 Web & Network
 (하위 섹션 없이 3개 문서 flat 구성 — 웹 서비스 종류 · 프론트엔드/백엔드 · API)

📡 HTTP
 (하위 섹션 없이 3개 문서 flat 구성 — HTTP 통신 기초 · Fetch API/JSON · CORS)

💠 jQuery
 (하위 섹션 없이 2개 문서 flat 구성)

🔎 Regular Expression
 (하위 섹션 없이 1개 문서)

🔥 Firebase
 ├ Firebase 기본
 ├ Firebase 주요 서비스
 ├ Firebase 배포
 └ 부록

🎨 CSS Framework
 (하위 섹션 없이 4개 문서 flat 구성 — 프레임워크 개념 · Component vs Utility · Bootstrap · TailwindCSS)

🧪 Testing
 (하위 섹션 없이 3개 문서 flat 구성 — TDD · Jest · 컴포넌트 테스트)

📦 Build Tools
 (하위 섹션 없이 3개 문서 flat 구성 — 번들러 이해 · 번들러 설정 · 빌드와 배포)

🏆 Coding Test

🤖 AI & Vibe Coding
 ├ Setup
 ├ Lesson 1
 ├ Lesson 2
 ├ Lesson 3
 └ Lesson 4

🔍 Search
```

---

## 섹션별 정의

### 🏠 Home
전체 목차를 카드 형태로 보여주는 대시보드 페이지.
각 섹션으로 진입하는 출발점이다.

---

### 📄 HTML
웹 문서의 뼈대를 이루는 마크업 언어. 독립 카테고리로 운영한다(하위 섹션 없이 문서 6개를 순서대로 노출).

| 내용 |
|---|
| 월드 와이드 웹과 인터넷, 클라이언트/서버/HTTP, 문서 기본 구조, 태그·속성·요소, 시맨틱 마크업, 실전 태그 활용 |

---

### 🖍 CSS
웹페이지를 꾸미는 스타일 언어. 독립 카테고리로 운영한다.

| 섹션 | 포함 내용 |
|---|---|
| 1. CSS 기본 문법 | 문법과 적용, 선택자, 색상/폰트, 박스 모델, Display/Position |
| 2. 선택자 심화 | 속성 선택자, 가상 클래스, 가상 요소 |
| 3. Flexbox | 개념, Container/Item 속성, 레이아웃 패턴 |
| 4. Grid | 구조, 행/열 배치, 고급 레이아웃 |
| 5. 위치와 변형 | Position, Transform, z-index |
| 6. 전환과 애니메이션 | Transition, Animation, Hover 효과 |
| 7. 반응형 웹 | Media Query, 기기별 최적화, 반응형 기법 |

---

### 🔍 DevTools & Layout
브라우저 개발자 도구 활용과 레이아웃 분석. 독립 카테고리로 운영한다(초기 기획의 Frontend Fundamentals > Layout/DevTools를 이 카테고리로 통합).

| 섹션 | 포함 내용 |
|---|---|
| DevTools | 브라우저 개발자 도구 활용, 반응형 미리보기 |
| Layout | 실전 웹페이지 구조 분석, 블록 단위 사고법 |

---

### 💛 JavaScript
브라우저와 Node.js 환경에서 동작하는 프로그래밍 언어. 가장 많은 문서가 있는 섹션. jQuery/Regular Expression은 이 카테고리에 속하지 않고 각각 독립 카테고리로 운영한다.

| 섹션 | 포함 내용 |
|---|---|
| 1. JavaScript 기본 문법 | 실행환경, 변수/스코프, 데이터 타입, 연산자, 조건문/반복문 |
| 2. 함수 · 배열 · 객체 | 함수 선언, 배열/객체, 고차 함수 |
| 3. DOM | DOM 개념, 요소 생성/조작, 이벤트 처리 |
| 4. ES6+ 심화 문법 | 구조분해, 스프레드, 스코프 체인/클로저, this, 클래스 |
| 5. 비동기 · 모듈 · 저장소 | Promise, async/await, 모듈, 에러 핸들링, localStorage, JSON, Date |

---

### 🔷 TypeScript
JavaScript에 정적 타입을 추가한 언어. JavaScript 섹션과 React 섹션 사이의 연결 고리.

| 섹션 | 포함 내용 |
|---|---|
| TypeScript 기본 | 타입 기초, 왜 사용하는가, 기본 타입, 타입 별칭/인터페이스, 타입 단언 |
| React + TypeScript | 프로젝트 시작, Props/State 타입, 이벤트 핸들러 타입 |
| TypeScript 실전 패턴 | 제네릭 재사용 컴포넌트, 커스텀 훅 타입 |

---

### ⚛ React
UI를 만드는 JavaScript 라이브러리.

| 섹션 | 포함 내용 |
|---|---|
| Basics | Node.js/npm, 가상 DOM, JSX, 컴포넌트, props, state |
| Core | 이벤트 처리, 폼 입력, 조건부 렌더링, 리스트 렌더링 |
| Hooks | useState, useEffect, useRef, useContext, useReducer |
| State Management | Context API, 전역 상태 라이브러리 (Zustand 등) |
| Routing | SPA 개념, React Router |

---

### 🐙 Git & GitHub
버전 관리와 협업의 기본기. 카테고리명은 초기 기획의 "Development Tools"에서 실제 다루는 주제(Git/GitHub)를 그대로 반영해 변경했다. 번들러 주제는 별도 [Build Tools](#-build-tools) 카테고리에서 다룬다.

| 섹션 | 포함 내용 |
|---|---|
| Git 기본 | Git이 필요한 이유, Git 구조, CLI 명령어 |
| GitHub 연결과 협업 기본 | 계정 생성, 로컬 연결, commit/push/pull, branch |
| Git 프로젝트 관리 문서 | gitignore, README, Markdown 문법 |
| GitHub 중급 | 브랜치 전략, 협업, Preview 프로젝트 관리 |

---

### 🌐 Web & Network
웹 서비스의 종류와 SaaS 개념부터 프론트엔드·백엔드 역할, API까지 웹 생태계의 기본 구조. 독립 카테고리로 운영하며 하위 섹션 없이 문서 3개를 flat 구성으로 노출한다. HTTP/Fetch/CORS는 이 카테고리가 아니라 [HTTP](#-http) 카테고리에서 다룬다.

| 내용 |
|---|
| 웹 서비스의 종류, 프론트엔드와 백엔드, API의 세계 |

---

### 📡 HTTP
HTTP 요청/응답 구조, Fetch API와 JSON, CORS. 독립 카테고리로 운영한다(초기 기획에서는 Web & Network 하위였다).

| 내용 |
|---|
| HTTP 통신의 기초, Fetch API와 JSON, CORS 알아보기 |

---

### 💠 jQuery
jQuery 등장 배경과 핵심 기능. 독립 카테고리로 운영한다(초기 기획에서는 JavaScript 하위였다).

| 내용 |
|---|
| jQuery의 역할과 역사, jQuery 핵심 기능 및 기본 효과 |

---

### 🔎 Regular Expression
정규표현식 문법과 활용. 독립 카테고리로 운영한다(초기 기획에서는 JavaScript 하위였다).

| 내용 |
|---|
| 정규표현식 |

---

### 🔥 Firebase
Google이 제공하는 BaaS 플랫폼. 독립 카테고리로 운영한다(2026-08 개편 — 실제 문서 없는 Database & Backend > Supabase 빈 목차 항목을 제거하면서, Firebase를 상위 카테고리에서 분리해 독립 카테고리로 승격했다).

| 섹션 | 포함 내용 |
|---|---|
| Firebase 기본 | 서버리스 아키텍처, 서비스 둘러보기 |
| Firebase 주요 서비스 | Firestore, Authentication, Storage, Hosting |
| Firebase 배포 | 배포 개념, Firebase Hosting 배포, 다양한 배포 서비스 비교 |
| 부록 | React Portal, Zustand, API 연동(fetch & axios) |

> Supabase는 현재 콘텐츠가 없어 카테고리로 노출하지 않는다. 향후 실제 문서가 작성되면 별도 카테고리로 추가한다.

---

### 🎨 CSS Framework
CSS를 빠르게 작성할 수 있도록 도와주는 프레임워크. 하위 섹션 없이 문서 4개를 flat 구성으로 노출한다.

| 내용 |
|---|
| CSS 프레임워크란 무엇인가, Component based vs Utility first, Bootstrap 소개, TailwindCSS 실전 활용 |

---

### 🧪 Testing
코드의 동작을 검증하는 방법. 하위 섹션 없이 문서 3개를 flat 구성으로 노출한다.

| 내용 |
|---|
| TDD가 뭔가요, Jest 시작하기, 간단한 컴포넌트 테스트 작성하기 |

---

### 📦 Build Tools
번들러가 필요한 이유부터 entry·output·loader·plugin 개념, 개발용/배포용 빌드 차이까지 다룬다. 초기 기획에는 없던 카테고리로, Development Tools 하위 "Webpack · Vite" 계획이 실제로는 특정 도구가 아닌 번들러 개념 중심의 독립 카테고리로 구현됐다. 하위 섹션 없이 문서 3개를 flat 구성으로 노출한다.

| 내용 |
|---|
| 번들러 이해하기, 번들러 설정하기, 빌드와 배포 |

---

### 🏆 Coding Test
알고리즘 문제 풀이 방법과 연습.

| 섹션 | 포함 내용 |
|---|---|
| (최상위) | 코딩테스트 개요, 플랫폼 소개, 문제 풀이 전략 |
| | 배열 메서드, 문자열 메서드, Math 객체 |
| | 프로그래머스 Level 0–1 풀이 기록 |

---

### 🤖 AI & Vibe Coding
Claude Code와 AI를 활용한 실전 프로젝트 제작 커리큘럼.

| 섹션 | 포함 내용 |
|---|---|
| Setup | 개발환경 구축, 통합 세팅, GitHub 백업, Claude Code 사용량 관리 |
| Lesson 1 | 웹/UI-UX 기본, UI 요소 실습, Flexbox, 컬러 팔레트, 포트폴리오 기초 |
| Lesson 2 | Supabase MCP, DB 개념, 회원가입/게시글/상세 페이지, DB 연동 |
| Lesson 3 | 웹/앱 차이, 모바일 UI 기획, SNS DB 설계, 미니 SNS 구현 |
| Lesson 4 | 포트폴리오 레퍼런스, About Me, Hero 섹션, 완성 및 배포, 도메인 연결 |

---

## IA 설계 원칙

1. **주제 기반** — 날짜나 작성 순서가 아닌 내용으로 분류한다
2. **2단계 깊이 유지** — 카테고리 > 섹션으로 탐색이 단순해야 한다
3. **섹션 간 중복 최소화** — TypeScript는 Git & GitHub가 아닌 독립 카테고리, 웹 서비스 종류/SaaS 개념은 Web & Network에 위치
4. **AI & Vibe Coding은 독립 커리큘럼** — 단순 목록이 아닌 레슨 단위 구조를 유지한다
