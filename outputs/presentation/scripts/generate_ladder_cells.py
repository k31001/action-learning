# -*- coding: utf-8 -*-
"""해법 사다리 슬라이드 v2.0(이관 매트릭스)용 셀 미니 차트 4종.

슬라이드 셀 크기(인치)에 1:1로 맞춘 figsize로 그려 확대·축소 없이 배치한다(글자 크기 = 실제 슬라이드 pt).
 - ladder_cell_component.png : 내구성 축 · 단품 지표 — P/E(log 막대, 100배↓) + RBER EOL(log 막대, 10⁶배↑) vs UBER 요구선
 - ladder_cell_dwpd.png      : 내구성 축 · SSD 계층 결과 — 정격 DWPD 17→0.4 vs 요구 1~3(고정) 스파크라인
 - ladder_cell_waf.png       : 내구성 축 · 호스트 계층 — WAF 3.00·3.22(SSD 단독) → 1.03(호스트 공동 설계)
 - ladder_cell_dies.png      : 신뢰성 축 · 단품 지표 — SSD당 NAND 다이 수 128→1,024
데이터·등급: sources/articles/component-to-system-solution-ladder-facts-2026-09.md §7 F28~F35 · §9 F41~F47
실행: .venv/bin/python outputs/presentation/scripts/generate_ladder_cells.py
"""
import os

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager
from matplotlib.ticker import FuncFormatter, LogLocator, NullFormatter
import numpy as np

for cand in ("NanumGothic", "Noto Sans CJK KR", "Noto Sans KR", "Pretendard"):
    if any(f.name == cand for f in font_manager.fontManager.ttflist):
        plt.rcParams["font.family"] = cand
        break
plt.rcParams["axes.unicode_minus"] = False
plt.rcParams["mathtext.fontset"] = "dejavusans"

BLUE, BLUE_T1, BLUE_T2 = "#1428A0", "#3C5AC8", "#AAB8E8"
INK, GRAY, GRAY_2, LINE, TINT = "#1A1A1A", "#555555", "#8A8A8A", "#D9D9D9", "#F4F6FC"
HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(HERE, "..", "assets")
DPI = 220


def pow10(axis):
    axis.set_major_locator(LogLocator(base=10, numticks=12))
    axis.set_major_formatter(FuncFormatter(lambda v, p: r"$10^{%d}$" % int(round(np.log10(v))) if v > 0 else ""))
    axis.set_minor_formatter(NullFormatter())


def base(ax, fs=8.5):
    for sp in ("top", "right"):
        ax.spines[sp].set_visible(False)
    for sp in ("left", "bottom"):
        ax.spines[sp].set_color(LINE)
    ax.tick_params(colors=GRAY, labelsize=fs, length=2.5)
    ax.grid(axis="y", color=LINE, lw=0.6)
    ax.set_axisbelow(True)


def save(fig, name):
    out = os.path.join(ASSETS, name)
    fig.savefig(out, dpi=DPI, facecolor="white")
    plt.close(fig)
    print("saved", os.path.abspath(out))


def cell_component():
    fig, (a1, a2) = plt.subplots(2, 1, figsize=(3.78, 2.10), gridspec_kw={"hspace": 0.62})
    fig.patch.set_facecolor("white")
    cells = ["SLC", "MLC", "TLC", "QLC"]
    x = range(4)
    # P/E
    lo, hi = [30000, 3000, 1000, 100], [100000, 10000, 3000, 1000]
    a1.bar(x, hi, width=0.55, color=BLUE_T2, zorder=2)
    a1.bar(x, lo, width=0.55, color=BLUE, zorder=3)
    a1.set_yscale("log"); a1.set_ylim(30, 4e5); pow10(a1.yaxis); a1.set_yticks([1e2, 1e3, 1e4, 1e5])
    a1.set_xticks(list(x)); a1.set_xticklabels(cells)
    base(a1, 7.5)
    a1.set_title("P/E 사이클(보증 하한~상한)  100배 ↓", loc="left", fontsize=8.5, color=BLUE, fontweight="bold", pad=3)
    a1.text(3.0, 1.35e3, "100~1K", ha="center", va="bottom", fontsize=7.0, color=INK, fontweight="bold")
    a1.text(0.0, 1.3e5, "30K~100K", ha="center", va="bottom", fontsize=7.0, color=INK, fontweight="bold")
    # RBER (EOL 대표값) vs UBER 요구
    rber = [1e-7, 1e-2, 5e-3, 1e-2]
    a2.bar(x, rber, width=0.55, bottom=1e-11, color=BLUE, zorder=3)
    a2.set_yscale("log"); a2.set_ylim(1e-17, 3); pow10(a2.yaxis); a2.set_yticks([1e-16, 1e-12, 1e-8, 1e-4, 1])
    a2.axhline(1e-15, color=BLUE_T1, lw=1.0, ls="--", zorder=2)
    a2.text(3.35, 2.5e-15, r"UBER 요구 $10^{-15}$ (고정)", ha="right", va="bottom", fontsize=7.0, color=BLUE)
    a2.set_xticks(list(x)); a2.set_xticklabels(cells)
    base(a2, 7.5)
    a2.set_title(r"RBER(EOL 대표값)  $10^{6}$배 ↑ · 셀 단독 보정 불가", loc="left", fontsize=8.5, color=BLUE, fontweight="bold", pad=3)
    fig.subplots_adjust(left=0.16, right=0.98, top=0.90, bottom=0.10)
    save(fig, "ladder_cell_component.png")


def cell_dwpd():
    fig, ax = plt.subplots(figsize=(3.55, 1.05))
    fig.patch.set_facecolor("white")
    pts = [(2008, 17.1), (2012, 10), (2018, 0.7), (2021, 0.41), (2026, 0.3)]
    xs, ys = [p[0] for p in pts], [p[1] for p in pts]
    ax.set_yscale("log"); ax.set_ylim(0.05, 40); ax.set_xlim(2006, 2028)
    ax.axhspan(1, 3, color=TINT, zorder=0)
    ax.axhline(1, color=BLUE_T1, lw=0.8, ls="--"); ax.axhline(3, color=BLUE_T1, lw=0.8, ls="--")
    ax.text(2013.2, 3.6, "요구 1~3 (고정)", ha="left", va="bottom", fontsize=7.0, color=BLUE_T1)
    ax.plot(xs, ys, color=BLUE_T2, lw=1.8, zorder=2)
    ax.vlines(2026, 0.075, 0.6, color=BLUE_T2, lw=4, zorder=2)
    ax.scatter(xs, ys, s=22, color=BLUE, zorder=3)
    ax.text(2008, 24, "17", fontsize=7.0, color=INK, ha="center", va="bottom")
    ax.text(2021.4, 0.2, "0.41", fontsize=7.0, color=INK, ha="center", va="top")
    ax.annotate("", xy=(2023.9, 0.3), xytext=(2023.9, 3), arrowprops=dict(arrowstyle="<->", color=GRAY_2, lw=1.0))
    ax.text(2023.0, 0.9, "10~40배", fontsize=7.5, color=INK, fontweight="bold", ha="right", va="center")
    ax.set_yticks([0.1, 1, 10]); ax.set_yticklabels(["0.1", "1", "10"])
    ax.tick_params(axis="y", which="minor", left=False)
    ax.set_xticks([2008, 2014, 2020, 2026])
    base(ax, 7.0)
    ax.set_title("정격 DWPD(5년) 17 → 0.4", loc="left", fontsize=8.0, color=INK, fontweight="bold", pad=2)
    fig.subplots_adjust(left=0.12, right=0.98, top=0.80, bottom=0.20)
    save(fig, "ladder_cell_dwpd.png")


def cell_waf():
    fig, ax = plt.subplots(figsize=(3.55, 1.30))
    fig.patch.set_facecolor("white")
    labels = ["랜덤 쓰기\nSSD 단독", "CacheLib\nSSD 단독", "CacheLib\n+ 호스트 배치"]
    vals = [3.0, 3.22, 1.03]
    cols = [BLUE_T2, BLUE_T2, BLUE]
    ax.bar(range(3), vals, width=0.55, color=cols, zorder=2)
    for i, v in enumerate(vals):
        ax.text(i, v + 0.1, f"{v:.2f}", ha="center", va="bottom", fontsize=7.5, color=INK, fontweight="bold")
    ax.set_ylim(0, 5.0); ax.set_yticks([0, 1, 2, 3])
    ax.set_xticks(range(3)); ax.set_xticklabels(labels, fontsize=7.0)
    ax.annotate("", xy=(2.0, 1.6), xytext=(1.5, 3.6), arrowprops=dict(arrowstyle="->", color=GRAY_2, lw=1.0))
    ax.text(1.0, 3.95, "-68% · 유효 DWPD ×3.1", fontsize=7.5, color=INK, fontweight="bold", ha="center", va="bottom")
    base(ax, 7.0)
    ax.set_title("WAF  ≈3 → 1.03", loc="left", fontsize=8.0, color=INK, fontweight="bold", pad=2)
    fig.subplots_adjust(left=0.10, right=0.98, top=0.82, bottom=0.30)
    save(fig, "ladder_cell_waf.png")


def cell_dies():
    fig, ax = plt.subplots(figsize=(3.78, 1.55))
    fig.patch.set_facecolor("white")
    labs = ["S3700 0.8TB\n2012", "P4510 8TB\n2018", "P5316 31TB\n2021", "P5336 61TB\n2023", "LC9 246TB\n2025"]
    vals = [128, 144, 256, 512, 1024]
    cols = [BLUE_T2, BLUE_T2, BLUE_T2, BLUE_T2, BLUE]
    ax.bar(range(5), vals, width=0.58, color=cols, zorder=2)
    for i, v in enumerate(vals):
        ax.text(i, v + 25, f"{v:,}", ha="center", va="bottom", fontsize=7.5, color=INK, fontweight="bold" if i == 4 else "normal")
    ax.set_ylim(0, 1300); ax.set_yticks([0, 512, 1024])
    ax.set_xticks(range(5)); ax.set_xticklabels(labs, fontsize=6.8)
    ax.annotate("", xy=(3.6, 1000), xytext=(0.4, 250), arrowprops=dict(arrowstyle="->", color=GRAY_2, lw=1.0))
    ax.text(1.6, 780, "8배 ↑", fontsize=8.0, color=INK, fontweight="bold", ha="center")
    base(ax, 7.0)
    ax.set_title("SSD당 NAND 다이 수 (용량 ÷ 다이 밀도 환산)", loc="left", fontsize=8.5, color=BLUE, fontweight="bold", pad=3)
    fig.subplots_adjust(left=0.12, right=0.98, top=0.84, bottom=0.26)
    save(fig, "ladder_cell_dies.png")


if __name__ == "__main__":
    cell_component(); cell_dwpd(); cell_waf(); cell_dies()
