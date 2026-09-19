# -*- coding: utf-8 -*-
"""QLC eSSD 전략 — 4장 덱 생성 v4.0 (2026-09-19 순서 재편: 교훈·문제 제기 → 해법 사다리 → 역량 → 실행).

스토리라인(v4.0): ① 교훈·문제(왜 지금, 무엇이 필요한가: 다운턴 교훈 + AI 수요로 대용량·높은 DWPD로 이동하는 요구) → ② 해법 사다리(왜 호스트 협력인가:
  단품이 못 푼 문제는 상위 제품이 풀어 왔고, 이번 문제 WAF는 SSD 수준에서 풀리지 않는다) → ③ 역량(어떻게 해소하는가: 3단계) → ④ 실행(누가 어떻게)
시각 장치: 헤더 스토리 레일 story_rail() / 결론 밴드 다음 장 포인터 band(next_step) / 4장 결론 밴드 요약 체인 band_chain()
S1 교훈·문제: 다운턴 타임라인(DT19·DT23 + QLC 이정표) + 교훈 카드 3(수요 센싱·고객 협업·의사결정 시점, 키 숫자 + 도식) + 우측 문제 제기 패널(요구의 이동 3국면 · 키 숫자 3 · 해법 필요 · 송용호 인용)
S2 해법 사다리(solution_ladder_slide 공용, 이관 매트릭스): 열 = 요구 → 단품 → SSD 계층 → 호스트·시스템 계층, 행 = 내구성·신뢰성 축
S3 역량: 격차 타일 4 + Phase 1·2·3 스택 + 진행 바 + 결론 밴드
S4 실행: 두 트랙 그림(FDE 상주·SCA) + 선례 카드 2 + 조직·인사·문화 3축 + 4장 요약 체인
구 3장(고객의 QLC 채택 동인: 3기 스트립 + 수요 그래프)은 v4.0에서 1장 문제 제기 패널로 흡수(그래프는 보고서 그림으로 유지, 코드는 git 이력).

디자인 시스템: outputs/presentation/ssd-strategy.pptx 승계
  20 x 11.25 in 캔버스 / Arial 단일 폰트 / Samsung Blue #1428A0 단일 액센트
  헤더(조직명·문서등급·스토리 레일·30pt 액션 타이틀·20pt 리드·헤어라인) / 푸터(출처·페이지)
  틴트 카드 #F4F6FC(무테) · 아웃라인 카드 흰색+#D9D9D9 0.75pt · 다크 블루 정리 밴드 · 직각 사각형

실행: .venv/bin/python outputs/presentation/scripts/generate_qlc_ssd_strategy_pptx.py
출력: outputs/presentation/qlc-ssd-strategy.pptx
렌더 검증용 오버라이드: FONT_LATIN=NanumGothic FONT_EA=NanumGothic OUT_PATH=<scratch>.pptx
콘텐츠 소스: outputs/report/qlc-ssd-strategy-report.md (PPT 압축 맵) · outputs/presentation/qlc-ssd-strategy-outline.md
헬퍼 변경 시 deck_kit.py 재추출: `import os` ~ `# ==== S1` 마커 직전까지.
"""
import os

from PIL import Image
from pptx import Presentation
from pptx.dml.color import RGBColor
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
FONT = os.environ.get("FONT_LATIN", "Arial")
FONT_EA = os.environ.get("FONT_EA", FONT)

MX = 0.79
CW = 18.42
RIGHT = MX + CW
GRADE = "[문서등급 표기]"
TOTAL = 4

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


STORY = [("1", "교훈 · 문제", "왜 지금, 무엇이 필요한가"), ("2", "해법 사다리", "왜 호스트 협력인가"),
         ("3", "역량", "어떻게 해소하는가"), ("4", "실행", "누가 어떻게 실행하는가")]


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


def band_chain(slide, y, h, label, chips):
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
           [(head, 12.75, True, BLUE if last else WHITE)] + [(b, 11.25, last, INK if last else WHITE) for b in body.split("\n")],
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


# ================================================================ S1. 교훈 · 문제 제기 (v4.0: 구 2장 다운턴 교훈 + 구 3장 요구의 이동을 한 장으로)
s = prs.slides.add_slide(BLANK)
header(s, 1,
       "다운턴의 교훈은 고객 요구 적중이고, AI 수요는 요구를 대용량·높은 DWPD로 이동시킵니다",
       "두 다운턴은 요구가 고객 시스템 안에서 먼저 관측됨을 보였고, 지금 그 요구는 추론 캐시 계층의 대용량·높은 DWPD입니다.")

# 타임라인: 2018 → 2030.5, 다운턴 구간 음영 + QLC 이정표(한 줄 라벨)
TX0, TX1 = MX + 0.30, RIGHT - 0.30
def tx(year):
    return TX0 + (TX1 - TX0) * (year - 2018.0) / 12.5
AX_Y = 3.52
rect(s, TX0, AX_Y - 0.01, TX1 - TX0, 0.02, fill=LINE)
for y0, y1, lab in [(2018.75, 2019.95, "DT19 재고 조정 · -37.6%"), (2022.25, 2023.75, "DT23 최대 낙폭 -45% · 진앙 eSSD")]:
    rect(s, tx(y0), AX_Y - 0.13, tx(y1) - tx(y0), 0.26, fill=BLUE_T2)
    tb(s, tx(y0) - 0.2, AX_Y + 0.16, tx(y1) - tx(y0) + 1.6, 0.22, [(lab, 11.25, True, BLUE)])
rect(s, tx(2027.5), AX_Y - 0.13, tx(2028.25) - tx(2027.5), 0.26, fill=WHITE, line=BLUE, line_w=1.0)
tb(s, tx(2027.5) - 0.3, AX_Y + 0.16, 2.6, 0.22, [("차기 전환점(e) · 가격 정상화", 11.25, True, BLUE)])
for yr in range(2018, 2031, 2):
    tb(s, tx(yr) - 0.4, AX_Y + 0.38, 0.8, 0.2, [(str(yr), 10.5, False, GRAY_2)], align=PP_ALIGN.CENTER)
marks = [  # (연도, 위/아래, 날짜, 한 줄 내용)
    (2019.3, "up", "2019", "HBM 조직 축소"),
    (2022.95, "down", "2022-12", "데이터 배치 표준 비준"),
    (2023.55, "up", "2023-07", "Solidigm 61TB, 12개월 선행"),
    (2024.75, "down", "2024", "비트 출하 30EB(4배)"),
    (2026.6, "up", "2026", "KV 캐시 배치 규격 미정의"),
    (2030.2, "down", "2030", "비트 10배 · 매출 정체(e)"),
]
for yr, side, d, t in marks:
    cx = tx(yr)
    rect(s, cx - 0.08, AX_Y - 0.08, 0.16, 0.16, fill=BLUE, shape=MSO_SHAPE.OVAL)
    runs = [[(d + "  ", 11.25, True, INK), (t, 11.25, False, GRAY)]]
    if side == "up":
        rect(s, cx - 0.006, AX_Y - 0.42, 0.012, 0.30, fill=LINE)
        tb(s, cx - 1.4, AX_Y - 0.66, 2.8, 0.24, runs, align=PP_ALIGN.CENTER)
    else:
        rect(s, cx - 0.006, AX_Y + 0.12, 0.012, 0.44, fill=LINE)
        if cx + 1.4 > RIGHT:
            tb(s, cx - 2.6, AX_Y + 0.58, 2.84, 0.24, runs, align=PP_ALIGN.RIGHT)
        else:
            tb(s, cx - 1.4, AX_Y + 0.58, 2.8, 0.24, runs, align=PP_ALIGN.CENTER)

# 교훈 카드 3 (좌) + 문제 제기 패널 (우)
L_Y = AX_Y + 1.02
L_H = 9.42 - 0.22 - L_Y
P_W = 5.00
PX = RIGHT - P_W
L_W = (PX - 0.30 - MX - 0.30 * 2) / 3


def lesson_visual_1(x, y, w, h):
    """수요 센싱: 고객 규격·코드 레인이 발주·비트 출하 레인보다 ≈2년 앞선다. 2026 슬롯은 빈 원(규격 미정의)."""
    lx, lw = x + 1.02, w - 1.02
    px = lambda t: lx + lw * (t - 2022.0) / 5.0
    top, bot = y + 0.55, y + h - 0.62
    tb(s, x, top - 0.14, 1.0, 0.28, [("고객 규격·코드", 10, True, INK)], anchor=MSO_ANCHOR.MIDDLE)
    tb(s, x, bot - 0.14, 1.0, 0.28, [("발주·비트 출하", 10, True, INK)], anchor=MSO_ANCHOR.MIDDLE)
    rect(s, lx, top, lw, 0.02, fill=LINE)
    rect(s, lx, bot, lw, 0.02, fill=LINE)
    d, o, e = px(2022.95), px(2024.5), px(2026.6)
    mid = (top + bot) / 2
    rect(s, d - 0.008, top, 0.016, mid - 0.15 - top, fill=BLUE_T2)
    rect(s, o - 0.008, mid + 0.15, 0.016, bot - (mid + 0.15), fill=BLUE_T2)
    rect(s, d, mid - 0.15, o - d, 0.30, fill=BLUE_T2, shape=MSO_SHAPE.RIGHT_ARROW)
    tb(s, d, mid - 0.15, o - d - 0.10, 0.30, [("≈2년", 10.5, True, INK)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    rect(s, d - 0.11, top - 0.11, 0.22, 0.22, fill=BLUE, shape=MSO_SHAPE.OVAL)
    tb(s, d - 0.25, top - 0.42, 2.0, 0.24, [("2022-12 배치 표준 비준", 10, False, GRAY)])
    rect(s, o - 0.11, bot - 0.11, 0.22, 0.22, fill=BLUE, shape=MSO_SHAPE.OVAL)
    tb(s, o - 0.25, bot + 0.14, 2.0, 0.24, [("2024 비트 출하 30EB", 10, False, GRAY)])
    rect(s, e - 0.11, top - 0.11, 0.22, 0.22, fill=WHITE, line=BLUE, line_w=1.75, shape=MSO_SHAPE.OVAL)
    tb(s, e - 1.85, top + 0.16, 2.05, 0.44, [("2026 KV 캐시 관리자 코드", 10, True, BLUE), ("배치 규격 미정의 = 선점 구간", 10, True, BLUE)],
       align=PP_ALIGN.RIGHT, spacing=1.0)


def lesson_visual_2(x, y, w, h):
    """고객 협업: 61TB QLC 출시 시점 막대(OCP 2022-10 예고 기준) + HBM4 규격 공동 정의 아이콘."""
    lab_w = 0.80
    bx, bw = x + lab_w, w - lab_w
    tb(s, x, y, w, 0.22, [("61TB QLC 출시 · OCP 2022-10 예고 기준", 10, False, GRAY_2)])
    ry = y + 0.32
    for who, months, hit, end in [("Solidigm", 9, True, "'23-07 규격 정의 참여"), ("삼성", 21, False, "'24-07 · 12개월 후발")]:
        tb(s, x, ry, lab_w - 0.05, 0.34, [(who, 10.5, True, INK)], anchor=MSO_ANCHOR.MIDDLE)
        bl = bw * months / 21.0
        rect(s, bx, ry, bl, 0.34, fill=BLUE if hit else WHITE, line=None if hit else LINE, line_w=0.75)
        if hit:
            tb(s, bx + bl + 0.08, ry, bw - bl - 0.08, 0.34, [(end, 10, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
        else:
            tb(s, bx + 0.10, ry, bl - 0.20, 0.34, [(end, 10, True, GRAY)], anchor=MSO_ANCHOR.MIDDLE, align=PP_ALIGN.RIGHT)
        ry += 0.46
    rect(s, x, ry + 0.08, w, 0.012, fill=LINE)
    hy = ry + 0.20
    tb(s, x, hy, w, 0.22, [("HBM4 규격 정의", 10, False, GRAY_2)])
    iy = hy + 0.30
    ph = min(0.52, y + h - iy - 0.02)
    pw = person(s, bx, iy, ph, color=BLUE)
    rect(s, bx + pw + 0.05, iy + ph * 0.45, 0.28, 0.05, fill=BLUE)
    person(s, bx + pw + 0.38, iy, ph, color=BLUE)
    tb(s, bx + 2 * pw + 0.50, iy - 0.04, bw - 2 * pw - 0.50, ph + 0.08,
       [("SK hynix ↔ NVIDIA 공동 정의", 9.75, True, BLUE), ("→ 주도권 · 삼성은 후발 대응", 9.75, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)


def lesson_visual_3(x, y, w, h):
    """의사결정 시점: 직전 다운턴의 결정 → 다음 다운턴의 초기 조건. 3행째(현재의 결정)는 강조."""
    c1w = (w - 0.40) / 2
    c2x = x + c1w + 0.40
    tb(s, x, y, c1w, 0.22, [("직전 다운턴의 결정", 10, False, GRAY_2)], align=PP_ALIGN.CENTER)
    tb(s, c2x, y, c1w, 0.22, [("다음 다운턴의 초기 조건", 10, False, GRAY_2)], align=PP_ALIGN.CENTER)
    rh = 0.42
    ry = y + 0.34
    for a, b, hot in [("DT19 무감산 성공", "DT23 국면 오판", False),
                      ("DT19 HBM 조직 축소", "DT23 주도권 상실", False),
                      ("2026 고객 시스템 진입", "2027H2 TCO 보증 수익", True)]:
        rect(s, x, ry, c1w, rh, fill=BLUE if hot else WHITE, line=None if hot else LINE, line_w=0.75)
        tb(s, x + 0.04, ry, c1w - 0.08, rh, [(a, 9.75, hot, WHITE if hot else INK)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
        rect(s, x + c1w + 0.08, ry + 0.10, 0.24, 0.22, fill=BLUE if hot else BLUE_T2, shape=MSO_SHAPE.RIGHT_ARROW)
        rect(s, c2x, ry, c1w, rh, fill=BLUE if hot else TINT)
        tb(s, c2x + 0.04, ry, c1w - 0.08, rh, [(b, 9.75, True, WHITE if hot else INK)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
        ry += rh + 0.16


lessons = [
    ("교훈 1 · 수요 센싱", "2년", "고객 규격·코드 신호가\n발주·출하에 선행", lesson_visual_1, 2, "규격은 호스트 계층에서 정의"),
    ("교훈 2 · 고객 협업", "12개월", "규격 정의 참여 vs 후발의\n출시 시점 격차", lesson_visual_2, 3, "고객 시스템까지 3단계"),
    ("교훈 3 · 의사결정 시점", "2027H2", "현재의 결정이 초기 조건이\n되는 차기 전환점", lesson_visual_3, 4, "FDE · 협약 · 조직"),
]
for i, (hd, num, cap, vis, nxt, link) in enumerate(lessons):
    x = MX + i * (L_W + 0.30)
    hot = i == 1
    rect(s, x, L_Y, L_W, L_H, fill=TINT if hot else WHITE, line=None if hot else LINE, line_w=0.75)
    if hot:
        rect(s, x, L_Y, 0.08, L_H, fill=BLUE)
    ix, iw = x + 0.30, L_W - 0.56
    tb(s, ix, L_Y + 0.16, iw, 0.28, [(hd, 15, True, BLUE)])
    tb(s, ix, L_Y + 0.48, 1.55, 0.52, [(num, 26, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
    tb(s, ix + 1.6, L_Y + 0.48, iw - 1.6, 0.52, [(ln, 10.5, False, GRAY) for ln in cap.split("\n")], anchor=MSO_ANCHOR.MIDDLE, spacing=1.02)
    rect(s, ix, L_Y + 1.10, iw, 0.012, fill=LINE)
    vis(ix, L_Y + 1.22, iw, L_H - 1.22 - 0.58)
    rect(s, ix, L_Y + L_H - 0.50, iw, 0.012, fill=LINE)
    ly_ = L_Y + L_H - 0.41
    rect(s, ix, ly_ + 0.02, 0.26, 0.26, fill=BLUE, shape=MSO_SHAPE.OVAL)
    tb(s, ix, ly_ + 0.02, 0.26, 0.26, [(str(nxt), 11, True, WHITE)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    tb(s, ix + 0.34, ly_, iw - 0.34, 0.30, [[(STORY[nxt - 1][1] + "  ", 11.25, True, BLUE), (link, 10.5, False, GRAY)]], anchor=MSO_ANCHOR.MIDDLE)

# 문제 제기 패널 (구 3장 요구의 이동 압축)
rect(s, PX, L_Y, P_W, L_H, fill=TINT)
rect(s, PX, L_Y, 0.08, L_H, fill=BLUE)
qx, qw = PX + 0.30, P_W - 0.52
tb(s, qx, L_Y + 0.16, qw, 0.28, [("문제 제기 · 요구의 이동", 15, True, BLUE)])
tb(s, qx, L_Y + 0.46, qw, 0.22, [("AI 수요가 구매 기준을 추론 캐시 계층으로 옮기고 있습니다", 10, False, GRAY)])
ey = L_Y + 0.74
eras = [("초기 '18~'23", "TB당 TCO: 원가 · 랙 밀도", "읽기 중심 · 0.3~0.6 DWPD로 충족 · 61TB", False),
        ("현재 '24~'26", "TB당 TCO: 전력 · 공급 확보", "읽기 중심 유지 · 쓰기 계층은 TLC · 122~245TB", False),
        ("향후 '27~'30", "GPU당 컨텍스트 용량 · 토큰당 비용", "KV 캐시 SSD 오프로드 · 쓰기 집약 → 1~3 DWPD", True)]
for lab, l1, l2, hot in eras:
    rect(s, qx, ey, qw, 0.56, fill=WHITE, line=BLUE if hot else LINE, line_w=1.25 if hot else 0.75)
    tb(s, qx + 0.12, ey + 0.03, 1.15, 0.5, [(lab, 10, True, BLUE if hot else GRAY_2)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)
    tb(s, qx + 1.28, ey + 0.04, qw - 1.36, 0.26, [(l1, 11, True, INK)])
    tb(s, qx + 1.28, ey + 0.29, qw - 1.36, 0.26, [(l2, 9.0, False, GRAY)])
    ey += 0.62
stats = [("10배", "QLC 비트\n'25 → '30"), ("350EB", "2030 추론 캐시\n계층 수요"), ("10~40배", "요구 1~3 vs QLC\n정격 0.075~0.6 DWPD")]
sw = (qw - 0.2) / 3
for i, (num, lab) in enumerate(stats):
    sx = qx + i * (sw + 0.1)
    tb(s, sx, ey + 0.02, sw, 0.36, [(num, 18, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
    tb(s, sx, ey + 0.38, sw, 0.36, [(ln, 8.75, False, GRAY) for ln in lab.split("\n")], spacing=1.0)
ey += 0.78
rect(s, qx, ey, qw, 0.012, fill=BLUE_T2)
tb(s, qx, ey + 0.06, qw, 0.44, [("대용량 QLC로 1~3 DWPD를 충족할 해법이 필요합니다", 11.25, True, BLUE), ("정격 QLC 0.075~0.6 DWPD로는 격차 10~40배 → 2장 해법 사다리", 9.5, False, GRAY)], spacing=1.02)
quote(s, qx, L_Y + L_H - 0.68, qw, 0.60,
      "부품이 어떻게 쓰일지는 시스템을 설계하는 사람 마음에 있다. 그걸 알았으면 HBM을 진작 준비했을 것이다",
      "송용호 AX/PI센터장 · 사내 인터뷰 2026-09-03", size=9.25)

band(s, 9.42, 0.80, "결론",
     "요구는 다운턴 국면에서 고객 규격·코드로 정의됐고, 정의에 참여한 공급자가 선점했습니다.\n차기 요구는 추론 캐시 계층의 대용량·1~3 DWPD이며, QLC 정격 0.075~0.6으로는 충족되지 않습니다",
     main_size=16.5, next_step=2)
footer(s, "출처: 위키 다운턴 역사 20년(DT19·DT23 낙폭), fdp-host-ssd-platform §2.5(Solidigm 61TB), QLC 연혁 소스(배치 표준 비준·30EB), GitHub README(캐시 관리자 4종), TrendForce·SanDisk FMS 2026·Meta(수요 모델, 2026~2030 추정), StorageReview(DWPD)", 1)
notes(s, "1장은 문제 제기입니다. 두 다운턴의 교훈에서 출발해 지금의 요구가 어디로 이동했는지, 왜 해법이 필요한지를 보입니다. 상단 타임라인은 DT19(재고 조정 국면, 매출 낙폭 -37.6%)와 DT23(최대 낙폭 -45%, 진앙 eSSD) 두 다운턴 구간과 QLC eSSD 연혁을 동일 시간축에 배치한 것입니다. "
      "교훈 1, 수요 센싱: 수요 신호는 발주보다 약 2년 선행하여 고객의 규격·표준·소스 코드에 나타납니다. DT23 국면인 4Q22에 eSSD 매출이 27% 감소하는 동안 Meta·Google은 데이터 배치 표준을 비준했고, 비트 출하는 2년 뒤인 2024년에 30EB로 급증했습니다. 현재의 등가 신호는 KV 캐시 관리자 4종의 코드에 배치·내구성 규격이 미정의라는 사실이며, 규격 정의 주체가 선점 가능한 구간입니다. 교훈 2, 고객 협업: 규격 정의에 참여한 공급자가 적중했습니다. Solidigm은 61TB QLC를 삼성보다 12개월 먼저 출시했고, HBM4는 NVIDIA와 규격을 공동 정의한 SK hynix가 주도권을 확보했습니다. 교훈 3, 의사결정 시점: 직전 다운턴의 결정이 다음 다운턴의 초기 조건이 됩니다. DT19의 무감산 성공 경험이 DT23 국면 오판으로, DT19의 HBM 조직 축소가 DT23 회복기 주도권 상실로 이어졌습니다. 차기 전환점은 2027년 하반기 가격 정상화 국면입니다. "
      "우측 문제 제기 패널은 요구의 이동입니다. 세 국면의 구매 기준은 일관되게 용량 계층의 TB당 TCO였고(초기 원가·랙 밀도, 현재 전력·공급 확보), 향후 국면의 기준은 GPU당 컨텍스트 용량과 토큰당 비용입니다. 바뀐 것은 워크로드의 쓰기 비중입니다. 초기 국면은 읽기 중심이라 0.3~0.6 DWPD로 충족됐지만, KV 캐시 SSD 오프로드가 만드는 추론 캐시 계층은 쓰기 집약적이어서 현재 TLC 1~3 DWPD가 담당합니다. 용량은 61TB에서 122~245TB로 커졌습니다. 수요 모델은 QLC 비트가 2025년 대비 2030년 10배, 2030년 추론 캐시 계층 수요는 350EB이며, 요구 1~3 DWPD와 QLC 정격 0.075~0.6 DWPD 사이에는 10~40배 격차가 있습니다. 결론: 대용량 QLC로 1~3 DWPD를 충족할 해법이 필요합니다. 송용호 AX/PI센터장의 인용은 그 해법이 고객 시스템 안에서 나와야 하는 이유입니다. 지금까지 이런 문제를 어느 계층이 풀어 왔는지가 2장입니다. 근거는 위키 qlc-ssd-market.md §3.4·§3.5, 수요 모델은 §4.3.")

# ================================================================ S2. 해법 사다리 — 이관 매트릭스 (solution_ladder_slide.build 공용; v4.0 2장)
import sys as _sys
_sys.path.insert(0, HERE)
import solution_ladder_slide as _ladder
_ladder.build(_sys.modules[__name__], page_no=2, kicker=2, next_step=3)

# ================================================================ S3. 역량 — 3단계 (v3.10 공식 문안·범례를 Phase 1 옆으로·결론 밴드 신설)
s = prs.slides.add_slide(BLANK)
header(s, 3,
       "내구성 격차는 호스트 배치(WAF)로 해소되므로, 고객 시스템까지 3단계로 역량을 확장합니다",
       [("「승부는 칩을 많이 파는 기업이 아니라, 고객의 아키텍처 안으로 들어가 수요를 함께 설계하는 기업이 가져간다」", 18, False, INK),
        ("   신문섭 · Bain 파트너, 2026-06", 13.5, False, GRAY_2)])

T_Y, T_H, T_W, T_GAP = 2.80, 0.96, 4.41, 0.26
tiles = [
    ("10~40배", 1.95, "내구성 격차", "QLC 0.075~0.6 vs TLC 1~3 DWPD"),
    ("25배", 1.45, "스트림 격차", "RUH 2~8개 vs 200개 이상"),
    ("0건", 1.25, "접점 부재", "캐시 관리자 4종 코드의 배치 규격 언급"),
    ("3.22 → 1.03", 2.25, "해소 수단 실증", "배치 표준 WAF 실측"),
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
      "RUH 200+ 펌웨어 · 2Tb QLC · NVMe KV 확장 · 텔레메트리"],
     "고객 보증 범위: 정격 내 QLC 원가·전력"),
    ("Phase 2", "워크로드 실측 기반 최적화", ["none", "none", "touch", "touch", "own"],
     ["vLLM · SGLang · TensorRT-LLM",
      "KVBM 빈도 필터 · LMCache 퇴거 정책(트레이스 원천)",
      "io_uring·GDS 백엔드 write stream 부착 · xNVMe · blktrace·eBPF",
      "Linux 6.16 write streams · XFS·f2fs 스트림 · CMX 힌트 매핑 검증",
      "RUH 정책(수명·테넌트·prefix) · WAF·유효 DWPD 실측"],
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
rect(s, MX, BAR_Y, P_W, BAR_H, fill=BLUE)
rect(s, MX + P_W + 0.33, BAR_Y, P_W * 0.28, BAR_H, fill=BLUE_T2)
mk_x = MX + P_W + 0.33 + P_W * 0.28
rect(s, mk_x - 0.13, BAR_Y + BAR_H + 0.03, 0.26, 0.18, fill=BLUE, shape=MSO_SHAPE.ISOSCELES_TRIANGLE)
tb(s, mk_x + 0.22, BAR_Y + BAR_H - 0.02, 9.0, 0.30,
   [[("삼성 현 위치  ", 13.5, True, BLUE), ("디바이스 확보(CMX 첫 공급) · 워크로드 실측 미공개 · 캐시 관리자 4종 기여 0건", 12.75, False, GRAY)]],
   anchor=MSO_ANCHOR.MIDDLE)

band(s, 9.46, 0.76, "결론",
     "단계마다 고객 보증 범위가 원가·전력 → 워크로드 수명 → 시스템 TCO로 확장됩니다.\n삼성은 1단계 확보·2단계 진입 상태이며, 3단계 진입 수단이 다음 장입니다",
     main_size=17, next_step=4)
footer(s, "출처: StorageReview·Solidigm·Kioxia 스펙(DWPD), ScaleFlux 2026-07(RUH 200+), GitHub README 확인(LMCache·Mooncake·FlexKV·3FS·xNVMe), CacheLib FDP 문서(WAF), Linux 6.16·XFS 패치, NVIDIA CMX 문서", 3)
notes(s, "3장은 해법의 제안입니다. 1장이 제기한 내구성 격차를 해소하는 경로이며, 2장의 산식에서 남은 보상 변수는 WAF이고, WAF는 호스트가 데이터 수명에 따라 배치를 결정할 때 1에 수렴하므로 내구성 격차는 디바이스가 아니라 고객 시스템의 배치 방식에서 해소됩니다. 그래서 역량을 디바이스에서 고객 시스템 계층까지 3단계로 확장합니다. 리드의 인용은 베인 신문섭 파트너의 진단으로 같은 결론입니다. "
      "상단 타일은 격차와 수단입니다. 내구성 격차(QLC 정격 0.075~0.6 vs TLC 1~3 DWPD, 10~40배), 스트림 격차(RUH 2~8 vs 200 이상), 접점 부재(KV 캐시 관리자 4종 코드에 배치 규격 언급 0건), 해소 수단 실증(CacheLib 배치 표준 적용 WAF 3.22→1.03, XFS write streams RocksDB -35%, ScaleFlux 유효 7~10 DWPD). "
      "그림은 고객 시스템 5계층을 세 번 그리고 삼성이 닿는 층을 색으로 표시하며(파랑 = 삼성 코드·제품, 연파랑 = 관측·분석, 흰색 = 고객 영역), 각 층에 그 층을 구성하는 기술을 적었습니다. 응용·추론 엔진(vLLM·SGLang·TensorRT-LLM), KV 캐시 관리자(NVIDIA Dynamo KVBM·LMCache·Mooncake·Tencent FlexKV), I/O 라이브러리(NIXL·GPUDirect Storage·io_uring·SPDK/xNVMe), 커널·플랫폼(Linux 6.16 write streams·XFS/f2fs 스트림·NVIDIA CMX와 DOCA Memos), SSD 디바이스(컨트롤러·펌웨어 RUH·2Tb QLC·NVMe KV 확장·텔레메트리). "
      "Phase 1 배치 표준 디바이스 확보: SSD 층만 삼성의 범위이며 고객 보증 범위는 정격 내 QLC 원가·전력입니다. Phase 2 워크로드 실측 기반 최적화: 캐시 관리자의 빈도 필터·퇴거 정책이 트레이스의 원천이고, I/O 라이브러리의 io_uring·GDS 백엔드에 write stream을 부착하며 커널 스트림과 CMX 힌트 매핑을 검증해 RUH 정책·WAF·유효 DWPD 실측을 공개합니다. 고객 보증 범위는 고객 워크로드 기준 수명입니다. Phase 3 고객 시스템 내 공동 설계: 캐시 관리자 4종에 플러그인을 메인라인으로 머지하고, NIXL·xNVMe가 기본 백엔드가 되며, DOCA Memos와 배치 표준의 매핑을 NVIDIA와 공동 정의하고, 응용 층은 커넥터·스케줄러를 분석해 공용 TCO 모델(GPU당 동시 사용자·TTFT·전력)로 협의합니다. FDE(Forward Deployed Engineer)가 고객 시스템에 상주합니다. 고객 보증 범위는 시스템 수준 TCO입니다. "
      "삼성 현 위치는 Phase 1 확보, Phase 2 진입: KV cache 백서 2종으로 측정 역량은 있으나 트레이스 기반 실측이 미공개이고 캐시 관리자 4종에 기여가 없습니다. 오케스트레이션 자체는 만들지 않습니다. 결론: 단계마다 고객 보증 범위가 원가·전력 → 워크로드 수명 → 시스템 TCO로 확장되며, 3단계에 진입하는 수단(FDE·전략적 협약)과 이를 수행할 조직이 4장입니다.")

# ================================================================ S4. 실행 — FDE + SCA 두 트랙, 선례 카드, 조직·인사·문화 (v3.10 공식 문안·5장 요약 체인)
s = prs.slides.add_slide(BLANK)
header(s, 4,
       "고객 시스템 진입 수단은 FDE 상주와 전략적 협약(SCA)이며, 두 수단 모두 업계 선례가 있습니다",
       [("「단 한 번도 고객 지향적인 적이 없었다. 진짜 고객 지향이 뭔지 이해하고, 그것을 위한 전략이 필요한 시점이 이미 됐다」", 18, False, INK),
        ("   송용호 · AX/PI센터장, 2026-09", 13.5, False, GRAY_2)])

M_Y, M_H = 2.80, 4.52
# 좌: 삼성
LB_W = 3.85
rect(s, MX, M_Y, LB_W, M_H, fill=WHITE, line=LINE, line_w=0.75)
tb(s, MX + 0.34, M_Y + 0.22, LB_W - 0.68, 0.32, [("삼성 개발실", 18, True, BLUE)])
tb(s, MX + 0.34, M_Y + 0.56, LB_W - 0.68, 0.26, [("삼성이 제공하는 것", 12.75, False, GRAY_2)])
gives = ["KV-ready QLC + 수명 보증", "FDE(고객 상주 엔지니어)", "업스트림 코드 · 공용 TCO 모델", "다년 공급 · 선급 · 자본"]
gy = M_Y + 1.02
for g in gives:
    rect(s, MX + 0.34, gy + 0.11, 0.16, 0.16, fill=BLUE)
    tb(s, MX + 0.62, gy, LB_W - 0.96, 0.38, [(g, 14.25, True, INK)], anchor=MSO_ANCHOR.MIDDLE)
    gy += 0.58
rect(s, MX + 0.34, M_Y + M_H - 1.16, LB_W - 0.68, 0.012, fill=LINE)
quote(s, MX + 0.34, M_Y + M_H - 1.06, LB_W - 0.68, 0.94,
      "고객의 집에 가서 저녁을 같이 먹는 것, 삼성은 상상할 수 없는 일이지만 SK하이닉스는 한다",
      "송용호 · 고객 관계 = 워크로드 접근권", size=12.0)

# 우: 고객 시스템
RB_W = 4.30
RBX = RIGHT - RB_W
rect(s, RBX, M_Y, RB_W, M_H, fill=WHITE, line=LINE, line_w=0.75)
tb(s, RBX + 0.34, M_Y + 0.22, RB_W - 0.68, 0.32, [("고객 시스템", 18, True, BLUE)])
tb(s, RBX + 0.34, M_Y + 0.56, RB_W - 0.68, 0.26, [("삼성 인력·코드의 진입 계층", 12.75, False, GRAY_2)])
cys = stack(s, RBX + 0.34, M_Y + 0.98, 2.56, ["응용 · 추론 엔진", "KV 캐시 관리자", "I/O · 커널", "SSD: 삼성 QLC"],
            ["none", "touch", "own", "own"], layer_h=0.5, gap=0.09)
_px = RBX + 0.34 + 2.56 + 0.16
pw = person(s, _px, cys[1] + 0.03, 0.44, color=BLUE)
tb(s, _px + pw + 0.08, cys[1], 0.8, 0.5, [("FDE", 12.75, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
tb(s, _px, cys[2], 1.05, 0.5, [("머지", 12.75, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
logo_row(s, [("logo", "anthropic"), ("logo", "openai"), ("logo", "nvidia"), ("logo", "meta")],
         RBX + 0.34, M_Y + M_H - 0.62, 0.24, gap=0.18, max_w=RB_W - 0.68)

# 중앙: 두 트랙 화살표 + 선례 카드 2
CX0 = MX + LB_W + 0.28
CX1 = RBX - 0.28
CWID = CX1 - CX0
A_H = 0.92
ar1 = rect(s, CX0, M_Y + 0.12, CWID, A_H, fill=BLUE, shape=MSO_SHAPE.RIGHT_ARROW)
ar1.adjustments[0] = 0.80
ar1.adjustments[1] = 0.26
tb(s, CX0 + 0.40, M_Y + 0.12, CWID - 1.4, A_H,
   [("① FDE 상주: 삼성 엔지니어의 고객 시스템 진입", 17.25, True, WHITE), ("상주 엔지니어 · 업스트림 코드 · 수명 보증", 13.5, False, WHITE)],
   anchor=MSO_ANCHOR.MIDDLE, spacing=1.06)

CARD_Y = M_Y + 0.12 + A_H + 0.16
CARD_H = M_H - 2 * (0.12 + A_H) - 0.32
CARD_W = (CWID - 0.22) / 2

# 선례 카드 A: Palantir FDE
cx = CX0
rect(s, cx, CARD_Y, CARD_W, CARD_H, fill=TINT)
tb(s, cx + 0.24, CARD_Y + 0.12, CARD_W - 0.48, 0.28,
   [[("선례 · ", 13.5, False, GRAY), ("Palantir FDE", 13.5, True, BLUE), (" (Forward Deployed Engineer)", 12.0, False, GRAY)]])
pic_y = CARD_Y + 0.52
px = cx + 0.24
for k in range(3):
    person(s, px + k * 0.30, pic_y + 0.05, 0.36, color=BLUE)
rect(s, px + 0.98, pic_y + 0.14, 0.34, 0.16, fill=BLUE_T2, shape=MSO_SHAPE.RIGHT_ARROW)
rect(s, px + 1.40, pic_y, 1.05, 0.46, fill=WHITE, line=BLUE, line_w=1.0)
tb(s, px + 1.40, pic_y, 1.05, 0.46, [("고객 현장", 12.0, True, INK)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
tb(s, cx + 0.24, pic_y + 0.60, CARD_W - 0.48, CARD_H - 1.14,
   [("고객 시스템에 상주하며 실제 요구를 코드로 구현하고 성과로 평가받는 엔지니어(코드명 Delta)", 12.0, False, GRAY),
    ("고객 락인의 동력으로 평가(주가 수익률 640%). Anthropic·OpenAI가 GTM 모델로 채택", 12.0, True, INK)],
   spacing=1.04)

# 선례 카드 B: Micron ↔ Anthropic SCA
cx = CX0 + CARD_W + 0.22
rect(s, cx, CARD_Y, CARD_W, CARD_H, fill=TINT)
tb(s, cx + 0.24, CARD_Y + 0.12, CARD_W - 0.48, 0.28,
   [[("선례 · ", 13.5, False, GRAY), ("Micron ↔ Anthropic SCA", 13.5, True, BLUE), (" (2026-06)", 12.0, False, GRAY)]])
blk_x, blk_y = cx + 0.24, CARD_Y + 0.52
for k, (lab, hot) in enumerate([("공동 설계", True), ("다년 공급", False), ("운영 통합", False), ("자본(Series H)", False)]):
    by = blk_y + k * 0.30
    rect(s, blk_x, by, 1.55, 0.26, fill=BLUE if hot else BLUE_T2)
    tb(s, blk_x, by, 1.55, 0.26, [(lab, 11.25, True, WHITE if hot else INK)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
tb(s, blk_x + 1.55 + 0.22, blk_y - 0.02, CARD_W - 0.48 - 1.77, CARD_H - 0.64,
   [("네 요소를 한 계약에 결합해 워크로드·규격 접근권을 확보", 12.0, False, GRAY),
    ("Micron SCA 16건 · 최소 매출 약 $100B · 예치금 $22B", 12.0, True, INK),
    ("삼성·SK의 Anthropic 공급 계약에는 공동 설계 조항 부재 → 삼성이 선제 제안", 12.0, True, BLUE)],
   spacing=1.04)

B_Y = CARD_Y + CARD_H + 0.16
ar2 = rect(s, CX0, B_Y, CWID, A_H, fill=BLUE_T2, shape=MSO_SHAPE.LEFT_ARROW)
ar2.adjustments[0] = 0.80
ar2.adjustments[1] = 0.26
tb(s, CX0 + 1.05, B_Y, CWID - 1.4, A_H,
   [("② 전략적 협약(SCA): 워크로드·규격 접근권 확보", 17.25, True, INK), ("트레이스 · KV 수명 정책 · 레퍼런스 스펙 · 계약 시한 2027년 상반기(공급 완화 전)", 13.5, False, INK)],
   anchor=MSO_ANCHOR.MIDDLE, spacing=1.06)

# 조직·인사·문화 3축 타일
F_Y, F_H = M_Y + M_H + 0.20, 1.34
axes = [("조직", ["실리콘밸리 소프트웨어 자회사", "FDE Pod 고객 상주", "시스템 소프트웨어 조직 강화"]),
        ("인사", ["고객 시스템을 아는 시스템 SW 전문가 채용·양성", "미주 현지 채용 확대 · 고객과 같은 시간대에서 협업", "별도 보상 · 본사 엔지니어 상주 로테이션"]),
        ("문화", ["오픈소스 생태계를 주도하는 문화", "메인테이너·커미터 배출 · 레퍼런스 프로젝트 운영", "업스트림 우선 · KV 실측 업계 최초 공개"])]
FW = (CW - 0.28 * 2) / 3
for i, (lab, lines) in enumerate(axes):
    x = MX + i * (FW + 0.28)
    rect(s, x, F_Y, FW, F_H, fill=WHITE, line=LINE, line_w=0.75)
    rect(s, x, F_Y, 0.95, F_H, fill=BLUE)
    tb(s, x, F_Y, 0.95, F_H, [(lab, 17.25, True, WHITE)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    tb(s, x + 1.12, F_Y, FW - 1.28, F_H,
       [(lines[0], 14.25, True, INK)] + [(l, 13.5, False, GRAY) for l in lines[1:]],
       anchor=MSO_ANCHOR.MIDDLE, spacing=1.08)

# 5장 요약 체인(스토리라인 전체)
band_chain(s, 9.12, 1.04, "요약", [
    ("1 교훈 · 문제", "요구는 고객 규격·코드로 정의\n차기 요구 = 대용량 · 1~3 DWPD"),
    ("2 해법 사다리", "단품 → SSD → 호스트로 이관\nWAF는 호스트 공동 설계로만 1.0"),
    ("3 역량", "디바이스 → 워크로드 →\n고객 시스템 3단계"),
    ("4 실행", "FDE 상주 · 전략적 협약\n조직 · 인사 · 문화"),
])
footer(s, "출처: Pragmatic Engineer·FDE Academy·MindStudio(Palantir FDE), Micron IR 2026-06-22·10-Q(SCA 16건·$22B), SK hynix 뉴스룸(AI Company), levels.fyi 2026 · 규모·시점은 추정, 사내 수치는 [사내 확인]", 4)
notes(s, "4장은 3장의 3단계에 진입하는 수단과 이를 수행할 조직입니다. 리드의 인용은 송용호 AX/PI센터장의 발언이며, 왼쪽 박스 아래 인용도 같은 인터뷰입니다. 고객 관계가 곧 워크로드 접근권이라는 뜻이고, 미주 현지 채용과 FDE 상주가 그 대응입니다. "
      "진입 수단은 두 가지이고 각각 선례가 있습니다. ① FDE 상주: 삼성 엔지니어가 고객 시스템에 진입합니다. Palantir가 창안한 역할(내부 코드명 Delta)로, 고객 환경 내부에 상주하며 실제 운영 제약 아래서 프로덕션 시스템을 직접 구축하고 청구 시간이 아니라 성과로 평가받습니다. 명시적 요구와 실제 요구의 간극을 현장에서 코드로 해소하고, 특정 고객용 해법이 제품 표준 기능으로 전환되는 피드백 루프를 만듭니다. 고객 락인의 동력이자 640% 주가 수익률의 원천으로 평가되고, Anthropic·OpenAI가 엔터프라이즈 GTM 모델로 채택했습니다(OpenAI는 2025년 초 FDE 팀 2명→10명 이상). 삼성은 Co-Design Pod를 FDE 모델로 운영하되, 메모리는 제조 리드타임이 길므로 시스템 아키텍트·TCO 모델링 역량을 결합합니다. "
      "② 전략적 협약(SCA): 고객 워크로드·규격 접근권을 계약으로 확보합니다. 선례는 Micron↔Anthropic(2026-06-22): 공동 설계(HBM·DRAM·SSD를 Claude 학습·추론 워크로드에 맞춰 공동 최적화) + 다년 공급 + 운영 통합(Claude 사내 배치) + 자본(Series H)을 한 계약에 결합했습니다. Micron은 SCA 16건, 최소 계약매출 약 $100B, 예치금 $22B를 공시했습니다. 삼성·SK의 Anthropic 공급 계약에는 공동 설계 조항이 없으므로 삼성이 선제 제안합니다. 계약 시한은 공급 완화 전인 2027년 상반기까지입니다. "
      "조직·인사·문화 세 축(전략·재무 축과 90일·1년·3년 타임라인은 위키 실행 전략 페이지 §2.1·§2.5·§3). 조직은 실리콘밸리 소프트웨어 자회사와 FDE Pod에 더해 시스템 소프트웨어 조직을 강화합니다. 인사는 고객 시스템(추론 엔진·KV 캐시 관리자·I/O·커널 코드)을 읽고 수정할 수 있는 시스템 소프트웨어 전문가의 채용·양성이 핵심이며, 미주 현지 채용을 확대하고 별도 보상 체계를 두며 본사 엔지니어는 상주 로테이션으로 양성합니다. 문화는 업스트림 우선을 넘어 오픈소스 생태계를 주도하는 기업 문화로 전환합니다. 기여자에서 메인테이너·커미터로, 삼성이 운영하는 레퍼런스 프로젝트에 외부 기여가 들어오게 하며, KV cache 실측을 업계 최초로 공개합니다. "
      "하단 요약 체인은 4장의 논리입니다. 1장 교훈·문제: 요구는 다운턴 국면에 고객 규격·코드로 정의되며, 차기 요구는 추론 캐시 계층의 대용량·1~3 DWPD다. 2장 해법 사다리: 단품이 못 푼 문제는 SSD, 다시 호스트로 이관돼 왔고 WAF는 호스트 공동 설계로만 1.0이 된다. 3장 역량: 디바이스 → 워크로드 → 고객 시스템 3단계로 확장한다. 4장 실행: FDE 상주와 전략적 협약, 그리고 조직·인사·문화가 그 수단이다.")

prs.save(os.path.abspath(OUT))
print(f"생성 완료: {os.path.abspath(OUT)} ({len(prs.slides._sldIdLst)}장)")
