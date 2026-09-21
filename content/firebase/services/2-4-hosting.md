---
title: "2-4 Hosting 배포"
category: "frontend"
section: "services"
date: "2026-08-03"
status: "completed"
description: "Firebase Hosting이 React 앱 자체를 실행하는 서버가 아니라 build 결과물인 정적 파일을 제공하는 서비스라는 관점에서, 역할과 기본 개념을 정리합니다."
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
  • <strong>Hosting의 역할</strong> — 정적 파일을 제공하는 서비스라는 개념을 이해합니다<br>
  • <strong>build 결과물과의 관계</strong> — React 앱이 배포되는 실제 형태를 파악합니다<br>
  • <strong>정적 호스팅의 의미</strong> — React 앱을 직접 실행하는 서버와 무엇이 다른지 비교합니다<br>
  • <strong>SPA 라우팅 대응</strong> — Hosting이 React Router와 함께 동작하는 방식을 살펴봅니다
</div>

---

## 1. Hosting은 정적 파일을 제공하는 서비스다

Firebase Hosting은 React 앱을 실행해주는 서버가 아닙니다. 정확히는, `npm run build`로 만들어진 **정적 파일(HTML, CSS, JS)**을 전 세계 사용자에게 전달해주는 서비스입니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">오해하기 쉬운 관점</div>
    Hosting이 React 코드를 직접 실행해서 화면을 만들어준다고 생각하기 쉽습니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">실제 동작 방식</div>
    Hosting은 이미 완성된 HTML/CSS/JS 파일을 저장해뒀다가, 요청이 오면 그대로 전달할 뿐입니다.
  </div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  <p>React 앱은 빌드 과정을 거치면 정적인 HTML/CSS/JS 파일 묶음이 됩니다. Hosting은 이 파일들을 사용자의 브라우저에 전달하는 역할만 하고, 실제로 화면을 그리고 동작시키는 것은 파일을 내려받은 사용자의 브라우저입니다.</p>
</div>

---

## 2. build 결과물이 곧 배포 대상이다

**• 터미널: 배포용 빌드 생성**

```bash
npm run build
```

이 명령을 실행하면 `dist` 폴더 안에 최적화된 HTML/CSS/JS 파일들이 생성됩니다. Firebase Hosting은 바로 이 폴더의 내용을 서버에 올려서 서비스합니다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1. 코드 작성</div><div class="wda-fnode-dsc">src 폴더에서 개발</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2. 빌드</div><div class="wda-fnode-dsc">npm run build로 dist 폴더 생성</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3. 배포</div><div class="wda-fnode-dsc">dist 폴더 내용을 Hosting에 업로드</div></div>
</div>

즉, 소스 코드를 직접 서버에 올리는 것이 아니라 **빌드가 끝난 결과물**을 올린다는 점이 핵심입니다.

---

## 3. SPA 라우팅을 위한 설정

React Router를 쓰는 SPA(Single Page Application)는 실제로는 `index.html` 파일 하나만 존재하고, 나머지 경로는 자바스크립트가 화면을 바꿔가며 흉내 내는 방식입니다.

그래서 사용자가 주소창에 `/profile` 같은 경로를 직접 입력하면, 서버 입장에서는 그런 파일이 없어 오류가 날 수 있습니다.

**• 설정: SPA 라우팅을 위한 rewrites 설정**

```json
{
  "hosting": {
    "public": "dist",
    "rewrites": [
      { "source": "**", "destination": "/index.html" }
    ]
  }
}
```

이 설정은 어떤 경로로 요청이 오든 일단 `index.html`을 보여주고, 그 안의 React Router가 나머지 화면 전환을 처리하도록 합니다.

---

## 4. 정적 호스팅의 장점

**▶ 정적 호스팅 장점**

<table class="wda-mtable">
<thead><tr><th>특징</th><th>설명</th></tr></thead>
<tbody>
<tr><td>속도</td><td>이미 완성된 파일을 그대로 전달하므로 응답이 빠릅니다.</td></tr>
<tr><td>보안</td><td>서버에서 매번 코드를 실행하지 않아 공격 표면이 줄어듭니다.</td></tr>
<tr><td>확장성</td><td>정적 파일이므로 트래픽이 늘어도 비교적 쉽게 대응할 수 있습니다.</td></tr>
</tbody>
</table>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>Hosting은 <strong>React 앱을 실행하는 서버가 아니라, build 결과물을 제공하는 정적 호스팅 서비스</strong>다.</li>
    <li>배포 대상은 <strong>소스 코드가 아니라 npm run build로 생성된 dist 폴더</strong>다.</li>
    <li>SPA 라우팅을 지원하려면 <strong>모든 경로를 index.html로 연결하는 설정</strong>이 필요하다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Firebase Hosting에 올리면 React 코드를 서버가 직접 실행해준다?</div>
    <div class="wda-mistake-right">정답: Hosting은 <strong>이미 빌드된 정적 파일</strong>을 전달할 뿐이며, 화면을 그리는 것은 <strong>사용자의 브라우저</strong>다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: src 폴더를 그대로 배포하면 된다?</div>
    <div class="wda-mistake-right">정답: 반드시 <strong>npm run build</strong>를 먼저 실행해 생성된 <strong>dist 폴더</strong>를 배포해야 한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 역할</div>
    <div class="wda-formula-block-body"><code>Hosting = 정적 파일 제공</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 배포 대상</div>
    <div class="wda-formula-block-body"><code>dist 폴더 (build 결과물)</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Firebase Hosting은 React 코드를 직접 실행하나요?</div>
    <div class="wda-flip-back">아니요. build로 만들어진 정적 파일을 전달할 뿐이며, 실행은 브라우저가 합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Hosting에 배포하는 실제 대상은?</div>
    <div class="wda-flip-back">npm run build로 생성된 dist 폴더의 정적 파일입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">SPA 라우팅이 정상 동작하려면 어떤 설정이 필요한가요?</div>
    <div class="wda-flip-back">모든 요청 경로를 index.html로 연결하는 rewrites 설정이 필요합니다.</div>
  </div>
</div>
