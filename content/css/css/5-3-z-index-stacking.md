---
title: "5-3 z-index와 쌓임 순서 이해하기"
category: "frontend"
section: "css"
date: "2026-08-01"
status: "completed"
description: "Stacking Context의 생성 조건과 z-index가 동작하지 않는 원인을 진단하고, 모달·드롭다운·툴팁을 100 단위로 체계적으로 관리하는 방법을 정리합니다."
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
  • <strong>Stacking Context 개념</strong> — 요소가 쌓이는 독립적인 레이어 그룹과, 그 그룹을 만드는 조건(position+z-index, opacity, transform 등)을 이해합니다<br>
  • <strong>z-index 디버깅</strong> — z-index가 안 먹히는 대표 원인을 DevTools로 진단하고 해결합니다<br>
  • <strong>계층 관리 전략</strong> — 모달·드롭다운·툴팁의 z-index를 100 단위로 체계적으로 관리하는 방법을 익힙니다
</div>

---

## 1. z-index란

[Position 실전 패턴](/css/css/5-1-position-layout)과 [Transform](/css/css/5-2-transform-effects)을 배웠다면, 이제 겹쳐진 요소들 중 무엇이 위에 보일지를 결정하는 z-index 차례입니다.

단순히 숫자를 크게 주는 것만으로는 해결되지 않는 경우가 많은데, 그 이유가 바로 이 문서의 핵심인 Stacking Context에 있습니다.

`z-index`는 요소의 쌓임 순서(깊이)를 정하는 속성이다. 값이 클수록 화면 앞쪽에 보인다.

**• CSS: static에서 z-index 무시됨**

```css
/* ✔ 정상 동작 */
.box { position: relative; z-index: 10; }

/* ❌ 동작 안 함 */
.box { position: static; z-index: 10; } /* static에서는 z-index가 무시된다 */
```

z-index는 `position`이 `static`(기본값)이 아닌 요소, 즉 `relative`·`absolute`·`fixed`·`sticky` 요소에서만 동작한다.

**• CSS: z-index 값 비교**

```css
.box-1 { position: absolute; z-index: 1; }
.box-2 { position: absolute; z-index: 2; }
.box-3 { position: absolute; z-index: 3; } /* 3 → 2 → 1 순으로 가장 앞에 보인다 */

.behind { position: relative; z-index: -1; } /* 음수도 가능하지만 예측이 어려워 제한적으로 사용한다 */
```

---

## 2. Stacking Context — 가장 핵심적인 개념

**Stacking Context(쌓임 맥락)**는 요소들이 쌓이는 독립적인 레이어 그룹이다. 이 그룹 **내부**에서는 z-index 값끼리 비교할 수 있지만, 서로 다른 그룹끼리는 그룹 전체가 하나의 단위로 겹친다.

**• Stacking Context 그룹 구조**

```
[A 그룹] (Stacking Context)
 └ Layer 1 (z-index 10)
 └ Layer 2 (z-index 5)

[B 그룹] (Stacking Context)
 └ Layer 3 (z-index 1)
```

B 그룹 전체가 A 그룹 위에 있다면, B 그룹 안의 `Layer 3(z-index:1)`도 A 그룹 안의 `Layer 1(z-index:10)`보다 화면 앞에 보일 수 있다. z-index 값이 크다고 항상 이기는 것이 아니라는 뜻이다.

**▶ Stacking Context 생성 조건**

<table class="wda-mtable">
<thead><tr><th>Stacking Context를 생성하는 조건</th><th>예시</th></tr></thead>
<tbody>
<tr><td><code>position</code> + <code>z-index</code></td><td><code>relative</code>/<code>absolute</code>/<code>sticky</code> + z-index 숫자값</td></tr>
<tr><td><code>opacity</code> &lt; 1</td><td><code>opacity: 0.999</code></td></tr>
<tr><td><code>transform</code></td><td><code>transform: translateZ(0)</code></td></tr>
<tr><td><code>filter</code></td><td><code>filter: blur(0)</code></td></tr>
<tr><td><code>mix-blend-mode</code></td><td><code>mix-blend-mode: multiply</code></td></tr>
<tr><td><code>will-change</code></td><td><code>will-change: transform</code></td></tr>
<tr><td><code>isolation</code></td><td><code>isolation: isolate</code></td></tr>
<tr><td>Flex/Grid item</td><td>z-index가 지정된 경우</td></tr>
<tr><td><code>position: fixed</code></td><td>항상 새로운 Stacking Context를 생성</td></tr>
</tbody>
</table>

**💡 설명**

<div class="wda-callout wda-ci">
  <p>대부분의 z-index 오류는 값 자체가 아니라 <strong>의도치 않게 생성된 Stacking Context</strong> 때문에 발생한다. 부모 요소에 <code>transform</code>이나 <code>opacity</code>가 걸려 있다면, 자식이 아무리 큰 z-index를 줘도 그 부모의 레이어 안에서만 유효하다.</p>
</div>

---

## 3. z-index가 안 먹힐 때 확인하는 순서

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1</div><div class="wda-fnode-dsc">position 확인 — static이면 relative 등으로 수정</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2</div><div class="wda-fnode-dsc">부모가 Stacking Context를 만드는지 확인</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3</div><div class="wda-fnode-dsc">같은 Context 내부 요소끼리만 z-index 비교</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">4</div><div class="wda-fnode-dsc">z-index가 auto라면 HTML 작성 순서 확인</div></div>
</div>

**• CSS: Stacking Context에 갇힌 z-index**

```css
/* 부모 Stacking Context 안에 갇힌 경우 */
.parent { position: relative; z-index: 1; }
.child  { position: absolute; z-index: 9999; } /* 부모 내부에서만 비교됨 */

/* transform 때문에 고립된 경우 */
.card { transform: translateZ(0); } /* 새 Stacking Context 생성 */
.card .tooltip { z-index: 9999; }   /* 카드 안에서만 유효, 카드 밖 요소를 못 이길 수 있다 */
```

---

## 4. z-index 계층 설계 전략

숫자를 감으로 계속 올리기보다, 역할별로 100 단위 구간을 미리 정해두면 충돌을 크게 줄일 수 있다.

**▶ z-index 계층 설계 권장값**

<table class="wda-mtable">
<thead><tr><th>UI 컴포넌트</th><th>권장 z-index</th></tr></thead>
<tbody>
<tr><td>기본 콘텐츠</td><td>0 ~ 10</td></tr>
<tr><td>드롭다운 / 툴팁</td><td>100 ~ 199</td></tr>
<tr><td>고정 사이드 메뉴</td><td>200 ~ 299</td></tr>
<tr><td>모달</td><td>1000 ~ 1999</td></tr>
<tr><td>알림 Toast / 안내 오버레이</td><td>9000 ~ 9999</td></tr>
</tbody>
</table>

모달은 어떤 UI보다도 위에 떠야 하므로 드롭다운·사이드메뉴보다 훨씬 큰 구간(1000번대)으로 점프시킨다.

이렇게 계층을 고정해두면 새 컴포넌트를 추가할 때마다 값을 얼마나 올려야 할지 고민할 필요가 없고, 디버깅 속도도 빨라진다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>z-index는 <code>position</code>이 <strong>static이 아닌</strong> 요소에서만 동작한다.</li>
    <li>Stacking Context 내부에서만 z-index 값을 서로 비교할 수 있고, 서로 다른 Context끼리는 그룹 전체가 하나의 단위로 겹친다.</li>
    <li><code>opacity&lt;1</code>, <code>transform</code>, <code>filter</code>, <code>will-change</code>, <code>position:fixed</code> 등도 새로운 Stacking Context를 만든다.</li>
    <li>z-index 문제가 생기면 숫자를 올리기 전에 <strong>부모가 Context를 만들고 있는지</strong>부터 확인한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: z-index를 9999로 주면 항상 최상단에 보인다?</div>
    <div class="wda-mistake-right">정답: 부모가 <strong>Stacking Context</strong>를 만들고 있다면, 그 안의 z-index는 부모 레이어 내부에서만 유효하다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: position:relative에 z-index만 안 주면 아무 영향이 없다?</div>
    <div class="wda-mistake-right">정답: <code>z-index:auto</code>인 relative 요소는 <strong>새 Stacking Context를 만들지 않는다</strong>. z-index에 숫자값을 줘야 새 Context가 생긴다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 작동 조건</div>
    <div class="wda-formula-block-body"><code>z-index는 position≠static에서만</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 비교 범위</div>
    <div class="wda-formula-block-body"><code>같은 Stacking Context 안에서만 비교</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 계층 설계</div>
    <div class="wda-formula-block-body"><code>콘텐츠0-10 드롭다운100 모달1000</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">position:static인 요소에 z-index:100을 줘도 될까?</div>
    <div class="wda-flip-back">동작하지 않는다. relative/absolute/fixed/sticky 중 하나여야 z-index가 적용된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Stacking Context를 만드는 속성 중 position 외 3가지는?</div>
    <div class="wda-flip-back">opacity&lt;1, transform, filter(will-change나 isolation:isolate도 정답).</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">자식의 z-index가 9999인데도 다른 요소 뒤에 가려진다면 가장 먼저 무엇을 확인해야 할까?</div>
    <div class="wda-flip-back">부모가 opacity·transform 등으로 Stacking Context를 만들고 있는지 확인한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">모달의 z-index를 드롭다운보다 훨씬 크게(1000번대) 잡는 이유는?</div>
    <div class="wda-flip-back">모달은 어떤 UI보다도 위에 떠야 하므로, 100 단위 계층에서 별도의 상위 구간을 배정한다.</div>
  </div>
</div>
