---
title: "1-2 Fetch API와 JSON"
category: "frontend"
section: "http"
date: "2026-08-02"
status: "completed"
description: "브라우저 내장 함수 fetch로 실제 HTTP 요청을 보내는 기본 방법과, 데이터 교환 형식으로 JSON이 왜 필요한지를 정리합니다."
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
  • <strong>fetch 기본 사용법</strong> — 자바스크립트로 HTTP 요청을 보내는 가장 기본적인 방법을 익힙니다<br>
  • <strong>응답 다루기</strong> — fetch가 돌려주는 Response에서 실제 데이터를 꺼내는 과정을 이해합니다<br>
  • <strong>JSON이 필요한 이유</strong> — 자바스크립트 객체를 왜 그대로 전송할 수 없는지 파악합니다<br>
  • <strong>기본 에러 처리</strong> — 요청이 실패했을 때 최소한 무엇을 확인해야 하는지 감을 잡습니다
</div>

---

## 1. fetch — 브라우저가 기본 제공하는 요청 함수

1-1에서 배운 HTTP 요청/응답을, 실제로 자바스크립트 코드에서 어떻게 보내고 받는지 다룹니다. 브라우저는 <code>fetch</code>라는 함수를 기본으로 제공하며, 이 함수가 HTTP 요청을 만들어 서버로 보내고 응답을 돌려줍니다.

이 기본기를 익히고 나면, 다음 문서(1-3 CORS 알아보기)에서 다루는 "왜 어떤 API 요청은 브라우저에서 막히는가"도 훨씬 쉽게 이해할 수 있습니다.

`fetch`는 브라우저에 내장된 함수로, 별도 설치 없이 바로 사용해 서버에 HTTP 요청을 보낼 수 있습니다. `fetch(주소)` 형태로 호출하면 서버와 통신을 시작하고, 결과가 도착하면 이를 활용할 수 있습니다.

**• fetch로 GET 요청 보내기**

```js
async function getUsers() {
  const response = await fetch('/api/users'); // 1. 요청 보내기
  const users = await response.json();        // 2. 응답 본문을 JSON으로 변환
  console.log(users);
  return users;
}
```

`fetch`는 결과가 바로 나오지 않는 **비동기** 방식으로 동작하므로, 결과를 기다렸다가 사용하려면 `await`를 붙여야 합니다. `await`를 쓰려면 그 함수 앞에 `async`를 붙여 "이 함수는 기다림이 필요하다"고 알려줘야 합니다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1. fetch 호출</div><div class="wda-fnode-dsc">주소로 요청을 보내고 응답을 기다림</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2. Response 수신</div><div class="wda-fnode-dsc">상태 코드·헤더가 담긴 응답 상자 도착</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3. .json() 변환</div><div class="wda-fnode-dsc">본문 데이터를 실제로 쓸 수 있는 객체로 파싱</div></div>
</div>

**💡 사용 팁**

<div class="wda-callout wda-cb">
  <p>첫 번째 <code>await</code>는 "서버와 연결되어 응답이 도착했는지"를 기다리고, 두 번째 <code>await</code>는 "그 응답 본문을 다 읽어서 객체로 바꿨는지"를 기다립니다. 연결 확인과 본문 다운로드는 서로 다른 단계이기 때문에 각각 기다려야 합니다.</p>
</div>

---

## 2. POST 요청 — 데이터 보내기

데이터를 조회하는 게 아니라 새로 만들 때는 `method`, `headers`, `body`를 함께 지정합니다.

**• fetch로 POST 요청 보내기**

```js
async function createUser(userData) {
  const response = await fetch('/api/users', {
    method: 'POST',                                   // 1. 메서드 지정
    headers: { 'Content-Type': 'application/json' },   // 2. 보내는 데이터 형식 명시
    body: JSON.stringify(userData),                    // 3. 객체를 문자열로 변환해 전송
  });
  return response.json();
}
```

**▶ fetch 옵션 역할**

<table class="wda-mtable">
<thead><tr><th>옵션</th><th>역할</th></tr></thead>
<tbody>
<tr><td>method</td><td>GET, POST, PUT, DELETE 중 어떤 동작인지 지정</td></tr>
<tr><td>headers</td><td>보내는 데이터의 형식, 인증 정보 등 부가 설명</td></tr>
<tr><td>body</td><td>실제로 서버에 전달할 데이터</td></tr>
</tbody>
</table>

---

## 3. JSON — 왜 객체를 그대로 보낼 수 없을까

자바스크립트 객체는 브라우저 메모리 안에서만 의미가 있는 구조입니다. 네트워크를 통해 서버로 보내려면 **문자열** 형태로 바꿔야 하는데, 이때 쓰는 표준 형식이 **JSON(JavaScript Object Notation)**입니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">자바스크립트 객체</div>
    <code>{ name: '홍길동', age: 25 }</code><br>메모리에만 존재하는 구조. 네트워크로 그대로 전송 불가능합니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">JSON 문자열</div>
    <code>'{"name":"홍길동","age":25}'</code><br>텍스트이므로 네트워크로 전송 가능하고, 어떤 언어에서든 해석할 수 있습니다.
  </div>
</div>

이 둘을 오가는 두 개의 짝 메서드가 있습니다.

**▶ 객체·문자열 변환 메서드**

<table class="wda-mtable">
<thead><tr><th>메서드</th><th>역할</th></tr></thead>
<tbody>
<tr><td>JSON.stringify(obj)</td><td>객체 → 문자열 (서버로 보낼 때)</td></tr>
<tr><td>JSON.parse(str) / response.json()</td><td>문자열 → 객체 (받은 데이터를 쓸 때)</td></tr>
</tbody>
</table>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>JSON에서는 키와 문자열 값에 반드시 큰따옴표(<code>"</code>)를 써야 하고, 마지막 항목 뒤에 쉼표를 붙이면 안 됩니다. 자바스크립트 객체 문법보다 훨씬 엄격하므로, 직접 JSON 문자열을 작성할 일이 있다면 이 규칙을 지켜야 합니다.</p>
</div>

---

## 4. 최소한의 에러 처리

`fetch`는 서버가 404나 500을 응답해도 "통신 자체는 성공"했다고 판단하기 때문에, 실패 여부는 직접 확인해야 합니다.

**• fetch 에러 처리**

```js
async function safeFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`요청 실패: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('에러 발생:', error.message);
  }
}
```

`response.ok`는 상태 코드가 200~299 범위일 때 `true`가 되는 값입니다. 이 값을 확인하지 않으면 404 페이지 데이터를 정상 데이터인 것처럼 다뤄 화면이 이상하게 깨질 수 있습니다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><strong>fetch</strong>는 브라우저 내장 함수로, HTTP 요청을 보내고 응답을 돌려받는다.</li>
    <li>fetch는 <strong>비동기</strong>이므로 <code>async</code>/<code>await</code>와 함께 사용한다.</li>
    <li>객체를 보낼 때는 <strong>JSON.stringify</strong>로, 받은 데이터는 <strong>response.json()</strong>으로 변환한다.</li>
    <li>fetch는 4xx/5xx도 성공으로 취급하므로 <strong>response.ok</strong>를 직접 확인해야 한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: fetch에 await를 하나만 쓰면 데이터를 바로 쓸 수 있다?</div>
    <div class="wda-mistake-right">정답: 첫 <code>await fetch(...)</code>는 <strong>응답 상자(Response)</strong>만 줄 뿐이다. 실제 데이터를 쓰려면 <code>await response.json()</code>까지 한 번 더 거쳐야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 404 에러가 나면 fetch의 catch 블록이 실행된다?</div>
    <div class="wda-mistake-right">정답: fetch는 <strong>네트워크 자체가 끊긴 경우</strong>에만 catch로 넘어간다. 404, 500 같은 HTTP 에러는 <code>response.ok</code>를 직접 확인해야 잡을 수 있다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 조회</div>
    <div class="wda-formula-block-body"><code>await fetch(url).then(res=>res.json())</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 전송 변환</div>
    <div class="wda-formula-block-body"><code>객체 →(stringify)→ 문자열 → 서버</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 안전장치</div>
    <div class="wda-formula-block-body"><code>if (!response.ok) throw Error</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">fetch를 사용할 때 왜 async 함수가 필요한가요?</div>
    <div class="wda-flip-back">fetch는 비동기 함수라 결과를 기다리는 await를 써야 하고, await는 async 함수 안에서만 쓸 수 있기 때문입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">객체를 서버로 보내기 전에 무엇을 해야 하나요?</div>
    <div class="wda-flip-back">JSON.stringify()로 문자열로 변환해야 합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">JSON에서 키와 문자열 값에 꼭 써야 하는 것은?</div>
    <div class="wda-flip-back">큰따옴표(")입니다. 작은따옴표는 허용되지 않습니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">fetch가 404를 받아도 catch로 안 가는 이유는?</div>
    <div class="wda-flip-back">서버와의 통신 자체는 정상적으로 성공했기 때문입니다. HTTP 에러는 response.ok로 직접 확인해야 합니다.</div>
  </div>
</div>
