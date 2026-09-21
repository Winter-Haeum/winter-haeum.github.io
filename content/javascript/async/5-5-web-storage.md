---
title: "5-5 로컬 스토리지로 데이터 저장하기"
status: "completed"
description: "localStorage와 sessionStorage의 차이, setItem/getItem/removeItem/clear, JSON을 이용한 객체 저장을 강의 화면 설정 시나리오로 정리한다."
category: "JavaScript"
section: "Async"
tags:
  - javascript
  - web-storage
  - local-storage
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
/* 핵심 요약 전용 복습 UI — JavaScript 1-1~1-5·2-1~2-3·4-1~4-4·DOM 3-3·async 5-1·5-2·5-4 기준과 동일. 색은 background/border/accent에만
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
  • <strong>저장소 선택</strong> — localStorage와 sessionStorage의 차이를 구분해 상황에 맞게 고를 수 있다.<br>
  • <strong>기본 메서드 활용</strong> — setItem/getItem/removeItem/clear로 값을 저장·조회·삭제할 수 있다.<br>
  • <strong>객체 저장</strong> — JSON.stringify/JSON.parse로 객체와 배열을 저장하고 복원할 수 있다.<br>
  • <strong>안전한 사용</strong> — 기본값 처리와 저장 금지 정보를 구분해 실무에 적용할 수 있다.
</div>

---

## 1. Web Storage가 필요한 순간

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">새로고침 후에도 유지</div>
    <div class="wda-fcard-dsc">강의 목록 보기 모드를 새로고침해도 기억하고 싶을 때</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">서버 없이 브라우저에만</div>
    <div class="wda-fcard-dsc">로그인 없이 이 브라우저에만 값을 잠깐 저장하고 싶을 때</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">페이지 재방문 시 복원</div>
    <div class="wda-fcard-dsc">강의 화면을 나갔다가 다시 들어와도 설정을 유지하고 싶을 때</div>
  </div>
</div>

**📌 개념**

<div class="wda-callout wda-ci">
  Web Storage는 브라우저 안에 값을 저장해두는 기능이다. 이 문서의 코드는 모두 <strong>브라우저 환경에서 실행하는 예제</strong>다 — Node.js에는 <code>localStorage</code>가 기본 제공되지 않는다.
</div>

---

## 2. localStorage와 sessionStorage

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 localStorage</div>

**• JavaScript: localStorage에 값 저장하기**

```javascript
localStorage.setItem(
  "lesson:viewMode",
  "grid"
);
// 브라우저를 껐다 켜도 값이 남아 있다
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 sessionStorage</div>

**• JavaScript: sessionStorage에 값 저장하기**

```javascript
sessionStorage.setItem(
  "lesson:tempFilter",
  "beginner"
);
// 이 탭을 닫으면 값이 사라진다
```

</div>

</div>

**📌 개념**

<div class="wda-callout wda-ci">
  localStorage는 브라우저를 종료해도 유지되고, sessionStorage는 현재 탭에서만 유지되다가 탭을 닫으면 사라진다. 두 객체 모두 메서드 이름과 사용법은 동일하다.
</div>

---

## 3. 저장하기: setItem

**• JavaScript: setItem으로 값 저장하기**

```javascript
const storageKey = "lesson:viewMode";
const selectedViewMode = "grid";

localStorage.setItem(storageKey, selectedViewMode);
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>setItem(key, value)</code>는 key와 value를 한 쌍으로 저장한다. 같은 key로 다시 저장하면 이전 값을 덮어쓴다.
</div>

---

## 4. 읽기: getItem

**• JavaScript: getItem으로 값 읽기**

```javascript
const savedViewMode = localStorage.getItem("lesson:viewMode");
console.log(savedViewMode);
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  저장된 적 없는 key를 <code>getItem</code>으로 읽으면 에러 없이 <code>null</code>을 반환한다. 이 상황을 처리하는 방법은 9번(기본값 처리)에서 다룬다.
</div>

---

## 5. 삭제하기: removeItem / clear

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 removeItem</div>

**• JavaScript: removeItem으로 특정 key 삭제하기**

```javascript
localStorage.removeItem("lesson:viewMode");
// 지정한 key 하나만 삭제된다
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 clear</div>

**• JavaScript: clear로 전체 삭제하기**

```javascript
localStorage.clear();
// 이 도메인에 저장된 모든 값이
// 한 번에 삭제된다
```

</div>

</div>

**▶ Web Storage 메서드 요약**

| 메서드 | 역할 |
|---|---|
| `setItem(key, value)` | 저장 |
| `getItem(key)` | 읽기 |
| `removeItem(key)` | 특정 key 삭제 |
| `clear()` | 전체 삭제 |
| `length` | 저장된 항목 개수 |
| `key(index)` | index번째 key 이름 조회 |

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <code>clear()</code>는 관련 없는 다른 key까지 전부 지운다. 특정 설정만 초기화하려면 <code>removeItem</code>을 사용한다.
</div>

---

## 6. key 이름을 관리하는 방법

**• JavaScript: 접두사로 key 이름 관리하기**

```javascript
const storageKey = "lesson:viewMode";
```

**📌 개념**

<div class="wda-callout wda-ci">
  여러 설정을 저장하다 보면 key 이름이 겹치기 쉽다. <code>"lesson:viewMode"</code>처럼 콜론이나 하이픈으로 접두사를 붙이면, 다른 기능이 쓰는 key와 헷갈릴 위험이 줄어든다.
</div>

---

## 7. 저장되는 값은 문자열이다

**• JavaScript: 저장된 값이 문자열로 바뀌는 것 확인하기**

```javascript
localStorage.setItem("lesson:count", 3);

const savedCount = localStorage.getItem("lesson:count");
console.log(typeof savedCount); // string
console.log(savedCount);        // "3"
```

**📌 개념**

<div class="wda-callout wda-ci">
  숫자나 불리언을 넣어도 Web Storage는 항상 문자열로 저장한다. 객체나 배열을 그대로 넣으면 의미 없는 문자열이 되어버린다 — 객체/배열을 저장하는 방법은 다음 섹션에서 다룬다.
</div>

---

## 8. 객체와 배열 저장하기

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 문자열만 저장</div>

**• JavaScript: 문자열만 저장하는 경우**

```javascript
localStorage.setItem(
  "lesson:viewMode",
  "grid"
);
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 객체는 JSON으로 변환</div>

**• JavaScript: 객체를 JSON으로 변환해 저장하기**

```javascript
localStorage.setItem(
  "lesson:settings",
  JSON.stringify(lessonSettings)
);
```

</div>

</div>

**• JavaScript: JSON.stringify·JSON.parse로 저장·복원하기**

```javascript
const lessonSettings = { viewMode: "grid", showSubtitles: true };

localStorage.setItem("lesson:settings", JSON.stringify(lessonSettings));

const savedSettings = JSON.parse(localStorage.getItem("lesson:settings"));
console.log(savedSettings.viewMode); // grid
```

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">lessonSettings</div><div class="wda-fnode-dsc">객체 형태의 설정값</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">JSON.stringify</div><div class="wda-fnode-dsc">문자열로 변환 후 저장</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">JSON.parse</div><div class="wda-fnode-dsc">읽은 문자열을 다시 객체로 복원</div></div>
</div>

**📌 개념**

<div class="wda-callout wda-ci">
  <code>JSON.stringify</code>/<code>JSON.parse</code>의 세부 문법(중첩 구조, 지원 타입 등)은 <strong>JSON 데이터 다루기</strong> 부록에서 이미 다뤘다. 여기서는 Web Storage에 객체를 저장·복원하는 형태로만 사용한다.
</div>

---

## 9. 저장된 값이 없을 때 기본값 처리

**• JavaScript: 저장된 값이 없을 때 기본값 처리하기**

```javascript
const defaultSettings = { viewMode: "list", showSubtitles: false };

function loadLessonSettings() {
  const savedSettings = localStorage.getItem("lesson:settings");

  if (!savedSettings) {
    return defaultSettings;
  }

  return JSON.parse(savedSettings);
}
```

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">저장(setItem)</div><div class="wda-fnode-dsc">설정을 저장해둔다</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">재방문 시 읽기(getItem)</div><div class="wda-fnode-dsc">값이 있는지 확인</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">값 있음</div><div class="wda-fnode-dsc">저장된 설정 사용</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">값 없음</div><div class="wda-fnode-dsc">defaultSettings 사용</div></div>
</div>

**📌 개념**

<div class="wda-callout wda-ci">
  <code>getItem</code>은 값이 없으면 <code>null</code>을 반환한다. <code>null</code>을 그대로 사용하지 않고, 값이 없을 때 기본값을 대신 돌려주는 처리가 필요하다.
</div>

---

## 10. JSON parse 실패 대비

**• JavaScript: try/catch로 JSON parse 실패 대비하기**

```javascript
function loadLessonSettings() {
  const savedSettings = localStorage.getItem("lesson:settings");

  if (!savedSettings) {
    return defaultSettings;
  }

  try {
    return JSON.parse(savedSettings);
  } catch (error) {
    // 저장된 값이 손상되었을 때 (일부러 에러 확인용)
    return defaultSettings;
  }
}
```

**📌 개념**

<div class="wda-callout wda-ci">
  저장된 문자열이 올바른 JSON 형식이 아니면 <code>JSON.parse</code>는 에러를 던진다. try/catch로 감싸 실패 시 기본값으로 대체하면 안전하다. try/catch 자체를 더 깊게 다루는 내용은 <strong>5-4 에러 핸들링하기</strong> 문서에서 이미 다뤘다.
</div>

---

## 11. 쿠키와 짧게 비교하기

**▶ Web Storage vs Cookie**

| 구분 | localStorage / sessionStorage | Cookie |
|---|---|---|
| 서버 전송 | 되지 않음 | 매 요청마다 자동 전송 |
| 용량 | 약 5MB | 약 4KB |
| 접근 방식 | JavaScript로만 | JavaScript 또는 서버 |

**📌 개념**

<div class="wda-callout wda-ci">
  쿠키는 로그인 세션처럼 서버가 함께 확인해야 하는 값에 주로 쓰이고, Web Storage는 이 문서처럼 브라우저 안에서만 쓰는 값에 적합하다. 쿠키의 세부 옵션은 이 문서에서 다루지 않는다.
</div>

---

## 12. 저장하면 안 되는 정보

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">✅ 저장해도 되는 값</div>

- 화면 보기 모드
- 자막 표시 여부 같은 UI 설정

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">🚫 저장하면 안 되는 값</div>

- 비밀번호
- 로그인 인증 토큰

</div>

</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  Web Storage는 개발자 도구에서 누구나 값을 확인할 수 있다. 비밀번호나 인증 토큰처럼 민감한 정보는 저장하지 않는다.
</div>

---

## 13. 초보자가 자주 만나는 Web Storage 실수

<div class="wda-fgrid">

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 1 · getItem 결과를 바로 parse</div>

**• JavaScript: getItem 결과를 바로 parse하는 실수**

```javascript
const savedSettings =
  JSON.parse(localStorage.getItem("lesson:settings"));
// 값이 없으면 getItem이 null을 반환하고
// JSON.parse(null)은 null을 돌려준다
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 값이 없을 때를 처리하지 않으면 예상과 다른 결과가 나온다.<br>
  <strong>기억할 점:</strong> getItem 결과가 없을 때는 기본값을 먼저 확인한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 2 · 객체를 그대로 setItem</div>

**• JavaScript: 객체를 그대로 setItem하는 실수**

```javascript
localStorage.setItem("lesson:settings", lessonSettings);
console.log(localStorage.getItem("lesson:settings"));
// "[object Object]"
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> Web Storage는 값을 문자열로만 저장하므로 객체는 의미 없는 문자열로 바뀐다.<br>
  <strong>기억할 점:</strong> 객체/배열은 JSON.stringify로 변환한 뒤 저장한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 3 · clear()로 전체 삭제</div>

**• JavaScript: clear()로 전체 삭제하는 실수**

```javascript
localStorage.clear();
// lesson:viewMode뿐 아니라 다른 기능이
// 저장해둔 값까지 모두 사라진다
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 다른 기능이 저장해둔 값까지 함께 지워질 수 있다.<br>
  <strong>기억할 점:</strong> 특정 설정만 지우려면 removeItem을 사용한다.
</div>

</div>

</div>

---

## 14. 실습 과제

**🎯 목표**

강의 화면 보기 모드를 저장하고, 다시 불러오고, 초기화하는 흐름을 만든다.

**📋 요구사항**

• `saveLessonSettings(lessonSettings)`로 설정을 JSON 문자열로 저장한다.<br>
• `loadLessonSettings()`로 저장된 설정을 읽되, 없거나 손상됐으면 `defaultSettings`를 반환한다.<br>
• `clearLessonSettings()`로 저장된 설정을 삭제한다.

**• JavaScript: 실습 구성 예시**

```javascript
// 구성 예시: 저장 함수 / 기본값과 try-catch를 포함한 불러오기 함수 / 삭제 함수
```

**💡 힌트 1 — 저장 함수**

**• JavaScript: 힌트 1 — 저장 함수**

```javascript
function saveLessonSettings(lessonSettings) {
  localStorage.setItem("lesson:settings", JSON.stringify(lessonSettings));
}
```

**💡 힌트 2 — 불러오기 함수**

**• JavaScript: 힌트 2 — 불러오기 함수**

```javascript
function loadLessonSettings() {
  const savedSettings = localStorage.getItem("lesson:settings");

  if (!savedSettings) {
    return defaultSettings;
  }

  try {
    return JSON.parse(savedSettings);
  } catch (error) {
    return defaultSettings;
  }
}
```

**💡 힌트 3 — 초기화 함수**

**• JavaScript: 힌트 3 — 초기화 함수**

```javascript
function clearLessonSettings() {
  localStorage.removeItem("lesson:settings");
}
```

**📌 정리 메모**

• Web Storage는 문자열만 저장하므로 객체/배열은 JSON으로 변환한다.<br>
• 값이 없거나 손상된 경우를 대비해 기본값과 try/catch를 준비한다.<br>
• 특정 설정만 지우려면 clear 대신 removeItem을 쓴다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>Web Storage는 브라우저 안에 값을 저장하는 기능이며, <strong>localStorage</strong>는 브라우저를 꺼도 유지되고 <strong>sessionStorage</strong>는 탭을 닫으면 사라진다.</li>
    <li><strong>setItem(key, value)</strong>으로 저장하고 <strong>getItem(key)</strong>으로 읽으며, 값이 없으면 getItem은 에러 없이 <strong>null</strong>을 반환한다.</li>
    <li><strong>removeItem(key)</strong>은 특정 값만 지우고, <strong>clear()</strong>는 저장된 모든 값을 지운다.</li>
    <li>Web Storage는 오직 <strong>문자열</strong>만 저장하므로, 객체/배열은 <strong>JSON.stringify</strong>로 저장하고 <strong>JSON.parse</strong>로 복원한다.</li>
    <li>저장된 값이 없거나 JSON 형식이 깨졌을 수 있으므로, <strong>기본값 처리와 try/catch</strong>로 안전하게 불러온다.</li>
    <li>비밀번호나 인증 토큰 같은 <strong>민감한 정보는 Web Storage에 저장하지 않는다</strong>. 개발자 도구에서 누구나 값을 확인할 수 있다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: getItem 결과를 바로 JSON.parse에 넘겨도 된다?</div>
    <div class="wda-mistake-right">정답: 값이 없으면 <strong>null</strong>이 반환되므로, 먼저 값이 있는지 확인해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 객체를 setItem에 그대로 넣으면 그대로 저장된다?</div>
    <div class="wda-mistake-right">정답: 문자열로 변환되며, 객체를 그대로 넣으면 <strong>"[object Object]"</strong>로 저장된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: clear()는 내가 저장한 값만 지운다?</div>
    <div class="wda-mistake-right">정답: 같은 도메인에 저장된 <strong>모든 값</strong>을 지우므로, 특정 값만 지우려면 removeItem을 쓴다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: localStorage에 무엇이든 저장해도 안전하다?</div>
    <div class="wda-mistake-right">정답: 개발자 도구에서 누구나 값을 확인할 수 있어 <strong>민감한 정보는 저장하면 안 된다</strong>.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 수명</div>
    <div class="wda-formula-block-body"><code>local = 계속 유지</code><br><code>session = 탭 닫으면 소멸</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 기본 사용</div>
    <div class="wda-formula-block-body"><code>setItem/getItem</code><br><code>removeItem/clear</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 객체 저장</div>
    <div class="wda-formula-block-body"><code>JSON.stringify(저장)</code><br><code>JSON.parse(복원)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · 저장 금지</div>
    <div class="wda-formula-block-body"><code>비밀번호·토큰 같은</code><br><code>민감 정보 금지</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">localStorage와 sessionStorage의 차이는?</div>
    <div class="wda-flip-back">localStorage는 브라우저를 꺼도 유지되고, sessionStorage는 탭을 닫으면 사라진다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">getItem으로 없는 key를 읽으면?</div>
    <div class="wda-flip-back">에러 없이 null을 반환한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">removeItem과 clear의 차이는?</div>
    <div class="wda-flip-back">removeItem은 특정 key만, clear는 저장된 모든 값을 지운다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">객체를 Web Storage에 저장하려면?</div>
    <div class="wda-flip-back">JSON.stringify로 문자열로 바꾼 뒤 저장하고, 꺼낼 때 JSON.parse로 복원한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">JSON.parse가 실패할 수 있는 경우는?</div>
    <div class="wda-flip-back">저장된 문자열이 올바른 JSON 형식이 아닐 때이며, try/catch로 대비한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Web Storage와 쿠키의 가장 큰 차이는?</div>
    <div class="wda-flip-back">쿠키는 매 요청마다 서버로 전송되고, Web Storage는 서버로 전송되지 않는다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Web Storage에 저장하면 안 되는 정보는?</div>
    <div class="wda-flip-back">비밀번호, 인증 토큰 같은 민감한 정보. 누구나 개발자 도구에서 값을 볼 수 있다.</div>
  </div>
</div>
