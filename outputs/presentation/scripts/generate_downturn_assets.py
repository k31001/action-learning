# -*- coding: utf-8 -*-
"""다운턴 복기 덱 차트 자산 생성 (matplotlib) — 전체 메모리(DRAM+NAND) 기준.

산출:
  assets/downturn_timeline.png   : 메모리 산업 연매출 2006-2025 (D+N 스택) + 다운턴 5개 창 음영
  assets/downturn_scatter.png    : 지속기간 x 최악분기 낙폭 산점도 (DRAM 기준, 버블=낙폭, 색=발원)
  assets/downturn_mini_dtXX.png  : 다운턴별 창 확대 미니 차트 5종 (D+N 스택)

데이터 소스: sources/raw-notes/memory-downturn-history-research-2026-08-22.md §1·§2·§4 (DRAM)
             sources/raw-notes/nand-market-history-research-2026-08-22.md §1·§3 (NAND)
             (wiki/downturn/downturn-history.md 미러)
실행: .venv/bin/python outputs/presentation/scripts/generate_downturn_assets.py
"""
import os
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Patch
from matplotlib.lines import Line2D

plt.rcParams["font.family"] = "Noto Sans CJK KR"
plt.rcParams["axes.unicode_minus"] = False

# ---- 디자인 토큰 (samsung-memory 디자인 시스템, ssd-strategy.pptx 승계) ----
BLUE = "#1428A0"       # DRAM
BLUE_T2 = "#AAB8E8"    # NAND
BAND = "#EDF1FB"       # 다운턴 창 음영
INK = "#1A1A1A"
GRAY = "#555555"
GRAY_MID = "#8A8F99"
LINE = "#D9D9D9"

ASSETS = os.path.join(os.path.dirname(__file__), "..", "assets")
os.makedirs(ASSETS, exist_ok=True)

# ---- 데이터: 산업 연매출 ($B) ----
YEARS = list(range(2006, 2026))
DRAM = [34.3, 31.5, 23.6, 22.5, 39.5, 29.6, 26.5, 35.5, 46.1, 45.0,
        41.0, 72.2, 99.4, 62.0, 66.2, 94.0, 80.1, 51.8, 90.7, 154.0]
NAND = [12.4, 13.9, 12.0, 12.0, 18.6, 21.2, 20.7, 25.1, 31.5, 33.8,
        38.5, 57.0, 63.2, 46.0, 55.1, 67.1, 61.1, 36.7, 67.4, 68.0]
TOTAL = [d + n for d, n in zip(DRAM, NAND)]
EST_D = {2006, 2007, 2009, 2010, 2012, 2013, 2014, 2015, 2016, 2017,
         2020, 2021, 2022, 2025}
EST_N = {2006, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
         2019, 2022, 2024, 2025}
EST_T = EST_D | EST_N  # 합산은 어느 한쪽이 추정이면 추정

# 다운턴 창: (라벨, 하강 연도 리스트, 전체 메모리 낙폭 표기)
WINDOWS = [
    ("DT08", [2007, 2008, 2009], "-26%*"),
    ("DT12", [2011, 2012], "-19%*"),
    ("DT16", [2015, 2016], "+2%*"),
    ("DT19", [2019], "-34%*"),
    ("DT23", [2022, 2023], "-45%*"),
]
# 합산 라벨 (정점·저점·현재만 선별 표기)
LABEL_YEARS = {2006, 2009, 2010, 2012, 2014, 2016, 2018, 2019, 2021, 2023, 2024, 2025}


def style_axes(ax):
    for s in ("top", "right", "left"):
        ax.spines[s].set_visible(False)
    ax.spines["bottom"].set_color(LINE)
    ax.tick_params(colors=GRAY, labelsize=11, length=0)
    ax.yaxis.grid(True, color=LINE, linewidth=0.6)
    ax.xaxis.grid(False)
    ax.set_axisbelow(True)


def fmt_total(y):
    v = TOTAL[YEARS.index(y)]
    return f"{v:.0f}" + ("*" if y in EST_T else "")


def stack(ax, yrs, width=0.68):
    d = [DRAM[YEARS.index(y)] for y in yrs]
    n = [NAND[YEARS.index(y)] for y in yrs]
    ax.bar(yrs, d, width=width, color=BLUE, edgecolor="white", linewidth=0.8, zorder=2)
    ax.bar(yrs, n, bottom=d, width=width, color=BLUE_T2, edgecolor="white",
           linewidth=0.8, zorder=2)


# ================= 1) 타임라인 (D+N 스택) =================
fig, ax = plt.subplots(figsize=(10.9, 3.75), dpi=200)
style_axes(ax)

for label, ys, depth in WINDOWS:
    x0, x1 = min(ys) - 0.5, max(ys) + 0.5
    ax.axvspan(x0, x1, color=BAND, zorder=0)
    ax.text((x0 + x1) / 2, 252, label, ha="center", va="top",
            fontsize=12.5, fontweight="bold", color=BLUE)
    ax.text((x0 + x1) / 2, 234, depth, ha="center", va="top",
            fontsize=11, color=GRAY)

stack(ax, YEARS)

for y in YEARS:
    if y in LABEL_YEARS:
        ax.text(y, TOTAL[YEARS.index(y)] + 5, fmt_total(y), ha="center",
                va="bottom", fontsize=10, color=INK if any(
                    y in w[1] for w in WINDOWS) else GRAY)

ax.set_xlim(2005.3, 2025.7)
ax.set_ylim(0, 262)
ax.set_yticks([0, 50, 100, 150, 200, 250])
ax.set_xticks([2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024])
ax.set_ylabel("메모리 산업 연매출 (D+N, $B)", fontsize=11.5, color=GRAY)
ax.legend(handles=[Patch(facecolor=BLUE, label="DRAM"),
                   Patch(facecolor=BLUE_T2, label="NAND")],
          loc="upper left", frameon=False, fontsize=10.5, handlelength=1.1,
          handletextpad=0.4, borderaxespad=0.1, labelcolor=GRAY)
fig.tight_layout(pad=0.4)
fig.savefig(os.path.join(ASSETS, "downturn_timeline.png"))
plt.close(fig)

# ================= 2) 산점도: 지속기간 x 속도 (DRAM 기준) =================
# (라벨, 기간표기, 지속분기, 최악분기 QoQ%, DRAM 연매출 낙폭%, 발원)
POINTS = [
    ("DT08", "'07-'09", 9, -36.0, 34, "mixed"),
    ("DT12", "'10-'12", 9, -20.0, 33, "supply"),
    ("DT16", "'15-'16", 6, -9.1, 11, "demand"),
    ("DT19", "'18-'19", 5, -18.3, 38, "demand"),
    ("DT23", "'22-'23", 6, -32.5, 45, "demand"),
]
C = {"demand": BLUE, "supply": GRAY, "mixed": GRAY}

fig, ax = plt.subplots(figsize=(7.26, 3.75), dpi=200)
style_axes(ax)

xs = [p[2] for p in POINTS]
ys = [p[3] for p in POINTS]
ax.plot(xs, ys, color=LINE, linewidth=1.0, linestyle=(0, (3, 3)), zorder=1)

for name, era, dur, worst, depth, origin in POINTS:
    size = depth * 42
    edge = BLUE if origin == "mixed" else "white"
    lw = 2.4 if origin == "mixed" else 1.5
    ax.scatter([dur], [worst], s=size, color=C[origin], edgecolors=edge,
               linewidths=lw, zorder=3)

OFF = {"DT08": (0.42, 0.5, "left"), "DT12": (0.42, 0.5, "left"),
       "DT16": (0.32, 1.2, "left"), "DT19": (-0.38, 0.6, "right"),
       "DT23": (0.62, 0.5, "left")}
for name, era, dur, worst, depth, origin in POINTS:
    dx, dy, ha = OFF[name]
    ax.annotate(f"{name} {era}", (dur + dx, worst + dy), ha=ha, va="bottom",
                fontsize=11.5, fontweight="bold", color=INK)
    ax.annotate(f"연매출 {'-' + str(depth)}%", (dur + dx, worst + dy - 0.3),
                ha=ha, va="top", fontsize=10, color=GRAY)

ax.set_xlim(3.4, 11.3)
ax.set_ylim(-41, 0)
ax.set_xticks([4, 5, 6, 7, 8, 9, 10, 11])
ax.set_yticks([0, -10, -20, -30, -40])
ax.set_yticklabels(["0", "-10%", "-20%", "-30%", "-40%"])
ax.set_xlabel("하강 지속기간 (분기)", fontsize=11.5, color=GRAY)
ax.set_ylabel("최악 분기 매출 낙폭 (QoQ)", fontsize=11.5, color=GRAY)

handles = [
    Line2D([], [], marker="o", linestyle="", markersize=9, color=BLUE, label="수요발"),
    Line2D([], [], marker="o", linestyle="", markersize=9, color=GRAY, label="공급발"),
    Line2D([], [], marker="o", linestyle="", markersize=9, color=GRAY,
           markeredgecolor=BLUE, markeredgewidth=2.0, label="복합 (공급발+수요 충격)"),
]
ax.legend(handles=handles, loc="lower left", frameon=False, fontsize=10.5,
          handletextpad=0.15, borderaxespad=0.1, labelcolor=GRAY)
ax.text(11.15, -1.2, "지표: DRAM 기준 (버블 크기 = 연매출 낙폭)", ha="right", va="top",
        fontsize=10, color=GRAY_MID)
ax.text(11.15, -3.6, "NAND 동행 여부는 좌측 표 참조", ha="right", va="top",
        fontsize=10, color=GRAY_MID)
fig.tight_layout(pad=0.4)
fig.savefig(os.path.join(ASSETS, "downturn_scatter.png"))
plt.close(fig)

# ================= 3) 미니 차트 5종 (D+N 스택) =================
MINIS = {
    "dt08": (2006, 2010),
    "dt12": (2010, 2013),
    "dt16": (2014, 2017),
    "dt19": (2017, 2020),
    "dt23": (2021, 2024),
}
for key, (y0, y1) in MINIS.items():
    yrs = [y for y in YEARS if y0 <= y <= y1]
    tot = [TOTAL[YEARS.index(y)] for y in yrs]
    fig, ax = plt.subplots(figsize=(5.5, 2.85), dpi=200)
    style_axes(ax)
    win = next(w for w in WINDOWS if w[0].lower() == key)
    x0, x1 = min(win[1]) - 0.5, max(win[1]) + 0.5
    ax.axvspan(x0, x1, color=BAND, zorder=0)
    stack(ax, yrs, width=0.6)
    top = max(tot)
    ylim = top * 1.26
    # 첫 막대가 높으면 좌상단 범례와 라벨이 겹치므로 상한 확장
    if tot[0] > 0.72 * ylim:
        ylim = tot[0] / 0.72
    for y, v in zip(yrs, tot):
        ax.text(y, v + ylim * 0.025, fmt_total(y), ha="center", va="bottom",
                fontsize=11, color=INK if y in win[1] else GRAY)
    ax.set_xticks(yrs)
    ax.set_ylim(0, ylim)
    ax.set_ylabel("연매출 (D+N, $B)", fontsize=10.5, color=GRAY)
    ax.tick_params(labelsize=10.5)
    ax.legend(handles=[Patch(facecolor=BLUE, label="DRAM"),
                       Patch(facecolor=BLUE_T2, label="NAND")],
              loc="upper left", frameon=False, fontsize=9.5, handlelength=1.0,
              handletextpad=0.35, borderaxespad=0.1, labelcolor=GRAY)
    fig.tight_layout(pad=0.35)
    fig.savefig(os.path.join(ASSETS, f"downturn_mini_{key}.png"))
    plt.close(fig)

print("assets written:", sorted(f for f in os.listdir(ASSETS) if f.startswith("downturn")))
