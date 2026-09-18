# -*- coding: utf-8 -*-
"""해법 사다리(solution ladder) 차트 — NAND·DRAM이 단품 한계를 어느 계층에서 풀어 왔는지 1990~2030 시간축에 배치.

패널 2(NAND / DRAM), 공유 x축(연도), y축 = 해법이 놓인 계층(1 셀·다이 ~ 5 애플리케이션).
마커: ● 상위 계층 이관(escalation)  ◇ 단품 자기 진화(self-evolution)  × 단품 한계 규명  ○ 규격 미정의(빈 칸)
계단선 = 이관 이벤트를 시간순으로 이은 것(사다리를 오르는 궤적).
데이터·출처: sources/articles/component-to-system-solution-ladder-facts-2026-09.md (F1~F27)
출력: outputs/presentation/assets/solution_ladder_chart.png (슬라이드용)
실행: .venv/bin/python outputs/presentation/scripts/generate_solution_ladder_chart.py
"""
import os

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager
from matplotlib.lines import Line2D

for cand in ("NanumGothic", "Noto Sans CJK KR", "Noto Sans KR", "Pretendard"):
    if any(f.name == cand for f in font_manager.fontManager.ttflist):
        plt.rcParams["font.family"] = cand
        break
plt.rcParams["axes.unicode_minus"] = False

BLUE, BLUE_T1, BLUE_T2 = "#1428A0", "#3C5AC8", "#AAB8E8"
INK, GRAY, GRAY_2, LINE, TINT = "#1A1A1A", "#555555", "#8A8A8A", "#D9D9D9", "#F4F6FC"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "assets", "solution_ladder_chart.png")

LEVELS = ["셀 · 다이", "패키지 · 모듈", "컨트롤러 · 디바이스", "호스트 · 프로토콜", "애플리케이션"]

# (연도, 계층, 종류, 라벨, dx(년), dy(계층), 정렬)
NAND = [
    (1991, 3, "esc", "SanDisk 20MB SSD", 0.0, 0.42, "center"),
    (1995, 3, "esc", "DiskOnChip · FTL", 0.0, -0.46, "center"),
    (2006, 3, "esc", "삼성 SSD 양산", 0.0, 0.42, "center"),
    (2009, 4, "esc", "TRIM", 0.0, 0.42, "center"),
    (2015, 3, "esc", "LDPC 컨트롤러", 0.0, -0.46, "center"),
    (2017, 4, "esc", "Open-Channel · Streams", -0.2, 0.42, "center"),
    (2020, 4, "esc", "ZNS", -0.4, -0.46, "center"),
    (2022, 4, "esc", "FDP 배치 표준", 0.7, -0.46, "center"),
    (2025, 5, "esc", "CacheLib FDP 머지", -1.0, -0.48, "center"),
    (2026.5, 5, "open", "KV 캐시 관리자 · 규격 미정의", -0.7, 0.42, "center"),
    (2013, 1, "self", "3D V-NAND", 0.0, 0.42, "center"),
    (2018, 1, "self", "QLC 상용 · ~1K P/E", 0.4, -0.5, "center"),
    (2026.5, 2, "self", "HBF 사양(OCP)", 0.0, 0.42, "center"),
    (2010, 1, "limit", "2x nm MLC · 40+bit ECC", -1.6, -0.48, "center"),
]
DRAM = [
    (1997, 3, "esc", "Chipkill ECC", 0.0, 0.42, "center"),
    (2019, 4, "esc", "CXL 1.0", -0.6, 0.42, "center"),
    (2021, 4, "esc", "RFM", 0.0, -0.46, "center"),
    (2024, 4, "esc", "PRAC", 0.8, 0.42, "center"),
    (2013, 2, "self", "HBM(JESD235)", 0.0, 0.42, "center"),
    (2020, 1, "self", "DDR5 on-die ECC", 0.0, 0.42, "center"),
    (2024, 2, "self", "MRDIMM", 0.4, -0.5, "center"),
    (2025.5, 2, "self", "HBM4 커스텀 베이스 다이", 1.4, 0.42, "center"),
    (2014, 1, "limit", "Row Hammer 규명", 0.0, -0.5, "center"),
]


def draw(ax, events, title, empty_note=None):
    ax.set_xlim(1989, 2031)
    ax.set_ylim(0.35, 5.7)
    ax.set_yticks(range(1, 6))
    ax.set_yticklabels(LEVELS, fontsize=10.5, color=GRAY)
    for lv in range(1, 6):
        ax.axhline(lv, color=LINE, lw=0.8, zorder=0)
    for sp in ("top", "right", "left"):
        ax.spines[sp].set_visible(False)
    ax.spines["bottom"].set_color(LINE)
    ax.tick_params(axis="x", colors=GRAY, labelsize=10)
    ax.tick_params(axis="y", length=0)
    # 계단선: 이관 이벤트(esc·open) 시간순
    esc = sorted([e for e in events if e[2] in ("esc", "open")], key=lambda e: e[0])
    xs = [e[0] for e in esc]
    ys = [e[1] for e in esc]
    ax.step(xs, ys, where="post", color=BLUE_T2, lw=2.2, zorder=1)
    for yr, lv, kind, lab, dx, dy, ha in events:
        if kind == "esc":
            ax.scatter([yr], [lv], s=95, color=BLUE, zorder=3)
            c, w = INK, "bold"
        elif kind == "open":
            ax.scatter([yr], [lv], s=110, facecolors="white", edgecolors=BLUE, linewidths=2.0, zorder=3)
            c, w = BLUE, "bold"
        elif kind == "self":
            ax.scatter([yr], [lv], s=95, marker="D", facecolors=BLUE_T2, edgecolors=BLUE_T1, linewidths=1.2, zorder=3)
            c, w = GRAY, "normal"
        else:
            ax.scatter([yr], [lv], s=80, marker="x", color=GRAY_2, linewidths=2.2, zorder=3)
            c, w = GRAY_2, "normal"
        ax.text(yr + dx, lv + dy, lab, ha=ha, va="center", fontsize=9.6, color=c, fontweight=w, zorder=4,
                linespacing=1.15)
    ax.set_title(title, loc="left", fontsize=12.5, color=BLUE, fontweight="bold", pad=8)
    if empty_note:
        ax.text(2030.6, 5, empty_note, fontsize=9.6, color=GRAY_2, ha="right", va="center", style="normal")


def main():
    fig, (a1, a2) = plt.subplots(2, 1, figsize=(11.6, 6.6), sharex=True, gridspec_kw={"hspace": 0.28})
    fig.patch.set_facecolor("white")
    draw(a1, NAND, "NAND  ·  이관이 먼저: 디바이스(1991) → 호스트(2009~22) → 애플리케이션(2025~) · 자기 진화 패키지(HBF)는 35년 뒤")
    draw(a2, DRAM, "DRAM  ·  자기 진화가 먼저: HBM(2013) · 호스트 협력(CXL 2019 · RFM 2021 · PRAC 2024)이 6~11년 뒤따름",
         empty_note="애플리케이션 계층 미도달")
    a2.set_xticks(range(1990, 2031, 5))
    handles = [
        Line2D([], [], marker="o", color=BLUE, ls="", ms=8, label="상위 계층 이관(escalation)"),
        Line2D([], [], marker="D", color=BLUE_T1, markerfacecolor=BLUE_T2, ls="", ms=8, label="단품 자기 진화(self-evolution)"),
        Line2D([], [], marker="x", color=GRAY_2, ls="", ms=8, mew=2, label="단품 한계 규명"),
        Line2D([], [], marker="o", color=BLUE, markerfacecolor="white", ls="", ms=8, mew=2, label="규격 미정의(빈 칸)"),
        Line2D([], [], color=BLUE_T2, lw=2.2, label="이관 궤적"),
    ]
    fig.legend(handles=handles, loc="lower center", ncol=5, frameon=False, fontsize=9.6, bbox_to_anchor=(0.5, -0.005))
    fig.tight_layout(rect=(0, 0.05, 1, 1))
    fig.savefig(OUT, dpi=220, facecolor="white")
    print("saved", os.path.abspath(OUT))


if __name__ == "__main__":
    main()
