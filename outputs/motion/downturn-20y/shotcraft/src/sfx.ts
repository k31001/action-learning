// SFX 핀 표 — 모든 from 은 SHOTS 기준 상대식. pin(target) = 화면 타격 프레임에 음원 피크를 맞춘다:
// from = target − peakLag(음원 자체 피크 지연, 실측) − OUT_LAG(AAC priming ≈1f, sound-design §4.6).
import { LANE, LANE0, SHOTS } from './timeline';

export const OUT_LAG = 1;
const LAG: Record<string, number> = { // 실측 피크 지연 (f, ffmpeg+numpy)
  'bass-hit-short': 3, 'bass-hit-futuristic': 6, 'hit-blow': 6, 'impact-epic-trailer': 28, 'impact-cine-big': 65, 'swoosh-slow': 63, 'whoosh-swirl': 58,
};
export type Sfx = { from: number; src: string; volume: number; dur?: number; note: string };
const S = SHOTS;
const pin = (target: number, src: string, volume: number, note: string, dur?: number): Sfx =>
  ({ from: target - (LAG[src] ?? 0) - OUT_LAG, src, volume, dur, note });
const at = (from: number, src: string, volume: number, note: string, dur?: number): Sfx => ({ from, src, volume, dur, note });

export const SFX: Sfx[] = [
  // ① 표지
  at(S.open.from + 2, 'light-aura', 0.42, '웨이퍼 다이 생장', 110),
  at(S.open.from + 78, 'wind-swoosh-short', 0.45, '결빙 — 가장자리부터 서리'),
  pin(S.open.from + 84, 'bass-hit-short', 0.38, '「네 번의 겨울.」 착지'),
  pin(S.curve.from, 'whoosh-swirl', 0.3, '흰 화면 통과 → 곡선'),
  // ② 곡선
  pin(S.curve.from + 30, 'bass-hit-short', 0.45, '−26% 도장'),
  pin(S.curve.from + 75, 'bass-hit-short', 0.45, '−19% 도장'),
  pin(S.curve.from + 130, 'bass-hit-short', 0.55, '−34% 도장'),
  pin(S.curve.from + 180, 'bass-hit-futuristic', 0.62, '−45% 도장 + 화면 펀치 (slam 1/3)'),
  at(S.curve.from + 184, 'air-woosh-deep', 0.36, '풀백 — 20년 전체', 60),
  at(S.curve.from + 228, 'sparkle-touch', 0.32, '「다시 일어섰다」'),
  // 장 전환 블레이드 (닫힘 9f 전부터)
  at(S.w08.from - 8, 'swoosh-quick', 0.4, '블레이드 → 2008'),
  at(S.w12.from - 8, 'whoosh-fast', 0.36, '블레이드 → 2012', 30),
  at(S.w19.from - 8, 'swoosh-quick', 0.36, '블레이드 → 2019'),
  at(S.w23.from - 8, 'whoosh-fast', 0.34, '블레이드 → 2023', 30),
  at(S.lesson.from - 8, 'swoosh-quick', 0.3, '블레이드 → 교훈'),
  // 2008
  at(S.w08.from + 30, 'clock-knob-spin', 1.4, '오도미터 회전 (경량 음원 −14dB → 증폭)'),
  at(S.w08.from + 59, 'clock-tick-single', 1.4, '자리 1 잠금'),
  at(S.w08.from + 66, 'clock-tick-single', 1.2, '자리 2 잠금'),
  at(S.w08.from + 73, 'clock-tick-single', 1.0, '자리 3 잠금'),
  at(S.w08.from + 72, 'sweep-fast-small', 0.22, '점유율 막대'),
  pin(S.w08.from + 88, 'bass-hit-short', 0.42, '−93%'),
  pin(S.w08.from + 120, 'hit-blow', 0.42, '키몬다 적색'),
  at(S.w08.from + 130, 'gravel-fall-hit', 0.28, '키몬다 막대 붕괴'),
  // 2012
  at(S.w12.from + 34, 'sweep-short', 0.28, '6강 타일'),
  pin(S.w12.from + 60, 'hit-blow', 0.42, '엘피다 파산'),
  at(S.w12.from + 85, 'transition-tech-slide', 0.55, 'Hynix → SK hynix'),
  at(S.w12.from + 104, 'swoosh-quick', 0.28, '마이크론이 엘피다 흡수'),
  at(S.w12.from + 118, 'wind-woosh-throw', 0.28, '키몬다·대만 퇴장'),
  pin(S.w12.from + 132, 'bass-hit-futuristic', 0.45, '3강'),
  // 2019
  at(S.w19.from + 28, 'transition-tech', 0.55, '해치 막대', 30),
  pin(S.w19.from + 62, 'bass-hit-short', 0.42, '−37.6%'),
  at(S.w19.from + 84, 'sweep-short', 0.3, '마이크론 감산'),
  at(S.w19.from + 98, 'sweep-short', 0.26, 'SK 감산'),
  at(S.w19.from + 112, 'sweep-short', 0.22, '삼성 무감산'),
  at(S.w19.from + 136, 'sparkle-touch', 0.32, '44.1%'),
  // 2023
  at(S.w23.from + 26, 'sweep-fast-small', 0.26, '분기 막대'),
  pin(S.w23.from + 84, 'impact-epic-trailer', 0.62, '−62% 크래시 줌 (slam 2/3)'),
  pin(S.w23.from + 100, 'bass-hit-short', 0.38, '−14.88조'),
  at(S.w23.from + 114, 'hit-weak', 0.45, '+76.6%'),
  // ④ 교훈
  at(S.lesson.from + 44, 'paper-slide', 0.34, '마커 밑줄'),
  at(S.lesson.from + 62, 'sweep-short', 0.26, '심은 것'),
  at(S.lesson.from + 80, 'sweep-short', 0.22, '놓친 것'),
  // ⑤ 시나리오
  pin(S.scen.from + 6, 'swoosh-slow', 0.3, '질문 진입 (빌드인)', 75),
  pin(S.scen.from + 10, 'bass-hit-short', 0.4, '「다음 겨울은 어디서 오는가.」'),
  at(S.scen.from + 40, 'air-woosh-quick', 0.3, '제목 강등 → 라벨'),
  ...[0, 1, 2].flatMap((i): Sfx[] => {
    const a = S.scen.from + LANE0 + i * LANE;
    return [
      ...(i ? [at(a - 8, i % 2 ? 'whoosh-fast' : 'swoosh-quick', 0.34, `잉크 블레이드 → 발원 ${i + 1}`, 30)] : []),
      pin(a + 6, 'bass-hit-short', 0.4, `발원 ${i + 1} 이름`),
      at(a + 14, 'clock-knob-spin', 1.2, `확률 카운트 ${i + 1}`),
      at(a + 30, 'paper-slide', 0.42, '헤드라인 1'),
      at(a + 56, 'paper-move-quick', 0.36, '헤드라인 2'),
      at(a + 82, 'paper-slide', 0.3, '헤드라인 3'),
    ];
  }),
  // ⑥ 결론: 빌드인(impact-cine-big 앞 2초) → impact → sparkle
  at(S.end.from - 8, 'swoosh-quick', 0.3, '블루 블레이드 → 결론'),
  pin(S.end.from + 36, 'impact-cine-big', 0.72, '「심을 것인가.」 착지 (slam 3/3)'),
  at(S.end.from + 46, 'shimmer-sparkle-sweep', 0.3, '해빙 여운', 74),
];
