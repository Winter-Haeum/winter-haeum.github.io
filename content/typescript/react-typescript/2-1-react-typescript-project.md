---
title: "2-1 React + TypeScript 프로젝트 시작하기"
category: "frontend"
section: "react-typescript"
date: "2026-08-03"
status: "completed"
description: "React 프로젝트에서 TypeScript를 함께 쓰는 이유와 Vite로 React + TypeScript 프로젝트를 만드는 흐름, 기본 폴더 구조를 정리합니다."
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
  • <strong>React에서 TypeScript를 쓰는 이유</strong> — props와 state를 다룰 때 얻는 이점을 이해합니다<br>
  • <strong>프로젝트 생성 흐름</strong> — Vite로 React + TypeScript 프로젝트를 만드는 과정을 익힙니다<br>
  • <strong>파일 확장자 구분</strong> — .tsx와 .ts를 언제 쓰는지 정리합니다<br>
  • <strong>기본 폴더 구조</strong> — 프로젝트 안에서 파일들이 어떻게 배치되는지 감을 잡습니다
</div>

---

## 1. React에서 TypeScript를 쓰는 이유

React 컴포넌트는 다른 컴포넌트로부터 props라는 데이터를 전달받아 동작합니다. 그런데 이 데이터가 정확히 어떤 형태인지는 JavaScript만으로는 코드를 실행해보기 전까지 확실히 알기 어렵습니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">Props 실수 방지</div><div class="wda-fcard-dsc">잘못된 타입의 값을 전달하면 코드 작성 중에 바로 알 수 있습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">State 관리 명확화</div><div class="wda-fcard-dsc">상태값이 어떤 형태인지 타입으로 미리 정해둘 수 있습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">협업 시 안정성</div><div class="wda-fcard-dsc">다른 사람이 만든 컴포넌트를 쓸 때도 어떤 props가 필요한지 바로 알 수 있습니다.</div></div>
</div>

컴포넌트 개수가 늘어나고 여러 명이 함께 개발할수록, "이 컴포넌트에 어떤 데이터를 넘겨야 하는지"를 타입으로 명확히 해두는 효과가 커집니다.

---

## 2. Vite로 프로젝트 생성하기

React + TypeScript 프로젝트를 새로 시작할 때는 Vite를 사용하는 것이 널리 쓰이는 방법 중 하나입니다.

**• 터미널: Vite로 React+TypeScript 프로젝트 생성**

```bash
npm create vite@latest my-app -- --template react-ts

cd my-app
npm install
npm run dev
```

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1. 생성</div><div class="wda-fnode-dsc">react-ts 템플릿으로 프로젝트 뼈대 생성</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2. 설치</div><div class="wda-fnode-dsc">npm install로 필요한 패키지 설치</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3. 실행</div><div class="wda-fnode-dsc">npm run dev로 개발 서버 시작</div></div>
</div>

react-ts 템플릿을 사용하면 TypeScript 컴파일 설정, React 타입 정의 등이 이미 준비된 상태로 프로젝트가 만들어집니다.

---

## 3. 파일 확장자 구분

**▶ .tsx와 .ts 확장자 구분**

<table class="wda-mtable">
<thead><tr><th>확장자</th><th>용도</th></tr></thead>
<tbody>
<tr><td>.tsx</td><td>JSX 문법을 포함하는 React 컴포넌트 파일</td></tr>
<tr><td>.ts</td><td>JSX가 없는 일반 로직 파일 (유틸 함수, API 요청 등)</td></tr>
</tbody>
</table>

**💡 사용 팁**

<div class="wda-callout wda-cb">
  <p>화면에 태그를 그리는 컴포넌트 파일은 .tsx로, 데이터를 가공하거나 API를 호출하는 순수 로직 파일은 .ts로 작성하는 것이 일반적인 관례입니다.</p>
</div>

---

## 4. 기본 폴더 구조 살펴보기

**• 기본 폴더 구조**

```
src/
├── components/   # 재사용 가능한 UI 컴포넌트
├── pages/        # 화면 단위 컴포넌트
├── hooks/        # 커스텀 훅
├── types/        # 공용 타입 정의
├── App.tsx
└── main.tsx
```

프로젝트마다 세부 구조는 조금씩 다를 수 있지만, 컴포넌트와 타입 정의를 분리해서 관리하면 프로젝트 규모가 커져도 필요한 코드를 찾기 쉬워집니다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>React에서 TypeScript를 쓰면 <strong>props와 state 관련 실수</strong>를 코드 작성 중에 발견할 수 있다.</li>
    <li>Vite에서는 <strong>react-ts 템플릿</strong>으로 React + TypeScript 프로젝트를 바로 생성할 수 있다.</li>
    <li>JSX가 있으면 <strong>.tsx</strong>, 없으면 <strong>.ts</strong> 확장자를 사용한다.</li>
    <li>컴포넌트와 타입 정의를 <strong>폴더 단위로 분리</strong>하면 관리가 편해진다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: React 컴포넌트 파일은 무조건 .ts로 작성해도 된다?</div>
    <div class="wda-mistake-right">정답: JSX 문법을 사용하는 컴포넌트 파일은 <strong>반드시 .tsx</strong>로 작성해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: React + TypeScript 프로젝트를 만드는 방법은 Vite 하나뿐이다?</div>
    <div class="wda-mistake-right">정답: Vite 외에도 여러 방법이 있으며, 이 문서에서는 그중 <strong>널리 쓰이는 한 가지 방법</strong>을 소개한 것뿐이다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 생성</div>
    <div class="wda-formula-block-body"><code>npm create vite@latest -- --template react-ts</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 확장자</div>
    <div class="wda-formula-block-body"><code>JSX 있으면 .tsx</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">React 프로젝트에서 TypeScript를 쓰면 무엇이 좋아지나요?</div>
    <div class="wda-flip-back">props와 state의 타입 실수를 코드 작성 중에 바로 발견할 수 있습니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">JSX를 포함하는 React 컴포넌트 파일의 확장자는?</div>
    <div class="wda-flip-back">.tsx입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Vite로 React + TypeScript 프로젝트를 만들 때 사용하는 템플릿 이름은?</div>
    <div class="wda-flip-back">react-ts입니다.</div>
  </div>
</div>
