---
title: "7-1 Media Query로 화면 크기 대응하기"
category: "frontend"
section: "css"
date: "2026-08-01"
status: "completed"
description: "@media 문법과 min-width·max-width, 논리 연산자, Breakpoint 전략을 통해 화면 크기별로 CSS를 조건부 적용하는 방법을 정리합니다."
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
  • <strong>@media 문법 이해</strong> — 조건부 CSS가 어떤 구조로 작성되는지 정확히 읽고 쓸 수 있습니다<br>
  • <strong>min-width vs max-width 구분</strong> — 모바일 퍼스트와 데스크탑 퍼스트, 두 접근법의 차이를 구분해 사용합니다<br>
  • <strong>논리 연산자 활용</strong> — and, 쉼표(OR), not, only로 복잡한 조건을 조합합니다<br>
  • <strong>Breakpoint 전략 수립</strong> — 디바이스 기준이 아닌 콘텐츠 기준으로 Breakpoint를 설계합니다
</div>

---

## 1. @media 문법 기초

지금까지 Flexbox와 Grid로 레이아웃을 짜는 법을 배웠다면, 이제는 그 레이아웃을 화면 크기에 따라 다르게 보여주는 방법이 필요하다. 그 시작점이 바로 Media Query다.

이 문서에서는 @media의 기본 문법, min-width와 max-width의 차이, 논리 연산자, 그리고 Breakpoint를 설계하는 전략까지 다룬다. 디바이스별 세부 최적화는 다음 문서(2-6-2)에서, srcset·picture·Container Query 같은 심화 기법은 그다음 문서(2-6-3)에서 이어간다.

Media Query는 화면의 너비, 방향 같은 특정 조건을 만족할 때만 CSS를 적용하는 문법이다. 미디어 타입과 조건을 함께 지정해서 "이 조건을 만족하는 화면에서만 이 스타일을 적용하라"고 브라우저에 지시한다.

**• CSS: @media 기본 문법**

```css
@media screen and (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
```

**▶ 미디어 타입별 의미**

<table class="wda-mtable">
<thead><tr><th>미디어 타입</th><th>의미</th></tr></thead>
<tbody>
<tr><td><code>screen</code></td><td>화면(모니터, 스마트폰 등)에 적용. 실무에서 가장 많이 사용</td></tr>
<tr><td><code>all</code></td><td>모든 매체에 적용(생략 시 기본값)</td></tr>
<tr><td><code>print</code></td><td>인쇄 시에만 적용</td></tr>
<tr><td><code>speech</code></td><td>스크린 리더 등 음성 출력 매체에 적용</td></tr>
</tbody>
</table>

조건은 괄호 안에 작성하며, 대표적으로 다음과 같은 형태를 쓴다.

**• CSS: 미디어 조건 작성 형태**

```css
@media (max-width: 768px) { /* 768px 이하일 때 */ }
@media (min-width: 1024px) { /* 1024px 이상일 때 */ }
@media (orientation: portrait) { /* 세로 방향일 때 */ }
```

실무에서는 공통 스타일을 먼저 작성하고, 이후 상황별로 @media를 덮어쓰는 구조를 표준으로 쓴다.

**• CSS: 공통 스타일과 미디어 오버라이드**

```css
/* 1. 기본 스타일 (모든 화면 공통) */
.card {
  display: flex;
  gap: 16px;
  padding: 20px;
}

/* 2. 768px 이하 - 모바일 오버라이드 */
@media screen and (max-width: 768px) {
  .card {
    flex-direction: column;
    padding: 12px;
  }
}

/* 3. 인쇄용 스타일 */
@media print {
  .card {
    box-shadow: none;
    border: 1px solid #000;
  }
}
```

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>공통 스타일을 먼저 정의하고 예외적인 상황만 @media로 <strong>덮어쓰는</strong> 순서를 지키면, 스타일시트 전체를 화면 크기별로 흩어놓지 않고도 유지보수하기 쉬운 구조를 만들 수 있다.</p>
</div>

---

## 2. min-width vs max-width — 접근 방향이 다르다

같은 화면 크기를 다루더라도 min-width와 max-width는 CSS를 쌓아가는 방향이 정반대다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">min-width — 모바일 퍼스트</div>
    기본 스타일을 모바일(320px~) 기준으로 작성하고, 화면이 커질수록 <code>min-width</code> 조건으로 스타일을 <strong>추가</strong>한다. 필요 없는 코드를 먼저 읽지 않아도 되므로 성능에 유리하고, 점진적으로 기능을 확장하는 Progressive Enhancement 방식이다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">max-width — 데스크탑 퍼스트</div>
    기본 스타일을 데스크탑(1440px~) 기준으로 작성하고, 화면이 작아질수록 <code>max-width</code> 조건으로 스타일을 <strong>덜어낸다</strong>. 모바일에서도 데스크탑용 CSS를 먼저 내려받게 되어 성능이 떨어질 수 있지만, 기존 데스크탑 서비스를 리뉴얼하거나 관리자 페이지를 만들 때는 여전히 쓰인다.
  </div>
</div>

**• CSS: 모바일 퍼스트와 데스크탑 퍼스트 비교**

```css
/* 모바일 퍼스트 (min-width) */
.box { width: 100%; }
@media (min-width: 768px) { .box { width: 50%; } }
@media (min-width: 1024px) { .box { width: 33%; } }

/* 데스크탑 퍼스트 (max-width) */
.box { width: 33%; }
@media (max-width: 1024px) { .box { width: 50%; } }
@media (max-width: 768px) { .box { width: 100%; } }
```

**▶ 모바일 퍼스트와 데스크탑 퍼스트 비교**

<table class="wda-mtable">
<thead><tr><th>구분</th><th>기본값</th><th>변화 방향</th><th>적합한 트래픽 환경</th></tr></thead>
<tbody>
<tr><td>min-width (모바일 퍼스트)</td><td>모바일 320px~</td><td>화면이 커질수록 스타일 추가</td><td>모바일 트래픽 비중이 높은 서비스</td></tr>
<tr><td>max-width (데스크탑 퍼스트)</td><td>데스크탑 1440px~</td><td>화면이 작아질수록 스타일 제거</td><td>PC 중심 기존 서비스, 관리자 페이지</td></tr>
</tbody>
</table>

---

## 3. 논리 연산자로 복잡한 조건 만들기

**▶ 미디어 쿼리 논리 연산자**

<table class="wda-mtable">
<thead><tr><th>연산자</th><th>의미</th><th>예시</th></tr></thead>
<tbody>
<tr><td><code>and</code></td><td>여러 조건을 모두 만족할 때</td><td><code>(min-width: 768px) and (max-width: 1024px)</code> — 태블릿 범위</td></tr>
<tr><td><code>,</code> (쉼표)</td><td>여러 조건 중 하나만 만족해도 적용 (OR)</td><td><code>(max-width: 480px), (min-width: 1920px)</code> — 소형 모바일 또는 대형 모니터</td></tr>
<tr><td><code>not</code></td><td>조건을 부정</td><td><code>not screen</code> — screen이 아닌 매체</td></tr>
<tr><td><code>only</code></td><td>조건을 지원하지 않는 구형 브라우저가 스타일 전체를 무시하게 함</td><td><code>only screen and (min-width: 768px)</code></td></tr>
</tbody>
</table>

**• CSS: 논리 연산자 활용**

```css
/* and - 태블릿 범위(768px ~ 1024px)에만 적용 */
@media (min-width: 768px) and (max-width: 1024px) {
  .layout { grid-template-columns: repeat(2, 1fr); }
}

/* and - 모바일 가로 모드에만 적용 */
@media (max-width: 768px) and (orientation: landscape) {
  .nav { flex-direction: row; }
}

/* 쉼표(,) OR - 아주 작은 화면 또는 아주 큰 화면에만 적용 */
@media (max-width: 360px), (min-width: 1920px) {
  .title { font-size: 1.2rem; }
}

/* not - 세로 모드가 아닐 때만 적용 */
@media not (orientation: portrait) {
  .hero { height: 60vh; }
}
```

**💡 설명**

<div class="wda-callout wda-ci">
  <p>실무에서는 <strong>and</strong>로 범위를 좁히는 패턴이 대부분을 차지한다. 쉼표(OR)는 서로 동떨어진 두 조건을 한 번에 처리해야 하는 특수한 케이스에서, <strong>not</strong>과 <strong>only</strong>는 가끔 쓰는 보조 도구 정도로 기억해두면 충분하다.</p>
</div>

---

## 4. orientation — 화면 방향 대응하기

`orientation`은 화면의 세로(portrait)·가로(landscape) 방향을 감지하는 조건이다.

**• CSS: orientation 감지**

```css
@media (orientation: portrait) {
  .layout { flex-direction: column; }
}
@media (orientation: landscape) {
  .layout { flex-direction: row; }
}
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><code>orientation</code>을 <strong>단독으로</strong> 쓰면 가로로 넓은 데스크탑 화면도 landscape 조건에 함께 걸려버리는 실수를 하기 쉽다. 모바일·태블릿의 방향 전환만 다루고 싶다면 반드시 <code>width</code> 조건과 함께 묶어야 한다.</p>
</div>

**• CSS: orientation과 width 조건 결합**

```css
/* 잘못된 예 - 데스크탑도 이 조건에 포함된다 */
@media (orientation: landscape) { .nav { flex-direction: row; } }

/* 올바른 예 - 모바일 범위로 폭을 함께 제한 */
@media (max-width: 768px) and (orientation: landscape) {
  .nav { flex-direction: row; }
}
```

실전 예제로 모바일 네비게이션을 세로·가로·태블릿 이상 3단계로 대응해보자.

**• HTML 구조**

```html
<nav class="nav">
  <a href="#">홈</a>
  <a href="#">소개</a>
  <a href="#">문의</a>
</nav>
```

**• CSS 스타일(반응형 3단계)**

```css
/* 기본: 모바일 세로 - 메뉴를 세로로 쌓음 */
.nav { display: flex; flex-direction: column; gap: 8px; }

/* 모바일 가로 모드 - 가로 메뉴로 전환 */
@media (max-width: 768px) and (orientation: landscape) {
  .nav { flex-direction: row; justify-content: space-around; }
}

/* 태블릿 이상 - PC와 동일한 가로 스타일 */
@media (min-width: 768px) {
  .nav { flex-direction: row; gap: 24px; }
}
```

---

## 5. 주요 Breakpoint 전략

실무에서 자주 쓰이는 대표 Breakpoint는 4단계다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">320px</div><div class="wda-fcard-dsc">소형 모바일 기준선</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">768px</div><div class="wda-fcard-dsc">태블릿 시작. 가장 중요한 분기점</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">1024px</div><div class="wda-fcard-dsc">데스크탑 시작</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">1440px</div><div class="wda-fcard-dsc">대형 모니터 기준선</div></div>
</div>

**• CSS: Breakpoint 단계별 적용**

```css
/* 모바일 퍼스트 기본 */
.container { width: 100%; padding: 0 16px; }

@media (min-width: 768px) {
  .container { max-width: 720px; margin: 0 auto; }
}
@media (min-width: 1024px) {
  .container { max-width: 960px; }
}
@media (min-width: 1440px) {
  .container { max-width: 1280px; }
}
```

주요 프레임워크도 대체로 이와 비슷한 체계를 쓰지만, 각 지점의 이름과 세부 값은 조금씩 다르다.

**▶ 프레임워크별 Breakpoint 비교**

<table class="wda-mtable">
<thead><tr><th>프레임워크</th><th>xs</th><th>sm</th><th>md</th><th>lg</th><th>xl</th><th>xxl</th></tr></thead>
<tbody>
<tr><td>Bootstrap 5</td><td>&lt;576px</td><td>576px</td><td>768px</td><td>992px</td><td>1200px</td><td>1400px</td></tr>
<tr><td>Tailwind CSS</td><td>-</td><td>640px</td><td>768px</td><td>1024px</td><td>1280px</td><td>1536px</td></tr>
<tr><td>Material UI</td><td>0px</td><td>600px</td><td>900px</td><td>1200px</td><td>1536px</td><td>-</td></tr>
</tbody>
</table>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>Breakpoint를 정할 때 "아이폰은 375px이니까 375px에 맞춘다"처럼 <strong>특정 디바이스 크기를 기준으로 삼는 방식(Device-based)</strong>은 지양해야 한다. 디바이스 종류는 계속 늘어나고 화면 크기도 제각각이기 때문이다. 대신 <strong>콘텐츠가 실제로 깨지기 시작하는 지점을 기준으로 Breakpoint를 잡는 방식(Content-based)</strong>이 현대적인 접근이다.</p>
</div>

---

## 6. 모바일 퍼스트 접근법 — 4단계 확장 전략

모바일 퍼스트는 가장 작은 화면부터 스타일을 정의하고, 화면이 커질 때마다 필요한 스타일을 점진적으로 얹는 방식이다.

**• CSS: 모바일 퍼스트 4단계 확장**

```css
/* 1단계: 모바일(320px~) - 기본 */
.container { width: 100%; padding: 16px; }
.title { font-size: 1.5rem; }
.grid { grid-template-columns: 1fr; gap: 12px; }

/* 2단계: 태블릿(768px~) */
@media (min-width: 768px) {
  .container { padding: 24px; }
  .title { font-size: 2rem; }
  .grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
}

/* 3단계: 데스크탑(1024px~) */
@media (min-width: 1024px) {
  .container { padding: 32px; }
  .title { font-size: 2.5rem; }
  .grid { grid-template-columns: repeat(3, 1fr); gap: 20px; }
}

/* 4단계: 대형 화면(1440px~) */
@media (min-width: 1440px) {
  .container { max-width: 1280px; margin: 0 auto; }
  .grid { grid-template-columns: repeat(4, 1fr); gap: 24px; }
}
```

화면 크기가 커질 때마다 이전 단계의 스타일 위에 새로운 규칙이 누적되는 구조다.

**▶ 모바일 퍼스트 스타일 누적**

<table class="wda-mtable">
<thead><tr><th>화면 크기</th><th>적용되는 스타일</th></tr></thead>
<tbody>
<tr><td>320px (모바일)</td><td>기본 스타일만</td></tr>
<tr><td>768px (태블릿)</td><td>기본 + 768px 규칙</td></tr>
<tr><td>1024px (데스크탑)</td><td>기본 + 768px + 1024px 규칙</td></tr>
<tr><td>1440px (대형 화면)</td><td>기본 + 768px + 1024px + 1440px 규칙</td></tr>
</tbody>
</table>

<div class="wda-check-note">
  <ul>
    <li>불필요한 CSS를 먼저 읽지 않아도 되므로 <strong>성능 최적화</strong>에 유리하다.</li>
    <li>작은 화면부터 기능을 쌓아 올리는 <strong>점진적 향상(Progressive Enhancement)</strong> 구조다.</li>
    <li>전체 트래픽의 <strong>60% 이상이 모바일</strong>인 서비스에서는 우선순위가 명확해진다.</li>
    <li>스타일이 누적되는 방향이 일정해 <strong>CSS 우선순위를 예측하기 쉽다.</strong></li>
  </ul>
</div>

---

## 7. 데스크탑 퍼스트 접근법과 여전히 유용한 경우

데스크탑 퍼스트는 반대로 가장 큰 화면부터 시작해서 작아질수록 스타일을 덜어내는 3단계 축소 전략을 쓴다.

**• CSS: 데스크탑 퍼스트 3단계 축소**

```css
/* 1단계: 데스크탑(1920px~) - 기본 */
.sidebar { width: 280px; }

/* 2단계: 태블릿 이하(1024px~) */
@media (max-width: 1024px) {
  .sidebar { width: 220px; }
}

/* 3단계: 모바일 이하(768px~) */
@media (max-width: 768px) {
  .sidebar { width: 100%; }
}
```

**▶ 데스크탑 퍼스트를 유지하는 이유**

<table class="wda-mtable">
<thead><tr><th>데스크탑 퍼스트를 그대로 유지하는 이유</th><th>내용</th></tr></thead>
<tbody>
<tr><td>모바일 퍼스트 전환 시 성능 이점 상실 우려</td><td>거꾸로 데스크탑 퍼스트를 유지한 채로는, 모바일이 불필요한 CSS를 먼저 받는 문제를 해결하기 어렵다</td></tr>
<tr><td>전환 복잡도</td><td>기존 데스크탑 코드베이스를 모바일 퍼스트로 재작성하는 비용이 크다</td></tr>
<tr><td>우선순위 역전</td><td>PC 중심 서비스에서는 데스크탑 스타일이 더 자주 수정되므로 전환 유인이 적다</td></tr>
<tr><td>유지보수 부담</td><td>이미 데스크탑 퍼스트로 짜인 대규모 스타일시트를 전환하기 부담스럽다</td></tr>
</tbody>
</table>

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>그럼에도 데스크탑 퍼스트가 여전히 유용한 상황이 있다. <strong>기존 프로젝트</strong>를 유지보수할 때, <strong>Admin 페이지</strong>처럼 PC 사용이 절대적일 때, <strong>B2B SaaS</strong>나 <strong>내부 대시보드</strong>처럼 모바일 접근이 거의 없는 서비스에서는 데스크탑 퍼스트가 오히려 더 실용적이다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><code>@media 조건 { ... }</code> 형태로 특정 조건을 만족할 때만 CSS를 적용한다.</li>
    <li><strong>min-width</strong>는 모바일 퍼스트(작은 화면 기본 → 스타일 추가), <strong>max-width</strong>는 데스크탑 퍼스트(큰 화면 기본 → 스타일 제거)다.</li>
    <li>논리 연산자는 <code>and</code>(동시 만족), <code>,</code>(OR), <code>not</code>(부정), <code>only</code>(구형 브라우저 대응) 네 가지다.</li>
    <li>Breakpoint는 디바이스 기준이 아니라 <strong>콘텐츠가 깨지는 지점</strong>을 기준으로 설계한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: orientation만 써도 모바일 방향 전환을 안전하게 잡을 수 있다?</div>
    <div class="wda-mistake-right">정답: <code>orientation</code>을 단독으로 쓰면 <strong>데스크탑도 조건에 포함</strong>된다. 반드시 <code>width</code> 조건과 함께 써야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: min-width와 max-width는 그냥 부등호 방향만 다르고 결과는 비슷하다?</div>
    <div class="wda-mistake-right">정답: 두 방식은 <strong>기본 스타일을 어디에 두느냐</strong> 자체가 다르다. min-width는 모바일 기본에서 스타일을 추가하고, max-width는 데스크탑 기본에서 스타일을 덜어낸다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 기본 문법</div>
    <div class="wda-formula-block-body"><code>@media 타입 and (조건) { }</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 접근 방향</div>
    <div class="wda-formula-block-body"><code>min-width = 모바일 퍼스트 · max-width = 데스크탑 퍼스트</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · Breakpoint 기준</div>
    <div class="wda-formula-block-body"><code>디바이스 X · 콘텐츠 깨짐 지점 O</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Mobile-First 전략에 맞는 Media Query 조건은?</div>
    <div class="wda-flip-back"><code>(min-width: 768px)</code>처럼 작은 화면을 기본으로 두고 큰 화면에서 스타일을 추가하는 조건이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">태블릿 범위(768px~1024px)만 지정하려면 어떤 연산자를 쓰나?</div>
    <div class="wda-flip-back"><code>and</code>로 <code>(min-width: 768px) and (max-width: 1024px)</code>처럼 묶는다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">orientation을 안전하게 쓰는 방법은?</div>
    <div class="wda-flip-back"><code>width</code> 조건과 함께 <code>and</code>로 묶어서, 원하는 화면 범위 안에서만 방향을 감지하게 한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">4단계 대표 Breakpoint 값은?</div>
    <div class="wda-flip-back">320px, 768px, 1024px, 1440px이며 그중 768px이 가장 중요한 분기점이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">데스크탑 퍼스트가 여전히 쓰이는 대표 상황은?</div>
    <div class="wda-flip-back">기존 프로젝트 유지보수, Admin 페이지, B2B SaaS, 내부 대시보드처럼 PC 사용이 절대적인 서비스다.</div>
  </div>
</div>
