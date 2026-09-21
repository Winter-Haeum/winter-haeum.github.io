---
title: "2-2 Authentication"
category: "frontend"
section: "services"
date: "2026-08-03"
status: "completed"
description: "이메일 로그인과 소셜 로그인 등 Firebase Authentication이 지원하는 인증 방식과, 인증(Authentication)과 인가(Authorization)의 차이를 정리합니다."
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
  • <strong>Authentication 개념</strong> — 사용자의 신원을 확인하는 인증 기능을 이해합니다<br>
  • <strong>인증과 인가의 차이</strong> — Authentication과 Authorization을 구분합니다<br>
  • <strong>이메일·소셜 로그인</strong> — Firebase가 지원하는 대표적인 로그인 방식을 익힙니다<br>
  • <strong>로그인 상태 확인</strong> — 지금 로그인된 사용자가 누구인지 추적하는 방법을 파악합니다
</div>

---

## 1. Authentication이란

Authentication은 "이 사용자가 누구인지"를 확인하는 Firebase의 인증 서비스입니다. 회원가입, 로그인, 로그인 상태 유지처럼 사용자 신원과 관련된 기능을 직접 구현하지 않고도 사용할 수 있게 해줍니다.

**📌 개념**

<div class="wda-callout wda-cb">
  <p>인증은 "당신은 누구입니까?"를 확인하는 절차이고, 인가는 "당신은 무엇을 할 수 있습니까?"를 결정하는 절차입니다. Firebase Authentication은 인증을 담당하며, 로그인한 사용자가 어떤 데이터에 접근할 수 있는지(인가)는 이후 배울 보안 규칙에서 별도로 다룹니다.</p>
</div>

---

## 2. 다양한 로그인 방식

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">이메일/비밀번호</div><div class="wda-fcard-dsc">가장 기본적인 가입·로그인 방식입니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">소셜 로그인</div><div class="wda-fcard-dsc">Google, GitHub 등 외부 계정으로 간편하게 로그인합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">기타 방식</div><div class="wda-fcard-dsc">전화번호 인증, 익명 로그인 등도 지원됩니다.</div></div>
</div>

**• JavaScript: 이메일·비밀번호 회원가입**

```js
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(app);

// 이메일/비밀번호로 회원가입
async function signUp(email, password) {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
}
```

**• JavaScript: Google 소셜 로그인**

```js
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Google 소셜 로그인
async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
}
```

소셜 로그인을 쓰려면 Firebase Console의 Authentication 메뉴에서 해당 로그인 방식을 먼저 활성화해야 합니다.

---

## 3. 지금 로그인한 사용자 확인하기

로그인 상태는 새로고침해도 유지되어야 하므로, `onAuthStateChanged`를 사용해 로그인 상태 변화를 실시간으로 감지합니다.

**• JavaScript: 로그인 상태 실시간 감지**

```js
import { onAuthStateChanged } from 'firebase/auth';

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('로그인된 사용자:', user.uid);
  } else {
    console.log('로그인되어 있지 않음');
  }
});
```

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">앱 시작</div><div class="wda-fnode-dsc">onAuthStateChanged 등록</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">상태 확인</div><div class="wda-fnode-dsc">로그인 여부를 자동으로 판별</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">화면 반영</div><div class="wda-fnode-dsc">로그인 여부에 따라 다른 화면 표시</div></div>
</div>

---

## 4. 로그인 화면은 인증의 일부일 뿐

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>Authentication으로 "누가 로그인했는지"는 확인할 수 있지만, "이 사용자가 특정 데이터를 읽거나 쓸 수 있는지"는 Firestore나 Storage의 보안 규칙에서 별도로 설정해야 합니다. 로그인 기능을 붙였다고 해서 데이터가 자동으로 안전해지는 것은 아닙니다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>Authentication은 <strong>사용자의 신원을 확인</strong>하는 인증 서비스다.</li>
    <li><strong>인증(누구인지)</strong>과 <strong>인가(무엇을 할 수 있는지)</strong>는 서로 다른 개념이다.</li>
    <li>이메일/비밀번호 외에도 <strong>Google 등 소셜 로그인</strong>을 지원한다.</li>
    <li>로그인 상태는 <strong>onAuthStateChanged</strong>로 실시간 감지한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 로그인 기능만 붙이면 데이터 보안은 자동으로 해결된다?</div>
    <div class="wda-mistake-right">정답: 로그인(인증)과 <strong>데이터 접근 권한(인가)은 별개</strong>이며, 보안 규칙을 따로 설정해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 인증(Authentication)과 인가(Authorization)는 같은 말이다?</div>
    <div class="wda-mistake-right">정답: 인증은 <strong>신원 확인</strong>, 인가는 <strong>권한 결정</strong>으로 서로 다른 절차다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 인증</div>
    <div class="wda-formula-block-body"><code>Authentication = 신원 확인</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 상태 감지</div>
    <div class="wda-formula-block-body"><code>onAuthStateChanged</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">인증(Authentication)과 인가(Authorization)의 차이는?</div>
    <div class="wda-flip-back">인증은 "누구인지" 확인하는 것이고, 인가는 "무엇을 할 수 있는지" 결정하는 것입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">지금 로그인한 사용자를 실시간으로 확인하는 함수는?</div>
    <div class="wda-flip-back">onAuthStateChanged입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">로그인 기능을 붙이면 데이터 보안이 자동으로 완성되나요?</div>
    <div class="wda-flip-back">아니요. 데이터 접근 권한은 별도의 보안 규칙으로 설정해야 합니다.</div>
  </div>
</div>
