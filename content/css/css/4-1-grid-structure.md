---
title: "4-1 Grid 구조 이해하기"
category: "frontend"
section: "css"
date: "2026-08-01"
status: "completed"
description: "Flexbox의 1차원 한계를 확인하고, Grid의 행·열·셀 개념과 Container·Item의 역할 구분을 정리합니다."
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
  • <strong>Flexbox의 한계 이해</strong> — 1차원 레이아웃인 Flexbox가 복잡한 격자 구조 앞에서 왜 무너지는지 확인합니다<br>
  • <strong>Grid 기본 개념 마스터</strong> — 행(Row), 열(Column), 셀(Cell), 격자(Grid) 개념을 명확히 익힙니다<br>
  • <strong>Container와 Item 관계 파악</strong> — Grid Container(부모)와 Grid Item(자식)의 역할 차이를 구분합니다<br>
  • <strong>Flexbox vs Grid 비교</strong> — 1차원과 2차원 레이아웃의 차이를 이해하고 상황에 맞게 선택합니다
</div>

---

## 1. Flexbox의 한계 — 왜 Grid가 필요한가

지금까지는 Flexbox로 한 줄 또는 한 방향으로 흐르는 레이아웃을 다뤘다. 이 문서부터는 CSS Grid로 넘어가, 행과 열을 동시에 다루는 2차원 레이아웃의 기초를 세운다.

구체적인 배치 함수(<code>repeat()</code>, <code>minmax()</code> 등)는 다음 문서에서 다루고, 이번에는 Grid가 왜 필요한지와 Container·Item의 기본 개념에 집중한다.

카드 4개를 아래처럼 배치하고 싶다고 가정해보자. A는 큰 카드, B와 C는 같은 줄에 나란히, D는 A 옆에 붙어야 한다.

**• 목표 레이아웃 스케치**

```text
┌──────────────┬───────┐
│      A       │   B   │
│  (66.666%)   │(33.3%)│
├───────┬──────┴───────┤
│   C   │       D       │
│(33.3%)│   (66.666%)   │
└───────┴───────────────┘
```

Flexbox로 이 구조를 구현하면 예상과 다른 결과가 나온다.

**• CSS: Flexbox로 시도(문제 발생)**

```css
.container {
  display: flex;
  flex-wrap: wrap;
}
.item-a { width: 66.666%; }
.item-b { width: 33.333%; }
.item-c { width: 33.333%; }
.item-d { width: 66.666%; }
```

A(66.666%) + B(33.333%)까지는 한 줄(100%)을 채우고 줄바꿈된다. 이어서 C(33.333%)가 새 줄에서 시작하고, 폭 숫자의 합이 우연히 100%를 넘지 않기 때문에 D(66.666%)도 같은 줄에 붙어 얼핏 원하는 격자 모양이 그대로 나오기도 한다.

문제는 이 결과가 "2번째 줄, 2번째 칸에 배치하라"는 규칙을 Flexbox가 이해해서 만든 게 아니라, 폭 퍼센트의 합이 우연히 100%를 넘지 않았기 때문에 생기는 우연의 결과라는 점이다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>왜 위험할까?</strong> Flexbox는 태생적으로 <strong>1차원</strong> 레이아웃 도구다. <code>flex-wrap</code>은 "한 줄에 다 안 들어가면 다음 줄로 넘긴다"는 줄바꿈만 제어할 뿐, "이 요소는 2번째 줄, 3번째 칸에 배치한다"는 <strong>행(row) 개념 자체가 없다.</strong> 그래서 실무에서 흔히 함께 쓰는 <code>gap: 16px</code> 하나만 추가해도 폭 합계가 깨지면서 의도한 배치가 무너진다. 폭 값을 우연히 잘 맞췄다고 해서 이것이 신뢰할 수 있는 격자 배치 방법이 되는 것은 아니다.</p>
</div>

같은 레이아웃을 Grid로 바꾸면 간단하게 해결된다.

**• CSS: Grid로 해결**

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.item-a { grid-column: 1 / 3; }
.item-b { grid-column: 3 / 4; }
.item-c { grid-column: 1 / 2; }
.item-d { grid-column: 2 / 4; }
```

행과 열을 동시에 제어할 수 있기 때문에 원하는 칸에 정확히 위치를 지정할 수 있고, `calc()`로 퍼센트를 일일이 계산할 필요도 없다. 신문 레이아웃, 대시보드, 이미지 갤러리, 폼 레이아웃처럼 격자가 복잡해질수록 Grid의 강점이 두드러진다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">신문 레이아웃</div><div class="wda-fcard-dsc">헤더, 사이드바, 본문, 광고 영역이 동시에 격자를 이룬다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">대시보드</div><div class="wda-fcard-dsc">통계 카드, 차트, 활동 로그가 서로 다른 크기로 격자를 채운다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">이미지 갤러리</div><div class="wda-fcard-dsc">동일한 크기의 셀이 반복되는 격자형 배치다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">폼 레이아웃</div><div class="wda-fcard-dsc">라벨과 입력창이 열을 맞춰 정렬돼야 한다.</div></div>
</div>

**▶ Flexbox와 Grid 비교**

<table class="wda-mtable">
<thead><tr><th>구분</th><th>Flexbox</th><th>Grid</th></tr></thead>
<tbody>
<tr><td>레이아웃 차원</td><td>1차원 (행 또는 열 중 하나)</td><td>2차원 (행과 열 동시)</td></tr>
<tr><td>배치 방식</td><td>단순 나열</td><td>복잡한 격자 배치</td></tr>
<tr><td><code>wrap</code> 특징</td><td>줄만 바뀔 뿐 위치는 지정 못 함</td><td>행·열 위치를 직접 지정 가능</td></tr>
<tr><td>적합한 상황</td><td>반응형 메뉴바, 버튼 그룹</td><td>페이지 전체 레이아웃 설계</td></tr>
</tbody>
</table>

---

## 2. Grid의 기본 개념 — 행, 열, 셀, 그리드 라인

Grid를 이해하는 가장 쉬운 방법은 엑셀 스프레드시트를 떠올리는 것이다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">행 (Row)</div><div class="wda-fcard-dsc">가로 방향으로 이어지는 줄이다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">열 (Column)</div><div class="wda-fcard-dsc">세로 방향으로 이어지는 줄이다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">셀 (Cell)</div><div class="wda-fcard-dsc">행과 열이 교차해서 만들어지는 하나의 칸이다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">격자 (Grid)</div><div class="wda-fcard-dsc">행과 열 전체가 모여 이루는 구조 전체를 가리킨다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">그리드 라인 (Grid Line)</div><div class="wda-fcard-dsc">셀과 셀을 구분하는 경계선이며, 1번부터 순서대로 번호가 매겨진다.</div></div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  <p>엑셀에서 셀 하나하나가 행 번호와 열 번호로 특정되듯, Grid도 그리드 라인 번호를 기준으로 "이 요소는 1번 라인부터 3번 라인까지 차지한다"는 식으로 위치를 지정한다.</p>
</div>

Grid의 가장 기본적인 문법은 다음과 같다.

**• CSS: Grid 기본 문법**

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto auto;
  gap: 16px;
}
```

**▶ Grid 크기 단위**

<table class="wda-mtable">
<thead><tr><th>단위</th><th>설명</th></tr></thead>
<tbody>
<tr><td><code>px</code></td><td>고정 크기. 화면 크기와 무관하게 항상 같은 값이다.</td></tr>
<tr><td><code>%</code></td><td>부모(컨테이너) 기준 백분율이다.</td></tr>
<tr><td><code>fr</code></td><td>Grid 전용 분수 단위(fractional unit). 남은 공간을 비율로 나눈다.</td></tr>
<tr><td><code>auto</code></td><td>콘텐츠 크기에 맞춰 자동으로 결정된다.</td></tr>
</tbody>
</table>

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p><strong>fr 단위가 실무에서 가장 많이 쓰이는 이유</strong>는 남은 공간을 자동으로 계산해서 비율로 나눠주기 때문이다. <code>1fr 1fr 1fr</code>은 균등 3등분이고, <code>2fr 1fr 1fr</code>은 2:1:1 비율로 나뉜다. <code>gap</code>이 있어도 fr이 알아서 남은 공간만 계산하기 때문에 반응형 레이아웃에 특히 적합하다.</p>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  <p><code>grid-template-rows</code>를 생략하면 행이 사라지는 것이 아니라, 콘텐츠 높이만큼 <strong>자동으로 행이 생성</strong>된다. 실무에서는 열은 명시하고 행은 생략하는 경우가 많다.</p>
</div>

---

## 3. Grid Container 속성 상세

`grid-template-columns`와 `grid-template-rows`는 다양한 값을 조합해서 쓸 수 있다.

**• CSS: 컬럼·행 크기 조합**

```css
/* fr 조합 */
grid-template-columns: 1fr 1fr 1fr;

/* 고정 크기 조합 */
grid-template-columns: 200px 200px 200px;

/* 혼합 - 사이드바 고정 + 메인 가변 */
grid-template-columns: 250px 1fr;

/* 헤더/콘텐츠/푸터 - 행 방향 혼합 */
grid-template-rows: 60px auto 40px;
```

실무에서는 사이드바처럼 폭이 고정되어야 하는 영역은 `px`로, 메인 콘텐츠처럼 남은 공간을 채워야 하는 영역은 `fr`로 지정하는 조합이 가장 많이 쓰인다.

**▶ 단위별 특징(사이드바·메인 조합)**

<table class="wda-mtable">
<thead><tr><th>단위</th><th>특징</th></tr></thead>
<tbody>
<tr><td><code>px</code></td><td>고정 크기가 필요한 사이드바, 아이콘 영역에 사용</td></tr>
<tr><td><code>%</code></td><td>백분율 기반, gap 포함 시 계산이 번거로움</td></tr>
<tr><td><code>fr</code></td><td>가변 영역에 권장되는 기본 단위</td></tr>
</tbody>
</table>

---

## 4. 간격 설정 — gap

Grid는 아이템 사이 간격을 `gap`으로 관리한다. 여백을 위해 `margin`을 따로 계산할 필요가 없다.

**▶ gap 작성 방법**

<table class="wda-mtable">
<thead><tr><th>작성 방법</th><th>의미</th></tr></thead>
<tbody>
<tr><td><code>gap: 16px;</code></td><td>행·열 간격을 한 번에 동일하게 지정 (단축형)</td></tr>
<tr><td><code>gap: 20px 16px;</code></td><td>행 간격 20px, 열 간격 16px을 한 줄에 지정</td></tr>
<tr><td><code>row-gap</code> / <code>column-gap</code></td><td>행 간격과 열 간격을 각각 개별 지정</td></tr>
</tbody>
</table>

**• CSS: gap 통합·개별 지정**

```css
/* 카드 그리드 - 통합 지정 */
.card-grid { gap: 24px; }

/* 폼 레이아웃 - 행 간격 좁게, 열 간격 넓게 */
.form-grid { gap: 8px 16px; }
```

**▶ gap 단위별 사용 예**

<table class="wda-mtable">
<thead><tr><th>단위</th><th>사용 예</th></tr></thead>
<tbody>
<tr><td><code>px</code></td><td>가장 흔한 고정 간격 지정</td></tr>
<tr><td><code>em</code> / <code>rem</code></td><td>폰트 크기에 비례하는 간격</td></tr>
<tr><td><code>%</code></td><td>컨테이너 크기에 비례하는 간격</td></tr>
<tr><td><code>0</code></td><td>간격 없이 셀을 완전히 붙임</td></tr>
</tbody>
</table>

---

## 5. Container 정렬 속성 — justify-items, align-items

Container에 지정하면 그 안의 모든 Item에 한 번에 적용되는 정렬 속성이다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">justify-items</div>
    셀 안에서 아이템을 <strong>가로(inline축)</strong>로 정렬한다. 기본값은 <code>stretch</code>이며 <code>start</code>, <code>end</code>, <code>center</code>도 사용할 수 있다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">align-items</div>
    셀 안에서 아이템을 <strong>세로(block축)</strong>로 정렬한다. 기본값은 <code>stretch</code>이며, <code>center</code> 등으로 바꾸려면 셀에 확인 가능한 높이가 있어야 눈에 띈다.
  </div>
</div>

**• CSS: Container 정렬 속성**

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
}
```

---

## 6. Grid Item 속성 정리

Item에는 위치를 직접 지정하는 속성과, 셀 안에서 개별 정렬을 지정하는 속성이 있다.

`grid-column`과 `grid-row`는 시작 라인과 끝 라인을 `/`로 구분해서 적는 단축 속성이다. 개별로 쓰려면 `grid-column-start` / `grid-column-end`, `grid-row-start` / `grid-row-end`로 나눌 수 있다.

**• CSS: grid-column으로 위치 지정**

```css
.container { grid-template-columns: 1fr 1fr 1fr; }

.item-a { grid-column: 1 / 3; }  /* 1번 라인 ~ 3번 라인, 2칸 차지 */
.item-b { grid-column: 3 / 4; }  /* 3번 라인 ~ 4번 라인, 1칸 차지 */
.item-d { grid-column: 2 / 4; }  /* 2번 라인 ~ 4번 라인, 2칸 차지 */
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>그리드 라인 번호는 <strong>0이 아니라 1부터 시작</strong>한다. 3열 그리드라면 라인은 1, 2, 3, 4번까지 4개가 생긴다는 점을 기억해야 한다.</p>
</div>

개별 아이템의 정렬은 `justify-self`(가로), `align-self`(세로)로 지정하며, 두 값을 한 번에 쓰는 단축 속성이 `place-self`다.

**• CSS: place-self로 개별 정렬**

```css
.item-special {
  justify-self: end;
  align-self: center;

  /* 위 두 줄과 동일 - 순서는 align → justify */
  place-self: center end;
}
```

---

## 7. 자동 배치 동작과 실전 팁

`grid-column`, `grid-row`를 지정하지 않은 Item은 순서대로 자동 배치된다.

1행 1열, 1행 2열, 1행 3열... 처럼 왼쪽에서 오른쪽, 위에서 아래로 채워진다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>Grid Item으로 인정되는 건 <strong>Container의 직계 자식(direct child)</strong>뿐이다. 아래처럼 <code>span</code>이 <code>div</code> 안에 한 번 더 감싸져 있다면 이 <code>span</code>은 Grid Item이 아니라 부모 <code>div</code> 안의 일반 인라인 요소일 뿐이다.</p>
</div>

**• HTML: Grid Item으로 인정되지 않는 구조**

```html
<div class="container">
  <div class="item">
    <span>나는 Grid Item이 아니다</span>
  </div>
</div>
```

<div class="wda-check-note">
  <ul>
    <li>대부분의 경우 <strong>자동 배치</strong>만으로 충분하다.</li>
    <li>특정 요소만 위치를 조정하고 싶을 때만 <code>grid-column</code> / <code>grid-row</code>를 사용한다.</li>
    <li><code>justify-self</code> / <code>align-self</code>는 실무에서 거의 쓰이지 않는다.</li>
    <li>전체 정렬은 Container의 <code>justify-items</code> / <code>align-items</code>로 처리하는 편이 간단하다.</li>
  </ul>
</div>

---

## 8. Container vs Item — 역할 정리

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Container 속성 — 전체 제어</div>
    격자 구조 정의, 간격 설정, 전체 아이템 정렬을 담당한다.

**• CSS: Container 속성 예시**

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  justify-items: center;
}
```
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Item 속성 — 개별 제어</div>
    특정 아이템의 위치 지정, 개별 정렬을 담당한다.

**• CSS: Item 속성 예시**

```css
.item {
  grid-column: 1 / 3;
  justify-self: end;
}
```
  </div>
</div>

**▶ Container와 Item 역할**

<table class="wda-mtable">
<thead><tr><th>구분</th><th>관리 범위</th><th>필수 여부</th><th>대표 속성</th></tr></thead>
<tbody>
<tr><td>Container</td><td>전체 격자 구조</td><td>필수 (<code>display: grid</code> 없이는 Grid 자체가 성립 안 됨)</td><td><code>grid-template-columns</code>, <code>gap</code></td></tr>
<tr><td>Item</td><td>개별 아이템 위치·정렬</td><td>선택 (지정 안 하면 자동 배치)</td><td><code>grid-column</code>, <code>grid-row</code></td></tr>
</tbody>
</table>

---

## 9. Flexbox와 동일한 구조 — 중첩도 가능하다

Flexbox가 FlexContainer → FlexItem 구조였듯, Grid도 GridContainer → GridItem 구조를 그대로 따른다.

그리고 하나의 Item이 다른 레이아웃의 Container가 되는 중첩도 자유롭게 가능하다.

**• HTML: 중첩 Grid 페이지 구조**

```html
<body class="page">
  <header>헤더</header>
  <aside>사이드바</aside>
  <main class="card-grid">
    <div class="card">카드 1</div>
    <div class="card">카드 2</div>
  </main>
  <footer>푸터</footer>
</body>
```

**• CSS 스타일(중첩 Grid)**

```css
.page {
  display: grid;
  grid-template-columns: 250px 1fr;
}

/* main은 .page의 Item이면서, 동시에 카드들의 Container가 된다 */
.card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
```

---

## 10. place-items — Container 정렬 단축 속성

`justify-items`와 `align-items`를 한 번에 지정하는 단축 속성이다. 값 순서는 `align → justify` 순이다.

**• CSS: place-items로 정렬 단축**

```css
.container {
  /* justify-items: center; align-items: center; 와 동일 */
  place-items: center;

  /* align-items: start; justify-items: center; 와 동일 */
  place-items: start center;
}
```

---

## 11. Flexbox vs Grid — 언제 무엇을 쓸까

**▶ Flexbox와 Grid 사용 상황 비교**

<table class="wda-mtable">
<thead><tr><th>구분</th><th>Flexbox</th><th>Grid</th></tr></thead>
<tbody>
<tr><td>레이아웃 차원</td><td>1차원</td><td>2차원</td></tr>
<tr><td>핵심 속성</td><td><code>flex-direction</code>, <code>justify-content</code></td><td><code>grid-template-columns</code>, <code>grid-template-rows</code></td></tr>
<tr><td>사용 상황</td><td>네비게이션, 버튼 그룹, 중앙 정렬, 간단한 폼</td><td>페이지 전체 레이아웃, 대시보드, 신문식 배치, 이미지 갤러리</td></tr>
<tr><td>난이도</td><td>비교적 간단</td><td>개념이 더 많아 상대적으로 복잡</td></tr>
<tr><td><code>calc()</code> 필요 여부</td><td>퍼센트 계산 시 필요한 경우 많음</td><td><code>fr</code> 단위 덕분에 거의 불필요</td></tr>
</tbody>
</table>

**💡 설명**

<div class="wda-callout wda-ci">
  <p><strong>선택 기준은 단순하다.</strong> 한 방향으로만 흐르면 Flexbox, 행과 열을 동시에 신경 써야 하면 Grid다. 실무에서는 페이지 전체는 Grid로 큰 틀을 잡고, 그 안의 버튼 그룹이나 네비게이션은 Flexbox로 처리하는 <strong>혼합 사용이 가장 흔하다.</strong></p>
</div>

**• CSS: Grid와 Flexbox 혼합 사용**

```css
/* 페이지 전체는 Grid */
.page {
  display: grid;
  grid-template-columns: 250px 1fr;
}

/* 헤더 내부 네비게이션은 Flexbox */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

---

## 12. Grid 기본 문법 미리보기 — 3열 카드 그리드

Grid를 처음 쓸 때 꼭 기억해야 할 것은 딱 3가지다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">1. display: grid</div><div class="wda-fcard-dsc">이 속성이 있어야 Grid Container가 성립한다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">2. grid-template-columns</div><div class="wda-fcard-dsc">열의 개수와 크기를 정의한다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">3. gap</div><div class="wda-fcard-dsc">아이템 사이 간격을 지정한다.</div></div>
</div>

**• HTML: 카드 그리드 구조**

```html
<div class="card-grid">
  <div class="card">카드 1</div>
  <div class="card">카드 2</div>
  <div class="card">카드 3</div>
  <div class="card">카드 4</div>
</div>
```

**• CSS: 카드 그리드 스타일**

```css
.card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}
```

`grid-template-rows`를 쓰지 않아도 카드가 4개면 자동으로 2번째 행이 생겨 4번 카드가 다음 줄로 넘어간다. 이 패턴이 실무에서 가장 많이 쓰이는 기본형이다.

여기서 더 나아가면 `fr` 단위를 더 깊이 활용하는 법, `px`와 `fr`을 섞는 법, `repeat()` / `minmax()` 함수, `grid-column` / `grid-row`의 `span` 병합, `grid-area` / `grid-template-areas`처럼 더 정교한 배치 문법으로 이어진다.

---

## 13. 실전 예제 — 2열 레이아웃(사이드바 + 메인)

**• HTML: 2열 사이드바 레이아웃 구조**

```html
<div class="layout">
  <aside class="sidebar">사이드바</aside>
  <main class="content">메인 콘텐츠</main>
</div>
```

**• CSS: 2열 사이드바 레이아웃 스타일**

```css
.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 24px;
  min-height: 100vh;
}
```

**▶ 그리드 값 의미**

<table class="wda-mtable">
<thead><tr><th>코드</th><th>의미</th></tr></thead>
<tbody>
<tr><td><code>250px</code></td><td>사이드바를 항상 250px 고정 폭으로 유지</td></tr>
<tr><td><code>1fr</code></td><td>메인 영역이 남은 공간 전체를 차지</td></tr>
<tr><td><code>gap: 24px</code></td><td>사이드바와 메인 사이 간격</td></tr>
</tbody>
</table>

관리자 페이지, 블로그 레이아웃, 대시보드의 기본 뼈대로 자주 쓰이는 구조다. 화면이 좁아지면 미디어 쿼리로 1열로 바꿀 수 있다.

**• CSS: 반응형 1열 전환**

```css
@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
```

---

## 14. 실전 예제 — 매거진형 복잡한 격자

**• HTML: 매거진형 격자 구조**

```html
<div class="magazine-layout">
  <div class="item-a">큰 이미지</div>
  <div class="item-b">작은 이미지 1</div>
  <div class="item-c">작은 이미지 2</div>
  <div class="item-d">텍스트</div>
</div>
```

**• CSS: 매거진형 격자 스타일**

```css
.magazine-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 200px 150px auto;
  gap: 16px;
}

.item-a { grid-row: 1 / 3; }      /* 세로로 2칸 차지 */
.item-b { grid-row: 1 / 2; }
.item-c { grid-row: 2 / 3; }
.item-d { grid-column: 1 / 3; }   /* 가로 전체 폭 차지 */
```

**▶ 영역별 배치**

<table class="wda-mtable">
<thead><tr><th>영역</th><th>배치</th></tr></thead>
<tbody>
<tr><td>item-a</td><td>1열, 1~2행을 세로로 병합한 큰 이미지</td></tr>
<tr><td>item-b</td><td>2열, 1행의 작은 이미지</td></tr>
<tr><td>item-c</td><td>2열, 2행의 작은 이미지</td></tr>
<tr><td>item-d</td><td>1~2열을 가로로 병합한 텍스트 영역</td></tr>
</tbody>
</table>

신문·잡지 레이아웃, 뉴스 사이트 메인 섹션, 포트폴리오 사진 갤러리에서 실제로 쓰이는 배치 방식이다.

---

## 15. Container / Item 속성 총정리

**▶ Container·Item 속성 총정리**

<table class="wda-mtable">
<thead><tr><th>속성</th><th>대상</th><th>주요 값</th></tr></thead>
<tbody>
<tr><td><code>grid-template-columns</code> / <code>rows</code></td><td>Container</td><td><code>px</code>, <code>%</code>, <code>fr</code>, <code>auto</code></td></tr>
<tr><td><code>gap</code></td><td>Container</td><td><code>gap: 16px</code> / <code>gap: 행 열</code> / <code>row-gap</code>·<code>column-gap</code></td></tr>
<tr><td><code>justify-items</code></td><td>Container</td><td><code>start</code>, <code>end</code>, <code>center</code>, <code>stretch</code>(기본)</td></tr>
<tr><td><code>align-items</code></td><td>Container</td><td><code>start</code>, <code>end</code>, <code>center</code>, <code>stretch</code>(기본)</td></tr>
<tr><td><code>place-items</code></td><td>Container</td><td><code>align값 justify값</code> 순서</td></tr>
<tr><td><code>grid-column</code> / <code>row</code></td><td>Item</td><td>범위 지정(<code>1 / 3</code>) 또는 자동 배치</td></tr>
<tr><td><code>justify-self</code> / <code>align-self</code></td><td>Item</td><td><code>start</code>, <code>end</code>, <code>center</code>, <code>stretch</code>(기본)</td></tr>
<tr><td><code>place-self</code></td><td>Item</td><td><code>align값 justify값</code> 순서</td></tr>
</tbody>
</table>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>Flexbox는 <strong>1차원</strong>, Grid는 <strong>2차원</strong> 레이아웃 도구다.</li>
    <li>Grid를 켜는 건 <code>display: grid</code> 단 하나다.</li>
    <li><strong>Container</strong>는 격자 구조·간격·전체 정렬을 담당하고, <strong>Item</strong>은 개별 위치·정렬을 담당한다.</li>
    <li><code>fr</code> 단위는 <strong>gap을 제외한 남은 공간</strong>을 비율로 나눈다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: flex-wrap을 쓰면 Grid처럼 행과 열을 자유롭게 지정할 수 있다?</div>
    <div class="wda-mistake-right">정답: <code>flex-wrap</code>은 <strong>줄바꿈 여부만</strong> 제어할 뿐, 특정 칸에 정확히 위치를 지정하는 기능은 없다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Grid Item 안에 있는 모든 하위 요소는 Grid Item이다?</div>
    <div class="wda-mistake-right">정답: <strong>Container의 직계 자식만</strong> Grid Item이다. 손자뻘 요소는 Item으로 취급되지 않는다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 그리드 라인 번호도 배열처럼 0부터 시작한다?</div>
    <div class="wda-mistake-right">정답: 그리드 라인은 <strong>1번부터</strong> 시작한다. 3열이면 라인은 1~4번까지 생긴다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 차원</div>
    <div class="wda-formula-block-body"><code>Flexbox = 1차원 · Grid = 2차원</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 필수 3종</div>
    <div class="wda-formula-block-body"><code>display + grid-template-columns + gap</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 역할 분담</div>
    <div class="wda-formula-block-body"><code>Container = 전체 · Item = 개별</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Grid와 Flexbox의 가장 큰 차이는?</div>
    <div class="wda-flip-back">Grid는 2차원, Flexbox는 1차원 레이아웃이라는 점이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">GridContainer를 만드는 CSS 속성은?</div>
    <div class="wda-flip-back"><code>display: grid;</code></div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">3열 그리드에서 그리드 라인은 몇 번까지 생기나?</div>
    <div class="wda-flip-back">1번부터 4번까지, 총 4개의 라인이 생긴다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front"><code>1fr 2fr 1fr</code>은 어떤 비율로 공간을 나누나?</div>
    <div class="wda-flip-back">1:2:1 비율로 남은 공간을 나눈다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">justify-items와 align-items를 한 번에 쓰는 속성은?</div>
    <div class="wda-flip-back"><code>place-items</code>이며, 값 순서는 align → justify다.</div>
  </div>
</div>
