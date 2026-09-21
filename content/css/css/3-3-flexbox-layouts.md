---
title: "3-3 Flexbox로 다양한 레이아웃 만들기"
category: "frontend"
section: "css"
date: "2026-08-01"
status: "completed"
description: "네비게이션, 카드그리드, 중앙정렬, 홀리그레일 등 Flexbox로 만드는 8가지 실전 레이아웃 패턴과 자주 빠지는 함정을 정리합니다."
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
  • <strong>수평 네비게이션 마스터</strong> — 로고는 왼쪽, 메뉴와 유저 정보는 오른쪽에 배치하고 반응형까지 다룹니다<br>
  • <strong>반응형 카드 그리드 구현</strong> — flex-wrap과 gap을 활용해 3열→2열→1열이 자연스럽게 전환되도록 만듭니다<br>
  • <strong>완벽한 중앙 정렬 활용</strong> — justify-content와 align-items 조합으로 모달과 로딩 스피너를 정확히 중앙에 배치합니다<br>
  • <strong>홀리그레일 레이아웃 이해</strong> — 헤더·사이드바·메인·푸터 구조를 Flexbox로 설계하고 반응형 사이드바까지 처리합니다
</div>

---

## 1. 패턴 1 · 수평 네비게이션(기본)

[이전 문서](/css/css/3-2-flex-container-and-items)에서 Container·Item 속성을 하나씩 익혔다면, 이 문서에서는 그 속성들을 조합해 실무에서 실제로 쓰는 8가지 레이아웃 패턴을 만들어본다. 패턴마다 구조 설명, HTML·CSS 코드, 핵심 포인트, 주의사항을 함께 정리한다.

Flexbox로 실무에서 가장 자주 만드는 레이아웃은 아래 8가지로 정리할 수 있다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">1. 수평 네비게이션</div><div class="wda-fcard-dsc">로고 좌, 메뉴·유저 우 정렬</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">2. 반응형 카드 그리드</div><div class="wda-fcard-dsc">3열 → 2열 → 1열 자동 전환</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">3. 완벽한 중앙 정렬</div><div class="wda-fcard-dsc">모달, 로딩 스피너 정중앙 배치</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">4. 홀리그레일 레이아웃</div><div class="wda-fcard-dsc">헤더·사이드바·메인·푸터 구조</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">5. 폼 레이아웃</div><div class="wda-fcard-dsc">라벨·입력필드·버튼 그룹 배치</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">6. Sticky Footer</div><div class="wda-fcard-dsc">푸터를 항상 화면 하단에 고정</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">7. 미디어 오브젝트</div><div class="wda-fcard-dsc">이미지 + 텍스트 조합 레이아웃</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">8. 버튼 그룹</div><div class="wda-fcard-dsc">균등 분배와 우측 정렬</div></div>
</div>

로고는 왼쪽, 메뉴와 유저 정보는 오른쪽에 배치하는 가장 기본적인 형태다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">로고</div><div class="wda-fnode-dsc">왼쪽 고정</div></div>
  <div class="wda-farrow">↔</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">메뉴</div><div class="wda-fnode-dsc">가운데~오른쪽</div></div>
  <div class="wda-farrow">↔</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">유저 프로필</div><div class="wda-fnode-dsc">오른쪽 끝</div></div>
</div>

**• HTML: 수평 네비게이션 구조**

```html
<header class="navbar">
  <div class="logo">MyLogo</div>
  <nav class="nav-menu">
    <a href="#">홈</a>
    <a href="#">서비스</a>
    <a href="#">소개</a>
  </nav>
  <div class="user-profile">프로필</div>
</header>
```

**• CSS: 수평 네비게이션 스타일**

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
}

.nav-menu {
  display: flex;
  gap: 24px;
}

.nav-menu a:hover {
  color: crimson;
}
```

핵심 포인트는 다음과 같다. `justify-content: space-between`으로 로고와 나머지 영역을 좌우로 벌리고, `align-items: center`로 세로 중앙 정렬을 맞춘다.

메뉴 간격은 `.nav-menu`에 준 `gap`으로 조정하며, `height: 64px`로 네비게이션 바의 높이를 고정한다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>`.navbar`의 justify-content를 <code>center</code>로 바꾸면 로고까지 화면 중앙으로 모여버려 좌우 배치 구조가 깨진다. 또한 <code>gap</code>을 <code>.navbar</code>에 직접 주면 로고-메뉴-유저 사이에도 간격이 생겨 과도하게 벌어진다. 올바른 방법은 <strong>전체 정렬은 .navbar에 space-between, 메뉴 간격은 .nav-menu에만 gap</strong>을 주는 것이다.</p>
</div>

---

## 2. 패턴 2 · 반응형 카드 그리드

화면 너비에 따라 3열 → 2열 → 1열로 자연스럽게 전환되는 카드 그리드다.

**• HTML: 카드 그리드 구조**

```html
<div class="card-grid">
  <article class="card"><img src="a.jpg" alt="" /><h3>카드 1</h3></article>
  <article class="card"><img src="b.jpg" alt="" /><h3>카드 2</h3></article>
  <article class="card"><img src="c.jpg" alt="" /><h3>카드 3</h3></article>
</div>
```

**• CSS 스타일(반응형 3단계)**

```css
/* 데스크톱 - 3열 */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.card {
  flex: 0 0 calc(33.333% - 11px);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-4px);
}

.card img {
  width: 100%;
  object-fit: cover;
}

/* 태블릿 - 2열 */
@media (max-width: 768px) {
  .card { flex-basis: calc(50% - 8px); }
}

/* 모바일 - 1열 */
@media (max-width: 480px) {
  .card { flex-basis: 100%; }
}
```

핵심 포인트는 세 가지다. `flex-wrap: wrap`은 반응형 카드 그리드를 만들 때 필수이며, 카드 사이 간격은 margin 대신 `gap: 16px`로 지정한다.

카드 너비를 계산할 때는 반드시 gap 값을 함께 고려해서 `calc(33.333% - 11px)`처럼 뺄셈을 해줘야 한다.

---

## 3. 패턴 3 · 완벽한 중앙 정렬 — 모달과 로딩 스피너

### 모달 중앙 정렬

**• HTML: 모달 구조**

```html
<div class="modal-overlay">
  <div class="modal-content">
    <h2>안내</h2>
    <p>변경사항을 저장하시겠습니까?</p>
    <div class="button-group">
      <button>취소</button>
      <button>확인</button>
    </div>
  </div>
</div>
```

**• CSS: 모달 중앙 정렬 스타일**

```css
.modal-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}

.button-group button {
  flex: 1;
}
```

### 로딩 스피너 중앙 정렬

**• HTML: 로딩 스피너 구조**

```html
<div class="loading-container">
  <div class="spinner"></div>
  <p>불러오는 중...</p>
</div>
```

**• CSS: 로딩 스피너 중앙 정렬 스타일**

```css
.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  height: 100vh;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

핵심 포인트는 `justify-content: center`가 주축 방향 중앙 정렬을, `align-items: center`가 교차축 방향 중앙 정렬을 담당한다는 점이다.

그리고 `height: 100vh`처럼 화면 전체를 기준으로 높이를 잡아야 정확히 정중앙에 온다.

---

## 4. 패턴 4 · 홀리그레일 레이아웃

헤더, 사이드바, 메인 콘텐츠, 푸터로 구성된 전통적인 레이아웃이다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">Header</div><div class="wda-fnode-dsc">상단 고정</div></div>
  <div class="wda-farrow">↓</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">Sidebar + Content</div><div class="wda-fnode-dsc">가로 배치, Content가 남은 공간 차지</div></div>
  <div class="wda-farrow">↓</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">Footer</div><div class="wda-fnode-dsc">하단 고정</div></div>
</div>

**• HTML: 홀리그레일 레이아웃 구조**

```html
<div class="container">
  <header>Header</header>
  <div class="main-content">
    <aside class="sidebar">Sidebar</aside>
    <main class="content">Main Content</main>
  </div>
  <footer>Footer</footer>
</div>
```

**• CSS: 홀리그레일 레이아웃 스타일**

```css
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 250px;
}

.content {
  flex: 1;
}
```

핵심 포인트는 `flex-direction: column`으로 Header → Main → Footer를 세로로 쌓고, `.main-content`에 준 `flex: 1`이 남은 공간을 모두 차지하게 만드는 것이다. Sidebar는 고정 너비, Main은 나머지 공간을 채우는 구조다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><code>.container</code>의 높이는 <code>height: 100vh</code>가 아니라 <strong>min-height: 100vh</strong>를 권장한다. height로 고정하면 콘텐츠가 화면보다 길어졌을 때 내용이 잘리거나 겹칠 수 있지만, min-height는 화면보다 짧을 때는 100vh를 채우고 콘텐츠가 길어지면 자연스럽게 늘어난다.</p>
</div>

반응형 처리는 아래처럼 사이드바를 세로로 내린다.

**• CSS: 반응형 사이드바 처리**

```css
@media (max-width: 768px) {
  .main-content { flex-direction: column; }
  .sidebar { width: 100%; }
}
```

---

## 5. 패턴 5 · 폼 레이아웃

라벨, 입력 필드, 버튼 그룹으로 구성된 폼 레이아웃이다. 배치 방향에 따라 두 가지로 나뉜다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">세로 배치형</div>
    라벨이 입력창 위에 오는 기본형이다.
    <pre><code>.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.button-group button {
  flex: 1;
}</code></pre>
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">가로 배치 변형</div>
    라벨이 왼쪽, 입력창이 오른쪽에 오는 형태다.
    <pre><code>.form-group {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.form-group label { flex: 0 0 100px; }
.form-group input { flex: 1; }</code></pre>
  </div>
</div>

**• HTML: 로그인 폼 구조**

```html
<form class="login-form">
  <div class="form-group">
    <label>이메일</label>
    <input type="email" />
  </div>
  <div class="form-group">
    <label>비밀번호</label>
    <input type="password" />
  </div>
  <div class="button-group">
    <button type="button">취소</button>
    <button type="submit">로그인</button>
  </div>
</form>
```

핵심 포인트는 세로 배치형에서 `flex-direction: column` + `gap`으로 라벨과 입력창을 쌓고, 가로 배치형에서는 `label { flex: 0 0 100px }`로 라벨 너비를 고정한 뒤 `input { flex: 1 }`로 입력창이 나머지 공간을 채우게 한다는 점이다.

---

## 6. 패턴 6 · Sticky Footer

콘텐츠가 적을 때 푸터가 화면 중간에 떠 있는 문제를, 푸터를 항상 화면 하단에 붙여서 해결하는 패턴이다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">문제 상황</div>
    콘텐츠가 적으면 <code>footer</code>가 화면 하단이 아니라 콘텐츠 바로 아래, 즉 화면 중간에 떠 있게 된다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">해결 후</div>
    콘텐츠 양과 상관없이 <code>footer</code>가 항상 뷰포트 맨 아래에 붙는다.
  </div>
</div>

**• CSS: Sticky Footer 구현**

```css
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
```

핵심 포인트는 `body`에 `min-height: 100vh`를 주고, `main`에 `flex: 1`을 주어 남는 공간을 모두 채우게 만드는 것이다. 이 두 줄만으로 랜딩 페이지, 블로그, 포트폴리오 사이트에서 흔히 쓰는 Sticky Footer가 완성된다.

---

## 7. 패턴 7 · 미디어 오브젝트

이미지와 텍스트가 나란히 배치되는 구조로, 댓글이나 알림, 프로필 카드에서 자주 쓰인다.

**• CSS: 미디어 오브젝트 기본 구조**

```css
.media {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.media-image {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
}

.media-body {
  flex: 1;
}
```

이미지와 텍스트 순서를 반대로 배치하고 싶을 때는 아래처럼 한 줄만 추가하면 된다.

**• CSS: 미디어 오브젝트 순서 반전**

```css
.media.reverse {
  flex-direction: row-reverse;
}
```

핵심 포인트는 `.media-image`에 준 `flex-shrink: 0`이다. 이 속성이 없으면 텍스트가 길어질 때 이미지 영역이 함께 찌그러질 수 있다.

미디어 오브젝트는 댓글, 알림, 카드, 프로필, 채팅 UI에서 두루 사용된다.

---

## 8. 패턴 8 · 버튼 그룹

버튼 여러 개를 묶어서 배치할 때 균등 분배와 우측 정렬 두 가지 방식을 자주 쓴다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">균등 분배</div>
    <pre><code>.button-group {
  display: flex;
  gap: 12px;
}
.button-group button {
  flex: 1;
}</code></pre>
    버튼들이 같은 너비로 컨테이너 전체를 채운다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">우측 정렬</div>
    <pre><code>.button-group.right {
  justify-content: flex-end;
}
.button-group.right button {
  flex: initial;
}</code></pre>
    버튼이 원래 크기 그대로 오른쪽에 몰려 배치된다.
  </div>
</div>

핵심은 균등 분배에는 `flex: 1`을, 정렬 방향 제어에는 `justify-content`를 사용한다는 점이다. 버튼 그룹은 모달, 폼, 카드, 툴바에서 자주 쓰는 패턴이다.

---

## 9. 실전 종합 예시 — 대시보드

지금까지 배운 네비게이션, 홀리그레일, 카드 그리드, 반응형 패턴을 모두 조합하면 아래와 같은 대시보드 구조가 된다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">Navbar</div><div class="wda-fnode-dsc">space-between + gap</div></div>
  <div class="wda-farrow">↓</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">Sidebar + Main</div><div class="wda-fnode-dsc">홀리그레일 구조</div></div>
  <div class="wda-farrow">↓</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">Card Grid</div><div class="wda-fnode-dsc">Main 안에서 wrap + gap</div></div>
</div>

**• CSS: 대시보드 레이아웃 종합**

```css
/* 1. 전체 레이아웃 - 홀리그레일 */
.dashboard { display: flex; flex-direction: column; min-height: 100vh; }

/* 2. 네비게이션 */
.navbar { display: flex; justify-content: space-between; align-items: center; }

/* 3. 사이드바 + 메인 */
.main-content { display: flex; flex: 1; }
.sidebar { width: 240px; }
.content { flex: 1; }

/* 4. 카드 그리드 - 메인 안에서 */
.card-grid { display: flex; flex-wrap: wrap; gap: 16px; }
.card { flex: 0 0 calc(33.333% - 11px); }
```

사용된 패턴은 수평 네비게이션, 홀리그레일 레이아웃, 반응형 카드 그리드, 그리고 화면 크기별 반응형 처리 네 가지다.

<div class="wda-check-note">
  <ul>
    <li>대시보드처럼 복잡한 UI는 <strong>Flexbox를 중첩</strong>해서 적극적으로 사용한다.</li>
    <li>한 화면 안에서 여러 패턴을 조합하는 것이 실무에서는 자연스럽다.</li>
    <li>모바일에서는 <strong>flex-direction: column</strong>으로 전환하는 처리가 거의 필수다.</li>
  </ul>
</div>

---

## 10. 주의사항 및 함정 — Flexbox에서 자주 헷갈리는 부분

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">함정 1 · calc() 계산 오류: calc(33.333% - 16px)처럼 gap 전체 값을 그대로 빼버린다</div>
    <div class="wda-mistake-right">정답: <strong>calc(33.333% - 11px)</strong>가 3열 · gap 16px 기준의 올바른 계산이다. 공식은 <code>카드 너비 = (100% / 열 수) − (gap × (열 수 − 1) / 열 수)</code>다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">함정 2 · flex-shrink 기본값 무시: flex: 1 1 33.333%로만 지정해 카드가 찌그러진다</div>
    <div class="wda-mistake-right">정답: <strong>flex: 0 0 calc(...)</strong>처럼 flex-shrink를 0으로 고정해야 카드 너비가 의도대로 유지된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">함정 3 · flex-direction에 따른 축 혼동</div>
    <div class="wda-mistake-right">정답: row일 때 justify-content는 가로, align-items는 세로를 담당하지만, column일 때는 반대로 justify-content가 세로, align-items가 가로를 담당한다.</div>
  </div>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>로고 좌측, 메뉴·유저 우측 네비게이션은 <strong>justify-content: space-between</strong>으로 배치한다.</li>
    <li>3열 카드 그리드에서 gap이 16px이면 올바른 flex-basis는 <strong>calc(33.333% - 11px)</strong>다.</li>
    <li>모달을 화면 정중앙에 배치하려면 <strong>justify-content + align-items + 전체 화면 기준 높이(height: 100vh 또는 position: fixed; inset: 0)</strong>가 모두 필요하다.</li>
    <li>홀리그레일 레이아웃에서 메인 콘텐츠가 남은 공간을 모두 차지하려면 <strong>flex: 1</strong>을 지정한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: flex-basis만 정확히 계산하면 flex-shrink는 신경 쓰지 않아도 된다?</div>
    <div class="wda-mistake-right">정답: flex-shrink 기본값이 1이라 공간이 부족하면 계속 줄어들기 때문에, 카드 크기를 정확히 유지하려면 <strong>flex-shrink: 0</strong>을 명시해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 홀리그레일 레이아웃에서는 height: 100vh가 min-height: 100vh보다 안전하다?</div>
    <div class="wda-mistake-right">정답: <code>height: 100vh</code>는 콘텐츠가 길어지면 넘치거나 잘릴 수 있어, <strong>min-height: 100vh</strong>가 더 안전한 선택이다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 카드 너비</div>
    <div class="wda-formula-block-body"><code>(100%/열수) - gap*(열수-1)/열수</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 정중앙 배치</div>
    <div class="wda-formula-block-body"><code>justify-content + align-items + 높이 기준</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 축 고정</div>
    <div class="wda-formula-block-body"><code>row=가로가 주축 · column=세로가 주축</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">로고 좌측, 메뉴+유저 우측 네비게이션은 어떤 속성으로 배치하나?</div>
    <div class="wda-flip-back">justify-content: space-between이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">3열 카드 그리드에서 gap: 16px일 때 올바른 flex-basis는?</div>
    <div class="wda-flip-back">calc(33.333% - 11px)다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">모달을 화면 정중앙에 배치하는 데 필요한 속성 조합은?</div>
    <div class="wda-flip-back">justify-content: center + align-items: center + 전체 화면 기준 높이(height: 100vh 또는 position: fixed; inset: 0)다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">홀리그레일 레이아웃에서 메인 콘텐츠가 남은 공간을 모두 차지하게 하려면?</div>
    <div class="wda-flip-back">main(또는 .content)에 flex: 1을 지정한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Sticky Footer를 구현하는 핵심 두 줄은?</div>
    <div class="wda-flip-back">body { min-height: 100vh; display: flex; flex-direction: column; }와 main { flex: 1; }다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">미디어 오브젝트에서 이미지가 찌그러지지 않게 하는 속성은?</div>
    <div class="wda-flip-back">flex-shrink: 0이다.</div>
  </div>
</div>
