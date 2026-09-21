---
title: "1-3 빌드와 배포"
category: "frontend"
section: "build-tools"
date: "2026-08-03"
status: "completed"
description: "개발용 빌드와 배포용 빌드의 차이, dist 폴더에 담기는 결과물의 의미, 정적 파일을 배포한다는 개념을 정리합니다."
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
  • <strong>개발용 빌드와 배포용 빌드 구분</strong> — 두 빌드가 지향하는 목표가 다르다는 것을 이해합니다<br>
  • <strong>dist 폴더 이해</strong> — 빌드 결과물이 무엇으로 이루어져 있는지 파악합니다<br>
  • <strong>정적 파일 배포 개념</strong> — 배포가 결국 무엇을 어디에 올리는 일인지 정리합니다<br>
  • <strong>빌드 명령어 감 잡기</strong> — 개발 서버 실행과 빌드 명령어의 차이를 익힙니다
</div>

---

## 1. 개발용 빌드 vs 배포용 빌드

1-2에서 번들러 설정 개념을 배웠다면, 이 문서에서는 그 설정을 이용해 실제로 "완성된 결과물"을 만드는 과정을 다룹니다.

개발 중에 보는 화면과, 사용자에게 실제로 전달되는 화면은 만들어지는 방식이 다릅니다. 이 차이를 이해하는 것이 이 문서의 핵심입니다.

개발할 때 실행하는 개발 서버와, 실제 서비스를 위해 만드는 결과물은 목적 자체가 다릅니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">🛠️ 개발용 (Development)</div>
    코드를 저장할 때마다 빠르게 화면에 반영되는 것이 중요합니다. 디버깅에 도움이 되는 정보도 함께 포함됩니다. 대신 파일 용량이나 실행 속도는 최적화되어 있지 않습니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">🚀 배포용 (Production)</div>
    실제 사용자가 이 결과물을 받아서 실행합니다. 그래서 파일 용량을 최대한 줄이고, 실행 속도를 최적화하는 것이 중요합니다. 디버깅용 정보는 최소화됩니다.
  </div>
</div>

**▶ 개발·배포 명령어 비교**

<table class="wda-mtable">
<thead><tr><th>명령어</th><th>용도</th></tr></thead>
<tbody>
<tr><td>npm run dev</td><td>개발 서버를 실행합니다. 코드를 수정하면 화면이 바로 갱신됩니다.</td></tr>
<tr><td>npm run build</td><td>배포용 결과물을 생성합니다. 압축과 최적화가 적용됩니다.</td></tr>
</tbody>
</table>

---

## 2. dist 폴더란

`npm run build`를 실행하면 번들러는 배포에 필요한 파일들을 한곳에 모아 저장합니다. 이 폴더는 보통 관례적으로 `dist`(distribution의 줄임말)라는 이름을 사용합니다.

**• dist 폴더 구조**

```
dist/
├── index.html
├── assets/
│   ├── index-a1b2c3.js
│   └── index-d4e5f6.css
```

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">index.html</div><div class="wda-fcard-dsc">사용자가 처음 접속했을 때 받는 뼈대 HTML 파일입니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">번들된 JS 파일</div><div class="wda-fcard-dsc">여러 컴포넌트와 로직이 하나(또는 소수)로 압축되어 묶인 코드입니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">번들된 CSS 파일</div><div class="wda-fcard-dsc">여러 스타일 파일이 합쳐지고 압축된 결과입니다.</div></div>
</div>

**💡 사용 팁**

<div class="wda-callout wda-cb">
  <p>빌드 결과물의 파일명에는 <code>index-a1b2c3.js</code>처럼 알 수 없는 문자열(해시)이 붙는 경우가 많습니다. 이는 코드가 바뀌면 해시 값도 바뀌도록 만들어, 사용자의 브라우저가 예전 파일을 계속 캐시해서 쓰는 문제를 방지하기 위한 장치입니다.</p>
</div>

---

## 3. 정적 파일을 배포한다는 것

**배포(Deploy)**는 이 `dist` 폴더 안의 파일들을 사용자가 접속할 수 있는 서버에 올려두는 작업입니다. `dist` 폴더 안의 파일들은 서버에서 별도의 처리 없이 그대로 전달만 하면 되는 파일이라는 의미에서 **정적 파일(Static File)**이라고 부릅니다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1. 빌드</div><div class="wda-fnode-dsc">npm run build로 dist 폴더 생성</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2. 업로드</div><div class="wda-fnode-dsc">dist 폴더를 배포 서버에 올림</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3. 접속</div><div class="wda-fnode-dsc">사용자가 주소로 접속해 파일을 받음</div></div>
</div>

이 흐름 덕분에, 배포 서버 입장에서는 React인지 다른 프레임워크인지 신경 쓸 필요가 없습니다. 결국 서버가 넘겨주는 것은 HTML·CSS·JS로만 이루어진 평범한 정적 파일이기 때문입니다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>개발 서버(<code>npm run dev</code>)에서 화면이 잘 보인다고 해서 배포 준비가 끝난 것은 아닙니다. 개발 서버와 실제 배포 환경은 설정이 다를 수 있으므로, 배포 전에는 반드시 <code>npm run build</code>로 실제 결과물을 만들어보고, 그 결과물이 의도한 대로 동작하는지 확인하는 과정이 필요합니다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>개발용 빌드는 <strong>빠른 반영</strong>이, 배포용 빌드는 <strong>용량과 속도 최적화</strong>가 목표다.</li>
    <li><code>npm run dev</code>는 개발 서버, <code>npm run build</code>는 <strong>배포용 결과물 생성</strong> 명령어다.</li>
    <li>빌드 결과물은 보통 <strong>dist 폴더</strong>에 저장된다.</li>
    <li>배포는 dist 폴더 안의 <strong>정적 파일을 서버에 올리는 작업</strong>이다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 개발 서버에서 잘 동작하면 배포도 문제없을 것이다?</div>
    <div class="wda-mistake-right">정답: 개발 서버와 <strong>배포용 빌드는 만들어지는 방식이 다르므로</strong>, 배포 전에는 반드시 build 결과물을 직접 확인하는 과정이 필요하다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: dist 폴더 안 파일은 서버에서 특별한 처리가 필요하다?</div>
    <div class="wda-mistake-right">정답: dist 폴더 안 파일은 <strong>정적 파일</strong>로, 서버는 별도 가공 없이 있는 그대로 전달하기만 하면 된다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 명령어</div>
    <div class="wda-formula-block-body"><code>dev = 개발, build = 배포용 생성</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 결과물</div>
    <div class="wda-formula-block-body"><code>build → dist 폴더</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 배포</div>
    <div class="wda-formula-block-body"><code>배포 = 정적 파일을 서버에 올리기</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">배포용 빌드에서 가장 중요하게 여기는 것은?</div>
    <div class="wda-flip-back">파일 용량을 줄이고 실행 속도를 최적화하는 것입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">빌드 결과물이 보통 저장되는 폴더 이름은?</div>
    <div class="wda-flip-back">dist 폴더입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">빌드 파일명에 이상한 문자열(해시)이 붙는 이유는?</div>
    <div class="wda-flip-back">코드가 바뀌면 파일명도 바뀌게 해서, 브라우저가 예전 파일을 캐시해서 쓰는 문제를 방지하기 위해서입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">정적 파일이란 무엇인가요?</div>
    <div class="wda-flip-back">서버가 별도 가공 없이 있는 그대로 전달만 하면 되는 파일을 말합니다.</div>
  </div>
</div>
