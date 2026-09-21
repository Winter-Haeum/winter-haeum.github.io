---
title: "6-3 Hover 효과로 생동감 더하기"
category: "frontend"
section: "css"
date: "2026-08-01"
status: "completed"
description: "버튼·카드·이미지·텍스트에 적용하는 실전 hover 패턴과 자식·형제 요소 제어, :has()·:not() 활용법을 정리합니다."
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
  • <strong>버튼 hover 효과</strong> — 배경색, 크기, 그림자 변화를 조합해 인터랙티브한 버튼을 만듭니다<br>
  • <strong>카드 hover 효과</strong> — Lift Up과 Tilt(기울기) 효과로 카드 UI에 입체감을 더합니다<br>
  • <strong>이미지 확대 줌 효과</strong> — transform: scale()과 overflow를 활용해 자연스러운 줌을 구현합니다<br>
  • <strong>텍스트 언더라인 애니메이션</strong> — 가상 요소 ::after로 왼쪽에서 오른쪽으로 그려지는 밑줄을 만듭니다
</div>

---

## 1. 버튼 hover 효과

[2-5-1](/css/css/6-1-transition-effects)에서 transition의 기본기를, [2-5-2](/css/css/6-2-animation-keyframes)에서 animation과 @keyframes를 배웠다면, 이 문서는 그 둘을 실전 UI 패턴에 적용하는 종합 실습이다.

대부분의 예시는 transition만으로 충분히 구현된다.

버튼은 hover 효과를 가장 자주 적용하는 요소다. 기본 패턴은 아래 4가지로 정리된다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">색상 전환</div><div class="wda-fcard-dsc">배경색이나 글자색을 바꿔 클릭 가능함을 알린다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">크기 확대</div><div class="wda-fcard-dsc"><code>transform: scale()</code>로 살짝 커지며 반응한다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">그림자 추가</div><div class="wda-fcard-dsc">box-shadow로 떠오른 듯한 입체감을 준다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">복합 효과</div><div class="wda-fcard-dsc">색상+크기+그림자를 동시에 적용해 존재감을 강조한다.</div></div>
</div>

**• 색상 전환**

```css
/* 색상 전환 */
.btn { background-color: #6366f1; transition: background-color 0.25s ease; }
.btn:hover { background-color: #4f46e5; }
```

**• 크기 확대**

```css
/* 크기 확대 */
.btn { transition: transform 0.2s ease; }
.btn:hover { transform: scale(1.05); }
```

**• 그림자 추가**

```css
/* 그림자 추가 */
.btn { transition: box-shadow 0.25s ease; }
.btn:hover { box-shadow: 0 8px 16px rgba(99, 102, 241, 0.3); }
```

**• 복합 효과**

```css
/* 복합 효과 - 세 가지를 동시에 */
.btn {
  transition: all 0.25s ease;
}
.btn:hover {
  background-color: #4f46e5;
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(99, 102, 241, 0.3);
}
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>세 가지 효과를 동시에 쓸 때는 <code>transition-property</code>를 각각 나열하기보다 <code>transition: all 0.25s ease;</code>처럼 한 번에 지정하는 편이 관리하기 쉽다. 다만 대상 속성이 명확한 컴포넌트라면 개별 지정이 더 안전하다.</p>
</div>

---

## 2. 카드 hover: Lift Up과 Tilt

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Lift Up 효과</div>
    <code>translateY()</code>에 <strong>음수 값</strong>을 주면 요소가 위로 떠오른다. 그림자를 함께 키우면 공중에 뜬 느낌이 강화된다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Tilt(기울기) 효과</div>
    부모에 <code>perspective</code>를 주고 자식에 <code>rotateX/rotateY</code>를 적용하면 <strong>3D로 기울어지는</strong> 입체감을 만들 수 있다.
  </div>
</div>

**• Lift Up 효과**

```css
/* Lift Up - 위로 떠오르며 그림자가 커짐 */
.card {
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
}
.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 28px rgba(0, 0, 0, 0.15);
}
```

**• Tilt 효과**

```css
/* Tilt - perspective + rotateX/rotateY로 3D 기울임 */
.tilt-wrap {
  perspective: 1000px;
}
.tilt-card {
  transition: transform 0.3s ease-out;
}
.tilt-card:hover {
  transform: rotateX(6deg) rotateY(-6deg);
}
```

**💡 설명**

<div class="wda-callout wda-ci">
  <p><code>perspective</code>는 3D 공간의 "카메라와의 거리"를 설정한다. 값이 작을수록 원근감이 강해지고, 값이 클수록 평면에 가까워진다. <code>rotateX</code>는 가로축(X축) 기준 회전(위아래로 기울임), <code>rotateY</code>는 세로축(Y축) 기준 회전(좌우로 기울임)이다.</p>
</div>

---

## 3. 이미지 hover: 줌 효과와 오버레이

### 🧩 줌 효과

이미지를 확대할 때 부모 영역 밖으로 넘치지 않도록 부모에 `overflow: hidden`을 반드시 지정한다.

**• CSS: 이미지 줌 효과**

```css
.thumb {
  overflow: hidden; /* 핵심 - 확대된 이미지가 밖으로 넘치지 않도록 자름 */
  border-radius: 8px;
}
.thumb img {
  transition: transform 0.4s ease;
}
.thumb:hover img {
  transform: scale(1.1);
}
```

### 🧩 오버레이 효과

hover 시 이미지를 어둡게 만들고, 그 위에 캡션·버튼을 올릴 수 있는 기반을 만든다.

**• CSS: 이미지 오버레이 효과**

```css
.thumb {
  position: relative;
  overflow: hidden;
}
.thumb::after {
  content: '';
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.3s ease;
}
.thumb:hover::after {
  background-color: rgba(0, 0, 0, 0.5);
}
```

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>오버레이는 <code>::after</code> 가상 요소로 <code>rgba(0,0,0,0)</code>에서 <code>rgba(0,0,0,0.5)</code>로 배경색을 전환해 만든다. 부모에는 <code>position: relative</code>, 가상 요소에는 <code>position: absolute</code>가 필요하다. 이 위에 캡션이나 버튼을 <code>opacity</code> 전환과 함께 얹으면 이미지 카드 UI로 확장할 수 있다.</p>
</div>

---

## 4. 텍스트 hover: 언더라인 애니메이션

`text-decoration` 대신 가상 요소로 밑줄을 직접 그리면, 밑줄이 왼쪽에서 오른쪽으로 그려지는 애니메이션을 만들 수 있다.

**• CSS: 언더라인 그리기 애니메이션**

```css
.link {
  position: relative;
  text-decoration: none;
}
.link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 2px;
  background-color: currentColor;
  transition: width 0.3s ease-out;
}
.link:hover::after {
  width: 100%;
}
```

**💡 설명**

<div class="wda-callout wda-ci">
  <p><strong>핵심 포인트</strong> — 실제 <code>text-decoration: underline</code>을 쓰지 않고 <strong>가상 요소(::after)의 width를 0에서 100%로 전환</strong>하는 것이 이 애니메이션의 핵심이다. text-decoration은 즉시 나타나거나 사라질 뿐, 자라나는 효과를 줄 수 없다.</p>
</div>

---

## 5. 고급 hover: 자식·형제 요소 제어

### 🖱️ 자식 요소 제어

부모에 마우스를 올렸을 때 내부 자식 요소의 스타일을 함께 바꿀 수 있다.

**• CSS: 부모 hover로 자식 스타일 제어**

```css
.card:hover .icon  { transform: rotate(15deg) scale(1.1); }
.card:hover .title { color: #4f46e5; }
.card:hover .desc  { opacity: 1; transform: translateY(0); }
```

### 🖱️ 형제 요소 제어

**▶ 형제 선택자 hover 제어 가능 여부**

<table class="wda-mtable">
<thead><tr><th>선택자</th><th>의미</th><th>가능 여부</th></tr></thead>
<tbody>
<tr><td><code>.item:hover + .item</code></td><td>바로 다음 형제(인접 형제) 선택</td><td>CSS만으로 가능</td></tr>
<tr><td><code>.item:hover ~ .item</code></td><td>이후의 모든 형제(일반 형제) 선택</td><td>CSS만으로 가능</td></tr>
<tr><td>이전 형제 선택</td><td>hover한 요소보다 앞에 있는 형제 제어</td><td>CSS만으로 불가, JS 필요</td></tr>
</tbody>
</table>

**• CSS: 형제 요소 hover 제어**

```css
/* 다음 형제 하나만 흐리게 */
.item:hover + .item { opacity: 0.5; }

/* 이후 모든 형제를 흐리게 */
.item:hover ~ .item { opacity: 0.5; }
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>CSS 선택자는 <strong>역방향(이전 형제)</strong>을 지원하지 않는다. hover한 요소보다 앞에 있는 형제를 제어해야 한다면 JavaScript로 클래스를 토글하는 방식이 필요하다.</p>
</div>

---

## 6. 고급 hover: :has()와 :not() 활용

### 🔎 :has() — 자식·후손 상태 기반으로 부모 선택

`:has()`는 특정 자식이나 후손이 어떤 상태일 때 그 부모 자체를 선택할 수 있는 비교적 최신 CSS 기능이다.

**• form 상태 감지**

```css
/* input이 focus 상태일 때 form 전체 스타일 변경 */
form:has(input:focus) {
  border-color: #6366f1;
}
```

**• 목록 항목 강조**

```css
/* 체크된 input이 있는 목록 항목 강조 */
li:has(input:checked) {
  background-color: rgba(34, 197, 94, 0.08);
}
```

### 🔎 :not() — 특정 조건 제외

**• CSS: :not()으로 disabled 제외**

```css
/* disabled가 아닌 버튼에만 hover 효과 */
.btn:not(:disabled):hover {
  background-color: #4f46e5;
}
```

**• CSS: :not()으로 마지막 아이템 제외**

```css
/* 마지막 아이템을 제외한 나머지에만 hover 구분선 표시 */
.item:not(:last-child):hover {
  border-bottom: 1px solid #e5e7eb;
}
```

---

## 7. 실전 적용 포인트

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">과함 피하기</div><div class="wda-fcard-dsc">하나의 크고 화려한 애니메이션보다, 작은 변화 여러 개를 섞는 편이 더 자연스럽다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">의도적 설계</div><div class="wda-fcard-dsc">transition 대상 속성과 시간을 목적에 맞게 의도적으로 설계한다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">재사용성</div><div class="wda-fcard-dsc">공통 hover 스타일은 CSS 변수나 유틸리티 클래스로 관리해 재사용성을 높인다.</div></div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>성능 고려</strong> — <code>box-shadow</code>, <code>border-radius</code> 같은 속성을 과도하게 애니메이션하면 렌더링 비용이 커질 수 있다. <code>transform</code>과 <code>opacity</code> 중심으로 애니메이션을 설계하는 편이 성능에 유리하다.</p>
</div>

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p><strong>협업 팁</strong> — hover 효과를 코드로 바로 만들기 전에, 디자이너와 "언제, 얼마나, 어디로 움직이는지"를 Figma 프로토타입 등에서 먼저 정의해두면 구현 단계에서 시행착오를 줄일 수 있다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>이미지를 확대할 때는 부모에 <strong>overflow: hidden</strong>을 지정해 넘치는 부분을 잘라낸다.</li>
    <li>카드가 위로 떠오르는 효과는 <strong>transform: translateY(음수 값)</strong>으로 구현한다.</li>
    <li>텍스트 언더라인 애니메이션은 <strong>::after의 width를 0에서 100%로</strong> 전환해 만든다.</li>
    <li>hover 효과의 duration은 <strong>0.2초 ~ 0.4초</strong>가 무난하다(Google Material Design 권장값).</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 언더라인 애니메이션은 text-decoration만으로 구현할 수 있다?</div>
    <div class="wda-mistake-right">정답: text-decoration은 즉시 나타나거나 사라질 뿐이다. <strong>::after 가상 요소의 width</strong>를 전환해야 그려지는 애니메이션을 만들 수 있다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 형제 선택자로 이전 형제도 제어할 수 있다?</div>
    <div class="wda-mistake-right">정답: <code>+</code>, <code>~</code> 선택자는 모두 <strong>다음 형제만</strong> 가리킨다. 이전 형제를 제어하려면 JavaScript가 필요하다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 이미지 줌</div>
    <div class="wda-formula-block-body"><code>부모 overflow:hidden + 자식 scale()</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 카드 Lift</div>
    <div class="wda-formula-block-body"><code>translateY(-8px) + shadow 확대</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 밑줄 애니메이션</div>
    <div class="wda-formula-block-body"><code>::after width 0 → 100%</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">이미지가 확대될 때 컨테이너 밖으로 넘치지 않게 하려면?</div>
    <div class="wda-flip-back">부모 요소에 overflow: hidden을 지정한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">카드가 위로 떠오르는 효과를 주는 CSS는?</div>
    <div class="wda-flip-back">transform: translateY(-8px)처럼 음수 값을 지정한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">텍스트 언더라인이 왼쪽에서 오른쪽으로 그려지는 애니메이션의 핵심 전환은?</div>
    <div class="wda-flip-back">width: 0에서 width: 100%로의 전환이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">hover 효과의 최적 duration은 얼마인가?</div>
    <div class="wda-flip-back">Google Material Design 권장 기준 0.2초 ~ 0.4초다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">부모 hover 시 내부 자식 스타일을 바꾸려면 어떤 선택자를 쓰는가?</div>
    <div class="wda-flip-back">.parent:hover .child 형태의 후손 결합자를 사용한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">:has()는 어떤 기능을 하는가?</div>
    <div class="wda-flip-back">특정 자식·후손의 상태를 기준으로 그 부모 요소 자체를 선택할 수 있게 해준다.</div>
  </div>
</div>
