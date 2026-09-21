---
title: "1-5 조건문과 반복문으로 흐름 제어하기"
status: "completed"
description: "if/switch 조건문과 for/while 반복문, break/continue로 코드 흐름을 제어하는 방법을 정리한다."
category: "JavaScript"
section: "Basics"
tags:
  - javascript
  - basics
  - control-flow
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
.wda-fcard-ico{font-size:1.3rem;margin-bottom:6px}
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
.wda-steps{border:1px solid rgba(128,128,128,.15);border-radius:10px;overflow:hidden;margin:.8rem 0 1.6rem}
.wda-step{display:flex;align-items:flex-start;gap:14px;padding:12px 16px;border-bottom:1px solid rgba(128,128,128,.1)}
.wda-step:last-child{border-bottom:none}
.wda-snum{min-width:26px;height:26px;border-radius:50%;background:rgba(245,158,11,.15);color:#f59e0b;font-size:.78rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
.wda-sbody{flex:1;min-width:0}
.wda-sttl{font-size:.94rem;font-weight:700;margin-bottom:4px}
.wda-sdsc{font-size:.89rem;line-height:1.65}
.wda-callout p{margin:0 0 .45rem;font-size:.9rem;line-height:1.75}
.wda-callout p:last-child{margin-bottom:0}
.wda-callout ul{margin:.35rem 0 0;padding-left:1.1rem}
.wda-callout li{margin:.24rem 0;line-height:1.75;font-size:.83rem}
.wda-callout .wda-clabel{font-size:.7rem;line-height:1.3}
/* 핵심 요약 전용 복습 UI — JavaScript 1-1~1-4 기준과 동일. 색은 background/border/accent에만
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
  • <strong>순차 실행 이해</strong> — 코드가 위에서 아래로 실행되는 기본 흐름을 설명할 수 있다.<br>
  • <strong>조건 분기</strong> — if/else if/switch로 상황에 따라 다른 코드를 실행할 수 있다.<br>
  • <strong>반복 처리</strong> — for/while/for...of/for...in으로 목록과 조건을 반복 처리할 수 있다.<br>
  • <strong>흐름 제어</strong> — break/continue로 반복의 진행을 직접 제어할 수 있다.
</div>

---

## 1. 코드는 기본적으로 위에서 아래로 실행된다

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">점수 초기화</div><div class="wda-fnode-dsc">studyScore = 0</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">학습 진행</div><div class="wda-fnode-dsc">+10점</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">복습 진행</div><div class="wda-fnode-dsc">+5점</div></div>
</div>

**• JavaScript: 순차 실행 확인하기**

```javascript
let studyScore = 0;

studyScore = studyScore + 10;
studyScore = studyScore + 5;

console.log(studyScore);
// 15
```

**📌 개념**

<div class="wda-callout wda-ci">
  제어문은 이 순차 흐름을 조건에 따라 <strong>분기</strong>시키거나, 같은 코드를 여러 번 <strong>반복</strong>시키는 역할을 한다.
</div>

---

## 2. 조건에 따라 갈라지는 흐름: if

조건이 참(true)일 때만 코드 블록을 실행한다.

**• JavaScript: if로 조건 분기하기**

```javascript
let studyScore = 85;

if (studyScore >= 80) {
  console.log("오늘은 목표 달성!");
}
// 오늘은 목표 달성!
```

---

## 3. 여러 조건을 순서대로 확인하기: else if

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">90점 이상?</div><div class="wda-fnode-dsc">studyLevel = "상"</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">70점 이상?</div><div class="wda-fnode-dsc">studyLevel = "중"</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">그 외</div><div class="wda-fnode-dsc">studyLevel = "하"</div></div>
</div>

**• JavaScript: else if로 여러 조건 확인하기**

```javascript
let studyScore = 65;
let studyLevel;

if (studyScore >= 90) {
  studyLevel = "상";
} else if (studyScore >= 70) {
  studyLevel = "중";
} else {
  studyLevel = "하";
}

console.log(studyLevel);
// "하"
```

**✅ 선택 기준**

<div class="wda-callout wda-cs">
  조건은 위에서부터 순서대로 검사한다. 처음으로 <code>true</code>인 블록 하나만 실행되고, 나머지는 모두 건너뛴다.
</div>

---

## 4. 정해진 값별로 나누기: switch

**• JavaScript: switch로 값별로 분기하기**

```javascript
let notificationType = "경고";

switch (notificationType) {
  case "리마인더":
    console.log("오늘 할 일을 확인하세요.");
    break;
  case "경고":
    console.log("마감이 얼마 남지 않았습니다.");
    break;
  case "완료":
    console.log("오늘 학습을 완료했습니다.");
    break;
  default:
    console.log("알림이 없습니다.");
}
// 마감이 얼마 남지 않았습니다.
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">if</div>
    범위나 복잡한 조건(<code>&&</code>, <code>||</code> 등)을 비교할 때 적합하다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">switch</div>
    정해진 값 하나와 정확히 일치하는지 확인할 때 적합하다.
  </div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <code>switch</code>는 값과 타입이 정확히 같은(<code>===</code>) case로 이동한다. <code>break</code>가 없으면 멈추지 않고 다음 case까지 그대로 실행되는데, 이를 <strong>Fall-through</strong>라고 한다.
</div>

---

## 5. 정해진 횟수만큼 반복하기: for

**• JavaScript: for로 정해진 횟수만큼 반복하기**

```javascript
let todayTasks = ["복습", "문제풀이", "정리"];

for (let i = 0; i < todayTasks.length; i++) {
  console.log(todayTasks[i]);
}
// 복습
// 문제풀이
// 정리
```

<div class="wda-steps">
  <div class="wda-step">
    <div class="wda-snum">1</div>
    <div class="wda-sbody">
      <div class="wda-sttl">초기화 (<code>let i = 0</code>)</div>
      <div class="wda-sdsc">최초 1회만 실행된다.</div>
    </div>
  </div>
  <div class="wda-step">
    <div class="wda-snum">2</div>
    <div class="wda-sbody">
      <div class="wda-sttl">조건 확인 (<code>i &lt; todayTasks.length</code>)</div>
      <div class="wda-sdsc">참이면 실행, 거짓이면 반복을 종료한다.</div>
    </div>
  </div>
  <div class="wda-step">
    <div class="wda-snum">3</div>
    <div class="wda-sbody">
      <div class="wda-sttl">코드 실행 (<code>console.log</code>)</div>
      <div class="wda-sdsc">조건이 참일 때 블록 안의 코드를 실행한다.</div>
    </div>
  </div>
  <div class="wda-step">
    <div class="wda-snum">4</div>
    <div class="wda-sbody">
      <div class="wda-sttl">증감 (<code>i++</code>)</div>
      <div class="wda-sdsc">변수 값을 변경한다.</div>
    </div>
  </div>
  <div class="wda-step">
    <div class="wda-snum">5</div>
    <div class="wda-sbody">
      <div class="wda-sttl">반복</div>
      <div class="wda-sdsc">다시 2번(조건 확인)으로 돌아가 반복한다.</div>
    </div>
  </div>
</div>

---

## 6. 조건이 참인 동안 반복하기: while

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">for</div>
    반복 횟수가 정해져 있을 때 사용한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">while</div>
    조건이 참인 동안 반복하며, 횟수가 정해지지 않았을 때 사용한다.
  </div>
</div>

**• JavaScript: while로 조건이 참인 동안 반복하기**

```javascript
let retryCount = 0;
const maxRetryCount = 3;

while (retryCount < maxRetryCount) {
  console.log(`재시도 ${retryCount + 1}번째`);
  retryCount++;
}
// 재시도 1번째
// 재시도 2번째
// 재시도 3번째
```

`do...while`은 조건과 상관없이 코드 블록을 최소 한 번은 실행한 뒤 조건을 검사한다.

**• JavaScript: do...while로 최소 한 번 실행하기**

```javascript
let currentTask = "복습";
let count = 0;

do {
  console.log(currentTask);
  count++;
} while (count < 1);
// 복습 — 조건과 무관하게 최소 한 번은 실행된다
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  반복 안에서 조건에 쓰인 변수를 갱신하지 않으면 무한 루프에 빠진다.
</div>

**• JavaScript: 무한 루프 예시 — 실행 금지**

```javascript
// ⚠️ retryCount를 증가시키지 않으면 무한 루프에 빠진다 (실행 금지 예시)
// while (retryCount < maxRetryCount) {
//   console.log("재시도");
// }
```

---

## 7. 목록을 하나씩 꺼내기: for...of

**• JavaScript: for...of로 배열 값 순회하기**

```javascript
let todayTasks = ["복습", "문제풀이", "정리"];

for (let task of todayTasks) {
  console.log(task);
}
// 복습
// 문제풀이
// 정리
```

---

## 8. 객체의 키를 확인하기: for...in

**• JavaScript: for...in으로 객체 key 순회하기**

```javascript
let settings = {
  theme: "dark",
  notification: true,
  language: "ko"
};

for (let key in settings) {
  console.log(key, settings[key]);
}
// theme dark
// notification true
// language ko
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">for...of</div>
    배열처럼 순회 가능한 값(iterable)의 <strong>값</strong>을 꺼낸다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">for...in</div>
    객체의 <strong>key(속성 이름)</strong>를 꺼낸다.
  </div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <code>for...in</code>은 객체 전용이다. 배열에 사용하면 인덱스가 숫자가 아닌 문자열("0", "1")로 나오고 순서도 보장되지 않으므로, 배열에는 <code>for...of</code>나 기본 <code>for</code> 문을 사용한다.
</div>

---

## 9. 반복을 멈추거나 건너뛰기: break / continue

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">break</div>

반복문을 완전히 종료하고 밖으로 나간다.

**• JavaScript: break로 반복 종료하기**

```javascript
let todayTasks = [
  "복습",
  "문제풀이",
  "휴식",
  "정리",
];
let completedTasks = [];

for (let task of todayTasks) {
  if (task === "휴식") {
    break;
  }
  completedTasks.push(task);
}

console.log(completedTasks);
// ["복습", "문제풀이"]
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">continue</div>

이번 회차만 건너뛰고 다음 반복을 계속한다.

**• JavaScript: continue로 회차 건너뛰기**

```javascript
let todayTasks = [
  "복습",
  "문제풀이",
  "휴식",
  "정리",
];

for (let task of todayTasks) {
  if (task === "휴식") {
    continue;
  }
  console.log(task);
}
// 복습
// 문제풀이
// 정리
```

</div>

</div>

---

## 10. 조건문과 반복문을 함께 쓰기

**▶ 반복문 선택 기준**

| 반복문 | 선택 기준 |
|---|---|
| `for` | 반복 횟수가 명확할 때 |
| `while` | 조건에 따라 반복 여부가 정해질 때 |
| `for...of` | 배열 등 iterable의 값이 필요할 때 |
| `for...in` | 객체의 key(속성 이름)가 필요할 때 |

반복문 안에서 조건문을 함께 사용하면 목록의 각 항목을 조건에 따라 다르게 처리할 수 있다.

**• JavaScript: 반복문과 조건문 함께 쓰기**

```javascript
let todayTasks = ["복습", "문제풀이", "정리"];
let completedTasks = ["복습"];

for (let task of todayTasks) {
  if (completedTasks.includes(task)) {
    console.log(`${task}: 완료`);
  } else {
    console.log(`${task}: 대기`);
  }
}
// 복습: 완료
// 문제풀이: 대기
// 정리: 대기
```

---

## 11. 초보자가 자주 만나는 흐름 제어 실수

<div class="wda-fgrid">

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 1 · switch의 break 누락</div>

**• JavaScript: switch의 break 누락하는 실수**

```javascript
let notificationType = "리마인더";

switch (notificationType) {
  case "리마인더":
    console.log("확인하세요");
  case "경고":
    console.log("마감 임박");
}
// 확인하세요
// 마감 임박
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> break가 없으면 다음 case까지 그대로 실행되는 Fall-through가 발생한다.<br>
  <strong>기억할 점:</strong> case마다 break를 넣는다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 2 · for...in을 배열에 사용</div>

**• JavaScript: for...in을 배열에 사용하는 실수**

```javascript
let todayTasks = ["복습", "문제풀이"];

for (let index in todayTasks) {
  console.log(index);
}
// "0"
// "1"
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 인덱스가 숫자가 아니라 문자열로 나온다.<br>
  <strong>기억할 점:</strong> 배열은 for...of를 사용한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 3 · while 조건 변수 갱신 누락</div>

**• JavaScript: while 조건 변수 갱신 누락하는 실수**

```javascript
// ⚠️ retryCount를 증가시키지 않으면 무한 루프에 빠진다 (실행 금지 예시)
// let retryCount = 0;
// while (retryCount < 3) {
//   console.log("재시도");
// }
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 조건이 항상 참으로 남아 반복이 끝나지 않는다.<br>
  <strong>기억할 점:</strong> 반복 안에서 조건 변수를 반드시 갱신한다.
</div>

</div>

</div>

---

## 12. 실습 과제

아직 화면 조작(DOM)은 배우지 않았으니, 이번에도 Console 결과로 직접 확인한다.

**🎯 목표**

오늘의 학습 루틴 체크리스트를 만들고, 조건에 따라 상태를 출력한다.

**📋 요구사항**

• `todayTasks` 배열과 `completedTasks` 배열로 각 작업의 완료 여부를 출력한다.<br>
• `notificationType`에 따라 switch로 다른 메시지를 출력한다.<br>
• `retryCount`/`maxRetryCount`로 while 반복을 연습한다.

**• JavaScript: 실습 구성 예시**

```javascript
// 구성 예시: 작업 상태 출력 / 알림 메시지 분기 / 재시도 반복
```

**💡 힌트 1 — 작업 상태 출력**

**• JavaScript: 힌트 1 — 작업 상태 출력**

```javascript
let todayTasks = ["복습", "문제풀이", "정리"];
let completedTasks = ["복습", "문제풀이"];

for (let task of todayTasks) {
  let taskStatus = completedTasks.includes(task) ? "완료" : "대기";
  console.log(`${task}: ${taskStatus}`);
}
// 복습: 완료
// 문제풀이: 완료
// 정리: 대기
```

**💡 힌트 2 — 알림 메시지 분기**

**• JavaScript: 힌트 2 — 알림 메시지 분기**

```javascript
let notificationType = "완료";

switch (notificationType) {
  case "완료":
    console.log("오늘 학습을 마쳤습니다!");
    break;
  default:
    console.log("학습을 계속 진행하세요.");
}
// 오늘 학습을 마쳤습니다!
```

**💡 힌트 3 — 재시도 반복**

**• JavaScript: 힌트 3 — 재시도 반복**

```javascript
let retryCount = 0;
const maxRetryCount = 2;

while (retryCount < maxRetryCount) {
  retryCount++;
  console.log(`시도 ${retryCount}회`);
}
// 시도 1회
// 시도 2회
```

**📌 정리 메모**

• 조건에 따라 갈라질 때는 if, 정해진 값과 비교할 때는 switch를 쓴다.<br>
• 반복 횟수가 명확하면 for, 조건 중심이면 while을 쓴다.<br>
• 값이 필요하면 for...of, 객체의 key가 필요하면 for...in을 쓴다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>코드는 기본적으로 <strong>위에서 아래로</strong> 순서대로 실행된다.</li>
    <li><strong>if/else if</strong>는 위에서부터 순서대로 조건을 검사해 <strong>첫 true 하나만</strong> 실행한다.</li>
    <li><strong>switch</strong>는 값이 정확히 일치하는 case로 이동하며, case마다 <strong>break가 없으면 Fall-through</strong>가 발생한다.</li>
    <li><strong>for</strong>는 초기화 → 조건 → 실행 → 증감 순으로 정해진 횟수만큼 반복한다.</li>
    <li><strong>while</strong>은 조건이 참인 동안 반복하며, 조건 변수를 갱신하지 않으면 <strong>무한 루프</strong>에 빠진다.</li>
    <li><strong>for...of</strong>는 배열 같은 iterable의 <strong>값</strong>을, <strong>for...in</strong>은 객체의 <strong>key</strong>를 순회한다.</li>
    <li><strong>break</strong>는 반복을 완전히 종료하고, <strong>continue</strong>는 현재 회차만 건너뛰고 반복을 계속한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: switch는 자동으로 다음 case를 안 본다?</div>
    <div class="wda-mistake-right">정답: <strong>break</strong>가 없으면 Fall-through로 다음 case까지 실행된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: for...in을 배열에 써도 상관없다?</div>
    <div class="wda-mistake-right">정답: 인덱스가 문자열로 나오고 순서도 보장되지 않으므로 배열에는 <strong>for...of</strong>를 쓴다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: while은 조건만 있으면 알아서 멈춘다?</div>
    <div class="wda-mistake-right">정답: 반복 안에서 조건 변수를 갱신하지 않으면 <strong>무한 루프</strong>에 빠진다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: break와 continue는 같은 동작이다?</div>
    <div class="wda-mistake-right">정답: break는 반복을 <strong>완전히 종료</strong>하고, continue는 <strong>이번 회차만</strong> 건너뛴다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 조건문 선택</div>
    <div class="wda-formula-block-body">
      <code>if = 범위·복잡 조건</code><br>
      <code>switch = 값 매칭(===)</code>
    </div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 반복문 대상</div>
    <div class="wda-formula-block-body">
      <code>for/while = 횟수·조건</code><br>
      <code>for...of = 값 / for...in = key</code>
    </div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 흐름 제어</div>
    <div class="wda-formula-block-body">
      <code>break = 완전 종료</code><br>
      <code>continue = 이번만 건너뛰기</code>
    </div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">if/else if는 몇 개의 블록이 실행되나?</div>
    <div class="wda-flip-back">위에서부터 검사해 처음 true인 블록 하나만 실행된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">switch에서 break를 빼먹으면?</div>
    <div class="wda-flip-back">Fall-through로 다음 case까지 실행된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">for문의 실행 순서는?</div>
    <div class="wda-flip-back">초기화 → 조건 → 실행 → 증감 순으로 반복한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">while과 do...while의 차이는?</div>
    <div class="wda-flip-back">while은 선검사, do...while은 무조건 1회 실행 후 검사한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">for...of와 for...in의 차이는?</div>
    <div class="wda-flip-back">for...of는 값(iterable)을, for...in은 객체의 key를 순회한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">break와 continue의 차이는?</div>
    <div class="wda-flip-back">break는 반복을 완전 종료하고, continue는 이번 회차만 건너뛴다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">for...in을 배열에 쓰면 왜 안 좋은가?</div>
    <div class="wda-flip-back">인덱스가 문자열로 나오고 순서가 보장되지 않는다.</div>
  </div>
</div>
