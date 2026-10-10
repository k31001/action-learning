/* 「네 번의 겨울」 60초 광고 컷 배경음악 — Web Audio 합성 원본.
   빌드: render.mjs가 브라우저에서 renderScore()를 돌려 score.mp3로 굽는다(페이지는 score.mp3만 재생).
   120BPM(1박 0.5초) · D단조. 모든 시각은 index.html 타임라인의 초와 같다. */
const SCORE_LEN = 61;
const CHORDS = [
  [0,[50,53,57,62]],                                                          // 표지 Dm
  [3.5,[50,53,57,62]],[5.2,[46,53,58,62]],[6.4,[43,50,55,58]],[7.9,[45,52,57,61]],  // 20년 개관: 저점마다 전조
  [9.1,[46,53,58,62]],[10,[48,55,60,64]],                                     // 2025 반등
  [11,[50,53,57,62]],[16.5,[46,53,58,62]],[22,[43,50,55,58]],[27.5,[45,52,57,61]],  // 복기 4장
  [33,[46,53,58,62]],[35.2,[41,53,57,60]],                                    // 교훈
  [37.5,[38,50,51,57]],                                                       // 다음 다운턴은 어디서
  [40,[50,53,57,62]],[45,[43,50,55,58]],[50,[39,51,55,58]],[53,[45,52,57,61]],  // 수요발 · 공급발 · 전환발
  [55,[38,50,54,57,62]],                                                      // 결론 D장조
];
// 임팩트: [시각, 세기] — 장 전환·저점·주요 사건·헤드라인 카드와 같은 초
const CARD_HITS = [40, 45, 50].flatMap(a => [0, 1, 2].map(j => [a + 1.0 + j * .8, .35]));
const HITS = [[0,.3],[1,.6],[3.5,.7],[5.2,.55],[6.4,.55],[7.9,.6],[9.1,.65],[11,.8],[13.6,.45],[16.5,.75],[17.7,.4],[19.8,.5],[22,.75],[27.5,.8],[29.3,.8],
  [33,.85],[37.5,.95],[40,.8],[45,.8],[50,.85],[55,1.1], ...CARD_HITS];
const RISERS = [[2.3,3.5,.5],[9.6,11,.8],[31.6,33,.9],[38.6,40,.9],[53.6,55,1]];

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
  const ir = ctx.createBuffer(2, Math.floor(sr * 2.8), sr);
  for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < d.length; i++) d[i] = (rand() * 2 - 1) * Math.pow(1 - i / d.length, 3.2); }

  const master = ctx.createGain(); ramp(master.gain, [[0,.9],[58.8,.9],[60.6,0]]);
  const arc = ctx.createGain(); // 장면별 다이내믹 곡선
  ramp(arc.gain, [[0,.55],[3.4,.6],[3.5,.75],[10.9,.82],[11,.9],[27.5,1],[32.9,1],[33.1,.65],[37.4,.7],[37.6,.62],[39.9,.75],[40,.92],[61,1]]);
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -12; comp.ratio.value = 3; comp.attack.value = .004; comp.release.value = .2;
  master.connect(arc); arc.connect(comp); comp.connect(ctx.destination);
  const rev = ctx.createConvolver(); rev.buffer = ir; rev.connect(master);
  const bus = (wet, lvl = 1) => { const g = ctx.createGain(); g.gain.value = lvl; g.connect(master); const s = ctx.createGain(); s.gain.value = wet; g.connect(s); s.connect(rev); return g; };
  const noiseSrc = (t, dur) => { const s = ctx.createBufferSource(); s.buffer = noise; s.start(t, rand() * 1.5, dur); return s; };
  const every = (a, b, step, fn) => { for (let t = a, k = 0; t < b - 1e-6; t += step, k++) fn(t, k); };

  /* 드론 */
  const droneF = ctx.createBiquadFilter(); droneF.type = 'lowpass'; droneF.Q.value = 2;
  ramp(droneF.frequency, [[0,220],[1.5,500],[3.5,320],[11,520],[33,300],[35.2,420],[37.5,260],[50,700],[55,1200],[61,500]]);
  const droneG = ctx.createGain(); ramp(droneG.gain, [[0,0],[1,.24],[59,.24],[61,0]]);
  droneF.connect(droneG); droneG.connect(bus(.25));
  [[38,-6,'sawtooth',.5],[38,6,'sawtooth',.5],[45,0,'sawtooth',.3],[26,0,'sine',.45]].forEach(([m, cents, type, g]) => {
    const o = ctx.createOscillator(); o.type = type; o.frequency.value = mtof(m); o.detune.value = cents;
    const gg = ctx.createGain(); gg.gain.value = g; o.connect(gg); gg.connect(droneF); o.start(0); o.stop(SCORE_LEN);
  });
  { const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = mtof(39); // 불협 Eb: 겨울·질문 구간
    const g = ctx.createGain(); ramp(g.gain, [[0,0],[37.4,0],[37.7,.22],[39.8,.22],[40,0],[49.9,0],[50.3,.22],[54.8,.22],[55,0]]);
    o.connect(g); g.connect(droneF); o.start(0); o.stop(SCORE_LEN); }

  /* 현악 패드 */
  const padLvl = t => t < 3.5 ? .8 : t < 33 ? 1 : t < 40 ? .9 : t < 55 ? .95 : 1.4;
  CHORDS.forEach(([t0, notes], i) => {
    const t1 = i + 1 < CHORDS.length ? CHORDS[i + 1][0] : SCORE_LEN;
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = t0 >= 55 ? 2600 : t0 >= 33 && t0 < 37.5 ? 1800 : 1100; f.Q.value = .7;
    const g = ctx.createGain(); const lv = .05 * padLvl(t0) * 4 / notes.length, a = Math.max(0, t0 - .05);
    g.gain.setValueAtTime(0, a); g.gain.linearRampToValueAtTime(lv, t0 + (t0 >= 55 ? 1.4 : .5)); g.gain.setValueAtTime(lv, Math.max(t0 + .6, t1 - .05)); g.gain.linearRampToValueAtTime(0, t1 + .8);
    f.connect(g); g.connect(bus(.5));
    notes.forEach(m => [-8, 8].forEach(dc => { const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = mtof(m); o.detune.value = dc; o.connect(f); o.start(a); o.stop(t1 + .9); }));
  });

  /* 오스티나토 (8분음 0.25초) */
  const STEP = .25, PAT = [0, 0, 12, 0, 0, 7, 0, 10], ACC = [1, .55, .85, .55, .95, .7, .55, .75];
  const ostBus = bus(.16);
  const pluck = (t, m, lvl, cut) => {
    const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = mtof(m);
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.Q.value = 7;
    f.frequency.setValueAtTime(cut * 2.4, t); f.frequency.exponentialRampToValueAtTime(cut * .35, t + .15);
    const g = ctx.createGain(); g.gain.setValueAtTime(.0001, t); g.gain.linearRampToValueAtTime(lvl, t + .005); g.gain.exponentialRampToValueAtTime(.0001, t + .22);
    o.connect(f); f.connect(g); g.connect(ostBus); o.start(t); o.stop(t + .25);
  };
  [[3.5,11,.75,700,1400,0],[11,32.9,1,1100,1700,0],[27.5,32.9,.5,1500,2200,12],[40,54.9,.85,1000,2400,0],[50,54.9,.45,1800,2800,12],[33,37.4,.35,700,1300,0]].forEach(([a, b, lvl, c0, c1, oct]) =>
    every(a, b, STEP, (t, k) => {
      let r = chordAt(t)[0]; while (r > 50) r -= 12; while (r < 38) r += 12;
      pluck(t, r + PAT[k % 8] + oct, .16 * lvl * ACC[k % 8], c0 + (c1 - c0) * (t - a) / (b - a));
    }));

  /* 킥 · 하이햇 · 시계 */
  const kickBus = bus(.06);
  const kick = (t, g) => {
    const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(45, t + .1);
    const gg = ctx.createGain(); gg.gain.setValueAtTime(.0001, t); gg.gain.linearRampToValueAtTime(g, t + .004); gg.gain.exponentialRampToValueAtTime(.0001, t + .4);
    o.connect(gg); gg.connect(kickBus); o.start(t); o.stop(t + .45);
  };
  every(3.5, 10.9, .5, t => kick(t, .7));
  every(11, 32.9, .5, (t, k) => { kick(t, .85); if (k % 4 === 3) kick(t + .25, .45); });
  every(35.5, 37.4, 1, t => kick(t, .45));
  every(40, 54.9, .5, (t, k) => { kick(t, .88); if (k % 4 === 3) kick(t + .25, .4); });
  const hatBus = bus(.08);
  const hat = (t, g) => {
    const s = noiseSrc(t, .05); const f = ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 7500;
    const gg = ctx.createGain(); gg.gain.setValueAtTime(g, t); gg.gain.exponentialRampToValueAtTime(.0001, t + .04);
    s.connect(f); f.connect(gg); gg.connect(hatBus);
  };
  every(3.5, 10.9, .25, (t, k) => hat(t, k % 2 ? .02 : .035));
  every(11, 32.9, .125, (t, k) => hat(t, k % 4 === 2 ? .06 : k % 2 ? .02 : .035));
  every(40, 54.9, .125, (t, k) => hat(t, k % 4 === 2 ? .06 : .028));
  const clickBus = bus(.3);
  const tick = (t, k) => {
    const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = k % 2 ? 1650 : 2200;
    const g = ctx.createGain(); g.gain.setValueAtTime(.0001, t); g.gain.linearRampToValueAtTime(.07, t + .002); g.gain.exponentialRampToValueAtTime(.0001, t + .03);
    o.connect(g); g.connect(clickBus); o.start(t); o.stop(t + .05);
  };
  every(37.5, 39.9, .5, tick);
  every(40, 54.9, .25, (t, k) => { // 뉴스 텔레타이프
    const o = ctx.createOscillator(); o.type = 'square'; o.frequency.value = k % 3 ? 2600 : 3100;
    const g = ctx.createGain(); g.gain.setValueAtTime(.0001, t); g.gain.linearRampToValueAtTime(.018, t + .002); g.gain.exponentialRampToValueAtTime(.0001, t + .02);
    o.connect(g); g.connect(clickBus); o.start(t); o.stop(t + .03);
  });

  /* 라이저 · 임팩트 · 종 */
  const fxBus = bus(.45);
  const riser = (a, b, lvl) => {
    const s = noiseSrc(a, b - a + .1); const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 3;
    f.frequency.setValueAtTime(300, a); f.frequency.exponentialRampToValueAtTime(7500, b);
    const g = ctx.createGain(); g.gain.setValueAtTime(.0001, a); g.gain.exponentialRampToValueAtTime(.24 * lvl, b - .03); g.gain.linearRampToValueAtTime(0, b);
    s.connect(f); f.connect(g); g.connect(fxBus);
    const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(110, a); o.frequency.exponentialRampToValueAtTime(880, b);
    const og = ctx.createGain(); og.gain.setValueAtTime(.0001, a); og.gain.exponentialRampToValueAtTime(.05 * lvl, b - .03); og.gain.linearRampToValueAtTime(0, b);
    o.connect(og); og.connect(fxBus); o.start(a); o.stop(b + .05);
  };
  const hitBus = bus(.55);
  const hit = (t, lvl) => {
    const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(95, t); o.frequency.exponentialRampToValueAtTime(30, t + .7);
    const g = ctx.createGain(); g.gain.setValueAtTime(.0001, t); g.gain.linearRampToValueAtTime(.95 * lvl, t + .005); g.gain.exponentialRampToValueAtTime(.0001, t + 2.2);
    o.connect(g); g.connect(hitBus); o.start(t); o.stop(t + 2.3);
    const s = noiseSrc(t, .9); const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.setValueAtTime(2200, t); f.frequency.exponentialRampToValueAtTime(200, t + .6);
    const ng = ctx.createGain(); ng.gain.setValueAtTime(.38 * lvl, t); ng.gain.exponentialRampToValueAtTime(.0001, t + .7);
    s.connect(f); f.connect(ng); ng.connect(hitBus);
    let r = chordAt(t + .01)[0]; while (r > 38) r -= 12;
    const sf = ctx.createBiquadFilter(); sf.type = 'lowpass'; sf.frequency.setValueAtTime(1000, t); sf.frequency.exponentialRampToValueAtTime(160, t + 1.4);
    const sg = ctx.createGain(); sg.gain.setValueAtTime(.0001, t); sg.gain.linearRampToValueAtTime(.13 * lvl, t + .01); sg.gain.exponentialRampToValueAtTime(.0001, t + 1.9);
    sf.connect(sg); sg.connect(hitBus);
    [r, r + 12, r + 19].forEach(m => { const so = ctx.createOscillator(); so.type = 'sawtooth'; so.frequency.value = mtof(m); so.connect(sf); so.start(t); so.stop(t + 2); });
  };
  const bells = (t, notes, lvl = .045) => notes.forEach((m, i) => {
    const a = t + i * .25, o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = mtof(m);
    const g = ctx.createGain(); g.gain.setValueAtTime(.0001, a); g.gain.linearRampToValueAtTime(lvl, a + .01); g.gain.exponentialRampToValueAtTime(.0001, a + 3.5);
    o.connect(g); g.connect(bus(.8)); o.start(a); o.stop(a + 3.6);
  });
  RISERS.forEach(([a, b, l]) => riser(a, b, l));
  HITS.forEach(([t, l]) => hit(t, l));
  bells(.1, [74, 81, 86]); bells(35.2, [70, 74, 77, 82], .04); bells(55.2, [74, 78, 81, 86], .05);

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
