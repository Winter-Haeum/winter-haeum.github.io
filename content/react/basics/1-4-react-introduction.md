---
title: "1-4 React가 뭔가요?"
status: "completed"
description: "강의 대시보드 화면을 예로 React가 필요한 이유, 컴포넌트 기반 사고, JSX·props·state·rendering을 짧게 맛보고 이후 학습 흐름을 안내한다."
category: "React"
section: "Basics"
tags:
  - react
  - jsx
  - component
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
  • <strong>React가 필요한 이유</strong> — 화면이 커질수록 DOM 직접 조작이 왜 힘들어지는지 이해합니다.<br>
  • <strong>컴포넌트 기반 사고</strong> — 화면을 작은 조각으로 나누어 관리하는 방식을 알아봅니다.<br>
  • <strong>핵심 개념 맛보기</strong> — JSX, component, props, state, rendering을 짧게 미리 살펴봅니다.<br>
  • <strong>학습 흐름 잡기</strong> — 이 문서 다음에 무엇을 배우는지 길잡이를 확인합니다.
</div>

---

## 1. React가 필요한 순간

강의 대시보드 화면을 만든다고 해봅시다. 화면에는 제목, 강의 목록, 학습 진행 상태, 필터 버튼이 있습니다.

이미 배운 DOM API로도 이 화면을 만들 수 있습니다. 하지만 목록이 바뀔 때, 진행 상태가 바뀔 때, 필터가 바뀔 때마다 각각 어떤 요소를 찾아서 어떻게 고칠지 코드 곳곳에 직접 적어야 합니다.

화면이 커질수록 "어디를 언제 고쳐야 하는지"를 관리하는 코드가 점점 흩어집니다.

React는 이 문제를 다른 방식으로 접근합니다. **"화면이 어떻게 생겨야 하는지"를 데이터 기준으로 선언**해두면, 데이터가 바뀔 때 화면을 다시 그리는 일은 React가 대신 처리합니다.

---

## 2. React는 UI를 만들기 위한 라이브러리다

**💡 설명**

<div class="wda-callout wda-ci">
  React는 프레임워크가 아니라 <strong>UI(사용자 인터페이스)를 만들기 위한 라이브러리</strong>입니다. 화면 전체의 구조를 강제하지 않고, 필요한 곳에 필요한 만큼 가져다 씁니다.
</div>

React는 라우팅, 상태 관리, 서버 통신 같은 기능을 기본으로 강제하지 않습니다. 화면을 그리는 역할에 집중하고, 나머지는 필요할 때 다른 도구와 조합해서 사용합니다.

---

## 3. DOM 직접 조작과 React 방식

같은 강의 목록을 화면에 그리는 두 가지 방식을 비교해 보겠습니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">DOM 직접 조작</div>

**• JavaScript: DOM 직접 조작으로 목록 그리기**

```javascript
const list = document.getElementById("course-list");
list.innerHTML = "";
courseList.forEach(course => {
  const li = document.createElement("li");
  li.textContent = course.title;
  list.appendChild(li);
});
```
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">React (JSX)</div>

**• React: JSX로 같은 목록 그리기**

```jsx
function CourseList({ courseList }) {
  return (
    <ul>
      {courseList.map(course => (
        <li key={course.id}>{course.title}</li>
      ))}
    </ul>
  );
}
```
  </div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  왼쪽은 요소를 찾고, 만들고, 내용을 채우고, 붙이는 과정을 <strong>직접 지시</strong>합니다. 오른쪽은 "강의 목록이 이렇게 생겼으면 화면은 이런 모양이어야 한다"는 <strong>결과만 선언</strong>합니다. 요소를 만들고 붙이는 과정 자체는 React가 대신 처리합니다.
</div>

---

## 4. 컴포넌트 기반 사고

React는 화면을 하나의 큰 덩어리로 만들지 않고, 역할이 분명한 작은 단위로 나눕니다. 강의 대시보드라면 이렇게 나눌 수 있습니다.

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">CourseHeader</div>
    <div class="wda-fcard-dsc">대시보드 제목을 보여준다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">CourseList / CourseCard</div>
    <div class="wda-fcard-dsc">강의 목록과 강의 카드 하나하나를 그린다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">ProgressSummary</div>
    <div class="wda-fcard-dsc">전체 학습 진행 상태를 보여준다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">FilterButton</div>
    <div class="wda-fcard-dsc">난이도별로 강의 목록을 걸러낸다.</div>
  </div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  각 조각(컴포넌트)은 독립적으로 만들고 확인할 수 있어서, 화면이 커져도 어디를 고쳐야 하는지 찾기 쉬워집니다.
</div>

---

## 5. 데이터에 따라 UI를 그린다

컴포넌트는 데이터를 받아서 그 데이터에 맞는 화면을 반환합니다. `courseList`가 비어 있으면 빈 목록이, 항목이 있으면 그만큼의 카드가 그려집니다.

**• React: 데이터를 받아 화면을 반환하는 컴포넌트**

```jsx
function CourseDashboard({ courseList }) {
  return (
    <section>
      <CourseHeader />
      <CourseList courseList={courseList} />
      <ProgressSummary courseList={courseList} />
    </section>
  );
}
```

**💡 설명**

<div class="wda-callout wda-ci">
  화면을 직접 고치는 대신, <strong>데이터(courseList)를 바꾸면 화면이 그 데이터에 맞게 다시 그려집니다.</strong> "화면을 어떻게 고칠까"가 아니라 "데이터가 무엇인가"에 집중하면 됩니다.
</div>

---

## 6. 선언형 UI란 무엇인가

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">명령형 (Imperative)</div>
    "어떻게(How)" 할지를 단계별로 지시한다. 요소를 찾고, 만들고, 붙이는 순서를 개발자가 관리한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">선언형 (Declarative)</div>
    "무엇(What)"이 결과로 나와야 하는지만 표현한다. 과정은 React가 처리한다.
  </div>
</div>

3번에서 본 두 코드가 정확히 이 차이를 보여줍니다. DOM 직접 조작은 명령형, JSX로 작성한 React 코드는 선언형입니다.

---

## 7. JSX 맛보기

JSX는 JavaScript 안에서 HTML과 비슷한 문법으로 화면 구조를 표현하는 문법입니다.

**• React: JSX 기본 형태**

```jsx
function CourseCard({ courseTitle }) {
  return <li>{courseTitle}</li>;
}
```

**💡 설명**

<div class="wda-callout wda-ci">
  JSX는 브라우저가 그대로 읽을 수 없어서 빌드 도구가 JavaScript로 변환해줍니다. 자세한 문법 규칙은 <strong>2-1 JSX 문법</strong>에서 다룹니다.
</div>

---

## 8. component 맛보기

컴포넌트는 데이터를 받아 JSX를 반환하는 함수입니다.

**• React: 컴포넌트를 태그처럼 조합하기**

```jsx
function CourseDashboard() {
  return (
    <section>
      <CourseHeader />
      <CourseList />
      <ProgressSummary />
    </section>
  );
}
```

`<CourseHeader />`처럼 만들어둔 컴포넌트를 HTML 태그처럼 가져다 쓸 수 있습니다. 컴포넌트를 만드는 방법과 규칙은 <strong>2-2 컴포넌트 만들기</strong>에서 자세히 다룹니다.

---

## 9. props 맛보기

컴포넌트는 `props`라는 형태로 값을 전달받습니다.

**• React: props로 값 전달하기**

```jsx
function CourseCard({ courseTitle }) {
  return <li>{courseTitle}</li>;
}

<CourseCard courseTitle="변수와 스코프" />
```

**💡 설명**

<div class="wda-callout wda-ci">
  같은 <code>CourseCard</code> 컴포넌트라도 <code>courseTitle</code> 값만 바꿔서 여러 번 재사용할 수 있습니다. props를 다루는 자세한 방법은 <strong>2-3 props로 데이터 전달하기</strong>에서 다룹니다.
</div>

---

## 10. state 맛보기

컴포넌트가 스스로 기억하고 바꿀 수 있는 값을 `state`라고 합니다.

**• React: state로 값 기억하기**

```jsx
function FilterButton() {
  const [selectedLevel, setSelectedLevel] = useState("all");

  return (
    <button onClick={() => setSelectedLevel("beginner")}>
      입문 강의만 보기
    </button>
  );
}
```

버튼을 누르면 `selectedLevel`이 바뀌고, 그 값을 사용하는 화면도 함께 다시 그려집니다. state를 다루는 자세한 방법은 <strong>2-4 state로 상태 관리하기</strong>에서 다룹니다.

---

## 11. rendering과 Virtual DOM 맛보기

state나 props 같은 데이터가 바뀌면, React는 화면이 어떤 모습이어야 하는지 다시 계산합니다. 이 과정을 **렌더링**이라고 합니다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">데이터 변경</div><div class="wda-fnode-dsc">courseList, selectedLevel 등</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">컴포넌트 재계산</div><div class="wda-fnode-dsc">새 데이터로 함수 재실행</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">Virtual DOM 비교</div><div class="wda-fnode-dsc">바뀐 부분만 찾음</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">화면 갱신</div><div class="wda-fnode-dsc">바뀐 부분만 반영</div></div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  React는 화면 전체를 매번 새로 그리지 않고, 실제로 바뀐 부분만 찾아서 반영합니다. 이 원리(Virtual DOM, Diffing)는 <strong>1-5 가상 DOM의 개념</strong>에서 자세히 다룹니다.
</div>

---

## 12. 함수형 컴포넌트 중심으로 배우는 이유

React 초기에는 클래스(class) 문법으로 컴포넌트를 만들었습니다. 2019년 Hooks가 등장한 이후로는 함수형 컴포넌트가 표준이 되었습니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">class component (과거)</div>
    <code>class App extends Component</code> 형태로 작성한다. <code>this</code> 키워드 관리가 필요해 코드가 복잡해지기 쉽다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">함수형 컴포넌트 (현재)</div>
    <code>function App()</code> 형태로 작성한다. <code>useState</code>, <code>useEffect</code> 같은 Hooks로 짧고 직관적으로 작성한다.
  </div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  이 문서 시리즈는 <strong>함수형 컴포넌트를 기준으로 학습합니다.</strong> class component는 오래된 코드를 읽을 때 참고할 정도로만 알아두면 충분합니다.
</div>

---

## 13. React가 적합한 경우와 과한 경우

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">React가 적합한 경우</div>
    상태와 사용자 입력이 많고, 화면 일부가 자주 바뀌는 대시보드·목록·폼 같은 화면.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">React가 과할 수 있는 경우</div>
    상호작용이 거의 없는 짧은 소개 페이지 한 장처럼 정적인 화면.
  </div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  React는 모든 문제를 해결하는 도구가 아닙니다. 화면에 데이터가 자주 바뀌고 상호작용이 많을수록 React의 장점이 커집니다.
</div>

---

## 14. 앞으로의 학습 흐름

**▶ 용어별 자세히 다루는 문서**

<table class="wda-mtable">
  <tr>
    <th>용어</th>
    <th>한 줄 설명</th>
    <th>자세히 다루는 문서</th>
  </tr>
  <tr>
    <td><strong>JSX</strong></td>
    <td>JS 안에서 화면 구조를 표현하는 문법</td>
    <td>2-1 JSX 문법 익히기</td>
  </tr>
  <tr>
    <td><strong>component</strong></td>
    <td>props를 받아 JSX를 반환하는 함수</td>
    <td>2-2 컴포넌트 만들기</td>
  </tr>
  <tr>
    <td><strong>props</strong></td>
    <td>컴포넌트에 전달하는 값</td>
    <td>2-3 props로 데이터 전달하기</td>
  </tr>
  <tr>
    <td><strong>state</strong></td>
    <td>컴포넌트가 기억하고 바꾸는 값</td>
    <td>2-4 state로 상태 관리하기</td>
  </tr>
  <tr>
    <td><strong>Virtual DOM</strong></td>
    <td>바뀐 부분만 찾아 반영하는 원리</td>
    <td>1-5 가상 DOM의 개념</td>
  </tr>
  <tr>
    <td><strong>프로젝트 설정</strong></td>
    <td>Vite로 React 프로젝트 만들고 실행하기</td>
    <td>1-6 React 프로젝트 제대로 이해하기</td>
  </tr>
</table>

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1-5</div><div class="wda-fnode-dsc">가상 DOM 원리</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">1-6</div><div class="wda-fnode-dsc">프로젝트 생성·실행</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2-1 ~ 2-2</div><div class="wda-fnode-dsc">JSX·컴포넌트</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2-3 ~ 2-4</div><div class="wda-fnode-dsc">props·state</div></div>
</div>

---

## 15. 초보자가 자주 만나는 React 오해

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">React는 SPA 전용 도구다?</div>
    <div class="wda-fcard-dsc">React는 UI 라이브러리이고, SPA는 React로 만들 수 있는 구조 중 하나일 뿐이다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">JSX는 HTML이다?</div>
    <div class="wda-fcard-dsc">JSX는 JavaScript 문법이며, 빌드 도구가 JS 코드로 변환해야 브라우저가 읽을 수 있다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">class component가 여전히 기본이다?</div>
    <div class="wda-fcard-dsc">2019년 Hooks 이후로는 함수형 컴포넌트가 표준이다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">모든 화면에 React가 필요하다?</div>
    <div class="wda-fcard-dsc">정적인 화면이나 상호작용이 거의 없는 페이지에는 React가 오히려 과할 수 있다.</div>
  </div>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>React는 <strong>UI를 만들기 위한 라이브러리</strong>이며, 화면을 컴포넌트 단위로 나누어 관리한다.</li>
    <li>DOM 직접 조작은 <strong>명령형</strong>(어떻게), React는 <strong>선언형</strong>(무엇)으로 화면을 표현한다.</li>
    <li>컴포넌트는 <strong>props</strong>를 받아 <strong>JSX</strong>를 반환하는 함수이며, <strong>state</strong>로 스스로 값을 기억하고 바꾼다.</li>
    <li>데이터가 바뀌면 React가 <strong>렌더링</strong>을 다시 계산해 바뀐 부분만 화면에 반영한다.</li>
    <li>2019년 Hooks 이후로는 <strong>함수형 컴포넌트</strong>가 표준이며, 이 시리즈도 함수형 컴포넌트를 기준으로 학습한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: React = SPA 전용 도구다?</div>
    <div class="wda-mistake-right">정답: React는 UI 라이브러리이고, SPA는 React로 만들 수 있는 <strong>구조 중 하나</strong>일 뿐이다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: JSX는 HTML을 그대로 쓰는 것이다?</div>
    <div class="wda-mistake-right">정답: JSX는 <strong>JavaScript 확장 문법</strong>이며, 빌드 도구가 JS로 변환해야 실행된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: class component가 요즘도 기본 작성법이다?</div>
    <div class="wda-mistake-right">정답: Hooks 도입 이후 <strong>함수형 컴포넌트</strong>가 표준이며, class component는 옛 코드 이해용이다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: React를 쓰면 항상 더 좋은 코드가 된다?</div>
    <div class="wda-mistake-right">정답: 정적이고 상호작용이 적은 화면에는 React가 <strong>오히려 과할 수 있다</strong>.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · React 정체</div>
    <div class="wda-formula-block-body"><code>React = UI 라이브러리</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 컴포넌트</div>
    <div class="wda-formula-block-body"><code>props → JSX 반환 함수</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 렌더링</div>
    <div class="wda-formula-block-body"><code>데이터 변경 → 다시 계산 → 바뀐 부분만 반영</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · 학습 기준</div>
    <div class="wda-formula-block-body"><code>함수형 컴포넌트 + Hooks</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">React는 프레임워크일까, 라이브러리일까?</div>
    <div class="wda-flip-back">라이브러리다. 화면 전체 구조를 강제하지 않고 필요한 곳에 가져다 쓴다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">명령형과 선언형의 차이는?</div>
    <div class="wda-flip-back">명령형은 "어떻게"를 지시하고, 선언형은 "무엇"이 결과로 나와야 하는지만 표현한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">컴포넌트란 무엇인가?</div>
    <div class="wda-flip-back">props를 받아 JSX를 반환하는 JavaScript 함수다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">state와 props의 공통점은?</div>
    <div class="wda-flip-back">둘 다 컴포넌트가 화면을 그리는 데 사용하는 데이터이며, 값이 바뀌면 화면이 다시 그려진다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">React가 화면을 다시 그릴 때 하는 일은?</div>
    <div class="wda-flip-back">Virtual DOM으로 바뀐 부분만 찾아서 실제 화면에는 그 부분만 반영한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">지금 이 시리즈는 어떤 컴포넌트 작성 방식을 기준으로 하나?</div>
    <div class="wda-flip-back">함수형 컴포넌트와 Hooks를 기준으로 학습한다.</div>
  </div>
</div>
