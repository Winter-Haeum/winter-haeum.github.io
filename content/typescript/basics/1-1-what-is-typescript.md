---
title: "1-1 TypeScript가 뭔가요?"
category: "frontend"
section: "basics"
date: "2026-08-03"
status: "completed"
description: "JavaScript에 타입 시스템을 더한 언어라는 관점에서 TypeScript가 어떤 문제를 해결하는지, 컴파일이라는 과정이 왜 필요한지 정리합니다."
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
  • <strong>TypeScript의 정체</strong> — JavaScript와 어떤 관계인지 이해합니다<br>
  • <strong>정적 타입의 의미</strong> — 런타임 오류와 무엇이 다른지 구분합니다<br>
  • <strong>컴파일 과정</strong> — TypeScript 코드가 브라우저에서 실행되기까지의 흐름을 파악합니다<br>
  • <strong>파일 확장자</strong> — .ts와 .tsx가 어떻게 다른지 알아둡니다
</div>

---

## 1. TypeScript는 JavaScript의 확장판

TypeScript는 완전히 새로운 언어가 아닙니다. JavaScript 문법을 그대로 쓰면서, 그 위에 **타입을 표시하는 문법**을 얹어놓은 언어입니다.

그래서 기존에 작성해둔 JavaScript 코드는 대부분 그대로 TypeScript 파일로 옮겨도 문제없이 동작합니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">기반은 JavaScript</div><div class="wda-fcard-dsc">문법과 실행 방식은 JavaScript와 동일합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">타입 표시가 추가됨</div><div class="wda-fcard-dsc">변수·함수에 어떤 값이 들어올지 미리 적어둘 수 있습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Microsoft가 개발</div><div class="wda-fcard-dsc">대규모 프로젝트에서 겪은 문제를 해결하려고 만들어졌습니다.</div></div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  <p>"TypeScript는 JavaScript를 대체하는 완전히 다른 언어다"라고 생각하기 쉽지만, 정확히는 <strong>JavaScript 위에 타입 시스템을 얹은 것</strong>에 가깝습니다. 그리고 브라우저는 TypeScript를 직접 실행하지 못합니다. TypeScript 코드는 결국 JavaScript로 변환된 뒤에야 실행됩니다.</p>
</div>

---

## 2. 왜 타입이 필요할까

JavaScript는 변수에 어떤 값이든 자유롭게 담을 수 있습니다. 이 자유로움 덕분에 빠르게 코드를 작성할 수 있지만, 동시에 실수를 발견하기 어렵다는 단점도 있습니다.

**• JavaScript: 타입 없이 함수 작성**

```js
function getLength(str) {
  return str.length;
}

getLength(123); // 실행해봐야 문제를 알 수 있음 (undefined 접근 등)
```

위 코드는 문자열이 아닌 값이 들어와도 코드를 작성하는 시점에는 아무런 경고가 없습니다. 실제로 함수를 실행해봐야, 혹은 사용자가 그 기능을 써봐야 문제가 드러납니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">JavaScript</div>
    변수에 어떤 값이든 담을 수 있고, 실수는 실행하는 순간에야 드러납니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">TypeScript</div>
    변수·함수에 타입을 미리 적어두면, 코드를 작성하는 중에 편집기가 바로 실수를 알려줍니다.
  </div>
</div>

TypeScript를 쓰면 어떤 값이 들어올지 미리 약속해두기 때문에, 약속과 다른 값을 넣으려는 순간 편집기가 즉시 알려줍니다.

**• TypeScript: 타입 주석 작성**

```ts
function getLength(str: string): number {
  return str.length;
}

// getLength(123); // 여기서 바로 오류 표시
```

---

## 3. 컴파일이란 무엇인가

TypeScript 코드는 그 자체로 브라우저에서 실행되지 않습니다. **컴파일(Compile)**이라는 변환 과정을 거쳐 순수한 JavaScript 코드로 바뀐 뒤에야 실행됩니다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1. 작성</div><div class="wda-fnode-dsc">.ts 파일에 타입과 함께 코드 작성</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2. 컴파일</div><div class="wda-fnode-dsc">타입 검사 후 .js 파일로 변환</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3. 실행</div><div class="wda-fnode-dsc">변환된 .js가 브라우저에서 동작</div></div>
</div>

이 과정에서 컴파일러는 코드에 타입과 관련된 실수가 없는지 먼저 검사합니다. 문제가 있으면 JavaScript 파일을 만들지 않고 오류를 알려주기 때문에, 잘못된 코드가 브라우저까지 흘러가는 일을 미리 막을 수 있습니다.

**💡 사용 팁**

<div class="wda-callout wda-cb">
  <p>TypeScript를 쓴다고 해서 브라우저나 Node.js가 새로운 언어를 배우는 것은 아닙니다. 개발자가 코드를 작성하는 방식이 바뀔 뿐, 최종적으로 실행되는 것은 여전히 JavaScript입니다.</p>
</div>

---

## 4. 파일 확장자 구분하기

**▶ .ts와 .tsx 확장자 구분**

<table class="wda-mtable">
<thead><tr><th>확장자</th><th>용도</th></tr></thead>
<tbody>
<tr><td>.ts</td><td>일반 TypeScript 파일 (로직, 함수 등)</td></tr>
<tr><td>.tsx</td><td>React의 JSX 문법을 포함한 TypeScript 파일</td></tr>
</tbody>
</table>

React 컴포넌트처럼 HTML 형태의 코드(JSX)를 작성할 때는 .tsx 확장자를 사용해야 합니다. 반면 데이터 가공 로직이나 API 요청 함수처럼 JSX가 없는 파일은 .ts로 작성하는 것이 일반적입니다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>TypeScript는 <strong>JavaScript에 타입 시스템을 더한 언어</strong>다.</li>
    <li>브라우저는 TypeScript를 직접 실행하지 못하며, <strong>컴파일을 거쳐 JavaScript로 변환</strong>된 뒤 실행된다.</li>
    <li>타입을 미리 적어두면 <strong>실행하기 전, 코드 작성 중에</strong> 실수를 발견할 수 있다.</li>
    <li>JSX가 있으면 <strong>.tsx</strong>, 없으면 <strong>.ts</strong> 확장자를 사용한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: TypeScript는 브라우저가 직접 실행하는 새로운 언어다?</div>
    <div class="wda-mistake-right">정답: 브라우저는 <strong>JavaScript만 실행</strong>할 수 있으며, TypeScript는 컴파일을 거쳐 JavaScript로 변환된 뒤에야 실행된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: TypeScript는 JavaScript와 완전히 다른 별개의 언어다?</div>
    <div class="wda-mistake-right">정답: TypeScript는 <strong>JavaScript 문법을 그대로 포함</strong>하는 확장 언어이며, 기존 JS 코드 대부분이 TS 환경에서도 그대로 동작한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 관계</div>
    <div class="wda-formula-block-body"><code>TypeScript = JavaScript + 타입</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 실행 흐름</div>
    <div class="wda-formula-block-body"><code>.ts 작성 → 컴파일 → .js 실행</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 확장자</div>
    <div class="wda-formula-block-body"><code>JSX 있으면 .tsx, 없으면 .ts</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">TypeScript는 JavaScript와 완전히 다른 언어인가요?</div>
    <div class="wda-flip-back">아니요. JavaScript에 타입 시스템을 더한 확장 언어입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">브라우저는 TypeScript 코드를 바로 실행할 수 있나요?</div>
    <div class="wda-flip-back">아니요. 컴파일 과정을 거쳐 JavaScript로 변환된 뒤에 실행됩니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">타입 검사는 언제 이루어지나요?</div>
    <div class="wda-flip-back">코드를 실행하기 전, 컴파일 시점에 이루어집니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">React 컴포넌트 파일은 어떤 확장자를 사용하나요?</div>
    <div class="wda-flip-back">JSX 문법을 포함하므로 .tsx 확장자를 사용합니다.</div>
  </div>
</div>
