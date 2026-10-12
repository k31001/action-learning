import React from 'react';
import { Easing, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { C, FONT } from './theme';
import { CUE } from './timeline';

export const EXPO = Easing.bezier(0.16, 1, 0.3, 1);
export const INOUT = Easing.inOut(Easing.cubic);
export const OUT = Easing.out(Easing.cubic);
export const IN = Easing.in(Easing.cubic);

export const tw = (f: number, r: [number, number], o: [number, number], e: (t: number) => number = OUT) =>
  interpolate(f, r, o, { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: e });
export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// 결정론적 의사난수 (shotcraft 핵심이념 9)
export const mulberry32 = (a: number) => () => {
  let t = (a += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
export const hash = (i: number) => mulberry32(i * 9301 + 49297)();

/* 라인 마스크 리빌: 줄마다 overflow 마스크 안에서 아래→위로 올라온다 (expo.out 21f, 줄 간 stagger) */
export const Lines: React.FC<{ at: number; lines: React.ReactNode[]; stagger?: number; out?: number; style?: React.CSSProperties; dur?: number }> = ({ at, lines, stagger = 4, out, style, dur = 21 }) => {
  const f = useCurrentFrame();
  return (
    <div style={style}>
      {lines.map((l, i) => {
        const pIn = tw(f, [at + i * stagger, at + i * stagger + dur], [112, 0], EXPO);
        const pOut = out == null ? 0 : tw(f, [out + i * 2, out + i * 2 + 10], [0, -112], IN);
        return (
          <div key={i} style={{ overflow: 'hidden', paddingBottom: '0.06em', marginBottom: '-0.06em' }}>
            <div style={{ transform: `translateY(${pIn + pOut}%)`, whiteSpace: 'nowrap' }}>{l}</div>
          </div>
        );
      })}
    </div>
  );
};

/* 페이드 업 */
export const Up: React.FC<{ at: number; children: React.ReactNode; dy?: number; dur?: number; style?: React.CSSProperties; dx?: number }> = ({ at, children, dy = 24, dx = 0, dur = 14, style }) => {
  const f = useCurrentFrame();
  const p = tw(f, [at, at + dur], [0, 1], EXPO);
  return <div style={{ ...style, opacity: p, transform: `translate(${(1 - p) * dx}px, ${(1 - p) * dy}px)` }}>{children}</div>;
};

/* 숫자 카운터 */
export const useCount = (from: number, to: number, a: number, b: number, e = OUT) => {
  const f = useCurrentFrame();
  return tw(f, [a, b], [from, to], e);
};
export const minus = (v: number, digits = 0) => (v < -Math.pow(10, -digits) / 2 ? '−' : '') + Math.abs(v).toFixed(digits);

/* 로고 — 삼성만 블루, 경쟁사는 그레이 (단일 액센트) */
const LOGO_AR: Record<string, number> = { samsung: 512 / 79, skhynix: 512 / 269, micron: 512 / 110 };
export const Logo: React.FC<{ k: 'samsung' | 'skhynix' | 'micron'; h: number; grey?: boolean }> = ({ k, h, grey }) => (
  <Img src={staticFile(`logos/${k}.svg`)} style={{ height: h, width: h * LOGO_AR[k], display: 'block', filter: grey ? 'grayscale(1) brightness(.62) contrast(1.1)' : undefined, opacity: grey ? 0.85 : 1 }} />
);
export const Wordmark: React.FC<{ t: string; ghost?: boolean; size?: number }> = ({ t, ghost, size = 36 }) => (
  <span style={{ display: 'inline-block', fontSize: size, fontWeight: 900, letterSpacing: '-0.01em', color: ghost ? C.steel : C.ink, border: `3px solid ${ghost ? C.steel : C.ink}`, borderRadius: 6, padding: '0 14px', lineHeight: 1.3 }}>{t}</span>
);

/* 태그 칩 */
export const Tag: React.FC<{ c?: string; children: React.ReactNode; size?: number }> = ({ c = C.steel, children, size = 32 }) => (
  <span style={{ flex: '0 0 auto', fontSize: size, fontWeight: 700, color: '#fff', background: c, borderRadius: 4, padding: '2px 14px', position: 'relative', top: -6 }}>{children}</span>
);

/* 출처 줄 (장식 각주 — 읽히는 글이 아니라 근거 표시, Q11 의도적 예외로 SPEC에 기록) */
export const Source: React.FC<{ children: React.ReactNode; at?: number }> = ({ children, at = 10 }) => (
  <Up at={at} dy={0} style={{ position: 'absolute', left: 120, bottom: 34, fontSize: 24, fontWeight: 500, color: C.steel, fontFamily: FONT }}>{children}</Up>
);

/* 오도미터 — demos/data/odometer-digit-roll 파라미터 계승: 0.85행/f 회전, 자리 i는 s0+i*7f에 16f 감속(out cubic) +0.5행 오버슈트 → 6f 복귀, 잔상 2장(0.25/0.12) 속도 게이트 */
const posAt = (f: number, i: number, d: number, s0: number, from: number) => {
  const SPIN = 0.85;
  const s = s0 + i * 7;
  const p0 = from + SPIN * (s - s0 + 14);
  const T = Math.ceil((p0 + 6 - d) / 10) * 10 + d;
  if (f < s0 - 14) return from;
  if (f < s) return from + SPIN * (f - s0 + 14);
  if (f < s + 16) return tw(f, [s, s + 16], [p0, T + 0.5], OUT);
  if (f < s + 22) return tw(f, [s + 16, s + 22], [T + 0.5, T], OUT);
  return T;
};
export const Odometer: React.FC<{ text: string; from: string; at: number; size: number; color: string }> = ({ text, from, at, size, color }) => {
  const f = useCurrentFrame();
  const ROW = size * 1.3, DW = size * 0.62;
  let di = 0;
  return (
    <div style={{ display: 'flex', height: ROW, overflow: 'hidden', WebkitMaskImage: 'linear-gradient(transparent, #000 22%, #000 78%, transparent)', maskImage: 'linear-gradient(transparent, #000 22%, #000 78%, transparent)', fontWeight: 900, fontSize: size, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>
      {text.split('').map((ch, k) => {
        if (!/\d/.test(ch)) return <div key={k} style={{ height: ROW, lineHeight: `${ROW}px`, color }}>{ch}</div>;
        const i = di++;
        const pos = posAt(f, i, +ch, at, +from[k]);
        const speed = Math.abs(pos - posAt(f - 1, i, +ch, at, +from[k]));
        const gate = tw(speed, [0.06, 0.5], [0, 1], (t) => t);
        const strip = (op: number, dy: number) => (
          <div style={{ position: 'absolute', left: 0, top: 0, width: DW, transform: `translateY(${-(pos % 10) * ROW + dy}px)`, opacity: op }}>
            {Array.from({ length: 20 }).map((_, n) => <div key={n} style={{ height: ROW, lineHeight: `${ROW}px`, textAlign: 'center', color }}>{n % 10}</div>)}
          </div>
        );
        return (
          <div key={k} style={{ position: 'relative', width: DW, height: ROW, overflow: 'hidden' }}>
            {gate > 0.001 && strip(0.25 * gate, ROW * 0.5)}
            {gate > 0.001 && strip(0.12 * gate, -ROW * 0.5)}
            {strip(1, 0)}
          </div>
        );
      })}
    </div>
  );
};
export const odoLockFrames = (at: number, digits: number) => Array.from({ length: digits }, (_, i) => at + i * 7 + 16);

/* 마커 밑줄 — demos/typography/marker-underline-title: 10f 좌→우, 변폭·거친 가장자리, 좌저우고 */
const buildStroke = (len: number, seed: number) => {
  const rand = mulberry32(seed);
  const N = 40, top: string[] = [], bot: string[] = [];
  const wob = Array.from({ length: N + 1 }, () => rand() - 0.5);
  for (let i = 0; i <= N; i++) {
    const t = i / N, x = t * len;
    const mid = 19 - t * 7 + Math.sin(t * Math.PI * 1.6 + 0.4) * 2.6 + wob[i] * 1.6;
    const w = Math.max(2.2, 18 + Math.sin(t * Math.PI) * 8 - Math.max(0, t - 0.88) * 60 + wob[i] * 3);
    top.push(`${x.toFixed(1)},${(mid - w / 2).toFixed(1)}`);
    bot.push(`${x.toFixed(1)},${(mid + w / 2).toFixed(1)}`);
  }
  return `M${top.join('L')}L${bot.reverse().join('L')}Z`;
};
export const Marker: React.FC<{ at: number; len: number; color: string; seed?: number; style?: React.CSSProperties }> = ({ at, len, color, seed = 77, style }) => {
  const f = useCurrentFrame();
  const d = tw(f, [at, at + 10], [0, 1], (t) => 1 - Math.pow(1 - t, 2.2));
  const id = `mk${seed}`;
  return (
    <svg width={len} height={44} viewBox={`0 0 ${len} 44`} style={{ position: 'absolute', overflow: 'visible', ...style }}>
      <defs><clipPath id={id}><rect x={-4} y={-20} width={d * (len + 8)} height={80} /></clipPath></defs>
      {d > 0 && <path d={buildStroke(len, seed)} fill={color} clipPath={`url(#${id})`} />}
    </svg>
  );
};

/* 단조 3차 보간 (Fritsch–Carlson) — 매출 곡선 */
export const monotone = (pts: [number, number][]) => {
  const n = pts.length, dx: number[] = [], m: number[] = [], t: number[] = [];
  for (let i = 0; i < n - 1; i++) { dx[i] = pts[i + 1][0] - pts[i][0]; m[i] = (pts[i + 1][1] - pts[i][1]) / dx[i]; }
  t[0] = m[0]; t[n - 1] = m[n - 2];
  for (let i = 1; i < n - 1; i++) t[i] = m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2;
  for (let i = 0; i < n - 1; i++) {
    if (m[i] === 0) { t[i] = t[i + 1] = 0; continue; }
    const a = t[i] / m[i], b = t[i + 1] / m[i], s = a * a + b * b;
    if (s > 9) { const k = 3 / Math.sqrt(s); t[i] = k * a * m[i]; t[i + 1] = k * b * m[i]; }
  }
  return (x: number) => {
    let i = 0; while (i < n - 2 && x > pts[i + 1][0]) i++;
    const h = dx[i], u = clamp((x - pts[i][0]) / h);
    const h00 = 2 * u ** 3 - 3 * u ** 2 + 1, h10 = u ** 3 - 2 * u ** 2 + u, h01 = -2 * u ** 3 + 3 * u ** 2, h11 = u ** 3 - u ** 2;
    return h00 * pts[i][1] + h10 * h * t[i] + h01 * pts[i + 1][1] + h11 * h * t[i + 1];
  };
};

/* 큐 헬퍼 — 장면 내부 프레임 기준 큐 시작/끝 */
export const cue = (id: string) => CUE[id].at;
export const cueEnd = (id: string) => CUE[id].end;
