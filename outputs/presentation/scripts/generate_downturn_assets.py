# -*- coding: utf-8 -*-
"""다운턴 복기 덱 차트 자산 생성 (matplotlib), 전체 메모리(DRAM+NAND) 기준.

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
BAND = "#EDF1FB"       # (구) 공통 음영
BAND_DEMAND = "#E2E9FA"  # 수요발 창 음영 (블루 틴트)
BAND_SUPPLY = "#EBEBEE"  # 공급발 창 음영 (그레이 틴트)
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

# 다운턴 창: (라벨, 하강 연도, 발원, 원인 1-2단어, 전체 메모리 낙폭)
WINDOWS = [
    ("DT08", [2007, 2008, 2009], "mixed", "치킨게임·금융위기", "-26%*"),
    ("DT12", [2011, 2012], "supply", "증산 경쟁", "-19%*"),
    ("DT19", [2019], "demand", "재고 조정", "-34%*"),
    ("DT23", [2022, 2023], "demand", "재고 대조정", "-45%*"),
]
ORIGIN_TXT = {"demand": "수요발", "supply": "공급발", "mixed": "공급발→수요충격"}


def origin_color(origin):
    return BLUE if origin == "demand" else GRAY


def draw_band(ax, ys, origin):
    """발원별 음영. mixed(DT08)는 공급 구간(그레이) + 말기 수요충격(블루) 2단."""
    x0, x1 = min(ys) - 0.5, max(ys) + 0.5
    if origin == "mixed":
        ax.axvspan(x0, x1 - 1.0, color=BAND_SUPPLY, zorder=0)
        ax.axvspan(x1 - 1.0, x1, color=BAND_DEMAND, zorder=0)
    else:
        ax.axvspan(x0, x1, color=BAND_DEMAND if origin == "demand" else BAND_SUPPLY,
                   zorder=0)
    return (x0 + x1) / 2


def band_text(ax, cx, name, origin, cause, depth, ypos, fs=(12.5, 9.5, 9.5, 10.5)):
    ax.text(cx, ypos[0], name, ha="center", va="top", fontsize=fs[0],
            fontweight="bold", color=origin_color(origin))
    ax.text(cx, ypos[1], ORIGIN_TXT[origin], ha="center", va="top", fontsize=fs[1],
            fontweight="bold", color=origin_color(origin))
    ax.text(cx, ypos[2], cause, ha="center", va="top", fontsize=fs[2], color=GRAY_MID)
    ax.text(cx, ypos[3], depth, ha="center", va="top", fontsize=fs[3], color=GRAY)
# 합산 라벨 (정점·저점·현재만 선별 표기)
LABEL_YEARS = {2006, 2009, 2010, 2012, 2014, 2018, 2019, 2021, 2023, 2024, 2025}


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

for label, ys, origin, cause, depth in WINDOWS:
    cx = draw_band(ax, ys, origin)
    band_text(ax, cx, label, origin, cause, depth, (257, 241, 227, 212))

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

# ================= 2) 산점도: 지속기간 x 속도 (전체 메모리 D+N 기준) =================
# (라벨, 기간표기, 지속분기, 최악분기 통합 QoQ%ᵉ, 전체 연매출 낙폭%, 발원)
# 통합 QoQ = 검증된 D·N QoQ의 연간 매출 비중 가중 평균 (wiki/downturn/downturn-history.md §2)
POINTS = [
    ("DT08", "'07-'09", 9, -30.0, 26, "mixed"),
    ("DT12", "'10-'12", 9, -14.0, 19, "supply"),
    ("DT19", "'18-'19", 5, -18.0, 34, "demand"),
    ("DT23", "'22-'23", 6, -29.0, 45, "demand"),
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
       "DT19": (-0.36, 0.6, "right"), "DT23": (0.58, 0.5, "left")}
for name, era, dur, worst, depth, origin in POINTS:
    dx, dy, ha = OFF[name]
    ax.annotate(f"{name} {era}", (dur + dx, worst + dy), ha=ha, va="bottom",
                fontsize=11.5, fontweight="bold", color=INK)
    ax.annotate(f"전체 -{depth}%*", (dur + dx, worst + dy - 0.3),
                ha=ha, va="top", fontsize=10, color=GRAY)

ax.set_xlim(3.4, 11.3)
ax.set_ylim(-36, 0)
ax.set_xticks([4, 5, 6, 7, 8, 9, 10, 11])
ax.set_yticks([0, -10, -20, -30])
ax.set_yticklabels(["0", "-10%", "-20%", "-30%"])
ax.set_xlabel("하강 지속기간 (분기)", fontsize=11.5, color=GRAY)
ax.set_ylabel("최악 분기 매출 낙폭 (D+N, QoQ)", fontsize=11.5, color=GRAY)

handles = [
    Line2D([], [], marker="o", linestyle="", markersize=9, color=BLUE, label="수요발"),
    Line2D([], [], marker="o", linestyle="", markersize=9, color=GRAY, label="공급발"),
    Line2D([], [], marker="o", linestyle="", markersize=9, color=GRAY,
           markeredgecolor=BLUE, markeredgewidth=2.0, label="복합 (공급발+수요 충격)"),
]
ax.legend(handles=handles, loc="lower left", frameon=False, fontsize=10.5,
          handletextpad=0.15, borderaxespad=0.1, labelcolor=GRAY)
ax.text(11.15, -1.1, "지표: 전체 메모리(D+N) · *통합 QoQ는 가중 산출", ha="right",
        va="top", fontsize=10, color=GRAY_MID)
ax.text(11.15, -3.2, "버블 크기 = 전체 연매출 낙폭", ha="right", va="top",
        fontsize=10, color=GRAY_MID)
fig.tight_layout(pad=0.4)
fig.savefig(os.path.join(ASSETS, "downturn_scatter.png"))
plt.close(fig)

# ================= 3) 미니 차트 5종 (D+N 스택) =================
MINIS = {
    "dt08": (2006, 2010),
    "dt12": (2010, 2013),
    "dt19": (2017, 2020),
    "dt23": (2021, 2024),
}
for key, (y0, y1) in MINIS.items():
    yrs = [y for y in YEARS if y0 <= y <= y1]
    tot = [TOTAL[YEARS.index(y)] for y in yrs]
    fig, ax = plt.subplots(figsize=(5.5, 2.85), dpi=200)
    style_axes(ax)
    win = next(w for w in WINDOWS if w[0].lower() == key)
    draw_band(ax, win[1], win[2])
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


# ================= 4) 다음 다운턴 시나리오 사분면 (SP-2) =================
# 데이터: wiki/downturn/scenario-matrix.md (조건부 확률·mermaid 좌표)
SCEN = [
    # (이름, x, y, 확률, 색, 라벨y기준, 위/아래, 제목줄, 부제줄)
    ("DT-A", 0.22, 0.80, 20, BLUE, 0.905, "above",
     "「급제동」 AI 조달 경색", "역사: DT19형 · 짧고 깊다"),
    ("DT-B", 0.25, 0.22, 24, BLUE, 0.345, "above",
     "「긴 하산」 원단위 감소", "역사에 없던 길이: 8-12분기"),
    ("DT-C", 0.78, 0.78, 22, GRAY, 0.905, "above",
     "「동시 방류」 캐파+절제 붕괴", "역사: DT08형 · 낙폭 여지 확대"),
    ("DT-D", 0.80, 0.20, 26, GRAY, 0.345, "above",
     "「저가 잠식」 CXMT 침투", "역사: DT12형 · 단, 회복 없음"),
]

fig, ax = plt.subplots(figsize=(8.15, 5.30), dpi=200)
for s in ("top", "right", "left", "bottom"):
    ax.spines[s].set_color(LINE)
ax.set_xlim(0, 1)
ax.set_ylim(0, 1)
ax.set_xticks([])
ax.set_yticks([])
ax.axhline(0.5, color=LINE, linewidth=0.9)
ax.axvline(0.5, color=LINE, linewidth=0.9)

# 사분면 코너 힌트
ax.text(0.02, 0.965, "수요발 × 급락", fontsize=10, color=GRAY_MID, va="top")
ax.text(0.98, 0.965, "공급발 × 급락", fontsize=10, color=GRAY_MID, va="top", ha="right")
ax.text(0.02, 0.035, "수요발 × 침식", fontsize=10, color=GRAY_MID, va="bottom")
ax.text(0.98, 0.035, "공급발 × 침식", fontsize=10, color=GRAY_MID, va="bottom", ha="right")

# 전이 경로 (최위험: B -> A, 만기 집중), 좌측 여백으로 우회
ax.annotate("", xy=(0.155, 0.76), xytext=(0.185, 0.26),
            arrowprops=dict(arrowstyle="-|>", color=GRAY_MID, linestyle=(0, (4, 3)),
                            linewidth=1.3, connectionstyle="arc3,rad=0.18"))
ax.text(0.115, 0.52, "만기 집중 →\n급락 전이\n(최위험 경로)", fontsize=9.5,
        color=GRAY_MID, ha="center", va="center")

for name, x, y, prob, color, ly, pos, t1, t2 in SCEN:
    ax.scatter([x], [y], s=prob * 150, color=color, edgecolors="white",
               linewidths=1.5, zorder=3)
    ax.text(x, y + 0.012, name, ha="center", va="center", fontsize=12,
            fontweight="bold", color="white", zorder=4)
    ax.text(x, y - 0.045, f"{prob}%", ha="center", va="center", fontsize=10.5,
            color="white", zorder=4)
    ax.text(x, ly, t1, ha="center", va="bottom", fontsize=11.5, fontweight="bold",
            color=INK)
    ax.text(x, ly - 0.012, t2, ha="center", va="top", fontsize=10, color=GRAY)

# 현재 위치
ax.scatter([0.53], [0.40], s=130, marker="D", color=INK, zorder=4)
ax.text(0.53, 0.345, "현재 위치 (2026-08)", ha="center", va="top", fontsize=10,
        color=INK)

# 와일드카드 노트
ax.text(0.50, 0.065, "와일드카드 DT-E 「판 갈이」 8%: 축 밖(제품 정의 변화) · 유일 응수는 별동대(DP-5)",
        ha="center", va="bottom", fontsize=10, color=GRAY,
        bbox=dict(facecolor="white", edgecolor=LINE, linewidth=0.8, pad=4))

ax.set_xlabel("수요 수축 주도   ←   발원지 (DF-D1)   →   공급 확대 주도",
              fontsize=11, color=GRAY)
ax.set_ylabel("침식형 Grind   ←   속도 (DF-D2)   →   급락형 Cliff",
              fontsize=11, color=GRAY)
fig.tight_layout(pad=0.4)
fig.savefig(os.path.join(ASSETS, "downturn_scenario_matrix.png"))
plt.close(fig)


# ================= 5) NAND 단독 타임라인 =================
N_WINDOWS = [
    ("DT08", [2007, 2008, 2009], "mixed", "ASP 급락", "N -14%"),
    ("DT12", [2011, 2012], "supply", "가격 위기", "N -2%*"),
    ("DT19", [2019], "demand", "재고·정전", "N -27%*"),
    ("DT23", [2022, 2023], "demand", "재고 대조정", "N -45%"),
]
N_DOWN = {2008, 2019, 2022, 2023}  # NAND 매출 하강 연도 (강조)
N_LABELS = {2006, 2008, 2011, 2014, 2016, 2018, 2019, 2021, 2023, 2025}


def fmt_n(y):
    v = NAND[YEARS.index(y)]
    return f"{v:.0f}" + ("*" if y in EST_N else "")


fig, ax = plt.subplots(figsize=(10.9, 3.75), dpi=200)
style_axes(ax)
for label, ys, origin, cause, depth in N_WINDOWS:
    cx = draw_band(ax, ys, origin)
    band_text(ax, cx, label, origin, cause, depth, (81.3, 76.3, 71.9, 67.2),
              fs=(12, 9.5, 9.5, 10))
# DT16 비동행 주석 (음영 없음)
ax.text(2015.5, 81.3, "(DT16)", ha="center", va="top", fontsize=11, color=GRAY_MID)
ax.text(2015.5, 75.8, "비동행 +14%*", ha="center", va="top", fontsize=10,
        color=GRAY_MID)

cols = [BLUE if y in N_DOWN else BLUE_T2 for y in YEARS]
ax.bar(YEARS, NAND, width=0.68, color=cols, zorder=2)
for y in YEARS:
    if y in N_LABELS:
        ax.text(y, NAND[YEARS.index(y)] + 1.6, fmt_n(y), ha="center", va="bottom",
                fontsize=10, color=INK if y in N_DOWN else GRAY)
ax.set_xlim(2005.3, 2025.7)
ax.set_ylim(0, 82)
ax.set_yticks([0, 20, 40, 60, 80])
ax.set_xticks([2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024])
ax.set_ylabel("NAND 산업 연매출 ($B)", fontsize=11.5, color=GRAY)
fig.tight_layout(pad=0.4)
fig.savefig(os.path.join(ASSETS, "nand_timeline.png"))
plt.close(fig)

# ================= 6) D vs N 연매출 낙폭 비교 (동조화의 진행) =================
CATS = ["DT08", "DT12", "DT16(경계)", "DT19", "DT23"]
D_DEPTH = [-34, -33, -11, -37.6, -45]
N_DEPTH = [-14, -2, 14, -27, -45]
D_LBL = ["-34*", "-33*", "-11*", "-37.6", "-45*"]
N_LBL = ["-14", "-2*", "+14*", "-27*", "-45"]

fig, ax = plt.subplots(figsize=(7.26, 3.75), dpi=200)
style_axes(ax)
xs = range(len(CATS))
w = 0.36
ax.bar([x - w / 2 for x in xs], D_DEPTH, width=w, color=BLUE, edgecolor="white",
       linewidth=0.8, zorder=2, label="DRAM")
ax.bar([x + w / 2 for x in xs], N_DEPTH, width=w, color=BLUE_T2, edgecolor="white",
       linewidth=0.8, zorder=2, label="NAND")
ax.axhline(0, color=GRAY, linewidth=0.9, zorder=3)
for x, (d, n, dl, nl) in enumerate(zip(D_DEPTH, N_DEPTH, D_LBL, N_LBL)):
    ax.text(x - w / 2, d - 1.5, dl, ha="center", va="top", fontsize=10, color=INK)
    ax.text(x + w / 2, n - 1.5 if n < 0 else n + 1.5, nl, ha="center",
            va="top" if n < 0 else "bottom", fontsize=10, color=GRAY)
ax.set_xticks(list(xs))
ax.set_xticklabels(CATS, fontsize=11)
ax.set_ylim(-54, 22)
ax.set_yticks([20, 0, -20, -40])
ax.set_yticklabels(["+20%", "0", "-20%", "-40%"])
ax.set_ylabel("연매출 낙폭 (정점 → 저점)", fontsize=11.5, color=GRAY)
ax.legend(loc="lower left", frameon=False, fontsize=10.5, handlelength=1.1,
          handletextpad=0.4, borderaxespad=0.1, labelcolor=GRAY)
ax.annotate("동조화", xy=(4.18, -45), xytext=(3.05, -50.5), fontsize=10.5,
            color=GRAY, arrowprops=dict(arrowstyle="->", color=GRAY_MID,
                                        linewidth=1.1))
fig.tight_layout(pad=0.4)
fig.savefig(os.path.join(ASSETS, "nand_depth_compare.png"))
plt.close(fig)


# ================= 7) DRAM 단독 타임라인 (DT16 포함 5개 창) =================
D_WINDOWS = [
    ("DT08", [2007, 2008, 2009], "mixed", "치킨게임·금융위기", "D -34%*"),
    ("DT12", [2011, 2012], "supply", "증산 경쟁", "D -33%*"),
    ("DT16", [2015, 2016], "demand", "PC·폰 둔화 (D 단독)", "D -11%*"),
    ("DT19", [2019], "demand", "재고 조정", "D -37.6%"),
    ("DT23", [2022, 2023], "demand", "재고 대조정", "D -45%*"),
]
D_DOWN = {y for _, ys, _, _, _ in D_WINDOWS for y in ys}
D_LABELS = {2006, 2009, 2010, 2012, 2014, 2016, 2018, 2019, 2021, 2023, 2024, 2025}
BAR_NEUTRAL = "#C9CDD6"


def fmt_d(y):
    v = DRAM[YEARS.index(y)]
    return f"{v:.0f}" + ("*" if y in EST_D else "")


fig, ax = plt.subplots(figsize=(10.9, 3.75), dpi=200)
style_axes(ax)
for label, ys, origin, cause, depth in D_WINDOWS:
    cx = draw_band(ax, ys, origin)
    band_text(ax, cx, label, origin, cause, depth, (175, 165, 155.5, 145.5),
              fs=(12, 9.5, 9.5, 10))
cols = [BLUE if y in D_DOWN else BAR_NEUTRAL for y in YEARS]
ax.bar(YEARS, DRAM, width=0.68, color=cols, zorder=2)
for y in YEARS:
    if y in D_LABELS:
        ax.text(y, DRAM[YEARS.index(y)] + 3.4, fmt_d(y), ha="center", va="bottom",
                fontsize=10, color=INK if y in D_DOWN else GRAY)
ax.set_xlim(2005.3, 2025.7)
ax.set_ylim(0, 178)
ax.set_yticks([0, 50, 100, 150])
ax.set_xticks([2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024])
ax.set_ylabel("DRAM 산업 연매출 ($B)", fontsize=11.5, color=GRAY)
fig.tight_layout(pad=0.4)
fig.savefig(os.path.join(ASSETS, "dram_timeline.png"))
plt.close(fig)

# ================= 8) DRAM 단독 산점도 (5점 — 분기 검증치 전건 보유) =================
D_POINTS = [
    ("DT08", "'07-'09", 9, -36.0, 34, "mixed"),
    ("DT12", "'10-'12", 9, -20.0, 33, "supply"),
    ("DT16", "'15-'16", 6, -9.1, 11, "demand"),
    ("DT19", "'18-'19", 5, -18.3, 38, "demand"),
    ("DT23", "'22-'23", 6, -32.5, 45, "demand"),
]
fig, ax = plt.subplots(figsize=(7.26, 3.75), dpi=200)
style_axes(ax)
ax.plot([p[2] for p in D_POINTS], [p[3] for p in D_POINTS], color=LINE,
        linewidth=1.0, linestyle=(0, (3, 3)), zorder=1)
for name, era, dur, worst, depth, origin in D_POINTS:
    edge = BLUE if origin == "mixed" else "white"
    lw = 2.4 if origin == "mixed" else 1.5
    ax.scatter([dur], [worst], s=depth * 42, color=C[origin], edgecolors=edge,
               linewidths=lw, zorder=3)
D_OFF = {"DT08": (0.42, 0.5, "left"), "DT12": (0.42, 0.5, "left"),
         "DT16": (0.32, 1.2, "left"), "DT19": (-0.38, 0.6, "right"),
         "DT23": (0.62, 0.5, "left")}
for name, era, dur, worst, depth, origin in D_POINTS:
    dx, dy, ha = D_OFF[name]
    ax.annotate(f"{name} {era}", (dur + dx, worst + dy), ha=ha, va="bottom",
                fontsize=11.5, fontweight="bold", color=INK)
    ax.annotate(f"D -{depth}%*", (dur + dx, worst + dy - 0.3), ha=ha, va="top",
                fontsize=10, color=GRAY)
ax.set_xlim(3.4, 11.3)
ax.set_ylim(-41, 0)
ax.set_xticks([4, 5, 6, 7, 8, 9, 10, 11])
ax.set_yticks([0, -10, -20, -30, -40])
ax.set_yticklabels(["0", "-10%", "-20%", "-30%", "-40%"])
ax.set_xlabel("하강 지속기간 (분기)", fontsize=11.5, color=GRAY)
ax.set_ylabel("최악 분기 매출 낙폭 (DRAM, QoQ)", fontsize=11.5, color=GRAY)
handles_d = [
    Line2D([], [], marker="o", linestyle="", markersize=9, color=BLUE, label="수요발"),
    Line2D([], [], marker="o", linestyle="", markersize=9, color=GRAY, label="공급발"),
    Line2D([], [], marker="o", linestyle="", markersize=9, color=GRAY,
           markeredgecolor=BLUE, markeredgewidth=2.0, label="복합 (공급발+수요 충격)"),
]
ax.legend(handles=handles_d, loc="lower left", frameon=False, fontsize=10.5,
          handletextpad=0.15, borderaxespad=0.1, labelcolor=GRAY)
ax.text(11.15, -1.1, "지표: DRAM 단독 (분기 검증치 5건 전부 보유)", ha="right",
        va="top", fontsize=10, color=GRAY_MID)
ax.text(11.15, -3.5, "버블 크기 = DRAM 연매출 낙폭 · DT16 포함", ha="right", va="top",
        fontsize=10, color=GRAY_MID)
fig.tight_layout(pad=0.4)
fig.savefig(os.path.join(ASSETS, "dram_scatter.png"))
plt.close(fig)

print("assets written:", sorted(f for f in os.listdir(ASSETS) if f.startswith("downturn")))
