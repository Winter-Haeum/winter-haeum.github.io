---
title: "1-3 서비스 둘러보기"
category: "frontend"
section: "basics"
date: "2026-08-03"
status: "completed"
description: "Firebase Console에서 프로젝트를 만들고 앱을 등록하는 흐름을 다시 정리하고, 이 카테고리에서 다룰 4가지 주요 서비스가 어떻게 이어지는지 미리 살펴봅니다."
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
  • <strong>프로젝트 생성 흐름 복습</strong> — Firebase Console에서 앱을 등록하는 순서를 다시 정리합니다<br>
  • <strong>서비스 분류 감각</strong> — Firebase가 제공하는 기능을 목적에 따라 구분해봅니다<br>
  • <strong>이 카테고리의 학습 순서</strong> — 앞으로 어떤 순서로 서비스를 배우는지 확인합니다<br>
  • <strong>서비스 간 연결</strong> — 각 서비스가 실제로 어떻게 함께 쓰이는지 큰 그림을 그립니다
</div>

---

## 1. 프로젝트 생성부터 서비스 사용까지

Firebase의 어떤 서비스를 쓰더라도 시작은 항상 같습니다. Firebase Console에서 프로젝트를 만들고, 그 프로젝트에 웹 앱을 등록하는 것입니다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1. 프로젝트 생성</div><div class="wda-fnode-dsc">Console에서 프로젝트 이름 입력</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2. 웹 앱 등록</div><div class="wda-fnode-dsc">닉네임 입력 후 설정값 발급</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3. SDK 연결</div><div class="wda-fnode-dsc">발급받은 설정값을 코드에 연결</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">4. 서비스 활성화</div><div class="wda-fnode-dsc">필요한 서비스를 콘솔에서 켜기</div></div>
</div>

앱을 등록하면 발급되는 설정값(firebaseConfig)을 초기화 코드에 전달해야, 이후 배울 Firestore·Authentication 같은 서비스를 코드에서 사용할 수 있습니다.

**• JavaScript: firebaseConfig로 앱 초기화**

```js
import { initializeApp } from 'firebase/app';

const app = initializeApp({
  apiKey: 'YOUR_API_KEY',
  authDomain: 'your-app.firebaseapp.com',
  projectId: 'your-app',
});
```

---

## 2. Firebase 서비스, 목적에 따라 나눠보기

Firebase는 수십 가지 기능을 제공하지만, 처음 배울 때는 목적에 따라 크게 몇 가지로 나눠서 이해하면 훨씬 수월합니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">데이터 저장</div><div class="wda-fcard-dsc">Firestore — 앱에서 다루는 정보를 저장하고 실시간으로 불러옵니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">사용자 관리</div><div class="wda-fcard-dsc">Authentication — 회원가입, 로그인, 로그인 상태 확인을 담당합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">파일 저장</div><div class="wda-fcard-dsc">Storage — 이미지나 문서처럼 용량이 큰 파일을 보관합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">배포</div><div class="wda-fcard-dsc">Hosting — 완성된 앱을 실제 인터넷 주소로 공개합니다.</div></div>
</div>

**📌 개념**

<div class="wda-callout wda-ci">
  <p>다음 섹션인 "Firebase 주요 서비스"에서는 이 네 가지를 하나씩 자세히 다룹니다. 이후 "Firebase 배포" 섹션에서는 완성된 앱을 실제로 인터넷에 공개하는 과정을, "부록" 섹션에서는 실전 앱을 만들 때 Firebase와 함께 자주 쓰이는 React Portal·Zustand·API 연동 같은 보조 개념을 다룹니다.</p>
</div>

---

## 3. 서비스는 따로, 하지만 함께 쓰인다

각 서비스는 독립적으로 배우지만, 실제 서비스에서는 여러 개를 조합해서 사용하는 경우가 대부분입니다.

**▶ 서비스 조합 시나리오**

<table class="wda-mtable">
<thead><tr><th>시나리오</th><th>함께 쓰이는 서비스</th></tr></thead>
<tbody>
<tr><td>로그인한 사용자만 글쓰기 허용</td><td>Authentication + Firestore</td></tr>
<tr><td>프로필 사진 업로드 후 게시글에 표시</td><td>Storage + Firestore</td></tr>
<tr><td>완성된 앱을 실제 주소로 공개</td><td>Hosting</td></tr>
</tbody>
</table>

이처럼 서비스 하나하나의 역할을 명확히 이해해두면, 나중에 실제 앱을 만들 때 어떤 조합이 필요한지 스스로 판단할 수 있게 됩니다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>모든 Firebase 서비스는 <strong>프로젝트 생성 → 웹 앱 등록 → 설정값 연결</strong> 과정을 거쳐야 사용할 수 있다.</li>
    <li>Firebase 서비스는 <strong>데이터 저장, 사용자 관리, 파일 저장, 배포</strong> 네 가지 목적으로 나눠 이해하면 편하다.</li>
    <li>여러 서비스는 <strong>독립적으로 배우되, 실제로는 조합해서</strong> 사용하는 경우가 많다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Firestore·Auth·Storage·Hosting은 서로 완전히 분리되어 있어 함께 쓸 수 없다?</div>
    <div class="wda-mistake-right">정답: 각 서비스는 독립적으로 동작하지만, <strong>실제 앱에서는 자연스럽게 조합</strong>해서 사용하는 것이 일반적이다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 프로젝트를 만들면 별도 설정 없이 모든 서비스가 바로 켜져 있다?</div>
    <div class="wda-mistake-right">정답: 프로젝트를 만든 뒤에도 <strong>사용할 서비스는 콘솔에서 하나씩 활성화</strong>해야 한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 시작 흐름</div>
    <div class="wda-formula-block-body"><code>프로젝트 생성 → 앱 등록 → SDK 연결</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 4대 서비스</div>
    <div class="wda-formula-block-body"><code>저장 · 인증 · 파일 · 배포</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Firebase 서비스를 쓰기 전 반드시 거쳐야 하는 과정은?</div>
    <div class="wda-flip-back">프로젝트 생성과 웹 앱 등록, 그리고 발급받은 설정값을 코드에 연결하는 과정입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">이번 카테고리에서 다룰 4가지 핵심 서비스의 목적은?</div>
    <div class="wda-flip-back">데이터 저장(Firestore), 사용자 관리(Authentication), 파일 저장(Storage), 배포(Hosting)입니다.</div>
  </div>
</div>
