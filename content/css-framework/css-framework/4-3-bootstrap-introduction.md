---
title: "1-3 Bootstrap 소개"
category: "frontend"
section: "css-framework"
date: "2026-08-02"
status: "completed"
description: "Bootstrap의 탄생 배경과 12컬럼 그리드 시스템, 버튼·카드·Alert 같은 주요 UI 컴포넌트 사용법을 정리합니다."
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
  • <strong>Bootstrap 정의와 배경 이해</strong> — Bootstrap이 무엇이고 어떻게 만들어졌는지 이해합니다<br>
  • <strong>12컬럼 그리드 이해</strong> — 그리드 시스템과 반응형 브레이크포인트 구조를 이해합니다<br>
  • <strong>주요 UI 요소 사용법 습득</strong> — 버튼, 카드, Alert 같은 대표 컴포넌트 사용법을 익힙니다<br>
  • <strong>공식 문서 활용법 파악</strong> — Bootstrap 문서를 학습·협업에 활용하는 방법을 파악합니다
</div>

---

## 1. Bootstrap이란 무엇인가

[이전 문서](/css-framework/css-framework/4-2-component-based-vs-utility-first)에서 Component based 방식의 개념을 봤다면, 이 문서는 그 대표 사례인 Bootstrap을 구체적으로 다룹니다. 그리드 시스템과 대표 컴포넌트 몇 가지를 직접 코드로 확인한다.

Bootstrap은 미리 완성된 UI 구성요소를 클래스 기반으로 제공하는 컴포넌트 기반 CSS 프레임워크다. HTML에 정해진 클래스를 추가하는 것만으로 버튼, 카드, 레이아웃을 빠르게 구성할 수 있다.

**▶ Bootstrap 탄생 배경**

<table class="wda-mtable">
<thead><tr><th>항목</th><th>내용</th></tr></thead>
<tbody>
<tr><td>탄생</td><td>2011년 Twitter 내부 프로젝트로 시작</td></tr>
<tr><td>개발자</td><td>Mark Otto, Jacob Thornton</td></tr>
<tr><td>목적</td><td>사내 서비스의 UI를 일관되게 관리하기 위함</td></tr>
<tr><td>특징</td><td>오픈소스로 공개된 이후 폭발적으로 확산됨</td></tr>
</tbody>
</table>

지금도 Bootstrap은 활발히 쓰이는 프레임워크다.

**▶ Bootstrap 사용 현황**

<table class="wda-mtable">
<thead><tr><th>지표</th><th>내용</th></tr></thead>
<tbody>
<tr><td>GitHub Stars</td><td>160,000개 이상</td></tr>
<tr><td>npm 다운로드</td><td>주간 500만 건 이상</td></tr>
<tr><td>주요 사용처</td><td>관리자 페이지, 대시보드, 랜딩 페이지</td></tr>
</tbody>
</table>

이 숫자가 보여주듯 Bootstrap은 "빠른 개발 + 안정성"이 강점인 프레임워크다.

---

## 2. Bootstrap 그리드 시스템

Bootstrap 레이아웃의 중심에는 12컬럼 그리드 시스템이 있다. 화면을 12칸으로 나누는 방식으로, 칸의 합은 항상 12가 되며 2, 3, 4, 6처럼 나누기 쉬운 숫자로 분할할 수 있어 반응형 레이아웃에 특히 잘 맞는다.

기본 그리드 구조는 다음과 같다.

**• HTML: 기본 그리드 구조**

```html
<div class="container">
  <div class="row">
    <div class="col-6">왼쪽 절반</div>
    <div class="col-6">오른쪽 절반</div>
  </div>
</div>
```

`container`는 전체 레이아웃의 폭을 제한하고, `row`는 Flexbox 기반으로 가로 정렬을 담당하며, `col-6`은 12칸 중 6칸, 즉 50%의 너비를 차지한다.

화면 크기별 기준(브레이크포인트)은 다음과 같이 정의되어 있다.

**▶ Bootstrap 브레이크포인트 기준**

<table class="wda-mtable">
<thead><tr><th>브레이크포인트</th><th>기준</th></tr></thead>
<tbody>
<tr><td>xs</td><td>576px 미만 (모바일)</td></tr>
<tr><td>sm</td><td>576px 이상</td></tr>
<tr><td>md</td><td>768px 이상 (태블릿)</td></tr>
<tr><td>lg</td><td>992px 이상 (데스크탑)</td></tr>
<tr><td>xl</td><td>1200px 이상</td></tr>
</tbody>
</table>

이 브레이크포인트를 컬럼 클래스와 조합하면 반응형 레이아웃을 완성할 수 있다.

**• HTML: 반응형 그리드 조합**

```html
<div class="row">
  <div class="col-12 col-md-6 col-lg-4">아이템</div>
</div>
```

`col-12`는 모바일에서 1열, `col-md-6`은 태블릿에서 2열, `col-lg-4`는 데스크탑에서 3열로 배치된다.

**💡 설명**

<div class="wda-callout wda-ci">
  <p>이 코드 어디에도 <code>@media</code> 쿼리가 직접 등장하지 않는다. 브레이크포인트별 동작이 클래스 이름 안에 이미 내장되어 있기 때문이다.</p>
</div>

---

## 3. Bootstrap 주요 UI 요소

Bootstrap은 자주 쓰는 UI를 미리 만들어 제공한다. 대표적으로 버튼, 카드, Alert 세 가지를 살펴본다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">버튼</div><div class="wda-fcard-dsc"><code>btn</code>으로 기본 형태를, <code>btn-primary</code> 같은 클래스로 색상과 hover 효과를 적용합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">카드</div><div class="wda-fcard-dsc"><code>card</code>, <code>card-body</code>, <code>card-title</code>, <code>card-text</code>로 카드 구조를 구성합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Alert</div><div class="wda-fcard-dsc"><code>alert</code>과 <code>alert-warning</code> 같은 클래스로 상황별 알림 색상을 표현합니다.</div></div>
</div>

버튼은 다음과 같이 구성한다.

**• HTML: Bootstrap 버튼**

```html
<button class="btn btn-primary">확인</button>
<button class="btn btn-success">성공</button>
<button class="btn btn-danger">삭제</button>
```

`btn`이 버튼의 기본 형태를 잡고, `btn-primary`가 주요 버튼 스타일을 적용한다. 색상, 패딩, hover 효과가 클래스 하나로 자동 적용된다.

카드는 다음과 같이 구성한다.

**• HTML: Bootstrap 카드**

```html
<div class="card">
  <div class="card-body">
    <h5 class="card-title">카드 제목</h5>
    <p class="card-text">카드 설명 텍스트입니다.</p>
  </div>
</div>
```

`card`는 카드 전체 틀, `card-body`는 카드 내용 영역, `card-title`은 제목 스타일, `card-text`는 설명 텍스트를 담당한다.

Alert는 다음과 같이 구성한다.

**• HTML: Bootstrap Alert**

```html
<div class="alert alert-warning alert-dismissible fade show">
  저장 전에 다시 한 번 확인해주세요.
</div>
```

`alert`는 알림의 기본 틀, `alert-warning`은 경고 색상, `alert-dismissible`은 닫기 버튼이 포함된 알림임을 의미한다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>Bootstrap 컴포넌트는 빠른 UI 구성에 강하지만, 정해진 디자인을 벗어나 세밀하게 커스터마이징하려면 결국 CSS를 직접 덮어써야 하는 한계가 있을 수 있다. 빠르게 통일된 화면이 필요한 관리자 페이지·대시보드에는 강점이지만, 브랜드 고유의 디자인을 세밀하게 표현해야 하는 서비스에서는 이 한계를 고려해야 한다.</p>
</div>

---

## 4. Bootstrap 공식 문서 활용하기

Bootstrap 공식 문서는 학습 곡선을 낮춰주는 중요한 자원이다.

**▶ Bootstrap 공식 문서 특징**

<table class="wda-mtable">
<thead><tr><th>특징</th><th>내용</th></tr></thead>
<tbody>
<tr><td>구조</td><td>예제 중심으로 구성된 문서</td></tr>
<tr><td>코드</td><td>그대로 복사해서 바로 사용할 수 있음</td></tr>
<tr><td>설명</td><td>클래스별 규칙이 명확하게 설명되어 있음</td></tr>
<tr><td>대상</td><td>초보자도 따라 하기 쉬운 친절한 구성</td></tr>
</tbody>
</table>

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>공식 문서를 적극 활용하면 좋은 이유는 세 가지다. 클래스 이름만 봐도 역할을 예측할 수 있고, 구성요소를 조합하는 방식이 정형화되어 있으며, 협업 시 팀원과 공통 언어로 클래스명을 사용할 수 있다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>Bootstrap은 <strong>컴포넌트 기반 CSS 프레임워크</strong>다.</li>
    <li>레이아웃의 핵심은 <strong>12컬럼 그리드</strong>와 <strong>반응형 클래스</strong>다.</li>
    <li>버튼·카드·Alert 등 <strong>완성된 UI</strong>를 클래스 조합만으로 사용할 수 있다.</li>
    <li>빠른 개발이 강점이지만, 세밀한 커스터마이징에는 <strong>CSS를 직접 덮어써야 하는 한계</strong>가 있을 수 있다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 12컬럼 그리드는 항상 12칸을 전부 채워야 한다?</div>
    <div class="wda-mistake-right">정답: 합이 12가 되도록 <strong>자유롭게 분할</strong>하면 되며, <code>col-6 col-6</code>처럼 2등분, <code>col-4 col-4 col-4</code>처럼 3등분도 가능하다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Bootstrap을 쓰면 커스터마이징 걱정이 없다?</div>
    <div class="wda-mistake-right">정답: 빠른 UI 구성에는 강하지만, 디자인을 세밀하게 바꾸려면 <strong>CSS를 직접 덮어써야</strong> 하는 경우가 있다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 정체성</div>
    <div class="wda-formula-block-body"><code>Bootstrap = 컴포넌트 기반 프레임워크</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 그리드</div>
    <div class="wda-formula-block-body"><code>12컬럼 = xs·sm·md·lg·xl</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 강점</div>
    <div class="wda-formula-block-body"><code>속도 + 안정성</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Bootstrap은 언제, 누가 만들었나?</div>
    <div class="wda-flip-back">2011년 Twitter 내부 프로젝트로 Mark Otto와 Jacob Thornton이 만들었다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">12컬럼 그리드에서 <code>col-4</code>는 몇 %인가?</div>
    <div class="wda-flip-back">12칸 중 4칸이므로 약 33%(3분의 1)의 너비를 차지한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">md 브레이크포인트의 기준은?</div>
    <div class="wda-flip-back">768px 이상, 태블릿 화면부터 적용된다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front"><code>card-body</code>는 어떤 역할을 하는가?</div>
    <div class="wda-flip-back">카드 내부의 내용 영역을 감싸며 여백을 담당한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Bootstrap이 적합한 대표 사례는?</div>
    <div class="wda-flip-back">관리자 페이지, 대시보드, 빠른 MVP처럼 속도와 안정성이 중요한 프로젝트다.</div>
  </div>
</div>
