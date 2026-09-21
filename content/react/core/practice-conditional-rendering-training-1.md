---
title: "실습: 조건부 렌더링 훈련"
status: "completed"
description: "로딩/에러/빈 목록 상태에 따라 학습 화면을 다르게 보여주며 if, 삼항 연산자, &&, early return을 다뤄보는 조건부 렌더링 실습 문서다."
category: "React"
section: "Core"
tags:
  - react
  - conditional-rendering
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
  이 문서는 개념을 처음 설명하는 문서가 아니라, <strong>2-7 조건부 렌더링</strong>에서 배운 내용을 직접 코드로 적용해보는 실습 문서입니다.
</div>

## 🎯 실습 목표

<div class="wda-goal">
  로딩/에러/빈 목록 상태에 따라 다른 메시지를 보여주는 LearningMessage를 만들며 if, 삼항 연산자, &&, early return을 다뤄봅니다.
</div>

---

## 1단계: if로 로딩/에러 상태 분기하기

**• React: if로 로딩·에러 상태 분기하기**

```jsx
function LearningMessage({ isLoading, errorMessage, items }) {
  if (isLoading) {
    return <p>불러오는 중입니다.</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }
}
```

---

## 2단계: 빈 목록 상태 추가하기 (early return)

**• React: early return으로 빈 목록 처리하기**

```jsx
if (items.length === 0) {
  return <p>아직 학습 항목이 없습니다.</p>;
}
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">early return 없이</div>
    조건마다 else로 중첩되어 코드가 깊어진다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">early return 사용</div>
    각 상태를 먼저 확인하고 바로 반환해 중첩이 없다.
  </div>
</div>

---

## 3단계: 삼항 연산자로 상태 뱃지 표시하기

**• React: 삼항 연산자로 상태 뱃지 표시하기**

```jsx
<span>{isLoading ? "로딩 중" : "준비 완료"}</span>
```

---

## 4단계: &&로 안내 문구 표시하기

**• React: &&로 안내 문구 표시하기**

```jsx
{errorMessage && <p className="error">{errorMessage}</p>}
```

---

## 5단계: 상태를 바꿔가며 확인하기

버튼으로 상태를 바꿔가며 LearningMessage가 어떻게 달라지는지 확인합니다.

**• React: 상태를 바꿔가며 확인하기**

```jsx
const [status, setStatus] = useState("loading");

const isLoading = status === "loading";
const errorMessage = status === "error" ? "문제가 발생했습니다." : "";
const items = status === "empty" ? [] : [{ id: 1, title: "JSX 기초" }];
```

---

## 완성 코드

**• React: LearningMessage 완성 코드**

```jsx
import { useState } from "react";

function LearningMessage({ isLoading, errorMessage, items }) {
  if (isLoading) {
    return <p>불러오는 중입니다.</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  if (items.length === 0) {
    return <p>아직 학습 항목이 없습니다.</p>;
  }

  return <p>학습 항목을 확인하세요.</p>;
}

function PracticeDashboard() {
  const [status, setStatus] = useState("loading");

  const isLoading = status === "loading";
  const errorMessage = status === "error" ? "문제가 발생했습니다." : "";
  const items = status === "empty" ? [] : [{ id: 1, title: "JSX 기초" }];

  return (
    <div>
      <LearningMessage isLoading={isLoading} errorMessage={errorMessage} items={items} />
      <button onClick={() => setStatus("loading")}>로딩</button>
      <button onClick={() => setStatus("error")}>에러</button>
      <button onClick={() => setStatus("empty")}>빈 목록</button>
      <button onClick={() => setStatus("ready")}>정상</button>
    </div>
  );
}

export default PracticeDashboard;
```

---

## 확인 포인트

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">로딩</div>
    <div class="wda-fcard-dsc">"로딩" 버튼을 누르면 "불러오는 중입니다."가 보인다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">에러</div>
    <div class="wda-fcard-dsc">"에러" 버튼을 누르면 에러 메시지가 보인다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">빈 목록/정상</div>
    <div class="wda-fcard-dsc">"빈 목록"과 "정상" 버튼에 따라 다른 문구가 보인다.</div>
  </div>
</div>

---

## 흔한 실수

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">중괄호 안에 if문을 넣으려 한다</div>
    <div class="wda-fcard-dsc">JSX 중괄호에는 표현식만 들어갈 수 있다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">상태 확인 순서를 뒤섞는다</div>
    <div class="wda-fcard-dsc">loading → error → empty 순서로 먼저 해당하는 것을 반환해야 한다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">early return을 쓰지 않는다</div>
    <div class="wda-fcard-dsc">중첩된 if-else보다 먼저 반환하는 편이 읽기 쉽다.</div>
  </div>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><strong>if</strong>는 JSX 밖에서 예외 상태를 먼저 처리하는 <strong>early return</strong>에 적합하다.</li>
    <li><strong>삼항 연산자</strong>는 JSX 안에서 둘 중 하나를 선택해 보여줄 때 사용한다.</li>
    <li><strong>&&</strong>는 조건이 참일 때만 보여주고 싶을 때 사용한다.</li>
    <li>loading·error·empty 상태는 <strong>순서대로 확인</strong>하고 먼저 해당하는 것을 반환한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: loading/error/empty 순서는 상관없다?</div>
    <div class="wda-mistake-right">정답: <strong>먼저 해당하는 상태</strong>를 반환하므로 순서가 중요하다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: JSX 중괄호 안에 if-else를 그대로 쓸 수 있다?</div>
    <div class="wda-mistake-right">정답: 중괄호 안에는 <strong>표현식</strong>만 가능해, 삼항 연산자나 &&를 사용해야 한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · early return</div>
    <div class="wda-formula-block-body"><code>if (조건) return ...;</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 상태 순서</div>
    <div class="wda-formula-block-body"><code>loading → error → empty → 정상</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · JSX 안</div>
    <div class="wda-formula-block-body"><code>?: (선택) / && (있으면 표시)</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">LearningMessage가 상태를 확인하는 순서는?</div>
    <div class="wda-flip-back">loading → error → empty → 정상 순서로 먼저 해당하는 것을 반환한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">early return의 장점은?</div>
    <div class="wda-flip-back">예외 상태를 먼저 처리해 중첩된 if-else 없이 코드가 간결해진다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">삼항 연산자와 &&의 사용 기준은?</div>
    <div class="wda-flip-back">삼항 연산자는 둘 중 하나를 선택, &&는 조건이 참일 때만 보여줄 때 사용한다.</div>
  </div>
</div>
