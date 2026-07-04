"""
개발실 체질 전환 발표자료 — 3슬라이드 · Apple HIG 디자인 시스템 · 컴팩트

빌드 원천 — `outputs/presentation/dev-transformation-outline.md`
  슬라이드 1  왜 지금인가   — LTA→SCA 사건 + 신문섭 북극성 명제 + 계약 3단 진화 + Micron 4요소
  슬라이드 2  무엇을        — As-Is→To-Be 역할 전환 + Palantir FDE 벤치마크 + 리스크↔이점
  슬라이드 3  어떻게        — 4대 축 + 3-Phase 로드맵 + KPI

설계 원칙: 함축적 카피 + 소형 폰트(본문 8~9pt) + 조밀한 카드 레이아웃.
디자인: Apple HIG(Human Interface Guidelines) 토큰 — systemBlue/Orange/Red/Green,
        primary label #1D1D1F, secondaryLabel #6E6E73, opaqueSeparator #C6C6C8,
        레이어드 배경(#F2F2F7 / #FFFFFF), SF Pro Display + Apple SD Gothic Neo, 둥근 카드.
        팔레트 매핑은 `generate_apple_hig_pptx.py`와 동일 토큰 계열.

기존 `generate_pptx.py`의 helper(add_text/add_rect/add_footer/...)를 재사용하되,
generate_pptx.THEME 를 Apple HIG 값으로 in-place 치환해 helper 내부 색까지 Apple화한다.
"""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import generate_pptx as G
from generate_pptx import (
    add_text, add_rect, add_line, add_footer, add_header, add_so_what,
    remove_existing_slides, SLIDE_W, SLIDE_H, TEMPLATE,
)

from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
OUTPUT = os.path.join(ROOT, 'presentation', 'dev-org-transformation.pptx')

TOTAL = 3

# ============================================================
# Apple HIG 팔레트 — generate_pptx.THEME 를 in-place 치환
# (add_header/add_footer/add_so_what 내부 색까지 Apple화)
# ============================================================
APPLE = {
    'samsung_blue':  RGBColor(0x00, 0x7A, 0xFF),  # systemBlue
    'deep_navy':     RGBColor(0x1D, 0x1D, 0x1F),  # primary label (near-black)
    'amber':         RGBColor(0xFF, 0x95, 0x00),  # systemOrange
    'amber_light':   RGBColor(0xFF, 0xFA, 0xEC),  # yellow tint (SO WHAT)
    'dark_text':     RGBColor(0x1D, 0x1D, 0x1F),
    'gray_caption':  RGBColor(0x6E, 0x6E, 0x73),  # secondaryLabel
    'light_gray':    RGBColor(0xC6, 0xC6, 0xC8),  # opaqueSeparator
    'soft_blue_bg':  RGBColor(0xF2, 0xF2, 0xF7),  # secondarySystemBackground
    'soft_white_bg': RGBColor(0xFF, 0xFF, 0xFF),  # systemBackground
    'white':         RGBColor(0xFF, 0xFF, 0xFF),
    'red_alert':     RGBColor(0xFF, 0x3B, 0x30),  # systemRed
    'green_pos':     RGBColor(0x34, 0xC7, 0x59),  # systemGreen
}
G.THEME.update(APPLE)
THEME = G.THEME
PURPLE = RGBColor(0xAF, 0x52, 0xDE)  # systemPurple

# 폰트 — Latin/숫자는 SF Pro Display, 한글은 Apple SD Gothic Neo (macOS Apple 한글 UI)
FONT_KO = 'Apple SD Gothic Neo'
FONT_EN = 'SF Pro Display'


def _blank(prs):
    return prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])


def rrect(slide, x, y, w, h, *, fill=None, line=None, line_w=None, radius=0.08):
    """Apple 느낌의 둥근 카드."""
    shp = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, w, h)
    try:
        shp.adjustments[0] = radius
    except Exception:
        pass
    if fill is None:
        shp.fill.background()
    else:
        shp.fill.solid()
        shp.fill.fore_color.rgb = fill
    if line is None:
        shp.line.fill.background()
    else:
        shp.line.color.rgb = line
        shp.line.width = line_w or Emu(9525)
    shp.shadow.inherit = False
    if shp.has_text_frame:
        tf = shp.text_frame
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = Emu(0)
    return shp


def hig_header(slide, kicker, title):
    """Apple 스타일 헤더 — 작은 컬러 kicker + 큰 타이틀 + 얇은 구분선."""
    add_text(slide, Inches(0.55), Inches(0.42), Inches(12), Inches(0.28),
             kicker, font=FONT_EN, size=11, bold=True, color=THEME['samsung_blue'])
    add_text(slide, Inches(0.55), Inches(0.72), Inches(12.2), Inches(0.55),
             title, font=FONT_KO, size=21, bold=True, color=THEME['dark_text'])
    add_line(slide, Inches(0.55), Inches(1.42), Inches(12.78), Inches(1.42),
             color=THEME['light_gray'], width=Emu(6350))


def chip(slide, x, y, w, h, text, *, fill, tcolor, size=8.5, bold=True):
    rrect(slide, x, y, w, h, fill=fill, radius=0.4)
    add_text(slide, x, y + Emu(20000), w, h - Emu(30000),
             text, font=FONT_KO, size=size, bold=bold, color=tcolor,
             align='center', valign='middle')


# ============================================================
# 슬라이드 1: 왜 지금인가
# ============================================================

def build_slide_1(prs):
    slide = _blank(prs)
    hig_header(slide, 'WHY NOW', '왜 지금 — LTA가 SCA가 되었다')

    # 북극성 명제 배너
    qb_y = Inches(1.6)
    rrect(slide, Inches(0.55), qb_y, Inches(12.23), Inches(0.72), fill=THEME['soft_blue_bg'], radius=0.14)
    rrect(slide, Inches(0.55), qb_y, Inches(0.08), Inches(0.72), fill=THEME['samsung_blue'], radius=0.5)
    add_text(slide, Inches(0.8), qb_y + Inches(0.09), Inches(11.8), Inches(0.34),
             '“고객의 아키텍처 안으로 들어가 수요를 함께 설계하는 기업이 이긴다.”',
             font=FONT_KO, size=13, bold=True, color=THEME['dark_text'])
    add_text(slide, Inches(0.8), qb_y + Inches(0.44), Inches(11.8), Inches(0.24),
             '— 신문섭, Bain & Company (2026-06-18). 칩을 많이 파는 기업이 아니라.',
             font=FONT_KO, size=9.5, italic=True, color=THEME['gray_caption'])

    # 좌: 계약 3단 진화
    lx, lw = Inches(0.55), Inches(6.0)
    ly = Inches(2.55)
    add_text(slide, lx, ly, lw, Inches(0.26),
             '계약 구조의 3단 진화 — 요구 역량의 이동', font=FONT_KO, size=11, bold=True, color=THEME['dark_text'])
    stages = [
        ('Spot / 분기', '가격이 유일한 변수', '원가·수율·납기', THEME['gray_caption']),
        ('LTA + 선급금', '물량·가격 3~5년 락인 (선급금 10~30%)', '캐파·공급 신뢰성', THEME['samsung_blue']),
        ('SCA 전략적 계약', 'LTA 위에 공동설계·운영통합·자본연계 적층', '워크로드 이해·공동설계·선제 제안', THEME['amber']),
    ]
    sy = ly + Inches(0.34)
    for i, (t, d, cap, c) in enumerate(stages):
        h = Inches(0.86)
        rrect(slide, lx, sy, lw, h, fill=THEME['soft_white_bg'], line=THEME['light_gray'], radius=0.12)
        rrect(slide, lx, sy, Inches(0.08), h, fill=c, radius=0.5)
        add_text(slide, lx + Inches(0.22), sy + Inches(0.08), lw - Inches(0.4), Inches(0.26),
                 f'{i+1}. {t}', font=FONT_KO, size=11, bold=True, color=c)
        add_text(slide, lx + Inches(0.22), sy + Inches(0.35), lw - Inches(0.4), Inches(0.24),
                 d, font=FONT_KO, size=8.5, color=THEME['dark_text'])
        add_text(slide, lx + Inches(0.22), sy + Inches(0.58), lw - Inches(0.4), Inches(0.24),
                 f'요구 역량: {cap}', font=FONT_KO, size=8.5, bold=True, color=THEME['gray_caption'])
        sy = sy + h + Inches(0.12)

    # 우: Micron–Anthropic 4요소 + 키넘버
    rx, rw = Inches(6.78), Inches(6.0)
    add_text(slide, rx, ly, rw, Inches(0.26),
             'Micron ↔ Anthropic SCA (2026-06-22) — LTA에 무엇을 더했나', font=FONT_KO, size=11, bold=True, color=THEME['dark_text'])
    comps = [
        ('다년 공급', 'HBM·DRAM·SSD 전 포트폴리오', False),
        ('공동 최적화', 'Claude 워크로드 맞춤 서브시스템 공동설계', True),
        ('운영 통합', 'Micron 전사 Claude 배치', True),
        ('자본 연계', 'Series H 전략 투자 ($965B)', True),
    ]
    cy = ly + Inches(0.34)
    for name, desc, isnew in comps:
        h = Inches(0.5)
        rrect(slide, rx, cy, rw, h, fill=THEME['soft_white_bg'], line=THEME['light_gray'], radius=0.16)
        add_text(slide, rx + Inches(0.2), cy + Inches(0.05), Inches(1.7), Inches(0.4),
                 name, font=FONT_KO, size=10, bold=True,
                 color=THEME['amber'] if isnew else THEME['gray_caption'], valign='middle')
        add_text(slide, rx + Inches(1.95), cy + Inches(0.05), rw - Inches(2.7), Inches(0.4),
                 desc, font=FONT_KO, size=8.5, color=THEME['dark_text'], valign='middle')
        tag = 'SCA 신규' if isnew else 'LTA에도'
        chip(slide, rx + rw - Inches(0.95), cy + Inches(0.12), Inches(0.82), Inches(0.26), tag,
             fill=(THEME['amber_light'] if isnew else THEME['soft_blue_bg']),
             tcolor=(THEME['amber'] if isnew else THEME['gray_caption']), size=7.5)
        cy = cy + h + Inches(0.09)

    # 키넘버 3
    nums = [('16건', 'Micron SCA'), ('~$100B', '최소 계약매출'), ('$22B', '예치금')]
    nw = Inches(1.9)
    ny = cy + Inches(0.05)
    for i, (v, l) in enumerate(nums):
        x = rx + (nw + Inches(0.15)) * i
        rrect(slide, x, ny, nw, Inches(0.66), fill=THEME['dark_text'], radius=0.16)
        add_text(slide, x + Inches(0.15), ny + Inches(0.07), nw - Inches(0.3), Inches(0.34),
                 v, font=FONT_EN, size=17, bold=True, color=THEME['white'])
        add_text(slide, x + Inches(0.15), ny + Inches(0.42), nw - Inches(0.3), Inches(0.2),
                 l, font=FONT_KO, size=8, color=RGBColor(0xC6, 0xC6, 0xC8))

    add_so_what(slide, Inches(6.62),
                '고객이 사는 것은 칩이 아니라 “내 워크로드를 이해하고 아키텍처를 함께 최적화하는 파트너”다.')
    add_footer(slide, 1, TOTAL, 'WHY · LTA → SCA')
    return slide


# ============================================================
# 슬라이드 2: 무엇을 — 역할 전환 + FDE + 득실
# ============================================================

def build_slide_2(prs):
    slide = _blank(prs)
    hig_header(slide, 'WHAT', '무엇을 — 수주 이행자에서 기술 파트너로')

    # 좌: As-Is → To-Be 압축 5행
    lx, lw = Inches(0.55), Inches(6.7)
    ly = Inches(1.6)
    add_text(slide, lx, ly, lw, Inches(0.24), '개발실 역할의 재정의', font=FONT_KO, size=11, bold=True, color=THEME['dark_text'])
    hy = ly + Inches(0.3)
    add_text(slide, lx + Inches(1.55), hy, Inches(2.4), Inches(0.22), 'As-Is · 수주 이행자', font=FONT_KO, size=8.5, bold=True, color=THEME['gray_caption'])
    add_text(slide, lx + Inches(4.0), hy, Inches(2.6), Inches(0.22), 'To-Be · 기술 파트너', font=FONT_KO, size=8.5, bold=True, color=THEME['samsung_blue'])
    rows = [
        ('요구사항', '확정 스펙 수령', '요구를 공동 정의'),
        ('제안', 'RFQ 응답', '로드맵 기반 선제 제안'),
        ('고객 접점', '영업 뒤 후방 지원', '엔지니어가 고객 옆 상주'),
        ('모델링 범위', '메모리 디바이스 단품', '랙·DC 전체 시스템 모델'),
        ('성공 지표', '품질·납기·수율(QCD)', 'QCD + 공동설계·채택률'),
    ]
    ry = hy + Inches(0.26)
    for i, (dim, a, b) in enumerate(rows):
        h = Inches(0.44)
        bg = THEME['soft_blue_bg'] if i % 2 == 0 else THEME['white']
        rrect(slide, lx, ry, lw, h, fill=bg, radius=0.12)
        add_text(slide, lx + Inches(0.15), ry, Inches(1.4), h, dim, font=FONT_KO, size=9, bold=True, color=THEME['dark_text'], valign='middle')
        add_text(slide, lx + Inches(1.55), ry, Inches(2.35), h, a, font=FONT_KO, size=8.5, color=THEME['gray_caption'], valign='middle')
        add_text(slide, lx + Inches(3.9), ry, Inches(0.35), h, '→', font=FONT_EN, size=10, bold=True, color=THEME['samsung_blue'], valign='middle')
        add_text(slide, lx + Inches(4.0), ry, Inches(2.6), h, b, font=FONT_KO, size=8.5, bold=True, color=THEME['dark_text'], valign='middle')
        ry = ry + h + Inches(0.05)

    # 우: FDE 벤치마크
    rx, rw = Inches(7.45), Inches(5.33)
    ry2 = Inches(1.6)
    rrect(slide, rx, ry2, rw, Inches(2.62), fill=THEME['soft_white_bg'], line=THEME['light_gray'], radius=0.06)
    add_text(slide, rx + Inches(0.22), ry2 + Inches(0.13), rw - Inches(0.44), Inches(0.26),
             '벤치마크 · Palantir FDE', font=FONT_KO, size=11, bold=True, color=THEME['dark_text'])
    add_text(slide, rx + Inches(0.22), ry2 + Inches(0.4), rw - Inches(0.44), Inches(0.5),
             'Forward Deployed Engineer(“Delta”) — 고객사에 상주하는 엔지니어. Anthropic·OpenAI가 GTM 전략으로 채택.',
             font=FONT_KO, size=8.5, color=THEME['gray_caption'], line_spacing=1.05)
    maps = [
        ('고객사 상주', 'Co-Design Pod'),
        ('한 고객, 많은 능력', '파일럿 집중 → 확대'),
        ('말한 요구 vs 실제 요구', '요구 공동 정의'),
        ('gravel → paved', '재사용 설계 플랫폼'),
    ]
    my = ry2 + Inches(0.94)
    for fde, dt in maps:
        add_text(slide, rx + Inches(0.22), my, Inches(2.5), Inches(0.24), f'· {fde}', font=FONT_KO, size=8.5, color=THEME['gray_caption'])
        add_text(slide, rx + Inches(2.7), my, Inches(0.3), Inches(0.24), '→', font=FONT_EN, size=8.5, bold=True, color=THEME['samsung_blue'])
        add_text(slide, rx + Inches(3.0), my, Inches(2.2), Inches(0.24), dt, font=FONT_KO, size=8.5, bold=True, color=THEME['dark_text'])
        my = my + Inches(0.28)
    add_text(slide, rx + Inches(0.22), my + Inches(0.02), rw - Inches(0.44), Inches(0.4),
             '메모리 변형: FDE(상주) + 시스템 아키텍트·모델링(성능·파워 정량화) 결합 — 모델을 무기로 들고 들어간다.',
             font=FONT_KO, size=8, italic=True, color=THEME['samsung_blue'], line_spacing=1.05)

    # 우하: 득실 압축
    ry3 = Inches(4.42)
    half = Inches(2.6)
    rrect(slide, rx, ry3, half, Inches(2.0), fill=RGBColor(0xFF, 0xE5, 0xE3), radius=0.08)
    add_text(slide, rx + Inches(0.16), ry3 + Inches(0.1), half - Inches(0.3), Inches(0.24), '안 하면 (리스크)', font=FONT_KO, size=9.5, bold=True, color=THEME['red_alert'])
    for i, t in enumerate(['SCA 수주 배제', '커스텀 전환기 고착', '2nd source·가격력 상실', '미래 기술 선점 실패']):
        add_text(slide, rx + Inches(0.16), ry3 + Inches(0.4) + Inches(0.36) * i, half - Inches(0.3), Inches(0.34),
                 f'· {t}', font=FONT_KO, size=8.5, color=THEME['dark_text'])
    rrect(slide, rx + half + Inches(0.13), ry3, half, Inches(2.0), fill=RGBColor(0xE3, 0xF9, 0xE9), radius=0.08)
    bx = rx + half + Inches(0.13)
    add_text(slide, bx + Inches(0.16), ry3 + Inches(0.1), half - Inches(0.3), Inches(0.24), '하면 (이점)', font=FONT_KO, size=9.5, bold=True, color=THEME['green_pos'])
    for i, t in enumerate(['지속 매출 (락인+선급금)', '수익률 프리미엄', '미래 기술 선점', '자본 연계 옵션']):
        add_text(slide, bx + Inches(0.16), ry3 + Inches(0.4) + Inches(0.36) * i, half - Inches(0.3), Inches(0.34),
                 f'· {t}', font=FONT_KO, size=8.5, color=THEME['dark_text'])

    add_so_what(slide, Inches(6.62),
                '리스크는 비가역, 이점은 복리 — 조기 전환의 기대값이 압도적. “아키텍처 안으로”는 이미 검증된 조직 형태(FDE)다.')
    add_footer(slide, 2, TOTAL, 'WHAT · 역할 전환 + FDE')
    return slide


# ============================================================
# 슬라이드 3: 어떻게 — 4축 + 로드맵 + KPI
# ============================================================

def build_slide_3(prs):
    slide = _blank(prs)
    hig_header(slide, 'HOW', '어떻게 — 4대 축과 3-Phase 실행')

    # 4대 축
    ly = Inches(1.6)
    add_text(slide, Inches(0.55), ly, Inches(12), Inches(0.24), '전환 전략 — 4대 축', font=FONT_KO, size=11, bold=True, color=THEME['dark_text'])
    axes = [
        ('기술', THEME['samsung_blue'], ['워크로드 랩', '시스템 성능·파워 모델', '커스텀 플랫폼·임베디드 SW']),
        ('문화', THEME['amber'], ['"정답 구현"→"가설 제안"', '실패 허용 예산', '트레이드오프 토론']),
        ('조직', THEME['green_pos'], ['Co-Design Pod (=FDE)', '시스템 아키텍트·모델링 조직', '워크로드 인텔리전스']),
        ('일하는 방식', PURPLE, ['로드맵 교차 리뷰(분기)', '선행 시제품(PoA)', 'AI 도구 내재화']),
    ]
    cw, gap = Inches(3.0), Inches(0.11)
    cy = ly + Inches(0.3)
    for i, (name, c, items) in enumerate(axes):
        x = Inches(0.55) + (cw + gap) * i
        h = Inches(1.5)
        rrect(slide, x, cy, cw, h, fill=THEME['soft_white_bg'], line=THEME['light_gray'], radius=0.08)
        rrect(slide, x, cy, cw, Inches(0.34), fill=c, radius=0.08)
        rrect(slide, x, cy + Inches(0.17), cw, Inches(0.17), fill=c)  # square off bottom of header
        add_text(slide, x + Inches(0.15), cy + Inches(0.05), cw - Inches(0.3), Inches(0.26),
                 f'축 {i+1} · {name}', font=FONT_KO, size=10, bold=True, color=THEME['white'])
        iy = cy + Inches(0.44)
        for it in items:
            add_text(slide, x + Inches(0.15), iy, cw - Inches(0.3), Inches(0.3),
                     f'· {it}', font=FONT_KO, size=8.5, color=THEME['dark_text'], line_spacing=1.0)
            iy = iy + Inches(0.31)

    # 3-Phase 로드맵
    py = Inches(3.5)
    add_text(slide, Inches(0.55), py, Inches(8), Inches(0.24), '3-Phase 로드맵', font=FONT_KO, size=11, bold=True, color=THEME['dark_text'])
    phases = [
        ('90일 · 증명', THEME['samsung_blue'], 'Co-Design Pod 1호 · 워크로드 랩 + 모델 v0.1 · 선제 제안 1호 · KPI 개정안'),
        ('1년 · 제도화', THEME['amber'], 'Pod 3~5개 · 아키텍트 조직 · 모델 v1.0(랙) · ★ SCA형 계약 1건 수주'),
        ('3년 · 표준화', THEME['green_pos'], '커스텀 플랫폼(리드타임 −50%) · 모델 v2.0(DC·고객 공용) · IR 공시'),
    ]
    pw = Inches(4.0)
    pcy = py + Inches(0.3)
    for i, (t, c, d) in enumerate(phases):
        x = Inches(0.55) + (pw + Inches(0.11)) * i
        h = Inches(0.96)
        hot = i == 1
        rrect(slide, x, pcy, pw, h, fill=(THEME['amber_light'] if hot else THEME['soft_blue_bg']), radius=0.1)
        rrect(slide, x, pcy, Inches(0.07), h, fill=c, radius=0.5)
        add_text(slide, x + Inches(0.2), pcy + Inches(0.08), pw - Inches(0.35), Inches(0.26),
                 f'Phase {i+1} · {t}', font=FONT_KO, size=10, bold=True, color=c)
        add_text(slide, x + Inches(0.2), pcy + Inches(0.37), pw - Inches(0.35), Inches(0.54),
                 d, font=FONT_KO, size=8.5, color=THEME['dark_text'], line_spacing=1.05)

    # KPI 스트립
    ky = Inches(4.98)
    add_text(slide, Inches(0.55), ky, Inches(8), Inches(0.24), '성공 지표 (1년 → 3년)', font=FONT_KO, size=11, bold=True, color=THEME['dark_text'])
    kpis = [
        ('선제 제안', '12 → 40건/년'),
        ('로드맵 채택률', '20 → 35%'),
        ('고객 교류 시간', '10 → 25%'),
        ('커스텀 매출', '추적 → 30%+'),
        ('시스템 모델', '랙 → DC·공용'),
    ]
    kw = Inches(2.4)
    kcy = ky + Inches(0.3)
    for i, (l, v) in enumerate(kpis):
        x = Inches(0.55) + (kw + Inches(0.12)) * i
        rrect(slide, x, kcy, kw, Inches(0.62), fill=THEME['soft_blue_bg'], radius=0.14)
        add_text(slide, x + Inches(0.14), kcy + Inches(0.07), kw - Inches(0.28), Inches(0.2),
                 l, font=FONT_KO, size=8, color=THEME['gray_caption'])
        add_text(slide, x + Inches(0.14), kcy + Inches(0.28), kw - Inches(0.28), Inches(0.28),
                 v, font=FONT_KO, size=10.5, bold=True, color=THEME['samsung_blue'])

    add_so_what(slide, Inches(6.62),
                '90일 안에 파일럿 Pod·선제 제안으로 증명 → 1년 안에 SCA형 계약 1건으로 제도화의 근거를 만든다.',
                label='NEXT STEP')
    add_footer(slide, 3, TOTAL, 'HOW · 4축 + 로드맵')
    return slide


# ============================================================
# Main
# ============================================================

def main():
    print(f'Loading template (theme only): {TEMPLATE}')
    prs = Presentation(TEMPLATE)
    remove_existing_slides(prs)
    print('Palette: Apple HIG · Fonts: SF Pro Display + Apple SD Gothic Neo · 3 compact slides')

    for i, builder in enumerate([build_slide_1, build_slide_2, build_slide_3], 1):
        print(f'  Building slide {i}: {builder.__name__}...')
        builder(prs)

    print(f'Saving to: {OUTPUT}')
    prs.save(OUTPUT)
    size_kb = os.path.getsize(OUTPUT) / 1024
    print(f'Done. Output size: {size_kb:.1f} KB · {len(prs.slides)} slides')


if __name__ == '__main__':
    main()
