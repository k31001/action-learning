"""고객 협력 전략 덱 3장: 제품 포트폴리오 확장 3D 그림 (matplotlib).

바닥 = 정격 DWPD(로그) × 최대 용량(로그), 높이 = 꼬리 지연 등급(정성, 높을수록 낮은 p99.9).
제품군마다 지금 영역(진한 블록)과 WAF · 꼬리 지연을 낮춘 뒤의 영역(반투명 블록)을 그리고,
바닥에 추론 수요 영역을 칠한다. 제품 사진은 덱 생성기가 투영 좌표(JSON)를 받아 위에 얹는다.

사용: .venv/bin/python outputs/presentation/scripts/generate_portfolio_3d.py
출력: assets/portfolio_3d.png, assets/portfolio_3d.json (블록 윗면 중심의 이미지 내 비율 좌표)
수치 근거(⚠️ 산술 · 정성 포함)는 위키 ssd-portfolio-expansion-co-design.md.
"""
import json
import math
import os

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402
from matplotlib import font_manager  # noqa: E402
from mpl_toolkits.mplot3d import proj3d  # noqa: E402
from mpl_toolkits.mplot3d.art3d import Poly3DCollection  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(HERE, "..", "assets")
FONT = "/usr/share/fonts/truetype/nanum/NanumGothic.ttf"
FONT_B = "/usr/share/fonts/truetype/nanum/NanumGothicBold.ttf"
for f in (FONT, FONT_B):
    if os.path.exists(f):
        font_manager.fontManager.addfont(f)
plt.rcParams["font.family"] = "NanumGothic"

BLUE, BLUE_T1, BLUE_T2, GRAY, GRAY_2, INK = "#1428A0", "#3D5AD6", "#AAB8E8", "#6B7280", "#9CA3AF", "#1A1A1A"

# 제품군: 이름, 지금 DWPD 범위, 용량 범위(TB), 꼬리 지연 등급(지금 → 확장), 확장 DWPD 상한, 색
FAMILIES = [
    ("qlc", "고용량 QLC", (0.24, 0.36), (40, 128), (1.0, 1.8), 1.0, GRAY_2),
    ("tlc", "고성능 TLC", (0.85, 1.15), (10, 30), (1.8, 2.6), 3.0, BLUE_T1),
    ("hetlc", "고내구 TLC", (2.6, 3.4), (3.2, 8), (1.8, 2.6), 9.0, BLUE),
    ("slc", "SLC급", (26, 34), (0.8, 2.4), (2.6, 3.4), 100.0, INK),
]
# 바닥의 추론 수요 영역: 이름, DWPD 범위, 용량 범위
DEMANDS = [
    ("모델 가중치 · RAG", (0.1, 1.0), (16, 256), "#E8ECF8"),
    ("KV 캐시 오프로드", (1.0, 10), (2, 64), "#D3DBF4"),
    ("초고DWPD KV", (20, 150), (0.5, 4), "#C2CDF0"),
]

X0, X1 = math.log10(0.1), math.log10(150)
Y0, Y1 = math.log2(0.5), math.log2(256)


def lx(v):
    return math.log10(v)


def ly(v):
    return math.log2(v)


def cuboid(ax, xr, yr, zr, color, alpha, edge, lw=0.8, ls="-"):
    x0, x1 = lx(xr[0]), lx(xr[1])
    y0, y1 = ly(yr[0]), ly(yr[1])
    z0, z1 = zr
    v = [(x0, y0, z0), (x1, y0, z0), (x1, y1, z0), (x0, y1, z0), (x0, y0, z1), (x1, y0, z1), (x1, y1, z1), (x0, y1, z1)]
    faces = [[v[0], v[1], v[2], v[3]], [v[4], v[5], v[6], v[7]], [v[0], v[1], v[5], v[4]],
             [v[2], v[3], v[7], v[6]], [v[1], v[2], v[6], v[5]], [v[0], v[3], v[7], v[4]]]
    pc = Poly3DCollection(faces, facecolor=color, alpha=alpha, edgecolor=edge, linewidths=lw, linestyles=ls)
    if alpha < 0.5:
        pc.set_facecolor((0.24, 0.35, 0.84, alpha))
        pc.set_edgecolor((0.08, 0.16, 0.63, 0.9))
    ax.add_collection3d(pc)


def main():
    fig = plt.figure(figsize=(9.6, 6.6), dpi=220)
    ax = fig.add_axes([0.0, 0.0, 1.0, 1.0], projection="3d", computed_zorder=False)
    ax.set_xlim(X0, X1)
    ax.set_ylim(Y0, Y1)
    ax.set_zlim(0, 3.6)
    ax.view_init(elev=float(os.environ.get('ELEV', 45)), azim=float(os.environ.get('AZIM', -60)))
    ax.set_box_aspect((1.55, 1.0, 0.62))
    ax.xaxis.pane.set_facecolor((1, 1, 1, 0))
    ax.yaxis.pane.set_facecolor((0.97, 0.97, 0.98, 1))
    ax.zaxis.pane.set_facecolor((0.97, 0.97, 0.98, 1))
    for a in (ax.xaxis, ax.yaxis, ax.zaxis):
        a.pane.set_edgecolor("#D1D5DB")
        a._axinfo["grid"].update(color="#E5E7EB", linewidth=0.6)
    ax.set_xticks([lx(v) for v in (0.1, 0.3, 1, 3, 10, 30, 100)])
    ax.set_xticklabels(["0.1", "0.3", "1", "3", "10", "30", "100"], fontsize=17, color=GRAY)
    ax.set_yticks([ly(v) for v in (1, 4, 16, 64, 256)])
    ax.set_yticklabels(["1", "4", "16", "64", "256"], fontsize=17, color=GRAY)
    ax.set_zticks([1, 2, 3])
    ax.set_zticklabels(["", "", ""])
    ax.set_xlabel("정격 DWPD", fontsize=19, color=INK, labelpad=14)
    ax.set_ylabel("최대 용량 TB", fontsize=19, color=INK, labelpad=14)
    ax.set_zlabel("")

    # 바닥: 추론 수요 영역
    for nm, xr, yr, col in DEMANDS:
        x0, x1, y0, y1 = lx(xr[0]), lx(xr[1]), ly(yr[0]), ly(yr[1])
        ax.add_collection3d(Poly3DCollection([[(x0, y0, 0), (x1, y0, 0), (x1, y1, 0), (x0, y1, 0)]],
                                             facecolor=col, alpha=1.0, edgecolor="white", linewidths=1.6))
    anchors = {}
    # 먼 것(용량 큰 것)부터 그린다
    for key, nm, xr, yr, zr, xmax, col in FAMILIES:
        # 확장 영역: 점선 와이어프레임 + 아주 옅은 채움 (DWPD 오른쪽으로 · 꼬리 지연 위로)
        cuboid(ax, (xr[1], xmax), yr, (0, zr[1]), col, 0.07, col, lw=1.1, ls="--")
        cuboid(ax, xr, yr, (0, zr[0]), col, 0.97, "white", lw=0.6)
        top = (lx(math.sqrt(xr[0] * xr[1])), ly(math.sqrt(yr[0] * yr[1])), zr[0])
        ext = (lx(xmax * 0.92), ly(math.sqrt(yr[0] * yr[1])), zr[1])
        anchors[key] = {"now": top, "ext": ext}
        y_ = ly(math.sqrt(yr[0] * yr[1]))
        ax.quiver(lx(xr[1]), y_, 0.02, lx(xmax) - lx(xr[1]) - 0.05, 0, 0, color=BLUE, lw=2.4, arrow_length_ratio=0.18)

    fig.canvas.draw()
    out = {}
    W, H = fig.canvas.get_width_height()
    for key, pts in anchors.items():
        out[key] = {}
        for k2, (x, y, z) in pts.items():
            x2, y2, _ = proj3d.proj_transform(x, y, z, ax.get_proj())
            px, py = ax.transData.transform((x2, y2))
            out[key][k2] = [px / W, 1 - py / H]
    LABEL_AT = {"모델 가중치 · RAG": (0.16, 150), "KV 캐시 오프로드": (5.0, 40), "초고DWPD KV": (55, 3.2)}
    for nm, xr, yr, col in DEMANDS:
        x, y = lx(LABEL_AT[nm][0]), ly(LABEL_AT[nm][1])
        x2, y2, _ = proj3d.proj_transform(x, y, 0, ax.get_proj())
        px, py = ax.transData.transform((x2, y2))
        out["demand:" + nm] = [px / W, 1 - py / H]
    png = os.environ.get("PNG_OUT") or os.path.join(ASSETS, "portfolio_3d.png")
    fig.savefig(png, transparent=True)
    # 투명 여백을 잘라내고 좌표를 잘린 그림 기준으로 다시 맞춘다
    from PIL import Image
    im = Image.open(png)
    bx = im.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox()
    pad = 10
    bx = (max(0, bx[0] - pad), max(0, bx[1] - pad), min(im.width, bx[2] + pad), min(im.height, bx[3] + pad))
    im.crop(bx).save(png)
    cw, ch = bx[2] - bx[0], bx[3] - bx[1]

    def remap(pt):
        return [(pt[0] * W - bx[0]) / cw, (pt[1] * H - bx[1]) / ch]
    for k, v in list(out.items()):
        out[k] = {k2: remap(p2) for k2, p2 in v.items()} if isinstance(v, dict) else remap(v)
    with open(os.path.join(ASSETS, "portfolio_3d.json"), "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
    print("saved", png)


if __name__ == "__main__":
    main()
