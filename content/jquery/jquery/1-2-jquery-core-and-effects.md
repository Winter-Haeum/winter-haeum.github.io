---
title: "1-2 jQuery 핵심 기능 및 기본 효과"
category: "frontend"
section: "jquery"
date: "2026-08-02"
status: "completed"
description: "jQuery의 선택자, DOM 조작, 이벤트 처리, 기본 애니메이션 효과 메서드를 순수 자바스크립트와 비교하며 정리합니다."
---

<style>
.wda-callout{border-radius:10px;padding:12px 14px;margin:.8rem 0 1.1rem;border-left:3px solid;font-size:.9rem;line-height:1.75}
.wda-ci{background:rgba(139,92,246,.06);border-color:#8b5cf6}
.wda-cw{background:rgba(245,158,11,.07);border-color:#f59e0b}
.wda-cs{background:rgba(34,197,94,.05);border-color:#22c55e}
.wda-cb{background:rgba(59,130,246,.06);border-color:#3b82f6}
.wda-clabel{font-size:.7rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px;display:block}
.wda-ci .wda-clabel{color:#8b5cf6}
.wda-cw .wda-clabel{color:#f59e0b}
.wda-cs .wda-clabel{color:#22c55e}
.wda-cb .wda-clabel{color:#3b82f6}
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
  • <strong>선택자 문법 익히기</strong> — $() 안에 CSS 선택자를 넣어 요소를 찾는 방법을 이해합니다<br>
  • <strong>DOM 조작 감 잡기</strong> — 텍스트·클래스·스타일을 바꾸는 대표 메서드를 익힙니다<br>
  • <strong>이벤트 처리 이해</strong> — on()으로 클릭 등 사용자 동작에 반응하는 방법을 파악합니다<br>
  • <strong>기본 효과 메서드 이해</strong> — 요소를 보이거나 숨기는 애니메이션 메서드의 개념을 익힙니다
</div>

---

## 1. 선택자 — $()로 요소 찾기

1-1에서 jQuery가 왜 등장했는지 배웠다면, 이 문서에서는 그 결과물인 실제 문법을 살펴봅니다. 선택자, DOM 조작, 이벤트, 기본 효과라는 네 가지 핵심 기능을 순수 자바스크립트와 비교하며 정리합니다.

레거시 코드를 읽거나 간단한 페이지에 효과를 추가할 때 이 정도만 알아도 충분합니다.

jQuery는 `$('선택자')` 형태로 요소를 찾습니다. CSS에서 쓰던 선택자 문법을 그대로 사용할 수 있어 직관적입니다.

**▶ 선택자 방식 비교**

<table class="wda-mtable">
<thead><tr><th>기능</th><th>순수 자바스크립트</th><th>jQuery</th></tr></thead>
<tbody>
<tr><td>ID로 선택</td><td>document.getElementById('id')</td><td>$('#id')</td></tr>
<tr><td>클래스로 선택</td><td>document.querySelectorAll('.item')</td><td>$('.item')</td></tr>
<tr><td>태그로 선택</td><td>document.querySelectorAll('p')</td><td>$('p')</td></tr>
</tbody>
</table>

jQuery의 가장 큰 특징은 **묵시적 반복**입니다. 클래스가 같은 요소가 여러 개 있어도 반복문 없이 한 줄로 전부 처리할 수 있습니다.

**• 묵시적 반복 비교**

```js
// 순수 자바스크립트: 여러 요소를 반복문으로 처리해야 함
document.querySelectorAll('.item').forEach((el) => {
  el.classList.add('active');
});

// jQuery: 한 줄로 끝
$('.item').addClass('active');
```

---

## 2. DOM 조작 — 텍스트, 클래스, 스타일 바꾸기

**▶ DOM 조작 메서드 정리**

<table class="wda-mtable">
<thead><tr><th>목적</th><th>메서드</th><th>예시</th></tr></thead>
<tbody>
<tr><td>텍스트 읽기/쓰기</td><td>.text()</td><td>$('#title').text('새 제목')</td></tr>
<tr><td>클래스 추가/제거</td><td>.addClass() / .removeClass()</td><td>$('#box').addClass('active')</td></tr>
<tr><td>클래스 토글</td><td>.toggleClass()</td><td>$('#box').toggleClass('active')</td></tr>
<tr><td>스타일 변경</td><td>.css()</td><td>$('#box').css('color', 'red')</td></tr>
</tbody>
</table>

`.css()`는 인자가 1개면 값을 읽고, 2개면 값을 설정하는 식으로 하나의 메서드가 읽기·쓰기를 모두 처리합니다. jQuery 메서드 상당수가 이런 방식을 따릅니다.

**🔎 참고**

<div class="wda-callout wda-cb">
  <p><code>.text()</code>는 태그를 제외한 순수 텍스트만 다루고, <code>.html()</code>은 태그까지 포함해 다룹니다. 사용자가 입력한 값을 그대로 <code>.html()</code>에 넣으면 악성 스크립트가 실행될 위험(XSS)이 있으므로, 단순 텍스트 변경에는 <code>.text()</code>를 쓰는 것이 안전합니다.</p>
</div>

---

## 3. 이벤트 처리 — on()으로 사용자 동작에 반응하기

버튼 클릭처럼 사용자의 동작에 반응하려면 `.on()` 메서드를 사용합니다.

**• 클릭 이벤트 등록**

```js
$('#btn').on('click', function () {
  alert('클릭됨!');
});
```

**▶ 주요 이벤트 종류**

<table class="wda-mtable">
<thead><tr><th>이벤트</th><th>발생 시점</th></tr></thead>
<tbody>
<tr><td>click</td><td>요소를 클릭했을 때</td></tr>
<tr><td>mouseenter / mouseleave</td><td>마우스가 요소에 들어오거나 나갈 때</td></tr>
<tr><td>submit</td><td>폼을 제출했을 때</td></tr>
<tr><td>change</td><td>입력값이나 선택값이 바뀌었을 때</td></tr>
</tbody>
</table>

`.on()`은 과거 여러 이름으로 나뉘어 있던 이벤트 등록 방식을 하나로 통일한 표준 메서드입니다. `$('#btn').click(fn)`처럼 이벤트 이름을 바로 메서드처럼 쓰는 단축 표기도 지원합니다.

---

## 4. 기본 애니메이션 효과

jQuery는 요소를 보이거나 숨기는 동작에 부드러운 전환 효과를 쉽게 넣을 수 있는 메서드를 기본 제공합니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">show() / hide()</div><div class="wda-fcard-dsc">요소를 즉시 또는 애니메이션과 함께 보이거나 숨깁니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">fadeIn() / fadeOut()</div><div class="wda-fcard-dsc">투명도를 조절해 서서히 나타나거나 사라지게 합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">slideDown() / slideUp()</div><div class="wda-fcard-dsc">높이를 조절해 위아래로 펼치거나 접습니다. 아코디언 메뉴에 자주 쓰입니다.</div></div>
</div>

**• 아코디언 토글 구현**

```js
// 클릭할 때마다 내용이 접혔다 펼쳐지는 아코디언 패턴
$('.accordion-title').on('click', function () {
  $(this).next('.accordion-content').slideToggle(300);
});
```

속도는 `'slow'`, `'fast'` 같은 문자열이나 밀리초 숫자로 지정할 수 있고, 두 번째 인자로 함수(콜백)를 넘기면 애니메이션이 끝난 뒤 실행할 동작을 지정할 수 있습니다.

**🔎 참고**

<div class="wda-callout wda-cw">
  <p>요즘은 성능을 위해 CSS의 <code>transition</code>이나 <code>animation</code> 속성으로 효과를 처리하는 경우가 많습니다. jQuery의 효과 메서드는 자바스크립트로 매 프레임을 계산하는 방식이라, 대규모 애니메이션에는 CSS 방식이 더 부드러울 수 있습니다. 다만 간단한 토글 효과를 빠르게 붙일 때는 여전히 실용적입니다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>선택자는 <strong>$('CSS선택자')</strong> 형태로 쓰며, 여러 요소를 반복문 없이 한 번에 처리(묵시적 반복)할 수 있다.</li>
    <li>텍스트는 <strong>.text()</strong>, 클래스는 <strong>.addClass()/.removeClass()</strong>, 스타일은 <strong>.css()</strong>로 다룬다.</li>
    <li>이벤트 처리는 <strong>.on('이벤트명', 함수)</strong>로 등록한다.</li>
    <li>기본 효과는 <strong>show/hide, fadeIn/fadeOut, slideDown/slideUp</strong> 세 계열이 있다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: .text()와 .html()은 같은 결과를 낸다?</div>
    <div class="wda-mistake-right">정답: <strong>.text()는 태그를 제외한 글자만</strong>, <strong>.html()은 태그까지 포함</strong>해 다룬다. 사용자 입력을 다룰 때는 보안상 .text()가 더 안전하다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: jQuery 효과 메서드가 항상 CSS transition보다 낫다?</div>
    <div class="wda-mistake-right">정답: 최신 개발에서는 <strong>성능이 중요한 애니메이션은 CSS</strong>로 처리하는 경우가 많다. jQuery 효과 메서드는 빠르게 토글 효과를 붙일 때 실용적인 선택이다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 선택</div>
    <div class="wda-formula-block-body"><code>$('선택자') = CSS 문법 그대로</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 이벤트</div>
    <div class="wda-formula-block-body"><code>.on('이벤트', 함수)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 효과</div>
    <div class="wda-formula-block-body"><code>show/hide · fade · slide</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">jQuery에서 ID가 "title"인 요소를 선택하는 코드는?</div>
    <div class="wda-flip-back">$('#title')입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">묵시적 반복이란 무엇인가요?</div>
    <div class="wda-flip-back">선택된 여러 요소에 반복문 없이 한 번의 메서드 호출로 동일한 처리를 적용하는 jQuery의 특징입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">버튼 클릭에 반응하려면 어떤 메서드를 쓰나요?</div>
    <div class="wda-flip-back">.on('click', 함수) 형태로 이벤트를 등록합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">아코디언 메뉴에 자주 쓰이는 효과 메서드는?</div>
    <div class="wda-flip-back">slideDown/slideUp, 또는 이 둘을 자동 전환하는 slideToggle입니다.</div>
  </div>
</div>
