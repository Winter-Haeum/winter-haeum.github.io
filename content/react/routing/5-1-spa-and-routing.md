---
title: "5-1 SPA와 라우팅"
status: "completed"
description: "MPA와 SPA의 차이에서 출발해 react-router-dom 설치, BrowserRouter·Routes·Route 기본 구조, Link·NavLink·useNavigate·useParams까지 React Router의 기본기를 정리한다."
category: "React"
section: "Routing"
tags:
  - react
  - router
  - spa
  - routing
---

<style>
.wda-callout{border-radius:10px;padding:12px 14px;margin:.8rem 0 1.1rem;border-left:3px solid;font-size:.9rem;line-height:1.75}
.wda-ci{background:rgba(139,92,246,.06);border-color:#8b5cf6}
.wda-cw{background:rgba(245,158,11,.07);border-color:#f59e0b}
.wda-cs{background:rgba(34,197,94,.05);border-color:#22c55e}
.wda-clabel{font-size:.7rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px;display:block}
.wda-ci .wda-clabel{color:#8b5cf6}
.wda-cw .wda-clabel{color:#f59e0b}
.wda-cs .wda-clabel{color:#22c55e}
.wda-goal{background:rgba(34,197,94,.05);border:1px solid rgba(34,197,94,.2);border-radius:10px;padding:12px 16px;margin:.8rem 0 1.6rem;font-size:.83rem;line-height:1.75}
.wda-fgrid{display:flex;flex-wrap:wrap;gap:10px;margin:.8rem 0 1.6rem}
.wda-fcard{flex:1 1 140px;border:1px solid rgba(128,128,128,.18);border-radius:10px;padding:13px 15px;background:rgba(128,128,128,.03);box-shadow:0 1px 3px rgba(0,0,0,.04)}
.wda-fcard-ttl{font-size:.94rem;font-weight:700;margin-bottom:4px}
.wda-fcard-dsc{font-size:.89rem;line-height:1.65}
.wda-compare{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:.8rem 0 1.6rem}
@media(max-width:600px){.wda-compare{grid-template-columns:1fr}}
.wda-compare-card{border:1px solid rgba(128,128,128,.18);border-radius:10px;padding:14px 16px;font-size:.89rem;line-height:1.65;background:rgba(128,128,128,.03);box-shadow:0 1px 3px rgba(0,0,0,.04)}
.wda-compare-ttl{font-size:.92rem;font-weight:700;line-height:1.5;margin-bottom:8px}
.wda-flow{display:flex;flex-wrap:wrap;gap:4px;margin:.8rem 0 1.6rem;align-items:flex-start}
.wda-fnode{flex:1 1 90px;border:1px solid rgba(128,128,128,.18);border-radius:8px;padding:10px 12px;text-align:center;min-width:80px}
.wda-fnode-ttl{font-size:.88rem;font-weight:700;margin-bottom:3px}
.wda-fnode-dsc{font-size:.82rem;line-height:1.55}
.wda-farrow{color:rgba(139,92,246,.45);font-size:1.1rem;flex-shrink:0;padding:0 2px;align-self:center}
@media(max-width:600px){.wda-flow{flex-direction:column;align-items:center}.wda-farrow{transform:rotate(90deg)}}
.wda-callout p{margin:0 0 .45rem;font-size:.9rem;line-height:1.75}
.wda-callout p:last-child{margin-bottom:0}
.wda-callout ul{margin:.35rem 0 0;padding-left:1.1rem}
.wda-callout li{margin:.24rem 0;line-height:1.75;font-size:.83rem}
.wda-callout .wda-clabel{font-size:.7rem;line-height:1.3}
table.wda-mtable{width:100%;border-collapse:collapse;font-size:.83rem;margin:.8rem 0 1.4rem}
table.wda-mtable th,table.wda-mtable td{border:1px solid rgba(128,128,128,.2);padding:8px 12px;vertical-align:top;line-height:1.65}
table.wda-mtable th{background:rgba(139,92,246,.08);font-weight:700;text-align:left;white-space:nowrap}
table.wda-mtable tr:nth-child(even) td{background:rgba(128,128,128,.025)}
.wda-check-note{border:1px dashed rgba(128,128,128,.22);border-radius:8px;padding:14px 18px;background:rgba(128,128,128,.03);margin:.8rem 0 1.6rem;color:#2C2840}
.wda-check-note ul{list-style:none;margin:0;padding:0}
.wda-check-note li{position:relative;padding-left:1.4rem;margin:.4rem 0;font-size:.89rem;line-height:1.65}
.wda-check-note li::before{content:"✓";position:absolute;left:0;top:0;color:#6FB6C9;font-weight:700}
.wda-check-note strong{color:#1F1B2E;font-weight:700}
.wda-mistake-notes{display:flex;flex-direction:column;gap:8px;margin:.8rem 0 1.6rem}
.wda-mistake-note{border:1px solid #F6CFA8;border-radius:6px;padding:10px 14px;background:#FFF3E8}
.wda-mistake-wrong{font-size:.87rem;line-height:1.6;color:#C98245;text-decoration:line-through;text-decoration-color:#C98245;margin-bottom:4px}
.wda-mistake-right{font-size:.89rem;line-height:1.65;font-weight:600;color:#2C2840}
.wda-mistake-right strong{color:#1F1B2E;font-weight:700}
.wda-formula-board{display:flex;flex-wrap:wrap;gap:10px;margin:.8rem 0 1.6rem;padding:14px;border-radius:12px;background:rgba(128,128,128,.025);border:1px dashed rgba(128,128,128,.22)}
.wda-formula-block{flex:1 1 160px;min-width:150px;border-radius:8px;padding:10px 13px;background:#FFF3F6;border:1px dashed #F0B4C2}
.wda-formula-block-ttl{font-size:.72rem;font-weight:700;letter-spacing:.03em;text-transform:uppercase;color:#D86F8A;margin-bottom:6px}
.wda-formula-block-body{font-size:.87rem;line-height:1.7;font-weight:600;color:#2C2840}
.wda-formula-block-body code{background:transparent;padding:0;font-weight:700;font-family:'JetBrains Mono','Fira Code',monospace;color:#1F1B2E}
.wda-flip-deck{display:flex;flex-wrap:wrap;gap:12px;margin:.8rem 0 1.6rem}
</style>

## 🎯 학습 목표

<div class="wda-goal">
  • <strong>SPA 개념 이해</strong> — MPA와 SPA의 차이와 부드러운 화면 전환의 원리를 이해합니다<br>
  • <strong>Router 기본 설정</strong> — react-router-dom을 설치하고 BrowserRouter·Routes·Route로 라우트를 정의합니다<br>
  • <strong>이동 도구 활용</strong> — Link·NavLink·useNavigate·useParams로 화면을 이동합니다
</div>

---

## 1. SPA란 무엇인가

이 문서는 React Router의 기본 흐름(BrowserRouter, Routes, Route, Link, NavLink, useNavigate, useParams)만 다룹니다.

로그인 여부에 따라 접근을 제한하는 Protected Route 패턴, 라우트 안에 라우트를 두는 중첩 라우팅, 페이지 진입 전 데이터를 미리 불러오는 로더(loader), 코드 분할을 위한 지연 로딩(lazy loading)은 이 문서에서 다루지 않습니다.

이후 예시는 학습 플랫폼의 `AppRouter`, `CourseListPage`, `DashboardPage`, `SettingsPage`를 기준으로 설명합니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">MPA (Multi Page Application)</div>
    페이지를 이동할 때마다 서버에서 새로운 HTML을 통째로 받아옵니다. 화면이 매번 새로고침됩니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">SPA (Single Page Application)</div>
    처음 접속할 때 한 번만 HTML을 받고, 이후에는 필요한 데이터만 주고받으며 화면의 일부만 갱신합니다.
  </div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  <p>React Router는 이 SPA 방식의 화면 전환을 구현해주는 라이브러리입니다. 사용자가 링크를 클릭하면, 서버에 새 페이지를 요청하지 않고 브라우저 주소와 화면만 리액트가 바꿔줍니다. 다만 데이터가 필요한 페이지라면 API 요청은 별도로 발생할 수 있습니다.</p>
</div>

---

## 2. 설치와 기본 설정

**• 터미널: react-router-dom 설치하기**

```bash
npm install react-router-dom
```

앱 전체가 라우팅 기능을 쓸 수 있도록 최상위 파일에서 `BrowserRouter`로 감쌉니다.

**• React: BrowserRouter로 앱 감싸기**

```jsx
// main.jsx
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

---

## 3. 라우트 정의하기

`<Routes>` 안에 `<Route>`를 나열해, 경로별로 보여줄 컴포넌트를 매핑합니다.

**• React: Routes·Route로 경로 매핑하기**

```jsx
// AppRouter.jsx
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import CourseListPage from './pages/CourseListPage';
import SettingsPage from './pages/SettingsPage';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/courses" element={<CourseListPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<p>페이지를 찾을 수 없습니다.</p>} />
    </Routes>
  );
}
```

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">Routes</div><div class="wda-fcard-dsc">현재 URL과 일치하는 Route 하나만 렌더링하는 컨테이너입니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">path="*"</div><div class="wda-fcard-dsc">일치하는 경로가 없을 때 보여줄 화면을 지정합니다.</div></div>
</div>

---

## 4. 페이지 이동 — Link vs a

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">&lt;a href&gt;</div>
    브라우저가 새로고침되어 리액트 상태가 모두 초기화됩니다. 외부 사이트로 이동할 때만 사용합니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">&lt;Link to&gt;</div>
    브라우저 주소만 바꾸고 필요한 부분만 다시 그립니다. 앱 내부 이동에는 항상 이것을 사용합니다.
  </div>
</div>

**• React: Link로 강의 목록 이동하기**

```jsx
import { Link } from 'react-router-dom';

<Link to="/courses">강의 목록</Link>
```

---

## 5. NavLink로 현재 위치 표시하기

`NavLink`는 `Link`와 같지만, 현재 경로와 자신의 `to`가 일치하는지(`isActive`)를 함께 알려줍니다. 네비게이션 메뉴에서 현재 위치를 강조할 때 사용합니다.

**• React: NavLink로 현재 메뉴 강조하기**

```jsx
import { NavLink } from 'react-router-dom';

<NavLink
  to="/courses"
  className={({ isActive }) => (isActive ? 'menu-active' : 'menu')}
>
  강의 목록
</NavLink>
```

---

## 6. useNavigate로 코드에서 이동하기

버튼 클릭이 아니라 로그인 성공, 폼 제출 완료처럼 특정 로직이 끝난 뒤 코드로 페이지를 이동시킬 때 사용합니다.

**• React: useNavigate로 저장 후 이동하기**

```jsx
import { useNavigate } from 'react-router-dom';

function SettingsPage() {
  const navigate = useNavigate();

  const handleSave = () => {
    // 설정 저장 로직...
    navigate('/'); // 저장 후 대시보드로 이동
  };

  return <button type="button" onClick={handleSave}>저장</button>;
}
```

---

## 7. useParams로 동적 경로 다루기

URL 일부를 변수처럼 사용하고 싶을 때는 경로에 `:id`처럼 콜론을 붙여 정의합니다.

**• React: 동적 경로 파라미터 정의하기**

```jsx
<Route path="/courses/:courseId" element={<CourseDetailPage />} />
```

**• React: useParams로 courseId 꺼내기**

```jsx
import { useParams } from 'react-router-dom';

function CourseDetailPage() {
  const { courseId } = useParams(); // URL이 /courses/12라면 courseId는 '12'

  return <p>강의 번호: {courseId}</p>;
}
```

---

## 8. 초보자 실수

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>앱 내부 이동에 &lt;a href&gt;를 쓰는 경우</strong></p>
  <p>브라우저가 새로고침되어 리액트 상태(로그인 정보, 입력값 등)가 전부 사라집니다. 앱 내부 이동은 항상 &lt;Link&gt; 또는 &lt;NavLink&gt;를 사용합니다.</p>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>Route path에 콜론을 빠뜨리는 경우</strong></p>
  <p><code>path="/courses/courseId"</code>처럼 콜론 없이 적으면 동적 값이 아니라 고정된 문자열 경로로 인식되어, useParams로 값을 꺼낼 수 없습니다. 반드시 <code>:courseId</code> 형태로 적어야 합니다.</p>
</div>

---

## 9. ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>SPA는 <strong>최초 한 번만 HTML을 받고</strong> 이후엔 필요한 데이터만 주고받아 부드럽게 화면이 전환된다.</li>
    <li>최상위를 <strong>&lt;BrowserRouter&gt;</strong>로 감싸고, <strong>&lt;Routes&gt;</strong> 안에 <strong>&lt;Route path element&gt;</strong>로 경로를 매핑한다.</li>
    <li>단순 이동은 <strong>&lt;Link&gt;/&lt;NavLink&gt;</strong>, 코드 실행 후 이동은 <strong>useNavigate</strong>, URL의 동적 값은 <strong>useParams</strong>로 다룬다.</li>
    <li>&lt;a href&gt;는 브라우저를 새로고침시켜 리액트 상태를 초기화하므로, <strong>앱 내부 이동에는 사용하지 않는다</strong>.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: &lt;a href&gt;와 &lt;Link to&gt;는 결과가 똑같다?</div>
    <div class="wda-mistake-right">정답: &lt;a&gt;는 브라우저를 <strong>새로고침</strong>해 상태가 초기화되지만, &lt;Link&gt;는 주소만 바꿔 <strong>상태를 유지</strong>한 채 이동한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: NavLink와 Link는 완전히 같은 컴포넌트다?</div>
    <div class="wda-mistake-right">정답: NavLink는 <strong>현재 경로와 일치 여부(isActive)</strong>를 함께 제공해 메뉴 강조에 적합하다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Route path에 :courseId 대신 courseId라고 적어도 동적 값으로 인식된다?</div>
    <div class="wda-mistake-right">정답: 콜론(<code>:</code>)이 있어야 동적 파라미터로 인식되며, 없으면 고정된 문자열 경로로 취급된다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 이동 도구</div>
    <div class="wda-formula-block-body"><code>단순이동 Link / 로직이동 useNavigate</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 동적 경로</div>
    <div class="wda-formula-block-body"><code>path=":id" → useParams()</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 기본 구조</div>
    <div class="wda-formula-block-body"><code>BrowserRouter &gt; Routes &gt; Route(path, element)</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">SPA와 MPA의 가장 큰 차이는?</div>
    <div class="wda-flip-back">MPA는 페이지 이동마다 서버에서 새 HTML을 통째로 받지만, SPA는 최초 한 번만 받고 이후엔 필요한 데이터만 주고받습니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">앱 내부 이동에 &lt;a href&gt; 대신 &lt;Link to&gt;를 쓰는 이유는?</div>
    <div class="wda-flip-back">&lt;a&gt;는 브라우저를 새로고침해 리액트 상태가 초기화되지만, &lt;Link&gt;는 주소만 바꿔 상태를 유지합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">현재 위치한 메뉴를 강조할 때 쓰는 컴포넌트는?</div>
    <div class="wda-flip-back">NavLink입니다. isActive 값으로 현재 경로와 일치하는지 확인할 수 있습니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">URL의 동적 값을 꺼낼 때 쓰는 훅은?</div>
    <div class="wda-flip-back">useParams입니다. Route를 path="/courses/:courseId"처럼 정의해두면 courseId 값을 객체로 꺼낼 수 있습니다.</div>
  </div>
</div>
