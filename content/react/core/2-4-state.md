---
title: "2-4 state로 상태 관리하기"
status: "completed"
description: "선택한 강의와 완료 상태를 state로 다루며 useState 기본 문법, re-render 원리, 배열·객체 state 업데이트까지 React state의 기초를 정리한다."
category: "React"
section: "Core"
tags:
  - react
  - state
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
  • <strong>state 개념 이해하기</strong> — state가 컴포넌트 내부에서 바뀌는 값임을 이해합니다.<br>
  • <strong>useState 기본 사용법</strong> — 현재값과 변경 함수를 선언하고 사용하는 방법을 익힙니다.<br>
  • <strong>안전한 업데이트</strong> — 직접 대입 대신 setter와 이전 값 기반 업데이트를 익힙니다.<br>
  • <strong>props와 비교하기</strong> — props와 state의 차이를 명확히 구분합니다.
</div>

---

## 1. state가 필요한 순간

강의 카드에서 "완료 / 진행 중" 상태나 "지금 선택된 강의"처럼, 사용자 동작에 따라 화면 안에서 바뀌는 값이 필요합니다.

props는 부모가 전달하는 읽기 전용 값이라, 컴포넌트 스스로 값을 바꿀 수 없습니다. 이럴 때 state가 필요합니다.

---

## 2. state는 컴포넌트 내부에서 바뀌는 값이다

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">일반 변수</div>
    리렌더링될 때마다 초기화되며, 값이 바뀌어도 화면이 다시 그려지지 않는다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">state</div>
    값이 유지되고, 바뀌면 화면도 함께 다시 그려진다.
  </div>
</div>

---

## 3. useState 기본 형태

**• React: useState 기본 형태**

```jsx
import { useState } from "react";

const [isCompleted, setIsCompleted] = useState(false);
```

---

## 4. 현재값과 변경 함수

`useState`는 배열을 반환하며, 첫 번째 값은 **현재값**, 두 번째 값은 **변경 함수(setter)**입니다.

- `isCompleted`: 현재 상태값
- `setIsCompleted`: 상태를 바꿀 때 사용하는 함수

---

## 5. state가 바뀌면 다시 렌더링된다

**• React: state 변경으로 다시 렌더링하기**

```jsx
function StudyCard() {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <button onClick={() => setIsCompleted(!isCompleted)}>
      {isCompleted ? "완료" : "진행 중"}
    </button>
  );
}
```

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">이벤트</div><div class="wda-fnode-dsc">버튼 클릭</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">setter 호출</div><div class="wda-fnode-dsc">setIsCompleted(...)</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">state 변경</div><div class="wda-fnode-dsc">isCompleted 값 갱신</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">re-render</div><div class="wda-fnode-dsc">화면 다시 그림</div></div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  버튼에 이벤트를 연결하는 자세한 방법(이벤트 객체, onChange 등)은 <strong>2-5 이벤트 처리하기</strong>에서 다룹니다.
</div>

---

## 6. 직접 대입하면 안 된다

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">직접 수정</div>
    <code>isCompleted = true</code> — React가 변경을 감지하지 못한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">변경 함수 사용</div>
    <code>setIsCompleted(true)</code> — React가 감지하고 화면을 다시 그린다.
  </div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  state는 직접 대입하지 않습니다. 반드시 setter 함수를 통해서만 값을 바꿉니다.
</div>

---

## 7. 이전 state 기준으로 업데이트하기

새 값이 이전 값에 의존할 때는 setter에 함수를 전달하는 방식이 더 안전합니다.

**• React: 이전 state 기준으로 업데이트하기**

```jsx
setIsCompleted(prev => !prev);
```

---

## 8. 배열 state 업데이트 맛보기

**• React: 배열 state 업데이트하기**

```jsx
const [completedCourseIds, setCompletedCourseIds] = useState([]);

function markCompleted(courseId) {
  setCompletedCourseIds(prev => [...prev, courseId]);
}
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  배열 state는 <code>push</code>처럼 원본을 직접 바꾸지 않고, <strong>새 배열로 교체</strong>합니다.
</div>

---

## 9. 객체 state 업데이트 맛보기

**• React: 객체 state 업데이트하기**

```jsx
const [selectedCourse, setSelectedCourse] = useState({ title: "JSX 기초", level: "입문" });

function updateLevel(nextLevel) {
  setSelectedCourse(prev => ({ ...prev, level: nextLevel }));
}
```

객체 state도 마찬가지로 기존 값을 복사한 **새 객체로 교체**합니다.

---

## 10. 여러 state 사용하기

**• React: 여러 state 함께 사용하기**

```jsx
const [selectedCourse, setSelectedCourse] = useState(null);
const [completedCourseIds, setCompletedCourseIds] = useState([]);
```

두 state는 서로 독립적으로 관리되며, 한쪽을 바꿔도 다른 쪽에는 영향이 없습니다.

**💡 설명**

<div class="wda-callout wda-ci">
  여러 컴포넌트가 같은 값을 알아야 한다면, 공통 부모 컴포넌트(StudyDashboard)에 state를 두고 자식에게 props로 내려주는 방식을 사용합니다.
</div>

---

## 11. props와 state 비교

**▶ props와 state 비교**

<table class="wda-mtable">
  <tr>
    <th>구분</th>
    <th>props</th>
    <th>state</th>
  </tr>
  <tr>
    <td>출처</td>
    <td>부모 컴포넌트</td>
    <td>컴포넌트 자기 자신</td>
  </tr>
  <tr>
    <td>변경 가능 여부</td>
    <td>읽기 전용</td>
    <td>변경 가능</td>
  </tr>
  <tr>
    <td>변경 주체</td>
    <td>부모만 변경</td>
    <td>컴포넌트 자신이 변경</td>
  </tr>
</table>

---

## 12. 다음 학습 흐름

**💡 설명**

<div class="wda-callout wda-ci">
  복잡한 상태 로직(useReducer)과 전역 상태(Context)는 각각 <strong>4-2, 4-1</strong>에서 다룹니다. 이벤트 처리 상세는 <strong>2-5</strong>에서 다룹니다.
</div>

**▶ 주제별 다음 학습 문서**

<table class="wda-mtable">
  <tr>
    <th>주제</th>
    <th>자세히 다루는 문서</th>
  </tr>
  <tr>
    <td>이벤트 처리 상세</td>
    <td>2-5 이벤트 처리하기</td>
  </tr>
  <tr>
    <td>복잡한 상태 로직(useReducer)</td>
    <td>4-2 useReducer로 복잡한 상태 로직 관리하기</td>
  </tr>
  <tr>
    <td>전역 상태(Context)</td>
    <td>4-1 useContext로 전역 상태 다루기</td>
  </tr>
</table>

---

## 13. 초보자 실수

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">state를 직접 대입한다</div>
    <div class="wda-fcard-dsc">isCompleted = true처럼 직접 바꾸면 화면이 갱신되지 않는다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">setter를 즉시 실행되게 연결한다</div>
    <div class="wda-fcard-dsc">onClick={setIsCompleted(!isCompleted)}처럼 쓰면 렌더링 즉시 실행되어버린다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">배열/객체 state 내부를 직접 수정한다</div>
    <div class="wda-fcard-dsc">push나 속성 직접 대입은 React가 변경을 감지하지 못할 수 있다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">연속 업데이트에서 기본 방식만 사용한다</div>
    <div class="wda-fcard-dsc">이전 값에 의존하는 연속 변경은 함수형 업데이트를 써야 예상대로 동작한다.</div>
  </div>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>state는 컴포넌트 <strong>내부에서 생성하고 관리하는 데이터</strong>이며, 값은 반드시 <strong>setter 함수</strong>로만 변경한다.</li>
    <li><code>const [value, setValue] = useState(초기값)</code> 형태로 선언하며, 초기값은 <strong>맨 처음 렌더링될 때만</strong> 사용된다.</li>
    <li>state가 바뀌면 컴포넌트가 <strong>다시 렌더링</strong>되어 화면이 갱신된다.</li>
    <li>이전 값에 의존하는 업데이트는 <code>setValue(prev =&gt; ...)</code> 같은 <strong>함수형 업데이트</strong>를 사용한다.</li>
    <li>배열·객체 state는 직접 수정하지 않고 <strong>새 값으로 교체</strong>한다.</li>
    <li>props는 <strong>부모가 주는 읽기 전용</strong> 값, state는 <strong>컴포넌트 자신이 관리</strong>하는 변경 가능한 값이다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: state 값은 count = count + 1처럼 직접 대입해도 된다?</div>
    <div class="wda-mistake-right">정답: state는 <strong>setter 함수로만</strong> 바꿔야 React가 변경을 감지하고 화면을 갱신한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: onClick={setIsCompleted(!isCompleted)}처럼 써도 클릭할 때만 실행된다?</div>
    <div class="wda-mistake-right">정답: 괄호를 붙여 즉시 호출하면 <strong>렌더링되는 즉시 실행</strong>된다. 함수 참조만 전달해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: setValue(value + 1)을 연달아 호출하면 그만큼 값이 늘어난다?</div>
    <div class="wda-mistake-right">정답: 기본 방식은 같은 시점의 값을 참조해 <strong>예상보다 적게 증가</strong>할 수 있다. 연속 증가는 함수형 업데이트를 써야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 배열 state는 push로 추가해도 화면에 반영된다?</div>
    <div class="wda-mistake-right">정답: <code>push</code>는 원본을 직접 바꾸는 방식이라 React가 감지하지 못할 수 있다. <strong>새 배열</strong>로 교체해야 한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · State 정의</div>
    <div class="wda-formula-block-body"><code>내부 관리 + setter로 변경</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 기본 업데이트</div>
    <div class="wda-formula-block-body"><code>setValue(newValue)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 이전값 의존</div>
    <div class="wda-formula-block-body"><code>setValue(prev =&gt; ...)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · props vs state</div>
    <div class="wda-formula-block-body"><code>props = 읽기 전용, state = 변경 가능</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">state를 변경할 때 반드시 사용해야 하는 것은?</div>
    <div class="wda-flip-back">setter 함수다. 직접 대입하면 React가 변경을 감지하지 못한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">이전 state 값을 기반으로 안전하게 업데이트하는 방법은?</div>
    <div class="wda-flip-back">함수형 업데이트다. setValue(prev => ...)처럼 setter에 함수를 전달한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Props와 State의 가장 큰 차이는?</div>
    <div class="wda-flip-back">Props는 부모가 주는 읽기 전용 데이터, State는 컴포넌트 자신이 만들고 바꾸는 데이터다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">useState(false)에서 괄호 안 값은 언제 사용되나?</div>
    <div class="wda-flip-back">컴포넌트가 맨 처음 렌더링될 때만 초기값으로 사용된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">배열/객체 state를 안전하게 바꾸는 방법은?</div>
    <div class="wda-flip-back">직접 수정하지 않고, 기존 값을 복사한 새 배열/객체로 교체한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">state가 바뀌면 컴포넌트는 어떻게 되나?</div>
    <div class="wda-flip-back">다시 렌더링되어 화면이 새로 그려진다.</div>
  </div>
</div>
