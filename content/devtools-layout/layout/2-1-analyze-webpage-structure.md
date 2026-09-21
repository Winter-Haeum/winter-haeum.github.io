---
title: "2-1 실전 웹페이지 구조 분석하기"
category: "frontend"
section: "layout"
date: "2026-08-01"
status: "completed"
description: "실전 웹페이지를 큰 영역 → 중간 영역 → 작은 요소 순서로 뜯어보며 시맨틱 요소와 반복 UI 패턴을 읽어내는 구조 분석 방법을 다룹니다."
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
  • <strong>구조 분석 접근법</strong> — 큰 영역에서 작은 요소로 단계적으로 좁혀가며 웹페이지를 해석하는 방법을 이해합니다<br>
  • <strong>시맨틱 요소 식별</strong> — header·nav·main·aside·footer를 위치와 역할 기준으로 구분하는 방법을 익힙니다<br>
  • <strong>반복 패턴 발견</strong> — 카드·리스트·그리드처럼 화면에 반복되는 UI 패턴을 찾아내는 전략을 배웁니다<br>
  • <strong>실전 적용</strong> — YouTube, Netflix 같은 실제 사이트를 DevTools로 열어 이론을 직접 확인합니다
</div>

---

## 1. 웹페이지 구조 분석이란

CSS와 DevTools 사용법을 익혔다면, 다음 단계는 그 도구로 "실제 화면을 읽어내는 눈"을 기르는 것입니다. 이 문서는 눈앞의 웹페이지를 보고 "이 화면은 어떤 구조로 짜여 있을까"를 순서대로 뜯어보는 분석 방법을 다룹니다.

코드를 작성하는 문서가 아니라, 남이 만든 화면을 읽는 관점을 훈련하는 문서입니다.

구조 분석은 단순히 화면을 구경하는 것이 아니라, 세 가지 목적을 가지고 화면을 뜯어보는 작업이다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">이해</div><div class="wda-fcard-dsc">이 화면이 어떤 태그와 구조로 이루어졌는지 원리를 파악한다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">재현</div><div class="wda-fcard-dsc">비슷한 구조를 내 손으로 직접 만들어볼 수 있는 수준까지 파악한다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">개선</div><div class="wda-fcard-dsc">더 나은 구조로 바꿀 수 있는 지점이 어디인지 찾아낸다.</div></div>
</div>

같은 화면을 보더라도 일반 사용자와 개발자는 전혀 다른 것을 본다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">일반 사용자의 시각</div>
    "예쁘다", "깔끔하다", "복잡하다"처럼 결과물의 인상만 본다. 화면 뒤에 어떤 태그와 구조가 있는지는 신경 쓰지 않는다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">개발자의 시각</div>
    "어떤 구조로 짜여 있을까", "어떤 태그를 썼을까", "어떤 패턴이 반복될까"처럼 화면 뒤의 설계를 읽는다.
  </div>
</div>

본격적으로 분석을 시작하기 전에는 아래 사항들을 먼저 확인해두는 것이 좋다.

- DevTools를 열어 Elements 패널을 미리 띄워둔다.
- 화면을 처음부터 끝까지 한 번 스크롤해서 큰 영역이 몇 개인지 감을 잡는다.
- 가능하면 모바일 버전과 데스크톱 버전을 모두 확인한다.
- "레이아웃만 볼 것인지", "특정 컴포넌트만 볼 것인지" 분석 목표를 먼저 정한다.
- 처음에는 구조가 단순한 사이트부터 연습하고, 점차 복잡한 사이트로 넘어간다.

---

## 2. 구조 분석 3단계 접근법

웹페이지는 한 번에 전체를 파악하려 하지 말고, 아래 3단계를 순서대로 밟아가며 좁혀 들어가는 것이 효율적이다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1단계</div><div class="wda-fnode-dsc">큰 영역 식별<br>Header · Main · Footer</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2단계</div><div class="wda-fnode-dsc">중간 영역 세분화<br>Section · CardGroup</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3단계</div><div class="wda-fnode-dsc">작은 요소 식별<br>썸네일 · 제목 · 버튼</div></div>
</div>

처음부터 카드 하나하나의 세부 요소를 보려고 하면 전체 구조가 눈에 들어오지 않는다. 반드시 큰 틀부터 잡고, 그 안을 점점 세밀하게 들여다보는 순서를 지킨다.

---

## 3. 1단계: 큰 영역부터 식별하기

가장 먼저 찾아야 하는 것은 화면을 채우는 큼직한 영역들이다. 대표적으로 아래 네 가지가 있다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">Header</div><div class="wda-fcard-dsc">화면 상단 영역이다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Main</div><div class="wda-fcard-dsc">화면 중앙의 핵심 콘텐츠 영역이다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Footer</div><div class="wda-fcard-dsc">화면 하단 영역이다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Sidebar</div><div class="wda-fcard-dsc">좌우측에 있는 보조 영역이다. 없는 사이트도 많다.</div></div>
</div>

실제 서비스에 이 틀을 대입해보면 사이트마다 어떤 영역을 채택했는지가 다르다는 것을 알 수 있다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">YouTube</div>
    Header(검색창·로고) + Sidebar(메뉴) + Main(영상 목록)으로 구성된다. Footer 없이도 화면이 성립한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Netflix</div>
    Header(로고·메뉴) + Main(작품 목록) + Footer(사이트 정보)로 구성된다. Sidebar 없이 상하 구조만으로 화면이 성립한다.
  </div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  <p>같은 "동영상 서비스"라도 큰 영역 구성은 서비스마다 다르다. 처음부터 정답을 맞히려 하지 말고, 눈에 보이는 큰 상자가 몇 개인지부터 세어보는 연습을 한다.</p>
</div>

---

## 4. 2단계: 중간 영역으로 세분화하기

큰 영역을 잡았다면, 그중에서도 콘텐츠가 가장 많은 Main 영역을 다시 쪼갤 차례다. Main 내부는 보통 아래 네 가지 형태의 묶음으로 나뉜다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">Section</div><div class="wda-fcard-dsc">주제별 콘텐츠 묶음이다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Article</div><div class="wda-fcard-dsc">독립적으로 의미가 통하는 콘텐츠다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">CardGroup</div><div class="wda-fcard-dsc">카드 요소들의 묶음이다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">List</div><div class="wda-fcard-dsc">연속된 항목들의 묶음이다.</div></div>
</div>

Netflix의 메인 화면을 예로 들면, Main 내부가 아래처럼 순서대로 이어진 중간 영역들로 나뉜다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">Hero Banner</div><div class="wda-fnode-dsc">대표 작품 큰 배너</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">Row 1</div><div class="wda-fnode-dsc">인기 콘텐츠 카드그룹</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">Row 2</div><div class="wda-fnode-dsc">장르별 카드그룹</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">Row 3</div><div class="wda-fnode-dsc">추천 콘텐츠 카드그룹</div></div>
</div>

---

## 5. 3단계: 작은 요소까지 좁혀보기

중간 영역까지 나눴다면, 이제 그 안의 콘텐츠 하나를 골라 내부 구성 요소를 뜯어본다. 예를 들어 Netflix의 카드 하나를 열어보면 아래처럼 작은 요소들이 조합되어 있다.

**• HTML: 카드 내부 구성 요소**

```html
<div class="card">
  <img class="card-thumbnail" src="..." alt="작품 썸네일">
  <h3 class="card-title">작품 제목</h3>
  <span class="card-rating">★ 4.5</span>
  <p class="card-description">작품 한 줄 설명</p>
</div>
```

썸네일 · 제목 · 평점 · 설명처럼 카드 하나를 이루는 최소 단위까지 내려오면, 3단계 접근법이 끝난다. 이 시점부터는 더 쪼갤 필요 없이 "이 카드를 어떻게 코드로 옮길지"만 생각하면 된다.

---

## 6. 시맨틱 요소 식별 전략

큰 영역과 중간 영역을 나눌 때 실제 태그가 무엇인지 확인하려면, 시맨틱 요소 다섯 가지의 위치와 역할을 알아둘 필요가 있다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">header</div><div class="wda-fcard-dsc">화면 상단, 로고·검색창·사용자 메뉴</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">nav</div><div class="wda-fcard-dsc">header 내부 또는 sidebar, 이동용 링크 메뉴</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">main</div><div class="wda-fcard-dsc">화면 중앙, 문서당 1개뿐인 핵심 콘텐츠</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">aside</div><div class="wda-fcard-dsc">좌우측 또는 본문 내부, 참고용 보조 정보</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">footer</div><div class="wda-fcard-dsc">화면 맨 하단, 저작권·연락처·사이트 정보</div></div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>header 안에는 nav가 들어가는 경우가 많아 "header = nav"라고 착각하기 쉽다. header는 상단 영역 전체를 감싸는 태그이고, nav는 그 안에서 이동 링크만 모아둔 태그이므로 서로 다른 역할이다.</p>
</div>

각 요소를 실제로 구분할 때는 아래 표를 기준으로 확인한다.

**▶ 시맨틱 요소 식별 기준**

<table class="wda-mtable">
<thead><tr><th>요소</th><th>위치</th><th>특징</th><th>식별 포인트</th><th>대표 구성 요소</th></tr></thead>
<tbody>
<tr><td><code>header</code></td><td>화면 상단</td><td>로고, 검색창, 사용자 메뉴 포함</td><td>스크롤을 올렸을 때 항상 상단에 고정되어 있는지 확인한다</td><td>로고, 검색창, 메뉴 버튼</td></tr>
<tr><td><code>nav</code></td><td>header 내부 또는 sidebar</td><td>다른 페이지·기능으로 이동하는 링크 메뉴</td><td>클릭 시 페이지 이동이 있으면 nav, 버튼처럼 보여도 이동이 없으면 nav가 아니다</td><td>메뉴 링크 목록</td></tr>
<tr><td><code>main</code></td><td>화면 중앙</td><td>페이지의 핵심 콘텐츠</td><td>문서당 1개만 존재해야 하며, 내부에 header나 footer가 들어가면 구조가 잘못된 것이다</td><td>본문 콘텐츠, 핵심 섹션</td></tr>
<tr><td><code>aside</code></td><td>좌우측 또는 main 내부</td><td>본문과 직접 연관은 없지만 참고할 만한 정보</td><td>없어도 본문의 의미가 성립하는 정보인지 확인한다</td><td>광고, 추천 콘텐츠, 관련 링크</td></tr>
<tr><td><code>footer</code></td><td>화면 맨 하단</td><td>저작권, 연락처, 사이트 정보</td><td>끝까지 스크롤했을 때 마지막에 나오는 영역이다</td><td>저작권 문구, 고객센터, 이용약관 링크</td></tr>
</tbody>
</table>

이 다섯 가지를 실전에서 확인하는 순서는 항상 아래와 같다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1</div><div class="wda-fnode-dsc">화면 위치로<br>먼저 추측한다</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2</div><div class="wda-fnode-dsc">DevTools에서<br>실제 태그명을 확인한다</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3</div><div class="wda-fnode-dsc">역할이 올바른지<br>최종 검증한다</div></div>
</div>

---

## 7. 반복되는 UI 패턴 찾아내기

화면을 구조 단위로 보기 시작하면, 똑같은 형태가 반복해서 등장하는 지점이 눈에 들어온다. 대표적인 반복 패턴은 세 가지다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">카드 패턴</div><div class="wda-fcard-dsc">동일한 크기의 이미지+제목+설명 구조가 반복된다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">리스트 패턴</div><div class="wda-fcard-dsc">항목이 세로 또는 가로로 나열된다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">그리드 패턴</div><div class="wda-fcard-dsc">행과 열로 이루어진 일정한 규칙의 배치다.</div></div>
</div>

세 패턴을 실제로 발견하는 방법과 예시는 아래와 같다.

**▶ 반복 UI 패턴 발견 방법**

<table class="wda-mtable">
<thead><tr><th>패턴</th><th>구성</th><th>발견 방법</th><th>대표 예시</th></tr></thead>
<tbody>
<tr><td>카드 패턴</td><td>동일 크기 + 이미지 + 제목 + 설명 구조 반복</td><td>같은 class명이 반복되는지 확인한다</td><td>Netflix 영화 카드, Airbnb 숙소 카드</td></tr>
<tr><td>리스트 패턴</td><td>항목이 세로 또는 가로로 나열</td><td><code>ul</code>/<code>ol</code> 또는 div 그룹 안에 동일한 형태의 항목이 반복되는지 확인한다</td><td>YouTube 사이드바 메뉴, 뉴스 기사 리스트</td></tr>
<tr><td>그리드 패턴</td><td>행과 열로 이루어진 일정한 규칙의 배치</td><td>CSS Grid나 Flexbox가 적용된 클래스인지 확인한다</td><td>쇼핑몰 상품 그리드, 포트폴리오 갤러리</td></tr>
</tbody>
</table>

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>반복 패턴을 찾아내면 "카드 하나만 정확히 분석해도 나머지는 같은 구조"라는 사실을 알 수 있다. 화면 전체를 하나하나 다 뜯어볼 필요 없이, 반복 단위 하나만 집중해서 분석하는 것이 효율적이다.</p>
</div>

---

## 8. 복습 퀴즈

1. 구조 분석 3단계 접근법의 올바른 순서는 무엇일까? <strong>정답: 큰 영역 식별 → 중간 영역 세분화 → 작은 요소 식별</strong> 순서다.
2. 시맨틱 요소 식별 전략으로 옳지 않은 것은 무엇일까? <strong>정답: 모든 요소를 div로 가정하고 분석하는 것</strong>이다. 시맨틱 요소는 위치와 역할을 함께 확인해 header/nav/main/aside/footer를 구분해야 한다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>구조 분석은 <strong>큰 영역 → 중간 영역 → 작은 요소</strong> 순서로 진행한다.</li>
    <li>시맨틱 요소는 <strong>위치와 역할</strong> 두 가지 기준으로 함께 판단한다.</li>
    <li><strong>main</strong>은 문서당 <strong>1개만</strong> 존재해야 하는 핵심 콘텐츠 영역이다.</li>
    <li>반복되는 UI는 <strong>카드 · 리스트 · 그리드</strong> 세 가지 패턴 중 하나로 분류할 수 있다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: header 안에 nav가 있으니 header와 nav는 같은 역할이다?</div>
    <div class="wda-mistake-right">정답: <strong>header</strong>는 상단 영역 전체를 감싸는 태그이고, <strong>nav</strong>는 그 안에서 이동 링크만 모아둔 태그로 서로 다른 역할이다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: aside는 항상 화면 좌우측에만 위치한다?</div>
    <div class="wda-mistake-right">정답: aside는 위치가 아니라 <strong>"본문과 직접 연관이 없어도 참고할 만한 정보"</strong>라는 역할로 판단하며, main 내부에도 들어갈 수 있다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 3단계 접근법</div>
    <div class="wda-formula-block-body"><code>큰 영역 → 중간 영역 → 작은 요소</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 식별 순서</div>
    <div class="wda-formula-block-body"><code>위치 추측 → 태그 확인 → 역할 검증</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 반복 패턴</div>
    <div class="wda-formula-block-body"><code>카드 · 리스트 · 그리드</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">구조 분석 3단계는?</div>
    <div class="wda-flip-back">큰 영역 식별 → 중간 영역 세분화 → 작은 요소 식별 순서로 진행한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">main 태그는 몇 개까지 쓸 수 있나?</div>
    <div class="wda-flip-back">문서당 1개만 사용할 수 있는 핵심 콘텐츠 영역이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">header와 nav는 왜 다른가?</div>
    <div class="wda-flip-back">header는 상단 영역 전체, nav는 그 안의 이동 링크 모음이라 역할이 다르다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">aside를 구분하는 기준은?</div>
    <div class="wda-flip-back">위치가 아니라 "없어도 본문이 성립하는 보조 정보인가"라는 역할로 판단한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">대표적인 반복 UI 패턴 3가지는?</div>
    <div class="wda-flip-back">카드 패턴, 리스트 패턴, 그리드 패턴이다.</div>
  </div>
</div>
