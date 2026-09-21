---
title: "4-1 프로그래머스 Level 0-1 도전"
status: "completed"
description: "프로그래머스 문제 풀이 화면 구성과 초보자가 자주 겪는 실수를 정리하고, Level 0~1 추천 문제로 실전 감각을 키운다."
category: "Coding Test"
section: "Coding Test"
tags:
  - coding-test
  - programmers
  - practice
  - level0
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
  • <strong>화면 구성 파악</strong> — 문제 설명, 제한 사항, 실행과 제출의 차이를 이해합니다<br>
  • <strong>흔한 실수 예방</strong> — 초보자가 자주 겪는 실수를 미리 알아둡니다<br>
  • <strong>실전 감각</strong> — Level 0~1 추천 문제로 직접 풀이 경험을 쌓습니다
</div>

---

## 1. 문제 풀이 화면 구성

프로그래머스 문제 풀이 화면은 좌측 문제 설명과 우측 코드 에디터로 나뉩니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">문제 설명</div><div class="wda-fcard-dsc">무엇을 구하라는 것인지 정확히 파악합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">제한 사항</div><div class="wda-fcard-dsc">입력값의 범위와 조건입니다. 놓치면 오답 확률이 높아집니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">입출력 예시</div><div class="wda-fcard-dsc">예제로 문제를 제대로 이해했는지 다시 확인합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">실행 vs 제출</div><div class="wda-fcard-dsc">실행은 기본 케이스만 확인(채점 미반영), 제출은 전체 케이스를 채점합니다.</div></div>
</div>

**• JavaScript: 프로그래머스 기본 함수 형태**

```js
/**
 * 프로그래머스 기본 함수 형태
 * num1과 num2의 차를 구하는 예시
 */
function solution(num1, num2) {
  const answer = num1 - num2;
  return answer;
}
```

**💡 설명**

<div class="wda-callout wda-ci">
  <p>화면 하단의 테스트 케이스 추가 기능으로, 직접 생각한 경계값을 넣어 미리 확인할 수 있습니다. 제출 전에는 우측 상단의 언어 설정이 JavaScript로 되어 있는지도 확인합니다.</p>
</div>

---

## 2. 흔한 실수

**▶ 흔한 실수와 해결 방법**

<table class="wda-mtable">
<thead><tr><th>실수</th><th>내용</th><th>해결</th></tr></thead>
<tbody>
<tr><td>return 누락</td><td>계산만 하고 결과를 반환하지 않음</td><td>const로 저장했다면 마지막에 return</td></tr>
<tr><td>변수명 오타</td><td>매개변수 numbers를 number로 잘못 참조</td><td>선언한 이름 그대로 사용</td></tr>
<tr><td>제한사항 무시</td><td>n=0 같은 경계 조건을 고려하지 않음</td><td>예외 케이스를 먼저 처리</td></tr>
<tr><td>예제만 확인</td><td>주어진 예제만 맞고 히든 케이스에서 실패</td><td>경계값을 직접 테스트</td></tr>
</tbody>
</table>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><code>const result = n + 1;</code>처럼 계산만 하고 <code>return</code>하지 않으면, 값은 정확히 계산됐어도 함수 밖으로 전달되지 않아 오답 처리됩니다.</p>
</div>

---

## 3. 추천 문제로 감 잡기

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">Level 0 · 입문 (10문제+)</div><div class="wda-fcard-dsc">두 수의 차, 몫 구하기, 나머지 구하기, 배열 두 배 만들기, 나이 출력</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Level 0 · 기초 (20문제+)</div><div class="wda-fcard-dsc">배열 원소의 길이, 중복된 숫자 개수, 배열 자르기, 짝수 홀수 개수</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">Level 1 · 도전 (5문제+)</div><div class="wda-fcard-dsc">약수의 개수와 덧셈, 문자열 내림차순 정렬, 자릿수 더하기</div></div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  <p>프로그래머스에서 [코딩테스트 연습] → [난이도별 정렬]로 Level 0부터 차근차근 진행하는 것을 권장합니다. 제출 전에는 항상 극단적인 값(최소·최대)으로 직접 테스트해보는 습관을 들입니다.</p>
</div>

---

## 4. ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>문제 풀이 전 반드시 <strong>문제 설명·제한 사항·입출력 예시·실행 vs 제출</strong> 4가지를 확인한다.</li>
    <li><strong>실행</strong>은 채점에 반영되지 않고, <strong>제출</strong>만 최종 결과로 기록된다.</li>
    <li>계산만 하고 <strong>return</strong>하지 않으면 오답 처리된다.</li>
    <li>제한사항에 있는 <strong>경계값</strong>(0, 1, 빈 배열, 음수)을 무시하면 오답이나 런타임 에러가 날 수 있다.</li>
    <li>Level 0(입문·기초) → Level 1(도전) 순으로 문제 수를 채우는 것이 추천 경로다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: '실행' 버튼을 눌러 통과하면 채점도 통과한 것이다?</div>
    <div class="wda-mistake-right">정답: <strong>실행</strong>은 기본 테스트만 확인할 뿐 채점에 반영되지 않으며, 최종 채점은 <strong>제출</strong>이다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 계산 결과를 변수에 저장해두면 자동으로 정답 처리된다?</div>
    <div class="wda-mistake-right">정답: <strong>return</strong>하지 않으면 결과가 함수 밖으로 전달되지 않아 오답이 된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 주어진 예제만 통과하면 문제를 다 푼 것이다?</div>
    <div class="wda-mistake-right">정답: 예제는 통과해도 <strong>히든 케이스</strong>에서 실패할 수 있으므로 경계값을 직접 테스트해야 한다.</div>
  </div>
</div>

**🧩 풀이 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 제출 전 체크</div>
    <div class="wda-formula-block-body"><code>문제 설명 → 제한 사항 → 예시 → 실행 → 제출</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 흔한 실수 방지</div>
    <div class="wda-formula-block-body"><code>계산 후 반드시 return</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 경계값 테스트</div>
    <div class="wda-formula-block-body"><code>0, 1, 빈 배열, 음수를 직접 테스트</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">프로그래머스에서 '실행'과 '제출'의 차이는?</div>
    <div class="wda-flip-back">실행은 기본 테스트만 확인(채점 미반영), 제출은 모든 케이스를 채점해 최종 결과로 기록합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">결과를 계산만 하고 오답 처리되는 가장 흔한 이유는?</div>
    <div class="wda-flip-back">return 문을 빼먹어서 결과가 함수 밖으로 전달되지 않기 때문입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">예제만 통과했는데 오답이 나오는 이유는?</div>
    <div class="wda-flip-back">히든 케이스에서 실패했기 때문이며, 제출 전 경계값 테스트가 필요합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">추천 학습 경로 순서는?</div>
    <div class="wda-flip-back">Level 0(입문) → Level 0(기초) → Level 1(도전) 순으로 난이도를 올려갑니다.</div>
  </div>
</div>
