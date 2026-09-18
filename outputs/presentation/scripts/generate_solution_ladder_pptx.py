# -*- coding: utf-8 -*-
"""메모리 해법 사다리 — 1장 슬라이드 (「QLC eSSD 전략」 부속 분석의 요약).

좌: 사다리 차트(assets/solution_ladder_chart.png — generate_solution_ladder_chart.py)
우: 두 축 도식(사다리 5칸 + ① 이관 ↑ / ② 자기 진화 →) + 키 숫자 3(31년 · 6년 · 10~40배)
하: 결론 밴드
디자인 시스템·헬퍼: deck_kit.py(QLC 덱과 동일 토큰)
실행: .venv/bin/python outputs/presentation/scripts/generate_solution_ladder_pptx.py
출력: outputs/presentation/memory-solution-ladder.pptx  (렌더 검증: FONT_LATIN=NanumGothic FONT_EA=NanumGothic OUT_PATH=<scratch>.pptx)
콘텐츠 소스: outputs/report/memory-solution-ladder-report.md 부록 B · wiki/concepts/solution-ladder-component-to-system.md
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import deck_kit as K
from deck_kit import (ASSETS, BLANK, BLUE, BLUE_T2, CW, GRAY, GRAY_2, HERE, INK, LINE, MX, RIGHT, TINT, WHITE,
                      band, footer, header, notes, prs, rect, tb)
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.util import Inches
from PIL import Image

K.TOTAL = 1
OUT = os.environ.get("OUT_PATH") or os.path.join(HERE, "..", "memory-solution-ladder.pptx")
CHART = os.path.join(ASSETS, "solution_ladder_chart.png")
cw, ch = Image.open(CHART).size
ASPECT = cw / ch

s = prs.slides.add_slide(BLANK)
header(s, "메모리 해법 사다리 · 단품 한계와 상위 계층",
       "단품의 한계는 상위 계층에서 해결돼 왔습니다. QLC의 호스트 협력은 그 사다리의 다음 칸입니다",
       "NAND는 컨트롤러(1991)→호스트(2022)→애플리케이션(2025)으로 올랐고, DRAM은 HBM(2013) 뒤 PRAC(2024)·CXL로 뒤따릅니다.")

# ---- 좌: 사다리 차트 ----
C_Y, C_H = 2.80, 6.40
C_W = C_H * ASPECT
s.shapes.add_picture(CHART, Inches(MX), Inches(C_Y), height=Inches(C_H))

# ---- 우: 두 축 도식 ----
RX = MX + C_W + 0.36
RW = RIGHT - RX
P_H = 3.34
rect(s, RX, C_Y, RW, P_H, fill=WHITE, line=LINE, line_w=0.75)
tb(s, RX + 0.28, C_Y + 0.14, RW - 0.56, 0.3, [("두 축", 17.25, True, BLUE)])
# 사다리 5칸 (아래→위)
rungs = [("애플리케이션", "NAND 2025 · DRAM 미도달", True),
         ("호스트 · 프로토콜", "NAND 2022 FDP · DRAM 2024 PRAC", True),
         ("컨트롤러 · 디바이스", "NAND 1991 SSD · DRAM 1997 Chipkill", True),
         ("패키지 · 모듈", "HBM 2013 · MRDIMM 2024 · HBF 2026", False),
         ("셀 · 다이", "3D 2013 · QLC 2018 · on-die ECC 2020", False)]
AX_W = 0.34
LX = RX + 0.28 + AX_W + 0.14
LW = RW - 0.56 - AX_W - 0.14
r_h, r_g = 0.40, 0.08
top = C_Y + 0.56
for i, (name, yrs, esc) in enumerate(rungs):
    y = top + i * (r_h + r_g)
    rect(s, LX, y, LW, r_h, fill=BLUE if esc else TINT, line=None if esc else LINE, line_w=0.75)
    tb(s, LX + 0.12, y, 1.72, r_h, [(name, 11.25, True, WHITE if esc else INK)], anchor=MSO_ANCHOR.MIDDLE)
    tb(s, LX + 1.86, y, LW - 1.96, r_h, [(yrs, 9.75, False, WHITE if esc else GRAY)], anchor=MSO_ANCHOR.MIDDLE)
# ① 이관 화살표(위로, 3칸 높이)
esc_h = 3 * r_h + 2 * r_g
rect(s, RX + 0.28, top, AX_W, esc_h, fill=BLUE, shape=MSO_SHAPE.UP_ARROW)
# ② 자기 진화 화살표(오른쪽, 하단 2칸 옆)
sy = top + 3 * (r_h + r_g)
rect(s, RX + 0.28, sy + 0.16, AX_W, 2 * r_h + r_g - 0.32, fill=BLUE_T2, shape=MSO_SHAPE.RIGHT_ARROW)
tb(s, RX + 0.28, top + esc_h + 0.02, RW - 0.56, 0.0, [("", 1, False, GRAY)])
tb(s, RX + 0.28, C_Y + P_H - 0.42, RW - 0.56, 0.36,
   [[("① 이관 ", 10.5, True, BLUE), ("관리 로직이 필요한 한계 → 위로   ", 10.5, False, GRAY),
     ("② 자기 진화 ", 10.5, True, BLUE), ("물리 집적으로 풀리는 한계", 10.5, False, GRAY)]], anchor=MSO_ANCHOR.MIDDLE)

# ---- 우: 키 숫자 3 ----
K_Y = C_Y + P_H + 0.16
tiles = [("31년", "NAND 이관 소요: 디바이스(1991) → 호스트 FDP(2022)"),
         ("6년", "DRAM은 자기 진화(HBM 2013)가 시스템 해법(CXL 2019)보다 앞섰다"),
         ("10~40배", "QLC 정격 DWPD 갭 = 다음 칸(호스트·애플리케이션)이 필요한 이유")]
t_h = 0.74
for i, (num, cap) in enumerate(tiles):
    y = K_Y + i * (t_h + 0.10)
    hot = i == 2
    rect(s, RX, y, RW, t_h, fill=TINT if hot else WHITE, line=None if hot else LINE, line_w=0.75)
    if hot:
        rect(s, RX, y, 0.08, t_h, fill=BLUE)
    tb(s, RX + 0.28, y, 1.9, t_h, [(num, 24, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
    tb(s, RX + 2.2, y, RW - 2.44, t_h, [(cap, 11.25, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.04)
tb(s, RX, K_Y + 3 * (t_h + 0.10) + 0.02, RW, 0.46,
   [("HBF는 시대 역행이 아니라 NAND 자기 진화 축의 늦은 도착이며, 상위 계층이 워크로드를 골라 주어야 성립합니다", 10.5, False, GRAY_2)], spacing=1.04)

band(s, 9.42, 0.80, "결론",
     "QLC의 호스트 협력은 예외가 아니라 사다리의 다음 칸이며, DRAM도 PRAC·CXL로 같은 사다리에 올라섰습니다. 자기 진화 축은 병행합니다",
     main_size=19)
footer(s, "출처: JEDEC(JESD79-5/5A/5C · JESD235 · JESD270-4), NVM Express(ZNS · FDP), CXL 컨소시엄, USENIX FAST'13/'17, ISCA 2014, SanDisk · Micron 보도자료, Kioxia 기술 브리프 · 검색 요약 기반, 등급은 보고서 부록 A", 1)
notes(s, "메모리 해법 사다리 한 장입니다. 명제는 하나입니다. 단품 특성이 고객 요구를 단품 가격에서 못 채우면 해법은 그 부품을 쓰는 상위 계층으로 올라갑니다. "
      "왼쪽 차트는 1990년부터 2030년까지 NAND와 DRAM이 어느 계층에서 한계를 풀었는지 보여줍니다. NAND는 셀의 RBER·P/E 한계를 셀에서 푼 적이 없습니다. 1991년 SSD와 1995년 FTL이 컨트롤러 계층에서 흡수했고, 2x nm의 RBER 급증은 2014~15년 LDPC 컨트롤러가, 그 다음 WAF·OP·QLC 내구성은 호스트 계층(TRIM 2009, Open-Channel·Streams 2017, ZNS 2020, FDP 2022)과 애플리케이션 계층(CacheLib FDP 2025)이 흡수하고 있습니다. 디바이스 칸에서 호스트 칸까지 31년입니다. KV 캐시 관리자 칸은 아직 비어 있습니다. "
      "DRAM은 순서가 반대였습니다. 첫 한계가 대역폭이라 물리 집적, 즉 HBM(2013)이라는 자기 진화가 먼저 왔고, Row Hammer(2014)가 셀 한계를 규명한 뒤 on-die ECC(2020)로 단품이 흡수하다가 RFM(2021)·PRAC(2024)이라는 호스트 협력 규격으로 올라섰습니다. PRAC는 DRAM이 행별 활성화 횟수를 세고 호스트에 경보를 보내 완화 시간을 받는 협력 프로토콜로, 구조적으로 FDP와 같습니다. CXL은 시스템 패브릭 칸입니다. 애플리케이션 칸은 아직 없습니다. "
      "오른쪽은 두 축입니다. ① 이관은 관리 로직이 필요한 한계가 위로 올라가는 축, ② 자기 진화는 물리 집적으로 풀리는 축이며 둘은 병행합니다. NAND는 이관이 먼저였고 자기 진화 패키지(HBF)는 35년 뒤에 왔습니다. DRAM은 자기 진화가 6~11년 먼저였습니다. HBF는 시대 역행이 아니라 NAND 자기 진화 축의 늦은 도착이며, Hot Chips 2026에서 지적된 사용성 한계는 결국 상위 계층이 읽기 중심 워크로드를 골라 주어야 성립함을 보여줍니다. "
      "함의는 셋입니다. QLC의 호스트 협력은 예외가 아니라 사다리의 다음 칸입니다. DRAM도 PRAC·CXL로 같은 사다리에 올라섰으므로 5번째 칸이 열리기 전에 같은 조직 역량이 필요합니다. 자기 진화 축(3D 400+층·HBM4E 커스텀 베이스 다이·HBF)은 이관 축과 같은 로드맵에 놓아야 합니다. 팩트 등급은 보고서 부록 A에 있고, 원문 대조는 후속 과제입니다.")

prs.save(os.path.abspath(OUT))
print(f"생성 완료: {os.path.abspath(OUT)} (1장)")
