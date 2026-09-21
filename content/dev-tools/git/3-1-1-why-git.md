---
title: "1-1 Git이 왜 필요한가요?"
category: "frontend"
section: "git"
date: "2026-08-02"
status: "completed"
description: "파일명으로 버전을 관리할 때 생기는 문제와 Git이 탄생한 배경, 중앙집중형·분산형 VCS의 차이를 정리한다."
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
  • <strong>버전 관리 필요성 이해</strong> — 파일명으로 버전을 관리하는 방식이 왜 한계에 부딪히는지 설명할 수 있다.<br>
  • <strong>Git의 역사 파악</strong> — Linus Torvalds가 Git을 만든 배경과 짧은 탄생 과정을 설명할 수 있다.<br>
  • <strong>VCS 유형 비교</strong> — 중앙집중형과 분산형 버전관리시스템의 구조와 장단점을 비교할 수 있다.<br>
  • <strong>Git의 필수성 이해</strong> — 현재 개발 생태계에서 Git이 표준 도구로 자리잡은 이유를 설명할 수 있다.
</div>

---

## 1. 버전 관리 없이 파일을 관리하면 생기는 일

Git 챕터의 첫 문서로, 코드 명령어보다 "왜 Git을 쓰는가"에 집중한다.

버전 관리가 없을 때 생기는 문제, Git이 만들어진 배경, 그리고 Git이 속한 분산형 버전관리시스템(DVCS)이 중앙집중형 방식과 어떻게 다른지를 다룬다. 실제 명령어와 Git 내부 구조는 다음 문서인 3-1-2, 3-1-3에서 이어서 다룬다.

새 프로젝트를 시작할 때 많은 사람이 처음 선택하는 방법은 폴더를 통째로 복사해 이름을 바꿔가며 저장하는 것이다.

**• 파일명으로 버전을 구분하는 방식**

```text
project.zip
project_v2.zip
project_최종.zip
project_진짜최종.zip
project_final_진짜최종_0510.zip
```

이런 파일명 기반 관리 방식은 처음 몇 번은 그럭저럭 버틴다. 하지만 파일 수가 늘어날수록 아래 세 가지 문제가 반드시 발생한다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">최신 버전을 알 수 없다</div><div class="wda-fcard-dsc">"진짜최종"과 "최종" 중 무엇이 더 나중에 수정된 파일인지 파일명만으로는 판단할 수 없다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">무엇이 바뀌었는지 추적할 수 없다</div><div class="wda-fcard-dsc">두 버전 사이에 어떤 줄이 추가되고 삭제됐는지 폴더를 열어 하나씩 비교하지 않으면 알 방법이 없다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">저장 공간이 낭비된다</div><div class="wda-fcard-dsc">거의 동일한 내용의 폴더를 버전마다 통째로 복사해 저장하므로 용량이 계속 불어난다.</div></div>
</div>

혼자 작업할 때도 불편하지만, 여러 명이 같은 프로젝트를 함께 수정하는 순간 문제는 훨씬 커진다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">충돌 발생</div><div class="wda-fcard-dsc">두 사람이 동시에 같은 파일을 수정하면 어느 버전을 기준으로 합쳐야 할지 결정하기 어렵다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">변경 이력 추적 불가</div><div class="wda-fcard-dsc">누가, 언제, 왜 이 부분을 수정했는지 기록이 남지 않아 원인 파악이 오래 걸린다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">복구 불가능</div><div class="wda-fcard-dsc">새로 수정한 내용에서 버그가 생겨도 정상적으로 동작하던 예전 상태로 되돌아갈 방법이 없다.</div></div>
</div>

---

## 2. 버전관리시스템(VCS)이 해결하는 것

버전관리시스템(Version Control System, VCS)은 파일의 변경 이력을 체계적으로 기록하고 관리하는 시스템이다. 파일명을 바꾸는 대신, 시스템이 "언제, 무엇이 바뀌었는지"를 자동으로 기록해준다.

**▶ VCS가 해결하는 문제**

<table class="wda-mtable">
<thead><tr><th>VCS가 해결하는 것</th><th>내용</th></tr></thead>
<tbody>
<tr><td>변경 이력 추적</td><td>어떤 줄이 언제 추가·삭제·수정됐는지 기록으로 남는다.</td></tr>
<tr><td>이전 버전 복구</td><td>문제가 생기면 원하는 시점의 상태로 즉시 되돌릴 수 있다.</td></tr>
<tr><td>협업 충돌 방지</td><td>여러 사람이 동시에 수정해도 변경 내역을 비교해 병합할 수 있다.</td></tr>
<tr><td>커밋 메시지 관리</td><td>변경마다 의도를 남겨, 나중에 왜 수정했는지 맥락을 파악할 수 있다.</td></tr>
</tbody>
</table>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>커밋 메시지 관리는 VCS가 제공하는 기능일 뿐, 메시지 품질은 결국 사용자 몫이다. <code>"수정"</code>, <code>"수정2"</code>처럼 의미 없는 메시지는 이력을 남기는 것 자체를 무의미하게 만든다. 무엇을 왜 바꿨는지 알 수 있는 문장으로 작성하는 습관이 중요하다.</p>
</div>

---

## 3. Git은 어떻게 탄생했을까

Git을 만든 사람은 리눅스 커널의 창시자이기도 한 <strong>Linus Torvalds</strong>다. 그가 만든 리눅스는 전 세계 서버의 90% 이상, 대부분의 안드로이드 스마트폰, 심지어 화성 탐사선에도 쓰이는 운영체제다.

2005년 이전까지 리눅스 커널 개발팀은 BitKeeper라는 상용(유료) 버전관리시스템을 무료로 빌려 쓰고 있었다. 그런데 2005년 3월, BitKeeper 측이 무료 사용을 중단하겠다고 발표하면서 리눅스 커널 프로젝트는 버전관리 도구 없이 개발을 이어가야 하는 위기에 놓였다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">2005년 3월</div><div class="wda-fnode-dsc">BitKeeper 무료 사용 중단 발표</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2005년 4월 3일</div><div class="wda-fnode-dsc">Linus Torvalds, Git 개발 시작</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2005년 4월 7일</div><div class="wda-fnode-dsc">Git으로 Git 자체를 관리하는<br>첫 자체 호스팅 성공</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2005년 6월</div><div class="wda-fnode-dsc">리눅스 커널이<br>Git으로 전환 완료</div></div>
</div>

개발 시작부터 자체 호스팅까지 걸린 시간은 단 4일, 리눅스 커널 전체가 Git으로 넘어가기까지 걸린 시간은 약 두 달이었다. 이후 Git은 계속 발전해 지금은 세계에서 가장 널리 쓰이는 버전관리시스템이 되었다.

Git을 설계할 때 Linus Torvalds가 세운 목표는 뚜렷했다.

**▶ Git 설계 목표**

<table class="wda-mtable">
<thead><tr><th>설계 목표</th><th>내용</th></tr></thead>
<tbody>
<tr><td>속도</td><td>대부분의 작업을 로컬에서 처리해 즉각적으로 반응한다.</td></tr>
<tr><td>분산형 구조</td><td>중앙 서버 없이도 각자가 전체 이력을 가질 수 있다.</td></tr>
<tr><td>대규모 프로젝트 지원</td><td>리눅스 커널처럼 파일 수가 많은 프로젝트도 감당할 수 있다.</td></tr>
<tr><td>데이터 무결성</td><td>저장된 이력이 훼손되지 않았는지 항상 검증할 수 있다.</td></tr>
</tbody>
</table>

**💡 설명**

<div class="wda-callout wda-ci">
  <p><strong>Git이라는 이름은 사실 영국 속어로 "멍청이"에 가까운 뜻이다.</strong> 공식적으로는 Global Information Tracker의 약자로 풀이하지만, Linus Torvalds 본인은 농담 삼아 "내가 만든 프로젝트에는 항상 내 이름을 붙인다"는 식으로 자신을 가리키는 말이라고 언급한 적이 있다.</p>
</div>

---

## 4. 중앙집중형 VCS vs 분산형 VCS

Git을 제대로 이해하려면 버전관리시스템을 크게 두 방식으로 나눠 비교해봐야 한다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">중앙집중형 VCS (SVN, CVS)</div>
    중앙 서버 한 곳에 전체 이력을 저장하고, 사용자는 필요할 때마다 서버에 접속해 작업한다.<br><br>
    <strong>장점</strong> — 한 곳에서 관리하므로 접근 권한 통제가 단순하고, 구조를 이해하기 쉽다.<br>
    <strong>단점</strong> — 서버가 다운되면 작업 자체가 불가능하고, 매 작업마다 네트워크가 필요해 느리다. 서버에 장애가 생기면 전체 이력이 손실될 위험도 있다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">분산형 VCS (Git, Mercurial)</div>
    개발자 각자가 전체 이력을 자신의 컴퓨터(로컬)에 그대로 복제해두고, 필요할 때만 원격 저장소와 동기화한다.<br><br>
    <strong>장점</strong> — 로컬에서 작업하므로 속도가 매우 빠르고, 오프라인에서도 작업할 수 있으며, 서버에 문제가 생겨도 각자의 로컬 저장소가 안전하게 남는다.<br>
    <strong>단점</strong> — 전체 이력을 각자 저장하므로 더 많은 저장 공간이 필요하고, 개념이 많아 처음 배울 때 진입 장벽이 있다.
  </div>
</div>

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>분산형 구조의 장점을 보여주는 대표적인 사례가 있다. 원격 서버가 화재로 소실된 상황에서도, 개발자 한 명의 로컬 저장소에 전체 커밋 이력이 그대로 남아 있어 프로젝트를 그대로 복구한 사례가 실제로 있었다. 이력이 서버 한 곳에만 있지 않다는 점이 분산형 VCS의 핵심 강점이다.</p>
</div>

---

## 5. 왜 지금도 Git을 배워야 하는가

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">압도적인 속도</div><div class="wda-fcard-dsc">로컬 작업이라 네트워크 지연이 없다. SVN에서 몇 분 걸리는 브랜치 생성이, Git에서는 포인터만 옮기면 되어 0.1초 수준이다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">거대한 생태계</div><div class="wda-fcard-dsc">GitHub, GitLab 등 Git 기반 플랫폼에 전 세계 개발자가 모여 있다. GitHub만 해도 1억 명이 넘는 개발자와 4억 개가 넘는 저장소가 있다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">대규모 프로젝트 검증</div><div class="wda-fcard-dsc">리눅스 커널처럼 거대한 코드베이스를 실제로 안정적으로 관리해온 도구다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">가벼운 브랜치</div><div class="wda-fcard-dsc">브랜치 생성 비용이 거의 없어 마음껏 만들고 지울 수 있고, 병합 전략을 활용하면 메인 코드를 건드리지 않고 여러 작업을 동시에 진행할 수 있다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">압도적인 사용률</div><div class="wda-fcard-dsc">전체 개발자의 약 94%가 Git을 사용하고, 오픈소스 프로젝트의 약 90%가 Git 기반일 만큼 사실상 표준 도구로 자리잡았다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">오픈소스이자 무료</div><div class="wda-fcard-dsc">개인 개발자부터 대기업까지 라이선스 비용 없이 누구나 무료로 사용할 수 있다.</div></div>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>파일명으로 버전을 관리하면 <strong>최신 버전 판단, 변경 추적, 저장 공간</strong> 세 가지 문제가 반드시 발생한다.</li>
    <li>Git은 2005년 <strong>Linus Torvalds</strong>가 만든 <strong>분산형</strong> 버전관리시스템이다.</li>
    <li><strong>중앙집중형</strong>은 서버 한 곳에, <strong>분산형</strong>은 각 개발자 로컬에 전체 이력을 저장한다.</li>
    <li>Git은 로컬 작업 기반이라 <strong>속도가 빠르고</strong> GitHub 같은 거대한 생태계를 갖고 있다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Git과 GitHub는 같은 것이다?</div>
    <div class="wda-mistake-right">정답: <strong>Git</strong>은 버전관리시스템(도구) 자체이고, <strong>GitHub</strong>는 그 Git 저장소를 온라인에 올려 공유·협업하게 해주는 플랫폼이다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 분산형 VCS는 서버 없이는 아무것도 못 한다?</div>
    <div class="wda-mistake-right">정답: 분산형은 오히려 <strong>로컬에 전체 이력이 있어 오프라인에서도 커밋, 이력 조회 등 대부분의 작업</strong>이 가능하다. 서버(원격 저장소)는 동기화할 때만 필요하다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · VCS의 역할</div>
    <div class="wda-formula-block-body"><code>VCS = 변경 이력 추적 + 이전 버전 복구 + 협업 충돌 방지</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · Git의 정체</div>
    <div class="wda-formula-block-body"><code>Git = 분산형 VCS + 빠른 속도 + 무료 오픈소스</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 구조 차이</div>
    <div class="wda-formula-block-body"><code>중앙집중형 = 서버 1곳 · 분산형 = 로컬마다 전체 복제</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Git을 개발한 사람은?</div>
    <div class="wda-flip-back">Linus Torvalds. 리눅스 커널을 만든 사람이기도 하다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Git은 어떤 방식의 버전관리시스템인가?</div>
    <div class="wda-flip-back">분산형(Distributed) VCS다. 각 개발자가 전체 이력을 로컬에 갖는다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Git이 탄생한 직접적인 계기는?</div>
    <div class="wda-flip-back">2005년 BitKeeper의 무료 사용 중단 발표로 리눅스 커널이 새 VCS가 필요해졌기 때문이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">중앙집중형 VCS의 가장 큰 약점은?</div>
    <div class="wda-flip-back">서버가 다운되거나 손상되면 작업이 멈추거나 전체 이력을 잃을 위험이 있다는 점이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Git에서 브랜치 생성이 SVN보다 훨씬 빠른 이유는?</div>
    <div class="wda-flip-back">브랜치가 무거운 복제본이 아니라 가벼운 포인터이기 때문이다.</div>
  </div>
</div>
