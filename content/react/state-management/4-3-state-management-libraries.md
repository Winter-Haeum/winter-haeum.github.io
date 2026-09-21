---
title: "4-3 전역 상태 관리 라이브러리"
status: "completed"
description: "Context API가 감당하기 어려워지는 지점에서 Redux·Zustand·Recoil·Jotai가 각각 어떤 아이디어로 전역 상태를 다루는지 개념 수준에서 비교하고, 클라이언트 상태와 서버 상태를 구분하는 기준을 정리한다."
category: "React"
section: "State Management"
tags:
  - react
  - state-management
  - redux
  - zustand
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
  • <strong>도입 시점 이해</strong> — Context API가 부족해지는 지점을 파악합니다<br>
  • <strong>개념 비교</strong> — Redux·Zustand·Recoil·Jotai가 각각 어떤 아이디어로 접근하는지 비교합니다<br>
  • <strong>상태 구분</strong> — 클라이언트 상태와 서버 상태를 구분하는 기준을 이해합니다
</div>

---

## 1. Context API가 부족해지는 시점

이 문서는 전역 상태 관리 라이브러리를 설치·코드 수준이 아니라 개념 수준에서 비교합니다. [4-1](/react/state-management/4-1-usecontext), [4-2 문서](/react/state-management/4-2-usereducer)에서 다룬 Context와 useReducer만으로도 대부분의 소규모 프로젝트는 충분합니다.

실제 설치 명령어나 API 사용법은 각 라이브러리의 공식 문서를 참고합니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">Provider 중첩</div><div class="wda-fcard-dsc">공유할 값의 종류가 늘어날수록 Provider를 겹겹이 쌓아야 합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">리렌더링 범위</div><div class="wda-fcard-dsc">Context 값이 바뀌면 그 값을 구독하는 모든 컴포넌트가 다시 렌더링됩니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">비동기 처리</div><div class="wda-fcard-dsc">Context 자체에는 비동기 요청을 다루는 표준 방법이 없습니다.</div></div>
</div>

이런 지점에서 전역 상태 관리 라이브러리 도입을 고려합니다.

---

## 2. 주요 라이브러리 핵심 아이디어 비교

**▶ Redux·Zustand·Recoil/Jotai 핵심 아이디어**

<table class="wda-mtable">
<thead><tr><th>라이브러리</th><th>핵심 아이디어</th></tr></thead>
<tbody>
<tr><td>Redux</td><td>모든 상태를 하나의 저장소(Store)에 두고, action → reducer를 거쳐야만 바꿀 수 있는 단방향 흐름</td></tr>
<tr><td>Zustand</td><td>Provider 없이 Hook 형태로 저장소를 만들고, 필요한 값만 구독하는 가벼운 방식</td></tr>
<tr><td>Recoil / Jotai</td><td>상태를 원자(Atom) 단위로 잘게 쪼개 필요한 컴포넌트가 각자 구독하는 상향식 방식</td></tr>
</tbody>
</table>

**💡 설명**

<div class="wda-callout wda-ci">
  <p>Redux는 <strong><a href="/react/state-management/4-2-usereducer">4-2 문서</a>에서 배운 reducer 패턴</strong>을 앱 전체 단위로 확장한 것과 개념적으로 비슷합니다. action을 dispatch하면 reducer가 새 상태를 계산하고, 그 상태를 구독하는 컴포넌트가 갱신됩니다.</p>
</div>

---

## 3. 클라이언트 상태 vs 서버 상태

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">클라이언트 상태</div>
    모달 열림 여부, 테마, 입력값처럼 화면 자체의 상태. Context, useReducer, Redux, Zustand가 다루는 영역입니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">서버 상태</div>
    DB에서 가져온 게시글 목록, 사용자 정보처럼 서버가 원본을 가진 데이터. 캐싱·재요청·로딩 상태 관리가 필요해 TanStack Query 같은 전용 도구를 별도로 씁니다.
  </div>
</div>

두 상태를 같은 도구로 관리하려고 하면 캐싱이나 자동 갱신 같은 서버 상태 특유의 요구사항을 직접 구현해야 해서 코드가 복잡해집니다.

---

## 4. 선택 기준

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">작은 프로젝트</div><div class="wda-fcard-dsc">Context + useReducer로 시작해도 충분한 경우가 많습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">상태가 자주 얽히는 프로젝트</div><div class="wda-fcard-dsc">Zustand처럼 가벼운 도구나, 팀이 이미 익숙한 Redux를 고려합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">서버 데이터가 많은 프로젝트</div><div class="wda-fcard-dsc">클라이언트 상태 도구와 별개로 TanStack Query 같은 서버 상태 전용 도구를 함께 사용합니다.</div></div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>전역 상태가 로그인 정보나 테마 정도라면 무거운 라이브러리를 바로 도입할 필요는 없습니다. Context와 useReducer의 조합만으로 충분한 경우가 많으며, 상태가 실제로 복잡하게 얽히기 시작할 때 라이브러리 도입을 검토해도 늦지 않습니다.</p>
</div>

---

## 5. ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>Context API는 <strong>Provider 중첩</strong>과 <strong>구독 범위 전체 리렌더링</strong> 문제로 규모가 커지면 한계가 생긴다.</li>
    <li><strong>Redux</strong>는 단방향 흐름(action → reducer → store), <strong>Zustand</strong>는 Provider 없는 가벼운 Hook 방식이다.</li>
    <li><strong>Recoil/Jotai</strong>는 Atom 단위로 상태를 쪼개는 상향식 접근이다.</li>
    <li><strong>클라이언트 상태</strong>(UI)와 <strong>서버 상태</strong>(API 데이터)는 서로 다른 도구로 분리해서 관리하는 것이 최신 흐름이다.</li>
    <li>처음엔 <strong>Context + useReducer</strong>로 시작하고, 필요할 때 라이브러리를 점진적으로 도입한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Redux와 useReducer는 완전히 다른 개념이다?</div>
    <div class="wda-mistake-right">정답: Redux는 <strong>reducer 패턴</strong>을 앱 전체 단위로 확장한 것으로, action/dispatch/reducer 개념을 공유한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 서버에서 가져온 데이터도 클라이언트 상태 도구로 관리하는 게 정석이다?</div>
    <div class="wda-mistake-right">정답: 서버 상태는 캐싱·자동 갱신이 필요해 <strong>전용 도구로 분리</strong>하는 것이 최신 트렌드다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 상태 관리 라이브러리는 프로젝트 시작부터 무조건 도입해야 한다?</div>
    <div class="wda-mistake-right">정답: 처음엔 <strong>Context + useReducer</strong>로 시작하고, 필요해질 때 점진적으로 도입하는 것이 좋다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · Redux 방식</div>
    <div class="wda-formula-block-body"><code>action → reducer → store</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 상태 분리</div>
    <div class="wda-formula-block-body"><code>클라이언트 상태 ≠ 서버 상태</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 도입 순서</div>
    <div class="wda-formula-block-body"><code>Context+useReducer 먼저 → 필요시 라이브러리</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Redux의 핵심 흐름은?</div>
    <div class="wda-flip-back">action이 dispatch되면 reducer가 새 상태를 계산해 store에 반영하는 단방향 흐름입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Zustand가 Redux와 다른 점은?</div>
    <div class="wda-flip-back">Provider로 앱을 감쌀 필요 없이 Hook 형태로 저장소를 만들고 필요한 값만 구독합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">클라이언트 상태와 서버 상태를 나누는 이유는?</div>
    <div class="wda-flip-back">서버 상태는 캐싱·자동 갱신·로딩 처리가 필요해 전용 도구로 분리하는 것이 효율적이기 때문입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">상태 관리 라이브러리는 언제 도입하는 게 좋을까요?</div>
    <div class="wda-flip-back">처음엔 Context + useReducer로 시작하고, 상태가 복잡해질 때 점진적으로 도입합니다.</div>
  </div>
</div>
