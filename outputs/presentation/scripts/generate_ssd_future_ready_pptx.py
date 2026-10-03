"""불확실성이 높은 미래에 대응하기 위한 고객 협력 전략: 4장 덱 (2026-10-03 v1.0).

제목 4개를 이어 읽으면 한 문단이 된다(아웃라인 v0.3):
  1 배경   SSD의 다음 수요는 하나로 정해지지 않으며, 지금 보이는 신호들은 서로 다른 기술을 요구합니다
  2 솔루션 SSD 안에서 풀 수 있는 기술은 지금처럼 준비하고, 고객 시스템과 함께 풀어야 하는 과제가 새로 나타나고 있습니다
  3 당위성 해법의 범위는 NAND에서 SSD로 넓어져 왔고, 새로 나타난 과제는 고객 시스템까지 넓어져야 풀립니다
  4 실행   고객 시스템 안으로 들어가는 새로운 방식이 필요하므로, 전략 고객과 계약 · 사람 · 역량으로 함께 설계합니다
  결론     실패할 수도 있는 기술에 투자하는 것이, 불확실한 미래에 실패하지 않는 불변 전략입니다

규율: samsung-memory-ppt-design-skill v2(11절 시각 우선). 본문 18pt 이상 · 출처 15pt · em-dash 금지 · 액센트 Samsung Blue 하나.
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
s = d.slide(1, "배경", "SSD의 다음 수요는 하나로 정해지지 않으며,\n지금 보이는 신호들은 서로 다른 기술을 요구합니다")

# ---- HBM 교훈 띠: 점유율 슬로프 차트 (근거 = 데이터 = 그래프)
SY, SH = 2.34, 1.04
rect(s, MX, SY, CW, SH, fill=PALE, shape=RR)
tb(s, MX + 0.30, SY, 9.6, SH, [[("HBM의 교훈   ", 20, True, BLUE), ("하나의 수요를 늦게 읽으면 첫 호황을 놓칩니다", 20, True, INK)]], anchor=MID)
sx0, sx1 = RIGHT - 6.70, RIGHT - 4.10          # 2022, 2Q25 x


def sy(v):
    return SY + 0.10 + (70 - v) / 60 * 0.66


tb(s, sx0 - 1.90, SY + 0.10, 1.75, 0.66, [("HBM 점유율", 16, False, GRAY)], align=R, anchor=MID)
tb(s, sx0 - 0.45, SY + 0.74, 0.9, 0.28, [("2022", 16, False, GRAY)], align=C)
tb(s, sx1 - 0.45, SY + 0.74, 0.9, 0.28, [("2Q25", 16, False, GRAY)], align=C)
for (a0, a1, col, lg) in [(50, 62, GRAY_2, "sk-hynix"), (40, 17, BLUE, "samsung")]:
    ln = s.shapes.add_connector(1, *(int(v * 914400) for v in (sx0, sy(a0), sx1, sy(a1))))
    ln.line.color.rgb = col
    ln.line.width = 38100
    rect(s, sx0 - 0.07, sy(a0) - 0.07, 0.14, 0.14, fill=col, shape=MSO_SHAPE.OVAL)
    rect(s, sx1 - 0.07, sy(a1) - 0.07, 0.14, 0.14, fill=col, shape=MSO_SHAPE.OVAL)
    d.fit(s, d.logo(lg), sx1 + 0.20, sy(a1) - 0.15, 1.05, 0.30, align="left")
    tb(s, sx1 + 1.35, sy(a1) - 0.18, 2.4, 0.36, [(f"{a0}% → {a1}%", 20 if col == BLUE else 18, True, BLUE if col == BLUE else GRAY)], anchor=MID)

PW, PG = 5.94, 0.30
PX = [MX, MX + PW + PG, MX + 2 * (PW + PG)]
HY = 3.52
d.panel_head(s, PX[0], PW, 1, "AI 추론: 신호가 엇갈린다", y=HY)
d.panel_head(s, PX[1], PW, 2, "인프라: 더 오래 쓴다", y=HY)
d.panel_head(s, PX[2], PW, 3, "랙 공간: 더 귀해진다", y=HY)
TY = 8.70  # 기술 칩

# ---- ① 커지는 신호(정격 · 실측 DWPD 막대, 로그 축) + 줄어드는 신호(읽기:쓰기, SSD 용량)
x0 = PX[0]
tb(s, x0, 4.16, PW, 0.36, [[("▲ 커지는 신호  ", 18, True, BLUE), ("DWPD (로그 축)", 16, False, GRAY)]])
LBW = 1.85
ax0, ax1 = x0 + LBW, x0 + PW - 0.95
lo_, hi_ = math.log10(0.3), math.log10(150)


def xd(v):
    return ax0 + (math.log10(v) - lo_) / (hi_ - lo_) * (ax1 - ax0)


for g in (1, 10, 100):
    rect(s, xd(g) - 0.005, 4.56, 0.01, 1.42, fill=LINE)
    tb(s, xd(g) - 0.35, 5.98, 0.70, 0.30, [(str(g), 16, False, GRAY)], align=C)
rows1 = [("QLC 정격", 0.6, None, GRAY_2, "0.6"), ("KV 캐시 실측", 3.2, None, GRAY, "3.2"), ("AI 전용 SSD", 120, 50, BLUE, "50~120")]
for i, (nm, v, vmin, col, lab) in enumerate(rows1):
    yy = 4.60 + i * 0.46
    tb(s, x0, yy, LBW - 0.1, 0.38, [(nm, 18, i == 2, BLUE if i == 2 else INK)], anchor=MID)
    rect(s, ax0, yy + 0.05, xd(v) - ax0, 0.28, fill=col)
    if vmin:
        rect(s, xd(vmin) - 0.015, yy, 0.03, 0.38, fill=WHITE)
    tb(s, xd(v) + 0.08, yy, 0.95, 0.38, [(lab, 18, True, BLUE if i == 2 else INK)], anchor=MID)
tb(s, x0, 6.40, PW, 0.36, [("▼ 줄어드는 신호", 18, True, GRAY)])
# 읽기 : 쓰기 100% 막대 (CHEOPS'25)
tb(s, x0, 6.80, 2.9, 0.34, [("KV 오프로드 I/O", 16, False, GRAY)])
rect(s, x0, 7.16, 2.80, 0.42, fill=GRAY_2)
rect(s, x0 + 2.80 - 0.05, 7.16, 0.05, 0.42, fill=BLUE)
tb(s, x0 + 0.10, 7.16, 2.0, 0.42, [("읽기 99.5%", 18, True, WHITE)], anchor=MID)
tb(s, x0, 7.62, 2.9, 0.40, [[("쓰기 ", 18, False, GRAY), ("0.5%", 18, True, BLUE)]])
# DeepSeek KV용 SSD 용량 1 → 1/8
bx = x0 + 3.25
tb(s, bx, 6.80, 2.7, 0.34, [("KV용 SSD 용량", 16, False, GRAY)])
d.fit(s, d.logo("deepseek"), bx + 2.20, 6.74, 0.40, 0.40)
BH0 = 0.96
rect(s, bx + 0.10, 8.10 - BH0, 0.70, BH0, fill=GRAY_2)
rect(s, bx + 1.20, 8.10 - BH0 / 8, 0.70, BH0 / 8, fill=GRAY)
tb(s, bx - 0.05, 8.12, 1.0, 0.32, [("이전", 16, False, GRAY)], align=C)
tb(s, bx + 1.05, 8.12, 1.0, 0.32, [("V4.1", 16, False, GRAY)], align=C)
tb(s, bx + 1.95, 7.62, 0.80, 0.40, [("1/8", 22, True, INK)], anchor=MID)
chip(s, x0, TY, PW, 0.60, "→ 고DWPD")

# ---- ② 서버 내용연수 덤벨 + 건물 빅넘버
x0 = PX[1]
rows = [("microsoft", 4, 6), ("google", 4, 6), ("meta", 4, 5.5), ("aws", 3, 6)]
LX, PX0, PX1 = x0, x0 + 1.75, x0 + PW - 0.15
Y0, YP = 4.28, 0.56
lo, hi = 2.5, 6.9


def xv(v):
    return PX0 + (v - lo) / (hi - lo) * (PX1 - PX0)


for g in (3, 4, 5, 6):
    rect(s, xv(g) - 0.005, Y0 - 0.12, 0.01, len(rows) * YP + 0.02, fill=LINE)
    tb(s, xv(g) - 0.4, Y0 + len(rows) * YP - 0.06, 0.8, 0.34, [(f"{g}년", 16, False, GRAY)], align=C)
for i, (lg, a, b) in enumerate(rows):
    y = Y0 + i * YP
    d.fit(s, d.logo(lg), LX, y, 1.50, 0.32 if lg != "aws" else 0.38, align="left")
    rect(s, xv(a), y + 0.155, xv(b) - xv(a), 0.03, fill=GRAY_2)
    rect(s, xv(a) - 0.10, y + 0.07, 0.20, 0.20, fill=GRAY_2, shape=MSO_SHAPE.OVAL)
    rect(s, xv(b) - 0.13, y + 0.04, 0.26, 0.26, fill=BLUE, shape=MSO_SHAPE.OVAL)
tb(s, x0, Y0 + len(rows) * YP + 0.28, PW, 0.34, [[("●", 16, False, GRAY_2), (" 변경 전   ", 16, False, GRAY), ("●", 16, False, BLUE), (" 변경 후  서버 내용연수", 16, False, GRAY)]], align=C)
tb(s, x0, 7.10, PW, 0.80, [[("건물 ", 30, True, BLUE), ("15 → 25", 48, True, BLUE), ("년", 30, True, BLUE)]], anchor=MID)
tb(s, x0, 7.92, PW, 0.40, [("Microsoft 데이터센터 내용연수 (FY27)", 18, False, GRAY)])
chip(s, x0, TY, PW, 0.60, "→ Mixed Media")

# ---- ③ 랙 전력 밀도 (로그 축) + 착공 막대
x0 = PX[2]
bars = [("범용 랙\n평균", 10, "약 10"), ("H100\n공랭", 40, "40"), ("GB300\nNVL72", 140, "약 140"), ("2027\n1MW급", 1000, "1,000")]
BB, BHmax = 6.10, 1.75
bw, bg = 0.92, 0.42
bx0 = x0 + 0.62
for gv in (10, 100, 1000):
    gy = BB - math.log10(gv) / 3 * BHmax
    rect(s, bx0 - 0.10, gy, 4 * bw + 3 * bg + 0.20, 0.012, fill=LINE)
    tb(s, x0 - 0.20, gy - 0.17, 0.74, 0.34, [(f"{gv:,}", 16, False, GRAY)], align=R)
for i, (nm, v, lab) in enumerate(bars):
    h = math.log10(v) / 3 * BHmax
    bx = bx0 + i * (bw + bg)
    last = i == 3
    rect(s, bx, BB - h, bw, h, fill=TINT if last else (GRAY if i == 2 else GRAY_2), line=BLUE if last else None, lw=1.5, dash=last)
    tb(s, bx - 0.3, BB - h - 0.40, bw + 0.6, 0.36, [(lab, 18, True, BLUE if last else INK)], align=C)
    tb(s, bx - 0.3, BB + 0.04, bw + 0.6, 0.62, [(t, 16, False, GRAY) for t in nm.split("\n")], align=C, spacing=1.0)
tb(s, x0, BB + 0.64, PW, 0.32, [("랙 전력 kW (로그 축)", 16, False, GRAY)], align=C)
# 착공 막대: 계획 16GW 중 착공 확인 약 5GW
CY = 7.30
tb(s, x0, CY - 0.06, PW, 0.36, [("2026 미국 가동 계획 (GW, 추정)", 16, False, GRAY)])
rect(s, x0, CY + 0.34, PW - 0.10, 0.46, fill=WHITE, line=GRAY_2, lw=1.0)
rect(s, x0, CY + 0.34, (PW - 0.10) * 5 / 16, 0.46, fill=BLUE)
tb(s, x0 + 0.10, CY + 0.34, 1.7, 0.46, [("착공 약 5", 18, True, WHITE)], anchor=MID)
tb(s, x0 + PW - 2.10, CY + 0.34, 1.9, 0.46, [("계획 16", 18, True, GRAY)], align=R, anchor=MID)
chip(s, x0, TY, PW, 0.60, "→ 고용량")

d.band(s, 9.60, 0.80, "불변 전략", "하나의 미래에 걸지 않고, 지금 보이는 신호마다 준비합니다")
d.footer(s, "출처: HBM 점유율(과제팀 집계) · DWPD: Solidigm P5336, StorageReview KV 캐시 실측(2026-08), Kioxia · Phison · DapuStor 발표(2026) · I/O: CHEOPS'25 · DeepSeek V4.1 보도 · "
            "내용연수: Microsoft IR · 10-K 보도 · 랙: Uptime · SemiAnalysis · NVIDIA · 착공: Sightline 추정(2.3GW 반론 있음)")
d.notes(s, "1장입니다. HBM에서 삼성 점유율은 2022년 40퍼센트에서 2025년 2분기 17퍼센트로, SK하이닉스는 50에서 62퍼센트로 갈렸습니다. 하나의 수요를 늦게 읽으면 첫 호황을 놓친다는 교훈입니다. 그래서 다음 수요를 하나로 단정하지 않고, 지금 보이는 신호를 데이터로 읽었습니다. "
        "첫째, AI 추론이 SSD에 쓰는 양은 신호가 엇갈립니다. 커지는 쪽으로는, QLC 정격이 0.6 DWPD인데 KV 캐시 계층에서 실측한 쓰기는 드라이브당 3.2 DWPD로 3 DWPD 정격 제품을 넘었고, 2026년 AI 전용 SSD는 50에서 120 DWPD로 나왔습니다. "
        "줄어드는 쪽으로는, 학계가 측정한 KV 오프로드 I/O는 읽기가 99.5퍼센트였고, DeepSeek는 새 모델에서 KV 캐시용 SSD 용량을 8분의 1로 줄였다고 보도됐습니다. 그래서 고DWPD는 준비하되 단일 베팅은 하지 않습니다. "
        "둘째, 하이퍼스케일러는 자산을 더 오래 씁니다. 서버 내용연수를 5년에서 6년으로 늘렸고, Microsoft는 데이터센터 건물을 25년 쓰기로 했습니다. 기존 인프라 안에서 빠른 영역과 큰 영역을 함께 주는 Mixed Media가 여기에 대응합니다. "
        "셋째, 랙 공간이 귀해집니다. 랙 전력은 10킬로와트에서 140킬로와트, 2027년에는 1메가와트급을 준비하고 있고, 2026년 미국 가동 계획 16기가와트 가운데 착공이 확인된 것은 약 5기가와트라는 추정이 있습니다. 반론도 있어 범위로 봅니다. 같은 공간에 더 많이 담는 고용량 기술이 여기에 대응합니다. "
        "하나의 미래에 걸지 않고, 지금 보이는 신호마다 준비하는 것, 이것을 불변 전략이라고 부르겠습니다. 다만 이 신호들이 미래의 전부라고 말씀드리지는 않습니다. 지금 예측할 수 있는 범위 안의 준비입니다.")

# =============================================================== 2 솔루션
s = d.slide(2, "솔루션", "SSD 안에서 풀 수 있는 기술은 지금처럼 준비하고,\n고객 시스템과 함께 풀어야 하는 과제가 새로 나타나고 있습니다")

GT, GB = 2.34, 9.42
GWG = 8.40
BXG, BWG = MX + GWG + 0.30, CW - GWG - 0.30
rect(s, MX, GT, GWG, GB - GT, fill=PALE, shape=RR)
rect(s, BXG, GT, BWG, GB - GT, fill=TINT, line=BLUE, lw=1.5, shape=RR)
tb(s, MX + 0.26, GT + 0.08, GWG - 0.4, 0.52, [[("SSD 안에서  ", 24, True, GRAY), ("지금처럼", 24, True, INK)]], anchor=MID)
tb(s, BXG + 0.26, GT + 0.08, BWG - 0.4, 0.52, [[("고객 시스템과 함께  ", 24, True, BLUE), ("새로 나타남", 24, True, INK)]], anchor=MID)
CT, CB = 3.02, 9.24
gw2 = (GWG - 0.60) / 2
G1, G2 = MX + 0.20, MX + 0.40 + gw2
BC, BCW = BXG + 0.20, BWG - 0.40
KY, GY = 7.02, 8.28
for x, w in ((G1, gw2), (G2, gw2), (BC, BCW)):
    rect(s, x, CT, w, CB - CT, fill=WHITE, shape=RR)
    rect(s, x + 0.24, GY - 0.10, w - 0.48, 0.012, fill=LINE)


def drive(s, x, y, w, h, slc=0.0, fill=GRAY_2, slc_fill=BLUE_T1):
    """드라이브 슬롯 아이콘(세로 막대). slc = 위쪽 pSLC 영역 비율."""
    rect(s, x, y, w, h, fill=fill, shape=RR)
    if slc:
        rect(s, x, y, w, h * slc, fill=slc_fill, shape=RR)


# ---- ① Mixed Media: 캐시 SSD를 따로 사면 슬롯 +1, 한 드라이브 안 pSLC면 +0
x, w = G1, gw2
tb(s, x + 0.24, CT + 0.10, w - 0.4, 0.48, [("Mixed Media", 24, True, INK)], anchor=MID)
for r, (lab, extra, slc, tag, hot) in enumerate([("캐시 SSD를 따로", True, 0.0, "슬롯 +1", False),
                                                  ("한 드라이브 안에 pSLC", False, 0.24, "슬롯 +0", True)]):
    ry = 3.78 + r * 1.52
    tb(s, x + 0.24, ry, w - 0.4, 0.36, [(lab, 18, True, BLUE if hot else GRAY)])
    for k in range(4):
        drive(s, x + 0.30 + k * 0.46, ry + 0.42, 0.36, 0.88, slc=slc)
    if extra:
        drive(s, x + 0.30 + 4 * 0.46, ry + 0.42, 0.36, 0.88, fill=BLUE_T1)
    tb(s, x + 2.66, ry + 0.42, w - 2.80, 0.88, [(tag, 20, True, BLUE if hot else GRAY)], anchor=MID)
tb(s, x + 0.24, KY, w - 0.4, 0.70, [[("추가 슬롯 ", 22, True, BLUE), ("0", 44, True, BLUE), ("개", 22, True, BLUE)]], anchor=MID)
tb(s, x + 0.24, KY + 0.72, w - 0.4, 0.40, [("24베이 서버에 pSLC 19.2TB", 18, False, GRAY)])

# ---- ② 고용량: 같은 폼팩터에 다이 ×2, 고장 다이는 패리티로
x, w = G2, gw2
tb(s, x + 0.24, CT + 0.10, w - 0.4, 0.48, [("고용량", 24, True, INK)], anchor=MID)
OW, OH = 1.62, 2.45
for k, (rows_, lab1, lab2, bad) in enumerate([(4, "245TB", "1,024 다이", None), (8, "512TB", "약 2,133 다이", (5, 2))]):
    ox, oy = x + 0.30 + k * (OW + 0.40), 3.78
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
if True:
    tb(s, x + 0.24, 6.62, w - 0.4, 0.34, [[("■", 16, False, INK), (" 고장 다이  ", 16, False, GRAY), ("■", 16, False, BLUE_T2), (" 패리티", 16, False, GRAY)]], align=C)
tb(s, x + 0.24, KY, w - 0.4, 0.70, [[("다이 ", 22, True, BLUE), ("×2", 44, True, BLUE)]], anchor=MID)
tb(s, x + 0.24, KY + 0.72, w - 0.4, 0.40, [("같은 폼팩터, 고장은 패리티로", 18, False, GRAY)])

# ---- ③ 고DWPD: 왜 고객과 함께인가 (블록 그림) + 효과 (다이 수)
x, w = BC, BCW
tb(s, x + 0.24, CT + 0.10, w - 0.4, 0.48, [[("고DWPD", 24, True, INK), ("   2TB · 30 DWPD", 20, True, BLUE)]], anchor=MID)
SHORT, LONG = BLUE_T2, GRAY_2


def block(s, bx, by, cells, cs=0.30, cols=4, gap=0.05):
    rows = len(cells) // cols
    rect(s, bx - 0.08, by - 0.08, cols * (cs + gap) - gap + 0.16, rows * (cs + gap) - gap + 0.16, fill=WHITE, line=GRAY, lw=1.0)
    for i, c in enumerate(cells):
        rect(s, bx + (i % cols) * (cs + gap), by + (i // cols) * (cs + gap), cs, cs, fill=c)


mix = [SHORT, LONG, SHORT, LONG, LONG, SHORT, LONG, SHORT, SHORT, LONG, SHORT, LONG]
CS = 0.26
for r, (lab, hot) in enumerate([("SSD 혼자: 수명이 섞인다", False), ("고객이 수명을 알려 주면 (FDP)", True)]):
    ry = 3.62 + r * 1.56
    tb(s, x + 0.24, ry, 5.6, 0.36, [(lab, 18, True, BLUE if hot else GRAY)])
    b1, b2 = (mix, mix[::-1]) if not hot else ([SHORT] * 12, [LONG] * 12)
    block(s, x + 0.40, ry + 0.52, b1, cs=CS)
    block(s, x + 1.86, ry + 0.52, b2, cs=CS)
    t1, t2 = ("지울 때마다", "유효 데이터 복사") if not hot else ("블록 통째로 삭제", "복사 없음")
    tb(s, x + 3.28, ry + 0.48, 2.05, 0.90, [(t1, 16, False, GRAY), (t2, 18, True, BLUE if hot else INK)], anchor=MID, spacing=1.0)
    tb(s, x + 5.34, ry + 0.48, 0.92, 0.90, [("WAF", 16, False, GRAY), ("≈ 1" if hot else "≈ 3", 30, True, BLUE if hot else GRAY)], anchor=MID, spacing=1.0)
tb(s, x + 0.24, 6.66, 6.0, 0.32, [[("■", 16, False, SHORT), (" 곧 지워질 데이터   ", 16, False, GRAY), ("■", 16, False, LONG), (" 오래 남을 데이터", 16, False, GRAY)]])
# 구분선 + 효과 막대
rect(s, x + 6.28, 3.62, 0.012, 3.30, fill=LINE)
ex = x + 6.45
tb(s, ex, 3.62, w - 6.6, 0.62, [("필요한 다이 수", 18, True, INK), ("2TB · 30 DWPD · 5년", 16, False, GRAY)], spacing=1.0)
EB, EH = 6.50, 1.70
for k, (lab, v, col) in enumerate([("SSD 혼자", 120, GRAY_2), ("고객과 함께", 47, BLUE)]):
    bx = ex + 0.20 + k * 1.30
    h = EH * v / 120
    rect(s, bx, EB - h, 0.78, h, fill=col)
    tb(s, bx - 0.25, EB - h - 0.38, 1.28, 0.36, [(f"약 {v}", 18, True, BLUE if k else INK)], align=C)
    tb(s, bx - 0.30, EB + 0.04, 1.38, 0.34, [(lab, 16, False, GRAY)], align=C)
tb(s, x + 0.24, KY, w - 0.4, 0.70, [[("다이 ", 22, True, BLUE), ("-60%", 44, True, BLUE), ("   데이터가 언제 지워질지는 고객 소프트웨어만 압니다", 20, True, INK)]], anchor=MID)
tb(s, x + 0.24, KY + 0.72, w - 0.4, 0.40, [("같은 SLC 모드, WAF 3 → 1만으로", 18, False, GRAY)])

# ---- 카드 아래: 신호(▲ 확대 · ▼ 축소)
for (x, w), (up, dn) in zip(((G1, gw2), (G2, gw2), (BC, BCW)),
                            (("▲ 내용연수 연장", "▼ 그린필드 증설"), ("▲ 착공 지연", "▼ 전력망 완화"),
                             ("▲ 고객 RFQ의 30 DWPD 요구", "▼ KV 압축 확산"))):
    tb(s, x + 0.24, GY, w - 0.4, 0.90, [(up, 18, True, BLUE), (dn, 18, False, GRAY)], spacing=1.1)

d.band(s, 9.60, 0.80, "결론", "SSD 안에서 풀 수 있는 것은 지금처럼 잘하고, 새로 나타난 과제는 다르게 풉니다")
d.footer(s, "다이 수: 1Tb TLC 환산, SLC 모드 P/E 6만, WAF 3 → 1, 이론 비트/셀 비(파생 산술) · WAF ≈ 3 → ≈ 1: FDP 범용 실측 · CacheLib 3.22 → 1.03(EuroSys'25) · "
            "pSLC 19.2TB = 800GB × 24베이(DapuStor 비율) · 다이 ×2: 245TB 1,024개 → 512TB 약 2,133개 · 30 DWPD 요구는 [사내 확인] · 선례: DapuStor · Kioxia(혼합 매체)")
d.notes(s, "2장입니다. 지금 보이는 신호에 맞춰 준비할 기술을 두 묶음으로 나눴습니다. "
        "왼쪽 회색은 SSD 안에서 풀 수 있는 기술입니다. Mixed Media는 캐시 SSD를 따로 사면 슬롯이 하나 더 필요하지만, 드라이브 안에 pSLC 영역을 두면 슬롯이 늘지 않습니다. 24베이 서버라면 19.2테라바이트의 빠른 영역을 추가 슬롯 없이 얻습니다. "
        "고용량은 같은 폼팩터에 다이를 두 배 담고, 늘어난 다이의 고장은 패리티로 견딥니다. 이 두 기술은 지금 하던 방식으로 잘하면 됩니다. "
        "오른쪽 파란색은 새로 나타난 과제, 고DWPD입니다. SSD 혼자서는 곧 지워질 데이터와 오래 남을 데이터가 한 블록에 섞여, 블록을 지울 때마다 유효 데이터를 옮겨 써야 하고 WAF가 3 근처에 머뭅니다. "
        "고객이 데이터의 수명을 알려 주면 수명이 같은 데이터끼리 모아 블록을 통째로 지울 수 있어 WAF가 1에 가까워집니다. "
        "2테라바이트 30 DWPD 제품을 같은 SLC 모드로 만들 때, 이것만으로 필요한 다이가 약 120개에서 47개로 60퍼센트 줄어듭니다. 데이터가 언제 지워질지는 고객 소프트웨어만 압니다. 그래서 이 과제는 고객과 함께 풀어야 합니다. "
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
    (MX + 11.85, 6.57, 2.96, BLUE, "고객 시스템과 공동 설계", "2022~", "WAF 3.22 → 1.03", "데이터 수명은 고객 시스템만 안다", "다음 칸"),
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
          ("SSD FW", "강점", "on", "FDP · WAF 텔레메트리", BLUE_T1),
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
