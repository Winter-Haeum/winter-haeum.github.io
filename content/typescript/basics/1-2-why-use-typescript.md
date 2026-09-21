---
title: "1-2 왜 TypeScript를 사용할까?"
category: "frontend"
section: "basics"
date: "2026-08-03"
status: "completed"
description: "많은 팀이 TypeScript를 선택하는 이유를 오류 조기 발견, 자동완성, 협업 문서화 관점에서 살펴보고 도입에 따르는 비용도 함께 짚어봅니다."
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
  • <strong>오류 조기 발견</strong> — 컴파일 시점에 실수를 잡아내는 흐름을 이해합니다<br>
  • <strong>편집기 자동완성</strong> — 타입 정보가 개발 생산성에 어떻게 도움이 되는지 확인합니다<br>
  • <strong>코드 문서화 효과</strong> — 타입 자체가 협업에서 어떤 역할을 하는지 파악합니다<br>
  • <strong>도입 비용도 함께 고려</strong> — TypeScript가 만능이 아니라는 점을 이해합니다
</div>

---

## 1. 실수를 실행 전에 잡아낸다

JavaScript에서는 코드를 실제로 실행해봐야 오타나 잘못된 값 전달을 발견할 수 있는 경우가 많습니다. 반면 TypeScript는 **코드를 작성하는 시점**에 타입이 맞지 않는 부분을 편집기가 바로 표시해줍니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">JavaScript</div>
    실행 도중(때로는 사용자가 기능을 써보는 순간) 오류가 드러납니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">TypeScript</div>
    컴파일 시점에 타입이 맞지 않는 코드를 미리 알려줍니다.
  </div>
</div>

특히 여러 파일에 걸쳐 데이터가 오가는 큰 프로젝트일수록, 어딘가에서 데이터 형태가 살짝 바뀌었을 때 이를 사람이 눈으로 다 확인하기는 어렵습니다. 타입 검사는 이런 변경을 코드 전체에서 자동으로 추적해줍니다.

---

## 2. 편집기의 자동완성이 강력해진다

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">속성 자동완성</div><div class="wda-fcard-dsc">객체 뒤에 마침표를 찍으면 사용 가능한 속성 목록이 바로 나타납니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">이름 변경 안전성</div><div class="wda-fcard-dsc">변수 이름을 바꾸면 이를 사용하는 모든 곳을 편집기가 함께 찾아줍니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">잘못된 사용 즉시 표시</div><div class="wda-fcard-dsc">함수에 맞지 않는 값을 넘기면 코드를 실행하지 않고도 알 수 있습니다.</div></div>
</div>

편집기(VS Code 등)는 타입 정보를 바탕으로 지금 다루고 있는 값이 어떤 데이터를 갖고 있는지 실시간으로 알려주는 가이드 역할을 합니다. 이 덕분에 함수나 객체의 속성 이름을 매번 외우거나 다른 파일을 열어 확인할 필요가 줄어듭니다.

---

## 3. 타입 자체가 문서가 된다

타입을 명시해두면, 다른 개발자가 코드를 처음 볼 때도 "이 함수는 무엇을 받아서 무엇을 돌려주는지"를 코드만 보고 바로 파악할 수 있습니다.

**• TypeScript: 타입이 곧 문서가 되는 함수 시그니처**

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<User> {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
}
```

이 함수의 시그니처만 봐도 "숫자 id를 받아서 User 형태의 데이터를 비동기로 돌려준다"는 사실을 별도의 설명 없이 알 수 있습니다.

**💡 사용 팁**

<div class="wda-callout wda-cb">
  <p>동료가 만든 함수를 처음 사용할 때, 함수 내부 구현을 뜯어보지 않아도 타입만으로 어떤 데이터가 오가는지 짐작할 수 있습니다. 팀 규모가 커질수록 이 효과는 더 커집니다.</p>
</div>

---

## 4. 그렇다고 만능은 아니다

TypeScript를 도입한다고 모든 문제가 사라지는 것은 아닙니다. 장점만큼 고려해야 할 부분도 있습니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">학습 곡선</div><div class="wda-fcard-dsc">타입 문법과 개념을 새로 익히는 시간이 필요합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">빌드 단계 추가</div><div class="wda-fcard-dsc">컴파일 과정이 개발 흐름에 하나 더 끼어듭니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">모든 버그를 막지는 못함</div><div class="wda-fcard-dsc">타입이 맞아도 로직 자체가 틀리면 여전히 버그가 생깁니다.</div></div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>TypeScript는 코드가 완벽하다는 것을 증명해주는 도구가 아니라, 흔히 저지르는 실수를 줄여주는 안전장치에 가깝습니다. 실제 서비스 로직이 올바른지는 여전히 테스트와 코드 리뷰로 확인해야 합니다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>TypeScript는 <strong>실행 전, 컴파일 시점에 오류를 발견</strong>할 수 있게 해준다.</li>
    <li>타입 정보를 바탕으로 <strong>편집기 자동완성</strong>이 훨씬 강력해진다.</li>
    <li>타입 자체가 <strong>코드 문서 역할</strong>을 해서 협업에 도움이 된다.</li>
    <li>다만 <strong>학습 곡선과 빌드 비용</strong>이 있으며, 로직 오류까지 막아주지는 않는다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: TypeScript를 쓰면 버그가 아예 발생하지 않는다?</div>
    <div class="wda-mistake-right">정답: TypeScript는 <strong>타입과 관련된 실수</strong>를 줄여줄 뿐, 로직 자체의 오류나 비즈니스 규칙 실수까지 막아주지는 않는다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 작은 프로젝트에서는 TypeScript가 필요 없다?</div>
    <div class="wda-mistake-right">정답: 프로젝트 규모와 무관하게 도움이 될 수 있지만, <strong>도입 여부는 팀 상황과 프로젝트 성격에 따라 다르게 판단</strong>할 수 있다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 시점</div>
    <div class="wda-formula-block-body"><code>오류 발견 = 실행 전(컴파일 시점)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 효과</div>
    <div class="wda-formula-block-body"><code>타입 = 자동완성 + 문서화</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 균형</div>
    <div class="wda-formula-block-body"><code>장점 O, 만능 X</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">TypeScript가 오류를 발견하는 시점은 언제인가요?</div>
    <div class="wda-flip-back">코드를 실행하기 전, 컴파일하는 시점입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">타입 정보가 협업에 도움이 되는 이유는?</div>
    <div class="wda-flip-back">함수나 객체가 어떤 데이터를 다루는지 코드만 보고 파악할 수 있어 문서 역할을 하기 때문입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">TypeScript를 쓰면 모든 버그가 사라지나요?</div>
    <div class="wda-flip-back">아니요. 타입 관련 실수는 줄여주지만 로직 오류까지 막아주지는 않습니다.</div>
  </div>
</div>
