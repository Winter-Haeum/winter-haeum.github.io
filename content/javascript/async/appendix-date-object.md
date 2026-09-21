---
title: "부록: Date 객체의 모든 것"
status: "completed"
description: "Date 객체 생성, 읽기, 수정, 비교, 포맷팅의 기본 흐름을 강의 시작일·마감일 관리 시나리오로 정리한다."
category: "JavaScript"
section: "Async"
tags:
  - javascript
  - date
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
  • <strong>Date 생성</strong> — 현재 날짜와 특정 날짜를 다양한 방식으로 만들 수 있다.<br>
  • <strong>읽기와 수정</strong> — 연/월/일/시/분/초를 읽고, 필요한 부분만 바꿀 수 있다.<br>
  • <strong>비교와 계산</strong> — 두 날짜를 비교하고 그 차이를 일(day) 단위로 계산할 수 있다.<br>
  • <strong>표시하기</strong> — 날짜를 화면에 보여줄 형태로 안전하게 변환할 수 있다.
</div>

---

## 1. Date 객체가 필요한 순간

강의 시작일과 수강 마감일을 관리하다 보면 "지금이 언제인지", "이 날짜가 저 날짜보다 빠른지", "마감까지 며칠 남았는지"를 계산해야 하는 순간이 온다. JavaScript는 이런 날짜·시간 정보를 `Date` 객체로 다룬다.

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">날짜 비교</div>
    <div class="wda-fcard-dsc">강의 시작일과 오늘 날짜를 비교한다</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">기간 계산</div>
    <div class="wda-fcard-dsc">마감일까지 남은 일수를 계산한다</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">화면 표시</div>
    <div class="wda-fcard-dsc">날짜를 사람이 읽기 쉬운 형태로 바꾼다</div>
  </div>
</div>

---

## 2. 현재 날짜와 특정 날짜 만들기

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 현재 날짜</div>

**• JavaScript: 현재 날짜 만들기**

```javascript
const today = new Date();
```

실행 시점마다 값이 달라진다.

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 특정 날짜</div>

**• JavaScript: 특정 날짜 만들기**

```javascript
const lessonStartDate =
  new Date(2026, 2, 10);
```

항상 같은 날짜를 가리킨다.

</div>

</div>

**📌 개념**

<div class="wda-callout wda-ci">
  <code>new Date()</code>는 코드가 실행되는 시점의 날짜와 시간을 담은 객체를 만든다. 연/월/일 숫자를 순서대로 넣으면 원하는 날짜를 정확히 지정할 수 있다. 월이 0부터 시작한다는 점은 6번에서 자세히 다룬다.
</div>

---

## 3. 문자열 날짜와 숫자 날짜

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 문자열로 생성</div>

**• JavaScript: 문자열로 Date 생성하기**

```javascript
const lessonStartDate =
  new Date("2026-03-10");
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 숫자로 생성</div>

**• JavaScript: 숫자로 Date 생성하기**

```javascript
const lessonStartDate =
  new Date(2026, 2, 10);
```

</div>

</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  문자열로 만들 때는 <code>"YYYY-MM-DD"</code> 형식(ISO 형식)을 쓰는 것이 가장 안전하다. 다른 형식은 실행 환경에 따라 다르게 해석될 수 있다. 숫자로 만들 때는 월이 0부터 시작한다는 점을 주의해야 한다.
</div>

---

## 4. 년/월/일 읽기

**• JavaScript: 년/월/일 읽기**

```javascript
const lessonStartDate = new Date(2026, 2, 10);

console.log(lessonStartDate.getFullYear()); // 2026
console.log(lessonStartDate.getMonth());    // 2
console.log(lessonStartDate.getDate());     // 10
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>getFullYear()</code>는 연도를, <code>getDate()</code>는 일(1~31)을 그대로 반환한다. <code>getMonth()</code>는 0부터 시작하므로 3월인데 2가 나온다 — 자세한 이유는 6번에서 다룬다.
</div>

---

## 5. 시/분/초 읽기

**• JavaScript: 시/분/초 읽기**

```javascript
const lessonStartDate = new Date(2026, 2, 10, 9, 30, 0);

console.log(lessonStartDate.getHours());   // 9
console.log(lessonStartDate.getMinutes()); // 30
console.log(lessonStartDate.getSeconds()); // 0
```

**▶ Date 읽기 메서드 정리**

| 메서드 | 반환값 |
|---|---|
| `getFullYear()` | 연도 (예: 2026) |
| `getMonth()` | 월 (0~11, 0부터 시작) |
| `getDate()` | 일 (1~31) |
| `getHours()` | 시 (0~23) |
| `getMinutes()` | 분 (0~59) |
| `getSeconds()` | 초 (0~59) |

**📌 개념**

<div class="wda-callout wda-ci">
  <code>new Date(연, 월, 일, 시, 분, 초)</code>처럼 시간까지 함께 지정할 수 있다. 시/분/초는 값을 그대로 반환한다.
</div>

---

## 6. 월이 0부터 시작하는 이유를 주의하기

**• JavaScript: 월이 0부터 시작하는 것 확인하기**

```javascript
const lessonStartDate = new Date(2026, 2, 10);

console.log(lessonStartDate.getMonth());     // 2 (3월인데 2)
console.log(lessonStartDate.getMonth() + 1); // 3 (화면에 보여줄 때)
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <code>getMonth()</code>와 <code>new Date()</code>의 월 인자는 <strong>0부터 시작</strong>한다(0=1월, 11=12월). 일(day)은 그대로 1부터 시작하므로 헷갈리지 않도록 주의한다. 화면에 월을 표시할 때는 항상 <strong>+1</strong>을 해준다.
</div>

---

## 7. 날짜 수정하기

**• JavaScript: setDate로 날짜 수정하기**

```javascript
const lessonEndDate = new Date(2026, 2, 10);

lessonEndDate.setDate(lessonEndDate.getDate() + 14);

console.log(lessonEndDate.getDate()); // 24
```

**▶ Date 수정 메서드 정리**

| 메서드 | 역할 |
|---|---|
| `setFullYear(년)` | 연도를 바꾼다 |
| `setMonth(월)` | 월을 바꾼다 (0부터 시작) |
| `setDate(일)` | 일을 바꾼다 |

**📌 개념**

<div class="wda-callout wda-ci">
  <code>setDate</code>, <code>setMonth</code>, <code>setFullYear</code> 같은 메서드로 날짜의 일부를 바꿀 수 있다. 그 달의 마지막 날짜보다 큰 값을 넣으면 다음 달로 자동 보정된다(예: 2월 30일 → 3월 근처로 넘어감).
</div>

---

## 8. 날짜 비교하기

**• JavaScript: 날짜 비교하기**

```javascript
const lessonStartDate = new Date(2026, 2, 10);
const today = new Date();

console.log(today > lessonStartDate);
```

**📌 개념**

<div class="wda-callout wda-ci">
  Date 객체는 <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code> 연산자로 바로 비교할 수 있다. 내부적으로 타임스탬프(숫자)로 변환되어 비교되기 때문이다. 위 예제의 결과는 실행하는 시점에 따라 달라진다.
</div>

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">lessonStartDate</div><div class="wda-fnode-dsc">강의 시작일</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">addDays(+14)</div><div class="wda-fnode-dsc">마감일 계산</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">reviewDeadline</div><div class="wda-fnode-dsc">계산된 마감일</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">today와 비교</div><div class="wda-fnode-dsc">isExpired 판단</div></div>
</div>

---

## 9. 시간 차이 계산하기

**• JavaScript: 시간 차이 계산하기**

```javascript
const lessonStartDate = new Date(2026, 2, 10);
const lessonEndDate = new Date(2026, 2, 24);

const diff = lessonEndDate - lessonStartDate;
console.log(diff); // 1209600000

const remainingDays = diff / (1000 * 60 * 60 * 24);
console.log(remainingDays); // 14
```

**📌 개념**

<div class="wda-callout wda-ci">
  두 Date 객체를 빼면 밀리초(ms) 단위의 차이가 숫자로 나온다. 하루는 <code>1000 * 60 * 60 * 24</code>밀리초이므로, 이 값으로 나누면 일(day) 단위로 바꿀 수 있다.
</div>

---

## 10. timestamp와 getTime

**• JavaScript: getTime으로 타임스탬프 얻기**

```javascript
const lessonStartDate = new Date(2026, 2, 10);

console.log(typeof lessonStartDate.getTime()); // number
```

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">Date 객체</div><div class="wda-fnode-dsc">lessonStartDate</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">getTime()</div><div class="wda-fnode-dsc">타임스탬프(숫자)로 변환</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">두 값 비교</div><div class="wda-fnode-dsc">뺄셈으로 차이 계산</div></div>
</div>

**📌 개념**

<div class="wda-callout wda-ci">
  <code>getTime()</code>은 1970년 1월 1일부터 흐른 밀리초를 숫자로 반환한다. 이 값 자체는 실행 환경의 시간대에 따라 달라지므로 정확한 숫자를 예로 들지 않는다. 두 Date의 <code>getTime()</code> 차이(또는 두 Date를 직접 뺀 값)는 9번처럼 안정적으로 일(day) 단위 계산에 쓸 수 있다.
</div>

---

## 11. 날짜를 화면에 보여주기

**• JavaScript: 날짜를 문자열로 조립하기**

```javascript
function formatLessonDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const lessonStartDate = new Date(2026, 2, 10);
console.log(formatLessonDate(lessonStartDate)); // 2026-03-10
```

**📌 개념**

<div class="wda-callout wda-ci">
  원하는 형식이 없으면 <code>getFullYear</code>/<code>getMonth</code>/<code>getDate</code>로 값을 꺼내 직접 조립한다. <code>padStart(2, "0")</code>로 한 자리 숫자 앞에 0을 채워 두 자리로 맞춘다.
</div>

---

## 12. ISO 문자열과 locale 문자열

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 toISOString</div>

**• JavaScript: toISOString으로 표준 문자열 만들기**

```javascript
const lessonStartDate =
  new Date(2026, 2, 10);

lessonStartDate.toISOString();
// 표준 형식 문자열
// (UTC 기준으로 변환됨)
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 toLocaleDateString</div>

**• JavaScript: toLocaleDateString으로 지역 형식 만들기**

```javascript
const lessonStartDate =
  new Date(2026, 2, 10);

lessonStartDate.toLocaleDateString();
// 실행 환경 locale에 맞는
// 문자열 (예: 2026. 3. 10.)
```

</div>

</div>

**▶ 날짜 문자열 변환 메서드**

| 메서드 | 반환 형식 |
|---|---|
| `toISOString()` | 표준 ISO 문자열 (UTC 기준) |
| `toLocaleDateString()` | 실행 환경 locale에 맞는 날짜 문자열 |
| `toLocaleString()` | 실행 환경 locale에 맞는 날짜+시간 문자열 |

**📌 개념**

<div class="wda-callout wda-ci">
  <code>toISOString()</code>은 데이터 저장이나 서버 전송처럼 규격화된 문자열이 필요할 때, <code>toLocaleDateString()</code>은 화면에 사람이 읽기 편한 날짜를 보여줄 때 적합하다. 두 결과 모두 실행 환경(시간대, locale)에 따라 달라질 수 있어 정확한 문자열을 예로 들지 않는다.
</div>

---

## 13. 원본 Date 객체 변경 주의

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">⚠️ 원본 직접 수정</div>

**• JavaScript: 원본을 직접 수정하는 경우**

```javascript
lessonStartDate.setDate(
  lessonStartDate.getDate() + 14
);
// lessonStartDate 자신이 바뀐다
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">✅ 복사 후 수정</div>

**• JavaScript: 복사 후 수정하는 경우**

```javascript
const lessonEndDate =
  new Date(lessonStartDate);

lessonEndDate.setDate(
  lessonEndDate.getDate() + 14
);
// lessonStartDate는 그대로
```

</div>

</div>

**• JavaScript: 원본 유지 확인하기**

```javascript
const lessonStartDate = new Date(2026, 2, 10);
const lessonEndDate = new Date(lessonStartDate);

lessonEndDate.setDate(lessonEndDate.getDate() + 14);

console.log(lessonStartDate.getDate()); // 10 (원본 유지)
console.log(lessonEndDate.getDate());   // 24 (복사본만 변경)
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <code>setDate</code> 같은 메서드는 그 객체 자신을 직접 바꾼다. 원본을 그대로 두고 싶다면 <code>new Date(원본)</code>으로 복사한 뒤 복사본을 수정한다.
</div>

---

## 14. 초보자가 자주 만나는 Date 실수

<div class="wda-fgrid">

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 1 · 월 인자를 실제 월 그대로</div>

**• JavaScript: 월 인자를 실제 월 그대로 넣는 실수**

```javascript
const lessonStartDate = new Date(2026, 3, 10);
console.log(lessonStartDate.getMonth()); // 3
// 3월을 의도했다면 2를 넣었어야 한다
// (실제로는 4월이 만들어짐)
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 월 인자는 0부터 시작하므로 실제 월보다 1 작은 값을 넣어야 한다.<br>
  <strong>기억할 점:</strong> 3월을 만들려면 new Date(2026, 2, 10)처럼 2를 넣는다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 2 · setDate 결과를 새 변수에 저장</div>

**• JavaScript: setDate 결과를 새 변수에 저장하는 실수**

```javascript
const lessonEndDate = lessonStartDate.setDate(
  lessonStartDate.getDate() + 14
);
console.log(typeof lessonEndDate); // number
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> setDate는 Date 객체가 아니라 숫자(타임스탬프)를 반환하며, 원본도 함께 바뀐다.<br>
  <strong>기억할 점:</strong> 수정된 날짜가 필요하면 원본 변수를 그대로 사용한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 3 · 범위를 벗어난 날짜 문자열</div>

**• JavaScript: 범위를 벗어난 날짜 문자열의 결과**

```javascript
const invalidDate = new Date("2026-13-10");
console.log(invalidDate.toString());
// "Invalid Date"
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 13월처럼 존재하지 않는 값은 에러 없이 조용히 잘못된 날짜가 된다.<br>
  <strong>기억할 점:</strong> 문자열로 만든 Date는 항상 유효한지 확인하는 습관을 들인다.
</div>

</div>

</div>

---

## 15. 실습 과제

**🎯 목표**

강의 시작일로 마감일을 계산하고, 오늘 날짜와 비교해 마감 여부를 판단한다.

**📋 요구사항**

• `addDays(date, days)`로 특정 날짜에 일수를 더한 새 날짜를 반환한다(원본은 변경하지 않는다).<br>
• `isExpired(deadline)`으로 오늘이 마감일을 지났는지 판단한다.<br>
• `formatLessonDate(date)`로 날짜를 `"YYYY-MM-DD"` 형식 문자열로 만든다.

**• JavaScript: 실습 구성 예시**

```javascript
// 구성 예시: addDays(복사 후 수정) / isExpired(오늘과 비교) / formatLessonDate(문자열 조립)
```

**💡 힌트 1 — addDays (원본 유지)**

**• JavaScript: 힌트 1 — addDays (원본 유지)**

```javascript
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const lessonStartDate = new Date(2026, 2, 10);
const reviewDeadline = addDays(lessonStartDate, 14);

console.log(lessonStartDate.getDate()); // 10
console.log(reviewDeadline.getDate());  // 24
```

**💡 힌트 2 — isExpired**

**• JavaScript: 힌트 2 — isExpired**

```javascript
function isExpired(deadline) {
  const today = new Date();
  return today > deadline;
}
```

**💡 힌트 3 — formatLessonDate**

**• JavaScript: 힌트 3 — formatLessonDate**

```javascript
function formatLessonDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
```

**📌 정리 메모**

• 월 인자는 항상 0부터 시작한다는 점을 기억한다.<br>
• setDate 같은 메서드는 원본을 직접 바꾸므로, 원본을 지키려면 먼저 복사한다.<br>
• 날짜 비교와 차이 계산은 Date 객체를 숫자처럼 다룰 수 있다는 원리를 이용한다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><strong>new Date()</strong>로 현재 시각을, <strong>new Date(연, 월, 일)</strong>로 특정 날짜를 만든다. 문자열로 만들 때는 <strong>"YYYY-MM-DD"</strong> 형식이 가장 안전하다.</li>
    <li><strong>getMonth()</strong>와 <code>new Date()</code>의 월 인자는 <strong>0부터 시작</strong>한다(0=1월, 11=12월). 일/시/분/초는 그대로의 값을 쓴다.</li>
    <li><strong>setDate/setMonth</strong> 같은 set 메서드는 <strong>원본 객체를 직접 바꾼다</strong>. 원본을 지키려면 <code>new Date(원본)</code>으로 복사한 뒤 수정한다.</li>
    <li>Date 객체는 <strong>&gt;, &lt;, &gt;=, &lt;=</strong>로 바로 비교할 수 있고, 두 Date를 빼면 <strong>밀리초 단위의 차이</strong>가 숫자로 반환된다.</li>
    <li><strong>getTime()</strong>은 1970년 1월 1일부터 흐른 밀리초를 반환하며, 날짜 차이를 일(day) 단위로 바꿀 때 <code>1000*60*60*24</code>로 나눈다.</li>
    <li><strong>toISOString()</strong>은 표준 형식의 문자열을, <strong>toLocaleDateString()</strong>은 실행 환경에 맞는 사람이 읽기 쉬운 문자열을 반환한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 3월을 만들려면 new Date(2026, 3, 10)처럼 3을 넣는다?</div>
    <div class="wda-mistake-right">정답: 월은 <strong>0부터 시작</strong>하므로 3월은 <strong>2</strong>를 넣어야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: setDate의 반환값을 새 변수에 담으면 새 Date 객체가 된다?</div>
    <div class="wda-mistake-right">정답: set 메서드는 <strong>숫자(타임스탬프)</strong>를 반환하며, 원본 객체 자체가 바뀐다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: new Date(원본 변수)로 만든 값을 수정해도 원본이 함께 바뀐다?</div>
    <div class="wda-mistake-right">정답: <code>new Date(원본)</code>은 <strong>새로운 복사본</strong>을 만들므로, 복사본을 수정해도 원본은 그대로다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 날짜 문자열은 어떤 형식으로 적어도 항상 똑같이 해석된다?</div>
    <div class="wda-mistake-right">정답: 형식에 따라 해석이 달라질 수 있으므로 <strong>"YYYY-MM-DD"</strong> 같은 표준 형식을 쓰는 것이 안전하다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 생성</div>
    <div class="wda-formula-block-body"><code>new Date(연, 월-1, 일)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 비교/차이</div>
    <div class="wda-formula-block-body"><code>d2 - d1 = 밀리초 차이</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 일 단위 변환</div>
    <div class="wda-formula-block-body"><code>ms / (1000*60*60*24)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · 원본 보호</div>
    <div class="wda-formula-block-body"><code>new Date(원본) 후 수정</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">new Date(2026, 2, 10)은 몇 월 며칠을 의미하나?</div>
    <div class="wda-flip-back">2026년 3월 10일. 월은 0부터 시작하므로 2는 3월이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">getMonth()가 0부터 시작하는 값은 무엇이고, 그대로인 값은 무엇인가?</div>
    <div class="wda-flip-back">월은 0부터 시작하고, 일/시/분/초는 그대로의 값이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">두 Date 객체를 뺄셈하면 무엇이 반환되나?</div>
    <div class="wda-flip-back">두 날짜 사이의 차이가 밀리초(ms) 단위 숫자로 반환된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">setDate 같은 set 메서드를 쓰면 원본은 어떻게 되나?</div>
    <div class="wda-flip-back">원본 객체 자신이 직접 바뀐다(mutable).</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">원본을 바꾸지 않고 새 날짜를 만들려면?</div>
    <div class="wda-flip-back">new Date(원본)으로 복사한 뒤 복사본을 수정한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">toISOString과 toLocaleDateString의 차이는?</div>
    <div class="wda-flip-back">toISOString은 표준 형식 문자열, toLocaleDateString은 실행 환경에 맞는 사람이 읽기 쉬운 문자열을 반환한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Date 객체를 문자열로 만들 때 가장 안전한 형식은?</div>
    <div class="wda-flip-back">"YYYY-MM-DD" 같은 ISO 표준 형식이다.</div>
  </div>
</div>
