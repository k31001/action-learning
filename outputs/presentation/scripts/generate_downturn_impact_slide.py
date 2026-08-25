#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SP-2 다운턴 시나리오별 삼성 메모리 영향 진단 -- 1장 슬라이드 생성.

단일 소스: wiki/downturn/samsung-impact.md (모든 문구·판정은 그 페이지에서 추출)
출력:     outputs/presentation/downturn-scenario-impact.pptx
재생성:   .venv/bin/python outputs/presentation/scripts/generate_downturn_impact_slide.py

디자인 규율: samsung-memory-ppt-design-skill
  - 화이트 배경 + Samsung Blue(#1428A0) 단일 액센트, 적/녹은 의미 전달에만
  - 슬라이드 문구에 em-dash 금지, 각주 외 10pt 미만 금지, 액션 타이틀
  - 확률·전략 코드(DP/DR) 미표기 (진단 층의 역할 경계)
"""
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import qn
import copy

# ── 디자인 토큰 ──────────────────────────────────────────────────────────────
BLUE   = RGBColor(0x14, 0x28, 0xA0)   # samsung blue (유일 액센트)
BLUE_T = RGBColor(0x3C, 0x5A, 0xC8)
BAND   = RGBColor(0xEE, 0xF1, 0xFA)   # blue tint band
INK    = RGBColor(0x1A, 0x1A, 0x1A)   # 순수 검정 금지
GRAY   = RGBColor(0x55, 0x55, 0x55)
G_LINE = RGBColor(0xD9, 0xD9, 0xD9)
G_BG   = RGBColor(0xF7, 0xF8, 0xFA)
WHITE  = RGBColor(0xFF, 0xFF, 0xFF)
RED    = RGBColor(0xD9, 0x30, 0x25)   # 리스크 의미 전달 전용
RED_T  = RGBColor(0xE8, 0x9B, 0x94)
GREEN  = RGBColor(0x00, 0xA6, 0x51)   # 방어·수혜 의미 전달 전용

FONT = 'SamsungOneKorean'  # 미설치 환경은 시스템 국문 폰트로 자동 대체

def _font(run, size, bold=False, color=INK, name=FONT):
    f = run.font
    f.name, f.size, f.bold = name, Pt(size), bold
    f.color.rgb = color
    # 국문 글리프에도 같은 서체가 걸리도록 ea/cs 타입페이스 지정
    rPr = run._r.get_or_add_rPr()
    for tag in ('a:ea', 'a:cs'):
        e = rPr.find(qn(tag))
        if e is None:
            e = rPr.makeelement(qn(tag), {})
            rPr.append(e)
        e.set('typeface', name)

def txt(slide, x, y, w, h, parts, *, size=10, align=PP_ALIGN.LEFT,
        leading=1.12, anchor=MSO_ANCHOR.TOP, wrap=True):
    """parts: str | [(text, {bold,color,size}), ...] | [줄1, 줄2, ...]"""
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
            _font(r, kw.get('size', size), kw.get('bold', False),
                  kw.get('color', INK))
    return tb

def box(slide, x, y, w, h, *, fill=None, line=None, line_w=0.75, rnd=False,
        radius=0.055):
    shp_type = MSO_SHAPE.ROUNDED_RECTANGLE if rnd else MSO_SHAPE.RECTANGLE
    s = slide.shapes.add_shape(shp_type, Inches(x), Inches(y), Inches(w), Inches(h))
    if rnd:
        s.adjustments[0] = radius
    s.fill.solid() if fill else s.fill.background()
    if fill:
        s.fill.fore_color.rgb = fill
    if line:
        s.line.color.rgb = line
        s.line.width = Pt(line_w)
    else:
        s.line.fill.background()
    s.shadow.inherit = False
    return s

def hline(slide, x, y, w, color=G_LINE, weight=0.5):
    ln = slide.shapes.add_connector(1, Inches(x), Inches(y), Inches(x + w), Inches(y))
    ln.line.color.rgb = color
    ln.line.width = Pt(weight)
    ln.shadow.inherit = False

# ── 콘텐츠 (wiki/downturn/samsung-impact.md 추출) ───────────────────────────
SW_CHIPS = [
    ('S1', '재무 요새',   '역사이클 집행력',        True),
    ('S2', '풀라인업',    'DRAM·NAND·SSD 폭',       True),
    ('S3', 'IDM 결합',    '라인 전환 옵션',          True),
    ('S4', '세대 선행',   '전환 이력·감가 설비',     True),
    ('W1', '인증 열위',   'HBM 급감·후순위',         False),
    ('W2', '원가 열위',   '1c 수율 추격',            False),
    ('W3', '판단 지연',   '신호→행동 배선 부재',     False),
    ('W4', '커밋 관성',   '확정 투자·니치 배제',     False),
]

LV = {  # 노출 등급: (사각형 색, 단어, 단어 색)
    '직격': (RED,    '직격', RED),
    '압박': (RED_T,  '압박', RGBColor(0xB4, 0x4A, 0x40)),
    '제한': (G_LINE, '제한', GRAY),
    '방어': (GREEN,  '방어', GREEN),
    '수혜': (GREEN,  '수혜', GREEN),
}

SCEN = [
    dict(code='DT-A', name='급제동', typ='수요발 × 급락',
         exp=[('HBM', '직격'), ('서버 DRAM', '직격'), ('범용·레거시', '제한'), ('NAND·SSD', '압박')],
         pivot='대응할 시간이 없다. 도착 시점에 갖춰진 계약의 질·현금·판단 배선이 결과를 결정한다',
         w=('W3·W1', '판단 지연이 분기 손실로 직결, 고부가 캐파 공동화. 판단을 사전 합의된 신호에 위임해 둘 것'),
         s=('S1·S2', '체력 발화가 최대인 국면. 버티기가 아니라 바닥 매수의 선택권으로 쓰고, 소비자 축이 완충'),
         areas=['계약 만기 구조', '조달·FCF 신호 감시', '재무 여력 운용']),
    dict(code='DT-B', name='긴 하산', typ='수요발 × 침식',
         exp=[('HBM', '압박'), ('서버 DRAM', '압박'), ('범용·레거시', '압박'), ('NAND·SSD', '수혜')],
         pivot='위기감이 생기지 않아 결정이 밀린다. 행동보다 판단 기준 자체가 승부처다',
         w=('W3', '"일시적" 해석 관성이 가장 깊게 찔린다. 판단 기준을 가격에서 원가 곡선 위치로 교체할 것'),
         s=('S2', '스토리지가 유일한 상방 축(eSSD 1위 38.2%). 믹스를 하강 축에서 성장 축으로 계속 이동'),
         areas=['메모리 원단위 추적', '원가 곡선 백분위', '스토리지·SSD 축']),
    dict(code='DT-C', name='동시 방류', typ='공급발 × 급락',
         exp=[('HBM', '제한'), ('서버 DRAM', '압박'), ('범용·레거시', '직격'), ('NAND·SSD', '직격')],
         pivot='공급 조절이 직접 작동하는 유일한 판. 성패는 조절 여부가 아니라 조절의 속도다',
         w=('W3·W4', '감산 6개월 지연과 맞불 증설 관성. 조절 결정의 기준과 기한을 사전에 못박아 둘 것'),
         s=('S4·S1', '세대 선행·감가 완료 설비가 바닥 가격을 버틴다. 소모전이 아니라 규율 선도의 여유로 쓸 것'),
         areas=['재고·투입 갭 감시', '원가 리더십', '규율 집행 속도']),
    dict(code='DT-D', name='저가 잠식', typ='공급발 × 침식',
         exp=[('HBM', '방어'), ('서버 DRAM', '제한'), ('범용·레거시', '직격'), ('NAND·SSD', '직격')],
         pivot='하단 가격은 돌아오지 않는다. 버티기가 아니라 옮기기의 문제다',
         w=('W2·W4', '보조금 상대 체력전은 무효, 철수 결정은 지연된다. 원가 좌표를 CXMT 포함 4자 곡선으로 재설정'),
         s=('S3', '전환 옵션 가치가 최대. 침식층을 지키지 말고 같은 라인으로 다른 것을 만드는 몸이 방어선'),
         areas=['철수·전환 판단 체계', '4자 원가 곡선', '인증 장벽 동향']),
    dict(code='DT-E', name='판 갈이', typ='전환발 · 와일드카드',
         exp=[('HBM', '직격'), ('서버 DRAM', '압박'), ('범용·레거시', '제한'), ('NAND·SSD', '수혜')],
         pivot='감산·계약·원가가 모두 무효. 판이 바뀔 때 유효한 것은 미리 그 자리에 있던 것뿐이다',
         w=('W4·W1', '니치 배제 논리의 재발이 최악 경로. 차세대 조직·예산을 주력 배분에서 분리해 보존할 것'),
         s=('S3·S4', '로직+메모리+본딩 결합은 판 전환기의 최고 희소 자산. 새 판의 표준 선점에 투입할 것'),
         areas=['차세대 진척 마일스톤', '커스텀 대응 체계', '조직 경계 설계']),
]

# ── 슬라이드 구성 ────────────────────────────────────────────────────────────
prs = Presentation()
prs.slide_width, prs.slide_height = Inches(13.333), Inches(7.5)
slide = prs.slides.add_slide(prs.slide_layouts[6])  # blank

MX, MW = 0.47, 12.393   # 좌우 마진·본문 폭

# 타이틀 (액션 타이틀) + 리드
txt(slide, MX, 0.26, MW, 0.38, [[
    ('시나리오별 영향 진단: ', {'bold': True, 'color': BLUE, 'size': 20}),
    ('발화하는 강점은 유형마다 다르나, 찔리는 약점은 판단 지연으로 수렴한다', {'bold': True, 'size': 20}),
]])
txt(slide, MX, 0.68, MW, 0.22,
    'SP-2 다운턴 5개 시나리오의 삼성 메모리 노출 진단. 강점(S)·약점(W) 코드 기준의 승부처와 보완·활용 힌트까지만 담았다. 대응 전략은 별도 장에서 다루며, 확률은 표기하지 않는다.',
    size=10.5, leading=1.0)
hline(slide, MX, 0.97, MW, BLUE, 1.6)

# S/W 코드 밴드 (8칩 1행)
chip_w, chip_g = 1.474, 0.086
for i, (code, name, ev, is_s) in enumerate(SW_CHIPS):
    cx = MX + i * (chip_w + chip_g)
    accent = BLUE if is_s else RED
    box(slide, cx, 1.07, chip_w, 0.54, fill=(G_BG if not is_s else BAND),
        line=G_LINE, line_w=0.5, rnd=True, radius=0.09)
    txt(slide, cx + 0.09, 1.13, chip_w - 0.16, 0.18, [[
        (code + ' ', {'bold': True, 'color': accent, 'size': 10}),
        (name, {'bold': True, 'size': 10}),
    ]], leading=1.0)
    txt(slide, cx + 0.09, 1.335, chip_w - 0.16, 0.18, [[(ev, {'color': GRAY, 'size': 10})]],
        leading=1.0, wrap=False)

# 노출 범례 (우측 정렬)
lg = [('노출  ', GRAY)] + [(f'■ {k}  ', v[2] if k != '제한' else GRAY) for k, v in
                            [('직격', LV['직격']), ('압박', LV['압박']), ('제한', LV['제한'])]] + \
     [('■ 방어·수혜', GREEN)]
txt(slide, MX + MW - 4.6, 1.70, 4.6, 0.18,
    [[(t, {'color': c, 'size': 10}) for t, c in lg]], align=PP_ALIGN.RIGHT, leading=1.0)
txt(slide, MX, 1.70, 7.4, 0.18,
    [[('시나리오 진단  ', {'bold': True, 'color': GRAY, 'size': 10}),
      ('제품 노출 · 무엇이 갈리나 · 찔리는 곳(W)과 보완 · 살리는 곳(S)과 활용 · 전략적 중요 분야', {'color': GRAY, 'size': 10})]],
    leading=1.0)

# 시나리오 5컬럼
TOP, COLH = 1.95, 4.62
col_w, col_g = 2.394, 0.106
for ci, sc in enumerate(SCEN):
    x = MX + ci * (col_w + col_g)
    box(slide, x, TOP, col_w, COLH, fill=WHITE, line=G_LINE, line_w=0.6, rnd=True, radius=0.028)
    box(slide, x, TOP, col_w, 0.045, fill=BLUE)  # 상단 블루 룰
    pad, tw = 0.10, col_w - 0.20
    tx = x + pad
    # 헤더
    txt(slide, tx, TOP + 0.10, tw, 0.20, [[
        (sc['code'] + '  ', {'bold': True, 'color': BLUE, 'size': 12.5}),
        (sc['name'], {'bold': True, 'size': 12.5})]], leading=1.0)
    txt(slide, tx, TOP + 0.335, tw, 0.16, [[(sc['typ'], {'color': GRAY, 'size': 10})]], leading=1.0)
    hline(slide, tx, TOP + 0.545, tw)
    # 제품 노출 스트립
    for ri, (prod, lv) in enumerate(sc['exp']):
        ry = TOP + 0.615 + ri * 0.168
        sq_color, word, word_color = LV[lv]
        txt(slide, tx, ry, 1.18, 0.15, [[(prod, {'color': GRAY, 'size': 10})]], leading=1.0, wrap=False)
        box(slide, tx + 1.42, ry + 0.017, 0.115, 0.115, fill=sq_color)
        txt(slide, tx + 1.60, ry, 0.62, 0.15, [[(word, {'bold': True, 'color': word_color, 'size': 10})]],
            leading=1.0, wrap=False)
    yy = TOP + 0.615 + 4 * 0.168 + 0.055
    hline(slide, tx, yy, tw)
    # 무엇이 갈리나
    txt(slide, tx, yy + 0.06, tw, 0.16, [[('무엇이 갈리나', {'bold': True, 'color': BLUE, 'size': 10})]], leading=1.0)
    txt(slide, tx, yy + 0.235, tw, 0.50, [[(sc['pivot'], {'size': 10})]], leading=1.06)
    y2 = yy + 0.80
    # 찔리는 곳 (W)
    txt(slide, tx, y2, tw, 0.16, [[
        ('찔리는 곳 ', {'bold': True, 'color': RED, 'size': 10}),
        (sc['w'][0], {'bold': True, 'color': RED, 'size': 10})]], leading=1.0)
    txt(slide, tx, y2 + 0.175, tw, 0.50, [[(sc['w'][1], {'size': 10})]], leading=1.06)
    y3 = y2 + 0.745
    # 살리는 곳 (S)
    txt(slide, tx, y3, tw, 0.16, [[
        ('살리는 곳 ', {'bold': True, 'color': BLUE, 'size': 10}),
        (sc['s'][0], {'bold': True, 'color': BLUE, 'size': 10})]], leading=1.0)
    txt(slide, tx, y3 + 0.175, tw, 0.50, [[(sc['s'][1], {'size': 10})]], leading=1.06)
    y4 = y3 + 0.745
    # 전략적 중요 분야
    txt(slide, tx, y4, tw, 0.16, [[('전략적 중요 분야', {'bold': True, 'color': GRAY, 'size': 10})]], leading=1.0)
    for ai, area in enumerate(sc['areas']):
        ay = y4 + 0.185 + ai * 0.225
        box(slide, tx, ay, tw, 0.19, fill=G_BG, line=G_LINE, line_w=0.4, rnd=True, radius=0.16)
        txt(slide, tx + 0.07, ay + 0.022, tw - 0.14, 0.15, [[(area, {'color': INK, 'size': 10})]],
            leading=1.0, align=PP_ALIGN.CENTER)

# 종합 통찰 밴드
BY = TOP + COLH + 0.09
box(slide, MX, BY, MW, 0.50, fill=BAND, rnd=True, radius=0.07)
txt(slide, MX + 0.14, BY + 0.07, MW - 0.28, 0.38, [[
    ('종합  ', {'bold': True, 'color': BLUE, 'size': 10.5}),
    ('약점은 W3(판단 지연)로 수렴하고(A·B·C·D 공통 노출), 강점의 발화는 갈린다(급락형 S1 체력, 침식형 S3 전환력, 공급발 S4 선행, 수요발 침식 S2 폭). ',
     {'size': 10.5}),
    ('어떤 강점을 살릴지는 어떤 다운턴인지의 감별이 정한다.', {'bold': True, 'size': 10.5}),
]], leading=1.15)

# 각주
txt(slide, MX, BY + 0.58, MW - 1.6, 0.18, [[
    ('출처: wiki/downturn/samsung-impact.md (S/W 근거 인용 상세) · 노출 등급은 wiki/downturn/scenario-DT-A~E.md 정성 판정 · 기준일 2026-08',
     {'color': GRAY, 'size': 9})]], leading=1.0)
txt(slide, MX + MW - 1.5, BY + 0.58, 1.5, 0.18, [[('[문서등급 표기]', {'color': GRAY, 'size': 9})]],
    align=PP_ALIGN.RIGHT, leading=1.0)

OUT = 'outputs/presentation/downturn-scenario-impact.pptx'
prs.save(OUT)
print('saved:', OUT)
