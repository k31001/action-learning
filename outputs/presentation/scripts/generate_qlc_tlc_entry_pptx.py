"""고객과 함께 WAF를 낮춰, TLC 시장을 QLC로: 본문 4장 + 별첨 2장 덱 (아웃라인 v0.2, 2026-10-09).

제목 4개를 이어 읽으면 한 문단이 된다:
  1 배경   고객은 더 많은 데이터를 더 낮은 TCO로 저장하길 원하지만, 정격 DWPD는 계속 내려왔습니다
  2 원인   P/E는 100배 줄었는데 WAF는 SSD 혼자 낮추지 못했고, 고객 시스템과 함께 설계해야 1에 가까워집니다
  3 기회   eSSD 수요의 대부분은 1 DWPD 이하의 TLC이므로, QLC가 꼬리 지연을 넘으면 원가 우위로 이 시장에 들어갑니다
  4 실행   고객 협력은 계약 · 사람 · 역량으로 실행하고, 생산자원당 공헌이익으로 성과를 봅니다
  A1 · A2  핵심 데이터 별첨(시장 · 경제성, 기술 근거)

규율: samsung-memory-ppt-design-skill v2.1(11절 시각 우선, 11.J 근거 사슬). 본문 18pt 이상 · 출처 15pt · em-dash 금지 · 액센트 Samsung Blue 하나.
원고 · 근거: outputs/presentation/qlc-tlc-market-entry-outline.md, wiki/strategies/qlc-tlc-market-entry.md,
sources/articles/tlc-to-qlc-addressable-market-2026-10.md(TQ), sources/articles/qlc-waf-qos-op-factcheck-2026-10.md(WQ · P).
"""
import json
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
OUT = os.environ.get("OUT_PATH") or os.path.join(HERE, "..", "qlc-tlc-market-entry.pptx")

d = Deck("고객과 함께 WAF를 낮춰, TLC 시장을 QLC로", total=6,
         logos_dir=os.path.join(ASSETS, "logos"), photos_dir=os.path.join(ASSETS, "photos"),
         renders_dir=os.path.join(ASSETS, "survival"))
tb, rect, label_box = d.tb, d.rect, d.label_box
L, C, R = PP_ALIGN.LEFT, PP_ALIGN.CENTER, PP_ALIGN.RIGHT
MID = MSO_ANCHOR.MIDDLE
RR = MSO_SHAPE.ROUNDED_RECTANGLE


def line(s, x0, y0, x1, y1, col=GRAY_2, w=1.0, dash=False):
    ln = s.shapes.add_connector(1, *(int(v * 914400) for v in (x0, y0, x1, y1)))
    ln.line.color.rgb = col
    ln.line.width = int(w * 12700)
    if dash:
        ln.line.dash_style = 4
    return ln


def hbar(s, x, y, w, h, lo, hi, vmax, col, ext=None):
    """가로 범위 막대: 0~lo 진하게, lo~hi 연하게(ext). 오른쪽 끝 x 반환."""
    wl = w * lo / vmax
    rect(s, x, y, max(wl, 0.02), h, fill=col)
    if hi and hi > lo:
        rect(s, x + wl, y, w * (hi - lo) / vmax, h, fill=ext or BLUE_T2)
        return x + w * hi / vmax
    return x + wl


def wordmark(s, text, x, y, h=0.34, size=16):
    return d.chip(s, text, x, y, h, size=size)


# =============================================================== 1 배경
s = d.slide(1, "배경", "고객은 더 많은 데이터를 더 낮은 TCO로 저장하길 원하지만,\n정격 DWPD는 계속 내려왔습니다")
P1, W1 = MX, 5.60
P2, W2 = P1 + W1 + 0.20, 5.20
P3, W3 = P2 + W2 + 0.20, RIGHT - (P2 + W2 + 0.20)
PT, PB = 2.34, 9.20

# ---- ① 교훈: HBM 슬로프 + 신문섭 인용 + Solidigm 2023
d.panel_head(s, P1, W1, 1, "교훈: 수요를 함께 만든다")
rect(s, P1, 3.00, W1, PB - 3.00, fill=PALE, shape=RR)
tb(s, P1 + 0.24, 3.10, W1 - 0.48, 0.36, [("HBM 점유율, 수요를 늦게 읽은 대가", 18, True, INK)], anchor=MID)
ST = 3.62
sx0, sx1 = P1 + 1.20, P1 + 2.70


def sy(v):
    return ST + (68 - v) / 55 * 1.30


for (a0, a1, col, lg) in [(50, 62, GRAY_2, "sk-hynix"), (40, 17, BLUE, "samsung")]:
    line(s, sx0, sy(a0), sx1, sy(a1), col, 3.0)
    rect(s, sx0 - 0.07, sy(a0) - 0.07, 0.14, 0.14, fill=col, shape=MSO_SHAPE.OVAL)
    rect(s, sx1 - 0.07, sy(a1) - 0.07, 0.14, 0.14, fill=col, shape=MSO_SHAPE.OVAL)
    tb(s, sx0 - 0.80, sy(a0) - 0.17 + (-0.10 if a0 == 50 else 0.10), 0.68, 0.34, [(f"{a0}%", 16, False, GRAY)], align=R, anchor=MID)
    tb(s, sx1 + 0.12, sy(a1) - 0.17, 0.70, 0.34, [(f"{a1}%", 18, True, col)], anchor=MID)
    d.fit(s, d.logo(lg), sx1 + 0.84, sy(a1) - 0.13, 1.00, 0.26, align="left")
tb(s, sx0 - 0.45, ST + 1.36, 0.9, 0.28, [("2022", 16, False, GRAY)], align=C)
tb(s, sx1 - 0.45, ST + 1.36, 0.9, 0.28, [("2Q25", 16, False, GRAY)], align=C)
QY = 5.50
rect(s, P1 + 0.24, QY, 0.06, 1.70, fill=BLUE)
tb(s, P1 + 0.44, QY - 0.02, W1 - 0.70, 1.30, [("“고객의 아키텍처 안으로 들어가", 20, True, INK), ("수요를 함께 설계하는 기업이", 20, True, INK),
                                               ("승부를 가져갈 것이다”", 20, True, BLUE)], spacing=1.08)
tb(s, P1 + 0.44, QY + 1.30, W1 - 0.70, 0.36, [("신문섭 파트너 · Bain & Company, 2026-06", 16, False, GRAY)], anchor=MID)
SY0 = 7.46
tb(s, P1 + 0.24, SY0, W1 - 0.48, 0.36, [("2023 다운턴: 니즈 적중이 회복을 갈랐다", 18, True, INK)], anchor=MID)
wordmark(s, "Solidigm", P1 + 0.24, SY0 + 0.50, 0.40, 16)
for k, (t, hot, xx, ww) in enumerate([("61TB QLC 선행", False, P1 + 1.88, 1.60), ("2024 흑자 전환", True, P1 + 3.62, 1.74)]):
    label_box(s, xx, SY0 + 0.48, ww, 0.44, [(t, 15, True, WHITE if hot else INK)], fill=BLUE if hot else WHITE,
              line=None if hot else LINE)
    if k == 0:
        d.arrow_r(s, xx + ww + 0.02, SY0 + 0.60, 0.10, 0.20)
tb(s, P1 + 0.24, SY0 + 1.02, W1 - 0.48, 0.32, [("낙폭이 가장 깊었던 SK그룹 안에서 일어난 반등", 15, False, GRAY)], anchor=MID)
d.chevron(s, P2 - 0.18, 5.60, w=0.16, h=0.50)

# ---- ② 니즈: 더 많이, 더 낮은 TCO
d.panel_head(s, P2, W2, 2, "니즈: 더 많이, 더 싸게")
tb(s, P2, 3.06, W2, 0.36, [[("PCIe eSSD 수요 ", 18, True, INK), ("EB/년", 16, False, GRAY)]], anchor=MID)
BY1 = 6.20
for k, (yr, v, col) in enumerate([("2026", 509, GRAY_2), ("2030", 1933, BLUE)]):
    bx = P2 + 0.70 + k * 2.10
    hh = 2.50 * v / 1933
    rect(s, bx, BY1 - hh, 1.20, hh, fill=col)
    tb(s, bx - 0.30, BY1 - hh - 0.46, 1.80, 0.42, [(f"{v:,}", 24 if k else 20, True, BLUE if k else INK)], align=C, anchor=MID)
    tb(s, bx - 0.30, BY1 + 0.06, 1.80, 0.32, [(yr, 16, k == 1, INK if k else GRAY)], align=C)
tb(s, P2 + 0.50, 4.30, 1.60, 0.50, [("×3.8", 26, True, BLUE)], align=C, anchor=MID)
rect(s, P2, 6.92, W2, 0.012, fill=LINE)
tb(s, P2, 7.06, W2, 0.36, [("스토리지가 차지하는 비중", 18, True, INK)], anchor=MID)
d.big_number(s, P2, 7.42, W2, "", "33", "%", sub="범용 클라우드 운영 탄소 배출 중 (Azure)")
tb(s, P2, 8.66, W2, 0.40, [("더 많이, 더 낮은 비용 · 전력으로", 18, True, BLUE)], anchor=MID)
d.chevron(s, P3 - 0.18, 5.60, w=0.16, h=0.50)

# ---- ③ 현실: 정격 DWPD 하락 (대표 제품 점 + 전체 중앙값 계단)
d.panel_head(s, P3, W3, 3, "현실: 정격 DWPD는 하락")
DK = json.load(open(os.path.join(ASSETS, "essd_dwpd_key_points.json"), encoding="utf-8"))["points"]
CX0, CX1 = P3 + 0.62, P3 + W3 - 0.20
CY0, CY1 = 3.70, 8.40
YR0, YR1 = 2010.4, 2026.6


def cx(yr):
    return CX0 + (yr - YR0) / (YR1 - YR0) * (CX1 - CX0)


def cy(v):
    return CY1 - v / 10 * (CY1 - CY0)


tb(s, P3, 3.06, W3, 0.36, [[("출시 SSD 정격 DWPD  ", 18, True, INK), ("● 삼성  ● 타사 대표 제품  ○ QLC", 16, False, GRAY)]], anchor=MID)
for v in (0, 2, 4, 6, 8, 10):
    rect(s, CX0, cy(v) - 0.006, CX1 - CX0, 0.012, fill=LINE)
    tb(s, P3, cy(v) - 0.15, 0.52, 0.30, [(str(v), 16, False, GRAY)], align=R, anchor=MID)
for yr in (2011, 2016, 2021, 2026):
    tb(s, cx(yr) - 0.40, CY1 + 0.04, 0.80, 0.28, [(str(yr), 16, False, GRAY)], align=C)
for vend, yr, v, kind, _ in sorted([q for q in DK if q[2] <= 10], key=lambda q: q[0] == "samsung"):
    col = BLUE if vend == "samsung" else GRAY_2
    rect(s, cx(yr) - 0.06, cy(v) - 0.06, 0.12, 0.12, fill=WHITE if kind == "qlc" else col, line=col if kind == "qlc" else None,
         lw=1.5, shape=MSO_SHAPE.OVAL)
# 전체 226개 등급 중앙값 계단 9.6 → 2 → 1
MED = [((2008.0, 2014.99), 9.6), ((2015.0, 2018.99), 2.0), ((2019.0, 2026.5), 1.0)]
for k, ((a0, a1), m) in enumerate(MED):
    x0, x1 = cx(max(a0, YR0)), cx(a1)
    rect(s, x0, cy(m) - 0.03, x1 - x0, 0.06, fill=BLUE)
    if k:
        rect(s, x0 - 0.03, cy(MED[k - 1][1]), 0.06, cy(m) - cy(MED[k - 1][1]), fill=BLUE)
    tb(s, (x0 + x1) / 2 - 0.6, cy(m) + (0.08 if k < 2 else -0.50), 1.2, 0.40, [(f"{m:g}", 24, True, BLUE)], align=C, anchor=MID)
tb(s, cx(2019.2), cy(4.6), cx(2026.5) - cx(2019.2), 0.60, [("전체 제품 중앙값", 16, True, BLUE), ("226개 등급, 특수 제외", 15, False, GRAY)],
   align=C, spacing=1.0)

d.band(s, 9.44, 0.80, "명제", "고객 니즈를 읽고 함께 수요를 만드는 체질로 바꿔야 다음 다운턴에 대비할 수 있습니다", size=23)
d.footer(s, "출처: HBM 과제팀 집계 · 신문섭 인터뷰(2026-06-18) · Solidigm D5-P5336(2023-07) · PCIe eSSD SK hynix(TSMC OIP 2026-09) · Azure 배출(HotCarbon'24) · "
            "정격 DWPD 원장(6개 업체 226개 등급, 5년 보증 환산, 10 초과 제외) · 일부 수치 검색 확인")
d.notes(s, "1장입니다. 지난 다운턴에서 HBM을 늦게 읽은 대가로 삼성의 HBM 점유율은 2022년 40퍼센트에서 2025년 2분기 17퍼센트로 내려왔고, SK하이닉스는 50에서 62퍼센트로 올랐습니다. 고객 수요를 읽어야 한다는 교훈입니다. "
        "Bain의 신문섭 파트너는 여기서 한 걸음 더 나아가, 고객의 아키텍처 안으로 들어가 수요를 함께 설계하는 기업이 승부를 가져갈 것이라고 했습니다. "
        "2023년 다운턴에서도 같은 일이 있었습니다. 낙폭이 가장 깊었던 SK그룹의 Solidigm은 61테라바이트 QLC를 삼성보다 12개월 먼저 내놓았고, 2024년 eSSD 수요 급증의 최대 수혜를 입어 흑자로 돌아섰습니다. "
        "지금 고객의 니즈는 분명합니다. SK하이닉스는 PCIe eSSD 수요가 2026년 509엑사바이트에서 2030년 1,933엑사바이트로 약 3.8배 늘어난다고 봅니다. 동시에 Azure의 범용 클라우드에서 스토리지는 운영 탄소 배출의 33퍼센트를 차지합니다. 고객은 더 많은 데이터를, 더 낮은 TB당 비용과 전력으로 저장하길 원합니다. "
        "그러나 현실은 반대였습니다. 6개 업체 226개 등급의 정격 DWPD 중앙값은 2014년까지 9.6, 2018년까지 2, 그 뒤로는 1입니다. 고객은 더 많이 쓰고 싶어 하는데 SSD가 견디는 쓰기는 줄어 왔습니다. "
        "그래서 고객 니즈를 읽고 고객과 함께 수요를 만드는 체질, 곧 기술과 역량과 고객 관계를 바꿔야 다음 다운턴에 대비할 수 있습니다. 신문섭 파트너의 발언에 다운턴이라는 표현은 없고, 다운턴과의 연결은 2023년 사례로 받쳤습니다.")

# =============================================================== 2 원인 · 해법
s = d.slide(2, "원인 · 해법", "P/E는 100배 줄었는데 WAF는 SSD 혼자 낮추지 못했고,\n고객 시스템과 함께 설계해야 1에 가까워집니다")
LW_ = 8.40
RX, RW = MX + LW_ + 0.60, RIGHT - (MX + LW_ + 0.60)

# ---- 왼쪽 ① 원인
d.panel_head(s, MX, LW_, 1, "원인: SSD 혼자의 한계")
tb(s, MX, 3.04, LW_, 0.36, [[("셀이 견디는 쓰기 (P/E)  ", 18, True, INK), ("로그 축", 16, False, GRAY)]], anchor=MID)
PX0, PX1 = MX + 1.10, MX + LW_ - 1.60
lo_, hi_ = math.log10(50), math.log10(150000)


def px(v):
    return PX0 + (math.log10(v) - lo_) / (hi_ - lo_) * (PX1 - PX0)


for g, lab in ((100, "100"), (1000, "1천"), (10000, "1만"), (100000, "10만")):
    rect(s, px(g) - 0.005, 3.46, 0.01, 1.86, fill=LINE)
    tb(s, px(g) - 0.4, 5.32, 0.8, 0.28, [(lab, 15, False, GRAY)], align=C)
for k, (nm, a, b, hot, lab) in enumerate([("SLC", 30000, 100000, False, "3만~10만"), ("MLC", 3000, 10000, False, "3천~1만"),
                                           ("TLC", 800, 3000, False, "800~3천"), ("QLC", 100, 1000, True, "100~1천")]):
    yy = 3.50 + k * 0.45
    tb(s, MX, yy, 1.0, 0.36, [(nm, 18, True, BLUE if hot else INK)], anchor=MID)
    rect(s, PX0, yy + 0.08, px(a) - PX0, 0.20, fill=LINE)
    rect(s, px(a), yy + 0.08, px(b) - px(a), 0.20, fill=BLUE if hot else GRAY_2)
    tb(s, px(b) + 0.08, yy, 1.60, 0.36, [(lab, 16, hot, BLUE if hot else GRAY)], anchor=MID)
tb(s, MX + LW_ - 1.55, 3.04, 1.55, 0.36, [("약 100배 ↓", 20, True, BLUE)], align=R, anchor=MID)

rect(s, MX, 5.78, LW_, 0.012, fill=LINE)
tb(s, MX, 5.90, LW_, 0.36, [[("SSD 혼자 낸 WAF  ", 18, True, INK), ("4KB 랜덤 쓰기, 100% 채움 실측", 16, False, GRAY)]], anchor=MID)
WX0, WX1 = MX + 2.70, MX + LW_ - 0.80
for k, (nm, v, own) in enumerate([("Kioxia CM7-R", 4.40, False), ("Samsung PM9A3", 4.20, True),
                                   ("Micron 7450 PRO", 3.19, False), ("Micron 7450 MAX", 1.89, False)]):
    yy = 6.36 + k * 0.46
    tb(s, MX, yy, 2.60, 0.38, [(nm, 18, own, BLUE if own else INK)], anchor=MID)
    w = (WX1 - WX0) * v / 4.6
    rect(s, WX0, yy + 0.07, w, 0.24, fill=BLUE if own else GRAY_2)
    tb(s, WX0 + w + 0.08, yy, 0.80, 0.38, [(f"{v:.2f}", 18, True, BLUE if own else INK)], anchor=MID)
label_box(s, MX, 8.30, LW_, 0.56, [[("QLC는 매핑 단위 증폭이 더해짐  ", 18, True, INK), ("4KB 쓰기 정격 = 16KB 정격의 1/4", 18, True, BLUE)]],
          fill=PALE)

# 가운데 화살표
d.arrow_r(s, MX + LW_ + 0.10, 5.40, 0.40, 0.50, fill=BLUE_T2)

# ---- 오른쪽 ② 해법
d.panel_head(s, RX, RW, 2, "해법: 고객 시스템과 함께")
chain = [("고객 호스트", "데이터 수명을 안다"), ("배치 힌트", "FDP"), ("SSD", "GC 감소")]
CWX = (RW - 2 * 0.36) / 3
for k, (a, b) in enumerate(chain):
    xx = RX + k * (CWX + 0.36)
    hot = k == 2
    label_box(s, xx, 3.04, CWX, 0.80, [(a, 19, True, WHITE if hot else INK), (b, 16, False, BLUE_T2 if hot else GRAY)],
              fill=BLUE if hot else PALE)
    if k < 2:
        d.arrow_r(s, xx + CWX + 0.05, 3.32, 0.26, 0.24)
tb(s, RX, 4.10, RW, 0.36, [[("전후 실측  ", 18, True, INK), ("SSD 혼자 → 고객과 함께", 16, False, GRAY)]], anchor=MID)
AX0 = RX + 2.70
AW = RW - 2.70 - 0.90
pairs = [("CacheLib WAF", 3.22, 1.03, "3.22", "1.03", "Meta · 삼성"),
         ("p99.9 테일 지연", 1.00, 0.45, "100", "45", "PM9D3a FDP"),
         ("p99.9 읽기 지연", 1.00, 0.33, "1", "1/2~1/4", "ZNS RocksDB")]
for k, (nm, a, b, la, lb, src) in enumerate(pairs):
    yy = 4.58 + k * 0.92
    tb(s, RX, yy, 2.62, 0.40, [(nm, 18, True, INK)], anchor=MID)
    tb(s, RX, yy + 0.38, 2.62, 0.32, [(src, 15, False, GRAY)], anchor=MID)
    vmax = max(a, 1)
    wa = AW * a / vmax
    wb = AW * b / vmax
    rect(s, AX0, yy + 0.04, wa, 0.30, fill=GRAY_2)
    tb(s, AX0 + wa + 0.06, yy + 0.02, 0.86, 0.34, [(la, 16, True, GRAY)], anchor=MID)
    rect(s, AX0, yy + 0.40, wb, 0.30, fill=BLUE)
    tb(s, AX0 + wb + 0.06, yy + 0.38, 1.60, 0.34, [(lb, 18, True, BLUE)], anchor=MID)
rect(s, RX, 7.40, RW, 0.012, fill=LINE)
tb(s, RX, 7.52, RW, 0.36, [("주요 DC 기업은 이미 SSD를 직접 설계해 시스템과 맞춘다", 18, True, INK)], anchor=MID)
lx = RX
for lg, nm, yr in (("google", None, "2016"), ("alibabacloud", "Alibaba", "2016"), ("aws", None, "2020")):
    if nm:
        d.fit(s, d.logo(lg), lx, 8.00, 0.34, 0.34, align="left")
        tb(s, lx + 0.40, 7.96, 1.10, 0.42, [(nm, 18, True, INK)], anchor=MID)
        lx += 1.50
    else:
        _, _, w_, _ = d.fit(s, d.logo(lg), lx, 7.98, 1.30, 0.38 if lg == "aws" else 0.30, align="left")
        lx += w_ + 0.10
    tb(s, lx, 7.96, 0.80, 0.42, [(yr, 16, False, GRAY)], anchor=MID)
    lx += 0.90
label_box(s, RX, 8.52, RW, 0.48, [[("테일 지연 실측은 TLC 기준.  ", 16, False, GRAY), ("QLC 실측이 첫 공동 검증 과제", 16, True, BLUE)]],
          fill=WHITE, line=BLUE, lw=1.0)

d.band(s, 9.44, 0.80, "결론", "지금까지 소극적이던 고객 시스템 협력을 전략으로 바꿔야 합니다")
d.footer(s, "출처: P/E 범위(공개 문헌) · SSD 단독 WAF(SSD-iq PVLDB'25 저자 데이터, 과제팀 집계) · IU 정격 비(Micron 6600 · 6550 ION, Kioxia LC9) · CacheLib FDP(삼성 · Meta, EuroSys'25) · "
            "PM9D3a FDP(삼성 기술 블로그) · ZNS(USENIX ATC'21) · 자체 설계 원장 · 일부 수치 검색 확인")
d.notes(s, "2장입니다. DWPD가 내려온 이유부터 보겠습니다. 셀이 견디는 쓰기, 곧 P/E는 SLC 3만에서 10만 회에서 QLC 약 1천 회로 약 100배 줄었습니다. "
        "DWPD는 P/E 곱하기 1 더하기 OP를, 일수 곱하기 WAF로 나눈 값입니다. P/E가 줄었으니 WAF를 낮춰야 하는데, SSD 혼자서는 이 값을 낮추지 못했습니다. "
        "4킬로바이트 랜덤 쓰기로 드라이브를 가득 채운 실측에서 SSD 혼자 낸 WAF는 1.89에서 4.40이었습니다. 우리 PM9A3도 4.20입니다. 게다가 고밀도 QLC는 매핑 단위를 16킬로바이트 이상으로 키워, 4킬로바이트 쓰기 정격이 16킬로바이트 정격의 4분의 1입니다. "
        "반대 근거도 있습니다. Micron은 실제 애플리케이션에서 매핑 단위 증폭이 5퍼센트 미만이라고 주장하고, 쓰기가 편중된 워크로드에서는 SSD 안의 GC 개선만으로도 WAF가 크게 줄어듭니다. "
        "그러나 WAF를 1 가까이 낮춘 공개 결과는 모두 고객 호스트가 데이터 수명을 알려 줄 때 나왔습니다. Meta CacheLib에 삼성 엔지니어가 FDP를 넣자 WAF가 3.22에서 1.03이 됐습니다. "
        "삼성 PM9D3a에서 FDP 분류를 최적화하자 WAF가 30퍼센트, p99.9 테일 지연이 55퍼센트 줄었고, ZNS를 쓴 RocksDB는 p99.9 읽기 지연이 2에서 4배 낮았습니다. 다만 이 지연 실측은 모두 TLC이고, QLC에서의 실측은 아직 없습니다. 이것이 고객과 함께 할 첫 검증 과제입니다. "
        "Google, Alibaba, AWS 같은 주요 데이터센터 기업은 이미 SSD를 직접 설계해 자기 시스템과 맞추고 있습니다. 우리는 지금까지 이 협력에 적극적이지 않았습니다. 이제 이것을 전략으로 바꿔야 합니다.")

# =============================================================== 3 기회
s = d.slide(3, "기회", "eSSD 수요의 대부분은 1 DWPD 이하의 TLC이므로,\nQLC가 꼬리 지연을 넘으면 원가 우위로 이 시장에 들어갑니다")
G3 = 0.30
A1x, A1w = MX, 6.40
A2x, A2w = A1x + A1w + G3, 5.70
A3x, A3w = A2x + A2w + G3, RIGHT - (A2x + A2w + G3)
TOPB = 7.66

# ---- ① 깔때기 2030
d.panel_head(s, A1x, A1w, 1, "시장: 2030 전환 가능 규모")
tb(s, A1x, 3.04, A1w, 0.36, [[("EB/년, 2030  ", 18, True, INK), ("진한 = 하단, 연한 = 상단", 16, False, GRAY)]], anchor=MID)
FX0, FW, VM = A1x + 2.20, A1w - 2.20 - 1.70, 2000
for k, (nm, lo, hi, col, ext) in enumerate([("eSSD 전체", 1078, 1933, GRAY_2, LINE), ("TLC", 540, 1200, GRAY_2, LINE),
                                            ("1 DWPD 이하", 400, 1140, GRAY_2, LINE), ("QLC 전환 가능", 120, 800, BLUE, BLUE_T2)]):
    yy = 3.56 + k * 0.92
    hot = k == 3
    tb(s, A1x, yy, 2.12, 0.50, [(nm, 18 if not hot else 19, True, BLUE if hot else INK)], anchor=MID)
    xe = hbar(s, FX0, yy + 0.08, FW, 0.36, lo, hi, VM, col, ext)
    tb(s, xe + 0.06, yy, 1.70, 0.50, [(f"{lo:,}~{hi:,}", 16, hot, BLUE if hot else GRAY)], anchor=MID)
    if k < 3:
        tb(s, FX0 - 0.10, yy + 0.50, 0.6, 0.40, [("↓", 18, True, GRAY_2)], anchor=MID)
rect(s, FX0 + FW * 200 / VM, 3.56 + 3 * 0.92 + 0.02, 0.025, 0.48, fill=INK)
rect(s, FX0 + FW * 570 / VM, 3.56 + 3 * 0.92 + 0.02, 0.025, 0.48, fill=INK)
tb(s, A1x, 7.04, A1w, 0.50, [("전환율 30~70% 가정(근거 없음), 50%면 약 200~570EB", 16, False, GRAY)], anchor=MID)

# ---- ② 내구는 넘는다
d.panel_head(s, A2x, A2w, 2, "내구: QLC로 충분")
tb(s, A2x, 3.04, A2w, 0.36, [[("DWPD  ", 18, True, INK), ("5년 보증 기준", 16, False, GRAY)]], anchor=MID)
DX0, DW_, DVM = A2x + 2.30, A2w - 2.30 - 1.40, 1.1
for v in (0, 0.5, 1.0):
    rect(s, DX0 + DW_ * v / DVM - 0.005, 3.50, 0.01, 3.30, fill=LINE)
    tb(s, DX0 + DW_ * v / DVM - 0.4, 6.80, 0.8, 0.28, [(f"{v:g}", 15, False, GRAY)], align=C)
for k, (nm, sub, lo, hi, col, lab) in enumerate([("고객 실사용", "Microsoft · NetApp", 0.07, 0.36, GRAY_2, "0.07~0.36"),
                                                 ("TLC 범용 정격", "", 1.0, None, GRAY_2, "1"),
                                                 ("QLC 정격", "WAF 2", 0.29, None, GRAY_2, "0.29"),
                                                 ("QLC + 고객 협력", "WAF 1", 0.59, 0.70, BLUE, "0.59~0.70")]):
    yy = 3.56 + k * 0.80
    hot = k == 3
    tb(s, A2x, yy, 2.24, 0.42, [(nm, 18, True, BLUE if hot else INK)], anchor=MID)
    if sub:
        tb(s, A2x, yy + 0.36, 2.24, 0.30, [(sub, 15, False, GRAY)], anchor=MID)
    if k == 0:
        x0 = DX0 + DW_ * lo / DVM
        rect(s, x0, yy + 0.10, DW_ * (hi - lo) / DVM, 0.32, fill=col)
        xe = DX0 + DW_ * hi / DVM
    else:
        xe = hbar(s, DX0, yy + 0.10, DW_, 0.32, lo, hi, DVM, col, BLUE_T2)
    tb(s, xe + 0.06, yy + 0.04, 1.40, 0.40, [(lab, 18 if hot else 16, True, BLUE if hot else GRAY)], anchor=MID)
tb(s, A2x, 7.04, A2w, 0.50, [("실사용은 QLC 천장 안, 남은 문은 꼬리 지연", 16, True, BLUE)], anchor=MID)

# ---- ③ 경제성과 문
d.panel_head(s, A3x, A3w, 3, "원가: 같은 세대 우위")
for k, (lab, num, post, sub) in enumerate([("가격", "0.80", "", "QLC/TLC, 30TB 2Q26"), ("비트 밀도", "1.25", "배", "같은 세대 다이, BiCS8")]):
    xx = A3x + k * (A3w / 2)
    tb(s, xx, 3.04, A3w / 2, 0.34, [(lab, 16, False, GRAY)], anchor=MID)
    tb(s, xx, 3.36, A3w / 2, 0.66, [[(num, 40, True, BLUE if k else INK), (post, 22, True, BLUE if k else INK)]], anchor=MID)
    tb(s, xx, 4.00, A3w / 2, 0.32, [(sub, 15, False, GRAY)], anchor=MID)
label_box(s, A3x, 4.42, A3w, 0.50, [[("웨이퍼당 매출총이익 ", 16, False, INK), ("+0~16%", 20, True, BLUE), ("  산술", 15, False, GRAY)]], fill=TINT)
rect(s, A3x, 5.10, A3w, 0.012, fill=LINE)
tb(s, A3x, 5.20, A3w, 0.36, [[("넘어야 할 문  ", 18, True, INK), ("TLC = 1", 16, False, GRAY)]], anchor=MID)
GX0, GW = A3x + 1.70, A3w - 1.70 - 1.40
for k, (nm, v, lab) in enumerate([("읽기 지연", 1.8, "1.7~1.8배"), ("랜덤 쓰기", 0.43, "1/3~1/2.3")]):
    yy = 5.66 + k * 0.70
    tb(s, A3x, yy, 1.95, 0.40, [(nm, 18, True, INK)], anchor=MID)
    rect(s, GX0, yy + 0.02, GW * 1 / 2, 0.16, fill=GRAY_2)
    rect(s, GX0, yy + 0.22, GW * v / 2, 0.16, fill=BLUE)
    tb(s, GX0 + max(GW * v / 2, GW / 2) + 0.06, yy, 1.40, 0.40, [(lab, 16, True, BLUE)], anchor=MID)
tb(s, A3x, 7.04, A3w, 0.50, [("QLC 고유 지연은 고객 시스템과 함께 숨긴다", 16, True, BLUE)], anchor=MID)

# ---- 아래 띠: 같은 기술의 추가 효과
rect(s, MX, TOPB, CW, 1.62, fill=PALE, shape=RR)
tb(s, MX + 0.30, TOPB + 0.10, 4.0, 0.40, [("같은 기술의 추가 효과", 20, True, INK)], anchor=MID)
# TLC: RI 대 MU 용량
tb(s, MX + 0.30, TOPB + 0.58, 4.2, 0.40, [[("TLC 원가  ", 18, True, BLUE), ("같은 NAND, OP 28 → 7%", 16, False, GRAY)]], anchor=MID)
BXT = MX + 4.70
for k, (nm, v, col) in enumerate([("3 DWPD (OP 28%)", 3.2, GRAY_2), ("1 DWPD (OP 7%)", 3.84, BLUE)]):
    yy = TOPB + 0.20 + k * 0.62
    tb(s, BXT, yy, 2.30, 0.48, [(nm, 16, k == 1, BLUE if k else GRAY)], align=R, anchor=MID)
    w = 2.6 * v / 3.84
    rect(s, BXT + 2.40, yy + 0.08, w, 0.32, fill=col)
    tb(s, BXT + 2.46 + w, yy, 1.10, 0.48, [(f"{v:g}TB", 18, True, BLUE if k else INK)], anchor=MID)
tb(s, BXT + 6.15, TOPB + 0.40, 1.40, 0.80, [("+20%", 32, True, BLUE)], anchor=MID)
tb(s, MX + 0.30, TOPB + 1.02, 4.2, 0.40, [("WAF가 내려가야 수명이 유지", 16, False, GRAY)], anchor=MID)
rect(s, MX + 12.30, TOPB + 0.24, 0.012, 1.14, fill=LINE)
# 초고DWPD: pSLC WAF 3 → 1
XU = MX + 12.55
tb(s, XU, TOPB + 0.10, 5.6, 0.40, [[("초고DWPD 기반  ", 18, True, BLUE), ("pSLC, WAF 3 → 1", 16, False, GRAY)]], anchor=MID)
for k, (nm, v, col) in enumerate([("WAF 3", 7, GRAY_2), ("WAF 1", 21, BLUE)]):
    yy = TOPB + 0.56 + k * 0.48
    tb(s, XU, yy, 1.00, 0.40, [(nm, 16, k == 1, BLUE if k else GRAY)], anchor=MID)
    w = 3.6 * v / 21
    rect(s, XU + 1.05, yy + 0.08, w, 0.26, fill=col)
    tb(s, XU + 1.11 + w, yy, 1.20, 0.40, [(f"{v} DWPD", 16, True, BLUE if k else INK)], anchor=MID)

d.band(s, 9.44, 0.80, "결론", "고객과 함께 QLC의 꼬리 지연을 TLC 수준으로 맞추는 것이 가장 큰 수익성 지렛대입니다", size=23)
d.footer(s, "출처: eSSD SK hynix · McKinsey, QLC 비중 TrendForce · 1 DWPD 이하 Forward Insights(재인용) · 실사용 Microsoft · NetApp · 가격 VDURA(2Q26) · 다이 밀도 Kioxia · TechInsights · "
            "성능 각 사 데이터시트(같은 세대) · OP Solidigm D7-P5520/P5620 · 전환 가능 규모와 이익률은 과제팀 산술(별첨 A1) · 일부 수치 검색 확인")
d.notes(s, "3장, 사업적으로 임팩트가 가장 큰 부분입니다. 2030년 eSSD 수요는 전망에 따라 1,078에서 1,933엑사바이트입니다. QLC 비중을 38에서 50퍼센트로 보면 TLC는 약 540에서 1,200엑사바이트이고, eSSD의 75에서 91퍼센트가 1 DWPD 이하라는 조사를 적용하면 약 400에서 1,140엑사바이트가 1 DWPD 이하의 TLC입니다. "
        "이 가운데 쓰기 대역이나 꼬리 지연 때문에 TLC를 고른 몫을 빼야 하는데, 이 비율을 정량화한 자료는 없습니다. 30에서 70퍼센트로 가정하면 QLC가 들어갈 수 있는 시장은 약 120에서 800엑사바이트이고, 50퍼센트면 약 200에서 570엑사바이트입니다. "
        "내구는 넘습니다. Microsoft와 NetApp 플릿의 실사용은 0.07에서 0.36 DWPD입니다. QLC는 지금 WAF 2 수준에서 약 0.29 DWPD이지만, 고객과 함께 WAF를 1로 낮추면 0.59에서 0.70 DWPD까지 올라 실사용을 덮습니다. "
        "원가는 같은 세대에서 우위입니다. 30테라바이트급에서 QLC 가격은 TLC의 약 80퍼센트이고, 같은 세대 다이의 비트 밀도는 약 1.25배입니다. 웨이퍼 원가가 같다고 보면 웨이퍼당 매출총이익은 0에서 16퍼센트 높습니다. "
        "남은 문은 성능입니다. 같은 세대 데이터시트로 보면 QLC의 읽기 지연은 TLC의 1.7에서 1.8배, 랜덤 쓰기 대역은 3분의 1에서 2.3분의 1입니다. 이 꼬리 지연을 고객 시스템과 함께 숨기는 것이 핵심입니다. "
        "반대 근거도 말씀드립니다. Meta는 QLC가 아직 넓게 배치할 만큼 가격 경쟁력이 없다고 했고, Micron은 TLC로 QLC 가격대 제품을 냈으며, SanDisk는 2030년에도 TLC가 주력이라고 봅니다. 그래서 원가 우위는 최신 세대 QLC에서만 확실합니다. "
        "같은 기술은 TLC에도 효과가 있습니다. 같은 NAND로 3 DWPD 제품은 3.2테라바이트, 1 DWPD 제품은 3.84테라바이트를 팝니다. WAF를 낮춰 OP를 28에서 7퍼센트로 줄이면 판매 용량이 약 20퍼센트 늘어납니다. 다만 데이터 수명이 갈리는 워크로드에서만 효과가 있습니다. "
        "또 pSLC에서 WAF를 3에서 1로 낮추면 7에서 21 DWPD가 되어, 새로 열리는 초고DWPD 시장에 들어갈 기술 기반이 됩니다.")

# =============================================================== 4 실행
s = d.slide(4, "실행", "고객 협력은 계약 · 사람 · 역량으로 실행하고,\n생산자원당 공헌이익으로 성과를 봅니다")
C1, K1 = MX, 5.55
C2, K2 = 6.55, 6.90
C3, K3 = 13.66, 5.55
TOP4, BOT4 = 2.96, 7.40

# ---- ① 계약
d.panel_head(s, C1, K1, 1, "계약: 물량에 기술 협력을")
wm, _ = d.img(s, d.logo("micron"), C1, TOP4 + 0.04, h=0.27)
tb(s, C1 + wm + 0.08, TOP4 - 0.02, 0.40, 0.38, [("↔", 20, True, GRAY)], align=C, anchor=MID)
wa, _ = d.img(s, d.logo("anthropic"), C1 + wm + 0.56, TOP4 + 0.08, h=0.19)
tb(s, C1 + wm + 0.56 + wa + 0.14, TOP4 - 0.02, 1.2, 0.38, [("2026-06", 16, False, GRAY)], anchor=MID)
SW1 = K1 - 1.05
for i, (t, st) in enumerate([("자본 연계 (선택)", "opt"), ("운영 통합", "t1"), ("공동 설계 · 최적화", "hot"), ("MYD (다년 물량)", "base")]):
    yy = TOP4 + 0.56 + i * 0.64
    if st == "opt":
        label_box(s, C1, yy, SW1, 0.54, [(t, 18, False, GRAY)], fill=WHITE, line=GRAY_2, dash=True)
    elif st == "base":
        label_box(s, C1, yy, SW1, 0.54, [(t, 20, True, WHITE)], fill=GRAY_2)
    else:
        label_box(s, C1, yy, SW1, 0.54, [(t, 20, True, WHITE)], fill=BLUE if st == "hot" else BLUE_T1)
by0, by1 = TOP4 + 0.56 + 0.64, TOP4 + 0.56 + 2 * 0.64 + 0.54
rect(s, C1 + SW1 + 0.10, by0, 0.035, by1 - by0, fill=BLUE)
rect(s, C1 + SW1 + 0.02, by0, 0.10, 0.035, fill=BLUE)
rect(s, C1 + SW1 + 0.02, by1 - 0.035, 0.10, 0.035, fill=BLUE)
tb(s, C1 + SW1 + 0.20, by0, 0.85, by1 - by0, [("기술", 18, True, BLUE), ("협력", 18, True, BLUE)], anchor=MID, spacing=1.0)
tb(s, C1, BOT4 - 0.46, K1, 0.44, [("MYD 위에 기술 협력을 쌓습니다", 20, True, BLUE)], anchor=MID)

# ---- ② 사람
d.panel_head(s, C2, K2, 2, "사람: 고객 안에 상주")
d.img(s, d.logo("palantir"), C2, TOP4 + 0.01, h=0.34)
tb(s, C2 + 0.44, TOP4 - 0.02, K2 - 0.44, 0.38, [[("Palantir FDE", 18, True, INK), ("   Anthropic · OpenAI도 채택", 16, False, GRAY)]], anchor=MID)
BY0 = TOP4 + 0.56
BH = BOT4 - 0.56 - BY0
rect(s, C2, BY0, K2, BH, fill=TINT, line=BLUE, lw=1.5, shape=RR)
tb(s, C2 + K2 - 3.3, BY0 + 0.06, 3.1, 0.32, [("고객 AI 데이터센터 안에서", 16, True, BLUE)], align=R, anchor=MID)
KG4 = 0.30
KW4 = (K2 - 0.36 - 2 * KG4) / 3
KY4, KH4 = BY0 + 0.44, BH - 0.58
for k, (obj, verb, ex) in enumerate([("고객 워크로드", "측정 · 분석", "쓰기 크기 · 수명"), ("호스트 SW", "최적화 · 평가", "WAF · p99.9"),
                                     ("차세대 제품", "기술 교류", "사양 · RFQ")]):
    x = C2 + 0.18 + k * (KW4 + KG4)
    rect(s, x, KY4, KW4, KH4, fill=WHITE, line=LINE, lw=0.75, shape=RR)
    rect(s, x + 0.12, KY4 + 0.12, 0.36, 0.36, fill=BLUE, shape=MSO_SHAPE.OVAL)
    tb(s, x + 0.12, KY4 + 0.12, 0.36, 0.36, [(str(k + 1), 16, True, WHITE)], align=C, anchor=MID)
    tb(s, x + 0.08, KY4 + 0.60, KW4 - 0.16, 1.10, [(obj, 16, False, GRAY), (verb, 19, True, BLUE), (ex, 15, False, GRAY)],
       align=C, anchor=MID, spacing=1.05)
    if k < 2:
        d.chevron(s, x + KW4 + 0.07, KY4 + KH4 / 2 - 0.25, w=0.16, h=0.50, fill=BLUE_T1)
tb(s, C2, BOT4 - 0.46, K2, 0.44, [("고객 안에서 요구를 찾고 수요를 함께 만듭니다", 20, True, BLUE)], anchor=MID)

# ---- ③ 역량
d.panel_head(s, C3, K3, 3, "역량: 고객처럼 보는 눈")
LW3, CWN, G3_, CWF = 1.70, 1.20, 0.10, 2.55
cxn, cxf = C3 + LW3, C3 + LW3 + CWN + G3_
tb(s, cxn, TOP4, CWN, 0.36, [("지금", 18, True, GRAY_2)], align=C)
tb(s, cxf, TOP4, CWF, 0.36, [("필요한 기술", 18, True, BLUE)], align=C)
layers = [("AI DC 운영", "없음", "off", "TCO · 추론 SLO", BLUE),
          ("KV 캐시 SW", "LMCache", "part", "Dynamo · Mooncake", BLUE),
          ("커널 · I/O", "일부", "part", "io_uring · NIXL", BLUE),
          ("SSD FW", "강점", "on", "FDP · QoS", BLUE_T1),
          ("NAND", "강점", "on", "최신 세대 QLC", BLUE_T2)]
RY3, RP3, RH3 = TOP4 + 0.44, 0.56, 0.48
for r, (nm, now_t, st, need, col) in enumerate(layers):
    yy = RY3 + r * RP3
    tb(s, C3, yy, LW3 - 0.08, RH3, [(nm, 18, True, BLUE if r < 3 else GRAY)], anchor=MID)
    if st == "on":
        label_box(s, cxn, yy, CWN, RH3, [(now_t, 18, True, WHITE)], fill=GRAY_2)
    elif st == "part":
        label_box(s, cxn, yy, CWN, RH3, [(now_t, 18, True, GRAY)], fill=PALE)
    else:
        label_box(s, cxn, yy, CWN, RH3, [(now_t, 18, True, GRAY)], fill=WHITE, line=GRAY_2, dash=True)
    label_box(s, cxf, yy, CWF, RH3, [(need, 17, True, WHITE if r < 4 else INK)], fill=col)
tb(s, C3, BOT4 - 0.46, K3, 0.44, [("엔지니어 수준의 고객 관계까지", 20, True, BLUE)], anchor=MID)

# ---- 하단: 시점 + KPI
rect(s, MX, 7.52, CW, 0.012, fill=LINE)
tb(s, MX, 7.64, 2.0, 0.40, [("시점", 18, True, INK)], anchor=MID)
T0 = MX + 1.30
TW = (CW - 1.30 - 0.20) / 2
for k, (yr, txt, hot) in enumerate([("2026~27 공급 부족기", "공동 검증: QLC 꼬리 지연 실측 · 레퍼런스", False),
                                     ("2028~ 공급 완화", "TLC 시장의 QLC 본격 전환, TCO 기반 장기 계약", True)]):
    xx = T0 + k * (TW + 0.20)
    rect(s, xx, 7.64, TW, 0.52, fill=BLUE if hot else PALE, shape=MSO_SHAPE.PENTAGON if k == 0 else MSO_SHAPE.CHEVRON)
    tb(s, xx + 0.30, 7.64, TW - 0.60, 0.52, [[(yr + "  ", 18, True, WHITE if hot else INK), (txt, 16, False, WHITE if hot else GRAY)]], anchor=MID)
tb(s, MX, 8.44, 2.0, 0.40, [("KPI", 18, True, INK)], anchor=MID)
KPIS = [("NAND 생산자원당 공헌이익", True), ("QLC 전환율", False), ("WAF", False), ("p99.9 지연", False)]
kx = T0
for t, hot in KPIS:
    w = 0.50 + 0.25 * len(t)
    label_box(s, kx, 8.40, w, 0.50, [(t, 18, True, WHITE if hot else BLUE)], fill=BLUE if hot else WHITE, line=None if hot else BLUE)
    kx += w + 0.18
tb(s, kx + 0.10, 8.40, RIGHT - kx - 0.10, 0.50, [("기존 고객 협력 전략과 같은 방식, 성과 지표만 더합니다", 16, False, GRAY)], anchor=MID)

d.band(s, 9.44, 0.80, "결론", "고객과 함께 수요를 만드는 체질이 다음 다운턴을 버티는 힘입니다")
d.footer(s, "벤치마크: Micron ↔ Anthropic 전략적 계약(2026-06-22) · Palantir · OpenAI FDE(고객 상주) · LMCache FDP 머지(2026-08) · 공급 완화 시점 TrendForce · Gartner(2H27) · "
            "KPI는 과제팀 제안 · 로고는 식별 표시")
d.notes(s, "4장 실행입니다. 고객 협력을 이끌어 내고 실행하는 방식은 기존 전략과 같습니다. "
        "첫째, 계약입니다. 지금의 Multi-Year Deal 위에 공동 설계와 최적화, 운영 통합을 쌓습니다. Micron은 Anthropic과의 전략적 계약에서 다년 공급 위에 공동 설계를 묶었습니다. "
        "둘째, 사람입니다. Palantir의 FDE처럼 고객 AI 데이터센터 안에 상주하며 세 가지를 합니다. 고객 워크로드의 쓰기 크기와 데이터 수명을 재고, 호스트 소프트웨어와 SSD를 함께 최적화해 WAF와 p99.9 지연으로 평가하고, 그 결과를 차세대 제품 사양과 RFQ로 굳힙니다. "
        "셋째, 역량입니다. NAND와 SSD 펌웨어는 강점이고, 비어 있는 곳은 그 위의 KV 캐시 소프트웨어, 커널과 I/O, 데이터센터 운영입니다. 엔지니어 수준의 고객 관계까지 넓혀야 합니다. "
        "시점은 둘로 나눕니다. 공급이 부족한 2026년과 2027년에는 QLC가 비싸 전환을 설득하기 어렵습니다. 이때 고객과 함께 QLC의 FDP 꼬리 지연을 실측해 레퍼런스를 만듭니다. 공급이 풀리는 2028년 전후에 TLC 시장의 QLC 전환을 본격화하고 TCO 기반 장기 계약과 묶습니다. "
        "성과는 NAND 생산자원당 공헌이익으로 봅니다. 공급이 제약될 때는 웨이퍼가 병목이기 때문입니다. 여기에 QLC 전환율, WAF, p99.9 지연을 함께 봅니다. "
        "고객과 함께 수요를 만드는 체질이 다음 다운턴을 버티는 힘입니다.")

# =============================================================== A1 별첨: 시장 · 경제성
s = d.slide(5, "별첨 1", "QLC가 들어갈 TLC 시장은 2030년 약 120~800EB이고,\n같은 세대에서 QLC의 비트 밀도는 TLC의 약 1.25배입니다")
QW = (CW - 0.40) / 2
Q1x, Q2x = MX, MX + QW + 0.40
QT1, QT2 = 2.34, 6.06
QH = 3.30


def qhead(x, y, no, text):
    rect(s, x, y, 0.40, 0.40, fill=BLUE, shape=MSO_SHAPE.OVAL)
    tb(s, x, y, 0.40, 0.40, [(str(no), 16, True, WHITE)], align=C, anchor=MID)
    tb(s, x + 0.52, y - 0.02, QW - 0.52, 0.44, [(text, 20, True, INK)], anchor=MID)


# ① 수요 · QLC 비중
qhead(Q1x, QT1, 1, "수요는 늘고 QLC 비중이 오른다")
SRC = [("PCIe eSSD · SK hynix", [("2026", 509), ("2030", 1933)]), ("eSSD · McKinsey", [("2024", 181), ("2030", 1078)])]
for g, (nm, vals) in enumerate(SRC):
    gx = Q1x + 0.10 + g * 3.30
    tb(s, gx, QT1 + 0.54, 3.10, 0.32, [(nm, 16, True, GRAY)], anchor=MID)
    for k, (yr, v) in enumerate(vals):
        bx = gx + 0.30 + k * 1.30
        hh = 1.80 * v / 1933
        base = QT1 + 3.00
        rect(s, bx, base - hh, 0.80, hh, fill=BLUE if k else GRAY_2)
        tb(s, bx - 0.30, base - hh - 0.36, 1.40, 0.34, [(f"{v:,}", 18, True, BLUE if k else INK)], align=C, anchor=MID)
        tb(s, bx - 0.30, base + 0.02, 1.40, 0.28, [(yr, 15, False, GRAY)], align=C)
qx = Q1x + 6.80
tb(s, qx, QT1 + 0.54, QW - 6.80, 0.32, [("eSSD 용량 중 QLC", 16, True, GRAY)], anchor=MID)
for k, (yr, v) in enumerate([("2026", 18), ("2027", 38)]):
    bx = qx + 0.20 + k * 1.10
    hh = 1.80 * v / 50
    base = QT1 + 3.00
    rect(s, bx, base - hh, 0.70, hh, fill=BLUE if k else GRAY_2)
    tb(s, bx - 0.30, base - hh - 0.36, 1.30, 0.34, [(f"{v}%", 18, True, BLUE if k else INK)], align=C, anchor=MID)
    tb(s, bx - 0.30, base + 0.02, 1.30, 0.28, [(yr, 15, False, GRAY)], align=C)

# ② 1 DWPD 이하 비중 + 실사용
qhead(Q2x, QT1, 2, "eSSD 대부분은 1 DWPD 이하로 쓰인다")
tb(s, Q2x, QT1 + 0.54, 5.6, 0.32, [("1 DWPD 이하 비중, Forward Insights 재인용", 16, True, GRAY)], anchor=MID)
for k, (nm, v) in enumerate([("2017 출하", 75), ("2019 배치", 80), ("SATA", 82.3), ("PCIe", 91)]):
    yy = QT1 + 0.96 + k * 0.48
    tb(s, Q2x, yy, 1.40, 0.40, [(nm, 16, False, INK)], anchor=MID)
    w = 3.20 * v / 100
    rect(s, Q2x + 1.45, yy + 0.08, w, 0.24, fill=BLUE if k == 3 else GRAY_2)
    tb(s, Q2x + 1.50 + w, yy, 0.90, 0.40, [(f"{v:g}%", 16, True, BLUE if k == 3 else INK)], anchor=MID)
rx = Q2x + 5.70
tb(s, rx, QT1 + 0.54, QW - 5.70, 0.32, [("실사용 DWPD", 16, True, GRAY)], anchor=MID)
for k, (nm, v) in enumerate([("Microsoft 플릿", "0.07~0.23"), ("NetApp 중앙값", "0.36"), ("NetApp 3 초과", "7%")]):
    yy = QT1 + 0.96 + k * 0.62
    tb(s, rx, yy, QW - 5.70, 0.30, [(nm, 15, False, GRAY)], anchor=MID)
    tb(s, rx, yy + 0.26, QW - 5.70, 0.36, [(v, 20, True, INK)], anchor=MID)
tb(s, Q2x, QT1 + 2.92, QW, 0.32, [("91%는 QLC 업체(DapuStor) 인용, 반대로 Solidigm은 '85%가 1 DWPD 이상' 인용(충돌)", 15, False, GRAY)], anchor=MID)

# ③ 전환 가능 시장 민감도
qhead(Q1x, QT2, 3, "전환 가능 시장: 전환율 가정에 따라 넓다")
SCN = [("2026", 265, 396), ("2030", 400, 1140)]
cols = [("30%", 0.3), ("50%", 0.5), ("70%", 0.7)]
tb(s, Q1x, QT2 + 0.54, QW, 0.32, [[("1 DWPD 이하 TLC × 전환율  ", 16, True, GRAY), ("EB, 과제팀 산술", 15, False, GRAY)]], anchor=MID)
VX0, VW = Q1x + 1.60, QW - 1.60 - 1.40
for g, (yr, lo, hi) in enumerate(SCN):
    for k, (lab, r) in enumerate(cols):
        yy = QT2 + 0.96 + g * 1.20 + k * 0.36
        if k == 0:
            tb(s, Q1x, yy, 1.0, 0.36, [(yr, 18, True, INK)], anchor=MID)
        tb(s, Q1x + 0.90, yy, 0.66, 0.32, [(lab, 15, False, GRAY)], align=R, anchor=MID)
        a, b = lo * r, hi * r
        hot = g == 1 and k == 1
        x0 = VX0 + VW * a / 800
        rect(s, x0, yy + 0.06, VW * (b - a) / 800, 0.22, fill=BLUE if hot else (BLUE_T2 if g == 1 else GRAY_2))
        tb(s, VX0 + VW * b / 800 + 0.06, yy, 1.40, 0.32, [(f"{a:,.0f}~{b:,.0f}", 15, hot, BLUE if hot else GRAY)], anchor=MID)

# ④ 원가 · 반증
qhead(Q2x, QT2, 4, "원가 우위는 같은 세대에서만 확실하다")
tb(s, Q2x, QT2 + 0.54, 3.0, 0.32, [("30TB 드라이브 가격, 2Q26", 16, True, GRAY)], anchor=MID)
for k, (nm, v) in enumerate([("TLC", 18900), ("QLC", 15120)]):
    yy = QT2 + 0.94 + k * 0.48
    tb(s, Q2x, yy, 0.70, 0.40, [(nm, 16, True, BLUE if k else INK)], anchor=MID)
    w = 1.90 * v / 18900
    rect(s, Q2x + 0.72, yy + 0.08, w, 0.24, fill=BLUE if k else GRAY_2)
    tb(s, Q2x + 0.78 + w, yy, 1.0, 0.40, [(f"${v / 1000:.1f}K", 16, True, BLUE if k else INK)], anchor=MID)
dx = Q2x + 4.10
tb(s, dx, QT2 + 0.54, QW - 4.10, 0.32, [("다이 밀도 Gb/mm²", 16, True, GRAY)], anchor=MID)
for k, (nm, v) in enumerate([("BiCS8 TLC", 18.3), ("BiCS8 QLC", 22.9), ("BiCS10 QLC", 37.0)]):
    yy = QT2 + 0.94 + k * 0.42
    tb(s, dx, yy, 1.40, 0.36, [(nm, 15, k > 0, BLUE if k else INK)], anchor=MID)
    w = 2.0 * v / 37
    rect(s, dx + 1.45, yy + 0.08, w, 0.20, fill=BLUE if k else GRAY_2)
    tb(s, dx + 1.50 + w, yy, 0.8, 0.36, [(f"{v:g}", 15, True, BLUE if k else INK)], anchor=MID)
label_box(s, Q2x, QT2 + 2.36, QW, 0.80, [[("반증  ", 16, True, INK), ("Meta: 아직 넓게 배치할 가격 경쟁력 아님 · Micron 6500 ION(TLC)이 QLC 가격대 · SanDisk: 2030년에도 TLC 주력(재확인 필요)", 15, False, GRAY)]],
          fill=PALE, align=L)

d.footer(s, "출처: SK hynix(TSMC OIP 2026-09) · McKinsey(2024-12) · TrendForce(2026-09) · Forward Insights(Micron · Kingston · DapuStor · Solidigm 재인용) · Microsoft · NetApp 플릿 · "
            "VDURA 지수(2Q26) · Kioxia · TechInsights · SanDisk(2026-08) · Meta(2025-03) · 전환 가능 시장은 과제팀 산술 · 모두 검색 확인 등급")
d.notes(s, "별첨 1은 시장과 경제성 데이터입니다. 첫째, 수요는 SK하이닉스 기준 PCIe eSSD가 2026년 509에서 2030년 1,933엑사바이트, McKinsey 기준 eSSD가 2024년 181에서 2030년 1,078엑사바이트입니다. TrendForce는 eSSD 용량 중 QLC가 2026년 18퍼센트에서 2027년 38퍼센트로 오른다고 봅니다. "
        "둘째, Forward Insights 조사를 업체들이 재인용한 값으로, 출하나 배치의 75에서 91퍼센트가 1 DWPD 이하입니다. 다만 91퍼센트는 QLC 업체가 인용했고, Solidigm은 85퍼센트가 1 DWPD 이상이라는 다른 인용을 써서 충돌이 있습니다. 실사용은 Microsoft 플릿 0.07에서 0.23, NetApp 중앙값 0.36 DWPD입니다. "
        "셋째, 전환 가능 시장은 1 DWPD 이하 TLC에 전환율을 곱한 과제팀 산술입니다. 전환율을 정량화한 자료가 없어 30, 50, 70퍼센트로 민감도를 보였습니다. 2030년 50퍼센트 가정이면 약 200에서 570엑사바이트입니다. "
        "넷째, 30테라바이트 드라이브 가격은 2026년 2분기 TLC 약 1만 8,900달러, QLC 약 1만 5,120달러입니다. 같은 BiCS8 세대 다이 밀도는 TLC 18.3, QLC 22.9로 약 1.25배이고, BiCS10 QLC는 37입니다. 반대 근거로 Meta, Micron, SanDisk의 견해를 함께 적었습니다.")

# =============================================================== A2 별첨: 기술 근거
s = d.slide(6, "별첨 2", "WAF와 꼬리 지연은 호스트 협력에서 크게 줄고,\n줄어든 WAF는 OP를 줄여 판매 용량으로 돌아옵니다")
TW3 = (CW - 2 * 0.36) / 3
T1x, T2x, T3x = MX, MX + TW3 + 0.36, MX + 2 * (TW3 + 0.36)


def thead(x, no, text):
    rect(s, x, 2.34, 0.40, 0.40, fill=BLUE, shape=MSO_SHAPE.OVAL)
    tb(s, x, 2.34, 0.40, 0.40, [(str(no), 16, True, WHITE)], align=C, anchor=MID)
    tb(s, x + 0.52, 2.32, TW3 - 0.52, 0.44, [(text, 20, True, INK)], anchor=MID)


# ① 같은 세대 TLC 대 QLC 성능 격차
thead(T1x, 1, "QLC가 넘어야 할 성능 격차")
tb(s, T1x, 2.92, TW3, 0.32, [("같은 세대 데이터시트, TLC 대 QLC", 16, True, GRAY)], anchor=MID)
GRP = [("읽기 지연 µs", [("Solidigm PS1010", 60, False), ("Solidigm P5336", 110, True), ("Micron 9550", 60, False), ("Micron 6600 ION", 100, True)], 120),
       ("랜덤 쓰기 GB/s", [("Solidigm PS1010", 1.64, False), ("Solidigm P5336", 0.70, True), ("Kioxia CM9-R", 2.21, False), ("Kioxia LC9", 0.74, True)], 2.4)]
yy = 3.32
for nm, rows, vm in GRP:
    tb(s, T1x, yy, TW3, 0.32, [(nm, 16, True, INK)], anchor=MID)
    yy += 0.36
    for lab, v, q in rows:
        tb(s, T1x, yy, 2.30, 0.32, [(lab, 15, q, BLUE if q else GRAY)], anchor=MID)
        w = (TW3 - 2.30 - 0.80) * v / vm
        rect(s, T1x + 2.34, yy + 0.07, w, 0.18, fill=BLUE if q else GRAY_2)
        tb(s, T1x + 2.40 + w, yy, 0.80, 0.32, [(f"{v:g}", 15, True, BLUE if q else INK)], anchor=MID)
        yy += 0.34
    yy += 0.12
label_box(s, T1x, 7.24, TW3, 0.96, [("프로그램 시간 TLC 0.8~2ms 대 QLC 2~3ms", 16, True, INK),
                                         ("4KB 쓰기 정격 = 16KB 정격의 1/4 (6600 · 6550 ION · LC9)", 15, False, GRAY)], fill=PALE)

# ② WAF · 지연 실측
thead(T2x, 2, "WAF · 지연은 호스트 협력에서 크게 준다")
tb(s, T2x, 2.92, TW3, 0.32, [("WAF, 같은 조건 전후", 16, True, GRAY)], anchor=MID)
WROWS = [("SSD 단독 4종", 1.89, 4.40, GRAY_2, "1.89~4.40"), ("SSD GC 개선, 편중 부하", 2.06, 5.90, GRAY_2, "5.90 → 2.06"),
         ("CacheLib + FDP", 1.03, 3.22, BLUE, "3.22 → 1.03")]
for k, (nm, a, b, col, lab) in enumerate(WROWS):
    yy = 3.32 + k * 0.62
    tb(s, T2x, yy, TW3, 0.28, [(nm, 15, k == 2, BLUE if k == 2 else INK)], anchor=MID)
    x0 = T2x + (TW3 - 1.40) * a / 6
    rect(s, T2x, yy + 0.30, (TW3 - 1.40) * b / 6, 0.20, fill=LINE)
    rect(s, T2x, yy + 0.30, (TW3 - 1.40) * a / 6, 0.20, fill=col)
    tb(s, T2x + (TW3 - 1.40) * b / 6 + 0.06, yy + 0.22, 1.40, 0.34, [(lab, 15, True, BLUE if k == 2 else INK)], anchor=MID)
tb(s, T2x, 5.26, TW3, 0.32, [("테일 지연 개선 (모두 TLC)", 16, True, GRAY)], anchor=MID)
for k, (nm, v) in enumerate([("PM9D3a FDP p99.9", "-55%"), ("ZNS RocksDB p99.9", "2~4× ↓"), ("Valet 동적 배치", "최대 6× ↓")]):
    yy = 5.62 + k * 0.42
    tb(s, T2x, yy, TW3 - 1.40, 0.36, [(nm, 16, False, INK)], anchor=MID)
    tb(s, T2x + TW3 - 1.40, yy, 1.40, 0.36, [(v, 18, True, BLUE)], align=R, anchor=MID)
label_box(s, T2x, 7.24, TW3, 0.96, [("반대 근거", 16, True, INK), ("FDP 적대 부하 4.49× 악화 · GC 비주원인 연구", 15, False, GRAY)], fill=PALE)

# ③ OP · 용량 · 수명
thead(T3x, 3, "OP · 용량 · 수명의 교환")
tb(s, T3x, 2.92, TW3, 0.32, [("모델 WAF (균일 랜덤, greedy GC)", 16, True, GRAY)], anchor=MID)
CUR = [(7, 7.82), (11, 5.22), (14, 4.25), (20, 3.19), (28, 2.48), (50, 1.72)]
GX0_, GX1_, GY0_, GY1_ = T3x + 0.50, T3x + TW3 - 0.20, 3.32, 5.10


def gxx(op):
    return GX0_ + (op - 0) / 55 * (GX1_ - GX0_)


def gyy(w):
    return GY1_ - w / 8 * (GY1_ - GY0_)


for v in (0, 4, 8):
    rect(s, GX0_, gyy(v) - 0.005, GX1_ - GX0_, 0.01, fill=LINE)
    tb(s, T3x, gyy(v) - 0.14, 0.42, 0.28, [(str(v), 15, False, GRAY)], align=R, anchor=MID)
for op in (7, 28, 50):
    tb(s, gxx(op) - 0.4, GY1_ + 0.02, 0.8, 0.28, [(f"{op}%", 15, False, GRAY)], align=C)
for (a0, w0), (a1, w1) in zip(CUR, CUR[1:]):
    line(s, gxx(a0), gyy(w0), gxx(a1), gyy(w1), BLUE, 2.5)
for op, w in ((7, 7.82), (28, 2.48)):
    rect(s, gxx(op) - 0.07, gyy(w) - 0.07, 0.14, 0.14, fill=BLUE, shape=MSO_SHAPE.OVAL)
    tb(s, gxx(op) + 0.14, gyy(w) + (0.02 if op == 7 else 0.06), 0.80, 0.34, [(f"{w:g}", 16, True, BLUE)], anchor=MID)
tb(s, T3x, 5.48, TW3, 0.32, [("같은 NAND, RI 대 MU 판매 용량 TB", 16, True, GRAY)], anchor=MID)
for k, (ri, mu) in enumerate([(3.84, 3.2), (7.68, 6.4), (15.36, 12.8)]):
    yy = 5.84 + k * 0.40
    w1_ = (TW3 - 1.70) * mu / 15.36
    w2_ = (TW3 - 1.70) * ri / 15.36
    rect(s, T3x, yy + 0.06, w2_, 0.24, fill=BLUE_T2)
    rect(s, T3x, yy + 0.06, w1_, 0.24, fill=GRAY_2)
    tb(s, T3x + w2_ + 0.06, yy, 1.70, 0.36, [(f"{mu:g} → {ri:g}", 15, True, INK)], anchor=MID)
label_box(s, T3x, 7.24, TW3, 0.96, [("OP만 줄이면 수명 -60% (845DC)", 16, True, INK),
                                    ("pSLC는 WAF 3 → 1에서 7 → 21 DWPD", 15, False, GRAY)], fill=PALE)
label_box(s, MX, 8.44, CW, 0.62, [[("공백  ", 16, True, BLUE), ("QLC에서 FDP · ZNS 전후 p99 이상 지연 실측 · 하이퍼스케일러 TLC → QLC 전환 수치 · QLC/TLC 계약가 분리 공개 · 사내 원가", 16, False, GRAY)]],
          fill=WHITE, line=BLUE, lw=1.0, align=L)

d.footer(s, "출처: 각 사 데이터시트(같은 세대, 조건 상이) · 셀 동작 시간 서베이(arXiv 2025) · SSD-iq(PVLDB'25) 저자 데이터 · CacheLib FDP · 삼성 PM9D3a 블로그 · ZNS(ATC'21) · Valet(SoCC'25) · "
            "FDP 한계(FAST'26) · Elyasi 외 · Solidigm D7-P5520/P5620 · 삼성 845DC OP 노트 · 모델 WAF 과제팀 산술")
d.notes(s, "별첨 2는 기술 근거입니다. 첫째, 같은 세대 데이터시트로 보면 QLC의 읽기 지연은 TLC의 약 1.7에서 1.8배이고, 랜덤 쓰기 대역은 3분의 1에서 2.3분의 1입니다. 프로그램 시간도 QLC가 2에서 3밀리초로 깁니다. 매핑 단위 때문에 4킬로바이트 쓰기 정격은 16킬로바이트 정격의 4분의 1입니다. "
        "둘째, SSD 혼자 낸 WAF는 1.89에서 4.40이고, 쓰기가 편중된 경우 GC 개선만으로 5.90에서 2.06까지 내려갑니다. 호스트가 수명을 알려 주는 CacheLib FDP는 3.22에서 1.03입니다. 테일 지연은 PM9D3a FDP에서 p99.9가 55퍼센트, ZNS에서 2에서 4배, Valet에서 최대 6배 줄었습니다. 모두 TLC 실측입니다. 반대로 FDP는 적대적 부하에서 4.49배 나빠질 수 있고, GC가 테일 지연의 주원인이 아니라는 연구도 있습니다. "
        "셋째, 균일 랜덤 모델로 OP 7퍼센트의 WAF는 7.82, 28퍼센트는 2.48입니다. 같은 NAND로 1 DWPD 제품은 3 DWPD 제품보다 약 20퍼센트 더 많은 용량을 팝니다. 호스트 협력 없이 OP만 줄이면 수명이 60퍼센트 줄고, pSLC에서는 WAF를 3에서 1로 낮추면 7에서 21 DWPD가 됩니다. "
        "아직 확보하지 못한 데이터는 QLC에서의 FDP 전후 지연 실측, 하이퍼스케일러의 TLC에서 QLC 전환 수치, QLC와 TLC 계약가, 그리고 사내 원가입니다.")

d.save(os.path.abspath(OUT))
print(f"생성 완료: {os.path.abspath(OUT)} ({len(d.prs.slides._sldIdLst)}장)")
