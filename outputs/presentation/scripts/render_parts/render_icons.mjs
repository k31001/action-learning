// 단색 라인 아이콘 PNG 생성 (Tabler Icons, MIT). headless Chromium으로 SVG를 투명 PNG로 찍는다.
// 사용: node render_icons.mjs <출력 폴더> <색 이름=#hex,...> <아이콘 이름...>
//   예: node render_icons.mjs ../../assets/icons blue=#3C4FA5,white=#FFFFFF arrows-exchange stack-push
//   결과: <출력 폴더>/<아이콘>_<색 이름>.png (512 px, 여백 없음 24 그리드 그대로)
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const T = require('@iconify-json/tabler/icons.json');

const [OUT, COLORS, ...NAMES] = process.argv.slice(2);
fs.mkdirSync(OUT, { recursive: true });
const colors = COLORS.split(',').map(kv => kv.split('='));
const PX = 512;

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});
const page = await browser.newPage({ viewport: { width: PX, height: PX } });
for (const name of NAMES) {
  const ic = T.icons[name];
  if (!ic) { console.log('missing', name); continue; }
  for (const [cname, hex] of colors) {
    await page.setContent(`<html><body style="margin:0;background:transparent">`
      + `<svg xmlns="http://www.w3.org/2000/svg" width="${PX}" height="${PX}" viewBox="0 0 ${T.width} ${T.height}" style="color:${hex};display:block">${ic.body}</svg></body></html>`);
    await page.locator('svg').screenshot({ path: path.join(OUT, `${name}_${cname}.png`), omitBackground: true });
  }
  console.log('icon', name);
}
await browser.close();
