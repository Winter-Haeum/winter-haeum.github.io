---
title: "1-4: 태그·속성·요소 이해하기"
category: "frontend"
section: "html"
date: "2026-08-01"
status: "completed"
description: "태그·속성·요소 개념을 구분하고, 요소 간 부모·자식·형제 관계와 블록·인라인 요소, 글로벌 속성을 정리합니다."
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
  • <strong>용어 구분</strong> — 태그, 속성, 요소를 명확히 구분할 수 있습니다<br>
  • <strong>DOM 관계 이해</strong> — 부모·자식·형제 관계로 문서 구조를 파악할 수 있습니다<br>
  • <strong>블록·인라인 구분</strong> — 두 요소 유형의 차이를 이해합니다<br>
  • <strong>글로벌 속성 활용</strong> — class, id 같은 공통 속성을 상황에 맞게 사용할 수 있습니다
</div>

---

## 1. 태그 · 속성 · 요소

[이전 문서](/html/html/1-3-html-document-structure)에서 문서 전체의 뼈대를 봤다면, 이 문서는 그 안을 채우는 개별 요소들의 기본 규칙을 다룹니다. 구체적인 태그 목록은 이후 문서에서 다루고, 여기서는 태그·속성·요소 같은 용어와 요소들이 서로 어떤 관계를 맺는지에 집중합니다.

세 용어는 자주 섞여 쓰이지만 가리키는 대상이 다릅니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">태그(Tag)</div><div class="wda-fcard-dsc"><code>&lt;p&gt;</code>, <code>&lt;div&gt;</code>처럼 구조를 표시하는 기호입니다. 여는 태그와 닫는 태그가 한 쌍을 이룹니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">속성(Attribute)</div><div class="wda-fcard-dsc">태그에 추가 정보를 주는 키-값 쌍입니다. 항상 여는 태그 안에 작성합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">요소(Element)</div><div class="wda-fcard-dsc">태그 + 속성 + 내용을 모두 합친 완전한 구조입니다.</div></div>
</div>

**• HTML: 태그·속성·요소 예시**

```html
<p class="intro">안녕하세요</p>
```

위 코드에서 `p`는 태그, `class="intro"`는 속성, `<p class="intro">안녕하세요</p>` 전체가 하나의 요소입니다.

---

## 2. 부모 · 자식 · 형제 관계

HTML 문서는 트리 구조로 표현됩니다. 이 트리에서 요소들은 서로 다음과 같은 관계를 가집니다.

**▶ 부모·자식·형제 관계**

<table class="wda-mtable">
<thead><tr><th>관계</th><th>의미</th></tr></thead>
<tbody>
<tr><td>부모(Parent)</td><td>바로 위에 있는 요소</td></tr>
<tr><td>자식(Child)</td><td>바로 아래에 있는 요소</td></tr>
<tr><td>형제(Sibling)</td><td>같은 부모를 둔 요소</td></tr>
<tr><td>조상(Ancestor)</td><td>위쪽에 있는 모든 요소</td></tr>
<tr><td>자손(Descendant)</td><td>아래쪽에 있는 모든 요소</td></tr>
</tbody>
</table>

**• HTML: 부모·자식·형제 구조 예시**

```html
<nav>
  <ul>
    <li>홈</li>
    <li>소개</li>
  </ul>
</nav>
```

이 예시에서 `ul`은 `nav`의 자식이고, 두 개의 `li`는 서로 형제입니다. `nav` 입장에서 두 `li`는 자식이 아니라 손자뻘, 즉 자손에 해당합니다.

---

## 3. 블록 요소 vs 인라인 요소

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">블록 요소</div>
    항상 새 줄에서 시작하고, 가능한 한 줄 전체 너비를 차지합니다. <code>width</code>, <code>height</code>를 지정할 수 있고 상하좌우 여백이 모두 적용됩니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">인라인 요소</div>
    같은 줄에 나란히 배치되고, 내용만큼만 너비를 차지합니다. <code>width</code>, <code>height</code>를 지정할 수 없고 좌우 여백만 의미 있게 적용됩니다.
  </div>
</div>

**▶ 블록·인라인 요소 대표 태그**

<table class="wda-mtable">
<thead><tr><th>구분</th><th>대표 태그</th></tr></thead>
<tbody>
<tr><td>블록 요소</td><td><code>div</code>, <code>p</code>, <code>h1</code>, <code>ul</code>, <code>li</code>, <code>section</code></td></tr>
<tr><td>인라인 요소</td><td><code>span</code>, <code>a</code>, <code>strong</code>, <code>em</code>, <code>label</code></td></tr>
</tbody>
</table>

**💡 설명**

<div class="wda-callout wda-ci">
  <p>CSS의 <code>display</code> 속성을 사용하면 요소의 성격을 바꿀 수 있습니다. 블록 요소를 인라인처럼, 인라인 요소를 블록처럼 동작하게 만들 수도 있습니다.</p>
</div>

---

## 4. 글로벌 속성

모든 HTML 요소에서 공통으로 사용할 수 있는 속성들입니다.

**▶ 글로벌 속성 역할**

<table class="wda-mtable">
<thead><tr><th>속성</th><th>역할</th></tr></thead>
<tbody>
<tr><td><code>class</code></td><td>여러 요소에 같은 스타일을 적용할 때 사용합니다. 공백으로 구분해 여러 개를 동시에 지정할 수 있습니다.</td></tr>
<tr><td><code>id</code></td><td>문서 안에서 단 하나뿐인 요소를 식별할 때 사용합니다. 같은 문서 안에서 중복될 수 없습니다.</td></tr>
<tr><td><code>style</code></td><td>요소 안에 직접 CSS를 작성할 때 사용합니다. 우선순위가 가장 높지만, 유지보수가 어려워 남용하지 않는 것이 좋습니다.</td></tr>
<tr><td><code>title</code></td><td>마우스를 올렸을 때 나타나는 툴팁 설명을 지정합니다.</td></tr>
<tr><td><code>data-*</code></td><td>개발자가 정한 이름으로 요소에 추가 데이터를 저장합니다.</td></tr>
<tr><td><code>lang</code></td><td>요소 또는 문서의 언어를 지정합니다.</td></tr>
</tbody>
</table>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><code>id</code>는 한 문서 안에서 <strong>단 하나만</strong> 사용할 수 있습니다. 같은 이름의 id를 여러 요소에 붙이면 스타일링이나 JavaScript 코드가 첫 번째 요소에만 정확히 적용되고 나머지는 예상과 다르게 동작할 수 있습니다.</p>
</div>

---

## 5. data-* 속성 자세히 보기

`data-*`는 화면에는 보이지 않지만 요소에 붙여두고 싶은 추가 정보를 저장할 때 사용합니다.

**• HTML: data-* 속성 지정**

```html
<li data-product-id="7">무선 이어폰</li>
```

**• JavaScript: dataset으로 data-* 값 읽기**

```js
const item = document.querySelector('li');
console.log(item.dataset.productId); // "7"
```

JavaScript에서는 `element.dataset.속성이름` 형태로 접근합니다. `data-product-id`처럼 하이픈으로 이어진 이름은 `dataset.productId`처럼 camelCase로 자동 변환되어 읽힙니다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><strong>태그</strong>는 기호, <strong>속성</strong>은 태그에 붙는 추가 정보, <strong>요소</strong>는 이 둘을 합친 완전한 구조다.</li>
    <li>요소들은 <strong>부모·자식·형제</strong> 관계로 트리 구조를 이룬다.</li>
    <li><strong>블록 요소</strong>는 새 줄에서 시작하고 전체 너비를 차지하며, <strong>인라인 요소</strong>는 내용만큼만 차지한다.</li>
    <li><strong>class</strong>는 여러 요소에 재사용, <strong>id</strong>는 문서 안에서 단 하나뿐인 요소를 가리킬 때 사용한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: class와 id는 둘 다 여러 요소에 자유롭게 붙여도 된다?</div>
    <div class="wda-mistake-right">정답: <strong>class</strong>는 여러 요소에 재사용할 수 있지만, <strong>id</strong>는 문서 안에서 단 한 번만 사용해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 인라인 요소도 width와 height를 자유롭게 지정할 수 있다?</div>
    <div class="wda-mistake-right">정답: 인라인 요소는 <strong>width, height를 지정할 수 없으며</strong>, 내용만큼만 너비를 차지한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 구성</div>
    <div class="wda-formula-block-body"><code>태그 + 속성 + 내용 = 요소</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 배치</div>
    <div class="wda-formula-block-body"><code>블록 = 새 줄 · 인라인 = 같은 줄</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 식별</div>
    <div class="wda-formula-block-body"><code>class = 재사용 · id = 유일함</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front"><code>&lt;p class="intro"&gt;안녕&lt;/p&gt;</code>에서 요소는 무엇인가?</div>
    <div class="wda-flip-back">태그, 속성, 내용을 모두 포함한 전체가 하나의 요소다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">같은 부모를 가진 요소들의 관계는?</div>
    <div class="wda-flip-back">형제(Sibling) 관계다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">블록 요소와 인라인 요소의 가장 큰 차이는?</div>
    <div class="wda-flip-back">블록은 새 줄에서 시작해 전체 너비를 차지하고, 인라인은 내용만큼만 너비를 차지한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">id 속성의 특징은?</div>
    <div class="wda-flip-back">문서 안에서 단 하나의 요소에만 사용해야 하는 고유 식별자다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">data-product-id는 JavaScript에서 어떻게 읽나?</div>
    <div class="wda-flip-back"><code>element.dataset.productId</code>로 읽는다.</div>
  </div>
</div>
