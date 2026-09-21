---
title: "1-3 문제 푸는 방법 알아보기"
status: "completed"
description: "이해-계획-구현-검증 4단계 문제 풀이 흐름과 의사코드 작성법, 막혔을 때 대처법과 시간 관리 전략을 정리한다."
category: "Coding Test"
section: "Coding Test"
tags:
  - coding-test
  - problem-solving
  - pseudocode
  - time-management
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
  • <strong>4단계 흐름 이해</strong> — 이해·계획·구현·검증으로 이어지는 문제 풀이 순서를 익힙니다<br>
  • <strong>의사코드 작성</strong> — 코드를 짜기 전에 논리를 한글로 정리하는 방법을 배웁니다<br>
  • <strong>실전 전략</strong> — 막혔을 때 대처법과 시간 배분 전략을 익힙니다
</div>

---

## 1. 문제 풀이 4단계

바로 코드를 치기 전에 앞 단계를 충분히 거치는 것이 핵심입니다.

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1. 이해</div><div class="wda-fnode-dsc">무엇을 요구하는지 파악</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2. 계획</div><div class="wda-fnode-dsc">풀이 순서를 미리 정리</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3. 구현</div><div class="wda-fnode-dsc">코드로 옮기기</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">4. 검증</div><div class="wda-fnode-dsc">테스트하고 제출</div></div>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>이해와 계획을 건너뛰고 바로 코드를 작성하면, 중간에 논리가 꼬여 처음부터 다시 짜는 경우가 많습니다. 1~2단계에 시간을 투자할수록 3~4단계가 오히려 빨라집니다.</p>
</div>

---

## 2. 1단계: 문제 이해하기

문제를 읽으면서 아래 네 가지를 확인합니다.

**▶ 문제 이해 확인 항목**

<table class="wda-mtable">
<thead><tr><th>확인 항목</th><th>질문</th><th>예시 (두 수의 합)</th></tr></thead>
<tbody>
<tr><td>입력</td><td>뭐가 주어지나요?</td><td>두 정수 a, b</td></tr>
<tr><td>출력</td><td>뭘 구해야 하나요?</td><td>a + b 값</td></tr>
<tr><td>조건</td><td>제약 조건은?</td><td>둘 다 -100 ~ 100 사이</td></tr>
<tr><td>예시</td><td>예제로 이해가 되나요?</td><td>a=3, b=5 → 8</td></tr>
</tbody>
</table>

---

## 3. 2단계: 계획 세우기

코드를 짜기 전에, 어떤 순서로 처리할지 한글로 먼저 적어보는 것을 **의사코드**라고 합니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">손으로 풀어보기</div><div class="wda-fcard-dsc">예제를 직접 손으로 따라가며 풀어봅니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">단계 나누기</div><div class="wda-fcard-dsc">큰 문제를 작은 단계로 쪼갭니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">의사코드 작성</div><div class="wda-fcard-dsc">문법에 얽매이지 않고 순서만 명확하게 적습니다.</div></div>
</div>

배열에서 가장 큰 수를 찾는 문제의 의사코드 예시입니다.

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>1. 첫 번째 값을 최댓값으로 둔다.<br>2. 배열을 처음부터 끝까지 돌면서, 현재 값이 최댓값보다 크면 최댓값을 그 값으로 바꾼다.<br>3. 최종 최댓값을 반환한다.</p>
</div>

---

## 4. 3단계: 코드로 옮기기

의사코드 한 줄이 코드 몇 줄로 바뀌는 과정입니다.

**• JavaScript: 의사코드를 실제 코드로 변환**

```js
function solution(numbers) {
  let max = numbers[0]; // 1. 첫 번째 값으로 초기화

  for (let i = 0; i < numbers.length; i++) { // 2. 배열 전체 반복
    if (numbers[i] > max) { // 3. 현재 값이 max보다 크면
      max = numbers[i];     //    max 갱신
    }
  }

  return max; // 4. 결과 반환
}
```

**💡 설명**

<div class="wda-callout wda-ci">
  <p><strong>초기값을 0으로 두면 안 되는 경우가 있습니다.</strong> 배열이 [-5, -3, -1]처럼 음수만 있다면 0이 최댓값이 되어버려 오답이 됩니다. 배열의 첫 번째 원소를 기준으로 삼는 것이 안전합니다. 이런 방식으로 하나씩 비교하며 찾는 것을 <strong>선형 탐색</strong>이라고 합니다.</p>
</div>

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">한 단계씩</div><div class="wda-fcard-dsc">의사코드를 한 줄씩 코드로 바꿔가며 천천히 옮깁니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">의미 있는 변수명</div><div class="wda-fcard-dsc">a, b보다는 max, count, result처럼 역할이 드러나는 이름을 씁니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">일단 동작하게</div><div class="wda-fcard-dsc">처음부터 완벽하고 짧은 코드를 노리지 말고, 먼저 동작하게 만듭니다.</div></div>
</div>

---

## 5. 4단계: 테스트하고 검증하기

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">테스트 방법</div>
    문제에 주어진 예제부터 확인하고, 최솟값·최댓값·빈 배열 같은 경계값을 넣어봅니다. 음수나 중복값 같은 특수 상황도 가정해 봅니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">자주 하는 실수</div>
    예제만 통과하고 제출하면, 화면에 보이지 않는 <strong>히든 테스트</strong>에서 틀릴 수 있습니다. 배열 길이가 0일 때 에러가 나는 경우도 흔합니다.
  </div>
</div>

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>"왜 틀렸지?" 싶을 때는 경계값부터 의심해봅니다.</p>
</div>

---

## 6. 막혔을 때 대처법

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">피해야 할 행동</div>
    멍하니 화면만 보거나, 이유 없이 코드를 이곳저곳 고치는 것은 시간만 소모합니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">권장하는 행동</div>
    문제를 다시 읽고, 예제를 손으로 풀어보고, [1, 2]처럼 아주 작은 입력부터 넣어봅니다. 완벽하지 않아도 일부만 맞추면 부분 점수를 받을 수 있습니다.
  </div>
</div>

**✅ 권장 방식**

<div class="wda-callout wda-cs">
  <p>10분 동안 고민해도 실마리가 안 보이면, 일단 다음 문제로 넘어갔다가 나중에 다시 돌아옵니다.</p>
</div>

---

## 7. 시간 관리 전략

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">훑어보기</div><div class="wda-fnode-dsc">전체 문제 확인</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">쉬운 문제 먼저</div><div class="wda-fnode-dsc">점수 확보</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">어려운 문제</div><div class="wda-fnode-dsc">남은 시간 집중</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">검토</div><div class="wda-fnode-dsc">마지막 재확인</div></div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  <p>어려운 문제 하나에 시간을 다 쓰다가 쉬운 문제조차 못 풀면 가장 큰 손해입니다. 확실히 풀 수 있는 문제로 점수를 먼저 확보한 뒤, 남은 시간을 어려운 문제에 투자합니다.</p>
</div>

---

## 8. ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>문제 풀이는 <strong>이해 → 계획 → 구현 → 검증</strong>의 4단계로 진행한다.</li>
    <li>문제를 읽을 때 <strong>입력 / 출력 / 조건 / 예시</strong> 4가지를 반드시 확인한다.</li>
    <li>계획 단계에서는 <strong>의사코드(한글 논리 흐름)</strong>를 먼저 적는다.</li>
    <li>검증은 <strong>예제 테스트 → 경계값 테스트</strong> 순으로 확인한다.</li>
    <li><strong>10분 이상</strong> 막히면 과감히 다음 문제로 넘어간다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 문제를 읽자마자 바로 코드부터 짜는 게 빠르다?</div>
    <div class="wda-mistake-right">정답: <strong>이해·계획</strong>을 충분히 거쳐야 구현·검증이 오히려 더 빨라진다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 예제 입력만 통과하면 정답이다?</div>
    <div class="wda-mistake-right">정답: 화면에 보이지 않는 <strong>히든 테스트 케이스</strong>가 있어 경계값까지 확인해야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 막히면 끝까지 그 문제만 붙잡고 있어야 한다?</div>
    <div class="wda-mistake-right">정답: <strong>10분 이상</strong> 고민해도 안 풀리면 다음 문제로 넘어갔다가 나중에 돌아오는 것이 낫다.</div>
  </div>
</div>

**🧩 풀이 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 4단계 순서</div>
    <div class="wda-formula-block-body"><code>이해 → 계획 → 구현 → 검증</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 이해 체크리스트</div>
    <div class="wda-formula-block-body"><code>입력·출력·조건·예시</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 검증 순서</div>
    <div class="wda-formula-block-body"><code>예제 테스트 → 경계값 테스트</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">문제 풀이 4단계는?</div>
    <div class="wda-flip-back">이해 → 계획 → 구현 → 검증 순으로 진행합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">문제 이해 단계에서 확인할 4가지는?</div>
    <div class="wda-flip-back">입력, 출력, 조건, 예시를 확인합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">의사코드란?</div>
    <div class="wda-flip-back">프로그래밍 문법 없이 한글로 논리 흐름을 적는 것입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">막혔을 때 골든타임 룰은?</div>
    <div class="wda-flip-back">10분 동안 고민해도 안 풀리면 다음 문제로 넘어갑니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">max 초기값을 0으로 잡으면 안 되는 이유는?</div>
    <div class="wda-flip-back">배열이 음수만 있을 경우 0이 최댓값이 되어버려 오답이 됩니다.</div>
  </div>
</div>
