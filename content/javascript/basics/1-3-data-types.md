---
title: "1-3 데이터 타입"
status: "completed"
description: "JavaScript의 데이터 타입과 원시 타입, 참조 타입의 차이를 이해합니다."
category: "JavaScript"
section: "Basics"
tags:
  - javascript
  - basics
  - data-types
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
.wda-goal-label{font-size:.68rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#22c55e;display:block;margin-bottom:10px}
.wda-fgrid{display:flex;flex-wrap:wrap;gap:10px;margin:.8rem 0 1.6rem}
.wda-fcard{flex:1 1 140px;border:1px solid rgba(128,128,128,.18);border-radius:10px;padding:13px 15px;background:rgba(128,128,128,.03);box-shadow:0 1px 3px rgba(0,0,0,.04)}
.wda-fcard-ico{font-size:1.3rem;margin-bottom:6px}
.wda-fcard-ttl{font-size:.94rem;font-weight:700;margin-bottom:4px}
.wda-fcard-dsc{font-size:.89rem;line-height:1.65}
.wda-compare{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:.8rem 0 1.6rem}
@media(max-width:600px){.wda-compare{grid-template-columns:1fr}}
.wda-compare-card{border:1px solid rgba(128,128,128,.18);border-radius:10px;padding:14px 16px;font-size:.89rem;line-height:1.65;background:rgba(128,128,128,.03);box-shadow:0 1px 3px rgba(0,0,0,.04)}
.wda-compare-ttl{font-size:.92rem;font-weight:700;line-height:1.5;margin-bottom:8px}
.wda-callout p{margin:0 0 .45rem;font-size:.9rem;line-height:1.75}
.wda-callout p:last-child{margin-bottom:0}
.wda-callout ul{margin:.35rem 0 0;padding-left:1.1rem}
.wda-callout li{margin:.24rem 0;line-height:1.75;font-size:.83rem}
.wda-callout .wda-clabel{font-size:.7rem;line-height:1.3}
/* 핵심 요약 전용 복습 UI — JavaScript 1-1/1-2 기준과 동일. 색은 background/border/accent에만 쓰고,
   본문 텍스트는 카드 색과 무관하게 진회색(#2C2840)·strong은 #1F1B2E로 고정한다. */
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
  • <strong>타입 오류 원인 설명</strong> — 값의 종류가 다르면 같은 코드도 다른 결과가 나오는 이유를 설명할 수 있다.<br>
  • <strong>타입 목록 구분</strong> — 원시 타입 7종과 참조 타입 3종을 예제로 구분할 수 있다.<br>
  • <strong>빈 값 판단</strong> — null과 undefined 중 어떤 상황에 해당하는지 코드로 판단할 수 있다.<br>
  • <strong>안전한 타입 확인</strong> — typeof·Array.isArray·String() 중 상황에 맞는 확인·변환 방법을 선택할 수 있다.
</div>

---

## 1. 값의 종류를 구분해야 하는 이유

같은 연산자를 써도 값의 타입이 다르면 결과가 완전히 달라진다.

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">❌ 타입을 확인하지 않으면</div>

**• JavaScript: 문자열과 숫자를 잘못 더하는 경우**

```javascript
let productPrice = "10000";
// 문자열로 잘못 들어온 상황

console.log(productPrice + 1000);
// "100001000"
// 숫자 계산이 아니라 문자열이 이어붙었다
```

</div>

<div class="wda-compare-card wda-modern">

<div class="wda-compare-ttl">✅ 타입에 맞게 다루면</div>

**• JavaScript: 숫자 타입으로 정확히 계산하기**

```javascript
let productPrice = 10000;
// 숫자로 정확히 저장

console.log(productPrice + 1000);
// 11000
// 정상적인 숫자 계산
```

</div>

</div>

같은 `+ 1000`이라는 코드인데도, `productPrice`가 어떤 타입이었느냐에 따라 결과가 달라진다. 그래서 지금 다루는 값이 어떤 타입인지 아는 것이 중요하다.

---

## 2. 주문 정보 카드에 담을 값들

이 문서에서는 하나의 주문 정보 카드를 기준으로 각 타입을 확인한다. 아래 값들이 문서 전체에서 반복해서 등장한다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">🔤 원시 타입으로 담을 값</div>
    상품명·가격·품절 여부·선택 옵션·배송 메모 — 각각 하나의 값을 그대로 담는다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">📦 참조 타입으로 담을 값</div>
    주문 정보·장바구니·주문 확인 동작 — 여러 값이나 동작을 하나로 묶는다.
  </div>
</div>

**• JavaScript: 주문 정보 카드 값 선언하기**

```javascript
const productName = "무선 이어폰";
let productPrice = 39000;
let isSoldOut = false;
let selectedOption = null;
let deliveryMemo;

const orderInfo = { productName, productPrice };
const cartItems = [productName];

function showOrderSummary() {
  console.log("주문 정보를 확인했습니다.");
}
```

---

## 3. 원시 타입 7가지 훑어보기

JavaScript의 원시 타입은 정확히 7가지다.

**▶ 원시 타입 7가지**

| 타입 | 설명 | 예시 |
|---|---|---|
| `string` | 문자열 | `productName` → `"무선 이어폰"` |
| `number` | 숫자 | `productPrice` → `39000` |
| `boolean` | 참/거짓 | `isSoldOut` → `false` |
| `null` | 의도적으로 비워둔 값 | `selectedOption` → `null` |
| `undefined` | 아직 값이 들어오지 않은 상태 | `deliveryMemo` → `undefined` |
| `symbol` | 고유한 식별자를 만들 때 쓴다 | `Symbol()` |
| `bigint` | 아주 큰 정수를 다룰 때 쓴다 | `9007199254740993n` |

**💡 보충 설명**

<div class="wda-callout wda-ci">
  symbol과 bigint는 실무에서 자주 쓰이지 않는 특수한 타입이다. 지금은 "이런 타입도 있다" 정도로만 기억해두면 충분하다.
</div>

---

## 4. 문자열과 숫자 다루기

**• JavaScript: 문자열 다루기**

```javascript
const productName = "무선 이어폰";
console.log(`상품명: ${productName}`);
// 상품명: 무선 이어폰
```

**• JavaScript: 숫자 다루기**

```javascript
const productPrice = 39000;
console.log(productPrice);
// 39000
```

**💬 참고**

<div class="wda-callout wda-ci">
  템플릿 리터럴(백틱 <code>` `</code>)을 쓰면 문자열 안에 <code>${}</code>로 변수를 바로 넣을 수 있다. number 타입은 정수와 실수를 구분하지 않고 하나의 타입으로 다룬다.
</div>

---

## 5. 값이 없다: null과 undefined

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">📭 undefined</div>

변수를 선언만 하고 값을 넣지 않았을 때, 아직 값이 들어오지 않은 상태를 나타낸다.

**• JavaScript: undefined 확인하기**

```javascript
let deliveryMemo;
console.log(deliveryMemo);
// undefined — 아직 값이 들어오지 않은 상태
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">🚫 null</div>

개발자가 "지금은 값이 없다"는 것을 직접 표시하려고 넣는 값이다.

**• JavaScript: null 확인하기**

```javascript
let selectedOption = null;
console.log(selectedOption);
// null — 옵션을 아직 선택하지 않았다고 직접 표시한 상태
```

</div>

</div>

---

## 6. 숫자인데 숫자가 아니다: NaN

**• JavaScript: 잘못된 계산으로 NaN 만들기**

```javascript
const productPrice = 39000;
let quantity = "두 개"; // 숫자가 아닌 값이 들어온 상황

console.log(productPrice * quantity);
// NaN — 숫자가 아닌 값끼리 계산해 결과를 만들 수 없다
```

**• JavaScript: NaN 자기 자신과 비교하기**

```javascript
console.log(NaN === NaN);
// false — NaN은 자기 자신과도 같지 않은 유일한 값이다
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  소수 계산에서도 예상과 다른 값이 나올 수 있다. <code>0.1 + 0.2</code>를 계산하면 <code>0.3</code>이 아니라 <code>0.30000000000000004</code>가 나온다. 컴퓨터가 소수를 저장하는 방식 때문에 생기는 오차이며, 자세한 원리는 이 문서에서 다루지 않는다.
</div>

**• JavaScript: 소수 계산 오차 확인하기**

```javascript
console.log(0.1 + 0.2);
// 0.30000000000000004
```

---

## 7. 참조 타입: 객체·배열·함수

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ico">📦</div>
    <div class="wda-fcard-ttl">object (객체)</div>
    <div class="wda-fcard-dsc">키(key)와 값(value)의 쌍으로 여러 정보를 묶는다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ico">📋</div>
    <div class="wda-fcard-ttl">array (배열)</div>
    <div class="wda-fcard-dsc">순서가 있는 값의 목록을 담는다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ico">⚙️</div>
    <div class="wda-fcard-ttl">function (함수)</div>
    <div class="wda-fcard-dsc">특정 동작을 모아 나중에 실행할 수 있게 한다.</div>
  </div>
</div>

**• JavaScript: 객체 타입 확인하기**

```javascript
const orderInfo = { productName: "무선 이어폰", productPrice: 39000 };
console.log(orderInfo);
// { productName: "무선 이어폰", productPrice: 39000 }
```

**• JavaScript: 배열 타입 확인하기**

```javascript
const cartItems = ["무선 이어폰"];
console.log(cartItems);
// ["무선 이어폰"]
```

**• JavaScript: 함수 타입 확인하기**

```javascript
function showOrderSummary() {
  console.log("주문 정보를 확인했습니다.");
}

showOrderSummary();
// 주문 정보를 확인했습니다.
```

---

## 8. 원시 타입과 참조 타입은 왜 다르게 비교될까

**• JavaScript: 원시 타입 값 복사 확인하기**

```javascript
let priceA = 39000;
let priceB = priceA;
priceB = 50000;

console.log(priceA);
// 39000 — priceA는 그대로다 (값 자체가 복사됐다)
```

**• JavaScript: 참조 타입 값 공유 확인하기**

```javascript
let orderInfoA = { productName: "무선 이어폰", productPrice: 39000 };
let orderInfoB = orderInfoA;
orderInfoB.productPrice = 50000;

console.log(orderInfoA.productPrice);
// 50000 — orderInfoA도 함께 바뀐다 (같은 대상을 가리키고 있었다)
```

**• JavaScript: 빈 배열끼리 비교하기**

```javascript
console.log([] === []);
// false — 내용이 같아 보여도 서로 다른 대상이라 다르다고 판단한다
```

**📌 핵심 차이**

<div class="wda-callout wda-ci">
  원시 타입을 복사하면 값 자체가 복사되어 서로 영향을 주지 않는다. 참조 타입을 복사하면 같은 대상을 가리키게 되어 한쪽을 바꾸면 다른 쪽도 함께 바뀐다. <code>===</code> 비교도 내용이 아니라 이 "같은 대상인가"를 기준으로 판단한다.
</div>

---

## 9. typeof로 타입 확인하기 (+ Array.isArray)

**• JavaScript: typeof로 여러 값 타입 확인하기**

```javascript
const productName = "무선 이어폰";
const productPrice = 39000;
const isSoldOut = false;
const selectedOption = null;
let deliveryMemo;

console.log(typeof productName);    // "string"
console.log(typeof productPrice);   // "number"
console.log(typeof isSoldOut);      // "boolean"
console.log(typeof selectedOption); // "object"
console.log(typeof deliveryMemo);   // "undefined"
```

**⚠️ typeof null 주의**

<div class="wda-callout wda-cw">
  <code>selectedOption</code>은 <code>null</code>인데 <code>typeof</code> 결과는 <code>"object"</code>로 나온다. null인지 정확히 확인하려면 <code>typeof</code> 대신 <code>selectedOption === null</code>처럼 직접 비교한다.
</div>

**• JavaScript: Array.isArray로 배열 정확히 확인하기**

```javascript
const cartItems = ["무선 이어폰"];

console.log(typeof cartItems);
// "object" — 배열인지 일반 객체인지 구분이 안 된다

console.log(Array.isArray(cartItems));
// true — 배열인지 정확히 확인된다
```

---

## 10. 안전하게 문자열로 바꾸기: String() vs toString()

<div class="wda-compare">

<div class="wda-compare-card wda-modern">

<div class="wda-compare-ttl">✅ String()</div>

**• JavaScript: String()으로 안전하게 변환하기**

```javascript
const selectedOption = null;
console.log(String(selectedOption));
// "null" — 값이 없어도 안전하게 문자열로 바뀐다
```

</div>

<div class="wda-compare-card wda-legacy">

<div class="wda-compare-ttl">⚠️ .toString()</div>

**• JavaScript: .toString()의 에러 — 에러 확인용**

```javascript
const selectedOption = null;
console.log(selectedOption.toString());
// ❌ TypeError (일부러 에러 확인용)
```

</div>

</div>

**📌 선택 기준**

<div class="wda-callout wda-cs">
  값이 <code>null</code>이나 <code>undefined</code>일 수도 있다면 <code>String(value)</code>를 사용한다. <code>.toString()</code>은 값이 확실히 있을 때만 안전하다.
</div>

---

## 11. 동적 타이핑이란?

**• JavaScript: 동적 타이핑 확인하기**

```javascript
let selectedOption = null;
console.log(typeof selectedOption);
// "object"

selectedOption = "Blue";
console.log(typeof selectedOption);
// "string" — 같은 변수인데 담긴 값의 타입이 바뀌었다
```

**💡 보충 설명**

<div class="wda-callout wda-ci">
  이렇게 같은 변수에 다른 타입의 값을 자유롭게 다시 넣을 수 있는 것을 <strong>동적 타이핑</strong>이라고 한다. 변수 선언 시 타입을 고정하는 언어와 달리, JavaScript는 재할당할 때마다 타입이 바뀔 수 있다.
</div>

---

## 12. 초보자가 자주 만나는 타입 실수

<div class="wda-fgrid">

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 1 · null을 object로 착각</div>

**• JavaScript: null을 object로 착각하는 실수**

```javascript
const selectedOption = null;
console.log(typeof selectedOption);
// "object"
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> null인데 typeof 결과가 "object"라 실제 객체와 헷갈리기 쉽다.<br>
  <strong>기억할 점:</strong> null 확인은 typeof가 아니라 <code>=== null</code>로 한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 2 · 배열을 typeof로만 확인</div>

**• JavaScript: 배열을 typeof로만 확인하는 실수**

```javascript
const cartItems = ["무선 이어폰"];
console.log(typeof cartItems);
// "object"
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 배열도 "object"로 나와 일반 객체와 구분되지 않는다.<br>
  <strong>기억할 점:</strong> 배열 확인은 <code>Array.isArray()</code>를 쓴다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 3 · 빈 값에 .toString() 사용</div>

**• JavaScript: 빈 값에 .toString() 사용하는 실수**

```javascript
let deliveryMemo;
console.log(deliveryMemo.toString());
// ❌ TypeError (일부러 에러 확인용)
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> deliveryMemo가 undefined일 때 .toString()을 호출하면 에러가 난다.<br>
  <strong>기억할 점:</strong> 안전하게 문자열로 바꾸려면 <code>String(value)</code>를 쓴다.
</div>

</div>

</div>

---

## 13. 실습 과제

아직 화면 조작(DOM)은 배우지 않았으니, 이번에도 Console 결과로 직접 확인한다.

**🎯 목표**

새 상품 정보를 변수로 선언하고, 각 값의 타입을 직접 확인한다.

**📋 요구사항**

• `const`로 **상품명**(문자열)을 선언한다.<br>
• `let`으로 **가격**(숫자)과 **품절 여부**(불리언)를 선언한다.<br>
• 아직 선택하지 않은 옵션은 `null`로 선언한다.<br>
• 위 값들을 묶은 **주문 정보 객체**를 만든다.<br>
• `typeof`와 `Array.isArray`로 값들의 타입을 확인한다.

**• JavaScript: 실습 구성 예시**

```javascript
// 구성 예시: 상품명(const) / 가격·품절여부(let) / 미선택옵션(null) / 주문정보(object)
```

**💡 힌트 1 — 변수 선언**

**• JavaScript: 힌트 1 — 변수 선언**

```javascript
const productName = "블루투스 키보드";
let productPrice = 52000;
let isSoldOut = false;
let selectedOption = null;

console.log(productName, productPrice, isSoldOut, selectedOption);
// 블루투스 키보드 52000 false null
```

**💡 힌트 2 — 참조 타입으로 묶기**

**• JavaScript: 힌트 2 — 참조 타입으로 묶기**

```javascript
const orderInfo = { productName, productPrice, isSoldOut };
console.log(orderInfo);
// { productName: "블루투스 키보드", productPrice: 52000, isSoldOut: false }
```

**💡 힌트 3 — 타입 확인**

**• JavaScript: 힌트 3 — 타입 확인**

```javascript
console.log(typeof productName);        // "string"
console.log(typeof productPrice);       // "number"
console.log(Array.isArray(orderInfo));  // false — 객체는 배열이 아니다
```

**📌 정리 메모**

• `typeof`는 대부분의 타입을 구분해주지만 `null`은 `"object"`로 나온다.<br>
• 배열인지 확인할 때는 `Array.isArray()`를 쓴다.<br>
• 값이 없을 수도 있는 자리는 `null`로 명확히 표시한다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>원시 타입은 <strong>값 자체</strong>가 복사되어 서로 영향을 주지 않고, 참조 타입은 <strong>같은 대상</strong>을 가리키게 되어 한쪽을 바꾸면 다른 쪽도 함께 바뀐다.</li>
    <li><code>undefined</code>는 <strong>아직 값이 들어오지 않은 상태</strong>고, <code>null</code>은 개발자가 <strong>의도적으로 비워둔 상태</strong>다.</li>
    <li><strong>NaN</strong>은 자기 자신과도 같지 않은 유일한 값이며(<code>NaN === NaN</code>은 false), <code>0.1 + 0.2</code> 같은 소수 계산은 오차가 생길 수 있다.</li>
    <li><code>typeof null</code>은 <strong><code>"object"</code></strong>를 반환하고, 배열도 <code>typeof</code>로는 <strong><code>"object"</code></strong>로 나오므로 <code>Array.isArray()</code>로 확인해야 한다.</li>
    <li><code>.toString()</code>은 <code>null</code>/<code>undefined</code>에서 에러가 나지만, <code>String(value)</code>는 항상 안전하게 변환한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: typeof 결과가 "object"면 그 값은 객체다?</div>
    <div class="wda-mistake-right">정답: <code>null</code>도 <code>typeof</code> 결과가 <strong>"object"</strong>다 — null 확인은 <code>=== null</code>로 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: typeof로 배열과 일반 객체를 구분할 수 있다?</div>
    <div class="wda-mistake-right">정답: 둘 다 <strong>"object"</strong>로 나온다 — 배열 확인은 <code>Array.isArray()</code>를 쓴다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: NaN === NaN은 true다?</div>
    <div class="wda-mistake-right">정답: <strong>false</strong>다 — 자기 자신과도 같지 않은 유일한 값이다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: .toString()과 String()은 완전히 같다?</div>
    <div class="wda-mistake-right">정답: <strong><code>String(value)</code></strong>만 <code>null</code>/<code>undefined</code>에서도 안전하다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 한 번 선언한 변수는 항상 같은 타입의 값만 가진다?</div>
    <div class="wda-mistake-right">정답: JavaScript는 <strong>동적 타이핑</strong>이라 재할당하면 다른 타입의 값을 가질 수 있다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 복사 방식</div>
    <div class="wda-formula-block-body">
      <code>원시 타입 = 값 복사(독립)</code><br>
      <code>참조 타입 = 같은 대상 공유</code>
    </div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · null 표기</div>
    <div class="wda-formula-block-body">
      <code>typeof null → "object"</code><br>
      <code>null 확인 = x === null</code>
    </div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 안전 확인</div>
    <div class="wda-formula-block-body">
      <code>배열 확인 = Array.isArray()</code><br>
      <code>문자열 변환 = String(value)</code>
    </div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">원시 타입과 참조 타입, 복사되는 것은?</div>
    <div class="wda-flip-back">원시 타입은 값 자체가, 참조 타입은 같은 대상을 가리키는 참조가 복사된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">undefined와 null의 차이는?</div>
    <div class="wda-flip-back">undefined는 아직 값이 없는 상태, null은 개발자가 의도적으로 비운 상태다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">NaN === NaN의 결과는?</div>
    <div class="wda-flip-back">false다 — 자기 자신과도 같지 않은 유일한 값이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">typeof null의 결과는?</div>
    <div class="wda-flip-back">"object"다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">배열인지 안전하게 확인하는 방법은?</div>
    <div class="wda-flip-back">Array.isArray()를 사용한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">null/undefined를 문자열로 안전하게 바꾸려면?</div>
    <div class="wda-flip-back">String(value)를 사용한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">동적 타이핑이란?</div>
    <div class="wda-flip-back">같은 변수라도 재할당하면 다른 타입의 값을 가질 수 있는 것이다.</div>
  </div>
</div>
