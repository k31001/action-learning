# -*- coding: utf-8 -*-
"""메모리 해법 사다리 — 단독 1장 덱 (네 지표 P/E · BER · DWPD · WAF). 슬라이드 본체는 solution_ladder_slide.build()가 그린다.

실행: .venv/bin/python outputs/presentation/scripts/generate_solution_ladder_pptx.py
출력: outputs/presentation/memory-solution-ladder.pptx  (렌더 검증: FONT_LATIN=NanumGothic FONT_EA=NanumGothic OUT_PATH=<scratch>.pptx)
같은 슬라이드가 QLC eSSD 전략 덱(generate_qlc_ssd_strategy_pptx.py)의 1장으로도 들어간다.
콘텐츠 소스: outputs/report/memory-solution-ladder-report.md §2.5·부록 B · wiki/concepts/solution-ladder-component-to-system.md §2.5
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import deck_kit as K
import solution_ladder_slide

K.TOTAL = 1
OUT = os.environ.get("OUT_PATH") or os.path.join(K.HERE, "..", "memory-solution-ladder.pptx")
solution_ladder_slide.build(K, page_no=1)
K.prs.save(os.path.abspath(OUT))
print(f"생성 완료: {os.path.abspath(OUT)} (1장)")
