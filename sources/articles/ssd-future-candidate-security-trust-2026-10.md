# SSD 미래 대응 후보 기술 팩트 원장: 보안·신뢰·재사용 (양자내성 암호, 하드웨어 신뢰 루트·감사, 재사용 가능한 삭제, 디커플링·소버린 요건)

**수집일**: 2026-10-03
**수집자**: Research Agent (보안·신뢰·재사용) - 사실 수집 전용. 전략 판단·권고 없음.
**유형**: 웹 검색 + 1차 원문 직접 열람(GitHub `git clone`·`raw.githubusercontent.com`의 표준 사양 원문·구현 코드, `www.microsoft.com` 블로그·보고서 원문, `cloud.google.com` 블로그 원문) 기반 팩트 원장
**용도**: SSD 개발 조직이 "어떤 미래(미·중 디커플링 시나리오 포함)에도 대응하기 위해 준비할 기술"을 정의하는 작업에서, 이미 선택한 3대 축(① 고DWPD ② 혼합 매체 QLC+pSLC ③ 대용량+결함 허용) 외에 추가 후보로 검토하는 **보안·신뢰·재사용** 영역의 사실 근거와 반증. 섹션 §1~§5는 요청 항목 1~5에 1:1 대응.

**등급**: ✅ 1차 원문을 이 세션에서 직접 열람(표준 사양 원문 저장소·구현 코드·공식 블로그/보고서 원문) / 🟡 검색 인덱스·2차 매체 경유(1차 출처라도 원문을 직접 못 연 경우 포함) / ⚠️ 파생·단일출처·미검증·충돌 / **⚠️ 파생** = 본 원장이 산술·교차표로 직접 도출(근거 ID 명기)

---

## ⚠️ 0. 방법론 고지 (반드시 읽을 것)

**0-1. 도구 제약.** 이번 세션에서 egress 프록시가 다음 도메인을 차단했다(curl·WebFetch 모두 연결 거부): `media.defense.gov`(CNSA 2.0 원문), `nsa.gov`, `csrc.nist.gov`, `nvlpubs.nist.gov`, `federalregister.gov`, `govinfo.gov`, `congress.gov`, `whitehouse.gov`, `cisa.gov`, `eur-lex.europa.eu`, `legislation.gov.uk`, `op.europa.eu`, `enisa.europa.eu`, `standards.ieee.org`, `trustedcomputinggroup.org`, `dmtf.org`, `opencompute.org`, `www.chipsalliance.org`, `chipsalliance.github.io`, `opencomputeproject.github.io`, `datatracker.ietf.org`, `rfc-editor.org`, `news.samsung.com`, `micron.com`, `kioxia.com`, `solidigm.com`, `microchip.com`, `marvell.com`, `phison.com`, `scaleflux.com`, `westerndigital.com`, `amd.com`, `aws.amazon.com`, `azure.microsoft.com`, `techcommunity.microsoft.com`, `learn.microsoft.com`, `docs.cloud.google.com`(cloud.google.com/docs가 여기로 리다이렉트), `blog.google`, `security.googleblog.com`, `engineering.fb.com`, `files.futurememorystorage.com`, `snia.org`, `storagenewsletter.com`, `sammobile.com`, `businesswire.com`, `prnewswire.com`, `globenewswire.com`, `phoronix.com`, `thequantuminsider.com`, `digichina.stanford.edu`, `chia.net`, `encryptionconsulting.com`, `entrust.com`, `en.wikipedia.org`, `web.archive.org`. GitHub 웹 페이지·`api.github.com`도 403. **직접 열람이 가능했던 것은 `git clone`(github.com), `raw.githubusercontent.com`, `www.microsoft.com`, `cloud.google.com`(블로그)뿐**이다. 따라서:
- **✅는 위 경로에서 원문을 직접 읽은 항목에만 붙였다**: CHIPS Alliance `Caliptra` 저장소(Caliptra 2.0 사양 `doc/caliptra_20/Caliptra.ocp`, 로드맵, **OCP L.O.C.K. 사양 원문 `doc/ocp_lock/lock_spec.ocp`**, 상표 승인 제품 레지스트리; HEAD `55f1660`, 2026-10-01), OCP `OCP-Security-SAFE` 저장소(프레임워크·심사 범위·**스토리지 삭제 요건**·심사기관 목록·**제출된 단문 보고서(SFR) JSON 전수**·전체 git 이력; HEAD `ce04fca`, 2026-10-01), DMTF `libspdm` README·태그, nvme-cli/libnvme(master `f938b92`, 2026-10-02), Linux 커널 master(7.3-rc5) Makefile·Kconfig, Microsoft 보안 블로그(QSP, 2025-08-20), Microsoft Cloud 블로그(2025-04-17), Microsoft Garage 페이지, Microsoft 2026 환경 지속가능성 보고서 페이지, Google Cloud 블로그(2024-04-24).
- **CNSA 2.0, NIST FIPS 203/204/205, NIST SP 800-88 Rev.2, IEEE 2883, EU Ecodesign 2019/424, EU CRA 원문은 모두 차단**되어 🟡로 낮췄다. 단, Caliptra 사양이 CNSA 2.0과 NIST SP 800-208을 **인용한 문구**와 nvme-cli가 IEEE 2883을 **인용한 문구**는 ✅(인용 사실에 한함).
- 벤더 보도자료(Samsung PM1763, WD, ScaleFlux 등)는 1차 출처이지만 검색 요약 경유이므로 🟡.

**0-2. ID 네임스페이스 주의.** 본 원장의 `ST-xx`는 **Security·Trust** 약어다. [ssd-mixed-media-infra-reuse-2026-10.md](ssd-mixed-media-infra-reuse-2026-10.md)의 `ST-01~ST-14`(표준 훅)와 **다른 번호 체계**이므로, 다른 문서에서 인용할 때는 "보안원장 ST-xx"로 쓴다. 번호대: ST-01~19 양자내성 암호(PQC) / ST-20~39 하드웨어 신뢰 루트·감사·증명 / ST-40~59 재사용·삭제 / ST-60~69 디커플링·소버린 / ST-70~79 반증 / ST-80~ 파생.

**0-3. 용어(이 원장 안에서의 뜻).**
- **Caliptra**: 칩(SoC) 내부에 넣는 오픈소스 신뢰 루트(RoT) IP 블록(RTL+ROM+펌웨어). 신원(DICE)·측정 부팅·증명 제공.
- **OCP L.O.C.K.**: Caliptra 위에 얹는 **스토리지 전용 키 관리 블록(KMB)** 사양. 매체 암호화 키(MEK)를 드라이브 펌웨어로부터 격리하고, 증명 가능한 암호 삭제(crypto erase)를 제공.
- **OCP S.A.F.E.**: 제3자 펌웨어 보안 감사 프레임워크. 결과는 서명된 단문 보고서(SFR)로 GitHub에 공개.
- **SPDM**: DMTF의 장치 인증·측정·보안 세션 프로토콜.
- **Crypto erase / Purge / Sanitize**: 키를 파기해 데이터를 복구 불가하게 하는 것 / 실험실 수준 공격으로도 복구 불가한 삭제 등급 / NVMe Sanitize 명령 계열.

**0-4. 기존 원장과의 관계.** 아래는 이미 레포에 있으므로 **ID로만 참조**한다: OCP Datacenter NVMe SSD v2.5 "보안 강화"(B08)·v2.6 "S.A.F.E. 펌웨어 감사 강조"(B10) → [qlc-v6-purchase-criteria-dwpd-history-2026-09.md](qlc-v6-purchase-criteria-dwpd-history-2026-09.md) · Samsung PM9E1(DGX Spark) SPDM v1.2 → [qlc-v7-hbm-codesign-lesson-2026-09.md](qlc-v7-hbm-codesign-lesson-2026-09.md) D-16, [samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md](samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md) · 하이퍼스케일러 서버 내용연수 5~6년(IR-01~IR-09) → [ssd-mixed-media-infra-reuse-2026-10.md](ssd-mixed-media-infra-reuse-2026-10.md) · 미 정부 조달 금지 일정(DoD 1260H, Sec.5949 2027-12-23) → [hybrid-bonding-structures-china-limits-2026-08.md](hybrid-bonding-structures-china-limits-2026-08.md) · CXMT 1260H 법적 지위 → [apple-cxmt-china-dram-2026-07-08.md](apple-cxmt-china-dram-2026-07-08.md), [dt-d-china-entrant-signals-2026-08-28.md](dt-d-china-entrant-signals-2026-08-28.md).

---

## §1. 양자내성 암호(PQC)와 스토리지 펌웨어

### 1-A. 정부·표준 일정

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| ST-01 | **NSA CNSA 2.0 - 소프트웨어·펌웨어 서명**: 즉시 전환 시작, **2025년까지 지원·선호(support and prefer)**, **2030년까지 배타적 사용(exclusively use)**. 알고리즘은 **LMS 또는 XMSS**(NIST SP 800-208), NSA 권고는 **LMS SHA-256/192**, ML-DSA-87도 서명 용도로 승인. 펌웨어를 먼저 서두르는 근거: "검증 알고리즘을 쉽게 바꿀 수 없고, 제조 시 검증 키가 하드웨어에 박히는 경우가 많다" | 2022-09 최초, FAQ 2024-05 갱신 | CNSA 2.0 원문 https://media.defense.gov/2022/Sep/07/2003071834/-1/-1/0/CSA_CNSA_2.0_ALGORITHMS_.PDF (차단) ; Entrust 요약 https://www.entrust.com/blog/2024/05/nsa-announces-update-to-commercial-national-security-algorithm-suite-2-0-and-quantum-computing-faq | 🟡 |
| ST-02 | CNSA 2.0 범주별 일정(지원·선호 / 배타 사용): 소프트웨어·펌웨어 서명 2025/2030, 네트워크 장비 2026/2030, 운영체제 2027/2033, 웹브라우저·클라우드 서비스 2025/2033, 특수·맞춤 장비 2030/2033, 레거시 -/2035 | 동상 | encryptionconsulting https://www.encryptionconsulting.com/education-center/what-is-cnsa-2-0/ ; pqshield https://pqshield.com/cnsa-2-0-compliant-crypto-solution/ | 🟡 |
| ST-03 | **CNSSP-15가 2025년 CNSA 2.0을 반영하도록 갱신**, **2027-01-01부터 신규 NSS(국가안보시스템) 획득은 기본적으로 CNSA 2.0 준수** 기대. 대부분 전환 목표 2033, NSM-10 최종 목표 2035 | 2025 갱신 | encryptionconsulting https://www.encryptionconsulting.com/quantum-proof-with-cnsa-2-0/ ; postquantum.com https://postquantum.com/cnsa-2-0/complete-guide/ | 🟡 / ⚠️ (2차 출처만, CNSSP-15 원문 미열람) |
| ST-04 | ⭐ **Caliptra 2.0 사양 원문의 CNSA 2.0 인용**: "Recent guidance from the US Government, CNSA 2.0, **requests the use of LMS by 2025**. Caliptra has an option to require LMS signatures in addition to ECDSA signatures (vendor and owner)." LMS 파라미터 = SP 800-208의 **LMOTS_SHA256_N24_W4, LMS_SHA256_M24_H15**(SHA256/192, 트리 높이 15), **벤더 LMS 트리 32개 + 오너 트리 1개**, "LMS 트리를 **지리적으로 분산된 여러 HSM**에서 생성할 것을 권고". "**2.0부터 ECDSA에 더해 ML-DSA-87 서명** 옵션(FIPS 204, CNSA 2.0 category 5)", "**Caliptra 2.1은 ML-KEM**(ECDH에 더해) 키 교환 지원". 인증서는 "**ECC secp384r1 + ML-DSA-87 이중 서명**"으로 "quantum-resistant RTM" | 사양 2.0 = 2025-07 | `chipsalliance/Caliptra` `doc/caliptra_20/Caliptra.ocp` §PQC requirements, 568행 (HEAD `55f1660`, 2026-10-01) https://github.com/chipsalliance/Caliptra/blob/main/doc/caliptra_20/Caliptra.ocp | ✅ |
| ST-05 | **NIST FIPS 203(ML-KEM)·204(ML-DSA)·205(SLH-DSA) 승인 2024-08-13**. **NIST IR 8547 초안(ipd, 2024-11-12)**: 112비트 보안 RSA·ECC(RSA-2048, P-256 등) **2030년 이후 deprecated, 2035년 이후 disallowed** 제안 | 2024-08-13 / 2024-11-12 | https://csrc.nist.gov/news/2024/postquantum-cryptography-fips-approved (차단) ; postquantum.com https://postquantum.com/security-pqc/nist-ir-8547-ipd/ | 🟡 |

### 1-B. 하이퍼스케일러 요구·로드맵

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| ST-06 | ⭐ **Microsoft Quantum Safe Program(QSP)**(Russinovich·Braverman-Blumenstyk): "Microsoft's roadmap aims to **complete transition of its services and products by 2033** ... **early adoption of quantum-safe capabilities by 2029**, gradually making them default". "striving to meet even the most forward-leaning **CNSA 2.0 deadlines outlined in CNSSP-15**". 3대 우선순위 1번: "updating Microsoft first- and third-party services, **supply chain**, and ecosystem to become quantum safe and crypto-agile". "**collaborating on hardware and firmware innovation** ... supported by Microsoft's open-source silicon initiatives". 2024년 **Adams Bridge Accelerator**(오픈소스 양자내성 암호 HW 가속기)를 기여해 **Caliptra 2.0에 통합**. ML-KEM·ML-DSA를 Windows CNG에 제공 | **2025-08-20** | https://www.microsoft.com/en-us/security/blog/2025/08/20/quantum-safe-security-progress-towards-next-generation-cryptography/ | ✅ |
| ST-07 | **Google**(Lagar-Cavilla·Huffman): "Caliptra 2.0 ... will tackle quantum cryptography to comply with NIST's recommendations for **module-lattice-based digital signatures and stateful hash-based signature schemes**" | **2024-04-24** | https://cloud.google.com/blog/topics/systems/google-security-innovation-at-the-ocp-regional-summit/ | ✅ |
| ST-08 | **OCP L.O.C.K. 사양의 PQC**: 원격 키관리 서비스가 드라이브로 접근 키를 보낼 때 쓰는 HPKE의 KEM으로 **ML-KEM-1024(0x0042), ML-KEM-1024+P-384 하이브리드(0x0051), P-384(0x0011)** 지원, KDF HKDF-SHA384, AEAD AES-256-GCM. 각주: "As of this specification's publication, **post-quantum HPKE KEMs are not fully ratified in IETF**" | 1.1 RC4 = 2026-06 | `doc/ocp_lock/lock_spec.ocp` §HPKE algorithm support | ✅ |
| ST-09 | AWS KMS가 **ML-DSA(FIPS 204) 서명 GA**(FIPS 140-3 Level 3 HSM 내). 클라우드 서비스 기능이며 장치(Nitro·스토리지) 펌웨어 서명 요구는 확인 못함(§7 NG-11) | 2025-06 | https://aws.amazon.com/about-aws/whats-new/2025/06/aws-kms-post-quantum-ml-dsa-digital-signatures (차단, 검색 요약) | 🟡 |

### 1-C. 스토리지·컨트롤러 벤더의 PQC·보안 발표

| ID | 벤더·제품 | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|---|
| ST-10 | ⭐ **Samsung PM1763** (PCIe 6.0 엔터프라이즈 SSD, 9세대 V-NAND, 4nm 컨트롤러) | 양산 발표 문구: "**post-quantum cryptography (PQC)** algorithms designed to protect against future quantum computing threats, as well as **TEE Device Interface Security Protocol (TDISP)**". 일부 2차 요약은 "**SPDM 1.4, CNSA 2.0**" 지원도 기재 | **2026-07-07~08** | Las Vegas Sun(보도자료 전재) https://lasvegassun.com/news/2026/jul/07/samsung-begins-mass-production-of-pm1763-ssd-optim/ ; 제품 페이지 https://semiconductor.samsung.com/ssd/enterprise-ssd/pm1763 (차단) ; Digital Today https://www.digitaltoday.co.kr/en/view/79258/samsung-electronics-begins-mass-production-of-pm1763-high-speed-ssd-for-ai-servers | 🟡 (PQC·TDISP) / ⚠️ (SPDM 1.4·CNSA 2.0: 단일 요약, 원문 미확인) |
| ST-11 | **Western Digital Ultrastar DC HC6100 UltraSMR** (HDD) | "**PQC-ready secure boot and firmware protection**", 고객 인증(qualification) 중. 근거 문구: 양자 능력을 가진 공격자가 **펌웨어 업데이트 서명을 위조**할 수 있음 | **2026-05-18** | https://www.westerndigital.com/company/newsroom/press-releases/2026/2026-05-18-wd-advances-next-generation-trusted-infrastructure-with-post-quantum-cryptography (차단, 검색 요약) | 🟡 |
| ST-12 | **ScaleFlux FC6116** (PCIe Gen6 NVMe SSD 컨트롤러) | "silicon directly integrates **Caliptra 2.0 Root of Trust**", 보안 항목에 **CNSA 2.0 PQC**, PCIe IDE, AES-256, Secure Boot, TCG Opal 2.0, **OCP S.A.F.E.** 기재. 28GB/s 읽기, 7M IOPS. **Q4 2026 주요 고객 샘플링** | 데이터시트 2026-07 / FMS 2026 | https://scaleflux.com/wp-content/uploads/2026/07/FC6116-Datasheet-ScaleFlux.pdf (차단) ; techtimes https://www.techtimes.com/articles/322106/20260729/scaleflux-readies-pcie-gen-6-nvme-cxl-controllers-ai-infrastructure.htm | 🟡 |
| ST-13 | Microchip | Switchtec Gen6 PCIe 스위치에 HW RoT·**CNSA 2.0 PQC**(FMS 2026에서 Micron과 Gen6 스토리지 공동 시연), 노트북용 EC MEC175xB는 ML-DSA 증명·CNSA 1.0/2.0/하이브리드 보안 부팅 구성. **SSD 컨트롤러(Flashtec) PQC 발표는 확인 못함** | 2026-08-04 / 상시 | kucoin(보도 요약) https://www.kucoin.com/news/flash/microchip-and-micron-unveil-pcie-gen-6-storage-for-ai-era ; https://www.microchip.com/en-us/products/embedded-controllers/notebook-desktop/mec175xb (차단) | 🟡 |
| ST-14 | Micron 9550 / 7600 | 보안 항목 **SPDM 1.2**, SHA-512·RSA(9550), SED 옵션·Micron SEE(격리 보안 처리 유닛)·**FIPS 140-3 L2**·**TAA 준수 옵션**(7600). **PQC 표기는 확인 못함** | 2024~2025 | thetechoutlook(Micron PR) https://www.thetechoutlook.com/press-release/micron-advances-ocp-storage-support-for-cloud-scale-and-enterprise-data-centers/ ; notebookcheck https://www.notebookcheck.net/Micron-unveils-trio-of-9th-Gen-NAND-SSDs.1073395.0.html | 🟡 |
| ST-15 | ⭐ **DMTF libspdm**(SPDM 참조 구현) | README 원문: 지원 사양 **SPDM 1.0.2~1.4.1**(단 "Additional SPDM 1.4 messages will be implemented in future releases"), **"Currently supported PQC algorithms: Signature: ML-DSA/SLH-DSA, KeyEncapsulation: ML-KEM"**. **DSP0286 "SPDM to Storage Binding" 1.0.0** 지원. 태그 최신 `4.0.0-rc2` | 2026-10-03 열람 | https://raw.githubusercontent.com/DMTF/libspdm/main/README.md ; `git ls-remote --tags https://github.com/DMTF/libspdm` | ✅ |

---

## §2. 하드웨어 신뢰 루트(RoT)·감사(S.A.F.E.)·증명(SPDM)

### 2-A. Caliptra

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| ST-20 | ⭐ **Caliptra 2.0 사양 범위에 SSD 명시**: "The silicon iRoT scope includes all datacenter-focused server class SoC / ASIC devices (**SSD - DC**, NIC, CPU, GPU - DC)"; "**2.0 scope includes further datacenter devices such as SSD, HDD, BMC, DIMM, PSU, CPLD** etc." "Caliptra reference code (including RTL and firmware) is intended to be **adopted as-is, without modification**." 개정: **1.0 = 2024-03, 2.0 = 2025-07**("Addition of Caliptra Subsystem"). 2.0 사양 기여사(OWFa): **AMD, Google, Microsoft, Nvidia** | 2025-07 | `doc/caliptra_20/Caliptra.ocp` 148~155행, 개정표 | ✅ |
| ST-21 | Caliptra "Scale": "**committed intercept for Google and Microsoft first party Cloud silicon** ... also a committed intercept for **AMD server silicon** products". "Sustainability": 현대 공정에서 **약 0.25mm²**, 400MHz에서 **DICE 체인 생성 200ms 미만** | 2025-07 | 동상 | ✅ |
| ST-22 | **Caliptra 로드맵 원문**: 2.0 Subsystem ROM 최종 **2025-10-17**, FMC·런타임 FW **2025-10-31**; **2.1 HW 릴리스 2025-10-10**, ROM **2026-01-30**, FMC·런타임 FW **2026-02-27**; **Subsystem FIPS 인증서 가용 시점 "TBD"**. 2.1 HW 항목에 ML-KEM, SHAKE256, AES-GCM DMA, **OCP LOCK 구현**(KV22에 HEK seed, KV23 키를 "storage device's line-rate encryption engine"으로 방출) | 문서 열람 2026-10-03 | `doc/caliptra_20/Roadmap.md` | ✅ |
| ST-23 | Google: "The Caliptra community ... now includes 9elements, AMI, Antmicro, ASPEED, Axiado, Lubis EDA, **ScaleFlux, Marvell** and Nuvoton". "The Caliptra IP block is currently being integrated by companies across the ecosystem into **chips that will start to appear in the market in 2026**." | 2024-04-24 | ST-07 URL | ✅ |
| ST-24 | ⭐ **Caliptra 상표 승인 제품 레지스트리 = 비어 있음**. 상표 트랙 3종: Caliptra Core Only / Caliptra Subsystem / **Caliptra Subsystem with OCP L.O.C.K.** | HEAD 2026-10-01 | `doc/trademark/ApprovedProductsRegistry.md` | ✅ |
| ST-25 | CHIPS Alliance **Caliptra 2.1 RTL 릴리스 2025-10-15**: Adams Bridge 2.0(ML-DSA·ML-KEM, 부채널 대책), 오너십 이전, 스트리밍 부팅 복구. OCP Summit 2025에서 Microsoft가 "Microsoft, in collaboration with **Google, Samsung, Kioxia, and Solidigm**, developed OCP L.O.C.K. ... implemented in Caliptra 2.1 ... **attested secure erase**" | 2025-10 | https://www.chipsalliance.org/news/caliptra2-1/ (차단) ; Azure 블로그 https://azure.microsoft.com/en-us/blog/wp-json/wp/v2/posts/7613 (차단) | 🟡 |

### 2-B. OCP L.O.C.K. (스토리지 전용 키 관리 블록)

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| ST-26 | ⭐ **OCP L.O.C.K. 사양 원문 - 기여사·저자**: project "**NVMe™**", 저자 Jeff Andersen·Carl Lundin·Zach Halvorsen(Google)·**Gwangbae Choi(Samsung)**. OWFa 기여사: **Google, Microsoft, Samsung, Kioxia, Solidigm**. 감사의 글: Google 8명, Microsoft 8명, **Samsung 4명**(Eric Hibbard, Gwangbae Choi, Jisoo Kim, Michael Allison), Solidigm 3명, Kioxia 4명, **Micron 6명**. 버전: **1.0 = 2025-09**("Initial release"), **1.1 RC1~RC4 = 2026-05~06**, 다음 항목 "TBD: Address compliance feedback". `releases/`에 v0.8~v1.1_RC4 PDF 10개 | 2025-09 / 2026-06 | `doc/ocp_lock/lock_spec.ocp` 머리말·License·Acknowledgements ; `doc/ocp_lock/releases/` | ✅ |
| ST-27 | ⭐ **L.O.C.K. "Scale"·"Sustainability" 원문**: "OCP L.O.C.K. is a **committed intercept for storage products for Google and Microsoft**. This scale covers both a significant portion of the hyperscale and enterprise markets." "The goal of OCP L.O.C.K. is to **eliminate the need for cloud providers to destroy storage devices (e.g., SSDs)** by providing a mechanism that increases the confidence that a media encryption key within the device is deleted during cryptographic erase. This enables **repurposing the device and or components** on the device at end of use or end of life." | 동상 | `lock_spec.ocp` §Compliance with OCP Tenets | ✅ |
| ST-28 | **L.O.C.K. 위협 모델**: "The adversary profile extends **up to nation-states**." 공격 능력에 "**Interception of a storage device in the supply chain**", 데이터센터에서의 도난, 파괴적 분석, "Running arbitrary firmware on a stolen device. This includes attacks where **vendor firmware signing keys have been compromised**", 디버그 덤프·UART 로그 탈취, 멀티테넌트 VM에서의 코드 실행, "Accessing all device design documents, code, and RTL" 포함 | 동상 | `lock_spec.ocp` §Threat model | ✅ |
| ST-29 | **L.O.C.K. 구조**: Caliptra가 KMB로서 "**the only entity that can read MEKs** and program them into the SED's encryption engine"; "**MEKs are never visible to drive firmware**". 보호 키 3층: DPK(데이터 소유자, Opal C_PIN 또는 KPIO DEK) · **MPK(다자 보호 키, 접근 키는 HPKE로 보호되어 "served to the drive from a remote key management service, without revealing the access key to the drive's host")** · EPK = KDF(**SEK**: 드라이브 FW 관리·플래시 저장, **HEK**: 퓨즈 seed에서 유도, KMB 하드웨어만 접근). "All MEKs ... can be cryptographically erased by zeroizing either the SEK or HEK"; "**KMB reports the zeroization state** ... and therefore whether the drive is in a cryptographically erased state". TCG Opal·Enterprise·**Key Per I/O** 호환. "**feature set conditionally compiled into Caliptra Subsystem 2.1+**", 드라이브 FW는 MCU에서 실행. "A product that integrates OCP L.O.C.K. will be expected to **undergo an OCP S.A.F.E. review**" | 동상 | `lock_spec.ocp` §Architecture, §Integrating | ✅ |
| ST-30 | L.O.C.K. 개방성 문구: "OCP L.O.C.K. source for RTL and firmware will be licensed using the Apache 2.0 license. **The specific mechanics and hosting of the code are work in progress** due to CHIPS alliance timelines." 부록: 에폭 키 상태 증명용 EAT 포맷은 "**currently under public review within TCG Storage as part of the Epoch Key Purge feature set**"(인용 파일명 `TCG_Storage_Epoch_Key_Purge_Feature_v1_00_r0_32_30032026-RC1.pdf`) | 동상 | `lock_spec.ocp` §Openness, 부록 EAT | ✅ (TCG 문서 자체는 미열람) |

### 2-C. OCP S.A.F.E. (제3자 펌웨어 감사)

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| ST-31 | **S.A.F.E. 프레임워크 원문**: 목적 "The **provenance, code quality, and software supply chain** for firmware releases ... requires a strong degree of security assurance"; "**none of the security- or privacy-critical components are designed in a way that requires a data center provider ... to place trust in a single entity**"; 한 번의 심사로 다수 고객이 수용, "**increase the pace at which they receive, trust, and deploy critical firmware updates**". 개정: 0.1(2021) → **1.0(2023-09)** → 1.1(2024-10, manifest) → **1.2(2025-08, 게시 절차 명확화)**. 심사기관(SRP) **10곳**(Anvil, Atredis, Brightsight, IOActive, ivision, Keysight Riscure, Kudelski, NCC Group, Tetrel, Trail of Bits). **"The DV ... may elect to delay the publication, or not to publish at all and forgo OCP SAFE endorsement."** SFR은 펌웨어 해시로 벤더·장치·FW 버전을 식별하는 서명된 기계 판독 보고서 | HEAD 2026-10-01 | `opencomputeproject/OCP-Security-SAFE` `Documentation/framework.md`, `security_review_providers.md` | ✅ |
| ST-32 | Google: S.A.F.E. "provides security conformance assurance to consumers of **devices such as SSDs**" | 2024-04-24 | ST-07 URL | ✅ |
| ST-33 | ⭐ **공개 SFR 중 스토리지(전수, JSON 파싱)**: **FADU FC6161**(PCIe Gen6 NVMe 컨트롤러 ROM, IOActive, 완료 2026-01-16, 이슈 0) · **Kioxia XD7P**(NCC, 2026-01-29·2026-03-05, 이슈 0) · **Kioxia LD2-L**(NCC, 2026-04-21, 이슈 0; 커밋 2026-07-28) · **SK hynix PE9110 E1.S**(IOActive 위협 모델, 2023-07-14, 이슈 2: "No Minimum Password Length" CVSS 6.4, "NVMe and NVMe-MI Commands Return Metadata When Drive is Locked" 2.3) · **SK hynix PEB110**(Keysight Riscure, 2025-09-12, 이슈 2: "Integer underflow leads to OOB Write" 3.7, "Static stack guard value" 2.3; 커밋 2026-03-31) · **Micron 7550**(Keysight Riscure, 2025-08-13, 이슈 0; 커밋 2026-04-15) · Virtium Victoria SSD TCG Module(2025-11-03) · Rohde & Schwarz Trusted Disk(2026) · Cigent Software FDE(2026) | 2023-07~2026-07 | `Reports/{FADU,Kioxia,SK_hynix,micron,Virtium,...}/` | ✅ |
| ST-34 | ⭐ **Samsung·Solidigm·Western Digital/Sandisk·Phison·Marvell(SSD)·Silicon Motion은 공개 SFR 없음.** 전체 git 이력(`--unshallow`) 파일명·커밋 메시지에서도 Samsung·Solidigm 흔적 0건. (ST-31에 따라 **비공개 심사 여부는 알 수 없음**) | HEAD `ce04fca` 2026-10-01 | 동 저장소 `git log --all` | ✅ |
| ST-35 | ⭐ **S.A.F.E. 스토리지 삭제(sanitization) 요건 원문**: MEK는 내부 키(Internal Key)와 외부 키(External Key, 예: Opal C_PIN) 둘 다 없으면 복구 불가해야 함. 내부 키는 ≥256비트, 디버그·제조 인터페이스·덤프로 접근 불가, (Scope 3) DPA 부채널 방어, 퓨즈 비밀로 암호화 권장, "**An erase command may only report success after all old copies of the Internal Key have been destroyed irreversibly**", (Scope 3) "**should be unrecoverable with a budget of up to $10M**", "**It should be possible to destroy the Internal Key even when other parts of the drive are faulty, such as ... flash chips that have reached the maximum number of write-cycles**". 과거 구현 오류 목록: 외부 키 해시를 저장해 비교, **내부 키 백업 사본을 삭제 시 누락**, ATA 보안 활성화 시 구 MEK 미삭제, 다중→단일 사용자 전환 시 MEK 미삭제 | HEAD 2026-10-01 | `Documentation/storage_sanitization.md` ; `review_scope.md`(Scope 1~3, "Secrets and storage must support secure erasure and reset", "must have a mechanism to detect modification or replay") | ✅ |

### 2-D. OCP NVMe SSD 사양·SPDM·호스트 스택

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| ST-36 | **OCP Datacenter NVMe SSD 사양의 보안 관련 로그(구현 코드)**: nvme-cli OCP 플러그인에 **TCG Configuration Log(C7h)**(Locking SP 활성·Revert 횟수, Locking Object 수, SID 인증 시도 횟수·한도, TCG 오류 수), TCG Activity 이벤트, Device Capabilities 로그의 **Sanitize Command Support**, SMART 확장 로그 **Security Version Number**(바이트 151:144, 롤백 방지) 정의. 레포 B08(v2.5 보안 강화)·B10(v2.6 S.A.F.E. 강조)과 연결. **사양 원문의 보안 요구 조항(Caliptra·L.O.C.K.·LMS 의무 여부)은 미확인**(§7 NG-04) | master 2026-10-02 | `plugins/ocp/ocp-nvme.h`, `ocp-smart-extended-log.h`, `Documentation/nvme-ocp-tcg-configuration-log.txt` https://github.com/linux-nvme/nvme-cli | ✅ (코드) |
| ST-37 | SPDM 탑재 SSD 사례: Samsung PM9E1 SPDM v1.2(레포 D-16), Micron 9550·7600 SPDM 1.2(ST-14), Samsung PM1763 SPDM 1.4(ST-10, ⚠️) | 2024~2026 | 각 ID | 🟡 / ⚠️ |
| ST-38 | **Linux 메인라인(7.3-rc5)**: `drivers/pci`에 **PCI_TSM**("TDISP ... manages **device authentication, link encryption**, link integrity protection, and assignment of PCI device functions ... to confidential computing VMs")과 PCI_IDE 존재. **커널 자체 SPDM 라이브러리(`lib/spdm`)는 없음**(인증은 플랫폼 TSM에 위임하는 구조) | 2026-10-03 열람 | https://raw.githubusercontent.com/torvalds/linux/master/drivers/pci/Kconfig ; …/drivers/pci/Makefile ; …/lib/Makefile | ✅ |

---

## §3. 드라이브 재사용·삭제(sanitization)

### 3-A. 하이퍼스케일러의 현재 관행: 파쇄 vs 재사용

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| ST-40 | ⭐ **OCP L.O.C.K. 배경 원문**: "Customer data is not allowed to leave the data center. ... **The current default cloud provider policy to ensure this level of security is to destroy the drive.** Other policies may exist that leverage drive capabilities (e.g., cryptographic erase), but are **not generally deemed inherently trustworthy by these cloud providers** [Self-encrypting deception]. This produces significant e-waste and inhibits any re-use/recycling." | 2025-09 / 2026-06 | `lock_spec.ocp` §Background | ✅ |
| ST-41 | 위 근거 논문: Meijer·van Gastel, "Self-encrypting deception: weaknesses in the encryption of solid state drives", IEEE S&P 2019. 2014~2018년 3개 제조사 SSD(Crucial MX100/200/300, **Samsung 840 EVO·850 EVO, T3·T5**) 펌웨어 역공학, **다수 모델에서 비밀 없이 데이터 완전 복구** 가능. BitLocker가 HW 암호화에 의존하던 문제 동반 | 2019 | https://www.ieee-security.org/TC/SP2019/papers/310.pdf (검색 요약) | 🟡 |
| ST-42 | ⭐ **Microsoft Garage(#NoShred 프로젝트)**: "With Circular Centers, this means **shredding every hard drive** to protect sensitive materials". "**in 2022 alone, there were two million hard disks shredded**". 목표: "#NoShred ... **90% reuse and recycle rate of all hard disks by 2025**"(데이터 플래터는 파괴, 나머지 부품 회수) | 페이지 JSON-LD 2025-11-19 / 내용 2022 해커톤 | https://www.microsoft.com/en-us/garage/wall-of-fame/saving-the-planet-one-hard-drive-at-a-time/ | ✅ |
| ST-43 | ⭐ **Microsoft Cloud 블로그**(Rani Borkar, CVP Azure HW): **2024년 서버·부품 재사용·재활용률 90.9%**(2025 목표 90% 1년 조기 달성), **부품 320만 개 이상 재사용**, Circular Center 가치 회수 30%+ 증가. HDD: "When HDDs are retired from service, **the data-carrying components are sanitized and shredded** to ensure data security". WD·Critical Materials Recycling·PedalPoint와 **HDD 약 50,000파운드**에서 희토류 회수, 수율 90%, 배출 −95%(LCA) | **2025-04-17** | https://www.microsoft.com/en-us/microsoft-cloud/blog/2025/04/17/sustainable-by-design-innovating-for-zero-waste/ | ✅ |
| ST-44 | **Microsoft 2026 환경 지속가능성 보고서 페이지**: "Microsoft Circular Centers have expanded to **seven facilities** ... **In 2024, we reused or recycled 92%** of this hardware ... more than 3.2 million components were reused". **같은 2024년 수치가 ST-43(90.9%)과 다름** | 2026 보고서 페이지(2026-10-03 열람) | https://www.microsoft.com/en-us/corporate-responsibility/topics/sustainability/report/ | ✅ / ⚠️ 충돌(90.9% vs 92%, 정의·재집계 차이 미확인) |
| ST-45 | **Google**: 2024년 폐기 DC 하드웨어에서 **부품 약 880만 개** 회수, 그중 **"over 3 million hard drives that were securely wiped and reused or resold"**; 데이터 덮어쓰기 후 **전 디스크 읽기로 검증**. 2026 환경보고서(2025 실적): 부품 **750만 개+** 회수, 2015년 이후 **5,400만 개+ 재판매**(2025년 260만 개) | 2025 / 2026-06 | https://sustainability.google/stories/ten_years_of_data_center_circularity/ ; Resource Recycling https://resource-recycling.com/e-scrap/2026/07/08/what-googles-latest-report-means-for-itad/ | 🟡 (원문 차단) |
| ST-46 | **OCP·Circular Drive Initiative(CDI) 백서 "Data Sanitization for the Circular Economy"**: 데이터센터가 **첫 사용 후 저장장치의 최대 90%를 파기**, 재사용 가능한 상태를 유지하는 **purge 삭제** 사용을 제안. CDI 회원 Seagate·Western Digital·Micron·Chia Network 등 | 2022 | https://opencompute.org/documents/data-sanitization-for-the-circular-economy-1-pdf (차단) ; Chia 블로그 https://www.chia.net/2022/09/30/ocp-and-cdi-whitepaper-data-sanitization-enabling-the-circular-economy/ | 🟡 |

### 3-B. 표준·규제

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| ST-47 | **NIST SP 800-88 Rev.2 최종 2025-09-26**(Rev.1 2014 대체). **암호 삭제를 제외한 기술별 삭제 기법은 범위 밖**으로 하고 **IEEE 2883 등 최신 표준을 참조**하도록 전환. Clear·Purge·Destroy 3분류는 유지 | 2025-09-26 | https://csrc.nist.gov/pubs/sp/800/88/r2/final (차단) ; Blancco https://blancco.com/resources/blog-nist-800-88-rev-2-updated-standard/ | 🟡 |
| ST-48 | **IEEE 2883-2022**(2022-08): 논리·물리 저장장치 삭제, SATA·SAS·NVMe 기술별 요건, Clear·Purge·Destruct, 암호 삭제 검증·다중 네임스페이스. **ISO/IEC 27040:2024** 병행 | 2022-08 / 2024-01 | jetico https://jetico.com/blog/ieee-2883-2022-standard-sanitizing-storage-explained/ | 🟡 |
| ST-49 | ⭐ **NVMe 표준의 재사용용 훅(구현 코드·문서)**: Sanitize 동작 = Block Erase / Overwrite / **Crypto Erase** / Exit Failure / **Exit Media Verification**; **`--emvs` Enter Media Verification State**(삭제 후 매체 검증 상태 진입); **`--preq` Purge Required: "the host is requesting that the user data be purged as defined by IEEE Std 2883"**, 지원 시 SANICAP **SPRRS**(Sanitize Purge Request and Reporting) 비트와 Sanitize Status 로그의 PRGD 필드; SANICAP에 **VERS(검증)·NVERS(네임스페이스 검증)** 비트; **Sanitize Namespace 관리 명령(opcode 0x8C)** | master 2026-10-02 | nvme-cli `Documentation/nvme-sanitize.txt` ; `libnvme/src/nvme/nvme-types-base.h`(SANICAP), `nvme-cmds-base.h`(0x8C) | ✅ |
| ST-50 | **EU Ecodesign 규정 (EU) 2019/424**(서버·데이터 스토리지 제품): **보안 데이터 삭제 기능** 제공(2020-03-01부터), **최신 보안 펌웨어 업데이트를 제품 모델의 마지막 단위 출시 후 최소 8년까지 무상 제공**(2021-03-01부터), 핵심 부품 분해성. "Secure data deletion" 정의 = 원 데이터 접근이 주어진 노력 수준에서 불가하도록 완전 덮어쓰기 등. 일부 요약은 적용 대상을 **드라이브 4~400개 시스템**으로 기재 | 2019-03-15 제정 | legislation.gov.uk https://www.legislation.gov.uk/eur/2019/424/data.html (차단) ; SNIA 블로그 https://www.snia.org/blog/2019/what-secure-data-deletion-means (차단, 검색 요약) | 🟡 / ⚠️ (4~400개 범위: 단일 요약) |
| ST-51 | **Ecodesign 2019/424 개정 진행**: Commission 초안(GEN-926.00) 4주 의견수렴(7-31 마감), 분해·수리·재활용 개선, **부품 페어링(parts pairing) 금지**, 부품·핵심 원자재 정보 요구. 개정안 공표는 **2026년 말 예상** | 2025~2026 | REHVA https://www.rehva.eu/news/article/the-european-commission-has-opened-the-public-feedback-on-a-draft-act-on-ecodesign-regulation-on-servers-and-data-storage-products-gen-92600 ; complianceandrisks https://complianceandrisks.com/?p=29985 | 🟡 / ⚠️ (의견수렴 연도·보안 삭제 조항 변경 여부 미확인) |
| ST-52 | **인프라 재사용 논지와의 연결점(기존 원장)**: 하이퍼스케일러 범용 서버 내용연수 5~6년, Microsoft 건물 25년(IR-01~IR-09), Amazon AI/ML 일부 서버 6→5년(IR-08) | 2022~2026 | [ssd-mixed-media-infra-reuse-2026-10.md](ssd-mixed-media-infra-reuse-2026-10.md) | 레포 참조 |

---

## §4. 디커플링·소버린(주권) 요건

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| ST-60 | ⭐ **중국 CAC의 Micron 사이버보안 심사**: 2023-03 개시, **2023-05-21 "불합격"** 발표, **핵심정보인프라(CII) 운영자의 Micron 제품 구매 중단** 지시(제품·위험 미특정). Micron은 2023-06 SEC 공시에서 **중국 본토·홍콩 매출의 약 절반이 위험**하다고 밝힘(당시 중국·홍콩 고객 = 전체 매출의 약 1/4) | 2023-05-21 | DigiChina https://digichina.stanford.edu/work/targeting-u-s-chip-firm-micron-chinas-cybersecurity-reviews-continue-to-evolve (차단) ; Bloomberg Law https://news.bloomberglaw.com/ip-law/china-bars-purchases-of-micron-chips-escalating-tech-clash-2 | 🟡 |
| ST-61 | **중국 독자 PQC 표준화(NGCC)**: 상용암호표준연구원(ICCS)이 **2025-02-05** "차세대 상용 암호 알고리즘 프로그램" 개시(공개키·해시·블록암호), NIST와 별도 경로. 1차 후보 **서명 34·KEM 41·키교환 9 + 해시 35**를 9월 20일 공개. "**3년 내 국가 PQC 표준**" 전망(2026-03 보도) | 2025-02-05 / 2026-03-19 | The Quantum Insider https://thequantuminsider.com/2025/02/18/china-launches-its-own-quantum-resistant-encryption-standard-bypassing-us-efforts/ ; https://thequantuminsider.com/2026/03/19/china-expects-post-quantum-cryptography-standards-within-three-years/ ; postquantum.com https://postquantum.com/security-pqc/china-ngcc-candidate-flaws/ | 🟡 / ⚠️ (1차 후보 공개 연도 2025·2026 혼재) |
| ST-62 | ⭐ **SPDM 참조 구현의 암호 이원화**: libspdm 지원 전통 알고리즘에 **SM3 해시, SM2-Sign, SM2-KeyExchange, SM4_GCM**(중국 상용암호) 포함, 원문 "**NOTE: NIST algorithms and Shang-Mi (SM) algorithms should not be mixed together.**" mbedTLS 래퍼는 SM·ML-DSA·SLH-DSA·ML-KEM 미지원, OpenSSL 래퍼는 SM2-KeyExchange·SM4_GCM 미지원 | 2026-10-03 열람 | ST-15 URL | ✅ |
| ST-63 | 중국: 정부조달 지침이 향(鄕)급 이상 기관에 "안전·신뢰(安全可靠)" 국산 프로세서·OS 우선, **국유기업 2027년까지 국산 전환**(분기 보고). **SM2/SM3/SM4가 정부조달·금융·통신 등 핵심 분야에서 의무** | 2024-03~ | Verdict https://www.verdict.co.uk/china-bars-intel-and-amd-chips-in-government-computers/ ; hicom-asia https://translate.hicom-asia.com/area/sm4-block-cipher/ | 🟡 |
| ST-64 | 미국: 2025-06 행정명령이 EO 14144의 **소프트웨어 공급자 증명(SSDF attestation) FAR 개정·중앙 SBOM 제출 요구를 삭제**, 단 **CISA의 PQC 지원 제품 범주 목록(2025-12-01까지)**과 **TLS 1.3(2030까지)**은 유지. 연방 조달 금지 일정(1260H, Sec.5949 2027-12-23)은 레포 참조 | 2025-06 | Crowell https://www.crowell.com/en/insights/client-alerts/trump-administration-cyber-executive-order-revises-prior-administrations-requirements ; 레포 [hybrid-bonding-structures-china-limits-2026-08.md](hybrid-bonding-structures-china-limits-2026-08.md) | 🟡 / 레포 |
| ST-65 | **EU Cyber Resilience Act (EU) 2024/2847**: 2024-12 발효, **2026-09-11부터 악용 취약점·중대 사고 보고 의무**(24시간 조기경보·72시간 통보·14일 최종), **2027-12-11 전면 적용**(CE 마킹, 적합성 평가, **SBOM**, 보안 설계 문서 10년 보관), 과징금 최대 €15M 또는 전 세계 매출 2.5%. 하드웨어·소프트웨어 "디지털 요소를 가진 제품" 대상 | 2024-12 / 2026-09-11 / 2027-12-11 | noze https://www.noze.it/en/insights/cyber-resilience-act-sbom/ ; cloudsmith https://cloudsmith.com/blog/the-eu-cyber-resilience-act-what-engineering-teams-need-to-do-to-be-compliant | 🟡 / ⚠️ (단품 SSD 적용 범위 해석 미확인) |
| ST-66 | **EU Cloud Sovereignty Framework v1.2.1**(Commission, 2025-10): 주권 목표 8개(SOV-1~8: 전략, 법·관할, 데이터·AI, 운영, **공급망**, **기술**, 보안·컴플라이언스, 환경) × SEAL-0~4 등급, 최소 등급 미달 시 자동 탈락, **€180M 소버린 클라우드 입찰**에 적용 | 2025-10 | kiteworks https://www.kiteworks.com/regulatory-compliance/european-digital-sovereignty-procurement/ ; ayedo https://ayedo.de/en/cloud-sovereignty-framework/ | 🟡 |
| ST-67 | **출처(provenance) 증빙 수단(원문)**: S.A.F.E. SFR은 벤더·제품·FW 버전·**펌웨어 해시**를 서명된 JSON으로 고정(예: SK hynix PEB110 SFR에 `manifest` 파일 해시 포함, ST-33), Caliptra는 DICE 신원·측정 부팅·증명(ST-20~21), L.O.C.K.는 공급망 가로채기·벤더 서명키 탈취를 위협 모델에 포함(ST-28). Micron 7600은 **TAA(무역협정법) 준수 옵션** 제공(ST-14, 🟡) | - | ST-14·20·28·33 | ✅ / 🟡 |
| ST-68 | **고객 키 통제 경로(원문)**: L.O.C.K. MPK는 "access key is served to the drive from a remote key management service, **without revealing the access key to the drive's host**"(ST-29). 소버린 클라우드의 고객 보유 키(HYOK) 요구와 이 메커니즘을 **연결한 공개 진술은 확인 못함**(§7 NG-09) | - | ST-29 | ✅ (메커니즘) / ⚠️ (연결은 미확인) |

---

## §5. 반증·긴장 관계

| ID | 반증 | 일자 | 출처 | 등급 |
|---|---|---|---|---|
| ST-70 | **하이퍼스케일러는 아직 데이터 매체를 파쇄한다**: Microsoft는 2025년에도 "data-carrying components are sanitized and **shredded**"(ST-43), 2022년 HDD 200만 개 파쇄(ST-42). L.O.C.K. 원문도 현재 기본 정책 = 파기(ST-40) | 2022~2026 | ST-40·42·43 | ✅ |
| ST-71 | **드라이브 자체 암호 삭제는 불신의 이력이 있다**: L.O.C.K.가 SED 취약 논문(ST-41)을 근거로 "not generally deemed inherently trustworthy"라고 명시. S.A.F.E.는 실제로 관찰된 **키 백업 사본 미삭제 등 구현 오류 4종**을 열거(ST-35). Samsung 840/850 EVO가 해당 논문의 분석 대상(ST-41) | 2019~2026 | ST-35·40·41 | ✅ / 🟡 |
| ST-72 | **L.O.C.K.·Caliptra 탑재 SSD의 출하는 아직 확인되지 않는다**: Caliptra 상표 승인 제품 0개(ST-24), L.O.C.K. 1.1은 RC 단계·코드 호스팅 "work in progress"(ST-26·30), Caliptra Subsystem FIPS 인증서 "TBD"(ST-22), Caliptra 2.0 통합 컨트롤러 ScaleFlux FC6116은 **Q4 2026 샘플링**(ST-12) | 2026-10 기준 | ST-12·22·24·26·30 | ✅ / 🟡 |
| ST-73 | **L.O.C.K.의 규격 충돌(비목표 원문)**: IEEE 1619-2025 키 범위(MEK당 2^44 블록) 준수는 드라이브 FW 책임. **Common Criteria FCS_CKM.1.1(c)**는 주입 키(KPIO DEK)의 조건화를 허용하지 않아, "A storage device that integrates OCP L.O.C.K. and aims to be compliant with this Common Criteria requirement **may not support Key Per I/O**." 물리 접근 공격자의 가용성 공격 방어도 범위 밖 | 2025-09~ | `lock_spec.ocp` §Non-goals | ✅ |
| ST-74 | **PQC 일정의 구속력·속도 차이**: CNSA 2.0은 미국 **NSS 대상**(ST-01~03), NIST IR 8547은 **초안**(ST-05), Microsoft의 상용 기본값 전환은 **2033**(ST-06)으로 CNSA 펌웨어 서명 배타 사용(2030)보다 늦다. PQ HPKE KEM은 IETF 미비준(ST-08) | 2024~2026 | ST-01·03·05·06·08 | ✅ / 🟡 |
| ST-75 | **LMS(상태 기반 서명)의 운영 부담**: Caliptra는 벤더 LMS 트리 32개, "지리적으로 분산된 여러 HSM"에서 트리 생성 권고(ST-04) - 서명 상태 관리가 별도 인프라를 요구 | 2025-07 | ST-04 | ✅ |
| ST-76 | **정책 변동성**: 미국은 2025-06 중앙 SBOM·증명 요구를 삭제(ST-64), EU는 CRA로 SBOM 의무화(ST-65) - 지역별로 방향이 반대 | 2025~2027 | ST-64·65 | 🟡 |
| ST-77 | **재사용 기간의 단축 압력**: AI/ML 서버 일부 내용연수 6→5년(레포 IR-08). Google 재사용 수치는 "hard drives"로 표기되어 **SSD 포함 여부 불명**(ST-45, §7 NG-05) | 2025 | 레포 IR-08 ; ST-45 | 🟡 |
| ST-78 | **감사가 실제 결함을 찾는다**: SK hynix PEB110 SFR에 "Integer underflow leads to OOB Write"(CVSS 3.7), PE9110에 "Locked 상태에서 메타데이터 반환"(ST-33). 공개 SFR 이슈는 **재시험 후 최종 결과만** 기재(ST-31) | 2023~2025 | ST-31·33 | ✅ |

---

## §6. ⚠️ 파생 정리 (산술·교차표, 판단 아님)

| ID | 파생 내용 | 근거 | 등급 |
|---|---|---|---|
| ST-80 | **일정 겹침**: 2027년 배치된 SSD가 6년 서버에서 쓰이면 **2033년까지** 현장에 있다. 그 사이 CNSA 2.0 펌웨어 서명 배타 사용(2030), NIST IR 8547 초안의 112비트 RSA/ECC deprecated(2030 이후), Microsoft QSP 기본값 전환(2033)이 모두 지나간다. 즉 **2026~2027년에 퓨즈·ROM에 고정되는 펌웨어 검증 키·알고리즘은 2030년 이후에도 검증에 쓰인다** | ST-01·05·06 ; 레포 IR-01~IR-09 | ⚠️ 파생 |
| ST-81 | **Ecodesign 펌웨어 의무 기간 산술**: 어떤 서버·스토리지 모델의 마지막 단위가 2030년에 출시되면 보안 펌웨어 업데이트 제공 의무는 **2038년까지**(마지막 출시 + 8년). 의무 주체는 서버·스토리지 제품 제조사이며, 내장 SSD 펌웨어 공급이 이 기간을 따라가야 하는지는 **계약 사항**(규정 원문 미열람) | ST-50 | ⚠️ 파생 |
| ST-82 | **SSD 벤더별 교차표(공개 원문 기준)** | ST-26·33·34 | ✅ 교차 |

| 벤더 | OCP L.O.C.K. 사양 기여(OWFa) | L.O.C.K. 감사의 글(인원) | S.A.F.E. 공개 SFR |
|---|---|---|---|
| Samsung | ✅ (저자 1인 포함) | 4 | **없음** |
| Kioxia | ✅ | 4 | XD7P·LD2-L (이슈 0) |
| Solidigm | ✅ | 3 | **없음** |
| Micron | 없음 | 6 | 7550 (이슈 0) |
| SK hynix | 없음 | 0 | PE9110(2023)·PEB110(2025) |
| FADU(컨트롤러) | 없음 | 0 | FC6161 ROM (이슈 0) |

---

## §7. 부정 확인 (검색했으나 확보하지 못한 것)

- **NG-01. Samsung PM1763의 SPDM 1.4·CNSA 2.0 지원을 명시한 Samsung 1차 원문.** 뉴스룸·제품 페이지 차단. 확인된 것은 PQC·TDISP 문구(🟡)뿐. 검색어: `"PM1763" "SPDM" "CNSA 2.0"`, `semiconductor.samsung.com PM1763 "SPDM 1.4"`.
- **NG-02. Kioxia·Solidigm·SK hynix·Phison·Marvell·Silicon Motion의 "PQC 서명 펌웨어" SSD·컨트롤러 발표.** 없음. `post-quantum PQC SSD firmware signing ML-DSA LMS enterprise SSD announcement ...`, `Kioxia OR Micron OR Solidigm OR "SK hynix" SSD "post-quantum" OR "CNSA 2.0"`.
- **NG-03. Caliptra 또는 OCP L.O.C.K.를 탑재해 양산 출하 중인 SSD.** 없음. 상표 레지스트리 0건(ST-24), 최초 통합 컨트롤러 샘플링 Q4 2026(ST-12).
- **NG-04. OCP Datacenter NVMe SSD 사양 v2.6·v2.7의 보안 요구 조항 원문**(Caliptra·L.O.C.K.·LMS·SPDM 의무 여부). opencompute.org 차단. 2차 요약에는 "v2.7에 L.O.C.K. 지원 예정" 문구가 있었으나 출처 불명으로 채택하지 않음.
- **NG-05. 하이퍼스케일러가 SSD를(HDD가 아니라) 실제로 재사용·재판매한 수치.** 없음. Google 300만 개는 "hard drives" 표기(ST-45), Microsoft는 HDD 파쇄(ST-42·43).
- **NG-06. Meta의 데이터 저장매체 폐기·재사용 정책 공개 진술.** 없음. `Meta data centers decommissioned hard drives SSD shredded or reused ...`.
- **NG-07. 1차 원문 미열람**: CNSA 2.0 알고리즘 문서·FAQ, CNSSP-15, NIST FIPS 203/204/205, NIST IR 8547, SP 800-88 Rev.2, IEEE 2883, EU 2019/424 Annex II, CRA, TCG Epoch Key Purge(모두 차단) → 해당 ID는 🟡.
- **NG-08. 중고 엔터프라이즈 SSD의 2차 시장 가격·잔존 가치.** 없음.
- **NG-09. 소버린 클라우드 요건이 저장장치 수준(원산지·펌웨어 출처·키 통제)을 직접 규정한 사례.** 없음. EU 프레임워크는 "공급망" 목표 수준(ST-66)에 그침.
- **NG-10. 중국 내 데이터센터용 SSD에 SM 알고리즘 펌웨어 서명·암호를 의무화한 규정 원문.** 없음(분야 일반 의무만 🟡, ST-63).
- **NG-11. AWS의 장치(Nitro·스토리지) 펌웨어 PQC 요구.** 없음(KMS 서비스만, ST-09).
- **NG-12. Samsung·Solidigm의 OCP S.A.F.E. 공개 보고서.** 전체 git 이력까지 0건(ST-34). 비공개 심사 여부는 확인 불가.
- **NG-13. 중국 NGCC 1차 후보 공개의 정확한 연도.** 2025와 2026이 혼재(ST-61).
- **NG-14. Linux 커널 자체 SPDM(PCI CMA) 메인라인 병합.** 7.3-rc5 기준 없음(ST-38).
- **NG-15. Microsoft 2024년 재사용·재활용률 90.9%와 92%의 차이 설명.** 없음(ST-43·44).

---

## §8. 보고서에 쓸 수 있는 문장 (사실로만, 그대로 복사 가능)

> **1. ✅ (재사용 = 하이퍼스케일러가 명시한 목표)** "Google·Microsoft·Samsung·Kioxia·Solidigm이 기여한 OCP L.O.C.K. 사양은 '클라우드 사업자가 SSD 같은 저장장치를 파기할 필요를 없애는 것'을 목표로 명시하고, 스스로를 'Google과 Microsoft 스토리지 제품의 확정 채택(committed intercept)'이라고 적고 있다." (ST-26, ST-27)

> **2. ✅ (현재 관행은 파쇄)** "같은 사양은 현재 클라우드 사업자의 기본 정책이 드라이브 파기이며 드라이브 자체 암호 삭제는 신뢰받지 못한다고 쓰고 있고, Microsoft는 2025년에도 퇴역 HDD의 데이터 부품을 파쇄한다고 밝혔다(2022년 한 해 200만 개)." (ST-40, ST-42, ST-43)

> **3. ✅ (PQC는 펌웨어 서명부터)** "Caliptra 2.0 사양은 CNSA 2.0이 2025년까지 LMS 사용을 요구한다고 인용하고, 펌웨어 검증에 ECDSA와 함께 LMS 또는 ML-DSA-87 서명을 쓰는 옵션과 ECC+ML-DSA-87 이중 서명 인증서를 정의했으며, SSD를 적용 대상 장치로 명시한다." (ST-04, ST-20)

> **4. ✅ (하이퍼스케일러 일정)** "Microsoft는 2029년부터 양자내성 기능을 조기 도입하고 2033년까지 제품·서비스 전환을 완료하겠다고 밝혔으며, 그 범위에 공급망을 포함했다." (ST-06)

> **5. ✅ (감사 참여 현황)** "OCP S.A.F.E. 공개 저장소(2026-10-01)에는 Kioxia·Micron·SK hynix·FADU의 SSD·컨트롤러 펌웨어 감사 보고서가 있지만 Samsung과 Solidigm의 보고서는 없다." (ST-33, ST-34; 비공개 심사 여부는 알 수 없다는 단서 병기)

> **6. 🟡 (벤더 움직임)** "Samsung은 2026년 7월 양산한 PM1763에 PQC와 TDISP 지원을, Western Digital은 2026년 5월 HDD에 PQC 대응 보안 부팅·펌웨어 보호를 발표했고, ScaleFlux는 Caliptra 2.0을 내장한 Gen6 컨트롤러를 2026년 4분기 샘플링한다." (ST-10, ST-11, ST-12)

> **7. ✅/🟡 (표준 훅)** "NVMe Sanitize에는 IEEE 2883 기준 purge를 요구하는 비트와 삭제 후 매체 검증 상태가 이미 정의돼 있고, NIST SP 800-88 Rev.2(2025-09)는 기술별 삭제 기법을 IEEE 2883에 위임했다." (ST-49, ST-47)

> **8. ✅/🟡 (디커플링 신호)** "SPDM 참조 구현은 NIST 알고리즘과 중국 SM 알고리즘을 함께 지원하되 섞지 말라고 명시하며, 중국은 2025년 NIST와 별도의 양자내성 암호 표준화(NGCC)를 시작했다. 중국은 2023년 Micron 제품을 사이버보안 심사로 핵심정보인프라 구매에서 배제한 전례가 있다." (ST-62, ST-61, ST-60)

> **❌ 쓰지 말 것**
> - "하이퍼스케일러가 이미 SSD를 재사용한다" → SSD 재사용 수치 없음, Microsoft는 파쇄(NG-05, ST-70)
> - "OCP NVMe SSD 사양이 Caliptra·L.O.C.K.·PQC를 의무화했다" → 사양 원문 미확인(NG-04)
> - "Samsung은 S.A.F.E. 감사를 받지 않았다" → 공개 보고서가 없을 뿐, 비공개 여부 불명(ST-34)
> - "PM1763이 SPDM 1.4·CNSA 2.0을 지원한다"를 ✅로 → 단일 2차 요약(ST-10 ⚠️)
> - "CNSA 2.0이 모든 상용 SSD에 적용된다" → 미국 NSS 대상(ST-74)
> - "Caliptra 탑재 SSD가 출하 중" → 승인 제품 0, 샘플링 단계(ST-72)
> - "Microsoft 2024년 재사용률 92%"만 단독 인용 → 같은 해 90.9% 수치 공존(ST-44 ⚠️)

---

## 부록 A. 직접 열람한 1차 원문 (✅ 근거)

| 원문 | 경로 | 확인 내용 |
|---|---|---|
| Caliptra 2.0 사양 | `git clone https://github.com/chipsalliance/Caliptra` (HEAD `55f1660`, 2026-10-01) → `doc/caliptra_20/Caliptra.ocp` | SSD 범위, 기여사, committed intercept, 면적·부팅 시간, CNSA 2.0 인용, LMS 파라미터·트리 수·HSM 권고, ML-DSA-87, ML-KEM(2.1), 이중 서명 인증서 |
| Caliptra 로드맵·README | `doc/caliptra_20/Roadmap.md`, `README.md` | 2.0/2.1 릴리스 일정, FIPS TBD, OCP LOCK 구현 항목 |
| OCP L.O.C.K. 사양 | `doc/ocp_lock/lock_spec.ocp`, `doc/ocp_lock/releases/` | 기여사·저자·감사의 글, 버전 이력, Scale·Sustainability, 배경(파기 정책), 위협 모델, KMB 구조, HPKE(ML-KEM-1024), 비목표, S.A.F.E. 심사 기대, TCG Epoch Key Purge 인용 |
| Caliptra 상표 레지스트리 | `doc/trademark/ApprovedProductsRegistry.md` | 승인 제품 0, 트랙 3종 |
| OCP S.A.F.E. | `git clone https://github.com/opencomputeproject/OCP-Security-SAFE` (HEAD `ce04fca`, 2026-10-01, 전체 이력) → `Documentation/{framework,review_scope,storage_sanitization,security_review_providers}.md`, `Reports/**/*.json` | 프레임워크 목적·개정·게시 선택권, SRP 10곳, 스토리지 삭제 요건·구현 오류, 스토리지 SFR 전수, Samsung·Solidigm 부재 |
| DMTF libspdm | https://raw.githubusercontent.com/DMTF/libspdm/main/README.md ; 태그 목록 | SPDM 1.4.1·스토리지 바인딩 DSP0286, PQC(ML-DSA/SLH-DSA/ML-KEM), SM 알고리즘과 혼용 금지 |
| nvme-cli / libnvme (`f938b92`, 2026-10-02) | https://github.com/linux-nvme/nvme-cli | Sanitize 동작·EMVS·PREQ(IEEE 2883)·SANICAP(SPRRS·VERS·NVERS)·Sanitize Namespace(0x8C), OCP C7h TCG 로그·Security Version Number |
| Linux 커널 master (7.3-rc5) | https://raw.githubusercontent.com/torvalds/linux/master/drivers/pci/Kconfig 등 | PCI_TSM(TDISP)·PCI_IDE 존재, lib/spdm 부재 |
| Microsoft 보안 블로그 (2025-08-20) | https://www.microsoft.com/en-us/security/blog/2025/08/20/quantum-safe-security-progress-towards-next-generation-cryptography/ | QSP 2029/2033, CNSA 2.0·CNSSP-15, 공급망 포함, Adams Bridge → Caliptra 2.0 |
| Microsoft Cloud 블로그 (2025-04-17) | https://www.microsoft.com/en-us/microsoft-cloud/blog/2025/04/17/sustainable-by-design-innovating-for-zero-waste/ | 90.9%, 320만 부품 재사용, HDD 데이터 부품 파쇄, 희토류 회수 |
| Microsoft Garage | https://www.microsoft.com/en-us/garage/wall-of-fame/saving-the-planet-one-hard-drive-at-a-time/ | 모든 HDD 파쇄, 2022년 200만 개, #NoShred 목표 |
| Microsoft 2026 환경 보고서 페이지 | https://www.microsoft.com/en-us/corporate-responsibility/topics/sustainability/report/ | Circular Center 7곳, 2024년 92% |
| Google Cloud 블로그 (2024-04-24) | https://cloud.google.com/blog/topics/systems/google-security-innovation-at-the-ocp-regional-summit/ | Caliptra 1.0, 2026년 시장 등장, 커뮤니티(ScaleFlux·Marvell), 2.0 PQC, S.A.F.E.(SSD), L.O.C.K. 설립사 |

## 부록 B. 기존 레포 원장과의 접점

| 기존 | 본 원장의 보완 |
|---|---|
| qlc-v6-purchase B10: "OCP v2.6 ... S.A.F.E. 펌웨어 감사 강조"(🟡) | S.A.F.E. 프레임워크·삭제 요건 원문과 **스토리지 SFR 전수**를 ✅로 확보(ST-31~35), Samsung·Solidigm 부재 확인(ST-34) |
| qlc-v6-purchase B08: "v2.5 보안 강화" | OCP 플러그인 코드로 C7h TCG 로그·Security Version Number 필드 확인(ST-36). 사양 조항 원문은 여전히 미확인(NG-04) |
| qlc-v7 D-16 / samsung-ssd-design-wins: PM9E1 SPDM v1.2 | PM1763 PQC·TDISP(🟡)·SPDM 1.4(⚠️) 추가(ST-10), Linux PCI_TSM(TDISP) 메인라인 존재(ST-38) |
| ssd-mixed-media IR-01~IR-09(서버 5~6년) | 6년 수명과 PQC·Ecodesign 일정 겹침 산술(ST-80·81) |
| hybrid-bonding-structures-china-limits(Sec.5949 등 미 조달 금지) | 중국 측 대칭 사례(CAC Micron 2023, NGCC, SM 의무)와 SPDM 암호 이원화(ST-60~63) |
| ssd-mixed-media §0-2 "ST-01~14"(표준 훅) | **본 원장 ST-xx와 번호 체계 다름**(§0-2) |
