import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C } from '../theme';
import { cue, cueEnd, EXPO, Lines, tw, Up } from '../lib';
import { Wafer } from '../Wafer';
import { Photo } from '../Photo';
import { HAS_PHOTOS } from '../timeline';

// ① 표지 — 실사 콜드 오픈(서리 낀 웨이퍼 매크로, 느린 푸시) → 같은 자리의 그래픽 웨이퍼로 매치 컷(디졸브 12f)
// → 웨이퍼가 왼쪽으로 비키며 「20년,」(o1 「지난 이십 년」) → 「네 번의 겨울.」(o1 끝) 착지와 함께 가장자리부터 결빙.
export const TOPEN = () => { const o1 = cue('o1'); const X = HAS_PHOTOS ? o1 + 6 : 0; return { X, title2: Math.max(X + 50, cueEnd('o1') - 30) }; };
export const Open: React.FC = () => {
  const f = useCurrentFrame();
  const { X, title2 } = TOPEN(); // X = 사진 → 그래픽 전환
  const grow = HAS_PHOTOS ? X - 18 : 4;
  const slide = tw(f, [X + 16, X + 40], [0, 1], EXPO);
  const wx = HAS_PHOTOS ? 620 - 80 * slide : 960 - 420 * slide; // 사진 속 웨이퍼 자리에서 시작
  const push = 1 + 0.04 * tw(f, [X, X + 200], [0, 1], (t) => t);
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${push})` }}>
        <Wafer cx={wx} cy={540} R={330} growAt={grow} growDur={22} freezeAt={title2 + 4} />
        <Up at={X + 34} style={{ position: 'absolute', left: 1004, top: 262, fontSize: 40, fontWeight: 700, color: C.steel }}>메모리 다운턴 복기 · 2006 — 2026</Up>
        <Lines at={X + 40} lines={['20년,']} style={{ position: 'absolute', left: 996, top: 322, fontSize: 230, fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1.04, color: C.ink }} />
        <Lines at={title2} lines={[<>네 번의 <span style={{ color: C.blue }}>겨울</span>.</>]} style={{ position: 'absolute', left: 1002, top: 584, fontSize: 132, fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1.04, color: C.ink }} />
      </div>
      {HAS_PHOTOS && <Photo name="wafer-frost" to={X + 12} scale={[1.0, 1.1]} origin="30% 55%" opacity={1 - tw(f, [X, X + 12], [0, 1])} />}
    </AbsoluteFill>
  );
};
