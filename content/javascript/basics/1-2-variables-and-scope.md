---
title: "1-2 변수와 스코프 다루기"
status: "completed"
description: "JavaScript 변수 선언 방식과 스코프의 기본 개념을 이해합니다."
category: "JavaScript"
section: "Basics"
tags:
  - javascript
  - basics
  - variables
  - scope
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
.wda-cy{background:rgba(234,179,8,.06);border-color:#eab308}
.wda-cy .wda-clabel{color:#ca8a04}
.wda-goal{background:rgba(34,197,94,.05);border:1px solid rgba(34,197,94,.2);border-radius:10px;padding:12px 16px;margin:.8rem 0 1.6rem;font-size:.83rem;line-height:1.75}
.wda-goal-label{font-size:.68rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#22c55e;display:block;margin-bottom:10px}
.wda-fgrid{display:flex;flex-wrap:wrap;gap:10px;margin:.8rem 0 1.6rem}
.wda-fcard{flex:1 1 140px;border:1px solid rgba(128,128,128,.18);border-radius:10px;padding:13px 15px;background:rgba(128,128,128,.03);box-shadow:0 1px 3px rgba(0,0,0,.04)}
.wda-fcard-ico{font-size:1.3rem;margin-bottom:6px}
.wda-fcard-ttl{font-size:.94rem;font-weight:700;margin-bottom:4px}
.wda-fcard-dsc{font-size:.89rem;line-height:1.65}
.wda-fcard-list{list-style:none;padding:0;margin:.4rem 0 0;font-size:.89rem;line-height:1.65}
.wda-fcard-list li::before{content:"· "}
.wda-steps{border:1px solid rgba(128,128,128,.15);border-radius:10px;overflow:hidden;margin:.8rem 0 1.6rem;background:rgba(128,128,128,.03);box-shadow:0 1px 3px rgba(0,0,0,.04)}
.wda-step{display:flex;align-items:flex-start;gap:14px;padding:12px 16px;border-bottom:1px solid rgba(128,128,128,.1)}
.wda-step:last-child{border-bottom:none}
.wda-snum{min-width:26px;height:26px;border-radius:50%;background:rgba(252,206,150,.32);color:#8a6d3b;font-size:.78rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
.wda-sbody{flex:1;min-width:0}
.wda-sttl{font-size:.94rem;font-weight:700;margin-bottom:4px}
.wda-sdsc{font-size:.89rem;line-height:1.65}
.wda-sdsc ul{margin:.3rem 0 0;padding-left:1.1rem}
.wda-compare{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:.8rem 0 1.6rem}
@media(max-width:600px){.wda-compare{grid-template-columns:1fr}}
.wda-compare-card{border:1px solid rgba(128,128,128,.18);border-radius:10px;padding:14px 16px;font-size:.89rem;line-height:1.65;background:rgba(128,128,128,.03);box-shadow:0 1px 3px rgba(0,0,0,.04)}
.wda-compare-ttl{font-size:.92rem;font-weight:700;line-height:1.5;margin-bottom:8px}
.wda-compare-label{font-size:.7rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;opacity:.65;margin-bottom:4px}
.wda-legacy{border-color:rgba(245,158,11,.28);background:rgba(245,158,11,.035)}
.wda-modern{border-color:rgba(34,197,94,.22);background:rgba(34,197,94,.02)}
.wda-hint{border-color:rgba(59,130,246,.25);background:rgba(59,130,246,.035)}
.wda-caution{border-color:rgba(245,158,11,.28);background:rgba(245,158,11,.035)}
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
.wda-substep-set p.wda-minihead.wda-minihead{padding-top:.5rem}
/* 핵심 요약 전용 복습 UI — JavaScript 1-1 기준과 동일. 색은 background/border/accent에만 쓰고,
   본문 텍스트는 카드 색과 무관하게 진회색(#2C2840)·strong은 #1F1B2E로 고정한다. 먼저 외울 것과
   공식 보드 바깥은 neutral, 헷갈리기 쉬운 것(피치)·공식 카드 안쪽(핑크)·클릭 복습 카드(라벤더/그린)에만 색 포인트. */
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
  • <strong>중복 관리 문제 해결</strong> — 여러 곳에 흩어진 같은 값을 변수 하나로 모아 관리할 수 있다.<br>
  • <strong>선언 방식 선택</strong> — 값이 바뀌는 상황과 고정되는 상황을 구분해 const와 let 중 알맞은 것을 선택할 수 있다.<br>
  • <strong>스코프 범위 확인</strong> — 블록 안팎에서 변수 접근 결과가 달라지는 것을 코드로 직접 확인할 수 있다.<br>
  • <strong>선언 전 접근 오류 설명</strong> — 변수를 선언하기 전에 사용했을 때 어떤 오류가 나는지 원인을 설명할 수 있다.
</div>

---

## 1. 학습 상태판을 만들다가 생기는 문제

미니 학습 상태판에는 오늘의 학습 주제, 진행 단계, 복습 제한처럼 여러 값이 함께 표시된다. 이 값들을 출력할 때마다 직접 다시 적으면 문제가 생긴다.

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">❌ 값을 직접 반복해서 쓰면</div>

```javascript
console.log("주제:", "변수와 스코프");
console.log("단계:", 1);
console.log("복습 제한:", 3);
```

값이 바뀌면 세 줄을 전부 찾아 고쳐야 한다.

</div>

<div class="wda-compare-card wda-modern">

<div class="wda-compare-ttl">✅ 변수로 한 곳에서 관리하면</div>

```javascript
const todayTopic = "변수와 스코프";
let completedStep = 1;
const MAX_REVIEW_COUNT = 3;

console.log("주제:", todayTopic);
console.log("단계:", completedStep);
console.log("복습 제한:", MAX_REVIEW_COUNT);
```

값 하나만 바꾸면 관련된 모든 줄에 자동으로 반영된다.

</div>

</div>

이렇게 반복해서 쓰는 값을 한 곳에서 관리하도록 만든 이름이 **변수**다.

---

## 2. 한 곳에서 관리하기: 변수

위 오른쪽 카드에서 쓴 `todayTopic`, `completedStep`, `MAX_REVIEW_COUNT`가 이 문서에서 계속 사용할 미니 학습 상태판의 값이다.

변수는 이렇게 **반복되는 값을 한 곳에서 관리하기 위해 붙인 이름**이다.

**💡 이름 짓는 규칙**

<div class="wda-callout wda-ci">
  변수 이름은 <code>todayTopic</code>처럼 역할이 드러나야 하며, 첫 단어는 소문자로 시작해 다음 단어의 첫 글자만 대문자로 쓰는 <strong>camelCase</strong>를 따른다. let, const처럼 문법에서 이미 쓰는 <strong>예약어는 이름으로 쓸 수 없다</strong>.
</div>

---

## 3. 기본은 const, 바뀌면 let

• 세 가지 선언 키워드 중 무엇을 쓸지는 하나의 기준으로 정리된다 — **이 값이 앞으로 바뀔지, 바뀌지 않을지**. 기본은 `const`이고, 값이 바뀌어야 한다면 그때 `let`으로 바꾼다.<br>
• `var`는 오래된 코드를 읽을 때만 알아두면 충분하다 — 새 코드에는 쓰지 않는다.

**📊 var / let / const 비교**

| 구분 | var | let | const |
|---|---|---|---|
| 재선언 | 가능 | 불가능 | 불가능 |
| 재할당 | 가능 | 가능 | 불가능 |
| 스코프 | 함수 스코프 | 블록 스코프 | 블록 스코프 |
| 사용 권장 | 레거시 코드 읽기용 | 값이 바뀔 때 | 값이 바뀌지 않을 때 우선 |

**📋 todayTopic으로 선택 기준 확인하기**

1~2번에서 쓴 `todayTopic`·`completedStep`·`MAX_REVIEW_COUNT`를 보면 규칙이 보인다 — 끝까지 안 바뀌는 값은 const, 계속 늘어나는 값은 let이다.

```javascript
const todayTopic = "변수와 스코프"; // 끝까지 바뀌지 않으므로 const가 적절하다
let completedStep = 0; // 완료할 때마다 늘어나므로 let
const MAX_REVIEW_COUNT = 3; // 복습 가능 최대 횟수 — 바뀌지 않는 설정값

completedStep += 1;
console.log(todayTopic, completedStep, MAX_REVIEW_COUNT);
// 콘솔에 "변수와 스코프 1 3" 형태로 출력된다
```

**💡 왜 MAX_REVIEW_COUNT만 대문자로 썼을까?**

<div class="wda-callout wda-ci">
  설정값처럼 의미가 강한 상수는 관례적으로 <strong>UPPER_SNAKE_CASE</strong>로 쓰기도 한다. 이는 문법이 아니라 이름 약속이라, completedStep처럼 계속 바뀌는 값은 그대로 camelCase로 쓴다.
</div>

**🆚 재할당 vs 내부 값 변경**

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">❌ 재할당은 막힌다</div>

```javascript
const reviewSteps = ["개념 복습"];
reviewSteps = ["처음부터 다시"];
// ❌ TypeError (변수 자체를 바꾸려는 시도)
// 일부러 에러 확인용
```

</div>

<div class="wda-compare-card wda-modern">

<div class="wda-compare-ttl">✅ 내부 값은 바뀐다</div>

```javascript
const reviewSteps = ["개념 복습"];
reviewSteps.push("예제 복습");
console.log(reviewSteps);
// ["개념 복습", "예제 복습"]
```

</div>

</div>

**📌 핵심 차이**

<div class="wda-callout wda-ci">
  const는 <strong>"변수에 다른 값을 다시 넣지 못하게"</strong> 막는 것이지, <strong>"값 자체가 절대 바뀌지 않는다"</strong>는 뜻이 아니다. 배열이나 객체를 const로 선언해도 <strong>내부 값은 변경할 수 있다</strong>.
</div>

**⚠️ var를 만난다면**

```javascript
var currentPanel = "홈";
currentPanel = "복습"; // 재할당 가능
var currentPanel = "설정"; // 재선언까지 허용된다
console.log(currentPanel); // "설정"
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  • var는 같은 이름을 <strong>몇 번이든 다시 선언</strong>할 수 있어 실수를 막지 못한다 — let/const였다면 두 번째 선언에서 바로 에러가 났을 상황이다.<br>
  • 레거시 코드를 읽을 때 "이런 방식도 있었다"는 정도로만 알아두고, 새로 작성하는 코드에는 쓰지 않는다.
</div>

---

## 4. 선언 → 초기화 → 할당, 값이 만들어지는 순서

변수 하나가 만들어질 때 내부적으로는 3단계를 거친다.

<div class="wda-steps">
  <div class="wda-step">
    <div class="wda-snum">1</div>
    <div class="wda-sbody">
      <div class="wda-sttl">선언 (Declaration)</div>
      <div class="wda-sdsc">
        해당 스코프에 <strong>변수 이름만 등록</strong>된다.<br>
        아직 값은 들어있지 않다.
      </div>
    </div>
  </div>
  <div class="wda-step">
    <div class="wda-snum">2</div>
    <div class="wda-sbody">
      <div class="wda-sttl">초기화 (Initialization)</div>
      <div class="wda-sdsc">
        변수가 값을 담을 <strong>메모리 공간을 확보</strong>한다.<br>
        var는 이 시점에 undefined가 자동으로 들어가고, let/const는 이 단계 전까지 TDZ 상태로 남는다.
      </div>
    </div>
  </div>
  <div class="wda-step">
    <div class="wda-snum">3</div>
    <div class="wda-sbody">
      <div class="wda-sttl">할당 (Assignment)</div>
      <div class="wda-sdsc">
        <code>=</code> 오른쪽의 <strong>실제 값이 저장</strong>된다.
      </div>
    </div>
  </div>
</div>

```javascript
let isReviewMode; // 선언문 실행 — 아직 직접 넣은 값은 없다
console.log(isReviewMode); // undefined

isReviewMode = true; // 3. 할당 — 실제 값이 들어간다
console.log(isReviewMode); // true
```

선언과 할당을 한 줄로 합쳐서 쓸 수도 있다.

```javascript
let isReviewMode = true; // 선언과 할당을 동시에 처리한다
```

**💡 보충 설명**

<div class="wda-callout wda-ci">
  var는 선언과 동시에 초기화까지 끝나 undefined가 바로 들어가지만, let/const는 초기화 전까지 접근이 막힌다. 이 차이는 7~8번에서 <strong>호이스팅·TDZ</strong>로 자세히 다룬다.
</div>

---

## 5. 스코프: 변수가 살아 있는 범위

스코프(scope)는 **변수를 사용할 수 있는 범위**다. 크게 **전역 스코프**, **함수 스코프**, **블록 스코프**로 나뉜다.

• 안쪽 스코프에서는 **바깥 변수에 접근할 수 있지만**<br>
• 바깥 스코프에서는 **안쪽 변수에 접근할 수 없다**

**🆚 전역 vs 함수 안 — 접근 범위 비교**

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">🌍 전역에서 선언하면</div>

```javascript
let currentPanel = "홈";

function showPanel() {
  console.log(currentPanel);
  // 함수 안에서도 접근 가능
}

showPanel();
console.log(currentPanel); // 어디서든 접근 가능
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">📦 함수 안에서 선언하면</div>

```javascript
function startReview() {
  let reviewCount = 0;
  // 함수 내부에서만 존재
  reviewCount += 1;
  console.log(reviewCount); // 1
}

startReview();
console.log(reviewCount);
// ❌ ReferenceError (함수 밖 접근 불가)
// 일부러 에러 확인용
```

</div>

</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  전역 변수는 어디서든 쓸 수 있어 편리하지만, 아무 코드에서나 값을 바꿀 수 있어 <strong>버그의 원인</strong>이 되기 쉽다. 꼭 필요한 경우로 최소화한다.
</div>

---

## 6. 함수 스코프 vs 블록 스코프

var와 let/const는 스코프 범위 자체가 다르다.

**🆚 함수 스코프(var) vs 블록 스코프(let/const)**

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">⚡ 함수 스코프 — var</div>

```javascript
function checkPanelLegacy() {
  if (true) {
    var temporaryNotice = "패널이 곧 닫힙니다";
    // var는 블록을 무시하고 함수 스코프를 가진다
  }

  console.log(temporaryNotice);
  // "패널이 곧 닫힙니다" (블록 밖에서도 접근된다)
}

checkPanelLegacy();
```

</div>

<div class="wda-compare-card wda-modern">

<div class="wda-compare-ttl">🔒 블록 스코프 — let / const</div>

```javascript
function checkPanelModern() {
  if (true) {
    let temporaryNotice = "패널이 곧 닫힙니다";
    // let은 블록 스코프를 가진다
  }

  console.log(temporaryNotice);
  // ❌ ReferenceError (블록 밖 접근 불가)
  // 일부러 에러 확인용
}

checkPanelModern();
```

</div>

</div>

**💡 보충 설명**

<div class="wda-callout wda-ci">
  • if, for, while 같은 <code>{}</code> 블록 안에서 let/const로 선언한 변수는 <strong>블록 밖에서 접근할 수 없다</strong>.<br>
  • 반대로 블록 <strong>안쪽에서는 바깥 스코프의 변수를 그대로 읽을 수 있다</strong>.
</div>

---

## 7. 호이스팅: 선언이 먼저 처리된 것처럼 보이는 현상

호이스팅은 코드가 실제로 위로 이동하는 것이 아니라, 선언이 먼저 처리된 것처럼 보이는 현상이다.

**⬆️ var 호이스팅**

```javascript
console.log(currentPanel); // undefined (에러 아님)
var currentPanel = "홈";
console.log(currentPanel); // "홈"
```

```javascript
// JavaScript 엔진이 실제로 처리하는 순서
var currentPanel; // 선언만 먼저 등록된다
console.log(currentPanel); // undefined
currentPanel = "홈"; // 할당은 원래 코드 위치에서 실행된다
```

**🔒 let 호이스팅**

```javascript
console.log(isReviewMode);
// ❌ ReferenceError: Cannot access 'isReviewMode' before initialization
// 일부러 에러 확인용

let isReviewMode = true;
```

**⚠️ 흔한 오해**

<div class="wda-callout wda-cw">
  • <strong>"var는 안전하다"는 표현은 정확하지 않다.</strong> var는 에러 없이 undefined를 반환할 뿐, 실수를 감춰버리는 것에 가깝다.<br>
  • <strong>"let/const는 호이스팅이 안 된다"는 표현도 정확하지 않다.</strong> let/const도 호이스팅은 되지만, 다음 섹션의 TDZ 때문에 선언 전 접근이 에러로 막힐 뿐이다.
</div>

---

## 8. TDZ: 선언 전에는 접근할 수 없는 구간

TDZ(Temporal Dead Zone)는 let/const가 선언되기 전까지 접근이 금지되는 구간이다.

```javascript
// ↓ TDZ 시작 (스코프 진입)
console.log(reviewCount); // ❌ ReferenceError (일부러 에러 확인용)
//
// TDZ 구간 (접근 불가)
//
let reviewCount = 0; // ← TDZ 끝 (선언문 도달)
// ↓ 정상 접근 가능
console.log(reviewCount); // 0
```

**🔢 let 기준으로 TDZ가 끝나는 과정**

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">선언</div><div class="wda-fnode-dsc">스코프에 이름이 등록된다.</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">초기화</div><div class="wda-fnode-dsc">메모리 확보 + undefined 할당<br>아직 값은 없다.</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">할당</div><div class="wda-fnode-dsc">실제 값이 들어간다.</div></div>
</div>

const는 선언과 동시에 값을 넣어야 하므로, 별도의 나중 할당 단계가 없다.

**⚖️ var vs let/const 차이**

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">var</div>
    선언 + 초기화가 동시에 끝나 TDZ가 없다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">let / const</div>
    선언만 먼저 처리되고, 실행 시점까지 TDZ가 유지된다.
  </div>
</div>

**💡 보충 설명**

<div class="wda-callout wda-ci">
  • let/const는 <strong>"선언 먼저, 사용 나중"</strong> 원칙을 지켜야 하는 이유가 바로 TDZ다.<br>
  • TDZ는 버그를 막기 위한 <strong>의도적인 안전장치</strong>다. "왜 안 되지?"가 아니라 "실수를 막아주고 있구나"로 이해하면 된다.
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  같은 콘솔 창에서 이미 선언한 let/const 변수명을 다시 선언하면 재선언 에러가 날 수 있다. 위 예제를 다시 실행할 때는 새로고침하거나 변수명을 바꿔서 시도한다.
</div>

---

## 9. 초보자가 자주 만나는 변수 오류

let/const를 처음 쓸 때 자주 마주치는 오류 3가지를 미리 확인해 둔다.

<div class="wda-fgrid">

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 1 · const 값 재할당</div>

```javascript
const MAX_REVIEW_COUNT = 3;
MAX_REVIEW_COUNT = 5;
// ❌ TypeError (일부러 에러 확인용)
```

<div class="wda-fcard-dsc">
  <strong>왜 에러가 나나:</strong> const로 선언한 변수는 재할당이 막혀 있어 <code>Assignment to constant variable.</code> 에러가 난다.<br>
  <strong>기억할 점:</strong> const는 변수에 다른 값을 다시 넣을 수 없다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 2 · let 변수 재선언</div>

```javascript
let currentPanel = "홈";
let currentPanel = "설정";
// ❌ SyntaxError (일부러 에러 확인용)
```

<div class="wda-fcard-dsc">
  <strong>왜 에러가 나나:</strong> 같은 스코프에서 이름이 겹치면 <code>has already been declared</code> 에러가 난다.<br>
  <strong>기억할 점:</strong> 이름이 겹치면 재할당(<code>=</code>)만 가능하다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 3 · 선언 전에 먼저 사용</div>

```javascript
console.log(isReviewMode);
// ❌ ReferenceError (일부러 에러 확인용)
let isReviewMode = true;
```

<div class="wda-fcard-dsc">
  <strong>왜 에러가 나나:</strong> TDZ 구간에서 먼저 읽으려 하면 <code>before initialization</code> 에러가 난다.<br>
  <strong>기억할 점:</strong> 선언 줄을 지나야 그 변수를 쓸 수 있다.
</div>

</div>

</div>

**📌 한 줄 요약**

• `const` → **재할당 금지**<br>
• `let` → **재선언 금지**<br>
• `let` / `const` → **선언 전 접근 금지 (TDZ)**

---

## 10. 실습 과제

아직 화면 조작(DOM)은 배우지 않았으니, 이번에도 Console 결과로 직접 확인한다.

**🎯 목표**

지금까지 써 온 미니 학습 상태판을 그대로 이어서, 스코프 규칙을 지키며 Console에 값을 출력한다.

**📋 요구사항**

• `const`로 **오늘의 학습 주제**(`todayTopic`, 바뀌지 않는 값)를 선언한다.<br>
• `let`으로 **완료 단계**(`completedStep`, 바뀌는 값)를 선언하고 값을 1 증가시킨다.<br>
• 블록 `{}` 안에 **임시 안내 문구**(`temporaryNotice`)를 `let`으로 선언하고, 블록 밖 접근 코드는 주석으로 적어 둔 뒤 필요할 때 주석을 해제해 에러를 확인한다.<br>
• `console.log`로 블록 안/밖 접근 차이를 확인한다.

```javascript
// 구성 예시: 학습 주제(const) / 완료 단계(let) / 임시 안내 문구(블록 스코프 안에 선언)
```

**💡 힌트 1 — 변수 선언과 값 변경**

```javascript
const todayTopic = "변수와 스코프"; // 주제는 바뀌지 않으므로 const로 선언한다
let completedStep = 0; // 완료 단계는 늘어나므로 let으로 선언한다

completedStep += 1;
console.log(todayTopic, completedStep);
// 콘솔에 "변수와 스코프 1" 형태로 출력된다
```

**💡 힌트 2 — 블록 스코프 확인**

```javascript
{
  let temporaryNotice = "잠시만요, 로딩 중입니다"; // 블록 안에서만 유효한 변수다
  console.log(temporaryNotice); // 정상 출력된다
}

// console.log(temporaryNotice);
// ❌ ReferenceError: temporaryNotice is not defined (일부러 에러 확인용 — 주석을 해제하면 발생한다)
```

**💡 힌트 3 — 출력 방법 두 가지**

콤마(,)로 구분하면 값 사이에 자동으로 띄어쓰기가 들어간다.

```javascript
console.log("오늘의 주제:", todayTopic);
```

더하기(+)로 연결하면 문장 형태로 출력할 수 있다.

```javascript
console.log("완료 단계는 " + completedStep + "단계입니다.");
```

**📌 정리 메모**

• `const` → **재할당하지 않는 값**<br>
• `let` → **바뀔 수 있는 값**<br>
• 블록 `{}` 안의 `let` 변수 → **블록 밖에서는 접근 불가**<br>
• 에러가 나는 것은 실수가 아니라 **스코프 규칙이 정상 동작한 결과**다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>변수는 <strong>여러 곳에 흩어진 같은 값을 한 곳에서 관리하기 위한 이름</strong>이며, 값이 바뀌어도 변수 하나만 고치면 된다.</li>
    <li>변수 생성 순서는 <strong>선언 → 초기화 → 할당</strong>이다.</li>
    <li><strong>const를 기본값</strong>으로 사용하고, 값이 바뀔 때만 <strong>let</strong>으로 바꾼다. <strong>var</strong>는 레거시 코드를 읽을 때만 알아두고 새 코드에는 쓰지 않는다.</li>
    <li>let/const는 <strong>블록 스코프</strong>, var는 <strong>함수 스코프</strong>를 가진다.</li>
    <li>호이스팅은 <strong>코드가 실제로 이동하는 것이 아니라</strong> 선언이 먼저 처리된 것처럼 보이는 현상이며, TDZ는 <strong>let/const가 선언되기 전까지 접근할 수 없는 구간</strong>이다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: var도 블록 스코프다?</div>
    <div class="wda-mistake-right">정답: let/const만 <strong>블록 스코프</strong>이고, var는 <strong>함수 스코프</strong>다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: const로 선언하면 값 자체가 절대 바뀌지 않는다?</div>
    <div class="wda-mistake-right">정답: const는 <strong>재할당만 막을</strong> 뿐이다. 배열/객체로 선언한 경우 <strong>내부 값은 바뀔 수 있다</strong>.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 호이스팅은 var에서만 발생한다?</div>
    <div class="wda-mistake-right">정답: 호이스팅은 <strong>모든 선언에서 발생</strong>한다. 다만 let/const는 TDZ 때문에 접근이 막힐 뿐이다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: let/const는 호이스팅이 안 된다?</div>
    <div class="wda-mistake-right">정답: 호이스팅은 되지만, <strong>TDZ 구간</strong>이라 선언 전에 접근하면 에러가 난다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 선언 전에 접근하면 항상 에러가 난다?</div>
    <div class="wda-mistake-right">정답: var는 <code>undefined</code>가 나오고, let/const만 <strong>TDZ 때문에 에러</strong>가 난다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 블록 밖에서도 let 변수에 접근할 수 있다?</div>
    <div class="wda-mistake-right">정답: let/const는 선언된 블록 <code>{}</code> 밖에서는 <strong>접근할 수 없다</strong>.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 선언 키워드</div>
    <div class="wda-formula-block-body">
      <code>const 먼저 → 안 되면 let</code><br>
      <code>var는 레거시</code>
    </div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 스코프</div>
    <div class="wda-formula-block-body">
      <code>let / const = 블록 스코프</code><br>
      <code>var = 함수 스코프</code>
    </div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 선언 전 접근</div>
    <div class="wda-formula-block-body">
      <code>var = undefined</code><br>
      <code>let / const = TDZ 에러</code>
    </div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">변수란?</div>
    <div class="wda-flip-back">여러 곳에 흩어진 같은 값을 한 곳에서 관리하기 위한 이름이다. 값이 바뀌어도 변수 하나만 고치면 된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">변수 생성 3단계 순서는?</div>
    <div class="wda-flip-back">선언 → 초기화 → 할당 순서로 진행된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">let과 const는 언제 구분하나?</div>
    <div class="wda-flip-back">기본은 const를 사용하고, 값이 바뀔 때만 let으로 바꾼다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">var를 피하는 이유는?</div>
    <div class="wda-flip-back">재선언과 재할당이 모두 허용되고, 블록을 무시하는 함수 스코프를 가지기 때문이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">스코프란?</div>
    <div class="wda-flip-back">변수를 사용할 수 있는 범위다. 전역·함수·블록 스코프로 나뉜다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">함수 스코프와 블록 스코프의 차이는?</div>
    <div class="wda-flip-back">var는 블록을 무시하고 함수 단위로 범위가 정해지지만, let/const는 블록 {} 단위로 범위가 정해진다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">호이스팅이란?</div>
    <div class="wda-flip-back">코드가 실제로 위로 이동하는 것이 아니라, 선언이 먼저 처리된 것처럼 보이는 현상이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">TDZ란?</div>
    <div class="wda-flip-back">let/const가 선언되기 전까지 접근할 수 없는 구간이다.</div>
  </div>
</div>
