---
title: "(부록) 리액트 라이프사이클"
status: "completed"
description: "함수형 컴포넌트의 마운트·업데이트·언마운트 흐름을 useEffect 관점에서 정리하고, 클래스 컴포넌트 생명주기 메서드와의 대응 관계를 짧게 비교한다."
category: "React"
section: "Hooks"
tags:
  - react
  - hooks
  - lifecycle
  - useeffect
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
.wda-fcard-con{border-left:3px solid rgba(244,129,110,.28);background:rgba(244,129,110,.025)}
.wda-fcard-ttl{font-size:.94rem;font-weight:700;margin-bottom:4px}
.wda-fcard-dsc{font-size:.89rem;line-height:1.65}
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
  • <strong>3단계 흐름 이해</strong> — 마운트·업데이트·언마운트로 이어지는 컴포넌트 생명주기를 파악합니다<br>
  • <strong>Render·Commit·Effect 구분</strong> — 화면 계산, DOM 반영, effect 실행이 각각 언제 일어나는지 익힙니다<br>
  • <strong>Strict Mode 이해</strong> — 개발 모드에서 effect가 두 번 실행되는 이유를 파악합니다
</div>

---

## 1. 3단계 흐름 한눈에 보기

이 문서는 함수형 컴포넌트를 기준으로 생명주기 흐름을 정리합니다. [3-2 문서](/react/hooks/3-2-useeffect)에서 배운 useEffect가 이 흐름의 어느 시점에 실행되는지를 중심으로 설명합니다.

클래스 컴포넌트의 생명주기 메서드는 오늘날 거의 쓰이지 않지만, 기존 코드를 읽을 때를 대비해 대응 관계만 짧게 비교합니다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">Mount</div><div class="wda-fnode-dsc">처음 화면에 나타남</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">Update</div><div class="wda-fnode-dsc">props·state 변경으로 다시 그려짐</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">Unmount</div><div class="wda-fnode-dsc">화면에서 사라짐</div></div>
</div>

`HookDashboard`가 라우팅으로 화면에 나타났다가, 사용자 조작으로 내용이 바뀌고, 다른 페이지로 이동하며 사라지는 과정이 이 세 단계에 해당합니다.

---

## 2. Render, Commit, Effect

**▶ Render·Commit·Effect 단계별 역할**

<table class="wda-mtable">
<thead><tr><th>단계</th><th>내용</th></tr></thead>
<tbody>
<tr><td>Render</td><td>컴포넌트 함수를 실행해 화면에 무엇을 그릴지 계산한다.</td></tr>
<tr><td>Commit</td><td>계산된 결과를 실제 브라우저 DOM에 반영한다.</td></tr>
<tr><td>Effect</td><td>DOM 반영이 끝난 뒤 useEffect 콜백이 실행된다.</td></tr>
</tbody>
</table>

**• React: Render·Commit·Effect 실행 순서 확인**

```jsx
function HookDashboard() {
  console.log('1. Render'); // 함수 실행 시점

  useEffect(() => {
    console.log('3. Effect'); // DOM 반영 이후 실행
  }, []);

  return <p>학습 대시보드</p>; // 2. Commit으로 이어짐
}
```

화면을 먼저 사용자에게 보여준 뒤, 서버 요청 같은 부수 작업을 처리하는 순서를 보장하기 위해 Effect는 항상 Commit 이후에 실행됩니다.

---

## 3. Update 시 실행 순서

props나 state가 바뀌어 다시 렌더링될 때는, 새 effect를 실행하기 전에 **이전 effect의 cleanup**이 먼저 호출됩니다.

**• React: courseId 변경 시 cleanup·effect 실행**

```jsx
useEffect(() => {
  console.log(`구독 시작: ${courseId}`);
  return () => console.log(`구독 취소: ${courseId}`);
}, [courseId]);
```

`courseId`가 1에서 2로 바뀌면 다음 순서로 실행됩니다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1. 화면 갱신</div><div class="wda-fnode-dsc">courseId: 2로 다시 그려짐</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2. 이전 Cleanup</div><div class="wda-fnode-dsc">"구독 취소: 1"</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3. 새 Effect</div><div class="wda-fnode-dsc">"구독 시작: 2"</div></div>
</div>

---

## 4. Unmount 시 정리해야 할 것들

<div class="wda-fgrid">
  <div class="wda-fcard wda-fcard-con"><div class="wda-fcard-ttl">타이머</div><div class="wda-fcard-dsc">setInterval, setTimeout</div></div>
  <div class="wda-fcard wda-fcard-con"><div class="wda-fcard-ttl">이벤트 리스너</div><div class="wda-fcard-dsc">window.addEventListener 등</div></div>
  <div class="wda-fcard wda-fcard-con"><div class="wda-fcard-ttl">네트워크 구독</div><div class="wda-fcard-dsc">WebSocket, 실시간 구독</div></div>
</div>

컴포넌트가 사라졌는데도 정리되지 않은 타이머나 리스너는 계속 동작하며 메모리 누수나 예상치 못한 상태 업데이트를 일으킬 수 있습니다. useEffect의 cleanup 함수에서 정리합니다.

---

## 5. (참고) 클래스 생명주기 메서드와의 대응 관계

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>클래스 컴포넌트는 오늘날 새로 작성하는 코드에서는 거의 쓰이지 않지만, 기존 코드를 읽을 때를 위해 대응 관계만 짧게 정리합니다.</p>
</div>

**▶ 클래스 생명주기 메서드와 Hooks 대응 관계**

<table class="wda-mtable">
<thead><tr><th>클래스 메서드</th><th>Hooks 대응</th></tr></thead>
<tbody>
<tr><td>componentDidMount</td><td>useEffect(fn, [])</td></tr>
<tr><td>componentDidUpdate</td><td>useEffect(fn, [dep])</td></tr>
<tr><td>componentWillUnmount</td><td>useEffect 안에서 return () =&gt; { ... }</td></tr>
</tbody>
</table>

완전히 1:1로 같지는 않습니다. 클래스는 "언제(마운트/업데이트/언마운트)"를 기준으로 코드를 나누지만, Hooks는 "어떤 값이 바뀌었을 때"를 기준으로 관련 로직을 한곳에 모읍니다.

---

## 6. Strict Mode에서 두 번 실행되는 이유

개발 모드에서 `useEffect` 콘솔 로그가 두 번 찍히는 현상을 발견할 수 있습니다.

**💡 설명**

<div class="wda-callout wda-ci">
  <p>Strict Mode는 <strong>Mount → Unmount → Mount</strong>를 의도적으로 한 번 더 시뮬레이션해, cleanup이 제대로 작성됐는지 검증합니다. 개발 모드에서만 나타나며 프로덕션 빌드에서는 한 번만 실행됩니다.</p>
</div>

이 과정에서 이벤트 리스너가 중복 등록되거나 타이머가 남는다면, Strict Mode가 원인이 아니라 cleanup 코드가 빠진 것이므로 cleanup을 추가해야 합니다.

---

## 7. ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>컴포넌트 생명주기는 <strong>Mount → Update → Unmount</strong> 3단계로 이어진다.</li>
    <li>실행 순서는 <strong>Render(계산) → Commit(DOM 반영) → Effect(부수 효과)</strong>다.</li>
    <li>Update 시에는 <strong>이전 Cleanup → 새 Effect</strong> 순서로 실행된다.</li>
    <li>Unmount 시 useEffect의 cleanup 함수가 <strong>타이머·리스너·구독</strong>을 정리한다.</li>
    <li>개발 모드의 Strict Mode는 cleanup 검증을 위해 <strong>의도적으로</strong> Mount→Unmount→Mount를 반복한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Render는 화면에 바로 그려지는 단계다?</div>
    <div class="wda-mistake-right">정답: Render는 무엇을 보여줄지 <strong>계산</strong>하는 단계이고, 실제 DOM 반영은 <strong>Commit</strong> 단계에서 일어난다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: useEffect는 클래스의 생명주기 메서드와 1:1로 완전히 같다?</div>
    <div class="wda-mistake-right">정답: 비슷한 상황을 처리하지만 완전히 같지 않으며, Hooks는 <strong>"어떤 값이 바뀌었을 때"</strong>를 기준으로 생각한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 개발 모드에서 useEffect가 두 번 실행되는 건 버그다?</div>
    <div class="wda-mistake-right">정답: Strict Mode가 cleanup을 검증하려고 <strong>의도적으로</strong> 시뮬레이션하는 것이며, 프로덕션 빌드에서는 한 번만 실행된다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 전체 흐름</div>
    <div class="wda-formula-block-body"><code>Render → Commit → Effect</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · Update 순서</div>
    <div class="wda-formula-block-body"><code>이전 Cleanup → 새 Effect</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 3단계</div>
    <div class="wda-formula-block-body"><code>Mount → Update → Unmount</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">컴포넌트 생명주기 3단계는?</div>
    <div class="wda-flip-back">Mount(등장) → Update(변화) → Unmount(소멸) 순서로 진행됩니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Render와 Commit의 차이는?</div>
    <div class="wda-flip-back">Render는 화면에 무엇을 보여줄지 계산하는 단계이고, Commit은 그 결과를 실제 DOM에 반영하는 단계입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Update 시 Effect 실행 순서는?</div>
    <div class="wda-flip-back">새 화면 반영 → 이전 Effect의 Cleanup 실행 → 새 Effect 실행 순서입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Strict Mode에서 useEffect가 두 번 실행되는 이유는?</div>
    <div class="wda-flip-back">Cleanup이 제대로 작성됐는지 검증하기 위해 React가 의도적으로 Mount→Unmount→Mount를 시뮬레이션하는 개발 전용 기능입니다.</div>
  </div>
</div>
