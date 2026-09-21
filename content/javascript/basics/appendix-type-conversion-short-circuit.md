---
title: "부록: 타입 변환과 단축 평가"
status: "completed"
description: "암묵적·명시적 타입 변환, truthy/falsy, 단축 평가와 옵셔널 체이닝(?.)·null 병합(??) 연산자를 더 깊이 정리하는 1장 보충 부록이다."
category: "JavaScript"
section: "Basics"
tags:
  - javascript
  - basics
  - type-conversion
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
.wda-callout p{margin:0 0 .45rem;font-size:.9rem;line-height:1.75}
.wda-callout p:last-child{margin-bottom:0}
.wda-callout ul{margin:.35rem 0 0;padding-left:1.1rem}
.wda-callout li{margin:.24rem 0;line-height:1.75;font-size:.83rem}
.wda-callout .wda-clabel{font-size:.7rem;line-height:1.3}
/* 핵심 요약 전용 복습 UI — JavaScript 1-1~1-5 기준과 동일. 색은 background/border/accent에만
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
  • 이 부록은 기본 챕터에서 배운 것을 더 자세히 정리하는 보충 문서다.<br>
  • 1-3(데이터 타입)과 1-4(연산자)에서 다룬 타입 변환·단축 평가를 다시 반복하지 않고, 함수별 차이와 판단 기준처럼 더 깊은 지점만 정리한다.
</div>

## 🎯 학습 목표

<div class="wda-goal">
  • <strong>자동 변환 이해</strong> — 문자열/숫자 연산에서 JavaScript가 값을 자동으로 바꾸는 상황을 판단할 수 있다.<br>
  • <strong>명시적 변환 활용</strong> — String()/Number()/parseInt()/parseFloat()/Boolean()으로 원하는 타입을 직접 만들 수 있다.<br>
  • <strong>truthy/falsy 판단</strong> — falsy 값 목록을 기준으로 조건문에서 값이 어떻게 평가되는지 설명할 수 있다.<br>
  • <strong>안전한 기본값 처리</strong> — 단축 평가, optional chaining, null 병합으로 값이 없는 상황을 안전하게 처리할 수 있다.
</div>

---

## 1. 이 부록에서 다루는 것

사용자가 입력한 값은 대부분 문자열이고, 저장된 설정값은 아예 없을(`null`/`undefined`) 수도 있다. 이 부록은 이런 상황에서 타입을 맞추거나 값이 없는 곳을 안전하게 읽는 방법을 정리한다.

---

## 2. 타입 변환이 필요한 순간

**• JavaScript: 문자열과 숫자가 만나 이어붙는 경우**

```javascript
let inputAge = "25";

console.log(inputAge + 1);
// "251" — 문자열과 숫자가 만나 이어붙었다
```

숫자로 계산하고 싶다면 타입을 먼저 맞춰야 한다.

---

## 3. JavaScript가 자동으로 바꾸는 경우: 암묵적 변환

**• JavaScript: 암묵적 변환 확인하기**

```javascript
let notificationCount = 3;

console.log(notificationCount + "개");
// "3개" — + 연산자가 문자열 문맥이라 자동으로 문자열로 바뀐다
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">암묵적 변환</div>
    개발자가 시키지 않아도 JavaScript가 문맥에 맞게 자동으로 타입을 바꾼다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">명시적 변환</div>
    개발자가 <code>String()</code>, <code>Number()</code> 같은 함수로 직접 타입을 바꾼다.
  </div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  암묵적 변환은 코드를 짧게 만들지만, 어떤 타입으로 바뀔지 눈에 바로 보이지 않아 결과를 예측하기 어렵게 만들 수 있다.
</div>

---

## 4. 개발자가 직접 바꾸는 경우: 명시적 변환

명시적 변환은 원하는 타입을 함수 이름으로 직접 지정하므로 결과를 예측하기 쉽다. 대표적으로 `String()`, `Number()`, `Boolean()`을 사용한다.

---

## 5. 문자열로 바꾸기: String()

**• JavaScript: String()으로 문자열 변환하기**

```javascript
let notificationCount = 3;

console.log(String(notificationCount));
// "3"
```

---

## 6. 숫자로 바꾸기: Number() / parseInt() / parseFloat()

**▶ Number·parseInt·parseFloat 비교**

| 함수 | 특징 | 예시 | 결과 |
|---|---|---|---|
| `Number()` | 문자열 전체가 숫자여야 변환된다 | `Number("25")` | `25` |
| `Number()` | 숫자가 아닌 문자가 섞이면 `NaN` | `Number("25세")` | `NaN` |
| `parseInt()` | 앞부분만 정수로 읽고 나머지는 무시한다 | `parseInt("25세")` | `25` |
| `parseFloat()` | 앞부분을 소수까지 포함해 읽는다 | `parseFloat("3.5cm")` | `3.5` |

**• JavaScript: Number()로 숫자 변환하기**

```javascript
let inputAge = "25";

console.log(Number(inputAge));
// 25
```

---

## 7. 참/거짓으로 바꾸기: Boolean()

**• JavaScript: Boolean()으로 참/거짓 변환하기**

```javascript
let profileName = "";

console.log(Boolean(profileName));
// false — 빈 문자열은 falsy다
```

---

## 8. 조건문에서 값이 참/거짓처럼 쓰이는 방식

**• JavaScript: 조건문에서 falsy 값 확인하기**

```javascript
let profileName = "";

if (!profileName) {
  console.log("이름을 입력해주세요.");
}
// 이름을 입력해주세요.
```

---

## 9. falsy 값 목록

**▶ falsy 값 목록**

| 값 | 설명 |
|---|---|
| `false` | boolean 거짓 |
| `0`, `-0` | 숫자 0 |
| `""` | 빈 문자열 |
| `null` | 값이 없음을 명시 |
| `undefined` | 값이 정의되지 않음 |
| `NaN` | 숫자가 아님 |
| `0n` | BigInt 0 |

**📌 개념**

<div class="wda-callout wda-ci">
  이 8가지를 제외한 나머지 값은 모두 truthy로 평가된다 — 빈 배열 <code>[]</code>과 빈 객체 <code>{}</code>도 truthy다.<br>
  <code>0</code>과 <code>-0</code>은 값을 비교하면 서로 같지만, falsy 목록에서는 별개의 값으로 구분해 표기한다.
</div>

---

## 10. 값이 정해지면 멈추는 계산: 단축 평가

`&&`/`||`는 왼쪽 값만으로 결과가 이미 정해지면, 오른쪽은 아예 평가하지 않는다. 오른쪽에 함수 호출이 있어도 그 함수는 실행되지 않는다.

**• JavaScript: 단축 평가로 함수 호출 건너뛰기**

```javascript
function logCall() {
  console.log("호출됨");
  return true;
}

false && logCall();
// 아무것도 출력되지 않는다 — logCall이 아예 호출되지 않았다
```

---

## 11. &&로 조건부 실행하기

**• JavaScript: &&로 조건부 실행하기**

```javascript
let notificationCount = 3;

notificationCount > 0 && console.log("새 알림이 있습니다.");
// 새 알림이 있습니다.
```

---

## 12. ||로 기본값 넣기

**• JavaScript: ||로 기본값 넣기**

```javascript
let profileName = "";
let fallbackName = profileName || "손님";

console.log(fallbackName);
// "손님"
```

---

## 13. 안전하게 깊은 값을 읽기: optional chaining

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">❌ ?. 없이 접근</div>

**• JavaScript: ?. 없이 접근 — 에러 확인용**

```javascript
let notificationSettings = null;
console.log(notificationSettings.email);
// ❌ TypeError (일부러 에러 확인용)
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">✅ ?. 로 접근</div>

**• JavaScript: ?.로 안전하게 접근하기**

```javascript
let notificationSettings = null;
console.log(notificationSettings?.email);
// undefined
```

</div>

</div>

`?.`는 중첩된 속성에도 이어서 쓸 수 있어, 중간 단계가 없어도 에러 없이 통과한다.

**• JavaScript: 중첩 속성에 ?. 이어 쓰기**

```javascript
let userSettings = { profile: null };

console.log(userSettings.profile?.theme);
// undefined — profile이 null이어도 에러 없이 통과한다
```

**💡 보충 설명**

<div class="wda-callout wda-ci">
  <code>?.</code>는 없는 값을 안전하게 읽기 위한 도구다. 값이 있으면 원래대로 읽고, 없으면 에러 대신 <code>undefined</code>를 돌려준다.
</div>

---

## 14. null과 undefined만 따로 처리하기: null 병합

**• JavaScript: ??로 null 병합하기**

```javascript
let savedTheme = null;
let selectedTheme = savedTheme ?? "light";

console.log(selectedTheme);
// "light"
```

---

## 15. ||와 ?? 비교

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">notificationCount || 5</div>
    <code>0</code>도 falsy라서 기본값으로 바뀐다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">notificationCount ?? 5</div>
    <code>null</code>/<code>undefined</code>일 때만 기본값을 쓴다.
  </div>
</div>

**• JavaScript: ||와 ?? 결과 비교하기**

```javascript
let notificationCount = 0;

console.log(notificationCount || 5);
// 5 — 0이 falsy라서 기본값으로 바뀐다

console.log(notificationCount ?? 5);
// 0 — null/undefined가 아니므로 그대로 유지된다
```

**✅ 선택 기준**

<div class="wda-callout wda-cs">
  <code>0</code>이나 <code>""</code>처럼 값은 있지만 falsy인 값을 그대로 지켜야 한다면 <code>||</code>보다 <code>??</code>가 적합하다.
</div>

---

## 16. 초보자가 자주 만나는 변환/단축평가 실수

<div class="wda-fgrid">

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 1 · Number()로 섞인 값 변환</div>

**• JavaScript: Number()로 섞인 값 변환하는 실수**

```javascript
let inputAge = "25세";
console.log(Number(inputAge));
// NaN
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> Number()는 문자열 전체가 숫자여야 변환되고, 글자가 섞이면 NaN이 된다.<br>
  <strong>기억할 점:</strong> 앞부분만 필요하면 parseInt()를 쓴다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 2 · 문자열 "false"를 falsy로 착각</div>

**• JavaScript: 문자열 "false"를 falsy로 착각하는 실수**

```javascript
console.log(Boolean("false"));
// true
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 내용과 상관없이 비어있지만 않으면 문자열은 truthy다.<br>
  <strong>기억할 점:</strong> falsy인 문자열은 빈 문자열(<code>""</code>) 하나뿐이다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 3 · ||로 0을 지키려다 실패</div>

**• JavaScript: ||로 0을 지키려다 실패하는 실수**

```javascript
let displayCount = 0;
console.log(displayCount || 10);
// 10
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 0은 falsy라서 ||를 만나면 기본값으로 바뀐다.<br>
  <strong>기억할 점:</strong> 값을 지키려면 ??를 쓴다.
</div>

</div>

</div>

---

## 17. 실습 과제

**🎯 목표**

사용자 설정값을 안전하게 처리해 화면에 표시할 값을 만든다.

**📋 요구사항**

• `inputAge`를 `Number()`로 변환해 나이를 확인한다.<br>
• `profileName`이 비어있으면 `fallbackName`을 사용한다(`||`).<br>
• `userSettings.profile?.theme`로 테마 값을 안전하게 읽는다.<br>
• `notificationCount`가 0이어도 그대로 표시한다(`??`).

**• JavaScript: 실습 구성 예시**

```javascript
// 구성 예시: 나이 변환 / 기본 이름 처리 / 안전한 테마 읽기 / 0 유지
```

**💡 힌트 1 — 나이 변환**

**• JavaScript: 힌트 1 — 나이 변환**

```javascript
let inputAge = "25";
let age = Number(inputAge);

console.log(age);
// 25
```

**💡 힌트 2 — 기본 이름 처리**

**• JavaScript: 힌트 2 — 기본 이름 처리**

```javascript
let profileName = "";
let fallbackName = profileName || "손님";

console.log(fallbackName);
// "손님"
```

**💡 힌트 3 — 안전한 테마 읽기**

**• JavaScript: 힌트 3 — 안전한 테마 읽기**

```javascript
let userSettings = { profile: null };
let selectedTheme = userSettings.profile?.theme ?? "light";

console.log(selectedTheme);
// "light"
```

**📌 정리 메모**

• 입력값은 문자열일 수 있으므로 계산 전에 Number()로 맞춘다.<br>
• 값이 없을 수도 있는 곳은 `?.`로 안전하게 접근한다.<br>
• 0이나 ""를 지켜야 하면 `||` 대신 `??`를 쓴다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>문자열 연결(<code>+</code>)에서는 문자열로, 산술 연산에서는 숫자로, 조건식에서는 boolean으로 <strong>문맥에 따라 자동 변환</strong>된다.</li>
    <li><code>Number()</code>/<code>parseInt()</code>/<code>parseFloat()</code>는 서로 다르게 동작한다 — <code>parseInt</code>/<code>parseFloat</code>는 <strong>앞부분만</strong> 읽고, <code>Number()</code>는 <strong>전체가 숫자</strong>여야 변환된다.</li>
    <li>falsy 값은 <strong>false, 0, -0, "", null, undefined, NaN, 0n</strong> 8가지이며, 나머지는 모두 truthy다(빈 배열/빈 객체 포함).</li>
    <li><code>&&</code>/<code>||</code>는 결과가 정해지면 나머지는 <strong>평가조차 하지 않는다</strong> — 오른쪽에 함수 호출이 있어도 실행되지 않을 수 있다.</li>
    <li><code>?.</code>는 null/undefined에서도 에러 없이 통과하며 <strong>중첩된 속성에도 이어서</strong> 쓸 수 있고, <code>??</code>는 null/undefined일 때만 기본값을 사용한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Number()와 parseInt()는 같은 방식으로 변환한다?</div>
    <div class="wda-mistake-right">정답: Number()는 <strong>전체가 숫자</strong>여야 하고, parseInt()는 <strong>앞부분만</strong> 읽는다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: "false" 문자열은 falsy다?</div>
    <div class="wda-mistake-right">정답: 내용과 상관없이 비어있지 않은 문자열은 <strong>truthy</strong>다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 0을 지키려면 ||를 쓰면 된다?</div>
    <div class="wda-mistake-right">정답: 0은 falsy라 ||에서 걸러진다 — <strong>??</strong>를 써야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: &&/||의 뒤쪽 값은 항상 평가된다?</div>
    <div class="wda-mistake-right">정답: 결과가 이미 정해지면 뒤쪽은 <strong>함수 호출이라도 실행되지 않는다</strong>.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 변환 함수</div>
    <div class="wda-formula-block-body">
      <code>Number() = 전체 숫자</code><br>
      <code>parseInt() = 앞부분 정수</code><br>
      <code>parseFloat() = 앞부분 소수</code>
    </div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · falsy 8가지</div>
    <div class="wda-formula-block-body">
      <code>false / 0 / -0 / "" / null / undefined / NaN / 0n</code>
    </div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 안전 접근</div>
    <div class="wda-formula-block-body">
      <code>?. → 에러 방어(중첩 가능)</code><br>
      <code>?? → 0·"" 지키는 기본값</code>
    </div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Number()와 parseInt()의 차이는?</div>
    <div class="wda-flip-back">Number()는 전체가 숫자여야 변환되고, parseInt()는 앞부분만 정수로 읽는다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">falsy 값 8가지는?</div>
    <div class="wda-flip-back">false, 0, -0, "", null, undefined, NaN, 0n이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">"false" 문자열은 truthy? falsy?</div>
    <div class="wda-flip-back">truthy다. falsy인 문자열은 빈 문자열("")뿐이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">&&/||가 뒤쪽 값을 평가하지 않을 때는?</div>
    <div class="wda-flip-back">앞에서 이미 결과가 정해지면 뒤쪽은 함수 호출이라도 실행하지 않는다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">?.는 중첩된 속성에도 쓸 수 있나?</div>
    <div class="wda-flip-back">쓸 수 있다 — a?.b?.c처럼 이어서 사용할 수 있다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">??가 ||와 다른 점은?</div>
    <div class="wda-flip-back">??는 null/undefined일 때만 기본값을 쓰고, ||는 모든 falsy에 기본값을 쓴다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">0을 유효한 값으로 지키려면?</div>
    <div class="wda-flip-back">||가 아니라 ??를 사용한다.</div>
  </div>
</div>
