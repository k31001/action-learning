// QA 정지 프레임 일괄 렌더: node scripts/qa-stills.mjs <태그> <프레임...>  → out/qa/<태그>-<프레임>.png
import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';
import { join } from 'path';
const ROOT = new URL('..', import.meta.url).pathname;
const [tag, ...frames] = process.argv.slice(2);
const serveUrl = await bundle({ entryPoint: join(ROOT, 'src/index.ts') });
const browserExecutable = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
const composition = await selectComposition({ serveUrl, id: 'FourWinters', inputProps: { bgm: true }, browserExecutable });
for (const fr of frames) {
  const output = join(ROOT, 'out/qa', `${tag}-${String(fr).padStart(4, '0')}.png`);
  await renderStill({ composition, serveUrl, output, frame: +fr, inputProps: { bgm: true }, browserExecutable, logLevel: 'error' });
  console.log(output);
}
