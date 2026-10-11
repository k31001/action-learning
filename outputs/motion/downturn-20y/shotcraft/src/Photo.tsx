import React from 'react';
import { Img, staticFile, useCurrentFrame } from 'remotion';
import { HAS_PHOTOS } from './timeline';
import { tw } from './lib';

// 실사 플레이트(AI 생성, public/photos/ATTRIBUTION.md) — 느린 Ken Burns 한 방향 + 화이트 하이키 유지용 그라데이션.
// 사진 파일이 없으면(HAS_PHOTOS=false) 아무것도 그리지 않는다 — 그래픽만으로도 장면이 성립하도록 설계.
export const Photo: React.FC<{
  name: string; from?: number; to: number; scale?: [number, number]; pan?: [number, number]; origin?: string;
  fade?: string; opacity?: number;
}> = ({ name, from = 0, to, scale = [1.08, 1], pan = [0, 0], origin = '50% 50%', fade, opacity = 1 }) => {
  const f = useCurrentFrame();
  if (!HAS_PHOTOS) return null;
  const p = tw(f, [from, to], [0, 1], (t) => t);
  const s = scale[0] + (scale[1] - scale[0]) * p;
  const x = pan[0] + (pan[1] - pan[0]) * p;
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity }}>
      <Img src={staticFile(`photos/${name}.jpg`)} style={{ position: 'absolute', inset: 0, width: 1920, height: 1080, objectFit: 'cover', transform: `translateX(${x}px) scale(${s})`, transformOrigin: origin }} />
      {fade && <div style={{ position: 'absolute', inset: 0, background: fade }} />}
    </div>
  );
};
