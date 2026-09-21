---
title: "2-2 Props 타입 정의하기"
category: "frontend"
section: "react-typescript"
date: "2026-08-03"
status: "completed"
description: "interface로 컴포넌트 props의 타입을 정의하는 방법과 선택적 props, children 타입 지정 방법을 정리합니다."
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
  • <strong>props 타입 정의</strong> — interface로 컴포넌트가 받을 데이터 형태를 정합니다<br>
  • <strong>선택적 props</strong> — 필수가 아닌 props를 표현하는 방법을 익힙니다<br>
  • <strong>children 타입</strong> — 컴포넌트 내부에 들어오는 자식 요소의 타입을 다룹니다<br>
  • <strong>실수 방지 효과</strong> — 잘못된 props 전달이 어떻게 걸러지는지 확인합니다
</div>

---

## 1. Props 타입을 정의하는 이유

컴포넌트는 부모로부터 props라는 데이터를 전달받아 동작합니다. props 타입을 정의해두면, 이 컴포넌트를 사용할 때 어떤 데이터를 넘겨야 하는지 명확해지고 잘못된 값을 넘기는 실수도 미리 막을 수 있습니다.

**• React: Props 인터페이스 정의**

```tsx
interface WelcomeProps {
  name: string;
  age?: number; // 선택적 속성
}

function Welcome({ name, age }: WelcomeProps) {
  return (
    <div>
      <h2>안녕하세요, {name}님!</h2>
      {age && <p>나이: {age}세</p>}
    </div>
  );
}
```

**• React: Props 타입 검사 예시**

```tsx
<Welcome name="홍길동" age={25} />  // OK
<Welcome name={123} />              // 오류: name은 string이어야 함
<Welcome />                         // 오류: name은 필수 속성
```

---

## 2. 필수 props와 선택적 props

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">필수 props</div>
    속성 이름 뒤에 물음표가 없으면, 컴포넌트를 사용할 때 반드시 값을 전달해야 합니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">선택적 props (?)</div>
    속성 이름 뒤에 물음표(?)를 붙이면, 값을 전달하지 않아도 오류가 나지 않습니다.
  </div>
</div>

**• React: 필수·선택적 props 정의**

```tsx
interface ButtonProps {
  label: string;         // 필수
  disabled?: boolean;    // 선택적
}
```

**💡 사용 팁**

<div class="wda-callout wda-cb">
  <p>선택적 props는 구조 분해 할당 시 기본값을 함께 지정해두면, 값을 넘기지 않았을 때도 컴포넌트가 예측 가능하게 동작합니다. 예를 들어 <code>{"{ disabled = false }"}</code>처럼 작성할 수 있습니다.</p>
</div>

---

## 3. children 타입 지정하기

태그 사이에 다른 요소를 감싸는 컴포넌트를 만들 때는, 그 내용을 받는 `children` 속성의 타입을 지정해야 합니다. React에서는 `ReactNode` 타입을 가장 널리 사용합니다.

**• React: children 타입 지정**

```tsx
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  padding?: number;
}

function Container({ children, padding = 16 }: ContainerProps) {
  return <div style={{ padding }}>{children}</div>;
}
```

**• React: children 컴포넌트 사용**

```tsx
<Container>
  <h1>제목</h1>
  <p>내용</p>
</Container>
```

`ReactNode`는 문자열, 숫자, JSX 요소, 배열 등 화면에 그릴 수 있는 거의 모든 값을 포함하는 넓은 타입이어서, children의 타입으로 가장 자주 사용됩니다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>컴포넌트의 props는 <strong>interface</strong>로 형태를 정의하고 함수 매개변수에 연결한다.</li>
    <li>속성 이름 뒤에 <strong>물음표(?)</strong>를 붙이면 선택적 props가 된다.</li>
    <li>태그 사이의 내용을 다룰 때는 <strong>children: ReactNode</strong>를 사용한다.</li>
    <li>props 타입을 정의하면 <strong>잘못된 값 전달을 코드 작성 중에 발견</strong>할 수 있다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 선택적 props는 아예 존재하지 않는 속성처럼 취급된다?</div>
    <div class="wda-mistake-right">정답: 선택적 props는 <strong>값이 없을 수도 있다는 의미</strong>일 뿐, 값을 전달하면 정상적인 속성으로 동작한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: children 타입은 항상 JSX 요소 하나만 표현하면 충분하다?</div>
    <div class="wda-mistake-right">정답: <strong>ReactNode</strong>는 문자열·숫자·배열 등 다양한 값을 모두 포함하므로, 특정 JSX 요소 하나로 제한하는 것보다 훨씬 유연하다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · props 타입</div>
    <div class="wda-formula-block-body"><code>interface Props { ... }</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 선택적</div>
    <div class="wda-formula-block-body"><code>속성명?: 타입</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · children</div>
    <div class="wda-formula-block-body"><code>children: ReactNode</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">필수 props를 전달하지 않으면 어떻게 되나요?</div>
    <div class="wda-flip-back">컴파일 시점에 오류가 발생합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">선택적 props를 표시하는 문법은?</div>
    <div class="wda-flip-back">속성 이름 뒤에 물음표(?)를 붙입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">children의 타입으로 가장 자주 쓰이는 타입은?</div>
    <div class="wda-flip-back">ReactNode입니다.</div>
  </div>
</div>
