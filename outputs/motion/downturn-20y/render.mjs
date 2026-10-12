// 「네 번의 겨울」 렌더러 — headless Chromium(Playwright) + ffmpeg
//   node outputs/motion/downturn-20y/render.mjs audio   → score.mp3 (score.js 합성 → 160kbps MP3, 페이지가 재생)
//   node outputs/motion/downturn-20y/render.mjs video   → four-winters.mp4 (1080p30 프레임 렌더 + score.mp3 합본, 미커밋)
// 환경변수: CHROMIUM(실행 파일 경로), GSAP_JS(로컬 gsap.min.js — CDN 접근이 막힌 환경용)
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

const CACHE = join(tmpdir(), 'four-winters-cache'); mkdirSync(CACHE, { recursive: true });
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36';
function get(url) {
  if (process.env.GSAP_JS && url.includes('gsap')) return readFileSync(process.env.GSAP_JS);
  const f = join(CACHE, createHash('md5').update(url).digest('hex'));
  if (!existsSync(f)) writeFileSync(f, execFileSync('curl', ['-sSfL', '-A', UA, url], { maxBuffer: 64e6 }));
  return readFileSync(f);
}
async function open() {
  const browser = await pw.chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.route(/^https:/, r => {
    const u = r.request().url();
    const ct = u.includes('googleapis.com/css') ? 'text/css' : u.endsWith('.js') ? 'application/javascript' : u.includes('gstatic') ? 'font/woff2' : 'application/octet-stream';
    try { r.fulfill({ status: 200, body: get(u), contentType: ct, headers: { 'access-control-allow-origin': '*' } }); } catch { r.abort(); }
  });
  const errs = []; page.on('pageerror', e => errs.push(String(e)));
  return { browser, page, errs };
}
const ff = args => execFileSync('ffmpeg', ['-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });

async function audio() {
  const { browser, page, errs } = await open();
  await page.setContent('<!doctype html><meta charset="utf-8"><body></body>');
  await page.addScriptTag({ content: readFileSync(join(DIR, 'score.js'), 'utf8') });
  const b64 = await page.evaluate(async () => window.wavBase64(await window.renderScore()));
  await browser.close();
  if (errs.length) throw new Error(errs.join('\n'));
  const wav = join(tmpdir(), 'four-winters-score.wav');
  writeFileSync(wav, Buffer.from(b64, 'base64'));
  ff(['-i', wav, '-af', 'volume=6dB,alimiter=limit=0.9:attack=3:release=80:level=false', '-c:a', 'libmp3lame', '-b:a', '160k', join(DIR, 'score.mp3')]);
  rmSync(wav);
  console.log('score.mp3');
}

async function video() {
  const { browser, page, errs } = await open();
  await page.goto('file://' + join(DIR, 'index.html') + '#export', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const dur = await page.evaluate(() => window.__motion.duration);
  const FPS = 30, N = Math.ceil(dur * FPS), silent = join(tmpdir(), 'four-winters-silent.mp4');
  const enc = spawn('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', silent], { stdio: ['pipe', 'inherit', 'inherit'] });
  const vp = await page.$('#viewport');
  for (let i = 0; i < N; i++) {
    await page.evaluate(t => window.__motion.seek(t), i / FPS);
    const buf = await vp.screenshot({ type: 'jpeg', quality: 93 });
    if (!enc.stdin.write(buf)) await new Promise(r => enc.stdin.once('drain', r));
    if (i % 300 === 0) console.log('frame', i, '/', N);
  }
  enc.stdin.end(); await new Promise(r => enc.on('close', r));
  await browser.close();
  if (errs.length) throw new Error(errs.join('\n'));
  ff(['-i', silent, '-i', join(DIR, 'score.mp3'), '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', join(DIR, 'four-winters.mp4')]);
  rmSync(silent);
  console.log('four-winters.mp4');
}

const mode = process.argv[2] || 'audio';
if (mode === 'audio' || mode === 'all') await audio();
if (mode === 'video' || mode === 'all') await video();
