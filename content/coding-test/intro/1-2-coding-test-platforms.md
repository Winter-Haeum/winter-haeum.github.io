---
title: "1-2 코딩테스트 플랫폼 소개"
status: "completed"
description: "프로그래머스, 백준, LeetCode 등 주요 코딩테스트 플랫폼의 특징을 비교하고, 목표에 맞는 플랫폼을 고르는 기준을 정리한다."
category: "Coding Test"
section: "Coding Test"
tags:
  - coding-test
  - programmers
  - leetcode
  - platform
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
.wda-fcard-pro{border-left:3px solid rgba(34,197,94,.22);background:rgba(34,197,94,.02)}
.wda-fcard-con{border-left:3px solid rgba(244,129,110,.28);background:rgba(244,129,110,.025)}
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
  • <strong>주요 플랫폼 파악</strong> — 프로그래머스, 백준, LeetCode의 특징을 비교합니다<br>
  • <strong>목표별 선택 기준</strong> — 국내 취업, 해외 취업, 대회 준비 등 목표에 맞는 플랫폼을 고릅니다<br>
  • <strong>시작 방법</strong> — 첫 문제를 풀기 위한 기본 사용법을 익힙니다
</div>

---

## 1. 국내·해외 플랫폼 한눈에 보기

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">프로그래머스</div><div class="wda-fcard-dsc">카카오, 라인 등 국내 다수 기업이 채용에 사용합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">백준(BOJ)</div><div class="wda-fcard-dsc">문제 수가 가장 많은 국내 알고리즘 전문 플랫폼입니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">LeetCode</div><div class="wda-fcard-dsc">해외 빅테크 인터뷰 준비의 사실상 표준입니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">SW Expert Academy</div><div class="wda-fcard-dsc">삼성 SW 역량테스트 대비에 특화되어 있습니다.</div></div>
</div>

국내 취업이 목표라면 프로그래머스와 백준을, 해외 기업이나 국제 대회가 목표라면 LeetCode 계열을 먼저 살펴봅니다.

---

## 2. 프로그래머스

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">장점</div>
    한국어를 완벽히 지원하고, 웹에서 바로 실행되는 쾌적한 환경을 제공합니다. 카카오 등 실제 기업 기출문제도 풀어볼 수 있습니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">단점</div>
    백준에 비해 전체 문제 수가 적고, 난이도 분류가 다소 주관적으로 느껴질 수 있습니다.
  </div>
</div>

난이도는 Lv.0(입문)부터 Lv.5(상급)까지 나뉘며, 처음 시작한다면 Lv.0부터 풉니다.

---

## 3. 백준(BOJ)

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">장점</div>
    20,000개가 넘는 방대한 문제와, solved.ac이 제공하는 티어(브론즈~루비) 기반 난이도 체계를 갖추고 있습니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">단점</div>
    프로그래머스와 달리 입력을 받고 출력을 찍는 코드까지 직접 작성해야 해서, 처음에는 진입장벽이 있습니다.
  </div>
</div>

---

## 4. LeetCode

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">장점</div>
    해외 빅테크 인터뷰 준비의 표준이며, 주제별로 문제가 체계적으로 정리되어 있고 다른 사용자의 풀이를 참고할 수 있습니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">단점</div>
    모든 문제와 해설이 영어이며, 기업별 기출문제 등 일부 기능은 유료입니다.
  </div>
</div>

난이도는 Easy·Medium·Hard 3단계로 구분되며, 실제 면접에서는 Medium 난이도가 가장 자주 나옵니다.

---

## 5. 3대 플랫폼 비교

**▶ 프로그래머스·백준·LeetCode 비교**

<table class="wda-mtable">
<thead><tr><th>항목</th><th>프로그래머스</th><th>백준</th><th>LeetCode</th></tr></thead>
<tbody>
<tr><td>언어</td><td>한국어</td><td>한국어</td><td>영어</td></tr>
<tr><td>문제 수</td><td>1,000+</td><td>20,000+</td><td>3,000+</td></tr>
<tr><td>입출력 방식</td><td>함수만 작성</td><td>직접 처리</td><td>함수만 작성</td></tr>
<tr><td>난이도 체계</td><td>Lv.0~5</td><td>solved.ac 티어</td><td>Easy/Medium/Hard</td></tr>
<tr><td>기업 연계</td><td>카카오, 네이버</td><td>대회 위주</td><td>해외 빅테크</td></tr>
</tbody>
</table>

---

## 6. 목표에 맞는 선택

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">완전 입문자</div><div class="wda-fcard-dsc">프로그래머스 Lv.0부터 시작합니다. 기초 문법 연습이 더 필요하면 코드업(CodeUp)도 도움이 됩니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">국내 취업 준비생</div><div class="wda-fcard-dsc">프로그래머스 기출문제와 백준 실버~골드 난이도를 함께 준비합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">삼성 목표</div><div class="wda-fcard-dsc">SW Expert Academy 이용이 사실상 필수입니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">해외 취업 준비생</div><div class="wda-fcard-dsc">프로그래머스로 기초를 다진 뒤 LeetCode Easy → Medium 순으로 넘어갑니다.</div></div>
</div>

---

## 7. 프로그래머스 시작하기

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">1. 가입</div><div class="wda-fcard-dsc">programmers.co.kr에서 소셜 로그인으로 가입합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">2. 문제 찾기</div><div class="wda-fcard-dsc">"코딩테스트 연습" 메뉴에서 난이도를 Lv.0으로 필터링합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">3. 실행과 제출</div><div class="wda-fcard-dsc">실행은 채점에 반영되지 않는 테스트, 제출은 실제 채점입니다.</div></div>
</div>

---

## 8. ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>국내 취업은 <strong>프로그래머스 + 백준</strong>, 해외 취업은 <strong>LeetCode</strong>가 핵심 플랫폼이다.</li>
    <li>완전 입문자는 <strong>프로그래머스 Lv.0</strong>부터 시작하는 것이 정석이다.</li>
    <li>백준은 문제 수가 압도적으로 많지만, <strong>입출력을 직접 처리</strong>해야 해서 진입장벽이 있다.</li>
    <li>LeetCode는 <strong>영어 기반</strong>이며 해외 빅테크 인터뷰의 표준으로 쓰인다.</li>
    <li>삼성 취업을 목표로 한다면 <strong>SW Expert Academy</strong>를 반드시 확인해야 한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 프로그래머스와 백준 중 아무거나 먼저 시작해도 상관없다?</div>
    <div class="wda-mistake-right">정답: 완전 입문자는 UI가 쾌적하고 한국어를 지원하는 <strong>프로그래머스 Lv.0</strong>부터 시작하는 것이 정석이다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 백준도 프로그래머스처럼 함수만 작성하면 된다?</div>
    <div class="wda-mistake-right">정답: 백준은 <strong>입력과 출력을 직접 처리</strong>하는 코드까지 작성해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 해외 취업도 국내 플랫폼 연습만으로 충분하다?</div>
    <div class="wda-mistake-right">정답: 해외 빅테크는 <strong>LeetCode 기반 인터뷰</strong>가 표준이라 별도 연습이 필요하다.</div>
  </div>
</div>

**🧩 풀이 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 국내 취업 조합</div>
    <div class="wda-formula-block-body"><code>프로그래머스 + 백준</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 해외 취업 루트</div>
    <div class="wda-formula-block-body"><code>프로그래머스 → LeetCode Easy → Medium</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 삼성 목표</div>
    <div class="wda-formula-block-body"><code>SW Expert Academy</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">국내 취업을 준비한다면?</div>
    <div class="wda-flip-back">프로그래머스와 백준을 함께 준비합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">해외 취업을 준비한다면?</div>
    <div class="wda-flip-back">LeetCode 풀이가 필수이며 Easy부터 Medium 순으로 올라갑니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">완전 입문자의 시작점은?</div>
    <div class="wda-flip-back">프로그래머스 Lv.0부터 시작합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">백준의 난이도는 무엇으로 참고하나?</div>
    <div class="wda-flip-back">solved.ac의 티어(브론즈~루비) 시스템을 참고합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">삼성 취준생이 꼭 써야 하는 사이트는?</div>
    <div class="wda-flip-back">SW Expert Academy입니다.</div>
  </div>
</div>
