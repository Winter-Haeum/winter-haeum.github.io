---
title: "3-1 DOM이란 무엇인가요?"
status: "completed"
description: "DOM 개념과 document, querySelector/querySelectorAll로 요소를 선택하는 방법, textContent/innerHTML/classList 기본을 강의 상세 화면 시나리오로 정리한다."
category: "JavaScript"
section: "DOM"
tags:
  - javascript
  - dom
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
/* 핵심 요약 전용 복습 UI — JavaScript 1-1~1-5·2-1~2-3·4-1~4-4·DOM 3-3·async 5-1~5-5 기준과 동일. 색은 background/border/accent에만
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
  • <strong>DOM 개념</strong> — HTML과 DOM이 어떻게 다른지 설명할 수 있다.<br>
  • <strong>요소 선택</strong> — querySelector/querySelectorAll로 필요한 요소를 찾을 수 있다.<br>
  • <strong>기본 읽기·변경</strong> — textContent/innerHTML/classList로 요소를 가볍게 다룰 수 있다.<br>
  • <strong>안전한 사용</strong> — 선택 결과가 없을 수 있다는 점을 알고 확인할 수 있다.
</div>

---

## 1. DOM을 배워야 하는 이유

강의 상세 화면에는 제목, 난이도, 수강 상태, 안내 문구 같은 요소들이 있다. JavaScript로 이 화면을 동적으로 바꾸려면, 먼저 HTML로 작성된 요소를 코드에서 찾아낼 수 있어야 한다.

DOM은 이 과정을 가능하게 해주는 구조다.

**• HTML: 강의 상세 화면 예시**

```html
<h1 class="lesson-title">DOM 기본</h1>
<span class="lesson-level">초급</span>
<p class="lesson-status">수강 전</p>
<p class="lesson-message"></p>

<ul id="lesson-list">
  <li class="lesson-item">비동기 프로그래밍</li>
  <li class="lesson-item">이벤트 처리</li>
  <li class="lesson-item">모듈</li>
</ul>
```

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">요소 찾기</div>
    <div class="wda-fcard-dsc">화면에서 원하는 요소를 정확히 찾아야 할 때</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">내용 바꾸기</div>
    <div class="wda-fcard-dsc">찾은 요소의 텍스트나 상태를 바꿔야 할 때</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">여러 항목 다루기</div>
    <div class="wda-fcard-dsc">강의 목록처럼 여러 개의 항목을 한 번에 다뤄야 할 때</div>
  </div>
</div>

**📌 개념**

<div class="wda-callout wda-ci">
  이 문서의 코드는 모두 <strong>브라우저 환경에서 실행하는 DOM 코드</strong>다. Node.js에는 <code>document</code>가 기본 제공되지 않는다.
</div>

---

## 2. DOM은 HTML을 JavaScript가 다룰 수 있게 만든 구조다

**• HTML: DOM으로 변환될 요소**

```html
<h1 class="lesson-title">DOM 기본</h1>
```

**📌 개념**

<div class="wda-callout wda-ci">
  브라우저는 이 HTML을 읽어 JavaScript가 다룰 수 있는 객체 구조로 만든다. 이 구조를 <strong>DOM(Document Object Model)</strong>이라 부른다. HTML은 그대로 텍스트지만, DOM은 코드로 접근하고 바꿀 수 있는 객체다.
</div>

---

## 3. document 객체

**• JavaScript: document 객체 확인하기**

```javascript
console.log(document.title);
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>document</code>는 브라우저가 만들어주는 DOM의 시작점이다. 요소를 찾는 모든 코드는 <code>document</code>에서 출발한다(<code>document.querySelector(...)</code>처럼).
</div>

---

## 4. element와 node

**▶ node·element·document 용어 정리**

| 용어 | 의미 |
|---|---|
| node | DOM을 구성하는 모든 조각 |
| element | 그중 HTML 태그로 만들어진 노드 |
| document | DOM 전체의 시작점 |

**📌 개념**

<div class="wda-callout wda-ci">
  DOM을 구성하는 하나하나의 조각을 <strong>노드(node)</strong>라 부른다. 그중에서도 <code>h1</code>, <code>li</code> 같은 HTML 태그에 해당하는 노드를 <strong>요소(element)</strong>라 부른다. 이 문서에서는 대부분 요소를 다루므로, 이 정도만 기억해도 충분하다.
</div>

---

## 5. DOM tree 기본

**• HTML: DOM tree로 변환될 목록**

```html
<ul id="lesson-list">
  <li class="lesson-item">비동기 프로그래밍</li>
  <li class="lesson-item">이벤트 처리</li>
</ul>
```

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">HTML</div><div class="wda-fnode-dsc">문서 텍스트</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">DOM tree</div><div class="wda-fnode-dsc">브라우저가 객체로 변환</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">document</div><div class="wda-fnode-dsc">트리의 진입점</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">element 선택</div><div class="wda-fnode-dsc">querySelector로 접근</div></div>
</div>

**📌 개념**

<div class="wda-callout wda-ci">
  DOM은 부모-자식 관계로 연결된 트리 구조를 가진다. 위 예시에서 <code>ul</code>은 두 <code>li</code>의 부모다. 트리를 직접 탐색하는 방법(부모·자식·형제 찾기)은 이 문서에서 다루지 않는다 — 여기서는 <code>querySelector</code>로 필요한 요소를 바로 찾는 방법에 집중한다.
</div>

---

## 6. querySelector로 하나 선택하기

**• JavaScript: querySelector로 요소 하나 선택하기**

```javascript
const lessonTitle = document.querySelector(".lesson-title");
console.log(lessonTitle);
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>querySelector</code>는 조건에 맞는 <strong>첫 번째 요소 하나</strong>를 찾아 반환한다.
</div>

---

## 7. querySelectorAll로 여러 개 선택하기

**• JavaScript: querySelectorAll로 여러 요소 선택하기**

```javascript
const lessonItems = document.querySelectorAll(".lesson-item");
console.log(lessonItems.length); // 3
```

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">🎯 querySelector</div>

첫 번째 요소 하나만 반환한다.

**• JavaScript: querySelector 결과**

```javascript
document.querySelector(".lesson-item");
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">📋 querySelectorAll</div>

조건에 맞는 모든 요소를 반환한다.

**• JavaScript: querySelectorAll 결과**

```javascript
document.querySelectorAll(".lesson-item");
```

</div>

</div>

**📌 개념**

<div class="wda-callout wda-ci">
  <code>querySelectorAll</code>은 조건에 맞는 모든 요소를 <strong>NodeList</strong> 형태로 반환한다. 두 메서드 모두 CSS에서 쓰는 선택자 문법(<code>.class</code>, <code>#id</code>, 태그명 등)을 그대로 사용한다.
</div>

---

## 8. 선택 결과가 없을 때

**• JavaScript: 선택 결과 없을 때 null 확인하기**

```javascript
const selectedLesson = document.querySelector(".not-exist");
console.log(selectedLesson); // null

if (selectedLesson !== null) {
  selectedLesson.textContent = "선택됨";
}
```

**▶ querySelector·querySelectorAll 결과 없을 때**

| 메서드 | 결과가 없을 때 | 결과가 있을 때 |
|---|---|---|
| `querySelector` | `null` | 요소 하나 |
| `querySelectorAll` | 빈 NodeList | 요소들을 담은 NodeList |

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  조건에 맞는 요소가 없으면 <code>querySelector</code>는 에러 없이 <strong>null</strong>을 반환한다. null인 상태에서 곧바로 <code>.textContent</code> 같은 속성에 접근하면 에러가 나므로, 사용 전에 null인지 확인하는 습관이 필요하다.
</div>

---

## 9. NodeList와 배열의 차이

**• JavaScript: NodeList에 forEach 사용하기**

```javascript
const lessonItems = document.querySelectorAll(".lesson-item");

console.log(lessonItems.length); // 3
lessonItems.forEach(item => console.log(item.textContent));
```

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">📋 NodeList</div>

length와 forEach만 바로 쓸 수 있다.

**• JavaScript: NodeList — length·forEach만 사용**

```javascript
lessonItems.forEach(item =>
  console.log(item.textContent)
);
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">🔁 Array.from 변환 후</div>

map, filter 같은 배열 메서드를 쓸 수 있다.

**• JavaScript: Array.from으로 배열 메서드 사용하기**

```javascript
const lessonItemArray =
  Array.from(lessonItems);

lessonItemArray.map(item =>
  item.textContent
);
```

</div>

</div>

**📌 개념**

<div class="wda-callout wda-ci">
  NodeList는 배열처럼 생겼지만 배열은 아니다. 배열 메서드가 필요하면 <code>Array.from(nodeList)</code>로 진짜 배열로 바꾼다.
</div>

---

## 10. textContent로 텍스트 읽고 바꾸기

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">요소 선택</div><div class="wda-fnode-dsc">querySelector</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">읽기</div><div class="wda-fnode-dsc">textContent 확인</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">변경</div><div class="wda-fnode-dsc">새 값 대입</div></div>
</div>

**• JavaScript: textContent로 읽고 바꾸기**

```javascript
const lessonTitle = document.querySelector(".lesson-title");

console.log(lessonTitle.textContent); // DOM 기본

lessonTitle.textContent = "DOM 기본 다시 보기";
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>textContent</code>로 요소 안의 글자를 읽거나 새 값으로 바꿀 수 있다. 태그가 섞인 문자열을 넣어도 태그 기호까지 그대로 글자로만 표시된다.
</div>

---

## 11. innerHTML과 사용 시 주의

**• JavaScript: innerHTML로 태그 삽입하기**

```javascript
const lessonMessage = document.querySelector(".lesson-message");

lessonMessage.innerHTML = "<strong>수강 가능</strong>";
```

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 textContent</div>

태그를 문자 그대로 표시한다.

**• JavaScript: textContent — 태그를 문자 그대로 표시**

```javascript
lessonMessage.textContent =
  "<strong>수강 가능</strong>";
// 화면에 <strong> 글자가 그대로 보임
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 innerHTML</div>

태그를 실제 요소로 해석한다.

**• JavaScript: innerHTML — 태그를 요소로 해석**

```javascript
lessonMessage.innerHTML =
  "<strong>수강 가능</strong>";
// 굵은 글씨로 "수강 가능"이 보임
```

</div>

</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  innerHTML은 문자열을 실제 HTML로 해석해서 넣는다. 사용자가 입력한 값처럼 <strong>신뢰할 수 없는 문자열</strong>을 그대로 innerHTML에 넣으면 의도치 않은 태그나 스크립트가 실행될 위험이 있다. 직접 작성한 고정 문자열이 아니라면 textContent를 우선 고려한다.
</div>

---

## 12. classList로 상태 바꾸기

**• JavaScript: classList로 클래스 추가·삭제하기**

```javascript
const lessonStatus = document.querySelector(".lesson-status");

lessonStatus.classList.add("is-complete");
lessonStatus.classList.remove("is-pending");
console.log(lessonStatus.classList.contains("is-complete")); // true
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>classList</code>는 요소의 클래스를 추가·삭제·확인할 수 있게 해준다. 상태에 따라 스타일을 바꿔야 할 때, 클래스 이름만 붙였다 떼면서 관리할 수 있다.
</div>

---

## 13. style 직접 변경은 제한적으로 사용하기

**• JavaScript: style로 속성 직접 바꾸기**

```javascript
const noticeText = document.querySelector(".lesson-message");

noticeText.style.display = "none";
```

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">🏷️ classList</div>

정의된 상태 클래스를 붙이고 뗀다.

**• JavaScript: classList로 상태 클래스 관리**

```javascript
lessonStatus.classList.add("is-complete");
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">🎨 style</div>

속성 하나하나를 직접 지정한다.

**• JavaScript: style로 속성 하나씩 지정**

```javascript
noticeText.style.display = "none";
```

</div>

</div>

**📌 개념**

<div class="wda-callout wda-ci">
  style로 속성을 하나씩 직접 바꿀 수도 있지만, 바꿔야 할 속성이 많아지면 코드가 길어지고 관리하기 어려워진다. 여러 스타일을 한 번에 켜고 끄는 상황이라면 <strong>classList로 상태를 나타내는 클래스</strong>를 다루는 방식이 관리하기 쉬운 경우가 많다.
</div>

---

## 14. 오래된 선택 메서드와 DOMContentLoaded 짧게 보기

**• JavaScript: getElementById로 요소 선택하기**

```javascript
const lessonCard = document.getElementById("lesson-list");
```

**▶ 요소 선택 메서드 비교**

| 메서드 | 선택 기준 | 특징 |
|---|---|---|
| `getElementById` | id 값 | id 하나만 사용 가능 |
| `getElementsByClassName` | class 이름 | 여러 조건을 조합하는 CSS 문법은 못 씀 |
| `querySelector` / `querySelectorAll` | CSS 선택자 | 하나의 문법으로 통일, 이 문서에서 쓰는 방식 |

**📌 개념**

<div class="wda-callout wda-ci">
  <code>getElementById</code>, <code>getElementsByClassName</code> 같은 예전 방식도 여전히 동작한다. 다만 선택자 문법이 각각 달라 외울 것이 많다. 새로 작성하는 코드에서는 querySelector 계열을 우선 사용한다.
</div>

**• JavaScript: DOMContentLoaded 이벤트 등록하기**

```javascript
document.addEventListener("DOMContentLoaded", () => {
  console.log("문서 준비 완료");
});
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>DOMContentLoaded</code>는 HTML 문서 로딩이 끝났을 때 발생하는 이벤트다. 이 시점 이후에는 화면의 요소를 안전하게 선택할 수 있다. 이벤트 등록과 처리에 대한 자세한 내용은 <strong>3-3 이벤트 처리</strong> 문서에서 다룬다.
</div>

---

## 15. 초보자가 자주 만나는 DOM 기본 실수

<div class="wda-fgrid">

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 1 · null 확인 없이 사용</div>

**• JavaScript: null 확인 없이 사용하는 실수**

```javascript
const selectedLesson =
  document.querySelector(".not-exist");
selectedLesson.textContent = "선택됨";
// ❌ TypeError: Cannot set properties
// of null (일부러 에러 확인용)
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 선택자가 틀렸거나 요소가 없으면 null이 반환되는데, 확인 없이 사용하면 에러가 난다.<br>
  <strong>기억할 점:</strong> 사용하기 전에 null인지 확인한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 2 · NodeList에 배열 메서드 바로 사용</div>

**• JavaScript: NodeList에 배열 메서드 바로 쓰는 실수**

```javascript
const lessonItems =
  document.querySelectorAll(".lesson-item");
// lessonItems.map(item => item.textContent);
// ❌ TypeError: lessonItems.map is not
// a function (일부러 에러 확인용)
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> NodeList는 배열이 아니라서 map 같은 배열 메서드가 없다.<br>
  <strong>기억할 점:</strong> 배열 메서드가 필요하면 Array.from으로 변환한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 3 · 신뢰할 수 없는 값을 innerHTML에</div>

**• JavaScript: 신뢰할 수 없는 값을 innerHTML에 넣는 실수**

```javascript
const userInput = "<img src=x onerror=alert(1)>";
lessonMessage.innerHTML = userInput;
// 신뢰할 수 없는 문자열이 그대로
// HTML로 해석된다
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> innerHTML은 문자열을 실제 HTML로 해석하므로 위험한 태그도 그대로 실행될 수 있다.<br>
  <strong>기억할 점:</strong> 신뢰할 수 없는 문자열은 textContent로 넣는다.
</div>

</div>

</div>

---

## 16. 실습 과제

**🎯 목표**

강의 상세 화면에서 요소를 선택하고 표시를 바꿔본다.

**📋 요구사항**

• `.lesson-title` 요소를 선택해 textContent로 제목을 바꾼다.<br>
• `.lesson-status` 요소에 classList로 `"is-complete"` 클래스를 추가한다.<br>
• `.lesson-item` 요소들을 모두 선택해 개수를 출력한다.

**• JavaScript: 실습 구성 예시**

```javascript
// 구성 예시: 제목 선택 후 텍스트 변경 / 상태 클래스 추가 / 전체 항목 개수 확인
```

**💡 힌트 1 — 제목 바꾸기**

**• JavaScript: 힌트 1 — 제목 바꾸기**

```javascript
const lessonTitle = document.querySelector(".lesson-title");
lessonTitle.textContent = "DOM 기본";
```

**💡 힌트 2 — 상태 클래스 추가**

**• JavaScript: 힌트 2 — 상태 클래스 추가**

```javascript
const lessonStatus = document.querySelector(".lesson-status");
lessonStatus.classList.add("is-complete");
```

**💡 힌트 3 — 전체 항목 개수 확인**

**• JavaScript: 힌트 3 — 전체 항목 개수 확인**

```javascript
const lessonItems = document.querySelectorAll(".lesson-item");
console.log(lessonItems.length);
```

**📌 정리 메모**

• querySelector/querySelectorAll은 CSS 선택자로 요소를 찾는다.<br>
• 선택 결과가 없을 수 있으므로 null 확인 습관을 들인다.<br>
• 텍스트는 textContent, 상태는 classList로 관리하는 것이 안전하다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>DOM은 브라우저가 HTML을 객체 구조로 만든 것이며, JavaScript는 <strong>document</strong>를 시작점으로 이 구조에 접근한다.</li>
    <li><strong>querySelector</strong>는 조건에 맞는 첫 번째 요소 하나를, <strong>querySelectorAll</strong>은 조건에 맞는 모든 요소를 NodeList로 반환하며, 둘 다 CSS 선택자 문법을 그대로 쓴다.</li>
    <li>선택 결과가 없으면 querySelector는 <strong>null</strong>을 반환하므로, 사용하기 전에 null인지 확인해야 한다.</li>
    <li><strong>NodeList</strong>는 배열처럼 보이지만 배열이 아니며, 배열 메서드가 필요하면 <strong>Array.from</strong>으로 변환한다.</li>
    <li><strong>textContent</strong>는 텍스트를 그대로, <strong>innerHTML</strong>은 문자열을 HTML로 해석해 넣으며, 신뢰할 수 없는 문자열에는 innerHTML을 쓰지 않는다.</li>
    <li><strong>classList</strong>로 클래스를 추가·삭제·확인할 수 있고, style 직접 변경은 속성이 많아지면 관리가 어려워질 수 있다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: querySelector 결과는 항상 요소를 반환한다?</div>
    <div class="wda-mistake-right">정답: 조건에 맞는 요소가 없으면 <strong>null</strong>을 반환하므로 사용 전 확인이 필요하다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: NodeList도 배열이라 map, filter를 바로 쓸 수 있다?</div>
    <div class="wda-mistake-right">정답: NodeList는 배열이 아니며 배열 메서드가 필요하면 <strong>Array.from</strong>으로 변환해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: innerHTML과 textContent는 같은 결과를 만든다?</div>
    <div class="wda-mistake-right">정답: innerHTML은 문자열을 <strong>HTML로 해석</strong>하고, textContent는 <strong>글자 그대로</strong> 표시한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 동적 생성과 이벤트 처리도 이 문서에서 함께 다룬다?</div>
    <div class="wda-mistake-right">정답: 요소를 새로 만들고 추가·삭제하는 방법은 <strong>3-2</strong>, 이벤트 처리는 <strong>3-3</strong> 문서에서 다룬다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 선택</div>
    <div class="wda-formula-block-body"><code>querySelector(하나)</code><br><code>querySelectorAll(전체)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 결과 확인</div>
    <div class="wda-formula-block-body"><code>null 가능성 항상 확인</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 텍스트</div>
    <div class="wda-formula-block-body"><code>textContent(안전)</code><br><code>innerHTML(주의)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · 상태 관리</div>
    <div class="wda-formula-block-body"><code>classList 우선</code><br><code>style은 제한적으로</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">querySelector와 querySelectorAll의 차이는?</div>
    <div class="wda-flip-back">querySelector는 첫 번째 요소 하나, querySelectorAll은 조건에 맞는 모든 요소를 NodeList로 반환한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">querySelector가 요소를 찾지 못하면 무엇을 반환하나?</div>
    <div class="wda-flip-back">null을 반환한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">NodeList와 배열의 차이는?</div>
    <div class="wda-flip-back">NodeList는 배열이 아니라서 map 같은 메서드가 없고, Array.from으로 변환해야 배열 메서드를 쓸 수 있다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">textContent와 innerHTML의 차이는?</div>
    <div class="wda-flip-back">textContent는 글자 그대로, innerHTML은 문자열을 실제 HTML로 해석한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">innerHTML을 조심해야 하는 이유는?</div>
    <div class="wda-flip-back">신뢰할 수 없는 문자열이 실제 태그나 스크립트로 실행될 수 있기 때문이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">classList로 무엇을 할 수 있나?</div>
    <div class="wda-flip-back">요소의 클래스를 추가, 삭제, 확인할 수 있다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">DOM 요소를 새로 만들고 이벤트를 처리하는 방법은 어디서 다루나?</div>
    <div class="wda-flip-back">요소 생성/추가/삭제는 3-2, 이벤트 처리는 3-3 문서에서 다룬다.</div>
  </div>
</div>
