import React from 'react';
import { interpolate } from 'remotion';
import { C } from './theme';
import { EXPO, monotone, tw } from './lib';
import { REV, STAMPS, CUE } from './timeline';

// 20년 매출 곡선 — 곡선 장면(2006→2023, 낙폭 도장)과 봄 장면(2023→2025 반등)이 같은 좌표계를 공유해 매치 컷으로 이어진다.
export const X0 = 230, X1 = 1700, YB = 950, YT = 240, VMAX = 240;
export const xOf = (y: number) => X0 + ((y - 2006) / 19) * (X1 - X0);
export const yOf = (v: number) => YB - (v / VMAX) * (YB - YT);
export const val = monotone(REV);
const PTS: string[] = [];
for (let i = 0; i <= 600; i++) { const y = 2006 + (19 * i) / 600; PTS.push(`${xOf(y).toFixed(1)},${yOf(val(y)).toFixed(1)}`); }
const LINE = 'M' + PTS.join('L');
const AREA = LINE + `L${X1},${YB}L${X0},${YB}Z`;

export type ChartState = {
  f: number; // 장면 내부 프레임
  yr: number; // 곡선 머리 연도
  stampsOn: boolean[]; // 도장 표시 여부
  stampAt: number[]; // 도장 착지 프레임(장면 내부)
  compactAt: number[]; // 큰 도장 → 작은 라벨 전환 프레임
  peakOn: number; // 2018 정점 라벨 불투명도
  endOn: number; // 2025 끝점 라벨 불투명도
  head: number; // 머리 점 불투명도
  spring?: number; // 2023 이후 구간의 블루 강조(0..1)
};

export const ChartSvg: React.FC<ChartState> = ({ f, yr, stampsOn, stampAt, compactAt, peakOn, endOn, head, spring = 0 }) => {
  const hx = xOf(yr), hy = yOf(val(yr));
  const pulse = 30 + 8 * Math.sin(f * 0.3);
  return (
    <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
      <defs>
        <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={C.blue} stopOpacity={0.14} /><stop offset="1" stopColor={C.blue} stopOpacity={0} /></linearGradient>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={C.blue2} stopOpacity={0.32} /><stop offset="1" stopColor={C.blue2} stopOpacity={0} /></linearGradient>
        <clipPath id="cr"><rect x={0} y={0} width={Math.max(0, hx + 1)} height={1080} /></clipPath>
        <clipPath id="sp"><rect x={xOf(2023)} y={0} width={Math.max(0, hx - xOf(2023) + 1)} height={1080} /></clipPath>
      </defs>
      {[100, 200].map((v) => (
        <g key={v}><line x1={X0} x2={X1 + 40} y1={yOf(v)} y2={yOf(v)} stroke={C.frost} strokeWidth={2} strokeDasharray="6 10" />
          <text x={X0 - 18} y={yOf(v) + 10} textAnchor="end" fill={C.steel} fontSize={28} fontWeight={700}>${v}B</text></g>
      ))}
      <line x1={X0 - 10} x2={X1 + 40} y1={YB} y2={YB} stroke={C.steel} strokeWidth={2} />
      {REV.map(([y]) => <line key={y} x1={xOf(y)} x2={xOf(y)} y1={YB} y2={YB + (y % 5 === 0 || y === 2006 ? 14 : 7)} stroke={C.steel} strokeWidth={2} />)}
      {[2006, 2010, 2015, 2020, 2025].map((y) => <text key={y} x={xOf(y)} y={YB + 48} textAnchor="middle" fill={C.steel} fontSize={30} fontWeight={700}>{y}</text>)}
      <g clipPath="url(#cr)">
        <path d={AREA} fill="url(#ag)" />
        <path d={LINE} fill="none" stroke={C.blue} strokeWidth={7} strokeLinejoin="round" strokeLinecap="round" />
      </g>
      {spring > 0 && <g clipPath="url(#sp)" opacity={spring}><path d={AREA} fill="url(#sg)" /><path d={LINE} fill="none" stroke={C.blue2} strokeWidth={11} strokeLinejoin="round" strokeLinecap="round" /></g>}
      <text x={xOf(2018)} y={yOf(162.6) - 30} textAnchor="middle" fill={C.steel} fontSize={30} fontWeight={700} opacity={peakOn}>2018 · $162.6Bᵉ</text>
      <text x={xOf(2025) + 6} y={yOf(222) - 36} textAnchor="end" fill={C.blue} fontSize={48} fontWeight={900} opacity={endOn}>2025 · $222Bᵉ</text>
      {STAMPS.map((s, i) => {
        if (!stampsOn[i]) return null;
        const x = xOf(s.y), y = yOf(val(s.y));
        const on = tw(f, [stampAt[i] - 1, stampAt[i] + 8], [0, 1], EXPO);
        if (on <= 0) return null;
        const full = 1 - tw(f, [compactAt[i], compactAt[i] + 7], [0, 1]);
        const comp = tw(f, [compactAt[i] + 3, compactAt[i] + 10], [0, 1]);
        const sc = (s.above ? 1.5 : 1.25) - (s.above ? 0.5 : 0.25) * on;
        const big = s.above
          ? [[y - 210, s.yr, 34, C.steel, 700], [y - 92, s.d, 116, C.red, 900]]
          : [[y + 66, s.yr, 34, C.steel, 700], [y + 176, s.d, 104, C.red, 900]];
        return (
          <g key={s.y} opacity={on}>
            <circle cx={x} cy={y} r={16} fill={C.red} />
            <g opacity={full} transform={`translate(${x} ${y}) scale(${sc}) translate(${-x} ${-y})`}>
              {big.map(([yy, t, fs, c, w], j) => <text key={j} x={x} y={yy as number} textAnchor="middle" fill={c as string} fontSize={fs as number} fontWeight={w as number} letterSpacing={(fs as number) > 90 ? -4 : 0}>{t}</text>)}
            </g>
            <text x={x} y={y + 66} textAnchor="middle" fill={C.red} fontSize={44} fontWeight={900} opacity={comp}>{s.d}</text>
          </g>
        );
      })}
      <circle cx={hx} cy={hy} r={pulse} fill={C.blue} opacity={0.14 * head} />
      <circle cx={hx} cy={hy} r={15} fill={C.blue} stroke="#fff" strokeWidth={5} opacity={head} />
    </svg>
  );
};

// 키프레임 [프레임, 연도] 사이를 cos 보간 — 저점 도착은 cos 끝에서 감속(급정지 느낌)
export const yrAt = (keys: [number, number][], f: number) => {
  if (f <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [fa, ya] = keys[i - 1], [fb, yb] = keys[i];
    if (f <= fb) return interpolate(f, [fa, fb], [ya, yb], { easing: (t) => 0.5 - Math.cos(Math.PI * t) / 2 });
  }
  return keys[keys.length - 1][1];
};
export { CUE };
