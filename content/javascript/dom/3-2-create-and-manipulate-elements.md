---
title: "3-2 요소를 생성하고 조작하기"
status: "completed"
description: "createElement로 요소를 만들고 append/prepend/remove/replaceWith로 화면에 반영하는 방법을 강의 목록 카드 추가 시나리오로 정리한다."
category: "JavaScript"
section: "DOM"
tags:
  - javascript
  - dom
  - dom-manipulation
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
/* 핵심 요약 전용 복습 UI — JavaScript 1-1~1-5·2-1~2-3·4-1~4-4·DOM 3-1·3-3·async 5-1~5-5 기준과 동일. 색은 background/border/accent에만
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
  • <strong>요소 생성</strong> — createElement로 화면에 아직 없는 요소를 만들 수 있다.<br>
  • <strong>내용과 속성 채우기</strong> — textContent/classList/setAttribute/dataset으로 새 요소를 완성할 수 있다.<br>
  • <strong>화면에 반영</strong> — append/prepend/before/after로 원하는 위치에 삽입할 수 있다.<br>
  • <strong>삭제와 교체</strong> — remove/replaceWith로 필요 없는 요소를 정리할 수 있다.
</div>

---

## 1. DOM 요소를 직접 만들어야 하는 순간

이미 화면에 있는 요소를 고르는 것(3-1에서 다룬 querySelector)과 달리, 새 강의가 등록될 때는 화면에 아직 없는 요소를 직접 만들어야 한다. 이 문서에서는 강의 목록에 새 강의 카드를 추가하는 과정을 통해 요소를 만들고, 붙이고, 지우는 방법을 다룬다.

**• HTML: 빈 강의 목록**

```html
<ul id="lesson-list"></ul>
```

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">새 항목 추가</div>
    <div class="wda-fcard-dsc">새 강의가 등록되어 목록에 항목을 추가해야 할 때</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">목록 전체 그리기</div>
    <div class="wda-fcard-dsc">여러 강의 데이터를 화면에 한 번에 그려야 할 때</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">항목 제거</div>
    <div class="wda-fcard-dsc">강의가 삭제되어 화면에서도 제거해야 할 때</div>
  </div>
</div>

**📌 개념**

<div class="wda-callout wda-ci">
  이 문서의 코드는 모두 브라우저 환경에서 실행하는 DOM 코드다. 요소를 선택하는 방법은 <strong>3-1</strong>에서 다뤘으므로, 여기서는 "이미 선택된 lessonList에 새 요소를 만들어 붙이는 법"에 집중한다.
</div>

---

## 2. createElement로 요소 만들기

**• JavaScript: createElement로 요소 생성하기**

```javascript
const lessonItem = document.createElement("li");
console.log(lessonItem);
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>createElement</code>는 아직 화면에는 없는, 메모리 위에만 존재하는 새 요소를 만든다. 화면에 보이게 하려면 이후 섹션에서 다루는 <code>append</code> 같은 메서드로 기존 화면에 연결해야 한다.
</div>

---

## 3. textContent로 내용 넣기

**• JavaScript: 새 요소에 textContent로 내용 넣기**

```javascript
const lessonItem = document.createElement("li");
lessonItem.textContent = "비동기 프로그래밍";
```

**📌 개념**

<div class="wda-callout wda-ci">
  새로 만든 요소에도 3-1에서 다룬 <code>textContent</code>를 그대로 사용할 수 있다. 값을 넣을 때는 태그가 실행되지 않는 textContent가 안전하다.
</div>

---

## 4. classList로 상태 클래스 붙이기

**• JavaScript: 새 요소에 classList로 클래스 붙이기**

```javascript
const lessonItem = document.createElement("li");
lessonItem.classList.add("lesson-item");
```

**📌 개념**

<div class="wda-callout wda-ci">
  새로 만든 요소도 <code>classList</code>로 클래스를 붙일 수 있다. CSS에서 <code>.lesson-item</code> 스타일을 미리 정의해두면, 클래스만 붙여도 화면에 정해진 모양으로 보인다.
</div>

---

## 5. setAttribute와 dataset

**• JavaScript: setAttribute·dataset으로 속성 다루기**

```javascript
const lessonItem = document.createElement("li");

lessonItem.setAttribute("title", "강의 카드");
lessonItem.dataset.lessonId = "lesson-1";

console.log(lessonItem.dataset.lessonId); // lesson-1
```

**▶ setAttribute vs dataset**

| 방법 | 용도 |
|---|---|
| `setAttribute(이름, 값)` | HTML 속성을 이름으로 직접 지정 |
| `dataset.속성명` | `data-*` 속성을 camelCase로 읽고 쓰기 |

**📌 개념**

<div class="wda-callout wda-ci">
  <code>setAttribute</code>는 HTML 속성을 이름과 값으로 지정한다. <code>data-*</code> 형태의 속성은 <code>dataset</code>으로 더 짧게 다룰 수 있다. <code>dataset.lessonId</code>는 실제로 <code>data-lesson-id</code> 속성이 된다.
</div>

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">createElement</div><div class="wda-fnode-dsc">요소 생성</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">textContent</div><div class="wda-fnode-dsc">내용 넣기</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">classList / dataset</div><div class="wda-fnode-dsc">클래스·데이터 붙이기</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">append</div><div class="wda-fnode-dsc">화면에 추가</div></div>
</div>

---

## 6. append / appendChild

**• JavaScript: append로 요소 추가하기**

```javascript
const lessonList = document.querySelector("#lesson-list");
const lessonItem = document.createElement("li");

lessonItem.textContent = "비동기 프로그래밍";
lessonList.append(lessonItem);
```

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 append</div>

요소와 문자열을 여러 개 한 번에 넣을 수 있다.

**• JavaScript: append 사용 예시**

```javascript
lessonList.append(lessonItem);
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 appendChild</div>

요소 하나만 넣을 수 있는 예전 방식이다.

**• JavaScript: appendChild 사용 예시**

```javascript
lessonList.appendChild(lessonItem);
```

</div>

</div>

**📌 개념**

<div class="wda-callout wda-ci">
  <code>append</code>는 요소뿐 아니라 문자열도 넣을 수 있고, 여러 개를 한 번에 추가할 수 있다. <code>appendChild</code>는 예전부터 있던 방식으로 요소 하나만 추가할 수 있다. 새로 작성하는 코드에서는 append를 우선 고려한다.
</div>

---

## 7. prepend / before / after

**• JavaScript: prepend로 맨 앞에 추가하기**

```javascript
lessonList.prepend(lessonItem);
```

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">📥 append</div>

목록의 맨 뒤에 추가한다.

**• JavaScript: append — 맨 뒤 추가**

```javascript
lessonList.append(lessonItem);
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">📤 prepend</div>

목록의 맨 앞에 추가한다.

**• JavaScript: prepend — 맨 앞 추가**

```javascript
lessonList.prepend(lessonItem);
```

</div>

</div>

**• JavaScript: before로 형제 앞에 추가하기**

```javascript
const lessonItem = document.querySelector(".lesson-item");
const newLessonItem = document.createElement("li");
newLessonItem.textContent = "이벤트 처리";

lessonItem.before(newLessonItem);
```

**▶ append·prepend·before·after 삽입 위치**

| 메서드 | 기준 | 삽입 위치 |
|---|---|---|
| `append` | 부모의 자식 목록 | 맨 뒤 |
| `prepend` | 부모의 자식 목록 | 맨 앞 |
| `before` | 기준 요소 자신 | 바로 앞(형제) |
| `after` | 기준 요소 자신 | 바로 뒤(형제) |

**📌 개념**

<div class="wda-callout wda-ci">
  <code>before</code>/<code>after</code>는 부모의 자식 목록이 아니라, 기준이 되는 요소 <strong>자신의 앞/뒤(형제 위치)</strong>에 추가한다는 점이 append/prepend와 다르다.
</div>

---

## 8. remove / replaceWith

**• JavaScript: remove로 요소 제거하기**

```javascript
const lessonItem = document.querySelector(".lesson-item");
lessonItem.remove();
```

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">🗑️ remove</div>

요소를 그대로 제거한다.

**• JavaScript: remove 사용 예시**

```javascript
lessonItem.remove();
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">🔁 replaceWith</div>

다른 요소로 통째로 바꿔 끼운다.

**• JavaScript: replaceWith 사용 예시**

```javascript
oldLessonCard.replaceWith(newLessonCard);
```

</div>

</div>

**• JavaScript: replaceWith로 요소 교체하기**

```javascript
const oldLessonCard = document.querySelector(".lesson-card");
const newLessonCard = document.createElement("li");
newLessonCard.textContent = "모듈";
newLessonCard.classList.add("lesson-card");

oldLessonCard.replaceWith(newLessonCard);
```

**▶ remove·replaceWith·replaceChildren 동작**

| 메서드 | 동작 |
|---|---|
| `remove()` | 요소 자신을 제거 |
| `replaceWith(새요소)` | 요소를 다른 요소로 교체 |
| `replaceChildren()` | 자식 요소를 모두 비움 (13번에서 다룸) |

**📌 개념**

<div class="wda-callout wda-ci">
  <code>remove</code>는 요소 자신을 직접 호출해서 지운다. <code>replaceWith</code>는 기존 요소 자리에 새 요소를 통째로 바꿔 끼운다.
</div>

---

## 9. innerHTML로 요소 만들기

**• JavaScript: innerHTML로 요소 만들기**

```javascript
const lessonList = document.querySelector("#lesson-list");
lessonList.innerHTML = '<li class="lesson-item">모듈</li>';
```

**📌 개념**

<div class="wda-callout wda-ci">
  innerHTML에 문자열을 대입하면 그 문자열이 실제 요소로 해석되어 화면에 나타난다. createElement 없이도 요소를 만들 수 있는 방법이다.
</div>

---

## 10. createElement와 innerHTML 비교

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">🧩 createElement</div>

한 조각씩 안전하게 조립한다.

**• JavaScript: createElement로 안전하게 조립하기**

```javascript
const lessonItem = document.createElement("li");
lessonItem.textContent = lessonData.title;
lessonList.append(lessonItem);
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 innerHTML</div>

문자열을 통째로 HTML로 해석한다.

**• JavaScript: innerHTML로 문자열 통째로 넣기**

```javascript
lessonList.innerHTML +=
  `<li>${lessonData.title}</li>`;
```

</div>

</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <code>lessonData.title</code>처럼 외부에서 온 값을 innerHTML에 그대로 넣으면, 그 값 안에 실제 태그가 섞여 있을 때 그대로 실행되어 버린다. <code>createElement</code> + <code>textContent</code> 조합은 값을 항상 글자로만 다루므로 이런 위험이 없다. 확실히 신뢰할 수 있는 고정 문자열이 아니라면 createElement 방식을 우선 고려한다.
</div>

---

## 11. DocumentFragment 짧게 보기

**• JavaScript: DocumentFragment로 한 번에 붙이기**

```javascript
const fragment = document.createDocumentFragment();

const firstItem = document.createElement("li");
firstItem.textContent = "비동기 프로그래밍";

const secondItem = document.createElement("li");
secondItem.textContent = "이벤트 처리";

fragment.append(firstItem, secondItem);
lessonList.append(fragment);
```

**📌 개념**

<div class="wda-callout wda-ci">
  DocumentFragment는 여러 요소를 화면 밖 임시 공간에 먼저 모아뒀다가, 한 번에 화면에 붙일 때 쓴다. 요소를 하나씩 append할 때보다 화면 갱신 횟수를 줄일 수 있다. 자세한 성능 원리는 이 문서에서 다루지 않는다.
</div>

---

## 12. 여러 강의 카드를 반복해서 추가하기

**• JavaScript: 반복문으로 여러 카드 추가하기**

```javascript
const lessonList = document.querySelector("#lesson-list");

const lessons = [
  { id: "lesson-1", title: "비동기 프로그래밍" },
  { id: "lesson-2", title: "이벤트 처리" },
  { id: "lesson-3", title: "모듈" },
];

function createLessonCard(lessonData) {
  const lessonItem = document.createElement("li");
  lessonItem.textContent = lessonData.title;
  lessonItem.classList.add("lesson-item");
  lessonItem.dataset.lessonId = lessonData.id;
  return lessonItem;
}

lessons.forEach(lessonData => {
  const lessonItem = createLessonCard(lessonData);
  lessonList.append(lessonItem);
});
```

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">lessons</div><div class="wda-fnode-dsc">데이터 배열</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">forEach</div><div class="wda-fnode-dsc">항목마다 순회</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">createLessonCard</div><div class="wda-fnode-dsc">요소 생성</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">append</div><div class="wda-fnode-dsc">화면에 반영</div></div>
</div>

**📌 개념**

<div class="wda-callout wda-ci">
  배열의 각 항목마다 요소를 만들고 append하는 패턴은 목록 화면을 만들 때 자주 쓰인다. 카드를 만드는 로직을 함수(<code>createLessonCard</code>)로 분리하면 반복문 안이 훨씬 짧아진다.
</div>

---

## 13. 기존 목록 비우고 다시 그리기

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">createElement</div>
    <div class="wda-fcard-dsc">새 요소를 메모리에 생성</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">append / prepend</div>
    <div class="wda-fcard-dsc">원하는 위치에 화면 반영</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">remove</div>
    <div class="wda-fcard-dsc">특정 요소 하나 제거</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">replaceChildren</div>
    <div class="wda-fcard-dsc">자식 요소를 전부 비움</div>
  </div>
</div>

**• JavaScript: replaceChildren으로 목록 비우기**

```javascript
const lessonList = document.querySelector("#lesson-list");

lessonList.replaceChildren();
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>replaceChildren()</code>을 인자 없이 호출하면 자식 요소를 모두 비운다. 목록을 새 데이터로 통째로 다시 그려야 할 때, 먼저 비우고 다시 append하는 방식으로 사용한다.
</div>

**• JavaScript: 목록 비우고 다시 그리는 함수**

```javascript
function renderLessonList(lessonDataList) {
  lessonList.replaceChildren();

  if (lessonDataList.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "등록된 강의가 없습니다.";
    lessonList.append(emptyMessage);
    return;
  }

  lessonDataList.forEach(lessonData => {
    lessonList.append(createLessonCard(lessonData));
  });
}
```

---

## 14. 초보자가 자주 만나는 요소 생성/조작 실수

<div class="wda-fgrid">

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 1 · append 전에 사용</div>

**• JavaScript: append 전에 사용하는 실수**

```javascript
const lessonItem = document.createElement("li");
lessonItem.textContent = "모듈";
console.log(document.querySelector(".lesson-item"));
// null — 아직 화면에 붙이지 않았다
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> createElement로 만든 직후에는 메모리에만 있어 querySelector로 찾을 수 없다.<br>
  <strong>기억할 점:</strong> append 같은 메서드로 화면에 연결한 뒤에야 선택할 수 있다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 2 · 외부 데이터를 innerHTML에 그대로</div>

**• JavaScript: 외부 데이터를 innerHTML에 그대로 넣는 실수**

```javascript
const lessonData = { title: "<img src=x onerror=alert(1)>" };
lessonList.innerHTML += `<li>${lessonData.title}</li>`;
// 신뢰할 수 없는 값이 그대로 HTML로 해석된다
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> innerHTML은 문자열을 실제 태그로 해석하므로 위험한 값도 그대로 실행될 수 있다.<br>
  <strong>기억할 점:</strong> 외부에서 온 값은 createElement + textContent로 넣는다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 3 · appendChild에 문자열 전달</div>

**• JavaScript: appendChild에 문자열 전달하는 실수**

```javascript
// lessonList.appendChild("새 강의");
// ❌ TypeError: Failed to execute 'appendChild'
// (일부러 에러 확인용)

lessonList.append("새 강의"); // ✅ append는 문자열도 가능
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> appendChild는 반드시 노드(요소)만 받을 수 있고 문자열은 받지 않는다.<br>
  <strong>기억할 점:</strong> 문자열을 바로 넣고 싶다면 append를 사용한다.
</div>

</div>

</div>

---

## 15. 실습 과제

**🎯 목표**

강의 데이터를 받아 강의 카드를 만들고 목록에 추가한다.

**📋 요구사항**

• `createLessonCard(lessonData)`로 `li` 요소를 만들고 title, class, `data-lesson-id`를 채운다.<br>
• `appendLessonCard(lessonData)`로 만든 카드를 `lessonList`에 추가한다.<br>
• `removeLessonCard(lessonId)`로 특정 `data-lesson-id`를 가진 카드를 찾아 제거한다(선택 방법은 3-1 참고).

**• JavaScript: 실습 구성 예시**

```javascript
// 구성 예시: 카드 생성 함수 / 추가 함수 / data-lesson-id로 찾아 제거하는 함수
```

**💡 힌트 1 — createLessonCard**

**• JavaScript: 힌트 1 — createLessonCard**

```javascript
function createLessonCard(lessonData) {
  const lessonItem = document.createElement("li");
  lessonItem.textContent = lessonData.title;
  lessonItem.classList.add("lesson-item");
  lessonItem.dataset.lessonId = lessonData.id;
  return lessonItem;
}
```

**💡 힌트 2 — appendLessonCard**

**• JavaScript: 힌트 2 — appendLessonCard**

```javascript
function appendLessonCard(lessonData) {
  const lessonItem = createLessonCard(lessonData);
  lessonList.append(lessonItem);
}
```

**💡 힌트 3 — removeLessonCard**

**• JavaScript: 힌트 3 — removeLessonCard**

```javascript
function removeLessonCard(lessonId) {
  const lessonItem = document.querySelector(
    `[data-lesson-id="${lessonId}"]`
  );

  if (lessonItem !== null) {
    lessonItem.remove();
  }
}
```

**📌 정리 메모**

• createElement로 만든 요소는 append 계열로 화면에 붙여야 보인다.<br>
• 외부 데이터는 textContent로 넣고, 고정된 문자열이 아니면 innerHTML을 피한다.<br>
• 목록을 다시 그릴 때는 replaceChildren으로 먼저 비운다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>새 요소는 <strong>createElement</strong>로 메모리에 먼저 만들고, <strong>append/appendChild</strong> 같은 메서드로 화면에 연결해야 비로소 보인다.</li>
    <li><strong>textContent, classList, setAttribute, dataset</strong>은 새로 만든 요소에도 그대로 사용할 수 있다.</li>
    <li><strong>append</strong>는 요소와 문자열을 여러 개 한 번에 넣을 수 있어, 요소 하나만 받는 <strong>appendChild</strong>보다 유연하다.</li>
    <li><strong>prepend</strong>는 맨 앞, <strong>before/after</strong>는 기준 요소의 형제 위치에 삽입한다.</li>
    <li><strong>remove</strong>는 요소 자신을 직접 제거하고, <strong>replaceWith</strong>는 다른 요소로 통째로 바꿔 끼운다.</li>
    <li>외부에서 온 값은 <strong>createElement + textContent</strong>로 넣는 것이 안전하며, innerHTML은 고정된 문자열에만 제한적으로 사용한다.</li>
    <li>목록을 다시 그릴 때는 <strong>replaceChildren()</strong>으로 먼저 비우고 새 요소들을 다시 append한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: createElement로 만든 요소는 만들자마자 querySelector로 찾을 수 있다?</div>
    <div class="wda-mistake-right">정답: append 같은 메서드로 화면에 연결하기 전까지는 <strong>메모리에만 존재</strong>해 찾을 수 없다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 외부 데이터를 innerHTML에 넣어도 문제없다?</div>
    <div class="wda-mistake-right">정답: 신뢰할 수 없는 값에 실제 태그가 섞여 있으면 <strong>그대로 해석되어 실행</strong>될 수 있다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: appendChild에도 문자열을 바로 넣을 수 있다?</div>
    <div class="wda-mistake-right">정답: appendChild는 <strong>노드만</strong> 받을 수 있고, 문자열은 <strong>append</strong>를 써야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 목록을 다시 그릴 때 기존 요소를 하나씩 remove해야 한다?</div>
    <div class="wda-mistake-right">정답: <strong>replaceChildren()</strong>을 인자 없이 호출하면 자식을 한 번에 모두 비울 수 있다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 생성-삽입</div>
    <div class="wda-formula-block-body"><code>createElement(메모리)</code><br><code>→ append(화면)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 삽입 위치</div>
    <div class="wda-formula-block-body"><code>append(뒤) / prepend(앞)</code><br><code>before·after(형제 위치)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 삭제/교체</div>
    <div class="wda-formula-block-body"><code>remove(제거)</code><br><code>replaceWith(교체)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · 안전한 내용</div>
    <div class="wda-formula-block-body"><code>외부 값 = textContent</code><br><code>고정 문자열만 = innerHTML</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">createElement로 만든 요소가 화면에 보이려면?</div>
    <div class="wda-flip-back">append 같은 메서드로 기존 화면 요소에 연결해야 한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">append와 appendChild의 차이는?</div>
    <div class="wda-flip-back">append는 요소·문자열을 여러 개 한 번에 넣을 수 있고, appendChild는 요소 하나만 받는다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">before/after는 append/prepend와 무엇이 다른가?</div>
    <div class="wda-flip-back">before/after는 기준 요소의 형제 위치에, append/prepend는 부모의 자식 목록 앞/뒤에 삽입한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">remove와 replaceWith의 차이는?</div>
    <div class="wda-flip-back">remove는 요소를 제거하고, replaceWith는 다른 요소로 통째로 바꾼다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">createElement와 innerHTML 중 외부 데이터에 더 안전한 방식은?</div>
    <div class="wda-flip-back">createElement + textContent 조합이 값을 항상 글자로만 다뤄 더 안전하다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">DocumentFragment는 언제 쓰나?</div>
    <div class="wda-flip-back">여러 요소를 화면 밖에서 먼저 모아뒀다가 한 번에 붙이고 싶을 때 쓴다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">목록을 통째로 다시 그리려면?</div>
    <div class="wda-flip-back">replaceChildren()으로 비운 뒤 새 요소들을 다시 append한다.</div>
  </div>
</div>
