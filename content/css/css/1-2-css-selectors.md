---
title: "1-2 선택자로 원하는 요소 골라내기"
category: "frontend"
section: "css"
date: "2026-08-01"
status: "completed"
description: "태그·클래스·ID 기본 선택자와 조합 선택자, 가상 클래스로 원하는 요소만 정확히 골라내는 방법을 정리합니다."
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
  • <strong>기본 선택자 구분</strong> — 태그·클래스·ID 선택자 3가지의 차이와 우선순위를 이해합니다<br>
  • <strong>조합 선택자 활용</strong> — 자손·자식·그룹·전체 선택자로 원하는 요소만 정확히 골라냅니다<br>
  • <strong>가상 클래스 적용</strong> — <code>:hover</code>, <code>:focus</code>, <code>:active</code>로 인터랙티브한 스타일을 구현합니다<br>
  • <strong>선택자 읽는 순서 이해</strong> — 브라우저가 선택자를 해석하는 방식을 알고 성능을 고려한 선택자를 작성합니다
</div>

---

## 1. 기본 선택자 3가지

[이전 문서](/css/css/1-1-css-syntax-and-apply)에서 CSS를 어디에 어떻게 적용하는지 배웠다면, 이 문서에서는 "선택자 { 속성: 값; }" 구조 중 맨 앞의 선택자 부분을 자세히 다룬다. 선택자는 스타일을 적용할 대상을 정확히 지정하는 역할을 한다.

선택자를 얼마나 정교하게 쓰느냐에 따라 코드의 재사용성과 유지보수성이 크게 달라진다.

### 🏷️ 태그 선택자

HTML 태그 이름을 그대로 사용해 같은 종류의 요소 전체를 선택한다.

**• CSS: 태그 선택자**

```css
p {
  line-height: 1.6;
}
```

문서 안의 모든 `p` 태그에 한 번에 적용되므로 편리하지만, 페이지의 모든 문단에 무조건 같은 스타일이 적용되기 때문에 남용하면 특정 문단만 다르게 꾸미기가 어려워진다.

### 🆔 ID 선택자

`#id`처럼 샵 기호를 붙여 사용하며, 문서 안에서 단 하나뿐인 요소를 가리킬 때 쓴다.

**• CSS: ID 선택자**

```css
#header {
  background-color: #222;
}
```

ID는 문서 안에서 유일해야 하므로 재사용이 불가능하고, 우선순위 점수도 100점으로 높은 편이라 다른 스타일을 쉽게 덮어써 버릴 수 있다.

### 🧩 클래스 선택자

`.class`처럼 마침표를 붙여 사용하며, 여러 요소에 같은 스타일을 반복해서 적용할 수 있다.

**• CSS: 클래스 선택자**

```css
.card {
  border-radius: 8px;
  padding: 16px;
}
```

하나의 요소에 클래스를 여러 개 동시에 지정하는 것도 가능하다.

**• HTML: 클래스 여러 개 지정**

```html
<div class="card highlight">추천 상품</div>
```

**▶ 선택자별 우선순위와 재사용성**

<table class="wda-mtable">
<thead><tr><th>선택자</th><th>문법</th><th>우선순위 점수</th><th>재사용성</th></tr></thead>
<tbody>
<tr><td>태그 선택자</td><td><code>p</code></td><td>1점</td><td>전체 태그에 일괄 적용</td></tr>
<tr><td>ID 선택자</td><td><code>#header</code></td><td>100점</td><td>불가능 (문서 내 유일)</td></tr>
<tr><td>클래스 선택자</td><td><code>.card</code></td><td>10점</td><td>가장 높음</td></tr>
</tbody>
</table>

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>실무에서는 재사용성이 뛰어난 <strong>클래스 선택자</strong>를 기본으로 사용하는 것이 좋다. ID 선택자는 페이지 내 특정 앵커 이동이나 자바스크립트 훅으로 주로 남겨두고, 스타일링은 클래스 위주로 작성하는 것이 유지보수에 유리하다.</p>
</div>

---

## 2. 조합 선택자

### 🌿 자손 선택자

선택자 사이에 공백을 넣으면, 앞 선택자 안에 있는 모든 하위 요소(자식, 손자, 증손자 …)를 선택한다.

**• CSS: 자손 선택자**

```css
nav a {
  color: white;
}
```

`nav` 요소 안에 몇 단계로 중첩되어 있든 상관없이 모든 `a` 태그가 선택된다. 브라우저는 이 선택자를 왼쪽에서 오른쪽이 아니라 <strong>오른쪽에서 왼쪽</strong>으로 읽는다. 즉 먼저 `a` 태그를 전부 찾은 다음, 그중 조상에 `nav`가 있는 것만 걸러내는 방식으로 동작한다. 그래서 `.a .b .c .d`처럼 3단계 이상 중첩된 선택자는 브라우저가 걸러내야 할 후보가 많아져 비효율적이고, 어떤 요소를 가리키는지 코드만 보고 파악하기도 어려워진다.

### 🪜 자식 선택자

`>` 기호를 사용하면 바로 한 단계 아래의 직계 자식만 선택한다.

**• CSS: 자식 선택자**

```css
nav > a {
  color: white;
}
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">자손 선택자 (공백)</div>
    <code>nav a</code>는 <code>nav</code> 안에 몇 단계로 중첩되어 있어도 모든 <code>a</code>를 선택한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">자식 선택자 (&gt;)</div>
    <code>nav &gt; a</code>는 <code>nav</code> 바로 아래 <strong>1단계 직계</strong> <code>a</code>만 선택한다.
  </div>
</div>

### 🧺 그룹 선택자

쉼표로 여러 선택자를 나열하면, 각 선택자에 동일한 스타일을 한 번에 적용할 수 있어 중복 코드를 줄인다.

**• CSS: 그룹 선택자**

```css
h1, h2, h3 {
  font-weight: 700;
}
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>쉼표를 빠뜨리면 완전히 다른 의미가 된다. <code>h1 h2 h3</code>처럼 공백만 있으면 "h1 안의 h2 안의 h3"라는 자손 선택자로 해석되어 의도와 전혀 다르게 동작한다.</p>
</div>

### 🔲 전체 선택자

`*`는 문서 안의 모든 요소를 선택한다.

**• CSS: 전체 선택자**

```css
* {
  box-sizing: border-box;
}
```

모든 요소를 대상으로 하므로 브라우저가 검사해야 할 범위가 넓어 성능에 부담을 줄 수 있다.

그래서 보통 위 예시처럼 초기화 목적의 한두 줄에만 제한적으로 사용하고, 일반적인 스타일링에서는 필요한 범위만 명확히 지정하는 클래스나 자손 선택자를 대안으로 사용한다.

---

## 3. 가상 클래스로 인터랙션 표현하기

가상 클래스는 요소의 특정 "상태"에만 스타일을 적용할 때 사용한다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">:hover</div><div class="wda-fcard-dsc">마우스를 올렸을 때. 터치 기반 모바일에서는 정상 동작하지 않을 수 있다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">:focus</div><div class="wda-fcard-dsc">키보드 탭 이동이나 클릭으로 포커스를 받았을 때. 접근성에서 중요하다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">:active</div><div class="wda-fcard-dsc">마우스 버튼을 누르고 있는 클릭 순간. 눌림 효과를 표현한다.</div></div>
</div>

**• CSS: hover·focus 동시 지정**

```css
.nav-link:hover,
.nav-link:focus {
  color: crimson;
  text-decoration: underline;
}
```

`:hover`와 `:focus`를 함께 지정하면 마우스 사용자와 키보드 사용자 모두에게 같은 시각적 피드백을 줄 수 있다. 내비게이션 메뉴처럼 클릭 가능한 요소에는 이 조합을 기본으로 넣는 것이 좋다.

버튼은 보통 기본 상태 → hover → active 순서로 상태가 바뀌며 사용자에게 단계적인 피드백을 준다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">기본 상태</div><div class="wda-fnode-dsc">평상시 버튼 스타일</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">:hover</div><div class="wda-fnode-dsc">마우스를 올리면 색이 진해짐</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">:active</div><div class="wda-fnode-dsc">클릭하는 순간 살짝 눌린 효과</div></div>
</div>

**• CSS: 버튼 상태별 스타일**

```css
.btn {
  background-color: #6c5ce7;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
}

.btn:hover {
  background-color: #5a4bd6;
}

.btn:active {
  transform: scale(0.98);
}
```

---

## 4. 브라우저가 선택자를 읽는 순서

브라우저는 HTML을 분석해 만든 DOM 트리와, CSS를 분석해 만든 CSSOM 트리를 결합해서 각 요소에 어떤 스타일이 적용될지 계산한다. 이 계산 과정에서 선택자는 <strong>오른쪽에서 왼쪽</strong>으로 매칭된다.

**• CSS: 중첩 선택자 매칭 순서**

```css
.container .list li a {
  color: navy;
}
```

브라우저는 먼저 문서 안의 모든 `a` 태그를 찾은 뒤, 그 조상 중에 `li`가 있는지, 그 위에 `.list`가 있는지, 다시 그 위에 `.container`가 있는지를 거슬러 올라가며 확인한다. 선택자가 깊이 중첩될수록 이 확인 과정이 늘어나 느려질 수 있다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">느린 방식</div>
    <code>.container .list li a</code>처럼 여러 단계를 거치는 자손 선택자는 확인할 후보가 많아 비효율적이다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">빠른 방식</div>
    <code>.list-link</code>처럼 클래스를 직접 부여해서 단일 선택자로 지정하면 매칭 속도와 가독성이 모두 좋아진다.
  </div>
</div>

성능과 가독성을 함께 챙기려면 다음 원칙을 기억해두면 좋다.

<div class="wda-check-note">
  <ul>
    <li>마지막(가장 오른쪽) 선택자는 가능한 <strong>클래스나 ID</strong>로 구체적으로 지정한다.</li>
    <li>태그 선택자는 범위가 넓으니 신중하게 사용한다.</li>
    <li><strong>3단계 이상 중첩</strong>된 자손 선택자는 피한다.</li>
    <li>전체 선택자(<code>*</code>)는 초기화 목적 외에는 지양한다.</li>
  </ul>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><strong>태그·ID·클래스</strong> 선택자는 각각 1점·100점·10점의 우선순위를 가진다.</li>
    <li><strong>자손 선택자(공백)</strong>는 모든 하위 요소, <strong>자식 선택자(&gt;)</strong>는 직계 1단계만 선택한다.</li>
    <li><strong>그룹 선택자(,)</strong>는 여러 선택자에 같은 스타일을 한 번에 적용한다.</li>
    <li><strong>:hover, :focus, :active</strong>는 각각 마우스 오버, 포커스, 클릭 순간의 상태를 스타일링한다.</li>
    <li>선택자는 브라우저에서 <strong>오른쪽에서 왼쪽</strong>으로 해석된다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: nav a와 nav &gt; a는 같은 의미다?</div>
    <div class="wda-mistake-right">정답: <code>nav a</code>는 모든 자손 <code>a</code>를 선택하지만, <code>nav &gt; a</code>는 <strong>직계 자식 a만</strong> 선택한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: h1, h2, h3에서 쉼표를 공백으로 바꿔도 결과는 같다?</div>
    <div class="wda-mistake-right">정답: 쉼표가 빠지면 <strong>자손 선택자로 해석</strong>되어 완전히 다른 요소를 가리키게 된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: :hover는 모든 환경에서 동일하게 동작한다?</div>
    <div class="wda-mistake-right">정답: <code>:hover</code>는 <strong>터치 기반 모바일 환경</strong>에서는 제대로 동작하지 않을 수 있어 <code>:focus</code>와 함께 대비하는 것이 안전하다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 점수</div>
    <div class="wda-formula-block-body"><code>ID100 &gt; 클래스10 &gt; 태그1</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 범위</div>
    <div class="wda-formula-block-body"><code>공백 = 모든 자손 · &gt; = 직계만</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 해석 방향</div>
    <div class="wda-formula-block-body"><code>브라우저는 오른쪽 → 왼쪽</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">클래스 선택자의 올바른 문법은?</div>
    <div class="wda-flip-back"><code>.highlight</code>처럼 마침표로 시작한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front"><code>nav a</code>와 <code>nav &gt; a</code>의 차이는?</div>
    <div class="wda-flip-back">전자는 모든 자손 a를, 후자는 직계 자식 a만 선택한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">마우스를 올렸을 때 적용되는 가상 클래스는?</div>
    <div class="wda-flip-back"><code>:hover</code>다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front"><code>h1, h2, h3 { color: navy; }</code>의 결과는?</div>
    <div class="wda-flip-back">h1, h2, h3 모두에 navy 색이 적용된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">3단계 이상 중첩된 선택자를 피해야 하는 이유는?</div>
    <div class="wda-flip-back">브라우저가 오른쪽에서 왼쪽으로 매칭하는 과정에서 확인할 후보가 늘어나 느려지기 때문이다.</div>
  </div>
</div>
