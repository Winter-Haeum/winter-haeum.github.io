---
title: "3-1 gitignore로 버전 관리 제외 파일 설정하기"
category: "frontend"
section: "git"
date: "2026-08-02"
status: "completed"
description: ".gitignore의 개념과 필요성, 파일명·디렉토리·와일드카드 패턴 작성법을 익히고 git rm --cached로 실수 커밋을 복구하는 방법을 정리한다."
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
  • <strong>.gitignore 개념 이해</strong> — Git이 추적하지 않을 파일을 왜, 어떻게 지정하는지 이해합니다<br>
  • <strong>패턴 작성법 습득</strong> — 파일명·디렉토리·와일드카드 패턴을 실제로 작성할 수 있습니다<br>
  • <strong>실무 패턴 활용</strong> — Node.js·Python 프로젝트에서 바로 쓸 수 있는 무시 목록을 구성합니다<br>
  • <strong>실수 복구</strong> — 이미 커밋된 파일을 <code>git rm --cached</code>로 추적에서만 제거하는 방법을 익힙니다
</div>

---

## 1. .gitignore란

프로젝트 루트에는 소스 코드 말고도 Git이 굳이 몰라도 되는 파일이 많습니다. 이 문서는 그런 파일을 걸러내는 <code>.gitignore</code>를 다룹니다.

이어지는 3-3-2에서는 README.md로 프로젝트를 소개하는 법을, 3-3-3에서는 그 README를 제대로 쓰기 위한 Markdown 문법을 다룹니다.

<code>.gitignore</code>는 Git이 <strong>추적하지 않을 파일과 디렉토리</strong>를 지정하는 설정 파일이다. 프로젝트 루트 디렉토리에 두며, 여기에 등록된 파일은 <code>git add</code>나 <code>git status</code> 결과에 나타나지 않는다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>단, 이미 Git이 추적 중인 파일에는 <code>.gitignore</code>가 적용되지 않는다.</strong> 한 번이라도 커밋된 적이 있는 파일은 나중에 패턴을 추가해도 계속 추적된다. 이 문제는 6장에서 <code>git rm --cached</code>로 해결한다.</p>
</div>

.gitignore가 실무에서 꼭 필요한 이유는 크게 세 가지로 정리된다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">민감정보 보호</div><div class="wda-fcard-dsc">API 키, DB 비밀번호 같은 인증 정보가 담긴 파일이 공개 저장소에 올라가는 사고를 막는다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">자동 생성 파일 제외</div><div class="wda-fcard-dsc">node_modules, dist처럼 다시 만들어낼 수 있는 파일까지 저장소에 담지 않아 용량을 지킨다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">협업 효율성</div><div class="wda-fcard-dsc">OS·에디터가 개인 환경에 만드는 파일을 걸러 팀원 간 불필요한 충돌을 없앤다.</div></div>
</div>

---

## 2. 왜 필요한가

### 민감정보 보호가 가장 중요하다

<code>.env</code>, <code>credentials.json</code>, <code>*.pem</code>, <code>*.key</code>, <code>secrets.yml</code> 같은 파일명 패턴은 인증 정보를 담고 있을 가능성이 높다. 이런 파일이 public 저장소에 올라가면 전 세계에 노출되며, API 키가 유출되면 예상치 못한 과금이나 보안 사고로 이어질 수 있다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>API 키나 비밀번호는 절대 Git에 커밋하지 않는다.</strong> 실수로 한 번 올라간 값은 커밋 히스토리에 남기 때문에, 삭제해도 이미 유출된 것으로 간주하고 즉시 키를 재발급해야 한다.</p>
</div>

### 빌드 산출물은 다시 만들 수 있다

<code>node_modules/</code>, <code>dist/</code>, <code>build/</code>, <code>coverage/</code>, <code>*.log</code> 같은 디렉토리·파일은 명령어 한 번이면 다시 생성된다. 이런 파일까지 Git에 포함하면 저장소 용량이 순식간에 수백 MB에서 수 GB까지 불어난다.

### 협업 효율성도 올라간다

macOS의 <code>.DS_Store</code>, Windows의 <code>Thumbs.db</code>, IDE 개인 설정인 <code>.idea/</code>, <code>.vscode/</code> 등은 팀원마다 환경이 달라 생기는 파일이다.

이런 파일을 무시 목록에 넣으면 불필요한 충돌을 방지하고, 팀 간 작업 환경 차이로 인한 문제를 줄일 수 있다.

---

## 3. .gitignore 파일 생성하기

프로젝트 루트에서 파일을 하나 만들고 편집기로 연다.

**• 터미널: .gitignore 파일 생성하기**

```bash
touch .gitignore
code .gitignore
```

기본적인 예시는 다음과 같다.

**• 기본 .gitignore 예시**

```text
node_modules/
dist/
build/
.env
.env.local
*.log
npm-debug.log*
.DS_Store
Thumbs.db
.idea/
.vscode/
```

<code>#</code>으로 시작하는 줄은 주석으로 처리되며, 빈 줄은 무시되어 섹션을 구분하는 용도로 자주 쓰인다.

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p><code>.gitignore</code> 파일 자체는 팀 전체가 같은 무시 규칙을 공유해야 하므로 반드시 저장소에 커밋해서 관리한다.</p>
</div>

---

## 4. 기본 패턴 작성법

**▶ .gitignore 패턴별 작성법**

<table class="wda-mtable">
<thead><tr><th>패턴 종류</th><th>작성 예시</th><th>의미</th></tr></thead>
<tbody>
<tr><td>파일명 지정</td><td><code>secret.txt</code></td><td>이름이 정확히 일치하는 파일만 제외</td></tr>
<tr><td>디렉토리 지정</td><td><code>node_modules/</code></td><td>끝에 슬래시가 있어야 디렉토리로 인식됨</td></tr>
<tr><td>와일드카드 *</td><td><code>*.log</code></td><td>모든 문자를 대신함 (확장자·접두사 매칭)</td></tr>
<tr><td>와일드카드 ?</td><td><code>test?.txt</code></td><td>정확히 한 글자를 대신함</td></tr>
<tr><td>재귀 와일드카드 **</td><td><code>**/temp</code></td><td>하위 모든 디렉토리에서 매칭</td></tr>
<tr><td>예외 처리 !</td><td><code>!important.log</code></td><td>앞선 규칙으로 제외된 파일을 다시 추적 대상으로 되돌림</td></tr>
</tbody>
</table>

**• 예외 처리(!)로 특정 파일만 추적하기**

```text
# 로그 파일은 모두 무시하되 error.log만 예외로 추적
*.log
!error.log
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>디렉토리를 가리킬 때 슬래시를 빼먹으면 문제가 생길 수 있다. <code>node_modules/</code>는 디렉토리로 정확히 인식되지만, <code>node_modules</code>라고만 쓰면 같은 이름의 파일까지 함께 걸러질 수 있어 의도가 불분명해진다.</p>
</div>

---

## 5. 실무 필수 패턴 모음

프레임워크·언어별로 자주 쓰이는 패턴을 미리 알아두면 새 프로젝트마다 빠르게 적용할 수 있다.

**• Node.js 프로젝트 .gitignore 패턴**

```text
# Node.js 프로젝트
node_modules/
npm-debug.log*
yarn-debug.log*
dist/
build/
.next/
out/
.env
.env.local
.env.*.local
```

**• Python 프로젝트 .gitignore 패턴**

```text
# Python 프로젝트
venv/
env/
.venv/
__pycache__/
*.py[cod]
*.so
dist/
build/
*.egg-info/
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>민감정보는 절대 커밋하지 않는다.</strong> <code>.env</code>, <code>.env.local</code>, <code>.env.production</code>, <code>config/secrets.yml</code>, <code>credentials.json</code>, <code>service-account.json</code>, <code>*.pem</code>, <code>*.key</code> 같은 파일은 항상 무시 목록에 포함시킨다. API 키·DB 비밀번호·인증서가 유출되면 금전적 피해로 이어질 수 있다.</p>
</div>

---

## 6. 이미 추적된 파일 제거하기

실수로 <code>.env</code> 파일을 커밋해버린 상황을 가정해보자. 뒤늦게 <code>.gitignore</code>에 <code>.env</code>를 추가해도 Git은 이미 추적 중인 파일이라 계속 변경 사항을 감지한다. <strong>.gitignore는 아직 추적되지 않은 파일에만 적용되기 때문이다.</strong>

이럴 때는 <code>git rm --cached</code>로 복구한다.

**▶ git rm과 git rm --cached 차이**

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">git rm 파일명</div>
    Git 추적에서 제거하는 동시에 로컬 디스크의 파일도 함께 삭제한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">git rm --cached 파일명</div>
    Git 추적에서만 제거하고 로컬 파일은 그대로 남긴다. 실수 복구에는 이 옵션을 사용한다.
  </div>
</div>

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1. 추적 해제</div><div class="wda-fnode-dsc"><code>git rm --cached .env</code>로 Git 인덱스에서만 제거</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2. 규칙 추가</div><div class="wda-fnode-dsc"><code>.gitignore</code>에 <code>.env</code> 패턴 추가</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3. 커밋</div><div class="wda-fnode-dsc">변경된 <code>.gitignore</code>를 커밋해 팀과 공유</div></div>
</div>

**• 터미널: 이미 추적 중인 .env 제거하기**

```bash
git rm --cached .env
echo ".env" >> .gitignore
git add .gitignore
git commit -m "chore: remove .env from tracking"
```

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>핵심은 <code>--cached</code> 옵션이다. 이 옵션 덕분에 로컬 파일은 그대로 남고 Git 기록에서만 제거되므로, 협업 중 발생한 실수도 안전하게 복구할 수 있다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><strong>.gitignore</strong>는 Git이 추적하지 않을 파일·디렉토리를 지정하는 설정 파일이며 프로젝트 루트에 둔다.</li>
    <li>디렉토리 패턴은 끝에 <strong>슬래시(/)</strong>를 붙여야 정확히 인식된다.</li>
    <li><code>*</code>는 여러 문자, <code>?</code>는 한 글자, <code>**</code>는 하위 모든 디렉토리, <code>!</code>는 예외 처리를 의미한다.</li>
    <li>이미 추적 중인 파일은 <strong><code>git rm --cached</code></strong>로 먼저 추적을 해제해야 <code>.gitignore</code>가 효과를 발휘한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: .env 파일을 .gitignore에 추가하면 이미 커밋된 이력도 자동으로 사라진다?</div>
    <div class="wda-mistake-right">정답: .gitignore는 <strong>추적 전 파일에만</strong> 적용된다. 이미 커밋된 파일은 <code>git rm --cached</code>로 별도로 제거해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: git rm --cached는 로컬 파일까지 함께 지운다?</div>
    <div class="wda-mistake-right">정답: <code>--cached</code>는 <strong>Git 추적에서만</strong> 제거하며, 로컬 디스크의 파일은 그대로 남는다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 범위</div>
    <div class="wda-formula-block-body"><code>.gitignore = 추적 전 파일에만 적용</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 디렉토리</div>
    <div class="wda-formula-block-body"><code>폴더 패턴 끝에는 항상 /</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 복구</div>
    <div class="wda-formula-block-body"><code>실수 복구 = rm --cached + 커밋</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">.gitignore는 어떤 파일에 적용되나?</div>
    <div class="wda-flip-back">아직 Git이 추적하지 않은 파일에만 적용된다. 이미 추적 중인 파일에는 효과가 없다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">node_modules/처럼 끝에 슬래시를 붙이는 이유는?</div>
    <div class="wda-flip-back">디렉토리로 정확히 인식시키기 위해서다. 슬래시가 없으면 같은 이름의 파일까지 걸러질 수 있다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">*.log와 !error.log를 함께 쓰면?</div>
    <div class="wda-flip-back">모든 .log 파일을 무시하되 error.log만 예외로 다시 추적한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">이미 커밋된 .env를 안전하게 제거하는 명령어는?</div>
    <div class="wda-flip-back"><code>git rm --cached .env</code>로 로컬 파일은 남기고 Git 추적에서만 제거한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">.gitignore 파일 자체는 커밋해야 할까?</div>
    <div class="wda-flip-back">그렇다. 팀 전체가 같은 무시 규칙을 공유해야 하므로 반드시 커밋해서 관리한다.</div>
  </div>
</div>
