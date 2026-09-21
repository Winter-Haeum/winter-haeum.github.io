---
title: "2-1 GitHub 계정 만들기"
category: "frontend"
section: "github"
date: "2026-08-02"
status: "completed"
description: "GitHub의 정의와 Git과의 차이를 이해하고, 계정을 만들어 기본 인터페이스를 둘러봅니다."
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
  • <strong>Git과 GitHub 구분</strong> — 둘이 서로 다른 도구라는 점을 명확히 설명할 수 있습니다<br>
  • <strong>핵심 기능 파악</strong> — 원격 저장소, 협업 도구, 오픈소스, 포트폴리오라는 네 가지 역할을 이해합니다<br>
  • <strong>계정 생성</strong> — 회원가입부터 이메일 인증까지 직접 진행할 수 있습니다<br>
  • <strong>인터페이스 탐색</strong> — Dashboard, Repositories, Profile, Explore의 역할을 구분할 수 있습니다
</div>

---

## 1. GitHub란 무엇인가

[Git 기본 CLI](/dev-tools/git/3-1-3-cli-basics)에서 로컬 저장소를 다루는 법을 익혔다면, 이 문서부터는 그 저장소를 클라우드와 연결하는 GitHub 3부작이 시작됩니다.

이번 문서는 GitHub가 정확히 무엇인지 정의하고, 계정을 만들어 기본 화면 구조를 파악하는 데 집중합니다. 실제로 로컬과 연결하는 방법은 다음 문서에서 다룹니다.

GitHub는 Git을 기반으로 만들어진 클라우드 협업 플랫폼이다. 2008년 Tom Preston-Werner, Chris Wanstrath, PJ Hyett가 샌프란시스코에서 설립했으며, 지금은 전 세계에서 가장 널리 쓰이는 코드 호스팅 서비스로 자리 잡았다.

Git과 GitHub는 이름이 비슷해서 같은 것으로 오해하기 쉽지만, 실제로는 역할이 완전히 다르다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Git</div>
    내 컴퓨터에서 실행되는 <strong>버전 관리 도구</strong>입니다. 파일 변경 이력을 추적하고 커밋으로 스냅샷을 남기며, 인터넷 없이도 오프라인으로 완전히 동작합니다. CLI 명령어 중심으로 사용합니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">GitHub</div>
    Git 저장소를 클라우드에 올려 여러 사람이 함께 쓸 수 있게 만든 <strong>협업 플랫폼</strong>입니다. Pull Request, Issues 같은 협업 도구를 제공하며, 웹 브라우저 기반 GUI로 접근합니다.
  </div>
</div>

비유하자면 Git은 나만 보는 개인 노트에 가깝고, GitHub는 그 노트를 전 세계 사람들과 공유할 수 있는 블로그 플랫폼에 가깝다. 노트 자체를 쓰는 방식(Git)과 그 노트를 누구와 어떻게 공유할지(GitHub)는 서로 다른 문제다.

---

## 2. GitHub의 핵심 기능

GitHub가 제공하는 기능은 크게 네 가지로 정리할 수 있다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">원격 저장소</div><div class="wda-fcard-dsc">로컬 저장소를 클라우드에 백업해 어디서든 접근할 수 있게 합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">협업 도구</div><div class="wda-fcard-dsc">Issues로 버그와 작업을 관리하고, Pull Requests로 코드를 리뷰·병합하며, Projects로 칸반 보드 기반 일정을 관리합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">오픈소스 생태계</div><div class="wda-fcard-dsc">전 세계 프로젝트를 탐색하고 Fork·Star로 참여하거나 기여할 수 있습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">포트폴리오 역할</div><div class="wda-fcard-dsc">Contribution 그래프로 활동 내역이 시각화되어 채용 담당자에게 개발 이력을 보여줄 수 있습니다.</div></div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>여기서 자주 헷갈리는 부분이 있다. <code>git log</code>로 커밋 이력을 확인하는 것처럼 <strong>로컬 파일의 버전을 추적하는 일은 어디까지나 Git의 기능</strong>이다. GitHub는 그 기록을 클라우드에서 공유·협업하는 역할을 맡을 뿐, 로컬 버전 추적 자체를 대신하지 않는다.</p>
</div>

---

## 3. GitHub 계정 만들기

계정 생성은 아래 순서로 진행한다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">① 접속</div><div class="wda-fnode-dsc">github.com 접속</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">② Sign up</div><div class="wda-fnode-dsc">가입 버튼 클릭</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">③ 이메일</div><div class="wda-fnode-dsc">실제 사용하는 이메일 입력</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">④ 비밀번호</div><div class="wda-fnode-dsc">영문·숫자·특수문자 조합</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">⑤ 사용자명</div><div class="wda-fnode-dsc">프로필 주소가 되는 이름</div></div>
</div>

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">⑥ 수신 동의</div><div class="wda-fnode-dsc">이메일 수신 여부 선택</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">⑦ 로봇 인증</div><div class="wda-fnode-dsc">퍼즐을 풀고 Continue</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">⑧ 이메일 인증</div><div class="wda-fnode-dsc">6자리 코드 입력</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">⑨ 가입 완료</div><div class="wda-fnode-dsc">계정 생성 완료</div></div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  <p>③단계에서 입력하는 이메일은 실제로 받을 수 있는 주소여야 한다. 이메일 인증 코드를 확인해야 계정이 정상적으로 활성화되기 때문이다. 예시 문서에서는 <code>your-email@example.com</code> 같은 형태로 표기하지만, 실제 가입 시에는 본인이 사용하는 이메일을 입력해야 한다.</p>
</div>

---

## 4. 프로필 설정하기

계정 생성이 끝나면 프로필을 꾸밀 수 있다. 필수는 아니지만 아래 항목을 채워두면 도움이 된다.

**▶ 프로필 설정 항목**

<table class="wda-mtable">
<thead><tr><th>항목</th><th>설명</th></tr></thead>
<tbody>
<tr><td>프로필 사진</td><td>본인을 나타낼 이미지를 업로드합니다.</td></tr>
<tr><td>이름</td><td>닉네임 또는 실명을 설정합니다. 로그인용 username과는 별개입니다.</td></tr>
<tr><td>소개글</td><td>본인을 짧게 소개하는 문구를 작성합니다.</td></tr>
<tr><td>위치 · 웹사이트</td><td>거주 지역이나 개인 사이트 링크를 추가할 수 있습니다.</td></tr>
</tbody>
</table>

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>프로필 페이지는 채용 담당자가 GitHub에서 가장 먼저 확인하는 화면인 경우가 많다. 사진, 소개글, 링크만 깔끔하게 정리해도 프로필의 신뢰도가 눈에 띄게 올라간다.</p>
</div>

---

## 5. GitHub 인터페이스 둘러보기

처음 로그인하면 여러 메뉴가 한꺼번에 보여 낯설 수 있다. 우선 아래 네 가지 메뉴부터 익혀두면 충분하다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">Dashboard</div><div class="wda-fcard-dsc">로그인 후 처음 보이는 화면입니다. 최근 저장소 목록과 활동 피드가 표시됩니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Repositories</div><div class="wda-fcard-dsc">내가 만든 모든 저장소 목록입니다. New 버튼으로 새 저장소를 만들 수 있습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Profile</div><div class="wda-fcard-dsc">내 정보와 Contribution 그래프가 표시되는 공개 프로필 페이지입니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Explore</div><div class="wda-fcard-dsc">인기 오픈소스 프로젝트, Trending, Topics를 둘러볼 수 있는 탐색 메뉴입니다.</div></div>
</div>

저장소(Repository) 화면으로 들어가면 다시 여러 개의 탭이 보이는데, 초반에는 아래 표의 상단 세 가지(Code, Issues, Pull Requests)만 익숙해져도 충분하다.

**▶ 저장소 화면 탭별 역할**

<table class="wda-mtable">
<thead><tr><th>탭</th><th>역할</th></tr></thead>
<tbody>
<tr><td>Code</td><td>소스 코드의 폴더 구조를 보여줍니다. README.md도 이 화면에서 확인합니다.</td></tr>
<tr><td>Issues</td><td>버그 제보, 기능 요청, 질문을 남기는 게시판 역할을 합니다.</td></tr>
<tr><td>Pull Requests</td><td>코드 변경을 제안하고 리뷰하는 협업 도구입니다.</td></tr>
<tr><td>Actions</td><td>CI/CD 자동화 파이프라인을 설정하는 공간입니다.</td></tr>
<tr><td>Projects</td><td>칸반 보드 형태로 작업 카드의 흐름을 관리합니다.</td></tr>
<tr><td>Wiki</td><td>프로젝트에 대한 별도의 설명 문서를 작성하는 공간입니다.</td></tr>
</tbody>
</table>

설정 메뉴는 적용 범위가 다른 두 종류로 나뉜다. 둘 다 프로필을 클릭한 뒤 설정(Settings) 메뉴에서 찾을 수 있다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Account Settings</div>
    프로필 정보, SSH 키, 알림, 테마 등을 설정합니다. 모든 저장소에 <strong>공통으로</strong> 적용됩니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Repository Settings</div>
    저장소 이름 변경, 삭제, 기본 브랜치 지정, Collaborator 초대, 브랜치 보호 규칙 등을 설정합니다. <strong>해당 저장소에만</strong> 적용됩니다.
  </div>
</div>

마지막으로 저장소를 소유하는 단위도 두 가지로 구분된다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">개인 저장소</div>
    한 사람이 소유하는 저장소입니다. 주소는 <code>github.com/your-username/repo</code> 형태입니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Organization 저장소</div>
    팀이나 회사 단위로 저장소를 묶어 관리하는 조직입니다. 여러 사람이 하나의 조직 이름으로 저장소를 소유하고, 권한을 역할별로 나눌 수 있습니다. 주소는 <code>github.com/org-name/repo</code> 형태입니다.
  </div>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><strong>Git</strong>은 로컬에서 동작하는 버전 관리 도구이고, <strong>GitHub</strong>는 그 위에서 동작하는 클라우드 협업 플랫폼이다.</li>
    <li>GitHub의 핵심 기능은 <strong>원격 저장소, 협업 도구, 오픈소스 생태계, 포트폴리오</strong> 네 가지다.</li>
    <li>처음에는 <strong>Dashboard · Repositories · Profile</strong> 세 메뉴만 익숙해지면 충분하다.</li>
    <li><strong>Account Settings</strong>는 모든 저장소 공통, <strong>Repository Settings</strong>는 해당 저장소 전용이다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Git과 GitHub는 같은 도구이거나 GitHub가 없으면 Git도 못 쓴다?</div>
    <div class="wda-mistake-right">정답: Git은 <strong>로컬 버전 관리 도구</strong>이고 GitHub는 <strong>클라우드 협업 플랫폼</strong>이다. Git은 GitHub 없이도 오프라인에서 완전히 동작한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 로컬 파일의 버전 추적도 GitHub의 기능이다?</div>
    <div class="wda-mistake-right">정답: 파일 변경 이력을 추적하는 <code>git log</code> 같은 기능은 <strong>Git의 역할</strong>이며 로컬에서만 동작한다. GitHub는 그 기록을 클라우드에서 공유·협업하는 역할을 맡는다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 관계</div>
    <div class="wda-formula-block-body"><code>Git = 도구 · GitHub = 플랫폼</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 핵심 기능</div>
    <div class="wda-formula-block-body"><code>원격저장소 + 협업 + 오픈소스 + 포트폴리오</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 설정 범위</div>
    <div class="wda-formula-block-body"><code>Account = 전체 · Repository = 개별</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Git과 GitHub의 가장 정확한 차이는?</div>
    <div class="wda-flip-back">Git은 버전 관리 도구, GitHub는 그 위에서 동작하는 협업 플랫폼이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">로컬 파일의 버전 추적은 어디 기능인가?</div>
    <div class="wda-flip-back">Git의 기능이다. GitHub가 아니라 로컬에서 동작한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">처음 익숙해져야 할 GitHub 메뉴 세 가지는?</div>
    <div class="wda-flip-back">Dashboard, Repositories, Profile이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Account Settings와 Repository Settings의 차이는?</div>
    <div class="wda-flip-back">Account Settings는 모든 저장소에 공통 적용되고, Repository Settings는 해당 저장소에만 적용된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">개인 저장소와 Organization 저장소의 차이는?</div>
    <div class="wda-flip-back">개인 저장소는 한 사람이 소유하고, Organization 저장소는 팀·회사 단위로 소유하며 역할별 권한 분리가 가능하다.</div>
  </div>
</div>
