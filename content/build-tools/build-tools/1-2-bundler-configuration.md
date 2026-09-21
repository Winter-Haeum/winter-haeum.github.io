---
title: "1-2 번들러 설정하기"
category: "frontend"
section: "build-tools"
date: "2026-08-03"
status: "completed"
description: "번들러 설정에서 자주 등장하는 entry·output·loader·plugin 개념을 정리하고, Vite 기준의 기본 설정을 살펴봅니다."
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
  • <strong>entry와 output 이해</strong> — 번들러가 어디서 시작해서 어디로 결과를 내보내는지 파악합니다<br>
  • <strong>loader와 plugin 구분</strong> — 두 개념이 각각 어떤 역할을 하는지 정리합니다<br>
  • <strong>Vite 기본 설정 읽기</strong> — 실제 설정 파일이 어떤 구조로 되어 있는지 익힙니다<br>
  • <strong>개발 서버와 빌드 구분</strong> — 설정이 상황에 따라 어떻게 쓰이는지 감을 잡습니다
</div>

---

## 1. entry — 어디서부터 시작할까

1-1에서 번들러가 왜 필요한지 배웠다면, 이 문서에서는 번들러에게 "무엇을, 어떻게 묶을지" 알려주는 설정 개념을 다룹니다. 번들러마다 설정 문법은 조금씩 다르지만, entry·output·loader·plugin이라는 핵심 개념은 대부분의 번들러에서 공통으로 등장합니다.

번들러는 프로젝트의 모든 파일을 무작정 다 읽는 것이 아니라, **entry(진입점)**라고 부르는 파일 하나부터 시작해서 import로 연결된 파일들을 따라가며 필요한 파일만 찾아갑니다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">entry</div><div class="wda-fnode-dsc">시작 파일 (예: main.js)</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">import 추적</div><div class="wda-fnode-dsc">연결된 파일들을 따라가며 수집</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">output</div><div class="wda-fnode-dsc">하나로 묶인 결과 파일</div></div>
</div>

entry 파일에서 사용하지 않는 파일은 번들 결과물에도 포함되지 않습니다. 이 덕분에 프로젝트에 파일이 아무리 많아도, 실제로 화면에 필요한 코드만 골라서 묶을 수 있습니다.

---

## 2. output — 결과물을 어디에 만들까

**output**은 번들러가 완성한 결과 파일을 어디에, 어떤 이름으로 저장할지를 정합니다. 보통 `dist`라는 폴더 이름이 관례적으로 많이 쓰입니다.

**▶ entry와 output 역할**

<table class="wda-mtable">
<thead><tr><th>설정</th><th>의미</th></tr></thead>
<tbody>
<tr><td>entry</td><td>번들링을 시작할 파일</td></tr>
<tr><td>output</td><td>결과물을 저장할 위치와 파일 이름</td></tr>
</tbody>
</table>

---

## 3. loader와 plugin — 번들러의 능력 확장

번들러는 기본적으로 자바스크립트 파일을 다루는 데 특화되어 있습니다.

하지만 실제 프로젝트에는 CSS, 이미지, TypeScript처럼 자바스크립트가 아닌 파일도 함께 존재합니다. 이런 파일까지 다루려면 번들러의 기능을 확장해야 합니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Loader</div>
    자바스크립트가 아닌 파일(CSS, 이미지 등)을 번들러가 이해할 수 있는 형태로 <strong>변환</strong>하는 역할을 합니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Plugin</div>
    번들링 과정 전반에 개입해서 압축, 환경 변수 주입 같은 <strong>부가 기능</strong>을 추가합니다.
  </div>
</div>

**📌 개념**

<div class="wda-callout wda-cb">
  <p>둘의 차이를 간단히 구분하면, loader는 "파일 하나하나를 다른 형태로 바꿔주는 통역사"에 가깝고, plugin은 "번들링 과정 전체에 참여해서 다양한 부가 작업을 처리하는 도우미"에 가깝습니다. Vite 같은 최신 도구에서는 이 둘의 역할이 통합된 "플러그인" 형태로 제공되는 경우가 많습니다.</p>
</div>

---

## 4. Vite 기준 기본 설정 살펴보기

실제 설정이 어떻게 생겼는지, Vite를 예로 살펴보겠습니다. Vite는 대부분의 기본값이 이미 정해져 있어서, 설정 파일이 비교적 짧고 단순한 편입니다.

**• Vite 기본 설정 파일**

```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], // React 문법을 이해하도록 도와주는 플러그인
  server: {
    port: 3000, // 개발 서버가 사용할 포트 번호
  },
});
```

**▶ Vite 설정 항목 역할**

<table class="wda-mtable">
<thead><tr><th>설정 항목</th><th>역할</th></tr></thead>
<tbody>
<tr><td>plugins</td><td>React JSX 문법 해석 등, 번들러 기본 기능에 없는 능력을 추가합니다.</td></tr>
<tr><td>server.port</td><td>로컬에서 개발 서버를 실행할 때 사용할 포트 번호를 지정합니다.</td></tr>
</tbody>
</table>

이 짧은 설정만으로도 entry는 프로젝트의 기본 진입 파일(보통 `index.html`이 가리키는 파일)로, output은 `dist` 폴더로 자동 지정됩니다. 별도로 entry나 output을 직접 적어주지 않아도 되는 것이 Vite 같은 최신 도구의 특징입니다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>entry는 <strong>번들링을 시작하는 파일</strong>이고, output은 <strong>결과물이 저장되는 위치</strong>다.</li>
    <li>loader는 <strong>파일을 다른 형태로 변환</strong>하고, plugin은 <strong>번들링 과정에 부가 기능을 더한다</strong>.</li>
    <li>Vite 같은 최신 도구는 <strong>entry·output 기본값이 이미 정해져 있어</strong> 설정이 비교적 단순하다.</li>
    <li>번들러 설정 파일은 도구마다 문법이 다르지만 <strong>핵심 개념은 공통</strong>이다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: loader와 plugin은 같은 개념을 도구마다 다르게 부르는 것뿐이다?</div>
    <div class="wda-mistake-right">정답: loader는 <strong>파일 단위 변환</strong>, plugin은 <strong>번들링 과정 전반에 대한 확장</strong>으로 역할 자체가 다르다. 다만 Vite처럼 이 둘을 플러그인 하나로 통합해 제공하는 도구도 있다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 번들러를 쓰려면 entry와 output을 항상 직접 지정해야 한다?</div>
    <div class="wda-mistake-right">정답: Vite 같은 도구는 <strong>합리적인 기본값</strong>을 미리 정해두어, 특별한 요구사항이 없다면 entry·output을 직접 적지 않아도 동작한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 시작과 끝</div>
    <div class="wda-formula-block-body"><code>entry(시작) → output(결과)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 확장 방식</div>
    <div class="wda-formula-block-body"><code>loader(변환) + plugin(부가 기능)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · Vite 특징</div>
    <div class="wda-formula-block-body"><code>기본값 있음 → 설정 단순</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">번들러가 파일을 수집할 때 시작하는 지점을 뭐라고 하나요?</div>
    <div class="wda-flip-back">entry(진입점)라고 부릅니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">loader의 역할은 무엇인가요?</div>
    <div class="wda-flip-back">CSS, 이미지처럼 자바스크립트가 아닌 파일을 번들러가 이해할 수 있는 형태로 변환합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">plugin의 역할은 무엇인가요?</div>
    <div class="wda-flip-back">번들링 과정 전반에 개입해 압축, 환경 변수 주입 같은 부가 기능을 추가합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Vite 설정이 비교적 짧고 단순한 이유는?</div>
    <div class="wda-flip-back">entry·output 같은 값에 합리적인 기본값이 이미 정해져 있어 직접 지정할 필요가 적기 때문입니다.</div>
  </div>
</div>
