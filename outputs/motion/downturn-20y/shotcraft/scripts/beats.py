"""음악 박 격자 측정 (shotcraft references/music-beat-sync.md §1) — beat_track 시퀀스를 최소제곱 등간격 직선에 맞춰
   실제 BPM·위상을 구하고, src/music.json 에 {bpm, t0, src, gain} 을 쓴다. 영상은 음악을 t0 만큼 잘라 재생하므로 0초 = 첫 박.
   실행: <venv>/bin/python scripts/beats.py public/audio/<곡>.mp3 [--gain 0.7]"""
import argparse, json, os
import numpy as np, librosa
ap = argparse.ArgumentParser(); ap.add_argument('mp3'); ap.add_argument('--gain', type=float, default=0.7)
a = ap.parse_args()
y, sr = librosa.load(a.mp3, sr=None, mono=True)
tempo, beats = librosa.beat.beat_track(y=y, sr=sr, tightness=400, units='time')
i = np.arange(len(beats)); (T, t0), *_ = np.linalg.lstsq(np.vstack([i, np.ones_like(i)]).T, beats, rcond=None)
res = beats - (t0 + i * T)
while t0 - T >= 0: t0 -= T
print(f'BPM={60/T:.2f} t0={t0:.4f}s 잔차 ±{np.abs(res).max()*1000:.0f}ms (beat_track {float(np.atleast_1d(tempo)[0]):.1f}) 길이 {len(y)/sr:.1f}s')
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
rel = os.path.relpath(os.path.abspath(a.mp3), os.path.join(ROOT, 'public'))
json.dump({'bpm': round(60 / T, 4), 't0': round(float(t0), 4), 'src': rel, 'gain': a.gain}, open(os.path.join(ROOT, 'src', 'music.json'), 'w'), indent=1)
