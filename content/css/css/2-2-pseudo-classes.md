---
title: "2-2 가상 클래스로 상태 다루기"
category: "frontend"
section: "css"
date: "2026-08-01"
status: "completed"
description: "구조적 가상 클래스와 상태 가상 클래스로 위치·인터랙션·폼 검증 상태에 따라 스타일을 다르게 적용하는 방법을 정리합니다."
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
  • <strong>가상 클래스 vs 가상 요소 구분</strong> — 콜론 개수와 역할 차이를 명확히 이해합니다<br>
  • <strong>구조적 가상 클래스 활용</strong> — <code>:first-child</code>, <code>:nth-child()</code> 등으로 위치 기반 스타일링을 합니다<br>
  • <strong>상태 가상 클래스 활용</strong> — <code>:hover</code>, <code>:checked</code>, <code>:valid</code> 등으로 폼과 UI 상태 변화에 대응합니다<br>
  • <strong>논리 선택자 기초</strong> — <code>:is()</code>, <code>:where()</code>로 선택자를 더 짧고 명확하게 작성합니다
</div>

---

## 1. 가상 클래스란 무엇인가

[이전 문서](/css/css/2-1-attribute-selectors)에서 속성값과 요소 관계로 선택하는 법을 배웠다면, 이 문서는 요소의 "상태"를 기준으로 선택하는 가상 클래스를 다룬다. 순서·위치 기반의 구조적 가상 클래스와, hover·checked·valid 같은 상태 기반 가상 클래스를 모두 살펴본다.

가상 클래스는 HTML 코드에 직접 작성되어 있지 않은 <strong>상태, 위치, 인터랙션 조건</strong>을 기준으로 요소를 선택하는 선택자다. 콜론 하나(`:`)로 시작하며, 실제로 클래스를 추가하지 않아도 "지금 이 요소가 어떤 상황에 있는가"를 CSS가 스스로 판단해서 스타일을 적용한다.

가상 클래스와 자주 헷갈리는 개념이 가상 요소(pseudo-element)다. 가상 요소는 콜론 두 개(`::`)를 쓰며 존재하지 않던 요소를 새로 만들어낸다는 점에서 역할이 다르다.

가상 요소는 다음 문서에서 자세히 다룬다.

**▶ 가상 클래스와 가상 요소 표기 비교**

<table class="wda-mtable">
<thead><tr><th>구분</th><th>표기</th><th>역할</th></tr></thead>
<tbody>
<tr><td>가상 클래스</td><td>콜론 1개 (<code>:</code>)</td><td>요소의 상태·위치·조건을 선택</td></tr>
<tr><td>가상 요소</td><td>콜론 2개 (<code>::</code>)</td><td>존재하지 않던 새 요소를 생성</td></tr>
</tbody>
</table>

---

## 2. 인터랙션 상태: :hover, :active, :focus

사용자의 마우스·키보드 동작에 반응하는 가장 기본적인 가상 클래스다.

**• CSS: hover·active·focus**

```css
button:hover {
  background-color: #5a4bd6;
}

button:active {
  transform: scale(0.98);
}

input:focus {
  outline: 2px solid #6c5ce7;
}
```

`:hover`는 마우스를 올렸을 때, `:active`는 클릭하는 순간, `:focus`는 키보드 탭 이동이나 클릭으로 포커스를 받았을 때 적용된다. `:focus`는 마우스를 쓰지 않는 사용자를 위한 접근성 요소이기도 해서 스타일을 없애지 않는 것이 좋다.

---

## 3. 구조적 가상 클래스: 위치로 선택하기

### 🖱️ :first-child, :last-child

부모 안에서 순서상 첫 번째, 마지막 요소를 선택한다.

**• CSS: first-child와 last-child**

```css
ul li:first-child {
  font-weight: 700;
}

ul li:last-child {
  border-bottom: none;
}
```

실무에서는 반대로 "첫 번째만 제외하고 나머지에 스타일을 주고 싶은" 경우도 많다. 이럴 때는 `li + li`처럼 인접 형제 선택자를 활용하면 첫 번째 요소를 제외한 나머지 전부를 간단히 선택할 수 있다.

**• CSS: 첫 요소 제외하고 스타일 주기**

```css
li + li {
  border-top: 1px solid #eee;
}
```

### 🔢 :nth-child()와 :nth-of-type()

`n`번째 요소를 공식으로 선택하는 가상 클래스다.

**• CSS: nth-child와 nth-of-type**

```css
li:nth-child(3) {
  color: crimson;
}

p:nth-of-type(2) {
  font-style: italic;
}
```

`:nth-child(3)`은 부모의 자식 중 <strong>순서상 3번째</strong> 요소가 조건에 맞는 태그일 때만 선택되고, `:nth-of-type(2)`는 <strong>같은 태그 종류 중에서만</strong> 순서를 센다. 다른 태그가 사이에 섞여 있으면 두 선택자의 결과가 달라질 수 있다.

**▶ nth-child 공식별 선택 순서**

<table class="wda-mtable">
<thead><tr><th>공식</th><th>의미</th><th>선택되는 순서</th></tr></thead>
<tbody>
<tr><td><code>odd</code> 또는 <code>2n+1</code></td><td>홀수 번째</td><td>1, 3, 5, 7 …</td></tr>
<tr><td><code>even</code> 또는 <code>2n</code></td><td>짝수 번째</td><td>2, 4, 6, 8 …</td></tr>
<tr><td><code>3n</code></td><td>3의 배수 번째</td><td>3, 6, 9, 12 …</td></tr>
<tr><td><code>3n+1</code></td><td>3으로 나눈 나머지가 1</td><td>1, 4, 7, 10, 13 …</td></tr>
<tr><td><code>-n+3</code></td><td>처음 3개만</td><td>1, 2, 3</td></tr>
</tbody>
</table>

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>공식을 외울 때는 <code>n</code>에 0, 1, 2, 3 …을 순서대로 대입해서 결과를 직접 계산해보는 것이 가장 확실하다. <code>3n+1</code>이라면 n=0일 때 1, n=1일 때 4, n=2일 때 7이 되는 식이다.</p>
</div>

### 🖱️ :first-of-type, :last-of-type

같은 부모 안에서 <strong>같은 태그 종류 중</strong> 첫 번째, 마지막 요소를 선택한다. `:first-child`와 헷갈리기 매우 쉬운 짝이다.

**• HTML 구조**

```html
<div class="box">
  <h3>제목</h3>
  <p>첫 번째 문단</p>
  <p>두 번째 문단</p>
</div>
```

**• first-child와 first-of-type 비교**

```css
p:first-child { color: red; }     /* 선택 안 됨: p가 부모의 첫 자식이 아님 (h3가 첫 자식) */
p:first-of-type { color: blue; }  /* 선택 됨: p 중에서는 첫 번째 */
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">:first-child</div>
    부모의 <strong>모든 자식</strong>을 통틀어 첫 번째여야 조건을 만족한다. 태그 종류는 상관하지 않는다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">:first-of-type</div>
    <strong>같은 태그끼리 순서</strong>를 세서 그중 첫 번째를 선택한다. 앞에 다른 태그가 있어도 무관하다.
  </div>
</div>

`:nth-of-type()`도 같은 원리로 `:nth-child()`와 짝을 이루며, 같은 태그 종류 안에서만 n번째를 센다는 관계로 기억하면 된다.

---

## 4. :not() 부정 선택자

괄호 안의 조건에 <strong>해당하지 않는</strong> 요소만 선택한다.

**• CSS: :not() 부정 선택자**

```css
li:not(.active) {
  opacity: 0.6;
}

li:not(.active):not(.disabled) {
  cursor: pointer;
}
```

`:not()`을 이어 붙이면 여러 조건을 동시에 제외할 수 있다. 구분선을 마지막 요소에는 넣지 않는 패턴에도 자주 쓰인다.

**• CSS: 마지막 요소 제외 구분선**

```css
li:not(:last-child) {
  border-bottom: 1px solid #eee;
}
```

**▶ :not()과 인접 형제 선택자 비교**

<table class="wda-mtable">
<thead><tr><th>방식</th><th>코드</th><th>특징</th></tr></thead>
<tbody>
<tr><td>:not() 사용</td><td><code>li:not(:last-child)</code></td><td>마지막 요소를 명시적으로 제외, 의도가 명확함</td></tr>
<tr><td>인접 형제 선택자</td><td><code>li + li</code></td><td>첫 번째를 제외한 나머지 전부 선택, 결과는 비슷하지만 접근 방식이 다름</td></tr>
<tr><td>전체 선택 후 마지막 초기화</td><td><code>li { border-bottom: ...; } li:last-child { border-bottom: none; }</code></td><td>코드가 두 줄로 늘어나지만 가독성은 좋은 편</td></tr>
</tbody>
</table>

---

## 5. :is()와 :where() — 현대 CSS 논리 선택자

여러 선택자를 그룹으로 묶어 반복을 줄여주는 논리 선택자다. 그룹 선택자(쉼표)와 비슷해 보이지만, 조합 선택자 안에서 그룹을 만들 수 있다는 점이 다르다.

**• CSS: :is()로 선택자 그룹화**

```css
/* 기존 방식: 세 줄 반복 */
h1 a:hover,
h2 a:hover,
h3 a:hover {
  color: crimson;
}

/* :is()로 한 줄로 축약 */
:is(h1, h2, h3) a:hover {
  color: crimson;
}
```

`:is()`와 `:where()`는 기능은 거의 같지만 <strong>우선순위 점수 계산 방식이 다르다.</strong>

**▶ :is()와 :where() 우선순위 비교**

<table class="wda-mtable">
<thead><tr><th>선택자</th><th>우선순위 반영 방식</th><th>특징</th></tr></thead>
<tbody>
<tr><td><code>:is()</code></td><td>괄호 안에서 <strong>가장 점수가 높은 선택자</strong>의 점수를 그대로 가져옴</td><td>일반적인 그룹핑에 적합</td></tr>
<tr><td><code>:where()</code></td><td>항상 <strong>0점</strong></td><td>다른 스타일에 쉽게 덮어써지도록 만들 때, 특히 리셋 스타일에 적합</td></tr>
</tbody>
</table>

**• CSS: :where()로 우선순위 0점 만들기**

```css
/* :where()는 점수가 0이라 나중에 어떤 규칙으로도 쉽게 덮어쓸 수 있다 */
:where(h1, h2, h3) {
  margin: 0;
}
```

**💡 설명**

<div class="wda-callout wda-ci">
  <p>라이브러리나 리셋 CSS를 작성할 때는 <code>:where()</code>를 사용해 사용자 스타일이 항상 이길 수 있게 만드는 것이 관례다. 반대로 우선순위를 확실히 확보하고 싶다면 <code>:is()</code>가 더 알맞다.</p>
</div>

---

## 6. Form 상태 선택자

입력 요소의 상태에 따라 스타일을 다르게 적용하는 가상 클래스 그룹이다.

**▶ Form 상태 선택자 목록**

<table class="wda-mtable">
<thead><tr><th>선택자</th><th>의미</th></tr></thead>
<tbody>
<tr><td><code>:checked</code></td><td>체크박스·라디오가 선택된 상태</td></tr>
<tr><td><code>:disabled</code></td><td>비활성화된 입력 요소</td></tr>
<tr><td><code>:enabled</code></td><td>활성화된 입력 요소</td></tr>
<tr><td><code>:valid</code></td><td>유효성 검사를 통과한 값</td></tr>
<tr><td><code>:invalid</code></td><td>유효성 검사를 통과하지 못한 값</td></tr>
<tr><td><code>:required</code></td><td>필수 입력으로 지정된 요소</td></tr>
</tbody>
</table>

**• CSS: 체크박스·비활성화 상태**

```css
input[type="checkbox"]:checked + label {
  color: #6c5ce7;
  font-weight: 700;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #ccc;
}

button:enabled:hover {
  background-color: #5a4bd6;
}
```

커스텀 체크박스를 만들 때는 기본 체크박스를 숨기고 라벨을 꾸민 뒤, `:checked` 상태에 따라 라벨의 스타일을 바꾸는 패턴을 많이 쓴다.

**• CSS: 커스텀 체크박스 만들기**

```css
input[type="checkbox"] {
  position: absolute;
  opacity: 0;
}

input[type="checkbox"] + label::before {
  content: "";
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #ccc;
  margin-right: 6px;
}

input[type="checkbox"]:checked + label::before {
  background-color: #6c5ce7;
  border-color: #6c5ce7;
}
```

다크 모드 토글처럼 체크 여부에 따라 뒤따르는 콘텐츠 영역 전체의 스타일을 바꾸는 조건부 패턴도 가능하다.

**• CSS: 다크 모드 토글 연동**

```css
#dark-toggle:checked ~ .content {
  background-color: #1a1a1a;
  color: #f5f5f5;
}
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>Form 상태를 스타일링할 때는 <strong>색상만으로 상태를 구분하지 않는다.</strong> 색약 사용자를 위해 아이콘이나 텍스트를 함께 제공하고, <code>:focus</code> 스타일을 절대 지우지 않으며, 스크린 리더와 키보드만으로도 상태를 알 수 있는지 항상 점검해야 한다.</p>
</div>

---

## 7. 검증 선택자: HTML5 폼 검증과 연동하기

`required`, `pattern`, `minlength`, `maxlength` 같은 HTML5 검증 속성과 짝을 이루는 가상 클래스들이다.

**• 검증 상태 CSS**

```css
input:required {
  border-left: 2px solid #f59e0b;
}

input:valid {
  border-color: #22c55e;
}

input:invalid {
  border-color: #ef4444;
}
```

**• 적용 대상 HTML**

```html
<label>이메일 <span aria-hidden="true">*</span></label>
<input type="email" required />
```

`:required`가 붙은 입력 옆에는 보통 라벨에 별표(`*`)를 함께 표시해서 시각적으로도 필수 항목임을 알린다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>페이지가 막 로드된 시점에는 입력값이 비어 있어도 <code>required</code>가 걸린 필드는 곧바로 <code>:invalid</code> 상태가 된다. 이 상태를 그대로 빨간 테두리로 보여주면 사용자가 아직 아무것도 입력하지 않았는데도 오류처럼 보이는 문제가 생긴다.</p>
</div>

**• CSS: 로드 직후 invalid 표시 방지**

```css
/* Bad: 페이지 로드 즉시 빨간 테두리가 보임 */
input:invalid {
  border-color: red;
}

/* Good: 사용자가 입력을 시작한 뒤에만 검증 결과를 보여줌 */
input:not(:placeholder-shown):invalid {
  border-color: red;
}
```

`:placeholder-shown`은 placeholder가 화면에 보이고 있는(=아직 아무것도 입력하지 않은) 상태를 뜻한다.

`:not(:placeholder-shown)`을 앞에 붙이면 "사용자가 무언가 입력해서 placeholder가 사라진 뒤"에만 검증 스타일이 적용되므로, 로드 직후의 어색한 오류 표시를 막을 수 있다.

**▶ 검증 적용 시점별 선택자**

<table class="wda-mtable">
<thead><tr><th>적용 시점</th><th>선택자 패턴</th></tr></thead>
<tbody>
<tr><td>입력 전</td><td>기본 테두리 색만 적용, <code>:invalid</code> 스타일 보류</td></tr>
<tr><td>입력 중~후</td><td><code>:not(:placeholder-shown):invalid</code></td></tr>
<tr><td>유효할 때</td><td><code>:not(:placeholder-shown):valid</code></td></tr>
</tbody>
</table>

실시간 검증 예시로는 이메일 형식 검사(`type="email"`), 전화번호 패턴 검사(`pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"`), 비밀번호 길이 검사(`minlength="8"`)가 대표적이다.

모두 위와 같은 `:not(:placeholder-shown)` 패턴과 함께 쓰면 자연스러운 사용자 경험을 만들 수 있다.

---

## 8. 가상 클래스 조합 패턴

가상 클래스는 콜론을 연달아 붙여서 여러 조건을 동시에 만족하는 요소만 선택할 수 있다.

**▶ 가상 클래스 조합 패턴**

<table class="wda-mtable">
<thead><tr><th>조합</th><th>의미</th></tr></thead>
<tbody>
<tr><td><code>a:hover:not(.disabled)</code></td><td>비활성화되지 않은 링크에 마우스를 올렸을 때</td></tr>
<tr><td><code>input:focus:valid</code></td><td>포커스를 받았고 동시에 유효성 검사도 통과했을 때</td></tr>
<tr><td><code>li:nth-child(3):hover</code></td><td>세 번째 li에 마우스를 올렸을 때</td></tr>
<tr><td><code>button:enabled:active</code></td><td>활성화된 버튼을 클릭하는 순간</td></tr>
</tbody>
</table>

**• CSS: 가상 클래스 조합 적용**

```css
a:hover:not(.disabled) {
  text-decoration: underline;
}

input:focus:valid {
  border-color: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.15);
}
```

---

## 9. 브라우저 호환성과 성능 팁

**▶ CSS 세대별 가상 클래스**

<table class="wda-mtable">
<thead><tr><th>세대</th><th>대표 선택자</th></tr></thead>
<tbody>
<tr><td>CSS2</td><td><code>:hover</code>, <code>:focus</code>, <code>:first-child</code></td></tr>
<tr><td>CSS3</td><td><code>:nth-child()</code>, <code>:not()</code>, <code>:checked</code>, <code>:valid</code>, <code>:invalid</code></td></tr>
<tr><td>CSS4 (최근)</td><td><code>:is()</code>, <code>:where()</code>, <code>:has()</code></td></tr>
</tbody>
</table>

복잡한 `:nth-child()` 패턴이나 깊이 중첩된 조합 선택자는 브라우저가 매칭할 후보를 계산하는 비용이 커서, 클래스를 직접 선택하는 방식보다 느릴 수 있다. 규모가 큰 리스트일수록 차이가 두드러진다.

디버깅할 때는 개발자 도구(F12)의 요소 패널에서 `:hov` 같은 상태 강제 버튼을 눌러 `:hover`, `:focus`, `:active` 상태를 고정해두고 스타일을 확인하면 편리하다.

<div class="wda-check-note">
  <ul>
    <li>페이지 로드 직후에는 <code>:invalid</code> 스타일을 바로 보여주지 않는다.</li>
    <li><code>:hover</code>와 <code>:focus</code> 스타일은 가능한 한 함께, 일관되게 적용한다.</li>
    <li>대규모 리스트에서는 <code>:nth-child()</code> 남용보다 클래스 직접 지정을 우선 고려한다.</li>
  </ul>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>가상 클래스는 <strong>콜론 1개</strong>, 가상 요소는 <strong>콜론 2개</strong>를 사용한다.</li>
    <li><code>:first-child</code>는 모든 자식 중 첫 번째, <code>:first-of-type</code>은 같은 태그 중 첫 번째를 선택한다.</li>
    <li><code>:nth-child(3n+1)</code>은 <strong>1, 4, 7, 10, 13 …</strong> 번째를 선택한다.</li>
    <li><code>:is()</code>와 <code>:where()</code>는 기능은 같지만 <strong>우선순위 점수가 다르다</strong>. <code>:where()</code>는 항상 0점이다.</li>
    <li>초기 로드 시 <code>:invalid</code>가 바로 보이지 않도록 <code>:not(:placeholder-shown)</code>과 함께 사용한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: :first-child와 :first-of-type은 같은 요소를 선택한다?</div>
    <div class="wda-mistake-right">정답: <code>:first-child</code>는 부모의 <strong>모든 자식 중</strong> 첫 번째여야 하고, <code>:first-of-type</code>은 <strong>같은 태그 중</strong> 첫 번째면 된다. 앞에 다른 태그가 있으면 결과가 달라진다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: :is()와 :where()는 완전히 동일하게 동작한다?</div>
    <div class="wda-mistake-right">정답: 매칭 대상은 같지만 <strong>:is()는 가장 높은 점수를 가져오고, :where()는 항상 0점</strong>이라는 우선순위 차이가 있다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 표기</div>
    <div class="wda-formula-block-body"><code>가상클래스 : · 가상요소 ::</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 구조 선택</div>
    <div class="wda-formula-block-body"><code>child = 전체기준 · of-type = 태그기준</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 논리 선택자</div>
    <div class="wda-formula-block-body"><code>is() = 최고점수 · where() = 0점</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front"><code>:nth-child(3n+1)</code>이 선택하는 순서는?</div>
    <div class="wda-flip-back">1, 4, 7, 10, 13번째처럼 3으로 나눈 나머지가 1인 위치다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">:is()와 :where()의 가장 중요한 차이는?</div>
    <div class="wda-flip-back">우선순위(Specificity) 점수 계산 방식이 다르다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">:checked는 어떤 요소에 사용하나?</div>
    <div class="wda-flip-back">체크박스나 라디오 버튼이 선택된 상태를 가리킬 때 사용한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">초기 로드 시 :invalid 스타일이 바로 보이는 문제를 막는 방법은?</div>
    <div class="wda-flip-back"><code>:not(:placeholder-shown):invalid</code>처럼 입력 시작 이후에만 적용되게 한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">li:not(:last-child)의 의미는?</div>
    <div class="wda-flip-back">마지막 li를 제외한 나머지 li를 모두 선택한다.</div>
  </div>
</div>
