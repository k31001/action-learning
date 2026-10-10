import React from 'react';
import { interpolateColors, useCurrentFrame } from 'remotion';
import { C } from './theme';
import { clamp, hash, tw } from './lib';

// 웨이퍼 다이 격자 — shotcraft data/avatar-grid-radial-build-colorize 의 2막 구조를 이식:
// 1막 중심에서 링 단위로 다이가 "자라고"(scale .8→1 + opacity, 위치 이동 없음), 2막 일부가 색을 바꾼다.
// 여기서 2막은 "결빙": 블루 다이가 가장자리부터 안쪽으로 서리색(frost)으로 얼어붙고, 8%만 블루로 남는다(씨앗).
const CELL = 30, DIE = 23;

type Props = {
  cx: number; cy: number; R: number;
  growAt: number; // 생장 시작 프레임
  growDur?: number; // 가장자리까지 도달 시간
  freezeAt?: number; // 결빙 시작 (없으면 결빙 없음)
  thawAt?: number; // 해빙 시작 — 남은 씨앗에서 블루가 다시 번진다
  full?: boolean; // 웨이퍼 외곽선 없이 화면 전체 격자
  dim?: number; // 전체 불투명도
};

export const Wafer: React.FC<Props> = ({ cx, cy, R, growAt, growDur = 30, freezeAt, thawAt, full, dim = 1 }) => {
  const f = useCurrentFrame();
  const cols = Math.ceil(1920 / CELL) + 2, rows = Math.ceil(1080 / CELL) + 2;
  const ox = ((cx - DIE / 2) % CELL) - CELL, oy = ((cy - DIE / 2) % CELL) - CELL;
  const rects: React.ReactNode[] = [];
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const x = ox + i * CELL, y = oy + j * CELL, dx = x + DIE / 2 - cx, dy = y + DIE / 2 - cy;
    const d = Math.hypot(dx, dy) / R;
    if (!full && (d > 0.96 || dy > R * 0.92)) continue;
    const k = j * 997 + i, r1 = hash(k), r2 = hash(k + 31337), r3 = hash(k + 7);
    const a = growAt + Math.min(d, 1.6) * growDur + r1 * 5;
    const g = tw(f, [a, a + 6], [0, 1]);
    if (g <= 0) continue;
    const seed = r2 < 0.08; // 결빙에도 살아남는 블루 다이
    let cold = 0;
    if (freezeAt != null && !seed) { const fa = freezeAt + (1 - clamp(d)) * 16 + r3 * 8; cold = tw(f, [fa, fa + 6], [0, 1]); }
    if (thawAt != null) { const ta = thawAt + clamp(d) * 22 + r3 * 6; cold *= 1 - tw(f, [ta, ta + 6], [0, 1]); }
    const base = r3 > 0.8 ? C.blue2 : C.blue;
    const fill = interpolateColors(cold, [0, 1], [base, C.frost]);
    const op = (0.62 + 0.38 * r3) * (1 - cold) + 0.9 * cold;
    const s = 0.8 + 0.2 * g;
    rects.push(<rect key={k} x={x + (DIE * (1 - s)) / 2} y={y + (DIE * (1 - s)) / 2} width={DIE * s} height={DIE * s} fill={fill} opacity={op * g * dim} />);
  }
  const ring = full ? 0 : tw(f, [growAt + growDur * 0.6, growAt + growDur + 8], [0, 1]);
  const a0 = Math.acos(0.92);
  const arc = (() => {
    const rr = R * 1.03, s = Math.PI / 2 + a0, e = Math.PI * 2.5 - a0;
    const p = (t: number) => `${cx + rr * Math.cos(t)},${cy + rr * Math.sin(t)}`;
    return `M${p(s)} A${rr},${rr} 0 1 1 ${p(e)} Z`;
  })();
  return (
    <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0 }}>
      {rects}
      {!full && <path d={arc} fill="none" stroke={C.frost} strokeWidth={3} opacity={ring * dim} />}
    </svg>
  );
};
