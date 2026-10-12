import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(92);
Config.setOverwriteOutput(true);
Config.setConcurrency(4);
// 클라우드/CI: Playwright 동봉 Chromium headless shell 사용 (REMOTION_BROWSER 로 덮어쓰기)
const shell = process.env.REMOTION_BROWSER ?? '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
try { require('fs').accessSync(shell); Config.setBrowserExecutable(shell); } catch {}
