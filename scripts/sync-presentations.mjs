// 발표자료 탭 배포 사본 동기화
//   덱: outputs/presentation/<file> → dashboard/public/presentations/<file> (복사)
//   영상: <source>(렌더 산출물, 미커밋) → dashboard/public/videos/<file> (웹 인코딩) + <poster>
// 사용: node scripts/sync-presentations.mjs  (덱·영상 재생성 후 다시 실행)
import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PRESENTATIONS, VIDEOS } from '../dashboard/src/data/presentations.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dest = join(root, 'dashboard/public/presentations')
mkdirSync(dest, { recursive: true })

for (const p of PRESENTATIONS) {
  const src = join(root, 'outputs/presentation', p.file)
  copyFileSync(src, join(dest, p.file))
  console.log(`  ${p.file}  ${(statSync(src).size / 1024).toFixed(0)}KB`)
}
console.log(`synced ${PRESENTATIONS.length} decks → dashboard/public/presentations/`)

const vdest = join(root, 'dashboard/public/videos')
mkdirSync(vdest, { recursive: true })
for (const v of VIDEOS) {
  const src = join(root, v.source)
  if (!existsSync(src)) { console.log(`  skip ${v.file} — 원본 없음(${v.source}), 기존 사본 유지`); continue }
  const ff = (args) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: 'inherit' })
  ff(['-i', src, '-c:v', 'libx264', '-profile:v', 'high', '-preset', 'slow', '-crf', '23', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', join(vdest, v.file)])
  ff(['-ss', String(v.posterAt ?? 1), '-i', src, '-frames:v', '1', '-vf', 'scale=1280:-2', '-q:v', '3', join(vdest, v.poster)])
  console.log(`  ${v.file}  ${(statSync(join(vdest, v.file)).size / 1048576).toFixed(1)}MB + ${v.poster}`)
}
console.log(`synced ${VIDEOS.length} videos → dashboard/public/videos/`)
