---
title: "1-6 React 프로젝트 제대로 이해하기"
status: "completed"
description: "첫 React 프로젝트를 Vite로 생성하고 개발 서버로 확인하는 흐름과 기본 폴더 구조, npm scripts를 정리한다."
category: "React"
section: "Basics"
tags:
  - react
  - vite
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
  • <strong>프로젝트 생성하기</strong> — Vite로 첫 React 프로젝트를 만듭니다.<br>
  • <strong>개발 서버 실행하기</strong> — 패키지를 설치하고 서버를 켜서 화면을 확인합니다.<br>
  • <strong>기본 구조 이해하기</strong> — 생성된 폴더와 파일이 어떤 역할을 하는지 파악합니다.<br>
  • <strong>scripts 맛보기</strong> — 개발용 명령과 배포용 명령의 차이를 이해합니다.
</div>

---

## 1. 첫 React 프로젝트가 필요한 순간

Node.js/npm의 역할(1-1~1-3)과 React의 기본 개념(1-4)을 살펴봤습니다. 이제 실제로 React 프로젝트를 만들고 화면을 띄워볼 차례입니다.

**💡 설명**

<div class="wda-callout wda-ci">
  Node.js/npm 명령어 상세는 <strong>1-1 ~ 1-3</strong>에서, React 개념은 <strong>1-4</strong>에서 다뤘습니다. 이 문서는 실제 프로젝트 생성과 실행 흐름에 집중합니다.
</div>

---

## 2. Vite로 프로젝트를 만드는 이유

Vite는 개발 서버 실행이 빠르고 설정이 간단해, 많은 현대 React 프로젝트에서 사용하는 도구입니다.

---

## 3. 프로젝트 생성 명령

**• 터미널: Vite로 프로젝트 생성하기**

```bash
npm create vite@latest
```

이 명령을 실행하면 몇 가지를 순서대로 선택하게 됩니다.

---

## 4. React와 JavaScript 선택하기

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">Project name</div>
    <div class="wda-fcard-dsc">프로젝트 폴더 이름을 입력한다. 예: course-dashboard</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">Framework</div>
    <div class="wda-fcard-dsc">React를 선택한다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">Variant</div>
    <div class="wda-fcard-dsc">JavaScript를 선택한다.</div>
  </div>
</div>

---

## 5. 프로젝트 폴더로 이동하기

**• 터미널: 프로젝트 폴더로 이동하기**

```bash
cd course-dashboard
```

---

## 6. package 설치하기

**• 터미널: package 설치하기**

```bash
npm install
```

**💡 설명**

<div class="wda-callout wda-ci">
  <code>npm install</code> 명령 자체는 <strong>1-3 npm으로 패키지 관리하기</strong>에서 다뤘습니다. 여기서는 프로젝트 생성 흐름 안에서 이 명령이 언제 등장하는지에 집중합니다.
</div>

---

## 7. 개발 서버 실행하기

**• 터미널: 개발 서버 실행하기**

```bash
npm run dev
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">npm install</div>
    package.json에 적힌 패키지를 다운로드한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">npm run dev</div>
    다운로드된 패키지를 이용해 개발 서버를 실행한다.
  </div>
</div>

---

## 8. localhost에서 확인하기

명령을 실행하면 터미널에 접속 주소가 출력됩니다. 그 주소를 브라우저에서 열면 화면을 확인할 수 있습니다.

**💡 설명**

<div class="wda-callout wda-ci">
  출력되는 주소의 포트 번호는 환경마다 다를 수 있습니다. 터미널에 나온 주소를 그대로 열면 되며, 특정 숫자를 정답처럼 외울 필요는 없습니다.
</div>

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">npm create vite</div><div class="wda-fnode-dsc">프로젝트 생성</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">cd</div><div class="wda-fnode-dsc">프로젝트 폴더 이동</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">npm install</div><div class="wda-fnode-dsc">패키지 설치</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">npm run dev</div><div class="wda-fnode-dsc">서버 실행</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">브라우저 확인</div><div class="wda-fnode-dsc">localhost 접속</div></div>
</div>

---

## 9. 기본 폴더 구조 맛보기

**• Vite 프로젝트 기본 폴더 구조**

```text
course-dashboard/
├── node_modules/
├── src/
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── package.json
```

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">src 폴더</div>
    <div class="wda-fcard-dsc">우리가 직접 작성하는 코드가 들어간다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">index.html</div>
    <div class="wda-fcard-dsc">React 앱이 담기는 HTML 틀이다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">package.json</div>
    <div class="wda-fcard-dsc">scripts와 설치된 패키지 목록이 기록된다.</div>
  </div>
</div>

---

## 10. main.jsx와 App.jsx

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">main.jsx</div>
    React를 HTML의 root 요소에 연결하는 진입점. 거의 수정하지 않는다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">App.jsx</div>
    실제 화면을 만드는 곳. 앞으로 계속 수정하게 된다.
  </div>
</div>

---

## 11. npm scripts 맛보기

**• 설정: package.json scripts 예시**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
```

**▶ npm scripts 명령어별 역할**

<table class="wda-mtable">
  <tr>
    <th>명령어</th>
    <th>역할</th>
  </tr>
  <tr>
    <td><code>npm run dev</code></td>
    <td>개발 서버를 실행한다.</td>
  </tr>
  <tr>
    <td><code>npm run build</code></td>
    <td>배포용 파일을 만든다.</td>
  </tr>
</table>

---

## 12. 빌드 명령 맛보기

**• 터미널: 배포용 빌드 실행하기**

```bash
npm run build
```

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">개발 서버 (dev)</div>
    코드를 수정하면 바로 반영해서 확인할 수 있다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">build</div>
    실제 서버에 올릴 수 있도록 최적화된 파일을 만든다.
  </div>
</div>

---

## 13. 초보자가 자주 만나는 설정 실수

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">cd 없이 npm install을 실행한다</div>
    <div class="wda-fcard-dsc">프로젝트 폴더 밖에서 실행하면 엉뚱한 곳에 설치된다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">npm install 없이 바로 npm run dev를 실행한다</div>
    <div class="wda-fcard-dsc">패키지가 설치되지 않아 서버가 실행되지 않는다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">개발 서버 종료 방법을 모른다</div>
    <div class="wda-fcard-dsc">터미널에서 Ctrl+C를 누르면 서버가 종료된다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">main.jsx를 계속 수정하려 한다</div>
    <div class="wda-fcard-dsc">화면 내용은 main.jsx가 아니라 App.jsx에서 수정한다.</div>
  </div>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><code>npm create vite@latest</code>로 React 프로젝트를 생성한다.</li>
    <li>생성 후에는 <strong>cd → npm install → npm run dev</strong> 순서로 진행한다.</li>
    <li>터미널에 출력된 주소로 브라우저에서 화면을 확인하며, <strong>포트 번호는 환경마다 다를 수 있다</strong>.</li>
    <li><strong>main.jsx</strong>는 React를 HTML에 연결하는 진입점, <strong>App.jsx</strong>는 실제로 계속 수정하는 화면 코드다.</li>
    <li><strong>npm run dev</strong>는 개발 서버 실행, <strong>npm run build</strong>는 배포용 파일 생성이다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: npm install 없이 npm run dev를 실행해도 된다?</div>
    <div class="wda-mistake-right">정답: 패키지가 없으면 서버가 실행되지 않으므로 <strong>npm install을 먼저</strong> 해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 화면 내용은 main.jsx에서 수정한다?</div>
    <div class="wda-mistake-right">정답: 화면 코드는 <strong>App.jsx</strong>에서 수정하며, main.jsx는 진입점 역할만 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 접속 주소의 포트 번호는 항상 똑같아야 한다?</div>
    <div class="wda-mistake-right">정답: 포트 번호는 <strong>환경마다 다를 수 있으며</strong>, 터미널에 나온 주소를 그대로 사용하면 된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: npm run build는 개발 중에도 계속 실행해야 한다?</div>
    <div class="wda-mistake-right">정답: 개발 중에는 <strong>npm run dev</strong>를 쓰고, build는 배포 직전에만 실행한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 생성</div>
    <div class="wda-formula-block-body"><code>npm create vite@latest</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 실행 순서</div>
    <div class="wda-formula-block-body"><code>cd → npm install → npm run dev</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 파일 역할</div>
    <div class="wda-formula-block-body"><code>main.jsx = 진입점, App.jsx = 화면</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · 명령 구분</div>
    <div class="wda-formula-block-body"><code>dev = 개발, build = 배포용</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">React 프로젝트를 생성하는 명령은?</div>
    <div class="wda-flip-back">npm create vite@latest다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">프로젝트 생성 후 실행 순서는?</div>
    <div class="wda-flip-back">cd(폴더 이동) → npm install(설치) → npm run dev(서버 실행) 순서다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">main.jsx와 App.jsx의 역할 차이는?</div>
    <div class="wda-flip-back">main.jsx는 React를 HTML에 연결하는 진입점, App.jsx는 실제 화면을 만드는 곳이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">개발 서버를 종료하는 방법은?</div>
    <div class="wda-flip-back">터미널에서 Ctrl+C를 누른다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">npm run dev와 npm run build의 차이는?</div>
    <div class="wda-flip-back">dev는 개발 중 실시간 확인용, build는 배포용 최적화 파일 생성이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">접속 주소의 포트 번호가 다르면 문제인가?</div>
    <div class="wda-flip-back">아니다. 환경마다 다를 수 있으므로 터미널에 나온 주소를 그대로 사용하면 된다.</div>
  </div>
</div>
