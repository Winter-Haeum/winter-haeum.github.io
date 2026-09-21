---
title: "실습: 폼 입력 훈련"
status: "completed"
description: "새 학습 항목 입력 폼을 만들며 controlled component, value/onChange, submit 처리, 간단한 검증까지 다뤄보는 폼 처리 실습 문서다."
category: "React"
section: "Core"
tags:
  - react
  - form
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
  이 문서는 개념을 처음 설명하는 문서가 아니라, <strong>2-6 폼 입력 다루기</strong>에서 배운 내용을 직접 코드로 적용해보는 실습 문서입니다.
</div>

## 🎯 실습 목표

<div class="wda-goal">
  새 학습 항목 입력 폼(LearningForm)을 만들며 controlled component, submit 처리, 간단한 검증을 다뤄봅니다.
</div>

---

## 1단계: 제목 입력을 state로 관리하기

**• React: 제목 입력을 state로 관리하기**

```jsx
const [title, setTitle] = useState("");

<input
  value={title}
  onChange={(event) => setTitle(event.target.value)}
  placeholder="강의 제목"
/>
```

---

## 2단계: 두 번째 입력 필드 추가하기

비밀번호는 입력 필드의 한 종류로 다루며, 다른 입력과 마찬가지로 value/onChange로 state와 연결합니다.

**• React: 비밀번호 입력 필드 추가하기**

```jsx
const [password, setPassword] = useState("");

<input
  type="password"
  value={password}
  onChange={(event) => setPassword(event.target.value)}
  placeholder="비밀번호"
/>
```

---

## 3단계: submit 처리와 preventDefault

**• React: submit 처리와 preventDefault**

```jsx
function handleSubmit(event) {
  event.preventDefault();
}

<form onSubmit={handleSubmit}>
  ...
</form>
```

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">submit</div><div class="wda-fnode-dsc">버튼 클릭</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">검증</div><div class="wda-fnode-dsc">빈 값 확인</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">처리</div><div class="wda-fnode-dsc">isSubmitted 표시</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">초기화</div><div class="wda-fnode-dsc">입력창 비우기</div></div>
</div>

---

## 4단계: 간단한 검증 추가하기

**• React: 빈 값 검증 추가하기**

```jsx
function handleSubmit(event) {
  event.preventDefault();

  if (title.trim() === "") {
    return;
  }
}
```

---

## 5단계: 제출 결과 표시와 초기화

**• React: 제출 결과 표시와 입력값 초기화**

```jsx
function handleSubmit(event) {
  event.preventDefault();

  if (title.trim() === "") {
    return;
  }

  setIsSubmitted(true);
  setTitle("");
  setPassword("");
}
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">submit 기본 동작</div>
    폼이 제출되면 페이지가 새로고침된다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">preventDefault 적용</div>
    새로고침을 막고 React가 제출을 직접 처리한다.
  </div>
</div>

---

## 완성 코드

**• React: LearningForm 완성 코드**

```jsx
import { useState } from "react";

function LearningForm() {
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (title.trim() === "") {
      return;
    }

    setIsSubmitted(true);
    setTitle("");
    setPassword("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="강의 제목"
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="비밀번호"
      />
      <button type="submit">저장</button>
      {isSubmitted && <p>저장되었습니다.</p>}
    </form>
  );
}

export default LearningForm;
```

---

## 확인 포인트

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">controlled 입력</div>
    <div class="wda-fcard-dsc">두 입력창 모두 타이핑한 내용이 바로 반영된다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">검증</div>
    <div class="wda-fcard-dsc">제목이 비어 있으면 제출되지 않는다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">제출 후 초기화</div>
    <div class="wda-fcard-dsc">저장 메시지가 뜨고 입력창이 비워진다.</div>
  </div>
</div>

---

## 흔한 실수

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">onChange 없이 value만 쓴다</div>
    <div class="wda-fcard-dsc">입력이 되지 않는 읽기 전용 상태가 된다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">preventDefault를 빠뜨린다</div>
    <div class="wda-fcard-dsc">페이지가 새로고침되어 입력했던 state가 사라진다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">빈 값 검증을 하지 않는다</div>
    <div class="wda-fcard-dsc">빈 제목으로도 제출이 처리될 수 있다.</div>
  </div>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>input의 <strong>value</strong>를 state와 연결하면 controlled component가 된다.</li>
    <li>value와 <strong>onChange</strong>는 항상 세트로 작성한다.</li>
    <li>폼 제출 시 <strong>event.preventDefault()</strong>로 새로고침을 막는다.</li>
    <li>제출 전 <strong>빈 값 검증</strong>을 거치고, 제출 후에는 입력값을 <strong>초기화</strong>한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: value만 있으면 controlled component로 충분하다?</div>
    <div class="wda-mistake-right">정답: <strong>onChange</strong>가 없으면 입력이 되지 않으므로 항상 세트로 작성한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: preventDefault는 있어도 그만이다?</div>
    <div class="wda-mistake-right">정답: 없으면 <strong>페이지가 새로고침</strong>되어 입력 state가 초기화된다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 제어 원칙</div>
    <div class="wda-formula-block-body"><code>value + onChange</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 제출</div>
    <div class="wda-formula-block-body"><code>event.preventDefault()</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 흐름</div>
    <div class="wda-formula-block-body"><code>submit → 검증 → 처리 → 초기화</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">폼 제출 시 새로고침을 막으려면?</div>
    <div class="wda-flip-back">onSubmit 핸들러에서 event.preventDefault()를 호출한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">제출 후 입력창을 비우는 방법은?</div>
    <div class="wda-flip-back">setTitle(""), setPassword("")처럼 state를 빈 값으로 다시 설정한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">빈 제목 제출을 막으려면?</div>
    <div class="wda-flip-back">preventDefault 이후 title.trim()이 빈 문자열인지 확인하고 return한다.</div>
  </div>
</div>
