"""내레이션 합성 — Supertonic 3 (오픈 ONNX TTS, 한국어 지원) 로 src/vo.ts 의 큐를 하나씩 합성한다.
   준비: git clone https://github.com/supertone-inc/supertonic <SUPERTONIC_DIR>
         hf download supertone-oss-archive/supertonic-3 --revision aafc6e32416a594460b32413efc49d7fe4ce6d46 --local-dir <SUPERTONIC_DIR>/assets
   실행: npx tsx -e "import {CUES} from './src/vo.ts'; console.log(JSON.stringify(CUES))" > out/cues.json
         <venv>/bin/python scripts/tts.py out/cues.json --supertonic <SUPERTONIC_DIR> [--voice M1] [--speed 1.0]
   결과: public/vo/<id>.wav (−1 dBFS 피크 정규화, 앞뒤 무음 30ms 이하로 정리) + src/vo-durations.json (초)"""
import argparse, json, os, sys
import numpy as np, soundfile as sf

ap = argparse.ArgumentParser()
ap.add_argument('cues'); ap.add_argument('--supertonic', required=True)
ap.add_argument('--voice', default='M1'); ap.add_argument('--speed', type=float, default=1.0)
ap.add_argument('--steps', type=int, default=16); ap.add_argument('--only', nargs='*')
a = ap.parse_args()
sys.path.insert(0, os.path.join(a.supertonic, 'py'))
from helper import load_text_to_speech, load_voice_style  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out_dir = os.path.join(ROOT, 'public', 'vo'); os.makedirs(out_dir, exist_ok=True)
dur_path = os.path.join(ROOT, 'src', 'vo-durations.json')
durs = json.load(open(dur_path)) if os.path.exists(dur_path) else {}
tts = load_text_to_speech(os.path.join(a.supertonic, 'assets', 'onnx'))
style = load_voice_style([os.path.join(a.supertonic, 'assets', 'voice_styles', f'{a.voice}.json')])
sr = tts.sample_rate
for scene, cues in json.load(open(a.cues)).items():
    for q in cues:
        if a.only and q['id'] not in a.only: continue
        wav, d = tts(q['text'], 'ko', style, a.steps, a.speed)
        w = wav[0, : int(sr * float(np.asarray(d).reshape(-1)[0]))].astype(np.float32)
        thr = 10 ** (-45 / 20) * np.max(np.abs(w))  # 앞뒤 무음 정리
        nz = np.where(np.abs(w) > thr)[0]
        pad = int(0.03 * sr)
        w = w[max(0, nz[0] - pad): min(len(w), nz[-1] + pad)]
        w = w / (np.max(np.abs(w)) + 1e-9) * 10 ** (-1 / 20)
        sf.write(os.path.join(out_dir, f"{q['id']}.wav"), w, sr, subtype='PCM_16')
        durs[q['id']] = round(len(w) / sr, 3)
        print(q['id'], durs[q['id']], q['text'])
json.dump(durs, open(dur_path, 'w'), ensure_ascii=False, indent=1)
print('total speech', round(sum(durs.values()), 1), 's')
