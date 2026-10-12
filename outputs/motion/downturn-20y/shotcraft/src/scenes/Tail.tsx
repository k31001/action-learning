import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { C, FONT, SERIF } from '../theme';
import { cue, cueEnd, EXPO, INOUT, Lines, Logo, Marker, Source, Tag, tw, Up } from '../lib';
import { cardStep, HAS_PHOTOS, laneStarts, LANES } from '../timeline';
import { ChartSvg, yrAt } from '../Chart';
import { Wafer } from '../Wafer';
import { Photo } from '../Photo';

/* 장 전환 블레이드 — 9f power4.in 닫힘 → 11f power4.out 열림 */
export const Blade: React.FC<{ at: number; color: string }> = ({ at, color }) => {
  const f = useCurrentFrame();
  if (f < at - 9 || f > at + 12) return null;
  const close = tw(f, [at - 9, at], [100, 0], (t) => t ** 4);
  const open = tw(f, [at + 1, at + 12], [0, 100], (t) => 1 - (1 - t) ** 4);
  return <div style={{ position: 'absolute', inset: 0, background: color, clipPath: f <= at ? `inset(0 ${close}% 0 0)` : `inset(0 0 0 ${open}%)` }} />;
};

/* ⑤ 봄 — 곡선 좌표계로 돌아와 2023→2025 반등을 이어 그림(굵은 블루), $222Bᵉ.
   p3 「HBM의 봄은 먼저 준비한 쪽의 몫」에서 HBM 패키지 실사로 넘어가 주도권 한 줄 */
export const Spring: React.FC = () => {
  const f = useCurrentFrame();
  const p1 = cue('p1'), p2 = cue('p2'), p3 = cue('p3');
  const yr = yrAt([[p1 + 4, 2023], [p2 + 6, 2025]], f);
  const spring = tw(f, [p1, p1 + 10], [0, 1]);
  const toPhoto = tw(f, [p3 - 4, p3 + 14], [0, 1], INOUT);
  const all = [0, 0, 0, 0];
  return (
    <AbsoluteFill style={{ background: C.paper, fontFamily: FONT, color: C.ink, opacity: tw(f, [0, 6], [0, 1]) }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - toPhoto, transform: `translateX(${-toPhoto * 120}px)` }}>
        <ChartSvg f={f} yr={yr} stampsOn={[true, true, true, true]} stampAt={all} compactAt={all} peakOn={1} endOn={tw(f, [p2 + 4, p2 + 12], [0, 1])} head={1} spring={spring} />
        <Up at={2} dy={0} style={{ position: 'absolute', left: 120, top: 84, fontSize: 40, fontWeight: 700, color: C.steel }}>전체 메모리(DRAM+NAND) 연 매출 · $B</Up>
        <Lines at={p1 + 2} lines={[<>그리고, 다시 <span style={{ color: C.blue }}>봄.</span></>]} style={{ position: 'absolute', left: 116, top: 140, fontSize: 110, fontWeight: 900, letterSpacing: '-0.045em' }} />
        <Up at={p2 + 8} style={{ position: 'absolute', right: 214, top: 96, display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <span style={{ fontSize: 36, fontWeight: 700, color: C.steel }}>AI 슈퍼사이클</span>
          <span style={{ fontSize: 52, fontWeight: 900, color: C.blue }}>사상 최대</span>
        </Up>
      </div>
      <div style={{ position: 'absolute', inset: 0, opacity: toPhoto }}>
        <Photo name="hbm-package" from={p3 - 4} to={p3 + 150} scale={[1.08, 1.0]} pan={[300, 240]} fade="linear-gradient(90deg, rgba(255,255,255,.98) 0%, rgba(255,255,255,.94) 46%, rgba(255,255,255,0) 80%)" />
        <div style={{ position: 'absolute', left: 140, top: 330, width: 900 }}>
          <Lines at={p3 + 6} stagger={6} lines={['HBM의 봄은,', <>먼저 준비한 쪽의 <span style={{ color: C.blue }}>몫</span>.</>]} style={{ fontSize: 104, fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1.1 }} />
          <Up at={p3 + 30} style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 22 }}>
            <span style={{ fontSize: 40, fontWeight: 700, color: C.steel }}>HBM 주도권</span>
            <span style={{ fontSize: 44, fontWeight: 900 }}>→</span>
            <Logo k="skhynix" h={100} grey />
          </Up>
        </div>
      </div>
      <Source at={p1}>출처: wiki/downturn/downturn-history.md(’25ᵉ 추정) · wiki/concepts/hbm-market.md</Source>
    </AbsoluteFill>
  );
};

/* ⑥ 교훈 — 눈 속 새싹 실사(오른쪽) + 왼쪽 타이포. 「투자」 마커 밑줄(marker-underline-title, 10f).
   v2.4: 「심은 것」 비유를 직설로 교체(2026-10-12 사용자 지시) */
export const Lesson: React.FC = () => {
  const f = useCurrentFrame();
  const l1 = cue('l1'), l2 = cue('l2'), l3 = cue('l3');
  return (
    <AbsoluteFill style={{ background: C.paper, fontFamily: FONT, color: C.ink, opacity: tw(f, [0, 8], [0, 1]) }}>
      {HAS_PHOTOS
        ? <Photo name="seedling" to={240} scale={[1.0, 1.07]} origin="70% 60%" fade="linear-gradient(90deg, rgba(255,255,255,.97) 0%, rgba(255,255,255,.88) 42%, rgba(255,255,255,0) 72%)" />
        : <><Wafer cx={960} cy={540} R={420} growAt={0} growDur={40} freezeAt={-60} full dim={0.55} /><div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(1100px 560px at 40% 50%, rgba(255,255,255,.97), rgba(255,255,255,.85) 55%, rgba(255,255,255,0) 100%)' }} /></>}
      <Lines at={l1 + 4} stagger={10} lines={[
        <>승부는 <span style={{ color: C.blue }}>겨울</span>의</>,
        <><span style={{ position: 'relative', display: 'inline-block' }}><Marker at={l1 + 40} len={250} color={C.blue} style={{ left: -6, bottom: -30 }} /><span style={{ position: 'relative' }}>투자</span></span>에서 갈렸다.</>,
      ]} style={{ position: 'absolute', left: 140, top: 230, fontSize: 124, fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1.12 }} />
      <div style={{ position: 'absolute', left: 146, top: 620, display: 'flex', flexDirection: 'column', gap: 22 }}>
        <Up at={l2} style={{ display: 'flex', gap: 20, alignItems: 'baseline', fontSize: 52, fontWeight: 700 }}><Tag c={C.blue} size={38}>투자한 것</Tag>40nm DDR3 · 20nm급 · 1z DRAM</Up>
        <Up at={l3} style={{ display: 'flex', gap: 20, alignItems: 'baseline', fontSize: 52, fontWeight: 700 }}><Tag c={C.red} size={38}>놓친 것</Tag>HBM보다 범용 DRAM 중심 운영</Up>
      </div>
      <Source at={l1 + 10}>출처: wiki/downturn/downturn-history.md §4 · samsung-2019-downturn-2017-2019-actions</Source>
    </AbsoluteFill>
  );
};

/* ⑦ 다음 겨울은 어디서 — 제목 강등(title-demote-to-label) → 발원 3레인(내레이션 큐 s1..s3 에 맞춰 교체, 잉크 블레이드).
   확률은 쓰지 않고 발원별 두 케이스로 설명. 가상 헤드라인은 「던져지는 신문」: 화면 밖에서 회전하며 날아와 중앙에 크게 멈춘 뒤
   (배경은 흰 막으로 눌러 집중) 제자리로 내려앉는다. 카드 한 장 = 던지기 12f + 중앙 정지 16f + 제자리 12f + 착지 반동 6f */
export const THROW = { fly: 12, hold: 16, settle: 12 };
export const cardAt = (a: number, i: number, j: number) => a + 20 + Math.round(j * cardStep(i));
const Card: React.FC<{ d: string; h1: string; h2: string; j: number; ca: number }> = ({ d, h1, h2, j, ca }) => {
  const f = useCurrentFrame();
  const { fly, hold, settle } = THROW;
  const t1 = tw(f, [ca, ca + fly], [0, 1], (t) => 1 - (1 - t) ** 3);
  const t2 = tw(f, [ca + fly + hold, ca + fly + hold + settle], [0, 1], INOUT);
  const land = ca + fly + hold + settle;
  const bounce = tw(f, [land, land + 3], [0, 1]) * (1 - tw(f, [land + 3, land + 8], [0, 1], EXPO));
  const side = j % 2 ? 1 : -1;
  const start = { x: 960 + side * 1500, y: 1500, r: -side * 300, s: 2.1 };
  const mid = { x: 960, y: 520, r: side * 3, s: 1.22 };
  const slot = { x: 1300, y: 140 + j * 248 + 110, r: side * 0.6, s: 1 };
  const L = (k: 'x' | 'y' | 'r' | 's') => interpolate(t2, [0, 1], [interpolate(t1, [0, 1], [start[k], mid[k]]), slot[k]]);
  const sc = L('s') * (1 - 0.03 * bounce);
  const air = 1 - t2; // 공중에 떠 있는 정도 → 그림자
  return (
    <div style={{ position: 'absolute', left: L('x') - 500, top: L('y') - 110, width: 1000, height: 220, background: '#fff', borderTop: `6px solid ${C.ink}`,
      boxShadow: `0 2px 0 ${C.frost}, 0 ${18 + 40 * air}px ${40 + 60 * air}px rgba(11,16,32,${0.1 + 0.18 * air})`, padding: '18px 36px 0', boxSizing: 'border-box',
      opacity: tw(f, [ca, ca + 3], [0, 1]), transform: `rotate(${L('r')}deg) scale(${sc}, ${sc * (1 - 0.02 * bounce)})` }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', fontSize: 32, fontWeight: 700, color: C.steel }}>
        <span style={{ color: '#fff', background: C.ink, borderRadius: 3, padding: '0 10px' }}>가상 헤드라인</span><span>{d}</span>
      </div>
      <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 48, lineHeight: 1.26, letterSpacing: '-0.03em', marginTop: 8, color: C.ink }}>{h1}<br />{h2}</div>
    </div>
  );
};

const Lane: React.FC<{ i: number; a: number; b: number }> = ({ i, a, b }) => {
  const f = useCurrentFrame();
  const L = LANES[i];
  if (f < a || f >= b) return null;
  const bigIn = tw(f, [a + 4, a + 13], [0, 1], EXPO);
  const { fly, hold, settle } = THROW;
  const cas = L.h.map((_, j) => cardAt(a, i, j));
  const active = cas.findIndex((ca) => f >= ca && f < ca + fly + hold + settle);
  // 중앙 정지 동안 배경을 흰 막으로 눌러 카드에 집중
  const dim = cas.reduce((m, ca) => Math.max(m, tw(f, [ca + 4, ca + fly], [0, 1]) * (1 - tw(f, [ca + fly + hold, ca + fly + hold + settle - 4], [0, 1]))), 0);
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Up at={a + 2} style={{ position: 'absolute', left: 120, top: 160, fontSize: 40, fontWeight: 700, color: C.steel }}>{L.no} · 발원</Up>
      <div style={{ position: 'absolute', left: 110, top: 208, fontSize: 180, fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1, color: C.blue, opacity: bigIn, transform: `scale(${1.3 - 0.3 * bigIn})`, transformOrigin: '0% 50%' }}>{L.t}</div>
      <div style={{ position: 'absolute', left: 124, top: 430, width: 640, display: 'flex', flexDirection: 'column', gap: 30 }}>
        {L.cases.map(([k, t], n) => (
          <Up key={n} at={a + 12 + n * 8} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ alignSelf: 'flex-start', fontSize: 34, fontWeight: 900, color: C.blue, border: `3px solid ${C.blue}`, borderRadius: 6, padding: '0 12px', lineHeight: 1.35 }}>{k}</span>
            <span style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.3 }}>{t}</span>
          </Up>
        ))}
      </div>
      {L.h.map(([d, h1, h2], j) => (j !== active ? <Card key={j} d={d} h1={h1} h2={h2} j={j} ca={cas[j]} /> : null))}
      <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: 0.6 * dim }} />
      {active >= 0 && <Card key={`a${active}`} d={L.h[active][0]} h1={L.h[active][1]} h2={L.h[active][2]} j={active} ca={cas[active]} />}
    </div>
  );
};

export const Scen: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const s0 = cue('s0');
  const starts = laneStarts();
  const D0 = starts[0] - 24;
  const rev = tw(f, [s0, s0 + 12], [0, 1], (t) => 1 - (1 - t) ** 3);
  const dem = tw(f, [D0, D0 + 20], [0, 1], INOUT);
  const s = interpolate(dem, [0, 1], [1, 0.3]);
  const x = interpolate(dem, [0, 1], [960, 120]);
  const y = interpolate(dem, [0, 1], [500, 86]);
  const lane = starts.filter((a) => f >= a).length - 1;
  const barIn = tw(f, [starts[0] + 6, starts[0] + 24], [0, 1], EXPO);
  return (
    <AbsoluteFill style={{ background: C.paper, fontFamily: FONT, color: C.ink, opacity: tw(f, [0, 6], [0, 1]) }}>
      <div style={{ opacity: 1 - tw(f, [D0 - 6, D0 + 2], [0, 1]) }}>
        <Up at={s0} style={{ position: 'absolute', left: 0, width: 1920, textAlign: 'center', top: 340, fontSize: 48, fontWeight: 700, color: C.steel }}>시나리오 플래닝 · 다음 다운턴은 왜 오는가</Up>
      </div>
      <div style={{ position: 'absolute', left: x, top: y, transformOrigin: 'left center', transform: `translate(${-(1 - dem) * 50}%, -50%) scale(${s})`, fontSize: 150, fontWeight: 900, letterSpacing: '-0.045em', whiteSpace: 'nowrap', opacity: rev, filter: `blur(${(1 - rev) * 12}px)` }}>
        다음 겨울은 <span style={{ color: C.blue }}>어디서</span> 오는가.
      </div>
      {LANES.map((_, i) => <Lane key={i} i={i} a={starts[i]} b={i < 2 ? starts[i + 1] : dur} />)}
      {/* 하단 진행 표시: 발원 세 개(같은 폭) — 지금 레인만 블루. 확률은 표기하지 않는다 */}
      <div style={{ position: 'absolute', left: 0, top: 0, opacity: barIn }}>
        {LANES.map((L, i) => {
          const w = 1680 / 3 - 8, left = 120 + (i * 1680) / 3;
          const on = i === lane, seen = i <= lane;
          return (
            <React.Fragment key={i}>
              <div style={{ position: 'absolute', left, top: 952, width: w * barIn, height: 14, borderRadius: 4, background: on ? C.blue : seen ? C.steel : C.frost }} />
              <div style={{ position: 'absolute', top: 902, left, fontSize: 32, fontWeight: 900, color: on ? C.blue : seen ? C.ink : C.steel, whiteSpace: 'nowrap', opacity: seen ? 1 : 0.7 }}>{L.t}</div>
            </React.Fragment>
          );
        })}
      </div>
      <Blade at={starts[1]} color={C.ink} />
      <Blade at={starts[2]} color={C.ink} />
      <Source at={starts[0]}>시나리오: wiki/downturn/scenario-matrix.md(DT-A~E) · 헤드라인: ’26.08 신호를 연장한 가상 헤드라인, 실제 보도 아님</Source>
    </AbsoluteFill>
  );
};

/* ⑧ 결론 — 얼었던 웨이퍼가 씨앗 다이에서부터 해빙, 「지금, 무엇에 투자할 것인가.」(z2) 착지 = slam 3/3, 이후 ≥2s 정지 */
export const End: React.FC = () => {
  const f = useCurrentFrame();
  const z1 = cue('z1'), z2 = cue('z2');
  const land = END_LAND(); // 대사가 끝난 직후 — 임팩트가 마지막 말을 덮지 않게
  const punch = 1 + 0.03 * tw(f, [land, land + 3], [0, 1]) * (1 - tw(f, [land + 3, land + 16], [0, 1], EXPO));
  return (
    <AbsoluteFill style={{ background: C.paper, fontFamily: FONT, color: C.ink, transform: `scale(${punch})` }}>
      <Wafer cx={520} cy={540} R={330} growAt={-60} freezeAt={-90} thawAt={land - 6} />
      <Lines at={z1} lines={['겨울은 다시 온다.']} style={{ position: 'absolute', left: 1000, top: 262, fontSize: 96, fontWeight: 900, letterSpacing: '-0.045em', color: C.steel }} />
      <Lines at={z2} stagger={8} lines={['지금, 무엇에', <><span style={{ color: C.blue }}>투자할</span> 것인가.</>]} style={{ position: 'absolute', left: 1000, top: 410, fontSize: 136, fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1.08 }} />
    </AbsoluteFill>
  );
};
export const END_LAND = () => cueEnd('z2') + 3;
export { cueEnd };
