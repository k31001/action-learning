#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SP-2 다운턴 -- 원인·파급·문제 정의 1장 슬라이드 (v5).

단일 소스: wiki/downturn/samsung-impact.md §5
출력:     outputs/presentation/downturn-scenario-impact.pptx
재생성:   .venv/bin/python outputs/presentation/scripts/generate_downturn_impact_slide.py

v5 (2026-08-25): 수요 막대의 기준 구성을 2025 실측(TrendForce·Yole:
  DRAM $1,657억 중 HBM $340억·NAND $697억 -> 지수 14/56/30)으로 교체.
  공급 두 케이스는 수요 막대 대신 공급 전망 차트(3사 CAPEX 합산 $54->64->95B,
  CXMT 캐파 11->15%E·매출 8->14%E)로. 발표자 노트에 상세 해설 추가.
"""
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import qn

# ── 토큰 ────────────────────────────────────────────────────────────────────
BLUE   = RGBColor(0x14, 0x28, 0xA0)
INK    = RGBColor(0x1A, 0x1A, 0x1A)
GRAY   = RGBColor(0x55, 0x55, 0x55)
G_MID  = RGBColor(0x8A, 0x8A, 0x8E)
G_LINE = RGBColor(0xD9, 0xD9, 0xD9)
G_BG   = RGBColor(0xF6, 0xF6, 0xF7)
WHITE  = RGBColor(0xFF, 0xFF, 0xFF)
T_DEM  = RGBColor(0xE9, 0xED, 0xF8)
T_SUP  = RGBColor(0xF3, 0xF0, 0xE9)
T_SHF  = RGBColor(0xEF, 0xEC, 0xF4)
# 제품 3색 (블루 램프) + 옅은 버전(현재 막대)
P_FULL = [RGBColor(0x14, 0x28, 0xA0), RGBColor(0x5A, 0x73, 0xCC), RGBColor(0xAD, 0xB9, 0xE4)]
P_LITE = [RGBColor(0xC4, 0xCA, 0xE7), RGBColor(0xD8, 0xDE, 0xF1), RGBColor(0xEA, 0xED, 0xF8)]
S_CUR  = RGBColor(0xC9, 0xC9, 0xCC)   # 공급 차트 현재/과거 막대
S_FUT  = RGBColor(0x6B, 0x6B, 0x70)   # 공급 차트 전망 막대

FONT = 'SamsungOneKorean'

def _font(run, size, bold=False, color=INK, name=FONT):
    f = run.font
    f.name, f.size, f.bold = name, Pt(size), bold
    f.color.rgb = color
    rPr = run._r.get_or_add_rPr()
    for tag in ('a:ea', 'a:cs'):
        e = rPr.find(qn(tag))
        if e is None:
            e = rPr.makeelement(qn(tag), {})
            rPr.append(e)
        e.set('typeface', name)

def txt(slide, x, y, w, h, parts, *, size=10, align=PP_ALIGN.LEFT,
        leading=1.12, anchor=MSO_ANCHOR.TOP, wrap=True):
    tb = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = tb.text_frame
    tf.word_wrap = wrap
    tf.vertical_anchor = anchor
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = Emu(0)
    if isinstance(parts, str):
        parts = [[(parts, {})]]
    elif parts and isinstance(parts[0], tuple):
        parts = [parts]
    for i, line in enumerate(parts):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        p.line_spacing = leading
        if isinstance(line, str):
            line = [(line, {})]
        for text, kw in line:
            r = p.add_run()
            r.text = text
            _font(r, kw.get('size', size), kw.get('bold', False), kw.get('color', INK))
    return tb

def box(slide, x, y, w, h, *, fill=None, line=None, line_w=0.75, rnd=False,
        radius=0.055, dash=None):
    shp = MSO_SHAPE.ROUNDED_RECTANGLE if rnd else MSO_SHAPE.RECTANGLE
    s = slide.shapes.add_shape(shp, Inches(x), Inches(y), Inches(w), Inches(h))
    if rnd:
        s.adjustments[0] = radius
    s.fill.solid() if fill else s.fill.background()
    if fill:
        s.fill.fore_color.rgb = fill
    if line:
        s.line.color.rgb = line
        s.line.width = Pt(line_w)
        if dash:
            s.line.dash_style = dash
    else:
        s.line.fill.background()
    s.shadow.inherit = False
    return s

def hline(slide, x, y, w, color=G_LINE, weight=0.5):
    ln = slide.shapes.add_connector(1, Inches(x), Inches(y), Inches(x + w), Inches(y))
    ln.line.color.rgb = color
    ln.line.width = Pt(weight)
    ln.shadow.inherit = False

def vline(slide, x, y, h, color=G_LINE, weight=0.5):
    ln = slide.shapes.add_connector(1, Inches(x), Inches(y), Inches(x), Inches(y + h))
    ln.line.color.rgb = color
    ln.line.width = Pt(weight)
    ln.shadow.inherit = False

# ── 데이터 (전부 위키 기인용) ────────────────────────────────────────────────
# 2025 글로벌 메모리 매출 실측: DRAM $1,657억(그중 HBM $340억) + NAND $697억
# = $2,354억 (TrendForce·Yole, wiki/concepts/{hbm-market,memory-market-overview}.md)
# -> 지수 100: HBM 14 · DRAM(HBM 제외) 56 · NAND 30
PRODUCTS = ['HBM', '기타 DRAM', 'NAND·SSD']
BASE_MIX = [14, 56, 30]

SCEN = [
    dict(cause='투자 자금이 끊기는 경우', group=0, chart='demand',
         head='「AI 인프라 자금줄 경색,\n데이터센터 발주 일제히 보류」',
         mk=('전조', 'Meta FCF -91% · Amazon FCF 적자 전환, 4사 CapEx ~$750B의 조달 의존'),
         mix=[7, 42, 24], newseg=0, note=None,
         prob='팔 곳 잃은 HBM4·서버 캐파:\nCIS 전환(공용 80%)인가,\ntake-or-pay 방어인가'),
    dict(cause='필요량이 줄어드는 경우', group=0, chart='demand',
         head='「AI는 호황인데 메모리는\n제자리… 효율화의 역설」',
         mk=('동인', 'KV 캐시 오프로드(H100 동시 사용자 10배) · CXL 풀링 · 모델 경량화'),
         mix=[11, 45, 35], newseg=0, note=None,
         prob='GPU당 HBM 탑재량을 읽을\n지표가 없다: 추적 체계와\neSSD(1위 38.2%) 믹스 이동'),
    dict(cause='CAPEX가 몰리는 경우', group=1, chart='capex',
         head='「신규 팹 동시 가동에 공급\n과잉… 치킨게임 재점화 우려」',
         mk=('공급', 'Micron 아이다호 · SK하이닉스 용인 · 국내 신규 팹, 2028~29 동시 가동(착공 확정)'),
         note='2026E 투자가 2028~29 캐파로',
         prob='범용·NAND 감산 결단의\n30일 규율: 2023년 6개월\n지연의 재발 차단'),
    dict(cause='후발이 파고드는 경우', group=1, chart='cxmt',
         head='「중국산 메모리 범용 시장\n잠식… 가격 하단이 사라졌다」',
         mk=('공급', 'CXMT 캐파 점유 11%→15%E(2028) · HBM3 월 6만장, YMTC Xtacking 본딩'),
         note='하단 점유의 구조적 상승',
         prob='DDR4·LPDDR4 하단 철수\n시점과 전환처(CIS·차량),\nHBM 인증 장벽 사수'),
    dict(cause='제품 정의가 바뀌는 경우', group=2, chart='demand',
         head='「HBM 시대 저무나…\n주문은 차세대 메모리로」',
         mk=('동인', '3D DRAM(4F² VCT) · zHBM · CXL 채택 개시로 표준 HBM 주문 이동'),
         mix=[6, 50, 35], newseg=8, note='수요가 차세대로 이동',
         prob='표준 HBM에서 zHBM·4F²\n3D DRAM으로의 전환기,\n별동대·R&D 하한 사수'),
]

# 공급 차트 데이터 (위키 기인용)
CAPEX3 = [('2024', 54), ('2025', 64), ('2026E', 95)]   # 3사 합산 $B (각사 IR)
CXMT   = [('캐파', 11, 15), ('매출', 8, 14)]            # 점유율 % (현재, 전망E)

GROUPS = [
    (0, 2, T_DEM, [('수요발', True), (' · 수요가 꺼진다', False)]),
    (2, 2, T_SUP, [('공급발', True), (' · 공급이 넘친다', False)]),
    (4, 1, T_SHF, [('전환발', True), (' · 판이 바뀐다', False)]),
]

# ── 슬라이드 ────────────────────────────────────────────────────────────────
prs = Presentation()
prs.slide_width, prs.slide_height = Inches(13.333), Inches(7.5)
slide = prs.slides.add_slide(prs.slide_layouts[6])

MX, MW = 0.47, 12.393

txt(slide, MX, 0.26, MW, 0.38, [[
    ('다운턴의 다섯 갈래:  ', {'bold': True, 'color': BLUE, 'size': 20}),
    ('꺼지는 수요가 둘, 넘치는 공급이 둘, 바뀌는 판이 하나다', {'bold': True, 'size': 20}),
]])
hline(slide, MX, 0.72, MW, BLUE, 1.4)

RAIL_W = 1.10
col_g = 0.12
col_w = (MW - RAIL_W - 4 * col_g) / 5
col_x = [MX + RAIL_W + i * (col_w + col_g) for i in range(5)]

GB_Y, GB_H = 0.86, 0.32
for st, n, tint, label in GROUPS:
    gx = col_x[st]
    gw = n * col_w + (n - 1) * col_g
    box(slide, gx, GB_Y, gw, GB_H, fill=tint, rnd=True, radius=0.13)
    txt(slide, gx, GB_Y + 0.065, gw, 0.2, [[(t, {'bold': b, 'size': 11}) for t, b in label]],
        align=PP_ALIGN.CENTER, leading=1.0)

CH_Y = 1.30
for i, sc in enumerate(SCEN):
    txt(slide, col_x[i], CH_Y, col_w, 0.22, [[(sc['cause'], {'bold': True, 'size': 12.5})]], leading=1.0)

for i in range(1, 5):
    vline(slide, col_x[i] - col_g / 2, 1.28, 4.94)

HL_Y, HL_H = 1.62, 0.64
txt(slide, MX, HL_Y + 0.04, RAIL_W - 0.14, 0.5,
    [[('그날의', {'bold': True, 'color': G_MID, 'size': 10})],
     [('헤드라인', {'bold': True, 'color': G_MID, 'size': 10})],
     [('(가상)', {'color': G_MID, 'size': 10})]],
    align=PP_ALIGN.RIGHT, leading=1.12)
for i, sc in enumerate(SCEN):
    x = col_x[i]
    box(slide, x, HL_Y, col_w, HL_H, fill=WHITE, line=G_LINE, line_w=0.75)
    box(slide, x, HL_Y, col_w, 0.032, fill=INK)
    txt(slide, x + 0.10, HL_Y + 0.09, col_w - 0.20, 0.5,
        [[(ln, {'bold': True, 'size': 10.5})] for ln in sc['head'].split('\n')], leading=1.18)

MK_Y = 2.40
txt(slide, MX, MK_Y + 0.02, RAIL_W - 0.14, 0.4,
    [[('무엇이', {'bold': True, 'color': G_MID, 'size': 10})],
     [('움직이나', {'bold': True, 'color': G_MID, 'size': 10})]],
    align=PP_ALIGN.RIGHT, leading=1.12)
for i, sc in enumerate(SCEN):
    pre, body = sc['mk']
    txt(slide, col_x[i], MK_Y, col_w, 0.62, [[
        (pre + '  ', {'bold': True, 'color': BLUE, 'size': 10}),
        (body, {'size': 10, 'color': INK})]], leading=1.16)

# ── 파급 차트 밴드 ──────────────────────────────────────────────────────────
BAR_LY = 3.00
# 좌측 레일: 수요 막대 범례
txt(slide, MX, BAR_LY, RAIL_W - 0.14, 0.18,
    [[('수요 막대', {'bold': True, 'color': G_MID, 'size': 10})]], align=PP_ALIGN.RIGHT, leading=1.0)
lg_items = list(zip(PRODUCTS, P_FULL)) + [('차세대 이동분', None)]
for li, (name, c) in enumerate(lg_items):
    ly = BAR_LY + 0.26 + li * 0.215
    if c is not None:
        box(slide, MX + 0.02, ly + 0.015, 0.11, 0.11, fill=c)
    else:
        box(slide, MX + 0.02, ly + 0.015, 0.11, 0.11, fill=WHITE, line=G_MID, line_w=0.8, dash=2)
    txt(slide, MX + 0.19, ly, RAIL_W - 0.20, 0.16, [[(name, {'color': GRAY, 'size': 10})]],
        leading=1.0, wrap=False)
txt(slide, MX, BAR_LY + 1.30, RAIL_W - 0.14, 0.34,
    [[('2025 구성', {'color': G_MID, 'size': 10})], [('= 100 기준', {'color': G_MID, 'size': 10})]],
    align=PP_ALIGN.RIGHT, leading=1.15)

# 컬럼별 차트 소제목
CHART_TITLE = {'demand': '제품 수요 (2025=100)', 'capex': '3사 CAPEX 합산 ($B)', 'cxmt': 'CXMT 점유율 (%)'}
for i, sc in enumerate(SCEN):
    txt(slide, col_x[i], BAR_LY, col_w, 0.16,
        [[(CHART_TITLE[sc['chart']], {'bold': True, 'color': G_MID, 'size': 10})]],
        align=PP_ALIGN.CENTER, leading=1.0)

BASE_Y = 4.78
DSCALE = 0.0128    # 수요 지수 1 -> in

for i, sc in enumerate(SCEN):
    x = col_x[i]
    hline(slide, x + 0.10, BASE_Y, col_w - 0.20, G_LINE, 0.9)

    if sc['chart'] == 'demand':
        bw, bgap = 0.40, 0.14
        pair_x = x + (col_w - (2 * bw + bgap)) / 2
        yy = BASE_Y
        for v, c in zip(BASE_MIX, P_LITE):
            h = v * DSCALE
            box(slide, pair_x, yy - h, bw, h, fill=c)
            yy -= h
        txt(slide, pair_x - 0.1, BASE_Y - 100 * DSCALE - 0.21, bw + 0.2, 0.16,
            [[('100', {'bold': True, 'color': G_MID, 'size': 10})]], align=PP_ALIGN.CENTER, leading=1.0)
        sx = pair_x + bw + bgap
        yy = BASE_Y
        tot = sum(sc['mix'])
        for v, c in zip(sc['mix'], P_FULL):
            h = v * DSCALE
            box(slide, sx, yy - h, bw, h, fill=c)
            yy -= h
        if sc['newseg']:
            h = sc['newseg'] * DSCALE
            box(slide, sx, yy - h, bw, h, fill=WHITE, line=G_MID, line_w=0.9, dash=2)
            yy -= h
            tot += sc['newseg']
        txt(slide, sx - 0.1, yy - 0.21, bw + 0.2, 0.16,
            [[(str(tot), {'bold': True, 'color': BLUE, 'size': 10.5})]], align=PP_ALIGN.CENTER, leading=1.0)
        txt(slide, pair_x - 0.08, BASE_Y + 0.05, bw + 0.16, 0.14,
            [[('2025', {'color': G_MID, 'size': 10})]], align=PP_ALIGN.CENTER, leading=1.0)
        txt(slide, sx - 0.08, BASE_Y + 0.05, bw + 0.16, 0.14,
            [[('시나리오', {'color': G_MID, 'size': 10})]], align=PP_ALIGN.CENTER, leading=1.0)

    elif sc['chart'] == 'capex':
        # 3사 CAPEX 합산: 2024 $54B -> 2025 $64B -> 2026E $95B (각사 IR)
        bw, bgap = 0.36, 0.22
        total_w = 3 * bw + 2 * bgap
        bx0 = x + (col_w - total_w) / 2
        CSCALE = 1.30 / 95
        for bi, (label, v) in enumerate(CAPEX3):
            bx = bx0 + bi * (bw + bgap)
            h = v * CSCALE
            box(slide, bx, BASE_Y - h, bw, h, fill=(S_FUT if 'E' in label else S_CUR))
            txt(slide, bx - 0.1, BASE_Y - h - 0.21, bw + 0.2, 0.16,
                [[(str(v), {'bold': True, 'color': (INK if 'E' in label else G_MID), 'size': 10})]],
                align=PP_ALIGN.CENTER, leading=1.0)
            txt(slide, bx - 0.12, BASE_Y + 0.05, bw + 0.24, 0.14,
                [[(label, {'color': G_MID, 'size': 10})]], align=PP_ALIGN.CENTER, leading=1.0)

    elif sc['chart'] == 'cxmt':
        # CXMT 점유: 캐파 11 -> 15E(2028), 매출 8 -> 14E(2027)
        bw, bgap, ggap = 0.34, 0.10, 0.36
        total_w = 4 * bw + 2 * bgap + ggap
        bx0 = x + (col_w - total_w) / 2
        XSCALE = 1.15 / 15
        for gi, (label, cur, fut) in enumerate(CXMT):
            gx0 = bx0 + gi * (2 * bw + bgap + ggap)
            for bi, (v, col, lab) in enumerate([(cur, S_CUR, str(cur)), (fut, S_FUT, f'{fut}E')]):
                bx = gx0 + bi * (bw + bgap)
                h = v * XSCALE
                box(slide, bx, BASE_Y - h, bw, h, fill=col)
                txt(slide, bx - 0.12, BASE_Y - h - 0.21, bw + 0.24, 0.16,
                    [[(lab, {'bold': True, 'color': (INK if bi else G_MID), 'size': 10})]],
                    align=PP_ALIGN.CENTER, leading=1.0)
            txt(slide, gx0 - 0.06, BASE_Y + 0.05, 2 * bw + bgap + 0.12, 0.14,
                [[(label, {'color': G_MID, 'size': 10})]], align=PP_ALIGN.CENTER, leading=1.0)

    if sc['note']:
        txt(slide, x, BASE_Y + 0.235, col_w, 0.15, [[(sc['note'], {'bold': True, 'color': GRAY, 'size': 10})]],
            align=PP_ALIGN.CENTER, leading=1.0)

# 풀어야 할 문제
PB_Y = 5.34
txt(slide, MX, PB_Y + 0.05, RAIL_W - 0.14, 0.4,
    [[('풀어야 할', {'bold': True, 'color': G_MID, 'size': 10})],
     [('문제', {'bold': True, 'color': G_MID, 'size': 10})]],
    align=PP_ALIGN.RIGHT, leading=1.12)
for i, sc in enumerate(SCEN):
    x = col_x[i]
    box(slide, x, PB_Y + 0.02, 0.035, 0.52, fill=BLUE)
    txt(slide, x + 0.12, PB_Y + 0.03, col_w - 0.12, 0.55,
        [[(ln, {'bold': True, 'size': 10.5})] for ln in sc['prob'].split('\n')], leading=1.18)

BY = 6.18
box(slide, MX, BY, MW, 0.34, fill=G_BG, rnd=True, radius=0.10)
txt(slide, MX + 0.16, BY + 0.075, MW - 0.32, 0.2, [[
    ('종합  ', {'bold': True, 'color': BLUE, 'size': 10.5}),
    ('수요발은 수요 막대가 줄고, 공급발은 수요가 그대로인 채 공급 곡선이 커진다.  ', {'size': 10.5}),
    ('원인이 다르면 풀어야 할 문제도 다르다.', {'bold': True, 'size': 10.5}),
]], leading=1.0)

txt(slide, MX, BY + 0.46, MW - 1.65, 0.34, [[
    ('수요 막대 기준: 2025 글로벌 메모리 매출 실측 구성(DRAM $1,657억 중 HBM $340억 · NAND $697억, TrendForce·Yole)=100, 시나리오 막대는 방향 가정 적용 · '
     '공급 차트: 3사 CAPEX 합산(각사 IR)·CXMT 점유(TrendForce·FT) · 헤드라인은 가상 예시 · 대응 전략은 별도 장 · 기준일 2026-08',
     {'color': GRAY, 'size': 9})]], leading=1.25)
txt(slide, MX + MW - 1.5, BY + 0.46, 1.5, 0.18, [[('[문서등급 표기]', {'color': GRAY, 'size': 9})]],
    align=PP_ALIGN.RIGHT, leading=1.0)

# ── 발표자 노트 ─────────────────────────────────────────────────────────────
NOTES = """[슬라이드 위치] SP-2 다운턴 시나리오 플래닝 트랙의 영향 진단 장. 앞 장들이 "다운턴이 오는가"(EWI)와 "다섯 시나리오가 무엇인가"를 다뤘다면, 이 장은 원인 기준으로 다섯 갈래를 한눈에 정리하고 각 갈래가 남기는 "풀어야 할 문제"까지 연결한다. 대응 전략(DP-1~7 대비, DR-1~6 대응)은 다음 장에서 다룬다.

[왜 원인 중심인가] 다운턴 기간은 원인이 정한다는 패턴이 지난 20년 복기(DT08·DT12·DT16·DT19·DT23)에서 확인됐다. 수요발은 짧고 깊게(단기전), 공급발은 길게(장기전) 간다. 그래서 속도·기간 축은 이 장에서 제외했고, 원인만 맞히면 싸움의 성격이 따라온다. 시나리오 코드(DT-A 등)와 확률 수치도 발표 층에서는 제외했다. 확률은 추정 정밀도가 낮아 정성 판단만 남겼고, 정량 추정 근거는 wiki/downturn/scenario-matrix.md에 유지되어 있다.

[다섯 갈래 해설]
1. 투자 자금이 끊기는 경우(수요발·조달): 최종 수요가 아니라 돈이 먼저 끊기는 경로. 이미 전조가 실측됐다. Meta의 분기 FCF가 -91%(약 $7.8억까지 축소), Amazon은 TTM FCF가 적자로 전환했는데 4사 합산 CapEx는 ~$750B(+82% YoY)로 계속 늘고 있다. 지출과 현금창출의 방향이 갈라진 상태는 지속 기간에 한계가 있고, 신용 이벤트(네오클라우드·DC SPV 디폴트) 하나로 발주 동결이 시작될 수 있다. 이때 가장 먼저 비는 곳은 가장 많이 투자한 고부가(HBM·서버) 캐파다.
2. 필요량이 줄어드는 경우(수요발·원단위): AI는 성장하는데 작업당 메모리 소요가 꺾이는 경로. NVIDIA Dynamo 계열 KV 캐시 오프로드는 같은 H100으로 동시 사용자를 10배로 늘렸다. 같은 하드웨어로 10배를 처리한다는 것은 10배를 사지 않아도 된다는 뜻이기도 하다. CXL 풀링·모델 경량화도 같은 방향. 가격 폭락 없이 성장률만 꺾여서 위기감이 생기지 않는 것이 최대 위험이며, NAND·SSD는 오프로드 수혜로 오히려 수요가 는다(막대에서 유일하게 커지는 세그먼트).
3. CAPEX가 몰리는 경우(공급발·기존 3사): 수요는 멀쩡한데 호황기에 결정된 투자가 한꺼번에 캐파로 도착하는 경로. 차트의 3사 CAPEX 합산이 2024 $54B, 2025 $64B, 2026E $95B로 가파르게 서 있고, 투자가 캐파로 바뀌는 리드타임 2~3년을 감안하면 2028~29에 Micron 아이다호, SK하이닉스 용인 1기, 국내 신규 팹이 동시에 가동된다(모두 착공이 끝난 확정 사실). 여기에 3강 절제가 무너지면(점유율 목표 선언, 조기 램프업) 급락으로 전환된다. 다섯 갈래 중 감산이 직접 효과를 내는 유일한 경우다.
4. 후발이 파고드는 경우(공급발·신흥): 보조금 기반 후발이 하단 가격대를 영구히 끌어내리는 경로. CXMT는 글로벌 DRAM 캐파 점유 11%에서 2028년 15%로, 매출 점유는 8%(2025 Q3)에서 14%(2027E)로 오르는 전망이고 HBM3도 월 6만 장 양산에 들어간다. NAND에서는 YMTC가 Xtacking 하이브리드 본딩으로 같은 일을 한다. 손실이 나도 퇴출되지 않는 공급자라서 치킨게임(소모전)의 승리 조건 자체가 없고, 다른 갈래와 달리 회복이 없다. 지금도 진행 중인 유일한 갈래다.
5. 제품 정의가 바뀌는 경우(전환발): 수요가 사라지는 게 아니라 다른 제품군으로 이동하는 경로. 3D DRAM(4F² VCT 셀), zHBM(커스텀 적층), CXL 채택이 시작되면 표준 HBM 주문이 옮겨간다. 막대 꼭대기의 점선 세그먼트가 그 이동분이다. 감산도 계약 방어도 무의미하고, 미리 그 자리에 가 있는 것(별동대)만 유효하다.

[수요 막대 읽는 법] 왼쪽 옅은 막대는 2025 글로벌 메모리 매출의 실측 구성을 100으로 지수화한 것이다. DRAM $1,657억(그중 HBM $340억) + NAND $697억 = $2,354억(TrendForce·Yole) 이므로 HBM 14, HBM 제외 DRAM 56, NAND·SSD 30. 오른쪽 진한 막대는 각 시나리오의 방향 가정(wiki/downturn/samsung-impact.md §5.3)을 이 실측 구성에 적용한 시나리오 값이다. 기준은 실측, 변화 폭은 시나리오 가정이라는 점을 구분해서 설명할 것. 서버/범용 DRAM 분리 실측치는 공개 소스에 없어 DRAM은 한 세그먼트로 묶었다.

[공급 차트 읽는 법] CAPEX가 몰리는 경우는 수요 막대가 무의미하다(수요는 그대로). 대신 공급의 선행 지표인 3사 CAPEX 합산을 보여준다. 후발의 경우도 마찬가지로 CXMT의 캐파·매출 점유 전망을 보여준다. 두 차트 모두 "수요가 아니라 공급 쪽 곡선이 커진다"는 것이 메시지다.

[풀어야 할 문제] 전략 자체가 아니라 전략이 풀어야 할 문제를 정의한 것이다(전략은 다음 장). 1번: HBM4 캐파는 +50% 증설이 잡혀 있는데 조달이 끊기면 팔 곳이 없다. DRAM-CIS 설비 공용률 80%인 전환 옵션과 take-or-pay·NTB 계약 방어선 중 무엇을 어디까지 쓸 것인가. 2번: GPU당 HBM 탑재량 같은 원단위 지표가 현재 추적 체계에 없다(감별 지표 DX-8 미구축). enterprise SSD 1위(점유 38.2%)를 활용한 믹스 이동이 유일한 상방. 3번: 2022-10 무감산 선언에서 2023-04 감산 공식화까지 6개월이 걸렸고 그 사이 DS 적자 -4.58조가 쌓였다. 같은 지연을 막을 30일 결정 규율이 문제. 4번: DDR4·LPDDR4 하단은 CXMT 침투로 돌아오지 않는다. 철수 시점과 라인 전환처(CIS·차량용), 그리고 HBM 인증 장벽 유지가 문제. 5번: 2019년 HBM팀 해체가 점유 40%에서 17%로의 추락으로 이어진 전례가 있다. 전환기에 별동대와 R&D 하한을 배분 논리에서 지켜내는 것이 문제.

[출처] wiki/downturn/samsung-impact.md §5(단일 소스), scenario-matrix.md, downturn-history.md, key-drivers.md. 수치 원출처: hyperscaler-q2-2026-actuals(FCF·CapEx), kv-cache-ssd-offload(10배), memory-capex-history(3사 CAPEX), apple-cxmt-china-dram·TrendForce(CXMT), enterprise-ssd-market-1q26(38.2%), fab-toolset-commonality(공용률 80%), samsung-downturn-actions(2023 감산 지연). 헤드라인은 상황 이해를 돕는 가상 예시 문장으로 실제 보도가 아니다."""
slide.notes_slide.notes_text_frame.text = NOTES

OUT = 'outputs/presentation/downturn-scenario-impact.pptx'
prs.save(OUT)
print('saved:', OUT)
