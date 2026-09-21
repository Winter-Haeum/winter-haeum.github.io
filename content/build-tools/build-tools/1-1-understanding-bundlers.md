---
title: "1-1 번들러 이해하기"
category: "frontend"
section: "build-tools"
date: "2026-08-03"
status: "completed"
description: "여러 개의 JS·CSS 파일을 브라우저가 이해하기 쉬운 결과물로 묶어주는 번들러가 왜 필요한지, 모듈 시스템과 함께 정리합니다."
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
  • <strong>번들러가 필요한 이유</strong> — 파일을 여러 개로 나눠 작업할 때 생기는 문제를 파악합니다<br>
  • <strong>모듈 시스템 이해</strong> — import/export로 코드를 나눠 관리하는 방식을 이해합니다<br>
  • <strong>번들러의 역할 정리</strong> — 여러 파일을 하나의 결과물로 묶는다는 개념을 익힙니다<br>
  • <strong>대표 번들러 감 잡기</strong> — Webpack, Vite 같은 도구들이 존재한다는 것을 알아둡니다
</div>

---

## 1. 파일을 나누는 이유

Build Tools 카테고리의 첫 문서로, 번들러라는 도구가 왜 등장했는지와 기본 개념을 다룹니다. 실제 번들러 설정 파일을 작성하는 방법은 다음 문서(1-2 번들러 설정하기)에서 이어집니다.

작은 페이지 하나를 만들 때는 자바스크립트 코드를 파일 하나에 다 넣어도 크게 불편하지 않습니다. 하지만 프로젝트가 커지면 이야기가 달라집니다.

**▶ 파일 분리 여부에 따른 차이**

<table class="wda-mtable">
<thead><tr><th>파일을 하나로 유지할 때</th><th>파일을 여러 개로 나눌 때</th></tr></thead>
<tbody>
<tr><td>기능을 찾기 어렵고 코드가 뒤엉킨다</td><td>기능별로 파일이 분리되어 찾기 쉽다</td></tr>
<tr><td>여러 명이 동시에 수정하면 충돌이 잦다</td><td>파일 단위로 나눠 작업하면 충돌이 줄어든다</td></tr>
<tr><td>재사용이 어렵다</td><td>필요한 파일만 가져다 재사용할 수 있다</td></tr>
</tbody>
</table>

그래서 실무에서는 컴포넌트, 유틸 함수, 스타일을 각각 파일로 나누고, 필요한 곳에서 `import`로 가져다 쓰는 **모듈 시스템**을 사용합니다.

**• 함수를 내보내는 모듈**

```js
// math.js
export function add(a, b) {
  return a + b;
}
```

**• 모듈을 가져와 사용**

```js
// app.js
import { add } from './math.js';

console.log(add(1, 2));
```

---

## 2. 파일을 나누면 생기는 새로운 문제

모듈 시스템 덕분에 코드는 정리되지만, 이번에는 다른 문제가 생깁니다. 브라우저는 결국 이 여러 파일을 모두 내려받아 실행해야 하기 때문입니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">요청 수 증가</div><div class="wda-fcard-dsc">파일이 100개면 브라우저는 최대 100번의 요청을 보내야 할 수 있습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">순서 문제</div><div class="wda-fcard-dsc">A 파일이 B 파일을 사용한다면 B가 먼저 로드되어야 합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">호환성 문제</div><div class="wda-fcard-dsc">최신 문법으로 짠 코드를 구버전 브라우저가 이해하지 못할 수 있습니다.</div></div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>HTTP 요청 하나하나에는 약간의 시간이 걸립니다. 파일 수가 늘어날수록 이 요청 횟수가 누적되어 페이지 로딩 속도가 느려질 수 있습니다. 개발할 때는 파일을 잘게 나누는 것이 편하지만, 사용자에게 전달할 때는 오히려 손해가 되는 셈입니다.</p>
</div>

---

## 3. 번들러란 무엇인가

**번들러(Bundler)**는 여러 개로 나뉜 파일들을 분석해서, 브라우저가 효율적으로 실행할 수 있는 하나(또는 소수)의 결과물로 묶어주는 도구입니다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">여러 개의 JS/CSS 파일</div><div class="wda-fnode-dsc">개발자가 나눠서 작성</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">번들러</div><div class="wda-fnode-dsc">import/export 관계 분석 후 하나로 묶음</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">번들 결과물</div><div class="wda-fnode-dsc">브라우저가 바로 실행 가능한 파일</div></div>
</div>

번들러가 실제로 해주는 일은 파일을 묶는 것 외에도 여러 가지가 있습니다.

**▶ 번들러가 수행하는 작업**

<table class="wda-mtable">
<thead><tr><th>작업</th><th>설명</th></tr></thead>
<tbody>
<tr><td>파일 묶기(Bundling)</td><td>import로 연결된 여러 파일을 하나의 결과물로 합칩니다.</td></tr>
<tr><td>코드 변환(Transpile)</td><td>최신 문법을 구버전 브라우저도 이해할 수 있는 형태로 바꿔줍니다.</td></tr>
<tr><td>코드 압축(Minify)</td><td>공백과 변수 이름을 줄여 파일 용량을 작게 만듭니다.</td></tr>
</tbody>
</table>

---

## 4. 대표적인 번들러들

번들러는 하나만 있는 것이 아니라 여러 도구가 있으며, 각자 강점이 조금씩 다릅니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Webpack</div>
    가장 오래되고 널리 쓰인 번들러입니다. 설정할 수 있는 옵션이 많아 유연하지만, 그만큼 설정이 복잡해질 수 있습니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Vite</div>
    비교적 최근에 등장한 도구로, 개발 서버 실행 속도가 빠르고 설정이 간단한 편이라 최근 새 프로젝트에서 많이 선택됩니다.
  </div>
</div>

**🔎 참고**

<div class="wda-callout wda-cb">
  <p>Webpack은 여전히 많은 프로젝트에서 쓰이는 강력한 도구이지만, 최근 새로 시작하는 프론트엔드 프로젝트에서는 개발 경험이 빠른 Vite 같은 도구를 선택하는 경우도 많습니다. 어떤 도구를 쓰든 "여러 파일을 브라우저가 이해할 수 있는 결과물로 묶어준다"는 번들러의 기본 역할은 같습니다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>모듈 시스템은 <strong>import/export</strong>로 코드를 파일 단위로 나눠 관리하는 방식이다.</li>
    <li>파일을 나누면 정리는 편해지지만 <strong>요청 수 증가, 순서 문제, 호환성 문제</strong>가 새로 생긴다.</li>
    <li>번들러는 <strong>여러 파일을 하나의 결과물로 묶어주는 도구</strong>다.</li>
    <li>번들러는 파일 묶기 외에도 <strong>코드 변환, 코드 압축</strong> 같은 작업도 함께 수행한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 파일을 나누는 것 자체가 문제라서 번들러가 필요하다?</div>
    <div class="wda-mistake-right">정답: 파일을 나누는 것은 <strong>개발자에게는 오히려 이득</strong>이다. 문제는 나뉜 파일을 브라우저가 그대로 실행할 때 생기는 요청 수·호환성 부담이며, 번들러는 이를 해결한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Webpack이 유일하게 써야 하는 번들러다?</div>
    <div class="wda-mistake-right">정답: Webpack 외에도 <strong>Vite</strong> 같은 도구가 있으며, 프로젝트 성격에 따라 선택이 달라질 수 있다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 모듈</div>
    <div class="wda-formula-block-body"><code>모듈 = import + export</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 번들러 역할</div>
    <div class="wda-formula-block-body"><code>여러 파일 → 하나의 결과물</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 부가 작업</div>
    <div class="wda-formula-block-body"><code>묶기 + 변환 + 압축</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">파일을 여러 개로 나눌 때 얻는 대표적인 장점은?</div>
    <div class="wda-flip-back">기능별로 코드를 찾기 쉬워지고, 여러 명이 동시에 작업할 때 충돌이 줄어듭니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">번들러의 가장 기본적인 역할은?</div>
    <div class="wda-flip-back">import/export로 연결된 여러 파일을 분석해 하나의 결과물로 묶어주는 것입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">번들러가 파일을 묶는 것 외에 하는 일 두 가지는?</div>
    <div class="wda-flip-back">최신 문법을 구버전 브라우저용으로 변환하고, 코드 용량을 줄이는 압축(Minify) 작업입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">최근 새 프로젝트에서 빠른 개발 속도로 자주 선택되는 번들러는?</div>
    <div class="wda-flip-back">Vite입니다. 다만 Webpack도 여전히 널리 쓰이는 강력한 도구입니다.</div>
  </div>
</div>
