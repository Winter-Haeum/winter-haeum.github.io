---
title: "4-2 화살표 함수, 구조분해, 스프레드"
status: "completed"
description: "화살표 함수 문법과 배열·객체 구조분해, spread/rest 연산자를 실전 코드 형태로 정리한다."
category: "JavaScript"
section: "ES6+"
tags:
  - javascript
  - es6
  - arrow-function
  - destructuring
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
/* 핵심 요약 전용 복습 UI — JavaScript 1-1~1-5·2-1~2-3·4-1·4-3·4-4 기준과 동일. 색은 background/border/accent에만
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
  • <strong>화살표 함수 문법</strong> — 매개변수 개수와 본문 줄 수에 따른 축약 규칙을 정확히 쓸 수 있다.<br>
  • <strong>배열·객체 구조분해</strong> — 필요한 값만 바로 변수로 꺼내는 문법을 다룰 수 있다.<br>
  • <strong>spread 연산자</strong> — 배열과 객체를 펼쳐 복사하거나 새 값을 만들 수 있다.<br>
  • <strong>rest와 spread 구분</strong> — 같은 <code>...</code> 문법을 위치로 구분해 쓸 수 있다.
</div>

---

## 1. 짧고 자주 쓰는 ES6 문법들

강의 카드 데이터를 다루다 보면 함수를 짧게 쓰고, 객체에서 필요한 값만 꺼내고, 원본은 그대로 둔 채 새 데이터를 만드는 일이 반복된다. 이 문서에서는 강의 카드 하나(`lessonCard`)를 예제로 삼아, 화살표 함수·구조분해·spread·rest 네 가지 문법을 실제로 쓰는 형태로 정리한다.

---

## 2. 화살표 함수 기본 문법

**• JavaScript: 일반 함수로 작성하기**

```javascript
function formatLessonTitleOld(title) {
  return `[강의] ${title}`;
}

console.log(formatLessonTitleOld("배열 구조분해"));
// [강의] 배열 구조분해
```

`function` 키워드 대신 `=>`를 쓰면 같은 동작을 더 짧게 쓸 수 있다.

**• JavaScript: 화살표 함수로 바꾸기**

```javascript
const formatLessonTitle = (title) => {
  return `[강의] ${title}`;
};

console.log(formatLessonTitle("배열 구조분해"));
// [강의] 배열 구조분해
```

---

## 3. 화살표 함수 축약 규칙

**💡 설명**

<div class="wda-callout wda-ci">
  <ul>
    <li>매개변수 <strong>0개</strong>: 괄호가 필수다. <code>() =&gt; ...</code></li>
    <li>매개변수 <strong>1개</strong>: 괄호를 생략할 수 있다. <code>x =&gt; ...</code></li>
    <li>매개변수 <strong>2개 이상</strong>: 괄호가 필수다. <code>(a, b) =&gt; ...</code></li>
  </ul>
</div>

**• JavaScript: 매개변수 개수별 괄호 규칙**

```javascript
// 매개변수 0개 → 괄호 필수
const getDefaultTag = () => "일반";

// 매개변수 1개 → 괄호 생략 가능
const formatLessonTitle = title => `[강의] ${title}`;

// 매개변수 2개 이상 → 괄호 필수
const combineTitle = (title, teacher) => `${title} - ${teacher}`;

console.log(getDefaultTag());
// 일반

console.log(formatLessonTitle("배열 구조분해"));
// [강의] 배열 구조분해

console.log(combineTitle("배열 구조분해", "민지"));
// 배열 구조분해 - 민지
```

본문이 표현식 한 줄이면 중괄호와 `return`을 함께 생략할 수 있다.

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 명시적 return</div>

본문이 여러 줄이거나 로직이 있을 때는 중괄호와 return을 그대로 쓴다.

**• JavaScript: 명시적 return 사용하기**

```javascript
const formatLessonTitleBlock = title => {
  return `[강의] ${title}`;
};
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 암묵적 return</div>

본문이 표현식 한 줄이면 중괄호와 return을 생략할 수 있다.

**• JavaScript: 암묵적 return 사용하기**

```javascript
const formatLessonTitleShort = title => `[강의] ${title}`;
```

</div>

</div>

---

## 4. 객체를 바로 반환할 때 주의

**• JavaScript: 객체 반환 시 소괄호로 감싸기**

```javascript
// [주의] 중괄호를 함수 본문(블록)으로 해석해 undefined를 반환한다
const createLessonSummaryBad = title => { title: title };

// [정답] 소괄호로 감싸면 객체 리터럴로 인식된다
const createLessonSummary = title => ({ title, status: "준비중" });

console.log(createLessonSummaryBad("배열 구조분해"));
// undefined

console.log(createLessonSummary("배열 구조분해"));
// { title: '배열 구조분해', status: '준비중' }
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  화살표 함수 뒤에 오는 <code>{}</code>는 기본적으로 함수 본문(블록)으로 해석된다. 객체를 즉시 반환하려면 반드시 소괄호로 감싸야 한다: <code>() =&gt; ({ ... })</code>.
</div>

---

## 5. 화살표 함수와 this — 주의사항

**• JavaScript: 화살표 함수의 this 확인하기**

```javascript
const lessonBoard = {
  lessonTitle: "배열 구조분해",
  logTitle: () => {
    console.log(this.lessonTitle);
  },
};

lessonBoard.logTitle();
// undefined — 화살표 함수는 자신만의 this를 만들지 않는다
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  화살표 함수는 호출한 객체가 아니라 <strong>정의된 위치의 상위 스코프 this</strong>를 그대로 사용한다. 그래서 객체 메서드를 화살표 함수로 만들면 this가 그 객체를 가리키지 못한다. this가 호출 방식에 따라 구체적으로 어떻게 정해지는지는 <strong>4-4 this 바인딩</strong> 문서에서 다룬다.
</div>

---

## 6. 일반 함수 vs 화살표 함수

**▶ 일반 함수 vs 화살표 함수**

| 구분 | 일반 함수 | 화살표 함수 |
|---|---|---|
| this | 호출 방식에 따라 결정 | 정의된 위치의 상위 this를 그대로 사용 |
| new로 호출 | 가능 | 불가능 (TypeError) |
| arguments 객체 | 있음 | 없음 (rest parameter로 대체) |
| 주 용도 | 객체 메서드, 생성자 함수 | 콜백, 짧은 유틸리티 함수 |

**• JavaScript: 화살표 함수를 new로 호출하는 에러 확인용**

```javascript
const LessonTimer = (durationMinutes) => {
  this.durationMinutes = durationMinutes;
};

// TypeError: LessonTimer is not a constructor (일부러 에러 확인용)
// const timer = new LessonTimer(45);
```

---

## 7. 배열 구조분해

**• JavaScript: 배열 구조분해로 값 꺼내기**

```javascript
const lessonTags = ["ES6", "구조분해", "spread"];

const [firstTag, secondTag] = lessonTags;

console.log(firstTag, secondTag);
// ES6 구조분해
```

첫 값과 나머지 값을 분리할 수도 있다.

**• JavaScript: 배열 구조분해로 첫 값과 나머지 분리하기**

```javascript
const [mainTag, ...restTags] = lessonTags;

console.log(mainTag, restTags);
// ES6 ['구조분해', 'spread']
```

**📌 개념**

<div class="wda-callout wda-ci">
  배열 구조분해는 왼쪽 변수의 <strong>순서</strong>가 오른쪽 배열의 순서와 그대로 대응한다. 변수 이름은 원하는 대로 지어도 된다.
</div>

---

## 8. 객체 구조분해

**• JavaScript: 객체 구조분해로 값 꺼내기**

```javascript
const lessonCard = {
  lessonTitle: "배열 구조분해",
  teacherName: "민지",
  durationMinutes: 45,
  lessonTags: ["ES6", "구조분해"],
};

const { lessonTitle, teacherName } = lessonCard;

console.log(lessonTitle, teacherName);
// 배열 구조분해 민지
```

필요한 값 하나만 꺼내는 것도 가능하다.

**• JavaScript: 필요한 값 하나만 꺼내기**

```javascript
const { durationMinutes } = lessonCard;

console.log(durationMinutes);
// 45
```

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">🔢 배열 구조분해 (순서 기준)</div>

**• JavaScript: 배열 구조분해 — 순서 기준**

```javascript
const [firstTag, secondTag] = lessonTags;
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">🔤 객체 구조분해 (이름 기준)</div>

**• JavaScript: 객체 구조분해 — 이름 기준**

```javascript
const { lessonTitle, teacherName } = lessonCard;
```

</div>

</div>

**📌 개념**

<div class="wda-callout wda-ci">
  배열은 <strong>순서(인덱스)</strong>가 매칭 기준이고, 객체는 <strong>이름(key)</strong>이 매칭 기준이다.
</div>

---

## 9. 구조분해 기본값과 이름 바꾸기

값이 없을 때 쓸 기본값을 지정할 수 있다.

**• JavaScript: 구조분해 기본값 지정하기**

```javascript
const { teacherName, level = "입문" } = lessonCard;

console.log(level);
// 입문 — lessonCard에 level 속성이 없어 기본값을 사용한다
```

`:`으로 다른 변수 이름을 지정할 수도 있다.

**• JavaScript: 구조분해 이름 바꾸기**

```javascript
const { teacherName: teacher } = lessonCard;

console.log(teacher);
// 민지
```

이름 변경과 기본값을 함께 쓸 수도 있다.

**• JavaScript: 이름 변경과 기본값 함께 쓰기**

```javascript
const { teacherName: teacher, level: lessonLevel = "입문" } = lessonCard;

console.log(teacher, lessonLevel);
// 민지 입문
```

---

## 10. 중첩 구조분해는 짧게

**• JavaScript: 중첩 구조분해하기**

```javascript
const lessonCardDetail = {
  lessonTitle: "배열 구조분해",
  schedule: { day: "화", time: "20:00" },
};

const {
  lessonTitle,
  schedule: { day },
} = lessonCardDetail;

console.log(lessonTitle, day);
// 배열 구조분해 화
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  중첩이 2단계를 넘어가면 코드가 읽기 어려워진다. 그럴 때는 <code>schedule</code>처럼 중간 값을 먼저 꺼내 쓰는 편이 낫다.
</div>

---

## 11. 함수 매개변수에서 구조분해하기

**• JavaScript: 함수 매개변수에서 구조분해하기**

```javascript
function printLessonCard({ lessonTitle, teacherName }) {
  console.log(`${lessonTitle} - ${teacherName}`);
}

printLessonCard(lessonCard);
// 배열 구조분해 - 민지
```

매개변수 구조분해에도 기본값을 함께 쓸 수 있다.

**• JavaScript: 매개변수 구조분해에 기본값 쓰기**

```javascript
function printLessonCardWithLevel({ lessonTitle, level = "입문" }) {
  console.log(`${lessonTitle} (${level})`);
}

printLessonCardWithLevel(lessonCard);
// 배열 구조분해 (입문)
```

---

## 12. spread로 배열 다루기

**• JavaScript: spread로 배열 복사·확장하기**

```javascript
const lessonTags = ["ES6", "구조분해"];

const copiedTags = [...lessonTags];
const extendedTags = [...lessonTags, "spread"];

console.log(copiedTags);
// ['ES6', '구조분해']

console.log(extendedTags);
// ['ES6', '구조분해', 'spread']
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>...</code>은 배열의 대괄호를 벗겨 내용물만 새 대괄호 안에 펼쳐 담는다. 결과는 원본과 분리된 새 배열이다(얕은 복사) — 배열 복사와 원본 변경 이슈는 <strong>2-2 배열</strong> 문서에서 다뤘다.
</div>

---

## 13. spread로 객체 다루기

**• JavaScript: spread로 객체 복사·확장하기**

```javascript
const copiedLesson = { ...lessonCard };
const updatedLesson = { ...lessonCard, durationMinutes: 60 };

console.log(updatedLesson);
// { lessonTitle: '배열 구조분해', teacherName: '민지', durationMinutes: 60, lessonTags: ['ES6', '구조분해'] }
```

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">lessonCard 펼치기</div><div class="wda-fnode-dsc">기존 속성을 모두 꺼낸다.</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">새 값 지정</div><div class="wda-fnode-dsc">durationMinutes만 새 값으로 적는다.</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">새 객체 완성</div><div class="wda-fnode-dsc">updatedLesson이 만들어진다.</div></div>
</div>

**📌 개념**

<div class="wda-callout wda-ci">
  뒤에 오는 값이 앞의 값을 덮어쓴다. 객체 spread의 얕은 복사 특성은 <strong>2-3 객체</strong> 문서에서 자세히 다뤘다.
</div>

---

## 14. 함수 호출에서 spread 쓰기

**• JavaScript: 함수 호출에서 spread로 인자 펼치기**

```javascript
function createLessonSummary(title, teacher, minutes) {
  return `${title} · ${teacher} · ${minutes}분`;
}

const lessonInfo = ["배열 구조분해", "민지", 45];

console.log(createLessonSummary(...lessonInfo));
// 배열 구조분해 · 민지 · 45분
```

**• JavaScript: Math.max에 spread로 배열 넘기기**

```javascript
const lessonDurations = [45, 30, 50];

console.log(Math.max(...lessonDurations));
// 50
```

---

## 15. rest로 남은 값 모으기

객체 구조분해에서도 나머지 속성을 한 번에 모을 수 있다.

**• JavaScript: 객체 구조분해에서 rest로 나머지 모으기**

```javascript
const { lessonTitle, ...restInfo } = lessonCard;

console.log(restInfo);
// { teacherName: '민지', durationMinutes: 45, lessonTags: ['ES6', '구조분해'] }
```

**📌 개념**

<div class="wda-callout wda-ci">
  배열 구조분해에서도 같은 방식으로 <code>...</code>을 쓸 수 있다(7번 참고) — 앞에서 꺼낸 값을 제외한 나머지를 하나의 배열이나 객체로 모은다.
</div>

---

## 16. rest parameter

**• JavaScript: rest parameter로 나머지 인자 모으기**

```javascript
function collectLessonTags(mainTag, ...restTags) {
  console.log(mainTag, restTags);
}

collectLessonTags("ES6", "구조분해", "spread");
// ES6 ['구조분해', 'spread']
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  rest parameter는 항상 <strong>마지막 매개변수</strong>여야 한다. 넘겨받은 인자 중 앞에서 지정한 매개변수를 제외한 나머지를 배열로 모은다.
</div>

---

## 17. rest vs spread 구분

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">📥 Rest — 모으기</div>

값을 받는 쪽(매개변수, 구조분해 왼쪽)에 쓰면 여러 값을 하나로 모은다.

**• JavaScript: rest — 값 모으기**

```javascript
function sumDurations(...durations) {
  return durations.reduce((total, m) => total + m, 0);
}

sumDurations(45, 30, 50);
// 125
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">📤 Spread — 펼치기</div>

값을 펼치는 쪽(함수 호출, 배열/객체 리터럴)에 쓰면 하나를 낱개로 펼친다.

**• JavaScript: spread — 값 펼치기**

```javascript
const durations = [45, 30, 50];

Math.max(...durations);
// 50
```

</div>

</div>

**📌 개념**

<div class="wda-callout wda-ci">
  문법은 둘 다 <code>...</code>으로 같지만, <strong>위치</strong>로 구분한다. 값을 받는 쪽이면 rest, 값을 펼치는 쪽이면 spread다.
</div>

---

## 18. 초보자가 자주 만나는 실수

<div class="wda-fgrid">

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 1 · 객체 반환 시 괄호 생략</div>

**• JavaScript: 객체 반환 시 괄호 생략하는 실수**

```javascript
const createLessonSummaryBad = title => { title: title };

console.log(createLessonSummaryBad("배열 구조분해"));
// undefined
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 중괄호가 객체가 아니라 함수 본문으로 해석된다.<br>
  <strong>기억할 점:</strong> 객체를 즉시 반환하려면 소괄호로 감싼다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 2 · rest parameter 위치</div>

**• JavaScript: rest parameter 위치를 잘못 두는 실수**

```javascript
// function badCollect(...restTags, mainTag) {}
// ❌ SyntaxError (일부러 에러 확인용)
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> rest parameter는 마지막 자리에만 올 수 있다.<br>
  <strong>기억할 점:</strong> 나머지를 모으는 <code>...</code>은 항상 매개변수 목록의 끝에 둔다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 3 · spread 순서 착각</div>

**• JavaScript: spread 순서를 착각하는 실수**

```javascript
const defaultLesson = { level: "입문", durationMinutes: 30 };
const customLesson = { durationMinutes: 60 };

const wrongMerge = { ...customLesson, ...defaultLesson };

console.log(wrongMerge.durationMinutes);
// 30 — customLesson 값이 defaultLesson에 덮여버렸다
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> spread는 뒤에 오는 값이 앞의 값을 덮어쓴다. 순서를 반대로 쓰면 의도한 값이 사라진다.<br>
  <strong>기억할 점:</strong> 기본값을 먼저 펼치고, 우선하고 싶은 값을 뒤에 둔다.
</div>

</div>

</div>

---

## 19. 실습 과제

**🎯 목표**

강의 카드 데이터를 화살표 함수, 구조분해, spread로 정리해본다.

**📋 요구사항**

• `lessonCard` 객체에서 `lessonTitle`과 `teacherName`을 구조분해로 꺼낸다.<br>
• 화살표 함수 `formatLessonTitle`을 만들어 `"[강의] 제목"` 형태의 문자열을 반환한다.<br>
• spread로 `lessonCard`를 복사한 뒤 `durationMinutes`만 다른 값으로 덮어쓴 `updatedLesson`을 만든다.

**• JavaScript: 실습 구성 예시**

```javascript
// 구성 예시: 구조분해로 값 꺼내기 / 화살표 함수로 제목 포맷 / spread로 값 덮어쓰기
```

**💡 힌트 1 — 구조분해로 값 꺼내기**

**• JavaScript: 힌트 1 — 구조분해로 값 꺼내기**

```javascript
const { lessonTitle, teacherName } = lessonCard;

console.log(lessonTitle, teacherName);
// 배열 구조분해 민지
```

**💡 힌트 2 — 화살표 함수로 제목 포맷**

**• JavaScript: 힌트 2 — 화살표 함수로 제목 포맷**

```javascript
const formatLessonTitle = title => `[강의] ${title}`;

console.log(formatLessonTitle(lessonTitle));
// [강의] 배열 구조분해
```

**💡 힌트 3 — spread로 값 덮어쓰기**

**• JavaScript: 힌트 3 — spread로 값 덮어쓰기**

```javascript
const updatedLesson = { ...lessonCard, durationMinutes: 60 };

console.log(updatedLesson.durationMinutes);
// 60
```

**📌 정리 메모**

• 화살표 함수는 짧은 콜백과 유틸리티 함수에 적합하다.<br>
• 구조분해는 필요한 값만 바로 꺼낼 때 쓴다.<br>
• spread는 원본을 유지하며 새 값을 만들 때 쓴다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>화살표 함수는 <code>(params) =&gt; expression</code> 형태이며, 매개변수 1개면 괄호 생략, 본문 한 줄이면 <code>return</code> 생략이 가능하다.</li>
    <li>화살표 함수로 객체를 즉시 반환하려면 <strong>소괄호</strong>로 감싸야 한다. <code>{}</code>만 쓰면 함수 본문으로 해석된다.</li>
    <li>화살표 함수는 자신만의 <strong>this</strong>를 만들지 않고 상위 스코프의 this를 그대로 쓴다 — 자세한 결정 방식은 4-4 this 바인딩 문서를 참고한다.</li>
    <li>배열 구조분해는 <strong>순서(인덱스)</strong>, 객체 구조분해는 <strong>이름(key)</strong>이 매칭 기준이다. 기본값과 이름 변경을 함께 쓸 수 있다.</li>
    <li><strong>spread(...)</strong>는 배열/객체를 펼쳐 새로운 값을 만들고, <strong>rest(...)</strong>는 남은 값을 하나로 모은다 — 문법은 같지만 위치로 구분한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 화살표 함수는 일반 함수를 줄여 쓴 것뿐이다?</div>
    <div class="wda-mistake-right">정답: this를 다루는 방식이 다른 <strong>별개의 문법</strong>이다. new로 호출할 수 없고 arguments도 없다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 화살표 함수로 {}만 쓰면 객체를 반환한다?</div>
    <div class="wda-mistake-right">정답: <code>{}</code>는 함수 본문으로 해석된다. 객체로 반환하려면 <code>() =&gt; ({})</code>처럼 감싸야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 배열 구조분해와 객체 구조분해는 매칭 기준이 같다?</div>
    <div class="wda-mistake-right">정답: <strong>배열은 순서</strong>, <strong>객체는 이름</strong>이 기준이다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: rest와 spread는 서로 다른 연산자다?</div>
    <div class="wda-mistake-right">정답: 문법은 <code>...</code>으로 같고, <strong>받는 쪽이면 rest, 펼치는 쪽이면 spread</strong>로 위치만 다르다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 화살표 함수 축약</div>
    <div class="wda-formula-block-body"><code>매개변수 1개 → 괄호 생략</code><br><code>본문 한 줄 → return 생략</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 객체 반환</div>
    <div class="wda-formula-block-body"><code>() =&gt; ({ ... })</code><br>소괄호로 감싸야 객체로 인식</div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 구조분해 매칭</div>
    <div class="wda-formula-block-body"><code>배열 = 순서</code><br><code>객체 = 이름(key)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · Rest vs Spread</div>
    <div class="wda-formula-block-body"><code>받는 쪽 = Rest</code><br><code>펼치는 쪽 = Spread</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">화살표 함수에서 매개변수가 1개일 때는?</div>
    <div class="wda-flip-back">소괄호를 생략할 수 있다. 예: x => x * 2</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">화살표 함수로 객체를 즉시 반환하려면?</div>
    <div class="wda-flip-back">소괄호로 감싸야 한다. 예: () => ({ name: 'Kim' })</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">화살표 함수의 this는 어떻게 결정되나?</div>
    <div class="wda-flip-back">정의된 위치의 상위 스코프 this를 그대로 사용한다(자세한 내용은 4-4 문서).</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">배열 구조분해와 객체 구조분해의 차이는?</div>
    <div class="wda-flip-back">배열은 순서(인덱스), 객체는 이름(key)이 매칭 기준이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">spread 연산자의 역할은?</div>
    <div class="wda-flip-back">배열/객체를 펼쳐 원본과 분리된 새 값을 만든다(얕은 복사).</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">rest parameter는 어디에 위치해야 하나?</div>
    <div class="wda-flip-back">매개변수 목록의 마지막에 위치해야 한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">rest와 spread는 어떻게 구분하나?</div>
    <div class="wda-flip-back">문법은 둘 다 ...으로 같지만, 받는 쪽이면 rest, 펼치는 쪽이면 spread다.</div>
  </div>
</div>
