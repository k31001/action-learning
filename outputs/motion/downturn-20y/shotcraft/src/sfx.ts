// SFX 핀 표 — 모든 from 은 SHOTS·큐 기준 상대식(내레이션 길이가 바뀌어도 자동 추종).
// pin(target) = 화면 타격 프레임에 음원 피크를 맞춘다: from = target − peakLag(실측) − OUT_LAG(AAC priming ≈1f).
// 내레이션이 생겼으므로 v1 보다 개수·음량을 줄였다 — 타격은 숫자·전환에만, 대사와 겹치는 장식음은 뺀다.
import { CUE, cardStep, laneStarts, SHOTS } from './timeline';
import { T08, T12, T19, T23 } from './scenes/Winters';
import { TOPEN } from './scenes/Open';
import { END_LAND } from './scenes/Tail';

export const OUT_LAG = 1;
const LAG: Record<string, number> = { // 실측 피크 지연 (f, ffmpeg+numpy)
  'bass-hit-short': 3, 'bass-hit-futuristic': 6, 'hit-blow': 6, 'impact-epic-trailer': 28, 'impact-cine-big': 65, 'swoosh-slow': 63, 'whoosh-swirl': 58,
};
export type Sfx = { from: number; src: string; volume: number; dur?: number; note: string };
const S = SHOTS;
const pin = (target: number, src: string, volume: number, note: string, dur?: number): Sfx =>
  ({ from: target - (LAG[src] ?? 0) - OUT_LAG, src, volume, dur, note });
const at = (from: number, src: string, volume: number, note: string, dur?: number): Sfx => ({ from, src, volume, dur, note });
const c = (id: string) => CUE[id].at;

const o = S.open.from, X = o + TOPEN().X, t2 = o + TOPEN().title2;
const t08 = T08(), t12 = T12(), t19 = T19(), t23 = T23();
const lanes = laneStarts();

export const SFX: Sfx[] = [
  // ① 표지
  at(Math.max(0, X - 18), 'light-aura', 0.32, '실사 → 그래픽 웨이퍼, 다이 생장', 100),
  at(t2 + 2, 'wind-swoosh-short', 0.36, '결빙 — 가장자리부터 서리'),
  pin(t2 + 6, 'bass-hit-short', 0.32, '「네 번의 겨울.」 착지'),
  pin(S.curve.from, 'whoosh-swirl', 0.24, '흰 화면 통과 → 곡선'),
  // ② 곡선 — 낙폭 도장(내레이터가 숫자를 읽는 순간)
  pin(S.curve.from + c('c2'), 'bass-hit-short', 0.28, '−26%'),
  pin(S.curve.from + c('c3'), 'bass-hit-short', 0.28, '−19%'),
  pin(S.curve.from + c('c4'), 'bass-hit-short', 0.32, '−34%'),
  pin(S.curve.from + c('c5'), 'bass-hit-futuristic', 0.4, '−45% + 화면 펀치 (slam 1/3)'),
  at(S.curve.from + c('c6'), 'air-woosh-deep', 0.14, '풀백 — 20년 전체', 60),
  // 장 전환 블레이드 + 장 카드 밀어올림
  ...(['w08', 'w12', 'w19', 'w23', 'spring', 'lesson', 'scen'] as const).map((k, i) => at(S[k].from - 8, i % 2 ? 'whoosh-fast' : 'swoosh-quick', 0.3, `블레이드 → ${k}`, 30)),
  at(S.w08.from + t08.sw, 'sweep-short', 0.22, '장 카드 → 레이아웃'),
  at(S.w12.from + t12.sw, 'sweep-short', 0.22, '장 카드 → 레이아웃'),
  at(S.w19.from + t19.sw, 'sweep-short', 0.22, '장 카드 → 레이아웃'),
  at(S.w23.from + t23.sw, 'sweep-short', 0.22, '장 카드 → 레이아웃'),
  // 2008
  at(S.w08.from + t08.odo - 14, 'clock-knob-spin', 0.8, '오도미터 회전 (경량 음원 −14dB → 증폭)'),
  ...[0, 1, 2].map((i) => at(S.w08.from + t08.odo + i * 7 + 15, 'clock-tick-single', 0.9 - i * 0.15, `자리 ${i + 1} 잠금`)),
  pin(S.w08.from + t08.pct, 'bass-hit-short', 0.36, '−93%'),
  pin(S.w08.from + t08.qm, 'hit-blow', 0.36, '키몬다 적색'),
  at(S.w08.from + t08.qm + 10, 'gravel-fall-hit', 0.24, '키몬다 조각 탈락'),
  // 2012
  pin(S.w12.from + t12.el, 'hit-blow', 0.36, '엘피다 파산'),
  at(S.w12.from + t12.b2, 'transition-tech-slide', 0.45, 'Hynix → SK hynix · 흡수 · 탈락'),
  pin(S.w12.from + t12.three, 'bass-hit-futuristic', 0.4, '6강 → 3강'),
  // 2019
  at(S.w19.from + t19.mid, 'sweep-short', 0.24, '마이크론 감산'),
  at(S.w19.from + t19.mid + 14, 'sweep-short', 0.2, 'SK 감산'),
  at(S.w19.from + t19.d2, 'sweep-short', 0.28, '삼성 무감산'),
  at(S.w19.from + t19.d3, 'sparkle-touch', 0.3, '44.1%'),
  // 2023
  at(S.w23.from + t23.e2, 'sweep-fast-small', 0.24, '분기 막대 붕괴 + 풀백'),
  pin(S.w23.from + t23.land, 'impact-epic-trailer', 0.45, '−62% 크래시 줌 (slam 2/3)'),
  pin(S.w23.from + c('e3') + 4, 'bass-hit-short', 0.34, '−14.88조'),
  // ⑤ 봄
  at(S.spring.from + c('p1'), 'shimmer-sparkle-sweep', 0.26, '반등 곡선', 80),
  at(S.spring.from + c('p3') - 10, 'air-woosh-quick', 0.12, '곡선 → HBM 실사'),
  // ⑥ 교훈
  at(S.lesson.from + c('l1') + 40, 'paper-slide', 0.28, '마커 밑줄'),
  at(S.lesson.from + c('l2'), 'sweep-short', 0.22, '심은 것'),
  at(S.lesson.from + c('l3'), 'sweep-short', 0.2, '놓친 것'),
  // ⑦ 시나리오
  pin(S.scen.from + c('s0') + 6, 'swoosh-slow', 0.1, '질문 진입 (빌드인)', 75),
  pin(S.scen.from + c('s0') + 2, 'bass-hit-short', 0.18, '「다음 겨울은 어디서 오는가.」'),
  at(S.scen.from + lanes[0] - 24, 'air-woosh-quick', 0.24, '제목 강등 → 라벨'),
  ...[0, 1, 2].flatMap((i): Sfx[] => {
    const a = S.scen.from + lanes[i], st = cardStep(i);
    return [
      ...(i ? [at(a - 8, i % 2 ? 'whoosh-fast' : 'swoosh-quick', 0.28, `잉크 블레이드 → 발원 ${i + 1}`, 30)] : []),
      pin(a + 6, 'bass-hit-short', 0.18, `발원 ${i + 1} 이름`),
      at(a + 14, 'clock-knob-spin', 0.6, `확률 카운트 ${i + 1}`),
      ...[0, 1, 2].map((j) => at(a + 24 + Math.round(j * st), j % 2 ? 'paper-move-quick' : 'paper-slide', 0.34 - j * 0.05, `헤드라인 ${j + 1}`)),
    ];
  }),
  // ⑧ 결론: 빌드인(impact-cine-big 앞 2초) → 임팩트 → 여운
  at(S.end.from - 8, 'swoosh-quick', 0.26, '블루 블레이드 → 결론'),
  pin(S.end.from + END_LAND(), 'impact-cine-big', 0.62, '「심을 것인가.」 대사 직후 임팩트 (slam 3/3)'),
  at(S.end.from + END_LAND() + 14, 'shimmer-sparkle-sweep', 0.24, '해빙 여운', 74),
];
