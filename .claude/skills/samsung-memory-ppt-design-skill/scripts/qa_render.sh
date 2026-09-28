#!/usr/bin/env bash
# 렌더 QA (11.I): 생성기를 NanumGothic으로 돌려 PDF·PNG로 렌더하고 자동 감사한다.
# 사용: qa_render.sh <generator.py> <scratch_dir> [python]
# 생성기는 OUT_PATH 환경변수로 출력 경로를 받아야 한다.
set -euo pipefail
GEN="$1"; OUT="$2"; PY="${3:-python3}"
HERE="$(cd "$(dirname "$0")" && pwd)"
mkdir -p "$OUT"
FONT_LATIN=NanumGothic FONT_EA=NanumGothic OUT_PATH="$OUT/qa.pptx" "$PY" "$GEN"
( cd "$OUT" && rm -f qa.pdf && timeout 180 soffice --headless --convert-to pdf qa.pptx >/dev/null 2>&1 )
"$PY" - "$OUT" <<'PY'
import sys, pymupdf
out = sys.argv[1]
d = pymupdf.open(f"{out}/qa.pdf")
for i, p in enumerate(d, 1):
    p.get_pixmap(dpi=110).save(f"{out}/slide{i}.png")
print("rendered", len(d), "slides ->", out)
PY
"$PY" "$HERE/qa_audit.py" "$OUT/qa.pptx"
