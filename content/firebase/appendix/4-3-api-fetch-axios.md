---
title: "4-3 API 연동(fetch & axios)"
category: "frontend"
section: "appendix"
date: "2026-08-03"
status: "completed"
description: "fetch와 axios의 차이를 비교하고, API 요청 함수를 분리하는 방식과 loading·error·data 상태를 관리하는 기본 패턴을 정리합니다."
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
  • <strong>fetch와 axios 비교</strong> — 두 도구의 차이와 각각의 장단점을 이해합니다<br>
  • <strong>API 요청 함수 분리</strong> — 통신 로직을 컴포넌트 밖으로 따로 관리하는 이유를 파악합니다<br>
  • <strong>3종 상태 관리</strong> — loading·error·data를 함께 다루는 기본 패턴을 익힙니다<br>
  • <strong>Firebase와의 관계</strong> — 외부 API 연동이 Firebase 서비스와 어떻게 함께 쓰이는지 이해합니다
</div>

---

## 1. fetch와 axios, 무엇이 다를까

브라우저에 내장된 `fetch`와, 별도로 설치하는 라이브러리인 `axios`는 둘 다 서버와 통신하는 도구입니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">fetch</div>
    브라우저 내장 기능이라 설치가 필요 없지만, 응답을 JSON으로 변환하려면 <code>.json()</code>을 한 번 더 호출해야 합니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">axios</div>
    별도 설치가 필요하지만, 응답 데이터가 자동으로 <code>.data</code>에 담기고 에러 처리가 조금 더 명확합니다.
  </div>
</div>

**• JavaScript: fetch와 axios 비교**

```js
// fetch
const res = await fetch('/api/posts');
const data = await res.json();

// axios
const res = await axios.get('/api/posts');
const data = res.data;
```

**💼 실무 팁**

<div class="wda-callout wda-cb">
  <p>작은 프로젝트나 학습 목적이라면 별도 설치가 필요 없는 fetch로 충분하고, 여러 요청을 다루는 실무 프로젝트에서는 axios의 편의 기능이 도움이 될 수 있습니다. 프로젝트 규모와 팀의 선호에 따라 선택하면 됩니다.</p>
</div>

---

## 2. API 요청 함수를 컴포넌트 밖으로 분리하기

컴포넌트 안에 통신 코드를 직접 작성하면 코드가 지저분해지고, 같은 요청을 여러 컴포넌트에서 반복해서 작성하게 됩니다. API 요청을 별도의 함수로 분리해두면 이런 문제를 줄일 수 있습니다.

**• JavaScript: API 요청 함수 분리**

```js
// api/postApi.js
export async function getPosts() {
  const res = await fetch('/api/posts');
  if (!res.ok) throw new Error('게시글을 불러오지 못했습니다');
  return res.json();
}
```

**• React: 분리한 API 함수 사용**

```jsx
// PostList.jsx
import { getPosts } from './api/postApi';

// 컴포넌트에서는 getPosts()만 호출하면 됩니다
```

---

## 3. loading, error, data — 3종 상태 관리

서버 요청은 항상 약간의 시간이 걸리고, 실패할 가능성도 있습니다. 그래서 화면에서는 요청의 진행 상태를 세 가지로 나눠서 관리하는 것이 기본입니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">loading</div><div class="wda-fcard-dsc">요청이 진행 중임을 나타냅니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">error</div><div class="wda-fcard-dsc">요청이 실패했을 때의 상태입니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">data</div><div class="wda-fcard-dsc">요청이 성공했을 때 받은 실제 데이터입니다.</div></div>
</div>

**• React: loading·error·data 상태 관리**

```jsx
function PostList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPosts()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p>{error}</p>;
  return <ul>{data.map((post) => <li key={post.id}>{post.title}</li>)}</ul>;
}
```

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">요청 시작</div><div class="wda-fnode-dsc">loading = true</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">성공</div><div class="wda-fnode-dsc">data 저장, loading = false</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">실패</div><div class="wda-fnode-dsc">error 저장, loading = false</div></div>
</div>

이 세 가지 상태를 챙기지 않으면, 응답이 오기 전에 존재하지 않는 데이터를 화면에 그리려다 오류가 나거나, 요청이 실패했는데도 사용자에게 아무런 안내가 뜨지 않는 문제가 생길 수 있습니다.

---

## 4. Firebase와 외부 API를 함께 쓰는 경우

**💡 설명**

<div class="wda-callout wda-ci">
  <p>Firestore나 Storage는 Firebase SDK가 제공하는 전용 함수(addDoc, getDocs 등)로 통신하지만, 그 외의 외부 API(날씨 정보, 결제 서비스 등)를 호출할 때는 여전히 fetch나 axios가 필요합니다. 즉 fetch/axios는 Firebase 전용 기능이 아니라, Firebase와 함께 실전 앱을 만들 때 외부 서비스를 연동하기 위한 보조 도구로 자주 쓰입니다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>fetch는 <strong>브라우저 내장</strong>, axios는 <strong>별도 설치가 필요한 라이브러리</strong>다.</li>
    <li>API 요청은 <strong>컴포넌트 밖의 별도 함수로 분리</strong>해서 재사용하는 것이 좋다.</li>
    <li>서버 요청은 <strong>loading, error, data</strong> 세 가지 상태로 나눠서 관리하는 것이 기본이다.</li>
    <li>fetch/axios는 <strong>Firebase 전용 기능이 아니며</strong>, 외부 API 연동에 함께 쓰이는 보조 도구다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: axios가 fetch보다 항상 더 좋은 선택이다?</div>
    <div class="wda-mistake-right">정답: 상황에 따라 다르며, <strong>간단한 프로젝트에서는 fetch만으로 충분</strong>한 경우도 많다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 데이터가 도착하기 전에는 화면에 아무것도 신경 쓰지 않아도 된다?</div>
    <div class="wda-mistake-right">정답: <strong>loading·error 상태를 챙기지 않으면</strong> 존재하지 않는 데이터에 접근해 오류가 나거나 실패 안내가 빠질 수 있다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 도구</div>
    <div class="wda-formula-block-body"><code>fetch(내장) vs axios(설치)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 상태</div>
    <div class="wda-formula-block-body"><code>loading · error · data</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">fetch와 axios의 가장 큰 차이는?</div>
    <div class="wda-flip-back">fetch는 브라우저 내장 기능이고, axios는 별도로 설치하는 라이브러리입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">API 요청 시 함께 관리해야 하는 3가지 상태는?</div>
    <div class="wda-flip-back">loading, error, data입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Firestore 통신과 외부 API 통신은 같은 방식으로 하나요?</div>
    <div class="wda-flip-back">아니요. Firestore는 Firebase SDK 전용 함수를, 외부 API는 fetch나 axios를 사용합니다.</div>
  </div>
</div>
