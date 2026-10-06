"""불확실성이 높은 미래에 대응하기 위한 고객 협력 전략: 4장 덱 (2026-10-06 v1.5).

제목 4개를 이어 읽으면 한 문단이 된다(아웃라인 v0.3):
  1 배경   SSD의 다음 수요는 하나로 정해지지 않으며, 데이터센터 응용마다 SSD에 요구하는 특성이 다릅니다
  2 핵심 기술 핵심 기술 여섯 가지 중 다섯은 명확한 스펙으로 풀리지만, FDP는 고객과 함께 설계해야 제대로 동작합니다
  3 당위성 해법의 범위는 NAND에서 SSD로 넓어져 왔고, 새로 나타난 과제는 고객 시스템까지 넓어져야 풀립니다
  4 실행   고객 시스템 안으로 들어가는 새로운 방식이 필요하므로, 전략 고객과 계약 · 사람 · 역량으로 함께 설계합니다
  결론     실패할 수도 있는 기술에 투자하는 것이, 불확실한 미래에 실패하지 않는 불변 전략입니다

규율: samsung-memory-ppt-design-skill v2.1(11절 시각 우선, 11.J 근거 사슬: 주장마다 데이터 그래프). 본문 18pt 이상 · 출처 15pt · em-dash 금지 · 액센트 Samsung Blue 하나.
도형 · 차트는 모두 python-pptx 도형으로 그린다(차트 pt = 슬라이드 pt). 부품 이미지는 assets/photos가 있으면 사진, 없으면 3D 렌더.
원고 · 근거: outputs/presentation/ssd-future-ready-strategy-outline.md, outputs/report/ssd-future-ready-strategy-report.md (v1.6).
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
s = d.slide(1, "배경", "SSD의 다음 수요는 하나로 정해지지 않으며,\n데이터센터 응용마다 SSD에 요구하는 특성이 다릅니다")

# 격자: 왼쪽 열(교훈 · 제품군 이름) + 응용 4열(카드 · 매트릭스 칸). 같은 열은 위아래로 이어 읽는다
LX, LW = MX, 3.70
DG = 0.16
DW = (CW - LW - 0.22 - 3 * DG) / 4
DXS = [MX + LW + 0.22 + i * (DW + DG) for i in range(4)]
MT, RH, RG = 6.62, 0.62, 0.07
CT, CB = 2.32, MT - 0.50
VT = CT + 0.92

# ---- 왼쪽 위: HBM의 교훈 (점유율 슬로프)
rect(s, LX, CT, LW, CB - CT, fill=PALE, shape=RR)
tb(s, LX + 0.22, CT + 0.12, LW - 0.44, 0.38, [("HBM의 교훈", 20, True, BLUE)], anchor=MID)
tb(s, LX + 0.22, CT + 0.52, LW - 0.44, 0.80, [("하나의 수요를 늦게 읽으면", 18, True, INK), ("첫 호황을 놓칩니다", 18, True, INK)], spacing=1.05)
ST = CT + 1.62
sx0, sx1 = LX + 0.86, LX + 1.86


def sy(v):
    return ST + (68 - v) / 55 * 1.25


for (a0, a1, col, lg) in [(50, 62, GRAY_2, "sk-hynix"), (40, 17, BLUE, "samsung")]:
    ln = s.shapes.add_connector(1, *(int(v * 914400) for v in (sx0, sy(a0), sx1, sy(a1))))
    ln.line.color.rgb = col
    ln.line.width = 38100
    rect(s, sx0 - 0.07, sy(a0) - 0.07, 0.14, 0.14, fill=col, shape=MSO_SHAPE.OVAL)
    rect(s, sx1 - 0.07, sy(a1) - 0.07, 0.14, 0.14, fill=col, shape=MSO_SHAPE.OVAL)
    tb(s, sx0 - 0.70, sy(a0) - 0.17 + (-0.12 if a0 == 50 else 0.12), 0.58, 0.34, [(f"{a0}%", 16, False, GRAY)], align=R, anchor=MID)
    tb(s, sx1 + 0.12, sy(a1) - 0.17, 0.66, 0.34, [(f"{a1}%", 18, True, col)], anchor=MID)
    d.fit(s, d.logo(lg), sx1 + 0.80, sy(a1) - 0.13, 0.86, 0.26, align="left")
tb(s, sx0 - 0.45, ST + 1.36, 0.9, 0.28, [("2022", 16, False, GRAY)], align=C)
tb(s, sx1 - 0.45, ST + 1.36, 0.9, 0.28, [("2Q25", 16, False, GRAY)], align=C)
tb(s, LX + 0.22, CB - 0.36, LW - 0.44, 0.30, [("HBM 점유율", 16, False, GRAY)], align=C)

# ---- 응용 카드 4장: 이름 · 하는 일 · 데이터 그래프 · SSD 요구
APPS = [("범용 클라우드", "", "QoS · 테넌트 격리"),
        ("AI 학습", "", "대역 · 체크포인트"),
        ("AI 추론", "KV 캐시 오프로드", "쓰기 내구 (DWPD)"),
        ("에이전트", "", "용량 · TB당 비용")]
for i, (nm, wl, rq) in enumerate(APPS):
    x = DXS[i]
    rect(s, x, CT, DW, CB - CT, fill=WHITE, line=LINE, lw=0.75, shape=RR)
    tb(s, x + 0.20, CT + 0.10, DW - 0.40, 0.42, [(nm, 22, True, INK)], anchor=MID)
    tb(s, x + 0.20, CT + 0.52, DW - 0.40, 0.30, [(wl, 16, False, GRAY)])
    rect(s, x + 0.20, CB - 0.58, DW - 0.40, 0.012, fill=LINE)
    tb(s, x + 0.20, CB - 0.52, DW - 0.40, 0.42, [(rq, 20, True, BLUE)], anchor=MID)
d.fit(s, d.logo("nvidia"), DXS[1] + 0.20, CT + 0.56, 1.15, 0.26, align="left")
_lx = DXS[0] + 0.20
for _lg, _h in (("aws", 0.30), ("microsoft", 0.24), ("google", 0.24)):
    _ox, _oy, _w, _h2 = d.fit(s, d.logo(_lg), _lx, CT + 0.55, 1.05, _h, align="left")
    _lx = _ox + _w + 0.18
x = DXS[3]
d.fit(s, d.logo("meta"), x + 0.20, CT + 0.55, 0.80, 0.24, align="left")
tb(s, x + 1.04, CT + 0.52, 0.70, 0.30, [("Muse", 16, True, INK)])
d.fit(s, d.logo("openai"), x + 1.80, CT + 0.56, 0.80, 0.22, align="left")
tb(s, x + 2.64, CT + 0.52, 0.60, 0.30, [("Dot", 16, True, INK)])

# ① 범용 클라우드: VM 여러 개가 SSD 하나를 나눠 쓴다 + 공유 SSD의 p99 (섞어 쓰기 대 격리)
x = DXS[0]
rect(s, x + 0.02, VT + 0.04, 2.10, 1.14, fill=None, line=GRAY_2, lw=1.25, shape=MSO_SHAPE.CLOUD)
TEN = [GRAY_2, BLUE_T2, GRAY_2, BLUE_T1, GRAY_2, BLUE_T2]
for k, col in enumerate(TEN):
    rect(s, x + 0.46 + (k % 3) * 0.42, VT + 0.32 + (k // 3) * 0.28, 0.36, 0.22, fill=col)
for k in range(3):
    rect(s, x + 0.63 + k * 0.42, VT + 0.86, 0.014, 0.42, fill=GRAY_2)
rect(s, x + 0.36, VT + 1.28, 1.44, 0.30, fill=INK)
tb(s, x + 0.36, VT + 1.28, 1.44, 0.30, [("공유 SSD", 16, True, WHITE)], align=C, anchor=MID)
tb(s, x + 2.14, VT + 1.74, DW - 2.20, 0.28, [("p99 지연", 15, False, GRAY)], align=C)
BBt, BHm = VT + 1.40, 1.08
for k, (v, col, nm, lab) in enumerate([(3.1, GRAY_2, "섞어", "3.1×"), (1.0, BLUE, "격리", "1")]):
    bx = x + 2.30 + k * 0.56
    hh = BHm * v / 3.1
    rect(s, bx, BBt - hh, 0.40, hh, fill=col)
    tb(s, bx - 0.20, BBt - hh - 0.32, 0.80, 0.30, [(lab, 18, True, BLUE if k else INK)], align=C, anchor=MID)
    tb(s, bx - 0.15, BBt + 0.04, 0.70, 0.28, [(nm, 16, k == 1, BLUE if k else GRAY)], align=C)

# ② AI 학습: GPU당 읽기 대역, 데이터가 캐시보다 크면 약 3배
x = DXS[1]
BBt, BHm = VT + 1.48, 1.30
for k, (nm, v, col) in enumerate([("기본", 0.16, GRAY_2), ("멀티모달", 0.49, BLUE)]):
    bx = x + 0.40 + k * 1.05
    hh = BHm * v / 0.49
    rect(s, bx, BBt - hh, 0.62, hh, fill=col)
    tb(s, bx - 0.25, BBt - hh - 0.36, 1.12, 0.34, [(f"{v:.2f}", 20, True, BLUE if k else INK)], align=C, anchor=MID)
    tb(s, bx - 0.30, BBt + 0.04, 1.22, 0.28, [(nm, 16, k == 1, BLUE if k else GRAY)], align=C)
tb(s, x + 2.30, VT + 0.30, DW - 2.40, 0.62, [("×3", 34, True, BLUE)], anchor=MID)
tb(s, x + 2.30, VT + 0.92, DW - 2.30, 0.56, [("GPU당 읽기", 15, False, GRAY), ("GB/s", 15, False, GRAY)], spacing=1.0)

# ③ AI 추론: DWPD (로그 축)
x = DXS[2]
LBW = 1.20
ax0, ax1 = x + 0.20 + LBW, x + DW - 1.00
lo_, hi_ = math.log10(0.3), math.log10(150)


def xd(v):
    return ax0 + (math.log10(v) - lo_) / (hi_ - lo_) * (ax1 - ax0)


for g in (1, 10, 100):
    rect(s, xd(g) - 0.005, VT - 0.02, 0.01, 1.52, fill=LINE)
    tb(s, xd(g) - 0.3, VT + 1.52, 0.6, 0.28, [(str(g), 15, False, GRAY)], align=C)
for k, (nm, v, vmin, col, lab) in enumerate([("QLC 정격", 0.6, None, GRAY_2, "0.6"), ("KV 실측", 3.2, None, GRAY, "3.2"),
                                              ("AI 전용", 120, 50, BLUE, "50~120")]):
    yy = VT + 0.02 + k * 0.50
    tb(s, x + 0.20, yy, LBW - 0.06, 0.40, [(nm, 18, k == 2, BLUE if k == 2 else INK)], anchor=MID)
    rect(s, ax0, yy + 0.04, xd(v) - ax0, 0.32, fill=col)
    if vmin:
        rect(s, xd(vmin) - 0.015, yy, 0.03, 0.40, fill=WHITE)
    tb(s, xd(v) + 0.06, yy, 0.95, 0.40, [(lab, 18, True, BLUE if k == 2 else INK)], anchor=MID)

# ④ 에이전트: 사용자별 VM, 대부분 휴면 + VM 1개의 디스크 대 메모리
x = DXS[3]
NC, NR, TW, TH = 10, 3, 0.24, 0.20
ACT = {(0, 3), (1, 7), (2, 1)}
for r in range(NR):
    for c in range(NC):
        rect(s, x + 0.22 + c * (TW + 0.06), VT - 0.04 + r * (TH + 0.07), TW, TH, fill=BLUE if (r, c) in ACT else LINE)
tb(s, x + 0.20, VT + 0.76, DW - 0.40, 0.30, [[("■", 16, False, BLUE), (" 활성  ", 16, False, GRAY), ("■", 16, False, LINE), (" 휴면 (대부분)", 16, False, GRAY)]], anchor=MID)
for k, (nm, v, col, lab) in enumerate([("VM 디스크", 100, BLUE, "100GB"), ("VM 메모리", 7.75, GRAY_2, "7.75GB")]):
    yy = VT + 1.14 + k * 0.38
    tb(s, x + 0.20, yy, 1.36, 0.32, [(nm, 16, k == 0, BLUE if k == 0 else GRAY)], anchor=MID)
    w = max(0.08, (DW - 2.62) * v / 100)
    rect(s, x + 1.56, yy + 0.05, w, 0.22, fill=col)
    tb(s, x + 1.62 + w, yy, 0.95, 0.32, [(lab, 16, True, BLUE if k == 0 else GRAY)], anchor=MID)

# ---- 매트릭스 머리줄
tb(s, LX, MT - 0.36, LW + 6, 0.32, [[("SSD 제품군  ", 18, True, INK), ("DWPD · 최대 용량", 16, False, GRAY)]], anchor=MID)
tb(s, RIGHT - 6.0, MT - 0.36, 6.0, 0.32, [[("■", 16, False, BLUE), (" 지금 쓰는 곳   ", 16, False, GRAY), ("▢", 16, False, BLUE), (" 신호에 따라 쓰일 곳", 16, False, GRAY)]], align=R, anchor=MID)

# ---- 매트릭스: 제품군(행) × 응용(열)
CLS = [("SLC급", "≤ 3.2TB", 30, 120, "30~120"),
       ("고내구 TLC", "≤ 12.8TB", None, 3, "3"),
       ("고성능 · 범용 TLC", "≤ 15.36TB", None, 1, "1"),
       ("고용량 QLC", "≤ 245TB", 0.3, 0.6, "0.3~0.6")]
DL, DH = math.log10(0.1), math.log10(150)
BX0, BXW = LX + 0.22, LW - 1.30


def xb(v):
    return BX0 + (math.log10(v) - DL) / (DH - DL) * BXW


# 칸: (행, 열) → (문구, 지금=True / 신호=False)
CELL = {(2, 0): ("VM · DB 블록", True), (3, 0): ("객체 · 콜드 데이터", True),
        (2, 1): ("데이터 로딩", True), (1, 1): ("체크포인트", False), (3, 1): ("데이터셋", True),
        (0, 2): ("초고DWPD KV", False), (1, 2): ("KV 쓰기 많을 때", True), (2, 2): ("KV 계층 (CMX)", True), (3, 2): ("읽기 위주 KV", False),
        (3, 3): ("사용자 VM 디스크 · 상태", True), (2, 3): ("기동 버스트", False)}
for r, (nm, cap, vmin, v, lab) in enumerate(CLS):
    y = MT + r * (RH + RG)
    rect(s, LX, y, LW, RH, fill=PALE, shape=RR)
    tb(s, LX + 0.22, y + 0.02, LW - 1.30, 0.34, [(nm, 18, True, INK)], anchor=MID)
    tb(s, LX + LW - 1.30, y + 0.02, 1.14, 0.34, [(cap, 15, False, GRAY)], align=R, anchor=MID)
    rect(s, BX0, y + 0.42, xb(v) - BX0, 0.16, fill=BLUE if r == 0 else (BLUE_T1 if r == 1 else GRAY_2))
    if vmin:
        rect(s, xb(vmin) - 0.015, y + 0.39, 0.03, 0.22, fill=PALE)
    tb(s, xb(v) + 0.06, y + 0.33, 1.0, 0.32, [(lab, 16, True, INK)], anchor=MID)
    for c in range(4):
        x = DXS[c]
        if (r, c) not in CELL:
            rect(s, x, y, DW, RH, fill=None, line=LINE, lw=0.75, shape=RR)
            continue
        txt, now = CELL[(r, c)]
        if now:
            label_box(s, x, y, DW, RH, [(txt, 18, True, WHITE)], fill=BLUE)
        else:
            label_box(s, x, y, DW, RH, [(txt, 18, True, BLUE)], fill=WHITE, line=BLUE, lw=1.25, dash=True)

d.band(s, 9.44, 0.80, "결론", "다양한 데이터센터 응용에 대응하려면, SLC부터 QLC까지 다양한 제품 포트폴리오가 필요합니다")
d.footer(s, "출처: HBM 과제팀 집계 · 공유 SSD p99 FlashBlox(FAST'17) · GPU당 대역 NVIDIA SuperPOD 가이드(환산) · KV 실측 StorageReview(2026-08) · AI 전용 Kioxia · DapuStor · "
            "에이전트 Google Agent Substrate · Muse 관측(제3자) · 제품군 사양 Kioxia FL6 · LC9, Solidigm PS1010 · PS1030")
d.notes(s, "1장입니다. HBM에서 삼성 점유율은 2022년 40퍼센트에서 2025년 2분기 17퍼센트로, SK하이닉스는 50에서 62퍼센트로 갈렸습니다. 하나의 수요를 늦게 읽으면 첫 호황을 놓친다는 교훈입니다. "
        "그래서 SSD의 다음 수요를 하나로 단정하지 않고, 하이퍼스케일러의 데이터센터 응용 네 가지를 SSD에 요구하는 특성으로 비교했습니다. "
        "첫째, 범용 클라우드입니다. 여러 고객의 VM이 서버의 SSD를 나눠 씁니다. Microsoft의 SSD 50만 대를 보면 실제 쓰기는 0.07에서 0.23 DWPD로 범용 TLC 정격 1 DWPD 안에 들어옵니다. 기존 SSD 기술로 대응할 수 있습니다. "
        "다만 한 고객의 쓰기가 같은 SSD를 쓰는 다른 고객의 지연을 키웁니다. Microsoft 워크로드 실험에서 하드웨어로 격리하면 p99 지연이 최대 3.1배 줄었습니다. 멀티테넌트 QoS와 격리는 여전히 중요한 요구입니다. "
        "둘째, AI 학습입니다. NVIDIA SuperPOD 가이드를 GPU당으로 환산하면, 데이터가 캐시보다 큰 멀티모달 학습은 기본 등급보다 약 3배의 스토리지 대역을 요구합니다. 데이터 로딩에는 고성능 TLC가 맞습니다. "
        "405B 모델은 체크포인트 한 번에 약 5.7테라바이트를 쓰고, 다 쓸 때까지 학습이 멈춥니다. 체크포인트 간격이 짧아지면 고내구 TLC가 필요할 수 있어 점선으로 두었습니다. "
        "셋째, AI 추론의 KV 캐시 오프로드입니다. KV 캐시 계층을 실측하면 드라이브당 3.2 DWPD로 QLC 정격 0.6을 크게 넘고, AI 전용 SSD는 50에서 120 DWPD로 나왔습니다. 반대로 읽기 위주라는 측정도 있습니다. "
        "그래서 같은 KV 캐시라도 쓰기량에 따라 SLC급, 고내구 TLC, 고성능 TLC로 갈리고, 읽기 위주라면 QLC도 후보입니다. 고내구라는 요구에도 필요한 DWPD에 따라 SLC부터 QLC까지 여러 답이 있다는 뜻입니다. "
        "넷째, Meta Muse와 OpenAI Dot 같은 에이전트입니다. 사실을 다시 확인해 보니 이 서비스들은 사용자마다 VM을 하나씩 주는 구조이고, 에이전트는 대부분의 시간을 휴면 상태로 보냅니다. 휴면 상태는 압축 스냅샷으로 오브젝트 스토리지에 보관됩니다. "
        "제3자가 Muse VM을 관측한 결과 메모리 7.75기가바이트에 디스크 100기가바이트로, 디스크가 13배 큽니다. 사용자 1억 명이면 할당 기준 10엑사바이트입니다. 그래서 에이전트 VM 자체에는 고DWPD보다 고용량 QLC가 맞습니다. "
        "다만 실제 사용량은 아직 할당보다 훨씬 작고, 에이전트 VM 디스크의 쓰기량을 공개한 측정은 없습니다. 에이전트가 키우는 고DWPD 수요는 VM이 아니라 추론의 KV 캐시 계층에서 나옵니다. 에이전트가 한꺼번에 깨어날 때 디스크 경합이 생긴다는 Google의 설명이 있어, 고성능 TLC는 점선으로 두었습니다. "
        "아래 표는 이것을 제품군으로 정리한 것입니다. 위에서 아래로 요구 DWPD는 낮아지고 최대 용량은 커집니다. 파란 칸은 지금 쓰는 곳, 점선 칸은 신호에 따라 쓰일 곳입니다. 응용마다 필요한 제품군의 조합이 다르고, 하나의 제품으로 모든 응용에 대응할 수 없습니다. "
        "그래서 다양한 데이터센터 응용에 대응하려면 SLC부터 QLC까지 다양한 제품 포트폴리오가 필요합니다. 다만 지금 예측할 수 있는 범위 안의 준비입니다.")

# =============================================================== 2 솔루션
s = d.slide(2, "핵심 기술", "핵심 기술 여섯 가지 중 다섯은 명확한 스펙으로 풀리지만,\nFDP는 고객과 함께 설계해야 제대로 동작합니다")

TECH6 = [("Fault Tolerant", "다이 · 플레인 고장 격리", [None, None, "half", "full"]),
         ("Large Mapping", "매핑 단위 4KB → 8~64KB", [None, None, None, "full"]),
         ("Mixed Media", "pSLC + QLC 네임스페이스 분리", [None, None, None, "full"]),
         ("Multi-Tenant QoS", "네임스페이스 QoS 격리", [None, "half", "full", "full"]),
         ("FDP", "RUH · RG 배치 정책", ["full", "full", "half", "full"]),
         ("Confidential Storage", "RoT · 암호화 · 증명", [None, None, "full", "full"])]

# ---- 왼쪽: 어떤 제품군에 쓰이나 (6 × 4 점)
LPW, NW, PW = 7.70, 3.90, 0.95
PT = 2.34
tb(s, MX, PT, LPW, 0.40, [("어떤 제품군에 쓰이나", 20, True, INK)], anchor=MID)
tb(s, MX, PT + 0.46, NW, 0.30, [[("●", 16, False, BLUE_T1), (" 핵심   ", 16, False, GRAY), ("○", 16, True, BLUE_T1), (" 해당", 16, False, GRAY)]], anchor=MID)
for k, (l1, l2) in enumerate([("SLC급", ""), ("고내구", "TLC"), ("고성능", "TLC"), ("고용량", "QLC")]):
    tb(s, MX + NW + k * PW, PT + 0.42, PW, 0.52, [(l1, 16, False, GRAY)] + ([(l2, 16, False, GRAY)] if l2 else []), align=C, anchor=MID, spacing=1.0)
RT, RH3, RG3 = 3.30, 0.86, 0.08
for i, (nm, sub, fit) in enumerate(TECH6):
    y = RT + i * (RH3 + RG3)
    hot = nm == "FDP"
    rect(s, MX, y, LPW, RH3, fill=TINT if hot else PALE, line=BLUE if hot else None, lw=1.5, shape=RR)
    tb(s, MX + 0.20, y + 0.06, NW - 0.25, 0.40, [(nm, 20, True, BLUE if hot else INK)], anchor=MID)
    tb(s, MX + 0.20, y + 0.46, NW - 0.25, 0.32, [(sub, 16, False, GRAY)], anchor=MID)
    for k, kind in enumerate(fit):
        cx, cy, dd = MX + NW + k * PW + PW / 2, y + RH3 / 2, 0.34
        if kind == "full":
            rect(s, cx - dd / 2, cy - dd / 2, dd, dd, fill=BLUE if hot else BLUE_T1, shape=MSO_SHAPE.OVAL)
        elif kind == "half":
            rect(s, cx - dd / 2, cy - dd / 2, dd, dd, fill=WHITE, line=BLUE_T1, lw=2.0, shape=MSO_SHAPE.OVAL)

# ---- 오른쪽: 고객과 어떻게 협력하나 (결합도 × 스펙만으로 안 닫히는 정도, 구역 산점도)
GX0 = MX + LPW + 0.45
tb(s, GX0, PT, RIGHT - GX0, 0.40, [("고객과 어떻게 협력하나", 20, True, INK)], anchor=MID)
PX0, PX1 = GX0 + 0.30, RIGHT - 0.05
PY0, PY1 = 3.30, 8.40


def SX(v):
    return PX0 + (v + 0.3) / 2.7 * (PX1 - PX0)


def SY(v):
    return PY1 - (v + 0.3) / 2.9 * (PY1 - PY0)


ZX, ZY = 1.35, 1.45      # 공동 설계 구역 경계 · 스펙 협력 구역 경계
rect(s, PX0, PY0, PX1 - PX0, PY1 - PY0, fill=WHITE, line=LINE, lw=0.75)
rect(s, SX(0.5), SY(ZY), PX1 - SX(0.5), PY1 - SY(ZY), fill=PALE)
rect(s, SX(ZX), PY0, PX1 - SX(ZX), SY(ZY) - PY0, fill=TINT, line=BLUE, lw=2.0)
tb(s, SX(ZX) + 0.16, PY0 + 0.10, 3.0, 0.36, [("공동 설계 필수", 18, True, BLUE)], anchor=MID)
tb(s, SX(0.5) + 0.16, SY(ZY) + 0.10, 3.0, 0.36, [("스펙으로 협력", 18, True, GRAY)], anchor=MID)
tb(s, PX0 + 0.12, SY(ZY) + 0.10, 2.0, 0.36, [("SSD 안에서", 18, True, GRAY)], anchor=MID)
# 축
rect(s, PX0, PY1 - 0.01, PX1 - PX0, 0.03, fill=GRAY)
rect(s, PX0 - 0.01, PY0, 0.03, PY1 - PY0, fill=GRAY)
tb(s, PX0, PY1 + 0.06, PX1 - PX0, 0.34, [("고객 시스템과 함께 설계되는 정도  →", 16, True, GRAY)], align=R, anchor=MID)
tb(s, PX0 - 0.30, PY0 - 0.42, 4.6, 0.34, [("↑  스펙만으로는 안 닫힘", 16, True, GRAY)], anchor=MID)


def dot(v, w, name, side="r", hot=False):
    dd = 0.60 if hot else 0.36
    cx, cy = SX(v), SY(w)
    rect(s, cx - dd / 2, cy - dd / 2, dd, dd, fill=BLUE if hot else GRAY_2, shape=MSO_SHAPE.OVAL)
    lw_ = 3.2
    if side == "r":
        tb(s, cx + dd / 2 + 0.10, cy - 0.20, lw_, 0.40, [(name, 18, True, INK)], anchor=MID)
    elif side == "l":
        tb(s, cx - dd / 2 - 0.10 - lw_, cy - 0.20, lw_, 0.40, [(name, 18, True, INK)], align=R, anchor=MID)
    elif side == "a":   # 위, 일반
        tb(s, cx - 2.2, cy - dd / 2 - 0.44, 2.6, 0.40, [(name, 18, True, INK)], align=R, anchor=MID)
    else:   # 위, 강조
        tb(s, cx - 1.0, cy - dd / 2 - 0.46, 2.0, 0.42, [(name, 24, True, BLUE)], align=C, anchor=MID)


dot(0.0, 0.0, "Fault Tolerant")
dot(0.90, 1.08, "Large Mapping")
dot(1.05, 0.80, "Multi-Tenant QoS")
dot(2.0, 0.95, "Mixed Media", "a")
dot(2.0, 0.0, "Confidential Storage", "l")
dot(2.12, 1.98, "FDP", "u", hot=True)
# 공동 설계 구역 아래쪽: CacheLib WAF (SSD 혼자 대 고객 SW가 수명 표시)
fx0, zb = SX(ZX) + 0.16, SY(ZY)
tb(s, fx0, zb - 1.12, 2.4, 0.28, [("CacheLib WAF", 15, False, GRAY)], anchor=MID)
for k, (lab, v, col) in enumerate([("혼자", 3.22, GRAY_2), ("함께", 1.03, BLUE)]):
    yy = zb - 0.82 + k * 0.36
    tb(s, fx0, yy, 0.70, 0.32, [(lab, 16, k == 1, BLUE if k else GRAY)], anchor=MID)
    w = 1.15 * v / 3.22
    rect(s, fx0 + 0.70, yy + 0.07, w, 0.20, fill=col)
    tb(s, fx0 + 0.76 + w, yy, 0.80, 0.32, [(f"{v:.2f}", 16, True, BLUE if k else GRAY)], anchor=MID)

d.band(s, 9.40, 0.80, "결론", "스펙을 정확히 받든 함께 설계하든, 핵심 기술을 제대로 확보하려면 고객과의 협력이 필수입니다", size=23)
d.footer(s, "출처: WAF 3.22 → 1.03(CacheLib, Meta · Samsung EuroSys'25) · 같은 FDP 지원 장치에서도 결과가 갈림(WARP FAST'26) · RUH · RG 출하 시 고정(NVMe FDP) · "
            "제품군 적합도와 협력 깊이는 과제팀 판단(위키 ssd-core-technologies-customer-collaboration)")
d.notes(s, "2장입니다. 1장의 제품 포트폴리오를 받치는 핵심 기술 여섯 가지를, 왼쪽에는 어떤 제품군에 쓰이는지, 오른쪽에는 고객과 어떻게 협력해야 하는지로 정리했습니다. "
        "왼쪽부터 보겠습니다. Fault Tolerant는 다이와 플레인 단위로 고장을 격리합니다. 같은 폼팩터에서 245테라바이트는 다이 1,024개, 512테라바이트는 약 2,133개라 고용량일수록 필요합니다. "
        "Large Mapping은 매핑 단위를 4킬로바이트에서 8에서 64킬로바이트로 키웁니다. 245테라바이트 드라이브의 매핑 DRAM이 약 245기가바이트에서 15기가바이트로 줄어드는 대신, 매핑 단위보다 작은 쓰기는 최대 16배를 다시 씁니다. "
        "Mixed Media는 pSLC와 QLC를 별도 네임스페이스로 나눕니다. 작은 쓰기를 모아 순차로 내리면 4킬로바이트 쓰기의 WAF가 70을 넘던 것이 1.02까지 내려간 사례가 있고, 고객이 요구한 pSLC 비율은 QLC 용량의 0.5에서 2퍼센트입니다. "
        "Multi-Tenant QoS는 네임스페이스 단위로 테넌트를 격리합니다. 이웃 테넌트의 쓰기만으로 WAF가 1.28에서 3.0으로 오르고, 하드웨어로 격리하면 p99 지연이 최대 3.1배 줄었습니다. "
        "FDP는 배치 핸들로 수명이 같은 데이터를 모읍니다. SLC급, 고내구 TLC, 고용량 QLC에 모두 걸려 가장 넓습니다. Confidential Storage는 RoT, 암호화, 증명으로 기밀 VM의 디스크를 지킵니다. Meta는 Meta도 접근하지 못하는 Muse 기밀 VM을 예고했습니다. "
        "고용량 QLC에는 여섯 가지 중 다섯 가지가 걸립니다. "
        "오른쪽은 협력의 깊이입니다. 가로축은 고객 시스템과 함께 설계돼야 하는 정도, 세로축은 명확한 스펙만으로 최적화가 닫히는지입니다. "
        "Mixed Media와 Confidential Storage는 고객 시스템에 깊이 들어갑니다. 그러나 Mixed Media의 인터페이스는 표준 네임스페이스이고, pSLC 비율은 출하 시 정하는 값이며 고객이 이미 수치로 요구합니다. 네임스페이스 간 QoS도 목표 수치로 사내에서 검증할 수 있습니다. "
        "Confidential Storage는 Caliptra, SPDM, TDISP, OCP L.O.C.K. 같은 표준이 인터페이스와 동작을 정하고, 삼성은 L.O.C.K.의 공저자입니다. Large Mapping과 QoS도 고객의 쓰기 크기와 지연 목표를 스펙으로 받으면 됩니다. 이 다섯은 고객 요구를 정확한 스펙으로 받는 협력이면 충분합니다. "
        "FDP는 다릅니다. 효과는 고객 소프트웨어가 데이터 수명을 얼마나 잘 나누는지와, SSD의 RU 크기와 GC 정책이 맞물릴 때만 납니다. FAST'26의 WARP 연구에서는 같은 FDP 지원 드라이브, 같은 워크로드에서 한 장치는 WAF가 1 근처를 지켰고 다른 장치는 무너졌습니다. "
        "분류가 어긋나 사용자 데이터의 99퍼센트가 한 핸들로 몰리면 효과가 사라지고, 한 핸들의 무효화가 다른 핸들의 WAF까지 키우기도 합니다. 게다가 RUH와 RG 구성은 출하 시 고정되므로, 고객 워크로드를 보고 미리 함께 정해야 합니다. "
        "CacheLib이 WAF를 3.22에서 1.03으로 낮춘 결과도 Meta와 삼성의 공동 연구였습니다. 그래서 FDP는 고객과 함께 설계해야 제대로 동작합니다. "
        "정리하면, 스펙을 정확히 받든 함께 설계하든, 핵심 기술을 제대로 확보하려면 고객과의 협력이 필수입니다. 협력의 깊이 판단은 과제팀의 판단이고, 근거는 위키에 정리했습니다.")

# =============================================================== 3 당위성
s = d.slide(3, "당위성", "해법의 범위는 NAND에서 SSD로 넓어져 왔고,\n새로 나타난 과제는 고객 시스템까지 넓어져야 풀립니다")

# ---- 왼쪽 위: 셀 수명 P/E 대표값 (로그 축)
tb(s, MX, 2.42, 5.4, 0.40, [[("▼ 셀이 견디는 쓰기  ", 20, True, GRAY), ("P/E", 16, False, GRAY)]], anchor=MID)
pe = [("SLC", 100000, "10만"), ("MLC", 10000, "1만"), ("TLC", 3000, "3천"), ("QLC", 1000, "1천")]
PB, PH = 5.30, 1.95
for k, (nm, v, lab) in enumerate(pe):
    h = (math.log10(v) - 2) / 3 * PH
    bx = MX + 0.30 + k * 1.22
    rect(s, bx, PB - h, 0.80, h, fill=GRAY if k == 0 else GRAY_2)
    tb(s, bx - 0.2, PB - h - 0.38, 1.20, 0.36, [(lab, 18, True, INK)], align=C)
    tb(s, bx - 0.2, PB + 0.02, 1.20, 0.32, [(nm, 18, False, GRAY)], align=C)
tb(s, MX + 2.30, 2.96, 3.0, 0.50, [("약 100배 ↓", 26, True, GRAY)], align=C, anchor=MID)

# ---- 가운데 위: 고객 캐시 계층의 쓰기 (DWPD, 로그 축)
cx0 = MX + 5.95
tb(s, cx0, 2.42, 6.0, 0.40, [[("▲ 고객 캐시가 쓰는 양  ", 20, True, BLUE), ("DWPD", 16, False, GRAY)]], anchor=MID)
LB = 2.95
qx0, qx1 = cx0 + LB, cx0 + 5.55
qlo, qhi = math.log10(0.2), math.log10(12)


def xq(v):
    return qx0 + (math.log10(v) - qlo) / (qhi - qlo) * (qx1 - qx0)


for g in (1, 10):
    rect(s, xq(g) - 0.005, 2.96, 0.01, 2.22, fill=LINE)
    tb(s, xq(g) - 0.3, 5.18, 0.6, 0.28, [(str(g), 16, False, GRAY)], align=C)
cust = [("QLC 정격", 0.6, GRAY_2, "0.6"),
        ("Meta 플래시 캐시", 3.0, GRAY, "3"),
        ("AI KV 캐시", 3.2, GRAY, "3.2"),
        ("Meta 스토리지 캐시", 7.2, BLUE, "7.2")]
for i, (nm, v, col, lab) in enumerate(cust):
    yy = 3.02 + i * 0.54
    tb(s, cx0, yy, LB - 0.08, 0.44, [(nm, 18, i == 3, BLUE if i == 3 else INK)], anchor=MID)
    rect(s, qx0, yy + 0.06, xq(v) - qx0, 0.32, fill=col)
    tb(s, xq(v) + 0.06, yy, 0.70, 0.44, [(lab, 18, True, BLUE if i == 3 else INK)], anchor=MID)

BOT = 9.40
steps = [  # x, w, top, fill, step name, years, metric, metric sub, state chip
    (MX, 5.55, 6.20, PALE, "NAND → SSD", "1991~", "ECC 약 60배", "셀 오류 약 100만 배를 흡수", "완결"),
    (MX + 5.75, 5.90, 5.62, PALE, "SSD 혼자 최적화", "2014~2019", "WAF ≈ 3", "수명을 추정만 했다", "부분 성공"),
    (MX + 11.85, 6.57, 2.42, BLUE, "고객 시스템과 공동 설계", "2022~", "WAF 3.22 → 1.03", "수명은 고객 시스템만 안다", "다음 칸"),
]
for i, (x, w, top, fill, nm, yr, met, msub, st) in enumerate(steps):
    hot = fill == BLUE
    rect(s, x, top, w, BOT - top, fill=fill, shape=RR)
    ink, sub = (WHITE, BLUE_T2) if hot else (INK, GRAY)
    tb(s, x + 0.30, top + 0.12, w - 2.1, 0.86, [(nm, 24, True, ink), (yr, 18, False, sub)], spacing=1.0)
    chip(s, x + w - 1.70, top + 0.20, 1.40, 0.44, st, fill=WHITE if hot else (GRAY_2 if i == 0 else WHITE),
         color=BLUE if hot else (WHITE if i == 0 else GRAY), size=18, line=None if (hot or i == 0) else GRAY_2)
    iy = top + 1.02
    if i == 0:
        d.fit(s, d.part("nand"), x + 0.40, iy, 1.10, 0.74)
        d.arrow_r(s, x + 1.66, iy + 0.25, 0.46, 0.24)
        d.fit(s, d.part("ssd"), x + 2.28, iy, 2.20, 0.74)
        my = iy + 0.80
    elif i == 1:
        d.fit(s, d.part("ssd"), x + 0.40, iy, 2.40, 0.86)
        my = iy + 0.98
    else:
        d.fit(s, d.part("server"), x + 0.40, iy, 1.90, 1.05)
        d.fit(s, d.part("ssd"), x + 2.50, iy + 0.22, 1.80, 0.70)
        my = iy + 1.12
    tb(s, x + 0.30, my, w - 0.6, 0.70, [(met, 40 if hot else 36, True, WHITE if hot else (GRAY if i == 1 else INK))], anchor=MID)
    tb(s, x + 0.30, my + 0.70, w - 0.6, 0.38, [(msub, 18, False, WHITE if hot else sub)])

# ---- 3칸 안: 고객은 이미 자기 SW로 쓰기를 줄인다 (Meta CacheLib)
x, w = steps[2][0], steps[2][1]
MY0 = 6.02
rect(s, x + 0.26, MY0, w - 0.52, 3.14, fill=WHITE, shape=RR)
d.fit(s, d.logo("meta"), x + 0.48, MY0 + 0.18, 1.20, 0.30, align="left")
tb(s, x + 1.80, MY0 + 0.12, 2.4, 0.42, [("CacheLib", 20, True, INK)], anchor=MID)
mb0, mbw = x + 0.48, 2.55
for k, (lab, v, col, tcol) in enumerate([("쓰기 수요", 1.5, GRAY_2, WHITE), ("수명 예산", 1.0, BLUE_T2, INK)]):
    yy = MY0 + 0.92 + k * 0.72
    rect(s, mb0, yy, mbw * v / 1.5, 0.54, fill=col)
    tb(s, mb0 + 0.12, yy, 1.8, 0.54, [(lab, 18, True, tcol)], anchor=MID)
    tb(s, mb0 + mbw * v / 1.5 + 0.08, yy, 1.0, 0.54, [(f"{int(v * 100)}%", 22, True, INK)], anchor=MID)
rect(s, x + 4.05, MY0 + 0.80, 0.012, 2.00, fill=LINE)
tb(s, x + 4.18, MY0 + 0.92, w - 4.44, 1.00, [("-44%", 46, True, BLUE)], anchor=MID)
tb(s, x + 4.18, MY0 + 1.94, w - 4.44, 0.40, [("고객 SW로", 20, True, BLUE)], anchor=MID)

d.chevron(s, MX + 5.57, 7.60, w=0.16, h=0.50)
d.chevron(s, MX + 11.67, 7.10, w=0.16, h=0.50)

d.band(s, 9.60, 0.80, "결론", "사양서만으로는 2칸에 머뭅니다. 3칸은 고객 시스템 안에서 함께 설계해야 닿습니다")
d.footer(s, "출처: 해법 사다리 원장(JESD218 · LDPC · FDP TP4146 · CacheLib + FDP 3.22 → 1.03, EuroSys'25) · 캐시 DWPD: Kangaroo 예산 3 · Baleen 목표 7.2 · "
            "StorageReview KV 실측 3.2 · CacheLib 150% · -44%(OSDI'20) · 기준(예산 · 실측 · 목표)이 서로 다름 · 부품 이미지는 3D 렌더")
d.notes(s, "3장입니다. 왜 고객 시스템까지 가야 하는지 데이터로 말씀드리겠습니다. 왼쪽 위는 셀이 견디는 쓰기 횟수입니다. SLC 10만 회에서 QLC 1천 회로 약 100배 줄었습니다. "
        "그 옆은 고객의 캐시 계층이 실제로 쓰는 양입니다. QLC 정격은 하루 0.6회인데, Meta의 플래시 캐시는 하루 3회를 쓰기 예산으로 잡고, Meta 벌크 스토리지 캐시 연구는 7.2회를 목표로 둡니다. AI KV 캐시 계층을 실측하면 드라이브당 3.2회였습니다. 기준은 예산, 실측, 목표로 서로 다르지만 방향은 같습니다. "
        "고객의 쓰기는 커지는데 셀 수명은 줄면, 보상은 늘 한 계층 위로 올라갔습니다. 첫 계단은 NAND에서 SSD입니다. 셀 오류율이 약 100만 배 나빠졌지만 컨트롤러 ECC가 약 60배 강해지면서 SSD 안에서 완결됐습니다. "
        "둘째 계단은 SSD 혼자 하는 최적화입니다. 2014년부터 2019년까지 SSD가 워크로드를 추정했지만 실제 워크로드에서 WAF는 약 3에 머물렀습니다. 데이터가 언제 지워지는지는 호스트만 알기 때문입니다. "
        "셋째 계단이 고객 시스템과의 공동 설계입니다. 호스트가 데이터 수명을 알려 주는 FDP로 CacheLib은 WAF를 3.22에서 1.03으로 낮췄습니다. "
        "고객은 이미 자기 시스템에서 이 문제와 싸우고 있습니다. Meta CacheLib 논문에 따르면, 캐시 쓰기를 그대로 두면 SSD 수명 예산의 1.5배가 됩니다. 그래서 Meta는 플래시를 50퍼센트 더 두고, 머신러닝 수용 정책이라는 자기 소프트웨어로 플래시 기록량을 44퍼센트 줄였습니다. "
        "해법이 이미 고객 소프트웨어 안에 있다는 뜻입니다. 사양서를 받아 SSD를 잘 만드는 방식은 둘째 계단에 머뭅니다. 셋째 계단은 고객 시스템 안에서 함께 설계해야 닿습니다.")

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
label_box(s, C1, NOW_Y + 0.44, W1, 0.60, [("Multi-Year Deal (MYD)", 20, True, WHITE)], fill=GRAY_2)
tb(s, C1, NOW_Y + 1.10, W1, 0.36, [("수량과 가격만 약속합니다", 18, False, GRAY)], align=C)
d.down(s, C1 + W1 / 2, NEXT_Y - 0.32)
tag(s, C1, NEXT_Y, "앞으로: 전략적 계약", True)
SW1 = W1 - 1.05
for i, (t, st) in enumerate([("자본 연계 (선택)", "opt"), ("운영 통합", "t1"), ("공동 설계 · 최적화", "hot"), ("MYD (다년 물량)", "base")]):
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
d.panel_head(s, C2, W2, 2, "사람: 고객 안에 상주 (FDE)")
d.img(s, d.logo("palantir"), C2, BENCH_Y + 0.01, h=0.34)
tb(s, C2 + 0.44, BENCH_Y - 0.02, W2 - 0.44, 0.38, [[("Palantir FDE", 18, True, INK), ("   Anthropic · OpenAI도 채택", 16, False, GRAY)]], anchor=MID)
tag(s, C2, NOW_Y, "지금", False)
BY = NOW_Y + 0.44
rect(s, C2, BY, 1.70, 0.60, fill=WHITE, line=LINE, shape=RR)
d.fit(s, d.logo("samsung"), C2 + 0.15, BY + 0.13, 1.40, 0.34)
label_box(s, C2 + W2 - 1.70, BY, 1.70, 0.60, [("고객", 20, True, INK)], fill=WHITE, line=LINE)
rect(s, C2 + 1.78, BY + 0.29, W2 - 3.56, 0.03, fill=GRAY_2)
rect(s, C2 + W2 / 2 - 0.22, BY + 0.02, 0.44, 0.56, fill=WHITE, line=GRAY_2, lw=1.25, shape=MSO_SHAPE.FOLDED_CORNER)
tb(s, C2, NOW_Y + 1.10, W2, 0.36, [("스펙 문서로 명시된 요구만 오갑니다", 18, False, GRAY)], align=C)
d.down(s, C2 + W2 / 2, NEXT_Y - 0.32)
tag(s, C2, NEXT_Y, "앞으로: 고객 상주 협업의 세 가지 핵심 업무", True)
BX0, BY0, BW = C2, NEXT_Y + 0.44, W2
BH = 8.76 - BY0
rect(s, BX0, BY0, BW, BH, fill=TINT, line=BLUE, lw=1.5, shape=RR)
tb(s, BX0 + BW - 3.3, BY0 + 0.06, 3.1, 0.32, [("고객 AI 데이터센터 안에서", 16, True, BLUE)], align=R, anchor=MID)
KG = 0.30
KW = (BW - 0.36 - 2 * KG) / 3
KY, KH = BY0 + 0.44, BH - 0.58
KX = [BX0 + 0.18 + k * (KW + KG) for k in range(3)]
for k, (obj, verb) in enumerate([("고객 워크로드", "측정 · 분석"), ("호스트 SW 스택", "최적화 · 평가"), ("차세대 제품", "기술 교류")]):
    x = KX[k]
    rect(s, x, KY, KW, KH, fill=WHITE, line=LINE, lw=0.75, shape=RR)
    rect(s, x + 0.12, KY + 0.12, 0.36, 0.36, fill=BLUE, shape=MSO_SHAPE.OVAL)
    tb(s, x + 0.12, KY + 0.12, 0.36, 0.36, [(str(k + 1), 16, True, WHITE)], align=C, anchor=MID)
    tb(s, x + 0.08, KY + KH - 0.78, KW - 0.16, 0.72, [(obj, 16, False, GRAY), (verb, 19, True, BLUE)], align=C, anchor=MID, spacing=1.0)
    if k < 2:
        d.chevron(s, x + KW + 0.07, KY + KH / 2 - 0.25, w=0.16, h=0.50, fill=BLUE_T1)
PY, PH = KY + 0.54, KH - 1.36          # 그림 영역
# ① 측정 · 분석: 쓰기 크기 분포 막대 + 돋보기
x = KX[0]
hb = [0.35, 0.80, 0.55, 0.95, 0.30, 0.60]
bx0, bw_ = x + 0.30, 0.17
base = PY + PH - 0.04
rect(s, bx0 - 0.06, base, 6 * (bw_ + 0.06) + 0.06, 0.02, fill=GRAY_2)
for i, hh in enumerate(hb):
    rect(s, bx0 + i * (bw_ + 0.06), base - hh * (PH - 0.10), bw_, hh * (PH - 0.10), fill=BLUE_T1 if i in (1, 3) else GRAY_2)
mg = 0.56
mx_, my_ = x + KW - 0.98, PY + 0.02
rect(s, mx_, my_, mg, mg, fill=None, line=BLUE, lw=3.0, shape=MSO_SHAPE.OVAL)
hd = rect(s, mx_ + mg - 0.10, my_ + mg - 0.04, 0.34, 0.09, fill=BLUE)
hd.rotation = 45
# ② 최적화 · 평가: 호스트 SW 스택(층) + 공동 최적화 화살표
x = KX[1]
LAY = [("KV 캐시", True), ("커널", False), ("SSD", True)]
lw_, lh_ = KW - 0.78, (PH - 0.12) / 3
for i, (nm, hot) in enumerate(LAY):
    ly = PY + i * (lh_ + 0.06)
    label_box(s, x + 0.20, ly, lw_, lh_, [(nm, 16, True, WHITE if hot else GRAY)], fill=BLUE if hot else PALE)
ax = x + 0.20 + lw_ + 0.10
rect(s, ax, PY + lh_ * 0.5, 0.32, 2 * (lh_ + 0.06), fill=BLUE_T2, shape=MSO_SHAPE.UP_DOWN_ARROW)
# ③ 기술 교류: 엔지니어 둘 + 말풍선 + 차세대 SSD
x = KX[2]
pw_ = d.person(s, x + 0.18, PY + 0.36, 0.66, BLUE)
d.person(s, x + KW - 0.18 - pw_, PY + 0.36, 0.66, GRAY_2)
bub = rect(s, x + KW / 2 - 0.42, PY - 0.02, 0.84, 0.40, fill=WHITE, line=BLUE_T1, lw=1.5, shape=MSO_SHAPE.ROUNDED_RECTANGULAR_CALLOUT)
tb(s, x + KW / 2 - 0.42, PY - 0.02, 0.84, 0.34, [("· · ·", 16, True, BLUE)], align=C, anchor=MID)
d.fit(s, d.part("ssd"), x + KW / 2 - 0.34, PY + 0.62, 0.68, 0.40)
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
          ("커널 · I/O", "일부", "part", "io_uring · NIXL", BLUE),
          ("SSD FW", "강점", "on", "FDP · QoS · destage", BLUE_T1),
          ("NAND", "강점", "on", "", BLUE_T2)]
RY3, RP3, RH3 = NOW_Y + 0.44, 0.56, 0.48
for r, (nm, now_t, st, need, col) in enumerate(layers):
    yy = RY3 + r * RP3
    gap = r < 3
    tb(s, C3, yy, LW3 - 0.08, RH3, [(nm, 18, True, BLUE if gap else GRAY)], anchor=MID)
    if st == "on":
        label_box(s, cxn, yy, CWN, RH3, [(now_t, 18, True, WHITE)], fill=GRAY_2)
    elif st == "part":
        label_box(s, cxn, yy, CWN, RH3, [(now_t, 18, True, GRAY)], fill=PALE)
    else:
        label_box(s, cxn, yy, CWN, RH3, [(now_t, 18, True, GRAY)], fill=WHITE, line=GRAY_2, dash=True)
    if need:
        label_box(s, cxf, yy, CWF, RH3, [(need, 17, True, WHITE)], fill=col)
    else:
        rect(s, cxf, yy, CWF, RH3, fill=col, shape=RR)
# 화두: CRM의 범위가 엔지니어까지 넓어진다 (관계도)
QY = RY3 + 4 * RP3 + RH3 + 0.12
QH = 8.76 - QY
rect(s, C3, QY, W3, QH, fill=WHITE, line=BLUE, lw=1.5, shape=RR)
label_box(s, C3 + 0.18, QY + 0.12, 0.80, 0.38, [("화두", 17, True, WHITE)], fill=BLUE)
tb(s, C3 + 1.08, QY + 0.10, W3 - 1.2, 0.42, [[("고객 관계(CRM)를 ", 18, True, INK), ("엔지니어까지", 18, True, BLUE)]], anchor=MID)
LCX, RCX, CHW, CHH2 = C3 + 0.18, C3 + 2.52, 1.00, 0.34
tb(s, LCX, QY + 0.56, CHW, 0.26, [("삼성", 15, True, GRAY)], align=C, anchor=MID)
tb(s, RCX, QY + 0.56, CHW, 0.26, [("고객", 15, True, GRAY)], align=C, anchor=MID)
CRM = [("경영진", "경영진", False), ("영업", "구매", False), ("엔지니어", "엔지니어", True)]
RYS = [QY + 0.86 + i * 0.40 for i in range(3)]
for i, (l_, r_, hot) in enumerate(CRM):
    yy = RYS[i]
    label_box(s, LCX, yy, CHW, CHH2, [(l_, 15, True, WHITE if hot else GRAY)], fill=BLUE if hot else PALE)
    label_box(s, RCX, yy, CHW, CHH2, [(r_, 15, True, WHITE if hot else GRAY)], fill=BLUE if hot else PALE)
    rect(s, LCX + CHW + 0.04, yy + CHH2 / 2 - (0.03 if hot else 0.01), RCX - LCX - CHW - 0.08, 0.06 if hot else 0.02, fill=BLUE if hot else GRAY_2)
label_box(s, LCX + CHW + 0.04, RYS[2] + 0.03, RCX - LCX - CHW - 0.08, 0.28, [("언어 · 문화", 15, True, BLUE)], fill=WHITE, line=BLUE, lw=1.0)
# 범위 괄호: 지금(경영진 · 영업) 대 앞으로(엔지니어까지)
bx1 = RCX + CHW + 0.16
for (y0_, y1_, col, lab, off) in [(RYS[0], RYS[1] + CHH2, GRAY_2, "지금", 0.0), (RYS[0], RYS[2] + CHH2, BLUE, "앞으로", 0.66)]:
    xx = bx1 + off
    rect(s, xx, y0_, 0.04, y1_ - y0_, fill=col)
    rect(s, xx - 0.10, y0_, 0.12, 0.04, fill=col)
    rect(s, xx - 0.10, y1_ - 0.04, 0.12, 0.04, fill=col)
    tb(s, xx + 0.08, (y0_ + y1_) / 2 - 0.15, 0.80, 0.30, [(lab, 15, True, col)], anchor=MID)

# ---- 열 캡션
CAP_Y = 8.86
tb(s, C1, CAP_Y, W1, 0.50, [("MYD 위에 기술 협력을 쌓습니다", 20, True, BLUE)], anchor=MID)
tb(s, C2, CAP_Y, W2, 0.50, [("고객 안에서 요구를 찾고 수요를 함께 만듭니다", 20, True, BLUE)], anchor=MID)
tb(s, C3, CAP_Y, W3, 0.50, [("기술과 함께, 엔지니어의 고객 관계", 20, True, BLUE)], anchor=MID)

d.band(s, 9.60, 0.80, "결론", "실패할 수도 있는 기술에 투자하는 것이, 불확실한 미래에 실패하지 않는 불변 전략입니다", size=24)
d.footer(s, "벤치마크: Micron ↔ Anthropic 전략적 계약(2026-06-22) · Palantir · OpenAI FDE(고객 상주, 명시적 대 실제 요구) · LMCache FDP 머지(PR #4016, 2026-08) · 로고는 식별 표시")
d.notes(s, "4장 실행 전략입니다. 2장에서 고른 FDP의 요구, 곧 데이터가 언제 지워지는지와 그것이 SSD의 배치 정책과 어떻게 맞물리는지는 고객 시스템 안에 있습니다. 그래서 지금까지와 다른 방식이 필요하고, 그 방식을 FDP에 집중합니다. 나머지 다섯 기술은 고객 요구를 정확한 스펙으로 받는 지금 방식을 다듬어 준비합니다. "
        "첫째, 계약입니다. 지금의 Multi-Year Deal, MYD는 여러 해의 수량과 가격을 약속합니다. Micron은 Anthropic과의 전략적 계약에서 다년 공급 위에 공동 설계와 운영 통합을 묶었습니다. 우리도 MYD 위에 기술 협력을 쌓겠습니다. "
        "둘째, 사람입니다. 스펙 문서로는 명시된 요구만 옵니다. Palantir와 OpenAI의 FDE처럼 삼성 Pod가 고객 AI 데이터센터 안에서 고객 엔지니어와 함께 일합니다. 핵심 업무는 세 가지입니다. "
        "하나, 고객 워크로드 측정과 분석입니다. 고객 트레이스로 쓰기 크기와 데이터 수명을 재서, 고객이 말한 요구와 실제 요구의 차이를 찾습니다. "
        "둘, 호스트 소프트웨어 스택의 최적화와 평가입니다. 고객 엔지니어와 함께 KV 캐시 소프트웨어와 SSD를 맞물려 최적화하고, 고객 환경에서 WAF와 꼬리 지연, 그리고 토큰당 비용과 GPU 가동률로 효과를 평가합니다. LMCache에 FDP 배치를 머지한 것이 선례입니다. "
        "셋, 차세대 제품을 위한 기술 교류입니다. 현장에서 증명한 것을 고객 엔지니어와 함께 다음 제품의 사양과 고객 RFQ, OCP 요구로 굳힙니다. 이렇게 고객 안에서 요구를 찾고, 수요를 함께 만듭니다. "
        "셋째, 역량입니다. NAND와 SSD 펌웨어는 강점이고, 비어 있는 곳은 그 위입니다. KV 캐시 소프트웨어는 LMCache에서 시작했고 Dynamo와 Mooncake에는 아직 기여가 없습니다. 고객의 지표인 토큰당 비용과 GPU 가동률로 말하는 사람이 필요합니다. "
        "마지막으로 화두를 하나 드리겠습니다. 지금까지 고객 관계 관리, CRM은 경영진과 경영진, 영업과 구매 사이의 일이었습니다. 앞으로는 엔지니어와 엔지니어 사이까지 넓어져야 합니다. 고객 엔지니어가 신뢰하는 상대는 같은 문제를 같은 언어로 푸는 엔지니어이고, 고객과 국가마다 다른 언어와 문화를 이해하는 것도 그 관계의 일부입니다. 엔지니어 수준의 고객 관계를 우리가 맡을 준비가 되어 있는지 함께 생각해 보면 좋겠습니다. "
        "첫 90일에는 다섯 가지를 하겠습니다. 전략 고객 한두 곳을 정해 FDP 공동 설계 의제를 맞추고, Co-Design Pod를 꾸리고, 시스템 소프트웨어 전문가 채용을 시작하고, 고객 KV 트레이스로 WAF를 실측하고, 신호 대시보드를 돌리겠습니다. "
        "마지막으로, 실패할 수도 있는 기술에 투자하는 것이 불확실한 미래에 실패하지 않는 불변 전략입니다. 지금 예측할 수 있는 범위 안에서 최선을 다하고, 신호가 바뀌면 판단을 고치겠습니다.")

d.save(os.path.abspath(OUT))
print(f"생성 완료: {os.path.abspath(OUT)} ({len(d.prs.slides._sldIdLst)}장)")
