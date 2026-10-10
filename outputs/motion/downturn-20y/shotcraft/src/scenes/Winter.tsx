import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT } from '../theme';
import { Lines, Source, Tag, tw, Up } from '../lib';
import { WINTERS } from '../timeline';

// ③ 네 번의 겨울 공통 틀 (각 180f): 왼쪽 열 = 연도 → 동사(키네틱 라인 리빌) → 원인 → 대응, 오른쪽 열 = 장별 데이터 연출.
// 카메라는 장 전체에 걸친 slow push(1→1.02, tension-camera-moves) 하나뿐 — 흔들림 없음(Q3).
export const WinterFrame: React.FC<{ k: number; children: React.ReactNode; src: string }> = ({ k, children, src }) => {
  const f = useCurrentFrame();
  const d = WINTERS[k];
  const push = 1 + 0.02 * tw(f, [0, 180], [0, 1], (t) => t);
  return (
    <AbsoluteFill style={{ background: C.paper, fontFamily: FONT, color: C.ink }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${push})`, transformOrigin: '50% 50%' }}>
        {/* 장 번호 — 네 개의 눈금 중 지금 장만 블루 */}
        <Up at={2} dy={0} style={{ position: 'absolute', left: 120, top: 84, display: 'flex', gap: 10, alignItems: 'center' }}>
          {[0, 1, 2, 3].map((i) => <div key={i} style={{ width: i === k ? 56 : 28, height: 8, borderRadius: 4, background: i === k ? C.blue : C.frost }} />)}
          <span style={{ marginLeft: 12, fontSize: 30, fontWeight: 700, color: C.steel }}>{k + 1}번째 겨울</span>
        </Up>
        <div style={{ position: 'absolute', left: 120, top: 150, width: 800, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <Up at={4} style={{ fontSize: 60, fontWeight: 700, color: C.steel, letterSpacing: '-0.02em' }}>{d.yr}</Up>
          <Lines at={10} stagger={6} lines={d.verb.map((v, i) => (d.late && i === 1 ? <span style={{ color: C.red }}>{v}</span> : v))}
            style={{ fontSize: 150, fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1.04 }} />
          <Up at={28} style={{ display: 'flex', gap: 18, alignItems: 'baseline', fontSize: 42, fontWeight: 700, lineHeight: 1.3, marginTop: 12 }}><Tag>원인</Tag><span>{d.why}</span></Up>
          <Up at={62} style={{ display: 'flex', gap: 18, alignItems: 'baseline', fontSize: 42, fontWeight: 700, lineHeight: 1.3 }}><Tag c={C.blue}>대응</Tag><span>{d.how}</span></Up>
        </div>
        {children}
      </div>
      <Source at={12}>{src}</Source>
    </AbsoluteFill>
  );
};
