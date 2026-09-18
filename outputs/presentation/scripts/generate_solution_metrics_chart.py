# -*- coding: utf-8 -*-
"""숫자로 보는 해법 사다리 — P/E · BER(RBER vs UBER) · DWPD · WAF 네 지표의 변화로 "단품 → SSD → 호스트" 이관을 설명.

2×2 소형 다중 패널(왼→오, 위→아래 = 인과 순서):
 ① 셀의 한계: P/E 사이클(log) SLC→MLC→TLC→QLC, 100배 감소
 ② 컨트롤러의 보상: RBER(EOL 대표값, log) 10⁶배 상승 vs UBER 요구(JESD218 10⁻¹⁵·10⁻¹⁶) 고정 — 그 격차를 ECC(비트/KB 2→120)가 보상
 ③ 결과: 정격 DWPD(log) 17→10→0.7→0.41→0.075~0.6 vs 추론 캐시 계층 요구 1~3(TLC)·유효 7~10(ScaleFlux)
 ④ WAF: ② SSD 단독 최적화(FTL 추정·스트림·IO 결정성) 3(랜덤 쓰기 대표) · 3.22(CacheLib, FDP 없음) vs ③ 호스트 공동 설계 1.03(CacheLib + FDP)
데이터·등급: sources/articles/component-to-system-solution-ladder-facts-2026-09.md §7 (F28~F35)
출력: outputs/presentation/assets/solution_metrics_chart.png
실행: .venv/bin/python outputs/presentation/scripts/generate_solution_metrics_chart.py
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
plt.rcParams["mathtext.fontset"] = "dejavusans"  # 윗첨자·마이너스는 mathtext(DejaVu)로 렌더 (NanumGothic 글리프 결손 회피)


def pow10(ax_axis):
    """log 축 눈금을 $10^{n}$ mathtext로 표기(폰트 글리프 결손 회피)."""
    ax_axis.set_major_locator(LogLocator(base=10, numticks=12))
    ax_axis.set_major_formatter(FuncFormatter(lambda v, p: r"$10^{%d}$" % int(round(np.log10(v))) if v > 0 else ""))
    ax_axis.set_minor_formatter(NullFormatter())

FS = 1.15  # 슬라이드 표시 높이 6.4→5.5in 축소에 대한 글자 배율 보정(v1.4)
BLUE, BLUE_T1, BLUE_T2 = "#1428A0", "#3C5AC8", "#AAB8E8"
INK, GRAY, GRAY_2, LINE, TINT = "#1A1A1A", "#555555", "#8A8A8A", "#D9D9D9", "#F4F6FC"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "assets", "solution_metrics_chart.png")


def style(ax, title, ylabel=None):
    ax.set_title(title, loc="left", fontsize=12 * FS, color=BLUE, fontweight="bold", pad=8)
    for sp in ("top", "right"):
        ax.spines[sp].set_visible(False)
    for sp in ("left", "bottom"):
        ax.spines[sp].set_color(LINE)
    ax.tick_params(colors=GRAY, labelsize=9.5 * FS)
    ax.grid(axis="y", color=LINE, lw=0.7)
    ax.set_axisbelow(True)
    if ylabel:
        ax.set_ylabel(ylabel, color=GRAY, fontsize=9.5 * FS)


def p1(ax):
    cells = ["SLC\n'91~", "MLC\n'06~", "TLC\n'15~", "QLC\n'18~"]
    lo = [30000, 3000, 1000, 100]
    hi = [100000, 10000, 3000, 1000]
    x = range(4)
    ax.bar(x, hi, width=0.56, color=BLUE_T2, zorder=2)
    ax.bar(x, lo, width=0.56, color=BLUE, zorder=3)
    labs = ["30K~100K", "3K~10K", "1K~3K", "100~1K"]
    for i, (h, t) in enumerate(zip(hi, labs)):
        ax.text(i, h * 1.3, t, ha="center", va="bottom", fontsize=9.5 * FS, color=INK, fontweight="bold")
    ax.set_yscale("log")
    ax.set_ylim(30, 600000)
    pow10(ax.yaxis)
    ax.set_xticks(list(x))
    ax.set_xticklabels(cells)
    ax.annotate("", xy=(2.62, 2600), xytext=(0.3, 150000), arrowprops=dict(arrowstyle="->", color=GRAY_2, lw=1.4))
    ax.text(1.75, 40000, "100배 ↓", fontsize=11 * FS, color=INK, fontweight="bold", ha="center")
    style(ax, "① 셀의 한계 — P/E 사이클 보증(하한~상한)", "P/E cycles")


def p2(ax):
    cells = ["SLC", "MLC", "TLC", "QLC"]
    x = range(4)
    rber_lo = [1e-9, 1e-5, 1e-4, 1e-3]
    rber_hi = [1e-7, 1e-2, 5e-3, 1e-2]
    ax.set_yscale("log")
    ax.set_ylim(1e-17, 1e3)
    ax.axhspan(1e-16, 1e-15, color=TINT, zorder=0)
    ax.axhline(1e-15, color=BLUE, lw=1.2, ls="--", zorder=2)
    ax.axhline(1e-16, color=BLUE, lw=1.2, ls="--", zorder=2)
    ax.text(3.45, 3e-15, r"UBER 요구 $10^{-15}$(클라이언트) · $10^{-16}$(엔터프라이즈) · JESD218", ha="right", va="bottom", fontsize=8.8 * FS, color=BLUE)
    for i in x:
        ax.vlines(i, rber_lo[i], rber_hi[i], color=BLUE_T2, lw=6, zorder=2)
        ax.scatter([i], [rber_lo[i]], s=34, facecolors="white", edgecolors=BLUE_T1, linewidths=1.2, zorder=3)
        ax.scatter([i], [rber_hi[i]], s=60, color=BLUE, zorder=3)
        ax.vlines(i, 1e-15, rber_lo[i], color=LINE, lw=1, ls=":", zorder=1)
    ax.annotate("신품(빈 원) → EOL(채운 원)\nP/E 사이클·보존 시간에 따라 초선형 증가", xy=(3, 1e-3), xytext=(1.45, 1e-6),
                fontsize=8.5 * FS, color=GRAY, ha="left", va="center",
                arrowprops=dict(arrowstyle="->", color=GRAY_2, lw=1.0))
    ax.text(1.5, 1e-10, "ECC 보상 범위\n(컨트롤러 계층)", ha="center", va="center", fontsize=10 * FS, color=GRAY, fontweight="bold")
    ecc = ["ECC 2 bit/KB", "8~60 bit/KB\nBCH", "72~120 bit/KB\nLDPC", "LDPC\n소프트 디시전"]
    for i, t in enumerate(ecc):
        ax.text(i, 30, t, ha="center", va="center", fontsize=8.5 * FS, color=INK)
    ax.set_xticks(list(x))
    ax.set_xticklabels(cells)
    pow10(ax.yaxis)
    ax.set_yticks([1e-16, 1e-12, 1e-8, 1e-4, 1])
    ax.text(0.28, 1.2e-5, r"$10^{6}$배 ↑", fontsize=11 * FS, color=INK, fontweight="bold", ha="left", va="bottom")
    style(ax, "② BER — 셀 단독 보정 불가: RBER ↑ vs UBER 고정, 격차는 ECC", "bit error rate")


def p3(ax):
    pts = [(2008, 17.1, "X25-E · SLC"), (2012, 10, "S3700 · eMLC"), (2018, 0.7, "P4510 · TLC"),
           (2021, 0.41, "P5316 · QLC"), (2026, 0.3, "QLC 0.075~0.6")]
    ax.set_yscale("log")
    ax.set_ylim(0.04, 40)
    ax.set_xlim(2006, 2028)
    ax.axhspan(1, 3, color=TINT, zorder=0)
    ax.axhline(1, color=BLUE, lw=1.0, ls="--", zorder=1)
    ax.axhline(3, color=BLUE, lw=1.0, ls="--", zorder=1)
    ax.text(2006.4, 1.7, "추론 캐시 계층 요구 1~3 (현재 TLC)", ha="left", va="center", fontsize=8.8 * FS, color=BLUE)
    ax.axhline(7, color=BLUE_T1, lw=1.0, ls=":", zorder=1)
    ax.text(2027.4, 8.5, "유효 7~10 (ScaleFlux 제시)", ha="right", va="bottom", fontsize=8.8 * FS, color=BLUE_T1)
    xs = [p[0] for p in pts]
    ys = [p[1] for p in pts]
    ax.plot(xs, ys, color=BLUE_T2, lw=2.2, zorder=2)
    ax.vlines(2026, 0.075, 0.6, color=BLUE_T2, lw=6, zorder=2)
    ax.scatter(xs, ys, s=60, color=BLUE, zorder=3)
    offs = [(0, 1.5), (0, 1.5), (0, 0.55), (0.3, 0.55), (-0.3, 0.42)]
    for (yr, v, lab), (dx, k) in zip(pts, offs):
        ax.text(yr + dx, v * k, lab, ha="center", va="bottom" if k > 1 else "top", fontsize=8.8 * FS, color=INK)
    ax.annotate("", xy=(2024.6, 0.3), xytext=(2024.6, 3), arrowprops=dict(arrowstyle="<->", color=GRAY_2, lw=1.4))
    ax.text(2023.9, 0.9, "10~40배", fontsize=11 * FS, color=INK, fontweight="bold", ha="right", va="center")
    ax.set_yticks([0.1, 1, 10])
    ax.set_yticklabels(["0.1", "1", "10"])
    ax.set_xticks([2008, 2012, 2016, 2020, 2024, 2028])
    ax.tick_params(axis="y", which="minor", left=False)
    style(ax, "③ 결과 — 정격 DWPD 하락 · 요구 DWPD 고정", "DWPD (5년)")


def p4(ax):
    labels = ["랜덤 쓰기\n호스트 힌트 없음", "CacheLib\nFDP 없음", "CacheLib\n+ FDP 배치"]
    vals = [3.0, 3.22, 1.03]
    cols = [BLUE_T2, BLUE_T2, BLUE]
    x = range(3)
    ax.bar(x, vals, width=0.56, color=cols, zorder=2)
    for i, v in enumerate(vals):
        ax.text(i, v + 0.08, f"{v:.2f}", ha="center", va="bottom", fontsize=10 * FS, color=INK, fontweight="bold")
    ax.set_ylim(0, 4.9)
    ax.set_xticks(list(x))
    ax.set_xticklabels(labels, fontsize=9 * FS)
    # 2단계(SSD 단독) 브래킷 vs 3단계(호스트 공동 설계)
    ax.plot([-0.3, -0.3, 1.3, 1.3], [3.95, 4.1, 4.1, 3.95], color=GRAY_2, lw=1.0)
    ax.text(0.5, 4.2, "② SSD 단독 최적화(FTL 추정·스트림·IOD): WAF ≈ 3", fontsize=8.8 * FS, color=GRAY, ha="center", va="bottom")
    ax.plot([1.7, 1.7, 2.3, 2.3], [1.65, 1.8, 1.8, 1.65], color=BLUE, lw=1.0)
    ax.text(2.0, 1.9, "③ 호스트 공동 설계", fontsize=8.8 * FS, color=BLUE, fontweight="bold", ha="center", va="bottom")
    ax.annotate("", xy=(1.95, 2.2), xytext=(1.75, 2.78), arrowprops=dict(arrowstyle="->", color=GRAY_2, lw=1.4))
    ax.text(1.75, 2.85, "-68%\n= 유효 DWPD x3.1", fontsize=10.5 * FS, color=INK, fontweight="bold", ha="center", va="bottom")
    style(ax, "④ WAF — SSD 단독 ≈3, 호스트 공동 설계로 1.0", "WAF")


def main():
    fig, axs = plt.subplots(2, 2, figsize=(11.6, 6.6), gridspec_kw={"hspace": 0.55, "wspace": 0.22})
    fig.patch.set_facecolor("white")
    p1(axs[0][0])
    p2(axs[0][1])
    p3(axs[1][0])
    p4(axs[1][1])
    fig.text(0.5, 0.005,
             "DWPD = P/E x (1 + OP) / (WAF x 365 x 보증연수)   P/E는 셀, OP는 디바이스, WAF는 호스트·애플리케이션, 보증연수·DWPD는 고객이 결정",
             ha="center", va="bottom", fontsize=10 * FS, color=GRAY)
    fig.tight_layout(rect=(0, 0.035, 1, 1))
    fig.savefig(OUT, dpi=220, facecolor="white")
    print("saved", os.path.abspath(OUT))


if __name__ == "__main__":
    main()
