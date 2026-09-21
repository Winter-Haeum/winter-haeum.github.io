---
title: "1-2 Node.js 설치하기"
status: "completed"
description: "새 컴퓨터에서 React 개발을 시작하기 전에 Node.js 설치 상태를 준비하고, 터미널에서 node -v/npm -v로 확인하는 방법을 정리한다."
category: "React"
section: "Basics"
tags:
  - react
  - nodejs
  - npm
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
  • <strong>LTS 버전 고르기</strong> — 왜 LTS 버전을 설치해야 하는지 이해합니다.<br>
  • <strong>설치 확인하기</strong> — 터미널에서 <code>node -v</code>, <code>npm -v</code>로 설치 상태를 확인합니다.<br>
  • <strong>기본 문제 해결</strong> — 명령어가 인식되지 않을 때 기본적으로 무엇을 점검하는지 파악합니다.<br>
  • <strong>다음 단계 준비</strong> — 이후 문서에서 무엇을 배우는지 확인합니다.
</div>

---

## 1. Node.js 설치가 필요한 순간

1-1에서 Node.js와 npm이 왜 필요한지 역할을 살펴봤습니다. 이제 실제로 내 컴퓨터에 Node.js가 준비되어 있는지 확인하고, 없다면 설치할 차례입니다.

**💡 설명**

<div class="wda-callout wda-ci">
  Node.js/npm이 왜 필요한지는 <strong>1-1 Node.js와 npm 이해하기</strong>에서 다뤘습니다. 이 문서에서는 "설치 상태를 준비하고 확인하는 방법"에 집중합니다.
</div>

---

## 2. 설치 전에 LTS 버전을 고르는 이유

Node.js 공식 사이트에는 보통 두 가지 버전이 안내됩니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">LTS (Long Term Support)</div>
    장기 지원 버전. 검증이 끝나 안정적이며, 보안 업데이트를 오래 지원한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Current</div>
    최신 기능을 먼저 담은 버전. 실험적인 기능이 있어 예상치 못한 변화가 있을 수 있다.
  </div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  처음 설치한다면 <strong>LTS</strong> 버전을 선택합니다. 학습 중에는 안정성이 우선입니다.
</div>

---

## 3. Node.js와 npm은 함께 준비된다

Node.js 설치 파일 안에는 npm도 함께 들어 있습니다. Node.js를 설치하면 npm을 따로 설치할 필요 없이 함께 준비됩니다.

---

## 4. 터미널에서 설치 확인하기

설치가 잘 되었는지는 터미널(명령어를 입력하는 프로그램)에서 확인합니다. 운영체제마다 이름이 다릅니다.

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">macOS</div>
    <div class="wda-fcard-dsc">터미널(Terminal) 앱을 사용한다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">Windows</div>
    <div class="wda-fcard-dsc">명령 프롬프트 또는 PowerShell을 사용한다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">코드 에디터 내장 터미널</div>
    <div class="wda-fcard-dsc">VS Code 같은 에디터에서도 터미널을 바로 열 수 있다.</div>
  </div>
</div>

---

## 5. node -v와 npm -v

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">node -v</div>

**• 터미널: Node.js 버전 확인하기**

```bash
node -v
```

설치된 Node.js 버전을 확인한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">npm -v</div>

**• 터미널: npm 버전 확인하기**

```bash
npm -v
```

설치된 npm 버전을 확인한다.
  </div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  버전 출력은 사람마다 다를 수 있습니다. 설치 시점이나 선택한 LTS 버전에 따라 숫자가 다르게 나오는 것이 정상이므로, 특정 숫자를 정답처럼 외울 필요는 없습니다.
</div>

**▶ 설치 전후 터미널 반응 비교**

<table class="wda-mtable">
  <tr>
    <th>상태</th>
    <th>터미널 반응</th>
  </tr>
  <tr>
    <td>설치 전</td>
    <td>명령어를 인식하지 못한다.</td>
  </tr>
  <tr>
    <td>설치 후</td>
    <td>버전 번호가 출력된다.</td>
  </tr>
</table>

---

## 6. 명령어가 인식되지 않을 때

`node -v`를 입력했는데 명령어를 찾을 수 없다는 메시지가 뜨는 경우가 있습니다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  설치 문제 해결은 기본 점검까지만 다룹니다. 아래 순서대로 확인해 보세요.
</div>

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">1. 터미널 새로 열기</div>
    <div class="wda-fcard-dsc">설치 전에 열어둔 터미널은 새 설정을 인식하지 못할 수 있다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">2. 컴퓨터 재시작</div>
    <div class="wda-fcard-dsc">터미널을 새로 열어도 안 되면 컴퓨터를 재시작해 본다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">3. 재설치</div>
    <div class="wda-fcard-dsc">위 방법으로도 안 되면 Node.js를 다시 설치해 본다.</div>
  </div>
</div>

---

## 7. 설치 후 바로 하지 않아도 되는 것

**💡 설명**

<div class="wda-callout wda-ci">
  package.json 구조, dependencies/devDependencies, npm 명령어 상세는 <strong>1-3 npm으로 패키지 관리하기</strong>에서 다룹니다. React 프로젝트를 실제로 만드는 방법은 <strong>1-6 React 프로젝트 제대로 이해하기</strong>에서 다룹니다. 지금은 설치 상태를 확인하는 것까지만 하면 충분합니다.
</div>

---

## 8. 다음 학습 흐름

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">설치 파일 준비</div><div class="wda-fnode-dsc">공식 사이트에서 LTS 다운로드</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">설치</div><div class="wda-fnode-dsc">안내에 따라 진행</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">터미널 재시작</div><div class="wda-fnode-dsc">새 터미널 열기</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">버전 확인</div><div class="wda-fnode-dsc">node -v, npm -v</div></div>
</div>

**▶ 주제별 다음 학습 문서**

<table class="wda-mtable">
  <tr>
    <th>주제</th>
    <th>자세히 다루는 문서</th>
  </tr>
  <tr>
    <td>package.json·npm 명령어 상세</td>
    <td>1-3 npm으로 패키지 관리하기</td>
  </tr>
  <tr>
    <td>React 프로젝트 생성</td>
    <td>1-6 React 프로젝트 제대로 이해하기</td>
  </tr>
</table>

---

## 9. 초보자가 자주 만나는 설치 오해

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">Current(최신) 버전이 항상 더 좋다?</div>
    <div class="wda-fcard-dsc">학습 단계에서는 안정적인 LTS 버전이 더 적합하다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">설치하면 열려 있던 터미널에서도 바로 인식된다?</div>
    <div class="wda-fcard-dsc">설치 전에 열어둔 터미널은 새로 열어야 인식되는 경우가 많다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">버전 번호가 남과 다르면 잘못 설치한 것이다?</div>
    <div class="wda-fcard-dsc">설치 시점에 따라 버전 번호가 다른 것은 정상이다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">명령어가 안 먹히면 바로 재설치부터 해야 한다?</div>
    <div class="wda-fcard-dsc">먼저 터미널을 새로 열거나 컴퓨터를 재시작해 보는 것이 순서다.</div>
  </div>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>학습 단계에서는 <strong>LTS(장기 지원)</strong> 버전을 설치한다.</li>
    <li>Node.js를 설치하면 <strong>npm도 함께</strong> 설치된다.</li>
    <li>설치 확인은 터미널에서 <code>node -v</code>, <code>npm -v</code>로 버전 번호가 출력되는지 본다.</li>
    <li>버전 번호는 <strong>사람마다 다를 수 있으며</strong>, 그 자체가 문제는 아니다.</li>
    <li>명령어가 인식되지 않으면 <strong>터미널 재시작 → 컴퓨터 재시작 → 재설치</strong> 순서로 점검한다.</li>
    <li>package.json·npm 명령어 상세는 1-3, React 프로젝트 생성은 1-6에서 다룬다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Current 버전이 항상 더 좋은 선택이다?</div>
    <div class="wda-mistake-right">정답: 학습 단계에서는 <strong>안정적인 LTS</strong> 버전이 더 적합하다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 설치 후 기존에 열어둔 터미널에서도 바로 인식된다?</div>
    <div class="wda-mistake-right">정답: 설치 전에 열어둔 터미널은 <strong>새로 열어야</strong> 인식되는 경우가 많다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: node -v 결과가 남들과 다르면 잘못 설치한 것이다?</div>
    <div class="wda-mistake-right">정답: 설치 시점에 따라 버전 번호는 <strong>다를 수 있으며</strong> 정상이다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: npm은 Node.js와 별도로 설치해야 한다?</div>
    <div class="wda-mistake-right">정답: npm은 Node.js 설치 시 <strong>자동으로 함께</strong> 설치된다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 버전 선택</div>
    <div class="wda-formula-block-body"><code>학습 단계 = LTS</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 설치 확인</div>
    <div class="wda-formula-block-body"><code>node -v / npm -v</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 문제 해결 순서</div>
    <div class="wda-formula-block-body"><code>터미널 재시작 → 재부팅 → 재설치</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · 다음 단계</div>
    <div class="wda-formula-block-body"><code>패키지 관리 1-3 → 프로젝트 생성 1-6</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">학습 단계에서는 어떤 Node.js 버전을 설치해야 하나?</div>
    <div class="wda-flip-back">안정적인 LTS(장기 지원) 버전을 설치한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">npm은 따로 설치해야 하나?</div>
    <div class="wda-flip-back">아니다. Node.js를 설치하면 npm도 함께 설치된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">설치가 잘 되었는지 확인하는 명령어는?</div>
    <div class="wda-flip-back">node -v와 npm -v로 버전 번호가 출력되는지 확인한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">node -v가 인식되지 않으면 가장 먼저 해볼 일은?</div>
    <div class="wda-flip-back">터미널을 새로 열어본다. 그래도 안 되면 컴퓨터를 재시작한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">사람마다 버전 번호가 다르게 나오는 것은 문제인가?</div>
    <div class="wda-flip-back">아니다. 설치 시점에 따라 버전 번호가 다른 것은 정상이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">package.json과 npm 명령어 상세는 어디서 다루나?</div>
    <div class="wda-flip-back">1-3 npm으로 패키지 관리하기에서 다룬다.</div>
  </div>
</div>
