# 「네 번의 겨울」 — video-shotcraft 컷 설계 스펙 (v2: 내레이션판)

이 문서는 Remotion으로 만든 「네 번의 겨울」의 설계 스펙이다. 상위 폴더의 GSAP 페이지(`../index.html`, v4)는 그대로 둔다.
제작은 [video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft)의 자율 자유 창작 파이프라인을 따랐다.

v2는 사용자 피드백 6건을 반영했다.

1. 화면 글자를 반으로 줄였다.
2. 내레이션을 넣었다.
3. 실제 음원을 썼다.
4. 장마다 레이아웃을 다르게 했다.
5. 「봄」 장면을 추가했다.
6. 실사 질감을 더했다.

## 0. 브리프 · 결정표

| 요구 | 실행 결정 |
|---|---|
| 용도 | 사내 발표·임원 보고. 핵심 숫자는 화면에, 맥락은 내레이션에 둔다. 104.5초 |
| 내용 | v3(a348592)의 수치·로고·가상 헤드라인을 유지한다. 2024–25 반등과 HBM 주도권(「봄」)을 추가한다 |
| 수치 근거 | wiki/downturn/downturn-history.md · scenario-matrix.md · sources/articles/dt-*-signals-2026-08-28.md. 분기 DRAM은 memory-downturn-history-research raw-note |
| 시각 | 화이트 + Samsung Blue 단일 액센트. 적색은 낙폭·적자·파산에만 쓰고, 경쟁사 로고는 그레이로 둔다 |
| 결과물 | `out/four-winters.mp4`(BGM판, −16 LUFS) · `out/four-winters-nobgm.mp4`(무BGM판, −18 LUFS). MP4는 미커밋 |

## 1. 내레이션 (2)

- **대본**: `src/vo.ts`. 32개 큐, 약 420음절. 숫자 하나에 한 문장을 원칙으로 하고, 세부 수치는 화면에 맡긴다.
- **합성**: Supertonic 3(Supertone, 오픈 ONNX TTS, 한국어 지원, 모델 라이선스 OpenRAIL-M). 남성 M1 음성, 속도 1.08, 16스텝. 명령은 `scripts/tts.py`. 결과는 `public/vo/<id>.wav`(피크 −1 dBFS)와 `src/vo-durations.json`. 발화 합계는 70.9초다.
- **검증**: faster-whisper(small)로 받아쓰게 해서 전 큐가 대본과 일치하는지 확인했다.
  - 다음 표현은 오인식돼서 귀로 분명하게 들리는 표현으로 바꿨다: 「감산」→「생산을 줄이다」, 「십구.」→「십구 퍼센트.」, 「이듬해」→「일 년 뒤」.
  - 「전환발」은 「전암발」로 인식된다. ㅎ 약화라는 자연스러운 발음이고 화면에 「전환발」이 표기되어 그대로 둔다.
- **타이밍**: 장면 길이는 큐 실측 길이 + 장면별 여백(`timeline.ts` SPEC)으로 계산하고 음악 박에 올림 정렬한다. 화면 이벤트는 큐 시작 프레임에 묶는다(예: 낙폭 도장 = 그 숫자를 읽는 순간). 성완본에서 상호상관으로 재 보면 내레이션 위치 오차는 +1.3f로 일정하다(AAC priming).

## 2. 음악 (3)

- **곡**: 「Masking the Masters」 — Eugenio Mininni (Mixkit Stock Music Free License, https://assets.mixkit.co/music/552/552.mp3). 오케스트라 하이브리드, D단조, 100 BPM.
- **선택 근거**: 후보 13곡을 librosa로 분석했다. 박 격자 잔차가 ±19ms로 가장 작은 축에 들었다. 에너지 곡선은 조용한 도입 → 고조 → 40–66초에 낮은 구간 → 69.7초 마디 첫 박에서 최고조다. 사람이 들어보고 고른 것은 아니다.
- **정렬**: 곡의 69.709초(최고조 첫 박)가 「봄」 장면 첫 프레임에 오도록 음악 시작 위치를 역산했다(`MUSIC_START`, `music.json`의 lift). 모든 장면 경계는 이 박 격자 위에 놓인다.
- **믹스**: 내레이션 구간에서 음악을 −60% 덕킹한다(6f 진입, 14f 복귀). 내레이션 구간의 내레이션 대 음악+효과음 비는 중앙값 7dB다. 숫자 첫 음절에 겹치는 타격음은 낮췄고, 결론 임팩트는 마지막 대사가 끝난 직후로 옮겼다.

## 3. 실사 플레이트 (6)

- `public/photos/*.jpg` 4장. Figma generate_image(gemini-3.1-flash-image, 2026-10-11)로 만든 **AI 생성 이미지**이고, 로고·문자 없는 일반 장면이다. 화면 각주에 「이미지: AI 생성」을 표기했다.
  - 서리 낀 웨이퍼: 표지 콜드 오픈. 같은 자리의 그래픽 웨이퍼로 디졸브한다.
  - 클린룸: 2019 장 카드 배경.
  - HBM 패키지: 봄 장면 후반.
  - 눈 속 새싹: 교훈 장면.
- 하이키 유지를 위해 흰 그라데이션을 덮고, 한 방향 Ken Burns만 쓴다.

## 4. 장면 구성 (1·4·5) — 프레임은 `src/timeline.ts`가 계산

| # | 장면 | 화면의 핵심 숫자 | 연출 |
|---|---|---|---|
| ① | 표지 | 20년, 네 번의 겨울 | 실사 웨이퍼 → 그래픽 웨이퍼 매치 컷, 결빙(avatar-grid-radial-build-colorize) |
| ② | 곡선 | −26 · −19 · −34 · −45% | 곡선 끝을 따라가는 카메라(timeline-travel). 내레이터가 숫자를 읽는 순간 도장을 찍고, −45%는 전화면 펀치(1/3). 2024–25 구간은 비워 둔다 |
| ③ | 2008 버텼다 | $0.50 · −93% | 장 카드 → 레이아웃 A 「큰 숫자」: 점유율 누적 막대 한 줄 + 오도미터. 키몬다 조각이 빈 점선 슬롯이 된다. 4Q08 이익률 한 줄 |
| ③ | 2012 남았다 | 6강 → 3강 | 레이아웃 B 「타일」: 6개 타일이 엘피다 파산 → 흡수·탈락·인수를 거쳐 한 줄 3강이 된다(mosaic-reframe). 사건 문구는 타일 안에 붙는다 |
| ③ | 2019 멈추지 않았다 | 44.1% | 장 카드(클린룸 실사) → 레이아웃 C 「3자 대비」: 감산 ↓ · 감산 ↓ · 무감산 → |
| ③ | 2023 한 박자 늦었다 | −62% · −14.88조 | 레이아웃 D 「막대 클로즈업」: 정점에 붙은 카메라가 붕괴와 함께 풀백하고, −62%에서 크래시 줌(2/3). 재고 +76.6% |
| ⑤ | 봄 | $222Bᵉ · 사상 최대 | 같은 곡선 좌표계로 돌아와 2023→2025 반등을 굵은 블루로 그린다(매치). 이어 HBM 실사와 「HBM 주도권 → SK하이닉스」 |
| ⑥ | 교훈 | 심은 것 / 놓친 것 | 새싹 실사 + 마커 밑줄(marker-underline-title) |
| ⑦ | 다음 겨울 | 44 · 48 · 8% | 제목 강등(title-demote-to-label) → 발원 3레인(가상 헤드라인 카드, 하단 확률 막대) |
| ⑧ | 결론 | 지금, 무엇을 심을 것인가 | 웨이퍼 해빙. 마지막 대사 직후 임팩트(3/3), 2.6초 정지 |

- 장 전환은 블루 블레이드(장)와 잉크 블레이드(레인)로 한다. 겨울 장 내부는 장 카드를 아래에서 밀어 올린다(bottom-push-stack-wipe).
- 카메라 흔들림은 없다(Q3). 전화면 충격은 3회다(R4).

## 5. 의도적 이탈

- **Q11**: 출처 각주가 24px로 작다. 장식 각주로 취급했다.
- **S1**: 강한 박자의 tech-house 대신 시네마틱 오케스트라 곡을 썼다. 복기·성찰 내러티브이고 내레이션이 주인공이기 때문이다.
- **길이**: 104.5초다. 사내 보고용으로 75~90초를 제안했지만, 내레이션 70.9초에 장 카드와 정지 여백을 더해 늘어났다.

## 6. 빌드

```bash
cd outputs/motion/downturn-20y/shotcraft && npm ci
node scripts/fetch-fonts.mjs                                  # 화면 문구를 바꿨을 때
npx tsx -e "import {CUES} from './src/vo.ts'; console.log(JSON.stringify(CUES))" > out/cues.json
<venv>/bin/python scripts/tts.py out/cues.json --supertonic <supertonic 클론> --voice M1 --speed 1.08   # 대본을 바꿨을 때
<venv>/bin/python scripts/beats.py public/audio/masking-the-masters.mp3 --gain 0.55                    # 곡을 바꿨을 때(lift 는 수동 지정)
./scripts/fetch-photos.sh                                     # 사진(이미 커밋됨)
npx remotion render src/index.ts FourWinters out/four-winters.mp4 && node scripts/master.mjs out/four-winters.mp4
npx remotion render src/index.ts FourWinters out/four-winters-nobgm.mp4 --props=out/props-nobgm.json && TARGET_I=-18 node scripts/master.mjs out/four-winters-nobgm.mp4
```

venv에는 librosa · soundfile · onnxruntime · faster-whisper가 필요하다. Supertonic 가중치는 `hf download supertone-oss-archive/supertonic-3 --revision aafc6e3…`로 받는다.
