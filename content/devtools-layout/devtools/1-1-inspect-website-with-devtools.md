---
title: "1-1 DevTools로 웹사이트 들여다보기"
category: "frontend"
section: "devtools"
date: "2026-08-01"
status: "completed"
description: "브라우저 DevTools를 열고 Elements, Styles, Computed, Console 패널로 HTML 구조와 CSS를 실시간으로 확인·수정하는 방법을 정리합니다."
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
  • <strong>DevTools 열기</strong> — F12, Cmd+Option+I, 우클릭 → 검사 등 3가지 방법으로 개발자 도구를 열 수 있습니다<br>
  • <strong>Elements 패널</strong> — HTML 구조를 트리로 파악하고, 검사 모드(Ctrl/Cmd+Shift+C)로 화면의 요소를 바로 선택할 수 있습니다<br>
  • <strong>Styles 패널</strong> — 적용된 CSS를 확인하고 값을 실시간으로 수정하며 우선순위를 읽을 수 있습니다<br>
  • <strong>Console 패널</strong> — 에러와 경고 메시지를 확인하고 원인이 되는 코드 위치를 추적할 수 있습니다
</div>

---

## 1. DevTools란 무엇인가

DevTools는 이미 만들어진 웹사이트를 뜯어보며 배우는 가장 좋은 도구입니다. 이 문서에서는 DevTools를 여는 방법부터 Elements·Styles·Computed·Console 패널의 핵심 기능까지, 화면을 보면서 문제를 찾아가는 흐름에 맞춰 순서대로 정리합니다.

DevTools(Developer Tools)는 브라우저에 기본으로 내장된 웹 개발 도구 모음이다. 별도의 프로그램을 설치하지 않아도 지금 보고 있는 페이지의 HTML, CSS, JavaScript를 그 자리에서 확인하고, 수정하고, 오류를 추적할 수 있다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">HTML 구조 학습</div><div class="wda-fcard-dsc">잘 만들어진 사이트가 어떤 태그로 구성됐는지 직접 눈으로 확인할 수 있다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">CSS 즉석 테스트</div><div class="wda-fcard-dsc">파일을 고치지 않고도 값을 바꿔가며 원하는 스타일을 미리 실험할 수 있다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">콘솔 에러 추적</div><div class="wda-fcard-dsc">JavaScript가 왜 실패했는지 에러 메시지와 코드 위치를 바로 확인할 수 있다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">잘 만든 사이트 분석</div><div class="wda-fcard-dsc">마음에 드는 레이아웃이나 애니메이션의 구현 방식을 참고할 수 있다.</div></div>
</div>

이런 이유로 DevTools는 프론트엔드 개발자뿐 아니라 웹 디자이너, UI/UX 디자이너, 그리고 이제 막 HTML·CSS를 배우기 시작한 학습자 모두에게 필요한 도구다.

---

## 2. DevTools 여는 3가지 방법

**▶ DevTools 실행 방법**

<table class="wda-mtable">
<thead><tr><th>방법</th><th>설명</th></tr></thead>
<tbody>
<tr><td>키보드 단축키 (Windows/Linux)</td><td><code>F12</code> 또는 <code>Ctrl+Shift+I</code></td></tr>
<tr><td>키보드 단축키 (Mac)</td><td><code>Cmd+Option+I</code></td></tr>
<tr><td>우클릭 → 검사</td><td>확인하고 싶은 요소 위에서 마우스 우클릭 후 "검사(Inspect)" 클릭</td></tr>
<tr><td>브라우저 메뉴</td><td>Chrome 기준 더보기(⋮) → 도구 더보기 → 개발자 도구</td></tr>
</tbody>
</table>

세 방법 모두 결과는 같다. 다만 우클릭 → 검사로 열면 클릭한 바로 그 요소가 Elements 패널에서 자동으로 선택된 상태로 열리기 때문에, 특정 요소를 바로 확인하고 싶을 때 가장 빠르다.

---

## 3. Elements 패널: HTML 구조 확인하기

Elements 패널은 현재 페이지의 HTML을 트리 형태로 보여준다. 페이지에서 JavaScript로 요소가 추가되거나 삭제되면 이 트리도 실시간으로 함께 갱신된다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">태그 펼치기/접기</div><div class="wda-fcard-dsc">화살표를 눌러 하위 태그를 접거나 펼쳐서 원하는 부분만 볼 수 있다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">태그 검색</div><div class="wda-fcard-dsc"><code>Ctrl+F</code>로 특정 태그나 텍스트를 트리 안에서 바로 찾을 수 있다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">속성 확인</div><div class="wda-fcard-dsc">class, id, href 같은 속성값을 태그 옆에서 그대로 확인할 수 있다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">화면 하이라이트</div><div class="wda-fcard-dsc">트리에서 태그 위에 마우스를 올리면 실제 화면의 해당 영역이 파란색으로 강조된다.</div></div>
</div>

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>처음에는 눈에 보이는 영역(버튼, 카드, 헤더 등) 위에 마우스를 올려가며 어떤 태그가 하이라이트되는지 먼저 익히는 것이 좋다. 태그 이름을 외우기보다 "이 화면은 이런 구조로 만들어져 있구나"를 감으로 익히는 연습이다.</p>
</div>

---

## 4. 검사 모드(Inspect Mode)로 화면에서 바로 찾기

트리를 스크롤하며 원하는 요소를 찾는 대신, 화면에서 바로 원하는 요소를 클릭해 찾는 방법도 있다. 이를 검사 모드라고 부른다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">모드 켜기</div><div class="wda-fnode-dsc"><code>Ctrl+Shift+C</code> (Mac: <code>Cmd+Shift+C</code>) 또는 패널 왼쪽 위 화살표 아이콘 클릭</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">화면 위 이동</div><div class="wda-fnode-dsc">마우스를 화면 위로 옮기면 지나가는 요소마다 파란색으로 미리 강조된다</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">클릭해서 선택</div><div class="wda-fnode-dsc">원하는 요소를 클릭하면 Elements 패널의 해당 태그로 바로 이동해 고정된다</div></div>
</div>

버튼 하나, 이미지 하나가 어떤 태그와 클래스로 만들어졌는지 궁금할 때 트리를 뒤지지 않고 화면에서 바로 클릭 한 번으로 확인할 수 있는 방법이다.

---

## 5. Styles 패널: 적용된 CSS 확인하기

Elements 패널에서 요소를 선택하면 옆에 나타나는 Styles 패널에서, 그 요소에 적용된 모든 CSS 규칙을 출처별로 확인할 수 있다.

**▶ CSS 규칙 출처별 의미**

<table class="wda-mtable">
<thead><tr><th>출처</th><th>의미</th></tr></thead>
<tbody>
<tr><td><code>element.style</code></td><td>HTML 태그의 style 속성에 직접 작성된 인라인 스타일</td></tr>
<tr><td>클래스명 선택자</td><td><code>.card</code>처럼 클래스를 대상으로 작성된 CSS 규칙</td></tr>
<tr><td>ID명 선택자</td><td><code>#header</code>처럼 id를 대상으로 작성된 CSS 규칙</td></tr>
<tr><td>Inherited from</td><td>부모 요소로부터 물려받은(상속된) 스타일</td></tr>
<tr><td>user agent stylesheet</td><td>브라우저가 기본으로 제공하는 기본 스타일</td></tr>
</tbody>
</table>

**💡 설명**

<div class="wda-callout wda-ci">
  <p>각 규칙 오른쪽에는 그 스타일이 작성된 <strong>파일명과 줄 번호</strong>가 함께 표시되어, 소스 코드 어디를 고쳐야 하는지 바로 알 수 있다.</p>
  <p>우선순위에서 밀려 적용되지 않은 값은 <strong>취소선</strong>으로 표시된다. 최종적으로 실제 적용된 값만 보고 싶다면 옆의 Computed 탭을 확인하면 된다.</p>
</div>

---

## 6. Styles 패널: CSS 실시간 수정(Live Editing)

Styles 패널의 값은 클릭해서 바로 고칠 수 있다. 수정한 값은 화면에 즉시 반영되지만, 실제 CSS 파일이 저장되는 것은 아니다.

**▶ Live Editing 조작 방법**

<table class="wda-mtable">
<thead><tr><th>조작</th><th>효과</th></tr></thead>
<tbody>
<tr><td>값 클릭</td><td>텍스트 편집 상태로 전환</td></tr>
<tr><td>방향키 ↑/↓</td><td>숫자 값을 1씩 증가/감소</td></tr>
<tr><td>Shift + 방향키</td><td>숫자 값을 10씩 증가/감소</td></tr>
<tr><td>속성 앞 체크박스</td><td>해당 속성을 끄고 켜서 임시로 비활성화</td></tr>
<tr><td>+ 버튼 / 빈 줄 클릭</td><td>새로운 CSS 속성을 직접 추가</td></tr>
</tbody>
</table>

**• CSS: font-size 실시간 조정**

```css
/* 예: font-size 값을 클릭한 뒤 방향키로 조정 */
.title {
  font-size: 24px;
}
```

값을 수정한 뒤 `Enter`를 누르면 확정되고, `Esc`를 누르면 수정을 취소한다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>페이지를 <strong>새로고침하면 수정 내용은 모두 원래대로 돌아간다.</strong> Live Editing은 파일을 바꾸는 것이 아니라 화면에서만 잠깐 확인해보는 임시 실험이라는 점을 기억해야 한다.</p>
</div>

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <ul>
    <li>색상 값 옆의 네모를 클릭하면 컬러 피커로 색을 고를 수 있다.</li>
    <li>px, %, rem 같은 단위를 자동으로 인식하며, 단위 자체도 클릭해서 바꿀 수 있다.</li>
    <li>속성 이름이나 값을 입력할 때 자동완성 목록이 함께 뜬다.</li>
    <li>체크박스로 특정 속성만 임시로 꺼서 우선순위를 확인할 수 있다.</li>
    <li>선택한 요소에 클래스를 실시간으로 추가해 미리보기도 가능하다.</li>
    <li>최종적으로 적용된 값이 궁금하면 Computed 탭에서 다시 확인한다.</li>
  </ul>
</div>

---

## 7. 가상 선택자(:hover 등) 강제 적용하기

`:hover`, `:focus` 같은 가상 선택자는 마우스를 올리거나 포커스를 줘야만 나타나기 때문에, 평소에는 Styles 패널에서 확인하기 어렵다. DevTools는 이런 상태를 강제로 켜두는 기능을 제공한다.

**▶ 강제 적용 가능한 가상 상태**

<table class="wda-mtable">
<thead><tr><th>가상 상태</th><th>의미</th></tr></thead>
<tbody>
<tr><td><code>:hover</code></td><td>마우스를 올렸을 때</td></tr>
<tr><td><code>:active</code></td><td>클릭하고 있는 동안</td></tr>
<tr><td><code>:focus</code></td><td>입력 요소 등이 포커스를 받았을 때</td></tr>
<tr><td><code>:focus-within</code></td><td>자신 또는 자손 요소가 포커스를 받았을 때</td></tr>
<tr><td><code>:focus-visible</code></td><td>키보드 탐색으로 포커스가 표시될 때</td></tr>
<tr><td><code>:target</code></td><td>URL의 해시(#)가 해당 요소를 가리킬 때</td></tr>
</tbody>
</table>

Styles 패널 상단의 `:hov` 버튼을 누르면 Force element state 패널이 열리고, 위 목록에서 원하는 상태에 체크하면 그 상태의 스타일이 화면에 강제로 유지된다. 목록에는 `:read-write`처럼 입력 요소 전용 상태도 포함되어 있다.

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>체크를 해제하면 강제 적용은 즉시 풀린다. 또한 이 설정은 실제 마우스 이벤트나 포커스 이벤트를 발생시키는 것이 아니라 <strong>스타일만 강제로 보여주는 기능</strong>이며, 페이지를 새로고침하면 초기화된다.</p>
</div>

---

## 8. 스타일 우선순위 이해하기

Styles 패널에는 하나의 요소에 적용 가능한 여러 규칙이 동시에 나열된다. 이때 기본 원칙은 "위쪽에 있는 규칙이 이긴다"는 것이다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">element.style</div><div class="wda-fnode-dsc">가장 높은 우선순위</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">class / id 선택자</div><div class="wda-fnode-dsc">CSS 파일에 작성된 규칙</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">상속(Inherited)</div><div class="wda-fnode-dsc">부모로부터 물려받은 값</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">user agent stylesheet</div><div class="wda-fnode-dsc">가장 낮은 우선순위, 브라우저 기본값</div></div>
</div>

우선순위에서 밀려 적용되지 않은 규칙은 값에 취소선이 그어진 채로 남아있다. 이 취소선을 보면 "내가 작성한 스타일이 왜 적용되지 않았지?"라는 문제를 빠르게 진단할 수 있다.

취소선이 있는 값을 찾아 그 위에 있는 규칙과 비교하면, 어떤 선택자가 더 강한 우선순위를 가졌는지 바로 알 수 있다.

---

## 9. Computed 탭: 최종 계산값 보기

Styles 탭이 "어떤 규칙들이 경쟁하고 있는가"를 보여준다면, Computed 탭은 그 경쟁 끝에 "최종적으로 결정된 값"만 보여준다.

Computed 탭 위쪽에는 Box Model 다이어그램이 함께 표시된다. 바깥쪽부터 margin(주황), border(노랑), padding(초록), 가운데 content 순서로 실제 크기를 눈으로 확인할 수 있고, 각 영역을 클릭하면 그 값이 어느 규칙에서 왔는지도 함께 보여준다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Styles 탭</div>
    적용 가능한 모든 CSS 규칙을 출처별로 나열한다. 어떤 규칙이 이기고 지는지, 우선순위 경쟁 과정을 보여준다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Computed 탭</div>
    경쟁이 끝난 뒤 실제로 화면에 적용된 <strong>최종 계산값만</strong> 속성 이름 순서로 보여준다.
  </div>
</div>

---

## 10. 레이아웃 탭: Grid와 Flexbox 시각화

요소를 선택했을 때 `display: grid` 또는 `display: flex`가 적용되어 있다면, Elements 패널 안에 레이아웃을 눈으로 확인할 수 있는 시각화 도구가 함께 나타난다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Grid 시각화</div>
    라인 번호, 각 셀의 위치, gap으로 비어있는 영역을 화면 위에 색으로 표시한다. Styles 패널에서 <code>grid</code> 배지를 클릭하면 켤 수 있다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">Flexbox 시각화</div>
    주축과 교차축 방향을 화살표로 보여주고, 각 item이 차지하는 영역을 하이라이트한다. Styles 패널의 <code>flex</code> 배지를 클릭하면 켤 수 있다.
  </div>
</div>

두 시각화 모두 "코드로는 맞게 짠 것 같은데 왜 배치가 이상하지?"라는 상황에서, 실제로 브라우저가 계산한 라인과 축의 방향을 눈으로 바로 확인할 수 있게 해주는 도구다.

---

## 11. Console 패널: 에러 확인하기

Console 패널은 페이지가 실행되는 동안 발생한 JavaScript 메시지를 모아 보여준다. 빨간색 메시지는 실행을 막는 에러이고, 노란색 메시지는 경고다.

각 메시지 오른쪽에는 문제가 발생한 파일명과 줄 번호가 링크로 표시되며, 이를 클릭하면 Sources 패널에서 해당 코드 줄로 바로 이동한다. `console.log()`로 출력한 값도 이 패널에 함께 쌓인다.

**💡 설명**

<div class="wda-callout wda-ci">
  <p>화면이 이유 없이 멈추거나 버튼이 동작하지 않을 때는 가장 먼저 Console 패널부터 확인하는 습관을 들이는 것이 좋다. 빨간 에러 메시지 하나가 원인을 알려주는 경우가 많다.</p>
</div>

---

## 12. 기타 유용한 탭들

Elements 패널 안에는 Styles, Computed 외에도 상황에 따라 유용하게 쓰이는 탭들이 더 있다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">Event Listeners</div><div class="wda-fcard-dsc">선택한 요소에 어떤 이벤트(click, scroll 등)가 바인딩되어 있는지 확인한다. 버튼이 왜 반응하는지 추적할 때 사용한다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">DOM Breakpoints</div><div class="wda-fcard-dsc">하위 트리 수정, 속성 수정, 노드 제거가 발생하는 순간 자동으로 실행을 멈춰준다. DOM이 언제 바뀌는지 잡을 때 쓴다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Properties</div><div class="wda-fcard-dsc">선택한 요소가 가진 JavaScript 프로퍼티 전체를 트리 형태로 확인한다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Accessibility</div><div class="wda-fcard-dsc">접근성 트리와 ARIA 속성을 확인하고, 스크린 리더가 이 요소를 어떻게 읽을지 미리 볼 수 있다.</div></div>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>DevTools는 <strong>F12, Cmd+Option+I, 우클릭 → 검사</strong> 3가지 방법으로 열 수 있다.</li>
    <li><strong>Elements 패널</strong>은 HTML 구조를, <strong>Styles 패널</strong>은 적용된 CSS를 보여준다.</li>
    <li>Styles 패널의 수정은 <strong>즉시 반영되지만 저장되지 않으며</strong>, 새로고침하면 원래대로 돌아간다.</li>
    <li><strong>Computed 탭</strong>은 여러 규칙이 경쟁한 끝에 최종적으로 적용된 값만 보여준다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Styles 패널에서 값을 고치면 CSS 파일도 함께 저장된다?</div>
    <div class="wda-mistake-right">정답: 화면에만 <strong>임시로 반영</strong>될 뿐 파일은 바뀌지 않으며, 새로고침하면 수정 내용이 사라진다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Styles 탭과 Computed 탭은 같은 정보를 다르게 보여줄 뿐이다?</div>
    <div class="wda-mistake-right">정답: Styles 탭은 <strong>경쟁 중인 모든 규칙</strong>을, Computed 탭은 <strong>최종 계산값 하나</strong>만 보여준다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 열기</div>
    <div class="wda-formula-block-body"><code>F12 = Ctrl+Shift+I = Cmd+Option+I</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 우선순위</div>
    <div class="wda-formula-block-body"><code>element.style > class/id > 상속 > 기본값</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 수정의 한계</div>
    <div class="wda-formula-block-body"><code>Live Editing = 즉시반영 + 저장안됨</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Styles 패널에서 값을 수정한 뒤 새로고침하면 어떻게 되나?</div>
    <div class="wda-flip-back">수정 내용이 모두 사라지고 원래 상태로 돌아간다. 저장된 것이 아니라 임시 변경일 뿐이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Computed 탭의 핵심 역할은?</div>
    <div class="wda-flip-back">여러 규칙이 경쟁한 끝에 최종적으로 계산된 스타일 값만 보여주는 것이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">검사 모드를 켜는 단축키는?</div>
    <div class="wda-flip-back"><code>Ctrl+Shift+C</code> (Mac: <code>Cmd+Shift+C</code>)이며, 화면에서 바로 요소를 클릭해 선택할 수 있다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">:hover 스타일을 마우스 없이 확인하려면?</div>
    <div class="wda-flip-back">Styles 패널의 <code>:hov</code> 버튼으로 Force element state를 열어 해당 상태를 강제로 체크한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Console 패널에서 빨간 메시지는 무엇을 의미하나?</div>
    <div class="wda-flip-back">실행을 막는 JavaScript 에러다. 클릭하면 문제가 발생한 코드 줄로 바로 이동한다.</div>
  </div>
</div>
