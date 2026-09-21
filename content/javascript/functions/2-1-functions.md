---
title: "2-1 함수 선언하고 호출하기"
status: "completed"
description: "함수 선언문과 표현식, 매개변수와 반환값, 콜백과 IIFE까지 함수의 핵심 개념을 정리한다."
category: "JavaScript"
section: "Functions"
tags:
  - javascript
  - functions
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
/* 핵심 요약 전용 복습 UI — JavaScript 1-1~1-5 기준과 동일. 색은 background/border/accent에만 쓰고,
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
  • <strong>함수 정의 이해</strong> — 함수가 왜 필요한지, 입력 → 처리 → 출력이 어떻게 이어지는지 설명할 수 있다.<br>
  • <strong>선언 방식 구분</strong> — 함수 선언문과 함수 표현식의 차이를 구분해 상황에 맞게 사용할 수 있다.<br>
  • <strong>매개변수 활용</strong> — 매개변수/인자, 기본값 매개변수, 나머지 매개변수로 다양한 입력을 처리할 수 있다.<br>
  • <strong>실전 패턴 활용</strong> — 콜백, 재귀, IIFE 같은 함수 활용 패턴을 이해하고 직접 만들 수 있다.
</div>

---

## 1. 함수는 왜 필요한가: 반복을 줄이는 코드 블록

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">❌ 매번 다시 쓰면</div>

**• JavaScript: 매번 다시 쓰는 경우**

```javascript
console.log("아메리카노 주문 접수");
console.log("라떼 주문 접수");
console.log("카푸치노 주문 접수");
```

문구를 바꾸려면 세 줄을 전부 찾아 고쳐야 한다.

</div>

<div class="wda-compare-card wda-modern">

<div class="wda-compare-ttl">✅ 함수로 묶으면</div>

**• JavaScript: 함수로 묶기**

```javascript
function makeOrder(menuName) {
  console.log(`${menuName} 주문 접수`);
}

makeOrder("아메리카노");
makeOrder("라떼");
makeOrder("카푸치노");
```

문구는 함수 하나만 고치면 모든 호출에 반영된다.

</div>

</div>

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">♻️ 재사용성</div>
    <div class="wda-fcard-dsc">한 번 만들어두면 필요할 때마다 다시 가져다 쓴다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">🛠️ 유지보수성</div>
    <div class="wda-fcard-dsc">함수 하나만 고치면 사용하는 모든 곳에 반영된다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">📖 가독성</div>
    <div class="wda-fcard-dsc">코드 덩어리에 이름을 붙여 무슨 일을 하는지 알기 쉽다.</div>
  </div>
</div>

---

## 2. 함수가 동작하는 방식: 입력 → 처리 → 출력

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">입력</div><div class="wda-fnode-dsc">매개변수로 값을 받는다.</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">처리</div><div class="wda-fnode-dsc">함수 본문에서 계산한다.</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">출력</div><div class="wda-fnode-dsc">return으로 결과를 돌려준다.</div></div>
</div>

**• JavaScript: 입력 → 처리 → 출력 예시**

```javascript
function calculateTotal(price1, price2) {
  return price1 + price2;
}

console.log(calculateTotal(4500, 5000));
// 9500
```

---

## 3. 함수를 만드는 두 가지 방법: 선언문과 표현식

**• JavaScript: 함수 선언문**

```javascript
function makeOrder(menuName) {
  return `${menuName} 주문 완료`;
}
```

**• JavaScript: 함수 표현식**

```javascript
const makeOrder = function (menuName) {
  return `${menuName} 주문 완료`;
};
```

**▶ 함수 선언문 vs 함수 표현식**

| 구분 | 함수 선언문 | 함수 표현식 |
|---|---|---|
| 형태 | `function name() {}` | `const name = function() {}` |
| 정의 전 호출 | 가능하다 | 불가능하다 |
| 세미콜론 | 필요 없다 | 붙이는 것을 권장한다 |

---

## 4. 함수를 실행하기: 호출과 참조의 차이

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">makeOrder("라떼") — 호출</div>
    함수를 실제로 실행해 결과를 만든다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">makeOrder — 참조</div>
    실행하지 않고 함수 자체를 가리킨다.
  </div>
</div>

**• JavaScript: 호출과 참조 비교**

```javascript
function makeOrder(menuName) {
  console.log(`${menuName} 주문 접수`);
}

makeOrder("라떼");
// 라떼 주문 접수

makeOrder;
// 함수 자체 (실행되지 않는다)
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  괄호 <code>()</code>를 붙이지 않으면 함수는 실행되지 않는다. 이 차이는 뒤에서 다룰 <strong>콜백</strong>에서 특히 중요하다.
</div>

---

## 5. 결과값을 돌려주기: return

**• JavaScript: return으로 결과 돌려받기**

```javascript
function calculateTotal(price1, price2) {
  return price1 + price2;
}

const total = calculateTotal(4500, 5000);
console.log(total);
// 9500
```

**• JavaScript: return 없는 함수의 반환값**

```javascript
function logOrder(menuName) {
  console.log(`${menuName} 주문 접수`);
}

const result = logOrder("아메리카노");
console.log(result);
// undefined — return이 없으면 자동으로 undefined가 반환된다
```

---

## 6. 조건을 먼저 걸러내기: 조기 반환

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">❌ 중첩된 if</div>

**• JavaScript: 중첩된 if로 조건 처리하기**

```javascript
function processOrder(menuName, menuStock) {
  if (menuName) {
    if (menuStock > 0) {
      return `${menuName} 주문 접수`;
    } else {
      return "재고 없음";
    }
  } else {
    return "메뉴를 선택하세요";
  }
}
```

</div>

<div class="wda-compare-card wda-modern">

<div class="wda-compare-ttl">✅ 조기 반환</div>

**• JavaScript: 조기 반환으로 조건 처리하기**

```javascript
function processOrder(menuName, menuStock) {
  if (!menuName) return "메뉴를 선택하세요";
  if (menuStock <= 0) return "재고 없음";

  return `${menuName} 주문 접수`;
}
```

</div>

</div>

예외 상황을 먼저 처리하고 끝내면, 마지막에 남는 코드가 핵심 로직만 남아 읽기 쉬워진다.

---

## 7. 매개변수와 인자는 다른 말이다

**▶ 매개변수 vs 인자**

| 구분 | 의미 | 시점 |
|---|---|---|
| 매개변수 (Parameter) | 함수를 정의할 때 쓰는 변수 이름 | 정의 시점 |
| 인자 (Argument) | 함수를 호출할 때 실제로 넣는 값 | 호출 시점 |

**• JavaScript: 매개변수와 인자 확인하기**

```javascript
function makeOrder(menuName, size) {
  console.log(`${menuName}, ${size} 사이즈`);
}

makeOrder("라떼", "톨");
// 라떼, 톨 사이즈
```

인자 개수가 맞지 않아도 JavaScript는 에러를 내지 않는다.

**• JavaScript: 인자 개수가 맞지 않는 경우**

```javascript
function makeOrder(menuName, size) {
  console.log(menuName, size);
}

makeOrder("라떼");
// "라떼" undefined — size 자리가 비어 undefined가 된다
```

---

## 8. 값이 없을 때 대신 쓸 값: 기본값 매개변수

**• JavaScript: 기본값 매개변수 사용하기**

```javascript
function makeOrder(menuName, size = "톨") {
  console.log(`${menuName}, ${size} 사이즈`);
}

makeOrder("라떼", "그란데");
// 라떼, 그란데 사이즈

makeOrder("라떼");
// 라떼, 톨 사이즈 — size를 안 넣으면 기본값이 쓰인다
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  기본값 매개변수는 <strong>뒤쪽</strong>에 둔다. <code>function makeOrder(size = "톨", menuName)</code>처럼 앞에 두면 menuName만 넘기고 싶을 때도 항상 두 값을 다 써야 해서 불편해진다.
</div>

---

## 9. 나머지 값을 한 번에 받기: 나머지 매개변수

**• JavaScript: 나머지 매개변수로 값 모으기**

```javascript
function calculateTotal(...prices) {
  let total = 0;

  for (const price of prices) {
    total += price;
  }

  return total;
}

console.log(calculateTotal(4500, 5000, 3800));
// 13300
```

**💡 보충 설명**

<div class="wda-callout wda-ci">
  <code>...prices</code>처럼 <code>...</code>을 붙이면 남은 인자들을 <strong>진짜 배열</strong>로 모아준다. 그래서 <code>for...of</code>나 배열 메서드를 바로 사용할 수 있다. 나머지 매개변수는 항상 맨 마지막에 와야 한다.
</div>

---

## 10. 매개변수도 지역 변수다

**• JavaScript: 매개변수 스코프 확인하기**

```javascript
function makeOrder(menuName) {
  console.log(menuName);
}

makeOrder("라떼");
// 라떼

console.log(menuName);
// ❌ ReferenceError (일부러 에러 확인용)
```

매개변수는 그 함수 안에서만 쓸 수 있는 지역 변수이며, 함수 밖에서는 접근할 수 없다.

---

## 11. 선언문과 표현식은 시작 시점이 다르다

**• JavaScript: 함수 선언문은 정의 전에도 호출 가능**

```javascript
console.log(calculateTotal(3000, 2000));
// 5000

function calculateTotal(a, b) {
  return a + b;
}
```

**• JavaScript: 함수 표현식은 정의 전 호출 불가**

```javascript
console.log(calculateTotal(3000, 2000));
// ❌ ReferenceError (일부러 에러 확인용)

const calculateTotal = function (a, b) {
  return a + b;
};
```

**📌 핵심 차이**

<div class="wda-callout wda-ci">
  함수 선언문은 정의 전 위치에서 호출해도 문제없이 동작하지만, 함수 표현식은 <code>const</code>/<code>let</code> 변수 규칙을 그대로 따르기 때문에 정의된 줄을 지나야 호출할 수 있다.
</div>

---

## 12. 함수는 값처럼 다룰 수 있다: 일급 객체

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">변수에 담기</div>
    <div class="wda-fcard-dsc">함수를 값처럼 변수에 저장할 수 있다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">인자로 전달</div>
    <div class="wda-fcard-dsc">다른 함수의 인자로 넘길 수 있다 — 콜백의 기반이다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">반환값으로 사용</div>
    <div class="wda-fcard-dsc">함수가 함수를 반환할 수도 있다.</div>
  </div>
</div>

**• JavaScript: 함수를 배열에 담기**

```javascript
const orderFns = [makeOrder, calculateTotal];

console.log(typeof orderFns[0]);
// "function"
```

---

## 13. 함수를 나중에 실행시키기: 콜백

**• JavaScript: 콜백 함수 전달하기**

```javascript
function makeOrder(menuName) {
  console.log(`${menuName} 준비 완료`);
}

function notifyWhenReady(menuName, callback) {
  callback(menuName);
}

notifyWhenReady("라떼", makeOrder);
// 라떼 준비 완료
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  콜백으로 넘길 때는 괄호 없이 함수 이름만 전달한다. <code>notifyWhenReady("라떼", makeOrder())</code>처럼 괄호를 붙이면 그 자리에서 바로 실행되어, 실행 결과(undefined)가 콜백 자리에 들어가 버린다.
</div>

---

## 14. 자기 자신을 다시 부르기: 재귀 함수

**• JavaScript: 재귀 함수로 손님 호출하기**

```javascript
function callNextTicket(remaining) {
  if (remaining <= 0) {
    console.log("오늘 대기 마감");
    return;
  }

  console.log(`${remaining}번째 손님 호출`);
  callNextTicket(remaining - 1);
}

callNextTicket(3);
// 3번째 손님 호출
// 2번째 손님 호출
// 1번째 손님 호출
// 오늘 대기 마감
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  재귀 함수는 반드시 <strong>종료 조건</strong>이 있어야 한다. 종료 조건이 없거나 잘못되면 함수가 자기 자신을 끝없이 호출해 <code>Maximum call stack size exceeded</code> 에러가 난다.
</div>

---

## 15. 정의하자마자 실행하기: IIFE

**• JavaScript: IIFE로 즉시 실행하기**

```javascript
const storeConfig = (function () {
  const openHour = 9;
  const closeHour = 22;

  return { openHour, closeHour };
})();

console.log(storeConfig);
// { openHour: 9, closeHour: 22 }
```

**💡 보충 설명**

<div class="wda-callout wda-ci">
  함수를 정의함과 동시에 즉시 실행하는 패턴이다. 내부 변수(<code>openHour</code> 등)가 바깥 스코프로 새어나가지 않아, 한 번만 실행할 초기화 코드를 담을 때 자주 쓰인다.
</div>

---

## 16. 초보자가 자주 만나는 함수 실수

<div class="wda-fgrid">

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 1 · return 없이 값 기대</div>

**• JavaScript: return 없이 값을 기대하는 실수**

```javascript
function makeOrder(menuName) {
  console.log(`${menuName} 접수`);
}

const result = makeOrder("라떼");
console.log(result);
// undefined
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> return이 없으면 자동으로 undefined가 반환된다.<br>
  <strong>기억할 점:</strong> 값을 돌려주려면 반드시 return을 쓴다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 2 · 콜백에 괄호 붙이기</div>

**• JavaScript: 콜백에 괄호를 붙이는 실수**

```javascript
function makeOrder(menuName) {
  console.log(`${menuName} 준비 완료`);
}

notifyWhenReady("라떼", makeOrder());
// 즉시 실행된다
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 괄호를 붙이면 그 자리에서 바로 실행되고, 실행 결과가 전달된다.<br>
  <strong>기억할 점:</strong> 콜백은 괄호 없이 함수 이름만 전달한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 3 · 표현식을 정의 전에 호출</div>

**• JavaScript: 함수 표현식을 정의 전에 호출하는 실수**

```javascript
console.log(calculateTotal(1000, 2000));
// ❌ ReferenceError (일부러 에러 확인용)

const calculateTotal = function (a, b) {
  return a + b;
};
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 함수 표현식은 변수 규칙을 따라 정의된 줄을 지나야 쓸 수 있다.<br>
  <strong>기억할 점:</strong> 함수 표현식은 항상 정의 후에 호출한다.
</div>

</div>

</div>

---

## 17. 실습 과제

아직 화면 조작(DOM)은 배우지 않았으니, 이번에도 Console 결과로 직접 확인한다.

**🎯 목표**

카페 주문 처리 함수를 만들고, 실행 결과를 확인한다.

**📋 요구사항**

• `makeOrder(menuName, size = "톨")` — 기본값 매개변수를 사용한다.<br>
• `calculateTotal(...prices)` — 나머지 매개변수로 여러 금액을 더한다.<br>
• `processOrder(menuName, menuStock)` — 조기 반환으로 예외 상황을 먼저 처리한다.<br>
• `notifyWhenReady(menuName, callback)` — 콜백을 실행한다.

**• JavaScript: 실습 구성 예시**

```javascript
// 구성 예시: 주문 생성 / 합계 계산 / 재고 확인 / 준비 완료 알림
```

**💡 힌트 1 — 기본값 매개변수**

**• JavaScript: 힌트 1 — 기본값 매개변수**

```javascript
function makeOrder(menuName, size = "톨") {
  return `${menuName}, ${size} 사이즈 주문`;
}

console.log(makeOrder("아메리카노"));
// 아메리카노, 톨 사이즈 주문
```

**💡 힌트 2 — 나머지 매개변수**

**• JavaScript: 힌트 2 — 나머지 매개변수**

```javascript
function calculateTotal(...prices) {
  let total = 0;

  for (const price of prices) {
    total += price;
  }

  return total;
}

console.log(calculateTotal(4500, 3800));
// 8300
```

**💡 힌트 3 — 조기 반환**

**• JavaScript: 힌트 3 — 조기 반환**

```javascript
function processOrder(menuName, menuStock) {
  if (!menuName) return "메뉴를 선택하세요";
  if (menuStock <= 0) return "재고 없음";

  return `${menuName} 주문 접수`;
}

console.log(processOrder("라떼", 0));
// 재고 없음
```

**📌 정리 메모**

• 함수는 입력(매개변수) → 처리(본문) → 출력(반환값) 순서로 동작한다.<br>
• return이 없으면 undefined가 자동으로 반환된다.<br>
• 콜백은 괄호 없이 함수 이름만 전달한다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>함수는 재사용 가능한 코드 블록이며, <strong>입력(매개변수) → 처리(본문) → 출력(반환값)</strong> 순서로 동작한다.</li>
    <li><strong>함수 선언문</strong>은 정의 전에도 호출할 수 있지만, <strong>함수 표현식</strong>은 정의된 줄을 지나야 호출할 수 있다.</li>
    <li><code>함수명()</code>은 <strong>호출</strong>(즉시 실행)이고 <code>함수명</code>은 <strong>참조</strong>(함수 자체)이며, 콜백은 참조로 전달한다.</li>
    <li>return을 생략하면 자동으로 <strong>undefined</strong>가 반환되고, <strong>조기 반환</strong>은 예외 상황을 먼저 걸러내 코드를 단순하게 만든다.</li>
    <li><strong>기본값 매개변수</strong>는 값이 없을 때 대신 쓰이고, <strong>나머지 매개변수(...)</strong>는 남은 인자를 배열로 모은다.</li>
    <li>함수는 <strong>일급 객체</strong>라서 변수에 담고, 인자로 전달하고, 반환값으로 쓸 수 있다 — 이 성질이 콜백의 기반이다.</li>
    <li><strong>재귀 함수</strong>는 자기 자신을 다시 호출하며, 반드시 종료 조건이 있어야 한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 함수 선언문과 함수 표현식은 둘 다 정의 전에 호출할 수 있다?</div>
    <div class="wda-mistake-right">정답: <strong>함수 선언문만</strong> 가능하다. 함수 표현식은 정의된 줄을 지나야 호출할 수 있다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 콜백에 괄호를 붙여도 나중에 실행된다?</div>
    <div class="wda-mistake-right">정답: 괄호를 붙이면 그 자리에서 <strong>즉시 실행</strong>된다 — 나중에 실행하려면 괄호 없이 전달한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: return이 없으면 에러가 난다?</div>
    <div class="wda-mistake-right">정답: 에러가 아니라 자동으로 <strong>undefined</strong>가 반환된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 인자 개수가 매개변수 개수와 다르면 에러가 난다?</div>
    <div class="wda-mistake-right">정답: 에러 없이 <strong>부족하면 undefined, 넘치면 무시</strong>된다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 정의 방식</div>
    <div class="wda-formula-block-body">
      <code>선언문 = 정의 전 호출 가능</code><br>
      <code>표현식 = 정의 후에만 가능</code>
    </div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 호출과 참조</div>
    <div class="wda-formula-block-body">
      <code>fn() = 호출</code><br>
      <code>fn = 참조(콜백용)</code>
    </div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · IPO 모델</div>
    <div class="wda-formula-block-body">
      <code>입력(매개변수) → 처리(본문) → 출력(반환값)</code>
    </div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">함수 선언문과 함수 표현식의 차이는?</div>
    <div class="wda-flip-back">선언문은 정의 전에도 호출 가능하지만, 표현식은 정의 후에만 호출 가능하다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">fn()과 fn의 차이는?</div>
    <div class="wda-flip-back">fn()은 호출(즉시 실행), fn은 함수 자체를 가리키는 참조다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">return을 생략하면?</div>
    <div class="wda-flip-back">자동으로 undefined가 반환된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">매개변수와 인자의 차이는?</div>
    <div class="wda-flip-back">매개변수는 정의할 때 쓰는 이름, 인자는 호출할 때 넣는 값이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">나머지 매개변수(...)는 무엇을 만드나?</div>
    <div class="wda-flip-back">남은 인자들을 진짜 배열로 모아준다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">콜백을 넘길 때 괄호를 붙이면?</div>
    <div class="wda-flip-back">즉시 실행되어 그 결과가 콜백 자리에 전달된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">재귀 함수에 반드시 있어야 하는 것은?</div>
    <div class="wda-flip-back">종료 조건(base case)이다. 없으면 무한 호출로 에러가 난다.</div>
  </div>
</div>
