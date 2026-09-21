---
title: "3-2 커스텀 훅에 타입 적용하기"
category: "frontend"
section: "patterns"
date: "2026-08-03"
status: "completed"
description: "커스텀 훅의 반환값 타입을 정의하는 방법과 API 상태 훅에서 data·loading·error를 다루는 패턴, 타입을 과하게 복잡하게 만들지 않는 기준을 정리합니다."
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
  • <strong>커스텀 훅 반환값 타입</strong> — 훅이 무엇을 돌려주는지 타입으로 명확히 합니다<br>
  • <strong>API 상태 훅 패턴</strong> — data·loading·error를 다루는 훅의 타입을 설계합니다<br>
  • <strong>제네릭 활용</strong> — 다양한 데이터 타입에 재사용 가능한 훅을 만듭니다<br>
  • <strong>적정선 지키기</strong> — 타입을 과하게 복잡하게 만들지 않는 기준을 이해합니다
</div>

---

## 1. 커스텀 훅도 반환값 타입이 중요하다

커스텀 훅은 컴포넌트 사이에서 반복되는 로직을 함수 하나로 묶어낸 것입니다. 훅을 사용하는 쪽에서는 이 훅이 무엇을 돌려주는지 알아야 하므로, 반환값의 타입을 명확히 하는 것이 중요합니다.

**• TypeScript: 반환 타입이 추론되는 커스텀 훅**

```ts
function useToggle(initial: boolean = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue((v) => !v);

  return { value, toggle }; // 반환 타입은 자동으로 추론됨
}
```

이런 간단한 훅은 반환값 타입을 따로 적지 않아도 TypeScript가 알아서 `{ value: boolean; toggle: () => void }` 형태로 추론해줍니다.

---

## 2. API 상태를 다루는 훅 — data, loading, error

API 요청처럼 여러 단계를 거치는 로직은 데이터, 로딩 여부, 에러 메시지를 함께 관리하는 경우가 많습니다. 이런 상태를 제네릭과 함께 정의하면 다양한 데이터 타입에 재사용할 수 있는 훅을 만들 수 있습니다.

**• TypeScript: 제네릭 API 상태 훅**

```ts
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data: T) => setState({ data, loading: false, error: null }))
      .catch(() => setState({ data: null, loading: false, error: "요청 실패" }));
  }, [url]);

  return state;
}
```

**• React: useFetch 훅 사용**

```tsx
interface User {
  id: number;
  name: string;
}

function Profile() {
  const { data, loading, error } = useFetch<User>("/api/user");

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  return <p>{data?.name}</p>;
}
```

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">data</div><div class="wda-fcard-dsc">아직 값이 없을 수 있으므로 T | null로 표현합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">loading</div><div class="wda-fcard-dsc">요청이 진행 중인지 나타내는 boolean입니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">error</div><div class="wda-fcard-dsc">오류 메시지가 있을 수도, 없을 수도 있어 string | null로 표현합니다.</div></div>
</div>

`useFetch<User>("/api/user")`처럼 훅을 사용할 때 타입을 지정해주면, `data`가 자동으로 `User | null`로 추론되어 컴포넌트에서 안전하게 접근할 수 있습니다.

---

## 3. 타입을 과하게 복잡하게 만들지 않기

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">적당한 수준</div>
    반환값의 형태를 interface 하나로 명확히 정의하고, 제네릭은 꼭 필요한 곳(재사용되는 데이터 타입)에만 사용합니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">과도해지는 경우</div>
    모든 경우의 수를 미리 대비하려고 제네릭 조건과 유틸리티 타입을 여러 겹으로 쌓으면, 오히려 코드를 읽고 유지보수하기 어려워집니다.
  </div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>타입 설계는 코드의 안전성을 높이기 위한 수단이지, 그 자체가 목적이 되어서는 곤란합니다. 처음에는 이 문서에서 다룬 정도의 간단한 인터페이스와 제네릭만으로도 충분하며, 필요할 때 조금씩 다듬어가는 방식이 입문자에게 더 안전한 접근입니다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>커스텀 훅은 <strong>반환값의 형태</strong>가 명확해야 사용하는 쪽에서 안전하게 다룰 수 있다.</li>
    <li>API 상태 훅은 보통 <strong>data, loading, error</strong> 세 가지를 함께 관리한다.</li>
    <li>제네릭을 활용하면 <strong>하나의 훅으로 다양한 데이터 타입</strong>을 안전하게 다룰 수 있다.</li>
    <li>타입은 <strong>필요한 만큼만</strong> 설계하고, 과도하게 복잡해지지 않도록 주의한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: data는 항상 값이 채워져 있으므로 바로 접근해도 된다?</div>
    <div class="wda-mistake-right">정답: 요청이 아직 끝나지 않았거나 실패했을 수 있으므로 <strong>data는 T | null</strong>로 다루고, 사용하기 전에 값이 있는지 확인해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 타입을 최대한 정교하게 만들수록 무조건 좋은 코드다?</div>
    <div class="wda-mistake-right">정답: 과도하게 복잡한 타입은 오히려 <strong>가독성과 유지보수성을 해칠 수 있어</strong>, 필요한 수준에서 균형을 맞추는 것이 중요하다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 상태</div>
    <div class="wda-formula-block-body"><code>data | loading | error</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · data 타입</div>
    <div class="wda-formula-block-body"><code>T | null</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 균형</div>
    <div class="wda-formula-block-body"><code>필요한 만큼만 설계</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">API 상태 훅에서 흔히 함께 관리하는 세 가지는?</div>
    <div class="wda-flip-back">data, loading, error입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">아직 도착하지 않은 데이터는 어떤 타입으로 표현하나요?</div>
    <div class="wda-flip-back">T | null처럼 null을 포함한 union 타입으로 표현합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">타입을 설계할 때 가장 중요한 기준은 무엇인가요?</div>
    <div class="wda-flip-back">필요한 만큼만 설계해 가독성과 유지보수성을 해치지 않는 것입니다.</div>
  </div>
</div>
