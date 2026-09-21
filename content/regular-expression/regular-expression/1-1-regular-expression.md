---
title: "1-1 정규표현식"
category: "frontend"
section: "regular-expression"
date: "2026-08-02"
status: "completed"
description: "문자열 패턴을 검사하는 정규표현식이 왜 필요한지, 자주 쓰는 기호들의 의미, 이메일·전화번호 같은 입문자용 예시를 정리합니다."
---

<style>
.wda-callout{border-radius:10px;padding:12px 14px;margin:.8rem 0 1.1rem;border-left:3px solid;font-size:.9rem;line-height:1.75}
.wda-ci{background:rgba(139,92,246,.06);border-color:#8b5cf6}
.wda-cw{background:rgba(245,158,11,.07);border-color:#f59e0b}
.wda-cs{background:rgba(34,197,94,.05);border-color:#22c55e}
.wda-cb{background:rgba(59,130,246,.06);border-color:#3b82f6}
.wda-clabel{font-size:.7rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px;display:block}
.wda-ci .wda-clabel{color:#8b5cf6}
.wda-cw .wda-clabel{color:#f59e0b}
.wda-cs .wda-clabel{color:#22c55e}
.wda-cb .wda-clabel{color:#3b82f6}
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
  • <strong>정규표현식이 필요한 이유 이해</strong> — 조건문 대신 정규식을 쓰면 무엇이 좋아지는지 파악합니다<br>
  • <strong>기본 기호 익히기</strong> — ^, $, ., *, +, ?, [], {}, | 의 의미를 정리합니다<br>
  • <strong>실전 패턴 읽기</strong> — 이메일·전화번호 같은 간단한 패턴을 직접 해석해봅니다<br>
  • <strong>사용상 주의점 파악</strong> — 정규식을 과하게 복잡하게 쓰면 왜 문제가 되는지 이해합니다
</div>

---

## 1. 정규표현식이란

**정규표현식(Regular Expression, 줄여서 정규식·Regex)**은 문자열이 특정 패턴(규칙)에 맞는지 검사하거나, 그 패턴에 맞는 부분을 찾아내는 도구입니다.

예를 들어 "입력값이 이메일 형식인지 확인해줘"라는 조건은 `if`문만으로 구현하려면 매우 길고 복잡한 코드가 필요합니다. 정규표현식을 쓰면 이런 규칙을 한 줄의 패턴으로 표현할 수 있습니다.

**• 이메일 형식 검사**

```js
const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
isEmail.test('test@gmail.com'); // true
isEmail.test('잘못된값');        // false
```

**💡 설명**

<div class="wda-callout wda-ci">
  <p>정규표현식은 회원가입 폼에서 아이디·비밀번호 형식을 검사하거나, 긴 텍스트에서 전화번호·이메일 같은 특정 정보만 뽑아낼 때 자주 쓰입니다. 문법은 낯설어 보이지만, 몇 가지 기호의 의미만 알면 대부분의 입문 단계 패턴은 읽고 쓸 수 있습니다.</p>
</div>

---

## 2. 자바스크립트에서 정규식 만들기

자바스크립트에서는 슬래시(`/`)로 패턴을 감싸서 정규식을 만듭니다.

**• 정규식 리터럴 구조**

```js
const regex = /abc/gi;
//            └┬┘└┬┘
//           패턴  플래그
```

**▶ 정규식 플래그 의미**

<table class="wda-mtable">
<thead><tr><th>플래그</th><th>의미</th></tr></thead>
<tbody>
<tr><td>g (Global)</td><td>일치하는 부분을 하나만 찾지 않고 전체에서 모두 찾음</td></tr>
<tr><td>i (Ignore Case)</td><td>영문 대소문자를 구분하지 않음</td></tr>
</tbody>
</table>

패턴이 일치하는지 확인할 때는 `test()`를, 문자열에서 일치하는 부분을 뽑아낼 때는 `match()`를 사용합니다.

**• test()와 match() 비교**

```js
/\d+/.test('전화번호 010');      // true — 숫자가 있는지 확인
'전화번호 010-1234'.match(/\d+/g); // ['010', '1234'] — 숫자 덩어리 추출
```

---

## 3. 자주 쓰는 기호

정규식의 기호는 크게 "어떤 문자인지"를 나타내는 것과 "몇 번 반복되는지"를 나타내는 것으로 나뉩니다.

**▶ 자주 쓰는 정규식 기호**

<table class="wda-mtable">
<thead><tr><th>기호</th><th>의미</th><th>예시</th></tr></thead>
<tbody>
<tr><td>.</td><td>줄바꿈을 제외한 아무 문자 1개</td><td>a.b → aab, a0b 모두 매칭</td></tr>
<tr><td>*</td><td>앞 문자가 0개 이상 반복</td><td>go*d → gd, god, good</td></tr>
<tr><td>+</td><td>앞 문자가 1개 이상 반복</td><td>go+d → god, good (gd는 제외)</td></tr>
<tr><td>?</td><td>앞 문자가 0개 또는 1개</td><td>https? → http, https</td></tr>
<tr><td>[]</td><td>대괄호 안 문자 중 하나</td><td>[abc] → a, b, c 중 하나</td></tr>
<tr><td>{n,m}</td><td>앞 문자가 n~m번 반복</td><td>\d{3,4} → 3~4자리 숫자</td></tr>
<tr><td>^</td><td>문자열의 시작</td><td>^Hello → Hello로 시작</td></tr>
<tr><td>$</td><td>문자열의 끝</td><td>World$ → World로 끝</td></tr>
<tr><td>|</td><td>여러 패턴 중 하나(OR)</td><td>cat\|dog → cat 또는 dog</td></tr>
</tbody>
</table>

여기에 특정 종류의 문자를 한 글자로 줄여 쓰는 문자 클래스도 함께 알아두면 좋습니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">\d</div><div class="wda-fcard-dsc">숫자 하나 (0~9). [0-9]와 같습니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">\w</div><div class="wda-fcard-dsc">영문·숫자·언더바(_) 하나. 아이디처럼 흔한 문자를 표현할 때 씁니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">\s</div><div class="wda-fcard-dsc">공백, 탭, 줄바꿈 같은 공백 문자 하나입니다.</div></div>
</div>

**💡 사용 팁**

<div class="wda-callout wda-cb">
  <p>중괄호 안의 쉼표 뒤에 공백을 넣으면(<code>{3, 4}</code>) 정규식이 의도대로 동작하지 않을 수 있습니다. 반드시 <code>{3,4}</code>처럼 공백 없이 붙여 써야 합니다.</p>
</div>

---

## 4. 실전 패턴 읽어보기

앞서 배운 기호를 조합하면 실제로 자주 쓰이는 검증 패턴을 만들 수 있습니다.

**▶ 실전 검증 패턴 예시**

<table class="wda-mtable">
<thead><tr><th>용도</th><th>패턴</th><th>해석</th></tr></thead>
<tbody>
<tr><td>전화번호</td><td><code>/^\d{2,3}-\d{3,4}-\d{4}$/</code></td><td>숫자 2~3자리 - 숫자 3~4자리 - 숫자 4자리</td></tr>
<tr><td>이메일</td><td><code>/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/</code></td><td>아이디 + @ + 도메인 + 마침표 + 최상위 도메인(2자 이상)</td></tr>
</tbody>
</table>

이메일 패턴에서 `\.`은 마침표 하나를 문자 그대로 찾으라는 뜻입니다. `.`은 원래 "아무 문자 1개"를 뜻하는 특별한 기호이므로, 진짜 마침표를 찾고 싶다면 앞에 역슬래시(`\`)를 붙여 이스케이프해야 합니다.

**• 전화번호 형식 검사**

```js
const phoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
phoneRegex.test('010-1234-5678'); // true
phoneRegex.test('02-123-4567');   // true
phoneRegex.test('010-12-34');     // false
```

---

## 5. 정규식을 쓸 때 기억할 것

정규식은 강력하지만, 조건을 너무 세밀하게 다 담으려 하면 패턴 자체가 길고 읽기 어려워집니다. 입문 단계에서는 완벽한 검증보다 **"기본적인 형식만 걸러낸다"**는 목표로 접근하는 것이 실용적입니다.

**💼 실무 팁**

<div class="wda-callout wda-cw">
  <p>이메일 형식을 100% 완벽하게 검증하는 정규식은 실무에서도 매우 길고 복잡합니다. 대부분의 서비스는 정규식으로 기본 형식만 확인하고, 실제 이메일이 유효한지는 인증 메일 발송 같은 별도 절차로 재확인합니다. 정규식 하나로 모든 예외를 처리하려 하기보다, 적당한 수준에서 멈추는 판단도 중요합니다.</p>
</div>

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>정규표현식은 <strong>문자열이 특정 패턴에 맞는지 검사</strong>하는 도구다.</li>
    <li>자바스크립트에서는 <strong>/패턴/플래그</strong> 형태로 만들고, <strong>test()</strong>로 검사, <strong>match()</strong>로 추출한다.</li>
    <li>자주 쓰는 기호는 <strong>^ $ . * + ? [] {} |</strong> 이며, <code>\d</code>, <code>\w</code>, <code>\s</code> 같은 문자 클래스도 함께 쓰인다.</li>
    <li>진짜 마침표를 찾을 때는 <strong>\.</strong>처럼 이스케이프해야 한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 정규식의 마침표(.)는 진짜 마침표를 뜻한다?</div>
    <div class="wda-mistake-right">정답: 정규식에서 <strong>.은 줄바꿈을 제외한 아무 문자 1개</strong>를 뜻한다. 진짜 마침표를 찾으려면 <code>\.</code>로 써야 한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 정규식 하나로 이메일 형식을 완벽하게 검증할 수 있다?</div>
    <div class="wda-mistake-right">정답: 실무에서도 정규식은 <strong>기본 형식만 걸러내는 용도</strong>로 쓰고, 실제 유효성은 인증 메일 발송 같은 별도 절차로 확인하는 경우가 많다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 형태</div>
    <div class="wda-formula-block-body"><code>/패턴/플래그</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 반복</div>
    <div class="wda-formula-block-body"><code>* 0개+ · + 1개+ · ? 0또는1</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 3 · 위치</div>
    <div class="wda-formula-block-body"><code>^ 시작 · $ 끝</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">정규식에서 \d는 무엇을 뜻하나요?</div>
    <div class="wda-flip-back">숫자 하나(0~9)를 뜻합니다. [0-9]와 같은 표현입니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">+ 와 * 의 차이는 무엇인가요?</div>
    <div class="wda-flip-back">+는 1개 이상 반복, *는 0개 이상 반복(없어도 됨)을 뜻합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">패턴이 문자열 전체와 정확히 일치하는지 검사하려면?</div>
    <div class="wda-flip-back">앞에는 ^(시작), 뒤에는 $(끝)를 붙여 전체 범위를 고정합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">이메일 정규식을 왜 완벽하게 만들려고 하지 않나요?</div>
    <div class="wda-flip-back">패턴이 지나치게 복잡해지고 읽기 어려워지기 때문에, 기본 형식만 걸러내고 나머지는 별도 절차로 확인하는 것이 실용적입니다.</div>
  </div>
</div>
