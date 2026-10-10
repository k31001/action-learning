import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C } from '../theme';
import { EXPO, Lines, tw, Up } from '../lib';
import { Wafer } from '../Wafer';

// ① 표지 (135f) — 단일 주인공: 웨이퍼. 0–34 중심에서 다이가 자라고(블루), 36–56 웨이퍼가 왼쪽으로 비켜서며
// 타이틀 자리를 내주고, 78 「네 번의 겨울.」 착지와 동시에 가장자리부터 얼어붙는다. 착지 후 ≥30f 정지(R1).
export const Open: React.FC = () => {
  const f = useCurrentFrame();
  const slide = tw(f, [34, 58], [0, 1], EXPO);
  const wx = 960 - 420 * slide;
  const push = 1 + 0.045 * tw(f, [0, 135], [0, 1], (t) => t); // slow push
  return (
    <AbsoluteFill style={{ background: C.paper, transform: `scale(${push})` }}>
      <Wafer cx={wx} cy={540} R={330} growAt={4} growDur={30} freezeAt={80} />
      <Up at={50} style={{ position: 'absolute', left: 1004, top: 262, fontSize: 40, fontWeight: 700, color: C.steel }}>메모리 다운턴 복기 · 2006 — 2026</Up>
      <Lines at={56} lines={['20년,']} style={{ position: 'absolute', left: 996, top: 322, fontSize: 230, fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1.04, color: C.ink }} />
      <Lines at={76} lines={[<>네 번의 <span style={{ color: C.blue }}>겨울</span>.</>]} style={{ position: 'absolute', left: 1002, top: 584, fontSize: 132, fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1.04, color: C.ink }} />
    </AbsoluteFill>
  );
};
