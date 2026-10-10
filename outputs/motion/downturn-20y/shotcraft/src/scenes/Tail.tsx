import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { C, FONT, SERIF } from '../theme';
import { EXPO, INOUT, Lines, Marker, Source, Tag, tw, Up } from '../lib';
import { LANE, LANE0, LANES } from '../timeline';
import { Wafer } from '../Wafer';

/* ④ 교훈 (135f) — 눈 덮인 격자 속 8%의 블루 다이(씨앗). 「심은 것」에 마커 밑줄(marker-underline-title, 10f) */
export const Lesson: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.paper, fontFamily: FONT, color: C.ink, opacity: tw(f, [0, 8], [0, 1]) }}>
      <Wafer cx={960} cy={540} R={420} growAt={0} growDur={40} freezeAt={-60} full dim={0.55} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(1100px 560px at 50% 50%, rgba(255,255,255,.97), rgba(255,255,255,.85) 55%, rgba(255,255,255,0) 100%)' }} />
      <Lines at={8} stagger={10} lines={[
        <>승부는 <span style={{ color: C.blue }}>겨울</span>에</>,
        <><span style={{ position: 'relative', display: 'inline-block' }}><Marker at={44} len={392} color={C.blue} style={{ left: -6, bottom: -30, zIndex: 0 }} /><span style={{ position: 'relative' }}>심은 것</span></span>에서 갈렸다.</>,
      ]} style={{ position: 'absolute', left: 0, width: 1920, top: 236, textAlign: 'center', fontSize: 130, fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1.12, display: 'flex', flexDirection: 'column', alignItems: 'center' }} />
      <div style={{ position: 'absolute', left: 0, width: 1920, top: 640, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <Up at={62} style={{ display: 'flex', gap: 20, alignItems: 'baseline', fontSize: 52, fontWeight: 700 }}><Tag c={C.blue} size={38}>심은 것</Tag>40nm DDR3 · Line-16 · 1z DRAM</Up>
        <Up at={80} style={{ display: 'flex', gap: 20, alignItems: 'baseline', fontSize: 52, fontWeight: 700 }}><Tag c={C.red} size={38}>놓친 것</Tag>2019 HBM 전담팀 축소 → HBM 주도권</Up>
      </div>
      <Source at={20}>출처: wiki/downturn/downturn-history.md §4 — 승자의 행동 3가지 · samsung-2019-downturn-2017-2019-actions</Source>
    </AbsoluteFill>
  );
};

/* ⑤ 다음 겨울은 어디서 (510f) — 제목 강등(title-demote-to-label): 중앙 대제목이 서고(≥18f) 20f 단일 보간으로
   0.3x 좌상단 장 라벨이 된다. 이어 발원 3개 레인(각 150f) — 레인 전환은 잉크 블레이드, 하단 확률 막대가 44·48·8을 누적 */
const Blade: React.FC<{ at: number; color: string }> = ({ at, color }) => {
  const f = useCurrentFrame();
  const close = tw(f, [at - 9, at], [100, 0], (t) => t ** 4);
  const open = tw(f, [at + 1, at + 12], [0, 100], (t) => 1 - (1 - t) ** 4);
  if (f < at - 9 || f > at + 12) return null;
  return <div style={{ position: 'absolute', inset: 0, background: color, clipPath: f <= at ? `inset(0 ${close}% 0 0)` : `inset(0 0 0 ${open}%)` }} />;
};
export { Blade };

const Lane: React.FC<{ i: number; a: number }> = ({ i, a }) => {
  const f = useCurrentFrame();
  const L = LANES[i];
  const lf = f - a;
  if (lf < 0 || lf >= LANE) return null;
  const pct = Math.round(tw(f, [a + 14, a + 34], [0, L.p], EXPO));
  const bigIn = tw(f, [a + 4, a + 13], [0, 1], EXPO);
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Up at={a + 2} style={{ position: 'absolute', left: 120, top: 150, fontSize: 40, fontWeight: 700, color: C.steel }}>{L.no} · 발원</Up>
      <div style={{ position: 'absolute', left: 110, top: 196, fontSize: 180, fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1, color: C.blue, opacity: bigIn, transform: `scale(${1.3 - 0.3 * bigIn})`, transformOrigin: '0% 50%' }}>{L.t}</div>
      <Up at={a + 12} style={{ position: 'absolute', left: 120, top: 404, fontSize: 150, fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{pct}%</Up>
      <Up at={a + 20} style={{ position: 'absolute', left: 124, top: 572, fontSize: 36, fontWeight: 700, color: C.steel }}>조건부 확률 · {L.sub}</Up>
      <Up at={a + 26} style={{ position: 'absolute', left: 124, top: 650, width: 640, fontSize: 48, fontWeight: 700, lineHeight: 1.35 }}>{L.m[0]}<br />{L.m[1]}</Up>
      {L.h.map(([d, h1, h2], j) => {
        const ca = a + 30 + j * 26;
        const p = tw(f, [ca, ca + 11], [0, 1], (t) => 1 + 2.6 * (t - 1) ** 3 + 1.6 * (t - 1) ** 2);
        const op = tw(f, [ca, ca + 5], [0, 1]);
        const rot = (j % 2 ? 1 : -1) * (2 - 1.4 * Math.min(1, p));
        return (
          <div key={j} style={{ position: 'absolute', left: 800, top: 130 + j * 250, width: 1000, height: 222, background: '#fff', borderTop: `6px solid ${C.ink}`, boxShadow: `0 2px 0 ${C.frost}, 0 18px 40px rgba(11,16,32,.10)`, padding: '18px 36px 0', boxSizing: 'border-box', opacity: op, transform: `translateY(${(1 - p) * -70}px) rotate(${rot}deg)` }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', fontSize: 28, fontWeight: 700, color: C.steel }}>
              <span style={{ color: '#fff', background: C.ink, borderRadius: 3, padding: '0 10px' }}>가상 헤드라인</span><span>{d}</span>
            </div>
            <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 50, lineHeight: 1.26, letterSpacing: '-0.03em', marginTop: 8, color: C.ink }}>{h1}<br />{h2}</div>
          </div>
        );
      })}
    </div>
  );
};

export const Scen: React.FC = () => {
  const f = useCurrentFrame();
  const rev = tw(f, [2, 14], [0, 1], (t) => 1 - (1 - t) ** 3);
  const dem = tw(f, [40, 60], [0, 1], INOUT);
  const s = interpolate(dem, [0, 1], [1, 0.3]);
  const x = interpolate(dem, [0, 1], [960, 120]);
  const y = interpolate(dem, [0, 1], [500, 82]);
  const lane = Math.floor((f - LANE0) / LANE);
  const barIn = tw(f, [LANE0 + 6, LANE0 + 24], [0, 1], EXPO);
  const segs = LANES.map((L) => L.p);
  let acc = 120;
  return (
    <AbsoluteFill style={{ background: C.paper, fontFamily: FONT, color: C.ink, opacity: tw(f, [0, 6], [0, 1]) }}>
      <div style={{ opacity: 1 - tw(f, [34, 42], [0, 1]) }}><Up at={0} style={{ position: 'absolute', left: 0, width: 1920, textAlign: 'center', top: 340, fontSize: 48, fontWeight: 700, color: C.steel }}>시나리오 플래닝 · 다음 다운턴은 왜 오는가</Up></div>
      <div style={{ position: 'absolute', left: x, top: y, transformOrigin: 'left center', transform: `translate(${-(1 - dem) * 50}%, -50%) scale(${s})`, fontSize: 150, fontWeight: 900, letterSpacing: '-0.045em', whiteSpace: 'nowrap', opacity: rev, filter: `blur(${(1 - rev) * 12}px)` }}>
        다음 겨울은 <span style={{ color: C.blue }}>어디서</span> 오는가.
      </div>
      {LANES.map((_, i) => <Lane key={i} i={i} a={LANE0 + i * LANE} />)}
      {/* 하단 확률 막대: 지금 레인만 블루 */}
      <div style={{ position: 'absolute', left: 0, top: 0, opacity: barIn }}>
        {segs.map((p, i) => {
          const w = 1680 * (p / 100) - 6, left = acc; acc += 1680 * (p / 100);
          const on = i === lane, seen = i <= lane;
          return (
            <React.Fragment key={i}>
              <div style={{ position: 'absolute', left, top: 944, width: w * barIn, height: 22, borderRadius: 4, background: on ? C.blue : seen ? C.steel : C.frost }} />
              <div style={{ position: 'absolute', top: 892, ...(i === 2 ? { left: left + w - 300, width: 300, textAlign: 'right' } : { left }), fontSize: 32, fontWeight: 900, color: on ? C.blue : seen ? C.ink : C.steel, whiteSpace: 'nowrap', opacity: seen ? 1 : 0.7 }}>{LANES[i].t} {p}%</div>
            </React.Fragment>
          );
        })}
      </div>
      <Blade at={LANE0 + LANE} color={C.ink} />
      <Blade at={LANE0 + 2 * LANE} color={C.ink} />
      <Source at={LANE0}>확률: 2027~2030 다운턴 발생 시 발원별 조건부 확률(scenario-matrix.md) · 헤드라인: 2026-08 신호를 연장한 가상 헤드라인, 실제 보도 아님</Source>
    </AbsoluteFill>
  );
};

/* ⑥ 결론 (120f) — 얼었던 웨이퍼가 씨앗에서부터 해빙(블루가 번짐), 「지금, 무엇을 심을 것인가.」 착지 = slam 3/3, 이후 ≥2s 정지 */
export const End: React.FC = () => {
  const f = useCurrentFrame();
  const punch = 1 + 0.03 * tw(f, [36, 39], [0, 1]) * (1 - tw(f, [39, 52], [0, 1], EXPO));
  return (
    <AbsoluteFill style={{ background: C.paper, fontFamily: FONT, color: C.ink, transform: `scale(${punch})` }}>
      <Wafer cx={520} cy={540} R={330} growAt={-60} freezeAt={-90} thawAt={34} />
      <Lines at={6} lines={['겨울은 다시 온다.']} style={{ position: 'absolute', left: 1000, top: 262, fontSize: 96, fontWeight: 900, letterSpacing: '-0.045em', color: C.steel }} />
      <Lines at={22} stagger={8} lines={['지금, 무엇을', <><span style={{ color: C.blue }}>심을</span> 것인가.</>]} style={{ position: 'absolute', left: 1000, top: 410, fontSize: 136, fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1.08 }} />
    </AbsoluteFill>
  );
};
