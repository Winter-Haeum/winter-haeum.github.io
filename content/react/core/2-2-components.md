---
title: "2-2 컴포넌트 만들기"
status: "completed"
description: "학습 카드 화면을 Header/Card/Summary로 나누며 컴포넌트가 무엇인지, 어떻게 조합하고 재사용하는지 React 컴포넌트의 기초를 정리한다."
category: "React"
section: "Core"
tags:
  - react
  - components
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
  • <strong>컴포넌트 개념 이해하기</strong> — 컴포넌트가 UI 조각을 반환하는 함수임을 이해합니다.<br>
  • <strong>이름 규칙 익히기</strong> — 컴포넌트 이름은 대문자로 시작해야 한다는 규칙을 익힙니다.<br>
  • <strong>조합과 재사용</strong> — 여러 컴포넌트를 조합하고 반복해서 재사용하는 방법을 배웁니다.<br>
  • <strong>다음 학습 준비</strong> — props/state 상세는 뒤 문서에서 다룬다는 것을 확인합니다.
</div>

---

## 1. 컴포넌트가 필요한 순간

학습 카드 화면 전체를 하나의 함수 안에 다 적으면 코드가 점점 길어지고 어디를 고쳐야 할지 찾기 어려워집니다. 화면을 제목(Header), 카드(Card), 요약(Summary) 같은 작은 단위로 나누면 관리하기 쉬워집니다.

---

## 2. 컴포넌트는 UI 조각을 반환하는 함수다

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">일반 함수</div>
    값을 계산해서 반환한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">React 컴포넌트</div>
    JSX(UI 구조)를 반환한다.
  </div>
</div>

**• React: 컴포넌트 함수 기본형**

```jsx
function StudyHeader() {
  return <h2>오늘의 학습</h2>;
}
```

---

## 3. 컴포넌트 이름은 대문자로 시작한다

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">소문자 시작</div>
    <code>div</code>, <code>header</code>처럼 일반 HTML 태그로 인식된다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">대문자 시작</div>
    <code>StudyHeader</code>처럼 React 컴포넌트로 인식된다.
  </div>
</div>

---

## 4. return으로 JSX를 돌려준다

컴포넌트 함수는 `return` 뒤에 JSX를 작성해서 화면에 그릴 내용을 돌려줍니다.

**• React: return으로 JSX 돌려주기**

```jsx
function StudyCard() {
  return <article>학습 카드</article>;
}
```

---

## 5. 컴포넌트를 태그처럼 사용한다

만든 컴포넌트는 HTML 태그처럼 꺾쇠 괄호로 사용합니다.

**• React: 컴포넌트를 태그처럼 사용하기**

```jsx
<StudyHeader />
```

---

## 6. 화면을 여러 컴포넌트로 나누기

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">하나의 큰 컴포넌트</div>
    제목, 카드, 요약 코드가 전부 한 함수 안에 섞여 있다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">작은 컴포넌트 조합</div>
    StudyHeader, StudyCard, StudySummary로 나누어 조합한다.
  </div>
</div>

**• React: 여러 컴포넌트를 조합하기**

```jsx
function StudyDashboard() {
  return (
    <section>
      <StudyHeader />
      <StudyCard />
      <StudySummary />
    </section>
  );
}
```

---

## 7. 같은 컴포넌트 재사용하기

**• React: 같은 컴포넌트 반복 사용하기**

```jsx
<StudyCard />
<StudyCard />
```

같은 컴포넌트를 여러 번 사용해 반복되는 UI를 만들 수 있습니다.

---

## 8. 부모와 자식 컴포넌트

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">화면 분해</div><div class="wda-fnode-dsc">Header/Card/Summary로 나누기</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">컴포넌트 작성</div><div class="wda-fnode-dsc">각각 함수로 작성</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">조합</div><div class="wda-fnode-dsc">StudyDashboard 안에 배치</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">재사용</div><div class="wda-fnode-dsc">StudyCard 반복 사용</div></div>
</div>

`StudyDashboard`는 부모, `StudyHeader`/`StudyCard`/`StudySummary`는 자식입니다.

---

## 9. 파일로 분리하는 맛보기

컴포넌트가 많아지면 파일별로 나눠서 관리합니다.

**• React: 컴포넌트 파일로 분리하기**

```jsx
// StudyCard.jsx
function StudyCard() {
  return <article>학습 카드</article>;
}

export default StudyCard;
```

다른 파일에서는 `import StudyCard from './StudyCard';`로 가져와 사용합니다.

---

## 10. 다음 학습 흐름

**💡 설명**

<div class="wda-callout wda-ci">
  컴포넌트에 값을 전달하는 방법(props)과 컴포넌트가 스스로 값을 바꾸는 방법(state)은 각각 <strong>2-3, 2-4</strong>에서 자세히 다룹니다.
</div>

**▶ 주제별 다음 학습 문서**

<table class="wda-mtable">
  <tr>
    <th>주제</th>
    <th>자세히 다루는 문서</th>
  </tr>
  <tr>
    <td>props로 값 전달하기</td>
    <td>2-3 props로 데이터 전달하기</td>
  </tr>
  <tr>
    <td>state로 값 관리하기</td>
    <td>2-4 state로 상태 관리하기</td>
  </tr>
</table>

---

## 11. 초보자 실수

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">이름을 소문자로 짓는다</div>
    <div class="wda-fcard-dsc">studyHeader처럼 소문자로 지으면 HTML 태그로 오해된다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">return 없이 JSX만 적는다</div>
    <div class="wda-fcard-dsc">JSX는 반드시 return으로 돌려줘야 화면에 나타난다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">export를 빠뜨린다</div>
    <div class="wda-fcard-dsc">export default가 없으면 다른 파일에서 가져올 수 없다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">자식 요소가 필요한데 self-closing으로 쓴다</div>
    <div class="wda-fcard-dsc">내용을 감싸야 한다면 &lt;StudyCard&gt;...&lt;/StudyCard&gt; 형태로 써야 한다.</div>
  </div>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>컴포넌트는 <strong>JSX를 반환하는 함수</strong>이며, 이름은 반드시 <strong>대문자로 시작</strong>해야 한다.</li>
    <li>만든 컴포넌트는 <code>&lt;StudyHeader /&gt;</code>처럼 <strong>태그로 사용</strong>한다.</li>
    <li>화면을 작은 컴포넌트로 나누고 <strong>조합</strong>해서 전체 화면을 구성한다.</li>
    <li>같은 컴포넌트를 <strong>여러 번 재사용</strong>할 수 있다.</li>
    <li>부모 컴포넌트 안에 자식 컴포넌트를 넣어 <strong>부모-자식 관계</strong>를 만든다.</li>
    <li>props/state 상세는 각각 <strong>2-3, 2-4</strong>에서 다룬다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: studyHeader처럼 소문자로 지어도 컴포넌트로 인식된다?</div>
    <div class="wda-mistake-right">정답: 소문자로 시작하면 React가 <strong>HTML 태그</strong>로 오해해 렌더링되지 않는다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: JSX만 작성하면 자동으로 화면에 나타난다?</div>
    <div class="wda-mistake-right">정답: 반드시 <strong>return</strong>으로 돌려줘야 화면에 반영된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 같은 컴포넌트는 한 화면에 한 번만 쓸 수 있다?</div>
    <div class="wda-mistake-right">정답: <code>&lt;StudyCard /&gt;</code>처럼 <strong>여러 번 재사용</strong>할 수 있다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 자식 요소가 있어도 self-closing 태그로 쓸 수 있다?</div>
    <div class="wda-mistake-right">정답: 내용을 감싸려면 <strong>여는 태그와 닫는 태그</strong>를 따로 작성해야 한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 정체</div>
    <div class="wda-formula-block-body"><code>컴포넌트 = JSX 반환 함수</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 이름 규칙</div>
    <div class="wda-formula-block-body"><code>대문자로 시작(PascalCase)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 사용법</div>
    <div class="wda-formula-block-body"><code>&lt;ComponentName /&gt;</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · 구조</div>
    <div class="wda-formula-block-body"><code>부모 안에 자식 컴포넌트 조합</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">컴포넌트란 무엇인가?</div>
    <div class="wda-flip-back">JSX(UI)를 반환하는 JavaScript 함수다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">컴포넌트 이름 규칙은?</div>
    <div class="wda-flip-back">반드시 대문자로 시작해야 HTML 태그와 구분된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">같은 컴포넌트를 여러 번 쓸 수 있나?</div>
    <div class="wda-flip-back">그렇다. 필요한 만큼 반복해서 재사용할 수 있다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">부모와 자식 컴포넌트란?</div>
    <div class="wda-flip-back">한 컴포넌트 안에 다른 컴포넌트를 넣으면 감싸는 쪽이 부모, 담기는 쪽이 자식이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">props와 state는 어디서 자세히 다루나?</div>
    <div class="wda-flip-back">props는 2-3, state는 2-4에서 다룬다.</div>
  </div>
</div>
