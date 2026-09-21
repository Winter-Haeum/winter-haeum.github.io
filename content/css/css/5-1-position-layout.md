---
title: "5-1 Position으로 요소 배치하기"
category: "frontend"
section: "css"
date: "2026-08-01"
status: "completed"
description: "position 5가지 값을 모달·드롭다운·툴팁 등 실전 UI 패턴에 적용하고, absolute 기준점과 z-index 겹침 문제를 다루는 방법을 정리합니다."
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
  • <strong>Position 5가지 재정리</strong> — static, relative, absolute, fixed, sticky가 어떤 기준으로 요소를 배치하는지 실전 감각으로 다시 정리합니다<br>
  • <strong>기준점 찾기</strong> — 부모·자식 관계에서 absolute 요소가 어떤 조상을 기준으로 삼는지 정확히 판단합니다<br>
  • <strong>실전 UI 패턴 구현</strong> — 모달, 드롭다운, 툴팁, 사이드바, 토스트 등 실무에서 반복되는 배치 패턴을 코드로 만듭니다<br>
  • <strong>겹침 문제 해결</strong> — z-index와 Stacking Context 개념으로 UI가 예상과 다르게 겹치는 문제를 진단합니다
</div>

---

## 1. Position 다섯 가지, 실전 감각으로 다시 보기

[이전 문서](/css/css/1-5-display-and-position)에서 position 5가지 값의 기본 개념과 기준점을 익혔다면, 이 문서는 그 지식을 실제 화면에서 자주 마주치는 UI 조각으로 확장한다.

모달, 드롭다운, 툴팁, 사이드바, 토스트처럼 이름만 들어도 익숙한 컴포넌트들이 사실은 position 몇 줄의 조합으로 만들어진다는 것을 확인하고, 겹치는 요소들의 순서를 관리하는 z-index와 Stacking Context 기초까지 함께 정리한다.

바로 다음 섹션부터 실전 패턴을 만들기 때문에, 각 값의 기준점만 짧게 다시 짚어본다.

**▶ position 값별 기준점 요약**

<table class="wda-mtable">
<thead><tr><th>값</th><th>기준</th><th>한 줄 요약</th></tr></thead>
<tbody>
<tr><td><code>static</code></td><td>없음</td><td>기본 흐름 그대로, 아무 배치도 하지 않는다</td></tr>
<tr><td><code>relative</code></td><td>원래 자리</td><td>원래 자리를 기준으로 살짝 밀어낸다, 공간은 그대로 남는다</td></tr>
<tr><td><code>absolute</code></td><td>position이 지정된 가장 가까운 부모</td><td>문서 흐름에서 빠져나와 지정한 부모 기준으로 배치된다</td></tr>
<tr><td><code>fixed</code></td><td>브라우저 화면(뷰포트)</td><td>스크롤과 무관하게 화면에 고정된다</td></tr>
<tr><td><code>sticky</code></td><td>스크롤 + 부모 영역</td><td>relative처럼 있다가 특정 지점부터 fixed처럼 고정된다</td></tr>
</tbody>
</table>

---

## 2. 가장 많이 쓰는 조합: relative + absolute

실무에서 가장 자주 등장하는 조합은 부모에 `relative`, 자식에 `absolute`를 주는 패턴이다. 카드 위에 "NEW" 배지를 올리는 예시로 확인해본다.

**• HTML: 배지 카드 구조**

```html
<div class="card">
  <span class="badge">NEW</span>
  <img src="product.jpg" alt="상품 이미지" />
  <p>무선 이어폰</p>
</div>
```

**• CSS: 배지 위치 지정**

```css
.card {
  position: relative;
}
.badge {
  position: absolute;
  top: 8px;
  right: 8px;
}
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>부모(<code>.card</code>)에 <code>position: relative</code>를 깜빡하면 <code>.badge</code>는 가장 가까운 positioned 조상을 찾아 계속 위로 올라가다가, 결국 아무 조상도 못 찾으면 <strong>브라우저 전체(뷰포트)</strong>를 기준으로 배치된다. 카드 모서리에 붙어야 할 배지가 화면 구석으로 날아가는 사고는 대부분 이 실수 때문에 생긴다.</p>
</div>

---

## 3. Fixed 헤더가 콘텐츠를 가릴 때

`fixed` 요소는 문서 흐름에서 완전히 빠지기 때문에, 아래 콘텐츠가 헤더 자리까지 올라와 가려지는 문제가 흔히 발생한다.

**• 문제 코드**

```css
/* ❌ 문제 코드: 헤더가 아래 콘텐츠를 덮는다 */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
}
```

**• 해결 코드**

```css
/* ✅ 해결 코드: 헤더 높이만큼 여백을 확보한다 */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
}
body {
  padding-top: 60px;
}
```

`fixed` 요소는 레이아웃 공간을 전혀 차지하지 않는다. 그래서 헤더 높이만큼 body에 여백을 직접 계산해서 넣어줘야 콘텐츠가 가려지지 않는다.

---

## 4. Sticky로 섹션 헤더 고정하기

카테고리별 상품 목록에서 흔히 보이는, 스크롤하다가 섹션 제목이 상단에 붙는 패턴이다.

**• CSS: Sticky 섹션 헤더 고정**

```css
.section-header {
  position: sticky;
  top: 0;
}
```

스크롤이 이 요소에 닿기 전까지는 `relative`처럼 원래 자리에 머무르다가, `top: 0` 지점을 넘어가려는 순간 `fixed`처럼 화면에 고정된다. 부모 섹션의 범위를 벗어나면 고정이 풀리고 다시 원래 흐름으로 돌아간다.

---

## 5. absolute는 어떤 부모를 기준으로 삼는가

`absolute`는 "부모 전체"가 아니라 **position이 static이 아닌, 가장 가까운 조상**을 기준으로 삼는다. 3단계 중첩 구조로 확인해본다.

**• HTML: 3단계 중첩 구조**

```html
<div class="grandparent">
  <div class="parent">
    <div class="child">기준을 찾는 중...</div>
  </div>
</div>
```

**• CSS: positioned 조상 찾기**

```css
.grandparent {
  position: relative;
}
.parent {
  /* position 지정 없음 = static */
}
.child {
  position: absolute;
  top: 0;
  right: 0;
}
```

`.parent`에는 position이 지정되어 있지 않으므로 static이다. `.child`는 `.parent`를 건너뛰고 그 위의 `.grandparent`를 기준으로 배치된다.

"가장 가까운 부모"가 아니라 "가장 가까운 **positioned** 부모"라는 점이 핵심이다.

---

## 6. 실전 패턴: 모달 (Modal)

화면을 어둡게 덮는 오버레이와 그 위에 뜨는 본체로 구성된다.

**• HTML: 모달 구조**

```html
<div class="modal-overlay">
  <div class="modal">
    <button class="modal-close">×</button>
    <h2>알림</h2>
    <p>저장이 완료되었습니다.</p>
  </div>
</div>
```

**• CSS: 모달 오버레이·본체 스타일**

```css
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  position: relative;
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  width: min(90%, 420px);
}
.modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
}
```

**▶ 모달 요소별 역할**

<table class="wda-mtable">
<thead><tr><th>요소</th><th>역할</th></tr></thead>
<tbody>
<tr><td><code>.modal-overlay</code></td><td>fixed로 화면 전체를 덮어 뒤 콘텐츠 클릭을 막는다</td></tr>
<tr><td><code>.modal</code></td><td>relative로 close 버튼의 기준점 역할을 한다</td></tr>
<tr><td><code>.modal-close</code></td><td>absolute로 모달 우측 상단에 고정된다</td></tr>
<tr><td><code>z-index: 500</code></td><td>다른 UI(드롭다운, 툴팁 등)보다 위에 오도록 높은 값을 준다</td></tr>
</tbody>
</table>

실제 서비스에 적용할 때는 화면 크기를 넘지 않는 최대 너비 지정, 열리고 닫히는 애니메이션, 오버레이 바깥 클릭이나 ESC 키로 닫는 처리, 모달이 열려 있는 동안 배경 스크롤 잠그기, 여러 모달이 겹칠 때의 z-index 관리까지 함께 고려해야 한다.

---

## 7. 실전 패턴: 드롭다운 메뉴

부모에 마우스를 올렸을 때 하위 메뉴가 나타나는 패턴이다. relative + absolute 조합을 그대로 응용한다.

**• HTML: 드롭다운 메뉴 구조**

```html
<nav class="dropdown">
  <button>메뉴</button>
  <ul class="dropdown-menu">
    <li><a href="#">프로필</a></li>
    <li><a href="#">설정</a></li>
    <li><a href="#">로그아웃</a></li>
  </ul>
</nav>
```

**• CSS: 드롭다운 위치·표시 제어**

```css
.dropdown {
  position: relative;
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  display: none;
  min-width: 160px;
  z-index: 100;
}
.dropdown:hover .dropdown-menu,
.dropdown:focus-within .dropdown-menu {
  display: block;
}
```

`top: 100%`는 "부모 높이의 100% 지점", 즉 부모 바로 아래를 의미한다. 마우스만으로 여닫으면 키보드 사용자는 메뉴에 접근할 수 없으므로 `:focus-within`도 함께 걸어 키보드 탐색을 지원한다.

<div class="wda-check-note">
  <ul>
    <li>메뉴 너비가 좁아지지 않도록 <strong>min-width</strong>를 지정한다</li>
    <li>화면 오른쪽 끝에서는 메뉴가 화면 밖으로 나갈 수 있어 위치 보정이 필요하다</li>
    <li>모바일에서는 hover가 없으므로 <strong>탭 이벤트로 열고 닫는 방식</strong>을 별도로 구현한다</li>
    <li>다른 드롭다운과 z-index가 겹치지 않도록 계층을 미리 정해둔다</li>
  </ul>
</div>

---

## 8. 실전 패턴: 툴팁

아이콘에 마우스를 올렸을 때 나타나는 말풍선이다.

**• HTML: 툴팁 구조**

```html
<span class="tooltip-wrapper">
  ℹ️
  <span class="tooltip">추가 설명입니다</span>
</span>
```

**• CSS: 툴팁 위치·hover 표시**

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
  pointer-events: none;
  transition: opacity 0.15s;
}
.tooltip-wrapper:hover .tooltip {
  opacity: 1;
}
```

`bottom: 100%`는 부모 바로 위쪽에 붙인다는 뜻이고, `left: 50%` + `transform: translateX(-50%)` 조합은 툴팁을 가로로 정중앙에 맞춘다. 평소에는 `opacity: 0`과 `pointer-events: none`으로 완전히 숨겨두고 `:hover`일 때만 `opacity`를 바꿔 부드럽게 나타나게 한다.

`display: none` 대신 `opacity`를 쓰는 이유는 트랜지션 애니메이션을 걸 수 있기 때문이다.

실무에 적용할 때는 텍스트가 길어질 경우 `max-width`와 줄바꿈을 함께 지정하고, 모바일에서는 hover가 없으므로 탭으로 여닫는 대체 동작을 마련해야 한다.

스크린 리더 사용자를 위해 `aria-describedby` 같은 접근성 속성을 추가하는 것이 좋고, 화면 위쪽 끝에서는 `bottom` 대신 `top` 방향으로 전환하는 보정도 고려한다.

---

## 9. 실전 패턴: 오버레이 + 사이드바 (모바일 메뉴)

배경을 어둡게 덮는 오버레이와, 옆에서 밀려 들어오는 사이드바를 함께 구현한다.

**• CSS: 오버레이·사이드바 모바일 메뉴**

```css
.overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s;
  z-index: 200;
}
.sidebar {
  position: fixed;
  top: 0;
  left: -300px;
  width: 300px;
  height: 100%;
  background: #fff;
  transition: left 0.25s;
  z-index: 210;
}
.menu-open .overlay {
  opacity: 1;
  pointer-events: auto;
}
.menu-open .sidebar {
  left: 0;
}
```

오버레이와 사이드바 모두 스크롤과 무관하게 항상 같은 자리에 있어야 하므로 둘 다 `fixed`를 쓴다. 사이드바는 평소 화면 밖(`left: -300px`)에 숨겨두었다가 `left: 0`으로 슬라이딩해 들어온다.

오버레이보다 사이드바의 z-index를 더 높게 둬서 사이드바가 항상 위에 보이도록 한다. `opacity`와 `left`처럼 서로 다른 속성의 transition을 분리해두면 애니메이션이 겹쳐도 어색하지 않다.

<div class="wda-check-note">
  <ul>
    <li>열림·닫힘 상태는 <strong>클래스 토글</strong>(예: menu-open)로 제어한다</li>
    <li>오버레이를 클릭하면 사이드바가 닫히도록 이벤트를 연결한다</li>
    <li>슬라이딩 도중 애니메이션이 끊기지 않도록 <code>transition</code> 속성을 명확히 지정한다</li>
    <li>ESC 키로도 닫을 수 있게 키보드 접근성을 챙긴다</li>
    <li>사이드바가 열려 있는 동안은 배경 스크롤을 막아야 한다</li>
  </ul>
</div>

---

## 10. 실전 패턴: Floating 버튼 & 플로팅 메뉴

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">플로팅 버튼</div>
    <code>position: fixed</code>로 화면 구석에 항상 떠 있는 버튼이다. 채팅 문의 버튼, 맨 위로 가기 버튼처럼 스크롤과 무관하게 항상 눌러야 하는 UI에 쓴다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">플로팅 메뉴</div>
    플로팅 버튼을 <code>relative</code> 기준으로 삼고, 눌렀을 때 펼쳐지는 서브 메뉴는 <code>absolute</code>로 배치한다. 화면 어디에 있든 버튼 주변에 정확히 붙는다.
  </div>
</div>

**• CSS: Floating 버튼**

```css
.fab {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 300;
}
```

---

## 11. 실전 패턴: Toast 알림 스택

화면 구석에 알림이 하나씩 쌓이는 패턴이다.

**• CSS: Toast 알림 스택**

```css
.toast-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column-reverse;
  gap: 8px;
  z-index: 9999;
}
.toast {
  animation: slideIn 0.25s ease-out;
}
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

`column-reverse`를 쓰면 새 토스트가 항상 화면과 가장 가까운 자리에서부터 쌓여 자연스러운 알림 흐름을 만든다. `z-index: 9999`처럼 매우 높은 값을 주는 이유는 토스트가 어떤 화면에서도 다른 요소에 가려지면 안 되는, 사실상 가장 위 계층의 UI이기 때문이다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>토스트가 여러 개 쌓이면 화면을 너무 많이 가릴 수 있다. 최대 개수를 제한하거나 오래된 토스트부터 자동으로 사라지게 하고, <code>prefers-reduced-motion</code> 미디어 쿼리로 모션에 민감한 사용자를 위한 대체 처리를 함께 고려해야 한다. 스크린 리더 사용자를 위해서는 <code>role="alert"</code> 속성도 권장된다. 배경 콘텐츠와 겹치지 않도록 위치와 여백도 함께 점검한다.</p>
</div>

---

## 12. 실전 패턴: 스크롤 구동 헤더 (Scroll-driven Header)

자바스크립트 없이 순수 CSS만으로 스크롤 방향에 따라 헤더를 숨기고 보여주는 최신 패턴이다.

**• CSS: 스크롤 구동 헤더**

```css
.scroll-area {
  overflow-y: scroll;
  scroll-timeline-name: --page-scroll;
  scroll-timeline-axis: y;
}
.header {
  position: sticky;
  top: 0;
  animation: hide-header linear;
  animation-timeline: --page-scroll;
  animation-range: 0 200px;
}
@keyframes hide-header {
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
}
```

`scroll-timeline-name`은 스크롤 컨테이너에 이름을 붙여 애니메이션이 참조할 수 있게 하고, `scroll-timeline-axis: y`는 세로 스크롤을 기준으로 삼는다는 뜻이다.

헤더는 `position: sticky`로 기본 위치를 잡고, `animation-timeline`으로 그 스크롤 진행 상황을 애니메이션 진행률과 연결한다. `animation-range: 0 200px`는 스크롤이 0~200px 진행되는 구간에서만 애니메이션이 재생된다는 의미다.

<div class="wda-check-note">
  <ul>
    <li>스크롤 기준 영역(<code>scroll-timeline</code>이 걸린 요소)이 정확한지 먼저 확인한다</li>
    <li>헤더가 다른 콘텐츠와 겹치지 않도록 z-index를 함께 조정한다</li>
    <li><code>animation-range</code> 값을 조정해 숨김 속도를 세밀하게 맞출 수 있다</li>
    <li>모바일에서 스크롤이 튀는 현상이 없는지 실기기로 확인한다</li>
    <li><code>prefers-reduced-motion</code>을 고려해 모션을 줄인 대체 스타일을 마련한다</li>
    <li>구형 브라우저를 지원해야 한다면 <code>@supports</code>로 폴백 스타일을 준비한다</li>
  </ul>
</div>

---

## 13. 실전 패턴: 커스텀 셀렉트 (Custom Select)

기본 `<select>` 대신 자유롭게 디자인한 드롭다운 선택 UI다.

**• HTML: 커스텀 셀렉트 구조**

```html
<div class="custom-select">
  <button class="custom-select-trigger">옵션 선택</button>
  <ul class="custom-select-options">
    <li>옵션 1</li>
    <li>옵션 2</li>
    <li>옵션 3</li>
  </ul>
</div>
```

**• CSS: 커스텀 셀렉트 옵션 표시**

```css
.custom-select {
  position: relative;
}
.custom-select-options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  display: none;
  z-index: 100;
}
.custom-select.open .custom-select-options {
  display: block;
}
```

구조는 드롭다운 메뉴와 거의 같다. `.custom-select`가 relative로 기준점 역할을 하고, 옵션 목록은 absolute로 그 바로 아래(`top: 100%`)에 붙는다.

`open` 클래스를 토글해 `display`를 none과 block으로 전환하는 방식으로 열림·닫힘을 제어한다.

실무에서는 옵션이 많아질 때 `max-height`와 `overflow-y: auto`로 스크롤 영역을 만들고, 화면 하단에서 옵션이 가려지면 위쪽으로 펼쳐지도록 위치를 보정한다. 모바일에서는 터치 영역을 충분히 키우고, 바깥 영역을 클릭했을 때 옵션 목록이 자동으로 닫히도록 이벤트를 연결해야 한다.

---

## 14. 성능과 주의사항

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">레이어 비용</div><div class="wda-fcard-dsc"><code>absolute</code>/<code>fixed</code>는 새로운 레이어를 만든다. 남발하면 렌더링 성능이 떨어질 수 있어 가능하면 Flexbox·Grid를 먼저 고려한다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">모바일 100vh 문제</div><div class="wda-fcard-dsc">iOS Safari는 주소창 높이만큼 <code>100vh</code> 계산이 달라진다. 최신 단위인 <code>dvh</code>(동적 뷰포트 높이)를 사용하면 이 문제를 피할 수 있다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">절대 위치 남용 금지</div><div class="wda-fcard-dsc">absolute를 과하게 쓰면 유지보수가 어려워지고 반응형 레이아웃이 쉽게 깨진다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">디버깅 습관</div><div class="wda-fcard-dsc">DevTools의 Layers 패널로 레이어를, Rendering 탭으로 Repaint·Reflow를 확인하고, 실기기와 다양한 뷰포트에서 직접 테스트한다.</div></div>
</div>

레이아웃을 짤 때는 다음 순서로 방법을 고민하는 것이 좋다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1. Flexbox / Grid</div><div class="wda-fnode-dsc">가장 먼저 고려</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2. 상대적 이동</div><div class="wda-fnode-dsc">relative로 미세 조정</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3. 고정 배치</div><div class="wda-fnode-dsc">sticky로 스크롤 고정</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">4. absolute / fixed</div><div class="wda-fnode-dsc">다른 방법이 없을 때 최후 수단</div></div>
</div>

position은 필요한 곳에만 최소한으로 쓰고, 전체 레이아웃은 Flexbox·Grid로 짜는 것이 가장 안정적이다. 특히 모바일에서 fixed·absolute·100vh를 함께 쓸 때는 항상 실기기 테스트를 병행해야 한다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><strong>absolute</strong>는 position이 static이 아닌 가장 가까운 조상을 기준으로 배치된다.</li>
    <li><strong>fixed</strong> 요소는 레이아웃 공간을 차지하지 않으므로, 콘텐츠가 가려지지 않게 body에 <strong>padding-top</strong>을 보정해야 한다.</li>
    <li>모달·사이드바·토스트처럼 겹치는 UI가 많을수록 <strong>z-index 계층을 미리 설계</strong>해야 한다.</li>
    <li>레이아웃은 항상 <strong>Flexbox/Grid → relative → sticky → absolute/fixed</strong> 순서로 검토한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: absolute 요소는 가장 가까운 부모를 기준으로 배치된다?</div>
    <div class="wda-mistake-right">정답: <strong>position이 static이 아닌</strong> 가장 가까운 조상을 기준으로 배치된다. 부모가 static이면 그 위 조상을 계속 찾아 올라간다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: fixed 헤더는 그냥 올려두기만 하면 된다?</div>
    <div class="wda-mistake-right">정답: fixed는 레이아웃 공간을 차지하지 않으므로 <strong>body에 padding-top</strong>을 별도로 줘야 콘텐츠가 가려지지 않는다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 모달(z-index 200)과 드롭다운(z-index 100)이 동시에 열려 있으면 나중에 그려진 요소가 항상 위에 보인다?</div>
    <div class="wda-mistake-right">정답: <strong>z-index 값이 더 큰 요소</strong>가 항상 위에 보인다. 모달이 200, 드롭다운이 100이면 드롭다운은 모달 뒤에 가려진다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 모바일에서 100vh를 쓰면 화면 전체 높이를 항상 정확히 채운다?</div>
    <div class="wda-mistake-right">정답: iOS Safari 등에서는 주소창 높이가 반영되어 <strong>콘텐츠가 잘리는 문제</strong>가 생길 수 있다. dvh 단위로 해결한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 기준점</div>
    <div class="wda-formula-block-body"><code>absolute = 가장 가까운 positioned 조상</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 가림 보정</div>
    <div class="wda-formula-block-body"><code>fixed 헤더 = body padding-top 필수</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 우선순위</div>
    <div class="wda-formula-block-body"><code>Flex/Grid → relative → sticky → absolute/fixed</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">absolute 요소는 어떤 부모를 기준으로 배치되나?</div>
    <div class="wda-flip-back">position이 static이 아닌 가장 가까운 조상. 없으면 html/body 기준.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">fixed 헤더가 콘텐츠를 가릴 때 해결 방법은?</div>
    <div class="wda-flip-back">body에 헤더 높이만큼 padding-top을 추가한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">모달과 오버레이는 왜 fixed로 만드나?</div>
    <div class="wda-flip-back">스크롤과 무관하게 항상 화면 전체를 덮어야 하기 때문이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">툴팁에서 opacity + pointer-events: none을 쓰는 이유는?</div>
    <div class="wda-flip-back">display: none 대신 써서 트랜지션 애니메이션을 걸 수 있고, 평소에는 클릭도 막을 수 있기 때문이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">토스트 알림에 z-index: 9999를 주는 이유는?</div>
    <div class="wda-flip-back">어떤 화면에서도 다른 UI에 가려지지 않아야 하는 최상위 계층이기 때문이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">모바일에서 100vh 대신 권장되는 단위는?</div>
    <div class="wda-flip-back">주소창 높이 변화까지 반영하는 dvh(동적 뷰포트 높이)다.</div>
  </div>
</div>
