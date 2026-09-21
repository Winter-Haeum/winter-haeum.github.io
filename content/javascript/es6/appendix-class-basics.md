---
title: "부록: 클래스 다루기"
status: "completed"
description: "class 선언, constructor, method, instance 등 class 기본 문법을 강의 카드 예제로 정리하고, extends/super/static을 짧게 맛보는 보충 부록이다."
category: "JavaScript"
section: "ES6+"
tags:
  - javascript
  - class
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

**📎 부록(Appendix)**

<div class="wda-callout wda-ci">
  • 이 부록은 생성자 함수 부록 다음에 읽는 보충 자료로, class의 기본 문법만 정리한다.<br>
  • extends/super/static은 짧게만 다루고, prototype 심화나 private field, React class component는 다루지 않는다.
</div>

---

## 1. class가 필요한 순간

강의 카드를 여러 개 만들어야 한다고 해봅시다. 강의마다 제목, 강사, 학습 시간은 다르지만, 만드는 방식과 사용하는 기능(요약 보기 등)은 항상 같아야 합니다.

생성자 함수 부록에서는 `function`과 `this`로 이런 객체를 만드는 방법을 다뤘습니다. class는 **같은 목적을 더 읽기 쉬운 문법으로 표현**합니다.

**• JavaScript: class로 강의 카드 만들기**

```js
class CourseCard {
  constructor(courseTitle, instructorName, totalMinutes) {
    this.courseTitle = courseTitle;
    this.instructorName = instructorName;
    this.totalMinutes = totalMinutes;
  }

  getSummary() {
    return `${this.courseTitle} - ${this.instructorName} (${this.totalMinutes}분)`;
  }
}
```

---

## 2. class는 객체를 만들기 위한 문법이다

class 자체는 값이 아니라 **객체를 찍어내는 틀**입니다. class를 선언하는 것만으로는 아무 객체도 만들어지지 않고, `new`로 호출해야 비로소 객체(인스턴스)가 생깁니다.

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">class 선언</div>
    <div class="wda-fcard-dsc">어떤 값과 기능을 가질지 정의만 해둔 상태.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">new 호출</div>
    <div class="wda-fcard-dsc">정의를 바탕으로 실제 객체(instance)를 만드는 시점.</div>
  </div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  class는 객체 생성을 더 읽기 좋게 표현하는 문법입니다. 결과적으로 만들어지는 것은 이전과 같은 객체입니다.
</div>

---

## 3. 생성자 함수와 class의 관계

생성자 함수와 class는 **같은 결과를 만드는 다른 문법**입니다. 아래는 같은 역할을 하는 두 코드입니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">생성자 함수</div>

**• JavaScript: 생성자 함수 방식**

```js
function CourseCard(courseTitle) {
  this.courseTitle = courseTitle;
}

CourseCard.prototype.getSummary = function () {
  return this.courseTitle;
};
```
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">class</div>

**• JavaScript: class 방식**

```js
class CourseCard {
  constructor(courseTitle) {
    this.courseTitle = courseTitle;
  }

  getSummary() {
    return this.courseTitle;
  }
}
```
  </div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  두 코드 모두 <code>new CourseCard(...)</code>로 객체를 만들고 <code>getSummary()</code>를 호출할 수 있습니다. class는 <code>function</code>과 <code>prototype</code>을 따로 쓰지 않고, 한 블록 안에 constructor와 method를 모아 씁니다.
</div>

---

## 4. class 선언하기

**• JavaScript: class 선언하기**

```js
class CourseCard {
  // constructor와 method는 이 블록 안에 작성한다
}
```

**💡 설명**

<div class="wda-callout wda-ci">
  class 이름은 문법상 필수는 아니지만, 관례적으로 <strong>대문자로 시작</strong>합니다(<code>CourseCard</code>). 일반 변수와 구분해 "이 이름은 new로 호출하는 class"라는 신호를 줍니다.
</div>

---

## 5. constructor로 초기값 받기

`constructor`는 `new`로 인스턴스를 만들 때 자동으로 실행되는 메서드입니다. 이름은 항상 `constructor`로 고정입니다.

**• JavaScript: constructor로 초기값 받기**

```js
class CourseCard {
  constructor(courseTitle, instructorName, totalMinutes) {
    this.courseTitle = courseTitle;
    this.instructorName = instructorName;
    this.totalMinutes = totalMinutes;
  }
}
```

**💡 설명**

<div class="wda-callout wda-ci">
  constructor는 new 호출 시 실행됩니다. 매개변수로 받은 값을 <code>this.속성 = 값</code> 형태로 담아 인스턴스를 채우는 역할을 합니다.
</div>

---

## 6. new로 instance 만들기

`new CourseCard(...)`를 호출하면 constructor가 실행되면서 새 객체(instance)가 만들어집니다.

**• JavaScript: new로 instance 만들기**

```js
const firstCourse = new CourseCard('변수와 자료형', '지수', 30);
const secondCourse = new CourseCard('배열과 객체', '민호', 50);

console.log(firstCourse);
// CourseCard { courseTitle: '변수와 자료형', instructorName: '지수', totalMinutes: 30 }

console.log(firstCourse instanceof CourseCard); // true
```

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">class 선언</div><div class="wda-fnode-dsc">CourseCard 정의</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">new 호출</div><div class="wda-fnode-dsc">new CourseCard(...)</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">constructor 실행</div><div class="wda-fnode-dsc">전달값을 this에 담음</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">instance 생성</div><div class="wda-fnode-dsc">firstCourse 완성</div></div>
</div>

**• JavaScript: new 없이 class 호출 — 에러 확인용**

```js
// 일부러 에러 확인용: new 없이 class를 호출하면 에러가 난다
try {
  const brokenCourse = CourseCard('제목 없음', '담당자 없음', 0);
} catch (error) {
  console.log(error instanceof TypeError); // true
}
```

---

## 7. this로 instance 값 사용하기

class 안에서 `this`는 **new로 만들어지는 바로 그 instance**를 가리킵니다.

**• JavaScript: class 안의 this 확인하기**

```js
class CourseCard {
  constructor(courseTitle, instructorName, totalMinutes) {
    this.courseTitle = courseTitle; // this = 지금 만들어지는 instance
    this.instructorName = instructorName;
    this.totalMinutes = totalMinutes;
  }
}

const firstCourse = new CourseCard('변수와 자료형', '지수', 30);
console.log(firstCourse.courseTitle); // '변수와 자료형'
```

**💡 설명**

<div class="wda-callout wda-ci">
  constructor와 method 안의 <code>this</code>는 그 instance 자신을 가리킵니다. this가 호출 방식에 따라 달라지는 자세한 내용은 4-4 this 바인딩 문서에서 다룹니다. 이 부록에서는 "class 안의 this는 instance"라는 점만 기억하면 충분합니다.
</div>

---

## 8. class method 만들기

method는 `function` 키워드 없이 constructor 아래에 바로 작성합니다.

**• JavaScript: class method 만들기**

```js
class CourseCard {
  constructor(courseTitle, instructorName, totalMinutes) {
    this.courseTitle = courseTitle;
    this.instructorName = instructorName;
    this.totalMinutes = totalMinutes;
  }

  getSummary() {
    return `${this.courseTitle} - ${this.instructorName} (${this.totalMinutes}분)`;
  }

  updateDuration(nextMinutes) {
    this.totalMinutes = nextMinutes;
  }
}

const firstCourse = new CourseCard('변수와 자료형', '지수', 30);
console.log(firstCourse.getSummary());
// 변수와 자료형 - 지수 (30분)
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  method와 method 사이에는 <strong>콤마(,)를 쓰지 않습니다.</strong> 객체 리터럴과 헷갈려 콤마를 찍으면 <code>SyntaxError</code>가 발생합니다.
</div>

---

## 9. 여러 instance는 독립된 값을 가진다

같은 class로 만든 instance라도 서로 다른 값을 따로 가지며, 한쪽을 바꿔도 다른 쪽에는 영향이 없습니다.

**• JavaScript: instance 독립성 확인하기**

```js
const firstCourse = new CourseCard('변수와 자료형', '지수', 30);
const secondCourse = new CourseCard('배열과 객체', '민호', 50);

firstCourse.updateDuration(45);

console.log(firstCourse.totalMinutes);  // 45
console.log(secondCourse.totalMinutes); // 50 (영향 없음)
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">firstCourse</div>
    courseTitle: '변수와 자료형', totalMinutes: 45
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">secondCourse</div>
    courseTitle: '배열과 객체', totalMinutes: 50
  </div>
</div>

---

## 10. method와 property 구분하기

`courseTitle`, `totalMinutes`처럼 instance가 가진 **값**은 property, `getSummary`, `updateDuration`처럼 instance가 가진 **동작**은 method입니다.

**• JavaScript: property와 method 구분하기**

```js
console.log(typeof firstCourse.courseTitle);  // 'string'  (property)
console.log(typeof firstCourse.getSummary);   // 'function' (method)
```

**▶ property vs method**

<table class="wda-mtable">
  <tr>
    <th>구분</th>
    <th>의미</th>
    <th>예시</th>
  </tr>
  <tr>
    <td><strong>property</strong></td>
    <td>instance가 가진 값</td>
    <td>courseTitle, totalMinutes</td>
  </tr>
  <tr>
    <td><strong>method</strong></td>
    <td>instance가 실행할 수 있는 동작</td>
    <td>getSummary(), updateDuration()</td>
  </tr>
</table>

---

## 11. extends와 super 짧게 보기

`extends`로 기존 class를 물려받고, `super(...)`로 부모의 constructor를 실행할 수 있습니다.

**• JavaScript: extends와 super로 상속하기**

```js
class FeaturedCourseCard extends CourseCard {
  constructor(courseTitle, instructorName, totalMinutes, badgeLabel) {
    super(courseTitle, instructorName, totalMinutes); // 부모 constructor 실행
    this.badgeLabel = badgeLabel;
  }

  getSummary() {
    return `[${this.badgeLabel}] ${super.getSummary()}`;
  }
}

const featured = new FeaturedCourseCard('비동기 프로그래밍', '유리', 60, '인기');
console.log(featured.getSummary());
// [인기] 비동기 프로그래밍 - 유리 (60분)

console.log(featured instanceof CourseCard); // true
```

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">extends</div><div class="wda-fnode-dsc">CourseCard를 물려받음</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">super(...)</div><div class="wda-fnode-dsc">부모 constructor 실행</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">기존 값 초기화</div><div class="wda-fnode-dsc">courseTitle 등 설정됨</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">추가 값 설정</div><div class="wda-fnode-dsc">badgeLabel 설정</div></div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  자식 constructor에서 <code>this</code>를 사용하기 전에 반드시 <code>super(...)</code>를 먼저 호출해야 합니다.
</div>

---

## 12. static method 짧게 보기

`static`이 붙은 메서드는 instance가 아니라 **class 이름으로 직접** 호출합니다.

**• JavaScript: static method 만들기**

```js
class CourseCard {
  constructor(courseTitle, instructorName, totalMinutes) {
    this.courseTitle = courseTitle;
    this.instructorName = instructorName;
    this.totalMinutes = totalMinutes;
  }

  getSummary() {
    return `${this.courseTitle} - ${this.instructorName} (${this.totalMinutes}분)`;
  }

  static createDefault() {
    return new CourseCard('제목 미정', '담당자 미정', 0);
  }
}

const emptyCourse = CourseCard.createDefault();
console.log(emptyCourse.getSummary());
// 제목 미정 - 담당자 미정 (0분)
```

**💡 설명**

<div class="wda-callout wda-ci">
  static method는 instance가 아니라 class 이름으로 호출합니다. <code>emptyCourse.createDefault()</code>처럼 instance에서는 호출할 수 없습니다.
</div>

---

## 13. 초보자가 자주 만나는 class 실수

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">new를 빼먹기</div>
    <div class="wda-fcard-dsc">class는 new 없이 호출하면 에러가 납니다. 생성자 함수와 달리 조용히 undefined를 반환하지 않습니다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">method 사이에 콤마 찍기</div>
    <div class="wda-fcard-dsc">객체 리터럴 습관대로 콤마를 찍으면 SyntaxError가 발생합니다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">super() 호출 전에 this 사용</div>
    <div class="wda-fcard-dsc">extends한 자식 class는 super()를 먼저 호출해야 this를 쓸 수 있습니다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">static method를 instance로 호출</div>
    <div class="wda-fcard-dsc">static method는 class 이름으로만 호출할 수 있고, instance에서는 호출할 수 없습니다.</div>
  </div>
</div>

**▶ class 실수와 발생 결과**

<table class="wda-mtable">
  <tr>
    <th>실수</th>
    <th>결과</th>
  </tr>
  <tr>
    <td>new 없이 호출</td>
    <td>TypeError 발생</td>
  </tr>
  <tr>
    <td>method 사이 콤마</td>
    <td>SyntaxError 발생</td>
  </tr>
  <tr>
    <td>super() 호출 전 this 사용</td>
    <td>ReferenceError 발생</td>
  </tr>
  <tr>
    <td>static method를 instance로 호출</td>
    <td>TypeError 발생(해당 메서드 없음)</td>
  </tr>
</table>

---

## 14. 실습 과제

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <strong>🎯 목표</strong><br>
  CourseCard class를 완성하고, 여러 instance를 만들어 동작을 확인해 보세요.
</div>

**📋 요구사항**

- `CourseCard` class에 `courseTitle`, `instructorName`, `totalMinutes`를 받는 constructor를 작성하세요.
- 세 값을 한 문장으로 반환하는 `getSummary()` method를 작성하세요.
- `totalMinutes`를 바꾸는 `updateDuration(nextMinutes)` method를 작성하세요.
- `firstCourse`, `secondCourse` 두 instance를 만들고, 한쪽만 시간을 바꿔 서로 영향이 없는지 확인하세요.

**• JavaScript: 실습 구성 예시**

```js
class CourseCard {
  // TODO: constructor를 작성하세요

  // TODO: getSummary()를 작성하세요

  // TODO: updateDuration(nextMinutes)를 작성하세요
}

const firstCourse = new CourseCard('변수와 자료형', '지수', 30);
const secondCourse = new CourseCard('배열과 객체', '민호', 50);
```

**💡 힌트 1**

constructor의 매개변수를 그대로 `this.속성 = 값` 형태로 담아야 나중에 method에서 꺼내 쓸 수 있습니다.

**💡 힌트 2**

`getSummary()`는 새 값을 받지 않고, `this`에 이미 저장된 값만 사용해서 문자열을 만듭니다.

**💡 힌트 3**

`updateDuration`은 매개변수로 받은 값을 `this.totalMinutes`에 다시 대입하면 됩니다. 두 instance가 독립적인지는 한쪽만 호출해서 확인하세요.

**📌 정리 메모**

<div class="wda-callout wda-ci">
  class 기본 문법에 익숙해졌다면, 생성자 함수 부록과 비교하며 두 문법이 같은 결과를 만든다는 점을 다시 확인해 보세요.
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><strong>class</strong>는 객체를 만들기 위한 문법이며, <strong>new</strong>로 호출해야 instance가 만들어진다.</li>
    <li><strong>constructor</strong>는 new 호출 시 자동 실행되며, 전달값을 <code>this</code>에 담아 instance를 채운다.</li>
    <li>class 안의 <strong>this</strong>는 지금 만들어지는 instance 자신을 가리킨다.</li>
    <li><strong>method</strong>는 instance의 동작, <strong>property</strong>는 instance의 값이며, 같은 class로 만든 instance라도 값은 서로 독립적이다.</li>
    <li><strong>extends</strong>로 물려받고 <strong>super(...)</strong>로 부모 constructor를 실행하며, <strong>static</strong> method는 class 이름으로 호출한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: class는 new 없이도 호출할 수 있다?</div>
    <div class="wda-mistake-right">정답: class를 new 없이 호출하면 <strong>TypeError</strong>가 발생한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: class의 method 사이에도 객체처럼 콤마(,)를 찍어야 한다?</div>
    <div class="wda-mistake-right">정답: method 사이에 콤마를 찍으면 <strong>SyntaxError</strong>가 발생한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 같은 class로 만든 instance는 값을 공유한다?</div>
    <div class="wda-mistake-right">정답: 각 instance는 <strong>독립된 값</strong>을 가지며, 한쪽을 바꿔도 다른 instance에는 영향이 없다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: static method도 instance에서 호출할 수 있다?</div>
    <div class="wda-mistake-right">정답: static method는 <strong>class 이름으로만</strong> 호출할 수 있다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 생성 흐름</div>
    <div class="wda-formula-block-body"><code>class 선언 → new 호출 → constructor 실행 → instance</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · this</div>
    <div class="wda-formula-block-body"><code>class 안의 this = 지금 만들어지는 instance</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 상속</div>
    <div class="wda-formula-block-body"><code>extends + super(...)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · static</div>
    <div class="wda-formula-block-body"><code>static → ClassName.method()</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">class를 new 없이 호출하면?</div>
    <div class="wda-flip-back">TypeError가 발생한다. class는 반드시 new로 호출해야 한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">constructor는 언제 실행되나?</div>
    <div class="wda-flip-back">new로 instance를 만들 때 자동으로 한 번 실행된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">class 안의 this는 무엇을 가리키나?</div>
    <div class="wda-flip-back">지금 만들어지는 instance 자신을 가리킨다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">같은 class로 만든 두 instance의 값은?</div>
    <div class="wda-flip-back">서로 독립적이다. 한쪽을 바꿔도 다른 instance에는 영향이 없다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">method 사이에 콤마를 찍으면?</div>
    <div class="wda-flip-back">SyntaxError가 발생한다. 객체 리터럴과 달리 콤마를 쓰지 않는다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">자식 class의 constructor에서 지켜야 할 순서는?</div>
    <div class="wda-flip-back">this를 사용하기 전에 반드시 super(...)를 먼저 호출해야 한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">static method는 어떻게 호출하나?</div>
    <div class="wda-flip-back">instance가 아니라 class 이름으로 직접 호출한다 (예: CourseCard.createDefault()).</div>
  </div>
</div>
