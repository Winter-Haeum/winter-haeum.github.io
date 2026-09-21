---
title: "7-2 다양한 기기에 최적화하기"
category: "frontend"
section: "css"
date: "2026-08-01"
status: "completed"
description: "모바일·태블릿·데스크탑의 특성 차이와 터치·마우스 인터페이스 대응, viewport 메타태그, rem·em·clamp 단위로 기기별 최적화를 정리합니다."
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
  • <strong>기기별 전략 수립</strong> — 모바일·태블릿·데스크탑 각각의 화면·입력 특성에 맞는 반응형 전략을 구분합니다<br>
  • <strong>터치·마우스 대응</strong> — 터치 기반과 마우스 기반 기기의 차이를 이해하고 CSS 미디어 기능으로 대응합니다<br>
  • <strong>viewport 메타태그 이해</strong> — 모바일에서 레이아웃이 의도대로 보이도록 viewport를 올바르게 설정합니다<br>
  • <strong>rem·em·clamp 활용</strong> — 상대 단위와 clamp() 함수로 화면 크기에 따라 유연하게 조정되는 폰트를 만듭니다
</div>

---

## 1. 디바이스별 특성 이해하기

[Media Query](/css/css/7-1-media-query)로 "언제" 스타일을 바꿀지 정했다면, 이 문서는 "어떤 기기"를 위해 무엇을 바꿔야 하는지에 집중합니다. 모바일·태블릿·데스크탑은 화면 크기만 다른 것이 아니라 입력 방식과 사용 패턴 자체가 다르므로, 이를 반영한 설계 기준을 정리합니다.

**▶ 모바일·태블릿·데스크탑 특성 비교**

<table class="wda-mtable">
<thead><tr><th>구분</th><th>📱 모바일</th><th>📟 태블릿</th><th>🖥 데스크탑</th></tr></thead>
<tbody>
<tr><td>화면 크기</td><td>320px ~ 480px</td><td>768px ~ 1024px</td><td>1024px 이상</td></tr>
<tr><td>입력 방식</td><td>터치</td><td>터치 + 키보드</td><td>마우스 + 키보드</td></tr>
<tr><td>화면 방향</td><td>세로 우선</td><td>회전 빈번</td><td>가로 고정</td></tr>
<tr><td>사용 패턴</td><td>짧고 빈번, 이동 중</td><td>중간, 소파·침대</td><td>길고 집중, 책상</td></tr>
<tr><td>대응 미디어쿼리</td><td><code>@media (max-width: 767px)</code></td><td><code>@media (min-width: 768px)</code></td><td><code>@media (min-width: 1024px)</code></td></tr>
<tr><td>트래픽 비중</td><td>60%+</td><td>10~15%</td><td>25~30%</td></tr>
</tbody>
</table>

모바일 트래픽 비중이 가장 크기 때문에, 모바일을 기본으로 두고 화면이 커질수록 스타일을 추가하는 모바일 우선 전략이 실무 표준으로 자리잡았다.

**• CSS: 모바일 우선 기본 전략**

```css
.container { width: 100%; } /* 기본 = 모바일 */

@media (min-width: 768px) { .container { width: 750px; } } /* 태블릿 */
@media (min-width: 1024px) { .container { width: 1000px; } } /* 데스크탑 */
```

---

## 2. 태블릿과 데스크탑 최적화 포인트

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">태블릿 — 회전과 하이브리드 입력</div>
    768~1024px 구간이 가장 중요한 분기점이며, 가로·세로 모드 전환이 잦다. 터치 타겟은 넉넉하게, 동시에 키보드 단축키도 고려한다.
    <pre><code>@media (orientation: portrait) {
  .grid { grid-template-columns: 1fr; }
}
@media (orientation: landscape) {
  .grid { grid-template-columns: 1fr 1fr; }
}</code></pre>
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">데스크탑 — 넓은 화면과 hover</div>
    1920~2560px까지 지원하는 3단 이상 멀티 컬럼 레이아웃과 마우스 hover 인터랙션을 적극 활용한다.
    <pre><code>@media (hover: hover) {
  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,.2);
  }
}</code></pre>
  </div>
</div>

---

## 3. 터치 인터페이스 디자인

터치 인터페이스에서 가장 중요한 것은 손가락으로 누르기 쉬운 크기와 간격이다.

**▶ 터치 타겟 크기 기준**

<table class="wda-mtable">
<thead><tr><th>기준</th><th>값</th></tr></thead>
<tbody>
<tr><td>Apple HIG 권장 터치 타겟</td><td>44 × 44px</td></tr>
<tr><td>Material Design 권장 터치 타겟</td><td>48 × 48px</td></tr>
<tr><td>터치 타겟 최소 간격</td><td>8px, 권장 12px 이상</td></tr>
</tbody>
</table>

**• CSS: 터치 타겟 크기 비교**

```css
/* ❌ Bad — 32px는 손가락 기준으로 너무 좁아 오클릭이 자주 발생한다 */
button { width: 32px; height: 32px; padding: 4px; }

/* ✅ Good — 44px 이상 확보 */
button {
  min-width: 44px;
  min-height: 44px;
  padding: 12px 16px;
  border-radius: 8px;
}
```

스와이프·핀치 줌·롱 프레스 같은 제스처가 필요한 UI라면 이 역시 설계 단계에서 함께 고려해야 한다.

---

## 4. 터치 · 마우스 하이브리드 대응

iPad Pro처럼 터치와 마우스(트랙패드)를 함께 지원하는 기기도 늘고 있어, CSS 미디어 기능으로 입력 방식을 감지해 대응한다.

**▶ hover·pointer 미디어 기능**

<table class="wda-mtable">
<thead><tr><th>미디어 기능</th><th>의미</th><th>예시</th></tr></thead>
<tbody>
<tr><td><code>hover: hover</code></td><td>호버 가능한 기기(마우스·트랙패드)</td><td>hover 애니메이션 적용</td></tr>
<tr><td><code>pointer: fine</code></td><td>정밀한 포인터(마우스)</td><td>작은 클릭 영역 허용</td></tr>
<tr><td><code>pointer: coarse</code></td><td>정밀하지 않은 포인터(터치)</td><td>버튼을 더 넉넉하게</td></tr>
</tbody>
</table>

**• CSS: 마우스 전용 hover 감지**

```css
button { min-width: 44px; } /* 기본: 터치 환경 기준 */

/* 마우스 전용 hover 효과 — 터치 기기에서는 적용되지 않는다 */
@media (hover: hover) and (pointer: fine) {
  button:hover { opacity: 0.8; }
}
```

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>기본값은 터치를 먼저 고려해 넉넉하게 설계하고, 마우스 환경일 때만 hover 효과를 추가하는 것이 가장 안전한 전략이다.</p>
</div>

---

## 5. viewport 메타태그

반응형 웹이 동작하기 위한 전제 조건이다. `<meta name="viewport">`가 없으면 모바일 브라우저는 기본 너비 980px를 기준으로 페이지를 렌더링한 뒤 축소해서 보여주기 때문에, 글자가 작게 보이고 미디어쿼리도 의도대로 작동하지 않는다.

**• HTML: viewport 메타태그**

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**▶ viewport 옵션별 의미**

<table class="wda-mtable">
<thead><tr><th>옵션</th><th>의미</th></tr></thead>
<tbody>
<tr><td><code>width=device-width</code></td><td>viewport 너비를 기기 실제 너비에 맞춘다</td></tr>
<tr><td><code>initial-scale=1.0</code></td><td>초기 줌 배율을 100%로 지정한다</td></tr>
<tr><td><code>maximum-scale</code></td><td>최대 줌 제한. 접근성을 해치므로 권장하지 않는다</td></tr>
<tr><td><code>user-scalable=no</code></td><td>사용자 확대·축소 금지. <strong>WCAG 위반이므로 사용하지 않는다</strong></td></tr>
</tbody>
</table>

---

## 6. rem / em 단위

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">em — 부모 기준</div>
    부모 요소의 font-size를 기준으로 계산된다. 중첩될수록 값이 곱해져 예상보다 커질 수 있다.
    <pre><code>.parent { font-size: 2em; } /* 32px */
.child  { font-size: 2em; } /* 64px! (곱연산) */</code></pre>
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">rem — 루트 기준</div>
    html(root)의 font-size 하나만 기준으로 삼기 때문에 중첩돼도 값이 예측 가능하다. 실무에서는 rem을 기본값으로 권장한다.
    <pre><code>html { font-size: 16px; }
h1 { font-size: 3rem; } /* 48px */
p  { font-size: 1rem; } /* 16px */</code></pre>
  </div>
</div>

---

## 7. clamp()로 화면 크기에 비례하는 폰트 만들기

**• CSS: clamp()로 반응형 폰트**

```css
font-size: clamp(1rem, 2.5vw, 2rem);
```

`clamp(최소값, 선호값, 최대값)`은 화면 너비에 비례하는 `vw` 기반 선호값을 계산하되, 그 값이 최소값보다 작아지면 최소값을, 최대값보다 커지면 최대값을 사용한다.

**• clamp() 계산 과정**

```text
375px 화면 → 2.5vw = 9.375px → 최소값(16px) 미만이므로 16px 적용
1920px 화면 → 2.5vw = 48px → 최대값(32px) 초과이므로 32px 적용
```

미디어쿼리 여러 개로 폰트 크기를 구간마다 나눠 지정하지 않아도, `clamp()` 하나로 화면 크기에 자연스럽게 비례하는 반응형 타이포그래피를 만들 수 있다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>모바일·태블릿·데스크탑은 화면 크기뿐 아니라 <strong>입력 방식과 사용 패턴</strong>이 다르므로 각각 다른 전략이 필요하다.</li>
    <li>터치 타겟은 최소 <strong>44×44px</strong>, 간격은 8px 이상 확보한다.</li>
    <li><code>@media (hover: hover)</code>로 마우스 환경에서만 hover 효과를 적용할 수 있다.</li>
    <li>viewport 메타태그의 <code>width=device-width, initial-scale=1.0</code>은 반응형 웹의 필수 전제 조건이다.</li>
    <li>rem은 루트 font-size 기준이라 예측 가능하고, clamp()는 미디어쿼리 없이도 화면 비례 폰트를 만든다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: em과 rem은 둘 다 같은 기준으로 계산된다?</div>
    <div class="wda-mistake-right">정답: em은 <strong>부모 요소</strong> 기준, rem은 <strong>html(root)</strong> 기준으로 계산되어 동작이 다르다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: user-scalable=no를 쓰면 레이아웃이 안정적이라 좋다?</div>
    <div class="wda-mistake-right">정답: 사용자의 확대·축소를 막는 것은 <strong>접근성(WCAG) 위반</strong>이므로 사용하지 않는다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 터치 타겟</div>
    <div class="wda-formula-block-body"><code>최소 44×44px + 간격 8px 이상</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · viewport</div>
    <div class="wda-formula-block-body"><code>width=device-width, initial-scale=1.0</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 반응형 폰트</div>
    <div class="wda-formula-block-body"><code>clamp(최소, vw선호값, 최대)</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Apple HIG가 권장하는 터치 타겟 최소 크기는?</div>
    <div class="wda-flip-back">44×44px이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">viewport 메타태그가 없으면 모바일에서 어떤 문제가 생길까?</div>
    <div class="wda-flip-back">기본 너비 980px 기준으로 렌더링된 뒤 축소되어 글자가 작게 보이고, 미디어쿼리도 의도대로 작동하지 않는다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">em과 rem 중 전역 일관성 유지에 유리한 단위는?</div>
    <div class="wda-flip-back">rem이다. 부모 스타일의 영향을 받지 않고 html 기준으로만 계산되기 때문이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">clamp(1rem, 2.5vw, 2rem)에서 화면이 매우 넓어지면 최종 값은?</div>
    <div class="wda-flip-back">2rem(최대값)으로 고정된다. 선호값이 최대값을 넘으면 최대값이 적용되기 때문이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">@media (hover: hover)를 쓰는 이유는?</div>
    <div class="wda-flip-back">터치 기기에서는 적용되지 않도록, 마우스처럼 호버가 가능한 기기에서만 hover 효과를 주기 위해서다.</div>
  </div>
</div>
