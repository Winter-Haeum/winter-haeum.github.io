---
title: "1-3 기본 타입 익히기"
category: "frontend"
section: "basics"
date: "2026-08-03"
status: "completed"
description: "string·number·boolean 같은 기본 타입과 배열·객체 타입, 여러 타입 중 하나를 허용하는 union type까지 TypeScript의 가장 기초적인 타입 표기를 정리합니다."
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
  • <strong>기본 타입 표기법</strong> — 콜론(:)을 사용한 타입 주석 문법을 익힙니다<br>
  • <strong>string·number·boolean</strong> — 가장 자주 쓰는 세 가지 원시 타입을 다룹니다<br>
  • <strong>배열과 객체 타입</strong> — 여러 값을 묶은 데이터의 타입을 표현합니다<br>
  • <strong>union type</strong> — 하나의 값이 여러 타입 중 하나일 수 있음을 표현합니다
</div>

---

## 1. 타입 주석(Type Annotation) 문법

TypeScript에서 가장 기본이 되는 문법은 변수나 매개변수 뒤에 콜론(:)을 붙이고 타입을 적는 것입니다.

**• TypeScript: 기본 타입 주석**

```ts
let username: string = "홍길동";
let age: number = 25;
let isStudent: boolean = true;
```

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">string</div><div class="wda-fcard-dsc">문자열 값만 담을 수 있습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">number</div><div class="wda-fcard-dsc">정수·소수를 포함한 모든 숫자를 담습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">boolean</div><div class="wda-fcard-dsc">true 또는 false 값만 담을 수 있습니다.</div></div>
</div>

콜론 뒤에 오는 타입은 실제로 실행되는 값이 아니라, 컴파일러에게 "이 변수에는 이런 값만 들어와야 한다"고 알려주는 표시입니다.

---

## 2. 배열 타입

같은 타입의 값을 여러 개 담을 때는 배열 타입을 사용합니다. 가장 많이 쓰는 방식은 `타입[]` 형태입니다.

**• TypeScript: 배열 타입 지정**

```ts
let fruits: string[] = ["apple", "banana", "orange"];
let scores: number[] = [95, 87, 92];

// scores.push("100"); // 오류: number 배열에 문자열은 넣을 수 없음
```

`Array<string>`처럼 제네릭 형태로 적을 수도 있는데, 동작은 동일합니다. 실무에서는 짧고 읽기 쉬운 `string[]` 형태를 더 자주 사용합니다.

---

## 3. 객체 타입

객체의 구조를 표현할 때는 각 속성의 이름과 타입을 중괄호 안에 나열합니다.

**• TypeScript: 객체 타입 지정**

```ts
let user: {
  name: string;
  age: number;
} = {
  name: "홍길동",
  age: 25
};
```

정의되지 않은 속성을 넣거나, 정의된 속성에 다른 타입의 값을 넣으면 오류가 발생합니다. 다만 이런 인라인 방식은 구조가 간단할 때 유용하고, 구조가 복잡해지거나 여러 곳에서 재사용해야 한다면 다음 문서에서 다룰 `interface`나 `type`으로 이름을 붙여 관리하는 것이 좋습니다.

---

## 4. Union 타입 — 여러 타입 중 하나

하나의 값이 여러 타입 중 하나일 수 있을 때는 `|`(파이프) 기호로 타입을 연결합니다.

**• TypeScript: Union 타입 지정**

```ts
let id: string | number;

id = "abc123"; // OK
id = 12345;    // OK
// id = true;  // 오류: boolean은 허용되지 않음
```

**💡 설명**

<div class="wda-callout wda-ci">
  <p>Union 타입은 "이 값은 A이거나 B다"라는 뜻입니다. 예를 들어 게시글 ID가 서버에 따라 문자열로 오기도 하고 숫자로 오기도 한다면, <code>string | number</code>처럼 표현해 두 경우를 모두 허용할 수 있습니다.</p>
</div>

Union 타입으로 선언한 값을 실제로 사용할 때는, 지금 어떤 타입이 들어있는지 `typeof` 등으로 먼저 확인하고 사용하는 것이 안전합니다. 이 내용은 이후 문서에서 더 자세히 다룹니다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>변수 뒤에 <strong>콜론(:)과 타입</strong>을 적어 값의 종류를 미리 표시한다.</li>
    <li>기본 타입에는 <strong>string, number, boolean</strong>이 있다.</li>
    <li>같은 타입 여러 개를 담을 때는 <strong>타입[]</strong> 형태의 배열 타입을 쓴다.</li>
    <li>값이 여러 타입 중 하나일 수 있으면 <strong>|(파이프)로 연결한 union 타입</strong>을 쓴다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 타입은 변수 선언 시 한 번만 정해두면 아무 의미 없는 형식이다?</div>
    <div class="wda-mistake-right">정답: 타입은 이후 <strong>그 변수에 값을 다시 대입할 때마다</strong> 계속 검사되는 살아있는 규칙이다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: string[]과 number[]를 섞어서 한 배열에 담을 수 없다?</div>
    <div class="wda-mistake-right">정답: <strong>(string | number)[]</strong>처럼 union과 배열을 함께 쓰면 여러 타입이 섞인 배열도 표현할 수 있다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 기본 문법</div>
    <div class="wda-formula-block-body"><code>변수: 타입 = 값</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 배열</div>
    <div class="wda-formula-block-body"><code>타입[]</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · Union</div>
    <div class="wda-formula-block-body"><code>타입A | 타입B</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">문자열 값만 담을 수 있는 기본 타입은?</div>
    <div class="wda-flip-back">string입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">숫자 배열을 표현하는 타입 표기는?</div>
    <div class="wda-flip-back">number[]입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">값이 문자열 또는 숫자 중 하나일 때 쓰는 타입은?</div>
    <div class="wda-flip-back">string | number 형태의 union 타입입니다.</div>
  </div>
</div>
