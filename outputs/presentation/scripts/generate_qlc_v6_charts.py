# -*- coding: utf-8 -*-
"""QLC eSSD 전략 덱 v6.0용 차트 (2026-09-22).

v5.2 대비 신설·확대:
 - rel_ppm_requirement.png   : 2장 — 요구 다이 고장률(ppm) vs SSD 용량(61→512TB), 보호 없음 / 단일 패리티 / 이중 패리티 3곡선 + 현 수준 밴드
 - rel_protection_tradeoff.png: 2장 — 용량 오버헤드(%) 대비 요구 완화 배수(여분 다이 재구축 포함)
 - ladder_waf_trend.png      : 3장 — WAF 저감 수단의 실측 추이(기법별 before→after, 연도축)
 - ladder_dwpd_trend.png     : 3장 — 정격 DWPD 하락과 요구 DWPD 상승(교차) 추이
 - s1_demand_path.png        : 1장 — 추론 캐시 계층 수요 연도별 경로(2026~2030)
 - s1_criteria_trend.png     : 1장 — eSSD 구매 기준의 이동(성능 → QoS → 내구성) 시기별 강도
 - s6_waf_runtime.png        : 6장 — WAF 시계열 급등 감지 → 런타임 대응 효과

모델 주석(⚠️): 다이 고장률 요구는 독립 고장 가정의 이항 모델.
  보호 없음      P(드라이브 고장) = 1 - (1-p)^N = FFR  →  p = 1 - (1-FFR)^(1/N)
  단일 패리티    스트라이프 k개 중 2개 고장 시 상실 → (N/k)·C(k,2)·p² = FFR
  이중 패리티    스트라이프 k개 중 3개 고장 시 상실 → (N/k)·C(k,3)·p³ = FFR
  여분 다이(재구축) 두 번째 고장이 재구축 창 T 안에 겹쳐야 상실 → 노출 시간비 2T/L 만큼 추가 완화
데이터·등급: sources/articles/qlc-v6-reliability-ppm-die-protection-2026-09.md ·
            sources/articles/qlc-v6-waf-dwpd-criteria-trend-2026-09.md
실행: .venv/bin/python outputs/presentation/scripts/generate_qlc_v6_charts.py
"""
import os
from math import comb, sqrt

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from matplotlib import font_manager
from matplotlib.ticker import FuncFormatter, LogLocator, NullFormatter
from matplotlib.patches import Rectangle

for cand in ("NanumGothic", "Noto Sans CJK KR", "Noto Sans KR", "Pretendard"):
    if any(f.name == cand for f in font_manager.fontManager.ttflist):
        plt.rcParams["font.family"] = cand
        break
plt.rcParams["axes.unicode_minus"] = False
plt.rcParams["mathtext.fontset"] = "dejavusans"

BLUE, BLUE_T1, BLUE_T2, BLUE_T3 = "#1428A0", "#3C5AC8", "#AAB8E8", "#DCE2F5"
INK, GRAY, GRAY_2, LINE, TINT = "#1A1A1A", "#555555", "#8A8A8A", "#D9D9D9", "#F4F6FC"
RED = "#D93025"
HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(HERE, "..", "assets")
DPI = 220

# 요구: OCP Datacenter NVMe SSD 사양 MTBF 2,000,000h = AFR 0.44%/년 → 5년 누적 21,662 ppm
# (JEDEC JESD218 엔터프라이즈 FFR ≤ 3% = 30,000 ppm/수명보다 엄격한 구매자 사양을 기준으로 삼음)
FFR = 0.021662
K_STRIPE = 16        # 다이 패리티 스트라이프 크기(15+1 / 14+2) — Micron RAIN 공개 비율 1:15
LIFE_H = 5 * 365 * 24  # 보증 수명(시간)
REBUILD_H = 1.0      # 다이 1개 재구축 창(모델 가정, 시간)
# 현 다이 고장률 수준(추정 밴드, 5년 누적 ppm) — Google FAST'16 "4년 내 배드 칩 발생 드라이브 2~7%"를
# 당시 드라이브의 다이 수 32~128개로 역산하고 5년으로 환산한 범위 (⚠️ 다이 수는 미공개 가정)
CUR_PPM_LO, CUR_PPM_HI = 200.0, 2700.0


def pow10(axis):
    axis.set_major_locator(LogLocator(base=10, numticks=12))
    axis.set_major_formatter(FuncFormatter(lambda v, p: r"$10^{%d}$" % int(round(np.log10(v))) if v > 0 else ""))
    axis.set_minor_formatter(NullFormatter())


def base(ax, fs=9.0, grid_axis="y"):
    for sp in ("top", "right"):
        ax.spines[sp].set_visible(False)
    for sp in ("left", "bottom"):
        ax.spines[sp].set_color(LINE)
    ax.tick_params(colors=GRAY, labelsize=fs, length=2.5)
    if grid_axis:
        ax.grid(axis=grid_axis, color=LINE, lw=0.6)
    ax.set_axisbelow(True)


def save(fig, name):
    out = os.path.join(ASSETS, name)
    fig.savefig(out, dpi=DPI, facecolor="white")
    plt.close(fig)
    print("saved", os.path.abspath(out))


# ---------------------------------------------------------------- 신뢰성 모델
def p_none(N):
    return 1 - (1 - FFR) ** (1.0 / N)


def p_parity(N, k=K_STRIPE, parity=1):
    """패리티 parity개를 둔 스트라이프에서 (parity+1)개 동시 고장 시 데이터 상실."""
    stripes = N / k
    m = parity + 1
    return (FFR / (stripes * comb(k, m))) ** (1.0 / m)


def p_parity_rebuild(N, k=K_STRIPE):
    """단일 패리티 + 여분 다이 재구축: 두 번째 고장이 재구축 창 안에 겹쳐야 상실.
    P ≈ N·p · (k-1)·p·(T/L) = FFR  →  p = sqrt(FFR·L / (N(k-1)T))"""
    return sqrt(FFR * LIFE_H / (N * (k - 1) * REBUILD_H))


CAPS = [("61TB", 512), ("122TB", 512), ("245TB", 1024), ("256TB", 1024), ("512TB", 2048)]


def rel_ppm_requirement():
    """요구 다이 고장률(ppm) vs SSD 용량 — 보호 없음 / 단일 패리티 / 이중 패리티 + 현 수준 밴드."""
    fig, ax = plt.subplots(figsize=(7.55, 3.34))
    fig.patch.set_facecolor("white")
    labs = ["61TB\n512다이", "122TB\n1,024다이", "245TB\n1,024다이", "256TB\n1,067다이", "512TB\n2,133다이"]
    Ns = [512, 1024, 1024, 1067, 2133]
    x = np.arange(len(Ns))
    y_none = np.array([p_none(n) * 1e6 for n in Ns])
    y_r5 = np.array([p_parity(n, parity=1) * 1e6 for n in Ns])
    y_r6 = np.array([p_parity(n, parity=2) * 1e6 for n in Ns])

    ax.axhspan(CUR_PPM_LO, CUR_PPM_HI, color=BLUE_T3, zorder=0)
    ax.text(0.48, sqrt(CUR_PPM_LO * CUR_PPM_HI), "현 다이 고장률 추정 수준 (200~2,700 ppm)", fontsize=8.4, color=BLUE_T1,
            ha="left", va="center", fontweight="bold")

    ax.plot(x, y_r6, color=BLUE_T2, lw=2.4, marker="^", ms=7, zorder=3)
    ax.plot(x, y_r5, color=BLUE_T1, lw=2.4, marker="s", ms=6.5, zorder=3)
    ax.plot(x, y_none, color=RED, lw=2.4, marker="o", ms=6.5, zorder=4)

    ax.set_yscale("log")
    ax.set_ylim(6, 6e4)
    ax.set_yticks([10, 100, 1000, 10000])
    ax.set_yticklabels(["10", "100", "1,000", "10,000"])
    ax.tick_params(axis="y", which="minor", left=False)
    ax.set_ylabel("다이 1개 고장률 (5년 누적 ppm)", fontsize=9.0, color=GRAY, labelpad=3)
    ax.set_xticks(x); ax.set_xticklabels(labs, fontsize=8.6)
    ax.set_xlim(-0.45, 4.62)
    base(ax, 8.8)

    ax.annotate("보호 없음", xy=(0, y_none[0]), xytext=(-0.34, y_none[0] * 0.30), fontsize=8.8, color=RED, fontweight="bold")
    ax.annotate("단일 패리티 (15+1)", xy=(0, y_r5[0]), xytext=(-0.34, y_r5[0] * 1.32), fontsize=8.8, color=BLUE_T1, fontweight="bold")
    ax.annotate("이중 패리티 (14+2)", xy=(0, y_r6[0]), xytext=(-0.34, y_r6[0] * 1.30), fontsize=8.8, color=BLUE_T2, fontweight="bold")
    for i in (2, 4):
        ax.text(x[i], y_none[i] * 0.62, f"{y_none[i]:.0f}", ha="center", va="top", fontsize=8.6, color=RED, fontweight="bold")
        ax.text(x[i], y_r5[i] * 1.22, f"{y_r5[i]:,.0f}", ha="center", va="bottom", fontsize=8.6, color=BLUE_T1, fontweight="bold")
        ax.text(x[i], y_r6[i] * 1.22, f"{y_r6[i]:,.0f}", ha="center", va="bottom", fontsize=8.6, color=BLUE_T2, fontweight="bold")
    ax.annotate("", xy=(3.0, y_none[3] * 1.05), xytext=(3.0, y_r6[3] * 0.95),
                arrowprops=dict(arrowstyle="<->", color=GRAY_2, lw=1.1))
    ax.text(3.08, sqrt(y_none[3] * y_r6[3]), "SSD 내부 해법이\n만드는 완화 폭", fontsize=8.4, color=GRAY, va="center", linespacing=1.3)
    ax.set_title("드라이브 고장률 요구(5년 2.2%)를 지키기 위한 다이 1개당 고장률 상한",
                 loc="left", fontsize=10.0, color=BLUE, fontweight="bold", pad=5)
    fig.subplots_adjust(left=0.085, right=0.995, top=0.875, bottom=0.155)
    save(fig, "rel_ppm_requirement.png")


def rel_protection_tradeoff():
    """용량 오버헤드 대비 요구 완화 배수 — 245TB(1,024다이) 기준."""
    fig, ax = plt.subplots(figsize=(4.72, 3.34))
    fig.patch.set_facecolor("white")
    N = 1024
    p0 = p_none(N)
    items = [
        ("보호 없음", 0.0, p0, GRAY_2),
        ("단일 패리티\n15+1", 100.0 / K_STRIPE, p_parity(N, parity=1), BLUE_T1),
        ("이중 패리티\n14+2", 200.0 / K_STRIPE, p_parity(N, parity=2), BLUE_T2),
        ("단일 패리티\n+ 여분 다이", 100.0 / K_STRIPE + 100.0 / N, p_parity_rebuild(N), BLUE),
    ]
    x = np.arange(len(items))
    rel = [it[2] / p0 for it in items]
    cols = [it[3] for it in items]
    ax.bar(x, rel, width=0.58, color=cols, zorder=2)
    for i, (nm, ov, p, c) in enumerate(items):
        txt = "기준 1배" if i == 0 else (f"{rel[i]:,.0f}배" if rel[i] < 3000 else "1,000배 이상\n요구 실질 해소")
        ax.text(i, rel[i] * 1.22, txt, ha="center", va="bottom", fontsize=8.8, color=INK, fontweight="bold", linespacing=1.3)
    ax.set_yscale("log"); ax.set_ylim(0.8, 6e4)
    ax.set_yticks([1, 10, 100, 1000]); ax.set_yticklabels(["1배", "10배", "100배", "1,000배"])
    ax.tick_params(axis="y", which="minor", left=False)
    ax.set_xticks(x)
    ax.set_xticklabels([f"{it[0]}\n용량 {it[1]:.1f}%" for it in items], fontsize=8.2)
    base(ax, 8.6)
    ax.set_title("보호 구조가 만드는 요구 완화와 용량 비용 (245TB · 1,024다이)", loc="left", fontsize=10.0, color=BLUE, fontweight="bold", pad=5)
    fig.subplots_adjust(left=0.135, right=0.99, top=0.875, bottom=0.185)
    save(fig, "rel_protection_tradeoff.png")


if __name__ == "__main__":
    rel_ppm_requirement()
    rel_protection_tradeoff()


# ---------------------------------------------------------------- 3장 해법 사다리 (확대 + 신설)
def ladder_component_big():
    """단품 지표: P/E 사이클(막대·좌축 log) 100배 ↓ · RBER(선·우축 log) 10^6배 ↑ — v5.2 대비 확대."""
    fig, ax = plt.subplots(figsize=(4.34, 3.02))
    fig.patch.set_facecolor("white")
    cells = ["SLC\n'91~", "MLC\n'06~", "TLC\n'15~", "QLC\n'18~"]
    x = list(range(4))
    lo, hi = [30000, 3000, 1000, 100], [100000, 10000, 3000, 1000]
    ax.bar(x, hi, width=0.52, color=BLUE_T2, zorder=2)
    ax.bar(x, lo, width=0.52, color=BLUE, zorder=3)
    ax.set_yscale("log"); ax.set_ylim(30, 1e13)
    ax.set_yticks([1e2, 1e3, 1e4, 1e5]); pow10(ax.yaxis); ax.set_yticks([1e2, 1e3, 1e4, 1e5])
    ax.set_ylabel("P/E cycles", fontsize=8.5, color=BLUE, labelpad=2)
    ax.set_xticks(x); ax.set_xticklabels(cells, fontsize=8.5)
    base(ax, 8.5); ax.grid(False)
    ax.text(0, 1.35e5, "30K~100K", ha="center", va="bottom", fontsize=8.2, color=BLUE, fontweight="bold")
    ax.text(3, 1.35e3, "100~1K", ha="center", va="bottom", fontsize=8.2, color=BLUE, fontweight="bold")
    ax.annotate("", xy=(2.7, 2.2e3), xytext=(0.35, 1.5e5), arrowprops=dict(arrowstyle="->", color=BLUE_T1, lw=1.2))
    ax.text(1.85, 4.2e4, "P/E 100배 ↓", fontsize=9.0, color=BLUE, fontweight="bold", ha="center", va="bottom")
    ax2 = ax.twinx()
    rber = [1e-7, 1e-2, 5e-3, 1e-2]
    ax2.set_yscale("log"); ax2.set_ylim(1e-27, 30)
    ax2.plot(x, rber, color=INK, lw=1.8, marker="o", ms=5, zorder=4)
    ax2.axhline(1e-15, color=BLUE_T1, lw=1.0, ls="--", zorder=1)
    ax2.text(-0.44, 2.5e-15, r"UBER 요구 $10^{-15}$ (고정)", ha="left", va="bottom", fontsize=8.2, color=BLUE_T1)
    ax2.text(1.5, 6e-1, r"RBER $10^{6}$배 ↑", fontsize=9.0, color=INK, fontweight="bold", ha="center", va="bottom")
    ax2.annotate("", xy=(3.44, 3e-3), xytext=(3.44, 3e-15), arrowprops=dict(arrowstyle="<->", color=GRAY_2, lw=1.0))
    ax2.text(3.36, 3e-9, "ECC 보상 범위", fontsize=8.0, color=GRAY, ha="right", va="center")
    ax2.set_yticks([1e-16, 1e-12, 1e-8, 1e-4, 1]); pow10(ax2.yaxis); ax2.set_yticks([1e-16, 1e-12, 1e-8, 1e-4, 1])
    ax2.set_ylabel("bit error rate", fontsize=8.5, color=INK, labelpad=2)
    ax2.tick_params(colors=GRAY, labelsize=8.5, length=2.5)
    ax2.spines["top"].set_visible(False)
    ax2.spines["right"].set_color(LINE); ax2.spines["left"].set_visible(False); ax2.spines["bottom"].set_visible(False)
    ax.set_title("비트/셀이 늘수록 P/E는 내려가고 RBER은 올라갑니다", loc="left", fontsize=9.6, color=BLUE, fontweight="bold", pad=5)
    fig.subplots_adjust(left=0.155, right=0.845, top=0.885, bottom=0.115)
    save(fig, "ladder_component_big.png")


def ladder_dwpd_trend():
    """정격 DWPD는 내려갔지만 드라이브당 허용 기입량은 올라갔다 — 요구 밴드 1~3과 함께."""
    fig, ax = plt.subplots(figsize=(4.34, 3.02))
    fig.patch.set_facecolor("white")
    # (연도, 정격 DWPD, 드라이브당 허용 기입량 TB/day, 라벨)
    pts = [(2008, 17.1, 1.1, "X25-E 64GB"), (2012, 10.0, 8.0, "S3700 800GB"), (2014, 17.0, 34.0, "P3700 2TB"),
           (2018, 1.0, 30.7, "PM1643 30TB"), (2024, 0.6, 73.7, "P5336 122TB"), (2025, 0.3, 73.7, "LC9 245TB")]
    xs = [p[0] for p in pts]
    dwpd = [p[1] for p in pts]
    tbday = [p[2] for p in pts]
    ax.axhspan(1, 3, color=TINT, zorder=0)
    ax.axhline(1, color=BLUE_T1, lw=0.9, ls="--", zorder=1)
    ax.axhline(3, color=BLUE_T1, lw=0.9, ls="--", zorder=1)
    ax.text(2019.2, 3.4, "추론 캐시 계층 요구 1~3 DWPD", fontsize=8.2, color=BLUE_T1, ha="left", va="bottom")
    ax.plot(xs, dwpd, color=BLUE, lw=2.2, marker="o", ms=5.5, zorder=3)
    ax.plot(xs, tbday, color=BLUE_T2, lw=2.0, marker="s", ms=5, ls="-", zorder=2)
    ax.scatter([2026], [0.6], s=52, color=BLUE, zorder=4, marker="D")
    ax.text(2026.3, 0.62, "현 QLC\n0.6", fontsize=8.4, color=BLUE, fontweight="bold", va="center", linespacing=1.3)
    ax.text(2008.0, 24, "정격 DWPD", fontsize=8.8, color=BLUE, fontweight="bold")
    ax.text(2012.2, 62, "드라이브당 허용 기입량 (TB/day)", fontsize=8.8, color=BLUE_T1, fontweight="bold")
    ax.annotate("", xy=(2025, 0.34), xytext=(2008, 15.0), arrowprops=dict(arrowstyle="->", color=BLUE, lw=1.0, alpha=0.55))
    ax.text(2016.5, 0.62, "57배 ↓", fontsize=9.2, color=BLUE, fontweight="bold", ha="center")
    ax.text(2019.5, 12.0, "67배 ↑", fontsize=9.2, color=BLUE_T1, fontweight="bold", ha="center")
    ax.set_yscale("log"); ax.set_ylim(0.13, 320); ax.set_xlim(2006.5, 2029.5)
    ax.set_yticks([0.3, 1, 3, 10, 30, 100]); ax.set_yticklabels(["0.3", "1", "3", "10", "30", "100"])
    ax.tick_params(axis="y", which="minor", left=False)
    ax.set_xticks([2008, 2014, 2020, 2026])
    base(ax, 8.5)
    ax.set_title("정격 DWPD는 57배 내려갔고 허용 기입량은 67배 올랐습니다", loc="left", fontsize=9.6, color=BLUE, fontweight="bold", pad=5)
    fig.subplots_adjust(left=0.115, right=0.985, top=0.885, bottom=0.115)
    save(fig, "ladder_dwpd_trend.png")


def ladder_waf_pairs():
    """WAF 저감 수단의 추이 — 기법·연도 축에 공개 실측 before→after 쌍. 조건(사용률·OP)을 라벨로 명시."""
    fig, ax = plt.subplots(figsize=(4.34, 3.02))
    fig.patch.set_facecolor("white")
    groups = [("CacheLib '23\n사용률 100%", 3.22, 1.03, True),
              ("CacheLib '23\n사용률 50%", 1.22, 1.03, True),
              ("XD8 '24\nCacheBench", 2.80, 1.00, True),
              ("LLM KV 캐시\n'26 미실측", 3.00, 1.00, False)]
    xs = np.arange(len(groups))
    w = 0.34
    for i, (nm, b, a, real) in enumerate(groups):
        if real:
            ax.bar(xs[i] - w / 2, b, width=w, color=BLUE_T2, zorder=2)
            ax.bar(xs[i] + w / 2, a, width=w, color=BLUE, zorder=2)
            ax.text(xs[i] - w / 2, b + 0.08, f"{b:.2f}", ha="center", va="bottom", fontsize=8.2, color=GRAY)
            ax.text(xs[i] + w / 2, a + 0.08, f"{a:.2f}", ha="center", va="bottom", fontsize=8.2, color=INK, fontweight="bold")
        else:
            ax.add_patch(Rectangle((xs[i] - w / 2, 0), w, b, fill=False, ls="--", lw=1.1, ec=GRAY_2, zorder=2))
            ax.add_patch(Rectangle((xs[i] + w / 2, 0), w, a, fill=False, ls="--", lw=1.1, ec=BLUE, zorder=2))
            ax.text(xs[i], b + 0.22, "가설 · Phase 2 실측 대상", ha="center", va="bottom", fontsize=8.2, color=BLUE, fontweight="bold")
    ax.set_ylim(0, 4.9); ax.set_yticks([0, 1, 2, 3])
    ax.set_xticks(xs); ax.set_xticklabels([g[0] for g in groups], fontsize=8.2)
    ax.set_ylabel("WAF", fontsize=8.5, color=GRAY, labelpad=2)
    ax.text(-0.52, 4.42, "연한 막대: 호스트 배치 적용 전   진한 막대: 적용 후", fontsize=8.2, color=GRAY, ha="left", va="bottom")
    base(ax, 8.5)
    ax.set_title("호스트 배치는 WAF를 1 근처로 고정합니다 (조건부)", loc="left", fontsize=9.6, color=BLUE, fontweight="bold", pad=5)
    fig.subplots_adjust(left=0.115, right=0.985, top=0.855, bottom=0.165)
    save(fig, "ladder_waf_pairs.png")


# ---------------------------------------------------------------- 1장 문제
def s1_demand_path():
    """추론 캐시(KV 캐시) 계층 NAND 수요의 연도별 경로 — 발표값과 보간값을 구분해 표기."""
    fig, ax = plt.subplots(figsize=(4.72, 1.98))
    fig.patch.set_facecolor("white")
    years = [2025, 2026, 2027, 2028, 2029, 2030]
    vals = [35, 55, 87.5, 175, 248, 350]
    pub = [False, False, True, True, False, False]
    for i, (y, v, p_) in enumerate(zip(years, vals, pub)):
        if p_:
            ax.bar(y, v, width=0.62, color=BLUE, zorder=3)
            ax.text(y, v + 32, f"{v:,.0f}", ha="center", va="bottom", fontsize=8.6, color=BLUE, fontweight="bold")
        else:
            ax.bar(y, v, width=0.62, color=BLUE_T3, zorder=2)
            ax.text(y, v + 12, f"{v:,.0f}", ha="center", va="bottom", fontsize=8.0, color=GRAY_2)
    ax.errorbar([2027, 2028], [87.5, 175], yerr=[[12.5, 25], [12.5, 25]], fmt="none", ecolor=BLUE_T1, elinewidth=1.2, capsize=4, zorder=4)
    ax.annotate("", xy=(2028, 288), xytext=(2027, 288), arrowprops=dict(arrowstyle="->", color=BLUE_T1, lw=1.2))
    ax.text(2027.5, 296, "1년 만에 2배", fontsize=8.6, color=BLUE_T1, fontweight="bold", ha="center", va="bottom")
    ax.set_ylim(0, 430); ax.set_yticks([0, 100, 200, 300])
    ax.set_xticks(years); ax.set_xticklabels([str(y) for y in years], fontsize=8.4)
    ax.set_ylabel("EB / 년", fontsize=8.4, color=GRAY, labelpad=2)
    base(ax, 8.4)
    ax.text(2024.42, 392, "진한 막대: 발표값(SanDisk)   연한 막대: 보간·재구성(추정)", fontsize=8.0, color=GRAY, ha="left", va="bottom")
    fig.subplots_adjust(left=0.115, right=0.985, top=0.855, bottom=0.165)
    save(fig, "s1_demand_path.png")


# ---------------------------------------------------------------- 6장 런타임 WAF 대응
def s6_waf_runtime():
    """WAF 급등 시 런타임 대응의 목표 동작(모식도) — 대응 없음 대비 누적 기입량 차이가 수명 손실."""
    fig, ax = plt.subplots(figsize=(6.85, 2.92))
    fig.patch.set_facecolor("white")
    t = np.linspace(0, 48, 481)
    base_w = np.where(t < 12, 1.05, 2.70)
    resp = base_w.copy()
    m = t >= 14
    resp[m] = 1.20 + (2.70 - 1.20) * np.exp(-(t[m] - 14) / 1.6)
    ax.fill_between(t, resp, base_w, where=base_w >= resp, color=BLUE_T3, zorder=1)
    ax.plot(t, base_w, color=RED, lw=2.0, ls="--", zorder=3)
    ax.plot(t, resp, color=BLUE, lw=2.6, zorder=4)
    ax.axhline(1.2, color=GRAY_2, lw=0.9, ls=":", zorder=2)
    ax.text(0.6, 0.82, "설계 가정 WAF ≤ 1.2", fontsize=8.4, color=GRAY, ha="left", va="bottom")
    for x0, lab in [(12, "급등 발생"), (13, "감지"), (14, "대응 실행")]:
        ax.axvline(x0, color=GRAY_2, lw=0.8, ls=":", zorder=2)
    ax.annotate("급등 발생\n워크로드 전환 · 힌트 손실", xy=(12, 2.70), xytext=(4.6, 3.16), fontsize=8.6, color=INK,
                linespacing=1.35, arrowprops=dict(arrowstyle="->", color=GRAY_2, lw=1.0))
    ax.annotate("감지 1시간 내\nRUH별 WAF 분해", xy=(13, 2.40), xytext=(16.2, 3.16), fontsize=8.6, color=BLUE,
                linespacing=1.35, arrowprops=dict(arrowstyle="->", color=BLUE_T1, lw=1.0))
    ax.annotate("대응: FDP 구성 전환 · 캐시 정책 변경 · 4시간 내 회복", xy=(17.2, 1.30), xytext=(19.0, 0.42), fontsize=8.6, color=BLUE,
                arrowprops=dict(arrowstyle="->", color=BLUE_T1, lw=1.0))
    ax.text(33, 2.82, "대응 없음 · 정격 WAF 수준으로 회귀", fontsize=8.8, color=RED, fontweight="bold", ha="center")
    ax.text(33, 1.88, "차이 면적 = 초과 기입량 = 보증 수명 손실", fontsize=8.8, color=BLUE_T1, fontweight="bold", ha="center")
    ax.set_xlim(0, 48); ax.set_ylim(0, 3.7)
    ax.set_xticks([0, 12, 24, 36, 48]); ax.set_yticks([0, 1, 2, 3])
    ax.set_xlabel("운영 시간 (h)", fontsize=8.6, color=GRAY); ax.set_ylabel("WAF", fontsize=8.6, color=GRAY)
    base(ax, 8.6)
    ax.set_title("WAF 급등을 감지해 런타임에 되돌리는 목표 동작 (모식도 · 실측 아님)", loc="left", fontsize=10.0, color=BLUE, fontweight="bold", pad=5)
    fig.subplots_adjust(left=0.075, right=0.995, top=0.875, bottom=0.145)
    save(fig, "s6_waf_runtime.png")


if __name__ == "__main__":
    s6_waf_runtime()
    s1_demand_path()
    ladder_component_big()
    ladder_dwpd_trend()
    ladder_waf_pairs()
