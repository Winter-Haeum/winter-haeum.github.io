---
title: "3-2 Math 객체"
status: "completed"
description: "Math.max/min, round/ceil/floor, random 등 Math 객체의 핵심 기능과, 몫과 나머지·2D 좌표 변환·소수 판별 같은 코딩테스트 수치 계산 패턴을 정리한다."
category: "Coding Test"
section: "Coding Test"
tags:
  - coding-test
  - math
  - javascript
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
  • <strong>기본 연산</strong> — max/min, round/ceil/floor, abs로 값을 다룹니다<br>
  • <strong>랜덤 범위 만들기</strong> — Math.random으로 원하는 범위의 정수를 만듭니다<br>
  • <strong>수치 계산 패턴</strong> — 몫과 나머지, 2D 좌표 변환, 소수 판별 패턴을 익힙니다
</div>

---

## 1. Math는 정적 객체다

`Math`는 인스턴스를 만들지 않고 이름에 바로 마침표를 찍어 사용하는 내장 객체입니다.

**• JavaScript: Math 정적 객체 사용**

```js
Math.max(1, 5, 3); // 5 — new Math() 없이 바로 사용
```

---

## 2. 최댓값·최솟값

배열을 그대로 넘길 수 없으므로, 스프레드 연산자로 풀어서 넣습니다.

**• JavaScript: 배열 최댓값·최솟값**

```js
const arr = [1, 5, 3, 9, 2];

Math.max(...arr); // 9
Math.min(...arr); // 1

// 값의 범위를 제한하는 클램핑 패턴
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><code>Math.max(arr)</code>처럼 배열을 그대로 넣으면 <strong>NaN</strong>이 나옵니다. 반드시 <code>Math.max(...arr)</code>처럼 펼쳐 넣어야 합니다.</p>
</div>

---

## 3. 반올림, 올림, 내림

**▶ round·ceil·floor 비교**

<table class="wda-mtable">
<thead><tr><th>값</th><th>round(반올림)</th><th>ceil(올림)</th><th>floor(내림)</th></tr></thead>
<tbody>
<tr><td>3.7</td><td>4</td><td>4</td><td>3</td></tr>
<tr><td>-3.7</td><td>-4</td><td>-3</td><td>-4</td></tr>
</tbody>
</table>

**💡 설명**

<div class="wda-callout wda-ci">
  <p>음수에서는 <code>ceil</code>과 <code>floor</code>의 방향이 헷갈리기 쉽습니다. floor는 항상 "더 작은 정수 방향"으로 움직이므로, -3.7보다 작은 정수 중 가장 큰 값인 -4가 됩니다.</p>
</div>

소수점 특정 자리에서 반올림하려면 `toFixed`를 쓰되, 반환값이 **문자열**이라는 점에 주의합니다.

**• JavaScript: toFixed로 소수점 자리 반올림**

```js
(3.14159).toFixed(2);       // "3.14" (문자열)
Number((3.14159).toFixed(2)); // 3.14 (다시 숫자로)
```

---

## 4. 절댓값과 거듭제곱

**• JavaScript: 절댓값과 거듭제곱**

```js
Math.abs(-5);        // 5 — 부호 없이 크기만 필요할 때
Math.abs(a - b);      // 두 값의 차이(순서 무관)

2 ** 3;               // 8 (Math.pow(2, 3)과 동일, 더 간결)
Math.sqrt(dx ** 2 + dy ** 2); // 두 점 사이 거리(피타고라스 정리)
```

---

## 5. 원하는 범위의 랜덤 정수 만들기

`Math.random()`은 0 이상 1 미만의 실수를 반환합니다. 정수 범위가 필요하면 `Math.floor`와 함께 씁니다.

**▶ 랜덤 정수 범위 공식**

<table class="wda-mtable">
<thead><tr><th>원하는 범위</th><th>공식</th></tr></thead>
<tbody>
<tr><td>0 ~ N-1</td><td><code>Math.floor(Math.random() * N)</code></td></tr>
<tr><td>min ~ max (max 포함)</td><td><code>Math.floor(Math.random() * (max - min + 1)) + min</code></td></tr>
</tbody>
</table>

**• JavaScript: 배열에서 무작위 요소 뽑기**

```js
// 배열에서 무작위 요소 하나 뽑기
const arr = ['a', 'b', 'c'];
const picked = arr[Math.floor(Math.random() * arr.length)];
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><code>Math.random()</code>은 암호학적으로 안전하지 않습니다. 보안이 필요한 값을 만들 때는 <code>crypto.getRandomValues()</code> 같은 별도 API를 사용해야 합니다.</p>
</div>

---

## 6. 코테 패턴 ① 몫과 나머지

JS는 모든 숫자가 실수로 취급되어, `7 / 3`은 `2`가 아니라 `2.333...`이 나옵니다.

**• JavaScript: 몫과 나머지 구하기**

```js
const quotient = Math.floor(7 / 3); // 2 (몫)
const remainder = 7 % 3;            // 1 (나머지)
```

나머지 연산자(`%`)는 짝수/홀수 판별(`num % 2 === 0`)이나 배수 확인에도 자주 쓰입니다.

---

## 7. 코테 패턴 ② 2D 좌표 ↔ 1D 인덱스 변환

격자(그리드) 문제에서 2차원 좌표를 1차원 배열 인덱스로 오갈 때 쓰는 공식입니다.

**• JavaScript: 2D 좌표를 1D 인덱스로 변환**

```js
// (row, col) → 1차원 인덱스 (가로 길이 width 기준)
const row = 2;
const col = 3;
const width = 5;

const index = row * width + col;
console.log(index); // 13
```

**• JavaScript: 1D 인덱스를 2D 좌표로 복구**

```js
// 1차원 인덱스 → (row, col) 복구
const targetIndex = 13;
const boardWidth = 5;

const targetRow = Math.floor(targetIndex / boardWidth);
const targetCol = targetIndex % boardWidth;
console.log(targetRow, targetCol); // 2 3
```

---

## 8. 코테 패턴 ③ 소수 판별

1부터 N까지 전부 나눠보면 N이 클 때 너무 느립니다. 약수는 항상 짝을 이루므로, **제곱근까지만** 확인해도 충분합니다.

**• JavaScript: 소수 판별 함수**

```js
const isPrime = (n) => {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
};
```

N이 10억이어도 약 3만 번(√1,000,000,000 ≈ 31,622)만 반복하면 됩니다.

---

## 9. 흔한 실수

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>Math.max/min에 배열을 그대로 넘기는 경우</strong></p>
  <p><code>Math.max(arr)</code>는 NaN을 반환합니다. 스프레드 연산자로 <code>Math.max(...arr)</code>처럼 풀어 넣어야 합니다.</p>
</div>

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p><strong>toFixed 결과를 숫자로 착각하는 경우</strong></p>
  <p><code>toFixed()</code>는 문자열을 반환하므로, 이후 계산이 필요하면 <code>Number()</code>로 다시 변환해야 합니다.</p>
</div>

---

## 10. ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>Math는 <strong>정적 객체</strong>라 인스턴스 없이 <code>Math.xxx()</code> 형태로 바로 사용한다.</li>
    <li><code>Math.max</code>/<code>min</code>은 배열을 직접 못 받으므로 <strong>스프레드 연산자</strong>로 풀어서 넣는다.</li>
    <li><code>Math.random()</code>은 0 이상 1 미만이며, 정수 범위를 얻으려면 <strong>Math.floor와 함께</strong> 쓴다.</li>
    <li>몫이 필요하면 <code>Math.floor(a / b)</code>, 나머지는 <code>a % b</code>를 쓴다.</li>
    <li>소수 판별은 N까지 다 나누지 않고 <strong>제곱근(√N)까지만</strong> 확인해도 충분하다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: ceil과 floor는 음수에서도 직관대로 동작한다?</div>
    <div class="wda-mistake-right">정답: floor는 항상 <strong>더 작은 정수 방향</strong>으로 움직여, -3.7의 floor는 -4가 된다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: Math.max(arr)처럼 배열을 그대로 넣어도 된다?</div>
    <div class="wda-mistake-right">정답: <strong>NaN</strong>이 나온다. 반드시 <code>Math.max(...arr)</code>처럼 스프레드로 풀어 넣어야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: toFixed(2)의 결과는 숫자다?</div>
    <div class="wda-mistake-right">정답: <strong>문자열</strong>을 반환하므로, 계산이 더 필요하면 <code>Number()</code>로 다시 숫자로 바꿔야 한다.</div>
  </div>
</div>

**🧩 풀이 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · N~M 정수 랜덤</div>
    <div class="wda-formula-block-body"><code>Math.floor(Math.random()*(max-min+1))+min</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 2D→1D 인덱스</div>
    <div class="wda-formula-block-body"><code>row * width + col</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 소수 판별</div>
    <div class="wda-formula-block-body"><code>i&lt;=Math.sqrt(n)까지만 나눠보기</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Math 객체는 왜 new Math()로 만들지 않나요?</div>
    <div class="wda-flip-back">Math는 정적 객체라 인스턴스를 만들 필요 없이 이름에 바로 마침표를 찍어 사용합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">Math.max에 배열을 넣으려면?</div>
    <div class="wda-flip-back">스프레드 연산자로 풀어서 Math.max(...arr)처럼 씁니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">정수 범위 랜덤값 공식은?</div>
    <div class="wda-flip-back">Math.floor(Math.random() * (max - min + 1)) + min 입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">2D 좌표를 1D 인덱스로 바꾸는 공식은?</div>
    <div class="wda-flip-back">row * width + col 입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">소수 판별을 N까지 안 하고 √N까지만 해도 되는 이유는?</div>
    <div class="wda-flip-back">약수는 항상 짝을 이루기 때문에 제곱근까지만 확인해도 충분합니다.</div>
  </div>
</div>
