---
title: "2-1 속성 선택자로 정교하게 선택하기"
category: "frontend"
section: "css"
date: "2026-08-01"
status: "completed"
description: "속성 선택자 7종과 콤비네이터, 우선순위 점수 계산을 익혀 클래스 없이도 정교하게 요소를 선택하는 방법을 정리합니다."
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
  • <strong>속성 선택자 7종 구분</strong> — <code>[attr]</code>부터 <code>[attr|=value]</code>까지 각각의 문법과 쓰임을 구분해서 사용합니다<br>
  • <strong>콤비네이터 확장</strong> — <code>&gt;</code>, 공백에 이어 <code>+</code>, <code>~</code>까지 요소 관계 기반 선택자를 다룹니다<br>
  • <strong>우선순위 점수 계산</strong> — Specificity 점수를 직접 계산해서 스타일 충돌 원인을 파악합니다<br>
  • <strong>실무 UI 패턴 적용</strong> — 폼, 탭 UI 같은 실전 레이아웃에 속성 선택자와 형제 선택자를 응용합니다
</div>

---

## 1. 속성 선택자란 무엇인가

[이전 문서](/css/css/1-2-css-selectors)에서 태그·클래스·ID 기본 선택자와 자손·자식·그룹 선택자를 다뤘다면, 이 문서부터는 그 위에서 더 정교하게 요소를 골라내는 방법을 다룬다.

클래스를 추가로 붙이지 않고도 HTML 속성값만으로 요소를 선택하는 속성 선택자와, 형제 관계까지 활용하는 콤비네이터, 그리고 스타일 충돌을 해결하는 우선순위 점수 계산법이 이번 챕터의 핵심이다.

속성 선택자는 요소에 특정 클래스를 붙이지 않아도, HTML에 이미 존재하는 속성과 그 값을 기준으로 요소를 선택하는 방법이다.

`type`, `href`, `disabled`, `data-*`처럼 마크업에 자연스럽게 들어가는 속성을 그대로 활용할 수 있어서 HTML을 수정하지 않고도 스타일을 적용할 수 있는 경우가 많다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">클래스 선택자</div>
    스타일을 적용하려면 <code>class="btn-primary"</code>처럼 HTML에 클래스를 직접 추가해야 한다. 적용 기준이 명확하지만 마크업 수정이 필요하다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">속성 선택자</div>
    <code>type="submit"</code>, <code>href="https://..."</code>처럼 이미 존재하는 속성값을 기준으로 선택한다. HTML 수정 없이도 조건에 맞는 요소를 한 번에 스타일링할 수 있다.
  </div>
</div>

버튼 타입에 따라 색을 다르게 주고 싶을 때를 비교해보면 차이가 분명해진다.

**• HTML 구조 비교**

```html
<!-- 클래스로 구분하려면 HTML 수정이 필요 -->
<button class="btn btn-submit">제출</button>

<!-- 속성 선택자는 기존 type 속성을 그대로 활용 -->
<button type="submit">제출</button>
```

**• 속성 선택자 적용**

```css
button[type="submit"] {
  background-color: #6c5ce7;
}
```

---

## 2. 7가지 속성 선택자 완전정복

### 🎛️ `[attr]` — 속성 존재 여부

값과 무관하게 해당 속성이 있기만 하면 선택된다.

**• CSS: 속성 존재 선택자**

```css
input[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

[data-open] {
  display: block;
}
```

`disabled`, `required`, `readonly`처럼 값 없이 존재 자체가 의미를 가지는 속성이나, `data-status`, `data-open`처럼 값보다 존재 여부만 확인하면 되는 커스텀 속성에 자주 쓴다.

### 🎯 `[attr=value]` — 정확히 일치

속성값이 지정한 문자열과 완전히 같을 때만 선택된다.

**• CSS: 속성값 정확히 일치**

```css
button[type="submit"] {
  background-color: #6c5ce7;
}

a[target="_blank"]::after {
  content: " ↗";
}
```

버튼의 `type` 값에 따라 제출·초기화 버튼을 다르게 스타일링하거나, 새 창으로 열리는 링크에만 아이콘을 붙이는 식으로 활용한다.

### 🎛️ `[attr^=value]` — 시작하는 값

속성값이 지정한 문자열로 시작할 때 선택된다. `^`는 정규식에서 "문자열의 시작"을 뜻하는 기호와 같은 의미로 기억하면 된다.

**• CSS: 속성값 시작 문자열**

```css
a[href^="https"] {
  color: green;
}

a[href^="tel:"]::before {
  content: "📞 ";
}

a[href^="mailto:"]::before {
  content: "✉ ";
}
```

프로토콜별로 아이콘을 구분해서 붙이거나, 특정 다운로드 경로(`href^="/download/"`)로 시작하는 링크만 골라서 스타일을 줄 때 유용하다.

### 🎯 `[attr$=value]` — 끝나는 값

속성값이 지정한 문자열로 끝날 때 선택된다.

**• CSS: 속성값 끝 문자열**

```css
a[href$=".pdf"]::after { content: " (PDF)"; color: #d63384; }
a[href$=".zip"]::after { content: " (ZIP)"; color: #6c757d; }
a[href$=".xlsx"]::after { content: " (Excel)"; color: #198754; }
```

확장자 기준으로 파일 종류를 구분해 아이콘 색이나 텍스트를 다르게 붙이는 패턴에 특히 잘 맞는다.

### 🎛️ `[attr*=value]` — 포함하는 값

속성값 어디에든 지정한 문자열이 포함되어 있으면 선택된다. 위치는 상관없다.

**• CSS: 속성값 포함 문자열**

```css
[class*="btn"] { padding: 8px 16px; }
[class*="icon-"] { display: inline-block; }
a[href*="youtube"] { color: red; }
```

클래스 이름 규칙이 `btn-primary`, `btn-outline`처럼 일정한 패턴을 가질 때 공통 부분만 잡아서 스타일링하기 좋다. 다만 의도치 않은 클래스까지 걸릴 수 있어 이름 규칙이 명확하지 않으면 주의가 필요하다.

### 🎯 `[attr~=value]` — 단어 단위 일치

공백으로 구분된 여러 값 중 하나가 지정한 단어와 정확히 일치할 때 선택된다.

**• CSS 규칙**

```css
[class~="active"] {
  font-weight: 700;
}
```

**• HTML: 단어 단위 선택자 적용 대상**

```html
<li class="menu-item active">현재 메뉴</li>
<li class="menu-item inactive">다른 메뉴</li>
```

`[class~="active"]`는 첫 번째 `li`만 선택한다. 반면 `[class*="active"]`를 썼다면 `inactive`라는 단어 안에도 `"active"` 문자열이 포함되어 있어서 두 번째 `li`까지 함께 선택되는 문제가 생긴다.

단어 단위로 정확히 구분하고 싶다면 `~=`가 안전하다.

### 🎛️ `[attr|=value]` — 언어 코드 선택

값이 지정한 문자열과 정확히 같거나, 그 뒤에 하이픈(`-`)이 붙어 이어지는 경우까지 선택한다. 주로 언어 코드 표기에 쓰인다.

**• CSS: 언어 코드 속성 선택자**

```css
[lang|="en"] {
  font-family: "Georgia", serif;
}
```

이 규칙은 `lang="en"`, `lang="en-US"`, `lang="en-GB"`를 모두 선택하지만 `lang="english"`처럼 하이픈 없이 이어지는 값은 선택하지 않는다.

### 📊 7가지 속성 선택자 한눈에 비교

**▶ 속성 선택자 7종 비교**

<table class="wda-mtable">
<thead><tr><th>선택자</th><th>의미</th><th>대표 예시</th></tr></thead>
<tbody>
<tr><td><code>[attr]</code></td><td>속성이 존재하기만 하면 선택</td><td><code>input[required]</code></td></tr>
<tr><td><code>[attr=value]</code></td><td>값이 정확히 일치</td><td><code>[type="submit"]</code></td></tr>
<tr><td><code>[attr^=value]</code></td><td>값이 지정 문자열로 시작</td><td><code>[href^="https"]</code></td></tr>
<tr><td><code>[attr$=value]</code></td><td>값이 지정 문자열로 끝남</td><td><code>[href$=".pdf"]</code></td></tr>
<tr><td><code>[attr*=value]</code></td><td>값 어디든 문자열 포함</td><td><code>[class*="btn"]</code></td></tr>
<tr><td><code>[attr~=value]</code></td><td>공백으로 구분된 단어 중 정확히 일치</td><td><code>[class~="active"]</code></td></tr>
<tr><td><code>[attr|=value]</code></td><td>값이 일치하거나 하이픈으로 이어짐</td><td><code>[lang|="en"]</code></td></tr>
</tbody>
</table>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><code>[attr*=value]</code>와 <code>[attr~=value]</code>를 혼동하기 쉽다. <code>*=</code>은 부분 문자열 포함이라 <code>"inactive"</code> 안의 <code>"active"</code>도 걸리지만, <code>~=</code>은 공백으로 나뉜 완전한 단어만 비교하므로 <code>"inactive"</code>는 걸리지 않는다.</p>
</div>

---

## 3. data-* 커스텀 속성 활용

`data-*`는 개발자가 자유롭게 이름을 정해 요소에 추가 정보를 담을 수 있는 속성이다. 속성 선택자와 결합하면 클래스를 늘리지 않고도 상태 기반 스타일링이 가능하다.

**• data-\* 속성 마크업**

```html
<div data-status="success">저장 완료</div>
<div data-status="error">저장 실패</div>
<div data-priority="high">긴급</div>
```

**• 속성 선택자 스타일링**

```css
[data-status="success"] { border-left: 3px solid #22c55e; }
[data-status="error"] { border-left: 3px solid #ef4444; }
[data-priority="high"][data-status="error"] {
  background-color: #fff1f2;
}
```

속성 선택자를 이어 붙이면 `data-priority`와 `data-status`가 둘 다 조건에 맞을 때만 선택하는 AND 조건도 만들 수 있다.

**▶ data-* 활용 패턴**

<table class="wda-mtable">
<thead><tr><th>활용 상황</th><th>패턴</th></tr></thead>
<tbody>
<tr><td>상태별 배지 색상</td><td><code>[data-status="..."]</code></td></tr>
<tr><td>우선순위 강조</td><td><code>[data-priority="high"]</code></td></tr>
<tr><td>토글 열림/닫힘 표시</td><td><code>[data-open="true"]</code></td></tr>
<tr><td>JS 훅과 스타일 분리</td><td>JS는 <code>data-*</code>를 읽고, CSS는 같은 속성으로 스타일링</td></tr>
</tbody>
</table>

---

## 4. Combinator 선택자로 관계 기반 선택하기

이전 문서에서 자손(공백)과 자식(`>`) 선택자를 다뤘다. 여기에 형제 관계를 표현하는 `+`와 `~`를 더하면 요소들의 위치 관계를 훨씬 정교하게 다룰 수 있다.

**▶ Combinator 기호별 선택 범위**

<table class="wda-mtable">
<thead><tr><th>기호</th><th>이름</th><th>선택 범위</th></tr></thead>
<tbody>
<tr><td><code>&gt;</code></td><td>자식 선택자</td><td>바로 아래 1단계 자식만</td></tr>
<tr><td>(공백)</td><td>후손 선택자</td><td>몇 단계든 모든 하위 요소</td></tr>
<tr><td><code>+</code></td><td>인접 형제 선택자</td><td>바로 다음에 오는 형제 1개</td></tr>
<tr><td><code>~</code></td><td>일반 형제 선택자</td><td>뒤에 나오는 형제 전체</td></tr>
</tbody>
</table>

### 🔗 `+` 인접 형제 선택자

기준 요소 바로 다음에 오는 형제 요소 하나만 선택한다.

**• 인접 형제 선택자 CSS**

```css
label + input {
  margin-left: 8px;
}

input:focus + .error-message {
  display: block;
}
```

**• HTML: 인접 형제 선택자 적용 대상**

```html
<label for="email">이메일</label>
<input id="email" type="email" />
<span class="error-message">올바른 이메일을 입력하세요</span>
```

자주 하는 실수 세 가지를 짚어두면 실무에서 시간을 아낄 수 있다.

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">실수 1: input과 .error-message 사이에 다른 요소가 끼어 있는데도 선택될 거라 기대한다.</div>
    <div class="wda-mistake-right"><code>+</code>는 <strong>바로 다음 형제 1개만</strong> 선택하므로 중간에 다른 요소가 있으면 매칭되지 않는다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">실수 2: input:focus + .error-message가 input 자신을 스타일링한다고 착각한다.</div>
    <div class="wda-mistake-right">이 선택자가 스타일을 적용하는 대상은 <strong>.error-message</strong>다. input은 조건일 뿐이다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">실수 3: 부모-자식 관계에도 +를 쓸 수 있다고 생각한다.</div>
    <div class="wda-mistake-right"><code>+</code>는 <strong>형제 관계에서만</strong> 동작한다. 부모-자식 관계에는 <code>&gt;</code>를 써야 한다.</div>
  </div>
</div>

### 🔗 `~` 일반 형제 선택자

기준 요소 뒤에 나오는 같은 부모의 형제 요소를 전부 선택한다. 순서상 뒤에 있어야 하고, 앞에 있는 형제는 선택되지 않는다.

**• 일반 형제 선택자 CSS**

```css
h2 ~ p {
  color: #555;
}
```

**• HTML: 일반 형제 선택자 적용 대상**

```html
<h2>FAQ</h2>
<p>첫 번째 답변입니다.</p>
<p>두 번째 답변입니다.</p>
```

`h2` 뒤에 오는 두 개의 `p`가 모두 선택된다. FAQ처럼 제목 하나 뒤에 여러 문단이 이어지는 구조에 잘 맞는다.

---

## 5. 우선순위 점수 계산 (Specificity)

같은 요소에 여러 스타일 규칙이 충돌할 때, 브라우저는 각 선택자의 우선순위 점수를 계산해서 더 높은 점수의 규칙을 적용한다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">!important</div><div class="wda-fcard-dsc">점수 계산과 무관하게 항상 최우선으로 적용된다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">인라인 스타일</div><div class="wda-fcard-dsc">1000점. <code>style="..."</code> 속성으로 직접 작성한 스타일.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">ID 선택자</div><div class="wda-fcard-dsc">100점. <code>#header</code> 형태.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">클래스 · 속성 · 가상 클래스</div><div class="wda-fcard-dsc">10점. <code>.card</code>, <code>[type="text"]</code>, <code>:hover</code> 모두 동일하게 10점.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">태그 선택자</div><div class="wda-fcard-dsc">1점. <code>div</code>, <code>p</code> 등.</div></div>
</div>

핵심은 <strong>속성 선택자도 클래스와 동일하게 10점</strong>이라는 점이다. `[type="text"]`와 `.input`은 점수가 같다. 그리고 `>`, 공백, `+`, `~` 같은 콤비네이터 기호 자체는 <strong>0점</strong>이다. 요소 관계만 지정할 뿐 그 자체로 구체성을 더하지는 않는다.

**• CSS: 콤비네이터 점수 계산**

```css
div > p { /* 태그 1점 + 태그 1점 + 콤비네이터 0점 = 2점 */ }
```

**▶ 선택자별 점수 계산**

<table class="wda-mtable">
<thead><tr><th>선택자</th><th>점수 계산</th><th>합계</th></tr></thead>
<tbody>
<tr><td><code>input[type="text"]</code></td><td>태그 1 + 속성 10</td><td>11점</td></tr>
<tr><td><code>.input</code></td><td>클래스 10</td><td>10점</td></tr>
<tr><td><code>#email</code></td><td>ID 100</td><td>100점</td></tr>
<tr><td><code>.container &gt; p</code></td><td>클래스 10 + 태그 1</td><td>11점</td></tr>
<tr><td><code>.container .text</code></td><td>클래스 10 + 클래스 10</td><td>20점</td></tr>
<tr><td><code>div &gt; .text</code></td><td>태그 1 + 클래스 10</td><td>11점</td></tr>
</tbody>
</table>

이 표에서 보듯 `#email`이 가장 높은 점수를 가져 다른 두 규칙을 모두 이긴다. `.container .text`는 클래스가 두 번 등장해 `.container > p`보다 점수가 높다.

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>점수를 억지로 외우기보다 튜플 형태 <code>(인라인, ID, 클래스/속성/가상클래스, 태그)</code>로 자릿수를 나눠 비교하는 습관을 들이면 계산이 쉬워진다. 예를 들어 <code>.menu &gt; li[data-active="true"]</code>는 클래스 10 + 태그 1 + 속성 10 = 21점이다.</p>
</div>

---

## 6. 실전: 탭 UI 패턴과 형제 선택자의 함정

라디오 버튼과 `~` 선택자를 조합하면 JavaScript 없이 순수 CSS만으로 탭 UI를 만들 수 있다.

**• 탭 UI 마크업**

```html
<input type="radio" name="tab" id="tab1" checked />
<label for="tab1">탭 1</label>
<div class="content">탭 1 내용</div>

<input type="radio" name="tab" id="tab2" />
<label for="tab2">탭 2</label>
<div class="content">탭 2 내용</div>
```

**• 탭 전환 CSS**

```css
.content { display: none; }
#tab1:checked ~ .content { display: block; }
```

동작 방식은 라디오 버튼이 체크되면, 뒤따르는 형제 중 `.content`가 나타나는 원리다. 그런데 탭이 여러 개면 문제가 생긴다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><code>~</code>는 <strong>뒤에 나오는 형제 전부</strong>를 선택하기 때문에, <code>#tab1:checked ~ .content</code>는 tab1 뒤에 있는 모든 <code>.content</code>를 다 열어버린다. 탭이 3개면 3개 콘텐츠가 동시에 보이는 예상치 못한 결과가 나온다.</p>
</div>

이 문제는 두 가지 방식으로 해결할 수 있다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">해결 방법 1 · HTML 구조 묶기 (추천)</div>
    라디오·라벨·콘텐츠를 각각 하나의 wrapper로 묶어서 <code>~</code>가 다른 탭의 콘텐츠까지 넘어가지 않도록 범위를 제한한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">해결 방법 2 · CSS만 수정</div>
    <code>input:checked + label + .content</code>처럼 <code>+</code>를 두 번 연달아 써서 라디오 바로 다음 라벨, 그 다음 콘텐츠까지만 정확히 지정한다.
  </div>
</div>

**• CSS: 형제 선택자 체이닝으로 범위 제한**

```css
/* 해결 방법 2 예시 */
input:checked + label + .content {
  display: block;
}
```

**▶ 두 해결 방식 비교**

<table class="wda-mtable">
<thead><tr><th>방식</th><th>장점</th><th>단점</th></tr></thead>
<tbody>
<tr><td>구조 묶기</td><td>선택자가 단순해지고 유지보수가 쉬움</td><td>HTML 마크업 변경 필요</td></tr>
<tr><td>CSS만 수정</td><td>HTML 구조를 바꾸지 않아도 됨</td><td>라벨과 콘텐츠 순서가 항상 고정되어야 함</td></tr>
</tbody>
</table>

이 패턴은 탭 UI 외에도 아코디언, 토글 메뉴, FAQ 펼치기, 사이드 메뉴 펼침 같은 인터랙션에 폭넓게 응용된다.

**▶ 체크박스 트릭 패턴별 선택자**

<table class="wda-mtable">
<thead><tr><th>패턴</th><th>핵심 선택자</th></tr></thead>
<tbody>
<tr><td>아코디언</td><td><code>input:checked ~ .panel</code></td></tr>
<tr><td>토글 메뉴</td><td><code>input:checked + .menu</code></td></tr>
<tr><td>FAQ 펼치기</td><td><code>input:checked + label + .answer</code></td></tr>
<tr><td>사이드 메뉴 펼침</td><td><code>input:checked ~ .submenu</code></td></tr>
</tbody>
</table>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>속성 선택자는 <strong>7종</strong>이며, 각각 존재(<code>[attr]</code>)·일치(<code>=</code>)·시작(<code>^=</code>)·끝(<code>$=</code>)·포함(<code>*=</code>)·단어일치(<code>~=</code>)·언어코드(<code>|=</code>)로 구분된다.</li>
    <li>속성 선택자의 우선순위 점수는 <strong>클래스와 동일한 10점</strong>이다.</li>
    <li><code>&gt;</code>는 자식, 공백은 후손, <strong>+는 바로 다음 형제 1개</strong>, <strong>~는 뒤따르는 형제 전체</strong>를 선택한다.</li>
    <li>콤비네이터 기호 자체는 <strong>점수 0점</strong>이며, 요소 관계만 표현한다.</li>
    <li>인라인(1000) &gt; ID(100) &gt; 클래스/속성/가상클래스(10) &gt; 태그(1) 순으로 점수가 높다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: [class*="active"]와 [class~="active"]는 같은 결과를 낸다?</div>
    <div class="wda-mistake-right">정답: <code>*=</code>는 <strong>부분 문자열 포함</strong>이라 <code>"inactive"</code>도 걸리지만, <code>~=</code>는 <strong>단어 단위로 정확히 일치</strong>해야 선택된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: h2 ~ p 처럼 ~ 선택자를 쓰면 조건에 맞는 형제 하나만 선택된다?</div>
    <div class="wda-mistake-right">정답: <code>~</code>는 <strong>뒤에 나오는 형제 전부</strong>를 선택한다. 하나만 선택하려면 <code>+</code>를 써야 한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 점수</div>
    <div class="wda-formula-block-body"><code>속성 선택자 = 클래스와 동일 10점</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 형제 범위</div>
    <div class="wda-formula-block-body"><code>+ = 바로 다음 1개 · ~ = 뒤 전체</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 콤비네이터</div>
    <div class="wda-formula-block-body"><code>&gt; 공백 + ~ 모두 0점</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front"><code>a[href$=".pdf"]</code>는 어떤 링크를 선택하나?</div>
    <div class="wda-flip-back"><code>.pdf</code>로 끝나는 href 값을 가진 링크를 선택한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front"><code>.menu &gt; li[data-active="true"]</code>의 우선순위 점수는?</div>
    <div class="wda-flip-back">클래스 10 + 태그 1 + 속성 10 = 21점이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front"><code>h2 ~ p</code>는 h2 뒤의 첫 번째 p만 선택하나?</div>
    <div class="wda-flip-back">아니다. h2 뒤에 오는 모든 형제 p를 전부 선택한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front"><code>label + input</code>이 선택하는 대상은?</div>
    <div class="wda-flip-back">label 바로 다음에 오는 형제 input 1개다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">탭 UI에서 여러 콘텐츠가 동시에 열리는 원인은?</div>
    <div class="wda-flip-back"><code>~</code> 선택자가 뒤따르는 형제 전체를 선택하기 때문이다.</div>
  </div>
</div>
