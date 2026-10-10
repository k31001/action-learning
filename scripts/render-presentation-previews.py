"""발표자료 탭 웹 보기용 슬라이드 이미지 렌더.

사용: .venv/bin/python scripts/render-presentation-previews.py [deck-id ...]
  - 목록: dashboard/src/data/presentations.js 의 id · file
  - 원본: outputs/presentation/<file> → 글꼴을 NanumGothic으로 바꾼 임시 사본(렌더 QA와 같은 조건)
    → soffice PDF → dashboard/public/presentations/<id>/slide-NN.jpg (1600 × 900)
  - 장 수: dashboard/src/data/presentationPreviews.js (GENERATED) 갱신
덱을 다시 만들면 node scripts/sync-presentations.mjs 와 함께 다시 실행한다.
"""
import re, shutil, subprocess, sys, tempfile, zipfile
from pathlib import Path

import pymupdf

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "dashboard/src/data/presentations.js"
PUB = ROOT / "dashboard/public/presentations"
MANIFEST = ROOT / "dashboard/src/data/presentationPreviews.js"
FONT = "NanumGothic"

src = DATA.read_text(encoding="utf-8")
decks = re.findall(r"id: '([^']+)',\s*\n\s*file: '([^']+)'", src)
only = set(sys.argv[1:])

def retarget_fonts(pptx: Path, out: Path):
    with zipfile.ZipFile(pptx) as zin, zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            data = zin.read(item.filename)
            if item.filename.endswith(".xml") and (item.filename.startswith("ppt/slides/") or "theme" in item.filename
                                                   or "slideMaster" in item.filename or "slideLayout" in item.filename):
                data = re.sub(rb'(<a:(?:latin|ea|cs) typeface=")[^"]*(")', rb"\g<1>" + FONT.encode() + rb"\g<2>", data)
            zout.writestr(item, data)

counts = {}
if MANIFEST.exists():
    counts.update(dict(re.findall(r"'([^']+)': (\d+)", MANIFEST.read_text(encoding="utf-8"))))
for deck_id, file in decks:
    if only and deck_id not in only:
        continue
    with tempfile.TemporaryDirectory() as tmp:
        tmp = Path(tmp)
        retarget_fonts(ROOT / "outputs/presentation" / file, tmp / "deck.pptx")
        subprocess.run(["soffice", "--headless", "--convert-to", "pdf", "deck.pptx"], cwd=tmp,
                       check=True, capture_output=True, timeout=300)
        doc = pymupdf.open(tmp / "deck.pdf")
        dest = PUB / deck_id
        shutil.rmtree(dest, ignore_errors=True)
        dest.mkdir(parents=True)
        for i, page in enumerate(doc, 1):
            zoom = 1600 / page.rect.width
            page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom)).save(dest / f"slide-{i:02d}.jpg", jpg_quality=82)
        counts[deck_id] = len(doc)
        size = sum(p.stat().st_size for p in dest.iterdir()) / 1024
        print(f"  {deck_id}: {len(doc)} slides, {size:.0f}KB")

order = [d for d, _ in decks if d in counts]
body = "\n".join(f"  '{d}': {counts[d]}," for d in order)
MANIFEST.write_text(
    "// GENERATED — .venv/bin/python scripts/render-presentation-previews.py 로 재생성 (손으로 고치지 말 것)\n"
    "// 덱 id → 웹 보기 슬라이드 이미지 수 (public/presentations/<id>/slide-NN.jpg)\n"
    f"export const PREVIEW_SLIDES = {{\n{body}\n}}\n", encoding="utf-8")
print(f"manifest → {MANIFEST.relative_to(ROOT)}")
