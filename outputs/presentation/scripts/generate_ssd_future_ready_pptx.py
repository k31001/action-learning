"""불확실성이 높은 미래에 대응하기 위한 고객 협력 전략: 4장 덱 (2026-10-06 v1.4).

제목 4개를 이어 읽으면 한 문단이 된다(아웃라인 v0.3):
  1 배경   SSD의 다음 수요는 하나로 정해지지 않으며, 데이터센터 응용마다 SSD에 요구하는 특성이 다릅니다
  2 핵심 기술 제품 포트폴리오를 받치는 핵심 기술은 여섯 가지이며, 그중 Mixed Media와 FDP는 고객과 함께 설계해야 완성됩니다
  3 당위성 해법의 범위는 NAND에서 SSD로 넓어져 왔고, 새로 나타난 과제는 고객 시스템까지 넓어져야 풀립니다
  4 실행   고객 시스템 안으로 들어가는 새로운 방식이 필요하므로, 전략 고객과 계약 · 사람 · 역량으로 함께 설계합니다
  결론     실패할 수도 있는 기술에 투자하는 것이, 불확실한 미래에 실패하지 않는 불변 전략입니다

규율: samsung-memory-ppt-design-skill v2.1(11절 시각 우선, 11.J 근거 사슬: 주장마다 데이터 그래프). 본문 18pt 이상 · 출처 15pt · em-dash 금지 · 액센트 Samsung Blue 하나.
도형 · 차트는 모두 python-pptx 도형으로 그린다(차트 pt = 슬라이드 pt). 부품 이미지는 assets/photos가 있으면 사진, 없으면 3D 렌더.
원고 · 근거: outputs/presentation/ssd-future-ready-strategy-outline.md, outputs/report/ssd-future-ready-strategy-report.md (v1.5).
"""
import math
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
sys.path.insert(0, os.path.join(ROOT, ".claude", "skills", "samsung-memory-ppt-design-skill", "scripts"))

from deck_helpers import (BLUE, BLUE_T1, BLUE_T2, CW, GRAY, GRAY_2, INK, LINE, MX, PALE, RIGHT, TINT,  # noqa: E402
                          WHITE, Deck)
from pptx.enum.shapes import MSO_SHAPE  # noqa: E402
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN  # noqa: E402

ASSETS = os.path.join(HERE, "..", "assets")
OUT = os.environ.get("OUT_PATH") or os.path.join(HERE, "..", "ssd-future-ready-strategy.pptx")

d = Deck("불확실성이 높은 미래에 대응하기 위한 고객 협력 전략", total=4,
         logos_dir=os.path.join(ASSETS, "logos"), photos_dir=os.path.join(ASSETS, "photos"),
         renders_dir=os.path.join(ASSETS, "survival"))
tb, rect, label_box = d.tb, d.rect, d.label_box
L, C, R = PP_ALIGN.LEFT, PP_ALIGN.CENTER, PP_ALIGN.RIGHT
MID = MSO_ANCHOR.MIDDLE
RR = MSO_SHAPE.ROUNDED_RECTANGLE


def chip(s, x, y, w, h, text, fill=BLUE, color=WHITE, size=20, line=None, dash=False):
    label_box(s, x, y, w, h, [(text, size, True, color)], fill=fill, line=line, dash=dash)


# =============================================================== 1 배경
s = d.slide(1, "배경", "SSD의 다음 수요는 하나로 정해지지 않으며,\n데이터센터 응용마다 SSD에 요구하는 특성이 다릅니다")

# 격자: 왼쪽 열(교훈 · 제품군 이름) + 응용 4열(카드 · 매트릭스 칸). 같은 열은 위아래로 이어 읽는다
LX, LW = MX, 3.70
DG = 0.16
DW = (CW - LW - 0.22 - 3 * DG) / 4
DXS = [MX + LW + 0.22 + i * (DW + DG) for i in range(4)]
MT, RH, RG = 6.62, 0.62, 0.07
CT, CB = 2.32, MT - 0.50
VT = CT + 0.92

# ---- 왼쪽 위: HBM의 교훈 (점유율 슬로프)
rect(s, LX, CT, LW, CB - CT, fill=PALE, shape=RR)
tb(s, LX + 0.22, CT + 0.12, LW - 0.44, 0.38, [("HBM의 교훈", 20, True, BLUE)], anchor=MID)
tb(s, LX + 0.22, CT + 0.52, LW - 0.44, 0.80, [("하나의 수요를 늦게 읽으면", 18, True, INK), ("첫 호황을 놓칩니다", 18, True, INK)], spacing=1.05)
ST = CT + 1.62
sx0, sx1 = LX + 0.86, LX + 1.86


def sy(v):
    return ST + (68 - v) / 55 * 1.25


for (a0, a1, col, lg) in [(50, 62, GRAY_2, "sk-hynix"), (40, 17, BLUE, "samsung")]:
    ln = s.shapes.add_connector(1, *(int(v * 914400) for v in (sx0, sy(a0), sx1, sy(a1))))
    ln.line.color.rgb = col
    ln.line.width = 38100
    rect(s, sx0 - 0.07, sy(a0) - 0.07, 0.14, 0.14, fill=col, shape=MSO_SHAPE.OVAL)
    rect(s, sx1 - 0.07, sy(a1) - 0.07, 0.14, 0.14, fill=col, shape=MSO_SHAPE.OVAL)
    tb(s, sx0 - 0.70, sy(a0) - 0.17 + (-0.12 if a0 == 50 else 0.12), 0.58, 0.34, [(f"{a0}%", 16, False, GRAY)], align=R, anchor=MID)
    tb(s, sx1 + 0.12, sy(a1) - 0.17, 0.66, 0.34, [(f"{a1}%", 18, True, col)], anchor=MID)
    d.fit(s, d.logo(lg), sx1 + 0.80, sy(a1) - 0.13, 0.86, 0.26, align="left")
tb(s, sx0 - 0.45, ST + 1.36, 0.9, 0.28, [("2022", 16, False, GRAY)], align=C)
tb(s, sx1 - 0.45, ST + 1.36, 0.9, 0.28, [("2Q25", 16, False, GRAY)], align=C)
tb(s, LX + 0.22, CB - 0.36, LW - 0.44, 0.30, [("HBM 점유율", 16, False, GRAY)], align=C)

# ---- 응용 카드 4장: 이름 · 하는 일 · 데이터 그래프 · SSD 요구
APPS = [("범용 클라우드", "VM · DB · 웹 (멀티테넌트)", "QoS · 테넌트 격리"),
        ("AI 학습", "데이터 로딩 · 체크포인트", "대역 · 쓰기 피크"),
        ("AI 추론", "KV 캐시 오프로드", "쓰기 내구 (DWPD)"),
        ("에이전트", "", "용량 · TB당 비용")]
for i, (nm, wl, rq) in enumerate(APPS):
    x = DXS[i]
    rect(s, x, CT, DW, CB - CT, fill=WHITE, line=LINE, lw=0.75, shape=RR)
    tb(s, x + 0.20, CT + 0.10, DW - 0.40, 0.42, [(nm, 22, True, INK)], anchor=MID)
    tb(s, x + 0.20, CT + 0.52, DW - 0.40, 0.30, [(wl, 16, False, GRAY)])
    rect(s, x + 0.20, CB - 0.58, DW - 0.40, 0.012, fill=LINE)
    tb(s, x + 0.20, CB - 0.52, DW - 0.40, 0.42, [(rq, 20, True, BLUE)], anchor=MID)
d.fit(s, d.logo("nvidia"), DXS[1] + DW - 1.35, CT + 0.16, 1.15, 0.28)
x = DXS[3]
d.fit(s, d.logo("meta"), x + 0.20, CT + 0.55, 0.80, 0.24, align="left")
tb(s, x + 1.04, CT + 0.52, 0.70, 0.30, [("Muse", 16, True, INK)])
d.fit(s, d.logo("openai"), x + 1.80, CT + 0.56, 0.80, 0.22, align="left")
tb(s, x + 2.64, CT + 0.52, 0.60, 0.30, [("Dot", 16, True, INK)])

# ① 범용 클라우드: 클라우드 안 VM 여러 개가 SSD 하나를 나눠 쓴다 + 실측 DWPD + 격리 효과(p99)
x = DXS[0]
rect(s, x + 0.04, VT - 0.06, 1.94, 1.00, fill=None, line=GRAY_2, lw=1.25, shape=MSO_SHAPE.CLOUD)
TEN = [GRAY_2, BLUE_T2, GRAY_2, BLUE_T1, GRAY_2, BLUE_T2]
for k, col in enumerate(TEN):
    rect(s, x + 0.47 + (k % 3) * 0.38, VT + 0.20 + (k // 3) * 0.26, 0.32, 0.20, fill=col)
for k in range(3):
    rect(s, x + 0.62 + k * 0.38, VT + 0.70, 0.014, 0.24, fill=GRAY_2)
rect(s, x + 0.40, VT + 0.94, 1.24, 0.24, fill=INK)
tb(s, x + 0.40, VT + 0.94, 1.24, 0.24, [("SSD", 15, True, WHITE)], align=C, anchor=MID)
# 실측 DWPD 대 범용 TLC 정격 (세로 막대)
tb(s, x + 2.14, VT - 0.06, 1.20, 0.28, [("DWPD", 15, False, GRAY)], align=C)
BBt, BHm = VT + 0.94, 0.66
for k, (v, col, nm, lab) in enumerate([(0.23, BLUE, "실측", "0.2"), (1.0, GRAY_2, "정격", "1")]):
    bx = x + 2.26 + k * 0.52
    rect(s, bx, BBt - BHm * v, 0.30, BHm * v, fill=col)
    if k == 0:
        tb(s, bx - 0.15, BBt - BHm * v - 0.28, 0.60, 0.26, [(lab, 16, True, BLUE)], align=C)
    else:
        tb(s, bx + 0.30, BBt - BHm * v - 0.04, 0.40, 0.26, [(lab, 16, True, INK)])
    tb(s, bx - 0.15, BBt + 0.02, 0.60, 0.26, [(nm, 15, False, GRAY)], align=C)
# 공유 SSD의 p99 지연: 섞어 쓰기 대 하드웨어 격리 (Microsoft 워크로드)
tb(s, x + 0.20, VT + 1.30, DW - 0.40, 0.26, [("공유 SSD의 p99 지연 (상대값)", 15, False, GRAY)])
for k, (nm, v, col, lab) in enumerate([("섞어 쓰면", 3.1, GRAY_2, "최대 3.1"), ("격리하면", 1.0, BLUE, "1")]):
    yy = VT + 1.58 + k * 0.30
    tb(s, x + 0.20, yy, 0.96, 0.26, [(nm, 15, k == 1, BLUE if k else INK)], anchor=MID)
    w = (DW - 2.30) * v / 3.1
    rect(s, x + 1.16, yy + 0.04, w, 0.18, fill=col)
    tb(s, x + 1.22 + w, yy, 0.90, 0.26, [(lab, 15, True, BLUE if k else INK)], anchor=MID)

# ② AI 학습: GPU당 스토리지 대역 (NVIDIA 가이드) + 체크포인트
x = DXS[1]
BBt, BHm = VT + 1.40, 1.05
for g, (gn, rv, wv, rc, wc) in enumerate([("기본", 0.16, 0.08, GRAY_2, LINE), ("멀티모달", 0.49, 0.24, BLUE, BLUE_T2)]):
    gx = x + 0.30 + g * 1.02
    for k, (v, col) in enumerate([(rv, rc), (wv, wc)]):
        h = BHm * v / 0.49
        rect(s, gx + k * 0.40, BBt - h, 0.34, h, fill=col)
        tb(s, gx + k * 0.40 - 0.18, BBt - h - 0.30, 0.70, 0.28, [(f"{v:.2f}", 15, True, BLUE if g else INK)], align=C)
    tb(s, gx - 0.15, BBt + 0.04, 1.04, 0.30, [(gn, 16, False, GRAY)], align=C)
tb(s, x + 0.20, BBt + 0.38, DW - 0.40, 0.30, [[("■", 15, False, BLUE), (" 읽기  ", 15, False, GRAY), ("■", 15, False, BLUE_T2), (" 쓰기  GB/s, GPU당", 15, False, GRAY)]])
tb(s, x + 2.36, VT + 0.30, DW - 2.46, 0.56, [("5.7TB", 26, True, BLUE)], anchor=MID)
tb(s, x + 2.36, VT + 0.86, DW - 2.46, 0.60, [("체크포인트", 16, False, GRAY), ("1회 (405B)", 16, False, GRAY)], spacing=1.0)

# ③ AI 추론: DWPD (로그 축)
x = DXS[2]
LBW = 1.20
ax0, ax1 = x + 0.20 + LBW, x + DW - 0.95
lo_, hi_ = math.log10(0.3), math.log10(150)


def xd(v):
    return ax0 + (math.log10(v) - lo_) / (hi_ - lo_) * (ax1 - ax0)


tb(s, x + 0.20, VT - 0.02, DW - 0.40, 0.30, [("DWPD (로그 축)", 15, False, GRAY)])
for g in (1, 10, 100):
    rect(s, xd(g) - 0.005, VT + 0.34, 0.01, 1.40, fill=LINE)
    tb(s, xd(g) - 0.3, VT + 1.76, 0.6, 0.28, [(str(g), 15, False, GRAY)], align=C)
for k, (nm, v, vmin, col, lab) in enumerate([("QLC 정격", 0.6, None, GRAY_2, "0.6"), ("KV 실측", 3.2, None, GRAY, "3.2"),
                                              ("AI 전용", 120, 50, BLUE, "50~120")]):
    yy = VT + 0.38 + k * 0.46
    tb(s, x + 0.20, yy, LBW - 0.06, 0.36, [(nm, 17, k == 2, BLUE if k == 2 else INK)], anchor=MID)
    rect(s, ax0, yy + 0.05, xd(v) - ax0, 0.26, fill=col)
    if vmin:
        rect(s, xd(vmin) - 0.015, yy, 0.03, 0.36, fill=WHITE)
    tb(s, xd(v) + 0.06, yy, 0.90, 0.36, [(lab, 17, True, BLUE if k == 2 else INK)], anchor=MID)

# ④ 에이전트: 사용자별 VM, 대부분 휴면 + VM 1개의 자원(관측) → 사용자 수만큼 용량
x = DXS[3]
NC, NR, TW, TH = 12, 3, 0.20, 0.16
ACT = {(0, 3), (1, 8), (2, 1)}
for r in range(NR):
    for c in range(NC):
        rect(s, x + 0.22 + c * (TW + 0.055), VT + 0.02 + r * (TH + 0.06), TW, TH, fill=BLUE if (r, c) in ACT else LINE)
tb(s, x + 0.20, VT + 0.66, DW - 0.40, 0.30, [[("■", 15, False, BLUE), (" 활성  ", 15, False, GRAY), ("■", 15, False, LINE), (" 휴면 (대부분)", 15, False, GRAY)]])
tb(s, x + 0.20, VT + 1.02, DW - 0.40, 0.26, [("사용자 VM 1개 (Muse 관측)", 15, False, GRAY)])
for k, (nm, v, col, lab) in enumerate([("메모리", 7.75, GRAY_2, "7.75GB"), ("디스크", 100, BLUE, "100GB")]):
    yy = VT + 1.30 + k * 0.30
    tb(s, x + 0.20, yy, 0.80, 0.26, [(nm, 15, k == 1, BLUE if k else INK)], anchor=MID)
    w = max(0.08, (DW - 2.10) * v / 100)
    rect(s, x + 1.00, yy + 0.04, w, 0.18, fill=col)
    tb(s, x + 1.06 + w, yy, 0.90, 0.26, [(lab, 15, True, BLUE if k else INK)], anchor=MID)
tb(s, x + 0.20, VT + 1.92, DW - 0.40, 0.28, [[("× 1억 명 = ", 15, False, GRAY), ("10EB", 16, True, BLUE), ("  (할당 기준)", 15, False, GRAY)]])

# ---- 매트릭스 머리줄
tb(s, LX, MT - 0.36, LW + 6, 0.32, [[("SSD 제품군  ", 18, True, INK), ("요구 DWPD 순 (로그 축) · 최대 용량", 16, False, GRAY)]], anchor=MID)
tb(s, RIGHT - 6.0, MT - 0.36, 6.0, 0.32, [[("■", 16, False, BLUE), (" 지금 쓰는 곳   ", 16, False, GRAY), ("▢", 16, False, BLUE), (" 신호에 따라 쓰일 곳", 16, False, GRAY)]], align=R, anchor=MID)

# ---- 매트릭스: 제품군(행) × 응용(열)
CLS = [("SLC급", "≤ 3.2TB", 30, 120, "30~120"),
       ("고내구 TLC", "≤ 12.8TB", None, 3, "3"),
       ("고성능 · 범용 TLC", "≤ 15.36TB", None, 1, "1"),
       ("고용량 QLC", "≤ 245TB", 0.3, 0.6, "0.3~0.6")]
DL, DH = math.log10(0.1), math.log10(150)
BX0, BXW = LX + 0.22, LW - 1.30


def xb(v):
    return BX0 + (math.log10(v) - DL) / (DH - DL) * BXW


# 칸: (행, 열) → (문구, 지금=True / 신호=False)
CELL = {(2, 0): ("VM · DB 블록", True), (3, 0): ("객체 · 콜드 데이터", True),
        (2, 1): ("데이터 로딩", True), (1, 1): ("체크포인트", False), (3, 1): ("데이터셋", True),
        (0, 2): ("초고DWPD KV", False), (1, 2): ("KV 쓰기 많을 때", True), (2, 2): ("KV 계층 (CMX)", True), (3, 2): ("읽기 위주 KV", False),
        (3, 3): ("사용자 VM 디스크 · 상태", True), (2, 3): ("기동 버스트", False)}
for r, (nm, cap, vmin, v, lab) in enumerate(CLS):
    y = MT + r * (RH + RG)
    rect(s, LX, y, LW, RH, fill=PALE, shape=RR)
    tb(s, LX + 0.22, y + 0.02, LW - 1.30, 0.34, [(nm, 18, True, INK)], anchor=MID)
    tb(s, LX + LW - 1.30, y + 0.02, 1.14, 0.34, [(cap, 15, False, GRAY)], align=R, anchor=MID)
    rect(s, BX0, y + 0.42, xb(v) - BX0, 0.16, fill=BLUE if r == 0 else (BLUE_T1 if r == 1 else GRAY_2))
    if vmin:
        rect(s, xb(vmin) - 0.015, y + 0.39, 0.03, 0.22, fill=PALE)
    tb(s, xb(v) + 0.06, y + 0.33, 1.0, 0.32, [(lab, 16, True, INK)], anchor=MID)
    for c in range(4):
        x = DXS[c]
        if (r, c) not in CELL:
            rect(s, x, y, DW, RH, fill=None, line=LINE, lw=0.75, shape=RR)
            continue
        txt, now = CELL[(r, c)]
        if now:
            label_box(s, x, y, DW, RH, [(txt, 18, True, WHITE)], fill=BLUE)
        else:
            label_box(s, x, y, DW, RH, [(txt, 18, True, BLUE)], fill=WHITE, line=BLUE, lw=1.25, dash=True)

d.band(s, 9.44, 0.80, "결론", "다양한 데이터센터 응용에 대응하려면, SLC부터 QLC까지 다양한 제품 포트폴리오가 필요합니다")
d.footer(s, "출처: HBM 과제팀 집계 · 범용 Microsoft SSD 50만 대(파생) · FlashBlox(FAST'17) · 학습 NVIDIA SuperPOD 가이드(GPU당) · 체크포인트 산술 · 추론 StorageReview(2026-08) · "
            "Kioxia · DapuStor · 에이전트 Google Agent Substrate · Muse 관측(제3자, 산술) · 제품 사양 Kioxia FL6 · LC9, Solidigm PS1010 · PS1030")
d.notes(s, "1장입니다. HBM에서 삼성 점유율은 2022년 40퍼센트에서 2025년 2분기 17퍼센트로, SK하이닉스는 50에서 62퍼센트로 갈렸습니다. 하나의 수요를 늦게 읽으면 첫 호황을 놓친다는 교훈입니다. "
        "그래서 SSD의 다음 수요를 하나로 단정하지 않고, 하이퍼스케일러의 데이터센터 응용 네 가지를 SSD에 요구하는 특성으로 비교했습니다. "
        "첫째, 범용 클라우드입니다. 여러 고객의 VM이 서버의 SSD를 나눠 씁니다. Microsoft의 SSD 50만 대를 보면 실제 쓰기는 0.07에서 0.23 DWPD로 범용 TLC 정격 1 DWPD 안에 들어옵니다. 기존 SSD 기술로 대응할 수 있습니다. "
        "다만 한 고객의 쓰기가 같은 SSD를 쓰는 다른 고객의 지연을 키웁니다. Microsoft 워크로드 실험에서 하드웨어로 격리하면 p99 지연이 최대 3.1배 줄었습니다. 멀티테넌트 QoS와 격리는 여전히 중요한 요구입니다. "
        "둘째, AI 학습입니다. NVIDIA SuperPOD 가이드를 GPU당으로 환산하면, 데이터가 캐시보다 큰 멀티모달 학습은 기본 등급보다 약 3배의 스토리지 대역을 요구합니다. 데이터 로딩에는 고성능 TLC가 맞습니다. "
        "405B 모델은 체크포인트 한 번에 약 5.7테라바이트를 쓰고, 다 쓸 때까지 학습이 멈춥니다. 체크포인트 간격이 짧아지면 고내구 TLC가 필요할 수 있어 점선으로 두었습니다. "
        "셋째, AI 추론의 KV 캐시 오프로드입니다. KV 캐시 계층을 실측하면 드라이브당 3.2 DWPD로 QLC 정격 0.6을 크게 넘고, AI 전용 SSD는 50에서 120 DWPD로 나왔습니다. 반대로 읽기 위주라는 측정도 있습니다. "
        "그래서 같은 KV 캐시라도 쓰기량에 따라 SLC급, 고내구 TLC, 고성능 TLC로 갈리고, 읽기 위주라면 QLC도 후보입니다. 고내구라는 요구에도 필요한 DWPD에 따라 SLC부터 QLC까지 여러 답이 있다는 뜻입니다. "
        "넷째, Meta Muse와 OpenAI Dot 같은 에이전트입니다. 사실을 다시 확인해 보니 이 서비스들은 사용자마다 VM을 하나씩 주는 구조이고, 에이전트는 대부분의 시간을 휴면 상태로 보냅니다. 휴면 상태는 압축 스냅샷으로 오브젝트 스토리지에 보관됩니다. "
        "제3자가 Muse VM을 관측한 결과 메모리 7.75기가바이트에 디스크 100기가바이트로, 디스크가 13배 큽니다. 사용자 1억 명이면 할당 기준 10엑사바이트입니다. 그래서 에이전트 VM 자체에는 고DWPD보다 고용량 QLC가 맞습니다. "
        "다만 실제 사용량은 아직 할당보다 훨씬 작고, 에이전트 VM 디스크의 쓰기량을 공개한 측정은 없습니다. 에이전트가 키우는 고DWPD 수요는 VM이 아니라 추론의 KV 캐시 계층에서 나옵니다. 에이전트가 한꺼번에 깨어날 때 디스크 경합이 생긴다는 Google의 설명이 있어, 고성능 TLC는 점선으로 두었습니다. "
        "아래 표는 이것을 제품군으로 정리한 것입니다. 위에서 아래로 요구 DWPD는 낮아지고 최대 용량은 커집니다. 파란 칸은 지금 쓰는 곳, 점선 칸은 신호에 따라 쓰일 곳입니다. 응용마다 필요한 제품군의 조합이 다르고, 하나의 제품으로 모든 응용에 대응할 수 없습니다. "
        "그래서 다양한 데이터센터 응용에 대응하려면 SLC부터 QLC까지 다양한 제품 포트폴리오가 필요합니다. 다만 지금 예측할 수 있는 범위 안의 준비입니다.")

# =============================================================== 2 솔루션
s = d.slide(2, "핵심 기술", "제품 포트폴리오를 받치는 핵심 기술은 여섯 가지이며,\n그중 Mixed Media와 FDP는 고객과 함께 설계해야 완성됩니다")

# 열: 핵심 기술 | 왜 필요한가(데이터) | 적합한 제품군 4열 | 고객 협력 강도(0~8)
X1, W1 = MX, 4.10
X2, W2 = X1 + W1 + 0.20, 3.30
X3, PW = X2 + W2 + 0.20, 0.95
X4 = X3 + 4 * PW + 0.20
W4 = RIGHT - X4
BX0, BMAX = X4 + 0.12, 3.00
RH2, RG2 = 0.78, 0.07

# ---- 머리줄
HY2 = 2.30
tb(s, X1, HY2, W1, 0.34, [("핵심 기술", 18, True, INK)], anchor=MID)
tb(s, X2, HY2, W2, 0.34, [("왜 필요한가 (데이터)", 18, True, INK)], anchor=MID)
tb(s, X3, HY2, 4 * PW, 0.34, [("적합한 제품군", 18, True, INK)], align=C, anchor=MID)
for k, (l1, l2) in enumerate([("SLC급", ""), ("고내구", "TLC"), ("고성능", "TLC"), ("고용량", "QLC")]):
    tb(s, X3 + k * PW, HY2 + 0.36, PW, 0.48, [(l1, 15, False, GRAY)] + ([(l2, 15, False, GRAY)] if l2 else []), align=C, spacing=1.0)
tb(s, X4, HY2, W4, 0.34, [("고객 협력 강도 (0~8)", 18, True, INK)], anchor=MID)
tb(s, X4, HY2 + 0.36, W4, 0.48, [("고객만 아는 정보 · 고객 SW 변경 · 표준 공백 ·", 15, False, GRAY), ("고객 환경 검증, 기준마다 0~2점", 15, False, GRAY)], spacing=1.0)


def two_bars(x, y, cap, items, vmax, log=False, hot=False):
    """캡션 1줄 + 막대 2개. items = [(라벨, 값, 표기, 강조)]"""
    tb(s, x, y + 0.02, W2, 0.24, [(cap, 15, False, GRAY)], anchor=MID)
    for k, (lab, v, txt, em) in enumerate(items):
        yy = y + 0.28 + k * 0.24
        tb(s, x, yy, 1.02, 0.22, [(lab, 15, em, (BLUE if hot else INK) if em else GRAY)], anchor=MID)
        f = (math.log10(v) + 0.3) / (math.log10(vmax) + 0.3) if log else v / vmax
        w = max(0.06, 1.45 * f)
        rect(s, x + 1.04, yy + 0.03, w, 0.16, fill=(BLUE if hot else GRAY) if em else GRAY_2)
        tb(s, x + 1.10 + w, yy, 0.90, 0.22, [(txt, 15, True, (BLUE if hot else INK) if em else GRAY)], anchor=MID)


def fit_dot(x, y, kind):
    dd = 0.30
    if kind == "full":
        rect(s, x - dd / 2, y - dd / 2, dd, dd, fill=BLUE_T1, shape=MSO_SHAPE.OVAL)
    elif kind == "half":
        rect(s, x - dd / 2, y - dd / 2, dd, dd, fill=WHITE, line=BLUE_T1, lw=2.0, shape=MSO_SHAPE.OVAL)


TECH = [
    ("Fault Tolerant", "다이 · 플레인 단위 고장 격리",
     ("같은 폼팩터의 다이 수", [("245TB", 1024, "1,024", False), ("512TB", 2133, "약 2,133", True)], 2133, False),
     [None, None, "half", "full"], 1, "SSD 안에서", "고장 정보는 SSD가 안다. 격리 · 패리티는 SSD 안에서"),
    ("Large Mapping", "FTL 매핑 단위 4KB → 8~64KB",
     ("245TB의 매핑 DRAM (산술)", [("4KB 매핑", 245, "245GB", False), ("64KB 매핑", 15, "15GB", True)], 245, False),
     [None, None, None, "full"], 4, "가이드", "호스트 쓰기를 IU에 맞추도록 안내 (작은 쓰기 최대 16배)"),
    ("Multi-Tenant QoS", "네임스페이스 QoS 격리",
     ("이웃 테넌트의 쓰기가 키운 WAF", [("혼자", 1.28, "1.28", False), ("이웃 쓰기", 3.0, "3.0", True)], 3.0, False),
     [None, "half", "full", "full"], 3, "요구 사양", "고객 SLO를 받고, 격리는 NVM Set · 네임스페이스로"),
    ("Confidential Storage", "RoT · 암호화 · 증명, 에이전트 기밀 VM",
     None,
     [None, None, "full", "full"], 3, "표준", "Caliptra · SPDM · TDISP · L.O.C.K. 표준으로 연동"),
    ("Mixed Media", "pSLC + QLC 네임스페이스 분리",
     ("4KB 랜덤 쓰기 WAF (로그)", [("그대로", 70, "70+", False), ("모아서", 1.02, "1.02", True)], 70, True),
     [None, None, None, "full"], 8, "필수", "작은 쓰기는 고객 SW만 알고, 고객 SW가 pSLC로 보내야 효과"),
    ("FDP", "RUH · RG 배치 정책 최적화",
     ("WAF, 사용률 100% (CacheLib)", [("SSD 혼자", 3.22, "3.22", False), ("수명 표시", 1.03, "1.03", True)], 3.22, False),
     ["full", "full", "half", "full"], 7, "필수", "데이터 수명은 고객 SW만 알고, 앱이 RUH를 표시해야 효과"),
]

# ---- 묶음 머리 + 행 위치
GH1 = 3.12
tb(s, X1 + 0.10, GH1, 12.0, 0.32, [[("SSD 안에서 · 표준과 요구 사양으로  ", 17, True, GRAY), ("지금처럼 잘 준비합니다", 17, True, INK)]], anchor=MID)
ROWY = [GH1 + 0.38 + k * (RH2 + RG2) for k in range(4)]
BT = ROWY[3] + RH2 + 0.14
rect(s, MX - 0.06, BT, CW + 0.12, 0.40 + 2 * RH2 + RG2 + 0.16, fill=TINT, line=BLUE, lw=1.5, shape=RR)
tb(s, X1 + 0.10, BT + 0.04, 12.0, 0.32, [[("고객 시스템과 함께  ", 17, True, BLUE), ("고객 SW가 바뀌어야 제품이 완성됩니다", 17, True, INK)]], anchor=MID)
ROWY += [BT + 0.40 + k * (RH2 + RG2) for k in range(2)]

# 범례: 제품군 적합도 · 협력 강도 구간
tb(s, BX0, GH1, W4 - 0.2, 0.32, [[("■", 15, False, GRAY_2), (" 0~5 지금 방식으로 협력   ", 15, False, GRAY), ("■", 15, False, BLUE), (" 6 이상 공동 설계 필수", 15, True, BLUE)]], anchor=MID)
tb(s, X3, GH1, 4 * PW, 0.32, [[("●", 15, False, BLUE_T1), (" 핵심  ", 15, False, GRAY), ("○", 15, True, BLUE_T1), (" 해당", 15, False, GRAY)]], align=C, anchor=MID)

for i, (nm, sub, dat, fit, sc, verdict, why) in enumerate(TECH):
    y = ROWY[i]
    hot = i >= 4
    rect(s, MX, y, CW, RH2, fill=WHITE if hot else PALE, shape=RR)
    tb(s, X1 + 0.18, y + 0.06, W1 - 0.30, 0.36, [(nm, 20, True, BLUE if hot else INK)], anchor=MID)
    tb(s, X1 + 0.18, y + 0.42, W1 - 0.30, 0.30, [(sub, 15, False, GRAY)], anchor=MID)
    if dat:
        two_bars(X2, y, dat[0], dat[1], dat[2], log=dat[3], hot=hot)
    else:   # 표준 사슬: RoT → 증명 → 기밀 VM 연결
        tb(s, X2, y + 0.02, W2, 0.24, [("기밀 VM까지 이어지는 표준", 15, False, GRAY)], anchor=MID)
        for k, t in enumerate(["Caliptra", "SPDM", "TDISP"]):
            cx = X2 + k * 1.10
            label_box(s, cx, y + 0.32, 0.92, 0.36, [(t, 15, True, INK)], fill=WHITE, line=GRAY_2)
            if k < 2:
                d.arrow_r(s, cx + 0.94, y + 0.44, 0.14, 0.12)
    for k, kind in enumerate(fit):
        fit_dot(X3 + k * PW + PW / 2, y + RH2 / 2, kind)
    rect(s, BX0, y + 0.10, BMAX * sc / 8, 0.24, fill=BLUE if hot else GRAY_2)
    tb(s, BX0 + BMAX * sc / 8 + 0.10, y + 0.04, 2.6, 0.36, [[(str(sc), 20, True, BLUE if hot else INK), ("  " + verdict, 16, True, BLUE if hot else GRAY)]], anchor=MID)
    tb(s, BX0, y + 0.42, W4 - 0.20, 0.30, [(why, 15, False, INK if hot else GRAY)], anchor=MID)

d.band(s, 9.40, 0.80, "결론", "핵심 기술을 제대로 확보해 다가올 시대에 대비하려면, 고객과의 협력이 필수입니다")
d.footer(s, "출처: 다이 수 · 매핑 DRAM 산술(1Tb 다이, 엔트리 4B) · IU 16배 하한(CSAL EuroSys'24) · WAF 1.28 → 3.0(WARP FAST'26) · Caliptra 2.0 · OCP L.O.C.K.(Google · Microsoft 채택 확정) · "
            "TDISP(Linux) · WAF 70+ → 1.02(CSAL 백서, 별도 캐시 드라이브) · 3.22 → 1.03(CacheLib FDP, EuroSys'25) · 협력 강도: 과제팀 판단")
d.notes(s, "2장입니다. 1장의 제품 포트폴리오를 만들려면 어떤 핵심 기술이 필요한지, 그리고 그 기술마다 고객 협력이 얼마나 필요한지를 정리했습니다. "
        "핵심 기술은 여섯 가지입니다. 첫째, Fault Tolerant입니다. 같은 폼팩터에서 245테라바이트는 다이 1,024개, 512테라바이트는 약 2,133개입니다. 다이가 두 배가 되면 고장 다이를 다이와 플레인 단위로 격리해 견뎌야 합니다. "
        "둘째, Large Mapping입니다. 4킬로바이트 단위로 매핑하면 245테라바이트 드라이브의 매핑 DRAM이 약 245기가바이트, 64킬로바이트면 약 15기가바이트입니다. 대신 매핑 단위보다 작은 쓰기는 최대 16배를 다시 써야 하므로 호스트 쓰기를 맞추는 안내가 필요합니다. "
        "셋째, Multi-Tenant QoS입니다. 이웃 테넌트의 쓰기만으로 WAF가 1.28에서 3.0으로 올라갑니다. 네임스페이스 단위 격리가 필요합니다. "
        "넷째, Confidential Storage입니다. Meta는 Meta도 접근하지 못하는 Muse 기밀 VM을 예고했고, 기밀 VM은 RoT, 증명, 장치 연결까지 스토리지에 요구합니다. Caliptra, SPDM, TDISP, OCP L.O.C.K. 같은 표준이 이미 있고, L.O.C.K.는 Google과 Microsoft 스토리지에 채택이 확정됐으며 삼성이 공저자입니다. "
        "다섯째, Mixed Media입니다. 작은 랜덤 쓰기를 그대로 QLC에 쓰면 WAF가 70을 넘지만, 모아서 순차로 내리면 1.02까지 내려갑니다. 여섯째, FDP입니다. CacheLib에서 데이터 수명을 표시하면 WAF가 3.22에서 1.03으로 내려갑니다. "
        "가운데 열은 각 기술이 어떤 제품군에 맞는지입니다. 고용량 QLC에는 여섯 가지 중 다섯 가지가 걸리고, FDP는 SLC급부터 QLC까지 가장 넓게 걸칩니다. "
        "오른쪽은 고객 협력 강도입니다. 고객만 아는 정보가 필요한가, 고객 소프트웨어가 바뀌어야 하는가, 표준이 정책까지 정해 주는가, 고객 환경에서만 검증되는가, 네 기준에 0에서 2점을 주었습니다. 과제팀의 판단입니다. "
        "Fault Tolerant는 1점으로 SSD 안에서 완결됩니다. Large Mapping, Multi-Tenant QoS, Confidential Storage는 3에서 4점으로, 요구 사양과 표준으로 협력하는 지금의 방식으로 준비할 수 있습니다. "
        "Mixed Media는 8점, FDP는 7점입니다. 어떤 쓰기가 작은지, 데이터가 언제 지워지는지는 고객 소프트웨어만 알고, 고객 소프트웨어가 데이터를 나눠 보내야 효과가 납니다. 표준은 메커니즘까지만 정하고 정책은 비어 있습니다. "
        "사양을 받아 SSD 안에서 구현하고 인증받는 지금까지의 방식으로는 이 두 기술의 제품이 완성되지 않습니다. 그래서 핵심 기술을 제대로 확보해 다가올 시대에 대비하려면 고객과의 협력이 필수입니다.")

# =============================================================== 3 당위성
s = d.slide(3, "당위성", "해법의 범위는 NAND에서 SSD로 넓어져 왔고,\n새로 나타난 과제는 고객 시스템까지 넓어져야 풀립니다")
tb(s, MX, 2.36, 11.6, 0.44, [[("고객의 쓰기는 커지는데 셀 수명은 줄어들면,  ", 20, False, GRAY), ("보상은 한 계층 위로 올라갑니다", 20, True, INK)]], anchor=MID)

# ---- 왼쪽 위: 셀 수명 P/E 대표값 (로그 축)
tb(s, MX, 2.96, 5.4, 0.34, [[("▼ 셀이 견디는 쓰기  ", 18, True, GRAY), ("P/E 대표값 (로그 축)", 16, False, GRAY)]])
pe = [("SLC", 100000, "10만"), ("MLC", 10000, "1만"), ("TLC", 3000, "3천"), ("QLC", 1000, "1천")]
PB, PH = 5.44, 1.55
for k, (nm, v, lab) in enumerate(pe):
    h = (math.log10(v) - 2) / 3 * PH
    bx = MX + 0.30 + k * 1.22
    rect(s, bx, PB - h, 0.80, h, fill=GRAY if k == 0 else GRAY_2)
    tb(s, bx - 0.2, PB - h - 0.34, 1.20, 0.32, [(lab, 16, True, INK)], align=C)
    tb(s, bx - 0.2, PB + 0.02, 1.20, 0.32, [(nm, 16, False, GRAY)], align=C)
tb(s, MX + 2.10, 3.40, 3.0, 0.46, [("약 100배 ↓", 24, True, GRAY)], align=C, anchor=MID)

# ---- 가운데 위: 고객 캐시 계층의 쓰기 (DWPD, 로그 축)
cx0 = MX + 5.95
tb(s, cx0, 2.96, 6.0, 0.34, [[("▲ 고객 캐시가 쓰는 양  ", 18, True, BLUE), ("DWPD (로그 축)", 16, False, GRAY)]])
LB = 2.95
qx0, qx1 = cx0 + LB, cx0 + 5.55
qlo, qhi = math.log10(0.2), math.log10(12)


def xq(v):
    return qx0 + (math.log10(v) - qlo) / (qhi - qlo) * (qx1 - qx0)


for g in (1, 10):
    rect(s, xq(g) - 0.005, 3.36, 0.01, 1.82, fill=LINE)
    tb(s, xq(g) - 0.3, 5.18, 0.6, 0.28, [(str(g), 16, False, GRAY)], align=C)
cust = [("QLC 정격", "", 0.6, GRAY_2, "0.6"),
        ("Meta 플래시 캐시", "예산", 3.0, GRAY, "3"),
        ("AI KV 캐시", "실측", 3.2, GRAY, "3.2"),
        ("Meta 스토리지 캐시", "목표", 7.2, BLUE, "7.2")]
for i, (nm, basis, v, col, lab) in enumerate(cust):
    yy = 3.40 + i * 0.44
    tb(s, cx0, yy, LB - 0.08, 0.38, [[(nm, 17, i == 3, BLUE if i == 3 else INK)] + ([(f" {basis}", 16, False, GRAY)] if basis else [])], anchor=MID)
    rect(s, qx0, yy + 0.06, xq(v) - qx0, 0.26, fill=col)
    tb(s, xq(v) + 0.06, yy, 0.70, 0.38, [(lab, 17, True, BLUE if i == 3 else INK)], anchor=MID)

BOT = 9.40
steps = [  # x, w, top, fill, step name, years, metric, metric sub, state chip
    (MX, 5.55, 6.20, PALE, "NAND → SSD", "1991~", "ECC 약 60배", "셀 오류율 약 100만 배 ↑를 흡수", "완결"),
    (MX + 5.75, 5.90, 5.62, PALE, "SSD 혼자 최적화", "2014~2019", "WAF ≈ 3", "데이터 수명을 추정만 할 수 있었다", "부분 성공"),
    (MX + 11.85, 6.57, 2.96, BLUE, "고객 시스템과 공동 설계", "2022~", "WAF 3.22 → 1.03", "데이터의 종류 · 수명은 고객 시스템만 안다", "다음 칸"),
]
for i, (x, w, top, fill, nm, yr, met, msub, st) in enumerate(steps):
    hot = fill == BLUE
    rect(s, x, top, w, BOT - top, fill=fill, shape=RR)
    ink, sub = (WHITE, BLUE_T2) if hot else (INK, GRAY)
    tb(s, x + 0.30, top + 0.12, w - 2.1, 0.86, [(nm, 24, True, ink), (yr, 18, False, sub)], spacing=1.0)
    chip(s, x + w - 1.70, top + 0.20, 1.40, 0.44, st, fill=WHITE if hot else (GRAY_2 if i == 0 else WHITE),
         color=BLUE if hot else (WHITE if i == 0 else GRAY), size=18, line=None if (hot or i == 0) else GRAY_2)
    iy = top + 1.02
    if i == 0:
        d.fit(s, d.part("nand"), x + 0.40, iy, 1.10, 0.74)
        d.arrow_r(s, x + 1.66, iy + 0.25, 0.46, 0.24)
        d.fit(s, d.part("ssd"), x + 2.28, iy, 2.20, 0.74)
        my = iy + 0.80
    elif i == 1:
        d.fit(s, d.part("ssd"), x + 0.40, iy, 2.40, 0.86)
        my = iy + 0.98
    else:
        d.fit(s, d.part("server"), x + 0.40, iy, 1.90, 1.05)
        d.fit(s, d.part("ssd"), x + 2.50, iy + 0.22, 1.80, 0.70)
        my = iy + 1.12
    tb(s, x + 0.30, my, w - 0.6, 0.70, [(met, 40 if hot else 36, True, WHITE if hot else (GRAY if i == 1 else INK))], anchor=MID)
    tb(s, x + 0.30, my + 0.70, w - 0.6, 0.38, [(msub, 18, False, WHITE if hot else sub)])

# ---- 3칸 안: 고객은 이미 자기 시스템에서 쓰기를 다룬다 (Meta CacheLib)
x, w = steps[2][0], steps[2][1]
MY0 = 6.30
rect(s, x + 0.26, MY0, w - 0.52, 2.86, fill=WHITE, shape=RR)
d.fit(s, d.logo("meta"), x + 0.48, MY0 + 0.16, 1.20, 0.30, align="left")
tb(s, x + 1.80, MY0 + 0.10, w - 2.2, 0.42, [("CacheLib 프로덕션", 18, True, INK)], anchor=MID)
# 쓰기 수요 대 SSD 수명 예산 막대
tb(s, x + 0.48, MY0 + 0.62, 3.2, 0.34, [("쓰기 수요 / SSD 수명 예산", 16, False, GRAY)])
mb0, mbw = x + 0.48, 2.70
rect(s, mb0, MY0 + 1.02, mbw, 0.46, fill=GRAY_2)
tb(s, mb0 + 0.10, MY0 + 1.02, 1.6, 0.46, [("상한 없으면", 16, True, WHITE)], anchor=MID)
tb(s, mb0 + mbw + 0.06, MY0 + 1.02, 0.9, 0.46, [("150%", 20, True, INK)], anchor=MID)
rect(s, mb0, MY0 + 1.58, mbw / 1.5, 0.46, fill=BLUE_T2)
tb(s, mb0 + 0.10, MY0 + 1.58, 1.6, 0.46, [("수명 예산", 16, True, INK)], anchor=MID)
tb(s, mb0 + mbw / 1.5 + 0.06, MY0 + 1.58, 0.9, 0.46, [("100%", 20, True, INK)], anchor=MID)
tb(s, x + 0.48, MY0 + 2.14, 3.6, 0.60, [("플래시 OP 50%로 버틴다", 16, False, GRAY)], anchor=MID)
# 고객 소프트웨어로 쓰기 -44%
rect(s, x + 4.15, MY0 + 0.62, 0.012, 2.05, fill=LINE)
tb(s, x + 4.30, MY0 + 0.66, w - 4.7, 0.90, [("-44%", 44, True, BLUE)], anchor=MID)
tb(s, x + 4.30, MY0 + 1.56, w - 4.7, 1.10, [("ML 수용 정책으로", 16, False, GRAY), ("플래시 기록량", 16, False, GRAY), ("(고객 SW)", 16, True, BLUE)], spacing=1.0)

d.chevron(s, MX + 5.57, 7.60, w=0.16, h=0.50)
d.chevron(s, MX + 11.67, 7.10, w=0.16, h=0.50)

d.band(s, 9.60, 0.80, "결론", "사양서만으로는 2칸에 머뭅니다. 3칸은 고객 시스템 안에서 함께 설계해야 닿습니다")
d.footer(s, "출처: 해법 사다리 원장(JESD218 · LDPC · FDP TP4146 · CacheLib + FDP 3.22 → 1.03, EuroSys'25) · 캐시 DWPD: Kangaroo 예산 3(SOSP'21) · Baleen 목표 7.2(FAST'24) · "
            "StorageReview KV 실측 3.2(2026-08) · CacheLib 150% · OP 50% · -44%(OSDI'20) · 기준(예산 · 실측 · 목표)이 서로 다름 · 부품 이미지는 3D 렌더")
d.notes(s, "3장입니다. 왜 고객 시스템까지 가야 하는지 데이터로 말씀드리겠습니다. 왼쪽 위는 셀이 견디는 쓰기 횟수입니다. SLC 10만 회에서 QLC 1천 회로 약 100배 줄었습니다. "
        "그 옆은 고객의 캐시 계층이 실제로 쓰는 양입니다. QLC 정격은 하루 0.6회인데, Meta의 플래시 캐시는 하루 3회를 쓰기 예산으로 잡고, Meta 벌크 스토리지 캐시 연구는 7.2회를 목표로 둡니다. AI KV 캐시 계층을 실측하면 드라이브당 3.2회였습니다. 기준은 예산, 실측, 목표로 서로 다르지만 방향은 같습니다. "
        "고객의 쓰기는 커지는데 셀 수명은 줄면, 보상은 늘 한 계층 위로 올라갔습니다. 첫 계단은 NAND에서 SSD입니다. 셀 오류율이 약 100만 배 나빠졌지만 컨트롤러 ECC가 약 60배 강해지면서 SSD 안에서 완결됐습니다. "
        "둘째 계단은 SSD 혼자 하는 최적화입니다. 2014년부터 2019년까지 SSD가 워크로드를 추정했지만 실제 워크로드에서 WAF는 약 3에 머물렀습니다. 데이터가 언제 지워지는지는 호스트만 알기 때문입니다. "
        "셋째 계단이 고객 시스템과의 공동 설계입니다. 호스트가 데이터 수명을 알려 주는 FDP로 CacheLib은 WAF를 3.22에서 1.03으로 낮췄습니다. "
        "고객은 이미 자기 시스템에서 이 문제와 싸우고 있습니다. Meta CacheLib 논문에 따르면, 캐시 쓰기를 그대로 두면 SSD 수명 예산의 1.5배가 됩니다. 그래서 Meta는 플래시를 50퍼센트 더 두고, 머신러닝 수용 정책이라는 자기 소프트웨어로 플래시 기록량을 44퍼센트 줄였습니다. "
        "해법이 이미 고객 소프트웨어 안에 있다는 뜻입니다. 사양서를 받아 SSD를 잘 만드는 방식은 둘째 계단에 머뭅니다. 셋째 계단은 고객 시스템 안에서 함께 설계해야 닿습니다.")

# =============================================================== 4 실행
s = d.slide(4, "실행 전략", "고객 시스템 안으로 들어가는 새로운 방식이 필요하므로,\n전략 고객과 계약 · 사람 · 역량으로 함께 설계합니다")
C1, W1 = MX, 5.55
C2, W2 = 6.55, 6.90
C3, W3 = 13.66, 5.55
BENCH_Y, NOW_Y, NEXT_Y = 2.96, 3.48, 5.30


def tag(s, x, y, text, hot):
    tb(s, x, y, 5.0, 0.36, [(text, 18, True, BLUE if hot else GRAY_2)])


# ---- ① 계약
d.panel_head(s, C1, W1, 1, "계약: 물량에 기술 협력을")
wm, _ = d.img(s, d.logo("micron"), C1, BENCH_Y + 0.04, h=0.27)
tb(s, C1 + wm + 0.08, BENCH_Y - 0.02, 0.40, 0.38, [("↔", 20, True, GRAY)], align=C, anchor=MID)
wa, _ = d.img(s, d.logo("anthropic"), C1 + wm + 0.56, BENCH_Y + 0.08, h=0.19)
tb(s, C1 + wm + 0.56 + wa + 0.14, BENCH_Y - 0.02, 1.2, 0.38, [("2026-06", 16, False, GRAY)], anchor=MID)
tag(s, C1, NOW_Y, "지금", False)
label_box(s, C1, NOW_Y + 0.44, W1, 0.60, [("장기 물량 계약 (LTA)", 20, True, WHITE)], fill=GRAY_2)
tb(s, C1, NOW_Y + 1.10, W1, 0.36, [("수량과 가격만 약속합니다", 18, False, GRAY)], align=C)
d.down(s, C1 + W1 / 2, NEXT_Y - 0.32)
tag(s, C1, NEXT_Y, "앞으로: 전략적 계약", True)
SW1 = W1 - 1.05
for i, (t, st) in enumerate([("자본 연계 (선택)", "opt"), ("운영 통합", "t1"), ("공동 설계 · 최적화", "hot"), ("다년 공급 (물량)", "base")]):
    yy = NEXT_Y + 0.44 + i * 0.64
    if st == "opt":
        label_box(s, C1, yy, SW1, 0.54, [(t, 18, False, GRAY)], fill=WHITE, line=GRAY_2, dash=True)
    elif st == "base":
        label_box(s, C1, yy, SW1, 0.54, [(t, 20, True, WHITE)], fill=GRAY_2)
    else:
        label_box(s, C1, yy, SW1, 0.54, [(t, 20, True, WHITE)], fill=BLUE if st == "hot" else BLUE_T1)
by0, by1 = NEXT_Y + 0.44 + 0.64, NEXT_Y + 0.44 + 2 * 0.64 + 0.54
rect(s, C1 + SW1 + 0.10, by0, 0.035, by1 - by0, fill=BLUE)
rect(s, C1 + SW1 + 0.02, by0, 0.10, 0.035, fill=BLUE)
rect(s, C1 + SW1 + 0.02, by1 - 0.035, 0.10, 0.035, fill=BLUE)
tb(s, C1 + SW1 + 0.20, by0, 0.85, by1 - by0, [("기술", 18, True, BLUE), ("협력", 18, True, BLUE)], anchor=MID, spacing=1.0)
d.chevron(s, C2 - 0.19, 6.10, w=0.16, h=0.50)

# ---- ② 사람
d.panel_head(s, C2, W2, 2, "사람: 고객 안에 상주")
d.img(s, d.logo("palantir"), C2, BENCH_Y + 0.01, h=0.34)
tb(s, C2 + 0.44, BENCH_Y - 0.02, W2 - 0.44, 0.38, [[("Palantir FDE", 18, True, INK), ("   Anthropic · OpenAI도 채택", 16, False, GRAY)]], anchor=MID)
tag(s, C2, NOW_Y, "지금", False)
BY = NOW_Y + 0.44
rect(s, C2, BY, 1.70, 0.60, fill=WHITE, line=LINE, shape=RR)
d.fit(s, d.logo("samsung"), C2 + 0.15, BY + 0.13, 1.40, 0.34)
label_box(s, C2 + W2 - 1.70, BY, 1.70, 0.60, [("고객", 20, True, INK)], fill=WHITE, line=LINE)
rect(s, C2 + 1.78, BY + 0.29, W2 - 3.56, 0.03, fill=GRAY_2)
rect(s, C2 + W2 / 2 - 0.22, BY + 0.02, 0.44, 0.56, fill=WHITE, line=GRAY_2, lw=1.25, shape=MSO_SHAPE.FOLDED_CORNER)
tb(s, C2, NOW_Y + 1.10, W2, 0.36, [("스펙 문서 · 간헐적 미팅: 명시된 요구만 오갑니다", 18, False, GRAY)], align=C)
d.down(s, C2 + W2 / 2, NEXT_Y - 0.32)
tag(s, C2, NEXT_Y, "앞으로: 고객 상주 협업 (Co-Design Pod)", True)
SBY = NEXT_Y + 0.44
rect(s, C2, SBY, W2, 0.56, fill=WHITE, line=LINE, shape=RR)
d.fit(s, d.logo("samsung"), C2 + 0.22, SBY + 0.14, 1.45, 0.28, align="left")
tb(s, C2 + 1.95, SBY, W2 - 2.2, 0.56, [("제품 · 로드맵", 18, True, INK)], anchor=MID)
BX0, BY0, BW = C2, SBY + 1.02, W2
BH = 8.56 - BY0
rect(s, BX0, BY0, BW, BH, fill=TINT, line=BLUE, lw=1.5, shape=RR)
ph = 0.62
pod_x0 = BX0 + 0.35
pod_w = 3 * (0.62 * ph) + 2 * 0.10
pc = pod_x0 + pod_w / 2
AY0, AY1 = SBY + 0.60, BY0 + 0.38
rect(s, pc - 0.46, AY0, 0.34, AY1 - AY0, fill=BLUE, shape=MSO_SHAPE.DOWN_ARROW)
rect(s, pc + 0.12, AY0, 0.34, AY1 - AY0, fill=BLUE_T1, shape=MSO_SHAPE.UP_ARROW)
tb(s, pc - 1.40, AY0 + 0.02, 0.86, 0.38, [("사람", 18, True, BLUE)], align=R, anchor=MID)
tb(s, pc + 0.58, AY0 + 0.02, 3.4, 0.38, [("실제 요구 → 제품", 18, True, BLUE_T1)], anchor=MID)
tb(s, BX0 + BW - 3.2, BY0 + 0.10, 3.0, 0.36, [("고객 AI 데이터센터", 18, True, BLUE)], align=R)
py = BY0 + 0.52
px = pod_x0
for _ in range(3):
    px += d.person(s, px, py, ph, BLUE) + 0.10
tb(s, pod_x0 - 0.3, py + ph + 0.06, pod_w + 0.6, 0.36, [("삼성 Pod", 18, True, BLUE)], align=C)
gw = 2 * (0.62 * ph) + 0.10
gx = BX0 + BW - 1.55 - gw
qx = gx
for _ in range(2):
    qx += d.person(s, qx, py, ph, GRAY_2) + 0.10
tb(s, gx - 0.55, py + ph + 0.06, gw + 1.1, 0.36, [("고객 엔지니어", 18, True, GRAY)], align=C)
m0, m1 = pod_x0 + pod_w + 0.15, gx - 0.15
rect(s, m0, py + 0.20, m1 - m0, 0.30, fill=BLUE_T2, shape=MSO_SHAPE.LEFT_RIGHT_ARROW)
tb(s, m0, py + 0.56, m1 - m0, 0.34, [("매일 함께", 16, True, BLUE)], align=C)
d.fit(s, d.part("server"), BX0 + BW - 1.45, py - 0.02, 1.25, 0.76)
d.chevron(s, C3 - 0.19, 6.10, w=0.16, h=0.50)

# ---- ③ 역량 격자 (새 과제의 층이 위로)
d.panel_head(s, C3, W3, 3, "역량: 고객처럼 보는 눈")
tb(s, C3, BENCH_Y - 0.02, W3, 0.38, [[("고객의 지표  ", 16, False, GRAY), ("토큰당 비용 · GPU 가동률", 18, True, INK)]], anchor=MID)
LW3, CWN, G3, CWF = 1.70, 1.20, 0.10, 2.55
cxn, cxf = C3 + LW3, C3 + LW3 + CWN + G3
tb(s, cxn, NOW_Y, CWN, 0.36, [("지금", 18, True, GRAY_2)], align=C)
tb(s, cxf, NOW_Y, CWF, 0.36, [("필요한 기술", 18, True, BLUE)], align=C)
layers = [("AI DC 운영", "없음", "off", "TCO · 추론 SLO", BLUE),
          ("KV 캐시 SW", "LMCache", "part", "Dynamo · Mooncake", BLUE),
          ("커널 · I/O", "일부", "part", "io_uring · NIXL", BLUE),
          ("SSD FW", "강점", "on", "FDP · NS QoS · destage", BLUE_T1),
          ("NAND", "강점", "on", "", BLUE_T2)]
RY3, RP3, RH3 = NOW_Y + 0.44, 0.70, 0.60
for r, (nm, now_t, st, need, col) in enumerate(layers):
    yy = RY3 + r * RP3
    gap = r < 3
    tb(s, C3, yy, LW3 - 0.08, RH3, [(nm, 18, True, BLUE if gap else GRAY)], anchor=MID)
    if st == "on":
        label_box(s, cxn, yy, CWN, RH3, [(now_t, 18, True, WHITE)], fill=GRAY_2)
    elif st == "part":
        label_box(s, cxn, yy, CWN, RH3, [(now_t, 18, True, GRAY)], fill=PALE)
    else:
        label_box(s, cxn, yy, CWN, RH3, [(now_t, 18, True, GRAY)], fill=WHITE, line=GRAY_2, dash=True)
    if need:
        label_box(s, cxf, yy, CWF, RH3, [(need, 17, True, WHITE)], fill=col)
    else:
        rect(s, cxf, yy, CWF, RH3, fill=col, shape=RR)
EY = RY3 + 5 * RP3 + 0.08
tb(s, C3, EY, W3, 0.80, [[("LMCache: ", 18, False, GRAY), ("삼성 Committer · FDP 머지", 18, True, INK)],
                         [("Dynamo · Mooncake: 기여 0", 18, False, GRAY)]], spacing=1.05)

# ---- 열 캡션
CAP_Y = 8.86
tb(s, C1, CAP_Y, W1, 0.50, [("물량 위에 기술 협력을 쌓습니다", 20, True, BLUE)], anchor=MID)
tb(s, C2, CAP_Y, W2, 0.50, [("고객 안에서 실제 요구를 찾습니다", 20, True, BLUE)], anchor=MID)
tb(s, C3, CAP_Y, W3, 0.50, [("시스템 SW와 AI DC 운영 역량", 20, True, BLUE)], anchor=MID)

d.band(s, 9.60, 0.80, "결론", "실패할 수도 있는 기술에 투자하는 것이, 불확실한 미래에 실패하지 않는 불변 전략입니다", size=24)
d.footer(s, "벤치마크: Micron ↔ Anthropic 전략적 계약(2026-06-22: 공동 최적화 · 다년 공급 · 운영 통합 · 전략 투자, 재무 조건 비공개) · Palantir FDE(고객 상주) · "
            "KV 캐시 관리자 기여는 공개 저장소 커밋 기준(LMCache PR #4016, 2026-08) · 로고는 식별 표시")
d.notes(s, "4장 실행 전략입니다. 2장에서 고른 두 핵심 기술의 요구, 곧 어떤 쓰기가 작은지와 데이터가 언제 지워지는지는 고객 시스템 안에 있습니다. 그래서 지금까지와 다른 방식이 필요하고, 그 방식을 Mixed Media와 FDP에 집중합니다. Fault Tolerant, Large Mapping, Multi-Tenant QoS, Confidential Storage는 지금 방식으로 준비합니다. "
        "첫째, 계약입니다. 지금은 수량과 가격만 약속합니다. Micron은 Anthropic과의 전략적 계약에서 다년 공급 위에 공동 설계와 운영 통합을 묶었습니다. 우리도 물량 위에 기술 협력을 쌓겠습니다. "
        "둘째, 사람입니다. 스펙 문서로는 명시된 요구만 옵니다. Palantir의 FDE처럼 Co-Design Pod가 고객 AI 데이터센터 안에 상주해 실제 요구를 찾고, 그것을 제품으로 되돌립니다. "
        "셋째, 역량입니다. NAND와 SSD 펌웨어는 강점입니다. 비어 있는 곳은 그 위입니다. KV 캐시 소프트웨어는 LMCache에서 시작했고 Dynamo와 Mooncake로 넓혀야 합니다. 그리고 고객의 지표인 토큰당 비용과 GPU 가동률로 말하는 사람이 필요합니다. "
        "첫 90일에는 다섯 가지를 하겠습니다. 전략 고객 한두 곳을 정해 FDP와 Mixed Media 의제를 맞추고, Co-Design Pod를 꾸리고, 시스템 소프트웨어 전문가 채용을 시작하고, 고객 KV 트레이스로 WAF를 실측하고, 신호 대시보드를 돌리겠습니다. "
        "마지막으로, 실패할 수도 있는 기술에 투자하는 것이 불확실한 미래에 실패하지 않는 불변 전략입니다. 지금 예측할 수 있는 범위 안에서 최선을 다하고, 신호가 바뀌면 판단을 고치겠습니다.")

d.save(os.path.abspath(OUT))
print(f"생성 완료: {os.path.abspath(OUT)} ({len(d.prs.slides._sldIdLst)}장)")
