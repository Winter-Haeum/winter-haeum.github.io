---
title: "1-1 Node.js와 npm 이해하기"
status: "completed"
description: "React 개발 환경을 준비하기 전에 Node.js와 npm이 각각 어떤 역할을 하는지, 왜 필요한지를 개념 중심으로 정리한다."
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
  • <strong>Node.js 역할 이해하기</strong> — 브라우저 밖에서 JavaScript를 실행하는 환경이라는 점을 파악합니다.<br>
  • <strong>npm 역할 이해하기</strong> — 패키지를 설치하고 명령을 실행하는 도구라는 점을 파악합니다.<br>
  • <strong>React와의 관계 이해하기</strong> — React 개발 과정에서 Node.js와 npm이 왜 필요한지 이해합니다.<br>
  • <strong>다음 학습 준비하기</strong> — 설치·패키지 관리·프로젝트 생성은 이후 문서에서 다룬다는 것을 확인합니다.
</div>

---

## 1. React를 배우기 전에 Node.js를 만나는 이유

React로 만든 앱은 최종적으로 브라우저에서 실행됩니다. 하지만 코드를 작성하는 동안에는 여러 도구의 도움이 필요합니다.

수정한 코드를 바로 화면에 반영해서 보여주는 도구, 최신 문법을 브라우저가 이해할 수 있는 형태로 바꿔주는 도구, 필요한 라이브러리를 가져다주는 도구 같은 것들입니다.

이런 도구들은 대부분 JavaScript로 만들어져 있는데, 브라우저 밖에서 이 도구들을 실행하려면 **Node.js**가 필요합니다.

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">개발 서버 실행</div>
    <div class="wda-fcard-dsc">코드를 수정하면 즉시 화면에 반영해서 보여준다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">코드 변환</div>
    <div class="wda-fcard-dsc">브라우저가 바로 읽지 못하는 문법을 실행 가능한 형태로 바꾼다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">라이브러리 설치</div>
    <div class="wda-fcard-dsc">React 같은 라이브러리를 내려받아 프로젝트에서 쓸 수 있게 한다.</div>
  </div>
</div>

---

## 2. Node.js는 브라우저 밖의 JavaScript 실행 환경이다

원래 JavaScript는 크롬이나 사파리 같은 **브라우저 안에서만** 실행되는 언어였습니다. Node.js는 브라우저 없이도 컴퓨터에서 직접 JavaScript 코드를 실행할 수 있게 해주는 **실행 환경(런타임)**입니다.

**💡 설명**

<div class="wda-callout wda-ci">
  Node.js = JavaScript runtime. 문법은 똑같은 JavaScript이지만, 브라우저가 아니라 컴퓨터(터미널) 위에서 실행된다는 점이 다릅니다.
</div>

---

## 3. 브라우저 JavaScript와 Node.js 비교

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">브라우저 JavaScript</div>
    브라우저 안에서 실행되며, 화면(DOM)을 그리고 사용자와 상호작용하는 데 쓰인다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Node.js</div>
    컴퓨터에서 직접 실행되며, 이 시리즈에서는 주로 개발 도구를 실행하는 데 쓰인다.
  </div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  같은 JavaScript 문법을 쓰지만 <strong>실행되는 위치와 용도</strong>가 다릅니다. React 코드 자체는 브라우저에서 실행되고, 그 코드를 준비하는 도구는 Node.js 위에서 실행됩니다.
</div>

---

## 4. React 개발에서 Node.js가 맡는 역할

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">React 실행 환경</div>
    사용자가 최종적으로 보는 화면. React 코드가 실제로 동작하는 곳은 <strong>브라우저</strong>다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">React 개발 도구 실행 환경</div>
    개발 서버, 코드 변환기 같은 도구가 동작하는 곳. 이 도구들은 <strong>Node.js</strong> 위에서 실행된다.
  </div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  Node.js는 개발 도구 실행에 필요합니다. React 앱 자체를 실행하는 것이 아니라, 개발 중에 필요한 도구들을 동작시키는 기반입니다.
</div>

---

## 5. npm은 package manager다

**npm(Node Package Manager)**은 Node.js를 설치하면 함께 설치되는 패키지 관리 도구입니다. 필요한 패키지를 설치하고, 프로젝트에 등록된 명령을 실행하는 역할을 합니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Node.js</div>
    JavaScript 코드를 실행하는 환경.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">npm</div>
    필요한 패키지를 설치하고, 등록된 명령을 실행하는 도구.
  </div>
</div>

---

## 6. package / library / dependency 구분

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">package</div>
    <div class="wda-fcard-dsc">재사용할 수 있게 정리해둔 코드 묶음. npm으로 설치하는 단위다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">library</div>
    <div class="wda-fcard-dsc">특정 기능을 제공하는 package. React도 UI를 만드는 library다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">dependency</div>
    <div class="wda-fcard-dsc">내 프로젝트가 동작하기 위해 필요한, 설치된 package 목록.</div>
  </div>
</div>

---

## 7. npm 명령어 맛보기

**▶ 자주 쓰는 npm 명령어**

<table class="wda-mtable">
  <tr>
    <th>명령어</th>
    <th>역할</th>
  </tr>
  <tr>
    <td><code>node -v</code></td>
    <td>설치된 Node.js 버전을 확인한다.</td>
  </tr>
  <tr>
    <td><code>npm -v</code></td>
    <td>설치된 npm 버전을 확인한다.</td>
  </tr>
  <tr>
    <td><code>npm install</code></td>
    <td>프로젝트에 필요한 패키지를 설치한다.</td>
  </tr>
  <tr>
    <td><code>npm run dev</code></td>
    <td>개발 서버를 실행하는 명령을 실행한다.</td>
  </tr>
</table>

**💡 설명**

<div class="wda-callout wda-ci">
  Node.js/npm 설치 방법은 <strong>1-2 Node.js 설치하기</strong>에서, 패키지 버전·명령어 상세는 <strong>1-3 npm으로 패키지 관리하기</strong>에서 다룹니다. 이 문서에서는 각 명령의 <strong>역할</strong>만 확인합니다.
</div>

---

## 8. package.json은 프로젝트 설명서다

`package.json`은 프로젝트에 어떤 패키지가 필요한지, 어떤 명령을 실행할 수 있는지 적어둔 파일입니다.

**• 설정: package.json 기본 구조**

```json
{
  "scripts": {
    "dev": "vite"
  },
  "dependencies": {
    "react": "..."
  }
}
```

`scripts`에 등록된 `dev`는 `npm run dev`로 실행할 수 있고, `dependencies`에는 이 프로젝트가 필요로 하는 패키지 목록이 담깁니다.

**💡 설명**

<div class="wda-callout wda-ci">
  `package.json`의 자세한 구조는 <strong>1-3 npm으로 패키지 관리하기</strong>에서 다룹니다. 여기서는 "프로젝트 설명서" 역할만 기억하면 됩니다.
</div>

---

## 9. node_modules는 설치된 패키지 폴더다

`npm install`을 실행하면 `package.json`에 적힌 패키지들이 `node_modules`라는 폴더에 다운로드됩니다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  node_modules는 직접 수정하지 않습니다. npm이 자동으로 관리하는 폴더이며, 필요한 패키지는 npm 명령으로 설치·삭제합니다.
</div>

---

## 10. development server와 build 맛보기

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">development server</div>
    코드를 수정할 때마다 바로 화면에 반영해서 확인할 수 있게 해주는 서버. <code>npm run dev</code>로 실행한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">build</div>
    실제 배포를 위해 코드를 정리하고 최적화된 파일로 만드는 과정.
  </div>
</div>

---

## 11. Node.js가 React를 대신 실행하는 것은 아니다

Node.js는 서버 프로그램을 만들 때도 쓰이지만, 이 시리즈에서는 **React 개발 도구를 실행하는 용도**로만 사용합니다. React 코드 자체를 Node.js가 대신 실행해주는 것이 아니라, React 코드가 브라우저에서 잘 동작하도록 준비하는 과정에 Node.js가 쓰이는 것입니다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">React 코드 작성</div><div class="wda-fnode-dsc">.jsx 파일 작성</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">npm 명령 실행</div><div class="wda-fnode-dsc">npm run dev</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">개발 서버 실행</div><div class="wda-fnode-dsc">Node.js 위에서 동작</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">브라우저 확인</div><div class="wda-fnode-dsc">실제 화면 표시</div></div>
</div>

---

## 12. 초보자가 자주 만나는 오해

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">React는 브라우저에서 실행되니 Node.js가 필요 없다?</div>
    <div class="wda-fcard-dsc">React 코드는 브라우저에서 실행되지만, 개발 서버 실행과 코드 변환에는 Node.js가 필요하다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">node_modules는 필요하면 직접 고쳐도 된다?</div>
    <div class="wda-fcard-dsc">npm이 자동으로 관리하는 폴더이므로 직접 수정하지 않는다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">npm은 따로 설치해야 한다?</div>
    <div class="wda-fcard-dsc">Node.js를 설치하면 npm도 함께 설치된다.</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">Node.js를 배우면 곧 서버 개발을 배우는 것이다?</div>
    <div class="wda-fcard-dsc">이 시리즈에서는 Node.js를 React 개발 도구 실행 용도로만 사용한다.</div>
  </div>
</div>

---

## 13. 다음 학습 흐름

**▶ 주제별 다음 학습 문서**

<table class="wda-mtable">
  <tr>
    <th>주제</th>
    <th>자세히 다루는 문서</th>
  </tr>
  <tr>
    <td>Node.js 설치 방법</td>
    <td>1-2 Node.js 설치하기</td>
  </tr>
  <tr>
    <td>package.json·버전 관리 상세</td>
    <td>1-3 npm으로 패키지 관리하기</td>
  </tr>
  <tr>
    <td>React가 무엇인지</td>
    <td>1-4 React가 뭔가요?</td>
  </tr>
  <tr>
    <td>React 프로젝트 생성</td>
    <td>1-6 React 프로젝트 제대로 이해하기</td>
  </tr>
</table>

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1-1</div><div class="wda-fnode-dsc">Node.js·npm 역할</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">1-2 ~ 1-3</div><div class="wda-fnode-dsc">설치·패키지 관리</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">1-4 ~ 1-5</div><div class="wda-fnode-dsc">React·가상 DOM</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">1-6</div><div class="wda-fnode-dsc">프로젝트 생성·실행</div></div>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>Node.js는 <strong>브라우저 밖에서 JavaScript를 실행하는 환경(runtime)</strong>이다.</li>
    <li>npm은 Node.js 설치 시 <strong>함께 설치되는 패키지 관리자</strong>이며, 패키지 설치와 명령 실행을 담당한다.</li>
    <li>React 코드는 <strong>브라우저에서 실행</strong>되지만, 개발 서버·코드 변환 같은 도구는 <strong>Node.js 위에서 실행</strong>된다.</li>
    <li><code>package.json</code>은 프로젝트 설명서, <code>node_modules</code>는 설치된 패키지가 담기는 폴더다.</li>
    <li>설치 방법은 1-2, package.json·버전 관리 상세는 1-3, React 프로젝트 생성은 1-6에서 다룬다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: React는 브라우저에서 실행되니 Node.js가 필요 없다?</div>
    <div class="wda-mistake-right">정답: React 코드 실행은 브라우저지만, <strong>개발 서버 실행·코드 변환</strong>에는 Node.js가 필요하다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: node_modules는 필요하면 직접 수정해도 된다?</div>
    <div class="wda-mistake-right">정답: node_modules는 <strong>npm이 자동으로 관리</strong>하는 폴더이므로 직접 수정하지 않는다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: npm은 Node.js와 별도로 설치해야 한다?</div>
    <div class="wda-mistake-right">정답: npm은 Node.js를 설치하면 <strong>자동으로 함께 설치</strong>된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Node.js를 배우는 것은 곧 서버 개발을 배우는 것이다?</div>
    <div class="wda-mistake-right">정답: 이 시리즈에서는 Node.js를 <strong>React 개발 도구 실행 용도</strong>로만 사용한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · Node.js</div>
    <div class="wda-formula-block-body"><code>Node.js = 브라우저 밖 JS 실행 환경</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · npm</div>
    <div class="wda-formula-block-body"><code>npm = 패키지 설치 + 명령 실행 도구</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 역할 분리</div>
    <div class="wda-formula-block-body"><code>React 실행 = 브라우저, 도구 실행 = Node.js</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · 다음 단계</div>
    <div class="wda-formula-block-body"><code>설치 1-2 → 패키지 1-3 → 프로젝트 1-6</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Node.js는 무엇인가?</div>
    <div class="wda-flip-back">브라우저 밖에서도 JavaScript를 실행할 수 있게 해주는 실행 환경(runtime)이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">npm은 무엇인가?</div>
    <div class="wda-flip-back">Node.js 설치 시 함께 설치되는 패키지 관리자(Node Package Manager)다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">React 코드는 어디서 실행되나?</div>
    <div class="wda-flip-back">브라우저에서 실행된다. Node.js는 개발 도구 실행에 쓰인다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">package.json의 역할은?</div>
    <div class="wda-flip-back">필요한 패키지와 실행 가능한 명령(scripts)을 적어둔 프로젝트 설명서다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">node_modules는 무엇인가?</div>
    <div class="wda-flip-back">npm install로 설치된 패키지들이 저장되는 폴더이며, 직접 수정하지 않는다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">npm run dev를 실행하면 어떤 흐름으로 이어지나?</div>
    <div class="wda-flip-back">Node.js 위에서 개발 서버가 실행되고, 그 결과를 브라우저에서 확인한다.</div>
  </div>
</div>
