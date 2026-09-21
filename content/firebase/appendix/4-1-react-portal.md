---
title: "4-1 React Portal"
category: "frontend"
section: "appendix"
date: "2026-08-03"
status: "completed"
description: "모달·툴팁·오버레이처럼 부모의 스타일에 갇히지 않고 DOM 바깥으로 렌더링해야 하는 상황에서 React Portal이 필요한 이유와 기본 사용법을 정리합니다."
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
  • <strong>Portal이 필요한 상황</strong> — 모달·툴팁이 부모 스타일에 갇히는 문제를 이해합니다<br>
  • <strong>Portal의 동작 원리</strong> — React 트리는 유지하면서 실제 DOM 위치만 옮기는 개념을 파악합니다<br>
  • <strong>createPortal 기본 사용법</strong> — 실제 코드로 모달을 렌더링해봅니다<br>
  • <strong>Firebase와의 관계</strong> — Portal이 Firebase 자체 기능이 아닌 보조 개념임을 이해합니다
</div>

---

## 1. 부모에 갇힌 모달, 왜 생길까

모달 창을 만들 때, 부모 요소에 `overflow: hidden`이나 낮은 `z-index`가 걸려 있으면 모달이 잘리거나 다른 요소에 가려지는 문제가 생길 수 있습니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">잘림 현상</div><div class="wda-fcard-dsc">부모의 overflow: hidden 때문에 모달 일부가 보이지 않습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">z-index 충돌</div><div class="wda-fcard-dsc">부모의 쌓임 맥락에 갇혀 z-index를 아무리 높여도 소용없는 경우가 있습니다.</div></div>
</div>

이런 문제는 모달, 툴팁, 드롭다운처럼 화면의 다른 요소 위에 떠 있어야 하는 UI에서 자주 발생합니다.

---

## 2. React Portal — DOM 위치만 순간이동

React Portal은 컴포넌트의 **React 트리상 위치는 그대로 유지**하면서, 실제로 화면에 그려지는 **DOM 위치만 다른 곳으로 옮기는** 기능입니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">일반적인 렌더링</div>
    컴포넌트는 부모 컴포넌트의 DOM 구조 안에 그대로 렌더링됩니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Portal을 사용한 렌더링</div>
    React 코드상으로는 자식이지만, 실제 HTML 상으로는 body에 가까운 다른 위치에 렌더링됩니다.
  </div>
</div>

**• HTML: Portal 대상 루트 요소**

```html
<body>
  <div id="root"></div>
  <div id="modal-root"></div>
</body>
```

**• React: createPortal로 모달 렌더링**

```jsx
import { createPortal } from 'react-dom';

function Modal({ children }) {
  const modalRoot = document.getElementById('modal-root');
  return createPortal(
    <div className="modal-overlay">{children}</div>,
    modalRoot
  );
}
```

---

## 3. Portal을 써도 이벤트는 정상적으로 전달된다

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">DOM 위치</div><div class="wda-fnode-dsc">modal-root로 이동</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">React 트리</div><div class="wda-fnode-dsc">여전히 원래 부모의 자식</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">이벤트</div><div class="wda-fnode-dsc">부모 컴포넌트로 정상 전달</div></div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  <p>Portal로 렌더링된 컴포넌트는 화면상 위치(DOM)만 바뀔 뿐, React가 관리하는 컴포넌트 트리(논리적 위치)는 그대로 유지됩니다. 그래서 클릭 이벤트나 부모로부터 받은 props는 평소와 다름없이 정상적으로 동작합니다.</p>
</div>

---

## 4. Firebase와 함께 쓰이는 이유

**📌 개념**

<div class="wda-callout wda-cb">
  <p>React Portal은 Firebase가 제공하는 기능이 아니라 React 자체의 내장 기능입니다. 다만 Firebase로 실전 앱을 만들 때 "로그인 안내 모달", "업로드 진행 알림 토스트"처럼 화면 최상단에 떠야 하는 UI가 자주 필요하기 때문에, Firebase 서비스를 활용한 앱과 함께 자주 등장하는 보조 개념으로 소개합니다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>Portal은 <strong>React 트리는 유지하면서 DOM 위치만 옮기는</strong> 기능이다.</li>
    <li>모달·툴팁처럼 <strong>부모의 CSS 제약을 벗어나야 하는 UI</strong>에 주로 사용한다.</li>
    <li><strong>createPortal(children, domNode)</strong> 형태로 사용한다.</li>
    <li>Portal을 써도 <strong>이벤트는 React 트리를 따라 정상 전달</strong>된다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Portal을 쓰면 React 컴포넌트 트리 구조 자체가 바뀐다?</div>
    <div class="wda-mistake-right">정답: <strong>실제 DOM 위치만 바뀔 뿐</strong>, React가 관리하는 컴포넌트 트리 구조는 그대로 유지된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Portal은 Firebase가 제공하는 기능이다?</div>
    <div class="wda-mistake-right">정답: Portal은 <strong>React 자체의 기능</strong>이며, Firebase와는 별개의 개념이다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 정의</div>
    <div class="wda-formula-block-body"><code>Portal = DOM 위치만 이동</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 문법</div>
    <div class="wda-formula-block-body"><code>createPortal(children, domNode)</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">React Portal은 무엇을 옮기나요?</div>
    <div class="wda-flip-back">React 트리는 그대로 두고, 실제 DOM 렌더링 위치만 옮깁니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Portal 안에서 발생한 이벤트는 어떻게 전달되나요?</div>
    <div class="wda-flip-back">DOM 위치가 달라도 React 트리를 따라 부모 컴포넌트로 정상 전달됩니다.</div>
  </div>
</div>
