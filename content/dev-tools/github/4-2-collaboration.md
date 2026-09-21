---
title: "4-2 협업하기"
category: "frontend"
section: "github"
date: "2026-08-03"
status: "completed"
description: "Pull Request로 변경 사항을 공유하고 코드 리뷰를 받는 과정, 그리고 협업 중 conflict가 발생하는 이유와 기본 대처법을 정리합니다."
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
  • <strong>Pull Request의 역할</strong> — 코드를 합치기 전에 거치는 검토 요청이라는 것을 이해합니다<br>
  • <strong>코드 리뷰 이해</strong> — 동료가 내 코드를 확인하고 의견을 주는 과정을 파악합니다<br>
  • <strong>conflict가 생기는 이유</strong> — 같은 부분을 다르게 고쳤을 때 무슨 일이 벌어지는지 이해합니다<br>
  • <strong>기본 대처 흐름 익히기</strong> — conflict를 마주쳤을 때 당황하지 않는 기본 자세를 갖춥니다
</div>

---

## 1. Pull Request란

4-1에서 feature branch로 작업을 나누는 이유를 배웠다면, 이 문서에서는 그 브랜치를 다시 main으로 합치는 과정에서 필요한 협업 절차를 다룹니다. Pull Request, 코드 리뷰, conflict라는 세 가지 개념이 이 문서의 핵심입니다.

**Pull Request(PR)**는 "내 브랜치에서 작업한 내용을 main(또는 다른 브랜치)에 합쳐달라"고 요청하는 절차입니다. 단순히 병합 버튼을 누르는 것이 아니라, 그 전에 변경 사항을 다른 사람에게 보여주고 확인받는 과정이라는 점이 핵심입니다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1. 작업</div><div class="wda-fnode-dsc">feature branch에서 기능 완성</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2. PR 생성</div><div class="wda-fnode-dsc">병합해달라는 요청 올리기</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3. 리뷰</div><div class="wda-fnode-dsc">동료가 코드 확인</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">4. 병합</div><div class="wda-fnode-dsc">문제없으면 main에 합치기</div></div>
</div>

**💡 사용 팁**

<div class="wda-callout wda-cb">
  <p>PR을 올리는 것은 단순히 코드를 제출하는 것을 넘어, "이렇게 만들었는데 괜찮을까요?"라고 팀에 묻는 과정이기도 합니다. 어떤 기능을 왜 이렇게 구현했는지 설명을 함께 남기면, 리뷰하는 사람이 맥락을 더 쉽게 이해할 수 있습니다.</p>
</div>

---

## 2. 코드 리뷰가 하는 일

**코드 리뷰(Code Review)**는 PR에 담긴 변경 사항을 다른 사람이 읽고 의견을 남기는 과정입니다.

**▶ 코드 리뷰에서 확인하는 항목**

<table class="wda-mtable">
<thead><tr><th>리뷰에서 확인하는 것</th><th>예시</th></tr></thead>
<tbody>
<tr><td>버그 가능성</td><td>이 조건문에서 빠뜨린 경우가 있지는 않은가</td></tr>
<tr><td>가독성</td><td>다른 사람이 봐도 이해하기 쉬운 코드인가</td></tr>
<tr><td>일관성</td><td>팀에서 정한 코드 스타일과 맞는가</td></tr>
</tbody>
</table>

코드 리뷰는 "누가 더 잘 짰는가"를 겨루는 자리가 아닙니다. 나 혼자서는 놓치기 쉬운 부분을 다른 시선으로 한 번 더 확인해서, 결과적으로 더 안정적인 코드를 만드는 것이 목적입니다.

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>리뷰를 남길 때는 "이건 틀렸어요" 같은 단정적인 표현보다, "이 부분은 이런 이유로 다르게 짜보면 어떨까요?"처럼 이유와 제안을 함께 남기는 것이 좋습니다. 반대로 리뷰를 받는 입장에서도, 지적을 개인적인 비판이 아니라 코드를 더 좋게 만들기 위한 의견으로 받아들이는 태도가 협업을 원활하게 만듭니다.</p>
</div>

---

## 3. Conflict는 왜 생길까

**Conflict(충돌)**는 같은 파일의 같은 부분을 서로 다른 브랜치에서 다르게 수정했을 때, Git이 어느 쪽 내용을 남겨야 할지 스스로 판단하지 못해서 발생합니다.

**• Conflict 표시 예시**

```
<<<<<<< HEAD
return "관리자";
=======
return "손님";
>>>>>>> feature/login
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Conflict가 생기는 상황</div>
    두 사람이 같은 함수의 같은 줄을 서로 다른 내용으로 고쳐서, 각자 커밋을 만든 뒤 하나의 브랜치로 합치려는 경우입니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Conflict가 생기지 않는 상황</div>
    서로 다른 파일을 고쳤거나, 같은 파일이라도 겹치지 않는 다른 줄을 고친 경우에는 Git이 알아서 두 변경 사항을 합쳐줍니다.
  </div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>conflict가 발생했다고 해서 누군가 잘못한 것이 아닙니다. 여러 사람이 같은 코드를 함께 다루다 보면 자연스럽게 겹치는 부분이 생길 수 있습니다. 중요한 것은 당황하지 않고, 어떤 코드를 남길지 팀과 상의해서 침착하게 정리하는 것입니다.</p>
</div>

---

## 4. Conflict를 마주쳤을 때

conflict가 발생하면 Git은 파일 안에 두 브랜치의 내용을 모두 표시해줍니다. 개발자는 이 중 어떤 내용을 남길지, 혹은 둘을 합쳐서 새로 작성할지 직접 결정한 뒤 저장하고 다시 커밋하면 됩니다.

**▶ Conflict 해결 단계**

<table class="wda-mtable">
<thead><tr><th>단계</th><th>설명</th></tr></thead>
<tbody>
<tr><td>1. 표시 확인</td><td><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code>, <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>로 둘러싸인 부분을 찾습니다.</td></tr>
<tr><td>2. 결정</td><td>어느 쪽 코드를 남길지, 혹은 둘을 합칠지 판단합니다.</td></tr>
<tr><td>3. 정리</td><td>표시 기호를 모두 지우고 최종 코드만 남깁니다.</td></tr>
<tr><td>4. 커밋</td><td>정리한 내용을 다시 커밋해서 병합을 완료합니다.</td></tr>
</tbody>
</table>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>Pull Request는 <strong>병합 전에 변경 사항을 검토받는 절차</strong>다.</li>
    <li>코드 리뷰는 <strong>다른 시선으로 코드를 한 번 더 확인</strong>해서 안정성을 높이는 과정이다.</li>
    <li>Conflict는 <strong>같은 부분을 서로 다르게 수정</strong>했을 때 발생한다.</li>
    <li>Conflict는 <strong>Git이 표시해준 부분을 직접 판단해서 정리</strong>하면 해결된다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 코드 리뷰는 실력을 평가받는 자리다?</div>
    <div class="wda-mistake-right">정답: 코드 리뷰의 목적은 <strong>혼자서는 놓치기 쉬운 부분을 함께 확인</strong>하는 것이지, 실력을 비교하거나 평가하는 자리가 아니다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: conflict가 발생하면 누군가 실수한 것이다?</div>
    <div class="wda-mistake-right">정답: conflict는 <strong>여러 사람이 같은 코드를 함께 다루는 과정에서 자연스럽게 생길 수 있는 상황</strong>이며, 잘못이 아니라 정리해야 할 일이다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · PR 흐름</div>
    <div class="wda-formula-block-body"><code>작업 → PR → 리뷰 → 병합</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · conflict 원인</div>
    <div class="wda-formula-block-body"><code>같은 줄 + 다른 수정 = conflict</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 해결</div>
    <div class="wda-formula-block-body"><code>확인 → 결정 → 정리 → 커밋</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Pull Request의 목적은 무엇인가요?</div>
    <div class="wda-flip-back">브랜치를 합치기 전에 변경 사항을 다른 사람에게 보여주고 검토받는 것입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">코드 리뷰는 무엇을 위한 과정인가요?</div>
    <div class="wda-flip-back">혼자서는 놓치기 쉬운 부분을 다른 시선으로 확인해 더 안정적인 코드를 만들기 위한 과정입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">conflict는 언제 발생하나요?</div>
    <div class="wda-flip-back">같은 파일의 같은 부분을 서로 다른 브랜치에서 다르게 수정했을 때 발생합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">conflict 표시 기호를 발견하면 어떻게 해야 하나요?</div>
    <div class="wda-flip-back">어느 쪽 코드를 남길지 판단해서 표시 기호를 지우고 정리한 뒤 다시 커밋합니다.</div>
  </div>
</div>
