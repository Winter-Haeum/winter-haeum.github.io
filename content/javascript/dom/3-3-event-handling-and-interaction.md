---
title: "3-3 이벤트 처리와 상호작용"
status: "completed"
description: "클릭, 입력, 제출 같은 사용자 행동을 addEventListener로 감지하고 처리하는 방법을 event 객체와 이벤트 위임 중심으로 정리한다."
category: "JavaScript"
section: "DOM"
tags:
  - javascript
  - dom
  - events
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
/* 핵심 요약 전용 복습 UI — JavaScript 1-1~1-5·2-1~2-3·4-1~4-4·5-2 기준과 동일. 색은 background/border/accent에만
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
  • <strong>이벤트 연결</strong> — addEventListener로 클릭·입력·제출 같은 사용자 행동을 감지할 수 있다.<br>
  • <strong>event 객체 활용</strong> — target/currentTarget을 구분하고 preventDefault로 기본 동작을 제어할 수 있다.<br>
  • <strong>이벤트 전파 이해</strong> — 버블링이 무엇인지 설명하고 필요할 때 전파를 제어할 수 있다.<br>
  • <strong>이벤트 위임 적용</strong> — 반복되는 요소를 부모 리스너 하나로 처리할 수 있다.
</div>

---

## 1. 이벤트를 배워야 하는 이유

강의 목록 화면을 만들었다고 해도, 버튼을 눌렀을 때 반응이 없다면 그 화면은 그림과 다르지 않다. 사용자가 강의 버튼을 클릭하고, 검색창에 글자를 입력하고, 신청 폼을 제출하는 행동에 JavaScript가 반응하려면 그 행동을 "이벤트"로 감지해야 한다.

이 문서에서는 강의 목록 버튼, 강의 검색 입력창, 신청 폼으로 구성된 화면을 예제로 삼아 이벤트를 연결하고 처리하는 방법을 다룬다.

**• HTML: 예제로 쓸 강의 목록·검색·신청 폼**

```html
<ul id="lesson-container">
  <li><button class="lesson-btn" data-lesson-id="101">비동기 프로그래밍</button></li>
  <li><button class="lesson-btn" data-lesson-id="102">이벤트 처리</button></li>
  <li><button class="lesson-btn" data-lesson-id="103">배열 메서드</button></li>
</ul>

<input type="text" id="filter-input" placeholder="강의 검색">

<form id="apply-form">
  <input type="text" name="studentName" placeholder="이름">
  <button type="submit">신청하기</button>
</form>

<p id="lesson-message"></p>
```

**📌 개념**

<div class="wda-callout wda-ci">
  이 문서의 코드는 모두 <strong>브라우저 환경에서 실행하는 DOM 코드</strong>다. Node.js가 아니라 이 HTML을 가진 페이지의 콘솔(F12)에서 결과를 확인한다.
</div>

---

## 2. 이벤트는 사용자의 행동 신호다

이벤트는 브라우저가 감지해서 JavaScript에 전달해주는 사건이다. 이벤트는 항상 발생하지만, **리스너를 등록한 이벤트만** 처리할 수 있다.

**▶ 자주 쓰는 이벤트 종류**

| 이벤트 | 발생 시점 |
|---|---|
| `click` | 요소를 클릭했을 때 |
| `input` | 입력값이 바뀔 때마다(실시간) |
| `submit` | 폼을 제출할 때 |
| `keydown` | 키보드를 누를 때 |
| `mouseover` | 마우스가 요소 위로 들어올 때 |
| `DOMContentLoaded` | HTML 문서 로딩이 끝났을 때 |

**📌 개념**

<div class="wda-callout wda-ci">
  이벤트(사건) · 리스너(이벤트를 기다리는 등록 정보) · 핸들러(이벤트 발생 시 실행되는 함수), 이 세 가지가 이벤트 처리의 기본 구성 요소다.
</div>

---

## 3. addEventListener로 이벤트 연결하기

**• JavaScript: addEventListener 기본 문법**

```javascript
element.addEventListener(type, handler);
```

- `type` : 이벤트 종류 문자열 (예: `"click"`)
- `handler` : 이벤트가 발생했을 때 실행할 함수

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 onclick 속성 (비권장)</div>

HTML과 JS가 섞이고, 하나의 이벤트에 핸들러를 하나만 연결할 수 있다.

**• HTML: onclick 속성 방식 — 비권장**

```html
<button onclick="handleLessonClick()">
  강의 보기
</button>
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 addEventListener (권장)</div>

같은 이벤트에 여러 핸들러를 등록할 수 있고, 나중에 제거할 수도 있다.

**• JavaScript: addEventListener 방식 — 권장**

```javascript
const applyForm =
  document.getElementById("apply-form");

applyForm.addEventListener(
  "submit",
  handleFormSubmit
);
```

</div>

</div>

---

## 4. 클릭 이벤트 처리하기

**• JavaScript: 클릭 이벤트 처리하기**

```javascript
const lessonButton = document.querySelector(".lesson-btn");

lessonButton.addEventListener("click", function () {
  console.log("강의 버튼 클릭됨");
});
```

**📌 개념**

<div class="wda-callout wda-ci">
  버튼을 클릭할 때마다 등록해둔 함수가 실행된다. 여러 강의 버튼을 한 번에 처리하는 방법은 12번(이벤트 위임)에서 다룬다.
</div>

---

## 5. 입력 이벤트 처리하기

**• JavaScript: 입력 이벤트 처리하기**

```javascript
const filterInput = document.getElementById("filter-input");

filterInput.addEventListener("input", function (event) {
  console.log("검색어:", event.target.value);
});
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>input</code>은 사용자가 글자를 입력할 때마다(타이핑 도중에도) 실시간으로 발생한다. 검색어 필터링처럼 즉시 반응이 필요한 기능에 적합하다.
</div>

---

## 6. 폼 제출 이벤트와 preventDefault

**• JavaScript: preventDefault로 기본 동작 막기**

```javascript
const applyForm = document.getElementById("apply-form");

applyForm.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("신청 폼 제출됨");
});
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <code>preventDefault()</code>는 브라우저의 기본 동작(폼 제출 시 새로고침, 링크 클릭 시 페이지 이동 등)을 막을 때만 사용한다. 특별한 이유 없이 습관적으로 호출하지 않는다.
</div>

---

## 7. event 객체 살펴보기

이벤트가 발생하면 브라우저는 상세 정보를 담은 객체를 만들어 핸들러의 첫 번째 인자로 전달한다.

**▶ event 객체 프로퍼티·메서드**

| 프로퍼티/메서드 | 설명 |
|---|---|
| `type` | 이벤트 종류 (예: `"submit"`) |
| `target` | 이벤트가 실제로 발생한 요소 |
| `currentTarget` | 리스너가 등록된 요소 |
| `preventDefault()` | 기본 동작 막기 |
| `stopPropagation()` | 이벤트 전파 중단 |

**• JavaScript: event 객체 확인하기**

```javascript
applyForm.addEventListener("submit", function (event) {
  console.log(event.type);
});
```

**📌 개념**

<div class="wda-callout wda-ci">
  매개변수 이름은 자유롭게 지을 수 있지만, 관례적으로 <code>event</code>나 <code>e</code>를 쓴다. 필요 없으면 매개변수 자체를 생략해도 된다.
</div>

---

## 8. target과 currentTarget

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">🎯 target</div>

실제로 이벤트를 발생시킨 요소.

**• JavaScript: event.target 확인하기**

```javascript
lessonContainer.addEventListener(
  "click",
  function (event) {
    console.log(event.target);
  }
);
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">📍 currentTarget</div>

리스너가 등록된 요소. 항상 lessonContainer다.

**• JavaScript: event.currentTarget 확인하기**

```javascript
lessonContainer.addEventListener(
  "click",
  function (event) {
    console.log(event.currentTarget);
  }
);
```

</div>

</div>

**📌 개념**

<div class="wda-callout wda-ci">
  자식 요소를 클릭해도 이벤트가 부모로 전달되기 때문에 <code>target</code>과 <code>currentTarget</code>이 다를 수 있다. 핸들러 안에서 <code>this</code> 대신 <strong>event.currentTarget</strong>을 쓰면, 화살표 함수로 핸들러를 작성할 때도 같은 값을 안정적으로 얻을 수 있다.
</div>

---

## 9. 이벤트 핸들러 함수 분리하기

**• JavaScript: 익명 함수로 등록하기**

```javascript
// 익명 함수 — 나중에 이 리스너만 골라 제거할 수 없다
applyForm.addEventListener("submit", function (event) {
  event.preventDefault();
});
```

**• JavaScript: 이름 붙인 함수로 분리하기**

```javascript
// 이름 붙인 함수로 분리 — 재사용과 제거가 쉬워진다
function handleFormSubmit(event) {
  event.preventDefault();
  console.log("신청 완료");
}

applyForm.addEventListener("submit", handleFormSubmit);
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <code>handleFormSubmit()</code>처럼 괄호를 붙여 전달하면 등록하는 순간 즉시 실행되어버린다. addEventListener에는 <strong>실행하지 않은 함수 이름</strong>만 전달해야 한다.
</div>

---

## 10. 이벤트 리스너 제거하기

**• JavaScript: removeEventListener로 리스너 제거하기**

```javascript
function handleFilterInput(event) {
  console.log(event.target.value);
}

filterInput.addEventListener("input", handleFilterInput);

// 같은 함수 참조를 전달해야 제거된다
filterInput.removeEventListener("input", handleFilterInput);
```

**• JavaScript: once 옵션으로 한 번만 실행하기**

```javascript
submitButton.addEventListener(
  "click",
  function () {
    console.log("한 번만 실행됨");
  },
  { once: true }
);
```

**▶ addEventListener 옵션**

| 옵션 | 효과 |
|---|---|
| `{ once: true }` | 핸들러가 한 번 실행된 후 리스너가 자동으로 제거됨 |
| `{ capture: true }` | 버블링 대신 캡처링 단계에서 먼저 실행됨 (11번에서 다룸) |

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <code>removeEventListener</code>는 등록할 때와 <strong>동일한 함수 참조</strong>가 있어야 제거된다. addEventListener에 익명 함수를 바로 넘기면 나중에 지울 방법이 없다.
</div>

---

## 11. 이벤트 전파: bubbling과 capturing

버튼을 클릭하면 이벤트는 버튼(target)에서 시작해 부모 요소를 거쳐 위로 전달된다. 이를 **버블링(bubbling)**이라 부른다.

**• JavaScript: 버블링으로 부모까지 전달 확인하기**

```javascript
lessonContainer.addEventListener("click", function () {
  console.log("lessonContainer에서도 클릭을 감지함");
});
```

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">lesson-btn</div><div class="wda-fnode-dsc">클릭이 발생한 요소</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">li</div><div class="wda-fnode-dsc">부모로 전달됨</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">lessonContainer</div><div class="wda-fnode-dsc">등록된 리스너 실행</div></div>
</div>

**📌 개념**

<div class="wda-callout wda-ci">
  addEventListener는 기본적으로 <strong>버블링 단계</strong>에서 실행된다. 반대로 위에서 아래로 내려가며 먼저 실행되는 <strong>캡처링(capturing)</strong> 단계도 있는데, 세 번째 인자로 <code>{ capture: true }</code>를 전달하면 캡처링 단계에서 실행할 수 있다. 실무에서는 대부분 기본값(버블링)만으로 충분하다.
</div>

전파를 멈춰야 한다면 `event.stopPropagation()`을 쓸 수 있지만, 뒤에서 배울 이벤트 위임을 방해할 수 있으므로 꼭 필요할 때만 사용한다.

---

## 12. 이벤트 위임

강의 버튼이 3개든 30개든, 버튼 하나하나에 리스너를 달지 않고 부모(`lessonContainer`)에 리스너 하나만 등록해도 모든 버튼 클릭을 처리할 수 있다.

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">🔁 개별 등록 (비효율)</div>

**• JavaScript: 버튼마다 개별 등록하기 — 비효율**

```javascript
const lessonButtons =
  document.querySelectorAll(".lesson-btn");

lessonButtons.forEach(function (button) {
  button.addEventListener(
    "click",
    handleLessonClick
  );
});
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">✅ 이벤트 위임 (권장)</div>

**• JavaScript: 이벤트 위임으로 등록하기 — 권장**

```javascript
lessonContainer.addEventListener(
  "click",
  handleLessonClick
);
```

</div>

</div>

**• JavaScript: 이벤트 위임 핸들러 함수**

```javascript
function handleLessonClick(event) {
  if (!event.target.classList.contains("lesson-btn")) return;

  console.log("선택한 강의:", event.target.dataset.lessonId);
}
```

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">부모에 리스너 등록</div><div class="wda-fnode-dsc">lessonContainer에 클릭 리스너 1개</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">자식 클릭</div><div class="wda-fnode-dsc">버블링으로 부모까지 전달됨</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">target으로 구분</div><div class="wda-fnode-dsc">어떤 버튼인지 확인 후 처리</div></div>
</div>

**📌 개념**

<div class="wda-callout wda-ci">
  이벤트 위임은 나중에 강의 버튼이 새로 추가되어도 별도로 리스너를 등록할 필요가 없다는 점에서, 반복되는 요소를 다룰 때 특히 유용하다.
</div>

---

## 13. dataset으로 정보 구분하기

**• HTML: data-lesson-id 속성이 있는 버튼**

```html
<button class="lesson-btn" data-lesson-id="101">비동기 프로그래밍</button>
```

**• JavaScript: dataset으로 정보 구분하기**

```javascript
function handleLessonClick(event) {
  if (!event.target.classList.contains("lesson-btn")) return;

  const lessonId = event.target.dataset.lessonId;
  console.log("클릭한 강의 ID:", lessonId);
}
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>data-lesson-id</code> 같은 <code>data-*</code> 속성은 <code>event.target.dataset</code>으로 읽는다. 하이픈으로 이어진 이름(<code>lesson-id</code>)은 카멜 케이스(<code>lessonId</code>)로 접근한다. 여러 버튼을 하나의 핸들러로 처리할 때, 어떤 버튼인지 구분하는 용도로 자주 쓰인다.
</div>

---

## 14. 키보드 이벤트와 마우스 이벤트 기본

**• JavaScript: 키보드 이벤트 처리하기**

```javascript
filterInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    console.log("검색어 확정:", event.target.value);
  }
});
```

**• JavaScript: 마우스 이벤트 처리하기**

```javascript
lessonButton.addEventListener("mouseover", function () {
  console.log("버튼 위에 마우스가 올라옴");
});
```

**▶ 키보드·마우스 이벤트 정리**

| 분류 | 자주 쓰는 이벤트 | 설명 |
|---|---|---|
| 키보드 | `keydown` | 키를 누르는 순간 발생, `event.key`로 어떤 키인지 확인 |
| 마우스 | `click` | 누르고 뗀 동작이 끝나야 발생 |
| 마우스 | `mouseover` / `mouseout` | 요소 위로 들어오고 나갈 때 발생 |

---

## 15. 초보자가 자주 만나는 이벤트 실수

<div class="wda-fgrid">

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 1 · 괄호를 붙여 즉시 실행</div>

**• JavaScript: 괄호를 붙여 즉시 실행하는 실수**

```javascript
// applyForm.addEventListener(
//   "submit", handleFormSubmit()
// );
// ❌ 등록 즉시 실행되고, 반환값이
// 핸들러로 등록되어버린다
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 괄호를 붙이면 그 자리에서 바로 실행된다.<br>
  <strong>기억할 점:</strong> addEventListener에는 실행하지 않은 함수 이름만 전달한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 2 · 요소를 찾지 못함</div>

**• JavaScript: 요소를 찾지 못하는 실수**

```javascript
const missingButton =
  document.querySelector(".not-exist");

missingButton.addEventListener("click", handleLessonClick);
// ❌ TypeError: Cannot read properties
// of null (일부러 에러 확인용)
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 선택자가 틀렸거나 스크립트가 요소보다 먼저 실행되면 <code>null</code>이 반환된다.<br>
  <strong>기억할 점:</strong> 선택한 요소가 있는지 먼저 확인하거나 스크립트 위치를 점검한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 3 · 익명 함수는 제거 불가</div>

**• JavaScript: 익명 함수는 제거 불가한 실수**

```javascript
lessonButton.addEventListener("click", function () {
  console.log("클릭");
});
// 겉모습이 같은 새 함수를 만들어도
// removeEventListener는 제거하지 못한다
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 매번 새로 만든 함수는 서로 다른 함수로 취급된다.<br>
  <strong>기억할 점:</strong> 제거할 계획이면 이름 붙인 함수로 등록한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 4 · 위임에서 target 확인 누락</div>

**• JavaScript: 위임에서 target 확인 누락하는 실수**

```javascript
lessonContainer.addEventListener("click", function (event) {
  console.log(event.target.dataset.lessonId);
  // li나 여백을 클릭해도 실행되어
  // lessonId가 undefined일 수 있다
});
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 이벤트 위임은 자식뿐 아니라 부모 영역 클릭에도 반응한다.<br>
  <strong>기억할 점:</strong> classList나 tagName으로 원하는 요소인지 먼저 확인한다.
</div>

</div>

</div>

---

## 16. 실습 과제

**🎯 목표**

강의 목록 클릭을 이벤트 위임으로 처리하고, 검색어 입력과 폼 제출까지 연결해본다.

**📋 요구사항**

• `lessonContainer`에 이벤트 위임으로 클릭을 등록하고, 클릭된 버튼의 `data-lesson-id`를 `lessonMessage`에 표시한다.<br>
• `filterInput`에 `input` 이벤트를 등록해 입력값을 콘솔에 출력한다.<br>
• `applyForm`에 `submit` 이벤트를 등록해 기본 동작을 막고 `"신청 완료"`를 출력한다.

**• JavaScript: 실습 구성 예시**

```javascript
// 구성 예시: 이벤트 위임으로 클릭 처리 / input 이벤트 등록 / submit에서 preventDefault
```

**💡 힌트 1 — 이벤트 위임으로 클릭 처리**

**• JavaScript: 힌트 1 — 이벤트 위임으로 클릭 처리**

```javascript
lessonContainer.addEventListener("click", function (event) {
  if (!event.target.classList.contains("lesson-btn")) return;

  lessonMessage.textContent =
    "선택한 강의: " + event.target.dataset.lessonId;
});
```

**💡 힌트 2 — 입력 이벤트**

**• JavaScript: 힌트 2 — 입력 이벤트**

```javascript
filterInput.addEventListener("input", function (event) {
  console.log(event.target.value);
});
```

**💡 힌트 3 — 폼 제출 막기**

**• JavaScript: 힌트 3 — 폼 제출 막기**

```javascript
applyForm.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("신청 완료");
});
```

**📌 정리 메모**

• addEventListener는 이름 붙인 함수와 함께 쓰면 제거와 재사용이 쉬워진다.<br>
• event.target은 실제 클릭된 요소, event.currentTarget은 리스너가 등록된 요소다.<br>
• 반복되는 요소는 이벤트 위임으로 하나의 리스너만 등록하는 것이 효율적이다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>이벤트는 브라우저가 감지해 JS로 전달하는 사용자 행동 신호이며, <strong>리스너를 등록한 이벤트만</strong> 처리된다.</li>
    <li><strong>addEventListener(type, handler)</strong>로 이벤트를 연결하며, 같은 이벤트에 여러 핸들러를 등록할 수 있다.</li>
    <li><strong>event.target</strong>은 실제 이벤트가 발생한 요소, <strong>event.currentTarget</strong>은 리스너가 등록된 요소를 가리킨다.</li>
    <li><strong>preventDefault()</strong>는 기본 동작을 막고, 이벤트는 <strong>캡처링 → 타겟 → 버블링</strong> 순서로 전파된다.</li>
    <li>반복되는 자식 요소는 <strong>이벤트 위임</strong>(부모에 리스너 하나)으로 처리하고, <strong>event.target.dataset</strong>으로 어떤 요소인지 구분한다.</li>
    <li><strong>removeEventListener</strong>는 등록할 때와 동일한 함수 참조가 있어야 제거되므로, 제거할 계획이면 이름 붙인 함수로 등록한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: addEventListener 두 번째 인자에 handleClick()처럼 괄호를 붙여도 나중에 클릭 시 실행된다?</div>
    <div class="wda-mistake-right">정답: 괄호를 붙이면 <strong>즉시 실행</strong>되어 그 반환값이 전달된다. 함수 이름만 전달해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: removeEventListener는 겉모습이 같은 함수면 제거된다?</div>
    <div class="wda-mistake-right">정답: 반드시 <strong>동일한 함수 참조(이름 붙인 함수)</strong>가 필요하다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 이벤트 위임에서 부모에 리스너를 달면 자식을 구분할 필요가 없다?</div>
    <div class="wda-mistake-right">정답: <strong>event.target</strong>으로 실제 클릭된 자식이 맞는지 확인하는 절차가 필요하다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: this와 event.currentTarget은 항상 같은 값이다?</div>
    <div class="wda-mistake-right">정답: 화살표 함수로 만든 핸들러에서는 <code>this</code>가 currentTarget을 가리키지 않으므로 <strong>event.currentTarget</strong>을 쓰는 것이 안전하다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 이벤트 연결</div>
    <div class="wda-formula-block-body"><code>element.addEventListener(type, handler)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · target vs currentTarget</div>
    <div class="wda-formula-block-body"><code>target = 실제 클릭</code><br><code>currentTarget = 리스너 등록 위치</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 전파 순서</div>
    <div class="wda-formula-block-body"><code>캡처링(하강) → 타겟 → 버블링(상승)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · 이벤트 위임</div>
    <div class="wda-formula-block-body"><code>부모 리스너 1개</code><br><code>+ event.target.dataset</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">addEventListener의 기본 문법은?</div>
    <div class="wda-flip-back">element.addEventListener(type, handler) — 이벤트 종류와 실행할 함수를 전달한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">target과 currentTarget의 차이는?</div>
    <div class="wda-flip-back">target은 실제로 이벤트가 발생한 요소, currentTarget은 리스너가 등록된 요소다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">preventDefault()는 언제 쓰나?</div>
    <div class="wda-flip-back">브라우저의 기본 동작(폼 제출 새로고침, 링크 이동 등)을 막아야 할 때만 사용한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">removeEventListener가 실패하는 대표적인 이유는?</div>
    <div class="wda-flip-back">등록할 때 익명 함수를 써서 동일한 함수 참조를 전달하지 못했기 때문이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">이벤트 위임을 쓰는 이유는?</div>
    <div class="wda-flip-back">부모에 리스너 하나만 등록해 메모리를 절약하고, 나중에 추가되는 자식에도 자동 적용되기 때문이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">event.target.dataset은 언제 쓰나?</div>
    <div class="wda-flip-back">data-* 속성으로, 여러 자식 요소 중 어떤 것이 클릭됐는지 구분할 때 쓴다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">이벤트는 어떤 순서로 전파되나?</div>
    <div class="wda-flip-back">캡처링(하강) → 타겟 → 버블링(상승) 순으로 진행된다.</div>
  </div>
</div>
