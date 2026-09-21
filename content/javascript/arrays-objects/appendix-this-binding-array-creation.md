---
title: "부록: call·apply·bind로 this 고정하기"
status: "completed"
description: "함수의 this를 원하는 객체로 고정하는 call, apply, bind의 차이와 활용법을 정리하는 보충 부록이다."
category: "JavaScript"
section: "Arrays & Objects"
tags:
  - javascript
  - this-binding
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
  • 이 부록은 함수의 this를 원하는 객체로 직접 지정하거나 고정하는 call/apply/bind를 정리하는 보충 자료다.<br>
  • 2-3(객체)에서 다룬 this 기본(메서드를 호출한 객체를 가리킨다는 점)을 넘어, this를 명시적으로 바꾸는 방법에 집중한다.
</div>

## 🎯 학습 목표

<div class="wda-goal">
  • <strong>this 문제 이해</strong> — 메서드를 함수로 따로 떼어내면 this가 사라지는 상황을 설명할 수 있다.<br>
  • <strong>call/apply 활용</strong> — 즉시 실행하며 this와 인자를 지정하는 두 메서드의 차이를 구분할 수 있다.<br>
  • <strong>bind 활용</strong> — this가 고정된 새 함수를 만들어 나중에 실행하는 패턴을 사용할 수 있다.
</div>

---

## 1. this를 고정해야 하는 이유

**• JavaScript: 메서드를 떼어내면 this를 잃는 경우**

```javascript
const speaker = {
  name: "서연",
  greet() {
    console.log(`안녕하세요, ${this.name}입니다.`);
  },
};

const greetFn = speaker.greet;

greetFn();
// this가 더 이상 speaker를 가리키지 않아 원하는 결과가 나오지 않는다
```

메서드를 객체에서 떼어내 따로 호출하면 `this`가 원래 객체를 잃어버린다. `call`/`apply`/`bind`는 이럴 때 `this`를 원하는 객체로 지정하는 도구다.

---

## 2. call: 즉시 실행하며 this 지정하기

**• JavaScript: call로 this 지정하기**

```javascript
function introduce(age, city) {
  console.log(`${this.name}는 ${age}살, ${city} 거주`);
}

const speaker = { name: "서연" };

introduce.call(speaker, 28, "서울");
// 서연는 28살, 서울 거주
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>func.call(thisArg, 인자1, 인자2, ...)</code> 형태로 사용한다. 첫 번째 인자가 <code>this</code>로 쓰일 객체이고, 나머지 인자는 쉼표로 나열해서 전달한다.
</div>

---

## 3. apply: 인자를 배열로 묶어서 전달하기

**• JavaScript: apply로 인자 배열 전달하기**

```javascript
introduce.apply(speaker, [28, "서울"]);
// 서연는 28살, 서울 거주
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">call()</div>
    인자를 쉼표로 나열해서 전달한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">apply()</div>
    인자를 배열로 묶어서 전달한다.
  </div>
</div>

---

## 4. bind: this가 고정된 새 함수 만들기

**• JavaScript: bind로 this 고정된 함수 만들기**

```javascript
const introduceSpeaker = introduce.bind(speaker);

introduceSpeaker(28, "서울");
// 서연는 28살, 서울 거주
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>bind()</code>는 <strong>즉시 실행하지 않고</strong>, this가 고정된 새 함수를 반환한다. 이벤트 핸들러나 콜백처럼 <strong>나중에</strong> 실행할 함수의 this를 미리 고정해둘 때 주로 쓴다.
</div>

---

## 5. call / apply / bind 비교

**▶ call·apply·bind 비교**

| 메서드 | 실행 시점 | 인자 전달 방식 | 반환값 |
|---|---|---|---|
| `call()` | 즉시 실행 | 쉼표로 나열 | 함수의 실행 결과 |
| `apply()` | 즉시 실행 | 배열로 묶음 | 함수의 실행 결과 |
| `bind()` | 나중에 실행 | 쉼표로 나열 | this가 고정된 새 함수 |

---

## 6. 초보자가 자주 만나는 실수

<div class="wda-fgrid">

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 1 · apply에 배열 대신 나열</div>

**• JavaScript: apply에 배열 대신 나열하는 실수**

```javascript
introduce.apply(speaker, 28, "서울");
// ❌ TypeError (일부러 에러 확인용)
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> apply의 두 번째 인자는 반드시 배열(또는 유사 배열)이어야 한다.<br>
  <strong>기억할 점:</strong> apply는 인자를 배열로 묶어서 전달한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 2 · bind가 즉시 실행된다는 착각</div>

**• JavaScript: bind가 즉시 실행된다는 착각**

```javascript
const introduceSpeaker = introduce.bind(speaker);
console.log("bind 호출 직후");
introduceSpeaker(28, "서울");
// "bind 호출 직후"가 먼저 출력되고, 그다음 소개 문구가 출력된다
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> bind는 즉시 실행되지 않고 새 함수만 반환한다.<br>
  <strong>기억할 점:</strong> 반환된 함수를 직접 호출해야 실행된다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 3 · 화살표 함수에 bind 사용</div>

**• JavaScript: 화살표 함수에 bind 사용하는 실수**

```javascript
const speaker = {
  name: "서연",
  greet: () => console.log(this.name),
};

const bound = speaker.greet.bind(speaker);
bound();
// this가 speaker를 가리키지 않는다 — bind가 효과를 내지 못한다
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 화살표 함수는 자신만의 this가 없어 call/apply/bind로 바꿀 수 없다.<br>
  <strong>기억할 점:</strong> this를 고정하려면 일반 함수에 사용한다.
</div>

</div>

</div>

---

## 7. 실습 과제

**🎯 목표**

call/apply/bind로 함수의 this를 원하는 객체로 지정해본다.

**📋 요구사항**

• `introduce` 함수를 `call`로 실행한다.<br>
• 같은 함수를 `apply`로 실행한다.<br>
• `bind`로 새 함수를 만들어 나중에 실행한다.

**• JavaScript: 실습 구성 예시**

```javascript
// 구성 예시: call 실행 / apply 실행 / bind로 새 함수 만들기
```

**💡 힌트 1 — call**

**• JavaScript: 힌트 1 — call**

```javascript
function introduce(age) {
  console.log(`${this.name}는 ${age}살`);
}

const speaker = { name: "도윤" };

introduce.call(speaker, 31);
// 도윤는 31살
```

**💡 힌트 2 — apply**

**• JavaScript: 힌트 2 — apply**

```javascript
introduce.apply(speaker, [31]);
// 도윤는 31살
```

**💡 힌트 3 — bind**

**• JavaScript: 힌트 3 — bind**

```javascript
const introduceSpeaker = introduce.bind(speaker);

introduceSpeaker(31);
// 도윤는 31살
```

**📌 정리 메모**

• call/apply는 즉시 실행, bind는 나중에 실행할 새 함수를 만든다.<br>
• apply만 인자를 배열로 묶어서 전달한다.<br>
• 화살표 함수는 this를 바꿀 수 없다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>메서드를 변수에 따로 떼어내면 <strong>this가 원래 객체를 가리키지 않게</strong> 된다.</li>
    <li><strong>call()</strong>은 즉시 실행하며 인자를 <strong>쉼표로 나열</strong>해 전달한다.</li>
    <li><strong>apply()</strong>는 call()과 동작은 같지만 인자를 <strong>배열로 묶어서</strong> 전달한다.</li>
    <li><strong>bind()</strong>는 즉시 실행하지 않고, this가 고정된 <strong>새 함수를 반환</strong>한다.</li>
    <li><strong>화살표 함수</strong>는 자신만의 this가 없어 call/apply/bind로 this를 바꿀 수 없다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: call, apply, bind는 모두 함수를 즉시 실행한다?</div>
    <div class="wda-mistake-right">정답: call과 apply는 즉시 실행하지만, <strong>bind는 새 함수를 반환</strong>할 뿐 즉시 실행하지 않는다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: apply에도 인자를 쉼표로 나열해서 넘기면 된다?</div>
    <div class="wda-mistake-right">정답: apply는 인자를 반드시 <strong>배열</strong>로 묶어서 전달해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 화살표 함수도 bind로 this를 바꿀 수 있다?</div>
    <div class="wda-mistake-right">정답: 화살표 함수는 자신만의 this가 없어 <strong>bind가 효과를 내지 못한다</strong>.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 실행 시점</div>
    <div class="wda-formula-block-body">
      <code>call/apply = 즉시 실행</code><br>
      <code>bind = 나중에(새 함수)</code>
    </div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 인자 전달</div>
    <div class="wda-formula-block-body">
      <code>call/bind = 쉼표로 나열</code><br>
      <code>apply = 배열로 묶음</code>
    </div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 화살표 함수</div>
    <div class="wda-formula-block-body"><code>this 고정 불가</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">call과 apply의 차이는?</div>
    <div class="wda-flip-back">인자 전달 방식 — call은 쉼표로 나열, apply는 배열로 묶는다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">bind()의 반환값은?</div>
    <div class="wda-flip-back">this가 고정된 새 함수다(즉시 실행하지 않는다).</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">apply의 두 번째 인자는 어떤 형태여야 하나?</div>
    <div class="wda-flip-back">배열(또는 유사 배열)이어야 한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">메서드를 변수에 따로 떼어내면 왜 문제가 되나?</div>
    <div class="wda-flip-back">this가 원래 객체를 잃어버리기 때문이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">bind는 언제 주로 쓰나?</div>
    <div class="wda-flip-back">이벤트 핸들러나 콜백에서 this를 미리 고정해야 할 때 쓴다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">화살표 함수에 bind를 쓰면?</div>
    <div class="wda-flip-back">this가 바뀌지 않는다 — 효과가 없다.</div>
  </div>
</div>
