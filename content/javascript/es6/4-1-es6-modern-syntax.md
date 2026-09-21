---
title: "4-1 ES6 모던 문법 입문"
status: "completed"
description: "템플릿 리터럴, for...of, Map, Set, Symbol 등 ES6 이후 추가된 핵심 문법의 목적과 사용 이유를 정리한다."
category: "JavaScript"
section: "ES6+"
tags:
  - javascript
  - es6
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
.wda-steps{border:1px solid rgba(128,128,128,.15);border-radius:10px;overflow:hidden;margin:.8rem 0 1.6rem}
.wda-step{display:flex;align-items:flex-start;gap:14px;padding:12px 16px;border-bottom:1px solid rgba(128,128,128,.1)}
.wda-step:last-child{border-bottom:none}
.wda-snum{min-width:26px;height:26px;border-radius:50%;background:rgba(245,158,11,.15);color:#f59e0b;font-size:.78rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
.wda-sbody{flex:1;min-width:0}
.wda-sttl{font-size:.94rem;font-weight:700;margin-bottom:4px}
.wda-sdsc{font-size:.89rem;line-height:1.65}
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

## 🎯 학습 목표

<div class="wda-goal">
  • <strong>최신 문법 감 잡기</strong> — ES6 이후 추가된 문법들이 각각 어떤 문제를 해결하는지 설명할 수 있다.<br>
  • <strong>템플릿 리터럴 활용</strong> — 백틱과 태그드 템플릿으로 문자열을 다룰 수 있다.<br>
  • <strong>새 자료구조 이해</strong> — Map/Set/Symbol이 기존 객체·배열과 무엇이 다른지 설명할 수 있다.<br>
  • <strong>최신 흐름 감지</strong> — ES2020 이후 추가된 주요 문법을 훑어볼 수 있다.
</div>

---

## 1. ES6 이후 문법을 배우는 이유

강의 대시보드를 만들다 보면 문자열을 조합하고, 목록을 순회하고, 데이터를 저장하는 다양한 상황을 만난다. ES6 이후 추가된 문법들은 이런 상황을 더 짧고 안전하게 처리할 수 있게 해준다.

---

## 2. 버전이 발전해온 흐름

<div class="wda-steps">
  <div class="wda-step">
    <div class="wda-snum">1</div>
    <div class="wda-sbody"><div class="wda-sttl">ES5 (2009)</div><div class="wda-sdsc">strict mode, JSON, forEach</div></div>
  </div>
  <div class="wda-step">
    <div class="wda-snum">2</div>
    <div class="wda-sbody"><div class="wda-sttl">ES6 / ES2015 (2015)</div><div class="wda-sdsc">let/const, 화살표 함수, 클래스, 모듈, Symbol</div></div>
  </div>
  <div class="wda-step">
    <div class="wda-snum">3</div>
    <div class="wda-sbody"><div class="wda-sttl">ES2016~2019</div><div class="wda-sdsc">includes(), 지수 연산자(**), async/await, 객체 rest/spread</div></div>
  </div>
  <div class="wda-step">
    <div class="wda-snum">4</div>
    <div class="wda-sbody"><div class="wda-sttl">ES2020 이후</div><div class="wda-sdsc">??, ?., BigInt, at() 등 — 9번에서 정리</div></div>
  </div>
</div>

ES2016부터는 매년 조금씩 새 버전이 발표된다. 한 번에 많이 바뀌기보다 작은 기능이 꾸준히 추가되는 방식이다.

**✅ 선택 기준**

<div class="wda-callout wda-cs">
  트랜스파일러(Babel 등)가 오래된 브라우저에 맞게 코드를 자동으로 변환해준다. 실무에서는 브라우저 버전을 크게 신경 쓰지 않고 최신 문법을 사용하는 경우가 많다.
</div>

---

## 3. 템플릿 리터럴로 문자열 만들기

**• JavaScript: 템플릿 리터럴로 문자열 만들기**

```javascript
const dashboardTitle = "겨울 스터디";
const lessonCount = 12;

console.log(`${dashboardTitle} 대시보드 (${lessonCount}개 강의)`);
// 겨울 스터디 대시보드 (12개 강의)
```

백틱(`` ` ``)과 `${}`로 변수를 바로 끼워 넣을 수 있고, 줄바꿈도 그대로 유지된다.

---

## 4. 태그드 템플릿: 문자열을 함수로 가공하기

**• JavaScript: 태그드 템플릿으로 문자열 가공하기**

```javascript
function shout(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value =
      values[i] !== undefined ? String(values[i]).toUpperCase() : "";
    return result + str + value;
  }, "");
}

const selectedLevel = "beginner";

console.log(shout`선택한 레벨: ${selectedLevel}`);
// 선택한 레벨: BEGINNER
```

**📌 개념**

<div class="wda-callout wda-ci">
  템플릿 리터럴 앞에 함수 이름을 붙이면, 그 함수가 문자열 조각과 <code>${}</code> 값을 나눠 받아 원하는 대로 가공할 수 있다. 실무에서는 문자열 안전 처리, 다국어 처리, styled-components 같은 스타일링 라이브러리에 활용된다.
</div>

---

## 5. for...of로 순회 가능한 값 다루기

**• JavaScript: for...of로 문자열 순회하기**

```javascript
const dashboardTitle = "ES6";

for (const char of dashboardTitle) {
  console.log(char);
}
// E
// S
// 6
```

**📌 개념**

<div class="wda-callout wda-ci">
  배열뿐 아니라 문자열, <strong>Map</strong>, <strong>Set</strong>처럼 순회 가능한(iterable) 값이라면 모두 <code>for...of</code>로 순회할 수 있다.
</div>

---

## 6. Map: 어떤 값이든 키로 쓸 수 있는 저장소

**▶ 객체 vs Map**

| 구분 | 객체(Object) | Map |
|---|---|---|
| 키로 쓸 수 있는 타입 | 문자열/Symbol만 | 모든 타입 |
| 순서 보장 | 옛 스펙 기준으로는 보장 안 됨 | set한 순서 그대로 유지 |

**• JavaScript: Map으로 설정값 저장하기**

```javascript
const dashboardOptions = new Map();

dashboardOptions.set("defaultView", "list");
dashboardOptions.set("selectedLevel", "beginner");

console.log(dashboardOptions.get("defaultView"));
// list
```

---

## 7. Set: 중복을 허용하지 않는 값 모음

**• JavaScript: Set으로 중복 제거하기**

```javascript
const lessonTags = ["기초", "심화", "기초", "실습"];

const uniqueTags = [...new Set(lessonTags)];

console.log(uniqueTags);
// ["기초", "심화", "실습"]
```

**📌 개념**

<div class="wda-callout wda-ci">
  Set은 같은 값을 <strong>자동으로 하나만</strong> 남긴다. 배열의 중복을 제거할 때 <code>[...new Set(array)]</code> 형태로 자주 쓰인다.
</div>

---

## 8. Symbol: 고유한 값 만들기

**• JavaScript: Symbol로 고유값 만들기**

```javascript
const idA = Symbol("lesson-id");
const idB = Symbol("lesson-id");

console.log(idA === idB);
// false — 설명이 같아도 서로 다른 값이다
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>Symbol()</code>은 호출할 때마다 <strong>세상에 하나뿐인 값</strong>을 만든다. 객체의 property 이름이 다른 코드와 우연히 겹치지 않게 하고 싶을 때 사용한다.
</div>

---

## 9. ES2020 이후 주요 문법 훑어보기

**▶ ES2020 이후 주요 문법**

| 문법 | 한 줄 설명 |
|---|---|
| `??` / `?.` | 값이 없을 때를 안전하게 처리하는 연산자 |
| `BigInt` | 아주 큰 정수를 다루는 타입 |
| `\|\|=` `&&=` `??=` | 조건에 따라 값을 대입하는 복합 할당 연산자 |
| `at()` | 배열/문자열의 끝에서부터 인덱스로 접근하는 메서드 |
| top-level await | 모듈 최상위에서 바로 `await`를 쓰는 문법 |

---

## 10. 초보자가 자주 만나는 실수

<div class="wda-fgrid">

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 1 · Map 키를 새 객체로 조회</div>

**• JavaScript: Map 키를 새 객체로 조회하는 실수**

```javascript
const dashboardOptions = new Map();
const key = { id: 1 };
dashboardOptions.set(key, "값");

console.log(dashboardOptions.get({ id: 1 }));
// undefined
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 객체는 내용이 같아도 서로 다른 참조라 다른 키로 취급된다.<br>
  <strong>기억할 점:</strong> 조회할 때는 저장할 때 쓴 바로 그 참조를 사용한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 2 · Set을 배열처럼 인덱스로 접근</div>

**• JavaScript: Set을 인덱스로 접근하는 실수**

```javascript
const uniqueTags = new Set(["기초", "심화"]);
console.log(uniqueTags[0]);
// undefined
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> Set은 순서는 있지만 인덱스로 값을 꺼낼 수 없다.<br>
  <strong>기억할 점:</strong> 값을 꺼내려면 for...of로 순회하거나 배열로 변환한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 3 · Symbol을 문자열처럼 연결</div>

**• JavaScript: Symbol을 문자열처럼 연결하는 실수**

```javascript
const idA = Symbol("lesson-id");
console.log("id: " + idA);
// ❌ TypeError (일부러 에러 확인용)
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> Symbol은 문자열로 자동 변환되지 않는다.<br>
  <strong>기억할 점:</strong> 문자열로 쓰려면 <code>String(idA)</code>처럼 명시적으로 변환한다.
</div>

</div>

</div>

---

## 11. 실습 과제

아직 화면 조작(DOM)은 배우지 않았으니, 이번에도 Console 결과로 직접 확인한다.

**🎯 목표**

대시보드 설정을 Map으로 관리하고, 중복된 태그를 Set으로 정리한다.

**📋 요구사항**

• `dashboardOptions`를 Map으로 만들고 `defaultView`, `selectedLevel`을 저장한다.<br>
• `lessonTags` 배열의 중복을 Set으로 제거해 `uniqueTags`를 만든다.<br>
• 템플릿 리터럴로 대시보드 요약 문장을 만든다.

**• JavaScript: 실습 구성 예시**

```javascript
// 구성 예시: Map으로 설정 저장 / Set으로 중복 제거 / 템플릿 리터럴로 요약 문장 만들기
```

**💡 힌트 1 — Map으로 설정 저장**

**• JavaScript: 힌트 1 — Map으로 설정 저장**

```javascript
const dashboardOptions = new Map();
dashboardOptions.set("defaultView", "list");

console.log(dashboardOptions.get("defaultView"));
// list
```

**💡 힌트 2 — Set으로 중복 제거**

**• JavaScript: 힌트 2 — Set으로 중복 제거**

```javascript
const lessonTags = ["기초", "기초", "실습"];
const uniqueTags = [...new Set(lessonTags)];

console.log(uniqueTags);
// ["기초", "실습"]
```

**💡 힌트 3 — 요약 문장 만들기**

**• JavaScript: 힌트 3 — 요약 문장 만들기**

```javascript
const dashboardTitle = "겨울 스터디";
const lessonCount = 3;

console.log(`${dashboardTitle}: 강의 ${lessonCount}개`);
// 겨울 스터디: 강의 3개
```

**📌 정리 메모**

• 템플릿 리터럴은 변수와 문자열을 함께 조합할 때 쓴다.<br>
• Map은 어떤 값이든 키로 쓸 수 있는 저장소다.<br>
• Set은 중복을 자동으로 제거한다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><strong>템플릿 리터럴</strong>은 백틱과 <code>${}</code>로 변수를 문자열에 바로 끼워 넣는다.</li>
    <li><strong>태그드 템플릿</strong>은 템플릿 리터럴을 함수로 가공하는 문법이다.</li>
    <li><strong>for...of</strong>는 배열뿐 아니라 문자열, Map, Set 같은 iterable을 순회할 수 있다.</li>
    <li><strong>Map</strong>은 모든 타입을 키로 쓸 수 있고 삽입 순서를 유지한다.</li>
    <li><strong>Set</strong>은 같은 값을 자동으로 하나만 남긴다.</li>
    <li><strong>Symbol</strong>은 호출할 때마다 세상에 하나뿐인 고유한 값을 만든다.</li>
    <li>ES2020 이후에는 <strong>??/?.</strong>, <strong>BigInt</strong>, <strong>at()</strong> 같은 문법이 계속 추가되고 있다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Map은 객체와 완전히 같은 방식으로 동작한다?</div>
    <div class="wda-mistake-right">정답: Map은 <strong>모든 타입을 키</strong>로 쓸 수 있고, 순서를 <strong>확실히 보장</strong>한다는 점이 다르다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Set도 배열처럼 인덱스로 값을 꺼낼 수 있다?</div>
    <div class="wda-mistake-right">정답: Set은 인덱스 접근이 <strong>불가능</strong>하다 — for...of나 배열 변환이 필요하다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Symbol도 문자열처럼 이어붙일 수 있다?</div>
    <div class="wda-mistake-right">정답: Symbol은 <strong>자동으로 문자열 변환되지 않아</strong> 이어붙이면 에러가 난다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 문자열</div>
    <div class="wda-formula-block-body"><code>템플릿 리터럴 = 백틱 + ${}</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 자료구조</div>
    <div class="wda-formula-block-body">
      <code>Map = 모든 타입 키</code><br>
      <code>Set = 중복 제거</code>
    </div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 고유값</div>
    <div class="wda-formula-block-body"><code>Symbol = 항상 새로운 고유값</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">태그드 템플릿이란?</div>
    <div class="wda-flip-back">템플릿 리터럴을 함수로 가공하는 문법이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">for...of는 무엇을 순회할 수 있나?</div>
    <div class="wda-flip-back">배열, 문자열, Map, Set 같은 iterable을 순회할 수 있다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Map과 객체의 가장 큰 차이는?</div>
    <div class="wda-flip-back">Map은 모든 타입을 키로 쓸 수 있고 순서를 확실히 보장한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Set의 핵심 특징은?</div>
    <div class="wda-flip-back">같은 값을 자동으로 하나만 남긴다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Symbol은 왜 사용하나?</div>
    <div class="wda-flip-back">호출할 때마다 고유한 값을 만들어 property 이름 충돌을 막기 위해서다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">ES2020 이후 추가된 문법 예시는?</div>
    <div class="wda-flip-back">??, ?., BigInt, at() 등이 있다.</div>
  </div>
</div>
