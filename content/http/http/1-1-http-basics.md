---
title: "1-1 HTTP 통신의 기초"
category: "frontend"
section: "http"
date: "2026-08-02"
status: "completed"
description: "브라우저와 서버가 대화하는 공용 언어인 HTTP가 무엇인지, 요청과 응답이 어떻게 구성되는지, method와 status code의 의미를 정리합니다."
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
  • <strong>HTTP 개념 이해</strong> — 브라우저와 서버가 데이터를 주고받는 공용 규약이 무엇인지 정리합니다<br>
  • <strong>요청/응답 구조 파악</strong> — HTTP 메시지가 어떤 정보로 이루어지는지 이해합니다<br>
  • <strong>메서드 구분</strong> — GET, POST 등 대표 메서드가 각각 어떤 동작을 뜻하는지 익힙니다<br>
  • <strong>상태 코드 감 잡기</strong> — 2xx, 4xx, 5xx가 각각 무엇을 의미하는지 큰 틀에서 파악합니다
</div>

---

## 1. HTTP란 무엇인가

Web & Network 카테고리에서 배운 "API는 요청과 응답으로 동작한다"는 원리를, 실제 웹에서 가장 널리 쓰이는 방식인 HTTP로 구체화합니다.

이 문서에서는 HTTP가 무엇이고 요청/응답이 어떻게 구성되는지에 집중합니다. 이 요청을 자바스크립트 코드로 직접 보내는 방법(fetch)은 다음 문서(1-2 Fetch API와 JSON)에서 다룹니다.

**HTTP(HyperText Transfer Protocol)**는 웹 브라우저와 서버가 데이터를 주고받을 때 따르는 공용 규칙입니다. 브라우저 주소창에 입력하는 `https://`의 그 `http`가 바로 이 규칙의 이름입니다.

브라우저가 "이 페이지 주세요"라고 요청하면, 서버는 정해진 형식에 맞춰 "여기 있습니다"라고 응답합니다. 이 요청과 응답이 항상 같은 형식을 따르기 때문에, 어떤 브라우저와 어떤 서버 조합이든 문제없이 대화할 수 있습니다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1. 요청</div><div class="wda-fnode-dsc">브라우저가 서버에 정해진 형식으로 요청</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2. 처리</div><div class="wda-fnode-dsc">서버가 요청을 해석하고 처리</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3. 응답</div><div class="wda-fnode-dsc">서버가 정해진 형식으로 결과를 돌려줌</div></div>
</div>

---

## 2. HTTP 메시지의 구성 — 요청

HTTP 요청 메시지는 크게 세 부분으로 이루어집니다.

**▶ HTTP 요청 메시지 구성**

<table class="wda-mtable">
<thead><tr><th>구성 요소</th><th>역할</th><th>예시</th></tr></thead>
<tbody>
<tr><td>요청 라인</td><td>무엇을 원하는지 (메서드 + 주소)</td><td><code>GET /users/1 HTTP/1.1</code></td></tr>
<tr><td>헤더</td><td>부가 정보 (인증, 데이터 형식 등)</td><td><code>Content-Type: application/json</code></td></tr>
<tr><td>바디</td><td>실제로 보낼 데이터 (GET은 보통 비어 있음)</td><td><code>{"name": "홍길동"}</code></td></tr>
</tbody>
</table>

**헤더(Header)**는 이 요청에 대한 부가 설명이고, **바디(Body)**는 실제로 전달하려는 데이터입니다. 편지에 비유하면 헤더는 봉투에 적힌 보내는 사람·받는 사람 정보, 바디는 편지지에 적힌 내용물이라고 생각하면 이해하기 쉽습니다.

---

## 3. HTTP 메서드 — 무엇을 하고 싶은지 알리기

메서드는 서버에게 "이 요청으로 무엇을 하고 싶은지"를 알리는 동사 역할을 합니다.

**▶ HTTP 메서드별 의미**

<table class="wda-mtable">
<thead><tr><th>메서드</th><th>의미</th><th>사용 예</th></tr></thead>
<tbody>
<tr><td>GET</td><td>데이터 조회</td><td>게시글 목록 가져오기</td></tr>
<tr><td>POST</td><td>데이터 생성</td><td>회원가입, 새 게시글 작성</td></tr>
<tr><td>PUT / PATCH</td><td>데이터 수정</td><td>프로필 정보 수정</td></tr>
<tr><td>DELETE</td><td>데이터 삭제</td><td>게시글 삭제, 회원 탈퇴</td></tr>
</tbody>
</table>

이 네 가지는 데이터를 다루는 기본 동작인 **CRUD(Create·Read·Update·Delete)**와 정확히 대응합니다. "글을 쓰고, 읽고, 고치고, 지운다"는 흐름이 곧 POST-GET-PUT-DELETE입니다.

**📌 개념**

<div class="wda-callout wda-cb">
  <p>GET은 조회만 하므로 데이터를 URL 뒤에 붙여 보내고, 브라우저 기록에 남습니다. POST는 데이터를 바디(Body)에 담아 보내므로 URL에 노출되지 않습니다. 그래서 비밀번호처럼 민감한 정보는 절대 GET으로 보내면 안 되고, 반드시 POST를 사용해야 합니다.</p>
</div>

---

## 4. HTTP 메시지의 구성 — 응답과 상태 코드

서버는 처리 결과를 응답 메시지로 돌려줍니다. 응답도 상태 라인, 헤더, 바디로 구성되며, 상태 라인에 **상태 코드(Status Code)**가 포함됩니다.

상태 코드는 요청이 어떻게 처리됐는지를 3자리 숫자로 알려주는 신호입니다.

**▶ 상태 코드 대역별 의미**

<table class="wda-mtable">
<thead><tr><th>코드 대역</th><th>의미</th><th>대표 코드</th></tr></thead>
<tbody>
<tr><td>2xx</td><td>성공</td><td>200 OK, 201 Created</td></tr>
<tr><td>3xx</td><td>리다이렉션 (추가 동작 필요)</td><td>301 Moved Permanently</td></tr>
<tr><td>4xx</td><td>클라이언트(요청자) 잘못</td><td>400 Bad Request, 404 Not Found</td></tr>
<tr><td>5xx</td><td>서버 잘못</td><td>500 Internal Server Error</td></tr>
</tbody>
</table>

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">200 OK</div><div class="wda-fcard-dsc">요청이 정상적으로 처리된 가장 일반적인 성공 응답입니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">404 Not Found</div><div class="wda-fcard-dsc">요청한 주소에 해당하는 데이터나 페이지가 없습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">401 Unauthorized</div><div class="wda-fcard-dsc">로그인이 필요하거나 인증 정보가 없습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">500 Server Error</div><div class="wda-fcard-dsc">서버 내부 코드에 문제가 생겨 처리하지 못했습니다.</div></div>
</div>

**🔎 참고**

<div class="wda-callout wda-cw">
  <p>4xx는 "요청을 보낸 쪽이 다시 확인해야 할 문제"(주소 오타, 인증 누락)이고, 5xx는 "서버 쪽에서 고쳐야 할 문제"입니다. 에러 화면이 떴을 때 앞자리 숫자만 봐도 어느 쪽을 먼저 의심해야 할지 감을 잡을 수 있습니다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>HTTP는 <strong>브라우저와 서버가 데이터를 주고받는 공용 규칙</strong>이다.</li>
    <li>요청/응답 메시지는 <strong>라인(요청/상태) + 헤더 + 바디</strong>로 구성된다.</li>
    <li>메서드는 <strong>GET(조회)·POST(생성)·PUT/PATCH(수정)·DELETE(삭제)</strong>로 구분한다.</li>
    <li>상태 코드는 <strong>2xx 성공, 4xx 요청자 잘못, 5xx 서버 잘못</strong>으로 나뉜다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 헤더와 바디는 같은 정보를 담는다?</div>
    <div class="wda-mistake-right">정답: 헤더는 <strong>요청/응답에 대한 부가 설명</strong>(형식, 인증 등)이고, 바디는 <strong>실제로 주고받는 데이터</strong>다. GET 요청은 조회만 하므로 바디가 보통 비어 있다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 상태 코드가 200이 아니면 무조건 프론트엔드 코드 버그다?</div>
    <div class="wda-mistake-right">정답: 4xx는 요청 쪽(주소, 인증)을, <strong>5xx는 서버 쪽 문제</strong>를 가리킨다. 코드를 보기 전에 상태 코드 앞자리부터 확인하는 습관이 디버깅 속도를 높인다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 메시지 구조</div>
    <div class="wda-formula-block-body"><code>요청/응답 = 라인 + 헤더 + 바디</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 메서드</div>
    <div class="wda-formula-block-body"><code>CRUD = POST·GET·PUT·DELETE</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 상태 코드</div>
    <div class="wda-formula-block-body"><code>2xx 성공 · 4xx 내 잘못 · 5xx 서버 잘못</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">HTTP는 무엇의 줄임말인가요?</div>
    <div class="wda-flip-back">HyperText Transfer Protocol, 브라우저와 서버가 데이터를 주고받는 공용 규칙입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">데이터를 새로 만들 때 쓰는 HTTP 메서드는?</div>
    <div class="wda-flip-back">POST입니다. 조회는 GET, 수정은 PUT/PATCH, 삭제는 DELETE를 사용합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">404 상태 코드는 무엇을 의미하나요?</div>
    <div class="wda-flip-back">요청한 주소에 해당하는 데이터나 페이지를 찾을 수 없다는 뜻입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">비밀번호를 GET으로 보내면 안 되는 이유는?</div>
    <div class="wda-flip-back">GET은 데이터를 URL에 노출시켜 브라우저 기록 등에 그대로 남기 때문입니다.</div>
  </div>
</div>
