---
title: "1-5: 의미를 담는 시맨틱 마크업"
category: "frontend"
section: "html"
date: "2026-08-01"
status: "completed"
description: "시맨틱 태그가 무엇이고 div/span과 어떻게 다른지, 접근성·SEO·유지보수 측면에서 왜 중요한지 정리합니다."
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
  • <strong>시맨틱 HTML 이해</strong> — 태그 이름이 의미를 전달하는 방식이 무엇인지 이해합니다<br>
  • <strong>div/span과 비교</strong> — 의미 없는 태그와 시맨틱 태그를 구분해 사용할 수 있습니다<br>
  • <strong>중요성 설명</strong> — 접근성·SEO·유지보수 관점에서 시맨틱 마크업의 이점을 설명합니다<br>
  • <strong>레이아웃 구성</strong> — header·nav·main·article 등으로 실전 문서 구조를 설계합니다
</div>

---

## 1. 시맨틱 HTML이란

[이전 문서](/html/html/1-4-tags-attributes-elements)에서 블록·인라인 요소를 다뤘다면, 이 문서는 "어떤 태그를 골라야 하는가"에 대한 기준을 다룹니다.

같은 화면을 만들더라도 <code>div</code>만으로 채우는 것과, 의미를 가진 태그로 채우는 것은 결과물의 품질이 크게 달라집니다.

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p><strong>시맨틱 마크업</strong>은 태그 이름 자체가 그 영역의 역할을 설명하는 방식입니다. 검색 엔진, 스크린 리더, 함께 작업하는 다른 개발자 모두가 태그 이름만 보고도 문서 구조를 이해할 수 있습니다.</p>
</div>

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">비시맨틱 (div만 사용)</div>
    <code>&lt;div class="header"&gt;&lt;/div&gt;</code><br>
    태그 이름만으로는 역할을 알 수 없어, 검색 엔진과 스크린 리더가 구조를 파악하기 어렵습니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">시맨틱 (의미 있는 태그)</div>
    <code>&lt;header&gt;&lt;/header&gt;</code><br>
    태그 이름만으로 역할이 드러나, 검색 엔진과 스크린 리더가 "머리글 영역"임을 바로 인식합니다.
  </div>
</div>

---

## 2. 시맨틱 마크업이 중요한 이유

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">접근성 향상</div><div class="wda-fcard-dsc">스크린 리더가 "탐색 영역", "주요 콘텐츠"처럼 의미 기반으로 안내할 수 있습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">SEO 향상</div><div class="wda-fcard-dsc">검색 엔진이 어디가 주요 콘텐츠이고 어디가 부가 정보인지 정확히 인식합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">유지보수 용이</div><div class="wda-fcard-dsc">구조가 명확해 시간이 지나도 전체 흐름을 빠르게 파악할 수 있습니다.</div></div>
</div>

---

## 3. 레이아웃을 만드는 시맨틱 태그

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">header</div><div class="wda-fcard-dsc">머리글 영역입니다. 로고, 제목, 소개 문구가 들어갑니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">nav</div><div class="wda-fcard-dsc">내비게이션 메뉴 영역입니다. 주요 링크 모음이 들어갑니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">main</div><div class="wda-fcard-dsc">문서의 핵심 콘텐츠 영역입니다. 문서당 한 번만 사용합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">footer</div><div class="wda-fcard-dsc">바닥글 영역입니다. 저작권, 링크 등 마무리 정보가 들어갑니다.</div></div>
</div>

**• HTML: 레이아웃 시맨틱 태그**

```html
<header>
  <h1>사이트 제목</h1>
  <nav>
    <a href="/">홈</a>
    <a href="/about">소개</a>
  </nav>
</header>
```

---

## 4. 콘텐츠를 나누는 시맨틱 태그

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">article</div>
    그 자체로 독립적인 의미가 성립하는 콘텐츠입니다. 블로그 글, 뉴스 기사처럼 따로 떼어놔도 뜻이 통하는 단위입니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">section</div>
    문서 내부를 주제별로 나누는 그룹입니다. 큰 글 안에서 소제목별로 구간을 나눌 때 사용합니다.
  </div>
</div>

**• HTML: article 콘텐츠 구분**

```html
<article>
  <h2>글 제목</h2>
  <p>본문 내용...</p>
</article>
```

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">aside</div><div class="wda-fcard-dsc">본문과 간접적으로 관련된 보조 정보입니다. 관련 글 목록, 참고 링크 등이 들어갑니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">figure / figcaption</div><div class="wda-fcard-dsc">이미지와 그 설명을 하나로 묶습니다. figcaption은 이미지의 캡션 역할을 합니다.</div></div>
</div>

---

## 5. div/span은 언제 사용할까

**▶ div·span과 시맨틱 태그 사용 시점**

<table class="wda-mtable">
<thead><tr><th>태그</th><th>의미</th><th>사용 시점</th></tr></thead>
<tbody>
<tr><td><code>div</code></td><td>없음</td><td>레이아웃을 위해 블록을 그냥 묶고 싶을 때</td></tr>
<tr><td><code>span</code></td><td>없음</td><td>문장 일부만 스타일링하고 싶을 때</td></tr>
<tr><td><code>header</code>, <code>nav</code>, <code>article</code> 등</td><td>있음</td><td>그 영역이 문서에서 어떤 역할인지 전달하고 싶을 때</td></tr>
</tbody>
</table>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>구조적인 의미가 필요하면 시맨틱 태그를, 순수하게 스타일링 목적이라면 <code>div</code>/<code>span</code>을 사용합니다. 모든 곳에 시맨틱 태그를 억지로 끼워 맞출 필요는 없습니다.</p>
</div>

---

## 6. 실전 예제: 블로그 레이아웃

실무에서 자주 쓰이는 시맨틱 레이아웃 패턴은 header → nav → main(article + aside) → footer 흐름을 따릅니다.

**• HTML: 블로그 레이아웃 실전 예제**

```html
<body>
  <header>
    <h1>기초 웹 개발</h1>
    <nav>
      <a href="/">홈</a>
      <a href="/posts">글 목록</a>
    </nav>
  </header>

  <main>
    <article>
      <h2>시맨틱 마크업이 중요한 이유</h2>
      <p>의미 있는 태그를 사용하면 접근성과 SEO가 함께 좋아집니다.</p>
    </article>

    <aside>
      <h3>관련 글</h3>
      <a href="/posts/html-basics">HTML 기초 다시 보기</a>
    </aside>
  </main>

  <footer>
    <p>기초 웹 개발 학습 자료</p>
  </footer>
</body>
```

---

## 7. 초보자 주의점

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>HTML5 이전에는 시맨틱 태그가 없어 <code>&lt;div id="header"&gt;</code>처럼 class/id로만 역할을 표현했습니다. 지금도 오래된 예제나 자료에서는 이런 방식을 볼 수 있지만, 새로 작성하는 문서에서는 가능하면 시맨틱 태그를 우선 고려하는 것이 좋습니다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>시맨틱 태그는 <strong>이름 자체가 역할을 설명</strong>하는 HTML5 태그다.</li>
    <li>레이아웃용 시맨틱 태그는 <strong>header, nav, main, footer</strong>다.</li>
    <li><strong>article</strong>은 독립적으로 의미가 성립하는 콘텐츠, <strong>section</strong>은 주제별 구간 나누기에 사용한다.</li>
    <li>의미가 필요 없는 순수 레이아웃 묶음에는 <strong>div/span</strong>을 사용한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: article과 section은 같은 용도로 아무 곳에나 바꿔 써도 된다?</div>
    <div class="wda-mistake-right">정답: <strong>article</strong>은 독립적으로 의미가 성립할 때, <strong>section</strong>은 큰 내용을 주제별로 나눌 때 사용한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: main 태그는 여러 번 사용해도 된다?</div>
    <div class="wda-mistake-right">정답: <strong>main</strong>은 문서당 <strong>한 번만</strong> 사용해야 하는 핵심 콘텐츠 영역이다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 레이아웃</div>
    <div class="wda-formula-block-body"><code>header · nav · main · footer</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 콘텐츠</div>
    <div class="wda-formula-block-body"><code>article 독립 · section 구간 나누기</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 선택 기준</div>
    <div class="wda-formula-block-body"><code>의미 있음 시맨틱 · 의미 없음 div/span</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">시맨틱 마크업이란?</div>
    <div class="wda-flip-back">태그 이름 자체가 그 영역의 역할을 설명하는 HTML 작성 방식이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">시맨틱 마크업의 3가지 이점은?</div>
    <div class="wda-flip-back">접근성 향상, SEO 향상, 유지보수 용이함이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">article과 section의 차이는?</div>
    <div class="wda-flip-back">article은 독립적 콘텐츠, section은 주제별 구간 나누기에 사용한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">main 태그는 몇 번 사용할 수 있나?</div>
    <div class="wda-flip-back">문서당 한 번만 사용한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">div/span은 언제 사용하나?</div>
    <div class="wda-flip-back">구조적인 의미가 필요 없이 순수하게 레이아웃이나 스타일링만 목적일 때 사용한다.</div>
  </div>
</div>
