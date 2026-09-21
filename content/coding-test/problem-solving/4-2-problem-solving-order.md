---
title: "4-2 문제 푸는 순서 알아보기"
status: "completed"
description: "1-3에서 배운 문제 풀이 4단계를 실제로 어떻게 수행하는지, 예시를 손으로 따라가는 방법과 의사코드 변환, 디버깅 습관을 실전 기법 중심으로 정리한다."
category: "Coding Test"
section: "Coding Test"
tags:
  - coding-test
  - problem-solving
  - pseudocode
  - debugging
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
  • <strong>Dry Run 기법</strong> — 예시를 손으로 따라가며 로직을 검증하는 방법을 익힙니다<br>
  • <strong>패턴 발견</strong> — 여러 입출력 예시를 비교해 숨은 규칙을 찾는 방법을 익힙니다<br>
  • <strong>디버깅과 시간 배분</strong> — 중간 결과를 확인하는 습관과 실전 시간 배분을 익힙니다
</div>

---

## 1. 예시를 손으로 따라가기 (Dry Run)

문제 풀이 4단계(이해-계획-구현-검증) 자체는 [1-3 문서](/coding-test/intro/1-3-how-to-solve-problems)에서 이미 다뤘습니다.

이 문서는 그 각 단계를 실제로 어떻게 수행하는지 구체적인 기법을 다룹니다. 예시를 어떻게 분석하고, 계획을 어떻게 의사코드로 옮기고, 코드를 짜면서 어떻게 디버깅하는지가 핵심입니다.

눈으로만 보지 말고, 변수가 어떻게 바뀌는지 한 단계씩 직접 적어보는 검증 방법입니다.

문제: 배열의 합을 구하라. 입력 `[1, 2, 3, 4, 5]` → 출력 `15`

**▶ Dry Run으로 변수 추적**

<table class="wda-mtable">
<thead><tr><th>단계</th><th>처리</th><th>sum</th></tr></thead>
<tbody>
<tr><td>시작</td><td>초기화</td><td>0</td></tr>
<tr><td>1번째</td><td>0 + 1</td><td>1</td></tr>
<tr><td>2번째</td><td>1 + 2</td><td>3</td></tr>
<tr><td>3번째</td><td>3 + 3</td><td>6</td></tr>
<tr><td>4번째</td><td>6 + 4</td><td>10</td></tr>
<tr><td>5번째</td><td>10 + 5</td><td>15 ✅</td></tr>
</tbody>
</table>

**💡 설명**

<div class="wda-callout wda-ci">
  <p>이 과정을 거치면 코드를 짜기 전에 머릿속 로직의 허점을 미리 발견할 수 있습니다. 조건이 까다로운 문제일수록 Dry Run 없이 바로 코드를 짜면 디버깅에 더 많은 시간을 뺏깁니다.</p>
</div>

---

## 2. 여러 예시를 비교해 패턴 찾기

예시가 여러 개 주어진다면, 공통된 규칙을 찾는 데 활용합니다.

**▶ 여러 예시 비교로 패턴 찾기**

<table class="wda-mtable">
<thead><tr><th>입력</th><th>출력</th><th>패턴 분석</th></tr></thead>
<tbody>
<tr><td>[1, 2, 3]</td><td>2</td><td>(1+2+3) / 3 = 2 → 평균?</td></tr>
<tr><td>[1, 2]</td><td>1.5</td><td>(1+2) / 2 = 1.5 → 평균 확정</td></tr>
<tr><td>[5]</td><td>5</td><td>5 / 1 = 5 → 요소가 하나여도 동일하게 적용됨</td></tr>
</tbody>
</table>

예시 1만 봤다면 중간값인지 평균인지 헷갈릴 수 있지만, 예시 2를 보면 평균임이 분명해집니다. 예시 3처럼 요소가 하나뿐인 경우까지 확인하면 규칙을 일반화할 준비가 끝난 것입니다.

---

## 3. 의사코드를 코드로 변환하기

의사코드 한 줄과 실제 코드 한 줄이 어떻게 대응되는지 살펴보겠습니다. 문제: 배열에서 짝수만 골라 합 구하기.

**▶ 의사코드와 JavaScript 대응**

<table class="wda-mtable">
<thead><tr><th>의사코드</th><th>JavaScript</th></tr></thead>
<tbody>
<tr><td>1. 합계를 0으로 시작한다</td><td><code>let sum = 0;</code></td></tr>
<tr><td>2. 배열의 각 값에 대해 반복한다</td><td><code>for (const num of arr) {</code></td></tr>
<tr><td>3. 만약 값이 짝수라면</td><td><code>if (num % 2 === 0) {</code></td></tr>
<tr><td>4. 합계에 더한다</td><td><code>sum += num; }</code></td></tr>
<tr><td>5. 합계를 반환한다</td><td><code>return sum;</code></td></tr>
</tbody>
</table>

**💡 설명**

<div class="wda-callout wda-ci">
  <p>의사코드를 코드 에디터에 주석으로 먼저 붙여넣고, 그 아래에 한 줄씩 실제 코드를 채워나가는 방식이 효과적입니다. "무엇을 할지"와 "어떻게 문법으로 쓸지"를 분리해서 생각할 수 있습니다.</p>
</div>

---

## 4. 코드를 작성하며 디버깅하기

한 번에 전체를 완성하려 하지 말고, 작은 단위로 나누어 중간 결과를 확인합니다.

**• JavaScript: console.log로 중간 결과 확인**

```js
// 중간 결과를 눈으로 확인하며 진행
console.log("현재 sum:", sum);
console.log("현재 num:", num);

// 제출 전에는 반드시 지우거나 주석 처리
```

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">작은 단위로 확인</div><div class="wda-fcard-dsc">10줄마다 console.log로 확인하며 넘어가는 것이 100줄을 한 번에 짜고 에러를 찾는 것보다 빠릅니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">의미 있는 변수명</div><div class="wda-fcard-dsc">나중에 코드를 다시 볼 때, 혹은 다른 사람이 읽을 때 의도를 명확히 전달합니다.</div></div>
</div>

---

## 5. 검증 체크리스트

제출 버튼을 누르기 전 마지막으로 점검하는 목록입니다.

**• JavaScript: 경계값 검증 케이스**

```js
console.log(solution([1, 2, 3, 4, 5])); // 예시 케이스
console.log(solution([]));              // 빈 입력
console.log(solution([5]));             // 단일 요소
console.log(solution([-1, 2]));         // 음수 포함
```

<div class="wda-check-note">
  <ul>
    <li>문제의 예시 케이스를 통과하는가</li>
    <li>요소가 하나뿐일 때도 정상 동작하는가</li>
    <li>빈 배열이나 빈 문자열을 넣어도 에러가 나지 않는가</li>
    <li>디버깅용 console.log를 모두 지웠는가</li>
  </ul>
</div>

---

## 6. 시간 배분

60분 기준으로 각 단계에 어느 정도 시간을 쓸지 미리 정해두면 흔들리지 않습니다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">읽기</div><div class="wda-fnode-dsc">5분</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">분석</div><div class="wda-fnode-dsc">5분</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">계획</div><div class="wda-fnode-dsc">10분</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">구현</div><div class="wda-fnode-dsc">30분</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">검증</div><div class="wda-fnode-dsc">10분</div></div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>계획에 10분을 투자하면 구현이 훨씬 빨라집니다. 계획 없이 바로 코드를 짜면 중간에 막혀 처음부터 다시 짜는 경우가 더 많아, 오히려 시간이 더 오래 걸립니다.</p>
</div>

---

## 7. ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li><strong>Dry Run</strong>은 예시를 손으로 따라가며 변수 변화를 한 단계씩 기록하는 검증 기법이다.</li>
    <li>예시가 여러 개면 <strong>공통 패턴</strong>을 비교해 숨은 규칙을 찾는다.</li>
    <li>의사코드는 <strong>한 줄씩</strong> 실제 코드로 옮기며, 주석으로 남겨두면 변환이 쉬워진다.</li>
    <li>전체를 한 번에 짜기보다 <strong>작은 단위로 나눠 console.log</strong>로 확인하는 것이 더 빠르다.</li>
    <li>60분 기준 권장 시간 배분은 <strong>읽기 5 · 분석 5 · 계획 10 · 구현 30 · 검증 10분</strong>이다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 계획 없이 바로 코드를 짜는 게 더 빠르다?</div>
    <div class="wda-mistake-right">정답: 계획 없이 시작하면 중간에 막혀 <strong>시행착오만 반복</strong>해 오히려 더 오래 걸린다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 처음부터 완벽하게 전체 코드를 한 번에 완성해야 한다?</div>
    <div class="wda-mistake-right">정답: 의사코드를 <strong>한 줄씩 변환</strong>하며 console.log로 중간 결과를 확인하는 작은 단위 작성이 더 안전하다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 주어진 예시 케이스만 통과하면 제출해도 된다?</div>
    <div class="wda-mistake-right">정답: 빈 입력, 단일 요소, 음수 같은 <strong>경계값</strong>까지 직접 만들어 검증해야 한다.</div>
  </div>
</div>

**🧩 풀이 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 60분 시간 배분</div>
    <div class="wda-formula-block-body"><code>5 · 5 · 10 · 30 · 10분</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 검증 순서</div>
    <div class="wda-formula-block-body"><code>예시 → 빈 입력 → 단일 요소 → 음수</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 조건 필터링 누적</div>
    <div class="wda-formula-block-body"><code>if (num % 2 === 0) sum += num;</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Dry Run이란?</div>
    <div class="wda-flip-back">입출력 예시를 손으로 직접 따라가며 변수의 변화 과정을 하나씩 기록해보는 것입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">여러 예시를 비교하면 무엇을 알 수 있나요?</div>
    <div class="wda-flip-back">문제에 숨어 있는 공통 규칙(평균, 합계 등)을 확인할 수 있습니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">디버깅할 때 권장하는 방식은?</div>
    <div class="wda-flip-back">한 번에 다 짜지 않고, 작은 단위로 나눠 console.log로 중간 결과를 확인합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">60분 중 계획 수립에 권장되는 시간은?</div>
    <div class="wda-flip-back">10분입니다. 계획에 시간을 투자하면 구현이 훨씬 빨라집니다.</div>
  </div>
</div>
