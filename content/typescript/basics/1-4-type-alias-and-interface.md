---
title: "1-4 타입 별칭과 인터페이스"
category: "frontend"
section: "basics"
date: "2026-08-03"
status: "completed"
description: "type과 interface로 반복되는 타입 구조에 이름을 붙이는 방법을 익히고, 두 문법의 차이와 상황에 맞는 선택 기준을 정리합니다."
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
  • <strong>type alias</strong> — 반복되는 타입에 이름을 붙이는 방법을 익힙니다<br>
  • <strong>interface</strong> — 객체 구조를 정의하는 문법을 익힙니다<br>
  • <strong>둘의 차이</strong> — 무엇을 표현할 수 있고 없는지 비교합니다<br>
  • <strong>선택 기준</strong> — 상황에 따라 어떤 것을 쓰면 좋을지 감을 잡습니다
</div>

---

## 1. 타입에도 이름을 붙일 수 있다 — type

앞서 본 것처럼 객체 타입을 변수 선언 자리에 바로 적을 수도 있지만, 같은 구조를 여러 곳에서 반복해서 쓴다면 매번 다시 적기 번거롭습니다. `type` 키워드를 쓰면 타입에 이름을 붙여 재사용할 수 있습니다.

**• TypeScript: type으로 타입 이름 붙이기**

```ts
type ID = string | number;

type User = {
  name: string;
  age: number;
  isAdmin?: boolean; // 물음표(?)는 선택적(Optional) 속성을 의미
};

const admin: User = {
  name: "관리자",
  age: 35,
  isAdmin: true
};
```

**💡 사용 팁**

<div class="wda-callout wda-cb">
  <p>type은 객체 구조뿐 아니라 union 타입, 튜플, 함수 타입처럼 다양한 형태에 이름을 붙일 수 있습니다. 예를 들어 <code>type Status = "success" | "error" | "loading";</code>처럼 특정 상태값들의 조합에도 이름을 줄 수 있습니다.</p>
</div>

---

## 2. 객체 구조를 정의하는 interface

`interface`는 주로 객체의 구조(속성과 메서드)를 정의할 때 사용하는 문법입니다. type과 비슷해 보이지만, `=` 없이 바로 중괄호를 씁니다.

**• TypeScript: interface로 객체 구조 정의**

```ts
interface Product {
  id: number;
  title: string;
  price: number;
  description?: string; // 선택적 속성

  getDiscountPrice(): number; // 메서드도 정의 가능
}
```

interface는 "이 객체는 최소한 이런 형태의 데이터를 가지고 있어야 한다"는 계약을 표현하는 데 특히 잘 어울립니다.

---

## 3. type과 interface, 무엇이 다를까

**▶ type과 interface 차이**

<table class="wda-mtable">
<thead><tr><th>구분</th><th>type</th><th>interface</th></tr></thead>
<tbody>
<tr><td>객체 타입 정의</td><td>가능</td><td>가능</td></tr>
<tr><td>union·튜플 등 정의</td><td>가능</td><td>불가능</td></tr>
<tr><td>확장(합치기)</td><td>& 연산자 사용</td><td>extends 사용</td></tr>
<tr><td>같은 이름 재선언</td><td>불가능(오류)</td><td>가능(자동으로 합쳐짐)</td></tr>
</tbody>
</table>

**• TypeScript: type과 interface 확장 방식**

```ts
// type: & 연산자로 합치기
type Timestamped = { createdAt: string };
type Post = { title: string } & Timestamped;

// interface: extends로 확장
interface BaseEntity {
  id: string;
}
interface User extends BaseEntity {
  name: string;
}
```

**🔎 참고**

<div class="wda-callout wda-cw">
  <p>"interface가 type보다 항상 더 좋다"거나 그 반대라고 단정할 수는 없습니다. 두 문법 모두 널리 쓰이며, 팀이나 프로젝트의 컨벤션에 따라 선택 기준이 달라질 수 있습니다.</p>
</div>

---

## 4. 실전에서의 선택 기준

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">type이 편한 경우</div>
    union 타입, 튜플처럼 객체가 아닌 타입을 표현할 때, 또는 여러 타입을 조합해 새로운 타입을 만들 때 적합합니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">interface가 편한 경우</div>
    객체나 클래스의 구조를 정의하고, extends로 점진적으로 속성을 확장해나갈 때 적합합니다.
  </div>
</div>

React 컴포넌트의 props 타입처럼 순수한 객체 구조를 정의할 때는 둘 중 어느 쪽을 써도 크게 문제되지 않는 경우가 많습니다. 팀에 따로 정해진 컨벤션이 있다면 그것을 따르고, 없다면 일관성 있게 하나를 선택해서 사용하는 것이 좋습니다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><strong>type</strong>은 객체뿐 아니라 union·튜플 등 다양한 타입에 이름을 붙일 수 있다.</li>
    <li><strong>interface</strong>는 주로 객체 구조를 정의하며 <strong>extends</strong>로 확장할 수 있다.</li>
    <li>type은 <strong>&(교차 타입)</strong>으로, interface는 <strong>extends</strong>로 구조를 합친다.</li>
    <li>둘 중 하나가 절대적으로 우월하지 않으며, <strong>상황과 팀 컨벤션</strong>에 따라 선택한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: interface는 type보다 기능이 항상 우월하다?</div>
    <div class="wda-mistake-right">정답: interface는 <strong>객체 구조 확장</strong>에 강점이 있지만, union·튜플 표현은 <strong>type만 가능</strong>해 서로 잘하는 영역이 다르다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: ?가 붙은 속성은 아예 없어도 되는, 있으나 마나 한 속성이다?</div>
    <div class="wda-mistake-right">정답: <strong>선택적 속성</strong>은 값이 없어도 오류가 나지 않을 뿐, 실제로 데이터 구조를 설계할 때는 여전히 의미 있는 정보다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · type</div>
    <div class="wda-formula-block-body"><code>type 이름 = 타입</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · interface</div>
    <div class="wda-formula-block-body"><code>interface 이름 { ... }</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 확장</div>
    <div class="wda-formula-block-body"><code>type: & / interface: extends</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">union 타입은 type과 interface 중 어느 쪽으로 만들 수 있나요?</div>
    <div class="wda-flip-back">type으로만 만들 수 있습니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">interface를 확장할 때 쓰는 키워드는?</div>
    <div class="wda-flip-back">extends입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">interface가 type보다 항상 더 좋은가요?</div>
    <div class="wda-flip-back">아니요. 상황에 따라 적합한 것이 다르며 팀 컨벤션에 맞춰 선택하면 됩니다.</div>
  </div>
</div>
