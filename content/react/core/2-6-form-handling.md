---
title: "2-6 폼 입력 다루기"
status: "completed"
description: "새 학습 항목 입력 폼을 만들며 controlled component, value/onChange, submit 처리와 간단한 검증까지 React 폼 처리의 기초를 정리한다."
category: "React"
section: "Core"
tags:
  - react
  - form
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

## 🎯 학습 목표

<div class="wda-goal">
  • <strong>controlled component 이해하기</strong> — input 값을 state로 관리하는 방식을 이해합니다.<br>
  • <strong>다양한 입력 다루기</strong> — textarea, select, checkbox를 state와 연결하는 방법을 익힙니다.<br>
  • <strong>제출 처리하기</strong> — preventDefault와 간단한 검증으로 submit을 처리합니다.<br>
  • <strong>여러 입력 관리하기</strong> — 여러 input을 함께 다루는 기본 방식을 배웁니다.
</div>

---

## 1. form 처리가 필요한 순간

학습 목록에 새 항목을 추가하려면, 사용자가 입력창에 적은 제목을 어딘가에 저장해뒀다가 제출 시 사용해야 합니다. 이를 위해 input 값을 state로 관리하는 방법이 필요합니다.

---

## 2. input 값을 state로 관리한다

**• React: input 값을 state로 관리하기**

```jsx
const [newTitle, setNewTitle] = useState("");
```

---

## 3. controlled component

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">uncontrolled 입력</div>
    input이 자체적으로 값을 가지고 있어, React는 지금 값이 무엇인지 모른다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">controlled 입력</div>
    value를 state와 연결해, React state가 입력값의 기준이 된다.
  </div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  input의 value와 state를 연결해야 controlled component가 됩니다. value만 있고 onChange가 없으면 값을 바꿀 수 없는 읽기 전용처럼 동작합니다.
</div>

---

## 4. value와 onChange

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">value</div>
    화면에 보여줄 값을 state에서 가져온다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">onChange</div>
    사용자가 입력할 때마다 state를 갱신한다.
  </div>
</div>

**• React: value와 onChange로 controlled input 만들기**

```jsx
<input
  value={newTitle}
  onChange={(event) => setNewTitle(event.target.value)}
/>
```

---

## 5. textarea와 select

**• React: textarea와 select 다루기**

```jsx
<textarea
  value={description}
  onChange={(event) => setDescription(event.target.value)}
/>

<select value={category} onChange={(event) => setCategory(event.target.value)}>
  <option value="study">학습</option>
  <option value="review">복습</option>
</select>
```

textarea와 select도 input과 같은 방식으로 value와 onChange를 사용합니다.

---

## 6. checkbox 맛보기

**• React: checkbox 다루기**

```jsx
<input
  type="checkbox"
  checked={isImportant}
  onChange={(event) => setIsImportant(event.target.checked)}
/>
```

checkbox는 `value`가 아니라 `checked` 속성으로 상태를 표시하며, `event.target.checked`로 값을 읽습니다.

---

## 7. 여러 input 관리하기

**• React: 여러 input을 각각 state로 관리하기**

```jsx
const [newTitle, setNewTitle] = useState("");
const [category, setCategory] = useState("study");
```

여러 input은 각각 별도의 state로 관리할 수 있습니다. input 개수가 많아지면 하나의 객체로 묶어 관리하는 방식도 있지만, 처음에는 각각 따로 관리하는 방식이 이해하기 쉽습니다.

---

## 8. submit 처리와 preventDefault

**• React: submit 처리와 preventDefault**

```jsx
function handleSubmit(event) {
  event.preventDefault();
  // 제출 처리
}

<form onSubmit={handleSubmit}>
  <input value={newTitle} onChange={(event) => setNewTitle(event.target.value)} />
  <button type="submit">추가</button>
</form>
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">submit 기본 동작</div>
    폼이 제출되면 페이지가 새로고침된다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">preventDefault</div>
    <code>event.preventDefault()</code>로 새로고침을 막고 React가 제출을 처리한다.
  </div>
</div>

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">submit</div><div class="wda-fnode-dsc">버튼 클릭</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">검증</div><div class="wda-fnode-dsc">빈 값 확인</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">처리</div><div class="wda-fnode-dsc">목록에 추가 등</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">초기화</div><div class="wda-fnode-dsc">입력창 비우기</div></div>
</div>

---

## 9. 간단한 검증

**• React: 빈 값 검증하기**

```jsx
function handleSubmit(event) {
  event.preventDefault();

  if (!newTitle.trim()) {
    return;
  }

  // 제출 처리
}
```

빈 값이거나 공백만 입력했다면 제출을 막습니다.

---

## 10. 입력값 초기화

**• React: 제출 후 입력값 초기화하기**

```jsx
function handleSubmit(event) {
  event.preventDefault();

  if (!newTitle.trim()) {
    return;
  }

  setNewTitle("");
}
```

제출 후 `setNewTitle("")`으로 입력창을 비웁니다.

---

## 11. 다음 학습 흐름

**💡 설명**

<div class="wda-callout wda-ci">
  React Hook Form 같은 폼 라이브러리나 복잡한 검증은 이 문서에서 다루지 않습니다. 다양한 폼 입력을 직접 연습해보고 싶다면 <strong>실습: 폼 입력 훈련</strong> 문서에서 이어갈 수 있습니다.
</div>

---

## 12. 초보자 실수

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">onChange 없이 value만 쓴다</div>
    <div class="wda-fcard-dsc">입력이 전혀 되지 않는 읽기 전용 상태가 된다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">preventDefault를 빠뜨린다</div>
    <div class="wda-fcard-dsc">페이지가 새로고침되어 입력했던 state가 초기화된다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">빈 값 검증을 하지 않는다</div>
    <div class="wda-fcard-dsc">빈 제목으로도 항목이 추가될 수 있다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">checkbox에 value를 사용한다</div>
    <div class="wda-fcard-dsc">checkbox는 value가 아니라 checked로 상태를 제어해야 한다.</div>
  </div>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>input의 <strong>value</strong>를 state와 연결하면 <strong>controlled component</strong>가 된다.</li>
    <li>value와 <strong>onChange</strong>는 항상 세트로 작성한다.</li>
    <li>checkbox는 value 대신 <strong>checked</strong> 속성과 <code>event.target.checked</code>로 제어한다.</li>
    <li>폼 제출 시 <strong>event.preventDefault()</strong>로 새로고침을 막는다.</li>
    <li>제출 전 빈 값 등을 확인하는 <strong>간단한 검증</strong>을 거치고, 제출 후에는 입력값을 <strong>초기화</strong>한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: input에 value만 넣어주면 충분하다?</div>
    <div class="wda-mistake-right">정답: <code>onChange</code> 없이 value만 있으면 <strong>입력이 되지 않는다</strong>. 항상 세트로 작성한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: checkbox도 value로 선택 상태를 표시한다?</div>
    <div class="wda-mistake-right">정답: checkbox와 radio는 <strong>checked</strong> 속성으로 제어한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: onSubmit에서 preventDefault는 있어도 그만이다?</div>
    <div class="wda-mistake-right">정답: 안 쓰면 페이지가 <strong>새로고침</strong>되어 입력 state가 모두 초기화된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 검증 없이 제출해도 큰 문제가 없다?</div>
    <div class="wda-mistake-right">정답: 빈 값 검증이 없으면 <strong>빈 항목</strong>이 그대로 추가될 수 있다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 제어 원칙</div>
    <div class="wda-formula-block-body"><code>value + onChange = controlled</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · checkbox</div>
    <div class="wda-formula-block-body"><code>checked + onChange</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 제출</div>
    <div class="wda-formula-block-body"><code>event.preventDefault()</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · 흐름</div>
    <div class="wda-formula-block-body"><code>submit → 검증 → 처리 → 초기화</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">controlled component란?</div>
    <div class="wda-flip-back">input의 value를 state와 연결해, state가 입력값의 기준이 되는 방식이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">checkbox의 선택 상태를 제어하는 속성은?</div>
    <div class="wda-flip-back">checked다. value가 아니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">폼 제출 시 새로고침을 막으려면?</div>
    <div class="wda-flip-back">onSubmit 핸들러에서 event.preventDefault()를 호출한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">제출 후 입력창을 비우는 방법은?</div>
    <div class="wda-flip-back">setNewTitle("")처럼 state를 빈 값으로 다시 설정한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">간단한 검증은 언제 하나?</div>
    <div class="wda-flip-back">preventDefault 이후, 실제 처리 전에 빈 값 등을 확인한다.</div>
  </div>
</div>
