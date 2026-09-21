---
title: "1-3 색상과 폰트로 개성 표현하기"
category: "frontend"
section: "css"
date: "2026-08-01"
status: "completed"
description: "CSS 색상 표현 4가지 방식과 폰트·텍스트 속성, 줄바꿈 제어 속성을 정리합니다."
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
  • <strong>색상 표현 방법</strong> — Hex, RGB/RGBA, Named Colors, HSL/HSLA 네 가지 방식을 이해하고 적용합니다<br>
  • <strong>폰트 속성 다루기</strong> — font-family, size, weight, style 등 폰트 속성과 웹 폰트를 활용합니다<br>
  • <strong>텍스트 레이아웃 구성</strong> — 정렬·장식·간격 속성으로 가독성 있는 텍스트를 만듭니다<br>
  • <strong>텍스트 줄바꿈 제어</strong> — white-space, word-break, overflow-wrap으로 넘치는 텍스트를 다룹니다
</div>

---

## 1. 색상을 표현하는 4가지 방법

[이전 문서](/css/css/1-2-css-selectors)에서 원하는 요소를 골라내는 방법을 익혔다면, 이제 그 요소에 실제로 색과 글자 스타일을 입혀볼 차례다.

이 문서는 색상 표현 문법, 폰트 관련 속성, 텍스트 정렬과 줄바꿈 제어까지 시각적 표현의 핵심 요소를 다룬다. 여백과 크기 같은 박스 관련 속성은 다음 문서(박스 모델)에서 이어서 다룬다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">Hex (16진수)</div><div class="wda-fcard-dsc"><code>#RRGGBB</code> 형태. <code>#FFFFFF</code>처럼 겹치는 값은 <code>#FFF</code>로 줄여 쓸 수 있다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Named Colors</div><div class="wda-fcard-dsc"><code>navy</code>, <code>crimson</code>처럼 이름으로 지정. 직관적이지만 미세한 색 조정은 어렵다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">RGB / RGBA</div><div class="wda-fcard-dsc">빨강·초록·파랑 값과 투명도(alpha)를 함께 지정한다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">HSL / HSLA</div><div class="wda-fcard-dsc">색조(Hue)·채도(Saturation)·명도(Lightness)로 직관적인 톤 조절이 가능하다.</div></div>
</div>

**• CSS: 색상 표현 4가지 비교**

```css
.box-hex   { color: #1e88e5; }
.box-named { color: navy; }
.box-rgba  { color: rgba(30, 136, 229, 0.6); }
.box-hsla  { color: hsla(207, 82%, 51%, 0.6); }
```

RGBA와 HSLA의 마지막 값(alpha)은 0(완전 투명)부터 1(완전 불투명) 사이 숫자로 투명도를 지정한다. HSL은 같은 색조를 유지한 채 밝기나 채도만 조절하고 싶을 때 계산이 직관적이라는 장점이 있다.

색을 반투명하게 만드는 방법에는 `opacity` 속성을 쓰는 방법도 있는데, RGBA/HSLA의 alpha 값과는 적용 범위가 다르다.

**▶ opacity와 alpha 채널 비교**

<table class="wda-mtable">
<thead><tr><th>구분</th><th>적용 범위</th><th>자식 요소 영향</th><th>텍스트 영향</th><th>주 사용 목적</th></tr></thead>
<tbody>
<tr><td><code>opacity</code></td><td>요소 전체(배경+내용+자식)</td><td>함께 투명해짐</td><td>함께 투명해짐</td><td>요소 전체를 흐리게 처리</td></tr>
<tr><td><code>rgba()</code> / <code>hsla()</code></td><td>지정한 속성값 하나</td><td>영향 없음</td><td>지정 대상이 아니면 영향 없음</td><td>배경색이나 글자색만 부분적으로 투명하게</td></tr>
</tbody>
</table>

---

## 2. 글꼴 기본 설정

### 🔤 Font Family와 Font Stack

`font-family`는 사용할 서체를 지정한다. 지정한 폰트가 사용자 기기에 없을 경우를 대비해 여러 폰트를 쉼표로 나열하는 것을 Font Stack이라고 부르며, 브라우저는 앞에서부터 순서대로 사용 가능한 폰트를 찾는다.

**• CSS: Font Stack 지정**

```css
body {
  font-family: 'Noto Sans KR', Arial, sans-serif;
}
```

폰트 이름에 공백이 있으면 따옴표로 감싸야 하며, 목록의 맨 마지막에는 항상 일반적인 계열(fallback)을 지정해서 지정한 폰트가 전혀 없을 때도 비슷한 느낌의 글꼴이 나오도록 한다.

**▶ Generic Family 종류**

<table class="wda-mtable">
<thead><tr><th>Generic Family</th><th>특징</th></tr></thead>
<tbody>
<tr><td><code>serif</code></td><td>글자 끝에 삐침이 있는 명조 계열, 인쇄물 느낌</td></tr>
<tr><td><code>sans-serif</code></td><td>삐침이 없는 고딕 계열, 화면 가독성이 좋아 본문에 많이 사용</td></tr>
<tr><td><code>monospace</code></td><td>모든 글자 폭이 동일, 코드 표시에 사용</td></tr>
<tr><td><code>cursive</code></td><td>손글씨 느낌의 필기체</td></tr>
<tr><td><code>fantasy</code></td><td>장식적인 느낌의 폰트</td></tr>
</tbody>
</table>

**• CSS: 상황별 폰트 스택**

```css
/* 한국어 본문 */
font-family: 'Noto Sans KR', sans-serif;

/* 영문 본문 */
font-family: 'Roboto', Arial, sans-serif;

/* 코드 표시 */
font-family: 'JetBrains Mono', 'Fira Code', monospace;
```

### 📏 Font Size

**▶ 폰트 크기 단위(px/em/rem/%) 비교**

<table class="wda-mtable">
<thead><tr><th>단위</th><th>기준</th><th>특징</th></tr></thead>
<tbody>
<tr><td><code>px</code></td><td>절대 단위</td><td>화면 크기와 무관하게 항상 같은 크기</td></tr>
<tr><td><code>em</code></td><td>부모 요소의 font-size 기준</td><td>중첩될수록 계산이 누적되어 예측이 어려울 수 있음</td></tr>
<tr><td><code>rem</code></td><td><code>html</code>(root) 요소의 font-size 기준</td><td>항상 같은 기준으로 계산되어 예측 가능</td></tr>
<tr><td><code>%</code></td><td>부모 요소 대비 비율</td><td>부모 값에 따라 유동적으로 변함</td></tr>
</tbody>
</table>

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>실무에서는 <code>rem</code> 사용을 권장한다. <code>em</code>은 중첩된 요소마다 부모의 크기를 곱해가며 계산되어 실제 크기를 예측하기 어렵지만, <code>rem</code>은 항상 <code>html</code>의 font-size 하나만 기준으로 계산되기 때문에 일관성 있게 관리할 수 있다.</p>
</div>

### 🅱️ Font Weight, Style, Variant

**• CSS: Font Weight와 Style**

```css
.title {
  font-weight: 700;   /* 굵게, 숫자로는 100~900 */
  font-style: italic; /* normal, italic, oblique */
}
```

`font-weight`는 보통 `400`(기본)과 `700`(굵게)을 가장 많이 사용하며, `100`부터 `900`까지 100 단위로 세밀하게 조절할 수도 있다. 다만 너무 얇은 값(100, 200)은 화면에서 잘 보이지 않을 수 있어 본문에는 지양한다.

`font-style: italic`은 주로 인용문처럼 제한된 용도에만 사용한다. `font-variant: small-caps`는 소문자를 작은 대문자 모양으로 바꾸는 효과인데, 한글에는 적용되는 개념이 아니라서 한국어 문서에서는 거의 사용하지 않는다.

---

## 3. Google Fonts와 @font-face

### 📁 Google Fonts

Google Fonts는 무료로 제공되는 1,600종 이상의 웹 폰트를 CDN 방식으로 손쉽게 불러올 수 있는 서비스다. `Noto Sans KR`, `Noto Serif KR`, `Black Han Sans`, `Jua`, `Gamja Flower` 등 한글 폰트도 다양하게 제공한다.

**• Google Fonts 연결**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap" rel="stylesheet">
```

**• 폰트 적용**

```css
body {
  font-family: 'Noto Sans KR', sans-serif;
}
```

`preconnect`는 폰트 서버와 미리 연결을 맺어 로딩 속도를 높이는 역할을 한다. URL의 `wght@400;700`처럼 필요한 굵기만 지정하면 불필요한 폰트 파일까지 내려받지 않아 성능에 유리하다.

### 📁 @font-face

직접 보유한 폰트 파일을 서버에 올려 사용하고 싶을 때는 `@font-face`로 폰트를 정의한다.

**• CSS: @font-face 정의**

```css
@font-face {
  font-family: 'MyBrandFont';
  src: url('/fonts/mybrandfont.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

body {
  font-family: 'MyBrandFont', sans-serif;
}
```

`font-display: swap`은 폰트가 로딩되는 동안 대체 폰트를 먼저 보여주고, 로딩이 끝나면 지정한 폰트로 자연스럽게 바꿔주는 옵션이다. 여러 굵기를 쓰려면 `font-weight`가 다른 `@font-face` 블록을 굵기별로 각각 선언해야 한다.

Google Fonts에 비해 관리는 번거롭지만, 외부 서비스에 의존하지 않고 원하는 폰트를 자유롭게 쓸 수 있다는 장점이 있다.

---

## 4. 텍스트 스타일링

**▶ 텍스트 스타일링 속성**

<table class="wda-mtable">
<thead><tr><th>속성</th><th>주요 값</th><th>설명</th></tr></thead>
<tbody>
<tr><td><code>text-align</code></td><td>left, center, right, justify</td><td>텍스트 정렬 방향을 지정한다</td></tr>
<tr><td><code>text-decoration</code></td><td>none, underline, overline, line-through</td><td>밑줄·윗줄·취소선을 지정한다</td></tr>
<tr><td><code>text-transform</code></td><td>none, uppercase, lowercase, capitalize</td><td>영문 대소문자 표기를 변환한다</td></tr>
<tr><td><code>line-height</code></td><td>단위 없는 숫자 (예: 1.6)</td><td>줄 간격을 지정한다</td></tr>
<tr><td><code>letter-spacing</code> / <code>word-spacing</code></td><td>px, em 등</td><td>글자 사이, 단어 사이 간격을 지정한다</td></tr>
</tbody>
</table>

**• CSS: 링크 밑줄 제어**

```css
a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
```

`line-height`는 단위 없는 숫자로 지정하는 것이 권장되며, 본문 텍스트는 `1.6`~`1.8` 정도가 읽기 편하다. `letter-spacing`은 제목처럼 큰 글자에서 자간을 살짝 넓혀 시원한 느낌을 주는 데 자주 쓰이고, 본문에서는 기본값을 유지하는 것이 가독성에 좋다.

**• CSS: 자간 조정**

```css
.title {
  letter-spacing: 0.05em;
}
```

`text-shadow`는 텍스트에 그림자를 넣는 속성으로 `x축 오프셋 y축 오프셋 흐림 정도 색상` 순서로 값을 지정한다.

**• CSS: 네온 텍스트 그림자**

```css
.neon {
  text-shadow: 0 0 4px #fff, 0 0 10px #6c5ce7, 0 0 20px #6c5ce7;
}
```

쉼표로 여러 그림자를 겹쳐서 발광 효과, 입체 효과, 네온 효과 같은 다양한 연출을 만들 수 있다.

---

## 5. 공백과 줄바꿈 제어

한 줄에 다 들어가지 않는 긴 텍스트를 어떻게 처리할지는 `white-space`, `word-break`, `overflow-wrap` 세 속성이 함께 결정한다.

### 📏 white-space

**▶ white-space 값별 동작 비교**

<table class="wda-mtable">
<thead><tr><th>값</th><th>공백</th><th>줄바꿈 문자</th><th>자동 줄바꿈</th></tr></thead>
<tbody>
<tr><td><code>normal</code></td><td>합쳐짐</td><td>무시됨</td><td>됨 (기본값)</td></tr>
<tr><td><code>nowrap</code></td><td>합쳐짐</td><td>무시됨</td><td>안 됨(한 줄 유지)</td></tr>
<tr><td><code>pre</code></td><td>그대로 유지</td><td>그대로 반영</td><td>안 됨</td></tr>
<tr><td><code>pre-wrap</code></td><td>그대로 유지</td><td>그대로 반영</td><td>됨</td></tr>
<tr><td><code>pre-line</code></td><td>합쳐짐</td><td>그대로 반영</td><td>됨</td></tr>
</tbody>
</table>

한 줄로 말줄임표를 만드는 패턴은 `nowrap`으로 줄바꿈을 막고, `overflow: hidden`으로 넘치는 부분을 자르고, `text-overflow: ellipsis`로 잘린 자리에 말줄임 기호를 표시하는 세 속성을 함께 사용해야 완성된다.

**• CSS: 말줄임표 처리**

```css
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

### 🎛️ word-break

**▶ word-break 값별 동작 비교**

<table class="wda-mtable">
<thead><tr><th>값</th><th>동작</th></tr></thead>
<tbody>
<tr><td><code>normal</code></td><td>기본 규칙대로 단어 단위로 줄바꿈</td></tr>
<tr><td><code>break-all</code></td><td>단어 중간이라도 글자 단위로 강제 줄바꿈 (영어 단어도 잘림)</td></tr>
<tr><td><code>keep-all</code></td><td>한글 단어 단위 줄바꿈을 유지 (한글 어절이 잘리지 않음)</td></tr>
</tbody>
</table>

긴 URL처럼 끊어질 지점이 없는 영문 텍스트에는 `break-all`이 유용하고, 한글 문장에는 어절이 임의로 잘리지 않도록 `keep-all`을 사용하는 것이 자연스럽다.

### ✂️ overflow-wrap

`overflow-wrap`은 `word-break`와 비슷해 보이지만 동작 기준이 다르다.

`word-break: break-all`은 정상적인 줄바꿈 지점이 있어도 무시하고 무조건 글자 단위로 끊지만, `overflow-wrap: break-word`는 컨테이너를 벗어날 만큼 긴 단어가 있을 때만 예외적으로 끊는다.

**▶ word-break와 overflow-wrap 비교**

<table class="wda-mtable">
<thead><tr><th>속성</th><th>끊는 기준</th></tr></thead>
<tbody>
<tr><td><code>word-break: break-all</code></td><td>글자 단위로 무조건 끊음</td></tr>
<tr><td><code>overflow-wrap: break-word</code></td><td>넘칠 때만 예외적으로 끊음</td></tr>
</tbody>
</table>

한글과 영문이 섞인 본문에는 `word-break: keep-all`과 `overflow-wrap: break-word`를 함께 쓰는 조합이 널리 권장된다. 한글은 어절 단위를 지키고, 너무 긴 영문 단어나 URL만 예외적으로 끊어준다.

**• CSS: 한글·영문 혼용 줄바꿈**

```css
.article {
  word-break: keep-all;
  overflow-wrap: break-word;
  line-height: 1.7;
}
```

**💡 설명**

<div class="wda-callout wda-ci">
  <p>정리하면 텍스트 줄바꿈 제어는 <strong>공백 처리(white-space)</strong>, <strong>단어 끊기 방식(word-break)</strong>, <strong>넘침 시 예외 처리(overflow-wrap)</strong> 세 축으로 나누어 생각하면 된다. 코드블록은 <code>white-space: pre</code>로 공백과 줄바꿈을 그대로 보존하고, 입력 폼처럼 한 줄을 유지해야 하는 곳은 <code>nowrap</code> 계열을, 본문처럼 자연스럽게 읽혀야 하는 곳은 <code>keep-all</code> + <code>break-word</code> 조합을 사용한다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>색상은 <strong>Hex, Named, RGB/RGBA, HSL/HSLA</strong> 네 가지 방식으로 표현할 수 있다.</li>
    <li>글자 크기는 <strong>rem</strong> 단위를 우선 고려하는 것이 예측 가능하고 관리하기 쉽다.</li>
    <li>Google Fonts는 <code>&lt;link&gt;</code> 태그로, 직접 보유한 폰트는 <code>@font-face</code>로 적용한다.</li>
    <li>한 줄 말줄임표는 <strong>nowrap + overflow:hidden + text-overflow:ellipsis</strong> 세 속성이 함께 있어야 완성된다.</li>
    <li>한글 본문은 <strong>word-break: keep-all + overflow-wrap: break-word</strong> 조합을 권장한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: opacity와 rgba의 투명도는 완전히 같은 효과다?</div>
    <div class="wda-mistake-right">정답: <code>opacity</code>는 <strong>요소 전체(자식 포함)</strong>를 투명하게 하지만, <code>rgba</code>는 <strong>지정한 속성값 하나</strong>에만 투명도가 적용된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: word-break: break-all과 overflow-wrap: break-word는 같은 기능이다?</div>
    <div class="wda-mistake-right">정답: <code>break-all</code>은 <strong>무조건</strong> 글자 단위로 끊지만, <code>overflow-wrap: break-word</code>는 <strong>넘칠 때만 예외적으로</strong> 끊는다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: em과 rem은 같은 기준으로 계산된다?</div>
    <div class="wda-mistake-right">정답: <code>em</code>은 <strong>부모 요소</strong> 기준, <code>rem</code>은 <strong>html(root) 요소</strong> 기준으로 계산되어 결과가 달라질 수 있다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 투명 색상</div>
    <div class="wda-formula-block-body"><code>rgba(R,G,B,alpha)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 말줄임표</div>
    <div class="wda-formula-block-body"><code>nowrap + hidden + ellipsis</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 한글 본문 줄바꿈</div>
    <div class="wda-formula-block-body"><code>keep-all + break-word</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">투명도를 포함한 색상 표현 방식은?</div>
    <div class="wda-flip-back">RGBA (또는 HSLA)다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Google Fonts를 HTML에 적용하는 방법은?</div>
    <div class="wda-flip-back"><code>&lt;link&gt;</code> 태그로 폰트 CSS 파일을 연결한 뒤 font-family로 지정한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">text-shadow의 세 번째 값이 의미하는 것은?</div>
    <div class="wda-flip-back">흐림 정도(blur-radius)다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">word-break: break-all의 효과는?</div>
    <div class="wda-flip-back">단어 중간이라도 모든 글자에서 강제로 줄바꿈이 가능해진다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">rem 단위가 em보다 예측하기 쉬운 이유는?</div>
    <div class="wda-flip-back">항상 html(root) 요소 하나만 기준으로 계산되기 때문이다.</div>
  </div>
</div>
