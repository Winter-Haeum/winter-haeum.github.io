---
title: "실습: state 활용 훈련"
status: "completed"
description: "학습 진행 상태 카드를 만들며 숫자/문자열/불리언/배열/객체 state를 직접 다뤄보는 useState 실습 문서다."
category: "React"
section: "Core"
tags:
  - react
  - state
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
  이 문서는 개념을 처음 설명하는 문서가 아니라, <strong>2-4 state로 상태 관리하기</strong>에서 배운 내용을 직접 코드로 적용해보는 실습 문서입니다.
</div>

## 🎯 실습 목표

<div class="wda-goal">
  학습 진행 상태 카드(ProgressCard)를 만들면서 숫자, 문자열, 불리언, 배열, 객체 state를 각각 다뤄봅니다.
</div>

---

## 1단계: 숫자 state로 완료 개수 세기

**• React: 숫자 state로 count 증가시키기**

```jsx
const [count, setCount] = useState(0);

function handleAddCount() {
  setCount((prev) => prev + 1);
}
```

---

## 2단계: 불리언 state로 진행 상태 전환하기

**• React: 불리언 state로 완료 상태 토글하기**

```jsx
const [isCompleted, setIsCompleted] = useState(false);

function handleToggleCompleted() {
  setIsCompleted((prev) => !prev);
}
```

---

## 3단계: 문자열 state로 입력값 연결하기

**• React: 문자열 state를 input과 연결하기**

```jsx
const [title, setTitle] = useState("");

<input value={title} onChange={(event) => setTitle(event.target.value)} />
```

---

## 4단계: 배열 state에 항목 추가/삭제하기

**• React: 배열 state에 항목 추가·삭제하기**

```jsx
const [completedTitles, setCompletedTitles] = useState([]);

function handleAddTitle() {
  if (!title.trim()) return;

  const newItem = { id: Date.now(), text: title };
  setCompletedTitles((prev) => [...prev, newItem]);
  setTitle("");
}

function handleRemoveTitle(id) {
  setCompletedTitles((prev) => prev.filter((item) => item.id !== id));
}
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">잘못된 방식</div>
    <code>completedTitles.push(newItem)</code> — 원본 배열을 직접 바꾼다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">올바른 방식</div>
    <code>setCompletedTitles(prev =&gt; [...prev, newItem])</code> — 새 배열로 교체한다.
  </div>
</div>

---

## 5단계: 객체 state 업데이트하기

**• React: 객체 state 업데이트하기**

```jsx
const [summary, setSummary] = useState({ total: 0, lastTitle: "" });

function handleUpdateSummary(newTitle) {
  setSummary((prev) => ({ ...prev, total: prev.total + 1, lastTitle: newTitle }));
}
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <code>summary.total = summary.total + 1</code>처럼 객체를 직접 수정하지 않습니다. 항상 <code>{ ...prev, ... }</code>처럼 복사한 새 객체로 교체합니다.
</div>

---

## 완성 코드

**• React: ProgressCard 완성 코드**

```jsx
import { useState } from "react";

function ProgressCard() {
  const [count, setCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [title, setTitle] = useState("");
  const [completedTitles, setCompletedTitles] = useState([]);
  const [summary, setSummary] = useState({ total: 0, lastTitle: "" });

  function handleAddCount() {
    setCount((prev) => prev + 1);
  }

  function handleToggleCompleted() {
    setIsCompleted((prev) => !prev);
  }

  function handleAddTitle() {
    if (!title.trim()) return;

    const newItem = { id: Date.now(), text: title };
    setCompletedTitles((prev) => [...prev, newItem]);
    setSummary((prev) => ({ ...prev, total: prev.total + 1, lastTitle: title }));
    setTitle("");
  }

  function handleRemoveTitle(id) {
    setCompletedTitles((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <section>
      <p>완료한 항목: {count}</p>
      <button onClick={handleAddCount}>하나 완료</button>

      <p>상태: {isCompleted ? "완료" : "진행 중"}</p>
      <button onClick={handleToggleCompleted}>상태 바꾸기</button>

      <input value={title} onChange={(event) => setTitle(event.target.value)} />
      <button onClick={handleAddTitle}>목록에 추가</button>

      <ul>
        {completedTitles.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => handleRemoveTitle(item.id)}>삭제</button>
          </li>
        ))}
      </ul>

      <p>총 {summary.total}개, 마지막 항목: {summary.lastTitle}</p>
    </section>
  );
}

export default ProgressCard;
```

---

## 확인 포인트

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">숫자/불리언</div>
    <div class="wda-fcard-dsc">버튼을 누를 때마다 count가 늘고, 상태 텍스트가 반전된다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">문자열</div>
    <div class="wda-fcard-dsc">입력창에 타이핑한 내용이 바로 반영된다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">배열</div>
    <div class="wda-fcard-dsc">추가 버튼으로 목록이 늘고, 삭제 버튼으로 해당 항목만 사라진다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">객체</div>
    <div class="wda-fcard-dsc">total과 lastTitle이 항목을 추가할 때마다 갱신된다.</div>
  </div>
</div>

---

## 흔한 실수

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">state를 직접 대입한다</div>
    <div class="wda-fcard-dsc">count = count + 1처럼 쓰면 화면이 갱신되지 않는다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">배열에 push를 사용한다</div>
    <div class="wda-fcard-dsc">원본을 직접 바꾸므로 새 배열로 교체해야 한다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">객체 속성을 직접 수정한다</div>
    <div class="wda-fcard-dsc">summary.total++ 대신 스프레드로 새 객체를 만들어야 한다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">이전 값을 사용하지 않는다</div>
    <div class="wda-fcard-dsc">연속 갱신이 필요할 때는 함수형 업데이트가 더 안전하다.</div>
  </div>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>숫자·불리언 state는 <strong>함수형 업데이트</strong>(<code>prev =&gt; ...</code>)로 안전하게 바꾼다.</li>
    <li>문자열 state는 <strong>value/onChange</strong>로 input과 연결한다.</li>
    <li>배열 state는 <strong>spread로 추가</strong>, <strong>filter로 삭제</strong>한다.</li>
    <li>객체 state는 <strong>{ ...prev, key: value }</strong> 형태로 새 객체를 만들어 교체한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: setCount(count + 1)과 setCount(prev =&gt; prev + 1)은 항상 같은 결과다?</div>
    <div class="wda-mistake-right">정답: 연속 호출 시 결과가 다를 수 있어, 이전 값에 의존할 때는 <strong>함수형 업데이트</strong>가 더 안전하다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 배열/객체 state도 일반 변수처럼 바로 수정해도 된다?</div>
    <div class="wda-mistake-right">정답: 직접 수정하면 React가 변경을 감지하지 못할 수 있어 <strong>새 값으로 교체</strong>해야 한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 숫자/불리언</div>
    <div class="wda-formula-block-body"><code>setState(prev =&gt; ...)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 배열 추가/삭제</div>
    <div class="wda-formula-block-body"><code>[...prev, item] / prev.filter(...)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 객체</div>
    <div class="wda-formula-block-body"><code>{ ...prev, key: value }</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">배열에 항목을 추가하는 안전한 방법은?</div>
    <div class="wda-flip-back">setState(prev => [...prev, newItem])처럼 기존 배열을 복사한 새 배열을 만든다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">배열에서 항목을 삭제하는 안전한 방법은?</div>
    <div class="wda-flip-back">filter()로 조건에 맞는 항목만 남긴 새 배열을 만든다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">객체 state의 한 속성만 바꾸려면?</div>
    <div class="wda-flip-back">{ ...prev, key: value }처럼 나머지는 복사하고 바뀐 속성만 덮어쓴다.</div>
  </div>
</div>
