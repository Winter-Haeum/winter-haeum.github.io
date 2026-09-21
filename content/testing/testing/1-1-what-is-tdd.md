---
title: "1-1 TDD가 뭔가요?"
category: "frontend"
section: "testing"
date: "2026-08-03"
status: "completed"
description: "테스트가 왜 필요한지부터 시작해서, 실패하는 테스트를 먼저 작성하고 구현하는 TDD의 Red-Green-Refactor 흐름을 정리합니다."
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
  • <strong>테스트가 필요한 이유</strong> — 손으로 눈으로만 확인하는 방식의 한계를 이해합니다<br>
  • <strong>TDD 흐름 이해</strong> — 실패하는 테스트 작성 → 구현 → 리팩터링의 순서를 정리합니다<br>
  • <strong>단위 테스트 개념</strong> — 가장 작은 단위의 코드를 검증한다는 것이 무엇인지 파악합니다<br>
  • <strong>적용 범위 감 잡기</strong> — 처음부터 모든 것을 테스트할 필요는 없다는 균형 감각을 갖춥니다
</div>

---

## 1. 테스트가 왜 필요한가

Testing 카테고리의 첫 문서로, "왜 테스트를 작성하는가"와 TDD라는 개발 방식의 기본 흐름을 다룹니다. 실제 테스트 코드를 Jest로 작성하는 문법은 다음 문서(1-2 Jest 시작하기)에서 이어집니다.

여기서는 개념과 흐름에 집중합니다.

작은 함수 하나를 만들 때는 콘솔에 값을 찍어보거나 화면을 직접 클릭해보는 것만으로도 충분히 확인할 수 있습니다. 문제는 코드가 늘어날수록 이 확인 작업이 감당하기 어려워진다는 점입니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">반복 확인의 피로</div><div class="wda-fcard-dsc">코드를 수정할 때마다 관련 기능을 손으로 다시 눌러봐야 합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">회귀 버그</div><div class="wda-fcard-dsc">한 곳을 고쳤는데 전혀 다른 곳이 망가지는 것을 눈치채기 어렵습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">불안한 리팩터링</div><div class="wda-fcard-dsc">코드를 정리하고 싶어도 "고쳤다가 뭔가 깨지면 어떡하지"라는 두려움이 생깁니다.</div></div>
</div>

**테스트 코드**는 이 확인 과정을 코드로 자동화한 것입니다. 한 번 작성해두면 코드를 수정할 때마다 실행해서 "예전과 똑같이 동작하는지"를 순식간에 확인할 수 있습니다.

**💡 사용 팁**

<div class="wda-callout wda-cb">
  <p>테스트가 모든 버그를 막아주는 것은 아닙니다. 테스트는 "내가 정한 조건에서는 코드가 예상대로 동작한다"는 것을 보장해줄 뿐입니다. 그래서 테스트는 코드를 대신 완성해주는 도구가 아니라, <strong>변경을 안전하게 만들어주는 도구</strong>로 이해하는 것이 정확합니다.</p>
</div>

---

## 2. TDD란 무엇인가

**TDD(Test-Driven Development, 테스트 주도 개발)**는 이름 그대로 "테스트가 개발을 이끌어가는" 방식입니다. 일반적인 개발 순서와 비교하면 순서 자체가 뒤바뀝니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">🔨 일반적인 개발 순서</div>
    설계 → 코드 작성 → (여유가 있으면) 테스트. 구현을 먼저 끝내고 나서 검증을 나중에 붙이는 방식입니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">🧪 TDD 순서</div>
    테스트 작성 → 코드 작성 → 리팩터링. 아직 존재하지 않는 기능에 대한 테스트를 먼저 만들고, 그 테스트를 통과시키는 코드를 작성합니다.
  </div>
</div>

처음에는 "코드도 없는데 무슨 테스트를 먼저 만드나"라는 생각이 들 수 있습니다.

하지만 이 순서는 "이 함수가 정확히 무엇을 해야 하는가"를 코드로 먼저 정의하고 시작한다는 뜻이기도 합니다. 목표를 먼저 명확히 세운 뒤 그 목표를 달성하는 방식입니다.

---

## 3. TDD의 3단계 — Red, Green, Refactor

TDD는 아래 세 단계를 짧은 주기로 계속 반복하는 방식으로 진행됩니다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">🔴 Red</div><div class="wda-fnode-dsc">실패하는 테스트 작성</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">🟢 Green</div><div class="wda-fnode-dsc">테스트를 통과할 최소한의 코드 작성</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">🔵 Refactor</div><div class="wda-fnode-dsc">동작을 유지한 채 코드 정리</div></div>
</div>

**▶ Red-Green-Refactor 단계별 목표**

<table class="wda-mtable">
<thead><tr><th>단계</th><th>목표</th><th>이 단계에서 하는 일</th></tr></thead>
<tbody>
<tr><td>Red</td><td>실패 확인</td><td>아직 구현하지 않은 기능에 대한 테스트를 작성합니다. 함수가 없으니 당연히 실패합니다.</td></tr>
<tr><td>Green</td><td>통과 확인</td><td>테스트를 통과시키는 데 필요한 만큼만 코드를 작성합니다. 예쁘게 짤 필요는 아직 없습니다.</td></tr>
<tr><td>Refactor</td><td>품질 개선</td><td>테스트가 통과하는 상태를 유지하면서 중복을 줄이고 이름을 다듬는 등 코드를 정리합니다.</td></tr>
</tbody>
</table>

**• TDD 3단계 사이클 예시**

```js
// 1. Red: 아직 없는 add 함수에 대한 테스트를 먼저 작성
test('1 더하기 2는 3이다', () => {
  expect(add(1, 2)).toBe(3);
});

// 2. Green: 테스트를 통과시키는 최소한의 코드
function add(a, b) {
  return a + b;
}

// 3. Refactor: 필요하다면 여기서 이름이나 구조를 다듬는다
```

**🔎 참고**

<div class="wda-callout wda-cw">
  <p>Green 단계에서는 코드가 우아한지보다 테스트를 통과하는지가 먼저입니다. 극단적으로는 <code>return 3;</code>처럼 값을 그냥 고정해서 반환해도 일단 그 테스트만 통과하면 Green입니다. 부족한 부분은 다음 Red에서 새로운 테스트로 채우고, Refactor 단계에서 코드를 다듬으면 됩니다.</p>
</div>

---

## 4. 단위 테스트란

TDD에서 다루는 테스트는 대부분 **단위 테스트(Unit Test)**입니다. 단위 테스트는 함수 하나, 컴포넌트 하나처럼 프로그램에서 더 이상 쪼개기 어려운 가장 작은 단위를 검증하는 테스트입니다.

**▶ 테스트 종류별 검증 대상**

<table class="wda-mtable">
<thead><tr><th>테스트 종류</th><th>검증 대상</th><th>예시</th></tr></thead>
<tbody>
<tr><td>단위 테스트</td><td>함수·컴포넌트 하나</td><td>덧셈 함수가 정확한 합을 반환하는가</td></tr>
<tr><td>통합 테스트</td><td>여러 모듈의 상호작용</td><td>로그인 폼 컴포넌트가 API 호출까지 잘 이어지는가</td></tr>
<tr><td>E2E 테스트</td><td>사용자 관점의 전체 흐름</td><td>회원가입부터 결제까지 실제 브라우저에서 동작하는가</td></tr>
</tbody>
</table>

단위 테스트는 범위가 좁은 만큼 작성하기 쉽고 실행 속도도 빠릅니다. 그래서 입문 단계에서는 단위 테스트부터 익히는 것이 일반적입니다.

---

## 5. 처음부터 모든 걸 테스트할 필요는 없다

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>TDD는 강력한 개발 방식이지만, 모든 프로젝트의 모든 코드에 처음부터 적용해야 하는 규칙은 아닙니다. 입문자라면 계산 로직처럼 입력과 출력이 뚜렷한 순수 함수 몇 개부터 테스트를 붙여보는 것으로 충분합니다. UI의 자잘한 스타일 변화 같은 부분까지 무리해서 테스트하려 하면 오히려 테스트 유지보수 부담만 커질 수 있습니다.</p>
</div>

핵심은 "테스트를 몇 개 작성했는가"가 아니라, 코드를 변경할 때 "내가 뭔가를 망가뜨리지는 않았을까"라는 불안감을 줄여주는 안전망을 하나씩 늘려가는 것입니다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>테스트는 <strong>코드 변경을 안전하게 만드는 도구</strong>다. 버그를 완전히 없애주는 도구가 아니다.</li>
    <li>TDD는 <strong>테스트를 먼저 작성하고 코드를 나중에 작성</strong>하는 개발 방식이다.</li>
    <li>TDD의 3단계는 <strong>Red(실패) → Green(통과) → Refactor(정리)</strong>다.</li>
    <li>단위 테스트는 <strong>함수·컴포넌트 하나처럼 가장 작은 단위</strong>를 검증한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Green 단계에서는 처음부터 완벽하고 깔끔한 코드를 작성해야 한다?</div>
    <div class="wda-mistake-right">정답: Green 단계의 목표는 <strong>테스트 통과</strong>뿐이다. 코드 품질을 다듬는 것은 그다음 Refactor 단계의 몫이다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: TDD를 하려면 프로젝트의 모든 코드에 테스트를 붙여야 한다?</div>
    <div class="wda-mistake-right">정답: 입문 단계에서는 <strong>입출력이 뚜렷한 함수 몇 개</strong>부터 시작해도 충분하며, 무리해서 전체를 테스트하려 할 필요는 없다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · TDD 순서</div>
    <div class="wda-formula-block-body"><code>테스트 작성 → 구현 → 리팩터링</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 3단계</div>
    <div class="wda-formula-block-body"><code>Red → Green → Refactor</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 테스트의 역할</div>
    <div class="wda-formula-block-body"><code>테스트 = 변경의 안전망</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">TDD의 Red 단계에서 하는 일은?</div>
    <div class="wda-flip-back">아직 구현하지 않은 기능에 대한, 당연히 실패하는 테스트를 먼저 작성합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Green 단계의 목표는 무엇인가요?</div>
    <div class="wda-flip-back">코드의 우아함이 아니라 테스트를 통과시키는 것 자체가 목표입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">단위 테스트는 무엇을 검증하나요?</div>
    <div class="wda-flip-back">함수나 컴포넌트처럼 더 이상 쪼개기 어려운 가장 작은 단위의 코드를 검증합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">테스트는 버그를 완전히 없애주나요?</div>
    <div class="wda-flip-back">아니요. 테스트는 정해둔 조건에서 코드가 예상대로 동작함을 보장할 뿐, 변경을 안전하게 만드는 도구입니다.</div>
  </div>
</div>
