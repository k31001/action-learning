import { ExternalLink } from 'lucide-react'

// 출처 텍스트에서 repo 경로(.md / 디렉토리 글로브)를 자동 추출 → GitHub 링크.
// 사용처: DataVisualization / ScenarioPlanning / Strategies 의 Card source.
//
// 매칭 패턴:
//   - sources/articles/foo.md
//   - wiki/scenarios/scenario-matrix.md
//   - wiki/strategies/invariant/README.md
//   - wiki/concepts/*.md      → 디렉토리 tree 링크
//   - wiki/entities/*         → 디렉토리 tree 링크
//   - outputs/report/scenario-planning-report.md
//
// 비-경로 텍스트(예: "Yole Group, Bank of America")는 그대로 표시.

const REPO_BASE = 'https://github.com/k31001/action-learning'

// 최상위 디렉토리 화이트리스트 — 임의 텍스트가 매칭되지 않도록.
const PATH_REGEX = /(?:sources|wiki|outputs|dashboard|slides)\/(?:[\w-]+\/)*(?:[\w.-]+\.md|\*\.md|\*)/g

function pathToUrl(path) {
  // 글로브 → 부모 디렉토리 tree 뷰
  if (path.endsWith('/*.md') || path.endsWith('/*')) {
    const dir = path.replace(/\/\*\.md$|\/\*$/, '')
    return `${REPO_BASE}/tree/main/${dir}`
  }
  // 파일 → blob 뷰
  return `${REPO_BASE}/blob/main/${path}`
}

// source 문자열을 토큰화 → 경로는 <a>, 그 외는 <span>
function tokenize(text) {
  const tokens = []
  let last = 0
  // matchAll 로 전역 매칭 순회
  for (const m of text.matchAll(PATH_REGEX)) {
    if (m.index > last) tokens.push({ type: 'text', val: text.slice(last, m.index) })
    tokens.push({ type: 'path', val: m[0] })
    last = m.index + m[0].length
  }
  if (last < text.length) tokens.push({ type: 'text', val: text.slice(last) })
  return tokens
}

export default function SourceLink({
  source,
  prefix = '출처: ',
  className = 'text-xs text-zinc-400 mt-0.5',
}) {
  if (!source) return null
  const tokens = tokenize(source)
  return (
    <p className={className}>
      {prefix}
      {tokens.map((t, i) =>
        t.type === 'path' ? (
          <a
            key={i}
            href={pathToUrl(t.val)}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub 에서 열기"
            className="inline-flex items-baseline gap-0.5 font-mono text-[11px] text-sky-600 hover:text-sky-700 hover:underline decoration-sky-300 decoration-from-font underline-offset-2"
          >
            {t.val}
            <ExternalLink size={9} className="opacity-60 self-center" />
          </a>
        ) : (
          <span key={i}>{t.val}</span>
        )
      )}
    </p>
  )
}
