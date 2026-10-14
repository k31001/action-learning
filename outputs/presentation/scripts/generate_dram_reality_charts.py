"""DRAM 현실 파악 1장(시안 3종)용 차트 (2026-10-14).

그림 크기(인치) = 슬라이드 배치 크기(20 x 11.25in 캔버스)이므로 글자 pt가 슬라이드 pt와 같다. 최소 16pt.
근거: sources/articles/dram-shrink-wall-and-ai-memory-bottleneck-2026-10.md

왼쪽(위기) - DRAM 주력 노드 추이 2000~2030
  node_log.png        로그 축 + 두 시기 기울기 + 2026 업체 위치(로고)          시안 A
  node_linear.png     선형 축 + 2012 이후 확대 삽입                            시안 B
  node_cadence.png    로그 축 + 아래 노드 전환 점 줄(촘촘 → 성김)              시안 C
오른쪽(기회) - AI 추론 메모리
  drivers.png         더 큰 모델 · 더 긴 문맥 · 더 많은 토큰 (작은 막대 3개)   시안 A
  kv_stair.png        토큰당 KV 계단(MHA → GQA → FP8 → FP4 → MLA, 로그)        시안 A · C
  tug.png             늘리는 힘 vs 줄이는 힘 배수(로그 발산 막대)              시안 B
  flywheel.png        알고리즘 ↔ 메모리 선순환 고리                            시안 B
  tank.png            요청 1건 KV vs 가속기 1개 HBM 288GB                      시안 C
  tokens.png          Google 월간 처리 토큰(로그)                              시안 C
"""
import os

import matplotlib
import numpy as np

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager
from matplotlib.offsetbox import AnnotationBbox, OffsetImage
from matplotlib.patches import FancyArrowPatch, FancyBboxPatch, Wedge
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(HERE, "..", "assets")
LOGOS = os.path.join(ASSETS, "logos")
OUT = os.path.join(ASSETS, "dram-reality")
os.makedirs(OUT, exist_ok=True)

for fp in ("/usr/share/fonts/truetype/nanum/NanumGothic.ttf", "/usr/share/fonts/truetype/nanum/NanumGothicBold.ttf"):
    if os.path.exists(fp):
        font_manager.fontManager.addfont(fp)
for cand in ("NanumGothic", "Noto Sans CJK KR", "Pretendard"):
    if any(f.name == cand for f in font_manager.fontManager.ttflist):
        plt.rcParams["font.family"] = cand
        break
plt.rcParams["axes.unicode_minus"] = False

# 사용자 지시(2026-10-14): 블루 단일 톤에 묶지 않고 의미별로 색을 나눈다.
NAVY = "#3C4FA5"      # 덱 기본 Blue(v2.2)
TEAL = "#0E9384"      # 미세화 전성기 / 기회
ORANGE = "#E8590C"    # 둔화 · 병목
AMBER = "#F2A900"
PURPLE = "#6941C6"    # 알고리즘
RED = "#D93025"
INK = "#1A1A1A"
GRAY = "#555555"
GRAY_2 = "#8A8A8A"
GRAY_3 = "#C9C9C9"
TEAL_BG = "#E6F3F1"
TEAL_MID = "#9FD3CC"
ORANGE_MID = "#F7BE9C"
ORANGE_BG = "#FDEFE6"
GRAY_BG = "#F1F1F1"
LINE = "#D9D9D9"
# 업체 CI 색(로고에서 추출)
CO = {
    "samsung": ("#1428A0", "o"),
    "sk-hynix": ("#F58025", "D"),
    "micron": ("#1A1A1A", "s"),
    "cxmt": ("#146DC6", "^"),
}

# ---------------------------------------------------------------- 데이터 (근거 원장 §1 · §2)
# 업계 선두 주력 양산 노드, half-pitch 근사(nm). 10nm급 이후는 업체별 명명 차이 → 추세용
NODES = [
    (2000, 180, ""), (2001, 150, ""), (2002, 130, ""), (2003, 110, ""), (2004, 90, "90"),
    (2005, 80, ""), (2006, 68, ""), (2007, 60, ""), (2008, 50, "50"), (2009, 44, ""),
    (2010, 35, ""), (2011, 29, "2x"), (2013, 25, "2y"), (2014, 20, "20"), (2016, 18, "1x"),
    (2018, 17.1, "1y"), (2019, 15.7, "1z"), (2021, 14, "1a"), (2023, 12.5, "1b"), (2025, 11.5, "1c"),
]
FORECAST = [(2025, 11.5, ""), (2027, 10.5, "1d"), (2030, 9.0, "0a")]
CXMT = [(2019, 19), (2023, 18), (2025, 16)]
CXMT_NEXT = (2026.75, 15)
POS_2026 = [  # (업체, 연도 x, nm, 라벨)
    ("samsung", 2025.55, 11.5, "1c"),
    ("sk-hynix", 2026.0, 12.0, "1b→1c"),
    ("micron", 2026.45, 11.5, "1γ"),
    ("cxmt", 2026.0, 16.0, "G4 16nm"),
]
ERA1 = [(y, n) for y, n, _ in NODES if y <= 2011]
ERA2 = [(y, n) for y, n, _ in NODES if y >= 2013]


def fit(pts):
    x = np.array([p[0] for p in pts], float)
    y = np.log10([p[1] for p in pts])
    k, b = np.polyfit(x, y, 1)
    return k, b, (10 ** k - 1) * 100  # 연간 변화율 %


K1, B1, R1 = fit(ERA1)   # 약 -15%/년
K2, B2, R2 = fit(ERA2)   # 약 -6%/년


def _clean(ax, left=True):
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.spines["left"].set_visible(left)
    ax.spines["left"].set_color(LINE)
    ax.spines["bottom"].set_color(GRAY_3)
    ax.tick_params(colors=GRAY, length=0, labelsize=16)


def save(fig, name):
    fig.savefig(os.path.join(OUT, name), dpi=300, transparent=True)
    plt.close(fig)
    print("saved", name)


def logo_img(name, h_pt):
    """높이 h_pt(포인트)로 그리는 로고. OffsetImage는 1픽셀 = 1pt로 그린 뒤 dpi로 확대한다."""
    im = Image.open(os.path.join(LOGOS, f"{name}.png")).convert("RGBA")
    return OffsetImage(np.asarray(im), zoom=h_pt / im.size[1])


def _node_base(ax, log=True, labels=True, slopes=True):
    xs = [y for y, _, _ in NODES]
    ys = [n for _, n, _ in NODES]
    # 시기 음영
    # 투명 PNG에서 알파 블렌딩이 뷰어마다 달라 보이지 않도록 불투명 연색을 쓴다
    ax.axvspan(1999.3, 2012, color=TEAL_BG, lw=0, zorder=0)
    ax.axvspan(2012, 2026.5, color=ORANGE_BG, lw=0, zorder=0)
    ax.axvspan(2026.5, 2030.8, color=GRAY_BG, lw=0, zorder=0)
    ax.plot(xs, ys, color=INK, lw=2.6, marker="o", ms=6.5, mfc="white", mec=INK, mew=1.8, zorder=4)
    fx = [p[0] for p in FORECAST]
    fy = [p[1] for p in FORECAST]
    ax.plot(fx, fy, color=GRAY_2, lw=2.4, ls=(0, (3, 2)), marker="o", ms=6.5, mfc="white", mec=GRAY_2, zorder=3)
    if slopes:
        # 시기별 회귀선을 데이터 뒤의 굵은 띠로
        x1 = np.array([2000, 2011.3])
        ax.plot(x1, 10 ** (K1 * x1 + B1), color=TEAL_MID, lw=13, solid_capstyle="round", zorder=2)
        x2 = np.array([2013, 2025])
        ax.plot(x2, 10 ** (K2 * x2 + B2), color=ORANGE_MID, lw=13, solid_capstyle="round", zorder=2)
    if labels:
        for y, n, lab in NODES + FORECAST[1:]:
            if not lab:
                continue
            if y > 2026:  # 전망 라벨: 1d는 아래, 0a는 위
                up = lab == "0a"
                ax.text(y, n * (1.10 if up else 0.86), lab, ha="center", va="bottom" if up else "top", fontsize=15, color=GRAY_2)
            else:
                ax.text(y, n * 0.80, lab, ha="center", va="top", fontsize=15, color=GRAY)
    ax.set_xlim(1999.3, 2030.8)
    ax.set_xticks([2000, 2005, 2010, 2015, 2020, 2025, 2030])
    if log:
        ax.set_yscale("log")
        ax.set_ylim(7.2, 260)
        ax.set_yticks([10, 20, 50, 100, 200])
        ax.set_yticklabels(["10", "20", "50", "100", "200"])
        ax.minorticks_off()
    ax.yaxis.grid(True, color=LINE, lw=0.6)
    _clean(ax)


def _positions(ax, logo_box=True, y_box=(40, 235), x_box=2016.9):
    """2026 업체 위치 마커 + 오른쪽 위 로고 상자."""
    cx = [p[0] for p in CXMT] + [CXMT_NEXT[0]]
    cy = [p[1] for p in CXMT] + [CXMT_NEXT[1]]
    c_col = CO["cxmt"][0]
    ax.plot(cx[:3], cy[:3], color=c_col, lw=2.2, ls=(0, (1.2, 1.6)), marker="^", ms=8, mfc="white", mec=c_col, zorder=5)
    ax.annotate("", xy=CXMT_NEXT, xytext=(2026.05, 15.9),
                arrowprops=dict(arrowstyle="-|>", color=c_col, lw=1.8, ls=(0, (2, 1.5)), mutation_scale=14), zorder=5)
    ax.text(2026.2, 19.0, "G5 15nm 목표", fontsize=14, color=c_col, va="bottom", ha="center")
    for name, x, nm, _ in POS_2026:
        col, mk = CO[name]
        ax.plot([x], [nm], marker=mk, ms=13 if mk != "D" else 11, color=col, mec="white", mew=1.4, zorder=7)
    # 격차 괄호
    for yy in (11.5, 16.0):
        ax.plot([2026.5, 2028.15], [yy, yy], color=RED, lw=1.0, ls=(0, (2, 2)), zorder=6)
    ax.annotate("", xy=(2028.0, 11.4), xytext=(2028.0, 16.1),
                arrowprops=dict(arrowstyle="<->", color=RED, lw=2.0, mutation_scale=14), zorder=6)
    ax.text(2028.3, 13.6, "약\n3세대", fontsize=15, color=RED, ha="left", va="center", fontweight="bold", linespacing=1.0)
    if not logo_box:
        return
    # 로고 상자 (위쪽 빈 공간): 줄마다 마커 + 로고 + 노드
    rows = [
        ("samsung", "1c 양산"),
        ("sk-hynix", "1b 주력 · 1c 램프"),
        ("micron", "1γ · 첫 EUV"),
        ("cxmt", "G4 16nm · DUV"),
    ]
    y0, y1 = np.log10(y_box[0]), np.log10(y_box[1])
    step = (y1 - y0) / (len(rows) + 0.75)
    ax.add_patch(FancyBboxPatch((x_box - 0.4, 10 ** (y0 - step * 0.05)), 2030.6 - x_box + 0.4, 10 ** (y1 + 0.02) - 10 ** (y0 - step * 0.05),
                                boxstyle="round,pad=0,rounding_size=0.3", fc="white", ec=GRAY_3, lw=1.0, zorder=8,
                                transform=ax.transData))
    ax.text(x_box, 10 ** (y1 - step * 0.12), "2026년 각 사 주력 노드", fontsize=16, fontweight="bold", color=INK, va="top", zorder=9)
    for i, (name, txt) in enumerate(rows):
        yy = 10 ** (y1 - step * (i + 1.3))
        col, mk = CO[name]
        ax.plot([x_box + 0.25], [yy], marker=mk, ms=12 if mk != "D" else 10, color=col, mec="white", zorder=10)
        hp = {"samsung": 11, "sk-hynix": 24, "micron": 13, "cxmt": 15}[name]
        ab = AnnotationBbox(logo_img(name, hp), (x_box + 0.85, yy), xycoords="data", box_alignment=(0, 0.5),
                            frameon=False, zorder=10)
        ax.add_artist(ab)
        ax.text(x_box + 6.3, yy, txt, fontsize=16, color=INK, va="center", zorder=10)


# ---------------------------------------------------------------- 왼쪽: 시안 A (로그)
def node_log(w=8.76, h=5.30):
    fig = plt.figure(figsize=(w, h))
    ax = fig.add_axes([0.085, 0.085, 0.905, 0.895])
    _node_base(ax)
    ax.text(2000.6, 16, f"2000~2011\n연 {R1:.0f}%", fontsize=18, color=TEAL, fontweight="bold", va="center")
    ax.text(2012.8, 8.2, f"2013~2025  연 {R2:.0f}%", fontsize=18, color=ORANGE, fontweight="bold", va="center")
    ax.text(2028.9, 7.5, "전망", fontsize=15, color=GRAY_2, va="bottom")
    ax.set_ylabel("주력 노드 half-pitch (nm, 로그 축)", fontsize=16, color=GRAY)
    _positions(ax)
    save(fig, "node_log.png")


# ---------------------------------------------------------------- 왼쪽: 시안 B (선형 + 확대)
def node_linear(w=8.76, h=5.30):
    fig = plt.figure(figsize=(w, h))
    ax = fig.add_axes([0.085, 0.085, 0.905, 0.895])
    _node_base(ax, log=False, labels=False, slopes=False)
    ax.set_ylim(0, 195)
    ax.set_yticks([0, 50, 100, 150])
    for y, n, lab in NODES:
        if lab in ("90", "50", "2x"):
            ax.text(y + 0.4, n + 6, lab, fontsize=15, color=GRAY)
    ax.set_ylabel("주력 노드 half-pitch (nm)", fontsize=16, color=GRAY)
    ax.text(2003.6, 178, "2000~2011\n151nm 축소", fontsize=17, color=TEAL, fontweight="bold", va="top")
    # 확대 상자 영역 표시
    ax.add_patch(plt.Rectangle((2012.5, 5), 18.1, 23, fill=False, ec=ORANGE, lw=1.6, ls=(0, (3, 2))))
    ax.text(2012.7, 30, "2013~2025: 13.5nm 축소 (25 → 11.5)", fontsize=16, color=ORANGE, fontweight="bold")
    # 삽입 확대
    ins = fig.add_axes([0.50, 0.37, 0.49, 0.56])
    ins.set_facecolor("white")
    xs = [y for y, _, _ in NODES if y >= 2013]
    ys = [n for y, n, _ in NODES if y >= 2013]
    ins.plot(xs, ys, color=INK, lw=2.4, marker="o", ms=6, mfc="white", mec=INK, mew=1.6, zorder=4)
    ins.plot([p[0] for p in FORECAST], [p[1] for p in FORECAST], color=GRAY_2, lw=2.2, ls=(0, (3, 2)), marker="o", ms=6, mfc="white", mec=GRAY_2)
    for y, n, lab in NODES + FORECAST[1:]:
        if y > 2013 and lab:
            up = lab == "0a"
            ins.text(y, n + (0.45 if up else -0.55), lab, fontsize=13, color=GRAY_2 if y > 2026 else GRAY, ha="center",
                     va="bottom" if up else "top")
    ins.set_xlim(2012.3, 2033.2)
    ins.set_ylim(7.0, 27)
    ins.set_xticks([2015, 2020, 2025, 2030])
    ins.set_yticks([10, 15, 20, 25])
    ins.yaxis.grid(True, color=LINE, lw=0.6)
    for s in ins.spines.values():
        s.set_color(ORANGE)
        s.set_linewidth(1.6)
    ins.tick_params(colors=GRAY, length=0, labelsize=14)
    # 업체 위치를 확대 상자에
    cx = [p[0] for p in CXMT]
    ins.plot(cx, [p[1] for p in CXMT], color=CO["cxmt"][0], lw=2.0, ls=(0, (1.2, 1.6)), marker="^", ms=7, mfc="white", mec=CO["cxmt"][0])
    ins.annotate("", xy=CXMT_NEXT, xytext=(2026.05, 15.9),
                 arrowprops=dict(arrowstyle="-|>", color=CO["cxmt"][0], lw=1.6, mutation_scale=12))
    for name, x, nm, _ in POS_2026:
        col, mk = CO[name]
        ins.plot([x], [nm], marker=mk, ms=11 if mk != "D" else 9, color=col, mec="white", mew=1.2, zorder=7)
    for name, (lx, ly), hp in (("samsung", (2028.6, 12.6), 9), ("sk-hynix", (2028.6, 15.2), 18),
                               ("micron", (2028.6, 8.3), 11), ("cxmt", (2028.6, 18.6), 12)):
        ab = AnnotationBbox(logo_img(name, hp), (lx, ly), frameon=False, box_alignment=(0, 0.5))
        ins.add_artist(ab)
    for xy, xt, c in (((2025.75, 11.6), (2028.4, 12.6), CO["samsung"][0]), ((2026.15, 12.3), (2028.4, 15.0), CO["sk-hynix"][0]),
                      ((2026.6, 11.2), (2028.4, 8.6), GRAY), ((2026.2, 16.4), (2028.4, 18.4), CO["cxmt"][0])):
        ins.annotate("", xy=xy, xytext=xt, arrowprops=dict(arrowstyle="-", color=c, lw=1.2))
    ins.annotate("", xy=(2024.4, 11.7), xytext=(2024.4, 15.8), arrowprops=dict(arrowstyle="<->", color=RED, lw=1.8, mutation_scale=12))
    ins.text(2024.0, 15.9, "약 3세대", fontsize=14, color=RED, ha="right", va="center", fontweight="bold")
    ins.text(2015.2, 25.8, "2013~2030 확대", fontsize=14, color=ORANGE, fontweight="bold", va="top")
    save(fig, "node_linear.png")


# ---------------------------------------------------------------- 왼쪽: 시안 C (로그 + 전환 점 줄)
def node_cadence(w=8.76, h=5.30):
    fig = plt.figure(figsize=(w, h))
    ax = fig.add_axes([0.085, 0.255, 0.905, 0.73])
    _node_base(ax)
    ax.tick_params(labelbottom=False)
    ax.text(2001.0, 30, f"연 {R1:.0f}%", fontsize=18, color=TEAL, fontweight="bold", va="center")
    ax.text(2012.8, 9.0, f"연 {R2:.0f}%", fontsize=18, color=ORANGE, fontweight="bold", va="center")
    ax.set_ylabel("half-pitch (nm, 로그 축)", fontsize=16, color=GRAY)
    _positions(ax, y_box=(40, 235))
    # 아래: 노드 전환 점 줄
    bx = fig.add_axes([0.085, 0.07, 0.905, 0.15], sharex=ax)
    e1 = [y for y, _, _ in NODES if y <= 2011]
    e2 = [y for y, _, _ in NODES if y >= 2013]
    bx.scatter(e1, [0] * len(e1), s=150, color=TEAL, zorder=3)
    bx.scatter(e2, [0] * len(e2), s=150, color=ORANGE, zorder=3)
    bx.scatter([2027, 2030], [0, 0], s=150, facecolor="white", edgecolor=GRAY_2, lw=1.8, zorder=3)
    bx.axhline(0, color=GRAY_3, lw=1.2, zorder=1)
    bx.text(2000, 0.55, "새 노드 12개 / 12년", fontsize=16, color=TEAL, fontweight="bold", va="bottom")
    bx.text(2013, 0.55, "8개 / 13년", fontsize=16, color=ORANGE, fontweight="bold", va="bottom")
    bx.set_ylim(-0.6, 1.5)
    bx.set_yticks([])
    for s in ("top", "right", "left", "bottom"):
        bx.spines[s].set_visible(False)
    bx.tick_params(colors=GRAY, length=0, labelsize=16)
    bx.set_xticks([2000, 2005, 2010, 2015, 2020, 2025, 2030])
    save(fig, "node_cadence.png")


# ---------------------------------------------------------------- 오른쪽: 드라이버 3종 (시안 A)
def drivers(w=8.96, h=2.00):
    fig = plt.figure(figsize=(w, h))
    specs = [
        ("더 큰 모델", "KV / 토큰 (KiB)", ["8B", "70B", "405B"], [128, 320, 504], ["128", "320", "504"], PURPLE),
        ("더 긴 문맥", "요청 1건 KV (GB)", ["8K", "128K", "1M"], [2.68, 42.95, 327.7], ["2.7", "43", "328"], ORANGE),
        ("더 많은 토큰", "Google 월간 (조, 로그)", ["'24", "'25", "'26"], [9.7, 480, 3200], ["9.7", "480", "3,200"], TEAL),
    ]
    pw, gap = 0.30, 0.045
    for i, (ttl, unit, cats, vals, labs, col) in enumerate(specs):
        ax = fig.add_axes([0.01 + i * (pw + gap), 0.13, pw, 0.56])
        logy = i == 2
        bars = ax.bar(range(3), vals, color=[col] * 3, width=0.62, alpha=1.0)
        for j, b in enumerate(bars):
            b.set_alpha(0.35 + 0.325 * j)
        ax.set_xticks(range(3))
        ax.set_xticklabels(cats, fontsize=16)
        if logy:
            ax.set_yscale("log")
            ax.set_ylim(3, 3200 * 9)
        else:
            ax.set_ylim(0, max(vals) * 1.42)
        if i == 1:
            ax.axhline(288, color=RED, lw=1.8, ls=(0, (3, 2)))
            ax.text(-0.45, 288 * 1.04, "HBM 288GB", fontsize=14, color=RED, va="bottom")
        for j, v in enumerate(vals):
            ax.text(j, v * (1.7 if logy else 1) + (0 if logy else max(vals) * 0.03), labs[j], ha="center", va="bottom",
                    fontsize=16, fontweight="bold" if j == 2 else "normal", color=col if j == 2 else INK)
        ax.set_yticks([])
        ax.minorticks_off()
        for s in ("top", "right", "left"):
            ax.spines[s].set_visible(False)
        ax.spines["bottom"].set_color(GRAY_3)
        ax.tick_params(length=0, colors=GRAY)
        fig.text(0.01 + i * (pw + gap), 0.97, ttl, fontsize=18, fontweight="bold", color=col, va="top")
        fig.text(0.01 + i * (pw + gap), 0.80, unit, fontsize=14, color=GRAY, va="top")
    save(fig, "drivers.png")


# ---------------------------------------------------------------- 토큰당 KV 계단 (시안 A · C)
def kv_stair(w=4.35, h=2.30, name="kv_stair.png", short=False):
    fig = plt.figure(figsize=(w, h))
    ax = fig.add_axes([0.335, 0.02, 0.645, 0.96])
    cats = ["MHA · BF16", "GQA · BF16", "GQA · FP8", "GQA · FP4", "MLA · BF16"]
    vals = [2560, 320, 160, 80, 68.6]
    cols = [GRAY_3, PURPLE, PURPLE, PURPLE, TEAL]
    alph = [1, 0.55, 0.7, 0.85, 1]
    if short:  # FP8 줄을 뺀 4줄
        cats, vals, cols, alph = ([v for i, v in enumerate(a) if i != 2] for a in (cats, vals, cols, alph))
    y = np.arange(len(cats))[::-1]
    for yy, v, c, a in zip(y, vals, cols, alph):
        ax.barh(yy, v, color=c, alpha=a, height=0.66)
        ax.text(v * 1.12, yy, f"{v:,.0f}" if v >= 100 else f"{v}", va="center", fontsize=16,
                color=INK, fontweight="bold" if v == 68.6 else "normal")
    ax.set_xscale("log")
    ax.set_xlim(30, 13000)
    ax.set_yticks(y)
    ax.set_yticklabels(cats, fontsize=16)
    ax.set_xticks([])
    ax.minorticks_off()
    for s in ("top", "right", "bottom"):
        ax.spines[s].set_visible(False)
    ax.spines["left"].set_color(GRAY_3)
    ax.tick_params(length=0, colors=INK)
    save(fig, name)


# ---------------------------------------------------------------- 늘리는 힘 vs 줄이는 힘 (시안 B)
def tug(w=8.96, h=2.35):
    """배수 비교(로그 발산 막대). 요인별 배수이며 서로 곱하지 않는다(정의가 다름)."""
    fig = plt.figure(figsize=(w, h))
    ax = fig.add_axes([0.01, 0.17, 0.98, 0.81])
    down = [("GQA", 8), ("MLA", 7.3), ("FP4 KV", 4), ("Paged", 3.2)]
    up = [("토큰", 330), ("문맥", 128), ("모델", 3.9)]
    for i, (lab, f) in enumerate(down):
        yy = 3 - i
        ax.barh(yy, -np.log10(f), color=PURPLE, alpha=0.88, height=0.66)
        ax.text(-np.log10(f) - 0.07, yy, f"{lab}  ÷{f:g}", ha="right", va="center", fontsize=18, fontweight="bold", color=PURPLE)
    for i, (lab, f) in enumerate(up):
        yy = 3 - i * 1.0 - 0.5
        ax.barh(yy, np.log10(f), color=ORANGE, alpha=0.92, height=0.66)
        ax.text(np.log10(f) + 0.07, yy, f"×{f:g}  {lab}", ha="left", va="center", fontsize=18, fontweight="bold", color=ORANGE)
    ax.axvline(0, color=INK, lw=1.6)
    ax.set_xlim(-2.75, 3.75)
    ax.set_ylim(-0.5, 3.45)
    ax.set_yticks([])
    ax.set_xticks([])
    for sp in ax.spines.values():
        sp.set_visible(False)
    fig.text(0.01 + 0.98 * 2.75 / 6.5 - 0.01, 0.02, "◀ 알고리즘이 줄인 배수", ha="right", va="bottom", fontsize=16, color=PURPLE, fontweight="bold")
    fig.text(0.01 + 0.98 * 2.75 / 6.5 + 0.01, 0.02, "수요가 늘린 배수 ▶   (로그 축)", ha="left", va="bottom", fontsize=16, color=ORANGE, fontweight="bold")
    save(fig, "tug.png")


# ---------------------------------------------------------------- 선순환 고리 (시안 B)
def flywheel(w=3.6, h=3.6):
    fig = plt.figure(figsize=(w, h))
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(-1.25, 1.25)
    ax.set_ylim(-1.25, 1.25)
    ax.set_aspect("equal")
    ax.axis("off")
    r, wd = 1.0, 0.17
    ax.add_patch(Wedge((0, 0), r, 15, 165, width=wd, color=PURPLE, alpha=0.9))
    ax.add_patch(Wedge((0, 0), r, 195, 345, width=wd, color=TEAL, alpha=0.9))
    # 화살촉
    for ang, col in ((15, PURPLE), (195, TEAL)):
        a = np.deg2rad(ang)
        rm = r - wd / 2
        p = np.array([rm * np.cos(a), rm * np.sin(a)])
        t = np.array([np.sin(a), -np.cos(a)])  # 시계 방향 접선
        nrm = np.array([np.cos(a), np.sin(a)])
        tri = np.array([p + nrm * 0.17, p - nrm * 0.17, p + t * 0.22])
        ax.add_patch(plt.Polygon(tri, color=col))
    save(fig, "flywheel.png")


# ---------------------------------------------------------------- 요청 1건 KV vs HBM (시안 C)
def tank(w=4.55, h=3.20):
    fig = plt.figure(figsize=(w, h))
    ax = fig.add_axes([0.03, 0.15, 0.94, 0.70])
    cats = ["채팅\n1.6K 토큰", "에이전트\n68K 토큰", "1M 문맥"]
    vals = [0.53, 22.2, 327.7]
    cols = [GRAY_3, AMBER, ORANGE]
    ax.bar(range(3), vals, color=cols, width=0.62)
    ax.bar([2], [327.7 - 288], bottom=[288], color=RED, width=0.62)
    ax.axhline(288, color=INK, lw=1.8, ls=(0, (3, 2)))
    ax.text(-0.42, 288 + 8, "가속기 1개 HBM 288GB", fontsize=15, color=INK, va="bottom")
    for j, v in enumerate(vals):
        ax.text(j, v + 9, f"{v:g} GB", ha="center", va="bottom", fontsize=16, fontweight="bold" if j == 2 else "normal",
                color=RED if j == 2 else INK)
    ax.set_ylim(0, 380)
    ax.set_xticks(range(3))
    ax.set_xticklabels(cats, fontsize=15)
    ax.set_yticks([])
    for s in ("top", "right", "left"):
        ax.spines[s].set_visible(False)
    ax.spines["bottom"].set_color(GRAY_3)
    ax.tick_params(length=0, colors=INK)
    fig.text(0.03, 0.99, "요청 1건의 KV (70B급, BF16)", fontsize=16, color=GRAY, va="top")
    save(fig, "tank.png")


# ---------------------------------------------------------------- Google 월간 토큰 (시안 C)
def tokens(w=4.30, h=2.55):
    fig = plt.figure(figsize=(w, h))
    ax = fig.add_axes([0.05, 0.16, 0.90, 0.64])
    xs = [0, 1, 2]
    vs = [9.7, 480, 3200]
    ax.plot(xs, vs, color=TEAL, lw=4, marker="o", ms=10, mfc="white", mew=2.5)
    ax.set_yscale("log")
    ax.set_ylim(3, 30000)
    for x, v, lab in zip(xs, vs, ["9.7조", "480조", "3,200조"]):
        ax.text(x, v * 2.0, lab, ha="center", va="bottom", fontsize=16, fontweight="bold" if x == 2 else "normal",
                color=TEAL if x == 2 else INK)
    ax.set_xlim(-0.35, 2.35)
    ax.set_xticks(xs)
    ax.set_xticklabels(["2024-05", "2025-05", "2026-05"], fontsize=15)
    ax.set_yticks([])
    ax.minorticks_off()
    for s in ("top", "right", "left"):
        ax.spines[s].set_visible(False)
    ax.spines["bottom"].set_color(GRAY_3)
    ax.tick_params(length=0, colors=GRAY)
    fig.text(0.05, 0.99, "Google 월간 처리 토큰 (로그 축)", fontsize=16, color=GRAY, va="top")
    save(fig, "tokens.png")

# ================================================================ 간결형(시안 A2 · B2 · C2, 2026-10-14 v1.1)
# 사용자 지시: 텍스트와 부수 내용을 줄이고 핵심 위주로 시각화를 강화. 왼쪽 그래프는 절반 영역 전체(8.76 x 6.40)를 쓰고
# 로고를 마커 옆에 직접 단다(로고 상자 없음). 글자는 크게(18~26pt).
LOGO_SLOTS = [("cxmt", 21.0, 16), ("sk-hynix", 13.0, 25), ("samsung", 10.6, 10), ("micron", 8.5, 14)]


def _simple_positions(ax, x_logo=2030.9, slots=None):
    c_col = CO["cxmt"][0]
    ax.plot([p[0] for p in CXMT], [p[1] for p in CXMT], color=c_col, lw=2.6, ls=(0, (1.2, 1.6)), marker="^", ms=10,
            mfc="white", mec=c_col, zorder=5)
    ax.annotate("", xy=CXMT_NEXT, xytext=(2026.05, 15.9),
                arrowprops=dict(arrowstyle="-|>", color=c_col, lw=2.0, ls=(0, (2, 1.5)), mutation_scale=16), zorder=5)
    pos = {n: (x, nm) for n, x, nm, _ in POS_2026}
    for name, x, nm, _ in POS_2026:
        col, mk = CO[name]
        ax.plot([x], [nm], marker=mk, ms=16 if mk != "D" else 13, color=col, mec="white", mew=1.6, zorder=7)
    for name, ly, hp in slots or LOGO_SLOTS:
        x, nm = pos[name]
        col = CO[name][0] if name != "micron" else GRAY
        ax.annotate("", xy=(x + 0.35, nm), xytext=(x_logo - 0.15, ly),
                    arrowprops=dict(arrowstyle="-", color=col, lw=1.3, shrinkA=0, shrinkB=0), zorder=6)
        ax.add_artist(AnnotationBbox(logo_img(name, hp), (x_logo, ly), frameon=False, box_alignment=(0, 0.5), zorder=8))
    # 격차: 같은 x(2026.0)의 SK hynix(12) ↔ CXMT(16) 사이
    ax.annotate("", xy=(2027.0, 11.5), xytext=(2027.0, 16.0),
                arrowprops=dict(arrowstyle="<->", color=RED, lw=2.4, mutation_scale=14, shrinkA=0, shrinkB=0), zorder=6)
    ax.text(2027.3, 14.3, "3세대", fontsize=18, color=RED, ha="left", va="center", fontweight="bold", zorder=6)


def _simple_axes(ax, log=True):
    ax.set_xlim(1999.3, 2035.4)
    ax.set_xticks([2000, 2010, 2020, 2030])
    ax.spines["bottom"].set_bounds(1999.3, 2030.8)
    if log:
        ax.set_yscale("log")
        ax.set_ylim(7.2, 260)
        ax.set_yticks([10, 20, 50, 100, 200])
        ax.set_yticklabels(["10", "20", "50", "100", "200"])
        ax.minorticks_off()
    ax.tick_params(labelsize=18)


def node_simple_log(w=8.76, h=6.40, name="node_simple_log.png", strip=False):
    fig = plt.figure(figsize=(w, h))
    ax = fig.add_axes([0.075, 0.27 if strip else 0.075, 0.92, 0.68 if strip else 0.875])
    _node_base(ax, labels=False)
    _simple_axes(ax)
    for y, n, lab in NODES:
        if lab in ("90", "2x", "1c"):
            ax.text(y + (0.3 if lab != "1c" else -0.2), n * (1.18 if lab != "1c" else 0.80), lab, fontsize=17, color=GRAY,
                    ha="left" if lab != "1c" else "center", va="bottom" if lab != "1c" else "top")
    ax.text(2001.0, 22, f"연 {R1:.0f}%", fontsize=34, color=TEAL, fontweight="bold", va="center")
    ax.text(2006.0, 13.2, "2000~2011", fontsize=18, color=TEAL, va="center")
    ax.text(2013.0, 55, f"연 {R2:.0f}%", fontsize=34, color=ORANGE, fontweight="bold", va="center")
    ax.text(2013.1, 38, "2013~2025", fontsize=18, color=ORANGE, va="center")
    ax.text(0.0, 1.0, "nm (로그 축)", transform=ax.transAxes, fontsize=16, color=GRAY, va="bottom", ha="left")
    _simple_positions(ax, slots=[("cxmt", 21.0, 15), ("sk-hynix", 13.2, 22), ("samsung", 10.3, 9), ("micron", 8.3, 13)] if strip else None)
    if strip:
        ax.tick_params(labelbottom=False)
        bx = fig.add_axes([0.075, 0.06, 0.92, 0.15], sharex=ax)
        e1 = [y for y, _, _ in NODES if y <= 2011]
        e2 = [y for y, _, _ in NODES if y >= 2013]
        bx.scatter(e1, [0] * len(e1), s=260, color=TEAL, zorder=3)
        bx.scatter(e2, [0] * len(e2), s=260, color=ORANGE, zorder=3)
        bx.scatter([2027, 2030], [0, 0], s=260, facecolor="white", edgecolor=GRAY_2, lw=2, zorder=3)
        bx.axhline(0, color=GRAY_3, lw=1.4, zorder=1)
        bx.text(2000, 0.6, "새 노드 매년", fontsize=19, color=TEAL, fontweight="bold", va="bottom")
        bx.text(2013, 0.6, "1.6년마다", fontsize=19, color=ORANGE, fontweight="bold", va="bottom")
        bx.set_ylim(-0.7, 1.7)
        bx.set_yticks([])
        for sp in bx.spines.values():
            sp.set_visible(False)
        bx.tick_params(colors=GRAY, length=0, labelsize=18)
        bx.set_xticks([2000, 2010, 2020, 2030])
    save(fig, name)


def node_simple_linear(w=8.76, h=6.40):
    fig = plt.figure(figsize=(w, h))
    ax = fig.add_axes([0.075, 0.075, 0.92, 0.875])
    _node_base(ax, log=False, labels=False, slopes=False)
    _simple_axes(ax, log=False)
    ax.set_ylim(0, 195)
    ax.set_yticks([0, 50, 100, 150])
    ax.text(0.0, 1.0, "nm", transform=ax.transAxes, fontsize=16, color=GRAY, va="bottom", ha="left")
    ax.text(2004.6, 158, "-151nm", fontsize=32, color=TEAL, fontweight="bold", va="center")
    ax.text(2004.7, 136, "2000~2011", fontsize=18, color=TEAL, va="center")
    ax.text(2013.0, 48, "-13.5nm", fontsize=32, color=ORANGE, fontweight="bold", va="center")
    ax.text(2013.1, 32, "2013~2025", fontsize=18, color=ORANGE, va="center")
    # 2026 확대: 위 오른쪽
    ins = fig.add_axes([0.53, 0.50, 0.455, 0.46])
    ins.set_facecolor("white")
    xs = [y for y, _, _ in NODES if y >= 2016]
    ys = [n for y, n, _ in NODES if y >= 2016]
    ins.plot(xs, ys, color=INK, lw=2.6, marker="o", ms=7, mfc="white", mec=INK, mew=1.6, zorder=4)
    ins.plot([p[0] for p in FORECAST], [p[1] for p in FORECAST], color=GRAY_2, lw=2.2, ls=(0, (3, 2)), marker="o", ms=6, mfc="white", mec=GRAY_2)
    ins.set_xlim(2015.5, 2033.6)
    ins.set_ylim(7.0, 23)
    ins.set_xticks([2020, 2025, 2030])
    ins.set_yticks([10, 15, 20])
    ins.yaxis.grid(True, color=LINE, lw=0.6)
    for sp in ins.spines.values():
        sp.set_color(ORANGE)
        sp.set_linewidth(1.8)
    ins.tick_params(colors=GRAY, length=0, labelsize=15)
    ins.plot([p[0] for p in CXMT], [p[1] for p in CXMT], color=CO["cxmt"][0], lw=2.2, ls=(0, (1.2, 1.6)), marker="^", ms=8, mfc="white", mec=CO["cxmt"][0])
    for name, x, nm, _ in POS_2026:
        col, mk = CO[name]
        ins.plot([x], [nm], marker=mk, ms=12 if mk != "D" else 10, color=col, mec="white", mew=1.2, zorder=7)
    for name, (lx, ly), hp in (("cxmt", (2028.9, 19.0), 12), ("sk-hynix", (2028.9, 15.0), 19),
                               ("samsung", (2028.9, 12.2), 9), ("micron", (2028.9, 8.4), 11)):
        ins.add_artist(AnnotationBbox(logo_img(name, hp), (lx, ly), frameon=False, box_alignment=(0, 0.5)))
    for xy, xt, c in (((2026.2, 16.4), (2028.7, 18.8), CO["cxmt"][0]), ((2026.15, 12.3), (2028.7, 14.8), CO["sk-hynix"][0]),
                      ((2025.75, 11.6), (2028.7, 12.2), CO["samsung"][0]), ((2026.6, 11.2), (2028.7, 8.7), GRAY)):
        ins.annotate("", xy=xy, xytext=xt, arrowprops=dict(arrowstyle="-", color=c, lw=1.2))
    ins.annotate("", xy=(2026.0, 12.6), xytext=(2026.0, 15.4), arrowprops=dict(arrowstyle="<->", color=RED, lw=2.0, mutation_scale=12))
    ins.text(2025.6, 14.0, "3세대", fontsize=17, color=RED, ha="right", va="center", fontweight="bold")
    ins.text(2015.9, 22.4, "2026년 위치", fontsize=16, color=INK, fontweight="bold", va="top")
    save(fig, "node_simple_linear.png")


def drivers_big(w=8.96, h=2.70):
    fig = plt.figure(figsize=(w, h))
    specs = [
        ("더 큰 모델", ["8B", "405B"], [128, 504], ["128 KiB", "504 KiB"], PURPLE, "×3.9"),
        ("더 긴 문맥", ["8K", "1M"], [2.68, 327.7], ["2.7 GB", "328 GB"], ORANGE, "×122"),
        ("더 많은 토큰", ["'24", "'26"], [9.7, 3200], ["9.7조", "3,200조"], TEAL, "×330"),
    ]
    pw, gap = 0.30, 0.045
    for i, (ttl, cats, vals, labs, col, mult) in enumerate(specs):
        ax = fig.add_axes([0.01 + i * (pw + gap), 0.13, pw, 0.60])
        ax.bar([0, 1], vals, color=[col, col], width=0.6)
        ax.patches[0].set_alpha(0.35)
        ax.set_ylim(0, max(vals) * 1.45)
        ax.set_xlim(-0.55, 1.55)
        for j, v in enumerate(vals):
            ax.text(j, v + max(vals) * 0.04, labs[j], ha="center", va="bottom", fontsize=18,
                    fontweight="bold" if j else "normal", color=col if j else INK)
        ax.set_xticks([0, 1])
        ax.set_xticklabels(cats, fontsize=18)
        ax.set_yticks([])
        for sp in ("top", "right", "left"):
            ax.spines[sp].set_visible(False)
        ax.spines["bottom"].set_color(GRAY_3)
        ax.tick_params(length=0, colors=GRAY)
        fig.text(0.01 + i * (pw + gap), 0.98, ttl, fontsize=22, fontweight="bold", color=col, va="top")
        fig.text(0.01 + i * (pw + gap) + pw, 0.98, mult, fontsize=22, fontweight="bold", color=col, va="top", ha="right")
    save(fig, "drivers_big.png")


def tug2(w=8.96, h=2.10, name="tug2.png"):
    """같은 기간(2024 → 2026) 알고리즘이 줄인 배수 vs 토큰이 늘린 배수 (로그)."""
    fig = plt.figure(figsize=(w, h))
    ax = fig.add_axes([0.01, 0.05, 0.98, 0.90])
    ax.barh(1, np.log10(32), color=PURPLE, height=0.62)
    ax.barh(0, np.log10(330), color=ORANGE, height=0.62)
    ax.text(np.log10(32) + 0.05, 1, "÷32", fontsize=30, fontweight="bold", color=PURPLE, va="center")
    ax.text(np.log10(330) + 0.05, 0, "×330", fontsize=30, fontweight="bold", color=ORANGE, va="center")
    ax.text(0.04, 1, "알고리즘", fontsize=20, fontweight="bold", color="white", va="center")
    ax.text(0.04, 0, "토큰", fontsize=20, fontweight="bold", color="white", va="center")
    ax.set_xlim(0, 3.35)
    ax.set_ylim(-0.5, 1.5)
    ax.axis("off")
    save(fig, name)


def tank_big(w=8.96, h=4.10):
    fig = plt.figure(figsize=(w, h))
    ax = fig.add_axes([0.02, 0.14, 0.96, 0.84])
    cats = ["채팅", "에이전트", "1M 문맥"]
    vals = [0.53, 22.2, 327.7]
    ax.bar(range(3), vals, color=[GRAY_3, AMBER, ORANGE], width=0.56)
    ax.bar([2], [327.7 - 288], bottom=[288], color=RED, width=0.56)
    ax.axhline(288, color=INK, lw=2.2, ls=(0, (3, 2)))
    ax.text(2.33, 288 - 14, "가속기 1개\nHBM 288GB", fontsize=19, color=INK, va="top", ha="left", fontweight="bold")
    for j, v in enumerate(vals):
        ax.text(j, v + 10, f"{v:g} GB", ha="center", va="bottom", fontsize=22, fontweight="bold" if j == 2 else "normal",
                color=RED if j == 2 else INK)
    ax.text(2, 308, "넘침", ha="center", va="center", fontsize=18, color="white", fontweight="bold")
    ax.set_ylim(0, 375)
    ax.set_xlim(-0.5, 3.1)
    ax.set_xticks(range(3))
    ax.set_xticklabels(cats, fontsize=20)
    ax.set_yticks([])
    for sp in ("top", "right", "left"):
        ax.spines[sp].set_visible(False)
    ax.spines["bottom"].set_color(GRAY_3)
    ax.tick_params(length=0, colors=INK)
    save(fig, "tank_big.png")


if __name__ == "__main__":
    print(f"ERA1 {R1:.1f}%/yr, ERA2 {R2:.1f}%/yr")
    node_log()
    node_linear()
    node_cadence()
    drivers()
    kv_stair()
    kv_stair(h=1.30, name="kv_stair4.png", short=True)
    tug()
    flywheel()
    tank()
    tokens()
    node_simple_log()
    node_simple_log(name="node_simple_cadence.png", strip=True)
    node_simple_linear()
    drivers_big()
    tug2()
    tug2(w=5.90, h=1.90, name="tug2_small.png")
    tank_big()
