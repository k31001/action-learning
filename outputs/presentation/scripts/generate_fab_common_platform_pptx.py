"""DRAM/NAND Fab 통합 운영: Bonding 시대에 맞는 Common Platform 구성 (1장, 시안 3종) v1.0 (2026-10-13).

같은 내용을 서로 다른 시각 언어 3가지로 그린 1장 슬라이드 시안. 사용자가 하나를 고른다.
  시안 A 평면도형   상 60% 기대 효과(Fab 평면도 · 설비 배분 격자 · 모델 아이콘) / 하 40% 운영 제언(두 조직이 합쳐지는 흐름)
  시안 B 차트형     좌 60% 기대 효과(개념 차트 3개) / 우 40% 운영 제언(조직도)
  시안 C 건축형     지붕(결론) · 기둥 3개(기대 효과, 항목 = 벽돌) · Bonding 기초(Common Platform) / 맨 아래 운영 제언(두 조직의 Bonding)

공통 내용
  기대 효과 ① 공간 효율성 ② 시황 변화 대응력 ③ 설비 통일성·선단화 (항목 3개씩)
  운영 제언  반도체연구소 / MTC 산하 메모리 BEOL 통합조직 구성
  결론      종합 반도체로서 기술·생산 경쟁력에 효율·유연성과 Buying Power를 더한다

규율: samsung-memory-ppt-design-skill v2.2 (20 x 11.25in, 본문 18pt 이상 · 출처 15pt, em-dash 금지,
액센트는 Samsung Blue 하나, 수치를 지어내지 않는다: 차트는 방향만 보이는 개념도로 그리고 축 수치를 쓰지 않는다).
출력: outputs/presentation/fab-common-platform-options.pptx (미커밋, 재생성)
재생성: .venv/bin/python outputs/presentation/scripts/generate_fab_common_platform_pptx.py
"""
import os
import sys

import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
sys.path.insert(0, os.path.join(ROOT, ".claude", "skills", "samsung-memory-ppt-design-skill", "scripts"))

from deck_helpers import (BLUE, BLUE_T1, BLUE_T2, CW, GRAY, GRAY_2, INK, LINE, MX, PALE,  # noqa: E402
                          RIGHT, TINT, WHITE, Deck)
from pptx.dml.color import RGBColor  # noqa: E402
from pptx.enum.dml import MSO_LINE_DASH_STYLE, MSO_PATTERN  # noqa: E402
from pptx.enum.shapes import MSO_CONNECTOR, MSO_SHAPE  # noqa: E402
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN  # noqa: E402
from pptx.oxml.ns import qn  # noqa: E402
from pptx.util import Inches, Pt  # noqa: E402

NEG = RGBColor(0xD9, 0x30, 0x25)     # 리스크 의미 전용(병목)
MID = RGBColor(0xB4, 0xB4, 0xB4)
ASSETS = os.path.join(ROOT, "outputs", "presentation", "assets", "fab-common-platform")
OUT = os.environ.get("OUT_PATH", os.path.join(ROOT, "outputs", "presentation", "fab-common-platform-options.pptx"))

TITLE = "DRAM/NAND Fab 통합 운영:\nBonding 시대에 맞는 Common Platform 구성"
CONCLUSION = "종합 반도체로서 기술·생산 경쟁력에 효율·유연성과 Buying Power를 더합니다"
FOOT = "주: 효과 그림은 방향을 보여 주는 개념도이며 수치는 표기하지 않음. 정량 효과는 Fab별 검증 후 확정 [사내 확인]"

# (번호, 국문, 영문, [(굵게, 나머지), ...])
EFFECTS = [
    (1, "공간 효율성", "Space Efficiency", [
        ("설비 밀집도 향상", ", Dead Space 최소화"),
        ("동일 모델 군집화", " 시너지"),
        ("단위 면적당 생산성", " 극대화"),
    ]),
    (2, "시황 변화 대응력", "Market Agility", [
        ("DRAM/NAND 설비 전환", " 속도 증가"),
        ("생산 Bottleneck 해소", "로 생산성 증가"),
        ("유휴 설비 최소화", ", 투자 회수 기간 단축"),
    ]),
    (3, "설비 통일성·선단화", "Equipment Unif.", [
        ("P-Mix 관점 ", "투자·전환 Loss 감소"),
        ("생산성 향상", ", 수율 안정화"),
        ("강력한 구매 협상력", " 확보"),
    ]),
]
ROLES = ["공용 Layout 표준", "설비 Pool 통합 운영", "설비 표준·통합 구매"]

SHAPES = {"sq": MSO_SHAPE.RECTANGLE, "ci": MSO_SHAPE.OVAL, "di": MSO_SHAPE.DIAMOND,
          "tr": MSO_SHAPE.ISOSCELES_TRIANGLE, "hx": MSO_SHAPE.HEXAGON}


# ------------------------------------------------------------------ 공통 도구
def line(s, x1, y1, x2, y2, color=GRAY_2, w=1.5, head=False, dash=False):
    c = s.shapes.add_connector(MSO_CONNECTOR.STRAIGHT, Inches(x1), Inches(y1), Inches(x2), Inches(y2))
    c.line.color.rgb = color
    c.line.width = Pt(w)
    if dash:
        c.line.dash_style = MSO_LINE_DASH_STYLE.DASH
    if head:
        ln = c.line._get_or_add_ln()
        ln.append(ln.makeelement(qn("a:tailEnd"), {"type": "triangle", "w": "med", "len": "med"}))
    return c


def hatch(d, s, x, y, w, h):
    """Dead Space: 옅은 사선 무늬."""
    sp = d.rect(s, x, y, w, h, line=MID, lw=0.75, dash=True)
    sp.fill.patterned()
    sp.fill.pattern = MSO_PATTERN.WIDE_UPWARD_DIAGONAL
    sp.fill.fore_color.rgb = MID
    sp.fill.back_color.rgb = WHITE
    return sp


def tool(d, s, kind, x, y, sz, fill, line_c=None, dash=False):
    return d.rect(s, x, y, sz, sz, fill=fill, line=line_c, lw=1.0, shape=SHAPES[kind], dash=dash)


def circ_no(d, s, x, y, n, dd=0.42, size=18, fill=BLUE):
    d.rect(s, x, y, dd, dd, fill=fill, shape=MSO_SHAPE.OVAL)
    d.tb(s, x, y, dd, dd, [(str(n), size, True, WHITE)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)


def effect_head(d, s, x, w, n, ko, en, y=2.34):
    """번호 원 + 국문(24pt) + 영문(18pt 그레이) 한 줄."""
    circ_no(d, s, x, y + 0.02, n, dd=0.46, size=20)
    d.tb(s, x + 0.60, y - 0.04, w - 0.60, 0.56,
         [[(ko, 24, True, INK), ("  " + en, 18, False, GRAY)]], anchor=MSO_ANCHOR.MIDDLE)


def items(d, s, x, y, w, rows, pitch=0.44, size=18, bar=True):
    for i, (b, rest) in enumerate(rows):
        yy = y + i * pitch
        if bar:
            d.rect(s, x, yy + 0.05, 0.07, pitch - 0.14, fill=BLUE)
        d.tb(s, x + (0.24 if bar else 0), yy, w - (0.24 if bar else 0), pitch - 0.04,
             [[(b, size, True, BLUE), (rest, size, False, INK)]], anchor=MSO_ANCHOR.MIDDLE)


def people(d, s, x, y, h, n, color, gap=0.10):
    for i in range(n):
        d.person(s, x + i * (0.62 * h + gap), y, h, color)
    return n * (0.62 * h + gap) - gap


# ================================================================== 시안 A: 평면도형
def slide_a(d):
    s = d.slide(1, "시안 A · 평면도형", TITLE)
    cw, gap = 5.86, 0.42
    xs = [MX + i * (cw + gap) for i in range(3)]

    for (n, ko, en, rows), x in zip(EFFECTS, xs):
        effect_head(d, s, x, cw, n, ko, en)
        items(d, s, x, 5.34, cw, rows)

    # ① Fab 평면도: 분리(모델 혼재 + Dead Space) → 통합(모델별 군집 + 확보 공간)
    x0, pw, ph, py = xs[0], 2.50, 1.78, 2.98
    d.rect(s, x0, py, pw, ph, fill=WHITE, line=GRAY_2, lw=1.0)
    line(s, x0 + pw / 2, py, x0 + pw / 2, py + ph, GRAY_2, 2.0)
    for k, lab in enumerate(("DRAM", "NAND")):
        d.tb(s, x0 + k * pw / 2 + 0.08, py + 0.04, 1.0, 0.30, [(lab, 16, True, GRAY)])
    layout = [[["sq", "ci", None], [None, "tr", "sq"], ["di", None, "ci"]],
              [["ci", None, "hx"], ["sq", "di", None], [None, "sq", "tr"]]]
    for k in range(2):
        for r in range(3):
            for c in range(3):
                cx = x0 + k * pw / 2 + 0.12 + c * 0.37
                cy = py + 0.42 + r * 0.44
                kind = layout[k][r][c]
                if kind is None:
                    hatch(d, s, cx - 0.02, cy - 0.02, 0.32, 0.32)
                else:
                    tool(d, s, kind, cx + 0.02, cy + 0.02, 0.24, GRAY_2)
    d.arrow_r(s, x0 + pw + 0.10, py + ph / 2 - 0.16, 0.48, 0.32, fill=BLUE)
    x1 = x0 + pw + 0.68
    d.rect(s, x1, py, pw, ph, fill=WHITE, line=BLUE, lw=1.5)
    d.tb(s, x1 + 0.08, py + 0.04, 2.0, 0.30, [("DRAM + NAND", 16, True, BLUE)])
    for r, (kind, col) in enumerate((("sq", BLUE), ("ci", BLUE_T1), ("di", BLUE))):
        for c in range(5):
            tool(d, s, kind, x1 + 0.12 + c * 0.30, py + 0.44 + r * 0.42, 0.24, col)
    d.rect(s, x1 + 1.68, py + 0.42, 0.70, 1.22, fill=TINT, line=BLUE, lw=1.0, dash=True)
    d.tb(s, x1 + 1.68, py + 0.42, 0.70, 1.22, [("확보", 16, True, BLUE), ("공간", 16, True, BLUE)],
         align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    d.tb(s, x0, py + ph + 0.08, pw, 0.34, [("Fab 분리", 18, False, GRAY)], align=PP_ALIGN.CENTER)
    d.tb(s, x1, py + ph + 0.08, pw, 0.34, [("Common Platform", 18, True, BLUE)], align=PP_ALIGN.CENTER)

    # ② 설비 배분 격자: 시황이 바뀔 때 분리 = 유휴 + 병목, 통합 = 전량 가동
    x0 = xs[1]
    lw_, pc = 1.30, 1.52
    heads = [("DRAM 강세", BLUE), ("NAND 강세", GRAY), ("DRAM 강세", BLUE)]
    d.tb(s, x0, 2.98, lw_, 0.36, [("시황 →", 16, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE)
    for j, (h, col) in enumerate(heads):
        d.tb(s, x0 + lw_ + j * pc, 2.98, pc, 0.36, [(h, 16, True, col)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    line(s, x0 + lw_, 3.38, x0 + lw_ + 3 * pc, 3.38, LINE, 1.0)
    sq, g = 0.26, 0.07
    # 칸: 위 줄 4칸, 아래 줄 4칸. 값: 'D' DRAM, 'N' NAND, '-' 유휴
    sep = {"D": ["DDDD", "NN--"], "N": ["DD--", "NNNN"]}
    com = {"D": ["DDDD", "DDNN"], "N": ["DDNN", "NNNN"]}
    over = {"D": 0, "N": 1}        # 분리 Fab에서 수요 초과(병목)인 줄
    for ri, (lab, grid, ry) in enumerate((("Fab 분리", sep, 3.46), ("Common\nPlatform", com, 4.24))):
        d.tb(s, x0, ry, lw_, 0.70, [(t, 18, ri == 1, BLUE if ri else GRAY) for t in lab.split("\n")],
             anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)
        for j, key in enumerate("DND"):
            gx = x0 + lw_ + j * pc + (pc - (4 * sq + 3 * g)) / 2
            gy = ry + (0.70 - (2 * sq + g)) / 2
            for rr, row in enumerate(grid[key]):
                for cc, v in enumerate(row):
                    cx, cy = gx + cc * (sq + g), gy + rr * (sq + g)
                    if v == "-":
                        d.rect(s, cx, cy, sq, sq, fill=WHITE, line=GRAY_2, lw=1.0, dash=True)
                    else:
                        d.rect(s, cx, cy, sq, sq, fill=BLUE if v == "D" else GRAY_2)
            if ri == 0:
                oy = gy + over[key] * (sq + g)
                d.rect(s, gx - 0.05, oy - 0.05, 4 * sq + 3 * g + 0.10, sq + 0.10, line=NEG, lw=2.0)
    # 범례
    lx, ly = x0 + lw_, 5.00
    for lab, kw in (("DRAM", dict(fill=BLUE)), ("NAND", dict(fill=GRAY_2)),
                    ("유휴", dict(fill=WHITE, line=GRAY_2, dash=True)), ("병목", dict(line=NEG, lw=2.0))):
        d.rect(s, lx, ly + 0.06, 0.20, 0.20, **kw)
        d.tb(s, lx + 0.26, ly, 0.90, 0.32, [(lab, 16, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE)
        lx += 1.10

    # ③ 설비 모델: 라인별 혼재 → 공용 모델 집중, 모델당 발주 물량 ↑
    x0 = xs[2]
    rows = (("DRAM", [("sq", GRAY_2), ("tr", GRAY), ("ci", MID), ("hx", GRAY_2)]),
            ("NAND", [("di", GRAY), ("sq", MID), ("hx", GRAY), ("ci", GRAY_2)]))
    for r, (lab, kinds) in enumerate(rows):
        yy = 3.08 + r * 0.62
        d.tb(s, x0, yy, 0.80, 0.40, [(lab, 16, True, GRAY)], anchor=MSO_ANCHOR.MIDDLE)
        for c, (kind, col) in enumerate(kinds):
            tool(d, s, kind, x0 + 0.84 + c * 0.42, yy + 0.03, 0.34, col)
    d.arrow_r(s, x0 + 2.62, 3.40, 0.48, 0.32, fill=BLUE)
    for c, kind in enumerate(("sq", "ci", "di")):
        bx = x0 + 3.30 + c * 0.86
        for k in range(3):
            tool(d, s, kind, bx + k * 0.10, 3.06 + k * 0.16, 0.50, [BLUE_T2, BLUE_T1, BLUE][k], line_c=WHITE)
    d.tb(s, x0, 4.34, 2.55, 0.34, [("라인별 모델 혼재", 18, False, GRAY)], align=PP_ALIGN.CENTER)
    d.tb(s, x0 + 3.10, 4.34, 2.76, 0.34, [("공용 모델 집중", 18, True, BLUE)], align=PP_ALIGN.CENTER)
    d.tb(s, x0, 4.78, 1.90, 0.40, [("모델당 발주 물량", 16, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE)
    d.rect(s, x0 + 1.95, 4.88, 0.55, 0.20, fill=GRAY_2)
    d.arrow_r(s, x0 + 2.62, 4.86, 0.36, 0.24, fill=GRAY_2)
    d.rect(s, x0 + 3.10, 4.88, 2.76, 0.20, fill=BLUE)

    # ---- 운영 제언 (하 40%)
    d.rect(s, MX, 6.84, CW, 0.02, fill=LINE)
    d.rect(s, MX, 7.08, 1.70, 0.46, fill=BLUE, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
    d.tb(s, MX, 7.08, 1.70, 0.46, [("운영 제언", 20, True, WHITE)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    d.tb(s, MX, 7.70, 3.60, 1.00, [("메모리 BEOL", 26, True, INK), ("통합조직 구성", 26, True, INK)], spacing=1.05)
    d.tb(s, MX, 8.80, 3.60, 0.40, [("반도체연구소 / MTC 산하", 18, False, GRAY)])

    for k, (lab, yy) in enumerate((("DRAM Fab\nBEOL", 7.10), ("NAND Fab\nBEOL", 8.42))):
        d.rect(s, 4.70, yy, 3.30, 0.92, fill=PALE, line=GRAY_2, lw=1.0, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
        people(d, s, 4.92, yy + 0.20, 0.52, 3, GRAY_2)
        d.tb(s, 6.30, yy, 1.62, 0.92, [(t, 18, True, INK) for t in lab.split("\n")], anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)
    line(s, 8.00, 7.56, 8.75, 7.56, GRAY_2, 2.0)
    line(s, 8.00, 8.88, 8.75, 8.88, GRAY_2, 2.0)
    line(s, 8.75, 7.56, 8.75, 8.88, GRAY_2, 2.0)
    line(s, 8.75, 8.22, 9.42, 8.22, BLUE, 3.0, head=True)
    d.tb(s, 8.88, 7.80, 0.70, 0.34, [("통합", 16, True, BLUE)])

    bx, by, bw, bh = 9.50, 7.60, 4.30, 1.25
    d.rect(s, 10.05, 6.98, 3.20, 0.42, fill=WHITE, line=GRAY_2, lw=1.0, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
    d.tb(s, 10.05, 6.98, 3.20, 0.42, [("반도체연구소 · MTC", 18, True, GRAY)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    line(s, bx + bw / 2, 7.40, bx + bw / 2, by, GRAY_2, 1.5)
    d.rect(s, bx, by, bw, bh, fill=BLUE, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
    d.tb(s, bx, by + 0.10, bw, 0.44, [("메모리 BEOL 통합조직", 22, True, WHITE)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    pw_ = 6 * (0.62 * 0.50 + 0.10) - 0.10
    people(d, s, bx + (bw - pw_) / 2, by + 0.62, 0.50, 6, WHITE)

    for i, role in enumerate(ROLES):
        ry = 7.06 + i * 0.80
        line(s, bx + bw, by + bh / 2, 14.75, ry + 0.30, GRAY_2, 1.5)
        d.rect(s, 14.75, ry, 4.46, 0.60, fill=TINT, line=BLUE_T2, lw=1.0, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
        circ_no(d, s, 14.86, ry + 0.10, i + 1, dd=0.40, size=16)
        d.tb(s, 15.40, ry, 3.70, 0.60, [(role, 18, True, INK)], anchor=MSO_ANCHOR.MIDDLE)

    d.band(s, 9.60, 0.80, "결론", CONCLUSION)
    d.footer(s, FOOT)
    d.notes(s, "시안 A 평면도형. 위 60%는 세 효과를 Fab 바닥에서 일어나는 일로 그렸습니다. "
               "1 공간: 분리 Fab은 모델이 섞이고 빈 공간이 생기지만, 통합 Fab은 같은 모델을 줄지어 놓아 공간이 남습니다. "
               "2 대응력: 시황이 DRAM과 NAND 사이를 오갈 때 분리 Fab은 한쪽이 놀고 한쪽이 막히지만, 통합 Fab은 설비를 돌려 써서 전량 가동합니다. "
               "3 통일성: 라인마다 다른 모델을 공용 모델로 모으면 모델당 발주 물량이 커져 구매 협상력이 생깁니다. "
               "아래 40%는 DRAM과 NAND의 BEOL 조직을 반도체연구소 · MTC 산하 하나의 조직으로 합치고, 그 조직이 세 효과를 각각 책임지는 구조입니다.")


# ================================================================== 시안 B: 차트형
def charts_b():
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    from matplotlib import font_manager
    for fp in ("/usr/share/fonts/truetype/nanum/NanumGothic.ttf", "/usr/share/fonts/truetype/nanum/NanumGothicBold.ttf"):
        if os.path.exists(fp):
            font_manager.fontManager.addfont(fp)
    plt.rcParams["font.family"] = "NanumGothic"
    plt.rcParams["axes.unicode_minus"] = False
    plt.rcParams["hatch.color"] = "#B4B4B4"
    os.makedirs(ASSETS, exist_ok=True)
    B, B1, B2, G2, MIDC, PAL, INKC = "#3C4FA5", "#677ECD", "#C0CAEC", "#8A8A8A", "#B4B4B4", "#EFEFEF", "#1A1A1A"
    W, H = 3.55, 2.70

    def clean(ax):
        for sp in ("top", "right", "left"):
            ax.spines[sp].set_visible(False)
        ax.spines["bottom"].set_color("#D9D9D9")
        ax.set_yticks([])
        ax.tick_params(length=0, labelsize=16, colors="#555555")

    # B1 같은 면적의 구성(개념): 분리 = 설비 + Dead Space, 통합 = 설비 + 추가 설비 + 작은 Dead Space
    fig = plt.figure(figsize=(W, H))
    ax = fig.add_axes([0.02, 0.13, 0.96, 0.85])
    segs = {0: [(50, G2, None, ""), (34, "white", "///", ""), (16, PAL, None, "")],
            1: [(50, B, None, "설비"), (22, B2, None, "추가 설비"), (12, "white", "///", "Dead Space"), (16, PAL, None, "통로")]}
    for xi, ss in segs.items():
        bot = 0
        for v, col, ht, lab in ss:
            ax.bar(xi, v, 0.62, bottom=bot, color=col, hatch=ht, edgecolor=MIDC if ht else col, lw=0.8 if ht else 0)
            if lab:
                ax.text(1.40, bot + v / 2, lab, fontsize=16, va="center", ha="left",
                        color=B if lab in ("설비", "추가 설비") else "#555555", fontweight="bold" if lab == "추가 설비" else "normal")
            bot += v
    ax.text(0, 50 + 17, "Dead\nSpace", fontsize=16, ha="center", va="center", color="#555555",
            bbox=dict(boxstyle="square,pad=0.12", fc="white", ec="none"))
    ax.set_xlim(-0.42, 2.75)
    ax.set_ylim(0, 103)
    ax.set_xticks([0, 1])
    ax.set_xticklabels(["Fab 분리", "Common"])
    clean(ax)
    fig.savefig(os.path.join(ASSETS, "b1_space.png"), dpi=300, transparent=True)
    plt.close(fig)

    # B2 수요 흐름(개념): 분리 Fab은 각 피크의 합만큼, 통합 Fab은 합산 피크만큼 설비가 필요
    t = np.linspace(0, 3, 300)
    dram = 1.0 + 0.48 * np.sin(2 * np.pi * t / 2.0)
    nand = 0.95 + 0.42 * np.sin(2 * np.pi * t / 2.0 + 0.9 * np.pi)
    sep_need = dram.max() + nand.max()
    com_need = (dram + nand).max()
    fig = plt.figure(figsize=(W, H))
    ax = fig.add_axes([0.02, 0.11, 0.96, 0.87])
    ax.fill_between(t, 0, dram, color=B, lw=0)
    ax.fill_between(t, dram, dram + nand, color=MIDC, lw=0)
    ax.axhline(sep_need, color=G2, lw=2.2, ls=(0, (4, 3)))
    ax.axhline(com_need, color=B, lw=2.6)
    ax.text(0.04, sep_need + 0.07, "분리 시 필요 설비", fontsize=16, color="#555555", va="bottom")
    ax.text(0.04, com_need + 0.07, "통합 시 필요 설비", fontsize=16, color=B, va="bottom", fontweight="bold")
    ax.annotate("", xy=(2.80, com_need + 0.02), xytext=(2.80, sep_need - 0.02),
                arrowprops=dict(arrowstyle="<->", color=INKC, lw=1.6))
    ax.text(2.70, (sep_need + com_need) / 2, "유휴 ↓", fontsize=16, ha="right", va="center", color=INKC, fontweight="bold")
    ax.text(0.55, 0.45, "DRAM", fontsize=16, color="white", fontweight="bold", ha="center")
    ax.text(1.55, 0.45 + 0.9, "NAND", fontsize=16, color="white", fontweight="bold", ha="center")
    ax.set_xlim(0, 3)
    ax.set_ylim(0, sep_need + 0.50)
    ax.set_xticks([])
    ax.set_xlabel("시간 →", fontsize=16, color="#555555", loc="right", labelpad=4)
    clean(ax)
    fig.savefig(os.path.join(ASSETS, "b2_agility.png"), dpi=300, transparent=True)
    plt.close(fig)

    # B3 슬로프(개념): 설비 모델 수 ↓, 모델당 구매 물량 ↑
    fig = plt.figure(figsize=(W, H))
    ax = fig.add_axes([0.06, 0.13, 0.92, 0.82])
    ax.plot([0, 1], [8.6, 4.2], color=G2, lw=3.2, marker="o", ms=10)
    ax.plot([0, 1], [3.0, 8.8], color=B, lw=4.0, marker="o", ms=11)
    ax.text(1.10, 8.8, "모델당\n구매 물량 ↑", fontsize=16, color=B, fontweight="bold", va="center")
    ax.text(1.10, 4.2, "설비\n모델 수 ↓", fontsize=16, color="#555555", va="center")
    ax.set_xlim(-0.18, 2.0)
    ax.set_ylim(1.5, 10.5)
    ax.set_xticks([0, 1])
    ax.set_xticklabels(["Fab 분리", "Common"])
    clean(ax)
    fig.savefig(os.path.join(ASSETS, "b3_unif.png"), dpi=300, transparent=True)
    plt.close(fig)


def slide_b(d):
    charts_b()
    s = d.slide(2, "시안 B · 차트형", TITLE)
    lw_all = 11.05
    cw, gap = 3.55, 0.20
    xs = [MX + i * (cw + gap) for i in range(3)]
    caps = ["같은 면적에 더 많은 설비", "합산 수요의 피크가 낮아 설비가 덜 필요", "모델은 줄고 모델당 물량은 늘어남"]
    pngs = ["b1_space.png", "b2_agility.png", "b3_unif.png"]
    for (n, ko, en, rows), x, cap, png in zip(EFFECTS, xs, caps, pngs):
        circ_no(d, s, x, 2.32, n, dd=0.40, size=18)
        d.tb(s, x + 0.52, 2.30, cw - 0.52, 0.44, [(en, 18, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
        d.tb(s, x, 2.80, cw, 0.50, [(ko, 26, True, INK)], anchor=MSO_ANCHOR.MIDDLE)
        d.img(s, os.path.join(ASSETS, png), x, 3.42, w=cw)
        d.rect(s, x, 6.20, cw, 0.62, fill=TINT)
        d.tb(s, x + 0.14, 6.20, cw - 0.28, 0.62, [(cap, 18, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)
        for i, (b, rest) in enumerate(rows):
            yy = 7.00 + i * 0.80
            d.tb(s, x, yy, cw, 0.72, [[(b, 18, True, INK), (rest, 18, False, INK)]], anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)
            if i < 2:
                d.rect(s, x, yy + 0.76, cw, 0.012, fill=LINE)
    d.rect(s, MX + lw_all + 0.19, 2.34, 0.02, 7.06, fill=LINE)

    # ---- 운영 제언: 조직도 (우 40%)
    ox, ow = MX + lw_all + 0.40, RIGHT - (MX + lw_all + 0.40)
    d.tb(s, ox, 2.30, ow, 0.44, [("Organization", 18, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
    d.tb(s, ox, 2.80, ow, 0.50, [("운영 제언: 메모리 BEOL 통합조직", 26, True, INK)], anchor=MSO_ANCHOR.MIDDLE)
    cx = ox + ow / 2
    pw_, py = 2.60, 3.55
    for k, lab in enumerate(("반도체연구소", "MTC")):
        px = ox + 0.45 + k * (ow - 0.90 - pw_)
        d.rect(s, px, py, pw_, 0.62, fill=WHITE, line=GRAY_2, lw=1.25, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
        d.tb(s, px, py, pw_, 0.62, [(lab, 20, True, INK)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
        line(s, px + pw_ / 2, py + 0.62, px + pw_ / 2, 4.42, GRAY_2, 1.5)
    line(s, ox + 0.45 + pw_ / 2, 4.42, ox + ow - 0.45 - pw_ / 2, 4.42, GRAY_2, 1.5)
    line(s, cx, 4.42, cx, 4.70, GRAY_2, 1.5)
    d.tb(s, cx + 0.10, 4.40, 1.2, 0.32, [("산하", 16, False, GRAY)])

    bw, by, bh = 3.20, 4.70, 1.45
    d.rect(s, cx - bw / 2, by, bw, bh, fill=BLUE, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
    d.tb(s, cx - bw / 2, by + 0.08, bw, 0.80, [("메모리 BEOL", 22, True, WHITE), ("통합조직", 22, True, WHITE)],
         align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)
    ppw = 5 * (0.62 * 0.42 + 0.08) - 0.08
    people(d, s, cx - ppw / 2, by + 0.92, 0.42, 5, WHITE, gap=0.08)
    sw = 1.40
    for k, lab in enumerate(("DRAM\nBEOL", "NAND\nBEOL")):
        sx = ox if k == 0 else ox + ow - sw
        d.rect(s, sx, by + 0.22, sw, 1.00, fill=PALE, line=GRAY_2, lw=1.0, shape=MSO_SHAPE.ROUNDED_RECTANGLE, dash=True)
        d.tb(s, sx, by + 0.22, sw, 1.00, [(t, 18, True, GRAY) for t in lab.split("\n")],
             align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)
        if k == 0:
            line(s, sx + sw + 0.04, by + bh / 2, cx - bw / 2 - 0.06, by + bh / 2, BLUE, 2.5, head=True)
        else:
            line(s, sx - 0.04, by + bh / 2, cx + bw / 2 + 0.06, by + bh / 2, BLUE, 2.5, head=True)

    chw, chg, cy = 2.12, 0.30, 6.75
    line(s, cx, by + bh, cx, 6.45, GRAY_2, 1.5)
    xs_c = [ox + i * (chw + chg) + (ow - 3 * chw - 2 * chg) / 2 for i in range(3)]
    line(s, xs_c[0] + chw / 2, 6.45, xs_c[2] + chw / 2, 6.45, GRAY_2, 1.5)
    labs = ["공용 Layout\n표준", "설비 Pool\n통합 운영", "설비 표준·\n통합 구매"]
    for i, (x, lab) in enumerate(zip(xs_c, labs)):
        line(s, x + chw / 2, 6.45, x + chw / 2, cy, GRAY_2, 1.5)
        d.rect(s, x, cy, chw, 1.15, fill=TINT, line=BLUE_T2, lw=1.0, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
        d.tb(s, x, cy + 0.08, chw, 1.07, [(t, 18, True, INK) for t in lab.split("\n")],
             align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)
        circ_no(d, s, x - 0.12, cy - 0.16, i + 1, dd=0.38, size=16)
    d.tb(s, ox, 8.20, ow, 0.90, [("DRAM·NAND BEOL의 공정·설비·구매를", 18, False, GRAY),
                                ("한 조직이 공통으로 운영", 18, False, GRAY)], align=PP_ALIGN.CENTER, spacing=1.1)

    d.band(s, 9.60, 0.80, "결론", CONCLUSION)
    d.footer(s, FOOT)
    d.notes(s, "시안 B 차트형. 왼쪽 60%는 효과마다 개념 차트 하나로 원리를 보입니다. "
               "1 공간: 같은 바닥 면적에서 Dead Space가 줄어든 만큼 설비를 더 놓습니다. "
               "2 대응력: DRAM과 NAND의 수요 피크가 엇갈리므로, 합산 수요의 피크는 각 피크의 합보다 낮습니다. 그 차이만큼 유휴 설비가 줄어듭니다. "
               "3 통일성: 설비 모델 수는 줄고 모델당 구매 물량은 늘어 협상력이 생깁니다. "
               "차트는 방향만 보이는 개념도이며 수치는 Fab별 검증 후 채웁니다. "
               "오른쪽 40%는 반도체연구소와 MTC 산하에 DRAM · NAND BEOL을 합친 통합조직을 두고, 세 효과에 대응하는 기능 셋을 둔 조직도입니다.")


# ================================================================== 시안 C: 건축형
def pictogram(d, s, n, x, y, w, h):
    if n == 1:      # 촘촘한 격자 + 확보 공간
        sz, g = 0.17, 0.04
        for r in range(4):
            for c in range(4):
                if r < 2 and c >= 3:
                    continue
                d.rect(s, x + c * (sz + g), y + r * (sz + g), sz, sz, fill=BLUE)
        d.rect(s, x + 3 * (sz + g), y, sz, 2 * sz + g, fill=TINT, line=BLUE, lw=1.0, dash=True)
    elif n == 2:    # DRAM ⇄ NAND
        bs = 0.46
        d.rect(s, x, y + 0.18, bs, bs, fill=BLUE, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
        d.tb(s, x, y + 0.18, bs, bs, [("D", 20, True, WHITE)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
        d.rect(s, x + bs + 0.04, y + 0.30, 0.36, 0.22, fill=GRAY_2, shape=MSO_SHAPE.LEFT_RIGHT_ARROW)
        d.rect(s, x + bs + 0.44, y + 0.18, bs, bs, fill=GRAY_2, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
        d.tb(s, x + bs + 0.44, y + 0.18, bs, bs, [("N", 20, True, WHITE)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    else:           # 같은 모델 3대 겹침
        for k in range(3):
            d.rect(s, x + 0.08 + k * 0.17, y + 0.04 + k * 0.13, 0.52, 0.52, fill=[BLUE_T2, BLUE_T1, BLUE][k],
                   line=WHITE, lw=1.25, shape=MSO_SHAPE.ROUNDED_RECTANGLE)


def slide_c(d):
    s = d.slide(3, "시안 C · 건축형", TITLE)
    # 지붕 = 결론
    roof = d.rect(s, MX, 2.30, CW, 0.82, fill=BLUE, shape=MSO_SHAPE.TRAPEZOID)
    roof.adjustments[0] = 0.55
    d.tb(s, MX + 1.6, 2.30, CW - 3.2, 0.82,
         [[("종합 반도체 경쟁력  ", 18, False, BLUE_T2), ("기술·생산 경쟁력 + 효율·유연성 + Buying Power", 24, True, WHITE)]],
         align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)

    # 기둥 3개: 머리(그림 + 이름) + 벽돌 3개(항목)
    px0, pgap = 1.09, 0.42
    pw = (CW - 2 * (px0 - MX) - 2 * pgap) / 3
    for k, (n, ko, en, rows) in enumerate(EFFECTS):
        x = px0 + k * (pw + pgap)
        d.rect(s, x, 3.24, pw, 1.18, fill=TINT)
        d.rect(s, x, 3.24, pw, 0.06, fill=BLUE)
        pictogram(d, s, n, x + 0.24, 3.50, 1.30, 0.80)
        d.tb(s, x + 1.72, 3.36, pw - 1.80, 0.50, [(ko, 24, True, INK)], anchor=MSO_ANCHOR.MIDDLE)
        d.tb(s, x + 1.72, 3.84, pw - 1.80, 0.38, [(f"{n}  {en}", 18, False, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
        for i, (b, rest) in enumerate(rows):
            yy = 4.52 + i * 0.80
            d.rect(s, x, yy, pw, 0.72, fill=WHITE, line=BLUE_T2, lw=1.25)
            d.tb(s, x + 0.22, yy, pw - 0.36, 0.72, [[(b, 18, True, BLUE), (rest, 18, False, INK)]],
                 anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)

    # 기초 = Common Platform (위에 Bonding 패드 줄)
    fx, fw = MX + 0.30, CW - 0.60
    n_pad = 44
    for i in range(n_pad):
        d.rect(s, fx + 0.10 + i * (fw - 0.32) / (n_pad - 1), 7.00, 0.12, 0.08, fill=BLUE_T1)
    d.rect(s, fx, 7.10, fw, 0.62, fill=BLUE)
    d.tb(s, fx + 0.30, 7.10, fw - 0.60, 0.62,
         [[("Common Platform   ", 22, True, WHITE), ("DRAM·NAND 공용 BEOL · Bonding 공정 · 설비 Pool", 20, False, WHITE)]],
         align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)

    # ---- 운영 제언: 두 조직의 Bonding (맨 아래)
    d.rect(s, MX, 8.14, 1.70, 0.46, fill=WHITE, line=BLUE, lw=1.5, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
    d.tb(s, MX, 8.14, 1.70, 0.46, [("운영 제언", 20, True, BLUE)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    d.tb(s, MX, 8.74, 3.70, 1.00, [("메모리 BEOL", 26, True, INK), ("통합조직 구성", 26, True, INK)], spacing=1.05)

    wx, ww = 4.90, 4.40
    for k, (lab, yy) in enumerate((("DRAM BEOL 조직", 8.14), ("NAND BEOL 조직", 9.30))):
        d.rect(s, wx, yy, ww, 0.72, fill=PALE, line=GRAY_2, lw=1.0, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
        people(d, s, wx + 0.22, yy + 0.14, 0.44, 3, GRAY_2, gap=0.08)
        d.tb(s, wx + 1.40, yy, ww - 1.50, 0.72, [(lab, 18, True, INK)], anchor=MSO_ANCHOR.MIDDLE)
    for i in range(12):
        d.rect(s, wx + 0.30 + i * (ww - 0.72) / 11, 8.94, 0.12, 0.28, fill=BLUE_T1)
    d.tb(s, wx + ww + 0.12, 8.89, 1.20, 0.38, [("Bonding", 18, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
    d.arrow_r(s, wx + ww + 1.36, 8.90, 0.62, 0.36, fill=BLUE)

    bx, bw, by, bh = 11.40, 5.10, 8.14, 1.88
    d.rect(s, bx, by, bw, bh, fill=BLUE, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
    d.tb(s, bx, by + 0.16, bw, 0.50, [("메모리 BEOL 통합조직", 24, True, WHITE)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    ppw = 6 * (0.62 * 0.66 + 0.12) - 0.12
    people(d, s, bx + (bw - ppw) / 2, by + 0.88, 0.66, 6, WHITE, gap=0.12)
    # 조직이 기초(Common Platform)를 받친다
    for ax_ in (bx + 1.20, bx + bw - 1.20):
        d.rect(s, ax_ - 0.17, 7.78, 0.34, 0.32, fill=BLUE_T1, shape=MSO_SHAPE.UP_ARROW)
    d.tb(s, bx + 1.50, 7.78, bw - 3.00, 0.32, [("운영", 16, True, BLUE)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)

    tx = bx + bw + 0.30
    line(s, bx + bw, by + bh / 2, tx, by + bh / 2, GRAY_2, 1.5)
    d.rect(s, tx, by + 0.36, RIGHT - tx, 1.16, fill=WHITE, line=GRAY_2, lw=1.25, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
    d.tb(s, tx, by + 0.36, RIGHT - tx, 1.16, [("산하", 16, False, GRAY), ("반도체연구소", 18, True, INK), ("/ MTC", 18, True, INK)],
         align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)

    d.footer(s, FOOT)
    d.notes(s, "시안 C 건축형. 슬라이드 전체를 한 채의 건물로 읽습니다. "
               "지붕은 결론, 즉 종합 반도체로서 기술 · 생산 경쟁력에 효율 · 유연성과 Buying Power를 더한다는 것입니다. "
               "지붕을 받치는 기둥 셋이 기대 효과이고, 각 기둥의 벽돌 세 장이 효과의 구체 항목입니다. "
               "기둥은 Common Platform이라는 기초 위에 서 있고, 기초 윗면의 패드 줄은 Bonding 계면을 뜻합니다. "
               "맨 아래 운영 제언은 DRAM과 NAND의 BEOL 조직을 웨이퍼처럼 Bonding해 하나의 통합조직으로 만들고, "
               "그 조직이 반도체연구소 / MTC 산하에서 기초를 운영한다는 그림입니다.")


def main():
    d = Deck("Fab 통합 운영", total=3)
    slide_a(d)
    slide_b(d)
    slide_c(d)
    # 테마 스타일(p:style)의 effectRef가 그림자를 그리므로 지운다. 채움 · 선은 모두 명시값이다.
    for sl in d.prs.slides:
        for sh in sl.shapes:
            st = sh._element.find(qn("p:style"))
            if st is not None:
                sh._element.remove(st)
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    d.save(OUT)
    print("saved", OUT)


if __name__ == "__main__":
    main()
