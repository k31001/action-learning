// 대시보드·위키 업데이트 내역 (시간 역순, 최신이 위)
//
// 출처: log.md + version.js bump 이력. 사람이 손수 큐레이팅.
// 새로운 ingest·build 사이클이 끝나면 여기에 한 entry 추가하는 것이 컨벤션.
//
// entry 스키마:
//   - date:    'YYYY-MM-DD'                — 작업 종료 시점
//   - type:    'ingest' | 'build' | 'query' | 'lint' | 'migration'
//   - title:   짧은 제목 (1줄)
//   - summary: 1~2 문장 요약
//   - version: 'v2.7.8' 또는 null (dashboard 변경 있을 때만)
//   - tags:    ['HBM', 'Counterpoint', ...]   — 필터 칩
//   - items:   [{ label, detail? }]            — 구체 변경 (확장 시 표시)
//   - links:   [{ label, href }]               — 외부/내부 출처

export const UPDATES = [
  // ── 2026-06-02 (b) ─────────────────────────────────────────────────────────
  {
    date: '2026-06-02',
    type: 'build',
    version: 'v2.11.0',
    title: 'AI DC 트래커 — 세계 지도 뷰 추가',
    summary:
      '"AI DC" 탭 상단에 세계 지도(Equal Earth 투영) 배경 위에 데이터센터를 전력 규모(원 크기)·권역(색)으로 표시하는 지도 뷰를 추가. 마커 호버 시 위치·전력·단계·칩·상태 툴팁. 46개 프로젝트 좌표 병합.',
    tags: ['AI 데이터센터', '세계지도', '시각화', 'd3-geo', 'dashboard'],
    items: [
      { label: '신규 컴포넌트', detail: 'dashboard/src/components/WorldMap.jsx — d3-geo Equal Earth 투영, 정적 지오메트리 모듈 1회 계산, 전력 √스케일 버블·호버 툴팁' },
      { label: '신규 의존성', detail: 'd3-geo + topojson-client + world-110m.json(번들). 권역 색·범례·크기 안내' },
      { label: '좌표 병합', detail: 'dataCenters.js DC_COORDS — id별 [lng,lat] 46건 병합 (포트폴리오/다중사이트 CoreWeave 제외)' },
      { label: '배치', detail: 'DataCenterTracker.jsx KPI 아래·단계 보드 위 풀폭 카드로 삽입' },
      { label: 'version v2.10.0 → v2.11.0 (마이너)', detail: '큰 UX 변경(세계 지도 뷰) + 새 데이터 카테고리(좌표)' },
    ],
    links: [
      { label: 'WorldMap.jsx', href: 'https://github.com/k31001/action-learning/blob/main/dashboard/src/components/WorldMap.jsx' },
    ],
  },
  // ── 2026-06-02 (a) ─────────────────────────────────────────────────────────
  {
    date: '2026-06-02',
    type: 'build',
    version: 'v2.10.0',
    title: '신규 탭 "AI DC" — 전 세계 AI 데이터센터 착공 트래커',
    summary:
      'Data Viz에 AI 데이터센터 착공 모니터링 페이지 신설. 부지 확보→가동 9단계로 전 세계 47건(17개국·55.9GW)의 현 단계를 한눈에 보고, 용량→GPU→HBM/DRAM 환산으로 메모리 수요를 추정. AI DC 건설은 메모리 수요의 6~24개월 선행 지표.',
    tags: ['AI 데이터센터', 'HBM', '메모리 수요', '선행지표', 'dashboard', '신규 탭'],
    items: [
      { label: '신규 데이터', detail: 'dashboard/src/data/dataCenters.js — 9단계 모델·용량→메모리 환산 모델·글로벌 프로젝트 47건·집계 헬퍼' },
      { label: '신규 컴포넌트', detail: 'dashboard/src/components/DataCenterTracker.jsx — 단계 칸반 보드(한눈에)·권역 필터·KPI·예측' },
      { label: '단계 보드', detail: '부지확보→인허가·전력→조성→골조→전력→M&E→IT설치→시운전→가동 9단계 칸반, 병목(②⑤⑦) 표기' },
      { label: '시각화', detail: '단계별 용량·권역 도넛·국가별 막대·전력 규모 상위·메모리 수요 예측(누적 GW↔HBM EB)·정렬 가능 상세 테이블' },
      { label: '메모리 환산', detail: '1GW ≈ 0.47M GPU ≈ 90~135PB HBM ≈ $1.35~2.0B HBM (Blackwell~GB300). 추적 55.9GW → ~5.0~7.5EB HBM 설치기반' },
      { label: '위키 소스', detail: 'wiki/concepts/ai-datacenter-buildout.md (단일 소스) + sources/raw-notes/ai-datacenter-buildout-2026-06.md (4-에이전트 수집)' },
      { label: 'DataVisualization.jsx 통합', detail: 'SUB_TABS 첫 번째 "AI DC" 탭(Server 아이콘)·기본 탭으로 설정' },
      { label: 'version v2.9.2 → v2.10.0 (마이너)', detail: '신규 페이지/탭·새 데이터 카테고리 추가' },
    ],
    links: [
      { label: 'ai-datacenter-buildout.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/concepts/ai-datacenter-buildout.md' },
      { label: 'DataCenterTracker.jsx', href: 'https://github.com/k31001/action-learning/blob/main/dashboard/src/components/DataCenterTracker.jsx' },
    ],
  },
  // ── 2026-05-25 ─────────────────────────────────────────────────────────────
  {
    date: '2026-05-25',
    type: 'build',
    version: 'v2.8.0',
    title: '신규 탭 "업데이트 내역" 추가',
    summary:
      'dashboard 상단 탭에 업데이트 타임라인을 추가. 위키 ingest·build·query 사이클의 변경 사항을 날짜·타입·태그로 필터링하여 확인할 수 있습니다. 매 사이클 종료 시 dashboard/src/data/updates.js에 entry 추가가 컨벤션.',
    tags: ['dashboard', 'UX', '신규 탭'],
    items: [
      { label: '신규 컴포넌트', detail: 'dashboard/src/components/Updates.jsx (타임라인 + 필터 칩 + 펼침/접기)' },
      { label: '신규 데이터', detail: 'dashboard/src/data/updates.js — 시간 역순 큐레이션, 타입(ingest/build/query/lint/migration)·태그·버전·외부 링크' },
      { label: '필터', detail: '타입(전체/Ingest/Build/Query) + 태그 다중 필터 + 모두 펼치기·접기' },
      { label: '통계 상자', detail: '총 업데이트·ingest·build·최신 업데이트 4종' },
      { label: 'App.jsx 통합', detail: 'TOP_TABS에 History 아이콘 + "업데이트 내역" 5번째 탭으로 삽입 (Strategy 다음)' },
      { label: 'version v2.7.8 → v2.8.0 (마이너)', detail: '신규 페이지/탭 추가에 따른 마이너 버전 bump' },
    ],
    links: [
      { label: 'Updates.jsx', href: 'https://github.com/k31001/action-learning/blob/main/dashboard/src/components/Updates.jsx' },
      { label: 'updates.js', href: 'https://github.com/k31001/action-learning/blob/main/dashboard/src/data/updates.js' },
    ],
  },
  {
    date: '2026-05-25',
    type: 'build',
    version: 'v2.7.8',
    title: 'Counterpoint 7건 결과를 dashboard·report에 sync',
    summary:
      'Counterpoint 인바운드 ingest 결과를 dashboard 데이터 미러·indicators·DECISIONS·SCENARIOS B와 outputs/report에 일괄 반영. 신규 EWI 2종 신설.',
    tags: ['Counterpoint', 'HBM', 'EWI', 'Main Bet', 'dashboard'],
    items: [
      { label: 'visualizations.js hbmShareTrend', detail: 'Counterpoint Q3 2025 행 추가 (SK 57 / Samsung 22 / Micron 21) — Astute와 병기' },
      { label: 'milestones 4건 추가', detail: 'Q4 2025 메모리 매출 1위 회복 · 64GB RDIMM $450→$900 · NVIDIA LPDDR 피벗 · Micron $200B' },
      { label: 'COMPETITIVE_LANDSCAPE 3사 갱신', detail: 'samsung·skhynix·micron — FY25 OP 47.2/24.9조, HBM Q3 2025 22/57, Rubin 2/3+ SK, Micron Q1 FY26 $13.6B + $200B + "with discipline"' },
      { label: 'DECISIONS D1·D6·D12 갱신', detail: 'D1 KPI 윈도우 HBM4E·HBM5 이동 검토 · D6 DRAM OPM>HBM 정점 신호 확정 · D12 단순 LTA+선급금 시급도 ↑·고도화 후순위' },
      { label: 'SCENARIOS B Main Bet KPI 사실 직시', detail: 'Q3 2025 22% (Counterpoint, 목표 28% -6%pt 미달). 확률(30~35%) 유지, 윈도우 이동' },
      { label: '신규 EWI: dram_opm_vs_hbm_opm', detail: '현재 inverted/critical — 사이클 정점 12~18개월 전 신호' },
      { label: '신규 EWI: smartphone_shipment_yoy', detail: '현재 -2.1%/warning — 메모리 부족 전이' },
      { label: 'outputs/report 3개 단락 보강', detail: '핵심 수치 표 + HBM 점유 표 + 시나리오 B Main Bet 사실 직시' },
      { label: 'version v2.7.7 → v2.7.8 (패치)', detail: '신규 EWI 2종 + 데이터 갱신, 페이지 구조 변경 없음' },
      { label: 'npm run build ✓ 3.17s', detail: '2,337 modules, 898.6kB JS' },
    ],
    links: [
      { label: 'log.md 항목', href: 'https://github.com/k31001/action-learning/blob/main/log.md' },
    ],
  },
  {
    date: '2026-05-25',
    type: 'ingest',
    version: null,
    title: 'Counterpoint Research 메모리 시리즈 7건 (2025-11 ~ 2026-04)',
    summary:
      'counterpointresearch.com 인바운드 수집 — 사이트 JS 렌더링/구독 제한으로 WebSearch 스니펫 + 3자 보도 교차 검증. 위키 14개 페이지 갱신.',
    tags: ['Counterpoint', 'HBM', 'DRAM', 'LTA', 'NVIDIA', 'Main Bet'],
    items: [
      { label: '#1 Advanced Memory Prices Likely to Double (2025-11-19)', detail: 'NVIDIA LPDDR 피벗 "seismic shift", DDR4 $2.10/Gb > DDR5 $1.50/Gb 가격 역전' },
      { label: '#2 Micron Record Performance (2025-12-18)', detail: 'Q1 FY26 매출 $13.6B (+57% YoY, +21% QoQ), 시장 $200B→$400B' },
      { label: '#3 2026 Smartphone Forecasts Revised Down (2025-12-18)', detail: '글로벌 -2.1% (역대 최대 하향), BoM +25/15/10% (저/중/고가), ASP +6.9% YoY' },
      { label: '#4 Q4 2025 Samsung Reclaims Top (2026-01-29)', detail: 'Samsung 메모리 매출 $25.9B 1위 회복, SK hynix Q4 2025 메모리 OPM 58%' },
      { label: '#5 SK Hynix Overtakes Samsung in Profit (2026-01-29)', detail: 'SK FY25 OP 47.2조 > Samsung 전사 43.6조 (Samsung 메모리만 24.9조), HBM Q3 2025 SK 57% vs Samsung 22%, Rubin 2/3+ SK' },
      { label: '#6 Memory Prices Surge Up to 90% (2026-02-05)', detail: 'Q1 2026 80~90% QoQ, 64GB RDIMM $450→$900→$1000+, DRAM OPM 60% 사상 첫 HBM 초과' },
      { label: '#7 LTA Structurally Reshaping DRAM (2026-04-06)', detail: 'UBS Arcuri "LTA가 cyclicality 제거", Microsoft·Google이 SK hynix와 3년 LTA + 선급금 협의 중' },
      { label: '위키 갱신', detail: 'concepts 5 (price-trends, memory-market-overview, dram-market-share, hbm-market, ai-server-demand) + entities 3 (samsung, sk-hynix, micron) + steep economy + scenario-B + RS 3 (1·5·8)' },
    ],
    links: [
      { label: 'Counterpoint Research', href: 'https://counterpointresearch.com/en' },
    ],
  },
  {
    date: '2026-05-25',
    type: 'ingest',
    version: null,
    title: 'Bloomberg TV: Micron CEO Mehrotra 미국 캐파·LTA·"discipline"',
    summary:
      'Manassas VA 1α DRAM 양산 개시 행사 인터뷰. $200B/10년·90K 일자리·"shortage well beyond 2026"·LTSA·"with discipline" 4회. RS-1/2/5/8 본인 언어 확인.',
    tags: ['Micron', 'Bloomberg', 'RS-1', 'RS-5', 'RS-8', 'LTA'],
    items: [
      { label: '미국 DRAM 캐파 10% → ~40% (10년)', detail: '총 $200B, 90,000 일자리. Manassas DDR4/1α 4배 확장, Boise leading-edge 2027 mid, Syracuse 4팹 메가 클러스터' },
      { label: '부족 장기화 공식 인정', detail: '"Shortage well beyond 2026", 현재 50~2/3만 충족, "Meaningful new supply doesn\'t ramp until 2028"' },
      { label: '"With discipline" 4회 반복', detail: 'Shell 선행 + 장비 단계화 본인 언어 명시 — RS-1 옵션형 캐파 산업 표준어화' },
      { label: 'LTSA 직접 인용', detail: '"Long term supply agreements" — 고객 predictability ↔ 생산자 confidence' },
      { label: '위키 갱신', detail: 'wiki/entities/micron.md + RS-1/2/5/8 [Update 2026-05-22] 섹션 추가' },
    ],
    links: [
      { label: 'YouTube 원본', href: 'https://youtu.be/Q_PSCMdINmg' },
    ],
  },

  // ── 2026-05-19 ─────────────────────────────────────────────────────────────
  {
    date: '2026-05-19',
    type: 'build',
    version: 'v2.7.7',
    title: '4개 후속 작업 일괄 (venv 정비 + EWI 2종 + DECISIONS 2종)',
    summary:
      'venv 정비(PEP 668 우회) + 신규 EWI 2종(apple_ondevice_ai_status, hbm6_mass_production_status) + DECISIONS D13·D14 신설.',
    tags: ['venv', 'EWI', 'DECISIONS', 'CXL', '3D DRAM'],
    items: [
      { label: 'venv 분리', detail: 'brew Python PEP 668 차단 우회. .venv/ 생성 후 .gitignore 등재' },
      { label: 'EWI: apple_ondevice_ai_status', detail: '애플 온디바이스 AI 메모리 채택 단계 추적' },
      { label: 'EWI: hbm6_mass_production_status', detail: 'HBM 6세대 양산 진척 — Main Bet 기술 토대 검증' },
      { label: 'D13 SE-1 3D DRAM 가속', detail: 'IMEC 협약 $300M+ 상향 + R&D 조직 확대' },
      { label: 'D14 SE-2 CXL 표준 주도권 4단계', detail: 'SIG 의장단 진입 → 차세대 표준 작성 → NVIDIA 인증 → 30% 점유' },
    ],
  },
  {
    date: '2026-05-19',
    type: 'ingest',
    version: 'v2.7.6',
    title: '권석준 추가 영상 3건 → MB-4 / SE-1 / SE-2 / RS-2 강화',
    summary:
      'SBS 교양이를 부탁해 + 동아일보 + 추가 영상. IDM 차별점·CXL "메모리 부도심"·3D DRAM 5년 베팅 등 핵심 전략 재정렬.',
    tags: ['권석준', 'IDM', 'CXL', '3D DRAM', 'RS-2'],
    items: [
      { label: 'MB-4 커스텀 AI 메모리', detail: '5종 메모리 통합 솔루션 강화' },
      { label: 'SE-1 3D DRAM', detail: 'IMEC 협약 $200M → $300M+ 상향 명분' },
      { label: 'SE-2 CXL', detail: '"메모리 부도심·삼성 차별점" 진단 반영' },
      { label: 'RS-2 바벨', detail: 'IDM 종합반도체 = HBM4E 격전지 차별점' },
    ],
  },
  {
    date: '2026-05-19',
    type: 'ingest',
    version: 'v2.7.5',
    title: '권석준 인터뷰 (SBS 교양이를 부탁해 2026-04-11)',
    summary:
      'TSMC N12 "인질 위기" / 메모리 가격 스트레스 테스트 / 변화 적응 능력. 위키 다수 갱신 + 권 교수 발언 일관 인용.',
    tags: ['권석준', 'TSMC', '인질', 'SBS'],
    items: [
      { label: 'SK하이닉스 TSMC N12 인질 위기', detail: 'sk-hynix.md gapAreas에 Plan B 시급도 추가' },
      { label: '메모리 단가 3~4배 폭등', detail: 'price-trends.md "갑을 역전" 섹션' },
      { label: '변화 적응 = 시나리오 플래닝 본질', detail: 'memory-market-overview.md 권 교수 권고 인용' },
    ],
  },
  {
    date: '2026-05-19',
    type: 'build',
    version: 'v2.7.4',
    title: 'dashboard 버전 bump + 변경 정합성 체인에 version 단계 강제 추가',
    summary:
      '누락된 dashboard 버전 bump 처리 + CLAUDE.md §6 체인에 version bump 단계 강제 명문화.',
    tags: ['version', 'CLAUDE.md', '체인'],
    items: [
      { label: 'v2.7.3 → v2.7.4 (패치)', detail: '누적 3건 dashboard 변경 회수' },
      { label: 'CLAUDE.md §6 보강', detail: '변경 정합성 체인 마무리 단계에 "version.js bump" 강제 추가' },
    ],
  },
  {
    date: '2026-05-19',
    type: 'build',
    version: null,
    title: 'dashboard sync: 4개 query 결과 미러링',
    summary:
      'SemiAnalysis ingest의 4개 query 결론을 dashboard visualizations·strategies·indicators에 일괄 반영.',
    tags: ['SemiAnalysis', 'CXMT', 'D6', 'D10', 'EWI'],
    items: [
      { label: 'dramMarketShareTrend 2027E', detail: 'cxmt 14 → 16 (Samsung 30→29, SK 32→31 분배)' },
      { label: 'D6 RS-1·4·5 호황기 절제 강화', detail: '신규 고정 캐파 동결·mix 전환권·LTA 없는 증설 금지·재고 -15%·재투자 70%+·자사주 보류' },
      { label: 'D10 NAND V11 가속', detail: 'Kioxia BiCS10 등장 → 2027 H1 → 2026 H2 가속 검토' },
      { label: '신규 EWI 2종', detail: 'cxmt_asp_gap (CXMT ASP 격차), cxmt_fab3_status (Fab 3 가동 단계)' },
    ],
  },
  {
    date: '2026-05-19',
    type: 'ingest',
    version: null,
    title: 'SemiAnalysis 3개 기사 (ISSCC 2026 / AI Silicon Shortage / Vera Rubin)',
    summary:
      'HBM ×4 캐파 잠식, DDR 마진 HBM 근접, Micron Rubin "effectively out" 평가. RS-1/4/5/6/7 강도 재조정.',
    tags: ['SemiAnalysis', 'HBM', 'Rubin', 'Micron', 'BiCS10'],
    items: [
      { label: 'HBM 캐파 잠식 3 → 4×', detail: 'hbm-market.md, rs1·rs5 강도 강화' },
      { label: 'DDR DRAM 마진 HBM 근접/초과', detail: 'price-trends.md, rs1·rs5 호황 정점 신호 1단계' },
      { label: 'Micron Rubin HBM4 "effectively out"', detail: 'micron.md, Samsung Rubin 28% 진입 여지 확대' },
      { label: 'Kioxia BiCS10 332L', detail: 'nand-process-transition.md, V11 가속 명분' },
    ],
  },
]
