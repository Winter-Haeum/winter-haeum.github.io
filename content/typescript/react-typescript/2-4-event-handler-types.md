---
title: "2-4 이벤트 핸들러 타입 지정하기"
category: "frontend"
section: "react-typescript"
date: "2026-08-03"
status: "completed"
description: "input 변경 이벤트와 button 클릭 이벤트의 타입을 지정하는 방법을 익히고, React.FC 사용 여부에 대한 균형 잡힌 시각을 정리합니다."
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
  • <strong>이벤트 핸들러 타입</strong> — React 이벤트 객체에 타입을 지정하는 방법을 익힙니다<br>
  • <strong>input 변경 이벤트</strong> — ChangeEvent 타입으로 입력값을 안전하게 다룹니다<br>
  • <strong>button 클릭 이벤트</strong> — MouseEvent 타입을 지정하는 방법을 익힙니다<br>
  • <strong>React.FC 사용 여부</strong> — 프로젝트마다 다를 수 있는 선택임을 이해합니다
</div>

---

## 1. 이벤트 핸들러에 타입이 필요한 이유

React에서 이벤트 핸들러 함수를 인라인으로 작성하면 TypeScript가 이벤트 객체의 타입을 자동으로 추론해줍니다. 하지만 핸들러를 컴포넌트 밖으로 분리해서 작성할 때는, 매개변수의 타입을 직접 지정해줘야 합니다.

**• React: 인라인·분리 이벤트 핸들러 비교**

```tsx
// 인라인 방식: 타입이 자동으로 추론됨
<input onChange={(e) => console.log(e.target.value)} />

// 분리 방식: 타입을 직접 명시해야 함
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};
```

---

## 2. input 변경 이벤트 — ChangeEvent

input, textarea, select처럼 사용자가 값을 입력하는 요소에서 값이 바뀔 때는 `ChangeEvent`를 사용합니다. 제네릭으로 어떤 HTML 요소에서 발생하는 이벤트인지 함께 표시합니다.

**• React: ChangeEvent로 input 값 다루기**

```tsx
import { ChangeEvent, useState } from 'react';

function SearchInput() {
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return <input value={value} onChange={handleChange} />;
}
```

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">HTMLInputElement</div><div class="wda-fcard-dsc">input 태그에서 발생하는 이벤트에 사용합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">HTMLTextAreaElement</div><div class="wda-fcard-dsc">textarea 태그에서 발생하는 이벤트에 사용합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">HTMLSelectElement</div><div class="wda-fcard-dsc">select 태그에서 발생하는 이벤트에 사용합니다.</div></div>
</div>

---

## 3. button 클릭 이벤트 — MouseEvent

버튼 클릭처럼 마우스 이벤트가 발생하는 요소에는 `MouseEvent`를 사용합니다.

**• React: MouseEvent로 버튼 클릭 처리**

```tsx
import { MouseEvent } from 'react';

function SubmitButton() {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("클릭됨");
  };

  return <button onClick={handleClick}>확인</button>;
}
```

폼(form) 제출처럼 조금 더 넓은 범위의 이벤트를 다룰 때는 `FormEvent<HTMLFormElement>`를 사용합니다.

**• React: FormEvent로 폼 제출 처리**

```tsx
import { FormEvent } from 'react';

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // 페이지 새로고침 방지
};
```

---

## 4. React.FC — 쓸지 말지는 프로젝트마다 다르다

컴포넌트 타입을 지정하는 또 다른 방법으로 `React.FC`가 있습니다.

**• React: React.FC로 컴포넌트 타입 지정**

```tsx
const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">React.FC를 쓰는 스타일</div>
    컴포넌트라는 것이 타입만으로도 명확히 드러나고, children 타입이 자동으로 포함되던 과거 버전도 있었습니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">일반 함수 선언 스타일</div>
    함수에 직접 props 타입을 다는 방식으로, 최근 React 프로젝트에서 더 자주 보이는 편입니다.
  </div>
</div>

**💡 사용 팁**

<div class="wda-callout wda-cb">
  <p>React.FC를 반드시 써야 한다거나, 반드시 쓰지 말아야 한다고 단정할 수는 없습니다. 팀이나 프로젝트의 컨벤션에 따라 선택이 달라질 수 있는 부분이므로, 함께 작업하는 코드베이스의 스타일을 따르는 것이 가장 안전합니다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>인라인 이벤트 핸들러는 <strong>타입이 자동으로 추론</strong>되지만, 분리하면 타입을 직접 지정해야 한다.</li>
    <li>input 변경 이벤트에는 <strong>ChangeEvent&lt;요소타입&gt;</strong>을 사용한다.</li>
    <li>버튼 클릭 이벤트에는 <strong>MouseEvent&lt;요소타입&gt;</strong>을 사용한다.</li>
    <li><strong>React.FC 사용 여부는 팀·프로젝트 컨벤션</strong>에 따라 달라질 수 있다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 모든 이벤트 핸들러에는 항상 같은 이벤트 타입을 쓰면 된다?</div>
    <div class="wda-mistake-right">정답: input 변경에는 <strong>ChangeEvent</strong>, 클릭에는 <strong>MouseEvent</strong>처럼 <strong>이벤트 종류에 맞는 타입</strong>을 사용해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: React.FC를 쓰지 않으면 잘못된 코드다?</div>
    <div class="wda-mistake-right">정답: React.FC는 <strong>선택 가능한 스타일 중 하나</strong>일 뿐, 사용 여부가 코드의 옳고 그름을 가르지 않는다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · input</div>
    <div class="wda-formula-block-body"><code>ChangeEvent&lt;HTMLInputElement&gt;</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · click</div>
    <div class="wda-formula-block-body"><code>MouseEvent&lt;HTMLButtonElement&gt;</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · submit</div>
    <div class="wda-formula-block-body"><code>FormEvent&lt;HTMLFormElement&gt;</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">input의 값이 바뀔 때 쓰는 이벤트 타입은?</div>
    <div class="wda-flip-back">ChangeEvent&lt;HTMLInputElement&gt;입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">버튼 클릭 이벤트에 쓰는 타입은?</div>
    <div class="wda-flip-back">MouseEvent&lt;HTMLButtonElement&gt;입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">React.FC는 반드시 사용해야 하나요?</div>
    <div class="wda-flip-back">아니요. 프로젝트나 팀의 컨벤션에 따라 사용 여부가 달라질 수 있습니다.</div>
  </div>
</div>
