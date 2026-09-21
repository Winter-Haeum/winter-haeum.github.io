---
title: "부록: 생성자 함수로 객체 여러 개 만들기"
status: "completed"
description: "같은 구조의 객체를 여러 개 만드는 생성자 함수의 문법과 new 호출 흐름, class와의 관계를 정리하는 보충 부록이다."
category: "JavaScript"
section: "ES6+"
tags:
  - javascript
  - constructor-function
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
/* 핵심 요약 전용 복습 UI — JavaScript 1-1~1-5·2-1~2-3·4-3·4-4 기준과 동일. 색은 background/border/accent에만
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
  • 이 부록은 같은 구조의 객체를 여러 개 만드는 생성자 함수를 정리하는 보충 자료다.<br>
  • 4-4(this 바인딩)에서 다룬 생성자 함수의 this는 반복하지 않고, 생성자 함수의 사용 목적과 new 호출 흐름에 집중한다.
</div>

## 🎯 학습 목표

<div class="wda-goal">
  • <strong>생성자 함수 필요성 이해</strong> — 같은 구조의 객체를 여러 개 만들 때 생성자 함수가 왜 필요한지 설명할 수 있다.<br>
  • <strong>new 호출 흐름 이해</strong> — new로 호출했을 때 새 객체가 만들어지고 this가 그 객체를 가리키는 흐름을 설명할 수 있다.<br>
  • <strong>독립성 이해</strong> — 생성자 함수로 만든 여러 객체가 서로 독립된 값을 가진다는 것을 확인할 수 있다.<br>
  • <strong>class와의 관계 이해</strong> — 생성자 함수와 class가 같은 목적을 가진 서로 다른 문법이라는 것을 안다.
</div>

---

## 1. 생성자 함수가 필요한 순간

강의가 한두 개뿐이라면 객체 리터럴로 충분하다. 하지만 강의가 수십 개라면, 매번 같은 구조를 직접 반복해서 적어야 한다.

---

## 2. 객체 리터럴을 반복하면 생기는 문제

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">❌ 객체 리터럴 반복</div>

구조가 같아도 매번 전부 다시 적어야 한다.

**• JavaScript: 객체 리터럴 반복하기**

```javascript
const firstLesson = {
  lessonTitle: "변수와 스코프",
};
const secondLesson = {
  lessonTitle: "배열 다루기",
};
```

</div>

<div class="wda-compare-card wda-modern">

<div class="wda-compare-ttl">✅ 생성자 함수 사용</div>

구조는 함수 하나로 정의하고, 값만 바꿔 넣는다.

**• JavaScript: 생성자 함수 사용하기**

```javascript
function LessonCard(lessonTitle) {
  this.lessonTitle = lessonTitle;
}

const firstLesson = new LessonCard(
  "변수와 스코프"
);
const secondLesson = new LessonCard(
  "배열 다루기"
);
```

</div>

</div>

---

## 3. 생성자 함수는 같은 구조의 객체를 만드는 함수다

**• JavaScript: 생성자 함수 정의하기**

```javascript
function LessonCard(lessonTitle, teacherName, durationMinutes) {
  this.lessonTitle = lessonTitle;
  this.teacherName = teacherName;
  this.durationMinutes = durationMinutes;
}
```

매개변수로 받은 값을 `this`에 채워 넣어, 같은 구조의 객체를 반복해서 만들 수 있게 하는 함수다.

---

## 4. 생성자 함수 이름과 new

**• JavaScript: new로 생성자 함수 호출하기**

```javascript
const firstLesson = new LessonCard("변수와 스코프", "지수", 40);

console.log(firstLesson);
// LessonCard {
//   lessonTitle: '변수와 스코프',
//   teacherName: '지수',
//   durationMinutes: 40
// }
```

**✅ 선택 기준**

<div class="wda-callout wda-cs">
  생성자 함수 이름은 <strong>대문자로 시작</strong>하는 것이 관례다(<code>LessonCard</code>). 일반 함수와 구분해, "이 함수는 <code>new</code>로 호출해야 한다"는 신호를 준다.
</div>

---

## 5. 생성자 함수 안의 this

**• JavaScript: 생성자 함수 안의 this**

```javascript
function LessonCard(lessonTitle) {
  this.lessonTitle = lessonTitle;
}
```

`this.lessonTitle = lessonTitle`처럼, 매개변수로 받은 값을 `this`에 담아 새 객체를 채운다.

---

## 6. new로 호출될 때 일어나는 일

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">빈 객체 생성</div><div class="wda-fnode-dsc">new가 새 객체를 하나 만든다.</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">this 연결</div><div class="wda-fnode-dsc">this가 그 새 객체를 가리킨다.</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">함수 본문 실행</div><div class="wda-fnode-dsc">this에 property를 채운다.</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">객체 반환</div><div class="wda-fnode-dsc">채워진 객체가 자동으로 반환된다.</div></div>
</div>

**• JavaScript: new 호출 흐름 확인하기**

```javascript
function LessonCard(lessonTitle) {
  this.lessonTitle = lessonTitle;
}

const firstLesson = new LessonCard("변수와 스코프");

console.log(firstLesson.lessonTitle);
// 변수와 스코프
```

---

## 7. 생성자 함수로 만든 객체는 서로 독립된 값을 가진다

**• JavaScript: 생성자 함수로 만든 객체 독립성 확인하기**

```javascript
const firstLesson = new LessonCard("변수와 스코프", "지수", 40);
const secondLesson = new LessonCard("배열 다루기", "민호", 55);

firstLesson.durationMinutes = 45;

console.log(firstLesson.durationMinutes);
// 45

console.log(secondLesson.durationMinutes);
// 55 — 서로 다른 객체라 영향을 주지 않는다
```

---

## 8. new를 빼먹으면 생기는 문제

**• JavaScript: new 없이 호출하는 경우**

```javascript
function LessonCard(lessonTitle) {
  this.lessonTitle = lessonTitle;
}

const brokenLesson = LessonCard("변수와 스코프");

console.log(brokenLesson);
// undefined — new 없이 호출하면 새 객체가 만들어지지 않는다
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <code>new</code>를 빼먹지 않는다. <code>new</code> 없이 호출하면 새 객체가 만들어지지 않고, <code>this</code>는 일반 함수 호출 규칙을 따라 다른 값을 가리킨다.
</div>

---

## 9. 일반 함수와 생성자 함수 비교

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">일반 함수(팩토리 함수)</div>

객체를 만들어 직접 반환한다.

**• JavaScript: 팩토리 함수 방식**

```javascript
function createLessonCard(lessonTitle) {
  return { lessonTitle };
}

const firstLesson = createLessonCard(
  "변수와 스코프"
);
console.log(firstLesson);
// { lessonTitle: '변수와 스코프' }
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">생성자 함수</div>

new가 객체 생성과 반환을 대신 처리한다.

**• JavaScript: 생성자 함수 방식**

```javascript
function LessonCard(lessonTitle) {
  this.lessonTitle = lessonTitle;
}

const secondLesson = new LessonCard(
  "배열 다루기"
);
console.log(secondLesson);
// LessonCard { lessonTitle: '배열 다루기' }
```

</div>

</div>

**▶ 일반 함수(팩토리 함수) vs 생성자 함수**

| 구분 | 일반 함수(팩토리 함수) | 생성자 함수 |
|---|---|---|
| 호출 방식 | 그냥 호출한다 | `new`로 호출한다 |
| 객체 생성 | `return`으로 직접 반환한다 | `new`가 자동으로 만들고 반환한다 |
| 이름 관례 | camelCase | PascalCase |

---

## 10. 메서드를 생성자 함수 안에 넣을 때의 주의

**• JavaScript: 생성자 함수 안에 메서드 넣기**

```javascript
function LessonCard(lessonTitle) {
  this.lessonTitle = lessonTitle;
  this.showLessonInfo = function () {
    console.log(this.lessonTitle);
  };
}
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  이렇게 메서드를 생성자 함수 안에서 매번 새로 만들면, <code>new</code>로 객체를 만들 때마다 <strong>내용이 같은 함수가 각각 따로</strong> 생성되어 메모리를 낭비한다. 여러 객체가 메서드를 공유하게 만드는 방법도 있지만, 이 부록에서는 다루지 않는다.
</div>

---

## 11. instanceof로 확인하기

**• JavaScript: instanceof로 생성자 확인하기**

```javascript
const firstLesson = new LessonCard("변수와 스코프");

console.log(firstLesson instanceof LessonCard);
// true
```

`instanceof`로 어떤 생성자 함수에서 만들어진 객체인지 확인할 수 있다.

---

## 12. class와의 관계 짧게 보기

**• JavaScript: class로 같은 결과 만들기**

```javascript
class LessonCardClass {
  constructor(lessonTitle) {
    this.lessonTitle = lessonTitle;
  }
}

const firstLesson = new LessonCardClass("변수와 스코프");

console.log(firstLesson.lessonTitle);
// 변수와 스코프
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>class</code>는 생성자 함수와 <strong>같은 목적을 더 읽기 쉽게 표현하는 현대 문법</strong>이다. 결과는 같지만, 자세한 문법은 별도로 다룬다.
</div>

---

## 13. 초보자가 자주 만나는 생성자 함수 실수

<div class="wda-fgrid">

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 1 · new를 빼먹기</div>

**• JavaScript: new를 빼먹는 실수**

```javascript
const brokenLesson = LessonCard("변수와 스코프");
console.log(brokenLesson);
// undefined
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> new가 없으면 새 객체가 만들어지지 않는다.<br>
  <strong>기억할 점:</strong> 생성자 함수는 항상 new로 호출한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 2 · 소문자로 시작하는 이름</div>

**• JavaScript: 소문자로 시작하는 이름 사용하는 실수**

```javascript
function lessonCard(lessonTitle) {
  this.lessonTitle = lessonTitle;
}
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 일반 함수와 구분되지 않아 new를 빼먹기 쉬워진다.<br>
  <strong>기억할 점:</strong> 생성자 함수 이름은 대문자로 시작한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 3 · 화살표 함수로 생성자 만들기</div>

**• JavaScript: 화살표 함수로 생성자 만드는 실수**

```javascript
const LessonCardArrow = (lessonTitle) => {
  this.lessonTitle = lessonTitle;
};

new LessonCardArrow("변수와 스코프");
// ❌ TypeError (일부러 에러 확인용)
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 화살표 함수는 자신만의 this가 없어 new로 호출할 수 없다.<br>
  <strong>기억할 점:</strong> 생성자 함수는 반드시 일반 함수로 만든다.
</div>

</div>

</div>

---

## 14. 실습 과제

**🎯 목표**

생성자 함수로 강의 카드 여러 개를 만들고, 서로 독립적인지 확인한다.

**📋 요구사항**

• `LessonCard(lessonTitle, teacherName)` 생성자 함수를 만든다.<br>
• `new`로 서로 다른 강의 카드 두 개를 만든다.<br>
• 한쪽 값을 바꿔도 다른 쪽에 영향이 없는지 확인한다.<br>
• `instanceof`로 만들어진 객체가 맞는지 확인한다.

**• JavaScript: 실습 구성 예시**

```javascript
// 구성 예시: 생성자 함수 정의 / new로 두 객체 생성 / 값 변경 후 독립성 확인 / instanceof 확인
```

**💡 힌트 1 — 생성자 함수 정의**

**• JavaScript: 힌트 1 — 생성자 함수 정의**

```javascript
function LessonCard(lessonTitle, teacherName) {
  this.lessonTitle = lessonTitle;
  this.teacherName = teacherName;
}

const firstLesson = new LessonCard("변수와 스코프", "지수");

console.log(firstLesson.lessonTitle);
// 변수와 스코프
```

**💡 힌트 2 — 독립성 확인**

**• JavaScript: 힌트 2 — 독립성 확인**

```javascript
const secondLesson = new LessonCard("배열 다루기", "민호");

firstLesson.teacherName = "도윤";

console.log(firstLesson.teacherName);
// 도윤

console.log(secondLesson.teacherName);
// 민호
```

**💡 힌트 3 — instanceof 확인**

**• JavaScript: 힌트 3 — instanceof 확인**

```javascript
console.log(firstLesson instanceof LessonCard);
// true
```

**📌 정리 메모**

• 생성자 함수는 항상 new로 호출한다.<br>
• new로 만든 객체는 서로 독립된 값을 가진다.<br>
• 이름은 대문자로 시작하는 것이 관례다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>같은 구조의 객체를 여러 개 만들 때는 객체 리터럴 반복 대신 <strong>생성자 함수</strong>를 사용한다.</li>
    <li>생성자 함수 이름은 <strong>대문자로 시작</strong>하는 관례가 있다(예: <code>LessonCard</code>).</li>
    <li><code>new</code>로 호출하면 <strong>새 객체가 만들어지고</strong>, 함수 안의 <code>this</code>는 그 새 객체를 가리킨다.</li>
    <li>생성자 함수로 만든 <strong>여러 객체는 서로 독립된 값</strong>을 가진다 — 하나를 바꿔도 다른 것에 영향을 주지 않는다.</li>
    <li><strong>new를 빼먹으면</strong> 새 객체가 만들어지지 않는다.</li>
    <li><strong>instanceof</strong>로 어떤 생성자 함수에서 만든 객체인지 확인할 수 있다.</li>
    <li><strong>class</strong>는 생성자 함수와 같은 목적을 더 읽기 쉽게 표현하는 현대 문법이다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 생성자 함수는 new 없이 호출해도 똑같이 동작한다?</div>
    <div class="wda-mistake-right">정답: new가 없으면 <strong>새 객체가 만들어지지 않는다</strong>.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 생성자 함수로 만든 객체들은 값을 공유한다?</div>
    <div class="wda-mistake-right">정답: 각 객체는 <strong>서로 독립된 값</strong>을 가진다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 화살표 함수로도 생성자 함수를 만들 수 있다?</div>
    <div class="wda-mistake-right">정답: 화살표 함수는 <strong>자신만의 this가 없어</strong> new로 호출할 수 없다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 이름 관례</div>
    <div class="wda-formula-block-body"><code>생성자 함수 = 대문자 시작</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · new 흐름</div>
    <div class="wda-formula-block-body"><code>new = 새 객체 생성 + this 연결 + 자동 반환</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 확인</div>
    <div class="wda-formula-block-body"><code>instanceof = 어떤 생성자로 만들었는지 확인</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">생성자 함수가 필요한 이유는?</div>
    <div class="wda-flip-back">같은 구조의 객체를 여러 개 만들 때 객체 리터럴 반복을 피하기 위해서다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">생성자 함수 이름은 보통 어떻게 짓나?</div>
    <div class="wda-flip-back">대문자로 시작한다(PascalCase).</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">new로 호출하면 무슨 일이 일어나나?</div>
    <div class="wda-flip-back">새 객체가 만들어지고, this가 그 객체를 가리키며, 함수 본문 실행 후 자동으로 반환된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">new를 빼먹으면?</div>
    <div class="wda-flip-back">새 객체가 만들어지지 않는다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">생성자 함수로 만든 객체들은 값을 공유하나?</div>
    <div class="wda-flip-back">공유하지 않는다 — 서로 독립된 값을 가진다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">instanceof는 무엇을 확인하나?</div>
    <div class="wda-flip-back">어떤 생성자 함수로 만들어진 객체인지 확인한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">class는 생성자 함수와 어떤 관계인가?</div>
    <div class="wda-flip-back">같은 목적을 더 읽기 쉽게 표현하는 현대 문법이다.</div>
  </div>
</div>
