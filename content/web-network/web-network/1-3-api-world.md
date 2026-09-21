---
title: "1-3 API의 세계"
category: "frontend"
section: "web-network"
date: "2026-08-02"
status: "completed"
description: "API가 정확히 무엇을 하는 존재인지, 요청과 응답이 어떤 원리로 오가는지, 그리고 API가 왜 반드시 필요한지 정리합니다."
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
  • <strong>API 개념 이해</strong> — API가 프로그램 사이의 어떤 약속인지 정리합니다<br>
  • <strong>요청과 응답 흐름</strong> — 클라이언트와 서버가 API를 통해 데이터를 주고받는 과정을 파악합니다<br>
  • <strong>API가 필요한 이유</strong> — API 없이 개발하면 어떤 문제가 생기는지 이해합니다<br>
  • <strong>오픈 API 감 잡기</strong> — 공개된 API를 실무·학습에서 어떻게 활용하는지 알아봅니다
</div>

---

## 1. API란 무엇인가

1-2에서 "프론트엔드와 백엔드는 API라는 약속으로 연결된다"고 했던 그 API를 자세히 들여다봅니다. API가 정확히 무엇을 주고받는 약속인지, 왜 이런 약속이 없으면 곤란한지를 다룹니다.

API를 실제 코드로 호출하는 방법(fetch, HTTP 메서드)은 다음 카테고리인 HTTP 문서들에서 이어집니다.

**API(Application Programming Interface)**는 프로그램끼리 서로 대화하기 위해 미리 정해둔 규칙입니다. 사람 사이의 대화에 언어와 예절이 필요하듯, 프로그램끼리 데이터를 주고받으려면 "어떤 주소로, 어떤 형식으로 요청하면, 어떤 형식으로 응답을 준다"는 약속이 필요합니다.

가장 쉬운 비유는 식당의 웨이터입니다. 손님(클라이언트)이 직접 주방(서버)에 들어가 요리하지 않고, 웨이터(API)에게 주문을 전달하면 웨이터가 주방에 전하고 완성된 요리를 다시 손님에게 가져다줍니다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">손님</div><div class="wda-fnode-dsc">클라이언트</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">웨이터</div><div class="wda-fnode-dsc">API</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">주방</div><div class="wda-fnode-dsc">서버</div></div>
</div>

**💡 사용 팁**

<div class="wda-callout wda-cb">
  <p>식당의 메뉴판에는 주문 가능한 요리 목록과 가격이 정리되어 있습니다. API 명세서도 마찬가지로 "어떤 주소로 요청하면 어떤 데이터를 돌려받는지"를 미리 문서로 정리해둔 것입니다. 개발자는 이 메뉴판만 보고도 실제 요리(서버 코드)가 어떻게 만들어지는지 몰라도 주문(API 호출)할 수 있습니다.</p>
</div>

---

## 2. 요청과 응답

API는 항상 **요청(Request)**과 **응답(Response)** 한 쌍으로 동작합니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">➡️ 요청 (Request)</div>
    클라이언트가 "이 데이터를 주세요" 또는 "이 데이터를 저장해주세요"라고 서버에 보내는 신호입니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">⬅️ 응답 (Response)</div>
    서버가 요청을 처리한 결과를 클라이언트에게 돌려주는 신호입니다. 성공했는지, 어떤 데이터를 함께 보내는지가 담깁니다.
  </div>
</div>

예를 들어 날씨 앱을 실행하면 앱은 날씨 서버에 "서울 날씨 주세요"라고 요청하고, 서버는 데이터를 조회해 아래와 같은 형태로 응답합니다.

**• 날씨 API 응답 예시**

```json
{
  "city": "서울",
  "temperature": 22,
  "weather": "맑음"
}
```

앱은 이 데이터를 받아 화면에 아이콘과 온도로 예쁘게 그려서 보여줍니다. 사용자는 이 과정을 전혀 의식하지 못하지만, 뒤에서는 매번 이런 요청-응답이 오가고 있습니다.

---

## 3. API가 없다면 생기는 문제

API라는 약속이 없다면 프로그램끼리 데이터를 주고받는 일이 훨씬 번거롭고 위험해집니다.

**▶ API 유무에 따른 차이**

<table class="wda-mtable">
<thead><tr><th>API가 없다면</th><th>API가 있으면</th></tr></thead>
<tbody>
<tr><td>아무나 데이터에 접근할 수 있어 보안이 취약함</td><td>허용된 방식으로만 안전하게 접근 가능</td></tr>
<tr><td>요청 형식이 제각각이라 개발이 복잡함</td><td>정해진 규칙대로 소통하므로 예측 가능함</td></tr>
<tr><td>내부 기능이 바뀌면 연결된 모든 곳을 다시 고쳐야 함</td><td>내부 구현이 바뀌어도 API 형식만 유지되면 문제없음</td></tr>
</tbody>
</table>

즉 API는 서버 내부의 복잡한 로직을 감추고, 외부에는 "이렇게만 요청하면 된다"는 단순한 창구만 열어주는 역할을 합니다. 이 창구 덕분에 프론트엔드는 서버 내부 코드를 몰라도 필요한 데이터를 안전하게 가져올 수 있습니다.

---

## 4. 오픈 API — 누구나 쓸 수 있는 API

모든 API가 회사 내부에서만 쓰이는 건 아닙니다. **오픈 API**는 외부 개발자도 사용할 수 있도록 공개된 API로, 지도, 로그인, 결제, 날씨 정보 등 다양한 분야에서 제공됩니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">지도 API</div><div class="wda-fcard-dsc">내 위치 표시, 길찾기 기능을 내 서비스에 붙일 수 있습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">소셜 로그인 API</div><div class="wda-fcard-dsc">구글·카카오 계정으로 간편하게 회원가입을 구현합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">공공데이터포털</div><div class="wda-fcard-dsc">날씨, 교통, 인구 정보 등을 무료로 가져다 쓸 수 있습니다.</div></div>
</div>

오픈 API를 쓰려면 보통 **API 키**가 필요합니다. API 키는 "누가 이 API를 요청했는지" 확인하는 일종의 신분증으로, 사용량을 추적하고 접근 권한을 제한하는 데 쓰입니다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>API 키가 노출되면 다른 사람이 내 이름으로 요청을 보내 요금이 과금되거나 서비스가 악용될 수 있습니다. GitHub 같은 공개 저장소에 API 키를 그대로 올리지 않도록 항상 주의해야 합니다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>API는 <strong>프로그램끼리 데이터를 주고받기 위해 정해둔 약속</strong>이다.</li>
    <li>API는 항상 <strong>요청과 응답</strong> 한 쌍으로 동작한다.</li>
    <li>API가 있으면 <strong>보안, 표준화, 유지보수</strong> 측면에서 훨씬 안전하고 편리해진다.</li>
    <li>오픈 API를 쓸 때는 <strong>API 키를 비밀번호처럼</strong> 관리해야 한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: API는 특정 프로그래밍 언어나 기술이다?</div>
    <div class="wda-mistake-right">정답: API는 특정 기술이 아니라 <strong>"이렇게 요청하면 이렇게 응답한다"는 약속(규칙)</strong>이다. 이 약속을 실제로 구현하는 방법 중 하나가 다음 카테고리에서 배울 HTTP다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: API와 라이브러리는 같은 것이다?</div>
    <div class="wda-mistake-right">정답: API는 <strong>외부 서버와 통신</strong>해서 데이터를 받아오고, 라이브러리는 <strong>내 코드 안에 직접 포함</strong>되어 인터넷 연결 없이도 동작한다는 차이가 있다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 정의</div>
    <div class="wda-formula-block-body"><code>API = 요청 형식 + 응답 형식의 약속</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 동작</div>
    <div class="wda-formula-block-body"><code>API 호출 = 요청 → 응답</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 오픈 API</div>
    <div class="wda-formula-block-body"><code>오픈 API 사용 = API 키로 신원 증명</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">API를 식당에 비유하면 웨이터는 무엇에 해당하나요?</div>
    <div class="wda-flip-back">손님(클라이언트)의 주문을 주방(서버)에 전달하고 결과를 가져다주는 API 그 자체입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">API는 항상 어떤 한 쌍으로 동작하나요?</div>
    <div class="wda-flip-back">요청(Request)과 응답(Response) 한 쌍으로 동작합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">API가 없다면 왜 위험한가요?</div>
    <div class="wda-flip-back">아무나 데이터에 접근할 수 있고, 요청 형식이 제각각이라 개발이 복잡하고 유지보수가 어려워집니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">오픈 API를 쓸 때 반드시 챙겨야 하는 것은?</div>
    <div class="wda-flip-back">API 키입니다. 신원 확인과 사용량 추적에 쓰이므로 비밀번호처럼 안전하게 관리해야 합니다.</div>
  </div>
</div>
