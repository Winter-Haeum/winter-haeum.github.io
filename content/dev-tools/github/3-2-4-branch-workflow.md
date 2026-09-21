---
title: "2-4 branch로 작업 나누기"
category: "frontend"
section: "github"
date: "2026-08-02"
status: "completed"
description: "branch 개념과 git branch, git switch 명령어를 익히고, 브랜치 삭제와 merge까지 이어지는 기본 협업 흐름을 정리합니다."
---

<style>
.wda-callout{border-radius:10px;padding:12px 14px;margin:.8rem 0 1.1rem;border-left:3px solid;font-size:.9rem;line-height:1.75}
.wda-ci{background:rgba(139,92,246,.06);border-color:#8b5cf6}
.wda-cw{background:rgba(245,158,11,.07);border-color:#f59e0b}
.wda-cs{background:rgba(34,197,94,.05);border-color:#22c55e}
.wda-clabel{font-size:.7rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px;display:block}
.wda-ci .wda-clabel{color:#8b5cf6}
.wda-cw .wda-clabel{color:#f59e0b}
.wda-cs .wda-clabel{color:#22c55e}
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
  • <strong>branch 개념 이해</strong> — main branch와 feature branch의 차이를 비유로 이해합니다<br>
  • <strong>git branch 명령어 활용</strong> — branch 생성과 목록 확인을 직접 수행합니다<br>
  • <strong>checkout과 switch 구분</strong> — 레거시 명령어와 최신 전환 명령어의 차이를 이해합니다<br>
  • <strong>삭제와 merge 기초</strong> — 안전하게 branch를 삭제하고 main에 합치는 기본 흐름을 익힙니다
</div>

---

## 1. Branch란 무엇인가

[이전 문서](/dev-tools/github/3-2-3-commit-push-pull)에서 commit·push·pull로 GitHub와 코드를 주고받는 법을 배웠다면, 이번 문서는 여러 작업을 안전하게 나누는 branch 개념을 다룹니다.

branch를 만들고 전환하고 삭제하고 다시 합치는 과정까지, 협업의 기본 리듬을 익히는 것이 이 문서의 목표다.

Branch는 main 코드에 영향을 주지 않으면서 기능 개발이나 버그 수정을 진행할 수 있는 독립적인 작업 공간이다. branch 자체는 커밋이 쌓이는 별도의 타임라인이라서, 같은 프로젝트 안에서도 서로 다른 실험이나 기능을 동시에 안전하게 진행할 수 있다.

**💡 설명**

<div class="wda-callout wda-ci">
  <p>나무에 비유하면 이해하기 쉽다. <strong>main</strong>은 나무의 줄기이고, <strong>branch</strong>는 줄기에서 갈라져 나온 가지다. 가지에서 작업을 끝내면 다시 줄기(main)에 <strong>merge</strong>해 하나로 합친다.</p>
</div>

실무에서는 목적에 따라 branch 종류를 구분해서 사용한다.

**▶ 목적별 branch 종류**

<table class="wda-mtable">
<thead><tr><th>종류</th><th>역할</th></tr></thead>
<tbody>
<tr><td>main branch</td><td>항상 배포 가능한 안정된 버전을 유지합니다.</td></tr>
<tr><td>feature branch</td><td>새로운 기능을 개발할 때 사용합니다.</td></tr>
<tr><td>bugfix branch</td><td>버그를 수정할 때 사용합니다.</td></tr>
<tr><td>hotfix branch</td><td>운영 중 발견된 문제를 긴급하게 수정할 때 사용합니다.</td></tr>
</tbody>
</table>

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>팀에서는 브랜치 이름 규칙을 미리 정해두는 것이 좋다. 예를 들어 <code>feature/login-ui</code>, <code>bugfix/header-typo</code>처럼 <strong>종류/내용</strong> 형태로 통일하면 누가 봐도 브랜치의 목적을 바로 파악할 수 있다.</p>
</div>

---

## 2. Branch 생성하기

새 branch는 `git branch` 명령어로 만든다.

**• 터미널: 새 branch 생성하기**

```bash
git branch feature-login
```

현재 위치한 branch(main 등)를 기준으로 새 branch가 만들어진다. 만든 branch 목록과 현재 위치는 아래 명령어로 확인한다.

**• 터미널: branch 목록과 현재 위치 확인하기**

```bash
git branch
```

출력 결과에서 `*` 표시가 붙은 항목이 현재 위치한 branch다.

브랜치 이름을 지을 때는 목적이 드러나도록 짓는 것이 중요하다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">좋은 이름</div>
    <code>feature/login-page</code>, <code>bugfix/header-typo</code>, <code>hotfix/security-patch</code>처럼 종류와 내용이 함께 드러납니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">피해야 할 이름</div>
    <code>test</code>, <code>내브랜치</code>처럼 어떤 작업을 위한 branch인지 알 수 없는 이름입니다.
  </div>
</div>

---

## 3. Branch 전환하기

branch를 전환하는 명령어는 두 가지가 있는데, 최근에는 용도가 명확한 `git switch`를 사용하는 것이 권장된다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">git checkout (레거시)</div>
    기존부터 사용되던 branch 전환 명령입니다. 파일 복원 등 다른 기능까지 함께 섞여 있어 상황에 따라 혼란을 줄 수 있습니다. 앞으로는 사용을 권장하지 않습니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">git switch (최신, 권장)</div>
    Git 2.23부터 도입된, branch 전환 전용 명령입니다. 기능이 명확하게 분리되어 있어 더 안전하고 직관적입니다. 사용이 권장됩니다.
  </div>
</div>

branch를 새로 만들면서 바로 이동하고 싶을 때도 두 방식 모두 사용할 수 있다.

**• 터미널: branch 생성과 동시에 전환하기**

```bash
# 레거시 방식
git checkout -b feature-new

# 최신 권장 방식
git switch -c feature-new
```

---

## 4. Branch에서 작업하기

branch를 전환하면 작업 디렉토리의 파일 내용 전체가 그 branch 기준으로 바뀐다. 각 branch는 서로 다른 커밋 히스토리를 가지기 때문이다.

**• 터미널: feature branch에서 커밋하기**

```bash
git switch feature-login
# login.html 파일 생성 및 수정
git add login.html
git commit -m "Add login page"
```

이렇게 `feature-login` branch에서 커밋한 `login.html`은 이 branch에만 존재한다. main에는 영향을 주지 않는다.

**• 터미널: main branch로 돌아가기**

```bash
git switch main
ls
```

main으로 돌아가면 `login.html`이 화면에서 사라진 것처럼 보인다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>이때 파일이 <strong>삭제된 것이 아니다.</strong> 단지 main branch에는 해당 파일이 아직 없는 것뿐이다. branch마다 존재하는 파일 구조가 다를 수 있다는 점을 기억해두면, 파일이 갑자기 사라진 것처럼 보여도 당황하지 않을 수 있다.</p>
</div>

---

## 5. Branch 목록 확인하기

**▶ branch 목록 확인 명령어**

<table class="wda-mtable">
<thead><tr><th>명령어</th><th>설명</th></tr></thead>
<tbody>
<tr><td><code>git branch</code></td><td>로컬에 있는 branch만 표시합니다. <code>*</code>가 현재 branch를 나타냅니다.</td></tr>
<tr><td><code>git branch -r</code></td><td>원격(remote) branch만 표시합니다.</td></tr>
<tr><td><code>git branch -a</code></td><td>로컬과 원격 branch를 모두 표시합니다. <code>remotes/origin/</code>으로 시작하는 항목이 원격 branch입니다.</td></tr>
<tr><td><code>git branch -v</code></td><td>각 branch의 최신 커밋 정보까지 함께 표시합니다.</td></tr>
</tbody>
</table>

---

## 6. Branch 삭제하기

branch를 삭제할 때는 안전한 방식과 강제 방식이 나뉜다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">git branch -d (일반 삭제)</div>
    merge가 끝난 branch만 삭제할 수 있는 안전장치가 있습니다. merge되지 않은 branch를 삭제하려 하면 에러가 발생해 작업 내용을 보호합니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">git branch -D (강제 삭제)</div>
    merge 여부와 상관없이 강제로 삭제합니다. 경고 없이 작업 내용이 완전히 사라질 수 있으므로, 정말 확실할 때만 사용해야 합니다.
  </div>
</div>

<div class="wda-check-note">
  <ul>
    <li>현재 위치한 branch는 삭제할 수 없다. 삭제하려면 먼저 다른 branch로 이동해야 한다.</li>
    <li><code>-d</code> 옵션은 merge가 완료된 branch에서만 정상적으로 동작한다.</li>
    <li><code>-D</code> 옵션은 merge 여부와 무관하게 강제로 삭제된다.</li>
  </ul>
</div>

---

## 7. Merge란 무엇인가

merge는 branch의 변경 사항을 main에 통합하는 과정이다. 새 기능 개발이 끝나면 feature branch를 main으로 합쳐 배포를 준비한다.

merge는 단순히 파일 하나를 옮기는 것이 아니라, branch 전체의 커밋 히스토리를 main에 통째로 통합하는 작업이다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">① main 전환</div><div class="wda-fnode-dsc">git switch main</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">② merge 실행</div><div class="wda-fnode-dsc">git merge feature-login</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">③ Fast-forward</div><div class="wda-fnode-dsc">충돌 없이 통합 완료</div></div>
</div>

**• 터미널: feature branch를 main에 merge하기**

```bash
git switch main
git merge feature-login
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">merge 전</div>
    main과 feature branch가 서로 독립적으로 갈라져 있는 상태입니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">merge 후</div>
    feature branch의 커밋들이 main에 통합된 상태입니다.
  </div>
</div>

---

## 8. 왜 main에 바로 작업하지 않을까

협업에서는 어떤 변경도 main branch에서 직접 진행하지 않는 것이 기본 원칙이다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>main은 언제나 배포 가능한 안정된 상태를 유지해야 하는 branch다. 여기에 바로 작업하면 <strong>실수 하나가 곧바로 배포 버전에 영향</strong>을 줄 수 있고, 여러 사람이 동시에 손대면 <strong>충돌이 잦아지며</strong>, 코드 리뷰(Pull Request) 과정을 거치지 않고 변경이 반영되어 <strong>검증 없는 코드</strong>가 그대로 쌓일 위험도 커진다. feature branch에서 작업하고 리뷰를 거쳐 merge하는 흐름을 지켜야 이런 문제를 예방할 수 있다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><strong>branch</strong>는 main에 영향 없이 작업할 수 있는 독립적인 공간이다.</li>
    <li>branch 전환은 <strong>git switch</strong>(최신 권장), branch 생성+이동은 <strong>git switch -c</strong>로 한다.</li>
    <li>안전한 삭제는 <strong>git branch -d</strong>(merge 필요), 강제 삭제는 <strong>git branch -D</strong>(merge 여부 무관)다.</li>
    <li><strong>merge</strong>는 feature branch의 커밋 전체를 main에 통합하는 과정이다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: branch를 전환하면 다른 branch의 파일이 삭제된다?</div>
    <div class="wda-mistake-right">정답: 삭제되는 것이 아니라, <strong>그 branch에 해당 파일이 없을 뿐</strong>이다. 파일 구조는 branch마다 다를 수 있다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: git checkout과 git switch는 완전히 같은 명령어라 아무거나 써도 된다?</div>
    <div class="wda-mistake-right">정답: <strong>git switch</strong>는 Git 2.23부터 도입된 branch 전환 전용 명령이라 더 명확하고 안전하다. checkout은 여러 기능이 섞여 있어 앞으로는 권장하지 않는다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 비유</div>
    <div class="wda-formula-block-body"><code>main = 줄기 · branch = 가지</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 전환</div>
    <div class="wda-formula-block-body"><code>git switch = 최신 권장 전환 명령</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 삭제</div>
    <div class="wda-formula-block-body"><code>-d = 안전 삭제 · -D = 강제 삭제</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">branch에 대한 올바른 설명은?</div>
    <div class="wda-flip-back">branch는 main에 영향을 주지 않는 독립적인 작업 공간이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Git 2.23 이후 권장되는 branch 전환 명령어는?</div>
    <div class="wda-flip-back">git switch다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">git branch -d와 -D의 차이는?</div>
    <div class="wda-flip-back">-d는 merge된 branch만 삭제할 수 있고, -D는 merge 여부와 무관하게 강제로 삭제한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">협업 시 main에 바로 작업하면 안 되는 이유는?</div>
    <div class="wda-flip-back">안정성이 깨지고 충돌이 잦아지며, 리뷰 없이 코드가 반영되는 위험이 커지기 때문이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">merge는 정확히 무엇을 하는 과정인가?</div>
    <div class="wda-flip-back">feature branch의 커밋 히스토리 전체를 main에 통합하는 과정이다.</div>
  </div>
</div>
