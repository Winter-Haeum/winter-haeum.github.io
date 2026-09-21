---
title: "4-1 브랜치 전략 알아보기"
category: "frontend"
section: "github"
date: "2026-08-03"
status: "completed"
description: "main 브랜치에 바로 작업하지 않는 이유와 feature branch 개념을 중심으로, 협업을 위한 기본적인 브랜치 전략을 정리합니다."
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
  • <strong>main 직접 작업의 위험성</strong> — 왜 main에 바로 코드를 올리지 않는지 이해합니다<br>
  • <strong>feature branch 개념</strong> — 기능 단위로 브랜치를 나눠 작업하는 방식을 파악합니다<br>
  • <strong>브랜치 전략 감 잡기</strong> — 팀 상황에 따라 전략이 달라질 수 있음을 이해합니다<br>
  • <strong>기본 작업 흐름 정리</strong> — 브랜치 생성부터 병합까지의 순서를 익힙니다
</div>

---

## 1. main에 바로 작업하면 안 되는 이유

Git & GitHub 카테고리의 심화 섹션인 "GitHub 중급"의 첫 문서로, 여러 명이 함께 작업할 때 브랜치를 어떻게 나눠야 하는지를 다룹니다.

Git 기본 섹션에서 branch의 생성·전환 명령어는 이미 다뤘으므로, 여기서는 "왜 이렇게 브랜치를 나눠 쓰는가"라는 협업 관점에 집중합니다.

혼자 작업하는 짧은 프로젝트라면 main 브랜치 하나만 써도 크게 문제가 없습니다. 하지만 여러 명이 함께 작업하거나, 실제 사용자가 쓰는 서비스라면 이야기가 달라집니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">동시 작업 충돌</div><div class="wda-fcard-dsc">여러 명이 동시에 main을 수정하면 서로의 변경 사항이 뒤엉키기 쉽습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">미완성 코드 노출</div><div class="wda-fcard-dsc">작업 중인 코드가 main에 바로 올라가면 서비스가 갑자기 망가질 수 있습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">검토 기회 상실</div><div class="wda-fcard-dsc">아무도 코드를 확인하지 못한 채 그대로 반영되어 버립니다.</div></div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>많은 팀에서 main 브랜치는 "지금 당장 배포해도 문제없는 상태"를 유지하는 것을 원칙으로 삼습니다. 작업 중인 코드를 main에 바로 올리면 이 원칙이 깨지기 때문에, 새로운 작업은 별도의 브랜치에서 진행하고 준비가 끝난 뒤에만 main으로 합칩니다.</p>
</div>

---

## 2. feature branch — 기능 단위로 나누기

**feature branch**는 기능 하나를 개발할 때마다 main에서 새 브랜치를 따로 만들어 작업하는 방식입니다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1. 분기</div><div class="wda-fnode-dsc">main에서 새 브랜치 생성</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2. 작업</div><div class="wda-fnode-dsc">그 브랜치에서만 기능 개발</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3. 병합</div><div class="wda-fnode-dsc">완성되면 main으로 합치기</div></div>
</div>

**• 터미널: feature branch 분기하고 커밋하기**

```bash
git switch main
git switch -c feature/login   # main에서 분기해 새 브랜치 생성
# ... 로그인 기능 작업 ...
git add .
git commit -m "feat: 로그인 기능 구현"
```

**▶ 브랜치 이름 예시와 의미**

<table class="wda-mtable">
<thead><tr><th>브랜치 이름 예시</th><th>의미</th></tr></thead>
<tbody>
<tr><td>feature/login</td><td>로그인이라는 새 기능을 개발하는 브랜치</td></tr>
<tr><td>fix/header-bug</td><td>헤더 관련 버그를 고치는 브랜치</td></tr>
</tbody>
</table>

이렇게 나누면 로그인 기능이 아직 완성되지 않았더라도, main 브랜치는 계속 안정된 상태를 유지할 수 있습니다. 여러 명이 각자 다른 feature branch에서 동시에 작업해도 서로의 작업을 방해하지 않습니다.

---

## 3. 브랜치 전략은 상황에 따라 다르다

feature branch라는 큰 원칙은 같지만, 실제로 브랜치를 얼마나 세분화하고 어떤 규칙으로 합치는지는 팀과 프로젝트 규모에 따라 달라집니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">단순한 흐름</div>
    소규모 팀이나 빠르게 배포하는 서비스에서는 main과 feature branch만 두고, 완성되는 대로 바로 main에 합치는 단순한 흐름을 선호하는 경우가 많습니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">단계가 많은 흐름</div>
    배포 주기가 정해져 있고 검증 과정이 중요한 프로젝트에서는 개발용 브랜치와 배포용 브랜치를 따로 두는 등, 더 많은 단계를 거치는 흐름을 쓰기도 합니다.
  </div>
</div>

**🔎 참고**

<div class="wda-callout wda-cb">
  <p>어떤 브랜치 전략이 "정답"이라기보다는, 팀의 규모·배포 주기·프로젝트 성격에 맞는 전략을 고르는 것이 중요합니다. 입문 단계에서는 "main은 항상 안전하게 유지하고, 새 작업은 feature branch에서 시작한다"는 큰 원칙만 확실히 익혀두면 충분합니다.</p>
</div>

---

## 4. 작업이 끝난 브랜치는 정리한다

feature branch의 작업 내용이 main에 합쳐지고 나면, 그 브랜치는 더 이상 필요하지 않습니다. 그대로 두면 브랜치 목록만 계속 늘어나므로, 병합이 끝난 브랜치는 정리하는 것이 좋습니다.

**• 터미널: 병합 완료된 브랜치 삭제하기**

```bash
git branch -d feature/login   # 로컬 브랜치 삭제
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>브랜치 삭제는 되돌리기 번거로운 작업입니다. 병합이 실제로 완료됐는지 확인하지 않은 채 브랜치를 지우면 작업 내용을 잃어버릴 수 있으므로, 항상 병합 상태를 먼저 확인한 뒤 삭제하는 습관을 들이는 것이 안전합니다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>main 브랜치는 <strong>항상 안전하고 배포 가능한 상태</strong>를 유지하는 것이 원칙이다.</li>
    <li>새로운 기능은 <strong>main에서 분기한 feature branch</strong>에서 작업한다.</li>
    <li>브랜치 전략은 <strong>팀과 프로젝트 성격에 따라 달라질 수 있다</strong>.</li>
    <li>main에 병합된 브랜치는 <strong>확인 후 정리</strong>하는 것이 좋다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 브랜치를 나누는 이유는 단순히 파일을 안전하게 백업하기 위해서다?</div>
    <div class="wda-mistake-right">정답: feature branch의 핵심 목적은 <strong>미완성 코드가 main에 영향을 주지 않도록 격리</strong>하고, 여러 명이 동시에 작업해도 충돌을 줄이는 것이다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 모든 팀이 똑같은 브랜치 전략을 따라야 한다?</div>
    <div class="wda-mistake-right">정답: <strong>팀 규모와 배포 주기에 따라</strong> 알맞은 전략이 달라질 수 있으며, "main을 안전하게 유지한다"는 큰 원칙만 지키면 세부 방식은 유연하게 선택할 수 있다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · main 원칙</div>
    <div class="wda-formula-block-body"><code>main = 항상 배포 가능한 상태</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 작업 흐름</div>
    <div class="wda-formula-block-body"><code>분기 → 작업 → 병합</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 정리</div>
    <div class="wda-formula-block-body"><code>병합 확인 후 브랜치 삭제</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">main 브랜치에 바로 작업하지 않는 가장 큰 이유는?</div>
    <div class="wda-flip-back">main이 항상 배포 가능한 안전한 상태를 유지해야 하기 때문입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">feature branch는 언제 만드나요?</div>
    <div class="wda-flip-back">새로운 기능을 개발하기 시작할 때 main에서 분기해 만듭니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">브랜치 전략은 모든 팀이 동일해야 하나요?</div>
    <div class="wda-flip-back">아니요. 팀 규모와 배포 주기에 따라 알맞은 전략이 달라질 수 있습니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">병합이 끝난 브랜치는 언제 삭제해야 하나요?</div>
    <div class="wda-flip-back">병합이 실제로 완료됐는지 확인한 뒤에 삭제하는 것이 안전합니다.</div>
  </div>
</div>
