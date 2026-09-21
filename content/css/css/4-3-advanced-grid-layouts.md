---
title: "4-3 Grid 고급 레이아웃들"
category: "frontend"
section: "css"
date: "2026-08-01"
status: "completed"
description: "신문형·대시보드 레이아웃, auto-fit/auto-fill 반응형 갤러리, 미디어 쿼리 결합까지 Grid 실전 레이아웃 패턴을 정리합니다."
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
  • <strong>신문 레이아웃 살펴보기</strong> — 헤더, 사이드바, 메인 콘텐츠, 광고 영역을 배치하는 방법을 익힙니다<br>
  • <strong>대시보드 레이아웃</strong> — grid-template-areas로 각 영역에 이름을 지정해 직관적으로 설계합니다<br>
  • <strong>이미지 갤러리</strong> — auto-fit, auto-fill로 콘텐츠 개수에 따라 열 개수가 자동 조정되는 반응형 갤러리를 만듭니다<br>
  • <strong>반응형 Grid 마스터</strong> — 미디어 쿼리와 Grid를 결합해 모바일·태블릿·PC에 대응하는 레이아웃을 설계합니다
</div>

---

## 1. 신문 레이아웃

[이전 문서](/css/css/4-2-grid-rows-and-columns)에서 <code>repeat()</code>, <code>minmax()</code>, <code>grid-template-areas</code> 같은 배치 문법을 익혔다면, 이 문서에서는 그 문법들을 조합해 실제 서비스에서 쓰이는 완성형 레이아웃을 만든다.

신문형 레이아웃, 대시보드, 반응형 이미지 갤러리, 그리고 미디어 쿼리를 결합한 반응형 Grid까지 네 가지 실전 패턴을 다룬다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">Header</div><div class="wda-fcard-dsc">전체 너비를 차지</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Sidebar</div><div class="wda-fcard-dsc">250px 고정 폭</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Main</div><div class="wda-fcard-dsc">남은 공간 전체(1fr)</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Ads</div><div class="wda-fcard-dsc">300px 고정 폭</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Footer</div><div class="wda-fcard-dsc">전체 너비를 차지</div></div>
</div>

**• CSS: 신문 레이아웃 기본 구조**

```css
.newspaper {
  display: grid;
  grid-template-columns: 250px 1fr 300px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header, .footer {
  grid-column: 1 / 4;
}
```

**▶ grid-column 값 의미**

<table class="wda-mtable">
<thead><tr><th>코드</th><th>의미</th></tr></thead>
<tbody>
<tr><td><code>grid-column: 1 / 4</code></td><td>3개 열을 모두 병합해 전체 너비를 차지</td></tr>
<tr><td><code>250px 1fr 300px</code></td><td>고정(사이드바) + 가변(메인) + 고정(광고) 조합</td></tr>
<tr><td><code>min-height: 100vh</code></td><td>콘텐츠가 적어도 화면 전체 높이를 확보</td></tr>
</tbody>
</table>

**💡 설명**

<div class="wda-callout wda-ci">
  <p><strong>자주 하는 질문.</strong> 왜 <code>1 / 4</code>로 병합할까? 열이 3개면 그리드 라인은 1~4번까지 생기기 때문에, 1번부터 4번까지가 곧 3열 전체다. Sidebar·Main·Ads에는 왜 <code>grid-column</code>을 쓰지 않았을까? 자동 배치에 맡기면 순서대로 각각 1번째, 2번째, 3번째 칸에 알아서 들어가기 때문이다. Sidebar와 Ads의 너비를 고정하는 이유는, 광고와 내비게이션처럼 크기가 일정해야 레이아웃이 흔들리지 않는 영역이기 때문이다.</p>
</div>

**• HTML: 신문 레이아웃 마크업**

```html
<div class="newspaper">
  <header class="header">헤더</header>
  <aside class="sidebar">사이드바</aside>
  <main class="main">메인 콘텐츠</main>
  <aside class="ads">광고</aside>
  <footer class="footer">푸터</footer>
</div>
```

**• CSS: 신문 레이아웃 마크업 스타일**

```css
.newspaper {
  display: grid;
  grid-template-columns: 250px 1fr 300px;
  grid-template-rows: auto 1fr auto;
  gap: 16px;
  min-height: 100vh;
}

.header { grid-column: 1 / 4; background: #6c5ce7; }
.footer { grid-column: 1 / 4; background: #2d3436; }
.sidebar { background: #dfe6e9; }
.main { background: #ffffff; }
.ads { background: #dfe6e9; }
```

---

## 2. 대시보드 레이아웃

`grid-column`으로 영역을 하나씩 지정하면 라인 번호 계산이 복잡해지고 가독성도 떨어진다. 이런 경우 `grid-template-areas`가 해결책이 된다.

레이아웃을 문자열로 그리듯 설계하고, 영역마다 이름을 붙인 뒤 `grid-area`로 연결하면 된다.

**• CSS: 대시보드 grid-template-areas**

```css
.dashboard {
  display: grid;
  grid-template-columns: 220px 1fr 1fr 1fr;
  grid-template-rows: 70px auto auto 50px;
  grid-template-areas:
    "logo     nav      nav      nav"
    "sidebar  stats1   stats2   chart"
    "sidebar  activity activity chart"
    "footer   footer   footer   footer";
  gap: 16px;
}

.logo     { grid-area: logo; }
.nav      { grid-area: nav; }
.sidebar  { grid-area: sidebar; }
.stats1   { grid-area: stats1; }
.stats2   { grid-area: stats2; }
.chart    { grid-area: chart; }
.activity { grid-area: activity; }
.footer   { grid-area: footer; }
```

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p><strong>grid-template-areas의 장점</strong>은 레이아웃이 코드만 봐도 시각적으로 보이고, 라인 번호를 따로 계산할 필요가 없으며, 나중에 유지보수하기도 쉽다는 점이다.</p>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  <p><strong>자주 하는 질문.</strong> Sidebar가 2행에 걸쳐 있는데 어떻게 병합될까? <code>grid-template-areas</code>에서 같은 이름(<code>sidebar</code>)이 여러 줄에 반복되면 자동으로 하나의 영역으로 합쳐진다. <code>grid-column</code>보다 <code>grid-template-areas</code>가 항상 더 좋은가? 복잡한 레이아웃엔 <code>areas</code>가 유리하지만, 2분할처럼 간단한 구조는 <code>grid-column</code>만으로 충분하다. 실무에서 정말 쓰이는가? 대시보드·관리자 페이지·SaaS 제품 화면에서 실제로 많이 쓰인다.</p>
</div>

**• HTML: 대시보드 마크업**

```html
<div class="dashboard">
  <div class="logo">LOGO</div>
  <nav class="nav">내비게이션</nav>
  <aside class="sidebar">사이드바</aside>
  <div class="stats1">통계 1</div>
  <div class="stats2">통계 2</div>
  <div class="chart">차트</div>
  <div class="activity">최근 활동</div>
  <footer class="footer">푸터</footer>
</div>
```

**• CSS: 대시보드 마크업 스타일**

```css
.dashboard {
  display: grid;
  grid-template-columns: 220px 1fr 1fr 1fr;
  grid-template-rows: 70px auto auto 50px;
  grid-template-areas:
    "logo     nav      nav      nav"
    "sidebar  stats1   stats2   chart"
    "sidebar  activity activity chart"
    "footer   footer   footer   footer";
  gap: 16px;
  min-height: 100vh;
}
```

---

## 3. 이미지 갤러리 — auto-fit / auto-fill

열 개수를 3개로 고정하면 화면이 커질수록 카드가 불필요하게 커지고, 화면이 작아지면 카드가 너무 작아진다. 화면 크기마다 미디어 쿼리로 열 개수를 새로 지정하는 것도 번거롭다.

**• CSS: 반응형 갤러리 auto-fit**

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
```

`auto-fit`은 "최소 200px 이상인 칸을 화면에 들어가는 만큼 최대한 많이 만들고, 남는 공간은 1fr로 균등 분배한다"는 뜻이다. 화면 폭에 따라 열 개수가 이렇게 자동으로 계산된다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>열 개수는 <strong>화면 폭을 최소 크기로 단순히 나눈 값이 아니다.</strong> 위 코드처럼 <code>gap</code>이 있으면 그 간격까지 폭에 포함해서 계산해야 하므로, 단순 나눗셈 결과보다 열이 1개 적게 나오는 경우가 많다.</p>
</div>

**▶ auto-fit 화면 폭별 열 개수(gap: 16px 기준 실측)**

<table class="wda-mtable">
<thead><tr><th>화면 폭</th><th>열 개수</th></tr></thead>
<tbody>
<tr><td>1200px</td><td>5열 (단순 나눗셈 6열보다 gap만큼 1열 적음)</td></tr>
<tr><td>800px</td><td>3열 (단순 나눗셈 4열보다 gap만큼 1열 적음)</td></tr>
<tr><td>400px</td><td>1열 (단순 나눗셈 2열과 달리 gap 포함 시 1열)</td></tr>
<tr><td>300px</td><td>1열</td></tr>
</tbody>
</table>

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">반응형 갤러리 핵심 공식</div>
    <div class="wda-formula-block-body"><code>repeat(auto-fit, minmax(최소크기, 1fr))</code></div>
  </div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  <p><strong>자주 하는 질문.</strong> 열 개수는 어떻게 계산되나? 화면 폭을 <code>minmax()</code>의 최소값으로 나눈 몫만큼 열이 생긴다. 언제 1fr로 확장되나? 몫을 나누고 남는 공간이 있을 때, 그 공간이 이미 만들어진 열들에 1fr 비율로 고르게 배분된다. 실무에서 미디어 쿼리 없이도 되는가? 카드 크기가 동일한 갤러리형 UI라면 미디어 쿼리 없이 <code>auto-fit</code> 하나로 충분한 경우가 많다.</p>
</div>

---

## 4. auto-fit vs auto-fill

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">auto-fill</div>
    아이템 개수가 적어도 빈 칸을 <strong>유지</strong>한다. 그리드 틀 자체는 화면 폭만큼 채워진 채로 남는다. 아이템 개수가 계속 바뀌는 리스트형 UI에 적합하다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">auto-fit</div>
    빈 칸을 <strong>제거</strong>하고, 실제 존재하는 아이템이 남은 공간을 나눠 채운다. 갤러리·카드 목록처럼 아이템이 화면을 꽉 채워 보여야 하는 UI에 적합하다.
  </div>
</div>

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>실무에서는 대부분의 갤러리·카드 목록에 <strong>auto-fit</strong>이 권장된다. <strong>자주 하는 질문.</strong> 둘의 차이는 빈 칸 유지 여부다. 어떤 게 더 좋은가는 상황에 따라 다르지만 기본값은 <code>auto-fit</code>이다. <code>auto-fill</code>은 아이템 개수가 유동적인 리스트에서 그리드 틀 자체를 유지하고 싶을 때 사용한다.</p>
</div>

**• HTML: 이미지 갤러리 마크업**

```html
<div class="gallery">
  <img src="1.jpg" alt="" />
  <img src="2.jpg" alt="" />
  <!-- ... 총 12장 ... -->
</div>
```

**• CSS: 이미지 갤러리 마크업 스타일**

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.gallery img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.2s ease;
}

.gallery img:hover {
  transform: scale(1.05);
}
```

**▶ 화면 크기별 열 개수(gap: 16px 기준 실측)**

<table class="wda-mtable">
<thead><tr><th>화면</th><th>결과</th></tr></thead>
<tbody>
<tr><td>PC (1920px)</td><td>8열</td></tr>
<tr><td>노트북 (1200px)</td><td>5열</td></tr>
<tr><td>태블릿 (768px)</td><td>3열</td></tr>
<tr><td>모바일 (400px)</td><td>1열</td></tr>
</tbody>
</table>

미디어 쿼리를 단 한 줄도 쓰지 않고 이 결과가 나온다.

**실무 팁 Q&A.** `object-fit: cover`는 이미지 비율을 유지하면서 지정한 영역을 꽉 채우고 넘치는 부분은 잘라내는 속성이다. 높이를 고정한 이유는 이미지마다 원본 비율이 달라도 카드 높이를 일정하게 맞추기 위해서다.

포트폴리오, 쇼핑몰 상품 목록, SNS 피드에서 실제로 널리 쓰이는 패턴이며, Unsplash나 Pinterest 같은 서비스의 그리드도 같은 원리로 동작한다.

---

## 5. 반응형 Grid — 미디어 쿼리 결합

PC 기준으로 짠 `250px 1fr` 같은 고정 사이드바 구조를 모바일 화면에 그대로 쓰면 사이드바가 화면을 너무 많이 차지해 좁고 답답해진다. 화면이 좁아지면 가로 2열을 세로 1열로 바꿔야 한다.

**• CSS: 미디어 쿼리로 2열→1열 전환**

```css
/* PC 기준 - 2열 */
.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
}

/* 태블릿 이하 - 1열로 전환 */
@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
```

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">PC</div><div class="wda-fnode-dsc">250px 1fr, 가로 2열</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">태블릿 이하</div><div class="wda-fnode-dsc">1fr, 세로 1열</div></div>
</div>

핵심 패턴은 단순하다. `@media (max-width: 768px) { grid-template-columns: 1fr; }` — 가로 2열을 세로 1열로 바꾸는 것이 반응형 Grid의 기본형이다.

**💡 설명**

<div class="wda-callout wda-ci">
  <p><strong>자주 하는 질문.</strong> 왜 768px을 기준으로 잡을까? 태블릿과 모바일을 가르는 대표적인 기준점으로 실무에서 관용적으로 쓰이기 때문이다. <code>grid-template-columns</code>만 바꾸면 되는가? 열 구조가 단순하다면 대부분 이것만으로 충분하다. <code>auto-fit</code>과 미디어 쿼리 중 무엇을 써야 하는가? 카드가 전부 동일한 역할을 하는 갤러리는 <code>auto-fit</code>이 적합하고, 헤더·사이드바·광고처럼 <strong>역할이 서로 다른 영역이 섞인</strong> 신문형·대시보드형 레이아웃은 미디어 쿼리로 명시적으로 재배치하는 편이 안전하다.</p>
</div>

**반응형 Grid 실전 — 신문형 3열 구조**

**• CSS: 신문형 레이아웃 반응형 처리**

```css
.newspaper {
  display: grid;
  grid-template-columns: 250px 1fr 300px;
  gap: 16px;
}

.header, .footer {
  grid-column: 1 / 4;
}

/* 768px 이하 - 1열로 전환, 모든 영역 재지정 */
@media (max-width: 768px) {
  .newspaper {
    grid-template-columns: 1fr;
  }

  .header, .sidebar, .main, .ads, .footer {
    grid-column: 1 / 2;
  }
}

/* 480px 이하 - 간격 축소 + 광고 영역 숨김 */
@media (max-width: 480px) {
  .newspaper {
    gap: 8px;
  }

  .ads {
    display: none;
  }
}
```

**▶ Breakpoint별 레이아웃**

<table class="wda-mtable">
<thead><tr><th>Breakpoint</th><th>레이아웃</th></tr></thead>
<tbody>
<tr><td>1920px (PC)</td><td>3열 — 사이드바 250px + 메인 1fr + 광고 300px</td></tr>
<tr><td>768px 이하</td><td>1열 — 모든 영역이 세로로 순서대로 쌓임</td></tr>
<tr><td>480px 이하</td><td>1열 + 간격 축소 + 광고 영역 숨김</td></tr>
</tbody>
</table>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>신문형 레이아웃은 <strong>고정+가변+고정</strong>(<code>250px 1fr 300px</code>) 조합에 헤더·푸터를 <code>1 / 4</code>로 병합한다.</li>
    <li>복잡한 레이아웃일수록 <code>grid-template-areas</code>가 라인 번호 계산보다 직관적이다.</li>
    <li>반응형 갤러리의 핵심 공식은 <code>repeat(auto-fit, minmax(최소, 1fr))</code>이다.</li>
    <li>역할이 다른 영역이 섞인 레이아웃은 <strong>미디어 쿼리</strong>로, 동일한 카드 나열은 <strong>auto-fit</strong>으로 반응형을 처리한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: auto-fit과 auto-fill은 사실상 같은 기능이다?</div>
    <div class="wda-mistake-right">정답: <code>auto-fill</code>은 빈 칸을 <strong>유지</strong>하고, <code>auto-fit</code>은 빈 칸을 <strong>제거</strong>하고 남은 공간을 아이템에 분배한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 반응형 레이아웃은 무조건 미디어 쿼리로 처리해야 한다?</div>
    <div class="wda-mistake-right">정답: 카드가 동일한 역할을 하는 갤러리형 UI는 <strong>auto-fit</strong>만으로 미디어 쿼리 없이도 반응형이 완성된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: grid-template-areas를 쓰면 grid-column은 더 이상 필요 없다?</div>
    <div class="wda-mistake-right">정답: 간단한 2분할 구조에는 여전히 <strong>grid-column</strong>이 더 빠르고 간단하다. 복잡한 구조에서만 areas가 유리하다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 신문형</div>
    <div class="wda-formula-block-body"><code>250px 1fr 300px + grid-column: 1/4</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 반응형 갤러리</div>
    <div class="wda-formula-block-body"><code>repeat(auto-fit, minmax(200px, 1fr))</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 반응형 전환</div>
    <div class="wda-formula-block-body"><code>@media(max-width:768px){grid-template-columns:1fr}</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">신문 레이아웃에서 Header를 3열 병합하는 코드는?</div>
    <div class="wda-flip-back"><code>grid-column: 1 / 4;</code> 또는 <code>grid-column: span 3;</code> 둘 다 정답이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">grid-template-areas의 장점은?</div>
    <div class="wda-flip-back">레이아웃이 시각적으로 보이고, 라인 번호 계산이 필요 없다는 두 가지 모두 해당된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">자동 반응형 갤러리를 만드는 코드는?</div>
    <div class="wda-flip-back"><code>grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));</code></div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">반응형 Grid에서 2열을 1열로 전환하는 코드는?</div>
    <div class="wda-flip-back"><code>grid-template-columns: 1fr;</code></div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">auto-fill과 auto-fit 중 갤러리에 더 권장되는 것은?</div>
    <div class="wda-flip-back">auto-fit이다. 빈 칸 없이 아이템이 남은 공간을 채우기 때문이다.</div>
  </div>
</div>
