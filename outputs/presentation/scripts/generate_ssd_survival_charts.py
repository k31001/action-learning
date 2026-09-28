"""SSD 생존 전략 3장 덱용 차트 3종 (2026-09-28).

그림 크기(인치) = 슬라이드 배치 크기이므로 글자 pt가 슬라이드 pt와 같다. 최소 16pt.
A. HBM 공급사 점유율 추이 (삼성 = Samsung Blue, SK하이닉스 = 그레이)
B. eSSD 수요 2022~2030 (EB) — 기존 eSSD + AI 추론 KV 캐시, 아래 줄에 QLC 비중
C. DWPD 현 수준 대 AI 스토리지 요구 (로그 축)
출처는 outputs/presentation/ssd-survival-strategy-outline.md 근거 표 참조.
"""
import csv
import os

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager
from matplotlib.patches import FancyBboxPatch

HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(HERE, "..", "assets")
OUT = os.path.join(ASSETS, "survival")
os.makedirs(OUT, exist_ok=True)

for fp in ("/usr/share/fonts/truetype/nanum/NanumGothic.ttf", "/usr/share/fonts/truetype/nanum/NanumGothicBold.ttf"):
    if os.path.exists(fp):
        font_manager.fontManager.addfont(fp)
for cand in ("NanumGothic", "Noto Sans CJK KR", "Pretendard"):
    if any(f.name == cand for f in font_manager.fontManager.ttflist):
        plt.rcParams["font.family"] = cand
        break
plt.rcParams["axes.unicode_minus"] = False

BLUE = "#1428A0"
BLUE_T1 = "#3C5AC8"
BLUE_T2 = "#AAB8E8"
TINT = "#DCE2F4"
INK = "#1A1A1A"
GRAY = "#555555"
GRAY_2 = "#8A8A8A"
GRAY_3 = "#C9C9C9"
LINE = "#D9D9D9"


def _clean(ax, left=True):
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.spines["left"].set_visible(left)
    ax.spines["left"].set_color(LINE)
    ax.spines["bottom"].set_color(GRAY_3)
    ax.tick_params(colors=GRAY, length=0)


def save(fig, name):
    fig.savefig(os.path.join(OUT, name), dpi=300, transparent=True)
    plt.close(fig)
    print("saved", name)


# ------------------------------------------------------------------ A. HBM 점유율
def chart_hbm(w=5.60, h=3.05):
    # (x, SK, 삼성, 라벨) — TrendForce 2022·2023(2023-04 전망)·2024, Counterpoint 2Q25·3Q25·1Q26
    pts = [(2022.5, 50, 40), (2023.5, 53, 38), (2024.5, 54, 39), (2025.4, 62, 17), (2025.65, 57, 22), (2026.15, 58, 32)]
    xs = [p[0] for p in pts]
    fig = plt.figure(figsize=(w, h))
    ax = fig.add_axes([0.115, 0.15, 0.865, 0.82])
    ax.axvspan(2022.55, 2023.95, color="#EEF0F4", zorder=0)
    ax.text(2023.25, 66, "다운턴", ha="center", va="center", fontsize=17, color=GRAY, fontweight="bold")
    ax.plot(xs, [p[1] for p in pts], color=GRAY_2, lw=3.2, marker="o", ms=7, zorder=3)
    ax.plot(xs, [p[2] for p in pts], color=BLUE, lw=4.2, marker="o", ms=8, zorder=4)
    ax.text(2022.5, 34.5, "40%", ha="center", va="top", fontsize=17, color=BLUE, fontweight="bold")
    ax.text(2025.4, 11.5, "17%", ha="center", va="top", fontsize=17, color=BLUE, fontweight="bold")
    ax.text(2025.4, 64, "62%", ha="center", va="bottom", fontsize=17, color=GRAY, fontweight="bold")
    ax.annotate("", xy=(2025.4, 20), xytext=(2025.4, 59), arrowprops=dict(arrowstyle="<->", color=BLUE_T1, lw=1.6))
    ax.text(2025.48, 39, "45%p", ha="left", va="center", fontsize=17, color=BLUE_T1, fontweight="bold")
    ax.set_xlim(2022.15, 2026.45)
    ax.set_ylim(0, 72)
    ax.set_yticks([0, 20, 40, 60])
    ax.set_yticklabels(["0", "20", "40", "60%"], fontsize=16)
    ax.set_xticks([2022.5, 2023.5, 2024.5, 2025.5, 2026.15])
    ax.set_xticklabels(["2022", "2023", "2024", "2025", "1Q26"], fontsize=16)
    ax.yaxis.grid(True, color=LINE, lw=0.6)
    ax.set_axisbelow(True)
    _clean(ax, left=False)
    save(fig, "chart_hbm_share.png")


# ------------------------------------------------------------------ B. eSSD 수요 + AI + QLC
def chart_essd(w=6.60, h=3.70):
    rows = list(csv.DictReader(open(os.path.join(ASSETS, "qlc_model.csv"))))
    yrs = [int(r["year"]) for r in rows]
    tot = [float(r["essd_eb"]) for r in rows]
    ai = [float(r["kv_nand_eb"]) for r in rows]
    qlc = [float(r["qlc_share_pct"]) for r in rows]
    base = [t - a for t, a in zip(tot, ai)]
    fig = plt.figure(figsize=(w, h))
    ax = fig.add_axes([0.135, 0.25, 0.855, 0.73])
    xs = list(range(len(yrs)))
    fc_base = [GRAY_3 if y < 2026 else "#E1E1E1" for y in yrs]
    ax.bar(xs, base, width=0.66, color=fc_base, zorder=2)
    ax.bar(xs, ai, bottom=base, width=0.66, color=BLUE, zorder=3)
    for i, (t, y) in enumerate(zip(tot, yrs)):
        if y in (2022, 2025, 2030):
            ax.text(i + (0.36 if y == 2030 else 0), t + 25, f"{t:,.0f}" + (" EB" if y == 2030 else ""), ha="right" if y == 2030 else "center", va="bottom", fontsize=17, color=INK, fontweight="bold")
    ax.text(len(xs) - 1, base[-1] + ai[-1] / 2, "350", ha="center", va="center", fontsize=16, color="white", fontweight="bold")
    for k, (lab, col) in enumerate([("AI 추론 KV 캐시", BLUE), ("그 외 eSSD", GRAY_3)]):
        yy = 1040 - k * 120
        ax.add_patch(plt.Rectangle((-0.45, yy - 38), 0.34, 76, color=col, zorder=3))
        ax.text(-0.02, yy, lab, ha="left", va="center", fontsize=18, color=BLUE if k == 0 else GRAY, fontweight="bold")
    ax.axvline(3.5, color=GRAY_2, lw=1.0, ls=(0, (3, 3)), zorder=1)
    ax.text(3.62, 700, "전망 →", ha="left", va="center", fontsize=16, color=GRAY)
    ax.set_ylim(0, 1150)
    ax.set_xlim(-0.6, len(xs) - 0.4)
    ax.set_yticks([])
    ax.set_xticks(xs)
    ax.set_xticklabels([f"'{str(y)[2:]}" for y in yrs], fontsize=16)
    _clean(ax, left=False)
    # QLC 비중 줄
    for i, q in enumerate(qlc):
        hot = yrs[i] == 2030
        ax.text(i, -235, f"{round(q, 1):g}" if q != 14.3 else "14", ha="center", va="center", fontsize=16 if not hot else 18,
                color=BLUE if hot else GRAY, fontweight="bold" if hot else "normal", clip_on=False)
    fig.text(0.005, 0.25 + 0.73 * (-235 / 1150), "QLC\n비중 %", ha="left", va="center", fontsize=16, color=GRAY, linespacing=1.05)
    save(fig, "chart_essd_ai_qlc.png")


# ------------------------------------------------------------------ C. DWPD 갭
def chart_dwpd(w=5.40, h=3.55):
    import numpy as np
    fig = plt.figure(figsize=(w, h))
    ax = fig.add_axes([0.03, 0.13, 0.91, 0.86])
    ax.set_xscale("log")
    ax.set_xlim(0.1, 120)
    ax.set_ylim(-0.45, 3.0)
    y_q, y_t, y_a = 2.0, 1.2, 0.2
    # 현 수준
    ax.barh(y_q, 0.3 - 0.1, left=0.1, height=0.44, color=GRAY_2, zorder=3)
    ax.barh(y_q, 0.6 - 0.3, left=0.3, height=0.44, color=GRAY_3, zorder=3)
    ax.barh(y_t, 1.0 - 0.1, left=0.1, height=0.44, color=GRAY_2, zorder=3)
    ax.text(0.66, y_q, "QLC  0.3~0.6", ha="left", va="center", fontsize=18, color=INK, fontweight="bold")
    ax.text(1.10, y_t, "TLC  1", ha="left", va="center", fontsize=18, color=INK, fontweight="bold")
    # 요구 범위
    ax.barh(y_a, 30 - 3, left=3, height=0.52, color=BLUE, zorder=3)
    ax.text(np.sqrt(3 * 30), y_a, "3~30", ha="center", va="center", fontsize=19, color="white", fontweight="bold", zorder=4)
    ax.text(2.7, y_a, "AI 요구", ha="right", va="center", fontsize=18, color=BLUE, fontweight="bold")
    ax.axvline(30, color=BLUE_T1, lw=1.2, ls=(0, (3, 3)), zorder=2)
    ax.text(28, 2.72, "30 이상은 SLC급 매체", ha="right", va="center", fontsize=16, color=BLUE_T1, fontweight="bold")
    ax.set_xticks([0.1, 1, 10, 100])
    ax.set_xticklabels(["0.1", "1", "10", "100"], fontsize=16)
    ax.set_yticks([])
    ax.xaxis.grid(True, color=LINE, lw=0.6)
    ax.set_axisbelow(True)
    _clean(ax, left=False)
    save(fig, "chart_dwpd_gap.png")


if __name__ == "__main__":
    chart_hbm()
    chart_essd()
    chart_dwpd()
