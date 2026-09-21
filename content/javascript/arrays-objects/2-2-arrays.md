---
title: "2-2 배열로 여러 데이터 관리하기"
status: "completed"
description: "배열 생성부터 접근, 추가/제거, 순회, 배열 메서드, 복사까지 배열의 핵심 개념을 정리한다."
category: "JavaScript"
section: "Arrays & Objects"
tags:
  - javascript
  - arrays
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
.wda-callout p{margin:0 0 .45rem;font-size:.9rem;line-height:1.75}
.wda-callout p:last-child{margin-bottom:0}
.wda-callout ul{margin:.35rem 0 0;padding-left:1.1rem}
.wda-callout li{margin:.24rem 0;line-height:1.75;font-size:.83rem}
.wda-callout .wda-clabel{font-size:.7rem;line-height:1.3}
/* 핵심 요약 전용 복습 UI — JavaScript 1-1~1-5·2-1 기준과 동일. 색은 background/border/accent에만 쓰고,
   본문 텍스트는 카드 색과 무관하게 진회색(#2C2840)·strong은 #1F1B2E로 고정한다. */
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
  • <strong>배열 개념 이해</strong> — 여러 값을 순서대로 담는 배열이 왜 필요한지 설명할 수 있다.<br>
  • <strong>접근과 수정</strong> — 인덱스와 length로 배열 값을 읽고 수정할 수 있다.<br>
  • <strong>추가/제거 메서드 활용</strong> — push/pop/unshift/shift/splice로 배열 앞뒤와 중간을 다룰 수 있다.<br>
  • <strong>배열 메서드 활용</strong> — map/filter/find 같은 메서드로 새로운 목록을 만들 수 있다.
</div>

---

## 1. 배열이 필요한 순간

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">❌ 변수를 따로따로 만들면</div>

**• JavaScript: 변수를 따로따로 만드는 경우**

```javascript
const task1 = "보고서 작성";
const task2 = "회의 준비";
const task3 = "이메일 회신";
```

할일이 늘어날 때마다 변수를 계속 새로 만들어야 한다.

</div>

<div class="wda-compare-card wda-modern">

<div class="wda-compare-ttl">✅ 배열 하나로 묶으면</div>

**• JavaScript: 배열 하나로 묶기**

```javascript
const taskList = [
  "보고서 작성",
  "회의 준비",
  "이메일 회신",
];
```

할일이 몇 개든 변수 하나로 관리할 수 있다.

</div>

</div>

---

## 2. 배열은 순서가 있는 값 목록이다

대괄호 `[]`로 만들며, 담은 순서 그대로 유지된다.

**• JavaScript: 배열 만들기**

```javascript
const taskList = ["보고서 작성", "회의 준비", "이메일 회신"];

console.log(taskList);
// ["보고서 작성", "회의 준비", "이메일 회신"]
```

**💡 보충 설명**

<div class="wda-callout wda-ci">
  배열 안에는 문자열, 숫자, 불리언처럼 서로 다른 타입의 값도 함께 담을 수 있다. 순서를 가진 목록을 다룰 때는 변수 여러 개보다 배열 하나가 훨씬 다루기 쉽다.
</div>

---

## 3. 인덱스와 length 이해하기

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">인덱스 (index)</div>
    각 값의 위치 번호 — 0부터 시작한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">length</div>
    배열에 들어있는 값의 전체 개수.
  </div>
</div>

**• JavaScript: 인덱스로 값 읽기**

```javascript
const taskList = ["보고서 작성", "회의 준비", "이메일 회신"];

console.log(taskList[0]);
// "보고서 작성"

console.log(taskList.length);
// 3
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <code>length</code>는 마지막 인덱스가 아니라 <strong>개수</strong>다. 마지막 값은 <code>taskList[taskList.length - 1]</code>로 접근한다.
</div>

**• JavaScript: length로 마지막 값 접근하기**

```javascript
console.log(taskList[taskList.length - 1]);
// "이메일 회신"
```

---

## 4. 배열 값 읽기와 수정하기

**• JavaScript: 배열 값 수정하기**

```javascript
const taskList = ["보고서 작성", "회의 준비", "이메일 회신"];

taskList[1] = "회의 진행";

console.log(taskList);
// ["보고서 작성", "회의 진행", "이메일 회신"]
```

**• JavaScript: 존재하지 않는 인덱스 접근하기**

```javascript
console.log(taskList[10]);
// undefined — 없는 인덱스를 읽으면 undefined가 나온다
```

---

## 5. 배열 끝에서 추가/삭제하기: push / pop

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">push()</div>

배열 끝에 값을 추가한다.

**• JavaScript: push로 값 추가하기**

```javascript
const taskList = ["보고서 작성", "회의 준비"];

taskList.push("이메일 회신");

console.log(taskList);
// ["보고서 작성", "회의 준비", "이메일 회신"]
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">pop()</div>

배열 끝의 값을 꺼내며 제거한다.

**• JavaScript: pop으로 값 제거하기**

```javascript
const taskList = [
  "보고서 작성",
  "회의 준비",
  "이메일 회신",
];

const removedTask = taskList.pop();

console.log(removedTask);
// "이메일 회신"

console.log(taskList);
// ["보고서 작성", "회의 준비"]
```

</div>

</div>

---

## 6. 배열 앞에서 추가/삭제하기: unshift / shift

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">unshift()</div>

배열 맨 앞에 값을 추가한다.

**• JavaScript: unshift로 값 추가하기**

```javascript
const taskList = ["회의 준비", "이메일 회신"];

taskList.unshift("긴급 보고서 작성");

console.log(taskList);
// ["긴급 보고서 작성", "회의 준비", "이메일 회신"]
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">shift()</div>

배열 맨 앞의 값을 꺼내며 제거한다.

**• JavaScript: shift로 값 제거하기**

```javascript
const taskList = [
  "긴급 보고서 작성",
  "회의 준비",
  "이메일 회신",
];

const removedTask = taskList.shift();

console.log(removedTask);
// "긴급 보고서 작성"
```

</div>

</div>

**💡 보충 설명**

<div class="wda-callout wda-ci">
  <code>unshift</code>/<code>shift</code>는 나머지 값들의 인덱스를 전부 한 칸씩 옮겨야 해서, 배열이 클수록 <code>push</code>/<code>pop</code>보다 느리다.
</div>

---

## 7. 원하는 위치를 다루기: splice

**• JavaScript: splice로 값 끼워넣기**

```javascript
const taskList = ["보고서 작성", "회의 준비", "이메일 회신"];

taskList.splice(1, 0, "자료 조사");

console.log(taskList);
// ["보고서 작성", "자료 조사", "회의 준비", "이메일 회신"]
```

**• JavaScript: splice로 값 삭제하기**

```javascript
const taskList = ["보고서 작성", "자료 조사", "회의 준비", "이메일 회신"];

const removedTask = taskList.splice(1, 1);

console.log(removedTask);
// ["자료 조사"]

console.log(taskList);
// ["보고서 작성", "회의 준비", "이메일 회신"]
```

**📌 개념**

<div class="wda-callout wda-ci">
  <code>splice(시작 인덱스, 삭제 개수, 추가할 값...)</code> 형태로 사용한다. 삭제 개수를 0으로 두면 추가만 하고, 세 번째 인자를 생략하면 삭제만 한다. 반환값은 <strong>삭제된 값들을 담은 배열</strong>이다.
</div>

---

## 8. 배열을 하나씩 확인하기: for와 for...of

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">for</div>
    인덱스가 필요할 때 사용한다.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">for...of</div>
    값만 필요할 때 더 간결하게 쓴다.
  </div>
</div>

**• JavaScript: for로 배열 순회하기**

```javascript
const taskList = ["보고서 작성", "회의 준비", "이메일 회신"];

for (let i = 0; i < taskList.length; i++) {
  console.log(taskList[i]);
}
// 보고서 작성
// 회의 준비
// 이메일 회신
```

**• JavaScript: for...of로 배열 순회하기**

```javascript
const taskList = ["보고서 작성", "회의 준비", "이메일 회신"];

for (const task of taskList) {
  console.log(task);
}
// 보고서 작성
// 회의 준비
// 이메일 회신
```

---

## 9. 배열 메서드로 새 목록 만들기: map

**• JavaScript: map으로 새 배열 만들기**

```javascript
const taskList = ["보고서 작성", "회의 준비", "이메일 회신"];

const taskLabels = taskList.map((task) => `[할일] ${task}`);

console.log(taskLabels);
// ["[할일] 보고서 작성", "[할일] 회의 준비", "[할일] 이메일 회신"]
```

**💡 보충 설명**

<div class="wda-callout wda-ci">
  <code>map</code>은 각 값을 원하는 형태로 바꾼 <strong>새 배열</strong>을 반환한다. 원본 배열과 길이는 항상 같다.
</div>

---

## 10. 조건에 맞는 값만 고르기: filter

**• JavaScript: filter로 조건에 맞는 값 고르기**

```javascript
const taskList = ["보고서 작성", "회의 준비", "긴급 문의 응답"];

const urgentTasks = taskList.filter((task) => task.includes("긴급"));

console.log(urgentTasks);
// ["긴급 문의 응답"]
```

---

## 11. 하나만 찾기: find

**• JavaScript: find로 값 하나 찾기**

```javascript
const taskList = ["보고서 작성", "회의 준비", "긴급 문의 응답"];

const selectedTask = taskList.find((task) => task.includes("긴급"));

console.log(selectedTask);
// "긴급 문의 응답"
```

**💡 보충 설명**

<div class="wda-callout wda-ci">
  <code>find</code>는 조건에 맞는 <strong>첫 번째 값 하나</strong>만 반환한다. 맞는 값이 없으면 <code>undefined</code>를 반환한다.
</div>

---

## 12. 포함 여부 확인하기: includes

**• JavaScript: includes로 포함 여부 확인하기**

```javascript
const taskList = ["보고서 작성", "회의 준비"];

console.log(taskList.includes("회의 준비"));
// true

console.log(taskList.includes("이메일 회신"));
// false
```

---

## 13. 조건 검사하기: some / every

<div class="wda-compare">
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">some()</div>
    하나라도 조건을 만족하면 true.
  </div>
  <div class="wda-compare-card">
    <div class="wda-compare-ttl">every()</div>
    전부 조건을 만족해야 true.
  </div>
</div>

**• JavaScript: some으로 조건 검사하기**

```javascript
const taskList = ["보고서 작성", "회의 준비", "긴급 문의 응답"];

console.log(taskList.some((task) => task.includes("긴급")));
// true
```

**• JavaScript: every로 조건 검사하기**

```javascript
const taskList = ["보고서 작성", "회의 준비", "긴급 문의 응답"];

console.log(taskList.every((task) => task.includes("긴급")));
// false
```

---

## 14. 값을 하나로 모으기: reduce

**• JavaScript: reduce로 값 합산하기**

```javascript
const taskCounts = [3, 5, 2];

const totalCount = taskCounts.reduce((sum, count) => sum + count, 0);

console.log(totalCount);
// 10
```

**💡 보충 설명**

<div class="wda-callout wda-ci">
  <code>reduce</code>는 배열 전체를 하나의 값으로 누적해서 계산한다. 여기서는 합계를 구하는 기본 형태만 다룬다.
</div>

---

## 15. 원본을 바꾸는 메서드 vs 새 배열을 만드는 메서드

**▶ 원본 변경 메서드 vs 새 배열 반환 메서드**

| 구분 | 메서드 |
|---|---|
| 원본을 바꾼다 | `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse` |
| 새 배열을 반환한다 | `map`, `filter`, `find`, `slice`, `concat` |

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <code>sort()</code>는 기본적으로 값을 <strong>문자열 기준</strong>으로 비교해 정렬한다. 숫자를 그대로 정렬하면 크기 순서와 다르게 나올 수 있다.
</div>

**• JavaScript: sort 기본 동작 — 문자열 기준 정렬**

```javascript
const taskDays = [10, 1, 2, 20];

console.log(taskDays.sort());
// [1, 10, 2, 20] — 문자열 기준으로 정렬되어 크기 순서와 다르다
```

**• JavaScript: 비교 함수로 숫자 정렬하기**

```javascript
const taskDays = [10, 1, 2, 20];

console.log(taskDays.sort((a, b) => a - b));
// [1, 2, 10, 20] — 비교 함수를 넣으면 숫자 크기로 정렬된다
```

---

## 16. 배열 복사와 spread 문법

**• JavaScript: 배열 대입 — 참조 공유**

```javascript
const taskList = ["보고서 작성", "회의 준비"];
const copiedList = taskList;

copiedList.push("이메일 회신");

console.log(taskList);
// ["보고서 작성", "회의 준비", "이메일 회신"] — 같은 배열을 가리켜 원본도 바뀐다
```

**• JavaScript: spread로 배열 복사하기**

```javascript
const taskList = ["보고서 작성", "회의 준비"];
const copiedList = [...taskList];

copiedList.push("이메일 회신");

console.log(taskList);
// ["보고서 작성", "회의 준비"] — 새 배열이라 원본은 그대로다
```

**💡 보충 설명**

<div class="wda-callout wda-ci">
  <code>...</code>(spread)로 복사하면 별개의 새 배열이 만들어진다. 다만 배열 안에 객체가 들어있다면 그 객체 자체는 같은 참조를 공유한다(얕은 복사) — 객체를 다루는 방법은 별도로 배운다.
</div>

---

## 17. 초보자가 자주 만나는 배열 실수

<div class="wda-fgrid">

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 1 · 인덱스를 1부터 세기</div>

**• JavaScript: 인덱스를 1부터 세는 실수**

```javascript
const taskList = ["보고서 작성", "회의 준비"];
console.log(taskList[1]);
// "회의 준비"
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> 인덱스는 0부터 시작하므로 <code>[1]</code>은 두 번째 값이다.<br>
  <strong>기억할 점:</strong> 첫 번째 값은 항상 <code>[0]</code>이다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 2 · length를 마지막 인덱스로 착각</div>

**• JavaScript: length를 마지막 인덱스로 착각하는 실수**

```javascript
const taskList = ["보고서 작성", "회의 준비"];
console.log(taskList[taskList.length]);
// undefined
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> length는 개수(2)이고, 마지막 인덱스는 length - 1(1)이다.<br>
  <strong>기억할 점:</strong> 마지막 값은 <code>taskList[taskList.length - 1]</code>이다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 3 · sort()가 숫자도 정렬해줄 거라는 착각</div>

**• JavaScript: sort()가 숫자도 정렬해줄 거라는 착각**

```javascript
const taskDays = [10, 1, 2];
console.log(taskDays.sort());
// [1, 10, 2]
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> sort()는 기본적으로 문자열 기준으로 비교한다.<br>
  <strong>기억할 점:</strong> 숫자 크기로 정렬하려면 비교 함수를 넣는다.
</div>

</div>

</div>

---

## 18. 실습 과제

아직 화면 조작(DOM)은 배우지 않았으니, 이번에도 Console 결과로 직접 확인한다.

**🎯 목표**

할일 목록을 배열로 관리하고, 배열 메서드로 가공한다.

**📋 요구사항**

• `taskList`에 `push`/`pop`으로 할일을 추가·제거한다.<br>
• `splice`로 중간에 새 할일을 끼워넣는다.<br>
• `filter`로 특정 조건에 맞는 할일만 골라낸다.<br>
• `reduce`로 할일 개수의 합계를 구한다.

**• JavaScript: 실습 구성 예시**

```javascript
// 구성 예시: 할일 추가/제거 / 중간 삽입 / 조건별 필터 / 합계 계산
```

**💡 힌트 1 — 추가와 제거**

**• JavaScript: 힌트 1 — 추가와 제거**

```javascript
const taskList = ["보고서 작성", "회의 준비"];

taskList.push("이메일 회신");

console.log(taskList);
// ["보고서 작성", "회의 준비", "이메일 회신"]
```

**💡 힌트 2 — 조건에 맞는 값 고르기**

**• JavaScript: 힌트 2 — 조건에 맞는 값 고르기**

```javascript
const taskList = ["보고서 작성", "긴급 문의 응답", "회의 준비"];

const urgentTasks = taskList.filter((task) => task.includes("긴급"));

console.log(urgentTasks);
// ["긴급 문의 응답"]
```

**💡 힌트 3 — 값 하나로 모으기**

**• JavaScript: 힌트 3 — 값 하나로 모으기**

```javascript
const taskCounts = [2, 4, 1];

const totalCount = taskCounts.reduce((sum, count) => sum + count, 0);

console.log(totalCount);
// 7
```

**📌 정리 메모**

• 인덱스는 0부터 시작하고, length는 개수를 뜻한다.<br>
• push/pop/shift/unshift/splice/sort/reverse는 원본을 바꾼다.<br>
• 원본을 지키려면 spread(`...`)로 복사한다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>배열은 <code>[]</code>로 만들며, <strong>여러 값을 순서대로 담는</strong> 자료구조다.</li>
    <li><strong>인덱스는 0부터 시작</strong>하고, <strong>length는 마지막 인덱스가 아니라 전체 개수</strong>다.</li>
    <li><strong>push/pop</strong>은 배열 끝, <strong>unshift/shift</strong>는 배열 앞에서 추가·제거한다.</li>
    <li><code>splice(시작, 삭제개수, 추가값...)</code>로 원하는 위치를 자르거나 끼워넣을 수 있다.</li>
    <li><strong>map/filter/find/includes/some/every/reduce</strong>는 배열을 순회하며 새 값을 만들거나 조건을 검사한다.</li>
    <li><strong>push, pop, shift, unshift, splice, sort, reverse는 원본을 바꾸고</strong>, <strong>map, filter, find, slice, concat은 새 배열을 반환</strong>한다.</li>
    <li><strong>spread(...)</strong>로 복사하면 원본과 분리된 새 배열을 만들 수 있다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 배열 인덱스는 1부터 시작한다?</div>
    <div class="wda-mistake-right">정답: <strong>0부터</strong> 시작한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: length는 마지막 인덱스다?</div>
    <div class="wda-mistake-right">정답: length는 <strong>개수</strong>이고, 마지막 인덱스는 <strong>length - 1</strong>이다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: sort()는 숫자를 크기 순으로 정렬해준다?</div>
    <div class="wda-mistake-right">정답: 기본은 <strong>문자열 기준</strong>이라, 숫자로 정렬하려면 비교 함수를 직접 넣어야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 배열을 다른 변수에 대입하면 복사된다?</div>
    <div class="wda-mistake-right">정답: <strong>같은 배열을 가리킬 뿐</strong>이다 — 복사하려면 <strong>spread(...)</strong>를 쓴다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 끝/앞 조작</div>
    <div class="wda-formula-block-body">
      <code>push/pop = 끝</code><br>
      <code>unshift/shift = 앞</code>
    </div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 원본 변경 여부</div>
    <div class="wda-formula-block-body">
      <code>push·pop·shift·unshift·splice·sort·reverse = 원본 변경</code><br>
      <code>map·filter·find·slice·concat = 새 배열</code>
    </div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 복사</div>
    <div class="wda-formula-block-body">
      <code>[...arr] = 새 배열 복사</code>
    </div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">배열 인덱스는 몇부터 시작하나?</div>
    <div class="wda-flip-back">0부터 시작한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">length가 알려주는 것은?</div>
    <div class="wda-flip-back">배열에 들어있는 값의 개수다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">push/pop과 unshift/shift의 차이는?</div>
    <div class="wda-flip-back">push/pop은 배열 끝, unshift/shift는 배열 앞에서 추가·제거한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">splice의 기본 형태는?</div>
    <div class="wda-flip-back">splice(시작 인덱스, 삭제 개수, 추가할 값...)이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">map과 filter의 차이는?</div>
    <div class="wda-flip-back">map은 값을 변환한 새 배열, filter는 조건에 맞는 값만 골라낸 새 배열을 반환한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">원본을 바꾸는 대표 메서드는?</div>
    <div class="wda-flip-back">push, pop, shift, unshift, splice, sort, reverse다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">배열을 안전하게 복사하려면?</div>
    <div class="wda-flip-back">spread(...arr)를 사용한다.</div>
  </div>
</div>
