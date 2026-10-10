// 「네 번의 겨울」 디자인 토큰 — v3/v4 페이지(../index.html)와 samsung-memory-ppt-design-skill 토큰을 그대로 잇는다.
// 화이트 바탕 + Samsung Blue 단일 액센트. 적색은 낙폭·적자·파산 수치에만, 경쟁사 로고는 그레이.
export const C = {
  paper: '#ffffff',
  ink: '#0b1020',
  blue: '#1428a0', // Samsung Blue — 유일한 액센트
  blue2: '#3355e0',
  frost: '#dfe4ee', // 얼어붙은 다이 · 비강조
  frost2: '#eef1f6',
  steel: '#7d879f', // 라벨 · 연도
  red: '#e3342f', // 하락 · 적자에만
} as const;

export const FONT = '"Noto Sans KR", sans-serif';
export const SERIF = '"Noto Serif KR", serif';

// 동효 성격 토큰 (pipeline.md 「품牌→动效参数」: 专业信赖 프리셋에서 능량 축 한 단계 낮춤 — 다큐형 TV 광고)
export const MOTION = {
  enter: 21, // 주 입장 시간 (f)
  lineIn: 21, // 라인 마스크 리빌
  settle: 30, // 핵심 정보 착지 후 최소 정지 (R1)
} as const;
