// scripts/score.js(Web Audio 합성)를 헤드리스 Chromium 에서 렌더해 public/audio/score.mp3 로 굽는다.
//   node scripts/render-score.mjs
import { createRequire } from 'module';
import { readFileSync, rmSync, writeFileSync } from 'fs';
import { execFileSync } from 'child_process';
import { join } from 'path';
const DIR = new URL('.', import.meta.url).pathname;
const require = createRequire(import.meta.url);
let pw; for (const p of ['playwright', '/opt/node22/lib/node_modules/playwright']) { try { pw = require(p); break; } catch {} }
if (!pw) throw new Error('playwright 모듈을 찾을 수 없다 (npm i -g playwright)');
const browser = await pw.chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
const page = await browser.newPage();
const errs = []; page.on('pageerror', (e) => errs.push(String(e)));
await page.setContent('<!doctype html><meta charset="utf-8"><body></body>');
await page.addScriptTag({ content: readFileSync(join(DIR, 'score.js'), 'utf8') });
const b64 = await page.evaluate(async () => window.wavBase64(await window.renderScore()));
await browser.close();
if (errs.length) throw new Error(errs.join('\n'));
const wav = join(DIR, '../public/audio/score.wav');
writeFileSync(wav, Buffer.from(b64, 'base64'));
execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', wav, '-c:a', 'libmp3lame', '-b:a', '192k', join(DIR, '../public/audio/score.mp3')]);
rmSync(wav);
console.log('public/audio/score.mp3');
