---
title: "2-2 내 컴퓨터와 GitHub 연결하기"
category: "frontend"
section: "github"
date: "2026-08-02"
status: "completed"
description: "원격 저장소 개념을 이해하고 git remote, git clone, SSH 키 등록으로 로컬과 GitHub를 연결합니다."
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
  • <strong>원격 저장소 개념 이해</strong> — 로컬 저장소와 원격 저장소의 역할 차이를 구분합니다<br>
  • <strong>git remote / git clone 사용</strong> — 원격 주소를 등록하거나 저장소 전체를 복제할 수 있습니다<br>
  • <strong>HTTPS와 SSH 방식 구분</strong> — 두 인증 방식의 장단점을 이해하고 상황에 맞게 선택합니다<br>
  • <strong>SSH 키 생성 및 등록</strong> — ssh-keygen으로 키를 만들고 공개키를 GitHub에 등록합니다
</div>

---

## 1. 로컬 저장소 vs 원격 저장소

[이전 문서](/dev-tools/github/3-2-1-create-github-account)에서 GitHub 계정을 만들었다면, 이제는 그 계정을 내 컴퓨터의 로컬 저장소와 연결할 차례입니다.

이번 문서는 원격 저장소라는 개념을 이해하고, <code>git remote</code>와 <code>git clone</code>으로 로컬과 GitHub를 연결하는 두 가지 경로, 그리고 HTTPS·SSH 인증 방식을 다룹니다.

Git을 어느 정도 다뤄본 사람도 로컬 저장소와 원격 저장소의 차이를 헷갈리는 경우가 많다. 이름 그대로 위치가 다르다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">로컬 저장소</div>
    내 컴퓨터 안에 <code>.git</code> 폴더 형태로 존재하는 프로젝트입니다. 오프라인에서도 작업할 수 있고 속도가 빠르지만, 다른 사람과 바로 공유할 수 없고 컴퓨터가 고장 나면 그대로 사라질 위험이 있습니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">원격 저장소</div>
    GitHub, GitLab, Bitbucket처럼 인터넷 서버에 있는 저장소입니다. 팀 협업이 가능하고 자동으로 백업되며 어디서나 접근할 수 있지만, 인터넷 연결이 필요합니다.
  </div>
</div>

로컬 저장소가 "나 혼자 작업하는 공간"이라면, 원격 저장소는 그 공간을 다른 사람과 이어주는 통로다. 이 둘을 연결하는 작업, 즉 원격 주소를 <strong>등록(register)</strong>하고 데이터를 <strong>동기화(sync)</strong>하는 과정이 GitHub를 쓰는 핵심이다.

---

## 2. git remote 명령어

`git remote`는 로컬 저장소에 원격 주소를 연결하거나 관리할 때 사용하는 명령어다.

**• 터미널: git remote add로 원격 주소 등록하기**

```bash
git remote add origin https://github.com/your-username/repo.git
```

`add`는 새 원격 저장소를 추가한다는 뜻이고, `origin`은 관례적으로 붙이는 기본 별칭이며, 그 뒤는 GitHub 저장소 주소다.

**▶ git remote 하위 명령어 역할**

<table class="wda-mtable">
<thead><tr><th>명령어</th><th>역할</th></tr></thead>
<tbody>
<tr><td><code>git remote -v</code></td><td>등록된 원격 저장소 목록을 확인합니다. fetch는 가져올 때, push는 업로드할 때 사용하는 주소를 보여줍니다.</td></tr>
<tr><td><code>git remote remove origin</code></td><td>연결만 끊습니다. GitHub의 저장소 자체가 삭제되는 것은 아닙니다.</td></tr>
<tr><td><code>git remote rename origin upstream</code></td><td>등록된 원격 저장소의 별칭을 변경합니다.</td></tr>
<tr><td><code>git remote show origin</code></td><td>HEAD 브랜치, 원격 브랜치 목록, Fetch/Push URL 등 상세 정보를 확인합니다.</td></tr>
</tbody>
</table>

---

## 3. git clone으로 전체 저장소 복제하기

`git clone`은 원격 저장소 전체를 로컬로 복제하는 명령어다. 저장소 내용뿐 아니라 전체 커밋 기록까지 함께 가져오며, 복제와 동시에 원격 주소가 `origin`으로 자동 등록된다.

새로운 프로젝트를 처음 가져올 때 사용한다.

`git clone`과 `git remote add`는 목적이 다르므로 상황에 맞게 구분해서 써야 한다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">git clone</div>
    원격 저장소를 <strong>통째로 복제</strong>합니다. 새 프로젝트를 시작할 때 사용하며, 실행하면 프로젝트 폴더가 새로 생성됩니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">git remote add</div>
    이미 로컬에서 작업 중이던 프로젝트에 <strong>원격 주소만 연결</strong>합니다. 현재 폴더에 원격 주소가 등록될 뿐, 새 폴더가 생기지는 않습니다.
  </div>
</div>

### clone 실습 정리

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">① URL 복사</div><div class="wda-fnode-dsc">GitHub의 Code 버튼에서 HTTPS 주소 복사</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">② clone 실행</div><div class="wda-fnode-dsc">터미널에서 git clone URL</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">③ 결과 확인</div><div class="wda-fnode-dsc">cd 폴더 → ls → git remote -v</div></div>
</div>

**• 터미널: git clone으로 저장소 복제하기**

```bash
git clone https://github.com/your-username/repo.git
cd repo
ls
git remote -v
```

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>오픈소스 프로젝트를 공부할 때는 <code>clone</code>으로 코드를 직접 받아 구조를 분석해보는 방식이 좋다. 실제로 배포되는 프로젝트가 어떻게 구성되는지 가장 빠르게 익힐 수 있다.</p>
</div>

---

## 4. HTTPS 방식 vs SSH 방식

원격 저장소에 접근할 때는 인증 방식을 HTTPS와 SSH 중에서 선택해야 한다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">HTTPS</div>
    <code>git clone https://...</code> 형태로 접근합니다. 설정이 매우 쉬워 별도 준비 없이 바로 사용할 수 있지만, push할 때마다 비밀번호나 토큰을 입력해야 합니다. Git을 처음 쓰는 사람이나 공개 저장소 작업에 적합합니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">SSH</div>
    <code>git clone git@github.com:...</code> 형태로 접근합니다. 공개키·비밀키 기반으로 인증하기 때문에 초기 설정이 필요하지만, 한 번 등록해두면 push할 때 자동으로 인증되고 보안 수준도 더 높습니다. 실무의 비공개 저장소나 팀 개발에 적합합니다.
  </div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  <p>정리하면 HTTPS는 "빠르게 시작하기"에 유리하고, SSH는 "매번 인증하지 않고 안전하게 쓰기"에 유리하다. 아래 절부터는 SSH 키를 직접 생성하고 등록하는 과정을 다룬다.</p>
</div>

---

## 5. SSH 키 생성하기

SSH 인증은 한 쌍의 키를 기반으로 동작한다.

**▶ 공개키와 비밀키의 역할**

<table class="wda-mtable">
<thead><tr><th>구분</th><th>역할</th></tr></thead>
<tbody>
<tr><td>공개키(Public Key)</td><td>GitHub에 등록하는 키입니다. 다른 사람에게 보여도 문제가 없으며, 파일명은 보통 <code>id_rsa.pub</code> 또는 <code>id_ed25519.pub</code>입니다.</td></tr>
<tr><td>비밀키(Private Key)</td><td>내 컴퓨터에만 저장하는 키입니다. 절대로 다른 사람과 공유하면 안 되며, 파일명은 보통 <code>id_rsa</code> 또는 <code>id_ed25519</code>입니다.</td></tr>
</tbody>
</table>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>비밀키는 이름 그대로 절대 노출되면 안 되는 값이다. 코드 저장소나 채팅, 문서 어디에도 비밀키 내용을 그대로 붙여 넣지 않는다. GitHub에 등록해야 하는 것은 항상 <strong>공개키</strong>뿐이다.</p>
</div>

키 생성은 `ssh-keygen` 명령어로 진행한다.

**• 터미널: ssh-keygen으로 SSH 키 생성하기**

```bash
# RSA 방식
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"

# ED25519 방식
ssh-keygen -t ed25519 -C "your-email@example.com"
```

`-t`는 알고리즘 타입, `-b`는 키 길이(RSA에서만 4096을 권장), `-C`는 식별용 이메일 주석을 의미한다. 명령을 실행하면 저장 경로를 물어보는데, 특별한 이유가 없다면 기본 경로인 `.ssh` 폴더를 그대로 사용하면 된다.

이어서 passphrase(추가 비밀번호) 설정 여부를 묻는데, 입력하면 보안이 강화되지만 사용할 때마다 다시 입력해야 하므로 처음 시작하는 단계에서는 비워두어도 괜찮다.

키 생성이 끝나면 아래 명령으로 결과를 확인할 수 있다.

**• 터미널: 생성된 SSH 키 확인하기**

```bash
ls -al ~/.ssh
```

세 가지 알고리즘 중 어떤 것을 선택할지는 아래 기준을 참고한다.

**▶ SSH 키 알고리즘 비교**

<table class="wda-mtable">
<thead><tr><th>알고리즘</th><th>보안</th><th>성능</th><th>비고</th></tr></thead>
<tbody>
<tr><td>RSA 4096</td><td>중간</td><td>느린 편</td><td>호환성이 가장 좋습니다.</td></tr>
<tr><td>ED25519</td><td>높음</td><td>매우 빠름</td><td>GitHub가 공식적으로 추천하는 방식입니다.</td></tr>
<tr><td>ECDSA 256</td><td>중간</td><td>빠름</td><td>RSA와 ED25519의 중간 정도 특성을 가집니다.</td></tr>
</tbody>
</table>

---

## 6. SSH 키 권한 설정

SSH는 키 파일의 권한이 지나치게 열려 있으면 동작을 거부한다. 권한 숫자는 읽기(4), 쓰기(2), 실행(1)의 합으로 표현된다.

**▶ SSH 키 권한 값 의미**

<table class="wda-mtable">
<thead><tr><th>권한</th><th>대상</th><th>의미</th></tr></thead>
<tbody>
<tr><td>600</td><td>비밀키 파일</td><td>소유자만 읽고 쓸 수 있는 안전한 권한입니다.</td></tr>
<tr><td>700</td><td>.ssh 디렉토리</td><td>소유자만 접근할 수 있는 권한입니다.</td></tr>
<tr><td>644</td><td>(위험한 예)</td><td>다른 사용자도 읽을 수 있어 비밀키에는 사용하면 안 되는 권한입니다.</td></tr>
</tbody>
</table>

**• 터미널: SSH 키 권한 설정하기**

```bash
chmod 600 ~/.ssh/id_ed25519
chmod 700 ~/.ssh
```

---

## 7. GitHub에 SSH 공개키 등록하기

키 생성이 끝났다면 공개키 내용만 GitHub에 등록한다.

**• 터미널: 공개키 내용 출력하기**

```bash
cat ~/.ssh/id_ed25519.pub
```

출력된 내용은 한 줄로 이루어져 있으며, 이 문자열 전체를 복사한다. macOS는 `pbcopy`, Linux는 `xclip`, Windows는 `clip` 명령어로 클립보드에 바로 복사할 수도 있다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">① 설정 이동</div><div class="wda-fnode-dsc">프로필 → Settings</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">② 메뉴 진입</div><div class="wda-fnode-dsc">SSH and GPG keys → New SSH key</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">③ 정보 입력</div><div class="wda-fnode-dsc">Title(구분용 이름), Key(복사한 공개키)</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">④ 등록 완료</div><div class="wda-fnode-dsc">Add SSH key 클릭</div></div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  <p>여러 컴퓨터에서 작업한다면 컴퓨터마다 SSH 키를 각각 생성하고 각각 등록해야 한다. 하나의 키를 여러 컴퓨터에서 공유하는 방식은 권장하지 않는다.</p>
</div>

---

## 8. 실습: 오픈소스 저장소 SSH로 clone 해보기

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">① SSH URL 복사</div><div class="wda-fnode-dsc">Code 버튼 → SSH 탭</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">② clone 실행</div><div class="wda-fnode-dsc">터미널에서 git clone 실행</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">③ 성공 확인</div><div class="wda-fnode-dsc">cd → ls</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">④ 상태 점검</div><div class="wda-fnode-dsc">git remote -v → git log --oneline -5</div></div>
</div>

**• 터미널: SSH로 오픈소스 저장소 clone하기**

```bash
git clone git@github.com:your-username/repo.git
cd repo
ls
git remote -v
git log --oneline -5
```

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><strong>로컬 저장소</strong>는 내 컴퓨터, <strong>원격 저장소</strong>는 GitHub 같은 서버에 있는 저장소다.</li>
    <li><strong>git clone</strong>은 원격 저장소를 통째로 복제하고, <strong>git remote add</strong>는 기존 로컬 프로젝트에 원격 주소만 연결한다.</li>
    <li><strong>HTTPS</strong>는 설정이 쉽지만 매번 인증이 필요하고, <strong>SSH</strong>는 초기 설정 후 자동 인증되며 더 안전하다.</li>
    <li>GitHub에 등록하는 키는 항상 <strong>공개키(id_ed25519.pub)</strong>이며, 비밀키는 절대 공유하지 않는다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: git clone과 git remote add는 결국 같은 작업이다?</div>
    <div class="wda-mistake-right">정답: <strong>clone</strong>은 원격 저장소를 처음부터 복제하는 것이고, <strong>remote add</strong>는 이미 있는 로컬 프로젝트에 원격 주소만 등록하는 것이다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: SSH 키를 GitHub에 등록할 때 비밀키를 등록해야 한다?</div>
    <div class="wda-mistake-right">정답: GitHub에 등록하는 것은 <strong>공개키(.pub 파일)</strong>뿐이다. 비밀키는 내 컴퓨터 밖으로 나가서는 안 된다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 연결 방식</div>
    <div class="wda-formula-block-body"><code>clone = 복제 · remote add = 연결만</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 인증 방식</div>
    <div class="wda-formula-block-body"><code>HTTPS = 매번 인증 · SSH = 키 기반 자동 인증</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 키 역할</div>
    <div class="wda-formula-block-body"><code>공개키 = GitHub 등록 · 비밀키 = 절대 비공개</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">git clone과 git remote add의 차이는?</div>
    <div class="wda-flip-back">clone은 원격 저장소를 통째로 복제하고, remote add는 기존 로컬 프로젝트에 원격 주소만 연결한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">SSH 키 생성 후 GitHub에 등록해야 하는 키는?</div>
    <div class="wda-flip-back">공개키(id_ed25519.pub 또는 id_rsa.pub)다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">비밀키 파일에 적합한 권한 숫자는?</div>
    <div class="wda-flip-back">600이다. 소유자만 읽고 쓸 수 있어야 안전하다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">GitHub가 공식 추천하는 SSH 키 알고리즘은?</div>
    <div class="wda-flip-back">ED25519다. 보안이 높고 성능도 빠르다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">git remote -v는 무엇을 보여주는가?</div>
    <div class="wda-flip-back">등록된 원격 저장소 목록과 fetch·push용 URL을 보여준다.</div>
  </div>
</div>
