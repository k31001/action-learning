// ⚙️  GENERATED — 직접 수정 금지. 재생성: node scripts/build-knowledge-graph.mjs
// 위키 지식 그래프 (graph DB 대체: LLM 유지 마크다운 링크 → 노드·엣지).
// 단일 소스: wiki/**/*.md 의 페이지 간 상대경로 링크. index.md = 고아 판정 기준.
export const CATEGORIES = {
  "entities": {
    "label": "개체",
    "color": "#007AFF"
  },
  "concepts": {
    "label": "개념",
    "color": "#34C759"
  },
  "scenarios": {
    "label": "시나리오",
    "color": "#AF52DE"
  },
  "strategies": {
    "label": "전략",
    "color": "#FF9500"
  },
  "steep": {
    "label": "STEEP",
    "color": "#32ADE6"
  },
  "driving-forces": {
    "label": "Driving Force",
    "color": "#FF2D55"
  },
  "benchmark": {
    "label": "벤치마크",
    "color": "#A2845E"
  }
}

export const KNOWLEDGE_GRAPH = {
  nodes: [{"id":"benchmark/agri-hedging-to-memory-semi.md","title":"농수산업 헤징 전략 → 메모리 반도체 적용 가이드","category":"benchmark","x":-260.2,"y":-107.2,"inDegree":2,"outDegree":2,"sourceCitations":0,"r":11.2},{"id":"benchmark/cyclical-strategy-benchmark.md","title":"호황·불황 사이클 대응 전략 벤치마킹","category":"benchmark","x":-0.5,"y":-124.3,"inDegree":6,"outDegree":0,"sourceCitations":0,"r":12.4},{"id":"benchmark/upside-participation-hedging.md","title":"상방 참여형 헤징 구조 & 적정 가격 범위 산정 가이드","category":"benchmark","x":-303.8,"y":-35.6,"inDegree":2,"outDegree":2,"sourceCitations":0,"r":11.2},{"id":"concepts/2026-q1-current-state.md","title":"2026년 1분기 삼성전자 메모리사업부 현황 (Most Recent Snapshot)","category":"concepts","x":9.7,"y":-42.5,"inDegree":6,"outDegree":0,"sourceCitations":0,"r":12.4},{"id":"concepts/ai-capex.md","title":"빅테크 AI 데이터센터 투자 규모 (2024~2027)","category":"concepts","x":227.4,"y":83.9,"inDegree":6,"outDegree":5,"sourceCitations":13,"r":14.6},{"id":"concepts/ai-compute-economics-gap.md","title":"AI 컴퓨트 경제학 갭 — Bain의 수요·자본·공급 프레임","category":"concepts","x":198.7,"y":-38.6,"inDegree":7,"outDegree":8,"sourceCitations":6,"r":16.1},{"id":"concepts/ai-datacenter-buildout.md","title":"AI 데이터센터 착공 현황 — 메모리 수요 선행 지표","category":"concepts","x":138.3,"y":1,"inDegree":6,"outDegree":9,"sourceCitations":11,"r":16.1},{"id":"concepts/ai-demand-sustainability.md","title":"AI 수요 지속 가능성: 거품론 논쟁 및 전문가 의견","category":"concepts","x":268.3,"y":2.8,"inDegree":6,"outDegree":1,"sourceCitations":5,"r":12.9},{"id":"concepts/ai-server-demand.md","title":"AI 서버용 메모리 수요 전망 및 메모리 시장 사이클 패턴","category":"concepts","x":31.2,"y":54.7,"inDegree":4,"outDegree":7,"sourceCitations":5,"r":14.6},{"id":"concepts/bottleneck-model-2030.md","title":"2030 병목 정량 모델 (Bottleneck Model 2030)","category":"concepts","x":180.6,"y":104.5,"inDegree":8,"outDegree":12,"sourceCitations":11,"r":17.6},{"id":"concepts/china-policy.md","title":"중국 반도체 자립 정책 및 진행 상황","category":"concepts","x":157.6,"y":-170.3,"inDegree":3,"outDegree":0,"sourceCitations":0,"r":10.5},{"id":"concepts/chips-act.md","title":"미국 CHIPS Act: 삼성전자 수혜 현황 (텍사스 팹 보조금)","category":"concepts","x":127.6,"y":108.8,"inDegree":5,"outDegree":0,"sourceCitations":0,"r":11.8},{"id":"concepts/customer-co-design-anthropic.md","title":"고객 공동개발 모델 — Anthropic Strategic Infrastructure Partnership","category":"concepts","x":-82.5,"y":139.5,"inDegree":7,"outDegree":5,"sourceCitations":5,"r":15},{"id":"concepts/demand-inflection-ewi.md","title":"메모리 수요 변곡 조기경보 (Demand-Inflection EWI)","category":"concepts","x":173,"y":2.2,"inDegree":7,"outDegree":10,"sourceCitations":6,"r":16.7},{"id":"concepts/dram-antitrust-litigation.md","title":"DRAM 반독점 집단소송 (2026-06 제소)","category":"concepts","x":94.3,"y":121.3,"inDegree":6,"outDegree":5,"sourceCitations":9,"r":14.6},{"id":"concepts/dram-market-share.md","title":"글로벌 메모리 시장 점유율: 삼성/SK하이닉스/마이크론 3강 구도","category":"concepts","x":39.6,"y":-17.7,"inDegree":8,"outDegree":4,"sourceCitations":3,"r":15},{"id":"concepts/dram-technology.md","title":"DRAM 기술 동향: DDR5/LPDDR5X 보급 현황 및 미세공정 로드맵","category":"concepts","x":-37.6,"y":-50.4,"inDegree":6,"outDegree":1,"sourceCitations":3,"r":12.9},{"id":"concepts/embedded-software-monetization.md","title":"임베디드 SW 수익화 — 커널·드라이버·펌웨어·BSP·SDK 상품화","category":"concepts","x":-62.5,"y":218.6,"inDegree":4,"outDegree":1,"sourceCitations":1,"r":11.8},{"id":"concepts/emerging-tech.md","title":"신기술 동향: CXL / PIM / NAND 고단화","category":"concepts","x":-112.9,"y":83.6,"inDegree":3,"outDegree":5,"sourceCitations":4,"r":13.4},{"id":"concepts/energy-constraints.md","title":"AI 전력 소비 및 데이터센터 에너지 제약","category":"concepts","x":288.7,"y":52.9,"inDegree":3,"outDegree":3,"sourceCitations":15,"r":12.4},{"id":"concepts/hbm-market.md","title":"HBM(High Bandwidth Memory) 시장 규모 및 성장률","category":"concepts","x":76.3,"y":84.3,"inDegree":18,"outDegree":4,"sourceCitations":16,"r":18.2},{"id":"concepts/hbm-roadmap.md","title":"HBM 세대별 로드맵 및 제조사 현황","category":"concepts","x":22.1,"y":162.1,"inDegree":4,"outDegree":4,"sourceCitations":9,"r":13.4},{"id":"concepts/korea-policy.md","title":"한국·EU·일본 반도체 정책 및 미중 갈등 리스크 시나리오","category":"concepts","x":-136.5,"y":201.3,"inDegree":2,"outDegree":0,"sourceCitations":3,"r":9.7},{"id":"concepts/lta-to-sca-transition.md","title":"LTA → SCA 전환 — 계약 구조가 말해주는 산업 체질 변화","category":"concepts","x":-88,"y":39.1,"inDegree":9,"outDegree":5,"sourceCitations":6,"r":15.7},{"id":"concepts/memory-market-overview.md","title":"글로벌 메모리 반도체 시장 규모 및 전망","category":"concepts","x":233.2,"y":13.5,"inDegree":0,"outDegree":2,"sourceCitations":2,"r":9.7},{"id":"concepts/nand-process-transition.md","title":"NAND Flash 공정 전환 주기 — 비용·기술 동향","category":"concepts","x":91,"y":-159.1,"inDegree":9,"outDegree":0,"sourceCitations":1,"r":13.8},{"id":"concepts/price-trends.md","title":"DRAM/NAND 가격 동향 및 전망","category":"concepts","x":129.7,"y":-93.4,"inDegree":6,"outDegree":4,"sourceCitations":12,"r":14.2},{"id":"concepts/semiconductor-cycle.md","title":"글로벌 반도체 업황 사이클 전망 (2026~2028)","category":"concepts","x":58.7,"y":-57.2,"inDegree":9,"outDegree":3,"sourceCitations":8,"r":15},{"id":"concepts/space-semiconductor.md","title":"우주용 반도체 (Space Semiconductor) — 선별 COTS·중간지대 전략","category":"concepts","x":-163.6,"y":57.2,"inDegree":3,"outDegree":2,"sourceCitations":2,"r":11.8},{"id":"concepts/ssd-ufs-market.md","title":"SSD · UFS · 모바일 메모리 시장","category":"concepts","x":154.3,"y":-37.6,"inDegree":2,"outDegree":2,"sourceCitations":1,"r":11.2},{"id":"concepts/us-export-controls.md","title":"미국 반도체 수출 통제 (對중국)","category":"concepts","x":-72.4,"y":-63,"inDegree":8,"outDegree":3,"sourceCitations":3,"r":14.6},{"id":"concepts/used-semiconductor-market.md","title":"중고·재활용 반도체 인증 시장 (Used / Refurbished Semiconductor)","category":"concepts","x":-204.5,"y":142.6,"inDegree":1,"outDegree":0,"sourceCitations":2,"r":8.6},{"id":"driving-forces/impact-uncertainty-matrix.md","title":"Impact × Uncertainty 매트릭스","category":"driving-forces","x":-87.3,"y":-187.1,"inDegree":5,"outDegree":7,"sourceCitations":0,"r":15},{"id":"driving-forces/key-drivers.md","title":"핵심 Driving Forces","category":"driving-forces","x":31.2,"y":-112.6,"inDegree":11,"outDegree":8,"sourceCitations":12,"r":17.3},{"id":"entities/china-competitors.md","title":"중국 메모리 업체 그룹 (CXMT · YMTC)","category":"entities","x":43.6,"y":-144.2,"inDegree":6,"outDegree":10,"sourceCitations":2,"r":16.4},{"id":"entities/cxmt.md","title":"CXMT (창신메모리 / 长鑫存储) — DRAM 전문","category":"entities","x":79.1,"y":-33.2,"inDegree":9,"outDegree":11,"sourceCitations":8,"r":17.6},{"id":"entities/micron.md","title":"Micron Technology 경쟁사 동향","category":"entities","x":24.4,"y":24.3,"inDegree":7,"outDegree":13,"sourceCitations":19,"r":17.6},{"id":"entities/nvidia-cmx-scada.md","title":"NVIDIA CMX & SCADA — AI 스토리지 아키텍처 혁신","category":"entities","x":125.4,"y":159.5,"inDegree":5,"outDegree":0,"sourceCitations":0,"r":11.8},{"id":"entities/nvidia.md","title":"NVIDIA Corporation","category":"entities","x":107.2,"y":72.1,"inDegree":1,"outDegree":15,"sourceCitations":2,"r":16.4},{"id":"entities/samsung.md","title":"Samsung Electronics — 메모리사업부 (DS 부문)","category":"entities","x":-11.7,"y":68.8,"inDegree":10,"outDegree":32,"sourceCitations":19,"r":22.8},{"id":"entities/sk-hynix.md","title":"SK하이닉스 경쟁사 동향","category":"entities","x":-10.5,"y":26.2,"inDegree":15,"outDegree":5,"sourceCitations":11,"r":17.6},{"id":"entities/tsmc.md","title":"TSMC (Taiwan Semiconductor Manufacturing Company)","category":"entities","x":75.1,"y":6.5,"inDegree":2,"outDegree":10,"sourceCitations":7,"r":15},{"id":"entities/ymtc.md","title":"YMTC (양쯔메모리 / 长江存储) — NAND Flash 전문","category":"entities","x":44.4,"y":-88.2,"inDegree":4,"outDegree":8,"sourceCitations":0,"r":15},{"id":"scenarios/core-strategy-selection.md","title":"핵심전략 10개 선정 메모 (Phase 2A)","category":"scenarios","x":-284.1,"y":39.6,"inDegree":1,"outDegree":0,"sourceCitations":0,"r":8.6},{"id":"scenarios/robust-reverification.md","title":"불변전략(Robust) 재검증 메모","category":"scenarios","x":-133.3,"y":-128.4,"inDegree":3,"outDegree":0,"sourceCitations":0,"r":10.5},{"id":"scenarios/scenario-A.md","title":"시나리오 A: \"황금 요새\"","category":"scenarios","x":110.7,"y":220.2,"inDegree":2,"outDegree":0,"sourceCitations":0,"r":9.7},{"id":"scenarios/scenario-B.md","title":"시나리오 B: \"AI 르네상스\"","category":"scenarios","x":71.7,"y":185.9,"inDegree":4,"outDegree":2,"sourceCitations":2,"r":12.4},{"id":"scenarios/scenario-C.md","title":"시나리오 C: \"기술 냉전\"","category":"scenarios","x":108.8,"y":27.9,"inDegree":6,"outDegree":2,"sourceCitations":2,"r":13.4},{"id":"scenarios/scenario-D.md","title":"시나리오 D: \"조용한 재편\"","category":"scenarios","x":51.1,"y":125.8,"inDegree":2,"outDegree":4,"sourceCitations":4,"r":12.4},{"id":"scenarios/scenario-E.md","title":"시나리오 E: \"패러다임 전환\" (와일드카드)","category":"scenarios","x":-200.7,"y":97.5,"inDegree":3,"outDegree":0,"sourceCitations":0,"r":10.5},{"id":"scenarios/scenario-matrix.md","title":"시나리오 매트릭스","category":"scenarios","x":-72.6,"y":-28.1,"inDegree":3,"outDegree":0,"sourceCitations":5,"r":10.5},{"id":"scenarios/strategy.md","title":"삼성전자 메모리사업부 전략 권고안","category":"scenarios","x":-25.1,"y":-19.5,"inDegree":12,"outDegree":4,"sourceCitations":0,"r":16.4},{"id":"steep/economy.md","title":"STEEP - Economy(경제) 요인 분석","category":"steep","x":-152.2,"y":-62.9,"inDegree":2,"outDegree":0,"sourceCitations":1,"r":9.7},{"id":"steep/environment.md","title":"STEEP - Environment(환경) 요인 분석","category":"steep","x":-64.5,"y":-264,"inDegree":1,"outDegree":2,"sourceCitations":0,"r":10.5},{"id":"steep/political.md","title":"STEEP - Political(정치) 요인 분석","category":"steep","x":-27.5,"y":-212.5,"inDegree":1,"outDegree":4,"sourceCitations":2,"r":11.8},{"id":"steep/social.md","title":"STEEP - Social(사회) 요인 분석","category":"steep","x":-3.5,"y":-274.3,"inDegree":1,"outDegree":2,"sourceCitations":0,"r":10.5},{"id":"steep/technology.md","title":"STEEP - Technology(기술) 요인 분석","category":"steep","x":45.2,"y":-252,"inDegree":1,"outDegree":2,"sourceCitations":0,"r":10.5},{"id":"strategies/core/README.md","title":"핵심전략 10개 현황 분석 — 문서 인덱스","category":"strategies","x":-117.8,"y":22.6,"inDegree":1,"outDegree":13,"sourceCitations":0,"r":15.7},{"id":"strategies/core/current-state-mb2-east-west-supply.md","title":"현황 분석: MB-2 동서 균형 공급망","category":"strategies","x":-32.1,"y":97.1,"inDegree":2,"outDegree":4,"sourceCitations":0,"r":12.4},{"id":"strategies/core/current-state-mb4-custom-ai-memory.md","title":"현황 분석: MB-4 커스텀 AI 메모리 솔루션","category":"strategies","x":4.7,"y":103.8,"inDegree":12,"outDegree":10,"sourceCitations":6,"r":18.2},{"id":"strategies/core/current-state-rs3-customer-switching-cost.md","title":"현황 분석: RS-3 고객특화·전환비용 극대화 (CMX/SCADA/FDP)","category":"strategies","x":-19.4,"y":189.9,"inDegree":1,"outDegree":2,"sourceCitations":0,"r":10.5},{"id":"strategies/core/current-state-rs5-financial-discipline.md","title":"현황 분석: RS-5 재무 규율 + 초과이익 재투자","category":"strategies","x":-90.6,"y":-98.5,"inDegree":2,"outDegree":4,"sourceCitations":0,"r":12.4},{"id":"strategies/core/current-state-rs6-process-leadership.md","title":"현황 분석: RS-6 공정 리더십 통합 (1c nm DRAM + NAND 주기 연장 + Hybrid bonding 자체 IP)","category":"strategies","x":-52.1,"y":-134.6,"inDegree":1,"outDegree":3,"sourceCitations":0,"r":11.2},{"id":"strategies/core/current-state-sa2-japan-rd-hub-nil.md","title":"현황 분석: SA-2 일본 R&D 허브 (EUV 우회 — Canon NIL)","category":"strategies","x":-214.8,"y":50.3,"inDegree":1,"outDegree":2,"sourceCitations":0,"r":10.5},{"id":"strategies/core/current-state-sd1-hbm-pnl-spinoff.md","title":"현황 분석: SD-1 HBM 조직 독립 P&L + 패키징 인재 전략","category":"strategies","x":-5.2,"y":-77.2,"inDegree":5,"outDegree":3,"sourceCitations":0,"r":13.4},{"id":"strategies/core/current-state-sd2-industrial-ai-memory.md","title":"현황 분석: SD-2 산업용 AI 메모리 (자동차·의료)","category":"strategies","x":-112.9,"y":-60.8,"inDegree":5,"outDegree":2,"sourceCitations":2,"r":12.9},{"id":"strategies/core/current-state-se1-3d-dram-imec-ma.md","title":"현황 분석: SE-1 3D DRAM + IMEC + 스타트업 M&A","category":"strategies","x":-204.7,"y":-21.5,"inDegree":2,"outDegree":2,"sourceCitations":2,"r":11.2},{"id":"strategies/core/current-state-se2-cxl-sig-leadership.md","title":"현황 분석: SE-2 CXL SIG 표준 주도","category":"strategies","x":-135.7,"y":132.5,"inDegree":4,"outDegree":3,"sourceCitations":1,"r":12.9},{"id":"strategies/core/current-state-se3-vertical-ascent.md","title":"현황 분석: SE-3 AI 인프라 수직 진출 (Vertical Ascent)","category":"strategies","x":-48.2,"y":49,"inDegree":5,"outDegree":4,"sourceCitations":0,"r":13.8},{"id":"strategies/dev-org-transformation.md","title":"개발실 체질 전환 전략 — 수주 이행자에서 기술 파트너로 (DT: Dev-org Transformation)","category":"strategies","x":-65.8,"y":86.3,"inDegree":10,"outDegree":9,"sourceCitations":13,"r":17.3},{"id":"strategies/fdp-host-ssd-platform.md","title":"FDP Host–SSD 통합 플랫폼 전략 — SSD 공급자에서 통합 솔루션 제공자로 (DT-P: 개발실 전환의 제품·기술 축)","category":"strategies","x":-154.4,"y":163.7,"inDegree":1,"outDegree":6,"sourceCitations":2,"r":12.9},{"id":"strategies/invariant/README.md","title":"불변전략 (Robust Strategies) — 문서 인덱스","category":"strategies","x":2.1,"y":-9.9,"inDegree":0,"outDegree":11,"sourceCitations":0,"r":14.6},{"id":"strategies/invariant/rs1-options-based-capacity.md","title":"RS-1: 옵션형 캐파 체계 (Options-Based Capacity)","category":"strategies","x":119.2,"y":-57.9,"inDegree":5,"outDegree":6,"sourceCitations":4,"r":14.6},{"id":"strategies/invariant/rs2-barbell-portfolio.md","title":"RS-2: 바벨 포트폴리오 전략 (Barbell Portfolio)","category":"strategies","x":-47.8,"y":9.7,"inDegree":6,"outDegree":12,"sourceCitations":4,"r":17},{"id":"strategies/invariant/rs3-customer-switching-cost.md","title":"RS-3: 고객특화 기능·전환비용 극대화","category":"strategies","x":-14.5,"y":136.9,"inDegree":6,"outDegree":6,"sourceCitations":0,"r":15},{"id":"strategies/invariant/rs4-customer-portfolio-diversification.md","title":"RS-4: 고객 포트폴리오 의도적 분산","category":"strategies","x":64.5,"y":40,"inDegree":4,"outDegree":8,"sourceCitations":0,"r":15},{"id":"strategies/invariant/rs5-financial-discipline-reinvestment.md","title":"RS-5: 재무 규율 + 초과이익 재투자 (Financial Discipline + Excess Profit Reinvestment)","category":"strategies","x":108.2,"y":-19.7,"inDegree":5,"outDegree":10,"sourceCitations":6,"r":16.1},{"id":"strategies/invariant/rs6-process-leadership.md","title":"RS-6: 공정 리더십 통합 (1c nm DRAM + NAND 주기 연장 + Hybrid Bonding 자체 IP)","category":"strategies","x":84.4,"y":-102.4,"inDegree":3,"outDegree":5,"sourceCitations":0,"r":13.4},{"id":"strategies/invariant/rs7-ai-engineering-automation.md","title":"RS-7: AI 엔지니어링 자동화 (AI Engineering Productivity)","category":"strategies","x":-39,"y":-98,"inDegree":6,"outDegree":5,"sourceCitations":2,"r":14.6},{"id":"strategies/invariant/rs8-structured-revenue-hedging.md","title":"RS-8: 구조화 매출 헷지 (Structured Revenue Hedging)","category":"strategies","x":-155.4,"y":9.1,"inDegree":9,"outDegree":4,"sourceCitations":4,"r":15.4},{"id":"strategies/invariant/rs9-demand-inflection-sensing.md","title":"RS-9 · 데이터 기반 수요 변곡 센싱 (Demand-Inflection Sensing)","category":"strategies","x":136.4,"y":55.1,"inDegree":3,"outDegree":8,"sourceCitations":0,"r":14.6}],
  edges: [{"source":"benchmark/agri-hedging-to-memory-semi.md","target":"strategies/invariant/rs8-structured-revenue-hedging.md","weight":2,"mutual":true},{"source":"benchmark/agri-hedging-to-memory-semi.md","target":"benchmark/upside-participation-hedging.md","weight":2,"mutual":true},{"source":"benchmark/upside-participation-hedging.md","target":"strategies/invariant/rs8-structured-revenue-hedging.md","weight":2,"mutual":true},{"source":"concepts/ai-capex.md","target":"concepts/ai-compute-economics-gap.md","weight":3,"mutual":true},{"source":"concepts/ai-capex.md","target":"concepts/ai-demand-sustainability.md","weight":2,"mutual":false},{"source":"concepts/ai-capex.md","target":"concepts/bottleneck-model-2030.md","weight":3,"mutual":true},{"source":"concepts/ai-capex.md","target":"scenarios/scenario-C.md","weight":1,"mutual":false},{"source":"concepts/ai-capex.md","target":"concepts/dram-antitrust-litigation.md","weight":2,"mutual":true},{"source":"concepts/ai-compute-economics-gap.md","target":"concepts/ai-demand-sustainability.md","weight":4,"mutual":true},{"source":"concepts/ai-compute-economics-gap.md","target":"concepts/ai-datacenter-buildout.md","weight":6,"mutual":true},{"source":"concepts/ai-compute-economics-gap.md","target":"concepts/energy-constraints.md","weight":2,"mutual":true},{"source":"concepts/ai-compute-economics-gap.md","target":"concepts/hbm-market.md","weight":3,"mutual":true},{"source":"concepts/ai-compute-economics-gap.md","target":"concepts/semiconductor-cycle.md","weight":3,"mutual":true},{"source":"concepts/ai-compute-economics-gap.md","target":"concepts/demand-inflection-ewi.md","weight":1,"mutual":false},{"source":"concepts/ai-compute-economics-gap.md","target":"driving-forces/key-drivers.md","weight":1,"mutual":false},{"source":"concepts/ai-datacenter-buildout.md","target":"concepts/ai-server-demand.md","weight":3,"mutual":true},{"source":"concepts/ai-capex.md","target":"concepts/ai-datacenter-buildout.md","weight":1,"mutual":false},{"source":"concepts/ai-datacenter-buildout.md","target":"concepts/energy-constraints.md","weight":3,"mutual":true},{"source":"concepts/ai-datacenter-buildout.md","target":"concepts/hbm-market.md","weight":1,"mutual":false},{"source":"concepts/ai-datacenter-buildout.md","target":"concepts/semiconductor-cycle.md","weight":2,"mutual":false},{"source":"concepts/ai-datacenter-buildout.md","target":"driving-forces/key-drivers.md","weight":2,"mutual":true},{"source":"concepts/ai-datacenter-buildout.md","target":"scenarios/scenario-matrix.md","weight":1,"mutual":false},{"source":"concepts/ai-datacenter-buildout.md","target":"concepts/ai-demand-sustainability.md","weight":1,"mutual":false},{"source":"concepts/ai-server-demand.md","target":"concepts/hbm-market.md","weight":2,"mutual":false},{"source":"concepts/ai-server-demand.md","target":"concepts/dram-technology.md","weight":1,"mutual":false},{"source":"concepts/ai-server-demand.md","target":"concepts/semiconductor-cycle.md","weight":1,"mutual":false},{"source":"concepts/ai-server-demand.md","target":"steep/economy.md","weight":1,"mutual":false},{"source":"concepts/ai-server-demand.md","target":"strategies/core/current-state-mb4-custom-ai-memory.md","weight":1,"mutual":false},{"source":"concepts/ai-server-demand.md","target":"concepts/bottleneck-model-2030.md","weight":1,"mutual":false},{"source":"concepts/ai-compute-economics-gap.md","target":"concepts/bottleneck-model-2030.md","weight":2,"mutual":false},{"source":"concepts/bottleneck-model-2030.md","target":"concepts/demand-inflection-ewi.md","weight":5,"mutual":true},{"source":"concepts/bottleneck-model-2030.md","target":"concepts/energy-constraints.md","weight":5,"mutual":true},{"source":"concepts/bottleneck-model-2030.md","target":"entities/tsmc.md","weight":3,"mutual":true},{"source":"concepts/bottleneck-model-2030.md","target":"concepts/hbm-market.md","weight":2,"mutual":true},{"source":"concepts/bottleneck-model-2030.md","target":"strategies/invariant/rs9-demand-inflection-sensing.md","weight":3,"mutual":true},{"source":"concepts/ai-demand-sustainability.md","target":"concepts/bottleneck-model-2030.md","weight":1,"mutual":false},{"source":"concepts/bottleneck-model-2030.md","target":"concepts/dram-antitrust-litigation.md","weight":2,"mutual":true},{"source":"concepts/bottleneck-model-2030.md","target":"scenarios/scenario-B.md","weight":1,"mutual":false},{"source":"concepts/bottleneck-model-2030.md","target":"scenarios/scenario-A.md","weight":1,"mutual":false},{"source":"concepts/bottleneck-model-2030.md","target":"scenarios/scenario-C.md","weight":1,"mutual":false},{"source":"concepts/customer-co-design-anthropic.md","target":"strategies/core/current-state-mb4-custom-ai-memory.md","weight":2,"mutual":true},{"source":"concepts/customer-co-design-anthropic.md","target":"entities/samsung.md","weight":3,"mutual":true},{"source":"concepts/customer-co-design-anthropic.md","target":"strategies/invariant/rs8-structured-revenue-hedging.md","weight":1,"mutual":false},{"source":"concepts/customer-co-design-anthropic.md","target":"concepts/lta-to-sca-transition.md","weight":2,"mutual":true},{"source":"concepts/customer-co-design-anthropic.md","target":"strategies/dev-org-transformation.md","weight":3,"mutual":true},{"source":"concepts/ai-datacenter-buildout.md","target":"concepts/demand-inflection-ewi.md","weight":2,"mutual":false},{"source":"concepts/demand-inflection-ewi.md","target":"concepts/semiconductor-cycle.md","weight":3,"mutual":true},{"source":"concepts/ai-demand-sustainability.md","target":"concepts/demand-inflection-ewi.md","weight":1,"mutual":false},{"source":"concepts/ai-capex.md","target":"concepts/demand-inflection-ewi.md","weight":2,"mutual":false},{"source":"concepts/ai-server-demand.md","target":"concepts/demand-inflection-ewi.md","weight":2,"mutual":false},{"source":"concepts/demand-inflection-ewi.md","target":"entities/cxmt.md","weight":2,"mutual":false},{"source":"concepts/demand-inflection-ewi.md","target":"entities/micron.md","weight":1,"mutual":false},{"source":"concepts/demand-inflection-ewi.md","target":"driving-forces/key-drivers.md","weight":2,"mutual":true},{"source":"concepts/demand-inflection-ewi.md","target":"concepts/price-trends.md","weight":2,"mutual":true},{"source":"concepts/dram-antitrust-litigation.md","target":"entities/samsung.md","weight":2,"mutual":true},{"source":"concepts/dram-antitrust-litigation.md","target":"entities/sk-hynix.md","weight":1,"mutual":false},{"source":"concepts/dram-antitrust-litigation.md","target":"entities/micron.md","weight":2,"mutual":true},{"source":"concepts/dram-market-share.md","target":"entities/samsung.md","weight":3,"mutual":true},{"source":"concepts/dram-market-share.md","target":"entities/sk-hynix.md","weight":1,"mutual":false},{"source":"concepts/dram-market-share.md","target":"concepts/hbm-market.md","weight":1,"mutual":false},{"source":"concepts/dram-antitrust-litigation.md","target":"concepts/dram-market-share.md","weight":1,"mutual":false},{"source":"concepts/dram-technology.md","target":"concepts/ssd-ufs-market.md","weight":1,"mutual":false},{"source":"concepts/embedded-software-monetization.md","target":"entities/samsung.md","weight":2,"mutual":true},{"source":"concepts/dram-technology.md","target":"concepts/emerging-tech.md","weight":1,"mutual":false},{"source":"concepts/emerging-tech.md","target":"strategies/core/current-state-mb4-custom-ai-memory.md","weight":1,"mutual":false},{"source":"concepts/emerging-tech.md","target":"entities/samsung.md","weight":1,"mutual":false},{"source":"concepts/emerging-tech.md","target":"strategies/core/current-state-se2-cxl-sig-leadership.md","weight":4,"mutual":true},{"source":"concepts/emerging-tech.md","target":"strategies/core/current-state-se1-3d-dram-imec-ma.md","weight":1,"mutual":false},{"source":"concepts/hbm-market.md","target":"strategies/core/current-state-mb4-custom-ai-memory.md","weight":4,"mutual":true},{"source":"concepts/hbm-market.md","target":"scenarios/scenario-B.md","weight":2,"mutual":true},{"source":"concepts/hbm-roadmap.md","target":"entities/samsung.md","weight":3,"mutual":true},{"source":"concepts/hbm-roadmap.md","target":"entities/sk-hynix.md","weight":2,"mutual":true},{"source":"concepts/emerging-tech.md","target":"concepts/hbm-roadmap.md","weight":1,"mutual":false},{"source":"concepts/hbm-market.md","target":"concepts/hbm-roadmap.md","weight":1,"mutual":false},{"source":"concepts/lta-to-sca-transition.md","target":"strategies/core/current-state-mb4-custom-ai-memory.md","weight":2,"mutual":true},{"source":"concepts/lta-to-sca-transition.md","target":"strategies/invariant/rs3-customer-switching-cost.md","weight":2,"mutual":true},{"source":"concepts/lta-to-sca-transition.md","target":"strategies/invariant/rs8-structured-revenue-hedging.md","weight":2,"mutual":true},{"source":"concepts/lta-to-sca-transition.md","target":"strategies/dev-org-transformation.md","weight":2,"mutual":true},{"source":"concepts/memory-market-overview.md","target":"strategies/invariant/rs1-options-based-capacity.md","weight":1,"mutual":false},{"source":"concepts/memory-market-overview.md","target":"strategies/invariant/rs5-financial-discipline-reinvestment.md","weight":1,"mutual":false},{"source":"concepts/price-trends.md","target":"strategies/invariant/rs2-barbell-portfolio.md","weight":1,"mutual":false},{"source":"concepts/price-trends.md","target":"strategies/invariant/rs1-options-based-capacity.md","weight":4,"mutual":true},{"source":"concepts/price-trends.md","target":"strategies/invariant/rs5-financial-discipline-reinvestment.md","weight":1,"mutual":false},{"source":"concepts/price-trends.md","target":"concepts/semiconductor-cycle.md","weight":1,"mutual":false},{"source":"concepts/space-semiconductor.md","target":"strategies/core/current-state-sd2-industrial-ai-memory.md","weight":2,"mutual":true},{"source":"concepts/space-semiconductor.md","target":"strategies/invariant/rs2-barbell-portfolio.md","weight":2,"mutual":true},{"source":"concepts/ssd-ufs-market.md","target":"entities/nvidia-cmx-scada.md","weight":1,"mutual":false},{"source":"concepts/nand-process-transition.md","target":"concepts/ssd-ufs-market.md","weight":1,"mutual":false},{"source":"concepts/us-export-controls.md","target":"driving-forces/key-drivers.md","weight":2,"mutual":true},{"source":"concepts/us-export-controls.md","target":"entities/cxmt.md","weight":3,"mutual":true},{"source":"concepts/us-export-controls.md","target":"entities/china-competitors.md","weight":3,"mutual":true},{"source":"driving-forces/impact-uncertainty-matrix.md","target":"steep/social.md","weight":2,"mutual":true},{"source":"driving-forces/impact-uncertainty-matrix.md","target":"steep/technology.md","weight":2,"mutual":true},{"source":"driving-forces/impact-uncertainty-matrix.md","target":"steep/environment.md","weight":2,"mutual":true},{"source":"driving-forces/impact-uncertainty-matrix.md","target":"steep/economy.md","weight":1,"mutual":false},{"source":"driving-forces/impact-uncertainty-matrix.md","target":"steep/political.md","weight":2,"mutual":true},{"source":"driving-forces/impact-uncertainty-matrix.md","target":"driving-forces/key-drivers.md","weight":2,"mutual":true},{"source":"driving-forces/impact-uncertainty-matrix.md","target":"scenarios/scenario-matrix.md","weight":1,"mutual":false},{"source":"concepts/price-trends.md","target":"driving-forces/key-drivers.md","weight":1,"mutual":false},{"source":"concepts/lta-to-sca-transition.md","target":"driving-forces/key-drivers.md","weight":1,"mutual":false},{"source":"driving-forces/key-drivers.md","target":"entities/micron.md","weight":1,"mutual":false},{"source":"driving-forces/key-drivers.md","target":"entities/cxmt.md","weight":2,"mutual":true},{"source":"entities/china-competitors.md","target":"entities/cxmt.md","weight":7,"mutual":true},{"source":"entities/china-competitors.md","target":"entities/ymtc.md","weight":5,"mutual":true},{"source":"concepts/china-policy.md","target":"entities/china-competitors.md","weight":2,"mutual":false},{"source":"entities/china-competitors.md","target":"strategies/invariant/rs2-barbell-portfolio.md","weight":3,"mutual":true},{"source":"entities/china-competitors.md","target":"strategies/invariant/rs6-process-leadership.md","weight":2,"mutual":true},{"source":"entities/china-competitors.md","target":"strategies/invariant/rs7-ai-engineering-automation.md","weight":1,"mutual":false},{"source":"concepts/dram-market-share.md","target":"entities/china-competitors.md","weight":1,"mutual":false},{"source":"concepts/nand-process-transition.md","target":"entities/china-competitors.md","weight":1,"mutual":false},{"source":"entities/china-competitors.md","target":"scenarios/scenario-C.md","weight":1,"mutual":false},{"source":"concepts/chips-act.md","target":"entities/cxmt.md","weight":1,"mutual":false},{"source":"concepts/china-policy.md","target":"entities/cxmt.md","weight":2,"mutual":false},{"source":"entities/cxmt.md","target":"entities/ymtc.md","weight":2,"mutual":true},{"source":"concepts/dram-market-share.md","target":"entities/cxmt.md","weight":1,"mutual":false},{"source":"entities/cxmt.md","target":"scenarios/scenario-C.md","weight":3,"mutual":true},{"source":"entities/cxmt.md","target":"strategies/invariant/rs2-barbell-portfolio.md","weight":4,"mutual":false},{"source":"entities/cxmt.md","target":"scenarios/scenario-D.md","weight":3,"mutual":true},{"source":"entities/cxmt.md","target":"strategies/invariant/rs4-customer-portfolio-diversification.md","weight":2,"mutual":true},{"source":"concepts/hbm-market.md","target":"entities/micron.md","weight":1,"mutual":false},{"source":"entities/micron.md","target":"scenarios/scenario-B.md","weight":1,"mutual":false},{"source":"concepts/semiconductor-cycle.md","target":"entities/micron.md","weight":2,"mutual":false},{"source":"concepts/price-trends.md","target":"entities/micron.md","weight":2,"mutual":false},{"source":"entities/micron.md","target":"strategies/invariant/rs1-options-based-capacity.md","weight":1,"mutual":false},{"source":"entities/micron.md","target":"strategies/invariant/rs5-financial-discipline-reinvestment.md","weight":1,"mutual":false},{"source":"entities/micron.md","target":"strategies/invariant/rs8-structured-revenue-hedging.md","weight":2,"mutual":false},{"source":"concepts/chips-act.md","target":"entities/micron.md","weight":1,"mutual":false},{"source":"entities/micron.md","target":"strategies/core/current-state-sd2-industrial-ai-memory.md","weight":1,"mutual":false},{"source":"concepts/customer-co-design-anthropic.md","target":"entities/micron.md","weight":2,"mutual":false},{"source":"concepts/lta-to-sca-transition.md","target":"entities/micron.md","weight":1,"mutual":false},{"source":"entities/micron.md","target":"strategies/dev-org-transformation.md","weight":1,"mutual":false},{"source":"entities/nvidia-cmx-scada.md","target":"entities/nvidia.md","weight":3,"mutual":false},{"source":"concepts/hbm-market.md","target":"entities/nvidia.md","weight":3,"mutual":false},{"source":"concepts/hbm-roadmap.md","target":"entities/nvidia.md","weight":2,"mutual":false},{"source":"concepts/ai-capex.md","target":"entities/nvidia.md","weight":2,"mutual":false},{"source":"concepts/ai-server-demand.md","target":"entities/nvidia.md","weight":2,"mutual":false},{"source":"concepts/ssd-ufs-market.md","target":"entities/nvidia.md","weight":2,"mutual":false},{"source":"entities/nvidia.md","target":"scenarios/strategy.md","weight":1,"mutual":false},{"source":"concepts/ai-demand-sustainability.md","target":"entities/nvidia.md","weight":1,"mutual":false},{"source":"entities/nvidia.md","target":"strategies/core/current-state-se3-vertical-ascent.md","weight":1,"mutual":false},{"source":"entities/nvidia.md","target":"strategies/core/current-state-mb4-custom-ai-memory.md","weight":2,"mutual":false},{"source":"entities/nvidia.md","target":"strategies/invariant/rs3-customer-switching-cost.md","weight":2,"mutual":false},{"source":"entities/nvidia.md","target":"strategies/invariant/rs4-customer-portfolio-diversification.md","weight":2,"mutual":false},{"source":"entities/nvidia.md","target":"entities/samsung.md","weight":2,"mutual":true},{"source":"entities/nvidia.md","target":"entities/sk-hynix.md","weight":1,"mutual":false},{"source":"entities/micron.md","target":"entities/nvidia.md","weight":1,"mutual":false},{"source":"concepts/2026-q1-current-state.md","target":"entities/samsung.md","weight":2,"mutual":false},{"source":"concepts/hbm-market.md","target":"entities/samsung.md","weight":2,"mutual":false},{"source":"entities/samsung.md","target":"strategies/core/current-state-se3-vertical-ascent.md","weight":1,"mutual":false},{"source":"entities/samsung.md","target":"scenarios/scenario-matrix.md","weight":1,"mutual":false},{"source":"entities/samsung.md","target":"scenarios/strategy.md","weight":2,"mutual":false},{"source":"entities/samsung.md","target":"strategies/core/README.md","weight":1,"mutual":false},{"source":"entities/samsung.md","target":"entities/sk-hynix.md","weight":2,"mutual":true},{"source":"entities/micron.md","target":"entities/samsung.md","weight":1,"mutual":false},{"source":"entities/cxmt.md","target":"entities/samsung.md","weight":1,"mutual":false},{"source":"entities/samsung.md","target":"entities/ymtc.md","weight":1,"mutual":false},{"source":"entities/samsung.md","target":"entities/tsmc.md","weight":3,"mutual":true},{"source":"concepts/chips-act.md","target":"entities/samsung.md","weight":1,"mutual":false},{"source":"concepts/korea-policy.md","target":"entities/samsung.md","weight":1,"mutual":false},{"source":"concepts/us-export-controls.md","target":"entities/samsung.md","weight":1,"mutual":false},{"source":"entities/samsung.md","target":"scenarios/scenario-A.md","weight":1,"mutual":false},{"source":"entities/samsung.md","target":"scenarios/scenario-B.md","weight":5,"mutual":true},{"source":"entities/samsung.md","target":"scenarios/scenario-C.md","weight":1,"mutual":false},{"source":"entities/samsung.md","target":"scenarios/scenario-D.md","weight":1,"mutual":false},{"source":"entities/samsung.md","target":"scenarios/scenario-E.md","weight":1,"mutual":false},{"source":"concepts/dram-technology.md","target":"entities/samsung.md","weight":2,"mutual":false},{"source":"entities/samsung.md","target":"strategies/core/current-state-mb4-custom-ai-memory.md","weight":1,"mutual":false},{"source":"entities/samsung.md","target":"strategies/core/current-state-sd1-hbm-pnl-spinoff.md","weight":1,"mutual":false},{"source":"concepts/space-semiconductor.md","target":"entities/samsung.md","weight":1,"mutual":false},{"source":"concepts/lta-to-sca-transition.md","target":"entities/samsung.md","weight":2,"mutual":false},{"source":"entities/samsung.md","target":"strategies/dev-org-transformation.md","weight":2,"mutual":false},{"source":"driving-forces/key-drivers.md","target":"entities/samsung.md","weight":1,"mutual":false},{"source":"concepts/emerging-tech.md","target":"entities/sk-hynix.md","weight":1,"mutual":false},{"source":"concepts/hbm-market.md","target":"entities/sk-hynix.md","weight":1,"mutual":false},{"source":"concepts/customer-co-design-anthropic.md","target":"entities/sk-hynix.md","weight":1,"mutual":false},{"source":"concepts/chips-act.md","target":"entities/tsmc.md","weight":2,"mutual":false},{"source":"entities/tsmc.md","target":"strategies/invariant/rs7-ai-engineering-automation.md","weight":2,"mutual":false},{"source":"concepts/nand-process-transition.md","target":"entities/tsmc.md","weight":2,"mutual":false},{"source":"entities/tsmc.md","target":"strategies/core/current-state-mb4-custom-ai-memory.md","weight":1,"mutual":false},{"source":"entities/tsmc.md","target":"strategies/core/current-state-sd1-hbm-pnl-spinoff.md","weight":2,"mutual":false},{"source":"entities/tsmc.md","target":"strategies/invariant/rs6-process-leadership.md","weight":1,"mutual":false},{"source":"concepts/hbm-roadmap.md","target":"entities/tsmc.md","weight":1,"mutual":false},{"source":"entities/sk-hynix.md","target":"entities/tsmc.md","weight":1,"mutual":false},{"source":"concepts/nand-process-transition.md","target":"entities/ymtc.md","weight":2,"mutual":false},{"source":"concepts/china-policy.md","target":"entities/ymtc.md","weight":2,"mutual":false},{"source":"entities/ymtc.md","target":"strategies/core/current-state-sd1-hbm-pnl-spinoff.md","weight":1,"mutual":false},{"source":"entities/ymtc.md","target":"strategies/core/current-state-sd2-industrial-ai-memory.md","weight":1,"mutual":false},{"source":"concepts/us-export-controls.md","target":"entities/ymtc.md","weight":1,"mutual":false},{"source":"entities/ymtc.md","target":"strategies/invariant/rs7-ai-engineering-automation.md","weight":2,"mutual":true},{"source":"scenarios/scenario-C.md","target":"strategies/core/current-state-se3-vertical-ascent.md","weight":1,"mutual":false},{"source":"scenarios/scenario-D.md","target":"strategies/invariant/rs2-barbell-portfolio.md","weight":2,"mutual":false},{"source":"scenarios/scenario-C.md","target":"scenarios/scenario-D.md","weight":1,"mutual":false},{"source":"scenarios/scenario-D.md","target":"strategies/invariant/rs4-customer-portfolio-diversification.md","weight":1,"mutual":false},{"source":"scenarios/robust-reverification.md","target":"scenarios/strategy.md","weight":2,"mutual":false},{"source":"scenarios/strategy.md","target":"strategies/core/current-state-se3-vertical-ascent.md","weight":2,"mutual":true},{"source":"scenarios/strategy.md","target":"strategies/invariant/rs8-structured-revenue-hedging.md","weight":2,"mutual":false},{"source":"scenarios/strategy.md","target":"strategies/invariant/rs7-ai-engineering-automation.md","weight":2,"mutual":true},{"source":"driving-forces/key-drivers.md","target":"steep/environment.md","weight":1,"mutual":false},{"source":"driving-forces/key-drivers.md","target":"steep/political.md","weight":1,"mutual":false},{"source":"concepts/us-export-controls.md","target":"steep/political.md","weight":1,"mutual":false},{"source":"entities/china-competitors.md","target":"steep/political.md","weight":1,"mutual":false},{"source":"driving-forces/key-drivers.md","target":"steep/social.md","weight":1,"mutual":false},{"source":"driving-forces/key-drivers.md","target":"steep/technology.md","weight":1,"mutual":false},{"source":"scenarios/core-strategy-selection.md","target":"strategies/core/README.md","weight":1,"mutual":false},{"source":"scenarios/strategy.md","target":"strategies/core/README.md","weight":1,"mutual":false},{"source":"strategies/core/README.md","target":"strategies/core/current-state-mb4-custom-ai-memory.md","weight":1,"mutual":false},{"source":"strategies/core/README.md","target":"strategies/core/current-state-rs3-customer-switching-cost.md","weight":1,"mutual":false},{"source":"strategies/core/README.md","target":"strategies/core/current-state-rs6-process-leadership.md","weight":1,"mutual":false},{"source":"strategies/core/README.md","target":"strategies/core/current-state-mb2-east-west-supply.md","weight":1,"mutual":false},{"source":"strategies/core/README.md","target":"strategies/core/current-state-sd1-hbm-pnl-spinoff.md","weight":1,"mutual":false},{"source":"strategies/core/README.md","target":"strategies/core/current-state-rs5-financial-discipline.md","weight":1,"mutual":false},{"source":"strategies/core/README.md","target":"strategies/core/current-state-sa2-japan-rd-hub-nil.md","weight":1,"mutual":false},{"source":"strategies/core/README.md","target":"strategies/core/current-state-sd2-industrial-ai-memory.md","weight":1,"mutual":false},{"source":"strategies/core/README.md","target":"strategies/core/current-state-se1-3d-dram-imec-ma.md","weight":1,"mutual":false},{"source":"strategies/core/README.md","target":"strategies/core/current-state-se2-cxl-sig-leadership.md","weight":1,"mutual":false},{"source":"strategies/core/README.md","target":"strategies/core/current-state-se3-vertical-ascent.md","weight":1,"mutual":false},{"source":"concepts/dram-market-share.md","target":"strategies/core/current-state-mb2-east-west-supply.md","weight":3,"mutual":false},{"source":"concepts/us-export-controls.md","target":"strategies/core/current-state-mb2-east-west-supply.md","weight":2,"mutual":false},{"source":"concepts/chips-act.md","target":"strategies/core/current-state-mb2-east-west-supply.md","weight":1,"mutual":false},{"source":"concepts/2026-q1-current-state.md","target":"strategies/core/current-state-mb2-east-west-supply.md","weight":1,"mutual":false},{"source":"entities/nvidia-cmx-scada.md","target":"strategies/core/current-state-mb4-custom-ai-memory.md","weight":3,"mutual":false},{"source":"concepts/2026-q1-current-state.md","target":"strategies/core/current-state-mb4-custom-ai-memory.md","weight":2,"mutual":false},{"source":"concepts/semiconductor-cycle.md","target":"strategies/core/current-state-mb4-custom-ai-memory.md","weight":1,"mutual":false},{"source":"entities/sk-hynix.md","target":"strategies/core/current-state-mb4-custom-ai-memory.md","weight":1,"mutual":false},{"source":"strategies/core/current-state-mb4-custom-ai-memory.md","target":"strategies/core/current-state-se2-cxl-sig-leadership.md","weight":2,"mutual":true},{"source":"concepts/embedded-software-monetization.md","target":"strategies/core/current-state-mb4-custom-ai-memory.md","weight":1,"mutual":false},{"source":"strategies/core/current-state-mb4-custom-ai-memory.md","target":"strategies/dev-org-transformation.md","weight":2,"mutual":true},{"source":"entities/nvidia-cmx-scada.md","target":"strategies/core/current-state-rs3-customer-switching-cost.md","weight":3,"mutual":false},{"source":"concepts/hbm-market.md","target":"strategies/core/current-state-rs3-customer-switching-cost.md","weight":1,"mutual":false},{"source":"concepts/semiconductor-cycle.md","target":"strategies/core/current-state-rs5-financial-discipline.md","weight":3,"mutual":false},{"source":"entities/sk-hynix.md","target":"strategies/core/current-state-rs5-financial-discipline.md","weight":2,"mutual":false},{"source":"benchmark/cyclical-strategy-benchmark.md","target":"strategies/core/current-state-rs5-financial-discipline.md","weight":4,"mutual":false},{"source":"concepts/2026-q1-current-state.md","target":"strategies/core/current-state-rs5-financial-discipline.md","weight":1,"mutual":false},{"source":"concepts/dram-market-share.md","target":"strategies/core/current-state-rs6-process-leadership.md","weight":1,"mutual":false},{"source":"concepts/nand-process-transition.md","target":"strategies/core/current-state-rs6-process-leadership.md","weight":1,"mutual":false},{"source":"entities/sk-hynix.md","target":"strategies/core/current-state-rs6-process-leadership.md","weight":1,"mutual":false},{"source":"concepts/korea-policy.md","target":"strategies/core/current-state-sa2-japan-rd-hub-nil.md","weight":2,"mutual":false},{"source":"concepts/us-export-controls.md","target":"strategies/core/current-state-sa2-japan-rd-hub-nil.md","weight":1,"mutual":false},{"source":"entities/sk-hynix.md","target":"strategies/core/current-state-sd1-hbm-pnl-spinoff.md","weight":2,"mutual":false},{"source":"concepts/nand-process-transition.md","target":"strategies/core/current-state-sd1-hbm-pnl-spinoff.md","weight":2,"mutual":false},{"source":"entities/micron.md","target":"strategies/core/current-state-sd1-hbm-pnl-spinoff.md","weight":1,"mutual":false},{"source":"benchmark/cyclical-strategy-benchmark.md","target":"strategies/core/current-state-sd2-industrial-ai-memory.md","weight":2,"mutual":false},{"source":"scenarios/scenario-E.md","target":"strategies/core/current-state-se1-3d-dram-imec-ma.md","weight":1,"mutual":false},{"source":"concepts/dram-technology.md","target":"strategies/core/current-state-se1-3d-dram-imec-ma.md","weight":1,"mutual":false},{"source":"scenarios/scenario-E.md","target":"strategies/core/current-state-se2-cxl-sig-leadership.md","weight":1,"mutual":false},{"source":"strategies/core/current-state-rs5-financial-discipline.md","target":"strategies/core/current-state-se3-vertical-ascent.md","weight":1,"mutual":false},{"source":"strategies/core/current-state-mb2-east-west-supply.md","target":"strategies/core/current-state-se3-vertical-ascent.md","weight":1,"mutual":false},{"source":"strategies/core/current-state-se2-cxl-sig-leadership.md","target":"strategies/core/current-state-se3-vertical-ascent.md","weight":1,"mutual":false},{"source":"concepts/embedded-software-monetization.md","target":"strategies/dev-org-transformation.md","weight":2,"mutual":false},{"source":"strategies/dev-org-transformation.md","target":"strategies/invariant/rs8-structured-revenue-hedging.md","weight":3,"mutual":true},{"source":"strategies/dev-org-transformation.md","target":"strategies/invariant/rs3-customer-switching-cost.md","weight":3,"mutual":true},{"source":"strategies/dev-org-transformation.md","target":"strategies/invariant/rs9-demand-inflection-sensing.md","weight":3,"mutual":true},{"source":"strategies/dev-org-transformation.md","target":"strategies/invariant/rs7-ai-engineering-automation.md","weight":3,"mutual":true},{"source":"strategies/dev-org-transformation.md","target":"strategies/fdp-host-ssd-platform.md","weight":4,"mutual":true},{"source":"concepts/lta-to-sca-transition.md","target":"strategies/fdp-host-ssd-platform.md","weight":1,"mutual":false},{"source":"strategies/fdp-host-ssd-platform.md","target":"strategies/invariant/rs3-customer-switching-cost.md","weight":1,"mutual":false},{"source":"strategies/fdp-host-ssd-platform.md","target":"strategies/invariant/rs8-structured-revenue-hedging.md","weight":1,"mutual":false},{"source":"concepts/embedded-software-monetization.md","target":"strategies/fdp-host-ssd-platform.md","weight":1,"mutual":false},{"source":"concepts/customer-co-design-anthropic.md","target":"strategies/fdp-host-ssd-platform.md","weight":1,"mutual":false},{"source":"scenarios/robust-reverification.md","target":"strategies/invariant/README.md","weight":1,"mutual":false},{"source":"scenarios/strategy.md","target":"strategies/invariant/README.md","weight":1,"mutual":false},{"source":"strategies/invariant/README.md","target":"strategies/invariant/rs1-options-based-capacity.md","weight":1,"mutual":false},{"source":"strategies/invariant/README.md","target":"strategies/invariant/rs2-barbell-portfolio.md","weight":1,"mutual":false},{"source":"strategies/invariant/README.md","target":"strategies/invariant/rs3-customer-switching-cost.md","weight":1,"mutual":false},{"source":"strategies/invariant/README.md","target":"strategies/invariant/rs4-customer-portfolio-diversification.md","weight":1,"mutual":false},{"source":"strategies/invariant/README.md","target":"strategies/invariant/rs5-financial-discipline-reinvestment.md","weight":1,"mutual":false},{"source":"strategies/invariant/README.md","target":"strategies/invariant/rs6-process-leadership.md","weight":1,"mutual":false},{"source":"strategies/invariant/README.md","target":"strategies/invariant/rs7-ai-engineering-automation.md","weight":1,"mutual":false},{"source":"strategies/invariant/README.md","target":"strategies/invariant/rs8-structured-revenue-hedging.md","weight":1,"mutual":false},{"source":"strategies/invariant/README.md","target":"strategies/invariant/rs9-demand-inflection-sensing.md","weight":1,"mutual":false},{"source":"concepts/nand-process-transition.md","target":"strategies/invariant/rs1-options-based-capacity.md","weight":2,"mutual":false},{"source":"benchmark/cyclical-strategy-benchmark.md","target":"strategies/invariant/rs1-options-based-capacity.md","weight":4,"mutual":false},{"source":"concepts/hbm-market.md","target":"strategies/invariant/rs1-options-based-capacity.md","weight":2,"mutual":false},{"source":"scenarios/strategy.md","target":"strategies/invariant/rs1-options-based-capacity.md","weight":1,"mutual":false},{"source":"concepts/semiconductor-cycle.md","target":"strategies/invariant/rs1-options-based-capacity.md","weight":2,"mutual":false},{"source":"concepts/hbm-market.md","target":"strategies/invariant/rs2-barbell-portfolio.md","weight":4,"mutual":false},{"source":"concepts/dram-market-share.md","target":"strategies/invariant/rs2-barbell-portfolio.md","weight":2,"mutual":false},{"source":"benchmark/cyclical-strategy-benchmark.md","target":"strategies/invariant/rs2-barbell-portfolio.md","weight":2,"mutual":false},{"source":"entities/micron.md","target":"strategies/invariant/rs2-barbell-portfolio.md","weight":3,"mutual":false},{"source":"scenarios/strategy.md","target":"strategies/invariant/rs2-barbell-portfolio.md","weight":1,"mutual":false},{"source":"entities/sk-hynix.md","target":"strategies/invariant/rs2-barbell-portfolio.md","weight":1,"mutual":false},{"source":"concepts/dram-technology.md","target":"strategies/invariant/rs2-barbell-portfolio.md","weight":1,"mutual":false},{"source":"strategies/core/current-state-sd2-industrial-ai-memory.md","target":"strategies/invariant/rs2-barbell-portfolio.md","weight":1,"mutual":false},{"source":"strategies/core/current-state-mb4-custom-ai-memory.md","target":"strategies/invariant/rs2-barbell-portfolio.md","weight":1,"mutual":false},{"source":"concepts/used-semiconductor-market.md","target":"strategies/invariant/rs2-barbell-portfolio.md","weight":1,"mutual":false},{"source":"scenarios/strategy.md","target":"strategies/invariant/rs3-customer-switching-cost.md","weight":3,"mutual":false},{"source":"concepts/hbm-market.md","target":"strategies/invariant/rs3-customer-switching-cost.md","weight":2,"mutual":false},{"source":"entities/sk-hynix.md","target":"strategies/invariant/rs3-customer-switching-cost.md","weight":2,"mutual":false},{"source":"entities/nvidia-cmx-scada.md","target":"strategies/invariant/rs3-customer-switching-cost.md","weight":3,"mutual":false},{"source":"concepts/dram-market-share.md","target":"strategies/invariant/rs4-customer-portfolio-diversification.md","weight":3,"mutual":false},{"source":"concepts/hbm-market.md","target":"strategies/invariant/rs4-customer-portfolio-diversification.md","weight":2,"mutual":false},{"source":"benchmark/cyclical-strategy-benchmark.md","target":"strategies/invariant/rs4-customer-portfolio-diversification.md","weight":3,"mutual":false},{"source":"entities/sk-hynix.md","target":"strategies/invariant/rs4-customer-portfolio-diversification.md","weight":2,"mutual":false},{"source":"strategies/invariant/rs3-customer-switching-cost.md","target":"strategies/invariant/rs4-customer-portfolio-diversification.md","weight":1,"mutual":false},{"source":"scenarios/strategy.md","target":"strategies/invariant/rs4-customer-portfolio-diversification.md","weight":1,"mutual":false},{"source":"concepts/2026-q1-current-state.md","target":"strategies/invariant/rs4-customer-portfolio-diversification.md","weight":1,"mutual":false},{"source":"concepts/semiconductor-cycle.md","target":"strategies/invariant/rs5-financial-discipline-reinvestment.md","weight":3,"mutual":false},{"source":"entities/sk-hynix.md","target":"strategies/invariant/rs5-financial-discipline-reinvestment.md","weight":5,"mutual":false},{"source":"benchmark/cyclical-strategy-benchmark.md","target":"strategies/invariant/rs5-financial-discipline-reinvestment.md","weight":4,"mutual":false},{"source":"concepts/2026-q1-current-state.md","target":"strategies/invariant/rs5-financial-discipline-reinvestment.md","weight":3,"mutual":false},{"source":"scenarios/strategy.md","target":"strategies/invariant/rs5-financial-discipline-reinvestment.md","weight":1,"mutual":false},{"source":"concepts/dram-market-share.md","target":"strategies/invariant/rs5-financial-discipline-reinvestment.md","weight":1,"mutual":false},{"source":"concepts/hbm-market.md","target":"strategies/invariant/rs5-financial-discipline-reinvestment.md","weight":1,"mutual":false},{"source":"strategies/core/current-state-sd1-hbm-pnl-spinoff.md","target":"strategies/invariant/rs5-financial-discipline-reinvestment.md","weight":1,"mutual":false},{"source":"concepts/demand-inflection-ewi.md","target":"strategies/invariant/rs5-financial-discipline-reinvestment.md","weight":1,"mutual":false},{"source":"concepts/dram-antitrust-litigation.md","target":"strategies/invariant/rs5-financial-discipline-reinvestment.md","weight":1,"mutual":false},{"source":"concepts/nand-process-transition.md","target":"strategies/invariant/rs6-process-leadership.md","weight":2,"mutual":false},{"source":"scenarios/strategy.md","target":"strategies/invariant/rs6-process-leadership.md","weight":3,"mutual":false},{"source":"concepts/dram-technology.md","target":"strategies/invariant/rs6-process-leadership.md","weight":1,"mutual":false},{"source":"entities/sk-hynix.md","target":"strategies/invariant/rs6-process-leadership.md","weight":1,"mutual":false},{"source":"scenarios/robust-reverification.md","target":"strategies/invariant/rs7-ai-engineering-automation.md","weight":1,"mutual":false},{"source":"concepts/nand-process-transition.md","target":"strategies/invariant/rs7-ai-engineering-automation.md","weight":1,"mutual":false},{"source":"concepts/demand-inflection-ewi.md","target":"strategies/invariant/rs9-demand-inflection-sensing.md","weight":2,"mutual":false},{"source":"concepts/ai-datacenter-buildout.md","target":"strategies/invariant/rs9-demand-inflection-sensing.md","weight":3,"mutual":false},{"source":"concepts/price-trends.md","target":"strategies/invariant/rs9-demand-inflection-sensing.md","weight":1,"mutual":false},{"source":"concepts/ai-server-demand.md","target":"strategies/invariant/rs9-demand-inflection-sensing.md","weight":1,"mutual":false},{"source":"strategies/invariant/rs1-options-based-capacity.md","target":"strategies/invariant/rs9-demand-inflection-sensing.md","weight":1,"mutual":false},{"source":"strategies/invariant/rs5-financial-discipline-reinvestment.md","target":"strategies/invariant/rs9-demand-inflection-sensing.md","weight":1,"mutual":false}],
  stats: {
  "nodeCount": 81,
  "edgeCount": 318,
  "mutualEdges": 74,
  "avgDegree": 7.9,
  "byCategory": {
    "benchmark": 3,
    "concepts": 29,
    "driving-forces": 2,
    "entities": 9,
    "scenarios": 9,
    "steep": 5,
    "strategies": 24
  },
  "hubs": [
    {
      "id": "entities/samsung.md",
      "title": "Samsung Electronics — 메모리사업부 (DS 부문)",
      "degree": 42,
      "inDegree": 10
    },
    {
      "id": "concepts/hbm-market.md",
      "title": "HBM(High Bandwidth Memory) 시장 규모 및 성장률",
      "degree": 22,
      "inDegree": 18
    },
    {
      "id": "strategies/core/current-state-mb4-custom-ai-memory.md",
      "title": "현황 분석: MB-4 커스텀 AI 메모리 솔루션",
      "degree": 22,
      "inDegree": 12
    },
    {
      "id": "concepts/bottleneck-model-2030.md",
      "title": "2030 병목 정량 모델 (Bottleneck Model 2030)",
      "degree": 20,
      "inDegree": 8
    },
    {
      "id": "entities/cxmt.md",
      "title": "CXMT (창신메모리 / 长鑫存储) — DRAM 전문",
      "degree": 20,
      "inDegree": 9
    },
    {
      "id": "entities/micron.md",
      "title": "Micron Technology 경쟁사 동향",
      "degree": 20,
      "inDegree": 7
    },
    {
      "id": "entities/sk-hynix.md",
      "title": "SK하이닉스 경쟁사 동향",
      "degree": 20,
      "inDegree": 15
    },
    {
      "id": "driving-forces/key-drivers.md",
      "title": "핵심 Driving Forces",
      "degree": 19,
      "inDegree": 11
    }
  ],
  "bounds": {
    "minX": -303.8,
    "minY": -274.3,
    "maxX": 288.7,
    "maxY": 220.2
  }
},
  lint: {
  "orphans": [],
  "isolated": [],
  "asymmetricCount": 244,
  "asymmetric": [
    {
      "from": "concepts/ai-capex.md",
      "to": "concepts/ai-demand-sustainability.md"
    },
    {
      "from": "concepts/ai-capex.md",
      "to": "scenarios/scenario-C.md"
    },
    {
      "from": "concepts/ai-compute-economics-gap.md",
      "to": "concepts/demand-inflection-ewi.md"
    },
    {
      "from": "concepts/ai-compute-economics-gap.md",
      "to": "driving-forces/key-drivers.md"
    },
    {
      "from": "concepts/ai-datacenter-buildout.md",
      "to": "concepts/ai-capex.md"
    },
    {
      "from": "concepts/ai-datacenter-buildout.md",
      "to": "concepts/hbm-market.md"
    },
    {
      "from": "concepts/ai-datacenter-buildout.md",
      "to": "concepts/semiconductor-cycle.md"
    },
    {
      "from": "concepts/ai-datacenter-buildout.md",
      "to": "scenarios/scenario-matrix.md"
    },
    {
      "from": "concepts/ai-datacenter-buildout.md",
      "to": "concepts/ai-demand-sustainability.md"
    },
    {
      "from": "concepts/ai-server-demand.md",
      "to": "concepts/hbm-market.md"
    },
    {
      "from": "concepts/ai-server-demand.md",
      "to": "concepts/dram-technology.md"
    },
    {
      "from": "concepts/ai-server-demand.md",
      "to": "concepts/semiconductor-cycle.md"
    },
    {
      "from": "concepts/ai-server-demand.md",
      "to": "steep/economy.md"
    },
    {
      "from": "concepts/ai-server-demand.md",
      "to": "strategies/core/current-state-mb4-custom-ai-memory.md"
    },
    {
      "from": "concepts/ai-server-demand.md",
      "to": "concepts/bottleneck-model-2030.md"
    },
    {
      "from": "concepts/bottleneck-model-2030.md",
      "to": "concepts/ai-compute-economics-gap.md"
    },
    {
      "from": "concepts/bottleneck-model-2030.md",
      "to": "concepts/ai-demand-sustainability.md"
    },
    {
      "from": "concepts/bottleneck-model-2030.md",
      "to": "scenarios/scenario-B.md"
    },
    {
      "from": "concepts/bottleneck-model-2030.md",
      "to": "scenarios/scenario-A.md"
    },
    {
      "from": "concepts/bottleneck-model-2030.md",
      "to": "scenarios/scenario-C.md"
    },
    {
      "from": "concepts/customer-co-design-anthropic.md",
      "to": "strategies/invariant/rs8-structured-revenue-hedging.md"
    },
    {
      "from": "concepts/demand-inflection-ewi.md",
      "to": "concepts/ai-datacenter-buildout.md"
    },
    {
      "from": "concepts/demand-inflection-ewi.md",
      "to": "concepts/ai-demand-sustainability.md"
    },
    {
      "from": "concepts/demand-inflection-ewi.md",
      "to": "concepts/ai-capex.md"
    },
    {
      "from": "concepts/demand-inflection-ewi.md",
      "to": "concepts/ai-server-demand.md"
    },
    {
      "from": "concepts/demand-inflection-ewi.md",
      "to": "entities/cxmt.md"
    },
    {
      "from": "concepts/demand-inflection-ewi.md",
      "to": "entities/micron.md"
    },
    {
      "from": "concepts/dram-antitrust-litigation.md",
      "to": "entities/sk-hynix.md"
    },
    {
      "from": "concepts/dram-market-share.md",
      "to": "entities/sk-hynix.md"
    },
    {
      "from": "concepts/dram-market-share.md",
      "to": "concepts/hbm-market.md"
    },
    {
      "from": "concepts/dram-market-share.md",
      "to": "concepts/dram-antitrust-litigation.md"
    },
    {
      "from": "concepts/dram-technology.md",
      "to": "concepts/ssd-ufs-market.md"
    },
    {
      "from": "concepts/emerging-tech.md",
      "to": "concepts/dram-technology.md"
    },
    {
      "from": "concepts/emerging-tech.md",
      "to": "strategies/core/current-state-mb4-custom-ai-memory.md"
    },
    {
      "from": "concepts/emerging-tech.md",
      "to": "entities/samsung.md"
    },
    {
      "from": "concepts/emerging-tech.md",
      "to": "strategies/core/current-state-se1-3d-dram-imec-ma.md"
    },
    {
      "from": "concepts/hbm-roadmap.md",
      "to": "concepts/emerging-tech.md"
    },
    {
      "from": "concepts/hbm-roadmap.md",
      "to": "concepts/hbm-market.md"
    },
    {
      "from": "concepts/memory-market-overview.md",
      "to": "strategies/invariant/rs1-options-based-capacity.md"
    },
    {
      "from": "concepts/memory-market-overview.md",
      "to": "strategies/invariant/rs5-financial-discipline-reinvestment.md"
    },
    {
      "from": "concepts/price-trends.md",
      "to": "strategies/invariant/rs2-barbell-portfolio.md"
    },
    {
      "from": "concepts/price-trends.md",
      "to": "strategies/invariant/rs5-financial-discipline-reinvestment.md"
    },
    {
      "from": "concepts/semiconductor-cycle.md",
      "to": "concepts/price-trends.md"
    },
    {
      "from": "concepts/ssd-ufs-market.md",
      "to": "entities/nvidia-cmx-scada.md"
    },
    {
      "from": "concepts/ssd-ufs-market.md",
      "to": "concepts/nand-process-transition.md"
    },
    {
      "from": "driving-forces/impact-uncertainty-matrix.md",
      "to": "steep/economy.md"
    },
    {
      "from": "driving-forces/impact-uncertainty-matrix.md",
      "to": "scenarios/scenario-matrix.md"
    },
    {
      "from": "driving-forces/key-drivers.md",
      "to": "concepts/price-trends.md"
    },
    {
      "from": "driving-forces/key-drivers.md",
      "to": "concepts/lta-to-sca-transition.md"
    },
    {
      "from": "driving-forces/key-drivers.md",
      "to": "entities/micron.md"
    },
    {
      "from": "entities/china-competitors.md",
      "to": "concepts/china-policy.md"
    },
    {
      "from": "entities/china-competitors.md",
      "to": "strategies/invariant/rs7-ai-engineering-automation.md"
    },
    {
      "from": "entities/china-competitors.md",
      "to": "concepts/dram-market-share.md"
    },
    {
      "from": "entities/china-competitors.md",
      "to": "concepts/nand-process-transition.md"
    },
    {
      "from": "entities/china-competitors.md",
      "to": "scenarios/scenario-C.md"
    },
    {
      "from": "entities/cxmt.md",
      "to": "concepts/chips-act.md"
    },
    {
      "from": "entities/cxmt.md",
      "to": "concepts/china-policy.md"
    },
    {
      "from": "entities/cxmt.md",
      "to": "concepts/dram-market-share.md"
    },
    {
      "from": "entities/cxmt.md",
      "to": "strategies/invariant/rs2-barbell-portfolio.md"
    },
    {
      "from": "entities/micron.md",
      "to": "concepts/hbm-market.md"
    }
  ]
},
}
