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
TOTAL = 6

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


STORY = [("1", "문제", "왜 지금 필요한가"), ("2", "신뢰성", "SSD 내부 해법"), ("3", "해법 사다리", "왜 호스트인가"),
         ("4", "역량", "어떻게 해소하는가"), ("5", "실행", "누구와 어디서"), ("6", "대응 기술", "무엇을 확보하나")]


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


# ================================================================ S1. 문제 제기 — 시간축 = 논리축 (v6.0: 교훈 3개 팩트체크 반영 · 구매 기준 추이 · 수요 경로 그래프)
s = prs.slides.add_slide(BLANK)
header(s, 1,
       "AI 추론 수요는 QLC에 고용량·1~3 DWPD를 요구하며, 신뢰성·내구성 두 축의 해법이 필요합니다",
       "두 다운턴의 교훈은 요구를 고객 시스템 안에서 먼저 관측하라는 것이었고, 지금 그 요구는 대용량과 높은 DWPD로 이동하고 있습니다.")


def _img1(name, x, y, w):
    return s.shapes.add_picture(os.path.join(ASSETS, name), Inches(x), Inches(y), width=Inches(w))


# ---- 타임라인(2018 → 2030.5) ----
TX0, TX1 = MX + 0.30, RIGHT - 0.30
def tx(year):
    return TX0 + (TX1 - TX0) * (year - 2018.0) / 12.5
AX_Y = 3.42
rect(s, TX0, AX_Y - 0.01, TX1 - TX0, 0.02, fill=LINE)
for y0, y1, lab in [(2018.75, 2019.95, "DT19 재고 조정 · -37.6%"), (2022.25, 2023.75, "DT23 최대 낙폭 -45% · 진앙 eSSD")]:
    rect(s, tx(y0), AX_Y - 0.13, tx(y1) - tx(y0), 0.26, fill=BLUE_T2)
    tb(s, tx(y0) - 0.2, AX_Y + 0.16, tx(y1) - tx(y0) + 1.6, 0.22, [(lab, 11.25, True, BLUE)])
rect(s, tx(2027.7), AX_Y - 0.13, tx(2028.7) - tx(2027.7), 0.26, fill=WHITE, line=BLUE, line_w=1.0)
tb(s, tx(2027.4), AX_Y + 0.16, 3.0, 0.22, [("차기 전환점(e) · 가격 정상화", 11.25, True, BLUE)])
for yr in range(2018, 2031, 2):
    tb(s, tx(yr) - 0.4, AX_Y + 0.38, 0.8, 0.2, [(str(yr), 10.5, False, GRAY_2)], align=PP_ALIGN.CENTER)
marks = [(2019.3, "up", "2019", "HBM 시장 가능성 과소평가"),
         (2022.9, "down", "2022-11", "NVMe FDP 비준"),
         (2024.1, "up", "2024-01", "Meta 프로덕션 코드에 FDP 머지"),
         (2026.6, "down", "2026", "KV 캐시 배치 힌트 인터페이스 부재")]
for yr, side, d, t in marks:
    cx = tx(yr)
    rect(s, cx - 0.08, AX_Y - 0.08, 0.16, 0.16, fill=BLUE, shape=MSO_SHAPE.OVAL)
    runs = [[(d + "  ", 11.25, True, INK), (t, 11.25, False, GRAY)]]
    if side == "up":
        rect(s, cx - 0.006, AX_Y - 0.42, 0.012, 0.30, fill=LINE)
        tb(s, cx - 1.6, AX_Y - 0.66, 3.2, 0.24, runs, align=PP_ALIGN.CENTER)
    else:
        rect(s, cx - 0.006, AX_Y + 0.12, 0.012, 0.44, fill=LINE)
        tb(s, cx - 1.6, AX_Y + 0.58, 3.2, 0.24, runs, align=PP_ALIGN.CENTER)
        if yr > 2026:
            tb(s, cx - 1.6, AX_Y + 0.80, 3.2, 0.2,
               [("= KV 블록의 수명 등급을 NVMe 배치 핸들로 전달하는 코드 경로", 8.5, False, GRAY_2)], align=PP_ALIGN.CENTER)

# ---- 세 패널 ----
P_Y = AX_Y + 1.02
P_H = 9.42 - 0.20 - P_Y
G = 0.14
C1X, C1W = MX, tx(2024.0) - G / 2 - MX
C2X, C2W = tx(2024.0) + G / 2, tx(2027.0) - tx(2024.0) - G
C3X, C3W = tx(2027.0) + G / 2, RIGHT - tx(2027.0) - G / 2


def panel(x, w, title, years, hot=False):
    rect(s, x, P_Y, w, P_H, fill=TINT if hot else WHITE, line=None if hot else LINE, line_w=0.75)
    rect(s, x, P_Y, w, 0.05, fill=BLUE if hot else BLUE_T2)
    tb(s, x + 0.26, P_Y + 0.16, w - 0.52, 0.28, [[(title, 13.5, True, BLUE), ("   " + years, 10.5, False, GRAY_2)]])
    rect(s, x + 0.26, P_Y + 0.50, w - 0.52, 0.012, fill=LINE)


# ===== 패널 1: 교훈 =====
panel(C1X, C1W, "교훈 · 두 다운턴이 가르친 것", "2018~2023")
ix, iw = C1X + 0.26, C1W - 0.52
NUM_W, TXT_W, LINK_W = 1.18, 2.46, 0.30
VIS_W = iw - NUM_W - TXT_W - LINK_W - 0.28
ROW_H = (P_H - 0.66) / 3
ry = P_Y + 0.60


def lane(x, y, w, title, steps, ok):
    """신호 레인: 제목 칩 + 단계 칩 3개(채움 = 실제로 일어난 단계)."""
    rect(s, x, y, 0.84, 0.42, fill=BLUE if ok else WHITE, line=None if ok else GRAY_2, line_w=0.75)
    tb(s, x, y, 0.84, 0.42, [(title, 10.5, True, WHITE if ok else GRAY_2)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    lx = x + 0.92
    cw_ = (w - 0.92 - 2 * 0.10) / 3
    for i, (lab, filled) in enumerate(steps):
        bx = lx + i * (cw_ + 0.10)
        if filled:
            rect(s, bx, y, cw_, 0.42, fill=WHITE, line=BLUE if ok else GRAY_2, line_w=1.0)
        else:
            sp = rect(s, bx, y, cw_, 0.42, fill=WHITE, line=GRAY_2, line_w=1.0)
            sp.line.dash_style = MSO_LINE_DASH_STYLE.DASH
        tb(s, bx + 0.06, y, cw_ - 0.12, 0.42, [(l, 8.5, filled, INK if filled else GRAY_2) for l in lab.split("|")],
           align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)
        if i < 2:
            rect(s, bx + cw_ + 0.015, y + 0.14, 0.07, 0.14, fill=BLUE_T2 if filled else LINE, shape=MSO_SHAPE.RIGHT_ARROW)


def vis_signal(x, y, w, h):
    """FDP는 구매자 프로덕션 코드에 들어갔고 ZNS는 들어가지 못했다."""
    lane(x, y + 0.02, w, "FDP", [("비준|'22-11", True), ("Meta 코드|'24-01", True), ("물량|진행", True)], True)
    lane(x, y + 0.56, w, "ZNS", [("비준|'20-06", True), ("프로덕션|채택 0", False), ("6년째|물량 없음", False)], False)


def vis_spec(x, y, w, h):
    """조달 규격 기고자는 구매자 · HBM4 규격은 9사 공동(삼성 포함)."""
    cw_ = (w - 0.16) / 2
    for i, (head, body, note) in enumerate([
            ("OCP 조달 규격 기고자", "구매자 5사", "Meta·MS·Google·Dell·HPE · 벤더 없음"),
            ("HBM4 JEDEC 공동 개발", "삼성 포함 9사", "차이는 고객 사양 대응과 수율")]):
        bx = x + i * (cw_ + 0.16)
        rect(s, bx, y, cw_, 0.62, fill=WHITE, line=LINE, line_w=0.75)
        tb(s, bx + 0.10, y + 0.05, cw_ - 0.20, 0.20, [(head, 8.75, False, GRAY_2)])
        tb(s, bx + 0.10, y + 0.24, cw_ - 0.20, 0.22, [(body, 9.75, True, INK)])
        tb(s, bx + 0.10, y + 0.44, cw_ - 0.20, 0.18, [(note, 8.5, False, GRAY)])
    tb(s, x, y + 0.72, w, 0.22,
       [[("Solidigm 61TB 선행의 공개 근거  ", 8.75, True, INK), ("192층 QLC · 오픈소스 FTL", 8.75, False, GRAY)]])


def vis_timing(x, y, w, h):
    """2027은 수급률, 2028은 비트 도달 — capex 증가율 감속과 함께."""
    cw_ = (w - 0.16) / 2
    for i, (yr, head, body) in enumerate([("2027", "수급률 전환", "공급 증가율이 수요를 추월"),
                                          ("2028", "비트 도달 · 정상화", "신증설이 실제 산출로")]):
        bx = x + i * (cw_ + 0.16)
        hot = i == 1
        rect(s, bx, y, cw_, 0.62, fill=BLUE if hot else WHITE, line=None if hot else LINE, line_w=0.75)
        tb(s, bx + 0.10, y + 0.05, cw_ - 0.20, 0.20, [(yr, 9.75, True, WHITE if hot else GRAY_2)])
        tb(s, bx + 0.10, y + 0.24, cw_ - 0.20, 0.22, [(head, 9.75, True, WHITE if hot else INK)])
        tb(s, bx + 0.10, y + 0.44, cw_ - 0.20, 0.18, [(body, 8.5, False, BLUE_T2 if hot else GRAY)])
    tb(s, x, y + 0.72, w, 0.22,
       [[("하이퍼스케일러 CapEx 증가율  ", 8.75, True, INK), ("'26 +105% → '27 +43% → '28 +12%", 8.75, False, GRAY)]])


lessons = [("신호", "수요 센싱", "비준된 표준이 아니라 구매자의 프로덕션 코드가 신호입니다",
            "지금의 등가 신호: KV 캐시 스택에 배치 힌트 인터페이스가 없음", vis_signal, 4),
           ("선점", "고객 협업", "선점은 규격 기고가 아니라 구매자 사양 적중에서 나왔습니다",
            "조달 규격은 구매자가 쓰고 공급자는 그것을 먼저 읽습니다", vis_spec, 5),
           ("시점", "의사결정", "2027은 수급률이 바뀌는 해, 2028은 비트가 도착하는 해입니다",
            "2028에 준비되려면 2026에 고객 시스템 안에 있어야 합니다", vis_timing, 5)]
for i, (num, nm, l1, l2, vis, nxt) in enumerate(lessons):
    if i:
        rect(s, ix, ry - 0.05, iw, 0.012, fill=LINE)
    tb(s, ix, ry, NUM_W, ROW_H - 0.1, [(num, 18, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
    tb(s, ix + NUM_W, ry + 0.06, TXT_W, ROW_H - 0.16,
       [[("교훈 " + str(i + 1) + " · ", 10.5, False, GRAY_2), (nm, 11.25, True, INK)], (l1, 9.75, True, INK), (l2, 9.0, False, GRAY)],
       anchor=MSO_ANCHOR.MIDDLE, spacing=1.06)
    vis(ix + NUM_W + TXT_W + 0.14, ry + 0.14, VIS_W, ROW_H - 0.28)
    lx_ = ix + iw - LINK_W
    rect(s, lx_, ry + ROW_H / 2 - 0.18, 0.26, 0.26, fill=BLUE_T2, shape=MSO_SHAPE.OVAL)
    tb(s, lx_, ry + ROW_H / 2 - 0.18, 0.26, 0.26, [(str(nxt), 10, True, INK)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    ry += ROW_H

# ===== 패널 2: 지금 · 구매 기준의 이동 =====
panel(C2X, C2W, "지금 · 구매 기준의 이동", "2008~2026")
ix2, iw2 = C2X + 0.26, C2W - 0.52
eras = [("2008~2012", "성능 · 용량당 가격", "IOPS · 대역폭이 차별화 축",
         "내구성은 이미 자격 요건 (JESD218 · 219, 2010-09)", False),
        ("2012~2021", "QoS · 지연 꼬리", "99.9% 읽기 지연이 스펙 전면으로",
         "S3700 500µs('12) → OCP v2.0 지연 모니터 의무화('21)", False),
        ("2022~2026", "용량밀도 · 전력효율 · 공급", "TB/슬롯 · TB/W · 물량 확보가 상위 기준",
         "QoS는 기본 요건 · 내구성은 0.3과 60 DWPD로 양극화", True)]
ey = P_Y + 0.62
EH = 1.10
for yrs, axis_, what, why, hot in eras:
    rect(s, ix2, ey, iw2, EH - 0.12, fill=TINT if hot else WHITE, line=BLUE if hot else LINE, line_w=1.0 if hot else 0.75)
    tb(s, ix2 + 0.16, ey + 0.08, iw2 - 0.32, 0.20, [[(yrs + "   ", 9.0, False, GRAY_2), ("차별화 축", 9.0, False, GRAY_2)]])
    tb(s, ix2 + 0.16, ey + 0.28, iw2 - 0.32, 0.26, [(axis_, 12.75, True, BLUE if hot else INK)])
    tb(s, ix2 + 0.16, ey + 0.55, iw2 - 0.32, 0.22, [(what, 9.75, False, GRAY)])
    tb(s, ix2 + 0.16, ey + 0.76, iw2 - 0.32, 0.24, [(why, 8.75, False, GRAY_2)], spacing=1.0)
    if hot:
        pass
    ey += EH
tb(s, ix2, ey + 0.02, iw2, 0.72,
   [("추론 캐시 계층에서만 내구성이 다시 구속 조건입니다", 10.5, True, BLUE),
    ("SSD가 맞춰야 할 구매 기준: TB/슬롯 · TB/W · 99.9999% 읽기 지연 · DWPD·TBW · $/TB · 공급 보장 · 배치 힌트와 텔레메트리 지원", 9.0, False, GRAY)],
   spacing=1.04)

# ===== 패널 3: 문제 =====
panel(C3X, C3W, "문제 · 해법이 필요한 상황", "2027~2030", hot=True)
ix3, iw3 = C3X + 0.26, C3W - 0.52
tb(s, ix3, P_Y + 0.60, iw3, 0.2, [("내구성 격차 · 요구 1~3 DWPD ÷ 현 QLC 정격 0.6", 9.0, False, GRAY_2)])
tb(s, ix3, P_Y + 0.80, iw3, 0.58, [("2~5배 격차", 28, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
CH_W3 = 4.40
_img1("s1_demand_path.png", ix3 + (iw3 - CH_W3) / 2, P_Y + 1.42, CH_W3)
tb(s, ix3, P_Y + 3.30, iw3, 0.40,
   [("추론 캐시 계층 NAND 수요 · 2027 87EB → 2028 175EB(SanDisk) · 2030 350EB는 재구성값", 8.75, False, GRAY)], spacing=1.0)
rect(s, ix3, P_Y + 3.62, iw3, 0.66, fill=WHITE, line=BLUE, line_w=1.25)
tb(s, ix3 + 0.16, P_Y + 3.66, iw3 - 0.32, 0.58,
   [("고용량 QLC에서 DWPD를 높일 해법이 필요합니다", 12.75, True, BLUE),
    ("두 축 · 다이 수 증가 → 신뢰성(2장) · DWPD 격차 → 내구성(3장)", 9.0, False, GRAY)],
   anchor=MSO_ANCHOR.MIDDLE, spacing=1.04)
quote(s, ix3, P_Y + P_H - 0.50, iw3, 0.46,
      "부품이 어떻게 쓰일지는 시스템을 설계하는 사람 마음에 있다. 그걸 알았으면 HBM을 진작 준비했을 것이다",
      "송용호 AX/PI센터장 · 사내 인터뷰 2026-09-03", size=9.0)

band(s, 9.42, 0.80, "문제",
     "요구는 구매자의 조달 규격과 프로덕션 코드에서 먼저 정의됐고, 그것을 먼저 읽은 공급자가 선점했습니다.\n"
     "차기 요구는 고용량과 1~3 DWPD이며, 현 QLC 정격 0.6과는 2~5배 격차가 있습니다",
     main_size=16.5, next_step=2)
footer(s, "출처: 위키 다운턴 역사(DT19·DT23), NVMe TP4146·CacheLib·Linux 커밋 이력, OCP·JEDEC 기고자 명단, TrendForce·SEMI·UBS(전환점), SanDisk FMS 2026·McKinsey(수요), P5336·CM9·LC9 사양(DWPD)", 1)
notes(s, "1장은 문제 제기입니다. 결론은 내리지 않고, 고용량 QLC에서 DWPD를 높일 해법이 필요한 상황임을 세웁니다. 상단 타임라인의 세 구간이 아래 세 패널과 정렬돼 있습니다. "
      "왼쪽 패널, 교훈. 교훈 1 수요 센싱입니다. 종전에는 표준 비준이 약 2년 선행 신호라고 봤는데, 확인해 보니 그 명제는 반례가 있습니다. ZNS는 2020년 6월 비준되고 같은 달 커널 패치까지 올라갔지만 6년이 지난 지금도 하이퍼스케일 물량이 없습니다. 반면 FDP는 2022년 11월 비준 후 2024년 1월 Meta의 CacheLib 프로덕션 코드에 머지됐고, 2025년 5월 Linux 6.16에 배치 힌트 경로가 들어갔으며 물량이 따라오고 있습니다. 두 사례의 차이는 표준 비준이 아니라 구매자가 자기 프로덕션 코드에 넣었는가입니다. 그래서 판별 기준을 바꿔야 합니다. 지금의 등가 신호는 KV 캐시 스택에 배치 힌트 인터페이스가 아직 없다는 사실이고, 이는 캐시 관리자가 KV 블록의 수명 등급을 NVMe 배치 핸들로 전달하는 코드 경로가 비어 있다는 뜻입니다. "
      "교훈 2 고객 협업입니다. 종전 문안은 규격 정의에 참여한 공급자가 선점했다는 것이었는데, 확인 결과 주체가 틀렸습니다. OCP 데이터센터 NVMe SSD 사양의 기고자는 Meta, Microsoft, Google, Dell, HPE로 전부 구매자이고 SSD 벤더는 명단에 없습니다. 이 문서는 벤더가 쓰는 규격이 아니라 구매자가 쓰고 벤더가 준수하는 조달 사양입니다. Solidigm이 61TB를 12개월 앞선 공개 근거도 규격 기고가 아니라 192층 QLC와 오픈소스 FTL입니다. HBM4도 마찬가지입니다. JEDEC 표준은 삼성을 포함한 9사가 함께 개발했으므로 참여 여부가 차이를 만들지 않았고, 실제 구속 사양은 NVIDIA가 요구한 10에서 13Gbps였으며 승부는 패키징 수율과 고객 퀄에서 갈렸습니다. 삼성은 2026년 2월 업계 최초로 상용 HBM4를 출하했으므로 늦었다는 서술은 HBM3E 세대에 한정해야 합니다. 따라서 교훈은 구매자의 조달 규격과 프로덕션 코드를 먼저 읽고 제품을 선행 개발한 공급자가 선점한다는 것입니다. "
      "교훈 3 의사결정 시점입니다. 차기 전환점을 2028년으로 봅니다. 2027년은 TrendForce 기준 NAND 수급률이 부호를 바꾸는 해이지만, 같은 기관이 신증설 capacity의 의미 있는 산출 기여는 2028년 전에는 없다고 밝혔습니다. SK하이닉스 청주 M17 클린룸 개방 목표가 2028년 12월, 삼성 평택 P5 가동이 이르면 2028년, 마이크론 싱가포르가 2028년 하반기입니다. 수요 쪽도 하이퍼스케일러 CapEx 증가율이 2026년 105%, 2027년 43%, 2028년 12%로 꺾이고 억제된 감가상각이 2028년에 1,070억 달러로 최대가 됩니다. 즉 2027년은 회계상의 전환, 2028년은 물리적 도달입니다. 2028년에 준비되어 있으려면 2026년에 고객 시스템 안에 들어가 있어야 합니다. "
      "가운데 패널, 구매 기준의 이동입니다. 2008년에서 2012년 구간의 차별화 축은 IOPS와 대역폭이었고 내구성은 이미 JESD218과 219로 표준화된 자격 요건이었습니다. 2012년에서 2021년 구간은 QoS가 스펙 전면으로 올라온 시기입니다. S3700이 99.9% 지연 500마이크로초를 내세웠고, OCP 사양 v2.0이 2021년 7월 지연 모니터를 의무화하면서 제도화됐습니다. 2022년 이후는 용량 밀도와 전력 효율, 공급 확보가 상위 기준이고 QoS는 사라진 것이 아니라 기본 요건으로 굳었습니다. 내구성은 하나의 축에서 둘로 갈라져 245TB QLC의 0.3 DWPD와 SLC의 60 DWPD가 같은 해에 팔립니다. 추론 캐시 계층에서만 내구성이 다시 구속 조건이 됩니다. SSD가 맞춰야 할 기준을 구체적으로 적으면 슬롯당 용량, 와트당 용량과 IOPS, 99.9999% 읽기 지연, DWPD와 TBW, TB당 가격, 공급 보장, 그리고 배치 힌트와 텔레메트리 지원입니다. "
      "오른쪽 패널, 문제입니다. 요구 1에서 3 DWPD를 현 QLC 정격 0.6으로 나누면 2배에서 5배 격차입니다. 수요는 단일 숫자가 아니라 경로로 봐야 합니다. SanDisk는 KV 캐시만으로 2027년 75에서 100EB의 추가 NAND 수요가 생기고 1년 뒤 두 배가 된다고 밝혔습니다. 2029년과 2030년은 그 성장률을 외삽한 재구성값이며 2030년 350EB는 발표된 숫자가 아니라 SanDisk의 비중 진술로부터 재구성한 값입니다. 전체 엔터프라이즈 SSD 수요는 McKinsey 기준 2024년 181EB에서 2030년 1,078EB로 연 35% 성장하고 그중 추론용이 447EB입니다. 그래서 고용량 QLC에서 DWPD를 높일 해법이 필요하고, 고용량화가 낳는 두 축이 2장과 3장입니다.")

# ================================================================ S2. 신뢰성 축 — SSD 내부 해법 (v6.0: ppm 요구 곡선 · 보호 기법별 완화 · 내부 해법을 도해로)
s = prs.slides.add_slide(BLANK)
header(s, 2,
       "첫째 축 신뢰성은 다이 수 증가로 요구가 다이당 10 ppm대까지 내려가나, SSD 내부 구조로 충족됩니다",
       "드라이브 고장률 요구는 고정, SSD당 다이 수는 512 → 2,133. 패리티와 여분 다이가 요구를 다시 천 ppm 단위로 되돌립니다.")


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
verdicts = [
    ("245 · 256TB급 · 1,024다이", "단일 패리티로 충족", "다이 요구 1,679 ppm · 현 수준 추정 범위 안", True),
    ("512TB급 · 2,133다이", "이중 패리티 또는 여분 다이", "단일 패리티 요구 1,164 ppm · 현 수준 상단에 미달", False),
]
vy = T_Y + 1.22
for cap, verdict, why, ok in verdicts:
    rect(s, PX3 + 0.26, vy, PW3 - 0.52, 0.92, fill=WHITE, line=BLUE if ok else BLUE_T1, line_w=1.0)
    tb(s, PX3 + 0.42, vy + 0.08, PW3 - 0.84, 0.22, [(cap, 10.5, True, INK)])
    tb(s, PX3 + 0.42, vy + 0.32, PW3 - 0.84, 0.26, [(verdict, 12.75, True, BLUE)])
    tb(s, PX3 + 0.42, vy + 0.60, PW3 - 0.84, 0.26, [(why, 9.5, False, GRAY)], spacing=1.0)
    vy += 0.98
tb(s, PX3 + 0.26, vy + 0.06, PW3 - 0.52, 0.44,
   [("해법은 다이 고장률 개선이 아니라 SSD 안의 보호 구조입니다", 11.25, True, BLUE)], spacing=1.02)

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
footer(s, "출처: JESD218(FFR), 제품 사양(다이 수), Micron RAIN(다이 패리티), 삼성 PM1733 FIP, OCP SMART C0, Google FAST'16(현 수준 역산) · 요구 곡선은 독립 고장 모델(⚠️)", 2)
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
              lead="요구(UBER·DWPD)는 고정, 단품 지표(RBER·P/E)는 악화, 격차는 상위 계층이 보상해 왔습니다. 1단계 ECC 완결, 2단계 단독 최적화는 부분 성공.",
              band_main="요구는 고정, 단품은 악화, 격차는 상위 계층이 보상해 왔고, 잔여 변수 WAF는 SSD 밖 호스트가 결정합니다.\n"
                        "다이 세대·OP·보증연수와 병행하되, 이 변수는 고객 협업과 새로운 역량을 요구합니다",
              notes_tail="신뢰성 축(다이 수·고장률)은 2장에서 보였듯 SSD 내부에서 충족되지만, DWPD 축의 잔여 변수 WAF는 SSD 밖 호스트가 결정합니다. 그래서 고객 협업과 새로운 역량이 필요하고, 그 역량이 4장입니다.")

# ================================================================ S4. 역량 — 3단계 (v3.10 공식 문안·범례를 Phase 1 옆으로·결론 밴드 신설)
s = prs.slides.add_slide(BLANK)
header(s, 4,
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
footer(s, "출처: Solidigm·Kioxia·Micron 사양(DWPD), NVMe 스펙(네임스페이스당 배치 핸들 128 상한)·XFS 쓰기 스트림 16, GitHub README 확인(LMCache·Mooncake·FlexKV·xNVMe), CacheLib FDP 문서(WAF), Linux 6.16, NVIDIA CMX 문서", 4)
notes(s, "4장은 해법의 제안입니다. 1장이 제기한 내구성 격차를 해소하는 경로이며, 3장의 산식에서 남은 보상 변수는 WAF이고, WAF는 호스트가 데이터 수명에 따라 배치를 결정할 때 1에 수렴하므로 내구성 격차는 디바이스가 아니라 고객 시스템의 배치 방식에서 해소됩니다. 그래서 역량을 디바이스에서 고객 시스템 계층까지 3단계로 확장합니다. 리드의 인용은 베인 신문섭 파트너의 진단으로 같은 결론입니다. "
      "상단 타일은 격차와 수단입니다. 내구성 격차(요구 1~3 DWPD 대비 현 QLC 정격 0.6으로 2~5배), 요구 분리 스트림 16개(XFS 쓰기 스트림 상한, 제품 지원 수는 업계 미공개), 접점 부재(KV 캐시 관리자 4종 코드에 배치 규격 언급 0건), 해소 수단 실증(CacheLib 배치 표준 적용 WAF 3.22→1.03, XFS write streams RocksDB -35%, ScaleFlux 유효 7~10 DWPD). "
      "그림은 고객 시스템 5계층을 세 번 그리고 삼성이 닿는 층을 색으로 표시하며(파랑 = 삼성 코드·제품, 연파랑 = 관측·분석, 흰색 = 고객 영역), 각 층에 그 층을 구성하는 기술을 적었습니다. 응용·추론 엔진(vLLM·SGLang·TensorRT-LLM), KV 캐시 관리자(NVIDIA Dynamo KVBM·LMCache·Mooncake·Tencent FlexKV), I/O 라이브러리(NIXL·GPUDirect Storage·io_uring·SPDK/xNVMe), 커널·플랫폼(Linux 6.16 write streams·XFS/f2fs 스트림·NVIDIA CMX와 DOCA Memos), SSD 디바이스(컨트롤러·배치 핸들 펌웨어·2Tb QLC·NVMe KV 확장·텔레메트리). "
      "Phase 1 배치 표준 디바이스 확보: SSD 층만 삼성의 범위이며 고객 보증 범위는 정격 내 QLC 원가·전력입니다. Phase 2 워크로드 실측 기반 최적화: 캐시 관리자의 빈도 필터·퇴거 정책이 트레이스의 원천이고, I/O 라이브러리의 io_uring·GDS 백엔드에 write stream을 부착하며 커널 스트림과 CMX 힌트 매핑을 검증해 배치 핸들 정책·WAF·유효 DWPD 실측을 공개합니다. 고객 보증 범위는 고객 워크로드 기준 수명입니다. Phase 3 고객 시스템 내 공동 설계: 캐시 관리자 4종에 플러그인을 메인라인으로 머지하고, NIXL·xNVMe가 기본 백엔드가 되며, DOCA Memos와 배치 표준의 매핑을 NVIDIA와 공동 정의하고, 응용 층은 커넥터·스케줄러를 분석해 공용 TCO 모델(GPU당 동시 사용자·TTFT·전력)로 협의합니다. FDE(Forward Deployed Engineer)가 고객 시스템에 상주합니다. 고객 보증 범위는 시스템 수준 TCO입니다. "
      "삼성 현 위치는 정직하게 Phase 1 진행 중입니다. CMX 첫 공급은 TLC이고 QLC 라인의 배치 핸들 수와 유효 DWPD는 공개돼 있지 않습니다. Phase 2는 준비 단계로 KV cache 백서 2종으로 측정 역량은 있으나 트레이스 기반 실측이 미공개이고, Phase 3는 캐시 관리자 4종 기여 0건으로 미착수입니다. 오케스트레이션 자체는 만들지 않습니다. 결론: 단계마다 고객 보증 범위가 원가·전력 → 워크로드 수명 → 시스템 TCO로 확장되며, 3단계에 진입하는 수단(선별된 고객에의 FDE·업스트림·규격 채널)과 개발실 내부 실행이 5장입니다.")

# ================================================================ S5. 실행 — 두 트랙 그림(v6.1: v3.x 형식 복귀 — 좌 개발실 / 중앙 ①FDE 상주 → ←② 접근권 + 선례 / 우 고객 시스템)
s = prs.slides.add_slide(BLANK)
header(s, 5,
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
     main_size=16.5, next_step=6)
footer(s, "출처: Pragmatic Engineer·FDE Academy(Palantir FDE), Micron IR 2026-06-22·10-Q(SCA 16건·$22B), SK hynix 뉴스룸, 내부 인터뷰(송용호 2026-09-03) · 규모·시점은 추정, 사내 수치는 [사내 확인]", 5)
notes(s, "5장은 실행입니다. 3단계 역량을 어떻게 얻느냐, 즉 고객 시스템 안으로 들어가는 두 수단을 그림 하나로 보입니다. 왼쪽은 삼성 개발실이 제공하는 것이고, 오른쪽은 고객 시스템의 계층이며, 가운데 두 화살표가 주고받는 관계입니다. "
      "위쪽 화살표 ① FDE 상주는 삼성이 보내는 것입니다. 상주 엔지니어가 고객 시스템 안에서 요구를 코드로 구현하고, 업스트림에 기여하며, 워크로드 실측을 공개합니다. 아래쪽 화살표 ② 접근권 확보는 삼성이 받는 것입니다. 워크로드 트레이스, KV 수명 정책, 규격 접근권이며 계약 시한은 2027년 상반기입니다. 공급이 완화되기 전에 락인을 걸어야 하기 때문입니다. "
      "가운데 왼쪽 카드가 고객 선별입니다. FDE를 모든 고객에 보낼 수는 없으므로 세 조건으로 거릅니다. 트레이스 접근을 허용하는가, 캐시 관리자 코드를 자체 운영하는가, 물량과 규격에 파급력이 있는가. AI 랩과 NVIDIA 생태계가 조건을 충족하므로 FDE를 상주시키고, 하이퍼스케일러는 보안과 중립성 때문에 내부 코드 상주가 불가하므로 업스트림과 OCP 규격으로, OEM과 네오클라우드는 레퍼런스 스택으로 넓힙니다. "
      "오른쪽 카드가 선례입니다. Palantir의 FDE는 고객 현장에 상주해 요구를 코드로 구현하고 성과로 평가받는 모델이고, 고객 락인의 동력으로 평가받아 Anthropic과 OpenAI가 시장 진입 모델로 채택했습니다. Micron과 Anthropic의 전략적 협약은 공동 설계, 다년 공급, 운영 통합, 자본을 한 계약에 결합해 워크로드와 규격 접근권을 확보한 사례입니다. 중요한 것은 삼성과 SK의 Anthropic 공급 계약에는 공동 설계 조항이 없다는 점이고, 이것을 삼성이 먼저 제안하자는 것이 이 장의 요청입니다. "
      "오른쪽 고객 시스템 그림에서 삼성이 지금 닿는 층은 SSD뿐입니다. FDE가 KV 캐시 관리자 층에 상주하고 I/O 라이브러리와 커널에 코드를 머지하면서 위로 올라갑니다. "
      "하단 세 타일은 개발실 내부 실행입니다. 조직은 시스템 소프트웨어 조직 강화와 개발실 소속 Co-Design Pod, 인사는 고객 코드를 읽고 고치는 전문가 채용과 상주 로테이션, 문화는 오픈소스 메인테이너 배출과 KV 캐시 실측의 업계 최초 공개입니다. 자회사나 별도 보상 체계는 두지 않습니다. "
      "단계별 통과 조건(90일·12개월·2027년 상반기)과 판돈·비용은 슬라이드에서 빼고 보고서 5장 4절과 5절에 두었습니다. 질문이 나오면 그 표로 답합니다. 판돈은 락인으로 얻는 캐시 계층 점유율이고, 2030년 추론 캐시 350EB 가운데 QLC는 호스트 협력이 성립할 때 조건부 상방 175EB입니다. 비용은 개발실 개발 자원 재배치이며 별도 투자는 없습니다.")

# ================================================================ S6. WAF 런타임 대응 기술 (v6.0: 조건부 보증 → 감지·대응 기술 확보로 축 이동)
s = prs.slides.add_slide(BLANK)
header(s, 6,
       "WAF 변동 리스크는 계약이 아니라 런타임 감지·대응 기술로 흡수하며, 그 기술 요소를 확보합니다",
       "조건부 보증은 리스크를 고객에게 되돌려 수용성이 낮습니다. 같은 리스크를 WAF 급등 감지와 런타임 재구성으로 흡수합니다.")


def _img6(name, x, y, w):
    return s.shapes.add_picture(os.path.join(ASSETS, name), Inches(x), Inches(y), width=Inches(w))


# ---- 상단 좌: 목표 동작 차트 ----
A_Y, A_H = 2.80, 2.92
CHW6 = 6.85
_img6("s6_waf_runtime.png", MX, A_Y, CHW6)

# ---- 상단 우: 감지 → 판단 → 대응 → 검증 루프 ----
RX6 = MX + CHW6 + 0.22
RW6 = RIGHT - RX6
rect(s, RX6, A_Y, RW6, A_H, fill=WHITE, line=LINE, line_w=0.75)
tb(s, RX6 + 0.24, A_Y + 0.12, RW6 - 0.48, 0.26,
   [[("런타임 대응 루프", 13.5, True, BLUE), ("   목표 주기 · 감지 1시간 · 회복 4시간", 10.0, False, GRAY_2)]])
LB_Y, LB_H = A_Y + 0.46, 1.74
LB_N = 4
LB_AR = 0.26
LB_W = (RW6 - 0.48 - (LB_N - 1) * LB_AR) / LB_N
stages = [
    ("① 관측", "RUH별 기록량 비교", ["호스트 기록량 ÷ 물리 매체 기록량", "핸들별 · 초 단위 샘플링"], "device"),
    ("② 감지 · 분류", "변화점 탐지", ["수명 오분류 · 핸들 간 간섭", "힌트 손실 · 워크로드 전환"], "device"),
    ("③ 대응", "런타임 재구성", [], "split"),
    ("④ 검증", "재측정 · 롤백", ["목표 미달 시 이전 구성으로 복귀", "대응 이력이 보증 근거"], "device"),
]
for i, (no, head, lines, kind) in enumerate(stages):
    x = RX6 + 0.24 + i * (LB_W + LB_AR)
    hot = i == 2
    rect(s, x, LB_Y, LB_W, LB_H, fill=TINT if hot else WHITE, line=BLUE if hot else LINE, line_w=1.25 if hot else 0.75)
    tb(s, x + 0.14, LB_Y + 0.10, LB_W - 0.28, 0.22, [(no, 10.5, True, BLUE)])
    tb(s, x + 0.14, LB_Y + 0.32, LB_W - 0.28, 0.24, [(head, 11.25, True, INK)])
    if kind == "split":
        sy = LB_Y + 0.60
        for who, body, own in [("디바이스", "FDP 구성 전환 · RU 크기\n핸들 재할당 · GC · SLC 정책", True),
                               ("호스트", "캐시 정책 · 스트림 매핑\n어드미션 · 셰이핑", False)]:
            rect(s, x + 0.12, sy, LB_W - 0.24, 0.52, fill=BLUE if own else WHITE, line=None if own else BLUE_T2, line_w=1.0)
            tb(s, x + 0.20, sy + 0.03, 0.9, 0.2, [(who, 9.0, True, WHITE if own else BLUE)])
            tb(s, x + 0.20, sy + 0.21, LB_W - 0.40, 0.30,
               [(ln, 8.5, False, BLUE_T2 if own else GRAY) for ln in body.split("\n")], spacing=1.0)
            sy += 0.58
    else:
        yy = LB_Y + 0.62
        for ln in lines:
            rect(s, x + 0.14, yy + 0.07, 0.08, 0.08, fill=BLUE_T2)
            tb(s, x + 0.30, yy, LB_W - 0.44, 0.38, [(ln, 9.0, False, GRAY)], spacing=1.0)
            yy += 0.40
    if i < LB_N - 1:
        rect(s, x + LB_W + 0.03, LB_Y + LB_H / 2 - 0.10, LB_AR - 0.06, 0.20, fill=BLUE, shape=MSO_SHAPE.RIGHT_ARROW)
ret_y = LB_Y + LB_H + 0.10
rect(s, RX6 + 0.24, ret_y, RW6 - 0.48, 0.34, fill=TINT)
rect(s, RX6 + 0.30, ret_y + 0.07, 0.20, 0.20, fill=BLUE, shape=MSO_SHAPE.LEFT_ARROW)
tb(s, RX6 + 0.58, ret_y, RW6 - 0.82, 0.34,
   [[("루프 반복  ", 10.0, True, BLUE), ("대응 결과를 다시 관측해 정책을 갱신합니다 · 오실레이션 방지와 성능 영향 상한은 정책 엔진이 관리", 9.5, False, GRAY)]],
   anchor=MSO_ANCHOR.MIDDLE)

# ---- 하단: 핵심 기술 요소 6 ----
B_Y = A_Y + A_H + 0.22
tb(s, MX, B_Y, CW, 0.26,
   [[("확보해야 할 핵심 기술 요소", 13.5, True, BLUE), ("   현 수준과 필요 수준의 차이가 개발 과제입니다", 10.5, False, GRAY_2)]])
T_Y6 = B_Y + 0.34
T_H6 = 1.86
T_W6 = (CW - 5 * 0.18) / 6
techs = [
    ("T1", "RUH별 WAF 텔레메트리", "드라이브 단위 누적값만 (OCP SMART C0)", "핸들별·구간별 분해 · 초 단위 샘플링", True),
    ("T2", "급등 감지 알고리즘", "사후 로그 분석에 의존", "온디바이스 변화점 탐지 · 오탐 억제", True),
    ("T3", "무중단 FDP 재구성", "구성은 네임스페이스 생성 시 고정", "운영 중 구성 전환 · 데이터 이전 경로", True),
    ("T4", "디바이스 → 호스트 경보", "배치 열화를 알리는 규격 없음", "비동기 이벤트 · 원인 코드 · 권고 조치", False),
    ("T5", "정책 엔진 · 안전장치", "수동 조치", "오실레이션 방지 · 성능 영향 상한 · 롤백", False),
    ("T6", "검증 환경", "실드라이브 실험만", "FDP 에뮬레이터 · 트레이스 재생 회귀", False),
]
for i, (no, name, now, need, own) in enumerate(techs):
    x = MX + i * (T_W6 + 0.18)
    rect(s, x, T_Y6, T_W6, T_H6, fill=WHITE, line=BLUE if own else LINE, line_w=1.25 if own else 0.75)
    rect(s, x, T_Y6, T_W6, 0.05, fill=BLUE if own else BLUE_T2)
    tb(s, x + 0.16, T_Y6 + 0.14, T_W6 - 0.32, 0.22, [(no, 10.5, True, BLUE if own else GRAY_2)])
    tb(s, x + 0.16, T_Y6 + 0.36, T_W6 - 0.32, 0.50, [(name, 11.25, True, INK)], spacing=1.04)
    rect(s, x + 0.16, T_Y6 + 0.92, T_W6 - 0.32, 0.012, fill=LINE)
    tb(s, x + 0.16, T_Y6 + 1.00, T_W6 - 0.32, 0.36, [[("현  ", 9.0, True, GRAY_2), (now, 9.0, False, GRAY)]], spacing=1.0)
    tb(s, x + 0.16, T_Y6 + 1.42, T_W6 - 0.32, 0.38, [[("필요  ", 9.0, True, BLUE), (need, 9.0, True, INK)]], spacing=1.0)
S_Y6 = T_Y6 + T_H6 + 0.14
rect(s, MX, S_Y6, CW, 0.62, fill=TINT, line=BLUE_T2, line_w=1.0)
tb(s, MX + 0.24, S_Y6 + 0.06, 9.4, 0.24,
   [[("규격 과제  ", 10.5, True, BLUE), ("NVMe 런타임 FDP 재구성 · 핸들별 기록량 필드 · 배치 열화 이벤트 / OCP 텔레메트리 필드와 수용 기준", 10.0, False, GRAY)]])
tb(s, MX + 0.24, S_Y6 + 0.30, 9.4, 0.24,
   [[("보증 조항  ", 10.5, True, BLUE), ("기준은 관행대로 TBW 선도달 · 유효 DWPD는 부가 표기 · 대응 이력과 재측정 리포트를 계약 부속으로", 10.0, False, GRAY)]])
tb(s, MX + 10.0, S_Y6 + 0.06, CW - 10.24, 0.48,
   [("기술이 흡수한 만큼만 계약에 남깁니다. 고객에게 조건을 요구하는 대신 삼성이 되돌립니다", 10.5, True, BLUE)],
   anchor=MSO_ANCHOR.MIDDLE, spacing=1.04)

band_chain(s, 9.10, 1.06, "요약", [
    ("1 문제", "요구 이동: 고용량\n1~3 DWPD · 2~5배 격차"),
    ("2 신뢰성", "다이 수 증가\nSSD 내부에서 해결"),
    ("3 해법 사다리", "WAF는 SSD 밖 호스트에\n고객 협업 · 새 역량"),
    ("4 역량", "디바이스 → 워크로드\n→ 고객 시스템"),
    ("5 실행", "FDE 선별 집중\n개발실 자원 투입"),
    ("6 대응 · 보증", "WAF 급등 감지 ·\n런타임 대응 기술 확보"),
], head_size=11.25, body_size=9.75)
footer(s, "출처: OCP 사양(SMART C0), NVMe TP4146 FDP 구성 정의, FAST'26 WARP(배치 실패 조건·에뮬레이터), 삼성 PM9A3·Micron 보증 정책 · 목표 동작 곡선은 모식도(⚠️)", 6)
notes(s, "6장입니다. 종전 문안은 유효 DWPD를 WAF 밴드별 조건부로 보증하는 계약 설계였는데, 그 구조는 워크로드가 바뀌면 보증이 깨지는 책임을 사실상 고객에게 되돌립니다. 고객이 받아들이기 어렵습니다. 그래서 축을 옮깁니다. 같은 리스크를 계약이 아니라 기술로 흡수합니다. WAF가 갑자기 오르는 것을 감지하고 런타임에 되돌리는 기술을 삼성이 갖는 것입니다. "
      "왼쪽 그림이 목표 동작입니다. 실측이 아니라 모식도입니다. 정상 구간에서 WAF는 1.05 수준입니다. 워크로드가 바뀌거나 배치 힌트가 사라지면 2.7 수준으로 뜁니다. 대응이 없으면 붉은 점선처럼 정격 수준에 머물고, 그 차이 면적이 그대로 초과 기입량이자 보증 수명 손실입니다. 목표는 한 시간 안에 감지하고 네 시간 안에 회복하는 것입니다. "
      "오른쪽이 루프입니다. 관측 단계에서 호스트 기록량을 물리 매체 기록량으로 나눠 WAF를 구하되 드라이브 전체가 아니라 핸들별로 분해합니다. 감지 단계에서 변화점을 탐지하고 원인을 수명 오분류, 핸들 간 간섭, 힌트 손실, 워크로드 전환으로 분류합니다. 대응 단계는 두 주체로 나뉩니다. 디바이스 측은 FDP 구성 전환, 재생 단위 크기 조정, 핸들 재할당, 가비지 컬렉션과 SLC 캐시 정책을 바꿉니다. 호스트 측은 캐시 정책, 스트림 매핑, 어드미션을 바꿉니다. 검증 단계에서 재측정하고 목표에 미달하면 이전 구성으로 롤백하며, 이 이력이 보증 근거가 됩니다. "
      "하단이 이 기술을 위해 확보해야 할 요소입니다. T1 텔레메트리는 현재 OCP SMART C0가 드라이브 단위 누적값만 주므로 핸들별 구간별 분해와 초 단위 샘플링이 필요합니다. T2 감지는 사후 로그 분석에 머물러 있어 온디바이스 변화점 탐지와 오탐 억제가 필요합니다. T3 무중단 재구성이 가장 큰 공백입니다. FDP 구성은 네임스페이스를 만들 때 선택되므로 운영 중에 바꾸는 경로가 스펙에 없습니다. 구성 전환과 데이터 이전 경로를 만들어야 합니다. T4는 디바이스가 호스트에 배치 열화를 알리는 규격이 없다는 점이고, T5는 정책 변경이 진동하지 않도록 막고 성능 영향에 상한을 두며 롤백을 보장하는 엔진이며, T6은 실드라이브 실험만으로는 회귀 검증이 안 되므로 FAST 2026의 WARP 같은 에뮬레이터와 트레이스 재생 환경이 필요하다는 것입니다. 앞의 세 가지가 삼성이 직접 만드는 범위입니다. "
      "규격 과제는 NVMe에 런타임 FDP 재구성과 핸들별 기록량 필드, 배치 열화 이벤트를 제안하고 OCP에 텔레메트리 필드와 수용 기준을 넣는 것입니다. 보증은 없애지 않되 축소합니다. 기준은 관행대로 TBW 선도달로 두고 유효 DWPD는 부가 표기로, 대응 이력과 재측정 리포트를 계약 부속으로 둡니다. 기술이 흡수한 만큼만 계약에 남긴다는 원칙입니다. 하단 요약 체인이 이 덱 전체의 논리입니다.")

prs.save(os.path.abspath(OUT))
print(f"생성 완료: {os.path.abspath(OUT)} ({len(prs.slides._sldIdLst)}장)")
