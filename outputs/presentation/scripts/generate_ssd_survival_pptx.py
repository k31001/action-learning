"""다운턴에서 배운 SSD 생존 전략: 3장 요약 덱 (2026-09-28 v1.0).

제목 3개를 이어 읽으면 한 문단이 된다:
  1 배경  HBM의 교훈은 고객과 함께 수요를 읽는 것이며, 다음 수요는 높은 DWPD를 요구하는 AI 스토리지입니다
  2 솔루션 NAND의 한계는 SSD 안에서 풀어 왔지만, DWPD 장벽은 서버와 함께 WAF를 낮춰야 풀립니다
  3 실행  계약에 기술 협력을 묶고, 고객 안에 사람을 두고, AI 데이터센터 운영자 수준의 시스템 SW 역량을 갖춰야 합니다

규율: 글자 최소 15pt(출처)·본문 18pt 이상, em-dash 금지, 액센트는 Samsung Blue 하나, 자사=Blue·경쟁=그레이.
부품 이미지는 assets/photos/{nand,dram,hbm,ssd,server}.(png|jpg)가 있으면 그 사진을, 없으면 3D 렌더(assets/survival/render_*.png)를 쓴다.
차트는 generate_ssd_survival_charts.py가 만든다. 원고·근거는 outputs/presentation/ssd-survival-strategy-outline.md.
"""
import os

from PIL import Image
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.oxml.ns import qn
from pptx.util import Emu, Inches, Pt

BLUE = RGBColor(0x14, 0x28, 0xA0)
BLUE_T1 = RGBColor(0x3C, 0x5A, 0xC8)
BLUE_T2 = RGBColor(0xAA, 0xB8, 0xE8)
TINT = RGBColor(0xEE, 0xF1, 0xFA)
INK = RGBColor(0x1A, 0x1A, 0x1A)
GRAY = RGBColor(0x55, 0x55, 0x55)
GRAY_2 = RGBColor(0x8A, 0x8A, 0x8A)
LINE = RGBColor(0xD9, 0xD9, 0xD9)
PALE = RGBColor(0xF5, 0xF5, 0xF5)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
FONT = os.environ.get("FONT_LATIN", "Arial")
FONT_EA = os.environ.get("FONT_EA", FONT)

MX, CW = 0.79, 18.42
RIGHT = MX + CW
GRADE = "[문서등급 표기]"
TOTAL = 3
DECK = "다운턴에서 배운 SSD 생존 전략"

HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(HERE, "..", "assets")
SV = os.path.join(ASSETS, "survival")
LOGOS = os.path.join(ASSETS, "logos")
PHOTOS = os.path.join(ASSETS, "photos")
OUT = os.environ.get("OUT_PATH") or os.path.join(HERE, "..", "ssd-survival-strategy.pptx")

prs = Presentation()
prs.slide_width = Emu(18288000)   # 20.00 in
prs.slide_height = Emu(10287000)  # 11.25 in
BLANK = prs.slide_layouts[6]


# ---------------------------------------------------------------- 기본 도구
def _font(run, size, bold, color):
    f = run.font
    f.name = FONT
    f.size = Pt(size)
    f.bold = bold
    f.color.rgb = color
    rPr = run._r.get_or_add_rPr()
    ea = rPr.find(qn("a:ea"))
    if ea is None:
        ea = rPr.makeelement(qn("a:ea"), {})
        rPr.append(ea)
    ea.set("typeface", FONT_EA)


def tb(s, x, y, w, h, paras, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP, spacing=1.1):
    """paras: [(text, size, bold, color)] 또는 [[run, run], ...]"""
    box = s.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = box.text_frame
    tf.word_wrap = True
    tf.vertical_anchor = anchor
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    for i, para in enumerate(paras):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        p.line_spacing = spacing
        runs = para if isinstance(para[0], (list, tuple)) else [para]
        for (t, size, bold, color) in runs:
            r = p.add_run()
            r.text = t
            _font(r, size, bold, color)
    return box


def rect(s, x, y, w, h, fill=None, line=None, lw=1.0, shape=MSO_SHAPE.RECTANGLE, dash=False):
    sp = s.shapes.add_shape(shape, Inches(x), Inches(y), Inches(w), Inches(h))
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
        sp.line.width = Pt(lw)
        if dash:
            from pptx.enum.dml import MSO_LINE_DASH_STYLE
            sp.line.dash_style = MSO_LINE_DASH_STYLE.DASH
    if shape == MSO_SHAPE.ROUNDED_RECTANGLE:
        sp.adjustments[0] = min(0.5, 0.08 / max(0.01, min(w, h)))
    return sp


def label_box(s, x, y, w, h, paras, fill=None, line=None, lw=1.0, align=PP_ALIGN.CENTER, rounded=True, dash=False):
    rect(s, x, y, w, h, fill=fill, line=line, lw=lw, shape=MSO_SHAPE.ROUNDED_RECTANGLE if rounded else MSO_SHAPE.RECTANGLE, dash=dash)
    pad = 0.14 if align != PP_ALIGN.CENTER else 0.06
    tb(s, x + pad, y, w - 2 * pad, h, paras, align=align, anchor=MSO_ANCHOR.MIDDLE)


def arrow_r(s, x, y, w, h, fill=BLUE_T2):
    sp = rect(s, x, y, w, h, fill=fill, shape=MSO_SHAPE.RIGHT_ARROW)
    return sp


def img(s, path, x, y, w=None, h=None):
    with Image.open(path) as im:
        a = im.size[0] / im.size[1]
    if w is None:
        w = h * a
    if h is None:
        h = w / a
    s.shapes.add_picture(path, Inches(x), Inches(y), Inches(w), Inches(h))
    return w, h


def fit(path, x, y, bw, bh, align="center"):
    """박스(bw×bh) 안에 비율 유지로 맞춰 넣는다. 실제 (x, y, w, h) 반환."""
    with Image.open(path) as im:
        a = im.size[0] / im.size[1]
    w, h = (bw, bw / a) if bw / a <= bh else (bh * a, bh)
    ox = x + (bw - w) / 2 if align == "center" else x
    oy = y + (bh - h) / 2
    s_ = CUR[0]
    s_.shapes.add_picture(path, Inches(ox), Inches(oy), Inches(w), Inches(h))
    return ox, oy, w, h


def part(name):
    for ext in (".png", ".jpg", ".jpeg"):
        p = os.path.join(PHOTOS, name + ext)
        if os.path.exists(p):
            return p
    return os.path.join(SV, f"render_{name}.png")


def logo_path(name):
    return os.path.join(LOGOS, f"{name}.png")


def notes(s, text):
    s.notes_slide.notes_text_frame.text = text


CUR = [None]


def new_slide():
    s = prs.slides.add_slide(BLANK)
    CUR[0] = s
    return s


def header(s, no, section, title):
    tb(s, MX, 0.40, 12.0, 0.36, [[(DECK, 18, True, BLUE), (f"   {no} / {TOTAL}  {section}", 18, False, GRAY)]])
    tb(s, RIGHT - 6.0, 0.40, 6.0, 0.36, [(GRADE, 18, False, GRAY)], align=PP_ALIGN.RIGHT)
    tb(s, MX, 0.86, CW, 1.12, [(ln, 32, True, INK) for ln in title.split("\n")], anchor=MSO_ANCHOR.MIDDLE, spacing=1.05)
    rect(s, MX, 2.12, CW, 0.02, fill=LINE)


def footer(s, text):
    tb(s, MX, 10.50, 16.9, 0.62, [(text, 15, False, GRAY)], spacing=1.05)
    tb(s, RIGHT - 1.2, 10.50, 1.2, 0.34, [(f"{CUR_NO[0]} / {TOTAL}", 16, False, GRAY)], align=PP_ALIGN.RIGHT)


CUR_NO = [1]


def band(s, y, h, tag, text, size=26, pills=None):
    rect(s, MX, y, CW, h, fill=BLUE)
    tb(s, MX + 0.40, y, 1.35, h, [(tag, 20, False, BLUE_T2)], anchor=MSO_ANCHOR.MIDDLE)
    pw = 0.0
    if pills:
        pw = sum(0.40 + 0.28 * len(p) for p in pills) + 0.18 * (len(pills) - 1) + 0.35
    tb(s, MX + 1.75, y, CW - 1.75 - pw - 0.2, h, [(text, size, True, WHITE)], anchor=MSO_ANCHOR.MIDDLE)
    if pills:
        cx = RIGHT - pw + 0.05
        for p in pills:
            w = 0.40 + 0.28 * len(p)
            rect(s, cx, y + (h - 0.52) / 2, w, 0.52, fill=WHITE, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
            tb(s, cx, y + (h - 0.52) / 2, w, 0.52, [(p, 20, True, BLUE)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
            cx += w + 0.18


def panel_head(s, x, w, no, text, y=2.34):
    d = 0.48
    rect(s, x, y, d, d, fill=BLUE, shape=MSO_SHAPE.OVAL)
    tb(s, x, y, d, d, [(str(no), 20, True, WHITE)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    tb(s, x + d + 0.16, y - 0.04, w - d - 0.16, d + 0.08, [(text, 24, True, INK)], anchor=MSO_ANCHOR.MIDDLE)


def chevron(s, x, y, w=0.26, h=0.55, fill=BLUE_T2):
    rect(s, x, y, w, h, fill=fill, shape=MSO_SHAPE.CHEVRON)


def bracket(s, x, y, w, color, label, size=18, bold=True):
    rect(s, x, y + 0.36, w, 0.035, fill=color)
    rect(s, x, y + 0.36, 0.035, 0.16, fill=color)
    rect(s, x + w - 0.035, y + 0.36, 0.035, 0.16, fill=color)
    tb(s, x, y - 0.02, w, 0.36, [(label, size, bold, color)], align=PP_ALIGN.CENTER)


# =============================================================== 1 배경
s = new_slide()
CUR_NO[0] = 1
header(s, 1, "배경", "HBM의 교훈은 고객과 함께 수요를 읽는 것이며,\n다음 수요인 AI 스토리지는 높은 DWPD를 요구합니다")

X1, W1 = MX, 5.60
X2, W2 = 6.80, 6.60
X3, W3 = 13.81, 5.40

# ① 교훈
panel_head(s, X1, W1, 1, "교훈: HBM 수요를 늦게 읽었다")
lg_y = 2.98
tb(s, X1, lg_y, 1.45, 0.38, [("HBM 점유율", 16, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE)
cx = X1 + 1.45
rect(s, cx, lg_y + 0.16, 0.36, 0.07, fill=BLUE)
w_s, _ = img(s, logo_path("samsung"), cx + 0.44, lg_y + 0.06, h=0.25)
cx2 = cx + 0.44 + w_s + 0.30
rect(s, cx2, lg_y + 0.16, 0.36, 0.07, fill=GRAY_2)
img(s, logo_path("sk-hynix"), cx2 + 0.44, lg_y - 0.05, h=0.44)
img(s, os.path.join(SV, "chart_hbm_share.png"), X1, 3.40, w=W1)          # h 3.05 → 6.45

tb(s, X1, 6.55, 2.0, 0.34, [("복기", 18, True, BLUE)])
cb_y, cb_h, cb_w, gap = 6.93, 0.96, 1.60, 0.40
for i, t in enumerate(["시장 규모를\n작게 봄", "개발 리소스\n투입 지연", "AI 첫 호황\n선두 상실"]):
    bx = X1 + i * (cb_w + gap)
    last = i == 2
    label_box(s, bx, cb_y, cb_w, cb_h, [(ln, 18, True, WHITE if last else INK) for ln in t.split("\n")],
              fill=BLUE if last else PALE, line=None)
    if i < 2:
        arrow_r(s, bx + cb_w + 0.07, cb_y + cb_h / 2 - 0.13, gap - 0.14, 0.26, fill=GRAY_2)

ly = 8.10
rect(s, X1, ly, W1, 1.36, fill=WHITE, line=BLUE, lw=1.75, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
img(s, logo_path("nvidia"), X1 + 0.22, ly + 0.17, h=0.30)
tb(s, X1 + 0.22 + 0.30 * 512 / 98 + 0.14, ly + 0.12, W1 - 2.2, 0.40, [("같은 고객과 함께였다면", 18, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE)
tb(s, X1 + 0.22, ly + 0.56, W1 - 0.44, 0.76,
   [("고객과 함께 수요를 만드는 기업이 미래를 선점합니다", 20, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)

chevron(s, X2 - 0.33, 5.45)

# ② 다음 수요
panel_head(s, X2, W2, 2, "다음 수요: KV 캐시가 SSD로")
py, ph = 2.98, 0.98
slots = [("hbm", "GPU HBM"), ("dram", "서버 DRAM"), ("ssd", "NVMe SSD")]
sw = (W2 - 2 * 0.42) / 3
for i, (nm, lab) in enumerate(slots):
    sx = X2 + i * (sw + 0.42)
    fit(part(nm), sx, py, sw, ph)
    tb(s, sx, py + ph + 0.04, sw, 0.34, [(lab, 18, True, BLUE if nm == "ssd" else INK)], align=PP_ALIGN.CENTER)
    if i < 2:
        chevron(s, sx + sw + 0.10, py + 0.30, w=0.22, h=0.42, fill=GRAY_2)
rect(s, X2, 4.42, W2, 0.44, fill=BLUE, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, X2, 4.42, W2, 0.44, [("KV 캐시 오프로딩: 넘치는 KV 캐시를 SSD가 받습니다", 18, True, WHITE)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
img(s, os.path.join(SV, "chart_essd_ai_qlc.png"), X2, 4.98, w=W2)          # h 3.70 → 8.68
sy = 8.78
fit(part("server"), X2, sy, 1.05, 0.66)
tb(s, X2 + 1.20, sy - 0.02, W2 - 1.20, 0.72,
   [[("랙 공간 제약 → 고용량 QLC 선호", 18, True, INK)],
    [("Meta: QLC 서버 바이트 밀도 목표 TLC의 6배", 18, False, GRAY)]], anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)

chevron(s, X3 - 0.33, 5.45)

# ③ 새 요구
panel_head(s, X3, W3, 3, "새 요구: 높은 DWPD")
img(s, os.path.join(SV, "chart_dwpd_gap.png"), X3, 2.98, w=W3)          # h 3.55 → 6.53
tb(s, X3, 6.72, W3, 0.80, [[("최대 ", 26, True, BLUE), ("100", 48, True, BLUE), ("배", 26, True, BLUE)]], anchor=MSO_ANCHOR.MIDDLE)
tb(s, X3, 7.50, W3, 0.36, [("현 QLC 0.3 대비 요구 30 DWPD", 18, False, GRAY)])
rect(s, X3, 8.02, W3, 0.02, fill=LINE)
fit(part("ssd"), X3, 8.20, 1.35, 1.10)
tb(s, X3 + 1.50, 8.12, W3 - 1.50, 1.30,
   [[("고객이 높은 DWPD를", 20, True, INK)], [("요구하기 시작했습니다", 20, True, INK)],
    [("30 DWPD 이상은 지금 SLC급만", 18, False, GRAY)]], anchor=MSO_ANCHOR.MIDDLE, spacing=1.05)

band(s, 9.60, 0.80, "명제", "DWPD 갭을 메우는 기업이 AI 스토리지 시장을 가져갑니다")
footer(s, "출처: HBM 점유율 TrendForce(2022~2024), Counterpoint(2025~1Q26) · eSSD 수요는 과제팀 모델(TrendForce·TechInsights·SanDisk 기반, 2026년 이후 전망) · "
          "DWPD 정격 Kioxia LC9·CM10, Solidigm D7-PS1030, 30은 고객 요구 [사내 확인] · Meta 2025-03 · 부품 이미지는 3D 렌더")
notes(s, "1장 배경입니다. 왼쪽은 HBM의 교훈입니다. 2022년 HBM 점유율은 SK하이닉스 50%, 삼성 40%였고 2023년 다운턴을 지나며 격차가 벌어져 2025년 2분기에는 62% 대 17%, 45%포인트까지 벌어졌습니다. "
      "2025년 1분기에는 DRAM 점유율 1위도 33년 만에 바뀌었습니다(TrendForce·Korea Herald, 삼성은 2025년 4분기에 1위를 되찾았습니다). 과제팀의 복기는 세 단계입니다. 시장 규모를 작게 봤고, 그래서 개발 리소스를 적극적으로 투입하지 않았고, AI 첫 호황에서 선두를 내주었습니다. "
      "NVIDIA 같은 고객과 긴밀하게 협업했다면 AI 수요를 더 일찍 읽었을 것입니다. 신문섭 파트너(Bain) 인터뷰의 표현으로는 앞으로의 승부는 칩을 많이 파는 기업이 아니라 고객의 아키텍처 안으로 들어가 수요를 함께 설계하는 기업이 가져갑니다. "
      "송용호 부사장 인터뷰도 같은 진단입니다. 부품이 어떻게 쓰일지는 시스템을 설계하는 사람 마음에 있고, 그걸 알았으면 HBM을 진작 준비했을 것이라고 했습니다. "
      "가운데는 다음 수요입니다. 추론 중 KV 캐시가 GPU HBM을 넘어 서버 DRAM, 그리고 NVMe SSD로 내려옵니다. HBM을 대체하는 것이 아니라 그 아래에 계층이 더해지는 것입니다. "
      "eSSD 수요는 과제팀 모델로 2025년 265EB에서 2030년 1,000EB, 그중 AI 추론 KV 캐시가 350EB입니다. 고객은 랙 공간 제약 때문에 고용량을 원하고, QLC 비중은 2024년 14%에서 2030년 55%로 오릅니다. "
      "오른쪽이 결정적인 차이입니다. 기존 SSD는 TLC 1, QLC 0.3에서 0.6 DWPD인데, AI 스토리지는 3에서 30을 요구합니다. KV 캐시용으로 나온 TLC SSD 정격이 3이고, 30은 고객 요구입니다. "
      "30 이상은 지금 SLC급 매체만 닿습니다. 모든 요구를 TLC나 QLC로 풀자는 것이 아니라, 고객이 높은 DWPD를 요구하기 시작했다는 사실이 중요합니다. 이 갭을 메우는 기업이 AI 스토리지 시장을 가져갑니다.")

# =============================================================== 2 솔루션
s = new_slide()
CUR_NO[0] = 2
header(s, 2, "솔루션", "NAND의 한계는 SSD 안에서 풀어 왔지만,\nDWPD 장벽은 서버와 함께 WAF를 낮춰야 풀립니다")

# 상단 1/3: 범위 체인
TY = 2.34
cols = [(1.00, "nand", "NAND", [("비트 에러", "ECC"), ("쓰기 전 소거", "FTL")]),
        (5.95, "ssd", "SSD", [("QoS 간섭", "멀티테넌트"), ("데이터 보호", "보안")]),
        (10.90, "server", "서버", [("데이터 수명 혼재", "배치 정보 FDP")])]
CWD = 3.90
bracket(s, 1.00, TY, 5.95 + CWD - 1.00, GRAY_2, "지금까지: SSD 안에서 해결")
bracket(s, 5.95 + CWD + 0.12, TY, 10.90 + CWD - (5.95 + CWD + 0.12), BLUE, "이제: 서버와 함께")
for k, (x, nm, lab, probs) in enumerate(cols):
    hot = nm == "server"
    ox, oy, w, h = fit(part(nm), x, 2.96, CWD, 1.00)
    tb(s, x, 3.98, CWD, 0.36, [(lab, 20, True, BLUE if hot else INK)], align=PP_ALIGN.CENTER)
    for j, (pb, sol) in enumerate(probs):
        yy = 4.38 + j * 0.42
        tb(s, x, yy, CWD, 0.40, [[(pb, 18, False, GRAY), ("  →  ", 18, False, GRAY_2), (sol, 18, True, BLUE if hot else INK)]],
           align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    if k < 2:
        arrow_r(s, x + CWD + 0.20, 3.26, 0.65, 0.40, fill=BLUE if k == 1 else GRAY_2)

# 우측: 높은 DWPD 세 갈래
RX, RW = 15.35, RIGHT - 15.35
rect(s, RX, 2.40, RW, 2.72, fill=TINT, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, RX + 0.25, 2.50, RW - 0.5, 0.42, [("높은 DWPD, 세 갈래", 20, True, INK)])
opts = [("SLC 매체", "비용 ↑", False), ("OP 확대", "용량 ↓", False), ("WAF 저감", "TCO 유지", True)]
for i, (a, b, hot) in enumerate(opts):
    yy = 3.02 + i * 0.66
    rect(s, RX + 0.22, yy, RW - 0.44, 0.54, fill=BLUE if hot else WHITE, line=None if hot else LINE,
         shape=MSO_SHAPE.ROUNDED_RECTANGLE)
    tb(s, RX + 0.42, yy, 1.70, 0.54, [(a, 20, True, WHITE if hot else INK)], anchor=MSO_ANCHOR.MIDDLE)
    tb(s, RX + 2.05, yy, RW - 2.50, 0.54, [(b, 20, hot, WHITE if hot else GRAY)], align=PP_ALIGN.RIGHT, anchor=MSO_ANCHOR.MIDDLE)

rect(s, MX, 5.28, CW, 0.02, fill=LINE)

# 하단 2/3: 기술 스택 3단계
LAY = ["AI 프레임워크", "호스트 OS · 커널", "NVMe 인터페이스", "SSD 컨트롤러 · FW", "NAND"]
GX = [3.35, 8.73, 14.11]
GW = 5.10
HY = 5.46
RY0, RP, RH = 6.26, 0.56, 0.48
stages = [
    ("1", "NAND를 SSD로", "2000년대~"),
    ("2", "SSD 기능 고도화", "2010년대~"),
    ("3", "서버와 함께", "2020년대~"),
]
for i, (n, t, era) in enumerate(stages):
    hot = i == 2
    rect(s, GX[i], HY, 0.46, 0.46, fill=BLUE if hot else GRAY_2, shape=MSO_SHAPE.OVAL)
    tb(s, GX[i], HY, 0.46, 0.46, [(n, 20, True, WHITE)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    tb(s, GX[i] + 0.60, HY - 0.05, GW - 0.60, 0.56, [[(t, 22, True, BLUE if hot else INK), ("   " + era, 18, False, GRAY)]],
       anchor=MSO_ANCHOR.MIDDLE)
for r, nm in enumerate(LAY):
    tb(s, MX, RY0 + r * RP, 2.45, RH, [(nm, 18, True, GRAY)], anchor=MSO_ANCHOR.MIDDLE)

# (stage, layer) → (text, state)  state: on / base / off
CELL = {
    (0, 3): ("ECC · FTL · 웨어 레벨링", "on"), (0, 4): ("여러 NAND를 하나로", "on"),
    (1, 2): ("NVMe · 멀티 큐", "on"), (1, 3): ("QoS · 멀티테넌트 · 보안", "on"), (1, 4): ("", "base"),
    (2, 0): ("LMCache · vLLM · Dynamo", "on"), (2, 1): ("Linux write stream", "on"),
    (2, 2): ("FDP  (OC-SSD · ZNS 이후)", "on"), (2, 3): ("워크로드 구성형 SSD", "on"), (2, 4): ("", "base"),
}
for i in range(3):
    for r in range(5):
        t, st = CELL.get((i, r), ("", "off"))
        yy = RY0 + r * RP
        if st == "on":
            fill, line, col = (BLUE if i == 2 else BLUE_T1), None, WHITE
            if i < 2:
                fill = GRAY_2
        elif st == "base":
            fill, line, col = PALE, None, GRAY
        else:
            fill, line, col = WHITE, LINE, GRAY
        rect(s, GX[i], yy, GW, RH, fill=fill, line=line, lw=0.75, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
        if t:
            tb(s, GX[i], yy, GW, RH, [(t, 18, True, col)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
# 1·2단계 → 3단계 연결 화살표
for i in range(2):
    chevron(s, GX[i] + GW + 0.06, RY0 + 2 * RP - 0.02, w=0.16, h=0.52, fill=BLUE_T2)
# WAF 줄
WY = RY0 + 5 * RP + 0.04
tb(s, MX, WY, 2.45, 0.50, [("WAF", 20, True, INK)], anchor=MSO_ANCHOR.MIDDLE)
for i, (v, hot) in enumerate([("≈ 3", False), ("≈ 3  근본 한계는 그대로", False), ("3 → 1", True)]):
    tb(s, GX[i], WY, GW, 0.50, [(v, 22 if hot else 20, True, BLUE if hot else GRAY)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)

band(s, 9.60, 0.80, "결론", "NAND·SSD만 잘 만들어서는 안 됩니다. 서버와의 협력이 필수입니다", size=24,
     pills=["기술", "인재", "고객 협력"])
footer(s, "출처: 호스트 협력 규격 연혁 Open-Channel(LightNVM, FAST'17) · ZNS(NVMe TP4053, 2020-06) · FDP(NVMe TP4146, 2022-11) · Linux 6.16 write stream(2025) · "
          "WAF: 삼성·NVM Express FDP 실측(랜덤 50% 사용률 약 3 → 약 1), CacheLib+FDP 3.22 → 1.03(EuroSys'25) · 부품 이미지는 3D 렌더")
notes(s, "2장 솔루션입니다. 위쪽이 솔루션의 범위입니다. 지금까지 NAND 솔루션은 NAND 플래시의 한계를 SSD 안에서 극복해 왔습니다. 비트 에러는 ECC로, 쓰기 전에 지워야 하는 문제와 수명 편차는 FTL로 풀어 여러 NAND를 하나의 SSD로 만들었고, "
      "그다음에는 QoS 간섭을 멀티테넌트 기술로, 데이터 보호를 보안 기능으로 풀었습니다. 여기까지는 SSD를 고객 스펙대로 잘 만들면 되었습니다. "
      "그런데 높은 DWPD라는 장벽을 만났습니다. 길은 세 가지입니다. SLC 같은 비싼 셀을 쓰거나, OP를 크게 늘려 판매 용량을 줄이거나, WAF를 줄이는 것입니다. 고객은 여전히 TCO 절감을 원하므로 WAF를 줄이는 방향이 가장 적절합니다. "
      "WAF를 줄이려면 수명이 다른 데이터가 한 블록에 섞이는 문제를 풀어야 하는데, 데이터가 언제 지워질지는 SSD가 아니라 호스트가 압니다. 그래서 고객 시스템이 배치 정보를 주는 방법이 가장 효과적입니다. "
      "아래쪽이 기술 스택의 진화입니다. 1단계는 컨트롤러와 펌웨어가 NAND의 한계를 흡수했고, 2단계는 NVMe와 QoS, 보안 같은 기능을 더했지만 WAF의 근본 한계는 그대로였습니다. "
      "3단계에서 해법이 서버로 올라갑니다. Open-Channel SSD와 ZNS를 거쳐 FDP가 가장 실질적인 대안으로 떠올라 상용화되고 있고, Linux 커널에 write stream 경로가 열렸습니다. "
      "AI 스토리지에서는 LMCache, vLLM, Dynamo 같은 오픈 생태계와 협업해야 FDP를 적용할 수 있고, 고객마다 다른 워크로드에 맞추려면 워크로드 구성형 SSD가 필요합니다. 범용 실측에서 FDP는 WAF를 약 3에서 약 1로 낮췄고, CacheLib에서는 3.22에서 1.03이었습니다. "
      "결론입니다. 이제는 NAND나 SSD만 잘 만들어서는 안 되고, 서버와의 협력이 필수이며, 그것을 위한 기술과 인재와 고객 협력이 필요합니다.")

# =============================================================== 3 실행
s = new_slide()
CUR_NO[0] = 3
header(s, 3, "실행 전략", "계약에 기술 협력을 묶고, 고객 안에 사람을 두고,\nAI 데이터센터 운영자 수준의 시스템 SW 역량을 갖춰야 합니다")


def person(s, x, y, h, color):
    """단색 사람 아이콘: 머리 원 + 몸통 라운드 사각. 폭 0.62h."""
    w = 0.62 * h
    d = 0.36 * h
    rect(s, x + (w - d) / 2, y, d, d, fill=color, shape=MSO_SHAPE.OVAL)
    b = rect(s, x, y + 0.42 * h, w, 0.58 * h, fill=color, shape=MSO_SHAPE.ROUND_2_SAME_RECTANGLE)
    b.adjustments[0] = 0.45
    return w


def tag(s, x, y, text, hot):
    tb(s, x, y, 4.0, 0.36, [(text, 18, True, BLUE if hot else GRAY_2)])


def down(s, x, y):
    rect(s, x - 0.22, y, 0.44, 0.26, fill=BLUE_T2, shape=MSO_SHAPE.ISOSCELES_TRIANGLE).rotation = 180


C1, W1c = MX, 5.55
C2, W2c = 6.55, 6.90
C3, W3c = 13.66, 5.55
BENCH_Y, NOW_Y, NEXT_Y, CAP_Y = 2.98, 3.58, 5.62, 8.86

# ---- ① 계약: 물량 + 기술 협력 (Micron ↔ Anthropic)
panel_head(s, C1, W1c, 1, "계약: 물량에 기술 협력을")
wm, _ = img(s, logo_path("micron"), C1, BENCH_Y + 0.04, h=0.27)
tb(s, C1 + wm + 0.08, BENCH_Y - 0.02, 0.40, 0.38, [("↔", 20, True, GRAY)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
wa, _ = img(s, logo_path("anthropic"), C1 + wm + 0.56, BENCH_Y + 0.08, h=0.19)
tb(s, C1 + wm + 0.56 + wa + 0.14, BENCH_Y - 0.02, 1.2, 0.38, [("2026-06", 16, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE)

tag(s, C1, NOW_Y, "지금", False)
label_box(s, C1, NOW_Y + 0.46, W1c, 0.62, [("장기 물량 계약 (LTA)", 20, True, WHITE)], fill=GRAY_2)
tb(s, C1, NOW_Y + 1.16, W1c, 0.36, [("수량과 가격만 약속합니다", 18, False, GRAY)], align=PP_ALIGN.CENTER)
down(s, C1 + W1c / 2, NEXT_Y - 0.34)
tag(s, C1, NEXT_Y, "앞으로: 전략적 계약", True)
SW1 = W1c - 1.05
stack1 = [("자본 연계", "opt"), ("운영 통합", "t1"), ("공동 설계 · 최적화", "hot"), ("다년 공급 (물량)", "base")]
for i, (t, st) in enumerate(stack1):
    yy = NEXT_Y + 0.46 + i * 0.66
    if st == "opt":
        label_box(s, C1, yy, SW1, 0.56, [("자본 연계 (선택)", 18, False, GRAY)], fill=WHITE, line=GRAY_2, dash=True)
    elif st == "base":
        label_box(s, C1, yy, SW1, 0.56, [(t, 20, True, WHITE)], fill=GRAY_2)
    else:
        label_box(s, C1, yy, SW1, 0.56, [(t, 20, True, WHITE)], fill=BLUE if st == "hot" else BLUE_T1)
# 기술 협력 괄호 (운영 통합 + 공동 설계)
by0, by1 = NEXT_Y + 0.46 + 1 * 0.66, NEXT_Y + 0.46 + 2 * 0.66 + 0.56
rect(s, C1 + SW1 + 0.10, by0, 0.035, by1 - by0, fill=BLUE)
rect(s, C1 + SW1 + 0.02, by0, 0.10, 0.035, fill=BLUE)
rect(s, C1 + SW1 + 0.02, by1 - 0.035, 0.10, 0.035, fill=BLUE)
tb(s, C1 + SW1 + 0.20, by0, 0.85, by1 - by0, [("기술", 18, True, BLUE), ("협력", 18, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)
tb(s, C1, CAP_Y, W1c, 0.50, [("물량 위에 기술 협력을 쌓습니다", 20, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)

chevron(s, C2 - 0.19, 6.40, w=0.16, h=0.50)

# ---- ② 사람: 고객 안에 상주 (Palantir FDE)
panel_head(s, C2, W2c, 2, "사람: 고객 안에 상주")
img(s, logo_path("palantir"), C2, BENCH_Y + 0.01, h=0.34)
tb(s, C2 + 0.44, BENCH_Y - 0.02, W2c - 0.44, 0.38,
   [[("Palantir FDE", 18, True, INK), ("   Anthropic · OpenAI도 채택", 16, False, GRAY)]], anchor=MSO_ANCHOR.MIDDLE)

tag(s, C2, NOW_Y, "지금", False)
BY = NOW_Y + 0.46
rect(s, C2, BY, 1.70, 0.62, fill=WHITE, line=LINE, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
fit(logo_path("samsung"), C2 + 0.15, BY + 0.14, 1.40, 0.34)
label_box(s, C2 + W2c - 1.70, BY, 1.70, 0.62, [("고객", 20, True, INK)], fill=WHITE, line=LINE)
ln = rect(s, C2 + 1.78, BY + 0.30, W2c - 3.56, 0.03, fill=GRAY_2)
doc = rect(s, C2 + W2c / 2 - 0.22, BY + 0.02, 0.44, 0.56, fill=WHITE, line=GRAY_2, lw=1.25, shape=MSO_SHAPE.FOLDED_CORNER)
tb(s, C2, NOW_Y + 1.16, W2c, 0.36, [("스펙 문서 · 간헐적 미팅: 명시된 요구만 오갑니다", 18, False, GRAY)], align=PP_ALIGN.CENTER)
down(s, C2 + W2c / 2, NEXT_Y - 0.34)
tag(s, C2, NEXT_Y, "앞으로: 고객 상주 협업 (FDE)", True)

# 삼성 본사 줄 → 세로 순환 화살표 → 고객 경계
SBY = NEXT_Y + 0.46
rect(s, C2, SBY, W2c, 0.58, fill=WHITE, line=LINE, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
fit(logo_path("samsung"), C2 + 0.22, SBY + 0.15, 1.45, 0.28, align="left")
tb(s, C2 + 1.95, SBY, W2c - 2.2, 0.58, [("제품 · 로드맵", 18, True, INK)], anchor=MSO_ANCHOR.MIDDLE)
BX0, BY0, BW = C2, SBY + 1.10, W2c
BH = CAP_Y - 0.12 - BY0
rect(s, BX0, BY0, BW, BH, fill=TINT, line=BLUE, lw=1.5, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
ph = 0.64
pod_x0 = BX0 + 0.35
pod_w = 3 * (0.62 * ph) + 2 * 0.10
pc = pod_x0 + pod_w / 2
AY0, AY1 = SBY + 0.62, BY0 + 0.40
rect(s, pc - 0.46, AY0, 0.34, AY1 - AY0, fill=BLUE, shape=MSO_SHAPE.DOWN_ARROW)
rect(s, pc + 0.12, AY0, 0.34, AY1 - AY0, fill=BLUE_T1, shape=MSO_SHAPE.UP_ARROW)
tb(s, C2, AY0 + 0.02, pc - 0.56 - C2, 0.40, [("사람", 18, True, BLUE)], align=PP_ALIGN.RIGHT, anchor=MSO_ANCHOR.MIDDLE)
tb(s, pc + 0.58, AY0 + 0.02, 3.4, 0.40, [("실제 요구 → 제품", 18, True, BLUE_T1)], anchor=MSO_ANCHOR.MIDDLE)
tb(s, BX0 + BW - 3.2, BY0 + 0.10, 3.0, 0.36, [("고객 AI 데이터센터", 18, True, BLUE)], align=PP_ALIGN.RIGHT)
py = BY0 + 0.50
px = pod_x0
for k in range(3):
    px += person(s, px, py, ph, BLUE) + 0.10
tb(s, pod_x0 - 0.3, py + ph + 0.06, pod_w + 0.6, 0.36, [("삼성 Pod", 18, True, BLUE)], align=PP_ALIGN.CENTER)
gw = 2 * (0.62 * ph) + 0.10
gx = BX0 + BW - 1.55 - gw
qx = gx
for k in range(2):
    qx += person(s, qx, py, ph, GRAY_2) + 0.10
tb(s, gx - 0.55, py + ph + 0.06, gw + 1.1, 0.36, [("고객 엔지니어", 18, True, GRAY)], align=PP_ALIGN.CENTER)
mid_x0, mid_x1 = pod_x0 + pod_w + 0.15, gx - 0.15
rect(s, mid_x0, py + 0.22, mid_x1 - mid_x0, 0.30, fill=BLUE_T2, shape=MSO_SHAPE.LEFT_RIGHT_ARROW)
tb(s, mid_x0, py + 0.58, mid_x1 - mid_x0, 0.34, [("매일 함께", 16, True, BLUE)], align=PP_ALIGN.CENTER)
fit(part("server"), BX0 + BW - 1.45, py - 0.02, 1.25, 0.78)
tb(s, C2, CAP_Y, W2c, 0.50, [("고객 안에서 실제 요구를 찾고, 수요를 함께 만듭니다", 20, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)

chevron(s, C3 - 0.19, 6.40, w=0.16, h=0.50)

# ---- ③ 역량: AI 데이터센터 운영자의 눈
panel_head(s, C3, W3c, 3, "역량: 고객처럼 운영하는 눈")
tb(s, C3, BENCH_Y - 0.02, W3c, 0.38, [[("고객의 지표  ", 16, False, GRAY), ("토큰당 비용 · 전력 · GPU 가동률", 18, True, INK)]], anchor=MSO_ANCHOR.MIDDLE)
LW3, CWN, G3, CWF = 1.70, 1.20, 0.10, 2.55
cxn, cxf = C3 + LW3, C3 + LW3 + CWN + G3
tb(s, cxn, NOW_Y, CWN, 0.36, [("지금", 18, True, GRAY_2)], align=PP_ALIGN.CENTER)
tb(s, cxf, NOW_Y, CWF, 0.36, [("필요한 기술", 18, True, BLUE)], align=PP_ALIGN.CENTER)
# (층, 지금, 지금 상태, 필요한 대표 기술, 필요 칸 색)
layers3 = [("AI DC 운영", "없음", "off", "TCO 모델 · 추론 SLO", BLUE),
           ("KV 캐시 SW", "LMCache", "part", "Dynamo · Mooncake", BLUE),
           ("커널 · I/O", "일부", "part", "io_uring · GDS · NIXL", BLUE),
           ("SSD FW", "강점", "on", "FDP · WAF 텔레메트리", BLUE_T1),
           ("NAND", "강점", "on", "", BLUE_T2)]
RY3, RP3, RH3 = NOW_Y + 0.46, 0.70, 0.60
for r, (nm, now_t, st, need, col) in enumerate(layers3):
    yy = RY3 + r * RP3
    gap = r < 3
    tb(s, C3, yy, LW3 - 0.08, RH3, [(nm, 18, True, BLUE if gap else GRAY)], anchor=MSO_ANCHOR.MIDDLE)
    if st == "on":
        label_box(s, cxn, yy, CWN, RH3, [(now_t, 18, True, WHITE)], fill=GRAY_2)
    elif st == "part":
        label_box(s, cxn, yy, CWN, RH3, [(now_t, 18, True, GRAY)], fill=PALE)
    else:
        label_box(s, cxn, yy, CWN, RH3, [(now_t, 18, True, GRAY)], fill=WHITE, line=GRAY_2, dash=True)
    if need:
        label_box(s, cxf, yy, CWF, RH3, [(need, 17, True, WHITE)], fill=col)
    else:
        rect(s, cxf, yy, CWF, RH3, fill=col, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
EY = RY3 + 5 * RP3 + 0.10
tb(s, C3, EY, W3c, 1.10,
   [[("LMCache: ", 18, False, GRAY), ("삼성 Committer · FDP 배치 머지", 18, True, INK)],
    [("Mooncake · FlexKV · Dynamo: 기여 0", 18, False, GRAY)]], spacing=1.05)
tb(s, C3, CAP_Y, W3c, 0.50, [("시스템 SW와 AI 데이터센터 운영 역량", 20, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)

band(s, 9.60, 0.80, "시작", "전략 고객 1~2사와 기술 협력 계약 · Co-Design Pod 상주 · 시스템 SW 전문가 채용", size=24)
footer(s, "벤치마크: Micron ↔ Anthropic 전략적 계약(2026-06-22: 공동 최적화 · 다년 공급 · 운영 통합 · 전략 투자, 재무 조건 비공개) · Palantir FDE(고객 상주, 한 고객에 많은 능력, 성과로 평가) · "
          "KV 캐시 관리자 기여는 공개 저장소 커밋 기준(2026-09-28, LMCache PR #4016) · 인터뷰: 신문섭(Bain), 송용호 · 로고는 식별 표시")
notes(s, "3장 실행 전략입니다. HBM의 교훈은 고객과 함께 수요를 만드는 기업이 이긴다는 것이었습니다. 그렇게 하려면 세 가지가 바뀌어야 합니다. "
      "첫째, 계약입니다. 지금 고객과의 계약은 장기 물량 계약, 즉 수량과 가격의 약속입니다. Micron은 2026년 6월 Anthropic과 맺은 전략적 계약에서 다년 공급 위에 HBM·DRAM·데이터센터 SSD를 Claude의 학습·추론 워크로드에 맞춰 함께 설계하고 최적화하는 공동 작업, "
      "그리고 Micron 엔지니어링·제조 운영에 Claude를 들이는 운영 통합을 한 계약으로 묶었습니다. Anthropic Series H 전략 투자도 함께였지만 이는 선택지로 둡니다. 우리도 물량 위에 기술 협력을 쌓아야 합니다. "
      "둘째, 사람입니다. 지금은 스펙 문서와 간헐적 미팅으로 협력하기 때문에 고객이 명시한 요구만 우리에게 옵니다. Palantir가 창안한 FDE는 엔지니어가 고객 환경 안에 상주하며 실제 운영 제약 아래서 시스템을 함께 만들고, 명시된 요구와 실제 요구 사이의 간극을 현장에서 메웁니다. "
      "현장에서 만든 해법이 제품의 표준 기능이 되는 순환이 생기고, 그 순환이 곧 수요를 함께 만드는 과정입니다. Anthropic과 OpenAI도 같은 방식으로 자기 고객에게 들어가고 있습니다. 우리의 Co-Design Pod가 그 역할입니다. "
      "셋째, 역량입니다. 데이터의 수명 정보는 SSD가 아니라 고객의 KV 캐시 소프트웨어 안에 있습니다. 시작은 했습니다. LMCache에는 삼성 엔지니어가 Committer로 이름을 올렸고, NVMe raw block 계층과 FDP 배치 기능을 2026년 8월에 머지했습니다. 조사한 KV 캐시 관리자 가운데 FDP 코드가 들어간 곳은 LMCache뿐입니다. "
      "하지만 NVIDIA Dynamo, Mooncake, FlexKV에는 삼성의 기여가 없습니다. 한 곳의 성공을 고객이 실제로 쓰는 여러 스택으로 넓혀야 합니다. "
      "우리가 강한 곳은 NAND와 SSD 펌웨어이고, 커널과 I/O는 일부입니다. 필요한 것은 그 위, 즉 시스템 소프트웨어와 AI 데이터센터를 직접 운영하는 고객의 눈입니다. 고객은 토큰당 비용, 전력, GPU 가동률로 말합니다. 그 수준의 전문성을 갖춘 사람을 뽑고 길러야 합니다. "
      "시작은 전략 고객 한두 곳과 기술 협력을 포함한 계약, Co-Design Pod 상주, 시스템 소프트웨어 전문가 채용입니다.")

prs.save(os.path.abspath(OUT))
print(f"생성 완료: {os.path.abspath(OUT)} ({len(prs.slides._sldIdLst)}장)")
