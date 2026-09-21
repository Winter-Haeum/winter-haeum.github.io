---
title: "5-2 Promise와 async/await"
status: "completed"
description: "콜백에서 Promise로 넘어가는 이유와 Promise 상태, then/catch/finally, async/await 문법을 실전 코드 형태로 정리한다."
category: "JavaScript"
section: "Async"
tags:
  - javascript
  - async
  - promise
  - async-await
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
/* 핵심 요약 전용 복습 UI — JavaScript 1-1~1-5·2-1~2-3·4-1~4-4 기준과 동일. 색은 background/border/accent에만
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
  • <strong>Promise 상태 이해</strong> — pending/fulfilled/rejected가 무엇을 의미하는지 설명할 수 있다.<br>
  • <strong>then/catch/finally 사용</strong> — Promise의 결과를 받아 처리하는 코드를 작성할 수 있다.<br>
  • <strong>async/await 작성</strong> — 비동기 코드를 동기 코드처럼 읽히게 작성할 수 있다.<br>
  • <strong>병렬 처리 활용</strong> — Promise.all 등으로 여러 비동기 작업을 함께 처리할 수 있다.
</div>

---

## 1. 콜백에서 Promise로

강의 정보를 가져온 뒤 그 강의의 리뷰까지 이어서 요청하는 상황을 콜백으로 작성하면 콜백 안에 콜백이 중첩된다.

**• JavaScript: 콜백 중첩 예시**

```javascript
// 콜백 방식 — 중첩이 깊어질수록 읽기 어려워진다
fetchLesson(101, (err, lesson) => {
  if (err) return handleError(err);
  fetchReviews(lesson.id, (err, reviews) => {
    if (err) return handleError(err);
    console.log(lesson.title, reviews.length);
  });
});
```

Promise를 쓰면 같은 흐름을 중첩 없이 나열할 수 있다.

**• JavaScript: Promise 체이닝으로 중첩 없애기**

```javascript
fetchLesson(101)
  .then(lesson => fetchReviews(lesson.id))
  .then(reviews => console.log(reviews.length))
  .catch(handleError);
```

**📌 개념**

<div class="wda-callout wda-ci">
  Promise는 콜백 중첩 대신 <code>.then</code>으로 작업을 순서대로 나열하고, 에러 처리를 <code>.catch</code> 한 곳으로 모을 수 있게 해준다.
</div>

---

## 2. Promise란 무엇인가

Promise는 비동기 작업의 진행 상태와 결과를 담는 객체다. 생명 주기 동안 다음 3가지 중 하나의 상태를 가진다.

**▶ Promise 상태 3가지**

| 상태 | 의미 | 호출 함수 |
|---|---|---|
| pending | 아직 결과가 정해지지 않음 | - |
| fulfilled | 작업이 성공, 결과값이 있음 | `resolve()` |
| rejected | 작업이 실패, 이유가 있음 | `reject()` |

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  한 번 <strong>fulfilled</strong>나 <strong>rejected</strong>가 되면(이를 settled라고 부른다) 다시 다른 상태로 바뀌지 않는다.
</div>

---

## 3. Promise 생성하기

**• JavaScript: new Promise로 비동기 작업 만들기**

```javascript
function fetchLesson(lessonId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (lessonId > 0) {
        resolve({ id: lessonId, title: "비동기 프로그래밍" });
      } else {
        reject(new Error("잘못된 강의 ID"));
      }
    }, 500);
  });
}
```

**• JavaScript: executor 함수 즉시 실행 확인하기**

```javascript
console.log("요청 시작");
fetchLesson(101);
console.log("요청 이후 코드");
// 요청 시작
// 요청 이후 코드
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>new Promise(executor)</code>의 executor 함수(<code>(resolve, reject) =&gt; {...}</code>)는 Promise를 선언하는 즉시 실행된다. <code>resolve</code>와 <code>reject</code>는 직접 만드는 함수가 아니라 자바스크립트가 인자로 넘겨주는 함수다.
</div>

---

## 4. Promise 소비하기 — then / catch / finally

**• JavaScript: then·catch·finally로 결과 처리하기**

```javascript
const request = fetchLesson(101);

request.then(lesson => {
  console.log("강의:", lesson.title);
});

request.catch(error => {
  console.error("에러:", error.message);
});

request.finally(() => {
  console.log("요청 종료");
});
```

**▶ then·catch·finally 실행 시점**

| 메서드 | 실행 시점 | 전달받는 값 |
|---|---|---|
| `then` | 성공(fulfilled)했을 때 | 결과값 |
| `catch` | 실패(rejected)했을 때 | 에러 |
| `finally` | 성공/실패 상관없이 | 없음 |

---

## 5. 체이닝으로 순차 처리하기

**• JavaScript: then 체이닝으로 순차 처리하기**

```javascript
fetchLesson(101)
  .then(lesson => fetchReviews(lesson.id))
  .then(reviews => fetchInstructor(reviews[0].instructorId))
  .then(instructor => console.log(instructor.name))
  .catch(error => console.error(error.message));
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>then</code> 안에서 <strong>return한 값(또는 Promise)</strong>이 자동으로 다음 <code>then</code>의 입력으로 전달된다. Promise를 반환하면 그 Promise가 끝날 때까지 기다렸다가 결과값만 전달한다.
</div>

---

## 6. 체이닝에서 에러 처리하기

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">📉 에러 전파</div>

catch가 없으면 뒤의 then들은 모두 건너뛰고 catch로 이동한다.

**• JavaScript: 체이닝에서 에러 전파되기**

```javascript
fetchLesson(101)
  .then(lesson => fetchReviews(lesson.id))
  .catch(error =>
    console.error("실패:", error.message)
  );
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">🔄 에러 복구</div>

catch에서 기본값을 반환하면 이후 then이 다시 이어진다.

**• JavaScript: catch에서 기본값으로 복구하기**

```javascript
fetchLesson(-1)
  .catch(error => {
    console.error("실패:", error.message);
    return { id: 0, title: "기본 강의" };
  })
  .then(lesson => console.log(lesson.title));
```

</div>

</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  catch가 없으면 실패한 Promise가 처리되지 않은 채로 남는다(unhandled rejection). 체인의 끝에는 항상 catch를 붙이는 습관을 들인다.
</div>

---

## 7. Promise 정적 메서드 — resolve / reject

**• JavaScript: Promise.resolve로 캐시값 감싸기**

```javascript
function getLessonProgress(lessonId, cachedProgress) {
  if (cachedProgress) {
    return Promise.resolve(cachedProgress);
  }
  return fetchProgress(lessonId);
}

getLessonProgress(101, { percent: 80 }).then(p => console.log(p.percent));
// 80
```

**📌 개념**

<div class="wda-callout wda-ci">
  캐시가 있든 없든 항상 Promise를 반환하도록 만들면, 호출하는 쪽은 매번 <code>.then()</code>만 쓰면 된다. <code>Promise.reject(new Error(...))</code>도 같은 방식으로 즉시 실패하는 Promise를 만든다.
</div>

---

## 8. Promise.all — 모두 성공해야 할 때

**• JavaScript: Promise.all로 여러 요청 동시 처리하기**

```javascript
Promise.all([fetchLesson(101), fetchReviews(101), fetchInstructor(5)])
  .then(([lesson, reviews, instructor]) => {
    console.log(lesson.title, reviews.length, instructor.name);
  })
  .catch(error => console.error("하나라도 실패:", error.message));
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  배열 안의 Promise 중 <strong>하나라도 실패하면 즉시 전체가 reject</strong>된다(fast-fail). 결과는 요청한 순서 그대로 배열에 담긴다.
</div>

---

## 9. Promise.race — 가장 먼저 끝난 것

**• JavaScript: Promise.race로 타임아웃 구현하기**

```javascript
function fetchWithTimeout(lessonId, ms) {
  const request = fetchLesson(lessonId);
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("요청 시간 초과")), ms);
  });
  return Promise.race([request, timeout]);
}
```

**📌 개념**

<div class="wda-callout wda-ci">
  가장 먼저 settled된 Promise의 결과만 사용한다. 나머지 Promise는 취소되지 않고 계속 실행되지만, 결과는 무시된다.
</div>

---

## 10. Promise.allSettled / Promise.any

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">all</div>
    <div class="wda-fcard-dsc"><strong>성공 조건:</strong> 모두 성공<br><strong>특징:</strong> 하나라도 실패하면 즉시 실패</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">race</div>
    <div class="wda-fcard-dsc"><strong>성공 조건:</strong> 가장 먼저 끝남<br><strong>특징:</strong> 성공/실패 상관없이 1등 결과</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">allSettled</div>
    <div class="wda-fcard-dsc"><strong>성공 조건:</strong> 모두 완료<br><strong>특징:</strong> 성공/실패 상관없이 전체 결과 보고</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">any</div>
    <div class="wda-fcard-dsc"><strong>성공 조건:</strong> 하나만 성공<br><strong>특징:</strong> 모두 실패해야 reject</div>
  </div>
</div>

**• JavaScript: Promise.allSettled로 전체 결과 확인하기**

```javascript
Promise.allSettled([fetchLesson(101), fetchLesson(-1)]).then(results => {
  results.forEach(r => {
    if (r.status === "fulfilled") console.log("성공:", r.value.title);
    else console.log("실패:", r.reason.message);
  });
});
// 성공: 비동기 프로그래밍
// 실패: 잘못된 강의 ID
```

---

## 11. async 함수

**• JavaScript: async 함수 선언하기**

```javascript
async function loadLesson(lessonId) {
  return { id: lessonId, title: "비동기 프로그래밍" };
}

loadLesson(101).then(lesson => console.log(lesson.title));
// 비동기 프로그래밍
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>async</code> 함수는 항상 <strong>Promise를 반환</strong>한다. 함수 안의 <code>return</code>은 자동으로 <code>resolve</code>로, <code>throw</code>는 자동으로 <code>reject</code>로 바뀐다.
</div>

---

## 12. await

**• JavaScript: await로 순차 요청하기**

```javascript
async function loadLessonWithReviews(lessonId) {
  const lesson = await fetchLesson(lessonId);
  const reviews = await fetchReviews(lesson.id);
  console.log(lesson.title, reviews.length);
}
```

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">요청 시작</div><div class="wda-fnode-dsc">fetchLesson을 호출한다.</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">await로 대기</div><div class="wda-fnode-dsc">Promise가 settled될 때까지 함수 실행이 멈춘다.</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">다음 줄 실행</div><div class="wda-fnode-dsc">결과값을 받아 이어서 실행한다.</div></div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <code>await</code>는 <strong>async 함수 내부</strong>(또는 모듈 최상위 top-level await)에서만 쓸 수 있다.
</div>

---

## 13. fetch로 실제 데이터 가져오기

**• JavaScript: fetch와 await로 데이터 가져오기**

```javascript
// 브라우저 환경 코드 — fetch는 Promise를 반환하는 내장 함수다
async function loadLessonFromServer(lessonId) {
  const response = await fetch(`/api/lessons/${lessonId}`);
  const lesson = await response.json();
  return lesson;
}
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>fetch</code>도 결국 Promise를 반환하므로, 지금까지 배운 <code>then</code>/<code>catch</code>나 <code>await</code>가 그대로 적용된다. 실제 응답 내용은 서버 환경에 따라 달라지므로 출력 결과는 표시하지 않는다.
</div>

---

## 14. async/await로 리팩토링하기

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 Promise 체이닝</div>

**• JavaScript: Promise 체이닝 방식**

```javascript
function loadLessonPage(lessonId) {
  return fetchLesson(lessonId)
    .then(lesson => fetchReviews(lesson.id))
    .then(reviews =>
      console.log(reviews.length)
    );
}
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 async/await</div>

**• JavaScript: async/await 방식**

```javascript
async function loadLessonPage(lessonId) {
  const lesson = await fetchLesson(lessonId);
  const reviews = await fetchReviews(lesson.id);
  console.log(reviews.length);
}
```

</div>

</div>

---

## 15. try/catch로 에러 처리하기

**• JavaScript: try/catch로 async 에러 처리하기**

```javascript
async function loadLessonPage(lessonId) {
  try {
    const lesson = await fetchLesson(lessonId);
    const reviews = await fetchReviews(lesson.id);
    return { lesson, reviews };
  } catch (error) {
    console.error("로딩 실패:", error.message);
    throw error;
  }
}
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>catch</code> 블록에서 처리만 하면 에러가 해결된 것으로 간주된다. 호출한 쪽에도 실패를 알려야 한다면 <code>throw error</code>로 다시 던진다. 에러 처리를 더 깊게 다루는 내용은 <strong>5-4 에러 핸들링</strong> 문서에서 이어간다.
</div>

---

## 16. 순차 실행 vs 병렬 실행

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">🔗 순차 실행 (의존성 있음)</div>

**• JavaScript: 순차 실행 — 의존성 있는 요청**

```javascript
const lesson = await fetchLesson(101);
const reviews = await fetchReviews(lesson.id);
// lesson.id가 있어야 reviews를 요청할 수 있다
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">⚡ 병렬 실행 (의존성 없음)</div>

**• JavaScript: 병렬 실행 — 의존성 없는 요청**

```javascript
const [lesson, notice] = await Promise.all([
  fetchLesson(101),
  fetchNotice(),
]);
// 서로 필요한 값이 없어 동시에 요청 가능
```

</div>

</div>

**📌 개념**

<div class="wda-callout wda-ci">
  뒤 요청이 앞 요청의 결과를 필요로 하면 순차로, 그렇지 않으면 <code>Promise.all</code>로 동시에 시작하는 것이 더 빠르다.
</div>

---

## 17. 반복문 안에서 await 쓸 때 주의

**• JavaScript: for...of로 순차 대기하기 — 느림**

```javascript
// 느림 — 강의를 하나씩 순서대로 기다린다
async function loadAllLessons(lessonIds) {
  const lessons = [];
  for (const id of lessonIds) {
    lessons.push(await fetchLesson(id));
  }
  return lessons;
}
```

**• JavaScript: map과 Promise.all로 동시 요청하기 — 빠름**

```javascript
// 빠름 — 모든 요청을 동시에 시작하고 한 번에 기다린다
async function loadAllLessonsFast(lessonIds) {
  const promises = lessonIds.map(id => fetchLesson(id));
  return Promise.all(promises);
}
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <code>forEach</code> 콜백 안에서 <code>async/await</code>를 써도 <code>forEach</code>는 기다려주지 않는다. 반복문에서 비동기 작업을 병렬로 처리하려면 <code>map</code> + <code>Promise.all</code>을, 순서가 중요하면 <code>for...of</code>를 사용한다.
</div>

---

## 18. Promise vs async/await — 언제 무엇을 쓰나

**▶ 상황별 추천 방식**

| 상황 | 추천 |
|---|---|
| 기본적인 비동기 로직 | async/await |
| 여러 작업을 동시에 실행 | Promise.all |
| 함수가 Promise 하나만 그대로 반환 | Promise 체이닝도 무방 |

**📌 개념**

<div class="wda-callout wda-ci">
  async/await도 내부적으로는 Promise를 그대로 사용한다. 문법만 동기 코드처럼 바뀐 것이라, Promise의 상태 개념을 알아야 제대로 쓸 수 있다.
</div>

---

## 19. 초보자가 자주 만나는 실수

<div class="wda-fgrid">

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 1 · catch 없이 사용</div>

**• JavaScript: catch 없이 사용하는 실수**

```javascript
fetchLesson(-1).then(lesson =>
  console.log(lesson.title)
);
// Uncaught (in promise) Error: 잘못된 강의 ID
// (일부러 에러 확인용)
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> catch가 없어 실패를 아무도 처리하지 않는다.<br>
  <strong>기억할 점:</strong> 체인 끝에는 항상 catch를 붙인다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 2 · forEach 안에서 await</div>

**• JavaScript: forEach 안에서 await 쓰는 실수**

```javascript
lessonIds.forEach(async (id) => {
  const lesson = await fetchLesson(id);
  console.log(lesson.title);
});
console.log("완료");
// "완료"가 강의 목록보다 먼저 출력된다
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> forEach는 콜백이 반환한 Promise를 기다리지 않는다.<br>
  <strong>기억할 점:</strong> 병렬이 필요하면 map + Promise.all, 순서가 필요하면 for...of를 쓴다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 3 · async 밖에서 await</div>

**• JavaScript: async 밖에서 await 쓰는 실수**

```javascript
// function loadLesson() {
//   const lesson = await fetchLesson(101);
// }
// ❌ SyntaxError (일부러 에러 확인용)
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> await는 async 함수(또는 모듈 최상위) 밖에서 쓸 수 없다.<br>
  <strong>기억할 점:</strong> await를 쓰려면 함수 앞에 async를 붙인다.
</div>

</div>

</div>

---

## 20. 실습 과제

**🎯 목표**

강의 정보를 async/await로 불러오고, 실패 상황까지 처리해본다.

**📋 요구사항**

• `fetchLesson(lessonId)`로 강의를 가져오는 `loadLessonPage` 함수를 async/await로 작성한다.<br>
• 실패할 경우 try/catch로 잡아 `"로딩 실패"`를 출력한다.<br>
• 강의와 공지사항처럼 서로 의존하지 않는 두 요청은 `Promise.all`로 동시에 가져온다.

**• JavaScript: 실습 구성 예시**

```javascript
// 구성 예시: async 함수 선언 / await로 순차 요청 / try-catch 에러 처리 / Promise.all 병렬 요청
```

**💡 힌트 1 — async 함수 만들기**

**• JavaScript: 힌트 1 — async 함수 만들기**

```javascript
async function loadLessonPage(lessonId) {
  const lesson = await fetchLesson(lessonId);
  console.log(lesson.title);
}
```

**💡 힌트 2 — try/catch 추가**

**• JavaScript: 힌트 2 — try/catch 추가**

```javascript
async function loadLessonPage(lessonId) {
  try {
    const lesson = await fetchLesson(lessonId);
    console.log(lesson.title);
  } catch (error) {
    console.error("로딩 실패:", error.message);
  }
}
```

**💡 힌트 3 — Promise.all로 동시 요청**

**• JavaScript: 힌트 3 — Promise.all로 동시 요청**

```javascript
async function loadDashboard() {
  const [lesson, notice] = await Promise.all([
    fetchLesson(101),
    fetchNotice(),
  ]);
  console.log(lesson.title, notice.text);
}
```

**📌 정리 메모**

• Promise는 pending/fulfilled/rejected 3가지 상태를 가진다.<br>
• async/await는 Promise를 동기 코드처럼 읽히게 해주는 문법이다.<br>
• 의존성이 없는 요청은 Promise.all로 묶으면 더 빠르다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>Promise는 <strong>pending → fulfilled/rejected</strong> 3가지 상태를 가지며, 한 번 settled되면 다시 바뀌지 않는다.</li>
    <li><strong>then</strong>은 성공, <strong>catch</strong>는 실패, <strong>finally</strong>는 성공/실패 상관없이 항상 실행된다.</li>
    <li>then에서 <strong>return한 값(또는 Promise)</strong>이 자동으로 다음 then의 입력으로 전달된다.</li>
    <li><strong>async 함수</strong>는 항상 Promise를 반환하며, <code>return</code>은 resolve로, <code>throw</code>는 reject로 자동 변환된다.</li>
    <li><strong>await</strong>는 async 함수 내부(또는 top-level await)에서만 쓸 수 있고, Promise가 settled될 때까지 실행을 일시정지한다.</li>
    <li><strong>Promise.all</strong>은 모두 성공해야 하고 하나라도 실패하면 즉시 reject(fast-fail)되며, <strong>Promise.race</strong>는 가장 먼저 끝난 하나의 결과만 사용한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: new Promise의 executor 함수는 then을 호출할 때 실행된다?</div>
    <div class="wda-mistake-right">정답: executor는 <strong>new Promise 선언과 동시에 즉시 실행</strong>되고, 결과만 나중에 비동기로 전달된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: for문 안에서 여러 요청을 순차적으로 await해도 병렬 실행과 성능이 같다?</div>
    <div class="wda-mistake-right">정답: for 안의 await는 매번 실행을 멈추므로 느리다. 의존성이 없다면 <strong>map + Promise.all</strong>로 동시에 시작해야 빠르다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: forEach 안에서 async/await를 쓰면 순서대로 기다려준다?</div>
    <div class="wda-mistake-right">정답: forEach는 콜백이 반환한 Promise를 <strong>기다려주지 않고</strong> 바로 다음으로 넘어간다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: async 함수의 catch에서 에러를 잡으면 바깥 호출자도 자동으로 에러를 알게 된다?</div>
    <div class="wda-mistake-right">정답: catch에서 처리만 하면 에러가 '해결'된 것으로 간주된다. 바깥에도 알려야 한다면 catch 안에서 <strong>throw error로 재전파</strong>해야 한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 상태 변화</div>
    <div class="wda-formula-block-body"><code>pending → fulfilled/rejected</code><br>(불변)</div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · async 반환</div>
    <div class="wda-formula-block-body"><code>return → resolve</code><br><code>throw → reject</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 병렬 처리</div>
    <div class="wda-formula-block-body"><code>map + Promise.all</code><br>(의존성 없을 때)</div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · all vs race</div>
    <div class="wda-formula-block-body"><code>all = 모두 성공</code><br><code>race = 가장 빠른 1개</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Promise의 3가지 상태는?</div>
    <div class="wda-flip-back">pending(대기), fulfilled(이행), rejected(거부). 한 번 settled되면 다시 바뀌지 않는다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">then에서 일반 값을 리턴할 때와 Promise를 리턴할 때의 차이는?</div>
    <div class="wda-flip-back">일반 값은 즉시 다음 then으로 전달되고, Promise는 완료될 때까지 기다렸다가 결과값만 전달된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">async 함수가 return한 값과 throw한 에러는 각각 어떻게 처리되나?</div>
    <div class="wda-flip-back">return 값은 자동으로 resolve되고, throw한 에러는 자동으로 reject된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">await는 어디서만 사용할 수 있나?</div>
    <div class="wda-flip-back">async 함수 내부(또는 모듈 최상위 top-level await)에서만 사용할 수 있다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Promise.all과 Promise.race의 차이는?</div>
    <div class="wda-flip-back">all은 모두 성공해야 하고 하나라도 실패하면 즉시 실패 처리되며, race는 성공/실패 상관없이 가장 먼저 끝난 결과만 사용한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Promise.allSettled와 Promise.any의 차이는?</div>
    <div class="wda-flip-back">allSettled는 성공/실패 상관없이 모든 결과를 보고하고, any는 하나라도 성공하면 그 값을 반환한다(모두 실패해야 reject).</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">forEach 안에서 async/await를 쓰면 왜 문제가 되나?</div>
    <div class="wda-flip-back">forEach가 콜백이 반환한 Promise를 기다려주지 않아, 순서를 보장할 수 없기 때문이다.</div>
  </div>
</div>
