---
title: "3-1 배포가 뭔가요?"
category: "frontend"
section: "deployment"
date: "2026-08-03"
status: "completed"
description: "로컬에서 실행하던 앱을 실제 사용자가 접속할 수 있는 서비스로 공개하는 배포의 개념과, 로컬 개발 환경과 배포된 서비스의 차이를 정리합니다."
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
  • <strong>배포의 정의</strong> — 개발한 앱을 실제 사용자가 쓸 수 있도록 공개하는 과정을 이해합니다<br>
  • <strong>로컬 환경과 배포 환경의 차이</strong> — localhost와 실제 도메인의 차이를 비교합니다<br>
  • <strong>빌드와 배포의 관계</strong> — 왜 배포 전에 항상 빌드 과정이 필요한지 이해합니다<br>
  • <strong>배포 전 확인할 점</strong> — 실수를 줄이기 위한 기본적인 체크포인트를 파악합니다
</div>

---

## 1. 배포란 무엇인가

배포(Deploy)는 내가 로컬 컴퓨터에서만 확인하던 앱을, 인터넷을 통해 누구나 접속할 수 있는 상태로 공개하는 과정입니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">개발 중 (localhost)</div>
    <code>http://localhost:5173</code> 같은 주소로, 오직 내 컴퓨터에서만 접속할 수 있습니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">배포 후</div>
    <code>https://my-app.web.app</code> 같은 실제 도메인으로, 전 세계 누구나 접속할 수 있습니다.
  </div>
</div>

---

## 2. 로컬 개발 환경과 배포된 서비스는 다르다

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">코드 상태</div><div class="wda-fcard-dsc">개발 중에는 원본 코드를, 배포 시에는 압축·최적화된 코드를 사용합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">실행 방식</div><div class="wda-fcard-dsc">개발 서버는 실시간 반영에 특화되어 있고, 배포 환경은 속도와 안정성에 특화되어 있습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">접근 범위</div><div class="wda-fcard-dsc">개발 환경은 나만 볼 수 있지만, 배포 환경은 실제 사용자가 접속합니다.</div></div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>내 컴퓨터에서 npm run dev로 잘 돌아간다고 해서, 배포 후에도 반드시 똑같이 동작한다는 보장은 없습니다. 환경 변수 설정, 경로 설정 등이 다를 수 있으므로 배포 후에는 실제 주소로 접속해 정상 동작을 반드시 확인해야 합니다.</p>
</div>

---

## 3. 배포 전에는 반드시 빌드를 거친다

배포되는 것은 우리가 작성한 소스 코드 그 자체가 아니라, **빌드(build)를 거쳐 만들어진 결과물**입니다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1. 코드 작성</div><div class="wda-fnode-dsc">src 폴더에서 기능 개발</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2. 빌드</div><div class="wda-fnode-dsc">브라우저가 읽기 좋은 형태로 변환·압축</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3. 배포</div><div class="wda-fnode-dsc">빌드 결과물을 서버에 업로드</div></div>
</div>

빌드 과정에서는 JSX 같은 문법을 브라우저가 이해할 수 있는 형태로 바꾸고, 파일 용량을 줄이는 최적화가 함께 이루어집니다. 이 결과물이 바로 실제 사용자에게 전달되는 파일입니다.

---

## 4. 배포 전 최소한의 확인 사항

**▶ 배포 전 점검 항목**

<table class="wda-mtable">
<thead><tr><th>점검 항목</th><th>확인 내용</th></tr></thead>
<tbody>
<tr><td>빌드 성공 여부</td><td>빌드 명령 실행 시 오류 없이 완료되는지</td></tr>
<tr><td>환경 변수</td><td>배포 환경에 맞는 값으로 설정되어 있는지</td></tr>
<tr><td>민감한 정보</td><td>비밀 키 등이 코드에 그대로 노출되지 않는지</td></tr>
</tbody>
</table>

배포는 "완성된 결과를 세상에 공개하는 것"이므로, 로컬에서 확인하지 못한 실수가 그대로 사용자에게 노출될 수 있습니다. 배포 전에 위 항목들을 습관적으로 점검하는 것이 좋습니다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>배포는 <strong>로컬에서만 보이던 앱을 실제 사용자가 접속할 수 있게 공개</strong>하는 과정이다.</li>
    <li>로컬 개발 환경과 배포된 서비스는 <strong>코드 상태와 실행 방식이 다르다</strong>.</li>
    <li>배포 대상은 소스 코드가 아니라 <strong>빌드를 거친 결과물</strong>이다.</li>
    <li>배포 전에는 <strong>환경 변수, 민감 정보 노출 여부</strong> 등을 점검해야 한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 로컬에서 잘 되면 배포 후에도 무조건 똑같이 잘 된다?</div>
    <div class="wda-mistake-right">정답: 환경 설정 차이 등으로 <strong>배포 후 별도의 확인</strong>이 필요할 수 있다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 배포는 src 폴더를 그대로 서버에 옮기는 작업이다?</div>
    <div class="wda-mistake-right">정답: 배포되는 것은 <strong>빌드를 거친 최적화된 결과물</strong>이지, 원본 소스 코드가 아니다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 정의</div>
    <div class="wda-formula-block-body"><code>배포 = 실제 서비스 공개</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 순서</div>
    <div class="wda-formula-block-body"><code>코드 작성 → 빌드 → 배포</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">배포란 무엇인가요?</div>
    <div class="wda-flip-back">개발한 앱을 실제 사용자가 접속할 수 있도록 인터넷에 공개하는 과정입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">배포되는 것은 소스 코드 자체인가요?</div>
    <div class="wda-flip-back">아니요. 빌드 과정을 거쳐 최적화된 결과물이 배포됩니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">로컬에서 잘 동작하면 배포 후 확인은 생략해도 되나요?</div>
    <div class="wda-flip-back">아니요. 환경 차이가 있을 수 있어 배포 후에도 반드시 확인해야 합니다.</div>
  </div>
</div>
