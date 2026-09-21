---
title: "2-2 블록으로 나누어 생각하기"
category: "frontend"
section: "layout"
date: "2026-08-01"
status: "completed"
description: "블록 단위 사고로 화면을 나누고, 그 결과를 시맨틱 태그와 div로 조합해 반응형까지 고려한 HTML 구조로 설계하는 방법을 다룹니다."
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
  • <strong>Top-down 블록 사고</strong> — 화면을 큰 블록에서 작은 블록으로 나누며 접근하는 훈련을 합니다<br>
  • <strong>HTML 구조 설계</strong> — 블록 분석 결과를 실제 HTML 구조로 옮기는 방법을 익힙니다<br>
  • <strong>시맨틱 요소와 div 조합</strong> — 의미가 필요한 곳과 스타일링만 필요한 곳을 구분해 태그를 선택합니다<br>
  • <strong>반응형 블록 배치</strong> — 모바일과 데스크톱에서 블록 순서와 배치가 달라지는 원리를 이해합니다
</div>

---

## 1. 블록 단위로 생각한다는 것

[이전 문서](/devtools-layout/layout/2-1-analyze-webpage-structure)에서 웹페이지를 눈으로 뜯어보는 분석법을 익혔다면, 이 문서는 그 분석 결과를 실제 HTML 구조로 옮기는 "설계" 단계를 다룹니다. 분석이 "읽는 연습"이라면, 블록 단위 사고는 "쓰는 연습"이다.

화면을 상자들의 조합으로 바라보고, 그 상자를 그대로 코드로 옮기는 훈련을 한다.

블록 단위 사고란 화면을 디자인 요소가 아니라 <strong>구조 단위의 상자들</strong>로 바라보는 사고방식이다. 색이나 폰트를 보는 대신, "이 부분이 하나의 덩어리다"라는 경계선을 먼저 찾는다.

블록도 앞서 배운 구조 분석과 마찬가지로 큰 블록 → 중간 블록 → 작은 블록 순서로 좁혀 들어간다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">큰 블록</div><div class="wda-fnode-dsc">Header · Main · Footer</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">중간 블록</div><div class="wda-fnode-dsc">Section · CardGroup</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">작은 블록</div><div class="wda-fnode-dsc">이미지 · 제목 · 설명 · 버튼</div></div>
</div>

블록 단위로 먼저 나눠보고 코드를 짜기 시작하면 아래와 같은 장점이 있다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">전체 구조 파악</div><div class="wda-fcard-dsc">코드를 한 줄도 쓰기 전에 화면 전체 구조를 빠르게 이해할 수 있다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">체계적인 설계</div><div class="wda-fcard-dsc">어떤 태그를 어디에 써야 할지 미리 정리되어 설계가 체계적으로 진행된다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">코딩 속도 향상</div><div class="wda-fcard-dsc">블록이 곧 태그 단위가 되므로 코드 작성 속도가 빨라진다.</div></div>
</div>

---

## 2. 블록을 구분하는 시각적 단서

실제 화면에서 "여기까지가 한 블록이다"라는 경계는 대개 아래 네 가지 단서로 드러난다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">색상 차이</div><div class="wda-fcard-dsc">배경색이 달라지면 별도 블록일 가능성이 크다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">여백</div><div class="wda-fcard-dsc">margin·padding으로 만들어진 간격이 블록 사이 경계가 된다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">경계선</div><div class="wda-fcard-dsc">border가 있으면 블록의 경계가 명확하게 드러난다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">그림자</div><div class="wda-fcard-dsc">box-shadow는 깊이감을 주며 다른 블록과의 분리를 강조한다.</div></div>
</div>

---

## 3. 1단계: 큰 블록 식별하기

가장 먼저 화면 전체를 상단 · 중앙 · 하단 · 좌우로 크게 나눈다.

**▶ 큰 블록 위치와 내용**

<table class="wda-mtable">
<thead><tr><th>블록</th><th>위치</th><th>보통 담는 내용</th></tr></thead>
<tbody>
<tr><td>Header</td><td>최상단</td><td>로고, 메뉴, 검색창 등 고정 요소</td></tr>
<tr><td>Main</td><td>중앙</td><td>화면에서 가장 넓은 핵심 콘텐츠 영역</td></tr>
<tr><td>Footer</td><td>최하단</td><td>저작권, 링크, 연락처 등 마무리 정보</td></tr>
<tr><td>Sidebar (있을 경우)</td><td>좌우측</td><td>보조 메뉴, 프로필, 추천 콘텐츠</td></tr>
</tbody>
</table>

**실습: 큰 블록 나누기**

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1</div><div class="wda-fnode-dsc">화면을 캡처하거나<br>눈으로 확인한다</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2</div><div class="wda-fnode-dsc">3~4개 블록으로<br>나눈다</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3</div><div class="wda-fnode-dsc">각 블록에<br>이름을 붙인다</div></div>
</div>

---

## 4. 2단계: 중간 블록 세분화하기

가장 넓은 Main 블록을 다시 관찰해서, 그 안에서 반복되거나 묶여 있는 중간 블록을 찾는다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">Section</div><div class="wda-fcard-dsc">주제별 콘텐츠 그룹이다. 예: 소개, 서비스, 문의하기, 인기 콘텐츠</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">CardGroup</div><div class="wda-fcard-dsc">여러 카드 요소의 묶음이다. 예: 영화 카드 그룹, 상품 카드 그룹</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">List</div><div class="wda-fcard-dsc">항목이 세로 또는 가로로 나열된다. 예: 메뉴 리스트, 뉴스 리스트</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Form</div><div class="wda-fcard-dsc">사용자 입력을 받는 영역이다. 예: 로그인 폼, 문의 폼</div></div>
</div>

**실습: 중간 블록 세분화**

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1</div><div class="wda-fnode-dsc">Main 내부를<br>관찰한다</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2</div><div class="wda-fnode-dsc">Section으로 나누고<br>제목을 붙인다</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3</div><div class="wda-fnode-dsc">CardGroup/List/Form<br>여부를 확인한다</div></div>
</div>

---

## 5. 3단계: 작은 블록까지 좁히기

중간 블록 안에서도 반복되는 콘텐츠 하나를 골라 내부 구성 요소를 확인한다. 블록의 종류에 따라 안에 들어가는 작은 요소가 다르다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">Card 내부 요소</div><div class="wda-fcard-dsc">이미지, 텍스트, 버튼으로 구성된다. 예: 이미지/제목/설명/버튼</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Form 내부 요소</div><div class="wda-fcard-dsc">레이블, 입력 필드, 에러 메시지, 버튼으로 구성된다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Navigation 내부 요소</div><div class="wda-fcard-dsc">메뉴 항목, 링크, 아이콘으로 구성된다.</div></div>
</div>

이 단계까지 내려오면 블록 분석은 끝난다. 여기서부터는 각 요소를 어떤 태그로 옮길지를 정하는 설계 단계로 넘어간다.

---

## 6. 블록 분석을 HTML 구조로 옮기기

블록 분석이 끝났다면, 분석 결과를 그대로 HTML 태그로 옮기면 된다. 아래처럼 Header / Main > Section > CardGroup > Card / Footer로 나눈 블록 분석 결과가 있다고 하자.

**• 블록 분석 결과 트리**

```
1단계 블록 분석
Header
Main
  └ Section
      └ CardGroup
          └ Card
Footer
```

이 구조를 그대로 HTML로 옮기면 아래와 같은 코드가 된다.

**• HTML: 블록 구조를 태그로 변환**

```html
<body>
  <header>
    <h1>사이트 제목</h1>
  </header>

  <main>
    <section class="products">
      <h2>인기 상품</h2>
      <div class="card-group">
        <div class="card">
          <img src="..." alt="상품 이미지">
          <h3>상품 제목</h3>
          <p>상품 설명</p>
          <button>담기</button>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <p>사이트 정보</p>
  </footer>
</body>
```

블록 하나하나가 태그 하나 또는 태그 묶음으로 그대로 대응된다는 점이 핵심이다.

---

## 7. 시맨틱 요소와 div, 언제 무엇을 쓸까

블록을 태그로 옮길 때 매번 헷갈리는 지점이 "이 블록에 시맨틱 태그를 쓸지, div를 쓸지"이다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">시맨틱 요소</div>
    역할이 명확한 영역에 사용한다. <code>header</code>, <code>nav</code>, <code>main</code>, <code>footer</code>처럼 태그 이름만으로 그 블록의 역할이 드러나며, 접근성과 SEO에 유리하다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">div</div>
    콘텐츠를 그룹화할 때 사용한다. 의미적인 역할은 없지만 스타일링이나 레이아웃 분리가 필요한 카드 묶음, 카드 내부 래퍼 등에 적합하다.
  </div>
</div>

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>큰 블록·중간 블록처럼 "역할"이 뚜렷한 자리에는 시맨틱 요소를 우선 고려하고, 카드 내부처럼 순수하게 스타일링 묶음이 필요한 자리는 div로 채운다.</p>
</div>

---

## 8. 중첩 구조는 얼마나 깊어야 할까

블록을 태그로 옮기면 자연스럽게 부모-자식 관계가 생긴다. 이 중첩은 <strong>3~4단계 이내</strong>로 정리하는 것을 권장한다.

**• HTML: 중첩 단계 예시**

```html
<main>            <!-- 1단계 -->
  <section>       <!-- 2단계 -->
    <div class="card-group">  <!-- 3단계 -->
      <div class="card"></div> <!-- 4단계 -->
    </div>
  </section>
</main>
```

---

## 9. 설계 시 고려해야 할 4가지

블록을 태그로 옮기는 과정에서는 아래 네 가지를 항상 함께 고려해야 한다.

**▶ 설계 시 고려 항목 4가지**

<table class="wda-mtable">
<thead><tr><th>항목</th><th>설명</th></tr></thead>
<tbody>
<tr><td>접근성</td><td>시맨틱 요소를 사용하면 스크린 리더가 문서 구조를 정확히 이해할 수 있다.</td></tr>
<tr><td>SEO</td><td>검색 엔진이 문서 구조를 정확히 파악하며, main 안의 내용을 핵심 콘텐츠로 인식한다.</td></tr>
<tr><td>유지보수성</td><td>구조가 명확하고 class 네이밍 규칙이 일관되면 협업과 코드 리뷰가 쉬워진다.</td></tr>
<tr><td>성능</td><td>HTML 구조는 브라우저 렌더링에 직접 영향을 준다. 너무 깊은 중첩은 성능을 떨어뜨리며 3~4단계 중첩이 가장 무난하다.</td></tr>
</tbody>
</table>

---

## 10. 설계할 때 자주 하는 실수

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>아래 네 가지는 블록을 태그로 옮길 때 자주 발생하는 실수다.</p>
  <ul>
    <li><strong>너무 깊은 중첩</strong> — 가독성, 유지보수성, 성능이 모두 떨어진다.</li>
    <li><strong>의미 없는 div 남발</strong> — 구조 파악이 어려워지고 SEO와 접근성이 낮아진다.</li>
    <li><strong>시맨틱 요소와 div의 부적절한 조합</strong> — 태그 역할이 중복되어 구조가 혼란스러워진다.</li>
    <li><strong>class/id 네이밍 규칙 없음</strong> — 협업이나 리팩토링 시 혼선이 생긴다. BEM 같은 네이밍 컨벤션을 정해두는 것이 좋다.</li>
  </ul>
</div>

---

## 11. 반응형까지 고려한 블록 배치

블록을 나눌 때는 화면 크기에 따라 배치가 달라진다는 점도 함께 고려해야 한다. 원칙은 <strong>모바일 화면 기준으로 먼저 설계하고, 화면 폭이 넓어질수록 블록 배치 방향을 전환하는 것</strong>이다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">모바일</div>
    Header → Main → Sidebar(하단 이동 또는 숨김) → Footer 순서로 세로로 쌓인다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">데스크톱</div>
    Header → (Sidebar + Main이 가로로 나란히) → Footer 순서로 배치된다. Sidebar는 모바일에서 숨겨지거나 하단으로 이동한다.
  </div>
</div>

**• CSS: 모바일·데스크톱 배치 전환**

```css
.layout {
  display: flex;
  flex-direction: column; /* 모바일: 세로 배치 */
}

@media (min-width: 900px) {
  .layout {
    flex-direction: row; /* 데스크톱: 가로 배치 */
  }
}
```

반응형 구조를 설계할 때는 아래 항목을 함께 점검한다.

- [ ] 모바일 화면에서 세로로 쌓았을 때 순서가 자연스러운가
- [ ] Sidebar가 모바일에서 숨겨지거나 하단으로 이동하도록 처리했는가
- [ ] 데스크톱 화면에서 Sidebar와 Main이 가로로 나란히 배치되는가
- [ ] 중첩 단계가 화면 크기와 무관하게 3~4단계를 넘지 않는가

---

## 12. 실전 실습: 디자인 시안으로 구조 설계하기

디자인 시안을 전달받았을 때는 아래 네 단계를 순서대로 밟아 구조를 설계한다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1</div><div class="wda-fnode-dsc">디자인 시안<br>분석</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2</div><div class="wda-fnode-dsc">블록 단위로<br>나누기</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3</div><div class="wda-fnode-dsc">HTML 구조<br>설계</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">4</div><div class="wda-fnode-dsc">반응형<br>고려사항 적용</div></div>
</div>

**1) 디자인 시안 분석**: 전체 레이아웃 구조를 확인하고, Header/Main/Footer를 식별하고, 카드나 리스트 같은 반복 패턴을 찾고, 모바일·데스크톱 지원 여부를 확인한다.

**2) 블록 단위로 나누기**

- 큰 블록: Header(로고·메뉴·검색), Main(Hero + Section1 + Section2), Footer(저작권·링크)
- 중간 블록: Section1(카드 그룹, 카드 3개), Section2(리스트, 항목 5개)
- 작은 블록: Card(이미지·제목·설명·버튼)

**3) HTML 구조 설계**

**• HTML: 실전 시안 구조 설계**

```html
<header>
  <nav>...</nav>
</header>

<main>
  <section class="hero">...</section>

  <section class="products">
    <div class="card-group">
      <div class="card"></div>
      <div class="card"></div>
      <div class="card"></div>
    </div>
  </section>
</main>
```

**4) 반응형 고려사항**

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">모바일</div>
    카드가 1열로 쌓이고, Sidebar는 하단으로 이동하거나 숨겨진다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">데스크톱</div>
    카드가 3열로 배치되고, Sidebar는 화면 좌측에 표시된다.
  </div>
</div>

---

## 13. 복습 퀴즈

1. 블록 단위 사고의 올바른 접근 순서는 무엇일까? <strong>정답: 큰 블록 → 중간 블록 → 작은 블록</strong> 순서다.
2. 구조 설계 시 고려사항이 아닌 것은 무엇일까? <strong>정답: 디자인 트렌드</strong>는 고려사항이 아니다. 접근성, SEO, 유지보수성, 성능이 실제 고려사항이다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>블록 단위 사고는 <strong>큰 블록 → 중간 블록 → 작은 블록</strong> 순서로 진행한다.</li>
    <li>역할이 뚜렷한 자리는 <strong>시맨틱 요소</strong>, 스타일링 묶음이 필요한 자리는 <strong>div</strong>를 사용한다.</li>
    <li>중첩은 <strong>3~4단계 이내</strong>로 유지하는 것을 권장한다.</li>
    <li>모바일은 <strong>세로 배치</strong>, 데스크톱은 <strong>가로 배치</strong>가 기본 원칙이다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 구조를 잘 설계하려면 무조건 시맨틱 태그만 써야 한다?</div>
    <div class="wda-mistake-right">정답: 의미가 필요 없는 순수 스타일링 묶음에는 <strong>div</strong>를 사용하는 것이 맞다. 모든 곳에 시맨틱 태그를 억지로 끼워 맞추지 않는다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 반응형은 데스크톱 화면을 기준으로 설계한 뒤 모바일에 맞게 줄이면 된다?</div>
    <div class="wda-mistake-right">정답: <strong>모바일 화면을 기준으로 먼저 설계</strong>하고, 화면이 넓어질수록 배치를 확장하는 모바일 우선 설계가 원칙이다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 블록 사고</div>
    <div class="wda-formula-block-body"><code>큰 블록 → 중간 블록 → 작은 블록</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 태그 선택</div>
    <div class="wda-formula-block-body"><code>역할 있음 시맨틱 · 역할 없음 div</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 반응형 배치</div>
    <div class="wda-formula-block-body"><code>모바일 세로 · 데스크톱 가로</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">블록 단위 사고란?</div>
    <div class="wda-flip-back">화면을 디자인 요소가 아니라 구조 단위의 상자들로 바라보는 사고방식이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">블록을 구분하는 4가지 시각적 단서는?</div>
    <div class="wda-flip-back">색상 차이, 여백, 경계선, 그림자다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">중첩은 몇 단계 이내가 좋은가?</div>
    <div class="wda-flip-back">3~4단계 이내로 정리하는 것을 권장한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">시맨틱 요소와 div는 언제 나눠 쓰나?</div>
    <div class="wda-flip-back">역할이 명확한 곳은 시맨틱 요소, 스타일링만 필요한 곳은 div를 사용한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">반응형 설계의 기본 원칙은?</div>
    <div class="wda-flip-back">모바일 화면을 기준으로 먼저 설계하고, 화면이 넓어질수록 배치를 확장한다.</div>
  </div>
</div>
