---
title: "3-1 Flexbox 개념 이해하기"
category: "frontend"
section: "css"
date: "2026-08-01"
status: "completed"
description: "Float 레이아웃의 한계에서 출발해 Flexbox가 등장한 이유와 주축·교차축, Container·Item 역할 구분을 정리합니다."
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
  • <strong>Float 한계 이해</strong> — Float 기반 레이아웃이 어떤 문제를 겪었고 Flexbox가 왜 등장했는지 이해합니다<br>
  • <strong>주축·교차축 개념 정립</strong> — flex-direction 값에 따라 주축과 교차축이 어떻게 달라지는지 파악합니다<br>
  • <strong>Container·Item 역할 구분</strong> — 어떤 속성이 부모(Container)용이고 어떤 속성이 자식(Item)용인지 구분합니다<br>
  • <strong>실무 활용 범위 파악</strong> — Flexbox를 어떤 상황에 적용해야 하는지 판단 기준을 세웁니다
</div>

---

## 1. Float 기반 레이아웃의 한계 → Flexbox의 등장

이 문서는 Flexbox를 처음 배울 때 반드시 짚고 가야 할 배경과 기본 개념을 다룬다.

개별 속성의 세부 사용법은 다음 문서인 [Container와 Item 속성 활용하기](/css/css/3-2-flex-container-and-items)에서 이어서 정리하고, 여기서는 "왜 Flexbox가 필요한가", "주축·교차축이란 무엇인가", "Container와 Item은 어떻게 다른가"라는 뼈대에 집중한다.

Flexbox가 나오기 전에는 요소를 가로로 배치할 때 주로 `float` 속성을 사용했다. 문제는 float이 원래 "텍스트가 이미지를 감싸고 흐르게 하는" 용도로 설계된 속성이라는 점이다.

이 속성을 레이아웃 도구로 억지로 끌어다 쓰다 보니 아래와 같은 불편이 계속 쌓였다.

**▶ Float 레이아웃의 한계**

<table class="wda-mtable">
<thead><tr><th>문제</th><th>내용</th></tr></thead>
<tbody>
<tr><td>세로 중앙 정렬 불가</td><td>float만으로는 요소를 세로 방향 중앙에 배치할 방법이 마땅치 않았다.</td></tr>
<tr><td>부모 높이 collapse</td><td>자식 요소들의 높이가 제각각이면 부모 요소의 높이가 0으로 무너져, 매번 clearfix를 강제로 적용해야 했다.</td></tr>
<tr><td>반응형 너비 수동 계산</td><td>영역을 퍼센트로 나눌 때마다 사람이 직접 값을 계산해야 했다.</td></tr>
<tr><td>요소 간 간격 계산</td><td>margin으로 간격을 줄 때마다 좌우 여백을 일일이 맞춰야 해서 번거로웠다.</td></tr>
</tbody>
</table>

Flexbox는 이 문제들을 단 몇 줄로 해결한다.

**• CSS: Flexbox 중앙 정렬**

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>Flexbox 컨테이너를 선언하는 순간 <strong>완벽한 가로·세로 중앙 정렬</strong>, <strong>자식 요소의 자동 동일 높이</strong>, <strong><code>flex: 1</code>을 이용한 공간 자동 분배</strong>가 기본으로 따라온다. Float 시절에는 별도로 계산하고 clearfix까지 신경 써야 했던 문제들이 CSS 몇 줄로 정리된다.</p>
</div>

---

## 2. Flexbox란 무엇인가 — 1차원 레이아웃 시스템

Flexbox는 가로 또는 세로, **한 방향으로만** 요소를 배치하는 데 특화된 1차원 레이아웃 시스템이다. Grid처럼 행(row)과 열(column)을 동시에 제어하지는 않는다.

이 차이 때문에 실무에서는 상황에 따라 도구를 구분해서 쓴다.

**▶ Flexbox와 Grid 선택 기준**

<table class="wda-mtable">
<thead><tr><th>상황</th><th>선택</th></tr></thead>
<tbody>
<tr><td>한 줄(행 또는 열)로만 배치하면 되는 경우</td><td>Flexbox</td></tr>
<tr><td>여러 행과 여러 열을 동시에 맞춰야 하는 경우</td><td>Grid</td></tr>
<tr><td>전체 틀은 격자, 그 안의 세부 정렬은 한 방향인 복잡한 UI</td><td>Flex + Grid 혼합</td></tr>
</tbody>
</table>

---

## 3. 주축(Main Axis)과 교차축(Cross Axis)

Flexbox를 다루는 내내 가장 먼저 확인해야 하는 것이 바로 **주축**과 **교차축**이다. 두 축은 고정된 것이 아니라 `flex-direction` 값에 따라 방향이 바뀐다.

**▶ flex-direction별 주축·교차축**

<table class="wda-mtable">
<thead><tr><th>flex-direction</th><th>주축(Main Axis)</th><th>교차축(Cross Axis)</th></tr></thead>
<tbody>
<tr><td>row (기본값)</td><td>가로 방향 — <code>justify-content</code>로 정렬</td><td>세로 방향 — <code>align-items</code>로 정렬</td></tr>
<tr><td>row-reverse</td><td>가로 역방향 — <code>justify-content</code>로 정렬</td><td>세로 방향 — <code>align-items</code>로 정렬</td></tr>
<tr><td>column</td><td>세로 방향 — <code>justify-content</code>로 정렬</td><td>가로 방향 — <code>align-items</code>로 정렬</td></tr>
<tr><td>column-reverse</td><td>세로 역방향 — <code>justify-content</code>로 정렬</td><td>가로 방향 — <code>align-items</code>로 정렬</td></tr>
</tbody>
</table>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>flex-direction을 <code>column</code>으로 바꾸면 justify-content와 align-items가 담당하는 방향이 통째로 뒤바뀐다. row에서 쓰던 습관대로 "justify-content는 가로 정렬"이라고 생각한 채 column에 그대로 적용하면 원하는 결과가 나오지 않는다. <strong>주축이 어느 방향인지부터 먼저 확인</strong>하는 습관을 들여야 한다.</p>
</div>

---

## 4. Container vs Item — 속성 역할 구분

Flexbox 속성은 크게 두 그룹으로 나뉜다. 부모 요소(Container)에 적용하는 속성과, 자식 요소(Item)에 적용하는 속성이다.

이 둘을 헷갈리면 원하는 스타일이 전혀 다른 곳에 적용되는 실수로 이어진다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Container(부모) 속성</div>
    <code>display: flex</code>, <code>flex-direction</code>, <code>justify-content</code>, <code>align-items</code>, <code>align-content</code>, <code>flex-wrap</code>, <code>gap</code>처럼 <strong>정렬과 배치 방향 전체</strong>를 결정하는 속성이다. "정렬은 컨테이너가 한다."
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Item(자식) 속성</div>
    <code>flex-grow</code>, <code>flex-shrink</code>, <code>flex-basis</code>, <code>order</code>, <code>align-self</code>처럼 <strong>개별 요소의 크기·순서·정렬</strong>을 담당하는 속성이다. "크기, 순서, 개별 정렬은 아이템이 한다."
  </div>
</div>

**• Container 속성**

```css
/* Container(부모)에 적용 */
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
```

**• Item 속성**

```css
/* Item(자식)에 적용 */
.item {
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 200px;
  /* 실무에서는 위 세 줄 대신 단축 속성을 주로 사용한다 */
  flex: 1; /* flex: 2, flex: auto, flex: none 도 가능 */
  order: -1;
  align-self: flex-end;
}
```

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>Float 레이아웃은 <strong>세로 중앙정렬, 부모 collapse, 반응형 계산, 간격 계산</strong>에서 한계가 있었고, Flexbox가 이를 몇 줄로 해결했다.</li>
    <li>Flexbox는 가로 또는 세로 <strong>한 방향</strong>만 다루는 1차원 레이아웃 시스템이다. 여러 행과 열을 동시에 다루려면 Grid를 쓴다.</li>
    <li>flex-direction 기본값 <strong>row</strong>에서는 가로가 주축, <strong>column</strong>에서는 세로가 주축이다.</li>
    <li><strong>justify-content</strong>는 주축 정렬, <strong>align-items</strong>는 교차축 정렬을 담당한다.</li>
    <li>정렬·배치는 <strong>Container</strong> 속성, 크기·순서·개별 정렬은 <strong>Item</strong> 속성이 담당한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: flex-grow는 Container(부모)에 적용하는 속성이다?</div>
    <div class="wda-mistake-right">정답: <code>flex-grow</code>는 <strong>Item(자식)</strong> 속성이다. Container는 정렬·배치를, Item은 자기 자신의 크기 배분을 조절한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 텍스트가 이미지를 감싸는 흐름 제어도 Flexbox가 해결한 문제다?</div>
    <div class="wda-mistake-right">정답: 텍스트 흐름 제어는 <strong>float 본래의 목적</strong>이며, Flexbox가 해결하는 영역이 아니다. Flexbox는 정렬과 공간 분배를 위한 도구다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: flex-direction이 바뀌어도 주축과 교차축은 그대로다?</div>
    <div class="wda-mistake-right">정답: <strong>flex-direction 값에 따라 주축과 교차축 방향이 바뀐다.</strong> row에서 가로였던 주축이 column에서는 세로가 된다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 차원</div>
    <div class="wda-formula-block-body"><code>Flexbox = 1차원 · Grid = 2차원</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · row 기준 축</div>
    <div class="wda-formula-block-body"><code>row → 주축 가로 · 교차축 세로</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 역할</div>
    <div class="wda-formula-block-body"><code>Container = 정렬 · Item = 크기·순서</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Float 레이아웃에서 세로 중앙정렬이 어려웠던 이유는?</div>
    <div class="wda-flip-back">float은 애초에 텍스트 흐름을 위한 속성이라, 정렬 전용 기능이 없어 세로 중앙정렬을 위해서는 별도 계산이 필요했다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Flexbox와 Grid의 근본적인 차이는?</div>
    <div class="wda-flip-back">Flexbox는 1차원(한 방향), Grid는 2차원(행과 열을 동시에 제어)이라는 점이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">flex-direction: column일 때 주축은 어느 방향인가?</div>
    <div class="wda-flip-back">세로 방향이며, justify-content로 정렬한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">flex-grow는 Container 속성일까 Item 속성일까?</div>
    <div class="wda-flip-back">Item(자식) 속성이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">justify-content와 align-items의 차이는?</div>
    <div class="wda-flip-back">justify-content는 주축 정렬, align-items는 교차축 정렬을 담당한다.</div>
  </div>
</div>
