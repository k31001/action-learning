# FDP 기술 한계·배치 표준 선례 맥락 — 웹 리서치

**수집일**: 2026-08-17
**목적**: 「삼성 SSD 전략적 방향성」 비판적 검토([ssd-strategy-critique.md](../../outputs/report/ssd-strategy-critique.md))의 근거 — ① 배치 지시형 표준의 앞 세대(Streams·ZNS) 채택 실패 이력, ② FDP 효과의 조건부성(기술 한계)
**출처**: Samsung Semiconductor 기술 블로그, arXiv, USENIX FAST'26, NVM Express, SNIA (URL 하단)

---

## 1. 배치 지시형 표준의 앞 세대 — Streams·ZNS는 왜 주류가 못 됐나

- **NVMe Streams(Multi-stream write directive)**: "did not find much traction in the industry" — 업계 채택이 미미했다 (iokpp.de, ZNS vs FDP 비교 분석).
- **ZNS(Zoned Namespace)**: WAF 절감을 얻으려면 호스트가 데이터 패턴과 소프트웨어 스택을 수정해야 하고, append-only 쓰기 모델과 호스트 기반 GC가 로그 구조가 아닌 애플리케이션에 **선행 소프트웨어 엔지니어링 비용**을 부과 — 광범위 채택의 장애물 (arXiv 2503.11665 "Towards Efficient Flash Caches with Emerging NVMe FDP SSDs").
- **생태계 파편화**: Open-Channel SSD·Streams·ZNS는 각자 유효한 사용처가 있었으나 "소프트웨어 생태계 파편화 → 비대해진 코드베이스 → **메인라인 프로젝트에서의 거부(rejection in mainline projects)**"를 초래 (SNIA "Flexible Data Placement Open Source Ecosystem" 2023).
- 삼성 자체 기술 블로그("A Brief History of Data Placement Technologies")도 이 실패의 계보를 공식 인정 — FDP 마케팅의 전제 자체가 "앞 세대는 실패했다"임.

## 2. FDP는 그 교훈의 산물 — 그래서 다른 점

- FDP는 **Google SmartFTL 제안과 Meta Direct Placement Mode 제안을 통합**해 만들어짐 — ZNS와 일반 SSD 사이의 비용·효익 공백을 메우는 위치 설계 (Samsung 기술 블로그, NVM Express FMS 2023 "FDP: State of the Union").
- 하이퍼스케일러(메타·구글) 입장에서 FDP는 "기존 스토리지 기술(ZNS 등)의 생태계 복잡성 우려에 대한 응답" — 호스트 스택 대수술 없이(하위 호환) 배치 힌트만 추가.
- **시사점**: "고객이 직접 설계했고, 하위 호환이며, CacheLib 등 실채택이 시작됐다"는 점이 Streams·ZNS와의 차이. 단, 이 차이가 생태계 확산을 보장하지는 않음 — 확산은 여전히 시스템 SW 투자에 달림.

## 3. FDP 효과의 조건부성 — 기술 한계 (FAST'26 WARP)

- USENIX FAST'26 "Characterizing and Emulating FDP SSDs with WARP": FDP는 **RUH 격리가 객체 수명과 정렬될 때 WAF ~1을 유지하지만, 오분류(misclassification)·RUH 간섭·적대적 무효화(adversarial invalidations) 하에서는 실패**.
- **"Noisy RUH"** (기존 미보고 현상): 한 RUH에 무효화가 집중되면 **다른 핸들들의 WAF까지 부풀어** FDP가 제공해야 할 격리가 깨짐.
- WARP는 최초의 공개 FDP 에뮬레이터 — RU 크기·OP 비율·RUH 수·GC 정책 등 실제 펌웨어가 노출하지 않는 정책 변수를 재현 (벤치마크 프로그램 설계에 활용 가능).
- 효과는 워크로드 의존적: CacheLib 실측은 BigHash/BlockCache 풀 분리 수준의 구분만으로 WAF 감소 확인 (arXiv 2503.11665) — 즉 "얼마나 줄어드는가"는 워크로드·정책 설계에 따라 큰 편차.

## 4. URL

- https://semiconductor.samsung.com/news-events/tech-blog/a-brief-history-of-data-placement-technologies/
- https://semiconductor.samsung.com/news-events/tech-blog/what-hyperscalers-need-to-know-about-flexible-data-placement-fdp/
- https://arxiv.org/html/2503.11665 (Towards Efficient Flash Caches with Emerging NVMe FDP SSDs)
- https://www.usenix.org/conference/fast26/presentation/song (WARP)
- https://www.snia.org/educational-library/flexible-data-placement-open-source-ecosystem-2023
- https://nvmexpress.org/wp-content/uploads/FMS-2023-Flexible-Data-Placement-FDP-Overview.pdf
- https://iokpp.de/2022/12/zns-fdp/
