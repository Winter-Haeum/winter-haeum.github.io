---
title: "2-3 Commit, push, pull 사용하기"
category: "frontend"
section: "github"
date: "2026-08-02"
status: "completed"
description: "git commit으로 기록한 변경 내역을 push로 GitHub에 올리고 pull로 최신 코드를 받아오는 기본 워크플로우를 정리합니다."
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
  • <strong>git commit으로 기록하기</strong> — 변경 내역을 스냅샷으로 저장하고 메시지로 설명합니다<br>
  • <strong>git push로 업로드하기</strong> — 로컬 커밋을 GitHub 원격 저장소로 전송해 공유합니다<br>
  • <strong>git pull로 가져오기</strong> — 원격 저장소의 최신 변경 사항을 로컬에 반영합니다<br>
  • <strong>기본 워크플로우 실습</strong> — pull → 작업 → commit → pull → push 순서를 몸에 익힙니다
</div>

---

## 1. git commit 다시 보기

[이전 문서](/dev-tools/github/3-2-2-connect-local-and-github)에서 로컬과 GitHub를 연결했다면, 이제 실제로 코드를 주고받을 차례입니다. 이번 문서는 commit으로 기록한 변경 내역을 push로 GitHub에 올리고, pull로 최신 코드를 받아오는 기본 흐름을 다룹니다.

commit은 작업 내역을 로컬 저장소에 기록하는 행위다. 특정 시점의 프로젝트 상태를 하나의 스냅샷으로 저장한다고 이해하면 된다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">① 상태 확인</div><div class="wda-fnode-dsc">git status</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">② 스테이징</div><div class="wda-fnode-dsc">git add</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">③ 커밋</div><div class="wda-fnode-dsc">git commit -m</div></div>
</div>

변경한 파일을 먼저 Staging Area에 올리는 것이 `git add`이고, Staging Area에 올라온 파일을 하나의 기록으로 남기는 것이 `git commit`이다. 이 과정에서 남기는 커밋 메시지는 무엇을 바꿨는지 설명하는 역할을 하며, 커밋은 이후 프로젝트 히스토리에 그대로 남는다.

**• 터미널: status→add→commit 기본 흐름**

```bash
git status
git add .
git commit -m "Add login form validation"
```

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>좋은 커밋 메시지는 협업에서 특히 중요하다. 무엇을 바꿨는지 명확히 쓰고, Add·Fix·Update처럼 현재형 동사로 시작하며, 제목은 50자 이내로 짧게 유지하는 습관을 들이면 좋다.</p>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>commit은 어디까지나 <strong>로컬 저장소에만</strong> 저장된다. 커밋을 아무리 많이 쌓아도 GitHub 저장소에는 아직 아무 변화가 없으며, 이 내용을 원격으로 보내려면 반드시 <code>push</code>가 필요하다.</p>
</div>

---

## 2. git push란 무엇인가

`git push`는 로컬에 쌓인 커밋을 GitHub 원격 저장소로 업로드하는 과정이다.

push가 필요한 이유는 명확하다. commit은 로컬에만 존재하므로, 팀원과 코드를 공유하려면 push가 있어야 하고, GitHub를 통한 백업 효과도 push를 해야 실제로 발생한다.

또한 push를 해두면 다른 컴퓨터에서도 동일한 작업 환경을 이어받을 수 있다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">push 전</div>
    커밋이 내 컴퓨터에만 존재합니다. 팀원은 이 코드를 아직 받을 수 없습니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">push 후</div>
    GitHub에도 동일한 커밋이 존재합니다. 팀원이 pull로 이 코드를 가져갈 수 있습니다.
  </div>
</div>

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">① 로컬 commit</div><div class="wda-fnode-dsc">커밋 생성</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">② git push 실행</div><div class="wda-fnode-dsc">원격으로 전송</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">③ GitHub 반영</div><div class="wda-fnode-dsc">저장소 업데이트 완료</div></div>
</div>

### git push 명령어

기본 문법은 다음과 같다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><code>git init</code>으로 처음 만든 로컬 저장소의 기본 브랜치 이름은 <code>main</code>이 아니라 <code>master</code>로 표시될 수 있다(3-1-3 참고). GitHub에서 만든 저장소의 기본 브랜치는 <code>main</code>이므로, 이름이 다르면 아래 명령으로 먼저 맞춰준다.</p>
</div>

**• 터미널: 로컬 브랜치 이름을 main으로 맞추기**

```bash
git branch -M main
```

**• 터미널: git push 기본 문법**

```bash
git push origin main
```

`origin`은 관례적으로 사용하는 원격 저장소 이름이고, `main`은 업로드할 브랜치다. 처음 push할 때는 `-u` 옵션을 붙여 브랜치를 연결해두면, 이후부터는 `git push`만 입력해도 자동으로 같은 브랜치에 업로드된다.

**• 터미널: -u 옵션으로 브랜치 연결하기**

```bash
git push -u origin main
```

push를 실행하면 터미널에는 `enumerating objects`, `counting objects`, `writing objects` 같은 진행 로그가 순서대로 출력된다.

---

## 3. git pull이란 무엇인가

`git pull`은 원격 저장소인 GitHub의 최신 코드를 로컬로 가져오는 명령어다.

pull이 필요한 이유도 push와 짝을 이룬다. 팀원이 push한 코드를 반영해야 하고, 다른 PC에서 수정한 내용을 동기화해야 하며, 무엇보다 충돌을 방지하기 위해 협업에서는 작업을 시작하기 전에 반드시 pull을 실행해야 한다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">pull 전</div>
    GitHub의 최신 상태와 내 로컬 상태가 서로 다릅니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">pull 후</div>
    내 로컬이 GitHub의 최신 상태와 동기화됩니다.
  </div>
</div>

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">① 새 커밋 존재</div><div class="wda-fnode-dsc">GitHub에 변경 사항 있음</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">② git pull 실행</div><div class="wda-fnode-dsc">변경 사항 다운로드</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">③ 로컬 반영</div><div class="wda-fnode-dsc">저장소 업데이트 완료</div></div>
</div>

### git pull 명령어

**• 터미널: git pull 기본 문법**

```bash
git pull origin main
```

브랜치를 생략한 간단한 버전도 자주 사용한다.

**• 터미널: 브랜치 생략한 git pull**

```bash
git pull
```

이 명령어는 내부적으로 fetch와 merge를 자동으로 합쳐 실행한 것과 같다. 충돌 없이 깔끔하게 업데이트가 끝나는 경우를 Fast-forward라고 부른다.

---

## 4. Commit → Push → Pull 기본 워크플로우

혼자 작업할 때와 팀과 협업할 때는 이 세 명령어를 조합하는 방식이 조금 다르다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">혼자 작업할 때</div>
    파일 수정 → <code>git add . && git commit -m</code> → <code>git push</code>를 반복합니다. 수정 → 커밋 → push 패턴을 계속 이어가며, 하루 작업이 끝날 때 push로 백업까지 마무리합니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">팀과 협업할 때</div>
    ① 작업 전 <code>pull</code>로 팀원 코드 받기 → ② 파일 수정 → ③ commit → ④ push 전 다시 <code>pull</code>로 최신 여부 확인(충돌 방지) → ⑤ push 순서로 진행합니다.
  </div>
</div>

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p><strong>황금 룰: pull → 작업 → commit → pull → push.</strong> 이 순서를 지키면 협업 중 발생하는 충돌을 가장 안정적으로 최소화할 수 있다. 특히 push 직전에 한 번 더 pull을 실행하는 습관이 충돌을 예방하는 핵심이다.</p>
</div>

---

## 5. 실습: push / pull 흐름 이해하기

### 혼자 실습하기 (로컬 → GitHub)

**• 터미널: 혼자 작업 시 커밋·push 실습**

```bash
echo "hello wda" >> README.md
git add README.md
git commit -m "Update README"
git push
```

push가 끝나면 GitHub 저장소 페이지에서 방금 반영된 변경 사항을 바로 확인할 수 있다.

### 팀 협업 시뮬레이션하기 (GitHub → 로컬)

GitHub 웹 화면에서 `README.md`를 열고 연필 아이콘을 눌러 내용을 수정한 뒤 커밋한다. 그다음 로컬 터미널로 돌아와 아래를 실행한다.

**• 터미널: 팀원이 수정한 내용 pull로 받기**

```bash
git pull
cat README.md
```

GitHub 웹에서 수정한 내용이 그대로 로컬에 반영된 것을 확인할 수 있다. 이 과정이 바로 팀원이 push한 코드를 내가 pull로 받아오는 상황을 그대로 재현한 것이다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><strong>commit</strong>은 로컬 저장소에만 기록되며, 원격에 반영하려면 반드시 <strong>push</strong>가 필요하다.</li>
    <li><strong>push</strong>는 로컬 커밋을 GitHub로 올리고, <strong>pull</strong>은 GitHub의 최신 상태를 로컬로 가져온다.</li>
    <li>협업의 황금 룰은 <strong>pull → 작업 → commit → pull → push</strong> 순서다.</li>
    <li>push 직전에 한 번 더 pull하면 <strong>충돌을 미리 방지</strong>할 수 있다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: commit만 하면 GitHub에도 자동으로 반영된다?</div>
    <div class="wda-mistake-right">정답: commit은 <strong>로컬 저장소에만</strong> 기록된다. GitHub에 올리려면 반드시 <code>push</code>를 실행해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 팀 작업에서는 수정하고 바로 push하면 된다?</div>
    <div class="wda-mistake-right">정답: 올바른 순서는 <strong>pull → 수정 → commit → pull → push</strong>다. push 전에 pull을 한 번 더 해야 충돌을 줄일 수 있다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 기록</div>
    <div class="wda-formula-block-body"><code>commit = 로컬 스냅샷</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 방향</div>
    <div class="wda-formula-block-body"><code>push = 로컬→원격 · pull = 원격→로컬</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 황금 룰</div>
    <div class="wda-formula-block-body"><code>pull → 작업 → commit → pull → push</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">git commit에 대한 올바른 설명은?</div>
    <div class="wda-flip-back">commit은 로컬 저장소에만 기록된다. 원격에 올리려면 push가 필요하다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">팀 프로젝트에서 올바른 Git 워크플로우 순서는?</div>
    <div class="wda-flip-back">pull → 수정 → commit → pull → push다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">첫 push 시 -u 옵션을 쓰는 이유는?</div>
    <div class="wda-flip-back">브랜치를 연결해두면 이후에는 git push만 입력해도 자동으로 같은 브랜치에 업로드된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">git pull은 내부적으로 어떤 동작의 조합인가?</div>
    <div class="wda-flip-back">fetch와 merge를 자동으로 합쳐 실행한 것과 같다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">push 전에 한 번 더 pull하는 이유는?</div>
    <div class="wda-flip-back">최신 상태를 미리 반영해 충돌 가능성을 줄이기 위해서다.</div>
  </div>
</div>
