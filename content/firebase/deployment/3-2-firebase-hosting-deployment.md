---
title: "3-2 Firebase Hosting 배포 방법"
category: "frontend"
section: "deployment"
date: "2026-08-03"
status: "completed"
description: "firebase init과 firebase deploy를 중심으로 build 결과물을 Firebase Hosting에 올리는 기본 배포 흐름을 정리합니다."
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
  • <strong>Firebase CLI 준비</strong> — 배포에 필요한 도구를 설치하고 로그인하는 과정을 이해합니다<br>
  • <strong>firebase init</strong> — 프로젝트를 Firebase Hosting과 연결하는 초기화 과정을 익힙니다<br>
  • <strong>firebase deploy</strong> — build 결과물을 실제로 업로드하는 방법을 익힙니다<br>
  • <strong>배포 후 확인</strong> — 배포가 끝난 뒤 무엇을 점검해야 하는지 파악합니다
</div>

---

## 1. 배포 준비: Firebase CLI

Firebase Hosting에 배포하려면 터미널에서 Firebase 명령어를 사용할 수 있는 CLI 도구가 필요합니다.

**• 터미널: Firebase CLI 설치·로그인**

```bash
npm install -g firebase-tools

firebase login
```

`firebase login`을 실행하면 브라우저가 열리고, Firebase 프로젝트를 만들 때 사용한 Google 계정으로 로그인해 터미널과 계정을 연결합니다.

---

## 2. firebase init — 프로젝트와 연결하기

프로젝트 폴더에서 `firebase init`을 실행하면, 어떤 서비스를 사용할지, 어떤 폴더를 배포할지 묻는 질문이 순서대로 나타납니다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">기능 선택</div><div class="wda-fnode-dsc">Hosting 선택</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">프로젝트 연결</div><div class="wda-fnode-dsc">기존 Firebase 프로젝트 선택</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">배포 폴더 지정</div><div class="wda-fnode-dsc">build 결과물 폴더(dist) 입력</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">SPA 설정</div><div class="wda-fnode-dsc">모든 경로를 index.html로 연결할지 선택</div></div>
</div>

**• 터미널: Firebase Hosting 초기화**

```bash
firebase init hosting
```

**▶ firebase init hosting 질문별 권장 답변**

<table class="wda-mtable">
<thead><tr><th>질문</th><th>권장 답변</th></tr></thead>
<tbody>
<tr><td>배포할 폴더(public directory)</td><td>dist</td></tr>
<tr><td>Single-page app으로 설정할지</td><td>Yes</td></tr>
</tbody>
</table>

이 과정이 끝나면 `firebase.json`, `.firebaserc` 같은 설정 파일이 프로젝트에 생성됩니다.

---

## 3. 빌드하고 배포하기

배포는 항상 다음 순서를 따릅니다.

**• 터미널: 빌드 후 배포**

```bash
npm run build
firebase deploy
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>firebase deploy는 dist 폴더에 있는 파일을 그대로 서버에 올립니다. 코드를 수정한 뒤 npm run build를 하지 않고 바로 배포하면, 수정 전의 예전 파일이 다시 올라가는 실수가 생길 수 있습니다.</p>
</div>

배포가 성공하면 터미널에 `Hosting URL`이 함께 출력되며, 이 주소로 접속하면 실제 배포된 앱을 확인할 수 있습니다.

---

## 4. 배포 후 확인할 것

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">화면 정상 표시</div><div class="wda-fcard-dsc">배포된 주소에서 앱이 로컬과 동일하게 보이는지 확인합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">라우팅 동작</div><div class="wda-fcard-dsc">주소창에 직접 하위 경로를 입력해도 정상 동작하는지 확인합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">환경 변수</div><div class="wda-fcard-dsc">배포 환경에서 API 키 등 환경 변수가 제대로 적용됐는지 확인합니다.</div></div>
</div>

배포가 끝났다고 작업이 끝난 것은 아닙니다. 실제 도메인으로 접속해서 로컬과 동일하게 동작하는지 확인하는 과정까지가 배포의 마지막 단계입니다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>배포 전에는 <strong>firebase-tools 설치와 firebase login</strong>이 필요하다.</li>
    <li><strong>firebase init</strong>으로 프로젝트를 Hosting과 연결하고 배포 폴더를 지정한다.</li>
    <li>배포는 항상 <strong>npm run build → firebase deploy</strong> 순서로 진행한다.</li>
    <li>배포 후에는 <strong>실제 주소에서 정상 동작 여부</strong>를 반드시 확인한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: firebase deploy만 실행하면 최신 코드가 자동으로 반영된다?</div>
    <div class="wda-mistake-right">정답: 반드시 <strong>먼저 npm run build</strong>를 실행해 최신 dist 폴더를 만든 뒤 배포해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: firebase init은 한 번만 실행하면 다시 쓸 일이 없다?</div>
    <div class="wda-mistake-right">정답: 설정을 바꾸거나 새 기능을 추가할 때 <strong>firebase init을 다시 실행</strong>할 수도 있다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 준비</div>
    <div class="wda-formula-block-body"><code>firebase-tools 설치 → login</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 배포</div>
    <div class="wda-formula-block-body"><code>build → deploy</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Firebase Hosting 배포를 위한 기본 명령어 순서는?</div>
    <div class="wda-flip-back">npm run build 실행 후 firebase deploy를 실행합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">firebase init에서 SPA 설정 질문에는 왜 Yes를 선택하나요?</div>
    <div class="wda-flip-back">React Router가 정상 작동하도록 모든 경로를 index.html로 연결하기 위해서입니다.</div>
  </div>
</div>
