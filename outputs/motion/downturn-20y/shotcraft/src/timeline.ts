// 단일 사실 소스: 장면 표(SHOTS)는 내레이션 큐 길이(vo.ts) + 장면별 여백 규칙으로 계산되고,
// 장면 경계는 음악 박 격자(music.json, 곡 첫 박 = 영상 0초가 되도록 음악을 t0 만큼 잘라 재생)에 올림 정렬된다.
import { CUES, voSec } from './vo';
import music from './music.json';
import assets from './assets.json';

export const FPS = 30;
export const BEAT = 60 / (music as { bpm: number }).bpm;
export const HAS_PHOTOS = (assets as { photos: boolean }).photos;

type Spec = {
  lead: number; // 장면 시작 → 첫 큐 (초)
  gap?: number; // 큐 사이 기본 간격
  slot?: Record<string, number>; // 큐별 최소 점유 시간(큐 시작 → 다음 큐 시작). 화면 동작에 시간이 필요한 큐
  tail: number; // 마지막 큐 끝 → 장면 끝 (착지 후 정지, R1)
  snap: number; // 경계 정렬 단위(박 수)
};
const SPEC: Record<string, Spec> = {
  open: { lead: 1.4, tail: 1.4, snap: 2 }, // 실사 콜드 오픈 1.6초 → 웨이퍼 → 제목
  curve: { lead: 0.4, gap: 0.3, slot: { c2: 1.4, c3: 1.8, c4: 1.8, c5: 1.6 }, tail: 1.0, snap: 2 },
  w08: { lead: 0.4, gap: 0.35, slot: { a1: 3.2, a2: 4.0 }, tail: 1.3, snap: 2 },
  w12: { lead: 0.4, gap: 0.35, slot: { b1: 3.4, b2: 2.4 }, tail: 1.3, snap: 2 },
  w19: { lead: 0.4, gap: 0.35, slot: { d1: 3.6, d2: 1.8 }, tail: 1.5, snap: 2 },
  w23: { lead: 0.4, gap: 0.35, slot: { e1: 3.4, e2: 2.4 }, tail: 1.2, snap: 2 },
  spring: { lead: 0.4, gap: 0.4, slot: { p1: 2.0 }, tail: 1.2, snap: 2 },
  lesson: { lead: 0.4, gap: 0.35, tail: 1.2, snap: 2 },
  scen: { lead: 0.3, gap: 0.5, slot: { s0: 2.4, s1: 4.6, s2: 4.6 }, tail: 2.6, snap: 2 },
  end: { lead: 0.3, gap: 0.4, tail: 2.4, snap: 2 },
};
const ORDER = ['open', 'curve', 'w08', 'w12', 'w19', 'w23', 'spring', 'lesson', 'scen', 'end'] as const;
export type ShotKey = (typeof ORDER)[number];

const f = (sec: number) => Math.round(sec * FPS);
export const SHOTS = {} as Record<ShotKey, { from: number; dur: number }>;
// 큐 시작/끝(장면 내부 프레임)
export const CUE = {} as Record<string, { at: number; end: number; abs: number }>;
{
  let t = 0; // 초 — 누적, 박 격자 위
  for (const k of ORDER) {
    const sp = SPEC[k];
    let c = sp.lead;
    const cues = CUES[k];
    cues.forEach((q, i) => {
      const d = voSec(q);
      CUE[q.id] = { at: f(c), end: f(c + d), abs: f(t + c) };
      c += Math.max(d + (i < cues.length - 1 ? sp.gap ?? 0.35 : 0), sp.slot?.[q.id] ?? 0);
    });
    const raw = c + sp.tail;
    const unit = BEAT * sp.snap;
    const dur = Math.ceil(raw / unit - 1e-6) * unit;
    SHOTS[k] = { from: f(t), dur: f(t + dur) - f(t) };
    t += dur;
  }
}
export const TOTAL = SHOTS.end.from + SHOTS.end.dur;
// 시나리오 레인 시작(장면 내부) · 헤드라인 카드 간격 — Tail.tsx 와 sfx.ts 공유
export const laneStarts = () => ['s1', 's2', 's3'].map((id) => CUE[id].at - 6);
export const cardStep = (i: number) => { const a = laneStarts(); const b = i < 2 ? a[i + 1] : SHOTS.scen.dur; return Math.max(22, Math.min(34, (b - a[i] - 60) / 3)); };
export const ORDER_KEYS = ORDER;

/* ───── 데이터 (wiki/downturn/downturn-history.md) ───── */
// 전체 메모리(DRAM+NAND) 연 매출 $B, ᵉ 추정 포함
export const REV: [number, number][] = [[2006, 46.7], [2007, 45.4], [2008, 35.6], [2009, 34.5], [2010, 58.1], [2011, 50.8], [2012, 47.2], [2013, 60.6], [2014, 77.6], [2015, 78.8], [2016, 79.5], [2017, 129.2], [2018, 162.6], [2019, 108.0], [2020, 121.3], [2021, 161.1], [2022, 141.2], [2023, 88.5], [2024, 158.1], [2025, 222.0]];
// 낙폭 도장 — 해당 숫자를 읽는 큐(c2..c5) 시작에 저점 도착
export const STAMPS = [
  { y: 2009, cue: 'c2', d: '−26%', yr: '2007–09', above: true },
  { y: 2012, cue: 'c3', d: '−19%', yr: '2010–12', above: true },
  { y: 2019, cue: 'c4', d: '−34%', yr: '2018–19', above: false },
  { y: 2023, cue: 'c5', d: '−45%', yr: '2022–23', above: false },
];
// 2008 DRAM 점유율 (치킨게임 직전)
export const SH08 = [
  { k: 'samsung', p: 30, me: true }, { k: 'Hynix', p: 19 }, { k: 'Elpida', p: 15 }, { k: 'micron', p: 11 }, { k: 'Qimonda', p: 10 },
];
// 2023 DRAM 분기 매출 $B (1Q22·2Q22·1Q23·2Q23 ᵉ)
export const Q23: [string, number][] = [['1Q22', 24.03], ['2Q22', 25.59], ['3Q22', 18.19], ['4Q22', 12.28], ['1Q23', 9.7], ['2Q23', 11.4]];

// 다운턴의 발원 (wiki/downturn/scenario-matrix.md §3 · sources/articles/dt-*-signals-2026-08-28.md)
// 헤드라인은 2026-08 신호를 연장한 가상 헤드라인 — 실제 보도가 아니다.
export const LANES = [
  { cue: 's1', no: '시나리오 1', t: '수요발', p: 44, sub: '급제동 20 + 긴 하산 24', m: 'AI 투자가 멈추면, 주문이 먼저 사라진다',
    h: [['2027.11', '빅테크 4사, AI 데이터센터 투자', '첫 동시 삭감'], ['2028.02', '추론 비용 1/10 신모델 공개…', '서버당 메모리 탑재량 줄었다'], ['2028.04', '고객사 HBM 장기계약 재협상 요구…', 'D램 현물가 급락']] },
  { cue: 's2', no: '시나리오 2', t: '공급발', p: 48, sub: '동시 방류 22 + 저가 잠식 26', m: '공장이 한꺼번에 돌면, 가격이 원가 밑으로',
    h: [['2028.06', '용인·평택·아이다호 신규 팹 동시 가동…', 'D램 캐파 사상 최대'], ['2028.09', '中 CXMT DDR5 저가 공세…', '범용 D램 가격 원가 아래로'], ['2029.01', '중국산 D램 점유율 18% 돌파…', '글로벌 스마트폰 고객 첫 채택']] },
  { cue: 's3', no: '시나리오 3', t: '전환발', p: 8, sub: '판 갈이 8', m: '제품의 정의가 바뀌면, 감산도 계약도 통하지 않는다',
    h: [['2028.03', 'GPU 업체가 HBM 베이스 다이 직접 설계…', '메모리는 ‘부품’이 된다'], ['2028.10', 'CXL 메모리 풀링 대세로…', '신규 D램 대신 재활용 D램'], ['2029.06', '3D D램 첫 양산 발표…', '기존 2D 라인 조기 상각 우려']] },
];
