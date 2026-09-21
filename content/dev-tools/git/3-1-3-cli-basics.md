---
title: "1-3 CLI 명령어 기본 익히기"
category: "frontend"
section: "git"
date: "2026-08-02"
status: "completed"
description: "pwd·ls·cd·mkdir·touch 같은 기본 CLI 명령어부터 git init·add·commit·status·log·diff까지 실습으로 익힌다."
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
  • <strong>기본 CLI 명령어 사용</strong> — pwd, ls, cd, mkdir, touch, cat 같은 명령어로 파일과 폴더를 직접 다룰 수 있다.<br>
  • <strong>Git 프로젝트 시작</strong> — git init으로 일반 폴더를 Git이 관리하는 프로젝트로 바꿀 수 있다.<br>
  • <strong>파일 버전 관리 실행</strong> — git add, git commit으로 Working Directory부터 Repository까지 직접 옮겨볼 수 있다.<br>
  • <strong>변경 사항 확인</strong> — git status, git log, git diff로 현재 상태와 히스토리를 조회할 수 있다.
</div>

---

## 1. CLI란 무엇인가

[이전 문서](/dev-tools/git/3-1-2-git-structure)에서 Working Directory, Staging Area, Repository라는 3영역의 개념을 배웠다면, 이 문서에서는 실제로 터미널을 열어 그 흐름을 손으로 직접 실행해본다.

먼저 CLI 자체에 익숙해지는 기본 명령어를 연습한 다음, git init부터 git diff까지 실전에서 가장 많이 쓰는 명령어를 순서대로 실습한다.

CLI(Command Line Interface)는 마우스로 아이콘을 클릭하는 대신, 텍스트로 된 명령어를 직접 입력해 컴퓨터를 조작하는 방식이다. 우리가 평소 쓰는 GUI(Graphical User Interface)와 비교하면 차이가 뚜렷하다.

**▶ GUI와 CLI 비교**

<table class="wda-mtable">
<thead><tr><th>구분</th><th>GUI</th><th>CLI</th></tr></thead>
<tbody>
<tr><td>사용 방식</td><td>마우스로 아이콘·버튼 클릭</td><td>키보드로 명령어 입력</td></tr>
<tr><td>예시 동작</td><td>폴더 아이콘을 더블클릭해 진입</td><td><code>cd 폴더명</code> 입력 후 Enter</td></tr>
<tr><td>장점</td><td>직관적이고 배우기 쉽다</td><td>빠르고, 정확하며, 자동화하기 쉽다</td></tr>
<tr><td>단점</td><td>반복 작업 자동화가 어렵다</td><td>명령어를 몰라야 하는 학습 비용이 있다</td></tr>
<tr><td>적합한 상황</td><td>단순 파일 탐색, 초보자</td><td>반복 작업, 원격 서버 제어, 개발 도구 연동</td></tr>
</tbody>
</table>

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">Git은 원래 CLI 기반</div><div class="wda-fcard-dsc">Git의 모든 기능은 명령어로 먼저 만들어졌다. GUI 툴은 그 위에 얹힌 보조 도구다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">빠르고 정확함</div><div class="wda-fcard-dsc">클릭 여러 번 대신 명령어 한 줄로 정확한 동작을 실행할 수 있다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">자동화 가능</div><div class="wda-fcard-dsc">명령어는 스크립트로 묶어 반복 실행하거나 CI/CD 같은 자동화 파이프라인에 연결할 수 있다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">개발자 필수 도구</div><div class="wda-fcard-dsc">서버 접속, 배포, 패키지 설치 등 대부분의 개발 작업이 CLI를 거친다.</div></div>
</div>

---

## 2. 리눅스와 터미널

터미널에서 쓰는 명령어 상당수는 리눅스(Linux)에서 비롯됐다. 리눅스는 1991년 <strong>Linus Torvalds</strong>가 만든 오픈소스 운영체제(OS)다. 운영체제란 컴퓨터의 하드웨어를 관리하고, 프로그램이 실행될 수 있는 환경을 만들어주는 소프트웨어를 말한다.

**▶ 리눅스의 특징**

<table class="wda-mtable">
<thead><tr><th>리눅스의 특징</th><th>내용</th></tr></thead>
<tbody>
<tr><td>무료</td><td>오픈소스로 공개되어 누구나 비용 없이 사용할 수 있다.</td></tr>
<tr><td>안정적이고 빠름</td><td>불필요한 자원 소모가 적어 오래 켜둬도 안정적으로 동작한다.</td></tr>
<tr><td>서버 환경의 표준</td><td>전 세계 서버 대부분이 리눅스 기반으로 운영된다.</td></tr>
<tr><td>커스터마이징 가능</td><td>필요한 부분만 골라 원하는 형태로 조합할 수 있다.</td></tr>
</tbody>
</table>

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">서버 환경의 표준</div><div class="wda-fcard-dsc">실제 서비스가 배포되는 서버 대부분이 리눅스 위에서 돌아간다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">개발 도구와의 호환성</div><div class="wda-fcard-dsc">대부분의 개발 도구와 배포 파이프라인이 리눅스 환경을 기준으로 만들어진다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Git과의 관계</div><div class="wda-fcard-dsc">Git 자체가 리눅스 커널을 개발하기 위해 만들어진 도구다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">macOS와의 유사성</div><div class="wda-fcard-dsc">macOS도 리눅스와 같은 Unix 계열이라 터미널 명령어가 대부분 비슷하다.</div></div>
</div>

---

## 3. 기본 명령어 ① pwd · ls · cd

터미널을 열었을 때 가장 먼저 익혀야 할 세 명령어다.

**▶ pwd·ls·cd 명령어 정리**

<table class="wda-mtable">
<thead><tr><th>명령어</th><th>의미</th><th>기능</th></tr></thead>
<tbody>
<tr><td><code>pwd</code></td><td>Print Working Directory</td><td>현재 작업 중인 폴더의 전체 경로를 출력한다.</td></tr>
<tr><td><code>ls</code></td><td>List</td><td>현재 폴더 안의 파일·폴더 목록을 보여준다.</td></tr>
<tr><td><code>cd</code></td><td>Change Directory</td><td>다른 폴더로 이동한다.</td></tr>
</tbody>
</table>

**• 터미널: pwd·ls·cd로 위치 이동하기**

```bash
pwd                # 현재 위치 확인
ls                 # 현재 폴더의 파일/폴더 목록 확인
cd project          # project 폴더로 하위 이동
cd ..               # 상위 폴더로 이동
cd ~                # 홈 디렉토리로 이동
```

---

## 4. 경로의 개념 — 절대경로 vs 상대경로

폴더를 이동하려면 "어디로 갈 것인가"를 경로로 표현해야 한다. 경로는 크게 두 가지 방식으로 쓸 수 있다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">절대경로</div>
    루트(<code>/</code>)부터 시작해 목적지까지의 전체 경로를 모두 적는다. 현재 위치가 어디든 항상 같은 곳을 가리킨다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">상대경로</div>
    현재 위치를 기준으로 목적지를 표현한다. <code>./folder</code>는 현재 폴더 안의 folder를, <code>../parent</code>는 상위 폴더를 가리킨다.
  </div>
</div>

**▶ 경로 기호 의미**

<table class="wda-mtable">
<thead><tr><th>기호</th><th>의미</th></tr></thead>
<tbody>
<tr><td><code>~</code></td><td>홈 디렉토리</td></tr>
<tr><td><code>/</code></td><td>루트(최상위) 디렉토리</td></tr>
<tr><td><code>.</code></td><td>현재 디렉토리</td></tr>
<tr><td><code>..</code></td><td>상위(부모) 디렉토리</td></tr>
</tbody>
</table>

경로를 표기하는 방식은 운영체제마다 조금씩 다르다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">Mac / Linux</div><div class="wda-fcard-dsc">슬래시(<code>/</code>)로 경로를 구분한다. 예: <code>/Users/name/project</code></div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Windows CMD</div><div class="wda-fcard-dsc">역슬래시(<code>\</code>)로 경로를 구분한다. 예: <code>C:\Users\name\project</code></div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Git Bash (Windows)</div><div class="wda-fcard-dsc">Windows에서도 <code>/c/Users/name/project</code>처럼 Unix 스타일 경로를 사용한다.</div></div>
</div>

---

## 5. 기본 명령어 ② mkdir · touch

폴더와 파일을 새로 만들 때 쓰는 명령어다.

**• 터미널: mkdir로 폴더 생성하기**

```bash
mkdir new-folder                  # 폴더 1개 생성
mkdir folder-a folder-b folder-c  # 여러 폴더 한번에 생성
mkdir -p parent/child/grandchild  # 중간 폴더까지 한 번에 생성
```

**• 터미널: touch로 파일 생성하기**

```bash
touch index.html                   # 파일 1개 생성
touch style.css script.js          # 여러 파일 한번에 생성
touch src/index.html               # 특정 폴더 안에 파일 생성
```

<code>touch</code>는 원래 파일의 수정 시간을 갱신하는 명령어지만, 대상 파일이 존재하지 않으면 내용이 빈 새 파일을 만들어준다는 특성 덕분에 파일 생성용으로 자주 쓰인다.

프로젝트 폴더의 뼈대를 한 번에 만들 때는 두 명령어를 조합한다.

**• 터미널: 프로젝트 폴더 뼈대 만들기**

```bash
mkdir my-project
cd my-project
touch index.html style.css script.js
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>폴더·파일 이름에 <strong>공백이 있으면 반드시 큰따옴표로 감싸야</strong> 한다(예: <code>mkdir "my folder"</code>). 이미 존재하는 폴더 이름으로 <code>mkdir</code>을 실행하면 에러가 발생한다. 한글 이름도 사용은 가능하지만, 인코딩 문제를 피하려면 영문 이름을 권장한다.</p>
</div>

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>이름 짓기 팁 — 공백은 반드시 따옴표로 감싸고, 가능하면 <strong>영문 소문자 + 하이픈(-) 또는 언더스코어(_)</strong> 조합을 사용한다. 파일을 만들 때는 확장자를 빠뜨리지 않는다.</p>
</div>

---

## 6. 기본 명령어 ③ cat · nano · vim

**• 터미널: cat으로 파일 내용 출력하기**

```bash
cat index.html              # 파일 내용을 터미널에 바로 출력
cat a.txt b.txt              # 여러 파일을 연달아 출력
cat a.txt > b.txt            # a.txt의 내용을 b.txt로 복사
```

<code>cat</code>은 파일 내용을 수정하지 않고 빠르게 확인만 하고 싶을 때 유용하지만, 파일이 너무 크면 화면에 한 번에 쏟아져 읽기 어려워진다. 내용을 직접 수정하려면 터미널 안에서 실행되는 텍스트 편집기가 필요하다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">nano</div>
    초보자에게 추천되는 편집기다. 화면 아래에 단축키 안내가 항상 표시된다.<br><br>
    저장: <code>Ctrl+O</code> · 종료: <code>Ctrl+X</code>
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">vim</div>
    고급 사용자용 편집기로 학습 곡선이 있지만 매우 강력하다.<br><br>
    <code>i</code> 입력 모드 진입 → <code>ESC</code> 명령 모드 복귀 → <code>:wq</code> 저장 후 종료 · <code>:q!</code> 저장하지 않고 종료
  </div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  <p>처음에는 nano처럼 화면 안내가 보이는 편집기로 시작하는 것을 권장한다. vim은 배우는 데 시간이 걸리지만 익숙해지면 훨씬 빠르게 편집할 수 있다. macOS와 Linux는 대부분 두 편집기가 기본 설치돼 있고, Windows는 Git Bash를 설치하면 함께 딸려온다.</p>
</div>

---

## 7. git init — 폴더를 Git 프로젝트로 만들기

<code>git init</code>은 평범한 폴더를 Git이 버전을 관리하는 프로젝트로 바꿔주는 명령어다. 실행하는 즉시 그 폴더 안에 <code>.git</code> 숨김 폴더가 생성된다.

**• 터미널: git init 실습 흐름 미리보기**

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1. cd ~</div><div class="wda-fnode-dsc">홈으로 이동</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2. mkdir git-practice</div><div class="wda-fnode-dsc">실습 폴더 생성</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3. cd git-practice</div><div class="wda-fnode-dsc">폴더 진입</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">4. git init</div><div class="wda-fnode-dsc">저장소로 전환</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">5. ls -a</div><div class="wda-fnode-dsc">.git 폴더 확인</div></div>
</div>

**• 터미널: git init으로 저장소 만들기**

```bash
cd ~
mkdir git-practice
cd git-practice
pwd
git init
ls -a
```

<code>ls</code>에 <code>-a</code> 옵션을 붙이면 <code>.git</code>처럼 이름이 점(.)으로 시작하는 숨김 파일·폴더까지 모두 표시된다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><code>.git</code> 폴더는 그 프로젝트의 모든 버전 히스토리가 저장된 곳이다. 직접 열어서 내용을 건드리거나 삭제하면 <strong>이력 전체가 복구 불가능하게 사라진다</strong>.</p>
</div>

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p><code>git init</code>은 프로젝트당 한 번만 실행하면 된다. 실행한 뒤에는 습관적으로 <code>git status</code>를 실행해 지금 상태를 확인하는 것이 좋다.</p>
</div>

---

## 8. git status — 지금 상태 확인하기

<code>git status</code>는 현재 Git 저장소의 상태를 한눈에 보여준다.

**▶ git status가 알려주는 정보**

<table class="wda-mtable">
<thead><tr><th>git status가 알려주는 것</th><th>내용</th></tr></thead>
<tbody>
<tr><td>현재 브랜치 이름</td><td>지금 작업 중인 브랜치가 무엇인지</td></tr>
<tr><td>수정된 파일</td><td>Working Directory에서 변경됐지만 아직 add하지 않은 파일</td></tr>
<tr><td>Staged된 파일</td><td>git add로 Staging Area에 올라간 파일</td></tr>
<tr><td>Untracked 파일</td><td>Git이 아직 한 번도 추적한 적 없는 새 파일</td></tr>
</tbody>
</table>

<code>git status</code>는 add하기 전, commit하기 전, 파일을 수정한 직후 등 거의 모든 순간에 확인하는 습관을 들이면 좋다.

**• 커밋이 하나도 없을 때 git status 출력**

```text
# 커밋이 하나도 없을 때
On branch master
No commits yet
nothing to commit (create/copy files and use "git add" to track)
```

<code>init.defaultBranch</code>를 <code>main</code>으로 미리 설정해두지 않았다면, <code>git init</code> 직후의 기본 브랜치 이름은 <code>master</code>로 표시된다. GitHub에서 새로 만든 저장소의 기본 브랜치는 <code>main</code>이므로, 두 이름을 맞추는 방법은 다음 문서(3-2-3)의 push 과정에서 다룬다.

**• 새 파일 생성 직후 git status 출력**

```text
# 새 파일을 만든 직후
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        index.html
```

**• git add 실행 후 git status 출력**

```text
# git add 실행 후
Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   index.html
```

---

## 9. git add — Staging Area로 옮기기

<code>git add</code>는 Working Directory의 변경 사항을 Staging Area로 옮기는 명령어다.

**• 터미널: git add 사용 패턴**

```bash
git add index.html          # 파일 1개만 추가
git add style.css script.js # 여러 파일 추가
git add .                   # 변경된 모든 파일 추가
git add *.js                # 특정 확장자만 추가
```

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">선택적 커밋</div><div class="wda-fcard-dsc">수정한 파일 중 원하는 것만 골라 Staging Area에 담을 수 있다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">검토 기회</div><div class="wda-fcard-dsc">commit 하기 전에 무엇이 올라가는지 한 번 더 점검할 수 있다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">작업 분리</div><div class="wda-fcard-dsc">서로 다른 작업을 성격에 맞게 나눠 커밋할 수 있다.</div></div>
</div>

실수로 Staging Area에 올린 파일을 다시 빼고 싶다면 아래 명령어를 사용한다. 파일 자체가 삭제되는 것은 아니며, Working Directory로 되돌아갈 뿐이다.

**• 터미널: Staging Area에서 파일 빼기**

```bash
git reset HEAD 파일명
# 또는
git restore --staged 파일명
```

---

## 10. git commit — 버전으로 영구 저장하기

commit은 그 시점의 파일 상태를 스냅샷처럼 통째로 저장하는 행위다. 커밋마다 고유한 해시 ID가 부여되고, 커밋 메시지와 시간 정보가 함께 기록된다.

**• 터미널: git commit으로 버전 저장하기**

```bash
git commit -m "로그인 기능 추가"
```

커밋 메시지는 나중에 이력을 되돌아볼 때 가장 중요한 단서가 된다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">나쁜 커밋 메시지</div>
    <code>"수정"</code>, <code>"변경함"</code>처럼 무엇이 왜 바뀌었는지 알 수 없는 메시지. 시간이 지나면 본인도 내용을 기억하지 못한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">좋은 커밋 메시지</div>
    <code>"로그인 기능 추가"</code>, <code>"헤더 반응형 레이아웃 수정"</code>처럼 변경 의도가 문장만 봐도 분명하게 드러나는 메시지.
  </div>
</div>

메시지가 길어질 때는 제목과 본문을 나눠 여러 줄로 작성할 수도 있다.

**• 터미널: 제목과 본문을 나눈 커밋 메시지**

```bash
git commit -m "로그인 기능 추가" -m "이메일/비밀번호 검증 로직과 에러 메시지 처리를 포함"
```

새 파일을 만들고 커밋까지 이어지는 전체 흐름은 다음과 같다.

**• 터미널: 파일 생성부터 커밋까지 전체 흐름**

```bash
touch index.html
git add index.html
git commit -m "index.html 초기 생성"
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><code>git add</code> 없이 바로 <code>git commit</code>을 실행하면 아무 변경 사항도 저장되지 않는다. 메시지 없이 커밋하는 것도 피해야 한다. <strong>status → add → status → commit</strong> 순서를 지키는 습관을 들이면 실수를 크게 줄일 수 있다.</p>
</div>

---

## 11. git log — 커밋 히스토리 확인하기

**• 터미널: git log로 히스토리 보기**

```bash
git log
```

<code>git log</code>는 지금까지의 커밋 기록을 최신순으로 보여준다. 각 커밋마다 커밋 ID, 작성자(Author), 날짜(Date), 커밋 메시지가 함께 표시되며, 목록이 길면 <code>q</code>를 눌러 빠져나온다.

**• 터미널: git log 옵션 활용**

```bash
git log --oneline       # 커밋마다 한 줄로 간단히 보기
git log -n 5             # 최근 5개 커밋만 보기
git log --oneline -5     # 최근 5개를 한 줄씩 간단히 보기
```

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>실무에서는 <code>git log --oneline</code>을 가장 자주 사용한다. 커밋 ID는 전체 해시를 다 볼 필요 없이 앞 7자리 정도만 있어도 다른 명령어에서 식별자로 충분히 사용할 수 있다.</p>
</div>

---

## 12. git diff — 변경 내용 비교하기

<code>git diff</code>는 파일이 어떻게 달라졌는지 줄 단위로 보여준다. 추가된 줄 앞에는 <code>+</code>, 삭제된 줄 앞에는 <code>-</code> 표시가 붙는다. 화면에서는 보통 추가된 줄은 초록색, 삭제된 줄은 빨간색으로 표시된다.

<code>git diff</code>는 비교하는 대상에 따라 세 가지로 나뉜다.

**▶ git diff 비교 대상별 명령어**

<table class="wda-mtable">
<thead><tr><th>명령어</th><th>비교 대상</th></tr></thead>
<tbody>
<tr><td><code>git diff</code></td><td>Working Directory ↔ Staging Area</td></tr>
<tr><td><code>git diff --staged</code></td><td>Staging Area ↔ Repository(마지막 커밋)</td></tr>
<tr><td><code>git diff HEAD</code></td><td>현재 작업 내용 ↔ 마지막 커밋 전체</td></tr>
</tbody>
</table>

add하기 전 마지막으로 무엇이 바뀌었는지 확인하거나, 실수로 잘못 고친 부분이 없는지 점검하거나, 커밋 직전 마지막으로 검토할 때 사용한다. 실전에서는 아래 순서로 diff를 활용하는 경우가 많다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1. 수정</div><div class="wda-fnode-dsc">파일 편집</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2. git diff</div><div class="wda-fnode-dsc">변경 내용 확인</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3. git add</div><div class="wda-fnode-dsc">스테이징</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">4. git diff --staged</div><div class="wda-fnode-dsc">최종 검토</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">5. git commit</div><div class="wda-fnode-dsc">커밋</div></div>
</div>

---

## 13. 전체 흐름 한눈에 보기

지금까지 배운 명령어를 3영역 흐름에 대응시켜 정리하면 아래와 같다.

**▶ 3영역 흐름별 상태 확인 명령어**

<table class="wda-mtable">
<thead><tr><th>단계</th><th>상태 확인 명령어</th></tr></thead>
<tbody>
<tr><td>Working Directory에서 수정 중</td><td><code>git status</code>, <code>git diff</code></td></tr>
<tr><td>git add로 Staging Area에 올린 뒤</td><td><code>git status</code>, <code>git diff --staged</code></td></tr>
<tr><td>git commit으로 Repository에 저장한 뒤</td><td><code>git log</code>, <code>git log --oneline</code></td></tr>
</tbody>
</table>

이번 문서에서는 로컬 저장소 안에서의 흐름만 다뤘다.

<code>git branch</code>(브랜치 만들기), <code>git switch -c</code>(브랜치 생성 후 이동), <code>git push</code> / <code>git pull origin main</code>(원격 저장소와 동기화)처럼 브랜치와 원격 저장소를 다루는 명령어는 다음 섹션에서 이어서 다룬다.

---

## 14. 터미널 사용 시 주의사항

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>절대 실행하지 말 것</strong> — <code>rm -rf /</code>는 시스템의 모든 파일을 강제로 삭제하는 명령어이며, 실행하면 복구가 거의 불가능하다. 이 명령어를 어디선가 보게 되더라도 <strong>절대로 Enter를 누르지 말 것</strong>.</p>
  <p>비슷하게 위험한 명령어로 <code>sudo rm -rf /</code>(관리자 권한으로 시스템 전체 삭제), 포크 폭탄(fork bomb, 프로세스를 무한 증식시켜 시스템을 마비시키는 코드), <code>mkfs</code>(디스크를 포맷하는 명령어)가 있다. 출처가 불분명한 명령어는 의미를 정확히 알기 전까지 절대 실행하지 않는다.</p>
</div>

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>안전하게 사용하는 가장 기본적인 방법은 <strong>명령어를 실행하기 전 <code>pwd</code>로 지금 위치를 항상 확인하는 습관</strong>을 들이는 것이다. 특히 삭제나 초기화처럼 되돌리기 어려운 명령어일수록 실행 전 위치 확인이 중요하다.</p>
</div>

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">Tab 자동완성</div><div class="wda-fcard-dsc">파일·폴더명을 끝까지 입력하지 않아도 Tab 키로 자동 완성할 수 있다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">명령어 히스토리</div><div class="wda-fcard-dsc">방향키 위/아래(↑/↓)로 이전에 입력한 명령어를 다시 불러올 수 있다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Ctrl+C</div><div class="wda-fcard-dsc">실행 중인 명령어를 강제로 중단할 때 사용한다.</div></div>
</div>

터미널은 대소문자를 구분하고, 공백이 있는 이름은 큰따옴표로 감싸야 하며, 명령어를 실행하기 전 경로를 항상 확인하는 것이 좋다. 처음 보는 명령어는 바로 실행하지 말고, 어떤 동작을 하는지 먼저 검색해보는 습관을 들인다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><strong>pwd</strong>는 현재 위치, <strong>ls</strong>는 목록, <strong>cd</strong>는 이동에 사용한다.</li>
    <li><strong>git init</strong>은 폴더를 Git 저장소로 만드는 명령어이며 프로젝트당 한 번만 실행한다.</li>
    <li>버전을 남기는 순서는 <strong>git add → git commit</strong>이다.</li>
    <li><strong>git status</strong>는 거의 매 단계마다 확인하는 습관을 들인다.</li>
    <li><strong>rm -rf /</strong> 같은 명령어는 절대 실행하지 않는다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: git add만 하면 버전이 저장된다?</div>
    <div class="wda-mistake-right">정답: <code>git add</code>는 Staging Area로 옮기는 것일 뿐이다. Repository에 영구히 남기려면 <code>git commit</code>까지 실행해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: git diff와 git diff --staged는 같은 결과를 보여준다?</div>
    <div class="wda-mistake-right">정답: <code>git diff</code>는 Working Directory와 Staging Area를 비교하고, <code>git diff --staged</code>는 Staging Area와 마지막 커밋을 비교한다. 서로 다른 비교 대상이다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: touch는 파일 내용을 편집하는 명령어다?</div>
    <div class="wda-mistake-right">정답: <code>touch</code>는 원래 파일의 수정 시간을 갱신하는 명령어다. 대상 파일이 없을 때 빈 파일을 새로 만들어주는 특성 때문에 파일 생성용으로 쓰일 뿐이다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 저장소 시작</div>
    <div class="wda-formula-block-body"><code>git init = 폴더를 Git 저장소로 전환</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 버전 저장</div>
    <div class="wda-formula-block-body"><code>git add + git commit -m "메시지"</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 상태 확인 3종</div>
    <div class="wda-formula-block-body"><code>git status · git log · git diff</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · 안전 수칙</div>
    <div class="wda-formula-block-body"><code>pwd로 위치 확인 후 실행</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Git 프로젝트를 시작하는 명령어는?</div>
    <div class="wda-flip-back"><code>git init</code></div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">파일을 Staging Area에 추가하는 명령어는?</div>
    <div class="wda-flip-back"><code>git add</code></div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">최근 커밋 5개를 한 줄씩 간단히 보려면?</div>
    <div class="wda-flip-back"><code>git log --oneline -5</code></div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Staging Area와 마지막 커밋을 비교하는 명령어는?</div>
    <div class="wda-flip-back"><code>git diff --staged</code></div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">숨김 파일까지 모두 보여주는 ls 옵션은?</div>
    <div class="wda-flip-back"><code>ls -a</code></div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">절대 실행하면 안 되는 대표적인 명령어는?</div>
    <div class="wda-flip-back"><code>rm -rf /</code> — 시스템 전체를 삭제하며 복구가 거의 불가능하다.</div>
  </div>
</div>
