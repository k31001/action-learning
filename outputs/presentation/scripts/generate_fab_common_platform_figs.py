"""Fab 통합 운영 1장 시안 3종의 기둥 그림 (v2.0, 2026-10-13).

그림 18개 = 시안 3종 x 효과 3개 x 색 테마 2종(v = 단일 Blue, c = 다색). 모두 슬라이드 배치 크기(5.30 x 1.80in) 그대로 그려 그림 pt = 슬라이드 pt.
  v1_*  아이소메트릭: 3D 느낌의 Fab 바닥 · 설비 블록
  v2_*  메커니즘: 와플 격자 · 수요 곡선 · 막대 (방향만 보이는 개념도, 수치 없음)
  v3_*  Fab 도면: 위에서 본 Bay · OHT 레일 · 웨이퍼 Lot 흐름 · 설비 모델 매트릭스
  c1_* · c2_* · c3_*  같은 그림의 다색 버전(DRAM = Blue, NAND = Teal, 모델별 색, 개선 = Amber)
출력: outputs/presentation/assets/fab-common-platform/
재생성: .venv/bin/python outputs/presentation/scripts/generate_fab_common_platform_figs.py
"""
import math
import os

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402
import numpy as np  # noqa: E402
from matplotlib import font_manager  # noqa: E402
from matplotlib.font_manager import FontProperties  # noqa: E402
from matplotlib.patches import Circle, Ellipse, FancyArrowPatch, FancyBboxPatch, Polygon, Rectangle  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.abspath(os.path.join(HERE, "..", "assets", "fab-common-platform"))
FR = "/usr/share/fonts/truetype/nanum/NanumGothic.ttf"
FB = "/usr/share/fonts/truetype/nanum/NanumGothicBold.ttf"
for fp in (FR, FB):
    if os.path.exists(fp):
        font_manager.fontManager.addfont(fp)
plt.rcParams["font.family"] = "NanumGothic"
plt.rcParams["axes.unicode_minus"] = False
plt.rcParams["hatch.color"] = "#B4B4B4"
plt.rcParams["hatch.linewidth"] = 0.8
P_R = FontProperties(fname=FR) if os.path.exists(FR) else FontProperties()
P_B = FontProperties(fname=FB) if os.path.exists(FB) else FontProperties(weight="bold")

B, B1, B2, TINT = "#3C4FA5", "#677ECD", "#C0CAEC", "#F0F2F8"
INK, G, G2, MID, LINE, PALE, WHITE, NEG = "#1A1A1A", "#555555", "#8A8A8A", "#B4B4B4", "#D9D9D9", "#F5F5F5", "#FFFFFF", "#D93025"
W, H = 5.30, 1.80


# ------------------------------------------------------------------ 공통
def canvas():
    fig = plt.figure(figsize=(W, H))
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(0, W)
    ax.set_ylim(0, H)
    ax.set_aspect("equal")
    ax.axis("off")
    return fig, ax


def save(fig, name):
    name = TAG + name[1:]                 # v1_space.png → c1_space.png (COLOR 테마)
    os.makedirs(OUT, exist_ok=True)
    fig.savefig(os.path.join(OUT, name), dpi=300, transparent=True)
    plt.close(fig)


def txt(ax, x, y, s, size=16, color=G, bold=False, ha="left", va="center", z=20, **kw):
    ax.text(x, y, s, fontproperties=P_B if bold else P_R, fontsize=size, color=color, ha=ha, va=va, zorder=z, **kw)


def arrow(ax, x1, y1, x2, y2, color=B, lw=2.4, style="-|>", ms=14, z=15, rad=0.0):
    ax.add_patch(FancyArrowPatch((x1, y1), (x2, y2), arrowstyle=style, mutation_scale=ms, color=color, lw=lw,
                                 zorder=z, connectionstyle=f"arc3,rad={rad}", shrinkA=0, shrinkB=0))


def block_arrow(ax, x, y, w=0.46, h=0.26, color=None):
    color = color or B
    ax.add_patch(Polygon([(x, y - h * 0.22), (x + w * 0.58, y - h * 0.22), (x + w * 0.58, y - h / 2), (x + w, y),
                          (x + w * 0.58, y + h / 2), (x + w * 0.58, y + h * 0.22), (x, y + h * 0.22)],
                         closed=True, fc=color, ec="none", zorder=12))


def mix(hexc, f):
    """f > 0 이면 흰색 쪽, f < 0 이면 검정 쪽으로 섞는다."""
    c = np.array([int(hexc[i:i + 2], 16) for i in (1, 3, 5)], float)
    t = np.array([255.0] * 3) if f > 0 else np.zeros(3)
    c = c + (t - c) * abs(f)
    return "#%02X%02X%02X" % tuple(int(round(v)) for v in c)


# ------------------------------------------------------------------ 아이소메트릭
C30 = math.cos(math.radians(30))


class Iso:
    def __init__(self, ax, ox, oy, s):
        self.ax, self.ox, self.oy, self.s = ax, ox, oy, s

    def p(self, x, y, z=0.0):
        return (self.ox + (x - y) * C30 * self.s, self.oy + (x + y) * 0.5 * self.s + z * self.s)

    def plate(self, n, m, fc=WHITE, ec=MID, lw=0.8, grid=True, z=1):
        self.ax.add_patch(Polygon([self.p(0, 0), self.p(n, 0), self.p(n, m), self.p(0, m)], closed=True,
                                  fc=fc, ec=ec, lw=lw, zorder=z))
        if grid:
            for i in range(1, n):
                self.ax.plot(*zip(self.p(i, 0), self.p(i, m)), color=LINE, lw=0.6, zorder=z + 0.1)
            for j in range(1, m):
                self.ax.plot(*zip(self.p(0, j), self.p(n, j)), color=LINE, lw=0.6, zorder=z + 0.1)

    def tile(self, x, y, w=1, d=1, fc="none", ec=MID, hatch=None, dash=False, lw=0.9, z=2):
        self.ax.add_patch(Polygon([self.p(x, y), self.p(x + w, y), self.p(x + w, y + d), self.p(x, y + d)], closed=True,
                                  fc=fc, ec=ec, hatch=hatch, lw=lw, ls=(0, (3, 2)) if dash else "-", zorder=z))

    def box(self, x, y, w, d, h, color, z0=0.0, top=None, side=None, ec=WHITE, lw=0.6):
        """정육면체. 앞면 둘(왼쪽 x=x, 오른쪽 y=y)과 윗면을 그린다. 뒤(큰 x+y)부터 그려야 겹침이 맞다."""
        zo = 5 + (100 - (x + y)) * 0.1 + z0 * 0.01
        p = self.p
        topc = top or mix(color, 0.35)
        lc = side or color
        rc = side and mix(side, -0.18) or mix(color, -0.22)
        self.ax.add_patch(Polygon([p(x, y, z0), p(x, y + d, z0), p(x, y + d, z0 + h), p(x, y, z0 + h)], closed=True,
                                  fc=lc, ec=ec, lw=lw, zorder=zo))
        self.ax.add_patch(Polygon([p(x, y, z0), p(x + w, y, z0), p(x + w, y, z0 + h), p(x, y, z0 + h)], closed=True,
                                  fc=rc, ec=ec, lw=lw, zorder=zo))
        self.ax.add_patch(Polygon([p(x, y, z0 + h), p(x + w, y, z0 + h), p(x + w, y + d, z0 + h), p(x, y + d, z0 + h)],
                                  closed=True, fc=topc, ec=ec, lw=lw, zorder=zo))


def sort_far_first(items):
    return sorted(items, key=lambda t: -(t[0] + t[1]))


# ------------------------------------------------------------------ 색 테마
# MONO: 단일 액센트(Samsung Blue) 시안 v1~v3. COLOR: 다색 시안 c1~c3(사용자 요청 2026-10-13).
# COLOR의 색 의미: DRAM = Blue, NAND = Teal, 통합 후 모델 = Blue · Purple · Teal(같은 색 = 같은 모델),
# 공용 모델 = Purple, 개선(확보 · 추가 · ↑) = Amber, 효과별 색 ① Blue ② Teal ③ Purple.
BLUE, BLUE_LT = "#3C4FA5", "#8E9DD6"
TEAL, TEAL_LT, TEAL_DK = "#1E8C8C", "#7CC5BE", "#146B6B"
PURPLE, PURPLE_LT, PURPLE_LT2 = "#6E56B0", "#A797D6", "#D3CAEE"
AMBER, AMBER_BG, AMBER_DK = "#E39B2D", "#FCEFD9", "#B86E00"
NAVY = "#26336E"
HUES = {"space": (BLUE, "#C0CAEC", "#F0F2F8"), "agility": (TEAL, "#A9DCD7", "#E8F5F4"), "unif": (PURPLE, PURPLE_LT2, "#F1EEF9")}

MONO = dict(hue=B, hue_lt=B2, hue_bg=TINT, arrow=B, arrow_lt=B2,
            dram=B, dram_lt=B1, nand=G2, nand_lt=MID, nand_txt=G, nand_lbl=WHITE,
            mixA=G2, mixB=MID, mixC=G, modA=B, modB=B1, modC=B, add=B2,
            com=B, com_lt=B1, com_lt2=B2, gain=B, gain_bg=TINT, gain_txt=B, idle_txt=INK,
            line_ok=B, tobe=B, tobe_txt=B, bond=(G2, B, B1), zoneD=mix(G2, 0.25), zoneN=mix(G2, 0.25), zone_ec=G,
            chipD=(PALE, G2, G), chipN=(PALE, G2, G))
COLOR = dict(MONO, dram=BLUE, dram_lt=BLUE, nand=TEAL, nand_lt=TEAL_LT, nand_txt=TEAL_DK, nand_lbl=TEAL_DK,
             mixA=BLUE_LT, mixB=PURPLE_LT, mixC=TEAL_LT, modA=BLUE, modB=PURPLE, modC=TEAL, add=AMBER,
             com=PURPLE, com_lt=PURPLE_LT, com_lt2=PURPLE_LT2, gain=AMBER, gain_bg=AMBER_BG, gain_txt=AMBER_DK,
             idle_txt=AMBER_DK, line_ok=NAVY, tobe=AMBER, tobe_txt=AMBER_DK, bond=(TEAL, BLUE, PURPLE),
             zoneD=BLUE_LT, zoneN=TEAL_LT, zone_ec=WHITE, chipD=("#E9ECF8", BLUE, BLUE), chipN=("#E3F3F1", TEAL, TEAL_DK))
K = dict(MONO)
TAG = "v"


def use(theme, effect=None):
    K.clear()
    K.update(theme)
    if theme is COLOR and effect:
        h, lt, bg = HUES[effect]
        K.update(hue=h, hue_lt=lt, hue_bg=bg, arrow=h, arrow_lt=lt)


def v1_space():
    fig, ax = canvas()
    s = 0.27
    # 분리 Fab: DRAM | NAND 벽, 모델 혼재(높이 · 크기 · 색이 제각각), 빈 칸 = Dead Space
    L = Iso(ax, 1.17, 0.10, s)
    L.plate(4, 4)
    dead = [(0, 2), (1, 0), (2, 3), (3, 1), (1, 3)]
    for (x, y) in dead:
        L.tile(x + 0.06, y + 0.06, 0.88, 0.88, fc=WHITE, ec=MID, hatch="////", dash=True)
    a, b, c = K["mixA"], K["mixB"], K["mixC"]
    tools = [(0, 0, 0.8, 0.7, 1.0, a), (0, 1, 0.6, 0.8, 0.7, b), (0, 3, 0.7, 0.6, 1.25, c), (1, 1, 0.8, 0.8, 0.9, a),
             (1, 2, 0.6, 0.6, 0.6, b), (2, 0, 0.7, 0.8, 1.1, c), (2, 1, 0.8, 0.6, 0.75, b), (2, 2, 0.6, 0.7, 1.3, a),
             (3, 0, 0.6, 0.6, 0.65, b), (3, 2, 0.8, 0.8, 0.95, c), (3, 3, 0.7, 0.7, 0.8, a)]
    for (x, y, w, d, h, col) in sort_far_first(tools):
        L.box(x + (1 - w) / 2, y + (1 - d) / 2, w, d, h, col)
    # 벽 (x = 2): 바닥 위 굵은 선
    ax.plot(*zip(L.p(2, 0), L.p(2, 4)), color=G, lw=3.0, zorder=3)
    txt(ax, 0.02, 1.66, "Fab 분리", 16, G, bold=True)
    txt(ax, 0.02, 1.40, "DRAM | NAND", 16, G2)

    block_arrow(ax, 2.30, 0.72, 0.50, 0.30, color=K["arrow"])

    # 통합 Fab: 같은 모델끼리 줄지어 밀집 + 남는 줄 = 확보 공간
    R = Iso(ax, 4.03, 0.10, s)
    R.plate(4, 4, ec=K["hue_lt"])
    for yy in range(4):
        R.tile(3.06, yy + 0.06, 0.88, 0.88, fc=K["gain_bg"], ec=K["gain"], dash=True, lw=1.1)
    rows = {0: (0.80, K["modA"]), 1: (0.80, K["modA"]), 2: (1.10, K["modB"]), 3: (0.95, K["modC"])}
    items_ = [(x, y) for x in range(3) for y in range(4)]
    for (x, y) in sort_far_first(items_):
        h, col = rows[y]
        R.box(x + 0.08, y + 0.08, 0.84, 0.84, h, col)
    txt(ax, 3.02, 1.66, "Common Platform", 16, K["hue"], bold=True)
    px, py = R.p(4.0, 2.0)
    ax.plot([px + 0.02, px + 0.20], [py + 0.02, py + 0.20], color=K["gain"], lw=1.0, zorder=30)
    txt(ax, px + 0.22, py + 0.28, "확보", 16, K["gain_txt"], bold=True)
    save(fig, "v1_space.png")


def v1_agility():
    fig, ax = canvas()
    s = 0.31
    F = Iso(ax, 0.66, 0.12, s)
    F.plate(6, 2, ec=K["hue_lt"])
    # D = DRAM, N = NAND, S = 전환 중(윗면 DRAM 색, 옆면 NAND 색)
    plan = {(0, 0): "D", (1, 0): "D", (2, 0): "S", (3, 0): "N", (4, 0): "N", (5, 0): "N",
            (0, 1): "D", (1, 1): "D", (2, 1): "D", (3, 1): "S", (4, 1): "N", (5, 1): "N"}
    for (x, y) in sort_far_first(list(plan)):
        k = plan[(x, y)]
        if k == "D":
            F.box(x + 0.1, y + 0.1, 0.8, 0.8, 1.0, K["dram"])
        elif k == "N":
            F.box(x + 0.1, y + 0.1, 0.8, 0.8, 1.0, K["nand"])
        else:
            F.box(x + 0.1, y + 0.1, 0.8, 0.8, 1.0, K["nand"], top=K["dram_lt"], side=K["nand"])
    for (x, y) in ((2, 0), (3, 1)):
        cx, cy = F.p(x + 0.5, y + 0.5, 1.0)
        arrow(ax, cx - 0.16, cy + 0.12, cx + 0.16, cy + 0.12, color=INK, lw=1.6, ms=10, z=60, rad=-0.9)
    txt(ax, 0.02, 1.66, "공용 설비 전환", 16, INK, bold=True)

    # 오른쪽: 수요가 엇갈리면 설비 배분이 따라간다
    x0, x1 = 2.78, 4.52
    t = np.linspace(0, 1, 120)
    dr = 1.30 + 0.24 * np.sin(2 * np.pi * (t * 1.25 - 0.10))
    na = 1.30 - 0.24 * np.sin(2 * np.pi * (t * 1.25 - 0.10))
    X = x0 + t * (x1 - x0)
    ax.plot(X, dr, color=K["dram"], lw=2.6, zorder=10)
    ax.plot(X, na, color=K["nand"], lw=2.2, zorder=10)
    txt(ax, x1 + 0.07, dr[-1], "DRAM", 16, K["dram"], bold=True)
    txt(ax, x1 + 0.07, na[-1], "NAND", 16, K["nand_txt"])
    txt(ax, x0, 1.70, "수요", 16, G)
    nseg = 6
    sw = (x1 - x0) / nseg
    for i in range(nseg):
        tm = (i + 0.5) / nseg
        share = 0.5 + 0.38 * math.sin(2 * np.pi * (tm * 1.25 - 0.10))
        hh = 0.50
        ax.add_patch(Rectangle((x0 + i * sw + 0.02, 0.18), sw - 0.04, hh * share, fc=K["dram"], ec="none", zorder=8))
        ax.add_patch(Rectangle((x0 + i * sw + 0.02, 0.18 + hh * share), sw - 0.04, hh * (1 - share), fc=K["nand_lt"], ec="none", zorder=8))
    txt(ax, x1 + 0.07, 0.43, "배분", 16, G)
    ax.plot([x0, x1], [0.90, 0.90], color=LINE, lw=0.8, zorder=5)
    save(fig, "v1_agility.png")


def v1_unif():
    fig, ax = canvas()
    s = 0.30
    L = Iso(ax, 0.82, 0.14, s)
    L.plate(3, 3)
    a, b, c = K["mixA"], K["mixB"], K["mixC"]
    mixed = [(0, 0, 0.8, 0.6, 1.0, a), (1, 0, 0.6, 0.8, 0.6, b), (2, 0, 0.7, 0.7, 1.3, c),
             (0, 1, 0.6, 0.6, 1.4, c), (1, 1, 0.8, 0.8, 0.8, a), (2, 1, 0.6, 0.6, 0.7, b),
             (0, 2, 0.7, 0.8, 0.75, b), (1, 2, 0.6, 0.6, 1.15, a), (2, 2, 0.8, 0.7, 0.95, c)]
    for (x, y, w, d, h, col) in sort_far_first(mixed):
        L.box(x + (1 - w) / 2, y + (1 - d) / 2, w, d, h, col)
    txt(ax, 0.02, 1.66, "라인별 모델 혼재", 16, G, bold=True)
    # 발주 물량: 모델마다 1단
    T1 = Iso(ax, 2.05, 0.16, 0.24)
    T1.box(0, 0, 1, 1, 0.9, MID)
    txt(ax, 2.05, 0.80, "발주", 16, G, ha="center")

    block_arrow(ax, 2.42, 0.70, 0.46, 0.28, color=K["arrow"])

    R = Iso(ax, 3.48, 0.14, s)
    R.plate(3, 2, ec=K["hue_lt"])
    for (x, y) in sort_far_first([(x, y) for x in range(3) for y in range(2)]):
        R.box(x + 0.1, y + 0.1, 0.8, 0.8, 1.05, K["com"])
    txt(ax, 2.98, 1.66, "공용 모델", 16, K["com"], bold=True)
    T2 = Iso(ax, 4.86, 0.16, 0.24)
    for k in range(4):
        T2.box(0, 0, 1, 1, 0.9, K["gain"], z0=k * 0.95)
    txt(ax, 4.86, 1.52, "발주 ↑", 16, K["gain_txt"], bold=True, ha="center")
    save(fig, "v1_unif.png")


# ------------------------------------------------------------------ 메커니즘
def waffle(ax, x0, y0, plan, cell=0.22, gap=0.04, palette=None):
    for r, row in enumerate(plan):
        for c, k in enumerate(row):
            x, y = x0 + c * (cell + gap), y0 + (len(plan) - 1 - r) * (cell + gap)
            fc, ec, ht, ls = palette[k]
            ax.add_patch(Rectangle((x, y), cell, cell, fc=fc, ec=ec, hatch=ht, lw=0.8, ls=ls, zorder=5))


def v2_space():
    fig, ax = canvas()
    pal = {"t": (K["mixA"], "none", None, "-"), "T": (K["modA"], "none", None, "-"), "a": (K["add"], "none", None, "-"),
           "d": (WHITE, MID, "////", (0, (2, 1.5))), "o": ("#E2E2E2", "none", None, "-")}
    before = ["tdttdtdt", "dttdttdd", "oooooooo", "ttdtdttd"]
    after = ["TTTTTTaa", "TTTTTTad", "oooooooo", "TTTTTTaa"]
    txt(ax, 0.06, 1.66, "Fab 분리", 16, G, bold=True)
    txt(ax, 3.12, 1.66, "Common Platform", 16, K["hue"], bold=True)
    waffle(ax, 0.06, 0.46, before, palette=pal)
    block_arrow(ax, 2.24, 0.85, 0.62, 0.30, color=K["arrow"])
    waffle(ax, 3.12, 0.46, after, palette=pal)
    # 같은 면적 표시
    ax.add_patch(Rectangle((3.12 - 0.03, 0.43), 8 * 0.26 - 0.04 + 0.06, 4 * 0.26 - 0.04 + 0.06, fc="none", ec=K["hue"], lw=1.2, zorder=6))
    # 범례
    lx = 0.06
    for lab, k in (("설비", "T"), ("추가 설비", "a"), ("Dead Space", "d"), ("통로", "o")):
        fc, ec, ht, ls = pal[k]
        ax.add_patch(Rectangle((lx, 0.10), 0.18, 0.18, fc=fc, ec=ec, hatch=ht, lw=0.8, ls=ls, zorder=5))
        txt(ax, lx + 0.25, 0.19, lab, 16, G)
        lx += 0.25 + {"설비": 0.50, "추가 설비": 0.98, "Dead Space": 1.32, "통로": 0.5}[lab]
    save(fig, "v2_space.png")


def v2_agility():
    fig, ax = canvas()
    # 왼쪽: 엇갈린 수요의 합 → 통합 시 필요 설비가 낮다
    x0, x1, yb = 0.05, 3.05, 0.12
    t = np.linspace(0, 1, 300)
    dram = 0.52 + 0.20 * np.sin(2 * np.pi * t * 1.5)
    nand = 0.48 + 0.17 * np.sin(2 * np.pi * t * 1.5 + 0.9 * np.pi)
    X = x0 + t * (x1 - x0)
    ax.fill_between(X, yb, yb + dram, color=K["dram"], lw=0, zorder=4)
    ax.fill_between(X, yb + dram, yb + dram + nand, color=K["nand_lt"], lw=0, zorder=4)
    sep = yb + dram.max() + nand.max()
    com = yb + (dram + nand).max()
    ax.plot([x0, x1], [sep, sep], color=G2, lw=2.0, ls=(0, (4, 3)), zorder=6)
    ax.plot([x0, x1], [com, com], color=K["line_ok"], lw=2.4, zorder=6)
    txt(ax, x0 + 0.02, sep + 0.13, "분리 시 필요 설비", 16, G)
    txt(ax, x0 + 0.02, com + 0.12, "통합 시 필요 설비", 16, K["line_ok"], bold=True)
    arrow(ax, x1 - 0.12, sep - 0.01, x1 - 0.12, com + 0.02, color=K["idle_txt"], lw=1.6, style="<|-|>", ms=9)
    txt(ax, x1 - 0.22, (sep + com) / 2 + 0.01, "유휴 ↓", 16, K["idle_txt"], bold=True, ha="right")
    txt(ax, x0 + 0.40, yb + 0.22, "DRAM", 16, WHITE, bold=True)
    txt(ax, x0 + 1.55, yb + 0.88, "NAND", 16, K["nand_lbl"], bold=True)
    ax.plot([x0, x1], [yb, yb], color=LINE, lw=0.8, zorder=6)
    # 오른쪽: 전환 시간 · Bottleneck 대기 (분리 vs 통합)
    rx = 3.30
    ax.plot([rx - 0.12, rx - 0.12], [0.08, 1.74], color=LINE, lw=0.8)
    groups = (("설비 전환 시간", 1.60), ("Bottleneck 대기", 0.84))
    for g, gy in groups:
        txt(ax, rx, gy, g, 16, INK, bold=True)
        for k, (lab, ln, col) in enumerate((("분리", 1.30, G2), ("통합", 0.45, K["tobe"]))):
            yy = gy - 0.30 - k * 0.24
            txt(ax, rx, yy, lab, 16, G if k == 0 else K["tobe_txt"], bold=k == 1)
            ax.add_patch(Rectangle((rx + 0.52, yy - 0.08), ln, 0.16, fc=col, ec="none", zorder=5))
    save(fig, "v2_agility.png")


def v2_unif():
    fig, ax = canvas()
    base = 0.30
    # 왼쪽 차트: 설비 모델 수 (분리 = DRAM 전용 + NAND 전용, 통합 = 공용)
    txt(ax, 0.05, 1.66, "설비 모델 수", 16, INK, bold=True)
    bw, u = 0.52, 0.13
    xa, xb = 0.92, 1.66
    for k in range(4):
        ax.add_patch(Rectangle((xa, base + k * u), bw, u - 0.02, fc=K["dram_lt"], ec="none", zorder=5))
    for k in range(4, 8):
        ax.add_patch(Rectangle((xa, base + k * u), bw, u - 0.02, fc=K["nand_lt"], ec="none", zorder=5))
    for k in range(3):
        ax.add_patch(Rectangle((xb, base + k * u), bw, u - 0.02, fc=K["com"], ec="none", zorder=5))
    txt(ax, xa - 0.08, base + 2 * u, "DRAM", 16, K["dram_lt"], bold=True, ha="right")
    txt(ax, xa - 0.08, base + 6 * u, "NAND", 16, K["nand_txt"], ha="right")
    txt(ax, xb + bw / 2, base + 3 * u + 0.16, "↓", 18, K["com"], bold=True, ha="center")
    ax.plot([0.15, 2.15], [base, base], color=LINE, lw=0.8)
    txt(ax, xa + bw / 2, base - 0.15, "분리", 16, G, ha="center")
    txt(ax, xb + bw / 2, base - 0.15, "통합", 16, K["com"], bold=True, ha="center")
    # 가운데 화살표
    block_arrow(ax, 2.32, 0.80, 0.42, 0.26, color=K["arrow_lt"])
    # 오른쪽 차트: 모델당 발주 물량 + 구매 협상력
    ox = 2.95
    txt(ax, ox, 1.66, "모델당 발주 물량", 16, INK, bold=True)
    xa, xb = ox + 0.15, ox + 1.05
    ax.add_patch(Rectangle((xa, base), bw, 0.30, fc=G2, ec="none", zorder=5))
    ax.add_patch(Rectangle((xb, base), bw, 1.00, fc=K["com"], ec="none", zorder=5))
    for k in range(1, 4):                         # 물량 단위 눈금
        ax.plot([xb, xb + bw], [base + k * 0.25, base + k * 0.25], color=WHITE, lw=0.9, zorder=6)
    ax.plot([ox, ox + 2.25], [base, base], color=LINE, lw=0.8)
    txt(ax, xa + bw / 2, base - 0.15, "분리", 16, G, ha="center")
    txt(ax, xb + bw / 2, base - 0.15, "통합", 16, K["com"], bold=True, ha="center")
    txt(ax, xb + bw + 0.08, base + 0.82, "구매", 16, K["gain_txt"], bold=True)
    txt(ax, xb + bw + 0.08, base + 0.56, "협상력 ↑", 16, K["gain_txt"], bold=True)
    save(fig, "v2_unif.png")


# ------------------------------------------------------------------ Fab 도면
def rail(ax, x, y, w, h, color, lw=2.2, foups=(), r=0.10):
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle=f"round,pad=0,rounding_size={r}", fc="none", ec=color, lw=lw, zorder=8))
    for (fx, fy) in foups:
        ax.add_patch(Rectangle((fx - 0.045, fy - 0.045), 0.09, 0.09, fc=color, ec=WHITE, lw=0.6, zorder=9))


def v3_space():
    fig, ax = canvas()
    fy, fh, fw = 0.06, 1.42, 2.46
    # 분리: 벽으로 나뉜 두 Fab, OHT 2개, 크기가 제각각인 설비 + Dead Space
    lx = 0.04
    ax.add_patch(Rectangle((lx, fy), fw, fh, fc=WHITE, ec=G2, lw=1.0, zorder=2))
    ax.plot([lx + fw / 2, lx + fw / 2], [fy, fy + fh], color=G, lw=2.4, zorder=3)
    for k in range(2):
        zx = lx + k * fw / 2
        rail(ax, zx + 0.10, fy + 0.60, fw / 2 - 0.20, 0.22, G2, lw=1.6, foups=[(zx + 0.35, fy + 0.60), (zx + 0.85, fy + 0.82)])
    specs = [  # (x, y, w, h, kind) kind: t=설비, d=Dead Space
        (0.10, 0.12, 0.30, 0.38, "t"), (0.46, 0.12, 0.22, 0.38, "d"), (0.74, 0.12, 0.40, 0.30, "t"),
        (0.10, 0.92, 0.22, 0.44, "t"), (0.38, 0.92, 0.36, 0.44, "d"), (0.80, 0.92, 0.32, 0.36, "t"),
        (1.33, 0.12, 0.36, 0.34, "t"), (1.75, 0.12, 0.30, 0.38, "d"), (2.10, 0.12, 0.32, 0.38, "t"),
        (1.33, 0.92, 0.26, 0.40, "d"), (1.65, 0.92, 0.38, 0.44, "t"), (2.10, 0.92, 0.32, 0.30, "t")]
    for (x, y, w, h, k) in specs:
        if k == "t":
            fc = K["zoneD"] if x < lx + fw / 2 else K["zoneN"]
            ax.add_patch(Rectangle((x, y), w, h, fc=fc, ec=K["zone_ec"], lw=0.8, zorder=4))
        else:
            ax.add_patch(Rectangle((x, y), w, h, fc=WHITE, ec=MID, hatch="////", lw=0.8, ls=(0, (2, 1.5)), zorder=4))
    txt(ax, lx, 1.66, "Fab 분리: OHT 2개", 16, G, bold=True)

    # 통합: 하나의 Fab, OHT 1개, 같은 모델 줄 배치 + 확보 Bay
    rx = 2.80
    ax.add_patch(Rectangle((rx, fy), fw, fh, fc=WHITE, ec=K["hue"], lw=1.4, zorder=2))
    rail(ax, rx + 0.10, fy + 0.60, 1.86, 0.22, K["line_ok"], lw=2.2,
         foups=[(rx + 0.40, fy + 0.60), (rx + 1.00, fy + 0.82), (rx + 1.55, fy + 0.60)])
    for row, (yy, hh, col) in enumerate(((fy + 0.08, 0.40, K["modA"]), (fy + 0.90, 0.40, K["modB"]))):
        for c in range(5):
            ax.add_patch(Rectangle((rx + 0.10 + c * 0.38, yy), 0.32, hh, fc=col, ec=WHITE, lw=0.8, zorder=4))
    ax.add_patch(Rectangle((rx + 2.04, fy + 0.08), 0.36, fh - 0.16, fc=K["gain_bg"], ec=K["gain"], lw=1.0, ls=(0, (3, 2)), zorder=4))
    txt(ax, rx + 2.22, fy + fh / 2, "확보", 16, K["gain_txt"], bold=True, ha="center", rotation=90)
    txt(ax, rx, 1.66, "Common: OHT 1개", 16, K["hue"], bold=True)
    save(fig, "v3_space.png")


def wafer(ax, cx, cy, r, color, label=None):
    ax.add_patch(Circle((cx, cy), r, fc=color, ec=WHITE, lw=1.0, zorder=10))
    for k in (-1, 0, 1):                                   # 다이 격자 느낌
        ax.plot([cx - r * 0.75, cx + r * 0.75], [cy + k * r * 0.38, cy + k * r * 0.38], color=mix(color, 0.35), lw=0.7, zorder=11)
        ax.plot([cx + k * r * 0.38, cx + k * r * 0.38], [cy - r * 0.75, cy + r * 0.75], color=mix(color, 0.35), lw=0.7, zorder=11)
    ax.add_patch(Rectangle((cx - r * 0.18, cy - r - 0.01), r * 0.36, 0.035, fc=WHITE, ec="none", zorder=12))  # 노치


def v3_agility():
    fig, ax = canvas()
    D, N = K["dram"], K["nand"]
    # 입력: DRAM / NAND 웨이퍼 Lot
    wafer(ax, 0.30, 1.22, 0.20, D)
    wafer(ax, 0.30, 0.46, 0.20, N)
    txt(ax, 0.58, 1.44, "DRAM", 16, D, bold=True)
    txt(ax, 0.58, 0.24, "NAND", 16, K["nand_txt"], bold=True)
    # 공용 설비 Pool
    px, py, pw, ph = 1.38, 0.10, 2.20, 1.42
    ax.add_patch(FancyBboxPatch((px, py), pw, ph, boxstyle="round,pad=0,rounding_size=0.08", fc=K["hue_bg"], ec=K["hue"], lw=1.2,
                                ls=(0, (3, 2)), zorder=2))
    txt(ax, px + pw / 2, 1.66, "공용 BEOL 설비 Pool", 16, K["hue"], bold=True, ha="center")
    grid = ["DDSN", "DSNN"]
    for r, row in enumerate(grid):
        for c, k in enumerate(row):
            x, y = px + 0.16 + c * 0.50, py + 0.80 - r * 0.62
            col = {"D": D, "N": N, "S": N}[k]
            ax.add_patch(FancyBboxPatch((x, y), 0.40, 0.44, boxstyle="round,pad=0,rounding_size=0.04", fc=col, ec=WHITE, lw=0.8, zorder=5))
            if k == "S":
                ax.add_patch(Rectangle((x, y + 0.22), 0.40, 0.22, fc=D, ec="none", zorder=6))
                arrow(ax, x + 0.08, y + 0.47, x + 0.32, y + 0.47, color=INK, lw=1.4, ms=9, z=20, rad=-1.0)
    # 흐름선: DRAM, NAND Lot 이 Pool 의 아무 설비로나 들어간다
    for i, (sy, col) in enumerate(((1.22, D), (0.46, N))):
        for ty in (1.02, 0.40):
            arrow(ax, 0.52, sy, px - 0.02, ty + (0.08 if i == 0 else -0.06), color=col, lw=1.6, ms=10, z=7)
    for (fx, fy_, col) in ((0.82, 1.17, D), (1.06, 1.07, D), (0.84, 0.50, N), (1.10, 0.47, N)):
        ax.add_patch(Rectangle((fx - 0.05, fy_ - 0.05), 0.10, 0.10, fc=col, ec=WHITE, lw=0.6, zorder=9))
    # 출력: Bonding (셀 웨이퍼 + Peri 웨이퍼 적층)
    arrow(ax, px + pw + 0.04, 0.82, 4.10, 0.82, color=K["hue"], lw=2.4, ms=14)
    for k, col in enumerate(K["bond"]):
        ax.add_patch(Ellipse((4.62, 0.62 + k * 0.16), 0.96, 0.30, fc=col, ec=WHITE, lw=1.0, zorder=10 + k))
    txt(ax, 4.62, 1.40, "Bonding", 16, K["hue"], bold=True, ha="center")
    save(fig, "v3_agility.png")


def v3_unif():
    fig, ax = canvas()
    steps = ["Depo", "Etch", "CMP", "Bond"]
    dram = [["A1", "B4"], ["C2", "D3"], ["E1", "F5"], ["G2", "H1"]]
    nand = [["K3", "A2"], ["L1", "C6"], ["M4", "E2"], ["N2", "G7"]]
    plat = ["P1", "P2", "P3", "P4"]
    top, rh = 1.42, 0.335
    cw, ch, pitch = 0.40, 0.25, 0.45
    xd, xn, xa, xp, xl = 0.66, 1.62, 2.58, 3.04, 3.78
    txt(ax, xd + (pitch + cw) / 2, 1.66, "DRAM", 16, K["chipD"][2], bold=True, ha="center")
    txt(ax, xn + (pitch + cw) / 2, 1.66, "NAND", 16, K["chipN"][2], bold=True, ha="center")
    txt(ax, xp + 0.26, 1.66, "공용", 16, K["com"], bold=True, ha="center")

    def chip(x, y, code, fc, ec, tc, bold=False, z=5):
        ax.add_patch(FancyBboxPatch((x, y - ch / 2), cw, ch, boxstyle="round,pad=0,rounding_size=0.04", fc=fc, ec=ec, lw=0.9, zorder=z))
        txt(ax, x + cw / 2, y, code, 16, tc, bold=bold, ha="center", z=z + 1)

    labels = [("레시피 공유", K["com"]), ("부품 공용", K["com"]), ("물량 집중", K["com"]), ("협상력 ↑", K["gain_txt"])]
    for i, st in enumerate(steps):
        y = top - i * rh - rh / 2
        if i:
            ax.plot([0.02, 5.28], [y + rh / 2, y + rh / 2], color=LINE, lw=0.7, zorder=1)
        txt(ax, 0.02, y, st, 16, INK, bold=True)
        for k, code in enumerate(dram[i]):
            chip(xd + k * pitch, y, code, *K["chipD"])
        for k, code in enumerate(nand[i]):
            chip(xn + k * pitch, y, code, *K["chipN"])
        block_arrow(ax, xa, y, 0.36, 0.20, color=K["arrow_lt"])
        for k in (2, 1):                                      # 물량이 쌓인 느낌
            ax.add_patch(FancyBboxPatch((xp + k * 0.06, y - ch / 2 + k * 0.035), cw, ch, boxstyle="round,pad=0,rounding_size=0.04",
                                        fc=[K["com"], K["com_lt"], K["com_lt2"]][k], ec=WHITE, lw=0.8, zorder=5 - k))
        chip(xp, y, plat[i], K["com"], WHITE, WHITE, bold=True, z=6)
        txt(ax, xl, y, labels[i][0], 16, labels[i][1], bold=True)
    save(fig, "v3_unif.png")


def main():
    figs = (v1_space, v1_agility, v1_unif, v2_space, v2_agility, v2_unif, v3_space, v3_agility, v3_unif)
    global TAG
    for theme, tag in ((MONO, "v"), (COLOR, "c")):
        TAG = tag
        for f in figs:
            use(theme, f.__name__.split("_")[1])
            f()
    use(MONO)
    print("figures ->", OUT)


if __name__ == "__main__":
    main()
