import React from 'react';
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { C, FONT } from './theme';
import { CUE, FPS, ORDER_KEYS, SHOTS, TOTAL } from './timeline';
import { VO_MEASURED } from './vo';
import music from './music.json';
import { SFX } from './sfx';
import { Open } from './scenes/Open';
import { Curve } from './scenes/Curve';
import { W08, W12, W19, W23 } from './scenes/Winters';
import { Blade, End, Lesson, Scen, Spring } from './scenes/Tail';

export type Props = { bgm: boolean; vo?: boolean };
const M = music as { bpm: number; t0: number; src: string | null; gain?: number };

// 표지 → 곡선: 흰 화면 통과. 표지 마지막 10f 확대 + 페이드
const OpenOut: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [SHOTS.open.dur - 10, SHOTS.open.dur], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <AbsoluteFill style={{ opacity: 1 - p, transform: `scale(${1 + 0.08 * p * p})` }}><Open /></AbsoluteFill>;
};
const ScenWrap: React.FC = () => <Scen dur={SHOTS.scen.dur} />;
const SCENES: Record<string, React.FC> = { open: OpenOut, curve: Curve, w08: W08, w12: W12, w19: W19, w23: W23, spring: Spring, lesson: Lesson, scen: ScenWrap, end: End };
// 장 전환 블레이드(블루) — 겨울 4장·봄·교훈·결론 진입
const BLADES = [SHOTS.w08.from, SHOTS.w12.from, SHOTS.w19.from, SHOTS.w23.from, SHOTS.spring.from, SHOTS.lesson.from, SHOTS.end.from];

// 내레이션 구간에서 음악을 낮춘다(덕킹): 큐 앞 6f 동안 내려가 큐 끝 뒤 14f 동안 복귀
const VO_RANGES = Object.values(CUE).map((c) => [c.abs, c.abs + (c.end - c.at)] as [number, number]);
const duck = (f: number) => {
  let d = 0;
  for (const [a, b] of VO_RANGES) d = Math.max(d, interpolate(f, [a - 6, a, b, b + 14], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  return d;
};

export const Main: React.FC<Props> = ({ bgm, vo = true }) => (
  <AbsoluteFill style={{ background: C.paper, fontFamily: FONT, wordBreak: 'keep-all', fontFeatureSettings: '"tnum"' }}>
    {ORDER_KEYS.map((k) => {
      const Comp = SCENES[k];
      return <Sequence key={k} from={SHOTS[k].from} durationInFrames={SHOTS[k].dur} name={k}><Comp /></Sequence>;
    })}
    {BLADES.map((b) => <Blade key={b} at={b} color={C.blue} />)}
    {bgm && M.src && (
      <Audio src={staticFile(M.src)} trimBefore={Math.round(M.t0 * FPS)}
        volume={(f) => (M.gain ?? 0.7) * (1 - 0.6 * duck(f)) * interpolate(f, [0, 8, TOTAL - 45, TOTAL], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />
    )}
    {vo && VO_MEASURED && Object.entries(CUE).map(([id, c]) => (
      <Sequence key={id} from={c.abs} name={`vo:${id}`} layout="none"><Audio src={staticFile(`vo/${id}.wav`)} volume={1} /></Sequence>
    ))}
    {SFX.map((s, i) => (
      <Sequence key={i} from={s.from} durationInFrames={s.dur ?? Infinity} name={`sfx:${s.note}`} layout="none">
        <Audio src={staticFile(`sfx/${s.src}.mp3`)} volume={s.volume} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
