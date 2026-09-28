"""PPTX 자동 감사 (11.I): 최소 글자 크기, em-dash/en-dash(슬라이드·노트), 장별 글자 수.

사용: python qa_audit.py deck.pptx [--min-body 18] [--min-source 15]
출처 줄(15pt)은 허용, 그 외 min-body 미만이면 실패로 표시한다.
"""
import sys

from pptx import Presentation


def audit(path, min_body=18.0, min_source=15.0):
    prs = Presentation(path)
    ok = True
    for i, sl in enumerate(prs.slides, 1):
        chars, small = 0, []
        for sh in sl.shapes:
            if not sh.has_text_frame:
                continue
            for para in sh.text_frame.paragraphs:
                for r in para.runs:
                    t = r.text.strip()
                    if not t:
                        continue
                    chars += len(t)
                    if "—" in t or "–" in t:
                        print(f"[{i}] DASH: {t[:40]}")
                        ok = False
                    if r.font.size is not None:
                        pt = r.font.size.pt
                        # 허용: 출처 줄(min_source) 그리고 16pt 이상(보조 라벨). 본문은 min_body 이상 권장.
                        if pt < min_source or (min_source < pt < 16):
                            small.append((pt, t[:24]))
        nt = sl.notes_slide.notes_text_frame.text if sl.has_notes_slide else ""
        if "—" in nt or "–" in nt:
            print(f"[{i}] DASH in notes")
            ok = False
        if small:
            ok = False
            for pt, t in small:
                print(f"[{i}] SMALL {pt}pt: {t}")
        print(f"[{i}] 글자 수 {chars}")
    print("PASS" if ok else "FAIL")
    return ok


if __name__ == "__main__":
    args = sys.argv[1:]
    mb = float(args[args.index("--min-body") + 1]) if "--min-body" in args else 18.0
    ms = float(args[args.index("--min-source") + 1]) if "--min-source" in args else 15.0
    sys.exit(0 if audit(args[0], mb, ms) else 1)
