---
title: "7-3 반응형 기법 익히기"
category: "frontend"
section: "css"
date: "2026-08-01"
status: "completed"
description: "유연한 레이아웃 단위, srcset·picture 반응형 이미지, Flexbox/Grid 자동 재배치, Container Queries까지 실전 반응형 기법을 종합 정리합니다."
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
  • <strong>유연한 단위 활용</strong> — %, vw, vh와 calc()·clamp()로 화면 크기에 자동으로 맞춰지는 레이아웃을 만듭니다<br>
  • <strong>반응형 이미지 기법</strong> — srcset과 picture로 해상도·화면 크기별 최적 이미지를 제공합니다<br>
  • <strong>Flexbox/Grid 자동 재배치</strong> — flex-wrap과 auto-fit·minmax()로 미디어쿼리 없이도 화면 크기에 맞춰 재배치되는 레이아웃을 구현합니다<br>
  • <strong>Container Queries 이해</strong> — @container로 부모 컨테이너 크기 기준 스타일링이 가능함을 이해하고 Media Query와의 차이를 구분합니다
</div>

---

## 1. 유연한 레이아웃 단위

CSS 챕터의 마지막 문서입니다. 지금까지 배운 Flexbox·Grid·단위·미디어쿼리를 반응형이라는 관점으로 다시 묶어서 정리합니다.

특히 미디어쿼리를 아예 쓰지 않고도 화면 크기에 자동으로 반응하는 기법(유연한 단위, auto-fit, Container Queries)에 집중합니다.

**▶ 유연한 레이아웃 단위**

<table class="wda-mtable">
<thead><tr><th>단위</th><th>기준</th></tr></thead>
<tbody>
<tr><td>px</td><td>절대·고정 단위. 화면 크기와 무관하다</td></tr>
<tr><td>%</td><td>부모 요소 크기 기준 상대 단위</td></tr>
<tr><td>vw / vh</td><td>뷰포트(화면) 너비·높이의 1%. 화면 크기에 정비례한다</td></tr>
<tr><td>vmin / vmax</td><td>vw와 vh 중 작은 값 / 큰 값을 기준으로 한다</td></tr>
</tbody>
</table>

**• CSS: 고정 px와 유연한 단위 비교**

```css
/* ❌ 고정 px — 작은 화면에서 가로 스크롤 발생 */
.container { width: 1200px; }

/* ✅ 유연한 단위 + 상한선 */
.container {
  width: 90vw;
  max-width: 1200px;
  margin: 0 auto;
}
```

---

## 2. CSS 함수 — minmax / calc / clamp

**• CSS: minmax·calc·clamp 함수**

```css
/* Grid에서 최소 200px 보장, 남는 공간은 균등 분배 */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

/* 서로 다른 단위를 섞어 계산 */
.content { width: calc(100% - 250px); } /* 사이드바 250px를 제외한 나머지 */

/* 최소~최대 사이에서 화면 비례 값 사용 */
font-size: clamp(1rem, 2.5vw, 2rem);
```

세 함수 모두 미디어쿼리 없이도 화면 크기에 맞춰 값이 자동으로 조절된다는 공통점이 있다.

---

## 3. 반응형 이미지 — max-width / srcset / picture

이미지에 고정 px를 쓰면 화면이 줄어들 때 부모 밖으로 넘치거나 레이아웃이 깨진다.

**• CSS: 이미지 최대 너비 제한**

```css
img { max-width: 100%; height: auto; } /* 부모보다 커지지 않도록 제한, 비율은 유지 */
```

### srcset — 해상도(DPR) 대응

동일한 이미지를 고해상도(레티나) 화면에서도 선명하게 보이도록 배율별로 제공한다.

**• HTML: srcset 해상도 대응**

```html
<img src="photo.jpg"
     srcset="photo.jpg 1x, photo@2x.jpg 2x, photo@3x.jpg 3x"
     alt="Photo">
```

**▶ DPR별 사용 이미지**

<table class="wda-mtable">
<thead><tr><th>기기</th><th>DPR</th><th>사용 이미지</th></tr></thead>
<tbody>
<tr><td>일반 모니터</td><td>1x</td><td>photo.jpg</td></tr>
<tr><td>레티나 디스플레이</td><td>2x</td><td>photo@2x.jpg</td></tr>
<tr><td>고해상도 스마트폰</td><td>3x</td><td>photo@3x.jpg</td></tr>
</tbody>
</table>

### picture — Art Direction

srcset이 "같은 이미지의 해상도 차이"를 해결한다면, `<picture>`는 화면 크기에 따라 **구도 자체가 다른 이미지**를 보여줄 때 쓴다(예: 데스크탑은 가로 풍경, 모바일은 세로 인물 구도).

**• HTML: picture 구도 전환**

```html
<picture>
  <source media="(min-width: 1024px)" srcset="hero-desktop.jpg">
  <source media="(min-width: 768px)" srcset="hero-tablet.jpg">
  <img src="hero-mobile.jpg" alt="Hero"> <!-- 조건이 없으면 fallback으로 사용된다 -->
</picture>
```

`<source>`는 큰 화면 조건부터 순서대로 배치하고, `<img>` 태그는 picture 미지원 브라우저를 위한 fallback이자 필수 요소이므로 반드시 포함한다. `alt` 속성은 `<source>`가 아니라 `<img>`에만 작성한다.

---

## 4. Flexbox 반응형 — flex-wrap + flex-basis

**• CSS: flex-wrap과 flex-basis 반응형**

```css
/* ❌ 줄바꿈이 없으면 좁은 화면에서 찌그러진다 */
.container { display: flex; flex-wrap: nowrap; }

/* ✅ 줄바꿈 허용 + 최소 크기 보장 */
.container { display: flex; flex-wrap: wrap; gap: 16px; }
.item { flex: 1 1 200px; } /* 최소 200px, 공간 남으면 균등 확장 */
```

`flex: 1 1 200px`는 `flex-grow:1`(남는 공간 나눠 갖기), `flex-shrink:1`(부족하면 줄어들기), `flex-basis:200px`(기본 크기)의 조합이다. 화면이 넓으면 자연스럽게 확장되고, 좁아지면 자동으로 다음 줄로 넘어간다.

---

## 5. Grid 반응형 — auto-fit + minmax()

**• CSS: auto-fit·minmax 반응형**

```css
/* ❌ 열 개수 고정 — 작은 화면에서 넘침 */
.grid { grid-template-columns: 200px 200px 200px; }

/* ✅ 화면 크기에 맞춰 열 개수 자동 조정 */
.grid {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
```

`minmax(200px, 1fr)`은 각 열이 최소 200px는 유지하면서, 남는 공간은 1fr 비율로 균등하게 나눠 갖는다는 뜻이다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">auto-fit</div>
    빈 열을 접어서 없애고, 실제 아이템이 남은 공간을 채운다. 갤러리·카드 목록처럼 아이템이 화면을 꽉 채워야 할 때 적합하다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">auto-fill</div>
    빈 열도 자리를 유지한다. 아이템 개수가 계속 변하는 리스트에서 열 구조 자체를 고정하고 싶을 때 쓴다.
  </div>
</div>

실무에서는 갤러리·카드 UI 대부분이 `auto-fit`을 사용한다.

---

## 6. Container Queries — 부모 컨테이너 크기 기준 스타일링

Media Query는 **뷰포트(화면 전체)** 크기를 기준으로 스타일을 바꾼다. 반면 Container Query는 **부모 컨테이너**의 크기를 기준으로 스타일을 바꾼다.

**▶ Media Query와 Container Query 비교**

<table class="wda-mtable">
<thead><tr><th>구분</th><th>Media Query</th><th>Container Query</th></tr></thead>
<tbody>
<tr><td>기준</td><td>뷰포트(화면 전체)</td><td>부모 컨테이너</td></tr>
<tr><td>영향 범위</td><td>페이지 전역</td><td>해당 컨테이너 내부</td></tr>
<tr><td>대표 용도</td><td>페이지 레이아웃 전환</td><td>컴포넌트 단위 반응형(사이드바 안 카드 등)</td></tr>
</tbody>
</table>

**• CSS: Container Query 적용**

```css
.card-container {
  container-type: inline-size; /* 이 선언이 없으면 @container는 작동하지 않는다 */
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 150px 1fr; /* 컨테이너가 400px 이상일 때만 가로 배치 */
  }
}
```

같은 카드 컴포넌트라도 넓은 메인 영역에 놓이면 가로형으로, 좁은 사이드바에 놓이면 세로형으로 — 뷰포트 크기와 무관하게 **자신이 속한 컨테이너의 크기**에 따라 스스로 모양을 바꿀 수 있다는 것이 Container Query의 핵심 가치다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>컨테이너 자신의 크기를 <code>@container</code>로 변화시키면 순환 참조가 발생할 수 있으니 주의한다. 또한 <code>container-type</code> 선언 없이 <code>@container</code>만 쓰면 아무 효과가 없다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><code>%</code>, <code>vw/vh</code>, <code>calc()</code>, <code>clamp()</code>는 모두 미디어쿼리 없이 화면 크기에 자동으로 반응한다.</li>
    <li>srcset은 <strong>같은 이미지의 해상도</strong> 대응, picture는 <strong>화면별로 다른 구도</strong>의 이미지 대응이다.</li>
    <li>Flexbox는 <code>flex-wrap</code> + <code>flex: 1 1 200px</code>, Grid는 <code>repeat(auto-fit, minmax(200px, 1fr))</code>로 자동 재배치한다.</li>
    <li>Container Query는 <strong>부모 컨테이너 크기</strong> 기준, Media Query는 <strong>뷰포트</strong> 기준이라는 것이 핵심 차이다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: srcset과 picture는 같은 목적으로 쓰인다?</div>
    <div class="wda-mistake-right">정답: srcset은 <strong>해상도 차이</strong>만 대응하고, picture는 화면 크기별로 <strong>완전히 다른 이미지(구도)</strong>를 보여줄 때 쓴다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: auto-fit과 auto-fill은 결과가 항상 같다?</div>
    <div class="wda-mistake-right">정답: auto-fit은 <strong>빈 열을 접어서 없애고</strong> 아이템이 공간을 채우지만, auto-fill은 <strong>빈 열도 자리를 유지</strong>한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: container-type 선언 없이도 @container를 쓸 수 있다?</div>
    <div class="wda-mistake-right">정답: <code>container-type: inline-size</code> 같은 선언이 <strong>반드시 먼저</strong> 있어야 @container가 동작한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 반응형 Grid</div>
    <div class="wda-formula-block-body"><code>repeat(auto-fit, minmax(200px,1fr))</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 반응형 Flex</div>
    <div class="wda-formula-block-body"><code>flex-wrap:wrap + flex:1 1 200px</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · Container Query</div>
    <div class="wda-formula-block-body"><code>container-type + @container</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">srcset과 picture의 근본적인 차이는?</div>
    <div class="wda-flip-back">srcset은 같은 이미지의 해상도만 다르고, picture는 화면 크기별로 완전히 다른 이미지(구도)를 제공한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">minmax(200px, 1fr)의 의미는?</div>
    <div class="wda-flip-back">각 열이 최소 200px는 유지하면서, 남는 공간은 1fr 비율로 균등하게 나눠 갖는다는 뜻이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">auto-fit과 auto-fill 중 갤러리·카드 UI에 더 적합한 것은?</div>
    <div class="wda-flip-back">auto-fit이다. 빈 열을 없애고 실제 아이템이 남은 공간을 채우기 때문이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Container Query가 Media Query와 다른 점은?</div>
    <div class="wda-flip-back">Media Query는 뷰포트(화면 전체) 크기를 기준으로 하지만, Container Query는 요소가 속한 부모 컨테이너의 크기를 기준으로 스타일이 바뀐다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">@container를 쓰기 전에 반드시 선언해야 하는 것은?</div>
    <div class="wda-flip-back">부모 요소에 container-type(예: inline-size)을 선언해야 한다.</div>
  </div>
</div>
