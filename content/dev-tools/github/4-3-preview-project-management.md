---
title: "4-3 Preview 프로젝트 관리하기"
category: "frontend"
section: "github"
date: "2026-08-03"
status: "completed"
description: "코드를 실제로 병합하기 전에 결과물을 미리 확인할 수 있게 해주는 Preview 배포의 목적과 기본 흐름을 정리합니다."
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
  • <strong>Preview 배포의 목적</strong> — 병합 전에 결과물을 미리 확인해야 하는 이유를 이해합니다<br>
  • <strong>PR과 Preview의 관계</strong> — Pull Request마다 별도의 미리보기 환경이 만들어지는 흐름을 파악합니다<br>
  • <strong>확인 관점 정리</strong> — Preview 환경에서 무엇을 점검해야 하는지 감을 잡습니다<br>
  • <strong>배포 전 마지막 점검 습관</strong> — 병합 전에 반드시 확인하는 태도를 갖춥니다
</div>

---

## 1. 코드만 봐서는 알 수 없는 것들

4-2에서 배운 Pull Request와 코드 리뷰에 이어, 이번에는 "코드만 보고 판단하기 어려운 부분"을 확인하는 방법을 다룹니다. 코드 리뷰가 코드 자체를 읽고 확인하는 과정이라면, Preview는 실제로 화면을 눈으로 보고 확인하는 과정입니다.

코드 리뷰는 매우 유용하지만, 코드를 읽는 것만으로는 확인하기 어려운 부분도 있습니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">레이아웃 문제</div><div class="wda-fcard-dsc">CSS를 조금 바꿨을 때 실제 화면이 어떻게 깨지는지는 코드만 봐서는 알기 어렵습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">실제 동작 흐름</div><div class="wda-fcard-dsc">버튼을 눌렀을 때 화면이 어떤 순서로 바뀌는지는 직접 눌러봐야 확실히 알 수 있습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">반응형 화면</div><div class="wda-fcard-dsc">모바일 화면에서 어떻게 보이는지는 실제 화면을 봐야 정확히 판단할 수 있습니다.</div></div>
</div>

이런 부분을 확인하려면 코드를 직접 실행해서 눈으로 봐야 합니다. 그런데 매번 리뷰어가 브랜치를 내려받아 로컬에서 실행해보는 것은 번거로운 일입니다.

**Preview 배포**는 이 번거로움을 줄여주는 장치입니다.

---

## 2. Preview 배포란

**Preview 배포**는 Pull Request를 올릴 때마다, 그 브랜치의 코드를 자동으로 별도의 임시 주소에 배포해서 누구나 브라우저로 바로 확인할 수 있게 해주는 기능입니다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1. PR 생성</div><div class="wda-fnode-dsc">feature branch로 PR 올리기</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2. 자동 빌드</div><div class="wda-fnode-dsc">그 브랜치 코드를 자동으로 빌드</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3. 임시 배포</div><div class="wda-fnode-dsc">별도 주소에 결과물 올림</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">4. 확인</div><div class="wda-fnode-dsc">브라우저로 바로 접속해서 확인</div></div>
</div>

**💡 사용 팁**

<div class="wda-callout wda-cb">
  <p>Preview 배포로 만들어지는 주소는 실제 서비스 주소(main 브랜치를 배포한 결과)와는 별개입니다. 그래서 PR의 코드에 문제가 있더라도 실제 사용자에게 영향을 주지 않고, 안전하게 미리 확인만 해볼 수 있습니다.</p>
</div>

---

## 3. Preview에서 확인할 것

Preview 환경에 접속했을 때는 아래와 같은 관점으로 확인하면 도움이 됩니다.

**▶ Preview 환경 확인 항목**

<table class="wda-mtable">
<thead><tr><th>확인 항목</th><th>설명</th></tr></thead>
<tbody>
<tr><td>의도한 화면인가</td><td>PR 설명에 적힌 변경 사항이 실제 화면에도 그대로 반영되어 있는지 확인합니다.</td></tr>
<tr><td>기존 기능이 깨지지 않았는가</td><td>이번 변경과 관련 없어 보이는 다른 화면도 한 번씩 둘러봅니다.</td></tr>
<tr><td>다양한 화면 크기</td><td>필요하다면 브라우저 창 크기를 줄여 모바일 화면에서도 확인합니다.</td></tr>
</tbody>
</table>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>Preview 배포는 눈으로 보는 확인을 도와줄 뿐, 코드 자체의 품질이나 구조를 검토하는 코드 리뷰를 대신하지는 못합니다. 두 가지를 함께 활용할 때 "코드도 깔끔하고, 화면도 의도한 대로 동작한다"는 확신을 가지고 병합할 수 있습니다.</p>
</div>

---

## 4. 병합 전 마지막 점검

Preview 확인까지 마쳤다면, main으로 병합하기 전 마지막으로 아래 흐름을 되짚어보는 것이 좋습니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">✅ 병합해도 괜찮은 상태</div>
    코드 리뷰에서 지적된 사항이 반영되었고, Preview 화면에서 의도한 대로 동작하며, 관련 없는 다른 기능도 이상이 없는 상태입니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">⚠️ 병합을 보류해야 하는 상태</div>
    리뷰에서 요청한 수정이 아직 반영되지 않았거나, Preview 화면에서 예상치 못한 문제가 발견된 상태입니다.
  </div>
</div>

이렇게 코드 리뷰와 Preview 확인을 모두 거친 뒤에 병합하는 습관은, main 브랜치를 "언제나 안전한 상태"로 유지한다는 4-1에서 배운 원칙을 실제로 지켜내는 구체적인 방법이 됩니다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>Preview 배포는 <strong>PR의 코드를 별도 임시 주소에 자동으로 배포</strong>해 눈으로 확인할 수 있게 해준다.</li>
    <li>Preview 주소는 <strong>실제 서비스 주소와 분리</strong>되어 있어 안전하게 미리 확인할 수 있다.</li>
    <li>Preview 확인 시 <strong>의도한 변경, 기존 기능 유지, 반응형 화면</strong>을 점검한다.</li>
    <li>Preview는 <strong>코드 리뷰를 대신하지 않으며</strong>, 둘을 함께 거쳐야 안전하게 병합할 수 있다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 코드 리뷰만 통과하면 Preview 확인은 생략해도 된다?</div>
    <div class="wda-mistake-right">정답: 코드 리뷰는 <strong>코드 자체</strong>를, Preview는 <strong>실제 화면 동작</strong>을 확인하는 서로 다른 역할을 한다. 두 가지를 함께 거치는 것이 안전하다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Preview 배포 주소도 실제 서비스와 같은 주소다?</div>
    <div class="wda-mistake-right">정답: Preview는 <strong>실제 서비스 주소와 분리된 임시 주소</strong>에서 동작하므로, 문제가 있어도 실제 사용자에게 영향을 주지 않는다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · Preview 흐름</div>
    <div class="wda-formula-block-body"><code>PR 생성 → 자동 빌드 → 임시 배포</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 확인 관점</div>
    <div class="wda-formula-block-body"><code>의도한 변경 + 기존 기능 유지</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 안전한 병합</div>
    <div class="wda-formula-block-body"><code>코드 리뷰 + Preview 확인</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Preview 배포는 언제 자동으로 만들어지나요?</div>
    <div class="wda-flip-back">Pull Request를 올릴 때마다 그 브랜치의 코드를 기준으로 자동 생성됩니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Preview 배포 주소가 실제 서비스와 분리되어 있으면 좋은 점은?</div>
    <div class="wda-flip-back">PR의 코드에 문제가 있어도 실제 사용자에게 영향을 주지 않고 안전하게 확인할 수 있습니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">코드 리뷰만으로 확인하기 어려운 것은?</div>
    <div class="wda-flip-back">레이아웃 붕괴나 실제 클릭 동작 흐름처럼 화면을 직접 봐야 알 수 있는 부분입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">안전하게 병합하려면 무엇을 함께 거쳐야 하나요?</div>
    <div class="wda-flip-back">코드 리뷰와 Preview 화면 확인을 모두 거쳐야 합니다.</div>
  </div>
</div>
