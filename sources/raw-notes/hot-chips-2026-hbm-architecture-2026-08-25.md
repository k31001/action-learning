# Hot Chips 2026 — 삼성·SK하이닉스 HBM 아키텍처 분기 리서치 (2026-08-25)

수집: 웹 검색(Hot Chips 2026, 학회 발표 2026-08-11경, 매체 보도 2026-08-24~25 집중). 목적: 삼성·SK하이닉스가 "다음 HBM 병목"에 서로 다른 해법을 제시한 정황 확인 — 08-25 정기 시장 점검(직전 커밋 52fc7a1) 완료 직후 짧은 간격에도 신규 확인된 항목이라 별도 소스로 분리.

## 삼성 — 베이스다이 로직화 (zHBM)

- Samsung은 표준 HBM → 커스텀 HBM → **zHBM**으로 이어지는 3단계 진화를 제시. zHBM은 표준 HBM4e 스택 대비 **전력효율 70% 개선·대역폭 230% 향상**을 주장(TrendForce, 2026-08-24). https://www.trendforce.com/news/2026/08/24/news-hot-chips-2026-samsungs-zhbm-claims-70-power-efficiency-gain-sk-hynix-evaluates-intel-emib/
- 메모리는 1c 노드, 로직(베이스다이)은 4nm 노드를 사용해 베이스다이 소비전력을 크게 낮춤 — DRAM을 GPU 등 연산 칩 위에 직접 수직 적층하는 **진정한 3D 통합 아키텍처**를 지향(ServeTheHome·tenbrief 종합). https://tenbrief.com/en/2026/08/11/hot-chips-hbm/
- 이는 2026-08-04~06 FMS 2026에서 공개한 zHBM 목업·"advanced HBM(aHBM)" 구상(위키 기존 baseline)의 후속 구체화 — Hot Chips에서 처음으로 정량 성능 주장(전력효율·대역폭 수치)이 공개됨.

## SK하이닉스 — 패키징·열관리 (i-HBM)

- SK하이닉스는 베이스다이 로직화 대신 **첨단 패키징·열관리**에 집중 — CoWoS-S·CoWoS-L·Intel EMIB(Embedded Multi-die Interconnect Bridge)가 HBM 스택·실리콘 인터포저에 가하는 기계적·열적 스트레스를 비교 평가(Intel EMIB 옵션 검토 확인). https://www.servethehome.com/sk-hynix-hbm-packaging-at-hot-chips-2026/
- **i-HBM**: 열전도율이 높은 전기절연 냉각 소재를 die-to-die PHY 영역(발열 최다 구간)에 내장해 전용 방열 경로를 형성 — 열저항 **30% 이상 감소**를 목표(ServeTheHome).
- **하이브리드본딩 일정**: SK하이닉스는 하이브리드본딩이 HBM4E 시점까지 준비되지 않을 것으로 보고, 업계가 기대하던 패키징 전환을 최소 **HBM5**로 순연 전망 — AI 메모리 스택이 **775마이크론 높이 한계**에 부딪혔다는 문제의식과 함께 제시(Tom's Hardware, 2026-08-25). https://www.tomshardware.com/tech-industry/semiconductors/sk-hynix-says-hybrid-bonding-wont-be-ready-for-hbm4e-as-ai-memory-runs-into-a-775-micron-ceiling
- SK하이닉스는 기존 MR-MUF(Mass Reflow Molded Underfill) 공정을 NVIDIA Rubin 세대까지 확장 적용할 계획 — 이는 08-25 정기점검(bottleneck-model-update-2026-08-25.md)에서 확인한 "업계 전반 마이크로범프 유지·하이브리드본딩 순연" 판단과 정합(같은 결론의 SK하이닉스측 1차 근거).

## 해석 — 삼성·SK 기술 전략 분기

- 두 회사가 **서로 다른 층위의 병목**을 겨냥: 삼성은 "베이스다이에 로직을 얼마나 태울 것인가"(연산-메모리 통합, PIM/CXL 계보와 연결), SK하이닉스는 "적층 높이·발열을 어떻게 물리적으로 관리할 것인가"(패키징 신뢰성)에 베팅.
- 이는 위키 [hbm-roadmap.md의 크리스 밀러 인터뷰 섹션](../../wiki/concepts/hbm-roadmap.md) 논지("HBM은 세대 경쟁과 별개로 아키텍처 계층 경쟁이 존재")의 구체적 실증 사례 — zHBM은 밀러가 언급한 "3D 적층 커스텀" 계보에 정확히 해당.
- 하이브리드본딩 HBM5 순연은 08-25 정기점검에서 이미 확인한 사실(마이크로범프 유지)의 SK하이닉스측 공식 확인 — 새로운 방향 전환은 아니고 기존 판단의 보강.

## 참고 (품질 낮은 2차 출처, 별도 태그)

- X(트위터) 게시물 인용: "삼성·SK하이닉스·Micron이 2027년 DRAM·HBM 생산량을 전량 완판했다"는 보도 — 1차 출처 미확인, 인용 매체(Sammy Fans) 자체가 SNS 게시물 재인용이라 신뢰도 낮음. 위키에 반영하지 않고 참고로만 남김.

## 확인 안됨
- Hot Chips 2026 발표 슬라이드 원문(학회 유료/등록 접근 필요)
- zHBM 70%/230% 수치의 측정 조건(어떤 워크로드·구성 기준인지)
- i-HBM 양산 적용 시점
