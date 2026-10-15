"""「고객 협력 전략」 발표 영상 — 대본 · 내레이션 합성 (ko-KR-SunHiNeural, 기본 속도)

  python3 -m venv .venv-tts && .venv-tts/bin/pip install edge-tts
  SSL_CERT_FILE=/root/.ccr/ca-bundle.crt .venv-tts/bin/python outputs/motion/ssd-future-ready-video/narration.py
    → narration.mp3 (완성 트랙) + cues.js (대사 시작·끝 · 슬라이드 · 화면 효과) + script.md (컨펌용 대본, 타임코드 포함)

원본: outputs/presentation/ssd-future-ready-strategy.pptx 1~4장 (발표자 노트를 5분 분량으로 압축).
LINES의 대사는 화면 표기다. 합성 직전 PRON으로 발음용 표기(에프디피 · 와프 · 디더블유피디 …)로 바꾼다.
간격은 문장 0.45초 · 강조 클릭 전 0.8초 · 장 전환 1.6초. 영상 길이 = 마지막 대사 끝 + TAIL.
"""
import asyncio
import json
import math
import os
import re
import ssl
import subprocess
import sys
import tempfile

DIR = os.path.dirname(os.path.abspath(__file__))
VOICE = "ko-KR-SunHiNeural"
RATE = "+0%"
TAIL = 2.5  # 마지막 결론 화면 유지
GAP = {"s": 0.45, "click": 0.8, "slide": 1.6, "start": 1.0}

# (슬라이드, 간격 종류, 화면 효과 큐, 대사)
LINES = [
    # ── 1장 현황 ─────────────────────────────────────────────
    (1, "start", "제목 표시", "불확실성이 높은 미래에 대응하기 위한 고객 협력 전략을, 네 장으로 말씀드리겠습니다."),
    (1, "s", "HBM 카드 확대", "먼저 HBM의 교훈입니다. 삼성의 HBM 점유율은 2022년 40퍼센트에서, 2025년 2분기 17퍼센트로 내려왔습니다."),
    (1, "s", "", "하나의 수요를 늦게 읽으면, 첫 호황을 놓친다는 것입니다."),
    (1, "s", "응용 카드 3장 순차 강조(범용 · 학습 · 에이전트)", "그래서 데이터센터 응용마다 SSD 요구를 비교했습니다. 범용 클라우드는 QoS와 테넌트 격리, AI 학습은 대역과 체크포인트, 에이전트는 용량과 TB당 비용이 핵심입니다."),
    (1, "s", "AI 추론 카드 확대", "그런데 AI 추론에서 SSD는, GPU HBM과 CPU DRAM 아래에 놓인 메모리 계층입니다. KV 캐시가 넘치면 SSD로 내려가고, 다시 쓸 때 올라옵니다."),
    (1, "s", "「대역 · 지연 · DWPD」 밑줄", "그래서 추론은 대역, 꼬리 지연, 내구를 한꺼번에 요구합니다."),
    (1, "s", "포트폴리오 표 강조", "가운데 표처럼, 삼성은 SSD 제품군별로 각 수요에 대응하고 있습니다."),
    (1, "s", "수요 비중 막대 강조", "맨 아래 eSSD 수요 비중을 보시면, AI 추론이 2025년 31퍼센트에서 2030년 79퍼센트로 커집니다."),
    (1, "click", "[클릭] 추론 열 주황 테두리", "수요는 추론으로 몰리고 있습니다. 그래서 다음 장부터는 추론에 집중하겠습니다."),
    # ── 2장 AI 추론 대응 ─────────────────────────────────────
    (2, "slide", "장 전환 · ① 추론 수요 열 강조", "AI 추론을 다시 네 가지 수요로 나눠 보겠습니다."),
    (2, "s", "행별 순차 강조(① → ② 요구 점)", "모델 가중치는 로딩 순간의 읽기 대역과 용량, RAG와 벡터 DB는 작은 랜덤 읽기의 꼬리 지연과 용량, KV 캐시 오프로드는 대역과 꼬리 지연, 내구까지 모두, 에이전트 메모리는 용량과 격리, 보안이 핵심입니다."),
    (2, "s", "③ 핵심 기술 · 채도 범례 강조", "오른쪽은 이 요구를 채우는 핵심 기술이고, 색의 진하기는 고객 협력의 깊이입니다."),
    (2, "s", "진한 칩 → 중간 칩 → 연한 칩 순차 강조", "FDP와 Mixed Media는 고객 워크로드에서 최적화까지 함께 해야 하고, Large Mapping, Multi-Tenant QoS, Confidential은 고객 시스템 개발이 필요합니다. SSD 안에서 끝나는 것은 Fault Tolerant 하나뿐입니다."),
    (2, "s", "", "네 가지 수요 모두 고객 협력이 필요하고, 그중 세 가지는 최적화까지 함께 해야 합니다."),
    (2, "click", "[클릭] 아래 띠 세 기술 주황 강조", "특히 FDP, Mixed Media, Large Mapping은 추론 수요에 가장 많이 걸리는 세 기술입니다."),
    (2, "s", "결론 띠 강조", "결론적으로, AI 추론 수요에 대응하려면 고객과의 협업이 필수입니다."),
    # ── 3장 차별화 · 포트폴리오 ──────────────────────────────
    (3, "slide", "장 전환 · 맨 위 시대 띠 왼쪽 → 오른쪽", "그렇다면 이 세 기술로 무엇이 달라질까요. SSD의 차별화 요구는 성능, 전력 효율, VM 단위 QoS를 거쳐, AI 시대에는 예측 가능한 QoS, 고용량, 고내구로 바뀌고 있습니다."),
    (3, "s", "① 지연 스파이크 그래프 확대", "1번은 원리입니다. 가비지 컬렉션, 즉 GC가 돌면 읽기가 기다려서 지연 스파이크가 생깁니다."),
    (3, "s", "세 기술 → GC 빈도 · 횟수 · 시간 순차 강조", "Mixed Media는 GC 빈도를, Large Mapping은 GC 횟수를, FDP는 GC 시간을 줄입니다. GC가 드물고 짧아지면 지연을 예측할 수 있게 됩니다."),
    (3, "s", "② WAF −68% 강조", "2번은 그 결과입니다. Meta CacheLib에 FDP를 적용하자 쓰기 증폭, WAF가 3.22에서 1.03으로 68퍼센트 줄었고,"),
    (3, "s", "② p99.9 −55% 강조", "PM9D3a RocksDB에서는 p99.9 꼬리 지연이 55퍼센트 줄었습니다."),
    (3, "s", "③ 3D 포트폴리오 확대", "3번은 포트폴리오입니다. WAF가 3에서 1로 줄면, 같은 낸드로 정격 DWPD를 약 3배 올릴 수 있습니다."),
    (3, "click", "[클릭] 네 제품군 확장 · 오른쪽 카드 순차 강조", "그러면 네 제품군이 한꺼번에 넓어집니다. QLC는 0.3에서 1 DWPD로 KV 오프로드까지 맡고, 고성능 TLC는 1에서 3, 고내구 TLC는 3에서 9, SLC급은 30에서 100 가까이 갑니다."),
    (3, "s", "제목 2행 강조", "미리 대비한 기술이 있어야, 미래 수요에 능동적으로 대응하는 포트폴리오를 완성할 수 있습니다."),
    # ── 4장 실행 전략 ────────────────────────────────────────
    (4, "slide", "장 전환 · 제목 강조", "다만 세 기술의 효과는 SSD 혼자가 아니라, 고객 시스템 안에서 나옵니다. 그래서 전략 고객과 계약, 역량, 사람, 세 가지로 함께 설계하겠습니다."),
    (4, "s", "① 계약 열 강조 · 지금 MYD", "첫째, 계약입니다. 지금의 Multi-Year Deal은 수량과 가격만 약속합니다."),
    (4, "s", "Micron ↔ Anthropic 로고 · 앞으로 블록 쌓기", "Micron은 Anthropic과의 전략적 계약에서 다년 공급 위에 공동 설계와 운영 통합을 묶었습니다. 우리도 MYD 위에 기술 협력을 쌓겠습니다."),
    (4, "s", "② 역량 열 · 추론 스택 6층 강조", "둘째, 역량입니다. 추론 스택을 여섯 층으로 보면, 삼성의 강점은 아래쪽 NAND와 SSD 펌웨어입니다."),
    (4, "s", "수명 정보 → SSD 배치 화살표 강조", "그런데 데이터의 수명 정보는 위쪽 KV 캐시 관리자에 있습니다. 이 정보를 SSD 배치까지 내려보내는 경로를, 고객과 함께 만드는 것이 필요한 역량입니다."),
    (4, "s", "화두 상자 강조", "고객 관계도 경영진과 영업을 넘어, 엔지니어와 엔지니어 사이까지 넓혀야 합니다."),
    (4, "s", "③ 사람 열 · 지금 스펙 문서", "셋째, 사람입니다. 스펙 문서로는 명시된 요구만 오갑니다."),
    (4, "s", "세 가지 핵심 업무 ① → ② → ③ 순차 강조", "Palantir의 FDE처럼, 삼성 엔지니어가 고객 AI 데이터센터 안에서 워크로드를 측정하고, 호스트 소프트웨어 스택을 최적화하고, 차세대 제품 기술을 교류합니다."),
    (4, "s", "결론 띠 강조 · 정지", "실패할 수도 있는 기술에 투자하는 것이, 불확실한 미래에 실패하지 않는 불변 전략입니다. 감사합니다."),
]

# 화면 표기 → 발음용 표기 (긴 것부터 치환)
PRON = {
    "Multi-Tenant QoS": "멀티 테넌트 큐오에스", "Multi-Year Deal": "멀티 이어 딜", "Mixed Media": "믹스드 미디어",
    "Large Mapping": "라지 매핑", "Fault Tolerant": "폴트 톨러런트", "Confidential": "컨피덴셜",
    "CacheLib": "캐시립", "RocksDB": "락스디비", "PM9D3a": "피엠 구디삼에이", "p99.9": "피 구구점구",
    "Anthropic": "앤트로픽", "Palantir": "팔란티어", "OpenAI": "오픈에이아이", "Micron": "마이크론", "Meta": "메타",
    "eSSD": "이에스에스디", "DWPD": "디더블유피디", "DRAM": "디램", "NAND": "낸드", "HBM": "에이치비엠",
    "FDP": "에프디피", "WAF": "와프", "QoS": "큐오에스", "TLC": "티엘씨", "QLC": "큐엘씨", "SLC": "에스엘씨",
    "MYD": "엠와이디", "FDE": "에프디이", "RAG": "래그", "GPU": "지피유", "CPU": "씨피유", "SSD": "에스에스디",
    "TB당": "테라바이트당", "GC": "지씨", "KV": "케이브이", "VM": "브이엠", "DB": "디비", "AI": "에이아이",
}


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
        await edge_tts.Communicate(text, VOICE, rate=RATE).save(path)

    tmp = tempfile.mkdtemp(prefix="sfr-nar-")
    clips, cues, t = [], [], 0.0
    for i, (slide, gap, fx, text) in enumerate(LINES):
        at = round(t + GAP[gap], 3)
        raw, cut = os.path.join(tmp, f"l{i}.mp3"), os.path.join(tmp, f"c{i}.wav")
        asyncio.run(synth(spoken(text), raw))
        trim = "silenceremove=start_periods=1:start_threshold=-45dB"
        ff("-i", raw, "-af", f"{trim},areverse,{trim},areverse", "-ar", "48000", "-ac", "1", cut)
        t = at + probe(cut)
        clips.append((at, cut))
        cues.append({"slide": slide, "at": at, "end": round(t, 3), "fx": fx})
        print(f"{slide}  {mmss(at)} → {mmss(t)}  {text[:40]}")
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
        f.write("// GENERATED by narration.py — 대사 시작·끝(초) · 슬라이드 · 화면 효과 · 영상 길이\nwindow.CUES = "
                + json.dumps(cues, ensure_ascii=False) + f";\nwindow.DURATION = {duration};\n")
    write_md(cues, duration)
    print(f"길이 {mmss(duration)} · narration.mp3 · cues.js · script.md")


def write_md(cues, duration):
    titles = {1: "현황 — 응용마다 다른 SSD 요구, 추론은 세 가지를 한꺼번에",
              2: "AI 추론 대응 — 수요 × 요구 × 기술 × 고객 협력",
              3: "차별화 · 포트폴리오 — GC를 줄여 예측 가능한 QoS, 네 제품군 확장",
              4: "실행 전략 — 계약 · 역량 · 사람"}
    out = ["# 「불확실성이 높은 미래에 대응하기 위한 고객 협력 전략」 발표 영상 대본", "",
           f"- 원본: `outputs/presentation/ssd-future-ready-strategy.pptx` 1~4장 · 내레이션 {VOICE} 기본 속도",
           f"- 총 길이 **{mmss(duration)}** (합성 실측) · 대사 {sum(len(re.sub(r'[^가-힣A-Za-z0-9]', '', l[3])) for l in LINES):,}자", ""]
    for s in (1, 2, 3, 4):
        cs = [(c, l) for c, l in zip(cues, LINES) if c["slide"] == s]
        a, b = cs[0][0]["at"], cs[-1][0]["end"]
        out += [f"## {s}장 · {titles[s]}  `{mmss(a)} – {mmss(b)}` ({b - a:.0f}초)", "",
                "| 시각 | 화면 효과 | 대사 |", "|---|---|---|"]
        out += [f"| {mmss(c['at'])} | {c['fx']} | {l[3]} |" for c, l in cs]
        out.append("")
    with open(os.path.join(DIR, "script.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(out))


if __name__ == "__main__":
    main()
