---
title: "1-2: 클라이언트와 서버, 그리고 HTTP"
category: "frontend"
section: "html"
date: "2026-08-01"
status: "completed"
description: "HTTP가 왜 만들어졌는지, 요청과 응답이 어떤 구조로 오가는지, 주요 메서드와 상태 코드, 쿠키·HTTPS의 역할을 정리합니다."
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
  • <strong>HTTP 탄생 배경</strong> — 왜 통신 규칙이 필요했는지 이해합니다<br>
  • <strong>요청·응답 구조</strong> — HTTP 메시지가 어떤 요소로 구성되는지 파악합니다<br>
  • <strong>메서드와 상태 코드</strong> — 자주 쓰는 HTTP 메서드와 상태 코드의 의미를 익힙니다<br>
  • <strong>쿠키와 HTTPS</strong> — 상태 유지와 보안이 왜 별도로 필요한지 이해합니다
</div>

---

## 1. HTTP가 왜 필요했을까

[이전 문서](/html/html/1-1-www-and-website)에서 클라이언트-서버 모델을 큰 그림으로 살펴봤다면, 이 문서는 그 사이의 대화 규칙인 HTTP를 자세히 다룹니다. HTML 태그 문법은 아직 다루지 않으며, "브라우저와 서버가 정확히 무엇을 주고받는가"에 집중합니다.

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>초창기 웹은 문서 몇 개를 서로 연결하는 정도로도 충분했습니다. 하지만 문서 수가 폭발적으로 늘어나면서 "브라우저가 서버에게 정확히 어떤 문서를 달라고 요청해야 하는가"라는 문제가 생겼습니다.</p>
  <p>이 문제를 풀기 위해 만들어진 것이 <strong>HTTP(HyperText Transfer Protocol)</strong>입니다. HTTP는 클라이언트와 서버가 문서를 주고받을 때 지키기로 약속한 통신 규칙입니다.</p>
</div>

---

## 2. HTTP의 발전 과정

웹이 성장하는 동안 HTTP도 함께 발전해 왔습니다.

**▶ HTTP 버전별 특징**

<table class="wda-mtable">
<thead><tr><th>버전</th><th>특징</th></tr></thead>
<tbody>
<tr><td>HTTP/0.9</td><td>GET 메서드만 존재, HTML만 전송 가능</td></tr>
<tr><td>HTTP/1.0</td><td>헤더 개념 도입, POST 메서드 등장</td></tr>
<tr><td>HTTP/1.1</td><td>가장 널리 쓰인 버전, 연결 유지·캐싱 지원</td></tr>
<tr><td>HTTP/2</td><td>여러 요청을 동시에 처리해 속도 향상</td></tr>
<tr><td>HTTP/3</td><td>더 안정적이고 빠른 최신 전송 방식 사용</td></tr>
</tbody>
</table>

지금 가장 널리 쓰이는 버전은 HTTP/1.1이며, 더 빠른 HTTP/2·HTTP/3로 점차 옮겨가는 중입니다. 버전이 달라도 "요청과 응답을 주고받는다"는 기본 구조는 동일합니다.

---

## 3. HTTP는 사람이 읽을 수 있는 대화다

HTTP 요청과 응답은 사람이 읽을 수 있는 글자로 이루어져 있습니다.

**• HTTP 요청 메시지 예시**

```
GET /articles/10 HTTP/1.1
Host: www.example.com
Accept: text/html
```

풀어서 읽으면 "example.com 서버에게, articles라는 자료 중 10번을 HTML 형식으로 주세요"라는 뜻입니다.

---

## 4. 요청(Request)의 구성

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">요청 라인</div><div class="wda-fcard-dsc">어떤 메서드로, 어떤 경로를, 어떤 버전으로 요청하는지 담습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">요청 헤더</div><div class="wda-fcard-dsc">브라우저 정보, 언어 설정, 쿠키 등 부가 정보를 담습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">요청 본문(Body)</div><div class="wda-fcard-dsc">서버로 실제로 전달할 데이터입니다. 주로 POST 요청에서 사용됩니다.</div></div>
</div>

---

## 5. 자주 쓰는 HTTP 메서드

**▶ HTTP 메서드별 역할**

<table class="wda-mtable">
<thead><tr><th>메서드</th><th>역할</th></tr></thead>
<tbody>
<tr><td>GET</td><td>서버에서 데이터를 읽어올 때 사용합니다.</td></tr>
<tr><td>POST</td><td>서버에 새 데이터를 추가할 때 사용합니다.</td></tr>
<tr><td>PUT</td><td>기존 데이터를 통째로 덮어쓸 때 사용합니다.</td></tr>
<tr><td>PATCH</td><td>기존 데이터의 일부만 수정할 때 사용합니다.</td></tr>
<tr><td>DELETE</td><td>서버에 있는 데이터를 삭제할 때 사용합니다.</td></tr>
</tbody>
</table>

**💡 설명**

<div class="wda-callout wda-ci">
  <p>실무에서 가장 자주 보이는 조합은 <strong>GET + POST</strong>입니다. 목록을 불러올 때는 GET, 새로운 글을 등록하거나 로그인 정보를 제출할 때는 POST를 사용합니다.</p>
</div>

**• JavaScript: GET·POST 요청 예시**

```js
// 게시글 목록 읽어오기 (GET)
fetch('/articles')
  .then((res) => res.json())
  .then((list) => console.log(list));

// 새 게시글 등록하기 (POST)
fetch('/articles', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: '새 글' }),
});
```

---

## 6. 응답(Response)의 구성

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">상태 라인</div><div class="wda-fcard-dsc">요청이 성공했는지 실패했는지를 상태 코드로 알려줍니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">응답 헤더</div><div class="wda-fcard-dsc">응답 데이터의 형식, 서버 정보 등을 담습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">본문(Body)</div><div class="wda-fcard-dsc">실제로 전달되는 HTML, JSON, 이미지 같은 콘텐츠입니다.</div></div>
</div>

**• HTTP 응답 메시지 예시**

```
HTTP/1.1 200 OK
Content-Type: text/html

<html>...</html>
```

---

## 7. HTTP 상태 코드 이해하기

**▶ HTTP 상태 코드 범위별 의미**

<table class="wda-mtable">
<thead><tr><th>범위</th><th>의미</th></tr></thead>
<tbody>
<tr><td>1xx</td><td>정보 응답</td></tr>
<tr><td>2xx</td><td>성공 응답</td></tr>
<tr><td>3xx</td><td>리디렉션(다른 곳으로 이동)</td></tr>
<tr><td>4xx</td><td>클라이언트(요청) 오류</td></tr>
<tr><td>5xx</td><td>서버 오류</td></tr>
</tbody>
</table>

가장 먼저 기억해 둘 세 가지는 **200 OK**(성공), **404 Not Found**(요청한 자료가 없음), **500 Internal Server Error**(서버 내부 오류)입니다.

---

## 8. 쿠키가 필요한 이유

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>HTTP는 <strong>Stateless(상태를 기억하지 않음)</strong> 통신입니다. 방금 전 요청에서 로그인했더라도, 다음 요청에서는 서버가 "이 사람이 누구였는지" 자동으로 기억하지 못합니다.</p>
</div>

이 문제를 해결하는 것이 **쿠키**입니다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1. 쿠키 생성</div><div class="wda-fnode-dsc">서버가 응답에 쿠키를 담아 보냄</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2. 쿠키 저장</div><div class="wda-fnode-dsc">브라우저가 쿠키를 보관</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3. 자동 첨부</div><div class="wda-fnode-dsc">이후 요청마다 쿠키를 함께 전송</div></div>
</div>

이 과정 덕분에 로그인 상태 유지 같은 기능이 가능해집니다.

---

## 9. HTTPS — HTTP의 보안 확장

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>기본 HTTP는 내용을 그대로(평문으로) 전송하기 때문에, 중간에서 통신을 가로채면 내용이 그대로 노출될 수 있습니다. <strong>HTTPS</strong>는 이 내용을 암호화해 안전하게 전송하는 방식입니다. 브라우저 주소창의 자물쇠 아이콘으로 HTTPS 적용 여부를 확인할 수 있습니다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>HTTP는 클라이언트와 서버가 <strong>텍스트 기반</strong>으로 요청·응답을 주고받는 통신 규칙이다.</li>
    <li>자주 쓰는 메서드는 <strong>GET(조회) · POST(생성) · PUT(전체 수정) · PATCH(일부 수정) · DELETE(삭제)</strong>다.</li>
    <li>상태 코드는 <strong>200(성공) · 404(자료 없음) · 500(서버 오류)</strong>을 우선 기억한다.</li>
    <li>HTTP는 <strong>Stateless</strong>라서 상태 유지를 위해 <strong>쿠키</strong>를 사용한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: HTTP는 이전 요청 내용을 자동으로 기억한다?</div>
    <div class="wda-mistake-right">정답: HTTP는 <strong>Stateless</strong>라 이전 요청을 기억하지 못하며, 이를 해결하기 위해 <strong>쿠키</strong>를 사용한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: DELETE는 데이터를 수정할 때도 사용한다?</div>
    <div class="wda-mistake-right">정답: DELETE는 <strong>삭제 전용</strong>이다. 수정은 PUT(전체) 또는 PATCH(일부)를 사용한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 메서드</div>
    <div class="wda-formula-block-body"><code>GET 조회 · POST 생성 · DELETE 삭제</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 상태 코드</div>
    <div class="wda-formula-block-body"><code>200 성공 · 404 없음 · 500 서버오류</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 보안</div>
    <div class="wda-formula-block-body"><code>HTTP 평문 · HTTPS 암호화</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">HTTP가 만들어진 이유는?</div>
    <div class="wda-flip-back">늘어나는 문서 중 정확히 무엇을 요청할지 정하는 통신 규칙이 필요했기 때문이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">HTTP 요청은 어떤 세 요소로 구성되나?</div>
    <div class="wda-flip-back">요청 라인, 요청 헤더, 요청 본문(Body)이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">실무에서 가장 많이 쓰는 메서드 조합은?</div>
    <div class="wda-flip-back">조회용 GET과 생성/제출용 POST다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">HTTP가 Stateless라는 것은 무슨 뜻인가?</div>
    <div class="wda-flip-back">이전 요청의 상태를 서버가 자동으로 기억하지 못한다는 뜻이며, 쿠키로 이를 보완한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">HTTPS의 S는 무엇을 뜻하나?</div>
    <div class="wda-flip-back">Secure(보안)를 뜻하며, 통신 내용을 암호화해 전송한다.</div>
  </div>
</div>
