# 데이터센터 유형별 스토리지 요구 팩트 원장: 범용 클라우드 · AI 학습 · AI 추론 · 에이전트 서비스 (Muse · Dot 식별 포함)

**수집일**: 2026-10-03
**수집자**: Research Agent (DC Types) : 사실 수집 전용. 전략 판단·권고 없음.
**유형**: 웹 검색 + 1차 원문 직접 열람(Anthropic 엔지니어링·뉴스 원문, Google Cloud 블로그 원문, Microsoft IR 원문, GitHub 원본 코드·문서, **Azure 공개 트레이스 원시 데이터 직접 계산**) 기반 팩트 원장
**용도**: 배경 슬라이드 "하이퍼스케일러는 성격이 다른 여러 종류의 데이터센터를 운영하며, 유형마다 스토리지 요구가 다르다"의 **차트용 수치 근거**. 유형 4종: ① 범용 클라우드 DC(VM·DB·오브젝트/블록 스토리지·웹 서비스) ② AI 학습 DC ③ AI 추론 DC(서빙·KV 캐시 오프로드·컨텍스트 메모리) ④ 에이전트 서비스 DC(장시간·상시 실행 에이전트, 사용자별 클라우드 컴퓨터·메모리). 사용자가 예로 든 "Muse"·"Dot"의 정체를 §1에서 먼저 확정한다.

**등급**: ✅ 1차 원문 직접 열람(공식 블로그·IR 원문·공식 저장소 코드·공개 데이터셋 원본) / 🟡 2차 매체 또는 검색 인덱스 경유(1차 출처라도 원문을 직접 못 연 경우 포함, `[검색 요약 경유]`) / ⚠️ 파생·단일출처·미검증·충돌 / **⚠️ 파생** = 본 원장이 산술로 직접 도출(산식·근거 명기)

---

## ⚠️ 0. 방법론 고지 (반드시 읽을 것)

**0-1. 도구 제약.** 이번 세션에서 egress 프록시가 다음 도메인을 차단했다(curl·WebFetch 모두): `about.fb.com`, `ai.meta.com`, `engineering.fb.com`, `openai.com`, `cdn.openai.com`, `help.openai.com`, `techcrunch.com`, `axios.com`, `cnbc.com`, `marktechpost.com`, `decrypt.co`, `betanews.com`, `thenextweb.com`, `business-standard.com`, `heise.de`, `datacamp.com`, `vellum.ai`, `wccftech.com`, `runtimewire.com`, `windowsreport.com`, `xenospectrum.com`, `robonomics.substack.com`, `x.com`, `developer.nvidia.com`, `docs.nvidia.com`, `www.nvidia.com`, `nvidianews.nvidia.com`, `huggingface.co`, `aws.amazon.com`, `docs.aws.amazon.com`, `learn.microsoft.com`, `azure.microsoft.com`, `blog.google`, `deepmind.google`, `research.google`, `arxiv.org`, `usenix.org`, `dl.acm.org`, `openreview.net`, `medium.com`, `lmcache.ai`, `newsletter.semianalysis.com`, `epoch.ai`, `openrouter.ai`, `a16z.com`, `manus.im`, `micron.com`, `seagate.com`, `hpcuserforum.com`, `cse.cuhk.edu.hk`(403), `en.wikipedia.org` 등. **직접 열람이 가능했던 것은 `www.anthropic.com`, `cloud.google.com`, `www.microsoft.com`, `raw.githubusercontent.com`, GitHub 릴리스 자산 다운로드(`release-assets.githubusercontent.com`)뿐**이다. 따라서:
- **✅는 위 경로에서 원문·원데이터를 직접 읽은 항목에만 붙였다**: Anthropic 엔지니어링 4건·뉴스 3건, Google Cloud 블로그 9건, Microsoft FY26 Q4 실적 콜 원문, Meta `llama-models`·DeepSeek-V3 설정 파일, DeepSpeed 문서, LangGraph checkpoint README, Alibaba block-traces README, **Azure 공개 데이터셋(대화 트레이스 2023·2024, GitHub Copilot 코딩 에이전트 트레이스 2026) 원본**.
- **Muse·Dot 관련 사실은 전부 검색 요약 경유(🟡)** 다. Meta·OpenAI 원문(about.fb.com, openai.com)을 열지 못했다.
- NVIDIA DGX SuperPOD 문서, Llama 3 논문(arXiv), AWS AgentCore 문서는 원문 차단으로 🟡.

**0-2. "DC 유형"의 뜻.** 이 원장의 4유형은 **워크로드 기준 분류**이며, 하이퍼스케일러가 유형마다 물리적으로 다른 건물을 짓는다는 뜻이 아니다(§7 NG-02). 근거로 확보한 것은 (a) Google이 "사전학습·사후학습·실시간 서빙의 인프라 요구가 갈라졌다"며 학습용·추론용 TPU를 분리한 진술(DT-35), (b) Microsoft의 "AI and non-AI infrastructure" 병행 진술(mixed-media IR-11), (c) 에이전트용으로 별도 실행 기반(샌드박스·사용자별 VM·세션 로그)을 내놓은 각 사의 발표(§5)다. **에이전트 서비스의 LLM 추론 자체는 추론 DC에서 돈다**. 에이전트 DC 고유의 요구는 그 위에 얹히는 ① 장문맥·다회차 KV 재사용 ② 사용자·에이전트별 샌드박스/VM의 영속 디스크 ③ 세션 로그·상태 체크포인트다.

**0-3. 기존 원장과의 관계(ID로만 참조, 반복하지 않음).**
- [ssd-high-capacity-rackspace-fault-tolerance-2026-10.md](ssd-high-capacity-rackspace-fault-tolerance-2026-10.md)(이하 **HC**): A14·A15·A16(랙 전력), **A17**(Azure 스토리지 = 운영 배출 33%), A18(블레이드 용량), A20(IEA 스토리지 전력 약 5%), A22·A23(Meta 학습 데이터 파이프라인).
- [ssd-mixed-media-infra-reuse-2026-10.md](ssd-mixed-media-infra-reuse-2026-10.md)(이하 **MM**): **IR-01~IR-09**(서버 내용연수), IR-11(AI·비AI 병행), **IR-21**(Uptime 2026 랙 밀도), IR-30·IR-31(Colossus HDD+SSD), IR-35(S3 수백만 HDD).
- [wcssd-v1-high-dwpd-configurable-2026-09.md](wcssd-v1-high-dwpd-configurable-2026-09.md)(이하 **WC**): **X-01**(CHEOPS'25 읽기 2.0GiB/s vs 쓰기 11MiB/s), X-02, **X-03**(장시간 에이전트 워크플로 LMCache-on-NVMe 읽기 92%/쓰기 8%, 약 33MB KV 블록), **D-03**(StorageReview 실측 3.2 DWPD), X-08, X-10.
- [ssd-ultra-high-dwpd-mlc-mode-2026-10.md](ssd-ultra-high-dwpd-mlc-mode-2026-10.md)(이하 **UD**): **UD-11**(NVIDIA CMX GPU당 최대 16TB), UD-12(Huawei M900).
- [qlc-v7-hbm-to-storage-shift-2026-09.md](qlc-v7-hbm-to-storage-shift-2026-09.md)(이하 **v7**): S-11, V-20, V-50·V-52(CMX/STX), W-30(SGLang HiCache 코딩 에이전트), C-40(DeepSeek V4.1-Flash 890B/token).
- [qlc-v6-inflection-2028-demand-path-2026-09.md](qlc-v6-inflection-2028-demand-path-2026-09.md)(이하 **INF**): B-20(Micron 300~350KB/token), **B-21**(Micron: 에이전트 워크로드 = 표준 추론 대비 용량 10~40배, 수 시간~수 일), B-30(Google 월 토큰).
- [qlc-v6-purchase-criteria-dwpd-history-2026-09.md](qlc-v6-purchase-criteria-dwpd-history-2026-09.md)(이하 **PC**): A10(PM9A3 1 DWPD), D08(Kioxia 추론 CAGR 86% vs 학습 16%), D14(체크포인트 쓰기 집약).
- [qlc-essd-market-size-forecast-data-2026-09.md](qlc-essd-market-size-forecast-data-2026-09.md)(이하 **MS**) §2: "HDD/SSD EB 비율 2025: enterprise/DC 한정 HDD ≈ SSD의 4배"(Seagate 블로그, IDC·Forward Insights 인용, 🟡), §3 SanDisk KV 캐시 NAND 2027 75~100EB.
- [kv-cache-ssd-demand-2026.md](kv-cache-ssd-demand-2026.md): TLC read-intensive 1 DWPD 기준값.
- [../raw-notes/ai-datacenter-buildout-2026-06.md](../raw-notes/ai-datacenter-buildout-2026-06.md) B1: GB200 NVL72 공칭 120kW, HPE 실부하 132kW.

**0-4. 파생 산식 규칙.** KV 바이트/토큰 = 2(K·V) × 레이어 수 × KV 헤드 수 × 헤드 차원 × 2바이트(BF16). MLA(DeepSeek-V3)는 (kv_lora_rank + qk_rope_head_dim) × 레이어 수 × 2바이트. GB = 10⁹ 바이트, KiB = 1,024 바이트. 트레이스 통계는 공개 원데이터를 본 원장이 직접 집계한 값이며 논문 본문 수치와 대조하지 못했다(논문 arXiv 차단).

---

## §1. "Muse"·"Dot" 식별

### 1-A. 결론

**Muse = Meta의 개인 AI 에이전트 "Muse"(2026-09-08 출시)**, **Dot = OpenAI의 상시 실행 에이전트 "dots"(2026-09-29 DevDay 출시, 제품명은 복수형 소문자 "dots", 개별 에이전트는 "a dot")** 일 가능성이 가장 높다. 두 제품은 같은 달에 나왔고, **둘 다 사용자마다 전용 클라우드 컴퓨터(VM)와 브라우저를 주고, 앱을 닫아도 백그라운드에서 계속 일하며, 대화를 넘어 상태·기억·파일을 유지하는 장시간·상시 실행형 개인 에이전트**다. 매체도 둘을 경쟁 제품으로 묶어 보도했다(DT-08). 동명 후보(1-C)는 출시 시기·성격이 맞지 않는다.

### 1-B. 사실

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| DT-01 | ⭐ **Meta Muse**: Chief AI Officer Alexandr Wang 산하에서 개발한 최신 모델 위의 **자율 개인 AI 에이전트**. iOS·Android·웹·WhatsApp, **미국 성인** 대상. 채팅 인터페이스이나 "더 능동적이고 장시간 실행(proactive and long-running)": 목표를 주면 계획을 세우고 **앱을 닫은 뒤에도 계속 작업**, 변화가 있거나 승인이 필요할 때 돌아옴. 예약·이벤트 기반 백그라운드 작업, **영속 메모리(persistent memory)**, Goals·Artifacts·승인 카드. 이메일 읽기·여행 예약·양식 작성·협상·결제. 모델은 **Muse Spark 1.3**(터미널 코딩 도구 Muse Code와 같은 모델). 요금 Free·$20·$100 티어, 출시 시 미국 한정. 스마트 글래스 탑재 예정 | **2026-09-08** | Meta 뉴스룸 https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/ (차단) ; Axios https://www.axios.com/2026/09/08/meta-debuts-muse-personal-ai-agent ; MarkTechPost https://www.marktechpost.com/2026/09/08/meta-introduces-muse-a-personal-ai-agent-that-runs-on-its-own-dedicated-secure-cloud-computer/ ; TestingCatalog https://www.testingcatalog.com/meta-introduces-muse-as-a-proactive-personal-agent/ ; UploadVR https://www.uploadvr.com/meta-smart-glasses-getting-muse-ai-agent/ | 🟡 `[검색 요약 경유]` |
| DT-02 | ⭐ **Muse Secure VM**: 사용자마다 **전용·격리된 영속 Linux 클라우드 컴퓨터**(브라우저·스토리지·CPU·메모리). 파일·앱 상태·메모리 관련 데이터·연결 서비스 자격증명이 이 환경에 유지되고, 로그인된 사이트·다운로드 파일·진행 중 작업이 세션을 넘어 남음. 비밀번호·결제수단은 별도 보안 저장소. **사용자당 사양: 2 vCPU, 약 8GB RAM, 100GB SSD**. ⚠️ **충돌**: 한 보도는 "Meta says"로, 다른 보도는 "사용자 테스트로 관측된 값이며 Meta가 공표·보장하지 않음"으로 서술. 한 관측 인스턴스는 RAM 7.7GB 노출 중 실제 사용 약 3GB, 영속 스토리지 100GB | 2026-09 | StarkInsider https://www.starkinsider.com/2026/09/meta-muse-specs-what-it-runs-on.html ; Windows Report https://windowsreport.com/meta-muse-hits-700000-daily-users-as-service-issues-appear/ ; XenoSpectrum https://xenospectrum.com/en/meta-muse-cloud-runtime-observed-resources/ ; zimaspace https://shop.zimaspace.com/blogs/tech-ai-hub/meta-muse-secure-vm-always-on-ai-agent ; aicybr https://aicybr.com/blog/meta-muse-personal-ai-agent | 🟡 / ⚠️ (공식 여부 충돌) |
| DT-03 | **Muse 이용 규모·자원 압박**: 출시 약 5일 만에 미국 다운로드 73만, 이후 250만+ 다운로드(CNBC 2026-09-21), 미국·캐나다 첫 12일 iOS 180만. Similarweb 추정 **DAU 약 70만**(11일 전의 약 10배). **Alexandr Wang: 사용량이 내부 예측을 넘었고 사용자가 테스트 집단보다 약 10배 많은 자원을 소비**. Meta는 토큰 사용량을 리셋하고 한도를 올림. 서비스 저하 보고, 하위 에이전트 120개 생성 요청에 33개만 생성된 사례 | 2026-09-12~21 | CNBC https://www.cnbc.com/2026/09/21/meta-muse-personal-ai-agent-downloads.html ; Windows Report(위) ; aiweekly https://aiweekly.co/alerts/meta-muse-tops-chatgpts-early-ios-pace-hits-18m-downloads ; longbridge https://longbridge.com/en/news/300128495 | 🟡 |
| DT-04 | **Muse 인프라 추정(제3자, 산술)**: (a) Tom's Hardware 계열 추정: 512 vCPU·2TB 서버 1대에 2 vCPU·8GB 샌드박스 256개, DAU 50만+면 **가상 서버 트레이 약 2,000개**(Meta 공개 배치 아님). (b) Wccftech: 1억 사용자로 확장 시 자원 공유 없다는 가정에서 **CPU 코어 2억 개(126코어 EPYC 약 158만 개), RAM 800PB, SSD 10,000PB**. (c) Freda Duan(Robonomics): DAU 1억 기준 평균 총전력 **약 1~2GW**(CPU/VM 계층은 약 0.1GW), 모델 호출 수에 따라 3~4GW 가능; 피크/평균 2.5배 가정 시 **동시 VM 약 2,500만 대**; 샌드박스 계층 CPU 10억 달러 미만, DRAM 약 20억 달러 | 2026-09 | runtimewire https://runtimewire.com/article/meta-muse-linux-sandbox-ssh-security ; Wccftech https://wccftech.com/if-metas-muse-personal-agent-scales-to-just-100-million-users-it-would-require-1-58-million-amd-ryzen-cpus-800-petabyte-of-ram-and-10000-petabyte-of-ssd-under-ideal-conditions/ ; Robonomics https://robonomics.substack.com/p/agent-muse-compute-demand ; X https://x.com/FredaDuan/status/2104080496963588563 | ⚠️ (제3자 추정·검색 요약) |
| DT-05 | ⭐ **OpenAI dots**: DevDay 키노트에서 Sam Altman 발표. "remarkably capable, **always-on** agents". **GPT-6 Astra**(같은 달 출시 모델) 기반. **각 dot은 자기 클라우드 컴퓨터와 브라우저**를 가지며 4,000개+ 앱 연결, 여러 프로젝트 동시 수행, 반복 업무·후속 처리, **하위 에이전트에 일부 위임**. 피드백으로 사용자 선호를 학습, "around the clock" 목표 추구, **사용자 노트북이 꺼져도 클라우드에서 계속 작업**. ChatGPT·문자·Slack·Teams·전화로 접근. 여러 dot의 팀은 로드맵(일자 미정) | **2026-09-29** | TechCrunch https://techcrunch.com/2026/09/29/openai-launches-dots-its-bubbly-agentic-avatar/ ; The Next Web https://thenextweb.com/news/openai-dots-always-on-ai-agents-cloud-computers-devday ; Decrypt https://decrypt.co/379584/openai-ai-agents-computers-devday-2026-everything-announced ; NBC https://www.nbcnews.com/tech/tech-news/openai-launches-dots-ai-agents-safety-questions-rcna600338 ; techmymoney https://techmymoney.com/2026/09/29/openai-dots-personal-agents/ | 🟡 `[검색 요약 경유]` |
| DT-06 | **dots의 클라우드 컴퓨터·영속성**: dot의 클라우드 컴퓨터는 "브라우징하고, 소프트웨어를 실행하고, **파일을 보관하는 곳**". **파일·설치 소프트웨어·로그인 세션을 유지**해 반복 업무를 매번 다시 설명할 필요가 없음. 대화·연결 서비스의 정보를 **dot이 존재하는 동안** 맥락으로 보관. 유지 환경은 Linux·Chrome. 샌드박스가 코드·도구 접근을 제한. **OpenAI는 CPU·RAM·스토리지 할당을 공개하지 않음** | 2026-09-29~30 | heise https://www.heise.de/en/news/OpenAI-Launches-Dots-Permanently-Active-AI-Agents-with-Their-Own-Cloud-Computer-11470571.html ; DataCamp https://www.datacamp.com/blog/openai-dots ; Flavio Copes https://flaviocopes.com/openai-dots/ ; kingy.ai https://kingy.ai/blog/openai-dots-guide/ | 🟡 |
| DT-07 | **dots 컴퓨트 발언·요금**: Altman "starting out as a **premium product**" because "**it uses a lot of compute**". 무료·Plus 제외, **Pro 100($100/월)이 dot 포함 최저 요금제**, 첫 dot은 Pro·Business Premium에 추가 비용 없이 포함. Pro의 대상 시장에서 EEA·스위스·영국 제외. Enterprise·Edu·Healthcare는 베타 | 2026-09-29 | Fast Company https://www.fastcompany.com/91615778/openai-reveals-slew-launches-annual-conference-after-shelving-new-model-over-safety-concerns ; Audacy https://www.audacy.com/1010wins/news/business/sam-altman-openai-conference-dots-agent-77b6b8888145869206996d7509d24256 ; yellow.com https://yellow.com/news/openai-dots-paying-chatgpt-users ; BigGo https://finance.biggo.com/news/996cb7b60a12954d | 🟡 |
| DT-08 | **두 제품을 경쟁 관계로 묶은 보도**: "OpenAI를 Meta Muse와 같은 개인 에이전트 경쟁에 올려놓되, 각 dot에 자체 브라우저와 클라우드 컴퓨터를 준다", "Dots will stay paid and slower than Meta's Muse" | 2026-09-29~30 | ecosistemastartup https://ecosistemastartup.com/openai-lanza-dots-agentes-siempre-activos-contra-meta-muse/ ; BigGo(위) | 🟡 |

### 1-C. 동명 후보 (채택하지 않은 것)

| ID | 후보 | 사실 | 채택하지 않은 이유 | 출처 | 등급 |
|---|---|---|---|---|---|
| DT-09a | Meta **Muse Spark** (모델) | Meta Superintelligence Labs의 모델 계열. Muse 에이전트가 이 계열(1.3) 위에서 돈다 | 에이전트가 아니라 모델명 | letsdatascience https://letsdatascience.com/news/meta-hires-alexandr-wang-and-releases-muse-spark-15c50c97 ; runtimewire https://runtimewire.com/article/meta-alexandr-wang-muse-spark-1-3-max-safety-release | 🟡 |
| DT-09b | Microsoft **Muse** (WHAM) | Xbox·Ninja Theory의 게임플레이 생성 모델 "World and Human Action Model" | 2025-02 발표, 게임 개발 보조 모델이며 에이전트 서비스 아님 | dig.watch https://dig.watch/updates/microsoft-partners-with-ninja-theory-on-ai-project | 🟡 |
| DT-09c | Unity **Muse** | 게임 개발용 AI 도구 묶음(Chat·Sprite·Texture) | 개발 도구 | llmreference https://www.llmreference.com/model-family/muse | 🟡 |
| DT-09d | New Computer **Dot** | 2024년 Sam Whitmore·Jason Yuan이 출시한 기억 기반 AI 동반자 앱. **2025-10-05까지만 운영하고 종료** 발표(창업자 비전 차이) | 2026년 현재 서비스 종료 | TechCrunch https://techcrunch.com/2025/09/05/personalized-ai-companion-app-dot-is-shutting-down ; getcoai https://getcoai.com/news/ai-companion-app-dot-shuts-down-amid-founder-disputes/ | 🟡 |
| DT-09e | Dot Assist | 기업용 고객서비스 챗봇 SW | 개인 에이전트 아님 | Capterra https://www.capterra.com/p/10035616/Dot-Assist/ | 🟡 |

---

## §2. 범용 클라우드 DC (VM·DB·오브젝트/블록 스토리지·웹 서비스)

### 2-A. 기존 원장 참조 (반복하지 않음)

| 기존 ID | 내용 요지 | 등급 |
|---|---|---|
| HC **A17** | Azure 범용 클라우드: 스토리지 관련 배출 = **운영 배출 33%·내재 배출 61%**, SSD 랙은 HDD 랙 대비 TB당 운영 배출 약 4배 | ✅ |
| HC A18 | Project Olympus: SSD 블레이드 1U·16드라이브 246TB, HDD JBOD 4U·88드라이브 2.6PB, 스토리지 전력은 평탄(표준편차 3%) | ✅ |
| HC A20 | IEA: DC 전력 중 스토리지 약 5%(지표가 "전력"이고 대상이 전체 DC라 A17 "배출 33%"와 다름) | 🟡 |
| MM **IR-01~IR-09** | 범용 서버 내용연수 4사 모두 5~6년(Microsoft 4→6년 ✅), Amazon AI/ML 일부만 6→5년 | ✅/🟡 |
| MM **IR-21** | Uptime 2026: **최빈 랙 밀도 11kW**, CPU 기반 엔터프라이즈 워크로드가 설치 용량의 대부분(엔터프라이즈·코로 위주 표본) | 🟡 |
| HC A15·A16 | 범용 CPU 랙 최대 약 12kW, 2025 평균 약 9kW | 🟡 |
| MM IR-30·IR-31·IR-35 | Colossus HDD+SSD 혼합("I/O 밀도를 맞출 만큼만 플래시"), SSD 전용은 비용 프리미엄, S3 "수백만 HDD" | ✅/🟡 |
| MS §2 | 2025 enterprise/DC 한정 **HDD EB ≈ SSD EB의 4배** | 🟡 |
| PC A10 · kv-cache-ssd-demand | 범용 TLC read-intensive SSD 정격 **1 DWPD**(PM9A3 등), mixed-use 3 DWPD | ✅/🟡 |

### 2-B. 신규 사실

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| DT-10 | **클라우드 DC의 EB는 대부분 HDD**: IDC Cloud Infrastructure Index(2019)를 인용한 Seagate 발표 자료 요약: 클라우드 DC는 EB의 **약 90%를 대용량 HDD**에 저장, 상위 10개 하이퍼스케일 DC는 **83~97%** | 2019 데이터 / 2021-05 발표 | Seagate @ HPC User Forum https://www.hpcuserforum.com/wp-content/uploads/2021/05/HPC-Forum-Seagate.pdf (차단) | 🟡 `[검색 요약 경유]` |
| DT-11 | ⚠️ "2019~2023 CSP·하이퍼스케일 출하 EB의 약 87%가 HDD"라는 검색 요약 문구는 **원출처 확인 실패**(horizontechnology.com 요약 문구, Seagate 원문 미발견) | 해당 없음 | https://horizontechnology.com/news/hdd-remains-dominant-storage-technology/ | ⚠️ 미검증, 차트 사용 금지 |
| DT-12 | **⚠️ 파생**: MS §2의 "enterprise/DC HDD EB ≈ SSD EB × 4"를 비중으로 바꾸면 HDD = 4 ÷ (4+1) = **약 80%**(2025). DT-10(2019, 약 90%)과 방향 일치 | 2025 | MS §2 | ⚠️ 파생(🟡 근거) |
| DT-13 | **클라우드 블록 스토리지는 쓰기 우세**: Alibaba Cloud·Tencent CBS 프로덕션 블록 I/O 수십억 건 비교 분석. **두 클라우드 모두 write-dominant, 전통 DC 트레이스(MSRC)는 read-dominant**. 사유: 클라우드 애플리케이션의 읽기 캐시 사용. 쓰인 블록 뒤에는 다시 쓰기가 올 가능성이 큼 | IISWC 2020 | Li·Wang·Lee·Shi https://web3.arxiv.org/abs/2203.10766 ; StorageNewsletter https://www.storagenewsletter.com/?p=259672 | 🟡 (본문 미열람, 비율 수치 미확보) |
| DT-14 | Alibaba 공개 블록 트레이스 README 원문: 베이징 리전 **EBS 가상 디스크 1,000개**를 2020년 1월 한 달간 전수 기록. 대상 "ultra disk"의 전형 용도는 **"running operating systems, big data processing software, web servers"** | 2020-01 데이터 | https://raw.githubusercontent.com/alibaba/block-traces/master/README.md | ✅ |
| DT-15 | **Google Cloud Next '26 범용 인스턴스·스토리지 발표(원문)**: Z4D = SQL·NoSQL·벡터 DB용 **로컬 SSD 최대 84TiB**; C4N + Hyperdisk Extreme = 블록 스토리지 **25GiB/s·약 100만 IOPS**; M4N(메모리 집약 DB) vCPU당 RAM 26.57GiB; Hyperdisk Balanced HA 4배 성능(SQL Server·PostgreSQL); GDC 존당 오브젝트 **6PB**(6배)·**30 IOPS/GB**(10배) | 2026-04-25 | https://cloud.google.com/blog/topics/google-cloud-next/google-cloud-next-2026-wrap-up | ✅ |
| DT-16 | **⚠️ 파생 (랙 전력 대비)**: 범용 최빈 11kW(IR-21) vs GB200 NVL72 공칭 120kW·실부하 132kW(raw-notes B1) → **약 11~12배** (120÷11 = 10.9, 132÷11 = 12.0) | 해당 없음 | IR-21 ; raw-notes B1 | ⚠️ 파생 |

---

## §3. AI 학습 DC

### 3-A. 기존 원장 참조

| 기존 ID | 내용 요지 | 등급 |
|---|---|---|
| raw-notes B1 · HC A14 | GB200 NVL72 공칭 **120kW**/HPE 실부하 132kW, GB300 NVL72 약 120~140kW(A14는 140kW, ⚠️ 단일 출처) | 🟡/⚠️ |
| HC A22·A23 | Meta: 학습 데이터 저장·수집(DSI)이 학습 자체보다 전력을 더 쓸 수 있음, GPU 사이클 56%가 데이터 대기; SSD 캐싱으로 로딩 수 시간 → 수 분 | 🟡 |
| PC D14 | 체크포인트가 가중치·옵티마이저 상태를 주기적으로 기록 → 쓰기 집약, 스토리지 랙 50~100PB 사례 | 🟡 |
| PC D08 · v7 V-20 | Kioxia: DC 내 학습 수요 CAGR **16%** vs 추론 86% | ✅/🟡 |

### 3-B. 신규 사실

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| DT-20 | ⭐ **Llama 3 405B 학습 스토리지(논문 서술)**: 최대 **H100 16K개**(700W, 80GB HBM3, Grand Teton). 사전학습용 스토리지 패브릭 = Tectonic, **SSD 장착 서버 7,500대로 240PB**, **지속 2TB/s·피크 7TB/s**. 주요 과제는 **"짧은 시간 스토리지 패브릭을 포화시키는 매우 버스티한 체크포인트 쓰기"**. 체크포인트는 GPU별 모델 상태를 저장하며 **GPU당 1MB~4GB** | 2024-07 | The Llama 3 Herd of Models https://arxiv.org/pdf/2407.21783 §3.3.1 (차단) | 🟡 `[검색 요약 경유]` |
| DT-21 | **Llama 3 학습 중단**: 54일 스냅샷 동안 **작업 중단 466회(예기치 않은 것 419회)**, 그중 약 78%가 하드웨어 확인·의심. 최다 원인 GPU 결함 30.1%, HBM3 17.2%. 유효 학습 시간 90%+. 체크포인트 성능은 옵티마이저 상태 쓰기 시 **2TB/s 스토리지 대역에 제약**, 복구는 데이터 병렬 GPU들이 중복 옵티마이저 상태를 읽어 더 큰 대역 필요 | 2024-07 | arXiv(위) ; mlops.substack https://mlops.substack.com/p/scaling-and-reliability-challenges ; 3dtested https://www.3dtested.com/tech-industry/artificial-intelligence/faulty-nvidia-h100-gpus-and-hbm3-memory-caused-half-of-the-failures-during-llama-3-training-one-failure-every-three-hours-for-metas-16384-gpu-training-cluster | 🟡 |
| DT-22 | **Meta 24K GPU 클러스터 2개(Llama 3용)**: H100 24,576개. 스토리지는 Tectonic + Hammerspace 병렬 NFS. "**수천 개 GPU가 체크포인트를 동기화된 방식으로 저장·로드**"하면서 데이터 로딩용 **EB급** 고처리량 스토리지 제공 | 2024-03-12 | Meta Engineering https://engineering.fb.com/2024/03/12/data-center-engineering/building-metas-genai-infrastructure/ (차단) ; InfoQ https://www.infoq.com/news/2024/04/meta-ai-infrastructure/ | 🟡 |
| DT-23 | ⭐ **NVIDIA DGX SuperPOD 스토리지 성능 가이드(GB/s, SU 합계)**: **B200**(SU = DGX B200 32대): Standard 읽기 40·쓰기 20, Enhanced 읽기 125·쓰기 62 (4 SU: 160/80, 500/250). **B300**(SU = DGX B300 64대): Standard 80/40, Enhanced 250/124 (8 SU: 640/320, 2,000/992). 등급 정의: Standard = 복수 LLM·파인튜닝 작업과 **주기적 체크포인트**, 데이터셋 대부분이 노드 메모리 캐시에 들어감; Enhanced = 멀티모달 학습, 데이터셋이 캐시보다 커서 I/O가 학습 시간을 좌우, 모델 수십억 파라미터 이상. "**체크포인트를 다 쓸 때까지 학습이 멈추므로 피크 쓰기 처리량이 중요한 요구**" | B200·B300 RA 현행 | https://docs.nvidia.com/dgx-superpod/reference-architecture-scalable-infrastructure-b200/latest/storage-architecture.html ; https://docs.nvidia.com/dgx-superpod/reference-architecture/scalable-infrastructure-b300/latest/storage-architecture.html ; IBM SuperPOD 문서 https://www-api.ibm.com/adobe/assets/urn:aaid:aem:9f7ef845-68b6-4092-8a4a-a0659d44267d/original/as/nvidia-dgx-superpod-with-ibm-storage-scale-and-ibm-storage-scale-system-6000-dgx-h100-h200-b200-b300.pdf | 🟡 `[검색 요약 경유]` |
| DT-24 | **⚠️ 파생 (GPU당 환산)**: B200 SU = 32대 × 8 GPU = 256 GPU, B300 SU = 64대 × 8 = 512 GPU로 나누면 두 세대 모두 **Standard 읽기 0.16·쓰기 0.08 GB/s/GPU, Enhanced 읽기 0.49·쓰기 0.24 GB/s/GPU** (125÷256 = 0.488, 62÷256 = 0.242). **읽기:쓰기 = 2:1**. Llama 3 실측(DT-20)을 16,384 GPU로 나누면 지속 0.12·피크 0.43 GB/s/GPU로 같은 범위 | 해당 없음 | DT-20·DT-23 | ⚠️ 파생 (SU 크기는 검색 요약) |
| DT-25 | ⭐ **Google 멀티티어 체크포인팅(원문)**: 클러스터가 커지면 하드웨어 장애가 "**~ few hours**" 간격으로 잦아지고 체크포인트 복구는 **최대 30분**. 과거 GKE 고객은 **30분마다만** 체크포인트를 Cloud Storage에 쓸 수 있었고 읽기에 최대 30분 대기. 멀티티어(노드 RAM → 다른 슬라이스 복제 → Cloud Storage)로 저장이 **5분 미만**으로 준선형 확장, 수천 노드에서 **1분 미만 복구**. TPU v5p **35K칩** 작업 Goodput **+6.59%**. 1K VM(a3-highgpu-8g, $88/시간) 1주 작업에서 Goodput 6.5%는 약 $1M | 2025-06-16 | https://cloud.google.com/blog/products/ai-machine-learning/using-multi-tier-checkpointing-for-large-ai-training-jobs | ✅ |
| DT-26 | **Google 탄력 학습·최적 체크포인팅(원문)**: 수천 가속기·수 주 PyTorch LLM 학습에서 Goodput 1% = **$1M+**. 최적 체크포인트 간격은 "**수 시간에서 수 분까지**" 작업·클러스터 규모에 따라 다름. A3 Mega 1,024대 사례 Goodput 80%+ → 90%+ | 2025-05-22 | https://cloud.google.com/blog/products/ai-machine-learning/elastic-training-and-optimized-checkpointing-improve-ml-goodput | ✅ |
| DT-27 | ⭐ **Google Next '26 학습 스토리지(원문)**: Managed Lustre **10TB/s**(전년 대비 10배), 용량 **80PB**; Rapid Bucket 2,000만 ops/s·밀리초 미만 지연 → "**대규모 학습 체크포인트와 복구가 거의 즉시**, 가속기 사용률 95%+"; Rapid Cache로 체크포인트 복구 2.2배; Managed Lustre는 체크포인트 쓰기·복구 2.6배. **TPU 8t**: TPUDirect Storage로 호스트 CPU를 우회해 "**수백 PB 데이터셋**"을 칩에 직접 공급, Ironwood 대비 **스토리지 접근 10배** | 2026-04-22 / 04-25 | https://cloud.google.com/blog/products/compute/ai-infrastructure-at-next26 ; https://cloud.google.com/blog/products/compute/tpu-8t-and-tpu-8i-technical-deep-dive ; https://cloud.google.com/blog/topics/google-cloud-next/google-cloud-next-2026-wrap-up | ✅ |
| DT-28 | **체크포인트 크기 근거(원문 + 파생)**: DeepSpeed ZeRO 튜토리얼 원문 "1.5B 파라미터 GPT-2의 **Adam 옵티마이저 상태가 18GB**" → **12바이트/파라미터**(32비트 가중치 + 1·2차 모멘트). **⚠️ 파생**: BF16 가중치 2B를 더한 전체 체크포인트 ≈ **14B/파라미터** → 70B ≈ 0.98TB, **405B ≈ 5.67TB**, 1T ≈ 14TB. 405B 1회분을 Llama 3 지속 대역 2TB/s로 쓰면 이론상 약 2.8초(피크 7TB/s면 0.8초), 실제는 버스트 포화·동기화 비용이 지배(DT-20) | 문서 현행 | https://raw.githubusercontent.com/deepspeedai/DeepSpeed/master/docs/_tutorials/zero.md | ✅ + ⚠️ 파생 |
| DT-29 | **⚠️ 파생 (GPU당 스토리지 용량)**: Llama 3 Tectonic 240PB ÷ 16,384 GPU = **약 14.6TB/GPU**. 단 Tectonic은 범용 분산 파일시스템이라 이 작업 전용 용량이 아닐 수 있음 | 해당 없음 | DT-20 | ⚠️ 파생 |

---

## §4. AI 추론 DC (서빙·KV 캐시 오프로드·컨텍스트 메모리)

### 4-A. 기존 원장 참조

| 기존 ID | 내용 요지 | 등급 |
|---|---|---|
| WC **X-01** | CHEOPS'25 KV 오프로드 블록 트레이스 **읽기 2.0GiB/s vs 쓰기 11MiB/s**(⚠️ 186:1), 128KiB 요청 지배 | ✅ |
| WC X-02 | Samsung: KV 오프로딩은 주로 읽기 집약·동시성 하 버스티 | 🟡 |
| WC **D-03** | StorageReview 실측: KV 쓰기 1.9GB/s 상시 → 드라이브당 **약 3.2 DWPD**(정격 3 초과) | 🟡 |
| WC X-08 | KV 캐시용으로 출시된 주류 제품 1~3 DWPD | 🟡 |
| UD **UD-11** | NVIDIA CMX: **GPU당 최대 16TB**, BlueField-4당 약 150TB, 랙당 약 9,600TB | 🟡 |
| v7 V-50·V-52 | CMX = 로컬(G3)과 공유(G4) 사이 "G3.5" 티어, STX 토큰 처리량 최대 5배·BF4 스토리지 대역 최대 200GB/s | 🟡 |
| INF B-20 · v7 S-11 | 장문맥 KV ≈ 토큰당 300~350KB, Llama 3.1 70B 128K에서 39.06GB | ✅/🟡 |
| v7 C-40 · WC X-10 | DeepSeek V4.1-Flash 토큰당 KV **890B**, 영속 SSD 요구 −87.5% | 🟡 |
| UD-12 | Huawei OceanStor M900 클러스터당 64PB, 접근 지연 60µs | 🟡 |
| MS §3 | SanDisk: KV 캐시 단독 NAND 추가 수요 2027 75~100EB | ✅ |

### 4-B. 신규 사실

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| DT-30 | ⭐ **토큰당 KV 바이트(설정 파일 원문 + 산식)**: `llama-models` `sku_list.py` 원문 아키텍처: Llama 3.1 8B(32층·KV 헤드 8·dim 4096/heads 32), 70B(80층·KV 8·8192/64), 405B(126층·KV 8·16384/128) → 헤드 차원 128. DeepSeek-V3 `config_671B.json`: 61층, kv_lora_rank 512, qk_rope_head_dim 64; `model.py`는 absorb 모드에서 `kv_cache`(512)+`pe_cache`(64)만 캐시, 기본 dtype bfloat16. **⚠️ 파생(BF16)**: 8B **128KiB**, 70B **320KiB**(327,680B), 405B **504KiB**(516,096B), DeepSeek-V3 **68.6KiB**(70,272B), (참고) V4.1-Flash 890B(C-40). 70B 값은 Micron 300~350KB(B-20)와 일치 | 저장소 현행 | https://raw.githubusercontent.com/meta-llama/llama-models/main/models/sku_list.py ; https://raw.githubusercontent.com/deepseek-ai/DeepSeek-V3/main/inference/configs/config_671B.json ; https://raw.githubusercontent.com/deepseek-ai/DeepSeek-V3/main/inference/model.py | ✅ + ⚠️ 파생 |
| DT-31 | **⚠️ 파생 (컨텍스트 길이별 KV, 요청 1건)**: 70B급(320KiB/tok): 8K → 2.68GB, 128K → 42.95GB, 200K → 65.54GB, 1M → **327.7GB**. 405B급: 1M → 516.1GB. DeepSeek-V3(MLA): 1M → 70.3GB. V4.1-Flash: 1M → 0.89GB. **같은 1M 토큰이 모델 구조에 따라 약 580배(516.1 ÷ 0.89) 차이**. Llama 3.1의 최대 컨텍스트는 128K이므로 1M은 바이트 규모 비교용 가정 | 해당 없음 | DT-30 | ⚠️ 파생 |
| DT-32 | ⭐ **Azure 프로덕션 LLM 추론 트레이스(원데이터 직접 집계)**: (a) **대화(conversation) 서비스 1주 트레이스(2024-05-10~19) 2,730만 요청: 요청당 입력(context) 토큰 평균 1,632·중앙값 928·p99 6,683**, 출력 평균 106·중앙값 41, 입력:출력 = 15.5:1. (b) 2023-11-11 대화 샘플 1.9만 건: 입력 평균 1,155·중앙값 1,020, 출력 평균 211. (c) 2023 코드(code) 샘플 8,819건: 입력 평균 2,048, 출력 평균 28, 입력:출력 = 73.4:1 | 2023-11 / 2024-05 | 데이터 설명 https://raw.githubusercontent.com/Azure/AzurePublicDataset/master/AzureLLMInferenceDataset2023.md ; …/AzureLLMInferenceDataset2024.md ; 원본 CSV(GitHub `data/` 및 릴리스 `dataset-llm-2024`) | ✅ 원데이터 / ⚠️ 집계는 본 원장 |
| DT-33 | **⚠️ 파생 (채팅 요청 1건의 KV)**: DT-32(a) 평균 1,632 토큰 × 320KiB(70B급) = **약 0.53GB** | 해당 없음 | DT-30·DT-32 | ⚠️ 파생 |
| DT-34 | ⭐ **Google Next '26 추론 스토리지(원문)**: 신규 포트폴리오 항목으로 "**Dedicated KV Cache scalable storage subsystem**" 명시. "**Automatic KV Cache storage tiering across RAM, Local SSD, and Google Cloud Storage/Lustre, solving long-context memory bottlenecks**". GKE Inference Gateway가 TTFT를 70% 넘게 단축 | 2026-04-22 / 04-25 | https://cloud.google.com/blog/products/compute/ai-infrastructure-at-next26 ; https://cloud.google.com/blog/topics/google-cloud-next/google-cloud-next-2026-wrap-up | ✅ |
| DT-35 | ⭐ **학습과 추론 인프라의 분화(원문)**: "Recognizing that the **infrastructure requirements for pre-training, post-training, and real-time serving have diverged**, our eighth-generation TPUs introduce two distinct systems: TPU 8t and TPU 8i." **TPU 8i** = 추론·강화학습용, 온칩 SRAM **384MB**(3배)·HBM **288GB**, "**KV Cache를 칩 위에**" 두어 장문맥 디코딩 유휴 감소, 에이전트 워크플로·MoE용 저지연, 추론 성능/달러 80% 향상. **TPU 8t** = 학습용, 슈퍼팟 9,600칩·공유 메모리 2PB(검색 요약), TPUDirect Storage(DT-27) | 2026-04-22 | https://cloud.google.com/blog/products/compute/tpu-8t-and-tpu-8i-technical-deep-dive ; https://cloud.google.com/blog/products/compute/ai-infrastructure-at-next26 | ✅ (9,600칩·2PB는 🟡) |
| DT-36 | **GKE Pod snapshots(원문)**: CPU·GPU 메모리를 포함한 실행 상태를 저장·복원. 추론 기동을 최대 **89%** 단축, **70B 모델 37초·8B 15초** 로딩 | 2026-09-21 | https://cloud.google.com/blog/products/containers-kubernetes/gke-pod-snapshots | ✅ |

---

## §5. 에이전트 서비스 DC (장시간·상시 실행 에이전트)

### 5-A. 기존 원장 참조

| 기존 ID | 내용 요지 | 등급 |
|---|---|---|
| INF **B-21** | Micron: 에이전트 워크로드는 표준 추론 대비 **용량 10~40배**, 멀티턴 워크플로가 **수 시간~수 일** 지속 | ✅/🟡 |
| WC **X-03** | "multi-hour agentic workflows" 분석: LMCache-on-NVMe **읽기 약 92% / 쓰기 약 8%**, 프로세스당 약 78% 순차, 약 33MB KV 블록 파일(Samsung PM1753 특성화 인용) | ⚠️ (2차 인용) |
| v7 W-30 | SGLang HiCache: 코딩 에이전트(Qwen3-Coder-480B) 캐시 적중률 40% → 80%, TTFT −56% | 🟡 |
| INF B-30~B-34 | Google 월 3.2 quadrillion 토큰(2026-05, 약 7배 YoY), Microsoft 분기 100조+ 토큰 | ✅/🟡 |

### 5-B. 토큰·세션 규모 (채팅 대비)

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| DT-40 | ⭐ **Anthropic 멀티 에이전트 리서치 시스템(원문)**: "In our data, **agents typically use about 4× more tokens than chat interactions, and multi-agent systems use about 15× more tokens than chats**." BrowseComp 성능 분산의 **80%를 토큰 사용량 하나가 설명**. 컨텍스트가 **200,000 토큰을 넘으면 잘리므로** 계획을 Memory에 저장. 프로덕션 에이전트는 "**hundreds of turns**". 에이전트는 상태를 갖고 오류가 누적되므로 처음부터 재시작하지 않고 "**resume from where the agent was**", "**regular checkpoints**" 사용. 하위 에이전트 출력을 **파일시스템**에 직접 기록 | 2025-06-13 | https://www.anthropic.com/engineering/multi-agent-research-system | ✅ |
| DT-41 | ⭐ **GitHub Copilot 코딩 에이전트 프로덕션 트레이스(Microsoft·Azure 공개, 데이터 카드 원문)**: 2026-06-01~07, 비엔터프라이즈 사용자 에이전트 모드 세션 균일 표본. **세션 301,026 · 사용자 턴 1,189,581 · LLM 호출 9,310,255 · 도구 호출 8,681,190 · 입력(prompt) 토큰 631.4B · 출력 4.91B · 캐시된 입력 540.95B**, 세션당 3.95턴, 턴당 LLM 호출 7.83·도구 호출 7.3, 익명 모델 37종. 논문: Liu·Qiu·Goiri·Fonseca·Bianchini·Choukse, "Agentic Coding in the Wild" (arXiv 2608.00101) | 2026-06 데이터 | https://raw.githubusercontent.com/Azure/AzurePublicDataset/master/GitHubCopilotCodingAgentDataset2026.md ; …/analysis/GitHubCopilotCodingAgents/DATASET_CARD.md ; 릴리스 https://github.com/Azure/AzurePublicDataset/releases/tag/ghcp-coding-agent-2026 | ✅ |
| DT-42 | **⚠️ 파생 (DT-41 7일 전체 합계 기준)**: LLM 호출당 입력 **67,818 토큰**(631.4B ÷ 9,310,255), 세션당 입력 **약 210만 토큰**(631.4B ÷ 301,026)·출력 약 1.6만, 입력:출력 = **128.6:1**, 입력 중 캐시 재사용 **85.7%**(540.95 ÷ 631.4), 세션당 LLM 호출 30.9·도구 호출 28.8 | 해당 없음 | DT-41 | ⚠️ 파생(✅ 근거) |
| DT-43 | **⚠️ 파생 (에이전트 vs 채팅, 요청 1건 입력)**: 67,818(DT-42) ÷ 1,632(Azure 대화 2024-05, DT-32) = **약 42배**(2023 대화 1,155 기준이면 약 59배). 입력:출력도 128.6:1 vs 15.5:1. **주의: 시기(2024-05 vs 2026-06)·서비스·모델 컨텍스트 한도가 다르다**(2024 대화 트레이스 최대 7,999로 8K 한도 추정) | 해당 없음 | DT-32·DT-42 | ⚠️ 파생 |
| DT-44 | **⚠️ 파생 (1일 표본 분포, 본 원장이 원데이터 직접 집계)**: 2026-06-06 아카이브(세션 10,674, LLM 호출 354,297; 토요일, 표본 규모가 평일보다 작음). 호출당 입력 토큰 **중앙값 56,375 · p90 138,643 · p99 262,807 · 최대 941,380**. 세션의 최대 호출 입력(컨텍스트 크기 대리 지표) 중앙값 44,091·p99 275,894, **128K 초과 세션 13.8%, 200K 초과 4.5%**. 세션 벽시계 구간(첫 호출~마지막 이벤트) 중앙값 4.0분·p90 165분·p99 977분, **1시간 초과 18.8%, 8시간 초과 3.9%**(턴 사이 사용자 대기 포함이라 "연속 실행 시간"이 아님). 같은 날 입력 캐시 재사용 88.3%, 입력:출력 107:1 | 2026-06-06 | 릴리스 자산 `date.2026-06-06.tar.gz`(124MB) | ⚠️ 파생(✅ 원데이터, 단일 일자) |
| DT-45 | **⚠️ 파생 (에이전트 컨텍스트의 KV 환산, 70B급 320KiB/tok)**: 에이전트 호출 평균 67,818 토큰 → **22.2GB**(채팅 0.53GB의 약 42배), 1일 표본 세션 최대 컨텍스트 p99 275,894 → 90.4GB, 1M 컨텍스트 → 327.7GB(DeepSeek-V3 구조면 70.3GB). 캐시 재사용 85.7%(DT-42)는 이 KV를 다시 읽는 비중의 대리 지표 | 해당 없음 | DT-30·DT-42·DT-44 | ⚠️ 파생 |
| DT-46 | **Manus(Meta 인수) 컨텍스트 엔지니어링**: 전형적 작업 1건에 **도구 호출 약 50회**, **입력:출력 토큰 비 약 100:1**, **KV 캐시 적중률이 프로덕션 에이전트의 가장 중요한 지표**(Claude Sonnet 캐시 입력 $0.30 vs 비캐시 $3.00/백만 토큰, 10배), 파일시스템을 외부 컨텍스트로 사용 | 2025-07 | https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus (차단) ; ZenML https://www.zenml.io/llmops-database/context-engineering-strategies-for-production-ai-agents | 🟡 |
| DT-47 | **OpenRouter·a16z "State of AI"(100조 토큰)**: 요청당 평균 입력 토큰 약 1.5K → **6K+(약 4배)**, 출력 약 150 → 400. 프로그래밍 요청은 **2만 토큰+** 입력이 흔하며 입력 증가의 주동인. 가장 빠르게 느는 행태는 "agentic inference" | 2025-12 | https://openrouter.ai/state-of-ai ; https://www.a16z.com/state-of-ai ; themoonlight 리뷰 https://www.themoonlight.io/en/review/state-of-ai-an-empirical-100-trillion-token-study-with-openrouter | 🟡 |
| DT-48 | **NVIDIA(GTC 2025) Jensen Huang**: 에이전트 AI·추론(reasoning) 때문에 필요한 계산량이 "**easily a hundred times more than we thought we needed this time last year**". **토큰 배수가 아니라 컴퓨트 수요 전망 발언** | 2025-03-18 | BigDATAwire https://www.bigdatawire.com/2025/03/19/nvidia-preps-for-surge-in-inference-workloads-thanks-to-reasoning-ai-agents ; rev.com 녹취 https://rev.com/transcripts/gtc-keynote-with-nvidia-ceo-jensen-huang | 🟡 |
| DT-49 | **에이전트 연속 작업 시간·컨텍스트(Anthropic 원문 시계열)**: Claude Opus 4 "**several hours**" 연속 작업, Rakuten 오픈소스 리팩터 **7시간**(2025-05-22) → Sonnet 4.5 "**more than 30 hours**" 다단계 작업 집중(2025-09-29) → Opus 4.6 Opus급 첫 **1M 토큰 컨텍스트**(베타)·컨텍스트 압축(2026-02-05). 하네스 설계 실험: 단독 20분·$9 vs 풀 하네스 **6시간·$200**(20배+), 브라우저 DAW 구축 **약 4시간·$124**(2026-03-24). 장기 실행 하네스: 작업이 "**hours, or even days**", 매 세션 `claude-progress.txt`와 **git 커밋**으로 상태를 남김(2025-11-26) | 2025-05 ~ 2026-03 | https://www.anthropic.com/news/claude-4 ; https://www.anthropic.com/news/claude-sonnet-4-5 ; https://www.anthropic.com/news/claude-opus-4-6 ; https://www.anthropic.com/engineering/harness-design-long-running-apps ; https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents | ✅ |
| DT-50 | METR Time Horizon 1.1(2026-01): Claude Opus 4.6의 50% 성공 과업 길이 **사람 전문가 기준 14시간+**, 프런티어 과업 길이는 약 7개월마다 2배(2024년 이후 가속 가능성) | 2026-01 | METR https://arxiv.org/html/2503.14499v3 ; 검색 요약 | 🟡 / ⚠️ (단일 요약) |

### 5-C. 상태·영속 스토리지·쓰기 패턴

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| DT-51 | ⭐ **Anthropic Managed Agents(원문)**: 에이전트를 세 구성요소로 가상화: **session = "the append-only log of everything that happened"**, harness(모델 호출 루프), **sandbox**(코드 실행·파일 편집 환경). 하네스는 루프 중 `emitEvent(id, event)`로 세션에 **내구성 있는 기록**을 쓰고, 장애 후 `wake(sessionId)`·`getSession(id)`로 **마지막 이벤트부터 재개**. 초기에는 한 컨테이너에 다 넣어 "컨테이너가 죽으면 세션이 사라지는" 문제가 있었음. "The session is not Claude's context window": 장기 과업은 컨텍스트 창을 넘으므로 **복구 가능한 컨텍스트 저장은 세션**이 담당. 분리 후 p50 TTFT 약 −60%, p95 −90% 이상 | 2026-04-08 | https://www.anthropic.com/engineering/managed-agents | ✅ |
| DT-52 | **LangGraph 체크포인터(원문)**: "Checkpointers provide a persistence layer for LangGraph: they **save graph state at every superstep**, enabling human-in-the-loop, memory between interactions, durable execution". 노드가 중간 실패하면 같은 superstep의 다른 노드 결과를 **pending writes**로 저장 | 저장소 현행 | https://raw.githubusercontent.com/langchain-ai/langgraph/main/libs/checkpoint/README.md | ✅ |
| DT-53 | ⭐ **Google GKE Agent Sandbox GA(원문)**: GKE 위 샌드박스 수가 **5개월 미만에 16배+** 성장, 고객이 "수백만 에이전트"를 프로덕션 배치. "**Agentic workloads are simultaneously scaling up to the 10s to 100s of millions of instances while at the same time becoming increasingly idle**". 웜 풀로 클러스터당 **초당 300개** 샌드박스 할당(90%가 200ms 내). 짧은 버스트 뒤 긴 유휴 → Pod Snapshots로 유휴 에이전트 **일시정지(suspend)** | 2026-05-20 | https://cloud.google.com/blog/products/containers-kubernetes/bringing-you-agent-sandbox-on-gke-and-agent-substrate | ✅ |
| DT-54 | ⭐ **Google Agent Substrate(원문)**: 오픈소스 에이전트 실행 런타임. 에이전트가 멈추는 순간 **게스트 하이퍼바이저 상태를 로컬 디스크와 Cloud Storage에 스냅샷**으로 내려 RAM·CPU를 회수, 다음 턴·도구 호출 때 **500ms 미만 재개**, **초당 500회+ suspend/resume**. "zero-idle" 모델로 **호스트당 휴면 에이전트 1,000개+**, 컴퓨트 밀도 10배. 턴 간 공유 파일시스템이 필요한 상태형 워크스페이스는 **Filestore agent volume(영속 NFS)**. "1M agent scale" 목표. "Agents spend most of their time waiting on model inference, tool responses, or user input" | 2026-09-15 | https://cloud.google.com/blog/products/containers-kubernetes/agent-substrate-available-on-gke | ✅ |
| DT-55 | **Google GKE 에이전트 밀도 실험(원문)**: n2-standard-48 노드 1대에 OpenClaw 에이전트: microVM(Kata) **61개** → gVisor Agent Sandbox **88개**(+44%) → 웜 풀 성능 최적화 **133개** → 과다 할당 비용 최적화 **274개**(기동 5초 미만). 에이전트는 버스트 후 긴 유휴. 유휴 시 Pod snapshot으로 "persistent storage"에 동결. 간헐 활동 에이전트에서 밀도 최대 3.5배, 에이전트당 비용 최대 −75%. Agent Sandbox GA(5월) 후 4주 미만에 사용량 7배+. **⚠️ 파생**: 274 ÷ 48 vCPU = vCPU당 약 5.7 에이전트 | 2026-07-30 | https://cloud.google.com/blog/products/containers-kubernetes/reduce-your-agents-costs-with-gke-agent-sandbox | ✅ (+⚠️ 파생) |
| DT-56 | **Google Next '26 에이전트 실행 기반(원문)**: Agent Sandbox(코드 실행·브라우저 자동화용 강화 환경, 전체 공개), "**Long-running agents**: … work autonomously in secure cloud sandboxes", **Agent Memory Bank**(대화에서 장기 기억 생성·관리), GKE Agent Sandbox를 **Axion N4A(Arm CPU)** 에서 지원(GA). "Unlike chat, a primary AI agent decomposes goals into specific tasks for a fleet of specialized agents that then collaborate, **preserve state**…"(Vahdat·Lohmeyer) | 2026-04-22 / 04-25 | https://cloud.google.com/blog/topics/google-cloud-next/google-cloud-next-2026-wrap-up ; https://cloud.google.com/blog/products/compute/ai-infrastructure-at-next26 | ✅ |
| DT-57 | **Vertex AI Memory Bank·Agent Engine Sessions**: 세션(이벤트 이력·상태)을 런타임 밖 저장소(SQL DB 또는 Agent Engine)에 두고, Memory Bank가 대화 이력에서 사실·선호를 추출해 사용자 ID 범위로 **영속 저장**·통합. Sessions·Memory Bank GA | 2025 | https://cloud.google.com/blog/products/ai-machine-learning/vertex-ai-memory-bank-in-public-preview ; https://cloud.google.com/blog/topics/developers-practitioners/remember-this-agent-state-and-memory-with-adk | 🟡 `[검색 요약 경유]` |
| DT-58 | **AWS Bedrock AgentCore Runtime**: 세션마다 **전용 microVM**(CPU·메모리·파일시스템 격리), **최대 8시간** 총 실행, 세션 동안 파일·데이터 유지, 세션 종료 시 정리 | 2025 | https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-how-it-works.html (차단) | 🟡 |
| DT-59 | **Microsoft(원문)**: Satya Nadella "**When it comes to running agents, CPUs are just as important as GPUs.**" Cobalt VM이 1st-party·OpenAI 등 워크로드 구동, **Cobalt 200 랙 25개+ DC** 배치 예정. 1조 토큰 연환산 Foundry 고객 수 4배 YoY. (별도, 🟡) **Windows 365 for Agents**: 컴퓨터 사용 에이전트 전용 Cloud PC, 공개 프리뷰 시간당 $0.40(Ignite 2025-11), 초기 파트너 Manus·Genspark 등 | 2026-07-29 / 2025-11 | https://www.microsoft.com/en-us/investor/events/fy-2026/earnings-fy-2026-q4 ; Petri https://petri.com/windows-365-for-agents-ai-cloud-pcs-preview/ | ✅ / 🟡 |
| DT-5A | **AMD(Q1 2026 실적 콜)**: 에이전트 AI로 **CPU:GPU 비율이 1:4~1:8에서 1:1에 가깝게**, 경우에 따라 CPU가 더 많아질 수 있음. CPU TAM 2030 전망 $60B → **$120B**, 에이전트 전용 CPU가 큰 몫. GPU 수요를 잠식하지 않는 "additive" 수요라고 주장 | 2026-05 | digitalcitizen https://www.digitalcitizen.life/amd-says-agentic-ai-will-increase-cpu-demand-without-hurting-gpu-demand/ ; hothardware https://hothardware.com/news/amd-q1-2026-earnings-surging-ai-data-center-demand | 🟡 |
| DT-5B | **⚠️ 파생 (사용자별 VM 영속 스토리지 총량)**: Muse 관측 100GB/사용자(DT-02) × 100만 = **100PB**, × 1억 = **10EB**(Wccftech 10,000PB와 일치, DT-04). Freda Duan 동시 VM 2,500만 대 × 8GB = RAM 200PB, × 2 vCPU = 5,000만 vCPU. 비교: Muse 1인 100GB는 Llama 3 학습 GPU 1개당 약 14.6TB(DT-29)·CMX GPU당 16TB(UD-11)보다 단위가 작지만, **사용자 수에 비례**해 쌓임 | 해당 없음 | DT-02·DT-04 | ⚠️ 파생(관측·가정 기반) |

---

## §6. 차트용 데이터 표

### 6-A. DC 유형별 핵심 지표 (유형당 최대 3개)

| DC 유형 | 지표 | 값 | 단위 | 기준 | 등급 | ID |
|---|---|---|---|---|---|---|
| 범용 클라우드 | 스토리지가 차지하는 운영 배출 비중 | 33 (내재 배출 61) | % | Azure 범용 클라우드 실측, HotCarbon'24 | ✅ | HC A17 |
| 범용 클라우드 | 최빈 랙 전력 | 11 | kW/랙 | Uptime 2026 설문(엔터프라이즈·코로 위주) | 🟡 | MM IR-21 |
| 범용 클라우드 | 저장 용량 중 HDD 비중 | 약 80 (2019 IDC 약 90) | % (EB) | 2025 enterprise/DC HDD EB ≈ SSD × 4 → 4÷5 | 🟡 + ⚠️ 파생 | DT-12 (MS §2), DT-10 |
| AI 학습 | 랙 전력 | 120 (공칭) ~ 132 (실부하) | kW/랙 | GB200 NVL72 | 🟡 | raw-notes B1 |
| AI 학습 | 체크포인트 1회 크기 | 5.67 | TB | 405B, BF16 가중치 + Adam 상태 = 14B/파라미터 | ✅ 근거 + ⚠️ 파생 | DT-28 |
| AI 학습 | 스토리지 대역 가이드 (읽기 / 쓰기) | 0.49 / 0.24 | GB/s/GPU | DGX SuperPOD B200·B300 Enhanced, SU 합계 ÷ GPU 수 | 🟡 + ⚠️ 파생 | DT-23·DT-24 |
| AI 추론 | GPU당 컨텍스트 메모리(플래시) 용량 | 16 | TB/GPU | NVIDIA CMX 최대치 | 🟡 | UD-11 |
| AI 추론 | KV 오프로드 읽기:쓰기 | 186 : 1 (2.0GiB/s vs 11MiB/s) | 비율 | CHEOPS'25 DeepSpeed·FlexGen 트레이스 | ✅ (+⚠️ 산술) | WC X-01 |
| AI 추론 | 토큰당 KV 크기 | 320 | KiB/token | Llama 3.1 70B, BF16 | ✅ 근거 + ⚠️ 파생 | DT-30 |
| 에이전트 서비스 | LLM 호출당 입력 토큰 (에이전트 vs 채팅) | 67,818 vs 1,632 (약 42배) | tokens/호출 | Copilot 에이전트 2026-06 7일 vs Azure 대화 2024-05 1주 | ✅ 원데이터 + ⚠️ 파생 | DT-42·DT-43·DT-32 |
| 에이전트 서비스 | 세션당 입력 토큰 / 캐시 재사용 | 약 210만 / 85.7 | tokens/세션, % | Copilot 에이전트 2026-06 7일 합계 | ✅ 원데이터 + ⚠️ 파생 | DT-41·DT-42 |
| 에이전트 서비스 | 사용자당 영속 SSD | 100 | GB/사용자 | Meta Muse Secure VM (관측치, 공식 여부 충돌) | 🟡 / ⚠️ | DT-02 |

### 6-B. 같은 축으로 비교할 때 쓸 수 있는 값 (참고)

| 축 | 범용 클라우드 | AI 학습 | AI 추론 | 에이전트 서비스 |
|---|---|---|---|---|
| 랙 전력 (kW) | 11 (IR-21) | 120~132 (B1) | 같은 NVL72 계열, VR200 NVL72 190~230 (HC A14, ⚠️) | **미확보** (NG-04). CPU 비중 증가 진술만 있음(DT-59·DT-5A) |
| 지배적 I/O 방향 | 블록 스토리지 쓰기 우세 (DT-13, 비율 미확보) | 읽기:쓰기 = 2:1 가이드 + 체크포인트 쓰기 버스트 (DT-23·DT-24·DT-20) | 읽기:쓰기 = 186:1 (X-01) | KV 계층 읽기 92%/쓰기 8% (X-03) + 세션 append-only 로그·superstep 체크포인트·유휴 스냅샷 쓰기 (DT-51·DT-52·DT-54), 쓰기량 수치 미확보 (NG-03) |
| 대표 저장 단위 | Olympus SSD 블레이드 246TB/1U, HDD JBOD 2.6PB/4U (A18) | 약 14.6TB/GPU (DT-29, ⚠️) | 16TB/GPU (UD-11) | 100GB/사용자 VM (DT-02), 1억 명이면 10EB (DT-5B, ⚠️) |
| 요청·작업당 컨텍스트 | 해당 없음 | 해당 없음 | 채팅 요청 평균 1,632 토큰 → KV 0.53GB (DT-32·DT-33) | 호출 평균 67,818 토큰 → KV 22.2GB, 1M → 327.7GB (DT-45·DT-31) |
| 시간 척도 | 서버 5~6년 사용 (IR-01~IR-09) | 체크포인트 간격 수 시간~수 분, 저장 5분 미만 (DT-25·DT-26) | 요청 단위(초) | 세션 1시간 초과 18.8%, 8시간 초과 3.9% (DT-44); 모델 연속 작업 30시간+ (DT-49) |

**차트 작성 시 유의(사실 관계)**: 6-B의 값은 출처·연도·정의가 서로 다르다. 같은 막대 차트에 올릴 때는 로그 축이 필요하다(예: KV 0.53GB vs 22.2GB vs 327.7GB, 랙 11kW vs 132kW). AI 학습의 GPU당 용량(약 14.6TB, ⚠️)과 추론의 GPU당 용량(16TB)은 **같은 자릿수**이므로 "용량" 축은 학습과 추론을 구분하지 못한다. 구분이 뚜렷한 축은 **I/O 방향**(학습 2:1·쓰기 버스트, 추론 186:1 읽기)과 **컨텍스트/세션 규모**(채팅 vs 에이전트 약 42배)다.

---

## §7. 부정 확인 (검색했으나 확보하지 못한 것)

- **NG-01. Meta·OpenAI가 공식 발표한 에이전트당 VM 스토리지 사양.** Muse 100GB는 관측치이며 공식 여부가 충돌(DT-02). OpenAI는 dots의 CPU·RAM·스토리지 할당을 공개하지 않음(DT-06).
- **NG-02. 하이퍼스케일러가 "에이전트 전용 데이터센터"를 별도 건물·시설 유형으로 짓는다는 진술.** 없음. 확보한 것은 서비스·런타임 계층(Agent Sandbox·Substrate, AgentCore, Windows 365 for Agents, Muse Secure VM, dots 클라우드 컴퓨터)과 CPU 비중 증가 진술(DT-59·DT-5A)뿐. 검색어: `hyperscaler dedicated datacenter for AI agents sandbox CPU storage requirements`.
- **NG-03. 에이전트 샌드박스·VM의 스냅샷 크기, 일시정지 빈도, 에이전트당 일 쓰기량(GB/day·DWPD).** 공개 수치 없음. Agent Substrate는 "로컬 디스크와 Cloud Storage에 스냅샷"이라는 구조만 공개(DT-54).
- **NG-04. 에이전트 서비스용(CPU 샌드박스) 랙 전력.** 없음(Cobalt 200·Axion N4A 랙 전력 미공개).
- **NG-05. 범용 클라우드 SSD 플릿의 실제 DWPD 분포.** NetApp FAST'22 대규모 현장 연구(약 200만 SSD)는 존재하나 본문(usenix.org) 차단으로 수치 미확보. 범용 정격 1 DWPD(PC A10)만 확보.
- **NG-06. "하이퍼스케일 출하 EB의 87%가 HDD" 원출처.** 확인 실패(DT-11).
- **NG-07. 프런티어 모델(GPT·Gemini·Claude) 학습의 체크포인트 크기·주기 공식 수치.** 없음. Meta Llama 3(DT-20)과 Google 일반 가이드(DT-25·DT-26)만 확보.
- **NG-08. GPT-6 Astra·Muse Spark의 토큰당 KV 바이트·컨텍스트 길이.** 비공개(폐쇄 모델).
- **NG-09. Muse·dots의 사용자당 일 토큰 소비량.** 미공개. Meta는 "테스트 집단 대비 약 10배 자원"이라는 상대치만(DT-03).
- **NG-10. Llama 3 논문 원문 대조.** arXiv 차단(DT-20·DT-21은 🟡).
- **NG-11. Copilot 에이전트 트레이스 논문(arXiv 2608.00101) 본문의 분포 수치.** 차단. 본 원장의 분포(DT-44)는 1일(2026-06-06) 아카이브만 직접 집계한 값.
- **NG-12. 범용 클라우드 블록 스토리지의 읽기:쓰기 정량 비율.** IISWC'20 본문(cse.cuhk.edu.hk 403) 미열람으로 "write-dominant"라는 정성 결론만(DT-13).

---

## §8. 보고서에 쓸 수 있는 문장 (사실로만, 그대로 복사 가능)

> **1. ✅ (유형 분화의 1차 진술)** "Google은 2026년 4월 '사전학습·사후학습·실시간 서빙의 인프라 요구가 갈라졌다'며 8세대 TPU를 학습용 TPU 8t와 추론용 TPU 8i 두 시스템으로 나눴고, 추론용 8i는 KV 캐시를 칩 위에 두도록 SRAM을 3배로 늘렸다." : DT-35

> **2. ✅ (범용 클라우드)** "Azure 범용 클라우드에서 스토리지는 운영 배출의 33%, 내재 배출의 61%를 차지한다." : HC A17

> **3. 🟡 (학습)** "Meta는 Llama 3 405B를 H100 1.6만 개로 학습하며 SSD 서버 7,500대·240PB 스토리지(지속 2TB/s, 피크 7TB/s)를 썼고, 짧은 시간 패브릭을 포화시키는 체크포인트 쓰기 버스트가 주요 과제였다." : DT-20

> **4. ✅ (학습)** "Google은 대형 학습 클러스터에서 장애가 수 시간 간격으로 발생하며, 과거 30분 간격이던 체크포인트를 다계층 저장으로 5분 미만에 쓰고 1분 미만에 복구하게 했다." : DT-25

> **5. ✅/🟡 (추론)** "KV 캐시 오프로드 트레이스에서 읽기는 평균 2.0GiB/s, 쓰기는 11MiB/s였고, NVIDIA CMX는 GPU당 최대 16TB의 플래시 컨텍스트 메모리를 붙인다." : WC X-01, UD-11

> **6. ✅ + ⚠️ 파생 (에이전트 vs 채팅)** "GitHub Copilot 코딩 에이전트의 2026년 6월 프로덕션 트레이스(30만 세션)에서 LLM 호출 1회의 평균 입력은 약 6.8만 토큰, 세션당 약 210만 토큰이었고 입력의 86%가 캐시 재사용이었다. 이는 Azure 대화 서비스(2024년 5월) 요청당 평균 입력 1,632 토큰의 약 42배다(시기·서비스가 다름)." : DT-41~DT-43

> **7. ✅ (에이전트 토큰)** "Anthropic은 자사 데이터에서 에이전트가 채팅보다 약 4배, 멀티 에이전트 시스템이 약 15배 많은 토큰을 쓴다고 밝혔다." : DT-40

> **8. ✅ (에이전트 상태 저장)** "Anthropic의 Managed Agents는 에이전트 세션을 '일어난 모든 일의 추가 전용(append-only) 로그'로 내구 저장해 장애 뒤 마지막 이벤트부터 재개하고, Google의 Agent Substrate는 유휴 에이전트의 상태를 로컬 디스크와 Cloud Storage에 스냅샷으로 내려 호스트당 1,000개 이상을 수용한다." : DT-51, DT-54

> **9. 🟡 (Muse·Dot)** "2026년 9월 출시된 Meta Muse와 OpenAI dots는 사용자마다 전용 클라우드 컴퓨터를 주고 앱을 닫아도 계속 일하는 상시 실행형 개인 에이전트다. Muse 사용자 VM에서는 2 vCPU·8GB RAM·100GB SSD가 관측됐다(공식 사양 여부는 보도 간 상충)." : DT-01, DT-02, DT-05, DT-06

> **10. ✅ (CPU의 부상)** "Microsoft CEO는 2026년 7월 '에이전트를 돌리는 데는 CPU가 GPU만큼 중요하다'고 말했다." : DT-59

> **❌ 쓰지 말 것**
> - "Meta가 Muse 사용자당 100GB SSD를 공식 발표했다" → 관측치이며 공식 여부가 보도 간 충돌(DT-02, NG-01).
> - "하이퍼스케일러가 에이전트 전용 데이터센터를 따로 짓는다" → 그런 진술 없음(NG-02). 에이전트 서비스의 LLM 추론은 추론 DC에서 돈다(0-2).
> - "에이전트는 채팅보다 토큰을 100배 쓴다" → 확보한 수치는 4배·15배(Anthropic), 호출당 약 42배(서로 다른 시기·서비스 비교, ⚠️), 용량 10~40배(Micron B-21). NVIDIA의 "100배"는 컴퓨트 수요 전망 발언이다(DT-48).
> - "1M 토큰 세션의 KV는 328GB" 단정 → 모델 구조에 따라 0.89GB~516GB(DT-31).
> - "Copilot 에이전트 세션은 평균 66분 실행된다" → 벽시계 구간에 턴 사이 사용자 대기가 포함됨(DT-44).
> - "하이퍼스케일 EB의 87%가 HDD" → 원출처 미확인(DT-11).
> - "추론 DC가 학습 DC보다 GPU당 스토리지가 훨씬 많다" → 약 14.6TB(⚠️) vs 16TB로 같은 자릿수(6-B 유의).
> - "OpenAI dots는 1M 컨텍스트 GPT-6 Astra로 돈다" → 컨텍스트 길이 미확인(NG-08).

---

## 부록 A. 직접 열람한 1차 원문·원데이터 (✅ 근거)

| 원문 | 경로 | 확인 내용 |
|---|---|---|
| Anthropic Engineering "How we built our multi-agent research system" (2025-06-13) | https://www.anthropic.com/engineering/multi-agent-research-system | 4×·15× 토큰, 80% 분산, 200K 절단·Memory, 체크포인트·재개, 파일시스템 출력, 수백 턴 |
| Anthropic Engineering "Scaling Managed Agents" (2026-04-08) | https://www.anthropic.com/engineering/managed-agents | session = append-only 로그, emitEvent·wake·getSession, TTFT p50 −60%·p95 −90% |
| Anthropic Engineering 장기 실행 하네스 2건 (2025-11-26, 2026-03-24) | https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents ; …/harness-design-long-running-apps | 수 시간~수 일, progress 파일·git 커밋, 20분 $9 vs 6시간 $200, DAW 4시간 $124 |
| Anthropic 뉴스 (Claude 4, Sonnet 4.5, Opus 4.6) | https://www.anthropic.com/news/claude-4 ; …/claude-sonnet-4-5 ; …/claude-opus-4-6 | 수 시간·7시간, 30시간+, 1M 컨텍스트 베타 |
| Google Cloud 블로그 9건 | multi-tier checkpointing(2025-06-16), elastic training(2025-05-22), AI infra at Next26(2026-04-22), TPU 8t/8i deep dive(2026-04-22), Next26 wrap-up(2026-04-25), Agent Sandbox·Substrate(2026-05-20), agent cost(2026-07-30), Agent Substrate GA(2026-09-15), Pod snapshots(2026-09-21) | 체크포인트 주기·시간, Lustre 10TB/s·80PB, TPU 학습/추론 분화, KV 캐시 전용 스토리지·티어링, 샌드박스 성장·스냅샷·밀도 |
| Microsoft FY26 Q4 실적 콜 원문 (2026-07-29) | https://www.microsoft.com/en-us/investor/events/fy-2026/earnings-fy-2026-q4 | "CPUs are just as important as GPUs", Cobalt 200 25+ DC, Foundry 1조 토큰 고객 4배 |
| Azure Public Dataset | https://raw.githubusercontent.com/Azure/AzurePublicDataset/master/README.md ; AzureLLMInferenceDataset2023.md·2024.md ; GitHubCopilotCodingAgentDataset2026.md ; analysis/GitHubCopilotCodingAgents/{README,DATASET_CARD,schema.json} ; 원본 CSV(2023 conv·code, 2024 conv 1주 2,730만 행) ; 릴리스 `date.2026-06-06.tar.gz` | 채팅·코드 요청 토큰 분포, 에이전트 7일 합계·1일 분포 |
| Meta `llama-models` / DeepSeek-V3 | https://raw.githubusercontent.com/meta-llama/llama-models/main/models/sku_list.py ; https://raw.githubusercontent.com/deepseek-ai/DeepSeek-V3/main/inference/configs/config_671B.json ; …/inference/model.py | 레이어·KV 헤드·헤드 차원, MLA 캐시 구성·BF16 |
| DeepSpeed ZeRO 튜토리얼 | https://raw.githubusercontent.com/deepspeedai/DeepSpeed/master/docs/_tutorials/zero.md | 1.5B 모델 Adam 상태 18GB |
| LangGraph checkpoint README | https://raw.githubusercontent.com/langchain-ai/langgraph/main/libs/checkpoint/README.md | superstep마다 상태 저장, pending writes |
| Alibaba block-traces README | https://raw.githubusercontent.com/alibaba/block-traces/master/README.md | EBS 가상 디스크 1,000개·2020-01, 용도(OS·빅데이터·웹 서버) |

## 부록 B. 기존 레포 원장과의 접점

| 기존 | 본 원장의 보완 |
|---|---|
| WC X-03(Medium, "multi-hour agentic workflows", ⚠️ 2차 인용) | 장시간 에이전트의 규모를 **1차 원데이터**(Copilot 30만 세션, DT-41~DT-44)와 **1차 진술**(Anthropic DT-40·DT-49·DT-51, Google DT-53~DT-56)로 보강 |
| INF B-21(Micron 에이전트 용량 10~40배) | 토큰 축의 독립 수치: Anthropic 4×·15×(✅), Copilot vs Azure 대화 호출당 약 42배(⚠️ 파생) |
| INF B-20·v7 S-11(토큰당 약 300~350KB) | 설정 파일 원문으로 70B = 320KiB 재확인, 8B·405B·DeepSeek-V3 추가(DT-30) |
| HC A17(Azure 스토리지 33%) | 범용 클라우드의 다른 특성(쓰기 우세 블록 I/O DT-13, HDD 비중 DT-10·DT-12) 추가 |
| PC D14(체크포인트 쓰기 집약, 🟡) | Google 원문 체크포인트 주기·시간(DT-25·DT-26·DT-27), Llama 3 버스트(DT-20), SuperPOD 쓰기 가이드(DT-23) |
| MM IR-11(AI·비AI 인프라 병행) | Google "인프라 요구가 갈라졌다"(DT-35), Microsoft "에이전트에는 CPU도 GPU만큼 중요"(DT-59) |
