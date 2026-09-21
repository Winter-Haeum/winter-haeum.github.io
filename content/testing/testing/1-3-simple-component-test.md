---
title: "1-3 간단한 컴포넌트 테스트 작성하기"
category: "frontend"
section: "testing"
date: "2026-08-03"
status: "completed"
description: "React Testing Library로 컴포넌트를 화면에 렌더링하고, 사용자 관점에서 화면 결과를 검증하는 기본 방법을 정리합니다."
---

<style>
.wda-callout{border-radius:10px;padding:12px 14px;margin:.8rem 0 1.1rem;border-left:3px solid;font-size:.9rem;line-height:1.75}
.wda-ci{background:rgba(139,92,246,.06);border-color:#8b5cf6}
.wda-cw{background:rgba(245,158,11,.07);border-color:#f59e0b}
.wda-cs{background:rgba(34,197,94,.05);border-color:#22c55e}
.wda-cb{background:rgba(59,130,246,.06);border-color:#3b82f6}
.wda-clabel{font-size:.7rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px;display:block}
.wda-ci .wda-clabel{color:#8b5cf6}
.wda-cw .wda-clabel{color:#f59e0b}
.wda-cs .wda-clabel{color:#22c55e}
.wda-cb .wda-clabel{color:#3b82f6}
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
  • <strong>컴포넌트 테스트의 목적</strong> — 내부 코드가 아니라 화면 결과를 검증한다는 관점을 이해합니다<br>
  • <strong>render와 screen 익히기</strong> — 컴포넌트를 가상 화면에 그리고 요소를 찾는 방법을 파악합니다<br>
  • <strong>사용자 동작 시뮬레이션</strong> — 클릭 같은 이벤트를 코드로 재현하는 방법을 익힙니다<br>
  • <strong>기본 흐름 정리</strong> — 렌더링 → 요소 찾기 → 동작 → 결과 확인의 순서를 체득합니다
</div>

---

## 1. 컴포넌트 테스트가 보는 것

1-2에서 배운 test·expect 구조를 그대로 활용해, 이번에는 함수가 아니라 React 컴포넌트를 검증하는 방법을 다룹니다.

컴포넌트 테스트에는 React Testing Library(RTL)라는 도구가 흔히 함께 쓰입니다. RTL은 컴포넌트를 실제 브라우저 없이도 가상의 화면에 그려서 검증할 수 있게 도와줍니다.

컴포넌트 테스트에서 가장 헷갈리기 쉬운 지점은 "무엇을 검증할 것인가"입니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">❌ 내부 구현 검증</div>
    컴포넌트 내부의 상태 변수 이름이나, 함수가 몇 번 호출됐는지처럼 코드 구조 자체를 검사하는 방식입니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">✅ 화면 결과 검증</div>
    "버튼을 눌렀을 때 화면에 이 텍스트가 보이는가"처럼 사용자 눈에 보이는 결과를 검사하는 방식입니다.
  </div>
</div>

React Testing Library는 의도적으로 후자의 방식을 지향합니다. 내부 상태 변수의 이름이 바뀌어도 화면에 보이는 결과가 같다면 테스트는 계속 통과해야 한다는 철학입니다.

이 덕분에 코드를 리팩터링해도 테스트를 다시 쓸 필요 없이 그대로 안전망 역할을 할 수 있습니다.

---

## 2. render와 screen — 화면 그리고 찾기

RTL의 기본 흐름은 컴포넌트를 가상 화면에 렌더링하고, 그 화면에서 원하는 요소를 찾는 것입니다.

**• React: render와 screen 기본 사용**

```jsx
import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

test('이름을 전달하면 인사말이 보인다', () => {
  render(<Greeting name="홍길동" />);

  const text = screen.getByText('안녕하세요, 홍길동님');
  expect(text).toBeInTheDocument();
});
```

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">render</div><div class="wda-fnode-dsc">컴포넌트를 가상 DOM에 그리기</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">screen.getByText</div><div class="wda-fnode-dsc">화면에서 원하는 요소 찾기</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">expect</div><div class="wda-fnode-dsc">찾은 요소가 조건에 맞는지 확인</div></div>
</div>

**▶ RTL 함수·메서드 역할**

<table class="wda-mtable">
<thead><tr><th>함수/메서드</th><th>역할</th></tr></thead>
<tbody>
<tr><td>render(컴포넌트)</td><td>컴포넌트를 테스트용 가상 화면에 렌더링합니다.</td></tr>
<tr><td>screen.getByText(문자열)</td><td>화면에 있는 텍스트로 요소를 찾습니다.</td></tr>
<tr><td>screen.getByRole(역할)</td><td>버튼, 제목처럼 요소의 역할(button, heading 등)로 찾습니다.</td></tr>
<tr><td>toBeInTheDocument()</td><td>찾은 요소가 실제로 화면에 존재하는지 확인하는 matcher입니다.</td></tr>
</tbody>
</table>

---

## 3. 사용자 동작 시뮬레이션

버튼 클릭처럼 사용자의 동작이 필요한 테스트에는 `user-event`라는 도구를 함께 사용합니다.

**• React: 버튼 클릭 시뮬레이션**

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

test('버튼을 클릭하면 숫자가 1 증가한다', async () => {
  render(<Counter />);

  const button = screen.getByRole('button', { name: '증가' });
  await userEvent.click(button);

  expect(screen.getByText('카운트: 1')).toBeInTheDocument();
});
```

여기서 중요한 것은 `userEvent.click(button)`처럼 코드로 사용자의 클릭을 재현한다는 점입니다. 실제로 마우스를 움직이지 않아도, 테스트 코드 안에서 "사용자가 버튼을 눌렀을 때"라는 상황을 그대로 만들어낼 수 있습니다.

**💡 사용 팁**

<div class="wda-callout wda-cb">
  <p>userEvent가 제공하는 동작들은 비동기로 처리됩니다. 실제 사용자가 클릭하는 과정을 좀 더 사실적으로 흉내 내기 위해서인데, 그래서 <code>userEvent.click(...)</code> 앞에는 <code>await</code>를 붙이고 테스트 함수 자체는 <code>async</code>로 선언해야 합니다.</p>
</div>

---

## 4. 컴포넌트 테스트의 기본 4단계

지금까지 본 내용을 정리하면, 컴포넌트 테스트는 대체로 아래 네 단계를 따릅니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">1. 렌더링</div><div class="wda-fcard-dsc">render로 컴포넌트를 가상 화면에 그립니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">2. 요소 찾기</div><div class="wda-fcard-dsc">screen으로 화면에서 필요한 요소를 찾습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">3. 동작</div><div class="wda-fcard-dsc">userEvent로 클릭·입력 같은 사용자 동작을 재현합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">4. 검증</div><div class="wda-fcard-dsc">expect로 화면이 원하는 대로 바뀌었는지 확인합니다.</div></div>
</div>

이 네 단계는 이름과 순서만 기억해두면, 앞으로 어떤 컴포넌트를 테스트하더라도 거의 그대로 적용할 수 있는 뼈대가 됩니다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>컴포넌트 테스트는 <strong>내부 구현이 아니라 화면에 보이는 결과</strong>를 검증한다.</li>
    <li>render로 화면을 그리고, <strong>screen</strong>으로 요소를 찾는다.</li>
    <li>클릭 같은 사용자 동작은 <strong>userEvent</strong>로 재현하며 <code>await</code>가 필요하다.</li>
    <li>기본 흐름은 <strong>렌더링 → 요소 찾기 → 동작 → 검증</strong> 4단계다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 컴포넌트 테스트는 내부 state 값이 정확한지 확인하는 것이다?</div>
    <div class="wda-mistake-right">정답: RTL은 <strong>사용자 눈에 보이는 화면 결과</strong>를 검증하는 방식을 지향한다. 내부 구현이 바뀌어도 화면 결과가 같다면 테스트는 계속 통과해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: userEvent.click()은 동기 함수라 await 없이 바로 써도 된다?</div>
    <div class="wda-mistake-right">정답: userEvent의 동작들은 <strong>비동기</strong>로 처리되므로 반드시 <code>await</code>와 함께, <code>async</code> 테스트 함수 안에서 사용해야 한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 렌더링</div>
    <div class="wda-formula-block-body"><code>render(&lt;Component /&gt;)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 동작</div>
    <div class="wda-formula-block-body"><code>await userEvent.click(요소)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 흐름</div>
    <div class="wda-formula-block-body"><code>렌더링 → 탐색 → 동작 → 검증</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">RTL이 지향하는 컴포넌트 테스트의 관점은?</div>
    <div class="wda-flip-back">내부 구현이 아니라 사용자 눈에 보이는 화면 결과를 검증하는 것입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">화면에 렌더링된 요소를 찾을 때 쓰는 객체는?</div>
    <div class="wda-flip-back">screen입니다. screen.getByText, screen.getByRole 등으로 요소를 찾습니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">버튼 클릭 같은 사용자 동작은 어떻게 재현하나요?</div>
    <div class="wda-flip-back">user-event 라이브러리의 userEvent.click() 같은 메서드를 await와 함께 사용합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">컴포넌트 테스트의 기본 4단계는?</div>
    <div class="wda-flip-back">렌더링 → 요소 찾기 → 동작 → 검증 순서로 진행합니다.</div>
  </div>
</div>
