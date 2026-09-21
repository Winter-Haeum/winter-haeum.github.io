---
title: "5-4 에러 핸들링하기"
status: "completed"
description: "try/catch/finally, throw와 Error 객체, Promise catch와 async/await try/catch, custom error 기본을 강의 데이터 로딩 실패 시나리오로 정리한다."
category: "JavaScript"
section: "Async"
tags:
  - javascript
  - error-handling
  - try-catch
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
/* 핵심 요약 전용 복습 UI — JavaScript 1-1~1-5·2-1~2-3·4-1~4-4·DOM 3-3·async 5-1·5-2 기준과 동일. 색은 background/border/accent에만
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
  • <strong>에러 포착</strong> — try/catch/finally로 프로그램이 중간에 멈추지 않게 만들 수 있다.<br>
  • <strong>직접 에러 던지기</strong> — throw와 Error 객체로 상황에 맞는 에러를 발생시킬 수 있다.<br>
  • <strong>비동기 에러 처리</strong> — Promise의 catch와 async/await의 try/catch로 실패를 처리할 수 있다.<br>
  • <strong>메시지 구분</strong> — 사용자에게 보여줄 안내와 개발자가 볼 로그를 분리할 수 있다.
</div>

---

## 1. 에러 처리를 배워야 하는 이유

강의 상세 정보를 불러오는 코드를 짜다 보면, 네트워크가 끊기거나 존재하지 않는 강의 ID가 들어오거나 잘못된 값이 전달되는 상황을 언제든 만날 수 있다. 이런 상황에서 프로그램이 그대로 멈춰버리면 안 되고, 무엇이 잘못됐는지 사용자와 개발자 모두에게 적절히 알려야 한다.

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">네트워크 요청 실패</div>
    <div class="wda-fcard-dsc">서버 응답이 오지 않거나 실패로 끝나는 경우</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">존재하지 않는 데이터</div>
    <div class="wda-fcard-dsc">요청한 강의 ID에 해당하는 정보가 없는 경우</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">잘못된 입력값</div>
    <div class="wda-fcard-dsc">강의 ID 없이 함수를 호출하는 경우</div>
  </div>
</div>

---

## 2. 에러와 예외 이해하기

**• JavaScript: Error 객체 만들기**

```javascript
const error = new Error("강의 정보를 찾을 수 없습니다.");

console.log(error.name);    // Error
console.log(error.message); // 강의 정보를 찾을 수 없습니다.
```

**📌 개념**

<div class="wda-callout wda-ci">
  에러는 프로그램이 정상적으로 처리할 수 없는 상황을 알리는 신호다. <code>new Error(...)</code>로 에러 객체를 <strong>만드는 것</strong>과, 이를 <code>throw</code>로 <strong>던지는 것</strong>은 서로 다른 단계다. 에러 객체에는 발생 위치를 추적하는 <code>stack</code> 정보도 담기지만, 이 문서에서는 다루지 않는다.
</div>

---

## 3. try / catch 기본

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">⚠️ try/catch 없이 실행</div>

**• JavaScript: try/catch 없이 실행 — 에러로 중단**

```javascript
// JSON.parse("잘못된 형식");
// ❌ SyntaxError로 프로그램이 멈추고,
// 이후 코드는 실행되지 않는다
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">✅ try/catch로 감싸기</div>

**• JavaScript: try/catch로 감싸 계속 실행하기**

```javascript
try {
  const lessonData = JSON.parse("잘못된 형식");
  // ❌ SyntaxError 발생 (일부러 에러 확인용)
  console.log(lessonData);
} catch (error) {
  console.log("에러 발생");
}

console.log("다음 코드도 계속 실행된다");
// 에러 발생
// 다음 코드도 계속 실행된다
```

</div>

</div>

**📌 개념**

<div class="wda-callout wda-ci">
  <code>try</code> 블록에서 에러가 발생하면 그 즉시 <code>catch</code>로 이동한다. try/catch가 없었다면 프로그램은 그 자리에서 멈췄을 것이다.
</div>

---

## 4. finally는 언제 쓰는가

**• JavaScript: finally로 항상 정리 작업하기**

```javascript
function validateLessonId(lessonId) {
  if (!lessonId) {
    throw new Error("강의 ID가 필요합니다.");
  }
}

try {
  validateLessonId(101);
  console.log("강의 ID 확인 완료");
} catch (error) {
  console.log("에러:", error.message);
} finally {
  console.log("로딩 상태 해제");
}

// 강의 ID 확인 완료
// 로딩 상태 해제
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <code>finally</code>는 성공/실패와 관계없이 항상 실행된다. 로딩 표시를 끄는 것처럼, 결과와 상관없이 반드시 해야 하는 정리 작업에 사용한다.
</div>

---

## 5. throw로 직접 에러 만들기

**• JavaScript: throw로 직접 에러 던지기**

```javascript
function validateLessonId(lessonId) {
  if (!lessonId) {
    throw new Error("강의 ID가 필요합니다.");
  }
}

try {
  validateLessonId(null);
} catch (error) {
  console.log(error.message);
}

// 강의 ID가 필요합니다.
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>throw</code>는 조건에 맞지 않는 상황을 발견했을 때, 그 자리에서 직접 에러를 발생시키는 문법이다.
</div>

---

## 6. Error 객체와 메시지 읽기

**▶ Error 객체 프로퍼티**

| 프로퍼티 | 설명 |
|---|---|
| `name` | 에러 종류 (예: `Error`, `TypeError`) |
| `message` | 에러가 발생한 이유 |

**• JavaScript: Error 객체 프로퍼티 읽기**

```javascript
try {
  validateLessonId(null);
} catch (error) {
  console.log(error instanceof Error); // true
  console.log(error.name);             // Error
  console.log(error.message);          // 강의 ID가 필요합니다.
}
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>instanceof Error</code>로 잡힌 값이 실제 에러 객체인지 확인할 수 있다. 여러 에러 종류를 구분해서 다르게 처리하는 방법은 12번(custom error)에서 다룬다.
</div>

---

## 7. 동기 코드와 비동기 콜백의 에러 처리 차이

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">✅ 동기 코드</div>

**• JavaScript: 동기 코드 에러 처리**

```javascript
function loadLessonSync(lessonId) {
  try {
    validateLessonId(lessonId);
    return { id: lessonId };
  } catch (error) {
    console.log(
      "동기 에러 처리:",
      error.message
    );
    return null;
  }
}

loadLessonSync(null);
// 동기 에러 처리: 강의 ID가 필요합니다.
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">⚠️ 비동기 콜백</div>

**• JavaScript: 비동기 콜백은 try/catch로 못 잡음**

```javascript
try {
  setTimeout(() => {
    // 실제로 던지면 프로세스가 중단될 수
    // 있어 주석 처리했다 (설명용)
    // throw new Error("리뷰 실패");
  }, 0);
} catch (error) {
  // setTimeout 콜백은 try 블록이 끝난
  // 뒤 실행되므로 여기로 오지 않는다
  console.log("여기로 오지 않는다");
}
```

</div>

</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  비동기 콜백 내부에서 발생한 에러는 바깥의 try/catch로 바로 잡히지 않을 수 있다. 콜백이 실행되는 시점과 이벤트 루프의 관계는 <strong>5-1 비동기 기초</strong> 문서에서 이미 다뤘다. 이 문제는 다음 두 섹션의 Promise/async-await 방식으로 해결한다.
</div>

---

## 8. Promise에서 실패 처리하기

**• JavaScript: Promise reject와 catch로 실패 처리하기**

```javascript
function fetchLessonDetail(lessonId) {
  return new Promise((resolve, reject) => {
    if (!lessonId) {
      reject(new Error("강의 ID가 필요합니다."));
      return;
    }
    resolve({ id: lessonId, title: "비동기 프로그래밍" });
  });
}

fetchLessonDetail(null)
  .then(lessonData => console.log(lessonData))
  .catch(error => console.log("실패:", error.message));

// 실패: 강의 ID가 필요합니다.
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>reject</code>로 전달한 값은 <code>.catch()</code>에서 받는다. Promise 문법 자체(체이닝, 상태 등)는 <strong>5-2 Promise와 async/await</strong> 문서에서 이미 다뤘으므로, 여기서는 실패를 어떻게 잡아 처리하는지에만 집중한다.
</div>

---

## 9. async/await에서 try/catch 쓰기

**• JavaScript: async/await에서 try/catch로 실패 처리하기**

```javascript
async function loadLessonDetail(lessonId) {
  try {
    const lessonData = await fetchLessonDetail(lessonId);
    console.log(lessonData);
  } catch (error) {
    console.log("실패:", error.message);
  }
}

loadLessonDetail(null);
// 실패: 강의 ID가 필요합니다.
```

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 Promise catch</div>

**• JavaScript: Promise catch 방식**

```javascript
fetchLessonDetail(null)
  .catch(error =>
    console.log(error.message)
  );
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 async/await try/catch</div>

**• JavaScript: async/await try/catch 방식**

```javascript
try {
  await fetchLessonDetail(null);
} catch (error) {
  console.log(error.message);
}
```

</div>

</div>

**📌 개념**

<div class="wda-callout wda-ci">
  <code>await</code>를 쓰면 reject된 Promise가 try/catch의 catch로 그대로 전달된다. 7번에서 본 콜백과 달리, async 함수 안에서는 try/catch가 정상적으로 에러를 잡는다.
</div>

---

## 10. 네트워크 요청 실패 처리 기본

**• JavaScript: 네트워크 요청 실패 기본 처리하기**

```javascript
async function loadLessonDetail(lessonId) {
  try {
    const lessonData = await fetchLessonDetail(lessonId);
    return lessonData;
  } catch (error) {
    logError(error);
    return null;
  }
}
```

**📌 개념**

<div class="wda-callout wda-ci">
  실제 서버 요청에서는 네트워크 문제, 존재하지 않는 데이터, 잘못된 응답 형식 등 다양한 이유로 실패할 수 있다. 실패 이유가 무엇이든, catch 블록에서 프로그램이 멈추지 않도록 정리하는 흐름은 동일하다.
</div>

---

## 11. 사용자 메시지와 개발자 로그 나누기

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">🙂 사용자 메시지</div>

**• JavaScript: 사용자용 안내 메시지 함수**

```javascript
function renderErrorMessage(userMessage) {
  console.log("[화면 안내]", userMessage);
}
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">🛠️ 개발자 로그</div>

**• JavaScript: 개발자용 로그 함수**

```javascript
function logError(error) {
  console.log(
    "[개발자 로그]",
    error.name,
    error.message
  );
}
```

</div>

</div>

**• JavaScript: 로그와 사용자 메시지를 함께 처리하기**

```javascript
async function loadLessonDetail(lessonId) {
  try {
    const lessonData = await fetchLessonDetail(lessonId);
    return lessonData;
  } catch (error) {
    logError(error);
    renderErrorMessage("강의 정보를 불러오지 못했습니다.");
    return null;
  }
}
```

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">에러 발생</div><div class="wda-fnode-dsc">fetchLessonDetail 실패</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">catch 진입</div><div class="wda-fnode-dsc">프로그램이 멈추지 않고 처리</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">logError</div><div class="wda-fnode-dsc">개발자용 상세 정보 기록</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">renderErrorMessage</div><div class="wda-fnode-dsc">사용자에게 안내 문구 표시</div></div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  사용자에게는 원인을 짐작할 수 없는 내부 메시지(<code>error.message</code>) 대신, 다음에 무엇을 하면 되는지 안내하는 문구를 보여준다. 내부 에러 내용은 로그로만 남긴다.
</div>

---

## 12. custom error 기본

**• JavaScript: Error를 상속한 custom error 클래스**

```javascript
class LessonLoadError extends Error {
  constructor(message) {
    super(message);
    this.name = "LessonLoadError";
  }
}

function fetchLessonDetail(lessonId) {
  return new Promise((resolve, reject) => {
    if (!lessonId) {
      reject(new LessonLoadError("강의 ID가 필요합니다."));
      return;
    }
    resolve({ id: lessonId, title: "비동기 프로그래밍" });
  });
}
```

**• JavaScript: instanceof로 custom error 구분하기**

```javascript
async function run() {
  try {
    await fetchLessonDetail(null);
  } catch (error) {
    if (error instanceof LessonLoadError) {
      console.log("강의 로딩 에러:", error.message);
    } else {
      throw error;
    }
  }
}

run();
// 강의 로딩 에러: 강의 ID가 필요합니다.
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>LessonLoadError</code>처럼 <code>Error</code>를 상속한 나만의 에러 클래스를 만들면, <code>instanceof</code>로 어떤 종류의 에러인지 구분해 다르게 대응할 수 있다. 예상한 에러가 아니라면 억지로 처리하지 말고 <code>throw error</code>로 다시 던져 상위에서 처리하게 한다.
</div>

---

## 13. 초보자가 자주 만나는 에러 처리 실수

<div class="wda-fgrid">

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 1 · catch를 비워두기</div>

**• JavaScript: catch를 비워두는 실수**

```javascript
try {
  validateLessonId(null);
} catch (error) {
  // 아무것도 하지 않음
}
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 에러가 조용히 사라져 나중에 원인을 찾기 어려워진다.<br>
  <strong>기억할 점:</strong> 최소한 로그를 남기거나 다시 throw한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 2 · 비동기 콜백 밖에서 감싸기</div>

**• JavaScript: 비동기 콜백 밖에서 감싸는 실수**

```javascript
try {
  setTimeout(() => {
    // throw new Error("리뷰 실패");
    // (일부러 에러 확인용, 실행은 생략)
  }, 0);
} catch (error) {
  console.log("잡음:", error.message);
  // 이 코드는 실행되지 않는다
}
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 콜백은 try 블록이 끝난 뒤 실행되어 catch 범위 밖에 있다.<br>
  <strong>기억할 점:</strong> 비동기 실패는 콜백 내부, Promise의 catch, async/await의 try/catch로 처리한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 3 · 내부 메시지를 그대로 노출</div>

**• JavaScript: 내부 메시지를 그대로 노출하는 실수**

```javascript
catch (error) {
  renderErrorMessage(error.message);
  // 내부 에러 메시지가 화면에
  // 그대로 노출된다
}
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 사용자는 내부 에러 메시지를 이해할 수 없고, 불필요한 정보가 노출될 수 있다.<br>
  <strong>기억할 점:</strong> 사용자에게는 안내 문구를, 개발자에게는 로그로 상세 내용을 남긴다.
</div>

</div>

</div>

---

## 14. 실습 과제

**🎯 목표**

강의 정보를 불러오는 과정에서 실패를 처리하고, 사용자 메시지와 로그를 구분해본다.

**📋 요구사항**

• `validateLessonId(lessonId)`로 `lessonId`가 없으면 에러를 던진다.<br>
• `fetchLessonDetail(lessonId)`를 async/await로 호출하고, 실패하면 catch로 처리한다.<br>
• 실패 시 `logError(error)`로 로그를 남기고, `renderErrorMessage(userMessage)`로 사용자에게 안내한다.

**• JavaScript: 실습 구성 예시**

```javascript
// 구성 예시: 유효성 검사 / async-await 요청 / 실패 시 로그와 안내 메시지 분리
```

**💡 힌트 1 — 유효성 검사**

**• JavaScript: 힌트 1 — 유효성 검사**

```javascript
function validateLessonId(lessonId) {
  if (!lessonId) {
    throw new Error("강의 ID가 필요합니다.");
  }
}
```

**💡 힌트 2 — async/await로 요청과 실패 처리**

**• JavaScript: 힌트 2 — async/await로 요청과 실패 처리**

```javascript
async function loadLessonDetail(lessonId) {
  try {
    validateLessonId(lessonId);
    const lessonData = await fetchLessonDetail(lessonId);
    return lessonData;
  } catch (error) {
    logError(error);
    renderErrorMessage("강의 정보를 불러오지 못했습니다.");
    return null;
  }
}
```

**💡 힌트 3 — 로그와 사용자 메시지 함수**

**• JavaScript: 힌트 3 — 로그와 사용자 메시지 함수**

```javascript
function logError(error) {
  console.log("[개발자 로그]", error.name, error.message);
}

function renderErrorMessage(userMessage) {
  console.log("[화면 안내]", userMessage);
}
```

**📌 정리 메모**

• try/catch/finally로 프로그램이 중간에 멈추지 않게 만든다.<br>
• 비동기 실패는 Promise의 catch나 async/await의 try/catch로 처리한다.<br>
• 사용자에게는 안내 메시지를, 개발자에게는 로그를 따로 남긴다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>에러는 프로그램이 정상적으로 처리할 수 없는 상황을 알리는 신호이며, <strong>try/catch</strong>로 잡아 프로그램이 멈추지 않게 만든다.</li>
    <li><strong>try</strong>는 에러가 발생할 수 있는 코드를 감싸고, <strong>catch</strong>는 에러 발생 시에만 실행되며, <strong>finally</strong>는 성공/실패와 관계없이 항상 실행된다.</li>
    <li><strong>throw</strong>는 조건에 맞지 않는 상황에서 직접 에러를 발생시키는 문법이며, <code>new Error(...)</code>로 만든 에러 객체를 던질 때 사용한다.</li>
    <li>setTimeout 콜백처럼 나중에 실행되는 <strong>비동기 코드 내부의 에러</strong>는 바깥의 try/catch로 바로 잡히지 않을 수 있다(5-1의 실행 흐름과 연결).</li>
    <li>Promise의 실패는 <strong>.catch()</strong>로, async 함수 안의 실패는 <strong>try/catch</strong>로 처리한다.</li>
    <li>사용자에게는 이해할 수 있는 <strong>안내 메시지</strong>를, 개발자에게는 <strong>로그</strong>로 상세한 에러 정보를 남기는 방식으로 구분한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: catch 블록을 비워둬도 프로그램은 정상 동작한다?</div>
    <div class="wda-mistake-right">정답: 에러가 조용히 사라져 나중에 원인을 찾기 어려워진다. 최소한 <strong>로그를 남기거나 다시 throw</strong>해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: setTimeout 콜백 안의 에러도 바깥 try/catch로 잡을 수 있다?</div>
    <div class="wda-mistake-right">정답: 콜백은 try 블록이 끝난 뒤 실행되므로 <strong>바깥에서는 잡히지 않는다</strong>.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 사용자에게 error.message를 그대로 보여줘도 괜찮다?</div>
    <div class="wda-mistake-right">정답: 내부 에러 메시지는 사용자가 이해하기 어렵고 <strong>불필요한 정보를 노출</strong>할 수 있다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: throw는 문자열이나 숫자를 던져도 Error를 던지는 것과 같다?</div>
    <div class="wda-mistake-right">정답: <strong>Error 객체</strong>를 던져야 name/message 같은 정보를 활용할 수 있다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 처리 흐름</div>
    <div class="wda-formula-block-body"><code>try(시도) → catch(포착) → finally(항상)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 에러 발생</div>
    <div class="wda-formula-block-body"><code>throw new Error("메시지")</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 비동기 처리</div>
    <div class="wda-formula-block-body"><code>Promise = .catch()</code><br><code>async 함수 = try/catch</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · 메시지 구분</div>
    <div class="wda-formula-block-body"><code>사용자 = 안내 문구</code><br><code>개발자 = 로그</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">try/catch/finally 각각의 역할은?</div>
    <div class="wda-flip-back">try는 감시, catch는 에러 발생 시 처리, finally는 성공/실패와 관계없이 항상 실행된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">throw는 언제 쓰나?</div>
    <div class="wda-flip-back">조건에 맞지 않는 상황을 발견했을 때 직접 에러를 발생시킬 때 쓴다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">error.name과 error.message는 각각 무엇을 담나?</div>
    <div class="wda-flip-back">name은 에러 종류, message는 에러가 발생한 이유를 담는다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">setTimeout 콜백 안의 에러를 바깥 try/catch가 못 잡는 이유는?</div>
    <div class="wda-flip-back">콜백이 try 블록 종료 이후에 실행되기 때문이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Promise의 실패는 어떻게 처리하나?</div>
    <div class="wda-flip-back">.catch()로 reject된 값을 받아 처리한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">async 함수의 실패는 어떻게 처리하나?</div>
    <div class="wda-flip-back">함수 안을 try/catch로 감싸면 await에서 reject된 에러가 catch로 전달된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">custom error 클래스를 만드는 이유는?</div>
    <div class="wda-flip-back">instanceof로 에러 종류를 구분해 다르게 대응하기 위해서다.</div>
  </div>
</div>
