---
title: "3-2 useEffect로 사이드 이펙트 처리하기"
status: "completed"
description: "useEffect로 외부 시스템과 컴포넌트를 동기화하는 방법을 의존성 배열, cleanup 함수, 데이터 페칭·타이머 패턴을 중심으로 정리한다."
category: "React"
section: "Hooks"
tags:
  - react
  - hooks
  - useeffect
  - side-effect
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
  • <strong>useEffect의 역할 이해</strong> — 렌더링 로직과 외부 시스템 동기화를 왜 분리해야 하는지 이해합니다<br>
  • <strong>의존성 배열 제어</strong> — <code>[]</code>, <code>[dep]</code>, 생략의 차이로 실행 시점을 다룹니다<br>
  • <strong>Cleanup과 실전 패턴</strong> — 뒷정리 함수와 데이터 페칭·타이머 패턴을 익힙니다
</div>

---

## 1. Side Effect란

useEffect는 컴포넌트를 리액트 바깥의 외부 시스템과 동기화하는 Hook입니다. state를 안전하게 바꾸는 방법은 [3-1 문서](/react/hooks/3-1-usestate)에서 다뤘습니다.

이 문서는 그 state가 바뀔 때 서버 요청이나 타이머처럼 화면 그리기 자체가 아닌 작업을 언제, 어떻게 실행할지를 다룹니다. 실행 순서를 클래스 컴포넌트 생명주기와 비교하는 자세한 내용은 부록 "리액트 라이프사이클" 문서에서 다룹니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">순수 함수</div><div class="wda-fcard-dsc">같은 입력이면 항상 같은 결과를 반환하고, 함수 바깥의 상태를 바꾸지 않습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Side Effect</div><div class="wda-fcard-dsc">서버 요청, 타이머 등록, 구독처럼 함수 바깥과 상호작용해 결과를 예측하기 어렵게 만드는 작업입니다.</div></div>
</div>

React는 컴포넌트 함수가 렌더링 중에는 순수하게 동작하기를 기대합니다. 렌더링 로직 안에서 직접 서버 요청을 보내거나 외부 값을 바꾸면 같은 props로도 실행마다 다른 결과가 나올 수 있습니다.

이런 작업은 `useEffect` 안으로 분리합니다.

---

## 2. useEffect 기본 문법

**• React: useEffect 기본 문법**

```jsx
import { useEffect } from 'react';

function HookDashboard() {
  useEffect(() => {
    console.log('렌더링 결과가 화면에 반영된 뒤 실행됨');
  }, []); // 의존성 배열

  return <p>학습 대시보드</p>;
}
```

`useEffect`는 첫 번째 인자로 실행할 콜백 함수를, 두 번째 인자로 **의존성 배열**을 받습니다. 콜백은 렌더링 결과가 화면에 반영된 뒤에 실행됩니다.

---

## 3. 의존성 배열 3가지 케이스

**▶ 의존성 배열 3가지 케이스**

<table class="wda-mtable">
<thead><tr><th>형태</th><th>실행 시점</th></tr></thead>
<tbody>
<tr><td><code>[]</code></td><td>마운트 시 1회만 실행</td></tr>
<tr><td><code>[keyword]</code></td><td>마운트 시 + <code>keyword</code>가 바뀔 때마다 실행</td></tr>
<tr><td>생략</td><td>매 렌더링마다 실행 (의도적인 경우가 아니면 피함)</td></tr>
</tbody>
</table>

**• React: keyword 의존성으로 effect 실행하기**

```jsx
function LearningFetcher({ keyword }) {
  useEffect(() => {
    console.log('keyword가 바뀔 때마다 실행:', keyword);
  }, [keyword]);

  return null;
}
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>의존성 배열을 생략하고 effect 안에서 state를 바꾸면 무한 루프에 빠질 수 있습니다.</strong> effect 실행 → state 변경 → 재렌더링 → effect 재실행이 반복되기 때문입니다. 의도적으로 매번 실행해야 하는 경우가 아니라면 항상 배열을 명시합니다.</p>
</div>

---

## 4. Cleanup 함수

`useEffect` 콜백이 함수를 **반환**하면, 그 함수는 다음 effect가 실행되기 직전과 컴포넌트가 사라질 때 호출됩니다.

**• React: setInterval과 cleanup 함수**

```jsx
function TimerBox() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => {
      clearInterval(id); // cleanup: 다음 effect 실행 전 또는 unmount 시 호출됨
    };
  }, []);

  return <p>{seconds}초</p>;
}
```

**💡 설명**

<div class="wda-callout wda-ci">
  <p>Cleanup은 컴포넌트가 사라질 때만 실행되는 것이 아닙니다. 의존성 값이 바뀌어 <strong>새 effect가 다시 실행되기 직전</strong>에도 이전 effect의 cleanup이 먼저 호출됩니다. 타이머를 해제하지 않으면 이전 타이머가 계속 남아 있는 상태로 새 타이머가 하나 더 생깁니다.</p>
</div>

---

## 5. 데이터 페칭 패턴

**• React: courseId로 데이터 페칭하기**

```jsx
function LearningFetcher({ courseId }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`/api/courses/${courseId}`)
      .then(res => {
        if (!res.ok) throw new Error('요청 실패');
        return res.json();
      })
      .then(json => setData(json))
      .catch(err => setError(err))
      .finally(() => setIsLoading(false));
  }, [courseId]); // courseId가 바뀌면 다시 요청

  if (isLoading) return <p>불러오는 중...</p>;
  if (error) return <p>오류가 발생했습니다.</p>;
  return <p>{data?.title}</p>;
}
```

서버 데이터를 다루는 effect는 보통 **isLoading·error·data** 세 가지 상태를 함께 관리합니다. `courseId`가 바뀌면 의존성 배열이 이를 감지해 새 데이터를 다시 요청합니다.

---

## 6. 흔한 실수

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>의존성 배열에 있는 값을 effect 내부에서 바꾸는 경우</strong></p>
  <p>예를 들어 <code>[count]</code>를 의존성으로 둔 effect 안에서 <code>setCount(count + 1)</code>을 호출하면, count가 바뀔 때마다 effect가 다시 실행되고 effect가 다시 count를 바꾸는 무한 루프에 빠집니다.</p>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>effect 안에서 쓰는 값을 의존성 배열에서 빠뜨리는 경우</strong></p>
  <p><code>keyword</code>를 읽는 effect인데 의존성 배열에 <code>keyword</code>를 넣지 않으면, 값이 바뀌어도 effect가 예전 값을 계속 참조하는 stale closure 버그가 생깁니다. <code>eslint-plugin-react-hooks</code>의 <code>exhaustive-deps</code> 규칙으로 예방할 수 있습니다.</p>
</div>

---

## 7. ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>서버 요청, 타이머, 구독처럼 화면 계산과 무관한 작업은 <strong>useEffect</strong> 안에서 처리한다.</li>
    <li>의존성 배열 <code>[]</code>은 <strong>마운트 시 1회</strong>, <code>[dep]</code>은 <strong>dep이 바뀔 때</strong>, 생략은 <strong>매 렌더링마다</strong> 실행된다.</li>
    <li>effect 안에서 함수를 <code>return</code>하면 그 함수가 <strong>Cleanup</strong>이 되어 다음 effect 직전과 unmount 시 실행된다.</li>
    <li>데이터 페칭은 <strong>isLoading·error·data</strong> 세 상태를 함께 관리하는 것이 기본이다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 의존성 배열을 생략하면 그냥 한 번 더 실행되는 정도다?</div>
    <div class="wda-mistake-right">정답: 생략하면 <strong>매 렌더링마다</strong> 실행되며, effect 안에서 state를 바꾸면 무한 루프로 이어질 수 있다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Cleanup은 컴포넌트가 사라질 때만 실행된다?</div>
    <div class="wda-mistake-right">정답: 의존성 값이 바뀌어 <strong>새 effect가 실행되기 직전</strong>에도 이전 effect의 cleanup이 먼저 호출된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: effect 안에서 쓰는 값을 의존성 배열에 안 넣어도 항상 최신 값을 본다?</div>
    <div class="wda-mistake-right">정답: 의존성을 빠뜨리면 클로저가 <strong>과거 값</strong>을 참조하는 stale closure 버그가 생긴다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 의존성 배열</div>
    <div class="wda-formula-block-body"><code>[] = 1회 / [dep] = 변경 시 / 생략 = 매번</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 실행 순서</div>
    <div class="wda-formula-block-body"><code>Effect → (다음 렌더 전) Cleanup</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 페칭 상태</div>
    <div class="wda-formula-block-body"><code>isLoading · error · data</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">useEffect의 의존성 배열을 빈 배열([])로 두면 언제 실행되나요?</div>
    <div class="wda-flip-back">컴포넌트가 처음 화면에 나타날 때(마운트) 딱 한 번만 실행됩니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Cleanup 함수는 언제 호출되나요?</div>
    <div class="wda-flip-back">의존성 값이 바뀌어 다음 effect가 실행되기 직전, 그리고 컴포넌트가 사라질 때 호출됩니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">의존성 배열에 있는 값을 effect 내부에서 바꾸면 어떤 문제가 생기나요?</div>
    <div class="wda-flip-back">값이 바뀌어 effect가 다시 실행되고, effect가 다시 값을 바꾸는 무한 루프에 빠질 수 있습니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">데이터 페칭 effect에서 기본적으로 함께 관리하는 세 상태는?</div>
    <div class="wda-flip-back">isLoading, error, data 세 가지를 함께 관리하는 것이 기본 패턴입니다.</div>
  </div>
</div>
