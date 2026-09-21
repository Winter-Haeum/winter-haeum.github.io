---
title: "2-8 리스트 렌더링"
status: "completed"
description: "학습 항목 배열을 카드 목록으로 렌더링하며 map, key, filter·sort 조합, 빈 목록 처리까지 React 리스트 렌더링의 기초를 정리한다."
category: "React"
section: "Core"
tags:
  - react
  - list-rendering
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
  • <strong>배열을 목록으로 렌더링하기</strong> — map으로 배열 데이터를 JSX 목록으로 바꾸는 방법을 익힙니다.<br>
  • <strong>key 이해하기</strong> — key가 왜 필요하고 무엇을 key로 써야 하는지 이해합니다.<br>
  • <strong>filter/sort와 조합하기</strong> — 걸러내거나 정렬한 배열을 렌더링에 활용합니다.<br>
  • <strong>구조 정리하기</strong> — 빈 목록 처리와 컴포넌트 분리를 익힙니다.
</div>

---

## 1. 리스트 렌더링이 필요한 순간

학습 항목 배열을 화면에 카드 목록으로 보여줘야 합니다. 항목 하나하나를 직접 다 적는 대신, 배열 데이터를 그대로 JSX 목록으로 바꾸는 방법이 필요합니다.

---

## 2. 배열을 JSX 목록으로 바꾸기

**💡 설명**

<div class="wda-callout wda-ci">
  map·filter·sort 같은 배열 메서드 자체의 동작 원리는 JavaScript 고차 배열 메서드 문서에서 다뤘습니다. 이 문서에서는 그 결과를 JSX로 렌더링하는 방법에 집중합니다.
</div>

---

## 3. map 기본

**• React: map으로 배열을 목록으로 렌더링하기**

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

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">배열 데이터</div>
    learningItems 같은 JavaScript 배열.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">JSX 목록</div>
    map으로 변환한 li 요소들의 목록.
  </div>
</div>

---

## 4. key가 필요한 이유

**💡 설명**

<div class="wda-callout wda-ci">
  key는 화면에 보이는 값이 아니라, React가 어떤 항목이 바뀌었는지 구분하는 기준입니다.
</div>

---

## 5. index key를 조심해야 하는 경우

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">id key</div>
    순서가 바뀌어도 항상 같은 항목을 가리킨다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">index key</div>
    순서가 바뀌면 다른 항목을 가리키게 될 수 있다.
  </div>
</div>

**• React: id key와 index key 비교**

```jsx
// 권장
{items.map((item) => (
  <li key={item.id}>{item.title}</li>
))}

// 비권장: 순서가 바뀌는 목록에서는 피한다
{items.map((item, index) => (
  <li key={index}>{item.title}</li>
))}
```

---

## 6. filter와 조합하기

**• React: filter로 걸러낸 목록 렌더링하기**

```jsx
const completedItems = learningItems.filter((item) => item.isCompleted);
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">filter 후 map</div>
    <code>items.filter(...).map(...)</code>로 걸러낸 뒤 렌더링한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">map 안에서 조건 처리</div>
    map 콜백 안에서 조건에 따라 다른 내용을 렌더링한다.
  </div>
</div>

---

## 7. sort와 조합하기

**• React: sort로 정렬된 목록 렌더링하기**

```jsx
const sortedItems = [...learningItems].sort((a, b) => a.title.localeCompare(b.title));
```

정렬 전에 배열을 복사해야 원본 순서가 바뀌지 않습니다.

---

## 8. 빈 목록 처리

**• React: 빈 목록 처리하기**

```jsx
if (learningItems.length === 0) {
  return <p>등록된 학습 항목이 없습니다.</p>;
}
```

로딩·에러·빈 상태에 따라 다른 화면을 보여주는 방법은 <strong>2-7 조건부 렌더링</strong>에서 다뤘습니다.

---

## 9. 컴포넌트로 분리하기

**• React: 목록 항목을 컴포넌트로 분리하기**

```jsx
function LearningList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <LearningItem key={item.id} item={item} />
      ))}
    </ul>
  );
}
```

각 항목을 별도 컴포넌트로 분리하면 목록 코드와 항목 코드가 명확히 나뉩니다.

---

## 10. 다음 학습 흐름

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">배열</div><div class="wda-fnode-dsc">learningItems</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">filter/sort</div><div class="wda-fnode-dsc">필요하면 가공</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">map</div><div class="wda-fnode-dsc">JSX로 변환</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">key</div><div class="wda-fnode-dsc">항목 식별</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">컴포넌트 출력</div><div class="wda-fnode-dsc">화면 표시</div></div>
</div>

---

## 11. 초보자 실수

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">key 없이 렌더링한다</div>
    <div class="wda-fcard-dsc">콘솔 경고가 뜨고, React가 항목을 정확히 추적하지 못한다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">index를 key로 사용한다</div>
    <div class="wda-fcard-dsc">순서가 바뀌는 목록에서는 엉뚱한 항목이 갱신될 수 있다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">원본 배열을 직접 정렬한다</div>
    <div class="wda-fcard-dsc">sort는 원본을 바꾸므로 복사본을 만들어 정렬해야 한다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">필터링 결과를 원본 state에 덮어쓴다</div>
    <div class="wda-fcard-dsc">숨긴 데이터가 사라진다. 원본은 두고 파생 값으로 걸러야 한다.</div>
  </div>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>배열을 화면에 반복 출력할 때는 <strong>map()</strong>으로 각 요소를 JSX로 변환한다.</li>
    <li>map으로 만든 목록의 최상위 태그에는 반드시 <strong>고유한 key</strong>를 지정한다.</li>
    <li>key는 가능하면 <strong>고유 id</strong>를 사용하고, <strong>index</strong>는 순서가 바뀌는 목록에서는 피한다.</li>
    <li><strong>filter</strong>로 걸러내고 <strong>sort</strong>로 정렬한 뒤 map으로 렌더링할 수 있다.</li>
    <li>목록이 비어 있을 때는 별도 메시지를 보여주고, 항목이 많아지면 <strong>컴포넌트로 분리</strong>한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: key는 없어도 콘솔 경고만 무시하면 그만이다?</div>
    <div class="wda-mistake-right">정답: key가 없으면 React가 <strong>어떤 항목이 바뀌었는지 식별하지 못해</strong> 예기치 못한 버그가 생길 수 있다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: index를 key로 써도 대부분 문제없다?</div>
    <div class="wda-mistake-right">정답: 순서가 바뀌면 index도 바뀌어 React가 <strong>엉뚱한 항목을 같은 항목으로 착각</strong>할 수 있다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: sort는 map처럼 원본을 건드리지 않는다?</div>
    <div class="wda-mistake-right">정답: sort는 <strong>원본 배열을 직접 변경</strong>하므로, <code>[...arr].sort(...)</code>로 복사 후 정렬해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 필터링(숨기기)은 원본 배열 state에서 직접 지워도 된다?</div>
    <div class="wda-mistake-right">정답: 원본 state를 직접 필터링하면 <strong>숨긴 데이터가 영구 삭제</strong>된다. 원본은 보존하고 파생 값으로 걸러야 한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 렌더링</div>
    <div class="wda-formula-block-body"><code>배열.map(item =&gt; JSX)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · key 우선순위</div>
    <div class="wda-formula-block-body"><code>id &gt; index(최후의 수단)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 정렬</div>
    <div class="wda-formula-block-body"><code>[...arr].sort(...)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · 흐름</div>
    <div class="wda-formula-block-body"><code>배열 → filter/sort → map → key</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">리스트 렌더링의 기본 패턴은?</div>
    <div class="wda-flip-back">배열의 map() 메서드로 각 요소를 JSX로 변환해 화면에 출력한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">key는 왜 필요한가?</div>
    <div class="wda-flip-back">React가 어떤 항목이 추가/삭제/수정됐는지 식별해 효율적으로 업데이트할 수 있게 한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">index를 key로 쓰면 안 되는 경우는?</div>
    <div class="wda-flip-back">순서가 바뀌는 목록에서는 index도 함께 바뀌어 엉뚱한 항목이 갱신될 수 있다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">정렬 전에 배열을 복사해야 하는 이유는?</div>
    <div class="wda-flip-back">sort는 원본 배열을 직접 바꾸기 때문이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">필터링된 목록은 어떻게 관리해야 하나?</div>
    <div class="wda-flip-back">원본 state는 그대로 두고, 렌더링 시점에 계산하는 파생 값으로 관리한다.</div>
  </div>
</div>
