// 「FDP가 뭐야?」 렌더러 — headless Chromium(Playwright)로 캔버스 프레임을 뽑아 ffmpeg로 인코딩
//   (먼저) python narration.py                         → narration.mp3 + cues.js
//   node outputs/motion/fdp-explainer/render.mjs stills 1.5 9 20   → stills/t01.50.png … (검수용 정지 화면)
//   node outputs/motion/fdp-explainer/render.mjs video              → fdp-explainer.mp4 (1080p60 + 내레이션, 미커밋)
// 환경변수: CHROMIUM(실행 파일 경로), FPS(기본 60)
import { createRequire } from 'module';
import { execFileSync, spawn } from 'child_process';
import { mkdirSync, existsSync, readFileSync, writeFileSync, rmSync } from 'fs';
import { createHash } from 'crypto';
import { tmpdir } from 'os';
import { join } from 'path';

const DIR = new URL('.', import.meta.url).pathname;
const require = createRequire(import.meta.url);
let pw;
for (const p of ['playwright', '/opt/node22/lib/node_modules/playwright']) { try { pw = require(p); break; } catch {} }
if (!pw) throw new Error('playwright 모듈을 찾을 수 없다 (npm i -g playwright)');

// 웹 폰트(Google Fonts)는 curl로 받아 캐시해 둔다 — 헤드리스 브라우저가 직접 못 받는 환경 대비
const CACHE = join(tmpdir(), 'fdp-explainer-cache'); mkdirSync(CACHE, { recursive: true });
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36';
function get(url) {
  const f = join(CACHE, createHash('md5').update(url).digest('hex'));
  if (!existsSync(f)) writeFileSync(f, execFileSync('curl', ['-sSfL', '-A', UA, url], { maxBuffer: 64e6 }));
  return readFileSync(f);
}
async function open() {
  const opts = process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {};
  const browser = await pw.chromium.launch(opts);
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.route(/^https:/, r => {
    const u = r.request().url();
    const ct = u.includes('googleapis.com/css') ? 'text/css' : u.includes('gstatic') ? 'font/woff2' : 'application/octet-stream';
    try { r.fulfill({ status: 200, body: get(u), contentType: ct, headers: { 'access-control-allow-origin': '*' } }); } catch { r.abort(); }
  });
  const errs = []; page.on('pageerror', e => errs.push(String(e)));
  await page.goto('file://' + join(DIR, 'index.html') + '#export', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.__motion.ready);
  if (errs.length) throw new Error(errs.join('\n'));
  return { browser, page, errs };
}
const frame = (page, t, q = 0.95) => page.evaluate(([t, q]) => { window.__motion.seek(t); return document.getElementById('cv').toDataURL('image/jpeg', q).split(',')[1]; }, [t, q]);

async function stills(ts) {
  const { browser, page, errs } = await open();
  const out = join(DIR, 'stills'); mkdirSync(out, { recursive: true });
  for (const t of ts) {
    const png = await page.evaluate(t => { window.__motion.seek(t); return document.getElementById('cv').toDataURL('image/png').split(',')[1]; }, t);
    writeFileSync(join(out, `t${t.toFixed(2).padStart(5, '0')}.png`), Buffer.from(png, 'base64'));
  }
  await browser.close();
  if (errs.length) throw new Error(errs.join('\n'));
  console.log('stills:', ts.join(' '));
}

async function video() {
  const nar = join(DIR, 'narration.mp3');
  if (!existsSync(nar)) throw new Error('narration.mp3가 없다 — 먼저 narration.py 실행');
  const { browser, page, errs } = await open();
  const dur = await page.evaluate(() => window.__motion.duration);
  const FPS = Number(process.env.FPS || 60), N = Math.round(dur * FPS), silent = join(tmpdir(), 'fdp-explainer-silent.mp4');
  const enc = spawn('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', silent], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = 0; i < N; i++) {
    const buf = Buffer.from(await frame(page, i / FPS), 'base64');
    if (!enc.stdin.write(buf)) await new Promise(r => enc.stdin.once('drain', r));
    if (i % 300 === 0) console.log('frame', i, '/', N);
  }
  enc.stdin.end(); await new Promise(r => enc.on('close', r));
  await browser.close();
  if (errs.length) throw new Error(errs.join('\n'));
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', silent, '-i', nar, '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k',
    '-t', String(dur), '-movflags', '+faststart', join(DIR, 'fdp-explainer.mp4')], { stdio: 'inherit' });
  rmSync(silent);
  console.log('fdp-explainer.mp4');
}

const [mode = 'video', ...rest] = process.argv.slice(2);
if (mode === 'stills') await stills(rest.length ? rest.map(Number) : [0.6, 3.5, 6.2, 7.2, 9.6, 11.2, 12.8, 16.5, 20, 24, 27.5, 29.5]);
else await video();
