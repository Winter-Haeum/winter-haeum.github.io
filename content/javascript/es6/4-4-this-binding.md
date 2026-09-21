---
title: "4-4 this 바인딩"
status: "completed"
description: "this가 호출 방식에 따라 어떻게 결정되는지, 화살표 함수와 생성자 함수에서 this가 어떻게 달라지는지 정리한다."
category: "JavaScript"
section: "ES6+"
tags:
  - javascript
  - this
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
/* 핵심 요약 전용 복습 UI — JavaScript 1-1~1-5·2-1~2-3·4-3 기준과 동일. 색은 background/border/accent에만
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
  • <strong>this 결정 원리 이해</strong> — this가 고정된 값이 아니라 호출 방식에 따라 정해진다는 것을 설명할 수 있다.<br>
  • <strong>메서드 호출 vs 일반 호출 구분</strong> — 객체 메서드로 호출할 때와 함수만 따로 호출할 때 this가 달라지는 이유를 설명할 수 있다.<br>
  • <strong>화살표 함수 this 이해</strong> — 화살표 함수가 자신만의 this를 만들지 않는다는 원리를 활용할 수 있다.<br>
  • <strong>생성자 함수 this 이해</strong> — new로 호출할 때 this가 새 객체를 가리키는 원리를 설명할 수 있다.
</div>

---

## 1. this를 알아야 하는 이유

**• JavaScript: 호출 방식에 따라 달라지는 this 확인하기**

```javascript
const lessonPlayer = {
  playerName: "기초 강의 플레이어",
  showStatus() {
    console.log(this.playerName);
  },
};

const detachedShowStatus = lessonPlayer.showStatus;

lessonPlayer.showStatus();
// 기초 강의 플레이어

detachedShowStatus();
// undefined — this가 더 이상 lessonPlayer를 가리키지 않는다
```

**📌 개념**

<div class="wda-callout wda-ci">
  같은 <code>showStatus</code> 함수인데 결과가 다르다. <strong>누가, 어떻게 호출했는지</strong>에 따라 함수 안의 <code>this</code>가 달라지기 때문이다.
</div>

---

## 2. this는 호출 방식으로 정해진다

**📌 개념**

<div class="wda-callout wda-ci">
  this는 <strong>선언 위치가 아니라 호출 방식</strong>으로 정해진다. 변수의 스코프는 어디서 선언했는지로 정적으로 결정되지만, this는 함수를 <strong>어떻게 호출했는지</strong>에 따라 매번 다시 결정된다.
</div>

---

## 3. 전역에서의 this

**📌 개념**

<div class="wda-callout wda-ci">
  함수 호출 없이 최상위 코드에서 <code>this</code>를 읽으면, 브라우저에서는 <code>window</code>를 가리킨다. 실행 환경(모듈 여부 등)에 따라 값이 달라질 수 있어, 이 문서에서는 함수 호출 안에서의 this를 중심으로 다룬다.
</div>

---

## 4. 일반 함수 호출과 strict mode

**• JavaScript: 일반 함수 호출 시 this 확인하기**

```javascript
function checkThis() {
  console.log(this);
}

checkThis();
// 전역 객체 (브라우저는 window)
```

**• JavaScript: strict mode에서 this 확인하기**

```javascript
"use strict";

function checkThisStrict() {
  console.log(this);
}

checkThisStrict();
// undefined
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  일반 함수를 객체 없이 단독으로 호출하면 this는 전역 객체를 가리킨다. 다만 <strong>strict mode</strong>에서는 이 기본 동작이 꺼져 this가 <code>undefined</code>가 된다.
</div>

---

## 5. 객체 메서드 호출

**• JavaScript: 객체 메서드 호출 시 this 확인하기**

```javascript
const lessonPlayer = {
  playerName: "기초 강의 플레이어",
  currentLesson: "변수와 스코프",
  showStatus() {
    console.log(`${this.playerName}: ${this.currentLesson}`);
  },
};

lessonPlayer.showStatus();
// 기초 강의 플레이어: 변수와 스코프
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>lessonPlayer.showStatus()</code>처럼 점 앞에 객체를 붙여 호출하면, 그 메서드 안의 this는 <strong>점 앞의 객체</strong>(<code>lessonPlayer</code>)를 가리킨다.
</div>

---

## 6. 메서드를 떼어내면 생기는 문제

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">✅ 메서드로 호출</div>

점 표기법으로 호출하면 this가 유지된다.

**• JavaScript: 메서드로 호출 — this 유지**

```javascript
lessonPlayer.showStatus();
// 기초 강의 플레이어: 변수와 스코프
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">❌ 떼어내서 호출</div>

변수에 담아 따로 호출하면 this를 잃는다.

**• JavaScript: 떼어내서 호출 — this 손실**

```javascript
const detachedShowStatus =
  lessonPlayer.showStatus;

detachedShowStatus();
// undefined: undefined
```

</div>

</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  함수를 변수에 담거나 콜백으로 전달하는 순간, 더 이상 <code>lessonPlayer.showStatus()</code> 형태로 호출되지 않는다. this는 함수가 <strong>속한 객체</strong>가 아니라 <strong>호출된 방식</strong>을 기억할 뿐이다.
</div>

---

## 7. 중첩 함수 안의 this

**• JavaScript: 중첩된 일반 함수의 this 확인하기**

```javascript
const lessonPlayer = {
  playerName: "기초 강의 플레이어",
  playLesson() {
    function logStatus() {
      console.log(this.playerName);
    }
    logStatus();
  },
};

lessonPlayer.playLesson();
// undefined
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <code>logStatus</code>는 <code>playLesson</code> 안에 있지만, <strong>일반 함수로 단독 호출</strong>되었으므로 자신만의 새 this를 가진다. 그 this는 <code>lessonPlayer</code>가 아니다.
</div>

---

## 8. 화살표 함수는 this를 새로 만들지 않는다

**• JavaScript: 화살표 함수가 바깥 this를 이어받는 것 확인하기**

```javascript
const lessonPlayer = {
  playerName: "기초 강의 플레이어",
  playLesson() {
    const logStatus = () => {
      console.log(this.playerName);
    };
    logStatus();
  },
};

lessonPlayer.playLesson();
// 기초 강의 플레이어
```

**📌 개념**

<div class="wda-callout wda-ci">
  화살표 함수는 <strong>자신만의 this를 만들지 않는다</strong>. 대신 자신을 둘러싼 바깥 함수(<code>playLesson</code>)의 this를 그대로 이어받는다. <code>setTimeout</code>이나 이벤트 콜백에서도 같은 원리가 적용된다 — 일반 함수 콜백은 this를 잃기 쉽지만, 화살표 함수 콜백은 바깥 this를 그대로 사용한다.
</div>

---

## 9. 일반 함수와 화살표 함수 비교

**▶ 일반 함수 vs 화살표 함수의 this**

| 구분 | 일반 함수 | 화살표 함수 |
|---|---|---|
| this 결정 시점 | 호출될 때마다 다시 결정 | 만들어질 때 바깥 this로 고정 |
| 단독 호출 시 this | 전역 객체(strict는 undefined) | 바깥 함수의 this 그대로 |
| 메서드로 쓰기 | 적합하다 | 적합하지 않다 |

**✅ 선택 기준**

<div class="wda-callout wda-cs">
  객체 메서드는 <code>this</code>로 그 객체 자신을 가리켜야 하는 경우가 많아 <strong>일반 함수(단축 문법)</strong>가 자연스럽다. 반대로 메서드 안의 콜백처럼 <strong>바깥 this를 그대로 이어받아야</strong> 하는 경우에는 화살표 함수가 적합하다.
</div>

---

## 10. 생성자 함수에서의 this

**• JavaScript: 생성자 함수의 this 확인하기**

```javascript
function LessonPlayer(playerName) {
  this.playerName = playerName;
}

const myPlayer = new LessonPlayer("기초 강의 플레이어");

console.log(myPlayer.playerName);
// 기초 강의 플레이어
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>new</code>로 함수를 호출하면 <strong>새 객체가 만들어지고</strong>, 함수 안의 this는 그 새 객체를 가리킨다. <code>this.playerName = playerName</code>은 새로 만들어진 객체에 property를 채우는 것이다.
</div>

---

## 11. 이벤트 핸들러와 this

**• JavaScript: 이벤트 핸들러의 this**

```javascript
// button.addEventListener("click", function () {
//   console.log(this); // 클릭된 button 요소
// });
```

**📌 개념**

<div class="wda-callout wda-ci">
  이벤트 핸들러를 <strong>일반 함수</strong>로 작성하면 this는 이벤트가 발생한 요소(예: 클릭된 버튼)를 가리킨다. <strong>화살표 함수</strong>로 작성하면 이 규칙이 적용되지 않고, 핸들러를 등록한 바깥 코드의 this를 그대로 사용한다.
</div>

---

## 12. call/apply/bind는 언제 필요한가

**▶ this를 직접 지정하는 상황별 방법**

| 상황 | 방법 |
|---|---|
| this를 지정해서 즉시 실행하고 싶을 때 | `call`/`apply` |
| this가 고정된 새 함수를 만들어 나중에 쓰고 싶을 때 | `bind` |

**📌 개념**

<div class="wda-callout wda-ci">
  this를 직접 지정해야 하는 상황도 있다. <code>call</code>/<code>apply</code>/<code>bind</code>의 자세한 사용법은 별도 부록에서 다룬다 — 여기서는 "this를 직접 지정하는 방법도 있다" 정도만 기억해두면 충분하다.
</div>

---

## 13. 초보자가 자주 만나는 this 실수

<div class="wda-fgrid">

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 1 · 메서드를 콜백으로 그냥 전달</div>

**• JavaScript: 메서드를 콜백으로 그냥 전달하는 실수**

```javascript
function runLater(callback) {
  callback();
}

runLater(lessonPlayer.showStatus);
// undefined: undefined
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 콜백으로 전달되는 순간 <code>lessonPlayer.showStatus()</code> 형태의 호출이 아니게 된다.<br>
  <strong>기억할 점:</strong> this를 유지하려면 <code>() =&gt; lessonPlayer.showStatus()</code>처럼 감싸거나 bind를 사용한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 2 · 메서드를 화살표 함수로 정의</div>

**• JavaScript: 메서드를 화살표 함수로 정의하는 실수**

```javascript
const lessonPlayer2 = {
  playerName: "기초 강의 플레이어",
  showStatus: () => console.log(this.playerName),
};

lessonPlayer2.showStatus();
// undefined
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 화살표 함수는 자신만의 this가 없어 lessonPlayer2를 가리키지 못한다.<br>
  <strong>기억할 점:</strong> 객체 메서드는 일반 함수(단축 문법)로 정의한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 3 · 중첩 함수도 메서드처럼 취급</div>

**• JavaScript: 중첩 함수도 메서드처럼 취급하는 실수**

```javascript
const lessonPlayer3 = {
  playerName: "기초 강의 플레이어",
  playLesson() {
    function logStatus() {
      console.log(this.playerName);
    }
    logStatus();
  },
};

lessonPlayer3.playLesson();
// undefined
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 중첩된 일반 함수는 메서드가 아니라 단독 호출로 취급된다.<br>
  <strong>기억할 점:</strong> 바깥 this가 필요하면 화살표 함수로 만든다.
</div>

</div>

</div>

---

## 14. 실습 과제

아직 화면 조작(DOM)은 배우지 않았으니, 이번에도 Console 결과로 직접 확인한다.

**🎯 목표**

강의 플레이어 객체를 만들어 this가 호출 방식에 따라 달라지는 것을 확인한다.

**📋 요구사항**

• `lessonPlayer` 객체에 `playerName`과 `showStatus()` 메서드를 만든다.<br>
• `showStatus`를 메서드로 호출한 결과와, 변수에 담아 따로 호출한 결과를 비교한다.<br>
• `playLesson()` 안에 화살표 함수로 중첩 함수를 만들어 this가 유지되는지 확인한다.

**• JavaScript: 실습 구성 예시**

```javascript
// 구성 예시: 메서드 정의 / 메서드 vs 분리 호출 비교 / 화살표 함수로 중첩 함수 작성
```

**💡 힌트 1 — 메서드 호출**

**• JavaScript: 힌트 1 — 메서드 호출**

```javascript
const lessonPlayer = {
  playerName: "기초 강의 플레이어",
  showStatus() {
    console.log(this.playerName);
  },
};

lessonPlayer.showStatus();
// 기초 강의 플레이어
```

**💡 힌트 2 — 분리해서 호출**

**• JavaScript: 힌트 2 — 분리해서 호출**

```javascript
const detachedShowStatus = lessonPlayer.showStatus;

detachedShowStatus();
// undefined
```

**💡 힌트 3 — 화살표 함수로 유지**

**• JavaScript: 힌트 3 — 화살표 함수로 유지**

```javascript
const lessonPlayer2 = {
  playerName: "기초 강의 플레이어",
  playLesson() {
    const logStatus = () => console.log(this.playerName);
    logStatus();
  },
};

lessonPlayer2.playLesson();
// 기초 강의 플레이어
```

**📌 정리 메모**

• this는 호출 방식에 따라 정해진다.<br>
• 메서드는 일반 함수, 콜백은 화살표 함수가 자연스럽다.<br>
• this를 직접 지정하려면 call/apply/bind를 쓴다(부록 참고).

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>this는 <strong>고정된 값이 아니라 호출 방식</strong>에 따라 정해진다.</li>
    <li>일반 함수를 단독 호출하면 this는 <strong>전역 객체</strong>이며, <strong>strict mode</strong>에서는 <code>undefined</code>다.</li>
    <li><strong>객체 메서드 호출</strong>(<code>obj.method()</code>)에서는 this가 <strong>점 앞의 객체</strong>를 가리킨다.</li>
    <li>메서드를 변수에 담거나 콜백으로 넘기면 <strong>this를 잃는다</strong> — 더 이상 메서드 호출 형태가 아니기 때문이다.</li>
    <li><strong>화살표 함수</strong>는 자신만의 this를 만들지 않고 <strong>바깥 함수의 this</strong>를 그대로 사용한다.</li>
    <li><strong>생성자 함수</strong>를 <code>new</code>로 호출하면 this는 <strong>새로 만들어지는 객체</strong>를 가리킨다.</li>
    <li>this를 직접 지정하려면 <strong>call/apply/bind</strong>를 사용한다(자세한 내용은 부록).</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: this는 함수가 정의된 객체를 항상 기억한다?</div>
    <div class="wda-mistake-right">정답: this는 <strong>호출 방식</strong>에 따라 정해진다 — 정의된 위치와 무관하다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 메서드를 변수에 담아도 this는 그대로 유지된다?</div>
    <div class="wda-mistake-right">정답: 변수에 담아 따로 호출하면 <strong>this를 잃는다</strong>.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 화살표 함수도 객체 메서드로 쓰기 좋다?</div>
    <div class="wda-mistake-right">정답: 화살표 함수는 <strong>자신만의 this가 없어</strong> 메서드로 적합하지 않다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 메서드 안 중첩 함수도 자동으로 같은 this를 쓴다?</div>
    <div class="wda-mistake-right">정답: 중첩된 <strong>일반 함수</strong>는 단독 호출로 취급되어 <strong>다른 this</strong>를 가진다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 결정 기준</div>
    <div class="wda-formula-block-body"><code>this = 호출 방식으로 결정</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 함수 종류</div>
    <div class="wda-formula-block-body">
      <code>일반 함수 = 호출 시점에 결정</code><br>
      <code>화살표 함수 = 바깥 this 그대로</code>
    </div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · new</div>
    <div class="wda-formula-block-body"><code>new = 새 객체를 this로</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">this는 무엇에 따라 정해지나?</div>
    <div class="wda-flip-back">함수가 어떻게 호출됐는지(호출 방식)에 따라 정해진다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">일반 함수를 단독 호출하면 this는?</div>
    <div class="wda-flip-back">전역 객체다. strict mode에서는 undefined다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">obj.method() 호출에서 this는?</div>
    <div class="wda-flip-back">점 앞의 객체(obj)를 가리킨다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">메서드를 변수에 담아 호출하면?</div>
    <div class="wda-flip-back">this를 잃는다 — 더 이상 메서드 호출이 아니기 때문이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">화살표 함수의 this는?</div>
    <div class="wda-flip-back">자신만의 this가 없고, 바깥 함수의 this를 그대로 사용한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">생성자 함수를 new로 호출하면 this는?</div>
    <div class="wda-flip-back">새로 만들어지는 객체를 가리킨다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">this를 직접 지정하려면?</div>
    <div class="wda-flip-back">call/apply/bind를 사용한다.</div>
  </div>
</div>
