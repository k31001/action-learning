"""불확실성에 대응하는 전체 최적화 체계: 3-C 전략 한 장, 시각화 시안 3종 (v1.0, 2026-10-13).

같은 내용(3대 전략 행 × 3-C 열)을 세 가지 시각 언어로 그린다. 사용자가 하나를 고른다.
  시안 A 도해형 매트릭스   칸마다 작동 원리를 도형 · 부품 이미지로 그린 미니 도해 + 키워드
  시안 B 아이콘 키워드형   왼쪽 "왜"(예측 불확실성 원뿔 → 자원 · 기술 · 고객 삼각 체계) + 아이콘 카드 매트릭스
  시안 C 3-C 기둥 구조형   지붕(전체 최적화 체계) · 기둥(C1 · C2 · C3) · 토대(수요 예측) 은유, 전략은 기둥을 가로지르는 들보

규율: samsung-memory-ppt-design-skill v2.2(11절 시각 우선, 20 × 11.25in, 본문 18pt 이상 · 출처 15pt, em-dash 금지,
액센트 Samsung Blue 하나). 전략 체계 개념도라 수치 주장이 없다(11.J 근거 사슬 대상 수치 없음, 출처 줄에 명시).
아이콘: assets/icons (Tabler Icons, MIT, scripts/render_parts/render_icons.mjs), 부품 이미지: assets/survival/render_*.png (3D 렌더).
원고: outputs/presentation/uncertainty-3c-strategy-outline.md
"""
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
sys.path.insert(0, os.path.join(ROOT, ".claude", "skills", "samsung-memory-ppt-design-skill", "scripts"))

from deck_helpers import (BLUE, BLUE_T1, BLUE_T2, CW, GRAY, GRAY_2, INK, LINE, MX, PALE, RIGHT, TINT,  # noqa: E402
                          WHITE, Deck)
from pptx.enum.shapes import MSO_CONNECTOR, MSO_SHAPE  # noqa: E402
from pptx.enum.dml import MSO_LINE_DASH_STYLE  # noqa: E402
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN  # noqa: E402
from pptx.util import Inches, Pt  # noqa: E402

ASSETS = os.path.join(HERE, "..", "assets")
ICONS = os.path.join(ASSETS, "icons")
OUT = os.environ.get("OUT_PATH") or os.path.join(HERE, "..", "uncertainty-3c-strategy-options.pptx")

d = Deck("불확실성 대응 3-C 전략", total=3,
         logos_dir=os.path.join(ASSETS, "logos"), photos_dir=os.path.join(ASSETS, "photos"),
         renders_dir=os.path.join(ASSETS, "survival"))
tb, rect, label_box = d.tb, d.rect, d.label_box
L, C, R = PP_ALIGN.LEFT, PP_ALIGN.CENTER, PP_ALIGN.RIGHT
MID, BOT = MSO_ANCHOR.MIDDLE, MSO_ANCHOR.BOTTOM
RR = MSO_SHAPE.ROUNDED_RECTANGLE

# =============================================================== 내용 (세 시안 공통)
THREE_C = [  # 번호, 영문, 한 줄 뜻, 아이콘
    ("C1", "Convertibility", "자원의 유연한 전환", "arrows-exchange"),
    ("C2", "Continuity", "연속성 있는 기술 축적", "stack-push"),
    ("C3", "Co-Creation", "고객과 함께 미래를 설계", "heart-handshake"),
]
STRATS = [  # 번호, 이름(3줄), 아이콘, 부품 이미지
    (1, "Bonding 기반\nDRAM · NAND\n통합 제조", "layers-linked", ["dram", "nand"]),
    (2, "고객 맞춤형\n차세대 메모리\n개발", "stack-2", ["hbm"]),
    (3, "고객 시스템을\n고려한 스토리지\n개발", "server", ["ssd", "server"]),
]
# (전략, C): 키워드, 설명(넓은 칸), 시안 A 짧은 설명, 아이콘
CELL = {
    (0, 0): ("제조라인 공용화", "수요에 따라\nDRAM ↔ NAND 전환", "수요에 따라\nDRAM ↔ NAND", "building-factory-2"),
    (0, 1): ("Legacy Cell\n자산화", "검증된 DRAM Cell 기술을\n그대로 활용", "검증된 Cell을\n그대로 재활용", "recycle"),
    (0, 2): ("Peripherals\n맞춤 제공", "Cell은 공통,\nPeri는 고객별 맞춤", "Cell은 공통,\nPeri는 고객별로", "adjustments-horizontal"),
    (1, 0): ("로직 IP\n역량 전환", "설계 역량 · 자원을\n메모리 로직 IP로", "역량 · 자원을\n로직 IP로", "cpu-2"),
    (1, 1): ("검증된 품질 ·\n적기 공급", "양산으로 검증된 품질을\n제때 공급", "양산 품질을\n제때 공급", "shield-check"),
    (1, 2): ("Custom Logic\n협업", "가속기별 로직을\n고객과 함께 설계", "가속기별 로직을\n고객과 함께", "puzzle"),
    (2, 0): ("기술 변화\n조기 센싱", "고객과 먼저 감지하고\n차세대 수요를 함께 설계", "고객과 먼저 감지,\n수요를 함께 설계", "radar"),
    (2, 1): ("시스템 지식\n확장", "워크로드 연구로\nNAND · SSD에서 서버까지", "워크로드 연구로\nNAND → 서버까지", "sitemap"),
    (2, 2): ("SSD · 서버\n공동 설계", "AI 수요에 맞춰\n기능과 구조를 함께 설계", "AI 수요에 맞춘\n기능 · 구조", "pencil-cog"),
}
TITLE = "불확실성에 대응하는 전체 최적화 체계"
LEAD = [("수요 예측만으로는 부족합니다. 자원 · 기술 · 고객을 하나의 체계로 묶는 ", 22, False, GRAY),
        ("3-C 전략", 22, True, BLUE), ("으로 대응합니다", 22, False, GRAY)]
BAND = "자원은 유연하게 전환하고, 기술은 연속성 있게 쌓고, 미래는 고객과 함께 설계합니다"
SOURCE = ("3-C: C1 Convertibility · C2 Continuity · C3 Co-Creation. 전략 체계 개념도로 수치 주장은 담지 않음.\n"
          "부품 이미지는 3D 렌더(사진 교체: assets/photos), 아이콘은 Tabler Icons(MIT).")
NOTES = (
    "[요지] 불확실성이 커지면 수요 예측은 빗나갑니다. 예측만으로는 부족하고, 자원 · 기술 · 고객을 하나의 체계로 묶어야 합니다. "
    "이것이 3-C 전략입니다. C1 Convertibility는 자원의 유연한 전환, C2 Continuity는 연속성 있는 기술 축적, "
    "C3 Co-Creation은 고객과 함께 미래를 설계하는 것입니다.\n"
    "[전략 1] Bonding 기반 DRAM · NAND 통합 제조. C1: 제조라인을 공용화합니다. C2: DRAM의 Legacy Cell 기술을 자산화해 그대로 활용합니다. "
    "C3: Peripherals를 고객 맞춤형으로 제공합니다.\n"
    "[전략 2] 고객 맞춤형 차세대 메모리 개발. C1: 메모리 로직 IP 설계 역량과 자원으로 전환합니다. C2: 검증된 품질과 적기 공급을 이어갑니다. "
    "C3: 가속기별로 고객이 요구하는 Custom Logic 설계를 함께 합니다.\n"
    "[전략 3] 고객 시스템을 고려한 스토리지 개발. C1: 고객과의 기술 협업으로 기술 변화를 빠르게 감지하고, 차세대 기술 수요를 함께 만들고 설계하는 체계를 만듭니다. "
    "C2: 고객 시스템과 워크로드 연구로 NAND 단품과 SSD 지식을 스토리지 서버 시스템 지식으로 넓힙니다. "
    "C3: 고객과 AI 수요에 맞춰 SSD와 스토리지 서버의 기능과 구조를 함께 설계합니다.\n"
)


def kw1(t):
    """넓은 칸용 키워드(수동 줄바꿈 제거)."""
    return t.replace("\n", " ")


# =============================================================== 공통 도구
def icon(s, name, x, y, sz, color="blue"):
    return d.img(s, os.path.join(ICONS, f"{name}_{color}.png"), x, y, w=sz, h=sz)


def icon_disc(s, name, x, y, dia, fill=BLUE, color="white", ratio=0.56, line=None):
    rect(s, x, y, dia, dia, fill=fill, line=line, lw=1.25, shape=MSO_SHAPE.OVAL)
    sz = dia * ratio
    icon(s, name, x + (dia - sz) / 2, y + (dia - sz) / 2, sz, color)


def ln(s, x1, y1, x2, y2, color=GRAY_2, w=1.5, dash=False):
    c = s.shapes.add_connector(MSO_CONNECTOR.STRAIGHT, Inches(x1), Inches(y1), Inches(x2), Inches(y2))
    c.line.color.rgb = color
    c.line.width = Pt(w)
    if dash:
        c.line.dash_style = MSO_LINE_DASH_STYLE.DASH
    return c


def poly(s, pts, fill=None, line=None, w=1.5, close=True, dash=False):
    e = [(int(px * 914400), int(py * 914400)) for px, py in pts]   # 로컬 좌표는 정수로 반올림되므로 EMU로 넘긴다
    fb = s.shapes.build_freeform(e[0][0], e[0][1], scale=1.0)
    fb.add_line_segments(e[1:], close=close)
    sp = fb.convert_to_shape()
    sp.shadow.inherit = False
    if fill is None:
        sp.fill.background()
    else:
        sp.fill.solid()
        sp.fill.fore_color.rgb = fill
    if line is None:
        sp.line.fill.background()
    else:
        sp.line.color.rgb = line
        sp.line.width = Pt(w)
        if dash:
            sp.line.dash_style = MSO_LINE_DASH_STYLE.DASH
    return sp


def frame(no, tag, label):
    """상단 줄 · 제목 · 리드 한 줄 · 구분선."""
    s = d.prs.slides.add_slide(d.prs.slide_layouts[6])
    d.no = no
    tb(s, MX, 0.40, 12.0, 0.36, [[(d.name, 18, True, BLUE), (f"   시안 {tag}  {label}", 18, False, GRAY)]])
    tb(s, RIGHT - 6.0, 0.40, 6.0, 0.36, [(d.grade, 18, False, GRAY)], align=R)
    tb(s, MX, 0.80, CW, 0.62, [(TITLE, 32, True, INK)], anchor=MID)
    tb(s, MX, 1.44, CW, 0.46, [LEAD], anchor=MID)
    rect(s, MX, 2.12, CW, 0.02, fill=LINE)
    return s


def finish(s, tag, note):
    d.band(s, 9.60, 0.80, "3-C", BAND)
    tb(s, MX, 10.50, 16.6, 0.62, [(ln_, 15, False, GRAY) for ln_ in SOURCE.split("\n")], spacing=1.05)
    tb(s, RIGHT - 1.6, 10.50, 1.6, 0.34, [(f"시안 {tag}", 16, False, GRAY)], align=R)
    d.notes(s, NOTES + note)


def parts(s, names, x, y, w, h):
    """부품 이미지 1~2개를 박스 안에 세로로 맞춘다."""
    if len(names) == 1:
        d.fit(s, d.part(names[0]), x, y, w, h)
        return
    h1 = h * 0.44
    d.fit(s, d.part(names[0]), x, y, w, h1)
    d.fit(s, d.part(names[1]), x, y + h1 + 0.08, w, h - h1 - 0.08)


def person(s, x, y, h, color):
    return d.person(s, x, y, h, color)


# =============================================================== 시안 A 미니 도해 (칸 왼쪽 2.05 × 1.54in)
def a_s1c1(s, x, y, w, h):          # 한 라인을 DRAM · NAND가 나눠 쓰고, 경계가 수요 따라 움직인다
    icon(s, "building-factory-2", x + (w - 0.56) / 2, y, 0.56)
    tb(s, x, y + 0.60, w, 0.30, [("공용 라인", 16, True, GRAY)], align=C)
    by, bh, split = y + 0.92, 0.42, 0.56
    rect(s, x, by, w * split, bh, fill=BLUE)
    rect(s, x + w * split, by, w * (1 - split), bh, fill=BLUE_T2)
    tb(s, x, by, w * split, bh, [("DRAM", 16, True, WHITE)], align=C, anchor=MID)
    tb(s, x + w * split, by, w * (1 - split), bh, [("NAND", 16, True, INK)], align=C, anchor=MID)
    rect(s, x + w * split - 0.32, by + bh + 0.04, 0.64, 0.18, fill=GRAY_2, shape=MSO_SHAPE.LEFT_RIGHT_ARROW)


def a_s1c2(s, x, y, w, h):          # 검증된 Cell 자산 → 새 제품의 Cell 층으로 그대로
    cw_, ch = 0.86, 0.80
    for k in (2, 1):
        rect(s, x + 0.08 * k, y + 0.18 - 0.08 * k, cw_, ch, fill=PALE, line=LINE, shape=RR)
    label_box(s, x, y + 0.18, cw_, ch, [("Legacy", 16, True, INK), ("Cell", 16, True, INK)], fill=WHITE, line=GRAY_2)
    tb(s, x - 0.05, y + 1.12, cw_ + 0.2, 0.30, [("검증 자산", 16, False, GRAY)], align=C)
    d.arrow_r(s, x + 1.02, y + 0.46, 0.26, 0.24, fill=GRAY_2)
    sx = x + w - 0.74
    label_box(s, sx, y + 0.16, 0.74, 0.40, [("Cell", 16, True, WHITE)], fill=BLUE)
    ln(s, sx - 0.04, y + 0.62, sx + 0.78, y + 0.62, color=GRAY_2, w=1.5, dash=True)
    label_box(s, sx, y + 0.68, 0.74, 0.40, [("Peri", 16, True, INK)], fill=PALE, line=LINE)
    tb(s, sx - 0.2, y + 1.12, 1.14, 0.30, [("Bonding", 16, False, GRAY)], align=C)


def a_s1c3(s, x, y, w, h):          # Cell 층은 공통, Peri만 고객별로 바꿔 붙인다
    label_box(s, x, y + 0.04, w, 0.40, [("공통 Cell", 16, True, INK)], fill=PALE, line=LINE)
    tw, gap = (w - 2 * 0.10) / 3, 0.10
    for k, (nm, fl, col) in enumerate([("A", BLUE, WHITE), ("B", BLUE_T1, WHITE), ("C", BLUE_T2, INK)]):
        tx = x + k * (tw + gap)
        ln(s, tx + tw / 2, y + 0.46, tx + tw / 2, y + 0.62, color=GRAY_2, w=1.5, dash=True)
        label_box(s, tx, y + 0.64, tw, 0.40, [(nm, 16, True, col)], fill=fl)
    tb(s, x, y + 1.12, w, 0.30, [("고객별 Peri", 16, False, GRAY)], align=C)


def a_s2c1(s, x, y, w, h):          # 메모리 설계 자원 → 로직 IP 설계 역량
    bx = 0.78
    rect(s, x, y + 0.12, bx, bx, fill=PALE, line=LINE, shape=RR)
    for r_ in range(3):
        for c_ in range(3):
            rect(s, x + 0.14 + c_ * 0.18, y + 0.26 + r_ * 0.18, 0.13, 0.13, fill=GRAY_2)
    icon(s, "arrows-exchange", x + bx + (w - 2 * bx - 0.34) / 2, y + 0.34, 0.34)
    rx = x + w - bx
    icon_disc(s, "cpu-2", rx, y + 0.12, bx, fill=BLUE, ratio=0.60)
    tb(s, x - 0.12, y + 0.98, bx + 0.24, 0.30, [("메모리", 16, False, GRAY)], align=C)
    tb(s, rx - 0.12, y + 0.98, bx + 0.24, 0.30, [("로직 IP", 16, True, BLUE)], align=C)


def a_s2c2(s, x, y, w, h):          # 검증된 품질(방패) + 약속한 시점마다 공급(마일스톤)
    icon(s, "shield-check", x, y + 0.10, 0.76)
    tb(s, x - 0.14, y + 0.98, 1.04, 0.30, [("검증 품질", 16, False, GRAY)], align=C)
    lx0, lx1, ly = x + 0.98, x + w, y + 0.48
    ln(s, lx0, ly, lx1, ly, color=GRAY_2, w=2.0)
    for k in range(3):
        cx_ = lx0 + 0.14 + k * (lx1 - lx0 - 0.28) / 2
        rect(s, cx_ - 0.13, ly - 0.13, 0.26, 0.26, fill=BLUE, shape=MSO_SHAPE.DIAMOND)
    tb(s, lx0 - 0.1, y + 0.98, lx1 - lx0 + 0.2, 0.30, [("적기 공급", 16, False, GRAY)], align=C)


def hbm_stack(s, x, y, w, base_fill, base_line=None):
    for k in range(4):
        rect(s, x + 0.04, y + k * 0.14, w - 0.08, 0.10, fill=GRAY_2)
    rect(s, x, y + 0.58, w, 0.22, fill=base_fill, line=base_line, lw=1.0)


def a_s2c3(s, x, y, w, h):          # 가속기마다 Base Die 로직이 다르다
    sw, gap = 0.56, (w - 3 * 0.56) / 2
    for k, (nm, fl) in enumerate([("A", BLUE), ("B", BLUE_T1), ("C", BLUE_T2)]):
        sx = x + k * (sw + gap)
        hbm_stack(s, sx, y + 0.12, sw, fl)
        tb(s, sx - 0.1, y + 0.96, sw + 0.2, 0.30, [(nm, 16, True, INK)], align=C)
    tb(s, x - 0.1, y + 1.22, w + 0.2, 0.30, [("가속기별 Base Die", 16, False, GRAY)], align=C)


def a_s3c1(s, x, y, w, h):          # 고객 쪽 변화를 먼저 감지하고, 수요를 함께 만든다
    bx = 0.70
    label_box(s, x, y + 0.36, bx, bx, [("고객", 16, True, INK)], fill=PALE, line=LINE)
    label_box(s, x + w - bx, y + 0.36, bx, bx, [("삼성", 16, True, WHITE)], fill=BLUE)
    icon(s, "radar", x + (w - 0.42) / 2, y - 0.02, 0.42)
    rect(s, x + bx + 0.06, y + 0.58, w - 2 * bx - 0.12, 0.26, fill=BLUE_T1, shape=MSO_SHAPE.LEFT_RIGHT_ARROW)
    tb(s, x - 0.1, y + 1.12, w + 0.2, 0.30, [("감지 · 수요 공동 설계", 16, False, GRAY)], align=C)


def a_s3c2(s, x, y, w, h):          # NAND → SSD → 서버, 계단처럼 지식 범위가 오른다
    sw, gap = 0.62, (w - 3 * 0.62) / 2
    base = y + h - 0.04
    for k, (nm, hh, fl, col, part) in enumerate([("NAND", 0.34, PALE, INK, "nand"), ("SSD", 0.54, BLUE_T2, INK, "ssd"),
                                                ("서버", 0.74, BLUE, WHITE, "server")]):
        sx = x + k * (sw + gap)
        rect(s, sx, base - hh, sw, hh, fill=fl, line=LINE if fl == PALE else None)
        tb(s, sx - 0.12, base - hh, sw + 0.24, hh, [(nm, 16, True, col)], align=C, anchor=MID)
        d.fit(s, d.part(part), sx, base - hh - 0.50, sw, 0.46)


def a_s3c3(s, x, y, w, h):          # 삼성(Blue) · 고객(그레이)이 서버 구조를 함께 그린다
    ph = 0.70
    person(s, x + 0.04, y + 0.30, ph, BLUE)
    person(s, x + w - 0.04 - 0.62 * ph, y + 0.30, ph, GRAY_2)
    d.fit(s, d.part("server"), x + 0.58, y + 0.02, w - 1.16, 0.56)
    icon(s, "refresh", x + (w - 0.44) / 2, y + 0.64, 0.44)
    tb(s, x - 0.16, y + 1.06, 0.76, 0.30, [("삼성", 16, True, BLUE)], align=C)
    tb(s, x + w - 0.60, y + 1.06, 0.76, 0.30, [("고객", 16, True, GRAY)], align=C)


A_DIA = {(0, 0): a_s1c1, (0, 1): a_s1c2, (0, 2): a_s1c3, (1, 0): a_s2c1, (1, 1): a_s2c2, (1, 2): a_s2c3,
         (2, 0): a_s3c1, (2, 1): a_s3c2, (2, 2): a_s3c3}

# =============================================================== 시안 A: 도해형 매트릭스
s = frame(1, "A", "도해형 매트릭스")
RW, G = 4.00, 0.16
CX0 = MX + RW + G
COLW = (RIGHT - CX0 - 2 * G) / 3
HY, HH = 2.34, 1.00
RY0, RG = HY + HH + 0.14, 0.14
RH = (9.40 - RY0 - 2 * RG) / 3

tb(s, MX, HY, RW, HH - 0.12, [("3대 전략", 20, True, GRAY)], anchor=BOT)
rect(s, MX, HY + HH - 0.07, RW, 0.03, fill=GRAY_2)
for c, (no, en, ko, ic) in enumerate(THREE_C):
    cx = CX0 + c * (COLW + G)
    icon_disc(s, ic, cx + 0.04, HY + 0.06, 0.80)
    tb(s, cx + 1.00, HY + 0.02, COLW - 1.0, 0.86, [[(no + " ", 24, True, BLUE), (en, 24, True, INK)], (ko, 20, False, GRAY)],
       anchor=MID)
    rect(s, cx, HY + HH - 0.08, COLW, 0.05, fill=BLUE)

for r, (no, name, ic, pts) in enumerate(STRATS):
    ry = RY0 + r * (RH + RG)
    rect(s, MX, ry, RW, RH, fill=TINT, shape=RR)
    label_box(s, MX + 0.18, ry + 0.18, 1.05, 0.40, [(f"전략 {no}", 18, True, WHITE)], fill=BLUE)
    tb(s, MX + 0.18, ry + 0.66, 2.50, 1.10, [(t, 20, True, INK) for t in name.split("\n")], spacing=1.0)
    parts(s, pts, MX + RW - 1.40, ry + 0.14, 1.28, RH - 0.28)
    for c in range(3):
        cx = CX0 + c * (COLW + G)
        kw, _, short, _ = CELL[(r, c)]
        rect(s, cx, ry, COLW, RH, fill=WHITE, line=LINE, lw=0.75, shape=RR)
        A_DIA[(r, c)](s, cx + 0.16, ry + 0.17, 1.98, 1.54)
        rect(s, cx + 2.27, ry + 0.30, 0.02, RH - 0.60, fill=LINE)
        tx = cx + 2.40
        tb(s, tx, ry + 0.12, COLW - 2.40 - 0.10, RH - 0.24,
           [(t, 20, True, INK) for t in kw.split("\n")] + [(" ", 8, False, GRAY)] + [(t, 18, False, GRAY) for t in short.split("\n")],
           anchor=MID, spacing=1.05)
finish(s, "A", "[시안 A 도해형] 칸마다 왼쪽 그림이 작동 원리입니다. 전략 1은 한 라인을 DRAM과 NAND가 나눠 쓰고 경계가 움직이는 그림(C1), "
               "검증된 Cell 자산이 새 제품의 Cell 층으로 그대로 들어가는 그림(C2), 공통 Cell 아래 고객별 Peri를 붙이는 그림(C3)입니다. "
               "전략 2는 메모리 설계 자원이 로직 IP로 바뀌는 그림, 검증 품질과 적기 공급 마일스톤, 가속기별로 Base Die 로직이 다른 HBM 그림입니다. "
               "전략 3은 고객 변화를 먼저 감지하는 그림, NAND에서 SSD, 서버로 오르는 계단, 삼성과 고객이 함께 서버 구조를 설계하는 그림입니다.")

# =============================================================== 시안 B: 아이콘 키워드형 (왼쪽 '왜' + 오른쪽 매트릭스)
s = frame(2, "B", "아이콘 키워드형")
PX0, PW = MX, 4.40
# --- 왼쪽 위: 수요 예측의 불확실성 원뿔 (개념도)
tb(s, PX0, 2.30, PW, 0.44, [("수요 예측만으로는 부족", 22, True, INK)], anchor=MID)
gx, gy, gw, gh = PX0 + 0.10, 2.86, PW - 0.20, 2.02
ln(s, gx, gy, gx, gy + gh, color=GRAY_2, w=1.25)
ln(s, gx, gy + gh, gx + gw, gy + gh, color=GRAY_2, w=1.25)
tb(s, gx + 0.08, gy - 0.04, 0.8, 0.30, [("수요", 16, False, GRAY)])
tb(s, gx + gw - 1.0, gy + gh + 0.02, 1.0, 0.30, [("시간 →", 16, False, GRAY)], align=R)
px_, py_ = gx + gw * 0.40, gy + gh * 0.52
poly(s, [(px_, py_), (gx + gw - 0.04, gy + 0.10), (gx + gw - 0.04, gy + gh - 0.40), (px_, py_)], fill=TINT, line=BLUE_T2, w=1.0)
ln(s, px_, gy + 0.05, px_, gy + gh, color=GRAY_2, w=1.0, dash=True)
tb(s, px_ - 0.55, gy + gh + 0.02, 1.1, 0.30, [("지금", 16, True, GRAY)], align=C)
past = [(gx + 0.12, gy + gh * 0.80), (gx + 0.40, gy + gh * 0.70), (gx + 0.62, gy + gh * 0.76), (gx + 0.95, gy + gh * 0.60),
        (gx + 1.22, gy + gh * 0.64), (gx + 1.48, gy + gh * 0.55), (px_, py_)]
poly(s, past, line=INK, w=2.5, close=False)
ex = gx + gw - 0.04
poly(s, [(px_, py_), (ex, gy + gh * 0.36)], line=BLUE, w=2.5, close=False, dash=True)
tb(s, ex - 0.90, gy + gh * 0.36 - 0.36, 0.90, 0.30, [("예측", 16, True, BLUE)], align=R)
for pts_ in ([(px_, py_), (px_ + 0.45, py_ + 0.10), (px_ + 0.85, py_ + 0.32), (px_ + 1.30, py_ + 0.24), (ex - 0.10, gy + gh * 0.78)],
             [(px_, py_), (px_ + 0.40, py_ - 0.22), (px_ + 0.90, py_ - 0.30), (px_ + 1.40, py_ - 0.52), (ex - 0.10, gy + 0.22)]):
    poly(s, pts_, line=GRAY_2, w=1.5, close=False)
tb(s, px_ + 0.24, gy + gh - 0.36, 2.4, 0.30, [("실제는 이 범위 어디든", 16, False, GRAY)], align=L)
tb(s, gx + 0.10, gy + 0.30, 1.4, 0.30, [("개념도", 16, False, GRAY_2)])
# --- 왼쪽 아래: 자원 · 기술 · 고객 삼각 체계
d.down(s, PX0 + PW / 2, 5.20)
tb(s, PX0, 5.52, PW, 0.44, [("하나의 체계로 묶습니다", 22, True, INK)], align=C, anchor=MID)
DIA_ = 1.16
nodes = [(PX0 + PW / 2, 6.66, "C1 자원", THREE_C[0][3]), (PX0 + 0.66, 8.70, "C2 기술", THREE_C[1][3]),
         (PX0 + PW - 0.66, 8.70, "C3 고객", THREE_C[2][3])]
for i in range(3):
    a_, b_ = nodes[i], nodes[(i + 1) % 3]
    ln(s, a_[0], a_[1], b_[0], b_[1], color=BLUE_T2, w=3.0)
cxc, cyc = PX0 + PW / 2, (6.66 + 8.70 * 2) / 3
rect(s, cxc - 0.56, cyc - 0.44, 1.12, 0.88, fill=WHITE, line=BLUE, lw=1.75, shape=RR)
tb(s, cxc - 0.56, cyc - 0.44, 1.12, 0.88, [("전체", 18, True, BLUE), ("최적화", 18, True, BLUE)], align=C, anchor=MID, spacing=1.0)
for (nx, ny, lab, ic) in nodes:
    rect(s, nx - DIA_ / 2, ny - DIA_ / 2, DIA_, DIA_, fill=BLUE, shape=MSO_SHAPE.OVAL)
    icon(s, ic, nx - 0.21, ny - 0.42, 0.42, "white")
    tb(s, nx - DIA_ / 2, ny + 0.02, DIA_, 0.32, [(lab, 18, True, WHITE)], align=C)
rect(s, PX0 + PW + 0.18, 2.34, 0.02, 7.06, fill=LINE)

# --- 오른쪽: 매트릭스
MX0 = PX0 + PW + 0.38
MW_ = RIGHT - MX0
RHW, GB = 3.28, 0.14
BCW = (MW_ - RHW - 3 * GB) / 3
BHY, BHH = 2.34, 1.40
BRY0, BRG = BHY + BHH + 0.14, 0.12
BRH = (9.40 - BRY0 - 2 * BRG) / 3
tb(s, MX0, BHY, RHW, BHH - 0.10, [("3대 전략", 20, True, GRAY)], anchor=BOT)
for c, (no, en, ko, ic) in enumerate(THREE_C):
    cx = MX0 + RHW + GB + c * (BCW + GB)
    rect(s, cx, BHY, BCW, BHH, fill=BLUE, shape=RR)
    icon(s, ic, cx + (BCW - 0.48) / 2, BHY + 0.12, 0.48, "white")
    tb(s, cx, BHY + 0.64, BCW, 0.70, [[(no + " ", 22, True, BLUE_T2), (en, 22, True, WHITE)], (ko, 18, False, WHITE)],
       align=C, spacing=1.0)
for r, (no, name, ic, pts) in enumerate(STRATS):
    ry = BRY0 + r * (BRH + BRG)
    rect(s, MX0, ry, RHW, BRH, fill=TINT, shape=RR)
    icon_disc(s, ic, MX0 + 0.16, ry + (BRH - 0.72) / 2, 0.72)
    tb(s, MX0 + 1.04, ry + 0.08, RHW - 1.12, BRH - 0.16,
       [(f"전략 {no}", 18, True, BLUE)] + [(t, 20, True, INK) for t in name.split("\n")], anchor=MID, spacing=1.0)
    for c in range(3):
        cx = MX0 + RHW + GB + c * (BCW + GB)
        kw, desc, _, cic = CELL[(r, c)]
        rect(s, cx, ry, BCW, BRH, fill=WHITE, line=LINE, lw=0.75, shape=RR)
        icon_disc(s, cic, cx + 0.18, ry + 0.18, 0.70, fill=TINT, color="blue", ratio=0.58)
        tb(s, cx + 1.02, ry + 0.14, BCW - 1.12, 0.78, [(t, 20, True, INK) for t in kw.split("\n")], anchor=MID, spacing=1.0)
        tb(s, cx + 0.20, ry + 1.00, BCW - 0.36, BRH - 1.06, [(t, 18, False, GRAY) for t in desc.split("\n")], spacing=1.05)
finish(s, "B", "[시안 B 아이콘 키워드형] 왼쪽은 이 체계가 왜 필요한지입니다. 위 그림은 개념도로, 지금 이후 수요는 예측선 하나가 아니라 넓어지는 범위 안 어디로든 갈 수 있음을 보입니다. "
               "그래서 예측 하나에 걸지 않고 자원 · 기술 · 고객 세 꼭짓점을 하나의 체계로 묶습니다. 오른쪽 매트릭스는 세 전략이 각 C에서 무엇을 하는지 아이콘과 키워드로 보입니다.")

# =============================================================== 시안 C: 3-C 기둥 구조형 (지붕 · 기둥 · 들보 · 토대)
s = frame(3, "C", "3-C 기둥 구조형")
LW3 = 3.55
TX0, TX1 = MX + LW3 + 0.16, RIGHT
TW3 = TX1 - TX0
PG = 0.24
PWC = (TW3 - 2 * PG) / 3
# 지붕 + 처마
rect(s, TX0, 2.28, TW3, 0.80, fill=BLUE, shape=MSO_SHAPE.ISOSCELES_TRIANGLE)
tb(s, TX0 + TW3 / 2 - 3.0, 2.64, 6.0, 0.40, [[("3-C ", 22, True, BLUE_T2), ("전체 최적화 체계", 22, True, WHITE)]], align=C, anchor=MID)
rect(s, TX0, 3.10, TW3, 0.10, fill=BLUE)
# 기둥 머리 · 몸통
CAPY, CAPH = 3.28, 0.92
SHY0, SHY1 = CAPY + CAPH, 8.74
for c, (no, en, ko, ic) in enumerate(THREE_C):
    px = TX0 + c * (PWC + PG)
    rect(s, px, CAPY, PWC, CAPH, fill=TINT, line=BLUE_T2, lw=1.0)
    icon(s, ic, px + 0.22, CAPY + (CAPH - 0.56) / 2, 0.56)
    tb(s, px + 0.96, CAPY, PWC - 1.04, CAPH, [[(no + " ", 22, True, BLUE), (en, 22, True, INK)], (ko, 18, False, GRAY)],
       anchor=MID, spacing=1.0)
    rect(s, px + 0.16, SHY0, PWC - 0.32, SHY1 - SHY0, fill=TINT)
    for ex_ in (px + 0.16, px + PWC - 0.16):   # 기둥 윤곽
        ln(s, ex_, SHY0, ex_, SHY1, color=BLUE_T2, w=1.5)
# 들보(전략) · 카드
RY3, RG3 = SHY0 + 0.12, 0.10
RH3 = (SHY1 - 0.08 - RY3 - 2 * RG3) / 3
tb(s, MX, CAPY, LW3, CAPH - 0.06, [("3대 전략", 20, True, GRAY)], anchor=BOT)
for r, (no, name, ic, pts) in enumerate(STRATS):
    ry = RY3 + r * (RH3 + RG3)
    rect(s, MX + LW3 - 0.10, ry + RH3 / 2 - 0.03, TX1 - (MX + LW3 - 0.10), 0.06, fill=BLUE_T2)
    rect(s, MX, ry, LW3, RH3, fill=WHITE, line=BLUE_T2, lw=1.25, shape=RR)
    parts(s, pts, MX + 0.12, ry + 0.12, 1.02, RH3 - 0.24)
    tb(s, MX + 1.26, ry + 0.04, LW3 - 1.32, RH3 - 0.08,
       [(f"전략 {no}", 18, True, BLUE)] + [(t, 20, True, INK) for t in name.split("\n")], anchor=MID, spacing=1.0)
    for c in range(3):
        px = TX0 + c * (PWC + PG)
        kw, desc, _, cic = CELL[(r, c)]
        cx, cw_ = px + 0.26, PWC - 0.52
        rect(s, cx, ry, cw_, RH3, fill=WHITE, line=LINE, lw=0.75, shape=RR)
        icon(s, cic, cx + 0.18, ry + 0.16, 0.54)
        tb(s, cx + 0.86, ry + 0.06, cw_ - 0.96, 0.66, [(kw1(kw), 20, True, INK)], anchor=MID, spacing=1.0)
        tb(s, cx + 0.20, ry + 0.72, cw_ - 0.30, RH3 - 0.76, [(t, 18, False, GRAY) for t in desc.split("\n")], spacing=1.0)
# 토대: 수요 예측
rect(s, TX0 - 0.12, SHY1, TW3 + 0.12, 0.12, fill=GRAY_2)
rect(s, TX0 - 0.30, SHY1 + 0.14, TW3 + 0.30, 0.56, fill=PALE, line=LINE, lw=0.75)
tb(s, TX0 - 0.30, SHY1 + 0.14, TW3 + 0.30, 0.56,
   [[("토대: 수요 예측", 20, True, GRAY), ("    필요하지만, 예측 하나만으로는 불확실성에 대응할 수 없습니다", 18, False, GRAY)]],
   align=C, anchor=MID)
finish(s, "C", "[시안 C 기둥 구조형] 건물 그림으로 읽습니다. 맨 아래 토대가 수요 예측입니다. 필요하지만 그것만으로는 불확실성을 버틸 수 없습니다. "
               "그 위에 자원 전환(C1), 기술 축적(C2), 고객과 공동 설계(C3) 세 기둥을 세우고, 세 기둥이 함께 전체 최적화 체계라는 지붕을 받칩니다. "
               "세 전략은 세 기둥을 모두 가로지르는 들보입니다. 어느 전략도 한 기둥에만 기대지 않습니다.")

d.save(OUT)
print("saved", OUT)
