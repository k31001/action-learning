import React from 'react';
import { interpolateColors, useCurrentFrame } from 'remotion';
import { C, FONT } from '../theme';
import { cue, cueEnd, EXPO, INOUT, Logo, minus, Odometer, OUT, Tag, tw, Up, Wordmark } from '../lib';
import { Q23, SH08 } from '../timeline';
import { CARD_HOLD, ChapterFrame } from './Winter';

const lab: React.CSSProperties = { fontSize: 36, fontWeight: 700, color: C.steel };
const big = (fs: number, c: string = C.ink): React.CSSProperties => ({ fontSize: fs, fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1.04, color: c, whiteSpace: 'nowrap' });
const SRC = (s: string) => `출처: wiki/downturn/downturn-history.md · ${s}`;
const BACK = (t: number) => 1 + 2.70158 * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2);
const ready = (first: string) => cue(first) + CARD_HOLD + 16; // 레이아웃이 다 올라온 프레임

// 타격 시점(장면 내부 프레임) — sfx.ts 와 공유. 화면 이벤트는 내레이터가 그 말을 하는 순간에 맞춘다.
export const T08 = () => { const a2 = cue('a2'), d = cueEnd('a2') - a2; return { sw: cue('a1') + CARD_HOLD, odo: a2 - 20, pct: a2 + 16, qm: a2 + Math.round(d * 0.58), a3: cue('a3') }; };
export const T12 = () => { const b2 = cue('b2'); return { sw: cue('b1') + CARD_HOLD, el: ready('b1'), b2, three: b2 + 34, b3: cue('b3') }; };
export const T19 = () => { const sw = ready('d1'); const mid = sw - 10; return { sw: sw - 16, mid, d2: cue('d2'), d3: cue('d3') }; }; // 경쟁사 기둥은 레이아웃과 함께 올라온다(빈 화면 방지)
export const T23 = () => { const e2 = cue('e2'); return { sw: cue('e1') + CARD_HOLD, e2, land: e2 + 30, e3: cue('e3') }; };

/* 2008 · 버텼다 — 레이아웃 A 「큰 숫자」: 왼쪽 가격 오도미터 $6.80→$0.50 · −93%, 오른쪽 점유율 막대(키몬다 파산) */
export const W08: React.FC = () => {
  const f = useCurrentFrame();
  const sw = ready('a1');
  const t = T08();
  const qmRed = tw(f, [t.qm, t.qm + 4], [0, 1]);
  const qmGone = tw(f, [t.qm + 10, t.qm + 26], [0, 1], (x) => x * x * x);
  const me = tw(f, [t.a3, t.a3 + 10], [0, 1], EXPO);
  const rows = [...SH08, { k: '대만 2사', p: 0, other: true }];
  return (
    <ChapterFrame k={0} first="a1" src={SRC('dram-chicken-game-history · samsung-downturn-actions')}>
      <Up at={sw - 10} style={{ position: 'absolute', left: 160, top: 250, ...lab }}>512Mb DDR2 현물가 · 2007 → 2008</Up>
      <Up at={sw - 10} style={{ position: 'absolute', left: 160, top: 304 }}><Odometer text="$0.50" from="$6.80" at={t.odo} size={210} color={C.ink} /></Up>
      <Up at={t.pct} dx={-30} dy={0} style={{ position: 'absolute', left: 160, top: 600, ...big(210, C.red) }}>−93%</Up>
      <Up at={sw - 6} style={{ position: 'absolute', left: 1040, top: 250, ...lab }}>치킨게임 직전 DRAM 점유율</Up>
      {rows.map((s, i) => {
        const a = sw - 4 + i * 3;
        const g = tw(f, [a + 2, a + 18], [0, 1], EXPO);
        const isQ = s.k === 'Qimonda', isMe = 'me' in s && s.me, other = 'other' in s;
        const fill = isMe ? C.blue : isQ ? interpolateColors(qmRed, [0, 1], [C.frost, C.red]) : C.frost;
        const name = s.k === 'samsung' ? <Logo k="samsung" h={40} /> : s.k === 'micron' ? <Logo k="micron" h={46} grey /> : <Wordmark t={s.k} size={40} ghost={other} />;
        return (
          <Up key={s.k} at={a} dx={-24} dy={0} style={{ position: 'absolute', left: 1040, top: 312 + i * 88, height: 76, width: 800, display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 290, flex: '0 0 290px' }}>{name}</div>
            {other ? <div style={{ fontSize: 36, fontWeight: 700, color: C.steel }}>파워칩 · 난야</div> : (
              <>
                <div style={{ position: 'relative', width: s.p * 13 * g, height: 46, background: fill, opacity: isQ ? 1 - 0.85 * qmGone : 1, borderRadius: '0 6px 6px 0', boxShadow: isMe && me > 0 ? `0 0 0 ${6 * me}px rgba(20,40,160,.15)` : undefined }} />
                {isQ && qmGone > 0 && <div style={{ position: 'absolute', left: 290, width: s.p * 13, height: 46, border: `3px dashed rgba(227,52,47,${qmGone})`, borderRadius: '0 6px 6px 0', boxSizing: 'border-box' }} />}
                <div style={{ marginLeft: 18, fontSize: 40, fontWeight: 900, color: isMe ? C.blue : isQ && qmRed > 0.5 ? C.red : C.ink, whiteSpace: 'nowrap' }}>{isQ && qmRed > 0.5 ? '2009.01 파산' : `${s.p}%`}</div>
                {isMe && <div style={{ marginLeft: 16, opacity: me }}><Tag c={C.blue} size={32}>무감산</Tag></div>}
              </>
            )}
          </Up>
        );
      })}
    </ChapterFrame>
  );
};

/* 2012 · 남았다 — 레이아웃 B 「타일」: 화면을 채운 6개 타일(레이아웃과 함께 올라옴) → 엘피다 파산 → 흡수·탈락·인수 → 한 줄 3강 */
const TW = 500, TH = 250;
const pos6 = (i: number): [number, number] => [180 + (i % 3) * 530, 230 + Math.floor(i / 3) * 290];
export const W12: React.FC = () => {
  const f = useCurrentFrame();
  const sw = ready('b1');
  const { el, b2, three, b3 } = T12();
  const elpRed = tw(f, [el, el + 4], [0, 1]);
  const out = tw(f, [b2, b2 + 6], [0, 1]), inn2 = tw(f, [b2 + 6, b2 + 14], [0, 1], INOUT); // Hynix 퇴장 → SK hynix 등장(순차)
  const absorb = tw(f, [b2 + 4, b2 + 20], [0, 1], INOUT);
  const drop = (j: number) => tw(f, [b2 + 2 + j * 3, b2 + 16 + j * 3], [0, 1], (t) => t * t * t);
  const reflow = tw(f, [b2 + 22, b2 + 40], [0, 1], EXPO);
  const glow = tw(f, [b3, b3 + 10], [0, 1], EXPO);
  const tiles = [{ id: 'samsung', me: true }, { id: 'hynix' }, { id: 'elpida' }, { id: 'micron' }, { id: 'qimonda', ghost: '2009 퇴출' }, { id: 'taiwan', ghost: '범용 D램 퇴장' }];
  const target: Record<string, [number, number]> = { samsung: [180, 300], hynix: [710, 300], micron: [1240, 300] };
  const cap = (t: string, at: number, c: string = C.ink) => <div style={{ fontSize: 34, fontWeight: 900, color: c, opacity: tw(f, [at, at + 8], [0, 1]), whiteSpace: 'nowrap' }}>{t}</div>;
  return (
    <ChapterFrame k={1} first="b1" src={SRC('dram-chicken-game-history · memory-capex-history-research-2006-2015')}>
      {tiles.map((t, i) => {
        const a = sw - 14 + i * 2;
        const inn = tw(f, [a, a + 14], [0, 1], BACK);
        let [x, y] = pos6(i);
        let op = tw(f, [a, a + 8], [0, 1]), h = TH, dy = 0;
        if (t.id === 'elpida') { const [mx, my] = pos6(3); x += (mx - x) * absorb; y += (my - y) * absorb; op *= 1 - absorb; }
        if (t.id === 'qimonda' || t.id === 'taiwan') { const p = drop(i - 4); dy = 160 * p; op *= 1 - p; }
        if (target[t.id]) { const [tx, ty] = target[t.id]; x += (tx - x) * reflow; y += (ty - y) * reflow; h = TH + (360 - TH) * reflow; }
        const border = t.me ? C.blue : t.id === 'elpida' ? interpolateColors(elpRed, [0, 1], [C.frost, C.red]) : C.frost;
        const bg = t.me ? interpolateColors(glow, [0, 1], ['#ffffff', '#eef1fb']) : t.id === 'elpida' ? interpolateColors(elpRed, [0, 1], ['#ffffff', '#fdecec']) : '#ffffff';
        return (
          <div key={t.id} style={{ position: 'absolute', left: x, top: y + dy, width: TW, height: h, opacity: op, transform: `scale(${0.85 + 0.15 * inn})`, borderRadius: 12, border: `${t.me ? 4 + 2 * glow : 3}px ${t.ghost ? 'dashed' : 'solid'} ${border}`, background: bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, boxSizing: 'border-box' }}>
            {t.id === 'samsung' && <><Logo k="samsung" h={48} />{cap('Line-16 가동', b3 + 6, C.blue)}</>}
            {t.id === 'micron' && <><Logo k="micron" h={62} grey />{cap('엘피다 인수 · 2013', b2 + 22)}</>}
            {t.id === 'hynix' && (
              <>
                <div style={{ position: 'relative', width: 300, height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ position: 'absolute', opacity: 1 - out }}><Wordmark t="Hynix" size={52} /></div>
                  <div style={{ position: 'absolute', opacity: inn2, transform: `translateY(${24 * (1 - inn2)}px)` }}><Logo k="skhynix" h={110} grey /></div>
                </div>
                {cap('SK가 인수 · 2012', b2 + 14)}
              </>
            )}
            {t.id === 'elpida' && <><Wordmark t="Elpida" size={52} />{cap('파산 · 2012.02', el + 2, C.red)}</>}
            {t.id === 'qimonda' && <Wordmark t="Qimonda" ghost size={48} />}
            {t.id === 'taiwan' && <Wordmark t="대만 업체" ghost size={48} />}
            {t.ghost && <div style={{ fontSize: 34, fontWeight: 700, color: C.steel }}>{t.ghost}</div>}
          </div>
        );
      })}
      <Up at={three} style={{ position: 'absolute', left: 0, width: 1920, top: 740, textAlign: 'center', ...big(120, C.blue) }}>6강 → 3강</Up>
    </ChapterFrame>
  );
};

/* 2019 · 멈추지 않았다 — 레이아웃 C 「3자 대비」: 세 회사 기둥(감산 · 감산 · 무감산) → 44.1% */
export const W19: React.FC = () => {
  const f = useCurrentFrame();
  const { mid, d2, d3 } = T19();
  const dim = 1 - 0.6 * tw(f, [d3, d3 + 10], [0, 1]);
  const cols: { lg: React.ReactNode; st: string; sub: string; c: string; at: number; me?: boolean }[] = [
    { lg: <Logo k="micron" h={56} grey />, st: '감산 ↓', sub: '2019.03', c: C.steel, at: mid },
    { lg: <Logo k="skhynix" h={110} grey />, st: '감산 ↓', sub: '2019.07', c: C.steel, at: mid + 12 },
    { lg: <Logo k="samsung" h={44} />, st: '무감산 →', sub: '투자 유지', c: C.blue, at: d2, me: true },
  ];
  return (
    <ChapterFrame k={2} first="d1" photo="cleanroom" src={SRC('samsung-2019-downturn-2017-2019-actions')}>
      {cols.map((c, i) => (
        <Up key={i} at={c.at} dy={40} style={{ position: 'absolute', left: 160 + i * 540, top: 250, width: 500, height: 380, borderTop: `6px solid ${c.me ? C.blue : C.frost}`, paddingTop: 30, opacity: c.me ? 1 : dim, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ height: 110, display: 'flex', alignItems: 'center' }}>{c.lg}</div>
          <div style={big(100, c.c)}>{c.st}</div>
          <div style={{ fontSize: 40, fontWeight: 700, color: c.me ? C.ink : C.steel }}>{c.sub}</div>
        </Up>
      ))}
      <Up at={d3} style={{ position: 'absolute', left: 1240, top: 690, display: 'flex', flexDirection: 'column' }}>
        <span style={{ ...lab, color: C.ink }}>1Q20 삼성 DRAM 점유율</span>
        <span style={big(190, C.blue)}>44.1%</span>
      </Up>
    </ChapterFrame>
  );
};

/* 2023 · 한 박자 늦었다 — 레이아웃 D 「막대 클로즈업」: 정점 두 막대에 붙은 카메라(왼쪽 패널 안에서만) →
   세 분기 붕괴와 함께 풀백, −62% 크래시 줌(slam 2/3) → 사상 최대 손실. 숫자는 두 개만 */
export const W23: React.FC = () => {
  const f = useCurrentFrame();
  const sw = ready('e1');
  const { e2, land, e3 } = T23();
  const QB = 860, QS = 20, QX = 180, QW = 150, QG = 50;
  const pull = tw(f, [e2, e2 + 40], [0, 1], INOUT);
  const z = 1.38 - 0.38 * pull, cx = 340 + (960 - 340) * pull, cy = 640 + (540 - 640) * pull;
  const m = minus(tw(f, [e2 + 6, land], [0, -62], (t) => t * t), 0);
  const punch = 1 + 0.06 * tw(f, [land, land + 3], [0, 1]) * (1 - tw(f, [land + 3, land + 16], [0, 1], EXPO));
  const loss = minus(tw(f, [e3 + 4, e3 + 30], [-10, -14.88], OUT), 2);
  return (
    <ChapterFrame k={3} first="e1" src={SRC('memory-downturn-history-research(ᵉ 추정 포함) · samsung-pre-downturn-preparation')}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${punch})`, transformOrigin: '1600px 400px' }}>
        <Up at={sw - 10} style={{ position: 'absolute', left: QX, top: 200, ...lab }}>DRAM 분기 매출 · $B</Up>
        {/* 줌 레이어는 왼쪽 패널(x<1330, y≥260) 안에서만 — 오른쪽 숫자·상단 라벨과 겹치지 않게 */}
        <div style={{ position: 'absolute', left: 0, top: 260, width: 1330, height: 760, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, top: -260, width: 1920, height: 1080, transformOrigin: '0 0', transform: `translate(960px,540px) scale(${z}) translate(${-cx}px,${-cy}px)` }}>
            <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
              {Q23.map(([q, v], i) => {
                const at = i < 2 ? sw - 10 + i * 4 : e2 + (i - 2) * 6;
                const g = tw(f, [at, at + 12], [0, 1], OUT);
                const h = v * QS * g, x = QX + i * (QW + QG), red = i >= 2 && i <= 4;
                return (
                  <g key={q}>
                    <rect x={x} y={QB - h} width={QW} height={h} rx={5} fill={red ? C.red : C.blue} />
                    <text x={x + QW / 2} y={QB + 46} textAnchor="middle" fill={C.steel} fontSize={34} fontWeight={700} fontFamily={FONT} opacity={tw(f, [at, at + 8], [0, 1])}>{q}</text>
                  </g>
                );
              })}
              <line x1={QX - 10} x2={QX + 6 * QW + 5 * QG + 10} y1={QB} y2={QB} stroke={C.steel} strokeWidth={2} />
            </svg>
          </div>
        </div>
        <Up at={e2 + 6} style={{ position: 'absolute', left: 1400, top: 300, width: 460 }}>
          <div style={big(170, C.red)}>{m}%</div>
          <div style={{ ...lab, color: C.ink }}>3분기 만에 · 사상 최속</div>
        </Up>
        <Up at={e3} style={{ position: 'absolute', left: 1400, top: 640, width: 500 }}>
          <div style={big(116, C.red)}>{loss}조</div>
          <div style={{ ...lab, color: C.ink }}>2023 DS 영업손실 · 사상 최대</div>
        </Up>
      </div>
    </ChapterFrame>
  );
};
