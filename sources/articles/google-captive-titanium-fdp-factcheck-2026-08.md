# 구글 Captive SSD·FDP 협업 팩트체크 — 웹 리서치 (2026-08-09)

**수집일**: 2026-08-09
**유형**: 웹 검색 기반 팩트체크 (SSD 스토리라인 제안서 준비 중 사용자 주장 검증)
**용도**: `outputs/storyline/` SSD 제안서 5장 — "구글은 Captive SSD를 채택하지 않고 삼성과 FDP 표준으로 소통한다" 주장의 공개 정보 검증
**판정 요약**: **부분 반증** — 구글이 FDP 표준의 공동 주도자인 것은 사실이나, 동시에 자체 설계 SSD(**Titanium SSD**)를 보유·배포 중. "구글 = Captive 미채택"은 공개 정보와 불일치. "캡티브를 하는 고객조차 표준 경로를 병행한다(이중 트랙)"로 논거 재구성 필요.

---

## §1. 확인된 사실 — 구글은 FDP 표준의 공동 설계·주도자

- FDP 표준(NVMe TP4146)은 **Meta·Google·Samsung 3사가 주도해 6개월 만에 비준** (기존 소스 [captive-ssd-fdp-context-2026-08.md](captive-ssd-fdp-context-2026-08.md) 재확인)
- OCP Global Summit에서 **Google 소프트웨어 아키텍트 Chris Sabol**이 Meta의 Ross Stenfort와 공동 발표 — 구글 데이터센터 인프라 사례로 WA(Write Amplification) 감소가 CapEx·OpEx에 미치는 영향을 시연
- Sabol 발언: "쓰기는 SSD 동작 중 가장 전력 집약적인 부분이다. 필요량의 2.5배를 쓰면 전력 한계(power envelope)에 훨씬 빨리 도달한다" — 구글의 문제의식이 WAF임을 공개 확인
- 구글과 메타는 **각자 데이터 배치 방식을 개발하다 결합**해 FDP로 통합 — 구글의 표준 경로 선택은 실재

## §2. 반증 — 구글은 자체 설계 SSD(Titanium SSD)를 보유한다

- **Titanium SSD**: 구글 공식 표현으로 "custom-designed Local SSD" — Titanium I/O 오프로드 프로세싱을 사용해 보안·성능·관리를 강화한 로컬 SSD
- 구글 클라우드 블로그: "Titanium과 통합된 **구글 SSD의 1세대**(the first generation of Google SSDs integrated with Titanium)" — 네트워킹·스토리지·관리를 호스트 CPU에서 커스텀 실리콘·하드웨어·소프트웨어로 오프로드하는 Titanium 시스템의 일부, **Titanium Offload Processor**로 호스트에 연결
- C4A(자체 Axion Arm CPU) VM과 함께 GA: 랜덤 읽기 최대 **240만 IOPS**, 읽기 처리량 **10.4 GiB/s**, 이전 세대 로컬 SSD 대비 접근 지연 **-35%**
- C4·Z3·G4 등 신규 머신 시리즈에 탑재, 인스턴스당 최대 72 TiB
- 구조적 의미: AWS Nitro SSD(2021, 자체 컨트롤러 자작 SSD)와 같은 계열의 수직 통합 — **구글도 "표준 주도(FDP) + 자체 통합 SSD(Titanium)" 이중 트랙**
- ⚠️ 미확정: Titanium SSD의 드라이브 자체가 완전 자체 설계(컨트롤러 포함)인지, 벤더 제조 드라이브 + 구글 오프로드 프로세서 통합 설계인지는 공개 정보로 판별 불가

## §3. FDP 지원의 산업 확산 — 삼성 전유물이 아니다

- **Micron**: Aerospike 실워크로드에서 FDP 효과를 측정한 기술 블로그 발행 — "real workloads" 검증 단계
- **Kioxia**: OCP Global Summit 2024에서 FDP SSD로 RocksDB 구동 시연
- **Silicon Motion**: MonTitan Gen5 enterprise SSD 플랫폼에서 FDP 시연 — 머천트 컨트롤러 벤더 지원으로 중소 SSD 메이커도 FDP 탑재 가능
- OS·라이브러리·도구·애플리케이션 계층의 FDP 지원 이미 가용 — "하이퍼스케일러가 상대적으로 쉽게 FDP SSD를 도입할 수 있는" 상태
- FDP 정량 효과 (NVM Express 하이퍼스케일 백서): **OP 28% 제거, 동일 애플리케이션 쓰기 밀도로 드라이브 2배 용량, 수명 2배, 쓰기 속도 2배** 잠재력

## §4. 전략 함의 (제안서 반영 지침)

1. "구글 = Captive 미채택 증거"는 사용 불가 → 재구성: "**FDP를 공동 설계한 구글조차 Titanium SSD를 병행한다. 그럼에도 플릿의 대부분은 표준 드라이브로 남고, 그 표준 플릿의 규격을 고객이 직접 설계한 것이 FDP다**" — 표준 게임의 실재와 크기를 보여주는 논거로 전환
2. FDP 지원 자체는 차별화가 아님 (3강 경쟁사 + 컨트롤러 벤더까지 전부 지원) — 차별화는 표준 위 계층(시스템 SW·검증·통합·현장 엔지니어링)에서만 성립
3. 구글과의 협업 품질("환상적") 등 고객 관계 서술은 공개 출처로 확인 불가 — 사내 확인 필요 표기 후 사용

## 원본 링크

- Samsung Semiconductor — Hyperscalers Embrace FDP: https://semiconductor.samsung.com/news-events/tech-blog/hyperscalers-embrace-flexible-data-placement-fdp-to-increase-performance-and-lower-tco/
- Samsung Semiconductor — What Hyperscalers Need to Know About FDP: https://semiconductor.samsung.com/news-events/tech-blog/what-hyperscalers-need-to-know-about-flexible-data-placement-fdp/
- Blocks & Files — Using SSD data placement to lessen SSD write amplification (2023-08-14): https://blocksandfiles.com/2023/08/14/using-ssd-data-placement-to-lessen-write-amplification/
- NVM Express — Hyperscale Innovation: Flexible Data Placement Mode (FDP): https://nvmexpress.org/wp-content/uploads/Hyperscale-Innovation-Flexible-Data-Placement-Mode-FDP.pdf
- Google Cloud — Titanium: https://cloud.google.com/titanium
- Google Cloud Blog — First Google Axion processor, C4A, now GA with Titanium SSD: https://cloud.google.com/blog/products/compute/first-google-axion-processor-c4a-now-ga-with-titanium-ssd
- Google Cloud Docs — About Local SSD disks: https://docs.cloud.google.com/compute/docs/disks/local-ssd
- Businesswire — Kioxia Demonstrates FDP-enabled SSD Running RocksDB at 2024 OCP Global Summit: https://www.businesswire.com/news/home/20241014450380/en
- Silicon Motion — MonTitan Gen5 FDP 시연: https://www.goodreads.com/author_blog_posts/25010295-silicon-motion-demonstrates-flexible-data-placement-on-montitan-gen-5-en
- Micron — Benefits of flexible data placement on real workloads using Aerospike: https://www.micron.com/about/blog/storage/ssd/benefits-of-flexible-data-placement-on-real-workloads-using-aerospike
