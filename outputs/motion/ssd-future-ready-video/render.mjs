// 「고객 협력 전략」 발표 영상 렌더러 — headless Chromium(Playwright)로 캔버스 프레임을 뽑아 ffmpeg로 인코딩
//   (먼저) python3 render_slides.py · narration.py   → slides/*.jpg · narration.mp3 · cues.js
//   node outputs/motion/ssd-future-ready-video/render.mjs stills 10 30 …  → stills/t010.0.png … (검수용 정지 화면)
//   node outputs/motion/ssd-future-ready-video/render.mjs video           → ssd-future-ready-video.mp4 (1080p30 + 내레이션, 미커밋)
// 이미지를 캔버스에서 내보내려면 같은 출처가 필요해 이 폴더를 로컬 HTTP로 띄운다. 환경변수: CHROMIUM, FPS(기본 30)
import { createRequire } from 'module';
import { execFileSync, spawn } from 'child_process';
import { mkdirSync, existsSync, readFileSync, writeFileSync, rmSync } from 'fs';
import { createServer } from 'http';
import { tmpdir } from 'os';
import { join, extname, normalize } from 'path';

const DIR = new URL('.', import.meta.url).pathname;
const require = createRequire(import.meta.url);
let pw;
for (const p of ['playwright', '/opt/node22/lib/node_modules/playwright']) { try { pw = require(p); break; } catch {} }
if (!pw) throw new Error('playwright 모듈을 찾을 수 없다 (npm i -g playwright)');

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.mp3': 'audio/mpeg' };
function serve() {
  const srv = createServer((req, res) => {
    const f = join(DIR, normalize(decodeURIComponent(req.url.split(/[?#]/)[0])).replace(/^(\.\.[/\\])+/, ''));
    if (!f.startsWith(DIR) || !existsSync(f)) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'content-type': TYPES[extname(f)] || 'application/octet-stream' });
    res.end(readFileSync(f));
  });
  return new Promise(r => srv.listen(0, '127.0.0.1', () => r(srv)));
}

async function open() {
  const srv = await serve();
  const opts = process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {};
  const browser = await pw.chromium.launch(opts);
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  const errs = []; page.on('pageerror', e => errs.push(String(e)));
  await page.goto(`http://127.0.0.1:${srv.address().port}/index.html#export`, { waitUntil: 'networkidle' });
  await page.evaluate(() => window.__motion.ready);
  if (errs.length) throw new Error(errs.join('\n'));
  return { browser, page, errs, srv };
}
const grab = (page, t, type = 'image/jpeg', q = 0.93) => page.evaluate(([t, type, q]) => {
  window.__motion.seek(t); return document.getElementById('cv').toDataURL(type, q).split(',')[1];
}, [t, type, q]);

async function stills(ts) {
  const { browser, page, errs, srv } = await open();
  const out = join(DIR, 'stills'); mkdirSync(out, { recursive: true });
  for (const t of ts) writeFileSync(join(out, `t${t.toFixed(1).padStart(5, '0')}.png`), Buffer.from(await grab(page, t, 'image/png'), 'base64'));
  await browser.close(); srv.close();
  if (errs.length) throw new Error(errs.join('\n'));
  console.log('stills:', ts.join(' '));
}

async function video() {
  const nar = join(DIR, 'narration.mp3');
  if (!existsSync(nar)) throw new Error('narration.mp3가 없다 — 먼저 narration.py 실행');
  const { browser, page, errs, srv } = await open();
  const dur = await page.evaluate(() => window.__motion.duration);
  const FPS = Number(process.env.FPS || 30), N = Math.round(dur * FPS), silent = join(tmpdir(), 'ssd-future-ready-silent.mp4');
  const enc = spawn('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-tune', 'stillimage', '-pix_fmt', 'yuv420p', silent], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = 0; i < N; i++) {
    const buf = Buffer.from(await grab(page, i / FPS), 'base64');
    if (!enc.stdin.write(buf)) await new Promise(r => enc.stdin.once('drain', r));
    if (i % 900 === 0) console.log('frame', i, '/', N);
  }
  enc.stdin.end(); await new Promise(r => enc.on('close', r));
  await browser.close(); srv.close();
  if (errs.length) throw new Error(errs.join('\n'));
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', silent, '-i', nar, '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k',
    '-t', String(dur), '-movflags', '+faststart', join(DIR, 'ssd-future-ready-video.mp4')], { stdio: 'inherit' });
  rmSync(silent);
  console.log('ssd-future-ready-video.mp4');
}

const [mode = 'video', ...rest] = process.argv.slice(2);
if (mode === 'stills') await stills(rest.map(Number));
else await video();
