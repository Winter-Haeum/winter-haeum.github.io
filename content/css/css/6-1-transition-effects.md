---
title: "6-1 Transition으로 부드러운 전환 효과"
category: "frontend"
section: "css"
date: "2026-08-01"
status: "completed"
description: "transition의 4가지 속성과 timing-function 속도 곡선을 이해하고, hover·focus 상태에서 부드러운 전환 효과를 구현하는 방법을 정리합니다."
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
  • <strong>Transition 4가지 속성 이해</strong> — property, duration, timing-function, delay를 구분해서 적용할 수 있습니다<br>
  • <strong>hover·focus 전환 효과 구현</strong> — 사용자 인터랙션에 따라 부드럽게 변화하는 UI를 만들 수 있습니다<br>
  • <strong>timing-function 속도 곡선 활용</strong> — ease, linear, ease-out 등으로 애니메이션의 체감 속도를 조절할 수 있습니다<br>
  • <strong>실무 감각 습득</strong> — 버튼·카드·입력창 등 실전 컴포넌트에 적합한 전환값을 고를 수 있습니다
</div>

---

## 1. Transition은 어디에 정의해야 할까

지금까지 Flexbox로 레이아웃을 배치하는 방법을 봤다면, 이 문서부터는 상태 변화를 부드럽게 이어주는 방법을 다룬다.

이 문서에서는 transition의 4가지 속성과 트리거 상태를 중심으로 정리하고, 다단계 움직임은 다음 문서인 <code>@keyframes</code>·animation에서 이어간다.

transition은 "지금 상태(A)에서 목표 상태(B)로 변할 때, 그 변화를 얼마나 부드럽게 보여줄지"를 설정하는 속성이다. 여기서 가장 많이 헷갈리는 부분은 **transition을 어느 위치에 작성해야 하는가**다.

**• CSS: transition 작성 위치**

```css
.button {
  width: 100px;
  transition: width 0.5s; /* 초기 상태(A)에 작성 */
}

.button:hover {
  width: 150px; /* 목표 상태(B)의 값만 작성 */
}
```

`:hover` 블록 안에 `transition`을 넣으면 어떻게 될까. 마우스를 올릴 때는 전환이 적용되지만, 마우스를 뗄 때 목표 상태에는 이미 transition 정의가 없으므로 원래 상태로 즉시 툭 끊기듯 돌아간다.

그래서 원칙은 다음과 같다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>핵심 원칙</strong> — 전환 속성(<code>transition</code>)은 항상 <strong>초기 상태(A)</strong>에 작성하고, <strong>목표 상태(B)</strong>에는 변화가 일어날 값만 작성한다. 이렇게 해야 들어갈 때와 나갈 때 모두 부드럽게 동작한다.</p>
</div>

---

## 2. transition의 4가지 속성

transition은 아래 4가지 속성의 조합으로 동작한다.

**▶ transition 4가지 속성**

<table class="wda-mtable">
<thead><tr><th>속성</th><th>역할</th></tr></thead>
<tbody>
<tr><td><code>transition-property</code></td><td>어떤 속성을 부드럽게 전환할지 지정</td></tr>
<tr><td><code>transition-duration</code></td><td>전환에 걸리는 시간을 지정</td></tr>
<tr><td><code>transition-timing-function</code></td><td>전환되는 속도의 곡선(가감속 방식)을 지정</td></tr>
<tr><td><code>transition-delay</code></td><td>전환이 시작되기까지 대기하는 시간을 지정</td></tr>
</tbody>
</table>

### 🎯 transition-property — 무엇을 전환할지

**• CSS: transition-property 지정**

```css
.box-a { transition-property: background-color; }              /* 속성 1개 */
.box-b { transition-property: width, height; }                  /* 여러 속성, 콤마 구분 */
.box-c { transition-property: all; }                             /* 변화 가능한 모든 속성 */
```

**▶ transition-property 대상 카테고리**

<table class="wda-mtable">
<thead><tr><th>카테고리</th><th>대표 속성</th></tr></thead>
<tbody>
<tr><td>색상</td><td><code>color</code>, <code>background-color</code>, <code>border-color</code></td></tr>
<tr><td>크기</td><td><code>width</code>, <code>height</code>, <code>font-size</code></td></tr>
<tr><td>위치·변환</td><td><code>transform</code>, <code>top</code>, <code>left</code></td></tr>
<tr><td>시각 효과</td><td><code>opacity</code>, <code>box-shadow</code>, <code>filter</code></td></tr>
<tr><td>테두리·배경</td><td><code>border-radius</code>, <code>background-position</code></td></tr>
<tr><td>Flex/Grid</td><td><code>flex-grow</code>, <code>gap</code></td></tr>
</tbody>
</table>

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">all을 쓰는 경우</div>
    전환할 속성이 여러 개고 <strong>일일이 나열하기 번거로울 때</strong> 빠르게 적용할 수 있다. 다만 의도치 않은 속성까지 전환되어 성능이 떨어질 수 있다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">property 직접 지정</div>
    전환 대상이 명확해 <strong>불필요한 속성까지 계산하지 않는다</strong>. 실무에서는 대상이 명확하면 직접 지정하는 방식을 권장한다.
  </div>
</div>

### ⏱️ transition-duration — 얼마나 오래 걸릴지

**• CSS: transition-duration 지정**

```css
.a { transition-duration: 0.3s; }
.b { transition-duration: 300ms; }
.c { transition-property: width, background-color; transition-duration: 0.3s, 0.6s; } /* 속성별로 다르게 */
```

**▶ UI 요소별 추천 duration**

<table class="wda-mtable">
<thead><tr><th>UI 요소</th><th>추천 duration</th></tr></thead>
<tbody>
<tr><td>버튼 hover</td><td>0.2s ~ 0.3s</td></tr>
<tr><td>카드 hover</td><td>0.25s ~ 0.35s</td></tr>
<tr><td>모달 등장</td><td>0.3s ~ 0.5s</td></tr>
<tr><td>페이지 전환</td><td>0.4s ~ 0.7s</td></tr>
</tbody>
</table>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>초보자가 자주 헷갈리는 부분은 <strong>초(s) 단위와 밀리초(ms) 단위 표기</strong>다. <code>0.3s</code>와 <code>300ms</code>는 같은 값이지만, <code>0.3ms</code>처럼 소수점을 잘못 붙이면 거의 0에 가까운 시간이 되어 전환이 눈에 보이지 않는다.</p>
</div>

### 🎬 transition-timing-function — 어떤 속도로 변할지

**• CSS: transition-timing-function 지정**

```css
.a { transition-timing-function: ease; }
.b { transition-timing-function: linear; }
.c { transition-timing-function: ease-in-out; }
```

값의 종류는 다음 4장에서 자세히 다룬다.

### ⏱️ transition-delay — 언제 시작할지

**• 기본 사용**

```css
.a { transition-delay: 0s; }   /* 기본값. 즉시 시작 */
.b { transition-delay: 0.5s; } /* 0.5초 대기 후 시작 */
```

**• 속성별 다른 delay**

```css
/* 여러 속성에 각각 다른 delay 부여 */
.card {
  transition-property: transform, box-shadow;
  transition-delay: 0s, 0.1s;
}
```

**💡 설명**

<div class="wda-callout wda-ci">
  <p><code>transition-delay</code>에 음수 값을 주면 전환이 <strong>이미 진행된 지점부터</strong> 시작한 것처럼 보인다. 자주 쓰이지는 않지만 고급 타이밍 조절에 활용된다.</p>
</div>

---

## 3. transition shorthand — 한 줄로 합치기

실무에서는 4가지 속성을 각각 쓰기보다 shorthand 한 줄로 작성하는 경우가 많다.

**• 기본 문법**

```css
/* 문법: transition: property duration timing-function delay; */
.button {
  transition: background-color 0.3s ease-out 0s;
}
```

**• 여러 속성 함께 쓰기**

```css
/* 여러 속성을 콤마로 이어쓰기 */
.card {
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out 0.05s;
}
```

**• 최소 형태**

```css
/* 최소 형태 - property와 duration만 있어도 동작한다 */
.link { transition: color 0.2s; }
```

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p><strong>순서 암기법</strong> — "무엇을(property) · 얼마나(duration) · 어떻게(timing-function) · 언제(delay)" 순서로 외운다. duration은 생략할 수 없지만, timing-function과 delay는 생략 가능하며 각각 <code>ease</code>, <code>0s</code>가 기본값으로 적용된다.</p>
</div>

---

## 4. timing-function 속도 곡선 자세히 보기

같은 duration이라도 timing-function에 따라 체감 속도가 완전히 달라진다.

**▶ timing-function 곡선별 체감**

<table class="wda-mtable">
<thead><tr><th>값</th><th>속도 곡선</th><th>체감 느낌</th></tr></thead>
<tbody>
<tr><td><code>ease</code> (기본값)</td><td>천천히 시작 → 빠르게 → 천천히 끝</td><td>가장 자연스럽고 무난함</td></tr>
<tr><td><code>linear</code></td><td>처음부터 끝까지 일정한 속도</td><td>기계적이고 딱딱한 느낌</td></tr>
<tr><td><code>ease-in</code></td><td>천천히 시작 → 점점 빨라짐</td><td>화면에서 사라지는 동작에 적합</td></tr>
<tr><td><code>ease-out</code></td><td>빠르게 시작 → 점점 느려짐</td><td>화면에 등장하는 동작에 적합</td></tr>
<tr><td><code>ease-in-out</code></td><td>천천히 시작 → 빨라짐 → 천천히 끝</td><td>고급스럽고 부드러운 느낌</td></tr>
</tbody>
</table>

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p><strong>실무 권장</strong> — 대부분(90% 이상)의 상황에서는 <code>ease</code>만으로 충분하다. 요소가 <strong>등장</strong>할 때는 <code>ease-out</code>, <strong>사라질</strong> 때는 <code>ease-in</code>, 모달처럼 고급스러운 인상이 필요할 때는 <code>ease-in-out</code>을 사용한다.</p>
</div>

더 세밀한 곡선이 필요하면 `cubic-bezier()` 함수로 직접 곡선을 그리거나, `steps()`로 프레임 단위 애니메이션을 만들 수 있다.

**• CSS: cubic-bezier와 steps 활용**

```css
/* cubic-bezier(x1, y1, x2, y2) - 베지어 곡선의 두 제어점을 직접 지정 */
.bounce { transition-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55); }

/* steps(구간 수) - 연속적이지 않고 프레임처럼 끊어서 이동 */
.sprite { transition-timing-function: steps(4); }
```

**💡 설명**

<div class="wda-callout wda-ci">
  <p><code>cubic-bezier()</code>는 온라인 곡선 편집 도구(예: cubic-bezier.com)로 값을 시각적으로 조정한 뒤 붙여 넣는 방식이 일반적이다. <code>steps()</code>는 연속 전환이 아니라 계단식으로 값이 변해, 스프라이트 애니메이션 같은 프레임 표현에 쓰인다.</p>
</div>

---

## 5. transition의 트리거(변화 시점)

transition은 스스로 실행되지 않는다. 아래처럼 **상태를 바꾸는 이벤트**가 있어야 값이 달라지고, 그 변화가 부드럽게 이어진다.

**▶ transition 트리거 종류**

<table class="wda-mtable">
<thead><tr><th>트리거</th><th>발생 시점</th></tr></thead>
<tbody>
<tr><td><code>:hover</code></td><td>마우스를 요소 위에 올렸을 때</td></tr>
<tr><td><code>:focus</code></td><td>입력창 등이 포커스를 받았을 때</td></tr>
<tr><td><code>:active</code></td><td>요소를 클릭하고 있는 동안</td></tr>
<tr><td><code>:disabled</code></td><td>요소가 비활성화 상태로 바뀌었을 때</td></tr>
<tr><td><code>:focus-visible</code></td><td>키보드 등으로 포커스가 명확히 필요할 때만</td></tr>
<tr><td><code>:focus-within</code></td><td>자신 또는 자손 요소가 포커스를 가졌을 때</td></tr>
</tbody>
</table>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>값이 실제로 바뀌지 않으면 transition은 <strong>재생되지 않는다</strong>. 예를 들어 hover 시에도 색상 값을 동일하게 두면, transition을 정의해도 아무 변화도 보이지 않는다.</p>
</div>

---

## 6. 실무 예시 3종

**• 버튼 색 전환**

```css
/* 1. 버튼 색 전환 - 기본 */
.btn {
  background-color: #6366f1;
  transition: background-color 0.25s ease;
}
.btn:hover { background-color: #4f46e5; }
```

**• 카드 들어올리기**

```css
/* 2. 카드 들어올리기 */
.card {
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
}
.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}
```

**• 입력창 포커스 강조**

```css
/* 3. 입력창 포커스 강조 */
.input {
  border: 1px solid #ddd;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}
```

---

## 7. 전환이 부드럽지 않아 보이는 이유

같은 transition 코드를 써도 결과가 어색하게 느껴질 때가 있다. 대표적인 원인은 다음과 같다.

**▶ 어색한 전환의 원인과 해결**

<table class="wda-mtable">
<thead><tr><th>원인</th><th>해결 방법</th></tr></thead>
<tbody>
<tr><td>변화량이 너무 큼</td><td>이동 거리·크기 변화 폭을 줄여 자연스럽게 조정</td></tr>
<tr><td>duration이 너무 짧음</td><td>0.15s 미만이면 거의 즉시 변한 것처럼 보이므로 늘림</td></tr>
<tr><td>linear 사용</td><td>기계적으로 느껴지므로 ease 계열로 변경</td></tr>
<tr><td>그림자·transform의 과한 변화</td><td>변화 폭을 줄이고 timing-function을 ease-out으로 조정</td></tr>
</tbody>
</table>

---

## 8. Transition vs Animation

transition만으로 해결하기 어려운 움직임도 있다. 두 기능의 근본적인 차이는 다음과 같다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Transition</div>
    상태가 <strong>A → B 단 2개</strong>뿐이고, hover·focus 같은 <strong>트리거가 반드시 필요</strong>하다. 간단한 전환에 적합하다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Animation</div>
    <code>@keyframes</code>로 <strong>여러 단계</strong>를 미리 정의할 수 있고, <strong>트리거 없이 자동 실행</strong>되며 무한 반복도 가능하다. 복잡한 움직임에 적합하다.
  </div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  <p>로딩 스피너처럼 트리거 없이 계속 움직여야 하거나, 여러 단계를 거치는 복잡한 움직임이 필요하다면 transition이 아니라 <strong>animation과 @keyframes</strong>를 사용해야 한다. 이 내용은 다음 문서에서 이어간다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><strong>transition</strong>은 항상 초기 상태(A)에 작성하고, hover 등 목표 상태(B)에는 변화할 값만 작성한다.</li>
    <li>4가지 속성은 <strong>property·duration·timing-function·delay</strong> 순서로 이해한다.</li>
    <li>등장에는 <strong>ease-out</strong>, 퇴장에는 <strong>ease-in</strong>, 대부분의 경우 <strong>ease</strong>가 무난하다.</li>
    <li>transition은 값이 실제로 바뀌어야 재생되며, <strong>트리거가 반드시 필요</strong>하다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: transition은 :hover 블록 안에 정의해도 된다?</div>
    <div class="wda-mistake-right">정답: transition은 <strong>초기 상태(.button)</strong>에 정의해야 하며, hover 블록에 넣으면 마우스를 뗄 때 부드럽게 돌아오지 않는다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: outline: none을 쓰면 포커스 스타일이 깔끔하게 사라지므로 그대로 두면 된다?</div>
    <div class="wda-mistake-right">정답: outline을 제거했다면 <strong>box-shadow나 border 색상 변경 등 대체 focus 표시를 반드시 제공</strong>해야 키보드 사용자가 위치를 잃지 않는다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 모달이 부드럽게 나타나게 하려면 linear가 가장 무난하다?</div>
    <div class="wda-mistake-right">정답: 모달처럼 <strong>화면에 등장</strong>하는 요소에는 빠르게 시작해 천천히 멈추는 <strong>ease-out</strong>이 더 자연스럽다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · shorthand 순서</div>
    <div class="wda-formula-block-body"><code>property duration timing-function delay</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 축약 기본값</div>
    <div class="wda-formula-block-body"><code>transition: 0.3s = all 0.3s ease 0s</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 곡선 선택</div>
    <div class="wda-formula-block-body"><code>등장 ease-out · 퇴장 ease-in</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">transition을 정의해야 하는 올바른 위치는?</div>
    <div class="wda-flip-back">초기 상태(예: .button)에 작성한다. :hover 안에 넣으면 안 된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">모달창이 부드럽게 나타나는 효과를 주려면 어떤 timing-function이 적합한가?</div>
    <div class="wda-flip-back">ease-out이 적합하다. 빠르게 시작해 천천히 멈추므로 자연스러운 등장 느낌을 준다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">outline: none을 사용할 때 반드시 해야 할 일은?</div>
    <div class="wda-flip-back">box-shadow 등으로 대체 focus 표시를 반드시 제공해야 한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">transition: 0.3s;는 무엇과 같은가?</div>
    <div class="wda-flip-back">transition: all 0.3s ease 0s;와 같다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">transition의 트리거가 없어도 애니메이션을 자동 실행하려면?</div>
    <div class="wda-flip-back">transition이 아니라 animation과 @keyframes를 사용해야 한다.</div>
  </div>
</div>
