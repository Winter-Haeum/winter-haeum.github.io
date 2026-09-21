---
title: "2-1 Firestore 데이터베이스"
category: "frontend"
section: "services"
date: "2026-08-03"
status: "completed"
description: "SQL 데이터베이스와 다른 NoSQL 문서형 데이터베이스인 Firestore의 collection·document 구조와 기본적인 데이터 읽기·쓰기 흐름을 정리합니다."
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
  • <strong>Firestore의 정체</strong> — NoSQL 문서형 데이터베이스라는 개념을 이해합니다<br>
  • <strong>collection과 document</strong> — Firestore 데이터 구조의 핵심 단위를 파악합니다<br>
  • <strong>기본 CRUD 흐름</strong> — 데이터를 저장하고 읽어오는 기본 코드를 익힙니다<br>
  • <strong>SQL과의 차이</strong> — 표 형태 데이터베이스와 어떻게 다른지 비교합니다
</div>

---

## 1. Firestore는 NoSQL 문서형 데이터베이스다

Firestore는 Firebase가 제공하는 데이터베이스 서비스입니다. 여기서 중요한 것은 Firestore가 우리가 흔히 떠올리는 **표(테이블) 형태의 SQL 데이터베이스가 아니라는 점**입니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">SQL 데이터베이스</div>
    행과 열로 이루어진 표 형태로 데이터를 저장하며, 모든 행이 같은 열 구조를 따라야 합니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Firestore (NoSQL 문서형)</div>
    JSON과 비슷한 형태의 "문서" 단위로 데이터를 저장하며, 문서마다 서로 다른 필드를 가질 수 있습니다.
  </div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>Firestore를 배울 때 SQL 데이터베이스의 사고방식을 그대로 가져오면 헷갈리기 쉽습니다. Firestore는 미리 정해진 표 구조를 따르지 않고, 각 문서가 유연하게 자신만의 필드를 가질 수 있는 구조라는 점을 기억해야 합니다.</p>
</div>

---

## 2. Collection과 Document — 폴더와 파일처럼

Firestore의 데이터는 **collection**과 **document**라는 두 가지 단위로 계층을 이룹니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">Collection</div><div class="wda-fcard-dsc">여러 문서를 담는 그릇입니다. 폴더에 가깝습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Document</div><div class="wda-fcard-dsc">실제 데이터가 저장되는 단위입니다. 파일에 가깝습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Field</div><div class="wda-fcard-dsc">문서 안에 담기는 개별 데이터 항목입니다.</div></div>
</div>

**• Collection과 Document 구조 예시**

```
users (collection)
 ├─ doc_1 { name: "김철수", age: 25 }
 └─ doc_2 { name: "이영희", age: 30 }
```

collection 안에는 여러 document가 들어있고, 각 document 안에는 필드(Key-Value) 형태로 실제 데이터가 담깁니다. document 하나하나가 서로 다른 필드 구성을 가질 수 있다는 점이 SQL 표와 가장 큰 차이입니다.

---

## 3. Firestore 초기화하기

React 프로젝트에서 Firestore를 사용하려면 먼저 SDK를 초기화해야 합니다.

**• JavaScript: Firestore SDK 초기화**

```js
// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
```

이렇게 만든 `db` 객체를 통해 이후 모든 데이터 읽기·쓰기 작업을 진행합니다.

---

## 4. 데이터 쓰기와 읽기 기본 흐름

**• JavaScript: Firestore 데이터 쓰기·읽기**

```js
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';

// 데이터 저장하기
async function addUser() {
  await addDoc(collection(db, 'users'), {
    name: '김철수',
    age: 25,
  });
}

// 데이터 전체 읽어오기
async function getUsers() {
  const snapshot = await getDocs(collection(db, 'users'));
  const users = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return users;
}
```

**💡 사용 팁**

<div class="wda-callout wda-cb">
  <p>Firestore와의 통신은 인터넷을 통해 이루어지는 작업이므로 시간이 걸립니다. 그래서 async/await을 사용해 결과가 올 때까지 기다린 뒤 다음 코드를 실행하는 것이 기본입니다.</p>
</div>

---

## 5. 언제 SQL, 언제 Firestore를 선택할까

**▶ SQL과 Firestore 선택 기준**

<table class="wda-mtable">
<thead><tr><th>상황</th><th>적합한 선택</th></tr></thead>
<tbody>
<tr><td>정확한 수치 계산이 중요한 결제·재고 시스템</td><td>SQL 데이터베이스</td></tr>
<tr><td>데이터 구조가 자주 바뀌는 초기 단계 프로젝트</td><td>Firestore</td></tr>
<tr><td>실시간으로 화면이 갱신되어야 하는 채팅·대시보드</td><td>Firestore</td></tr>
</tbody>
</table>

어느 한쪽이 항상 옳은 것은 아니며, 프로젝트의 데이터 성격과 요구사항에 따라 선택이 달라질 수 있습니다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>Firestore는 <strong>NoSQL 문서형 데이터베이스</strong>이며, 표 형태의 SQL과 구조가 다르다.</li>
    <li>데이터는 <strong>collection(폴더) 안의 document(파일)</strong> 형태로 저장된다.</li>
    <li>같은 collection 안의 document라도 <strong>서로 다른 필드</strong>를 가질 수 있다.</li>
    <li>Firestore와의 모든 통신은 <strong>비동기(async/await)</strong>로 처리한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Firestore도 SQL처럼 모든 문서가 같은 컬럼 구조를 따라야 한다?</div>
    <div class="wda-mistake-right">정답: Firestore는 <strong>문서마다 서로 다른 필드</strong>를 가질 수 있는 유연한 구조를 갖는다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: collection과 document는 같은 개념이다?</div>
    <div class="wda-mistake-right">정답: collection은 <strong>여러 문서를 담는 그릇</strong>이고, document는 <strong>실제 데이터가 담기는 단위</strong>로 서로 역할이 다르다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 정체</div>
    <div class="wda-formula-block-body"><code>Firestore = NoSQL 문서형 DB</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 구조</div>
    <div class="wda-formula-block-body"><code>collection(폴더) → document(파일)</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Firestore는 SQL 데이터베이스와 같은 표 형태인가요?</div>
    <div class="wda-flip-back">아니요. Firestore는 문서(document) 단위로 데이터를 저장하는 NoSQL 데이터베이스입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">collection과 document 중 실제 데이터가 담기는 단위는?</div>
    <div class="wda-flip-back">document입니다. collection은 document들을 담는 그릇입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Firestore와의 통신은 동기·비동기 중 무엇으로 처리하나요?</div>
    <div class="wda-flip-back">비동기로 처리하며, 보통 async/await 문법을 사용합니다.</div>
  </div>
</div>
