"""표지 히어로 이미지에 다크 오버레이 사전 합성.

hero-cover.png 위에 (1) NAVY #0A1854 45% 전면 오버레이,
(2) 세로 그라데이션(높이 40% 지점 0% → 하단 65%)을 합성해
hero-cover-composited.png 를 만든다. PPTX에는 합성본 한 장만 삽입한다
(pptx 투명도 XML 의존 제거 — 디자인 스펙 §5.1).

실행: .venv/bin/python outputs/presentation/scripts/compose_storyline_hero.py
"""
import os

import numpy as np
from PIL import Image

ASSETS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets", "storyline-overview")
NAVY = np.array([0x0A, 0x18, 0x54], dtype=float)

im = Image.open(os.path.join(ASSETS, "hero-cover.png")).convert("RGB")
w, h = im.size
arr = np.asarray(im, dtype=float)

arr = arr * (1 - 0.45) + NAVY * 0.45  # 전면 45%

ys = np.linspace(0.0, 1.0, h)
alpha = np.clip((ys - 0.40) / 0.60, 0.0, 1.0) * 0.65  # 40% 지점부터 하단 65%까지
arr = arr * (1 - alpha[:, None, None]) + NAVY * alpha[:, None, None]

out = os.path.join(ASSETS, "hero-cover-composited.png")
Image.fromarray(arr.astype("uint8")).save(out)
print("saved", out, im.size)
