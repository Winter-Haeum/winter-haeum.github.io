---
title: "5-1 비동기 프로그래밍 시작하기"
status: "completed"
description: "동기와 비동기의 차이, 콜 스택과 이벤트 루프의 기본 흐름, 콜백 패턴을 강의 데이터 로딩 시나리오로 정리한다."
category: "JavaScript"
section: "Async"
tags:
  - javascript
  - async
  - event-loop
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
/* 핵심 요약 전용 복습 UI — JavaScript 1-1~1-5·2-1~2-3·4-1~4-4·5-2·DOM 3-3 기준과 동일. 색은 background/border/accent에만
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
  • <strong>동기와 비동기 구분</strong> — 두 실행 방식의 차이를 코드로 설명할 수 있다.<br>
  • <strong>실행 흐름 이해</strong> — 콜 스택과 이벤트 루프가 코드 실행 순서를 어떻게 결정하는지 이해한다.<br>
  • <strong>콜백 패턴 활용</strong> — 시간이 걸리는 작업의 결과를 콜백으로 받아 처리할 수 있다.<br>
  • <strong>다음 단계 준비</strong> — 콜백의 한계를 알고 Promise/async-await로 넘어갈 준비를 한다.
</div>

---

## 1. 비동기를 배워야 하는 이유

강의 상세 화면을 연다고 하자. 강의 제목은 바로 화면에 표시할 수 있지만, 리뷰 목록이나 추천 강의는 서버에서 가져오는 데 시간이 걸린다.

이때 화면이 리뷰가 도착할 때까지 멈춰버리면 안 된다.

JavaScript는 오래 걸리는 작업을 기다리지 않고, 그 작업을 맡겨둔 채 다음 코드를 먼저 실행할 수 있다. 이 문서에서는 강의 제목과 리뷰 목록을 예제로 삼아, 이 흐름이 어떻게 동작하는지 살펴본다.

---

## 2. 동기 처리와 비동기 처리

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 동기(Synchronous)</div>

앞 작업이 끝나야 다음 작업이 실행된다.

**• JavaScript: 동기 코드 실행 순서**

```javascript
console.log("1. 강의 제목 표시");
console.log("2. 강의 설명 표시");
console.log("3. 목차 표시");
// 1 → 2 → 3 순서 그대로
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 비동기(Asynchronous)</div>

오래 걸리는 작업을 기다리지 않고 다음 코드를 먼저 실행한다.

**• JavaScript: 비동기 처리 실행 순서**

```javascript
console.log("1. 강의 제목 표시");
setTimeout(() => {
  console.log("3. 리뷰 목록 도착");
}, 1000);
console.log("2. 다음 화면 요소 표시");
// 1 → 2 → (1초 후) 3
```

</div>

</div>

**📌 개념**

<div class="wda-callout wda-ci">
  비동기 코드는 <strong>작성된 순서가 아니라 완료되는 순서</strong>로 결과가 나타난다.
</div>

---

## 3. 시간이 걸리는 작업은 따로 맡겨둘 수 있다

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">네트워크 요청</div>
    <div class="wda-fcard-dsc">서버에서 리뷰 목록을 가져오는 작업</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">타이머</div>
    <div class="wda-fcard-dsc">몇 초 뒤 안내 문구를 보여주는 작업</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">사용자 입력</div>
    <div class="wda-fcard-dsc">버튼 클릭처럼 언제 발생할지 모르는 작업</div>
  </div>
</div>

**📌 개념**

<div class="wda-callout wda-ci">
  이런 작업은 얼마나 걸릴지 코드 실행 시점에는 알 수 없다. JavaScript는 이 작업을 실행 환경(브라우저 등)에 맡겨두고, 결과가 오면 처리할 함수(콜백)만 미리 등록해둔다.
</div>

---

## 4. JavaScript는 한 번에 하나씩 실행된다

**• JavaScript: 콜 스택 순차 실행**

```javascript
function showTitle() {
  console.log("강의 제목 표시");
}

function showDescription() {
  console.log("강의 설명 표시");
}

showTitle();
showDescription();
// showTitle이 완전히 끝나야 showDescription이 시작된다
```

**📌 개념**

<div class="wda-callout wda-ci">
  JavaScript는 한 번에 하나의 코드만 실행하는 구조(콜 스택)를 가진다. 함수가 호출되면 쌓이고, 실행이 끝나면 정리되는 방식으로 순서대로만 처리한다.
</div>

---

## 5. call stack과 브라우저 작업 흐름

**▶ 콜 스택·Web API·태스크 큐 역할**

| 영역 | 역할 |
|---|---|
| call stack | 지금 실행 중인 코드가 쌓이는 곳 |
| Web API | 타이머·네트워크 요청처럼 시간이 걸리는 작업을 대신 처리하는 실행 환경 영역 |
| task queue | 완료된 작업의 콜백이 순서를 기다리는 곳 |

**📌 개념**

<div class="wda-callout wda-ci">
  <code>setTimeout</code>처럼 시간이 걸리는 작업을 만나면, JavaScript는 그 작업을 Web API 영역에 맡기고 곧바로 call stack을 비운다. 작업이 끝나도 결과는 즉시 실행되지 않고 task queue에서 순서를 기다린다.
</div>

---

## 6. event loop 기본 흐름

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">코드 실행</div><div class="wda-fnode-dsc">call stack에서 순서대로 처리</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">Web API</div><div class="wda-fnode-dsc">시간이 걸리는 작업을 대신 처리</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">task queue</div><div class="wda-fnode-dsc">완료된 콜백이 대기</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">콜백 실행</div><div class="wda-fnode-dsc">call stack이 비면 이동</div></div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  이벤트 루프는 <strong>call stack이 완전히 비어 있을 때만</strong> task queue의 콜백을 call stack으로 옮긴다. 내부 동작을 깊게 파고들기보다, 이 순서만 기억해도 충분하다.
</div>

---

## 7. setTimeout으로 실행 순서 확인하기

**• JavaScript: setTimeout 실행 순서 확인**

```javascript
console.log("1. 강의 제목 표시");

const timerId = setTimeout(() => {
  console.log("3. 리뷰 목록 도착");
}, 0);

console.log("2. 다음 화면 요소 표시");

// 출력 순서: 1 → 2 → 3
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <code>setTimeout(fn, 0)</code>도 즉시 실행되지 않는다. call stack에 남아 있는 코드(여기서는 <code>"2. 다음 화면 요소 표시"</code>까지)가 모두 끝난 뒤에야 콜백이 실행된다.
</div>

---

## 8. 콜백 함수로 완료 후 처리하기

**• JavaScript: 콜백으로 완료 후 처리하기**

```javascript
function fetchLessonReviews(callback) {
  setTimeout(() => {
    const reviewList = ["좋아요", "유익해요"];
    callback(reviewList);
  }, 1000);
}

function handleComplete(reviewList) {
  console.log("리뷰 도착:", reviewList);
}

fetchLessonReviews(handleComplete);
console.log("리뷰 요청을 보냈습니다");

// 출력 순서: 리뷰 요청을 보냈습니다 → (1초 후) 리뷰 도착: [...]
```

**📌 개념**

<div class="wda-callout wda-ci">
  콜백은 <strong>"작업이 끝나면 이 함수를 실행해줘"</strong>라고 미리 맡겨두는 함수다. <code>fetchLessonReviews</code>는 결과를 <code>return</code>하지 않고, 대신 <code>callback</code>을 호출해 결과를 전달한다.
</div>

---

## 9. 콜백이 많아질 때 생기는 문제

**• JavaScript: 콜백 중첩(콜백 지옥) 예시**

```javascript
fetchLessonReviews(function (reviewList) {
  console.log("리뷰:", reviewList);

  fetchRecommendedLessons(function (recommended) {
    console.log("추천 강의:", recommended);
    // 필요한 데이터가 늘어날수록 콜백 안에 콜백이 계속 중첩된다
  });
});
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  순서대로 처리해야 할 비동기 작업이 늘어날수록 콜백 안에 콜백이 계속 중첩되어 코드가 오른쪽으로 밀려난다. 이 문제를 <strong>콜백 지옥</strong>이라 부른다.
</div>

---

## 10. Promise와 async/await로 이어지는 이유

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 콜백 방식</div>

**• JavaScript: 콜백 방식 코드**

```javascript
fetchLessonReviews(function (reviewList) {
  console.log(reviewList);
});
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 Promise로 넘어가는 흐름</div>

**• JavaScript: Promise로 전환한 코드**

```javascript
fetchLessonReviews()
  .then(reviewList =>
    console.log(reviewList)
  );
```

</div>

</div>

**📌 개념**

<div class="wda-callout wda-ci">
  Promise와 async/await는 콜백 중첩 문제를 해결하기 위해 나온 문법이다. 구체적인 사용법은 <strong>5-2 Promise와 async/await</strong> 문서에서 이어서 다룬다.
</div>

---

## 11. 비동기 실행 순서를 착각하기 쉬운 이유

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 바로 실행되는 코드</div>

**• JavaScript: 동기 코드 실행 순서**

```javascript
console.log("A");
console.log("B");
// A → B 순서 그대로
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 나중에 실행되는 코드</div>

**• JavaScript: setTimeout 지연 실행 순서**

```javascript
console.log("A");
setTimeout(() => console.log("B"), 100);
console.log("C");
// A → C → (0.1초 후) B
```

</div>

</div>

**📌 개념**

<div class="wda-callout wda-ci">
  setTimeout이나 콜백은 코드에 <strong>적힌 위치가 아니라 작업이 끝난 시점</strong>에 실행된다. 코드를 눈으로 읽는 순서와 실제 실행 순서가 다를 수 있다는 점을 항상 염두에 두고, 헷갈릴 때는 콘솔 출력으로 직접 순서를 확인한다.
</div>

---

## 12. 초보자가 자주 만나는 비동기 실수

<div class="wda-fgrid">

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 1 · 콜백 결과를 바로 사용</div>

**• JavaScript: 콜백 결과를 밖에서 사용한 실수**

```javascript
let reviewList;

fetchLessonReviews(function (result) {
  reviewList = result;
});

console.log(reviewList);
// undefined — 콜백이 아직 실행되지 않았다
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 콜백은 나중에 실행되므로, 콜백 밖에서 바로 결과를 읽으면 값이 들어오기 전이다.<br>
  <strong>기억할 점:</strong> 결과가 필요한 코드는 콜백 안에서 실행한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 2 · setTimeout(fn, 0)을 즉시 실행으로 착각</div>

**• JavaScript: setTimeout(fn, 0) 오해 예시**

```javascript
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
// A → C → B (B가 마지막)
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 0ms를 줘도 현재 실행 중인 코드가 끝난 뒤에 실행된다.<br>
  <strong>기억할 점:</strong> setTimeout은 항상 나중에 실행되는 코드로 취급한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 3 · 콜백을 실행하며 전달</div>

**• JavaScript: 콜백을 실행하며 전달한 실수**

```javascript
// fetchLessonReviews(handleComplete());
// ❌ handleComplete가 즉시 실행되고
// 그 결과가 콜백 자리에 전달된다

fetchLessonReviews(handleComplete);
// ✅ 함수 자체를 전달해야 한다
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 괄호를 붙이면 등록 시점에 바로 실행되어버린다.<br>
  <strong>기억할 점:</strong> 콜백 자리에는 실행하지 않은 함수 이름만 전달한다.
</div>

</div>

</div>

---

## 13. 실습 과제

**🎯 목표**

강의 리뷰를 콜백으로 불러오고, 로딩 메시지와 완료 메시지를 순서대로 확인한다.

**📋 요구사항**

• `showLoading()`으로 로딩 메시지를 먼저 출력한다.<br>
• `fetchLessonReviews(callback)`로 1초 뒤 리뷰 목록을 받는다.<br>
• 리뷰가 도착하면 `showReviews(reviewList)`로 결과를 출력한다.

**• JavaScript: 실습 과제 구성 예시**

```javascript
// 구성 예시: 로딩 메시지 출력 / 콜백으로 리뷰 요청 / 완료 후 결과 출력
```

**💡 힌트 1 — 로딩 메시지 먼저 출력**

**• JavaScript: 로딩 메시지 출력 힌트**

```javascript
function showLoading() {
  console.log("리뷰를 불러오는 중...");
}

showLoading();
```

**💡 힌트 2 — 콜백으로 리뷰 받기**

**• JavaScript: 콜백으로 리뷰 받기 힌트**

```javascript
function fetchLessonReviews(callback) {
  setTimeout(() => {
    callback(["좋아요", "유익해요"]);
  }, 1000);
}
```

**💡 힌트 3 — 완료 후 결과 표시**

**• JavaScript: 완료 후 결과 표시 힌트**

```javascript
function showReviews(reviewList) {
  console.log("리뷰 목록:", reviewList);
}

showLoading();
fetchLessonReviews(showReviews);
```

**📌 정리 메모**

• 동기 코드는 순서대로, 비동기 코드는 완료되는 순서대로 실행된다.<br>
• 콜백은 작업이 끝난 뒤 실행할 함수를 미리 전달하는 방식이다.<br>
• 콜백이 중첩되는 문제는 Promise와 async/await로 해결한다(5-2에서 계속).

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><strong>동기</strong>는 앞 작업이 끝나야 다음 작업이 실행되는 순차 방식이고, <strong>비동기</strong>는 오래 걸리는 작업을 기다리지 않고 다음 코드를 먼저 실행하는 방식이다.</li>
    <li>JavaScript는 <strong>한 번에 하나의 코드만 실행</strong>하며(콜 스택), 시간이 걸리는 작업은 실행 환경(Web API)에 맡겨둔다.</li>
    <li>완료된 작업의 콜백은 <strong>task queue</strong>에서 대기하다가, <strong>call stack이 완전히 비어야</strong> event loop에 의해 실행된다.</li>
    <li><strong>setTimeout(fn, 0)</strong>도 즉시 실행되지 않으며, 현재 실행 중인 코드가 모두 끝난 뒤에 실행된다.</li>
    <li><strong>콜백</strong>은 작업이 끝나면 실행하도록 미리 맡겨두는 함수이며, 콜백이 중첩될수록 코드가 읽기 어려워진다(콜백 지옥).</li>
    <li>콜백 중첩 문제는 <strong>Promise와 async/await</strong>로 해결하며, 자세한 문법은 5-2 문서에서 다룬다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 콜백으로 받은 결과를 콜백 밖에서 바로 사용할 수 있다?</div>
    <div class="wda-mistake-right">정답: 콜백은 나중에 실행되므로, 결과가 필요한 코드는 <strong>콜백 안</strong>에서 실행해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: setTimeout(fn, 0)은 0ms 후 즉시 실행된다?</div>
    <div class="wda-mistake-right">정답: <strong>현재 실행 중인 동기 코드가 모두 끝난 뒤</strong>에야 실행된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 콜백 함수는 fn()처럼 괄호를 붙여 전달해도 나중에 실행된다?</div>
    <div class="wda-mistake-right">정답: 괄호를 붙이면 <strong>즉시 실행</strong>되어 그 결과가 전달된다. 함수 이름만 전달해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 비동기 코드는 코드에 적힌 순서대로 실행 결과가 나타난다?</div>
    <div class="wda-mistake-right">정답: 비동기 코드는 <strong>작성 순서가 아니라 완료되는 순서</strong>로 실행된다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 실행 방식</div>
    <div class="wda-formula-block-body"><code>동기 = 순서대로 대기</code><br><code>비동기 = 맡기고 다음 코드 실행</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 실행 단위</div>
    <div class="wda-formula-block-body"><code>call stack 하나씩 처리</code><br><code>완료 작업 → task queue 대기</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · event loop 규칙</div>
    <div class="wda-formula-block-body"><code>call stack이 빌 때만</code><br><code>task queue → call stack</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · 다음 단계</div>
    <div class="wda-formula-block-body"><code>콜백 중첩 → Promise/async-await</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">동기와 비동기의 차이는?</div>
    <div class="wda-flip-back">동기는 앞 작업이 끝나야 다음이 실행되고, 비동기는 기다리지 않고 다음 코드를 먼저 실행한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">JavaScript가 시간 걸리는 작업을 처리하는 방식은?</div>
    <div class="wda-flip-back">작업을 실행 환경(Web API)에 맡기고, 결과가 오면 콜백을 task queue에 등록한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">event loop의 기본 규칙은?</div>
    <div class="wda-flip-back">call stack이 완전히 비어야 task queue의 콜백을 가져와 실행한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">setTimeout(fn, 0)은 언제 실행되나?</div>
    <div class="wda-flip-back">현재 실행 중인 동기 코드가 모두 끝난 뒤에 실행된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">콜백이란?</div>
    <div class="wda-flip-back">작업이 끝난 뒤 실행하도록 미리 전달해두는 함수다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">콜백 지옥이란?</div>
    <div class="wda-flip-back">콜백 안에 콜백이 계속 중첩되어 코드가 읽기 어려워지는 현상이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">콜백 중첩 문제는 어떻게 해결하나?</div>
    <div class="wda-flip-back">Promise와 async/await로 해결하며, 자세한 문법은 5-2에서 다룬다.</div>
  </div>
</div>
