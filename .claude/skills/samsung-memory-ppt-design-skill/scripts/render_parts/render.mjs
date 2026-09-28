// 3D 부품 렌더 + 브랜드 로고 PNG 생성 (headless Chromium)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const OUT = process.argv[2];
const WHAT = (process.argv[3] || 'all');
fs.mkdirSync(OUT, { recursive: true });

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json' };
const srv = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  fs.readFile(p, (e, b) => { if (e) { res.writeHead(404); res.end(); return; } res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' }); res.end(b); });
}).listen(0);
const port = srv.address().port;

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const page = await browser.newPage({ viewport: { width: 1600, height: 1200 } });
page.on('console', m => { if (m.type() === 'error') console.log('console:', m.text()); });
page.on('pageerror', e => console.log('pageerror:', e.message));

if (WHAT === 'all' || WHAT === 'objects') {
  for (const [obj, w, h] of [['nand', 1400, 1100], ['dram', 1800, 900], ['hbm', 1400, 1100], ['ssd', 1800, 1000], ['server', 1800, 1100]]) {
    await page.setViewportSize({ width: w, height: h });
    await page.goto(`http://127.0.0.1:${port}/render.html?obj=${obj}&w=${w}&h=${h}`);
    await page.waitForFunction('window.__done === true', null, { timeout: 120000 });
    await page.locator('canvas').screenshot({ path: path.join(OUT, `${obj}.png`), omitBackground: true });
    console.log('rendered', obj);
  }
}

if (WHAT === 'all' || WHAT === 'logos') {
  const L = require('@iconify-json/logos/icons.json');
  const S = require('@iconify-json/simple-icons/icons.json');
  const pick = [
    ['samsung', L, 'samsung', null], ['sk-hynix', L, 'sk-hynix', null], ['nvidia', L, 'nvidia', null],
    ['micron', L, 'micron', null], ['meta', L, 'meta', null], ['google', L, 'google', null],
    ['microsoft', L, 'microsoft', null], ['aws', L, 'aws', null], ['huawei', S, 'huawei', '#1A1A1A'],
    ['vllm', S, 'vllm', '#1A1A1A'], ['linux', S, 'linux', '#1A1A1A'], ['pytorch', L, 'pytorch', null],
    ['palantir', S, 'palantir', '#1A1A1A'],
  ];
  for (const [name, set, key, color] of pick) {
    const ic = set.icons[key];
    const w = ic.width || set.width || 24, h = ic.height || set.height || 24;
    let body = ic.body;
    if (color) body = `<g fill="${color}">${body}</g>`;
    const scale = Math.max(1, 360 / h);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${Math.round(w * scale)}" height="${Math.round(h * scale)}">${body}</svg>`;
    await page.setViewportSize({ width: Math.round(w * scale) + 20, height: Math.round(h * scale) + 20 });
    await page.setContent(`<html><body style="margin:0;background:transparent">${svg}</body></html>`);
    await page.locator('svg').screenshot({ path: path.join(OUT, `logo_${name}.png`), omitBackground: true });
    console.log('logo', name, w, h);
  }
}
await browser.close();
srv.close();
