---
title: "(부록) React Hooks 돌아보기"
status: "completed"
description: "지금까지 배운 useState·useEffect·useRef·Custom Hook을 한 곳에서 비교하고, 언제 어떤 Hook을 선택해야 하는지 기준을 정리한다."
category: "React"
section: "Hooks"
tags:
  - react
  - hooks
  - recap
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
  • <strong>4개 Hook 비교</strong> — useState·useEffect·useRef·Custom Hook의 역할을 한 표로 정리합니다<br>
  • <strong>선택 기준 재확인</strong> — 어떤 상황에 어떤 Hook을 골라야 하는지 흐름으로 정리합니다<br>
  • <strong>다음 학습 안내</strong> — 이 강의에서 이어서 다룰 Hook을 짧게 미리 봅니다
</div>

---

## 1. Hook 4개 한눈에 비교

이 문서는 새로운 개념을 추가하지 않고, [3-1](/react/hooks/3-1-usestate)~[3-4](/react/hooks/3-4-custom-hooks)에서 배운 내용을 비교·복습하는 용도입니다.

**▶ useState·useEffect·useRef·Custom Hook 비교**

<table class="wda-mtable">
<thead><tr><th>Hook</th><th>역할</th><th>화면 갱신 여부</th><th>배운 문서</th></tr></thead>
<tbody>
<tr><td>useState</td><td>화면에 보여줄 값을 저장</td><td>값이 바뀌면 재렌더링됨</td><td>3-1</td></tr>
<tr><td>useEffect</td><td>외부 시스템과 컴포넌트를 동기화</td><td>effect 자체는 렌더링을 유발하지 않음</td><td>3-2</td></tr>
<tr><td>useRef</td><td>렌더링과 무관한 값 저장, DOM 접근</td><td>값이 바뀌어도 재렌더링 안 됨</td><td>3-3</td></tr>
<tr><td>Custom Hook</td><td>반복되는 Hook 로직을 재사용 가능하게 추출</td><td>내부 Hook 구성에 따라 다름</td><td>3-4</td></tr>
</tbody>
</table>

---

## 2. useState vs useRef 재확인

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">useState</div>
    값이 바뀌면 화면이 다시 그려져야 하는 경우. 검색어, 선택된 필터, 목록 데이터 등.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">useRef</div>
    값이 바뀌어도 화면과 무관한 경우. 타이머 ID, DOM 요소, 이전 값 기록 등.
  </div>
</div>

---

## 3. useEffect를 언제 쓰나

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>렌더링 중에 계산할 수 있는 값이라면 useEffect가 필요 없습니다.</strong> 예를 들어 배열의 길이나 합계처럼 다른 state로부터 바로 계산되는 값은 effect 없이 렌더링 중에 구합니다. useEffect는 <strong>서버 요청, 타이머, 구독</strong>처럼 리액트 바깥의 시스템과 동기화해야 할 때만 사용합니다.</p>
</div>

---

## 4. Custom Hook을 만드는 기준

**💡 설명**

<div class="wda-callout wda-ci">
  <p>서로 다른 컴포넌트에서 <strong>useState·useEffect·useRef를 조합하는 코드가 반복해서 나타날 때</strong>가 Custom Hook을 만들 타이밍입니다. 로직은 재사용되지만, 호출할 때마다 상태는 독립적으로 생성된다는 점을 기억합니다.</p>
</div>

---

## 5. Hook 선택 흐름

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">화면에 보여줄 값?</div><div class="wda-fnode-dsc">예 → useState</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">계산 가능한 값?</div><div class="wda-fnode-dsc">예 → state로 만들지 않음</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">외부 시스템 동기화?</div><div class="wda-fnode-dsc">예 → useEffect</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">로직이 반복됨?</div><div class="wda-fnode-dsc">예 → Custom Hook</div></div>
</div>

---

## 6. 앞으로 만나게 될 Hook들

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">useContext, useReducer</div><div class="wda-fcard-dsc">여러 컴포넌트가 값을 공유하거나 상태 업데이트 로직이 복잡해질 때 쓰는 Hook입니다. 다음 상태 관리 문서에서 다룹니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">useMemo, useCallback, useTransition 등</div><div class="wda-fcard-dsc">성능 최적화나 렌더링 우선순위 제어에 쓰이는 Hook으로, 이 강의 범위에서는 다루지 않습니다.</div></div>
</div>

---

## 7. ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><strong>useState</strong>는 화면에 보여줄 값, <strong>useRef</strong>는 화면과 무관한 값을 저장한다.</li>
    <li><strong>useEffect</strong>는 계산이 아니라 외부 시스템과의 <strong>동기화</strong>가 필요할 때만 사용한다.</li>
    <li>같은 조합 로직이 반복되면 <strong>Custom Hook</strong>으로 추출한다.</li>
    <li>Custom Hook은 로직만 공유하고, 상태는 호출할 때마다 <strong>독립적으로</strong> 생성된다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 다른 값으로 계산 가능한 값도 useState로 관리해야 한다?</div>
    <div class="wda-mistake-right">정답: 계산 가능한 값은 state로 만들지 않고 렌더링 중에 <strong>바로 계산</strong>한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: useEffect는 값이 바뀔 때마다 습관적으로 붙이면 된다?</div>
    <div class="wda-mistake-right">정답: <strong>외부 시스템과 동기화</strong>해야 하는 경우에만 사용하며, 계산 가능한 값에는 필요 없다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: useRef도 값이 바뀌면 화면이 갱신된다?</div>
    <div class="wda-mistake-right">정답: useRef 값은 바뀌어도 <strong>재렌더링을 유발하지 않는다</strong>.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 값 저장</div>
    <div class="wda-formula-block-body"><code>화면용 → useState / 내부용 → useRef</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 동기화</div>
    <div class="wda-formula-block-body"><code>외부 시스템 연동 → useEffect</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 재사용</div>
    <div class="wda-formula-block-body"><code>로직 반복 → Custom Hook</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">이 강의에서 배운 4개 Hook 카테고리는?</div>
    <div class="wda-flip-back">useState(값 저장), useEffect(외부 동기화), useRef(렌더링 무관 저장), Custom Hook(로직 재사용)입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">useState와 useRef를 가르는 기준은?</div>
    <div class="wda-flip-back">값이 바뀌었을 때 화면이 다시 그려져야 하는지 여부입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">useEffect가 필요 없는 경우는?</div>
    <div class="wda-flip-back">다른 state나 props로부터 렌더링 중에 바로 계산할 수 있는 값일 때는 필요 없습니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">다음 문서에서 다룰 Hook은 무엇인가요?</div>
    <div class="wda-flip-back">useContext와 useReducer로, 상태 관리 문서에서 이어서 다룹니다.</div>
  </div>
</div>
