---
title: "4-2 Zustand"
category: "frontend"
section: "appendix"
date: "2026-08-03"
status: "completed"
description: "props drilling 문제를 해결하는 전역 상태 관리 개념을 중심으로, Zustand로 간단한 스토어를 만들고 사용하는 기본 흐름을 정리합니다."
---

<style>
.wda-callout{border-radius:10px;padding:12px 14px;margin:.8rem 0 1.1rem;border-left:3px solid;font-size:.9rem;line-height:1.75}
.wda-ci{background:rgba(139,92,246,.06);border-color:#8b5cf6}
.wda-cw{background:rgba(245,158,11,.07);border-color:#f59e0b}
.wda-cs{background:rgba(34,197,94,.05);border-color:#22c55e}
.wda-cb{background:rgba(59,130,246,.06);border-color:#3b82f6}
.wda-clabel{font-size:.7rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px;display:block}
.wda-ci .wda-clabel{color:#8b5cf6}
.wda-cw .wda-clabel{color:#f59e0b}
.wda-cs .wda-clabel{color:#22c55e}
.wda-cb .wda-clabel{color:#3b82f6}
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
  • <strong>props drilling 문제</strong> — 데이터를 여러 단계로 전달할 때 생기는 불편함을 이해합니다<br>
  • <strong>전역 상태 관리 개념</strong> — 컴포넌트 트리와 무관하게 상태를 공유하는 방식을 파악합니다<br>
  • <strong>Zustand 기본 사용법</strong> — store를 만들고 컴포넌트에서 꺼내 쓰는 흐름을 익힙니다<br>
  • <strong>Firebase와의 관계</strong> — Zustand가 Firebase 자체 기능이 아닌 보조 개념임을 이해합니다
</div>

---

## 1. Props Drilling 문제

React 컴포넌트는 기본적으로 부모가 자식에게 props로 데이터를 전달합니다. 그런데 데이터를 사용하는 컴포넌트가 여러 단계 아래에 있으면, 중간에 있는 컴포넌트들도 사용하지도 않는 데이터를 억지로 전달만 해줘야 하는 상황이 생깁니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Props로만 전달할 때</div>
    App → Layout → Sidebar → UserMenu처럼 여러 단계를 거쳐야 데이터가 도착합니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">전역 상태를 쓸 때</div>
    UserMenu가 필요한 데이터를 중간 단계 없이 바로 꺼내 쓸 수 있습니다.
  </div>
</div>

이렇게 데이터를 필요로 하지 않는 컴포넌트까지 계속 전달만 해야 하는 상황을 **props drilling**이라고 부릅니다.

---

## 2. 전역 상태 관리가 필요한 이유

**💡 설명**

<div class="wda-callout wda-ci">
  <p>모든 상태를 전역 상태로 관리할 필요는 없습니다. 로그인한 사용자 정보, 장바구니 내용처럼 여러 화면에서 공통으로 필요한 데이터만 전역 상태로 두고, 특정 컴포넌트에서만 쓰이는 상태는 그대로 useState로 관리하는 것이 좋습니다.</p>
</div>

Zustand는 이런 전역 상태를 아주 간단한 문법으로 만들 수 있게 도와주는 라이브러리입니다.

---

## 3. Zustand로 store 만들기

**• JavaScript: Zustand store 생성**

```js
import { create } from 'zustand';

const useCartStore = create((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({ items: [...state.items, item] })),
}));
```

`create` 함수로 store를 만들면, 이 store는 컴포넌트 트리 구조와 무관하게 어디서든 불러와 쓸 수 있는 훅이 됩니다.

---

## 4. 컴포넌트에서 store 사용하기

**• React: 컴포넌트에서 Zustand store 사용**

```jsx
function CartBadge() {
  const items = useCartStore((state) => state.items);
  return <span>장바구니 ({items.length})</span>;
}

function AddButton() {
  const addItem = useCartStore((state) => state.addItem);
  return <button onClick={() => addItem({ id: 1 })}>담기</button>;
}
```

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">store 정의</div><div class="wda-fnode-dsc">create로 전역 데이터 준비</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">필요한 곳에서 사용</div><div class="wda-fnode-dsc">useCartStore로 데이터·함수 꺼내기</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">자동 동기화</div><div class="wda-fnode-dsc">상태가 바뀌면 사용하는 컴포넌트가 갱신</div></div>
</div>

`CartBadge`와 `AddButton`은 서로 부모-자식 관계가 아니어도, 같은 store를 바라보고 있기 때문에 데이터가 자연스럽게 동기화됩니다.

---

## 5. Firebase와 함께 쓰이는 이유

**📌 개념**

<div class="wda-callout wda-cb">
  <p>Zustand는 Firebase가 제공하는 기능이 아니라 React 상태 관리를 위한 별도의 라이브러리입니다. 다만 Firebase Authentication으로 로그인한 사용자 정보를 앱 전체에서 공유해야 하는 경우가 많기 때문에, 실전 앱을 만들 때 Firebase와 함께 자주 등장하는 보조 개념으로 소개합니다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>props drilling은 <strong>중간 컴포넌트가 사용하지 않는 데이터까지 계속 전달</strong>해야 하는 문제다.</li>
    <li>전역 상태 관리는 <strong>컴포넌트 트리와 무관하게</strong> 데이터를 공유하는 방식이다.</li>
    <li>Zustand는 <strong>create 함수로 store를 만들고, 훅처럼 불러와</strong> 사용한다.</li>
    <li>모든 상태를 전역화할 필요는 없으며, <strong>공용 데이터만 전역으로</strong> 관리하는 것이 좋다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 모든 컴포넌트의 상태는 전역 상태로 관리하는 것이 좋다?</div>
    <div class="wda-mistake-right">정답: <strong>여러 화면에서 공통으로 필요한 데이터만</strong> 전역으로 두고, 나머지는 그대로 컴포넌트 내부 state로 관리하는 것이 좋다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Zustand는 Firebase의 일부 기능이다?</div>
    <div class="wda-mistake-right">정답: Zustand는 <strong>독립적인 React 상태 관리 라이브러리</strong>이며 Firebase와는 별개다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 문제</div>
    <div class="wda-formula-block-body"><code>props drilling = 불필요한 전달</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 해결</div>
    <div class="wda-formula-block-body"><code>create()로 전역 store 생성</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">props drilling이란 무엇인가요?</div>
    <div class="wda-flip-back">중간 컴포넌트들이 사용하지 않는 데이터까지 계속 전달만 해야 하는 상황입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Zustand로 store를 만드는 함수는?</div>
    <div class="wda-flip-back">create 함수입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">모든 상태를 전역으로 관리해야 하나요?</div>
    <div class="wda-flip-back">아니요. 여러 화면에서 공통으로 필요한 데이터만 전역으로 관리하는 것이 좋습니다.</div>
  </div>
</div>
