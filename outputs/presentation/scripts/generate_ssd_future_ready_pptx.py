"""불확실성이 높은 미래에 대응하기 위한 고객 협력 전략: 4장 덱 (2026-10-03 v1.1).

제목 4개를 이어 읽으면 한 문단이 된다(아웃라인 v0.3):
  1 배경   SSD의 다음 수요는 하나로 정해지지 않으며, 데이터센터마다 스토리지에 요구하는 것이 다릅니다
  2 솔루션 SSD 안에서 풀 수 있는 기술은 지금처럼 준비하고, 고객 시스템과 함께 풀어야 하는 과제가 새로 나타나고 있습니다
  3 당위성 해법의 범위는 NAND에서 SSD로 넓어져 왔고, 새로 나타난 과제는 고객 시스템까지 넓어져야 풀립니다
  4 실행   고객 시스템 안으로 들어가는 새로운 방식이 필요하므로, 전략 고객과 계약 · 사람 · 역량으로 함께 설계합니다
  결론     실패할 수도 있는 기술에 투자하는 것이, 불확실한 미래에 실패하지 않는 불변 전략입니다

규율: samsung-memory-ppt-design-skill v2.1(11절 시각 우선, 11.J 근거 사슬: 주장마다 데이터 그래프). 본문 18pt 이상 · 출처 15pt · em-dash 금지 · 액센트 Samsung Blue 하나.
도형 · 차트는 모두 python-pptx 도형으로 그린다(차트 pt = 슬라이드 pt). 부품 이미지는 assets/photos가 있으면 사진, 없으면 3D 렌더.
원고 · 근거: outputs/presentation/ssd-future-ready-strategy-outline.md, outputs/report/ssd-future-ready-strategy-report.md (v1.1).
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
MT, RH, RG = 6.46, 0.66, 0.07
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

# ① 범용 클라우드: 클라우드 안 VM 여러 개가 SSD 하나를 나눠 쓴다 + 실사용 DWPD
x = DXS[0]
rect(s, x + 0.08, VT - 0.04, 2.10, 1.16, fill=None, line=GRAY_2, lw=1.25, shape=MSO_SHAPE.CLOUD)
TEN = [GRAY_2, BLUE_T2, GRAY_2, BLUE_T1, GRAY_2, BLUE_T2]
for k, col in enumerate(TEN):
    rect(s, x + 0.54 + (k % 3) * 0.44, VT + 0.28 + (k // 3) * 0.30, 0.38, 0.24, fill=col)
for k in range(3):
    rect(s, x + 0.72 + k * 0.44, VT + 0.84, 0.014, 0.34, fill=GRAY_2)
rect(s, x + 0.46, VT + 1.18, 1.40, 0.26, fill=INK)
tb(s, x + 0.46, VT + 1.18, 1.40, 0.26, [("SSD", 15, True, WHITE)], align=C, anchor=MID)
tb(s, x + 0.04, VT + 1.52, 2.24, 0.56, [("VM 여러 개가", 16, False, GRAY), ("SSD 하나를 나눠 씀", 16, False, GRAY)], align=C, spacing=1.0)
# 실측 DWPD 대 범용 TLC 정격 (세로 막대)
BBt, BHm = VT + 1.44, 1.10
for k, (v, col, nm, lab) in enumerate([(0.23, BLUE, "실측", "0.2"), (1.0, GRAY_2, "정격", "1")]):
    bx = x + 2.40 + k * 0.52
    rect(s, bx, BBt - BHm * v, 0.32, BHm * v, fill=col)
    tb(s, bx - 0.14, BBt - BHm * v - 0.30, 0.60, 0.28, [(lab, 16, True, BLUE if k == 0 else INK)], align=C)
    tb(s, bx - 0.14, BBt + 0.04, 0.60, 0.28, [(nm, 15, False, GRAY)], align=C)
tb(s, x + 2.22, BBt + 0.32, 1.10, 0.28, [("DWPD", 15, False, GRAY)], align=C)

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

# ④ 에이전트: 사용자별 VM, 대부분 유휴 + 영속 디스크 총량
x = DXS[3]
NC, NR, TW, TH = 12, 3, 0.20, 0.16
ACT = {(0, 3), (1, 8), (2, 1)}
for r in range(NR):
    for c in range(NC):
        rect(s, x + 0.22 + c * (TW + 0.055), VT + 0.02 + r * (TH + 0.06), TW, TH, fill=BLUE if (r, c) in ACT else LINE)
tb(s, x + 0.20, VT + 0.66, DW - 0.40, 0.30, [[("■", 15, False, BLUE), (" 활성  ", 15, False, GRAY), ("■", 15, False, LINE), (" 유휴: 상태는 디스크로", 15, False, GRAY)]])
for k, (nm, v, col, lab) in enumerate([("사용자 VM 디스크 (1억 명)", 10.0, BLUE, "10EB"), ("Llama 3 학습 스토리지", 0.24, GRAY_2, "0.24EB")]):
    yy = VT + 1.06 + k * 0.52
    tb(s, x + 0.20, yy, DW - 0.40, 0.26, [(nm, 15, k == 0, BLUE if k == 0 else GRAY)], anchor=MID)
    w = max(0.05, (DW - 1.40) * v / 10.0)
    rect(s, x + 0.22, yy + 0.28, w, 0.18, fill=col)
    tb(s, x + 0.28 + w, yy + 0.22, 0.90, 0.30, [(lab, 15, True, BLUE if k == 0 else GRAY)], anchor=MID)

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
        (3, 3): ("사용자 VM 디스크", True), (2, 3): ("활성 VM", False)}
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
d.footer(s, "출처: HBM 과제팀 집계 · 범용 Microsoft SSD 50만 대(파생) · 학습 NVIDIA SuperPOD 가이드(GPU당) · 체크포인트 산술 · 추론 StorageReview(2026-08) · "
            "Kioxia · DapuStor · 에이전트 Google GKE · Muse 관측 100GB × 1억 명(산술) · Llama 3 논문 · 제품 사양 Kioxia FL6 · LC9, Solidigm PS1010 · PS1030")
d.notes(s, "1장입니다. TBD")

# =============================================================== 2 솔루션
s = d.slide(2, "솔루션", "SSD 안에서 풀 수 있는 기술은 지금처럼 준비하고,\n고객 시스템과 함께 풀어야 하는 과제가 새로 나타나고 있습니다")

GT, GB = 2.34, 9.42
GWG = 4.80
BXG, BWG = MX + GWG + 0.30, CW - GWG - 0.30
rect(s, MX, GT, GWG, GB - GT, fill=PALE, shape=RR)
rect(s, BXG, GT, BWG, GB - GT, fill=TINT, line=BLUE, lw=1.5, shape=RR)
tb(s, MX + 0.26, GT + 0.08, GWG - 0.4, 0.52, [[("SSD 안에서  ", 24, True, GRAY), ("지금처럼", 24, True, INK)]], anchor=MID)
tb(s, BXG + 0.26, GT + 0.08, BWG - 0.4, 0.52, [[("고객 시스템과 함께  ", 24, True, BLUE), ("새로 나타남", 24, True, INK)]], anchor=MID)
CT, CB = 3.02, 9.24
G1, GCW = MX + 0.20, GWG - 0.40
bw2 = (BWG - 0.60) / 2
B1, B2 = BXG + 0.20, BXG + 0.40 + bw2
KY, GY = 7.02, 8.28
for x, w in ((G1, GCW), (B1, bw2), (B2, bw2)):
    rect(s, x, CT, w, CB - CT, fill=WHITE, shape=RR)
    rect(s, x + 0.24, GY - 0.10, w - 0.48, 0.012, fill=LINE)

# ---- 그레이: 고용량 (같은 폼팩터에 다이 ×2, 고장 다이는 패리티로)
x, w = G1, GCW
tb(s, x + 0.24, CT + 0.10, w - 0.4, 0.48, [("고용량", 24, True, INK)], anchor=MID)
OW, OH = 1.62, 2.45
ox0 = x + (w - (2 * OW + 0.36)) / 2
for k, (rows_, lab1, bad) in enumerate([(4, "245TB", None), (8, "512TB", (5, 2))]):
    ox, oy = ox0 + k * (OW + 0.36), 3.72
    rect(s, ox, oy, OW, OH, fill=WHITE, line=GRAY, lw=1.5, shape=RR)
    cols_ = 4
    cw_ = (OW - 0.30) / cols_ - 0.05
    ch_ = (OH - 0.30) / rows_ - 0.05
    for rr in range(rows_):
        for cc in range(cols_):
            par = cc == cols_ - 1 and k == 1
            fill = INK if (rr, cc) == bad else (BLUE_T2 if par else GRAY_2)
            rect(s, ox + 0.15 + cc * (cw_ + 0.05), oy + 0.15 + rr * (ch_ + 0.05), cw_, ch_, fill=fill)
    tb(s, ox - 0.1, oy + OH + 0.06, OW + 0.2, 0.36, [(lab1, 18, True, INK if k == 0 else BLUE)], align=C)
tb(s, x + 0.24, 6.62, w - 0.4, 0.34, [[("■", 16, False, INK), (" 고장 다이  ", 16, False, GRAY), ("■", 16, False, BLUE_T2), (" 패리티", 16, False, GRAY)]], align=C)
tb(s, x + 0.24, KY, w - 0.4, 0.70, [[("다이 ", 22, True, BLUE), ("×2", 44, True, BLUE)]], anchor=MID)
tb(s, x + 0.24, KY + 0.72, w - 0.4, 0.40, [("같은 폼팩터, 고장은 패리티로", 18, False, GRAY)])

# ---- Blue ①: Mixed Media (네임스페이스 2개 + 호스트 배치 + 순차 destage)
x, w = B1, bw2
tb(s, x + 0.24, CT + 0.10, w - 0.4, 0.48, [[("Mixed Media", 24, True, INK), ("   pSLC + QLC 한 드라이브", 18, True, BLUE)]], anchor=MID)
# 호스트가 데이터 종류별로 보낸다 → pSLC(위) · QLC(아래), pSLC에서 모아 순차로 내려보냄
c1y, c2y = 3.70, 4.62
label_box(s, x + 0.24, c1y, 2.30, 0.58, [("WAL · 메타데이터", 17, True, INK)], fill=BLUE_T2)
label_box(s, x + 0.24, c2y, 2.30, 0.58, [("객체 · 데이터셋", 17, True, WHITE)], fill=GRAY_2)
tb(s, x + 0.24, 5.16, 2.30, 0.30, [("고객 SW가 나눈다", 16, True, BLUE)], align=C)
dx0, DW = x + 2.95, w - 3.20
rect(s, dx0, 3.60, DW, 1.86, fill=WHITE, line=GRAY, lw=1.5, shape=RR)
label_box(s, dx0 + 0.14, c1y, 1.00, 0.58, [("pSLC", 17, True, WHITE)], fill=BLUE_T1)
tb(s, dx0 + 1.24, c1y - 0.02, DW - 1.34, 0.62, [("모아서", 16, True, BLUE), ("큰 순차 쓰기로", 16, True, BLUE)], anchor=MID, spacing=1.0)
rect(s, dx0 + 0.50, c1y + 0.60, 0.28, 0.24, fill=BLUE, shape=MSO_SHAPE.DOWN_ARROW)
label_box(s, dx0 + 0.14, c2y - 0.12, DW - 0.28, 0.98, [("QLC", 20, True, WHITE)], fill=GRAY_2)
d.arrow_r(s, x + 2.58, c1y + 0.18, 0.34, 0.22, fill=BLUE_T1)
d.arrow_r(s, x + 2.58, c2y + 0.18, 0.34, 0.22, fill=GRAY_2)
# 데이터 ①: 쓰기 크기 분포 (Alibaba 블록 스토리지)
tb(s, x + 0.24, 5.58, 2.9, 0.30, [("쓰기 크기 (클라우드 블록)", 16, False, GRAY)])
rect(s, x + 0.24, 5.92, 2.80 * 0.75, 0.42, fill=BLUE_T1)
rect(s, x + 0.24 + 2.80 * 0.75, 5.92, 2.80 * 0.25, 0.42, fill=GRAY_2)
tb(s, x + 0.32, 5.92, 2.0, 0.42, [("16KiB 이하 75%", 16, True, WHITE)], anchor=MID)
# 데이터 ②: 4KB 랜덤 쓰기 WAF (로그 축)
wx0 = x + 3.35
tb(s, wx0, 5.58, w - 3.6, 0.30, [("4KB 쓰기 WAF (로그)", 16, False, GRAY)])
WMAX = w - 3.6 - 0.75
for k, (nm, v, col, lab) in enumerate([("그대로", 70, GRAY_2, "70+"), ("모아서", 1.02, BLUE, "1.02")]):
    yy = 5.92 + k * 0.42
    ww = max(0.10, WMAX * (math.log10(v) + 0.3) / (math.log10(70) + 0.3))
    tb(s, wx0, yy, 0.80, 0.36, [(nm, 16, k == 1, BLUE if k else INK)], anchor=MID)
    rect(s, wx0 + 0.82, yy + 0.06, ww * 0.80, 0.26, fill=col)
    tb(s, wx0 + 0.86 + ww * 0.80, yy, 0.8, 0.36, [(lab, 16, True, BLUE if k else INK)], anchor=MID)
tb(s, x + 0.24, KY, w - 0.4, 0.70, [[("pSLC ", 22, True, BLUE), ("0.5~2%", 40, True, BLUE), ("  고객이 요구한 비율", 18, True, INK)]], anchor=MID)
tb(s, x + 0.24, KY + 0.72, w - 0.4, 0.40, [("어떤 데이터가 작은 쓰기인지는 고객 SW만 압니다", 18, False, GRAY)])

# ---- Blue ②: 고DWPD (블록 그림 + 다이 수)
x, w = B2, bw2
tb(s, x + 0.24, CT + 0.10, w - 0.4, 0.48, [[("고DWPD", 24, True, INK), ("   2TB · 30 DWPD", 18, True, BLUE)]], anchor=MID)
SHORT, LONG = BLUE_T2, GRAY_2


def block(s, bx, by, cells, cs=0.20, cols=4, gap=0.04):
    rows = len(cells) // cols
    rect(s, bx - 0.06, by - 0.06, cols * (cs + gap) - gap + 0.12, rows * (cs + gap) - gap + 0.12, fill=WHITE, line=GRAY, lw=1.0)
    for i, c in enumerate(cells):
        rect(s, bx + (i % cols) * (cs + gap), by + (i // cols) * (cs + gap), cs, cs, fill=c)


mix = [SHORT, LONG, SHORT, LONG, LONG, SHORT, LONG, SHORT, SHORT, LONG, SHORT, LONG]
for r, (lab, hot) in enumerate([("SSD 혼자: 수명이 섞인다", False), ("고객이 수명을 알려 주면", True)]):
    ry = 3.62 + r * 1.36
    tb(s, x + 0.24, ry, 3.6, 0.34, [(lab, 17, True, BLUE if hot else GRAY)])
    b1, b2 = (mix, mix[::-1]) if not hot else ([SHORT] * 12, [LONG] * 12)
    block(s, x + 0.34, ry + 0.46, b1)
    block(s, x + 1.48, ry + 0.46, b2)
    tb(s, x + 2.62, ry + 0.38, 1.10, 0.76, [("WAF", 16, False, GRAY), ("≈ 1" if hot else "≈ 3", 26, True, BLUE if hot else GRAY)], anchor=MID, spacing=1.0)
tb(s, x + 0.24, 6.40, 3.7, 0.30, [[("■", 16, False, SHORT), (" 곧 지울  ", 16, False, GRAY), ("■", 16, False, LONG), (" 오래 둘 데이터", 16, False, GRAY)]])
rect(s, x + 3.80, 3.62, 0.012, 3.10, fill=LINE)
ex = x + 3.92
tb(s, ex, 3.62, w - 4.1, 0.62, [("필요한 다이 수", 17, True, INK), ("2TB · 30 DWPD · 5년", 16, False, GRAY)], spacing=1.0)
EB, EH = 6.50, 1.70
for k, (lab, v, col) in enumerate([("SSD 혼자", 120, GRAY_2), ("고객과 함께", 47, BLUE)]):
    bx = ex + 0.12 + k * 1.05
    h = EH * v / 120
    rect(s, bx, EB - h, 0.66, h, fill=col)
    tb(s, bx - 0.25, EB - h - 0.36, 1.16, 0.34, [(f"약 {v}", 17, True, BLUE if k else INK)], align=C)
    tb(s, bx - 0.30, EB + 0.04, 1.26, 0.30, [(lab, 16, False, GRAY)], align=C)
tb(s, x + 0.24, KY, w - 0.4, 0.70, [[("다이 ", 22, True, BLUE), ("-60%", 40, True, BLUE), ("  같은 SLC 모드에서", 18, True, INK)]], anchor=MID)
tb(s, x + 0.24, KY + 0.72, w - 0.4, 0.40, [("데이터가 언제 지워질지는 고객 SW만 압니다", 18, False, GRAY)])

# ---- 카드 아래: 신호(▲ 확대 · ▼ 축소)
for (x, w), (up, dn) in zip(((G1, GCW), (B1, bw2), (B2, bw2)),
                            (("▲ 착공 지연 · 랙 전력 ↑", "▼ 전력망 완화"),
                             ("▲ 고객 RFQ에 영역 비율 요구", "▼ 직접 쓰기 QLC 확산"),
                             ("▲ 고객 RFQ의 30 DWPD 요구", "▼ KV 압축 확산"))):
    tb(s, x + 0.24, GY, w - 0.4, 0.90, [(up, 18, True, BLUE), (dn, 18, False, GRAY)], spacing=1.1)

d.band(s, 9.60, 0.80, "결론", "SSD 안에서 풀 수 있는 것은 지금처럼 잘하고, 새로 나타난 과제는 다르게 풉니다")
d.footer(s, "Mixed Media: 네임스페이스 2개 · 고객 요구 pSLC 0.5~2%(Kioxia FMS 2025 · 2026), 쓰기 75%가 16KiB 이하(Alibaba 블록 스토리지), WAF 70+ → 1.02(CSAL 백서, 별도 캐시 드라이브 구성) · "
            "고DWPD: 1Tb TLC 환산, SLC 모드 P/E 6만, WAF 3 → 1(파생 산술), 30 DWPD 요구는 [사내 확인] · 고용량: 245TB 1,024개 → 512TB 약 2,133개 다이")
d.notes(s, "2장입니다. 지금 보이는 신호에 맞춰 준비할 기술을 두 묶음으로 나눴습니다. "
        "왼쪽 회색은 SSD 안에서 풀 수 있는 고용량입니다. 같은 폼팩터에 다이를 두 배 담고, 늘어난 다이의 고장은 패리티로 견딥니다. 지금 하던 방식으로 잘하면 됩니다. "
        "오른쪽 파란색은 새로 나타난 과제 두 가지입니다. 첫째, Mixed Media입니다. 핵심은 QLC에 캐시를 붙이는 것이 아니라, 한 드라이브 안에 빠른 pSLC 영역과 큰 QLC 영역을 별도 네임스페이스로 두고, 고객 소프트웨어가 WAL이나 메타데이터 같은 작은 쓰기는 pSLC로, 객체나 데이터셋은 QLC로 직접 보내는 것입니다. "
        "클라우드 블록 스토리지에서는 쓰기의 75퍼센트가 16킬로바이트 이하입니다. 이런 작은 랜덤 쓰기를 QLC에 그대로 쓰면 WAF가 70을 넘을 수 있지만, 빠른 계층에 모았다가 큰 순차 쓰기로 내리면 1.02까지 내려갑니다. 이 수치는 별도 캐시 드라이브를 쓴 Alibaba 사례라 한 드라이브 안의 실측은 아닙니다. "
        "고객이 Kioxia에 요구한 pSLC 비율은 QLC 용량의 0.5에서 2퍼센트입니다. QLC 셀을 pSLC로 쓰면 용량이 4분의 1이 되기 때문에, 비율을 작게 맞추는 것이 중요하고, 어떤 데이터가 작은 쓰기인지는 고객 소프트웨어만 압니다. 그래서 고객과 함께 정해야 합니다. 성능 계층 SSD를 따로 두는 슬롯 비용도 줄어듭니다. "
        "둘째, 고DWPD입니다. SSD 혼자서는 곧 지워질 데이터와 오래 남을 데이터가 한 블록에 섞여 WAF가 3 근처에 머뭅니다. 고객이 수명을 알려 주면 WAF가 1에 가까워지고, 2테라바이트 30 DWPD 제품의 다이가 약 120개에서 47개로 60퍼센트 줄어듭니다. "
        "카드 아래는 신호입니다. 위 삼각형이 보이면 비중을 늘리고, 아래 삼각형이 보이면 줄입니다.")

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
d.notes(s, "4장 실행 전략입니다. 새로 나타난 과제의 요구, 곧 데이터가 언제 지워지는지는 고객 시스템 안에 있습니다. 그래서 지금까지와 다른 방식이 필요하고, 그 방식을 새 과제에 집중합니다. Mixed Media와 고용량은 지금 방식을 유지합니다. "
        "첫째, 계약입니다. 지금은 수량과 가격만 약속합니다. Micron은 Anthropic과의 전략적 계약에서 다년 공급 위에 공동 설계와 운영 통합을 묶었습니다. 우리도 물량 위에 기술 협력을 쌓겠습니다. "
        "둘째, 사람입니다. 스펙 문서로는 명시된 요구만 옵니다. Palantir의 FDE처럼 Co-Design Pod가 고객 AI 데이터센터 안에 상주해 실제 요구를 찾고, 그것을 제품으로 되돌립니다. "
        "셋째, 역량입니다. NAND와 SSD 펌웨어는 강점입니다. 비어 있는 곳은 그 위입니다. KV 캐시 소프트웨어는 LMCache에서 시작했고 Dynamo와 Mooncake로 넓혀야 합니다. 그리고 고객의 지표인 토큰당 비용과 GPU 가동률로 말하는 사람이 필요합니다. "
        "첫 90일에는 다섯 가지를 하겠습니다. 전략 고객 한두 곳을 정해 고DWPD 의제를 맞추고, Co-Design Pod를 꾸리고, 시스템 소프트웨어 전문가 채용을 시작하고, 고객 KV 트레이스로 WAF를 실측하고, 신호 대시보드를 돌리겠습니다. "
        "마지막으로, 실패할 수도 있는 기술에 투자하는 것이 불확실한 미래에 실패하지 않는 불변 전략입니다. 지금 예측할 수 있는 범위 안에서 최선을 다하고, 신호가 바뀌면 판단을 고치겠습니다.")

d.save(os.path.abspath(OUT))
print(f"생성 완료: {os.path.abspath(OUT)} ({len(d.prs.slides._sldIdLst)}장)")
