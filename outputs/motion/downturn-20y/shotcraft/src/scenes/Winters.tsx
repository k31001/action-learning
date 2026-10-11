import React from 'react';
import { interpolateColors, useCurrentFrame } from 'remotion';
import { C, FONT } from '../theme';
import { cue, cueEnd, EXPO, INOUT, Logo, minus, Odometer, OUT, tw, Up, Wordmark } from '../lib';
import { Q23, SH08 } from '../timeline';
import { CARD_HOLD, ChapterFrame } from './Winter';

const lab: React.CSSProperties = { fontSize: 36, fontWeight: 700, color: C.steel };
const big = (fs: number, c: string = C.ink): React.CSSProperties => ({ fontSize: fs, fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1.04, color: c, whiteSpace: 'nowrap' });
const SRC = (s: string) => `출처: wiki/downturn/downturn-history.md · ${s}`;
const BACK = (t: number) => 1 + 2.70158 * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2);

// 타격 시점(장면 내부 프레임) — sfx.ts 와 공유
export const T08 = () => { const a2 = cue('a2'); const qm = cueEnd('a2') - 34; return { sw: cue('a1') + CARD_HOLD, odo: a2 + 10, pct: a2 + 52, qm, a3: cue('a3') }; };
const EL = () => cue('b1') + CARD_HOLD + 16 + 30; // 엘피다 파산 — 6개 타일이 다 선 뒤
export const T12 = () => { const b2 = cue('b2'); return { sw: cue('b1') + CARD_HOLD, el: EL(), b2, three: b2 + 34, b3: cue('b3') }; };
export const T19 = () => { const sw = cue('d1') + CARD_HOLD + 16; const mid = Math.max(sw + 20, cueEnd('d1') - 70); return { sw: sw - 16, mid, d2: cue('d2'), d3: cue('d3') }; };
export const T23 = () => { const sw = cue('e1') + CARD_HOLD + 16; const e2 = cue('e2'); return { sw: sw - 16, inv: sw + 30, e2, land: e2 + 30, e3: cue('e3') }; };

/* 2008 · 버텼다 — 레이아웃 A 「큰 숫자」: 점유율 누적 막대 한 줄 → 오도미터 $6.80→$0.50 → 키몬다 조각 탈락 → 삼성 조각 강조 */
export const W08: React.FC = () => {
  const f = useCurrentFrame();
  const sw = cue('a1') + CARD_HOLD + 16;
  const a2 = cue('a2'), a3 = cue('a3');
  const qm = cueEnd('a2') - 34; // "키몬다는 파산했습니다"
  const qmRed = tw(f, [qm, qm + 4], [0, 1]);
  const qmGone = tw(f, [qm + 10, qm + 26], [0, 1], (t) => t * t * t);
  const me = tw(f, [a3, a3 + 10], [0, 1], EXPO);
  const segs = [...SH08, { k: '대만·기타', p: 15, other: true }];
  const W = 1600;
  let x = 160;
  return (
    <ChapterFrame k={0} first="a1" src={SRC('dram-chicken-game-history · samsung-downturn-actions')}>
      <Up at={sw + 4} style={{ position: 'absolute', left: 160, top: 214, ...lab }}>치킨게임 직전 DRAM 점유율 · 6강</Up>
      {segs.map((s, i) => {
        const g = tw(f, [sw + 6 + i * 3, sw + 22 + i * 3], [0, 1], EXPO);
        const isQ = s.k === 'Qimonda';
        const w = (W * s.p) / 100;
        const left = x; x += w;
        const fill = 'me' in s && s.me ? C.blue : isQ ? interpolateColors(qmRed, [0, 1], [C.frost, C.red]) : 'other' in s ? C.frost2 : C.frost;
        const name = s.k === 'samsung' ? <Logo k="samsung" h={30} /> : s.k === 'micron' ? <Logo k="micron" h={30} grey /> : <Wordmark t={s.k} size={22} ghost={'other' in s} />;
        return (
          <React.Fragment key={s.k}>
            <div style={{ position: 'absolute', left, top: 270, width: Math.max(0, w - 4) * g, height: 84, background: fill, opacity: isQ ? 1 - 0.85 * qmGone : 1, outline: isQ && qmGone > 0 ? `3px dashed rgba(227,52,47,${qmGone})` : undefined, outlineOffset: -3, borderRadius: 6, transform: 'me' in s && s.me ? `scaleY(${1 + 0.18 * me})` : undefined, boxShadow: 'me' in s && s.me && me > 0 ? `0 0 0 ${6 * me}px rgba(20,40,160,.15)` : undefined }} />
            <div style={{ position: 'absolute', left, top: 372, opacity: g, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ height: 44, display: 'flex', alignItems: 'center' }}>{name}</div>
              <div style={{ fontSize: 34, fontWeight: 900, color: 'me' in s && s.me ? C.blue : isQ && qmRed > 0.5 ? C.red : C.ink }}>{isQ && qmRed > 0.5 ? '파산' : `${s.p}%`}</div>
              {isQ && <div style={{ fontSize: 28, fontWeight: 700, color: C.red, opacity: qmRed, whiteSpace: 'nowrap' }}>2009.01</div>}
            </div>
          </React.Fragment>
        );
      })}
      <Up at={a2} style={{ position: 'absolute', left: 160, top: 530, ...lab }}>512Mb DDR2 현물가 · 2007 → 2008</Up>
      <div style={{ position: 'absolute', left: 160, top: 590, display: 'flex', alignItems: 'center', gap: 48 }}>
        <Up at={a2}><Odometer text="$0.50" from="$6.80" at={a2 + 10} size={200} color={C.ink} /></Up>
        <Up at={a2 + 52} dx={-30} dy={0} style={big(200, C.red)}>−93%</Up>
      </div>
      <Up at={a3 + 8} style={{ position: 'absolute', left: 160, top: 880, display: 'flex', alignItems: 'baseline', gap: 22 }}>
        <span style={lab}>4Q08 영업이익률</span>
        <span style={{ fontSize: 56, fontWeight: 900, color: C.blue }}>삼성 −14%</span>
        <span style={{ fontSize: 40, fontWeight: 700, color: C.steel }}>vs</span>
        <span style={{ fontSize: 56, fontWeight: 900, color: C.red }}>경쟁사 −40% 이하</span>
      </Up>
    </ChapterFrame>
  );
};

/* 2012 · 남았다 — 레이아웃 B 「타일」: 화면을 채운 6개 타일 → 엘피다 파산 → 흡수·탈락·인수 → 한 줄 3강 */
const TW = 500, TH = 250;
const pos6 = (i: number): [number, number] => [180 + (i % 3) * 530, 250 + Math.floor(i / 3) * 290];
export const W12: React.FC = () => {
  const f = useCurrentFrame();
  const sw = cue('b1') + CARD_HOLD + 16;
  const el = EL(); // "엘피다가 무너졌습니다"
  const b2 = cue('b2'), b3 = cue('b3');
  const elpRed = tw(f, [el, el + 4], [0, 1]);
  const swap = tw(f, [b2, b2 + 12], [0, 1], INOUT);
  const absorb = tw(f, [b2 + 4, b2 + 20], [0, 1], INOUT);
  const drop = (j: number) => tw(f, [b2 + 2 + j * 3, b2 + 16 + j * 3], [0, 1], (t) => t * t * t);
  const reflow = tw(f, [b2 + 22, b2 + 40], [0, 1], EXPO);
  const glow = tw(f, [b3, b3 + 10], [0, 1], EXPO);
  const tiles = [{ id: 'samsung', me: true }, { id: 'hynix' }, { id: 'elpida' }, { id: 'micron' }, { id: 'qimonda', ghost: '2009 퇴출' }, { id: 'taiwan', ghost: '범용 D램 퇴장' }];
  const target: Record<string, [number, number]> = { samsung: [180, 330], hynix: [710, 330], micron: [1240, 330] };
  const cap = (t: string, at: number, c: string = C.ink) => <div style={{ fontSize: 32, fontWeight: 900, color: c, opacity: tw(f, [at, at + 8], [0, 1]), whiteSpace: 'nowrap' }}>{t}</div>;
  return (
    <ChapterFrame k={1} first="b1" src={SRC('dram-chicken-game-history · memory-capex-history-research-2006-2015')}>
      {tiles.map((t, i) => {
        const a = sw + 4 + i * 3;
        const inn = tw(f, [a, a + 14], [0, 1], BACK);
        let [x, y] = pos6(i);
        let op = tw(f, [a, a + 8], [0, 1]), h = TH, dy = 0;
        if (t.id === 'elpida') { const [mx, my] = pos6(3); x += (mx - x) * absorb; y += (my - y) * absorb; op *= 1 - absorb; }
        if (t.id === 'qimonda' || t.id === 'taiwan') { const p = drop(i - 4); dy = 160 * p; op *= 1 - p; }
        if (target[t.id]) { const [tx, ty] = target[t.id]; x += (tx - x) * reflow; y += (ty - y) * reflow; h = TH + (360 - TH) * reflow; }
        const border = t.me ? C.blue : t.id === 'elpida' ? interpolateColors(elpRed, [0, 1], [C.frost, C.red]) : C.frost;
        const bg = t.me ? interpolateColors(glow, [0, 1], ['#ffffff', '#eef1fb']) : t.id === 'elpida' ? interpolateColors(elpRed, [0, 1], ['#ffffff', '#fdecec']) : '#ffffff';
        return (
          <div key={t.id} style={{ position: 'absolute', left: x, top: y + dy, width: TW, height: h, opacity: op, transform: `scale(${0.85 + 0.15 * inn})`, borderRadius: 12, border: `${t.me ? 4 + 2 * glow : 3}px ${t.ghost ? 'dashed' : 'solid'} ${border}`, background: bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, boxSizing: 'border-box' }}>
            {t.id === 'samsung' && <><Logo k="samsung" h={44} />{cap('Line-16 · 20nm급 세계 최초', b3 + 6, C.blue)}</>}
            {t.id === 'micron' && <><Logo k="micron" h={60} grey />{cap('2013 엘피다 인수 (~$2.5B)', b2 + 22)}</>}
            {t.id === 'hynix' && (
              <>
                <div style={{ position: 'relative', width: 300, height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ position: 'absolute', opacity: 1 - swap, transform: `translateY(${-30 * swap}px)` }}><Wordmark t="Hynix" size={48} /></div>
                  <div style={{ position: 'absolute', opacity: swap, transform: `translateY(${30 * (1 - swap)}px)` }}><Logo k="skhynix" h={110} grey /></div>
                </div>
                {cap('2012 SK, 하이닉스 인수', b2 + 14)}
              </>
            )}
            {t.id === 'elpida' && <><Wordmark t="Elpida" size={48} />{cap('2012.02 파산 · 부채 4,480억 엔', el + 2, C.red)}</>}
            {t.id === 'qimonda' && <Wordmark t="Qimonda" ghost size={44} />}
            {t.id === 'taiwan' && <Wordmark t="대만 업체" ghost size={44} />}
            {t.ghost && <div style={{ fontSize: 30, fontWeight: 700, color: C.steel }}>{t.ghost}</div>}
          </div>
        );
      })}
      <Up at={b2 + 34} style={{ position: 'absolute', left: 0, width: 1920, top: 760, textAlign: 'center', ...big(110, C.blue) }}>6강 → 3강</Up>
    </ChapterFrame>
  );
};

/* 2019 · 멈추지 않았다 — 레이아웃 C 「3자 대비」: 매출 −37.6% 한 줄 → 세 회사 기둥(감산·감산·무감산) → 44.1% */
export const W19: React.FC = () => {
  const f = useCurrentFrame();
  const sw = cue('d1') + CARD_HOLD + 16;
  const d2 = cue('d2'), d3 = cue('d3');
  const mid = Math.max(sw + 20, cueEnd('d1') - 70); // "마이크론과 SK하이닉스는 감산"
  const dim = 1 - 0.6 * tw(f, [d3, d3 + 10], [0, 1]);
  const cols: { lg: React.ReactNode; st: string; sub: string; c: string; at: number; me?: boolean }[] = [
    { lg: <Logo k="micron" h={56} grey />, st: '감산 ↓', sub: '2019.03 첫 공식 감산', c: C.steel, at: mid },
    { lg: <Logo k="skhynix" h={110} grey />, st: '감산 ↓', sub: '2019.07 감산', c: C.steel, at: mid + 14 },
    { lg: <Logo k="samsung" h={44} />, st: '무감산 →', sub: 'CapEx 22.6조 유지', c: C.blue, at: d2, me: true },
  ];
  return (
    <ChapterFrame k={2} first="d1" photo="cleanroom" src={SRC('samsung-2019-downturn-2017-2019-actions')}>
      <Up at={sw + 4} style={{ position: 'absolute', left: 160, top: 218, display: 'flex', alignItems: 'baseline', gap: 26 }}>
        <span style={lab}>DRAM 산업 매출</span>
        <span style={{ fontSize: 64, fontWeight: 900 }}>$99.4B → $62.0B</span>
        <span style={big(64, C.red)}>−37.6%</span>
      </Up>
      {cols.map((c, i) => (
        <Up key={i} at={c.at} dy={40} style={{ position: 'absolute', left: 160 + i * 540, top: 340, width: 500, height: 380, borderTop: `6px solid ${c.me ? C.blue : C.frost}`, paddingTop: 30, opacity: c.me ? 1 : dim, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ height: 110, display: 'flex', alignItems: 'center' }}>{c.lg}</div>
          <div style={big(96, c.c)}>{c.st}</div>
          <div style={{ fontSize: 38, fontWeight: 700, color: c.me ? C.ink : C.steel }}>{c.sub}</div>
        </Up>
      ))}
      <Up at={d3} style={{ position: 'absolute', left: 1240, top: 740, display: 'flex', flexDirection: 'column' }}>
        <span style={{ ...lab, color: C.ink }}>1Q20 삼성 DRAM 점유율</span>
        <span style={big(170, C.blue)}>44.1%</span>
      </Up>
    </ChapterFrame>
  );
};

/* 2023 · 한 박자 늦었다 — 레이아웃 D 「막대 클로즈업」: 정점 두 막대에 붙은 카메라 → 재고 경고 →
   세 분기 붕괴와 함께 풀백, −62% 크래시 줌(slam 2/3) → 사상 최대 손실 */
export const W23: React.FC = () => {
  const f = useCurrentFrame();
  const sw = cue('e1') + CARD_HOLD + 16;
  const e2 = cue('e2'), e3 = cue('e3');
  const QB = 860, QS = 20, QX = 180, QW = 140, QG = 46;
  const pull = tw(f, [e2, e2 + 40], [0, 1], INOUT);
  const z = 1.38 - 0.38 * pull, cx = 330 + (960 - 330) * pull, cy = 640 + (540 - 640) * pull;
  const land = e2 + 30;
  const m = minus(tw(f, [e2 + 6, land], [0, -62], (t) => t * t), 0);
  const punch = 1 + 0.06 * tw(f, [land, land + 3], [0, 1]) * (1 - tw(f, [land + 3, land + 16], [0, 1], EXPO));
  const loss = minus(tw(f, [e3 + 4, e3 + 34], [0, -14.88], OUT), 2);
  const inv = tw(f, [sw + 30, sw + 60], [16.5, 29.1], OUT);
  return (
    <ChapterFrame k={3} first="e1" src={SRC('memory-downturn-history-research(ᵉ 추정 포함) · samsung-pre-downturn-preparation')}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${punch})`, transformOrigin: '1600px 300px' }}>
        <div style={{ position: 'absolute', inset: 0, transformOrigin: '0 0', transform: `translate(960px,540px) scale(${z}) translate(${-cx}px,${-cy}px)` }}>
          <div style={{ position: 'absolute', left: QX, top: 210, ...lab }}>DRAM 분기 매출 · $B</div>
          <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
            {Q23.map(([q, v], i) => {
              const at = i < 2 ? sw - 6 + i * 4 : e2 + (i - 2) * 6;
              const g = tw(f, [at, at + 12], [0, 1], OUT);
              const h = v * QS * g, x = QX + i * (QW + QG), red = i >= 2 && i <= 4;
              return (
                <g key={q}>
                  <rect x={x} y={QB - h} width={QW} height={h} rx={5} fill={red ? C.red : C.blue} />
                  <text x={x + QW / 2} y={QB - h - 16} textAnchor="middle" fill={C.ink} fontSize={38} fontWeight={900} opacity={tw(f, [at + 8, at + 14], [0, 1])}>{v.toFixed(1)}</text>
                  <text x={x + QW / 2} y={QB + 46} textAnchor="middle" fill={C.steel} fontSize={32} fontWeight={700} fontFamily={FONT} opacity={tw(f, [at, at + 8], [0, 1])}>{q}</text>
                </g>
              );
            })}
            <line x1={QX - 10} x2={QX + 6 * QW + 5 * QG + 10} y1={QB} y2={QB} stroke={C.steel} strokeWidth={2} />
          </svg>
        </div>
        <Up at={sw + 26} style={{ position: 'absolute', left: 1380, top: 210, width: 440 }}>
          <div style={lab}>DS 재고 · 6개월 "일시적"</div>
          <div style={{ fontSize: 60, fontWeight: 900, whiteSpace: 'nowrap' }}>16.5 → {inv.toFixed(1)}조</div>
          <div style={big(60, C.red)}>+76.6%</div>
        </Up>
        <Up at={e2 + 6} style={{ position: 'absolute', left: 1380, top: 470, width: 440 }}>
          <div style={big(150, C.red)}>{m}%</div>
          <div style={{ ...lab, color: C.ink }}>3분기 만에 · 사상 최속</div>
        </Up>
        <Up at={e3} style={{ position: 'absolute', left: 1380, top: 720, width: 480 }}>
          <div style={big(108, C.red)}>{loss}조</div>
          <div style={{ ...lab, color: C.ink }}>2023 DS 영업손실 · 사상 최대</div>
        </Up>
      </div>
    </ChapterFrame>
  );
};
