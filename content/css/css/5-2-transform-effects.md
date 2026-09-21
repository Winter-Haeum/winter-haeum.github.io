---
title: "5-2 Transform으로 변형 효과주기"
category: "frontend"
section: "css"
date: "2026-08-01"
status: "completed"
description: "translate·rotate·scale·skew 네 가지 변형 함수와 transform-origin, position과의 조합, 3D 카드 뒤집기까지 실전 애니메이션 감각을 정리합니다."
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
  • <strong>4가지 변형 함수</strong> — translate, rotate, scale, skew의 문법과 단위를 구분해서 사용합니다<br>
  • <strong>position과 조합</strong> — top/left와 transform을 함께 써서 정중앙 정렬, 고정 회전 같은 실무 패턴을 만듭니다<br>
  • <strong>성능 차이 이해</strong> — top/left 애니메이션보다 transform 애니메이션이 왜 더 부드러운지 설명할 수 있습니다<br>
  • <strong>3D 변형 기초</strong> — perspective와 rotateX/Y로 카드 뒤집기 같은 효과의 원리를 이해합니다
</div>

---

## 1. translate — 위치 이동

transform은 요소의 실제 레이아웃 위치는 그대로 두고, 화면에 그려지는 모습만 이동·회전·확대·기울이는 속성입니다.

<code>top</code>이나 <code>left</code>와 달리 주변 요소를 밀어내지 않기 때문에, [이전 문서](/css/css/5-1-position-layout)에서 배운 position과 짝을 지어 쓰면 정확한 중앙 정렬이나 부드러운 인터랙션을 매우 쉽게 만들 수 있습니다.

`translate()`는 요소를 가로(X), 세로(Y) 방향으로 이동시키는 함수다. 레이아웃 흐름에는 전혀 영향을 주지 않고, 화면에 그려지는 위치만 옮긴다.

**• CSS: translate() 기본 사용**

```css
transform: translate(20px, 10px); /* X, Y를 한 번에 이동 */
transform: translateX(20px);      /* X축만 이동 */
transform: translateY(-10px);     /* Y축만 이동 */
```

**▶ translate() 단위**

<table class="wda-mtable">
<thead><tr><th>단위</th><th>기준</th><th>예시</th></tr></thead>
<tbody>
<tr><td>px</td><td>고정 픽셀</td><td><code>translate(50px, 100px)</code> — 오른쪽 50px, 아래 100px</td></tr>
<tr><td>%</td><td>자기 자신의 너비·높이</td><td><code>translate(-50%, 0)</code> — 자기 너비의 절반만큼 왼쪽 이동</td></tr>
<tr><td>rem / em</td><td>글자 크기 기준</td><td><code>translate(1rem, 0)</code></td></tr>
</tbody>
</table>

X는 양수면 오른쪽·음수면 왼쪽, Y는 양수면 아래·음수면 위로 이동한다. `%` 단위는 **부모가 아니라 자기 자신의 박스 크기**를 기준으로 계산된다는 점이 가장 헷갈리는 부분이다.

"내 몸의 절반만큼 옆으로 움직인다"고 기억해두면 된다.

**• CSS: translate() 활용 패턴**

```css
.box:hover {
  transform: translate(20px, 10px); /* hover 시 오른쪽 아래로 살짝 이동 */
}

.center-helper {
  transform: translate(-50%, -50%); /* 중앙 정렬 보정용, 4절에서 다시 다룸 */
}
```

---

## 2. rotate — 회전 효과

`rotate()`는 요소를 기준점(기본값은 정중앙)을 축으로 돌리는 함수다.

**• CSS: rotate() 기본 사용**

```css
transform: rotate(90deg);
```

**▶ rotate() 단위**

<table class="wda-mtable">
<thead><tr><th>단위</th><th>의미</th></tr></thead>
<tbody>
<tr><td>deg</td><td>각도(0°~360°)</td></tr>
<tr><td>turn</td><td>회전 수. 1turn = 360deg</td></tr>
<tr><td>rad</td><td>라디안. 실무에서는 거의 쓰지 않는다</td></tr>
</tbody>
</table>

양수는 시계 방향, 음수는 반시계 방향이다. `90deg`는 직각, `180deg`는 반 바퀴, `360deg`는 한 바퀴라고 기억하면 편하다.

**• CSS: rotate() 활용 패턴**

```css
.arrow { transform: rotate(90deg); } /* 오른쪽을 가리키는 화살표 */

.spinner {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.card:hover { transform: rotate(5deg); }   /* 살짝 기울이기 */
.half-turn  { transform: rotate(0.5turn); } /* 180deg와 동일 */
```

---

## 3. scale — 크기 조절

`scale()`은 요소의 크기를 배율로 키우거나 줄인다.

**• CSS: scale() 기본 사용**

```css
transform: scale(1.2, 1.2); /* 또는 그냥 scale(1.2) */
transform: scaleX(2);
transform: scaleY(0.5);
```

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">1</div><div class="wda-fcard-dsc">원본 크기(100%). 기준값이다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">1보다 큰 값</div><div class="wda-fcard-dsc">확대. <code>scale(2)</code>는 200%.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">1보다 작은 값</div><div class="wda-fcard-dsc">축소. <code>scale(0.5)</code>는 50%.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">0 또는 음수</div><div class="wda-fcard-dsc">0은 완전히 사라짐, 음수는 반전 + 크기 조절.</div></div>
</div>

**• CSS: scale() 활용 패턴**

```css
.image:hover { transform: scale(1.2); }   /* 이미지 hover 확대 */
.button:active { transform: scale(0.95); } /* 클릭 순간 살짝 줄어드는 피드백 */

.modal {
  transform: scale(0);            /* 처음엔 완전히 숨김 */
  transition: transform 0.3s;
}
.modal.show { transform: scale(1); } /* 열리면 원래 크기로 */

.flip-x { transform: scaleX(-1); }     /* 좌우 반전(거울 효과) */
.wide   { transform: scale(2, 1); }    /* 가로만 2배 */
```

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>scale은 <code>width</code>/<code>height</code>를 직접 바꾸는 것이 아니라 화면에 그려지는 단계에서만 크기를 바꾼다. 그래서 레이아웃 재계산(리플로우) 없이 동작하고, 애니메이션이 부드럽다.</p>
</div>

---

## 4. skew — 기울이기

`skew()`는 요소를 평행사변형처럼 비스듬히 기울이는 함수다.

**• CSS: skew() 기본 사용**

```css
transform: skew(10deg, 5deg);
transform: skewX(15deg);
transform: skewY(10deg);
```

X축 양수는 위쪽이 오른쪽으로 밀리듯 기울고, Y축 양수는 오른쪽이 아래로 기울어진다. `rotate`는 네 변 전체가 통째로 돌지만, `skew`는 사각형이 사다리꼴처럼 찌그러진다는 점이 다르다.

**• CSS: skew() 활용 패턴**

```css
.skew-x { transform: skewX(15deg); }
.skew-y { transform: skewY(10deg); }
.card:hover { transform: skewX(-5deg); } /* 카드가 살짝 기울어지는 hover 효과 */
```

---

## 5. transform-origin — 변형 기준점

`transform-origin`은 회전·확대·기울이기가 "어디를 축으로" 일어날지 정하는 속성이다. 기본값은 `center`이며, `translate`를 제외한 나머지 세 함수(rotate, scale, skew)에 큰 영향을 준다.

**• 값 종류**

```css
transform-origin: center;        /* 기본값 */
transform-origin: top left;      /* 왼쪽 위 모서리 기준 */
transform-origin: 100px 50px;    /* 좌표로 직접 지정 */
```

**• 드롭다운 적용 예**

```css
.dropdown {
  transform: scaleY(0);
  transform-origin: top;         /* 위쪽을 붙잡고 아래로 펼쳐지게 */
  transition: transform 0.3s;
}
.dropdown.open { transform: scaleY(1); }
```

드롭다운·모달·카드 뒤집기처럼 "어디에서 자라날지"가 중요한 UI에서 자주 쓰인다.

---

## 6. 여러 변형 조합하기

`transform`은 여러 함수를 한 줄에 이어서 쓸 수 있다. 단, 각 변형은 앞서 적용된 변형의 좌표계를 기준으로 다시 계산되기 때문에 **순서에 따라 결과가 달라진다**.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">translate → rotate (권장 순서)</div>
    <code>transform: translate(50px, 0) rotate(45deg);</code><br>오른쪽으로 이동한 뒤, 그 자리에서 45도 회전한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">rotate → translate</div>
    <code>transform: rotate(45deg) translate(50px, 0);</code><br>먼저 회전한 좌표계를 기준으로 이동하므로 대각선으로 이동하는 것처럼 보인다.
  </div>
</div>

실무에서는 `translate → rotate → scale` 순서를 기본값으로 생각하면 헷갈리지 않는다.

---

## 7. Position + Transform으로 정중앙 배치하기

모달을 화면 정중앙에 놓는 가장 널리 쓰이는 공식이다.

**• CSS: translate로 정중앙 배치**

```css
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 자기 크기의 절반만큼 되돌려 정중앙 보정 */
}
```

`top: 50%; left: 50%;`만 쓰면 요소의 **왼쪽 위 모서리**가 화면 중앙에 오게 된다. 그래서 `translate(-50%, -50%)`로 자기 크기의 절반만큼 반대 방향으로 밀어서 정확한 정중앙을 맞춘다.

**• CSS: 정중앙 배치 + 등장 애니메이션**

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0); /* 등장 애니메이션까지 결합 */
  transition: transform 0.3s;
}
.modal.show { transform: translate(-50%, -50%) scale(1); }
```

---

## 8. 위치 고정 + 회전 패턴 (Floating UI)

화면 스크롤과 무관하게 항상 같은 자리에 떠 있는 플로팅 버튼, 채팅 버튼 같은 UI는 `position: fixed`와 `transform`을 함께 쓴다.

**• CSS: Floating 버튼 회전·확대**

```css
.floating-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  transition: transform 0.3s;
}
.floating-btn:hover { transform: rotate(90deg) scale(1.1); }

.spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0deg);
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: translate(-50%, -50%) rotate(360deg); } /* 중앙 위치는 유지한 채 회전 */
}
```

고정 UI는 항상 `position: fixed`를 먼저 정하고, 그 위에 `translate`·`scale`·`rotate`를 얹어 인터랙션을 만든다고 생각하면 정리가 쉽다.

---

## 9. 성능: transform vs top/left

**▶ transform과 top/left 성능 비교**

<table class="wda-mtable">
<thead><tr><th>기준</th><th>transform</th><th>top / left</th></tr></thead>
<tbody>
<tr><td>렌더링</td><td>GPU 가속</td><td>CPU 계산</td></tr>
<tr><td>리플로우</td><td>없음(레이아웃 유지)</td><td>있음(레이아웃 재계산)</td></tr>
<tr><td>애니메이션</td><td>60fps 유지가 쉬움</td><td>끊김이 발생할 수 있음</td></tr>
<tr><td>주 용도</td><td>애니메이션, 부드러운 이동</td><td>정적인 위치 배치</td></tr>
</tbody>
</table>

**• CSS: transform과 top/left 성능 비교**

```css
/* 느린 방식 */
.box-slow { transition: top 0.3s, left 0.3s; }
.box-slow:hover { top: -10px; left: 20px; } /* 매 프레임 레이아웃을 다시 계산 */

/* 빠른 방식 */
.box-fast { transition: transform 0.3s; }
.box-fast:hover { transform: translate(20px, -10px); } /* 레이아웃은 그대로, 화면에서만 이동 */
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>GPU 가속을 더 확실히 유도하려면 <code>will-change: transform</code>이나 <code>transform: translateZ(0)</code>을 쓸 수 있지만, "이 요소는 곧 바뀔 것"이라는 브라우저용 힌트일 뿐이다. 남발하면 GPU 레이어가 과도하게 생성되어 오히려 느려지므로, 실제로 자주 움직이는 요소에만 제한적으로 사용한다.</p>
</div>

---

## 10. 3D 트랜스폼 기초

3D 회전을 쓰려면 먼저 부모 요소에 `perspective`로 원근감을 줘야 한다.

**• CSS: perspective로 원근감 부여**

```css
.parent { perspective: 1000px; } /* 값이 작을수록 왜곡(입체감)이 강해진다 */
```

**▶ 3D 회전 함수**

<table class="wda-mtable">
<thead><tr><th>함수</th><th>의미</th></tr></thead>
<tbody>
<tr><td><code>rotateX()</code></td><td>X축 기준 회전(상하 뒤집기)</td></tr>
<tr><td><code>rotateY()</code></td><td>Y축 기준 회전(좌우 뒤집기)</td></tr>
<tr><td><code>rotateZ()</code></td><td>Z축 기준 회전. 평면 <code>rotate()</code>와 동일</td></tr>
</tbody>
</table>

`perspective`가 없으면 3D 회전 함수를 써도 평면 회전처럼만 보인다. "3D 효과를 쓰려면 항상 부모에 perspective부터 설정한다"고 기억해두자.

---

## 11. 실전: 3D 카드 뒤집기

**• HTML 구조**

```html
<div class="card-container">
  <div class="card">
    <div class="card-front">앞면</div>
    <div class="card-back">뒷면</div>
  </div>
</div>
```

**• CSS 스타일**

```css
.card-container {
  perspective: 1000px;   /* ① 원근감 부여 */
  width: 300px;
  height: 200px;
}

.card {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d; /* ② 앞/뒤 면을 3D 상태로 유지 */
  transition: transform 0.6s;
}
.card:hover { transform: rotateY(180deg); } /* ③ 카드 전체를 180도 회전 */

.card-front, .card-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden; /* ④ 뒤집힌 면의 뒷모습이 비치지 않게 숨김 */
}
.card-back {
  transform: rotateY(180deg); /* ⑤ 처음부터 180도 돌려 뒤를 향하게 둠 */
}
```

`.card-container`가 원근감을 제공하고, `.card`가 `preserve-3d` 덕분에 앞뒤 면을 유지한 채 Y축으로 회전한다.

`.card-back`은 처음부터 180도 돌아가 있기 때문에 카드가 180도 회전하면 정면으로 나타나고, `backface-visibility: hidden` 덕분에 뒷면의 뒷모습은 보이지 않는다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><strong>translate·rotate·scale·skew</strong> 네 함수는 요소의 레이아웃 위치를 밀어내지 않고 화면에 그려지는 모습만 바꾼다.</li>
    <li>정중앙 배치 공식은 <code>position:absolute; top:50%; left:50%; transform:translate(-50%,-50%)</code>다.</li>
    <li>여러 변형을 조합할 때는 <strong>translate → rotate → scale</strong> 순서가 가장 자연스럽다.</li>
    <li>3D 회전을 쓰려면 부모에 <code>perspective</code>를 먼저 지정해야 한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: translate의 % 단위는 부모 요소 크기를 기준으로 계산된다?</div>
    <div class="wda-mistake-right">정답: translate의 %는 <strong>자기 자신의 너비·높이</strong>를 기준으로 계산된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: transform과 top/left 애니메이션은 성능이 비슷하다?</div>
    <div class="wda-mistake-right">정답: transform은 <strong>GPU 가속</strong>으로 리플로우 없이 동작하지만, top/left는 매 프레임 레이아웃을 다시 계산해 더 느리다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: perspective 없이도 rotateY로 입체적인 카드 뒤집기를 만들 수 있다?</div>
    <div class="wda-mistake-right">정답: perspective가 없으면 3D 회전도 <strong>평면 회전처럼</strong>만 보인다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 중앙 정렬</div>
    <div class="wda-formula-block-body"><code>top:50% left:50% translate(-50%,-50%)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 조합 순서</div>
    <div class="wda-formula-block-body"><code>translate → rotate → scale</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 3D 필수 조합</div>
    <div class="wda-formula-block-body"><code>perspective + rotateY + backface-visibility</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">translate(-50%, -50%)이 필요한 이유는?</div>
    <div class="wda-flip-back">top/left 50%만 쓰면 왼쪽 위 모서리가 중앙에 오므로, 자기 크기의 절반만큼 반대로 밀어 정중앙을 맞추기 위해서다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">scale이 width/height를 바꾸는 것보다 성능이 좋은 이유는?</div>
    <div class="wda-flip-back">레이아웃을 재계산하지 않고 그리기 단계에서만 크기를 바꾸기 때문이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">rotate와 skew의 근본적인 차이는?</div>
    <div class="wda-flip-back">rotate는 요소 전체가 통째로 돌지만, skew는 사각형이 사다리꼴처럼 찌그러진다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">애니메이션에 transform과 opacity를 우선 쓰는 이유는?</div>
    <div class="wda-flip-back">GPU 가속이 적용되어 리플로우 없이 동작해 60fps를 유지하기 쉽기 때문이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">3D 카드 뒤집기에서 backface-visibility: hidden의 역할은?</div>
    <div class="wda-flip-back">뒤집힌 면의 뒷모습(글자가 좌우반전된 모습)이 비치지 않도록 숨긴다.</div>
  </div>
</div>
