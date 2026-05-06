"""
삼성전자 메모리사업부 시나리오 플래닝 발표자료 생성 스크립트

template.pptx (McKinsey 스타일 16슬라이드 템플릿) 기반으로
slide-outline.md의 콘텐츠를 적용하여 최종 PPTX를 생성한다.

전략:
- 템플릿의 슬라이드 구조 (텍스트 박스 위치, 색상, 레이아웃)는 그대로 유지
- 텍스트 박스의 내용만 새 콘텐츠로 교체
- 차트가 있는 슬라이드는 차트 데이터를 새로 주입
- 폰트 크기·색상은 첫 run에서 가져와서 유지

사용:
  python3 generate_pptx.py
"""

from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.chart.data import CategoryChartData, XyChartData
from pptx.enum.chart import XL_CHART_TYPE, XL_LABEL_POSITION
from pptx.enum.text import PP_ALIGN
from copy import deepcopy
from lxml import etree
import os

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
TEMPLATE = os.path.join(ROOT, 'presentation', 'template.pptx')
OUTPUT = os.path.join(ROOT, 'presentation', 'samsung-memory-scenario-planning.pptx')


# -------------------------------------------------------------------------
# Helpers
# -------------------------------------------------------------------------

def replace_text_keep_format(text_frame, new_text):
    """텍스트 프레임의 첫 paragraph/run의 포맷을 유지하며 텍스트 교체."""
    if not text_frame.paragraphs:
        text_frame.text = new_text
        return

    # 첫 paragraph의 첫 run만 사용. 나머지는 제거.
    p = text_frame.paragraphs[0]
    if not p.runs:
        # 기본 런 추가
        from pptx.util import Pt as _Pt
        run = p.add_run()
        run.text = new_text
        return

    # 첫 run에 새 텍스트 적용
    first_run = p.runs[0]
    first_run.text = new_text

    # 같은 paragraph에 추가 run이 있다면 텍스트만 비움
    for run in p.runs[1:]:
        run.text = ''

    # 두번째 paragraph 이후는 비움 (텍스트만)
    for para in text_frame.paragraphs[1:]:
        for run in para.runs:
            run.text = ''


def set_text_with_lines(text_frame, lines):
    """여러 줄 텍스트를 paragraph 단위로 설정. 첫 paragraph 포맷을 모든 줄에 복사."""
    if not lines:
        return

    if not text_frame.paragraphs:
        text_frame.text = lines[0]
        for line in lines[1:]:
            p = text_frame.add_paragraph()
            p.text = line
        return

    # 첫 paragraph의 포맷 (xml 복사)
    first_p = text_frame.paragraphs[0]
    first_p_xml = deepcopy(first_p._p)

    # 모든 paragraph 제거
    txBody = text_frame._txBody
    for p in list(txBody.findall('.//{http://schemas.openxmlformats.org/drawingml/2006/main}p')):
        txBody.remove(p)

    # 첫 paragraph 다시 추가 + 새 텍스트
    new_first = deepcopy(first_p_xml)
    txBody.append(new_first)
    text_frame.paragraphs[0]
    # 기존 run 텍스트 모두 제거 후 첫 run에 새 텍스트
    p_obj = text_frame.paragraphs[0]
    if p_obj.runs:
        p_obj.runs[0].text = lines[0]
        for r in p_obj.runs[1:]:
            r.text = ''
    else:
        run = p_obj.add_run()
        run.text = lines[0]

    # 추가 줄들
    for line in lines[1:]:
        new_p_xml = deepcopy(first_p_xml)
        txBody.append(new_p_xml)
        # 마지막 paragraph 가져와서 텍스트 설정
        last_p = text_frame.paragraphs[-1]
        if last_p.runs:
            last_p.runs[0].text = line
            for r in last_p.runs[1:]:
                r.text = ''


def find_text_shapes(slide):
    """슬라이드의 모든 텍스트 shape를 (top, left, text) 순서대로 리스트로 반환."""
    shapes = []
    for shape in slide.shapes:
        if shape.has_text_frame and shape.text_frame.text.strip():
            shapes.append({
                'shape': shape,
                'top': shape.top,
                'left': shape.left,
                'text': shape.text_frame.text,
            })
    shapes.sort(key=lambda x: (x['top'], x['left']))
    return shapes


def replace_chart_data_bar(chart, categories, series_data):
    """카테고리 차트 데이터 교체. series_data: [(name, [values]), ...]"""
    chart_data = CategoryChartData()
    chart_data.categories = categories
    for name, values in series_data:
        chart_data.add_series(name, values)
    chart.replace_data(chart_data)


# -------------------------------------------------------------------------
# 슬라이드별 컨텐츠 정의
# -------------------------------------------------------------------------

# 슬라이드 텍스트 매핑 (template.pptx 분석 결과 기반)
SLIDE_CONTENT = {
    1: {  # 표지
        'SAMSUNG ELECTRONICS': 'SAMSUNG ELECTRONICS',
        '전략 보고서': 'AI 메모리 시대의 전략적 선택',
        'Strategic Report  ·  Master Template': 'Scenario Planning Strategic Report  ·  Memory Business',
        '임원 보고용 프레임워크  ·  맥킨지 스타일': '호황의 정점에서 구조적 패배를 막기 위한 9개 결정',
        '작성': '작성',
        '전략기획팀': 'DS부문 메모리사업부 전략기획팀',
        '일자': '일자',
        '2026년 0월': '2026년 5월 6일',
        '분류': '분류',
        '대외비': '대외비',
    },
    2: {  # 목차
        '목차': '목차',
        '전략 진단부터 실행 로드맵까지 — 6개 섹션 구성': '진단 → 환경 → 시나리오 → 전략 → 로드맵 → 결정 요청 — 6개 섹션',
        # 6개 섹션
        '핵심 요약': '진단',
        '주요 발견사항과 전략적 권고안': '호황 한가운데서 구조적 패배가 진행 중',
        '시장 환경': '환경 분석',
        '산업 동향과 경쟁 구도 분석': '50개 STEEP 요인 + 핵심 Driving Forces',
        '전략적 진단': '시나리오',
        '성과 평가 및 근본 원인 분석': '5개의 대안적 미래 (확률 기반 우선순위)',
        '전략 옵션': '전략 포트폴리오',
        '대안별 평가 및 트레이드오프': 'Main Bet × Side Bets × Robust 6개 전략',
        '권고 방향': '실행 로드맵',
        '선호 방향 및 근거 논리': '9개 즉시 결정 + 18개월 타임라인',
        '실행 로드맵': '결정 요청',
        '단계별 추진 계획과 마일스톤': '이사회 9개 안건 + KPI 지표',
        '삼성전자  |  목차': '삼성전자  |  목차',
    },
    3: {  # 섹션 구분 01
        'SECTION': 'SECTION',
        '핵심 요약': '핵심 요약',
        'Executive Summary': 'Executive Summary',
        '삼성전자  |  섹션 구분': '삼성전자  |  섹션 구분',
    },
    4: {  # 핵심 메시지
        'KEY MESSAGE': 'KEY MESSAGE',
        '핵심 메시지': '핵심 메시지',
        '프리미엄 시장 재편이 가속화되는 향후 12개월은 / 전사 포트폴리오 전략을  / 플랫폼 중심으로 전환할 / 결정적 기회의 창이다.':
            '호황의 정점에서 구조적 패배가 진행 중이다 — 자동 회복은 없다, 9개의 결정만이 미래를 만든다.',
        '프리미엄 세그먼트 CAGR 12% — 전체 시장의 3배 성장세':
            '메모리 매출 +292% YoY ($50.4B Q1 2026) — 그러나 NVIDIA Rubin HBM4 점유율 28%',
        'AI 기능 채택률 매년 2배 — 락인 효과 가시화':
            'AI 르네상스 시나리오 확률 30~35% — 자동 실현되지 않음',
        '경쟁사 플랫폼 모트 형성 중 — 12개월 내 격차 벌어질 위험':
            '6개 Robust 전략은 시나리오 무관 — 지금 당장 시작',
        '삼성전자  |  핵심 메시지': '삼성전자  |  핵심 메시지',
    },
    5: {  # 3컬럼 구조적 변화
        '세 가지 구조적 변화가 12개월 내 전략적 대응을 요구한다':
            '세 가지 구조적 변화가 9개 결정을 2026년 내 요구한다',
        '시장 신호 · 내부 역량 · 경쟁 포지셔닝의 통합 분석 결과':
            '시장(수요 폭증) · 경쟁(듀오폴리 1번 자리 미확보) · 역량(수율·패키징 격차)',
        'MARKET': 'MARKET',
        '시장': '시장 (수요 폭증)',
        '수요 양극화': 'HBM4 캐파 전량 Sold Out',
        '프리미엄과 가치 세그먼트는 8% CAGR로 성장하는 반면, 미드티어는 4% 축소 — 포트폴리오 재조정이 불가피하다.':
            '2026년 HBM 수요 +77% YoY, 2027년 +68% — 단가 +20% 인상에도 매진. 단, 2027~2028년 ROI 시험대.',
        'COMPETITION': 'COMPETITION',
        '경쟁': '경쟁 (1번 자리 미확보)',
        '플랫폼 사업자 부상': 'NVIDIA Rubin HBM4 28%',
        '주요 경쟁사 2곳이 생태계 모트를 구축 — 단독 하드웨어 우위만으로는 마진 방어가 어려워진다.':
            'SK 70% / Samsung 28% / Micron 18% (UBS). HBM4E·HBM5가 1번 자리 탈환의 마지막 기회.',
        'CAPABILITY': 'CAPABILITY',
        '역량': '역량 (수율·패키징 격차)',
        '소프트웨어 격차 확대': '1c nm 수율 50~70%',
        'AI/클라우드 인재 풀에서 동종업계 대비 30% 갭 — 변화 속도의 핵심 제약 요인이다.':
            'SK 1b 대비 1세대 후행. 하이브리드 본딩 양산 미달성. AI 도구로 잉여 역량 창출이 선행 조건.',
        'SO WHAT  12개월 내 플랫폼 기반 프리미엄으로 포트폴리오 재포지셔닝 필요':
            'SO WHAT  9개 결정을 2026년 내 묶음으로 처리해야 시나리오 B 현실화 가능',
        '삼성전자  |  핵심 요약': '삼성전자  |  핵심 요약',
    },
    6: {  # 빅 넘버 - AI CapEx
        '프리미엄 세그먼트 성장률 12% — 전체 시장 대비 3배':
            '빅테크 4사 AI CapEx $725B — 2년 만에 +263%',
        'AI 기능 · 생태계 락인 · 지불의향 상승의 복합 효과':
            'Microsoft만 메모리 가격 영향 $25B 직접 인정 — HBM 단가 인상의 1차 증거',
        'KEY INSIGHTS': 'KEY INSIGHTS',
        '핵심 인사이트': '핵심 인사이트',
        '프리미엄 점유율 28% → 41% (2021–2025년 카테고리 매출 기준) /  / AI 기능 채택률 전년 대비 2배 상승 — 상위 3개 OEM 평균, 유료 구독 19% /  / 평균 판매가 8.4% 상승 (프리미엄), 미드티어는 보합 /  / 프리미엄 고객 유지율 84% 초과 — 미드티':
            'Amazon $200B (FCF 마이너스 전망)\nMicrosoft $190B (메모리 영향 +$25B 인정)\nAlphabet $185B (TPU 자체 + Gemini)\nMeta $135B (풀 스택 데이터센터)\n\n2024 $200B → 2025 $410B → 2026 $725B — 연 평균 +90% 성장\n\nMicrosoft FCF -28% 전망 (Barclays) → 시나리오 D(거품 조정) 트리거 후보\n\n2027년 합산 $1조 돌파 가능성',
        'PREMIUM TIER': 'BIG TECH AI CAPEX 2026',
        '프리미엄 세그먼트': '빅테크 4사 합산',
        '+12%': '$725B',
        '연평균 성장률 (2021–2025)': '연 평균 +90% (2024~2026)',
        '전체 시장 대비 / +4%': 'vs. 2024년 / 3.6배\nvs. 2025년 / +77% YoY',
        '삼성전자  |  시장 환경': '삼성전자  |  시장 환경',
    },
    7: {  # 차트 + Takeaways - 메모리 매출
        '전년 대비 매출 18% 성장 — 프리미엄이 증가분의 70% 견인':
            '삼성 메모리 매출 +292% YoY — 사상 최대 분기',
        'FY2025 분기별 세그먼트 매출 (단위: 십억 USD)':
            '2025 Q1 ~ 2026 Q1 분기별 메모리 매출 (단위: 조원)',
        'KEY TAKEAWAYS': 'KEY TAKEAWAYS',
        '핵심 시사점': '핵심 시사점',
        '프리미엄 연 45% 성장 — 분기마다 가속 /  / 미드티어 11% 감소 — 구조적 약세 확인 /  / 가치형 안정세 유지 — 방어 가능하나 상승 여력 제한':
            '메모리 매출 4배 — 호황 그 자체\n\n단, 일반 DRAM 마진 > HBM 마진 (Q1 2026)\nHBM은 연간 단가 락인,\n일반 DRAM은 분기 협상 (가격 즉시 반영)\n\n시사점: 바벨 포트폴리오(RS2)의 실시간 정당화. HBM에만 의존하지 말라.',
        '출처: 내부 분석, FY2025 Q4 마감 기준':
            '출처: Samsung Q1 2026 IR (2026-04-30) · 분기별 추정치',
        '삼성전자  |  성과 분석': '삼성전자  |  매출 추이',
    },
    8: {  # 차트 + Urgent - HBM4 점유율
        'AI 기능 채택은 지수 성장 곡선 — 2026년 변곡점 도달 예상':
            'HBM4 NVIDIA Rubin 점유율 — SK 70% / Samsung 28%',
        'AI 기능 월간 활성 사용자 수, 지수화 (2024년 1월 = 100)':
            'NVIDIA Vera Rubin 플랫폼 HBM4 공급사별 점유율 (UBS 추정, 2026 Q1)',
        'URGENT': 'URGENT',
        '긴급 시사점': '긴급 시사점',
        '경쟁사 A가 채택 속도에서 20% 앞섬 /  / 격차 해소를 위해 AI 출시 주기 2배 필요 (2026년 내) /  / 선점 락인 기회의 창: 12개월':
            'HBM4E·HBM5가 1번 자리 탈환의 마지막 기회\n\nNVIDIA Feynman 플랫폼(2027) 공급사 결정 시점 = 2026 Q4\n\n행동:\n① HBM4 수율 90%+ (Q3 2026)\n② NVIDIA Co-Design 인력 2배\n③ TSMC 4nm 외주 옵션 유지\n④ 텍사스 2단계 HBM 발표',
        '출처: 산업 트래커, 내부 추정치':
            '출처: UBS, Counterpoint Research, TrendForce (2026 Q1)',
        '삼성전자  |  경쟁 동향': '삼성전자  |  경쟁 동향',
    },
    9: {  # 듀얼 차트 - 시나리오 매트릭스
        '지역별 매출 구조와 사업부 비중 — 아시아·프리미엄 집중 전략 유효':
            '2035년 5개의 대안적 미래 — 시나리오 B가 Main Bet',
        'FY2025 매출 구성 분석 (좌: 지역별 누적 / 우: 사업부별 비중)':
            'DF1(AI 수요) × DF2(미중 디커플링) — 두 독립적 축',
        'REGIONAL MIX': 'SCENARIO MATRIX',
        '지역별 매출 구성 (%)': '시나리오 매트릭스 (2×2 + E 와일드카드)',
        'BUSINESS UNIT': 'PROBABILITY',
        '사업부별 비중 (%)': '시나리오별 확률 분포 (%)',
        '출처: 사업보고서, FY2025':
            '출처: 50개 STEEP 요인 분석 → I×U 매트릭스 → Driving Forces 2개 선정',
        '삼성전자  |  구조 분석': '삼성전자  |  시나리오',
    },
    10: {  # 차트 + Payback - Main Bet ROI
        '투자 회수 시점 — 24개월차부터 누적 흑자 구간 진입':
            'Main Bet 실행 시 24개월 손익분기 도달 — NPV +6.3조 원',
        '권고안 실행 시 누적 손익 시뮬레이션 (단위: 십억 KRW)':
            '시나리오 B 실현 시 누적 손익 시뮬레이션 (단위: 조원)',
        'PAYBACK': 'PAYBACK',
        '회수 분석': '회수 분석',
        '24개월': '24개월',
        '손익분기점 도달 시점': '손익분기 도달 시점',
        '3.6배': '3.6배',
        '36개월차 ROI': '36개월차 ROI',
        'NPV +6,300억': 'NPV +6.3조 원',
        '할인율 8% 적용 (5년)': '할인율 8% 적용 (5년)',
        '삼성전자  |  재무 영향': '삼성전자  |  Main Bet ROI',
    },
    11: {  # 2x2 사분면 - 16개 전략
        '전략 옵션은 4개 사분면으로 분류 — 2사분면이 권장 경로':
            '16개 전략 — 임팩트 × 확신도, II사분면이 Main Bet',
        '임팩트와 실행 가능성 기준 평가':
            '사분면별 자원 배분: II 65% / III 20% / I 10% / IV 5%',
        'II  RECOMMENDED': 'II  RECOMMENDED',
        '권장': '권장 (Main Bet · Robust)',
        'I  TRANSFORMATIVE': 'I  TRANSFORMATIVE',
        '혁신적': '혁신적 (장기 옵션)',
        'III  INCREMENTAL': 'III  INCREMENTAL',
        '점진적': '점진적 (Side Bet)',
        'IV  AMBITIOUS': 'IV  AMBITIOUS',
        '도전적': '도전적 (와일드카드)',
        'OPTIONS': 'OPTIONS',
        '옵션': '전략 이니셔티브',
        'A — 플랫폼 전환 / B — 프리미엄 집중 / C — 풀 생태계 / D — 비용 재구조화 / E — 신규 지역 진출':
            'A MB-1 HBM4E·5 1위 탈환\nB MB-3 1c nm 공정 전환\nC MB-2 동서 균형 공급망\nD SE-1 3D DRAM R&D + IMEC\nE Option L-4 다운사이클 M&A',
        '삼성전자  |  전략 옵션': '삼성전자  |  전략 매트릭스',
    },
    12: {  # 5단계 워크플로우
        '의사결정 워크플로우 — 5단계 게이트 검증 프로세스':
            '의사결정 거버넌스 — 시나리오 전환 트리거 발동 시 30일 내 의결',
        '각 단계별 산출물과 책임자가 명확히 정의된 의사결정 흐름':
            '5단계 게이트 검증 + EWI 자동 보고 메커니즘',
        '발의': '모니터링',
        '이슈 정의 / 시장 신호 포착': 'EWI 대시보드 실시간 추적\nHBM 가격·점유율·CapEx',
        'BU 전략팀': '전략기획팀',
        '분석': '분석',
        '데이터 수집 / 옵션 도출': '시나리오 영향 분석\n수익 시뮬레이션',
        '전략기획팀': '메모리 사업기획',
        '평가': '평가',
        '옵션 비교 / 리스크 진단': 'RS·MB·SB 매트릭스\n리스크-수익 평가',
        '리스크관리': '리스크관리',
        '결정': '결정',
        '경영진 검토 / 최종 승인': '이사회 30일 내 의결\n트리거 자동 발동',
        '경영위원회': '경영위원회',
        '실행': '실행',
        'PMO 가동 / 진척 모니터링': 'PMO 가동\n9개 결정 KPI 추적',
        'PMO 조직': '메모리 PMO',
        'GATE 검증  각 단계 종료 시점에 산출물 검토 및 다음 단계 진입 승인 필요':
            'GATE 검증  각 단계 종료 시 산출물 검토 + 다음 단계 진입 승인 + EWI 트리거 자동 보고',
        '삼성전자  |  워크플로우': '삼성전자  |  거버넌스',
    },
    13: {  # 18개월 간트 차트
        '18개월 실행 타임라인 — 4개 워크스트림 병렬 추진':
            '18개월 실행 타임라인 — 9개 즉시 결정 + 4개 워크스트림',
        '월별 진행 상황과 마일스톤을 한눈에 추적':
            '2026년 5월 ~ 2027년 11월 · 결정 마감 표시',
        '포트폴리오 재편': 'HBM 점유율 회복',
        'Portfolio': 'Portfolio',
        'AI 역량 확보': 'AI 역량 + 인력 전환',
        'Capability': 'Capability',
        '생태계 파트너십': '생태계 + M&A',
        'Ecosystem': 'Ecosystem',
        '운영 모델 전환': '운영·재무·정책',
        'Operations': 'Operations',
        '주요 마일스톤': '9개 즉시 결정 마감',
        '시작: 2026년 0월  ·  종료: 2027년 0월  ·  총 기간 18개월':
            '시작: 2026년 5월  ·  마감: 2027년 11월  ·  9개 결정 + 4개 워크스트림',
        '삼성전자  |  타임라인': '삼성전자  |  실행 타임라인',
    },
    14: {  # 4 KPI
        '성공 지표 — 4개 핵심 KPI로 경영진 보고':
            '2027~2028년 4대 KPI — 분기별 추적',
        '전사 스코어카드 및 주기적 검토와 연계된 정량 목표':
            '전사 스코어카드 + 분기 검토 연계 정량 목표',
        '+15%': '40%+',
        '매출 성장': 'HBM4E NVIDIA 점유율',
        '프리미엄 세그먼트 내': '2026 28% → 2027 40%+',
        'FY27까지': 'NVIDIA Feynman 1번 자리',
        '2x': '40%+',
        'AI 출시 주기': 'HBM 사업부 영업이익률',
        '분기당 6 → 12개 기능': '1c nm 원가 우위 + HBM5',
        'FY26 Q4까지': '다운사이클 흑자 구조 (2028)',
        '84%': '3배',
        '고객 유지율': '신흥시장 매출',
        '프리미엄 (기준선 78%)': '사우디·UAE·인도·동남아',
        '지속 유지': '연간 $3B+ 수주 (2028)',
        '30%': '20~30%',
        '역량 격차 해소': '엔지니어링 생산성 향상',
        'AI/클라우드 인재 지수': 'AI 도구 도입 → 잉여 인력',
        # FY27까지 → 두 번 등장. 위에서 처리됨, 추가 처리:
        '삼성전자  |  성과 지표': '삼성전자  |  KPI 목표',
    },
    15: {  # 옵션 평가 표
        '옵션 B (프리미엄 집중)이 4개 기준 중 3개에서 우위':
            '시나리오 B "AI 르네상스" 권고 — 4개 기준 중 3개에서 우위',
        '가중 평가 기준에 따른 옵션별 비교':
            '가중 평가: 가능성 30% · 임팩트 30% · 실행성 20% · 시한 20%',
        '권고  옵션 B (프리미엄 집중) 채택 — 의사결정 기간 내 위험 조정 수익률 최우수':
            '권고  시나리오 B (AI 르네상스) Main Bet 채택 — Robust RS1~RS6 시나리오 무관 동시 실행',
        '삼성전자  |  옵션 평가': '삼성전자  |  시나리오 평가',
    },
    16: {  # Decision Request 클로징
        'DECISION REQUEST': 'DECISION REQUEST',
        '경영진 의사결정 요청 사항': '경영진 의사결정 요청 사항 — 9개 결정의 묶음',
        '전략 방향 승인': '① HBM4 NVIDIA 점유율 회복 + ② 소재 비중국 다각화 + ③ 3D DRAM R&D',
        '옵션 B (프리미엄 집중) 권고안 채택 의결':
            '수율 90%+ Q3 2026 / 6개월 비축 Q3 / IMEC 협약 Q4 ($200M, 200~300인)',
        '프로그램 예산 승인': '④ 텍사스 1단계 가동 + 2단계 발표 + ⑤ AI 효율화 도구 + ⑥ 이사회 정책화',
        '1단계 6개월간 [XXX억 원] 집행 권한 부여':
            '2단계 추가 CHIPS 협상 / 2027 Q1 전사 전개 / RS1·RS4·RS6 + 다운사이클 4조 원/년',
        'C-레벨 스폰서 지정': '⑦ AI 잉여 인력 RS2·RS3 전환 + ⑧ 텍사스 2단계 추가 보조금 + ⑨ M&A 펀드',
        'C-suite 단일 책임자 지정 (CSO 또는 사업부장)':
            '도구 도입 직후 분기 보고 / Tesla 외 미국 LTA / 5,000억 원 사전 적립 (Disney-Marvel)',
        '삼성전자  ·  전략기획팀  ·  대외비': '삼성전자  ·  DS부문 메모리사업부  ·  대외비  ·  2026.05.06',
    },
}


# 차트 데이터 (슬라이드 7, 8, 9, 10에 차트 포함)
CHART_DATA = {
    7: {
        'type': 'bar',
        'categories': ['25 Q1', '25 Q2', '25 Q3', '25 Q4', '26 Q1'],
        'series': [('메모리 매출 (조원)', [19, 22, 28, 37, 75])],
    },
    8: {
        # 도넛: NVIDIA Rubin HBM4 점유율
        'type': 'doughnut',
        'categories': ['SK hynix', 'Samsung', 'Micron'],
        'series': [('점유율 (%)', [70, 28, 2])],
    },
    9: {
        # 좌측: 시나리오 매트릭스 (산점도) → 단순화: 시나리오 확률 바 차트로
        'type': 'bar_left',
        'categories': ['A 황금요새', 'B AI르네상스', 'C 기술냉전', 'D 조용한재편', 'E 패러다임'],
        'series': [('확률 추정 (%)', [27, 33, 12, 23, 5])],
        'right': {
            'type': 'doughnut',
            'categories': ['B 33%', 'A 27%', 'D 23%', 'C 12%', 'E 5%'],
            'series': [('시나리오 확률', [33, 27, 23, 12, 5])],
        },
    },
    10: {
        # Main Bet ROI 라인
        'type': 'line',
        'categories': ['M0', 'M6', 'M12', 'M18', 'M24', 'M30', 'M36'],
        'series': [
            ('누적 투자 (조원)', [-2, -8, -14, -18, -20, -21, -22]),
            ('누적 매출 효과 (조원)', [0, 2, 8, 16, 22, 32, 50]),
            ('순 누적 (조원)', [-2, -6, -6, -2, 2, 11, 28]),
        ],
    },
}


# -------------------------------------------------------------------------
# 메인
# -------------------------------------------------------------------------

def normalize_text(s):
    """텍스트 비교를 위한 정규화 — 공백·줄바꿈·' / ' 통일."""
    if not s:
        return ''
    s = s.replace('\r', '\n')
    # ' / ' 또는 '/'를 \n으로 통일
    s = s.replace(' / ', '\n').replace('/  ', '\n')
    # 모든 종류의 공백을 단일 공백으로
    parts = []
    for line in s.split('\n'):
        line = ' '.join(line.split()).strip()
        if line:
            parts.append(line)
    return '\n'.join(parts)


def fuzzy_replace(slide_idx, slide):
    """슬라이드의 텍스트 박스를 SLIDE_CONTENT 매핑에 따라 교체."""
    mapping = SLIDE_CONTENT.get(slide_idx, {})
    if not mapping:
        return

    # 매핑 키들도 정규화한 사본 준비
    norm_mapping = {normalize_text(k): v for k, v in mapping.items()}

    for shape in slide.shapes:
        if not shape.has_text_frame:
            continue
        original = shape.text_frame.text
        if not original.strip():
            continue

        norm_original = normalize_text(original)

        # 정규화된 정확 매치
        if norm_original in norm_mapping:
            new_text = norm_mapping[norm_original]
            if '\n' in new_text:
                lines = new_text.split('\n')
                set_text_with_lines(shape.text_frame, lines)
            else:
                replace_text_keep_format(shape.text_frame, new_text)
            continue

        # 부분 매치 (시작 부분이 일치하는 가장 긴 키)
        best_match = None
        best_len = 0
        for k_norm, v in norm_mapping.items():
            if not k_norm:
                continue
            # 정규화된 텍스트가 키로 시작하거나 키를 포함하는 경우
            if norm_original.startswith(k_norm[:min(len(k_norm), 30)]) or k_norm.startswith(norm_original[:min(len(norm_original), 30)]):
                if len(k_norm) > best_len:
                    best_match = v
                    best_len = len(k_norm)
        if best_match:
            if '\n' in best_match:
                lines = best_match.split('\n')
                set_text_with_lines(shape.text_frame, lines)
            else:
                replace_text_keep_format(shape.text_frame, best_match)


def update_charts(slide_idx, slide):
    """슬라이드에 차트가 있으면 데이터 교체."""
    chart_def = CHART_DATA.get(slide_idx)
    if not chart_def:
        return

    charts = []
    for shape in slide.shapes:
        if shape.has_chart:
            charts.append(shape.chart)

    if not charts:
        return

    # 첫 번째 차트
    if 'series' in chart_def:
        try:
            replace_chart_data_bar(charts[0], chart_def['categories'], chart_def['series'])
        except Exception as e:
            print(f'  Slide {slide_idx} chart 1 update error: {e}')

    # 두 번째 차트 (slide 9의 우측 도넛)
    if len(charts) > 1 and 'right' in chart_def:
        try:
            replace_chart_data_bar(
                charts[1],
                chart_def['right']['categories'],
                chart_def['right']['series'],
            )
        except Exception as e:
            print(f'  Slide {slide_idx} chart 2 update error: {e}')


def main():
    print(f'Loading template: {TEMPLATE}')
    prs = Presentation(TEMPLATE)

    print(f'Total slides: {len(prs.slides)}')

    for i, slide in enumerate(prs.slides, start=1):
        print(f'  Processing slide {i}...')
        fuzzy_replace(i, slide)
        update_charts(i, slide)

    print(f'Saving to: {OUTPUT}')
    prs.save(OUTPUT)
    size = os.path.getsize(OUTPUT) / 1024
    print(f'Done. Output size: {size:.1f} KB')


if __name__ == '__main__':
    main()
