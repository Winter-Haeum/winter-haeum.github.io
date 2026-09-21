---
title: "4-3 스코프 체인과 클로저"
status: "completed"
description: "스코프 체인, 렉시컬 스코프, 클로저의 동작 원리와 활용법을 정리한다."
category: "JavaScript"
section: "ES6+"
tags:
  - javascript
  - scope
  - closure
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
/* 핵심 요약 전용 복습 UI — JavaScript 1-1~1-5·2-1~2-3 기준과 동일. 색은 background/border/accent에만
   쓰고, 본문 텍스트는 카드 색과 무관하게 진회색(#2C2840)·strong은 #1F1B2E로 고정한다. */
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
  • <strong>스코프 이해</strong> — 변수를 찾는 범위가 어떻게 정해지는지 설명할 수 있다.<br>
  • <strong>스코프 체인 이해</strong> — 중첩된 함수에서 변수를 안쪽부터 바깥쪽으로 찾는 순서를 설명할 수 있다.<br>
  • <strong>클로저 이해</strong> — 함수가 자신이 선언된 환경을 기억하는 원리를 설명할 수 있다.<br>
  • <strong>클로저 활용</strong> — 클로저로 상태를 숨기거나 독립된 상태를 가진 함수를 만들 수 있다.
</div>

---

## 1. 스코프를 알아야 하는 이유

**• JavaScript: 같은 이름 변수의 독립성 확인하기**

```javascript
let notificationType = "이메일";

function createNotifier() {
  let notificationType = "SMS";
  console.log(notificationType);
}

createNotifier();
// SMS

console.log(notificationType);
// 이메일
```

**📌 개념**

<div class="wda-callout wda-ci">
  같은 이름의 변수를 여러 곳에서 써도 서로 값이 섞이지 않는다. 각 변수가 <strong>어느 범위(스코프)</strong>에 속하는지가 정해져 있기 때문이다.
</div>

---

## 2. 스코프 종류 빠르게 정리

**▶ 스코프 종류**

| 스코프 | 범위 |
|---|---|
| 전역 스코프 | 코드 어디서든 접근 가능 |
| 함수 스코프 | 함수 안에서만 접근 가능(`var`) |
| 블록 스코프 | `{}` 블록 안에서만 접근 가능(`let`/`const`) |

이 문서는 이 표를 기준으로, 스코프끼리 어떻게 연결되어 변수를 찾는지(스코프 체인)와 그 위에서 만들어지는 클로저에 집중한다.

---

## 3. 안쪽에서 바깥쪽으로 찾는 흐름

**• JavaScript: 안쪽에서 바깥쪽으로 값 찾기**

```javascript
const defaultMessage = "새 알림이 도착했습니다";

function createNotifier() {
  const notificationType = "이메일";

  function sendNotification() {
    console.log(`[${notificationType}] ${defaultMessage}`);
  }

  sendNotification();
}

createNotifier();
// [이메일] 새 알림이 도착했습니다
```

`sendNotification`은 자신에게 없는 값을 바깥쪽 함수(`createNotifier`), 그리고 그보다 바깥인 전역까지 순서대로 찾아 올라간다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  방향은 <strong>한쪽으로만</strong> 열려 있다. 안쪽은 바깥쪽을 볼 수 있지만, 바깥쪽은 안쪽을 볼 수 없다.
</div>

**• JavaScript: 바깥에서 안쪽 변수 접근 — 에러 확인용**

```javascript
function createNotifier() {
  const notificationType = "이메일";
}

createNotifier();

console.log(notificationType);
// ❌ ReferenceError (일부러 에러 확인용)
```

---

## 4. 스코프 체인

**• JavaScript: 스코프 체인으로 값 찾기**

```javascript
const level = "전역";

function outerScope() {
  const level = "바깥";

  function innerScope() {
    console.log(level);
  }

  innerScope();
}

outerScope();
// 바깥
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>innerScope</code>는 자기 자신 → <code>outerScope</code> → 전역 순서로 <code>level</code>을 찾다가, <code>outerScope</code>에서 찾은 순간 멈춘다. 이렇게 스코프가 바깥으로 연결된 순서를 <strong>스코프 체인</strong>이라고 한다.
</div>

---

## 5. 렉시컬 스코프: 어디서 호출했는지가 아니라 어디서 만들었는가

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">호출 위치</div>
    함수가 실제로 실행되는 곳 — 스코프와 무관하다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">선언 위치</div>
    함수가 코드에 작성된 곳 — 스코프를 결정한다.
  </div>
</div>

**• JavaScript: 렉시컬 스코프 확인하기**

```javascript
const notificationType = "이메일";

function printType() {
  console.log(notificationType);
}

function runElsewhere() {
  const notificationType = "SMS";
  printType();
}

runElsewhere();
// 이메일
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>printType</code>은 <code>runElsewhere</code> 안에서 호출됐지만, <code>notificationType</code>은 <code>printType</code>이 <strong>선언된</strong> 위치(전역) 기준으로 찾는다. 이것이 <strong>렉시컬 스코프</strong>다 — 어디서 만들었는지가 어디서 호출했는지보다 우선한다.
</div>

---

## 6. 중첩 함수에서 값 찾기

**• JavaScript: 중첩 함수에서 값 찾기**

```javascript
function createNotifier(notificationType) {
  const defaultMessage = "새 알림이 도착했습니다";

  function sendNotification() {
    console.log(`[${notificationType}] ${defaultMessage}`);
  }

  return sendNotification;
}

const emailNotifier = createNotifier("이메일");

emailNotifier();
// [이메일] 새 알림이 도착했습니다
```

`sendNotification`은 `createNotifier` 안에서 만들어졌기 때문에, `createNotifier`의 매개변수와 지역 변수를 스코프 체인으로 찾아 쓸 수 있다.

---

## 7. 클로저가 생기는 순간

`createNotifier(...)`는 `emailNotifier`에 저장되는 순간 이미 실행이 끝난다.

그런데도 `emailNotifier()`를 나중에 호출하면 `notificationType`과 `defaultMessage`를 여전히 정확히 기억한다.

**📌 개념**

<div class="wda-callout wda-ci">
  <strong>클로저</strong>는 함수와, 그 함수가 만들어질 때의 <strong>바깥 환경(스코프)</strong>이 함께 묶인 것이다. 함수를 둘러싼 환경을 계속 "기억"하기 때문에 생기는 현상이다.
</div>

---

## 8. 실행이 끝난 함수의 변수가 남아 보이는 이유

**• JavaScript: 클로저로 값 유지되는 것 확인하기**

```javascript
function createCounter() {
  let savedCount = 0;

  function increaseCount() {
    savedCount += 1;
    console.log(savedCount);
  }

  return increaseCount;
}

const counter = createCounter();

counter();
// 1
counter();
// 2
counter();
// 3
```

`createCounter()`는 한 번 실행되고 끝나지만, 반환된 `increaseCount`가 `savedCount`를 계속 참조하고 있어 그 값이 사라지지 않고 유지된다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  참조가 남아있는 동안에는 그 변수가 메모리에서 정리되지 않는다. 클로저를 꼭 필요한 곳에만 사용해야 하는 이유다.
</div>

---

## 9. 클로저로 상태 숨기기

**• JavaScript: 클로저로 상태 숨기기**

```javascript
function createCounter() {
  let savedCount = 0;

  return {
    increaseCount() {
      savedCount += 1;
      return savedCount;
    },
    getCount() {
      return savedCount;
    },
  };
}

const counter = createCounter();

console.log(counter.increaseCount());
// 1

console.log(counter.getCount());
// 1

console.log(counter.savedCount);
// undefined — 바깥에서 직접 접근할 수 없다
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>savedCount</code>는 함수 안에 있을 뿐 어떤 property로도 노출되지 않는다. <code>increaseCount</code>/<code>getCount</code>를 통해서만 읽고 바꿀 수 있어, 값을 안전하게 숨겨둘 수 있다.
</div>

---

## 10. 클로저로 독립 상태 만들기

**• JavaScript: 클로저로 독립 상태 만들기**

```javascript
function createUserCounter(userName) {
  let savedCount = 0;

  return function () {
    savedCount += 1;
    console.log(`${userName}: ${savedCount}`);
  };
}

const countForJisu = createUserCounter("지수");
const countForMinho = createUserCounter("민호");

countForJisu();
// 지수: 1

countForJisu();
// 지수: 2

countForMinho();
// 민호: 1
```

`createUserCounter`를 호출할 때마다 `savedCount`가 새로 만들어지므로, `countForJisu`와 `countForMinho`는 서로 영향을 주지 않는 독립된 상태를 가진다.

---

## 11. 반복문과 클로저 주의

**• JavaScript: var 반복문에서 클로저 문제 확인하기**

```javascript
const notificationQueue = ["이메일", "SMS", "푸시"];

for (var i = 0; i < notificationQueue.length; i++) {
  setTimeout(function () {
    console.log(notificationQueue[i]);
  }, 100);
}
// undefined
// undefined
// undefined
```

`var`는 함수 스코프라서 반복문 전체가 `i` 하나를 공유한다. `setTimeout` 콜백이 실행될 때는 이미 반복문이 끝나 `i`가 3이 되어 있어, `notificationQueue[3]`(존재하지 않는 인덱스)을 읽게 된다.

**• JavaScript: let 반복문으로 클로저 문제 해결하기**

```javascript
for (let i = 0; i < notificationQueue.length; i++) {
  setTimeout(function () {
    console.log(notificationQueue[i]);
  }, 100);
}
// 이메일
// SMS
// 푸시
```

**✅ 선택 기준**

<div class="wda-callout wda-cs">
  <code>let</code>은 블록 스코프라서 반복마다 새로운 <code>i</code>를 만든다. 각 콜백이 서로 다른 <code>i</code>를 클로저로 기억하기 때문에 의도한 값이 그대로 출력된다.
</div>

---

## 12. var와 let 차이

**▶ var vs let**

| 구분 | var | let |
|---|---|---|
| 스코프 | 함수 스코프 | 블록 스코프 |
| 반복문에서 | 모든 반복이 같은 변수를 공유한다 | 매 반복마다 새 변수를 만든다 |
| 클로저와 함께 쓸 때 | 마지막 값만 기억되기 쉽다 | 각 반복의 값을 독립적으로 기억한다 |

---

## 13. 초보자가 자주 만나는 스코프/클로저 실수

<div class="wda-fgrid">

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 1 · 블록 밖에서 안쪽 변수 접근</div>

**• JavaScript: 블록 밖에서 안쪽 변수 접근하는 실수**

```javascript
if (true) {
  let notificationType = "이메일";
}

console.log(notificationType);
// ❌ ReferenceError (일부러 에러 확인용)
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> let은 블록 스코프라 블록 밖에서는 접근할 수 없다.<br>
  <strong>기억할 점:</strong> 블록 밖에서 써야 하는 값은 블록 밖에서 선언한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 2 · 함수가 끝나면 변수도 사라진다는 착각</div>

**• JavaScript: 함수 종료 시 변수도 사라진다는 착각**

```javascript
const counter = createCounter();
counter();
// 1 — savedCount는 사라지지 않는다
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 반환된 함수가 여전히 참조하고 있으면 변수는 유지된다.<br>
  <strong>기억할 점:</strong> 클로저는 참조 중인 변수를 계속 기억한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 3 · var 반복문에서 다른 값을 기대</div>

**• JavaScript: var 반복문에서 다른 값을 기대하는 실수**

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// 3
// 3
// 3
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> var는 반복문 전체가 하나의 i를 공유한다.<br>
  <strong>기억할 점:</strong> 반복마다 다른 값을 기억하려면 let을 쓴다.
</div>

</div>

</div>

---

## 14. 실습 과제

아직 화면 조작(DOM)은 배우지 않았으니, 이번에도 Console 결과로 직접 확인한다.

**🎯 목표**

클로저를 이용해 알림 발신기와 사용자별 카운터를 만든다.

**📋 요구사항**

• `createNotifier(notificationType)`가 알림 타입을 기억하는 함수를 반환하게 한다.<br>
• `createUserCounter(userName)`가 사용자별로 독립된 `savedCount`를 기억하게 한다.<br>
• 서로 다른 사용자로 카운터를 두 개 만들어 값이 섞이지 않는지 확인한다.

**• JavaScript: 실습 구성 예시**

```javascript
// 구성 예시: 알림 발신기 만들기 / 사용자별 카운터 만들기 / 독립성 확인
```

**💡 힌트 1 — 알림 발신기**

**• JavaScript: 힌트 1 — 알림 발신기**

```javascript
function createNotifier(notificationType) {
  return function (message) {
    console.log(`[${notificationType}] ${message}`);
  };
}

const smsNotifier = createNotifier("SMS");

smsNotifier("결제가 완료되었습니다");
// [SMS] 결제가 완료되었습니다
```

**💡 힌트 2 — 사용자별 카운터**

**• JavaScript: 힌트 2 — 사용자별 카운터**

```javascript
function createUserCounter(userName) {
  let savedCount = 0;

  return function () {
    savedCount += 1;
    return `${userName}: ${savedCount}`;
  };
}

const countForDoyun = createUserCounter("도윤");

console.log(countForDoyun());
// 도윤: 1
```

**💡 힌트 3 — 독립성 확인**

**• JavaScript: 힌트 3 — 독립성 확인**

```javascript
const countA = createUserCounter("A");
const countB = createUserCounter("B");

countA();
countA();
console.log(countB());
// B: 1 — A를 두 번 호출해도 B는 영향받지 않는다
```

**📌 정리 메모**

• 함수는 자신이 선언된 위치의 변수를 스코프 체인으로 찾는다.<br>
• 함수를 반환하면, 반환된 함수가 바깥 변수를 계속 기억한다(클로저).<br>
• 클로저를 여러 번 만들면 각각 독립된 상태를 가진다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>스코프는 <strong>변수를 찾는 범위</strong>이며, 전역/함수/블록 스코프로 나뉜다.</li>
    <li>변수를 찾을 때는 <strong>안쪽에서 바깥쪽으로만</strong> 찾는다 — 바깥에서 안쪽 변수는 볼 수 없다(스코프 체인).</li>
    <li><strong>렉시컬 스코프</strong>는 함수를 어디서 호출했는지가 아니라 <strong>어디서 선언했는지</strong>로 스코프가 정해진다는 뜻이다.</li>
    <li><strong>클로저</strong>는 함수와 그 함수가 선언될 때의 바깥 환경이 함께 묶인 것이며, 바깥 함수 실행이 끝나도 참조 중인 변수는 사라지지 않는다.</li>
    <li>클로저로 변수를 <strong>숨기거나</strong>, 호출할 때마다 <strong>독립된 상태</strong>를 가진 함수를 만들 수 있다.</li>
    <li><strong>var</strong>는 반복문 전체가 변수 하나를 공유하지만, <strong>let</strong>은 반복마다 새 변수를 만들어 클로저와 함께 쓰기 안전하다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 함수 실행이 끝나면 그 안의 변수도 바로 사라진다?</div>
    <div class="wda-mistake-right">정답: 반환된 함수가 계속 참조하고 있다면 <strong>클로저</strong>로 남아 사라지지 않는다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 스코프는 호출한 위치에 따라 정해진다?</div>
    <div class="wda-mistake-right">정답: <strong>선언한 위치</strong>에 따라 정해진다(렉시컬 스코프).</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 바깥 스코프에서 안쪽 스코프의 변수를 볼 수 있다?</div>
    <div class="wda-mistake-right">정답: <strong>안쪽에서 바깥쪽만</strong> 볼 수 있다 — 반대 방향은 불가능하다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: var와 let은 반복문에서 똑같이 동작한다?</div>
    <div class="wda-mistake-right">정답: var는 <strong>하나의 변수를 공유</strong>하지만, let은 <strong>반복마다 새 변수</strong>를 만든다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 탐색 방향</div>
    <div class="wda-formula-block-body">
      <code>안쪽 → 바깥쪽만 가능</code><br>
      <code>바깥 → 안쪽은 불가능</code>
    </div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 렉시컬 스코프</div>
    <div class="wda-formula-block-body"><code>스코프 = 선언 위치 기준</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 클로저</div>
    <div class="wda-formula-block-body"><code>함수 + 선언 당시의 바깥 환경</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">스코프 체인이란?</div>
    <div class="wda-flip-back">변수를 안쪽 스코프부터 바깥쪽으로 차례차례 찾아 올라가는 연결 구조다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">렉시컬 스코프란?</div>
    <div class="wda-flip-back">함수가 호출된 위치가 아니라 선언된 위치를 기준으로 스코프가 정해지는 것이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">클로저란?</div>
    <div class="wda-flip-back">함수와 그 함수가 선언될 때의 바깥 환경이 함께 묶인 것이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">클로저로 상태를 숨기면 어떤 효과가 있나?</div>
    <div class="wda-flip-back">바깥에서 변수에 직접 접근하지 못하고, 정해진 함수를 통해서만 값을 바꿀 수 있다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">클로저로 독립 상태를 만들면?</div>
    <div class="wda-flip-back">함수를 호출할 때마다 서로 영향을 주지 않는 별개의 상태가 만들어진다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">var 반복문에서 클로저를 쓰면 왜 문제가 되나?</div>
    <div class="wda-flip-back">반복문 전체가 변수 하나를 공유해 마지막 값만 기억되기 쉽다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">let이 반복문+클로저 문제를 해결하는 이유는?</div>
    <div class="wda-flip-back">블록 스코프라서 반복마다 새 변수를 만들어 각 콜백이 다른 값을 기억한다.</div>
  </div>
</div>
