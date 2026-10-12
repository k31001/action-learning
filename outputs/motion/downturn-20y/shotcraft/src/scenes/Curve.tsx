import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { C, FONT } from '../theme';
import { clamp, cue, EXPO, INOUT, Lines, Source, tw, Up } from '../lib';
import { ChartSvg, val, xOf, yOf, yrAt } from '../Chart';

// ② 20년 곡선 (2006→2023) — timeline-travel 카메라를 곡선 머리 추적으로: 1.45x 로 따라가다
// 내레이터가 숫자를 읽는 순간(c2..c5 큐 시작) 저점에 도착해 낙폭 도장을 찍는다. −45% 에서 화면 펀치(slam 1/3).
// c6 「겨울은 갈수록 깊어졌습니다」에서 풀백. 2024–25 는 비워 둔다 — 봄 장면이 같은 좌표계로 이어 그린다.
const Z = 1.45;
export const Curve: React.FC = () => {
  const f = useCurrentFrame();
  const S = [cue('c2'), cue('c3'), cue('c4'), cue('c5')];
  const keys: [number, number][] = [[cue('c1'), 2006], [S[0], 2009], [S[1], 2012], [S[2], 2019], [S[3], 2023]];
  const yr = yrAt(keys, f);
  const hx = xOf(yr);
  let sy = 0; for (let k = -10; k <= 10; k += 2) sy += yOf(val(yrAt(keys, f + k))); sy /= 11;
  const P0 = cue('c6');
  const pull = tw(f, [P0, P0 + 38], [0, 1], INOUT);
  // 마지막 도장 이후엔 카메라 바닥 고정 — 아래쪽 도장이 화면 안에 남게
  const fx = clamp(hx + 200, 960 / Z, 1920 - 960 / Z), fy = Math.max(clamp(sy, 372, 760), 640 * tw(f, [S[3] - 8, S[3] + 2], [0, 1]));
  const cx = interpolate(pull, [0, 1], [fx, 960]), cy = interpolate(pull, [0, 1], [fy, 540]);
  const z = interpolate(pull, [0, 1], [Z, 1]);
  const punch = 1 + 0.035 * tw(f, [S[3], S[3] + 3], [0, 1]) * (1 - tw(f, [S[3] + 3, S[3] + 14], [0, 1], EXPO));
  const compactAt = [S[1] - 10, S[2] - 10, S[3] - 10, P0 + 14];
  const labels = 1 - tw(f, [S[0] - 10, S[0] - 4], [0, 1]) + tw(f, [P0 + 24, P0 + 36], [0, 1]);
  return (
    <AbsoluteFill style={{ background: C.paper, fontFamily: FONT, opacity: tw(f, [0, 8], [0, 1]) }}>
      <div style={{ position: 'absolute', inset: 0, transformOrigin: '0 0', transform: `translate(960px,540px) scale(${z * punch}) translate(${-cx}px,${-cy}px)` }}>
        <ChartSvg f={f} yr={yr} stampsOn={[true, true, true, true]} stampAt={S} compactAt={compactAt} peakOn={tw(f, [S[2] - 30, S[2] - 22], [0, 1])} endOn={0} head={1} />
      </div>
      <div style={{ opacity: labels }}>
        <Up at={4} dy={0} style={{ position: 'absolute', left: 120, top: 84, fontSize: 40, fontWeight: 700, color: C.steel }}>전체 메모리(DRAM+NAND) 연 매출 · $B</Up>
      </div>
      <Lines at={P0 + 30} lines={[<>겨울은 갈수록 <span style={{ color: C.blue }}>깊어졌다.</span></>]} style={{ position: 'absolute', left: 116, top: 140, fontSize: 96, fontWeight: 900, letterSpacing: '-0.045em', color: C.ink }} />
      <Source at={P0 + 30}>출처: wiki/downturn/downturn-history.md — iSuppli·IHS·Gartner·TrendForce 집계(ᵉ 추정 포함)</Source>
    </AbsoluteFill>
  );
};
