---
title: "1-2 Jest 시작하기"
category: "frontend"
section: "testing"
date: "2026-08-03"
status: "completed"
description: "자바스크립트 테스트 프레임워크 Jest의 역할과 test·expect·describe 기본 구조, 자주 쓰는 matcher를 정리합니다."
---

<style>
.wda-callout{border-radius:10px;padding:12px 14px;margin:.8rem 0 1.1rem;border-left:3px solid;font-size:.9rem;line-height:1.75}
.wda-ci{background:rgba(139,92,246,.06);border-color:#8b5cf6}
.wda-cw{background:rgba(245,158,11,.07);border-color:#f59e0b}
.wda-cs{background:rgba(34,197,94,.05);border-color:#22c55e}
.wda-cb{background:rgba(59,130,246,.06);border-color:#3b82f6}
.wda-clabel{font-size:.7rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px;display:block}
.wda-ci .wda-clabel{color:#8b5cf6}
.wda-cw .wda-clabel{color:#f59e0b}
.wda-cs .wda-clabel{color:#22c55e}
.wda-cb .wda-clabel{color:#3b82f6}
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
  • <strong>Jest의 역할 이해</strong> — 테스트를 실행하고 결과를 판정해주는 도구라는 것을 파악합니다<br>
  • <strong>기본 구조 익히기</strong> — test, expect, describe가 각각 무엇을 담당하는지 정리합니다<br>
  • <strong>자주 쓰는 matcher 파악</strong> — toBe, toEqual 같은 검증 방법의 차이를 이해합니다<br>
  • <strong>생태계 감 잡기</strong> — Jest 외에 Vitest 같은 도구도 있다는 것을 알아둡니다
</div>

---

## 1. Jest란

1-1에서 배운 TDD의 흐름을 실제 코드로 확인하려면 테스트를 실행하고 통과/실패를 판정해주는 도구가 필요합니다.

이 문서에서는 그 역할을 하는 대표적인 도구인 Jest의 기본 문법을 다룹니다. 컴포넌트를 렌더링해서 검증하는 방법은 다음 문서(1-3 간단한 컴포넌트 테스트 작성하기)에서 이어집니다.

**Jest**는 자바스크립트 코드를 테스트하기 위한 대표적인 테스트 프레임워크입니다. 테스트 코드를 실행하고, 그 결과가 예상과 맞는지 판정하고, 통과/실패 결과를 화면에 정리해서 보여주는 역할을 합니다.

**• 터미널: Jest 설치**

```bash
npm install -D jest
```

**💡 사용 팁**

<div class="wda-callout wda-cb">
  <p><code>-D</code>는 이 패키지를 개발 환경에서만 쓰겠다는 표시입니다. Jest는 실제 서비스가 사용자에게 응답할 때는 필요 없고, 개발자가 코드를 검증할 때만 필요하기 때문에 개발 의존성으로 설치합니다.</p>
</div>

---

## 2. 가장 작은 테스트 코드

Jest로 작성하는 테스트는 보통 다음 세 가지 요소로 이루어집니다.

**• 테스트 대상 함수 정의**

```js
// sum.js
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

**• 테스트 코드 작성**

```js
// sum.test.js
const sum = require('./sum');

test('1 더하기 2는 3이다', () => {
  expect(sum(1, 2)).toBe(3);
});
```

**▶ 테스트 코드 구성 요소**

<table class="wda-mtable">
<thead><tr><th>요소</th><th>역할</th></tr></thead>
<tbody>
<tr><td>test(설명, 함수)</td><td>테스트 케이스 하나를 정의합니다. 설명은 이 테스트가 무엇을 검증하는지 나타냅니다.</td></tr>
<tr><td>expect(값)</td><td>검증하고 싶은 실제 값을 감쌉니다.</td></tr>
<tr><td>.toBe(기댓값)</td><td>expect로 감싼 값이 기댓값과 일치하는지 판정하는 matcher입니다.</td></tr>
</tbody>
</table>

파일 이름을 `sum.test.js`처럼 `.test.js`로 끝나게 지으면, Jest가 별도 설정 없이도 이 파일을 테스트 파일로 자동 인식합니다.

**• 터미널: 테스트 실행**

```bash
npm test
```

---

## 3. describe로 테스트 묶기

관련 있는 테스트가 여러 개일 때는 `describe`로 하나의 그룹으로 묶을 수 있습니다.

**• describe로 테스트 그룹화**

```js
describe('sum 함수', () => {
  test('두 양수를 더할 수 있다', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('음수도 더할 수 있다', () => {
    expect(sum(-1, -2)).toBe(-3);
  });
});
```

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">describe</div><div class="wda-fnode-dsc">테스트 그룹 이름 정하기</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">test</div><div class="wda-fnode-dsc">개별 테스트 케이스 작성</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">expect</div><div class="wda-fnode-dsc">실제 값과 기댓값 비교</div></div>
</div>

이렇게 묶어두면 결과 화면에서도 "sum 함수" 그룹 아래에 두 테스트 결과가 나란히 표시되어, 어떤 기능에서 무엇이 실패했는지 한눈에 파악하기 쉬워집니다.

---

## 4. 자주 쓰는 matcher

expect 뒤에 붙는 matcher는 "어떤 방식으로 값을 비교할지"를 결정합니다. 상황에 맞는 matcher를 고르는 것이 중요합니다.

**▶ 자주 쓰는 matcher**

<table class="wda-mtable">
<thead><tr><th>matcher</th><th>용도</th></tr></thead>
<tbody>
<tr><td>toBe(값)</td><td>원시값(숫자, 문자열 등)이 정확히 같은지 비교합니다.</td></tr>
<tr><td>toEqual(값)</td><td>객체나 배열의 내용이 같은지 비교합니다.</td></tr>
<tr><td>toBeTruthy() / toBeFalsy()</td><td>값이 참으로 취급되는지, 거짓으로 취급되는지 확인합니다.</td></tr>
<tr><td>toContain(값)</td><td>배열이나 문자열이 특정 값을 포함하는지 확인합니다.</td></tr>
<tr><td>toThrow()</td><td>함수 실행 시 에러가 발생하는지 확인합니다.</td></tr>
</tbody>
</table>

**• toEqual로 객체 비교**

```js
test('객체는 toEqual로 비교한다', () => {
  const user = { name: '홍길동' };
  // toBe는 실패한다 — 서로 다른 객체이기 때문
  expect(user).toEqual({ name: '홍길동' }); // 통과
});
```

**🔎 참고**

<div class="wda-callout wda-cw">
  <p><code>toBe</code>는 자바스크립트의 <code>===</code>와 같은 방식으로 비교합니다. 객체나 배열은 내용이 같아도 메모리상 다른 객체이면 <code>toBe</code>로는 실패합니다. 객체·배열의 내용을 비교할 때는 <code>toEqual</code>을 사용해야 합니다.</p>
</div>

---

## 5. Jest만 있는 것은 아니다

Jest는 오랫동안 자바스크립트 테스트 도구의 표준처럼 쓰여 왔지만, 최근에는 Vite 기반 프로젝트에서 **Vitest**라는 도구도 널리 쓰입니다. Vitest는 Jest와 문법이 매우 비슷해서, Jest 문법을 익혀두면 Vitest로 넘어가는 데도 큰 어려움이 없습니다.

**💡 설명**

<div class="wda-callout wda-ci">
  <p>이 문서에서는 test·expect·describe라는 가장 기본적인 구조를 Jest를 기준으로 설명하지만, 이 구조 자체는 Vitest를 포함한 대부분의 자바스크립트 테스트 도구에서 공통으로 쓰이는 뼈대입니다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>Jest는 <strong>테스트를 실행하고 통과/실패를 판정</strong>해주는 테스트 프레임워크다.</li>
    <li>테스트 기본 구조는 <strong>test(설명, 함수) 안에서 expect(값).matcher(기댓값)</strong>를 쓰는 것이다.</li>
    <li>관련 있는 테스트는 <strong>describe</strong>로 묶어서 정리한다.</li>
    <li>원시값은 <strong>toBe</strong>, 객체·배열은 <strong>toEqual</strong>로 비교한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: toBe와 toEqual은 아무 값에나 똑같이 써도 된다?</div>
    <div class="wda-mistake-right">정답: toBe는 <strong>원시값 비교</strong>에, toEqual은 <strong>객체·배열 내용 비교</strong>에 사용해야 의도한 대로 검증된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Jest는 유일한 정답이고 다른 도구는 고려할 필요가 없다?</div>
    <div class="wda-mistake-right">정답: 최근 Vite 기반 프로젝트에서는 <strong>Vitest</strong>도 널리 쓰이며, 기본 문법 구조(test·expect·describe)는 서로 매우 비슷하다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 기본 구조</div>
    <div class="wda-formula-block-body"><code>test(설명, () => expect(값).matcher())</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 원시값</div>
    <div class="wda-formula-block-body"><code>숫자·문자열 = toBe</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 객체/배열</div>
    <div class="wda-formula-block-body"><code>객체·배열 = toEqual</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Jest 테스트 파일 이름은 보통 어떻게 짓나요?</div>
    <div class="wda-flip-back">파일명.test.js처럼 .test.js로 끝나게 지으면 Jest가 자동으로 테스트 파일로 인식합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">describe는 어떤 역할을 하나요?</div>
    <div class="wda-flip-back">관련 있는 여러 테스트 케이스를 하나의 그룹으로 묶어 정리합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">두 객체의 내용이 같은지 비교할 때 쓰는 matcher는?</div>
    <div class="wda-flip-back">toEqual입니다. toBe는 원시값 비교에 사용합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Jest와 비슷한 문법을 가진 Vite 생태계의 테스트 도구는?</div>
    <div class="wda-flip-back">Vitest입니다. test·expect·describe 같은 기본 구조가 Jest와 매우 비슷합니다.</div>
  </div>
</div>
