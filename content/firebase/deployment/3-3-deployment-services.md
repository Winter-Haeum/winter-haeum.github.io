---
title: "3-3 다양한 배포 서비스 소개"
category: "frontend"
section: "deployment"
date: "2026-08-03"
status: "completed"
description: "GitHub Pages, Vercel, Netlify, Firebase Hosting을 비교하며 각 서비스의 특징과 프로젝트 성격에 맞는 선택 기준을 정리합니다."
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
  • <strong>배포 서비스 비교</strong> — GitHub Pages, Vercel, Netlify, Firebase Hosting의 특징을 파악합니다<br>
  • <strong>선택 기준</strong> — 프로젝트 성격에 따라 어떤 서비스가 어울리는지 감을 잡습니다<br>
  • <strong>공통점 이해</strong> — 서비스는 다르지만 배포의 기본 흐름은 비슷하다는 점을 확인합니다
</div>

---

## 1. Firebase Hosting만 있는 것이 아니다

지금까지 Firebase Hosting으로 배포하는 방법을 배웠지만, 프론트엔드 앱을 배포할 수 있는 서비스는 여러 가지가 있습니다. 각 서비스마다 강점이 다르므로 상황에 맞게 선택할 수 있다는 것을 알아두면 좋습니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">GitHub Pages</div><div class="wda-fcard-dsc">GitHub 저장소와 바로 연동되는 무료 정적 호스팅입니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Vercel</div><div class="wda-fcard-dsc">배포 속도가 빠르고 설정이 간단한 프론트엔드 특화 서비스입니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Netlify</div><div class="wda-fcard-dsc">폼 처리 등 부가 기능이 많은 정적 사이트 호스팅입니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Firebase Hosting</div><div class="wda-fcard-dsc">Firestore·Auth 같은 다른 Firebase 서비스와 함께 쓰기 좋습니다.</div></div>
</div>

---

## 2. 서비스별 특징 비교

**▶ 배포 서비스별 특징 비교**

<table class="wda-mtable">
<thead><tr><th>서비스</th><th>특징</th><th>이런 프로젝트에 어울림</th></tr></thead>
<tbody>
<tr><td>GitHub Pages</td><td>완전 무료, GitHub 저장소와 즉시 연동</td><td>개인 포트폴리오, 문서 사이트</td></tr>
<tr><td>Vercel</td><td>빠른 배포 속도, 간편한 설정</td><td>빠르게 결과를 확인하고 싶은 프로젝트</td></tr>
<tr><td>Netlify</td><td>폼 기능 등 정적 사이트에 유용한 부가 기능</td><td>백엔드 없는 일반 정적 사이트</td></tr>
<tr><td>Firebase Hosting</td><td>Firestore·Auth 등과 통합 관리</td><td>Firebase 데이터베이스·인증을 함께 쓰는 앱</td></tr>
</tbody>
</table>

**🔎 참고**

<div class="wda-callout wda-cb">
  <p>어떤 서비스가 "가장 좋다"고 단정할 수는 없습니다. 이미 Firebase의 데이터베이스나 인증 기능을 쓰고 있다면 Firebase Hosting으로 한 번에 관리하는 것이 편할 수 있고, 백엔드 기능 없이 순수한 정적 사이트라면 GitHub Pages나 Vercel도 충분히 좋은 선택입니다.</p>
</div>

---

## 3. 배포 방식의 공통점

서비스는 다르지만, 프론트엔드 앱을 배포하는 기본 흐름은 대체로 비슷합니다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1. 빌드</div><div class="wda-fnode-dsc">npm run build로 결과물 생성</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2. 업로드</div><div class="wda-fnode-dsc">각 서비스의 CLI나 대시보드로 전달</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3. 확인</div><div class="wda-fnode-dsc">발급된 주소로 접속해 정상 동작 확인</div></div>
</div>

어떤 서비스를 쓰든 "빌드 결과물을 올리고, 실제 주소에서 확인한다"는 큰 흐름은 동일합니다. 하나의 서비스를 제대로 익혀두면 다른 서비스로 옮기더라도 크게 어렵지 않게 적응할 수 있습니다.

---

## 4. 배포 후 공통적으로 확인할 것

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">화면 정상 표시</div><div class="wda-fcard-dsc">로컬과 동일하게 화면이 보이는지 확인합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">라우팅 동작</div><div class="wda-fcard-dsc">직접 하위 경로로 접속해도 오류가 없는지 확인합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">환경 변수 반영</div><div class="wda-fcard-dsc">배포 환경에 맞는 값이 제대로 적용됐는지 확인합니다.</div></div>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>프론트엔드 배포 서비스는 <strong>GitHub Pages, Vercel, Netlify, Firebase Hosting</strong> 등 여러 가지가 있다.</li>
    <li>각 서비스는 <strong>강점이 다르며, 프로젝트 성격에 맞춰 선택</strong>할 수 있다.</li>
    <li>서비스가 달라도 <strong>빌드 → 업로드 → 확인</strong>이라는 기본 흐름은 비슷하다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Firebase 프로젝트는 반드시 Firebase Hosting에만 배포해야 한다?</div>
    <div class="wda-mistake-right">정답: Firestore·Auth 같은 Firebase 서비스를 쓰더라도, <strong>화면 배포는 다른 서비스</strong>를 선택할 수도 있다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 여러 배포 서비스 중 절대적으로 가장 뛰어난 하나가 정해져 있다?</div>
    <div class="wda-mistake-right">정답: <strong>프로젝트의 성격과 이미 사용 중인 서비스</strong>에 따라 적합한 선택이 달라진다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 후보</div>
    <div class="wda-formula-block-body"><code>GitHub Pages · Vercel · Netlify · Firebase</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 공통 흐름</div>
    <div class="wda-formula-block-body"><code>빌드 → 업로드 → 확인</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">GitHub Pages는 어떤 프로젝트에 특히 잘 어울리나요?</div>
    <div class="wda-flip-back">개인 포트폴리오나 문서 사이트처럼 백엔드가 필요 없는 정적 사이트입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Firebase의 데이터베이스와 인증을 함께 쓰는 앱이라면 어떤 배포 서비스가 편할까요?</div>
    <div class="wda-flip-back">Firebase Hosting을 쓰면 다른 Firebase 서비스와 통합 관리가 편합니다.</div>
  </div>
</div>
