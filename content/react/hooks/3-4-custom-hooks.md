---
title: "3-4 Custom Hooks 만들기"
status: "completed"
description: "반복되는 Hook 로직을 함수로 추출하는 custom hook의 개념과 use 접두사 규칙, useToggle·useInput·useLearningData로 보는 실전 패턴을 정리한다."
category: "React"
section: "Hooks"
tags:
  - react
  - hooks
  - custom-hooks
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
  • <strong>Custom Hook 개념</strong> — 반복되는 Hook 로직을 함수로 추출하는 원리를 이해합니다<br>
  • <strong>use 접두사 규칙</strong> — React가 Hook으로 인식하도록 만드는 이름 규칙과 호출 규칙을 익힙니다<br>
  • <strong>실전 조합</strong> — useToggle·useInput·useLearningData를 직접 만들어봅니다
</div>

---

## 1. Custom Hook이 필요한 이유

Custom Hook은 useState·useEffect·useRef 같은 기본 Hook을 조합해, 반복되는 로직을 재사용 가능한 함수로 뽑아낸 것입니다.

이 문서는 [3-1](/react/hooks/3-1-usestate), [3-2](/react/hooks/3-2-useeffect), [3-3](/react/hooks/3-3-useref)에서 배운 Hook들을 어떻게 조합해서 나만의 Hook을 만드는지 다룹니다.

`HookDashboard`와 `SearchPanel` 양쪽에서 입력값을 관리하는 로직을 각각 작성한다고 해보겠습니다.

**• React: 중복되는 useState 로직**

```jsx
// HookDashboard에서
const [titleValue, setTitleValue] = useState('');
const handleTitleChange = (e) => setTitleValue(e.target.value);

// SearchPanel에서 — 변수 이름만 다를 뿐 완전히 같은 로직
const [searchValue, setSearchValue] = useState('');
const handleSearchChange = (e) => setSearchValue(e.target.value);
```

두 컴포넌트가 쓰는 코드가 토씨 하나 다르지 않습니다. 이렇게 반복되는 로직을 함수 하나로 뽑아내면, 양쪽에서 같은 함수를 호출하기만 하면 됩니다.

---

## 2. use 접두사 규칙과 기본 구조

**• React: use 접두사 기본 구조**

```jsx
function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => setValue(e.target.value);

  return { value, onChange };
}
```

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">이름은 반드시 use로 시작</div><div class="wda-fcard-dsc">React와 ESLint가 이 함수를 Hook으로 인식하고, Hook 규칙을 검사할 수 있게 해줍니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">내부에서 다른 Hook 호출</div><div class="wda-fcard-dsc">함수 내부에서 useState·useEffect·useRef 등을 호출해야 Custom Hook으로서 의미가 있습니다.</div></div>
</div>

---

## 3. useToggle 만들기

모달을 열고 닫거나 상세 영역을 펼치고 접는 것처럼, 불리언 값을 뒤집는 로직을 뽑아냅니다.

**• React: useToggle Hook 만들기**

```jsx
function useToggle(initialValue = false) {
  const [isOpen, setIsOpen] = useState(initialValue);

  const toggle = () => setIsOpen(prev => !prev);

  return [isOpen, toggle];
}
```

**• React: useToggle 사용 예시**

```jsx
function HookDashboard() {
  const [isOpen, toggle] = useToggle(false);

  return (
    <div>
      <button type="button" onClick={toggle}>{isOpen ? '접기' : '펼치기'}</button>
      {isOpen && <p>상세 내용</p>}
    </div>
  );
}
```

배열로 반환하면 사용하는 쪽에서 `const [isPanelOpen, togglePanel] = useToggle();`처럼 원하는 이름을 자유롭게 붙일 수 있습니다.

---

## 4. useInput 만들기

**• React: useInput Hook 만들기**

```jsx
function useInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => setValue(e.target.value);
  const reset = () => setValue(initialValue);

  return { value, onChange, reset };
}
```

**• React: useInput 사용 예시**

```jsx
function SearchPanel() {
  const searchKeyword = useInput('');

  return (
    <div>
      <input value={searchKeyword.value} onChange={searchKeyword.onChange} />
      <button type="button" onClick={searchKeyword.reset}>초기화</button>
    </div>
  );
}
```

`useInput`은 객체로 반환합니다. `value`, `onChange`, `reset`처럼 필요한 것만 이름 그대로 꺼내 쓰기 편하기 때문입니다.

---

## 5. useLearningData 만들기 — Hook 합성

[3-2 문서](/react/hooks/3-2-useeffect)에서 다룬 데이터 페칭 패턴을 Custom Hook으로 뽑아내면, 여러 컴포넌트에서 같은 로직을 재사용할 수 있습니다.

**• React: useLearningData Hook 만들기**

```jsx
function useLearningData(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    fetch(url)
      .then(res => res.json())
      .then(json => setData(json))
      .finally(() => setIsLoading(false));
  }, [url]);

  return { data, isLoading };
}
```

**• React: useLearningData 사용 예시**

```jsx
function HookDashboard() {
  const { data, isLoading } = useLearningData('/api/courses');

  if (isLoading) return <p>불러오는 중...</p>;
  return <p>{data?.length}개의 강의</p>;
}
```

`useLearningData`는 내부에서 `useState`와 `useEffect`를 함께 사용합니다. 이렇게 작은 Hook을 조합해 더 큰 기능의 Hook을 만드는 것을 **Hook 합성**이라고 합니다.

---

## 6. Hook 규칙

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">최상위에서만 호출</div><div class="wda-fcard-dsc">반복문, 조건문, 중첩 함수 안에서 Hook을 호출하면 안 됩니다. React는 호출 순서로 각 Hook의 상태를 구분합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">React 함수 안에서만 호출</div><div class="wda-fcard-dsc">함수형 컴포넌트나 다른 Custom Hook 내부에서만 호출해야 합니다.</div></div>
</div>

**• React: 조건문 안에서 Hook 호출 — 금지 예시**

```jsx
function Bad() {
  if (someCondition) {
    const [value] = useToggle(); // ❌ 조건문 안에서 호출 — 금지
  }
}
```

---

## 7. 로직은 공유, 상태는 독립

같은 Custom Hook을 여러 컴포넌트에서 호출해도, 각 호출은 서로 다른 state를 가집니다.

**• React: Custom Hook의 독립적인 state**

```jsx
function PanelA() {
  const [isOpen, toggle] = useToggle(false); // PanelA만의 독립적인 상태
}

function PanelB() {
  const [isOpen, toggle] = useToggle(false); // PanelB만의 독립적인 상태 — PanelA와 무관
}
```

`useToggle`이라는 **로직**은 같지만, 호출할 때마다 새로운 **state 저장소**가 만들어집니다. 여러 컴포넌트가 값을 진짜로 공유해야 한다면 Custom Hook만으로는 부족하며, 별도의 전역 상태 도구가 필요합니다.

---

## 8. 초보자 실수

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>함수 이름을 use로 시작하지 않는 경우</strong></p>
  <p>내부에서 useState를 쓰더라도 함수 이름이 <code>use</code>로 시작하지 않으면 React와 ESLint가 이를 Hook으로 인식하지 못해, Hook 규칙 검사가 제대로 동작하지 않을 수 있습니다.</p>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>같은 Custom Hook을 쓰면 상태도 같이 바뀐다고 오해하는 경우</strong></p>
  <p>Custom Hook은 로직(만드는 방식)만 재사용될 뿐, 호출할 때마다 독립적인 state가 새로 생성됩니다.</p>
</div>

---

## 9. ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>Custom Hook은 이름이 반드시 <strong>use로 시작</strong>하며, 내부에서 다른 Hook을 호출하는 함수다.</li>
    <li>Custom Hook은 <strong>로직만 공유</strong>하고, 상태(state)는 호출할 때마다 <strong>독립적으로 생성</strong>된다.</li>
    <li>Hook은 반복문·조건문·중첩 함수 안이 아니라 항상 <strong>컴포넌트 최상위</strong>에서만 호출한다.</li>
    <li>Custom Hook 안에서 다른 Hook을 조합(Hook 합성)해 더 큰 기능을 만들 수 있다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 같은 Custom Hook을 여러 컴포넌트에서 쓰면 상태도 공유된다?</div>
    <div class="wda-mistake-right">정답: 로직만 공유되고, 상태는 호출할 때마다 <strong>독립적으로 생성</strong>된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 함수 이름이 use로 시작하지 않아도 내부에서 useState를 쓰면 Hook으로 동작한다?</div>
    <div class="wda-mistake-right">정답: React와 ESLint가 Hook으로 인식하려면 반드시 <strong>use로 시작</strong>해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 조건문 안에서 Hook을 호출해도 조건만 잘 맞으면 문제없다?</div>
    <div class="wda-mistake-right">정답: React는 Hook이 <strong>호출되는 순서</strong>로 상태를 관리하므로, 조건문 안에서 호출하면 순서가 뒤섞여 에러가 발생할 수 있다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 작명 규칙</div>
    <div class="wda-formula-block-body"><code>함수명은 반드시 use로 시작</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 호출 위치</div>
    <div class="wda-formula-block-body"><code>컴포넌트 최상위에서만</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 공유 범위</div>
    <div class="wda-formula-block-body"><code>로직 공유 O / 상태 공유 X</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Custom Hook을 만들 때 함수 이름은 반드시 무엇으로 시작해야 하나요?</div>
    <div class="wda-flip-back">use. 예: useToggle, useInput, useLearningData</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">두 컴포넌트가 같은 Custom Hook을 사용할 때 상태는 공유되나요?</div>
    <div class="wda-flip-back">아니요. 로직만 재사용되고, 각 컴포넌트마다 독립적인 상태 저장소가 생성됩니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Hook을 반복문이나 조건문 안에서 호출하면 안 되는 이유는?</div>
    <div class="wda-flip-back">React가 Hook 호출 순서로 상태를 관리하기 때문에, 순서가 뒤섞이면 에러가 발생합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">작은 Hook 여러 개를 조합해 더 큰 기능의 Hook을 만드는 것을 무엇이라 하나요?</div>
    <div class="wda-flip-back">Hook 합성이라고 합니다. useLearningData가 useState와 useEffect를 조합한 것이 예시입니다.</div>
  </div>
</div>
