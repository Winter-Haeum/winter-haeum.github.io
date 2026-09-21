---
title: "1-3: HTML 문서의 기본 구조"
category: "frontend"
section: "html"
date: "2026-08-01"
status: "completed"
description: "DOCTYPE 선언과 html·head·body의 역할, 필수 meta 태그, title·link·script의 쓰임새, 절대/상대 경로의 차이를 정리합니다."
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
  • <strong>문서 뼈대 이해</strong> — DOCTYPE, html, head, body가 각각 무엇을 담당하는지 이해합니다<br>
  • <strong>필수 meta 태그 활용</strong> — 문자 인코딩, 뷰포트, 설명을 올바르게 설정할 수 있습니다<br>
  • <strong>표준의 발전 과정 이해</strong> — HTML5와 Living Standard가 어떤 흐름으로 자리 잡았는지 설명합니다<br>
  • <strong>경로 구분</strong> — 절대 경로와 상대 경로의 차이를 구분해 사용할 수 있습니다
</div>

---

## 1. HTML 문서의 기본 뼈대

이 문서부터는 실제 HTML 코드를 다룹니다. 태그 하나하나를 배우기 전에, 모든 HTML 문서가 공통으로 갖는 뼈대와 head 영역에 들어가는 필수 정보를 먼저 정리합니다.

모든 HTML 문서는 아래와 같은 기본 구조를 따릅니다.

**• HTML: 문서 기본 구조**

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>나의 첫 웹페이지</title>
  </head>
  <body>
    <h1>안녕하세요!</h1>
    <p>HTML 문서 구조를 배웁니다.</p>
  </body>
</html>
```

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">html</div><div class="wda-fcard-dsc">문서 전체를 감싸는 최상위 요소입니다. <code>lang</code> 속성으로 문서의 언어를 지정합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">head</div><div class="wda-fcard-dsc">화면에 보이지 않는 문서 정보 영역입니다. 문자 인코딩, 제목, 외부 리소스 연결 정보가 들어갑니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">body</div><div class="wda-fcard-dsc">화면에 실제로 보이는 모든 내용이 들어갑니다. 텍스트, 이미지, 버튼 등이 여기 배치됩니다.</div></div>
</div>

---

## 2. DOCTYPE 선언의 의미

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p><code>&lt;!DOCTYPE html&gt;</code>은 "이 문서는 HTML5 표준을 따릅니다"라고 브라우저에게 알려주는 선언입니다. 문서의 맨 첫 줄에 위치해야 합니다.</p>
</div>

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">표준 모드(Standard Mode)</div>
    DOCTYPE을 올바르게 선언했을 때 적용됩니다. 최신 HTML5 기준으로 정확하게 렌더링합니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">쿼크 모드(Quirks Mode)</div>
    DOCTYPE을 생략하거나 잘못 작성했을 때 적용됩니다. 오래된 방식으로 렌더링되어 레이아웃이 예상과 다르게 보일 수 있습니다.
  </div>
</div>

---

## 3. HTML 표준은 어떻게 발전해 왔을까

HTML은 처음부터 지금 형태였던 것이 아니라, 시대마다 다른 규칙을 거쳐 지금의 모습이 되었습니다.

**▶ HTML 표준 발전 과정**

<table class="wda-mtable">
<thead><tr><th>시기</th><th>표준</th><th>특징</th></tr></thead>
<tbody>
<tr><td>1997년 무렵</td><td>HTML4</td><td>DOCTYPE 선언이 매우 길고 복잡했습니다.</td></tr>
<tr><td>2000년 무렵</td><td>XHTML</td><td>모든 태그를 소문자로 쓰고 반드시 닫아야 하는 등, 문법이 훨씬 엄격했습니다.</td></tr>
<tr><td>2014년</td><td>HTML5</td><td><code>&lt;!DOCTYPE html&gt;</code> 한 줄로 단순화되었고, 시맨틱 태그와 멀티미디어 태그가 추가되었습니다.</td></tr>
<tr><td>2019년 이후</td><td>Living Standard</td><td>버전 번호 없이 계속 업데이트되는 방식으로 관리됩니다.</td></tr>
</tbody>
</table>

**💡 설명**

<div class="wda-callout wda-ci">
  <p>지금은 더 이상 "HTML6", "HTML7" 같은 버전이 나오지 않습니다. HTML은 <strong>Living Standard(살아있는 표준)</strong> 방식으로 관리되며, 필요할 때마다 조금씩 개정되는 하나의 표준만 존재합니다.</p>
</div>

---

## 4. 필수 meta 태그 정리

**▶ 필수 meta 태그 역할**

<table class="wda-mtable">
<thead><tr><th>meta 태그</th><th>역할</th></tr></thead>
<tbody>
<tr><td><code>charset="UTF-8"</code></td><td>문자 인코딩을 지정합니다. 없으면 한글이 깨져 보일 수 있습니다.</td></tr>
<tr><td><code>name="viewport"</code></td><td>모바일 화면 너비에 맞게 렌더링하도록 지정합니다.</td></tr>
<tr><td><code>name="description"</code></td><td>검색 결과에 표시될 페이지 설명입니다.</td></tr>
</tbody>
</table>

**• HTML: 필수 meta 태그 작성**

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="HTML 문서 구조를 배우는 학습 페이지입니다." />
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><code>charset</code>은 반드시 head 영역의 가장 첫 줄 근처에 있어야 합니다. 인코딩 지정이 늦어지면 그 사이에 있는 한글이 깨진 문자로 표시될 수 있습니다.</p>
</div>

---

## 5. title, link, script의 역할

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">title</div><div class="wda-fcard-dsc">브라우저 탭과 검색 결과에 표시되는 페이지 제목입니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">link</div><div class="wda-fcard-dsc">외부 CSS 파일이나 파비콘처럼, 문서 밖의 파일을 연결할 때 사용합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">script</div><div class="wda-fcard-dsc">JavaScript 파일을 불러오거나 코드를 직접 작성할 때 사용합니다.</div></div>
</div>

**• HTML: link와 script로 외부 파일 연결**

```html
<link rel="stylesheet" href="main.css" />
<script src="main.js" defer></script>
```

**💡 설명**

<div class="wda-callout wda-ci">
  <p>script는 기본적으로 HTML 해석을 멈추고 먼저 실행됩니다. head 안에 script를 넣어야 한다면 <code>defer</code> 속성을 붙여 "HTML을 끝까지 읽은 뒤에 실행해 달라"고 지정할 수 있습니다. 초보자가 자주 겪는 화면 깜빡임·로딩 지연 문제를 줄여주는 속성입니다.</p>
</div>

---

## 6. 절대 경로 vs 상대 경로

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">절대 경로</div>
    <code>/css/style.css</code>처럼 항상 같은 위치를 가리킵니다. 파일을 어디로 옮겨도 경로가 그대로 동작하지만, 도메인이 바뀌면 수정해야 할 수 있습니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">상대 경로</div>
    <code>./css/style.css</code>처럼 현재 파일 위치를 기준으로 해석됩니다. 프로젝트를 통째로 옮겨도 경로가 잘 유지됩니다.
  </div>
</div>

**▶ 경로 표기 기호별 의미**

<table class="wda-mtable">
<thead><tr><th>표기</th><th>의미</th></tr></thead>
<tbody>
<tr><td><code>/</code></td><td>최상위(루트) 경로부터 시작</td></tr>
<tr><td><code>./</code></td><td>현재 폴더 (생략 가능)</td></tr>
<tr><td><code>../</code></td><td>한 단계 위 폴더로 이동</td></tr>
</tbody>
</table>

---

## 7. 초보자 주의점

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>DOCTYPE을 빠뜨리거나 head 안의 필수 meta 태그를 생략해도 당장은 화면이 나올 수 있습니다. 하지만 모바일 화면이 이상하게 보이거나, 한글이 깨지거나, 검색 결과에 설명이 나오지 않는 등의 문제로 이어질 수 있으므로 처음부터 습관을 들이는 것이 좋습니다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>모든 HTML 문서는 <strong>DOCTYPE → html → head → body</strong> 순서의 뼈대를 갖는다.</li>
    <li>head에는 <strong>charset, viewport, description</strong> 같은 필수 meta 태그를 넣는다.</li>
    <li>HTML은 더 이상 버전이 오르지 않고 <strong>Living Standard</strong> 방식으로 계속 개정된다.</li>
    <li>절대 경로는 <strong>항상 같은 위치</strong>를, 상대 경로는 <strong>현재 파일 기준 위치</strong>를 가리킨다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: DOCTYPE을 생략해도 화면이 똑같이 보이니 상관없다?</div>
    <div class="wda-mistake-right">정답: DOCTYPE이 없으면 <strong>쿼크 모드</strong>로 렌더링되어 레이아웃이 예상과 다르게 깨질 수 있다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: script 태그는 항상 head 안에 넣어야 한다?</div>
    <div class="wda-mistake-right">정답: 성능을 위해 보통 <strong>body 끝 부분</strong>에 배치하거나, head에 넣어야 한다면 <strong>defer</strong> 속성을 사용한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 문서 뼈대</div>
    <div class="wda-formula-block-body"><code>DOCTYPE → html → head → body</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 필수 meta</div>
    <div class="wda-formula-block-body"><code>charset · viewport · description</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 경로</div>
    <div class="wda-formula-block-body"><code>/ 절대 · ./ 현재 · ../ 상위</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">DOCTYPE 선언은 왜 필요한가?</div>
    <div class="wda-flip-back">브라우저에게 표준 모드로 렌더링하도록 알려주기 위해서다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">head와 body의 차이는?</div>
    <div class="wda-flip-back">head는 화면에 안 보이는 문서 정보, body는 화면에 실제로 보이는 내용이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">한글 깨짐을 방지하는 meta 태그는?</div>
    <div class="wda-flip-back"><code>&lt;meta charset="UTF-8"&gt;</code>이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">defer 속성은 언제 쓰나?</div>
    <div class="wda-flip-back">head 안에 script를 넣어야 할 때, HTML을 끝까지 읽은 뒤 실행하도록 지연시키기 위해 사용한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">../는 어떤 경로를 의미하나?</div>
    <div class="wda-flip-back">현재 위치에서 한 단계 위 폴더로 이동하는 상대 경로다.</div>
  </div>
</div>
