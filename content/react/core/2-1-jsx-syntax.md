---
title: "2-1 JSX 문법 익히기"
status: "completed"
description: "학습 카드 화면을 JSX로 표현하며 Fragment, className, 중괄호 표현식, 인라인 스타일 등 JSX 핵심 문법을 정리한다."
category: "React"
section: "Core"
tags:
  - react
  - jsx
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
  • <strong>JSX 개념 이해하기</strong> — JavaScript 안에서 UI 구조를 표현하는 문법임을 이해합니다.<br>
  • <strong>기본 규칙 익히기</strong> — 하나의 부모 요소, Fragment, className/htmlFor 규칙을 익힙니다.<br>
  • <strong>중괄호 사용법 익히기</strong> — JSX 안에서 JavaScript 값과 표현식을 넣는 방법을 배웁니다.<br>
  • <strong>다음 학습 준비</strong> — 조건부/리스트 렌더링은 맛보기만 하고 뒤 문서로 넘긴다는 것을 확인합니다.
</div>

---

## 1. JSX가 필요한 순간

학습 카드 화면(제목, 강의 목록, 요약)을 만든다고 해봅시다. HTML 구조를 만들고 JavaScript 데이터를 그 안에 끼워 넣는 작업을 계속 오가며 처리해야 한다면 번거롭습니다.

JSX는 이 둘을 한 곳에서 표현할 수 있게 해주는 문법입니다.

---

## 2. JSX는 JavaScript 안의 UI 표현이다

**• React: JSX로 UI 값 반환하기**

```jsx
const courseTitle = "React 기초";

function StudyCard() {
  return <h3>{courseTitle}</h3>;
}
```

**💡 설명**

<div class="wda-callout wda-ci">
  JSX는 새로운 언어가 아니라 JavaScript를 확장한 문법입니다. 함수 안에서 UI 구조를 값처럼 반환할 수 있게 해줍니다.
</div>

---

## 3. HTML과 JSX의 차이

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">HTML</div>
    브라우저가 직접 읽는 문서 마크업이다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">JSX</div>
    JavaScript로 변환되어야 실행되며, className·htmlFor 같은 별도 규칙이 있다.
  </div>
</div>

---

## 4. 하나의 부모 요소 규칙

컴포넌트 함수는 **하나의 최상위 요소**만 반환해야 합니다. 여러 요소를 나란히 반환하면 에러가 납니다.

**• React: 최상위 요소가 여러 개인 에러 예시**

```jsx
// 에러: 최상위 요소가 h3, p 두 개다
function StudyCard() {
  return (
    <h3>React 기초</h3>
    <p>입문</p>
  );
}
```

---

## 5. Fragment 사용하기

불필요한 `<div>`로 감싸지 않고 여러 요소를 묶고 싶을 때 Fragment(`<>...</>`)를 사용합니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">div로 감싸기</div>
    실제 DOM에 불필요한 div가 남는다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Fragment로 감싸기</div>
    실제 DOM에는 흔적을 남기지 않고 요소만 묶는다.
  </div>
</div>

**• React: Fragment로 여러 요소 묶기**

```jsx
function StudyCard() {
  return (
    <>
      <h3>React 기초</h3>
      <p>입문</p>
    </>
  );
}
```

---

## 6. 중괄호로 값 넣기

중괄호 `{ }` 안에는 값으로 평가되는 JavaScript 표현식을 넣을 수 있습니다.

**• React: 중괄호로 JavaScript 값 넣기**

```jsx
function StudyCard() {
  const courseLevel = "입문";

  return (
    <div>
      {/* 강의 난이도를 표시 */}
      <p>난이도: {courseLevel}</p>
      <p>내년 레벨: {1 + 1}</p>
    </div>
  );
}
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">문자열 값</div>
    <code>"React 기초"</code>처럼 고정된 텍스트.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">JavaScript 표현식</div>
    <code>{courseLevel}</code>, <code>{1 + 1}</code>처럼 계산되어 값이 나오는 코드.
  </div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  중괄호 안에는 <code>if</code>문 같은 명령문은 넣을 수 없습니다. 조건에 따라 다른 값을 보여주고 싶다면 삼항 연산자를 사용하며, 자세한 조건부 렌더링은 <strong>2-7</strong>에서 다룹니다.
</div>

---

## 7. className과 htmlFor

**▶ HTML 속성과 JSX 속성 대응표**

<table class="wda-mtable">
  <tr>
    <th>HTML 속성</th>
    <th>JSX 속성</th>
  </tr>
  <tr>
    <td><code>class</code></td>
    <td><code>className</code></td>
  </tr>
  <tr>
    <td><code>for</code></td>
    <td><code>htmlFor</code></td>
  </tr>
  <tr>
    <td><code>onclick</code></td>
    <td><code>onClick</code></td>
  </tr>
</table>

**• React: className과 htmlFor 사용 예시**

```jsx
<div className="study-card">
  <label htmlFor="course-title">강의 제목</label>
</div>
```

**💡 설명**

<div class="wda-callout wda-ci">
  <code>class</code>와 <code>for</code>는 JavaScript 예약어와 겹치기 때문에, JSX에서는 <code>className</code>과 <code>htmlFor</code>로 이름을 바꿔 사용합니다.
</div>

---

## 8. style 객체 맛보기

인라인 스타일은 문자열이 아니라 JavaScript 객체로 전달합니다.

**• React: style 객체로 인라인 스타일 지정하기**

```jsx
<p style={{ color: "blue" }}>진행 중</p>
```

CSS 속성명은 `backgroundColor`처럼 camelCase로 씁니다.

---

## 9. 조건부/리스트 렌더링 맛보기

**💡 설명**

<div class="wda-callout wda-ci">
  조건부 렌더링은 <strong>2-7</strong>에서, 리스트 렌더링은 <strong>2-8</strong>에서 자세히 다룹니다. 여기서는 중괄호 안에서 어떻게 쓰이는지만 살짝 확인합니다.
</div>

**• React: 삼항 연산자로 조건부 렌더링 맛보기**

```jsx
{courseStatus === "완료" ? "완료" : "진행 중"}
```

**• React: map으로 리스트 렌더링 맛보기**

```jsx
{courseList.map(course => <li key={course.id}>{course.title}</li>)}
```

---

## 10. JSX에서 자주 하는 실수

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">Fragment 없이 여러 요소 반환</div>
    <div class="wda-fcard-dsc">최상위 요소가 여러 개면 에러가 난다. Fragment나 하나의 태그로 감싸야 한다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">class를 그대로 사용</div>
    <div class="wda-fcard-dsc">JSX에서는 className을 써야 한다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">태그를 안 닫는다</div>
    <div class="wda-fcard-dsc">img, input처럼 내용이 없는 태그도 반드시 닫아야 한다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">중괄호 안에 if문을 넣는다</div>
    <div class="wda-fcard-dsc">중괄호에는 값으로 평가되는 표현식만 들어갈 수 있다.</div>
  </div>
</div>

---

## 11. 다음 학습 흐름

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">JavaScript 값</div><div class="wda-fnode-dsc">courseTitle 등</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">JSX</div><div class="wda-fnode-dsc">중괄호로 값 삽입</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">React가 UI로 해석</div><div class="wda-fnode-dsc">실제 화면 표시</div></div>
</div>

**▶ 주제별 다음 학습 문서**

<table class="wda-mtable">
  <tr>
    <th>주제</th>
    <th>자세히 다루는 문서</th>
  </tr>
  <tr>
    <td>컴포넌트 만들기</td>
    <td>2-2 컴포넌트 만들기</td>
  </tr>
  <tr>
    <td>조건부 렌더링</td>
    <td>2-7 조건부 렌더링</td>
  </tr>
  <tr>
    <td>리스트 렌더링</td>
    <td>2-8 리스트 렌더링</td>
  </tr>
</table>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>JSX는 <strong>JavaScript 확장 문법</strong>이며, HTML과 비슷하지만 같지 않다.</li>
    <li>컴포넌트는 <strong>하나의 최상위 요소</strong>만 반환해야 하며, 불필요한 div 대신 <strong>Fragment</strong>를 쓸 수 있다.</li>
    <li>중괄호 <code>{ }</code> 안에는 <strong>값으로 평가되는 표현식</strong>만 넣을 수 있다.</li>
    <li><code>class</code> 대신 <strong>className</strong>, <code>for</code> 대신 <strong>htmlFor</strong>를 사용한다.</li>
    <li>인라인 스타일은 <strong>객체</strong>로 전달하며, 속성명은 camelCase다.</li>
    <li>조건부/리스트 렌더링 상세는 각각 <strong>2-7, 2-8</strong>에서 다룬다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 여러 요소를 반환할 때 그냥 나란히 적어도 된다?</div>
    <div class="wda-mistake-right">정답: 반드시 <strong>하나의 부모 요소</strong>(또는 Fragment)로 감싸야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: class="study-card"라고 써도 동작하니 문제없다?</div>
    <div class="wda-mistake-right">정답: JavaScript 예약어와 충돌하므로 반드시 <strong>className</strong>을 써야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 중괄호 안에 if문을 넣어 조건 분기할 수 있다?</div>
    <div class="wda-mistake-right">정답: 중괄호에는 <strong>표현식</strong>만 들어갈 수 있어, if문 대신 삼항 연산자를 사용한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 인라인 스타일은 문자열로 지정해도 된다?</div>
    <div class="wda-mistake-right">정답: JSX의 style은 <strong>객체</strong> <code>{{ color: 'blue' }}</code> 형태로 전달해야 한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 부모 요소</div>
    <div class="wda-formula-block-body"><code>하나의 최상위 요소 or Fragment</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 속성명</div>
    <div class="wda-formula-block-body"><code>class→className, for→htmlFor</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 중괄호</div>
    <div class="wda-formula-block-body"><code>{ } = 값(표현식)만 가능</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · 인라인 스타일</div>
    <div class="wda-formula-block-body"><code>style={{ camelCase }}</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">여러 JSX 요소를 불필요한 div 없이 묶는 문법은?</div>
    <div class="wda-flip-back">Fragment(&lt;&gt;...&lt;/&gt;)다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">HTML의 class 속성은 JSX에서 무엇으로 바꿔 써야 하나?</div>
    <div class="wda-flip-back">className으로 바꿔 써야 한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">JSX 중괄호 안에 넣을 수 있는 것은?</div>
    <div class="wda-flip-back">값으로 평가되는 표현식만 가능하다. if문 같은 명령문은 넣을 수 없다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">인라인 스타일은 어떤 형태로 전달해야 하나?</div>
    <div class="wda-flip-back">객체 형태이며, 속성명은 camelCase로 작성한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">조건부 렌더링과 리스트 렌더링 상세는 어디서 다루나?</div>
    <div class="wda-flip-back">조건부 렌더링은 2-7, 리스트 렌더링은 2-8에서 다룬다.</div>
  </div>
</div>
