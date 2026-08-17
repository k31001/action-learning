# 삼성 SSD 전략적 방향성 — 보고서 집필 브리프 (FDP SSD)

> **문서 성격**: 2026-08-17 사용자가 구술한 「삼성 SSD 전략적 방향성」 보고서 집필 브리프의 정리본. 원문의 논지와 문장 순서를 최대한 보존하되 표현·문법만 다듬었고, **데이터 보강은 인용 블록(> 보강)으로 원문과 구분**해 저장소 소스로 연결했다. 미검증·범위 주의 항목은 `[팩트체크]` 표기 — 말미 대장 참조.
> **파생 산출물**: [ssd-strategy-report.md](../../outputs/report/ssd-strategy-report.md) — 전략 보고서 (목차 승인 → 본문 집필 → 이후 PPT 3~4장 압축)
> **선행 브리프**: [fdp-fde-solution-prompt.md](fdp-fde-solution-prompt.md) (2026-08-09, 7인 스토리라인 SSD 제안편 「SSD의 CUDA」의 모체) — 본 브리프는 그 후속으로, "20년 전략사 → FDP 전환"을 단독 보고서로 다룬다.

---

## 1. 첫 번째 전략적 방향성 — 2005년, 자기잠식을 무릅쓴 SSD 진출

2005년 SSD 사업을 시작하게 된 배경부터 다룬다. SSD 사업은 메모리 사업의 사이클 특성을 감쇠하기 위한 전략적 선택이었다. 당시 HDD 사업을 병행하던 삼성 입장에서는 자기잠식(cannibalization)에 대한 우려가 있는 상황에서 내린 전략적 결정이었던 만큼 그 가치가 크다. SSD 사업이 어느 정도 안정화된 이후에는 HDD 사업을 매각하여 본격적인 스토리지 사업자로 자리 잡았다. 빠르게 사업을 시작했기 때문에 시장에서 독보적인 위치에 오를 수 있었다.

> **보강**
> ① 계기와 시점 — 2005년 Apple iPod nano향 NAND 대량 공급에서 "수요를 만들려면 완제품까지 내려가야 한다"를 학습, 2006-03 세계 최초 SSD(32GB PATA) 양산으로 HDD 대체라는 초장기 수요를 스스로 개척 ([samsung-storage-solution-research-2026-08-17.md](../raw-notes/samsung-storage-solution-research-2026-08-17.md), [samsung-storage-solution-history.md](../../wiki/concepts/samsung-storage-solution-history.md) §2).
> ② HDD 매각 — 2011-04 Seagate에 $1.375B 매각. 현금 50% + Seagate 지분 9.6% + NAND 크로스-서플라이 계약 동반 — 2차 치킨게임 한복판의 선택과 집중 ([samsung-ssd-ufs-market-transition-strategy-2026-08-16.md](../articles/samsung-ssd-ufs-market-transition-strategy-2026-08-16.md)).
> ③ 선점의 결과 — 2013년 연간 전체 SSD 점유율 28.5% 1위(Gartner 집계) ([samsung-ssd-ufs-history-competition-2026-08-15.md](../articles/samsung-ssd-ufs-history-competition-2026-08-15.md)).
> ④ "사이클 감쇠"의 정량 근거 — 2019 다운턴에서 솔루션 믹스가 완충재로 작동(스토리지 OPᵉ -0.9조, DRAM 대비 골이 얕음) ([samsung-storage-solution-history.md](../../wiki/concepts/samsung-storage-solution-history.md) §1·§4).

## 2. 두 번째 전략적 방향성 — NVMe 표준 전환기의 선행 출시

두 번째 전략적 방향성은 NVMe 표준과 함께 나타났다. 당시 인텔이 표준 제정을 주도했음에도 삼성 특유의 빠른 실행력으로 인텔보다 빠른 시점에 제품을 출시했다. 이 대목은 매우 눈여겨볼 만하다. 빠른 의사결정과 빠른 실행력이 모두 돋보이는 순간이기 때문이다. 이후 삼성은 SSD 분야에서 독보적인 위치를 계속 유지할 수 있었다.

> **보강**
> ① 선행 폭 — 삼성 XS1715는 2013-07 공개된 **업계 최초 NVMe PCIe 엔터프라이즈 SSD**(2013-05-31 UNH-IOL NVMe 인증 목록 최초 등재, 순차 읽기 3,000MB/s·랜덤 740K IOPS·최초의 SFF-8639/U.2 커넥터). 표준 주도자 인텔의 첫 NVMe 제품군(DC P3700/P3600/P3500)은 2014-Q2 — **약 1년 후발** ([samsung-ssd-ufs-market-transition-strategy-2026-08-16.md](../articles/samsung-ssd-ufs-market-transition-strategy-2026-08-16.md) B-2·B-4).
> ② 이어진 선점 — 950 PRO(2015)로 최초의 소비자 리테일 M.2 NVMe까지 연쇄 선행. 컨트롤러·NAND·DRAM·펌웨어 수직계열화가 세대 전환 속도의 기반 (같은 소스 B-4).
> ③ 결말의 대비 — 인텔은 이후 Optane 청산·NAND 사업 매각으로 스토리지에서 퇴장. "표준을 주도한 자"와 "제품으로 이긴 자"의 갈림 (같은 소스).

## 3. 세 번째 전략적 방향성 — 데이터센터 SSD 집중

세 번째 전략적 방향성은 데이터센터의 부상이다. 데이터센터용 SSD는 일반(클라이언트) SSD로 대응하기에는 기능·성능 요구사항이 훨씬 다양하고 까다로웠다. 그래서 삼성은 데이터센터용 SSD를 위해 COTS, MPF, ZNS(Zoned Namespace), FDP(Flexible Data Placement) 등 다양한 기술을 내재화했다. 내부적으로 데이터센터용 SSD 개발 조직을 별도로 둘 정도로 자원을 집중한 결과, 현재의 서버 SSD 점유율을 유지할 수 있었다. 이 기술들을 기반으로 현재 NVIDIA AI PC와 GPU 서버에 모두 채용되는 성과가 있었다.

> **보강**
> ① 전환 선언 — 3Q17 실적발표의 "datacenter NVMe 적극 대응" 공식 문구, 3Q18 매출 기준 엔터프라이즈 점유 38.5% ([samsung-ssd-ufs-market-transition-strategy-2026-08-16.md](../articles/samsung-ssd-ufs-market-transition-strategy-2026-08-16.md)).
> ② 점유율 현재값 — 1Q26 enterprise SSD 삼성 38.2% 1위($7.05B / Top5 $18.46B) ([enterprise-ssd-market-1q26-2026-08.md](../articles/enterprise-ssd-market-1q26-2026-08.md)).
> ③ FDP의 기원 — NVMe TP4146. Meta·Google이 각자 WAF 문제를 풀다 합류, 삼성과 함께 6개월 만에 비준(2023) — **표준 공동 주도자 지위** ([captive-ssd-fdp-context-2026-08.md](../articles/captive-ssd-fdp-context-2026-08.md)).
> ④ NVIDIA 채용 실체 — AI PC: PM9E1이 DGX Spark에 실탑재(분해 확인). GPU 서버: PM1753이 CMX 첫 공식 공급 SSD, PM1763(PCIe 6.0)은 2026-07-08 양산 개시. CMX 1유닛 = SSD 576개·9,600TB, CMX향 NAND 수요 2027년 1억+ TB 추정 ([samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md](../articles/samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md)).
> ⑤ 용어 주의 — COTS·MPF는 원문 그대로 보존(내부 통용 명칭으로 추정). 외부 독자용 보고서에 쓸 때 풀네임·표기 확인 필요 `[팩트체크 F-8]`.

## 4. 현재 국면 — 호황이 만든 두 가지 우려

### 4.1 포트폴리오 쏠림

현재는 AI 수요 폭발로 인한 메모리 호황에서 최대의 이익을 올리기 위해 소비자용 SSD 비중을 줄이고 서버용 SSD 비중을 늘리는 전략을 수행하고 있다. 마이크론은 아예 소비자용 SSD 시장에서 떠나는 추세다. 하지만 향후 메모리 다운턴이 왔을 때 우리가 충분한 대비를 하고 있는지에 대해서는 우려해야 한다.

> **보강** — 마이크론의 컨슈머 브랜드 Crucial 철수는 확정 사실 ([enterprise-ssd-market-1q26-2026-08.md](../articles/enterprise-ssd-market-1q26-2026-08.md), [samsung-ssd-ufs-history-competition-2026-08-15.md](../articles/samsung-ssd-ufs-history-competition-2026-08-15.md)). 쏠림의 시황 배경: enterprise SSD 계약가 분기 +80% ([captive-ssd-fdp-context-2026-08.md](../articles/captive-ssd-fdp-context-2026-08.md)), 삼성 V-NAND 캐파 60%+ CMX 배정 보도(Med 신뢰도, [samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md](../articles/samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md) §1.3). 유의 — 2019·2023 다운턴에서 진폭을 줄인 것이 바로 소비자·서버를 아우른 솔루션 '믹스'였다는 역사([samsung-storage-solution-history.md](../../wiki/concepts/samsung-storage-solution-history.md) §4)와 정면 긴장 관계 = 본 보고서의 문제의식.

### 4.2 Captive SSD의 부상

현재 일어나는 일 중 하이퍼스케일러 위주로 NAND 단품을 사서 자체 SSD를 개발하려는 움직임이 커지고 있다. 원인은 분석이 필요하지만, 한 축은 SSD 가격이 비싸진 것이고, 다른 축은 변화하는 AI 데이터센터 워크로드에 최적화된 SSD를 자체 개발하여 WAF(Write Amplification Factor)를 줄이고 성능을 높이려는 것이다. 특히 수명을 연장할 수 있는 기술은 스토리지 가격이 크게 상승한 현시점에 데이터센터 입장에서 투자비를 줄일 수 있는 매우 중요한 기술이다.

데이터센터는 삼성 같은 기업에 자신에게 맞는 SSD를 개발해 달라고 요청할 수 있지만, 그렇게 할 수 있는 기업은 많지 않다. 구글·메타·마이크로소프트 같은 회사들은 가능할 것이다. 아마존 같은 기업은 그래서 NAND 단품을 구입해 오래전부터 SSD를 자체 개발하여 사용하고 있다.

문제는 이런 Captive SSD 시장 규모가 점점 커진다는 것이다. 가트너 조사에 따르면 5%에서 30%까지 상승할 것이라고 한다 `[팩트체크 F-1 — 수치 실존하나 측정 대상 주의]`. 서버 SSD 시장에서 30%는 매우 큰 규모다. 우리가 이 시장을 내주지 않기 위해서는 고객의 니즈를 파악하여 자체 개발보다 가성비가 좋은 솔루션을 제공하는 방법밖에 없다.

> **보강**
> ① 정황 지표 — 하이퍼스케일러가 글로벌 enterprise SSD 물량의 ~55%를 소비(구매 지배력), NAND 웨이퍼 직구매 다년 계약 확산(계약가 월 +60%, Q1'25 대비 +246%) ([captive-ssd-fdp-context-2026-08.md](../articles/captive-ssd-fdp-context-2026-08.md)).
> ② 통제권 상승 4단계 — 완제품 구매(~2016) → 커스텀 스펙·펌웨어(2017~20) → 자체 컨트롤러(AWS Nitro SSD, 2021-12) → 표준 주도 + 웨이퍼 직구매(FDP, 2022~26) ([fdp-host-ssd-platform.md](../../wiki/strategies/fdp-host-ssd-platform.md) §2).
> ③ 구글 주의 — 구글은 FDP 공동 설계자인 **동시에** 자체 설계 Titanium SSD를 배포하는 이중 트랙(Chris Sabol OCP 발표: "쓰기는 SSD 동작 중 가장 전력 집약적 — 필요량의 2.5배를 쓰면 전력 한계에 훨씬 빨리 도달") ([google-captive-titanium-fdp-factcheck-2026-08.md](../articles/google-captive-titanium-fdp-factcheck-2026-08.md)). "요청 가능 기업" 분류는 유효하나 구글도 이미 부분적 captive를 병행한다는 사실을 보고서에 반영할 것 `[팩트체크 F-7]`.
> ④ WAF·수명의 경제성 — FDP 정량 효과(OP 28% 제거 등, 같은 소스). KV Cache→SSD 오프로드 확산이 워크로드 최적화 수요를 증폭 ([kv-cache-ssd-offload-ecosystem-2026-08.md](../articles/kv-cache-ssd-offload-ecosystem-2026-08.md)).

## 5. 대응 전략 — 두 가지 길

가장 직관적인 전략은 고객 커스텀 SSD를 모두 개발해 주는 전략이다. 이 전략의 장점은 고객 만족을 극대화할 수 있다는 것이지만, 개발 리소스가 많이 든다는 문제가 있다. 개발 리소스뿐 아니라 평가를 위한 리소스, 향후 불량 대응과 유지보수까지 생각하면 삼성 입장에서는 지속가능하지 않을 수 있다.

그래서 두 번째 방법은 고객의 니즈를 파악해서 효율적으로 해결하는 방법을 찾는 것이다. 고객이 특화 SSD를 개발하는 이유는 자기 워크로드에 대한 최적화가 필요해서인데, 우리는 이미 구글·메타와 함께 FDP라는 표준을 기반으로 관련 SSD를 제공하고 있다. 물론 이 기술을 제대로 활용하기 위해서는 시스템 소프트웨어를 비롯한 응용 계층과의 연계가 매우 중요하다. 모든 고객이 관련 기술을 가지고 있는 것은 아니기 때문에, FDP를 업계 표준으로 만들기 위해서는 시스템 소프트웨어 생태계를 확산시킬 필요가 있다. 기업 입장에서 이런 생태계를 만드는 것이 삼성에게 익숙한 일은 아니지만 반드시 필요한 일이다.

> **보강**
> ① 풀커스텀 지속불가능성의 사내 1차 증언 — 최장석 상무(메모리 상품기획): "커스텀 제품은 소싱·컨트랙이 파운드리 모델과 비슷한데 그걸 우리가 안 해본 것 — 보상 계약 없이 코스트를 다 먹었다" ([choi-jangseok-product-planning-interview-2026-07-29.md](../raw-notes/choi-jangseok-product-planning-interview-2026-07-29.md)).
> ② 선택지 비교의 선행 정리 — [fdp-host-ssd-platform.md](../../wiki/strategies/fdp-host-ssd-platform.md) §3이 4개 선택지(컴포넌트 후퇴 / 풀커스텀 / FDP HW-only / FDP+시스템SW 플랫폼)를 이미 비교·판정. 본 브리프의 두 갈래는 그중 B vs D 구도.
> ③ 반증 주의 — FDP는 멀티벤더로 확산 중(Micron 실워크로드 측정 공개·Kioxia RocksDB 시연·머천트 컨트롤러 지원): "FDP SSD를 판다"만으로는 차별화가 아니며, 차별화는 표준 위 계층(시스템 SW·생태계·현장 엔지니어링)에서 성립 ([google-captive-titanium-fdp-factcheck-2026-08.md](../articles/google-captive-titanium-fdp-factcheck-2026-08.md)).

## 6. 실행 전략

우선 고객은 워크로드 정보를 쉽게 내주지 않는다. 그래서 지금과 같은 공급 부족 상황을 십분 활용하여, 고객과 전략적 제휴 관계를 맺으면서 **장기 물량 계약과 워크로드 최적화 협력을 하나의 패키지**로 함께 묶을 수 있다. 이미 마이크론과 앤트로픽이 이런 전략적 협력 관계를 맺은 선례가 있다. 삼성은 기존에 FDP 관련해서 구글과 밀접하게 협업하고 있기 때문에 구글이 적합한 협력 대상이라고 생각한다.

전략적 협력 관계로 워크로드에 대한 정보를 공유받게 되면, 그다음에는 FDP를 활용하여 고객 워크로드에 맞는 제품 개발과 시스템 소프트웨어 생태계 구축에 집중할 수 있다. FDP SSD를 개발하고 최적화하는 것은 기존 SSD 개발 조직이 잘하는 일이고, 시스템 소프트웨어 생태계 구축에는 고객사와 함께 수행할 오픈소스 컨트리뷰터와 메인테이너가 필요할 수 있다. 이를 위한 조직을 더 강화하는 것이 전략적으로 필요한 시점이다.

> **보강**
> ① 선례 확정 — Micron↔Anthropic Strategic Agreement(2026-06-22 발표): ⑴ 공동 최적화(HBM·DRAM·**데이터센터 SSD**를 Claude 학습·추론 워크로드에 공동 설계) ⑵ 다년 공급 ⑶ Claude 전사 도입 ⑷ Series H 지분 투자 — 물량+협력 패키지의 실존 선례 ([micron-anthropic-sca-2026-06-22.md](../articles/micron-anthropic-sca-2026-06-22.md)). 원문 주장 ✅.
> ② 삼성의 발판 — 삼성도 Anthropic Series H에 Micron·SK와 함께 "strategic infrastructure partner"로 참여 — 동일 구조 계약으로 확장할 자본 관계가 이미 존재 (같은 소스 §3, [customer-co-design-anthropic.md](../../wiki/concepts/customer-co-design-anthropic.md)).
> ③ 계약 환경 — take-or-pay 선수금 Binding 체제가 이미 가동 중(이창수 부사장 1차 확인) — "물량 계약의 공동 플랫폼 계약 격상"이 다음 단계 ([lee-changsoo-memory-sales-interview-2026-08-03.md](../raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md), [fdp-host-ssd-platform.md](../../wiki/strategies/fdp-host-ssd-platform.md) 실행전략 5).
> ④ 실행 골격 재사용 — 실행전략 6종(SDK·워크로드 프로파일 7종·E2E 공동검증·공동개발 조직·Binding 격상·오픈소스 경계)과 KPI("고객 시스템에서 FDP가 실제 활성화된 용량")는 [fdp-host-ssd-platform.md](../../wiki/strategies/fdp-host-ssd-platform.md) §4~5에 정리 완료. 현장 파견 엔지니어(FDE) 모델은 [palantir-fde-model-2026-07.md](../articles/palantir-fde-model-2026-07.md) 벤치마크.

## 7. 결론

SSD는 메모리 사이클에 대비하기 위한 사업이다. 첫 번째로는 SSD로 판매되는 NAND 비중을 늘리는 데 집중했고, 그다음으로는 서버(DC) SSD의 비중을 늘리는 데 집중했다면, 세 번째로는 **FDP로 판매되는 SSD 비중**을 늘리는 데 집중할 차례다. 이를 위해서는 기존에 잘하던 SSD 디바이스 개발 역량뿐 아니라 데이터센터와 시스템 소프트웨어에 대한 역량이 중요해지고, 이전에는 혼자 잘해도 됐지만 지금은 고객사와 함께 잘해야 하는 상황이 되었다. 삼성의 DNA를 한 번 더 업그레이드할 수 있는 기회로 이번 기회를 잘 살리면, 메모리 다운턴이 왔을 때 다른 기업보다 훨씬 더 부드럽게 연착륙할 수 있을 것이다.

> **보강** — "비중 전환 3단계" 프레임의 위키 대응물: 사이클×솔루션 변모 4단계(태동→수직계열화→솔루션 주도→AI 전환, [samsung-storage-solution-history.md](../../wiki/concepts/samsung-storage-solution-history.md) §4). 본 브리프의 3단계는 그 위에 "무엇으로 파는가"(NAND→SSD→DC SSD→FDP SSD) 축을 얹은 재구성.

---

## 팩트체크·보강 대장

| # | 원문 주장 | 검증 결과 | 상태 |
|---|---|---|---|
| F-1 | 가트너: Captive SSD 5%→30% 상승 | 수치 실존 — "by 2026, over 30% of **on-premises storage** will rely on captive NVMe SSDs, up from less than 5% in 2023" (ScaleFlux PR 2025-08-11, 원출처 Blocks & Files 2023-09-07). 단 측정 대상은 온프레미스 스토리지의 captive NVMe SSD — "하이퍼스케일러가 서버 SSD 시장 30% 대체"로 읽으면 범위 과장. 하이퍼스케일러 캡티브 공식 통계는 미공개 | ⚠️ 범위 주의 — [gartner-captive-nvme-ssd-forecast-2026-08.md](../articles/gartner-captive-nvme-ssd-forecast-2026-08.md) |
| F-2 | 마이크론–앤트로픽 전략적 협력 선례 | 2026-06-22 Strategic Agreement, 4요소(공동 최적화·다년 공급·Claude 도입·지분 투자) 확인 | ✅ |
| F-3 | 마이크론 소비자 SSD 철수 추세 | Crucial 컨슈머 사업 철수 확인 | ✅ |
| F-4 | NVIDIA AI PC·GPU 서버 채용 | PM9E1 DGX Spark 실탑재(분해 확인) · PM1753 CMX 첫 공식 공급 · PM1763 2026-07-08 양산 | ✅ |
| F-5 | 인텔 주도 표준에서 삼성 선행 출시 | XS1715(2013-07) vs Intel DC P3700(2014-Q2) — 약 1년 선행 | ✅ |
| F-6 | 2005년 사업 시작·안정화 후 HDD 매각 | 2005 Apple 계기 → 2006-03 세계 최초 SSD 양산 → 2011-04 Seagate $1.375B 매각 | ✅ |
| F-7 | 구글 = FDP 협력 적합 대상 | 유효하나 구글은 Titanium 자체 SSD 병행(이중 트랙) — 협상 설계에 반영 필요 | ⚠️ |
| F-8 | 내재화 기술명 COTS·MPF | 저장소·공개 자료에서 미확인(내부 명칭 추정) — 보고서 표기 방식 확인 필요 | ❓ |
| F-9 | 아마존은 오래전부터 자체 SSD | AWS Nitro SSD(2021-12 공개, 자체 컨트롤러). "오래전"의 기점은 Nitro 카드 계열(2017~) 서술로 조정 가능 | ✅ |

## 보고서·PPT 요구사항 (원문 지시)

1. 본 브리프를 `prompt-fdp-ssd.md`로 정리·저장 (원문 보존 + 표현·문법·데이터 보강) — 본 파일
2. 전략 보고서는 별도 파일([ssd-strategy-report.md](../../outputs/report/ssd-strategy-report.md))로 저장. **목차 제안 → 사용자 승인 → 본문 집필** 순서
3. 보고서는 이후 **PPT 3~4장**으로 정리할 예정 — 목차·서술을 슬라이드 단위로 미리 설계

---

## 추가 지시 (2026-08-18, 비판적 검토 회신)

[ssd-strategy-critique.md](../../outputs/report/ssd-strategy-critique.md)의 🔴 5건에 대한 사용자 결정 — v1.1 반영의 1차 출처:

1. **L-1 (선례의 역설)**: "FDP도 ZNS와 같은 목적이었지만 기술적으로 호스트에서 해줘야 하는 소프트웨어 복잡도가 훨씬 낮다는 장점이 있다. 그게 FDP 강점이다." 팩트체크로 '왜 다른가' 논거 보완 + 생태계 투자의 중요성 인정.
2. **L-2 (소비자 믹스)**: **소비자용은 외주를 활용할 예정** — 보고서에서 소비자 처방을 별도로 다룰 필요 없음.
3. **S-1 (두 전장)**: AI DC에서 FDP가 자리 잡으려면 **LMCache를 포함한 많은 오픈소스 생태계가 필요** — 조사해 보강할 것. **SCADA는 완전히 다른 응용을 위한 제안으로 FDP와는 다른 분야**(경쟁 구도로 서술하지 말 것).
4. **T-1 (FDP 조건부성)**: 효과의 워크로드 의존성은 **"효과 극대화를 위해 고객 협업이 그만큼 중요하다는 증거"** — 한계를 협업 논거로 역전해 서술.
5. **F-1 (가트너)**: 제안대로 처리 — 정황 지표를 주근거로, 가트너 수치는 범위 명시 참고로 격하.

- 보완 로드맵 중 **B(별도 실행 과제 6건)를 채택** — 보고서에 상세화.
- **덱 요구**: 본문 반영 후 PPT 업데이트 + **요약 슬라이드 1장을 맨 앞에 추가** (배경 제외, "무엇을 왜 하는지·어떻게 할 것인지" 초점) → 총 5장.
