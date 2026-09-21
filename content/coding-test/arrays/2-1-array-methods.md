---
title: "2-1 배열 메서드"
status: "completed"
description: "코딩테스트에서 배열 메서드를 언제 골라 써야 하는지 순회·카운팅·누적값·스택/큐·정렬 패턴 중심으로 정리한다."
category: "Coding Test"
section: "Coding Test"
tags:
  - coding-test
  - array
  - javascript
  - data-structure
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
  • <strong>순회 방식 선택</strong> — 값만 확인할지, 새 배열을 만들지에 따라 어떤 순회를 쓸지 판단합니다<br>
  • <strong>카운팅·누적값 패턴</strong> — 조건에 맞는 개수 세기, 합계·최댓값 누적 패턴을 익힙니다<br>
  • <strong>스택·큐·정렬 패턴</strong> — 배열 메서드 조합으로 자료구조를 만들고 올바르게 정렬합니다
</div>

---

## 1. 값만 볼지, 새 배열을 만들지 먼저 판단하기

push·map·filter 같은 배열 메서드의 기본 문법은 JavaScript 문서(2-2 배열, 2-4 고차 함수)에서 이미 다뤘습니다. 이 문서는 그 메서드들을 코딩테스트 문제에서 언제, 어떤 상황에 골라 써야 하는지 패턴 중심으로 정리합니다.

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">값만 확인 · for / for...of</div>
    합계를 구하거나 조건을 검사하는 등, <strong>결과가 배열이 아닌 단일 값</strong>일 때는 반복문으로 충분합니다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">새 배열 생성 · map / filter</div>
    <strong>변환된 배열 자체가 결과물</strong>일 때는 map·filter가 원본을 보존하면서 의도를 명확히 드러냅니다.
  </div>
</div>

**• JavaScript: 반복문과 map 비교**

```js
// 값만 필요할 때 — 굳이 새 배열을 만들 필요가 없음
function solution(numbers) {
  let sum = 0;
  for (const number of numbers) {
    sum += number;
  }
  return sum;
}

// 변환된 배열이 결과일 때 — map이 의도를 더 잘 드러냄
function solution(numbers) {
  return numbers.map(n => n * 2);
}
```

---

## 2. 카운팅 패턴: 조건에 맞는 개수 세기

"조건을 만족하는 것이 몇 개인가"를 묻는 문제는 두 가지 방식으로 풀 수 있습니다.

**• JavaScript: 카운팅 패턴**

```js
const scores = [88, 92, 55, 76, 60];

// 방법 1: filter로 걸러낸 뒤 길이를 셈
const passCount1 = scores.filter(s => s >= 60).length;

// 방법 2: reduce로 직접 누적
const passCount2 = scores.reduce((count, s) => s >= 60 ? count + 1 : count, 0);
```

**💡 설명**

<div class="wda-callout wda-ci">
  <p>단순히 개수만 필요하다면 <code>filter(...).length</code>가 더 읽기 쉽습니다. 조건을 만족하는 요소 자체도 함께 써야 한다면 <code>filter</code> 결과를 그대로 활용합니다.</p>
</div>

---

## 3. 누적값 패턴: 합계와 최댓값

`reduce`는 배열을 하나의 값으로 압축할 때 쓰는 패턴입니다.

**• JavaScript: reduce로 누적값 구하기**

```js
const prices = [1200, 3400, 800, 5600];

// 합계 누적
const total = prices.reduce((acc, price) => acc + price, 0);

// 최댓값 누적 (Math.max(...arr)로도 가능하지만, 조건이 붙으면 reduce가 유리)
const maxPrice = prices.reduce((acc, price) => price > acc ? price : acc, prices[0]);
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>reduce의 두 번째 인자(초깃값)를 빠뜨리면, 배열의 첫 요소가 초깃값으로 쓰이면서 의도와 다른 결과가 나올 수 있습니다. 합계처럼 항등원이 명확한 경우 초깃값을 항상 명시합니다.</p>
</div>

---

## 4. 인덱스가 필요한 순간

값뿐 아니라 위치 정보도 필요할 때는 인덱스를 함께 받습니다.

**• JavaScript: map으로 인덱스 함께 활용**

```js
const items = ['a', 'b', 'c'];

// 인덱스와 값을 함께 활용
const labeled = items.map((value, index) => `${index}: ${value}`);
// ['0: a', '1: b', '2: c']
```

값만 필요한데 습관적으로 인덱스를 함께 받으면 코드가 지저분해집니다. 인덱스가 실제로 결과에 쓰일 때만 두 번째 인자를 받습니다.

---

## 5. push·pop·shift·unshift로 스택·큐 만들기

**▶ 스택·큐 조합과 시간 복잡도**

<table class="wda-mtable">
<thead><tr><th>조합</th><th>동작</th><th>시간 복잡도</th></tr></thead>
<tbody>
<tr><td>push + pop</td><td>스택(LIFO) — 나중에 넣은 것이 먼저 나옴</td><td>O(1)</td></tr>
<tr><td>push + shift</td><td>큐(FIFO) — 먼저 넣은 것이 먼저 나옴</td><td>shift는 O(n)</td></tr>
</tbody>
</table>

**• JavaScript: 스택과 큐 구현**

```js
// 스택: 최근 방문 경로를 기록했다가 되짚어 나올 때
const stack = [];
stack.push('A');
stack.push('B');
stack.pop(); // 'B' — 가장 최근 것부터 꺼냄

// 큐: 처리 순서를 보장해야 할 때
const queue = [];
queue.push('A');
queue.push('B');
queue.shift(); // 'A' — 먼저 들어온 것부터 꺼냄
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><code>unshift</code>/<code>shift</code>는 앞쪽 요소를 넣거나 뺄 때마다 나머지 요소를 전부 한 칸씩 옮겨야 해서 O(n)입니다. 큐를 아주 많이 반복해서 조작해야 하는 문제라면 속도 저하를 염두에 두어야 합니다.</p>
</div>

---

## 6. 정렬 기준 잡기

`sort()`는 기본적으로 요소를 **문자열**로 바꿔 비교합니다. 숫자를 크기순으로 정렬하려면 비교 함수가 필요합니다.

**• JavaScript: 숫자 정렬 비교 함수**

```js
const nums = [10, 2, 30, 4];

nums.sort();                    // [10, 2, 30, 4] — 문자열 비교라 틀림
nums.sort((a, b) => a - b);     // [2, 4, 10, 30] — 오름차순
nums.sort((a, b) => b - a);     // [30, 10, 4, 2] — 내림차순
```

**💡 설명**

<div class="wda-callout wda-ci">
  <p>비교 함수가 반환하는 값이 음수면 <code>a</code>를 앞으로, 양수면 <code>b</code>를 앞으로 보냅니다. <code>a - b</code>는 오름차순, <code>b - a</code>는 내림차순이라고 공식처럼 외워둡니다.</p>
</div>

---

## 7. 중복 제거와 존재 확인

**• JavaScript: Set으로 중복 제거**

```js
const arr = [1, 2, 2, 3, 3, 3];

// 중복 제거: Set은 같은 값을 하나로 취급함
const unique = [...new Set(arr)]; // [1, 2, 3]

// 존재 확인: 있는지 여부만 필요하면 includes/some
arr.includes(2);          // true
arr.some(n => n > 2);     // true (조건에 맞는 게 하나라도 있는지)
```

배열이 매우 크고 존재 확인을 반복해야 한다면, `includes`는 매번 배열 전체를 훑어야 해서 느려질 수 있습니다. 이런 경우는 `Set`이나 객체 기반 조회가 더 유리합니다.

---

## 8. 흔한 실수

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>reduce 초깃값을 빠뜨리는 경우</strong></p>
  <p><code>arr.reduce((a, b) => a + b)</code>처럼 초깃값을 생략하면 배열의 첫 요소가 초깃값이 됩니다. 빈 배열이 들어오면 에러가 나므로, 항상 초깃값을 명시하는 습관이 안전합니다.</p>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>숫자 배열을 sort()로 바로 정렬하는 경우</strong></p>
  <p>비교 함수 없이 <code>sort()</code>만 쓰면 문자열 기준으로 정렬되어 <code>10</code>이 <code>2</code>보다 앞에 오는 결과가 나옵니다.</p>
</div>

---

## 9. ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>결과가 <strong>단일 값</strong>이면 반복문, <strong>새 배열</strong>이면 map/filter를 고른다.</li>
    <li>조건을 만족하는 개수는 <code>filter(...).length</code>, 합계·최댓값 같은 누적은 <code>reduce</code>로 구한다.</li>
    <li>push+pop은 <strong>스택(LIFO)</strong>, push+shift는 <strong>큐(FIFO)</strong>이며, shift/unshift는 <strong>O(n)</strong>이다.</li>
    <li>숫자 정렬은 반드시 <code>(a, b) =&gt; a - b</code> 비교 함수를 넣어야 한다.</li>
    <li>중복 제거는 <code>[...new Set(arr)]</code>로 한 줄에 처리한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: sort()는 숫자도 알아서 크기순으로 정렬해준다?</div>
    <div class="wda-mistake-right">정답: 기본 sort()는 <strong>문자열로 취급해 정렬</strong>하므로, 숫자 정렬은 비교 함수를 꼭 넣어야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: unshift도 push처럼 빠르다(O(1))?</div>
    <div class="wda-mistake-right">정답: unshift/shift는 나머지 요소를 전부 한 칸씩 밀어야 해서 <strong>O(n)</strong>이지만, push/pop은 뒤쪽만 건드려 <strong>O(1)</strong>이다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: reduce의 초깃값은 없어도 그만이다?</div>
    <div class="wda-mistake-right">정답: 초깃값을 생략하면 첫 요소가 초깃값으로 쓰여 의도와 다르게 동작하거나, 빈 배열에서 에러가 날 수 있다.</div>
  </div>
</div>

**🧩 풀이 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 숫자 오름차순 정렬</div>
    <div class="wda-formula-block-body"><code>arr.sort((a, b) =&gt; a - b)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 스택/큐 구현</div>
    <div class="wda-formula-block-body"><code>스택 = push+pop</code><br><code>큐 = push+shift</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 중복 제거</div>
    <div class="wda-formula-block-body"><code>[...new Set(arr)]</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">결과가 단일 값일 때와 배열일 때 각각 어떤 방식을 쓰나요?</div>
    <div class="wda-flip-back">단일 값이면 반복문, 새 배열이 결과면 map/filter를 사용합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">조건에 맞는 개수를 셀 때 쓰는 패턴은?</div>
    <div class="wda-flip-back">filter(...).length 또는 reduce로 직접 누적합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">push/pop과 shift/unshift의 시간 복잡도는?</div>
    <div class="wda-flip-back">push/pop은 O(1), shift/unshift는 나머지 요소를 밀어야 해서 O(n)입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">숫자를 오름차순으로 정렬하려면?</div>
    <div class="wda-flip-back">arr.sort((a, b) => a - b)처럼 비교 함수를 넣어야 합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">배열 중복을 제거하는 방법은?</div>
    <div class="wda-flip-back">[...new Set(arr)]로 중복을 없앤 뒤 다시 배열로 만듭니다.</div>
  </div>
</div>
