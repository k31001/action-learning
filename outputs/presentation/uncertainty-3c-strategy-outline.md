---
type: presentation-outline
status: v1.2 시안 3종 (2026-10-13, 전략 1 = 하이브리드 본딩 단면 SEM · 전략 2 = 삼성 zHBM 전시 사진, 사용자 선택 대기). v1.1 전략 1 본딩 모형 사진 · 전략 2 3D DRAM 렌더. v1.0 같은 한 장을 세 가지 시각 언어로 만든 선택용 덱
deck: outputs/presentation/uncertainty-3c-strategy-options.pptx (시안 A · B · C 3장, PPTX 본체 커밋 · 생성기로 재현)
generator: outputs/presentation/scripts/generate_uncertainty_3c_pptx.py
design: .claude/skills/samsung-memory-ppt-design-skill (v2.2: 11절 시각 우선, 20 × 11.25in, 본문 18pt 이상 · 출처 15pt, 액센트 Samsung Blue #3C4FA5 하나)
---

# 불확실성에 대응하는 전체 최적화 체계: 3-C 전략 한 장 (시안 3종)

## Deck Read · 다이얼

- **Deck Read**: 과제 · 액션러닝 보고의 첫 장(전략 체계 개관), 청중은 사업부 경영진, 1장 3~5분, 결론 우선 · 시각 우선 언어로 읽었다.
- **다이얼** `DATA_DENSITY 4 / FORMALITY 7 / VISUAL_EXPRESSION 6` (1.A 과제 · 액션러닝 프리셋).
- 문서 등급은 받지 않아 `[문서등급 표기]` 플레이스홀더.

## 글 (세 시안 공통)

| 자리 | 문구 |
|---|---|
| 제목 | 불확실성에 대응하는 전체 최적화 체계 (사용자 지정) |
| 리드 한 줄 | 수요 예측만으로는 부족합니다. 자원 · 기술 · 고객을 하나의 체계로 묶는 **3-C 전략**으로 대응합니다 |
| 결론 밴드 | 자원은 유연하게 전환하고, 기술은 연속성 있게 쌓고, 미래는 고객과 함께 설계합니다 |

## 내용 매트릭스 (행 = 전략, 열 = 3-C)

| | C1 Convertibility · 자원의 유연한 전환 | C2 Continuity · 연속성 있는 기술 축적 | C3 Co-Creation · 고객과 함께 미래를 설계 |
|---|---|---|---|
| **전략 1** Bonding 기반 DRAM · NAND 통합 제조 | 제조라인 공용화: 수요에 따라 DRAM ↔ NAND 전환 | Legacy Cell 자산화: 검증된 DRAM Cell 기술을 그대로 활용 | Peripherals 맞춤 제공: Cell은 공통, Peri는 고객별 맞춤 |
| **전략 2** 고객 맞춤형 차세대 메모리 개발 | 로직 IP 역량 전환: 설계 역량 · 자원을 메모리 로직 IP로 | 검증된 품질 · 적기 공급: 양산으로 검증된 품질을 제때 공급 | Custom Logic 협업: 가속기별 로직을 고객과 함께 설계 |
| **전략 3** 고객 시스템을 고려한 스토리지 개발 | 기술 변화 조기 센싱: 고객과 먼저 감지하고 차세대 수요를 함께 설계 | 시스템 지식 확장: 워크로드 연구로 NAND · SSD에서 서버까지 | SSD · 서버 공동 설계: AI 수요에 맞춰 기능과 구조를 함께 설계 |

아이콘(Tabler, 단색 라인): C1 `arrows-exchange` · C2 `stack-push` · C3 `heart-handshake`, 전략 1 `layers-linked` · 2 `stack-2` · 3 `server`, 칸 9개 `building-factory-2` · `recycle` · `adjustments-horizontal` · `cpu-2` · `shield-check` · `puzzle` · `radar` · `sitemap` · `pencil-cog`.

## 시안별 시각 설계

| 시안 | 레이아웃 | 핵심 시각 | 어울리는 경우 |
|---|---|---|---|
| **A 도해형 매트릭스** | 왼쪽 전략 열(번호 알약 + 이름 + 부품 이미지) + 3-C 열 3개, 칸 = 미니 도해 + 키워드 + 두 줄 설명 | 칸마다 작동 원리 그림: 공용 라인 막대(DRAM ↔ NAND 경계 이동) · Legacy Cell → Bonding 적층 · 공통 Cell + 고객별 Peri A/B/C · 메모리 → 로직 IP · 방패 + 마일스톤 · 가속기별 Base Die가 다른 HBM 3개 · 고객 ↔ 삼성 감지 · NAND → SSD → 서버 계단 · 삼성 · 고객 사람 아이콘과 서버 | 각 전략이 "어떻게" 작동하는지 한 장에서 설명해야 할 때 (가장 설명적) |
| **B 아이콘 키워드형** | 왼쪽 "왜" 패널(4.4in) + 오른쪽 아이콘 카드 매트릭스 | 위: 수요 예측 불확실성 원뿔(개념도, 지금 이후 범위가 넓어짐) → 아래: 자원 · 기술 · 고객 삼각 체계와 가운데 "전체 최적화". 매트릭스 칸 = 아이콘 원 + 키워드 + 두 줄 | "왜 예측만으로 부족한가"를 같이 말하고, 칸은 깔끔하게 키워드로 읽히길 원할 때 (임원용 정돈형) |
| **C 3-C 기둥 구조형** | 지붕(3-C 전체 최적화 체계) · 기둥 머리 3개(C1 · C2 · C3) · 기둥 몸통 · 토대(수요 예측) | 건물 은유: 토대 = 수요 예측(필요하지만 그것만으로는 부족), 세 기둥이 지붕을 받친다. 세 전략은 세 기둥을 가로지르는 들보(파란 띠), 칸 = 아이콘 + 키워드 + 두 줄 | "하나의 체계로 묶는다"를 구조로 각인시키고 싶을 때 (메시지형) |

## 표현상 주의

- **근거 사슬(11.J)**: 전략 체계 개념도라 수치 주장이 없다. 시안 B 원뿔은 데이터가 아니라 "개념도"로 표기했다. 수치를 넣게 되면 출처와 그래프를 함께 붙인다.
- **고객명 미표기(7절)**: 가속기 · 고객은 A · B · C로만 그렸다. 실제 고객사 로고는 보안 검토 뒤 넣는다.
- **해석이 들어간 부분**: C1 "수요에 따라 DRAM ↔ NAND 전환", 시안 A 전략 2 C3 그림(메모리 적층 아래 가속기별 Logic Die = Custom Logic 자리)은 사용자 설명을 그림으로 옮긴 해석이다. 다르면 문구 · 그림을 바꾼다.
- 전략 이미지(v1.2): 전략 1 = **웨이퍼 간 Cu/SiO2 하이브리드 본딩 단면 SEM**(`assets/photos/bonding_sem.jpg`, Hsu 외 Materials 2022 그림 6(b), CC BY 4.0, 연구용 시편). NAND의 CMOS 본딩(Kioxia CBA · YMTC Xtacking · 삼성 Bonding V-NAND)이 쓰는 것과 같은 방식이지만 제품 단면은 아니다(제품 단면 사진은 TechInsights 등 유료 저작물). 전략 2 = **삼성 FMS 2026 zHBM 전시 모형 사진**(`assets/photos/zhbm.jpg`, xPU 위에 Core Die를 바로 쌓는 3D 메모리 구조). 전략 3은 SSD · 서버 3D 렌더 그대로. 출처 · 변경 내역은 `assets/photos/README.md`.
- 시안 A는 전략 1 · 2 사진 아래에 "본딩 계면 SEM" · "삼성 zHBM" 이름(16pt)을 단다. 시안 B도 전략 행 머리를 전략 이미지로 쓴다(세 시안 모두 같은 이미지).

## 재생성

```bash
# 아이콘 (render_parts/ 에서 npm i 후)
node outputs/presentation/scripts/render_parts/render_icons.mjs outputs/presentation/assets/icons blue=#3C4FA5,white=#FFFFFF,gray=#8A8A8A <아이콘 이름...>
# 덱
python3 outputs/presentation/scripts/generate_uncertainty_3c_pptx.py
# 렌더 QA (NanumGothic, PDF · PNG · 글자 크기 · em-dash 감사)
bash .claude/skills/samsung-memory-ppt-design-skill/scripts/qa_render.sh outputs/presentation/scripts/generate_uncertainty_3c_pptx.py <scratch>
```

## 렌더 QA (v1.0)

- `qa_audit.py` PASS: 3장 모두 본문 16pt 이상(도해 라벨 16, 본문 18~24), 출처 15pt, em-dash · en-dash 0.
- 렌더에서 고친 것: 시안 B 원뿔이 납작하게 그려짐(freeform 로컬 좌표 정수 반올림 → EMU로 넘김), 시안 A 좁은 칸 줄바꿈(Peri 타일 글자 하나, 계단 라벨 폭, 설명 짧게), 시안 B · C 설명 의미 단위 수동 줄바꿈, 시안 A 화살표 아이콘 겹침.

## v1.0 → v1.1 변경 (2026-10-13 사용자 지시)

| 지시 | 반영 |
|---|---|
| 전략 1은 반도체 패키지 본딩 기술 관련 사진 | 삼성반도체 FMS 2026 뉴스룸 사진에서 V10 Bonding V-NAND 적층 모형(층 사이 본딩 접점이 보이는 실물 모형)을 잘라 `assets/photos/bonding.jpg`. 세 시안의 전략 1 이미지(이전 DRAM 모듈 + NAND 칩 렌더)를 교체, 사진에는 얇은 테두리 |
| 전략 2는 3D DRAM 사진 | 공개 실물 사진이 없어 3D DRAM 구조를 3D 렌더로 새로 만듦(`dram3d`). 이전 HBM 패키지 렌더를 교체, 출처 줄에 "3D 렌더(개념)" 명시. 시안 A 전략 2 C3 캡션 "Base Die" → "Logic Die" |
| (연동) | 시안 B 전략 행 머리 아이콘 → 전략 이미지, 이름 18pt. 시안 A 이미지 칸 1.28 → 1.50in. 출처 줄 · 발표자 노트에 이미지 설명 추가 |

## v1.1 → v1.2 변경 (2026-10-13 사용자 지시)

| 지시 | 반영 |
|---|---|
| 3D DRAM은 삼성의 zHBM 사진이 더 정확 | 전략 2 이미지를 3D DRAM 렌더 → 삼성 FMS 2026 zHBM 전시 모형 사진으로 교체(`render_dram3d.png` 삭제, 렌더 코드는 `render.html`에 남김) |
| 본딩은 NAND에서 주로 쓰는 본딩 기술의 실사 또는 현미경 화면 | NAND CMOS 본딩과 같은 웨이퍼 간 Cu/SiO2 하이브리드 본딩의 단면 SEM(CC BY 4.0 공개 논문)으로 교체(`bonding.jpg` 삭제). 원 그림 라벨을 지우고 대비를 조정, 출처 줄 · 노트 · README에 저작자 표시 |
| (연동) | 시안 A 사진 아래 이름 16pt, 출처 줄을 "이미지: ..." 한 줄로 정리 |
