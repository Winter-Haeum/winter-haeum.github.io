---
title: "1-4 박스 모델 완벽 이해"
category: "frontend"
section: "css"
date: "2026-08-01"
status: "completed"
description: "박스 모델의 4가지 구성요소와 box-sizing, 마진 붕괴, BFC 개념까지 레이아웃의 기초를 정리합니다."
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
  • <strong>박스 모델 구조 이해</strong> — Content, Padding, Border, Margin 4가지 구성요소를 파악합니다<br>
  • <strong>box-sizing 차이 파악</strong> — content-box와 border-box가 width/height를 계산하는 방식의 차이를 이해합니다<br>
  • <strong>마진 붕괴 대응</strong> — Margin Collapse 현상이 발생하는 조건과 해결 방법을 익힙니다<br>
  • <strong>Border와 Outline 구분</strong> — 두 속성의 차이와 레이아웃에 미치는 영향을 이해합니다
</div>

---

## 1. 박스 모델의 4겹 구조

[이전 문서](/css/css/1-3-colors-and-fonts)에서 색상과 폰트로 요소의 겉모습을 꾸몄다면, 이 문서에서는 그 요소가 화면에서 차지하는 "공간"을 다룬다. CSS에서 모든 요소는 사각형 상자(박스)로 취급된다.

이 박스가 어떤 구조로 이루어지는지, 크기는 어떻게 계산되는지를 정확히 알아야 레이아웃이 예상대로 배치된다.

모든 HTML 요소는 안쪽부터 바깥쪽까지 네 겹으로 이루어진 박스로 렌더링된다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">Content</div><div class="wda-fnode-dsc">실제 내용이 담기는 영역</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">Padding</div><div class="wda-fnode-dsc">내용과 테두리 사이 안쪽 여백</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">Border</div><div class="wda-fnode-dsc">Padding을 둘러싸는 테두리</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">Margin</div><div class="wda-fnode-dsc">박스 가장 바깥의 외부 여백</div></div>
</div>

### 🧱 Content

`width`, `height`는 기본적으로 이 Content 영역만을 대상으로 크기를 계산한다(뒤에서 다룰 `box-sizing`에 따라 달라질 수 있다).

### 📏 Padding

내용과 테두리 사이의 공간이다. 요소의 배경색이나 배경 이미지는 Padding 영역까지 함께 칠해진다.

음수 값은 사용할 수 없다.

**• CSS: Padding 단축 속성**

```css
.box {
  padding: 16px;              /* 단축 속성: 4방향 동일 */
  padding: 8px 16px;          /* 상하 8px, 좌우 16px */
  padding-top: 4px;           /* 개별 방향 지정 */
}
```

### 🧱 Border

Padding을 둘러싸는 테두리다. 단축 속성으로 두께·스타일·색상을 한 번에 지정할 수 있다.

**• CSS: Border 단축 속성**

```css
.box {
  border: 2px solid #333;                /* 두께 스타일 색상 */
  border-top: 1px dashed #999;           /* 위쪽만 개별 지정 */
}
```

`border-style`에는 `solid`(실선), `dashed`(파선), `dotted`(점선), `double`(이중선) 등의 값을 사용할 수 있다.

### 📏 Margin

박스 가장 바깥의 여백으로, 요소와 요소 사이의 거리를 만든다. `margin: 0 auto`는 좌우 마진을 자동으로 맞춰 블록 요소를 가운데 정렬하는 잘 알려진 패턴이다.

Padding과 달리 Margin은 음수 값도 사용할 수 있어 요소를 의도적으로 겹치게 만들 때 활용하기도 한다.

**▶ Padding과 Margin 비교**

<table class="wda-mtable">
<thead><tr><th>구분</th><th>위치</th><th>배경색 적용</th><th>음수 값</th><th>주 용도</th></tr></thead>
<tbody>
<tr><td>Padding</td><td>내용과 테두리 사이(안쪽)</td><td>적용됨</td><td>불가능</td><td>내용 주변 여백 확보</td></tr>
<tr><td>Margin</td><td>테두리 바깥(외부)</td><td>적용 안 됨</td><td>가능</td><td>요소 간 거리 확보, 중앙 정렬</td></tr>
</tbody>
</table>

---

## 2. Margin 단축 속성과 display별 동작

Margin의 단축 속성은 값 개수에 따라 적용 방향이 달라진다.

**• CSS: Margin 단축 속성**

```css
margin: 10px;                 /* 4방향 모두 10px */
margin: 10px 20px;            /* 상하 10px, 좌우 20px */
margin: 10px 20px 30px 40px;  /* 상 우 하 좌 순서로 각각 지정 */
margin: 0 auto;               /* 상하 0, 좌우 자동 정렬 */
```

margin이 실제로 어떻게 동작하는지는 요소의 `display` 값에 따라 달라진다.

**▶ display별 margin 동작**

<table class="wda-mtable">
<thead><tr><th>display 값</th><th>margin 동작</th></tr></thead>
<tbody>
<tr><td><code>block</code></td><td>4방향 모두 온전히 적용</td></tr>
<tr><td><code>inline</code></td><td>좌우만 적용, 상하는 시각적으로 거의 효과 없음</td></tr>
<tr><td><code>inline-block</code></td><td>4방향 모두 적용</td></tr>
<tr><td><code>flex</code> / <code>grid</code> 아이템</td><td>4방향 모두 적용, 아이템 간 간격 조절에 활용</td></tr>
</tbody>
</table>

`inline` 요소의 상하 margin이 잘 보이지 않는 이유는, 인라인 요소가 "라인 박스"라는 한 줄짜리 흐름 안에 배치되기 때문이다. 라인 박스는 줄의 높이를 내용의 폭에 맞춰 결정할 뿐, 위아래 여백을 반영해 다른 줄과의 간격을 넓히지 않는다.

---

## 3. width, height와 크기 제한 속성

`width`, `height`는 `px`(절대 픽셀), `%`(부모 요소 대비 비율), `vw`/`vh`(뷰포트 너비·높이 대비 비율) 단위를 사용할 수 있다.

**• CSS: 너비·높이 제한**

```css
.box {
  width: 80%;
  max-width: 1200px;
  min-width: 320px;
}
```

`min-width`/`max-width`, `min-height`/`max-height`는 크기의 상한과 하한을 제한한다.

위 예시는 화면 너비에 맞춰 유동적으로 늘어나되(`width: 80%`), 너무 커지거나(`max-width`) 너무 작아지지(`min-width`) 않도록 막는 실무에서 자주 쓰이는 반응형 패턴이다.

---

## 4. box-sizing: content-box vs border-box

`width`, `height`가 정확히 무엇을 기준으로 계산되는지는 `box-sizing` 속성이 결정한다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">content-box (기본값)</div>
    <code>width</code>는 Content 영역만 의미한다. 실제 화면에서 차지하는 전체 크기는 <code>width + padding + border</code>를 모두 더해야 한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">border-box</div>
    <code>width</code>가 Padding과 Border를 포함한 <strong>박스 전체 크기</strong>를 의미한다. 실무에서 크기를 예측하기 쉬워 널리 권장된다.
  </div>
</div>

**• CSS: content-box와 border-box 비교**

```css
.content-box {
  box-sizing: content-box; /* 기본값 */
  width: 200px;
  padding: 20px;
  border: 10px solid;
  /* 실제 전체 너비 = 200 + 20*2 + 10*2 = 260px */
}

.border-box {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 10px solid;
  /* 실제 전체 너비 = 200px (padding, border가 안쪽으로 흡수됨) */
}
```

실무에서는 다음과 같이 전역으로 `border-box`를 지정해서 크기 계산을 예측 가능하게 만드는 것이 일반적이다.

**• CSS: 전역 border-box 설정**

```css
* {
  box-sizing: border-box;
}
```

---

## 5. Margin Collapse (마진 붕괴)

세로 방향의 margin이 서로 만나면, 두 값을 더하지 않고 <strong>더 큰 값 하나만</strong> 적용되는 현상이 발생한다. 이를 Margin Collapse라고 부른다.

**• CSS: Margin Collapse 발생**

```css
.box-a { margin-bottom: 30px; }
.box-b { margin-top: 20px; }
/* 두 박스 사이 간격은 30 + 20 = 50px이 아니라, 더 큰 값인 30px만 적용된다 */
```

이 현상은 <strong>세로 방향에서만</strong> 발생한다. 가로 방향 margin은 서로 겹쳐도 각각 그대로 적용되며 합쳐지지 않는다. Margin Collapse가 일어나는 대표적인 상황은 세 가지다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">인접 형제 요소</div><div class="wda-fcard-dsc">위 요소의 margin-bottom과 아래 요소의 margin-top이 만날 때</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">부모-자식 요소</div><div class="wda-fcard-dsc">부모와 자식 사이에 테두리·패딩 등 경계가 전혀 없을 때 부모의 margin처럼 동작</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">완전히 빈 블록 요소</div><div class="wda-fcard-dsc">내용이 없는 요소는 자신의 margin-top과 margin-bottom끼리도 붕괴</div></div>
</div>

반대로 요소에 `padding`, `border`, `overflow`(hidden/auto 등), `display: flex`/`grid`, `float`, `position: absolute` 중 하나라도 있으면 그 경계가 margin이 겹치는 것을 막아 Collapse가 일어나지 않는다.

**▶ Margin Collapse 방지 방법**

<table class="wda-mtable">
<thead><tr><th>해결 방법</th><th>설명</th></tr></thead>
<tbody>
<tr><td><code>padding-top: 1px</code></td><td>부모에 최소한의 padding을 주어 경계를 만든다</td></tr>
<tr><td><code>border-top: 1px solid transparent</code></td><td>보이지 않는 테두리로 경계를 만든다</td></tr>
<tr><td><code>overflow: hidden</code> / <code>auto</code></td><td>부모에 overflow를 지정해 새로운 렌더링 경계를 만든다</td></tr>
<tr><td><code>display: flex</code> / <code>grid</code></td><td>부모를 flex나 grid 컨테이너로 바꿔 margin 붕괴 계산 방식 자체를 바꾼다</td></tr>
</tbody>
</table>

---

## 6. 고급 주제: BFC(Block Formatting Context)

BFC는 블록 요소들이 레이아웃될 때 사용하는 독립적인 영역이다. BFC 안에서는 바깥 요소와 margin이 서로 영향을 주고받지 않고, float 요소도 이 영역 안에서만 배치가 계산된다.

**💡 설명**

<div class="wda-callout wda-ci">
  <p>BFC의 주요 효과는 세 가지다. <strong>Margin Collapse 방지</strong>(서로 다른 BFC에 속한 요소끼리는 margin이 겹치지 않음), <strong>float 요소 격리</strong>(float된 자식이 부모 밖으로 삐져나오는 문제 방지), <strong>독립적인 레이아웃 영역 확보</strong>다.</p>
</div>

BFC는 다음 조건 중 하나만 만족해도 새로 생성된다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">overflow</div><div class="wda-fcard-dsc">hidden, auto, scroll 등 visible이 아닌 값</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">display</div><div class="wda-fcard-dsc">flow-root, flex, grid, inline-block</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">float</div><div class="wda-fcard-dsc">left 또는 right</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">position</div><div class="wda-fcard-dsc">absolute 또는 fixed</div></div>
</div>

**• CSS: BFC로 마진 붕괴·float 문제 해결**

```css
/* 마진 붕괴 방지: 부모를 BFC로 만든다 */
.parent {
  overflow: hidden;
}

/* float 자식 감싸기: 부모가 float 자식의 높이를 인식하지 못하는 문제 해결 */
.container {
  display: flow-root;
}
```

---

## 7. Border 세부 옵션

### 📏 방향별 지정

**• CSS: 방향별 Border 지정**

```css
.box {
  border-top: 1px solid #333;
  border-right-width: 2px;
  border-right-style: dashed;
  border-right-color: #999;
}
```

방향별 단축 속성(`border-top`, `border-right`, `border-bottom`, `border-left`)과 속성별 개별 지정(`border-top-width`, `border-top-style`, `border-top-color`) 두 방식을 상황에 맞게 사용할 수 있다.

### 🎨 Border-radius

**• CSS: Border-radius 활용**

```css
.box-1 { border-radius: 8px; }                       /* 네 모서리 동일 */
.box-2 { border-radius: 8px 16px 8px 16px; }          /* 좌상→우상→우하→좌하 순서로 4개 값 */
.box-3 { border-radius: 8px 16px; }                   /* 대각선끼리 같은 값(좌상·우하 / 우상·좌하) */
.circle { width: 100px; height: 100px; border-radius: 50%; }  /* 정사각형일 때 원형 */
.ellipse { border-radius: 50% / 25%; }                /* 가로반경 / 세로반경, 타원형 */
.pill { border-radius: 9999px; }                      /* 알약 모양 */
```

`border-radius`에 4개의 값을 지정하면 좌상단부터 시계 방향으로 우상단, 우하단, 좌하단 순서로 적용된다. 자주 사용하는 값은 `4px`, `8px`, `16px` 정도의 작은 둥글기와, 완전한 알약 모양을 만드는 `9999px`이다.

---

## 8. Outline

`outline`은 `border`처럼 요소 주변에 선을 그리지만, 박스 모델에 포함되지 않아 <strong>레이아웃에 영향을 주지 않는다</strong>. 주로 키보드로 포커스를 이동했을 때 어떤 요소가 선택되었는지 보여주는 접근성 용도로 쓰인다.

**• CSS: Outline과 Offset**

```css
.box {
  outline: 2px solid dodgerblue;
  outline-offset: 4px; /* border와 outline 사이 거리 */
}
```

**▶ Border와 Outline 비교**

<table class="wda-mtable">
<thead><tr><th>구분</th><th>Border</th><th>Outline</th></tr></thead>
<tbody>
<tr><td>레이아웃 영향</td><td>있음 (박스 크기에 포함)</td><td>없음 (박스 크기 밖에 그려짐)</td></tr>
<tr><td>표시 위치</td><td>Padding 바깥</td><td>Border 바깥</td></tr>
<tr><td>개별 방향 지정</td><td>가능 (top/right/bottom/left)</td><td>불가능 (4방향 항상 동일)</td></tr>
<tr><td>border-radius 적용</td><td>적용됨</td><td>기본적으로 적용 안 됨</td></tr>
<tr><td>offset 개념</td><td>없음</td><td><code>outline-offset</code>으로 간격 조절 가능</td></tr>
<tr><td>주요 용도</td><td>일반적인 테두리 디자인</td><td>포커스 표시 등 접근성</td></tr>
</tbody>
</table>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>디자인이 마음에 안 든다고 <code>outline: none</code>으로 무조건 없애버리면 키보드 사용자가 지금 어떤 요소에 포커스가 있는지 전혀 알 수 없게 된다. 없앨 경우 반드시 <code>border</code>나 <code>box-shadow</code> 같은 대체 스타일로 포커스 표시를 남겨야 한다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>박스 모델은 안쪽부터 <strong>Content → Padding → Border → Margin</strong> 순서로 구성된다.</li>
    <li><strong>content-box</strong>는 width가 내용만, <strong>border-box</strong>는 width가 박스 전체 크기를 의미한다.</li>
    <li>실무에서는 <code>* { box-sizing: border-box; }</code>를 전역으로 설정하는 것이 일반적이다.</li>
    <li>Margin Collapse는 <strong>세로 방향</strong>에서만 발생하며, 더 큰 값 하나만 적용된다.</li>
    <li><strong>Outline</strong>은 border와 달리 레이아웃 크기에 영향을 주지 않는다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: margin-bottom 30px와 margin-top 20px가 만나면 간격은 50px이다?</div>
    <div class="wda-mistake-right">정답: Margin Collapse로 인해 <strong>더 큰 값인 30px</strong>만 적용된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: padding에도 margin처럼 음수 값을 줄 수 있다?</div>
    <div class="wda-mistake-right">정답: <strong>padding은 음수를 허용하지 않으며</strong>, 음수는 margin에서만 가능하다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: border와 outline은 같은 위치에 그려지는 비슷한 속성이다?</div>
    <div class="wda-mistake-right">정답: border는 <strong>박스 크기에 포함</strong>되지만, outline은 <strong>레이아웃에 영향 없이</strong> border 바깥에 별도로 그려진다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 구조</div>
    <div class="wda-formula-block-body"><code>Content → Padding → Border → Margin</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · border-box</div>
    <div class="wda-formula-block-body"><code>width = 전체 박스 크기</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · Margin Collapse</div>
    <div class="wda-formula-block-body"><code>세로 margin 두 값 중 더 큰 값만</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">박스 모델 4가지 영역의 순서는?</div>
    <div class="wda-flip-back">Content → Padding → Border → Margin이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">width:200px, padding:20px, border:10px가 content-box일 때 전체 너비는?</div>
    <div class="wda-flip-back">200 + 20*2 + 10*2 = 260px이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">box-sizing: border-box의 장점은?</div>
    <div class="wda-flip-back">width/height 값이 padding, border를 포함한 박스 전체 크기를 의미해 계산이 쉬워진다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Margin Collapse는 어떤 경우에 발생하는가?</div>
    <div class="wda-flip-back">세로 방향 margin이 서로 만날 때 발생한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">BFC를 생성하는 방법 하나를 말하면?</div>
    <div class="wda-flip-back">overflow: hidden, display: flex/grid/flow-root, float, position: absolute/fixed 중 하나를 지정하면 된다.</div>
  </div>
</div>
