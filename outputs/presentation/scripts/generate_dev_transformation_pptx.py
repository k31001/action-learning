"""
개발실 체질 전환 발표자료 (5슬라이드)

빌드 원천 — `outputs/presentation/dev-transformation-outline.md`
  슬라이드 1  표지 + 사건        — LTA가 SCA가 된 날 (타임라인 + 키 넘버)
  슬라이드 2  해부              — 계약 3단 진화 + Micron–Anthropic 4대 구성요소
  슬라이드 3  역할              — 개발실 As-Is vs To-Be 7행 비교
  슬라이드 4  득실              — 전환 실패 리스크 4 vs 성공 이점 4
  슬라이드 5  실행              — 4대 축 + 3-Phase 로드맵 + KPI

기존 `generate_pptx.py`의 디자인 시스템(THEME, helper 함수)을 재사용한다.
"""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from generate_pptx import (
    THEME, FONT_KO, FONT_EN, SLIDE_W, SLIDE_H, TEMPLATE,
    add_text, add_rect, add_line, add_footer, add_header, add_so_what,
    remove_existing_slides,
)

from pptx import Presentation
from pptx.util import Inches, Pt, Emu

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
OUTPUT = os.path.join(ROOT, 'presentation', 'dev-org-transformation.pptx')

TOTAL = 5


def _blank(prs):
    return prs.slides.add_slide(prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[0])


# ============================================================
# 슬라이드 1: 표지 + 사건
# ============================================================

def build_slide_1_cover(prs):
    slide = _blank(prs)
    add_rect(slide, 0, 0, SLIDE_W, SLIDE_H, fill=THEME['deep_navy'])

    add_text(slide, Inches(0.7), Inches(0.55), Inches(10), Inches(0.35),
             'SAMSUNG MEMORY · 개발실 전략 브리핑 · 2026-07',
             font=FONT_EN, size=12, bold=True, color=THEME['amber'])
    add_text(slide, Inches(0.7), Inches(1.15), Inches(12), Inches(1.0),
             '개발실 체질 전환 — 수주 이행자에서 기술 파트너로',
             font=FONT_KO, size=31, bold=True, color=THEME['white'])
    add_text(slide, Inches(0.7), Inches(2.1), Inches(12), Inches(0.45),
             'LTA(장기공급계약)가 SCA(전략적 고객 계약)가 되었다 — Micron–Anthropic 계약(2026-06-22)이 보여준 산업의 다음 단계',
             font=FONT_KO, size=14, color=THEME['soft_blue_bg'])

    # 키 넘버 3개 (Micron Q3 FY26 공시)
    nums = [
        ('16건', 'Micron SCA(전략적 고객 계약) 체결 수'),
        ('~$100B', 'SCA 최소 계약 매출 (RPO)'),
        ('$22B', '현금 예치금 + 금융 약정'),
    ]
    box_w, box_h, gap = Inches(3.85), Inches(1.25), Inches(0.30)
    x0, y0 = Inches(0.7), Inches(2.85)
    for i, (num, label) in enumerate(nums):
        x = x0 + (box_w + gap) * i
        add_rect(slide, x, y0, box_w, box_h, fill=THEME['samsung_blue'])
        add_rect(slide, x, y0, Inches(0.08), box_h, fill=THEME['amber'])
        add_text(slide, x + Inches(0.25), y0 + Inches(0.14), box_w - Inches(0.4), Inches(0.55),
                 num, font=FONT_EN, size=26, bold=True, color=THEME['white'])
        add_text(slide, x + Inches(0.25), y0 + Inches(0.76), box_w - Inches(0.4), Inches(0.4),
                 label, font=FONT_KO, size=10.5, color=THEME['soft_blue_bg'])
    add_text(slide, Inches(0.7), y0 + box_h + Inches(0.08), Inches(12), Inches(0.3),
             '출처: Micron FY26 Q3 실적 공시 (2026-06-24) — sources/filings/micron-q3-fy26.md §3',
             font=FONT_KO, size=9, italic=True, color=THEME['gray_caption'])

    # 하단 타임라인 — 사건 5개
    tl_y = Inches(5.35)
    add_text(slide, Inches(0.7), tl_y - Inches(0.45), Inches(11), Inches(0.3),
             '체질 전환을 요구하는 사건의 누적 — 일회성이 아니라 구조 전환',
             font=FONT_KO, size=12, bold=True, color=THEME['white'])
    add_line(slide, Inches(0.9), tl_y + Inches(0.55), Inches(12.6), tl_y + Inches(0.55),
             color=THEME['light_gray'], width=Emu(19050))
    events = [
        ('2025-06', 'SK hynix 커스텀 HBM\nNVIDIA·MS·Broadcom 인증', False),
        ('2025-10', 'OpenAI Stargate LOI\n월 90만 장 = DRAM 40%', False),
        ('2025~26', 'LTA 선급금 10~30%\n체제화 (역사적 <5%)', False),
        ('2026-05', 'Anthropic Series H\n메모리 3사 동시 참여', False),
        ('2026-06', 'Micron–Anthropic\nSCA 발표', True),
    ]
    seg = Inches(2.36)
    for i, (date, desc, hot) in enumerate(events):
        cx = Inches(0.9) + seg * i + Inches(0.6)
        dot_c = THEME['amber'] if hot else THEME['soft_blue_bg']
        add_rect(slide, cx - Inches(0.07), tl_y + Inches(0.48), Inches(0.14), Inches(0.14), fill=dot_c)
        add_text(slide, cx - Inches(1.05), tl_y + Inches(0.0), Inches(2.1), Inches(0.3),
                 date, font=FONT_EN, size=10.5, bold=True,
                 color=THEME['amber'] if hot else THEME['white'], align='center')
        add_text(slide, cx - Inches(1.15), tl_y + Inches(0.78), Inches(2.3), Inches(0.7),
                 desc, font=FONT_KO, size=9,
                 color=THEME['amber_light'] if hot else THEME['soft_blue_bg'], align='center')
    return slide


# ============================================================
# 슬라이드 2: 해부 — SCA는 LTA에 무엇을 더했나
# ============================================================

def build_slide_2_anatomy(prs):
    slide = _blank(prs)
    add_header(slide,
               '해부 · SCA는 LTA에 무엇을 더했나',
               '계약 구조의 3단 진화 — 단계가 오를 때마다 공급자에게 요구되는 역량이 바뀐다')

    # 좌측: 3단 진화
    stages = [
        ('1단계 · Spot/분기 계약', '범용품 산업 — 가격이 유일한 변수', '요구 역량: 원가·수율·납기', THEME['gray_caption']),
        ('2단계 · LTA + 선급금', '수주 산업화 — 물량·가격 3~5년 락인\n선급금 10~30% · 2027년 DDR 비트 20~30% 고정가', '요구 역량: 캐파 계획·공급 신뢰성', THEME['samsung_blue']),
        ('3단계 · SCA 전략적 파트너십', 'LTA 위에 공동설계·운영통합·자본연계 적층\nMicron 16건 · ~$100B (2026-06)', '요구 역량: 워크로드 이해·공동설계·선제 제안', THEME['amber']),
    ]
    x, w = Inches(0.5), Inches(5.6)
    y = Inches(1.85)
    for i, (title, desc, cap, color) in enumerate(stages):
        h = Inches(1.28)
        add_rect(slide, x, y, w, h, fill=THEME['soft_white_bg'], line=THEME['light_gray'])
        add_rect(slide, x, y, Inches(0.1), h, fill=color)
        add_text(slide, x + Inches(0.25), y + Inches(0.08), w - Inches(0.4), Inches(0.3),
                 title, font=FONT_KO, size=12.5, bold=True, color=color)
        add_text(slide, x + Inches(0.25), y + Inches(0.40), w - Inches(0.4), Inches(0.55),
                 desc, font=FONT_KO, size=9.5, color=THEME['dark_text'])
        add_text(slide, x + Inches(0.25), y + Inches(0.98), w - Inches(0.4), Inches(0.26),
                 cap, font=FONT_KO, size=9.5, bold=True, color=THEME['gray_caption'])
        if i < 2:
            add_text(slide, x + w / 2 - Inches(0.15), y + h - Inches(0.04), Inches(0.4), Inches(0.3),
                     '▼', font=FONT_EN, size=12, bold=True, color=THEME['gray_caption'])
        y = y + h + Inches(0.24)

    # 우측: Micron–Anthropic 4대 구성요소
    rx, rw = Inches(6.5), Inches(6.35)
    add_rect(slide, rx, Inches(1.85), rw, Inches(0.5), fill=THEME['deep_navy'])
    add_text(slide, rx + Inches(0.2), Inches(1.95), rw - Inches(0.4), Inches(0.3),
             'Micron ↔ Anthropic 계약 분해 (2026-06-22)',
             font=FONT_KO, size=12.5, bold=True, color=THEME['white'])
    col_l = rx + Inches(3.6)
    col_s = rx + Inches(4.9)
    add_text(slide, col_l, Inches(2.48), Inches(1.2), Inches(0.3), 'LTA',
             font=FONT_EN, size=11, bold=True, color=THEME['gray_caption'], align='center')
    add_text(slide, col_s, Inches(2.48), Inches(1.2), Inches(0.3), 'SCA',
             font=FONT_EN, size=11, bold=True, color=THEME['amber'], align='center')
    rows = [
        ('다년 공급', 'HBM·DRAM·SSD 데이터센터 전 포트폴리오', '✓', '✓'),
        ('공동 최적화', 'Claude 학습·추론 워크로드 맞춤\n메모리·스토리지 서브시스템 공동 설계', '—', '✓'),
        ('운영 통합', 'Micron 엔지니어링·제조 전반에\nClaude 전사 배치', '—', '✓'),
        ('자본 연계', 'Series H 전략적 투자\n(post-money $965B)', '—', '✓'),
    ]
    ry = Inches(2.82)
    for name, desc, lta, sca in rows:
        rh = Inches(0.86)
        add_rect(slide, rx, ry, rw, rh, fill=THEME['white'], line=THEME['light_gray'])
        add_text(slide, rx + Inches(0.2), ry + Inches(0.08), Inches(3.3), Inches(0.3),
                 name, font=FONT_KO, size=11.5, bold=True, color=THEME['samsung_blue'])
        add_text(slide, rx + Inches(0.2), ry + Inches(0.38), Inches(3.35), Inches(0.46),
                 desc, font=FONT_KO, size=8.5, color=THEME['gray_caption'])
        add_text(slide, col_l, ry + Inches(0.22), Inches(1.2), Inches(0.4), lta,
                 font=FONT_EN, size=15, bold=True,
                 color=THEME['gray_caption'] if lta == '✓' else THEME['light_gray'], align='center')
        add_text(slide, col_s, ry + Inches(0.22), Inches(1.2), Inches(0.4), sca,
                 font=FONT_EN, size=15, bold=True, color=THEME['amber'], align='center')
        ry = ry + rh + Inches(0.06)

    add_so_what(slide, Inches(6.5),
                '고객이 사는 것은 "스펙대로 만든 칩"이 아니라 "내 워크로드를 이해하고 아키텍처를 함께 최적화하는 파트너"다.')
    add_footer(slide, 2, TOTAL, '해부 · LTA → SCA')
    return slide


# ============================================================
# 슬라이드 3: 역할 — As-Is vs To-Be
# ============================================================

def build_slide_3_role(prs):
    slide = _blank(prs)
    add_header(slide,
               '역할 · 개발실은 무엇이 되어야 하나 — As-Is vs To-Be',
               '"정확한 납품"의 역량은 여전히 필요하지만, 더 이상 충분하지 않다')

    rows = [
        ('요구사항', '고객이 확정한 스펙을 정확히 수령', '고객 워크로드를 먼저 해석 — 요구사항을 공동 정의'),
        ('제안', 'RFQ 응답 — 요청받은 것에만 답변', '고객 로드맵 분석 기반 선제 제안'),
        ('기술 방향', '고객·표준이 정한 방향을 추종', '자사가 유리한 기술 요소를 드라이브'),
        ('성공 지표', '품질·납기·수율 (QCD)', 'QCD + 공동설계 건수·로드맵 채택률·전환비용'),
        ('고객 접점', '영업이 소유 — 개발은 후방 지원', '개발 엔지니어가 고객 아키텍트와 직접 상시 교류'),
        ('정보 흐름', '요구사항이 내려오면 착수', '고객 워크로드 상시 센싱 (End-to-End Sensing)'),
        ('가치 단위', '부품 (component)', '서브시스템 최적화 + 임베디드 SW'),
        ('모델링 범위', '메모리 디바이스 단품 (스펙·데이터시트)', '랙·데이터센터 전체 시스템 모델 — 성능·전력 정량 예측'),
    ]
    x0 = Inches(0.5)
    dim_w, col_w = Inches(1.7), Inches(5.55)
    y = Inches(1.85)
    hdr_h = Inches(0.44)
    add_rect(slide, x0, y, dim_w, hdr_h, fill=THEME['deep_navy'])
    add_rect(slide, x0 + dim_w + Inches(0.02), y, col_w, hdr_h, fill=THEME['gray_caption'])
    add_text(slide, x0 + dim_w + Inches(0.2), y + Inches(0.08), col_w, Inches(0.3),
             'As-Is · 수주 이행자 (Order Executor)', font=FONT_KO, size=12, bold=True, color=THEME['white'])
    add_rect(slide, x0 + dim_w + col_w + Inches(0.04), y, col_w, hdr_h, fill=THEME['samsung_blue'])
    add_text(slide, x0 + dim_w + col_w + Inches(0.24), y + Inches(0.08), col_w, Inches(0.3),
             'To-Be · 기술 파트너 (Technology Partner)', font=FONT_KO, size=12, bold=True, color=THEME['white'])

    y = y + hdr_h + Inches(0.03)
    row_h = Inches(0.475)
    for i, (dim, asis, tobe) in enumerate(rows):
        bg = THEME['soft_white_bg'] if i % 2 == 0 else THEME['white']
        add_rect(slide, x0, y, dim_w, row_h, fill=THEME['soft_blue_bg'], line=THEME['light_gray'])
        add_text(slide, x0 + Inches(0.12), y + Inches(0.11), dim_w - Inches(0.2), Inches(0.3),
                 dim, font=FONT_KO, size=10.5, bold=True, color=THEME['deep_navy'])
        add_rect(slide, x0 + dim_w + Inches(0.02), y, col_w, row_h, fill=bg, line=THEME['light_gray'])
        add_text(slide, x0 + dim_w + Inches(0.2), y + Inches(0.11), col_w - Inches(0.35), Inches(0.32),
                 asis, font=FONT_KO, size=9.5, color=THEME['gray_caption'])
        add_rect(slide, x0 + dim_w + col_w + Inches(0.04), y, col_w, row_h, fill=bg, line=THEME['light_gray'])
        add_text(slide, x0 + dim_w + col_w + Inches(0.24), y + Inches(0.11), col_w - Inches(0.35), Inches(0.32),
                 tobe, font=FONT_KO, size=9.5, bold=True, color=THEME['dark_text'])
        y = y + row_h + Inches(0.02)

    add_so_what(slide, Inches(6.5),
                'As-Is는 스펙 확정 "후"에만 개입한다 — SCA의 공동설계는 스펙 확정 "전"에 일어난다. 지금 체질로는 그 테이블에 앉지 못한다.')
    add_footer(slide, 3, TOTAL, '역할 · As-Is vs To-Be')
    return slide


# ============================================================
# 슬라이드 4: 득실 — 리스크 vs 이점
# ============================================================

def build_slide_4_stakes(prs):
    slide = _blank(prs)
    add_header(slide,
               '득실 · 전환하지 않으면 vs 전환하면',
               '리스크는 구조적·비가역적, 이점은 누적적·복리적 — 조기 전환의 기대값이 압도적으로 크다')

    risks = [
        ('R1 · SCA 수주 배제', '다년 최소매출 락인($100B급) 계약군에서 배제\n— 사이클 방어 수단 상실'),
        ('R2 · 커스텀 전환기 고착', '커스텀 HBM이 범용 대체($130B, 2033) 시\n범용 잔여 시장에 갇힘 — SK hynix 3사 인증 선점'),
        ('R3 · 2nd source화', '기술 관계 없는 공급자는 대체 가능한 예비 공급자\n— 마진 프리미엄 소멸'),
        ('R4 · 기술 선점 실패', '워크로드 조기 접근 없이는 차세대 제품 정의 후행\n— CXL·PIM 등 신규 아키텍처 창에서 반복 지각'),
    ]
    benefits = [
        ('B1 · 지속 가능한 매출', '공동설계 락인 → 최소 약정 + 선급금\n→ 사이클 진폭 완화 (RS-8)'),
        ('B2 · 수익률 프리미엄', '커스텀·공동설계 제품의 가격 결정력\n— Micron 매출총이익률 84.9%의 기반'),
        ('B3 · 미래 기술 선점', '워크로드 조기 가시성 → 표준을 자사 유리하게 드라이브\n— IDM 5종 메모리 통합 제안은 복제 불가 카드'),
        ('B4 · 자본 연계 옵션', '전략적 파트너 지위 → 고객 자본 테이블 참여\n(Series H 모델) 등 관계 심화'),
    ]

    def col(x, title, title_color, items, accent, body_bg):
        add_rect(slide, x, Inches(1.85), Inches(6.1), Inches(0.5), fill=title_color)
        add_text(slide, x + Inches(0.2), Inches(1.96), Inches(5.7), Inches(0.3),
                 title, font=FONT_KO, size=13, bold=True, color=THEME['white'])
        y = Inches(2.5)
        for name, desc in items:
            h = Inches(0.92)
            add_rect(slide, x, y, Inches(6.1), h, fill=body_bg, line=THEME['light_gray'])
            add_rect(slide, x, y, Inches(0.09), h, fill=accent)
            add_text(slide, x + Inches(0.25), y + Inches(0.08), Inches(5.7), Inches(0.3),
                     name, font=FONT_KO, size=11.5, bold=True, color=accent)
            add_text(slide, x + Inches(0.25), y + Inches(0.40), Inches(5.7), Inches(0.5),
                     desc, font=FONT_KO, size=9, color=THEME['dark_text'])
            y = y + h + Inches(0.06)

    col(Inches(0.5), '전환 실패의 리스크 — Do Nothing의 비용', THEME['red_alert'],
        risks, THEME['red_alert'], THEME['white'])
    col(Inches(6.75), '전환 성공의 이점', THEME['samsung_blue'],
        benefits, THEME['samsung_blue'], THEME['soft_white_bg'])

    add_so_what(slide, Inches(6.5),
                '한 번 2nd source로 고착되면 복구 비용이 크다 — 공동설계 관계는 세대를 거듭할수록 깊어진다. 지금이 개입 시점이다.')
    add_footer(slide, 4, TOTAL, '득실 · 리스크 vs 이점')
    return slide


# ============================================================
# 슬라이드 5: 실행 — 4대 축 + 3-Phase + KPI
# ============================================================

def build_slide_5_execution(prs):
    slide = _blank(prs)
    add_header(slide,
               '실행 · 4대 축 전환 전략과 3-Phase 액션 플랜',
               '기술·조직은 투자로 살 수 있다 — 문화는 평가·보상·리더십 행동의 일관된 변화로만 만들어진다')

    # 상단: 4대 축 카드
    axes = [
        ('기술', '워크로드 랩 신설\n시스템 성능·파워 모델\n(디바이스→서버→랙→DC)\n커스텀 플랫폼·임베디드 SW', THEME['samsung_blue']),
        ('문화', '"정답 구현"→"가설 제안"\n실패 허용 예산\n트레이드오프 토론 표준화', THEME['amber']),
        ('조직', '고객별 Co-Design Pod\n시스템 아키텍트·모델링\n전문 조직 신설 (채용+육성)\n워크로드 인텔리전스', THEME['green_pos']),
        ('일하는 방식', '로드맵 교차 리뷰(분기)\n선행 시제품(PoA) 사이클\nAI 도구 내재화', THEME['deep_navy']),
    ]
    card_w, gap = Inches(3.05), Inches(0.21)
    x0, y0 = Inches(0.5), Inches(1.8)
    for i, (name, items, color) in enumerate(axes):
        x = x0 + (card_w + gap) * i
        h = Inches(1.5)
        add_rect(slide, x, y0, card_w, h, fill=THEME['soft_white_bg'], line=THEME['light_gray'])
        add_rect(slide, x, y0, card_w, Inches(0.38), fill=color)
        add_text(slide, x + Inches(0.15), y0 + Inches(0.07), card_w - Inches(0.3), Inches(0.26),
                 f'축 {i + 1} · {name}', font=FONT_KO, size=11.5, bold=True, color=THEME['white'])
        add_text(slide, x + Inches(0.15), y0 + Inches(0.5), card_w - Inches(0.3), Inches(0.95),
                 items, font=FONT_KO, size=9.5, color=THEME['dark_text'], line_spacing=1.15)

    # 중단: 3-Phase 로드맵
    ph_y = Inches(3.55)
    add_text(slide, Inches(0.5), ph_y, Inches(6), Inches(0.3),
             '3-Phase 로드맵', font=FONT_KO, size=12, bold=True, color=THEME['dark_text'])
    phases = [
        ('Phase 1 · 90일 — 증명', '파일럿 고객 Co-Design Pod 1호 발족\n워크로드 랩 + 시스템 모델 v0.1 (서버 레벨)\n선제 제안 1호 · KPI 개정안 설계'),
        ('Phase 2 · 1년 — 제도화', 'Pod 3~5개 확대 · 아키텍트·모델링 조직 신설\n모델 v1.0 (랙) · PoA 연 4회 · KPI 전면 적용\n★ SCA형 계약 1건 이상 수주'),
        ('Phase 3 · 3년 — 표준화', '커스텀 플랫폼 완성 (리드타임 50%↓)\n모델 v2.0 (DC 레벨·고객 공용 자산)\n"전략적 인프라 파트너" IR 공시 · SW P&L'),
    ]
    pw = Inches(4.0)
    for i, (title, desc) in enumerate(phases):
        x = Inches(0.5) + (pw + Inches(0.21)) * i
        y = ph_y + Inches(0.38)
        h = Inches(1.28)
        hot = i == 1
        add_rect(slide, x, y, pw, h,
                 fill=THEME['amber_light'] if hot else THEME['white'], line=THEME['light_gray'])
        add_text(slide, x + Inches(0.18), y + Inches(0.08), pw - Inches(0.3), Inches(0.28),
                 title, font=FONT_KO, size=11.5, bold=True,
                 color=THEME['amber'] if hot else THEME['samsung_blue'])
        add_text(slide, x + Inches(0.18), y + Inches(0.4), pw - Inches(0.3), Inches(0.82),
                 desc, font=FONT_KO, size=9, color=THEME['dark_text'], line_spacing=1.12)

    # 하단: KPI 스트립
    kpi_y = Inches(5.42)
    add_text(slide, Inches(0.5), kpi_y, Inches(6), Inches(0.3),
             '성공 지표 (1년 → 3년)', font=FONT_KO, size=12, bold=True, color=THEME['dark_text'])
    kpis = [
        ('선제 제안', '12건 → 40건/년'),
        ('로드맵 채택률', '20% → 35%'),
        ('고객 직접 교류 시간', '10% → 25%'),
        ('커스텀 매출 비중', '추적 → 30%+'),
        ('시스템 모델 커버리지', '랙 → DC·고객 공용'),
    ]
    kw = Inches(2.44)
    for i, (label, val) in enumerate(kpis):
        x = Inches(0.5) + (kw + Inches(0.13)) * i
        y = kpi_y + Inches(0.36)
        add_rect(slide, x, y, kw, Inches(0.62), fill=THEME['soft_blue_bg'])
        add_text(slide, x + Inches(0.12), y + Inches(0.06), kw - Inches(0.24), Inches(0.22),
                 label, font=FONT_KO, size=9, color=THEME['gray_caption'])
        add_text(slide, x + Inches(0.12), y + Inches(0.28), kw - Inches(0.24), Inches(0.3),
                 val, font=FONT_KO, size=11, bold=True, color=THEME['samsung_blue'])

    add_so_what(slide, Inches(6.5),
                '90일 안에 파일럿 Pod와 선제 제안 1호로 증명 — 1년 안에 SCA형 계약 1건으로 제도화의 근거를 만든다.',
                label='NEXT STEP')
    add_footer(slide, 5, TOTAL, '실행 · 4대 축 + 로드맵')
    return slide


# ============================================================
# Main
# ============================================================

def main():
    print(f'Loading template (theme only): {TEMPLATE}')
    prs = Presentation(TEMPLATE)
    remove_existing_slides(prs)

    builders = [
        build_slide_1_cover,
        build_slide_2_anatomy,
        build_slide_3_role,
        build_slide_4_stakes,
        build_slide_5_execution,
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
