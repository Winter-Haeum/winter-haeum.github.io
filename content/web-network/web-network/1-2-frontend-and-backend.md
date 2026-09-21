---
title: "1-2 프론트엔드와 백엔드"
category: "frontend"
section: "web-network"
date: "2026-08-02"
status: "completed"
description: "클라이언트와 서버가 데이터를 주고받는 흐름을 바탕으로, 프론트엔드와 백엔드 개발자가 각각 무엇을 담당하고 어떻게 협업하는지 정리합니다."
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
  • <strong>클라이언트-서버 흐름 이해</strong> — 브라우저와 서버가 어떤 순서로 데이터를 주고받는지 파악합니다<br>
  • <strong>프론트엔드 역할 이해</strong> — 화면(UI)과 사용자 경험(UX)을 만드는 일이 무엇인지 정리합니다<br>
  • <strong>백엔드 역할 이해</strong> — 데이터 처리와 API 제공이 왜 필요한지 파악합니다<br>
  • <strong>협업 관점 갖추기</strong> — 두 역할이 어떤 지점에서 만나 함께 일하는지 감을 잡습니다
</div>

---

## 1. 클라이언트와 서버, 두 개의 역할

웹 서비스가 동작하려면 화면을 보여주는 쪽(클라이언트)과 데이터를 처리하는 쪽(서버)이 함께 필요합니다. 이 문서는 그 둘이 각각 무엇을 하는지, 그리고 이 역할을 사람이 맡으면 왜 프론트엔드/백엔드로 나뉘는지를 정리합니다.

데이터를 주고받는 구체적인 약속(API)은 다음 문서(1-3 API의 세계)에서 이어서 다룹니다.

웹은 혼자 동작하지 않습니다. 요청하는 쪽과 응답하는 쪽, 두 주체가 항상 함께 움직입니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">🖥️ 클라이언트</div>
    사용자가 직접 보고 조작하는 프로그램입니다. 웹 브라우저, 모바일 앱이 여기에 해당하며 "요청하는 쪽"입니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">🗄️ 서버</div>
    요청을 받아 처리하고 결과를 돌려주는, 항상 켜져 있는 컴퓨터입니다. "응답하는 쪽"입니다.
  </div>
</div>

둘의 관계는 식당에 비유하면 이해하기 쉽습니다. 클라이언트는 메뉴판을 보고 주문하는 손님, 서버는 주문을 받아 요리해서 내주는 주방입니다.

실제 통신 흐름으로 보면 다음과 같은 순서로 진행됩니다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1. 요청</div><div class="wda-fnode-dsc">클라이언트가 필요한 데이터를 서버에 요청</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2. 처리</div><div class="wda-fnode-dsc">서버가 데이터베이스를 조회하고 로직을 실행</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3. 응답</div><div class="wda-fnode-dsc">서버가 결과 데이터를 클라이언트로 전송</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">4. 화면 갱신</div><div class="wda-fnode-dsc">클라이언트가 받은 데이터로 화면을 업데이트</div></div>
</div>

이 네 단계는 로그인, 검색, 글쓰기처럼 서버와 데이터를 주고받는 거의 모든 동작에서 똑같이 반복됩니다.

---

## 2. 프론트엔드가 하는 일

**클라이언트를 만드는 사람이 프론트엔드 개발자**입니다. 사용자가 눈으로 보고 손으로 조작하는 모든 부분, 즉 UI(User Interface)와 UX(User Experience)를 책임집니다.

- UI는 화면에서 눈에 보이는 요소입니다. 버튼, 색상, 폰트, 레이아웃이 여기 속합니다.
- UX는 사용자가 그 화면을 쓰면서 느끼는 전체적인 경험입니다. 버튼이 누르기 편한지, 로딩이 빠른지, 에러 메시지가 이해하기 쉬운지가 UX를 결정합니다.

프론트엔드는 보통 세 가지 기술을 기본으로 조합합니다.

**▶ 프론트엔드 기본 기술 3종**

<table class="wda-mtable">
<thead><tr><th>기술</th><th>역할</th><th>비유</th></tr></thead>
<tbody>
<tr><td>HTML</td><td>구조 — 어떤 내용이 있는가</td><td>집의 골격</td></tr>
<tr><td>CSS</td><td>스타일 — 어떻게 보이는가</td><td>집의 인테리어</td></tr>
<tr><td>JavaScript</td><td>동작 — 어떻게 반응하는가</td><td>집의 전기·기계 설비</td></tr>
</tbody>
</table>

실무에서는 이 기본기 위에 React 같은 라이브러리를 얹어 반복되는 화면 작업을 줄이고, 서버에서 받아온 데이터를 화면에 연결하는 작업까지 함께 담당합니다.

---

## 3. 백엔드가 하는 일

프론트엔드가 "홀"을 담당한다면, **백엔드는 "주방"**을 담당합니다. 사용자 눈에는 보이지 않지만, 서비스가 실제로 동작하는 데 반드시 필요한 부분입니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">API 제공</div><div class="wda-fcard-dsc">프론트엔드가 데이터를 요청할 수 있는 창구를 만듭니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">데이터베이스 관리</div><div class="wda-fcard-dsc">회원 정보, 게시글 같은 데이터를 저장·조회·수정·삭제합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">비즈니스 로직</div><div class="wda-fcard-dsc">결제, 포인트 계산처럼 서비스의 핵심 규칙을 처리합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">보안 처리</div><div class="wda-fcard-dsc">로그인 인증, 권한 관리로 데이터를 안전하게 지킵니다.</div></div>
</div>

**📌 개념**

<div class="wda-callout wda-cb">
  <p>데이터베이스(DB)는 회원 정보, 게시글, 채팅 메시지처럼 서비스가 다루는 모든 데이터를 저장해두는 창고입니다. 엑셀처럼 표 형태로 데이터를 관리하되, 훨씬 빠르고 안전하게 대량의 데이터를 처리할 수 있습니다.</p>
</div>

---

## 4. 프론트엔드와 백엔드는 어떻게 만나는가

두 역할은 완전히 독립적으로 일하는 것이 아니라, **API라는 약속을 기준으로 서로 연결**됩니다. 백엔드가 "이런 주소로 요청하면 이런 형식의 데이터를 돌려주겠다"라고 정해두면, 프론트엔드는 그 약속만 믿고 화면을 만들면 됩니다.

**▶ 프론트엔드와 백엔드 역할 비교**

<table class="wda-mtable">
<thead><tr><th>구분</th><th>프론트엔드</th><th>백엔드</th></tr></thead>
<tbody>
<tr><td>담당 영역</td><td>클라이언트(화면)</td><td>서버(데이터·로직)</td></tr>
<tr><td>주요 기술</td><td>HTML, CSS, JavaScript, React</td><td>Node.js, Python, Java 등</td></tr>
<tr><td>핵심 업무</td><td>UI/UX 구현, 서버에 데이터 요청</td><td>API 제공, 데이터 처리, 보안</td></tr>
<tr><td>한 줄 정의</td><td>사용자가 보고 만지는 부분</td><td>눈에 안 보이는 처리 부분</td></tr>
</tbody>
</table>

이 약속(API 명세)이 미리 정해져 있으면, 백엔드 개발이 끝나기 전에도 프론트엔드는 어떤 데이터가 올지 알고 화면을 먼저 만들 수 있습니다. 반대로 이 약속이 없으면 "데이터 이름이 다르다", "형식이 다르다" 같은 문제로 서로 기다리는 시간이 늘어납니다.

API를 구체적으로 어떻게 설계하고 사용하는지는 다음 문서(1-3 API의 세계)에서 다룹니다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>클라이언트는 <strong>요청하는 쪽</strong>, 서버는 <strong>응답하는 쪽</strong>이다.</li>
    <li>프론트엔드는 <strong>화면(UI)과 사용자 경험(UX)</strong>을, 백엔드는 <strong>데이터와 로직</strong>을 담당한다.</li>
    <li>웹 통신의 기본 흐름은 <strong>요청 → 처리 → 응답 → 화면 갱신</strong> 순이다.</li>
    <li>두 역할은 <strong>API라는 약속</strong>을 통해 서로 연결된다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 프론트엔드는 디자인, 백엔드는 프로그래밍이다?</div>
    <div class="wda-mistake-right">정답: 둘 다 프로그래밍이다. 프론트엔드는 <strong>클라이언트에서 실행되는 코드</strong>를, 백엔드는 <strong>서버에서 실행되는 코드</strong>를 작성한다는 점이 다르다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 서버는 항상 물리적으로 먼 컴퓨터를 뜻한다?</div>
    <div class="wda-mistake-right">정답: 서버는 <strong>요청을 받아 응답하는 역할을 하는 프로그램/컴퓨터</strong>를 뜻하며, 개발 중에는 내 컴퓨터에서 서버를 직접 띄워 테스트하기도 한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 통신 흐름</div>
    <div class="wda-formula-block-body"><code>요청 → 처리 → 응답 → 화면 갱신</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 역할 분담</div>
    <div class="wda-formula-block-body"><code>프론트 = 화면, 백엔드 = 데이터+로직</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 연결 고리</div>
    <div class="wda-formula-block-body"><code>둘을 잇는 약속 = API</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">클라이언트와 서버 중 "요청하는 쪽"은?</div>
    <div class="wda-flip-back">클라이언트입니다. 서버는 요청을 받아 처리하고 응답합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">웹 통신의 기본 4단계는?</div>
    <div class="wda-flip-back">요청 → 처리 → 응답 → 화면 갱신 순으로 진행됩니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">프론트엔드가 다루는 3대 기본 기술은?</div>
    <div class="wda-flip-back">HTML(구조), CSS(스타일), JavaScript(동작)입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">프론트엔드와 백엔드를 이어주는 것은?</div>
    <div class="wda-flip-back">어떤 데이터를 어떤 형식으로 주고받을지 정해둔 약속인 API입니다.</div>
  </div>
</div>
