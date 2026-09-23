"""QLC eSSD 전략 — 6장 덱 생성 v5.2 (2026-09-19: v5.1 순서 재편 + 제목 6개를 이어 읽으면 한 문단이 되도록 개편, 비유 표현 제거).

제목 문단(v5.2): AI 추론 수요는 QLC에 고용량·1~3 DWPD를 요구하며, 신뢰성·내구성 두 축의 해법이 필요합니다. 첫째 축 신뢰성은 다이 수 8배 증가로 요구가 8배 엄격해지나, SSD 내부 설계로 충족됩니다. 둘째 축 내구성은 SSD 단독 최적화로 WAF ≈3에 머물렀고, 잔여 변수 WAF는 호스트가 결정합니다. 따라서 WAF 저감은 고객 시스템까지 3단계 공동 설계 역량을 요구하며, 삼성은 현재 1단계입니다. 3단계 진입은 워크로드를 개방하는 고객에 FDE를 집중하고, 그 외는 업스트림·규격으로 협업합니다. 유효 DWPD 보증은 WAF 변동 리스크를 수반하므로 텔레메트리 기반 조건부 보증으로 설계합니다.


스토리라인(v5.1): ① 문제(왜 지금, 무엇이 필요한가: 다운턴 교훈 + AI 수요로 대용량·높은 DWPD로 이동하는 요구 → 고용량화의 두 축) →
  ② 신뢰성(첫째 축 다이 8배·고장률: SSD 내부 설계로 충족) → ③ 해법 사다리(둘째 축 DWPD: SSD 내부에서 충족되지 않았고 잔여 변수 WAF는 호스트가 결정 →
  고객 협업과 새로운 역량 필요) → ④ 역량(3단계) → ⑤ 실행(누구와 어디서) → ⑥ 보증·SLA(무엇을 보증하나)
시각 장치: 헤더 스토리 레일 story_rail() / 결론 밴드 다음 장 포인터 band(next_step) / 6장 결론 밴드 요약 체인 band_chain()
S1 문제: 다운턴 타임라인(DT19·DT23 + QLC 이정표) + 교훈 카드 3(수요 센싱·고객 협업·의사결정 시점) + 요구의 이동 패널 + 문제 패널(두 축 → 2장·3장)
S2 신뢰성(v5.0 신설, v5.1에서 2장으로): 다이 수·FFR 상한 차트 + SSD 내부 해법 타일 3 + 호스트 관측(점선)
S3 해법 사다리(solution_ladder_slide 공용, 이관 매트릭스): 열 = 요구 → 단품 → SSD 계층 → 호스트·시스템 계층, 행 = 내구성 축 + 변수 스트립
S4 역량: 격차 타일 4 + Phase 1·2·3 스택 + 진행 바 + 결론 밴드
S5 실행: 고객 선별 표(FDE 상주 조건) + 단계별 통과 조건 + 개발실 내부 실행 + 판돈·비용
S6 보증·SLA: 유효 DWPD 곡선 + 리스크 시나리오 3 + 보증 설계 원칙 5 + 6장 요약 체인
구 3장(고객의 QLC 채택 동인)은 v4.0에서 1장 문제 제기 패널로 흡수(그래프는 보고서 그림으로 유지, 코드는 git 이력)."""
import os

from PIL import Image
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.dml import MSO_LINE_DASH_STYLE
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.oxml.ns import qn
from pptx.util import Emu, Inches, Pt

# ---- 디자인 토큰 ----
BLUE = RGBColor(0x14, 0x28, 0xA0)
BLUE_T1 = RGBColor(0x3C, 0x5A, 0xC8)
BLUE_T2 = RGBColor(0xAA, 0xB8, 0xE8)
INK = RGBColor(0x1A, 0x1A, 0x1A)
GRAY = RGBColor(0x55, 0x55, 0x55)
GRAY_2 = RGBColor(0x8A, 0x8A, 0x8A)
LINE = RGBColor(0xD9, 0xD9, 0xD9)
TINT = RGBColor(0xF4, 0xF6, 0xFC)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
RED = RGBColor(0xD9, 0x30, 0x25)
FONT = os.environ.get("FONT_LATIN", "Arial")
FONT_EA = os.environ.get("FONT_EA", FONT)

MX = 0.79
CW = 18.42
RIGHT = MX + CW
GRADE = "[문서등급 표기]"
TOTAL = 7

HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(HERE, "..", "assets")
LOGOS = os.path.join(ASSETS, "logos")
CHART = os.path.join(ASSETS, "qlc_demand_share_revenue_slide.png")
CHART_ASPECT = 3960 / 1232
OUT = os.environ.get("OUT_PATH") or os.path.join(HERE, "..", "qlc-ssd-strategy.pptx")

prs = Presentation()
prs.slide_width = Emu(18288000)   # 20.00 in
prs.slide_height = Emu(10287000)  # 11.25 in
BLANK = prs.slide_layouts[6]


# ---------------------------------------------------------------- helpers
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


def tb(slide, x, y, w, h, paras, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP, wrap=True, spacing=1.12):
    """paras: [(text, size, bold, color)] 또는 [[(text,size,bold,color), ...]] — 항목당 문단 1개."""
    box = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = box.text_frame
    tf.word_wrap = wrap
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


def rect(slide, x, y, w, h, fill=None, line=None, line_w=0.75, shape=MSO_SHAPE.RECTANGLE):
    sp = slide.shapes.add_shape(shape, Inches(x), Inches(y), Inches(w), Inches(h))
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
        sp.line.width = Pt(line_w)
    return sp


STORY = [("1", "문제", "왜 지금인가"), ("2", "신뢰성", "다이 고장률"), ("3", "내구성", "WAF"),
         ("4", "배치 힌트", "WAF 저감"), ("5", "역량", "3단계"), ("6", "실행", "누구와"),
         ("7", "대응 기술", "무엇을 확보")]


def story_rail(slide, current, y=0.88, h=0.30):
    """스토리 레일(킥커 자리): 5장을 번호 원 + 장 이름 + 질문으로 나열하고 밑줄 진행 바로 현재 위치를 표시."""
    lab_w = 2.35
    tb(slide, MX, y, lab_w, h, [("QLC eSSD 전략", 18, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
    x0 = MX + lab_w
    step_w = (RIGHT - x0) / len(STORY)
    d = 0.27
    for i, (no, name, q) in enumerate(STORY):
        n = i + 1
        x = x0 + i * step_w
        cur, done = n == current, n < current
        rect(slide, x, y + h + 0.05, step_w - 0.10, 0.045, fill=BLUE if (cur or done) else LINE)
        cy = y + (h - d) / 2
        if cur:
            rect(slide, x, cy, d, d, fill=BLUE, shape=MSO_SHAPE.OVAL)
            nc, col = WHITE, BLUE
        elif done:
            rect(slide, x, cy, d, d, fill=BLUE_T2, shape=MSO_SHAPE.OVAL)
            nc, col = INK, GRAY
        else:
            rect(slide, x, cy, d, d, fill=WHITE, line=LINE, line_w=1.0, shape=MSO_SHAPE.OVAL)
            nc, col = GRAY_2, GRAY_2
        tb(slide, x, cy, d, d, [(no, 11, True, nc)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
        tb(slide, x + d + 0.10, y, step_w - d - 0.22, h, [[(name + "  ", 13, True, col), (q, 12, False, col)]],
           anchor=MSO_ANCHOR.MIDDLE)


def header(slide, kicker, title, lead):
    """kicker: 문자열(킥커 텍스트) 또는 정수(스토리 레일의 현재 장 번호)."""
    tb(slide, MX, 0.46, 6.0, 0.34, [("삼성전자 메모리사업부", 18, True, BLUE)])
    tb(slide, 13.21, 0.46, 6.0, 0.34, [(GRADE, 18, False, GRAY)], align=PP_ALIGN.RIGHT)
    if isinstance(kicker, int):
        story_rail(slide, kicker)
    else:
        tb(slide, MX, 0.93, CW, 0.34, [(kicker, 18, True, BLUE)])
    tb(slide, MX, 1.33, CW, 0.62, [(title, 30, True, INK)])
    tb(slide, MX, 2.04, CW, 0.44, [lead] if isinstance(lead, list) else [(lead, 20, False, GRAY)])
    rect(slide, MX, 2.62, CW, 0.014, fill=LINE)


def footer(slide, source, no):
    tb(slide, MX, 10.49, 15.6, 0.34, [(source, 16, False, GRAY)])
    tb(slide, 17.55, 10.49, 1.66, 0.34, [(f"{no:02d} / {TOTAL:02d}", 18, False, GRAY)], align=PP_ALIGN.RIGHT)


def band(slide, y, h, label, main, main_size=22, next_step=None):
    """결론 밴드. next_step=n이면 우측에 '다음 장 → n장 이름 · 질문' 포인터를 그려 스토리라인 연결을 표시."""
    rect(slide, MX, y, CW, h, fill=BLUE)
    tb(slide, MX + 0.45, y, 1.6, h, [(label, 18, False, WHITE)], anchor=MSO_ANCHOR.MIDDLE)
    ptr_w = 3.70 if next_step else 0.0
    tb(slide, MX + 2.0, y, CW - 2.4 - ptr_w, h, [(m, main_size, True, WHITE) for m in main.split("\n")],
       anchor=MSO_ANCHOR.MIDDLE, spacing=1.08)  # "\n"으로 의미 단위 줄바꿈 지정 가능
    if next_step:
        no, name, q = STORY[next_step - 1]
        px, ph = RIGHT - 0.30 - (ptr_w - 0.30), h - 0.24
        rect(slide, px, y + 0.12, ptr_w - 0.30, ph, fill=None, line=WHITE, line_w=1.0)
        rect(slide, px, y + 0.12, 0.06, ph, fill=WHITE)
        tb(slide, px + 0.22, y + 0.12, ptr_w - 0.30 - 0.32, ph,
           [("다음 장 →", 10.5, False, BLUE_T2), (f"{no}장 {name} · {q}", 12.5, True, WHITE)],
           anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)


def band_chain(slide, y, h, label, chips, head_size=12.75, body_size=11.25):
    """5장 요약 체인 밴드: chips=[(머리글, 본문)] 를 화살표로 연결. 마지막 장의 결론 밴드용(스토리라인 전체를 한눈에)."""
    rect(slide, MX, y, CW, h, fill=BLUE)
    tb(slide, MX + 0.45, y, 1.6, h, [(label, 18, False, WHITE)], anchor=MSO_ANCHOR.MIDDLE)
    x0, arrow_w, gap = MX + 2.0, 0.24, 0.10
    n = len(chips)
    cw_ = (CW - 2.4 - (n - 1) * (arrow_w + 2 * gap)) / n
    ch, cy = h - 0.28, y + 0.14
    x = x0
    for i, (head, body) in enumerate(chips):
        last = i == n - 1
        rect(slide, x, cy, cw_, ch, fill=WHITE if last else None, line=WHITE, line_w=1.0)
        tb(slide, x + 0.16, cy + 0.06, cw_ - 0.32, ch - 0.1,
           [(head, head_size, True, BLUE if last else WHITE)] + [(b, body_size, last, INK if last else WHITE) for b in body.split("\n")],
           anchor=MSO_ANCHOR.MIDDLE, spacing=1.02)
        if not last:
            rect(slide, x + cw_ + gap, cy + ch / 2 - 0.10, arrow_w, 0.20, fill=WHITE, shape=MSO_SHAPE.RIGHT_ARROW)
        x += cw_ + arrow_w + 2 * gap


def quote(slide, x, y, w, h, text, who, size=12.75):
    """인용 카드: 좌측 파란 바 + 「인용문」 + 출처. 전략의 신빙성용(사내·외부 전문가 발언)."""
    rect(slide, x, y, 0.06, h, fill=BLUE)
    tb(slide, x + 0.22, y, w - 0.22, h,
       [("「" + text + "」", size, True, INK), (who, size - 1.5, False, GRAY_2)],
       anchor=MSO_ANCHOR.MIDDLE, spacing=1.06)


def notes(slide, text):
    slide.notes_slide.notes_text_frame.text = text


_LOGO_ASPECT = {}


def _logo_w(name, h):
    path = os.path.join(LOGOS, f"{name}.png")
    if name not in _LOGO_ASPECT:
        with Image.open(path) as im:
            _LOGO_ASPECT[name] = im.size[0] / im.size[1]
    return h * _LOGO_ASPECT[name]


def logo(slide, name, x, y, h):
    w = _logo_w(name, h)
    slide.shapes.add_picture(os.path.join(LOGOS, f"{name}.png"), Inches(x), Inches(y), height=Inches(h))
    return w


def _chip_w(text, size):
    return 0.20 + 0.105 * size / 13.5 * len(text) * 0.62 + 0.20


def chip(slide, text, x, y, h, size=13.5):
    """공식 로고를 못 구한 기업의 워드마크 칩. 폭 반환."""
    w = _chip_w(text, size)
    rect(slide, x, y, w, h, fill=WHITE, line=GRAY_2, line_w=0.75)
    tb(slide, x, y, w, h, [(text, size, True, INK)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    return w


def logo_row(slide, items, x, y, h, gap=0.22, max_w=None, chip_size=13.5):
    """items: [('logo','nvidia') | ('chip','VAST Data')] 가로 나열. max_w 초과 시 균일 축소. 끝 x 반환."""
    total = sum((_logo_w(n, h) if k == "logo" else _chip_w(n, chip_size)) for k, n in items) + gap * (len(items) - 1)
    k_scale = 1.0
    if max_w is not None and total > max_w:
        k_scale = max_w / total
    h2, gap2, cs2 = h * k_scale, gap * k_scale, max(11.0, chip_size * k_scale)
    cx = x
    for kind, name in items:
        if kind == "logo":
            cx += logo(slide, name, cx, y + (h - h2) / 2, h2) + gap2
        else:
            cx += chip(slide, name, cx, y - 0.02, h + 0.04, size=cs2) + gap2
    return cx


STATE_STYLE = {
    "own": dict(fill=BLUE, line=None, color=WHITE, bold=True),
    "touch": dict(fill=BLUE_T2, line=None, color=INK, bold=True),
    "none": dict(fill=WHITE, line=LINE, color=GRAY, bold=False),
}


def stack(slide, x, y, w, labels, states, layer_h=0.42, gap=0.07, size=13.5):
    """고객 시스템 계층 스택. states: 'own' | 'touch' | 'none'. 각 층의 y 반환."""
    ys = []
    for i, (lab, st) in enumerate(zip(labels, states)):
        ly = y + i * (layer_h + gap)
        stl = STATE_STYLE[st]
        rect(slide, x, ly, w, layer_h, fill=stl["fill"], line=stl["line"], line_w=0.75)
        tb(slide, x + 0.15, ly, w - 0.3, layer_h, [(lab, size, stl["bold"], stl["color"])],
           anchor=MSO_ANCHOR.MIDDLE)
        ys.append(ly)
    return ys


def person(slide, x, y, h, color=BLUE):
    """단색 사람 아이콘 (머리 원 + 몸통). x,y = 좌상단, h = 전체 높이."""
    d = h * 0.38
    rect(slide, x + (h * 0.7 - d) / 2, y, d, d, fill=color, shape=MSO_SHAPE.OVAL)
    body = rect(slide, x, y + d + h * 0.06, h * 0.7, h * 0.56, fill=color, shape=MSO_SHAPE.ROUND_2_SAME_RECTANGLE)
    try:
        body.adjustments[0] = 0.5
    except Exception:
        pass
    return h * 0.7


def v_arrow(slide, x, y, w, h, up=False, fill=BLUE):
    return rect(slide, x, y, w, h, fill=fill, shape=MSO_SHAPE.UP_ARROW if up else MSO_SHAPE.DOWN_ARROW)


# ================================================================ S1. 문제 제기 (v7.0: 교훈 하나 + 구매 기준 이동 + QLC 문제, 시각 중심)
s = prs.slides.add_slide(BLANK)
header(s, 1,
       "고객과 함께 수요를 설계한 기업이 이겼고, 지금 그 수요는 QLC에 1~3 DWPD를 요구합니다",
       "HBM이 보여 준 것은 기술의 차이가 아니라 시장을 보는 눈의 차이였습니다. 그리고 그 수요는 지금 HBM 용량을 넘어 스토리지 계층을 새로 얹고 있습니다.")

C1X, C1W = MX, 6.60
C2X, C2W = C1X + C1W + 0.24, 6.30
C3X, C3W = C2X + C2W + 0.24, RIGHT - (C2X + C2W + 0.24)
TOP, BOT = 2.80, 9.22


def sec(x, w, no, title, sub, hot=False):
    rect(s, x, TOP, w, BOT - TOP, fill=TINT if hot else WHITE, line=BLUE if hot else LINE, line_w=1.25 if hot else 0.75)
    rect(s, x, TOP, w, 0.05, fill=BLUE if hot else BLUE_T2)
    tb(s, x + 0.24, TOP + 0.16, w - 0.48, 0.30, [[(no + "  ", 13.5, True, BLUE), (title, 13.5, True, BLUE)]])
    tb(s, x + 0.24, TOP + 0.46, w - 0.48, 0.24, [(sub, 10.0, False, GRAY_2)])


# ===== ① 교훈 =====
sec(C1X, C1W, "①", "교훈 · HBM이 가르친 것", "2013 ~ 2026 · 같은 기술, 다른 판단")
ix, iw = C1X + 0.30, C1W - 0.60
TL_X0, TL_X1 = ix + 1.02, ix + iw - 0.08


def tx1(yr):
    return TL_X0 + (TL_X1 - TL_X0) * (yr - 2013.0) / 13.6


LANE_A, LANE_B = TOP + 1.92, TOP + 2.60
LBL_W = 1.92


def ev_label(cx, y, d, t, col):
    x0 = min(max(cx - LBL_W / 2, ix), ix + iw - LBL_W)
    tb(s, x0, y, LBL_W, 0.56, [(d, 9.5, True, INK)] + [(l, 9.0, False, col) for l in t.split("\n")],
       align=PP_ALIGN.CENTER, spacing=1.0)


for ly, who, col in [(LANE_A, "SK하이닉스", BLUE), (LANE_B, "삼성", GRAY_2)]:
    rect(s, TL_X0, ly, TL_X1 - TL_X0, 0.03, fill=col)
    tb(s, ix, ly - 0.14, 0.94, 0.28, [(who, 10.5, True, col)], anchor=MSO_ANCHOR.MIDDLE)
for yr in (2013, 2017, 2021, 2025):
    tb(s, tx1(yr) - 0.4, TOP + 3.86, 0.8, 0.2, [(str(yr), 9.5, False, GRAY_2)], align=PP_ALIGN.CENTER)

ev_a = [(2013.9, "2013", "AMD와 HBM 공동 개발", 0), (2022.0, "2021-10 → 2022-06", "표준보다 먼저 개발 →\nNVIDIA 최초 공급", 1),
        (2025.5, "2025-06", "DRAM 매출 1위\n1992년 이후 처음", 0)]
ev_b = [(2019.2, "2019", "시장 성장률을 과대평가로 보고\n전담 조직 후순위", 0), (2024.3, "2024-04", "전담 팀 재구성 · 5년 공백", 1),
        (2025.7, "2025-09", "12단 HBM3E 퀄 통과\n18개월 지연", 0)]
for yr, d, t, slot in ev_a:
    cx = tx1(yr)
    rect(s, cx - 0.09, LANE_A - 0.075, 0.18, 0.18, fill=BLUE, shape=MSO_SHAPE.OVAL)
    rect(s, cx - 0.008, LANE_A - 0.30, 0.016, 0.24, fill=BLUE_T2)
    ev_label(cx, LANE_A - 0.88 - slot * 0.58, d, t, GRAY)
for yr, d, t, slot in ev_b:
    cx = tx1(yr)
    rect(s, cx - 0.09, LANE_B - 0.075, 0.18, 0.18, fill=WHITE, line=GRAY_2, line_w=1.25, shape=MSO_SHAPE.OVAL)
    rect(s, cx - 0.008, LANE_B + 0.10, 0.016, 0.20, fill=LINE)
    ev_label(cx, LANE_B + 0.32 + slot * 0.58, d, t, GRAY)
tb(s, tx1(2013.2), LANE_A + 0.18, 3.4, 0.40,
   [("업계 최초 HBM2E는 삼성이 2019-03에 발표했습니다", 9.0, True, INK),
    ("기술의 차이가 아니었습니다", 9.0, False, GRAY)], spacing=1.0)

LS_Y = TOP + 4.12
rect(s, ix, LS_Y, iw, 0.86, fill=BLUE)
tb(s, ix + 0.26, LS_Y + 0.10, iw - 0.52, 0.30, [("기술이 없어서가 아니라 시장을 작게 봤기 때문입니다", 15, True, WHITE)])
tb(s, ix + 0.26, LS_Y + 0.44, iw - 0.52, 0.32,
   [("구속력 있는 규격은 표준이 아니라 고객의 사양이었습니다 · JEDEC HBM4 8 Gbps 대 NVIDIA 요구 10~13 Gbps", 10.5, False, BLUE_T2)])

HN_Y = LS_Y + 1.02
tb(s, ix, HN_Y, iw, 0.24, [("되돌릴 수 있다는 것도 같은 기록이 보여 줍니다", 10.5, True, BLUE)])
rec = [("2025-Q4", "DRAM 1위 탈환"), ("2026-02", "업계 최초 상용 HBM4 출하"), ("2026-Q2", "HBM 점유 33% · 직전 분기 +12%p")]
rw = (iw - 2 * 0.14) / 3
for i, (d, t) in enumerate(rec):
    rx = ix + i * (rw + 0.14)
    rect(s, rx, HN_Y + 0.28, rw, 0.62, fill=WHITE, line=BLUE_T2, line_w=1.0)
    tb(s, rx + 0.14, HN_Y + 0.32, rw - 0.28, 0.22, [(d, 9.5, True, BLUE)])
    tb(s, rx + 0.14, HN_Y + 0.54, rw - 0.28, 0.34, [(t, 9.5, False, GRAY)], spacing=1.0)
tb(s, ix, HN_Y + 0.98, iw, 0.24,
   [("변수는 판단을 끊지 않는 것입니다 · 다음 수요에서 같은 판단을 다시 해야 합니다", 10.0, False, GRAY)])

# ===== ② 지금 · HBM 위에 새 계층이 얹힌다 =====
sec(C2X, C2W, "②", "지금 · HBM 위에 새 계층이 얹힌다", "KV 캐시가 HBM 용량을 넘어선다")
jx, jw = C2X + 0.30, C2W - 0.60

# --- A. 구매 기준의 이동 (압축 체인) ---
tb(s, jx, TOP + 0.80, jw, 0.20, [("구매 기준은 이렇게 움직여 왔습니다", 9.5, False, GRAY_2)])
ERA_Y = TOP + 1.00
AW, EH2 = 0.24, 0.64
ew = (jw - 2 * AW) / 3
for i, (yrs, axis_, hot) in enumerate([("2008~12", "성능 · 용량당 가격", False),
                                       ("2012~21", "QoS · 지연 꼬리", False),
                                       ("2022~26", "밀도 · 전력 · 물량", True)]):
    ex = jx + i * (ew + AW)
    rect(s, ex, ERA_Y, ew, EH2, fill=BLUE if hot else WHITE, line=None if hot else LINE, line_w=0.75)
    tb(s, ex + 0.08, ERA_Y + 0.04, ew - 0.16, 0.17, [(yrs, 8.5, False, BLUE_T2 if hot else GRAY_2)], align=PP_ALIGN.CENTER)
    tb(s, ex + 0.06, ERA_Y + 0.21, ew - 0.12, 0.38, [(axis_, 10.5, True, WHITE if hot else INK)],
       align=PP_ALIGN.CENTER, spacing=1.0)
    if i < 2:
        rect(s, ex + ew + 0.04, ERA_Y + 0.24, AW - 0.08, 0.17, fill=BLUE_T2, shape=MSO_SHAPE.RIGHT_ARROW)

# --- B. 새 수요: KV 캐시가 HBM을 넘어선다 ---
SP_Y = ERA_Y + EH2 + 0.14
tb(s, jx, SP_Y, jw, 0.22, [[("그 위에 새 수요가 올라왔습니다   ", 9.5, False, GRAY_2),
                            ("KV 캐시가 HBM 용량을 넘어섭니다", 10.5, True, BLUE)]])
TIER_Y = SP_Y + 0.25
TH, TG = 0.52, 0.16
for gi, (g, nm, role, note, kind) in enumerate([
        ("G1", "GPU HBM", "80 → 288GB로 커졌지만", "단일 사용자 128K 컨텍스트가 약 40GB · 사용자 수에 비례", 0),
        ("G2", "CPU DRAM", "첫 확장", "Kioxia — DRAM만으로는 더 못 따라간다", 1),
        ("G3", "NVMe SSD", "새로 얹힌 계층", "쓰기가 몰리는 첫 대용량 계층", 2)]):
    ty = TIER_Y + gi * (TH + TG)
    on = kind == 2
    rect(s, jx, ty, jw, TH, fill=WHITE if on else (BLUE if kind == 0 else TINT),
         line=BLUE if on else (None if kind == 0 else LINE), line_w=1.5 if on else 0.75)
    rect(s, jx, ty, 0.56, TH, fill=BLUE if on else (BLUE_T1 if kind == 0 else BLUE_T2))
    tb(s, jx, ty, 0.56, TH, [(g, 11.25, True, WHITE)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    tb(s, jx + 0.70, ty + 0.05, 1.86, 0.24, [(nm, 12, True, WHITE if kind == 0 else (BLUE if on else INK))])
    tb(s, jx + 0.70, ty + 0.29, 1.86, 0.19, [(role, 8.5, False, BLUE_T2 if kind == 0 else GRAY_2)])
    tb(s, jx + 2.62, ty + 0.02, jw - 2.76, 0.48, [(note, 9.0, False, BLUE_T2 if kind == 0 else GRAY)],
       anchor=MSO_ANCHOR.MIDDLE, spacing=1.04)
    if gi < 2:
        ay = ty + TH + 0.01
        rect(s, jx + 0.20, ay, 0.16, TG - 0.02, fill=BLUE_T1, shape=MSO_SHAPE.DOWN_ARROW)
        tb(s, jx + 0.44, ay - 0.01, jw - 0.54, TG,
           [("넘친다" if gi == 0 else "다시 넘친다", 9.0, True, BLUE_T1)], anchor=MSO_ANCHOR.MIDDLE)
TB_END = TIER_Y + 3 * TH + 2 * TG
rect(s, jx, TB_END + 0.05, jw, 0.24, fill=TINT)
tb(s, jx + 0.10, TB_END + 0.05, jw - 0.20, 0.24,
   [[("대체가 아니라 증설입니다  ", 9.0, True, BLUE),
     ("같은 기간 GPU당 HBM은 192 → 288GB, 2027년 384GB로 커집니다", 9.0, False, GRAY)]],
   anchor=MSO_ANCHOR.MIDDLE)

# --- C. 근거 ---
EV_Y = TB_END + 0.39
rect(s, jx, EV_Y, jw, 1.04, fill=WHITE, line=BLUE_T2, line_w=1.0)
tb(s, jx + 0.16, EV_Y + 0.06, jw - 0.32, 0.24,
   [("「KV 캐시를 담을 HBM 용량이 한계에 도달했다」", 11.25, True, BLUE)])
tb(s, jx + 0.16, EV_Y + 0.29, jw - 0.32, 0.20,
   [("SK하이닉스 2026-07-29 실적 발표 · 같은 자리에서 GPU 인근 NAND 개발 공표", 8.75, False, GRAY)])
rect(s, jx + 0.16, EV_Y + 0.52, jw - 0.32, 0.012, fill=LINE)
sw = (jw - 0.32 - 0.14) / 2
for i, (k, v) in enumerate([("오프로드는 메인라인 코드", "LMCache 2024-08 → vLLM 2026-05"),
                            ("NAND 비트 중 eSSD 비중", "1년 만에 26% → 48%")]):
    sx = jx + 0.16 + i * (sw + 0.14)
    tb(s, sx, EV_Y + 0.58, sw, 0.17, [(k, 8.5, False, GRAY_2)])
    tb(s, sx, EV_Y + 0.74, sw, 0.24, [(v, 9.5, True, BLUE)], spacing=1.0)

# --- D. 그래서 SSD에 오는 요구 ---
KV_Y = EV_Y + 1.16
KH = BOT - 0.02 - KV_Y
rect(s, jx, KV_Y, jw, KH, fill=WHITE, line=BLUE, line_w=1.25)
dwd = 1.66
tb(s, jx + 0.18, KV_Y + 0.07, jw - dwd - 0.40, 0.27, [("그래서 SSD에 오는 요구는 내구성입니다", 12.75, True, BLUE)])
tb(s, jx + 0.18, KV_Y + 0.36, jw - dwd - 0.40, 0.38,
   [("추론 수요 CAGR 86% · 삼성은 V-NAND 캐파의 약 60%를 CMX 대응에 배정했습니다", 9.0, False, GRAY)],
   spacing=1.04)
rect(s, jx + jw - dwd - 0.14, KV_Y + 0.12, dwd, KH - 0.24, fill=TINT)
tb(s, jx + jw - dwd - 0.14, KV_Y + 0.12, dwd, KH - 0.24,
   [("요구 DWPD", 9.5, False, GRAY_2), ("1 ~ 3", 21, True, BLUE)],
   align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)

# ===== ③ 문제 =====
sec(C3X, C3W, "③", "문제 · 고객은 QLC를 원한다", "TLC면 되는데 왜 QLC인가", hot=True)
kx, kw = C3X + 0.30, C3W - 0.60
tb(s, kx, TOP + 0.86, kw, 0.24, [("같은 요구 1~3 DWPD를 두 방법으로 볼 수 있습니다", 10.0, False, GRAY)])
cmp_y = TOP + 1.14
cw2 = (kw - 0.16) / 2
for i, (nm, sub, rows, ok) in enumerate([
        ("TLC", "요구는 만족", [("내구성", "1 ~ 3 DWPD", True), ("용량 밀도", "61TB급", False), ("TB당 가격", "기준", False)], True),
        ("QLC", "요구가 부족", [("내구성", "0.6 DWPD", False), ("용량 밀도", "245TB급 · 4배", True), ("TB당 가격", "20~30% 저렴", True)], False)]):
    cx = kx + i * (cw2 + 0.16)
    rect(s, cx, cmp_y, cw2, 1.96, fill=WHITE, line=BLUE if not ok else LINE, line_w=1.25 if not ok else 0.75)
    rect(s, cx, cmp_y, cw2, 0.05, fill=BLUE if not ok else GRAY_2)
    tb(s, cx + 0.16, cmp_y + 0.10, cw2 - 0.32, 0.30, [(nm, 15, True, BLUE if not ok else GRAY)])
    tb(s, cx + 0.16, cmp_y + 0.40, cw2 - 0.32, 0.22, [(sub, 9.5, False, GRAY_2)])
    ry = cmp_y + 0.66
    for lab, val, good in rows:
        tb(s, cx + 0.16, ry, cw2 - 0.32, 0.18, [(lab, 8.75, False, GRAY_2)])
        tb(s, cx + 0.16, ry + 0.16, cw2 - 0.32, 0.24, [(val, 11.25, True, BLUE if good else GRAY)])
        ry += 0.42

GAP_Y = cmp_y + 2.12
tb(s, kx, GAP_Y, kw, 0.22, [("QLC가 채워야 할 거리", 10.0, False, GRAY_2)])
tb(s, kx, GAP_Y + 0.22, kw, 0.66, [("2 ~ 5배", 34, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
tb(s, kx, GAP_Y + 0.88, kw, 0.24, [("요구 1~3 DWPD ÷ 현 QLC 정격 0.6", 9.5, False, GRAY)])
Q_Y = GAP_Y + 1.22
rect(s, kx, Q_Y, kw, BOT - 0.24 - Q_Y, fill=BLUE)
tb(s, kx + 0.22, Q_Y + 0.14, kw - 0.44, BOT - 0.52 - Q_Y,
   [("고객은 QLC의 밀도와 원가를 원하면서 TLC의 내구성을 요구합니다", 13.5, True, WHITE),
    ("이 간극을 메우는 것이 우리가 풀 문제입니다", 11.25, False, BLUE_T2)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.12)

band(s, 9.42, 0.80, "문제",
     "HBM의 교훈은 수요를 고객과 함께 설계하는 것이었고, 그 수요가 지금 HBM 위에 새 스토리지 계층을 얹고 있습니다.\n"
     "고객은 QLC의 밀도와 원가로 TLC의 1~3 DWPD를 요구하며, 현 정격 0.6과는 2~5배 거리가 있습니다",
     main_size=16.5, next_step=2)
footer(s, "출처: HBM 연표 각사 발표 · JEDEC JESD270-4, CNBC 2024-11-08(⚠️ 단일 출처), 서울경제 2026-07-29(SK하이닉스 실적 콜 🟡)·2026-07-20(CMX 🟡), NVIDIA 개발자 블로그(KV 40GB 🟡), GitHub PR(LMCache·vLLM ✅), Counterpoint Q2 2026, TrendForce(HBM 용량)", 1)
notes(s, "1장은 문제 제기입니다. 결론은 내리지 않고, 고용량 QLC에서 DWPD를 높일 해법이 필요한 상황임을 세웁니다. 왼쪽이 교훈, 가운데가 지금 수요의 이동, 오른쪽이 문제입니다. "
      "왼쪽 교훈입니다. 두 레인은 같은 기술을 가진 두 회사의 다른 판단입니다. SK하이닉스는 2013년 AMD와 HBM을 공동 개발했고, 2021년 10월 JEDEC 표준보다 먼저 HBM3 개발을 마쳐 2022년 6월 NVIDIA에 업계 최초로 공급했으며, 2023년 한 해 동안 유일한 양산사였습니다. 그 결과가 2025년 6월 DRAM 매출 1위로, 1992년 이후 처음 있는 역전이었습니다. 2026년 6월에는 NVIDIA와 다년 기술 파트너십을 맺고 Vera Rubin용 메모리를 공동 개발합니다. "
      "아래 레인이 삼성입니다. 중요한 것은 기술이 없지 않았다는 점입니다. 업계 최초 HBM2E는 2019년 3월 삼성이 발표했습니다. 같은 해에 HBM 시장 성장률이 과대평가됐다는 판단으로 전담 조직이 후순위가 됐고, 2024년 4월에야 전담 팀이 재구성되어 5년의 공백이 생겼으며, 12단 HBM3E는 2025년 9월에야 NVIDIA 퀄을 통과해 Blackwell 사이클을 놓쳤습니다. 2019년 조직 판단은 CNBC 보도 계열의 단일 출처이므로 그 점을 밝혀 둡니다. 그리고 그 해 삼성은 감산도 CapEx 삭감도 하지 않았습니다. 돈이 아니라 우선순위의 문제였습니다. "
      "교훈을 한 줄로 쓰면 기술이 없어서가 아니라 시장을 작게 봤기 때문입니다. 그리고 구속력 있는 규격은 표준이 아니라 고객의 사양이었습니다. JEDEC HBM4 표준은 최대 8Gbps인데 NVIDIA는 10에서 13Gbps를 요구했고, 승부는 그 위에서 갈렸습니다. 삼성도 표준 제정 9개사 중 하나였으므로 테이블에 앉았는지가 아니라 고객 사양에 맞췄는지가 변수였습니다. "
      "다만 이 교훈을 영구적 판정으로 쓰면 안 됩니다. 삼성은 2025년 4분기 DRAM 1위를 탈환했고, 2026년 2월 업계 최초로 상용 HBM4를 출하했으며, 2026년 2분기 HBM 점유율은 33%로 직전 분기 대비 12%포인트 올랐습니다. 되돌릴 수 있다는 것도 같은 기록이 보여 줍니다. 변수는 판단을 끊지 않는 것이고, 다음 수요에서 같은 판단을 다시 해야 합니다. "
      "가운데가 지금의 수요입니다. 먼저 구매 기준입니다. 2008년에서 2012년은 성능과 용량당 가격, 2012년에서 2021년은 QoS와 지연 꼬리였습니다. OCP 사양 v2.0이 2021년 7월 지연 모니터를 의무화하면서 제도화됐습니다. 2022년 이후는 용량 밀도와 전력 효율, 물량 확보가 상위 기준입니다. "
      "그 위에 새 수요가 올라왔습니다. 여기가 이번에 추가한 부분입니다. KV 캐시가 HBM 용량을 넘어섭니다. 숫자로 보면 이렇습니다. NVIDIA 개발자 블로그 기준으로 Llama 3 70B에서 단일 사용자의 128K 컨텍스트 KV 캐시가 약 40기가바이트이고, 이것이 사용자 수에 선형으로 비례합니다. H100의 HBM이 80기가바이트니까 사용자 한 명이 절반을 씁니다. 그래서 넘친 것이 CPU DRAM으로 내려오는데, Kioxia는 DRAM만으로는 더 못 따라간다고 밝혔습니다. 다시 넘친 것을 받는 것이 NVMe SSD이고, 이 계층은 쓰기가 몰리는 첫 대용량 계층입니다. "
      "근거는 세 갈래입니다. 첫째, 진단을 한 주체가 우리가 아닙니다. HBM 1위 업체인 SK하이닉스가 2026년 7월 29일 2분기 실적 발표에서 KV 캐시를 담을 HBM 용량이 한계에 도달하고 있다고 밝혔고, 같은 자리에서 GPU 인근 NAND 개발을 공표했습니다. 둘째, 오프로드는 슬라이드 위의 개념이 아니라 메인라인 코드입니다. LMCache 디스크 캐시가 2024년 8월, GPUDirect Storage 백엔드가 2025년 6월, vLLM 다계층 오프로딩이 2026년 5월에 머지됐고 전부 PR로 확인됩니다. 셋째, 비트의 무게중심이 이미 움직였습니다. 전 세계 NAND 비트 출하에서 엔터프라이즈 SSD 비중이 1년 만에 26%에서 48%로 올라갔습니다. "
      "여기서 반드시 정정하고 갈 것이 있습니다. 이것은 HBM에서 스토리지로의 이동이 아니라 HBM 위에 얹는 증설입니다. 근거가 셋입니다. 하나, SK하이닉스 본인의 단어가 대체가 아니라 추가 KV 캐시 저장소입니다. 둘, 같은 기간 GPU당 HBM 용량은 오히려 커집니다. 192기가바이트에서 288기가바이트를 거쳐 2027년 384기가바이트입니다. 셋, Micron의 계층 정의는 HBM을 핫 KV 캐시로 유지한 채 SSD를 영속 KV로 추가하는 구조이고, Kioxia가 못 따라간다고 지목한 것도 HBM이 아니라 DRAM이었습니다. 질문이 나오면 이렇게 답하시면 됩니다. HBM 수요가 줄어서 우리에게 오는 것이 아니라, HBM으로 감당이 안 되는 몫이 새 계층을 열었다는 뜻입니다. "
      "반대 신호도 알고 있어야 합니다. 컨텍스트 전용 가속기인 Rubin CPX는 값싼 GDDR7로 발표됐다가 168기가바이트 HBM4로 재설계됐다는 보도가 있습니다. 애널리스트 보도이고 NVIDIA 공식 확인은 없습니다. 그리고 모델 측 효율 개선은 수요 총량을 깎는데 그 타격이 HBM보다 스토리지에 더 큽니다. DeepSeek V4.1-Flash는 KV 캐시의 HBM 요구를 75%, 영속 SSD 요구를 87.5% 줄였습니다. 이 계층이 커진다는 전망은 이 두 가지에 노출되어 있습니다. "
      "그래서 SSD에 오는 요구가 내구성입니다. 추론 수요는 연평균 86%로 학습의 16%보다 훨씬 빠르게 큽니다. 삼성도 이미 V낸드 캐파의 약 60%를 CMX 대응에 배정한 것으로 보도됐습니다. 요구는 1에서 3 DWPD입니다. "
      "오른쪽이 문제입니다. 요구 1에서 3 DWPD는 TLC로는 이미 충족됩니다. 그런데 고객은 QLC를 원합니다. 용량 밀도가 245TB급으로 네 배이고 TB당 가격이 20에서 30% 싸기 때문입니다. 반면 QLC의 정격은 0.6으로 요구와 2배에서 5배 거리가 있습니다. 고객은 QLC의 밀도와 원가로 TLC의 내구성을 요구하는 셈이고, 이 간극을 메우는 것이 우리가 풀 문제입니다. 고용량화는 두 축의 문제를 낳습니다. 다이 수가 만드는 신뢰성 축이 2장, DWPD 격차가 만드는 내구성 축이 3장입니다.")

# ================================================================ S2. 신뢰성 축 — SSD 내부 해법 (v6.0: ppm 요구 곡선 · 보호 기법별 완화 · 내부 해법을 도해로)
s = prs.slides.add_slide(BLANK)
header(s, 2,
       "첫째 축 신뢰성은 다이 수 증가로 요구가 다이당 10 ppm대까지 내려가나, SSD 내부 구조로 충족됩니다",
       "다이 고장률을 더 낮추려면 수율을 깎아야 하고 그만큼 원가가 오릅니다. 그래서 해법은 다이가 아니라 SSD 안의 보호 구조입니다.")


def _img(name, x, y, w):
    return s.shapes.add_picture(os.path.join(ASSETS, name), Inches(x), Inches(y), width=Inches(w))


# ---- 상단: 요구 곡선(ppm) + 보호 기법별 완화 + 판정 패널 ----
T_Y, T_H = 2.80, 3.34
_img("rel_ppm_requirement.png", MX, T_Y, 7.55)
_img("rel_protection_tradeoff.png", MX + 7.55 + 0.20, T_Y, 4.72)
PX3 = MX + 7.55 + 4.72 + 0.40
PW3 = RIGHT - PX3
rect(s, PX3, T_Y, PW3, T_H, fill=TINT, line=BLUE_T2, line_w=1.0)
tb(s, PX3 + 0.26, T_Y + 0.14, PW3 - 0.52, 0.22, [("요구 · 드라이브 고장률 (5년 누적)", 10.5, False, GRAY_2)])
tb(s, PX3 + 0.26, T_Y + 0.36, PW3 - 0.52, 0.48, [("2.2%  고정", 25, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
tb(s, PX3 + 0.26, T_Y + 0.84, PW3 - 0.52, 0.22, [("OCP 사양 MTBF 2,000,000시간 = AFR 0.44%/년 · JESD218 FFR 3%보다 엄격", 8.75, False, GRAY_2)])
rect(s, PX3 + 0.26, T_Y + 1.10, PW3 - 0.52, 0.012, fill=BLUE_T2)
tb(s, PX3 + 0.26, T_Y + 1.12, PW3 - 0.52, 0.20, [("다이 고장률을 더 낮추는 길", 10.0, False, GRAY_2)])
ty2 = T_Y + 1.34
tw2 = (PW3 - 0.52 - 2 * 0.22) / 3
for i, (t1, t2) in enumerate([("선별 강화", "양품 기준 상향"), ("수율 하락", "웨이퍼당 다이 ↓"), ("원가 상승", "수익성 악화")]):
    tx2 = PX3 + 0.26 + i * (tw2 + 0.22)
    rect(s, tx2, ty2, tw2, 0.48, fill=WHITE, line=RED if i == 2 else LINE, line_w=1.0 if i == 2 else 0.75)
    tb(s, tx2 + 0.10, ty2 + 0.04, tw2 - 0.20, 0.22, [(t1, 11.25, True, RED if i == 2 else INK)])
    tb(s, tx2 + 0.10, ty2 + 0.26, tw2 - 0.20, 0.18, [(t2, 8.5, False, GRAY)])
    if i < 2:
        rect(s, tx2 + tw2 + 0.03, ty2 + 0.16, 0.16, 0.16, fill=GRAY_2, shape=MSO_SHAPE.RIGHT_ARROW)
tb(s, PX3 + 0.26, ty2 + 0.52, PW3 - 0.52, 0.22, [("수익성이 이 길을 막습니다 → 보호 구조로 푼다", 10.0, True, BLUE)])
rect(s, PX3 + 0.26, ty2 + 0.78, PW3 - 0.52, 0.012, fill=BLUE_T2)
verdicts = [
    ("245 · 256TB급 · 1,024다이", "단일 패리티로 충족", "요구 1,679 ppm · 현 수준 추정 범위 안", True),
    ("512TB급 · 2,133다이", "이중 패리티 또는 여분 다이", "단일 패리티 요구 1,164 ppm · 상단에 미달", False),
]
vy = ty2 + 0.86
for cap, verdict, why, ok in verdicts:
    rect(s, PX3 + 0.26, vy, PW3 - 0.52, 0.56, fill=WHITE, line=BLUE if ok else BLUE_T1, line_w=1.0)
    tb(s, PX3 + 0.42, vy + 0.03, PW3 - 0.84, 0.17, [(cap, 9.0, True, GRAY)])
    tb(s, PX3 + 0.42, vy + 0.19, PW3 - 0.84, 0.22, [(verdict, 11.25, True, BLUE)])
    tb(s, PX3 + 0.42, vy + 0.38, PW3 - 0.84, 0.17, [(why, 8.5, False, GRAY)])
    vy += 0.62

# ---- 하단: SSD 내부 해법을 도해로 (텍스트 최소) ----
S_Y = T_Y + T_H + 0.24
tb(s, MX, S_Y, CW, 0.26, [[("SSD 내부 해법", 13.5, True, BLUE),
                           ("   다이 고장을 SSD 안에서 흡수하고, 호스트에는 관측 지표만 제공합니다", 10.5, False, GRAY_2)]])
PN_Y = S_Y + 0.34
PN_H = 9.22 - PN_Y
PN_W = (CW - 3 * 0.22) / 4
V_Y = PN_Y + 0.48          # 도해 시작
M_Y = PN_Y + 1.50          # 한 줄 설명
B_Y = PN_Y + 1.84          # 하단 결론 2줄


def die_grid(x, y, cols, rows, cell, gap, roles=None):
    roles = roles or {}
    for r in range(rows):
        for c in range(cols):
            i = r * cols + c
            cx, cy = x + c * (cell + gap), y + r * (cell + gap)
            role = roles.get(i)
            if role == "parity":
                rect(s, cx, cy, cell, cell, fill=BLUE)
            elif role == "fail":
                rect(s, cx, cy, cell, cell, fill=WHITE, line=RED, line_w=1.25)
                rect(s, cx + cell * 0.18, cy + cell * 0.45, cell * 0.64, cell * 0.10, fill=RED)
            elif role == "spare":
                sp = rect(s, cx, cy, cell, cell, fill=WHITE, line=BLUE, line_w=1.0)
                sp.line.dash_style = MSO_LINE_DASH_STYLE.DASH
            else:
                rect(s, cx, cy, cell, cell, fill=BLUE_T2)


def panel(x, no, title, style="hot"):
    if style == "hot":
        rect(s, x, PN_Y, PN_W, PN_H, fill=WHITE, line=BLUE, line_w=1.25)
        rect(s, x, PN_Y, PN_W, 0.05, fill=BLUE)
    elif style == "part":
        rect(s, x, PN_Y, PN_W, PN_H, fill=WHITE, line=BLUE_T2, line_w=1.0)
        rect(s, x, PN_Y, PN_W, 0.05, fill=BLUE_T2)
    else:
        sp = rect(s, x, PN_Y, PN_W, PN_H, fill=TINT, line=BLUE, line_w=1.0)
        sp.line.dash_style = MSO_LINE_DASH_STYLE.DASH
    tb(s, x + 0.20, PN_Y + 0.13, PN_W - 0.40, 0.26, [(no + " " + title, 12.0, True, BLUE if style != "next" else GRAY)])
    return x + 0.24, PN_W - 0.48


def bottom(x, w, head, tail):
    tb(s, x, B_Y, w, 0.28, [(head, 12.0, True, BLUE)])
    tb(s, x, B_Y + 0.30, w, 0.26, [(tail, 9.25, False, GRAY_2)], spacing=1.0)


CELL, GAP = 0.27, 0.06
PX = MX
# ① 다이 패리티
gx, gw = panel(PX, "①", "다이 패리티 · 단일 고장 복구")
die_grid(gx, V_Y, 8, 2, CELL, GAP, roles={5: "fail", 15: "parity"})
tb(s, gx + 8 * (CELL + GAP) + 0.10, V_Y, gw - 8 * (CELL + GAP) - 0.10, 0.66,
   [("15 + 1", 12.0, True, INK), ("데이터 15 · 패리티 1", 9.0, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)
tb(s, gx, M_Y, gw, 0.28,
   [[("다이 1개 고장", 10.5, True, GRAY), ("  →  ", 10.5, False, GRAY_2), ("XOR 복구", 10.5, True, BLUE),
     ("  →  ", 10.5, False, GRAY_2), ("데이터 무손실", 10.5, True, INK)]])
bottom(gx, gw, "요구 완화 79배 · 21 → 1,679 ppm", "용량 비용 6.2% · 선례 Micron RAIN(패리티 1:15)")

# ② 여분 다이 · 재구축
PX += PN_W + 0.22
gx, gw = panel(PX, "②", "여분 다이 · 재구축 · 감량 운영")
die_grid(gx, V_Y, 6, 2, CELL, GAP, roles={4: "fail"})
ax_ = gx + 6 * (CELL + GAP) + 0.02
rect(s, ax_, V_Y + 0.18, 0.30, 0.22, fill=BLUE, shape=MSO_SHAPE.RIGHT_ARROW)
die_grid(ax_ + 0.40, V_Y, 1, 2, CELL, GAP, roles={0: "spare", 1: "spare"})
tb(s, ax_ + 0.40 + CELL + 0.10, V_Y, gw - (ax_ - gx) - CELL - 0.50, 0.66,
   [("여분 다이", 11.25, True, BLUE), ("고장 다이는 은퇴", 9.0, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)
tb(s, gx, M_Y, gw, 0.28,
   [[("재구축 ≈ 1시간", 10.5, True, INK), ("  →  ", 10.5, False, GRAY_2), ("보호 상태 복원 · 용량 유지", 10.5, True, BLUE)]])
bottom(gx, gw, "요구 완화 1,000배 이상", "두 고장이 재구축 창에 겹칠 때만 상실 · 선례 삼성 PM1733 FIP")

# ③ 텔레메트리 · 사전 은퇴
PX += PN_W + 0.22
gx, gw = panel(PX, "③", "텔레메트리 · 사전 은퇴", style="part")
CHH = 0.90
rect(s, gx, V_Y, gw, CHH, fill=WHITE, line=LINE, line_w=0.75)
tb(s, gx + 0.10, V_Y + 0.04, 2.4, 0.2, [("다이별 RBER · XOR 복구 횟수", 8.75, False, GRAY_2)])
pts = [0.16, 0.20, 0.25, 0.32, 0.44, 0.62, 0.86]
bw = (gw - 0.30) / len(pts)
thr = V_Y + CHH - 0.08 - (CHH - 0.30) * 0.74
for i, v in enumerate(pts):
    bh = (CHH - 0.30) * v
    rect(s, gx + 0.14 + i * bw, V_Y + CHH - 0.08 - bh, bw * 0.58, bh, fill=BLUE_T2 if i < 5 else BLUE)
rect(s, gx + 0.06, thr, gw - 0.12, 0.012, fill=RED)
tb(s, gx + gw - 1.20, thr - 0.20, 1.14, 0.2, [("은퇴 임계", 8.75, True, RED)], align=PP_ALIGN.RIGHT)
tb(s, gx, M_Y, gw, 0.28,
   [[("돌발 고장", 10.5, True, GRAY), ("  →  ", 10.5, False, GRAY_2), ("징후 감지 · 사전 은퇴", 10.5, True, BLUE)]])
bottom(gx, gw, "2,133다이 규모의 관리 가능성", "표준 필드: OCP SMART Cloud Health(C0) XOR 카운트")

# ④ 호스트 (관측·수용만)
PX += PN_W + 0.22
gx, gw = panel(PX, "④", "호스트 · 플랫폼 (관측 · 수용)", style="next")
rect(s, gx, V_Y, gw, 0.38, fill=WHITE, line=BLUE_T2, line_w=1.0)
tb(s, gx + 0.14, V_Y, 0.9, 0.38, [("SSD", 11.25, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
tb(s, gx + 1.00, V_Y, gw - 1.14, 0.38, [("XOR 카운트 · 감량 예고 노출", 9.5, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE)
rect(s, gx + gw / 2 - 0.09, V_Y + 0.40, 0.18, 0.20, fill=BLUE_T2, shape=MSO_SHAPE.DOWN_ARROW)
rect(s, gx, V_Y + 0.64, gw, 0.36, fill=WHITE, line=BLUE_T2, line_w=1.0)
tb(s, gx + 0.14, V_Y + 0.64, 0.9, 0.36, [("호스트", 11.25, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
tb(s, gx + 1.00, V_Y + 0.64, gw - 1.14, 0.36, [("감량 운영 수용 · 드라이브 간 소거 부호", 9.5, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE)
tb(s, gx, M_Y, gw, 0.28, [("해결 주체는 SSD · 협력은 규격화에 한정", 10.5, True, GRAY)])
bottom(gx, gw, "삼성 과제 · OCP 규격 제안", "FIP 감량 정책 · 텔레메트리 필드 · 스트라이프 재설계")

band(s, 9.42, 0.80, "결론",
     "다이 고장률을 낮추는 길은 한계에 가깝고, 요구를 되돌리는 것은 패리티·여분 다이라는 SSD 내부 구조입니다.\n"
     "이 축은 SSD 안에서 충족되지만, 둘째 축 내구성(DWPD)은 SSD 안에서 충족되지 않았습니다",
     main_size=16.5, next_step=3)
footer(s, "출처: OCP 사양·JESD218(고장률 요구), 제품 사양(다이 수), Micron RAIN, 삼성 PM1733 FIP, OCP SMART C0, Google FAST'16(현 수준 역산) · 요구 곡선은 독립 고장 모델(⚠️)", 2)
notes(s, "2장은 신뢰성 축입니다. 요구는 구매자 사양이 정합니다. OCP 데이터센터 NVMe SSD 사양의 MTBF 200만 시간은 연간 고장률 0.44%, 5년 누적 21,662 ppm에 해당하고 이는 JEDEC JESD218의 기능 고장률 3%보다 엄격합니다. 이 요구가 고정인 상태에서 SSD당 NAND 다이 수는 61TB급 512개, 245·256TB급 1,024개, 512TB급 2,133개로 늘어납니다. 용량에 정비례하지는 않습니다. 2Tb 다이로 옮기면 같은 다이 수로 용량이 두 배가 되기 때문입니다. 대신 다이 1개가 안고 있는 데이터가 0.125TB에서 0.25TB로 두 배가 됩니다. "
      "보호가 없으면 드라이브 고장률은 다이 수에 비례하므로, 다이 1개당 허용 고장률은 61TB급 43 ppm, 245TB급 21 ppm, 512TB급 10 ppm까지 내려갑니다. 현재 다이 고장률의 추정 수준은 200에서 2,700 ppm 범위입니다. 구글이 2016년 FAST에서 보고한 4년 내 배드 칩 발생 드라이브 비율 2~7%를 당시 다이 수 32~128개로 역산한 값이며, 다이 수가 공개되지 않아 폭이 넓습니다. 어느 쪽이든 보호 없이는 두 자릿수 배수로 미달합니다. "
      "가운데 차트가 해법의 크기입니다. 15+1 단일 패리티는 같은 스트라이프에서 두 개가 동시에 고장나야 데이터를 잃으므로 요구가 1,679 ppm으로 79배 완화되고 용량 비용은 6.2%입니다. 마이크론이 RAIN에서 공개한 패리티 비율이 1대 15입니다. 14+2 이중 패리티는 8,455 ppm으로 395배 완화되고 비용은 12.5%입니다. 여분 다이로 재구축하면 두 번째 고장이 재구축 창 안에 겹쳐야 하므로 요구는 1,000배 이상 완화되어 실질적으로 해소됩니다. 단, 이중 패리티와 여분 다이는 공개 문헌에서 벤더 적용 사례를 확인하지 못한 모델 옵션입니다. 확인된 공개 사실은 마이크론의 단일 칩 고장 보호와 삼성 PM1733의 Fail-in-Place입니다. "
      "오른쪽 판정이 이 장의 결론입니다. 245·256TB급은 단일 패리티 요구가 1,679 ppm으로 현 수준 추정 범위 안에 들어와 충족 가능합니다. 512TB급은 단일 패리티 요구가 1,164 ppm으로 현 수준 상단에 미달하므로 이중 패리티나 여분 다이 재구축이 필요합니다. 512TB 세대의 설계 결정이 여기서 나옵니다. "
      "하단은 SSD 내부 해법 도해입니다. 첫째 다이 패리티는 슈퍼페이지를 여러 다이에 걸쳐 구성하고 패리티에 XOR를 저장해 단일 다이 고장을 복구합니다. 둘째 여분 다이는 고장 다이를 은퇴시키고 재구축으로 보호 상태를 복원하며 용량을 유지합니다. 셋째 텔레메트리는 다이별 RBER 추이와 XOR 복구 횟수로 징후를 감지해 돌발 고장을 계획 감량으로 바꿉니다. 다만 구글 연구는 RBER이 UBER나 고장을 예측하지 못한다고 보고했으므로 예측 지표는 RBER 단독이 아니라 XOR 복구 횟수와 배드 블록 증가율을 함께 봐야 합니다. 넷째 호스트는 관측과 수용만 합니다. 해결 주체는 SSD이고 호스트 협력은 규격화에 한정됩니다. 결론은 이 축이 SSD 안에서 충족된다는 것이며, 둘째 축 DWPD가 3장입니다.")

# ================================================================ S3. 해법 사다리 — 이관 매트릭스 (solution_ladder_slide.build 공용; v5.1 3장: 둘째 축 DWPD는 SSD 밖에서 닫힌다)
import sys as _sys
_sys.path.insert(0, HERE)
import solution_ladder_slide as _ladder
_ladder.build(_sys.modules[__name__], page_no=3, kicker=3, next_step=4,
              title="둘째 축 내구성은 SSD 단독 최적화로 WAF ≈3에 머물렀고, 잔여 변수 WAF는 호스트가 결정합니다",
              lead="정격 DWPD를 정하는 항 가운데 셀·디바이스·계약이 정한 것을 빼면 남는 변수는 WAF 하나뿐입니다.",
              band_main="QLC 정격 DWPD의 잔여 변수는 WAF이고, WAF는 호스트가 데이터를 어떻게 놓느냐로 정해집니다.\n"
                        "수명이 같은 데이터를 묶어 힌트와 함께 내려보내야 하며, 그 메커니즘이 다음 장입니다",
              notes_tail="신뢰성 축은 2장에서 SSD 내부 구조로 충족됐습니다. 이 축은 SSD 밖에 있고, 그래서 고객 협업과 새로운 역량을 요구합니다.")

# ================================================================ S4. 배치 힌트 — 같은 드라이브, 네 가지 결과 (v7.0 신설: FDP 원리 시각화)
s = prs.slides.add_slide(BLANK)
header(s, 4,
       "배치 힌트는 수명이 섞인 블록을 없애 WAF를 3에서 1로, 유효 DWPD를 정격의 3배로 만듭니다",
       "같은 QLC 드라이브에 같은 양을 써도, 호스트가 데이터 수명을 알려 주느냐에 따라 NAND에 쌓이는 모습과 가비지 컬렉션 비용이 달라집니다.")

LIFE_COLOR = [BLUE, BLUE_T1, BLUE_T2]
LIFE_NAME = ["짧음", "중간", "김"]

C_W = (CW - 3 * 0.22) / 4
H_Y, H_H = 2.80, 0.58          # 케이스 헤더
A_Y, A_H = 3.44, 0.86          # 호스트 응용
I_Y, I_H = 4.36, 0.40          # 인터페이스
N_Y = 4.86                     # NAND 블록
CELL, CGAP, BGAP = 0.38, 0.035, 0.10
L_Y = 8.62                     # 하단 범례 · 결론


def app_chip(x, y, w, h, name, life, hinted):
    """hinted: True=힌트 제공(파란 테두리) · False=미제공(회색 점선) · None=구분 없음"""
    sp = rect(s, x, y, w, h, fill=WHITE, line=BLUE if hinted else (GRAY_2 if hinted is False else LINE),
              line_w=1.25 if hinted else 0.75)
    if hinted is False:
        sp.line.dash_style = MSO_LINE_DASH_STYLE.DASH
    rect(s, x + 0.10, y + (h - 0.16) / 2, 0.16, 0.16, fill=LIFE_COLOR[life])
    tb(s, x + 0.32, y, w - 0.42, h, [(name, 9.5, True, INK)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)


def nand_block(x, y, cells, target=False):
    """8칸 블록. cells: 수명 인덱스 리스트. 수명 0(짧음)은 이미 무효화된 칸으로 그린다."""
    bw = 8 * CELL + 7 * CGAP
    if target:
        rect(s, x - 0.07, y - 0.07, bw + 0.14, CELL + 0.14, fill=None, line=RED, line_w=1.25)
    for i, life in enumerate(cells):
        cx = x + i * (CELL + CGAP)
        if life == 0:
            sp = rect(s, cx, y, CELL, CELL, fill=WHITE, line=GRAY_2, line_w=0.75)
            sp.line.dash_style = MSO_LINE_DASH_STYLE.DASH
        else:
            rect(s, cx, y, CELL, CELL, fill=LIFE_COLOR[life])
    return bw


cases = [
    ("①", "배치 없음", "도착 순서대로 기록", "큐 1개 · 수명 정보 없음",
     [("로그 · 메타데이터", 0, None), ("KV 캐시 블록", 1, None), ("체크포인트", 2, None)],
     [[0, 1, 2, 0, 2, 1, 0, 1], [1, 0, 2, 1, 0, 2, 1, 2], [2, 1, 0, 2, 1, 0, 2, 0], [0, 2, 1, 0, 1, 2, 0, 1]],
     0, 5, 3.0, "실측", "CacheLib 비-FDP 3.22 · 사용률 100%", "모든 블록에 세 수명이 섞인다"),
    ("②", "멀티스트림", "스트림 id로 부분 분리", "스트림 2~8개 · 수명 등급보다 적다",
     [("로그 · 메타데이터", 0, None), ("KV 캐시 블록", 1, None), ("체크포인트", 2, None)],
     [[0, 0, 0, 0, 1, 1, 2, 2], [1, 1, 1, 1, 1, 1, 0, 0], [2, 2, 2, 2, 0, 0, 2, 2], [0, 0, 1, 1, 0, 0, 1, 1]],
     0, 4, 1.8, "모델", "AutoStream · FStream 감소율의 보수 중앙값", "스트림이 모자라 일부가 섞인다"),
    ("③", "배치 힌트 (FDP)", "수명 등급별로 핸들 지정", "배치 핸들 3개 · 전 응용 적용",
     [("로그 · 메타데이터", 0, True), ("KV 캐시 블록", 1, True), ("체크포인트", 2, True)],
     [[0] * 8, [1] * 8, [2] * 8, [0] * 8],
     0, 0, 1.05, "실측", "CacheLib 3.22 → 1.03 · XD8 2.8 → 약 1.0", "한 블록이 통째로 무효화된다"),
    ("④", "혼재", "힌트 주는 응용과 안 주는 응용", "핸들 2개 + 기본 핸들",
     [("KV 캐시 블록", 1, True), ("로그 · 메타데이터", 0, True), ("레거시 VM", 2, False)],
     [[0] * 8, [1] * 8, [0, 1, 2, 0, 2, 1, 0, 1], [2, 0, 1, 2, 1, 0, 2, 0]],
     2, 5, 2.2, "모델", "절반 태깅 가정 + 핸들 간 간섭(WARP)", "기본 핸들로 몰린 트래픽이 다시 섞인다"),
]

for k, (no, name, sub, iface, apps, blocks, tgt, copy_n, waf, grade, cond, note) in enumerate(cases):
    x = MX + k * (C_W + 0.22)
    hot = k == 2
    # 헤더
    rect(s, x, H_Y, C_W, H_H, fill=BLUE if hot else TINT, line=None if hot else BLUE_T2, line_w=1.0)
    tb(s, x + 0.20, H_Y + 0.06, C_W - 0.40, 0.28, [[(no + " ", 13.5, True, WHITE if hot else BLUE), (name, 13.5, True, WHITE if hot else BLUE)]])
    tb(s, x + 0.20, H_Y + 0.33, C_W - 0.40, 0.22, [(sub, 9.75, False, BLUE_T2 if hot else GRAY)])
    # 호스트 응용
    aw = (C_W - 0.40 - 2 * 0.06) / 3
    for j, (an, al, ah) in enumerate(apps):
        app_chip(x + 0.20 + j * (aw + 0.06), A_Y, aw, 0.38, an, al, ah)
    hint_note = {2: "세 응용 모두 배치 핸들을 지정합니다", 3: "레거시 VM만 힌트를 주지 않습니다(점선)"}.get(k)
    tb(s, x + 0.20, A_Y + 0.44, C_W - 0.40, 0.24,
       [(hint_note or "호스트 · 가상 머신 · 응용", 8.75, False, BLUE if k == 3 else GRAY_2)])
    # 인터페이스
    rect(s, x + C_W / 2 - 0.11, I_Y - 0.06, 0.22, 0.24, fill=BLUE if hot else BLUE_T2, shape=MSO_SHAPE.DOWN_ARROW)
    tb(s, x + 0.20, I_Y + 0.20, C_W - 0.40, 0.22, [(iface, 9.5, True, BLUE if hot else GRAY)], align=PP_ALIGN.CENTER)
    # NAND 블록
    bw = 8 * CELL + 7 * CGAP
    bx = x + (C_W - bw) / 2
    by = N_Y
    for bi, cells in enumerate(blocks):
        nand_block(bx, by, cells, target=(bi == tgt))
        tb(s, bx - 0.40, by, 0.34, CELL, [("B%d" % (bi + 1), 8.5, False, GRAY_2)], anchor=MSO_ANCHOR.MIDDLE)
        by += CELL + BGAP
    tb(s, x + 0.20, by + 0.02, C_W - 0.40, 0.24, [("NAND 소거 블록 · 칸 = 페이지", 8.75, False, GRAY_2)])
    # 가비지 컬렉션 결과
    gy = by + 0.26
    rect(s, x + 0.20, gy, C_W - 0.40, 0.34, fill=WHITE, line=RED if copy_n else BLUE, line_w=1.0)
    tb(s, x + 0.30, gy, C_W - 0.60, 0.34,
       [[("소거 대상 블록 복사  ", 9.5, False, GRAY), ("%d / 8칸" % copy_n, 11.25, True, RED if copy_n else BLUE)]],
       anchor=MSO_ANCHOR.MIDDLE)
    # 수치
    vy = gy + 0.44
    eff = 0.6 * 3.0 / waf
    rect(s, x, vy, C_W, 1.06, fill=TINT if hot else WHITE, line=BLUE if hot else LINE, line_w=1.25 if hot else 0.75)
    half = (C_W - 0.40) / 2
    tb(s, x + 0.20, vy + 0.06, half, 0.2, [[("WAF   ", 9.5, False, GRAY_2), (grade, 8.5, True, BLUE if grade == "실측" else GRAY_2)]])
    tb(s, x + 0.20, vy + 0.24, half, 0.42, [("%.2f" % waf if waf < 1.5 else "%.1f" % waf, 24, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
    tb(s, x + 0.20 + half, vy + 0.06, half, 0.2, [("유효 DWPD · QLC 정격 0.6", 9.5, False, GRAY_2)])
    tb(s, x + 0.20 + half, vy + 0.24, half, 0.42,
       [[("%.1f" % eff, 24, True, BLUE if eff >= 1.0 else GRAY), ("   요구 1~3", 9.5, False, GRAY_2)]], anchor=MSO_ANCHOR.MIDDLE)
    tb(s, x + 0.20, vy + 0.64, C_W - 0.40, 0.2, [(cond, 8.5, False, GRAY_2)])
    tb(s, x + 0.20, vy + 0.82, C_W - 0.40, 0.2, [(note, 9.0, True, BLUE if k == 2 else GRAY)])

# ---- 하단: 범례 + 산식 ----
rect(s, MX, L_Y, CW, 9.22 - L_Y, fill=TINT)
rect(s, MX, L_Y, 0.06, 9.22 - L_Y, fill=BLUE)
lx = MX + 0.28
tb(s, lx, L_Y + 0.08, 0.8, 0.22, [("범례", 10.5, True, BLUE)])
lx += 0.72
for i, nm in enumerate(LIFE_NAME):
    rect(s, lx, L_Y + 0.11, 0.16, 0.16, fill=LIFE_COLOR[i])
    tb(s, lx + 0.22, L_Y + 0.06, 1.0, 0.24, [("수명 " + nm, 9.5, False, GRAY)])
    lx += 1.10
sp = rect(s, lx, L_Y + 0.11, 0.16, 0.16, fill=WHITE, line=GRAY_2, line_w=0.75)
sp.line.dash_style = MSO_LINE_DASH_STYLE.DASH
tb(s, lx + 0.22, L_Y + 0.06, 2.0, 0.24, [("무효화된 페이지", 9.5, False, GRAY)])
tb(s, lx + 2.30, L_Y + 0.06, 5.4, 0.24,
   [[("유효 DWPD  ", 9.5, True, INK), ("정격 0.6 × 3 ÷ WAF (정격은 WAF 3 기준 산정)", 9.5, False, GRAY)]])
tb(s, MX + 0.28, L_Y + 0.38, CW - 0.56, 0.24,
   [[("실측 대조  ", 9.5, True, INK),
     ("8칸 블록 그림은 원리를 보이는 모식도이고, 아래 WAF는 공개 실측(①③) 또는 모델 추정(②④)입니다. 네 열은 하나의 연속 측정이 아니며 조건이 다릅니다. 같은 드라이브·트레이스도 사용률이 100%면 3.22, 50%면 1.22로 기준이 흔들립니다", 9.5, False, GRAY)]])

band(s, 9.42, 0.80, "결론",
     "수명이 같은 데이터만 한 블록에 모이면 그 블록은 통째로 무효화되어 복사할 것이 없습니다. 이것이 WAF 1의 정체입니다.\n"
     "QLC로 요구 DWPD에 닿으려면 호스트가 수명 등급을 나눠 힌트와 함께 내려보내야 합니다",
     main_size=16.5, next_step=5)
footer(s, "출처: NVMe TP4146 FDP(배치 핸들), Meta CacheLib 문서·Kioxia XD8 브리프(①③ 실측), AutoStream·FStream(② 감소율), FAST'26 WARP·FlashAlloc VLDB'23(④ 간섭) · ②④ WAF는 모델 추정(⚠️)", 4)
notes(s, "4장은 배치 힌트가 무엇인지, 왜 WAF를 낮추는지를 한 장으로 보입니다. 3장에서 잔여 변수가 WAF이고 그것을 호스트가 결정한다고 했으니, 그 메커니즘을 보여야 합니다. 네 열은 같은 QLC 드라이브에 같은 양을 쓰되 호스트가 수명 정보를 주는 정도만 다릅니다. "
      "각 열의 위는 호스트의 응용입니다. 로그와 메타데이터는 수명이 짧고, KV 캐시 블록은 중간이며, 체크포인트는 깁니다. 아래는 NAND의 소거 블록이고 칸 하나가 페이지입니다. 흰 점선 칸은 이미 무효화된 페이지, 즉 수명이 짧아 먼저 지워진 데이터입니다. 가비지 컬렉션은 소거할 블록에 남은 유효 페이지를 다른 블록으로 복사해야 하며, 그 복사량이 곧 쓰기 증폭입니다. "
      "첫째 열, 배치가 없으면 도착 순서대로 쓰므로 모든 블록에 세 수명이 섞입니다. 어떤 블록을 골라도 유효 페이지가 다섯 칸 남아 복사해야 하고 WAF는 3 수준, 유효 DWPD는 정격 그대로 0.6입니다. 요구 1에 못 미칩니다. "
      "둘째 열, 멀티스트림은 스트림 번호로 나누지만 스트림 수가 수명 등급보다 적어 일부가 섞입니다. 복사가 네 칸으로 줄어 WAF 2, 유효 DWPD 0.9입니다. 개선은 되지만 여전히 부족합니다. "
      "셋째 열, 배치 힌트를 모든 응용이 주면 블록마다 수명이 하나입니다. 짧은 수명 블록은 통째로 무효화되므로 복사할 것이 없고 WAF는 1, 유효 DWPD는 1.8이 되어 요구 구간에 들어갑니다. 이것이 WAF 1의 정체입니다. "
      "넷째 열이 현실입니다. 힌트를 주는 응용과 주지 않는 응용이 한 드라이브에 섞이면 힌트 없는 트래픽이 기본 핸들로 몰려 그 블록들이 다시 섞입니다. 평균 WAF는 1.5 수준으로 되돌아가고 유효 DWPD는 1.2에 그칩니다. FAST 2026의 WARP 연구가 보고한 실패 조건이 이것이며, 6장 런타임 대응이 다루는 상황도 이 열입니다. "
      "그림의 8칸 블록은 원리를 보이는 모식도입니다. 실제 소거 블록은 수천 페이지이고, 공개 실측은 Meta CacheLib에서 3.22가 1.03으로, 사용률 50%에서는 1.22가 1.03으로, Kioxia XD8에서 2.8이 약 1.0으로 내려간 사례입니다.")

# ================================================================ S5. 역량 — 3단계 (v3.10 공식 문안·범례를 Phase 1 옆으로·결론 밴드 신설)
s = prs.slides.add_slide(BLANK)
header(s, 5,
       "따라서 WAF 저감은 고객 시스템까지 3단계 공동 설계 역량을 요구하며, 삼성은 현재 1단계입니다",
       [("「승부는 칩을 많이 파는 기업이 아니라, 고객의 아키텍처 안으로 들어가 수요를 함께 설계하는 기업이 가져간다」", 18, False, INK),
        ("   신문섭 · Bain 파트너, 2026-06", 13.5, False, GRAY_2)])

T_Y, T_H, T_W, T_GAP = 2.80, 0.96, 4.41, 0.26
tiles = [
    ("2~5배", 1.35, "내구성 격차", "요구 1~3 DWPD ÷ 현 QLC 정격 0.6"),
    ("16개", 1.35, "요구 분리 스트림", "호스트가 여는 배치 스트림 상한 · 제품 지원 수는 업계 미공개"),
    ("0건", 1.25, "접점 부재", "캐시 관리자 4종 코드의 배치 규격 언급"),
    ("≈3 → ≈1", 1.85, "해소 수단 실증", "범용·캐시 WAF 실측 · KV 캐시 미실측"),
]
for i, (num, nw, lab, desc) in enumerate(tiles):
    x = MX + i * (T_W + T_GAP)
    hot = i == 3
    rect(s, x, T_Y, T_W, T_H, fill=TINT if hot else WHITE, line=None if hot else LINE, line_w=0.75)
    tb(s, x + 0.28, T_Y, nw, T_H, [(num, 24, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
    tb(s, x + 0.28 + nw + 0.12, T_Y, T_W - nw - 0.6, T_H,
       [(lab, 15.75, True, INK), (desc, 13.5, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.05)


def stack2(slide, x, y, w, names, techs, states, layer_h=0.74, gap=0.06):
    """계층 스택 v2: 층 이름 + 그 층의 구체 기술(작은 글씨). 각 층의 y 반환."""
    ys = []
    for i, (nm, tc, st) in enumerate(zip(names, techs, states)):
        ly = y + i * (layer_h + gap)
        stl = STATE_STYLE[st]
        rect(slide, x, ly, w, layer_h, fill=stl["fill"], line=stl["line"], line_w=0.75)
        c1 = stl["color"]
        c2 = WHITE if st == "own" else (INK if st == "touch" else GRAY_2)
        tb(slide, x + 0.16, ly + 0.06, w - 0.32, layer_h - 0.1,
           [(nm, 13.5, True, c1), (tc, 11.25, False, c2)], spacing=1.04)
        ys.append(ly)
    return ys


P_Y, P_H, P_W = 3.92, 4.98, 5.92
LAYER_NAMES = ["응용 · 추론 엔진", "KV 캐시 관리자", "I/O 라이브러리", "커널 · 플랫폼", "SSD 디바이스"]
phase_defs = [
    ("Phase 1", "배치 표준 디바이스 확보", ["none", "none", "none", "none", "own"],
     ["vLLM · SGLang · TensorRT-LLM",
      "Dynamo KVBM · LMCache · Mooncake · FlexKV",
      "NIXL · GPUDirect Storage · io_uring · SPDK",
      "Linux write streams · XFS · CMX(DOCA Memos)",
      "배치 핸들 16+ 지원·공개 · 2Tb QLC · NVMe KV 확장 · 텔레메트리"],
     "고객 보증 범위: 정격 내 QLC 원가·전력"),
    ("Phase 2", "워크로드 실측 기반 최적화", ["none", "none", "touch", "touch", "own"],
     ["vLLM · SGLang · TensorRT-LLM",
      "KVBM 빈도 필터 · LMCache 퇴거 정책(트레이스 원천)",
      "io_uring·GDS 백엔드 write stream 부착 · xNVMe · blktrace·eBPF",
      "Linux 6.16 write streams · XFS·f2fs 스트림 · CMX 힌트 매핑 검증",
      "배치 핸들 정책(수명·테넌트·prefix) · WAF·유효 DWPD 실측"],
     "고객 보증 범위: 고객 워크로드 기준 수명"),
    ("Phase 3", "고객 시스템 내 공동 설계", ["touch", "own", "own", "own", "own"],
     ["커넥터·스케줄러 분석 · 공용 TCO 모델(GPU당 사용자·TTFT·전력)",
      "KVBM·LMCache·Mooncake·FlexKV 플러그인 메인라인 머지",
      "NIXL 스토리지 플러그인 · xNVMe 배치 API가 기본 백엔드",
      "XFS·f2fs 스트림 · DOCA Memos↔배치 표준 공동 정의 · OCP",
      "레퍼런스 스택의 기본 디바이스 · 수명 보증 SLA"],
     "고객 보증 범위: 시스템 수준 TCO"),
]
STK_W, LH, LG = 3.76, 0.74, 0.06
for i, (ph, ttl, states, techs, outcome) in enumerate(phase_defs):
    x = MX + i * (P_W + 0.33)
    hot = i == 2
    rect(s, x, P_Y, P_W, P_H, fill=TINT if hot else WHITE, line=None if hot else LINE, line_w=0.75)
    tb(s, x + 0.38, P_Y + 0.16, P_W - 0.76, 0.34, [[(ph + "  ", 18, True, BLUE), (ttl, 18, True, INK)]])
    sx, sy0 = x + 0.38, P_Y + 0.60
    ys = stack2(s, sx, sy0, STK_W, LAYER_NAMES, techs, states, layer_h=LH, gap=LG)
    ax = sx + STK_W + 0.18
    aw = x + P_W - ax - 0.16
    if i == 0:
        # 범례(색 = 삼성이 닿는 층)를 Phase 1 옆에 배치
        ly0 = ys[1] + 0.10
        for k, (fill, line, t) in enumerate([(BLUE, None, "삼성 코드·제품"), (BLUE_T2, None, "관측·분석"), (WHITE, LINE, "고객 영역")]):
            yy = ly0 + k * 0.40
            rect(s, ax, yy + 0.04, 0.26, 0.18, fill=fill, line=line, line_w=0.75)
            tb(s, ax + 0.34, yy, aw - 0.34, 0.26, [(t, 11.25, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE)
    elif i == 1:
        top, bot = ys[0] + 0.08, ys[4] + LH - 0.08
        v_arrow(s, ax, top, 0.22, bot - top, fill=BLUE_T2)
        v_arrow(s, ax + 0.28, top, 0.22, bot - top, up=True, fill=BLUE)
        tb(s, ax + 0.58, ys[1], aw - 0.58, LH, [("트레이스", 12.0, True, INK), ("수집 ↓", 11.0, False, GRAY)],
           anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)
        tb(s, ax + 0.58, ys[3], aw - 0.58, LH, [("배치 정책", 12.0, True, BLUE), ("반영 ↑", 11.0, False, GRAY)],
           anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)
    else:
        pw = person(s, ax + 0.02, ys[1] + 0.12, 0.50, color=BLUE)
        tb(s, ax + pw + 0.10, ys[1], aw - pw - 0.10, LH, [("FDE 상주", 12.75, True, BLUE), ("공동 설계", 11.25, False, GRAY)],
           anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)
        tb(s, ax, ys[2], aw, LH, [("메인라인", 12.75, True, BLUE), ("머지", 11.25, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)
        tb(s, ax, ys[0], aw, LH, [("공용 TCO", 12.75, True, INK), ("모델", 11.25, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)
    tb(s, x + 0.38, P_Y + P_H - 0.44, P_W - 0.76, 0.34, [(outcome, 14.25, True, INK)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.05)

BAR_Y, BAR_H = P_Y + P_H + 0.10, 0.16
for i in range(3):
    x = MX + i * (P_W + 0.33)
    rect(s, x, BAR_Y, P_W, BAR_H, fill=WHITE, line=LINE, line_w=0.75)
rect(s, MX, BAR_Y, P_W * 0.60, BAR_H, fill=BLUE)
rect(s, MX + P_W * 0.60, BAR_Y, P_W * 0.40, BAR_H, fill=BLUE_T2)
rect(s, MX + P_W + 0.33, BAR_Y, P_W * 0.15, BAR_H, fill=BLUE_T2)
mk_x = MX + P_W * 0.60
rect(s, mk_x - 0.13, BAR_Y + BAR_H + 0.03, 0.26, 0.18, fill=BLUE, shape=MSO_SHAPE.ISOSCELES_TRIANGLE)
tb(s, mk_x + 0.22, BAR_Y + BAR_H - 0.02, 13.0, 0.30,
   [[("삼성 현 위치  ", 13.5, True, BLUE), ("Phase 1 진행 중(QLC 라인의 배치 핸들 수·유효 DWPD 미공개 · CMX 첫 공급은 TLC) · Phase 2 준비 · Phase 3 미착수", 12.0, False, GRAY)]],
   anchor=MSO_ANCHOR.MIDDLE)

band(s, 9.46, 0.76, "결론",
     "단계마다 고객 보증 범위가 원가·전력 → 워크로드 수명 → 시스템 TCO로 확장됩니다.\n삼성은 1단계 진행 중·2단계 준비 단계이며, 3단계 진입 수단이 다음 장입니다",
     main_size=17, next_step=5)
footer(s, "출처: Solidigm·Kioxia·Micron 사양(DWPD), NVMe 스펙(네임스페이스당 배치 핸들 128 상한)·XFS 쓰기 스트림 16, GitHub README 확인(LMCache·Mooncake·FlexKV·xNVMe), CacheLib FDP 문서(WAF), Linux 6.16, NVIDIA CMX 문서", 5)
notes(s, "4장은 해법의 제안입니다. 1장이 제기한 내구성 격차를 해소하는 경로이며, 3장의 산식에서 남은 보상 변수는 WAF이고, WAF는 호스트가 데이터 수명에 따라 배치를 결정할 때 1에 수렴하므로 내구성 격차는 디바이스가 아니라 고객 시스템의 배치 방식에서 해소됩니다. 그래서 역량을 디바이스에서 고객 시스템 계층까지 3단계로 확장합니다. 리드의 인용은 베인 신문섭 파트너의 진단으로 같은 결론입니다. "
      "상단 타일은 격차와 수단입니다. 내구성 격차(요구 1~3 DWPD 대비 현 QLC 정격 0.6으로 2~5배), 요구 분리 스트림 16개(XFS 쓰기 스트림 상한, 제품 지원 수는 업계 미공개), 접점 부재(KV 캐시 관리자 4종 코드에 배치 규격 언급 0건), 해소 수단 실증(CacheLib 배치 표준 적용 WAF 3.22→1.03, XFS write streams RocksDB -35%, ScaleFlux 유효 7~10 DWPD). "
      "그림은 고객 시스템 5계층을 세 번 그리고 삼성이 닿는 층을 색으로 표시하며(파랑 = 삼성 코드·제품, 연파랑 = 관측·분석, 흰색 = 고객 영역), 각 층에 그 층을 구성하는 기술을 적었습니다. 응용·추론 엔진(vLLM·SGLang·TensorRT-LLM), KV 캐시 관리자(NVIDIA Dynamo KVBM·LMCache·Mooncake·Tencent FlexKV), I/O 라이브러리(NIXL·GPUDirect Storage·io_uring·SPDK/xNVMe), 커널·플랫폼(Linux 6.16 write streams·XFS/f2fs 스트림·NVIDIA CMX와 DOCA Memos), SSD 디바이스(컨트롤러·배치 핸들 펌웨어·2Tb QLC·NVMe KV 확장·텔레메트리). "
      "Phase 1 배치 표준 디바이스 확보: SSD 층만 삼성의 범위이며 고객 보증 범위는 정격 내 QLC 원가·전력입니다. Phase 2 워크로드 실측 기반 최적화: 캐시 관리자의 빈도 필터·퇴거 정책이 트레이스의 원천이고, I/O 라이브러리의 io_uring·GDS 백엔드에 write stream을 부착하며 커널 스트림과 CMX 힌트 매핑을 검증해 배치 핸들 정책·WAF·유효 DWPD 실측을 공개합니다. 고객 보증 범위는 고객 워크로드 기준 수명입니다. Phase 3 고객 시스템 내 공동 설계: 캐시 관리자 4종에 플러그인을 메인라인으로 머지하고, NIXL·xNVMe가 기본 백엔드가 되며, DOCA Memos와 배치 표준의 매핑을 NVIDIA와 공동 정의하고, 응용 층은 커넥터·스케줄러를 분석해 공용 TCO 모델(GPU당 동시 사용자·TTFT·전력)로 협의합니다. FDE(Forward Deployed Engineer)가 고객 시스템에 상주합니다. 고객 보증 범위는 시스템 수준 TCO입니다. "
      "삼성 현 위치는 정직하게 Phase 1 진행 중입니다. CMX 첫 공급은 TLC이고 QLC 라인의 배치 핸들 수와 유효 DWPD는 공개돼 있지 않습니다. Phase 2는 준비 단계로 KV cache 백서 2종으로 측정 역량은 있으나 트레이스 기반 실측이 미공개이고, Phase 3는 캐시 관리자 4종 기여 0건으로 미착수입니다. 오케스트레이션 자체는 만들지 않습니다. 결론: 단계마다 고객 보증 범위가 원가·전력 → 워크로드 수명 → 시스템 TCO로 확장되며, 3단계에 진입하는 수단(선별된 고객에의 FDE·업스트림·규격 채널)과 개발실 내부 실행이 5장입니다.")

# ================================================================ S6. 실행 — 두 트랙 그림(v6.1: v3.x 형식 복귀 — 좌 개발실 / 중앙 ①FDE 상주 → ←② 접근권 + 선례 / 우 고객 시스템)
s = prs.slides.add_slide(BLANK)
header(s, 6,
       "3단계 진입은 워크로드를 개방하는 고객에 FDE를 집중하고, 그 외는 업스트림·규격으로 협업합니다",
       [("「단 한 번도 고객 지향적인 적이 없었다. 진짜 고객 지향이 뭔지 이해하고, 그것을 위한 전략이 필요한 시점이 이미 됐다」", 18, False, INK),
        ("   송용호 · AX/PI센터장, 2026-09", 13.5, False, GRAY_2)])

Y0 = 2.80
LW5, GAP5 = 3.15, 0.24
CX5 = MX + LW5 + GAP5
CW5 = 10.10
RX5 = CX5 + CW5 + GAP5
RW5 = RIGHT - RX5
TOP_H = 4.86                      # 상단 그림 블록 높이

# ---- 좌: 삼성 개발실 ----
rect(s, MX, Y0, LW5, TOP_H, fill=WHITE, line=LINE, line_w=0.75)
tb(s, MX + 0.22, Y0 + 0.16, LW5 - 0.44, 0.30, [("삼성 개발실", 15, True, BLUE)])
tb(s, MX + 0.22, Y0 + 0.46, LW5 - 0.44, 0.22, [("삼성이 제공하는 것", 10.0, False, GRAY_2)])
gives = ["KV-ready QLC + 수명 보증", "FDE (고객 상주 엔지니어)", "업스트림 코드 · 공용 TCO 모델", "WAF 급등 감지 · 런타임 대응"]
gy = Y0 + 0.92
for i, g in enumerate(gives):
    rect(s, MX + 0.26, gy + 0.09, 0.13, 0.13, fill=BLUE)
    tb(s, MX + 0.50, gy, LW5 - 0.72, 0.56, [(g, 12.0, True, INK)], spacing=1.02)
    gy += 0.66
quote(s, MX + 0.22, Y0 + TOP_H - 1.20, LW5 - 0.44, 1.06,
      "고객의 집에 가서 저녁을 같이 먹는 것, 삼성은 상상할 수 없는 일이지만 SK하이닉스는 한다",
      "송용호 · 고객 관계 = 워크로드 접근권", size=10.5)

# ---- 중앙: ① FDE 상주 → / 선례 2 / ← ② 접근권 확보 ----
AR_H = 0.80


def _fat_arrow(sp, body=0.86):
    """화살표 몸통 두께(기본 0.5)를 키워 텍스트가 몸통 안에 들어오게 한다."""
    try:
        sp.adjustments[0] = body
    except Exception:
        pass
    return sp


_fat_arrow(rect(s, CX5, Y0, CW5, AR_H, fill=BLUE, shape=MSO_SHAPE.RIGHT_ARROW))
tb(s, CX5 + 0.34, Y0 + 0.08, CW5 - 1.30, 0.28, [("① FDE 상주 : 삼성 엔지니어가 고객 시스템 안으로", 15, True, WHITE)])
tb(s, CX5 + 0.34, Y0 + 0.38, CW5 - 1.30, 0.24, [("상주 엔지니어 · 업스트림 코드 · 워크로드 실측 공개", 10.5, False, BLUE_T2)])

CARD_Y = Y0 + AR_H + 0.14
CARD_H = TOP_H - AR_H - AR_H - 0.28
CARD_W = (CW5 - 0.20) / 2

# 카드 A: 고객 선별 · 채널
rect(s, CX5, CARD_Y, CARD_W, CARD_H, fill=WHITE, line=LINE, line_w=0.75)
tb(s, CX5 + 0.20, CARD_Y + 0.10, CARD_W - 0.40, 0.24, [("고객 선별 · 채널", 12.0, True, BLUE)])
tb(s, CX5 + 0.20, CARD_Y + 0.33, CARD_W - 0.40, 0.22,
   [("FDE 상주 조건 · ① 트레이스 접근 ② 캐시 관리자 자체 운영 ③ 물량·규격 파급력", 8.5, False, GRAY_2)])
chans = [(True, "AI 랩", "Anthropic · OpenAI", "FDE 상주 Pod 3~5명"),
         (True, "NVIDIA 생태계", "CMX · Dynamo KVBM · NIXL", "FDE 플랫폼 팀 파견"),
         (False, "하이퍼스케일러", "Meta · Google · MS · AWS", "업스트림 · OCP 규격"),
         (False, "OEM · 네오클라우드", "자체 캐시 스택 없음", "레퍼런스 스택 제공")]
cy = CARD_Y + 0.60
CH5 = (CARD_H - 0.60 - 0.14) / 4
for hot, who, what, how in chans:
    if hot:
        rect(s, CX5 + 0.16, cy, CARD_W - 0.32, CH5 - 0.06, fill=TINT)
        rect(s, CX5 + 0.16, cy, 0.05, CH5 - 0.06, fill=BLUE)
    tb(s, CX5 + 0.30, cy, 2.40, CH5 - 0.06, [(who, 11.25, True, BLUE if hot else INK), (what, 9.0, False, GRAY)],
       anchor=MSO_ANCHOR.MIDDLE, spacing=1.04)
    rect(s, CX5 + 2.74, cy + (CH5 - 0.06) / 2 - 0.08, 0.22, 0.16, fill=BLUE if hot else BLUE_T2, shape=MSO_SHAPE.RIGHT_ARROW)
    tb(s, CX5 + 3.06, cy, CARD_W - 3.24, CH5 - 0.06, [(how, 11.25, True, BLUE if hot else GRAY)], anchor=MSO_ANCHOR.MIDDLE)
    cy += CH5

# 카드 B: 선례
BX = CX5 + CARD_W + 0.20
rect(s, BX, CARD_Y, CARD_W, CARD_H, fill=WHITE, line=LINE, line_w=0.75)
tb(s, BX + 0.20, CARD_Y + 0.10, CARD_W - 0.40, 0.24, [[("선례 · ", 12.0, False, GRAY_2), ("Palantir FDE", 12.0, True, BLUE),
                                                       ("   상주 → 코드 → 성과 평가", 9.0, False, GRAY)]])
py5 = CARD_Y + 0.46
px5 = BX + 0.26
for k in range(3):
    px5 += person(s, px5, py5, 0.42) + 0.08
rect(s, px5 + 0.08, py5 + 0.13, 0.30, 0.18, fill=BLUE_T2, shape=MSO_SHAPE.RIGHT_ARROW)
rect(s, px5 + 0.46, py5 - 0.02, 1.32, 0.46, fill=WHITE, line=BLUE, line_w=1.0)
tb(s, px5 + 0.46, py5 - 0.02, 1.32, 0.46, [("고객 현장", 11.25, True, INK)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
tb(s, BX + 0.26, CARD_Y + 1.00, CARD_W - 0.52, 0.44,
   [("요구를 코드로 구현하고 성과로 평가 · 주가 수익률 640%", 9.5, False, GRAY),
    ("Anthropic · OpenAI가 GTM 모델로 채택", 9.5, False, GRAY)], spacing=1.08)
rect(s, BX + 0.22, CARD_Y + 1.48, CARD_W - 0.44, 0.012, fill=LINE)
tb(s, BX + 0.22, CARD_Y + 1.56, CARD_W - 0.44, 0.26, [[("선례 · ", 12.75, False, GRAY_2), ("Micron ↔ Anthropic SCA", 12.75, True, BLUE),
                                                       ("   2026-06", 9.5, False, GRAY)]])
sca = ["공동 설계", "다년 공급", "운영 통합", "자본"]
SW5, SH5 = 1.20, 0.32
for i, nm in enumerate(sca):
    gx_, gy_ = BX + 0.26 + (i % 2) * (SW5 + 0.12), CARD_Y + 1.90 + (i // 2) * (SH5 + 0.08)
    rect(s, gx_, gy_, SW5, SH5, fill=BLUE if i == 0 else BLUE_T2)
    tb(s, gx_, gy_, SW5, SH5, [(nm, 10.0, True, WHITE if i == 0 else INK)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
tb(s, BX + 0.26 + 2 * SW5 + 0.34, CARD_Y + 1.88, CARD_W - 2 * SW5 - 0.86, 0.74,
   [("네 요소를 한 계약에 결합", 9.5, False, GRAY),
    ("Micron SCA 16건 · 최소 매출 약 $100B", 9.5, True, INK)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.08)
tb(s, BX + 0.26, CARD_Y + 2.64, CARD_W - 0.52, 0.28,
   [("삼성 · SK의 Anthropic 계약엔 공동 설계 조항 부재 → 삼성이 선제 제안", 9.75, True, BLUE)])

AY2 = Y0 + TOP_H - AR_H
_fat_arrow(rect(s, CX5, AY2, CW5, AR_H, fill=BLUE_T2, shape=MSO_SHAPE.LEFT_ARROW))
tb(s, CX5 + 1.10, AY2 + 0.08, CW5 - 1.40, 0.28, [("② 접근권 확보 : 워크로드 트레이스 · KV 수명 정책 · 규격", 15, True, BLUE)])
tb(s, CX5 + 1.10, AY2 + 0.38, CW5 - 1.40, 0.24, [("계약 시한 2027년 상반기 — 공급 완화 전에 락인", 10.5, False, GRAY)])

# ---- 우: 고객 시스템 ----
rect(s, RX5, Y0, RW5, TOP_H, fill=WHITE, line=LINE, line_w=0.75)
tb(s, RX5 + 0.22, Y0 + 0.16, RW5 - 0.44, 0.30, [("고객 시스템", 15, True, BLUE)])
tb(s, RX5 + 0.22, Y0 + 0.46, RW5 - 0.44, 0.22, [("삼성 인력 · 코드의 진입 계층", 10.0, False, GRAY_2)])
ST_W = RW5 - 1.50
ys5 = stack(s, RX5 + 0.22, Y0 + 0.92, ST_W,
            ["응용 · 추론 엔진", "KV 캐시 관리자", "I/O 라이브러리 · 커널", "SSD : 삼성 QLC"],
            ["none", "touch", "touch", "own"], layer_h=0.56, gap=0.12, size=12.75)
pw5 = person(s, RX5 + ST_W + 0.34, ys5[1] + 0.06, 0.46)
tb(s, RX5 + ST_W + 0.34 + pw5 + 0.08, ys5[1], 0.80, 0.56, [("FDE", 11.25, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
tb(s, RX5 + ST_W + 0.34, ys5[2], RW5 - ST_W - 0.56, 0.56, [("코드 머지", 10.5, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE)
logo_row(s, [("logo", "anthropic"), ("logo", "openai"), ("logo", "nvidia"), ("logo", "meta")],
         RX5 + 0.30, Y0 + TOP_H - 0.74, 0.34, gap=0.26, max_w=RW5 - 0.60)

# ---- 하단: 조직 · 인사 · 문화 ----
B_Y = Y0 + TOP_H + 0.24
B_H = 9.42 - 0.20 - B_Y
axes = [("조직", "시스템 소프트웨어 조직 강화", ["Co-Design Pod 3~5명 · 개발실 소속", "선별 고객 1~2사 상주 · 미주 법인 협업"]),
        ("인사", "고객 시스템을 아는 시스템 SW 전문가 채용 · 양성", ["채용 기준 = 고객 코드를 읽고 고치는가", "본사 엔지니어 상주 로테이션 3~6개월", "평가 = 머지 · 실측 공개 · 디자인인"]),
        ("문화", "오픈소스 생태계를 주도하는 문화", ["메인테이너 · 커미터 배출 · 업스트림 우선", "KV 캐시 실측(WAF · 유효 DWPD) 업계 최초 공개"])]
AW = (CW - 2 * 0.24) / 3
for i, (lab, head, lines) in enumerate(axes):
    ax5 = MX + i * (AW + 0.24)
    rect(s, ax5, B_Y, AW, B_H, fill=WHITE, line=LINE, line_w=0.75)
    rect(s, ax5, B_Y, 0.88, B_H, fill=BLUE)
    tb(s, ax5, B_Y, 0.88, B_H, [(lab, 15, True, WHITE)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    tb(s, ax5 + 1.06, B_Y + 0.16, AW - 1.24, 0.30, [(head, 12.0, True, INK)])
    tb(s, ax5 + 1.06, B_Y + 0.48, AW - 1.24, B_H - 0.60, [(l, 10.0, False, GRAY) for l in lines], spacing=1.12)

band(s, 9.42, 0.80, "결론",
     "FDE 상주로 고객 시스템에 들어가고, 전략적 협약으로 워크로드·규격 접근권을 받습니다. 두 수단 모두 업계 선례가 있습니다.\n"
     "개발실은 조직·인사·문화 세 축을 그 실행에 맞춥니다",
     main_size=16.5, next_step=7)
footer(s, "출처: Pragmatic Engineer·FDE Academy(Palantir FDE), Micron IR 2026-06-22·10-Q(SCA 16건·$22B), SK hynix 뉴스룸, 내부 인터뷰(송용호 2026-09-03) · 규모·시점은 추정, 사내 수치는 [사내 확인]", 6)
notes(s, "5장은 실행입니다. 3단계 역량을 어떻게 얻느냐, 즉 고객 시스템 안으로 들어가는 두 수단을 그림 하나로 보입니다. 왼쪽은 삼성 개발실이 제공하는 것이고, 오른쪽은 고객 시스템의 계층이며, 가운데 두 화살표가 주고받는 관계입니다. "
      "위쪽 화살표 ① FDE 상주는 삼성이 보내는 것입니다. 상주 엔지니어가 고객 시스템 안에서 요구를 코드로 구현하고, 업스트림에 기여하며, 워크로드 실측을 공개합니다. 아래쪽 화살표 ② 접근권 확보는 삼성이 받는 것입니다. 워크로드 트레이스, KV 수명 정책, 규격 접근권이며 계약 시한은 2027년 상반기입니다. 공급이 완화되기 전에 락인을 걸어야 하기 때문입니다. "
      "가운데 왼쪽 카드가 고객 선별입니다. FDE를 모든 고객에 보낼 수는 없으므로 세 조건으로 거릅니다. 트레이스 접근을 허용하는가, 캐시 관리자 코드를 자체 운영하는가, 물량과 규격에 파급력이 있는가. AI 랩과 NVIDIA 생태계가 조건을 충족하므로 FDE를 상주시키고, 하이퍼스케일러는 보안과 중립성 때문에 내부 코드 상주가 불가하므로 업스트림과 OCP 규격으로, OEM과 네오클라우드는 레퍼런스 스택으로 넓힙니다. "
      "오른쪽 카드가 선례입니다. Palantir의 FDE는 고객 현장에 상주해 요구를 코드로 구현하고 성과로 평가받는 모델이고, 고객 락인의 동력으로 평가받아 Anthropic과 OpenAI가 시장 진입 모델로 채택했습니다. Micron과 Anthropic의 전략적 협약은 공동 설계, 다년 공급, 운영 통합, 자본을 한 계약에 결합해 워크로드와 규격 접근권을 확보한 사례입니다. 중요한 것은 삼성과 SK의 Anthropic 공급 계약에는 공동 설계 조항이 없다는 점이고, 이것을 삼성이 먼저 제안하자는 것이 이 장의 요청입니다. "
      "오른쪽 고객 시스템 그림에서 삼성이 지금 닿는 층은 SSD뿐입니다. FDE가 KV 캐시 관리자 층에 상주하고 I/O 라이브러리와 커널에 코드를 머지하면서 위로 올라갑니다. "
      "하단 세 타일은 개발실 내부 실행입니다. 조직은 시스템 소프트웨어 조직 강화와 개발실 소속 Co-Design Pod, 인사는 고객 코드를 읽고 고치는 전문가 채용과 상주 로테이션, 문화는 오픈소스 메인테이너 배출과 KV 캐시 실측의 업계 최초 공개입니다. 자회사나 별도 보상 체계는 두지 않습니다. "
      "단계별 통과 조건(90일·12개월·2027년 상반기)과 판돈·비용은 슬라이드에서 빼고 보고서 5장 4절과 5절에 두었습니다. 질문이 나오면 그 표로 답합니다. 판돈은 락인으로 얻는 캐시 계층 점유율이고, 2030년 추론 캐시 350EB 가운데 QLC는 호스트 협력이 성립할 때 조건부 상방 175EB입니다. 비용은 개발실 개발 자원 재배치이며 별도 투자는 없습니다.")

# ================================================================ S7. WAF 런타임 대응 기술 (v7.0: 루프 도해 + 기술 목록, 텍스트·박스 축소)
s = prs.slides.add_slide(BLANK)
header(s, 7,
       "WAF 변동 리스크는 계약이 아니라 런타임 감지·대응 기술로 흡수하며, 그 기술 요소를 확보합니다",
       "조건부 보증은 리스크를 고객에게 되돌려 수용성이 낮습니다. 같은 리스크를 감지와 재구성으로 흡수합니다.")


def _img7(name, x, y, w):
    return s.shapes.add_picture(os.path.join(ASSETS, name), Inches(x), Inches(y), width=Inches(w))


A_Y = 2.80
CHW7 = 7.60
_img7("s6_waf_runtime.png", MX, A_Y, CHW7)                 # 6.85 × 2.92 → 7.60 × 3.24

# ---- 우: 감지 → 대응 루프 (2 × 2 순환) ----
RX7 = MX + CHW7 + 0.30
RW7 = RIGHT - RX7
BW7, BH7 = (RW7 - 0.62) / 2, 1.42
VG = 0.40
pos = [(RX7, A_Y), (RX7 + BW7 + 0.62, A_Y),
       (RX7 + BW7 + 0.62, A_Y + BH7 + VG), (RX7, A_Y + BH7 + VG)]
loop = [
    ("①", "관측", "핸들별 호스트 기록량 ÷ 물리 매체 기록량", ["초 단위 샘플링"], False),
    ("②", "감지 · 분류", "변화점 탐지 · 원인 추정", ["수명 오분류 · 핸들 간섭 · 힌트 손실"], False),
    ("③", "대응", "런타임 재구성", ["디바이스: FDP 구성 · RU 크기 · 핸들 재할당", "호스트: 캐시 정책 · 스트림 매핑"], True),
    ("④", "검증", "재측정 · 미달 시 롤백", ["대응 이력이 보증 근거"], False),
]
for (px, py), (no, nm, what, chips, hot) in zip(pos, loop):
    rect(s, px, py, BW7, BH7, fill=TINT if hot else WHITE, line=BLUE, line_w=1.5 if hot else 0.75)
    tb(s, px + 0.22, py + 0.10, BW7 - 0.44, 0.28, [[(no + "  ", 13.5, True, BLUE), (nm, 13.5, True, BLUE)]])
    tb(s, px + 0.22, py + 0.38, BW7 - 0.44, 0.24, [(what, 10.5, False, GRAY)])
    cy7 = py + 0.68
    for c in chips:
        rect(s, px + 0.22, cy7, BW7 - 0.44, 0.28, fill=BLUE if hot else WHITE, line=None if hot else BLUE_T2, line_w=0.75)
        tb(s, px + 0.34, cy7, BW7 - 0.68, 0.28, [(c, 9.5, hot, WHITE if hot else GRAY)], anchor=MSO_ANCHOR.MIDDLE)
        cy7 += 0.32
rect(s, RX7 + BW7 + 0.10, A_Y + BH7 / 2 - 0.12, 0.42, 0.24, fill=BLUE, shape=MSO_SHAPE.RIGHT_ARROW)
rect(s, RX7 + BW7 + 0.62 + BW7 / 2 - 0.12, A_Y + BH7 + 0.06, 0.24, 0.28, fill=BLUE, shape=MSO_SHAPE.DOWN_ARROW)
rect(s, RX7 + BW7 + 0.10, A_Y + BH7 + VG + BH7 / 2 - 0.12, 0.42, 0.24, fill=BLUE, shape=MSO_SHAPE.LEFT_ARROW)
rect(s, RX7 + BW7 / 2 - 0.12, A_Y + BH7 + 0.06, 0.24, 0.28, fill=BLUE, shape=MSO_SHAPE.UP_ARROW)
tb(s, RX7, A_Y + 2 * BH7 + VG + 0.08, RW7, 0.26,
   [[("목표 주기  ", 10.5, True, BLUE), ("감지 1시간 · 회복 4시간 · 오실레이션 방지와 성능 영향 상한은 정책 엔진이 관리", 10.0, False, GRAY)]])

# ---- 하단: 확보해야 할 기술 요소 ----
B_Y = A_Y + 2 * BH7 + VG + 0.48
tb(s, MX, B_Y, CW, 0.28,
   [[("확보해야 할 기술 요소", 13.5, True, BLUE), ("   루프를 돌리려면 여섯 가지가 필요하고, 그중 셋은 지금 없습니다", 10.5, False, GRAY_2)]])
techs = [("T1", "핸들별 WAF 텔레메트리", "부분", "드라이브 단위 누적만(OCP C0) → 핸들별 · 초 단위"),
         ("T2", "온디바이스 급등 감지", "부분", "사후 로그 분석 → 변화점 탐지 · 오탐 억제"),
         ("T3", "무중단 FDP 재구성", "없음", "구성이 네임스페이스 생성 시 고정 → 운영 중 전환"),
         ("T4", "디바이스 → 호스트 경보", "없음", "배치 열화를 알리는 규격 부재 → 이벤트 · 원인 코드"),
         ("T5", "정책 엔진 · 안전장치", "없음", "수동 조치 → 오실레이션 방지 · 상한 · 롤백"),
         ("T6", "검증 환경", "부분", "실드라이브 실험만 → FDP 에뮬레이터 · 트레이스 재생")]
TY7 = B_Y + 0.34
TW7 = (CW - 0.40) / 2
for i, (tid, nm, st, gap) in enumerate(techs):
    col, row = i % 2, i // 2
    tx7 = MX + col * (TW7 + 0.40)
    ty7 = TY7 + row * 0.56
    none_ = st == "없음"
    rect(s, tx7, ty7, 0.52, 0.42, fill=BLUE if none_ else BLUE_T2)
    tb(s, tx7, ty7, 0.52, 0.42, [(tid, 11.25, True, WHITE if none_ else INK)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    tb(s, tx7 + 0.64, ty7, 3.10, 0.42, [(nm, 12.0, True, INK)], anchor=MSO_ANCHOR.MIDDLE)
    rect(s, tx7 + 3.82, ty7 + 0.09, 0.68, 0.24, fill=WHITE, line=RED if none_ else GRAY_2, line_w=1.0)
    tb(s, tx7 + 3.82, ty7 + 0.09, 0.68, 0.24, [(st, 9.0, True, RED if none_ else GRAY)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    tb(s, tx7 + 4.62, ty7, TW7 - 4.62, 0.42, [(gap, 9.75, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE)
K_Y7 = TY7 + 3 * 0.56 + 0.10
rect(s, MX, K_Y7, CW, 0.40, fill=TINT)
rect(s, MX, K_Y7, 0.06, 0.40, fill=BLUE)
tb(s, MX + 0.26, K_Y7, CW - 0.52, 0.40,
   [[("T3 · T4는 NVMe · OCP 규격 제안이 함께 필요합니다  ", 11.25, True, BLUE),
     ("보증은 관행대로 TBW 선도달을 유지하고, 유효 DWPD는 부가 표기, 대응 이력과 재측정 리포트를 계약 부속으로 둡니다", 10.0, False, GRAY)]],
   anchor=MSO_ANCHOR.MIDDLE)

band_chain(s, 9.10, 1.06, "요약", [
    ("1 문제", "고객과 함께 수요 설계\nQLC에 1~3 DWPD"),
    ("2 신뢰성", "다이 요구 10 ppm대\nSSD 내부 구조로"),
    ("3 내구성", "잔여 변수는 WAF\n호스트가 결정"),
    ("4 배치 힌트", "수명 분리로\nWAF 3 → 1"),
    ("5 역량", "디바이스 → 워크로드\n→ 고객 시스템"),
    ("6 실행", "FDE 상주\n전략적 협약"),
    ("7 대응 기술", "급등 감지 ·\n런타임 재구성"),
], head_size=10.5, body_size=9.0)
footer(s, "출처: OCP 사양(SMART C0), NVMe TP4146 FDP 구성 정의, FAST'26 WARP(배치 실패 조건·에뮬레이터), 삼성 PM9A3·Micron 보증 정책 · 목표 동작 곡선은 모식도(⚠️)", 7)
notes(s, "7장입니다. 종전 문안은 유효 DWPD를 WAF 밴드별 조건부로 보증하는 계약 설계였는데, 그 구조는 워크로드가 바뀌면 보증이 깨지는 책임을 사실상 고객에게 되돌립니다. 그래서 축을 옮깁니다. 같은 리스크를 계약이 아니라 기술로 흡수합니다. "
      "왼쪽 그림이 목표 동작입니다. 실측이 아니라 모식도입니다. 정상 구간에서 WAF는 1.05 수준인데 워크로드가 바뀌거나 배치 힌트가 사라지면 2.7 수준으로 뜁니다. 대응이 없으면 붉은 점선처럼 정격 수준에 머물고, 그 차이 면적이 그대로 초과 기입량이자 보증 수명 손실입니다. 4장 넷째 케이스가 현실에서 이 상황을 만듭니다. "
      "오른쪽이 루프입니다. 관측에서 핸들별로 WAF를 구하고, 감지에서 변화점을 탐지해 원인을 수명 오분류·핸들 간섭·힌트 손실로 분류하며, 대응에서 디바이스는 FDP 구성과 핸들 재할당을, 호스트는 캐시 정책과 스트림 매핑을 바꾸고, 검증에서 재측정 후 미달이면 롤백합니다. 목표 주기는 감지 한 시간, 회복 네 시간입니다. "
      "아래가 확보해야 할 여섯 가지입니다. T1 텔레메트리와 T2 감지, T6 검증 환경은 부분적으로 있고, T3 무중단 FDP 재구성과 T4 디바이스에서 호스트로 가는 경보, T5 정책 엔진은 지금 없습니다. 특히 T3가 가장 큰 공백입니다. FDP 구성은 네임스페이스를 만들 때 선택되므로 운영 중에 바꾸는 경로가 스펙에 없습니다. T3와 T4는 우리가 만들 뿐 아니라 NVMe와 OCP에 규격으로 제안해야 하고, OCP 사양은 구매자가 쓰는 문서이므로 거기에 들어가면 곧 업계 요구가 됩니다. 1장 교훈의 직접적 적용입니다. "
      "보증은 없애지 않고 축소합니다. 기준은 관행대로 TBW 선도달로 두고 유효 DWPD는 부가 표기로, 대응 이력과 재측정 리포트를 계약 부속으로 둡니다. 기술이 흡수한 만큼만 계약에 남긴다는 원칙입니다. 하단 요약 체인이 이 덱 전체의 논리입니다.")

prs.save(os.path.abspath(OUT))
print(f"생성 완료: {os.path.abspath(OUT)} ({len(prs.slides._sldIdLst)}장)")
