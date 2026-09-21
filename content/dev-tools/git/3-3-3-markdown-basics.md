---
title: "3-3 Markdown 문법 알아보기"
category: "frontend"
section: "git"
date: "2026-08-02"
status: "completed"
description: "제목·텍스트 서식·목록·링크·이미지·코드블록·표 등 Markdown 핵심 문법을 정리하고 README.md 작성에 바로 활용하는 방법을 다룬다."
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
  • <strong>기본 문법 이해</strong> — 제목, 텍스트 서식, 목록, 링크, 이미지 등 문서 구성의 핵심 문법을 익힙니다<br>
  • <strong>문서 구조화</strong> — 제목과 목록, 링크를 조합해 읽기 쉬운 문서 구조를 만들 수 있습니다<br>
  • <strong>코드블록·표 작성</strong> — README, API 문서 등 기술 문서에 필수인 코드블록과 표를 정확히 작성합니다
</div>

---

## 1. Markdown이란

3-3-2에서 README.md의 구조를 살펴봤다면, 이 문서는 그 안을 채우는 실제 문법을 다룬다. 이 페이지 자체가 Markdown을 실시간으로 렌더링하는 사이트이기 때문에, 아래 예시들은 실제로 적용되지 않고 코드 형태로 보이도록 모두 코드블록 안에 넣었다.

눈으로 문법을 확인한 뒤 직접 <code>.md</code> 파일에 옮겨 적으며 연습하는 것을 권장한다.

Markdown은 2004년 John Gruber가 만든 <strong>경량 마크업 언어</strong>다. 복잡한 태그 없이 간단한 기호만으로 서식이 있는 문서를 작성할 수 있다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">간결하다</div><div class="wda-fcard-dsc">HTML보다 문법이 단순해 빠르게 익히고 바로 쓸 수 있다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">가독성이 좋다</div><div class="wda-fcard-dsc">렌더링하지 않은 원본 텍스트 상태로 읽어도 구조가 눈에 들어온다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">범용성이 높다</div><div class="wda-fcard-dsc">GitHub, 블로그, 각종 에디터 등 거의 모든 개발 환경에서 표준처럼 쓰인다.</div></div>
</div>

---

## 2. 제목 만들기

<code>#</code> 개수로 제목 레벨을 표현하며, h1부터 h6까지 총 6단계를 지원한다.

**▶ 제목 레벨별 문법**

<table class="wda-mtable">
<thead><tr><th>문법</th><th>레벨</th></tr></thead>
<tbody>
<tr><td><code># 제목</code></td><td>h1</td></tr>
<tr><td><code>## 제목</code></td><td>h2</td></tr>
<tr><td><code>### 제목</code></td><td>h3</td></tr>
<tr><td><code>#### 제목</code></td><td>h4</td></tr>
<tr><td><code>##### 제목</code></td><td>h5</td></tr>
<tr><td><code>###### 제목</code></td><td>h6</td></tr>
</tbody>
</table>

**• 제목 레벨 작성 예시**

```markdown
# 문서 대표 제목
## 큰 섹션
### 하위 섹션
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><code>#</code> 뒤에는 반드시 <strong>공백 1칸</strong>을 넣어야 제목으로 인식된다. 레벨 1(<code>#</code>)은 문서 전체를 대표하는 제목으로 한 번만 사용하고, 레벨 2~3은 섹션을 구분하는 용도로 가장 많이 쓰인다.</p>
</div>

---

## 3. 텍스트 서식

**▶ 텍스트 서식 문법**

<table class="wda-mtable">
<thead><tr><th>서식</th><th>문법</th></tr></thead>
<tbody>
<tr><td>굵게</td><td><code>**텍스트**</code></td></tr>
<tr><td>기울임</td><td><code>*텍스트*</code></td></tr>
<tr><td>굵게 + 기울임</td><td><code>***텍스트***</code></td></tr>
<tr><td>취소선</td><td><code>~~텍스트~~</code></td></tr>
<tr><td>인용구</td><td><code>&gt; 문장</code></td></tr>
</tbody>
</table>

**• 텍스트 서식 작성 예시**

```markdown
**중요한 내용은 굵게 강조합니다**
*강조하고 싶은 단어는 기울임*
***둘 다 필요하면 굵게+기울임***
~~더 이상 유효하지 않은 내용~~

> 인용구는 참고나 주의 사항을 강조할 때 유용합니다.
```

---

## 4. 목록 만들기

순서가 없는 목록은 <code>-</code> 또는 <code>*</code>로, 순서가 있는 목록은 숫자와 마침표로 만든다.

**• 순서 없는·있는 목록 작성 예시**

```markdown
- 순서 없는 목록 항목
- 또 다른 항목
  - 하위 항목은 2칸 들여쓰기

1. 순서 있는 목록 항목
2. 다음 항목
   1. 하위 항목은 3칸 들여쓰기
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>들여쓰기 칸 수가 다르다. <strong>순서 없는 목록은 2칸</strong>, <strong>순서 있는 목록은 3칸</strong>으로 하위 항목을 들여써야 렌더러가 같은 목록의 하위 항목으로 정확히 인식한다.</p>
</div>

체크리스트는 대괄호로 완료 여부를 표현한다.

**• 체크리스트 작성 예시**

```markdown
- [ ] 아직 하지 않은 일
- [x] 완료한 일
```

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>GitHub에서는 체크리스트를 Issue나 Pull Request의 진행 상황 표시, 개발 로드맵 작성 등에 실제로 클릭 가능한 형태로 자주 활용한다.</p>
</div>

---

## 5. 링크 만들기

**▶ 링크 종류별 설명**

<table class="wda-mtable">
<thead><tr><th>종류</th><th>설명</th></tr></thead>
<tbody>
<tr><td>기본 링크</td><td>텍스트에 URL을 바로 연결한다</td></tr>
<tr><td>자동 링크</td><td>URL을 그대로 적으면 링크로 인식된다</td></tr>
<tr><td>참조 링크</td><td>본문에는 이름만 쓰고, 문서 하단에서 실제 URL을 정의한다</td></tr>
<tr><td>이미지 링크</td><td>이미지를 클릭하면 다른 페이지로 이동한다</td></tr>
<tr><td>문서 내 링크</td><td>같은 문서 안의 특정 제목으로 바로 이동한다</td></tr>
</tbody>
</table>

**• 링크 종류별 작성 예시**

```markdown
[구글로 이동](https://www.google.com)

https://www.google.com

[구글][google-link]

[google-link]: https://www.google.com

[![로고 이미지](이미지URL)](https://www.google.com)

[제목으로 이동하기](#제목-이름)
```

문서 내 링크는 제목 텍스트를 소문자로 바꾸고 공백을 하이픈(<code>-</code>)으로 자동 치환한 값을 앵커로 사용한다.

이미지 링크는 앞쪽 <code>![대체텍스트](이미지URL)</code>가 화면에 보이는 이미지이고, 그 전체를 감싸는 <code>[ ]( )</code>의 URL이 클릭했을 때 이동할 주소다.

---

## 6. 이미지 넣기

기본 문법은 링크 앞에 느낌표를 붙인 형태다.

**• 이미지 삽입 기본 문법**

```markdown
![대체 텍스트](이미지URL)
```

<code>alt</code>에 해당하는 대체 텍스트는 장식이 아니라 실질적인 역할을 한다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">접근성</div><div class="wda-fcard-dsc">스크린 리더가 대체 텍스트를 읽어줘 시각장애인도 내용을 이해할 수 있다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">로드 실패 대비</div><div class="wda-fcard-dsc">이미지가 깨졌을 때 대체 텍스트가 표시되어 어떤 이미지였는지 파악할 수 있다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">SEO</div><div class="wda-fcard-dsc">검색 엔진이 이미지 내용을 이해하는 데 활용되어 검색 결과 노출에 영향을 준다.</div></div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>Markdown 문법만으로는 이미지 크기나 정렬을 조절할 수 없다. 크기를 지정하려면 <code>img</code> 태그를, 가운데 정렬을 하려면 <code>div align="center"</code>처럼 HTML을 함께 사용해야 한다.</p>
</div>

**• HTML로 이미지 크기·정렬 지정하기**

```markdown
<img src="이미지URL" width="400" alt="대체 텍스트">

<div align="center">
  <img src="이미지URL" alt="대체 텍스트">
</div>
```

---

## 7. 코드 작성하기

문장 중간에 짧은 코드를 표시할 때는 백틱 하나로 감싸고, 여러 줄의 코드는 백틱 세 개로 감싼 코드블록을 사용한다. 코드블록을 여는 첫 백틱 뒤에 언어 이름을 붙이면 그 언어에 맞춰 문법 강조가 적용되고, GitHub에서는 줄 번호도 함께 표시된다.

**• JavaScript: 언어 지정 코드블록 예시**

```javascript
// index.js
const message = 'hello world';
console.log(message);
```

**• Python: 언어 지정 코드블록 예시**

```python
# main.py
def greet():
    print("hello world")
```

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>설치 명령어처럼 터미널에서 실행하는 코드는 <code>bash</code>나 <code>shell</code> 언어로 지정하고, 코드 예시는 되도록 <code>javascript</code>, <code>python</code>, <code>html</code>, <code>css</code> 등 언어 하이라이팅을 항상 적용한다. 파일명을 밝혀야 할 때는 코드 첫 줄에 주석으로 명시하면 읽는 사람이 헷갈리지 않는다.</p>
</div>

---

## 8. 표(Table) 만들기

파이프(<code>|</code>)로 열을 구분하고, 헤더 아래에 구분선을 넣으면 표가 만들어진다.

**• 표 기본 작성 예시**

```markdown
| 이름   | 역할       |
| ------ | ---------- |
| 로키   | 프론트엔드 |
| 겨울   | 백엔드     |
```

정렬은 구분선에 콜론을 붙여 지정한다.

**• 표 정렬 지정 예시**

```markdown
| 왼쪽 정렬 | 가운데 정렬 | 오른쪽 정렬 |
| :--------- | :---------: | ----------: |
| 텍스트    | 텍스트      | 텍스트      |
```

**💡 설명**

<div class="wda-callout wda-ci">
  <p>파이프 위치에 공백을 맞춰 작성하면 렌더링 전 원본 텍스트도 읽기 쉬워진다. 다만 표가 너무 복잡해지면 오히려 가독성이 떨어지므로, API 문서나 기능 비교처럼 항목이 명확한 곳에 적당히 활용하는 편이 좋다.</p>
</div>

---

## 9. 기타 유용한 문법

**• 수평선·이스케이프·줄바꿈·주석 문법**

```markdown
---

이스케이프: \* \# \[

줄바꿈 방법1: 문장 끝에 공백 2개 남기고 Enter
줄바꿈 방법2: <br>

<!-- 이 주석은 렌더링되지 않습니다 -->
```

수평선은 <code>---</code>, <code>***</code>, <code>___</code> 중 무엇을 써도 같은 결과가 나온다. <code>*</code>, <code>#</code>, <code>[</code> 같은 특수문자를 문법이 아닌 글자 그대로 출력하려면 앞에 백슬래시(<code>\</code>)를 붙인다.

줄바꿈은 문장 끝에 공백 2칸을 남기고 Enter를 치거나 <code>&lt;br&gt;</code> 태그를 쓰면 되고, HTML 주석 문법으로 작성한 메모는 화면에 렌더링되지 않는다.

---

## 10. Markdown 문법 한눈에 정리

**▶ Markdown 문법 전체 정리**

<table class="wda-mtable">
<thead><tr><th>요소</th><th>문법</th></tr></thead>
<tbody>
<tr><td>제목</td><td><code># ~ ######</code></td></tr>
<tr><td>굵게 / 기울임</td><td><code>**텍스트**</code> / <code>*텍스트*</code></td></tr>
<tr><td>취소선 / 인용구</td><td><code>~~텍스트~~</code> / <code>&gt; 문장</code></td></tr>
<tr><td>목록</td><td><code>- 항목</code> / <code>1. 항목</code></td></tr>
<tr><td>체크리스트</td><td><code>- [ ]</code> / <code>- [x]</code></td></tr>
<tr><td>링크</td><td><code>[텍스트](URL)</code></td></tr>
<tr><td>이미지</td><td><code>![대체텍스트](URL)</code></td></tr>
<tr><td>코드블록</td><td>백틱 3개 + 언어명</td></tr>
<tr><td>표</td><td><code>|</code>로 구분, 둘째 줄에 <code>---</code></td></tr>
<tr><td>수평선</td><td><code>---</code>, <code>***</code>, <code>___</code></td></tr>
</tbody>
</table>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>제목은 <strong>#</strong> 개수로 h1~h6까지 표현하며, <code>#</code> 뒤에 공백이 반드시 필요하다.</li>
    <li>굵게는 <strong>별표 2개</strong>, 기울임은 <strong>별표 1개</strong>로 감싼다.</li>
    <li>목록은 순서 없는 목록 <strong>2칸</strong>, 순서 있는 목록 <strong>3칸</strong> 들여쓰기로 하위 항목을 만든다.</li>
    <li>코드블록은 백틱 3개로 열고 닫으며, 언어명을 붙이면 문법 강조가 적용된다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 별표 하나(*텍스트*)와 별표 두 개(**텍스트**)는 같은 효과다?</div>
    <div class="wda-mistake-right">정답: 별표 <strong>1개는 기울임</strong>, <strong>2개는 굵게</strong>다. 3개를 겹치면 굵게+기울임이 동시에 적용된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 이미지 크기도 Markdown 문법만으로 조절할 수 있다?</div>
    <div class="wda-mistake-right">정답: Markdown 기본 문법으로는 불가능하고, <strong>HTML img 태그</strong>의 width 속성을 함께 써야 한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 제목</div>
    <div class="wda-formula-block-body"><code># 개수 = 제목 레벨</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 강조</div>
    <div class="wda-formula-block-body"><code>* 1개 기울임 · * 2개 굵게</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 코드</div>
    <div class="wda-formula-block-body"><code>백틱 3개 + 언어명 = 하이라이팅</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">h3 제목을 만드는 문법은?</div>
    <div class="wda-flip-back"><code>### 제목</code> — 샵 3개와 공백 1칸 뒤에 제목 텍스트를 쓴다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">코드블록에 언어 하이라이팅을 적용하려면?</div>
    <div class="wda-flip-back">여는 백틱 3개 바로 뒤에 언어 이름을 붙인다. 예: 백틱 3개 + javascript</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">순서 없는 목록의 하위 항목 들여쓰기는 몇 칸?</div>
    <div class="wda-flip-back">2칸이다. 순서 있는 목록은 3칸을 사용한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">체크된 체크리스트 항목의 문법은?</div>
    <div class="wda-flip-back"><code>- [x] 완료한 일</code>처럼 대괄호 안에 x를 넣는다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">이미지의 alt 텍스트가 중요한 이유 3가지는?</div>
    <div class="wda-flip-back">접근성(스크린 리더), 로드 실패 대비, SEO 검색 노출이다.</div>
  </div>
</div>
