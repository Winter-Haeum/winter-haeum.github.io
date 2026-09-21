/**
 * docStructure — Markdown 원문에서 학습 도우미가 표시할 구조 정보를 추출한다.
 *
 * 모든 함수는 doc.content(frontmatter 제거 후 MD 본문) 원문 문자열만 입력받아
 * 실제로 존재하는 텍스트만 반환한다. 해당 섹션이 없으면 null/빈 배열을 반환하며
 * 절대 내용을 새로 만들어내지 않는다.
 *
 * 전제(184개 교안 전수 조사로 확인한 실제 마크업 패턴):
 *   - 학습 목표: <div class="wda-goal">  • <strong>..</strong> — ..<br> ...</div>
 *   - 핵심 요약: <div class="wda-check-note"><ul><li>..</li>...</ul></div>
 *   - 위 두 블록은 문서에 없을 수 있다(부록/색인 문서 등) — 이 경우 null 반환.
 *   - 한 문서에 wda-check-note가 여러 개 있을 수 있어(중간 체크 + 최종 요약),
 *     반드시 "핵심 요약" 제목 뒤에 나오는 첫 블록만 사용한다.
 *   - 코드 예제(````markdown 등 안내용 예시) 안에 "## 큰 섹션" 같은 가짜 헤딩 텍스트가
 *     그대로 들어있는 문서가 있다(예: dev-tools/git/3-3-3-markdown-basics.md) — 헤딩을
 *     스캔할 때 펜스 내부는 반드시 건너뛰어야 한다. 4개 이상 백틱 중첩 펜스도 있어
 *     "닫는 펜스는 여는 펜스와 같은 길이 이상"이라는 CommonMark 규칙대로 추적한다.
 */

/** H2 제목 중 학습 도우미가 "주요 개념"으로 취급하지 않을 메타 섹션 */
const META_HEADING_SUBSTRINGS = [
  '학습 목표', '실습 목표', '핵심 요약', '실습 과제', '실수',
  '다음 학습 흐름', '다음 단계 미리보기', '검토 체크리스트', '최종 점검 체크리스트',
  '복습 퀴즈', '확인 포인트', '완성 코드', '문서 목록',
];

const ENTITY_MAP = { '&lt;': '<', '&gt;': '>', '&amp;': '&', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ' };

function decodeEntities(text) {
  return text.replace(/&lt;|&gt;|&amp;|&quot;|&#39;|&nbsp;/g, (m) => ENTITY_MAP[m]);
}

/**
 * 모든 문서 상단에 공통으로 들어있는 <style> CSS 블록(검색 인덱스 body에도 그대로
 * 포함되어 있음 — markdownLoader.js의 _stripMarkdown은 마크다운 문법만 제거하고
 * raw HTML의 <style> 내용까지는 걷어내지 않는다)이 발췌에 섞여 나오지 않도록
 * 태그 제거 전에 style/script 블록 전체를 먼저 들어낸다.
 */
function stripTags(html) {
  const withoutStyleAndScript = html
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ');
  return decodeEntities(withoutStyleAndScript.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

/** 다른 모듈에서도 재사용하는 순수 텍스트 변환(HTML/CSS 잔재 제거 + 엔티티 디코딩) */
export function cleanText(raw) {
  return raw ? stripTags(raw) : '';
}

// 검색어 끝에 붙는 흔한 한국어 조사 — "module의" → "module"처럼 실제 본문에 없는
// 조사가 붙어 토큰 매칭이 실패하는 것을 줄인다. 긴 조사부터 검사해야
// "에서"가 "에"로 잘못 잘리는 등의 오매칭을 피할 수 있다.
const KOREAN_PARTICLES = ['에서', '으로', '부터', '까지', '처럼', '보다', '이나', '의', '는', '은', '이', '가', '을', '를', '에', '로', '와', '과', '도', '만'];

function stripTrailingParticle(token) {
  for (const p of KOREAN_PARTICLES) {
    if (token.length - p.length >= 2 && token.endsWith(p)) {
      return token.slice(0, -p.length);
    }
  }
  return token;
}

/**
 * 검색어를 "전체 구문"과 "조사를 뗀 개별 단어" 목록으로 분리한다.
 * @param {string} query
 * @returns {{ phrase: string, tokens: string[] }}
 */
export function tokenizeQuery(query) {
  const phrase = (query ?? '').trim();
  if (!phrase) return { phrase: '', tokens: [] };
  const tokens = [...new Set(
    phrase.split(/\s+/).filter(Boolean).map(stripTrailingParticle).filter((t) => t.length >= 2)
  )];
  return { phrase, tokens };
}

/**
 * 질문 검색 결과 하나의 관련성 등급을 매긴다 — 숫자가 작을수록 관련성이 높다.
 *   0: 제목에 검색 구문이 그대로 등장
 *   1: 본문/설명에 검색 구문이 그대로 등장
 *   2: 조사를 뗀 단어들이 모두 등장하고 서로 가까이 붙어 있음(근접 문맥)
 *   3: 조사를 뗀 단어들이 모두 등장하지만 멀리 떨어져 있음
 *   4: 단어 일부만 등장(약한 매치 — UI에서 "일부 단어만 일치"로 안내)
 *   5: 실제 단어가 전혀 등장하지 않음(Fuse 퍼지매치만 존재) — 호출 측에서 제외 대상
 * @param {object} item - SearchIndexItem
 * @param {string} query
 * @returns {{ tier: number, matchedTokens: number, totalTokens: number }}
 */
export function scoreRelevance(item, query) {
  const { phrase, tokens } = tokenizeQuery(query);
  if (!phrase || tokens.length === 0) return { tier: 5, matchedTokens: 0, totalTokens: 0 };

  const titleLower = (item?.title || '').toLowerCase();
  const bodyLower = cleanText(item?.body).toLowerCase();
  const descLower = cleanText(item?.description).toLowerCase();
  const phraseLower = phrase.toLowerCase();

  const phraseInTitle = titleLower.includes(phraseLower);
  const phraseInBody = bodyLower.includes(phraseLower) || descLower.includes(phraseLower);

  const positions = tokens.map((t) => bodyLower.indexOf(t.toLowerCase()));
  const matchedTokens = positions.filter((p) => p !== -1).length;
  const allTokensFound = matchedTokens === tokens.length;

  let minGap = Infinity;
  if (allTokensFound && tokens.length >= 2) {
    for (let i = 0; i < positions.length; i += 1) {
      for (let j = i + 1; j < positions.length; j += 1) {
        minGap = Math.min(minGap, Math.abs(positions[i] - positions[j]));
      }
    }
  }

  let tier;
  if (phraseInTitle) tier = 0;
  else if (phraseInBody) tier = 1;
  else if (allTokensFound && (tokens.length < 2 || minGap <= 120)) tier = 2;
  else if (allTokensFound) tier = 3;
  else if (matchedTokens > 0) tier = 4;
  else tier = 5;

  return { tier, matchedTokens, totalTokens: tokens.length };
}

/**
 * 각 줄이 펜스 코드 블록 내부인지 표시한 boolean 배열을 만든다.
 * CommonMark 규칙: 닫는 펜스는 여는 펜스와 같은 문자(백틱)·같은 길이 이상이어야 닫힌다.
 * 이 규칙을 지키지 않으면(단순 토글) 4개 백틱 펜스 안에 3개 백틱 예시가 중첩된 문서에서
 * 헤딩·코드 위치 추출이 어긋난다.
 */
function markFenceLines(lines) {
  const inFence = new Array(lines.length).fill(false);
  let fenceLen = 0; // 0 = 펜스 밖
  for (let i = 0; i < lines.length; i += 1) {
    const m = lines[i].match(/^(`{3,})/);
    if (fenceLen === 0) {
      if (m) {
        fenceLen = m[1].length;
        inFence[i] = true; // 여는 줄 자체도 헤딩 스캔 대상에서 제외
      }
    } else {
      inFence[i] = true;
      if (m && m[1].length >= fenceLen) fenceLen = 0;
    }
  }
  return inFence;
}

/** heading(정규식)이 처음 등장하는 위치 이후에서 className div 블록을 찾는다 */
function findBlockAfterHeading(content, headingRegex, className) {
  const headingMatch = content.match(headingRegex);
  const searchFrom = headingMatch ? headingMatch.index : 0;
  const divRegex = new RegExp(`<div class="${className}">([\\s\\S]*?)</div>`);
  const rest = content.slice(searchFrom);
  const blockMatch = rest.match(divRegex);
  return blockMatch ? blockMatch[1] : null;
}

/**
 * 학습 목표 — "학습 목표"/"실습 목표" H2 이후의 wda-goal 블록을 <br> 기준으로 분리
 * @param {string} content
 * @returns {string[]|null} 없으면 null
 */
export function extractLearningGoals(content) {
  if (!content) return null;
  const block = findBlockAfterHeading(content, /^##\s*.*(학습 목표|실습 목표).*$/m, 'wda-goal');
  if (!block) return null;
  const items = block
    .split(/<br\s*\/?>/i)
    .map((line) => stripTags(line).replace(/^[•·]\s*/, '').trim())
    .filter(Boolean);
  return items.length ? items : null;
}

/**
 * 핵심 요약 — "핵심 요약" H2 이후의 wda-check-note 블록에서 <li> 항목을 추출
 * @param {string} content
 * @returns {string[]|null} 없으면 null
 */
export function extractKeySummary(content) {
  if (!content) return null;
  const block = findBlockAfterHeading(content, /^##\s*.*핵심\s*요약.*$/m, 'wda-check-note');
  if (!block) return null;
  const items = [...block.matchAll(/<li>([\s\S]*?)<\/li>/g)]
    .map((m) => stripTags(m[1]))
    .filter(Boolean);
  return items.length ? items : null;
}

/**
 * 주요 개념 — 메타 섹션(학습 목표·핵심 요약·실습 과제 등)과 코드 펜스 내부를 제외한 H2 제목 목록
 * @param {string} content
 * @returns {string[]}
 */
export function extractConceptSections(content) {
  if (!content) return [];
  const lines = content.split('\n');
  const inFence = markFenceLines(lines);
  const headings = [];
  lines.forEach((line, i) => {
    if (inFence[i]) return;
    const m = line.match(/^##\s+(.+?)\s*$/);
    if (!m) return;
    const text = m[1].trim();
    if (META_HEADING_SUBSTRINGS.some((s) => text.includes(s))) return;
    headings.push(text);
  });
  return headings;
}

/**
 * 관련 코드 예제 위치 — 펜스 코드 블록과 그 직전 H2 제목을 짝지어 반환
 * (펜스 내부에 있는 가짜 "## 제목" 예시 텍스트는 헤딩으로 취급하지 않는다)
 * @param {string} content
 * @returns {{ lang: string, heading: string|null }[]}
 */
export function extractCodeExamples(content) {
  if (!content) return [];
  const lines = content.split('\n');
  const inFence = markFenceLines(lines);
  const examples = [];
  let currentHeading = null;
  let wasInFence = false;

  for (let i = 0; i < lines.length; i += 1) {
    if (!inFence[i]) {
      const headingMatch = lines[i].match(/^##\s+(.+?)\s*$/);
      if (headingMatch) currentHeading = headingMatch[1].trim();
    } else if (!wasInFence) {
      // 펜스가 새로 시작되는 줄(여는 줄) — 예제 1개로 기록
      const langMatch = lines[i].match(/^`{3,}(\w+)?/);
      examples.push({ lang: langMatch?.[1] || 'text', heading: currentHeading });
    }
    wasInFence = inFence[i];
  }
  return examples;
}

/**
 * 검색 결과용 원문 발췌 — 질문(검색어)에 포함된 실제 단어가 문서 본문/설명에
 * 그대로 등장하는 위치를 찾아 그 주변 텍스트만 반환한다. HTML 태그는 발췌 전에
 * 모두 제거하므로(원문이 raw HTML을 포함하는 문서 구조이기 때문) 태그 조각이
 * 잘려서 노출되는 문제가 없다. 실제로 일치하는 단어를 찾지 못하면 null을 반환하고,
 * 호출 측은 이 경우 발췌 없이 제목·카테고리 정보만 보여줘야 한다(관련성 단정 금지).
 * @param {object} item - SearchIndexItem ({ body, description } 포함)
 * @param {string} query - 사용자가 입력한 검색어
 * @param {number} radius - 매치 앞뒤로 포함할 문자 수
 * @returns {string|null}
 */
export function buildExcerpt(item, query, radius = 60) {
  const { phrase, tokens: particleStrippedTokens } = tokenizeQuery(query);
  if (!phrase) return null;

  const candidates = [...new Set([phrase, ...particleStrippedTokens])]
    .sort((a, b) => b.length - a.length); // 전체 구문·긴 단어 우선

  if (candidates.length === 0) return null;

  const sources = [item?.body, item?.description]
    .filter(Boolean)
    .map((raw) => stripTags(raw));

  for (const source of sources) {
    for (const token of candidates) {
      const idx = source.toLowerCase().indexOf(token.toLowerCase());
      if (idx === -1) continue;
      const from = Math.max(0, idx - radius);
      const to = Math.min(source.length, idx + token.length + radius);
      return (from > 0 ? '…' : '') + source.slice(from, to).trim() + (to < source.length ? '…' : '');
    }
  }
  return null;
}
