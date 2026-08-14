# 로직의 패러다임 전환사 + 차세대 DRAM 3사 현황 — 웹 리서치 종합 (2026-08-12)

**수집일**: 2026-08-12
**유형**: 웹 검색 기반 2·3차 자료 종합 (로직 아키텍처 전환 연대기 + 4F²/COP/VCT·3D DRAM·zHBM 공개 현황)
**용도**: 「판을 옮긴다」 보고서 2장(논증의 축: 로직의 네 번의 판 갈이)·5장(경쟁 구도: 차세대 DRAM 3사 + 중국) 근거
**신뢰도 표기 규칙**: `[공개발표]` 학회 논문·기업 공식 발표·보도자료 / `[보도]` 언론·애널리스트 보도 / `[포럼]` SemiWiki 등 업계 포럼 논평(비공식) / `[추정]` 기관 전망 / `[미확인]` 공개 자료 없음
**주의**: 본 노트는 사실 수집물이다. "메모리가 로직의 경로를 따라야 한다"는 논증은 위키·보고서 측 해석이며 여기서는 판단하지 않는다.

---

## §1. Dennard scaling의 종료 — 시점·원인·무어의 법칙과의 구분

### 1.1 정의와 원본

- **Dennard scaling(1974)**: Robert Dennard 외, "Design of Ion-Implanted MOSFET's with Very Small Physical Dimensions", IEEE JSSC, 1974. 트랜지스터 치수를 1/k로 줄이면 전압·전류도 함께 줄어 **단위 면적당 전력밀도가 일정하게 유지**된다는 법칙. → 세대마다 더 많은 트랜지스터를 **더 빠른 클럭으로** 돌려도 전력이 그대로. `[공개발표]`
- **무어의 법칙과의 구분**: 무어의 법칙은 **집적도(트랜지스터 수)**, Dennard scaling은 **전력밀도(따라서 주파수)**. 둘은 별개이며, **주파수 스케일링(Dennard)은 ~2005년에 끝났지만 트랜지스터 수 증가(Moore)는 계속되었다**. 이 구분이 로직 패러다임 전환 전체의 출발점. `[공개발표/교과서적]`

### 1.2 종료 시점

- **2005~2007년 사이 붕괴**. 게이트 길이 90nm 도달 무렵(~2005) 종료로 널리 서술됨. `[보도/교과서적]` (HandWiki, ScienceInsights, UC Irvine CS250B 강의자료)

### 1.3 물리적 원인 (세 겹)

1. **누설전류(leakage)가 스케일링하지 않음** — 문턱전압(threshold voltage)과 누설전류는 치수와 함께 줄지 않는다. 따라서 전압을 계속 낮출 수 없고, 전력밀도가 증가한다. `[교과서적]`
2. **게이트 절연막의 물리적 한계** — Intel 65nm(2005) 세대에서 게이트 절연막 두께가 **약 1.2nm(실리콘 원자 약 5개 두께)**까지 얇아졌고, 이 두께에서는 전자가 직접 터널링한다. `[보도]` (viksnewsletter)
3. **결과 = Power Wall** — 2005~2007년 사이 반도체 업체들은 "전력·열 한계를 넘지 않고는 클럭을 더 못 올리는" 벽에 부딪혔다. `[보도]`

### 1.4 종료 직후 연대기 요약

| 연도 | 사건 | 성격 |
|---|---|---|
| 2003 초 | Intel, Tejas 공개 — 목표 클럭 **7GHz 이상** | 주파수 경쟁의 정점 |
| 2004-02 | Intel, "연내 4GHz 도달" 공언 → 7월에 2005-03으로 연기 | 벽에 부딪히는 신호 |
| 2004-05-07 | **Intel, Tejas·Jayhawk 개발 취소**. 90nm Tejas 초기 샘플이 **2.8GHz에서 TDP 150W** | 주파수 축의 공식 사망 |
| 2005 | Intel·AMD 듀얼코어 양산 (Pentium D / Athlon 64 X2) | 축 이동 1차 완료 |

`[보도]` EE Times / EDN / The Register / Wikipedia(Tejas and Jayhawk) / TechSpot

---

## §2. 로직 패러다임 전환 4단계 — 사실관계와 연도

### 단계 ① 멀티코어 (2004~2005) — "하나를 빠르게" → "여럿을 동시에"

- 2004-05-07 Intel의 Tejas/Jayhawk 취소가 전환점. 모바일·데스크톱·서버 전 라인을 2005년 듀얼코어로 선회. `[보도]`
- 취소 사유: 열밀도·전력 공급이 관리 불가 수준. 90nm Tejas 샘플 **2.8GHz / 150W**. `[보도]`
- **레슨**: 소자 하나의 속도(주파수)라는 축이 막히자, **동일 소자를 병렬로 배치하는 아키텍처 축**으로 성능을 이어받았다.

### 단계 ② 소자 구조 혁신 — 평면 → FinFET → GAA (2011~2025)

| 구조 | 업체 | 노드 | 시점 | 근거 |
|---|---|---|---|---|
| FinFET 최초 상용화 | Intel | 22nm | 2011 발표 / 2012 Ivy Bridge 출하 | `[공개발표]` |
| FinFET 파운드리 확산 | TSMC | 16FF | 2015 | `[보도]` |
| FinFET | Samsung | 14nm | 2015 | `[보도]` |
| FinFET 지속 구간 | TSMC | 16nm → N3/N3E | 2015~2024 | `[보도]` |
| **GAA(나노시트) 최초 양산** | **Samsung** | **3nm (3GAE/SF3E)** | **2022-06-30** | `[공개발표]` 삼성 공식 보도자료 |
| GAA(RibbonFET) + PowerVia | Intel | 20A → **18A** | 20A는 **2024-09 취소**(18A로 통합), 18A 2025 램프 | `[보도]` Tom's Hardware·TechPowerUp |
| GAA(나노시트) | TSMC | N2 | 2025 램프 | `[보도]` |

- **레슨**: 평면 소자의 단채널 효과(SCE)를 **소자 구조를 3차원화**해 우회. 축은 여전히 "트랜지스터 하나를 좋게"이지만, 물리적 형상을 바꿔 스케일링 수명을 연장했다.
- **DRAM 대응 관계(주의)**: 이 단계의 DRAM판 대응물이 §4의 **VCT(수직 채널 트랜지스터)** — 채널을 세워 채널 길이를 면적 증가 없이 확보하는 발상은 FinFET/GAA와 동일 계열.

### 단계 ③ 칩렛·2.5D/3D 통합 (2019~) — 모놀리식 다이의 종말

**한계 조건 (레티클)**
- 리소그래피 1회 노광 최대 면적 = **26 × 33 mm ≈ 858 mm²**(통상 "약 800mm² 레티클 한계"로 인용). 이를 넘는 실리콘은 한 다이로 못 만든다. `[교과서적]`
- 큰 다이일수록 300mm 웨이퍼 가장자리 낭비가 커지고, 결함 1개가 다이 전체를 죽여 수율이 급락.

**대표 사례와 수치**

| 사례 | 시점 | 구조 | 수치·효과 |
|---|---|---|---|
| **AMD Zen 2 / EPYC "Rome"** | 2019-08-07 | 7nm CCD 8개 + 12nm I/O 다이, Infinity Fabric | **동일 코어 수 기준 TSMC 7nm 모놀리식 16코어 다이 제조원가가 멀티다이의 2배 이상** = 칩렛이 **원가 절반 이하**. AMD의 ISSCC 발표 인용 `[보도]` (Notebookcheck·PCGamesN) |
| **Apple M1 Ultra** | 2022-03 | M1 Max 2개를 UltraFusion(실리콘 인터포저)으로 접합 | TSMC **CoWoS-S 기반**으로 분석됨 `[보도]` (Tom's Hardware·TechInsights) — 레티클 한계를 패키지로 우회한 상징적 사례 |
| **Intel Meteor Lake** | 2023-12-14 출시 | Foveros 3D, **4개 타일**(Compute/Graphics/SoC/IO)을 베이스 다이 위에 적층 | 클라이언트 CPU의 본격 디스어그리게이션 `[공개발표]` (Hot Chips 34 발표자료) |
| **TSMC CoWoS** | 2011 개발 / 2012 도입 | 실리콘 인터포저 2.5D | 인터포저 면적 **1× 레티클(~830mm²) → 2× 레티클(~1700mm²)**로 확대, **2027년 9× 레티클** 목표 `[보도]` (WikiChip·3DInCites) |

- **레슨**: "블록별로 최적 공정을 따로 쓰고 나중에 붙인다." 전 블록을 최선단 노드로 만들 필요가 없어져 **원가·수율·개발 유연성**이 동시에 개선됐다. → 보고서 논증에서 §4의 COP(Cell-on-Periphery, 셀 웨이퍼와 페리 웨이퍼 분리)와 정확히 같은 발상.

### 단계 ④ 도메인 특화 아키텍처(DSA)와 AI 가속기 (2015~)

- **Google TPU v1**: **2015년부터 데이터센터에 배치**. ISCA 2017 논문 "In-Datacenter Performance Analysis of a Tensor Processing Unit"(arXiv:1704.04760) — 동시대 GPU/CPU 대비 **평균 15~30배 빠르고, TOPS/W는 30~80배 높음**. 65,536개 8-bit MAC, 피크 **92 TOPS**, 온칩 SW 관리 메모리 28MiB. `[공개발표]` (ISCA 사상 최다 피인용 논문 중 하나)
- **Hennessy & Patterson 튜링상 강연**: **2018-06-04, ISCA 45차(로스앤젤레스)**. 제목 "A New Golden Age for Computer Architecture: Domain-Specific Hardware/Software Co-Design, Enhanced Security, Open Instruction Sets, and Agile Chip Development". CACM 2019 게재. 핵심 명제 = **범용 성능 스케일링이 끝났으므로 다음 이득은 도메인 특화 하드웨어와 하드웨어/소프트웨어 공동설계에서 나온다**. `[공개발표]`
- **레슨**: 성능의 원천이 "소자"에서 **"문제에 맞춘 아키텍처"**로 완전히 이동. 이 강연은 동시에 **"Agile Chip Development"(개발 속도 자체를 경쟁력으로)**를 4대 축의 하나로 명시했다 — 보고서의 "개발 TAT = 경쟁력" 주장과 직결되는 공개 근거.

### 2단계 요약표 — 축이 옮겨간 순서

| 판 | 시점 | 막힌 축 | 새로 연 축 |
|---|---|---|---|
| ① 멀티코어 | 2004~05 | 클럭 주파수 | 병렬성(코어 수) |
| ② FinFET·GAA | 2011 / 2022~25 | 평면 소자 미세화 | 소자의 3차원 구조 |
| ③ 칩렛·2.5D/3D | 2019~ | 모놀리식 다이(레티클·수율) | 블록별 최적 공정 + 패키지 통합 |
| ④ DSA·AI 가속기 | 2015~ | 범용 아키텍처의 효율 | 도메인 특화 + HW/SW 공동설계 + 개발 민첩성 |

---

## §3. Memory wall의 정량

### 3.1 원 출처 (용어의 기원)

- **Wulf & McKee, "Hitting the Memory Wall: Implications of the Obvious", ACM SIGARCH Computer Architecture News, Vol.23 No.1, pp.20–24, 1995.** "memory wall"이라는 용어의 출처. 논문은 **CPU 성능 연 50% 향상**(보수적 가정) 대비 DRAM 속도 향상이 훨씬 느려, 결국 프로세서 성능 향상이 메모리 속도에 가려진다고 논증. `[공개발표]`

### 3.2 AI 시대의 정량 — 가장 널리 인용되는 수치

**출처: Amir Gholami 외, "AI and Memory Wall", IEEE Micro (2024), arXiv:2403.14123 (원 블로그 2021, Hot Chips 2023 발표)** `[공개발표]`

| 항목 | 2년당 증가율 | 20년 누적 |
|---|---|---|
| 피크 서버 하드웨어 FLOPS | **3.0×** | **60,000×** |
| **DRAM 대역폭** | **1.6×** | **100×** |
| **인터커넥트 대역폭** | **1.4×** | **30×** |

- 추가: **플래그십 LLM 모델 크기 410×/2년 vs 가속기 탑재 DRAM 용량 2×/2년**.
- 저자 결론: "메모리 — 특히 칩 내/칩 간 데이터 전송 — 이 AI 학습, 특히 서빙의 주된 제약이 되었다."
- **보고서용 축약**: 연산은 2년마다 3배, 메모리 대역폭은 1.6배 → **격차가 2년마다 약 1.9배씩 벌어진다**(3.0/1.6). 20년 누적으로 60,000× vs 100× = **600배 격차**.

### 3.3 보조 정량 — DRAM 자체의 스케일링 둔화

**출처: SemiAnalysis, "The Memory Wall: Past, Present, and Future of DRAM"** `[보도/애널리스트]`

- DRAM 비트 밀도는 전성기에 **18개월마다 2배**(10년에 ~100배)였으나, **최근 10년간 밀도 증가는 단 2배**.
- **DRAM은 2007년부터 6F² 셀 레이아웃을 유지** — EUV를 도입하고도 10nm급에서 밀도가 정체.
- 원가: 16Gb 칩이 8년 전 ~$3/GB로 도입 → 최고 ~$5/GB → 현재 ~$3/GB 대. "예전엔 5년 걸리던 한 자릿수 개선이 이제 10년."
- 시스템 원가 구성: **H100 제조원가의 50%+ 가 HBM, Blackwell은 60%+**.
- **함의**: 메모리 wall은 "대역폭이 못 따라간다"만이 아니라 **"DRAM 자신의 미세화 축도 이미 정체"**라는 이중 정체 구조.

### 3.4 GPU 세대별 실측 참고치 `[보도]`

| 세대 | 메모리 | 대역폭 |
|---|---|---|
| H100 | 80GB HBM3 | 3.35~3.4 TB/s |
| H200 | 141GB HBM3E | 4.8 TB/s |
| B200 | 192GB HBM3E | 8.0 TB/s |

- FP16 기준 세대당 FLOPS +153%인 반면 대역폭 증가폭은 그보다 작다는 분석(SemiAnalysis Blackwell TCO 분석). **바이트/FLOP 비율은 세대마다 하락 중.**

---

## §4. 4F² / COP / VCT 기반 차세대 DRAM — 3사 + 학계 현황

### 4.1 Samsung — ISSCC 2026 Paper 15.10 (핵심 자료)

**서지**: ISSCC 2026 (2026-02-15~19, 샌프란시스코), **Paper 15.10**, "A Vertical-Cell-Transistor-Based 4F² DRAM with Cell-on-Peripheral Architecture Using Wafer-to-Wafer Hybrid Copper Bonding", H. Yoon 외. `[공개발표]`

**구조**
- **셀 어레이 웨이퍼와 코어/페리 회로 웨이퍼를 별도로 제조 → W2W 하이브리드 구리 본딩(HCB)으로 접합**. 셀이 위, 페리가 아래(COP = Cell-on-Peripheral, 또는 PUC = Periphery-under-Cell).
- 셀 트랜지스터는 **VCT(수직 채널 트랜지스터)** — 채널을 수직으로 세워 채널 길이(높이)를 면적 증가 없이 늘려 단채널 효과(SCE)를 회피. 이로써 **6F² → 4F²** 셀 실현.
- 비트라인 센스앰프·워드라인 드라이버를 셀 아래로 내림.

**공개 수치** `[공개발표/보도]`

| 항목 | 값 |
|---|---|
| 시제품 용량 | **16Gb 테스트칩** |
| 공정 | **10nm급 DRAM 공정** (셀 웨이퍼) + 로직 노드 페리 웨이퍼 |
| **코어 회로 면적 비중** | **17.0% → 2.7%** (다이 면적 대비) |
| **웨이퍼당 다이 산출** | **기존 6F² 대비 +20%** |
| 서브워드라인 드라이버 재구성 | 웨이퍼 간 **신호 수 75% 감소** |
| 본딩 접점 수 | **28.8M → 약 10M**개로 축소 |
| 본딩 피치 | **약 300nm** |

**남은 과제(논문에서 명시)**
- **VCT의 부유체 효과(floating-body effect)**로 누설 증가·리텐션 시간 감소 → "4F² 채택의 핵심 과제". `[공개발표]`

**포럼 논평(비공식, 검증 필요)** `[포럼]` SemiWiki
- "D1a 최소 피치 ~27–28nm를 4F²에 적용하면 6F² D0a와 같은 셀 면적(~0.0007–0.0008 µm²)이 나온다" — 즉 **4F²는 셀 면적에서 한 세대(약 2노드)를 벌어주는 효과**.
- 모더레이터 논평: "**4F² 양산 물량은 2029–2030년. 그보다 이르지 않다.**"

### 4.2 SK하이닉스

- **IEEE VLSI 2025 (2025-06, 교토)**에서 **향후 30년 DRAM 로드맵** 발표. 두 기둥 = **4F² Vertical Gate(VG) 플랫폼**과 **3D DRAM**. `[공개발표]` (SK hynix 뉴스룸)
- 4F² VG: 셀 풋프린트 6F²(2F×3F) → 4F²(2F×2F), 평면 게이트 → 채널을 감싸는 수직 게이트. **"4F² 셀 + 회로부를 셀 아래에 두는 웨이퍼 본딩 기술을 적용하면 셀 효율과 전기적 특성을 개선"**이라고 명시 — 즉 **SK하이닉스도 COP형 본딩 구조를 공개 로드맵에 포함**. `[공개발표]`
- SemiWiki 평가: **"SK하이닉스는 VLSI 2025에서 유사 접근을 보였으나 Gb 스케일은 아니었던 것으로 보인다."** `[포럼]`
- 제품 로드맵: DDR6·GDDR7-next·**3D DRAM을 2029~2031 구간**에 배치. `[보도]` (Tom's Hardware·wccftech)
- **HBM5는 이르면 2029년 출시, 하이브리드 본딩을 양산 단계에 본격 적용** 전망. `[보도]` (아시아경제·브릿지경제, 2026-04)

### 4.3 Micron

- **4F²를 건너뛰고 3D DRAM으로 직행한다는 보도** `[보도]` (SemiWiki 기사 인용). 3사 중 유일하게 4F² 단계를 생략하는 노선.
- 3D DRAM 연구는 **2019년부터** 착수했다고 알려짐. 상세 로드맵은 **미공개**. `[보도]`
- 2023년 **32Gb 4F² NVDRAM**을 공개한 바 있음 — 강유전체 커패시터 + 3D 적층, **웨이퍼 본딩 없이** 구현. `[포럼]` (SemiWiki)
- 현재 양산 축: **1γ(1-gamma) EUV DRAM** 출하 중, 1β 대비 웨이퍼당 비트 밀도 **+30% 이상**. 이후 1δ, 그리고 3D DRAM·High-NA EUV 탐색. `[공개발표/보도]`

### 4.4 학계·imec

- **imec, 2T0C IGZO DRAM 셀 최초 실증** — IEDM 2020. **리텐션 >400초**(기존 DRAM 대비 리프레시 대폭 감소), 300mm 웨이퍼, 게이트 길이 **45nm까지 스케일링**. `[공개발표]`
- IGZO TFT를 **BEOL에서 공정 가능** → 셀을 어레이 아래로 내리고(=COP 발상) 셀을 층층이 쌓을 수 있어 **고밀도 3D DRAM 경로**를 연다. `[공개발표]`
- **1T1C / 3T0C / NEO IGZO 기반 PoC 칩이 2026년 말 예정**. `[공개발표/전망]`
- **imec + EV Group, W2W 하이브리드 본딩 200nm 인터커넥트 피치 + 기록적 오버레이 정확도 실증(2026 보도자료)** — 삼성 ISSCC 2026의 300nm 피치보다 앞선 연구 수준. `[공개발표]`

### 4.5 중국 (CXMT) — **해자 논증에 가장 중요한 대목**

- **CXMT는 허페이 파일럿 라인에서 차세대 "bonded DRAM"용 W2W 하이브리드 본딩을 이미 시험 중**. `[보도]` (ZeroHedge 인용 보도 — 원 보도는 한국 매체 계열, "기술 격차 축소가 예상보다 훨씬 빠르다")
- 전략 논리: **EUV 없이 밀도를 올리는 우회로**로 본딩형 DRAM을 선택 — 셀 어레이와 페리를 각각 **DUV로 도달 가능한 노드**에서 따로 찍고 붙인다. `[보도]` (wccftech)
- 중국이 **4F² 단계를 건너뛰고 3D DRAM으로 직행하는 전략**을 검토하며, 이것이 장기적 경쟁 우위가 될 수 있다는 관측. `[추정/보도]`
- **YMTC ↔ CXMT 제휴** — YMTC의 하이브리드 본딩 역량과 CXMT의 DRAM 역량을 결합해 중국산 HBM을 가속. `[보도]` (Tom's Hardware)
- **⚠ 보고서 논증 상 주의**: 위 사실들은 **"하이브리드 본딩 자체는 중국이 못 따라오는 축이 아니다"**를 강하게 뒷받침한다. 위키 `rs6-process-leadership.md`에 기록된 **YMTC의 하이브리드 본딩 특허 지배**(TrendForce 2025-05, Knowmade 분석)와 일관된다. 해자를 본딩에 두면 무너지고, **본딩 + 선단 로직 노드 + 메모리의 결합**에 두어야 한다는 보고서 전제와 정합.

### 4.6 상용화 시점 전망 — 기관별

| 출처 | 4F² | 3D DRAM | 성격 |
|---|---|---|---|
| SemiWiki 기사 (Samsung·SK hynix 4F² 기사) | 프로토타입 2025년 말 완성 목표, **양산 3년 내(~2028)**, 성능 이득 **최대 50%** | — | `[보도]` |
| SemiWiki 모더레이터 논평 | **양산 물량 2029–2030, 그 이전 아님** | — | `[포럼]` |
| TechInsights | 3D·4F²·VCT가 **0c 노드에서 양산 진입** | 평면 DRAM은 **0c/0d(2033–2034)**까지 연장 후 3D 전환 불가피 | `[추정]` |
| Yole / 종합 | — | **현실적 양산 2032–2035** | `[추정]` |
| SK하이닉스 제품 로드맵 | — | 3D DRAM **2029–2031 구간**에 표기 | `[보도]` |
| Micron | 4F² 생략 | 시점 미공개 | `[보도]` |

- **노드 순서 참고**: 1c(현 양산) → 1d(향후 1~2년) → 0a → 0b → 0c → 0d. 6F²는 **1d 노드까지만 스케일링 가능**하다는 것이 TechInsights 견해. `[추정]`
- **전망 폭이 2028~2035로 매우 넓다**는 사실 자체를 기록한다. 어느 한 시점을 단정하는 공개 합의는 없다.

---

## §5. zHBM · 커스텀 HBM 동향

### 5.1 zHBM — 삼성전자 공식 공개 (가장 중요한 신규 사실)

**출처: FMS(Future of Memory and Storage) 2026, 2026-08-04~05, 산타클라라 컨벤션센터. 삼성전자 보도자료 및 다수 매체.** `[공개발표]`

- **업계 최초로 차세대 3D 메모리 아키텍처 `zHBM` 목업 공개**. (동시 공개: zNAND-O, V10 BV-NAND 400단 이상)
- **구조**: 기존 HBM은 AI 가속기(xPU) **옆에** 평면 배치 → zHBM은 **가속기 위에 HBM을 수직(Z축) 적층**. 데이터 이동 거리를 사실상 0에 가깝게 축소.
- **공개 수치 (차세대 규격 HBM5 대비)**:
  - **성능 최대 8배 향상**
  - **전성비(전력 대비 성능) 최대 3배 개선**
  - **열 저항 50% 이상 감소**
- **커스터마이징 구조**: **인터레이어(중간층)에 커스텀 IP를 통합**해 **"메모리 용량과 가속기 성능을 고객 맞춤형으로 최적화"**한다고 명시. → 보고서 제안 2(고객 맞춤형 개발 확산)의 **공개 근거**.
- **상태**: **목업 단계**, 양산 시점 미공개. `[공개발표]`
- 발표자: 플래시개발실 이진엽 부사장, D램개발실 김경륜 상무 (8/4 오프닝). `[보도]`
- **경쟁 대비**: 같은 행사에서 **SK하이닉스는 `G0.5` 및 "계층형 메모리"(HBM + NAND를 유기적으로 연결)** 제시 — 수직 적층이 아니라 **메모리 계층 구조**로 접근. 같은 문제(대역폭·용량·비용)에 대한 **다른 해법**. `[보도]` (더퍼블릭·한국일보)

### 5.2 커스텀 HBM — 확산 신호

| 사실 | 출처·시점 | 표기 |
|---|---|---|
| **커스텀 HBM 시장 2029년 380억 달러(약 55조 원)** 전망 — 삼성전자 김인동 상무 발언 | 서울경제 보도 | `[보도/기업 발언]` |
| **"HBM4 표준품이 2026년 말까지 주류, 2027년부터 커스텀 HBM 본격화"** — SK하이닉스 강선국 부사장 | 서울경제 보도 | `[보도/기업 발언]` |
| HBM4E부터 커스텀 HBM 본격 생산 | 업계 공통 전망 | `[보도]` |
| **삼성 커스텀 HBM4E 설계 2026년 5~6월 완료 목표**, SK하이닉스·Micron도 유사 일정 | TrendForce 2026-01-23 | `[보도]` |
| HBM4E 로직 다이는 **고객 사양에 맞춰 설계** → 3nm·12nm 등 **복수 공정 노드**를 동시 검토 | TrendForce | `[보도]` |
| **TSMC/GUC의 C-HBM4E**: 베이스 다이가 N3P로 이동 + **메모리 컨트롤러를 스택 안으로 통합**, PHY도 완전 커스텀. **2027년까지 최대 12.8 GT/s, 2.5배 성능** | TechPowerUp·Tom's Hardware | `[보도]` |
| 베이스 다이 공정 분화: **SK하이닉스 TSMC N3급 / 삼성 자체 4nm급 / Micron·SK N12** | digitimes·SemiAnalysis | `[보도]` |
| 삼성, **표준용·커스텀용 HBM 팀을 HBM4부터 이원화**, 커스텀 프로젝트에 **엔지니어 250명 추가 투입**(Google·Meta·NVIDIA 대상) | digitimes 인용 보도 | `[보도]` |

- **연간 몇 종을 커스터마이즈해야 하는가**에 대한 공개 수치는 **없음**. §7 참조.

### 5.3 삼성의 메모리-파운드리 결합 (개발 TAT 논증의 공개 근거)

- **삼성전자는 메모리·파운드리·시스템LSI·첨단 패키징을 모두 보유한 "원스톱 턴키 솔루션"을 제공하는 유일한 기업**이며, **메모리 3사 중 파운드리를 갖춘 곳은 삼성뿐**. `[보도]` (아시아타임즈·이투데이·머니투데이 다수)
- 실증: **HBM4 베이스 다이를 자체 파운드리 4nm(SF4) 공정으로 생산** — SK하이닉스·Micron이 외부 파운드리(TSMC N3/N12)에 의존하는 것과 대비. `[공개발표/보도]`
- ISSCC 2026 Samsung HBM4(Paper 15.6)가 그 결과물: **36GB 12-high, 2048 IO, 3.3 TB/s, 핀당 최대 13 Gb/s(JEDEC 6.4 Gb/s의 2배 이상), VDDQ 1.1V→0.75V(−32%)**, 구성은 **1c DRAM 코어 + SF4 로직 베이스 다이**. `[공개발표]` (본 레포 `semianalysis-isscc-2026-2026-04-15.md`와 동일 내용 — 교차 확인됨)
- **주의**: "파운드리를 함께 가진 것이 개발 TAT를 단축한다"는 **인과 주장 자체를 정량 입증한 공개 자료는 확인되지 않음**. 공개된 것은 (a) 구조적 보유 사실, (b) 결과물 성능 우위, 두 가지뿐.

---

## §6. DRAM 개발 TAT의 공개 벤치마크 — 대부분 미확인

### 6.1 확인된 것 (간접 프록시)

| 지표 | 값 | 출처·성격 |
|---|---|---|
| DRAM 신규 기술 노드 주기 | **3년마다 1노드** | ITRS 로드맵 `[공개발표, 다만 오래된 기준]` |
| 팹 사이클타임 표준 지표 | **DPML(Days Per Mask Layer)** — Sematech·ITRS·IC Knowledge·FabTimes 공통 사용 | `[교과서적]` |
| DPML 통상 범위 | **레이어당 1~1.5일**(문헌상 1~2일), **양호한 수준 = 1.5~2일** | `[보도]` (Critical Manufacturing·SemiWiki) |
| 노드별 총 사이클타임(로직) | **28nm ≈ 40일 → 5nm ≈ 100일**. 마스크 레이어 수는 28nm 40~50층 → 5nm 100층 | `[보도]` (SemiEngineering) |
| 웨이퍼 체류 시간 구성 | 대기(큐) 시간이 실제 가공 시간보다 지배적. x-factor(실제/이론) 1에 가까울수록 우수 | `[교과서적]` |
| 팹 제조 턴 시간(구세대 기준) | 표준 6~8주, 긴급 시 2~3주 | `[보도, 오래된 기준]` |
| 신규 노드 초기 수율 | 낮게 시작해 yield learning과 노드 마이그레이션 확대로 웨이퍼당 비트 산출이 유의미하게 증가 | `[보도]` |

### 6.2 확인되지 않은 것

- **DRAM 신규 노드의 "개발 TAT" 일수** (예: D1d 90일 / D0a 60일) — **공개 자료 미확인**. 업계에서 이런 형태의 벤치마크가 공표된 사례를 찾지 못함.
- **웨이퍼 1턴(1 turn) 소요 일수의 DRAM 특정 공개치** — **미확인**. 로직 기준 DPML 프록시만 존재.
- **개발 단계별(설계→마스크→투입→평가→피드백) 소요 분해** — **미확인**.
- **"본딩 후 공정 최소화로 공정 검토 turn 횟수 30% 개선"류의 정량** — **공개 자료 미확인**. 삼성 ISSCC 2026 논문은 면적·본딩 접점 수·신호 수 감소는 제시했으나 **개발 turn 횟수·기간은 언급하지 않음**.
- **결론**: 보고서의 개발 TAT 수치(90일/60일/turn 30%)는 **공개 벤치마크로 뒷받침할 수 없다**. 사내 확인 수치로 각주 분리하고 성격을 명기하는 기존 방침이 타당함을 재확인.

---

## §7. 조사 실패 / 공개 자료 미확인 목록

1. **"연간 zHBM 10종 MTO"급 커스터마이즈 종수** — 커스텀 HBM 확산 자체는 다수 확인(§5.2)되나, **연간 제품 종수의 공개 수치는 없음**. 확인된 최근접 정량은 "2029년 380억 달러 시장", "2027년부터 본격화", "삼성 커스텀 전담 엔지니어 250명 추가" 세 가지.
2. **DRAM 개발 TAT 공개 벤치마크** — §6.2 참조. 없음.
3. **Samsung ISSCC 2026 Paper 15.10의 데이터레이트·소비전력·다이 사이즈** — 무료 공개 요약에는 없음(SemiAnalysis 기사도 면적·본딩 수치만 제시). 원문 논문 확보 필요.
4. **TechInsights 4F² 블로그 본문** — 유료 구독 구간. 공개 요약만 인용함.
5. **"VS-DRAM"** — 공개 근거 확인 실패. 보고서 방침대로 **일반명(수직 적층 DRAM 계열)** 사용하고, 공개 근거가 있는 **VCT(수직 채널 트랜지스터)**만 고유 용어로 쓸 것.
6. **Micron 3D DRAM 공식 로드맵** — 회사 공식 발표 없음. 보도·특허(예: US 12,207,458 hierarchical bitline for 3D DRAM)만 존재.
7. **"파운드리 보유가 메모리 개발 TAT를 단축한다"의 정량 입증** — 공개 자료 미확인(§5.3 주의 참조).

---

## §8. 보고서 2·5장에 바로 쓸 수 있는 사실 묶음 (요약)

**2장(논증의 축)**
- Dennard scaling 종료 시점 2005~2007, 원인은 누설전류·게이트 절연막 1.2nm 한계. 무어의 법칙과 별개 — **집적도는 계속, 주파수는 멈춤**.
- 판 갈이 4회: 2004 멀티코어(Tejas 취소 2.8GHz/150W) → 2011/2022 FinFET·GAA(Samsung 3nm GAA 2022-06-30 최초) → 2019 칩렛(AMD 16코어 모놀리식 원가 2배 이상, 레티클 858mm² 한계) → 2015/2018 DSA(TPU 30~80× TOPS/W, Hennessy·Patterson 튜링 강연이 **"Agile Chip Development"를 4대 축에 포함**).
- Memory wall: FLOPS 3.0×/2년 vs DRAM BW 1.6×/2년, 20년 누적 60,000× vs 100×.
- DRAM 자신의 정체: **2007년 이래 6F² 유지**, 최근 10년 밀도 증가 **단 2배**(전성기 18개월 2배).

**5장(경쟁 구도)**
- Samsung: ISSCC 2026 Paper 15.10 — **16Gb 4F² VCT COP DRAM, W2W HCB, 코어 면적 17.0%→2.7%, 다이 산출 +20%, 본딩 접점 28.8M→10M, 피치 ~300nm**. 과제 = 부유체 효과.
- SK하이닉스: VLSI 2025 30년 로드맵 — 4F² VG + 3D DRAM + 셀 하부 회로 본딩. Gb 스케일 실증은 아직 미확인. HBM5 2029 + 하이브리드 본딩.
- Micron: **4F² 생략, 3D DRAM 직행 노선**(보도). 로드맵 미공개.
- imec: IGZO 2T0C >400s 리텐션(IEDM 2020), PoC 2026년 말, **W2W 본딩 200nm 피치 실증(2026)**.
- **CXMT: 허페이 파일럿에서 W2W 하이브리드 본딩 bonded DRAM 시험 중, EUV 우회 전략. YMTC와 제휴.** → **본딩은 해자가 아니다**를 뒷받침.
- 양산 시점 전망 폭: 4F² 2028~2030, 3D DRAM 2032~2035 (기관별 편차 큼).
- zHBM: **삼성 FMS 2026(8/4) 공개, HBM5 대비 성능 8배·전성비 3배·열저항 50%↓, 인터레이어 커스텀 IP로 고객 맞춤 최적화, 목업 단계**.
- 커스텀 HBM: **2027년 본격화, 2029년 380억 달러**, 베이스 다이 공정이 고객별로 분화(N3P·SF4·N12).
- 삼성 고유 구조: **메모리 3사 중 유일한 파운드리 보유**, HBM4 베이스 다이를 자체 SF4로 생산.

---

## 원본 링크

**Dennard scaling / 멀티코어**
- HandWiki — Dennard scaling: https://handwiki.org/wiki/Dennard_scaling
- Rambus — Understanding Dennard scaling: https://www.rambus.com/blogs/understanding-dennard-scaling-2/
- ScienceInsights — What Is Dennard Scaling and Why Did It End: https://scienceinsights.org/what-is-dennard-scaling-and-why-did-it-end/
- UC Irvine CS250B — The End of Conventional Performance Scaling: https://ics.uci.edu/~swjun/courses/2022S-CS250B/material/lec1%20-%20End%20of%20Scaling.pdf
- Vik's Newsletter — How Dennard Scaling Actually Works: https://www.viksnewsletter.com/p/how-dennard-scaling-actually-works
- EE Times — Intel cancels Tejas, moves to dual-core designs: https://www.eetimes.com/intel-cancels-tejas-moves-to-dual-core-designs/
- The Register (2004-05-07) — Intel cancels Tejas: https://www.theregister.com/2004/05/07/intel_cancels_tejas/
- Wikipedia — Tejas and Jayhawk: https://en.wikipedia.org/wiki/Tejas_and_Jayhawk

**FinFET / GAA**
- Samsung Newsroom — Samsung Begins Chip Production Using 3nm Process Technology With GAA (2022-06-30): https://news.samsung.com/global/samsung-begins-chip-production-using-3nm-process-technology-with-gaa-architecture
- SemiWiki — FinFET Wiki: https://semiwiki.com/wikis/industry-wikis/finfet-wiki/
- Tom's Hardware — Intel announces cancellation of 20A process node: https://www.tomshardware.com/pc-components/cpus/intel-announces-cancellation-of-20a-process-node-for-arrow-lake-goes-with-external-nodes-instead-likely-tsmc
- SemiconductorX — Leading-Edge Logic Fabs: TSMC N3/N2, Samsung SF3/SF2, Intel 18A: https://semiconductorx.com/fabs-leading-edge.php
- SemiEngineering — Transistors Reach Tipping Point At 3nm: https://semiengineering.com/transistors-reach-tipping-point-at-3nm/

**칩렛 / 2.5D·3D**
- Notebookcheck — AMD says chiplet design can cut costs by more than half: https://www.notebookcheck.net/AMD-says-chiplet-design-can-cut-costs-by-more-than-half.454676.0.html
- PCGamesN — Intel can't match AMD in price/performance without chiplets: https://www.pcgamesn.com/amd/intel-price-performance-chiplet-architecture-zen-2
- The Next Platform — A Deep Dive Into AMD's Rome Epyc Architecture: https://www.nextplatform.com/2019/08/15/a-deep-dive-into-amds-rome-epyc-architecture/
- Tom's Hardware — The Tech Behind Apple's M1 UltraFusion Chip Interconnect: https://www.tomshardware.com/news/apple-uses-cowos-s-to-build-m1-ultra
- TechInsights — Apple M1 Ultra Advanced Packaging: https://www.techinsights.com/blog/apple-m1-ultra-advanced-packaging
- Hot Chips 34 — Intel Meteor Lake and Arrow Lake (PDF): https://www.hc34.hotchips.org/assets/program/conference/day2/Mobile%20and%20Edge/Meteor_Lake_Hotchips%20_%20Wilfred%20_%20final_submit%20(1).pdf
- WikiChip — TSMC CoWoS: https://en.wikichip.org/wiki/tsmc/cowos
- 3DInCites IFTLE 615 — TSMC Evolves CoWoS, 9x Reticle by 2027: https://www.3dincites.com/2024/12/iftle-615-tsmc-evolves-cowos-technology-promising-9x-reticle-size-by-2027/
- imec — Chiplet vs monolithic design: https://www.imec-int.com/en/articles/when-does-it-make-sense-move-monolithic-asic-chiplet-based-design

**DSA / TPU**
- arXiv:1704.04760 — In-Datacenter Performance Analysis of a Tensor Processing Unit: https://arxiv.org/abs/1704.04760
- ACM DL — ISCA'17 TPU paper: https://dl.acm.org/doi/10.1145/3079856.3080246
- HPCwire — Hennessy & Patterson: A New Golden Age for Computer Architecture: https://www.hpcwire.com/2018/04/17/hennessy-patterson-a-new-golden-age-for-computer-architecture/
- CACM — A new golden age for computer architecture: https://dl.acm.org/doi/10.1145/3282307
- SIGARCH — ISCA 2018 Summary: https://www.sigarch.org/isca-2018-summary-a-new-golden-age-for-computer-architecture/

**Memory wall**
- Wulf & McKee 1995 (참조 서지): https://www.scirp.org/reference/referencespapers?referenceid=19416
- McKee — Reflections on the Memory Wall (PDF): http://svmoore.pbworks.com/w/file/fetch/59055930/p162-mckee.pdf
- arXiv:2403.14123 — AI and Memory Wall: https://arxiv.org/abs/2403.14123
- IEEE Micro 버전 (PDF): https://www.stat.berkeley.edu/~mmahoney/pubs/AI_and_Memory_Wall.pdf
- Medium/riselab — AI and Memory Wall (원 블로그): https://medium.com/riselab/ai-and-memory-wall-2cb4265cb0b8
- SemiAnalysis — The Memory Wall: Past, Present, and Future of DRAM: https://newsletter.semianalysis.com/p/the-memory-wall

**4F² / COP / VCT / 3D DRAM**
- SemiAnalysis — ISSCC 2026: NVIDIA & Broadcom CPO, HBM4 & LPDDR6, TSMC Active LSI: https://newsletter.semianalysis.com/p/isscc-2026-nvidia-and-broadcom-cpo
- SemiWiki — ISSCC 2026: Samsung shows 16Gb hybrid bonded Cell-on-Peripheral 4F² DRAM: https://semiwiki.com/forum/threads/isscc-2026-samsung-shows-16-gb-hybrid-bonded-cell-on-peripheral-4f-2-dram.24805/
- SemiWiki — ISSCC 2026 Samsung Electronics demonstrated a 16Gb DRAM: https://semiwiki.com/forum/threads/isscc-2026-samsung-electronics-demonstrated-a-16gb-dram.24808/
- SemiWiki — Samsung and SK hynix advance 4F² DRAM as gateway to 3D memory: https://semiwiki.com/forum/threads/samsung-and-sk-hynix-advance-4f%C2%B2-dram-as-gateway-to-3d-memory.23054/
- SK hynix Newsroom — SK hynix Presents Future DRAM Technology Roadmap at IEEE VLSI 2025: https://news.skhynix.com/sk-hynix-presents-future-dram-technology-roadmap-at-ieee-vlsi-2025/
- Tom's Hardware — SK hynix reveals DRAM development roadmap through 2031: https://www.tomshardware.com/pc-components/dram/sk-hynix-reveals-dram-development-roadmap-through-2031-ddr6-gddr8-lpddr6-and-3d-dram-incoming
- TechInsights — The 4F² Breakthrough: VCT DRAM and the Hybrid Bonding Era for sub-10nm DRAM: https://www.techinsights.com/blog/4f2-breakthrough-vct-dram-and-hybrid-bonding-era-sub-10nm-dram
- TechInsights — Memory Technology Roadmaps: Three Segments, Three Inflection Points: https://www.techinsights.com/blog/memory-technology-roadmaps-three-segments-three-inflection-points
- guru3d — TechInsights projects 3D/4F² mass production at 0C node: https://www.guru3d.com/story/future-of-dram-memory-mass-production-of-3d-and-4f2-structures-at-0c-node-techinsights-projects/
- Yole — Next-Gen DRAM 2025: Focus on HBM and 3D DRAM: https://www.yolegroup.com/product/report/next-gen-dram-2025---focus-on-hbm-and-3d-dram/
- imec — Capacitor-less IGZO-based DRAM cell: https://www.imec-int.com/en/articles/capacitor-less-igzo-based-dram-cell-excellent-retention-endurance-and-gate-length-scaling
- imec — Demonstrates Capacitor-less IGZO-Based DRAM Cell With >400s Retention: https://www.imec-int.com/en/press/imec-demonstrates-capacitor-less-igzo-based-dram-cell-400s-retention-time
- imec — A view on the memory and storage technology roadmaps: https://www.imec-int.com/en/articles/view-memory-and-storage-technology-roadmaps
- Micron — 1γ (1-gamma) DRAM 출하 발표: https://investors.micron.com/news-releases/news-release-details/micron-announces-shipment-1g-1-gamma-dram-pioneering-memory

**중국 (CXMT·YMTC)**
- ZeroHedge — China CXMT Testing Production Line for Next-Gen Bonded DRAM: https://www.zerohedge.com/technology/china-cxmt-testing-production-line-next-gen-bonded-dram-closing-tech-gap-korea-far
- wccftech — CXMT On The Priority List For China's New Homegrown DUV Machines, Big Bet On 3D DRAM: https://wccftech.com/cxmt-gets-one-of-the-first-homegrown-duv-machines-in-china-neutralizing-the-us-match-act-and-bolstering-its-big-bet-on-3d-dram/
- Tom's Hardware — YMTC and CXMT team up to accelerate Chinese domestic HBM production: https://www.tomshardware.com/pc-components/ram/ymtc-partners-with-cxmt-for-hbm
- EE Times Asia — CXMT's Rise: China's Memory Champion Challenging Global Leaders: https://www.eetasia.com/cxmts-rise-chinas-memory-champion-challenging-global-leaders/

**zHBM / 커스텀 HBM**
- MIT Technology Review Korea — 삼성전자, 가속기 위에 메모리 수직 적층 'zHBM' 공개: https://www.technologyreview.kr/deeptech/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90-%EA%B0%80%EC%86%8D%EA%B8%B0-%EC%9C%84%EC%97%90-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EC%88%98%EC%A7%81-%EC%A0%81%EC%B8%B5-zhbm-%EA%B3%B5%EA%B0%9Cai-%EB%A9%94/
- 파이낸셜투데이 — 삼성전자, FMS 2026 참가…차세대 zHBM 최초 공개: https://www.ftoday.co.kr/news/articleView.html?idxno=363123
- 더퍼블릭 — FMS 2026서 맞붙은 3D 적층 기술: 삼성 'zHBM' vs SK하이닉스 'G0.5': https://www.thepublic.kr/news/articleView.html?idxno=314015
- 한국일보 — AI 병목은 GPU 아닌 메모리: https://www.hankookilbo.com/news/article/A2026080512020004114
- 서울경제 — 삼성전자·SK하이닉스 "2년 후 커스텀 HBM 시대…2029년엔 55조": https://www.sedaily.com/article/14014700
- TrendForce — Samsung's Custom HBM4E Design Reportedly Aimed for Mid-2026: https://www.trendforce.com/news/2026/01/23/news-samsungs-custom-hbm4e-design-reportedly-aimed-for-mid-2026-parallels-sk-hynix-and-micron/
- Tom's Hardware — TSMC and GUC detail HBM4, HBM4E and C-HBM4E: https://www.tomshardware.com/pc-components/dram/hbm-undergoes-major-architectural-shakeup-as-tsmc-and-guc-detail-hbm4-hbm4e-and-c-hbm4e-3nm-base-dies-to-enable-2-5x-performance-boost-with-speeds-of-up-to-12-8gt-s-by-2027
- TechPowerUp — TSMC Showcases Custom C-HBM4E, N3P Logic Dies: https://www.techpowerup.com/343529/tsmc-showcases-custom-c-hbm4e-n3p-logic-dies-target-double-efficiency
- digitimes — Samsung, SK hynix, Micron's diverging approach to HBM4 base dies: https://www.digitimes.com/news/a20260710VL213/samsung-sk-hynix-micron-hbm4-manufacturing
- 이투데이 — HBM4부터 HBM5까지…삼성, 파운드리로 AI 메모리 경쟁력 키운다: https://www.etoday.co.kr/news/view/2607652
- 아시아타임즈 — 'HBM 부활' 삼성전자, 시스템도 날갯짓…'원스톱 설루션': https://www.asiatime.co.kr/article/20260326500160

**개발 TAT / 팹 사이클타임**
- SemiEngineering — Battling Fab Cycle Times: https://semiengineering.com/battling-fab-cycle-times/
- Critical Manufacturing — Understanding Acceptable Cycle Times in Semiconductor Fabs: https://www.criticalmanufacturing.com/blog/understanding-acceptable-cycle-times-in-semiconductor-fabs-and-how-to-improve-them/
- SemiWiki — Primary contributors to wafer fab cycle time: https://semiwiki.com/forum/threads/primary-contributors-to-wafer-fab-cycle-time-which-process-steps.18246/
- SIA/ITRS — Overall Roadmap Technology Characteristics (PDF): https://www.semiconductors.org/wp-content/uploads/2018/08/2003Overall-Roadmap-Technology-Characteristics.pdf
