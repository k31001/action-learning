"""
핵심전략 10개 카테고리화 발표자료 (4슬라이드)

작업 2 산출물 — `presentation/core-strategies-categorization.pptx`

10개 전략을 4개 축으로 분류해 한 슬라이드씩 시각화:
  슬라이드 1  시나리오별        — 5개 시나리오에서 어떤 전략이 작동하는지 매트릭스
  슬라이드 2  기대효과별        — 매출/마진/신시장/헤지 4개 카테고리
  슬라이드 3  실행부서별        — 책임 부서 매핑
  슬라이드 4  시간축별          — 단기(0~6M) / 중기(6~18M) / 장기(18M+) 타임라인

기존 `generate_pptx.py`의 디자인 시스템(THEME, helper 함수)을 재사용한다.
"""

import os
import sys

# 동일 디렉토리의 generate_pptx.py에서 디자인 시스템과 helper 함수 import
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from generate_pptx import (
    THEME, FONT_KO, FONT_EN, SLIDE_W, SLIDE_H, TEMPLATE,
    add_text, add_rect, add_line, add_footer, add_header, add_so_what,
    remove_existing_slides,
)

from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor


ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
OUTPUT = os.path.join(ROOT, 'presentation', 'core-strategies-categorization.pptx')

TOTAL = 4

# ============================================================
# 핵심전략 10개 데이터 (단일 소스)
# ============================================================

STRATEGIES = [
    # (id, name, type, color_hint)
    ('MB-4', '커스텀 AI 메모리 솔루션',           'main',  'samsung_blue'),
    ('RS-3', '고객특화·전환비용 (CMX/SCADA/FDP)', 'main',  'samsung_blue'),
    ('RS-6', '공정 리더십 통합',                  'main',  'samsung_blue'),
    ('MB-2', '동서 균형 공급망',                  'main',  'samsung_blue'),
    ('SD-1', 'HBM 조직 독립 P&L',                'main',  'samsung_blue'),
    ('RS-5', '재무 규율 + 초과이익 재투자',       'main',  'samsung_blue'),
    ('SA-2', '일본 R&D 허브 (EUV 우회 NIL)',     'side',  'amber'),
    ('SD-2', '산업용 AI 메모리 (자동차·의료)',   'side',  'amber'),
    ('SE-1', '3D DRAM + IMEC + M&A',             'side',  'amber'),
    ('SE-2', 'CXL SIG 표준 주도',                 'side',  'amber'),
]


def _strategy_color(strat_type):
    return THEME['samsung_blue'] if strat_type == 'main' else THEME['amber']


# ============================================================
# 슬라이드 1: 시나리오별 카테고리화
# ============================================================

def build_slide_1_scenario(prs):
    """시나리오 A~E 각각에서 어느 전략이 어떤 강도로 작동하는지 매트릭스."""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    add_header(slide,
               '카테고리 1 · 시나리오별 — 어떤 미래에 어떤 전략이 작동하는가',
               '5개 시나리오 × 10개 전략 매트릭스. ●●● 핵심 가치 / ●● 의미 있는 가치 / ● 부분 가치 / − 제한적')

    # 매트릭스: 행=10개 전략, 열=5개 시나리오
    # 강도: '●●●' = 3, '●●' = 2, '●' = 1, '−' = 0
    intensity = {
        # (id, [A, B, C, D, E])
        'MB-4': ['●●', '●●●', '●', '●', '●●●'],
        'RS-3': ['●●●', '●●●', '●●', '●●●', '●●●'],
        'RS-6': ['●●●', '●●●', '●●●', '●●●', '●●'],
        'MB-2': ['●●', '●●●', '●', '●●●', '●●'],
        'SD-1': ['●●', '●●', '●●●', '●●●', '●●'],
        'RS-5': ['●●●', '●●', '●●●', '●●●', '●●●'],
        'SA-2': ['●●●', '●●', '●●●', '●●', '●●●'],
        'SD-2': ['●', '●●', '●●', '●●●', '●●●'],
        'SE-1': ['●●', '●●', '●●●', '●●●', '●●●'],
        'SE-2': ['●●', '●●●', '●●', '●●●', '●●●'],
    }

    scenarios = [
        ('A', '황금 요새', 'AI 지속+디커플링'),
        ('B ★', 'AI 르네상스', 'AI 지속+공존 (메인)'),
        ('C', '기술 냉전', 'AI 붕괴+디커플링'),
        ('D', '조용한 재편', 'AI 붕괴+공존'),
        ('E', '패러다임 전환', 'HBM 대체'),
    ]

    # 표 구조
    table_x = Inches(0.4)
    table_y = Inches(1.85)
    name_col_w = Inches(3.4)
    scen_col_w = Inches(1.85)

    # 헤더 행
    add_rect(slide, table_x, table_y, name_col_w, Inches(0.7), fill=THEME['samsung_blue'])
    add_text(slide, table_x + Inches(0.15), table_y + Inches(0.1), name_col_w - Inches(0.3), Inches(0.5),
             '핵심전략 (메인 6 + 사이드 4)',
             font=FONT_KO, size=10.5, bold=True, color=THEME['white'])

    for i, (code, name, desc) in enumerate(scenarios):
        x = table_x + name_col_w + Inches(i * 1.85)
        bg = THEME['amber'] if '★' in code else THEME['samsung_blue']
        add_rect(slide, x, table_y, scen_col_w, Inches(0.7), fill=bg)
        add_text(slide, x + Inches(0.05), table_y + Inches(0.05), scen_col_w - Inches(0.1), Inches(0.3),
                 f'{code} · {name}',
                 font=FONT_KO, size=9.5, bold=True, color=THEME['white'], align='center')
        add_text(slide, x + Inches(0.05), table_y + Inches(0.36), scen_col_w - Inches(0.1), Inches(0.3),
                 desc, font=FONT_KO, size=8, italic=True, color=THEME['white'], align='center')

    # 데이터 행
    row_h = Inches(0.43)
    for i, (sid, name, stype, _) in enumerate(STRATEGIES):
        y = table_y + Inches(0.7) + row_h * i
        bg = THEME['amber_light'] if stype == 'main' else THEME['soft_blue_bg']
        # 전략명 셀
        add_rect(slide, table_x, y, name_col_w, row_h, fill=bg, line=THEME['light_gray'])
        # 좌측 색상 띠
        add_rect(slide, table_x, y, Inches(0.08), row_h, fill=_strategy_color(stype))
        # 코드
        add_text(slide, table_x + Inches(0.15), y + Inches(0.06), Inches(0.6), Inches(0.32),
                 sid, font=FONT_EN, size=10, bold=True, color=_strategy_color(stype))
        # 이름
        add_text(slide, table_x + Inches(0.75), y + Inches(0.06), name_col_w - Inches(0.85), Inches(0.32),
                 name, font=FONT_KO, size=9, color=THEME['dark_text'])

        # 시나리오 셀
        for j, mark in enumerate(intensity[sid]):
            cx = table_x + name_col_w + Inches(j * 1.85)
            add_rect(slide, cx, y, scen_col_w, row_h, fill=THEME['white'], line=THEME['light_gray'])
            color = THEME['samsung_blue'] if mark == '●●●' else (
                THEME['amber'] if mark == '●●' else (
                    THEME['gray_caption'] if mark == '●' else THEME['light_gray']))
            add_text(slide, cx, y + Inches(0.07), scen_col_w, Inches(0.3),
                     mark, font=FONT_EN, size=14, bold=True, color=color, align='center')

    add_so_what(slide, Inches(6.55),
                'RS-3·RS-5·RS-6은 거의 모든 시나리오에서 ●● 이상 — 중심축. 사이드벳은 특정 시나리오 헤지용.')
    add_footer(slide, 1, TOTAL, '카테고리 1 · 시나리오')
    return slide


# ============================================================
# 슬라이드 2: 기대효과별 카테고리화
# ============================================================

def build_slide_2_impact(prs):
    """4개 카테고리: 매출/점유율, 비용/마진, 신시장, 리스크 헤지."""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    add_header(slide,
               '카테고리 2 · 기대효과별 — 어떤 가치를 만드는가',
               '매출 견인 / 마진 방어 / 신시장 개척 / 리스크 헤지 — 10개 전략의 1차 효과 분류')

    # 4개 카테고리 카드 (2x2)
    categories = [
        {
            'title': '매출 증대 · 점유율 회복',
            'subtitle': 'Revenue & Market Share',
            'color': THEME['samsung_blue'],
            'items': [
                ('MB-4', '커스텀 AI 메모리 솔루션',
                 '하이퍼스케일러 ASIC 통합, 매출 비중 20%+ (2029)'),
                ('RS-3', '고객특화·전환비용',
                 'NVIDIA 3대 통합, 통합 매출 $8~9B/년 (2030)'),
                ('MB-2', '동서 균형 공급망',
                 '신흥시장 매출 3배+ (2028, vs 2025)'),
                ('SD-1', 'HBM 조직 독립 P&L',
                 'HBM 사업부 영업이익률 35%+ 회복'),
            ],
        },
        {
            'title': '비용 절감 · 마진 확대',
            'subtitle': 'Cost & Margin Defense',
            'color': THEME['green_pos'],
            'items': [
                ('RS-6', '공정 리더십 통합',
                 '1c nm 원가 -30%, NAND capex 회피 1.5~2조 원'),
                ('RS-5', '재무 규율 + 재투자',
                 '다운턴 흑자 구조, HBM 가격 60% 하락에도 흑자'),
            ],
        },
        {
            'title': '신규 시장 개척',
            'subtitle': 'New Market Expansion',
            'color': THEME['amber'],
            'items': [
                ('SA-2', '일본 R&D 허브 (EUV 우회 NIL)',
                 'ASML 의존 탈피, 한일 소재·장비 생태계 신시장'),
                ('SD-2', '산업용 AI 메모리 (자동차·의료)',
                 'AEC-Q100 등급, 의료·자율주행·로봇 — 사이클 안정 신시장'),
            ],
        },
        {
            'title': '리스크 헤지 · 패러다임 대비',
            'subtitle': 'Risk Hedge & Paradigm Shift',
            'color': THEME['red_alert'],
            'items': [
                ('SE-1', '3D DRAM + IMEC + M&A',
                 'HBM 패러다임 전환 시 피벗 자원 (5천억 펀드)'),
                ('SE-2', 'CXL SIG 표준 주도',
                 '차세대 메모리 패브릭 표준 결정권'),
            ],
        },
    ]

    card_w = Inches(6.3)
    card_h = Inches(2.35)
    gap = Inches(0.13)
    base_x = Inches(0.4)
    base_y = Inches(1.85)

    for i, cat in enumerate(categories):
        col = i % 2
        row = i // 2
        x = base_x + (card_w + gap) * col
        y = base_y + (card_h + gap) * row

        # 카드 배경
        add_rect(slide, x, y, card_w, card_h, fill=THEME['soft_white_bg'], line=THEME['light_gray'])
        # 좌측 색상 띠
        add_rect(slide, x, y, Inches(0.10), card_h, fill=cat['color'])
        # 제목
        add_text(slide, x + Inches(0.25), y + Inches(0.08), card_w - Inches(0.35), Inches(0.35),
                 cat['title'], font=FONT_KO, size=12, bold=True, color=cat['color'])
        # 영문 부제
        add_text(slide, x + Inches(0.25), y + Inches(0.42), card_w - Inches(0.35), Inches(0.25),
                 cat['subtitle'], font=FONT_EN, size=8.5, italic=True,
                 color=THEME['gray_caption'])

        # 항목
        for j, (sid, name, desc) in enumerate(cat['items']):
            iy = y + Inches(0.75) + Inches(j * 0.38)
            add_text(slide, x + Inches(0.25), iy, Inches(0.7), Inches(0.3),
                     sid, font=FONT_EN, size=10, bold=True, color=cat['color'])
            add_text(slide, x + Inches(0.95), iy, Inches(2.6), Inches(0.3),
                     name, font=FONT_KO, size=9.5, bold=True, color=THEME['dark_text'])
            add_text(slide, x + Inches(0.95), iy + Inches(0.18), card_w - Inches(1.10), Inches(0.2),
                     desc, font=FONT_KO, size=8, italic=True,
                     color=THEME['gray_caption'])

    add_so_what(slide, Inches(6.55),
                '메인벳 6개는 매출+마진에 집중, 사이드벳 4개는 신시장+패러다임에 분산 — 자원 배분 균형')
    add_footer(slide, 2, TOTAL, '카테고리 2 · 기대효과')
    return slide


# ============================================================
# 슬라이드 3: 실행부서별 카테고리화
# ============================================================

def build_slide_3_owner(prs):
    """책임 부서/조직 매핑."""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    add_header(slide,
               '카테고리 3 · 실행부서별 — 누가 책임지는가',
               '메모리사업부 R&D / 영업·전략 / 재무·이사회 / 일본 R&D / 표준·M&A — 5개 책임 그룹 매핑')

    # 5개 부서 그룹 (수직 배치)
    departments = [
        {
            'name': '메모리사업부 R&D',
            'subtitle': 'DS Memory R&D · 평택·기흥',
            'color': THEME['samsung_blue'],
            'strategies': [
                ('MB-4', '커스텀 AI 메모리', 'HBM 베이스다이 커스텀 로직, CXL 모듈 R&D'),
                ('RS-3', 'NVIDIA 통합 (CMX/SCADA/FDP)', 'AI SSD 컨트롤러 펌웨어 + Co-Validation'),
                ('RS-6', '공정 리더십 통합', '1c nm DRAM + NAND 4트랙 R&D + Hybrid bonding IP'),
                ('SD-1', 'HBM 조직 독립 P&L', 'HBM 전용 R&D 분리, 패키징 100인+ 채용'),
            ],
        },
        {
            'name': '영업 · 전략기획 · 글로벌 사업',
            'subtitle': 'Sales · Strategy · Global Business',
            'color': THEME['amber'],
            'strategies': [
                ('MB-2', '동서 균형 공급망',
                 '신흥시장 영업팀 신설 (사우디·UAE·인도), 시안 라이선스 협상'),
                ('SD-2', '산업용 AI 메모리 (자동차·의료)',
                 '자동차·의료 OEM 신규 영업, AEC-Q100 인증'),
            ],
        },
        {
            'name': '재무 · 전략 · 이사회',
            'subtitle': 'CFO · Strategy · Board',
            'color': THEME['green_pos'],
            'strategies': [
                ('RS-5', '재무 규율 + 초과이익 재투자',
                 '재고일수 상한, FCF 기준, 다운사이클 capex 하한 4조/년 이사회 결의'),
            ],
        },
        {
            'name': '일본 R&D 허브 (요코하마)',
            'subtitle': 'Japan R&D Hub',
            'color': RGBColor(0xE3, 0x4A, 0x4A),
            'strategies': [
                ('SA-2', '일본 R&D 허브 (EUV 우회 NIL)',
                 'JSR·신에쓰화학·캐논 파트너십, 나노임프린트 NIL 공동 개발 (1조 원)'),
            ],
        },
        {
            'name': '표준 컨소시엄 · M&A · IP',
            'subtitle': 'Standards · M&A · IP Strategy',
            'color': RGBColor(0x6B, 0x46, 0xC1),
            'strategies': [
                ('SE-1', '3D DRAM + IMEC + 스타트업 M&A',
                 'IMEC 공동 연구, 3D DRAM 스타트업 2~3개 M&A (5천억 펀드)'),
                ('SE-2', 'CXL SIG 표준 주도',
                 'CXL 4.0+ 워킹그룹 인력 10→25명 확대, 자사 아키텍처 표준 반영'),
            ],
        },
    ]

    base_y = Inches(1.85)
    row_h = Inches(0.93)
    x = Inches(0.4)
    w = Inches(12.5)

    for i, dept in enumerate(departments):
        y = base_y + row_h * i
        # 카드 배경
        add_rect(slide, x, y, w, row_h - Inches(0.05), fill=THEME['soft_white_bg'],
                 line=THEME['light_gray'])
        # 좌측 색상 띠
        add_rect(slide, x, y, Inches(0.10), row_h - Inches(0.05), fill=dept['color'])
        # 부서명
        add_text(slide, x + Inches(0.25), y + Inches(0.08), Inches(3.5), Inches(0.32),
                 dept['name'], font=FONT_KO, size=11, bold=True, color=dept['color'])
        # 영문
        add_text(slide, x + Inches(0.25), y + Inches(0.42), Inches(3.5), Inches(0.25),
                 dept['subtitle'], font=FONT_EN, size=8.5, italic=True,
                 color=THEME['gray_caption'])

        # 전략 항목 (가로 배치)
        n = len(dept['strategies'])
        item_w = Inches(8.7 / max(n, 1))
        for j, (sid, name, action) in enumerate(dept['strategies']):
            ix = x + Inches(3.85) + item_w * j
            iy = y + Inches(0.08)
            # 코드 + 이름
            add_text(slide, ix, iy, item_w - Inches(0.15), Inches(0.28),
                     f'{sid} · {name}', font=FONT_KO, size=9.5, bold=True,
                     color=dept['color'])
            # 행동
            add_text(slide, ix, iy + Inches(0.30), item_w - Inches(0.15), Inches(0.45),
                     action, font=FONT_KO, size=8.5,
                     color=THEME['dark_text'], line_spacing=1.3)

    add_so_what(slide, Inches(6.65),
                '메모리사업부 R&D가 4개 전략의 책임 — AI 자동화로 잉여 자원 확보 없이는 동시 실행 불가')
    add_footer(slide, 3, TOTAL, '카테고리 3 · 실행부서')
    return slide


# ============================================================
# 슬라이드 4: 시간축별 카테고리화
# ============================================================

def build_slide_4_timeline(prs):
    """단기 / 중기 / 장기 타임라인 시각화."""
    slide = prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])
    add_header(slide,
               '카테고리 4 · 시간축별 — 언제 시작하고 언제 효과를 보는가',
               '단기 (0~6M, 2026 H2) / 중기 (6~18M, 2027) / 장기 (18M+, 2028+) — 착수 시점 + 효과 발현 시점')

    # 3개 시간 구간 (수직 배치, 각 구간은 가로 카드)
    phases = [
        {
            'name': '단기',
            'period': '0~6M',
            'window': '2026 H2 ~ 2027 H1',
            'desc': '즉시 착수 — 거버넌스·조직·계약 구조',
            'color': THEME['red_alert'],
            'strategies': [
                ('RS-5', '재무 규율 이사회 결의 + 다운사이클 capex 하한 4조 명문화'),
                ('SD-1', 'HBM 사업부 독립 P&L 분리 + 패키징 인재 채용 착수'),
                ('MB-2', '신흥시장 영업팀 신설 (사우디·UAE·인도) + 시안 라이선스 협상'),
                ('SE-2', 'CXL SIG 워킹그룹 인력 10→25명 즉시 확대'),
                ('RS-3', 'NVIDIA CMX·SCADA 공동 개발 MOU 체결, FDP 파일럿'),
            ],
        },
        {
            'name': '중기',
            'period': '6~18M',
            'window': '2027 H1 ~ 2028 H1',
            'desc': '본격 실행 — R&D·인프라·시장 진입',
            'color': THEME['amber'],
            'strategies': [
                ('MB-4', '구글·아마존·MS와 메모리 공동 로드맵 협의체 가동, CXL 모듈 양산'),
                ('RS-6', '1c nm 80% yield 달성, V10 hybrid bonding 양산, 자체 IP 200건 출원'),
                ('SA-2', '일본 R&D 허브 1조 원 투자 + 나노임프린트 NIL 공동 개발'),
                ('SE-1', 'IMEC 공동 연구 협약 + 3D DRAM 스타트업 2~3개 M&A 집행'),
                ('SD-2', '자동차·의료 AI 메모리 AEC-Q100 인증 + OEM 파일럿 공급'),
            ],
        },
        {
            'name': '장기',
            'period': '18M+',
            'window': '2028 H2 ~ 2030+',
            'desc': '효과 발현 — 매출·마진·생존력',
            'color': THEME['samsung_blue'],
            'strategies': [
                ('RS-6', 'V11 자체 IP 비중 70%+ 달성, NAND 공정 주기 24개월+ 연장'),
                ('MB-4', '커스텀 AI 메모리 매출 비중 20%+ (2029), CMX SSD 점유 40%+ (2028)'),
                ('RS-3', 'FDP 검증 SSD 매출 비중 30% (2030), 통합 매출 $8~9B/년'),
                ('SE-1', '3D DRAM 시제품 가동, 패러다임 전환 시 즉시 양산 피벗'),
                ('SD-2', '산업용 메모리 매출 안정 성장 — 사이클 충격 흡수'),
            ],
        },
    ]

    x = Inches(0.4)
    base_y = Inches(1.85)
    phase_h = Inches(1.6)
    gap = Inches(0.1)
    w = Inches(12.5)

    for i, phase in enumerate(phases):
        y = base_y + (phase_h + gap) * i
        # 카드 배경
        add_rect(slide, x, y, w, phase_h, fill=THEME['soft_white_bg'], line=THEME['light_gray'])
        # 좌측 색상 띠 (시간 구간)
        add_rect(slide, x, y, Inches(0.10), phase_h, fill=phase['color'])
        # 좌측 영역: 구간 정보
        add_text(slide, x + Inches(0.25), y + Inches(0.08), Inches(2.5), Inches(0.4),
                 phase['name'], font=FONT_KO, size=18, bold=True, color=phase['color'])
        add_text(slide, x + Inches(0.25), y + Inches(0.50), Inches(2.5), Inches(0.30),
                 phase['period'], font=FONT_EN, size=14, bold=True, color=phase['color'])
        add_text(slide, x + Inches(0.25), y + Inches(0.82), Inches(2.5), Inches(0.25),
                 phase['window'], font=FONT_EN, size=9, italic=True,
                 color=THEME['gray_caption'])
        add_text(slide, x + Inches(0.25), y + Inches(1.10), Inches(2.5), Inches(0.30),
                 phase['desc'], font=FONT_KO, size=9, italic=True,
                 color=THEME['dark_text'])

        # 우측 영역: 전략 리스트
        list_x = x + Inches(2.95)
        for j, (sid, action) in enumerate(phase['strategies']):
            iy = y + Inches(0.10 + j * 0.27)
            # 코드
            add_text(slide, list_x, iy, Inches(0.7), Inches(0.25),
                     sid, font=FONT_EN, size=9.5, bold=True, color=phase['color'])
            # 행동
            add_text(slide, list_x + Inches(0.7), iy, Inches(8.8), Inches(0.25),
                     action, font=FONT_KO, size=9, color=THEME['dark_text'])

    add_so_what(slide, Inches(6.55),
                '단기는 거버넌스·조직(돈 안 듦), 중기는 R&D·인프라(자원 집중), 장기는 매출·마진(수확) — 순서 지켜야 함')
    add_footer(slide, 4, TOTAL, '카테고리 4 · 시간축')
    return slide


# ============================================================
# 표지 (선택) — 4개 슬라이드만 있으면 표지 없이 바로 시작 가능
# 사용자 원본 프롬프트는 "4장"이므로 표지 생략
# ============================================================


# ============================================================
# Main
# ============================================================

def main():
    print(f'Loading template (theme only): {TEMPLATE}')
    prs = Presentation(TEMPLATE)
    remove_existing_slides(prs)
    print(f'After cleanup — slides: {len(prs.slides)}')

    builders = [
        build_slide_1_scenario,
        build_slide_2_impact,
        build_slide_3_owner,
        build_slide_4_timeline,
    ]
    for i, builder in enumerate(builders, 1):
        print(f'  Building slide {i}: {builder.__name__}...')
        builder(prs)

    print(f'Saving to: {OUTPUT}')
    prs.save(OUTPUT)
    size_kb = os.path.getsize(OUTPUT) / 1024
    print(f'Done. Output size: {size_kb:.1f} KB · {len(prs.slides)} slides')


if __name__ == '__main__':
    main()
