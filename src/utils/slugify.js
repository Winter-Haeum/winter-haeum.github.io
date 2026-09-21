/**
 * slugify — 섹션 이름을 URL 슬러그로 변환
 *
 * @param {string} text - 변환할 텍스트
 * @returns {string} URL-safe 슬러그
 *
 * Example:
 * slugify('Arrays & Objects') → 'arrays-objects'
 * slugify('ES6+')             → 'es6'
 * slugify('React + TypeScript') → 'react-typescript'
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * stripSectionNumber — 대단원 표시명 앞의 "N. " 번호 접두어를 제거한다.
 * navigation.js의 sections/sectionDocs 키 자체는 번호를 유지해야
 * slugify 결과가 고유하므로(예: 순수 한글 이름은 슬러그가 비어버림),
 * 화면에 보여줄 때만 이 함수로 번호를 떼어낸다.
 *
 * @param {string} name - 원본 섹션 이름 (예: '1. JavaScript 기본 문법')
 * @returns {string} 번호가 제거된 표시용 이름 (예: 'JavaScript 기본 문법')
 *
 * Example:
 * stripSectionNumber('1. JavaScript 기본 문법') → 'JavaScript 기본 문법'
 * stripSectionNumber('DOM') → 'DOM' (번호 없으면 그대로 반환)
 */
export function stripSectionNumber(name) {
  return name.replace(/^\d+\.\s*/, '');
}
