import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { C, FONT } from '../theme';
import { clamp, EXPO, INOUT, Lines, monotone, Source, tw, Up } from '../lib';
import { HEADKEYS, REV, STAMPS } from '../timeline';

// ② 20년 곡선 (270f) — shotcraft data/timeline-travel 의 「느린 출발→질주→급정지」 카메라를 곡선 머리 추적으로 이식.
// 1.45x 로 머리를 따라가며 저점마다 낙폭 도장(−26·−19·−34·−45%), 186f 부터 풀백해 20년 전체를 드러내고
// 228f 「그리고, 다시 일어섰다.」 착지 후 정지. 화면 전체 충격은 −45%(대형 slam 1/3)에만.
const X0 = 230, X1 = 1700, YB = 950, YT = 240, VMAX = 240;
const xOf = (y: number) => X0 + ((y - 2006) / 19) * (X1 - X0);
const yOf = (v: number) => YB - (v / VMAX) * (YB - YT);
const val = monotone(REV);
const yrAt = (f: number) => {
  for (let i = 1; i < HEADKEYS.length; i++) {
    const [fa, ya] = HEADKEYS[i - 1], [fb, yb] = HEADKEYS[i];
    if (f <= fb) return interpolate(f, [fa, fb], [ya, yb], { extrapolateLeft: 'clamp', easing: (t) => 0.5 - Math.cos(Math.PI * t) / 2 });
  }
  return 2025;
};
const PATH = (() => {
  const pts: string[] = [];
  for (let i = 0; i <= 600; i++) { const y = 2006 + (19 * i) / 600; pts.push(`${xOf(y).toFixed(1)},${yOf(val(y)).toFixed(1)}`); }
  return pts;
})();
const LINE = 'M' + PATH.join('L');
const AREA = LINE + `L${X1},${YB}L${X0},${YB}Z`;
const Z = 1.45;

export const Curve: React.FC = () => {
  const f = useCurrentFrame();
  const yr = yrAt(f);
  const hx = xOf(yr), hy = yOf(val(yr));
  // 카메라: 머리 앞쪽에 여백(리드룸)을 두고 추적, y는 ±10f 평균으로 매끈하게
  let sy = 0; for (let k = -10; k <= 10; k += 2) sy += yOf(val(yrAt(f + k))); sy /= 11;
  const pull = tw(f, [186, 224], [0, 1], INOUT);
  // −45% 도장 이후엔 카메라가 머리를 따라 올라가지 않는다 — 아래쪽 도장이 화면 안에 남도록 바닥 고정
  const fx = clamp(hx + 200, 960 / Z, 1920 - 960 / Z), fy = Math.max(clamp(sy, 372, 760), 640 * tw(f, [172, 182], [0, 1]));
  const cx = interpolate(pull, [0, 1], [fx, 960]), cy = interpolate(pull, [0, 1], [fy, 540]);
  const z = interpolate(pull, [0, 1], [Z, 1]);
  // −45% 착지 순간 한 번의 화면 펀치 (crash-zoom 6f 오버슈트 후 복귀)
  const punch = 1 + 0.035 * tw(f, [180, 183], [0, 1]) * (1 - tw(f, [183, 194], [0, 1], EXPO));
  const fadeIn = tw(f, [0, 10], [0, 1]);
  const pulse = 30 + 8 * Math.sin(f * 0.3);
  return (
    <AbsoluteFill style={{ background: C.paper, opacity: fadeIn, fontFamily: FONT }}>
      <div style={{ position: 'absolute', inset: 0, transformOrigin: '0 0', transform: `translate(960px,540px) scale(${z * punch}) translate(${-cx}px,${-cy}px)` }}>
        <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
          <defs>
            <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={C.blue} stopOpacity={0.14} /><stop offset="1" stopColor={C.blue} stopOpacity={0} /></linearGradient>
            <clipPath id="cr"><rect x={0} y={0} width={Math.max(0, hx + 1)} height={1080} /></clipPath>
          </defs>
          {[100, 200].map((v) => (
            <g key={v}><line x1={X0} x2={X1 + 40} y1={yOf(v)} y2={yOf(v)} stroke={C.frost} strokeWidth={2} strokeDasharray="6 10" />
              <text x={X0 - 18} y={yOf(v) + 10} textAnchor="end" fill={C.steel} fontSize={28} fontWeight={700}>${v}B</text></g>
          ))}
          <line x1={X0 - 10} x2={X1 + 40} y1={YB} y2={YB} stroke={C.steel} strokeWidth={2} />
          {REV.map(([y]) => <line key={y} x1={xOf(y)} x2={xOf(y)} y1={YB} y2={YB + (y % 5 === 0 || y === 2006 ? 14 : 7)} stroke={C.steel} strokeWidth={2} />)}
          {[2006, 2010, 2015, 2020, 2025].map((y) => <text key={y} x={xOf(y)} y={YB + 52} textAnchor="middle" fill={C.steel} fontSize={30} fontWeight={700}>{y}</text>)}
          <g clipPath="url(#cr)">
            <path d={AREA} fill="url(#ag)" />
            <path d={LINE} fill="none" stroke={C.blue} strokeWidth={7} strokeLinejoin="round" strokeLinecap="round" />
          </g>
          {/* 2018 정점 / 2025 끝점 라벨 */}
          <g opacity={tw(f, [118, 126], [0, 1])}>
            <text x={xOf(2018)} y={yOf(162.6) - 30} textAnchor="middle" fill={C.steel} fontSize={30} fontWeight={700}>2018 · $162.6B</text>
          </g>
          <g opacity={tw(f, [214, 222], [0, 1])}>
            <text x={xOf(2025) + 6} y={yOf(222) - 36} textAnchor="end" fill={C.blue} fontSize={44} fontWeight={900}>2025 · $222B</text>
          </g>
          {STAMPS.map((s, i) => {
            const x = xOf(s.y), y = yOf(val(s.y));
            const on = tw(f, [s.f - 1, s.f + 8], [0, 1], EXPO);
            if (on <= 0) return null;
            const next = i < 3 ? STAMPS[i + 1].f - 10 : 200;
            const full = 1 - tw(f, [next, next + 7], [0, 1]);
            const comp = tw(f, [next + 3, next + 10], [0, 1]);
            const sc = (s.above ? 1.5 : 1.25) - (s.above ? 0.5 : 0.25) * on;
            const big = s.above
              ? [[y - 286, s.yr, 30, C.steel, 700], [y - 242, s.c, 34, C.ink, 900], [y - 142, s.d, 104, C.red, 900]]
              : [[y + 62, s.yr, 30, C.steel, 700], [y + 104, s.c, 34, C.ink, 900], [y + 190, s.d, 92, C.red, 900]];
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
          <circle cx={hx} cy={hy} r={pulse} fill={C.blue} opacity={yr < 2024.99 && f > 2 ? 0.14 : 0} />
          <circle cx={hx} cy={hy} r={15} fill={C.blue} stroke="#fff" strokeWidth={5} />
        </svg>
      </div>
      {/* 고정 라벨은 줌 추적 중(26–200f)엔 비켜 있다 — 확대된 낙폭 도장과 겹치지 않게 */}
      <div style={{ opacity: 1 - tw(f, [20, 26], [0, 1]) + tw(f, [200, 212], [0, 1]) }}>
        <Up at={6} dy={0} style={{ position: 'absolute', left: 120, top: 84, fontSize: 40, fontWeight: 700, color: C.steel }}>전체 메모리(DRAM+NAND) 연 매출 · $B</Up>
      </div>
      <Lines at={228} lines={[<>그리고, 다시 <span style={{ color: C.blue }}>일어섰다.</span></>]} style={{ position: 'absolute', left: 116, top: 140, fontSize: 100, fontWeight: 900, letterSpacing: '-0.045em', color: C.ink }} />
      <Source at={222}>출처: wiki/downturn/downturn-history.md — iSuppli·IHS·Gartner·TrendForce 집계(ᵉ 추정 포함)</Source>
    </AbsoluteFill>
  );
};
