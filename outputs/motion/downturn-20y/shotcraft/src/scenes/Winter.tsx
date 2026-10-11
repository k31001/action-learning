import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT } from '../theme';
import { cue, INOUT, Lines, Source, tw, Up } from '../lib';
import { WINTERS } from './winterData';
import { Photo } from '../Photo';

// ③ 네 번의 겨울 공통 틀. 장마다 ① 장 카드(연도 + 동사, 내레이터가 연도를 읽는 동안) → ② 아래에서 밀고 올라오는
// 데이터 레이아웃(bottom-push-stack-wipe). 레이아웃 4종은 장마다 다르다(큰 숫자 / 타일 / 3자 대비 / 막대 클로즈업).
// 카메라는 slow push(1→1.02) 하나뿐 — 흔들림 없음(Q3).
export const CARD_HOLD = 26; // 첫 큐 시작 후 카드 유지 프레임
export const ChapterFrame: React.FC<{ k: number; first: string; src: string; photo?: string; children: React.ReactNode }> = ({ k, first, src, photo, children }) => {
  const f = useCurrentFrame();
  const d = WINTERS[k];
  const sw = cue(first) + CARD_HOLD;
  const push = tw(f, [sw, sw + 16], [0, 1], INOUT);
  const zoom = 1 + 0.02 * tw(f, [sw, sw + 300], [0, 1], (t) => t);
  return (
    <AbsoluteFill style={{ background: C.paper, fontFamily: FONT, color: C.ink, overflow: 'hidden' }}>
      {/* ② 데이터 레이아웃 */}
      <div style={{ position: 'absolute', inset: 0, transform: `translateY(${(1 - push) * 100}%)` }}>
        <div style={{ position: 'absolute', inset: 0, transform: `scale(${zoom})` }}>
          <div style={{ position: 'absolute', left: 120, top: 76, display: 'flex', alignItems: 'baseline', gap: 22 }}>
            <span style={{ fontSize: 44, fontWeight: 700, color: C.steel }}>{d.short}</span>
            <span style={{ fontSize: 72, fontWeight: 900, letterSpacing: '-0.04em', color: d.late ? C.red : C.ink }}>{d.verb.join(' ')}</span>
          </div>
          <div style={{ position: 'absolute', right: 120, top: 104, display: 'flex', gap: 10, alignItems: 'center' }}>
            {[0, 1, 2, 3].map((i) => <div key={i} style={{ width: i === k ? 56 : 28, height: 8, borderRadius: 4, background: i === k ? C.blue : C.frost }} />)}
          </div>
          {children}
        </div>
        <Source at={sw + 10}>{src}</Source>
      </div>
      {/* ① 장 카드 */}
      <div style={{ position: 'absolute', inset: 0, background: C.paper, transform: `translateY(${-push * 100}%)` }}>
        {photo && <Photo name={photo} to={sw + 16} scale={[1.12, 1.04]} fade="linear-gradient(90deg, rgba(255,255,255,.96) 0%, rgba(255,255,255,.88) 45%, rgba(255,255,255,.35) 100%)" />}
        <Up at={2} style={{ position: 'absolute', left: 160, top: 330, fontSize: 64, fontWeight: 700, color: C.steel, letterSpacing: '-0.02em' }}>{d.yr} · {k + 1}번째 겨울</Up>
        <Lines at={6} stagger={6} lines={d.verb.map((v, i) => (d.late && i === d.verb.length - 1 ? <span style={{ color: C.red }}>{v}</span> : v))}
          style={{ position: 'absolute', left: 150, top: 420, fontSize: 200, fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.02 }} />
      </div>
    </AbsoluteFill>
  );
};
