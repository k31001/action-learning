import React from 'react';
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { C, FONT } from './theme';
import { SHOTS, TOTAL } from './timeline';
import { SFX } from './sfx';
import { Open } from './scenes/Open';
import { Curve } from './scenes/Curve';
import { W08, W12, W19, W23 } from './scenes/Winters';
import { Blade, End, Lesson, Scen } from './scenes/Tail';

export type Props = { bgm: boolean };

// 표지 → 곡선: 흰 화면 통과(推进流白). 표지 마지막 10f 확대 + 페이드
const OpenOut: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [SHOTS.open.dur - 10, SHOTS.open.dur], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <AbsoluteFill style={{ opacity: 1 - p, transform: `scale(${1 + 0.08 * p * p})` }}><Open /></AbsoluteFill>;
};

const SCENES: [keyof typeof SHOTS, React.FC][] = [
  ['open', OpenOut], ['curve', Curve], ['w08', W08], ['w12', W12], ['w19', W19], ['w23', W23], ['lesson', Lesson], ['scen', Scen], ['end', End],
];
// 장 전환 블레이드 (블루) — 겨울 4장 진입·교훈 진입·결론 진입
const BLADES = [SHOTS.w08.from, SHOTS.w12.from, SHOTS.w19.from, SHOTS.w23.from, SHOTS.lesson.from, SHOTS.end.from];

export const Main: React.FC<Props> = ({ bgm }) => (
  <AbsoluteFill style={{ background: C.paper, fontFamily: FONT, wordBreak: 'keep-all', fontFeatureSettings: '"tnum"' }}>
    {SCENES.map(([k, Comp]) => (
      <Sequence key={k} from={SHOTS[k].from} durationInFrames={SHOTS[k].dur} name={k}><Comp /></Sequence>
    ))}
    {BLADES.map((b) => <Blade key={b} at={b} color={C.blue} />)}
    {bgm && <Audio src={staticFile('audio/score.mp3')} volume={(f) => 0.75 * interpolate(f, [0, 6, TOTAL - 30, TOTAL], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />}
    {SFX.map((s, i) => (
      <Sequence key={i} from={s.from} durationInFrames={s.dur ?? Infinity} name={`sfx:${s.note}`} layout="none">
        <Audio src={staticFile(`sfx/${s.src}.mp3`)} volume={s.volume} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
