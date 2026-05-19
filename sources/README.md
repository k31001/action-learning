# sources/ — 원본 (불변)

이 디렉토리는 위키가 인용하는 **외부 1차 자료**를 보관한다. LLM은 여기서 읽기만 하고, 절대 수정·요약하지 않는다.

`wiki/` 페이지에 등장하는 모든 수치·주장은 결국 외부 자료(기업 IR, 시장조사 리포트, 공식 발표, 논문, 정부 문서, 회의록 등)에서 온다. 그 자료들의 원본 또는 클리핑은 다음 하위 디렉토리에 보관한다.

## 하위 디렉토리

| 디렉토리 | 용도 |
|---|---|
| `sources/articles/` | 웹 기사·블로그·뉴스 (Obsidian Web Clipper 산출물, .md 변환본) |
| `sources/filings/` | 실적발표·IR 자료·공시 (PDF 또는 .md 변환본) |
| `sources/papers/` | 학술 논문·백서·시장조사 보고서 |
| `sources/raw-notes/` | 회의록·인터뷰·관찰 노트 |

> 마이그레이션 직후라 위 하위 디렉토리는 아직 비어 있다. 새 자료가 들어올 때마다 ingest 워크플로우(CLAUDE.md §3)에 따라 채워진다.

## 외부 출처 카탈로그

현재 위키가 인용 중인 주요 외부 출처. 자료 자체는 외부 URL/PDF로 존재하며, 위키 페이지가 본문 안에서 출처 라인으로 참조한다.

### 시장조사·시장 데이터
- **TrendForce** — DRAM·NAND·HBM 시장 가격·점유율 (대부분 wiki/concepts/* 인용)
- **Yole Group** — HBM 시장 규모·전망, DRAM/HBM 비중 (wiki/concepts/hbm-market.md, memory-market-overview.md)
- **Counterpoint Research** — HBM 점유율 (wiki/concepts/dram-market-share.md, hbm-market.md)
- **Bank of America** — HBM 2026/2028 전망 (wiki/concepts/hbm-market.md, ai-capex.md)
- **Gartner / IDC / Mordor Intelligence / Precedence Research** — 시장 규모·CAGR
- **Astute Group / Futurum Group / NAND Research** — 점유율·세그먼트 분석

### 기업 IR·공시
- **Samsung Semiconductor / Samsung Electronics IR** — 매출·캐파·HBM 진행 (wiki/concepts/2026-q1-current-state.md, wiki/strategies/*)
- **SK하이닉스 IR** (news.skhynix.com) — 실적·HBM4·CapEx (wiki/entities/sk-hynix.md)
- **Micron IR** — 실적·HBM3E·CHIPS Act 보조금 (wiki/entities/micron.md)
- **NVIDIA IR / 기술 블로그** — CMX·SCADA·Rubin (wiki/entities/nvidia-cmx-scada.md)
- **Samsung C&T / SDS Newsroom** — Stargate Korea LOI (wiki/strategies/core/current-state-se3-vertical-ascent.md)

### 정부·규제
- **NIST / U.S. Department of Commerce** — CHIPS Act 보조금 발표 (wiki/concepts/chips-act.md)
- **BIS (Bureau of Industry and Security)** — 對중국 수출 통제 (wiki/concepts/us-export-controls.md)
- **CSIS** — 중국 반도체 자립 정책 분석 (wiki/concepts/china-policy.md)
- **산업통상자원부 / 기획재정부 / KOTRA** — K-반도체 전략 (wiki/concepts/korea-policy.md)
- **IEA** — AI 데이터센터 전력 수요 (wiki/concepts/energy-constraints.md)

### 기술 표준·컨소시엄
- **JEDEC** — DDR5/DDR6 표준
- **CXL Consortium** — CXL 사양·로드맵 (wiki/concepts/emerging-tech.md)
- **IMEC** — 차세대 공정·EUV 로드맵
- **TechInsights / Knowmade** — 공정 분석·hybrid bonding IP (wiki/concepts/nand-process-transition.md)

### 학술·연구
- **NBER** — AI 생산성 (wiki/concepts/ai-demand-sustainability.md)
- **MIT** — Enterprise AI ROI 연구

### 미디어
- **CNBC / Reuters / Bloomberg / Nikkei Asia / KED Global / Tom's Hardware / Korea Times** — 실시간 보도
- **theCUBE / DCD / JLL / Visual Capitalist** — 데이터센터·AI 인프라
- **SemiAnalysis** (newsletter.semianalysis.com) — Dylan Patel 분석 뉴스레터. ISSCC 컨퍼런스 리뷰·플랫폼 분석·시장 부족 분석 (수집된 3개 기사는 `sources/articles/semianalysis-*` 참조)

---

## 수집된 원본 자료 (sources/articles/)

| 파일 | 출처 | 발행일 | 요약 |
|------|------|--------|------|
| [semianalysis-isscc-2026-2026-04-15.md](articles/semianalysis-isscc-2026-2026-04-15.md) | SemiAnalysis | 2026-04-15 | ISSCC 2026 메모리 논문 — Samsung HBM4(13Gb/s), SK Hynix N12 베이스다이, LPDDR6 양사, GDDR7 1c, 4F² COP DRAM, Kioxia BiCS10 332L |
| [semianalysis-ai-silicon-shortage-2026-03-12.md](articles/semianalysis-ai-silicon-shortage-2026-03-12.md) | SemiAnalysis | 2026-03-12 | Rubin HBM +50%, Rubin Ultra +4×, TPU/Trainium 12-Hi 마이그, Micron HBM4 뒤처짐, HBM 웨이퍼 효율 3→4×, DDR 마진 ~ HBM 계약 수준 |
| [semianalysis-vera-rubin-2026-02-25.md](articles/semianalysis-vera-rubin-2026-02-25.md) | SemiAnalysis | 2026-02-25 | Rubin HBM4 288GB 유지, 22 TB/s 목표, Micron 자격 취득 불가 (UBS 18% 추정과 충돌) |

---

## 이전 metadata.md

이 파일은 이전 `data/metadata.md` (21개 데이터 항목 카탈로그)를 위키화 이후의 외부 출처 카탈로그로 재작성한 것이다. 옛 카탈로그의 각 항목 요약은 이제 `wiki/concepts/`·`wiki/entities/`의 개별 페이지 안에 통합되어 있다. 새 외부 자료를 추가할 때는 위의 하위 디렉토리 중 하나에 저장하고, 인용 wiki 페이지에서 마크다운 링크로 참조한다.
