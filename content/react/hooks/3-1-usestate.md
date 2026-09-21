---
title: "3-1 useState로 상태 관리하기"
status: "completed"
description: "core에서 배운 useState 기본기를 바탕으로 이전 값 기반 업데이트, 배열·객체 state 업데이트, 여러 state 설계 기준까지 Hook으로 state를 다루는 패턴을 정리한다."
category: "React"
section: "Hooks"
tags:
  - react
  - hooks
  - usestate
  - immutability
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
  • <strong>이전 값 기반 업데이트</strong> — setter에 함수를 넘겨 안전하게 값을 갱신하는 방법을 익힙니다<br>
  • <strong>배열·객체 state 업데이트</strong> — 불변성을 지키며 배열과 객체 state를 바꾸는 패턴을 정리합니다<br>
  • <strong>state 설계 기준</strong> — 여러 state를 어떻게 나눌지, state로 둘 값과 계산할 값을 구분합니다
</div>

---

## 1. useState 다시 보기

core의 state 문서(2-4)에서 useState의 기본 문법과 재렌더링 원리를 이미 다뤘습니다. 이 문서는 그 다음 단계로, useState라는 Hook을 실제 화면에서 어떻게 안전하게 다루는지 패턴 중심으로 정리합니다.

상태 업데이트 로직이 복잡해질 때 쓰는 useReducer, 여러 컴포넌트가 값을 공유하는 Context, 입력 검증이 포함된 form 처리, 서버에서 가져온 데이터 상태, useEffect와의 조합, 상태 관리 라이브러리는 각각 별도 문서에서 다룹니다.

이후 예시는 학습 대시보드 컴포넌트 <code>HookDashboard</code>를 기준으로 설명합니다.

**• React: HookDashboard 기본 예시**

```jsx
import { useState } from 'react';

function HookDashboard() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  return <p>현재 필터: {selectedFilter}</p>;
}
```

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">초기값</div><div class="wda-fcard-dsc"><code>useState(초기값)</code>의 인자는 컴포넌트가 처음 렌더링될 때만 사용됩니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">현재값과 setter</div><div class="wda-fcard-dsc">배열 구조분해로 <code>[현재값, setter함수]</code>를 받습니다. setter를 호출하면 재렌더링이 예약됩니다.</div></div>
</div>

---

## 2. 이전 값 기반 업데이트

setter에 새 값을 직접 넣는 대신, **이전 값을 인자로 받는 함수**를 넘기면 항상 최신 state를 기준으로 값을 바꿀 수 있습니다.

**• React: 직접 값 vs 함수형 업데이트**

```jsx
// 직접 값을 넣는 방식 — 짧은 시간에 여러 번 호출하면 이전 호출 결과를 놓칠 수 있음
setCount(count + 1);

// 함수형 업데이트 — React가 가진 최신 값(prev)을 기준으로 계산
setCount(prev => prev + 1);
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>같은 이벤트 핸들러 안에서 setter를 여러 번 호출할 때</strong> 특히 차이가 드러납니다. <code>setCount(count + 1)</code>을 두 번 써도 <code>count</code>는 클로저에 저장된 같은 값이라 결과가 1만 증가하지만, <code>setCount(prev =&gt; prev + 1)</code>을 두 번 쓰면 2만큼 증가합니다.</p>
</div>

---

## 3. boolean·string·number state

`HookDashboard`에는 선택된 필터(문자열), 상세 보기 여부(불리언) 같은 단순 값 state가 여러 개 있을 수 있습니다.

**• React: 문자열·불리언 state 다루기**

```jsx
const [selectedFilter, setSelectedFilter] = useState('all'); // 'all' | 'inProgress' | 'done'
const [isDetailOpen, setIsDetailOpen] = useState(false);

function handleFilterChange(next) {
  setSelectedFilter(next);
}

function handleDetailToggle() {
  setIsDetailOpen(prev => !prev);
}
```

문자열·불리언·숫자처럼 원시값 state는 매번 setter에 **새 값을 그대로** 넘기면 됩니다. 값 자체가 이전 값과 완전히 새 값이므로 별도의 복사 작업이 필요 없습니다.

---

## 4. 배열 state 업데이트

`HookDashboard`에서 사용자가 체크한 강의 id 목록을 배열 state로 관리한다고 해보겠습니다.

**• React: 배열 state 추가·제거하기**

```jsx
const [checkedIds, setCheckedIds] = useState([]);

// 추가: 기존 배열을 복사하면서 새 항목을 뒤에 붙임
function handleCheck(id) {
  setCheckedIds(prev => [...prev, id]);
}

// 제거: 조건에 맞는 항목만 남긴 새 배열을 만듦
function handleUncheck(id) {
  setCheckedIds(prev => prev.filter(checkedId => checkedId !== id));
}
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">원본을 바꾸는 메서드</div>
    <code>push</code>, <code>pop</code>, <code>splice</code>, <code>sort</code>, <code>reverse</code>는 배열을 직접 변형합니다. React는 참조가 바뀌지 않으면 변경을 감지하지 못하므로 state 배열에는 쓰지 않습니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">새 배열을 반환하는 메서드</div>
    <code>concat</code>, <code>filter</code>, <code>map</code>, <code>slice</code>, 전개 구문(<code>...</code>)은 원본은 그대로 두고 새 배열을 만들어 반환합니다. state 업데이트에는 이 방식을 사용합니다.
  </div>
</div>

---

## 5. 객체 state 업데이트

`viewOption`처럼 여러 속성을 가진 객체를 state로 둘 때는, 바뀌지 않는 속성까지 함께 복사해야 합니다.

**• React: 객체 state 스프레드로 업데이트하기**

```jsx
const [viewOption, setViewOption] = useState({ showCompleted: true, sortBy: 'title' });

function handleSortChange(nextSortBy) {
  setViewOption(prev => ({
    ...prev,           // 기존 속성을 먼저 펼쳐 복사
    sortBy: nextSortBy, // 바꿀 속성만 덮어씀
  }));
}
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>전개 구문의 순서가 중요합니다.</strong> <code>{ sortBy: nextSortBy, ...prev }</code>처럼 순서를 바꾸면 <code>...prev</code>가 뒤에서 <code>sortBy</code>를 다시 덮어써 버려, 방금 바꾼 값이 사라집니다. 바꿀 속성은 항상 <code>...prev</code> 뒤에 적습니다.</p>
</div>

---

## 6. 여러 state, 하나로 묶을까 나눌까

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">따로 관리</div><div class="wda-fcard-dsc"><code>selectedFilter</code>와 <code>checkedIds</code>처럼 서로 독립적으로 바뀌는 값은 각각 별도 useState로 둡니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">묶어서 관리</div><div class="wda-fcard-dsc"><code>viewOption</code>의 <code>showCompleted</code>와 <code>sortBy</code>처럼 항상 같이 읽고 같이 초기화되는 값은 객체 하나로 묶습니다.</div></div>
</div>

기준은 "이 값들이 항상 같이 바뀌는가"입니다. 함께 바뀌지 않는 값을 억지로 객체 하나에 묶으면, 한 속성만 바꿀 때도 전체 객체를 복사해야 해서 코드가 번거로워집니다.

---

## 7. state로 둘 값과 계산할 값 구분

**💡 설명**

<div class="wda-callout wda-ci">
  <p><strong>다른 state나 props로부터 계산할 수 있는 값은 state로 만들지 않습니다.</strong></p>
</div>

**• React: state로 두지 않고 계산하기**

```jsx
// ❌ checkedCount를 별도 state로 관리 — checkedIds와 따로 움직여 어긋날 위험이 있음
const [checkedCount, setCheckedCount] = useState(0);

// ✅ 렌더링 중에 그때그때 계산 — checkedIds와 항상 일치함이 보장됨
const checkedCount = checkedIds.length;
```

렌더링 중에 한 줄로 계산할 수 있는 값을 state로 만들면, 원본 값이 바뀔 때마다 이 값도 별도로 갱신해 줘야 해서 두 값이 어긋나는 버그가 생기기 쉽습니다.

---

## 8. 초보자 실수

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>배열이나 객체 state를 직접 수정하고 setter만 호출하는 경우</strong></p>
  <p><code>checkedIds.push(id); setCheckedIds(checkedIds);</code>처럼 쓰면, 배열 참조 자체는 바뀌지 않았기 때문에 React가 변경을 감지하지 못해 화면이 갱신되지 않을 수 있습니다. 항상 새 배열·새 객체를 만들어 setter에 넘겨야 합니다.</p>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>setter 호출 직후 같은 변수를 다시 읽는 경우</strong></p>
  <p><code>setSelectedFilter('done'); console.log(selectedFilter);</code>처럼 쓰면 콘솔에는 이전 값이 찍힙니다. setter를 호출해도 현재 렌더링의 <code>selectedFilter</code> 변수 값은 바뀌지 않고, 다음 렌더링에서만 새 값을 볼 수 있습니다.</p>
</div>

---

## 9. ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>연속으로 값을 바꿀 때는 <code>setState(prev =&gt; ...)</code> 형태의 <strong>함수형 업데이트</strong>를 사용한다.</li>
    <li>배열 state는 <code>push</code>·<code>splice</code> 대신 <strong>spread·filter·map</strong>처럼 새 배열을 반환하는 방식으로 업데이트한다.</li>
    <li>객체 state는 <code>{ ...prev, 바꿀속성: 새값 }</code> 형태로, 바꿀 속성을 <strong>뒤에</strong> 적어야 덮어써진다.</li>
    <li>다른 값으로부터 <strong>계산 가능한 값</strong>은 state로 만들지 않고 렌더링 중에 바로 계산한다.</li>
    <li>항상 같이 바뀌는 값은 객체로 묶고, 독립적으로 바뀌는 값은 <strong>따로</strong> useState로 관리한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: setState를 두 번 연달아 부르면 값도 2번 바뀐다?</div>
    <div class="wda-mistake-right">정답: <code>setCount(count + 1)</code>처럼 값을 직접 넘기면 클로저에 저장된 같은 값을 참조해 1번만 반영된다. 여러 번 누적하려면 <strong>함수형 업데이트</strong>를 써야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 배열에 push만 하고 setState를 부르면 화면이 갱신된다?</div>
    <div class="wda-mistake-right">정답: <code>push</code>는 원본 배열의 참조를 바꾸지 않으므로 React가 변경을 감지하지 못한다. <strong>새 배열</strong>을 만들어 넘겨야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: setState 직후 같은 변수를 읽으면 바뀐 값이 보인다?</div>
    <div class="wda-mistake-right">정답: setter는 <strong>다음 렌더링</strong>을 예약할 뿐, 현재 렌더링의 변수 값을 즉시 바꾸지 않는다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 연속 업데이트</div>
    <div class="wda-formula-block-body"><code>setState(prev =&gt; 새값)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 배열·객체</div>
    <div class="wda-formula-block-body"><code>항상 새 배열 · 새 객체를 반환</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · state 판단</div>
    <div class="wda-formula-block-body"><code>계산 가능하면 state 아님</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">이전 값을 기준으로 안전하게 state를 업데이트하려면?</div>
    <div class="wda-flip-back">setter에 값 대신 함수를 넘기는 함수형 업데이트(prev => ...)를 사용한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">배열 state에서 push 대신 써야 하는 방식은?</div>
    <div class="wda-flip-back">spread, filter, map처럼 원본은 그대로 두고 새 배열을 반환하는 메서드를 사용한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">객체 state를 업데이트할 때 스프레드와 새 값의 순서는?</div>
    <div class="wda-flip-back">{ ...prev, 바꿀속성: 새값 } 순서로, 바꿀 속성을 뒤에 적어야 덮어써진다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">다른 state로부터 계산 가능한 값은 어떻게 관리해야 하나?</div>
    <div class="wda-flip-back">별도 state로 만들지 않고 렌더링 중에 그때그때 계산한다.</div>
  </div>
</div>
