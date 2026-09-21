---
title: "2-3 객체로 이름 붙은 데이터 관리하기"
status: "completed"
description: "객체 리터럴부터 프로퍼티 접근, 중첩 객체, 메서드와 this, 순회, 복사까지 객체의 핵심 개념을 정리한다."
category: "JavaScript"
section: "Arrays & Objects"
tags:
  - javascript
  - objects
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
/* 핵심 요약 전용 복습 UI — JavaScript 1-1~1-5·2-1·2-2 기준과 동일. 색은 background/border/accent에만
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
  • <strong>객체 개념 이해</strong> — 이름이 붙은 값 묶음인 객체가 왜 필요한지 설명할 수 있다.<br>
  • <strong>property 다루기</strong> — key/value를 읽고 수정하고 추가·삭제할 수 있다.<br>
  • <strong>중첩 구조 이해</strong> — 중첩 객체, 객체 안 배열/배열 안 객체를 다룰 수 있다.<br>
  • <strong>메서드와 순회</strong> — 객체 메서드와 this 기본, Object.keys 등으로 객체를 순회할 수 있다.
</div>

---

## 1. 객체가 필요한 순간

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">❌ 변수를 따로따로 만들면</div>

**• JavaScript: 변수를 따로따로 만드는 경우**

```javascript
const userName = "지수";
const userLevel = "골드";
const userJoinedYear = 2023;
```

값이 늘어날 때마다 변수 이름을 새로 짓고 관리해야 한다.

</div>

<div class="wda-compare-card wda-modern">

<div class="wda-compare-ttl">✅ 객체 하나로 묶으면</div>

**• JavaScript: 객체 하나로 묶기**

```javascript
const userProfile = {
  name: "지수",
  level: "골드",
  joinedYear: 2023,
};
```

관련된 값들이 하나의 이름 아래 정리된다.

</div>

</div>

---

## 2. 객체는 이름이 붙은 값 묶음이다

배열이 순서가 있는 값 목록이라면, 객체는 각 값에 <strong>이름(key)</strong>이 붙은 값 묶음이다.

**• JavaScript: 객체 값 확인하기**

```javascript
console.log(userProfile);
// { name: "지수", level: "골드", joinedYear: 2023 }
```

---

## 3. property / key / value 이해하기

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">key</div>
    property의 이름 — <code>"name"</code>, <code>"level"</code> 같은 문자열.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">value</div>
    key에 대응하는 실제 데이터 — <code>"지수"</code>, <code>"골드"</code>.
  </div>
</div>

`key: value` 하나하나를 <strong>property</strong>라고 부른다.

**📌 개념**

<div class="wda-callout wda-ci">
  key는 기본적으로 <strong>문자열</strong>처럼 다뤄진다. <code>userProfile.joinedYear</code>처럼 숫자를 값으로 써도, key 자체(<code>joinedYear</code>)는 문자열로 취급된다.
</div>

---

## 4. 객체 만들기: 객체 리터럴

중괄호 `{}`로 만들며, 값이 없으면 빈 객체를 만들 수도 있다.

**• JavaScript: 객체 리터럴로 객체 만들기**

```javascript
const userProfile = {
  name: "지수",
  level: "골드",
};

const emptyCard = {};

console.log(userProfile);
// { name: "지수", level: "골드" }
```

---

## 5. 값 읽기: 점 표기법과 대괄호 표기법

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">점 표기법</div>
    이름이 고정돼 있을 때 사용한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">대괄호 표기법</div>
    변수로 이름을 골라야 할 때 사용한다.
  </div>
</div>

**• JavaScript: 점 표기법·대괄호 표기법으로 값 읽기**

```javascript
console.log(userProfile.name);
// "지수"

console.log(userProfile["level"]);
// "골드"
```

**• JavaScript: 변수로 property 이름 고르기**

```javascript
const profileKey = "level";

console.log(userProfile[profileKey]);
// "골드" — 변수 profileKey에 담긴 값이 key로 쓰인다
```

**💡 보충 설명**

<div class="wda-callout wda-ci">
  구조분해 할당으로 property 값을 변수로 바로 꺼낼 수도 있다.<br>
  <code>const { name, level } = userProfile;</code> — 자세한 활용은 여기서는 다루지 않는다.
</div>

---

## 6. 값 수정하기

**• JavaScript: property 값 수정하기**

```javascript
userProfile.level = "플래티넘";

console.log(userProfile.level);
// "플래티넘"
```

---

## 7. 새 property 추가하기

**• JavaScript: 새 property 추가하기**

```javascript
userProfile.contactInfo = "jisoo@example.com";

console.log(userProfile);
// { name: "지수", level: "플래티넘", contactInfo: "jisoo@example.com" }
```

**💡 보충 설명**

<div class="wda-callout wda-ci">
  대괄호 안에 변수를 넣으면 그 변수의 값이 property 이름이 된다(computed property).
</div>

**• JavaScript: computed property로 이름 정하기**

```javascript
const profileKey = "badge";

userProfile[profileKey] = "인증회원";

console.log(userProfile.badge);
// "인증회원"
```

---

## 8. property 삭제하기

**• JavaScript: delete로 property 삭제하기**

```javascript
delete userProfile.contactInfo;

console.log(userProfile);
// { name: "지수", level: "플래티넘", badge: "인증회원" }
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>delete</code>는 객체에서 property를 완전히 제거한다. 값을 <code>undefined</code>로 바꾸는 것과는 다르다 — <code>delete</code> 이후에는 key 자체가 사라진다.
</div>

---

## 9. 중첩 객체 다루기

**• JavaScript: 중첩 객체 값 읽기**

```javascript
const userProfile = {
  name: "지수",
  settings: {
    theme: "dark",
    language: "ko",
  },
};

console.log(userProfile.settings.theme);
// "dark"
```

**• JavaScript: 중첩 객체 값 수정하기**

```javascript
userProfile.settings.theme = "light";

console.log(userProfile.settings.theme);
// "light"
```

없는 중간 경로에 접근하면 에러가 난다.

**• JavaScript: 없는 중간 경로 접근 — 에러 예시**

```javascript
console.log(userProfile.address.city);
// ❌ TypeError (일부러 에러 확인용)
```

**• JavaScript: 옵셔널 체이닝으로 안전하게 접근하기**

```javascript
console.log(userProfile.address?.city);
// undefined — ?.는 중간 경로가 없어도 에러 없이 통과한다
```

---

## 10. 객체 안 배열과 배열 안 객체

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">객체 안 배열</div>

한 사용자가 여러 값을 목록으로 가질 때.

**• JavaScript: 객체 안 배열 다루기**

```javascript
const userProfile = {
  name: "지수",
  badges: ["신규가입", "인증회원"],
};

console.log(userProfile.badges[0]);
// "신규가입"
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">배열 안 객체</div>

여러 사용자를 목록으로 관리할 때.

**• JavaScript: 배열 안 객체 다루기**

```javascript
const profileList = [
  { name: "지수", level: "골드" },
  { name: "민호", level: "실버" },
];

console.log(profileList[0].name);
// "지수"
```

</div>

</div>

---

## 11. 객체 안 함수: 메서드

객체의 property 값이 함수이면 이를 <strong>메서드</strong>라고 부른다.

**• JavaScript: 객체 메서드 정의하기**

```javascript
const userProfile = {
  name: "지수",
  greet() {
    console.log(`안녕하세요, ${this.name}입니다.`);
  },
};

userProfile.greet();
// 안녕하세요, 지수입니다.
```

---

## 12. 메서드 안에서 자기 객체 읽기: this 기본

**📌 개념**

<div class="wda-callout wda-ci">
  <code>this</code>는 <strong>메서드를 호출한 객체</strong>와 연결된다. <code>userProfile.showLevel()</code>처럼 호출하면, 메서드 안의 <code>this</code>는 <code>userProfile</code>을 가리킨다.
</div>

**• JavaScript: 메서드 안에서 this로 값 읽기**

```javascript
const userProfile = {
  name: "지수",
  showLevel() {
    console.log(this.name);
  },
};

userProfile.showLevel();
// "지수"
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  메서드를 화살표 함수로 정의하면 <code>this</code>가 기대와 다르게 동작한다. 화살표 함수는 자신만의 <code>this</code>를 만들지 않고, 객체 리터럴 바깥의 <code>this</code>를 그대로 이어받기 때문이다. 브라우저 콘솔에서는 최상위 <code>this</code>가 <code>window</code>인데, <code>window.name</code>은 원래 존재하는 속성이라 기본값이 <code>undefined</code>가 아니라 빈 문자열 <code>""</code>이다.
</div>

**• JavaScript: 화살표 함수 메서드의 this 문제**

```javascript
const userProfile = {
  name: "지수",
  showLevel: () => {
    console.log(this.name);
  },
};

userProfile.showLevel();
// userProfile을 가리키지 않는다 — 실제 값은 this가 무엇인지(실행 환경)에 따라 다르다
// 브라우저 콘솔: "" (최상위 this는 window이고, window.name의 기본값은 빈 문자열이다)
```

---

## 13. 객체를 하나씩 확인하기

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">key 꺼내기</div><div class="wda-fnode-dsc">property 이름을 하나씩 가져온다.</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">값 읽기</div><div class="wda-fnode-dsc">대괄호로 그 key의 값을 읽는다.</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">반복</div><div class="wda-fnode-dsc">모든 key를 다 돌 때까지 반복한다.</div></div>
</div>

**• JavaScript: for...in으로 객체 순회하기**

```javascript
const userProfile = { name: "지수", level: "골드" };

for (const key in userProfile) {
  console.log(key, userProfile[key]);
}
// name 지수
// level 골드
```

---

## 14. Object.keys / Object.values / Object.entries

**▶ Object.keys·values·entries 반환값**

| 메서드 | 반환값 |
|---|---|
| `Object.keys()` | key로 이루어진 배열 |
| `Object.values()` | value로 이루어진 배열 |
| `Object.entries()` | `[key, value]` 쌍으로 이루어진 배열 |

**• JavaScript: Object.keys·values·entries 사용하기**

```javascript
const userProfile = { name: "지수", level: "골드" };

console.log(Object.keys(userProfile));
// ["name", "level"]

console.log(Object.values(userProfile));
// ["지수", "골드"]

const profileEntries = Object.entries(userProfile);
console.log(profileEntries);
// [["name", "지수"], ["level", "골드"]]
```

---

## 15. property 존재 여부 확인하기: in

**• JavaScript: in으로 property 존재 확인하기**

```javascript
const userProfile = { name: "지수", level: "골드" };

console.log("name" in userProfile);
// true

console.log("email" in userProfile);
// false
```

---

## 16. 객체 복사와 spread 문법

**• JavaScript: 객체 대입 — 참조 공유**

```javascript
const userProfile = { name: "지수", level: "골드" };
const copiedProfile = userProfile;

copiedProfile.level = "플래티넘";

console.log(userProfile.level);
// "플래티넘" — 같은 객체를 가리켜 원본도 바뀐다
```

**• JavaScript: spread로 객체 복사하기**

```javascript
const userProfile = { name: "지수", level: "골드" };
const updatedProfile = { ...userProfile, level: "플래티넘" };

console.log(userProfile.level);
// "골드" — 원본은 그대로다

console.log(updatedProfile.level);
// "플래티넘"
```

---

## 17. 얕은 복사 주의

**• JavaScript: spread 얕은 복사의 함정**

```javascript
const userProfile = {
  name: "지수",
  settings: { theme: "dark" },
};

const copiedProfile = { ...userProfile };

copiedProfile.settings.theme = "light";

console.log(userProfile.settings.theme);
// "light" — 중첩된 객체는 같은 참조를 공유한다
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <code>{ ...obj }</code>(spread)는 <strong>1단계만</strong> 복사한다. 중첩된 객체·배열까지 완전히 분리하려면 별도의 방법이 필요하다.
</div>

---

## 18. 초보자가 자주 만나는 객체 실수

<div class="wda-fgrid">

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 1 · 변수를 점 표기법에 사용</div>

**• JavaScript: 변수를 점 표기법에 사용하는 실수**

```javascript
const userProfile = { name: "지수" };
const profileKey = "name";

console.log(userProfile.profileKey);
// undefined
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 점 표기법은 실제 이름이 "profileKey"인 property를 찾는다.<br>
  <strong>기억할 점:</strong> 변수 값으로 접근하려면 대괄호 표기법을 쓴다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 2 · 화살표 함수를 메서드로 사용</div>

**• JavaScript: 화살표 함수를 메서드로 사용하는 실수**

```javascript
const userProfile = {
  name: "지수",
  greet: () => console.log(this.name),
};

userProfile.greet();
// userProfile을 가리키지 않는다 — 실제 값은 실행 환경마다 다르다(12번 참고, 브라우저 콘솔: "")
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 화살표 함수는 자신만의 this가 없어 바깥 스코프의 this를 그대로 쓴다.<br>
  <strong>기억할 점:</strong> 메서드는 일반 함수(단축 문법)로 정의한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 3 · spread 복사가 완전 분리라는 착각</div>

**• JavaScript: spread 복사가 완전 분리라는 착각**

```javascript
const userProfile = { settings: { theme: "dark" } };
const copiedProfile = { ...userProfile };

copiedProfile.settings.theme = "light";
console.log(userProfile.settings.theme);
// "light"
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> spread는 1단계만 복사해 중첩 객체는 참조를 공유한다.<br>
  <strong>기억할 점:</strong> 중첩 객체까지 분리하려면 별도의 방법이 필요하다.
</div>

</div>

</div>

---

## 19. 실습 과제

아직 화면 조작(DOM)은 배우지 않았으니, 이번에도 Console 결과로 직접 확인한다.

**🎯 목표**

사용자 프로필 객체를 만들고, property를 읽고 수정·추가·삭제해본다.

**📋 요구사항**

• `userProfile` 객체를 `name`/`level`로 만든다.<br>
• 점 표기법과 대괄호 표기법으로 값을 읽는다.<br>
• 새 property를 추가하고 `delete`로 삭제한다.<br>
• `Object.keys`로 key 목록을 확인한다.

**• JavaScript: 실습 구성 예시**

```javascript
// 구성 예시: 객체 생성 / 값 읽기 / property 추가·삭제 / key 목록 확인
```

**💡 힌트 1 — 객체 만들고 읽기**

**• JavaScript: 힌트 1 — 객체 만들고 읽기**

```javascript
const userProfile = {
  name: "지수",
  level: "골드",
};

console.log(userProfile.name);
// "지수"
```

**💡 힌트 2 — property 추가와 삭제**

**• JavaScript: 힌트 2 — property 추가와 삭제**

```javascript
userProfile.badge = "신규가입";
console.log(userProfile);
// { name: "지수", level: "골드", badge: "신규가입" }

delete userProfile.badge;
console.log(userProfile);
// { name: "지수", level: "골드" }
```

**💡 힌트 3 — key 목록 확인**

**• JavaScript: 힌트 3 — key 목록 확인**

```javascript
console.log(Object.keys(userProfile));
// ["name", "level"]
```

**📌 정리 메모**

• 객체는 key(이름)와 value(값)의 묶음이다.<br>
• 변수로 이름을 고를 때는 대괄호 표기법을 쓴다.<br>
• spread 복사는 1단계만 복사한다(얕은 복사).

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>객체는 <code>{}</code>로 만들며, <strong>이름(key)이 붙은 값(value)의 묶음</strong>이다.</li>
    <li>key는 기본적으로 <strong>문자열</strong>처럼 다뤄지고, value는 어떤 타입이든 담을 수 있다.</li>
    <li><strong>점 표기법</strong>은 고정된 이름에, <strong>대괄호 표기법</strong>은 변수로 이름을 고를 때 적합하다.</li>
    <li>새 property는 <strong>대입만으로 추가</strong>되고, <strong>delete</strong>로 제거할 수 있다.</li>
    <li>객체 메서드 안 <strong>this</strong>는 그 메서드를 호출한 객체를 가리키며, <strong>화살표 함수로 정의하면 이 규칙이 깨진다</strong>.</li>
    <li><strong>Object.keys/values/entries</strong>로 key, value, [key, value] 쌍을 배열로 꺼낼 수 있다.</li>
    <li><strong>spread(...)</strong>로 복사하면 원본과 분리되지만, <strong>중첩된 객체는 1단계만 복사</strong>되어 참조를 공유한다(얕은 복사).</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 변수에 담긴 값으로 점 표기법을 쓸 수 있다?</div>
    <div class="wda-mistake-right">정답: 점 표기법은 변수를 해석하지 않는다 — <strong>대괄호 표기법</strong>을 써야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 객체 메서드는 화살표 함수로 정의해도 된다?</div>
    <div class="wda-mistake-right">정답: 화살표 함수는 자신만의 <strong>this</strong>가 없어 메서드로 적합하지 않다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: spread(...)로 복사하면 완전히 분리된다?</div>
    <div class="wda-mistake-right">정답: <strong>1단계만</strong> 복사되고, 중첩 객체는 참조를 공유한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 존재하지 않는 property를 읽으면 항상 에러가 난다?</div>
    <div class="wda-mistake-right">정답: property 자체가 없으면 <strong>undefined</strong>일 뿐 에러가 아니다. 다만 그 값이 없는 상태에서 한 단계 더 접근하면 에러가 난다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 접근 방법</div>
    <div class="wda-formula-block-body">
      <code>점 표기법 = 고정된 이름</code><br>
      <code>대괄호 표기법 = 변수로 고른 이름</code>
    </div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 순회</div>
    <div class="wda-formula-block-body">
      <code>keys = key 배열</code><br>
      <code>values = value 배열</code><br>
      <code>entries = [key, value] 쌍</code>
    </div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 복사</div>
    <div class="wda-formula-block-body">
      <code>spread 복사 = 새 객체(1단계만)</code><br>
      <code>중첩 객체 = 참조 공유</code>
    </div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">객체는 무엇으로 이루어지나?</div>
    <div class="wda-flip-back">key(이름)와 value(값)의 쌍인 property로 이루어진다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">점 표기법과 대괄호 표기법의 차이는?</div>
    <div class="wda-flip-back">점 표기법은 고정된 이름에, 대괄호 표기법은 변수로 이름을 고를 때 사용한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">property를 제거하려면?</div>
    <div class="wda-flip-back">delete 연산자를 사용한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">this는 객체 메서드에서 무엇을 가리키나?</div>
    <div class="wda-flip-back">그 메서드를 호출한 객체를 가리킨다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">화살표 함수를 메서드로 쓰면 안 되는 이유는?</div>
    <div class="wda-flip-back">화살표 함수는 자신만의 this를 만들지 않기 때문이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Object.entries()는 무엇을 반환하나?</div>
    <div class="wda-flip-back">[key, value] 쌍으로 이루어진 배열을 반환한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">spread로 복사할 때 주의할 점은?</div>
    <div class="wda-flip-back">중첩된 객체는 1단계만 복사되어 참조를 공유한다(얕은 복사).</div>
  </div>
</div>
