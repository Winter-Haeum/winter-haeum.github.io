---
title: "3-1 문자열 메서드"
status: "completed"
description: "탐색·추출·변환·분리결합 네 갈래로 문자열 메서드를 묶어, 코딩테스트에서 어떤 상황에 어떤 메서드를 골라야 하는지 정리한다."
category: "Coding Test"
section: "Coding Test"
tags:
  - coding-test
  - string
  - javascript
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

## 🎯 학습 목표

<div class="wda-goal">
  • <strong>탐색·추출 패턴</strong> — 문자가 있는지, 어디 있는지, 일부를 잘라내는 방법을 익힙니다<br>
  • <strong>변환 패턴</strong> — 대소문자·공백을 다루는 방법을 익힙니다<br>
  • <strong>분리·결합 패턴</strong> — split과 join으로 문자열과 배열을 오가는 방법을 익힙니다
</div>

---

## 1. 문자열은 불변이다

문자열은 한 번 만들어지면 내용을 직접 바꿀 수 없습니다. 모든 메서드는 항상 **새 문자열**을 반환합니다.

**• JavaScript: 문자열의 불변성**

```js
const str = "Hello";

str[0] = 'X';       // 아무 효과 없음
console.log(str);   // 여전히 "Hello"

const upper = str.toUpperCase(); // 새 문자열을 만들어 반환
```

바꾼 값을 쓰려면 반드시 변수에 다시 담아야 합니다.

---

## 2. 탐색 패턴: 있는지, 어디 있는지

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">위치가 필요할 때 · indexOf</div>
    찾는 문자가 몇 번째에 있는지 알아야 할 때 씁니다. 없으면 -1을 반환합니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">존재 여부만 필요할 때 · includes</div>
    위치는 필요 없고 있는지 여부만 궁금할 때 씁니다. true/false를 반환합니다.
  </div>
</div>

**• JavaScript: 문자열 탐색 메서드**

```js
const str = "Hello World";

str.indexOf("World");   // 6
str.indexOf("X");       // -1 (없음)
str.includes("World");  // true
str.startsWith("Hello"); // 시작 부분 확인
str.endsWith("d");        // 끝 부분 확인
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>모든 탐색 메서드는 대소문자를 구분합니다. 대소문자 구분 없이 찾으려면 양쪽을 모두 <code>toLowerCase()</code>로 맞춘 뒤 비교합니다.</p>
</div>

---

## 3. 추출 패턴: 일부만 잘라내기

`slice(시작, 끝)`은 시작 인덱스부터 끝 인덱스 **직전**까지 잘라냅니다. 음수를 넣으면 뒤에서부터 셉니다.

**• JavaScript: slice로 문자열 추출**

```js
const str = "Hello World";

str.slice(0, 5);   // "Hello"
str.slice(6);      // "World" (끝까지)
str.slice(-5);     // "World" (뒤에서 5글자)
```

**💡 설명**

<div class="wda-callout wda-ci">
  <p>비슷한 메서드로 <code>substring</code>이 있지만, 음수를 넣으면 0으로 취급해버려 의도와 다르게 동작할 수 있습니다. 코딩테스트에서는 배열의 <code>slice</code>와 동작이 같은 <strong>slice</strong> 쪽을 기본으로 사용합니다.</p>
</div>

---

## 4. 변환 패턴: 대소문자와 공백

**• JavaScript: 대소문자·공백 변환**

```js
const input = "  Hello World  ";

input.toUpperCase(); // "  HELLO WORLD  "
input.toLowerCase(); // "  hello world  "
input.trim();        // "Hello World" (양쪽 공백 제거)
```

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">대소문자 무시 비교</div><div class="wda-fcard-dsc"><code>a.toLowerCase() === b.toLowerCase()</code>로 대소문자와 무관하게 같은 값인지 확인합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">입력 정리</div><div class="wda-fcard-dsc">사용자 입력을 다루는 문제라면 <code>trim()</code>으로 앞뒤 공백부터 정리합니다.</div></div>
</div>

---

## 5. 분리·결합 패턴: split과 join

문자열과 배열을 오가는 이 조합은 코딩테스트에서 가장 자주 쓰이는 패턴입니다.

**• JavaScript: split과 join으로 변환**

```js
// 문자열 → 배열
"a,b,c".split(",");   // ["a", "b", "c"]
"Hello".split("");    // ["H", "e", "l", "l", "o"] (한 글자씩)

// 배열 → 문자열
["a", "b", "c"].join("-"); // "a-b-c"
["a", "b", "c"].join("");  // "abc"
```

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p><strong>공식: <code>split(A).join(B)</code>는 "A를 B로 바꾸기"와 같습니다.</strong> 예를 들어 <code>"010-1234".split("-").join("")</code>은 하이픈을 전부 제거하는 효과를 냅니다.</p>
</div>

문자열 뒤집기처럼 문자열 자체에는 없는 기능도 이 조합으로 해결합니다.

**• JavaScript: split·join으로 문자열 뒤집기**

```js
const reversed = "Hello".split("").reverse().join(""); // "olleH"
```

---

## 6. 치환 패턴: replace와 replaceAll

**• JavaScript: replace와 replaceAll 비교**

```js
"Hello World".replace("o", "0");     // "Hell0 World" (첫 번째만)
"Hello World".replaceAll("o", "0");  // "Hell0 W0rld" (전부)

// 자주 쓰는 패턴: 특정 문자 전부 제거
"a b c".replaceAll(" ", ""); // "abc"
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><code>replace</code>는 첫 번째로 일치하는 것만 바꿉니다. 전체를 바꾸려면 <code>replaceAll</code>을 써야 합니다.</p>
</div>

---

## 7. 문자 코드가 필요한 문제

알파벳 순서를 계산하거나 문자를 이동시켜야 하는 문제에서 사용합니다.

**• JavaScript: 문자 코드 변환**

```js
"c".charCodeAt(0) - "a".charCodeAt(0); // 2 (a 기준 c는 두 칸 뒤)

String.fromCharCode(65); // "A" (코드 → 문자)
```

---

## 8. 메서드 한눈에 보기

**▶ 문자열 메서드 총정리**

<table class="wda-mtable">
<thead><tr><th>분류</th><th>메서드</th><th>주의할 점</th></tr></thead>
<tbody>
<tr><td>탐색</td><td>indexOf / includes</td><td>대소문자를 구분한다</td></tr>
<tr><td>추출</td><td>slice</td><td>음수 인덱스를 지원해 substring보다 직관적이다</td></tr>
<tr><td>변환</td><td>toUpperCase / toLowerCase / trim</td><td>항상 새 문자열을 반환한다</td></tr>
<tr><td>분리/결합</td><td>split / join</td><td>문자열 ↔ 배열 변환의 짝꿍이다</td></tr>
<tr><td>치환</td><td>replace / replaceAll</td><td>replace는 첫 번째만 바꾼다</td></tr>
<tr><td>코드값</td><td>charCodeAt / fromCharCode</td><td>알파벳 순서 계산에 쓰인다</td></tr>
</tbody>
</table>

---

## 9. 흔한 실수

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>str[0] = 'X'로 문자열을 직접 수정하려는 경우</strong></p>
  <p>문자열은 불변이라 대입이 조용히 무시됩니다. 새 문자열을 만들어 변수에 다시 담아야 합니다.</p>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>replace 한 번으로 모든 문자가 바뀔 것이라 기대하는 경우</strong></p>
  <p><code>replace</code>는 첫 번째 일치만 바꿉니다. 전체를 바꾸려면 <code>replaceAll</code>을 사용합니다.</p>
</div>

---

## 10. ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>문자열은 <strong>불변</strong>이라 인덱스로 직접 수정할 수 없고, 메서드는 항상 <strong>새 문자열</strong>을 반환한다.</li>
    <li>위치가 필요하면 <code>indexOf</code>, 있는지 여부만 필요하면 <code>includes</code>를 쓴다.</li>
    <li>자르기는 음수 인덱스를 지원하는 <code>slice</code>를 기본으로 쓴다.</li>
    <li><code>split</code> ↔ <code>join</code>은 문자열 ↔ 배열 변환 짝꿍이며 코딩테스트 빈출 1순위다.</li>
    <li><code>replace</code>는 첫 번째만 바꾸고, 전체를 바꾸려면 <code>replaceAll</code>을 쓴다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: str[0] = 'X'로 문자열을 바로 수정할 수 있다?</div>
    <div class="wda-mistake-right">정답: 문자열은 <strong>불변</strong>이라 대입이 무시되며, 새 문자열을 만들어 다시 담아야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: slice와 substring은 완전히 같은 메서드다?</div>
    <div class="wda-mistake-right">정답: 음수를 넣었을 때 slice는 <strong>뒤에서부터 계산</strong>하지만, substring은 <strong>0으로 취급</strong>해버린다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: includes / startsWith는 대소문자를 구분하지 않는다?</div>
    <div class="wda-mistake-right">정답: 모든 문자열 메서드는 기본적으로 <strong>대소문자를 구분</strong>한다.</div>
  </div>
</div>

**🧩 풀이 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 문자열 뒤집기</div>
    <div class="wda-formula-block-body"><code>str.split("").reverse().join("")</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 문자 치환/제거</div>
    <div class="wda-formula-block-body"><code>split(A).join(B)</code> = A를 B로 바꾸기</div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 대소문자 무시 비교</div>
    <div class="wda-formula-block-body"><code>a.toLowerCase() === b.toLowerCase()</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">문자열이 불변이라는 것은?</div>
    <div class="wda-flip-back">한 번 만들면 인덱스로 직접 바꿀 수 없고, 모든 메서드는 항상 새 문자열을 반환한다는 뜻입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">indexOf와 includes의 차이는?</div>
    <div class="wda-flip-back">indexOf는 위치(숫자 또는 -1)를 반환하고, includes는 존재 여부(true/false)만 반환합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">split과 join의 관계는?</div>
    <div class="wda-flip-back">split은 문자열을 배열로 쪼개고, join은 배열을 문자열로 합치는 짝꿍 메서드입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">replace와 replaceAll의 차이는?</div>
    <div class="wda-flip-back">replace는 첫 번째로 일치하는 것만 바꾸고, replaceAll은 모두 바꿉니다.</div>
  </div>
</div>
