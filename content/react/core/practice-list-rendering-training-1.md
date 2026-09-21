---
title: "실습: 리스트 렌더링 훈련"
status: "completed"
description: "학습 항목 배열을 필터링해 목록으로 보여주며 map, key, filter·sort 조합, 빈 목록 처리, 컴포넌트 분리까지 다뤄보는 리스트 렌더링 실습 문서다."
category: "React"
section: "Core"
tags:
  - react
  - list-rendering
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
  이 문서는 개념을 처음 설명하는 문서가 아니라, <strong>2-8 리스트 렌더링</strong>에서 배운 내용을 직접 코드로 적용해보는 실습 문서입니다. map·filter·sort 자체의 동작 원리는 JavaScript 고차 배열 메서드 문서에서 다뤘으므로 여기서는 반복하지 않습니다.
</div>

## 🎯 실습 목표

<div class="wda-goal">
  학습 항목 배열을 필터링·정렬해 목록으로 보여주는 LearningList를 만들며 map, key, filter/sort 조합, 빈 목록 처리, 컴포넌트 분리를 다뤄봅니다.
</div>

---

## 1단계: map으로 기본 목록 만들기

**• React: map으로 기본 목록 만들기**

```jsx
function LearningList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
```

---

## 2단계: filter로 공개된 항목만 남기기

**• React: filter로 공개된 항목만 남기기**

```jsx
const visibleItems = items.filter((item) => item.isVisible);
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">id key</div>
    항목이 추가·삭제돼도 항상 같은 항목을 가리킨다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">index key</div>
    순서가 바뀌면 다른 항목을 가리킬 수 있어 이 실습에서는 사용하지 않는다.
  </div>
</div>

---

## 3단계: sort로 제목순 정렬하기

**• React: sort로 제목순 정렬하기**

```jsx
const sortedItems = [...visibleItems].sort((a, b) => a.title.localeCompare(b.title));
```

정렬 전에 배열을 복사해 원본 순서를 그대로 유지합니다.

---

## 4단계: 빈 목록 처리하기

**• React: 빈 목록 처리하기**

```jsx
if (sortedItems.length === 0) {
  return <p>표시할 학습 항목이 없습니다.</p>;
}
```

---

## 5단계: 항목 컴포넌트로 분리하기

**• React: 항목 컴포넌트로 분리하기**

```jsx
function LearningListItem({ item }) {
  return <li>{item.title}</li>;
}
```

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">배열</div><div class="wda-fnode-dsc">items</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">filter</div><div class="wda-fnode-dsc">공개 항목만</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">sort</div><div class="wda-fnode-dsc">제목순 정렬</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">map</div><div class="wda-fnode-dsc">LearningListItem 출력</div></div>
</div>

---

## 완성 코드

**• React: LearningList 완성 코드**

```jsx
function LearningListItem({ item }) {
  return <li>{item.title}</li>;
}

function LearningList({ items }) {
  const visibleItems = items.filter((item) => item.isVisible);
  const sortedItems = [...visibleItems].sort((a, b) => a.title.localeCompare(b.title));

  if (sortedItems.length === 0) {
    return <p>표시할 학습 항목이 없습니다.</p>;
  }

  return (
    <ul>
      {sortedItems.map((item) => (
        <LearningListItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

export default LearningList;
```

---

## 확인 포인트

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">filter</div>
    <div class="wda-fcard-dsc">isVisible이 false인 항목은 목록에서 빠진다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">sort</div>
    <div class="wda-fcard-dsc">항목이 제목 가나다순으로 정렬된다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">빈 목록</div>
    <div class="wda-fcard-dsc">항목이 하나도 없으면 안내 문구가 보인다.</div>
  </div>
</div>

---

## 흔한 실수

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">key 없이 렌더링한다</div>
    <div class="wda-fcard-dsc">콘솔 경고가 뜨고 항목 추적이 부정확해질 수 있다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">index를 key로 사용한다</div>
    <div class="wda-fcard-dsc">정렬·필터링으로 순서가 바뀌는 목록에서는 피해야 한다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">원본 배열을 직접 정렬한다</div>
    <div class="wda-fcard-dsc">sort는 원본을 바꾸므로 복사본을 만들어 정렬해야 한다.</div>
  </div>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>배열을 화면에 표시할 때는 <strong>map()</strong>으로 각 항목을 JSX로 변환한다.</li>
    <li>map으로 만든 목록의 최상위 태그에는 반드시 <strong>고유한 key</strong>(가능하면 id)를 지정한다.</li>
    <li><strong>filter</strong>로 걸러내고 <strong>sort</strong>로 정렬한 뒤 map으로 렌더링할 수 있다.</li>
    <li>목록이 비어 있으면 별도 메시지를 보여주고, 항목이 많아지면 <strong>컴포넌트로 분리</strong>한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: index를 key로 써도 이 실습에서는 문제없다?</div>
    <div class="wda-mistake-right">정답: filter·sort로 순서가 바뀌므로 <strong>id를 key</strong>로 사용해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: sort는 map처럼 원본을 건드리지 않는다?</div>
    <div class="wda-mistake-right">정답: sort는 <strong>원본 배열을 직접 변경</strong>하므로 <code>[...items].sort(...)</code>로 복사 후 정렬해야 한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 렌더링</div>
    <div class="wda-formula-block-body"><code>배열.map(item =&gt; JSX)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 정렬</div>
    <div class="wda-formula-block-body"><code>[...arr].sort(...)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 흐름</div>
    <div class="wda-formula-block-body"><code>배열 → filter → sort → map</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">LearningList에서 key로 무엇을 사용했나?</div>
    <div class="wda-flip-back">각 항목의 고유한 id(item.id)를 key로 사용했다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">정렬 전에 배열을 복사하는 이유는?</div>
    <div class="wda-flip-back">sort가 원본 배열을 직접 바꾸기 때문이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">빈 목록일 때는 무엇을 반환하나?</div>
    <div class="wda-flip-back">항목이 없다는 안내 문구를 담은 요소를 반환한다.</div>
  </div>
</div>
