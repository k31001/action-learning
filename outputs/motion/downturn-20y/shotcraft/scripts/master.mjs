// 렌더 결과의 오디오만 2-pass loudnorm 으로 마스터링(기본 −16 LUFS · TP −1.5 dBTP, TARGET_I 로 변경), 영상 스트림은 복사.
// 무BGM 판은 임팩트 위주라 −16 까지 올리면 피크가 넘친다 → TARGET_I=-19 권장.
//   node scripts/master.mjs out/four-winters.mp4 [out/four-winters-nobgm.mp4 ...]
import { execFileSync } from 'child_process';
import { renameSync } from 'fs';
const I = process.env.TARGET_I ?? '-16';
const TARGET = `I=${I}:TP=-1.5:LRA=11`;
for (const f of process.argv.slice(2)) {
  const err = execFileSync('sh', ['-c', `ffmpeg -hide_banner -i "${f}" -af loudnorm=${TARGET}:print_format=json -f null - 2>&1`]).toString();
  const m = JSON.parse(err.slice(err.lastIndexOf('{'), err.lastIndexOf('}') + 1));
  const af = `loudnorm=${TARGET}:measured_I=${m.input_i}:measured_TP=${m.input_tp}:measured_LRA=${m.input_lra}:measured_thresh=${m.input_thresh}:offset=${m.target_offset}:linear=true`;
  const tmp = f.replace(/\.mp4$/, '.tmp.mp4');
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', f, '-af', af, '-ar', '48000', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', tmp]);
  renameSync(tmp, f);
  console.log(f, 'input', m.input_i, 'LUFS →', I);
}
