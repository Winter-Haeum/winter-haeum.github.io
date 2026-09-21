---
title: "1-1 Firebase"
category: "frontend"
section: "basics"
date: "2026-08-03"
status: "completed"
description: "Google이 제공하는 BaaS 플랫폼 Firebase가 어떤 문제를 해결해주는지, 백엔드를 직접 구축하지 않고도 앱 기능을 빠르게 붙일 수 있는 이유를 정리합니다."
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
  • <strong>Firebase의 정체</strong> — Google이 제공하는 BaaS 플랫폼이라는 개념을 이해합니다<br>
  • <strong>백엔드 개발과의 관계</strong> — 백엔드를 완전히 몰라도 되는 것은 아니라는 점을 정확히 짚습니다<br>
  • <strong>Firebase Console</strong> — 프로젝트를 만드는 기본 흐름을 파악합니다<br>
  • <strong>주요 서비스 큰 그림</strong> — 앞으로 배울 서비스들이 어떻게 연결되는지 감을 잡습니다
</div>

---

## 1. Firebase는 무엇인가

Firebase는 Google이 제공하는 **BaaS(Backend as a Service)** 플랫폼입니다. 데이터베이스, 사용자 인증, 파일 저장, 배포처럼 앱을 만들 때 거의 항상 필요한 백엔드 기능들을 이미 만들어진 서비스 형태로 빌려 쓸 수 있게 해줍니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">데이터베이스</div><div class="wda-fcard-dsc">Firestore로 앱의 데이터를 저장하고 실시간으로 동기화합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">인증</div><div class="wda-fcard-dsc">Authentication으로 회원가입·로그인 기능을 빠르게 붙입니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">파일 저장</div><div class="wda-fcard-dsc">Storage로 이미지·문서 같은 파일을 안전하게 보관합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">배포</div><div class="wda-fcard-dsc">Hosting으로 완성된 앱을 인터넷에 공개합니다.</div></div>
</div>

이 기능들을 직접 구현하려면 서버를 준비하고, 데이터베이스를 설계하고, 보안 로직을 짜는 등 상당한 시간이 필요합니다. Firebase는 이미 준비된 기능을 API 형태로 호출만 하면 쓸 수 있도록 만들어, 프론트엔드 개발자가 화면과 사용자 경험에 더 집중할 수 있게 도와줍니다.

---

## 2. 백엔드를 완전히 몰라도 되는 도구는 아니다

**📌 개념**

<div class="wda-callout wda-cw">
  <p>Firebase는 백엔드 인프라를 직접 구축하는 부담을 줄여주는 도구이지, 백엔드 개념 자체를 몰라도 되게 만들어주는 도구는 아닙니다. 데이터를 어떤 구조로 저장할지, 누구에게 어떤 권한을 줄지, 보안 규칙을 어떻게 세울지는 여전히 개발자가 이해하고 설계해야 하는 영역입니다.</p>
</div>

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">전통적인 백엔드 개발</div>
    서버를 구매·설정하고, 데이터베이스를 세팅하고, 인증 로직과 보안까지 처음부터 직접 구현합니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Firebase를 사용할 때</div>
    인프라 구축은 건너뛰지만, 데이터 구조 설계와 보안 규칙 작성 같은 판단은 여전히 개발자의 몫입니다.
  </div>
</div>

즉 Firebase는 "인프라를 직접 짓지 않아도 된다"는 것이지 "백엔드에 대해 아무것도 몰라도 된다"는 뜻이 아닙니다.

이 차이를 이해하고 있어야 이후 서비스별 문서에서 다루는 보안 규칙 같은 내용이 왜 중요한지 자연스럽게 받아들일 수 있습니다.

---

## 3. Firebase Console과 프로젝트 생성 흐름

Firebase의 모든 서비스는 웹 브라우저에서 접속하는 **Firebase Console**이라는 관리 화면을 통해 설정합니다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1. 접속</div><div class="wda-fnode-dsc">Google 계정으로 Firebase Console 접속</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2. 프로젝트 생성</div><div class="wda-fnode-dsc">프로젝트 이름 입력 후 생성</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3. 앱 등록</div><div class="wda-fnode-dsc">웹 앱을 등록하고 설정 정보 발급</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">4. 서비스 사용</div><div class="wda-fnode-dsc">필요한 서비스를 콘솔에서 활성화</div></div>
</div>

프로젝트를 생성하면 내 앱과 Firebase 서버를 연결하는 설정값이 발급됩니다. 이 값을 React 프로젝트의 초기화 코드에 전달해야 Firestore나 Authentication 같은 서비스를 코드에서 사용할 수 있습니다.

**• JavaScript: Firebase 앱 초기화**

```js
// firebase.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'your-app.firebaseapp.com',
  projectId: 'your-app',
};

const app = initializeApp(firebaseConfig);
```

**💼 실무 팁**

<div class="wda-callout wda-cb">
  <p>apiKey 같은 값은 코드에 포함되긴 하지만, 실제 접근 제어는 Firebase 콘솔의 보안 규칙이 담당합니다. 다만 실무에서는 이런 설정값을 환경 변수 파일로 분리해서 관리하는 습관을 들이는 것이 좋습니다.</p>
</div>

---

## 4. 앞으로 배울 서비스 큰 그림

이 섹션에서는 Firebase가 제공하는 여러 서비스 중, 웹 프론트엔드 개발자가 가장 자주 마주치는 네 가지를 순서대로 살펴봅니다.

**▶ 앞으로 배울 Firebase 서비스**

<table class="wda-mtable">
<thead><tr><th>서비스</th><th>역할</th></tr></thead>
<tbody>
<tr><td>Firestore</td><td>앱의 데이터를 저장하고 실시간으로 불러오는 데이터베이스</td></tr>
<tr><td>Authentication</td><td>회원가입·로그인 등 사용자 인증 처리</td></tr>
<tr><td>Storage</td><td>이미지·문서 같은 파일을 저장하고 관리</td></tr>
<tr><td>Hosting</td><td>완성된 웹 앱을 인터넷에 배포</td></tr>
</tbody>
</table>

이 네 가지 서비스는 서로 독립적으로 쓸 수도 있지만, 실제 서비스에서는 함께 조합해서 사용하는 경우가 많습니다.

예를 들어 로그인한 사용자만(Authentication) 사진을 올리고(Storage), 그 게시글 정보를 데이터베이스에 저장한(Firestore) 뒤, 완성된 앱을 배포(Hosting)하는 식입니다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>Firebase는 Google이 제공하는 <strong>BaaS(Backend as a Service)</strong> 플랫폼이다.</li>
    <li>백엔드 인프라 구축 부담은 줄여주지만, <strong>백엔드 개념 자체를 몰라도 되는 것은 아니다</strong>.</li>
    <li>Firebase Console에서 <strong>프로젝트 생성 → 앱 등록 → 서비스 활성화</strong> 순으로 설정한다.</li>
    <li>주요 서비스는 <strong>Firestore·Authentication·Storage·Hosting</strong> 네 가지가 중심이다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Firebase를 쓰면 백엔드를 하나도 몰라도 서비스를 만들 수 있다?</div>
    <div class="wda-mistake-right">정답: <strong>인프라 구축</strong>은 대신해주지만, 데이터 구조 설계와 보안 규칙 같은 <strong>백엔드적 판단</strong>은 여전히 개발자가 해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Firebase는 데이터베이스 기능 하나만 제공하는 도구다?</div>
    <div class="wda-mistake-right">정답: 데이터베이스 외에도 <strong>인증, 파일 저장, 배포</strong> 등 앱 개발에 필요한 여러 기능을 함께 제공하는 플랫폼이다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 정체</div>
    <div class="wda-formula-block-body"><code>Firebase = Google의 BaaS 플랫폼</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 핵심 서비스</div>
    <div class="wda-formula-block-body"><code>Firestore + Auth + Storage + Hosting</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Firebase는 어떤 종류의 플랫폼인가요?</div>
    <div class="wda-flip-back">Google이 제공하는 BaaS(Backend as a Service) 플랫폼입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Firebase를 쓰면 백엔드 지식이 전혀 필요 없나요?</div>
    <div class="wda-flip-back">아니요. 인프라 구축 부담은 줄지만 데이터 구조·보안 설계 같은 판단은 여전히 필요합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">이 섹션에서 다루는 4가지 핵심 서비스는?</div>
    <div class="wda-flip-back">Firestore, Authentication, Storage, Hosting입니다.</div>
  </div>
</div>
