// 원고(src/**) 에 쓰인 글자만 담은 Noto Sans/Serif KR woff2 서브셋을 Google Fonts(text= 서브셋 API)에서 받아 public/fonts 에 둔다.
//   node scripts/fetch-fonts.mjs   (원고 문구를 바꿨으면 다시 실행)
import { readFileSync, readdirSync, writeFileSync, statSync } from 'fs';
import { execFileSync } from 'child_process';
import { join } from 'path';
const ROOT = new URL('..', import.meta.url).pathname;
const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
let chars = new Set();
for (let c = 32; c < 127; c++) chars.add(String.fromCharCode(c));
for (const f of walk(join(ROOT, 'src'))) for (const ch of readFileSync(f, 'utf8')) if (ch.charCodeAt(0) > 127) chars.add(ch);
const text = [...chars].join('');
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36';
const get = (u) => execFileSync('curl', ['-sSfL', '-A', UA, u], { maxBuffer: 64e6 });
for (const [fam, w, out] of [['Noto+Sans+KR', 500, 'sans-500'], ['Noto+Sans+KR', 700, 'sans-700'], ['Noto+Sans+KR', 900, 'sans-900'], ['Noto+Serif+KR', 900, 'serif-900']]) {
  const css = get(`https://fonts.googleapis.com/css2?family=${fam}:wght@${w}&text=${encodeURIComponent(text)}`).toString();
  const url = css.match(/url\((https:[^)]+)\)/)[1];
  writeFileSync(join(ROOT, 'public/fonts', out + '.woff2'), get(url));
  console.log(out, url.slice(0, 60));
}
console.log('chars', chars.size);
