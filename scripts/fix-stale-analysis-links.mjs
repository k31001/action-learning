#!/usr/bin/env node
// 마이그레이션(2026-05-18) 잔존 깨진 링크 수선:  ../../analysis/<x>  →  wiki/<x> 실제 위치로
// 각 링크 타깃을 basename 기준으로 wiki/ 안에서 해석 → 소스 파일에서의 올바른 상대경로 재계산.
// 사용:  node scripts/fix-stale-analysis-links.mjs          (드라이런, 변경 미적용)
//        node scripts/fix-stale-analysis-links.mjs --write  (실제 적용)

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const WIKI = join(ROOT, 'wiki')
const WRITE = process.argv.includes('--write')

function walk(dir) {
  const out = []
  for (const n of readdirSync(dir)) {
    const p = join(dir, n)
    if (statSync(p).isDirectory()) out.push(...walk(p))
    else if (n.endsWith('.md')) out.push(p)
  }
  return out
}

// 마이그레이션 때 개명·분할된 파일 별칭 (옛 wiki상대경로 → 새 wiki상대경로)
const ALIAS = {
  'competitors/market-share.md': 'concepts/dram-market-share.md',
}

// wiki 내 basename → 실제 경로(들) 인덱스
const files = walk(WIKI)
const byBase = new Map()
for (const f of files) {
  const b = f.split(sep).pop()
  if (!byBase.has(b)) byBase.set(b, [])
  byBase.get(b).push(f)
}

// 링크의 analysis 경로에서 wiki 상대 부분 추출 → 후보 타깃 찾기
function resolveTarget(linkPath, srcDir) {
  // linkPath 예: ../../analysis/benchmark/cyclical-strategy-benchmark.md  또는  analysis/scenarios/foo.md
  const m = linkPath.match(/\b(?:analysis|data|report)\/(.+\.md)$/)
  if (!m) return null
  const wikiRel = ALIAS[m[1]] || m[1]  // benchmark/cyclical-strategy-benchmark.md (analysis) 또는 technology/dram-technology.md (data)
  const direct = join(WIKI, wikiRel)   // 1순위: 같은 하위경로가 wiki에 그대로 존재?
  let target = null
  if (files.includes(direct)) target = direct
  else {
    // 2순위: basename 으로 wiki 안 유일 매칭
    const base = wikiRel.split('/').pop()
    const cands = byBase.get(base) || []
    if (cands.length === 1) target = cands[0]
    else if (cands.length > 1) {
      // 하위경로 끝이 일치하는 것 우선
      target = cands.find(c => c.endsWith(wikiRel.split('/').join(sep))) || null
    }
  }
  if (!target) return { wikiRel, status: 'UNRESOLVED', rel: null }
  let rel = relative(srcDir, target).split(sep).join('/')
  if (!rel.startsWith('.')) rel = './' + rel
  return { wikiRel, status: 'OK', rel, target: relative(ROOT, target) }
}

// 마이그레이션 잔존 옛 최상위 경로:  analysis/→wiki, data/→wiki(또는 sources) 로 분산 이동.
// http(s) URL 안의 동일 토큰은 건드리지 않도록 href 가 '..' 또는 상대경로로 시작하는 것만 매칭.
const LINK_RE = /\]\((?!https?:)([^)]*\b(?:analysis|data|report)\/[^)]+?\.md)([^)]*)\)/g
let total = 0, fixed = 0, unresolved = []
for (const abs of files) {
  let text = readFileSync(abs, 'utf8')
  const srcDir = dirname(abs)
  let changed = false
  text = text.replace(LINK_RE, (whole, linkPath, suffix) => {
    total++
    const r = resolveTarget(linkPath, srcDir)
    if (!r || r.status !== 'OK') {
      unresolved.push({ file: relative(ROOT, abs), linkPath })
      return whole
    }
    fixed++
    changed = true
    return `](${r.rel}${suffix})`
  })
  if (changed && WRITE) writeFileSync(abs, text)
}

console.log(`${WRITE ? '✏️  APPLIED' : '🔍 DRY-RUN'}  analysis/ 링크 ${total}건 중 ${fixed}건 수선${WRITE ? '' : ' 예정'}`)
if (unresolved.length) {
  console.log(`⚠️  미해결 ${unresolved.length}건:`)
  for (const u of unresolved) console.log(`   ${u.file}  ←  ${u.linkPath}`)
} else {
  console.log('✓ 미해결 0건 — 모든 링크가 wiki/ 안에서 해석됨')
}
