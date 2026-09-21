---
title: "4-2 행과 열로 자유롭게 배치하기"
category: "frontend"
section: "css"
date: "2026-08-01"
status: "completed"
description: "fr 단위 계산법과 repeat·minmax 함수, grid-column/row 배치, grid-template-areas까지 Grid 배치 문법을 심화합니다."
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
  • <strong>grid-template-columns/rows 마스터</strong> — px, %, fr 단위로 열과 행의 크기를 정확히 정의합니다<br>
  • <strong>fr 단위 완전 이해</strong> — fractional unit의 비율 계산 원리를 익히고, px와 혼합해 실무 레이아웃을 구성합니다<br>
  • <strong>repeat() · minmax() 함수 활용</strong> — 반복되는 열 정의를 효율화하고, 최소~최대 크기 조건으로 반응형을 설계합니다<br>
  • <strong>grid-column/row로 아이템 배치</strong> — 시작·끝 라인 지정이나 span으로 여러 칸을 합칩니다<br>
  • <strong>grid-template-areas로 직관적 설계</strong> — 영역 이름을 지정해 복잡한 레이아웃을 문자열 기반으로 설계합니다
</div>

---

## 1. 복습 — 기본 Grid 컨테이너

[이전 문서](/css/css/4-1-grid-structure)에서 Grid의 기본 개념과 Container·Item 구분을 익혔다면, 이 문서에서는 그 위에서 행과 열을 실제로 어떻게 자유자재로 배치하는지를 다룬다.

단위 계산, <code>repeat()</code>/<code>minmax()</code> 함수, <code>span</code>을 이용한 칸 병합, 그리고 <code>grid-template-areas</code>까지 Grid 배치 문법의 핵심을 모두 정리한다.

**• CSS: 기본 Grid 컨테이너 복습**

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}
```

열은 3개로 명시했지만 행은 따로 지정하지 않았다. 아이템이 늘어나면 필요한 만큼 행이 자동으로 생성된다.

이 문서에서는 이 기본형에서 출발해 다양한 단위, `repeat()`, `minmax()`, 행 정의, `gap` 세분화, `span`을 이용한 아이템 배치까지 확장한다.

---

## 2. grid-template-columns — 단위별 특징

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">px 고정</div><div class="wda-fcard-dsc">항상 같은 너비를 유지한다. 화면 크기가 바뀌어도 반응하지 않는다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">% 백분율</div><div class="wda-fcard-dsc">컨테이너 전체 폭 기준 비율이다. gap까지 포함해 100%를 맞추려면 계산이 번거롭다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">fr 분수 단위</div><div class="wda-fcard-dsc">fractional unit. gap을 먼저 뺀 뒤 남은 영역을 자동으로 분배한다. 실무 기본 단위로 가장 많이 쓰인다.</div></div>
</div>

---

## 3. fr 단위 계산 원리

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">fr 핵심 공식</div>
    <div class="wda-formula-block-body"><code>남은 공간 = 전체 폭 − gap 총합</code><br><code>1fr = 남은 공간 ÷ 총 fr 합</code></div>
  </div>
</div>

**1fr 1fr 1fr — 균등 분배**

컨테이너 폭 1000px, `gap: 16px`, 열 3개라면 gap은 사이사이 2개(16px × 2 = 32px)가 들어간다.

**• 균등 분배 fr 계산**

```text
남은 공간 = 1000px − 32px = 968px
1fr = 968px ÷ 3 ≒ 322.67px
```

**1fr 2fr — 1:2 비율**

컨테이너 폭 1000px, 열 2개라면 gap은 1개(16px)만 들어간다.

**• 1:2 비율 fr 계산**

```text
남은 공간 = 1000px − 16px = 984px
총 fr = 1 + 2 = 3
1fr ≒ 328px, 2fr ≒ 656px
```

**1fr 2fr 3fr — 1:2:3 비율**

같은 컨테이너 폭 968px(위 균등 분배 예시의 남은 공간 재사용)을 3개 열에 1:2:3 비율로 나눈다.

**• 1:2:3 비율 fr 계산**

```text
총 fr = 1 + 2 + 3 = 6
1fr ≒ 161.33px, 2fr ≒ 322.67px, 3fr ≒ 484px
```

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p><strong>fr 단위의 자동 계산 장점</strong>은 세 가지다. gap을 자동으로 먼저 제외하고, 비율을 정확하게 분배하며, <code>calc()</code>를 직접 쓸 필요가 없다. 실전에서는 <code>1fr 1fr 1fr</code>(균등), <code>1fr 2fr</code>(사이드바보다 넓은 메인), <code>2fr 1fr</code>(메인이 사이드바보다 넓은 구조)의 조합이 가장 흔하다.</p>
</div>

---

## 4. px + fr 혼합 계산

고정 폭이 필요한 영역은 `px`로 먼저 잡고, 나머지 가변 영역만 `fr`로 나누는 방식이 실무에서 표준처럼 쓰인다.

**250px 1fr 1fr — 사이드바 + 메인 2분할**

**• 사이드바+메인 2분할 계산**

```text
컨테이너 1000px, gap 16px × 2개 = 32px
남은 공간 = 1000px − 250px − 32px = 718px
1fr = 718px ÷ 2 = 359px
```

**200px 1fr 2fr — 고정 + 1:2 비율**

**• 고정+1:2 비율 계산**

```text
컨테이너 1000px, gap 16px × 2개 = 32px
남은 공간 = 1000px − 200px − 32px = 768px
총 fr = 1 + 2 = 3
1fr = 256px, 2fr = 512px
```

**💡 설명**

<div class="wda-callout wda-ci">
  <p><strong>핵심 원리</strong>는 항상 같다. 먼저 고정 <code>px</code> 값을 빼고, 다음으로 <code>gap</code>을 빼고, 마지막으로 남은 공간을 <code>fr</code> 합계로 나눈다.</p>
</div>

**▶ 열 크기 패턴**

<table class="wda-mtable">
<thead><tr><th>패턴</th><th>용도</th></tr></thead>
<tbody>
<tr><td><code>250px 1fr</code></td><td>사이드바 고정 + 메인 가변, 가장 흔한 2분할 레이아웃</td></tr>
<tr><td><code>60px 1fr 60px</code></td><td>좌우 고정 여백 + 중앙 콘텐츠</td></tr>
<tr><td><code>200px 2fr 1fr</code></td><td>고정 사이드바 + 메인(2) + 서브(1) 3분할</td></tr>
</tbody>
</table>

---

## 5. repeat() 함수 — 반복 정의 줄이기

같은 크기의 열을 여러 개 반복해서 적어야 할 때, 하나씩 나열하면 타이핑이 늘어나고 열 개수를 바꿀 때마다 일일이 고쳐야 해서 가독성도 떨어진다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Before — 반복 작성</div>

**• CSS: repeat() 적용 전**

```css
grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
```
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">After — repeat() 사용</div>

**• CSS: repeat() 적용 후**

```css
grid-template-columns: repeat(5, 1fr);
```
  </div>
</div>

`repeat()`는 열 개수를 바꾸고 싶을 때 숫자 하나만 고치면 되고, 코드도 한눈에 읽힌다.

**• CSS: repeat() 활용 패턴**

```css
/* 3개 균등 */
grid-template-columns: repeat(3, 1fr);

/* 4개 고정 크기 */
grid-template-columns: repeat(4, 100px);

/* 5개 패턴을 여러 번 반복 */
grid-template-columns: repeat(2, 1fr 2fr);

/* 혼합 패턴 - 반복 앞뒤로 고정 열 추가 */
grid-template-columns: 200px repeat(3, 1fr) 100px;
```

---

## 6. minmax() 함수 — 최소·최대 크기 제한

`minmax(최소값, 최대값)`은 셀 크기가 특정 범위 안에서만 움직이도록 제한한다.

**• CSS: minmax()로 크기 제한**

```css
/* 카드 3개 - 최소 200px, 남는 공간은 균등 분배 */
.card-grid {
  grid-template-columns: repeat(3, minmax(200px, 1fr));
}

/* 열 하나는 100px~300px 사이, 나머지는 1fr */
grid-template-columns: minmax(100px, 300px) 1fr;
```

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>실전에서 가장 많이 쓰이는 패턴은 반응형 카드 레이아웃의 <code>repeat(auto-fit, minmax(200px, 1fr))</code>다. 화면이 좁아지면 각 카드는 최소 200px 밑으로 줄어들지 않고, 대신 열의 개수가 자동으로 줄어든다. 사이드바처럼 너비 범위를 제한하고 싶은 영역에도 <code>minmax()</code>를 그대로 적용할 수 있다.</p>
</div>

---

## 7. grid-template-rows — 행 높이 정의

**▶ grid-template-rows 값별 특징**

<table class="wda-mtable">
<thead><tr><th>값</th><th>특징</th></tr></thead>
<tbody>
<tr><td><code>auto</code></td><td>콘텐츠 높이만큼 자동 결정. 생략하는 경우가 가장 많고 실무에서 약 90% 비중으로 쓰인다.</td></tr>
<tr><td><code>px</code></td><td>헤더·푸터처럼 높이가 고정돼야 하는 레이아웃에 사용 (예: <code>80px auto 60px</code>)</td></tr>
<tr><td><code>fr</code></td><td>행을 비율로 나눈다. 단, 컨테이너에 <strong>명시적인 height가 있어야</strong> fr이 의미를 가진다.</td></tr>
</tbody>
</table>

**• CSS: 행 높이 지정**

```css
/* 헤더 고정, 본문 가변, 푸터 고정 */
grid-template-rows: 80px auto 60px;

/* 행을 fr 비율로 나누려면 컨테이너 높이가 필요 */
.container {
  height: 600px;
  grid-template-rows: 1fr 2fr 1fr;
}
```

---

## 8. gap 세분화 패턴

**• CSS: gap 세분화 패턴**

```css
/* 패턴 1 - 통합, 가장 많이 쓰는 형태 */
.grid-a { gap: 16px; }

/* 패턴 2 - 행 간격과 열 간격을 다르게 (카드 그리드) */
.grid-b { gap: 24px 16px; }

/* 패턴 3 - 리스트처럼 행 방향 간격만 필요할 때 */
.grid-c {
  row-gap: 12px;
  column-gap: 0;
}
```

**💡 설명**

<div class="wda-callout wda-ci">
  <p>카드형 UI처럼 행·열 간격을 다르게 주고 싶다면 <code>gap: 행값 열값</code> 형태를, 세로로만 나열되는 리스트라면 <code>row-gap</code>만 지정하고 <code>column-gap</code>은 0으로 두는 패턴이 실전에서 자주 쓰인다.</p>
</div>

---

## 9. grid-column — 열 방향 배치

시작 라인과 끝 라인을 `/`로 구분해서 지정한다. `1 / 3`은 1번 라인부터 3번 라인까지, 즉 2칸을 차지한다는 뜻이다.

**• CSS: grid-column 라인 번호 배치**

```css
.container { grid-template-columns: repeat(3, 1fr); }

.header  { grid-column: 1 / 4; }  /* 3열 전체 */
.sidebar { grid-column: 1 / 2; }  /* 1칸 */
.main    { grid-column: 2 / 4; }  /* 2칸 */
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>라인 번호는 1부터 시작한다.</strong> 3열 그리드라면 라인은 1, 2, 3, 4까지 총 4개가 생긴다. "3열이니까 끝 라인도 3번"이라고 착각하기 쉬운 부분이다.</p>
</div>

---

## 10. grid-column: span — 칸 합치기

`span N`은 "현재 위치에서 오른쪽으로 N칸을 차지한다"는 뜻이다. 시작 라인은 자동 배치에 맡기고 칸 수만 지정하고 싶을 때 편리하다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Before — 라인 번호 방식</div>

**• CSS: span 적용 전(라인 번호)**

```css
.header { grid-column: 1 / 5; }
.item-b { grid-column: 2 / 4; }
```
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">After — span 방식</div>

**• CSS: span 적용 후**

```css
.header { grid-column: span 4; }
.item-b { grid-column: span 2; }
```
  </div>
</div>

**▶ 라인 번호 방식과 span 방식**

<table class="wda-mtable">
<thead><tr><th>방식</th><th>장점</th></tr></thead>
<tbody>
<tr><td>라인 번호(<code>1 / 5</code>)</td><td>정확한 시작·끝 위치를 명시적으로 지정</td></tr>
<tr><td><code>span</code></td><td>직관적이고 유연함. 실무에서 약 80% 비중으로 더 많이 쓰임</td></tr>
</tbody>
</table>

---

## 11. grid-row — 행 방향 배치

`grid-column`과 동일한 문법을 행에 적용한다.

**• CSS: grid-row 배치**

```css
.container {
  grid-template-columns: 250px 1fr;
  grid-template-rows: 80px 1fr 60px;
}

.sidebar { grid-row: 1 / 3; }       /* 헤더 높이 + 메인 높이를 모두 차지 */
.sidebar { grid-row: span 2; }      /* 위와 동일한 의미 */
```

사이드바가 헤더 옆에서부터 메인 영역까지 세로로 길게 이어지는 구조에서, `grid-row: span 2`로 헤더와 메인의 행을 한 번에 차지하게 만들 수 있다.

---

## 12. grid-area — 위치 지정 단일 속성

`grid-column`과 `grid-row`를 한 번에 지정하는 단축 속성이다. 값 순서는 `row-start / column-start / row-end / column-end`다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Before — 분리 작성</div>

**• CSS: grid-area 적용 전(분리 작성)**

```css
.card {
  grid-row: 1 / 3;
  grid-column: 2 / 4;
}
```
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">After — grid-area 통합</div>

**• CSS: grid-area 통합**

```css
.card {
  grid-area: 1 / 2 / 3 / 4;
}
```
  </div>
</div>

`span`과 함께 쓸 수도 있다.

**• CSS: grid-area와 span 함께 쓰기**

```css
.card {
  grid-area: 1 / 2 / span 2 / span 2;
}
```

**💡 설명**

<div class="wda-callout wda-ci">
  <p>실무에서는 값 4개를 순서대로 외워야 하는 <code>grid-area</code> 단일 지정보다, 읽기 쉬운 <code>grid-column</code>/<code>grid-row</code> 분리 작성이 약 80% 비중으로 더 많이 쓰인다. <code>grid-area</code>는 뒤에서 다룰 <code>grid-template-areas</code>와 짝을 이룰 때 진짜 진가를 발휘한다.</p>
</div>

---

## 13. grid-template-areas — 영역 이름으로 설계하기

라인 번호 방식은 구조가 복잡해질수록 숫자만 보고 전체 배치를 떠올리기 어려워진다. `grid-template-areas`는 레이아웃을 문자열로 그림처럼 표현할 수 있게 해준다.

**• CSS: grid-template-areas 기본 문법**

```css
.layout {
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  grid-template-areas:
    "header header header"
    "sidebar main   main"
    "footer footer footer";
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

<div class="wda-check-note">
  <ul>
    <li>레이아웃을 문자열로 <strong>시각화</strong>해서 작성한다.</li>
    <li>빈 칸은 점(<code>.</code>)으로 표시한다.</li>
    <li>같은 이름은 반드시 <strong>직사각형 형태</strong>를 이뤄야 한다. L자 모양처럼 이어지지 않는 배치는 오류가 난다.</li>
    <li>Container에 <code>grid-template-areas</code>로 틀을 정의하고, 각 Item에는 <code>grid-area</code>로 이름만 지정하면 된다.</li>
  </ul>
</div>

**• CSS: grid-template-areas 오류·정상 비교**

```css
/* 잘못된 예시 - L자 모양은 허용되지 않는다 */
grid-template-areas:
  "a a b"
  "a c c";  /* a 영역이 직사각형이 아니라서 오류 */

/* 올바른 예시 - 항상 직사각형을 유지해야 한다 */
grid-template-areas:
  "a a b"
  "a a b";
```

---

## 14. grid-template-areas 실전 — 페이지 전체 레이아웃

**• HTML 구조**

```html
<div class="page">
  <header class="header">헤더</header>
  <nav class="sidebar">내비게이션</nav>
  <main class="main">메인 콘텐츠</main>
  <footer class="footer">푸터</footer>
</div>
```

**• CSS 스타일**

```css
.page {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: 70px 1fr 50px;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  min-height: 100vh;
  gap: 16px;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

---

## 15. 핵심 개념 총정리

**▶ Grid 핵심 개념 총정리**

<table class="wda-mtable">
<thead><tr><th>개념</th><th>핵심 내용</th></tr></thead>
<tbody>
<tr><td>Grid 컨테이너 기본</td><td><code>display: grid</code> + <code>grid-template-columns</code> + <code>gap</code></td></tr>
<tr><td>열 크기 단위</td><td><code>px</code>(고정), <code>%</code>(비율), <code>fr</code>(남은 공간 비율)</td></tr>
<tr><td>fr 계산 원리</td><td>전체 폭에서 gap을 뺀 뒤 총 fr 합으로 나눔</td></tr>
<tr><td>px + fr 혼합</td><td>고정값 → gap → 남은 공간을 fr 합으로 순서대로 계산</td></tr>
<tr><td>repeat() / minmax()</td><td>반복 정의 축소 / 최소·최대 범위 제한</td></tr>
<tr><td>grid-template-rows</td><td>생략 시 auto로 자동 생성, fr을 쓰려면 컨테이너 높이 필요</td></tr>
<tr><td>gap 세분화</td><td><code>gap</code> 단축, <code>gap: 행 열</code>, <code>row-gap</code>/<code>column-gap</code></td></tr>
<tr><td>grid-column/row/span</td><td>라인 번호 지정 또는 <code>span N</code>으로 칸 합치기</td></tr>
<tr><td>grid-area</td><td><code>row-start/col-start/row-end/col-end</code> 순서의 단일 지정</td></tr>
<tr><td>grid-template-areas</td><td>문자열로 레이아웃을 시각화, 빈 칸은 점(<code>.</code>)</td></tr>
</tbody>
</table>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><code>fr</code>은 <strong>gap을 뺀 남은 공간</strong>을 비율로 나누는 단위다.</li>
    <li>고정+가변 혼합 계산 순서는 <strong>px → gap → fr</strong>이다.</li>
    <li><code>repeat(auto-fit, minmax(최소, 1fr))</code>은 반응형 카드 레이아웃의 대표 공식이다.</li>
    <li><code>grid-template-areas</code>에서 빈 칸은 점(<code>.</code>), 같은 이름은 반드시 직사각형이어야 한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: fr은 단순히 남은 공간을 대충 나누는 단위다?</div>
    <div class="wda-mistake-right">정답: fr은 <strong>gap을 자동으로 계산에서 제외</strong>한 뒤 정확한 비율로 분배하는 단위다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: grid-template-rows에 fr을 쓰면 항상 비율대로 나뉜다?</div>
    <div class="wda-mistake-right">정답: 행에서 fr이 동작하려면 컨테이너에 <strong>명시적인 height</strong>가 있어야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: grid-template-areas는 아무 모양이나 자유롭게 그릴 수 있다?</div>
    <div class="wda-mistake-right">정답: 같은 이름 영역은 반드시 <strong>직사각형</strong>을 이뤄야 하며, L자 모양은 오류가 난다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · fr 계산</div>
    <div class="wda-formula-block-body"><code>1fr = (전체 − gap) ÷ 총 fr</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 반응형 카드</div>
    <div class="wda-formula-block-body"><code>repeat(auto-fit, minmax(최소, 1fr))</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · areas 규칙</div>
    <div class="wda-formula-block-body"><code>빈칸 = . · 같은 이름 = 직사각형</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">fr 단위를 정확히 설명하면?</div>
    <div class="wda-flip-back">gap을 자동으로 계산에서 제외하고 남은 공간을 비율로 나누는 단위다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front"><code>grid-column: span 2</code>의 의미는?</div>
    <div class="wda-flip-back">현재 위치에서 오른쪽으로 2칸을 차지한다는 뜻이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">grid-template-areas에서 빈 칸을 표현하는 방법은?</div>
    <div class="wda-flip-back">점(<code>.</code>)으로 표시한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front"><code>grid-template-columns: 250px 1fr 1fr; gap: 16px;</code>의 결과는?</div>
    <div class="wda-flip-back">첫 번째 열은 250px 고정, 나머지 두 열은 남은 공간을 균등하게 나눠 갖는다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">grid-area 단축 속성의 값 순서는?</div>
    <div class="wda-flip-back"><code>row-start / column-start / row-end / column-end</code> 순서다.</div>
  </div>
</div>
