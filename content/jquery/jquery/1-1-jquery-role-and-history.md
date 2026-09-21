---
title: "1-1 jQuery의 역할과 역사"
category: "frontend"
section: "jquery"
date: "2026-08-02"
status: "completed"
description: "jQuery가 왜 등장했는지, 브라우저 호환성 문제를 어떻게 해결했는지, 그리고 React·Vue 시대에 jQuery를 어떤 시각으로 바라봐야 하는지 정리합니다."
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
  • <strong>등장 배경 이해</strong> — jQuery가 2006년에 왜 필요했는지 당시 문제 상황을 파악합니다<br>
  • <strong>해결한 문제 정리</strong> — 브라우저 호환성, 긴 코드, 복잡한 통신 문제를 jQuery가 어떻게 줄였는지 이해합니다<br>
  • <strong>전성기와 쇠퇴 원인 파악</strong> — 웹 표준과 React 같은 프레임워크가 등장하며 무엇이 달라졌는지 정리합니다<br>
  • <strong>현재 위치 이해</strong> — 지금도 jQuery를 만나게 되는 상황과, 왜 여전히 알아둘 가치가 있는지 파악합니다
</div>

---

## 1. 라이브러리란

jQuery는 순수 자바스크립트로 화면을 다루는 방법을 익히기 전, "왜 이런 도구가 필요했는가"를 먼저 이해하기 위한 문서입니다.

이 문서에서는 jQuery의 등장 배경과 현재 위치를 다룹니다. 실제 선택자·DOM 조작 문법은 다음 문서(1-2 jQuery 핵심 기능 및 기본 효과)에서 이어집니다.

**라이브러리**는 자주 쓰는 기능을 미리 만들어둔 코드 모음입니다. 필요한 기능을 처음부터 직접 구현하지 않고, 이미 만들어진 것을 가져다 쓸 수 있다는 점이 핵심입니다. **jQuery**는 웹페이지의 요소를 선택하고 조작하는 작업(DOM 조작)을 쉽게 만들어주는 자바스크립트 라이브러리입니다.

---

## 2. 2006년, jQuery가 필요했던 이유

지금은 상상하기 어렵지만, 2000년대 중반의 웹 개발자는 세 가지 골칫거리를 매번 마주해야 했습니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">브라우저 호환성</div><div class="wda-fcard-dsc">인터넷 익스플로러에서 되는 코드가 파이어폭스에서는 안 되는 경우가 흔했습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">긴 DOM 코드</div><div class="wda-fcard-dsc"><code>document.getElementById</code>처럼 긴 명령어를 매번 반복해서 써야 했습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">복잡한 서버 통신</div><div class="wda-fcard-dsc"><code>XMLHttpRequest</code> 객체를 직접 다뤄야 해 통신 코드가 장황했습니다.</div></div>
</div>

2006년, 존 레식(John Resig)이 "Write less, do more(적게 쓰고, 많이 하자)"라는 슬로건과 함께 jQuery를 공개했습니다. jQuery는 이 세 가지 문제를 라이브러리 내부에서 대신 처리해주면서 빠르게 표준처럼 자리 잡았습니다.

---

## 3. jQuery가 해결한 것

**▶ jQuery가 해결한 문제 3가지**

<table class="wda-mtable">
<thead><tr><th>문제</th><th>순수 자바스크립트(과거)</th><th>jQuery</th></tr></thead>
<tbody>
<tr><td>요소 선택</td><td>document.getElementById(...)</td><td>$('#id')</td></tr>
<tr><td>서버 통신</td><td>XMLHttpRequest 직접 구성</td><td>$.ajax(...)</td></tr>
<tr><td>이벤트 처리</td><td>브라우저마다 다른 방식</td><td>.on(...) 하나로 통일</td></tr>
</tbody>
</table>

`$`는 jQuery를 대표하는 기호입니다. `$('#header')`처럼 CSS 선택자 문법을 그대로 가져다 쓸 수 있어, 길고 브라우저마다 다르게 동작하던 코드를 짧고 일관된 코드로 바꿔주었습니다.

이 덕분에 2010년대 초반에는 전 세계 웹사이트의 70% 이상이 jQuery를 사용할 정도로 널리 퍼졌습니다.

---

## 4. 왜 요즘은 예전만큼 쓰지 않을까

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">2000년대 — 브라우저 전쟁</div>
    브라우저마다 해석 방식이 달라 같은 코드가 다르게 동작했습니다. jQuery가 이 차이를 대신 메워주는 "해결사" 역할을 했습니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">지금 — 표준화 시대</div>
    <code>querySelector</code>, <code>fetch</code>, <code>classList</code> 같은 기능이 브라우저 자체에 표준으로 내장되며, 호환성 문제를 대신 해결해줄 라이브러리의 필요성이 줄었습니다.
  </div>
</div>

또 하나의 큰 변화는 **React, Vue 같은 프레임워크의 등장**입니다. jQuery는 개발자가 직접 "이 요소를 찾아서 글자를 바꿔라"라고 명령하는 방식(명령형)인 반면, 이런 프레임워크는 데이터(상태)만 바꾸면 화면이 자동으로 갱신되는 방식(선언형)을 씁니다.

화면 구조가 복잡해질수록 데이터를 한 곳에서 관리하는 선언형 방식이 유지보수에 유리해, 신규 프로젝트에서는 jQuery 대신 이런 프레임워크를 선택하는 경우가 많아졌습니다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>jQuery는 지금도 워드프레스 같은 CMS에 기본으로 포함되어 있고, 이미 운영 중인 레거시 시스템의 유지보수, 간단한 페이지에서의 가벼운 DOM 조작에는 여전히 실용적인 선택입니다. "무조건 낡은 기술"이라기보다는 "상황에 따라 여전히 만날 수 있는 도구"로 이해하는 것이 정확합니다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>jQuery는 <strong>브라우저 호환성, 긴 DOM 코드, 복잡한 서버 통신</strong> 문제를 해결하려고 등장했다.</li>
    <li>jQuery는 <strong>$ 기호</strong>로 CSS 선택자처럼 요소를 선택하고 조작한다.</li>
    <li>브라우저 표준화와 <strong>React·Vue 같은 선언형 프레임워크</strong>의 등장으로 신규 프로젝트에서의 사용은 줄었다.</li>
    <li>레거시 시스템, 워드프레스, 간단한 페이지에서는 <strong>지금도 여전히 쓰인다</strong>.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: jQuery는 이제 완전히 쓸모없는 옛날 기술이다?</div>
    <div class="wda-mistake-right">정답: 신규 프로젝트에서의 <strong>선택 비중은 줄었지만</strong>, 레거시 유지보수와 간단한 DOM 조작 상황에서는 여전히 실무에서 만날 수 있다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: jQuery가 밀려난 이유는 성능이 나빠서다?</div>
    <div class="wda-mistake-right">정답: 근본 원인은 <strong>브라우저 자체가 표준 기능을 갖추면서 호환성 해결사 역할이 불필요해졌고</strong>, 화면이 복잡해질수록 데이터 중심 개발 방식(React 등)이 더 유리해졌기 때문이다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 등장 이유</div>
    <div class="wda-formula-block-body"><code>호환성 + 긴 코드 + 복잡한 통신 → jQuery</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 대체 흐름</div>
    <div class="wda-formula-block-body"><code>브라우저 표준화 + React/Vue → 사용 감소</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 현재 위치</div>
    <div class="wda-formula-block-body"><code>레거시 + 간단한 페이지 = 여전히 유효</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">jQuery는 언제, 누가 만들었나요?</div>
    <div class="wda-flip-back">2006년 존 레식(John Resig)이 만들었습니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">jQuery가 등장하기 전 가장 큰 문제는 무엇이었나요?</div>
    <div class="wda-flip-back">브라우저마다 코드가 다르게 동작하는 호환성 문제였습니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">jQuery 사용이 줄어든 대표적인 두 가지 이유는?</div>
    <div class="wda-flip-back">브라우저 표준화로 호환성 문제가 줄었고, React·Vue 같은 선언형 프레임워크가 등장했기 때문입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">지금도 jQuery를 만날 수 있는 대표적인 상황은?</div>
    <div class="wda-flip-back">워드프레스 기반 사이트나, 이미 jQuery로 만들어진 레거시 시스템을 유지보수할 때입니다.</div>
  </div>
</div>
