// 발표자료 탭 배포 사본 동기화: outputs/presentation/<file> → dashboard/public/presentations/<file>
// 사용: node scripts/sync-presentations.mjs  (덱 재생성 후 다시 실행)
import { copyFileSync, mkdirSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PRESENTATIONS } from '../dashboard/src/data/presentations.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dest = join(root, 'dashboard/public/presentations')
mkdirSync(dest, { recursive: true })

for (const p of PRESENTATIONS) {
  const src = join(root, 'outputs/presentation', p.file)
  copyFileSync(src, join(dest, p.file))
  console.log(`  ${p.file}  ${(statSync(src).size / 1024).toFixed(0)}KB`)
}
console.log(`synced ${PRESENTATIONS.length} decks → dashboard/public/presentations/`)
