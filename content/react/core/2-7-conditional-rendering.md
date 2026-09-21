---
title: "2-7 조건부 렌더링"
status: "completed"
description: "로딩/에러/빈 목록/완료 상태에 따라 학습 화면을 다르게 보여주며 if, 삼항 연산자, &&, early return까지 React 조건부 렌더링의 기초를 정리한다."
category: "React"
section: "Core"
tags:
  - react
  - conditional-rendering
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
  • <strong>조건부 렌더링 개념 이해하기</strong> — 조건에 따라 다른 UI를 보여주는 방법을 이해합니다.<br>
  • <strong>여러 패턴 익히기</strong> — if, 삼항 연산자, && 연산자를 상황에 맞게 사용합니다.<br>
  • <strong>상태별 화면 구성하기</strong> — loading/error/empty 상태에 따라 다른 화면을 보여줍니다.<br>
  • <strong>정리 기준 익히기</strong> — 조건이 복잡해질 때 분리하는 기준을 이해합니다.
</div>

---

## 1. 조건부 렌더링이 필요한 순간

학습 목록 화면은 데이터를 불러오는 중인지, 에러가 났는지, 항목이 하나도 없는지, 정상적으로 목록이 있는지에 따라 서로 다른 화면을 보여줘야 합니다. 상황에 따라 다른 UI를 보여주는 방법이 필요합니다.

---

## 2. if로 먼저 분기하기

if문은 JSX 중괄호 안에서 쓸 수 없습니다. 대신 컴포넌트 함수 안, return 이전에서 조건을 검사합니다.

**• React: if문으로 먼저 분기하기**

```jsx
function LearningStatus({ isLoading, errorMessage }) {
  if (isLoading) {
    return <p>불러오는 중입니다.</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return <p>학습 목록을 확인하세요.</p>;
}
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">if</div>
    return 이전에서 분기하며, 완전히 다른 결과를 반환할 때 적합하다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">삼항 연산자</div>
    JSX 안에서 짧게 값을 선택할 때 적합하다.
  </div>
</div>

---

## 3. 삼항 연산자

**• React: 삼항 연산자로 조건부 렌더링하기**

```jsx
<span>{isCompleted ? "완료" : "진행 중"}</span>
```

---

## 4. && 연산자

**• React: && 연산자로 조건부 렌더링하기**

```jsx
{errorMessage && <p className="error">{errorMessage}</p>}
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">삼항 연산자</div>
    둘 중 하나를 반드시 선택해서 보여줄 때 사용한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">&&</div>
    조건이 참일 때만 보여주고, 아니면 아무것도 보여주지 않을 때 사용한다.
  </div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  숫자 0은 falsy이지만 화면에 그대로 "0"이 출력될 수 있습니다. <code>count &gt; 0 &amp;&amp; ...</code>처럼 비교식으로 명확히 표현하는 것이 안전합니다.
</div>

---

## 5. early return

예외적인 상태(로딩, 에러 등)를 함수 상단에서 먼저 return으로 처리하면, 나머지 코드에서 중첩을 줄일 수 있습니다. 2번의 `LearningStatus` 예제가 이 패턴입니다.

---

## 6. className을 조건에 따라 바꾸기

**• React: 조건에 따라 className 바꾸기**

```jsx
<li className={isCompleted ? "completed" : "pending"}>
  {title}
</li>
```

---

## 7. loading/error/empty 상태

**• React: loading·error·empty 상태 분기하기**

```jsx
function LearningList({ isLoading, errorMessage, items }) {
  if (isLoading) {
    return <p>불러오는 중입니다.</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  if (items.length === 0) {
    return <p>등록된 학습 항목이 없습니다.</p>;
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
```

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">loading</div>
    <div class="wda-fcard-dsc">데이터를 불러오는 중임을 알린다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">error</div>
    <div class="wda-fcard-dsc">문제가 생겼음을 알린다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">empty</div>
    <div class="wda-fcard-dsc">데이터는 정상 응답했지만 항목이 없음을 알린다.</div>
  </div>
</div>

---

## 8. 조건이 복잡할 때 분리하기

조건 분기가 여러 개로 늘어나면 함수나 별도 컴포넌트로 나누는 것이 좋습니다.

예를 들어 위 `LearningList`의 상태 판단 로직을 `LearningStatus` 같은 별도 컴포넌트로 분리하면 각 조건을 더 명확하게 관리할 수 있습니다.

---

## 9. 다음 학습 흐름

**▶ 주제별 다음 학습 문서**

<table class="wda-mtable">
  <tr>
    <th>주제</th>
    <th>자세히 다루는 문서</th>
  </tr>
  <tr>
    <td>배열을 목록으로 렌더링하기</td>
    <td>2-8 리스트 렌더링</td>
  </tr>
</table>

---

## 10. 초보자 실수

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">중괄호 안에 if문을 넣으려 한다</div>
    <div class="wda-fcard-dsc">JSX 중괄호에는 표현식만 들어갈 수 있다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">count &amp;&amp; ... 에서 0이 그대로 출력된다</div>
    <div class="wda-fcard-dsc">count가 0이면 falsy지만 화면에는 "0"이 보인다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">early return을 쓰지 않아 중첩이 깊어진다</div>
    <div class="wda-fcard-dsc">예외 상태를 먼저 return으로 처리하면 코드가 간결해진다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">삼항 연산자를 여러 겹 중첩한다</div>
    <div class="wda-fcard-dsc">조건이 3개 이상이면 if문이나 분리된 함수가 더 읽기 쉽다.</div>
  </div>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>조건부 렌더링은 새로운 문법이 아니라 <strong>if, 삼항 연산자, &&</strong>를 JSX 안팎에서 활용하는 것이다.</li>
    <li><strong>if</strong>는 JSX 밖(return 이전)에서, <strong>삼항 연산자</strong>와 <strong>&&</strong>는 JSX 중괄호 안에서 사용한다.</li>
    <li><strong>early return</strong>으로 예외 상태를 먼저 처리하면 중첩을 줄일 수 있다.</li>
    <li>loading·error·empty 상태는 각각 <strong>순서대로 확인</strong>하고 먼저 해당하는 것을 반환한다.</li>
    <li>조건이 복잡해지면 <strong>함수나 컴포넌트로 분리</strong>한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: JSX 중괄호 안에 if-else문을 그대로 쓸 수 있다?</div>
    <div class="wda-mistake-right">정답: 중괄호 안에는 <strong>표현식</strong>만 들어갈 수 있어, if-else 대신 삼항 연산자나 &&를 사용한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: <code>{count &amp;&amp; &lt;p&gt;...&lt;/p&gt;}</code>처럼 써도 항상 안전하다?</div>
    <div class="wda-mistake-right">정답: count가 0이면 falsy이지만 <strong>"0"이 그대로 화면에 표시</strong>될 수 있어, count &gt; 0처럼 명시적으로 비교해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 삼항 연산자를 여러 개 겹쳐 써도 가독성에 문제없다?</div>
    <div class="wda-mistake-right">정답: 조건이 3개 이상이면 <strong>if문이나 분리된 함수</strong>가 더 읽기 쉽다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: loading/error/empty 상태는 순서와 상관없이 검사해도 된다?</div>
    <div class="wda-mistake-right">정답: <strong>먼저 해당하는 상태</strong>를 순서대로 반환해야 의도한 화면이 나온다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 선택 기준</div>
    <div class="wda-formula-block-body"><code>if = JSX 밖 분기, ?: / && = JSX 안</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · falsy 주의</div>
    <div class="wda-formula-block-body"><code>count && X → "0" 위험</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 상태 순서</div>
    <div class="wda-formula-block-body"><code>loading → error → empty → 정상</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · 정리 기준</div>
    <div class="wda-formula-block-body"><code>조건 3개 이상이면 분리</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">if문은 어디서 사용해야 하나?</div>
    <div class="wda-flip-back">JSX 밖, 컴포넌트 함수의 return 이전에서 사용한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">삼항 연산자와 &&의 차이는?</div>
    <div class="wda-flip-back">삼항 연산자는 둘 중 하나를 반드시 선택, &&는 조건이 참일 때만 보여준다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">early return이란?</div>
    <div class="wda-flip-back">예외 상태를 함수 상단에서 먼저 반환해 중첩을 줄이는 패턴이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">count && &lt;p&gt;...&lt;/p&gt;의 함정은?</div>
    <div class="wda-flip-back">count가 0이면 falsy이지만 화면에 "0"이 그대로 출력된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">loading/error/empty는 어떤 순서로 확인하나?</div>
    <div class="wda-flip-back">loading → error → empty → 정상 데이터 순서로 먼저 해당하는 것을 반환한다.</div>
  </div>
</div>
