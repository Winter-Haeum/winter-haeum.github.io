---
title: "3-2 Container와 Item 속성 활용하기"
category: "frontend"
section: "css"
date: "2026-08-01"
status: "completed"
description: "flex-direction, justify-content, align-items 등 Container 속성 7개와 flex-grow, order 등 Item 속성 6개를 실무 예시와 함께 정리합니다."
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
  • <strong>Container 속성 7개 완벽 이해</strong> — flex-direction, flex-wrap, justify-content, align-items, align-content, gap 등 정렬·배치 속성을 구분해서 활용합니다<br>
  • <strong>Item 속성 6개 완벽 이해</strong> — flex-grow, flex-shrink, flex-basis, order, align-self 등으로 크기·순서·정렬을 독립적으로 제어합니다<br>
  • <strong>주축·교차축 정렬 차이 체득</strong> — justify-content(주축)와 align-items(교차축)의 방향 차이를 실전 코드로 익힙니다<br>
  • <strong>실무 조합 패턴 습득</strong> — 중앙정렬, 균등 분배, 양끝 정렬 같은 자주 쓰는 조합을 몸에 익힙니다
</div>

---

## 1. Container 속성(부모 요소) 정리

[이전 문서](/css/css/3-1-flexbox-concept)에서 Flexbox의 기본 개념과 Container·Item의 역할 구분을 봤다면, 이 문서에서는 그 속성들을 하나씩 실전 코드로 다룬다. Container 속성 7개, Item 속성 6개를 값 종류와 실무 예시 위주로 정리한다.

### 🧭 flex-direction — 주축 방향 결정

컨테이너 안 아이템이 배치될 방향, 즉 주축의 방향을 결정한다.

**• CSS: flex-direction 지정**

```css
.container {
  display: flex;
  flex-direction: row; /* 기본값. column도 가능 */
}
```

### 📐 justify-content — 주축 방향 정렬

아이템들을 주축 방향으로 어떻게 배치할지 결정한다. 값에 따라 정렬 결과가 크게 달라진다.

**▶ justify-content 값별 정렬**

<table class="wda-mtable">
<thead><tr><th>값</th><th>정렬 의미</th><th>실무 예</th></tr></thead>
<tbody>
<tr><td><code>flex-start</code></td><td>주축 시작점에 몰아서 정렬</td><td>왼쪽 정렬 목록</td></tr>
<tr><td><code>center</code></td><td>주축 방향 정중앙에 정렬</td><td>모달 버튼, 로딩 화면</td></tr>
<tr><td><code>flex-end</code></td><td>주축 끝점에 몰아서 정렬</td><td>버튼 그룹 우측 정렬</td></tr>
<tr><td><code>space-between</code></td><td>양 끝은 붙이고 사이 간격을 균등 배분</td><td>네비게이션 바(로고-메뉴-유저)</td></tr>
<tr><td><code>space-around</code></td><td>각 아이템 양옆에 동일한 여백을 배분</td><td>카드 나열</td></tr>
<tr><td><code>space-evenly</code></td><td>아이템 사이·양끝 모두 동일한 여백을 배분</td><td>균일한 카드 그리드</td></tr>
</tbody>
</table>

**• CSS: justify-content 실무 패턴**

```css
/* 중앙 정렬 */
.center { justify-content: center; }

/* 네비게이션 - 로고와 메뉴를 양끝으로 */
.navbar { justify-content: space-between; }

/* 버튼 그룹 - 우측 정렬 */
.button-group { justify-content: flex-end; }

/* 카드 나열 - 균등 간격 */
.cards { justify-content: space-evenly; }
```

### 📐 align-items — 교차축 방향 정렬

아이템들을 교차축 방향으로 어떻게 배치할지 결정한다.

**▶ align-items 값별 정렬**

<table class="wda-mtable">
<thead><tr><th>값</th><th>정렬 의미</th><th>실무 예</th></tr></thead>
<tbody>
<tr><td><code>stretch</code> (기본값)</td><td>교차축 방향으로 컨테이너 높이만큼 늘려 채움</td><td>카드 리스트 높이 맞추기</td></tr>
<tr><td><code>center</code></td><td>교차축 방향 정중앙에 정렬</td><td>가로·세로 동시 중앙정렬</td></tr>
<tr><td><code>flex-start</code></td><td>교차축 시작점에 정렬</td><td>상단 정렬 네비게이션</td></tr>
<tr><td><code>flex-end</code></td><td>교차축 끝점에 정렬</td><td>하단 정렬 요소</td></tr>
<tr><td><code>baseline</code></td><td>텍스트 베이스라인 기준으로 정렬</td><td>글자 크기가 다른 폼 요소 정렬</td></tr>
</tbody>
</table>

**• CSS: align-items 실무 패턴**

```css
/* 가로·세로 동시 중앙 정렬 */
.center-both {
  justify-content: center;
  align-items: center;
}

/* 네비게이션 - 세로 중앙 정렬 */
.navbar { align-items: center; }

/* 카드 - 높이 맞추기(기본값 stretch) */
.cards { align-items: stretch; }

/* 폼 - 라벨과 입력창 베이스라인 정렬 */
.form-row { align-items: baseline; }
```

### 🧭 flex-wrap — 줄바꿈 제어

아이템이 한 줄에 다 들어가지 않을 때 줄바꿈할지 여부를 결정한다.

**▶ flex-wrap 값별 동작**

<table class="wda-mtable">
<thead><tr><th>값</th><th>동작</th></tr></thead>
<tbody>
<tr><td><code>nowrap</code> (기본값)</td><td>줄바꿈하지 않고 한 줄에 억지로 맞춘다(아이템이 찌그러질 수 있음)</td></tr>
<tr><td><code>wrap</code></td><td>공간이 부족하면 다음 줄로 넘긴다</td></tr>
<tr><td><code>wrap-reverse</code></td><td>다음 줄로 넘기되, 줄 순서를 반대로 쌓는다</td></tr>
</tbody>
</table>

**• CSS: flex-wrap 실무 패턴**

```css
/* 카드 그리드 - 넘치면 다음 줄로 */
.card-grid { display: flex; flex-wrap: wrap; gap: 16px; }

/* 태그 리스트 - 자유롭게 줄바꿈 */
.tag-list { display: flex; flex-wrap: wrap; gap: 8px; }

/* 네비게이션 - 줄바꿈 대신 가로 스크롤 */
.navbar-menu {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}
```

대표적으로 아래 UI 패턴에서 wrap을 사용한다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">카드 그리드</div><div class="wda-fcard-dsc">화면 너비에 따라 3열→2열→1열로 자연스럽게 줄어든다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">태그 리스트</div><div class="wda-fcard-dsc">태그 개수가 많아지면 다음 줄로 자유롭게 넘어간다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">네비게이션 메뉴</div><div class="wda-fcard-dsc">메뉴가 줄바꿈되면 안 되는 경우 nowrap + overflow-x로 처리한다.</div></div>
</div>

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">wrap을 쓰는 경우</div>
    카드 그리드, 태그 목록처럼 아이템 개수가 유동적이고 <strong>줄바꿈되어도 자연스러운</strong> 레이아웃에 사용한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">nowrap을 쓰는 경우</div>
    네비게이션 메뉴처럼 <strong>한 줄 구조가 무너지면 안 되는</strong> 레이아웃에 사용하고, 넘치는 공간은 overflow-x로 처리한다.
  </div>
</div>

### 📐 align-content — 여러 줄 정렬

`flex-wrap`으로 인해 아이템이 여러 줄이 되었을 때, 그 **줄들 사이의 간격**을 정렬한다. 한 줄짜리 레이아웃에서는 아무런 효과가 없다.

**▶ align-content 값별 정렬**

<table class="wda-mtable">
<thead><tr><th>값</th><th>정렬 의미</th></tr></thead>
<tbody>
<tr><td><code>flex-start</code></td><td>줄들을 컨테이너 시작 쪽으로 몰아 배치</td></tr>
<tr><td><code>center</code></td><td>줄들을 컨테이너 정중앙에 배치</td></tr>
<tr><td><code>flex-end</code></td><td>줄들을 컨테이너 끝 쪽으로 몰아 배치</td></tr>
<tr><td><code>space-between</code></td><td>첫 줄과 마지막 줄은 붙이고 사이 간격을 균등 배분</td></tr>
<tr><td><code>space-around</code></td><td>각 줄 위아래에 동일한 여백을 배분</td></tr>
<tr><td><code>stretch</code> (기본값)</td><td>줄들을 컨테이너 높이에 맞춰 늘림</td></tr>
</tbody>
</table>

**💡 설명**

<div class="wda-callout wda-ci">
  <p><strong>align-items와 align-content를 혼동하지 않는 팁:</strong> align-items는 한 줄 안에서 아이템 하나하나를 교차축 방향으로 정렬하고, align-content는 flex-wrap으로 만들어진 <strong>줄 전체</strong>를 정렬한다. 아이템이 한 줄이면 align-content는 아무 효과가 없다.</p>
</div>

### 📏 gap — 아이템 간 간격

아이템 사이의 간격을 지정한다. margin과 달리 컨테이너 바깥쪽에는 여백이 생기지 않는다.

**• CSS: gap으로 아이템 간격**

```css
.container {
  display: flex;
  gap: 16px;          /* 행·열 간격을 한 번에 */
  row-gap: 16px;       /* 행 간격만 */
  column-gap: 8px;      /* 열 간격만 */
}
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">gap</div>
    아이템 <strong>사이</strong>에만 간격이 생긴다. 컨테이너 바깥쪽에는 여백이 남지 않아 계산이 단순하다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">margin</div>
    아이템마다 개별로 지정해야 하고, <strong>맨 끝 아이템의 바깥쪽</strong>에도 여백이 남아 별도로 상쇄시켜야 한다.
  </div>
</div>

### 전체 컨테이너 속성 예시

**• CSS: Container 속성 종합 예시**

```css
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  gap: 16px;
}
```

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p><strong>Container 속성 핵심 정리</strong> — 필수 2개는 <code>justify-content</code> + <code>align-items</code>다. 자주 쓰는 4개는 <code>flex-direction</code>, <code>flex-wrap</code>, <code>gap</code>, <code>align-content</code>다. 실무 패턴은 중앙 정렬(<code>center</code> + <code>center</code>), 네비게이션(<code>space-between</code>), 카드 그리드(<code>flex-wrap: wrap</code> + <code>gap</code>)로 정리된다.</p>
</div>

---

## 2. Item 속성 — 개별 요소 6가지 속성

### 🧭 flex-grow — 여유 공간을 차지하는 비율

컨테이너에 남는 공간이 있을 때, 그 공간을 얼마나 차지할지 비율로 지정한다.

**• 기본값(늘어나지 않음)**

```css
.item { flex-grow: 0; } /* 기본값. 늘어나지 않음 */
```

**• 균등 분배**

```css
/* 모든 아이템이 남는 공간을 균등하게 나눠 가짐 */
.item { flex-grow: 1; }
```

**• 비율 분배(1:2:1)**

```css
/* 1 : 2 : 1 비율로 남는 공간을 분배 */
.item-1 { flex-grow: 1; }
.item-2 { flex-grow: 2; }
.item-3 { flex-grow: 1; }
```

**▶ flex-grow 값별 동작**

<table class="wda-mtable">
<thead><tr><th>flex-grow 값</th><th>동작</th></tr></thead>
<tbody>
<tr><td><code>0</code> (기본값)</td><td>남는 공간이 있어도 늘어나지 않는다</td></tr>
<tr><td><code>1</code></td><td>남는 공간을 다른 grow:1 아이템과 균등하게 나눠 가진다</td></tr>
<tr><td><code>2</code> 이상</td><td>숫자가 클수록 더 많은 여유 공간을 차지한다</td></tr>
</tbody>
</table>

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>실무에서는 flex-grow를 단독으로 쓰기보다 <strong><code>flex: 1</code> 단축 속성</strong>으로 함께 지정하는 경우가 훨씬 많다.</p>
</div>

### 🧭 flex-shrink — 공간이 부족할 때 줄어드는 비율

컨테이너 공간이 부족할 때, 아이템이 얼마나 줄어들지 비율로 지정한다.

**• CSS: flex-shrink 값별 동작**

```css
.item { flex-shrink: 0; } /* 공간이 부족해도 줄어들지 않음 */
.item { flex-shrink: 1; } /* 기본값. 다른 아이템과 비율대로 줄어듦 */
.item { flex-shrink: 2; } /* 숫자가 클수록 더 많이 줄어듦 */
```

### 📏 flex-basis — 아이템의 기본 크기

flex-grow, flex-shrink가 적용되기 전 아이템의 기본 크기를 지정한다. width 대신 flex 컨테이너 안에서는 flex-basis를 사용하는 것이 일반적이다.

`flex-basis: 0%`로 지정하면 원래 콘텐츠 크기를 무시하고 오직 flex-grow 비율로만 공간을 나눈다.

**• CSS: flex-basis 지정**

```css
.item { flex-basis: 200px; }
.item { flex-basis: 0%; } /* 콘텐츠 크기를 무시하고 grow 비율로만 분배 */
```

### 🧭 flex — 단축 속성(grow + shrink + basis) ⭐

실무에서 가장 많이 사용하는 속성이다. `flex-grow`, `flex-shrink`, `flex-basis`를 한 번에 지정한다.

**• 기본 패턴**

```css
.item { flex: 1; } /* 기본 패턴. flex: 1 1 0%와 동일 */
```

**• 비율 분배**

```css
/* 1:2:1 비율 분배 */
.item-1 { flex: 1; }
.item-2 { flex: 2; }
.item-3 { flex: 1; }
```

**• 고정 크기와 자동 크기**

```css
.sidebar { flex: 0 0 200px; } /* 고정 크기 - 늘지도 줄지도 않음 */
.box { flex: 0 1 auto; }      /* 자동 크기 - 줄어들기만 함 */
```

**▶ flex 단축 값별 의미**

<table class="wda-mtable">
<thead><tr><th>단축 값</th><th>grow</th><th>shrink</th><th>basis</th><th>의미</th></tr></thead>
<tbody>
<tr><td><code>flex: 1</code></td><td>1</td><td>1</td><td>0%</td><td>남는 공간을 균등하게 채움</td></tr>
<tr><td><code>flex: 2</code></td><td>2</td><td>1</td><td>0%</td><td>다른 flex:1 아이템의 2배로 공간을 차지</td></tr>
<tr><td><code>flex: auto</code></td><td>1</td><td>1</td><td>auto</td><td>콘텐츠 크기를 기준으로 늘고 줄어듦</td></tr>
<tr><td><code>flex: none</code></td><td>0</td><td>0</td><td>auto</td><td>고정 크기, 늘지도 줄지도 않음</td></tr>
<tr><td><code>flex: 0 0 200px</code></td><td>0</td><td>0</td><td>200px</td><td>200px로 완전히 고정</td></tr>
</tbody>
</table>

### 📐 align-self — 개별 아이템 교차축 정렬

컨테이너에 지정한 `align-items` 값을, 특정 아이템 하나에서만 다르게 덮어쓰고 싶을 때 사용한다.

**• CSS: align-self로 개별 정렬**

```css
.container { align-items: center; }
.item-special { align-self: flex-end; } /* 이 아이템만 끝으로 정렬 */
```

### 🧭 order — 시각적 순서 변경 ⭐

HTML 구조는 그대로 유지한 채, 화면에 보이는 순서만 바꾼다.

**• CSS: order로 순서 변경**

```css
.primary-btn { order: -1; } /* 화면에서 맨 앞으로 이동 */
```

**▶ order 속성 정리**

<table class="wda-mtable">
<thead><tr><th>특성</th><th>내용</th></tr></thead>
<tbody>
<tr><td>기본값</td><td>모든 아이템은 <code>order: 0</code></td></tr>
<tr><td>숫자가 클수록</td><td>화면에서 더 뒤쪽으로 이동</td></tr>
<tr><td>음수 사용</td><td>맨 앞으로 이동시킬 수 있음</td></tr>
<tr><td>HTML 구조</td><td>변경되지 않고 그대로 유지됨(시각적 순서만 변경)</td></tr>
</tbody>
</table>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>접근성 주의</strong> — 스크린 리더는 order로 바뀐 시각적 순서가 아니라 <strong>HTML 문서 순서 그대로</strong> 읽는다. order를 남용해 화면 순서와 문서 순서가 크게 어긋나면, 스크린 리더 사용자가 체감하는 콘텐츠 순서와 화면상 순서가 달라질 수 있다.</p>
</div>

order는 아래와 같은 상황에서 자주 쓰인다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">모바일 UI</div><div class="wda-fcard-dsc">작은 화면에서 중요한 요소를 시각적으로 위쪽에 배치한다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">반응형 레이아웃</div><div class="wda-fcard-dsc">화면 크기에 따라 사이드바와 본문의 노출 순서를 바꾼다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">대시보드</div><div class="wda-fcard-dsc">사용자 우선순위에 따라 위젯 순서를 조정한다.</div></div>
</div>

### Item 속성 한눈에 보기

**• CSS: Item 속성 종합 예시**

```css
.item {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
  flex: 1; /* 위 세 줄을 한 번에 */
  align-self: center;
  order: 2;
}
```

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p><strong>Item 속성 핵심 정리</strong> — 필수 1개는 <code>flex</code> 단축 속성이다. <code>flex: 1</code> 하나만 알아도 실무의 80%를 커버한다. 자주 쓰는 3개는 <code>flex-grow</code>, <code>align-self</code>, <code>order</code>다. 실무 패턴은 균등 분배(<code>flex: 1</code>), 비율 분배(<code>flex: 1, 2</code>), 고정 크기(<code>flex: 0 0 200px</code>)로 정리된다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><strong>justify-content</strong>는 주축 정렬, <strong>align-items</strong>는 교차축 정렬을 담당한다.</li>
    <li><strong>flex-wrap</strong>이 없으면(기본값 nowrap) 아이템은 무조건 한 줄에 갇힌다.</li>
    <li><strong>gap</strong>은 margin과 달리 아이템 사이에만 간격을 만들어 계산이 간단하다.</li>
    <li><strong>flex: 1</strong>은 flex-grow·flex-shrink·flex-basis를 한 번에 지정하는 단축 속성으로, 실무의 대부분을 커버한다.</li>
    <li><strong>order</strong>는 화면상 시각적 순서만 바꾸고, HTML 문서 구조에는 영향을 주지 않는다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: flex: 1은 flex-grow만 지정하는 속성이다?</div>
    <div class="wda-mistake-right">정답: <code>flex: 1</code>은 <strong>flex-grow: 1, flex-shrink: 1, flex-basis: 0%</strong>를 한 번에 지정하는 단축 속성이다(<code>flex: 1 1 0%</code>).</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: align-self는 Container(부모)에 적용하는 속성이다?</div>
    <div class="wda-mistake-right">정답: <code>align-self</code>는 <strong>Item(개별 항목)</strong>에 적용해 컨테이너의 align-items 값을 그 아이템만 덮어쓰는 속성이다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: align-content와 align-items는 같은 역할을 한다?</div>
    <div class="wda-mistake-right">정답: align-items는 <strong>한 줄 안</strong> 아이템의 교차축 정렬이고, align-content는 <strong>flex-wrap으로 나뉜 줄들 사이</strong>의 정렬이다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 필수 2개</div>
    <div class="wda-formula-block-body"><code>justify-content + align-items</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · flex 단축</div>
    <div class="wda-formula-block-body"><code>flex: 1 = grow1 shrink1 basis0%</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · order</div>
    <div class="wda-formula-block-body"><code>숫자 클수록 뒤로 · 음수는 맨 앞</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">flex: 1은 무엇의 단축 속성인가?</div>
    <div class="wda-flip-back">flex-grow: 1, flex-shrink: 1, flex-basis: 0%의 단축 속성이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">align-self는 어디에 적용하는 속성인가?</div>
    <div class="wda-flip-back">Item(개별 항목)에 적용한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">justify-content가 담당하는 축은?</div>
    <div class="wda-flip-back">주축(Main Axis) 정렬이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">flex-wrap의 기본값은?</div>
    <div class="wda-flip-back">nowrap(줄바꿈하지 않음)이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">order: -1을 주면 어떻게 되나?</div>
    <div class="wda-flip-back">기본값 0보다 작으므로 화면에서 맨 앞으로 이동한다. HTML 구조는 그대로 유지된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">gap과 margin의 차이는?</div>
    <div class="wda-flip-back">gap은 아이템 사이에만 간격을 만들어 바깥쪽에 여백이 남지 않지만, margin은 개별로 계산해야 하고 바깥쪽에도 여백이 남는다.</div>
  </div>
</div>
