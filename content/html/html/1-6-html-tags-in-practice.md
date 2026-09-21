---
title: "1-6: 실전 HTML 태그 활용"
category: "frontend"
section: "html"
date: "2026-08-01"
status: "completed"
description: "텍스트·링크·이미지·리스트·표·폼 태그를 실제 예제와 함께 익히고, 접근성을 고려한 기본 작성 습관을 정리합니다."
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
  • <strong>텍스트 구조화</strong> — 제목·문단·강조 태그로 콘텐츠를 구조화합니다<br>
  • <strong>링크·이미지 활용</strong> — 안전한 링크와 접근성 있는 이미지를 작성합니다<br>
  • <strong>리스트·표 활용</strong> — 정보를 목록과 표로 정리합니다<br>
  • <strong>폼 작성</strong> — 사용자 입력을 받는 폼 요소를 접근성 있게 구성합니다
</div>

---

## 1. 텍스트 태그

지금까지 문서 구조와 시맨틱 태그의 개념을 다뤘다면, 이 문서는 실제로 화면을 채울 때 자주 쓰는 태그들을 모아 정리합니다.

한 번에 모든 속성을 외울 필요는 없습니다. 필요할 때 다시 찾아볼 수 있는 참고 자료로 활용해도 좋습니다.

### 제목 태그 (h1~h6)

제목 태그는 문서의 계층 구조를 나타냅니다. `h1`은 페이지에서 가장 중요한 제목이며 보통 한 페이지에 하나만 사용합니다.

**• HTML: 제목 태그 계층**

```html
<h1>가장 중요한 제목</h1>
<h2>다음 단계 제목</h2>
<h3>그 다음 단계 제목</h3>
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>제목 태그는 글자를 크게 보이려는 목적이 아니라 <strong>구조를 나타내는 목적</strong>으로 사용합니다. 단순히 크게 보이고 싶다면 CSS로 글자 크기를 조절해야 합니다. h1을 여러 번 반복해서 사용하면 검색 엔진과 스크린 리더가 문서 구조를 파악하기 어려워집니다.</p>
</div>

### 강조 태그

**▶ 강조 태그별 의미**

<table class="wda-mtable">
<thead><tr><th>태그</th><th>의미</th></tr></thead>
<tbody>
<tr><td><code>strong</code></td><td>의미상 중요한 내용</td></tr>
<tr><td><code>em</code></td><td>말의 강세, 강조하고 싶은 내용</td></tr>
<tr><td><code>mark</code></td><td>형광펜으로 표시한 듯한 강조</td></tr>
<tr><td><code>small</code></td><td>부가 정보, 작은 글씨</td></tr>
</tbody>
</table>

---

## 2. 링크 태그

**• HTML: 링크 태그 종류**

```html
<a href="https://example.com">외부 사이트로 이동</a>
<a href="/about">내부 페이지로 이동</a>
<a href="#section1">같은 페이지 안에서 이동</a>
<a href="mailto:hello@example.com">메일 보내기</a>
```

새 탭에서 외부 링크를 열 때는 보안을 위해 `rel="noopener noreferrer"`를 함께 사용합니다.

**• HTML: 안전하게 새 탭에서 열기**

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  안전하게 새 탭에서 열기
</a>
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><code>rel</code> 속성 없이 <code>target="_blank"</code>만 사용하면, 새로 열린 탭이 원래 페이지를 조작할 수 있는 보안 취약점이 생길 수 있습니다. 외부 링크를 새 탭에서 열 때는 <code>rel="noopener noreferrer"</code>를 습관처럼 붙이는 것이 안전합니다.</p>
</div>

---

## 3. 이미지 태그

**• HTML: 이미지 태그 기본**

```html
<img src="cat.jpg" alt="창가에 앉아 있는 하얀 고양이" width="300" height="200" />
```

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">alt (필수)</div><div class="wda-fcard-dsc">이미지를 설명하는 텍스트입니다. 이미지 로드에 실패했을 때 대신 표시되고, 스크린 리더가 읽어줍니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">width / height</div><div class="wda-fcard-dsc">이미지 크기를 미리 지정하면 이미지가 로드되기 전에도 자리를 잡아, 레이아웃이 갑자기 밀리는 현상을 막아줍니다.</div></div>
</div>

이미지 설명과 캡션을 함께 묶고 싶을 때는 `figure`와 `figcaption`을 사용합니다.

**• HTML: figure와 figcaption**

```html
<figure>
  <img src="cat.jpg" alt="창가에 앉아 있는 하얀 고양이" />
  <figcaption>우리 집 고양이</figcaption>
</figure>
```

---

## 4. 리스트 태그

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">ul (순서 없는 목록)</div>
    항목 순서가 의미를 갖지 않을 때 사용합니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">ol (순서 있는 목록)</div>
    단계나 순위처럼 순서가 중요할 때 사용합니다.
  </div>
</div>

**• HTML: ul과 ol 목록**

```html
<ul>
  <li>HTML</li>
  <li>CSS</li>
</ul>

<ol>
  <li>파일 열기</li>
  <li>코드 작성하기</li>
</ol>
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><code>ul</code>과 <code>ol</code> 바로 아래에는 반드시 <code>li</code>만 올 수 있습니다. <code>li</code>를 <code>div</code>로 감싸는 구조는 허용되지 않습니다.</p>
</div>

용어와 설명을 짝지어 정리할 때는 `dl`(정의 목록)을 사용합니다.

**• HTML: dl 정의 목록**

```html
<dl>
  <dt>HTML</dt>
  <dd>웹 페이지의 구조를 만드는 언어</dd>
</dl>
```

---

## 5. 표(table) 태그

**• HTML: table 기본 구조**

```html
<table>
  <thead>
    <tr>
      <th>이름</th>
      <th>역할</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>홍길동</td>
      <td>프론트엔드 개발자</td>
    </tr>
  </tbody>
</table>
```

**▶ 표 구성 태그 역할**

<table class="wda-mtable">
<thead><tr><th>태그</th><th>역할</th></tr></thead>
<tbody>
<tr><td><code>thead</code></td><td>표의 제목 행을 담는 영역</td></tr>
<tr><td><code>tbody</code></td><td>실제 데이터 행을 담는 영역</td></tr>
<tr><td><code>tr</code></td><td>표의 한 행(row)</td></tr>
<tr><td><code>th</code></td><td>제목 셀</td></tr>
<tr><td><code>td</code></td><td>데이터 셀</td></tr>
</tbody>
</table>

셀을 합칠 때는 `colspan`(가로 병합), `rowspan`(세로 병합)을 사용합니다.

**• HTML: colspan으로 셀 합치기**

```html
<tr>
  <td colspan="2">이름 (두 칸 합침)</td>
  <td>나이</td>
</tr>
```

---

## 6. 폼(form) 태그

### label과 input 연결하기

`label`의 `for` 속성과 `input`의 `id` 속성을 같은 값으로 맞추면, 라벨을 클릭했을 때 입력창이 바로 활성화됩니다.

**• HTML: label과 input 연결**

```html
<form action="/submit" method="post">
  <label for="username">이름:</label>
  <input type="text" id="username" name="username" required />

  <button type="submit">가입하기</button>
</form>
```

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>체크박스나 라디오 버튼처럼 선택형 입력은 <code>input</code>을 <code>label</code> 안에 직접 넣는 방식도 자주 사용합니다. 별도로 <code>id</code>/<code>for</code>를 맞추지 않아도 자동으로 연결됩니다.</p>
</div>

**• HTML: label로 checkbox 감싸기**

```html
<label>
  <input type="checkbox" name="agree" />
  약관에 동의합니다
</label>
```

### 자주 쓰는 input type

**▶ input type별 용도**

<table class="wda-mtable">
<thead><tr><th>type</th><th>용도</th></tr></thead>
<tbody>
<tr><td><code>text</code></td><td>한 줄 텍스트 입력</td></tr>
<tr><td><code>email</code></td><td>이메일 형식 입력</td></tr>
<tr><td><code>password</code></td><td>비밀번호 입력(화면에 숨김 표시)</td></tr>
<tr><td><code>number</code></td><td>숫자 입력</td></tr>
<tr><td><code>date</code></td><td>날짜 선택</td></tr>
<tr><td><code>checkbox</code> / <code>radio</code></td><td>다중 선택 / 단일 선택</td></tr>
<tr><td><code>file</code></td><td>파일 업로드</td></tr>
</tbody>
</table>

### select와 textarea

**• HTML: select와 textarea**

```html
<select name="city">
  <option value="seoul">서울</option>
  <option value="busan">부산</option>
</select>

<textarea name="message" rows="4" placeholder="내용을 입력하세요"></textarea>
```

### button 종류

**▶ button type별 동작**

<table class="wda-mtable">
<thead><tr><th>type</th><th>동작</th></tr></thead>
<tbody>
<tr><td><code>submit</code></td><td>폼 내용을 서버로 전송합니다.</td></tr>
<tr><td><code>reset</code></td><td>폼 입력값을 초기 상태로 되돌립니다.</td></tr>
<tr><td><code>button</code></td><td>기본 동작이 없는 일반 버튼입니다. JavaScript와 함께 사용합니다.</td></tr>
</tbody>
</table>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>form 안에서 <code>&lt;button&gt;</code>은 <code>type</code>을 생략하면 기본값이 <code>submit</code>이 됩니다. 폼 제출을 의도하지 않은 버튼이라면 반드시 <code>type="button"</code>을 명시해야 예상치 못한 제출을 막을 수 있습니다.</p>
</div>

### 입력 항목 그룹으로 묶기

**• HTML: fieldset과 legend**

```html
<fieldset>
  <legend>개인 정보</legend>
  <label for="name">이름:</label>
  <input type="text" id="name" name="name" />
</fieldset>
```

`fieldset`은 관련된 입력 항목을 하나로 묶고, `legend`는 그 그룹의 제목을 나타냅니다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>제목 태그(<code>h1</code>~<code>h6</code>)는 <strong>글자 크기가 아니라 문서 구조</strong>를 나타낸다.</li>
    <li>이미지에는 반드시 <strong>alt 속성</strong>을 넣어 접근성을 확보한다.</li>
    <li>외부 링크를 새 탭에서 열 때는 <strong>rel="noopener noreferrer"</strong>를 함께 사용한다.</li>
    <li>폼 입력에는 <strong>label의 for와 input의 id</strong>를 맞춰 연결한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: alt 속성은 없어도 화면에 지장이 없으니 생략해도 된다?</div>
    <div class="wda-mistake-right">정답: alt는 <strong>스크린 리더와 이미지 로드 실패 시 필수</strong> 정보이므로 빠뜨리면 안 된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: form 안의 button은 type을 안 써도 안전하다?</div>
    <div class="wda-mistake-right">정답: type을 생략하면 기본값이 <strong>submit</strong>이 되어, 의도치 않게 폼이 제출될 수 있다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 이미지</div>
    <div class="wda-formula-block-body"><code>img + alt는 항상 짝</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 안전한 링크</div>
    <div class="wda-formula-block-body"><code>target="_blank" + rel="noopener noreferrer"</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 폼 연결</div>
    <div class="wda-formula-block-body"><code>label for = input id</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">제목 태그의 목적은?</div>
    <div class="wda-flip-back">글자를 크게 보이기 위한 것이 아니라 문서의 계층 구조를 나타내기 위한 것이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">img 태그에서 반드시 넣어야 하는 속성은?</div>
    <div class="wda-flip-back">alt 속성이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">순서가 중요한 목록에는 어떤 태그를 쓰나?</div>
    <div class="wda-flip-back">ol(순서 있는 목록)을 사용한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">외부 링크를 새 탭에서 안전하게 열려면?</div>
    <div class="wda-flip-back">target="_blank"와 함께 rel="noopener noreferrer"를 사용한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">label과 input을 명시적으로 연결하는 방법은?</div>
    <div class="wda-flip-back">label의 for 속성 값을 input의 id 값과 동일하게 맞춘다.</div>
  </div>
</div>
