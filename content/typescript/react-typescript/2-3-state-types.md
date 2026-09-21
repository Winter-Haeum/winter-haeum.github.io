---
title: "2-3 State 타입 정의하기"
category: "frontend"
section: "react-typescript"
date: "2026-08-03"
status: "completed"
description: "useState의 타입 추론 방식과 제네릭으로 타입을 명시하는 방법, null이 될 수 있는 상태를 다루는 요령을 정리합니다."
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
  • <strong>타입 추론</strong> — useState가 초깃값으로 타입을 자동으로 정하는 방식을 이해합니다<br>
  • <strong>명시적 타입 지정</strong> — 제네릭으로 state의 타입을 직접 정하는 방법을 익힙니다<br>
  • <strong>null이 될 수 있는 state</strong> — 초깃값이 없는 상태를 안전하게 다루는 방법을 배웁니다<br>
  • <strong>배열·객체 state</strong> — 여러 값을 담는 state의 타입 지정 방법을 확인합니다
</div>

---

## 1. useState의 타입 추론

`useState`는 넘겨준 초깃값을 보고 state의 타입을 자동으로 추론합니다. 초깃값이 문자열이면 string으로, 숫자면 number로 정해지는 식입니다.

**• React: useState 타입 추론**

```tsx
const [count, setCount] = useState(0);        // number로 추론
const [text, setText] = useState("안녕");      // string으로 추론
const [isOpen, setIsOpen] = useState(false);   // boolean으로 추론

// setCount("1"); // 오류: number state에 문자열을 넣을 수 없음
```

초깃값의 타입이 명확한 경우에는 이렇게 별도로 타입을 적지 않아도 TypeScript가 알아서 처리해줍니다.

---

## 2. 제네릭으로 타입 명시하기

초깃값만으로는 원하는 타입을 정확히 표현하기 어려운 경우, `useState<T>`처럼 꺾쇠괄호 안에 타입을 직접 지정할 수 있습니다.

**• React: useState 제네릭으로 타입 명시**

```tsx
// 특정 문자열 리터럴 중 하나만 허용하고 싶을 때
const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

// 빈 배열로 시작하지만 문자열 배열임을 명시하고 싶을 때
const [list, setList] = useState<string[]>([]);
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>useState([])처럼 빈 배열만 넘기면 TypeScript가 배열의 요소 타입을 정확히 추론하지 못할 수 있습니다. 이런 경우 useState&lt;string[]&gt;([])처럼 제네릭으로 요소 타입을 명확히 적어주는 것이 좋습니다.</p>
</div>

---

## 3. null이 될 수 있는 state 다루기

아직 데이터를 불러오지 않은 초기 상태처럼, 값이 없을 수도 있는 state는 `null`과의 union 타입으로 표현합니다.

**• React: null 가능한 state 다루기**

```tsx
interface User {
  id: number;
  name: string;
}

const [user, setUser] = useState<User | null>(null);

// user.name; // 오류: user가 null일 수 있으므로 바로 접근하면 위험

if (user) {
  console.log(user.name); // 이 블록 안에서는 User로 좁혀짐
}
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">초깃값이 명확할 때</div>
    0, "", false처럼 값의 형태가 뚜렷하면 타입 추론에 맡겨도 충분합니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">초깃값이 null·빈 배열일 때</div>
    나중에 어떤 데이터가 들어올지 제네릭으로 명확히 적어주는 것이 안전합니다.
  </div>
</div>

---

## 4. 객체·배열 형태의 state

여러 속성을 가진 데이터를 state로 다룰 때는 interface로 구조를 먼저 정의하고, 이를 state의 타입으로 사용합니다.

**• React: 객체·배열 state 타입 지정**

```tsx
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const [todos, setTodos] = useState<Todo[]>([]);

const addTodo = (text: string) => {
  const newTodo: Todo = { id: Date.now(), text, completed: false };
  setTodos([...todos, newTodo]);
};
```

state를 갱신할 때는 기존 배열이나 객체를 직접 수정하지 않고, 스프레드 문법(`...`)으로 새로운 배열·객체를 만들어 전달하는 방식이 React의 일반적인 관례입니다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>useState는 <strong>초깃값을 보고 타입을 자동으로 추론</strong>한다.</li>
    <li>추론만으로 부족할 때는 <strong>useState&lt;타입&gt;(초깃값)</strong>처럼 제네릭으로 명시한다.</li>
    <li>값이 없을 수도 있는 state는 <strong>null과의 union 타입</strong>으로 표현한다.</li>
    <li>객체·배열 state를 갱신할 때는 <strong>스프레드 문법으로 새 값</strong>을 만들어 전달한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 빈 배열로 useState를 초기화하면 타입은 신경 쓰지 않아도 된다?</div>
    <div class="wda-mistake-right">정답: 빈 배열([])만으로는 요소 타입을 정확히 추론하기 어려우므로, <strong>useState&lt;T[]&gt;([])</strong>처럼 타입을 함께 적어주는 것이 안전하다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: User | null 타입의 state는 항상 user.name처럼 바로 접근해도 된다?</div>
    <div class="wda-mistake-right">정답: null일 가능성이 있으므로 <strong>if(user)와 같은 조건 확인</strong>을 거친 뒤 접근해야 안전하다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 추론</div>
    <div class="wda-formula-block-body"><code>useState(초깃값) → 타입 자동 추론</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 명시</div>
    <div class="wda-formula-block-body"><code>useState&lt;T&gt;(초깃값)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · null 대비</div>
    <div class="wda-formula-block-body"><code>useState&lt;T | null&gt;(null)</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">useState(0)의 타입은 어떻게 정해지나요?</div>
    <div class="wda-flip-back">초깃값 0을 보고 number로 자동 추론됩니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">빈 배열로 시작하는 state는 왜 타입을 명시하는 것이 좋나요?</div>
    <div class="wda-flip-back">빈 배열만으로는 요소 타입을 정확히 추론하기 어렵기 때문입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">초기값이 없을 수도 있는 데이터를 담는 state는 어떻게 표현하나요?</div>
    <div class="wda-flip-back">타입 | null 형태의 union 타입으로 표현합니다.</div>
  </div>
</div>
