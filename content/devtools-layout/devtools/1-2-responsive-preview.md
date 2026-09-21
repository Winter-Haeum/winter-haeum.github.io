---
title: "1-2 반응형 화면 미리보기"
category: "frontend"
section: "devtools"
date: "2026-08-01"
status: "completed"
description: "DevTools 반응형 모드로 디바이스 프리셋, 커스텀 해상도, 회전, User Agent를 활용해 다양한 화면 크기를 빠르게 테스트하는 방법을 정리합니다."
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
  • <strong>반응형 모드 활성화</strong> — Cmd/Ctrl+Shift+M으로 다양한 화면 크기를 즉시 테스트할 수 있습니다<br>
  • <strong>디바이스 프리셋 활용</strong> — iPhone, iPad, Galaxy 등 실제 기기 환경을 그대로 재현할 수 있습니다<br>
  • <strong>커스텀 해상도 설정</strong> — 프리셋에 없는 크기를 직접 입력해 테스트할 수 있습니다<br>
  • <strong>회전 기능 활용</strong> — 세로·가로 방향을 전환하며 레이아웃 변화를 확인할 수 있습니다
</div>

---

## 1. 반응형 모드 활성화하기

[이전 문서](/devtools-layout/devtools/1-1-inspect-website-with-devtools)에서 DevTools로 HTML과 CSS를 들여다봤다면, 이 문서는 그 화면이 다양한 기기에서 어떻게 보이는지 확인하는 방법을 다룹니다.

모바일부터 태블릿까지 실제 기기를 하나씩 구해서 테스트할 수는 없다. 반응형 모드는 이 문제를 브라우저 안에서 바로 해결해주는 기능이다.

반응형 모드는 브라우저 창 자체를 다양한 화면 크기의 기기처럼 흉내 내는 기능이다. DevTools가 이미 열려 있다면 별도로 다시 열 필요 없이 바로 전환할 수 있다.

**▶ 반응형 모드 단축키**

<table class="wda-mtable">
<thead><tr><th>운영체제</th><th>단축키</th></tr></thead>
<tbody>
<tr><td>Windows / Linux</td><td><code>Ctrl+Shift+M</code></td></tr>
<tr><td>macOS</td><td><code>Cmd+Shift+M</code></td></tr>
</tbody>
</table>

단축키를 누르면 툴바 상단에 해상도와 디바이스를 고를 수 있는 메뉴가 나타나고, 페이지 화면은 선택한 크기에 맞춰 즉시 축소된 형태로 바뀐다.

---

## 2. 디바이스 프리셋으로 실제 기기 재현하기

상단 메뉴에서 특정 기기를 선택하면 세 가지 값이 한 번에 자동으로 적용된다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">해상도</div><div class="wda-fcard-dsc">width × height. 그 기기의 화면 크기 그대로 뷰포트가 설정된다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">DPR</div><div class="wda-fcard-dsc">Device Pixel Ratio. 화면 밀도 값으로, 이미지·아이콘이 선명하게 보이는지 확인할 수 있다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">User Agent</div><div class="wda-fcard-dsc">브라우저가 서버에 전달하는 기기 정보 문자열도 함께 바뀐다.</div></div>
</div>

자주 사용하는 프리셋의 해상도는 다음과 같다.

**▶ 기기별 프리셋 해상도**

<table class="wda-mtable">
<thead><tr><th>구분</th><th>기기</th><th>해상도 (width × height)</th></tr></thead>
<tbody>
<tr><td>iPhone</td><td>iPhone SE</td><td>375 × 667</td></tr>
<tr><td>iPhone</td><td>iPhone 12 / 13 Pro</td><td>390 × 844</td></tr>
<tr><td>iPhone</td><td>iPhone 14 Pro Max</td><td>430 × 932</td></tr>
<tr><td>iPad</td><td>iPad Mini</td><td>768 × 1024</td></tr>
<tr><td>iPad</td><td>iPad Air</td><td>820 × 1180</td></tr>
<tr><td>iPad</td><td>iPad Pro 12.9"</td><td>1024 × 1366</td></tr>
<tr><td>Android</td><td>Galaxy S20</td><td>360 × 800</td></tr>
<tr><td>Android</td><td>Pixel 5</td><td>393 × 851</td></tr>
<tr><td>Android</td><td>Surface Duo</td><td>540 × 720</td></tr>
</tbody>
</table>

같은 모바일이어도 iPhone SE와 iPhone 14 Pro Max처럼 너비 차이가 꽤 크기 때문에, 하나의 기기에서만 확인하고 끝내지 않고 여러 프리셋을 오가며 확인하는 습관이 필요하다.

---

## 3. 커스텀 해상도 직접 입력하기

프리셋 목록에 없는 크기를 확인해야 할 때는 해상도를 직접 입력할 수 있다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">반응형 모드 활성화</div><div class="wda-fnode-dsc"><code>Ctrl/Cmd+Shift+M</code></div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">입력란 클릭</div><div class="wda-fnode-dsc">상단 width × height 입력란 클릭</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">값 입력</div><div class="wda-fnode-dsc">원하는 px 값을 직접 입력</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">Enter</div><div class="wda-fnode-dsc">확정하면 즉시 해당 크기로 전환</div></div>
</div>

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">광고 배너</div><div class="wda-fcard-dsc">300×250처럼 규격이 정해진 광고 영역을 그 크기 그대로 확인할 때</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">키오스크 화면</div><div class="wda-fcard-dsc">매장 키오스크처럼 세로로 긴 대형 화면을 테스트할 때</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">특이 해상도 모바일</div><div class="wda-fcard-dsc">프리셋에 없는 폴더블, 구형 기종 등 특정 해상도를 확인할 때</div></div>
</div>

---

## 4. 회전 기능으로 가로 · 세로 전환하기

툴바에 있는 회전 아이콘을 누르면 현재 선택된 해상도의 width와 height가 서로 바뀌면서 가로 모드와 세로 모드를 오갈 수 있다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Portrait (세로)</div>
    예: 390 × 844. 대부분의 모바일 사이트가 기본으로 노출되는 방향이며, 콘텐츠가 위아래로 길게 배치된다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Landscape (가로)</div>
    예: 844 × 390. 영상 시청이나 게임처럼 넓은 화면이 필요한 상황, 또는 태블릿 사용 환경을 확인할 때 쓴다.
  </div>
</div>

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>회전 버튼은 가로로 눕혔을 때 <strong>레이아웃이 깨지지 않는지</strong> 빠르게 확인하는 용도로 유용하다. 특히 CSS에 <code>orientation</code> 미디어 쿼리를 사용했다면, 실제로 방향이 바뀔 때 의도한 스타일이 적용되는지 반드시 이 기능으로 점검해야 한다.</p>
</div>

---

## 5. User Agent 확인 실습

디바이스 프리셋을 바꾸면 화면 크기만 바뀌는 것이 아니라 User Agent 문자열도 함께 바뀐다. 이 값은 서버에 그대로 전달되기 때문에, 서버 입장에서는 정말로 그 기기로 접속한 것처럼 보인다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1. 기본값 확인</div><div class="wda-fnode-dsc">Console 탭에서 <code>navigator.userAgent</code> 입력</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2. 기기 변경</div><div class="wda-fnode-dsc">반응형 모드를 켜고 iPhone 12 Pro 같은 프리셋으로 변경</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3. 다시 확인</div><div class="wda-fnode-dsc">Console에서 <code>navigator.userAgent</code>를 다시 입력해 값 비교</div></div>
</div>

**• JavaScript: User Agent 값 확인**

```js
navigator.userAgent
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">데스크탑 Chrome</div>
    <code>Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36</code>
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">iPhone 12 Pro 프리셋</div>
    <code>Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1</code>
  </div>
</div>

이 문자열을 부분별로 뜯어보면 다음과 같은 정보를 담고 있다.

**▶ User Agent 문자열 구성 요소**

<table class="wda-mtable">
<thead><tr><th>구성 요소</th><th>의미</th></tr></thead>
<tbody>
<tr><td><code>Windows NT 10.0</code></td><td>운영체제가 윈도우 10임을 의미</td></tr>
<tr><td><code>Win64; x64</code></td><td>64비트 시스템에서 실행 중임을 의미</td></tr>
<tr><td><code>AppleWebKit</code></td><td>브라우저가 사용하는 렌더링 엔진 정보</td></tr>
<tr><td><code>Chrome/120</code></td><td>Chrome 브라우저 버전 정보</td></tr>
</tbody>
</table>

---

## 6. 반응형 모드의 한계

반응형 모드는 매우 편리하지만 실제 기기와 완전히 같지는 않다. 다음 네 가지 차이를 항상 염두에 두어야 한다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">성능 차이</div><div class="wda-fcard-dsc">데스크탑의 CPU·GPU로 흉내 내는 것이라 실제 저사양 기기보다 훨씬 빠르게 동작할 수 있다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">터치 이벤트</div><div class="wda-fcard-dsc">마우스로 터치를 흉내 내는 것일 뿐, 실제 손가락 터치와 100% 동일하게 동작하지 않는다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">하드웨어 기능</div><div class="wda-fcard-dsc">카메라, GPS, 자이로 센서 등 실제 하드웨어가 필요한 기능은 시뮬레이션할 수 없다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">브라우저 차이</div><div class="wda-fcard-dsc">Chrome 엔진 기반으로만 흉내 내기 때문에, 실제 Safari 등 다른 브라우저의 렌더링과 다를 수 있다.</div></div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>반응형 모드는 개발 중 빠르게 확인하기 위한 <strong>1차 점검 도구</strong>다. 최종 배포 전에는 반드시 실제 기기에서 한 번 더 테스트해야 한다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>반응형 모드는 <strong>Ctrl/Cmd+Shift+M</strong>으로 활성화한다.</li>
    <li>디바이스 프리셋을 선택하면 <strong>해상도, DPR, User Agent</strong>가 한 번에 바뀐다.</li>
    <li>프리셋에 없는 크기는 <strong>width × height 입력란에 직접</strong> 입력해 테스트할 수 있다.</li>
    <li>반응형 모드는 <strong>1차 점검용</strong>이며, 최종 배포 전 실제 기기 테스트가 반드시 필요하다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 반응형 모드에서 잘 보이면 실제 기기에서도 완전히 똑같이 동작한다?</div>
    <div class="wda-mistake-right">정답: 성능, 터치, 하드웨어, 브라우저 엔진 차이가 있어 <strong>실제 기기 테스트가 별도로 필요</strong>하다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 회전 버튼은 화면을 시각적으로만 돌려서 보여준다?</div>
    <div class="wda-mistake-right">정답: width와 height 값 자체가 서로 <strong>바뀌는 것</strong>이라, 실제 가로 모드 접속과 같은 레이아웃 계산이 이루어진다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 활성화</div>
    <div class="wda-formula-block-body"><code>Ctrl/Cmd + Shift + M</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 프리셋 적용값</div>
    <div class="wda-formula-block-body"><code>해상도 + DPR + User Agent</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 회전</div>
    <div class="wda-formula-block-body"><code>Portrait width ↔ height Landscape</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">반응형 모드 활성화 단축키는?</div>
    <div class="wda-flip-back"><code>Ctrl/Cmd+Shift+M</code>이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">커스텀 해상도 설정이 필요한 대표적인 경우는?</div>
    <div class="wda-flip-back">광고 배너처럼 프리셋에 없는 특정 px 크기를 확인해야 할 때다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">디바이스 프리셋을 바꾸면 함께 바뀌는 세 가지는?</div>
    <div class="wda-flip-back">해상도(width×height), DPR, User Agent 문자열이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">반응형 모드에서 시뮬레이션할 수 없는 것은?</div>
    <div class="wda-flip-back">카메라, GPS, 자이로 센서 같은 실제 하드웨어 기능이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">navigator.userAgent는 어디서 확인하나?</div>
    <div class="wda-flip-back">DevTools의 Console 탭에서 직접 입력해 확인한다.</div>
  </div>
</div>
