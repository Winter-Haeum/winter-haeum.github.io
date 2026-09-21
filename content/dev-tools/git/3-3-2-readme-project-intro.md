---
title: "3-2 README.md로 프로젝트 소개하기"
category: "frontend"
section: "git"
date: "2026-08-02"
status: "completed"
description: "README.md의 역할과 기본 구조를 익히고, 프로젝트 제목·설치 방법·사용법·기여 가이드를 담은 소개 문서를 작성하는 방법을 정리한다."
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
  • <strong>README.md 개념 이해</strong> — 프로젝트 소개, 첫인상, 협업 효율성 측면에서 왜 중요한지 이해합니다<br>
  • <strong>기본 구조 작성</strong> — 프로젝트 소개, 설치 방법, 사용법, 기여 가이드로 이어지는 구조를 작성할 수 있습니다<br>
  • <strong>좋은 예시 분석</strong> — 실제 오픈소스 README의 구성 방식을 참고해 내 프로젝트에 적용합니다<br>
  • <strong>Markdown 문법 예고</strong> — 제목·목록·링크·코드블록을 활용해 README를 실제로 작성해봅니다
</div>

---

## 1. README.md란

3-3-1에서 저장소에 올리지 않을 파일을 정리했다면, 이번에는 반대로 저장소를 열었을 때 가장 먼저 보여줄 문서를 만들 차례다. README.md를 제대로 작성하려면 결국 Markdown 문법을 알아야 한다.

문법 자체는 이어지는 3-3-3에서 자세히 다루므로, 이 문서에서는 README.md가 어떤 문서이고 무엇을 담아야 하는지에 집중한다.

README.md는 <strong>프로젝트의 공식 소개 문서</strong>다. GitHub 저장소에 들어가면 가장 먼저 보이는 파일이며, Markdown 문법으로 작성하고 <code>.md</code> 확장자를 사용한다. 위치는 항상 <strong>프로젝트 루트 디렉토리</strong>다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">프로젝트 소개</div><div class="wda-fcard-dsc">이 프로젝트가 무엇이고 어떤 문제를 해결하는지 설명한다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">설치 방법 제공</div><div class="wda-fcard-dsc">어떻게 설치하고 실행하는지 처음 보는 사람도 따라할 수 있게 안내한다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">기여 가이드 제공</div><div class="wda-fcard-dsc">다른 개발자가 이 프로젝트에 기여하는 방법을 안내한다.</div></div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  <p>README.md는 단순한 파일 하나가 아니라 <strong>프로젝트의 얼굴</strong>이다. 코드를 한 줄도 읽기 전에 이 문서만으로 프로젝트의 첫인상이 결정된다.</p>
</div>

---

## 2. 왜 중요한가

**▶ README가 중요한 이유**

<table class="wda-mtable">
<thead><tr><th>이유</th><th>내용</th></tr></thead>
<tbody>
<tr><td>첫인상 결정</td><td>GitHub 저장소 첫 화면에 그대로 표시되므로 프로젝트의 전문성·신뢰도·완성도를 판단하는 기준이 된다. README가 없거나 부실하면 관리되지 않는 프로젝트라는 인상을 준다.</td></tr>
<tr><td>협업 효율성</td><td>개발자·디자이너·기여자가 프로젝트를 빠르게 이해하도록 돕는다. "이 프로젝트는 어떻게 실행하나요" 같은 반복 질문이 줄어 의사소통 비용이 낮아진다.</td></tr>
<tr><td>오픈소스 기여 유도</td><td>기여 가이드가 있으면 외부 개발자가 프로젝트에 기여하기 쉬워지고, 그만큼 프로젝트의 성장 속도도 빨라진다.</td></tr>
</tbody>
</table>

---

## 3. README.md 기본 구조

잘 정리된 README는 대체로 다음 순서를 따른다.

**▶ README 기본 구성 섹션**

<table class="wda-mtable">
<thead><tr><th>섹션</th><th>담을 내용</th></tr></thead>
<tbody>
<tr><td>제목 및 설명</td><td>프로젝트 이름을 제목으로, 바로 아래에 1~2문장으로 무엇을 하는 프로젝트인지 요약</td></tr>
<tr><td>설치 방법</td><td>저장소 클론, 의존성 설치, 실행 방법을 순서대로 안내</td></tr>
<tr><td>사용법</td><td>실제 사용 예시와 주요 기능 소개</td></tr>
<tr><td>추가 정보</td><td>기여 가이드, 라이선스, 문의처 등</td></tr>
</tbody>
</table>

**💡 설명**

<div class="wda-callout wda-ci">
  <p>이 구조는 고정된 정답이 아니라 프로젝트 규모와 성격에 따라 달라질 수 있다. 기업의 대규모 프로젝트는 기여 가이드를 <code>CONTRIBUTING.md</code>로, 행동 강령을 <code>CODE_OF_CONDUCT.md</code>로 따로 분리해 관리하기도 한다.</p>
</div>

---

## 4. 좋은 README.md 예시 분석

간단한 Todo 앱을 예로 들면, 아래와 같은 흐름으로 작성할 수 있다.

**• Todo 앱 README 작성 예시**

````markdown
# Todo App

할 일을 등록하고 완료 여부를 체크할 수 있는 간단한 웹 애플리케이션입니다.

## 주요 기능

- 할 일 추가 / 삭제
- 완료 여부 체크
- 카테고리별 분류

## 설치 방법

```bash
git clone https://github.com/example/todo-app.git
cd todo-app
npm install
npm start
```

## 사용법

1. 입력창에 할 일을 작성하고 Enter를 누릅니다
2. 체크박스를 눌러 완료 표시를 합니다
3. 필요 없는 항목은 삭제 버튼으로 지웁니다

## 라이선스

MIT
````

이 예시는 프로젝트 제목과 한 줄 설명, 기능 목록, 설치 명령어, 사용법, 라이선스까지 앞서 정리한 기본 구조를 그대로 따르고 있다. 실제 프로젝트에서도 이 순서를 기본 뼈대로 삼으면 크게 벗어나지 않는다.

---

## 5. 실습: README.md 작성하기

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1. 파일 생성</div><div class="wda-fnode-dsc">프로젝트 루트에 README.md 생성</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2. 기본 문서 작성</div><div class="wda-fnode-dsc">제목·설명·설치·사용법·기여가이드 작성</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3. GitHub 업로드</div><div class="wda-fnode-dsc">커밋하고 push해 저장소 첫 화면에 반영</div></div>
</div>

**Step 1. 파일 생성**

**• 터미널: README.md 파일 생성하기**

```bash
touch README.md
```

VS Code처럼 에디터에서 새 파일을 만들어도 된다.

**Step 2. 기본 문서 작성**

**• README 기본 뼈대 작성 예시**

```markdown
# 프로젝트 이름

간단한 프로젝트 설명

## 설치 방법

...

## 사용법

...

## 기여 가이드

...

## 라이선스

...
```

**Step 3. GitHub에 업로드**

**• 터미널: README 커밋하고 push하기**

```bash
git add README.md
git commit -m "docs: add README.md"
git push
```

push가 끝나면 GitHub 저장소 첫 화면에 README.md 내용이 자동으로 표시된다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">README가 있는 저장소</div>
    처음 방문한 사람도 무엇을 하는 프로젝트인지, 어떻게 실행하는지 바로 파악할 수 있다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">README가 없는 저장소</div>
    코드를 하나씩 열어봐야 프로젝트를 파악할 수 있어 진입 장벽이 높고, 관리되지 않는 프로젝트라는 인상을 준다.
  </div>
</div>

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>참고로 GitHub 프로필 자체도 같은 이름의 저장소에 README.md를 두면 프로필 페이지처럼 꾸밀 수 있다. 다만 이 문서에서는 프로젝트 소개용 README에 집중한다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>README.md는 <strong>프로젝트 루트 디렉토리</strong>에 두어야 GitHub가 자동으로 인식한다.</li>
    <li>기본 구조는 <strong>제목·설명 → 설치 방법 → 사용법 → 추가 정보</strong> 순서를 따른다.</li>
    <li>README는 첫인상을 결정하고 반복 질문을 줄여 <strong>협업 효율성</strong>을 높인다.</li>
    <li>README.md는 Markdown 문법으로 작성하므로, 제대로 쓰려면 Markdown 문법을 알아야 한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: README.md는 아무 폴더에나 두어도 GitHub가 알아서 찾아준다?</div>
    <div class="wda-mistake-right">정답: GitHub는 <strong>루트 디렉토리</strong>의 README.md만 자동으로 인식해 저장소 첫 화면에 표시한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: README는 있으면 좋고 없어도 그만인 선택 사항이다?</div>
    <div class="wda-mistake-right">정답: 사실상 <strong>필수 문서</strong>다. 없으면 프로젝트 신뢰도와 협업 효율성이 크게 떨어진다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 위치</div>
    <div class="wda-formula-block-body"><code>README.md = 프로젝트 루트</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 구조</div>
    <div class="wda-formula-block-body"><code>소개 → 설치 → 사용법 → 기여</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 역할</div>
    <div class="wda-formula-block-body"><code>README = 프로젝트의 얼굴</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">README.md는 어디에 위치해야 하나?</div>
    <div class="wda-flip-back">프로젝트 루트 디렉토리. GitHub는 루트의 README.md만 자동으로 인식한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">README.md의 기본 구조 순서는?</div>
    <div class="wda-flip-back">제목·설명 → 설치 방법 → 사용법 → 기여 가이드/라이선스 순서다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">README가 협업 효율성을 높이는 이유는?</div>
    <div class="wda-flip-back">반복되는 실행 방법 질문을 줄여 의사소통 비용을 낮추기 때문이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">README.md를 GitHub에 반영하는 명령어 흐름은?</div>
    <div class="wda-flip-back"><code>git add README.md</code> → <code>git commit</code> → <code>git push</code></div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">대규모 프로젝트에서 기여 가이드를 따로 두는 파일명은?</div>
    <div class="wda-flip-back"><code>CONTRIBUTING.md</code>로 분리해 관리하는 경우가 많다.</div>
  </div>
</div>
