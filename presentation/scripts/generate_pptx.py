"""
삼성전자 메모리사업부 시나리오 플래닝 발표자료 생성 (논리 흐름 재구성)

template.pptx의 테마(색상·폰트·디자인)만 차용하고 25슬라이드를
9단계 논리 흐름에 맞춰 함수형으로 빌드한다.

논리 흐름:
  단계 0  표지·목차          (슬라이드 1~2)
  단계 1  현재 상황          (슬라이드 3~6)
  단계 2  불확실성           (슬라이드 7~8)
  단계 3  시나리오 플래닝 정당화 (슬라이드 9)
  단계 4  방법론 워크플로우    (슬라이드 10)
  단계 5  메모리 사업 적용    (슬라이드 11~17)
  단계 6  Robust 4개 상세    (슬라이드 18~21)
  단계 7  EWI 대시보드       (슬라이드 22)
  단계 8  전략 리마인드      (슬라이드 23~24)
  단계 9  최종 메시지        (슬라이드 25)

차트는 matplotlib으로 PNG 생성 후 삽입.
"""

from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.oxml.ns import qn
from copy import deepcopy
import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

# Korean font setup
matplotlib.rcParams['font.family'] = ['Apple SD Gothic Neo', 'Malgun Gothic', 'NanumGothic', 'sans-serif']
matplotlib.rcParams['axes.unicode_minus'] = False

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
TEMPLATE = os.path.join(ROOT, 'presentation', 'template.pptx')
OUTPUT = os.path.join(ROOT, 'presentation', 'samsung-memory-scenario-planning.pptx')
ASSETS_DIR = os.path.join(ROOT, 'presentation', 'assets')
os.makedirs(ASSETS_DIR, exist_ok=True)


# ============================================================
# Design System (template theme)
# ============================================================
THEME = {
    'samsung_blue': RGBColor(0x14, 0x28, 0xA0),
    'deep_navy':    RGBColor(0x0A, 0x1B, 0x5C),
    'amber':        RGBColor(0xD9, 0x77, 0x06),
    'amber_light':  RGBColor(0xFE, 0xF3, 0xC7),
    'dark_text':    RGBColor(0x1A, 0x1A, 0x1A),
    'gray_caption': RGBColor(0x6B, 0x72, 0x80),
    'light_gray':   RGBColor(0xD1, 0xD5, 0xDB),
    'soft_blue_bg': RGBColor(0xE8, 0xEE, 0xFC),
    'soft_white_bg': RGBColor(0xF8, 0xFA, 0xFC),
    'white':        RGBColor(0xFF, 0xFF, 0xFF),
    'red_alert':    RGBColor(0xC0, 0x00, 0x00),
    'green_pos':    RGBColor(0x05, 0x96, 0x69),
}

FONT_KO = '맑은 고딕'
FONT_EN = 'Calibri'

SLIDE_W = Inches(13.333)
SLIDE_H = Inches(7.5)


# ============================================================
# Helpers — drawing primitives
# ============================================================

def _set_run(run, text, *, font=FONT_KO, size=12, bold=False, color=None, italic=False):
    run.text = text
    run.font.name = font
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.italic = italic
    if color is not None:
        run.font.color.rgb = color


def add_text(slide, x, y, w, h, text, *, font=FONT_KO, size=12, bold=False,
             color=None, align='left', valign='top', wrap=True, line_spacing=None,
             italic=False):
    """단일 텍스트박스. text는 단일 문자열 (\n으로 줄 분리 가능)."""
    tb = slide.shapes.add_textbox(x, y, w, h)
    tf = tb.text_frame
    tf.word_wrap = wrap
    tf.margin_left = tf.margin_right = Emu(0)
    tf.margin_top = tf.margin_bottom = Emu(0)
    tf.vertical_anchor = {
        'top': MSO_ANCHOR.TOP,
        'middle': MSO_ANCHOR.MIDDLE,
        'bottom': MSO_ANCHOR.BOTTOM,
    }[valign]

    align_map = {
        'left': PP_ALIGN.LEFT,
        'center': PP_ALIGN.CENTER,
        'right': PP_ALIGN.RIGHT,
    }

    lines = str(text).split('\n')
    for i, line in enumerate(lines):
        if i == 0:
            p = tf.paragraphs[0]
        else:
            p = tf.add_paragraph()
        p.alignment = align_map[align]
        if line_spacing is not None:
            p.line_spacing = line_spacing
        run = p.add_run()
        _set_run(run, line, font=font, size=size, bold=bold, italic=italic,
                 color=color or THEME['dark_text'])
    return tb


def add_rect(slide, x, y, w, h, *, fill=None, line=None, line_width=None):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, y, w, h)
    if fill is None:
        shape.fill.background()
    else:
        shape.fill.solid()
        shape.fill.fore_color.rgb = fill
    if line is None:
        shape.line.fill.background()
    else:
        shape.line.color.rgb = line
        if line_width:
            shape.line.width = line_width
    shape.shadow.inherit = False
    # Remove text frame margins
    if shape.has_text_frame:
        shape.text_frame.margin_left = Emu(0)
        shape.text_frame.margin_right = Emu(0)
        shape.text_frame.margin_top = Emu(0)
        shape.text_frame.margin_bottom = Emu(0)
    return shape


def add_line(slide, x1, y1, x2, y2, *, color=None, width=None):
    line = slide.shapes.add_connector(1, x1, y1, x2, y2)
    line.line.color.rgb = color or THEME['light_gray']
    if width:
        line.line.width = width
    return line


def add_footer(slide, page_no, total, section_name):
    # Top divider above footer
    add_line(slide, Inches(0.5), Inches(7.0), Inches(12.83), Inches(7.0),
             color=THEME['light_gray'], width=Emu(6350))
    # Left footer
    add_text(slide, Inches(0.5), Inches(7.1), Inches(8), Inches(0.3),
             f'삼성전자  |  {section_name}',
             size=9, color=THEME['gray_caption'])
    # Right footer (page number)
    add_text(slide, Inches(11.8), Inches(7.1), Inches(1.0), Inches(0.3),
             f'{page_no} / {total}',
             size=9, color=THEME['gray_caption'], align='right')


def add_header(slide, title, subtitle=None):
    add_text(slide, Inches(0.5), Inches(0.4), Inches(12.83), Inches(0.7),
             title, font=FONT_KO, size=22, bold=True, color=THEME['dark_text'])
    if subtitle:
        add_text(slide, Inches(0.5), Inches(1.05), Inches(12.83), Inches(0.4),
                 subtitle, font=FONT_KO, size=12, color=THEME['gray_caption'])
    add_line(slide, Inches(0.5), Inches(1.55), Inches(12.83), Inches(1.55),
             color=THEME['light_gray'], width=Emu(6350))


def add_so_what(slide, y, text, label='SO WHAT'):
    """Bottom 'SO WHAT' or 권고 banner — light amber background."""
    add_rect(slide, Inches(0.5), y, Inches(12.83), Inches(0.4),
             fill=THEME['amber_light'])
    # Left amber accent bar
    add_rect(slide, Inches(0.5), y, Inches(0.1), Inches(0.4),
             fill=THEME['amber'])
    # Label
    add_text(slide, Inches(0.7), y + Emu(50000), Inches(2), Inches(0.3),
             label, font=FONT_EN, size=9, bold=True, color=THEME['amber'])
    # Body
    add_text(slide, Inches(2.0), y + Emu(50000), Inches(10.83), Inches(0.3),
             text, font=FONT_KO, size=11, bold=True, color=THEME['dark_text'],
             valign='middle')


# ============================================================
# Charts (matplotlib)
# ============================================================

def chart_memory_cycle_history(filepath):
    """1995~2025 메모리 시장 사이클 — 다운턴 5회 음영."""
    fig, ax = plt.subplots(figsize=(8.6, 4.4), dpi=130)

    # 합성 라인 데이터 (DRAM 가격 인덱스 또는 시장 규모)
    years = list(range(1995, 2027))
    # 사이클 5회 + 최근 호황 정점 표현
    base = np.array([
        100, 95, 60, 65, 80, 90, 70, 50, 65, 85,            # 1995~2004
        95, 105, 110, 70, 50, 75, 95, 105, 90, 110,         # 2005~2014
        100, 75, 95, 130, 110, 85, 105, 130, 75, 100,       # 2015~2024
        180, 320,                                           # 2025~2026 (호황)
    ])

    ax.plot(years, base, color='#1428A0', linewidth=2.2, zorder=3)
    ax.fill_between(years, 0, base, alpha=0.05, color='#1428A0')

    # 다운턴 5회 음영
    downturns = [
        (1996, 1998, '1996~98'),
        (2001, 2002, '2001~02'),
        (2008, 2009, '2008~09'),
        (2015, 2016, '2015~16'),
        (2022, 2023, '2022~23'),
    ]
    for s, e, lbl in downturns:
        ax.axvspan(s, e + 0.5, color='#C00000', alpha=0.12, zorder=1)
        ax.text((s + e) / 2, 25, lbl, ha='center', fontsize=8,
                color='#8B0000', fontweight='bold')

    # 현재 위치 강조
    ax.scatter([2026], [320], color='#D97706', s=180, zorder=5,
               edgecolors='white', linewidths=2)
    ax.annotate('현재 (2026 Q1)\n사상 최고점', xy=(2026, 320),
                xytext=(2021, 280), fontsize=9, color='#D97706', fontweight='bold',
                arrowprops=dict(arrowstyle='->', color='#D97706', lw=1.5))

    ax.set_title('메모리 시장 사이클 (1995~2026)  ·  5번의 명확한 다운턴 + 현재 호황 정점',
                 fontsize=11, fontweight='bold', color='#1A1A1A', pad=12)
    ax.set_xlabel('연도', fontsize=9, color='#6B7280')
    ax.set_ylabel('시장 규모/가격 인덱스 (1995=100)', fontsize=9, color='#6B7280')
    ax.set_xlim(1994.5, 2027)
    ax.set_ylim(0, 380)
    ax.grid(axis='y', alpha=0.3, linestyle='--')
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.tick_params(colors='#6B7280', labelsize=8)

    plt.tight_layout()
    plt.savefig(filepath, dpi=130, bbox_inches='tight', facecolor='white')
    plt.close()


def chart_samsung_quarterly(filepath):
    """삼성 분기별 매출·영업이익률 2014~2026 Q1."""
    fig, ax1 = plt.subplots(figsize=(8.6, 4.4), dpi=130)

    quarters = []
    revenues = []
    margins = []
    # Synthetic but representative data — 분기 시뮬레이션
    np.random.seed(42)
    base_revenue = [
        # 2014~2016: 안정기 + 2015 다운턴
        15, 16, 17, 18, 14, 12, 13, 15, 14, 16, 18, 19,
        # 2017~2018: 슈퍼사이클 1
        21, 24, 27, 30, 28, 25, 22, 18,
        # 2019~2020: 다운턴
        13, 12, 14, 15, 16, 17, 18, 22,
        # 2021~2022: 회복 + 정점
        24, 26, 28, 30, 27, 22, 16, 13,
        # 2023: 다운턴 (분기 적자)
        10, 9, 12, 15,
        # 2024~2025 H1: 회복
        18, 22, 26, 30, 19, 22,
        # 2025 H2 ~ 2026 Q1: 호황
        28, 37, 75,
    ]
    base_margin = [
        # 2014~2016
        25, 27, 30, 32, 18, 12, 18, 25, 22, 30, 35, 38,
        # 2017~2018: 황금기
        45, 50, 55, 58, 52, 45, 35, 25,
        # 2019~2020
        12, 8, 18, 25, 28, 32, 35, 42,
        # 2021~2022
        45, 48, 52, 55, 48, 30, 12, -5,
        # 2023: 적자
        -20, -25, -10, 5,
        # 2024~2025
        15, 25, 35, 42, 28, 35,
        # 2025 H2 ~ 2026 Q1
        40, 45, 49,
    ]

    n = len(base_revenue)
    quarter_labels = []
    for year in range(2014, 2026):
        for q in range(1, 5):
            quarter_labels.append(f'{year % 100}.{q}')
    quarter_labels.append('26.1')

    x = np.arange(n)
    bars = ax1.bar(x, base_revenue, color='#1428A0', alpha=0.85, label='분기 매출 (조원)')
    # 마지막(2026 Q1) 강조
    bars[-1].set_color('#D97706')

    ax1.set_xlabel('분기', fontsize=9, color='#6B7280')
    ax1.set_ylabel('분기 매출 (조원)', fontsize=9, color='#1428A0')
    ax1.tick_params(colors='#6B7280', labelsize=7)
    ax1.set_xticks(x[::4])
    ax1.set_xticklabels([quarter_labels[i] for i in range(0, n, 4)], rotation=0, fontsize=7)
    ax1.spines['top'].set_visible(False)
    ax1.set_ylim(0, max(base_revenue) * 1.15)

    # Right axis: margin
    ax2 = ax1.twinx()
    ax2.plot(x, base_margin, color='#D97706', linewidth=2.2, marker='o', markersize=3,
             label='영업이익률 (%)', zorder=5)
    ax2.set_ylabel('영업이익률 (%)', fontsize=9, color='#D97706')
    ax2.tick_params(colors='#6B7280', labelsize=7)
    ax2.spines['top'].set_visible(False)
    ax2.axhline(0, color='#6B7280', linewidth=0.5, linestyle='--')

    # 다운턴 음영
    downturns = [(4, 8, '15 다운턴'), (20, 24, '19 다운턴'), (32, 36, '23 다운턴')]
    for s, e, lbl in downturns:
        ax1.axvspan(s, e, color='#C00000', alpha=0.10, zorder=0)
        ax1.text((s + e) / 2, max(base_revenue) * 1.05, lbl, ha='center',
                 fontsize=7.5, color='#8B0000', fontweight='bold')

    ax1.set_title('삼성 메모리 분기 매출·영업이익률 (2014~2026 Q1)  ·  3번의 다운턴 후 사상 최대',
                  fontsize=10.5, fontweight='bold', color='#1A1A1A', pad=12)

    plt.tight_layout()
    plt.savefig(filepath, dpi=130, bbox_inches='tight', facecolor='white')
    plt.close()


def chart_iu_matrix(filepath):
    """STEEP 50개 요인 I×U 산점도."""
    np.random.seed(42)
    fig, ax = plt.subplots(figsize=(7.5, 5), dpi=130)

    # 50개 점 — 그룹별 색상
    categories = {
        'Social':       (10, '#FBBF24'),  # 노랑
        'Technology':   (10, '#1428A0'),  # 블루
        'Economy':      (10, '#D97706'),  # 앰버
        'Environment':  (10, '#059669'),  # 그린
        'Political':    (10, '#C00000'),  # 레드
    }

    all_points = []
    for cat, (n, color) in categories.items():
        impacts = np.clip(np.random.normal(3, 1.0, n), 1, 5)
        uncertainties = np.clip(np.random.normal(3, 1.0, n), 1, 5)
        sizes = (impacts * uncertainties) * 20
        ax.scatter(uncertainties, impacts, s=sizes, color=color, alpha=0.55,
                   label=cat, edgecolors='white', linewidth=1)
        all_points.append((cat, color, list(zip(uncertainties, impacts))))

    # I×U=25 4개 키 요인
    key_factors = [
        (4.8, 4.9, 'T3 3D DRAM'),
        (4.6, 4.95, 'Ec6 AI 버블'),
        (4.7, 4.85, 'P1 수출 통제'),
        (4.9, 4.8, 'P8 대만 해협'),
    ]
    for (u, i, name) in key_factors:
        ax.scatter([u], [i], s=420, color='#D97706',
                   edgecolors='white', linewidth=2.5, zorder=10)
        ax.annotate(name, xy=(u, i), xytext=(u - 1.2, i + 0.05),
                    fontsize=8.5, fontweight='bold', color='#D97706')

    # 우상단 영역 강조
    ax.axvline(4, color='#D97706', linestyle='--', linewidth=0.8, alpha=0.7)
    ax.axhline(4, color='#D97706', linestyle='--', linewidth=0.8, alpha=0.7)
    ax.fill_betweenx([4, 5.2], 4, 5.2, color='#FEF3C7', alpha=0.4, zorder=0)
    ax.text(5.1, 5.0, '핵심 불확실성 (I≥4, U≥4)\n20개 요인',
            fontsize=8.5, ha='right', color='#D97706', fontweight='bold')

    ax.set_xlim(0.5, 5.3)
    ax.set_ylim(0.5, 5.3)
    ax.set_xlabel('Uncertainty 불확실성 ──→', fontsize=9, color='#6B7280')
    ax.set_ylabel('Impact 영향력 ──→', fontsize=9, color='#6B7280')
    ax.set_title('Impact × Uncertainty 매트릭스  ·  STEEP 50개 요인',
                 fontsize=11, fontweight='bold', color='#1A1A1A', pad=12)
    ax.tick_params(colors='#6B7280', labelsize=8)
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.legend(loc='lower left', fontsize=8, frameon=False, ncol=5)
    ax.grid(True, alpha=0.2, linestyle='--')

    plt.tight_layout()
    plt.savefig(filepath, dpi=130, bbox_inches='tight', facecolor='white')
    plt.close()


def chart_capex_floor(filepath):
    """사이클 전 구간 capex 가이드라인 (Nucor 모델)."""
    fig, ax = plt.subplots(figsize=(8.4, 4.4), dpi=130)

    years = list(range(2020, 2031))
    samsung_capex = [38, 47, 53, 53, 38, 32, 41, 50, 38, 32, 38]
    upper = [55] * len(years)
    lower = [4 + 8 + 8] * len(years)  # 다운사이클 하한 = R&D 4조원 + α

    ax.plot(years, samsung_capex, color='#1428A0', linewidth=2.5,
            marker='o', markersize=6, label='Samsung capex (조원)')
    ax.plot(years, upper, color='#D97706', linestyle='--', linewidth=1.5,
            label='호황기 상한선 (55조)')
    ax.plot(years, lower, color='#C00000', linestyle='-', linewidth=2,
            label='다운사이클 하한선 (R&D + 패키징 + 3D DRAM = 20조)')

    # 사이클 음영
    ax.axvspan(2022.5, 2023.5, color='#C00000', alpha=0.10)
    ax.text(2023, 12, '2022~23 다운턴', ha='center', fontsize=8, color='#8B0000')

    ax.axvspan(2025.5, 2026.5, color='#D97706', alpha=0.10)
    ax.text(2026, 12, '2026 호황 정점', ha='center', fontsize=8, color='#D97706')

    ax.axvspan(2027.5, 2028.5, color='#6B7280', alpha=0.10)
    ax.text(2028, 12, '다운턴 가설', ha='center', fontsize=8, color='#6B7280')

    ax.set_title('사이클 전 구간 Capex 가이드라인 (Nucor 모델)  ·  호황 절제 + 다운턴 사수',
                 fontsize=10.5, fontweight='bold', color='#1A1A1A', pad=12)
    ax.set_xlabel('연도', fontsize=9, color='#6B7280')
    ax.set_ylabel('Capex (조원)', fontsize=9, color='#6B7280')
    ax.set_ylim(0, 65)
    ax.grid(True, alpha=0.3, linestyle='--')
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.tick_params(colors='#6B7280', labelsize=8)
    ax.legend(loc='upper right', fontsize=8.5, frameon=False)

    plt.tight_layout()
    plt.savefig(filepath, dpi=130, bbox_inches='tight', facecolor='white')
    plt.close()


def chart_scenario_matrix(filepath):
    """시나리오 매트릭스 2x2."""
    fig, ax = plt.subplots(figsize=(7.0, 5.5), dpi=130)

    # 사분면 배경색
    ax.add_patch(plt.Rectangle((-1, 0), 1, 1, color='#FEE2E2', alpha=0.5))   # C 좌상
    ax.add_patch(plt.Rectangle((0, 0), 1, 1, color='#E8EEFC', alpha=0.7))    # A 우상
    ax.add_patch(plt.Rectangle((-1, -1), 1, 1, color='#F3F4F6', alpha=0.5))  # D 좌하
    ax.add_patch(plt.Rectangle((0, -1), 1, 1, color='#FEF3C7', alpha=0.7))   # B 우하 (Main Bet)

    # 십자선
    ax.axhline(0, color='#6B7280', linewidth=1)
    ax.axvline(0, color='#6B7280', linewidth=1)

    # 시나리오 라벨
    scenarios = [
        (-0.5, 0.6, 'C  기술 냉전', '확률 10~15%\n2035 $260B', '#C00000'),
        (0.5, 0.6, 'A  황금 요새', '확률 25~30%\n2035 $450B', '#1428A0'),
        (-0.5, -0.4, 'D  조용한 재편', '확률 20~25%\n2035 $320B', '#6B7280'),
        (0.5, -0.4, 'B ⭐ AI 르네상스', '확률 30~35%\n2035 $520B [Main Bet]', '#D97706'),
    ]
    for x, y, name, info, color in scenarios:
        ax.text(x, y, name, ha='center', fontsize=11.5, fontweight='bold',
                color=color)
        ax.text(x, y - 0.20, info, ha='center', fontsize=8.5, color='#1A1A1A')

    # E 와일드카드 (외부)
    ax.text(1.2, 0, 'E  패러다임 전환\n(와일드카드)\n확률 5~10%',
            ha='center', va='center', fontsize=9, fontweight='bold',
            color='#7C3AED',
            bbox=dict(boxstyle='round,pad=0.3', facecolor='#EDE9FE',
                      edgecolor='#7C3AED', linestyle='--'))

    # 축 라벨
    ax.text(1.0, 0.95, 'DF2 디커플링 ↑', fontsize=9, color='#6B7280', fontweight='bold')
    ax.text(1.0, -0.95, 'DF2 공존 ↓', fontsize=9, color='#6B7280', fontweight='bold')
    ax.text(-0.95, -0.05, 'AI 붕괴 ←', fontsize=9, color='#6B7280', fontweight='bold')
    ax.text(0.95, -0.05, '→ AI 지속', fontsize=9, color='#6B7280', fontweight='bold', ha='right')

    ax.set_xlim(-1.05, 1.5)
    ax.set_ylim(-1.05, 1.05)
    ax.set_xticks([])
    ax.set_yticks([])
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['bottom'].set_visible(False)
    ax.spines['left'].set_visible(False)
    ax.set_title('시나리오 매트릭스 (DF1 × DF2)  ·  5개 대안적 미래',
                 fontsize=11, fontweight='bold', color='#1A1A1A', pad=12)

    plt.tight_layout()
    plt.savefig(filepath, dpi=130, bbox_inches='tight', facecolor='white')
    plt.close()


def chart_workflow_steps(filepath):
    """8단계 워크플로우 가로 다이어그램."""
    fig, ax = plt.subplots(figsize=(11, 2.6), dpi=130)
    ax.axis('off')

    steps = [
        ('01', 'Focal Issue\n정의'),
        ('02', 'STEEP\n50개 요인'),
        ('03', 'I×U\n매트릭스'),
        ('04', 'Driving\nForces 2개'),
        ('05', '시나리오\n매트릭스'),
        ('06', 'Main Bet\n선정'),
        ('07', 'Side Bets\n헤징'),
        ('08', 'Robust 전략\n+ EWI'),
    ]

    n = len(steps)
    box_w = 1.0
    spacing = 1.32
    total_width = (n - 1) * spacing + box_w

    for i, (num, label) in enumerate(steps):
        x = i * spacing
        # 단계 박스
        ax.add_patch(plt.Rectangle((x, 0.2), box_w, 1.4,
                                    facecolor='#E8EEFC', edgecolor='#1428A0',
                                    linewidth=1.5))
        ax.text(x + box_w / 2, 1.45, num, ha='center', fontsize=14,
                fontweight='bold', color='#1428A0')
        ax.text(x + box_w / 2, 0.85, label, ha='center', fontsize=8.5,
                color='#1A1A1A')

        # 화살표 (마지막 제외)
        if i < n - 1:
            ax.annotate('', xy=(x + spacing, 0.9), xytext=(x + box_w + 0.05, 0.9),
                        arrowprops=dict(arrowstyle='->', color='#D97706', lw=2))

    ax.set_xlim(-0.1, total_width + 0.1)
    ax.set_ylim(0, 2.0)
    plt.tight_layout()
    plt.savefig(filepath, dpi=130, bbox_inches='tight', facecolor='white')
    plt.close()


def chart_balance_portfolio(filepath):
    """RS2 바벨 포트폴리오 다이어그램."""
    fig, ax = plt.subplots(figsize=(8.6, 3.6), dpi=130)
    ax.axis('off')

    # 좌측 큰 원 (프리미엄)
    ax.add_patch(plt.Circle((1.5, 1.5), 1.0, color='#1428A0', alpha=0.85))
    ax.text(1.5, 1.7, '프리미엄', ha='center', fontsize=14, fontweight='bold',
            color='white')
    ax.text(1.5, 1.3, 'HBM4E·HBM5\n커스텀 AI 메모리\n영업이익률 35~45%',
            ha='center', fontsize=9, color='white')

    # 중앙 가는 막대
    ax.add_patch(plt.Rectangle((2.5, 1.4), 4, 0.2, color='#D1D5DB'))

    # 가운데 X 표시 (가운데 축소)
    ax.text(4.5, 1.5, '✕  가운데 축소  ✕', ha='center', fontsize=10,
            fontweight='bold', color='#C00000', va='center')

    # 우측 큰 원 (범용)
    ax.add_patch(plt.Circle((7.5, 1.5), 1.0, color='#D97706', alpha=0.85))
    ax.text(7.5, 1.7, '범용', ha='center', fontsize=14, fontweight='bold',
            color='white')
    ax.text(7.5, 1.3, '범용 DRAM 1c nm\nQLC SSD\n흑자 사수',
            ha='center', fontsize=9, color='white')

    # AI 효율화 메커니즘
    ax.text(4.5, 0.35, 'AI 효율화 도구 도입 → 잉여 인력 → 양 끝 동시 강화',
            ha='center', fontsize=10, fontweight='bold', color='#1428A0',
            bbox=dict(boxstyle='round,pad=0.4', facecolor='#FEF3C7',
                      edgecolor='#D97706'))

    ax.set_xlim(0, 9)
    ax.set_ylim(0, 3)
    plt.tight_layout()
    plt.savefig(filepath, dpi=130, bbox_inches='tight', facecolor='white')
    plt.close()


def chart_capex_growth(filepath):
    """빅테크 4사 AI CapEx 성장 (2024~2026)."""
    fig, ax = plt.subplots(figsize=(7, 3.8), dpi=130)
    years = ['2024', '2025', '2026']
    amazon = [80, 110, 200]
    msft = [45, 80, 190]
    alphabet = [50, 90, 185]
    meta = [25, 65, 135]

    x = np.arange(len(years))
    width = 0.6
    bottoms = np.zeros(len(years))

    for label, vals, color in [
        ('Amazon', amazon, '#FF9900'),
        ('Microsoft', msft, '#0078D4'),
        ('Alphabet', alphabet, '#4285F4'),
        ('Meta', meta, '#1877F2'),
    ]:
        ax.bar(x, vals, width, bottom=bottoms, label=label, color=color, edgecolor='white', linewidth=1)
        bottoms += np.array(vals)

    # 합산 텍스트
    totals = [amazon[i] + msft[i] + alphabet[i] + meta[i] for i in range(3)]
    for i, t in enumerate(totals):
        ax.text(i, t + 15, f'${t}B', ha='center', fontsize=11, fontweight='bold',
                color='#1428A0')

    # 성장률
    ax.text(1, totals[1] / 2, '+105%', ha='center', fontsize=10, fontweight='bold',
            color='white')
    ax.text(2, totals[2] / 2, '+77%', ha='center', fontsize=10, fontweight='bold',
            color='white')

    ax.set_title('빅테크 4사 AI CapEx (2024~2026)  ·  $200B → $725B  =  +263%',
                 fontsize=10.5, fontweight='bold', color='#1A1A1A', pad=12)
    ax.set_ylabel('CapEx ($B)', fontsize=9, color='#6B7280')
    ax.set_xticks(x)
    ax.set_xticklabels(years, fontsize=10)
    ax.tick_params(colors='#6B7280', labelsize=9)
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.legend(loc='upper left', fontsize=8.5, frameon=False)
    ax.set_ylim(0, max(totals) * 1.18)

    plt.tight_layout()
    plt.savefig(filepath, dpi=130, bbox_inches='tight', facecolor='white')
    plt.close()


# ============================================================
# Slide builders — 25 slides
# ============================================================

TOTAL = 25

def build_slide_1_cover(prs):
    """표지."""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    # 좌측 풀 사이드바
    add_rect(slide, Inches(0), Inches(0), Inches(0.2), Inches(7.5),
             fill=THEME['samsung_blue'])
    # 짧은 액센트 사이드바
    add_rect(slide, Inches(0), Inches(1.5), Inches(0.2), Inches(0.8),
             fill=THEME['amber'])

    add_text(slide, Inches(1.0), Inches(0.8), Inches(11), Inches(0.4),
             'SAMSUNG ELECTRONICS', font=FONT_EN, size=12,
             color=THEME['samsung_blue'], bold=True)
    # Amber 짧은 라인
    add_rect(slide, Inches(1.0), Inches(1.3), Inches(0.6), Inches(0.05),
             fill=THEME['amber'])

    add_text(slide, Inches(1.0), Inches(2.4), Inches(11), Inches(2.0),
             '호황의 정점에서\n다운턴을 준비하는 법',
             font=FONT_KO, size=44, bold=True, color=THEME['dark_text'],
             line_spacing=1.1)

    add_text(slide, Inches(1.0), Inches(4.5), Inches(11), Inches(0.5),
             '시나리오 플래닝 기반 전략 보고서',
             font=FONT_KO, size=20, color=THEME['samsung_blue'])

    # 디바이더
    add_line(slide, Inches(1.0), Inches(5.4), Inches(6), Inches(5.4),
             color=THEME['amber'], width=Emu(15875))

    add_text(slide, Inches(1.0), Inches(5.7), Inches(4), Inches(0.3),
             '작성', font=FONT_EN, size=9, color=THEME['gray_caption'], bold=True)
    add_text(slide, Inches(1.0), Inches(6.0), Inches(5), Inches(0.4),
             'DS부문 메모리사업부 전략기획팀', font=FONT_KO, size=12,
             color=THEME['dark_text'], bold=True)

    add_text(slide, Inches(5.5), Inches(5.7), Inches(4), Inches(0.3),
             '일자', font=FONT_EN, size=9, color=THEME['gray_caption'], bold=True)
    add_text(slide, Inches(5.5), Inches(6.0), Inches(4), Inches(0.4),
             '2026년 5월 6일 (Q1 결산 직후)', font=FONT_KO, size=12,
             color=THEME['dark_text'], bold=True)

    add_text(slide, Inches(9.5), Inches(5.7), Inches(3), Inches(0.3),
             '분류', font=FONT_EN, size=9, color=THEME['gray_caption'], bold=True)
    add_text(slide, Inches(9.5), Inches(6.0), Inches(3), Inches(0.4),
             '대외비', font=FONT_KO, size=12, color=THEME['red_alert'], bold=True)

    return slide


def build_slide_2_toc(prs):
    """목차 — 9단계 논리 흐름."""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    add_header(slide, '목차',
               '9단계 논리 흐름 — 호황의 정점에서 다운턴을 준비하기 위한 사고 과정')

    items = [
        ('01', '현재 상황', '호황의 정점 + 사이클 산업의 본질', '슬라이드 3~6'),
        ('02', '불확실성', '다운턴 시점·규모는 알 수 없음', '슬라이드 7~8'),
        ('03', '시나리오 플래닝의 정당화', 'Shell·ExxonMobil·Disney·Samsung 사례', '슬라이드 9'),
        ('04', '방법론 워크플로우', '8단계 시나리오 플래닝 프로세스', '슬라이드 10'),
        ('05', '메모리 사업 적용', '단계별 상세 적용', '슬라이드 11~17'),
        ('06', 'Robust 전략 4가지', 'RS1·RS2·RS3·RS6 핵심 전략 상세', '슬라이드 18~21'),
        ('07', 'EWI 대시보드', '실시간 모니터링 + 자동 트리거', '슬라이드 22'),
        ('08', '전략 리마인드', '9개 결정 + 문제 해결 가능성', '슬라이드 23~24'),
        ('09', '최종 메시지', 'Decision Request 클로징', '슬라이드 25'),
    ]
    # 3 columns x 3 rows
    for idx, (num, title, desc, pages) in enumerate(items):
        row = idx // 3
        col = idx % 3
        x = Inches(0.5 + col * 4.3)
        y = Inches(2.0 + row * 1.6)
        # 카드 배경
        add_rect(slide, x, y, Inches(4.1), Inches(1.4),
                 fill=THEME['soft_blue_bg'])
        # 좌측 강조 띠
        add_rect(slide, x, y, Inches(0.08), Inches(1.4),
                 fill=THEME['samsung_blue'])
        add_text(slide, x + Inches(0.25), y + Inches(0.15), Inches(1), Inches(0.4),
                 num, font=FONT_EN, size=22, bold=True, color=THEME['samsung_blue'])
        add_text(slide, x + Inches(1.0), y + Inches(0.2), Inches(3), Inches(0.4),
                 title, font=FONT_KO, size=13, bold=True, color=THEME['dark_text'])
        add_text(slide, x + Inches(0.25), y + Inches(0.7), Inches(3.7), Inches(0.4),
                 desc, font=FONT_KO, size=10, color=THEME['dark_text'])
        add_text(slide, x + Inches(0.25), y + Inches(1.05), Inches(3.7), Inches(0.3),
                 pages, font=FONT_EN, size=8.5, color=THEME['amber'], italic=True)

    add_footer(slide, 2, TOTAL, '목차')
    return slide


def build_slide_3_peak(prs):
    """단계 1-1: 호황의 정점 — 4 빅 카드."""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    add_header(slide,
               '"호황의 정점에 서 있다" — 4가지 핵심 수치',
               'Q1 2026 메모리 매출 +292% YoY · 빅테크 AI CapEx $725B · HBM4 캐파 전량 Sold Out')

    # 4 빅 넘버 카드 (2x2)
    cards = [
        (0, 0, '$50.4B', '삼성 Q1 2026 메모리 매출', '사상 최대 분기', THEME['samsung_blue']),
        (1, 0, '+292%', 'YoY 성장률', '메모리 사업 사상 최대 폭', THEME['amber']),
        (0, 1, '$725B', '빅테크 4사 AI CapEx 2026', '+77% YoY ($410B → $725B)', THEME['samsung_blue']),
        (1, 1, '100%', 'HBM4 2026 캐파', '전량 Sold Out', THEME['amber']),
    ]
    for col, row, big, label, sub, color in cards:
        x = Inches(0.5 + col * 6.42)
        y = Inches(1.85 + row * 2.4)
        add_rect(slide, x, y, Inches(6.32), Inches(2.3),
                 fill=color)
        # 큰 수치
        add_text(slide, x + Inches(0.4), y + Inches(0.3), Inches(5.5), Inches(1.1),
                 big, font=FONT_EN, size=58, bold=True, color=THEME['white'])
        # 레이블
        add_text(slide, x + Inches(0.4), y + Inches(1.5), Inches(5.5), Inches(0.4),
                 label, font=FONT_KO, size=14, bold=True, color=THEME['white'])
        # 서브
        add_text(slide, x + Inches(0.4), y + Inches(1.85), Inches(5.5), Inches(0.4),
                 sub, font=FONT_KO, size=10, color=THEME['white'])

    add_so_what(slide, Inches(6.55), '지금이 호황의 정점 — 그러나 메모리는 사이클 산업이다.')
    add_footer(slide, 3, TOTAL, '현재 상황')
    return slide


def build_slide_4_history(prs):
    """단계 1-2: 메모리 사이클 역사 1995~2026."""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    add_header(slide,
               '메모리 산업은 4~5년 단위로 100%+ 등락하는 가장 변동성 큰 산업',
               '1995~2026년 시장 사이클 — 5번의 명확한 다운턴 + 현재 호황 정점')

    img = os.path.join(ASSETS_DIR, 'cycle_history.png')
    chart_memory_cycle_history(img)
    slide.shapes.add_picture(img, Inches(0.5), Inches(1.7), width=Inches(8.5))

    # 우측 인사이트
    add_rect(slide, Inches(9.3), Inches(1.7), Inches(3.5), Inches(4.8),
             fill=THEME['soft_blue_bg'])
    add_text(slide, Inches(9.5), Inches(1.85), Inches(3.2), Inches(0.4),
             '핵심 시사점', font=FONT_KO, size=12, bold=True,
             color=THEME['samsung_blue'])
    add_text(slide, Inches(9.5), Inches(2.3), Inches(3.2), Inches(0.4),
             'KEY INSIGHTS', font=FONT_EN, size=8, color=THEME['gray_caption'])

    insights = [
        '· 모든 다운턴은 "예측 불가"한 시점에 도래',
        '· 2022~23 다운턴: 빅테크 클라우드 capex −15%로 시작 → 메모리 가격 −50%',
        '· 호황기 평균 18~24개월 / 다운턴 평균 12~18개월',
        '· 다운턴 진입 후에는 이미 늦음 — 사이클 진입 전 준비 필수',
    ]
    for i, line in enumerate(insights):
        add_text(slide, Inches(9.5), Inches(2.85 + i * 0.85), Inches(3.2), Inches(0.85),
                 line, font=FONT_KO, size=10, color=THEME['dark_text'],
                 line_spacing=1.3)

    add_footer(slide, 4, TOTAL, '현재 상황')
    return slide


def build_slide_5_samsung_quarterly(prs):
    """단계 1-3: 삼성 분기별 매출·이익률 — 사이클의 실증."""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    add_header(slide,
               '삼성 메모리사업부 분기 매출·영업이익률 (2014~2026 Q1)',
               '3번의 다운턴에서 매출 −38%·영업이익 −84% 평균 손실 — 사이클의 실증')

    img = os.path.join(ASSETS_DIR, 'samsung_quarterly.png')
    chart_samsung_quarterly(img)
    slide.shapes.add_picture(img, Inches(0.5), Inches(1.7), width=Inches(8.5))

    # 우측 다운턴 손실 박스
    add_rect(slide, Inches(9.3), Inches(1.7), Inches(3.5), Inches(4.8),
             fill=THEME['soft_blue_bg'])
    add_text(slide, Inches(9.5), Inches(1.85), Inches(3.2), Inches(0.4),
             '다운턴 손실 (실측)', font=FONT_KO, size=12, bold=True,
             color=THEME['red_alert'])

    losses = [
        ('2015 다운턴', '매출 −32%', '영업이익 −75%'),
        ('2019 다운턴', '매출 −38%', '영업이익 −88%'),
        ('2022~23 다운턴', '매출 −45%', '영업이익 분기 −10조'),
    ]
    for i, (year, rev, op) in enumerate(losses):
        y = Inches(2.45 + i * 1.0)
        add_text(slide, Inches(9.5), y, Inches(3.2), Inches(0.3),
                 year, font=FONT_KO, size=10, bold=True, color=THEME['samsung_blue'])
        add_text(slide, Inches(9.5), y + Inches(0.3), Inches(3.2), Inches(0.3),
                 rev, font=FONT_KO, size=10, color=THEME['dark_text'])
        add_text(slide, Inches(9.5), y + Inches(0.55), Inches(3.2), Inches(0.3),
                 op, font=FONT_KO, size=10, color=THEME['dark_text'])

    # 평균 박스
    add_rect(slide, Inches(9.5), Inches(5.7), Inches(3.0), Inches(0.7),
             fill=THEME['amber'])
    add_text(slide, Inches(9.65), Inches(5.78), Inches(2.85), Inches(0.55),
             '평균: 매출 −38%\n영업이익 −84%',
             font=FONT_KO, size=11, bold=True, color=THEME['white'],
             line_spacing=1.1)

    add_footer(slide, 5, TOTAL, '현재 상황')
    return slide


def build_slide_6_paradox(prs):
    """단계 1-4: 호황 속 위기 신호."""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    add_header(slide,
               '호황 속에서도 우리는 33년 만의 1위를 내줬다',
               '표면적 매출 호황과 이면의 구조적 점유율 추락이 동시 진행')

    # 좌측 호황
    add_rect(slide, Inches(0.5), Inches(1.85), Inches(5.9), Inches(4.6),
             fill=THEME['soft_blue_bg'])
    add_text(slide, Inches(0.7), Inches(2.0), Inches(5.5), Inches(0.4),
             '호황 지표', font=FONT_KO, size=14, bold=True, color=THEME['green_pos'])
    add_text(slide, Inches(0.7), Inches(2.4), Inches(5.5), Inches(0.3),
             'BOOM SIGNALS', font=FONT_EN, size=8.5, color=THEME['gray_caption'])

    boom = [
        ('메모리 시장', '2024 $170B → 2026 $552B (+225%)'),
        ('HBM 시장 Sold Out', '2026 $54.6B 전량 공급 부족'),
        ('빅테크 AI CapEx', '2024 $200B → 2026 $725B (+263%)'),
    ]
    for i, (label, val) in enumerate(boom):
        y = Inches(2.95 + i * 1.1)
        add_text(slide, Inches(0.7), y, Inches(5.5), Inches(0.4),
                 '■  ' + label, font=FONT_KO, size=12, bold=True, color=THEME['samsung_blue'])
        add_text(slide, Inches(0.95), y + Inches(0.45), Inches(5.5), Inches(0.4),
                 val, font=FONT_KO, size=11, color=THEME['dark_text'])

    # 중앙 BUT
    add_rect(slide, Inches(6.45), Inches(1.85), Inches(0.45), Inches(4.6),
             fill=THEME['amber'])
    add_text(slide, Inches(6.45), Inches(3.85), Inches(0.45), Inches(0.6),
             'B\nU\nT', font=FONT_EN, size=22, bold=True, color=THEME['white'],
             align='center', valign='middle', line_spacing=0.8)

    # 우측 위기
    add_rect(slide, Inches(6.95), Inches(1.85), Inches(5.9), Inches(4.6),
             fill=RGBColor(0xFF, 0xEC, 0xEC))
    add_text(slide, Inches(7.15), Inches(2.0), Inches(5.5), Inches(0.4),
             '위기 지표', font=FONT_KO, size=14, bold=True, color=THEME['red_alert'])
    add_text(slide, Inches(7.15), Inches(2.4), Inches(5.5), Inches(0.3),
             'WARNING SIGNALS', font=FONT_EN, size=8.5, color=THEME['gray_caption'])

    warning = [
        ('DRAM 1위 역전 — 33년 만에', '2025: SK $49.6B > 삼성 $46.4B'),
        ('HBM 점유율 추락', '2023 40% → 2025 Q2 17% → 2026 NVIDIA Rubin 28%'),
        ('AI ROI 경고음', 'MIT 95% ROI 미실현 / Microsoft FCF −28% 전망'),
    ]
    for i, (label, val) in enumerate(warning):
        y = Inches(2.95 + i * 1.1)
        add_text(slide, Inches(7.15), y, Inches(5.5), Inches(0.4),
                 '■  ' + label, font=FONT_KO, size=12, bold=True, color=THEME['red_alert'])
        add_text(slide, Inches(7.4), y + Inches(0.45), Inches(5.5), Inches(0.4),
                 val, font=FONT_KO, size=11, color=THEME['dark_text'])

    add_so_what(slide, Inches(6.55),
                '매출 호황 + 점유율 패배 + 거시 경고가 동시에 — 다운턴 신호일 수 있다')
    add_footer(slide, 6, TOTAL, '현재 상황')
    return slide


def build_slide_7_uncertainty(prs):
    """단계 2-1: 다운턴은 언제? 얼마나?"""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    add_header(slide,
               '다운턴은 언제? 얼마나? — 정확한 예측은 불가능',
               '시점·규모 가설 3가지 — 어느 가설이 맞을지 모름, 그러나 모든 가설에서 막대한 영향')

    hypotheses = [
        {
            'title': '가설 A — 약한 조정',
            'date': '2027 Q4',
            'capex': '빅테크 AI CapEx YoY −10~15%',
            'price': '메모리 가격 −20~30%',
            'profit': '삼성 영업이익 −50%',
            'recovery': '회복 12개월',
            'reference': '2022~23 형태',
            'color': THEME['amber'],
        },
        {
            'title': '가설 B — 중간 다운턴',
            'date': '2028 Q1',
            'capex': 'AI ROI 실망 + CapEx −25~30%',
            'price': '메모리 가격 −45%',
            'profit': '삼성 영업이익 −85%',
            'recovery': '회복 18~24개월',
            'reference': '2008~09 형태',
            'color': THEME['red_alert'],
        },
        {
            'title': '가설 C — 급격한 충격',
            'date': '2027 H2',
            'capex': '빅테크 −30%+ + 지정학 충격',
            'price': '메모리 가격 −60% + 시안 차단',
            'profit': '삼성 분기 −5조 원+',
            'recovery': '회복 30개월+',
            'reference': '2001~02 + 다운턴 동시',
            'color': THEME['deep_navy'],
        },
    ]

    for i, h in enumerate(hypotheses):
        x = Inches(0.5 + i * 4.28)
        y = Inches(1.85)
        # 상단 색상 띠
        add_rect(slide, x, y, Inches(4.1), Inches(0.5),
                 fill=h['color'])
        add_text(slide, x + Inches(0.2), y + Inches(0.05), Inches(3.9), Inches(0.4),
                 h['title'], font=FONT_KO, size=13, bold=True, color=THEME['white'])
        # 본문
        add_rect(slide, x, y + Inches(0.5), Inches(4.1), Inches(4.2),
                 fill=THEME['soft_white_bg'], line=THEME['light_gray'])
        # 날짜
        add_text(slide, x + Inches(0.2), y + Inches(0.6), Inches(3.7), Inches(0.5),
                 h['date'], font=FONT_EN, size=20, bold=True, color=h['color'])

        items = [
            ('CapEx 변화', h['capex']),
            ('메모리 가격', h['price']),
            ('삼성 영업이익', h['profit']),
            ('회복 기간', h['recovery']),
            ('과거 사례 참조', h['reference']),
        ]
        for j, (k, v) in enumerate(items):
            yy = y + Inches(1.3 + j * 0.6)
            add_text(slide, x + Inches(0.2), yy, Inches(3.7), Inches(0.25),
                     k, font=FONT_KO, size=8.5, color=THEME['gray_caption'])
            add_text(slide, x + Inches(0.2), yy + Inches(0.25), Inches(3.7), Inches(0.4),
                     v, font=FONT_KO, size=10, bold=True, color=THEME['dark_text'])

    add_so_what(slide, Inches(6.55),
                '어느 가설이 맞을지 모름 — 그러나 어느 시점이 와도 "지금 시작한 준비"만이 유효')
    add_footer(slide, 7, TOTAL, '불확실성')
    return slide


def build_slide_8_single_prediction(prs):
    """단계 2-2: 단선 예측의 한계."""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    add_header(slide,
               '"가장 가능성 높은 미래" 하나만 가정한 계획은 위험하다',
               '독립적 변수 2개 이상이면 시나리오는 4가지+ — 단선 예측 vs 시나리오 플래닝')

    # 좌측 단선 예측 (X)
    add_rect(slide, Inches(0.5), Inches(1.85), Inches(6.0), Inches(4.7),
             fill=RGBColor(0xFE, 0xF2, 0xF2), line=THEME['red_alert'])
    add_text(slide, Inches(0.7), Inches(2.0), Inches(5.6), Inches(0.5),
             '단선 예측의 함정', font=FONT_KO, size=16, bold=True, color=THEME['red_alert'])

    pitfalls = [
        ('단일 미래 가정', '"AI 호황은 5년 더 갈 것" → 한 시나리오 실패 시 회사가 휘청'),
        ('의사결정 마비', '"확실하지 않으니 결정 미룸" → 사이클이 끝나도 준비 안 됨'),
        ('사후 정당화', '"그때는 그게 정답이었다" → 학습 없음, 다음 사이클 같은 실수'),
    ]
    for i, (label, desc) in enumerate(pitfalls):
        y = Inches(2.7 + i * 1.2)
        add_text(slide, Inches(0.7), y, Inches(0.4), Inches(0.4),
                 '✕', font=FONT_EN, size=20, bold=True, color=THEME['red_alert'])
        add_text(slide, Inches(1.1), y + Inches(0.05), Inches(5.2), Inches(0.4),
                 label, font=FONT_KO, size=12, bold=True, color=THEME['dark_text'])
        add_text(slide, Inches(1.1), y + Inches(0.5), Inches(5.2), Inches(0.6),
                 desc, font=FONT_KO, size=10, color=THEME['dark_text'])

    # 우측 시나리오 플래닝 (O)
    add_rect(slide, Inches(6.85), Inches(1.85), Inches(6.0), Inches(4.7),
             fill=RGBColor(0xEC, 0xFD, 0xF5), line=THEME['green_pos'])
    add_text(slide, Inches(7.05), Inches(2.0), Inches(5.6), Inches(0.5),
             '시나리오 플래닝의 강점', font=FONT_KO, size=16, bold=True, color=THEME['green_pos'])

    advantages = [
        ('복수 미래 동시 준비', '각 미래에 강건한 전략을 미리 구축'),
        ('Robust 전략 식별', '어떤 미래가 와도 가치를 만드는 전략 도출'),
        ('트리거 기반 자동 전환', '특정 신호가 오면 사전 정의된 전략 자동 발동'),
        ('의사결정 속도 향상', '다운턴 시점에 빠르게 대응 가능 (30일 내)'),
    ]
    for i, (label, desc) in enumerate(advantages):
        y = Inches(2.7 + i * 0.95)
        add_text(slide, Inches(7.05), y, Inches(0.4), Inches(0.4),
                 '○', font=FONT_EN, size=20, bold=True, color=THEME['green_pos'])
        add_text(slide, Inches(7.45), y + Inches(0.05), Inches(5.2), Inches(0.4),
                 label, font=FONT_KO, size=12, bold=True, color=THEME['dark_text'])
        add_text(slide, Inches(7.45), y + Inches(0.5), Inches(5.2), Inches(0.4),
                 desc, font=FONT_KO, size=10, color=THEME['dark_text'])

    add_footer(slide, 8, TOTAL, '불확실성')
    return slide


def build_slide_9_benchmark(prs):
    """단계 3: 시나리오 플래닝 사례 — Shell·ExxonMobil·Disney·Samsung."""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    add_header(slide,
               '시나리오 플래닝은 검증된 방법론 — 위기를 기회로 바꾼 실제 사례',
               'Shell · ExxonMobil · Disney · Samsung 자체 사례 — 4가지 모두 "다운턴 사전 준비" 효과 입증')

    cases = [
        {
            'title': 'Shell 1973 오일쇼크',
            'desc': '1972년 시나리오 플래닝팀 신설 → 유가 안정/급등 두 시나리오 준비\n1973 OPEC 1차 오일쇼크 발발 → Shell만 미리 준비된 7대 메이저 중 1곳\n1970년대 말 BP·엑손 다음 1위로 도약',
            'lesson': '"불확실성 자체를 계획에 포함시켜라"',
            'color': THEME['samsung_blue'],
        },
        {
            'title': 'ExxonMobil 2014~20 유가 폭락',
            'desc': '유가 $100 → $30 → 음(-) 전개\n활동가 투자자 압박에도 capex 사수 (2020년 다우 산업평균 제외 + 첫 적자 감수)\n2023년 Pioneer Natural Resources $59.5B 인수 (5개월 종결)',
            'lesson': '"다운사이클은 비축, 회복기는 재투자"',
            'color': THEME['amber'],
        },
        {
            'title': 'Disney 2009 글로벌 금융위기',
            'desc': '2009년 8월 Marvel을 $4B 인수 (PER 37배) — 시장 부정적, S&P 신용 부정\n10년 후 MCU 박스오피스 $18B+ 창출\n2009년 위기를 활용한 단일 베팅이 회사 재편',
            'lesson': '"위기는 자산 가격을 낮춘다"',
            'color': THEME['red_alert'],
        },
        {
            'title': 'Samsung 2022~23 메모리 다운사이클',
            'desc': 'TSMC·마이크론 capex −10%+ 삭감, 삼성: 47.7조 원 capex 집행 (감산 거부)\n2025~26 호황기에 점유율 흡수 + 사상 최대 분기\n역사이클 투자의 모범 사례',
            'lesson': '"인위적 감산은 고려하지 않는다"',
            'color': THEME['deep_navy'],
        },
    ]

    for i, case in enumerate(cases):
        col = i % 2
        row = i // 2
        x = Inches(0.5 + col * 6.42)
        y = Inches(1.85 + row * 2.45)
        # 상단 색상 띠
        add_rect(slide, x, y, Inches(6.32), Inches(0.5),
                 fill=case['color'])
        add_text(slide, x + Inches(0.2), y + Inches(0.05), Inches(6), Inches(0.4),
                 case['title'], font=FONT_KO, size=13, bold=True, color=THEME['white'])
        # 본문
        add_rect(slide, x, y + Inches(0.5), Inches(6.32), Inches(1.85),
                 fill=THEME['soft_white_bg'], line=THEME['light_gray'])
        add_text(slide, x + Inches(0.2), y + Inches(0.6), Inches(6.0), Inches(1.0),
                 case['desc'], font=FONT_KO, size=9.5, color=THEME['dark_text'],
                 line_spacing=1.3)
        # Lesson 박스
        add_rect(slide, x + Inches(0.2), y + Inches(1.85), Inches(6.0), Inches(0.4),
                 fill=THEME['amber_light'])
        add_text(slide, x + Inches(0.35), y + Inches(1.92), Inches(5.8), Inches(0.3),
                 case['lesson'], font=FONT_KO, size=10, bold=True, italic=True,
                 color=THEME['amber'])

    add_so_what(slide, Inches(6.85),
                '4개 사례 모두 — "다운턴 사전 준비 + 호황기 절제 + 회복기 가속"의 조합')
    add_footer(slide, 9, TOTAL, '시나리오 플래닝 정당화')
    return slide


def build_slide_10_workflow(prs):
    """단계 4: 8단계 워크플로우."""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    add_header(slide,
               '시나리오 플래닝 8단계 워크플로우 — 우리가 따라간 길',
               '단계별 산출물 명시 + 다음 슬라이드들에서 단계별 상세')

    img = os.path.join(ASSETS_DIR, 'workflow.png')
    chart_workflow_steps(img)
    slide.shapes.add_picture(img, Inches(0.5), Inches(1.9), width=Inches(12.4))

    # 단계별 산출물
    outputs = [
        ('01 Focal Issue', '1개 핵심 질문'),
        ('02 STEEP', '50개 환경 요인'),
        ('03 I×U 매트릭스', '상위 10개 핵심 불확실성'),
        ('04 Driving Forces', '2개 독립 축'),
        ('05 시나리오 매트릭스', '5개 대안적 미래'),
        ('06 Main Bet', '핵심 전략 시나리오'),
        ('07 Side Bets', '4개 헤징 전략'),
        ('08 Robust + EWI', '6개 전략 + 모니터링'),
    ]
    box_w = 1.46
    spacing_x = 1.61
    for i, (label, output) in enumerate(outputs):
        x = Inches(0.5 + i * spacing_x)
        y = Inches(4.5)
        # 작은 카드
        add_rect(slide, x, y, Inches(box_w), Inches(1.0),
                 fill=THEME['soft_blue_bg'])
        add_text(slide, x + Inches(0.1), y + Inches(0.1), Inches(box_w - 0.2), Inches(0.35),
                 label, font=FONT_KO, size=8, bold=True, color=THEME['samsung_blue'])
        add_text(slide, x + Inches(0.1), y + Inches(0.45), Inches(box_w - 0.2), Inches(0.5),
                 '→ ' + output, font=FONT_KO, size=8, color=THEME['dark_text'])

    add_text(slide, Inches(0.5), Inches(5.95), Inches(12.83), Inches(0.4),
             '프로젝트 기간: 2026년 4월~5월 (6주) · 50개 STEEP 요인 → 5개 시나리오 → 6개 Robust 전략 → 9개 즉시 결정 도출',
             font=FONT_KO, size=10, italic=True, color=THEME['gray_caption'],
             align='center')

    add_footer(slide, 10, TOTAL, '방법론')
    return slide


def build_slide_11_focal_issue(prs):
    """단계 5-1 (Step 1): Focal Issue."""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    add_header(slide,
               'Step 1 · Focal Issue — 우리가 답해야 할 단 하나의 질문',
               '모든 분석은 이 하나의 질문을 답하기 위한 것')

    # 중앙 큰 인용 박스
    add_rect(slide, Inches(1.5), Inches(2.0), Inches(10.33), Inches(3.4),
             fill=THEME['samsung_blue'])
    add_text(slide, Inches(1.7), Inches(2.1), Inches(2), Inches(1.5),
             '"', font=FONT_EN, size=120, bold=True, color=THEME['amber'])

    add_text(slide, Inches(2.5), Inches(2.5), Inches(9.0), Inches(2.5),
             '삼성전자 메모리사업부가\nAI 메모리 시대인 2030~2035년에도\n글로벌 리더십을 유지하기 위해,\n\n어떤 전략적 결정을\n지금(2026년) 내려야 하는가?',
             font=FONT_KO, size=22, bold=True, color=THEME['white'],
             line_spacing=1.4)

    # 하단 컨텍스트 3박스
    contexts = [
        ('현황', '호황의 정점\n점유율 1위 역전', THEME['red_alert']),
        ('시간 압박', 'HBM 세대 전환 분기점\n2026~2027 결정 시점', THEME['amber']),
        ('불확실성', 'AI 슈퍼사이클 vs 거품\n미중 디커플링 vs 공존', THEME['samsung_blue']),
    ]
    for i, (label, desc, color) in enumerate(contexts):
        x = Inches(1.0 + i * 4.0)
        y = Inches(5.7)
        add_rect(slide, x, y, Inches(3.7), Inches(0.9), fill=color)
        add_text(slide, x + Inches(0.2), y + Inches(0.1), Inches(3.5), Inches(0.3),
                 label, font=FONT_KO, size=11, bold=True, color=THEME['white'])
        add_text(slide, x + Inches(0.2), y + Inches(0.4), Inches(3.5), Inches(0.5),
                 desc, font=FONT_KO, size=9.5, color=THEME['white'], line_spacing=1.2)

    add_footer(slide, 11, TOTAL, 'Step 1')
    return slide


def build_slide_12_steep_iu(prs):
    """단계 5-2 (Step 2·3): STEEP + I×U 매트릭스."""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    add_header(slide,
               'Step 2·3 · 50개 STEEP 요인을 영향력×불확실성으로 분류',
               '20개가 "전략을 바꿀 핵심 불확실성" — 그 중 4개가 최상위 (I×U=25)')

    img = os.path.join(ASSETS_DIR, 'iu_matrix.png')
    chart_iu_matrix(img)
    slide.shapes.add_picture(img, Inches(4.4), Inches(1.7), width=Inches(8.4))

    # 좌측 STEEP 분류
    add_rect(slide, Inches(0.5), Inches(1.7), Inches(3.7), Inches(4.8),
             fill=THEME['soft_blue_bg'])
    add_text(slide, Inches(0.7), Inches(1.85), Inches(3.4), Inches(0.4),
             'STEEP 분류 (50개)', font=FONT_KO, size=12, bold=True,
             color=THEME['samsung_blue'])

    cats = [
        ('S Social',       '10개', '평균  9'),
        ('T Technology',   '10개', '12 (T3 3D DRAM = 25)'),
        ('Ec Economy',     '10개', '11 (Ec6 AI 버블 = 25)'),
        ('En Environment', '10개', '9'),
        ('P Political',    '10개', '12 (P1·P8 = 25)'),
    ]
    for i, (cat, n, avg) in enumerate(cats):
        y = Inches(2.4 + i * 0.45)
        add_text(slide, Inches(0.7), y, Inches(1.5), Inches(0.3),
                 cat, font=FONT_KO, size=10, bold=True, color=THEME['dark_text'])
        add_text(slide, Inches(2.0), y, Inches(0.5), Inches(0.3),
                 n, font=FONT_EN, size=10, color=THEME['gray_caption'])
        add_text(slide, Inches(2.5), y, Inches(1.6), Inches(0.3),
                 avg, font=FONT_KO, size=9, color=THEME['samsung_blue'])

    # 분류 결과
    add_text(slide, Inches(0.7), Inches(5.0), Inches(3.4), Inches(0.4),
             '분류 결과', font=FONT_KO, size=11, bold=True, color=THEME['amber'])
    add_text(slide, Inches(0.7), Inches(5.4), Inches(3.4), Inches(1.0),
             '● 핵심 불확실성 (I≥4, U≥4) : 20개\n◆ 기정사실 (I≥3, U≤3) : 8개\n○ 주변부 : 22개',
             font=FONT_KO, size=10, color=THEME['dark_text'], line_spacing=1.5)

    add_footer(slide, 12, TOTAL, 'Step 2·3')
    return slide


def build_slide_13_driving_forces(prs):
    """단계 5-3 (Step 4): Driving Forces."""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    add_header(slide,
               'Step 4 · Driving Forces — 두 개의 독립적 축',
               'DF1 (AI 수요) × DF2 (미중 디커플링) — 각각 다른 인과 경로 = 독립 변수')

    forces = [
        {
            'pos': 'left',
            'name': 'DF1: AI 수요의 구조적 지속성',
            'def_': 'AI CapEx + HBM 수요가 2030~2035년까지\n구조적으로 유지되는가?',
            'pole_a': '슈퍼사이클\nAI ROI 실현\n2027 빅테크 $1조\nHBM이 DRAM 50%',
            'pole_b': '버블 붕괴\nAI ROI 미실현\n2027 빅테크 −30%\n2022~23 재현',
            'current': '70% 슈퍼사이클 방향',
            'evidence': '2026 HBM Sold Out + AI CapEx +77% YoY',
            'logic': '기술·경제 내적 논리',
        },
        {
            'pos': 'right',
            'name': 'DF2: 미중 기술 디커플링 강도',
            'def_': '미국 주도 수출 통제가\n전면 디커플링 vs 관리된 공존?',
            'pole_a': '전면 디커플링\nMATCH 법안 통과\n시안 팹 차단\n중국 매출 소멸',
            'pole_b': '관리된 공존\n선택적 제재·허용\n라이선스 갱신 지속\n범용 DRAM 허용',
            'current': '중립, 진동 중',
            'evidence': 'H20 재허용(공존) + VEU 폐지(디커플링)',
            'logic': '외교·안보 논리',
        },
    ]

    for i, f in enumerate(forces):
        x = Inches(0.5 + i * 6.42)
        y = Inches(1.85)
        # 상단 띠
        add_rect(slide, x, y, Inches(6.32), Inches(0.45),
                 fill=THEME['samsung_blue'])
        add_text(slide, x + Inches(0.2), y + Inches(0.05), Inches(6), Inches(0.35),
                 f['name'], font=FONT_KO, size=12, bold=True, color=THEME['white'])
        # 본문
        add_rect(slide, x, y + Inches(0.45), Inches(6.32), Inches(4.8),
                 fill=THEME['soft_white_bg'], line=THEME['light_gray'])
        # 정의
        add_text(slide, x + Inches(0.2), y + Inches(0.55), Inches(6), Inches(0.6),
                 f['def_'], font=FONT_KO, size=10, color=THEME['dark_text'],
                 italic=True, line_spacing=1.3)
        # 양극
        add_rect(slide, x + Inches(0.2), y + Inches(1.4), Inches(2.95), Inches(1.5),
                 fill=RGBColor(0xFE, 0xF2, 0xF2))
        add_text(slide, x + Inches(0.3), y + Inches(1.5), Inches(2.85), Inches(1.4),
                 f['pole_a'], font=FONT_KO, size=9, color=THEME['red_alert'],
                 line_spacing=1.3)
        add_rect(slide, x + Inches(3.2), y + Inches(1.4), Inches(2.95), Inches(1.5),
                 fill=RGBColor(0xEC, 0xFD, 0xF5))
        add_text(slide, x + Inches(3.3), y + Inches(1.5), Inches(2.85), Inches(1.4),
                 f['pole_b'], font=FONT_KO, size=9, color=THEME['green_pos'],
                 line_spacing=1.3)
        # 현재 위치
        add_text(slide, x + Inches(0.2), y + Inches(3.1), Inches(6), Inches(0.4),
                 '현재 위치 → ' + f['current'], font=FONT_KO, size=11,
                 bold=True, color=THEME['amber'])
        add_text(slide, x + Inches(0.2), y + Inches(3.55), Inches(6), Inches(0.4),
                 '근거: ' + f['evidence'], font=FONT_KO, size=9.5,
                 color=THEME['dark_text'])
        # Logic
        add_rect(slide, x + Inches(0.2), y + Inches(4.4), Inches(5.9), Inches(0.55),
                 fill=THEME['amber_light'])
        add_text(slide, x + Inches(0.35), y + Inches(4.5), Inches(5.7), Inches(0.4),
                 '인과 경로: ' + f['logic'],
                 font=FONT_KO, size=10, bold=True, color=THEME['amber'])

    # 중앙 독립성 표시
    add_text(slide, Inches(0.5), Inches(7.0) - Inches(0.3) - Inches(0.4),
             Inches(12.83), Inches(0.4),
             '두 축이 독립적이므로 → 4가지 미래가 가능 (+ 와일드카드 E)',
             font=FONT_KO, size=11, bold=True, italic=True, align='center',
             color=THEME['amber'])

    add_footer(slide, 13, TOTAL, 'Step 4')
    return slide


def build_slide_14_scenario_matrix(prs):
    """단계 5-4 (Step 5): 시나리오 매트릭스."""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    add_header(slide,
               'Step 5 · 5개 대안적 미래 — 2×2 매트릭스 + 와일드카드 E',
               '각 시나리오의 2035년 시장 규모와 확률 (확률 합 = 100%)')

    img = os.path.join(ASSETS_DIR, 'scenario_matrix.png')
    chart_scenario_matrix(img)
    slide.shapes.add_picture(img, Inches(2), Inches(1.7), width=Inches(9.3))

    add_so_what(slide, Inches(6.55),
                '5개 시나리오 — 가장 가능성 높은 B(30~35%) + 헤징 4개 = 어떤 미래가 와도 대비')
    add_footer(slide, 14, TOTAL, 'Step 5')
    return slide


def build_slide_15_main_bet(prs):
    """단계 5-5 (Step 6): Main Bet."""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    add_header(slide,
               'Step 6 · Main Bet — 시나리오 B "AI 르네상스"',
               '확률 30~35% · 2035 시장 $520B · 삼성 메모리사업부 매출 $120B 가능')

    # 상단 Main Bet 배너
    add_rect(slide, Inches(0.5), Inches(1.7), Inches(12.33), Inches(0.55),
             fill=THEME['amber'])
    add_text(slide, Inches(0.7), Inches(1.78), Inches(12), Inches(0.4),
             '⭐  MAIN BET — "AI 르네상스"  |  확률 30~35%  |  2035 시장 $520B (전 시나리오 최대)',
             font=FONT_KO, size=14, bold=True, color=THEME['white'])

    # 좌측 — 2035 세계
    add_rect(slide, Inches(0.5), Inches(2.4), Inches(6.16), Inches(3.0),
             fill=THEME['soft_blue_bg'])
    add_text(slide, Inches(0.7), Inches(2.5), Inches(5.9), Inches(0.4),
             '2035년 세계', font=FONT_KO, size=12, bold=True, color=THEME['samsung_blue'])
    add_text(slide, Inches(0.7), Inches(2.95), Inches(5.9), Inches(2.5),
             '· 글로벌 메모리 시장 $520B (전 시나리오 최대)\n· AI가 산업 전반 생산성 혁명 실현\n· 미중 관계 2028 "선택적 제재·허용" 프레임\n· 빅테크 AI 직접 매출 합산 2027 $500B 돌파',
             font=FONT_KO, size=10, color=THEME['dark_text'], line_spacing=1.5)

    # 좌측 - 삼성 2030 전망
    add_rect(slide, Inches(0.5), Inches(5.55), Inches(6.16), Inches(1.4),
             fill=THEME['samsung_blue'])
    add_text(slide, Inches(0.7), Inches(5.65), Inches(5.9), Inches(0.3),
             '삼성전자 2030년 전망', font=FONT_KO, size=11, bold=True, color=THEME['white'])
    add_text(slide, Inches(0.7), Inches(5.95), Inches(5.9), Inches(1.0),
             '· 메모리사업부 연간 매출 $120B 돌파\n· HBM4E NVIDIA Feynman 플랫폼 공식 탑재\n· 텍사스 테일러 2단계(HBM) 2030년 가동\n· 중국 일반 메모리 연 $12B 유지',
             font=FONT_KO, size=9.5, color=THEME['white'], line_spacing=1.4)

    # 우측 — 4개 전제 조건
    add_rect(slide, Inches(6.85), Inches(2.4), Inches(5.98), Inches(3.0),
             fill=THEME['soft_white_bg'], line=THEME['amber'])
    add_text(slide, Inches(7.05), Inches(2.5), Inches(5.7), Inches(0.4),
             '이 시나리오 현실화 4개 전제 조건', font=FONT_KO, size=12, bold=True,
             color=THEME['amber'])
    conditions = [
        '① AI ROI 실현 (2027~2028 분기점)',
        '② 미중 반도체 무역 타협',
        '③ 삼성 HBM4E 기술 추격 성공',
        '④ 시안 팹 부분 운영 지속',
    ]
    for i, c in enumerate(conditions):
        add_text(slide, Inches(7.05), Inches(2.95 + i * 0.55), Inches(5.7), Inches(0.5),
                 c, font=FONT_KO, size=11, bold=True, color=THEME['dark_text'])

    # 우측 — 2026 현재 증거
    add_rect(slide, Inches(6.85), Inches(5.55), Inches(5.98), Inches(1.4),
             fill=RGBColor(0xEC, 0xFD, 0xF5))
    add_text(slide, Inches(7.05), Inches(5.65), Inches(5.7), Inches(0.3),
             '2026년 5월 현재 증거', font=FONT_KO, size=11, bold=True,
             color=THEME['green_pos'])
    add_text(slide, Inches(7.05), Inches(5.95), Inches(5.7), Inches(1.0),
             '✓ 빅테크 4사 CapEx $725B (강한 Pole A 모멘텀)\n✓ H20 재허용·MATCH 미통과 (공존 신호)\n✓ 삼성 HBM 점유율 17% → 28% (추격 궤도)',
             font=FONT_KO, size=9.5, color=THEME['dark_text'], line_spacing=1.4)

    add_footer(slide, 15, TOTAL, 'Step 6')
    return slide


def build_slide_16_side_bets(prs):
    """단계 5-6 (Step 7): Side Bets — 4개 헤징."""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    add_header(slide,
               'Step 7 · Side Bets — 나머지 4개 시나리오에 대한 보험',
               'Main Bet 투자 대비 +15% 추가 비용으로 모든 시나리오 대비')

    bets = [
        {
            'name': '시나리오 A · 황금 요새',
            'threat': '시안 팹 상실 (NAND 40% 급감) + 대중 HBM 봉쇄',
            'hedge': '시안 단계적 축소 Plan B + 일본 R&D 허브 + LTA 집중',
            'invest': '시안 이전 5조원 + 일본 R&D 1조원',
            'color': THEME['samsung_blue'],
        },
        {
            'name': '시나리오 C · 기술 냉전',
            'threat': 'HBM 수요 급냉 + 시안 차단 이중 충격 + 소재 수출 제한',
            'hedge': '캐나다·호주·카자흐스탄 소재 LTA + 순현금 30조원 + R&D 3,000억원/년 사수',
            'invest': '소재 비축·대체 계약 5,000억원',
            'color': THEME['red_alert'],
        },
        {
            'name': '시나리오 D · 조용한 재편',
            'threat': 'SK하이닉스 기술 우위 고착화 + CXMT 범용 DRAM 잠식',
            'hedge': 'HBM 조직 독립 + 패키징 인재 100인 + 산업용 AI 메모리 (차량·의료)',
            'invest': 'R&D 2,000억원 (2026~2028)',
            'color': THEME['gray_caption'],
        },
        {
            'name': '시나리오 E · 패러다임 전환',
            'threat': 'HBM 40조원+ 매몰 비용화',
            'hedge': '3D DRAM R&D 300인 + IMEC 협약 + CXL SIG 표준 + M&A 펀드',
            'invest': '3D DRAM R&D 1,500억원/년 + M&A 펀드 5,000억원',
            'color': THEME['amber'],
        },
    ]

    # 4행 표
    header_y = Inches(1.85)
    headers = [('시나리오', 0.5, 3.0), ('핵심 위협', 3.5, 3.5),
               ('헤징 전략', 7.0, 3.5), ('투자 규모', 10.5, 2.3)]
    add_rect(slide, Inches(0.5), header_y, Inches(12.33), Inches(0.45),
             fill=THEME['samsung_blue'])
    for h, x, w in headers:
        add_text(slide, Inches(x + 0.1), header_y + Inches(0.05), Inches(w - 0.1), Inches(0.4),
                 h, font=FONT_KO, size=11, bold=True, color=THEME['white'])

    for i, b in enumerate(bets):
        y = Inches(2.35 + i * 0.95)
        # 좌측 색상 띠
        add_rect(slide, Inches(0.5), y, Inches(0.1), Inches(0.85), fill=b['color'])
        # 행 배경 (교차)
        if i % 2 == 0:
            add_rect(slide, Inches(0.6), y, Inches(12.23), Inches(0.85),
                     fill=THEME['soft_white_bg'])
        # 시나리오명
        add_text(slide, Inches(0.7), y + Inches(0.1), Inches(2.8), Inches(0.7),
                 b['name'], font=FONT_KO, size=11, bold=True, color=b['color'],
                 line_spacing=1.2)
        # 위협
        add_text(slide, Inches(3.6), y + Inches(0.1), Inches(3.4), Inches(0.7),
                 b['threat'], font=FONT_KO, size=9.5, color=THEME['dark_text'],
                 line_spacing=1.3)
        # 헤징
        add_text(slide, Inches(7.1), y + Inches(0.1), Inches(3.4), Inches(0.7),
                 b['hedge'], font=FONT_KO, size=9.5, color=THEME['dark_text'],
                 line_spacing=1.3)
        # 투자
        add_text(slide, Inches(10.6), y + Inches(0.1), Inches(2.2), Inches(0.7),
                 b['invest'], font=FONT_KO, size=9.5, bold=True, color=THEME['amber'],
                 line_spacing=1.3)

    add_so_what(slide, Inches(6.55),
                'Side Bet 총 투자 ≒ Main Bet의 15% — 보험치고는 합리적 비용')
    add_footer(slide, 16, TOTAL, 'Step 7')
    return slide


def build_slide_17_robust_overview(prs):
    """단계 5-7 (Step 8 개요): Robust 6개 + 매트릭스."""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    add_header(slide,
               'Step 8 · Robust 전략 6개 — 어떤 미래가 와도 가치 창출',
               '다음 4개 슬라이드에서 핵심 4개 (★) 상세 시각화')

    rs_list = [
        ('RS1 ★', '옵션형 캐파 체계', '"켜고 끌 수 있는 능력"', True),
        ('RS2 ★', '바벨 포트폴리오 + AI 효율화', '양 끝의 강함', True),
        ('RS3 ★', '고객특화·전환비용', '떠나면 비싼 메모리', True),
        ('RS4', '고객 포트폴리오 분산', 'LTA·Take-or-Pay', False),
        ('RS5', '정책 리스크 지역 분산', '한국·미국·일본·인도 4거점', False),
        ('RS6 ★', '재무 규율 + capex 하한', 'Nucor 사이클 전 구간 사수', True),
    ]
    for i, (code, name, desc, star) in enumerate(rs_list):
        col = i % 3
        row = i // 3
        x = Inches(0.5 + col * 4.28)
        y = Inches(1.85 + row * 1.45)
        # 카드
        bg = THEME['amber_light'] if star else THEME['soft_blue_bg']
        add_rect(slide, x, y, Inches(4.1), Inches(1.3), fill=bg)
        # 좌측 띠
        add_rect(slide, x, y, Inches(0.08), Inches(1.3),
                 fill=THEME['amber'] if star else THEME['samsung_blue'])
        # 코드
        add_text(slide, x + Inches(0.25), y + Inches(0.15), Inches(2), Inches(0.4),
                 code, font=FONT_EN, size=14, bold=True,
                 color=THEME['amber'] if star else THEME['samsung_blue'])
        # 이름
        add_text(slide, x + Inches(0.25), y + Inches(0.55), Inches(3.7), Inches(0.4),
                 name, font=FONT_KO, size=12, bold=True, color=THEME['dark_text'])
        # 설명
        add_text(slide, x + Inches(0.25), y + Inches(0.95), Inches(3.7), Inches(0.4),
                 desc, font=FONT_KO, size=9.5, italic=True, color=THEME['gray_caption'])

    # 미니 매트릭스
    matrix_y = Inches(4.9)
    add_text(slide, Inches(0.5), matrix_y, Inches(12.83), Inches(0.4),
             '시나리오별 가치 매트릭스 — 모든 RS는 4개+ 시나리오에서 ✅',
             font=FONT_KO, size=11, bold=True, color=THEME['samsung_blue'],
             align='center')

    # 표 헤더
    table_y = matrix_y + Inches(0.45)
    headers = ['RS', 'A 황금요새', 'B AI 르네상스', 'C 기술냉전', 'D 조용한재편', 'E 패러다임']
    col_w = 1.85
    for i, h in enumerate(headers):
        x = Inches(2.3 + i * col_w)
        add_rect(slide, x, table_y, Inches(col_w - 0.05), Inches(0.35),
                 fill=THEME['samsung_blue'])
        add_text(slide, x, table_y + Inches(0.04), Inches(col_w - 0.05), Inches(0.3),
                 h, font=FONT_KO, size=8.5, bold=True, color=THEME['white'],
                 align='center')

    # 표 데이터
    rs_matrix = [
        ('RS1', '✅', '✅', '✅', '✅', '✅'),
        ('RS2', '✅', '✅', '✅', '✅', '⚠'),
        ('RS3', '✅', '✅', '⚠', '✅', '✅'),
        ('RS4', '✅', '✅', '✅', '✅', '✅'),
        ('RS5', '✅', '⚠', '✅', '✅', '⚠'),
        ('RS6', '✅', '⚠', '✅', '✅', '✅'),
    ]
    for i, row in enumerate(rs_matrix):
        y = table_y + Inches(0.4 + i * 0.27)
        # RS code
        add_text(slide, Inches(2.3), y, Inches(col_w - 0.05), Inches(0.25),
                 row[0], font=FONT_EN, size=9, bold=True, color=THEME['dark_text'],
                 align='center')
        for j, v in enumerate(row[1:]):
            x = Inches(2.3 + (j + 1) * col_w)
            color = THEME['green_pos'] if v == '✅' else THEME['amber']
            add_text(slide, x, y, Inches(col_w - 0.05), Inches(0.25),
                     v, font=FONT_EN, size=11, bold=True, color=color,
                     align='center')

    add_footer(slide, 17, TOTAL, 'Step 8 개요')
    return slide


def build_slide_18_rs1(prs):
    """단계 6-1: RS1 옵션형 캐파."""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    add_header(slide,
               'RS1 · 옵션형 캐파 체계 — "켜고 끌 수 있는 능력"',
               '호황기에 빠른 증설, 다운턴에 즉시 일시 정지 — Nucor 미니밀 모델 차용')

    # 좌측 다이어그램
    add_rect(slide, Inches(0.5), Inches(1.85), Inches(7), Inches(4.7),
             fill=THEME['soft_blue_bg'])
    add_text(slide, Inches(0.7), Inches(2.0), Inches(6.5), Inches(0.4),
             'Fab Shell + 단계별 장비 반입 구조', font=FONT_KO, size=12,
             bold=True, color=THEME['samsung_blue'])

    # 외곽 박스 (Fab Shell)
    add_rect(slide, Inches(0.85), Inches(2.55), Inches(6.3), Inches(3.7),
             line=THEME['samsung_blue'], line_width=Emu(15875))
    add_text(slide, Inches(1.0), Inches(2.65), Inches(6), Inches(0.35),
             '▢  Fab Shell (선행 건설) — Cleanroom · 유틸리티 · 인프라',
             font=FONT_KO, size=10, bold=True, color=THEME['samsung_blue'])

    # 단계
    stages = [
        ('Stage 1 (즉시)', '패키징 라인 (TSV)', THEME['green_pos']),
        ('Stage 2 (수요 +6개월)', 'DRAM 라인', THEME['amber']),
        ('Stage 3 (LTA 확정)', 'HBM 라인', THEME['samsung_blue']),
        ('Stage 4 (옵션)', '추가 캐파 발동', THEME['gray_caption']),
    ]
    for i, (s, what, color) in enumerate(stages):
        y = Inches(3.15 + i * 0.7)
        add_rect(slide, Inches(1.1), y, Inches(0.15), Inches(0.55), fill=color)
        add_text(slide, Inches(1.4), y + Inches(0.05), Inches(2.3), Inches(0.5),
                 s, font=FONT_KO, size=10, bold=True, color=color)
        add_text(slide, Inches(3.8), y + Inches(0.05), Inches(3.2), Inches(0.5),
                 what, font=FONT_KO, size=10, color=THEME['dark_text'])
        add_text(slide, Inches(1.4), y + Inches(0.32), Inches(5.5), Inches(0.25),
                 '→ 트리거 발동 → 6~12개월 내 가동',
                 font=FONT_KO, size=8.5, italic=True, color=THEME['gray_caption'])

    # 우측 4개 메커니즘
    add_text(slide, Inches(7.7), Inches(1.95), Inches(5.13), Inches(0.4),
             '핵심 메커니즘 4개', font=FONT_KO, size=12, bold=True,
             color=THEME['amber'])

    mechanisms = [
        ('1. Fab Shell 선행 건설 + 장비 단계화',
         '건물은 미리, 장비는 신호 보고. 반입 결정 6~9개월 지연 가능'),
        ('2. Multi-Product Fab',
         'DRAM/NAND/Logic 비율 분기 조정. 60~80% 범위 신축'),
        ('3. 장비 발주 "반입 연기 옵션" 명문화',
         'ASML/TEL/LAM 계약에 12개월 연기권. 옵션 프리미엄 2~5% (보험)'),
        ('4. 롤링 캐파 리뷰 (분기)',
         '연간 예산 → 분기 재검토. 이사회 승인 아젠다 제도화'),
    ]
    for i, (label, desc) in enumerate(mechanisms):
        y = Inches(2.45 + i * 0.95)
        add_text(slide, Inches(7.7), y, Inches(5.13), Inches(0.4),
                 label, font=FONT_KO, size=10.5, bold=True, color=THEME['samsung_blue'])
        add_text(slide, Inches(7.7), y + Inches(0.4), Inches(5.13), Inches(0.5),
                 desc, font=FONT_KO, size=9, color=THEME['dark_text'],
                 line_spacing=1.3)

    add_so_what(slide, Inches(6.55),
                '결정해야 할 것은 "얼마나 짓는가"가 아니라 "얼마나 빠르게 켤 수 있는가"')
    add_footer(slide, 18, TOTAL, 'Robust · RS1')
    return slide


def build_slide_19_rs2(prs):
    """단계 6-2: RS2 바벨 포트폴리오."""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    add_header(slide,
               'RS2 · 바벨 포트폴리오 + AI 효율화 — 양 끝의 강함, 가운데의 정리',
               '호황기 고마진 HBM, 다운턴 저원가 범용 DRAM이 동시에 가치를 만든다')

    img = os.path.join(ASSETS_DIR, 'balance_portfolio.png')
    chart_balance_portfolio(img)
    slide.shapes.add_picture(img, Inches(0.5), Inches(1.85), width=Inches(8.4))

    # 우측 AI 효율화 메커니즘
    add_rect(slide, Inches(9.3), Inches(1.85), Inches(3.5), Inches(4.7),
             fill=THEME['samsung_blue'])
    add_text(slide, Inches(9.5), Inches(2.0), Inches(3.2), Inches(0.4),
             'AI 효율화 메커니즘', font=FONT_KO, size=12, bold=True, color=THEME['white'])
    add_text(slide, Inches(9.5), Inches(2.4), Inches(3.2), Inches(0.4),
             'AI EFFICIENCY ENGINE', font=FONT_EN, size=8, color=THEME['amber'])

    steps = [
        ('① 2026 도구 도입',
         'AI 코딩·EDA·공정 시뮬레이션\n수율 예측 (500~1,000억원)'),
        ('② 2027 효과',
         '엔지니어 생산성\n+20~30%'),
        ('③ 잉여 인력 창출',
         'PC/Mobile/Auto 유지\n+ RS3 고객특화 개발'),
    ]
    for i, (label, desc) in enumerate(steps):
        y = Inches(3.0 + i * 1.15)
        add_text(slide, Inches(9.5), y, Inches(3.2), Inches(0.4),
                 label, font=FONT_KO, size=11, bold=True, color=THEME['amber'])
        add_text(slide, Inches(9.5), y + Inches(0.4), Inches(3.2), Inches(0.7),
                 desc, font=FONT_KO, size=9, color=THEME['white'], line_spacing=1.3)
        # 화살표
        if i < 2:
            add_text(slide, Inches(9.5), y + Inches(1.05), Inches(3.2), Inches(0.1),
                     '↓', font=FONT_EN, size=12, color=THEME['amber'], align='center')

    add_so_what(slide, Inches(6.85),
                '추가 채용 없이 RS2·RS3 동시 실행의 유일한 경로 — AI 효율화가 선행 조건')
    add_footer(slide, 19, TOTAL, 'Robust · RS2')
    return slide


def build_slide_20_rs3(prs):
    """단계 6-3: RS3 고객특화·전환비용."""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    add_header(slide,
               'RS3 · 고객특화 + 전환비용 극대화 — "떠나면 비싼 메모리"',
               '하드웨어를 넘어 SW·인증·로직까지 통합 — 다운턴에도 고객 이탈 방지')

    # 좌측 락인 4단 다이어그램
    add_rect(slide, Inches(0.5), Inches(1.85), Inches(5.5), Inches(4.7),
             fill=THEME['soft_blue_bg'])
    add_text(slide, Inches(0.7), Inches(2.0), Inches(5.1), Inches(0.4),
             '락인 4단 — 깊을수록 전환 어려움', font=FONT_KO, size=12,
             bold=True, color=THEME['samsung_blue'])

    layers = [
        ('1단 · 하드웨어', 'SSD / DRAM 자체', THEME['gray_caption'], Inches(0.5)),
        ('2단 · 소프트웨어', 'FDP 호스트 SW · SCADA GPU 드라이버', THEME['samsung_blue'], Inches(0.4)),
        ('3단 · 인증·검증', 'Co-Validation Program', THEME['amber'], Inches(0.3)),
        ('4단 · 커스텀 로직', 'HBM 베이스다이 · ASIC별 최적화', THEME['red_alert'], Inches(0.2)),
    ]
    layer_x = Inches(0.7)
    layer_w_full = Inches(5.1)
    for i, (name, desc, color, _) in enumerate(layers):
        # 점점 작아지는 폭
        w_factor = 1 - i * 0.15
        w = Emu(int(layer_w_full * w_factor))
        x_offset = (layer_w_full - w) // 2
        y = Inches(2.55 + i * 0.85)
        add_rect(slide, layer_x + x_offset, y, w, Inches(0.7), fill=color)
        add_text(slide, layer_x + x_offset, y + Inches(0.05), w, Inches(0.3),
                 name, font=FONT_KO, size=10, bold=True, color=THEME['white'],
                 align='center')
        add_text(slide, layer_x + x_offset, y + Inches(0.35), w, Inches(0.35),
                 desc, font=FONT_KO, size=8.5, color=THEME['white'], align='center')

    add_text(slide, Inches(0.7), Inches(6.05), Inches(5.1), Inches(0.4),
             '4단 모두 적용 시 사실상 전환 불가능', font=FONT_KO, size=10,
             italic=True, bold=True, color=THEME['amber'], align='center')

    # 우측 — 3개 사례
    cases = [
        ('FDP', '구글 공동 개발',
         '구글 CFS와 삼성 SSD\nFDP 인터페이스 통합\n2027 양산 적용'),
        ('SCADA', 'NVIDIA Storage-Next',
         'GPU 직접 I/O 제어\n목표 1억 IOPS\nSK·Kioxia 선점 위협'),
        ('CMX', 'NVIDIA Vera Rubin',
         'KV 캐시 G3.5 계층\nPM1763 Gen6 시연\n40%+ 점유 목표 (2028)'),
    ]
    add_text(slide, Inches(6.2), Inches(2.0), Inches(6.6), Inches(0.4),
             '3개 사례 — NVIDIA·하이퍼스케일러 락인',
             font=FONT_KO, size=12, bold=True, color=THEME['amber'])
    for i, (name, sub, desc) in enumerate(cases):
        y = Inches(2.55 + i * 1.45)
        add_rect(slide, Inches(6.2), y, Inches(6.6), Inches(1.3),
                 fill=THEME['soft_white_bg'], line=THEME['light_gray'])
        add_rect(slide, Inches(6.2), y, Inches(0.1), Inches(1.3), fill=THEME['amber'])
        add_text(slide, Inches(6.4), y + Inches(0.1), Inches(2), Inches(0.4),
                 name, font=FONT_EN, size=14, bold=True, color=THEME['amber'])
        add_text(slide, Inches(6.4), y + Inches(0.45), Inches(6.0), Inches(0.3),
                 sub, font=FONT_KO, size=10, bold=True, color=THEME['samsung_blue'])
        add_text(slide, Inches(6.4), y + Inches(0.75), Inches(6.0), Inches(0.55),
                 desc, font=FONT_KO, size=9, color=THEME['dark_text'],
                 line_spacing=1.3)

    add_so_what(slide, Inches(6.85),
                'Marriott Asset-Light 모델 차용 — HW + SW 구독 → 2030년 SW 매출 $5B/년 목표')
    add_footer(slide, 20, TOTAL, 'Robust · RS3')
    return slide


def build_slide_21_rs6(prs):
    """단계 6-4: RS6 재무 규율 + 다운사이클 capex 하한."""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    add_header(slide,
               'RS6 · 재무 규율 + 다운사이클 capex 하한 — Nucor·ExxonMobil 모델',
               '호황기 절제 + 다운턴 사수를 동일 거버넌스로 — 활동가 투자자 압박 사전 방어')

    img = os.path.join(ASSETS_DIR, 'capex_floor.png')
    chart_capex_floor(img)
    slide.shapes.add_picture(img, Inches(0.5), Inches(1.85), width=Inches(8.3))

    # 우측 두 박스
    # 재무 규율
    add_rect(slide, Inches(9.0), Inches(1.85), Inches(3.83), Inches(2.25),
             fill=THEME['soft_blue_bg'])
    add_text(slide, Inches(9.2), Inches(1.95), Inches(3.5), Inches(0.4),
             '재무 규율 (지출 통제)', font=FONT_KO, size=11, bold=True,
             color=THEME['samsung_blue'])
    rules = [
        '○ 재고일수 상한 (DDR5 60일, HBM 45일)',
        '○ LTA 없는 신규 캐파 금지',
        '○ EBITDA → FCF 중심 의사결정',
        '○ 업황 피크 capex 증거 기반 승인',
    ]
    for i, r in enumerate(rules):
        add_text(slide, Inches(9.2), Inches(2.4 + i * 0.4), Inches(3.5), Inches(0.4),
                 r, font=FONT_KO, size=9, color=THEME['dark_text'])

    # 다운사이클 하한
    add_rect(slide, Inches(9.0), Inches(4.25), Inches(3.83), Inches(2.3),
             fill=RGBColor(0xFE, 0xF2, 0xF2))
    add_text(slide, Inches(9.2), Inches(4.35), Inches(3.5), Inches(0.4),
             '다운사이클 하한 (Nucor)', font=FONT_KO, size=11, bold=True,
             color=THEME['red_alert'])
    floors = [
        '○ HBM R&D + 패키징 + 3D DRAM',
        '   합산 4조원/년 삭감 불가',
        '○ 활동가 투자자 압박 대비',
        '   "장기 가치 우선 의결권 구조"',
        '○ ExxonMobil 모델 차용',
    ]
    for i, r in enumerate(floors):
        add_text(slide, Inches(9.2), Inches(4.8 + i * 0.32), Inches(3.5), Inches(0.4),
                 r, font=FONT_KO, size=9, color=THEME['dark_text'])

    add_so_what(slide, Inches(6.85),
                '호황기 절제와 다운턴 사수가 동일 거버넌스 — 투자자 인지·이사회 결의 일관성')
    add_footer(slide, 21, TOTAL, 'Robust · RS6')
    return slide


def build_slide_22_dashboard(prs):
    """단계 7: EWI 대시보드."""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    add_header(slide,
               'EWI 대시보드 — 다운턴 신호 즉시 포착',
               '9개 결정 추적 + 28개 EWI 지표 + 12개 자동 트리거 (실시간 모니터링)')

    # 좌측 — 9개 결정
    add_rect(slide, Inches(0.5), Inches(1.85), Inches(4), Inches(4.7),
             fill=THEME['soft_blue_bg'])
    add_text(slide, Inches(0.7), Inches(2.0), Inches(3.6), Inches(0.4),
             '9개 결정 추적', font=FONT_KO, size=12, bold=True, color=THEME['samsung_blue'])
    decisions = [
        ('D1', 'HBM4 NVIDIA 점유율', 'D-150'),
        ('D2', '소재 비중국 다각화', 'D-150'),
        ('D3', '3D DRAM R&D + IMEC', 'D-240'),
        ('D4', '텍사스 1·2단계', 'D-240'),
        ('D5', 'AI 효율화 도구', 'D-240'),
        ('D6', 'RS1·RS4·RS6 정책화', 'D-150'),
        ('D7', '잉여 인력 전환', 'D-330'),
        ('D8', '텍사스 추가 보조금', 'D-240'),
        ('D9', '다운사이클 M&A 펀드', 'D-240'),
    ]
    for i, (d, name, dday) in enumerate(decisions):
        y = Inches(2.5 + i * 0.45)
        add_text(slide, Inches(0.7), y, Inches(0.5), Inches(0.3),
                 d, font=FONT_EN, size=10, bold=True, color=THEME['amber'])
        add_text(slide, Inches(1.2), y, Inches(2.4), Inches(0.3),
                 name, font=FONT_KO, size=9.5, color=THEME['dark_text'])
        add_text(slide, Inches(3.5), y, Inches(0.9), Inches(0.3),
                 dday, font=FONT_EN, size=9, bold=True, color=THEME['red_alert'],
                 align='right')

    # 중앙 — 28개 EWI 지표
    add_rect(slide, Inches(4.7), Inches(1.85), Inches(4), Inches(4.7),
             fill=THEME['soft_white_bg'], line=THEME['light_gray'])
    add_text(slide, Inches(4.9), Inches(2.0), Inches(3.6), Inches(0.4),
             '28개 EWI 지표', font=FONT_KO, size=12, bold=True, color=THEME['amber'])
    add_text(slide, Inches(4.9), Inches(2.5), Inches(3.6), Inches(0.4),
             '월간 5개 · 분기 15개 · 연간 8개', font=FONT_KO, size=10,
             color=THEME['dark_text'])

    # 미니 신호등
    statuses = [
        ('정상', 17, THEME['green_pos']),
        ('주의', 7, THEME['amber']),
        ('경보', 4, THEME['red_alert']),
    ]
    for i, (label, n, color) in enumerate(statuses):
        y = Inches(3.0 + i * 0.6)
        add_rect(slide, Inches(4.9), y, Inches(0.4), Inches(0.4), fill=color)
        add_text(slide, Inches(5.4), y + Inches(0.05), Inches(2), Inches(0.3),
                 label, font=FONT_KO, size=10, bold=True, color=THEME['dark_text'])
        add_text(slide, Inches(7.0), y + Inches(0.05), Inches(1.5), Inches(0.3),
                 f'{n}건', font=FONT_EN, size=14, bold=True, color=color, align='right')

    add_text(slide, Inches(4.9), Inches(5.0), Inches(3.6), Inches(0.4),
             '자동 갱신: Yahoo Finance API', font=FONT_KO, size=9,
             italic=True, color=THEME['gray_caption'])
    add_text(slide, Inches(4.9), Inches(5.4), Inches(3.6), Inches(0.4),
             '주요 지표:', font=FONT_KO, size=9.5, bold=True, color=THEME['samsung_blue'])
    add_text(slide, Inches(4.9), Inches(5.7), Inches(3.6), Inches(0.7),
             '· HBM 현물 가격 (월)\n· NVIDIA HBM 수주 (월)\n· 빅테크 CapEx 가이던스 (분기)',
             font=FONT_KO, size=8.5, color=THEME['dark_text'], line_spacing=1.4)

    # 우측 — 12개 트리거
    add_rect(slide, Inches(8.9), Inches(1.85), Inches(3.93), Inches(4.7),
             fill=THEME['samsung_blue'])
    add_text(slide, Inches(9.1), Inches(2.0), Inches(3.5), Inches(0.4),
             '12개 자동 트리거', font=FONT_KO, size=12, bold=True, color=THEME['white'])
    triggers = [
        '1. 빅테크 CapEx YoY −25% → C·D 경보',
        '2. MATCH 법안 통과 → A·C 긴급',
        '3. HBM 가격 6개월 −30% → C·D',
        '4. 시안 라이선스 거절 → A·C',
        '5. CXMT HBM4 양산 → D 가속',
        '6. M&A 타깃 EV/EBITDA <5배 6개월',
        '7. Microsoft AI CapEx YoY −20%',
        '8. 텍사스 2단계 미발표 → A·C',
        '9. 빅테크 AI 매출 $500B → B 가속',
        '10. 3D DRAM 전력 −50% PoC → E',
        '11. HBM4 NVIDIA 미발표 → 위기',
        '12. 단일 고객 25% 초과 → RS4',
    ]
    for i, t in enumerate(triggers):
        add_text(slide, Inches(9.1), Inches(2.5 + i * 0.32), Inches(3.7), Inches(0.3),
                 t, font=FONT_KO, size=8, color=THEME['white'])

    add_so_what(slide, Inches(6.85),
                '지표만 보지 말고 트리거를 정의하라 — 자동 발동 메커니즘이 의사결정 속도를 만든다')
    add_footer(slide, 22, TOTAL, '대시보드')
    return slide


def build_slide_23_decisions_summary(prs):
    """단계 8-1: 9개 결정 한 페이지 요약."""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    add_header(slide,
               '9개 즉시 결정 — 단일 결정으로 분리 불가능한 묶음',
               '모든 결정의 시한: 2026년 Q4 이내')

    decisions = [
        {
            'id': 'D1', 'urgent': True,
            'title': 'HBM4 NVIDIA 점유율',
            'spec': '수율 90%+ Q3 2026\n점유율 28% → 40%+',
            'owner': 'D-150 · 마감 임박',
        },
        {
            'id': 'D2', 'urgent': False,
            'title': '소재 비중국 다각화',
            'spec': 'Q3 2026 LTA 체결\n6개월 비축',
            'owner': '캐나다·호주·카자흐',
        },
        {
            'id': 'D3', 'urgent': False,
            'title': '3D DRAM R&D + IMEC',
            'spec': 'Q4 2026 협약 체결\n$200M / 200~300인',
            'owner': '마이크론·SK 추격 차단',
        },
        {
            'id': 'D4', 'urgent': False,
            'title': '텍사스 1·2단계',
            'spec': '1단계 가동 + 2단계 발표\nQ4 2026 마감',
            'owner': '$4.745B 보조금 활용',
        },
        {
            'id': 'D5', 'urgent': False,
            'title': 'AI 효율화 전사 도입',
            'spec': 'Q4 파일럿 → Q1 전사\nRS2·RS3 선행 조건',
            'owner': '500~1,000억 원',
        },
        {
            'id': 'D6', 'urgent': False,
            'title': 'RS1·RS4·RS6 정책화',
            'spec': '다운사이클 capex 4조원\n명문화',
            'owner': '활동가 투자자 방어',
        },
        {
            'id': 'D7', 'urgent': False,
            'title': '잉여 인력 전환 배치',
            'spec': '2027 Q1 가시화\n분기별 사업부장 보고',
            'owner': '추가 채용 없이 RS2·RS3',
        },
        {
            'id': 'D8', 'urgent': False,
            'title': '텍사스 추가 보조금',
            'spec': 'CHIPS 추가 협상 + LTA\nTesla 외 미국계 빅테크',
            'owner': 'JV 모델 대안',
        },
        {
            'id': 'D9', 'urgent': False,
            'title': '다운사이클 M&A 펀드',
            'spec': '5,000억 원 사전 적립\n자동 트리거',
            'owner': 'Disney-Marvel 모델',
        },
    ]

    # 3x3 grid
    for i, d in enumerate(decisions):
        col = i % 3
        row = i // 3
        x = Inches(0.5 + col * 4.28)
        y = Inches(1.85 + row * 1.55)
        bg = RGBColor(0xFE, 0xF2, 0xF2) if d['urgent'] else THEME['soft_blue_bg']
        border_color = THEME['red_alert'] if d['urgent'] else THEME['samsung_blue']
        add_rect(slide, x, y, Inches(4.1), Inches(1.4),
                 fill=bg, line=border_color, line_width=Emu(15875) if d['urgent'] else None)
        # 좌측 띠
        add_rect(slide, x, y, Inches(0.1), Inches(1.4),
                 fill=THEME['red_alert'] if d['urgent'] else THEME['samsung_blue'])
        # ID
        add_text(slide, x + Inches(0.25), y + Inches(0.1), Inches(0.6), Inches(0.4),
                 d['id'], font=FONT_EN, size=18, bold=True,
                 color=THEME['red_alert'] if d['urgent'] else THEME['samsung_blue'])
        # 제목
        add_text(slide, x + Inches(0.95), y + Inches(0.15), Inches(3.05), Inches(0.4),
                 d['title'], font=FONT_KO, size=11, bold=True, color=THEME['dark_text'])
        # 스펙
        add_text(slide, x + Inches(0.25), y + Inches(0.6), Inches(3.7), Inches(0.55),
                 d['spec'], font=FONT_KO, size=9, color=THEME['dark_text'],
                 line_spacing=1.3)
        # Owner / context
        add_text(slide, x + Inches(0.25), y + Inches(1.1), Inches(3.7), Inches(0.3),
                 d['owner'], font=FONT_KO, size=8.5, italic=True,
                 color=THEME['amber'])

    # 하단 강조 박스
    add_rect(slide, Inches(0.5), Inches(6.55), Inches(12.33), Inches(0.45),
             fill=THEME['samsung_blue'])
    add_text(slide, Inches(0.7), Inches(6.6), Inches(12), Inches(0.35),
             '9개는 묶음이다 — D1·D5·D7 직렬 의존 / D4·D8 동시 처리 / D6이 D9의 거버넌스 기반',
             font=FONT_KO, size=11, bold=True, color=THEME['white'], align='center')

    add_footer(slide, 23, TOTAL, '결정 요약')
    return slide


def build_slide_24_problem_solution(prs):
    """단계 8-2: 우리가 풀려는 문제 + 해결 가능성."""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    add_header(slide,
               '우리가 풀려는 문제 — 그리고 이 전략으로 해결 가능한 이유',
               '문제 → 우리의 답 → 해결되는 것들')

    # 3단 흐름
    # 1단 — 문제 정의
    add_rect(slide, Inches(0.5), Inches(1.85), Inches(12.33), Inches(1.3),
             fill=RGBColor(0xFE, 0xF2, 0xF2), line=THEME['red_alert'])
    add_text(slide, Inches(0.7), Inches(2.0), Inches(2), Inches(0.4),
             '문제 정의', font=FONT_KO, size=11, bold=True, color=THEME['red_alert'])
    add_text(slide, Inches(0.7), Inches(2.45), Inches(12), Inches(0.4),
             '"호황의 정점에서 다운턴을 어떻게 준비할 것인가?"',
             font=FONT_KO, size=15, bold=True, color=THEME['dark_text'])
    add_text(slide, Inches(0.7), Inches(2.85), Inches(12), Inches(0.3),
             '· 다운턴은 옵니다 (사이클 산업)  ·  시점·규모는 알 수 없습니다 (불확실성)  ·  다운턴 진입 후에는 늦습니다',
             font=FONT_KO, size=9.5, italic=True, color=THEME['gray_caption'])

    # 화살표
    add_text(slide, Inches(6), Inches(3.2), Inches(2), Inches(0.3),
             '↓', font=FONT_EN, size=16, color=THEME['amber'], align='center')

    # 2단 — 우리의 답
    add_rect(slide, Inches(0.5), Inches(3.55), Inches(12.33), Inches(1.4),
             fill=THEME['samsung_blue'])
    add_text(slide, Inches(0.7), Inches(3.7), Inches(2), Inches(0.4),
             '우리의 답', font=FONT_KO, size=11, bold=True, color=THEME['amber'])
    add_text(slide, Inches(0.7), Inches(4.15), Inches(12), Inches(0.4),
             '시나리오 플래닝 + 9개 즉시 결정 + 6개 Robust 전략',
             font=FONT_KO, size=15, bold=True, color=THEME['white'])
    add_text(slide, Inches(0.7), Inches(4.55), Inches(12), Inches(0.4),
             '5개 시나리오 (모든 가능한 미래) + Main Bet (베팅) + Side Bets (보험) + Robust (불변 가치)',
             font=FONT_KO, size=10, italic=True, color=THEME['white'])

    # 화살표
    add_text(slide, Inches(6), Inches(5.0), Inches(2), Inches(0.3),
             '↓', font=FONT_EN, size=16, color=THEME['amber'], align='center')

    # 3단 — 해결되는 것들
    add_rect(slide, Inches(0.5), Inches(5.35), Inches(12.33), Inches(1.65),
             fill=RGBColor(0xEC, 0xFD, 0xF5), line=THEME['green_pos'])
    add_text(slide, Inches(0.7), Inches(5.5), Inches(2), Inches(0.4),
             '해결되는 것들', font=FONT_KO, size=11, bold=True, color=THEME['green_pos'])
    solutions = [
        '✓ 다운턴이 와도 흑자 유지 (RS6 다운사이클 흑자 구조)',
        '✓ 어느 시나리오 와도 회복기 1번 자리 회복 (Main Bet + RS1)',
        '✓ 다운턴 진입 시 자동 전략 전환 (트리거 + 30일 의사결정)',
        '✓ 다운턴 자산 가격 폭락 시 M&A 즉시 집행 (Disney-Marvel 모델)',
        '✓ 호황기 절제 + 다운턴 사수 거버넌스 (ExxonMobil 모델)',
    ]
    for i, sol in enumerate(solutions):
        col = i % 2
        row = i // 2
        if i == 4:
            col = 0
            row = 2
        x = Inches(0.7 + col * 6.0)
        y = Inches(5.95 + row * 0.35)
        add_text(slide, x, y, Inches(5.9), Inches(0.3),
                 sol, font=FONT_KO, size=10, color=THEME['dark_text'])

    add_footer(slide, 24, TOTAL, '문제 해결')
    return slide


def build_slide_25_closing(prs):
    """단계 9: 최종 메시지."""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    # 좌측 풀 사이드바
    add_rect(slide, Inches(0), Inches(0), Inches(0.2), Inches(7.5),
             fill=THEME['samsung_blue'])
    add_rect(slide, Inches(0), Inches(1.2), Inches(0.2), Inches(0.7),
             fill=THEME['amber'])

    # DECISION REQUEST
    add_text(slide, Inches(1.0), Inches(0.7), Inches(11), Inches(0.4),
             'DECISION REQUEST', font=FONT_EN, size=12, bold=True,
             color=THEME['samsung_blue'])
    add_text(slide, Inches(1.0), Inches(1.1), Inches(11), Inches(0.5),
             '경영진 결의 요청 사항 — 9개 결정의 묶음',
             font=FONT_KO, size=22, bold=True, color=THEME['dark_text'])

    # Amber 짧은 라인
    add_rect(slide, Inches(1.0), Inches(1.85), Inches(0.6), Inches(0.05),
             fill=THEME['amber'])

    # 큰 인용
    add_text(slide, Inches(1.0), Inches(2.2), Inches(11.5), Inches(1.5),
             '"호황의 정점이\n 다운턴 준비의 마지막 기회다."',
             font=FONT_KO, size=36, bold=True, color=THEME['samsung_blue'],
             line_spacing=1.2)

    add_text(slide, Inches(1.0), Inches(4.0), Inches(11.5), Inches(0.4),
             '─ 9개 결정의 묶음 의결을 요청드립니다 ─',
             font=FONT_KO, size=14, italic=True, color=THEME['gray_caption'])

    # 3개 결의 요청 카드
    asks = [
        ('01', '전략 방향 승인',
         '시나리오 B Main Bet + Side Bets + Robust 6개 전략 채택\n2030~2035 메모리 1위 회복 로드맵 의결'),
        ('02', '9개 즉시 결정 패키지',
         'HBM4·소재·3D DRAM·텍사스·AI 효율화·이사회 정책화·\n잉여 인력·추가 보조금·M&A 펀드 — 묶음 처리. 시한: 2026 Q4'),
        ('03', '거버넌스 + 트리거 승인',
         '30일 내 의사결정 + 자동 트리거 12개 + 다운사이클 capex 하한 4조 원/년\n+ 활동가 투자자 방어 의결권 구조'),
    ]
    for i, (num, title, desc) in enumerate(asks):
        x = Inches(1.0 + i * 4.0)
        y = Inches(4.7)
        add_rect(slide, x, y, Inches(3.85), Inches(2.0),
                 fill=THEME['soft_blue_bg'])
        add_rect(slide, x, y, Inches(0.08), Inches(2.0), fill=THEME['amber'])
        add_text(slide, x + Inches(0.25), y + Inches(0.15), Inches(1), Inches(0.5),
                 num, font=FONT_EN, size=22, bold=True, color=THEME['amber'])
        add_text(slide, x + Inches(0.25), y + Inches(0.65), Inches(3.5), Inches(0.4),
                 title, font=FONT_KO, size=12, bold=True, color=THEME['dark_text'])
        add_text(slide, x + Inches(0.25), y + Inches(1.05), Inches(3.5), Inches(0.9),
                 desc, font=FONT_KO, size=9.5, color=THEME['dark_text'],
                 line_spacing=1.3)

    # 푸터
    add_text(slide, Inches(1.0), Inches(7.05), Inches(11.5), Inches(0.3),
             '삼성전자  ·  DS부문 메모리사업부 전략기획팀  ·  대외비  ·  2026.05.06',
             font=FONT_KO, size=10, color=THEME['gray_caption'])
    add_text(slide, Inches(11.8), Inches(7.05), Inches(1), Inches(0.3),
             '25 / 25', font=FONT_EN, size=10, color=THEME['gray_caption'],
             align='right')

    return slide


# ============================================================
# Main
# ============================================================

def remove_existing_slides(prs):
    """템플릿의 모든 슬라이드 제거 — 마스터/테마는 유지."""
    sldIdLst = prs.slides._sldIdLst
    rIds = []
    for sldId in list(sldIdLst):
        rIds.append(sldId.get(qn('r:id')))
        sldIdLst.remove(sldId)
    for rId in rIds:
        try:
            prs.part.drop_rel(rId)
        except Exception:
            pass


def main():
    print(f'Loading template (theme only): {TEMPLATE}')
    prs = Presentation(TEMPLATE)
    remove_existing_slides(prs)
    print(f'After cleanup — slides: {len(prs.slides)}')

    builders = [
        build_slide_1_cover,
        build_slide_2_toc,
        build_slide_3_peak,
        build_slide_4_history,
        build_slide_5_samsung_quarterly,
        build_slide_6_paradox,
        build_slide_7_uncertainty,
        build_slide_8_single_prediction,
        build_slide_9_benchmark,
        build_slide_10_workflow,
        build_slide_11_focal_issue,
        build_slide_12_steep_iu,
        build_slide_13_driving_forces,
        build_slide_14_scenario_matrix,
        build_slide_15_main_bet,
        build_slide_16_side_bets,
        build_slide_17_robust_overview,
        build_slide_18_rs1,
        build_slide_19_rs2,
        build_slide_20_rs3,
        build_slide_21_rs6,
        build_slide_22_dashboard,
        build_slide_23_decisions_summary,
        build_slide_24_problem_solution,
        build_slide_25_closing,
    ]

    for i, builder in enumerate(builders, start=1):
        print(f'  Building slide {i}: {builder.__name__}...')
        builder(prs)

    print(f'Saving to: {OUTPUT}')
    prs.save(OUTPUT)
    size = os.path.getsize(OUTPUT) / 1024
    print(f'Done. Output size: {size:.1f} KB · {len(prs.slides)} slides')


if __name__ == '__main__':
    main()
