---
title: "2-3 Storage 파일 저장"
category: "frontend"
section: "services"
date: "2026-08-03"
status: "completed"
description: "이미지·문서 같은 파일을 저장하는 Firebase Storage의 역할과, 파일 업로드 후 다운로드 URL을 얻는 흐름, 보안 규칙 없이 파일을 무제한 공개하면 안 되는 이유를 정리합니다."
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
  • <strong>Storage의 역할</strong> — 이미지·파일처럼 용량이 큰 데이터를 저장하는 서비스임을 이해합니다<br>
  • <strong>업로드와 다운로드 URL</strong> — 파일을 올리고 웹에서 접근 가능한 주소를 얻는 흐름을 익힙니다<br>
  • <strong>Firestore와의 역할 분담</strong> — 데이터베이스와 파일 저장소를 왜 나눠 쓰는지 이해합니다<br>
  • <strong>보안 규칙의 필요성</strong> — 파일을 무제한 공개하면 안 되는 이유를 파악합니다
</div>

---

## 1. Storage는 파일 전용 저장소다

Firestore가 텍스트 위주의 데이터를 저장하는 데 특화되어 있다면, Storage는 이미지, 동영상, 문서처럼 **용량이 큰 파일**을 저장하기 위한 서비스입니다.

<div class="wda-fgrid">
  <div class="wda-fcard"><div class="wda-fcard-ttl">이미지</div><div class="wda-fcard-dsc">프로필 사진, 게시글 첨부 이미지 등을 저장합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">문서</div><div class="wda-fcard-dsc">PDF 같은 첨부 파일을 저장합니다.</div></div>
  <div class="wda-fcard"><div class="wda-fcard-ttl">동영상</div><div class="wda-fcard-dsc">비교적 큰 용량의 미디어 파일도 다룰 수 있습니다.</div></div>
</div>

**💡 설명**

<div class="wda-callout wda-ci">
  <p>Firestore 문서 하나의 용량에는 제한이 있어서, 이미지 파일 자체를 문서 안에 직접 넣지 않습니다. 보통은 파일을 Storage에 올리고, 그 파일의 주소(URL)만 문자열로 Firestore 문서에 저장하는 방식을 사용합니다.</p>
</div>

---

## 2. 파일 업로드와 다운로드 URL

**• JavaScript: 파일 업로드와 다운로드 URL 발급**

```js
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const storage = getStorage(app);

async function uploadImage(file) {
  // 1. 저장 위치 지정
  const storageRef = ref(storage, `images/${file.name}`);

  // 2. 파일 업로드
  const snapshot = await uploadBytes(storageRef, file);

  // 3. 웹에서 접근 가능한 다운로드 URL 발급
  const url = await getDownloadURL(snapshot.ref);
  return url;
}
```

<div class="wda-flow">
  <div class="wda-fnode"><div class="wda-fnode-ttl">1. 위치 지정</div><div class="wda-fnode-dsc">저장할 경로를 정함</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">2. 업로드</div><div class="wda-fnode-dsc">실제 파일 데이터를 전송</div></div>
  <div class="wda-farrow">→</div>
  <div class="wda-fnode"><div class="wda-fnode-ttl">3. URL 발급</div><div class="wda-fnode-dsc">웹에서 쓸 수 있는 주소를 받음</div></div>
</div>

Storage에 저장된 파일은 기본적으로 내부 전용 경로에 있기 때문에, 브라우저의 `<img>` 태그 등에서 바로 쓰려면 `getDownloadURL`로 접근 가능한 주소를 별도로 발급받아야 합니다.

---

## 3. 발급받은 URL은 Firestore와 함께 쓰인다

**• JavaScript: 다운로드 URL을 Firestore에 저장**

```js
import { addDoc, collection } from 'firebase/firestore';

async function savePost(title, imageUrl) {
  await addDoc(collection(db, 'posts'), {
    title,
    imageUrl, // Storage에서 받은 다운로드 URL을 문자열로 저장
  });
}
```

이렇게 하면 게시글을 불러올 때 Firestore에서 문서를 읽어오는 것만으로 이미지 주소까지 함께 확보할 수 있어, Storage에 매번 다시 파일 목록을 조회할 필요가 없습니다.

---

## 4. 보안 규칙 없이 파일을 무제한 공개하면 안 된다

**⚠️ 주의사항**

<div class="wda-callout wda-cw">
  <p>Firebase 콘솔에서 Storage를 처음 켤 때 "테스트 모드"를 선택하면, 일정 기간 동안 누구나 파일을 읽고 쓸 수 있는 상태가 됩니다. 이는 개발 편의를 위한 임시 설정일 뿐, 실제 서비스에서는 로그인한 사용자만 자신의 파일을 올리고, 필요한 범위에서만 파일을 읽을 수 있도록 보안 규칙을 반드시 설정해야 합니다.</p>
</div>

**• 설정: Storage 보안 규칙 예시**

```
// 보안 규칙 예시: 로그인한 사용자만 업로드 허용
match /images/{fileName} {
  allow read: if true;
  allow write: if request.auth != null;
}
```

보안 규칙을 설정하지 않은 채로 서비스를 운영하면, 누구나 파일을 마음대로 올리거나 지울 수 있는 상태가 되어 서비스에 심각한 문제가 생길 수 있습니다.

---

## ✅ 핵심 요약

**📌 먼저 외울 것**

<div class="wda-check-note">
  <ul>
    <li>Storage는 <strong>이미지·문서 같은 용량이 큰 파일</strong>을 저장하는 서비스다.</li>
    <li>파일을 업로드한 뒤 <strong>getDownloadURL</strong>로 웹에서 접근 가능한 주소를 얻는다.</li>
    <li>발급받은 URL은 보통 <strong>Firestore 문서에 문자열로 저장</strong>해 함께 관리한다.</li>
    <li>실제 서비스에서는 <strong>보안 규칙</strong>으로 업로드·다운로드 권한을 반드시 제한해야 한다.</li>
  </ul>
</div>

**🧠 헷갈리기 쉬운 것**

<div class="wda-mistake-notes">
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 이미지 파일도 Firestore 문서 안에 직접 저장하면 된다?</div>
    <div class="wda-mistake-right">정답: Firestore 문서는 <strong>용량 제한</strong>이 있어, 파일 자체는 <strong>Storage에 올리고 URL만 Firestore에 저장</strong>하는 방식을 사용한다.</div>
  </div>
  <div class="wda-mistake-note">
    <div class="wda-mistake-wrong">오해: 테스트 모드로 켜둔 Storage는 계속 그렇게 써도 안전하다?</div>
    <div class="wda-mistake-right">정답: 테스트 모드는 <strong>임시로 접근을 허용</strong>하는 상태이며, 실제 서비스에서는 <strong>보안 규칙을 반드시 설정</strong>해야 한다.</div>
  </div>
</div>

**🎯 최종 암기 공식**

<div class="wda-formula-board">
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 1 · 역할</div>
    <div class="wda-formula-block-body"><code>Storage = 파일 저장소</code></div>
  </div>
  <div class="wda-formula-block">
    <div class="wda-formula-block-ttl">공식 2 · 흐름</div>
    <div class="wda-formula-block-body"><code>업로드 → URL 발급 → Firestore 저장</code></div>
  </div>
</div>

**🎴 클릭 복습 카드**

<div class="wda-flip-deck">
  <div class="wda-flip-card">
    <div class="wda-flip-front">Storage는 주로 어떤 데이터를 저장하나요?</div>
    <div class="wda-flip-back">이미지, 동영상, 문서처럼 용량이 큰 파일을 저장합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">업로드된 파일을 브라우저에서 쓰려면 무엇이 필요한가요?</div>
    <div class="wda-flip-back">getDownloadURL로 발급받은 웹 접근용 URL이 필요합니다.</div>
  </div>
  <div class="wda-flip-card">
    <div class="wda-flip-front">실제 서비스에서 Storage를 안전하게 쓰려면 무엇을 설정해야 하나요?</div>
    <div class="wda-flip-back">누가 업로드·다운로드할 수 있는지 제한하는 보안 규칙을 설정해야 합니다.</div>
  </div>
</div>
