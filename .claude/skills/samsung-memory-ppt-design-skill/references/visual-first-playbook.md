# 시각 우선 덱 플레이북 (SKILL.md 11절 상세)

레퍼런스: "다운턴에서 배운 SSD 생존 전략" 3장 덱(2026-09-28, 사용자 확정).
생성기: k31001/action-learning `outputs/presentation/scripts/generate_ssd_survival_pptx.py`, 차트: `generate_ssd_survival_charts.py`, 부품 렌더: `scripts/render_parts/`.

---

## 1. 작업 순서

1. **Deck Read + 다이얼** 선언(기본 `4 / 7 / 6`).
2. **제목 문단 먼저**: 장 제목 N개를 이어 읽으면 한 문단이 되게 쓴다. 각 제목은 의미 단위 2줄.
3. **시각 매핑 표**: 장마다 "말하려는 것 → 그래프/도형/로고/이미지"를 표로 정한다. 글로 남는 것은 구획 제목·캡션·밴드뿐이다.
4. **근거 확인**: 모든 수치에 출처, 공개 근거가 없는 사내 요구는 `[사내 확인]`, 해석은 "복기" 라벨.
5. **자산 준비**: 로고(`assets/logos/`), 부품 이미지(사진 → 없으면 3D 렌더), 차트 PNG(그림 크기 = 배치 크기).
6. **생성 → 렌더 QA → 수정** 반복(`scripts/qa_render.sh`).
7. **기획서(outline.md)**: 제목 문단, 장별 시각 표, 표현상 주의, 근거 표, 이미지 자산 안내, 재생성 명령.

## 2. 레퍼런스 3장의 시각 매핑

### 1장 배경: 3패널 스토리 + 명제 밴드
| 구획 | 좌표(x, 폭) | 시각 |
|---|---|---|
| ① 교훈 | 0.79, 5.60 | 범례 줄("HBM 점유율" + Blue 막대 + 삼성 로고 + 그레이 막대 + SK하이닉스 로고) → 선 그래프(5.60 × 3.05, 다운턴 음영, 격차 양방향 화살표 "45%p") → "복기" 라벨 + 원인 체인 3상자 → 고객 로고(NVIDIA)가 달린 교훈 상자(Blue 테두리) |
| ② 다음 수요 | 6.80, 6.60 | 부품 이미지 체인(GPU HBM → 서버 DRAM → NVMe SSD, 쉐브론) → Blue 알약 "KV 캐시 오프로딩: ..." → 누적 막대(기존 그레이 + AI Blue, x축 아래 QLC 비중 줄) → 서버 이미지 + 두 줄 콜아웃 |
| ③ 새 요구 | 13.81, 5.40 | 로그 축 가로 막대(현 수준 그레이, 요구 범위 Blue, 30 이상 점선) → 빅넘버 "최대 100배" + 근거 한 줄 → SSD 이미지 + 두 줄 문장 |
| 밴드 | 9.60 | "명제" + 한 줄 |

### 2장 솔루션: 범위 체인 + 계층 격자
- 상단(2.34 ~ 5.20): 괄호 두 개(그레이 "지금까지: SSD 안에서 해결" / Blue "이제: 서버와 함께") → 부품 이미지 3개(NAND, SSD, 서버, 폭 3.9 박스에 맞춤) + 사이 화살표(마지막만 Blue) → 부품 이름 → "문제 → 해법" 줄 2개. 오른쪽 틴트 상자에 "높은 DWPD, 세 갈래" 선택지 3줄(고른 줄만 Blue).
- 하단(5.46 ~ 9.45): 단계 헤더 3개(번호 원 + 이름 + 연대, 마지막만 Blue) → 5계층 × 3단계 격자(층 이름 18pt 왼쪽, 칸 높이 0.48, 피치 0.56) → 지표 줄(WAF ≈3 / ≈3 / 3 → 1).
- 밴드: "결론" + 한 줄 + 알약 3개(다음 장의 세 축).

### 3장 실행: 지금 → 앞으로 3열 + 벤치마크
| 열 | 폭 | 벤치마크 줄 | 지금 | 앞으로 | 캡션 |
|---|---|---|---|---|---|
| ① 계약 | 5.55 | Micron 로고 ↔ Anthropic 로고 + 날짜 | 그레이 막대 "장기 물량 계약 (LTA)" + "수량과 가격만 약속합니다" | 적층 4단(다년 공급 그레이 / 공동 설계 Blue / 운영 통합 Blue 틴트 / 자본 연계 점선 "(선택)") + 오른쪽 괄호 "기술 협력" | 물량 위에 기술 협력을 쌓습니다 |
| ② 사람 | 6.90 | Palantir 심볼 + "Palantir FDE" + 채택 기업 | 삼성 로고 상자 ··· 문서 도형 ··· "고객" 상자 + "스펙 문서 · 간헐적 미팅: 명시된 요구만 오갑니다" | 삼성 줄(로고 + "제품 · 로드맵") → 아래 화살표 "사람" / 위 화살표 "실제 요구 → 제품" → 고객 경계(틴트, "고객 AI 데이터센터", 서버 이미지) 안 사람 아이콘(삼성 Pod Blue 3, 고객 엔지니어 그레이 2) + 양방향 "매일 함께" | 고객 안에서 실제 요구를 찾고, 수요를 함께 만듭니다 |
| ③ 역량 | 5.55 | "고객의 지표" + 토큰당 비용 · 전력 · GPU 가동률 | 층 × (지금 / 필요) 격자: 지금 = NAND·SSD FW "강점" 그레이, 커널 "일부" 연회색, KV 캐시 SW "기여 0"·AI DC 운영 빈 점선 / 필요 = 전부 Blue(위 두 층 진하게) | 근거 두 줄(KV 캐시 관리자 4종에 기여 0) | 시스템 SW와 AI 데이터센터 운영 역량 |
- 밴드: "시작" + 첫 과제 세 개.

## 3. 차트 코드 골격

```python
import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager
for fp in ("/usr/share/fonts/truetype/nanum/NanumGothic.ttf", "/usr/share/fonts/truetype/nanum/NanumGothicBold.ttf"):
    font_manager.fontManager.addfont(fp)
plt.rcParams["font.family"] = "NanumGothic"; plt.rcParams["axes.unicode_minus"] = False

fig = plt.figure(figsize=(5.60, 3.05))          # 슬라이드 배치 크기(인치) 그대로
ax = fig.add_axes([0.115, 0.15, 0.865, 0.82])
ax.plot(xs, ours, color="#1428A0", lw=4.2, marker="o")    # 자사 Blue
ax.plot(xs, comp, color="#8A8A8A", lw=3.2, marker="o")    # 경쟁 그레이
ax.text(x, y, "17%", fontsize=17, color="#1428A0", fontweight="bold")  # 직접 레이블
for s in ("top", "right", "left"): ax.spines[s].set_visible(False)
ax.yaxis.grid(True, color="#D9D9D9", lw=0.6); ax.tick_params(length=0, labelsize=16)
fig.savefig("chart.png", dpi=300, transparent=True)
```
- 슬라이드에는 `img(s, "chart.png", x, y, w=5.60)`로 **같은 폭**에 놓는다.
- 로그 축: `ax.set_xscale("log")`, 범위 막대는 `barh(y, hi - lo, left=lo)`.

## 4. 부품 렌더와 로고 (scripts/render_parts)

```bash
cd scripts/render_parts && npm i            # three, playwright-core, @iconify-json/logos, @iconify-json/simple-icons
node render.mjs <출력 폴더> objects          # nand, dram, hbm, ssd, server (투명 PNG)
node render.mjs <출력 폴더> logos            # logo_<이름>.png
```
- Chromium 경로는 `render.mjs`의 `executablePath`를 환경에 맞게 바꾼다(`--use-angle=swiftshader`로 GPU 없이 렌더).
- 렌더 후 알파 기준으로 여백을 잘라 `render_<이름>.png`로 저장한다(PIL `getbbox`).
- 새 부품이 필요하면 `render.html`의 `if (OBJ === '...')` 블록을 추가한다(상자·텍스처·PBR 재질, 자동 카메라 맞춤).

## 5. 자주 나온 수정 (QA에서 잡은 것)

| 증상 | 고침 |
|---|---|
| 제목 둘째 줄에 한 단어만 남음 | 의미 단위에서 `\n` 수동 줄바꿈 |
| 로고가 옆 라벨과 겹침 | 범례 줄을 "라벨 → 막대 → 로고" 순서로 폭 계산해 배치 |
| 차트 끝 레이블("1,000 EB")이 잘림 | 마지막 값은 `ha="right"`로 막대 오른쪽 끝에 맞춤 |
| 범위 막대 안 글자가 막대를 넘음 | 막대 안에는 값만("3~30"), 이름은 막대 왼쪽에 |
| 상단 문제 줄이 구분선을 침범 | 이미지 높이를 1.10 → 1.00으로 줄이고 줄 간격 0.42 |
| 괄호 두 개가 겹침 | 두 번째 괄호는 첫 괄호 끝 + 0.12에서 시작 |
| 순환 화살표 라벨이 경계선과 겹침 | 순환을 세로로 바꿔 라벨을 화살표 좌우에 둠 |
| 벤치마크 줄이 옆 열로 넘침 | 설명어를 빼고 로고 + 날짜만 |
| 출처 줄이 3줄 | 기관·연도만 남기고 세부는 노트로 |
| 신호 · 사례를 텍스트 카드로 나열(신뢰 부족) | **11.J 근거 사슬**: 항목마다 숫자를 찾아 막대 · 100% 막대 · 전후 막대로 그린다. 숫자가 없으면 노트로 |
| 개념 설명이 글 위주 | 블록 · 페이지 격자(예: 수명이 섞인 블록 → GC 복사 → WAF ≈ 3 / 수명별로 나뉜 블록 → 통째 삭제 → WAF ≈ 1)처럼 메커니즘을 도형으로 |

