---
title: "1-2 Git의 구조 이해하기"
category: "frontend"
section: "git"
date: "2026-08-02"
status: "completed"
description: "Working Directory, Staging Area, Repository 3영역과 git add·commit으로 이어지는 흐름, Git의 스냅샷 저장 방식을 정리한다."
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
  • <strong>3가지 영역 이해</strong> — Working Directory, Staging Area, Repository가 각각 어떤 역할을 하는지 설명할 수 있다.<br>
  • <strong>파일 이동 흐름 파악</strong> — <code>git add</code>와 <code>git commit</code>이 파일을 어느 영역에서 어느 영역으로 옮기는지 그릴 수 있다.<br>
  • <strong>스냅샷 방식 이해</strong> — Git이 왜 다른 방식보다 빠르고 안전하게 이력을 저장하는지 설명할 수 있다.<br>
  • <strong>실습 환경 준비</strong> — Git Bash(또는 터미널)를 설치해 다음 문서의 실습을 준비할 수 있다.
</div>

---

## 1. Git이 관리하는 3가지 영역

[이전 문서](/dev-tools/git/3-1-1-why-git)에서 Git이 왜 필요한지를 봤다면, 이 문서는 Git 내부가 실제로 어떻게 구성돼 있는지를 다룬다.

Git이 파일을 저장하기까지 거치는 3가지 영역과, 그 영역 사이를 파일이 이동하는 흐름을 이해하는 데 집중한다. 실제 명령어를 손으로 입력하는 실습은 다음 문서인 3-1-3에서 이어간다.

Git으로 관리되는 프로젝트 폴더는 내부적으로 세 개의 영역으로 나뉜다. 파일 하나가 실제로 "버전"으로 저장되기까지 이 세 영역을 순서대로 거친다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">Working Directory</div><div class="wda-fcard-dsc">지금 내가 작업하고 있는 폴더 자체다. 파일을 만들고, 수정하고, 삭제하는 실제 작업 공간이다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Staging Area</div><div class="wda-fcard-dsc">커밋할 파일을 미리 골라 담아두는 임시 공간이다. <code>git add</code>를 실행하면 이 영역에 파일이 올라간다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Repository</div><div class="wda-fcard-dsc">버전이 실제로, 영구적으로 저장되는 곳이다. 프로젝트 폴더 안의 <code>.git/</code> 폴더가 바로 이 영역이다.</div></div>
</div>

파일은 항상 아래 순서로 이동한다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">Working Directory</div><div class="wda-fnode-dsc">작업 중인 파일</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">git add</div><div class="wda-fnode-dsc">커밋 대상 선택</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">Staging Area</div><div class="wda-fnode-dsc">커밋 준비 완료</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">git commit</div><div class="wda-fnode-dsc">버전으로 확정</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">Repository</div><div class="wda-fnode-dsc">영구 저장</div></div>
</div>

---

## 2. Working Directory — 지금 작업 중인 폴더

Working Directory는 특별할 것 없는 평범한 폴더다. 파일을 만들고 지우고 고치는, 우리 눈에 보이는 그대로의 작업 공간이다.

이 폴더가 Git으로 관리되는 순간, 폴더 안에는 <code>.git</code>이라는 숨김 폴더가 함께 생긴다. 이 <code>.git</code> 폴더의 존재 여부가 "이 폴더가 Git으로 관리되는 프로젝트인가"를 가르는 기준이다.

안에는 아래와 같은 정보가 들어 있다.

**▶ .git 폴더에 담기는 정보**

<table class="wda-mtable">
<thead><tr><th>.git 폴더 안에 있는 것</th><th>내용</th></tr></thead>
<tbody>
<tr><td>커밋 히스토리</td><td>지금까지 저장된 모든 버전 기록</td></tr>
<tr><td>브랜치 정보</td><td>현재 존재하는 브랜치와 각 브랜치가 가리키는 위치</td></tr>
<tr><td>Staging Area 정보</td><td>지금 커밋을 기다리고 있는 파일 목록</td></tr>
<tr><td>설정 파일</td><td>사용자 정보, 원격 저장소 주소 등 프로젝트 설정</td></tr>
</tbody>
</table>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><code>.git</code> 폴더를 삭제하면 그 프로젝트의 <strong>모든 버전 기록이 영구히 사라진다</strong>. 이 폴더는 절대 직접 수정하거나 삭제하지 말고, 반드시 Git 명령어를 통해서만 다뤄야 한다.</p>
</div>

---

## 3. Staging Area — 커밋을 준비하는 공간

Working Directory에서 파일을 아무리 수정해도, 그 변경 사항이 곧바로 저장되는 것은 아니다. 저장(커밋)하기 전에 반드시 "이 파일들을 저장할 거야"라고 표시하는 과정이 필요한데, 그 표시가 쌓이는 곳이 Staging Area다.

**💡 설명**

<div class="wda-callout wda-ci">
  <p>사진 촬영에 비유하면 이해가 쉽다. <strong>Working Directory</strong>는 사람들이 자유롭게 움직이며 놀고 있는 상태고, <strong>Staging Area</strong>는 사진을 찍기 위해 포즈를 잡는 순간이며, <strong>Repository</strong>는 셔터를 눌러 그 순간을 사진 한 장으로 영구히 남기는 것이다.</p>
</div>

Staging Area가 별도 영역으로 존재하는 이유는 단순히 절차를 하나 늘리기 위해서가 아니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">선택적 커밋</div><div class="wda-fcard-dsc">파일 10개를 수정했어도, 그중 원하는 5개만 골라 먼저 저장할 수 있다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">논리적 단위로 커밋</div><div class="wda-fcard-dsc">서로 관련된 변경끼리 기능 단위로 묶어 커밋을 나눌 수 있다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">커밋 전 검토</div><div class="wda-fcard-dsc">실수로 불필요한 파일까지 함께 저장되는 것을 막는 마지막 확인 단계가 된다.</div></div>
</div>

예를 들어 파일 4개를 수정했더라도, 그중 2개만 골라 Staging Area에 올리고 커밋하면 Repository에는 그 2개의 변경 사항만 새 버전으로 저장된다.

나머지 2개는 여전히 Working Directory에 수정된 채로 남아 있는다.

---

## 4. Repository — 버전이 영구히 저장되는 곳

Staging Area에 담아둔 내용을 <code>git commit</code>으로 확정하면, 그 순간의 상태가 Repository에 하나의 버전으로 영구히 남는다. 앞선 비유를 이어가면 Repository는 찍은 사진들을 모아두는 앨범에 해당한다.

Repository의 실체는 프로젝트 폴더 안의 <code>.git/</code> 폴더다. 그 안에서도 핵심 역할을 하는 하위 폴더는 다음 두 가지다.

**▶ .git 핵심 하위 폴더**

<table class="wda-mtable">
<thead><tr><th>하위 폴더</th><th>역할</th></tr></thead>
<tbody>
<tr><td><code>objects/</code></td><td>커밋마다 저장된 실제 데이터(스냅샷)가 들어 있다.</td></tr>
<tr><td><code>refs/</code></td><td>브랜치가 어느 커밋을 가리키고 있는지에 대한 정보가 들어 있다.</td></tr>
</tbody>
</table>

Repository에는 결과적으로 아래 정보들이 함께 쌓인다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">커밋 히스토리</div><div class="wda-fcard-dsc">지금까지 만들어진 모든 버전의 순서와 기록</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">파일의 모든 버전</div><div class="wda-fcard-dsc">각 커밋 시점의 파일 상태 스냅샷</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">브랜치 정보</div><div class="wda-fcard-dsc">작업 갈래마다의 진행 상태</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">태그 · 설정</div><div class="wda-fcard-dsc">특정 커밋에 붙인 이름표와 프로젝트 설정값</div></div>
</div>

---

## 5. 핵심 흐름: git add → git commit

지금까지 본 3영역 구조에서 실제로 손을 대는 명령어는 두 개뿐이다. 이 두 명령어의 역할을 정확히 구분하는 것이 Git을 이해하는 핵심이다.

**▶ git add와 git commit의 역할**

<table class="wda-mtable">
<thead><tr><th>명령어</th><th>역할</th><th>예시</th></tr></thead>
<tbody>
<tr><td><code>git add</code></td><td>Working Directory의 변경 사항을 Staging Area로 옮긴다.</td><td><code>git add index.html</code></td></tr>
<tr><td><code>git commit</code></td><td>Staging Area의 내용을 Repository에 하나의 버전으로 영구 저장한다.</td><td><code>git commit -m "로그인 기능 추가"</code></td></tr>
</tbody>
</table>

**• 터미널: git add로 변경 사항 올리기**

```bash
git add index.html
git add style.css script.js
git add .
```

<code>git add</code>는 파일 하나만 지정할 수도, 여러 파일을 한 번에 지정할 수도, <code>.</code>으로 변경된 파일 전체를 한 번에 올릴 수도 있다. 커밋 전까지는 몇 번을 다시 실행해도 문제가 없으므로, 준비 단계로 편하게 사용하면 된다.

**• 터미널: git commit으로 버전 확정하기**

```bash
git commit -m "로그인 기능 추가"
```

<code>git commit</code>이 실행되는 순간 Staging Area에 있던 내용이 하나의 버전으로 확정되어 Repository에 영구히 저장된다. 이때 커밋 메시지는 선택이 아니라 필수다.

---

## 6. Git의 스냅샷 방식 — 왜 빠르고 안전한가

Git 이전에 널리 쓰이던 SVN 같은 도구는 변경된 부분(차이, diff)만 저장하는 방식을 썼다. 반면 Git은 커밋할 때마다 그 시점의 전체 상태를 사진처럼 통째로 저장하는 스냅샷 방식을 쓴다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">SVN 방식 — Diff 저장</div>
    변경된 줄 단위의 차이만 저장한다.<br><br>
    <strong>단점</strong> — 과거 버전을 복원하려면 여러 버전의 diff를 순서대로 조합해야 하고, 중간 데이터 하나가 손상되면 그 이후 복구가 불가능해질 수 있다. 버전이 쌓일수록 복원 속도도 느려진다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Git 방식 — Snapshot 저장</div>
    커밋마다 전체 상태를 통째로 저장하되, 바뀌지 않은 파일은 이전 스냅샷을 그대로 참조해 중복 저장을 피한다.<br><br>
    <strong>장점</strong> — 과거 버전으로 즉시 이동할 수 있고, 중간 데이터가 망가져도 다른 커밋에는 영향을 주지 않아 안전하다. 브랜치 생성도 포인터 하나만 옮기면 되므로 매우 가볍다.
  </div>
</div>

---

## 7. Git Bash 설치하기 (Windows 기준)

다음 문서(3-1-3)부터는 실제로 명령어를 입력하는 실습이 이어진다. Windows 환경이라면 실습 전에 Git Bash를 미리 설치해둔다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1. 공식 사이트 접속</div><div class="wda-fnode-dsc">git-scm.com/download/win</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2. 설치 파일 실행</div><div class="wda-fnode-dsc">기본값 그대로 Next</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3. Git Bash 실행</div><div class="wda-fnode-dsc">시작 메뉴에서 검색</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">4. 설치 확인</div><div class="wda-fnode-dsc">버전 번호 확인</div></div>
</div>

**• 터미널: Git 설치 확인**

```bash
git --version
```

<code>git --version</code> 실행 시 버전 번호가 출력되면 설치가 정상적으로 완료된 것이다. macOS나 Linux는 대부분 터미널에 Git이 기본 설치돼 있거나, 별도 설치 없이 바로 사용할 수 있다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>Git의 3영역은 <strong>Working Directory → Staging Area → Repository</strong> 순서로 이어진다.</li>
    <li><strong>git add</strong>는 Staging Area로, <strong>git commit</strong>은 Repository로 파일을 옮긴다.</li>
    <li><strong>.git</strong> 폴더가 곧 Repository이며, 삭제하면 모든 이력이 사라진다.</li>
    <li>Git은 커밋마다 <strong>전체 상태를 스냅샷</strong>으로 저장해 빠르고 안전하다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: git add만 하면 파일이 저장된다?</div>
    <div class="wda-mistake-right">정답: <code>git add</code>는 Staging Area로 <strong>옮기는 것</strong>일 뿐이다. Repository에 영구히 저장되려면 <code>git commit</code>까지 실행해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Git은 매번 파일 전체를 새로 통째로 복사해서 저장하니 SVN보다 용량이 훨씬 크다?</div>
    <div class="wda-mistake-right">정답: 스냅샷 방식이지만 <strong>바뀌지 않은 파일은 이전 스냅샷을 그대로 참조</strong>하므로 실제 저장 공간은 효율적으로 관리된다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 3영역</div>
    <div class="wda-formula-block-body"><code>Working Directory → Staging Area → Repository</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 이동 명령어</div>
    <div class="wda-formula-block-body"><code>git add = 스테이징 · git commit = 영구 저장</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 저장 방식</div>
    <div class="wda-formula-block-body"><code>스냅샷 = 매 커밋마다 전체 상태 저장</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Git의 3가지 영역이 아닌 것은? (보기: Working Directory, Staging Area, Repository, Cloud Storage)</div>
    <div class="wda-flip-back">Cloud Storage. 이것은 원격 저장소 개념이며 Git 내부의 3가지 영역에는 포함되지 않는다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">git add 명령어의 역할은?</div>
    <div class="wda-flip-back">Working Directory의 변경 사항을 Staging Area로 추가하는 것이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">.git 폴더를 삭제하면 어떻게 되는가?</div>
    <div class="wda-flip-back">그 프로젝트의 모든 커밋 히스토리와 버전 기록이 복구 불가능하게 사라진다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Staging Area가 필요한 이유 중 하나는?</div>
    <div class="wda-flip-back">수정한 파일 전부가 아니라 원하는 파일만 골라 선택적으로 커밋할 수 있기 때문이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Git의 스냅샷 방식이 SVN의 diff 방식보다 안전한 이유는?</div>
    <div class="wda-flip-back">각 커밋이 독립된 전체 상태이므로, 중간 커밋 하나가 손상돼도 다른 커밋에는 영향을 주지 않기 때문이다.</div>
  </div>
</div>
