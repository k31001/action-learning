import React, { useEffect, useState } from 'react';
import { Composition, continueRender, delayRender, staticFile } from 'remotion';
import { Main, Props } from './Main';
import { FPS, TOTAL } from './timeline';

// 한글 폰트: scripts/fetch-fonts.mjs 가 원고 글자만 담은 woff2 서브셋을 public/fonts 에 굽는다
const FACES: [string, string, number][] = [
  ['Noto Sans KR', 'sans-500', 500], ['Noto Sans KR', 'sans-700', 700], ['Noto Sans KR', 'sans-900', 900], ['Noto Serif KR', 'serif-900', 900],
];
// @font-face 선언 + 컴포넌트 마운트 시 굵기별 명시 로드 (Remotion 권장 패턴: delayRender 는 컴포넌트 안에서)
const injectFaces = () => {
  if (document.getElementById('fw-fonts')) return;
  const st = document.createElement('style');
  st.id = 'fw-fonts';
  st.textContent = FACES.map(([fam, file, w]) => `@font-face{font-family:"${fam}";font-weight:${w};font-display:block;src:url(${staticFile(`fonts/${file}.woff2`)}) format("woff2");}`).join('\n');
  document.head.appendChild(st);
};
const WithFonts: React.FC<Props> = (p) => {
  const [h] = useState(() => delayRender('fonts'));
  useEffect(() => {
    injectFaces();
    Promise.all(FACES.map(([fam, , w]) => document.fonts.load(`${w} 40px "${fam}"`, '겨울가0')))
      .then(() => continueRender(h), (e) => { console.error(e); continueRender(h); });
  }, [h]);
  return <Main {...p} />;
};

export const Root: React.FC = () => (
  <Composition id="FourWinters" component={WithFonts} durationInFrames={TOTAL} fps={FPS} width={1920} height={1080} defaultProps={{ bgm: true }} />
);
