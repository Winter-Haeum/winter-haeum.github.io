---
title: "2-3 props로 데이터 전달하기"
status: "completed"
description: "부모 컴포넌트가 CourseCard에 강의 정보를 전달하는 과정을 통해 props 개념과 구조분해, 기본값, children까지 React props의 기초를 정리한다."
category: "React"
section: "Core"
tags:
  - react
  - props
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
  • <strong>props 개념 이해하기</strong> — 부모가 자식에게 값을 전달하는 방식을 이해합니다.<br>
  • <strong>다양한 값 전달하기</strong> — 문자열, 숫자, 배열, 객체, 함수를 props로 전달하는 방법을 익힙니다.<br>
  • <strong>구조분해와 기본값</strong> — props를 간결하게 받고 기본값을 설정하는 방법을 배웁니다.<br>
  • <strong>children 이해하기</strong> — 태그 사이의 내용을 전달받는 children을 익힙니다.
</div>

---

## 1. props가 필요한 순간

`StudyCard` 컴포넌트를 여러 강의에 재사용하고 싶다고 해봅시다. 강의마다 제목과 난이도가 다른데, 컴포넌트 코드 자체를 강의마다 새로 만들 수는 없습니다.

부모가 자식에게 값을 전달하는 방법이 필요합니다.

---

## 2. 부모가 자식에게 값을 전달한다

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">StudyDashboard (부모)</div>
    어떤 강의 정보를 보여줄지 정한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">StudyCard (자식)</div>
    전달받은 값을 화면에 표시한다.
  </div>
</div>

**• React: 부모가 자식에게 props 전달하기**

```jsx
function StudyCard({ title, level }) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{level}</p>
    </article>
  );
}

function StudyDashboard() {
  return <StudyCard title="JSX 기초" level="입문" />;
}
```

---

## 3. props는 객체로 들어온다

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">일반 변수</div>
    함수 내부에서 직접 선언하는 값이다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">props</div>
    외부(부모)에서 전달받아 하나의 객체로 묶여 들어오는 값이다.
  </div>
</div>

**• React: props를 객체로 받기**

```jsx
function StudyCard(props) {
  return <h3>{props.title}</h3>;
}
```

`<StudyCard title="JSX 기초" level="입문" />`로 전달한 속성들이 `{ title: "JSX 기초", level: "입문" }`라는 하나의 객체로 묶여 들어옵니다.

---

## 4. 문자열/숫자/불리언 전달

**• React: 문자열·숫자·불리언 props 전달하기**

```jsx
<StudyCard title="JSX 기초" durationMinutes={30} isCompleted={false} />
```

문자열은 따옴표, 숫자와 불리언은 중괄호로 전달합니다.

---

## 5. 배열/객체/function 전달 맛보기

**• React: 배열·객체·함수 props 전달하기**

```jsx
<StudyCard
  tags={["입문", "필수"]}
  author={{ name: "지수" }}
  onSelect={() => console.log("선택됨")}
/>
```

배열, 객체, 함수도 모두 중괄호로 전달할 수 있습니다.

---

## 6. 구조분해로 props 받기

`props.title`처럼 매번 점을 찍는 대신, 구조분해로 필요한 값만 바로 꺼내 받을 수 있습니다.

**• React: 구조분해로 props 받기**

```jsx
function StudyCard({ title, level }) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{level}</p>
    </article>
  );
}
```

---

## 7. 기본값 사용하기

**• React: props 기본값 설정하기**

```jsx
function StudyCard({ title, level = "입문" }) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{level}</p>
    </article>
  );
}
```

`level`을 전달하지 않으면 자동으로 `"입문"`이 사용됩니다.

---

## 8. children

태그와 태그 사이에 넣은 내용은 `children`이라는 이름의 props로 전달됩니다.

**• React: children props 사용하기**

```jsx
function StudySummary({ children }) {
  return <div className="summary">{children}</div>;
}

<StudySummary>
  <p>오늘 3개 강의를 완료했습니다.</p>
</StudySummary>
```

---

## 9. props는 읽기 전용이다

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  props는 읽기 전용입니다. 자식 컴포넌트에서 props 값을 직접 바꿀 수 없습니다.
</div>

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">props</div>
    부모가 전달, 자식은 읽기만 가능하다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">state</div>
    컴포넌트 자신이 관리하며 바꿀 수 있다.
  </div>
</div>

값이 바뀌어야 한다면 props가 아니라 state를 사용해야 하며, 자세한 내용은 <strong>2-4 state로 상태 관리하기</strong>에서 다룹니다.

---

## 10. 다음 학습 흐름

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">부모 데이터</div><div class="wda-fnode-dsc">title, level 등</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">props 전달</div><div class="wda-fnode-dsc">&lt;StudyCard title=.. /&gt;</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">자식 렌더링</div><div class="wda-fnode-dsc">전달받은 값으로 화면 표시</div></div>
</div>

---

## 11. 초보자 실수

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">props를 자식에서 직접 수정한다</div>
    <div class="wda-fcard-dsc">props는 읽기 전용이라 값을 바꾸려 하면 안 된다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">숫자를 따옴표로 감싸 전달한다</div>
    <div class="wda-fcard-dsc">durationMinutes="30"은 문자열이 된다. 숫자는 중괄호로 전달해야 한다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">children을 다른 이름으로 구조분해한다</div>
    <div class="wda-fcard-dsc">{`{ content }`}처럼 받으면 undefined가 된다. 반드시 children으로 받아야 한다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">기본값 없이 값이 없을 상황을 대비하지 않는다</div>
    <div class="wda-fcard-dsc">값이 빠질 수 있는 props는 기본값을 정해두는 것이 안전하다.</div>
  </div>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>props는 <strong>부모 → 자식</strong> 방향으로만 전달되는 데이터다.</li>
    <li>전달받은 props는 하나의 <strong>객체</strong>로 들어오며, <strong>구조분해</strong>로 필요한 값만 꺼내 받을 수 있다.</li>
    <li>문자열은 따옴표, <strong>숫자·불리언·배열·객체·함수</strong>는 중괄호로 전달한다.</li>
    <li>기본값은 구조분해 자리에서 <strong>등호(=)</strong>로 지정한다.</li>
    <li><strong>children</strong>은 태그 사이의 내용을 전달받는 특별한 props다.</li>
    <li>props는 <strong>읽기 전용</strong>이며, 값을 바꾸려면 state를 사용해야 한다(2-4).</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 자식 컴포넌트에서 props 값을 바꿔도 된다?</div>
    <div class="wda-mistake-right">정답: props는 <strong>읽기 전용</strong>이며, 값이 바뀌어야 한다면 state를 사용해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 숫자를 전달할 때도 따옴표를 써도 된다?</div>
    <div class="wda-mistake-right">정답: 따옴표로 감싸면 <strong>문자열</strong>이 되므로, 숫자는 반드시 <strong>중괄호</strong>로 전달해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: children은 아무 이름으로나 구조분해해서 받아도 된다?</div>
    <div class="wda-mistake-right">정답: 태그 사이의 내용은 항상 <strong>children</strong>이라는 이름으로 전달되므로, 다른 이름으로 받으면 undefined가 된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: props와 state는 같은 개념이다?</div>
    <div class="wda-mistake-right">정답: props는 <strong>부모가 주는 읽기 전용</strong> 값, state는 <strong>컴포넌트 자신이 관리</strong>하는 값으로 역할이 다르다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 데이터 흐름</div>
    <div class="wda-formula-block-body"><code>부모 → 자식 (단방향)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 전달 규칙</div>
    <div class="wda-formula-block-body"><code>문자열="", 나머지={ }</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 받기</div>
    <div class="wda-formula-block-body"><code>{ title, level } 구조분해</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · children</div>
    <div class="wda-formula-block-body"><code>태그 사이 내용 = children</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">props는 자식 컴포넌트에서 수정할 수 있나?</div>
    <div class="wda-flip-back">없다. 읽기 전용이며, 값이 바뀌어야 한다면 state를 사용해야 한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">children은 꼭 이름이 children이어야 하나?</div>
    <div class="wda-flip-back">그렇다. 태그 사이의 내용은 기본적으로 children이라는 이름의 props로 전달된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">숫자 props를 전달할 때 올바른 문법은?</div>
    <div class="wda-flip-back">중괄호로 감싸야 한다. 따옴표로 감싸면 문자열이 된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">props.title처럼 매번 점을 찍지 않고 쓰는 방법은?</div>
    <div class="wda-flip-back">구조분해로 { title }처럼 받으면 된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">props 기본값은 어떻게 설정하나?</div>
    <div class="wda-flip-back">구조분해 자리에서 등호(=)로 지정한다. 예: { level = "입문" }</div>
  </div>
</div>
