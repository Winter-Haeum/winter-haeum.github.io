/**
 * Winter Dev Archive IA 기반 카테고리 데이터
 * 01-information-architecture.md 기준
 *
 * ai-vibe-coding(비공개 AI 교안) 카테고리는 이 배열이 아니라 파일 하단의
 * _aiVibeCodingCategory에 별도로 선언되어 있다. 공개 배포 빌드
 * (VITE_PUBLIC_BUILD=true)에서 그 객체 리터럴 자체가 번들에서 트리셰이킹되도록
 * 하기 위해서다 — 이 배열 안에 함께 두면 런타임 filter()로 화면에서는 숨겨져도
 * 카테고리명·섹션명·26개 문서 제목 같은 메타데이터 문자열은 여전히 빌드 산출물에
 * 그대로 남는다(확인됨).
 */
const _publicCategories = [
  {
    id: 'html',
    name: 'HTML',
    emoji: '📄',
    slug: 'html',
    description: '웹 문서의 뼈대를 이루는 마크업 언어. 웹의 동작 원리부터 시맨틱 태그 활용까지 HTML의 기본기를 다집니다.',
    // 하위 섹션이 1개뿐이라 중간 섹션 없이 문서를 바로 노출한다 (coding-test와 동일한 flat 패턴).
    // sections 각 항목이 실제로는 문서 1개씩을 가리키며, sectionLinks로 바로 문서 경로에 연결한다.
    sections: [
      '1-1: 월드 와이드 웹과 인터넷',
      '1-2: 클라이언트와 서버, 그리고 HTTP',
      '1-3: HTML 문서의 기본 구조',
      '1-4: 태그·속성·요소 이해하기',
      '1-5: 의미를 담는 시맨틱 마크업',
      '1-6: 실전 HTML 태그 활용',
    ],
    sectionLinks: {
      '1-1: 월드 와이드 웹과 인터넷': '/html/html/1-1-www-and-website',
      '1-2: 클라이언트와 서버, 그리고 HTTP': '/html/html/1-2-client-server-http',
      '1-3: HTML 문서의 기본 구조': '/html/html/1-3-html-document-structure',
      '1-4: 태그·속성·요소 이해하기': '/html/html/1-4-tags-attributes-elements',
      '1-5: 의미를 담는 시맨틱 마크업': '/html/html/1-5-semantic-markup',
      '1-6: 실전 HTML 태그 활용': '/html/html/1-6-html-tags-in-practice',
    },
    sectionDocs: {
      '1-1: 월드 와이드 웹과 인터넷': [{ slug: '1-1-www-and-website', title: '1-1: 월드 와이드 웹과 인터넷', folder: 'html' }],
      '1-2: 클라이언트와 서버, 그리고 HTTP': [{ slug: '1-2-client-server-http', title: '1-2: 클라이언트와 서버, 그리고 HTTP', folder: 'html' }],
      '1-3: HTML 문서의 기본 구조': [{ slug: '1-3-html-document-structure', title: '1-3: HTML 문서의 기본 구조', folder: 'html' }],
      '1-4: 태그·속성·요소 이해하기': [{ slug: '1-4-tags-attributes-elements', title: '1-4: 태그·속성·요소 이해하기', folder: 'html' }],
      '1-5: 의미를 담는 시맨틱 마크업': [{ slug: '1-5-semantic-markup', title: '1-5: 의미를 담는 시맨틱 마크업', folder: 'html' }],
      '1-6: 실전 HTML 태그 활용': [{ slug: '1-6-html-tags-in-practice', title: '1-6: 실전 HTML 태그 활용', folder: 'html' }],
    },
  },
  {
    id: 'css',
    name: 'CSS',
    emoji: '🖍',
    slug: 'css',
    description: '웹페이지를 꾸미는 스타일 언어. 선택자와 박스 모델 같은 기본기부터 Flexbox·Grid 레이아웃, 반응형 웹까지 CSS 전 범위를 다룹니다.',
    nestedSidebar: true,
    // 섹션명 앞에 번호를 붙여 slugify 결과를 고유하게 만든다 (JavaScript 카테고리와 동일한 패턴).
    // 순수 한글 섹션명만 있으면 slugify()가 전부 빈 문자열을 반환해 아코디언 상태 키가
    // 충돌하고, 여러 섹션이 동시에 펼쳐지는 문제가 발생한다.
    sections: [
      '1. CSS 기본 문법',
      '2. 선택자 심화',
      '3. Flexbox',
      '4. Grid',
      '5. 위치와 변형',
      '6. 전환과 애니메이션',
      '7. 반응형 웹',
    ],
    sectionDocs: {
      '1. CSS 기본 문법': [
        { slug: '1-1-css-syntax-and-apply', title: '1-1 CSS 문법과 적용 방법', folder: 'css' },
        { slug: '1-2-css-selectors', title: '1-2 선택자로 원하는 요소 골라내기', folder: 'css' },
        { slug: '1-3-colors-and-fonts', title: '1-3 색상과 폰트로 개성 표현하기', folder: 'css' },
        { slug: '1-4-box-model', title: '1-4 박스 모델 완벽 이해', folder: 'css' },
        { slug: '1-5-display-and-position', title: '1-5 Display와 Position으로 배치하기', folder: 'css' },
      ],
      '2. 선택자 심화': [
        { slug: '2-1-attribute-selectors', title: '2-1 속성 선택자로 정교하게 선택하기', folder: 'css' },
        { slug: '2-2-pseudo-classes', title: '2-2 가상 클래스로 상태 다루기', folder: 'css' },
        { slug: '2-3-pseudo-elements', title: '2-3 가상 요소로 꾸미기 요소 추가하기', folder: 'css' },
      ],
      '3. Flexbox': [
        { slug: '3-1-flexbox-concept', title: '3-1 Flexbox 개념 이해하기', folder: 'css' },
        { slug: '3-2-flex-container-and-items', title: '3-2 Container와 Item 속성 활용하기', folder: 'css' },
        { slug: '3-3-flexbox-layouts', title: '3-3 Flexbox로 다양한 레이아웃 만들기', folder: 'css' },
      ],
      '4. Grid': [
        { slug: '4-1-grid-structure', title: '4-1 Grid 구조 이해하기', folder: 'css' },
        { slug: '4-2-grid-rows-and-columns', title: '4-2 행과 열로 자유롭게 배치하기', folder: 'css' },
        { slug: '4-3-advanced-grid-layouts', title: '4-3 Grid 고급 레이아웃들', folder: 'css' },
      ],
      '5. 위치와 변형': [
        { slug: '5-1-position-layout', title: '5-1 Position으로 요소 배치하기', folder: 'css' },
        { slug: '5-2-transform-effects', title: '5-2 Transform으로 변형 효과주기', folder: 'css' },
        { slug: '5-3-z-index-stacking', title: '5-3 z-index와 쌓임 순서 이해하기', folder: 'css' },
      ],
      '6. 전환과 애니메이션': [
        { slug: '6-1-transition-effects', title: '6-1 Transition으로 부드러운 전환 효과', folder: 'css' },
        { slug: '6-2-animation-keyframes', title: '6-2 Animation과 @keyframes로 움직임 표현하기', folder: 'css' },
        { slug: '6-3-hover-effects', title: '6-3 Hover 효과로 생동감 더하기', folder: 'css' },
      ],
      '7. 반응형 웹': [
        { slug: '7-1-media-query', title: '7-1 Media Query로 화면 크기 대응하기', folder: 'css' },
        { slug: '7-2-device-optimization', title: '7-2 다양한 기기에 최적화하기', folder: 'css' },
        { slug: '7-3-responsive-techniques', title: '7-3 반응형 기법 익히기', folder: 'css' },
      ],
    },
  },
  {
    id: 'devtools-layout',
    name: 'DevTools & Layout',
    emoji: '🔍',
    slug: 'devtools-layout',
    description: '브라우저 개발자 도구로 화면을 뜯어보고, 레이아웃을 블록 단위로 분석하는 실전 감각을 기릅니다.',
    nestedSidebar: true,
    sections: ['DevTools', 'Layout'],
    sectionDocs: {
      DevTools: [
        { slug: '1-1-inspect-website-with-devtools', title: '1-1 DevTools로 웹사이트 들여다보기', folder: 'devtools' },
        { slug: '1-2-responsive-preview', title: '1-2 반응형 화면 미리보기', folder: 'devtools' },
      ],
      Layout: [
        { slug: '2-1-analyze-webpage-structure', title: '2-1 실전 웹페이지 구조 분석하기', folder: 'layout' },
        { slug: '2-2-think-in-blocks', title: '2-2 블록으로 나누어 생각하기', folder: 'layout' },
      ],
    },
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    emoji: '💛',
    slug: 'javascript',
    description: '웹을 동적으로 만드는 핵심 언어. 변수와 함수부터 DOM 조작, ES6+ 문법, 비동기 처리까지 자바스크립트의 전 범위를 다룹니다.',
    nestedSidebar: true,
    // 큰 단원 5개로 정리 (2026-07 개편). sectionDocs 항목의 `folder`는
    // 실제 파일이 위치한 content/javascript/{folder}/ 를 가리킨다.
    // (표시용 단원명과 실제 폴더명이 다를 수 있어 folder로 라우팅한다.)
    sections: [
      '1. JavaScript 기본 문법',
      '2. 함수 · 배열 · 객체',
      '3. DOM',
      '4. ES6+ 심화 문법',
      '5. 비동기 · 모듈 · 저장소',
    ],
    sectionDocs: {
      '1. JavaScript 기본 문법': [
        { slug: '1-1-js-execution-environment', title: '1-1 JavaScript 실행환경 이해하기', folder: 'basics' },
        { slug: '1-2-variables-and-scope', title: '1-2 변수와 스코프 다루기', folder: 'basics' },
        { slug: '1-3-data-types', title: '1-3 데이터 타입', folder: 'basics' },
        { slug: '1-4-operators', title: '1-4 연산자 알아보기', folder: 'basics' },
        { slug: '1-5-control-flow', title: '1-5 조건문과 반복문으로 흐름 제어하기', folder: 'basics' },
        { slug: 'appendix-type-conversion-short-circuit', title: '📝 부록: 타입 변환과 단축 평가', folder: 'basics' },
      ],
      '2. 함수 · 배열 · 객체': [
        { slug: '2-1-functions', title: '2-1 함수 선언하고 호출하기', folder: 'functions' },
        { slug: '2-2-arrays', title: '2-2 배열로 여러 데이터 관람하기', folder: 'arrays-objects' },
        { slug: '2-3-objects', title: '2-3 객체로 데이터 구조화하기', folder: 'arrays-objects' },
        { slug: '2-4-higher-order-array-methods', title: '2-4 고차 함수로 배열 다루기', folder: 'arrays-objects' },
        { slug: 'appendix-this-binding-array-creation', title: '📝 부록: call/apply/bind · 배열 생성', folder: 'arrays-objects' },
        { slug: 'appendix-array-creation-methods', title: '📝 부록: 배열 생성의 모든 것(new Array, of, from 완벽 가이드)', folder: 'arrays-objects' },
        { slug: 'appendix-higher-order-array-practice', title: '📝 부록: 고차 함수로 배열 다루기 - 실습 12문', folder: 'arrays-objects' },
      ],
      '3. DOM': [
        { slug: '3-1-dom-basics', title: '3-1 DOM이란 무엇인가요?', folder: 'dom' },
        { slug: '3-2-create-and-manipulate-elements', title: '3-2 요소를 생성하고 조작하기', folder: 'dom' },
        { slug: '3-3-event-handling-and-interaction', title: '3-3 이벤트 처리로 인터랙션 만들기', folder: 'dom' },
      ],
      '4. ES6+ 심화 문법': [
        { slug: '4-1-es6-modern-syntax', title: '4-1 ES6 + 최신 문법 알아보기', folder: 'es6' },
        { slug: '4-2-arrow-destructuring-spread', title: '4-2 화살표 함수, 구조분해, 스프레드', folder: 'es6' },
        { slug: '4-3-scope-chain-and-closures', title: '4-3 스코프 체인과 클로저 이해하기', folder: 'es6' },
        { slug: '4-4-this-binding', title: '4-4 this 바인딩 파헤치기', folder: 'es6' },
        { slug: 'appendix-constructor-functions', title: '📝 부록: 생성자 함수의 모든 것', folder: 'es6' },
        { slug: 'appendix-class-basics', title: '📝 부록: 클래스 다루기', folder: 'es6' },
      ],
      '5. 비동기 · 모듈 · 저장소': [
        { slug: '5-1-async-programming-basics', title: '5-1 비동기 프로그래밍 시작하기', folder: 'async' },
        { slug: '5-2-promise-async-await', title: '5-2 Promise와 async/await', folder: 'async' },
        { slug: '5-3-modules-import-export', title: '5-3 모듈로 코드 나누기', folder: 'async' },
        { slug: '5-4-error-handling', title: '5-4 에러 핸들링하기', folder: 'async' },
        { slug: '5-5-web-storage', title: '5-5 로컬 스토리지로 데이터 저장하기', folder: 'async' },
        { slug: 'appendix-json-data-handling', title: '📝 부록: JSON 데이터 다루기', folder: 'async' },
        { slug: 'appendix-date-object', title: '📝 부록: Date 객체의 모든 것', folder: 'async' },
      ],
    },
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    emoji: '🔷',
    slug: 'typescript',
    description: 'JavaScript에 정적 타입을 더한 언어. 타입 시스템의 기초부터 React와의 통합, 실전 패턴까지 더 안전하고 예측 가능한 코드를 작성합니다.',
    nestedSidebar: true,
    sections: ['TypeScript 기본', 'React + TypeScript', 'TypeScript 실전 패턴'],
    sectionDocs: {
      'TypeScript 기본': [
        { slug: '1-1-what-is-typescript', title: '1-1 TypeScript가 뭔가요?', folder: 'basics' },
        { slug: '1-2-why-use-typescript', title: '1-2 왜 TypeScript를 사용할까?', folder: 'basics' },
        { slug: '1-3-basic-types', title: '1-3 기본 타입 익히기', folder: 'basics' },
        { slug: '1-4-type-alias-and-interface', title: '1-4 타입 별칭과 인터페이스', folder: 'basics' },
        { slug: '1-5-type-assertion', title: '1-5 타입 단언 알아보기', folder: 'basics' },
      ],
      'React + TypeScript': [
        { slug: '2-1-react-typescript-project', title: '2-1 React + TypeScript 프로젝트 시작하기', folder: 'react-typescript' },
        { slug: '2-2-props-types', title: '2-2 Props 타입 정의하기', folder: 'react-typescript' },
        { slug: '2-3-state-types', title: '2-3 State 타입 정의하기', folder: 'react-typescript' },
        { slug: '2-4-event-handler-types', title: '2-4 이벤트 핸들러 타입 지정하기', folder: 'react-typescript' },
      ],
      'TypeScript 실전 패턴': [
        { slug: '3-1-generic-reusable-component', title: '3-1 제네릭으로 재사용 컴포넌트 만들기', folder: 'patterns' },
        { slug: '3-2-custom-hook-types', title: '3-2 커스텀 훅에 타입 적용하기', folder: 'patterns' },
      ],
    },
  },
  {
    id: 'react',
    name: 'React',
    emoji: '⚛',
    slug: 'react',
    description: '현대 프론트엔드의 핵심 라이브러리. 컴포넌트 설계, Hooks, 상태 관리, 라우팅까지 React의 모든 개념을 체계적으로 정리합니다.',
    nestedSidebar: true,
    sections: ['Basics', 'Core', 'Hooks', 'State Management', 'Routing'],
    sectionDocs: {
      'Basics': [
        { slug: '1-1-node-npm', title: '1-1 Node.js와 npm 이해하기' },
        { slug: '1-2-node-install', title: '1-2 Node.js 설치하기' },
        { slug: '1-3-npm-package-management', title: '1-3 npm으로 패키지 관리하기' },
        { slug: '1-4-react-introduction', title: '1-4 React가 뭔가요?' },
        { slug: '1-5-virtual-dom', title: '1-5 가상 DOM의 개념' },
        { slug: 'appendix-performance-tab', title: '💻 실습: Performance 탭 분석하기' },
        { slug: '1-6-react-project-setup', title: '1-6 React 프로젝트 제대로 이해하기' },
      ],
      'Core': [
        { slug: '2-1-jsx-syntax', title: '2-1 JSX 문법 익히기' },
        { slug: '2-2-components', title: '2-2 컴포넌트 만들기' },
        { slug: '2-3-props', title: '2-3 props로 데이터 전달하기' },
        { slug: '2-4-state', title: '2-4 state로 상태 관리하기' },
        { slug: 'practice-state-training', title: '💻 실습: state 활용 훈련 1~8' },
        { slug: '2-5-event-handling', title: '2-5 이벤트 처리하기' },
        { slug: 'practice-event-training-1', title: '💻 실습: 이벤트 처리 훈련 1~4' },
        { slug: '2-6-form-handling', title: '2-6 폼 입력 다루기' },
        { slug: 'practice-form-training-1', title: '💻 실습: 폼 입력 훈련 1~4' },
        { slug: '2-7-conditional-rendering', title: '2-7 조건부 렌더링' },
        { slug: 'practice-conditional-rendering-training-1', title: '💻 실습: 조건부 렌더링 훈련 1~3' },
        { slug: '2-8-list-rendering', title: '2-8 리스트 렌더링' },
        { slug: 'practice-list-rendering-training-1', title: '💻 실습: 리스트 렌더링 훈련 1~2' },
      ],
      'Hooks': [
        { slug: '3-1-usestate', title: '3-1 useState로 상태 관리하기' },
        { slug: '3-2-useeffect', title: '3-2 useEffect로 사이드 이펙트 처리하기' },
        { slug: '3-3-useref', title: '3-3 useRef 사용하기' },
        { slug: '3-4-custom-hooks', title: '3-4 Custom Hooks 만들기' },
        { slug: 'appendix-react-lifecycle', title: '(부록) 리액트 라이프사이클' },
        { slug: 'appendix-hooks-recap', title: '(부록) React Hooks 돌아보기' },
      ],
      'State Management': [
        { slug: '4-1-usecontext', title: '4-1 useContext로 전역 상태 다루기' },
        { slug: '4-2-usereducer', title: '4-2 useReducer로 복잡한 상태 로직 관리하기' },
        { slug: '4-3-state-management-libraries', title: '4-3 전역 상태 관리 라이브러리' },
      ],
      'Routing': [
        { slug: '5-1-spa-and-routing', title: '5-1 SPA와 라우팅' },
      ],
    },
  },
  {
    id: 'dev-tools',
    name: 'Git & GitHub',
    emoji: '🐙',
    slug: 'dev-tools',
    description: '버전 관리와 협업의 기본기. Git의 구조와 CLI 명령어부터 GitHub 연결, commit·push·pull, branch 워크플로우, 프로젝트 관리 문서까지 다룹니다.',
    nestedSidebar: true,
    sections: ['Git 기본', 'GitHub 연결과 협업 기본', 'Git 프로젝트 관리 문서', 'GitHub 중급'],
    sectionDocs: {
      'Git 기본': [
        { slug: '3-1-1-why-git', title: '1-1 Git이 왜 필요한가요?', folder: 'git' },
        { slug: '3-1-2-git-structure', title: '1-2 Git의 구조 이해하기', folder: 'git' },
        { slug: '3-1-3-cli-basics', title: '1-3 CLI 명령어 기본 익히기', folder: 'git' },
      ],
      'GitHub 연결과 협업 기본': [
        { slug: '3-2-1-create-github-account', title: '2-1 GitHub 계정 만들기', folder: 'github' },
        { slug: '3-2-2-connect-local-and-github', title: '2-2 내 컴퓨터와 GitHub 연결하기', folder: 'github' },
        { slug: '3-2-3-commit-push-pull', title: '2-3 Commit, push, pull 사용하기', folder: 'github' },
        { slug: '3-2-4-branch-workflow', title: '2-4 branch로 작업 나누기', folder: 'github' },
      ],
      'Git 프로젝트 관리 문서': [
        { slug: '3-3-1-gitignore', title: '3-1 gitignore로 버전 관리 제외 파일 설정하기', folder: 'git' },
        { slug: '3-3-2-readme-project-intro', title: '3-2 README.md로 프로젝트 소개하기', folder: 'git' },
        { slug: '3-3-3-markdown-basics', title: '3-3 Markdown 문법 알아보기', folder: 'git' },
      ],
      'GitHub 중급': [
        { slug: '4-1-branch-strategy', title: '4-1 브랜치 전략 알아보기', folder: 'github' },
        { slug: '4-2-collaboration', title: '4-2 협업하기', folder: 'github' },
        { slug: '4-3-preview-project-management', title: '4-3 Preview 프로젝트 관리하기', folder: 'github' },
      ],
    },
  },
  {
    id: 'web-network',
    name: 'Web & Network',
    emoji: '🌐',
    slug: 'web-network',
    description: '웹 서비스의 종류와 SaaS 개념부터 프론트엔드·백엔드의 역할, API가 필요한 이유까지 웹 생태계의 기본 구조를 다룹니다.',
    // 하위 섹션이 1개뿐이라 중간 섹션 없이 문서를 바로 노출한다 (HTML/CSS Framework와 동일한 flat 패턴).
    // sections 각 항목이 실제로는 문서 1개씩을 가리키며, sectionLinks로 바로 문서 경로에 연결한다.
    sections: [
      '1-1 웹 서비스의 종류 알아보기',
      '1-2 프론트엔드와 백엔드',
      '1-3 API의 세계',
    ],
    sectionLinks: {
      '1-1 웹 서비스의 종류 알아보기': '/web-network/web-network/1-1-web-service-types',
      '1-2 프론트엔드와 백엔드': '/web-network/web-network/1-2-frontend-and-backend',
      '1-3 API의 세계': '/web-network/web-network/1-3-api-world',
    },
    sectionDocs: {
      '1-1 웹 서비스의 종류 알아보기': [{ slug: '1-1-web-service-types', title: '1-1 웹 서비스의 종류 알아보기', folder: 'web-network' }],
      '1-2 프론트엔드와 백엔드': [{ slug: '1-2-frontend-and-backend', title: '1-2 프론트엔드와 백엔드', folder: 'web-network' }],
      '1-3 API의 세계': [{ slug: '1-3-api-world', title: '1-3 API의 세계', folder: 'web-network' }],
    },
  },
  {
    id: 'http',
    name: 'HTTP',
    emoji: '📡',
    slug: 'http',
    description: 'HTTP 요청과 응답의 구조, method와 status code, Fetch API와 JSON, 그리고 CORS가 왜 발생하는지 다룹니다.',
    sections: [
      '1-1 HTTP 통신의 기초',
      '1-2 Fetch API와 JSON',
      '1-3 CORS 알아보기',
    ],
    sectionLinks: {
      '1-1 HTTP 통신의 기초': '/http/http/1-1-http-basics',
      '1-2 Fetch API와 JSON': '/http/http/1-2-fetch-api-and-json',
      '1-3 CORS 알아보기': '/http/http/1-3-cors',
    },
    sectionDocs: {
      '1-1 HTTP 통신의 기초': [{ slug: '1-1-http-basics', title: '1-1 HTTP 통신의 기초', folder: 'http' }],
      '1-2 Fetch API와 JSON': [{ slug: '1-2-fetch-api-and-json', title: '1-2 Fetch API와 JSON', folder: 'http' }],
      '1-3 CORS 알아보기': [{ slug: '1-3-cors', title: '1-3 CORS 알아보기', folder: 'http' }],
    },
  },
  {
    id: 'jquery',
    name: 'jQuery',
    emoji: '💠',
    slug: 'jquery',
    description: 'jQuery가 등장한 배경과 역사, 그리고 선택자·DOM 조작·이벤트 처리·기본 애니메이션 같은 핵심 기능을 정리합니다.',
    sections: [
      '1-1 jQuery의 역할과 역사',
      '1-2 jQuery 핵심 기능 및 기본 효과',
    ],
    sectionLinks: {
      '1-1 jQuery의 역할과 역사': '/jquery/jquery/1-1-jquery-role-and-history',
      '1-2 jQuery 핵심 기능 및 기본 효과': '/jquery/jquery/1-2-jquery-core-and-effects',
    },
    sectionDocs: {
      '1-1 jQuery의 역할과 역사': [{ slug: '1-1-jquery-role-and-history', title: '1-1 jQuery의 역할과 역사', folder: 'jquery' }],
      '1-2 jQuery 핵심 기능 및 기본 효과': [{ slug: '1-2-jquery-core-and-effects', title: '1-2 jQuery 핵심 기능 및 기본 효과', folder: 'jquery' }],
    },
  },
  {
    id: 'regular-expression',
    name: 'Regular Expression',
    emoji: '🔎',
    slug: 'regular-expression',
    description: '문자열 패턴을 검사하는 정규표현식이 왜 필요한지, 자주 쓰는 기호와 이메일·전화번호 같은 입문자용 예시를 다룹니다.',
    sections: ['1-1 정규표현식'],
    sectionLinks: {
      '1-1 정규표현식': '/regular-expression/regular-expression/1-1-regular-expression',
    },
    sectionDocs: {
      '1-1 정규표현식': [{ slug: '1-1-regular-expression', title: '1-1 정규표현식', folder: 'regular-expression' }],
    },
  },
  {
    id: 'firebase',
    name: 'Firebase',
    emoji: '🔥',
    slug: 'firebase',
    description: 'Google이 제공하는 BaaS 플랫폼. 서버리스 개념부터 Firestore·Authentication·Storage·Hosting 같은 주요 서비스, 실제 배포 과정, 실전에서 함께 쓰이는 보조 개념까지 다룹니다.',
    nestedSidebar: true,
    sections: ['Firebase 기본', 'Firebase 주요 서비스', 'Firebase 배포', '부록'],
    sectionDocs: {
      'Firebase 기본': [
        { slug: '1-1-firebase', title: '1-1 Firebase', folder: 'basics' },
        { slug: '1-2-serverless-architecture', title: '1-2 서버리스 아키텍처란?', folder: 'basics' },
        { slug: '1-3-firebase-services-overview', title: '1-3 서비스 둘러보기', folder: 'basics' },
      ],
      'Firebase 주요 서비스': [
        { slug: '2-1-firestore-database', title: '2-1 Firestore 데이터베이스', folder: 'services' },
        { slug: '2-2-authentication', title: '2-2 Authentication', folder: 'services' },
        { slug: '2-3-storage', title: '2-3 Storage 파일 저장', folder: 'services' },
        { slug: '2-4-hosting', title: '2-4 Hosting 배포', folder: 'services' },
      ],
      'Firebase 배포': [
        { slug: '3-1-what-is-deployment', title: '3-1 배포가 뭔가요?', folder: 'deployment' },
        { slug: '3-2-firebase-hosting-deployment', title: '3-2 Firebase Hosting 배포 방법', folder: 'deployment' },
        { slug: '3-3-deployment-services', title: '3-3 다양한 배포 서비스 소개', folder: 'deployment' },
      ],
      '부록': [
        { slug: '4-1-react-portal', title: '4-1 React Portal', folder: 'appendix' },
        { slug: '4-2-zustand', title: '4-2 Zustand', folder: 'appendix' },
        { slug: '4-3-api-fetch-axios', title: '4-3 API 연동(fetch & axios)', folder: 'appendix' },
      ],
    },
  },
  {
    id: 'css-framework',
    name: 'CSS Framework',
    emoji: '🎨',
    slug: 'css-framework',
    description: '빠르게 UI를 완성하는 CSS 프레임워크. 프레임워크가 필요한 이유부터 Component based와 Utility first 방식 비교, Bootstrap과 TailwindCSS 활용까지 정리합니다.',
    // 하위 섹션이 1개뿐이라 중간 섹션 없이 문서를 바로 노출한다 (HTML/coding-test와 동일한 flat 패턴).
    // sections 각 항목이 실제로는 문서 1개씩을 가리키며, sectionLinks로 바로 문서 경로에 연결한다.
    sections: [
      '1-1 CSS 프레임워크란 무엇인가요?',
      '1-2 Component based vs Utility first',
      '1-3 Bootstrap 소개',
      '1-4 TailwindCSS 제대로 쓰기',
    ],
    sectionLinks: {
      '1-1 CSS 프레임워크란 무엇인가요?': '/css-framework/css-framework/4-1-what-is-css-framework',
      '1-2 Component based vs Utility first': '/css-framework/css-framework/4-2-component-based-vs-utility-first',
      '1-3 Bootstrap 소개': '/css-framework/css-framework/4-3-bootstrap-introduction',
      '1-4 TailwindCSS 제대로 쓰기': '/css-framework/css-framework/4-4-tailwindcss-practical-use',
    },
    sectionDocs: {
      '1-1 CSS 프레임워크란 무엇인가요?': [{ slug: '4-1-what-is-css-framework', title: '1-1 CSS 프레임워크란 무엇인가요?', folder: 'css-framework' }],
      '1-2 Component based vs Utility first': [{ slug: '4-2-component-based-vs-utility-first', title: '1-2 Component based vs Utility first', folder: 'css-framework' }],
      '1-3 Bootstrap 소개': [{ slug: '4-3-bootstrap-introduction', title: '1-3 Bootstrap 소개', folder: 'css-framework' }],
      '1-4 TailwindCSS 제대로 쓰기': [{ slug: '4-4-tailwindcss-practical-use', title: '1-4 TailwindCSS 제대로 쓰기', folder: 'css-framework' }],
    },
  },
  {
    id: 'testing',
    name: 'Testing',
    emoji: '🧪',
    slug: 'testing',
    description: '테스트가 필요한 이유부터 TDD 사이클, Jest와 React Testing Library로 테스트를 작성하는 방법까지 다룹니다.',
    // 하위 섹션이 1개뿐이라 중간 섹션 없이 문서를 바로 노출한다 (HTML/CSS Framework와 동일한 flat 패턴).
    // sections 각 항목이 실제로는 문서 1개씩을 가리키며, sectionLinks로 바로 문서 경로에 연결한다.
    sections: [
      '1-1 TDD가 뭔가요?',
      '1-2 Jest 시작하기',
      '1-3 간단한 컴포넌트 테스트 작성하기',
    ],
    sectionLinks: {
      '1-1 TDD가 뭔가요?': '/testing/testing/1-1-what-is-tdd',
      '1-2 Jest 시작하기': '/testing/testing/1-2-getting-started-with-jest',
      '1-3 간단한 컴포넌트 테스트 작성하기': '/testing/testing/1-3-simple-component-test',
    },
    sectionDocs: {
      '1-1 TDD가 뭔가요?': [{ slug: '1-1-what-is-tdd', title: '1-1 TDD가 뭔가요?', folder: 'testing' }],
      '1-2 Jest 시작하기': [{ slug: '1-2-getting-started-with-jest', title: '1-2 Jest 시작하기', folder: 'testing' }],
      '1-3 간단한 컴포넌트 테스트 작성하기': [{ slug: '1-3-simple-component-test', title: '1-3 간단한 컴포넌트 테스트 작성하기', folder: 'testing' }],
    },
  },
  {
    id: 'build-tools',
    name: 'Build Tools',
    emoji: '📦',
    slug: 'build-tools',
    description: '번들러가 필요한 이유부터 entry·output·loader·plugin 같은 설정 개념, 개발용 빌드와 배포용 빌드의 차이까지 다룹니다.',
    sections: [
      '1-1 번들러 이해하기',
      '1-2 번들러 설정하기',
      '1-3 빌드와 배포',
    ],
    sectionLinks: {
      '1-1 번들러 이해하기': '/build-tools/build-tools/1-1-understanding-bundlers',
      '1-2 번들러 설정하기': '/build-tools/build-tools/1-2-bundler-configuration',
      '1-3 빌드와 배포': '/build-tools/build-tools/1-3-build-and-deploy',
    },
    sectionDocs: {
      '1-1 번들러 이해하기': [{ slug: '1-1-understanding-bundlers', title: '1-1 번들러 이해하기', folder: 'build-tools' }],
      '1-2 번들러 설정하기': [{ slug: '1-2-bundler-configuration', title: '1-2 번들러 설정하기', folder: 'build-tools' }],
      '1-3 빌드와 배포': [{ slug: '1-3-build-and-deploy', title: '1-3 빌드와 배포', folder: 'build-tools' }],
    },
  },
  {
    id: 'coding-test',
    name: 'Coding Test',
    emoji: '🏆',
    slug: 'coding-test',
    description: '알고리즘 문제 풀이 전략과 핵심 패턴. 배열 메서드, 문자열·수학 처리, 실전 문제 해결 방법까지 코딩 테스트를 대비합니다.',
    // 문서 수가 적어 하위 섹션으로 나누지 않고 flat list로 유지한다 (2026-07 개편).
    // sections 각 항목이 실제로는 문서 1개씩을 가리키며, sectionLinks로 바로 문서 경로에 연결한다.
    sections: [
      '1-1 코딩테스트가 뭔가요?',
      '1-2 코딩테스트 플랫폼 소개',
      '1-3 문제 푸는 방법 알아보기',
      '2-1 배열 메서드',
      '3-1 문자열 메서드',
      '3-2 Math 객체',
      '4-1 프로그래머스 Level 0-1 도전',
      '4-2 문제 푸는 순서 알아보기',
    ],
    sectionLinks: {
      '1-1 코딩테스트가 뭔가요?': '/coding-test/intro/1-1-what-is-coding-test',
      '1-2 코딩테스트 플랫폼 소개': '/coding-test/intro/1-2-coding-test-platforms',
      '1-3 문제 푸는 방법 알아보기': '/coding-test/intro/1-3-how-to-solve-problems',
      '2-1 배열 메서드': '/coding-test/arrays/2-1-array-methods',
      '3-1 문자열 메서드': '/coding-test/string-math/3-1-string-methods',
      '3-2 Math 객체': '/coding-test/string-math/3-2-math-object',
      '4-1 프로그래머스 Level 0-1 도전': '/coding-test/problem-solving/4-1-programmers-level-0-1-challenge',
      '4-2 문제 푸는 순서 알아보기': '/coding-test/problem-solving/4-2-problem-solving-order',
    },
    // DocPage의 breadcrumb/"돌아가기" 링크가 문서의 폴더(folder)로부터 표시 단원을 역으로
    // 찾을 때 사용한다. 문서마다 자기 자신의 sections 항목을 그대로 키로 사용해
    // 그룹화 없이 1문서=1키 구조를 유지한다.
    sectionDocs: {
      '1-1 코딩테스트가 뭔가요?': [{ slug: '1-1-what-is-coding-test', title: '1-1 코딩테스트가 뭔가요?', folder: 'intro' }],
      '1-2 코딩테스트 플랫폼 소개': [{ slug: '1-2-coding-test-platforms', title: '1-2 코딩테스트 플랫폼 소개', folder: 'intro' }],
      '1-3 문제 푸는 방법 알아보기': [{ slug: '1-3-how-to-solve-problems', title: '1-3 문제 푸는 방법 알아보기', folder: 'intro' }],
      '2-1 배열 메서드': [{ slug: '2-1-array-methods', title: '2-1 배열 메서드', folder: 'arrays' }],
      '3-1 문자열 메서드': [{ slug: '3-1-string-methods', title: '3-1 문자열 메서드', folder: 'string-math' }],
      '3-2 Math 객체': [{ slug: '3-2-math-object', title: '3-2 Math 객체', folder: 'string-math' }],
      '4-1 프로그래머스 Level 0-1 도전': [{ slug: '4-1-programmers-level-0-1-challenge', title: '4-1 프로그래머스 Level 0-1 도전', folder: 'problem-solving' }],
      '4-2 문제 푸는 순서 알아보기': [{ slug: '4-2-problem-solving-order', title: '4-2 문제 푸는 순서 알아보기', folder: 'problem-solving' }],
    },
  },
];

// ai-vibe-coding(비공개 AI 교안) — 의도적으로 위 _publicCategories 배열 밖에 둔다.
// 공개 배포 빌드에서는 아래 categories export의 삼항식 false 분기가 되어 이 객체
// 리터럴 자체가 참조되지 않으므로 번들러가 죽은 코드로 판단해 제거할 수 있다.
const _aiVibeCodingCategory = {
  id: 'ai-vibe-coding',
  name: 'AI & Vibe Coding',
  emoji: '🤖',
  slug: 'ai-vibe-coding',
  description: 'AI 도구와 함께하는 새로운 개발 방식. Claude, Cursor 등 AI 도구 설정부터 바이브 코딩 수업 내용을 단계별로 정리합니다.',
  // nestedSidebar: true 시 섹션이 2단계 Accordion으로 표시되고 sectionDocs가 3단계 문서로 노출
  nestedSidebar: true,
  sections: ['Setup', 'Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4'],
  sectionDocs: {
    'Setup': [
      { slug: 'step-01-dev-environment', title: '1단계: 개발환경 구축' },
      { slug: 'step-02-integrated-setup', title: '2단계: 통합 세팅 및 첫 수업 준비' },
      { slug: 'step-03-github-backup', title: '3단계: GitHub 백업 환경 설정' },
      { slug: 'step-04-env-check', title: '4단계: 환경 세팅 상태 확인' },
      { slug: 'step-05-usage-management', title: '5단계: Claude Code 사용량 관리 및 무제한 활용 가이드' },
    ],
    'Lesson 1': [
      { slug: '1-1-web-basics', title: '1-1: 웹 기본 개념 및 UI/UX 이론' },
      { slug: '1-2-ui-practice', title: '1-2: UI 요소 제작 실습' },
      { slug: '1-3-box-model-flexbox', title: '1-3: 박스 모델과 Flexbox 이해' },
      { slug: '1-4-color-palette', title: '1-4: 이미지 분석으로 컬러 팔레트 추출' },
      { slug: '1-5-portfolio', title: '1-5: 포트폴리오 사이트 제작' },
    ],
    'Lesson 2': [
      { slug: '2-1-supabase-mcp', title: '2-1: 왜 데이터가 필요한가' },
      { slug: '2-2-db-schema', title: '2-2: 데이터 구조 설계하기' },
      { slug: '2-3-ui-planning', title: '2-3: 데이터 저장소 연결하기' },
      { slug: '2-4-db-discovery', title: '2-4: 문의 기능 만들기' },
      { slug: '2-5-community-dev', title: '2-5: 목록 화면 상태 다루기' },
      { slug: '2-6-contact-section', title: '2-6: 데이터 연결 마무리 점검' },
    ],
    'Lesson 3': [
      { slug: '3-1-web-vs-app', title: '3-1: 웹 화면과 모바일 화면의 차이' },
      { slug: '3-2-mobile-ui-planning', title: '3-2: 모바일 친화 레이아웃 요청하기' },
      { slug: '3-3-sns-db-and-implementation', title: '3-3: 피드·목록형 화면 검토하기' },
      { slug: '3-4-projects-tab', title: '3-4: 반응형 화면 점검하기' },
    ],
    'Lesson 4': [
      { slug: '4-1-portfolio-reference-exploration', title: '4-1: 공개 전 전체 점검하기' },
      { slug: '4-2-about-me-tab', title: '4-2: 배포 방식과 준비 항목 비교하기' },
      { slug: '4-3-hero-section', title: '4-3: 배포 후 화면 점검하기' },
      { slug: '4-4-portfolio-final-review', title: '4-4: 공개 주소와 도메인 정리하기' },
      { slug: '4-5-custom-domain', title: '4-5: 제출 전 문서 정리하기' },
      { slug: '4-6-deployment-strategy', title: '4-6: 학습 흐름 마무리하기' },
    ],
  },
};

// VITE_PUBLIC_BUILD=true(공개 배포 빌드)에서는 ai-vibe-coding(비공개 AI 교안) 카테고리를
// 제외한다. 홈 화면 카드·사이드바·헤더·푸터 추천 링크·검색 추천은 모두 이 categories
// 배열을 그대로 순회/조회하므로 여기서 한 번만 제외하면 전 영역에 자동 반영된다.
// CategoryPage/SectionPage/DocPage는 categories.find()가 undefined를 반환하면 기존
// NotFoundPage 처리 경로를 그대로 타므로, 직접 URL 접근도 라우팅 수정 없이 함께 차단된다.
export const categories = import.meta.env.VITE_PUBLIC_BUILD === 'true'
  ? _publicCategories
  : [..._publicCategories, _aiVibeCodingCategory];
