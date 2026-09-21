---
title: "1-3 npm으로 패키지 관리하기"
status: "completed"
description: "React 프로젝트에서 필요한 도구와 라이브러리를 npm으로 설치·삭제·실행하는 방법과 package.json, node_modules, package-lock.json의 역할을 정리한다."
category: "React"
section: "Basics"
tags:
  - react
  - npm
  - package-management
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
  • <strong>package.json 읽기</strong> — 프로젝트에 등록된 명령과 패키지 목록을 확인합니다.<br>
  • <strong>패키지 설치·삭제</strong> — <code>npm install</code>/<code>npm uninstall</code>로 패키지를 관리합니다.<br>
  • <strong>스크립트 실행</strong> — <code>npm run</code>으로 등록된 명령을 실행합니다.<br>
  • <strong>관련 파일 이해</strong> — node_modules와 package-lock.json의 역할을 구분합니다.
</div>

---

## 1. npm package 관리가 필요한 순간

React 프로젝트에는 React 자체뿐 아니라 빌드 도구, 코드 검사 도구 같은 여러 package가 함께 필요합니다. 이 package들을 설치하고, 최신 상태로 관리하고, 필요 없어지면 제거하는 작업이 npm package 관리입니다.

**💡 설명**

<div class="wda-callout wda-ci">
  package/library/dependency의 의미는 <strong>1-1 Node.js와 npm 이해하기</strong>에서 다뤘습니다. 이 문서에서는 실제로 package.json을 읽고 명령으로 관리하는 방법에 집중합니다.
</div>

---

## 2. package.json은 프로젝트 기록 파일이다

`package.json`에는 프로젝트 이름, 실행 가능한 명령(scripts), 필요한 패키지 목록(dependencies)이 기록됩니다.

**• 설정: package.json 예시**

```json
{
  "name": "my-app",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "..."
  },
  "devDependencies": {
    "vite": "..."
  }
}
```

**💡 설명**

<div class="wda-callout wda-ci">
  위 코드는 설명을 위한 축약 예시입니다. 실제 package.json은 더 많은 필드를 가질 수 있습니다.
</div>

---

## 3. scripts는 자주 쓰는 명령어 별명이다

`scripts`에 등록해두면 긴 명령어 대신 짧은 이름으로 실행할 수 있습니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">npm run dev</div>
    개발 서버를 실행한다. 코드를 수정하면 바로 반영해서 확인할 수 있다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">npm run build</div>
    배포용 파일을 만든다. 실제 서버에 올리기 전에 실행한다.
  </div>
</div>

---

## 4. dependencies와 devDependencies

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">dependencies</div>
    실제 서비스 실행에 필요한 패키지. 예: react
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">devDependencies</div>
    개발할 때만 필요한 도구. 예: vite, eslint
  </div>
</div>

---

## 5. npm install

**• 터미널: 패키지 설치하기**

```bash
npm install react
```

패키지를 설치하면 `dependencies`에 이름이 기록되고, 실제 파일은 `node_modules`에 다운로드됩니다.

**💡 설명**

<div class="wda-callout wda-ci">
  인자 없이 <code>npm install</code>만 실행하면, package.json에 이미 적힌 패키지 전체를 한 번에 설치합니다. 동료의 프로젝트를 받았을 때 가장 먼저 실행하는 명령입니다.
</div>

---

## 6. npm uninstall

**• 터미널: 패키지 제거하기**

```bash
npm uninstall react
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">npm install</div>
    패키지를 설치하고 package.json에 기록을 추가한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">npm uninstall</div>
    패키지를 제거하고 package.json에서 기록을 지운다.
  </div>
</div>

---

## 7. npm run

**• 터미널: scripts 명령 실행하기**

```bash
npm run dev
npm run build
```

`scripts`에 등록한 이름 앞에 `npm run`을 붙이면 그 명령이 실행됩니다.

---

## 8. node_modules와 package-lock.json

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">node_modules</div>
    설치된 패키지의 실제 파일이 담기는 폴더.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">package-lock.json</div>
    실제로 설치된 정확한 버전을 기록하는 파일.
  </div>
</div>

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">npm install</div><div class="wda-fnode-dsc">명령 실행</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">package.json 기록</div><div class="wda-fnode-dsc">패키지 이름 추가</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">node_modules 생성</div><div class="wda-fnode-dsc">실제 파일 다운로드</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">package-lock 고정</div><div class="wda-fnode-dsc">설치된 버전 기록</div></div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  node_modules는 직접 수정하지 않습니다. package-lock.json도 함부로 지우지 않습니다. 둘 다 npm 명령으로 관리되는 파일입니다.
</div>

---

## 9. 버전 표기 맛보기

`package.json`의 버전 앞에 붙는 기호는 업데이트 허용 범위를 나타냅니다.

**▶ 버전 기호별 업데이트 허용 범위**

<table class="wda-mtable">
  <tr>
    <th>기호</th>
    <th>의미</th>
  </tr>
  <tr>
    <td><code>^</code> (캐럿)</td>
    <td>Major 버전이 바뀌지 않는 선에서 업데이트를 허용한다.</td>
  </tr>
  <tr>
    <td><code>~</code> (틸드)</td>
    <td>Patch 버전까지만 업데이트를 허용한다.</td>
  </tr>
</table>

---

## 10. npm audit과 npx 짧게 보기

**💡 설명**

<div class="wda-callout wda-ci">
  <code>npm audit</code>은 설치된 패키지에 알려진 보안 취약점이 있는지 점검하는 명령입니다.
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  <code>npx</code>는 패키지를 프로젝트에 설치하지 않고 바로 실행하는 도구입니다. React 프로젝트를 생성할 때 이런 방식의 명령을 사용하는 예는 <strong>1-6 React 프로젝트 제대로 이해하기</strong>에서 이어집니다.
</div>

---

## 11. 초보자가 자주 만나는 package 관리 실수

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">node_modules를 직접 수정한다</div>
    <div class="wda-fcard-dsc">npm이 자동으로 관리하므로 직접 고치면 다음 설치 때 사라진다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">package-lock.json을 지운다</div>
    <div class="wda-fcard-dsc">팀원 간 설치 버전이 달라져 "내 컴퓨터에선 되는데" 문제가 생길 수 있다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">devDependencies에 넣어야 할 패키지를 dependencies에 설치한다</div>
    <div class="wda-fcard-dsc">개발용 도구까지 배포 파일에 포함될 수 있다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">npm uninstall 없이 폴더에서 파일만 지운다</div>
    <div class="wda-fcard-dsc">package.json 기록은 그대로 남아 다음 install 때 다시 설치된다.</div>
  </div>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><strong>package.json</strong>에는 프로젝트 이름, <strong>scripts</strong>(실행 명령), <strong>dependencies</strong>(패키지 목록)가 기록된다.</li>
    <li><strong>dependencies</strong>는 실제 서비스에 필요한 패키지, <strong>devDependencies</strong>는 개발 중에만 필요한 도구다.</li>
    <li><code>npm install</code>은 패키지를 설치하고, <code>npm uninstall</code>은 제거한다. <code>npm run [이름]</code>은 scripts에 등록된 명령을 실행한다.</li>
    <li><strong>node_modules</strong>는 설치된 패키지 파일이 담기는 폴더, <strong>package-lock.json</strong>은 정확한 설치 버전을 기록하는 파일이다.</li>
    <li><code>^</code>는 Major 버전 유지 선에서, <code>~</code>는 Patch 버전까지만 업데이트를 허용한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: node_modules는 필요하면 직접 고쳐도 된다?</div>
    <div class="wda-mistake-right">정답: node_modules는 <strong>npm이 자동으로 관리</strong>하므로 직접 수정하지 않는다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: package-lock.json은 지워도 상관없다?</div>
    <div class="wda-mistake-right">정답: 지우면 팀원 간 <strong>설치 버전이 달라질 수 있어</strong> 함부로 지우지 않는다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: dependencies와 devDependencies는 구분할 필요가 없다?</div>
    <div class="wda-mistake-right">정답: devDependencies에 넣어야 할 도구를 dependencies에 넣으면 <strong>불필요한 패키지가 배포 파일에 포함</strong>될 수 있다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 패키지를 지우려면 폴더에서 파일만 삭제하면 된다?</div>
    <div class="wda-mistake-right">정답: <code>npm uninstall</code>을 써야 package.json 기록까지 함께 정리된다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 설치/삭제</div>
    <div class="wda-formula-block-body"><code>npm install / npm uninstall</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 실행</div>
    <div class="wda-formula-block-body"><code>npm run [scripts 이름]</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 관련 파일</div>
    <div class="wda-formula-block-body"><code>node_modules = 실제 파일, package-lock.json = 버전 기록</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · 버전 기호</div>
    <div class="wda-formula-block-body"><code>^ = Minor까지, ~ = Patch까지</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">package.json에는 무엇이 기록되나?</div>
    <div class="wda-flip-back">프로젝트 이름, scripts(실행 명령), dependencies(패키지 목록) 등이 기록된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">dependencies와 devDependencies의 차이는?</div>
    <div class="wda-flip-back">dependencies는 실제 서비스에 필요한 패키지, devDependencies는 개발 중에만 필요한 도구다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">패키지를 삭제하는 올바른 방법은?</div>
    <div class="wda-flip-back">npm uninstall을 사용해 package.json 기록까지 함께 정리한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">node_modules와 package-lock.json의 차이는?</div>
    <div class="wda-flip-back">node_modules는 설치된 실제 파일, package-lock.json은 정확한 설치 버전 기록이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">^1.2.3은 어디까지 업데이트를 허용하나?</div>
    <div class="wda-flip-back">Major 버전이 바뀌지 않는 범위까지 업데이트를 허용한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">npx는 npm install과 무엇이 다른가?</div>
    <div class="wda-flip-back">패키지를 프로젝트에 설치하지 않고 바로 실행할 수 있다.</div>
  </div>
</div>
