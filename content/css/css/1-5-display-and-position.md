---
title: "1-5 Display와 Position으로 배치하기"
category: "frontend"
section: "css"
date: "2026-08-01"
status: "completed"
description: "display 속성으로 요소의 표시 방식을, position과 z-index로 요소의 배치와 쌓임 순서를 제어하는 방법을 정리합니다."
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
  • <strong>Display 속성 활용</strong> — block, inline, inline-block, none 등 표시 방식을 구분하고 상황에 맞게 사용합니다<br>
  • <strong>Position 5가지 이해</strong> — static, relative, absolute, fixed, sticky로 요소를 원하는 위치에 배치합니다<br>
  • <strong>z-index 쌓임 순서 관리</strong> — Stacking Context 개념으로 요소 간 겹침 순서를 제어합니다<br>
  • <strong>실전 UI 패턴 구현</strong> — 고정 헤더, 모달, 툴팁 등 자주 쓰이는 배치 패턴을 만듭니다
</div>

---

## 1. Display 속성이란

[이전 문서](/css/css/1-4-box-model)에서 요소 하나의 크기와 여백을 다뤘다면, 이 문서에서는 그 요소들을 화면 어디에 어떤 방식으로 놓을지를 다룬다. display는 요소가 "어떻게 표시되는지"를, position은 "어디에 위치하는지"를 결정한다.

두 속성은 CSS 레이아웃의 뼈대가 되는 개념이므로, 이후 Flexbox·Grid를 배우기 전에 반드시 정리하고 넘어가야 한다.

`display`는 요소가 화면에 어떤 방식으로 표시될지를 결정하는 속성이다. 줄바꿈 여부, 크기 지정 가능 여부, 화면 표시 여부는 물론 Flexbox·Grid 같은 레이아웃 모드를 켜는 역할도 한다.

브라우저는 태그마다 기본 `display` 값을 미리 정해두고 있다.

**▶ 태그별 기본 display 값**

<table class="wda-mtable">
<thead><tr><th>display 기본값</th><th>대표 태그</th></tr></thead>
<tbody>
<tr><td><code>block</code></td><td><code>div</code>, <code>p</code>, <code>h1</code></td></tr>
<tr><td><code>inline</code></td><td><code>span</code>, <code>a</code>, <code>strong</code></td></tr>
<tr><td><code>inline-block</code></td><td><code>button</code>, <code>input</code></td></tr>
<tr><td><code>inline</code> (단, 크기 지정 가능)</td><td><code>img</code></td></tr>
</tbody>
</table>

---

## 2. 대표 display 값 자세히 보기

### 🧱 display: block

새 줄에서 시작하고, 부모 요소의 너비 전체를 차지한다. `width`, `height`, `margin`, `padding`을 모두 지정한 대로 적용받는다.

`div`, `p`, `h1`~`h6`, `ul`, `li`, `section` 등이 대표적인 block 요소다.

### 🧭 display: inline

줄바꿈 없이 다른 요소와 나란히 배치되며, 내용의 크기만큼만 공간을 차지한다. `width`, `height`는 지정해도 적용되지 않고, 상하 `margin`도 거의 효과가 없다(박스 모델 문서에서 다룬 라인 박스 특성 때문이다).

`span`, `a`, `strong`, `em`, `label` 등이 대표적이며, `img`는 inline 요소이지만 예외적으로 `width`/`height` 지정이 가능하다.

### 🧱 display: inline-block

block과 inline의 장점을 합친 하이브리드 방식이다. 다른 요소와 같은 줄에 나란히 배치되면서도, `width`, `height`, `margin`, `padding`을 자유롭게 지정할 수 있다.

버튼, 카드형 메뉴, 아이콘과 텍스트를 나란히 배치하는 UI에서 자주 활용된다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>HTML에서 <code>inline-block</code> 요소들을 줄바꿈하며 나열하면, 그 줄바꿈이 공백 문자로 인식되어 요소 사이에 의도치 않은 <strong>약 4px 간격</strong>이 생긴다. 해결 방법은 세 가지다: HTML에서 태그 사이 공백을 제거하거나, 태그를 한 줄로 이어 쓰거나, 부모 요소에 <code>font-size: 0</code>을 지정한 뒤 자식에서 다시 font-size를 지정하는 것이다.</p>
</div>

**• HTML: inline-block 간격 문제**

```html
<!-- 간격이 생기는 경우 -->
<div>
  <button>A</button>
  <button>B</button>
</div>

<!-- 한 줄로 작성해 간격 제거 -->
<div><button>A</button><button>B</button></div>
```

### 🧭 display: none

요소를 화면에서 완전히 숨기고, 차지하던 공간까지 없앤다. 단, HTML 문서(DOM)에는 여전히 존재하기 때문에 자바스크립트로 값을 바꿔 다시 표시할 수 있다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">display: none</div>
    화면에 표시되지 않고, 차지하던 공간도 사라진다. DOM에는 그대로 존재한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">visibility: hidden</div>
    화면에 보이지 않지만, 차지하던 공간은 <strong>그대로 유지</strong>된다. DOM에도 그대로 존재한다.
  </div>
</div>

---

## 3. Flex와 Grid 살짝 맛보기

`display: flex`와 `display: grid`는 여러 자식 요소를 한 번에 정렬하고 배치하기 위한 전용 레이아웃 모드다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">display: flex</div>
    가로 또는 세로 <strong>한 방향(1차원)</strong>으로 자식 요소를 정렬한다. 내비게이션 메뉴, 카드 리스트처럼 한 줄 또는 한 열 정렬에 적합하다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">display: grid</div>
    <strong>행과 열(2차원)</strong>을 동시에 제어한다. 대시보드, 갤러리처럼 격자형 레이아웃에 적합하다.
  </div>
</div>

두 속성 모두 세부 문법은 별도 문서에서 자세히 다루며, 여기서는 "1차원이면 flex, 2차원이면 grid"라는 기준만 기억해두면 충분하다.

---

## 4. Position 속성이란

`position`은 요소를 문서의 기본 흐름과 다르게 배치하고 싶을 때 사용하는 속성이다. 다섯 가지 값이 있다.

**▶ position 값 5가지 비교**

<table class="wda-mtable">
<thead><tr><th>값</th><th>의미</th><th>기준</th><th>이동 가능</th><th>스크롤 영향</th><th>대표 사용 예</th></tr></thead>
<tbody>
<tr><td><code>static</code></td><td>기본값, 문서 흐름 그대로</td><td>없음</td><td>불가능</td><td>같이 스크롤됨</td><td>일반적인 모든 요소</td></tr>
<tr><td><code>relative</code></td><td>원래 자리를 기준으로 이동</td><td>자기 자신의 원래 위치</td><td>가능</td><td>같이 스크롤됨</td><td>absolute 자식의 기준점 설정</td></tr>
<tr><td><code>absolute</code></td><td>문서 흐름에서 제거되어 배치</td><td>가장 가까운 positioned 조상</td><td>가능</td><td>같이 스크롤됨</td><td>툴팁, 배지, 모달 내용</td></tr>
<tr><td><code>fixed</code></td><td>뷰포트 기준 고정</td><td>브라우저 화면(뷰포트)</td><td>가능</td><td>스크롤해도 고정</td><td>고정 헤더, 우측 하단 버튼</td></tr>
<tr><td><code>sticky</code></td><td>relative처럼 있다가 fixed처럼 고정</td><td>부모 요소 영역 안</td><td>가능</td><td>조건부 고정</td><td>스크롤 시 고정되는 섹션 제목</td></tr>
</tbody>
</table>

`static`을 제외한 나머지 4가지 값을 가진 요소를 <strong>positioned 요소</strong>라고 부른다. `top`, `right`, `bottom`, `left`와 `z-index`는 이 positioned 요소에서만 실제로 동작한다.

---

## 5. 각 Position 값 자세히 보기

### 🧱 static

기본값이다. `top`, `right`, `bottom`, `left`를 지정해도 무시된다.

### 🧭 relative

원래 자리를 기준으로 위치를 이동시키지만, 이동 후에도 원래 차지하던 공간은 그대로 남는다. 다른 요소는 이 요소가 원래 있던 자리를 그대로 인식한다.

또한 `relative`는 자식 요소에 `absolute`를 줄 때 기준점을 잡아주는 용도로 매우 자주 사용된다.

**• CSS: relative 기준점 만들기**

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 0;
  right: 0;
}
```

### 🧱 absolute

문서 흐름에서 완전히 제거되어 다른 요소의 배치에 영향을 주지 않는다. 가장 가까운 <strong>positioned 조상</strong>(static이 아닌 조상)을 기준으로 위치가 계산되며, 그런 조상이 하나도 없으면 `html`/`body`를 기준으로 삼는다.

### 🧭 fixed

뷰포트(브라우저 화면)를 기준으로 고정되어 스크롤을 해도 같은 자리에 머문다.

단, 조상 요소 중 하나라도 `transform`, `perspective`, `filter`, `will-change`, `contain` 속성이 지정되어 있으면 그 조상이 새로운 기준점이 되어 화면 전체가 아닌 그 조상 기준으로 고정되는 예외가 발생할 수 있다.

**• CSS: fixed 헤더**

```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

body {
  padding-top: 60px; /* 헤더 높이만큼 본문을 밀어줘야 내용이 가려지지 않는다 */
}
```

`fixed` 요소는 문서 흐름에서 빠지기 때문에, 본문 콘텐츠가 그 자리로 올라와 가려질 수 있다. 헤더 높이만큼 본문에 `padding-top`을 주는 보정이 필요하다.

### 🧭 sticky

`relative`처럼 원래 자리에 있다가, 스크롤로 지정한 `top` 값에 도달하는 순간 `fixed`처럼 화면에 고정된다. 부모 영역을 벗어나면 고정이 해제되고 다시 원래 흐름으로 돌아간다.

**• CSS: sticky 섹션 제목**

```css
.section-title {
  position: sticky;
  top: 0;
}
```

`sticky`는 다음 네 가지 경우에는 의도대로 동작하지 않을 수 있다.

<div class="wda-check-note">
  <ul>
    <li>부모 요소에 <strong>overflow: hidden</strong> 등이 지정된 경우</li>
    <li>조상 요소 중 하나라도 overflow가 <strong>visible이 아닌 값</strong>으로 설정된 경우</li>
    <li>부모 요소의 <strong>높이가 자식보다 충분히 크지 않은</strong> 경우(고정될 여유 공간이 없음)</li>
    <li>부모가 <strong>flex 또는 grid 컨테이너</strong>인 경우 별도 정렬 설정이 필요할 수 있음</li>
  </ul>
</div>

---

## 6. top, right, bottom, left

이 네 속성은 positioned 요소가 기준점으로부터 얼마나 떨어질지를 지정한다. `static` 요소에서는 아무 효과가 없다.

**• CSS: 오프셋 속성 지정**

```css
.box {
  position: absolute;
  top: 10px;
  right: -5px; /* 음수 값도 사용 가능 */
  left: 50%;   /* 백분율도 사용 가능 */
}
```

---

## 7. z-index와 쌓임 순서

`z-index`는 겹쳐진 요소들 사이의 위아래 순서(쌓임 순서)를 숫자로 지정한다. 숫자가 클수록 위쪽에 놓인다.

**• CSS: z-index 쌓임 순서**

```css
.layer-1 { position: relative; z-index: 1; }
.layer-2 { position: relative; z-index: 2; } /* layer-1보다 위에 표시 */
```

`z-index`도 `top`/`left`처럼 <strong>positioned 요소(static이 아닌 요소)</strong>에서만 동작한다. 기본값은 `auto`이며, 음수 값도 사용할 수 있어 특정 요소를 다른 요소 뒤로 보낼 때 활용된다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>z-index는 같은 <strong>Stacking Context(쌓임 맥락)</strong> 안에서만 서로 비교된다. 부모 요소가 <code>opacity</code>가 1 미만이거나 <code>transform</code>, <code>filter</code>, <code>perspective</code>, <code>mix-blend-mode</code>, <code>isolation: isolate</code>, <code>will-change</code>, <code>position: fixed</code> 중 하나라도 가지고 있으면 그 부모가 새로운 Stacking Context를 만든다. 이 경우 자식에 아무리 큰 z-index를 줘도 다른 Stacking Context에 속한 요소보다 항상 위에 놓인다는 보장이 없다.</p>
</div>

---

## 8. 실전 UI 패턴

### 📌 고정 헤더

**• CSS: 고정 헤더 패턴**

```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}
body {
  padding-top: 60px;
}
```

### 🧩 모달

**• CSS: 모달 중앙 배치**

```css
.overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;
}
.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

overlay는 `fixed`로 화면 전체를 덮고, 그 위의 실제 모달 내용물은 `absolute`와 `transform: translate(-50%, -50%)`를 조합해 화면 정중앙에 배치한다.

### 💬 툴팁

**• CSS: 툴팁 배치**

```css
.tooltip-wrapper {
  position: relative;
}
.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.2s;
}
.tooltip-wrapper:hover .tooltip {
  opacity: 1;
}
```

기준이 되는 부모 요소에 `relative`를 주고, 툴팁 자체는 `absolute`로 배치한 뒤 `:hover` 상태에서 `opacity`를 전환해 부드럽게 나타나도록 만든다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><strong>block</strong>은 새 줄+전체 너비, <strong>inline</strong>은 같은 줄+내용만큼, <strong>inline-block</strong>은 같은 줄이면서 크기 지정 가능이다.</li>
    <li><strong>display: none</strong>은 공간까지 제거하지만, <strong>visibility: hidden</strong>은 공간을 유지한다.</li>
    <li>Position 5가지는 <strong>static, relative, absolute, fixed, sticky</strong>이며, static을 제외하면 모두 positioned 요소다.</li>
    <li><strong>absolute</strong>는 가장 가까운 positioned 조상을, <strong>fixed</strong>는 뷰포트를 기준으로 삼는다.</li>
    <li><strong>z-index</strong>는 positioned 요소에서만 동작하며, 같은 Stacking Context 안에서만 비교된다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: z-index 값을 아무리 높여도 안 먹힐 때는 값이 부족해서다?</div>
    <div class="wda-mistake-right">정답: 조상 요소가 <strong>새로운 Stacking Context</strong>를 만들고 있어서일 수 있다. transform, filter 등이 있는지 확인해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: sticky는 top 값만 지정하면 항상 고정된다?</div>
    <div class="wda-mistake-right">정답: 부모나 조상의 <strong>overflow 설정, 부모의 높이 부족, flex/grid 부모</strong> 등의 조건에서는 sticky가 동작하지 않을 수 있다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: position: static 요소에도 top, left로 위치를 옮길 수 있다?</div>
    <div class="wda-mistake-right">정답: <code>static</code>은 <strong>positioned 요소가 아니므로</strong> top/right/bottom/left가 모두 무시된다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · inline 특징</div>
    <div class="wda-formula-block-body"><code>줄바꿈 없음 + 크기 지정 불가</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · absolute 기준</div>
    <div class="wda-formula-block-body"><code>가장 가까운 positioned 조상</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · sticky 동작</div>
    <div class="wda-formula-block-body"><code>relative → (조건 충족) → fixed</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">display: inline 요소의 특징은?</div>
    <div class="wda-flip-back">줄바꿈 없이 같은 줄에 배치되고, 내용만큼만 공간을 차지한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">position: absolute의 기준점은?</div>
    <div class="wda-flip-back">가장 가까운 positioned 부모(조상)다. 없으면 html/body 기준이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">z-index가 동작하지 않는 경우는?</div>
    <div class="wda-flip-back">position이 static인 경우 z-index가 적용되지 않는다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">position: sticky의 특징은?</div>
    <div class="wda-flip-back">스크롤 위치에 따라 relative처럼 있다가 특정 지점에서 fixed처럼 고정되고, 부모 영역을 벗어나면 해제된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">고정 헤더를 만들 때 본문에 padding-top을 주는 이유는?</div>
    <div class="wda-flip-back">fixed 요소는 문서 흐름에서 빠지므로, 본문이 그 자리로 올라와 헤더에 가려지는 것을 막기 위해서다.</div>
  </div>
</div>
