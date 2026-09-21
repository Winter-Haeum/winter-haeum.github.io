---
title: "1-2 서버리스 아키텍처란?"
category: "frontend"
section: "basics"
date: "2026-08-03"
status: "completed"
description: "서버리스는 서버가 없다는 뜻이 아니라 서버 관리를 직접 덜 한다는 뜻이라는 관점에서, 전통적인 방식과의 차이와 Firebase가 서버리스에 속하는 이유를 정리합니다."
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
  • <strong>서버리스의 진짜 의미</strong> — "서버가 없다"가 아니라 "관리를 덜 한다"는 뜻임을 이해합니다<br>
  • <strong>전통적인 서버 운영과의 차이</strong> — 누가 무엇을 관리하는지 비교합니다<br>
  • <strong>이벤트 기반 동작</strong> — 요청이 있을 때만 동작하는 방식의 개념을 파악합니다<br>
  • <strong>Firebase와의 연결</strong> — Firebase가 왜 서버리스로 분류되는지 이해합니다
</div>

---

## 1. 서버리스, 서버가 없다는 뜻이 아니다

서버리스(Serverless)라는 이름 때문에 "서버가 전혀 존재하지 않는다"고 오해하기 쉽지만, 실제로는 그렇지 않습니다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>서버는 여전히 존재합니다. 다만 그 서버를 구매하고, 설정하고, 관리하는 일을 개발자가 아니라 클라우드 업체(Google, AWS 등)가 대신 맡아준다는 뜻입니다. 개발자 입장에서는 서버 관리를 "직접 하지 않아도 되는" 상태이기 때문에 서버리스라고 부릅니다.</p>
</div>

즉 서버리스는 "서버가 없다"가 아니라 **"서버 관리 책임이 개발자에서 클라우드 업체로 옮겨졌다"**로 이해하는 것이 정확합니다.

---

## 2. 전통적인 서버 운영과 무엇이 다른가

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">전통적인 서버 운영</div>
    서버를 직접 구매하거나 대여하고, 운영체제 설치·보안 업데이트·트래픽 대응까지 개발자(또는 팀)가 책임집니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">서버리스</div>
    서버의 존재는 그대로지만, 설치·업데이트·트래픽에 따른 확장은 클라우드 업체가 자동으로 처리합니다.
  </div>
</div>

**▶ 전통적인 서버와 서버리스 비교**

<table class="wda-mtable">
<thead><tr><th>항목</th><th>전통적인 서버</th><th>서버리스</th></tr></thead>
<tbody>
<tr><td>서버 관리 주체</td><td>개발자(또는 운영팀)</td><td>클라우드 업체</td></tr>
<tr><td>트래픽 대응</td><td>수동으로 서버 증설 필요</td><td>자동으로 확장</td></tr>
<tr><td>비용 방식</td><td>서버를 켜둔 시간만큼 고정 비용</td><td>실제 사용한 만큼 과금</td></tr>
</tbody>
</table>

---

## 3. 이벤트가 있을 때만 동작한다

서버리스 서비스는 항상 켜져서 대기하는 것이 아니라, 요청(이벤트)이 들어왔을 때만 필요한 만큼 동작하는 방식으로 설계되어 있습니다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">요청 발생</div><div class="wda-fnode-dsc">사용자가 앱을 사용하며 데이터 요청</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">처리</div><div class="wda-fnode-dsc">클라우드가 필요한 만큼 자원을 배정해 처리</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">응답</div><div class="wda-fnode-dsc">결과를 돌려주고 자원을 반납</div></div>
</div>

이런 방식 덕분에 사용자가 거의 없는 시간에는 비용이 거의 들지 않고, 트래픽이 갑자기 몰려도 사람이 직접 서버를 늘릴 필요 없이 자동으로 대응할 수 있습니다.

---

## 4. Firebase는 왜 서버리스로 분류될까

Firebase의 Firestore, Authentication, Storage, Hosting 같은 서비스는 모두 서버리스 방식으로 동작합니다. 개발자는 서버를 따로 준비하지 않고, Firebase SDK를 통해 필요한 기능을 호출하기만 하면 됩니다.

**• JavaScript: 서버 관리 없이 Firestore 사용**

```js
// 데이터를 저장할 때도 서버를 직접 관리할 필요가 없습니다
import { addDoc, collection } from 'firebase/firestore';

await addDoc(collection(db, 'posts'), {
  title: '첫 글',
  createdAt: new Date(),
});
```

**📌 개념**

<div class="wda-callout wda-cb">
  <p>Firebase처럼 데이터베이스나 인증 같은 기능을 API 형태로 제공하는 서비스를 BaaS라고 부르는데, 이는 서버리스 아키텍처의 대표적인 활용 형태 중 하나입니다. 서버를 직접 관리하지 않는다는 점에서 서버리스 개념과 맞닿아 있습니다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>서버리스는 <strong>"서버가 없다"가 아니라 "서버 관리를 직접 덜 한다"</strong>는 뜻이다.</li>
    <li>서버 설치·업데이트·확장 같은 관리는 <strong>클라우드 업체</strong>가 대신 담당한다.</li>
    <li>서버리스 서비스는 <strong>요청(이벤트)이 있을 때만</strong> 필요한 만큼 동작한다.</li>
    <li>Firebase의 여러 서비스는 <strong>서버리스 방식으로 동작하는 BaaS</strong>의 대표적인 예다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 서버리스는 물리적인 서버 자체가 존재하지 않는다는 뜻이다?</div>
    <div class="wda-mistake-right">정답: 서버는 <strong>여전히 존재</strong>하며, 다만 그 관리 책임이 <strong>클라우드 업체로 옮겨진 것</strong>일 뿐이다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 서버리스는 항상 서버를 켜두고 요청을 기다리는 방식이다?</div>
    <div class="wda-mistake-right">정답: 서버리스는 <strong>요청이 들어올 때만</strong> 필요한 만큼 동작하는 이벤트 기반 방식이 일반적이다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 의미</div>
    <div class="wda-formula-block-body"><code>서버리스 = 관리 책임 이전</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 동작 방식</div>
    <div class="wda-formula-block-body"><code>요청 있을 때만 동작</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">서버리스는 서버가 아예 없다는 뜻인가요?</div>
    <div class="wda-flip-back">아니요. 서버는 존재하지만 관리를 클라우드 업체가 대신 맡는다는 뜻입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">서버리스 서비스는 언제 동작하나요?</div>
    <div class="wda-flip-back">사용자의 요청(이벤트)이 발생했을 때만 필요한 만큼 동작합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Firebase는 왜 서버리스로 분류되나요?</div>
    <div class="wda-flip-back">Firestore, Auth 같은 서비스를 개발자가 서버를 직접 관리하지 않고 API 호출만으로 사용할 수 있기 때문입니다.</div>
  </div>
</div>
