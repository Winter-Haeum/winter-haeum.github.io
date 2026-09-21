---
title: "1-1: 월드 와이드 웹과 인터넷"
category: "frontend"
section: "html"
date: "2026-08-01"
status: "completed"
description: "WWW가 왜 만들어졌는지, 인터넷과 웹은 어떻게 다른지, 웹을 이루는 URL·HTTP·HTML의 역할을 큰 그림으로 이해합니다."
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
  • <strong>WWW 탄생 배경</strong> — 웹이 왜, 어떤 문제를 풀기 위해 만들어졌는지 이해합니다<br>
  • <strong>인터넷과 웹의 관계</strong> — 두 개념이 어떻게 다른지 구분합니다<br>
  • <strong>웹의 3대 기술</strong> — URL·HTTP·HTML이 각각 무엇을 담당하는지 파악합니다<br>
  • <strong>클라이언트-서버 모델</strong> — 웹이 통신하는 기본 구조를 큰 그림으로 이해합니다
</div>

---

## 1. 왜 '연결된 문서'가 필요했을까

이 문서는 HTML 코드를 작성하기 전, "웹이란 무엇인가"라는 큰 그림을 잡는 문서입니다. 구체적인 태그 문법은 다루지 않으며, 이후 문서들에서 HTML을 배울 때 계속 등장할 URL·HTTP·클라이언트·서버 같은 용어를 먼저 정리합니다.

**🔑 핵심 개념**

<div class="wda-callout wda-cs">
  <p>웹이 등장하기 전에는 자료들이 여러 컴퓨터에 뿔뿔이 흩어져 있었습니다. 같은 주제의 자료라도 어느 컴퓨터의 어느 파일에 있는지 알아야만 찾을 수 있었습니다.</p>
  <p>1989년, 연구소에서 일하던 한 개발자는 "이 문서들을 서로 연결해서, 클릭 한 번으로 필요한 자료로 이동할 수 있게 만들면 어떨까?"라는 아이디어를 제안했습니다. 이 아이디어가 오늘날 웹의 출발점이 되었습니다.</p>
</div>

지금은 링크를 클릭해 다른 페이지로 이동하는 것이 너무나 당연하지만, 당시에는 "문서와 문서를 네트워크로 연결한다"는 발상 자체가 새로운 시도였습니다.

문서가 컴퓨터 안에 고립된 파일에서, 서로 연결된 정보망의 일부로 바뀌는 순간이었습니다.

---

## 2. 웹이 만들어지기까지

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">문제의식</div><div class="wda-fnode-dsc">흩어진 자료를 연결하고 싶다</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">제안</div><div class="wda-fnode-dsc">하이퍼텍스트 기반 시스템 제안</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">구현</div><div class="wda-fnode-dsc">최초의 웹사이트 제작</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">공개</div><div class="wda-fnode-dsc">누구나 쓸 수 있도록 전 세계에 공개</div></div>
</div>

처음 제안은 "개념은 알겠는데 이게 정말 될까?" 싶을 정도로 낯설게 받아들여졌습니다.

하지만 실제로 만들어보니 문서 간 이동이 실제로 동작했고, 곧이어 인터넷에 연결된 사람이라면 누구나 사용할 수 있는 형태로 공개되었습니다.

이렇게 웹은 하나의 아이디어에서 시작해 실제로 동작하는 시스템으로, 그리고 전 세계가 함께 쓰는 인프라로 발전했습니다.

---

## 3. "World Wide Web"이라는 이름

**💡 설명**

<div class="wda-callout wda-ci">
  <p>World(세계) + Wide(넓게 퍼진) + Web(거미줄)을 합치면 "전 세계에 넓게 퍼진 거미줄"이라는 뜻이 됩니다. 문서들이 링크로 서로 이어지는 모습이 마치 거미줄처럼 사방으로 연결된 구조를 이룬다는 데서 나온 이름입니다.</p>
  <p>웹의 핵심 철학은 결국 <strong>연결성(Connectivity)</strong>입니다. 하나의 문서에서 다른 문서로, 다시 그 문서에서 또 다른 문서로 — 클릭 한 번마다 새로운 정보로 이동할 수 있다는 것이 웹을 웹답게 만드는 특징입니다.</p>
</div>

예를 들어 어떤 지역을 소개하는 문서를 보다가, 그 지역의 대표 명소를 소개하는 링크를 클릭하고, 다시 그 명소의 상세 정보를 소개하는 링크를 클릭하는 식으로 문서를 옮겨 다닐 수 있습니다.

이렇게 클릭으로 다른 문서로 이동하는 연결 고리를 **하이퍼링크**라고 부르며, 이 하이퍼링크들이 모여 웹 전체를 하나의 거대한 연결망으로 만듭니다.

---

## 4. 인터넷과 웹은 다르다

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">인터넷(Internet)</div>
    전 세계 컴퓨터들을 물리적으로 연결하는 통신망 전체입니다. 케이블, 라우터 같은 기반 인프라를 가리킵니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">웹(Web)</div>
    그 인터넷이라는 통신망 위에서 동작하는 여러 서비스 중 하나입니다. URL·HTTP·HTML을 기반으로 문서를 주고받는 서비스입니다.
  </div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>인터넷을 우편을 배달할 수 있는 <strong>전국 배달망 전체</strong>라고 생각하면, 웹은 그 배달망을 이용하는 여러 서비스 중 하나(예: 편지 배달 서비스)에 해당합니다. 이메일, 파일 전송 등 인터넷 위에서 동작하는 서비스는 웹 말고도 여러 가지가 있습니다. 즉 <strong>웹은 인터넷의 일부</strong>이지, 인터넷 전체가 곧 웹은 아닙니다.</p>
</div>

---

## 5. 웹을 이루는 3가지 기술

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">URL — 주소</div><div class="wda-fcard-dsc">자료가 어디에 있는지 가리키는 주소 체계입니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">HTTP — 약속된 규칙</div><div class="wda-fcard-dsc">브라우저와 서버가 정보를 주고받을 때 따르는 통신 규칙입니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">HTML — 구조</div><div class="wda-fcard-dsc">문서의 뼈대를 만드는 언어입니다. 제목, 문단, 이미지, 링크를 배치합니다.</div></div>
</div>

이 세 가지는 다음 문서들에서 각각 더 자세히 다룰 예정입니다. 지금은 "웹 페이지 하나를 보려면 주소(URL)로 위치를 찾고, 정해진 규칙(HTTP)으로 요청을 주고받고, 받은 내용을 구조(HTML)로 해석해 화면에 그린다"는 흐름만 기억해 둡니다.

---

## 6. URL 구조 뜯어보기

주소창에 입력하는 URL은 몇 가지 부분으로 나뉩니다.

**▶ URL 구성 요소**

<table class="wda-mtable">
<thead><tr><th>구성 요소</th><th>예시</th><th>의미</th></tr></thead>
<tbody>
<tr><td>프로토콜</td><td><code>https://</code></td><td>어떤 통신 규칙으로 접속할지</td></tr>
<tr><td>도메인</td><td><code>www.example.com</code></td><td>어느 서버에 접속할지</td></tr>
<tr><td>경로</td><td><code>/news/123</code></td><td>서버 안의 어떤 자료를 요청할지</td></tr>
</tbody>
</table>

전체를 합치면 `https://www.example.com/news/123` 같은 형태가 됩니다.

실생활 주소에 비유하면 "국가 / 도시 / 상세 주소"를 순서대로 적는 것과 비슷합니다. 프로토콜은 어떤 방식으로 방문할지, 도메인은 어느 건물인지, 경로는 그 건물의 몇 층 몇 호인지에 해당합니다.

---

## 7. 웹사이트 vs 웹페이지

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">웹사이트</div>
    여러 웹페이지를 묶은 전체 단위입니다. 건물 전체에 해당합니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">웹페이지</div>
    웹사이트를 구성하는 문서 한 장입니다. 건물의 한 층에 해당합니다.
  </div>
</div>

---

## 8. 클라이언트-서버 모델 맛보기

**💡 설명**

<div class="wda-callout wda-ci">
  <p>웹은 항상 <strong>요청하는 쪽(클라이언트)</strong>과 <strong>응답하는 쪽(서버)</strong> 두 역할로 나뉘어 동작합니다. 우편을 보내고 받는 과정에 비유하면 쉽게 이해할 수 있습니다.</p>
</div>

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">클라이언트</div><div class="wda-fnode-dsc">"이 페이지 주세요" 요청 발송</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">서버</div><div class="wda-fnode-dsc">요청받은 자료를 찾아 응답 발송</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">클라이언트</div><div class="wda-fnode-dsc">받은 내용을 화면에 표시</div></div>
</div>

클라이언트는 편지를 보내는 사람, 서버는 그 편지를 받고 답장을 보내주는 사람에 해당합니다. 클라이언트가 "이 페이지를 보여주세요"라는 요청을 보내면, 서버는 해당 자료를 찾아 응답으로 돌려보냅니다.

HTTP는 이 편지를 주고받을 때 서로 지키기로 약속한 형식이라고 볼 수 있습니다.

---

## 9. 브라우저와 서버가 하는 일

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">브라우저(클라이언트)</div><div class="wda-fcard-dsc">URL 입력 → 요청 전송 → 응답 수신 → 화면 렌더링 → 클릭·입력 같은 사용자 동작 처리</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">서버</div><div class="wda-fcard-dsc">요청 대기 → 요청 내용 분석 → 해당 자료 탐색 → 응답 전송 → 다시 요청 대기</div></div>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>웹은 <strong>흩어진 문서를 서로 연결</strong>하자는 문제의식에서 출발했다.</li>
    <li><strong>인터넷은 통신망 전체</strong>, <strong>웹은 그 위에서 동작하는 서비스 중 하나</strong>다.</li>
    <li>웹은 <strong>URL(주소) · HTTP(통신 규칙) · HTML(구조)</strong> 세 가지 기술로 이루어진다.</li>
    <li>웹은 항상 <strong>요청하는 클라이언트</strong>와 <strong>응답하는 서버</strong> 사이의 통신으로 동작한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 인터넷과 웹은 같은 말이다?</div>
    <div class="wda-mistake-right">정답: 인터넷은 <strong>통신망 인프라</strong>이고, 웹은 그 위에서 동작하는 <strong>여러 서비스 중 하나</strong>다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 웹사이트와 웹페이지는 같은 것을 가리킨다?</div>
    <div class="wda-mistake-right">정답: 웹사이트는 <strong>여러 웹페이지의 묶음</strong>이고, 웹페이지는 그중 <strong>한 장의 문서</strong>다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 관계</div>
    <div class="wda-formula-block-body"><code>웹 ⊂ 인터넷</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 3대 기술</div>
    <div class="wda-formula-block-body"><code>URL(주소) + HTTP(규칙) + HTML(구조)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 통신 구조</div>
    <div class="wda-formula-block-body"><code>클라이언트 요청 → 서버 응답</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">웹은 왜 만들어졌나?</div>
    <div class="wda-flip-back">여러 컴퓨터에 흩어진 문서를 서로 연결해 클릭 한 번으로 이동할 수 있게 하기 위해서다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">인터넷과 웹의 관계는?</div>
    <div class="wda-flip-back">인터넷은 통신망 전체이고, 웹은 그 위에서 동작하는 서비스 중 하나다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">웹을 이루는 3대 기술은?</div>
    <div class="wda-flip-back">URL(주소), HTTP(통신 규칙), HTML(문서 구조)이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">URL은 어떤 요소로 구성되나?</div>
    <div class="wda-flip-back">프로토콜, 도메인, 경로로 구성된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">클라이언트-서버 모델의 기본 흐름은?</div>
    <div class="wda-flip-back">클라이언트가 요청을 보내면 서버가 응답을 돌려주고, 클라이언트가 이를 화면에 표시한다.</div>
  </div>
</div>
