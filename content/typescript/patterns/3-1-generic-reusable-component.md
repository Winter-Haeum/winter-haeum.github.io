---
title: "3-1 제네릭으로 재사용 컴포넌트 만들기"
category: "frontend"
section: "patterns"
date: "2026-08-03"
status: "completed"
description: "제네릭이 왜 필요한지 배열 아이템을 렌더링하는 컴포넌트 예시로 살펴보고, 타입을 나중에 정하는 자리라는 관점으로 재사용 컴포넌트를 만들어봅니다."
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
  • <strong>제네릭이 필요한 이유</strong> — 타입을 미리 고정하지 않아야 하는 상황을 이해합니다<br>
  • <strong>재사용 컴포넌트에서의 제네릭</strong> — 다양한 데이터를 다루는 컴포넌트를 만들어봅니다<br>
  • <strong>배열 렌더링 컴포넌트 예시</strong> — 실제로 동작하는 코드로 감을 잡습니다<br>
  • <strong>과하지 않게 적용하기</strong> — 제네릭을 처음 접할 때 가져야 할 마음가짐을 정리합니다
</div>

---

## 1. 제네릭, 타입을 나중에 넣을 수 있는 자리

지금까지는 함수나 컴포넌트를 만들 때 타입을 미리 정해두었습니다. 그런데 어떤 컴포넌트는 문자열 목록에도, 숫자 목록에도, 객체 목록에도 똑같이 쓰이길 원할 수 있습니다.

이럴 때 타입 하나를 고정하는 대신, **사용하는 시점에 타입을 채워 넣을 수 있는 자리**를 만들어두는 것이 제네릭입니다.

**• TypeScript: 제네릭 함수 기본**

```ts
function identity<T>(value: T): T {
  return value;
}

identity<string>("hello"); // T가 string으로 채워짐
identity<number>(123);     // T가 number로 채워짐
```

**💡 설명**

<div class="wda-callout wda-ci">
  <p>제네릭은 처음 보면 낯설 수 있지만, "이 함수(또는 컴포넌트)는 어떤 타입이든 받을 수 있고, 실제로 사용하는 순간 그 타입이 정해진다"는 정도로 이해하는 것으로 충분합니다. 처음부터 복잡한 제네릭 조합을 외우려 하기보다는, 이 문서의 예시처럼 반복되는 패턴부터 익혀나가는 것을 권장합니다.</p>
</div>

---

## 2. 배열 아이템을 렌더링하는 재사용 컴포넌트

문자열 목록도, 사용자 목록도 형태만 다를 뿐 "배열을 받아서 하나씩 화면에 그린다"는 동작 자체는 같습니다. 이럴 때 제네릭을 사용하면 하나의 컴포넌트로 여러 타입의 데이터를 다룰 수 있습니다.

**• React: 제네릭 리스트 컴포넌트 정의**

```tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
```

**• React: 제네릭 리스트 컴포넌트 사용**

```tsx
const users = [{ name: "Alice" }, { name: "Bob" }];
const tags = ["React", "TypeScript"];

<List items={users} renderItem={(u) => <b>{u.name}</b>} />
<List items={tags} renderItem={(t) => <i>#{t}</i>} />
```

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">users를 넘길 때</div><div class="wda-fcard-dsc">T가 자동으로 {"{ name: string }"} 형태로 정해집니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">tags를 넘길 때</div><div class="wda-fcard-dsc">T가 자동으로 string으로 정해집니다.</div></div>
</div>

두 경우 모두 `List` 컴포넌트를 새로 만들 필요 없이, 하나의 컴포넌트로 서로 다른 데이터를 안전하게 다룰 수 있습니다.

---

## 3. 특정 조건을 만족하는 타입만 허용하기

가끔은 "아무 타입이나"가 아니라 "최소한 이런 속성은 가진 타입"만 받고 싶을 수 있습니다. 이럴 때는 `extends`로 조건을 걸 수 있습니다.

**• React: extends로 제네릭 타입 제한**

```tsx
interface HasId {
  id: number | string;
}

interface ListWithIdProps<T extends HasId> {
  items: T[];
  onSelect: (item: T) => void;
}

function ListWithId<T extends HasId>({ items, onSelect }: ListWithIdProps<T>) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id} onClick={() => onSelect(item)}>
          ID: {item.id}
        </li>
      ))}
    </ul>
  );
}
```

이렇게 하면 `id` 속성이 없는 데이터를 실수로 넘겼을 때 컴파일 시점에 바로 알 수 있고, 컴포넌트 내부에서도 `item.id`에 안전하게 접근할 수 있습니다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>제네릭은 <strong>타입을 나중에 채워 넣을 수 있는 자리</strong>를 만들어주는 문법이다.</li>
    <li>&lt;T&gt;로 선언한 타입은 <strong>함수나 컴포넌트를 사용하는 순간</strong> 실제 타입으로 정해진다.</li>
    <li>제네릭을 쓰면 <strong>하나의 컴포넌트로 여러 타입의 데이터</strong>를 안전하게 다룰 수 있다.</li>
    <li><strong>extends</strong>로 제네릭에 조건을 걸어 특정 속성을 가진 타입만 허용할 수 있다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 제네릭 T는 반드시 특정 값으로 고정해서 선언해야 한다?</div>
    <div class="wda-mistake-right">정답: T는 <strong>실제로 컴포넌트를 사용하는 시점에 어떤 데이터를 넘기느냐에 따라</strong> 자동으로 정해지는 자리표시자일 뿐이다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: any를 쓰면 제네릭과 똑같은 효과를 낼 수 있다?</div>
    <div class="wda-mistake-right">정답: any는 <strong>타입 검사 자체를 포기</strong>하지만, 제네릭은 <strong>실제로 넘긴 데이터의 타입을 그대로 추적</strong>하므로 안전성이 크게 다르다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 선언</div>
    <div class="wda-formula-block-body"><code>function List&lt;T&gt;(...)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 조건</div>
    <div class="wda-formula-block-body"><code>&lt;T extends 조건&gt;</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">제네릭 T는 언제 실제 타입으로 정해지나요?</div>
    <div class="wda-flip-back">함수나 컴포넌트를 실제로 사용하는 시점에 정해집니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">문자열 배열과 객체 배열을 하나의 컴포넌트로 렌더링하려면?</div>
    <div class="wda-flip-back">제네릭 List&lt;T&gt; 컴포넌트를 만들어 재사용하면 됩니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">특정 속성을 가진 타입만 허용하고 싶을 때 쓰는 문법은?</div>
    <div class="wda-flip-back">extends를 사용한 제네릭 제약 조건입니다.</div>
  </div>
</div>
