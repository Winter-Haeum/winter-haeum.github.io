---
title: "부록: JSON 데이터 다루기"
status: "completed"
description: "JavaScript 객체와 JSON 문자열의 차이, JSON.stringify/JSON.parse 기본 사용법, parse 실패 대비를 강의 설정 데이터 시나리오로 정리한다."
category: "JavaScript"
section: "Async"
tags:
  - javascript
  - json
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
/* 핵심 요약 전용 복습 UI — JavaScript 1-1~1-5·2-1~2-3·4-1~4-4·DOM 3-3·async 5-1~5-5·Date 부록 기준과 동일. 색은 background/border/accent에만
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
  • <strong>객체와 JSON 구분</strong> — JavaScript 객체와 JSON 문자열의 문법 차이를 설명할 수 있다.<br>
  • <strong>변환 기본</strong> — JSON.stringify와 JSON.parse로 객체와 문자열을 오가며 다룰 수 있다.<br>
  • <strong>지원 범위 이해</strong> — JSON으로 표현되는 값과 사라지거나 바뀌는 값을 구분할 수 있다.<br>
  • <strong>실패 대비</strong> — parse가 실패할 수 있음을 알고 안전하게 처리할 수 있다.
</div>

---

## 1. JSON이 필요한 순간

강의 설정(`lessonSettings`)은 JavaScript 안에서는 객체다. 이 설정을 저장하거나 서버로 보내려면 객체 그대로는 안 되고, 문자열 형태가 필요하다.

JSON은 이 객체를 문자열로 바꾸고, 다시 객체로 되돌리는 표준 형식이다.

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">서버로 보낼 때</div>
    <div class="wda-fcard-dsc">강의 설정을 문자열로 바꿔 전송한다</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">파일이나 저장소에 남길 때</div>
    <div class="wda-fcard-dsc">텍스트 형태로 저장했다가 다시 불러온다</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">다른 언어와 주고받을 때</div>
    <div class="wda-fcard-dsc">언어에 상관없이 같은 형식으로 데이터를 전달한다</div>
  </div>
</div>

**📌 개념**

<div class="wda-callout wda-ci">
  저장소에 값을 직접 저장하는 흐름은 <strong>5-5 Web Storage</strong> 문서에서 다뤘다. 이 문서에서는 "객체를 문자열로 바꾸고 되돌리는 방법" 자체에 집중한다.
</div>

---

## 2. JavaScript 객체와 JSON 문자열

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 JavaScript 객체</div>

**• JavaScript: 객체 리터럴**

```javascript
const lessonSettings = {
  viewMode: "compact",
  fontSize: 16,
};
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 JSON 문자열</div>

**• JavaScript: JSON 문자열**

```javascript
const lessonJson =
  '{"viewMode":"compact","fontSize":16}';
```

</div>

</div>

**📌 개념**

<div class="wda-callout wda-ci">
  JavaScript 객체는 코드에서 바로 다루는 값이고, JSON 문자열은 그 값을 텍스트로 표현한 것이다. JSON 문자열에서는 key와 문자열 값 모두 <strong>큰따옴표</strong>를 써야 한다.
</div>

---

## 3. JSON.stringify 기본

**• JavaScript: JSON.stringify로 객체를 문자열로 바꾸기**

```javascript
const lessonSettings = { viewMode: "compact", fontSize: 16 };

const lessonJson = JSON.stringify(lessonSettings);

console.log(lessonJson);
// {"viewMode":"compact","fontSize":16}
console.log(typeof lessonJson);
// string
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>JSON.stringify</code>는 객체를 JSON 형식의 문자열로 바꾼다. 결과가 객체가 아니라 <strong>문자열</strong>이 된다는 점이 핵심이다.
</div>

---

## 4. JSON.parse 기본

**• JavaScript: JSON.parse로 문자열을 객체로 바꾸기**

```javascript
const lessonJson = '{"viewMode":"compact","fontSize":16}';

const parsedSettings = JSON.parse(lessonJson);

console.log(parsedSettings.viewMode); // compact
console.log(typeof parsedSettings);   // object
```

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">📤 stringify</div>

객체 → 문자열

**• JavaScript: stringify 방향**

```javascript
JSON.stringify(lessonSettings);
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">📥 parse</div>

문자열 → 객체

**• JavaScript: parse 방향**

```javascript
JSON.parse(lessonJson);
```

</div>

</div>

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">lessonSettings</div><div class="wda-fnode-dsc">객체</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">JSON.stringify</div><div class="wda-fnode-dsc">문자열로 변환</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">lessonJson</div><div class="wda-fnode-dsc">JSON 문자열</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">JSON.parse</div><div class="wda-fnode-dsc">다시 객체로</div></div>
</div>

---

## 5. 배열과 중첩 객체 다루기

**• JavaScript: 배열을 JSON으로 다루기**

```javascript
const lessonList = [
  { id: 1, title: "비동기 프로그래밍" },
  { id: 2, title: "모듈" },
];

const lessonListJson = JSON.stringify(lessonList);
console.log(lessonListJson);
// [{"id":1,"title":"비동기 프로그래밍"},{"id":2,"title":"모듈"}]

const parsedList = JSON.parse(lessonListJson);
console.log(parsedList[0].title); // 비동기 프로그래밍
```

**• JavaScript: 중첩 객체를 JSON으로 다루기**

```javascript
const lessonData = {
  title: "모듈",
  settings: { viewMode: "compact", fontSize: 16 },
};

const lessonDataJson = JSON.stringify(lessonData);
const parsedData = JSON.parse(lessonDataJson);

console.log(parsedData.settings.viewMode); // compact
```

**📌 개념**

<div class="wda-callout wda-ci">
  배열이나 중첩된 객체도 stringify/parse가 그대로 통과시킨다. 값 안에 값이 몇 겹으로 들어있어도 구조가 그대로 유지된다.
</div>

---

## 6. JSON에서 사용할 수 있는 값

**▶ JSON이 표현할 수 있는 값**

| 값 종류 | 예시 |
|---|---|
| 문자열 | `"compact"` |
| 숫자 | `16` |
| boolean | `true`, `false` |
| null | `null` |
| 배열 | `[1, 2, 3]` |
| 객체 | `{"fontSize": 16}` |

**📌 개념**

<div class="wda-callout wda-ci">
  JSON은 이 6가지 값만 표현할 수 있다. 객체 문법 자체는 2-3 객체 문서에서 이미 다뤘으므로, 여기서는 "이 값이 JSON으로 표현 가능한가"만 확인한다.
</div>

---

## 7. JSON에서 사라지거나 바뀌는 값

**• JavaScript: 함수·undefined가 사라지는 것 확인하기**

```javascript
const lessonSettings = {
  viewMode: "compact",
  fontSize: 16,
  showToolbar: undefined,
  logSettings: function () {
    console.log(lessonSettings);
  },
};

const lessonJson = JSON.stringify(lessonSettings);
console.log(lessonJson);
// {"viewMode":"compact","fontSize":16}
```

**▶ stringify 시 값의 변화**

| 원래 값 | stringify 후 |
|---|---|
| 함수 | 프로퍼티 자체가 사라짐 |
| undefined | 프로퍼티 자체가 사라짐 |
| Date 객체 | 문자열로 바뀜 (8번에서 다룸) |

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  함수와 <code>undefined</code> 값을 가진 프로퍼티는 JSON 문자열을 만들 때 통째로 사라진다. 함수는 로직이라 데이터로 표현할 수 없고, <code>undefined</code>는 "값이 없음"을 뜻해 JSON이 표현하는 방식이 없기 때문이다.
</div>

---

## 8. Date 객체는 문자열로 바뀐다

**• JavaScript: Date가 문자열로 바뀌는 것 확인하기**

```javascript
const lessonData = { createdAt: new Date(2026, 2, 10) };

const lessonJson = JSON.stringify(lessonData);
console.log(lessonJson);
// 날짜 부분은 ISO 형식의 문자열로 바뀐다
// (정확한 시각은 실행 환경의 시간대에 따라 달라진다)

const parsedData = JSON.parse(lessonJson);
console.log(typeof parsedData.createdAt); // string
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>JSON.stringify</code>는 Date 객체를 문자열로 바꾼다. <code>parse</code>를 해도 다시 Date 객체가 되지는 않고 문자열 그대로 남으므로, 필요하면 <code>new Date(parsedData.createdAt)</code>처럼 직접 변환해야 한다.
</div>

---

## 9. JSON.parse 실패 대비

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">✅ 정상 JSON</div>

**• JavaScript: 정상 JSON 파싱하기**

```javascript
const jsonText =
  '{"viewMode":"compact"}';

JSON.parse(jsonText);
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">⚠️ 깨진 JSON</div>

**• JavaScript: 깨진 JSON — 에러 확인용**

```javascript
const brokenJsonText =
  "{ viewMode: 'compact' }";

// JSON.parse(brokenJsonText);
// ❌ SyntaxError (일부러 에러 확인용)
```

</div>

</div>

**▶ 흔한 JSON 형식 실수**

| 실수 | 예시 |
|---|---|
| 작은따옴표 사용 | `{ 'viewMode': 'compact' }` |
| key에 큰따옴표 누락 | `{ viewMode: "compact" }` |
| 마지막 값 뒤 쉼표(trailing comma) | `{"viewMode":"compact",}` |

**• JavaScript: try/catch로 파싱 실패 잡기**

```javascript
const brokenJsonText = "{ viewMode: 'compact' }";

try {
  JSON.parse(brokenJsonText);
} catch (error) {
  console.log("JSON 형식이 아닙니다.");
}
// JSON 형식이 아닙니다.
```

**• JavaScript: 기본값과 함께 parse 함수 만들기**

```javascript
const defaultSettings = { viewMode: "list", fontSize: 14 };

function parseLessonSettings(jsonText) {
  try {
    return JSON.parse(jsonText);
  } catch (error) {
    return defaultSettings;
  }
}

console.log(parseLessonSettings(brokenJsonText));
// { viewMode: 'list', fontSize: 14 }
```

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">jsonText</div><div class="wda-fnode-dsc">불러온 문자열</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">JSON.parse 시도</div><div class="wda-fnode-dsc">try 블록에서 실행</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">성공</div><div class="wda-fnode-dsc">객체 반환</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">실패</div><div class="wda-fnode-dsc">catch에서 기본값 반환</div></div>
</div>

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">try/catch 준비</div>
    <div class="wda-fcard-dsc">parse는 항상 try/catch로 감싼다</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">기본값 준비</div>
    <div class="wda-fcard-dsc">실패 시 돌려줄 defaultSettings를 미리 정한다</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">순환 참조 주의</div>
    <div class="wda-fcard-dsc">자기 자신을 참조하는 객체는 stringify가 실패한다</div>
  </div>
</div>

**• JavaScript: 순환 참조 객체 stringify 시도하기**

```javascript
const lessonNode = { title: "모듈" };
lessonNode.self = lessonNode;

try {
  JSON.stringify(lessonNode);
} catch (error) {
  console.log("순환 참조는 문자열로 바꿀 수 없습니다.");
}
// 순환 참조는 문자열로 바꿀 수 없습니다.
```

**📌 개념**

<div class="wda-callout wda-ci">
  객체가 자기 자신을 참조하는 <strong>순환 참조(circular reference)</strong> 구조는 stringify가 처리할 수 없어 예외를 던진다. 흔한 상황은 아니지만, 발생하면 try/catch로 감싸 안전하게 처리한다.
</div>

---

## 10. 보기 좋은 JSON 출력

**• JavaScript: 들여쓰기로 보기 좋게 출력하기**

```javascript
const lessonSettings = { viewMode: "compact", fontSize: 16 };

console.log(JSON.stringify(lessonSettings, null, 2));
// {
//   "viewMode": "compact",
//   "fontSize": 16
// }
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>JSON.stringify</code>의 세 번째 인자에 숫자를 넣으면, 그 칸 수만큼 들여쓰기하여 사람이 읽기 좋은 형태로 출력한다. 콘솔 확인이나 로그를 남길 때 유용하다.
</div>

---

## 11. 초보자가 자주 만나는 JSON 실수

<div class="wda-fgrid">

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 1 · 작은따옴표로 JSON 작성</div>

**• JavaScript: 작은따옴표로 JSON 작성하는 실수**

```javascript
const brokenJsonText = "{ 'viewMode': 'compact' }";
// JSON.parse(brokenJsonText);
// ❌ SyntaxError (일부러 에러 확인용)
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> JSON은 key와 문자열 값 모두 큰따옴표만 허용한다.<br>
  <strong>기억할 점:</strong> JSON 문자열을 직접 작성할 때는 항상 큰따옴표를 쓴다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 2 · 마지막 값 뒤에 쉼표</div>

**• JavaScript: 마지막 값 뒤에 쉼표를 남기는 실수**

```javascript
const brokenJsonText = '{"viewMode":"compact",}';
// JSON.parse(brokenJsonText);
// ❌ SyntaxError (일부러 에러 확인용)
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> JSON은 마지막 항목 뒤에 쉼표(trailing comma)를 허용하지 않는다.<br>
  <strong>기억할 점:</strong> 항목을 추가·삭제할 때 마지막 쉼표가 남지 않았는지 확인한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 3 · parse 결과를 확인 없이 사용</div>

**• JavaScript: parse 결과를 확인 없이 사용하는 실수**

```javascript
function loadSettings(jsonText) {
  return JSON.parse(jsonText);
}
// jsonText가 깨진 형식이면 예외가 그대로
// 던져져 호출한 곳까지 전달된다
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> try/catch 없이 parse만 하면 잘못된 문자열 하나로 프로그램이 멈출 수 있다.<br>
  <strong>기억할 점:</strong> parse는 항상 try/catch와 기본값 처리를 함께 준비한다.
</div>

</div>

</div>

---

## 12. 실습 과제

**🎯 목표**

강의 설정을 JSON으로 저장하고 다시 불러오는 함수를 만든다.

**📋 요구사항**

• `stringifyLessonSettings(lessonSettings)`로 객체를 JSON 문자열로 바꾼다.<br>
• `parseLessonSettings(jsonText)`로 문자열을 객체로 되돌리되, 실패하면 `defaultSettings`를 반환한다.<br>
• `JSON.stringify(value, null, 2)`로 보기 좋은 형태의 출력도 만들어본다.

**• JavaScript: 실습 구성 예시**

```javascript
// 구성 예시: stringify 함수 / try-catch와 기본값을 포함한 parse 함수 / 보기 좋은 출력
```

**💡 힌트 1 — stringifyLessonSettings**

**• JavaScript: 힌트 1 — stringifyLessonSettings**

```javascript
function stringifyLessonSettings(lessonSettings) {
  return JSON.stringify(lessonSettings);
}
```

**💡 힌트 2 — parseLessonSettings**

**• JavaScript: 힌트 2 — parseLessonSettings**

```javascript
const defaultSettings = { viewMode: "list", fontSize: 14 };

function parseLessonSettings(jsonText) {
  try {
    return JSON.parse(jsonText);
  } catch (error) {
    return defaultSettings;
  }
}
```

**💡 힌트 3 — 보기 좋은 출력**

**• JavaScript: 힌트 3 — 보기 좋은 출력**

```javascript
const lessonSettings = { viewMode: "compact", fontSize: 16 };
console.log(JSON.stringify(lessonSettings, null, 2));
```

**📌 정리 메모**

• JSON.stringify는 객체를 문자열로, JSON.parse는 문자열을 객체로 바꾼다.<br>
• 함수와 undefined는 사라지고, Date는 문자열로 바뀐다.<br>
• parse는 실패할 수 있으므로 항상 try/catch와 기본값을 함께 준비한다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>JSON은 객체를 문자열로 바꾸거나(<strong>stringify</strong>) 문자열을 객체로 되돌리는(<strong>parse</strong>) 표준 형식이며, 저장·전송처럼 텍스트가 필요한 상황에 쓴다.</li>
    <li>JSON 문자열에서는 key와 문자열 값 모두 <strong>큰따옴표</strong>가 필수이며, 작은따옴표나 trailing comma가 있으면 parse가 실패한다.</li>
    <li>JSON.stringify는 <strong>배열과 중첩 객체</strong> 구조를 그대로 유지하며, 값 안에 값이 몇 겹으로 들어있어도 통과시킨다.</li>
    <li>JSON이 표현할 수 있는 값은 <strong>문자열/숫자/boolean/null/배열/객체</strong> 6가지뿐이다.</li>
    <li><strong>함수와 undefined</strong> 값을 가진 프로퍼티는 stringify 시 사라지고, <strong>Date 객체는 문자열</strong>로 바뀐다(parse해도 다시 Date로 돌아오지 않는다).</li>
    <li>JSON.parse는 형식이 깨졌을 때 예외를 던지므로 <strong>try/catch</strong>로 감싸고, 실패 시 <strong>기본값</strong>을 대신 반환하는 방어 코드를 준비한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: JSON 문자열도 작은따옴표를 써도 된다?</div>
    <div class="wda-mistake-right">정답: key와 문자열 값 모두 <strong>큰따옴표만 허용</strong>하며, 작은따옴표는 SyntaxError의 원인이다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 객체의 함수나 undefined 값도 JSON 문자열에 그대로 남는다?</div>
    <div class="wda-mistake-right">정답: stringify 시 해당 프로퍼티가 <strong>통째로 사라진다</strong>.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Date 객체는 parse 후에도 Date 객체로 돌아온다?</div>
    <div class="wda-mistake-right">정답: stringify에서 <strong>문자열</strong>로 바뀌고 parse해도 문자열 그대로 남아, 직접 <code>new Date()</code>로 변환해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: JSON.parse는 항상 성공한다?</div>
    <div class="wda-mistake-right">정답: 형식이 깨진 문자열이면 <strong>예외를 던지므로</strong>, try/catch로 감싸야 안전하다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 변환 방향</div>
    <div class="wda-formula-block-body"><code>stringify(객체 → 문자열)</code><br><code>parse(문자열 → 객체)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 따옴표 규칙</div>
    <div class="wda-formula-block-body"><code>JSON = 큰따옴표만 허용</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 사라지는 값</div>
    <div class="wda-formula-block-body"><code>함수/undefined = 제외</code><br><code>Date = 문자열로</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · 실패 대비</div>
    <div class="wda-formula-block-body"><code>try { parse } catch { 기본값 }</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">JSON.stringify와 JSON.parse의 관계는?</div>
    <div class="wda-flip-back">stringify는 객체를 문자열로, parse는 문자열을 객체로 바꾸는 정반대 동작이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">JSON 문자열에서 key는 어떤 형식이어야 하나?</div>
    <div class="wda-flip-back">항상 큰따옴표로 감싸야 한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">JSON이 표현할 수 있는 값 6가지는?</div>
    <div class="wda-flip-back">문자열, 숫자, boolean, null, 배열, 객체다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">객체에 함수나 undefined 값이 있으면 stringify 후 어떻게 되나?</div>
    <div class="wda-flip-back">해당 프로퍼티가 통째로 사라진다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Date 객체는 JSON으로 바꾸면 어떻게 되나?</div>
    <div class="wda-flip-back">문자열로 바뀌고, parse해도 다시 Date 객체로 돌아오지 않는다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">JSON.parse가 실패하면 어떻게 대비하나?</div>
    <div class="wda-flip-back">try/catch로 감싸고 실패 시 기본값을 반환한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">순환 참조(circular reference) 객체를 stringify하면?</div>
    <div class="wda-flip-back">처리할 수 없어 예외를 던진다.</div>
  </div>
</div>
