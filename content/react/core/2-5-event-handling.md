---
title: "2-5 이벤트 처리하기"
status: "completed"
description: "학습 완료 버튼과 필터 버튼 클릭을 처리하며 onClick 연결 방식, 인자 전달, 이벤트 객체 맛보기까지 React 이벤트 처리의 기초를 정리한다."
category: "React"
section: "Core"
tags:
  - react
  - event
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
  • <strong>이벤트 연결 방식 이해하기</strong> — JSX에서 이벤트를 props처럼 연결하는 방식을 이해합니다.<br>
  • <strong>이벤트 핸들러 작성하기</strong> — onClick 핸들러를 분리하고 인자를 전달하는 방법을 익힙니다.<br>
  • <strong>이벤트 객체 맛보기</strong> — 이벤트가 발생했을 때 전달되는 정보를 살짝 확인합니다.<br>
  • <strong>state 변경 연결하기</strong> — 이벤트로 state를 바꾸는 흐름을 이해합니다.
</div>

---

## 1. 이벤트 처리가 필요한 순간

학습 항목 목록에서 "완료" 버튼을 누르거나 필터 버튼을 클릭했을 때, 그 동작에 반응해서 state를 바꿔야 합니다. 이를 위해 JSX 요소에 이벤트를 연결하는 방법이 필요합니다.

---

## 2. JSX에서 이벤트를 연결한다

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">DOM addEventListener</div>
    요소를 찾은 뒤 <code>addEventListener</code>로 이벤트를 등록한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">React 이벤트 prop</div>
    <code>onClick</code>처럼 JSX 속성으로 바로 연결한다.
  </div>
</div>

---

## 3. onClick 기본

**• React: onClick 기본 사용법**

```jsx
function LearningItem() {
  function handleComplete() {
    console.log("완료 처리");
  }

  return <button onClick={handleComplete}>완료</button>;
}
```

---

## 4. 이벤트 핸들러 함수 분리

버튼 안에 로직을 바로 적을 수도 있지만, 로직이 길어지면 함수로 분리하는 것이 읽기 좋습니다.

**• React: 인라인 핸들러와 분리된 핸들러 비교**

```jsx
// 인라인
<button onClick={() => console.log("완료 처리")}>완료</button>

// 분리
function handleComplete() {
  console.log("완료 처리");
}

<button onClick={handleComplete}>완료</button>
```

---

## 5. 인자를 전달하는 방법

**• React: 핸들러에 인자 전달하기**

```jsx
function handleComplete(itemId) {
  console.log(itemId + " 완료 처리");
}

<button onClick={() => handleComplete(item.id)}>완료</button>
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">함수 전달</div>
    <code>onClick={handleComplete}</code> — 클릭할 때만 실행된다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">함수 즉시 실행</div>
    <code>onClick={handleComplete()}</code> — 렌더링되는 즉시 실행되어버린다.
  </div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  이벤트 핸들러에는 함수 자체를 전달합니다. 인자가 필요하면 <code>() =&gt; handleComplete(item.id)</code>처럼 화살표 함수로 감싸서 전달합니다.
</div>

---

## 6. 이벤트 객체 맛보기

이벤트가 발생하면 React가 이벤트 정보를 담은 객체를 핸들러에 전달합니다.

**• React: 이벤트 객체 사용하기**

```jsx
function handleFilterChange(event) {
  console.log(event.target.value);
}
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">이벤트 객체 직접 사용</div>
    <code>event</code> 전체를 넘겨받아 필요할 때 꺼내 쓴다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">필요한 값만 꺼내기</div>
    <code>event.target.value</code>처럼 필요한 값만 바로 사용한다.
  </div>
</div>

---

## 7. onChange와 onSubmit 맛보기

**• React: onChange와 onSubmit 맛보기**

```jsx
<input onChange={handleFilterChange} />
<form onSubmit={handleSubmit}>...</form>
```

**💡 설명**

<div class="wda-callout wda-ci">
  onChange로 입력값을 다루는 방법과 onSubmit으로 폼을 제출하는 방법은 <strong>2-6 폼 입력 다루기</strong>에서 자세히 다룹니다.
</div>

---

## 8. 이벤트와 state 변경 연결

**• React: 이벤트로 state 변경 연결하기**

```jsx
function LearningItem({ id, isCompleted, onComplete }) {
  return (
    <button onClick={() => onComplete(id)}>
      {isCompleted ? "완료" : "진행 중"}
    </button>
  );
}
```

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">사용자 동작</div><div class="wda-fnode-dsc">버튼 클릭</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">handler 실행</div><div class="wda-fnode-dsc">onComplete(id)</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">setter 호출</div><div class="wda-fnode-dsc">state 변경</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">re-render</div><div class="wda-fnode-dsc">화면 갱신</div></div>
</div>

---

## 9. DOM 이벤트 방식과 다른 점

React 이벤트는 카멜케이스(`onClick`)로 작성하며, 함수를 값으로 전달합니다. `addEventListener`로 직접 요소를 찾아 등록하는 방식과는 다릅니다.

DOM 이벤트 등록 방식 자체는 JavaScript DOM 문서에서 다뤘으므로 여기서는 반복하지 않습니다.

---

## 10. 다음 학습 흐름

**▶ 주제별 다음 학습 문서**

<table class="wda-mtable">
  <tr>
    <th>주제</th>
    <th>자세히 다루는 문서</th>
  </tr>
  <tr>
    <td>onChange/onSubmit·폼 제출 상세</td>
    <td>2-6 폼 입력 다루기</td>
  </tr>
  <tr>
    <td>조건에 따른 화면 전환</td>
    <td>2-7 조건부 렌더링</td>
  </tr>
</table>

---

## 11. 초보자 실수

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">함수를 즉시 실행되게 전달한다</div>
    <div class="wda-fcard-dsc"><code>onClick={handleComplete()}</code>처럼 괄호를 붙이면 렌더링 즉시 실행된다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">인자 전달 시 wrapper 함수를 빼먹는다</div>
    <div class="wda-fcard-dsc">인자가 필요하면 화살표 함수로 감싸야 한다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">이벤트 이름을 소문자로 쓴다</div>
    <div class="wda-fcard-dsc">onclick이 아니라 camelCase인 onClick으로 써야 한다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">이벤트 객체 없이 값에 바로 접근하려 한다</div>
    <div class="wda-fcard-dsc">입력값은 이벤트 객체를 통해 event.target.value로 꺼내야 한다.</div>
  </div>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>React 이벤트는 <strong>camelCase</strong>로 작성하며, JSX 속성으로 함수를 <strong>연결</strong>한다.</li>
    <li>이벤트 핸들러에는 <strong>함수 자체(참조)</strong>를 전달해야 하며, 괄호를 붙이면 즉시 실행된다.</li>
    <li>인자를 전달해야 할 때는 <code>() =&gt; handler(value)</code>처럼 <strong>화살표 함수로 감싸서</strong> 전달한다.</li>
    <li>이벤트가 발생하면 React가 <strong>이벤트 객체</strong>를 핸들러에 전달하며, <code>event.target.value</code>로 입력값을 꺼낼 수 있다.</li>
    <li>이벤트 핸들러 안에서 setter를 호출하면 state가 바뀌고 화면이 <strong>다시 렌더링</strong>된다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: <code>onClick={handleComplete()}</code>처럼 괄호를 붙여도 클릭할 때만 실행된다?</div>
    <div class="wda-mistake-right">정답: 괄호를 붙이면 <strong>렌더링되는 즉시 실행</strong>된다. 함수 이름만 전달해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 인자를 전달할 때도 <code>onClick={handleComplete(id)}</code>처럼 바로 써도 된다?</div>
    <div class="wda-mistake-right">정답: <code>() =&gt; handleComplete(id)</code>처럼 <strong>화살표 함수로 감싸야</strong> 클릭 시에만 실행된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: HTML 습관대로 onclick처럼 소문자로 써도 동작한다?</div>
    <div class="wda-mistake-right">정답: React는 <strong>camelCase만 인식</strong>하며, onclick으로 쓰면 이벤트가 연결되지 않는다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: onChange와 onSubmit도 이 문서에서 전부 다룬다?</div>
    <div class="wda-mistake-right">정답: 기본 연결 방식만 맛보기로 다루며, 상세 활용은 <strong>2-6</strong>에서 이어진다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 표기법</div>
    <div class="wda-formula-block-body"><code>camelCase (onClick)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 함수 전달</div>
    <div class="wda-formula-block-body"><code>참조 O, 호출() X</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 인자 전달</div>
    <div class="wda-formula-block-body"><code>() =&gt; handler(value)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · 흐름</div>
    <div class="wda-formula-block-body"><code>동작 → handler → setter → re-render</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">React 이벤트 속성은 어떤 표기법을 쓰나?</div>
    <div class="wda-flip-back">camelCase다. 예: onClick, onChange.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">이벤트 핸들러에 인자를 전달하는 방법은?</div>
    <div class="wda-flip-back">화살표 함수로 감싸는 패턴이다. onClick={() => handleComplete(id)}</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">onClick={handler()}처럼 괄호를 붙이면?</div>
    <div class="wda-flip-back">렌더링되는 즉시 실행되어버린다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">입력값은 이벤트 객체에서 어떻게 꺼내나?</div>
    <div class="wda-flip-back">event.target.value로 꺼낸다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">onChange/onSubmit 상세는 어디서 다루나?</div>
    <div class="wda-flip-back">2-6 폼 입력 다루기에서 다룬다.</div>
  </div>
</div>
