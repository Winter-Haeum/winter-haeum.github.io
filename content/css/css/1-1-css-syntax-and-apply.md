---
title: "1-1 CSS 문법과 적용 방법"
category: "frontend"
section: "css"
date: "2026-08-01"
status: "completed"
description: "CSS 기본 문법 구조와 세 가지 적용 방법, 우선순위 점수 규칙을 정리합니다."
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
  • <strong>CSS 문법 구조</strong> — 선택자·속성·값의 기본 형태를 이해하고 올바르게 작성할 수 있습니다<br>
  • <strong>적용 방법 비교</strong> — 인라인·내부·외부 스타일 3가지의 장단점을 구분하고 상황에 맞게 선택할 수 있습니다<br>
  • <strong>우선순위 규칙</strong> — 점수 기반 계산법과 Cascading 원리로 스타일 충돌을 해결할 수 있습니다<br>
  • <strong>!important 주의사항</strong> — 동작 원리를 이해하고, 가능하면 선택자 점수를 높이는 방식으로 대체할 수 있습니다
</div>

---

## 1. CSS란 무엇인가

HTML로 문서의 뼈대와 내용을 만들었다면, 이제 그 위에 색과 여백, 배치를 입힐 차례다. CSS(Cascading Style Sheets)는 HTML 요소가 화면에 어떻게 보일지 결정하는 언어다.

이 문서에서는 CSS 코드를 어디에 작성하고, 어떤 형태로 써야 하며, 여러 스타일이 충돌할 때 브라우저가 무엇을 기준으로 우선순위를 정하는지를 다룬다. 구체적인 선택자 문법과 색상·폰트 속성은 다음 문서들에서 이어서 다룬다.

CSS는 HTML 요소의 모양과 배치를 정의하는 스타일 언어다. HTML이 "무엇이 있는지"를 표현한다면, CSS는 "그것이 어떻게 보이는지"를 표현한다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">색상 지정</div><div class="wda-fcard-dsc">텍스트와 배경에 색을 입힌다</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">폰트 설정</div><div class="wda-fcard-dsc">글자 크기, 굵기, 서체를 조정한다</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">여백·간격 조절</div><div class="wda-fcard-dsc">요소 사이 거리와 안쪽 공간을 관리한다</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">레이아웃 배치</div><div class="wda-fcard-dsc">요소를 원하는 위치에 정렬한다</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">애니메이션 효과</div><div class="wda-fcard-dsc">움직임과 전환 효과를 만든다</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">반응형 웹 구현</div><div class="wda-fcard-dsc">화면 크기에 따라 다르게 보이도록 만든다</div></div>
</div>

CSS가 없는 HTML 문서는 위에서 아래로 내용이 순서대로 나열될 뿐, 글자 크기·색·배치가 모두 브라우저 기본값 그대로 표시된다. CSS를 적용하면 같은 HTML이라도 완전히 다른 인상의 화면으로 바뀐다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">CSS 적용 전</div>
    검은 글자, 기본 폰트, 좌측 정렬만 존재한다. 제목과 본문의 시각적 구분이 폰트 크기 차이 정도에 그친다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">CSS 적용 후</div>
    색상·여백·정렬·레이아웃이 의도한 대로 구성되어 정보의 우선순위와 흐름이 시각적으로 드러난다.
  </div>
</div>

---

## 2. CSS 기본 문법 구조

CSS 코드는 "어떤 요소에(선택자) 어떤 스타일을(속성과 값) 적용할지"를 규칙으로 작성한다.

**• 선택자 기본 구조**

```css
선택자 {
  속성: 값;
}
```

**• 실제 적용 예**

```css
p {
  color: navy;
  font-size: 16px;
}
```

이 규칙에서 지켜야 할 문법은 다음과 같다.

**▶ 중괄호·콜론·세미콜론·주석 역할**

<table class="wda-mtable">
<thead><tr><th>요소</th><th>규칙</th></tr></thead>
<tbody>
<tr><td>중괄호 <code>{ }</code></td><td>스타일 선언을 감싸는 범위다. 여는 중괄호와 닫는 중괄호가 반드시 한 쌍이어야 한다.</td></tr>
<tr><td>콜론 <code>:</code></td><td>속성과 값을 구분한다.</td></tr>
<tr><td>세미콜론 <code>;</code></td><td>선언 하나가 끝났음을 표시한다. 마지막 선언 뒤에도 붙이는 습관을 들이는 것이 안전하다.</td></tr>
<tr><td>주석 <code>/* */</code></td><td>코드 설명이나 임시 비활성화에 사용한다. 자바스크립트의 <code>//</code>는 CSS에서 지원하지 않는다.</td></tr>
</tbody>
</table>

**• CSS: 주석과 임시 비활성화**

```css
/* 이 블록은 본문 문단의 기본 스타일이다 */
p {
  color: navy;
  /* font-size: 20px; 임시로 비활성화 */
}
```

---

## 3. CSS를 적용하는 세 가지 방법

같은 스타일이라도 어디에 작성하느냐에 따라 인라인, 내부, 외부 스타일로 나뉜다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">① 인라인 스타일</div><div class="wda-fcard-dsc">태그의 <code>style</code> 속성에 직접 작성</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">② 내부 스타일</div><div class="wda-fcard-dsc"><code>&lt;style&gt;</code> 태그 안에 작성</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">③ 외부 스타일</div><div class="wda-fcard-dsc">별도의 <code>.css</code> 파일에 작성 후 연결</div></div>
</div>

### 🎨 인라인 스타일

**• HTML: 인라인 스타일 작성**

```html
<p style="color: navy; font-size: 16px;">안녕하세요</p>
```

해당 요소 하나에만 즉시 적용된다는 장점이 있지만, HTML과 스타일 코드가 뒤섞여 유지보수가 어렵고 재사용이 불가능하다. 우선순위가 1000점으로 가장 높아서 다른 스타일을 강제로 덮어써 버리는 부작용도 있다.

실무에서는 자바스크립트로 동적 스타일을 잠깐 넣는 경우를 제외하면 거의 사용하지 않는다.

### 📄 내부 스타일

**• HTML: 내부 스타일 작성**

```html
<head>
  <style>
    p {
      color: navy;
      font-size: 16px;
    }
  </style>
</head>
```

HTML 문서 하나 안에서 여러 요소에 스타일을 재사용할 수 있다. 단일 페이지로 이루어진 간단한 예제나 이메일 템플릿처럼 파일을 여러 개로 나눌 필요가 없는 경우에 적합하다.

다만 페이지가 여러 개로 늘어나면 같은 스타일 코드를 각 문서마다 반복해서 작성해야 하는 단점이 있다.

### 📁 외부 스타일

**• HTML에서 외부 CSS 연결**

```html
<head>
  <link rel="stylesheet" href="styles.css">
</head>
```

**• 연결된 CSS 파일 내용**

```css
/* styles.css */
p {
  color: navy;
  font-size: 16px;
}
```

`rel` 속성은 연결된 문서와 현재 문서의 관계를 나타내고, `href`는 연결할 파일의 경로를 가리킨다.

`rel="stylesheet"` 외에도 `icon`(파비콘), `preconnect`(사전 연결), `preload`(미리 불러오기), `canonical`(대표 URL 지정) 같은 값이 있다.

여러 HTML 문서가 하나의 CSS 파일을 공유할 수 있어 유지보수가 가장 쉽고, 브라우저 캐싱 덕분에 성능에도 유리하다. 실무에서 가장 널리 쓰이는 방식이다.

**▶ 인라인·내부·외부 스타일 비교**

<table class="wda-mtable">
<thead><tr><th>방식</th><th>재사용성</th><th>유지보수</th><th>우선순위</th><th>실무 사용</th></tr></thead>
<tbody>
<tr><td>인라인 스타일</td><td>불가능</td><td>어려움</td><td>1000점(최고)</td><td>거의 사용 안 함</td></tr>
<tr><td>내부 스타일</td><td>문서 내에서만</td><td>보통</td><td>선택자 점수대로</td><td>단일 페이지에 한정적 사용</td></tr>
<tr><td>외부 스타일</td><td>여러 문서에서 가능</td><td>가장 좋음</td><td>선택자 점수대로</td><td>가장 널리 사용</td></tr>
</tbody>
</table>

---

## 4. CSS 우선순위 규칙

한 요소에 여러 스타일 규칙이 동시에 적용되면, 브라우저는 각 규칙의 "점수"를 계산해서 가장 높은 점수의 규칙을 최종 적용한다.

**▶ 선택자별 우선순위 점수**

<table class="wda-mtable">
<thead><tr><th>선택자 종류</th><th>점수</th></tr></thead>
<tbody>
<tr><td>인라인 스타일</td><td>1000점</td></tr>
<tr><td>ID 선택자 (<code>#id</code>)</td><td>100점</td></tr>
<tr><td>클래스·속성·가상클래스 선택자 (<code>.class</code>, <code>[attr]</code>, <code>:hover</code>)</td><td>10점</td></tr>
<tr><td>태그 선택자 (<code>p</code>, <code>div</code>)</td><td>1점</td></tr>
</tbody>
</table>

복합 선택자는 구성 요소의 점수를 모두 더한다.

**• CSS: 선택자 점수 계산**

```css
#header .title p {
  /* 100 + 10 + 1 = 111점 */
}

.nav .menu li {
  /* 10 + 10 + 1 = 21점 */
}
```

점수가 같은 규칙이 여러 개 있으면, 나중에 작성된 규칙이 이긴다. 이를 Cascading(계단식 적용) 규칙이라고 부른다.

**• CSS: Cascading 동점 규칙**

```css
p { color: navy; }
p { color: crimson; } /* 점수가 같으므로 이 규칙이 최종 승리 */
```

### !important

`!important`를 붙인 선언은 선택자 점수를 무시하고 항상 최우선으로 적용된다.

**• CSS: !important 사용**

```css
p {
  color: crimson !important;
}
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><code>!important</code>는 편리해 보이지만 남발하면 나중에 그보다 더 강한 스타일을 덮어써야 할 때 <code>!important</code>를 또 붙이는 악순환이 생긴다. 우선순위 구조 자체가 무너지면 어떤 스타일이 왜 적용되는지 추적하기 어려워진다.</p>
  <p>정말 불가피한 예외 상황(외부 라이브러리 스타일을 강제로 덮어써야 하는 경우 등)이 아니라면, 선택자에 클래스나 ID를 추가해서 점수를 높이는 방식으로 해결하는 것이 바람직하다.</p>
</div>

---

## 5. 기본 스타일 속성 살짝 맛보기

앞으로 자주 만나게 될 속성들을 먼저 이름만 익혀두면 좋다.

**▶ 기본 스타일 속성 미리보기**

<table class="wda-mtable">
<thead><tr><th>속성</th><th>역할</th></tr></thead>
<tbody>
<tr><td><code>width</code> / <code>height</code></td><td>요소의 너비와 높이를 지정한다</td></tr>
<tr><td><code>margin</code> / <code>padding</code></td><td>바깥 여백과 안쪽 여백을 지정한다 (마진의 '마', 패딩의 '패' — "마패"로 순서를 외우면 기억하기 쉽다)</td></tr>
<tr><td><code>border</code> / <code>border-radius</code></td><td>테두리와 모서리 둥글기를 지정한다</td></tr>
<tr><td><code>color</code> / <code>background-color</code></td><td>글자 색과 배경 색을 지정한다</td></tr>
<tr><td><code>font-size</code> / <code>font-weight</code> / <code>font-family</code></td><td>글자 크기, 굵기, 서체를 지정한다</td></tr>
</tbody>
</table>

각 속성의 자세한 사용법은 이후 문서(박스 모델, 색상과 폰트)에서 하나씩 다룬다.

---

## 6. 브라우저 기본 스타일 초기화

브라우저마다 `h1`, `ul`, `button` 같은 태그에 기본으로 적용하는 여백과 크기가 조금씩 다르다. 이 차이를 없애고 모든 브라우저에서 같은 출발선에서 시작하기 위해 초기화 스타일시트를 사용한다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">reset.css</div>
    모든 요소의 여백·크기·스타일을 0에 가깝게 완전히 초기화한다. 브라우저 차이를 확실히 없앨 수 있지만, 이후 필요한 스타일을 전부 새로 지정해야 하는 작업량이 늘어난다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">normalize.css</div>
    브라우저마다 다른 부분만 골라 일관되게 맞추고, 유용한 기본 스타일은 유지한다. reset보다 작업량이 적어 실무에서 더 널리 쓰인다.
  </div>
</div>

**• reset.css**

```css
/* reset.css 예시 일부 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

**• normalize.css**

```css
/* normalize.css 예시 일부: 브라우저 간 차이만 보정 */
button {
  font-family: inherit;
}
```

적용 방법은 파일 다운로드 후 직접 연결, CDN 링크 사용, npm 패키지 설치 세 가지가 있다.

**• HTML: CDN으로 연결**

```html
<!-- CDN 방식 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>reset.css와 normalize.css를 동시에 적용하면 서로 다른 방향으로 스타일을 초기화하면서 충돌이 생길 수 있다. 둘 중 하나만 선택해서 사용해야 한다. 또한 부트스트랩 같은 CSS 프레임워크는 내부에 자체 초기화 스타일을 이미 포함하고 있는 경우가 많으므로, 프레임워크를 쓸 때는 별도의 초기화 스타일시트를 중복으로 넣지 않도록 주의한다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>CSS 문법은 <strong>선택자 { 속성: 값; }</strong> 구조를 따른다.</li>
    <li>적용 방법은 <strong>인라인·내부·외부</strong> 세 가지이며, 실무에서는 <strong>외부 스타일</strong>을 가장 많이 사용한다.</li>
    <li>우선순위는 <strong>인라인(1000) &gt; ID(100) &gt; 클래스(10) &gt; 태그(1)</strong> 순으로 점수를 계산한다.</li>
    <li>점수가 같으면 <strong>나중에 작성된 규칙</strong>이 이긴다(Cascading).</li>
    <li><code>!important</code>는 점수를 무시하고 최우선 적용되지만, <strong>남발하지 않는 것</strong>이 좋다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 인라인 스타일이 가장 편하니 실무에서도 자주 쓴다?</div>
    <div class="wda-mistake-right">정답: 인라인 스타일은 우선순위는 가장 높지만 <strong>재사용이 불가능하고 유지보수가 어려워</strong> 실무에서는 거의 쓰지 않는다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: <code>!important</code>를 쓰면 우선순위 문제를 깔끔하게 해결할 수 있다?</div>
    <div class="wda-mistake-right">정답: <code>!important</code>는 임시방편일 뿐이며, <strong>선택자 점수를 높이는 방식</strong>으로 해결하는 것이 더 안전하다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: reset.css와 normalize.css는 같이 쓸수록 더 확실하게 초기화된다?</div>
    <div class="wda-mistake-right">정답: 둘은 서로 다른 방식으로 동작하므로 <strong>동시에 사용하면 충돌</strong>할 수 있어 하나만 선택해야 한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 문법</div>
    <div class="wda-formula-block-body"><code>선택자 { 속성: 값; }</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 점수</div>
    <div class="wda-formula-block-body"><code>인라인1000 &gt; ID100 &gt; 클래스10 &gt; 태그1</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 동점 규칙</div>
    <div class="wda-formula-block-body"><code>점수 같으면 나중 선언 승리</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">CSS 기본 문법 구조의 순서는?</div>
    <div class="wda-flip-back">선택자, 중괄호, 속성, 콜론, 값, 세미콜론 순서로 작성한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">세 가지 적용 방법 중 우선순위가 가장 높은 것은?</div>
    <div class="wda-flip-back">인라인 스타일이며 점수는 1000점이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">ID 선택자의 점수는?</div>
    <div class="wda-flip-back">100점이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front"><code>!important</code>는 실무에서 적극 권장되는가?</div>
    <div class="wda-flip-back">아니다. 우선순위 구조를 무너뜨릴 수 있어 지양하고, 선택자 점수를 높이는 방식을 우선 고려해야 한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">reset.css와 normalize.css의 차이는?</div>
    <div class="wda-flip-back">reset은 모든 스타일을 완전히 초기화하고, normalize는 브라우저 간 차이만 보정한다.</div>
  </div>
</div>
