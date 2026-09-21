---
title: "6-2 Animation과 @keyframes로 움직임 표현하기"
category: "frontend"
section: "css"
date: "2026-08-01"
status: "completed"
description: "@keyframes 문법과 animation의 8가지 속성을 이해하고, 로딩 스피너·페이드인·슬라이드 같은 실전 애니메이션을 구현합니다."
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
  • <strong>@keyframes 다단계 정의 이해</strong> — From-to와 percentage 구문을 활용해 여러 상태 변화를 시간 흐름에 따라 설계합니다<br>
  • <strong>8가지 animation 속성 조합</strong> — name, duration, timing-function, delay, iteration-count, direction, fill-mode, play-state를 목적에 맞게 조합합니다<br>
  • <strong>실전 애니메이션 구현</strong> — 로딩 스피너, 페이드인, 슬라이드 같은 UI 패턴을 직접 만들 수 있습니다
</div>

---

## 1. Animation vs Transition

[이전 문서](/css/css/6-1-transition-effects)에서 transition으로 A → B 2개 상태만 부드럽게 잇는 방법을 봤다면, 이 문서에서는 트리거 없이 자동 실행되고 여러 단계를 거칠 수 있는 animation과 @keyframes를 다룬다.

두 기능은 비슷해 보이지만 설계 목적이 다르다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Animation</div>
    <code>@keyframes</code>로 <strong>N개의 상태</strong>를 미리 선언해두고, 트리거 없이 <strong>자동 실행</strong>된다. 무한 반복과 방향 제어(정방향/역방향/왕복)까지 가능하다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Transition</div>
    상태가 <strong>A → B 2개</strong>뿐이며, hover·focus 같은 <strong>트리거가 필요</strong>하다. 1회 실행 후 트리거가 사라지면 자동으로 원래 상태로 복귀한다.
  </div>
</div>

**• Animation**

```css
/* Animation - 다단계, 트리거 없이 자동 실행 */
@keyframes fadeInSlide {
  0%   { opacity: 0; transform: translateY(20px); }
  50%  { opacity: 0.5; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
.box { animation: fadeInSlide 0.6s ease-out; }
```

**• Transition**

```css
/* Transition - 2개 상태, hover 트리거 필요 */
.button { background-color: #6366f1; transition: background-color 0.3s; }
.button:hover { background-color: #4f46e5; }
```

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>단순한 색상·크기 전환에는 transition, 로딩 스피너처럼 <strong>계속 반복</strong>되거나 여러 단계를 거치는 복잡한 움직임에는 animation을 사용한다.</p>
</div>

---

## 2. @keyframes 기본 문법

`@keyframes`는 애니메이션의 각 시점에서 요소가 어떤 상태여야 하는지 미리 선언하는 규칙이다. 작성 방식은 크게 두 가지다.

### 🎞️ From-to 구문 — 2단계 전환

시작과 끝, 딱 2개 상태만 있을 때 사용하는 간단한 구문이다.

**• fadeIn**

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
.el { animation: fadeIn 0.5s ease; }
```

**• slideIn**

```css
@keyframes slideIn {
  from { transform: translateX(-100%); }
  to   { transform: translateX(0); }
}
```

**• rotate**

```css
@keyframes rotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
```

### 🎞️ Percentage(%) 구문 — 다단계 전환

0%부터 100% 사이에 원하는 만큼 지점을 나눠 정밀하게 타이밍을 제어할 수 있다.

**• pulse**

```css
@keyframes pulse {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.08); }
  100% { transform: scale(1); }
}
```

**• rainbow**

```css
@keyframes rainbow {
  0%   { background-color: #ef4444; }
  25%  { background-color: #f59e0b; }
  50%  { background-color: #22c55e; }
  75%  { background-color: #3b82f6; }
  100% { background-color: #ef4444; }
}
```

**• bounce**

```css
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-20px); }
}
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">From-to를 선택하는 경우</div>
    상태가 <strong>단순히 시작과 끝, 2개</strong>뿐일 때 사용한다. 코드가 짧고 읽기 쉽다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Percentage를 선택하는 경우</div>
    중간에 <strong>거쳐야 할 단계가 여러 개</strong>일 때 사용한다. 각 지점의 타이밍을 정밀하게 조정할 수 있다.
  </div>
</div>

---

## 3. animation의 8가지 속성

`@keyframes`로 상태를 정의했다면, 이제 그 애니메이션을 요소에 어떻게 적용할지 8가지 속성으로 제어한다.

**▶ animation 8가지 속성**

<table class="wda-mtable">
<thead><tr><th>속성</th><th>역할</th><th>필수 여부</th></tr></thead>
<tbody>
<tr><td><code>animation-name</code></td><td>사용할 @keyframes의 이름 지정</td><td>필수</td></tr>
<tr><td><code>animation-duration</code></td><td>애니메이션 1회 재생 시간</td><td>필수</td></tr>
<tr><td><code>animation-timing-function</code></td><td>속도 곡선(기본값 ease)</td><td>선택</td></tr>
<tr><td><code>animation-delay</code></td><td>시작까지 대기 시간(기본값 0s)</td><td>선택</td></tr>
<tr><td><code>animation-iteration-count</code></td><td>반복 횟수(기본값 1)</td><td>선택</td></tr>
<tr><td><code>animation-direction</code></td><td>재생 방향(기본값 normal)</td><td>선택</td></tr>
<tr><td><code>animation-fill-mode</code></td><td>시작 전·종료 후 상태 유지(기본값 none)</td><td>선택</td></tr>
<tr><td><code>animation-play-state</code></td><td>재생·정지 제어(기본값 running)</td><td>선택</td></tr>
</tbody>
</table>

### ⏱️ animation-name / duration / timing-function

**• 기본 사용**

```css
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.el {
  animation-name: fadeIn;
  animation-duration: 0.6s;
  animation-timing-function: ease-in-out;
}
```

**• 로딩 스피너**

```css
/* 로딩 스피너 - linear가 자연스럽다 */
.spinner {
  animation-name: rotate;
  animation-duration: 1s;
  animation-timing-function: linear;
}
```

**• 탄성 효과**

```css
/* cubic-bezier로 탄성 느낌 부여 */
.bounce-btn {
  animation-name: pulse;
  animation-duration: 0.5s;
  animation-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
```

### 🔁 animation-delay / iteration-count

**• delay 기본값**

```css
.el { animation-delay: 0s; }    /* 기본값. 즉시 시작 */
.el { animation-delay: 0.3s; }  /* 0.3초 대기 후 시작 */
.el { animation-delay: -0.5s; } /* 이미 0.5초 진행된 지점부터 시작 */
```

**• Stagger 효과**

```css
/* Stagger - 목록 아이템을 순차적으로 등장시키기 */
.item:nth-child(1) { animation-delay: 0s; }
.item:nth-child(2) { animation-delay: 0.1s; }
.item:nth-child(3) { animation-delay: 0.2s; }
```

**• 반복 횟수**

```css
.el { animation-iteration-count: 1; }        /* 기본값 */
.el { animation-iteration-count: infinite; } /* 무한 반복 */
.el { animation-iteration-count: 2.5; }      /* 소수점도 가능 */
```

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">로딩 스피너</div><div class="wda-fcard-dsc"><code>infinite</code>로 무한 반복시켜 로딩 중임을 계속 표시한다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">알림 배지</div><div class="wda-fcard-dsc"><code>3</code>처럼 정해진 횟수만 흔들리게 해 주의를 끈 뒤 멈춘다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">배경 애니메이션</div><div class="wda-fcard-dsc"><code>infinite</code> + 느린 duration으로 은은한 배경 움직임을 만든다.</div></div>
</div>

### 🎞️ animation-direction / fill-mode

**▶ animation-direction 값별 동작**

<table class="wda-mtable">
<thead><tr><th>direction 값</th><th>동작</th></tr></thead>
<tbody>
<tr><td><code>normal</code> (기본값)</td><td>매번 처음부터 끝까지 정방향 재생</td></tr>
<tr><td><code>reverse</code></td><td>매번 끝에서 처음으로 역방향 재생</td></tr>
<tr><td><code>alternate</code></td><td>정방향 → 역방향을 번갈아 재생(왕복)</td></tr>
<tr><td><code>alternate-reverse</code></td><td>역방향 → 정방향을 번갈아 재생</td></tr>
</tbody>
</table>

**▶ fill-mode 값별 동작**

<table class="wda-mtable">
<thead><tr><th>fill-mode 값</th><th>동작</th></tr></thead>
<tbody>
<tr><td><code>none</code> (기본값)</td><td>시작 전·종료 후 모두 원래 스타일로 돌아감</td></tr>
<tr><td><code>forwards</code></td><td>종료 후 마지막 keyframe 상태를 유지</td></tr>
<tr><td><code>backwards</code></td><td>delay 대기 동안 첫 keyframe 상태를 미리 적용</td></tr>
<tr><td><code>both</code></td><td>forwards와 backwards를 모두 적용</td></tr>
</tbody>
</table>

**• forwards 유지**

```css
/* 모달 페이드인 후 마지막 상태(opacity:1) 유지 */
.modal {
  animation: fadeIn 0.4s ease-out forwards;
}
```

**• both 적용**

```css
/* delay 동안에도 첫 keyframe 상태를 유지 - both */
.toast {
  animation: slideIn 0.5s ease-out 0.3s both;
}
```

### 🎞️ animation-play-state

**• 기본 값**

```css
.el { animation-play-state: running; } /* 기본값 */
.el { animation-play-state: paused; }
```

**• JavaScript로 제어**

```js
// JS로 재생 상태 토글
const el = document.querySelector('.spinner');
el.style.animationPlayState = el.style.animationPlayState === 'paused' ? 'running' : 'paused';
```

**• hover로 정지**

```css
/* hover로 자동 배경 애니메이션 일시정지 */
.marquee:hover { animation-play-state: paused; }
```

### ⏱️ animation shorthand

8가지 속성을 한 줄로 합칠 수 있다. 순서가 중요하며, `name`과 `duration`만은 반드시 있어야 한다.

**• 기본 문법**

```css
/* 문법: animation: name duration timing-function delay iteration-count direction fill-mode play-state; */
.spinner {
  animation: rotate 1s linear infinite;
}
```

**• 모든 값 지정**

```css
.modal {
  animation: fadeIn 0.4s ease-out 0.1s 1 normal forwards running;
}
```

**• 여러 애니메이션 동시 적용**

```css
/* 콤마로 여러 애니메이션 동시 적용 */
.card {
  animation: fadeIn 0.4s ease-out, pulse 2s ease-in-out infinite;
}
```

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p><strong>shorthand 핵심 정리</strong> — 실무에서는 <code>animation: name duration timing-function iteration-count;</code> 정도만으로도 대부분의 패턴을 커버한다. 나머지(delay, direction, fill-mode, play-state)는 필요할 때만 추가한다.</p>
</div>

---

## 4. 실전 예시: 로딩 스피너

**• CSS: 로딩 스피너 기본 회전**

```css
@keyframes rotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e5e7eb;
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: rotate 0.8s linear infinite;
}
```

**• CSS: 점 3개 순차 바운스 스피너**

```css
/* 변형 - 3개 점이 순차적으로 튀어 오르는 스피너 */
@keyframes dotBounce {
  0%, 80%, 100% { transform: translateY(0); }
  40%           { transform: translateY(-10px); }
}
.dot { animation: dotBounce 1s ease-in-out infinite; }
.dot:nth-child(1) { animation-delay: 0s; }
.dot:nth-child(2) { animation-delay: 0.15s; }
.dot:nth-child(3) { animation-delay: 0.3s; }
```

**• JavaScript: 로딩 상태 클래스 토글**

```js
// JS로 로딩 상태 제어
function showLoading(el) { el.classList.add('is-loading'); }
function hideLoading(el) { el.classList.remove('is-loading'); }
```

---

## 5. 실전 예시: 페이드인

**• CSS: 페이드인 업 기본**

```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.card {
  animation: fadeInUp 0.5s ease-out both;
}
```

**• CSS: 목록 아이템 순차 페이드인**

```css
/* 목록 아이템 순차 페이드인 - Stagger */
.list-item { animation: fadeInUp 0.4s ease-out both; }
.list-item:nth-child(1) { animation-delay: 0s; }
.list-item:nth-child(2) { animation-delay: 0.08s; }
.list-item:nth-child(3) { animation-delay: 0.16s; }
```

**• JavaScript: 스크롤 진입 시 애니메이션 실행**

```js
// IntersectionObserver로 스크롤 진입 시 애니메이션 실행
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-play');
    }
  });
});
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
```

---

## 6. 실전 예시: 슬라이드 캐러셀

**• CSS: 슬라이드 캐러셀 전환**

```css
@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}

.slide {
  animation: slideIn 0.5s ease-out both;
}
```

**• JavaScript: 캐러셀 자동 재생·hover 정지**

```js
// 캐러셀 핵심 로직 - 자동 재생 + hover 정지
let current = 0;
function goToSlide(index) { current = index; render(); }
function nextSlide() { goToSlide((current + 1) % slides.length); }
function prevSlide() { goToSlide((current - 1 + slides.length) % slides.length); }

const timer = setInterval(nextSlide, 3000);
carousel.addEventListener('mouseenter', () => clearInterval(timer));
```

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><strong>animation</strong>은 @keyframes로 여러 상태를 미리 정의하고 <strong>트리거 없이 자동 실행</strong>된다.</li>
    <li>@keyframes는 <strong>From-to</strong>(2단계) 또는 <strong>percentage</strong>(다단계) 구문으로 작성한다.</li>
    <li>8가지 속성 중 <strong>name과 duration은 필수</strong>이며 나머지는 선택이다.</li>
    <li>애니메이션 종료 후 마지막 상태를 유지하려면 <strong>animation-fill-mode: forwards</strong>가 필요하다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 애니메이션이 끝나면 자동으로 마지막 상태가 유지된다?</div>
    <div class="wda-mistake-right">정답: 기본값(<code>none</code>)에서는 종료 후 <strong>원래 스타일로 돌아간다</strong>. 마지막 상태를 유지하려면 <code>animation-fill-mode: forwards</code>를 명시해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: iteration-count: infinite만 주면 왕복 움직임이 된다?</div>
    <div class="wda-mistake-right">정답: infinite는 <strong>반복 횟수</strong>만 무한으로 만들 뿐이다. A→B→A→B로 왕복하려면 <code>animation-direction: alternate</code>를 함께 지정해야 한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · shorthand</div>
    <div class="wda-formula-block-body"><code>name duration timing delay count direction fill state</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 상태 유지</div>
    <div class="wda-formula-block-body"><code>종료 후 유지 = fill-mode: forwards</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 왕복 반복</div>
    <div class="wda-formula-block-body"><code>alternate + infinite = 무한 왕복</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">페이드인 효과가 끝난 후에도 opacity: 1 상태를 유지하려면?</div>
    <div class="wda-flip-back">animation-fill-mode: forwards를 지정한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">A→B→A→B 패턴으로 무한 반복하는 애니메이션을 만들려면?</div>
    <div class="wda-flip-back">animation-direction: alternate와 animation-iteration-count: infinite를 함께 사용한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">animation과 transition의 가장 큰 차이는?</div>
    <div class="wda-flip-back">animation은 트리거 없이 자동 실행되고 다단계가 가능하지만, transition은 트리거가 필요하고 2단계(A→B)만 가능하다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">animation-name과 animation-duration은 왜 필수인가?</div>
    <div class="wda-flip-back">어떤 @keyframes를 얼마 동안 재생할지 지정하지 않으면 애니메이션이 아예 동작하지 않기 때문이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">목록 아이템을 순차적으로 등장시키는 기법의 이름은?</div>
    <div class="wda-flip-back">Stagger 기법이다. nth-child로 각 아이템의 animation-delay를 다르게 준다.</div>
  </div>
</div>
