---
title: "2-4 고차 함수로 배열 다루기"
status: "completed"
description: "강의 목록 배열을 소재로 map·filter·find·some·every·reduce·forEach·sort의 반환값과 원본 변경 여부를 정리하고, 상황에 맞는 메서드를 고르는 기준을 익힌다."
category: "JavaScript"
section: "Arrays & Objects"
tags:
  - javascript
  - higher-order-function
  - array-methods
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
table.wda-mtable{width:100%;border-collapse:collapse;font-size:.83rem;margin:.8rem 0 1.4rem}
table.wda-mtable th,table.wda-mtable td{border:1px solid rgba(128,128,128,.2);padding:8px 12px;vertical-align:top;line-height:1.65}
table.wda-mtable th{background:rgba(139,92,246,.08);font-weight:700;text-align:left;white-space:nowrap}
table.wda-mtable tr:nth-child(even) td{background:rgba(128,128,128,.025)}
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

<div class="wda-goal" style="position:relative;overflow:visible;">
  • <strong>고차 배열 메서드</strong> — 콜백 함수를 받아 배열을 처리하는 map·filter·find·some·every·reduce·forEach·sort의 동작을 이해합니다.<br>
  • <strong>반환값 구분</strong> — 각 메서드가 무엇을 돌려주는지(새 배열/값 하나/불리언/undefined) 정확히 구분합니다.<br>
  • <strong>원본 보호</strong> — 어떤 메서드가 원본 배열을 바꾸는지 파악하고 안전하게 다루는 습관을 익힙니다.<br>
  • <strong>메서드 선택</strong> — 상황에 맞는 메서드를 고르는 기준을 세우고, 필요할 때 체이닝으로 연결합니다.
</div>

---

## 1. 고차 배열 메서드가 필요한 이유

이 문서는 강의 목록 배열 하나를 계속 사용합니다.

**• JavaScript: 예제로 쓸 강의 목록 배열**

```jsx
const lessonList = [
  { id: 1, title: '변수와 자료형', minutes: 30, completed: true },
  { id: 2, title: '조건문과 반복문', minutes: 40, completed: true },
  { id: 3, title: '함수 기초', minutes: 35, completed: false },
  { id: 4, title: '배열과 객체', minutes: 50, completed: true },
  { id: 5, title: '비동기 프로그래밍', minutes: 60, completed: false },
];
```

화면에는 제목만 보여주고 싶다고 해봅시다. `for` 반복문으로도 할 수 있습니다.

**• JavaScript: for 반복문으로 제목만 추출하기**

```jsx
const titles = [];
for (let i = 0; i < lessonList.length; i++) {
  titles.push(lessonList[i].title);
}
console.log(titles);
// ['변수와 자료형', '조건문과 반복문', '함수 기초', '배열과 객체', '비동기 프로그래밍']
```

완료된 강의만 골라내려면 또 비슷한 반복문을 새로 써야 합니다.

**• JavaScript: for 반복문으로 완료된 강의 골라내기**

```jsx
const done = [];
for (let i = 0; i < lessonList.length; i++) {
  if (lessonList[i].completed) {
    done.push(lessonList[i]);
  }
}
```

두 코드 모두 "빈 배열을 만들고 → 반복하면서 → 조건대로 채워 넣는다"는 틀이 똑같습니다.

이렇게 **반복되는 틀은 고정하고, 매번 달라지는 부분(조건이나 변환 방법)만 함수로 넘겨받아 처리하는 메서드**가 바로 이 문서에서 다룰 고차 배열 메서드입니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">for 반복문</div>

**• JavaScript: for로 제목 추출하기**

```jsx
const titles = [];
for (let i = 0; i < lessonList.length; i++) {
  titles.push(lessonList[i].title);
}
```

반복 틀을 직접 작성해야 함
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">고차 배열 메서드</div>

**• JavaScript: map으로 제목 추출하기**

```jsx
const titles = lessonList.map(
  lesson => lesson.title
);
```

반복 틀은 메서드가 처리, 변환 방법만 전달
  </div>
</div>

---

## 2. 콜백 함수를 받는 배열 메서드

`map`, `filter`, `find`, `some`, `every`, `reduce`, `forEach`는 모두 **콜백 함수를 인자로 받는 배열 메서드**입니다. 배열의 요소 하나마다 이 콜백을 실행하고, 콜백이 반환한 값을 이용해 결과를 만듭니다.

**• JavaScript: map에 콜백 함수 전달하기**

```jsx
lessonList.map(function (lesson) {
  return lesson.title;
});

// 화살표 함수로 쓰면 더 짧아집니다
lessonList.map(lesson => lesson.title);
```

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">함수를 인자로 전달</div>
    <div class="wda-fcard-dsc">메서드를 호출할 때 처리 방법을 함수로 넘깁니다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">요소마다 한 번씩 실행</div>
    <div class="wda-fcard-dsc">배열 길이만큼 콜백이 자동으로 반복 호출됩니다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">콜백의 반환값이 핵심</div>
    <div class="wda-fcard-dsc">콜백이 무엇을 반환하느냐에 따라 최종 결과가 달라집니다.</div>
  </div>
</div>

이렇게 **함수를 인자로 받는 함수**를 고차 함수(Higher-Order Function)라고 부르고, 배열의 `map`·`filter`·`reduce` 등은 이 개념을 활용한 대표적인 메서드입니다.

**💡 설명**

<div class="wda-callout wda-ci">
  콜백은 보통 <code>(element, index, array)</code> 세 값을 받을 수 있습니다. 지금은 대부분 <code>element</code> 하나만 사용해도 충분합니다.
</div>

---

## 3. for 반복문과 고차 배열 메서드

`for` 반복문 대신 고차 배열 메서드를 쓰면 얻는 것은 크게 두 가지입니다.

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">목적이 코드에 드러남</div>
    <div class="wda-fcard-dsc"><code>.filter(...)</code>만 봐도 "걸러낸다"는 의도가 바로 보입니다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">반복문 실수를 줄임</div>
    <div class="wda-fcard-dsc">인덱스를 잘못 세거나 조건을 빠뜨리는 실수가 줄어듭니다.</div>
  </div>
</div>

다만 메서드마다 **무엇을 반환하는지**, **원본 배열을 바꾸는지**가 다릅니다. 이 두 가지를 기준으로 하나씩 정리해 보겠습니다.

---

## 4. map: 같은 개수의 새 배열 만들기

`map`은 배열의 모든 요소를 변환해서, **원본과 같은 개수의 새 배열**을 반환합니다.

**• JavaScript: map으로 새 배열 만들기**

```jsx
const lessonTitles = lessonList.map(lesson => lesson.title);

console.log(lessonTitles);
// ['변수와 자료형', '조건문과 반복문', '함수 기초', '배열과 객체', '비동기 프로그래밍']

console.log(lessonTitles.length === lessonList.length); // true
```

문자열이 아니라 화면에 바로 쓸 문장을 만들 수도 있습니다.

**• JavaScript: map으로 화면용 문장 만들기**

```jsx
const lessonLabels = lessonList.map(
  lesson => `${lesson.title} (${lesson.minutes}분)`
);

console.log(lessonLabels[0]); // '변수와 자료형 (30분)'
```

**💡 설명**

<div class="wda-callout wda-ci">
  <strong>map은 새 배열을 반환합니다.</strong> 콜백이 반환한 값들을 순서대로 모아 새 배열을 만들 뿐, <code>lessonList</code> 자체는 그대로 남아 있습니다.
</div>

---

## 5. filter: 조건을 통과한 항목만 남기기

`filter`는 콜백이 `true`를 반환한 요소만 모아 **새 배열**로 돌려줍니다. 원본과 개수가 같을 수도, 더 적을 수도 있습니다.

**• JavaScript: filter로 완료된 강의만 남기기**

```jsx
const completedLessons = lessonList.filter(lesson => lesson.completed);

console.log(completedLessons.length); // 3
console.log(completedLessons.map(lesson => lesson.title));
// ['변수와 자료형', '조건문과 반복문', '배열과 객체']
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">map</div>
    콜백 반환값을 그대로 모음 → 결과 개수 = 원본 개수
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">filter</div>
    콜백이 true인 요소만 모음 → 결과 개수 ≤ 원본 개수
  </div>
</div>

---

## 6. find: 첫 번째 항목 하나 찾기

`find`는 조건을 만족하는 **첫 번째 요소 하나**를 반환합니다. 찾으면 그 즉시 나머지 요소는 더 이상 검사하지 않습니다.

**• JavaScript: find로 요소 하나 찾기**

```jsx
const targetLesson = lessonList.find(lesson => lesson.id === 3);
console.log(targetLesson);
// { id: 3, title: '함수 기초', minutes: 35, completed: false }

const missingLesson = lessonList.find(lesson => lesson.id === 999);
console.log(missingLesson); // undefined
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">find</div>
    조건에 맞는 요소 1개(또는 <code>undefined</code>)를 반환
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">filter</div>
    조건에 맞는 요소를 전부 모아 배열로 반환
  </div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  "ID로 강의 하나 찾기"처럼 결과가 하나뿐이라고 확신할 수 있는 경우에는 <code>filter</code>가 아니라 <code>find</code>를 사용하세요. 찾는 즉시 멈추기 때문에 배열이 클수록 더 유리합니다.
</div>

---

## 7. some / every: 조건을 만족하는지 확인하기

`some`은 **하나라도** 조건을 만족하면, `every`는 **모두** 조건을 만족해야 `true`를 반환합니다. 둘 다 결과가 정해지는 순간 검사를 멈춥니다.

**• JavaScript: some·every로 조건 검사하기**

```jsx
const hasUnfinishedLesson = lessonList.some(lesson => !lesson.completed);
console.log(hasUnfinishedLesson); // true (id 3, 5가 미완료)

const allLessonsCompleted = lessonList.every(lesson => lesson.completed);
console.log(allLessonsCompleted); // false (미완료 강의가 있음)
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">some</div>
    하나라도 만족하면 true (OR 조건)
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">every</div>
    모두 만족해야 true (AND 조건)
  </div>
</div>

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">some 활용 예</div>
    <div class="wda-fcard-dsc">미완료 강의가 하나라도 있으면 "이어보기" 버튼을 보여줄 때.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">every 활용 예</div>
    <div class="wda-fcard-dsc">모든 강의를 완료했을 때만 수료증 발급 버튼을 활성화할 때.</div>
  </div>
</div>

---

## 8. reduce: 배열을 하나의 값으로 누적하기

`reduce`는 배열의 모든 요소를 순서대로 돌면서 **누적값 하나**를 만들어 반환합니다.

**• JavaScript: reduce로 학습 시간 합산하기**

```jsx
const totalStudyMinutes = lessonList.reduce(
  (total, lesson) => total + lesson.minutes,
  0
);

console.log(totalStudyMinutes); // 215
```

콜백은 `(누적값, 현재 요소)` 순서로 받고, 두 번째 인자인 `0`은 **초기값**입니다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  초기값을 생략하면 배열의 첫 번째 요소가 초기값으로 쓰입니다. 이때 배열이 <strong>비어 있으면 에러</strong>가 발생하므로, 초기값은 항상 명시하는 습관을 들이세요.
</div>

**• JavaScript: 초기값 없는 reduce — 에러 확인용**

```jsx
// 일부러 에러 확인용: 빈 배열 + 초기값 없음
try {
  const emptyTotal = [].reduce((total, n) => total + n);
} catch (error) {
  console.log(error instanceof TypeError); // true
}
```

**💡 설명**

<div class="wda-callout wda-ci">
  reduce는 합계뿐 아니라 객체나 배열 같은 다른 형태의 값도 만들 수 있는 유연한 메서드입니다. 다만 처음에는 <strong>합계·평균처럼 값 하나를 누적하는 패턴</strong>부터 익히고, 복잡한 활용은 필요할 때 하나씩 늘려가는 것으로 충분합니다.
</div>

---

## 9. forEach: 반복 실행만 할 때 사용하기

`forEach`는 배열의 요소마다 콜백을 실행하지만, **결과를 모으지 않고 항상 `undefined`를 반환**합니다.

**• JavaScript: forEach로 반복 실행하기**

```jsx
lessonList.forEach(lesson => console.log(lesson.title));
// 변수와 자료형
// 조건문과 반복문
// 함수 기초
// 배열과 객체
// 비동기 프로그래밍

const result = lessonList.forEach(lesson => lesson.title);
console.log(result); // undefined
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <strong>forEach는 반환값을 모으는 용도가 아닙니다.</strong> 새 배열이 필요하면 <code>map</code>, 조건에 맞는 값만 필요하면 <code>filter</code>를 사용하세요.
</div>

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">forEach</div>
    화면 출력처럼 결과를 남기지 않는 반복 실행 → 반환값 없음
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">map</div>
    변환한 값을 모아야 할 때 → 새 배열 반환
  </div>
</div>

---

## 10. sort: 정렬과 원본 배열 변경 주의

`sort`는 지금까지 살펴본 메서드와 다르게 **원본 배열을 직접 바꿉니다.**

**• JavaScript: sort 기본 동작 확인하기**

```jsx
const numbers = [10, 5, 20, 1];

numbers.sort();
console.log(numbers); // [1, 10, 20, 5]
// 기본 정렬은 값을 문자열로 바꿔 비교하므로 숫자 크기와 다르게 정렬됩니다.

numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 5, 10, 20]
```

강의 목록을 학습 시간이 짧은 순서로 정렬하고 싶다면, 원본을 그대로 두기 위해 **복사본을 만든 뒤 정렬**합니다.

**• JavaScript: 복사본을 만들어 정렬하기**

```jsx
const sortedLessons = [...lessonList].sort((a, b) => a.minutes - b.minutes);

console.log(sortedLessons.map(lesson => lesson.title));
// ['변수와 자료형', '함수 기초', '조건문과 반복문', '배열과 객체', '비동기 프로그래밍']

console.log(lessonList.map(lesson => lesson.title));
// ['변수와 자료형', '조건문과 반복문', '함수 기초', '배열과 객체', '비동기 프로그래밍']
// lessonList 순서는 그대로 유지됨
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <strong>sort는 원본 배열을 바꿀 수 있습니다.</strong> <code>[...lessonList]</code>로 복사본을 만든 뒤 정렬하면 원본 순서를 지킬 수 있습니다.
</div>

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">sort 직접 사용</div>

**• JavaScript: sort로 원본 직접 정렬하기**

```jsx
lessonList.sort(
  (a, b) => a.minutes - b.minutes
);
```

lessonList 자체의 순서가 바뀜
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">복사 후 sort</div>

**• JavaScript: 복사 후 sort로 원본 보호하기**

```jsx
const sortedLessons = [...lessonList].sort(
  (a, b) => a.minutes - b.minutes
);
```

lessonList는 그대로, 새 배열만 정렬됨
  </div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  최신 JavaScript에는 원본을 바꾸지 않는 <code>toSorted()</code>도 있습니다. <code>lessonList.toSorted((a, b) =&gt; a.minutes - b.minutes)</code>처럼 쓸 수 있지만, 실행 환경에 따라 지원 여부가 다를 수 있으니 먼저 <code>[...arr].sort(...)</code> 패턴에 익숙해지는 것을 권합니다.
</div>

---

## 11. 메서드 선택 기준

**▶ 메서드별 반환값·원본 변경 여부**

<table class="wda-mtable">
  <tr>
    <th>메서드</th>
    <th>반환값</th>
    <th>원본 변경</th>
  </tr>
  <tr>
    <td><strong>map</strong></td>
    <td>새 배열(개수 동일)</td>
    <td>X</td>
  </tr>
  <tr>
    <td><strong>filter</strong></td>
    <td>새 배열(개수 ≤ 원본)</td>
    <td>X</td>
  </tr>
  <tr>
    <td><strong>find</strong></td>
    <td>요소 1개 또는 undefined</td>
    <td>X</td>
  </tr>
  <tr>
    <td><strong>some / every</strong></td>
    <td>Boolean</td>
    <td>X</td>
  </tr>
  <tr>
    <td><strong>reduce</strong></td>
    <td>누적된 값 하나</td>
    <td>X</td>
  </tr>
  <tr>
    <td><strong>forEach</strong></td>
    <td>undefined</td>
    <td>X</td>
  </tr>
  <tr>
    <td><strong>sort</strong></td>
    <td>정렬된 배열(원본과 같은 배열)</td>
    <td>O</td>
  </tr>
</table>

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">개수를 유지한 채 변환</div>
    <div class="wda-fcard-dsc">→ map</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">조건에 맞는 것만 남기기</div>
    <div class="wda-fcard-dsc">→ filter</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">하나만 찾기</div>
    <div class="wda-fcard-dsc">→ find</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">예/아니오만 필요</div>
    <div class="wda-fcard-dsc">→ some / every</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">값 하나로 합치기</div>
    <div class="wda-fcard-dsc">→ reduce</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">결과 없이 반복만</div>
    <div class="wda-fcard-dsc">→ forEach</div>
  </div>
</div>

---

## 12. 메서드 체이닝

앞의 메서드들은 각자 값을 반환하므로, 그 반환값에 다시 메서드를 이어 붙일 수 있습니다.

**• JavaScript: filter·map·reduce 체이닝하기**

```jsx
const completedTitles = lessonList
  .filter(lesson => lesson.completed) // 완료된 강의만 (새 배열)
  .map(lesson => lesson.title);       // 제목만 추출 (새 배열)

console.log(completedTitles);
// ['변수와 자료형', '조건문과 반복문', '배열과 객체']

const completedMinutes = lessonList
  .filter(lesson => lesson.completed)
  .reduce((total, lesson) => total + lesson.minutes, 0);

console.log(completedMinutes); // 120
```

**💡 설명**

<div class="wda-callout wda-ci">
  체이닝이 가능한 이유는 단순합니다. <code>filter</code>와 <code>map</code>이 <strong>배열을 반환</strong>하기 때문에 그 배열에 다시 <code>.</code>을 찍어 다음 메서드를 부를 수 있는 것입니다. 반면 <code>reduce</code>처럼 배열이 아닌 값을 반환하면, 그 뒤에는 더 이상 배열 메서드를 이어 붙일 수 없습니다.
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  체이닝을 과하게 길게 쓰면 오히려 읽기 어려워집니다. 한 줄에 메서드 두세 개 정도로 유지하고, 더 길어질 것 같다면 중간 변수로 나누는 것이 좋습니다.
</div>

---

## 13. 원본 배열을 지키는 습관

`map`, `filter`, `find`, `some`, `every`, `reduce`는 원본을 바꾸지 않지만, `sort`나 `push`, `splice` 같은 메서드는 원본을 직접 바꿉니다.

**• JavaScript: 원본을 바꾸는 방식 vs 지키는 방식**

```jsx
// 원본을 바꾸는 방식
const lessonListCopy = lessonList;
lessonListCopy.push({ id: 6, title: '테스트 코드', minutes: 45, completed: false });
console.log(lessonList.length); // 6 (원본도 함께 바뀜)

// 원본을 지키는 방식
const nextLessonList = [...lessonList, { id: 6, title: '테스트 코드', minutes: 45, completed: false }];
console.log(lessonList.length);     // 5 (원본 그대로)
console.log(nextLessonList.length); // 6 (새 배열에만 추가됨)
```

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  원본 배열을 그대로 유지하고 새 배열을 만들어 쓰는 습관을 들이면, 나중에 같은 데이터를 여러 곳에서 함께 사용할 때 예상치 못한 변경으로 인한 버그를 줄일 수 있습니다.
</div>

---

## 14. 초보자가 자주 만나는 고차 배열 메서드 실수

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">forEach 뒤에 .map() 잇기</div>
    <div class="wda-fcard-dsc">forEach는 undefined를 반환하므로 뒤에 배열 메서드를 이어 붙일 수 없습니다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">reduce 초기값 생략</div>
    <div class="wda-fcard-dsc">빈 배열에 초기값 없이 reduce를 쓰면 에러가 발생합니다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">sort로 원본이 바뀌는 줄 모름</div>
    <div class="wda-fcard-dsc">복사 없이 sort를 쓰면 원본 배열의 순서가 그대로 바뀝니다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">find와 filter 결과 개수 착각</div>
    <div class="wda-fcard-dsc">find는 요소 1개(또는 undefined), filter는 배열이라는 점을 헷갈리기 쉽습니다.</div>
  </div>
</div>

---

## 15. 실습 과제

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <strong>🎯 목표</strong><br>
  lessonList를 여러 고차 배열 메서드로 가공해 lessonSummary 객체를 만들어 보세요.
</div>

**📋 요구사항**

- `lessonList`에서 강의 제목만 모은 배열을 만드세요.
- 완료된 강의 개수를 구하세요.
- 전체 학습 시간(분)의 합계를 구하세요.
- 위 세 값을 담은 `lessonSummary` 객체를 만드세요.

**• JavaScript: 실습 구성 예시 — lessonSummary**

```jsx
const lessonList = [
  { id: 1, title: '변수와 자료형', minutes: 30, completed: true },
  { id: 2, title: '조건문과 반복문', minutes: 40, completed: true },
  { id: 3, title: '함수 기초', minutes: 35, completed: false },
  { id: 4, title: '배열과 객체', minutes: 50, completed: true },
  { id: 5, title: '비동기 프로그래밍', minutes: 60, completed: false },
];

// TODO: lessonSummary를 완성하세요
const lessonSummary = {
  titles: null,
  completedCount: null,
  totalMinutes: null,
};
```

**💡 힌트 1**

제목 목록은 개수를 유지한 채 값만 바꾸는 작업입니다. 어떤 메서드가 어울릴까요?

**💡 힌트 2**

완료 개수는 먼저 완료된 강의만 걸러낸 뒤, 그 결과의 `length`를 세는 방법을 생각해 보세요.

**💡 힌트 3**

전체 학습 시간은 배열 전체를 값 하나로 합치는 메서드로 구할 수 있습니다. 초기값을 빠뜨리지 마세요.

**📌 정리 메모**

<div class="wda-callout wda-ci">
  이 실습에서 사용한 메서드들을 다양한 데이터로 더 연습해 보고 싶다면 <code>appendix-higher-order-array-practice.md</code> 문서에서 이어집니다.
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><strong>map</strong>은 콜백 반환값을 모아 <strong>원본과 같은 개수의 새 배열</strong>을 반환한다.</li>
    <li><strong>filter</strong>는 조건을 통과한 요소만 모아 <strong>새 배열</strong>을 반환한다.</li>
    <li><strong>find</strong>는 조건에 맞는 <strong>첫 요소 하나</strong>(없으면 undefined)를 반환한다.</li>
    <li><strong>some</strong>은 하나라도 만족(OR), <strong>every</strong>는 모두 만족(AND)해야 true다.</li>
    <li><strong>reduce</strong>는 배열을 <strong>값 하나</strong>로 누적하며, 초기값을 반드시 넣어야 안전하다.</li>
    <li><strong>forEach</strong>는 반환값이 없고, <strong>sort</strong>는 원본 배열을 직접 바꾼다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: forEach도 map처럼 결과를 반환한다?</div>
    <div class="wda-mistake-right">정답: forEach는 항상 <strong>undefined</strong>를 반환하므로 뒤에 다른 배열 메서드를 이어 붙일 수 없다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: find와 filter는 둘 다 배열을 반환한다?</div>
    <div class="wda-mistake-right">정답: find는 <strong>요소 1개(또는 undefined)</strong>를, filter는 조건에 맞는 요소를 전부 모은 <strong>새 배열</strong>을 반환한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: reduce의 초기값은 생략해도 항상 안전하다?</div>
    <div class="wda-mistake-right">정답: 생략하면 첫 요소가 초기값이 되는데, 배열이 <strong>비어 있으면 에러</strong>가 난다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: sort()도 map/filter처럼 원본을 건드리지 않는다?</div>
    <div class="wda-mistake-right">정답: sort()는 <strong>원본 배열을 직접 변경</strong>한다. 원본을 지키려면 <code>[...arr].sort(...)</code>로 복사 후 정렬한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: some과 every는 배열을 항상 끝까지 검사한다?</div>
    <div class="wda-mistake-right">정답: 둘 다 결과가 정해지는 순간 <strong>즉시 검사를 멈춘다</strong>.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 반환값 구분</div>
    <div class="wda-formula-block-body">
      <code>forEach = X, map/filter = 새 배열</code><br>
      <code>find = 요소/undefined, reduce = 값 하나</code><br>
      <code>some/every = Boolean</code>
    </div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 원본 변경 여부</div>
    <div class="wda-formula-block-body">
      <code>map/filter/find/some/every/reduce/forEach = 원본 유지</code><br>
      <code>sort = 원본 변경</code>
    </div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 숫자 정렬</div>
    <div class="wda-formula-block-body"><code>[...arr].sort((a, b) =&gt; a - b)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · 체이닝 규칙</div>
    <div class="wda-formula-block-body"><code>배열을 반환하는 메서드끼리만 이어 붙일 수 있다</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">forEach 뒤에 .map()을 이어붙이면?</div>
    <div class="wda-flip-back">에러가 난다. forEach는 undefined를 반환해 체이닝할 수 없다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">map과 filter의 공통점은?</div>
    <div class="wda-flip-back">둘 다 원본을 바꾸지 않고 새로운 배열을 반환한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">reduce의 콜백 매개변수 순서는?</div>
    <div class="wda-flip-back">(누적값, 현재 요소) 순서이며, 두 번째 인자로 초기값을 전달한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">find가 filter보다 유리한 경우는?</div>
    <div class="wda-flip-back">결과가 하나뿐일 때. find는 찾는 즉시 멈춰 성능이 좋다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">some과 every의 차이는?</div>
    <div class="wda-flip-back">some은 하나라도 만족하면 true(OR), every는 모두 만족해야 true(AND)다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">sort()로 숫자를 정렬할 때 주의점은?</div>
    <div class="wda-flip-back">기본은 문자열 비교이므로 (a, b) => a - b 비교 함수가 필요하고, 원본을 직접 변경한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">원본 배열을 지키면서 정렬하는 방법은?</div>
    <div class="wda-flip-back">[...arr].sort(...)처럼 복사본을 만든 뒤 정렬한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">메서드 체이닝이 가능한 조건은?</div>
    <div class="wda-flip-back">앞 메서드가 배열을 반환해야 그 뒤에 다른 배열 메서드를 이어 붙일 수 있다.</div>
  </div>
</div>
