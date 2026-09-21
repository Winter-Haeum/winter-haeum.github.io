---
title: "1-1 웹 서비스의 종류 알아보기"
category: "frontend"
section: "web-network"
date: "2026-08-02"
status: "completed"
description: "정적 사이트와 동적 웹서비스의 차이, 그리고 요즘 웹 서비스의 대세인 SaaS 개념을 프론트엔드 개발자 입장에서 정리합니다."
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
  • <strong>정적 vs 동적</strong> — 미리 만든 파일을 보여줄 뿐인 사이트와, 요청마다 다른 결과를 만들어내는 서비스의 차이를 이해합니다<br>
  • <strong>SaaS 개념 이해</strong> — 설치형 소프트웨어와 구독형 서비스가 어떻게 다른지 파악합니다<br>
  • <strong>클라우드 서비스 구분</strong> — IaaS · PaaS · SaaS가 각각 무엇을 대신 해주는지 감을 잡습니다<br>
  • <strong>일상 속 사례 연결</strong> — 매일 쓰는 서비스들이 이 분류 중 어디에 속하는지 눈에 익힙니다
</div>

---

## 1. 정적 웹사이트 vs 동적 웹서비스

Web & Network 카테고리의 첫 문서로, 웹 서비스를 분류하는 두 가지 큰 축을 다룹니다. 하나는 "화면이 고정인가, 매번 달라지는가"(정적/동적)이고, 다른 하나는 "소프트웨어를 어떻게 제공받는가"(SaaS)입니다.

프론트엔드 개발자가 만드는 결과물이 결국 어느 쪽에 속하는지 알아야, 다음 문서들에서 배울 클라이언트-서버 구조와 API가 왜 필요한지 자연스럽게 이어집니다.

가장 먼저 구분해야 할 건 "화면에 보이는 내용이 누가 언제 접속하든 항상 같은가"입니다.

**정적 사이트(Static Site)**는 미리 만들어둔 HTML·CSS·JS 파일을 그대로 전달합니다. 사용자가 요청하면 서버는 "이 파일 그대로 드릴게요"라고 응답할 뿐, 별도의 계산이나 데이터베이스 조회가 없습니다. 포트폴리오, 회사 소개 페이지, 기술 문서처럼 자주 바뀌지 않는 콘텐츠에 잘 맞습니다.

**동적 웹서비스(Dynamic Site)**는 요청이 들어올 때마다 서버 코드와 데이터베이스를 거쳐 결과를 새로 만들어냅니다. 로그인한 사용자마다 다른 화면을 보여주는 SNS, 재고와 장바구니 상태가 실시간으로 바뀌는 쇼핑몰이 대표적입니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">📄 정적 사이트</div>
    누가 접속해도 같은 내용을 보여줍니다. 서버는 파일을 전달만 하므로 속도가 빠르고, 서버 코드나 데이터베이스가 필요 없어 호스팅 비용도 저렴합니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">🗄️ 동적 웹서비스</div>
    접속한 사람과 시점에 따라 내용이 달라집니다. 서버 코드가 매번 실행되고 데이터베이스를 조회하므로, 로그인·개인화·실시간 처리가 가능합니다.
  </div>
</div>

**▶ 정적 사이트와 동적 웹서비스 비교**

<table class="wda-mtable">
<thead><tr><th>기준</th><th>정적 사이트</th><th>동적 웹서비스</th></tr></thead>
<tbody>
<tr><td>내용</td><td>항상 같음</td><td>요청마다 다를 수 있음</td></tr>
<tr><td>서버가 하는 일</td><td>파일 전달</td><td>코드 실행 + DB 조회</td></tr>
<tr><td>개인화·로그인</td><td>기본적으로 불가</td><td>가능</td></tr>
<tr><td>대표 예시</td><td>포트폴리오, 랜딩페이지, 기술 문서</td><td>SNS, 쇼핑몰, 인터넷 뱅킹</td></tr>
</tbody>
</table>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>"정적"이라는 이름 때문에 기능이 부족하다고 오해하기 쉽지만, 최근에는 빌드 시점에 데이터를 미리 가져와 HTML을 만들어두는 방식(SSG)도 널리 쓰입니다. 지금 단계에서는 "요청 시점에 서버가 계산을 하는가"만 정확히 구분하면 충분합니다.</p>
</div>

---

## 2. SaaS란 무엇인가

정적/동적 구분이 "화면이 어떻게 만들어지는가"에 대한 것이라면, **SaaS(Software as a Service)**는 "소프트웨어를 어떤 방식으로 제공받는가"에 대한 이야기입니다.

과거에는 소프트웨어를 CD나 다운로드 파일 형태로 구매해서 내 컴퓨터에 설치해야 했습니다. 시리얼 번호를 입력해 인증하고, 그 컴퓨터에서만 사용할 수 있었죠.

SaaS는 이 흐름을 완전히 뒤집습니다. 설치 과정 없이 웹 브라우저로 접속해서 로그인만 하면 바로 사용할 수 있고, 데이터는 내 컴퓨터가 아니라 클라우드 서버에 저장됩니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">💿 예전 방식 (설치형)</div>
    매장에서 구매하거나 다운로드해 설치하고, 시리얼 키로 인증합니다. 설치한 그 컴퓨터에서만 쓸 수 있고, 업데이트도 직접 챙겨야 합니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">☁️ 지금 방식 (SaaS)</div>
    웹사이트에 접속해 로그인만 하면 끝입니다. 인터넷만 되면 어떤 기기에서든 이어서 쓸 수 있고, 업데이트는 서비스 제공자가 알아서 처리합니다.
  </div>
</div>

이 차이를 가장 쉽게 체감할 수 있는 비유가 DVD와 넷플릭스입니다. DVD는 한 편씩 사거나 빌려야 하고 플레이어와 보관 공간이 필요하지만, 넷플릭스는 월정액을 내고 앱이나 웹사이트로 바로 시청합니다.

SaaS도 마찬가지로 **소프트웨어를 소유하는 것이 아니라 구독해서 이용**하는 방식입니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">웹 기반</div><div class="wda-fcard-dsc">브라우저만 있으면 접속 가능, 별도 설치 파일이 필요 없습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">구독 모델</div><div class="wda-fcard-dsc">월·연 단위로 사용한 만큼 요금을 내는 방식입니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">자동 업데이트</div><div class="wda-fcard-dsc">사용자가 신경 쓰지 않아도 항상 최신 버전을 씁니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">클라우드 저장</div><div class="wda-fcard-dsc">데이터가 서버에 저장되어 기기를 바꿔도 그대로 유지됩니다.</div></div>
</div>

---

## 3. 클라우드 서비스 3단계 — IaaS · PaaS · SaaS

SaaS는 사실 클라우드 서비스가 제공하는 편의 수준 중 가장 높은 단계입니다. "얼마나 많은 부분을 서비스 제공자가 대신 해주는가"를 기준으로 세 단계로 나눌 수 있습니다.

**▶ IaaS·PaaS·SaaS 단계 비교**

<table class="wda-mtable">
<thead><tr><th>구분</th><th>풀네임</th><th>피자 비유</th><th>사용자가 직접 할 일</th><th>대표 예시</th></tr></thead>
<tbody>
<tr><td>IaaS</td><td>Infrastructure as a Service</td><td>재료만 받음</td><td>서버·네트워크·저장소를 빌려 나머지를 직접 구축</td><td>AWS EC2, Google Cloud</td></tr>
<tr><td>PaaS</td><td>Platform as a Service</td><td>도우+소스 받음</td><td>개발 환경은 준비되어 있으니 코드만 작성</td><td>Heroku, Vercel</td></tr>
<tr><td>SaaS</td><td>Software as a Service</td><td>완제품 배달</td><td>로그인만 하면 바로 사용</td><td>Gmail, Notion, Slack</td></tr>
</tbody>
</table>

**📌 개념**

<div class="wda-callout wda-cb">
  <p>세 단계의 차이는 결국 "남이 얼마나 대신해주느냐"입니다. IaaS는 땅과 골조만 빌려주고 인테리어는 직접, PaaS는 인테리어까지 되어 있어 가구만 넣으면 되고, SaaS는 다 지어진 방에 들어가 그냥 쉬면 됩니다. 프론트엔드 개발자가 배포에 자주 쓰는 Vercel, Netlify가 바로 PaaS에 해당합니다.</p>
</div>

---

## 4. 우리가 매일 쓰는 SaaS

SaaS는 특별한 개념이 아니라 이미 일상 곳곳에 있습니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">Google Workspace</div><div class="wda-fcard-dsc">Docs, Sheets, Slides로 문서 작업</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Notion</div><div class="wda-fcard-dsc">노트, 문서, 팀 협업 공간</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Slack</div><div class="wda-fcard-dsc">팀 커뮤니케이션 도구</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Netflix / Spotify</div><div class="wda-fcard-dsc">영상·음악 스트리밍 구독 서비스</div></div>
</div>

이 서비스들의 공통점은 명확합니다. 웹사이트나 앱으로 접속하고, 별도 설치 없이 로그인만 하면 바로 쓸 수 있으며, 대부분 구독 요금제를 사용합니다.

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>여러분이 앞으로 만들 웹 애플리케이션, 관리자 대시보드, 커뮤니티 플랫폼도 대부분 이 SaaS 구조를 따릅니다. 프론트엔드 개발자는 사용자가 가장 먼저 마주하는 SaaS의 "얼굴"을 만드는 사람입니다. 다음 문서(1-2 프론트엔드와 백엔드)에서는 이 화면 뒤에서 클라이언트와 서버가 어떻게 역할을 나누는지 이어서 살펴봅니다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>정적 사이트는 <strong>같은 파일을 그대로 전달</strong>하고, 동적 웹서비스는 <strong>요청마다 새로 계산</strong>해서 응답한다.</li>
    <li>SaaS는 <strong>설치 없이 구독해서 쓰는 소프트웨어</strong>다.</li>
    <li>클라우드 서비스는 <strong>IaaS → PaaS → SaaS</strong> 순으로 사용자가 직접 챙겨야 할 일이 줄어든다.</li>
    <li>Gmail, Notion, Slack, Netflix 모두 <strong>SaaS의 실제 사례</strong>다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 정적 사이트는 기능이 단순하고 낡은 방식이다?</div>
    <div class="wda-mistake-right">정답: 정적 사이트는 <strong>서버 계산이 필요 없는 구조</strong>일 뿐, 포트폴리오·기술 문서·랜딩페이지처럼 지금도 널리 쓰이는 실용적인 선택이다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: SaaS와 클라우드 저장소는 같은 말이다?</div>
    <div class="wda-mistake-right">정답: 클라우드 저장은 SaaS가 가진 <strong>특징 중 하나</strong>일 뿐이다. SaaS의 핵심은 소프트웨어 자체를 설치 없이 구독으로 이용한다는 점이다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 정적/동적</div>
    <div class="wda-formula-block-body"><code>정적 = 파일 전달, 동적 = 요청마다 계산</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · SaaS</div>
    <div class="wda-formula-block-body"><code>SaaS = 설치 없음 + 구독</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 클라우드 단계</div>
    <div class="wda-formula-block-body"><code>IaaS < PaaS < SaaS (대신 해주는 범위)</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">정적 사이트와 동적 웹서비스의 핵심 차이는?</div>
    <div class="wda-flip-back">서버가 파일을 그대로 전달하는지, 요청마다 코드를 실행해 새로 계산하는지의 차이입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">SaaS는 무엇의 줄임말인가요?</div>
    <div class="wda-flip-back">Software as a Service, 소프트웨어를 서비스 형태로 제공한다는 뜻입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">IaaS·PaaS·SaaS를 구분하는 기준은?</div>
    <div class="wda-flip-back">서비스 제공자가 인프라부터 소프트웨어까지 얼마나 많은 부분을 대신 관리해주는가입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Vercel이나 Netlify는 어떤 단계에 속하나요?</div>
    <div class="wda-flip-back">개발 환경을 미리 갖추고 코드만 배포하면 되는 PaaS에 해당합니다.</div>
  </div>
</div>
