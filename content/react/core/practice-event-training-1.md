---
title: "실습: 이벤트 처리 훈련"
status: "completed"
description: "버튼 클릭으로 학습 상태를 변경하며 onClick 연결, 핸들러 분리, 인자 전달, 이벤트 객체 맛보기까지 다뤄보는 이벤트 처리 실습 문서다."
category: "React"
section: "Core"
tags:
  - react
  - event
  - practice
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

**💡 설명**

<div class="wda-callout wda-ci">
  이 문서는 개념을 처음 설명하는 문서가 아니라, <strong>2-5 이벤트 처리하기</strong>에서 배운 내용을 직접 코드로 적용해보는 실습 문서입니다.
</div>

## 🎯 실습 목표

<div class="wda-goal">
  버튼 클릭으로 학습 상태를 바꾸는 ActionButton을 만들며 onClick 연결, 핸들러 분리, 인자 전달, 이벤트 객체를 다뤄봅니다.
</div>

---

## 1단계: onClick 기본 연결

**• React: onClick 기본 연결하기**

```jsx
function handleClick() {
  console.log("클릭됨");
}

<button onClick={handleClick}>학습 완료</button>
```

---

## 2단계: 인자를 전달하는 핸들러 분리

**• React: 인자를 전달하는 핸들러 분리하기**

```jsx
function handleClick(label) {
  console.log(`${label} 버튼 클릭`);
}

<button onClick={() => handleClick("학습 완료")}>학습 완료</button>
```

---

## 3단계: 함수 즉시 실행 실수 확인

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">잘못된 방식</div>
    <code>onClick={handleClick("학습 완료")}</code> — 렌더링되는 즉시 실행된다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">올바른 방식</div>
    <code>onClick={() =&gt; handleClick("학습 완료")}</code> — 클릭할 때만 실행된다.
  </div>
</div>

---

## 4단계: 이벤트 객체로 입력값 읽기

**• React: 이벤트 객체로 입력값 읽기**

```jsx
function handleFilterChange(event) {
  console.log(event.target.value);
}

<input onChange={handleFilterChange} placeholder="필터 입력" />
```

---

## 5단계: state 변경과 연결하기

**• React: 이벤트를 state 변경과 연결하기**

```jsx
const [selectedStatus, setSelectedStatus] = useState("progress");

function handleClick(label) {
  setSelectedStatus(label);
}
```

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">클릭</div><div class="wda-fnode-dsc">버튼 클릭</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">handler 실행</div><div class="wda-fnode-dsc">handleClick(label)</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">setter 호출</div><div class="wda-fnode-dsc">setSelectedStatus</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">re-render</div><div class="wda-fnode-dsc">화면에 상태 표시</div></div>
</div>

---

## 완성 코드

**• React: ActionButton 완성 코드**

```jsx
import { useState } from "react";

function ActionButton() {
  const [selectedStatus, setSelectedStatus] = useState("progress");

  function handleClick(label) {
    console.log(`${label} 버튼 클릭`);
    setSelectedStatus(label);
  }

  function handleFilterChange(event) {
    console.log(event.target.value);
  }

  return (
    <section>
      <p>현재 상태: {selectedStatus}</p>
      <button onClick={() => handleClick("완료")}>학습 완료</button>
      <button onClick={() => handleClick("진행중")}>진행 중으로 변경</button>
      <input onChange={handleFilterChange} placeholder="필터 입력" />
    </section>
  );
}

export default ActionButton;
```

---

## 확인 포인트

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">클릭 반응</div>
    <div class="wda-fcard-dsc">버튼을 누르면 화면의 상태 텍스트가 바뀐다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">인자 전달</div>
    <div class="wda-fcard-dsc">두 버튼이 각각 다른 label 값을 handleClick에 전달한다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">이벤트 객체</div>
    <div class="wda-fcard-dsc">입력창에 타이핑하면 콘솔에 입력값이 찍힌다.</div>
  </div>
</div>

---

## 흔한 실수

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">함수를 즉시 실행되게 전달한다</div>
    <div class="wda-fcard-dsc">onClick={handleClick("완료")}처럼 쓰면 렌더링 즉시 실행된다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">wrapper 함수를 빠뜨린다</div>
    <div class="wda-fcard-dsc">인자가 필요하면 화살표 함수로 감싸야 한다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">이벤트 객체 없이 값을 읽으려 한다</div>
    <div class="wda-fcard-dsc">입력값은 event.target.value로 꺼내야 한다.</div>
  </div>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>이벤트 핸들러에는 <strong>함수 자체</strong>를 전달하며, 괄호를 붙이면 즉시 실행된다.</li>
    <li>인자가 필요하면 <strong>화살표 함수로 감싸서</strong> 전달한다.</li>
    <li>이벤트 객체는 <strong>event.target.value</strong>처럼 필요한 값을 꺼낼 때 사용한다.</li>
    <li>핸들러 안에서 setter를 호출하면 state가 바뀌고 <strong>화면이 다시 렌더링</strong>된다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: onClick={handleClick("완료")}처럼 괄호를 붙여도 클릭할 때만 실행된다?</div>
    <div class="wda-mistake-right">정답: 괄호를 붙이면 <strong>렌더링 즉시 실행</strong>된다. 인자가 필요하면 화살표 함수로 감싸야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 입력값은 별도 변수로 바로 접근할 수 있다?</div>
    <div class="wda-mistake-right">정답: <strong>이벤트 객체</strong>를 통해 <code>event.target.value</code>로 꺼내야 한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 함수 전달</div>
    <div class="wda-formula-block-body"><code>참조 O, 호출() X</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 인자 전달</div>
    <div class="wda-formula-block-body"><code>() =&gt; handler(value)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 흐름</div>
    <div class="wda-formula-block-body"><code>클릭 → handler → setter → re-render</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">인자를 전달하는 이벤트 핸들러 패턴은?</div>
    <div class="wda-flip-back">() => handleClick(label)처럼 화살표 함수로 감싼다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">입력값을 읽는 방법은?</div>
    <div class="wda-flip-back">event.target.value로 읽는다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">클릭이 화면 갱신으로 이어지는 흐름은?</div>
    <div class="wda-flip-back">클릭 → handler 실행 → setter 호출 → re-render 순서다.</div>
  </div>
</div>
