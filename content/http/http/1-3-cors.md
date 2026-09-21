---
title: "1-3 CORS 알아보기"
category: "frontend"
section: "http"
date: "2026-08-02"
status: "completed"
description: "다른 출처의 API를 호출할 때 마주치는 CORS 에러가 왜 발생하는지, 브라우저의 보안 정책과 서버 응답 헤더 관점에서 정리합니다."
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
  • <strong>출처(Origin) 개념</strong> — 프로토콜·도메인·포트로 결정되는 출처가 무엇인지 이해합니다<br>
  • <strong>동일 출처 정책 이해</strong> — 브라우저가 왜 다른 출처의 응답을 기본적으로 막는지 파악합니다<br>
  • <strong>CORS의 역할 이해</strong> — 서버가 어떤 헤더로 이 제한을 풀어주는지 정리합니다<br>
  • <strong>대처 방법 감 잡기</strong> — CORS 에러를 만났을 때 어디부터 확인해야 하는지 익힙니다
</div>

---

## 1. 출처(Origin)란

1-2에서 fetch로 API를 호출하는 방법을 배웠는데, 실제로 다른 도메인의 API를 호출하면 종종 "CORS" 에러를 마주칩니다. 이 에러는 서버가 고장 났다는 뜻이 아니라, 브라우저의 보안 정책이 응답을 가로막았다는 신호입니다.

이 문서에서는 그 이유와 기본적인 대처 방향을 정리합니다.

**출처(Origin)**는 프로토콜, 도메인, 포트 세 가지의 조합으로 결정됩니다. URL 뒤에 붙는 경로나 쿼리스트링은 출처 판단에 영향을 주지 않습니다.

**• 출처를 구성하는 세 요소**

```
https://example.com:443/products
└──┬──┘└────┬────┘└┬┘└────┬────┘
 프로토콜    도메인   포트     경로(무관)
```

**▶ 출처 비교 예시**

<table class="wda-mtable">
<thead><tr><th>비교 대상</th><th>기준 출처: https://example.com</th><th>같은 출처?</th></tr></thead>
<tbody>
<tr><td>https://example.com/products</td><td>경로만 다름</td><td>✅ 같음</td></tr>
<tr><td>http://example.com</td><td>프로토콜이 다름</td><td>❌ 다름</td></tr>
<tr><td>https://api.example.com</td><td>도메인(서브도메인)이 다름</td><td>❌ 다름</td></tr>
<tr><td>https://example.com:8080</td><td>포트가 다름</td><td>❌ 다름</td></tr>
</tbody>
</table>

---

## 2. 동일 출처 정책(SOP)과 CORS의 관계

브라우저는 보안을 위해 기본적으로 **같은 출처끼리만 자바스크립트로 응답을 읽을 수 있도록** 제한합니다. 이를 **동일 출처 정책(Same-Origin Policy, SOP)**이라고 합니다.

만약 이 정책이 없다면, 여러분이 은행 사이트에 로그인한 상태로 다른 악성 사이트에 접속했을 때 그 사이트의 스크립트가 은행 API를 몰래 호출해 계좌 정보를 읽어갈 수도 있습니다. SOP는 이런 상황을 막기 위한 브라우저의 기본 방어선입니다.

문제는 요즘 개발 방식이 프론트엔드 서버(`myapp.com`)와 백엔드 API 서버(`api.myapp.com`)를 분리하는 경우가 많다는 점입니다. 이 둘은 도메인이 다르므로 SOP 기준으로는 "다른 출처"이고, 그대로면 데이터를 주고받을 수 없습니다.

**CORS(Cross-Origin Resource Sharing)**는 이 문제를 해결하기 위한 장치입니다. 서버가 "이 출처는 믿을 수 있으니 허용한다"고 응답 헤더에 명시하면, 브라우저가 그 헤더를 확인하고 응답을 통과시켜 줍니다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1. 요청</div><div class="wda-fnode-dsc">브라우저가 Origin 헤더를 붙여 요청</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2. 응답</div><div class="wda-fnode-dsc">서버가 Access-Control-Allow-Origin 헤더를 포함해 응답</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3. 검증</div><div class="wda-fnode-dsc">브라우저가 두 값을 비교해 통과/차단 결정</div></div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>CORS 에러가 떠도 서버 로그에는 요청이 정상 처리(200 OK)된 것으로 남을 수 있습니다. 서버는 응답을 이미 보냈지만, 그 응답에 허용 헤더가 없다는 걸 확인한 <strong>브라우저가</strong> 자바스크립트에게 데이터를 넘기지 않고 차단하는 것입니다. Postman이나 서버 간 통신에는 이 정책이 적용되지 않습니다.</p>
</div>

---

## 3. 서버가 CORS를 허용하는 방법

CORS 문제를 해결하는 열쇠는 결국 서버 쪽에 있습니다. 서버는 응답 헤더에 허용 정보를 담아 보내야 합니다.

**▶ CORS 허용 헤더 종류**

<table class="wda-mtable">
<thead><tr><th>헤더</th><th>의미</th><th>예시</th></tr></thead>
<tbody>
<tr><td>Access-Control-Allow-Origin</td><td>어떤 출처의 요청을 허용할지</td><td><code>https://myapp.com</code></td></tr>
<tr><td>Access-Control-Allow-Methods</td><td>어떤 HTTP 메서드를 허용할지</td><td><code>GET, POST, PUT</code></td></tr>
<tr><td>Access-Control-Allow-Headers</td><td>어떤 커스텀 헤더를 허용할지</td><td><code>Content-Type, Authorization</code></td></tr>
</tbody>
</table>

**• Express 서버 CORS 허용 설정**

```js
// Node.js(Express) 서버에서 CORS 허용 예시
const cors = require('cors');
app.use(cors({
  origin: 'https://myapp.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
```

**💡 사용 팁**

<div class="wda-callout wda-cb">
  <p><code>Access-Control-Allow-Origin: *</code>로 설정하면 모든 출처를 허용해 편리하지만, 로그인 정보(쿠키·인증 토큰)를 함께 보내는 요청에는 사용할 수 없습니다. 로그인 기능이 있는 서비스라면 구체적인 도메인을 명시하는 것이 안전합니다.</p>
</div>

---

## 4. 프론트엔드에서 할 수 있는 것 — 개발용 프록시

CORS는 근본적으로 서버가 해결해야 하는 문제지만, 백엔드 코드를 당장 수정할 수 없는 로컬 개발 환경에서는 **개발 서버의 프록시 기능**으로 우회할 수 있습니다.

**• Vite 개발 서버 프록시 설정**

```js
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 실제 백엔드 주소
        changeOrigin: true,
      },
    },
  },
};
```

브라우저는 같은 출처(내 개발 서버)에만 요청을 보내고, 그 요청을 개발 서버가 대신 백엔드로 전달합니다. 서버끼리의 통신에는 SOP가 적용되지 않기 때문에 가능한 방법입니다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>이 설정은 <code>npm run dev</code>로 개발 서버를 띄웠을 때만 동작합니다. 실제 배포 환경에는 이 프록시가 존재하지 않으므로, 배포 시에는 반드시 백엔드 서버에서 CORS를 허용하도록 설정해야 합니다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>출처(Origin)는 <strong>프로토콜 + 도메인 + 포트</strong>로 결정된다.</li>
    <li>동일 출처 정책(SOP)은 <strong>다른 출처의 응답을 브라우저가 읽지 못하도록</strong> 막는 보안 장치다.</li>
    <li>CORS는 서버가 응답 헤더로 <strong>특정 출처를 예외적으로 허용</strong>해주는 방식이다.</li>
    <li>CORS 에러는 <strong>서버가 아니라 브라우저가</strong> 응답을 차단해서 발생한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: CORS 에러는 서버가 죽었거나 요청 자체가 실패했다는 뜻이다?</div>
    <div class="wda-mistake-right">정답: 서버는 정상적으로 응답을 보냈을 수 있다. <strong>허용 헤더가 없어서 브라우저가 그 응답을 자바스크립트에 넘기지 않은 것</strong>뿐이다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 프론트엔드 코드를 고치면 CORS 에러를 근본적으로 해결할 수 있다?</div>
    <div class="wda-mistake-right">정답: 근본적인 해결은 <strong>서버가 허용 헤더를 응답에 포함</strong>시키는 것이다. 프론트엔드의 프록시 설정은 로컬 개발용 임시 방편일 뿐이다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 출처</div>
    <div class="wda-formula-block-body"><code>Origin = 프로토콜 + 도메인 + 포트</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 차단 주체</div>
    <div class="wda-formula-block-body"><code>CORS 차단 = 브라우저가 결정</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 해결</div>
    <div class="wda-formula-block-body"><code>해결 = 서버의 Allow-Origin 헤더</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">출처(Origin)를 결정하는 세 가지 요소는?</div>
    <div class="wda-flip-back">프로토콜, 도메인, 포트입니다. URL 경로는 영향을 주지 않습니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">동일 출처 정책(SOP)이 막는 것은 정확히 무엇인가요?</div>
    <div class="wda-flip-back">다른 출처의 응답을 자바스크립트가 읽는 것을 막습니다. 요청 자체를 막지는 않습니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">CORS를 허용하려면 누가 무엇을 해야 하나요?</div>
    <div class="wda-flip-back">서버가 응답에 Access-Control-Allow-Origin 같은 헤더를 포함시켜야 합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">개발용 프록시 설정은 배포 후에도 유효한가요?</div>
    <div class="wda-flip-back">아니오. 로컬 개발 서버에서만 동작하며, 배포 환경에서는 서버 쪽 CORS 설정이 필요합니다.</div>
  </div>
</div>
