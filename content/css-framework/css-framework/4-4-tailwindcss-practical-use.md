---
title: "1-4 TailwindCSS 제대로 쓰기"
category: "frontend"
section: "css-framework"
date: "2026-08-02"
status: "completed"
description: "TailwindCSS의 유틸리티 우선 철학과 CDN 사용법, 반응형 브레이크포인트 접두어, 순수 CSS와의 차이를 정리합니다."
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
  • <strong>TailwindCSS 정의 이해</strong> — 유틸리티 우선(Utility First) 철학이 무엇인지 이해합니다<br>
  • <strong>CDN·유틸리티 클래스 활용</strong> — CDN으로 빠르게 시작하고 유틸리티 클래스를 조합하는 방법을 익힙니다<br>
  • <strong>반응형 구현 방법 습득</strong> — 모바일 퍼스트와 브레이크포인트 접두어로 반응형을 구현하는 방법을 익힙니다<br>
  • <strong>순수 CSS와의 관계 이해</strong> — TailwindCSS가 순수 CSS와 어떤 관계에 있는지, 무엇이 달라지는지 이해합니다
</div>

---

## 1. TailwindCSS 시작하기

[이전 문서](/css-framework/css-framework/4-3-bootstrap-introduction)에서 Component based 방식의 대표 사례로 Bootstrap을 봤다면, 이 문서는 Utility first 방식의 대표 사례인 TailwindCSS를 다룹니다.

CDN으로 빠르게 시작하는 방법부터 반응형 클래스, 순수 CSS와의 관계까지 순서대로 정리한다.

TailwindCSS는 유틸리티 우선(Utility First) CSS 프레임워크다. Bootstrap처럼 미리 완성된 버튼을 제공하는 대신, CSS 속성 하나당 클래스 하나를 제공해서 HTML에서 직접 스타일을 조합하게 한다.

**▶ TailwindCSS의 목적**

<table class="wda-mtable">
<thead><tr><th>목적</th><th>설명</th></tr></thead>
<tbody>
<tr><td>CSS 작성 최소화</td><td>별도 CSS 파일을 거의 작성하지 않아도 됩니다</td></tr>
<tr><td>즉각적인 결과</td><td>HTML에서 바로 스타일 결과를 확인할 수 있습니다</td></tr>
<tr><td>높은 자유도</td><td>디자인을 원하는 대로 자유롭게 조합할 수 있습니다</td></tr>
</tbody>
</table>

가장 간단하게 시작하는 방법은 CDN 스크립트를 붙이는 것이다.

**• HTML: CDN으로 TailwindCSS 시작**

```html
<script src="https://cdn.tailwindcss.com"></script>

<h1 class="text-3xl font-bold text-blue-500">
  안녕하세요
</h1>
```

`text-3xl`은 글자 크기 1.875rem(30px), `font-bold`는 글자 두께 700, `text-blue-500`은 파란 계열 글자색을 의미한다. 별도 CSS 파일 없이 HTML만으로 스타일이 적용된다.

**💡 설명**

<div class="wda-callout wda-ci">
  <p>CDN 방식은 CodePen, JSFiddle 같은 온라인 에디터에서 빠르게 시안을 만들어보거나, TailwindCSS를 처음 학습하는 단계에서 유용하다. 실제 서비스 배포 단계에서는 빌드 도구와 함께 설정하는 방식이 더 일반적이다.</p>
</div>

---

## 2. 유틸리티 클래스 다루기

Utility first 방식의 핵심은 CSS 속성을 클래스 이름으로 그대로 표현하는 것이다. 버튼 하나를 만들어보면 이 감각을 바로 확인할 수 있다.

**• HTML: 유틸리티 클래스로 버튼 만들기**

```html
<button class="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition">
  클릭하세요
</button>
```

각 클래스가 담당하는 CSS 속성은 다음과 같다.

- `px-6` — 좌우 패딩 24px
- `py-3` — 상하 패딩 12px
- `bg-blue-500` — 배경색
- `text-white` — 글자색(흰색)
- `rounded-lg` — 모서리 반경 8px
- `font-semibold` — 글자 두께 600
- `hover:bg-blue-600` — hover 시 더 진한 파랑으로 변경
- `transition` — 상태 변화에 부드러운 전환 효과 적용

클래스 이름에는 아래와 같은 일정한 패턴이 있다.

**▶ 유틸리티 클래스 이름 패턴**

<table class="wda-mtable">
<thead><tr><th>패턴</th><th>예시</th><th>의미</th></tr></thead>
<tbody>
<tr><td>속성-값</td><td><code>p-4</code></td><td>padding 16px</td></tr>
<tr><td>색상-명도</td><td><code>bg-blue-500</code></td><td>파랑 계열 중간 명도의 배경색</td></tr>
<tr><td>방향 분리</td><td><code>px-4</code>, <code>py-2</code></td><td>좌우(px)와 상하(py)를 구분해서 지정</td></tr>
<tr><td>상태 연결</td><td><code>hover:bg-blue-600</code></td><td>hover 상태에서만 적용되는 스타일</td></tr>
</tbody>
</table>

이 패턴만 익히면 문서를 찾아보지 않아도 새로운 클래스의 의미를 어느 정도 추측할 수 있게 된다.

---

## 3. 반응형 디자인 만들기

TailwindCSS의 반응형은 미디어 쿼리를 직접 작성하는 대신, 브레이크포인트 접두어를 클래스 앞에 붙이는 방식으로 동작한다.

**• HTML: 반응형 브레이크포인트 클래스**

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>카드 1</div>
  <div>카드 2</div>
  <div>카드 3</div>
</div>
```

이 코드는 화면 크기에 따라 다음과 같이 동작한다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">모바일 기본</div><div class="wda-fnode-dsc"><code>grid-cols-1</code> — 접두어 없는 기본값, 화면이 작을 때 카드 1열</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">md 이상 (768px~)</div><div class="wda-fnode-dsc"><code>md:grid-cols-2</code> — 태블릿 크기부터 카드 2열</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">lg 이상 (1024px~)</div><div class="wda-fnode-dsc"><code>lg:grid-cols-3</code> — 데스크탑 크기부터 카드 3열</div></div>
</div>

이 흐름이 TailwindCSS가 말하는 "모바일 퍼스트"다. 접두어가 없는 기본 클래스는 항상 가장 작은 화면을 기준으로 하고, `md:`, `lg:` 같은 접두어가 붙은 클래스는 해당 조건을 만족할 때만 덧붙여 적용된다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">모바일 퍼스트</div><div class="wda-fcard-dsc">접두어 없는 기본 클래스는 모바일 화면을 기준으로 합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">조건부 적용</div><div class="wda-fcard-dsc"><code>md:</code>, <code>lg:</code>는 해당 조건이 만족될 때만 적용됩니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">직관성</div><div class="wda-fcard-dsc">클래스 이름만 봐도 화면 크기별 레이아웃 변화가 그대로 보입니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">@media 불필요</div><div class="wda-fcard-dsc">미디어 쿼리를 직접 작성하지 않고도 반응형을 완성합니다.</div></div>
</div>

레이아웃 정렬도 클래스 조합만으로 구현할 수 있다.

**• HTML: 유틸리티 클래스로 정렬**

```html
<nav class="flex justify-between items-center">
  <div>로고</div>
  <div>메뉴</div>
</nav>
```

`flex`, `justify-between`, `items-center`만으로 좌우 정렬과 세로 중앙 정렬을 갖춘 네비게이션 바가 완성된다. 간격과 정렬까지 전부 클래스 하나씩으로 제어하는 셈이다.

---

## 4. 순수 CSS로 변환해서 이해하기

TailwindCSS가 실제로 어떤 CSS를 대신 작성해주는지는 순수 CSS 버전과 비교해보면 가장 잘 드러난다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">순수 CSS 버튼</div>
    별도 클래스(<code>.primary-button</code>)를 만들고, <code>padding</code>·<code>background-color</code>·<code>color</code>·<code>border-radius</code>·<code>transition</code>을 CSS 파일에 직접 정의한다. hover 효과도 <code>:hover</code> 선택자를 따로 작성해야 한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">TailwindCSS 버튼</div>
    같은 스타일을 HTML의 <code>class</code> 속성 안에서 유틸리티 클래스 조합으로 바로 표현한다. CSS 파일을 오가지 않고 마크업과 같은 위치에서 스타일을 완성한다.
  </div>
</div>

**• CSS: 순수 CSS 버튼 정의**

```css
.primary-button {
  padding: 8px 16px;
  background-color: #3b82f6;
  color: #fff;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: 0.2s;
}

.primary-button:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
}
```

**• HTML: TailwindCSS로 같은 버튼 구현**

```html
<button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:-translate-y-0.5 transition cursor-pointer">
  클릭하세요
</button>
```

두 코드는 동일한 결과를 만들지만 스타일을 작성하는 위치가 다르다. CSS 파일에 정의하던 스타일이 HTML의 클래스 조합으로 옮겨오면서, 스타일 정의와 사용이 같은 위치에서 이루어진다.

그만큼 스타일을 고치기 위해 다른 파일로 이동할 필요가 없다.

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>클래스 조합이 길어 보일 수 있지만, 이 방식 덕분에 색상·간격·타이포그래피 같은 디자인 시스템 값을 프로젝트 전체에서 빠르고 일관되게 재사용할 수 있다. TailwindCSS는 CSS 속성과 선택자 개념을 이미 알고 있는 사람이 쓸수록 진가를 발휘하는 도구다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>TailwindCSS는 <strong>유틸리티 우선(Utility First) 프레임워크</strong>다.</li>
    <li>CSS 속성을 <strong>클래스 이름으로 그대로</strong> 사용한다.</li>
    <li>반응형은 <strong>md:, lg: 같은 접두어</strong>로 조건부 적용된다.</li>
    <li>접두어 없는 기본 클래스는 항상 <strong>모바일 기준</strong>이다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: TailwindCSS는 클래스가 길어져서 단점만 있다?</div>
    <div class="wda-mistake-right">정답: 클래스가 길어지는 건 사실이지만, 그만큼 <strong>디자인 시스템 값을 빠르고 일관되게</strong> 재사용할 수 있는 장점이 있다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: <code>md:grid-cols-2</code>는 md 화면에서만 적용된다?</div>
    <div class="wda-mistake-right">정답: <strong>md 이상</strong>인 모든 화면(md, lg, xl 등)에 적용된다. 모바일 퍼스트라 조건은 "이상"으로 누적된다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 정체성</div>
    <div class="wda-formula-block-body"><code>TailwindCSS = 유틸리티 우선</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 반응형</div>
    <div class="wda-formula-block-body"><code>기본값 = 모바일 · md:/lg: = 조건부</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 변화</div>
    <div class="wda-formula-block-body"><code>CSS 파일 → HTML 클래스 조합</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">TailwindCSS의 핵심 철학은?</div>
    <div class="wda-flip-back">CSS 속성 하나당 클래스 하나를 사용하는 유틸리티 우선(Utility First) 방식이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front"><code>bg-blue-500</code>은 무엇을 의미하는가?</div>
    <div class="wda-flip-back">파랑 계열 중간 명도의 배경색을 적용하는 클래스다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">TailwindCSS 반응형은 어떻게 표현하는가?</div>
    <div class="wda-flip-back"><code>md:</code>, <code>lg:</code>처럼 브레이크포인트 접두어를 클래스 앞에 붙여 표현한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">CDN 방식은 언제 쓰기 좋은가?</div>
    <div class="wda-flip-back">CodePen 같은 온라인 에디터, 빠른 시안 제작, 학습 초기 단계에 적합하다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">순수 CSS 대비 TailwindCSS의 가장 큰 변화는?</div>
    <div class="wda-flip-back">스타일 정의가 CSS 파일에서 HTML 클래스 조합으로 옮겨와, 정의와 사용이 같은 위치에서 이루어진다.</div>
  </div>
</div>
