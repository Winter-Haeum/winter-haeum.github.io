---
title: "4-2 useReducer로 복잡한 상태 로직 관리하기"
status: "completed"
description: "useState가 감당하기 어려워지는 지점에서 State·Action·Reducer 패턴으로 상태 변경 로직을 컴포넌트 밖으로 분리하는 useReducer의 기본기를 정리한다."
category: "React"
section: "State Management"
tags:
  - react
  - hooks
  - usereducer
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
  • <strong>useState의 한계</strong> — 복잡한 상태 로직이 컴포넌트 안에서 흩어지는 문제를 이해합니다<br>
  • <strong>Reducer 패턴</strong> — State·Action·Reducer의 데이터 흐름을 파악합니다<br>
  • <strong>선택 기준</strong> — 언제 useState 대신 useReducer를 쓰는지 판단합니다
</div>

---

## 1. useState의 한계

useReducer는 상태 변경 로직이 복잡해질 때, 그 로직을 컴포넌트 밖의 함수 하나로 모으는 Hook입니다. 여러 컴포넌트가 값을 공유하는 방법은 [4-1 문서](/react/state-management/4-1-usecontext)에서 다뤘습니다.

Redux 같은 라이브러리 내부 구조는 [4-3 문서](/react/state-management/4-3-state-management-libraries)에서 개념 수준으로만 다룹니다.

강의 목록처럼 객체 배열을 다루고, 추가·완료 처리·삭제 등 동작이 늘어나면 각 핸들러가 컴포넌트 곳곳에서 `setState`를 각자 호출하게 됩니다.

**• React: 흩어진 setState 호출 예시**

```jsx
const [courses, setCourses] = useState([]);

const addCourse = (title) => {
  setCourses([...courses, { id: Date.now(), title, done: false }]);
};

const toggleCourse = (id) => {
  setCourses(courses.map(c => c.id === id ? { ...c, done: !c.done } : c));
};
```

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">추적이 어려움</div><div class="wda-fcard-dsc">여러 함수가 제각각 setCourses를 호출해, 상태가 어디서 바뀌었는지 찾기 어렵습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">재사용이 어려움</div><div class="wda-fcard-dsc">로직이 컴포넌트 내부에 있어 다른 컴포넌트에서 그대로 쓰기 어렵습니다.</div></div>
</div>

---

## 2. useReducer의 3요소

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">State</div><div class="wda-fcard-dsc">현재 상태 값. 예: <code>{ courses: [] }</code></div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Action</div><div class="wda-fcard-dsc">"무엇을 할지"만 담은 객체. 예: <code>{ type: 'ADD', payload: '...' }</code></div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Reducer</div><div class="wda-fcard-dsc">state와 action을 받아 새 state를 반환하는 함수. <code>(state, action) =&gt; newState</code></div></div>
</div>

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1. dispatch</div><div class="wda-fnode-dsc">action 전달</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2. Reducer</div><div class="wda-fnode-dsc">현재 state + action 처리</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3. New State</div><div class="wda-fnode-dsc">화면 갱신</div></div>
</div>

컴포넌트는 "어떻게" 바꿀지 고민하지 않고, "무엇을" 하고 싶은지 `dispatch`로 요청만 합니다.

---

## 3. 기본 문법

**• React: useReducer 기본 문법**

```jsx
import { useReducer } from 'react';

function learningReducer(learningState, action) {
  switch (action.type) {
    case 'ADD':
      return { courses: [...learningState.courses, { id: Date.now(), title: action.payload, done: false }] };
    case 'TOGGLE':
      return {
        courses: learningState.courses.map(c =>
          c.id === action.payload ? { ...c, done: !c.done } : c
        ),
      };
    default:
      return learningState;
  }
}

function HookDashboard() {
  const [learningState, dispatch] = useReducer(learningReducer, { courses: [] });

  return (
    <div>
      <p>{learningState.courses.length}개 강의</p>
      <button type="button" onClick={() => dispatch({ type: 'ADD', payload: 'React 기초' })}>
        강의 추가
      </button>
    </div>
  );
}
```

Reducer 함수는 컴포넌트 밖에 두어도 됩니다. 리액트 상태에 의존하지 않는 순수 함수이기 때문입니다.

---

## 4. Action 객체 구조

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">type (필수)</div><div class="wda-fcard-dsc">어떤 작업인지 나타내는 문자열. 대문자와 언더스코어를 관습적으로 사용합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">payload (선택)</div><div class="wda-fcard-dsc">작업에 필요한 실제 데이터.</div></div>
</div>

**• React: Action 객체 예시**

```jsx
{ type: 'ADD', payload: 'React 기초' }
{ type: 'DELETE', payload: 3 }
{ type: 'RESET' }
```

---

## 5. dispatch 사용법

**• React: dispatch로 action 요청하기**

```jsx
<button type="button" onClick={() => dispatch({ type: 'ADD', payload: 'CSS 기초' })}>
  추가
</button>
<button type="button" onClick={() => dispatch({ type: 'RESET' })}>
  초기화
</button>
```

**💡 설명**

<div class="wda-callout wda-ci">
  <p><code>dispatch</code> 함수 자체는 참조가 항상 안정적입니다. useEffect나 useCallback의 의존성 배열에 넣지 않아도 안전합니다.</p>
</div>

---

## 6. Reducer 작성 시 지켜야 할 것

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">불변성 유지</div><div class="wda-fcard-dsc">push·splice 대신 spread, map, filter로 새 배열·객체를 반환합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">순수 함수 유지</div><div class="wda-fcard-dsc">API 호출 같은 side effect를 넣지 않고, 같은 입력이면 항상 같은 결과를 반환해야 합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">default 처리</div><div class="wda-fcard-dsc">알 수 없는 action.type이 들어오면 기존 state를 그대로 반환합니다.</div></div>
</div>

**• React: 불변성 위반 vs 올바른 반환**

```jsx
// ❌ 원본을 직접 수정
case 'ADD':
  learningState.courses.push(newCourse);
  return learningState;

// ✅ 새 객체를 반환
case 'ADD':
  return { courses: [...learningState.courses, newCourse] };
```

---

## 7. useState vs useReducer 선택 기준

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">useState</div>
    단순한 값(숫자, 문자열, 토글)이고 상태를 바꾸는 방식이 한두 가지일 때.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">useReducer</div>
    여러 하위 값이 얽혀 있거나, 다음 상태가 이전 상태에 의존하는 복잡한 로직일 때.
  </div>
</div>

---

## 8. ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><strong>reducer(state, action) → newState</strong> 함수가 상태 변경 로직을 전담하고, 컴포넌트는 <strong>dispatch</strong>로 요청만 한다.</li>
    <li>Action은 객체이며 <strong>type(필수)</strong>으로 행위를 식별하고, 필요하면 <strong>payload(선택)</strong>로 데이터를 담는다.</li>
    <li><strong>useState</strong>는 단순 값, <strong>useReducer</strong>는 여러 하위 값이 얽힌 복잡한 로직에 적합하다.</li>
    <li>Reducer는 반드시 <strong>순수 함수</strong>여야 하며, 상태는 <strong>불변성을 유지</strong>하며 새 값을 반환한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: dispatch 함수는 매 렌더링마다 새로 생성되어 의존성 배열에 꼭 넣어야 한다?</div>
    <div class="wda-mistake-right">정답: dispatch는 참조값이 <strong>항상 안정적</strong>이라 넣지 않아도 안전하다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: state를 push·splice로 직접 수정해도 화면이 갱신된다?</div>
    <div class="wda-mistake-right">정답: 리액트는 상태가 <strong>'교체'되었을 때만</strong> 변경을 감지하므로, 반드시 새 배열·객체를 반환해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 데이터가 조금만 복잡해도 무조건 useReducer를 써야 한다?</div>
    <div class="wda-mistake-right">정답: 단순한 값·단순한 업데이트라면 <strong>useState</strong>로 충분하며, 여러 값이 얽힌 복잡한 로직일 때만 useReducer가 유리하다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 데이터 흐름</div>
    <div class="wda-formula-block-body"><code>dispatch(action) → reducer(state, action) → newState</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · Action 구조</div>
    <div class="wda-formula-block-body"><code>{ type, payload }</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 선택 기준</div>
    <div class="wda-formula-block-body"><code>단순 값 useState / 복잡 로직 useReducer</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Reducer란?</div>
    <div class="wda-flip-back">(state, action) => newState 형태로 상태 변경 로직을 전담하는 순수 함수입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Action 객체의 필수 속성은?</div>
    <div class="wda-flip-back">type이며, 필요하면 payload로 추가 데이터를 함께 담습니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">useState와 useReducer는 언제 구분하나요?</div>
    <div class="wda-flip-back">단순한 값은 useState, 여러 하위 값이 얽힌 복잡한 로직은 useReducer를 사용합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Reducer가 순수 함수여야 하는 이유는?</div>
    <div class="wda-flip-back">같은 입력에 항상 같은 출력을 보장해 예측 가능해야 하기 때문이며, API 호출 같은 side effect는 금지됩니다.</div>
  </div>
</div>
