---
title: "4-1 useContext로 전역 상태 다루기"
status: "completed"
description: "Props Drilling 문제를 이해하고, createContext·Provider·useContext 3단계로 여러 컴포넌트가 공유하는 값을 만드는 방법을 정리한다."
category: "React"
section: "State Management"
tags:
  - react
  - hooks
  - usecontext
  - state-management
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
  • <strong>Props Drilling 이해</strong> — 중간 컴포넌트가 쓰지도 않는 값을 계속 전달만 하는 문제를 이해합니다<br>
  • <strong>Context 3단계</strong> — createContext, Provider, useContext로 값을 공유하는 흐름을 익힙니다<br>
  • <strong>선택 기준</strong> — Props와 Context 중 상황에 맞는 방법을 판단합니다
</div>

---

## 1. Props Drilling 문제

useContext는 여러 컴포넌트가 값을 함께 봐야 할 때, props를 거치지 않고 값을 전달하는 Hook입니다.

상태 변경 로직이 복잡할 때 쓰는 useReducer는 [4-2 문서](/react/state-management/4-2-usereducer)에서, Redux·Zustand 같은 전역 상태 관리 라이브러리는 [4-3 문서](/react/state-management/4-3-state-management-libraries)에서 다룹니다.

이후 예시는 학습 플랫폼의 `AppSettingsContext`(다크모드·언어 등 앱 설정)와 `UserContext`(로그인 사용자 정보)를 기준으로 설명합니다.

`AppRouter` → `DashboardPage` → `CourseListPage`처럼 컴포넌트 트리가 깊어지면, 최상위의 값을 맨 아래 컴포넌트까지 props로 계속 전달해야 합니다.

**• React: Props Drilling 예시**

```jsx
// user 데이터는 CourseListPage에서만 필요한데...
<AppRouter user={user}>
  <DashboardPage user={user}>
    <CourseListPage user={user} />
  </DashboardPage>
</AppRouter>
```

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">불필요한 전달</div><div class="wda-fcard-dsc">DashboardPage는 user를 쓰지도 않으면서 자식에게 넘기기 위해 받아야 합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">유지보수 어려움</div><div class="wda-fcard-dsc">데이터 구조가 바뀌면 중간에 거치는 모든 컴포넌트를 함께 수정해야 합니다.</div></div>
</div>

---

## 2. Context 3단계 흐름

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">createContext</div><div class="wda-fnode-dsc">공유 공간 생성</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">Provider</div><div class="wda-fnode-dsc">value로 값 제공</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">useContext</div><div class="wda-fnode-dsc">필요한 곳에서 수신</div></div>
</div>

---

## 3. Context 생성하기

**• React: createContext로 공유 공간 만들기**

```jsx
// contexts/AppSettingsContext.js
import { createContext } from 'react';

export const AppSettingsContext = createContext(null);
```

`createContext`의 인자는 Provider 없이 사용될 때 쓰이는 기본값입니다. 필수로 Provider가 있어야 하는 값이라면 `null`로 두고, 사용하는 쪽에서 누락을 감지하도록 만드는 것이 안전합니다.

---

## 4. Provider로 값 제공하기

**• React: Provider로 theme 값 제공하기**

```jsx
// App.jsx
import { useState } from 'react';
import { AppSettingsContext } from './contexts/AppSettingsContext';

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <AppSettingsContext.Provider value={{ theme, setTheme }}>
      <DashboardPage />
    </AppSettingsContext.Provider>
  );
}
```

`Provider`로 감싼 영역 안의 모든 컴포넌트는 `value`에 담은 값에 접근할 수 있습니다.

---

## 5. useContext로 값 사용하기

**• React: useContext로 theme 값 꺼내 쓰기**

```jsx
// pages/SettingsPage.jsx
import { useContext } from 'react';
import { AppSettingsContext } from '../contexts/AppSettingsContext';

function SettingsPage() {
  const { theme, setTheme } = useContext(AppSettingsContext);

  return (
    <button type="button" onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
      현재 테마: {theme}
    </button>
  );
}
```

`SettingsPage`는 `DashboardPage`를 거치지 않고 `AppSettingsContext`에서 바로 값을 꺼내 씁니다.

---

## 6. Custom Hook으로 감싸기

Context를 쓸 때마다 매번 `useContext(AppSettingsContext)`를 반복하는 대신, Custom Hook으로 감싸면 Provider 누락도 함께 방지할 수 있습니다.

**• React: useUser Custom Hook으로 Context 감싸기**

```jsx
// contexts/UserContext.js
import { createContext, useState, useContext } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
```

**• React: useUser 사용 예시**

```jsx
function CourseListPage() {
  const { user, logout } = useUser(); // props 없이 바로 접근

  return <p>{user?.name}님, 환영합니다.</p>;
}
```

---

## 7. Context 사용 시 주의사항

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Props로 충분한 경우</div>
    1~2단계 정도의 단순한 부모-자식 전달은 Props가 더 직관적입니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Context가 필요한 경우</div>
    여러 단계 아래, 여러 컴포넌트에서 공통으로 필요한 값이라면 Context를 사용합니다.
  </div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>Provider의 <code>value</code>에 객체를 매번 새로 만들어 넣으면 렌더링마다 새 객체가 생성되어 불필요한 리렌더링을 유발할 수 있습니다. 값이 크거나 소비하는 컴포넌트가 많다면 <code>useMemo</code>로 value를 안정화하는 것을 고려합니다.</p>
</div>

---

## 8. ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>Props Drilling은 중간 컴포넌트가 쓰지 않는 값을 <strong>전달만 하기 위해</strong> 계속 받아야 하는 문제다.</li>
    <li>Context는 <strong>createContext → Provider(value) → useContext</strong> 3단계로 동작한다.</li>
    <li>Provider로 감싼 영역 안의 컴포넌트는 <strong>중간 단계 없이</strong> 값에 접근할 수 있다.</li>
    <li>Custom Hook으로 감싸면 코드가 간결해지고, Provider 누락 시 <strong>에러로 알려줄</strong> 수 있다.</li>
    <li>단순 전달은 Props, 여러 단계·여러 컴포넌트가 공유해야 하는 값은 Context를 사용한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Context를 쓰면 항상 Props보다 좋다?</div>
    <div class="wda-mistake-right">정답: 단순한 1~2단계 전달은 <strong>Props</strong>가 더 직관적이며, Context는 여러 단계·여러 곳에서 필요할 때 사용한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Provider의 value에 객체를 넣을 때 특별히 신경 쓸 게 없다?</div>
    <div class="wda-mistake-right">정답: 렌더링마다 새 객체가 만들어지면 불필요한 리렌더링이 발생할 수 있어, <strong>useMemo</strong>로 안정화하는 것이 좋다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: createContext의 기본값만 있으면 Provider 없이도 항상 안전하다?</div>
    <div class="wda-mistake-right">정답: 필수 전역 값은 <strong>createContext(null) + Custom Hook에서 에러 던지기</strong>로 안전장치를 만드는 것이 더 안전하다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · Context 3단계</div>
    <div class="wda-formula-block-body"><code>createContext → Provider(value) → useContext</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 선택 기준</div>
    <div class="wda-formula-block-body"><code>단순 전달 Props / 여러 곳 공유 Context</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 안전장치</div>
    <div class="wda-formula-block-body"><code>Custom Hook + Provider 누락 에러</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Props Drilling이란?</div>
    <div class="wda-flip-back">최상위 데이터를 필요 없는 중간 컴포넌트들이 계속 전달만 하기 위해 받아야 하는 문제입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Context 3단계 흐름은?</div>
    <div class="wda-flip-back">createContext(생성) → Provider(value 제공) → useContext(수신) 순서로 동작합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Provider의 value에 객체를 매번 새로 만들면 어떤 문제가 생기나요?</div>
    <div class="wda-flip-back">불필요한 리렌더링이 발생할 수 있어 useMemo로 값을 고정하는 것이 좋습니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Custom Hook 패턴(useUser)의 장점은?</div>
    <div class="wda-flip-back">useContext를 직접 쓰지 않고 한 줄로 접근할 수 있고, Provider 누락 시 에러로 알려줘 안전합니다.</div>
  </div>
</div>
