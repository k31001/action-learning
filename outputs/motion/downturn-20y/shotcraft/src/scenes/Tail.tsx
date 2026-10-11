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
      <Source at={p1}>출처: wiki/downturn/downturn-history.md(2025 ᵉ 추정) · wiki/concepts/hbm-market.md</Source>
    </AbsoluteFill>
  );
};

/* ⑥ 교훈 — 눈 속 새싹 실사(오른쪽) + 왼쪽 타이포. 「심은 것」 마커 밑줄(marker-underline-title, 10f) */
export const Lesson: React.FC = () => {
  const f = useCurrentFrame();
  const l1 = cue('l1'), l2 = cue('l2'), l3 = cue('l3');
  return (
    <AbsoluteFill style={{ background: C.paper, fontFamily: FONT, color: C.ink, opacity: tw(f, [0, 8], [0, 1]) }}>
      {HAS_PHOTOS
        ? <Photo name="seedling" to={240} scale={[1.0, 1.07]} origin="70% 60%" fade="linear-gradient(90deg, rgba(255,255,255,.97) 0%, rgba(255,255,255,.88) 42%, rgba(255,255,255,0) 72%)" />
        : <><Wafer cx={960} cy={540} R={420} growAt={0} growDur={40} freezeAt={-60} full dim={0.55} /><div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(1100px 560px at 40% 50%, rgba(255,255,255,.97), rgba(255,255,255,.85) 55%, rgba(255,255,255,0) 100%)' }} /></>}
      <Lines at={l1 + 4} stagger={10} lines={[
        <>승부는 <span style={{ color: C.blue }}>겨울</span>에</>,
        <><span style={{ position: 'relative', display: 'inline-block' }}><Marker at={l1 + 40} len={370} color={C.blue} style={{ left: -6, bottom: -30 }} /><span style={{ position: 'relative' }}>심은 것</span></span>에서 갈렸다.</>,
      ]} style={{ position: 'absolute', left: 140, top: 230, fontSize: 124, fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1.12 }} />
      <div style={{ position: 'absolute', left: 146, top: 620, display: 'flex', flexDirection: 'column', gap: 22 }}>
        <Up at={l2} style={{ display: 'flex', gap: 20, alignItems: 'baseline', fontSize: 52, fontWeight: 700 }}><Tag c={C.blue} size={38}>심은 것</Tag>40nm DDR3 · Line-16 · 1z DRAM</Up>
        <Up at={l3} style={{ display: 'flex', gap: 20, alignItems: 'baseline', fontSize: 52, fontWeight: 700 }}><Tag c={C.red} size={38}>놓친 것</Tag>2019 HBM 전담팀 축소</Up>
      </div>
      <Source at={l1 + 10}>출처: wiki/downturn/downturn-history.md §4 · samsung-2019-downturn-2017-2019-actions</Source>
    </AbsoluteFill>
  );
};

/* ⑦ 다음 겨울은 어디서 — 제목 강등(title-demote-to-label) → 발원 3레인(내레이션 큐 s1..s3 에 맞춰 교체, 잉크 블레이드) */
const Lane: React.FC<{ i: number; a: number; b: number }> = ({ i, a, b }) => {
  const f = useCurrentFrame();
  const L = LANES[i];
  if (f < a || f >= b) return null;
  const pct = Math.round(tw(f, [a + 14, a + 34], [0, L.p], EXPO));
  const bigIn = tw(f, [a + 4, a + 13], [0, 1], EXPO);
  const step = cardStep(i);
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Up at={a + 2} style={{ position: 'absolute', left: 120, top: 160, fontSize: 40, fontWeight: 700, color: C.steel }}>{L.no} · 발원</Up>
      <div style={{ position: 'absolute', left: 110, top: 208, fontSize: 180, fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1, color: C.blue, opacity: bigIn, transform: `scale(${1.3 - 0.3 * bigIn})`, transformOrigin: '0% 50%' }}>{L.t}</div>
      <Up at={a + 12} style={{ position: 'absolute', left: 120, top: 414, fontSize: 150, fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{pct}%</Up>
      <Up at={a + 20} style={{ position: 'absolute', left: 124, top: 580, fontSize: 36, fontWeight: 700, color: C.steel }}>조건부 확률 · {L.sub}</Up>
      {L.h.map(([d, h1, h2], j) => {
        const ca = a + 24 + j * step;
        const p = tw(f, [ca, ca + 11], [0, 1], (t) => 1 + 2.6 * (t - 1) ** 3 + 1.6 * (t - 1) ** 2);
        const op = tw(f, [ca, ca + 5], [0, 1]);
        const rot = (j % 2 ? 1 : -1) * (2 - 1.4 * Math.min(1, p));
        return (
          <div key={j} style={{ position: 'absolute', left: 800, top: 140 + j * 248, width: 1000, height: 220, background: '#fff', borderTop: `6px solid ${C.ink}`, boxShadow: `0 2px 0 ${C.frost}, 0 18px 40px rgba(11,16,32,.10)`, padding: '18px 36px 0', boxSizing: 'border-box', opacity: op, transform: `translateY(${(1 - p) * -70}px) rotate(${rot}deg)` }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', fontSize: 32, fontWeight: 700, color: C.steel }}>
              <span style={{ color: '#fff', background: C.ink, borderRadius: 3, padding: '0 10px' }}>가상 헤드라인</span><span>{d}</span>
            </div>
            <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 48, lineHeight: 1.26, letterSpacing: '-0.03em', marginTop: 8, color: C.ink }}>{h1}<br />{h2}</div>
          </div>
        );
      })}
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
  let acc = 120;
  return (
    <AbsoluteFill style={{ background: C.paper, fontFamily: FONT, color: C.ink, opacity: tw(f, [0, 6], [0, 1]) }}>
      <div style={{ opacity: 1 - tw(f, [D0 - 6, D0 + 2], [0, 1]) }}>
        <Up at={s0} style={{ position: 'absolute', left: 0, width: 1920, textAlign: 'center', top: 340, fontSize: 48, fontWeight: 700, color: C.steel }}>시나리오 플래닝 · 다음 다운턴은 왜 오는가</Up>
      </div>
      <div style={{ position: 'absolute', left: x, top: y, transformOrigin: 'left center', transform: `translate(${-(1 - dem) * 50}%, -50%) scale(${s})`, fontSize: 150, fontWeight: 900, letterSpacing: '-0.045em', whiteSpace: 'nowrap', opacity: rev, filter: `blur(${(1 - rev) * 12}px)` }}>
        다음 겨울은 <span style={{ color: C.blue }}>어디서</span> 오는가.
      </div>
      {LANES.map((_, i) => <Lane key={i} i={i} a={starts[i]} b={i < 2 ? starts[i + 1] : dur} />)}
      <div style={{ position: 'absolute', left: 0, top: 0, opacity: barIn }}>
        {LANES.map((L, i) => {
          const w = 1680 * (L.p / 100) - 6, left = acc; acc += 1680 * (L.p / 100);
          const on = i === lane, seen = i <= lane;
          return (
            <React.Fragment key={i}>
              <div style={{ position: 'absolute', left, top: 952, width: w * barIn, height: 22, borderRadius: 4, background: on ? C.blue : seen ? C.steel : C.frost }} />
              <div style={{ position: 'absolute', top: 900, ...(i === 2 ? { left: left + w - 300, width: 300, textAlign: 'right' } : { left }), fontSize: 32, fontWeight: 900, color: on ? C.blue : seen ? C.ink : C.steel, whiteSpace: 'nowrap', opacity: seen ? 1 : 0.7 }}>{L.t} {L.p}%</div>
            </React.Fragment>
          );
        })}
      </div>
      <Blade at={starts[1]} color={C.ink} />
      <Blade at={starts[2]} color={C.ink} />
      <Source at={starts[0]}>확률: 2027~2030 다운턴 발생 시 발원별 조건부 확률(scenario-matrix.md) · 헤드라인: 2026-08 신호를 연장한 가상 헤드라인, 실제 보도 아님</Source>
    </AbsoluteFill>
  );
};

/* ⑧ 결론 — 얼었던 웨이퍼가 씨앗 다이에서부터 해빙, 「지금, 무엇을 심을 것인가.」(z2) 착지 = slam 3/3, 이후 ≥2s 정지 */
export const End: React.FC = () => {
  const f = useCurrentFrame();
  const z1 = cue('z1'), z2 = cue('z2');
  const land = END_LAND(); // 대사가 끝난 직후 — 임팩트가 마지막 말을 덮지 않게
  const punch = 1 + 0.03 * tw(f, [land, land + 3], [0, 1]) * (1 - tw(f, [land + 3, land + 16], [0, 1], EXPO));
  return (
    <AbsoluteFill style={{ background: C.paper, fontFamily: FONT, color: C.ink, transform: `scale(${punch})` }}>
      <Wafer cx={520} cy={540} R={330} growAt={-60} freezeAt={-90} thawAt={land - 6} />
      <Lines at={z1} lines={['겨울은 다시 온다.']} style={{ position: 'absolute', left: 1000, top: 262, fontSize: 96, fontWeight: 900, letterSpacing: '-0.045em', color: C.steel }} />
      <Lines at={z2} stagger={8} lines={['지금, 무엇을', <><span style={{ color: C.blue }}>심을</span> 것인가.</>]} style={{ position: 'absolute', left: 1000, top: 410, fontSize: 136, fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1.08 }} />
    </AbsoluteFill>
  );
};
export const END_LAND = () => cueEnd('z2') + 3;
export { cueEnd };
