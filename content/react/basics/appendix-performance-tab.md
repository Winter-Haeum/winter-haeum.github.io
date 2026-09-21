---
title: "실습: Performance 탭 분석하기"
status: "completed"
description: "강의 목록 화면에서 버튼을 눌렀을 때의 렌더링 흐름을 Chrome Performance 탭으로 가볍게 관찰하는 보충 실습이다."
category: "React"
section: "Basics"
tags:
  - react
  - devtools
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
  • 강의 목록 화면에서 필터 버튼을 눌렀을 때, 브라우저 Performance 탭으로 렌더링 흐름을 가볍게 살펴보는 보충 실습이다.<br>
  • Profiler 심화 분석, Lighthouse, Core Web Vitals 같은 성능 최적화 심화는 다루지 않는다.
</div>

---

## 1. Performance 탭을 보는 이유

강의 목록에서 필터 버튼을 눌렀을 때 화면이 매끄럽게 바뀌는지 궁금할 수 있습니다. 브라우저의 Performance 탭을 쓰면 그 순간 실제로 어떤 작업이 얼마나 걸렸는지 눈으로 확인할 수 있습니다.

---

## 2. 기록을 시작하고 멈추기

개발자 도구(F12)를 열고 Performance 탭으로 이동합니다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">Record</div><div class="wda-fnode-dsc">기록 시작</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">Interact</div><div class="wda-fnode-dsc">버튼 클릭 등 동작 수행</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">Stop</div><div class="wda-fnode-dsc">기록 종료</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">Timeline 확인</div><div class="wda-fnode-dsc">기록된 작업 확인</div></div>
</div>

---

## 3. interaction과 timeline 맛보기

기록하는 동안 필터 버튼을 클릭하면, 그 클릭(interaction) 전후로 발생한 작업들이 timeline에 막대 형태로 표시됩니다.

---

## 4. scripting / rendering / painting 기본

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">scripting</div>
    <div class="wda-fcard-dsc">JavaScript 코드가 실행되는 작업.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">rendering</div>
    <div class="wda-fcard-dsc">요소의 위치와 크기를 다시 계산하는 작업.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">painting</div>
    <div class="wda-fcard-dsc">계산된 화면에 실제 픽셀을 그리는 작업.</div>
  </div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  각 작업을 나타내는 막대의 색상과 라벨은 브라우저 버전에 따라 달라질 수 있습니다. 색상만 보지 말고 막대의 라벨도 함께 확인하세요.
</div>

---

## 5. 긴 작업을 찾는 법

timeline에서 유독 길게 늘어진 막대가 있다면, 그 구간이 시간이 오래 걸린 작업입니다. 어떤 종류(scripting/rendering/painting)의 작업인지 라벨로 확인합니다.

---

## 6. React 렌더링과 브라우저 작업 구분

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">React 렌더링</div>
    컴포넌트가 다시 계산되는 작업. scripting에 해당한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">브라우저 작업</div>
    계산된 결과를 실제 화면에 반영하는 작업. rendering·painting에 해당한다.
  </div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  React 렌더링과 브라우저 작업은 이어지지만 같은 단계는 아닙니다. Virtual DOM이 계산을 마친 뒤에야 브라우저의 rendering·painting이 이어집니다.
</div>

---

## 7. 결과를 과하게 해석하지 않기

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">기록 전 추측</div>
    "이 버튼이 느릴 것 같다"는 짐작만으로 판단한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">기록 후 확인</div>
    실제로 Record → Interact → Stop을 거쳐 결과를 확인한다.
  </div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  Performance 탭 결과만으로 원인을 단정하지 않습니다. 한 번의 기록 결과는 그 순간의 상황일 뿐이며, 필요하면 여러 번 반복해서 확인합니다.
</div>

---

## 8. 초보자가 자주 만나는 오해

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">막대가 길면 무조건 버그다?</div>
    <div class="wda-fcard-dsc">작업량이 많아서 자연스럽게 길 수도 있다. 다른 동작과 비교해 판단한다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">한 번 기록한 결과가 항상 똑같다?</div>
    <div class="wda-fcard-dsc">컴퓨터 상태에 따라 매번 조금씩 달라질 수 있다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">기록 없이 감으로 판단해도 된다?</div>
    <div class="wda-fcard-dsc">실제로 기록해서 확인하지 않으면 추측에 불과하다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">색상 이름과 의미가 모든 브라우저에서 같다?</div>
    <div class="wda-fcard-dsc">버전에 따라 색상과 라벨이 달라질 수 있어 라벨을 함께 확인해야 한다.</div>
  </div>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>Performance 탭은 <strong>Record → Interact → Stop</strong> 순서로 기록한다.</li>
    <li>기록된 작업은 <strong>scripting</strong>(JS 실행), <strong>rendering</strong>(위치·크기 계산), <strong>painting</strong>(픽셀 그리기)으로 나뉜다.</li>
    <li>timeline에서 <strong>유독 긴 막대</strong>가 시간이 오래 걸린 작업이다.</li>
    <li><strong>React 렌더링</strong>(scripting)과 <strong>브라우저 작업</strong>(rendering·painting)은 이어지지만 같은 단계는 아니다.</li>
    <li>Performance 탭 결과만으로 <strong>원인을 단정하지 않는다</strong>.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 막대가 길면 무조건 코드에 버그가 있다는 뜻이다?</div>
    <div class="wda-mistake-right">정답: 작업량이 많아서 자연스럽게 길 수도 있으므로 <strong>다른 상황과 비교</strong>해서 판단한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 한 번 기록한 결과는 항상 똑같이 재현된다?</div>
    <div class="wda-mistake-right">정답: 컴퓨터 상태에 따라 <strong>매번 조금씩 달라질 수 있다</strong>.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: React 렌더링과 브라우저 작업은 같은 것이다?</div>
    <div class="wda-mistake-right">정답: React 렌더링은 <strong>scripting</strong>, 화면 반영은 <strong>rendering·painting</strong>으로 <strong>이어지는 별개 단계</strong>다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 막대 색상 이름은 모든 브라우저에서 항상 동일하다?</div>
    <div class="wda-mistake-right">정답: 브라우저 버전에 따라 달라질 수 있으므로 <strong>라벨도 함께</strong> 확인해야 한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 측정 순서</div>
    <div class="wda-formula-block-body"><code>Record → Interact → Stop</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 작업 구분</div>
    <div class="wda-formula-block-body"><code>scripting / rendering / painting</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 단계 관계</div>
    <div class="wda-formula-block-body"><code>React 렌더링 → 브라우저 작업</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · 판단 원칙</div>
    <div class="wda-formula-block-body"><code>기록으로 확인, 추측으로 단정 금지</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Performance 탭 측정 3단계는?</div>
    <div class="wda-flip-back">Record(기록 시작) → Interact(동작 수행) → Stop(기록 종료)이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">scripting/rendering/painting은 각각 무엇인가?</div>
    <div class="wda-flip-back">scripting은 JS 실행, rendering은 위치·크기 계산, painting은 픽셀 그리기다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">timeline에서 무엇을 찾아야 하나?</div>
    <div class="wda-flip-back">유독 길게 늘어진 막대를 찾아 어떤 작업인지 라벨로 확인한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">React 렌더링과 브라우저 작업의 관계는?</div>
    <div class="wda-flip-back">React 렌더링(scripting) 이후 브라우저의 rendering·painting이 이어지는 별개 단계다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Performance 탭 결과를 볼 때 지켜야 할 원칙은?</div>
    <div class="wda-flip-back">결과만으로 원인을 단정하지 않고, 필요하면 여러 번 확인한다.</div>
  </div>
</div>
