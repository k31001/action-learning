/* 「네 번의 겨울」 배경음악 스코어 — Web Audio 합성 원본.
   빌드: render.mjs가 브라우저에서 renderScore()를 돌려 score.wav → score.mp3로 굽는다(페이지는 score.mp3만 재생). */
/* ───────── 사운드: Web Audio 합성 스코어 (타임라인과 같은 초 단위) ─────────
   D단조 · 96BPM 8분음 오스티나토 + 드론 + 현악 패드 + 장 전환 라이저/임팩트.
   OfflineAudioContext로 한 번 렌더해 버퍼로 재생하므로 화면과 같은 위치에서 시작·탐색된다. */
const WIPES = [22.6, 36.8, 51.0, 65.2, 79.8, 99.0];
const CHORDS = [
  [0,[50,53,57,62]],[15.5,[46,53,58,62]],
  [22.6,[43,50,55,58]],[30,[45,52,57,61]],
  [36.8,[38,50,53,57]],[44,[46,53,58,62]],
  [51,[43,50,55,58]],[58,[39,51,55,58]],
  [65.2,[38,50,53,57]],[70,[46,53,58,62]],[75,[45,52,57,61]],
  [80.4,[41,53,57,60]],[85.2,[48,52,55,60]],[90.2,[38,50,53,57]],[95,[46,53,58,62]],
  [99.6,[43,50,55,58]],[104.8,[39,51,55,58]],[110,[45,52,57,61]],
  [116,[38,50,51,57]],[132.4,[38,50,54,57,62]],
];
const SCORE_LEN = 143;
function chordAt(t) { let c = CHORDS[0][1]; for (const [a, n] of CHORDS) if (t >= a) c = n; return c; }
const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
function mulberry(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

async function renderScore() {
  const sr = 44100;
  const ctx = new OfflineAudioContext(2, Math.ceil(sr * SCORE_LEN), sr);
  const rand = mulberry(2026);
  const ramp = (p, pts) => { p.setValueAtTime(pts[0][1], pts[0][0]); for (let i = 1; i < pts.length; i++) p.linearRampToValueAtTime(pts[i][1], pts[i][0]); };
  const noise = ctx.createBuffer(1, sr * 2, sr);
  { const d = noise.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = rand() * 2 - 1; }
  const ir = ctx.createBuffer(2, Math.floor(sr * 3.4), sr);
  for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < d.length; i++) d[i] = (rand() * 2 - 1) * Math.pow(1 - i / d.length, 3.4); }

  const master = ctx.createGain();
  master.gain.setValueAtTime(.9, 0); master.gain.setValueAtTime(.9, 139.8); master.gain.linearRampToValueAtTime(0, 142.4);
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -12; comp.ratio.value = 3; comp.attack.value = .004; comp.release.value = .22;
  const arc = ctx.createGain(); // 장별 다이내믹 곡선
  ramp(arc.gain, [[0,.5],[8.4,.62],[22.6,.78],[65.2,.88],[80.2,.95],[80.6,.66],[99.4,.7],[115.8,1],[116.4,.62],[131.8,.62],[133.3,1],[142,1]]);
  master.connect(arc); arc.connect(comp); comp.connect(ctx.destination);
  const rev = ctx.createConvolver(); rev.buffer = ir; rev.connect(master);
  const bus = (wet, lvl = 1) => { const g = ctx.createGain(); g.gain.value = lvl; g.connect(master); const s = ctx.createGain(); s.gain.value = wet; g.connect(s); s.connect(rev); return g; };
  const noiseSrc = (t, dur) => { const s = ctx.createBufferSource(); s.buffer = noise; s.start(t, rand() * 1.5, dur); return s; };

  /* 드론 */
  const droneF = ctx.createBiquadFilter(); droneF.type = 'lowpass'; droneF.Q.value = 2;
  ramp(droneF.frequency, [[0,180],[8,280],[22,420],[66,560],[80,360],[100,420],[114,1100],[116.3,240],[132,280],[134,1300],[142,500]]);
  const droneG = ctx.createGain(); ramp(droneG.gain, [[0,0],[3.5,.26],[116,.3],[118,.3],[132,.3],[134,.26],[142,0]]);
  droneF.connect(droneG); droneG.connect(bus(.25));
  [[38,-6,'sawtooth',.5],[38,6,'sawtooth',.5],[45,0,'sawtooth',.3],[26,0,'sine',.45]].forEach(([m, cents, type, g]) => {
    const o = ctx.createOscillator(); o.type = type; o.frequency.value = mtof(m); o.detune.value = cents;
    const gg = ctx.createGain(); gg.gain.value = g; o.connect(gg); gg.connect(droneF); o.start(0); o.stop(SCORE_LEN);
  });
  { // 화두 구간 불협 Eb
    const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = mtof(39);
    const g = ctx.createGain(); ramp(g.gain, [[0,0],[115.5,0],[118,.22],[132,.22],[133.2,0]]);
    o.connect(g); g.connect(droneF); o.start(0); o.stop(SCORE_LEN);
  }

  /* 현악 패드 */
  const padLvl = t => t < 8.4 ? .7 : t < 22.6 ? .8 : t < 80.4 ? 1 : t < 99.6 ? .85 : t < 116 ? 1 : t < 132.4 ? .75 : 1.35;
  CHORDS.forEach(([t0, notes], i) => {
    const t1 = i + 1 < CHORDS.length ? CHORDS[i + 1][0] : SCORE_LEN;
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = t0 >= 132 ? 2400 : 1000; f.Q.value = .7;
    const g = ctx.createGain(); const lv = .05 * padLvl(t0) * 4 / notes.length;
    const a = Math.max(0, t0 - .2);
    g.gain.setValueAtTime(0, a); g.gain.linearRampToValueAtTime(lv, t0 + (t0 >= 132 ? 2.5 : 1.2)); g.gain.setValueAtTime(lv, Math.max(t0 + 1.3, t1 - .1)); g.gain.linearRampToValueAtTime(0, t1 + 1.4);
    f.connect(g); g.connect(bus(.55));
    notes.forEach(m => [-8, 8].forEach(dc => {
      const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = mtof(m); o.detune.value = dc;
      o.connect(f); o.start(a); o.stop(t1 + 1.5);
    }));
  });

  /* 오스티나토 (8분음) */
  const STEP = 60 / 96 / 2;
  const PAT = [0, 0, 12, 0, 0, 0, 7, 0], ACC = [1, .55, .8, .55, .95, .55, .8, .65];
  const ostBus = bus(.18);
  const pluck = (t, m, lvl, cut) => {
    const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = mtof(m);
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.Q.value = 6;
    f.frequency.setValueAtTime(cut * 2.4, t); f.frequency.exponentialRampToValueAtTime(cut * .35, t + .18);
    const g = ctx.createGain(); g.gain.setValueAtTime(.0001, t); g.gain.linearRampToValueAtTime(lvl, t + .006); g.gain.exponentialRampToValueAtTime(.0001, t + .27);
    o.connect(f); f.connect(g); g.connect(ostBus); o.start(t); o.stop(t + .3);
  };
  const OST = [[8.4,22.6,.45,500,1200,0],[23.2,80.2,1,1000,1500,0],[65.8,80.2,.5,1400,1800,12],[80.4,99.4,.4,650,650,0],[99.6,115.8,.9,800,2600,0],[108,115.8,.5,1600,2800,12]];
  OST.forEach(([a, b, lvl, c0, c1, oct]) => {
    for (let t = a, k = 0; t < b; t += STEP, k++) {
      let r = chordAt(t)[0]; while (r > 50) r -= 12; while (r < 38) r += 12;
      const s = k % 8, cut = c0 + (c1 - c0) * (t - a) / (b - a);
      pluck(t, r + PAT[s] + oct, .15 * lvl * ACC[s], cut);
    }
  });

  /* 킥 · 하이햇 · 시계 */
  const kickBus = bus(.08);
  const kick = (t, g) => {
    const o = ctx.createOscillator(); o.type = 'sine';
    o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(44, t + .11);
    const gg = ctx.createGain(); gg.gain.setValueAtTime(.0001, t); gg.gain.linearRampToValueAtTime(g, t + .004); gg.gain.exponentialRampToValueAtTime(.0001, t + .45);
    o.connect(gg); gg.connect(kickBus); o.start(t); o.stop(t + .5);
  };
  const every = (a, b, step, fn) => { for (let t = a, k = 0; t < b; t += step, k++) fn(t, k); };
  every(8.4, 22.4, 2.5, t => kick(t, .5));
  every(23.2, 80.2, 1.25, (t, k) => { kick(t, .85); if (k % 2) kick(t + .9375, .4); });
  every(80.4, 99.4, 2.5, t => kick(t, .55));
  every(99.6, 110, 1.25, t => kick(t, .85));
  every(110, 115.8, .625, t => kick(t, .9));
  every(117, 131.8, 1.6, t => { kick(t, .6); kick(t + .24, .38); });
  const hatBus = bus(.1);
  const hat = (t, g) => {
    const s = noiseSrc(t, .06); const f = ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 7200;
    const gg = ctx.createGain(); gg.gain.setValueAtTime(g, t); gg.gain.exponentialRampToValueAtTime(.0001, t + .045);
    s.connect(f); f.connect(gg); gg.connect(hatBus);
  };
  every(8.4, 22.4, STEP, (t, k) => hat(t, k % 2 ? .012 : .022));
  every(23.2, 80.2, STEP / 2, (t, k) => hat(t, k % 4 === 2 ? .06 : k % 2 ? .02 : .035));
  every(80.4, 99.4, STEP, (t, k) => hat(t, .014));
  every(99.6, 115.8, STEP / 2, (t, k) => hat(t, (k % 4 === 2 ? .06 : .028) * (1 + (t - 99.6) / 16)));
  const clickBus = bus(.3);
  every(116.4, 132, 1, (t, k) => {
    const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = k % 2 ? 1650 : 2200;
    const g = ctx.createGain(); g.gain.setValueAtTime(.0001, t); g.gain.linearRampToValueAtTime(.07, t + .002); g.gain.exponentialRampToValueAtTime(.0001, t + .03);
    o.connect(g); g.connect(clickBus); o.start(t); o.stop(t + .05);
  });

  /* 라이저 · 임팩트 */
  const fxBus = bus(.45);
  const riser = (a, b, lvl = 1) => {
    const s = noiseSrc(a, b - a + .1); const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 3;
    f.frequency.setValueAtTime(300, a); f.frequency.exponentialRampToValueAtTime(7000, b);
    const g = ctx.createGain(); g.gain.setValueAtTime(.0001, a); g.gain.exponentialRampToValueAtTime(.24 * lvl, b - .04); g.gain.linearRampToValueAtTime(0, b);
    s.connect(f); f.connect(g); g.connect(fxBus);
    const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(110, a); o.frequency.exponentialRampToValueAtTime(880, b);
    const og = ctx.createGain(); og.gain.setValueAtTime(.0001, a); og.gain.exponentialRampToValueAtTime(.05 * lvl, b - .04); og.gain.linearRampToValueAtTime(0, b);
    o.connect(og); og.connect(fxBus); o.start(a); o.stop(b + .05);
  };
  const hitBus = bus(.6);
  const hit = (t, lvl) => {
    const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(92, t); o.frequency.exponentialRampToValueAtTime(30, t + .8);
    const g = ctx.createGain(); g.gain.setValueAtTime(.0001, t); g.gain.linearRampToValueAtTime(.95 * lvl, t + .006); g.gain.exponentialRampToValueAtTime(.0001, t + 2.6);
    o.connect(g); g.connect(hitBus); o.start(t); o.stop(t + 2.7);
    const s = noiseSrc(t, 1); const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.setValueAtTime(1800, t); f.frequency.exponentialRampToValueAtTime(180, t + .7);
    const ng = ctx.createGain(); ng.gain.setValueAtTime(.36 * lvl, t); ng.gain.exponentialRampToValueAtTime(.0001, t + .8);
    s.connect(f); f.connect(ng); ng.connect(hitBus);
    let r = chordAt(t + .01)[0]; while (r > 38) r -= 12;
    const sf = ctx.createBiquadFilter(); sf.type = 'lowpass'; sf.frequency.setValueAtTime(900, t); sf.frequency.exponentialRampToValueAtTime(160, t + 1.6);
    const sg = ctx.createGain(); sg.gain.setValueAtTime(.0001, t); sg.gain.linearRampToValueAtTime(.13 * lvl, t + .01); sg.gain.exponentialRampToValueAtTime(.0001, t + 2.2);
    sf.connect(sg); sg.connect(hitBus);
    [r, r + 12, r + 19].forEach(m => { const so = ctx.createOscillator(); so.type = 'sawtooth'; so.frequency.value = mtof(m); so.connect(sf); so.start(t); so.stop(t + 2.3); });
  };
  const bells = (t, notes, lvl = .04) => notes.forEach((m, i) => {
    const a = t + i * .42, o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = mtof(m);
    const g = ctx.createGain(); g.gain.setValueAtTime(.0001, a); g.gain.linearRampToValueAtTime(lvl, a + .01); g.gain.exponentialRampToValueAtTime(.0001, a + 4);
    o.connect(g); g.connect(bus(.8)); o.start(a); o.stop(a + 4.1);
  });
  riser(6.8, 8.45, .6); hit(8.45, .45);
  hit(1.1, .5); bells(1.3, [74, 81, 86]);
  WIPES.forEach(w => { riser(w - 1.8, w + .55); hit(w + .55, 1); });
  riser(113.6, 116.5, 1.2);
  [116.55, 121.95, 127.35].forEach(t => hit(t, .8));
  riser(131.2, 133.4, .9); hit(133.4, 1.25); bells(133.7, [74, 78, 81, 86], .05);

  const buf = await ctx.startRendering();
  let peak = 0; for (let c = 0; c < 2; c++) { const d = buf.getChannelData(c); for (let i = 0; i < d.length; i++) { const v = Math.abs(d[i]); if (v > peak) peak = v; } }
  const k = peak > 0 ? .89 / peak : 1;
  for (let c = 0; c < 2; c++) { const d = buf.getChannelData(c); for (let i = 0; i < d.length; i++) d[i] *= k; }
  return buf;
}
function wavBase64(buf) {
  const n = buf.length, ch = buf.numberOfChannels, sr = buf.sampleRate, bytes = new ArrayBuffer(44 + n * ch * 2), v = new DataView(bytes);
  const w = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
  w(0, 'RIFF'); v.setUint32(4, 36 + n * ch * 2, true); w(8, 'WAVE'); w(12, 'fmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, ch, true);
  v.setUint32(24, sr, true); v.setUint32(28, sr * ch * 2, true); v.setUint16(32, ch * 2, true); v.setUint16(34, 16, true); w(36, 'data'); v.setUint32(40, n * ch * 2, true);
  const chans = [...Array(ch)].map((_, c) => buf.getChannelData(c));
  for (let i = 0, o = 44; i < n; i++) for (let c = 0; c < ch; c++, o += 2) v.setInt16(o, Math.max(-1, Math.min(1, chans[c][i])) * 32767, true);
  let s = ''; const u = new Uint8Array(bytes); for (let i = 0; i < u.length; i += 32768) s += String.fromCharCode.apply(null, u.subarray(i, i + 32768));
  return btoa(s);
}

window.renderScore = renderScore; window.wavBase64 = wavBase64;
