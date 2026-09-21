---
title: "2-3 가상 요소로 꾸미기 요소 추가하기"
category: "frontend"
section: "css"
date: "2026-08-01"
status: "completed"
description: "::before, ::after로 존재하지 않던 요소를 만들고, content 속성과 텍스트 전용 가상 요소로 아이콘·말풍선 같은 실전 UI를 꾸미는 방법을 정리합니다."
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
  • <strong>가상 요소 개념 이해</strong> — <code>::before</code>, <code>::after</code>가 HTML에 없는 요소를 CSS로 생성한다는 점을 가상 클래스와 구분해서 이해합니다<br>
  • <strong>content 속성 완전 정복</strong> — 문자열, 빈 문자열, <code>attr()</code>, <code>url()</code> 네 가지 값 형태를 상황에 맞게 씁니다<br>
  • <strong>텍스트 전용 가상 요소 활용</strong> — <code>::first-letter</code>, <code>::first-line</code>, <code>::selection</code>으로 드롭캡과 선택 영역을 꾸밉니다<br>
  • <strong>실전 UI 패턴 적용</strong> — 체크 아이콘, 외부 링크 화살표, 말풍선 툴팁 같은 실무 패턴을 직접 구현합니다
</div>

---

## 1. 가상 요소란 무엇인가

[이전 문서](/css/css/2-2-pseudo-classes)에서 콜론 1개짜리 가상 클래스로 요소의 상태를 다뤘다면, 이 문서는 콜론 2개짜리 가상 요소로 HTML에는 없는 새로운 요소를 CSS만으로 만들어내는 방법을 다룬다.

아이콘 추가, 말풍선 툴팁, 배지, 구분선처럼 마크업을 늘리지 않고도 꾸밀 수 있는 실전 패턴 위주로 정리한다.

가상 요소(pseudo-element)는 HTML 문서에는 실제로 존재하지 않지만, CSS가 렌더링 시점에 새로 만들어 화면에 그려 넣는 요소다.

개발자 도구로 확인해보면 실제 DOM 트리 안에는 없고, Elements 패널에 회색 글씨의 `::before`, `::after`처럼 별도로 표시되는 것을 볼 수 있다.

**▶ 가상 요소 종류와 기능**

<table class="wda-mtable">
<thead><tr><th>가상 요소</th><th>기능</th></tr></thead>
<tbody>
<tr><td><code>::before</code></td><td>요소의 콘텐츠 맨 앞에 새 요소를 삽입</td></tr>
<tr><td><code>::after</code></td><td>요소의 콘텐츠 맨 뒤에 새 요소를 삽입</td></tr>
<tr><td><code>::first-letter</code></td><td>텍스트의 첫 글자만 별도로 스타일링</td></tr>
<tr><td><code>::first-line</code></td><td>렌더링된 첫 줄만 별도로 스타일링</td></tr>
<tr><td><code>::selection</code></td><td>사용자가 드래그로 선택한 영역의 스타일 변경</td></tr>
</tbody>
</table>

가상 요소를 다룰 때 꼭 기억해야 할 핵심 규칙 네 가지가 있다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">콜론 2개</div><div class="wda-fcard-dsc"><code>::before</code>처럼 항상 콜론을 두 번 쓴다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">content 필수</div><div class="wda-fcard-dsc"><code>::before</code>, <code>::after</code>는 <code>content</code> 값이 없으면 화면에 나타나지 않는다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">DOM에 없음</div><div class="wda-fcard-dsc">JavaScript로 <code>querySelector</code> 등으로 접근할 수 없다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">CSS로만 접근</div><div class="wda-fcard-dsc">오직 CSS 선택자를 통해서만 존재하고 스타일링된다.</div></div>
</div>

**▶ 가상 클래스와 가상 요소 비교**

<table class="wda-mtable">
<thead><tr><th>구분</th><th>표기</th><th>역할</th></tr></thead>
<tbody>
<tr><td>가상 클래스</td><td>콜론 1개 (<code>:</code>)</td><td>이미 존재하는 요소의 <strong>상태</strong>를 선택</td></tr>
<tr><td>가상 요소</td><td>콜론 2개 (<code>::</code>)</td><td>존재하지 않던 <strong>새 요소를 생성</strong></td></tr>
</tbody>
</table>

---

## 2. ::before와 ::after

### ✨ ::before — 요소 앞에 추가하기

**• CSS: ::before 기본 사용**

```css
.item::before {
  content: "★ ";
  color: gold;
}
```

`content` 속성에는 4가지 종류의 값을 넣을 수 있다.

**▶ content 속성 값 형태**

<table class="wda-mtable">
<thead><tr><th>값 형태</th><th>예시</th><th>결과</th></tr></thead>
<tbody>
<tr><td>문자열</td><td><code>content: "NEW";</code></td><td>지정한 텍스트가 그대로 삽입됨</td></tr>
<tr><td>빈 문자열</td><td><code>content: "";</code></td><td>텍스트 없이 빈 상자만 생성, 도형·구분선에 활용</td></tr>
<tr><td><code>attr()</code></td><td><code>content: attr(data-label);</code></td><td>해당 요소의 속성값을 그대로 가져와 표시</td></tr>
<tr><td><code>url()</code></td><td><code>content: url(icon.svg);</code></td><td>이미지 파일을 콘텐츠로 삽입</td></tr>
</tbody>
</table>

`::before`로 생성된 요소는 HTML 수정 없이도 아이콘을 붙일 수 있고, 대상 요소의 <strong>첫 번째 자식</strong>처럼 삽입되며, 기본 `display` 값은 `inline`이다. `position: absolute`를 주면 부모를 기준으로 자유롭게 배치할 수도 있다.

**• HTML 속성**

```html
<span data-label="필수">이름</span>
```

**• attr() 값 가져오기**

```css
[data-label]::before {
  content: attr(data-label) " · ";
  color: #f59e0b;
  font-size: 0.75rem;
}
```

### ✨ ::after — 요소 뒤에 추가하기

`::before`와 문법은 동일하지만 콘텐츠 맨 뒤에 삽입된다는 점만 다르다. 과거에는 float으로 인한 레이아웃 붕괴를 막는 clearfix 패턴에 자주 쓰였다.

**• CSS: clearfix 패턴**

```css
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
```

외부 링크 뒤에 화살표 아이콘을 붙이는 것도 흔한 활용이다.

**• CSS: 외부 링크 화살표 추가**

```css
a[target="_blank"]::after {
  content: " ↗";
  font-size: 0.85em;
}
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">::before</div>
    요소 콘텐츠의 <strong>맨 앞</strong>에 삽입된다. 라벨, 체크마크, 장식용 도형에 주로 사용한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">::after</div>
    요소 콘텐츠의 <strong>맨 뒤</strong>에 삽입된다. 화살표, 말풍선 꼬리, clearfix에 주로 사용한다.
  </div>
</div>

---

## 3. content 속성 완전정복

**▶ content 값 종류별 특징**

<table class="wda-mtable">
<thead><tr><th>종류</th><th>특징</th><th>예시</th></tr></thead>
<tbody>
<tr><td>문자열 콘텐츠</td><td>따옴표로 감싼 고정 텍스트를 그대로 삽입</td><td><code>content: "NEW";</code></td></tr>
<tr><td>빈 문자열 콘텐츠</td><td>텍스트는 없지만 요소 자체는 생성됨. width/height/background로 도형처럼 활용</td><td><code>content: "";</code></td></tr>
<tr><td>속성값 콘텐츠</td><td><code>attr()</code>로 같은 요소의 속성값을 읽어와 텍스트로 표시</td><td><code>content: attr(title);</code></td></tr>
<tr><td>이미지 콘텐츠</td><td><code>url()</code>로 이미지 파일을 콘텐츠 자리에 삽입</td><td><code>content: url(check.svg);</code></td></tr>
</tbody>
</table>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><code>content: attr(...)</code>는 <strong>텍스트 값만</strong> 가져올 수 있다. 색상이나 크기 같은 CSS 값을 속성에서 끌어오는 것은 <code>attr()</code>의 기본 문법으로는 지원하지 않으므로, 이런 값 전달이 필요하면 CSS 커스텀 속성(변수)을 함께 활용하는 방식을 고려해야 한다.</p>
</div>

---

## 4. 텍스트 전용 가상 요소

### 🔤 ::first-letter — 드롭캡

신문이나 잡지 기사처럼 문단의 첫 글자를 크게 강조하는 드롭캡 효과를 만들 때 사용한다.

**• CSS: ::first-letter 드롭캡**

```css
p.article::first-letter {
  font-size: 3em;
  font-weight: 700;
  float: left;
  line-height: 1;
  margin-right: 6px;
  color: #6c5ce7;
}
```

`::first-letter`에는 폰트, 색상, `float`, 여백 관련 속성 정도만 적용할 수 있고, 레이아웃에 큰 영향을 주는 속성은 대부분 무시된다는 점을 기억해두면 좋다.

### 🔤 ::first-line — 첫 줄 스타일링

문장이 아니라 <strong>브라우저가 계산한 화면상의 첫 줄</strong>을 스타일링한다.

**• CSS: ::first-line 첫 줄 강조**

```css
p.intro::first-line {
  font-weight: 700;
  color: #333;
}
```

화면 너비가 바뀌어 줄바꿈 위치가 달라지면, 스타일이 적용되는 범위도 함께 바뀐다는 점이 `::first-letter`와 다른 부분이다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">::first-letter</div>
    글자 <strong>한 글자</strong>만 고정적으로 선택한다. 화면 크기가 바뀌어도 대상은 그대로다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">::first-line</div>
    브라우저가 렌더링한 <strong>첫 줄 전체</strong>를 선택한다. 화면 크기에 따라 대상 범위가 달라질 수 있다.
  </div>
</div>

### 🖱️ ::selection — 드래그 선택 영역

사용자가 마우스로 텍스트를 드래그해서 선택했을 때의 스타일을 바꾼다.

**• CSS: ::selection 색상 변경**

```css
::selection {
  background-color: #6c5ce7;
  color: #fff;
}
```

초보자가 놓치기 쉬운 포인트는 다음과 같다.

**💡 설명**

<div class="wda-callout wda-ci">
  <p><code>::selection</code>은 <code>content</code> 속성이 필요 없다. <strong>색상과 배경색 계열의 속성만</strong> 적용되며, 그 외 대부분의 속성은 브라우저가 무시한다.</p>
</div>

브랜드 컬러로 선택 영역을 통일하거나, 코드 블록에서 선택 영역만 눈에 띄는 색으로 강조하는 데 자주 활용된다.

**▶ 텍스트 가상 요소 요약**

<table class="wda-mtable">
<thead><tr><th>가상 요소</th><th>한 문장 요약</th></tr></thead>
<tbody>
<tr><td><code>::first-letter</code></td><td>첫 글자 하나를 고정적으로 크게 강조한다.</td></tr>
<tr><td><code>::first-line</code></td><td>화면에 렌더링된 첫 줄 전체를 강조한다.</td></tr>
<tr><td><code>::selection</code></td><td>사용자가 드래그로 선택한 영역의 색상만 바꾼다.</td></tr>
</tbody>
</table>

---

## 5. 실전 활용 패턴 모음

**▶ 가상 요소 실전 활용 패턴**

<table class="wda-mtable">
<thead><tr><th>패턴</th><th>적용 요소</th></tr></thead>
<tbody>
<tr><td>체크마크 리스트</td><td><code>li::before { content: "✔ "; }</code></td></tr>
<tr><td>외부 링크 화살표</td><td><code>a[target="_blank"]::after { content: " ↗"; }</code></td></tr>
<tr><td>필수 입력 별표</td><td><code>label.required::after { content: " *"; }</code></td></tr>
<tr><td>말풍선 꼬리</td><td><code>.tooltip::after { border 삼각형 트릭 }</code></td></tr>
<tr><td>제목 밑줄 강조</td><td><code>h2::after { content: ""; width: 40px; }</code></td></tr>
<tr><td>데이터 라벨/배지</td><td><code>[data-badge]::before { content: attr(data-badge); }</code></td></tr>
</tbody>
</table>

---

## 6. 실전 1: 아이콘 추가하기 (content + Unicode)

`content`에 유니코드 문자를 직접 넣으면 이미지 파일 없이도 간단한 아이콘을 표현할 수 있다.

**• CSS: 유니코드 아이콘 추가**

```css
.check-list li::before {
  content: "✔";
  color: #22c55e;
  margin-right: 6px;
}

.warning::before {
  content: "⚠ ";
  color: #f59e0b;
}

.nav-link::after {
  content: " →";
}
```

**▶ 유니코드 아이콘 문자**

<table class="wda-mtable">
<thead><tr><th>문자</th><th>유니코드</th><th>활용</th></tr></thead>
<tbody>
<tr><td>✔</td><td>U+2714</td><td>체크, 완료 표시</td></tr>
<tr><td>⚠</td><td>U+26A0</td><td>경고, 주의 표시</td></tr>
<tr><td>→</td><td>U+2192</td><td>화살표, 이동/링크 표시</td></tr>
<tr><td>★</td><td>U+2605</td><td>별점, 강조 표시</td></tr>
<tr><td>●</td><td>U+25CF</td><td>불릿, 상태 점</td></tr>
</tbody>
</table>

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">장점</div>
    이미지 요청이 없어 가볍고, <code>color</code>로 손쉽게 색을 바꿀 수 있으며, HTML 수정이 필요 없다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">단점</div>
    폰트나 운영체제에 따라 모양이 미세하게 다르게 보일 수 있고, 복잡한 아이콘은 표현이 어렵다.
  </div>
</div>

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>간단한 상태 표시 아이콘은 유니코드 문자로 충분한 경우가 많다. 브랜드에 맞는 정교한 아이콘이 필요하다면 <code>url()</code>로 SVG 아이콘 파일을 콘텐츠로 삽입하는 방식을 함께 고려하면 좋다.</p>
</div>

---

## 7. 실전 2: 말풍선 만들기 (::after + border)

버튼에 마우스를 올렸을 때 나타나는 툴팁과, 그 아래 삼각형 꼬리는 `::after`와 `border` 트릭으로 순수 CSS만으로 구현할 수 있다.

**• CSS: 말풍선 툴팁 구현**

```css
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip::after {
  content: "설명 텍스트";
  position: absolute;
  bottom: 130%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 6px 10px;
  border-radius: 6px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

.tooltip::before {
  content: "";
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: #333;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

.tooltip:hover::after,
.tooltip:hover::before {
  opacity: 1;
}
```

삼각형 꼬리의 원리는 `border`의 네 방향 중 <strong>세 방향은 투명하게, 한 방향만 색을 채우는</strong> 트릭이다. 위쪽 테두리만 색을 주면 아래를 향하는 삼각형이 만들어지고, 방향을 바꾸면 꼬리 방향도 바뀐다.

**▶ 말풍선 꼬리 방향별 테두리**

<table class="wda-mtable">
<thead><tr><th>꼬리 방향</th><th>색을 채울 테두리</th></tr></thead>
<tbody>
<tr><td>위쪽 요소 → 아래를 가리킴</td><td><code>border-top-color</code></td></tr>
<tr><td>아래쪽 요소 → 위를 가리킴</td><td><code>border-bottom-color</code></td></tr>
<tr><td>왼쪽 요소 → 오른쪽을 가리킴</td><td><code>border-left-color</code></td></tr>
<tr><td>오른쪽 요소 → 왼쪽을 가리킴</td><td><code>border-right-color</code></td></tr>
</tbody>
</table>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>말풍선을 정확한 위치에 붙이려면 부모 요소에는 <code>position: relative</code>, 가상 요소에는 <code>position: absolute</code>가 함께 필요하다. 부모에 <code>relative</code>가 빠지면 가상 요소가 화면 전체를 기준으로 배치되어 엉뚱한 곳에 나타난다.</p>
</div>

이 패턴은 툴팁 외에도 말풍선형 알림, 채팅 UI의 말풍선, 드롭다운 메뉴의 화살표 표시 등에도 그대로 응용할 수 있다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><code>::before</code>, <code>::after</code>는 <strong>content 속성이 없으면 화면에 나타나지 않는다.</strong></li>
    <li>가상 요소는 <strong>DOM에 존재하지 않아</strong> JavaScript로 직접 선택할 수 없다.</li>
    <li><code>content</code> 값은 <strong>문자열 · 빈 문자열 · attr() · url()</strong> 네 가지 형태를 가진다.</li>
    <li><code>::first-letter</code>는 첫 글자, <code>::first-line</code>은 렌더링된 첫 줄을 대상으로 한다.</li>
    <li><code>::selection</code>은 색상·배경색 계열 속성만 적용되고 content는 필요 없다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: ::before에 content를 안 써도 스타일만 있으면 보인다?</div>
    <div class="wda-mistake-right">정답: <code>content</code> 속성이 없으면 <strong>가상 요소 자체가 생성되지 않아</strong> 다른 스타일을 아무리 줘도 보이지 않는다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: ::first-line은 첫 번째 "문장"을 선택한다?</div>
    <div class="wda-mistake-right">정답: 문장이 아니라 <strong>브라우저가 계산한 화면상의 첫 줄</strong>을 선택하며, 화면 너비가 바뀌면 범위도 달라진다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 말풍선 꼬리는 position: absolute만 주면 만들어진다?</div>
    <div class="wda-mistake-right">정답: 부모 요소에 <strong>position: relative</strong>가 함께 있어야 가상 요소가 부모를 기준으로 정확히 배치된다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 생성 조건</div>
    <div class="wda-formula-block-body"><code>content 없으면 존재하지 않음</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 위치</div>
    <div class="wda-formula-block-body"><code>before = 앞 · after = 뒤</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 말풍선 꼬리</div>
    <div class="wda-formula-block-body"><code>테두리 3면 투명 + 1면 색</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">::before, ::after가 화면에 나타나지 않는 가장 흔한 원인은?</div>
    <div class="wda-flip-back">content 속성을 지정하지 않았기 때문이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">content: attr(data-label);은 무엇을 표시하나?</div>
    <div class="wda-flip-back">해당 요소의 data-label 속성값을 텍스트로 표시한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">::first-letter와 ::first-line의 차이는?</div>
    <div class="wda-flip-back">first-letter는 첫 글자 하나, first-line은 렌더링된 첫 줄 전체를 대상으로 한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">::selection에서 사용할 수 없는 속성은?</div>
    <div class="wda-flip-back">색상·배경색 계열을 제외한 대부분의 속성은 무시된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">말풍선 꼬리를 아래로 향하게 하려면?</div>
    <div class="wda-flip-back">border-top-color만 색을 채우고 나머지 세 방향은 transparent로 둔다.</div>
  </div>
</div>
