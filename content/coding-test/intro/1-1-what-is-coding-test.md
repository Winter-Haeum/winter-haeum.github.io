---
title: "1-1 코딩테스트가 뭔가요?"
status: "completed"
description: "코딩테스트가 무엇이고 왜 필요한지, 문제 구조와 채점 기준, 어떤 역량이 필요한지 처음 접하는 사람 기준으로 정리한다."
category: "Coding Test"
section: "Coding Test"
tags:
  - coding-test
  - algorithm
  - problem-solving
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
  • <strong>코딩테스트 이해</strong> — 코딩테스트가 무엇이고 어떤 기준으로 채점되는지 이해합니다<br>
  • <strong>문제 구조 파악</strong> — 문제 설명·제약 조건·입출력 예시가 어떻게 구성되는지 익힙니다<br>
  • <strong>필요 역량 파악</strong> — 무엇을 준비해야 하는지, 어떤 마인드셋이 필요한지 알아봅니다
</div>

---

## 1. 코딩테스트란

주어진 문제를 코드로 해결하고, 그 결과를 자동 채점 시스템이 평가하는 시험입니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">핵심 흐름</div><div class="wda-fcard-dsc">입력을 받아 → 로직으로 처리하고 → 정해진 형태로 출력합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">제약 시간</div><div class="wda-fcard-dsc">문제마다 정해진 시간 안에 코드를 제출해야 합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">평가 방식</div><div class="wda-fcard-dsc">사람이 아니라 채점 서버가 정해진 테스트 케이스로 코드를 실행해 평가합니다.</div></div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  <p>채점 서버는 제출한 코드에 수십 개의 테스트 데이터를 넣어봅니다. 하나라도 틀리거나, 정답이어도 실행 시간이 너무 오래 걸리면 오답으로 처리됩니다.</p>
</div>

기업은 이 시험으로 지원자의 문제 해결 능력과 기본적인 프로그래밍 역량을 짧은 시간에 확인합니다.

---

## 2. 문제는 어떻게 구성되나

플랫폼마다 형태는 조금씩 다르지만, 대부분 세 부분으로 이루어집니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">문제 설명</div><div class="wda-fcard-dsc">무엇을 구해야 하는지 텍스트로 주어집니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">제약 조건</div><div class="wda-fcard-dsc">입력값의 범위와 개수 제한이 주어집니다. 이 범위를 보고 어떤 방식으로 풀어야 시간 안에 통과할 수 있는지 가늠할 수 있습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">입출력 예시</div><div class="wda-fcard-dsc">입력과 출력이 실제로 어떻게 맞물리는지 예시로 보여줍니다.</div></div>
</div>

실제 풀이는 대부분 `solution`이라는 이름의 함수를 채워 넣는 방식입니다.

**• JavaScript: solution 함수 기본 구조**

```js
function solution(numbers) {
  let sum = 0;

  for (const number of numbers) {
    sum += number;
  }

  return sum;
}
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>채점 시스템은 정해진 이름의 함수를 호출하도록 설계되어 있습니다. 함수 이름을 임의로 바꾸면 채점 자체가 진행되지 않습니다.</p>
</div>

---

## 3. 채점 기준

정답 여부만 보는 것이 아니라, 다음 세 가지를 모두 만족해야 통과합니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">정확성</div><div class="wda-fcard-dsc">주어진 입력에 대해 올바른 값을 반환하는지 확인합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">효율성</div><div class="wda-fcard-dsc">제한 시간 안에 실행이 끝나는지 확인합니다. 정답이어도 너무 느리면 실패합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">메모리</div><div class="wda-fcard-dsc">허용된 메모리 범위 안에서 동작하는지 확인합니다.</div></div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  <p>제약 조건에 적힌 입력 크기(N)를 보면 어떤 접근이 통할지 미리 가늠할 수 있습니다. N이 100,000을 넘는데 이중 반복문(O(N²))으로 풀면 대부분 시간 초과가 납니다. 시간 복잡도를 다루는 자세한 내용은 <a href="/coding-test/arrays/2-1-array-methods">2-1 문서</a>에서 다룹니다.</p>
</div>

---

## 4. 문제 유형 세 갈래

**▶ 문제 유형별 핵심 내용**

<table class="wda-mtable">
<thead><tr><th>유형</th><th>핵심 내용</th></tr></thead>
<tbody>
<tr><td>구현</td><td>문제 조건을 그대로 코드로 옮기는 능력. 문자열 처리, 완전 탐색 등</td></tr>
<tr><td>자료구조</td><td>배열·스택·큐·해시맵 등 상황에 맞는 저장 방식을 선택하는 능력</td></tr>
<tr><td>알고리즘</td><td>정렬·탐색·그래프 탐색·동적 계획법처럼 정해진 해결 절차를 적용하는 능력</td></tr>
</tbody>
</table>

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>처음부터 어려운 알고리즘을 파고들기보다, 구현 문제로 감을 잡는 것이 먼저입니다. 조건을 코드로 옮기는 연습이 되어 있어야 자료구조와 알고리즘도 제대로 활용할 수 있습니다.</p>
</div>

---

## 5. 필요한 역량

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">기본 문법</div><div class="wda-fcard-dsc">변수, 조건문, 반복문, 함수, 배열과 객체를 다루는 힘입니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">문제 분해</div><div class="wda-fcard-dsc">큰 문제를 작은 단위로 쪼개서 하나씩 해결하는 능력입니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">패턴 인식</div><div class="wda-fcard-dsc">"이전에 풀어본 방식과 비슷하다"를 알아채는 감각입니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">디버깅</div><div class="wda-fcard-dsc">코드가 왜 원하는 결과를 내지 않는지 원인을 찾아 고치는 능력입니다.</div></div>
</div>

문제를 실제로 읽고 접근하는 순서는 [1-3 문서](/coding-test/intro/1-3-how-to-solve-problems)에서 자세히 다룹니다.

---

## 6. 흔한 오해

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>"수학을 잘해야 한다"</strong> — 고등수학 수준의 지식은 대부분 필요 없습니다. 사칙연산과 논리적으로 순서를 따지는 힘이면 충분합니다.</p>
  <p><strong>"모든 알고리즘을 알아야 시작할 수 있다"</strong> — 입문 단계는 기본 문법과 구현 능력만으로도 충분히 풀 수 있는 문제가 많습니다.</p>
</div>

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">못 푸는 게 정상</div><div class="wda-fcard-dsc">처음엔 막히는 게 당연합니다. 좌절하지 않고 계속하는 것이 중요합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">비교하지 않기</div><div class="wda-fcard-dsc">다른 사람과 비교하기보다, 어제의 나보다 나아졌는지를 기준으로 삼습니다.</div></div>
</div>

---

## 7. ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>코딩테스트는 <strong>입력 → 로직 → 출력</strong> 흐름의 문제를 코드로 해결하고 자동 채점하는 시험이다.</li>
    <li>채점은 <strong>정확성 + 효율성 + 메모리</strong> 세 가지를 모두 통과해야 한다.</li>
    <li>문제 유형은 크게 <strong>구현 / 자료구조 / 알고리즘</strong>으로 나뉜다.</li>
    <li>제약 조건의 <strong>입력 크기(N)</strong>를 보면 어떤 접근이 통할지 미리 가늠할 수 있다.</li>
    <li>고등수학이나 모든 알고리즘 지식이 없어도 <strong>구현 능력</strong>부터 시작하면 충분하다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 정답만 맞으면 무조건 통과다?</div>
    <div class="wda-mistake-right">정답: 정확성뿐 아니라 <strong>제한 시간 안의 실행(효율성)</strong>과 <strong>메모리 사용량</strong>까지 만족해야 통과한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 코딩테스트는 수학을 잘해야 유리하다?</div>
    <div class="wda-mistake-right">정답: 고등수학은 대부분 필요 없으며, <strong>사칙연산과 논리적 사고</strong>만으로 충분한 문제가 많다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 함수 이름은 마음대로 바꿔도 채점에 문제없다?</div>
    <div class="wda-mistake-right">정답: 채점 시스템이 <strong>정해진 함수 이름</strong>을 호출하도록 되어 있어, 이름을 바꾸면 채점 자체가 되지 않는다.</div>
  </div>
</div>

**🧩 풀이 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 채점 통과 조건</div>
    <div class="wda-formula-block-body"><code>정확성 + 효율성 + 메모리</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 문제 처리 흐름</div>
    <div class="wda-formula-block-body"><code>입력 → 로직 → 출력</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 문제 유형</div>
    <div class="wda-formula-block-body"><code>구현 → 자료구조 → 알고리즘</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">코딩테스트란 무엇인가?</div>
    <div class="wda-flip-back">주어진 문제를 코드로 해결하고 자동 채점 시스템으로 평가받는 시험입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">채점 기준 3가지는?</div>
    <div class="wda-flip-back">정확성, 효율성, 메모리 사용량입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">문제 유형 3가지는?</div>
    <div class="wda-flip-back">구현, 자료구조, 알고리즘입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">solution 함수 이름을 바꾸면 어떻게 되나?</div>
    <div class="wda-flip-back">채점 시스템이 해당 함수를 호출하지 못해 채점이 되지 않습니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">제약 조건의 입력 크기(N)는 왜 중요한가?</div>
    <div class="wda-flip-back">N의 크기로 어떤 시간 복잡도의 접근이 시간 안에 통과할지 미리 가늠할 수 있습니다.</div>
  </div>
</div>
