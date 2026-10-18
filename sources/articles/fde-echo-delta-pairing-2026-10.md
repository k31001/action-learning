# Palantir 배치 전략가(Echo) · FDE(Delta) 짝 구조 (2026-10-18)

**수집일**: 2026-10-18 · **유형**: 웹 검색(1차 블로그 · 채용 공고 + 2차 비교 글)

| ID | 내용 | 출처 | 등급 |
|---|---|---|---|
| ED-01 | Palantir의 Deployment Strategist는 사내에서 "Echo", Forward Deployed Engineer는 "Delta"로 불린다. "이론상 Echo는 제품 관리자에 가깝고 Delta는 더 기술적이지만, 실제로는 둘 다 제품 관리자 · 소프트웨어 엔지니어 · 전략가의 혼합" | https://blog.palantir.com/a-day-in-the-life-of-a-palantir-deployment-strategist-951cb59a5a96 | ✅ (Palantir 공식 블로그, 2022) |
| ED-02 | 현행 채용 공고에 Deployment Strategist 직무가 지역별(미국 · 일본 · 한국 Forward Deployed 등)로 게시 | https://jobs.lever.co/palantir/fa93a1f8-dc95-40d0-b5ca-f2aebaab0806 · https://jobs.lever.co/palantir/1a53939d-8ffa-4570-b31a-6d0bc53fdb59 | ✅ |
| ED-03 | FDE는 한 고객 안에서 프로덕션 코드를 쓰고, 배치 전략가는 문제 · 도입 · 결과를 소유한다. OpenAI · Anthropic도 FDE + Deployment Lead 짝으로 채용 | https://www.secondtalent.com/resources/deployment-strategist-vs-forward-deployed-engineer/ | 🟡 (2차 채용 정보 사이트) |
| ED-04 | 두 역할의 경계는 느슨하며 둘 다 고객에 상주 | https://fde.academy/blog/palantir-deployment-strategist-vs-forward-deployed-engineer | 🟡 |

**과제팀 해석(⚠️)**: 삼성 Co-Design Pod의 "고객 기술 관계 담당(Pod 리드)"이 Echo, 시스템 SW · NAND/FW 엔지니어가 Delta에 대응한다. 사용자 결정(2026-10-18)대로 Echo 역할도 기술 출신이어야 한다.

## 추가 수집 (2026-10-18 오후): 역할별 구체 업무

| ID | 내용 | 출처 | 등급 |
|---|---|---|---|
| ED-05 | Deployment Strategist(Echo) 공고: 고객의 "biggest problems"를 찾고, 고객 문제 · 업무 흐름에 깊이 관여해 관련 데이터를 찾으며, 새 사용자 그룹용 업무 흐름을 만들고, "concrete impact on their operations"로 평가. FDE와 함께 데이터를 안정적 파이프라인으로 통합 | https://jobs.lever.co/palantir/e0ab8226-b928-4e3a-bf87-08fe7b1ea595 | ✅ (Palantir 채용 공고, "Echo" 표기) |
| ED-06 | Forward Deployed Software Engineer(Delta) 공고: 고객과 직접 일하며 가장 어려운 문제를 이해하고 데이터 기반 해법을 만든다. 책임은 "startup CTO"와 비슷 — 작은 팀에서 고위험 프로젝트를 끝까지 소유. 하루 일과에 아키텍처 논의 · 대규모 데이터 작업 · 맞춤 웹앱 개발 · 고객 임원 대화 · 팀 전략 | https://jobs.lever.co/palantir/b46312f7-89c8-4447-bf01-931e45243d1a | ✅ (Palantir 채용 공고) |
| ED-07 | 비교 정리: Echo는 고객 문제 · 사용자 도입 · 결과를 소유(문제 발굴, 데이터 식별, 업무 흐름 구축, 교육, C레벨 보고, 출장 25~75%, 분석 · 판단 · 문제 분해 역량), Delta는 시스템 설계 · 구현 · 프로덕션 코드를 소유(아키텍처 결정, 대규모 데이터, 맞춤 앱, 아이디어 → 배포, 출장 최대 25%, 강한 코더) | https://www.secondtalent.com/resources/deployment-strategist-vs-forward-deployed-engineer/ | 🟡 |
| ED-08 | OpenAI Deployment Lead: FDE · 연구자 · 고객 엔지니어를 가로질러 실행을 이끌고 범위 · 우선순위를 정함(기술 이해 필수). Anthropic Technical Deployment Lead: 범위 · 이해관계자 · 가치를 소유하고 목표를 FDE가 실행할 로드맵 · KPI로 바꾸며 프로덕션 코드는 쓰지 않음. 양사 FDE는 프로덕션 코드로 기술 해법을 구축 | 같은 출처(ED-07) 인용 채용 공고 | 🟡 |

**과제팀 매핑(⚠️)**: Echo = Pod 리드 · 고객 기술 관계(문제 정의 · 결정권자 연결 · 성과를 RFQ · 계약으로), Delta = 시스템 SW · NAND/FW · 워크로드 분석(배치 코드 · 펌웨어 튜닝 · 실측), Palantir의 제품 엔지니어(Dev) = 본사 후방 지원(현장 해법을 제품 기능으로).
