---
title: "3-3 useRef 사용하기"
status: "completed"
description: "렌더링을 유발하지 않고 값을 저장하는 useRef의 문법과 DOM 요소 접근, 이전 값 보관, useState와의 선택 기준을 정리한다."
category: "React"
section: "Hooks"
tags:
  - react
  - hooks
  - useref
  - dom
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
  • <strong>useRef 문법</strong> — <code>{ current: 값 }</code> 형태의 저장소를 만들고 다루는 방법을 익힙니다<br>
  • <strong>DOM 요소 접근</strong> — <code>ref</code>로 실제 DOM에 접근해 focus 같은 브라우저 API를 호출합니다<br>
  • <strong>useState vs useRef</strong> — 화면 갱신이 필요한 값과 아닌 값을 구분하는 기준을 세웁니다
</div>

---

## 1. useRef 기본 문법

useRef는 렌더링을 유발하지 않고 값을 저장하거나, DOM 요소에 직접 접근할 때 쓰는 Hook입니다. 화면에 보여줄 값은 [3-1 문서](/react/hooks/3-1-usestate)에서 다룬 useState로 관리합니다.

이 문서는 화면에는 안 보여줘도 되지만 컴포넌트가 계속 기억해야 하는 값, 그리고 DOM 요소를 직접 다뤄야 하는 상황을 다룹니다.

**• React: useRef 기본 문법**

```jsx
import { useRef } from 'react';

function HookDashboard() {
  const countRef = useRef(0); // { current: 0 } 객체 생성

  const handleClick = () => {
    countRef.current += 1; // .current로 읽고 씀
    console.log(countRef.current); // 값은 바뀌지만 화면은 갱신되지 않음
  };

  return <button onClick={handleClick}>기록</button>;
}
```

`useRef(초기값)`은 항상 `{ current: 초기값 }` 형태의 객체를 반환합니다. 값을 읽거나 바꿀 때는 반드시 `.current`를 거쳐야 하며, `.current`를 바꿔도 리렌더링은 일어나지 않습니다.

---

## 2. DOM 요소 접근하기

`ref` 속성에 ref 객체를 연결하면, React가 화면에 해당 태그를 그릴 때 실제 DOM 요소를 `.current`에 넣어줍니다.

**• React: ref로 DOM input에 focus하기**

```jsx
function SearchPanel() {
  const inputRef = useRef(null);

  const handleFocusClick = () => {
    inputRef.current?.focus(); // 실제 input DOM에 focus() 호출
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button type="button" onClick={handleFocusClick}>검색창 포커스</button>
    </div>
  );
}
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>DOM이 아직 연결되기 전에는 <code>ref.current</code>가 <code>null</code>일 수 있습니다.</strong> <code>inputRef.current?.focus()</code>처럼 존재 여부를 확인하는 방식이 안전합니다.</p>
</div>

마운트되자마자 자동으로 포커스를 주고 싶다면, [3-2 문서](/react/hooks/3-2-useeffect)에서 다룬 useEffect와 조합합니다.

**• React: 마운트 시 자동 focus하기**

```jsx
function FocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus(); // 화면에 input이 그려진 뒤 실행됨
  }, []);

  return <input ref={inputRef} type="text" placeholder="검색어를 입력하세요" />;
}
```

---

## 3. 렌더링을 유발하지 않는 값 저장

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">useState</div>
    값이 바뀌면 재렌더링이 예약되어 화면이 다시 그려집니다. 화면에 보여줄 값에 사용합니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">useRef</div>
    값이 바뀌어도 리렌더링을 유발하지 않습니다. 화면에 표시할 필요 없는 내부 값에 사용합니다.
  </div>
</div>

일반 변수(`let`)는 컴포넌트가 리렌더링될 때마다 새로 초기화되어 값을 유지할 수 없습니다. `useRef`는 리렌더링되어도 값이 사라지지 않으면서, 값이 바뀌어도 화면을 다시 그리지 않는 유일한 저장소입니다.

---

## 4. 이전 값 보관하기

`useEffect`가 렌더링이 끝난 뒤 실행된다는 점을 이용하면, 현재 값을 ref에 저장해 "직전 값"을 기억할 수 있습니다.

**• React: useRef로 이전 값 기억하기**

```jsx
function SearchPanel() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const previousKeywordRef = useRef('');

  useEffect(() => {
    // 렌더링이 끝난 뒤 현재 값을 ref에 저장 → 다음 렌더링에서는 '직전 값'이 됨
    previousKeywordRef.current = searchKeyword;
  }, [searchKeyword]);

  return (
    <div>
      <p>현재 검색어: {searchKeyword}</p>
      <p>이전 검색어: {previousKeywordRef.current}</p>
      <input value={searchKeyword} onChange={e => setSearchKeyword(e.target.value)} />
    </div>
  );
}
```

렌더링 시점에는 아직 effect가 실행되기 전이므로, 화면에 표시되는 `previousKeywordRef.current`는 이번 렌더링이 아닌 **직전 렌더링**에서 저장된 값입니다.

---

## 5. 렌더링과 무관한 변수 저장 — 타이머 ID

`setInterval`이 반환하는 타이머 ID처럼, 화면에 보여줄 필요는 없지만 나중에 꼭 필요한 값을 저장할 때도 `useRef`를 사용합니다.

**• React: useRef로 타이머 ID 저장하기**

```jsx
function TimerBox() {
  const [seconds, setSeconds] = useState(0);
  const timerIdRef = useRef(null);

  const start = () => {
    if (timerIdRef.current !== null) return;
    timerIdRef.current = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(timerIdRef.current);
    timerIdRef.current = null;
  };

  return (
    <div>
      <p>{seconds}초</p>
      <button type="button" onClick={start}>시작</button>
      <button type="button" onClick={stop}>정지</button>
    </div>
  );
}
```

**💡 설명**

<div class="wda-callout wda-ci">
  <p><code>let</code> 변수로 타이머 ID를 저장하면, 화면이 매초 다시 그려질 때 변수가 초기화되어 <code>stop</code>이 멈춰야 할 타이머를 찾지 못합니다. <code>timerIdRef</code>는 리렌더링과 무관하게 값을 유지하므로 이런 문제가 없습니다.</p>
</div>

---

## 6. useState vs useRef 선택 기준

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p><strong>결정 기준: "이 값이 바뀌었을 때 화면이 다시 그려져야 하는가?"</strong></p>
  <p>YES 👉 useState (검색어, 선택된 필터, 목록 데이터)<br>NO 👉 useRef (타이머 ID, DOM 요소, 이전 값 기록)</p>
</div>

---

## 7. 초보자 실수

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>ref.current를 바꾸고 화면이 바로 바뀌길 기대하는 경우</strong></p>
  <p><code>countRef.current += 1</code>은 값은 정확히 바뀌지만, React에게 "다시 그려라"는 신호를 보내지 않으므로 화면의 숫자는 그대로 남습니다. 화면에 표시해야 하는 값이라면 useState를 써야 합니다.</p>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>렌더링 로직(함수 본문)에서 ref.current를 직접 바꾸는 경우</strong></p>
  <p>컴포넌트 함수가 실행되는 도중(Render Phase)에 <code>ref.current</code>를 바꾸면 예측하기 어려운 동작으로 이어질 수 있습니다. ref 값은 항상 이벤트 핸들러나 useEffect 안에서만 변경합니다.</p>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  <p><strong>참고</strong>: 자식 컴포넌트가 자신의 내부 DOM을 부모에게 공개해야 하는 경우 <code>forwardRef</code>라는 별도 API가 쓰입니다. 이 문서에서는 다루지 않습니다.</p>
</div>

---

## 8. ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>useRef는 <strong>렌더링을 유발하지 않고</strong> 값을 저장하며, 값은 <code>.current</code>로 읽고 쓴다.</li>
    <li><code>ref={myRef}</code>로 DOM 요소에 연결하면 focus 등 <strong>브라우저 API를 직접 호출</strong>할 수 있다.</li>
    <li>리렌더링되어도 <code>ref.current</code> 값은 <strong>사라지지 않고 유지</strong>된다 (타이머 ID, 이전 값 저장에 적합).</li>
    <li>화면에 보여줄 값은 <strong>useState</strong>, 내부에서만 쓸 값은 <strong>useRef</strong>로 관리한다.</li>
    <li>ref.current는 <strong>이벤트 핸들러나 useEffect 안</strong>에서만 변경해야 한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: ref.current를 바꾸면 화면도 바로 갱신된다?</div>
    <div class="wda-mistake-right">정답: ref.current를 바꿔도 리액트는 <strong>리렌더링을 트리거하지 않는다</strong>. 값은 바뀌지만 화면은 그대로다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: let 변수로도 타이머 ID를 안전하게 기억할 수 있다?</div>
    <div class="wda-mistake-right">정답: 함수형 컴포넌트는 렌더링마다 새로 실행되므로 let 변수는 <strong>초기화</strong>된다. useRef만 리렌더링과 무관하게 값을 유지한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: ref.current는 렌더링 로직 어디서나 자유롭게 바꿔도 된다?</div>
    <div class="wda-mistake-right">정답: 렌더링 도중 값을 바꾸면 예측 불가능한 동작으로 이어질 수 있어, <strong>이벤트 핸들러·useEffect</strong> 안에서만 바꿔야 한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 선택 기준</div>
    <div class="wda-formula-block-body"><code>화면 갱신 필요 → useState / 불필요 → useRef</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 접근 방식</div>
    <div class="wda-formula-block-body"><code>.current로 읽고 쓴다</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 변경 위치</div>
    <div class="wda-formula-block-body"><code>이벤트 핸들러 · useEffect 안에서만</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">useRef가 반환하는 값의 형태는?</div>
    <div class="wda-flip-back">항상 { current: 값 } 형태의 객체입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">useRef 값을 바꿔도 화면이 갱신되지 않는 이유는?</div>
    <div class="wda-flip-back">값이 바뀌어도 리액트에게 "다시 그려라"는 렌더링 신호를 보내지 않기 때문입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">useState와 useRef를 구분하는 결정 기준 한 문장은?</div>
    <div class="wda-flip-back">"이 값이 바뀌었을 때 화면이 다시 그려져야 하는가?" — YES면 useState, NO면 useRef입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">ref.current는 어디서 변경해야 안전한가?</div>
    <div class="wda-flip-back">렌더링 도중(함수 본문)이 아니라 이벤트 핸들러나 useEffect 안에서 변경해야 합니다.</div>
  </div>
</div>
