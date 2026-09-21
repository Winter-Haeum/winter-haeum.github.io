---
title: "부록: 배열 생성 방식 비교"
status: "completed"
description: "배열 리터럴, new Array(), Array.of(), Array.from()의 동작 차이와 희소 배열, 유사 배열을 정리하는 보충 부록이다."
category: "JavaScript"
section: "Arrays & Objects"
tags:
  - javascript
  - arrays
  - array-creation
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
/* 핵심 요약 전용 복습 UI — JavaScript 1-1~1-5·2-1~2-3 기준과 동일. 색은 background/border/accent에만
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
  • 이 부록은 배열을 만드는 여러 방법의 차이를 정리하는 보충 자료다.<br>
  • 2-2(배열)에서 다룬 배열 다루기 방법은 반복하지 않고, 생성 방식 자체의 차이에 집중한다.
</div>

## 🎯 학습 목표

<div class="wda-goal">
  • <strong>리터럴/생성자 구분</strong> — 배열 리터럴과 new Array()의 동작 차이를 설명할 수 있다.<br>
  • <strong>Array.of / Array.from 활용</strong> — 상황에 맞는 배열 생성 도구를 선택할 수 있다.<br>
  • <strong>희소 배열 주의</strong> — 희소 배열이 왜, 언제 생기고 무엇이 위험한지 판단할 수 있다.
</div>

---

## 1. 배열 리터럴이 기본이다

**• JavaScript: 배열 리터럴로 만들기**

```javascript
const fruits = ["사과", "바나나"];
const empty = [];

console.log(fruits);
// [ '사과', '바나나' ]
```

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  대부분의 경우 대괄호 <code>[]</code> 리터럴이 가장 간단하고 안전한 배열 생성 방법이다.
</div>

---

## 2. new Array()의 함정

`new Array()`는 인자의 개수에 따라 동작이 달라진다.

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">숫자 1개</div>

값이 아니라 <strong>길이</strong>로 해석된다.

**• JavaScript: new Array(숫자 1개) — 길이로 해석**

```javascript
const sparseList = new Array(3);

console.log(sparseList);
// [empty × 3]

console.log(sparseList.length);
// 3
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">숫자 여러 개</div>

각 값을 <strong>요소</strong>로 담는다.

**• JavaScript: new Array(숫자 여러 개) — 요소로 해석**

```javascript
const filledList = new Array(1, 2, 3);

console.log(filledList);
// [1, 2, 3]
```

</div>

</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  숫자 하나만 넣으면 그 값을 요소로 넣는 게 아니라 <strong>길이</strong>로 해석된다. 예상과 다르게 동작하기 쉬워, 요소 하나짜리 배열을 만들고 싶다면 <code>Array.of()</code>를 사용한다.
</div>

---

## 3. 희소 배열과 undefined의 차이

`new Array(3)`처럼 만들어진 배열은 값이 아예 없는 빈 슬롯을 가진 <strong>희소 배열(sparse array)</strong>이다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">empty (빈 슬롯)</div>
    요소 자체가 없다 — 순회 시 건너뛴다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">undefined</div>
    요소는 있고 값이 undefined다 — 순회에 포함된다.
  </div>
</div>

**• JavaScript: 희소 배열의 빈 슬롯 확인하기**

```javascript
const listWithHole = [1, , 3];

console.log(listWithHole[1]);
// undefined
```

**• JavaScript: 희소 배열 forEach 순회하기**

```javascript
listWithHole.forEach((v) => console.log(v));
// 1
// 3
```

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">new Array(3)</div>
    <div class="wda-fcard-dsc">길이 3, 빈 슬롯 3개</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">list[10] = 1</div>
    <div class="wda-fcard-dsc">중간 인덱스를 건너뛰고 대입</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">delete list[0]</div>
    <div class="wda-fcard-dsc">해당 인덱스가 빈 슬롯이 됨</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">[1, , 3]</div>
    <div class="wda-fcard-dsc">쉼표를 연속으로 사용</div>
  </div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  빈 슬롯(empty)은 <code>forEach</code> 등 순회에서 <strong>건너뛰지만</strong>, 값이 <code>undefined</code>인 요소는 순회에 <strong>포함</strong>된다. 희소 배열은 예상과 다르게 동작하기 쉬우므로, 의도치 않았다면 피하는 것이 좋다.
</div>

---

## 4. Array.of(): 항상 요소로 취급한다

**• JavaScript: Array.of로 요소 만들기**

```javascript
console.log(Array.of(3));
// [3]

console.log(Array.of(1, 2, 3));
// [1, 2, 3]
```

**💼 실무 팁**

<div class="wda-callout wda-cs">
  인자의 개수·타입과 무관하게 항상 요소로 취급하므로, 함수로 전달받은 값을 그대로 배열로 만들 때 <code>new Array()</code>보다 안전하다.
</div>

---

## 5. Array.from(): 유사 배열/반복 가능한 값을 배열로

**• JavaScript: Array.from으로 문자열을 배열로 바꾸기**

```javascript
const charList = Array.from("Hello");

console.log(charList);
// ["H", "e", "l", "l", "o"]
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>Array.from()</code>은 <strong>유사 배열</strong>(length 속성은 있지만 배열 메서드가 없는 객체)이나 문자열처럼 <strong>반복 가능한 값</strong>을 진짜 배열로 바꿔준다.
</div>

---

## 6. Array.from()으로 변환과 동시에 가공하기

`Array.from()`은 두 번째 인자로 매핑 함수를 받아, 변환과 가공을 한 번에 처리한다.

**• JavaScript: Array.from 매핑 함수로 값 채우기**

```javascript
const numberList = Array.from({ length: 5 }, (_, i) => i + 1);

console.log(numberList);
// [1, 2, 3, 4, 5]
```

**💡 보충 설명**

<div class="wda-callout wda-ci">
  <code>{ length: 5 }</code>처럼 <code>length</code> 속성만 있어도 유사 배열로 인식된다. <code>Array.from()</code>은 그 길이만큼 두 번째 함수(매핑 함수)를 실행해 값을 채운다.
</div>

---

## 7. 생성 방식 비교표

**▶ 배열 생성 방식 비교**

| 방식 | 숫자 1개를 넣으면 | 특징 |
|---|---|---|
| `[]` 리터럴 | 해당 없음 | 가장 기본적이고 안전한 방식 |
| `new Array(n)` | 길이 n인 희소 배열 | 숫자 1개는 길이로 해석되어 예상과 다르게 동작할 수 있다 |
| `Array.of(n)` | 요소가 n인 배열 | 인자 개수·타입과 무관하게 항상 요소로 취급한다 |
| `Array.from(...)` | — | 유사 배열/반복 가능한 값을 진짜 배열로 바꾸고, 매핑까지 함께 처리할 수 있다 |

---

## 8. 초보자가 자주 만나는 배열 생성 실수

<div class="wda-fgrid">

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 1 · new Array(3)이 [3]이라는 착각</div>

**• JavaScript: new Array(3)이 [3]이라는 착각**

```javascript
const list = new Array(3);
console.log(list.length);
// 3
console.log(list[0]);
// undefined
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 숫자 하나만 넣으면 값이 아니라 길이로 해석된다.<br>
  <strong>기억할 점:</strong> 요소로 넣고 싶으면 Array.of()를 쓴다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 2 · 희소 배열을 일반 배열처럼 순회</div>

**• JavaScript: 희소 배열을 일반 배열처럼 순회하는 실수**

```javascript
const list = [1, , 3];
let count = 0;
list.forEach(() => count++);
console.log(count);
// 2
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> forEach는 빈 슬롯을 건너뛰어 순회 횟수가 배열 길이보다 적을 수 있다.<br>
  <strong>기억할 점:</strong> 값이 채워진 배열이 필요하면 리터럴이나 Array.from()을 쓴다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 3 · 유사 배열에 배열 메서드 바로 사용</div>

**• JavaScript: 유사 배열에 배열 메서드 바로 쓰는 실수**

```javascript
const arrayLike = { 0: "a", 1: "b", length: 2 };
console.log(arrayLike.map);
// undefined
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 유사 배열은 배열 메서드를 가지고 있지 않다.<br>
  <strong>기억할 점:</strong> Array.from()으로 진짜 배열로 바꾼 뒤 메서드를 사용한다.
</div>

</div>

</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>배열 리터럴(<code>[]</code>)이 가장 기본적이고 <strong>안전한</strong> 생성 방법이다.</li>
    <li><strong>new Array(n)</strong>은 숫자 하나만 넣으면 값이 아니라 <strong>길이</strong>로 해석해 희소 배열을 만든다.</li>
    <li><strong>Array.of()</strong>는 인자 개수·타입과 무관하게 항상 <strong>요소</strong>로 취급한다.</li>
    <li><strong>Array.from()</strong>은 유사 배열/반복 가능한 값을 진짜 배열로 바꾸고, 두 번째 인자로 <strong>매핑</strong>까지 처리할 수 있다.</li>
    <li>빈 슬롯(<strong>empty</strong>)은 순회 시 건너뛰지만, <strong>undefined</strong> 값은 순회에 포함된다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: new Array(3)은 [3]을 만든다?</div>
    <div class="wda-mistake-right">정답: 숫자 1개는 <strong>길이</strong>로 해석되어 길이 3인 희소 배열이 된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: empty와 undefined는 순회에서 똑같이 동작한다?</div>
    <div class="wda-mistake-right">정답: empty는 forEach 등에서 <strong>건너뛰고</strong>, undefined는 순회에 <strong>포함</strong>된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 유사 배열은 배열 메서드를 바로 쓸 수 있다?</div>
    <div class="wda-mistake-right">정답: <strong>Array.from()</strong>으로 진짜 배열로 바꾼 뒤에야 map/filter 같은 메서드를 쓸 수 있다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 기본</div>
    <div class="wda-formula-block-body">
      <code>[] = 가장 안전</code><br>
      <code>new Array(n) = 길이로 해석(주의)</code>
    </div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 일관성</div>
    <div class="wda-formula-block-body"><code>Array.of(n) = 항상 요소</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 변환</div>
    <div class="wda-formula-block-body"><code>Array.from(대상, 매핑함수)</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">new Array(3)의 결과는?</div>
    <div class="wda-flip-back">길이 3인 희소 배열([empty × 3])이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Array.of(3)의 결과는?</div>
    <div class="wda-flip-back">요소가 3인 배열([3])이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">empty와 undefined의 순회 차이는?</div>
    <div class="wda-flip-back">empty는 건너뛰고 undefined는 순회에 포함된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">유사 배열이란?</div>
    <div class="wda-flip-back">length 속성은 있지만 배열 메서드가 없는 객체다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Array.from()의 두 번째 인자는?</div>
    <div class="wda-flip-back">매핑 함수로, 변환과 동시에 값을 가공한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">가장 기본적인 배열 생성 방법은?</div>
    <div class="wda-flip-back">배열 리터럴([])이다.</div>
  </div>
</div>
