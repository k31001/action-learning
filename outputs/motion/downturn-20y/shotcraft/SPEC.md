# 「네 번의 겨울」 — video-shotcraft 컷 설계 스펙

Remotion으로 다시 만든 「네 번의 겨울」 컷이다. 상위 폴더의 GSAP 페이지(`../index.html`)는 v4로 그대로 둔다.
제작 방법은 [video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft)의 **자율 자유 창작** 파이프라인(`references/pipeline.md`)을 따랐다.
샷 카드의 파라미터는 해당 데모 TSX에서 그대로 가져왔다.

## 0. 제작 브리프 · 요구 결정표

| 요구 (사용자) | 실행 결정 |
|---|---|
| 내용은 v3(커밋 a348592) 유지 | 장 구성·문구·수치·로고·가상 헤드라인을 v3 그대로 옮김 (`src/timeline.ts`) |
| 수치 근거 = wiki/downturn/downturn-history.md · scenario-matrix.md · sources/articles/dt-*-signals-2026-08-28.md | 수치를 출처와 대조함. 분기 DRAM 매출은 sources/raw-notes/memory-downturn-history-research-2026-08-22.md. 장마다 출처 줄 표기 |
| 화이트 + 삼성 블루 단일 액센트 | `src/theme.ts` 토큰을 v3/v4에서 이어받음. 적색은 낙폭·적자·파산에만 쓰고(v3/v4와 같은 규칙), 경쟁사 로고는 그레이스케일 |
| TV 광고 같은 시네마틱 | 카메라 언어: 단일 주인공 오프닝, 곡선 머리 추적 줌·풀백, 장 전체 slow push, 블레이드 와이프, 전화면 충격 3회 |
| 60초 안팎 | 1890f = 63.0s @30fps |
| 효과음·배경음악 | BGM은 `scripts/score.js` 합성곡(120BPM, 장 경계가 박 격자에 맞음). SFX는 shotcraft 라이브러리에서 출처가 확인된 Mixkit 음원 26종을 핀 표에 고정(`public/sfx/ATTRIBUTION.md`) |
| 1080p MP4 | `out/four-winters.mp4` (H.264 + AAC). BGM을 뺀 판은 `out/four-winters-nobgm.mp4`. 둘 다 미커밋 (`.gitignore`) |

데이터 안전: 공개 집계·공시 수치만 쓴다. 시나리오 헤드라인 9건은 카드마다 「가상 헤드라인」 태그를 달고, 각주에 「실제 보도 아님」을 적는다.

## 1. 시각 방향 · 토큰

- 색: paper `#fff` · ink `#0b1020` · **blue `#1428a0`** · frost `#dfe4ee` · steel `#7d879f` · red `#e3342f`(낙폭 한정)
- 서체: Noto Sans KR 500/700/900. 가상 헤드라인만 Noto Serif KR 900을 써서 신문 질감을 낸다. `scripts/fetch-fonts.mjs`가 원고 글자만 담은 woff2 서브셋을 만든다
- 동효 성격: 「专业信赖」 프리셋에서 에너지를 한 단계 낮춘 다큐형. 주 입장은 21f expo.out 라인 마스크 리빌, 오버슈트는 카드 낙하와 타일에만
- 스타일프레임은 생략했다. 이유: v3/v4가 이미 승인된 룩(토큰·레이아웃)이라 정지 화면 방향 검증이 끝나 있다
- 메타포: 웨이퍼 다이가 겨울에 얼어붙고(블루 → frost), 8%의 씨앗 다이만 살아남아 결론에서 다시 블루로 번진다

## 2. 기능(정보) → 샷 카드 매핑

| 정보 | 카드 · 변형 | 데모 소스 | 적용 |
|---|---|---|---|
| 표지 웨이퍼 | data/avatar-grid-radial-build-colorize | AvatarGridRadialBuildColorize.tsx | 링 단위 생장(4f/링, opacity+scale .8→1, 이동 없음), 2막의 「일부 착색」을 결빙으로 뒤집음 |
| 20년 곡선 | data/timeline-travel | TimelineTravel.tsx | 느린 출발 → 질주 → 급정지 카메라를 곡선 머리 추적(1.45x)으로 바꾸고, 끝에서 풀백해 전체를 공개 |
| 2008 현물가 | data/odometer-digit-roll | OdometerDigitRoll.tsx | 0.85행/f, 자리별 7f 엇갈림, 16f 감속 + 반 칸 오버슈트 + 6f 복귀, 잔상 2장 |
| 2012 6강 → 3강 | transition/mosaic-reframe | — | 타일 재배열(흡수·탈락·한 줄 재정렬) |
| 2019 매출 | data/hatch-depth | — | 사선 자리표시가 늘어난 뒤 실색 + 값 팝 |
| 2023 −62% | camera/crash-zoom-punch | — | 3f 펀치 → 13f expo 복귀 (전화면 충격 2/3) |
| 교훈 | typography/marker-underline-title | MarkerUnderlineTitle.tsx | 10f 좌→우, 변폭·거친 가장자리, 좌저우고 |
| 시나리오 제목 | typography/title-demote-to-label | TitleDemoteToLabel.tsx | blur 리빌 12f → 정지 ≥18f → 20f inOut으로 0.3x 좌상단 라벨 |
| 장 전환 | (자체) 블레이드 와이프 | — | 9f power4.in으로 닫고 11f power4.out으로 연다. 블루(장) / 잉크(레인) |

샷 카드를 쓰지 않은 부분: 낙폭 도장, 점유율 막대, 헤드라인 카드 낙하는 v3 연출을 이식했다.

## 3. 분镜 · 프레임 타임라인 (30fps, 단일 소스 `src/timeline.ts`)

| # | 프레임 | 장면 | 핵심 동효 | 검수 프레임 |
|---|---|---|---|---|
| ① | 0–135 | 표지 「20년, 네 번의 겨울.」 | 웨이퍼 생장 → 왼쪽으로 비킴 → 결빙. 착지 후 정지 ≥30f | 60, 100 |
| ② | 135–405 | 20년 매출 곡선 | 머리 추적 줌. 저점마다 −26·−19·−34·**−45%**(전화면 펀치 1/3), 321f 풀백, 363f 「그리고, 다시 일어섰다.」 | 165, 330, 385 |
| ③ | 405–585 | 2008 버텼다 | 오도미터 $6.80 → $0.50(−93%), 점유율, 키몬다 붕괴, OPM −14% vs −40% | 520, 560 |
| ③ | 585–765 | 2012 남았다 | 6강 → 3강 타일 재배열, 엘피다 파산·SK 인수·마이크론 인수 | 700, 740 |
| ③ | 765–945 | 2019 멈추지 않았다 | 해치 막대 $99.4B → $62.0B(−37.6%), 감산 순서, 44.1% | 880, 920 |
| ③ | 945–1125 | 2023 한 박자 늦었다 | 분기 막대, **−62%** 크래시 줌(2/3), −14.88조, +76.6% | 1030, 1100 |
| ④ | 1125–1260 | 교훈 | 씨앗 격자 + 마커 밑줄, 심은 것 / 놓친 것 | 1240 |
| ⑤ | 1260–1770 | 다음 겨울은 어디서 | 제목 강등 → 발원 3레인(150f씩) 44·48·8%, 가상 헤드라인 카드 낙하, 하단 확률 막대 | 1290, 1440, 1590, 1740 |
| ⑥ | 1770–1890 | 결론 | 웨이퍼 해빙, 「지금, 무엇을 심을 것인가.」 착지(전화면 펀치 3/3) 후 정지 ≥2s | 1860 |

장 경계는 모두 15f(=1박) 배수다.

## 4. 사운드

- BGM `public/audio/score.mp3` ← `node scripts/render-score.mjs`. 원곡 `../score.js`를 이 타임라인에 맞춰 재배치했다(D단조 → 결론 D장조). 타격음과 라이저는 SFX가 맡으므로 합성곡에서 뺐다. `bgm` inputProp(기본 true)으로 BGM을 끈 판을 같은 타임라인에서 렌더한다
- SFX 핀 표 `src/sfx.ts`: 모든 from은 SHOTS 기준 상대식이다. 공격 피크가 있는 음원은 피크 지연을 재서(ffmpeg + numpy) `from = 타격 프레임 − 피크 지연 − 1f(AAC priming)`로 맞췄다
- 가벼운 음원(clock-tick/knob, 피크 −14dB)은 볼륨 1.2–1.4로 키웠다. 5초 넘는 음원(light-aura·sparkle·air-woosh-deep)에는 durationInFrames를 명시했다
- 문형: 빌드인(impact-cine-big 앞 2초의 역방향 휘슬) → 임팩트(결론 착지, 최대 음량) → shimmer 여운

## 5. 심미 준칙에서 의도적으로 벗어난 곳

- **Q11** 출처 각주는 24px로 3% 기준보다 작다. 장식 각주(「텍스처」 상태)로 분류했다. 읽혀야 할 문구는 모두 32px 이상이다
- **S1** BGM은 tech-house가 아니라 다큐형 합성 스코어다. 이 필름은 제품 홍보가 아니라 복기·성찰 내러티브여서, 사용자가 요청한 「TV 광고 같은 시네마틱」 톤에 맞췄다
- **R4** 전화면 충격은 3회(−45%, −62%, 결론)로 제한했다. v3에 있던 화면 흔들림(shake)은 Q3에 따라 모두 없앴다

## 6. 빌드

```bash
cd outputs/motion/downturn-20y/shotcraft
npm ci
node scripts/fetch-fonts.mjs          # 문구를 바꿨을 때만
node scripts/render-score.mjs         # score.js 를 바꿨을 때만
npx remotion render src/index.ts FourWinters out/four-winters.mp4
echo '{"bgm":false}' > out/props-nobgm.json && npx remotion render src/index.ts FourWinters out/four-winters-nobgm.mp4 --props=out/props-nobgm.json
node scripts/qa-stills.mjs <태그> <프레임...>   # 정지 프레임 검수 → out/qa/
```

브라우저는 `remotion.config.ts`가 Playwright에 동봉된 headless shell(`/opt/pw-browsers/...`)을 자동으로 쓴다. 다른 경로는 `REMOTION_BROWSER`로 지정한다.
