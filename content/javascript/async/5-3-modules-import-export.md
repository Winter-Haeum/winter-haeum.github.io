---
title: "5-3 모듈로 코드 나누기"
status: "completed"
description: "파일을 나누고 필요한 값만 export/import하는 방법을 named export와 default export 중심으로 강의 화면 코드 분리 시나리오로 정리한다."
category: "JavaScript"
section: "Async"
tags:
  - javascript
  - modules
  - import-export
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
/* 핵심 요약 전용 복습 UI — JavaScript 1-1~1-5·2-1~2-3·4-1~4-4·DOM 3-3·async 5-1·5-2·5-4·5-5 기준과 동일. 색은 background/border/accent에만
   쓰고, 본문 텍스트는 카드 색과 무관하게 진회색(#2C2840)·strong은 #1F1B2E로 고정한다. */
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
  • <strong>파일 분리 이유</strong> — 코드를 왜 여러 파일로 나누는지 설명할 수 있다.<br>
  • <strong>export/import 기본 문법</strong> — named export와 default export를 상황에 맞게 사용할 수 있다.<br>
  • <strong>가져오기 응용</strong> — 이름 바꾸기, 한 번에 모아 가져오기 문법을 쓸 수 있다.<br>
  • <strong>실행 환경 이해</strong> — 브라우저에서 모듈을 실행하는 조건과 경로 작성 규칙을 안다.
</div>

---

## 1. 모듈이 필요한 순간

강의 화면 코드가 `main.js` 하나에 강의 데이터, 화면 출력 함수, 설정값까지 전부 들어 있다고 하자. 파일이 길어질수록 필요한 함수를 찾기 어렵고, 같은 이름의 변수가 실수로 겹칠 위험도 커진다.

<div class="wda-fgrid">
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">역할별로 묶어서 관리</div>
    <div class="wda-fcard-dsc">강의 데이터, 화면 출력, 설정값을 각자의 파일로 분리한다</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">필요한 것만 가져다 쓰기</div>
    <div class="wda-fcard-dsc">다른 파일의 값을 전부가 아니라 필요한 만큼만 가져온다</div>
  </div>
  <div class="wda-fcard">
    <div class="wda-fcard-ttl">이름 충돌 방지</div>
    <div class="wda-fcard-dsc">파일마다 독립된 공간을 가져 같은 이름을 써도 안전하다</div>
  </div>
</div>

**📌 개념**

<div class="wda-callout wda-ci">
  모듈은 코드를 파일 단위로 나누고, 그중 <strong>export한 값만</strong> 다른 파일에서 <strong>import</strong>해 쓸 수 있게 해주는 문법이다.
</div>

---

## 2. 파일을 나누고 필요한 값만 공개하기

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 분리 전 (main.js)</div>

**• JavaScript: 파일 분리 전 코드**

```javascript
const lessonList = ["모듈"];

function formatLessonTitle(title) {
  return `[강의] ${title}`;
}
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 분리 후 (main.js)</div>

**• JavaScript: 파일 분리 후 import**

```javascript
import {
  lessonList,
  formatLessonTitle
} from "./lessons.js";
```

</div>

</div>

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">파일 분리</div><div class="wda-fnode-dsc">lessons.js / lessonView.js / lessonConfig.js</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">export</div><div class="wda-fnode-dsc">공개할 값을 지정</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">import</div><div class="wda-fnode-dsc">main.js에서 필요한 값을 가져옴</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">조립</div><div class="wda-fnode-dsc">가져온 값으로 화면을 구성</div></div>
</div>

---

## 3. named export

**• JavaScript: named export 하기**

```javascript
// lessons.js
export const lessonList = ["비동기 프로그래밍", "이벤트 처리", "모듈"];

export function formatLessonTitle(title) {
  return `[강의] ${title}`;
}
```

**📌 개념**

<div class="wda-callout wda-ci">
  값이나 함수 선언 앞에 <code>export</code>를 붙이면, 다른 파일에서 그 이름으로 가져다 쓸 수 있다. <code>export</code>를 붙이지 않은 값은 그 파일 밖에서 사용할 수 없다.
</div>

---

## 4. named import

**• JavaScript: named import 하기**

```javascript
// main.js
import { lessonList } from "./lessons.js";

console.log(lessonList);
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  named import는 export한 이름을 중괄호 안에 <strong>그대로</strong> 적어야 한다. <code>lessons.js</code>에서 <code>lessonList</code>라는 이름으로 export했다면, import할 때도 <code>lessonList</code>라고 적어야 한다.
</div>

---

## 5. 여러 값을 export/import하기

**• JavaScript: 여러 값 한꺼번에 export 하기**

```javascript
// lessons.js
export const lessonList = ["비동기 프로그래밍", "이벤트 처리", "모듈"];

const MAX_LESSON_COUNT = 10;

// 나중에 한꺼번에 내보내는 방식도 가능하다
export { MAX_LESSON_COUNT };
```

**• JavaScript: 여러 값 한꺼번에 import 하기**

```javascript
// main.js
import { lessonList, MAX_LESSON_COUNT } from "./lessons.js";

console.log(lessonList.length <= MAX_LESSON_COUNT);
```

**📌 개념**

<div class="wda-callout wda-ci">
  하나의 파일에서 <code>export</code>는 여러 번 쓸 수 있고, <code>export { a, b }</code>처럼 묶어서 한 번에 내보낼 수도 있다. import할 때도 콤마로 구분해 필요한 만큼 가져오면 된다.
</div>

---

## 6. default export

**• JavaScript: default export 하기**

```javascript
// lessonView.js
export default function renderLessonList(lessonList) {
  lessonList.forEach(title => console.log(title));
}
```

**• JavaScript: default import 하기**

```javascript
// main.js
import renderLessonList from "./lessonView.js";

renderLessonList(["비동기 프로그래밍", "이벤트 처리"]);
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <code>export default</code>는 <strong>한 파일에 하나만</strong> 쓸 수 있다. 파일에서 가장 대표적인 값 하나를 내보낼 때 사용한다.
</div>

---

## 7. named export와 default export 비교

**▶ named export vs default export**

| 구분 | named export | default export |
|---|---|---|
| 파일당 개수 | 여러 개 가능 | 하나만 가능 |
| import 문법 | `import { 이름 } from ...` | `import 이름 from ...` |
| 가져올 때 이름 | export한 이름과 동일해야 함 | 원하는 이름으로 자유롭게 지정 가능 |

**📌 개념**

<div class="wda-callout wda-ci">
  이름이 여러 개 필요하면 named export, 파일을 대표하는 값 하나면 default export를 사용한다.
</div>

---

## 8. import 이름 바꾸기

**• JavaScript: as로 import 이름 바꾸기**

```javascript
import { formatLessonTitle as formatTitle } from "./lessons.js";

console.log(formatTitle("모듈"));
```

**📌 개념**

<div class="wda-callout wda-ci">
  가져온 이름이 겹치거나 더 짧게 쓰고 싶을 때 <code>as</code>로 별명을 붙일 수 있다. 별명을 붙이면 그 파일 안에서는 원래 이름 대신 별명만 사용한다.
</div>

---

## 9. 모듈을 한 번에 모아 가져오기

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 named import</div>

**• JavaScript: named import 방식**

```javascript
import {
  lessonList,
  formatLessonTitle
} from "./lessons.js";
```

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">📝 namespace import</div>

**• JavaScript: namespace import 방식**

```javascript
import * as lessonModule from "./lessons.js";

lessonModule.lessonList;
lessonModule.formatLessonTitle("모듈");
```

</div>

</div>

**📌 개념**

<div class="wda-callout wda-ci">
  <code>import * as 이름</code>은 그 파일이 export한 모든 named export를 하나의 객체로 묶어서 가져온다. default export는 이 객체의 <code>default</code> 속성으로 포함된다.
</div>

---

## 10. side-effect import 짧게 보기

**• JavaScript: side-effect import 하기**

```javascript
import "./lessonConfig.js";
```

**📌 개념**

<div class="wda-callout wda-ci">
  값을 가져오지 않고 파일만 실행하고 싶을 때 이렇게 쓴다. <code>lessonConfig.js</code> 안에서 실행되는 초기화 코드만 필요할 때 사용하며, 자주 쓰는 패턴은 아니다.
</div>

**▶ import 형태별 문법 정리**

| 형태 | 문법 | 예시 |
|---|---|---|
| named import | `import { 이름 } from "..."` | `import { lessonList } from "./lessons.js"` |
| default import | `import 이름 from "..."` | `import renderLessonList from "./lessonView.js"` |
| namespace import | `import * as 이름 from "..."` | `import * as lessonModule from "./lessons.js"` |
| side-effect import | `import "..."` | `import "./lessonConfig.js"` |

---

## 11. import 경로 작성하기

**• JavaScript: 상대 경로로 import 하기**

```javascript
// 같은 폴더의 파일
import { lessonList } from "./lessons.js";

// 상위 폴더의 파일
import { lessonList } from "../lessons.js";
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  내 파일을 가져올 때는 반드시 <code>./</code> 또는 <code>../</code>로 시작해야 한다. 순수 브라우저 환경에서는 <code>.js</code> 확장자도 생략할 수 없다. <code>./</code>를 빼고 <code>"lessons.js"</code>라고만 쓰면 패키지 이름으로 오해되어 찾지 못한다.
</div>

---

## 12. 브라우저에서 모듈 사용하기

<div class="wda-compare">

<div class="wda-compare-card">

<div class="wda-compare-ttl">⚠️ 일반 script</div>

**• HTML: 일반 script 태그 — 에러 확인용**

```html
<script src="./main.js"></script>
```

`main.js`에 import가 있으면 "Cannot use import statement outside a module" 에러가 발생한다 (일부러 에러 확인용).

</div>

<div class="wda-compare-card">

<div class="wda-compare-ttl">✅ type="module"</div>

**• HTML: type="module" script 태그**

```html
<script type="module" src="./main.js"></script>
```

</div>

</div>

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">type="module"</div><div class="wda-fnode-dsc">script 태그에 지정</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">main.js 실행</div><div class="wda-fnode-dsc">import 문을 확인</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">파일 로드</div><div class="wda-fnode-dsc">lessons.js 등을 불러옴</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">조립 실행</div><div class="wda-fnode-dsc">가져온 값으로 코드 실행</div></div>
</div>

**📌 개념**

<div class="wda-callout wda-ci">
  Node.js에는 <code>require</code>/<code>module.exports</code>를 쓰는 CommonJS 방식도 있지만, 이 문서와 브라우저·최신 JavaScript는 <code>import</code>/<code>export</code>(ES Modules) 방식을 기준으로 한다.
</div>

---

## 13. 모듈 스코프와 strict mode

**• JavaScript: lessons.js의 독립 스코프**

```javascript
// lessons.js
const lessonList = ["비동기 프로그래밍"];
```

**• JavaScript: main.js의 독립 스코프**

```javascript
// main.js
const lessonList = ["다른 목록"];
```

**📌 개념**

<div class="wda-callout wda-ci">
  두 파일에 같은 이름 <code>lessonList</code>가 있어도 서로 다른 <strong>모듈 스코프</strong>에 있으므로 충돌하지 않는다. 모듈은 별도 설정 없이도 기본적으로 <strong>strict mode</strong>로 동작해, 선언하지 않은 변수에 값을 대입하는 등의 실수를 방지해준다.
</div>

---

## 14. 순환 참조는 왜 조심해야 하나

**• JavaScript: a.js — b.js를 가져오는 순환 참조**

```javascript
// a.js
import { b } from "./b.js";
export const a = "A";
```

**• JavaScript: b.js — a.js를 가져오는 순환 참조**

```javascript
// b.js
import { a } from "./a.js";
export const b = "B";
```

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <code>a.js</code>가 <code>b.js</code>를 가져오고, <code>b.js</code>가 다시 <code>a.js</code>를 가져오는 것을 <strong>순환 참조</strong>라 한다. 이런 구조에서는 아직 초기화되지 않은 값을 가져오게 되는데, 위 예제처럼 <code>const</code>/<code>let</code>으로 내보낸 값이면 <code>ReferenceError</code>가 발생하고, 함수 선언처럼 미리 호이스팅되는 값이면 문제없이 쓸 수 있다. 파일 사이의 의존 방향을 한쪽으로 정리하면 피할 수 있다.
</div>

---

## 15. 초보자가 자주 만나는 모듈 실수

<div class="wda-fgrid">

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 1 · named export를 괄호 없이</div>

**• JavaScript: named export를 괄호 없이 가져오는 실수**

```javascript
// import lessonList from "./lessons.js";
// ❌ named export는 중괄호가 필요하다
// (일부러 에러 확인용)

import { lessonList } from "./lessons.js";
// ✅
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> named export는 이름이 정확히 일치하는 중괄호 문법으로만 가져올 수 있다.<br>
  <strong>기억할 점:</strong> named는 중괄호, default는 괄호 없이.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 2 · 상대경로 ./ 생략</div>

**• JavaScript: 상대경로 ./ 생략하는 실수**

```javascript
// import { lessonList } from "lessons.js";
// ❌ 패키지 이름으로 오해되어 찾지 못한다
// (일부러 에러 확인용)

import { lessonList } from "./lessons.js";
// ✅
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> ./ 없이 쓰면 내 파일이 아니라 패키지 경로로 해석된다.<br>
  <strong>기억할 점:</strong> 내 파일을 가져올 때는 항상 ./ 또는 ../로 시작한다.
</div>

</div>

<div class="wda-fcard">

<div class="wda-fcard-ttl">🔹 실수 3 · default export를 두 번 사용</div>

**• JavaScript: default export를 두 번 쓰는 실수**

```javascript
// export default function renderLessonList() {}
// export default function renderLessonSummary() {}
// ❌ SyntaxError: 한 파일에 default export는
// 하나만 가능하다 (일부러 에러 확인용)
```

<div class="wda-fcard-dsc">
  <strong>왜 문제가 되나:</strong> default export는 파일당 하나로 제한된다.<br>
  <strong>기억할 점:</strong> 여러 값을 내보내야 하면 named export를 사용한다.
</div>

</div>

</div>

---

## 16. 실습 과제

**🎯 목표**

강의 화면 코드를 `lessons.js`, `lessonView.js`, `lessonConfig.js`, `main.js`로 나누고 조립한다.

**📋 요구사항**

• `lessons.js`에서 `lessonList`와 `formatLessonTitle`을 named export한다.<br>
• `lessonConfig.js`에서 `defaultLevel`을 named export한다.<br>
• `lessonView.js`에서 `renderLessonList`를 default export한다.<br>
• `main.js`에서 필요한 값을 모두 import해 `renderLessonList`를 호출한다.

**• JavaScript: 실습 구성 예시**

```javascript
// 구성 예시: lessons.js(named) / lessonConfig.js(named) / lessonView.js(default) / main.js(조립)
```

**💡 힌트 1 — lessons.js**

**• JavaScript: 힌트 1 — lessons.js**

```javascript
// lessons.js
export const lessonList = ["비동기 프로그래밍", "이벤트 처리", "모듈"];

export function formatLessonTitle(title) {
  return `[강의] ${title}`;
}
```

**💡 힌트 2 — lessonConfig.js / lessonView.js**

**• JavaScript: 힌트 2 — lessonConfig.js**

```javascript
// lessonConfig.js
export const defaultLevel = "beginner";
```

**• JavaScript: 힌트 2 — lessonView.js**

```javascript
// lessonView.js
export default function renderLessonList(lessonList) {
  lessonList.forEach(title => console.log(title));
}
```

**💡 힌트 3 — main.js**

**• JavaScript: 힌트 3 — main.js**

```javascript
// main.js
import { lessonList, formatLessonTitle } from "./lessons.js";
import { defaultLevel } from "./lessonConfig.js";
import renderLessonList from "./lessonView.js";

console.log(defaultLevel);
renderLessonList(lessonList.map(formatLessonTitle));
```

**📌 정리 메모**

• named export는 여러 개, default export는 파일당 하나다.<br>
• import 경로는 반드시 ./ 또는 ../로 시작한다.<br>
• 브라우저에서 실행하려면 script 태그에 type="module"이 필요하다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>모듈은 코드를 파일 단위로 나누고, <strong>export</strong>한 값만 다른 파일에서 <strong>import</strong>해 쓸 수 있게 해준다.</li>
    <li><strong>named export</strong>(<code>export { ... }</code>)는 한 파일에서 여러 개를 내보낼 수 있고, import할 때 이름이 정확히 같아야 한다.</li>
    <li><strong>default export</strong>는 한 파일에 하나만 쓸 수 있고, import할 때 원하는 이름을 자유롭게 붙일 수 있다.</li>
    <li>import 이름이 겹치거나 바꾸고 싶을 때는 <strong>as</strong>로 별명을 붙이고, <strong>import * as</strong>로 모든 named export를 한 객체로 모아 가져올 수 있다.</li>
    <li>내 파일을 가져올 때는 항상 <strong>./ 또는 ../</strong>로 시작해야 하며, 순수 브라우저 환경에서는 <strong>.js 확장자</strong>가 필요하다.</li>
    <li>브라우저에서 모듈을 쓰려면 <strong>type="module"</strong>이 필요하며, 모듈은 기본적으로 <strong>strict mode</strong>로 동작하고 파일마다 독립된 스코프를 가진다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: named export도 중괄호 없이 가져올 수 있다?</div>
    <div class="wda-mistake-right">정답: named import는 반드시 <strong>중괄호</strong>로 감싸고 이름이 똑같아야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: default export도 여러 번 쓸 수 있다?</div>
    <div class="wda-mistake-right">정답: default export는 <strong>파일당 하나만</strong> 쓸 수 있다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 내 파일을 가져올 때 경로에 ./를 생략해도 된다?</div>
    <div class="wda-mistake-right">정답: <code>./</code> 없이 쓰면 <strong>패키지 이름으로 오해</strong>되어 찾지 못한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 서로 다른 파일에 같은 이름의 변수가 있으면 충돌한다?</div>
    <div class="wda-mistake-right">정답: 모듈은 파일마다 <strong>독립된 스코프</strong>를 가지므로 이름이 같아도 충돌하지 않는다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · export</div>
    <div class="wda-formula-block-body"><code>named = export { } (여러 개)</code><br><code>default = export default (하나)</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · import</div>
    <div class="wda-formula-block-body"><code>named = import { 이름 }</code><br><code>default = import 아무이름</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 경로</div>
    <div class="wda-formula-block-body"><code>내 파일 = ./ 또는 ../로 시작</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 4 · 브라우저</div>
    <div class="wda-formula-block-body"><code>&lt;script type="module"&gt; 필요</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">named export와 default export의 가장 큰 차이는?</div>
    <div class="wda-flip-back">named는 한 파일에서 여러 개, default는 파일당 하나만 가능하다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">named import는 왜 중괄호가 필요한가?</div>
    <div class="wda-flip-back">export한 이름과 정확히 일치시켜 가져오기 위해서다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">default import에서 이름을 자유롭게 지을 수 있는 이유는?</div>
    <div class="wda-flip-back">파일의 대표 값 하나만 내보내므로 이름을 특정할 필요가 없기 때문이다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">import 이름을 바꾸고 싶을 때는?</div>
    <div class="wda-flip-back">as 키워드로 별명을 붙인다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">import * as로 가져오면 무엇을 얻나?</div>
    <div class="wda-flip-back">그 파일의 모든 named export를 담은 객체를 얻는다(default는 default 속성으로 포함).</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">브라우저에서 모듈을 쓰려면?</div>
    <div class="wda-flip-back">script 태그에 type="module"을 추가해야 한다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">순환 참조란?</div>
    <div class="wda-flip-back">두 파일이 서로를 import하는 구조로, const/let으로 내보낸 값을 초기화 전에 사용하면 ReferenceError가 발생할 수 있다.</div>
  </div>
</div>
