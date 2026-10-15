"""「고객 협력 전략」 발표 영상 — 대본 · 화면 효과 큐 · 내레이션 합성 (ko-KR-SunHiNeural, +4%)

  python3 -m venv .venv-tts && .venv-tts/bin/pip install edge-tts
  SSL_CERT_FILE=/root/.ccr/ca-bundle.crt .venv-tts/bin/python outputs/motion/ssd-future-ready-video/narration.py
    → narration.mp3 (완성 트랙) + cues.js (대사 시각 · 화면 효과 · 단어 시각) + script.md (대본, 타임코드 포함)

원본: outputs/presentation/ssd-future-ready-strategy.pptx 1~4장. 슬라이드 글자를 읽지 않고, 장면마다
"왜 이걸 보는가"를 말로 잇는 발표 대본(v2). 사실 · 수치는 슬라이드와 발표자 노트 범위 안에서만 쓴다.

LINES = (슬라이드, 간격 종류, 화면 효과, 대사). 화면 효과(fx):
  view  카메라 목표 영역 이름(REGIONS) 또는 "full" — 없으면 앞 카메라 유지(장 첫 대사는 full)
  spot  동시에 밝힐 영역 목록          seq  [(대사 속 단어, 영역)] — 그 단어를 읽는 순간 차례로 밝힘
  under 밑줄 영역                      click 덱의 클릭 애니메이션(클릭 전 → 후 이미지 전환)
대사는 화면 표기, 합성 직전 PRON으로 발음 표기(에프디피 · 와프 …)로 바꾼다. 단어 시각은 edge-tts WordBoundary.
"""
import asyncio
import json
import math
import os
import re
import ssl
import subprocess
import tempfile

DIR = os.path.dirname(os.path.abspath(__file__))
VOICE = "ko-KR-SunHiNeural"
RATE = "+4%"
TAIL = 3.0  # 마지막 결론 화면 유지
GAP = {"s": 0.45, "beat": 0.75, "click": 0.85, "slide": 1.9, "start": 1.2}

# 영역 (x0, y0, x1, y1) — 1600 × 900 기준 슬라이드 좌표
REGIONS = {
    1: {"title": (58, 70, 1275, 166), "hbm": (62, 185, 360, 458), "cloud": (376, 185, 658, 458),
        "train": (669, 185, 951, 458), "agent": (1256, 185, 1538, 458), "infer": (962, 185, 1246, 458),
        "infer_req": (975, 420, 1160, 448), "apps": (376, 185, 1538, 458), "table": (62, 476, 1538, 760),
        "demand": (62, 766, 1542, 832), "lower": (62, 476, 1542, 832)},
    2: {"title": (58, 70, 1135, 166), "left": (62, 185, 790, 588), "r1": (62, 265, 790, 340),
        "r2": (62, 347, 790, 422), "r3": (62, 428, 790, 504), "r4": (62, 510, 790, 586),
        "tech": (806, 185, 1545, 588), "legend": (812, 232, 1452, 262),
        "ft1": (1302, 278, 1540, 330), "ft2": (1300, 627, 1538, 746),
        "dk1": (808, 357, 1053, 414), "dk2": (808, 438, 1053, 495), "dk3": (1055, 438, 1298, 495),
        "dk4": (808, 519, 1053, 576), "band": (56, 616, 1540, 750), "band3": (56, 616, 800, 750),
        "concl": (62, 755, 1540, 825)},
    3: {"title2": (58, 116, 1330, 164), "era": (62, 180, 1540, 292), "era_ai": (888, 180, 1540, 292),
        "sec1": (62, 300, 746, 552), "gc_tech": (62, 346, 410, 552), "spike": (418, 346, 746, 446),
        "calm": (418, 450, 746, 548), "waf": (62, 612, 394, 822), "p99": (410, 612, 746, 822),
        "sec2": (62, 560, 746, 822), "sec3": (770, 300, 1542, 822), "chart": (770, 340, 1328, 822), "c1": (1332, 346, 1542, 466),
        "c2": (1332, 466, 1542, 584), "c3": (1332, 584, 1542, 702), "c4": (1332, 702, 1542, 822)},
    4: {"title": (58, 70, 880, 166), "contract": (62, 190, 452, 662), "myd_now": (62, 278, 452, 420),
        "contract_new": (62, 425, 452, 662), "stack": (480, 190, 972, 615), "strong": (484, 505, 812, 615),
        "kvmgr": (484, 333, 812, 386), "path": (812, 345, 968, 560), "crm": (483, 622, 970, 750),
        "people": (1000, 190, 1540, 752), "spec_now": (1000, 278, 1540, 400), "tasks": (1003, 456, 1540, 750),
        "t1": (1016, 490, 1174, 740), "t2": (1192, 490, 1350, 740), "t3": (1368, 490, 1526, 740),
        "concl": (62, 766, 1540, 835)},
}

LINES = [
    # ── 1장 현황: 무엇을 늦게 읽으면 안 되는가 ───────────────────────────
    (1, "start", {"view": "full", "spot": ["title"]},
     "불확실한 AI 시대, SSD는 무엇을 준비해야 할까요? 그 답으로 고객 협력 전략을 말씀드리겠습니다."),
    (1, "beat", {"view": "hbm", "spot": ["hbm"]},
     "먼저 아픈 기억 하나, HBM입니다. 2022년 40퍼센트였던 삼성의 점유율은, 2025년 2분기 17퍼센트까지 내려왔습니다."),
    (1, "s", {"spot": ["hbm"]},
     "수요 하나를 늦게 읽으면, 첫 호황을 통째로 놓칠 수 있다는 교훈입니다."),
    (1, "beat", {"view": "apps", "seq": [("클라우드", "cloud"), ("학습", "train"), ("에이전트", "agent")]},
     "그렇다면 SSD에서 지금 읽어야 할 수요는 무엇일까요? 데이터센터 응용마다 바라는 것이 다릅니다. 클라우드는 격리를, 학습은 대역을, 에이전트는 값싼 용량을 원합니다."),
    (1, "s", {"view": "infer", "spot": ["infer"]},
     "그런데 AI 추론은 결이 다릅니다. 추론에서 SSD는 HBM과 DRAM 아래에 붙는 또 하나의 메모리 계층입니다. KV 캐시가 넘치면 SSD로 내려가고, 필요하면 다시 올라오죠."),
    (1, "s", {"spot": ["infer"], "under": "infer_req"},
     "그래서 추론은 대역과 꼬리 지연, 그리고 내구까지, 세 가지를 한꺼번에 요구합니다."),
    (1, "beat", {"view": "lower", "spot": ["table"]},
     "삼성은 제품군별로 이런 수요에 대응하고 있습니다. 문제는 수요의 무게중심입니다."),
    (1, "s", {"spot": ["demand"]},
     "eSSD 수요에서 추론의 비중은, 2025년 31퍼센트에서 2030년 79퍼센트로 커질 전망입니다."),
    (1, "click", {"view": "full", "click": True},
     "무게중심은 추론입니다. 그래서 지금부터는 추론에 집중하겠습니다."),
    # ── 2장 추론 대응: 추론을 쪼개 보면 결국 고객이다 ──────────────────────
    (2, "slide", {"view": "left", "spot": ["left"]},
     "추론도 한 덩어리가 아닙니다. 네 가지 수요로 나뉘고, 바라는 것도 다릅니다."),
    (2, "s", {"seq": [("가중치", "r1"), ("래그", "r2"), ("케이브이", "r3"), ("에이전트", "r4")]},
     "모델 가중치는 빠른 로딩 대역이, RAG는 작은 읽기의 꼬리 지연이, KV 캐시는 대역, 지연, 내구 모두가, 에이전트 메모리는 용량과 보안이 관건입니다."),
    (2, "beat", {"view": "tech", "spot": ["tech"]},
     "이 요구를 채우는 기술들을 놓고 보니, 공통점이 하나 보입니다."),
    (2, "s", {"seq": [("색이", "legend"), ("폴트", "ft1+ft2")]},
     "색이 진할수록 고객과 깊이 협력해야 하는데, SSD 혼자 끝낼 수 있는 기술은 Fault Tolerant 하나뿐입니다."),
    (2, "s", {"spot": ["dk1", "dk2", "dk3", "dk4"]},
     "FDP와 Mixed Media는 최적화까지 고객과 함께 해야 하고, 나머지도 고객 시스템과 함께 개발해야 합니다."),
    (2, "click", {"view": "full", "click": True, "spot": ["band3"]},
     "특히 FDP, Mixed Media, Large Mapping, 이 세 기술이 추론 수요 곳곳에 걸려 있습니다."),
    (2, "s", {"spot": ["concl"]},
     "그러니 결론은 분명합니다. AI 추론 수요는, 고객과 함께가 아니면 대응할 수 없습니다."),
    # ── 3장 차별화 · 포트폴리오: 세 기술이 바꾸는 것 ──────────────────────
    (3, "slide", {"view": "era", "seq": [("성능", "era"), ("예측", "era_ai")]},
     "그렇다면 이 세 기술은 무엇을 바꿀까요? SSD에 대한 요구는 성능, 전력 효율, VM 단위 QoS를 거쳐, 이제 예측 가능한 QoS, 고용량, 고내구로 바뀌고 있습니다."),
    (3, "beat", {"view": "sec1", "spot": ["spike"]},
     "예측 가능한 QoS의 적은 가비지 컬렉션, GC입니다. GC가 도는 동안 읽기가 기다리고, 지연이 튀어 오릅니다."),
    (3, "s", {"seq": [("믹스드", "gc_tech"), ("예측", "calm")]},
     "세 기술은 GC를 각자 다르게 줄입니다. Mixed Media는 빈도를, Large Mapping은 횟수를, FDP는 시간을 줄여, 지연을 예측 가능하게 만듭니다."),
    (3, "beat", {"view": "sec2", "spot": ["waf"]},
     "숫자로 보면, Meta CacheLib에 FDP를 적용하자, 쓰기 증폭 WAF가 3.22에서 1.03으로, 68퍼센트 줄었습니다."),
    (3, "s", {"spot": ["p99"]},
     "PM9D3a RocksDB 실험에서는, p99.9 꼬리 지연이 55퍼센트 줄었습니다."),
    (3, "beat", {"view": "sec3", "spot": ["sec3"]},
     "WAF가 3에서 1로 줄면, 같은 낸드로도 하루에 쓸 수 있는 양, DWPD를 약 3배로 늘릴 수 있습니다."),
    (3, "click", {"click": True, "seq": [("큐엘씨는", "chart+c1"), ("고성능", "chart+c2"), ("고내구", "chart+c3"), ("에스엘씨급은", "chart+c4")]},
     "네 제품군이 한꺼번에 넓어집니다. QLC는 1 DWPD로 KV 오프로드에 들어가고, 고성능 TLC는 3, 고내구 TLC는 9, SLC급은 100 가까이 갑니다."),
    (3, "s", {"view": "full", "spot": ["title2"]},
     "미리 준비한 기술이 있어야, 미래 수요에 끌려가지 않고 먼저 대응할 수 있습니다."),
    # ── 4장 실행: 계약 · 역량 · 사람 ───────────────────────────────────
    (4, "slide", {"view": "full", "spot": ["title"]},
     "다만 조건이 하나 있습니다. 이 효과는 SSD 혼자서는 나오지 않고, 고객 시스템 안에서 나옵니다. 그래서 고객과 함께, 계약, 역량, 사람, 세 가지로 설계하겠습니다."),
    (4, "beat", {"view": "contract", "spot": ["myd_now"]},
     "첫째, 계약입니다. 지금의 다년 계약, MYD는 수량과 가격만 약속합니다."),
    (4, "s", {"spot": ["contract_new"]},
     "Micron은 Anthropic과 다년 공급 위에 공동 설계와 운영 통합까지 묶었습니다. 우리도 MYD 위에 기술 협력을 쌓아야 합니다."),
    (4, "beat", {"view": "stack", "seq": [("여섯", "stack"), ("낸드와", "strong"), ("수명", "kvmgr")]},
     "둘째, 역량입니다. 추론 스택을 여섯 층으로 보면, 삼성은 아래쪽 NAND와 SSD 펌웨어에 강합니다. 그런데 데이터가 언제 지워질지, 그 수명 정보는 위쪽 KV 캐시 관리자에 있습니다."),
    (4, "s", {"seq": [("이", "path"), ("관계도", "crm")]},
     "이 정보를 SSD까지 내려보내는 길을 고객과 함께 놓는 것이, 필요한 역량입니다. 고객 관계도 경영진과 영업을 넘어, 엔지니어 대 엔지니어로 넓혀야 합니다."),
    (4, "beat", {"view": "people", "spot": ["spec_now"]},
     "셋째, 사람입니다. 스펙 문서로는 고객이 적어 준 요구만 전달됩니다. 정말 중요한 요구는 현장에 있습니다."),
    (4, "s", {"seq": [("팔란티어의", "tasks"), ("측정하고", "t1"), ("최적화하고", "t2"), ("차세대", "t3")]},
     "그래서 Palantir의 FDE처럼, 삼성 엔지니어가 고객 데이터센터 안에 상주하며, 워크로드를 측정하고, 스택을 최적화하고, 차세대 제품을 함께 논의하겠습니다."),
    (4, "beat", {"view": "full", "spot": ["concl"]},
     "이 기술들은 실패할 수도 있습니다. 하지만 실패할 수도 있는 기술에 투자하는 것이야말로, 불확실한 미래에 실패하지 않는 불변 전략입니다. 감사합니다."),
]

# 화면 표기 → 발음용 표기 (긴 것부터 치환)
PRON = {
    "Multi-Tenant QoS": "멀티 테넌트 큐오에스", "Mixed Media": "믹스드 미디어", "Large Mapping": "라지 매핑",
    "Fault Tolerant": "폴트 톨러런트", "CacheLib": "캐시립", "RocksDB": "락스디비", "PM9D3a": "피엠 구디삼에이",
    "p99.9": "피 구구점구", "Anthropic": "앤트로픽", "Palantir": "팔란티어", "Micron": "마이크론", "Meta": "메타",
    "eSSD": "이에스에스디", "DWPD": "디더블유피디", "DRAM": "디램", "NAND": "낸드", "HBM": "에이치비엠",
    "FDP": "에프디피", "WAF": "와프", "QoS": "큐오에스", "TLC": "티엘씨", "QLC": "큐엘씨", "SLC": "에스엘씨",
    "MYD": "엠와이디", "FDE": "에프디이", "RAG": "래그", "SSD": "에스에스디", "GC": "지씨", "KV": "케이브이",
    "VM": "브이엠", "AI": "에이아이",
}
FX_LABEL = {"view": "카메라", "spot": "강조", "seq": "차례 강조", "under": "밑줄", "click": "클릭"}


def spoken(text):
    for k in sorted(PRON, key=len, reverse=True):
        text = text.replace(k, PRON[k])
    return text


def ff(*args):
    subprocess.run(["ffmpeg", "-nostdin", "-loglevel", "error", "-y", *args], check=True)


def probe(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path],
                         check=True, capture_output=True, text=True).stdout
    return float(out)


def mmss(t):
    return f"{int(t // 60)}:{t % 60:04.1f}"


def main():
    import edge_tts
    import edge_tts.communicate as _comm
    if os.environ.get("SSL_CERT_FILE"):
        _comm._SSL_CTX = ssl.create_default_context(cafile=os.environ["SSL_CERT_FILE"])

    async def synth(text, path):
        words = []
        with open(path, "wb") as f:
            async for ch in edge_tts.Communicate(text, VOICE, rate=RATE, boundary="WordBoundary").stream():
                if ch["type"] == "audio":
                    f.write(ch["data"])
                elif ch["type"] == "WordBoundary":
                    words.append((ch["offset"] / 1e7, ch["text"]))
        return words

    tmp = tempfile.mkdtemp(prefix="sfr-nar-")
    clips, cues, t = [], [], 0.0
    for i, (slide, gap, fx, text) in enumerate(LINES):
        at = round(t + GAP[gap], 3)
        raw, head, cut = (os.path.join(tmp, f"{n}{i}.{e}") for n, e in (("l", "mp3"), ("h", "wav"), ("c", "wav")))
        words = asyncio.run(synth(spoken(text), raw))
        trim = "silenceremove=start_periods=1:start_threshold=-45dB"
        ff("-i", raw, "-af", trim, "-ar", "48000", "-ac", "1", head)
        lead = probe(raw) - probe(head)  # 앞 무음 길이 — 단어 시각 보정
        ff("-i", head, "-af", f"areverse,{trim},areverse", cut)
        t = at + probe(cut)
        clips.append((at, cut))
        cue = {"slide": slide, "at": at, "end": round(t, 3), **{k: v for k, v in fx.items() if k != "seq"}}
        if "seq" in fx:
            seq, k = [], 0
            for word, region in fx["seq"]:
                key = spoken(word)
                while k < len(words) and key not in words[k][1]:
                    k += 1
                assert k < len(words), f"단어 '{key}'를 대사 {i + 1}에서 찾지 못함: {[w for _, w in words]}"
                seq.append([round(at + max(0.0, words[k][0] - lead), 3), region])
                k += 1
            cue["seq"] = seq
        cues.append(cue)
        print(f"{slide}  {mmss(at)} → {mmss(t)}  {text[:44]}")
    duration = float(math.ceil(t + TAIL))

    inputs, chains = [], []
    for k, (at, cut) in enumerate(clips):
        inputs += ["-i", cut]
        ms = int(at * 1000)
        chains.append(f"[{k}]adelay={ms}|{ms}[d{k}]")
    mix = "".join(f"[d{k}]" for k in range(len(clips)))
    fc = ";".join(chains) + f";{mix}amix=inputs={len(clips)}:normalize=0,apad,atrim=0:{duration}," \
         "loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000"
    ff(*inputs, "-filter_complex", fc, "-ac", "2", "-c:a", "libmp3lame", "-b:a", "192k",
       os.path.join(DIR, "narration.mp3"))
    with open(os.path.join(DIR, "cues.js"), "w", encoding="utf-8") as f:
        f.write("// GENERATED by narration.py — 대사 시각(초) · 화면 효과 · 영역 · 영상 길이\n"
                f"window.CUES = {json.dumps(cues, ensure_ascii=False)};\n"
                f"window.REGIONS = {json.dumps(REGIONS)};\nwindow.DURATION = {duration};\n")
    write_md(cues, duration)
    print(f"길이 {mmss(duration)} · narration.mp3 · cues.js · script.md")


def fx_text(fx):
    parts = []
    if fx.get("click"):
        parts.append("**[클릭]**")
    if fx.get("view"):
        parts.append(f"카메라 → {fx['view']}")
    if fx.get("spot"):
        parts.append("강조 " + " · ".join(fx["spot"]))
    if fx.get("seq"):
        parts.append("차례 강조 " + " → ".join(f"{r}(「{w}」)" for w, r in fx["seq"]))
    if fx.get("under"):
        parts.append(f"밑줄 {fx['under']}")
    return " / ".join(parts)


def write_md(cues, duration):
    titles = {1: "현황 — 무엇을 늦게 읽으면 안 되는가", 2: "AI 추론 대응 — 쪼개 보면 결국 고객",
              3: "차별화 · 포트폴리오 — 세 기술이 바꾸는 것", 4: "실행 전략 — 계약 · 역량 · 사람"}
    n = sum(len(re.sub(r"[^가-힣A-Za-z0-9]", "", l[3])) for l in LINES)
    out = ["# 「불확실성이 높은 미래에 대응하기 위한 고객 협력 전략」 발표 영상 대본 v2", "",
           f"- 원본: `outputs/presentation/ssd-future-ready-strategy.pptx` 1~4장 · 내레이션 {VOICE} {RATE}",
           f"- 총 길이 **{mmss(duration)}** (합성 실측) · 대사 {n:,}자",
           "- 슬라이드 글자를 그대로 읽지 않고, 장면마다 '왜 이걸 보는가'를 질문 → 답으로 잇는다", ""]
    for s in (1, 2, 3, 4):
        cs = [(c, l) for c, l in zip(cues, LINES) if c["slide"] == s]
        a, b = cs[0][0]["at"], cs[-1][0]["end"]
        out += [f"## {s}장 · {titles[s]}  `{mmss(a)} – {mmss(b)}` ({b - a:.0f}초)", "",
                "| 시각 | 화면 효과 | 대사 |", "|---|---|---|"]
        out += [f"| {mmss(c['at'])} | {fx_text(l[2])} | {l[3]} |" for c, l in cs]
        out.append("")
    with open(os.path.join(DIR, "script.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(out))


if __name__ == "__main__":
    main()
