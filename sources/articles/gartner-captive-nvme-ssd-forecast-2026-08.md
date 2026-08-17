# 가트너 Captive NVMe SSD 전망 — "5%(2023) → 30%+(2026)" 수치 팩트체크

**수집일**: 2026-08-17
**유형**: 웹 팩트체크 (사용자 브리프 [prompt-fdp-ssd.md](../prompt/prompt-fdp-ssd.md)의 "가트너: Captive SSD 5%→30%" 주장 검증)
**출처**: ScaleFlux 보도자료 (PR Newswire, 2025-08-11) — 원출처는 Chris Mellor, "Gartner Unveils Hottest Storage Trends for 2023", Blocks & Files, 2023-09-07
**URL**: https://www.prnewswire.com/news-releases/gartner-predicts-a-158b-shakeupscaleflux-says-the-ssd-revolution-has-begun-302525674.html

---

## 1. 원문 인용 (확인된 문장)

> "Gartner predicts that by 2026, over 30% of **on-premises storage** will rely on **captive NVMe SSDs** — up from less than 5% in 2023."

- 발행 주체는 ScaleFlux(컴퓨테이셔널 스토리지·SSD 컨트롤러 업체)로, "기성품 SSD → 워크로드 맞춤형 드라이브" 전환 논거로 이 수치를 인용
- ScaleFlux 보도자료의 각주가 밝힌 원출처: Blocks & Files 2023-09-07 (Gartner 스토리지 트렌드 2023 소개 기사)

## 2. 범위 해석 — 검증의 핵심

| 항목 | 내용 |
|---|---|
| 수치 실존 여부 | ✅ 실존 — "5% 미만(2023) → 30% 이상(2026)" |
| 측정 대상 | **온프레미스 스토리지**에서 captive NVMe SSD가 차지하는 비중 |
| "captive NVMe SSD"의 문맥 | 가트너 용례상 **스토리지 시스템 벤더가 자체 설계한 드라이브**(예: Pure Storage DirectFlash Module, IBM FlashCore Module 류)를 포함하는 개념 — 엔터프라이즈 어레이 시장 문맥 |
| 주의 | "**하이퍼스케일러가 서버 SSD 시장의 30%를 자체 개발 SSD로 대체**"라는 해석과는 **측정 대상이 다름**. 하이퍼스케일러 캡티브(자체 개발) SSD 비중의 공식 통계는 여전히 미공개 — 기존 저장소 조사 결론([ssd-fdp-proposal.md](../../outputs/storyline/ssd-fdp-proposal.md) §5.1 "캡티브 비중의 공식 통계는 공개되어 있지 않지만")과 일치 |

## 3. 같은 보도자료의 기타 수치 (혼동 방지)

- **$158B**: 가트너 수치가 아니라 Global Market Insights의 **SSD 컨트롤러 시장** 전망 — "$32B(2024) → $158B+(2034)"
- ScaleFlux는 두 수치를 묶어 "SSD 혁명(맞춤형 드라이브 전환)" 서사로 구성 — 벤더 마케팅 문맥임을 감안해 인용 시 분리 필요

## 4. 보고서 인용 가이드

1. 가트너 수치를 쓸 경우: "온프레미스 스토리지의 captive NVMe SSD 비중" 범위를 명시하고, **방향성 근거**(맞춤형·자체 설계 드라이브로의 구조 전환)로 사용
2. "하이퍼스케일러 캡티브 SSD 확대"의 근거로는 **정황 지표**를 사용 권장: NAND 웨이퍼 직구매 다년 계약 확산(계약가 월 +60%, Q1'25 대비 +246%), AWS Nitro SSD(2021-12), Google Titanium SSD — [captive-ssd-fdp-context-2026-08.md](captive-ssd-fdp-context-2026-08.md), [google-captive-titanium-fdp-factcheck-2026-08.md](google-captive-titanium-fdp-factcheck-2026-08.md)
3. 하이퍼스케일러가 enterprise SSD **구매**의 ~55%를 차지한다는 수치(SupplyICs)와 혼동 금지 — 구매 지배력과 자체 개발 비중은 다른 지표
