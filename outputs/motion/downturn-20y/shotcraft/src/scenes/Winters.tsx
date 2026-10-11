import React from 'react';
import { useCurrentFrame, interpolateColors } from 'remotion';
import { C, FONT } from '../theme';
import { EXPO, INOUT, Logo, minus, Odometer, OUT, tw, Up, Wordmark } from '../lib';
import { Q23, SH08 } from '../timeline';
import { WinterFrame } from './Winter';

const R = 960; // 오른쪽 열 x
const lab: React.CSSProperties = { fontSize: 36, fontWeight: 700, color: C.steel };
const big = (fs: number, c: string = C.ink): React.CSSProperties => ({ fontSize: fs, fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1.04, color: c, whiteSpace: 'nowrap' });
const SRC = (s: string) => `출처: wiki/downturn/downturn-history.md · ${s}`;

/* 2008 · 버텼다 — 오도미터(odometer-digit-roll)로 $6.80 → $0.50, 점유율 막대, 키몬다 붕괴 */
export const W08: React.FC = () => {
  const f = useCurrentFrame();
  const qmRed = tw(f, [100, 104], [0, 1]);
  const qmGone = tw(f, [108, 122], [0, 1], Easing3);
  return (
    <WinterFrame k={0} src={SRC('dram-chicken-game-history · samsung-downturn-actions')}>
      <Up at={22} style={{ position: 'absolute', left: R, top: 150, ...lab }}>512Mb DDR2 현물가 · 2007 → 2008</Up>
      <div style={{ position: 'absolute', left: R, top: 206, display: 'flex', alignItems: 'center', gap: 34 }}>
        <Up at={24}><Odometer text="$0.50" from="$6.80" at={36} size={112} color={C.ink} /></Up>
        <Up at={80} dx={-24} dy={0} style={big(112, C.red)}>−93%</Up>
      </div>
      <Up at={60} style={{ position: 'absolute', left: R, top: 372, ...lab }}>치킨게임 직전 DRAM 점유율</Up>
      <div style={{ position: 'absolute', left: R, top: 424, width: 860 }}>
        {SH08.map((s, i) => {
          const a = 64 + i * 4;
          const bar = tw(f, [a + 2, a + 20], [0, 1], EXPO);
          const isQ = s.k === 'Qimonda';
          const w = s.p * 16 * bar * (isQ ? 1 - qmGone : 1);
          const fill = s.me ? C.blue : isQ ? interpolateColors(qmRed, [0, 1], [C.frost, C.red]) : C.frost;
          return (
            <Up key={s.k} at={a} dx={-30} dy={0} style={{ position: 'absolute', top: i * 66, left: 0, height: 60, display: 'flex', alignItems: 'center', width: 860 }}>
              <div style={{ width: 230, flex: '0 0 230px' }}>
                {s.k === 'samsung' || s.k === 'micron' ? <Logo k={s.k} h={s.k === 'samsung' ? 34 : 42} grey={s.k !== 'samsung'} /> : <Wordmark t={s.k} size={32} />}
              </div>
              <div style={{ height: 42, width: w, background: fill, borderRadius: '0 6px 6px 0' }} />
              <div style={{ fontSize: 40, fontWeight: 900, marginLeft: 16, color: s.me ? C.blue : C.ink, opacity: isQ ? 1 - qmRed : 1 }}>{s.p}%</div>
              {isQ && <div style={{ position: 'absolute', left: 250, fontSize: 36, fontWeight: 900, color: C.red, opacity: tw(f, [104, 110], [0, 1]) }}>2009.01 파산</div>}
            </Up>
          );
        })}
        <Up at={84} dx={-30} dy={0} style={{ position: 'absolute', top: 5 * 66, left: 0, height: 60, display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 230 }}><Wordmark t="대만 2사" ghost size={32} /></div>
          <div style={{ fontSize: 34, fontWeight: 900, color: C.steel }}>파워칩 · 난야</div>
        </Up>
      </div>
      <Up at={116} style={{ position: 'absolute', left: R, top: 836, lineHeight: 1.25, whiteSpace: 'nowrap' }}>
        <div style={lab}>2008년 4분기 영업이익률</div>
        <div style={{ fontSize: 48, fontWeight: 900 }}><span style={{ color: C.blue }}>삼성 −14%</span> <span style={{ color: C.steel, fontWeight: 700 }}>vs</span> <span style={{ color: C.red }}>경쟁사 −40% 이하</span></div>
      </Up>
    </WinterFrame>
  );
};
function Easing3(t: number) { return t * t * t; }

/* 2012 · 남았다 — 6개 타일이 3개로 재배열(mosaic-reframe): 엘피다 파산 → 하이닉스가 SK로 → 마이크론이 엘피다 흡수 → 3강 */
const TW = 272, TH = 170;
const pos12 = (i: number): [number, number] => [(i % 3) * 294, Math.floor(i / 3) * 196];
export const W12: React.FC = () => {
  const f = useCurrentFrame();
  const elpRed = tw(f, [60, 64], [0, 1]);
  const swap = tw(f, [85, 95], [0, 1], INOUT);
  const absorb = tw(f, [105, 121], [0, 1], INOUT);
  const drop = (j: number) => tw(f, [118 + j * 3, 132 + j * 3], [0, 1], (t) => t * t * t);
  const reflow = tw(f, [128, 146], [0, 1], EXPO);
  const three = f >= 132;
  const tiles = [
    { id: 'samsung', me: true }, { id: 'hynix' }, { id: 'elpida' }, { id: 'micron' }, { id: 'qimonda', ghost: '2009 퇴출' }, { id: 'taiwan', ghost: '' },
  ];
  // 3강 재배열 목표: 삼성·SK·마이크론이 한 줄로, 높이 250
  const target: Record<string, [number, number]> = { samsung: [0, 0], hynix: [294, 0], micron: [588, 0] };
  return (
    <WinterFrame k={1} src={SRC('dram-chicken-game-history · memory-capex-history-research-2006-2015')}>
      <Up at={22} style={{ position: 'absolute', left: R, top: 150, ...lab }}>DRAM 공급사</Up>
      <div style={{ position: 'absolute', left: R, top: 196, height: 130, overflow: 'hidden' }}>
        <div style={{ ...big(120, C.blue), transform: `translateY(${three ? tw(f, [132, 144], [100, 0], EXPO) : tw(f, [24, 40], [100, 0], EXPO)}%)` }}>{three ? '3강' : '6강'}</div>
      </div>
      <div style={{ position: 'absolute', left: R, top: 350, width: 870, height: 380 }}>
        {tiles.map((t, i) => {
          const a = 34 + i * 3;
          const inn = tw(f, [a, a + 14], [0, 1], (x) => 1 + 2.70158 * Math.pow(x - 1, 3) + 1.70158 * Math.pow(x - 1, 2)); // back.out
          let [x, y] = pos12(i);
          let op = tw(f, [a, a + 8], [0, 1]), h = TH, dy = 0;
          if (t.id === 'elpida') { const [mx, my] = pos12(3); x += (mx - x) * absorb; y += (my - y) * absorb; op *= 1 - absorb; }
          if (t.id === 'qimonda' || t.id === 'taiwan') { const p = drop(i - 4); dy = 120 * p; op *= 1 - p; }
          if (target[t.id]) { const [tx, ty] = target[t.id]; x += (tx - x) * reflow; y += (ty - y) * reflow; h = TH + (250 - TH) * reflow; }
          const border = t.me ? C.blue : t.id === 'elpida' ? interpolateColors(elpRed, [0, 1], [C.frost, C.red]) : C.frost;
          const bg = t.id === 'elpida' ? interpolateColors(elpRed, [0, 1], ['#ffffff', '#fdecec']) : '#ffffff';
          return (
            <div key={t.id} style={{ position: 'absolute', left: x, top: y + dy, width: TW, height: h, opacity: op, transform: `scale(${0.85 + 0.15 * inn})`, borderRadius: 10, border: `3px ${t.ghost != null ? 'dashed' : 'solid'} ${border}`, background: bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              {t.id === 'samsung' && <Logo k="samsung" h={34} />}
              {t.id === 'micron' && <Logo k="micron" h={44} grey />}
              {t.id === 'hynix' && (
                <div style={{ position: 'relative', width: 230, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ position: 'absolute', opacity: 1 - swap, transform: `translateY(${-30 * swap}px)` }}><Wordmark t="Hynix" /></div>
                  <div style={{ position: 'absolute', opacity: swap, transform: `translateY(${30 * (1 - swap)}px)` }}><Logo k="skhynix" h={86} grey /></div>
                </div>
              )}
              {t.id === 'elpida' && <Wordmark t="Elpida" />}
              {t.id === 'qimonda' && <Wordmark t="Qimonda" ghost />}
              {t.id === 'taiwan' && <Wordmark t="대만 업체" ghost />}
              {t.ghost ? <div style={{ fontSize: 28, fontWeight: 700, color: C.steel }}>{t.ghost}</div> : null}
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', left: R, top: 742, width: 900, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 40, fontWeight: 700, lineHeight: 1.3 }}>
        <Up at={60} dx={-24} dy={0}><b style={{ color: C.red, fontWeight: 900 }}>2012.02</b> 엘피다 파산 · 부채 4,480억 엔</Up>
        <Up at={85} dx={-24} dy={0}><b style={{ fontWeight: 900 }}>2012</b> SK, 하이닉스 인수</Up>
        <Up at={105} dx={-24} dy={0}><b style={{ fontWeight: 900 }}>2013</b> 마이크론, 엘피다 인수 (~$2.5B)</Up>
        <Up at={132} dx={-24} dy={0}><b style={{ color: C.blue, fontWeight: 900 }}>→ 3강 과점 완성</b></Up>
      </div>
    </WinterFrame>
  );
};

/* 2019 · 멈추지 않았다 — 해치 막대(hatch-depth): 사선 자리표시가 늘어난 뒤 실색으로 채워지며 값이 튄다 */
const Hatch: React.FC<{ at: number; w: number; color: string; label: string; value: string; vc: string }> = ({ at, w, color, label, value, vc }) => {
  const f = useCurrentFrame();
  const grow = tw(f, [at, at + 16], [0, 1], EXPO);
  const solid = tw(f, [at + 14, at + 24], [0, 1]);
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: 74 }}>
      <div style={{ width: 130, fontSize: 36, fontWeight: 700, color: C.steel }}>{label}</div>
      <div style={{ position: 'relative', width: w * grow, height: 58, borderRadius: '0 6px 6px 0', overflow: 'hidden', background: `repeating-linear-gradient(-45deg, ${C.frost} 0 10px, #fff 10px 20px)` }}>
        <div style={{ position: 'absolute', inset: 0, background: color, opacity: solid }} />
      </div>
      <div style={{ marginLeft: 18, fontSize: 52, fontWeight: 900, color: vc, opacity: solid, transform: `scale(${1 + 0.12 * (1 - solid)})`, transformOrigin: 'left center' }}>{value}</div>
    </div>
  );
};
export const W19: React.FC = () => {
  const acts: [React.ReactNode, string, string][] = [
    [<Logo k="micron" h={40} grey />, '2019.03 첫 공식 감산', C.ink],
    [<Logo k="skhynix" h={84} grey />, '2019.07 감산', C.ink],
    [<Logo k="samsung" h={32} />, '무감산 · 투자 유지', C.blue],
  ];
  return (
    <WinterFrame k={2} src={SRC('samsung-2019-downturn-2017-2019-actions')}>
      <Up at={22} style={{ position: 'absolute', left: R, top: 150, ...lab }}>DRAM 산업 매출 · 2018 → 2019</Up>
      <div style={{ position: 'absolute', left: R, top: 206 }}>
        <Hatch at={28} w={99.4 * 5.4} color={C.steel} label="2018" value="$99.4B" vc={C.ink} />
        <Hatch at={40} w={62.0 * 5.4} color={C.ink} label="2019" value="$62.0B" vc={C.ink} />
      </div>
      <Up at={62} dx={-24} dy={0} style={{ position: 'absolute', left: R + 130, top: 374, ...big(80, C.red) }}>−37.6%</Up>
      <div style={{ position: 'absolute', left: R, top: 500, width: 860 }}>
        {acts.map(([lg, t, c], i) => (
          <Up key={i} at={84 + i * 14} dx={-30} dy={0} style={{ height: 92, display: 'flex', alignItems: 'center', gap: 30, borderBottom: `3px solid ${C.frost}` }}>
            <div style={{ width: 230, flex: '0 0 230px', display: 'flex', alignItems: 'center', height: 70 }}>{lg}</div>
            <div style={{ fontSize: 44, fontWeight: 900, color: c }}>{t}</div>
          </Up>
        ))}
      </div>
      <Up at={136} style={{ position: 'absolute', left: R, top: 808, display: 'flex', alignItems: 'baseline', gap: 24 }}>
        <span style={{ ...lab, color: C.ink }}>1Q20 삼성 DRAM 점유율</span><span style={big(120, C.blue)}>44.1%</span>
      </Up>
    </WinterFrame>
  );
};

/* 2023 · 한 박자 늦었다 — 분기 막대가 무너지고 −62%에서 단 한 번의 크래시 줌(slam 2/3) */
export const W23: React.FC = () => {
  const f = useCurrentFrame();
  const QB = 640, QS = 11, QX = R, QW = 100, QG = 40;
  const m = minus(tw(f, [60, 84], [0, -62], (t) => t * t), 0);
  const loss = minus(tw(f, [100, 128], [0, -14.88], OUT), 2);
  const punch = 1 + 0.06 * tw(f, [84, 87], [0, 1]) * (1 - tw(f, [87, 100], [0, 1], EXPO));
  return (
    <WinterFrame k={3} src={SRC('memory-downturn-history-research(ᵉ 추정 포함) · samsung-pre-downturn-preparation')}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${punch})`, transformOrigin: '1640px 220px' }}>
        <Up at={22} style={{ position: 'absolute', left: R, top: 150, ...lab }}>DRAM 분기 매출 · $B</Up>
        <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0 }}>
          {Q23.map(([q, v], i) => {
            const at = 26 + i * 6;
            const g = tw(f, [at, at + 12], [0, 1], OUT);
            const h = v * QS * g, x = QX + i * (QW + QG), red = i >= 2 && i <= 4;
            return (
              <g key={q}>
                <rect x={x} y={QB - h} width={QW} height={h} rx={4} fill={red ? C.red : C.blue} />
                <text x={x + QW / 2} y={QB - h - 14} textAnchor="middle" fill={C.ink} fontSize={34} fontWeight={900} opacity={tw(f, [at + 8, at + 14], [0, 1])}>{v.toFixed(1)}</text>
                <text x={x + QW / 2} y={QB + 44} textAnchor="middle" fill={C.steel} fontSize={30} fontWeight={700} fontFamily={FONT}>{q}</text>
              </g>
            );
          })}
          <line x1={QX - 10} x2={QX + 6 * QW + 5 * QG + 10} y1={QB} y2={QB} stroke={C.steel} strokeWidth={2} />
        </svg>
        <Up at={58} style={{ position: 'absolute', left: 1440, top: 120, width: 380, textAlign: 'right' }}>
          <div style={big(130, C.red)}>{m}%</div>
          <div style={{ ...lab, color: C.ink }}>3분기 만에 · 사상 최속</div>
        </Up>
        <div style={{ position: 'absolute', left: R, top: 730, display: 'flex', gap: 46 }}>
          <Up at={100}><div style={big(104, C.red)}>{loss}조</div><div style={{ ...lab, color: C.ink, whiteSpace: 'nowrap' }}>2023 DS 영업손실 · 사상 최대</div></Up>
          <Up at={114}><div style={big(104, C.red)}>+76.6%</div><div style={{ ...lab, color: C.ink, whiteSpace: 'nowrap' }}>DS 재고 16.5 → 29.1조</div></Up>
        </div>
      </div>
    </WinterFrame>
  );
};
