---
title: "부록: 고차 배열 메서드 실습"
status: "completed"
description: "map·filter·find·some·every·reduce를 실제 데이터에 적용해보는 실습 전용 부록이다."
category: "JavaScript"
section: "Arrays & Objects"
tags:
  - javascript
  - arrays
  - practice
---

<style>
.wda-callout{border-radius:10px;padding:12px 14px;margin:.8rem 0 1.1rem;border-left:3px solid;font-size:.9rem;line-height:1.75}
.wda-ci{background:rgba(139,92,246,.06);border-color:#8b5cf6}
.wda-cw{background:rgba(245,158,11,.07);border-color:#f59e0b}
.wda-cs{background:rgba(34,197,94,.05);border-color:#22c55e}
.wda-cb{background:rgba(59,130,246,.06);border-color:#3b82f6}
.wda-clabel{font-size:.7rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px;display:block}
.wda-ci .wda-clabel{color:#8b5cf6}
.wda-cw .wda-clabel{color:#f59e0b}
.wda-cs .wda-clabel{color:#22c55e}
.wda-cb .wda-clabel{color:#3b82f6}
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

**📎 부록(Appendix)**

<div class="wda-callout wda-ci">
  • 이 부록은 2-2(배열)에서 배운 map/filter/find/some/every/reduce를 실제 데이터에 적용해보는 실습 전용 자료다.<br>
  • 메서드 정의를 다시 설명하지 않고, 상황에 맞는 메서드를 고르고 사용하는 연습에 집중한다.
</div>

---

## 1. 이 부록에서 연습할 것

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">메서드 선택</div>
    <div class="wda-fcard-dsc">상황에 맞는 메서드를 스스로 고르는 연습이다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">입력 → 처리 → 출력</div>
    <div class="wda-fcard-dsc">데이터가 어떤 모양에서 어떤 모양으로 바뀌는지 따라간다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">실수 예방</div>
    <div class="wda-fcard-dsc">콜백 return, reduce 초기값 같은 실수를 미리 연습한다.</div>
  </div>
</div>

---

## 2. 실습 데이터 살펴보기

모든 문제는 아래 강의 수강 기록 하나를 재사용한다.

**• JavaScript: 실습에 재사용할 강의 수강 기록**

```javascript
const lessonRecords = [
  { title: "변수와 스코프", level: "입문", minutes: 40, score: 92, completed: true },
  { title: "배열 다루기", level: "입문", minutes: 55, score: 78, completed: true },
  { title: "클로저 이해하기", level: "심화", minutes: 60, score: 65, completed: false },
  { title: "비동기 프로그래밍", level: "심화", minutes: 70, score: 88, completed: true },
  { title: "타입스크립트 기초", level: "입문", minutes: 45, score: 0, completed: false },
];
```

**▶ lessonRecords 필드 설명**

| 필드 | 의미 |
|---|---|
| `title` | 강의 제목 |
| `level` | 난이도("입문"/"심화") |
| `minutes` | 학습 시간(분) |
| `score` | 퀴즈 점수(0이면 아직 응시하지 않음) |
| `completed` | 완료 여부 |

---

## 3. 문제를 풀기 전 생각 순서

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">입력 확인</div><div class="wda-fnode-dsc">어떤 배열, 어떤 필드를 다루는가.</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">결과 모양 정하기</div><div class="wda-fnode-dsc">배열인가, 값 하나인가, 참/거짓인가.</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">메서드 선택</div><div class="wda-fnode-dsc">결과 모양에 맞는 메서드를 고른다.</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">콜백 작성</div><div class="wda-fnode-dsc">조건식 또는 변환식을 채운다.</div></div>
</div>

---

### 문제 1. 제목만 모으기

**🎯 목표**

<div class="wda-callout wda-cs">
map으로 배열의 각 항목에서 필요한 값 하나만 뽑아 새 배열을 만드는 연습이다.
</div>

**📋 요구사항**

- 입력: `lessonRecords`
- 결과: 강의 제목만 담은 배열 `lessonTitles`
- 사용 메서드: `map`

**• JavaScript: 문제 1 — 요구사항 코드**

```javascript
const lessonTitles = lessonRecords.map(/* ... */);
```

**✅ 확인할 결과**

**• JavaScript: 문제 1 — 확인할 결과**

```javascript
console.log(lessonTitles);
// ["변수와 스코프", "배열 다루기", "클로저 이해하기", "비동기 프로그래밍", "타입스크립트 기초"]
```

**🧠 풀이 방향**

<div class="wda-callout wda-cb">
각 항목(lesson)에서 title 값 하나만 꺼내 돌려주면 된다.
</div>

**📝 정답 예시**

**• JavaScript: 문제 1 — 정답 예시**

```javascript
const lessonTitles = lessonRecords.map((lesson) => lesson.title);
```

---

### 문제 2. 표시용 문장 만들기

**🎯 목표**

<div class="wda-callout wda-cs">
map으로 여러 필드를 조합해 화면에 보여줄 문자열을 만드는 연습이다.
</div>

**📋 요구사항**

- 결과: `"제목 (레벨) - 완료/미완료"` 형태의 문자열 배열 `displayList`
- 사용 메서드: `map`
- 주의할 점: 콜백을 중괄호 블록으로 쓸 경우 `return`을 꼭 써야 한다

**• JavaScript: 문제 2 — 요구사항 코드**

```javascript
const displayList = lessonRecords.map((lesson) => {
  // 여기에 코드를 작성하세요
});
```

**✅ 확인할 결과**

**• JavaScript: 문제 2 — 확인할 결과**

```javascript
console.log(displayList);
// [
//   "변수와 스코프 (입문) - 완료",
//   "배열 다루기 (입문) - 완료",
//   "클로저 이해하기 (심화) - 미완료",
//   "비동기 프로그래밍 (심화) - 완료",
//   "타입스크립트 기초 (입문) - 미완료"
// ]
```

**📝 정답 예시**

**• JavaScript: 문제 2 — 정답 예시**

```javascript
const displayList = lessonRecords.map((lesson) => {
  const status = lesson.completed ? "완료" : "미완료";
  return `${lesson.title} (${lesson.level}) - ${status}`;
});
```

---

### 문제 3. 완료된 강의만 고르기

**🎯 목표**

<div class="wda-callout wda-cs">
filter로 조건에 맞는 항목만 남기는 연습이다.
</div>

**📋 요구사항**

- 결과: `completed`가 true인 강의만 담은 배열 `completedLessons`
- 사용 메서드: `filter`
- 주의할 점: 원본 `lessonRecords`는 바뀌지 않는다

**• JavaScript: 문제 3 — 요구사항 코드**

```javascript
const completedLessons = lessonRecords.filter(/* ... */);
```

**✅ 확인할 결과**

**• JavaScript: 문제 3 — 확인할 결과**

```javascript
console.log(completedLessons.length);
// 3

console.log(lessonRecords.length);
// 5 — 원본은 그대로다
```

**📝 정답 예시**

**• JavaScript: 문제 3 — 정답 예시**

```javascript
const completedLessons = lessonRecords.filter((lesson) => lesson.completed);
```

---

### 문제 4. 조건 여러 개 적용하기

**🎯 목표**

<div class="wda-callout wda-cs">
filter 콜백 안에서 조건을 &&로 조합하는 연습이다.
</div>

**📋 요구사항**

- 결과: 입문 레벨이면서 점수가 80점 이상인 강의 `highScoreLessons`
- 사용 메서드: `filter`

**• JavaScript: 문제 4 — 요구사항 코드**

```javascript
const highScoreLessons = lessonRecords.filter(/* ... */);
```

**✅ 확인할 결과**

**• JavaScript: 문제 4 — 확인할 결과**

```javascript
console.log(highScoreLessons.map((lesson) => lesson.title));
// ["변수와 스코프"]
```

**🧠 풀이 방향**

<div class="wda-callout wda-cb">
두 조건을 &&로 연결한 하나의 boolean 식을 콜백이 반환하면 된다.
</div>

**📝 정답 예시**

**• JavaScript: 문제 4 — 정답 예시**

```javascript
const highScoreLessons = lessonRecords.filter(
  (lesson) => lesson.level === "입문" && lesson.score >= 80
);
```

---

### 문제 5. 아직 안 끝낸 강의 찾기

**🎯 목표**

<div class="wda-callout wda-cs">
find로 조건에 맞는 첫 번째 항목 하나만 찾는 연습이다.
</div>

**📋 요구사항**

- 결과: 아직 완료하지 않은 첫 번째 강의 `targetLesson`
- 사용 메서드: `find`

**• JavaScript: 문제 5 — 요구사항 코드**

```javascript
const targetLesson = lessonRecords.find(/* ... */);
```

**✅ 확인할 결과**

**• JavaScript: 문제 5 — 확인할 결과**

```javascript
console.log(targetLesson.title);
// "클로저 이해하기"
```

**📝 정답 예시**

**• JavaScript: 문제 5 — 정답 예시**

```javascript
const targetLesson = lessonRecords.find((lesson) => !lesson.completed);
```

---

### 문제 6. 전체 상태 검사하기

**🎯 목표**

<div class="wda-callout wda-cs">
some과 every로 배열 전체에 대한 참/거짓을 판단하는 연습이다.
</div>

**📋 요구사항**

- 결과 1: 미완료 강의가 하나라도 있는지 `hasUnfinishedLesson`
- 결과 2: 모든 강의가 점수를 받았는지(0점 초과) `allLessonsReviewed`
- 사용 메서드: `some`, `every`

**• JavaScript: 문제 6 — 요구사항 코드**

```javascript
const hasUnfinishedLesson = lessonRecords.some(/* ... */);
const allLessonsReviewed = lessonRecords.every(/* ... */);
```

**✅ 확인할 결과**

**• JavaScript: 문제 6 — 확인할 결과**

```javascript
console.log(hasUnfinishedLesson);
// true

console.log(allLessonsReviewed);
// false
```

**📝 정답 예시**

**• JavaScript: 문제 6 — 정답 예시**

```javascript
const hasUnfinishedLesson = lessonRecords.some((lesson) => !lesson.completed);
const allLessonsReviewed = lessonRecords.every((lesson) => lesson.score > 0);
```

---

### 문제 7. 총 학습 시간 구하기

**🎯 목표**

<div class="wda-callout wda-cs">
reduce로 배열의 숫자 값을 하나로 합산하는 연습이다.
</div>

**📋 요구사항**

- 결과: 전체 학습 시간 합계 `totalStudyMinutes`
- 사용 메서드: `reduce`
- 주의할 점: 초기값 `0`을 반드시 지정한다

**• JavaScript: 문제 7 — 요구사항 코드**

```javascript
const totalStudyMinutes = lessonRecords.reduce(/* ... */, 0);
```

**✅ 확인할 결과**

**• JavaScript: 문제 7 — 확인할 결과**

```javascript
console.log(totalStudyMinutes);
// 270
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
reduce의 두 번째 인자(초기값)를 빠뜨리면, 배열이 비어 있을 때 에러가 날 수 있다.
</div>

**📝 정답 예시**

**• JavaScript: 문제 7 — 정답 예시**

```javascript
const totalStudyMinutes = lessonRecords.reduce(
  (sum, lesson) => sum + lesson.minutes,
  0
);
```

---

### 문제 8. 레벨별 개수 세기

**🎯 목표**

<div class="wda-callout wda-cs">
reduce로 배열을 누적 객체 하나로 모으는 연습이다.
</div>

**📋 요구사항**

- 결과: `{ 입문: 3, 심화: 2 }` 형태의 객체 `levelCounts`
- 사용 메서드: `reduce`

**• JavaScript: 문제 8 — 요구사항 코드**

```javascript
const levelCounts = lessonRecords.reduce(/* ... */, {});
```

**✅ 확인할 결과**

**• JavaScript: 문제 8 — 확인할 결과**

```javascript
console.log(levelCounts);
// { 입문: 3, 심화: 2 }
```

**🧠 풀이 방향**

<div class="wda-callout wda-cb">
누적값(counts)을 객체로 두고, 매 항목마다 해당 level의 개수를 1씩 늘린 뒤 counts를 그대로 반환한다.
</div>

**📝 정답 예시**

**• JavaScript: 문제 8 — 정답 예시**

```javascript
const levelCounts = lessonRecords.reduce((counts, lesson) => {
  counts[lesson.level] = (counts[lesson.level] || 0) + 1;
  return counts;
}, {});
```

---

## 12. 메서드 선택 기준 정리

**▶ 상황별 메서드 선택 기준**

| 상황 | 메서드 |
|---|---|
| 각 값을 변환한 새 배열이 필요할 때 | `map` |
| 조건에 맞는 값만 걸러낼 때 | `filter` |
| 조건에 맞는 값 하나만 찾을 때 | `find` |
| 하나라도 조건을 만족하는지 확인할 때 | `some` |
| 모두 조건을 만족하는지 확인할 때 | `every` |
| 배열을 하나의 값(합계, 객체 등)으로 모을 때 | `reduce` |

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">map</div>
    각 값을 변환한 <strong>같은 길이</strong>의 새 배열을 만든다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">filter</div>
    조건에 맞는 값만 남긴 <strong>더 짧거나 같은 길이</strong>의 배열을 만든다.
  </div>
</div>

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">find</div>
    조건에 맞는 값 <strong>하나</strong>를 반환한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">filter</div>
    조건에 맞는 값을 <strong>배열</strong>로 반환한다.
  </div>
</div>

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">some</div>
    <strong>하나라도</strong> 만족하면 true.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">every</div>
    <strong>전부</strong> 만족해야 true.
  </div>
</div>

---

## 13. 초보자가 자주 하는 실수

<div class="wda-fgrid">

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 1 · map 콜백에서 return 누락</div>

**• JavaScript: map 콜백에서 return 누락하는 실수**

```javascript
const titles = lessonRecords.map((lesson) => {
  lesson.title;
});

console.log(titles);
// [undefined, undefined, undefined, undefined, undefined]
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 중괄호 블록 안에서는 return을 써야 값이 반환된다.<br>
  <strong>기억할 점:</strong> 한 줄로 값만 반환할 때만 중괄호를 생략한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 2 · reduce 초기값 누락</div>

**• JavaScript: reduce 초기값 누락하는 실수**

```javascript
const total = [].reduce((sum, lesson) => sum + lesson.minutes);
// ❌ TypeError (일부러 에러 확인용)
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 초기값이 없으면 빈 배열에는 누적을 시작할 값이 없어 에러가 난다.<br>
  <strong>기억할 점:</strong> reduce는 항상 초기값을 명시한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 3 · filter가 원본을 바꾼다는 착각</div>

**• JavaScript: filter가 원본을 바꾼다는 착각**

```javascript
const completedLessons = lessonRecords.filter((lesson) => lesson.completed);

console.log(lessonRecords.length);
// 5
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> map/filter/find 등은 새 결과를 반환할 뿐 원본을 바꾸지 않는다.<br>
  <strong>기억할 점:</strong> 원본 변경 여부는 메서드마다 항상 확인한다.
</div>

</div>

</div>

---

## 14. 추가 실습 문제

### 문제 9. 키워드가 포함된 완료 강의 찾기

**🎯 목표**

<div class="wda-callout wda-cs">
filter와 map을 이어 써서(chaining) 조건에 맞는 값을 걸러낸 뒤 원하는 형태로 바꾸는 연습이다.
</div>

**📋 요구사항**

- 결과: 제목에 "배열"이 포함되고 완료된 강의의 제목만 담은 배열 `keywordLessons`
- 사용 메서드: `filter` → `map`

**• JavaScript: 문제 9 — 요구사항 코드**

```javascript
const keywordLessons = lessonRecords
  .filter(/* ... */)
  .map(/* ... */);
```

**✅ 확인할 결과**

**• JavaScript: 문제 9 — 확인할 결과**

```javascript
console.log(keywordLessons);
// ["배열 다루기"]
```

**📝 정답 예시**

**• JavaScript: 문제 9 — 정답 예시**

```javascript
const keywordLessons = lessonRecords
  .filter((lesson) => lesson.completed && lesson.title.includes("배열"))
  .map((lesson) => lesson.title);
```

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><strong>map</strong>은 값을 변환한 새 배열, <strong>filter</strong>는 조건에 맞는 값만 남긴 새 배열을 만든다.</li>
    <li><strong>find</strong>는 조건에 맞는 <strong>첫 번째 값 하나</strong>만 반환한다.</li>
    <li><strong>some</strong>은 하나라도, <strong>every</strong>는 모두 조건을 만족해야 true다.</li>
    <li><strong>reduce</strong>는 배열을 합계나 객체 같은 <strong>하나의 값</strong>으로 누적한다.</li>
    <li>map/filter/find/some/every/reduce는 모두 <strong>원본 배열을 바꾸지 않고</strong> 새 결과를 반환한다.</li>
    <li>콜백 함수에서 <strong>중괄호 블록</strong>을 쓰면 <strong>return</strong>을 반드시 써야 값이 나온다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: map 콜백에서 중괄호를 쓰면 자동으로 값이 반환된다?</div>
    <div class="wda-mistake-right">정답: 중괄호 블록에서는 <strong>return</strong>을 직접 써야 값이 반환된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: reduce는 초기값 없이도 항상 안전하게 동작한다?</div>
    <div class="wda-mistake-right">정답: 빈 배열에 <strong>초기값을 안 주면 에러</strong>가 날 수 있다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: filter/map은 원본 배열을 바꾼다?</div>
    <div class="wda-mistake-right">정답: 원본은 그대로 두고 <strong>새 배열을 반환</strong>한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: find는 조건에 맞는 모든 값을 반환한다?</div>
    <div class="wda-mistake-right">정답: find는 조건에 맞는 <strong>첫 번째 값 하나</strong>만 반환한다(여러 개가 필요하면 filter).</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 변환/거르기</div>
    <div class="wda-formula-block-body">
      <code>map = 변환</code><br>
      <code>filter = 거르기</code>
    </div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 검사</div>
    <div class="wda-formula-block-body">
      <code>find = 하나 찾기</code><br>
      <code>some/every = 하나라도/전부</code>
    </div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 누적</div>
    <div class="wda-formula-block-body"><code>reduce = 배열 → 하나의 값</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">map과 filter의 차이는?</div>
    <div class="wda-flip-back">map은 값을 변환하고, filter는 조건에 맞는 값만 남긴다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">find와 filter의 차이는?</div>
    <div class="wda-flip-back">find는 첫 번째 값 하나, filter는 조건에 맞는 모든 값의 배열을 반환한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">some과 every의 차이는?</div>
    <div class="wda-flip-back">some은 하나라도, every는 전부 만족해야 true다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">reduce는 무엇을 만드나?</div>
    <div class="wda-flip-back">배열을 합계나 객체 같은 하나의 값으로 누적한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">map 콜백에서 중괄호를 쓰면 주의할 점은?</div>
    <div class="wda-flip-back">return을 직접 써야 값이 반환된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">reduce에 초기값을 안 주면?</div>
    <div class="wda-flip-back">빈 배열일 때 에러가 날 수 있다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">map/filter/find는 원본을 바꾸나?</div>
    <div class="wda-flip-back">바꾸지 않는다 — 새 결과를 반환한다.</div>
  </div>
</div>
