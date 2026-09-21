---
title: "1-4 연산자 알아보기"
status: "completed"
description: "JavaScript 연산자의 종류와 사용 기준을 정리한다."
category: "JavaScript"
section: "Basics"
tags:
  - javascript
  - basics
  - operator
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
.wda-callout p{margin:0 0 .45rem;font-size:.9rem;line-height:1.75}
.wda-callout p:last-child{margin-bottom:0}
.wda-callout ul{margin:.35rem 0 0;padding-left:1.1rem}
.wda-callout li{margin:.24rem 0;line-height:1.75;font-size:.83rem}
.wda-callout .wda-clabel{font-size:.7rem;line-height:1.3}
/* 핵심 요약 전용 복습 UI — JavaScript 1-1~1-3 기준과 동일. 색은 background/border/accent에만 쓰고,
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
  • <strong>계산 결과 예측</strong> — 산술·할당 연산자로 주문 금액을 계산한 결과를 예측할 수 있다.<br>
  • <strong>정확한 비교</strong> — <code>==</code> 대신 <code>===</code>를 사용해야 하는 이유를 코드 결과로 설명할 수 있다.<br>
  • <strong>조건 조합</strong> — 논리 연산자와 삼항 연산자로 여러 조건을 하나의 결과로 조합할 수 있다.<br>
  • <strong>안전한 접근</strong> — <code>?.</code>/<code>??</code> 연산자로 값이 없을 수도 있는 상황을 안전하게 처리할 수 있다.
</div>

---

## 1. 연산자는 값을 다루는 작은 명령이다

연산자는 값 하나 또는 여러 값을 받아 새로운 값을 만드는 작은 명령이다.

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">🔢 산술</div>
    <div class="wda-fcard-dsc">금액을 더하거나 빼는 등 계산 결과를 만든다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">⚖️ 비교</div>
    <div class="wda-fcard-dsc">두 값을 비교해 참/거짓을 판단한다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">🔗 논리</div>
    <div class="wda-fcard-dsc">여러 조건을 하나의 결과로 조합한다.</div>
  </div>
</div>

---

## 2. 주문 금액을 계산하기: 산술 연산자

**▶ 산술 연산자 정리**

| 연산자 | 의미 | 예시 | 결과 |
|---|---|---|---|
| `+` | 더하기 | `10 + 3` | `13` |
| `-` | 빼기 | `10 - 3` | `7` |
| `*` | 곱하기 | `10 * 3` | `30` |
| `/` | 나누기 | `10 / 3` | `3.333...` |
| `%` | 나머지 | `10 % 3` | `1` |
| `**` | 거듭제곱 | `10 ** 3` | `1000` |

**• JavaScript: 산술 연산자로 금액 계산하기**

```javascript
const orderAmount = 32000;
const shippingFee = 3000;

console.log(orderAmount + shippingFee);
// 35000
```

**• JavaScript: 나머지 연산자로 남는 개수 구하기**

```javascript
const stockCount = 23;

console.log(stockCount % 10);
// 3 — 10개씩 포장하고 남는 개수
```

---

## 3. 문자열과 숫자가 만나면 생기는 문제

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">❌ 문자열이 섞이면</div>

**• JavaScript: 문자열이 섞여 이어붙는 경우**

```javascript
const orderAmount = "32000";
const shippingFee = 3000;

console.log(orderAmount + shippingFee);
// "320003000"
// 숫자 계산이 아니라 문자열이 이어붙었다
```

</div>

<div class="wda-compare-card wda-modern">

<div class="wda-compare-ttl">✅ 숫자로 맞추면</div>

**• JavaScript: 숫자로 맞춰 정상 계산하기**

```javascript
const orderAmount = 32000;
const shippingFee = 3000;

console.log(orderAmount + shippingFee);
// 35000
// 정상적인 숫자 계산
```

</div>

</div>

`+` 연산자는 숫자끼리 만나면 더하지만, 문자열이 하나라도 섞이면 이어붙인다.

---

## 4. 값을 1씩 바꾸기: 증감 연산자

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">후위 — stockCount--</div>

현재 값을 먼저 반환하고, 그 다음에 값을 바꾼다.

**• JavaScript: 후위 증감 연산자 확인하기**

```javascript
let stockCount = 5;

console.log(stockCount--);
// 5 — 먼저 현재 값을 반환한다

console.log(stockCount);
// 4 — 반환 후에 값이 줄었다
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">전위 — --stockCount</div>

값을 먼저 바꾸고, 바뀐 값을 반환한다.

**• JavaScript: 전위 증감 연산자 확인하기**

```javascript
let stockCount = 5;

console.log(--stockCount);
// 4 — 먼저 값을 줄인 뒤 그 값을 반환한다
```

</div>

</div>

---

## 5. 값을 다시 저장하기: 할당과 복합 할당

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl"><code>+=</code></div><div class="wda-fcard-dsc">더한 뒤 저장 — <code>x = x + n</code></div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl"><code>-=</code></div><div class="wda-fcard-dsc">뺀 뒤 저장 — <code>x = x - n</code></div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl"><code>*=</code></div><div class="wda-fcard-dsc">곱한 뒤 저장 — <code>x = x * n</code></div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl"><code>/=</code></div><div class="wda-fcard-dsc">나눈 뒤 저장 — <code>x = x / n</code></div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl"><code>%=</code></div><div class="wda-fcard-dsc">나머지를 저장 — <code>x = x % n</code></div></div>
</div>

**• JavaScript: 복합 할당 연산자로 금액 갱신하기**

```javascript
let finalAmount = 32000;

finalAmount += 3000; // 배송비를 더한다
console.log(finalAmount);
// 35000

finalAmount -= 5000; // 쿠폰 할인을 뺀다
console.log(finalAmount);
// 30000
```

---

## 6. 두 값을 비교하기

**▶ 비교 연산자 정리**

| 연산자 | 의미 | 예시 | 결과 |
|---|---|---|---|
| `>` | 초과 | `5 > 3` | `true` |
| `>=` | 이상 | `5 >= 5` | `true` |
| `<` | 미만 | `3 < 5` | `true` |
| `<=` | 이하 | `3 <= 3` | `true` |

**• JavaScript: 비교 연산자로 재고 확인하기**

```javascript
const stockCount = 0;

console.log(stockCount > 0);
// false — 재고가 없다
```

---

## 7. ==보다 ===를 우선 쓰는 이유

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">== (동등 비교)</div>

타입이 달라도 값을 맞춰서 비교한다.

**• JavaScript: == 동등 비교하기**

```javascript
const stockCount = 0;

console.log(stockCount == "0");
// true — 타입이 달라도 값을 맞춰서 비교한다
```

</div>

<div class="wda-compare-card wda-modern">

<div class="wda-compare-ttl">=== (일치 비교)</div>

값과 타입이 모두 같아야 참이다.

**• JavaScript: === 일치 비교하기**

```javascript
const stockCount = 0;

console.log(stockCount === "0");
// false — 타입까지 같아야 참이다
```

</div>

</div>

**📌 핵심 차이**

<div class="wda-callout wda-ci">
  <code>==</code>는 비교하기 전에 타입을 자바스크립트가 임의로 맞춰버려서 예측하기 어려운 결과가 나올 수 있다. 그래서 비교는 항상 <strong><code>===</code></strong>를 기본으로 사용한다.
</div>

---

## 8. 조건을 조합하기: 논리 연산자

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl"><code>&&</code> (AND)</div><div class="wda-fcard-dsc">둘 다 <code>true</code>여야 <code>true</code></div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl"><code>||</code> (OR)</div><div class="wda-fcard-dsc">하나라도 <code>true</code>면 <code>true</code></div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl"><code>!</code> (NOT)</div><div class="wda-fcard-dsc">참/거짓을 반대로 뒤집는다</div></div>
</div>

**• JavaScript: && AND 연산자 사용하기**

```javascript
const isMember = true;
const stockCount = 3;

console.log(isMember && stockCount > 0);
// true — 회원이면서 재고도 있다
```

**• JavaScript: || OR 연산자 사용하기**

```javascript
const isMember = false;
const stockCount = 3;

console.log(isMember || stockCount > 0);
// true — 둘 중 하나만 참이어도 된다
```

**• JavaScript: ! NOT 연산자 사용하기**

```javascript
const isMember = false;

console.log(!isMember);
// true — 회원이 아니라는 조건을 뒤집는다
```

---

## 9. true/false가 아니어도 조건처럼 쓰이는 값

boolean이 아닌 값도 조건문 안에서는 참(truthy) 또는 거짓(falsy)으로 평가된다.

**• JavaScript: falsy 값 조건문으로 확인하기**

```javascript
const selectedCoupon = "";

if (!selectedCoupon) {
  console.log("적용된 쿠폰이 없습니다.");
}
// 적용된 쿠폰이 없습니다.
```

**📌 개념**

<div class="wda-callout wda-ci">
  조건문에서 false로 취급되는 값은 <code>false</code>, <code>0</code>, <code>""</code>(빈 문자열), <code>null</code>, <code>undefined</code>, <code>NaN</code> 여섯 가지뿐이다. 이 여섯 가지를 제외한 나머지 값(빈 배열 <code>[]</code>과 빈 객체 <code>{}</code> 포함)은 모두 true로 취급된다.
</div>

---

## 10. 값이 정해지면 멈추는 계산: 단축 평가

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">&& — false를 만나면 멈춘다</div>
    앞이 false면 뒤는 확인하지 않고 그대로 반환한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">|| — true를 만나면 멈춘다</div>
    앞이 true면 뒤는 확인하지 않고 그대로 반환한다.
  </div>
</div>

**• JavaScript: &&로 단축 평가하기**

```javascript
const isMember = true;

isMember && console.log("회원 할인 적용 대상입니다.");
// 회원 할인 적용 대상입니다.
```

**• JavaScript: ||로 기본값 채우기**

```javascript
const userProfile = { nickname: "" };
const displayName = userProfile.nickname || "게스트";

console.log(displayName);
// "게스트"
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <code>&&</code>/<code>||</code>는 boolean만 돌려주는 것이 아니라, 실제로 판단에 사용된 값을 그대로 돌려준다. 위 예제의 <code>displayName</code>도 <code>true</code>가 아니라 문자열 <code>"게스트"</code>다.
</div>

---

## 11. 한 줄로 조건 결과 고르기: 삼항 연산자

`조건 ? 참일 때 값 : 거짓일 때 값` 형태로 if-else를 한 줄로 줄일 수 있다.

**• JavaScript: 삼항 연산자로 재고 라벨 만들기**

```javascript
const stockCount = 0;
const stockLabel = stockCount > 0 ? "구매 가능" : "품절";

console.log(stockLabel);
// "품절"
```

---

## 12. 함수 호출과 속성 접근

**• JavaScript: 함수 호출과 참조 구분하기**

```javascript
function calculateShippingFee() {
  return 3000;
}

console.log(calculateShippingFee);
// 함수 자체 (실행되지 않는다)

console.log(calculateShippingFee());
// 3000 — 괄호를 붙여야 실행된다
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">점 표기법 — userProfile.grade</div>
    가장 많이 쓰는 방식, 간결하고 읽기 좋다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">대괄호 표기법 — userProfile["grade"]</div>
    속성 이름을 변수로 동적으로 접근할 때 필요하다.
  </div>
</div>

**• JavaScript: 점·대괄호 표기법으로 속성 접근하기**

```javascript
const userProfile = { grade: "GOLD" };

console.log(userProfile.grade);
// "GOLD"

console.log(userProfile["grade"]);
// "GOLD"
```

---

## 13. 안전하게 접근하기: ?.와 ??

<div class="wda-compare">

<div class="wda-compare-card wda-legacy">

<div class="wda-compare-ttl">❌ ?. 없이 접근</div>

**• JavaScript: ?. 없이 접근 — 에러 확인용**

```javascript
const userProfile = null;
console.log(userProfile.grade);
// ❌ TypeError (일부러 에러 확인용)
```

</div>

<div class="wda-compare-card wda-modern">

<div class="wda-compare-ttl">✅ ?. 로 접근</div>

**• JavaScript: ?.로 안전하게 접근하기**

```javascript
const userProfile = null;
console.log(userProfile?.grade);
// undefined — 에러 없이 안전하게 통과한다
```

</div>

</div>

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">couponAmount || 500</div>
    <code>0</code>도 falsy라서 기본값으로 바뀐다.
  </div>
  <div class="wda-compare-card wda-modern">
    <div class="wda-compare-ttl">couponAmount ?? 500</div>
    <code>null</code>/<code>undefined</code>일 때만 기본값을 쓴다.
  </div>
</div>

**• JavaScript: ||와 ??의 falsy 처리 차이 확인하기**

```javascript
const couponAmount = 0;

console.log(couponAmount || 500);
// 500 — 0이 falsy라서 기본값으로 바뀐다

console.log(couponAmount ?? 500);
// 0 — null/undefined가 아니므로 그대로 유지된다
```

**✅ 선택 기준**

<div class="wda-callout wda-cs">
  <code>??</code>는 <code>0</code>이나 <code>""</code>처럼 실제로 의미 있는 값을 지켜야 할 때 <code>||</code> 대신 사용한다.
</div>

---

## 14. 초보자가 자주 만나는 연산자 실수

<div class="wda-fgrid">

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 1 · ==로 값 비교</div>

**• JavaScript: ==로 값 비교하는 실수**

```javascript
const orderCount = "1";
console.log(orderCount == 1);
// true
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 타입이 달라도 값만 맞으면 true가 되어 예상 못한 결과가 나올 수 있다.<br>
  <strong>기억할 점:</strong> 비교는 항상 <code>===</code>를 쓴다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 2 · 0에 || 사용</div>

**• JavaScript: 0에 || 사용하는 실수**

```javascript
const couponAmount = 0;
console.log(couponAmount || 100);
// 100
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 0은 falsy라서 유효한 값인데도 기본값으로 대체된다.<br>
  <strong>기억할 점:</strong> 0을 지켜야 하면 <code>??</code>를 쓴다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 3 · null에 바로 접근</div>

**• JavaScript: null에 바로 접근하는 실수**

```javascript
const userProfile = null;
console.log(userProfile.grade);
// ❌ TypeError (일부러 에러 확인용)
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> null은 속성이 없어서 바로 접근하면 에러가 난다.<br>
  <strong>기억할 점:</strong> <code>?.</code>로 안전하게 접근한다.
</div>

</div>

</div>

---

## 15. 실습 과제

아직 화면 조작(DOM)은 배우지 않았으니, 이번에도 Console 결과로 직접 확인한다.

**🎯 목표**

주문 결제 정보를 계산하고, 조건에 따라 확인 문구를 만든다.

**📋 요구사항**

• `orderAmount`와 `shippingFee`를 더해 `finalAmount`를 계산한다.<br>
• `isMember`와 재고 수량으로 **구매 가능 여부**를 조합한다.<br>
• 삼항 연산자로 **재고 라벨**("구매 가능"/"품절")을 만든다.<br>
• `??`로 쿠폰 금액의 기본값을 안전하게 처리한다.

**• JavaScript: 실습 구성 예시**

```javascript
// 구성 예시: 결제 금액 계산 / 구매 가능 여부 / 재고 라벨 / 쿠폰 기본값
```

**💡 힌트 1 — 금액 계산**

**• JavaScript: 힌트 1 — 금액 계산**

```javascript
const orderAmount = 45000;
const shippingFee = 3000;
let finalAmount = orderAmount;

finalAmount += shippingFee;
console.log(finalAmount);
// 48000
```

**💡 힌트 2 — 조건 조합**

**• JavaScript: 힌트 2 — 조건 조합**

```javascript
const isMember = true;
const stockCount = 2;

console.log(isMember && stockCount > 0);
// true

const stockLabel = stockCount > 0 ? "구매 가능" : "품절";
console.log(stockLabel);
// "구매 가능"
```

**💡 힌트 3 — 안전한 기본값**

**• JavaScript: 힌트 3 — 안전한 기본값**

```javascript
const couponAmount = 0;

console.log(couponAmount ?? 500);
// 0 — 실제 값이 있으므로 기본값을 쓰지 않는다
```

**📌 정리 메모**

• 문자열과 숫자가 섞이면 `+`는 이어붙이기가 된다.<br>
• 비교는 항상 `===`를 사용한다.<br>
• `0`이나 `""`을 지켜야 하면 `||` 대신 `??`를 쓴다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><code>+</code>는 숫자끼리 만나면 더하지만, <strong>문자열이 하나라도 섞이면 이어붙인다</strong>.</li>
    <li><code>===</code>는 값과 타입을 모두 비교하고, <code>==</code>는 타입을 바꿔서 비교하므로 <strong>항상 ===를 우선</strong>한다.</li>
    <li>falsy로 취급되는 값은 <strong>false, 0, "", null, undefined, NaN</strong> 6가지뿐이며, 나머지는 모두 truthy다.</li>
    <li><code>&&</code>/<code>||</code>는 boolean이 아니라 <strong>실제로 판단에 쓰인 값</strong>을 그대로 반환한다.</li>
    <li><code>?.</code>는 null/undefined에서도 에러 없이 통과하고, <code>??</code>는 <strong>null/undefined일 때만</strong> 기본값을 사용해 0이나 ""을 지킨다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: ==도 ===와 같은 결과를 준다?</div>
    <div class="wda-mistake-right">정답: 타입이 다르면 결과가 달라질 수 있다 — 항상 <strong>===</strong>를 쓴다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 0이나 ""는 항상 기본값으로 바뀌어야 한다?</div>
    <div class="wda-mistake-right">정답: 유효한 값으로 지키려면 <code>||</code>가 아니라 <strong>??</strong>를 쓴다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 빈 배열/빈 객체도 falsy다?</div>
    <div class="wda-mistake-right">정답: <strong>truthy</strong>다 — falsy는 6가지뿐이다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: null에 바로 .으로 접근해도 된다?</div>
    <div class="wda-mistake-right">정답: 에러가 난다 — <strong>?.</strong>로 안전하게 접근한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 비교</div>
    <div class="wda-formula-block-body">
      <code>비교는 항상 ===</code>
    </div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · falsy 6가지</div>
    <div class="wda-formula-block-body">
      <code>false / 0 / "" / null / undefined / NaN</code>
    </div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 안전 접근</div>
    <div class="wda-formula-block-body">
      <code>?. → 에러 방어</code><br>
      <code>?? → 0·"" 지키는 기본값</code>
    </div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">== 대신 항상 무엇을 써야 하나?</div>
    <div class="wda-flip-back">===. 타입까지 같아야 참이 되므로 예측 가능한 비교를 할 수 있다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">falsy 값 6가지는?</div>
    <div class="wda-flip-back">false, 0, "", null, undefined, NaN이다. 빈 배열/빈 객체는 truthy다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">&&와 ||의 차이는?</div>
    <div class="wda-flip-back">&&는 앞이 참일 때만 뒤를 실행하고, ||는 앞이 거짓일 때만 뒤를 실행한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">?.는 무슨 역할을 하나?</div>
    <div class="wda-flip-back">null/undefined에서도 에러 없이 통과시켜준다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">0이나 ""를 유효한 값으로 지키려면?</div>
    <div class="wda-flip-back">||가 아니라 ??를 사용한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">전위 증가와 후위 증가의 차이는?</div>
    <div class="wda-flip-back">전위(--x)는 먼저 바꾸고 반환하고, 후위(x--)는 먼저 반환하고 나중에 바꾼다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">삼항 연산자의 기본 형태는?</div>
    <div class="wda-flip-back">조건 ? 참일 때 값 : 거짓일 때 값이다.</div>
  </div>
</div>
