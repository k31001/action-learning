# -*- coding: utf-8 -*-
"""QLC eSSD 수요(EB) · 비중(%) · 매출($B) 통합 그래프 (2022~2030).

입력: outputs/presentation/assets/qlc_model.csv (wiki/concepts/qlc-ssd-market.md §4 모델 표의 미러)
출력: outputs/presentation/assets/qlc_demand_share_revenue.png (+ _wide.png 슬라이드용)

설계 원칙 (dataviz 스킬): 이중 축 금지 → 같은 시간축을 공유하는 3단 패널을 한 그림으로 묶는다.
  패널 1  QLC eSSD 수요(EB, 막대) + 전체 eSSD(EB, 회색 참조선)
  패널 2  eSSD 비트 중 QLC 비중(%, 선)
  패널 3  QLC eSSD 매출($B, 막대) 정상화 가격 기준선 + 쇼티지 상단 밴드
실측(2022~2025)과 전망(2026~2030)은 세로 점선과 틴트로 구분. 자사 액센트 Samsung Blue 단일, 나머지 회색.

실행: .venv/bin/python outputs/presentation/scripts/generate_qlc_chart.py
"""
import csv
import os

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager
from matplotlib.patches import Patch
from matplotlib.lines import Line2D

HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(HERE, "..", "assets")
CSV = os.path.join(ASSETS, "qlc_model.csv")
OUT = os.path.join(ASSETS, "qlc_demand_share_revenue.png")
OUT_WIDE = os.path.join(ASSETS, "qlc_demand_share_revenue_wide.png")

BLUE = "#1428A0"
BLUE_T1 = "#3C5AC8"
BLUE_T2 = "#AAB8E8"
INK = "#1A1A1A"
GRAY = "#555555"
GRAY_2 = "#8A8A8A"
LINE = "#D9D9D9"
BAR_GRAY = "#B9C2D0"
TINT = "#F4F6FC"

# 한글 폰트: NanumGothic(설치됨) → Noto Sans CJK KR → DejaVu 폴백
for cand in ("NanumGothic", "Noto Sans CJK KR", "Noto Sans KR", "Pretendard"):
    if any(f.name == cand for f in font_manager.fontManager.ttflist):
        plt.rcParams["font.family"] = cand
        break
plt.rcParams["axes.unicode_minus"] = False


def load():
    rows = []
    with open(CSV, encoding="utf-8") as f:
        for r in csv.DictReader(f):
            rows.append({k: (float(v) if k != "year" and v not in ("", None) else v) for k, v in r.items()})
    for r in rows:
        r["year"] = int(r["year"])
    return rows


def style_axis(ax):
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.spines["left"].set_color(LINE)
    ax.spines["bottom"].set_color(LINE)
    ax.tick_params(colors=GRAY, labelsize=10, length=0)
    ax.yaxis.grid(True, color=LINE, linewidth=0.6)
    ax.set_axisbelow(True)


def draw(rows, wide=False):
    years = [r["year"] for r in rows]
    fc_start = min(r["year"] for r in rows if r["kind"] == 1.0)  # kind 1 = 전망
    figsize = (13.5, 7.6) if wide else (9.0, 10.5)
    if wide:
        fig, axes = plt.subplots(1, 3, figsize=figsize)
    else:
        fig, axes = plt.subplots(3, 1, figsize=figsize, sharex=True)
    ax1, ax2, ax3 = axes
    fig.patch.set_facecolor("white")

    # ---- 패널 1: 수요 EB ----
    style_axis(ax1)
    total = [r["essd_eb"] for r in rows]
    qlc = [r["qlc_eb"] for r in rows]
    qlc_hi = [r["qlc_eb_hi"] for r in rows]
    ax1.bar(years, total, width=0.72, color=LINE, label="전체 eSSD 출하(EB)")
    bars = ax1.bar(years, qlc, width=0.72,
                   color=[BLUE if r["kind"] == 0 else BLUE_T1 for r in rows], label="QLC eSSD(EB)")
    for x, lo, hi, r in zip(years, qlc, qlc_hi, rows):
        if r["kind"] == 1.0 and hi > lo:
            ax1.plot([x, x], [lo, hi], color=BLUE, linewidth=1.4)
            ax1.plot([x - 0.14, x + 0.14], [hi, hi], color=BLUE, linewidth=1.4)
    for x, v, r in zip(years, qlc, rows):
        ax1.text(x, v + max(total) * 0.015, f"{v:.0f}", ha="center", va="bottom",
                 fontsize=9.5, color=INK, fontweight="bold")
    for x, v in zip(years, total):
        ax1.text(x, v + max(total) * 0.015, f"{v:.0f}", ha="center", va="bottom", fontsize=8.5, color=GRAY_2)
    ax1.set_ylabel("EB", color=GRAY, fontsize=10)
    ax1.set_title("① QLC eSSD 수요(EB) · 회색 = 전체 eSSD 출하", loc="left", fontsize=12,
                  color=INK, fontweight="bold")

    # ---- 패널 2: 비중 % ----
    style_axis(ax2)
    share = [r["qlc_share_pct"] for r in rows]
    share_hi = [r["qlc_share_hi"] for r in rows]
    share_lo = [r["qlc_share_lo"] for r in rows]
    fc_idx = [i for i, r in enumerate(rows) if r["kind"] == 1.0]
    ac_idx = [i for i, r in enumerate(rows) if r["kind"] == 0.0]
    ax2.fill_between([years[i] for i in fc_idx], [share_lo[i] for i in fc_idx], [share_hi[i] for i in fc_idx],
                     color=BLUE_T2, alpha=0.45, linewidth=0, label="전망 범위")
    ax2.plot([years[i] for i in ac_idx] + [years[fc_idx[0]]], [share[i] for i in ac_idx] + [share[fc_idx[0]]],
             color=BLUE, linewidth=2.2, marker="o", markersize=6)
    ax2.plot([years[i] for i in fc_idx], [share[i] for i in fc_idx], color=BLUE, linewidth=2.2,
             linestyle=(0, (4, 2)), marker="o", markersize=6, markerfacecolor="white", markeredgewidth=1.8)
    for x, v in zip(years, share):
        ax2.text(x, v + 3.0, f"{v:.0f}%", ha="center", va="bottom", fontsize=9.5, color=INK, fontweight="bold")
    ax2.set_ylim(0, max(share_hi) * 1.25)
    ax2.set_ylabel("%", color=GRAY, fontsize=10)
    ax2.set_title("② eSSD 비트 중 QLC 비중(%) · 점선 = 전망", loc="left", fontsize=12, color=INK, fontweight="bold")

    # ---- 패널 3: 매출 $B ----
    style_axis(ax3)
    rev = [r["qlc_rev_bn"] for r in rows]
    rev_hi = [r["qlc_rev_hi"] for r in rows]
    ax3.bar(years, rev, width=0.72, color=[BLUE if r["kind"] == 0 else BLUE_T1 for r in rows], label="QLC eSSD 매출($B)")
    for x, lo, hi, r in zip(years, rev, rev_hi, rows):
        if hi > lo:
            ax3.bar(x, hi - lo, bottom=lo, width=0.72, color="none", edgecolor=BLUE, linewidth=1.0,
                    hatch="////", label="_nolegend_")
    for x, v in zip(years, rev):
        ax3.text(x, v + max(rev_hi) * 0.015, f"{v:.0f}", ha="center", va="bottom", fontsize=9.5,
                 color=INK, fontweight="bold")
    ax3.set_ylabel("$B", color=GRAY, fontsize=10)
    ax3.set_title("③ QLC eSSD 매출($B) · 빗금 = 쇼티지 가격 상단", loc="left", fontsize=12, color=INK,
                  fontweight="bold")

    for ax in axes:
        ax.axvspan(fc_start - 0.5, max(years) + 0.5, color=TINT, zorder=0)
        ax.axvline(fc_start - 0.5, color=GRAY_2, linewidth=0.9, linestyle=(0, (3, 2)))
        ax.set_xticks(years)
        ax.set_xticklabels([str(y) for y in years])
        ax.set_xlim(min(years) - 0.6, max(years) + 0.6)
    ax1.text(fc_start - 0.45, ax1.get_ylim()[1] * 0.97, "전망 →", fontsize=9, color=GRAY_2, va="top")

    handles = [Patch(facecolor=BLUE, label="QLC eSSD (실측·추정)"),
               Patch(facecolor=BLUE_T1, label="QLC eSSD (전망 기준선)"),
               Patch(facecolor=LINE, label="전체 eSSD 출하"),
               Line2D([0], [0], color=BLUE, linewidth=1.4, label="전망 범위(상·하)"),
               Patch(facecolor="white", edgecolor=BLUE, hatch="////", label="쇼티지 가격 상단")]
    fig.legend(handles=handles, loc="lower left", ncol=5 if wide else 3, frameon=False, fontsize=9,
               bbox_to_anchor=(0.04, 0.005))
    fig.suptitle("QLC eSSD 수요(EB) · 비중(%) · 매출($B), 2022~2030", x=0.04, ha="left", fontsize=14,
                 color=INK, fontweight="bold")
    fig.text(0.04, 0.045 if wide else 0.04,
             "출처: TrendForce · Forward Insights · 벤더 발표를 삼각측량한 추정 (상세: wiki/concepts/qlc-ssd-market.md §4). "
             "비중 분모 = enterprise SSD 출하 비트. 매출 기준선 = 정상화 가격, 상단 = 2026 쇼티지 가격 지속 가정.",
             fontsize=8, color=GRAY_2, wrap=True)
    fig.tight_layout(rect=(0.02, 0.08, 0.99, 0.95))
    return fig


def main():
    rows = load()
    draw(rows).savefig(OUT, dpi=200, facecolor="white")
    draw(rows, wide=True).savefig(OUT_WIDE, dpi=200, facecolor="white")
    print("saved:", os.path.abspath(OUT), os.path.abspath(OUT_WIDE))


if __name__ == "__main__":
    main()
