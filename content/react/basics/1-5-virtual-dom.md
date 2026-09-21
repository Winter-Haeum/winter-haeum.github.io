---
title: "1-5 가상 DOM의 개념"
status: "completed"
description: "강의 대시보드에서 수강 상태가 바뀔 때 화면이 다시 그려지는 흐름을 통해 Virtual DOM의 필요성과 기본 동작을 정리한다."
category: "React"
section: "Basics"
tags:
  - react
  - virtual-dom
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
  • <strong>Virtual DOM이 필요한 이유</strong> — 화면을 직접 고치는 방식의 한계를 이해합니다.<br>
  • <strong>React의 계산 방식</strong> — state가 바뀌면 React가 UI를 어떻게 다시 계산하는지 파악합니다.<br>
  • <strong>비교와 반영</strong> — 이전 화면과 다음 화면을 비교해 바뀐 부분만 반영한다는 개념을 이해합니다.<br>
  • <strong>흔한 오해 정리</strong> — Virtual DOM이 항상 빠르다는 오해를 바로잡습니다.
</div>

---

## 1. Virtual DOM이 필요한 순간

강의 대시보드에서 강의 하나의 수강 상태를 "진행 중"에서 "완료"로 바꾼다고 해봅시다. 화면에서 바뀌어야 하는 부분은 그 강의 카드 하나뿐입니다.

하지만 어떤 부분이 바뀌었는지, 무엇을 다시 그려야 하는지를 매번 직접 계산해서 지정하는 것은 번거롭고 실수하기 쉽습니다.

React는 이 계산을 대신해줍니다. 개발자는 데이터(state)만 바꾸면, 화면의 어느 부분을 고쳐야 하는지는 React가 알아서 찾아냅니다.

---

## 2. DOM 직접 조작과 React 렌더링

**💡 설명**

<div class="wda-callout wda-ci">
  DOM 직접 조작과 React 방식의 기본 차이는 <strong>1-4 React가 뭔가요?</strong>에서 다뤘습니다. 여기서는 그 차이가 화면을 다시 그리는 단계에서 구체적으로 어떻게 이어지는지 살펴봅니다.
</div>

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">DOM 직접 조작</div>
    바뀐 요소를 직접 찾아서 그 부분만 수정하도록 코드로 지정해야 한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">React 렌더링</div>
    state만 바꾸면, 어디를 고칠지는 React가 계산해서 처리한다.
  </div>
</div>

---

## 3. React는 UI를 다시 계산한다

state가 바뀌면 컴포넌트 함수가 다시 실행되어 **새로운 UI 구조**를 계산합니다. 이 계산 결과는 실제 화면이 아니라, 화면 구조를 표현한 가벼운 JavaScript 객체입니다.

이것이 Virtual DOM입니다.

**• JavaScript: Virtual DOM 객체 형태**

```javascript
// <li>변수와 자료형 - 완료</li>를 표현한 모습
const virtualElement = {
  type: "li",
  props: { children: "변수와 자료형 - 완료" }
};
```

---

## 4. 이전 UI와 다음 UI를 비교한다

state가 바뀔 때마다 React는 **이전에 계산했던 결과**와 **새로 계산한 결과**를 비교합니다. 이 비교 과정에서 실제로 달라진 부분이 어디인지 찾아냅니다.

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">이전 UI</div>
    <div class="wda-fcard-dsc">state 변경 전, 마지막으로 계산했던 화면 구조.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">다음 UI</div>
    <div class="wda-fcard-dsc">state 변경 후, 새로 계산한 화면 구조.</div>
  </div>
</div>

---

## 5. 바뀐 부분만 실제 DOM에 반영한다

비교 결과 실제로 달라진 부분만 실제 화면(DOM)에 반영합니다. 나머지 부분은 그대로 둡니다.

**• 바뀐 부분만 반영되는 예시**

```javascript
// 강의 목록 5개 중 1개만 상태가 바뀌었다면
// 실제로 반영되는 것은 그 1개 항목뿐이다
```

---

## 6. state 변경과 re-render

**• React: state 변경으로 re-render 유발하기**

```jsx
function toggleComplete(courseId) {
  setCourseList(list =>
    list.map(course =>
      course.id === courseId
        ? { ...course, completed: !course.completed }
        : course
    )
  );
}
```

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">state 변경</div><div class="wda-fnode-dsc">setCourseList 호출</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">render</div><div class="wda-fnode-dsc">새 UI 구조 계산</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">비교</div><div class="wda-fnode-dsc">이전 UI와 차이 확인</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">실제 DOM 반영</div><div class="wda-fnode-dsc">바뀐 부분만 갱신</div></div>
</div>

---

## 7. Diffing과 Reconciliation 맛보기

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">Diffing</div>
    <div class="wda-fcard-dsc">이전 UI와 새 UI를 비교해서 달라진 부분을 찾는 과정.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">Reconciliation</div>
    <div class="wda-fcard-dsc">찾아낸 차이를 실제 DOM에 반영하는 과정.</div>
  </div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  강의 목록처럼 여러 항목을 반복해서 그릴 때는 각 항목에 <code>key</code>를 지정해야, 순서가 바뀌거나 항목이 추가·삭제되어도 React가 어떤 항목이 바뀐 것인지 정확히 추적할 수 있습니다. key 선택 기준과 실전 예제는 <strong>2-8 리스트 렌더링</strong>에서 자세히 다룹니다.
</div>

---

## 8. Virtual DOM에 대한 흔한 오해

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">흔한 오해</div>
    Virtual DOM을 쓰면 항상 DOM을 직접 조작하는 것보다 빠르다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">실제 역할</div>
    아주 단순한 변경은 비교 과정이 오히려 부담일 수 있다. 화면이 복잡하고 변경이 잦을수록 React의 계산 방식이 유리해진다.
  </div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  Virtual DOM은 무조건 빠르다는 뜻이 아닙니다. "매번 어디를 고칠지 직접 계산하지 않아도 된다"는 점이 핵심입니다.
</div>

---

## 9. 다음 학습 흐름

**▶ 주제별 다음 학습 문서**

<table class="wda-mtable">
  <tr>
    <th>주제</th>
    <th>자세히 다루는 문서</th>
  </tr>
  <tr>
    <td>key와 리스트 렌더링 상세</td>
    <td>2-8 리스트 렌더링</td>
  </tr>
  <tr>
    <td>React 프로젝트 실제 생성</td>
    <td>1-6 React 프로젝트 제대로 이해하기</td>
  </tr>
  <tr>
    <td>state 다루는 방법 상세</td>
    <td>2-4 state로 상태 관리하기</td>
  </tr>
</table>

---

## 10. 초보자 실수

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">state를 직접 변형한다</div>
    <div class="wda-fcard-dsc">courseList.push(...)처럼 원본을 직접 바꾸면 React가 변경을 감지하지 못할 수 있다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">key 없이 리스트를 렌더링한다</div>
    <div class="wda-fcard-dsc">어떤 항목이 바뀌었는지 정확히 추적하지 못해 예상과 다르게 동작할 수 있다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">Virtual DOM이 항상 빠르다고 생각한다</div>
    <div class="wda-fcard-dsc">단순한 변경에서는 비교 과정이 오히려 오버헤드가 될 수 있다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">state 없이 화면을 직접 바꾸려 한다</div>
    <div class="wda-fcard-dsc">React가 관리하는 화면은 state를 통해서만 다시 계산된다.</div>
  </div>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>Virtual DOM은 실제 화면이 아니라 화면 구조를 표현한 <strong>가벼운 JavaScript 객체</strong>다.</li>
    <li>state가 바뀌면 React는 컴포넌트를 다시 실행해 <strong>새 UI를 계산</strong>한다.</li>
    <li>React는 <strong>이전 UI와 새 UI를 비교</strong>해서 달라진 부분만 실제 DOM에 반영한다.</li>
    <li><strong>Diffing</strong>은 차이를 찾는 과정, <strong>Reconciliation</strong>은 그 차이를 실제 DOM에 반영하는 과정이다.</li>
    <li>리스트를 렌더링할 때는 <strong>key</strong>가 있어야 항목을 정확히 추적할 수 있다(상세는 2-8).</li>
    <li>Virtual DOM은 <strong>항상</strong> 더 빠른 것이 아니라, 복잡하고 변경이 잦은 화면에서 유리하다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Virtual DOM은 항상 DOM 직접 조작보다 빠르다?</div>
    <div class="wda-mistake-right">정답: 아주 단순한 변경에서는 <strong>비교 과정이 오버헤드</strong>가 되어 직접 조작이 더 빠를 수 있다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: state를 직접 바꿔도(mutate) React가 알아서 화면을 갱신한다?</div>
    <div class="wda-mistake-right">정답: <code>setCourseList</code> 같은 <strong>state 변경 함수</strong>를 통해야 React가 변경을 감지하고 다시 계산한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 리스트에 key가 없어도 화면은 똑같이 보이니 상관없다?</div>
    <div class="wda-mistake-right">정답: 화면은 비슷해 보여도 <strong>항목 추적이 부정확</strong>해질 수 있어 key는 필수다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Diffing과 Reconciliation은 같은 단계다?</div>
    <div class="wda-mistake-right">정답: Diffing은 <strong>차이를 찾는 과정</strong>, Reconciliation은 <strong>그 차이를 반영하는 과정</strong>으로 역할이 다르다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 정체</div>
    <div class="wda-formula-block-body"><code>Virtual DOM = 화면 구조를 표현한 JS 객체</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 흐름</div>
    <div class="wda-formula-block-body"><code>state 변경 → render → 비교 → 실제 DOM 반영</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 역할 구분</div>
    <div class="wda-formula-block-body"><code>Diffing = 비교, Reconciliation = 반영</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · 오해 정정</div>
    <div class="wda-formula-block-body"><code>항상 빠름 X, 복잡한 화면에서 유리 O</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Virtual DOM의 실체는 무엇인가?</div>
    <div class="wda-flip-back">화면 구조를 표현한 가벼운 JavaScript 객체다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">state가 바뀌면 React는 무엇을 하나?</div>
    <div class="wda-flip-back">컴포넌트를 다시 실행해 새로운 UI 구조를 계산한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Diffing과 Reconciliation의 차이는?</div>
    <div class="wda-flip-back">Diffing은 차이를 찾는 과정, Reconciliation은 그 차이를 실제 DOM에 반영하는 과정이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">리스트 렌더링에 key가 필요한 이유는?</div>
    <div class="wda-flip-back">항목이 추가·삭제·순서 변경되어도 각 항목을 정확히 추적하기 위해서다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Virtual DOM이 항상 더 빠른 것은 아닌 이유는?</div>
    <div class="wda-flip-back">아주 단순한 변경에서는 비교 과정 자체가 오버헤드가 될 수 있기 때문이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">state를 바꿀 때 지켜야 할 것은?</div>
    <div class="wda-flip-back">직접 변형(mutate)하지 않고, state 변경 함수를 통해 새 값으로 바꿔야 한다.</div>
  </div>
</div>
