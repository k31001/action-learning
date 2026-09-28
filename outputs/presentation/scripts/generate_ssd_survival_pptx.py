"""다운턴에서 배운 SSD 생존 전략: 3장 요약 덱 (2026-09-28 v1.0).

제목 3개를 이어 읽으면 한 문단이 된다:
  1 배경  HBM의 교훈은 고객과 함께 수요를 읽는 것이며, 다음 수요는 높은 DWPD를 요구하는 AI 스토리지입니다
  2 솔루션 NAND의 한계는 SSD 안에서 풀어 왔지만, DWPD 장벽은 서버와 함께 WAF를 낮춰야 풀립니다
  3 실행  기술 · 인재 · 고객 협력을 3단계로 쌓아 워크로드 구성형 SSD로 AI 스토리지를 선점합니다

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
header(s, 3, "실행 전략", "기술 · 인재 · 고객 협력을 3단계로 쌓아,\n워크로드 구성형 SSD로 AI 스토리지를 선점합니다")

PX = GX
PH_Y = 2.36
phases = [("1단계", "2026 하반기", "디바이스를 준비합니다"),
          ("2단계", "2027", "워크로드로 최적화합니다"),
          ("3단계", "2028~", "고객 시스템과 함께 설계합니다")]
for i, (a, when, what) in enumerate(phases):
    hot = i == 2
    sp = rect(s, PX[i], PH_Y, GW + (0.20 if i < 2 else 0), 0.92, fill=BLUE if hot else (BLUE_T1 if i == 1 else BLUE_T2),
              shape=MSO_SHAPE.PENTAGON if i < 2 else MSO_SHAPE.RECTANGLE)
    col = WHITE if i > 0 else INK
    tb(s, PX[i] + 0.25, PH_Y, GW - 0.4, 0.92,
       [[(a + "  ", 20, True, col), (when, 18, False, col)], [(what, 20, True, col)]], anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)
# 계약 창
cw_x0, cw_x1 = PX[0] + GW * 0.45, PX[1] + GW * 0.55
rect(s, cw_x0, 3.36, cw_x1 - cw_x0, 0.05, fill=BLUE)
tb(s, cw_x0 - 0.5, 3.44, cw_x1 - cw_x0 + 1.0, 0.36, [("계약의 창: 2026 4분기 ~ 2027 상반기", 18, True, BLUE)], align=PP_ALIGN.CENTER)

ROWS_Y = [3.92, 5.60, 7.28]
ROW_H = 1.56
rows = [("기술", "지표: 고객 시스템의 FDP 활성 용량"),
        ("인재", "지표: 업스트림 머지 건수"),
        ("고객 협력", "지표: 워크로드를 공유한 고객 수")]
for r, (nm, kpi) in enumerate(rows):
    y = ROWS_Y[r]
    rect(s, MX, y, 2.40, ROW_H, fill=TINT, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
    tb(s, MX + 0.18, y + 0.14, 2.10, 0.50, [(nm, 24, True, BLUE)])
    tb(s, MX + 0.18, y + 0.66, 2.10, 0.84, [(kpi, 16, False, GRAY)], spacing=1.0)

# 기술 줄: 계단
y0 = ROWS_Y[0]
steps = [("출하 시 구성 SKU", "OP · SLC 비율 · RUH 16+", 0.95),
         ("운영 중 조정", "배치 정책 · GC 강도 · WAF 감시", 1.25),
         ("워크로드 구성형 플랫폼", "런타임 WAF 대응 · 고객별 운영점", ROW_H)]
for i, (a, b, hh) in enumerate(steps):
    hot = i == 2
    rect(s, PX[i], y0 + ROW_H - hh, GW, hh, fill=BLUE if hot else (BLUE_T1 if i == 1 else BLUE_T2), shape=MSO_SHAPE.ROUNDED_RECTANGLE)
    col = INK if i == 0 else WHITE
    tb(s, PX[i] + 0.22, y0 + ROW_H - hh, GW - 0.44, hh, [(a, 20, True, col), (b, 18, False, col)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.05)
# 인재 줄
talent = [("시스템 SW 전문가 채용", "고객 시스템을 아는 사람 · 미주 현지"),
          ("FW·FTL → 호스트 SW 전환", "미국 로테이션 6~12개월 · 머지로 수료"),
          ("오픈소스 메인테이너", "호명되는 아키텍트")]
cust = [("등대 고객 1~2사 선정", "Co-Design Pod(FDE) 상주"),
        ("LMCache · vLLM · Dynamo", "FDP 경로 업스트림 기여"),
        ("전략적 협약 (SCA)", "공동 설계 · 다년 공급 · 워크로드 접근")]
for r, items in ((1, talent), (2, cust)):
    y = ROWS_Y[r]
    for i, (a, b) in enumerate(items):
        hot = i == 2
        rect(s, PX[i], y, GW, ROW_H, fill=WHITE, line=BLUE if hot else LINE, lw=1.75 if hot else 1.0, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
        tb(s, PX[i] + 0.22, y, GW - 0.44, ROW_H, [(a, 20, True, BLUE if hot else INK), (b, 18, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.05)
# 대상 고객 로고
LG_Y = 8.95
tb(s, MX, LG_Y, 2.40, 0.50, [("대상 고객", 18, True, GRAY)], anchor=MSO_ANCHOR.MIDDLE)
lx = PX[0]
for nm, hh in (("nvidia", 0.36), ("meta", 0.34), ("google", 0.40), ("microsoft", 0.36), ("aws", 0.42)):
    w, _ = img(s, logo_path(nm), lx, LG_Y + (0.50 - hh) / 2, h=hh)
    lx += w + 0.55

band(s, 9.60, 0.80, "90일", "KV-ready SSD 정의 · 등대 고객 1~2사 선정 · Co-Design Pod 구성으로 시작합니다", size=24)
footer(s, "근거: 과제팀 실행 전략(Phase 1 디바이스 → 2 워크로드 최적화 → 3 공동 설계), 워크로드 구성형 SSD 보고서 v0.2(출하 시 구성 → 운영 중 조정), "
          "계약의 창은 2027 하반기 공급 완화 전망(TrendForce 2026-07) 기준 · 인터뷰: 신문섭(Bain), 송용호 · 로고는 식별 표시")
notes(s, "3장 실행 전략입니다. 2장의 결론인 기술, 인재, 고객 협력 세 축을 세 단계로 쌓습니다. "
      "기술은 계단입니다. 1단계는 출하 시 구성 SKU로 OP와 SLC 비율, 배치 핸들 16개 이상을 고객이 고르게 합니다. 2단계는 운영 중 조정으로 배치 정책과 GC 강도를 조절하고 WAF를 감시합니다. "
      "3단계가 워크로드 구성형 플랫폼으로, 런타임 WAF 대응과 고객별 운영점을 제공합니다. 용량과 내구성까지 운영 중에 바꾸는 워크로드 적응형은 그 다음의 장기 과제입니다. "
      "인재는 고객 시스템을 아는 시스템 소프트웨어 전문가를 미주 현지에서 뽑고, 펌웨어와 FTL 엔지니어를 호스트 소프트웨어로 전환시키며, 오픈소스 메인테이너와 고객이 이름으로 부르는 아키텍트를 만듭니다. "
      "고객 협력은 워크로드를 여는 등대 고객 한두 곳을 골라 Co-Design Pod를 상주시키고, LMCache, vLLM, Dynamo에 FDP 경로를 업스트림으로 넣고, 공동 설계와 다년 공급, 워크로드 접근을 한 계약에 묶는 전략적 협약으로 갑니다. "
      "시계가 중요합니다. 공급자 우위는 2027년 하반기 공급 완화 전까지이므로, 워크로드 접근권을 계약으로 고정할 창은 2026년 4분기부터 2027년 상반기입니다. "
      "첫 90일은 KV-ready SSD 정의, 등대 고객 선정, Co-Design Pod 구성입니다. HBM에서 배운 것처럼, 이번에는 고객과 함께 수요를 만듭니다.")

prs.save(os.path.abspath(OUT))
print(f"생성 완료: {os.path.abspath(OUT)} ({len(prs.slides._sldIdLst)}장)")
