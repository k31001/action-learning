# -*- coding: utf-8 -*-
"""향후 계획 2장 덱 생성 (전략 3 FDP 4주 계획 + 4대 전략 종합). v3: 간트형(행=축, 열=주, 막대=기간, 하단 범례).

디자인 시스템: generate_ssd_strategy_pptx.py 승계
  20 x 11.25 in 캔버스 / Arial 단일 폰트 / Samsung Blue #1428A0 + 그레이 계열
  헤더(조직명·문서등급·킥커·33pt 액션 타이틀·21pt 리드·헤어라인) / 푸터(출처·페이지)

실행: .venv/bin/python outputs/presentation/scripts/generate_future_plan_pptx.py
출력: outputs/presentation/future-plan.pptx
콘텐츠 소스: outputs/presentation/future-plan-outline.md
"""
import os
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.dml import MSO_LINE_DASH_STYLE
from pptx.oxml.ns import qn

# ---- 디자인 토큰 ----
BLUE = RGBColor(0x14, 0x28, 0xA0)
BLUE_T1 = RGBColor(0x3C, 0x5A, 0xC8)
BLUE_T2 = RGBColor(0xAA, 0xB8, 0xE8)
SLATE = RGBColor(0x2F, 0x3A, 0x4A)
INK = RGBColor(0x1A, 0x1A, 0x1A)
GRAY = RGBColor(0x55, 0x55, 0x55)
GRAY_M = RGBColor(0x7A, 0x7A, 0x7A)
GRAY_L = RGBColor(0x8A, 0x8A, 0x8A)
LINE = RGBColor(0xD9, 0xD9, 0xD9)
COL_A = RGBColor(0xF2, 0xF2, 0xF2)
COL_B = RGBColor(0xFA, 0xFA, 0xFA)
TINT = RGBColor(0xF4, 0xF6, 0xFC)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
FONT = "Arial"

MX = 0.79
CW = 18.42
RIGHT = MX + CW
GRADE = "[문서등급 표기]"
TOTAL = 2

OUT = os.path.join(os.path.dirname(__file__), "..", "future-plan.pptx")

prs = Presentation()
prs.slide_width = Emu(18288000)   # 20.00 in
prs.slide_height = Emu(10287000)  # 11.25 in
BLANK = prs.slide_layouts[6]


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
    ea.set("typeface", FONT)


def tb(slide, x, y, w, h, paras, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP, wrap=True,
       spacing=1.15):
    box = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = box.text_frame
    tf.word_wrap = wrap
    tf.vertical_anchor = anchor
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    for i, (t, size, bold, color) in enumerate(paras):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        p.line_spacing = spacing
        r = p.add_run()
        r.text = t
        _font(r, size, bold, color)
    return box


def rect(slide, x, y, w, h, fill=None, line=None, line_w=0.75, shape=MSO_SHAPE.RECTANGLE,
         dash=False):
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
        if dash:
            sp.line.dash_style = MSO_LINE_DASH_STYLE.DASH
    return sp


def header(slide, kicker, title, lead):
    tb(slide, MX, 0.46, 6.0, 0.34, [("삼성전자 메모리사업부", 18, True, BLUE)])
    tb(slide, 13.21, 0.46, 6.0, 0.34, [(GRADE, 18, False, GRAY)], align=PP_ALIGN.RIGHT)
    tb(slide, MX, 0.93, CW, 0.34, [(kicker, 18, True, BLUE)])
    tb(slide, MX, 1.33, CW, 0.62, [(title, 33, True, INK)])
    tb(slide, MX, 2.04, CW, 0.44, [(lead, 21, False, GRAY)])
    rect(slide, MX, 2.62, CW, 0.014, fill=LINE)


def footer(slide, source, no):
    tb(slide, MX, 10.49, 15.6, 0.34, [(source, 18, False, GRAY)])
    tb(slide, 17.55, 10.49, 1.66, 0.34, [(f"{no:02d} / {TOTAL:02d}", 18, False, GRAY)],
       align=PP_ALIGN.RIGHT)


def notes(slide, text):
    slide.notes_slide.notes_text_frame.text = text


# ---- 간트 그리드: 9월 1주 ~ 10월 4주 (8주) ----
LW = 2.30
TX = MX + LW
TW = RIGHT - TX
NW = 8
WKW = TW / NW
WEEK_DATES = ["9/7", "9/14", "9/21", "9/28", "10/5", "10/12", "10/19", "10/26"]
MONTHS = [("9월", 0, 4), ("10월", 4, 5)]
IV_COL = 3                      # 인터뷰 = 3주와 4주 경계 (9월 말)
PREP_FROM = 5                   # 발표자료 준비 = 10/12 ~
GY = 2.90                       # 그리드 상단
MH, WH = 0.34, 0.36             # 월·주 헤더 높이
RY0 = GY + MH + WH + 0.10       # 첫 행 y


def grid(slide, n_rows, rh):
    rows_end = RY0 + n_rows * rh
    # 열 음영 (교대) + 발표자료 준비 구간 틴트
    for c in range(NW):
        x = TX + c * WKW
        fill = TINT if c >= PREP_FROM else (COL_A if c % 2 == 0 else COL_B)
        rect(slide, x, GY, WKW, rows_end - GY, fill=fill)
    # 월 헤더
    for name, a, b in MONTHS:
        tb(slide, TX + a * WKW, GY, (b - a) * WKW, MH, [(name, 16, True, GRAY)],
           align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    rect(slide, TX, GY + MH, TW, 0.014, fill=LINE)
    # 주 헤더
    for c, d in enumerate(WEEK_DATES):
        tb(slide, TX + c * WKW, GY + MH, WKW, WH, [(d, 16, True, INK)],
           align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    # 발표자료 준비 라벨 (주 헤더 위 월 헤더 자리 우측)
    tb(slide, TX + PREP_FROM * WKW, GY, (NW - PREP_FROM) * WKW, MH,
       [("10월 · 발표자료 준비", 16, True, BLUE)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    # 행 구분 점선
    for r in range(1, n_rows):
        y = RY0 + r * rh
        ln = rect(slide, MX, y, CW, 0.0, line=GRAY_L, line_w=0.75, dash=True)
    rect(slide, MX, rows_end, CW, 0.014, fill=LINE)
    return rows_end


def row_label(slide, y, rh, num, name, color, muted=False):
    cy = y + rh / 2
    rect(slide, MX + 0.10, cy - 0.20, 0.40, 0.40, fill=color, shape=MSO_SHAPE.OVAL)
    tb(slide, MX + 0.10, cy - 0.20, 0.40, 0.40, [(num, 14, True, WHITE)],
       align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    tb(slide, MX + 0.66, cy - 0.22, LW - 0.7, 0.44,
       [(name, 18.5, True, GRAY_L if muted else INK)], anchor=MSO_ANCHOR.MIDDLE)


def bar(slide, y, rh, c0, c1, text, color, txt=WHITE, size=14.5, h=0.46, dash=False):
    x = TX + c0 * WKW + 0.05
    w = (c1 - c0) * WKW - 0.10
    by = y + (rh - h) / 2
    if dash:
        rect(slide, x, by, w, h, fill=WHITE, line=GRAY_L, dash=True, shape=MSO_SHAPE.PENTAGON)
    else:
        rect(slide, x, by, w, h, fill=color, shape=MSO_SHAPE.PENTAGON)
    tb(slide, x + 0.12, by, w - 0.34, h, [(text, size, True, txt)], anchor=MSO_ANCHOR.MIDDLE)


def interview_marker(slide, y_top, y_bot, label_y):
    x = TX + IV_COL * WKW
    ln = rect(slide, x, y_top, 0.0, y_bot - y_top, line=BLUE, line_w=1.5, dash=True)
    rect(slide, x - 0.13, y_bot - 0.13, 0.26, 0.26, fill=BLUE, shape=MSO_SHAPE.DIAMOND)
    tb(slide, x - 3.0, label_y, 6.0, 0.34, [("담당임원 인터뷰 · 9월 말", 16, True, BLUE)],
       align=PP_ALIGN.CENTER)


def legend(slide, y, items):
    n = len(items)
    w = CW / n
    for i, (color, title, desc, muted) in enumerate(items):
        x = MX + i * w
        rect(slide, x, y + 0.02, 0.34, 0.34, fill=color, shape=MSO_SHAPE.OVAL)
        tb(slide, x + 0.50, y - 0.02, w - 0.7, 0.42,
           [(title, 19.5, True, GRAY_L if muted else INK)], anchor=MSO_ANCHOR.MIDDLE)
        tb(slide, x + 0.50, y + 0.50, w - 0.7, 1.3,
           [(d, 15, False, GRAY_L if muted else GRAY) for d in desc], spacing=1.25)


# =====================================================================
# 슬라이드 1 · 전략 3 FDP 향후 계획
# =====================================================================
s = prs.slides.add_slide(BLANK)
header(s, "삼성 SSD 전략적 방향성 · 향후 계획 (전략 3 FDP)",
       "남은 4주, 세 가지 검토로 FDP 전략을 실행안으로 끌어올립니다",
       "9월 말 담당임원 인터뷰를 분기점으로, 앞은 조사와 설계, 뒤는 확정과 결론입니다")

RH = 0.84
rows_end = grid(s, 4, RH)
r = [RY0 + i * RH for i in range(4)]

row_label(s, r[0], RH, "1", "현실 인식", SLATE)
bar(s, r[0], RH, 0, 1, "질문 설계", SLATE)
bar(s, r[0], RH, 1, 3, "사내 자료 확인 · 확인 대장 완성", SLATE)
bar(s, r[0], RH, 3, 4, "현황·갭 표", SLATE)

row_label(s, r[1], RH, "2", "AI 워크로드", BLUE)
bar(s, r[1], RH, 0, 1, "워크로드 분류", BLUE)
bar(s, r[1], RH, 1, 2, "스택·코드 조사", BLUE)
bar(s, r[1], RH, 2, 3, "효과·난이도 판정", BLUE)
bar(s, r[1], RH, 3, 4, "차별화 결론", BLUE)

row_label(s, r[2], RH, "3", "실행 전략", GRAY_M)
bar(s, r[2], RH, 0, 1, "포트폴리오", GRAY_M)
bar(s, r[2], RH, 1, 2, "협력 구조", GRAY_M)
bar(s, r[2], RH, 2, 3, "조직·체계안", GRAY_M)
bar(s, r[2], RH, 3, 4, "준비안 확정", GRAY_M)

row_label(s, r[3], RH, "4", "보고", BLUE_T1)
bar(s, r[3], RH, 4, 5, "보고서 v1.2", BLUE_T1)
bar(s, r[3], RH, 5, 8, "발표자료 준비 · 리허설", BLUE_T1)

interview_marker(s, RY0, r[3], rows_end + 0.10)

legend(s, rows_end + 0.72, [
    (SLATE, "현실 인식 · 인터뷰",
     ["사내 FDP 기술·고객 관계의 현재 위치", "산출물: 현황 대장 + 갭 표"], False),
    (BLUE, "AI 워크로드 · 조사·기술검토",
     ["FDP가 AI 워크로드에 통하는가, 얼마나 어려운가", "산출물: 효과·난이도 판정표 + 기술 숙제"], False),
    (GRAY_M, "실행 전략 · 전략구상",
     ["고객 접근 방법과 개발실 준비", "산출물: 고객 플레이북 + 개발실 준비안"], False),
    (BLUE_T1, "보고 · 수렴",
     ["10월 초 보고서 v1.2로 수렴", "10/12부터 발표자료 준비"], False),
])
footer(s, "출처: 삼성 SSD 전략적 방향성 보고서 v1.1 부록 D", 1)
notes(s, "남은 기간 중 발표자료 준비를 빼면 검토에 쓸 수 있는 시간은 4주입니다. 세 검토 축은 "
         "현실 인식(인터뷰), AI 워크로드(조사·기술검토), 실행 전략(전략구상)이며, 9월 말 담당임원 "
         "인터뷰 한 번을 분기점으로 앞 3주는 조사·설계, 마지막 주는 확정·결론에 씁니다. 산출물은 "
         "10월 초 보고서 v1.2로 수렴하고 10/12부터 발표자료 준비에 들어갑니다.")

# =====================================================================
# 슬라이드 2 · 4대 전략 향후 계획 종합
# =====================================================================
s = prs.slides.add_slide(BLANK)
header(s, "삼성 SSD 전략적 방향성 · 향후 계획 종합 (4대 전략)",
       "네 전략 모두 10월 초 검토를 마치고 발표자료로 수렴합니다",
       "전략 1·2·4는 담당별 작성 예정. 전략 3 FDP는 세 검토 축을 4주에 배치했습니다")

RH = 0.84
rows_end = grid(s, 4, RH)
r = [RY0 + i * RH for i in range(4)]

for i, name in [(0, "전략 1"), (1, "전략 2"), (3, "전략 4")]:
    row_label(s, r[i], RH, str(i + 1), name, GRAY_L, muted=True)
    bar(s, r[i], RH, 0, 5, "[담당별 계획 작성 예정]", None, txt=GRAY_L, dash=True)

row_label(s, r[2], RH, "3", "FDP 플랫폼", BLUE)
bar(s, r[2], RH, 0, 1, "설계", BLUE)
bar(s, r[2], RH, 1, 3, "조사 · 제안 구조 · 준비안", BLUE)
bar(s, r[2], RH, 3, 4, "확정 · 결론", BLUE)
bar(s, r[2], RH, 4, 5, "보고서 v1.2", BLUE_T1)

interview_marker(s, RY0, rows_end, rows_end + 0.10)

legend(s, rows_end + 0.72, [
    (GRAY_L, "전략 1 · [전략명]", ["[문제 한 줄 작성 예정]", "[산출물 작성 예정]"], True),
    (GRAY_L, "전략 2 · [전략명]", ["[문제 한 줄 작성 예정]", "[산출물 작성 예정]"], True),
    (BLUE, "전략 3 · FDP 플랫폼",
     ["자체 SSD 수요를 표준으로 흡수", "산출물: 현황 갭 표 · 판정표 · 플레이북"], False),
    (GRAY_L, "전략 4 · [전략명]", ["[문제 한 줄 작성 예정]", "[산출물 작성 예정]"], True),
])
footer(s, "출처: 삼성 SSD 전략적 방향성 보고서 v1.1 부록 D", 2)
notes(s, "네 전략의 향후 계획을 한 장에 모은 종합 슬라이드입니다. 전략 1·2·4는 담당별로 같은 격자에 "
         "막대를 채워 넣고, 전략 3 FDP는 설계·조사·확정·보고 네 단계로 압축했습니다. 9월 말 담당임원 "
         "인터뷰가 분기점이며, 네 전략 모두 10월 초 산출물을 내고 10/12부터 발표자료 준비로 합류합니다.")

prs.save(os.path.abspath(OUT))
print(f"생성 완료: {os.path.abspath(OUT)} ({len(prs.slides._sldIdLst)}장)")
