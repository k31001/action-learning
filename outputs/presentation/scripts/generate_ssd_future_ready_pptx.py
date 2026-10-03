"""불확실성이 높은 미래에 대응하기 위한 고객 협력 전략: 4장 덱 (2026-10-03 v1.0).

제목 4개를 이어 읽으면 한 문단이 된다(아웃라인 v0.3):
  1 배경   SSD의 다음 수요는 하나로 정해지지 않으며, 지금 보이는 신호들은 서로 다른 기술을 요구합니다
  2 솔루션 SSD 안에서 풀 수 있는 기술은 지금처럼 준비하고, 고객 시스템과 함께 풀어야 하는 과제가 새로 나타나고 있습니다
  3 당위성 해법의 범위는 NAND에서 SSD로 넓어져 왔고, 새로 나타난 과제는 고객 시스템까지 넓어져야 풀립니다
  4 실행   고객 시스템 안으로 들어가는 새로운 방식이 필요하므로, 전략 고객과 계약 · 사람 · 역량으로 함께 설계합니다
  결론     실패할 수도 있는 기술에 투자하는 것이, 불확실한 미래에 실패하지 않는 불변 전략입니다

규율: samsung-memory-ppt-design-skill v2(11절 시각 우선). 본문 18pt 이상 · 출처 15pt · em-dash 금지 · 액센트 Samsung Blue 하나.
도형 · 차트는 모두 python-pptx 도형으로 그린다(차트 pt = 슬라이드 pt). 부품 이미지는 assets/photos가 있으면 사진, 없으면 3D 렌더.
원고 · 근거: outputs/presentation/ssd-future-ready-strategy-outline.md, outputs/report/ssd-future-ready-strategy-report.md (v1.1).
"""
import math
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
sys.path.insert(0, os.path.join(ROOT, ".claude", "skills", "samsung-memory-ppt-design-skill", "scripts"))

from deck_helpers import (BLUE, BLUE_T1, BLUE_T2, CW, GRAY, GRAY_2, INK, LINE, MX, PALE, RIGHT, TINT,  # noqa: E402
                          WHITE, Deck)
from pptx.enum.shapes import MSO_SHAPE  # noqa: E402
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN  # noqa: E402

ASSETS = os.path.join(HERE, "..", "assets")
OUT = os.environ.get("OUT_PATH") or os.path.join(HERE, "..", "ssd-future-ready-strategy.pptx")

d = Deck("불확실성이 높은 미래에 대응하기 위한 고객 협력 전략", total=4,
         logos_dir=os.path.join(ASSETS, "logos"), photos_dir=os.path.join(ASSETS, "photos"),
         renders_dir=os.path.join(ASSETS, "survival"))
tb, rect, label_box = d.tb, d.rect, d.label_box
L, C, R = PP_ALIGN.LEFT, PP_ALIGN.CENTER, PP_ALIGN.RIGHT
MID = MSO_ANCHOR.MIDDLE
RR = MSO_SHAPE.ROUNDED_RECTANGLE


def chip(s, x, y, w, h, text, fill=BLUE, color=WHITE, size=20, line=None, dash=False):
    label_box(s, x, y, w, h, [(text, size, True, color)], fill=fill, line=line, dash=dash)


# =============================================================== 1 배경
s = d.slide(1, "배경", "SSD의 다음 수요는 하나로 정해지지 않으며,\n지금 보이는 신호들은 서로 다른 기술을 요구합니다")

# ---- HBM 교훈 띠
rect(s, MX, 2.34, CW, 0.56, fill=PALE, shape=RR)
tb(s, MX + 0.30, 2.34, 11.6, 0.56, [[("HBM의 교훈   ", 20, True, BLUE), ("하나의 수요를 늦게 읽으면 첫 호황을 놓칩니다", 20, True, INK)]], anchor=MID)
tb(s, RIGHT - 7.6, 2.34, 7.3, 0.56, [[("삼성 HBM 점유율  ", 18, False, GRAY), ("40% → 17%", 22, True, BLUE), ("  (2022 → 2Q25)", 18, False, GRAY)]],
   align=R, anchor=MID)

PW, PG = 5.94, 0.30
PX = [MX, MX + PW + PG, MX + 2 * (PW + PG)]
HY = 3.12
d.panel_head(s, PX[0], PW, 1, "AI 추론: 신호가 엇갈린다", y=HY)
d.panel_head(s, PX[1], PW, 2, "인프라: 더 오래 쓴다", y=HY)
d.panel_head(s, PX[2], PW, 3, "랙 공간: 더 귀해진다", y=HY)
TY = 8.62  # 기술 칩

# ---- ① 저울 대신 위 · 아래 두 칸 + 새로 시작한 읽기
x0 = PX[0]
hw = (PW - 0.24) / 2
for k, (up, head, items, col) in enumerate([
        (True, "커지는 신호", ["고내구 SSD 출시", "50~120 DWPD", "LMCache FDP 머지"], BLUE),
        (False, "줄어드는 신호", ["Dynamo 쓰기 필터", "DeepSeek SSD 1/8", ""], GRAY_2)]):
    cx = x0 + k * (hw + 0.24)
    rect(s, cx, 3.84, hw, 2.70, fill=TINT if up else PALE, shape=RR)
    rect(s, cx + 0.22, 4.02, 0.50, 0.66, fill=col, shape=MSO_SHAPE.UP_ARROW if up else MSO_SHAPE.DOWN_ARROW)
    tb(s, cx + 0.86, 4.02, hw - 0.95, 0.66, [(head, 20, True, BLUE if up else GRAY)], anchor=MID)
    tb(s, cx + 0.22, 4.86, hw - 0.30, 1.60, [(t, 18, k == 0 and i == 1, INK if i != 1 else BLUE) for i, t in enumerate(items) if t],
       spacing=1.15)
# 새로 시작한 읽기
rect(s, x0, 6.74, PW, 1.66, fill=WHITE, line=BLUE, lw=1.25, shape=RR)
tb(s, x0 + 0.24, 6.84, 3.0, 0.40, [("새로 시작", 18, True, BLUE)])
d.fit(s, d.logo("nvidia"), x0 + PW - 1.82, 6.86, 1.58, 0.34)
tb(s, x0 + 0.24, 7.30, PW - 0.4, 0.48, [("GPU가 512B로 직접 읽기", 22, True, INK)], anchor=MID)
tb(s, x0 + 0.24, 7.80, PW - 0.4, 0.44, [("Storage-Next 40곳+ 출범 (2026-08)", 18, False, GRAY)], anchor=MID)
chip(s, x0, TY, PW, 0.62, "→ 고DWPD  ·  GPU 직결")

# ---- ② 서버 내용연수 덤벨 + 건물 빅넘버
x0 = PX[1]
rows = [("microsoft", 4, 6), ("google", 4, 6), ("meta", 4, 5.5), ("aws", 3, 6)]
LX, PX0, PX1 = x0, x0 + 1.75, x0 + PW - 0.15
Y0, YP = 3.90, 0.58
lo, hi = 2.5, 6.9


def xv(v):
    return PX0 + (v - lo) / (hi - lo) * (PX1 - PX0)


for g in (3, 4, 5, 6):
    rect(s, xv(g) - 0.005, Y0 - 0.12, 0.01, len(rows) * YP + 0.02, fill=LINE)
    tb(s, xv(g) - 0.4, Y0 + len(rows) * YP - 0.06, 0.8, 0.34, [(f"{g}년", 16, False, GRAY)], align=C)
for i, (lg, a, b) in enumerate(rows):
    y = Y0 + i * YP
    d.fit(s, d.logo(lg), LX, y, 1.50, 0.34 if lg != "aws" else 0.40, align="left")
    rect(s, xv(a), y + 0.155, xv(b) - xv(a), 0.03, fill=GRAY_2)
    rect(s, xv(a) - 0.10, y + 0.07, 0.20, 0.20, fill=GRAY_2, shape=MSO_SHAPE.OVAL)
    rect(s, xv(b) - 0.13, y + 0.04, 0.26, 0.26, fill=BLUE, shape=MSO_SHAPE.OVAL)
tb(s, x0, Y0 + len(rows) * YP + 0.30, PW, 0.36, [[("●", 16, False, GRAY_2), (" 변경 전   ", 16, False, GRAY), ("●", 16, False, BLUE), (" 변경 후  서버 내용연수", 16, False, GRAY)]], align=C)
# 빅넘버
tb(s, x0, 6.92, PW, 0.80, [[("건물 ", 30, True, BLUE), ("15 → 25", 48, True, BLUE), ("년", 30, True, BLUE)]], anchor=MID)
tb(s, x0, 7.76, PW, 0.40, [("Microsoft 데이터센터 내용연수 (FY27)", 18, False, GRAY)])
chip(s, x0, TY, PW, 0.62, "→ Mixed Media")

# ---- ③ 랙 전력 밀도 (로그 축) + 착공 빅넘버
x0 = PX[2]
bars = [("범용 랙\n평균", 10, "약 10"), ("H100\n공랭", 40, "40"), ("GB300\nNVL72", 140, "약 140"), ("2027\n1MW급", 1000, "1,000")]
BB, BHmax = 5.84, 2.10  # 막대 바닥 y, 1,000kW 높이
bw, bg = 0.92, 0.42
bx0 = x0 + 0.62
for gv in (10, 100, 1000):
    gy = BB - math.log10(gv) / 3 * BHmax
    rect(s, bx0 - 0.10, gy, 4 * bw + 3 * bg + 0.20, 0.012, fill=LINE)
    tb(s, x0 - 0.20, gy - 0.17, 0.74, 0.34, [(f"{gv:,}", 16, False, GRAY)], align=R)
for i, (nm, v, lab) in enumerate(bars):
    h = math.log10(v) / 3 * BHmax
    bx = bx0 + i * (bw + bg)
    last = i == 3
    rect(s, bx, BB - h, bw, h, fill=TINT if last else (GRAY if i == 2 else GRAY_2), line=BLUE if last else None, lw=1.5, dash=last)
    tb(s, bx - 0.3, BB - h - 0.42, bw + 0.6, 0.38, [(lab, 18, True, BLUE if last else INK)], align=C)
    tb(s, bx - 0.3, BB + 0.06, bw + 0.6, 0.66, [(t, 16, False, GRAY) for t in nm.split("\n")], align=C, spacing=1.0)
tb(s, x0, BB + 0.64, PW, 0.34, [("랙 전력 kW (로그 축)", 16, False, GRAY)], align=C)
tb(s, x0, 6.92, PW, 0.80, [[("착공 약 ", 30, True, BLUE), ("5", 48, True, BLUE), (" / 16GW", 30, True, BLUE)]], anchor=MID)
tb(s, x0, 7.76, PW, 0.40, [("2026 미국 가동 계획 대비 (추정)", 18, False, GRAY)])
chip(s, x0, TY, PW, 0.62, "→ 고용량")

d.band(s, 9.60, 0.80, "불변 전략", "하나의 미래에 걸지 않고, 지금 보이는 신호마다 준비합니다")
d.footer(s, "출처: HBM 점유율(과제팀 집계) · KV 캐시 신호(Kioxia GP1 · DapuStor X5 · Phison X202Z 발표, NVIDIA Dynamo 문서, LMCache PR #4016, DeepSeek 보도) · Storage-Next(FMS 2026 보도) · "
            "내용연수(Microsoft IR 원문, 나머지 10-K 보도) · 랙 전력(Uptime 2026 · SemiAnalysis · NVIDIA 800VDC) · 착공(Sightline 추정, 2.3GW 반론과 상충)")
d.notes(s, "1장입니다. HBM에서 배운 것은 하나의 수요를 늦게 읽으면 첫 호황을 놓친다는 것입니다. 그래서 이번에는 다음 수요를 하나로 단정하지 않고, 지금 보이는 신호를 하나씩 읽었습니다. "
        "첫째, AI 추론이 SSD를 쓰는 방식입니다. KV 캐시 오프로딩의 쓰기는 커질 신호와 줄어들 신호가 함께 있습니다. 50에서 120 DWPD 고내구 SSD가 잇달아 나왔고 LMCache에 FDP 배치가 들어갔지만, NVIDIA Dynamo는 SSD 수명을 위해 재사용이 많은 블록만 내리고, DeepSeek는 KV용 SSD를 8분의 1로 줄였다는 보도가 있습니다. "
        "여기에 GPU가 SSD를 512바이트 단위로 직접 읽는 새로운 경로가 열리고 있습니다. NVIDIA Storage-Next가 2026년 8월 40곳 이상으로 출범했습니다. 이 두 신호가 고DWPD와 GPU 직결 기술을 요구합니다. "
        "둘째, 하이퍼스케일러는 자산을 더 오래 씁니다. 서버 내용연수를 5년에서 6년으로 늘렸고, Microsoft는 데이터센터 건물을 25년 쓰기로 했습니다. 기존 인프라 안에서 빠른 영역과 큰 영역을 함께 주는 Mixed Media가 여기에 대응합니다. "
        "셋째, 랙 공간이 귀해집니다. 랙 전력은 10킬로와트에서 140킬로와트, 2027년에는 1메가와트급을 준비하고 있고, 미국 데이터센터 착공은 계획보다 늦어지고 있다는 추정이 있습니다. 같은 공간에 더 많이 담는 고용량 기술이 여기에 대응합니다. "
        "어느 하나에 걸지 않고, 지금 보이는 신호마다 준비하겠습니다. 다만 이 신호들이 미래의 전부라고 말씀드리지는 않습니다. 지금 예측할 수 있는 범위 안에서의 준비입니다.")

# =============================================================== 2 솔루션
s = d.slide(2, "솔루션", "SSD 안에서 풀 수 있는 기술은 지금처럼 준비하고,\n고객 시스템과 함께 풀어야 하는 과제가 새로 나타나고 있습니다")

# 두 묶음: 왼쪽 그레이(SSD 안에서 · 지금처럼) 카드 2장, 오른쪽 Blue(고객 시스템과 함께 · 새로 나타남) 카드 2장
GT, GB = 2.34, 9.42
GWG = 7.80                      # 그레이 묶음 폭
BXG, BWG = MX + GWG + 0.30, CW - GWG - 0.30
rect(s, MX, GT, GWG, GB - GT, fill=PALE, shape=RR)
rect(s, BXG, GT, BWG, GB - GT, fill=TINT, line=BLUE, lw=1.5, shape=RR)
tb(s, MX + 0.26, GT + 0.08, GWG - 0.4, 0.52, [[("SSD 안에서  ", 24, True, GRAY), ("지금처럼", 24, True, INK)]], anchor=MID)
tb(s, BXG + 0.26, GT + 0.08, BWG - 0.4, 0.52, [[("고객 시스템과 함께  ", 24, True, BLUE), ("새로 나타남", 24, True, INK)]], anchor=MID)

CT, CB = 3.02, 9.24             # 카드 위 · 아래
gw2 = (GWG - 0.60) / 2
bw2 = (BWG - 0.60) / 2
CARDS = [MX + 0.20, MX + 0.40 + gw2, BXG + 0.20, BXG + 0.40 + bw2]
CWS = [gw2, gw2, bw2, bw2]
NAMES = [("Mixed Media", ""), ("고용량", ""), ("고DWPD", ""), ("GPU 직결", "옵션")]
VY0, VY1 = 3.66, 6.86            # 시각 영역
KY = 6.98                        # 핵심 수치 · 한 줄
GY = 8.20                        # 신호
for i, (x, w) in enumerate(zip(CARDS, CWS)):
    rect(s, x, CT, w, CB - CT, fill=WHITE, line=BLUE if i == 3 else None, lw=1.5, shape=RR, dash=(i == 3))
    nm, opt = NAMES[i]
    tb(s, x + 0.24, CT + 0.10, w - 0.4, 0.48, [[(nm, 24, True, INK)] + ([("   " + opt, 18, True, BLUE)] if opt else [])], anchor=MID)
    rect(s, x + 0.24, GY - 0.10, w - 0.48, 0.012, fill=LINE)

# ---- ① Mixed Media: SSD + pSLC/QLC 영역 띠, 추가 슬롯 0개
x, w = CARDS[0], CWS[0]
d.fit(s, d.part("ssd"), x + 0.24, VY0 + 0.15, w - 0.48, 1.55)
rect(s, x + 0.24, VY0 + 2.05, 0.95, 0.50, fill=BLUE_T1)
rect(s, x + 1.19, VY0 + 2.05, w - 1.43, 0.50, fill=GRAY_2)
tb(s, x + 0.24, VY0 + 2.05, 0.95, 0.50, [("pSLC", 18, True, WHITE)], align=C, anchor=MID)
tb(s, x + 1.19, VY0 + 2.05, w - 1.43, 0.50, [("QLC", 18, True, WHITE)], align=C, anchor=MID)
tb(s, x + 0.24, KY, w - 0.4, 0.70, [[("추가 슬롯 ", 22, True, BLUE), ("0", 44, True, BLUE), ("개", 22, True, BLUE)]], anchor=MID)
tb(s, x + 0.24, KY + 0.72, w - 0.4, 0.40, [("24베이 서버에 pSLC 19.2TB", 18, False, GRAY)])

# ---- ② 고용량: 다이 격자(고장 1개) + 다이 ×2
x, w = CARDS[1], CWS[1]
cols, rws, cs, gp = 10, 7, 0.235, 0.06
gx0 = x + (w - (cols * cs + (cols - 1) * gp)) / 2
for r in range(rws):
    for c in range(cols):
        bad = (r, c) == (3, 6)
        rect(s, gx0 + c * (cs + gp), VY0 + 0.20 + r * (cs + gp), cs, cs,
             fill=INK if bad else (BLUE_T2 if c == cols - 1 else GRAY_2))
tb(s, x + 0.24, VY0 + 2.36, w - 0.48, 0.40, [[("■", 16, False, INK), (" 고장 다이   ", 16, False, GRAY), ("■", 16, False, BLUE_T2), (" 패리티", 16, False, GRAY)]], align=C)
tb(s, x + 0.24, KY, w - 0.4, 0.70, [[("다이 ", 22, True, BLUE), ("×2", 44, True, BLUE)]], anchor=MID)
tb(s, x + 0.24, KY + 0.72, w - 0.4, 0.40, [("245 → 512TB, 이중 패리티", 18, False, GRAY)])

# ---- ③ 고DWPD: 2TB · 30 DWPD 다이 수 막대
x, w = CARDS[2], CWS[2]
tb(s, x + 0.24, VY0 - 0.04, w - 0.4, 0.36, [("2TB · 30 DWPD · 5년에 필요한 다이 수", 16, False, GRAY)])
BX, BMAX = x + 0.24, w - 1.60
for i, (lab, v, fill, line, dash, vlab) in enumerate([
        ("SSD 혼자 (SLC 모드)", 120, GRAY_2, None, False, "약 120"),
        ("+ 고객의 배치 정보 (FDP)", 47, BLUE, None, False, "약 47"),
        ("+ MLC 모드 (P/E 3만 가정)", 40, TINT, BLUE, True, "약 40")]):
    yy = VY0 + 0.42 + i * 0.94
    tb(s, BX, yy, w - 0.4, 0.36, [(lab, 18, i == 1, BLUE if i == 1 else INK)])
    bl = BMAX * v / 120
    rect(s, BX, yy + 0.38, bl, 0.42, fill=fill, line=line, lw=1.25, dash=dash)
    tb(s, BX + bl + 0.10, yy + 0.38, 1.3, 0.42, [(vlab, 20, True, BLUE if i else GRAY)], anchor=MID)
tb(s, x + 0.24, KY, w - 0.4, 0.70, [[("다이 ", 22, True, BLUE), ("-60%", 44, True, BLUE)]], anchor=MID)
tb(s, x + 0.24, KY + 0.72, w - 0.4, 0.40, [("데이터 수명은 고객 SW만 압니다", 18, True, INK)])

# ---- ④ GPU 직결: 512B 읽기가 막히는 사슬
x, w = CARDS[3], CWS[3]
tb(s, x + 0.24, VY0 - 0.04, w - 0.4, 0.36, [("512B 읽기 상한 (드라이브 1개)", 16, False, GRAY)])
chain = [("매체", "200만", GRAY_2), ("NAND 채널", "1,200만", GRAY_2), ("PCIe Gen7 (2028)", "1억", BLUE_T1), ("GPU 쪽 처리", "고객과 함께", BLUE)]
for i, (nm, v, col) in enumerate(chain):
    yy = VY0 + 0.40 + i * 0.70
    rect(s, x + 0.24, yy, w - 0.48, 0.52, fill=col, shape=RR)
    tb(s, x + 0.42, yy, w - 2.6, 0.52, [(nm, 18, True, WHITE)], anchor=MID)
    tb(s, x + w - 2.30, yy, 1.88, 0.52, [(v, 18, True, WHITE)], align=R, anchor=MID)
    if i < 3:
        rect(s, x + w / 2 - 0.12, yy + 0.53, 0.24, 0.15, fill=BLUE_T2, shape=MSO_SHAPE.ISOSCELES_TRIANGLE).rotation = 180
tb(s, x + 0.24, KY, w - 0.4, 0.70, [[("1억 IOPS는 ", 22, True, BLUE), ("2028", 44, True, BLUE), ("년", 22, True, BLUE)]], anchor=MID)
tb(s, x + 0.24, KY + 0.72, w - 0.4, 0.40, [("기반 기술은 지금, 제품은 신호로", 18, True, INK)])

# ---- 카드 아래: 신호(▲ 확대 · ▼ 축소)
gates = [("▲ 내용연수 연장", "▼ 그린필드 증설"), ("▲ 착공 지연", "▼ 전력망 완화"),
         ("▲ 30 DWPD 요구 확인", "▼ KV 압축 확산"), ("▲ NVIDIA 사양 공개", "▼ HBM 캐시로 충분")]
for (x, w), (up, dn) in zip(zip(CARDS, CWS), gates):
    tb(s, x + 0.24, GY, w - 0.4, 0.90, [(up, 18, True, BLUE), (dn, 18, False, GRAY)], spacing=1.1)

d.band(s, 9.60, 0.80, "결론", "SSD 안에서 풀 수 있는 것은 지금처럼 잘하고, 새로 나타난 과제는 다르게 풉니다")
d.footer(s, "다이 수: 1Tb TLC 환산, SLC 모드 P/E 6만, WAF 3 → 1, 이론 비트/셀 비(파생 산술), MLC 모드 P/E는 [사내 확인] · 512B 상한: 16채널 · 3.6GB/s · 4KB 전송, PCIe x4 링크 산술(파생) · "
            "pSLC 19.2TB = 800GB × 24베이(DapuStor 비율) · 다이 ×2: 245TB 1,024개 → 512TB 약 2,133개 · ▲▼ 신호는 보고서 §4.4 · 부품 이미지는 3D 렌더")
d.notes(s, "2장입니다. 지금 보이는 신호에 맞춰 준비할 기술을 두 묶음으로 나눴습니다. "
        "왼쪽 회색은 SSD 안에서 풀 수 있는 기술입니다. Mixed Media는 QLC 드라이브의 일부를 pSLC 영역으로 써서, 24베이 서버라면 슬롯을 하나도 더 쓰지 않고 19.2테라바이트의 빠른 영역을 줍니다. 고용량은 같은 폼팩터에 다이를 두 배 담고, 다이 고장을 패리티로 견딥니다. 이 두 기술은 지금 하던 방식으로 잘하면 됩니다. "
        "오른쪽 파란색은 새로 나타난 과제입니다. 2테라바이트 30 DWPD 제품을 SSD 혼자 SLC 모드로 만들면 WAF가 3에 머물러 다이가 약 120개 필요합니다. 고객이 데이터 수명 정보를 주면 WAF가 1이 되어 약 47개, 60퍼센트가 줄어듭니다. MLC 모드는 P/E가 약 2만 6천 회를 넘을 때만 조금 더 줄이므로 사내 확인이 필요합니다. 가장 큰 이익은 고객의 정보에서 나옵니다. "
        "GPU 직결은 시장 규모와 요구 사양이 아직 불확실해 제품으로 걸지는 않습니다. 다만 512바이트 읽기는 매체, NAND 채널, PCIe 링크 순으로 막히고, 1억 IOPS는 2028년 PCIe 7세대에 묶입니다. 채널과 명령 처리 구조는 컨트롤러 세대마다 바뀌므로 지금 기반 기술을 시작하지 않으면 한 세대 늦습니다. 마지막 병목은 GPU 쪽 처리라 고객과 함께 풀어야 합니다. "
        "카드 아래는 신호입니다. 위 삼각형이 보이면 비중을 늘리고, 아래 삼각형이 보이면 줄입니다. 기반은 지금 만들고 비중은 신호로 정하는 것, 이것이 불변 전략입니다.")

# =============================================================== 3 당위성
s = d.slide(3, "당위성", "해법의 범위는 NAND에서 SSD로 넓어져 왔고,\n새로 나타난 과제는 고객 시스템까지 넓어져야 풀립니다")
tb(s, MX, 2.40, 11.0, 0.46, [[("고객 요구는 그대로인데 단품 지표가 나빠지면,  ", 20, False, GRAY), ("보상은 한 계층 위로 올라갑니다", 20, True, INK)]], anchor=MID)
BOT = 9.40
steps = [  # x, w, top, fill, step name, years, metric, metric sub, state chip
    (MX, 5.55, 5.75, PALE, "NAND → SSD", "1991~", "ECC 약 60배", "셀 오류율 약 100만 배 ↑를 흡수", "완결"),
    (MX + 5.75, 5.90, 4.45, PALE, "SSD 혼자 최적화", "2014~2019", "WAF ≈ 3", "데이터 수명을 추정만 할 수 있었다", "부분 성공"),
    (MX + 11.85, 6.57, 3.10, BLUE, "고객 시스템과 공동 설계", "2022~", "WAF 3.22 → 1.03", "고객이 데이터 수명을 알려 준다", "다음 칸"),
]
for i, (x, w, top, fill, nm, yr, met, msub, st) in enumerate(steps):
    hot = fill == BLUE
    rect(s, x, top, w, BOT - top, fill=fill, shape=RR)
    ink, sub = (WHITE, BLUE_T2) if hot else (INK, GRAY)
    tb(s, x + 0.30, top + 0.14, w - 2.1, 0.90, [(nm, 24, True, ink), (yr, 18, False, sub)], spacing=1.05)
    chip(s, x + w - 1.70, top + 0.22, 1.40, 0.44, st, fill=WHITE if hot else (GRAY_2 if i == 0 else WHITE),
         color=BLUE if hot else (WHITE if i == 0 else GRAY), size=18, line=None if (hot or i == 0) else GRAY_2)
    iy = top + 1.12
    if i == 0:
        d.fit(s, d.part("nand"), x + 0.40, iy, 1.20, 0.82)
        d.arrow_r(s, x + 1.78, iy + 0.29, 0.48, 0.24)
        d.fit(s, d.part("ssd"), x + 2.42, iy, 2.30, 0.82)
        my = iy + 0.92
    elif i == 1:
        d.fit(s, d.part("ssd"), x + 0.40, iy, 2.80, 1.05)
        my = iy + 1.25
    else:
        d.fit(s, d.part("server"), x + 0.40, iy, 2.20, 1.25)
        d.fit(s, d.part("ssd"), x + 2.80, iy + 0.25, 1.90, 0.78)
        my = iy + 1.40
    tb(s, x + 0.30, my, w - 0.6, 0.74, [(met, 40, True, WHITE if hot else (GRAY if i == 1 else INK))], anchor=MID)
    tb(s, x + 0.30, my + 0.76, w - 0.6, 0.40, [(msub, 18, False, sub if not hot else WHITE)])
# 3칸: 고객 시스템만 아는 것 → 두 과제
x, w, top = steps[2][0], steps[2][1], steps[2][2]
ky = 7.00
tb(s, x + 0.30, ky, w - 0.6, 0.38, [("고객 시스템만 아는 것", 18, True, BLUE_T2)])
for j, (k, v) in enumerate([("데이터가 언제 지워지나", "고DWPD"), ("GPU가 무엇을 다시 읽나", "GPU 직결")]):
    yy = ky + 0.46 + j * 0.80
    label_box(s, x + 0.30, yy, w - 2.65, 0.64, [(k, 18, True, BLUE)], fill=WHITE)
    d.arrow_r(s, x + w - 2.27, yy + 0.20, 0.38, 0.24, fill=BLUE_T2)
    tb(s, x + w - 1.80, yy, 1.55, 0.64, [(v, 20, True, WHITE)], anchor=MID)
# 왼쪽 위: 셀은 약해지고 요구는 그대로 (사실 그래프)
tb(s, MX, 2.98, 5.5, 0.34, [("셀 수명 P/E (대표값, 로그 축)", 16, False, GRAY)])
tb(s, MX, 3.34, 1.0, 0.34, [("고객 요구", 16, True, BLUE)], anchor=MID)
rect(s, MX + 1.05, 3.50, 3.95, 0.03, fill=BLUE)
tb(s, MX + 5.08, 3.34, 1.0, 0.34, [("그대로", 16, True, BLUE)], anchor=MID)
pe = [("SLC", 100000, "10만"), ("MLC", 10000, "1만"), ("TLC", 3000, "3천"), ("QLC", 1000, "1천")]
PB, PH = 5.30, 1.30
for k, (nm, v, lab) in enumerate(pe):
    h = (math.log10(v) - 2) / 3 * PH
    bx = MX + 1.25 + k * 1.20
    rect(s, bx, PB - h, 0.78, h, fill=GRAY_2 if k else GRAY)
    tb(s, bx - 0.2, PB - h - 0.34, 1.18, 0.32, [(lab, 16, True, INK)], align=C)
    tb(s, bx - 0.2, PB + 0.02, 1.18, 0.32, [(nm, 16, False, GRAY)], align=C)
tb(s, MX + 2.40, 3.66, 3.6, 0.48, [("약 100배 ↓", 24, True, BLUE)], align=C, anchor=MID)
# 1→2→3 사이 쉐브론
d.chevron(s, MX + 5.57, 7.30, w=0.16, h=0.50)
d.chevron(s, MX + 11.67, 6.50, w=0.16, h=0.50)

d.band(s, 9.60, 0.80, "결론", "사양서만으로는 2칸에 머뭅니다. 3칸은 고객 시스템 안에서 함께 설계해야 닿습니다")
d.footer(s, "출처: 해법 사다리 원장(JESD218 UBER 요구 · LDPC 정정 능력 연혁 · Multi-stream(2014) · AutoStream(2017) · FDP NVMe TP4146(2022) · CacheLib + FDP WAF 3.22 → 1.03(EuroSys'25) · "
            "LMCache FDP 배치 PR #4016(2026-08)) · GPU 재읽기: Samsung aisio(GPU HBM 캐시 적중이 이득의 주원천) · 부품 이미지는 3D 렌더")
d.notes(s, "3장입니다. 왜 고객 시스템까지 가야 하는지 메모리의 역사로 말씀드리겠습니다. 고객 요구는 그대로인데 단품 지표가 나빠지면, 보상은 늘 한 계층 위로 올라갔습니다. "
        "첫 계단은 NAND에서 SSD입니다. 셀 오류율이 약 100만 배 나빠졌지만 컨트롤러의 ECC가 약 60배 강해지면서 SSD 안에서 완결됐습니다. "
        "둘째 계단은 SSD 혼자 하는 최적화입니다. 2014년부터 2019년까지 멀티 스트림과 핫 콜드 분리처럼 SSD가 워크로드를 추정했지만, 실제 워크로드에서 WAF는 약 3에 머물렀습니다. 데이터가 언제 지워지는지는 호스트만 알기 때문입니다. "
        "셋째 계단이 고객 시스템과의 공동 설계입니다. 호스트가 데이터 수명을 알려 주는 FDP로 Meta CacheLib은 WAF를 3.22에서 1.03으로 낮췄고, 우리는 LMCache에 같은 기능을 넣었습니다. "
        "새로 나타난 두 과제가 바로 이 셋째 계단에 있습니다. 고DWPD에 필요한 정보는 데이터가 언제 지워지는지이고, GPU 직결에 필요한 정보는 GPU가 무엇을 다시 읽는지입니다. 둘 다 고객 시스템 안에 있습니다. "
        "사양서를 받아 SSD를 잘 만드는 방식은 둘째 계단에 머뭅니다. 셋째 계단은 고객 시스템 안에서 함께 설계해야 닿습니다.")

# =============================================================== 4 실행
s = d.slide(4, "실행 전략", "고객 시스템 안으로 들어가는 새로운 방식이 필요하므로,\n전략 고객과 계약 · 사람 · 역량으로 함께 설계합니다")
C1, W1 = MX, 5.55
C2, W2 = 6.55, 6.90
C3, W3 = 13.66, 5.55
BENCH_Y, NOW_Y, NEXT_Y = 2.96, 3.48, 5.30


def tag(s, x, y, text, hot):
    tb(s, x, y, 5.0, 0.36, [(text, 18, True, BLUE if hot else GRAY_2)])


# ---- ① 계약
d.panel_head(s, C1, W1, 1, "계약: 물량에 기술 협력을")
wm, _ = d.img(s, d.logo("micron"), C1, BENCH_Y + 0.04, h=0.27)
tb(s, C1 + wm + 0.08, BENCH_Y - 0.02, 0.40, 0.38, [("↔", 20, True, GRAY)], align=C, anchor=MID)
wa, _ = d.img(s, d.logo("anthropic"), C1 + wm + 0.56, BENCH_Y + 0.08, h=0.19)
tb(s, C1 + wm + 0.56 + wa + 0.14, BENCH_Y - 0.02, 1.2, 0.38, [("2026-06", 16, False, GRAY)], anchor=MID)
tag(s, C1, NOW_Y, "지금", False)
label_box(s, C1, NOW_Y + 0.44, W1, 0.60, [("장기 물량 계약 (LTA)", 20, True, WHITE)], fill=GRAY_2)
tb(s, C1, NOW_Y + 1.10, W1, 0.36, [("수량과 가격만 약속합니다", 18, False, GRAY)], align=C)
d.down(s, C1 + W1 / 2, NEXT_Y - 0.32)
tag(s, C1, NEXT_Y, "앞으로: 전략적 계약", True)
SW1 = W1 - 1.05
for i, (t, st) in enumerate([("자본 연계 (선택)", "opt"), ("운영 통합", "t1"), ("공동 설계 · 최적화", "hot"), ("다년 공급 (물량)", "base")]):
    yy = NEXT_Y + 0.44 + i * 0.64
    if st == "opt":
        label_box(s, C1, yy, SW1, 0.54, [(t, 18, False, GRAY)], fill=WHITE, line=GRAY_2, dash=True)
    elif st == "base":
        label_box(s, C1, yy, SW1, 0.54, [(t, 20, True, WHITE)], fill=GRAY_2)
    else:
        label_box(s, C1, yy, SW1, 0.54, [(t, 20, True, WHITE)], fill=BLUE if st == "hot" else BLUE_T1)
by0, by1 = NEXT_Y + 0.44 + 0.64, NEXT_Y + 0.44 + 2 * 0.64 + 0.54
rect(s, C1 + SW1 + 0.10, by0, 0.035, by1 - by0, fill=BLUE)
rect(s, C1 + SW1 + 0.02, by0, 0.10, 0.035, fill=BLUE)
rect(s, C1 + SW1 + 0.02, by1 - 0.035, 0.10, 0.035, fill=BLUE)
tb(s, C1 + SW1 + 0.20, by0, 0.85, by1 - by0, [("기술", 18, True, BLUE), ("협력", 18, True, BLUE)], anchor=MID, spacing=1.0)
d.chevron(s, C2 - 0.19, 6.10, w=0.16, h=0.50)

# ---- ② 사람
d.panel_head(s, C2, W2, 2, "사람: 고객 안에 상주")
d.img(s, d.logo("palantir"), C2, BENCH_Y + 0.01, h=0.34)
tb(s, C2 + 0.44, BENCH_Y - 0.02, W2 - 0.44, 0.38, [[("Palantir FDE", 18, True, INK), ("   Anthropic · OpenAI도 채택", 16, False, GRAY)]], anchor=MID)
tag(s, C2, NOW_Y, "지금", False)
BY = NOW_Y + 0.44
rect(s, C2, BY, 1.70, 0.60, fill=WHITE, line=LINE, shape=RR)
d.fit(s, d.logo("samsung"), C2 + 0.15, BY + 0.13, 1.40, 0.34)
label_box(s, C2 + W2 - 1.70, BY, 1.70, 0.60, [("고객", 20, True, INK)], fill=WHITE, line=LINE)
rect(s, C2 + 1.78, BY + 0.29, W2 - 3.56, 0.03, fill=GRAY_2)
rect(s, C2 + W2 / 2 - 0.22, BY + 0.02, 0.44, 0.56, fill=WHITE, line=GRAY_2, lw=1.25, shape=MSO_SHAPE.FOLDED_CORNER)
tb(s, C2, NOW_Y + 1.10, W2, 0.36, [("스펙 문서 · 간헐적 미팅: 명시된 요구만 오갑니다", 18, False, GRAY)], align=C)
d.down(s, C2 + W2 / 2, NEXT_Y - 0.32)
tag(s, C2, NEXT_Y, "앞으로: 고객 상주 협업 (Co-Design Pod)", True)
SBY = NEXT_Y + 0.44
rect(s, C2, SBY, W2, 0.56, fill=WHITE, line=LINE, shape=RR)
d.fit(s, d.logo("samsung"), C2 + 0.22, SBY + 0.14, 1.45, 0.28, align="left")
tb(s, C2 + 1.95, SBY, W2 - 2.2, 0.56, [("제품 · 로드맵", 18, True, INK)], anchor=MID)
BX0, BY0, BW = C2, SBY + 1.02, W2
BH = 8.56 - BY0
rect(s, BX0, BY0, BW, BH, fill=TINT, line=BLUE, lw=1.5, shape=RR)
ph = 0.62
pod_x0 = BX0 + 0.35
pod_w = 3 * (0.62 * ph) + 2 * 0.10
pc = pod_x0 + pod_w / 2
AY0, AY1 = SBY + 0.60, BY0 + 0.38
rect(s, pc - 0.46, AY0, 0.34, AY1 - AY0, fill=BLUE, shape=MSO_SHAPE.DOWN_ARROW)
rect(s, pc + 0.12, AY0, 0.34, AY1 - AY0, fill=BLUE_T1, shape=MSO_SHAPE.UP_ARROW)
tb(s, pc - 1.40, AY0 + 0.02, 0.86, 0.38, [("사람", 18, True, BLUE)], align=R, anchor=MID)
tb(s, pc + 0.58, AY0 + 0.02, 3.4, 0.38, [("실제 요구 → 제품", 18, True, BLUE_T1)], anchor=MID)
tb(s, BX0 + BW - 3.2, BY0 + 0.10, 3.0, 0.36, [("고객 AI 데이터센터", 18, True, BLUE)], align=R)
py = BY0 + 0.52
px = pod_x0
for _ in range(3):
    px += d.person(s, px, py, ph, BLUE) + 0.10
tb(s, pod_x0 - 0.3, py + ph + 0.06, pod_w + 0.6, 0.36, [("삼성 Pod", 18, True, BLUE)], align=C)
gw = 2 * (0.62 * ph) + 0.10
gx = BX0 + BW - 1.55 - gw
qx = gx
for _ in range(2):
    qx += d.person(s, qx, py, ph, GRAY_2) + 0.10
tb(s, gx - 0.55, py + ph + 0.06, gw + 1.1, 0.36, [("고객 엔지니어", 18, True, GRAY)], align=C)
m0, m1 = pod_x0 + pod_w + 0.15, gx - 0.15
rect(s, m0, py + 0.20, m1 - m0, 0.30, fill=BLUE_T2, shape=MSO_SHAPE.LEFT_RIGHT_ARROW)
tb(s, m0, py + 0.56, m1 - m0, 0.34, [("매일 함께", 16, True, BLUE)], align=C)
d.fit(s, d.part("server"), BX0 + BW - 1.45, py - 0.02, 1.25, 0.76)
d.chevron(s, C3 - 0.19, 6.10, w=0.16, h=0.50)

# ---- ③ 역량 격자 (새 과제의 층이 위로)
d.panel_head(s, C3, W3, 3, "역량: 고객처럼 보는 눈")
tb(s, C3, BENCH_Y - 0.02, W3, 0.38, [[("고객의 지표  ", 16, False, GRAY), ("토큰당 비용 · GPU 가동률", 18, True, INK)]], anchor=MID)
LW3, CWN, G3, CWF = 1.70, 1.20, 0.10, 2.55
cxn, cxf = C3 + LW3, C3 + LW3 + CWN + G3
tb(s, cxn, NOW_Y, CWN, 0.36, [("지금", 18, True, GRAY_2)], align=C)
tb(s, cxf, NOW_Y, CWF, 0.36, [("필요한 기술", 18, True, BLUE)], align=C)
layers = [("AI DC 운영", "없음", "off", "TCO · 추론 SLO", BLUE),
          ("KV 캐시 SW", "LMCache", "part", "Dynamo · Mooncake", BLUE),
          ("GPU I/O", "aisio 연구", "part", "SCADA · cuFile", BLUE),
          ("커널 · 규격", "일부", "part", "FDP 런타임 · TPAR", BLUE_T1),
          ("SSD FW", "강점", "on", "512B 경로 · 셀 모드", BLUE_T1),
          ("NAND", "강점", "on", "", BLUE_T2)]
RY3, RP3, RH3 = NOW_Y + 0.44, 0.66, 0.56
for r, (nm, now_t, st, need, col) in enumerate(layers):
    yy = RY3 + r * RP3
    gap = r < 3
    tb(s, C3, yy, LW3 - 0.08, RH3, [(nm, 18, True, BLUE if gap else GRAY)], anchor=MID)
    if st == "on":
        label_box(s, cxn, yy, CWN, RH3, [(now_t, 18, True, WHITE)], fill=GRAY_2)
    elif st == "part":
        label_box(s, cxn, yy, CWN, RH3, [(now_t, 16, True, GRAY)], fill=PALE)
    else:
        label_box(s, cxn, yy, CWN, RH3, [(now_t, 18, True, GRAY)], fill=WHITE, line=GRAY_2, dash=True)
    if need:
        label_box(s, cxf, yy, CWF, RH3, [(need, 17, True, WHITE)], fill=col)
    else:
        rect(s, cxf, yy, CWF, RH3, fill=col, shape=RR)
EY = RY3 + 6 * RP3 + 0.06
tb(s, C3, EY, W3, 0.80, [[("LMCache: ", 18, False, GRAY), ("삼성 Committer · FDP 머지", 18, True, INK)],
                         [("aisio: ", 18, False, GRAY), ("삼성 GPU 주도 I/O 오픈소스", 18, True, INK)]], spacing=1.05)

# ---- 첫 90일
NY = 8.80
tb(s, MX, NY, 1.40, 0.56, [("첫 90일", 20, True, BLUE)], anchor=MID)
nx = MX + 1.45
for t in ["전략 고객 1~2사", "Co-Design Pod", "시스템 SW 채용", "MLC 모드 P/E 평가", "신호 대시보드"]:
    w = 0.50 + 0.205 * sum(1.0 if ord(ch) > 0x3000 else 0.62 for ch in t)
    label_box(s, nx, NY + 0.04, w, 0.50, [(t, 18, True, BLUE)], fill=WHITE, line=BLUE, lw=1.25)
    nx += w + 0.20

d.band(s, 9.60, 0.80, "결론", "실패할 수도 있는 기술에 투자하는 것이, 불확실한 미래에 실패하지 않는 불변 전략입니다", size=24)
d.footer(s, "벤치마크: Micron ↔ Anthropic 전략적 계약(2026-06-22: 공동 최적화 · 다년 공급 · 운영 통합 · 전략 투자, 재무 조건 비공개) · Palantir FDE(고객 상주) · "
            "기여 현황은 공개 저장소 기준(LMCache PR #4016, xnvme/aisio) · TPAR: NVMe TPAR 4217(GPU 직결 LBA 범위 접근 제어, 진행 중) · 로고는 식별 표시")
d.notes(s, "4장 실행 전략입니다. 새로 나타난 과제의 요구는 고객 시스템 안에 있습니다. 그래서 지금까지와 다른 방식이 필요하고, 그 방식을 새 과제에 집중합니다. Mixed Media와 고용량은 지금 방식을 유지합니다. "
        "첫째, 계약입니다. 지금은 수량과 가격만 약속합니다. Micron은 Anthropic과의 전략적 계약에서 다년 공급 위에 공동 설계와 운영 통합을 묶었습니다. 우리도 물량 위에 기술 협력을 쌓겠습니다. "
        "둘째, 사람입니다. 스펙 문서로는 명시된 요구만 옵니다. Palantir의 FDE처럼 Co-Design Pod가 고객 AI 데이터센터 안에 상주해 실제 요구를 찾고, 그것을 제품으로 되돌립니다. "
        "셋째, 역량입니다. NAND와 SSD 펌웨어는 강점입니다. 비어 있는 곳은 그 위입니다. KV 캐시 소프트웨어는 LMCache에서 시작했고 Dynamo와 Mooncake로 넓혀야 합니다. GPU I/O는 삼성 aisio 연구가 출발점이고, SCADA와 cuFile 생태계에 들어가야 합니다. 그리고 고객의 지표인 토큰당 비용과 GPU 가동률로 말하는 사람이 필요합니다. "
        "첫 90일에는 전략 고객 한두 곳을 정하고, Co-Design Pod를 꾸리고, 시스템 소프트웨어 전문가 채용을 시작하고, MLC 모드 P/E를 사내에서 평가하고, 신호 대시보드를 돌리겠습니다. "
        "마지막으로, 실패할 수도 있는 기술에 투자하는 것이 불확실한 미래에 실패하지 않는 불변 전략입니다. 지금 예측할 수 있는 범위 안에서 최선을 다하고, 신호가 바뀌면 판단을 고치겠습니다.")

d.save(os.path.abspath(OUT))
print(f"생성 완료: {os.path.abspath(OUT)} ({len(d.prs.slides._sldIdLst)}장)")
