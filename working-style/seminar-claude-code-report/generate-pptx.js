// Claude Code for Reports — Seminar slides
// Design: tutorial-template.pptx (AI Harness Engineering style)
// Layout: 13.33" x 7.5" (LAYOUT_WIDE)

const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";  // 13.33 x 7.5
pres.title = "Claude Code for Reports";
pres.author = "Samsung Electronics Memory Division";

// ─── DESIGN TOKENS (from tutorial-template.pptx) ─────────────────────────────
const C = {
  bg:        "0B1220",   // base background (very dark navy)
  panel:     "111B2E",   // card / panel BG
  panel2:    "1E2A44",   // alternate panel BG
  cyan:      "22D3EE",   // primary accent
  amber:     "FBBF24",   // secondary accent
  white:     "F1F5F9",   // main text
  light:     "CBD5E1",   // secondary text
  mid:       "94A3B8",   // tertiary text / subtitles
  muted:     "64748B",   // footer / page counter
  green:     "22C55E",
  red:       "EF4444",
};

const W = 13.333, H = 7.5;
const FOOTER = "Claude Code for Reports · Technical Seminar";

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function newSlide() {
  const s = pres.addSlide();
  s.background = { color: C.bg };
  // Right edge cyan accent line (template signature)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 13.18, y: 0, w: 0.04, h: H,
    fill: { color: C.cyan }, line: { color: C.cyan },
  });
  return s;
}

function addChrome(s, sectionLabel, pageNum) {
  // Section label (top-left)
  s.addText(sectionLabel, {
    x: 0.6, y: 0.35, w: 9.0, h: 0.35,
    fontSize: 10, bold: true, fontFace: "Calibri",
    color: C.cyan, charSpacing: 4, margin: 0,
  });
  // Page counter (top-right)
  s.addText(`${String(pageNum).padStart(2, "0")} / 16`, {
    x: 11.73, y: 0.35, w: 1.0, h: 0.35,
    fontSize: 10, fontFace: "Consolas",
    color: C.muted, align: "right", margin: 0,
  });
  // Footer (bottom-left)
  s.addText(FOOTER, {
    x: 0.6, y: 7.05, w: 10, h: 0.3,
    fontSize: 9, fontFace: "Calibri",
    color: C.muted, margin: 0,
  });
}

function addTitle(s, title, subtitle) {
  s.addText(title, {
    x: 0.6, y: 0.85, w: 12.0, h: 0.85,
    fontSize: 36, bold: true, fontFace: "Arial Black",
    color: C.white, margin: 0,
  });
  if (subtitle) {
    s.addText(subtitle, {
      x: 0.6, y: 1.70, w: 12.0, h: 0.4,
      fontSize: 14, fontFace: "Calibri",
      color: C.mid, margin: 0,
    });
  }
}

function addCodePanel(s, x, y, w, h, filename, code, opts = {}) {
  // Filename header
  if (filename) {
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h: 0.36,
      fill: { color: C.panel2 }, line: { color: C.panel2 },
    });
    s.addText(filename, {
      x: x + 0.18, y, w: w - 0.36, h: 0.36,
      fontSize: 11, fontFace: "Consolas",
      color: C.cyan, valign: "middle", margin: 0,
    });
  }
  const codeY = filename ? y + 0.36 : y;
  const codeH = filename ? h - 0.36 : h;
  s.addShape(pres.shapes.RECTANGLE, {
    x, y: codeY, w, h: codeH,
    fill: { color: C.panel }, line: { color: "1E2A44", width: 1 },
  });
  s.addText(code, {
    x: x + 0.22, y: codeY + 0.15, w: w - 0.44, h: codeH - 0.3,
    fontSize: opts.size ?? 12, fontFace: "Consolas",
    color: opts.color ?? C.light, valign: "top", margin: 0, wrap: true,
  });
}

function addCard(s, x, y, w, h, opts = {}) {
  s.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: opts.fill ?? C.panel },
    line: { color: opts.border ?? "1E2A44", width: opts.borderWidth ?? 1 },
  });
  if (opts.accent) {
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.08, h,
      fill: { color: opts.accent }, line: { color: opts.accent },
    });
  }
}

// ═════════════════════════════════════════════════════════════════════════════
//   SLIDE 1 — COVER
// ═════════════════════════════════════════════════════════════════════════════
{
  const s = newSlide();
  // Right edge accent already added by newSlide
  s.addText("▍ TECHNICAL  SEMINAR", {
    x: 0.6, y: 0.55, w: 8.0, h: 0.35,
    fontSize: 12, bold: true, fontFace: "Calibri",
    color: C.cyan, charSpacing: 4, margin: 0,
  });
  s.addText("Claude Code", {
    x: 0.6, y: 2.20, w: 12.0, h: 1.4,
    fontSize: 84, bold: true, fontFace: "Arial Black",
    color: C.white, margin: 0,
  });
  s.addText("for Reports.", {
    x: 0.6, y: 3.40, w: 12.0, h: 1.4,
    fontSize: 84, bold: true, fontFace: "Arial Black",
    color: C.cyan, margin: 0,
  });
  s.addText("LLM 에이전트로 전략 보고서를 처음부터 끝까지", {
    x: 0.6, y: 4.85, w: 12.0, h: 0.4,
    fontSize: 18, fontFace: "Calibri",
    color: C.light, margin: 0,
  });
  s.addText("$ claude --project=memory --reports=on", {
    x: 0.6, y: 6.20, w: 12.0, h: 0.35,
    fontSize: 13, fontFace: "Consolas",
    color: C.cyan, margin: 0,
  });
  s.addText("발표자: 권의혁    ·    소속: 메모리사업부    ·    2026.05.05", {
    x: 0.6, y: 6.90, w: 12.0, h: 0.35,
    fontSize: 12, fontFace: "Calibri",
    color: C.muted, margin: 0,
  });
}

// ═════════════════════════════════════════════════════════════════════════════
//   SLIDE 2 — AGENDA
// ═════════════════════════════════════════════════════════════════════════════
{
  const s = newSlide();
  addChrome(s, "▍ CLAUDE CODE  AGENDA", 2);
  addTitle(s, "오늘 다룰 내용", "이 세미나에서 함께 살펴볼 6가지 주제");

  const items = [
    ["01", "Claude Code란 무엇인가",      "정의, 챗봇과의 차이, 왜 보고서에 적합한가"],
    ["02", "왜 기존 방식은 부족한가",     "보고서 작성의 4가지 현실적 한계"],
    ["03", "6가지 핵심 기능",             "메모리·파일·에이전트·웹·시각화·버전 관리"],
    ["04", "통합 사례 — 시나리오 플래닝", "실제 612줄 보고서가 만들어진 과정"],
    ["05", "Best Practices & Pitfalls",   "현장에서 배운 6가지 교훈"],
    ["06", "도구 & 생태계",                "클로드 코드와 함께 쓰면 좋은 것들"],
  ];
  const colW = 6.0, rowH = 1.45, gap = 0.25;
  const baseX = 0.6, baseY = 2.45;
  items.forEach((it, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = baseX + col * (colW + gap), y = baseY + row * (rowH + gap);
    addCard(s, x, y, colW, rowH, { accent: C.cyan });
    s.addText(it[0], {
      x: x + 0.32, y: y + 0.18, w: 1.2, h: 0.95,
      fontSize: 48, bold: true, fontFace: "Arial Black",
      color: C.cyan, margin: 0,
    });
    s.addText(it[1], {
      x: x + 1.7, y: y + 0.22, w: colW - 1.9, h: 0.5,
      fontSize: 18, bold: true, fontFace: "Calibri",
      color: C.white, margin: 0,
    });
    s.addText(it[2], {
      x: x + 1.7, y: y + 0.78, w: colW - 1.9, h: 0.6,
      fontSize: 12, fontFace: "Calibri",
      color: C.mid, margin: 0, wrap: true,
    });
  });
}

// ═════════════════════════════════════════════════════════════════════════════
//   SLIDE 3 — DEFINITION
// ═════════════════════════════════════════════════════════════════════════════
{
  const s = newSlide();
  addChrome(s, "▍ CLAUDE CODE  01 · DEFINITION", 3);
  addTitle(s, "Claude Code란 무엇인가",
              "보고서 한 편을 처음부터 끝까지 만들 수 있는 LLM 에이전트");

  // Left — quote panel
  s.addText("“", {
    x: 0.7, y: 2.25, w: 1.0, h: 1.2,
    fontSize: 96, bold: true, fontFace: "Arial Black",
    color: C.cyan, margin: 0,
  });
  s.addText(
    "Claude Code는 채팅창의 텍스트가 아니라,\n파일 시스템 위에서 동작하는 LLM 에이전트다.\n한 번의 한국어 지시로 자료 수집·분석·작성·시각화·\n버전 관리를 모두 수행한다.",
    {
      x: 1.0, y: 3.30, w: 5.6, h: 2.2,
      fontSize: 18, fontFace: "Calibri",
      color: C.cyan, margin: 0, wrap: true,
    }
  );
  s.addText(
    "터미널에서 실행되며, 프로젝트 디렉토리를 직접 읽고 쓰고 git 커밋한다.",
    {
      x: 1.0, y: 5.60, w: 5.6, h: 0.9,
      fontSize: 13, fontFace: "Calibri",
      color: C.mid, margin: 0, wrap: true,
    }
  );

  // Right — component diagram (concentric layout)
  s.addText("CLAUDE CODE LAYER", {
    x: 7.5, y: 2.15, w: 5.0, h: 0.3,
    fontSize: 10, fontFace: "Consolas",
    color: C.mid, charSpacing: 3, margin: 0,
  });

  // Outer rounded rect
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 7.6, y: 2.55, w: 4.9, h: 4.5,
    fill: { color: C.panel },
    line: { color: C.cyan, width: 1, dashType: "dash" },
    rectRadius: 0.15,
  });

  // Center LLM circle
  s.addShape(pres.shapes.OVAL, {
    x: 9.45, y: 4.30, w: 1.2, h: 1.2,
    fill: { color: C.cyan }, line: { color: C.cyan },
  });
  s.addText("LLM", {
    x: 9.45, y: 4.30, w: 1.2, h: 1.2,
    fontSize: 22, bold: true, fontFace: "Arial Black",
    color: C.bg, align: "center", valign: "middle", margin: 0,
  });

  // 8 component pills around
  const components = [
    { txt: "File I/O",  x: 7.85,  y: 2.85 },
    { txt: "Web",       x: 9.55,  y: 2.85 },
    { txt: "Tools",     x: 11.25, y: 2.85 },
    { txt: "Memory",    x: 11.45, y: 4.55 },
    { txt: "Subagents", x: 11.25, y: 6.25 },
    { txt: "Mermaid",   x: 9.55,  y: 6.55 },
    { txt: "Git",       x: 7.85,  y: 6.25 },
    { txt: "MCP",       x: 7.55,  y: 4.55 },
  ];
  components.forEach(c => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: c.x, y: c.y, w: 1.15, h: 0.4,
      fill: { color: C.panel2 },
      line: { color: C.cyan, width: 1 },
      rectRadius: 0.05,
    });
    s.addText(c.txt, {
      x: c.x, y: c.y, w: 1.15, h: 0.4,
      fontSize: 11, bold: true, fontFace: "Consolas",
      color: C.white, align: "center", valign: "middle", margin: 0,
    });
  });
}

// ═════════════════════════════════════════════════════════════════════════════
//   SLIDE 4 — WHY
// ═════════════════════════════════════════════════════════════════════════════
{
  const s = newSlide();
  addChrome(s, "▍ CLAUDE CODE  02 · WHY", 4);
  addTitle(s, "왜 기존 방식은 부족한가", "보고서 작성이 마주하는 4가지 현실");

  const probs = [
    { icon: "⏱",  title: "시간이 많이 든다",       body: "자료 수집·정리·작성·시각화 합쳐 6~10일.\n정작 전략 사고에 쓸 시간이 없다.",        eg: "예: 32페이지 보고서 = 평균 60시간 소요" },
    { icon: "🔁", title: "반복 작업이 너무 많다",   body: "출처 정리, 형식 통일, 표·다이어그램\n다시 그리기 — 사람이 매번 똑같이 한다.",     eg: "예: $5,516억 → $551.6B 일일이 변환" },
    { icon: "💾", title: "일관성을 잡기 어렵다",   body: "단위·표기·인용 규칙이 문서마다\n흔들린다. 마지막에 통일하느라 또 시간이 든다.",  eg: "예: 같은 수치가 보고서마다 다른 단위" },
    { icon: "🧩", title: "도구가 흩어져 있다",     body: "자료는 브라우저, 작성은 워드,\n시각화는 다른 도구. 컨텍스트가 끊긴다.",         eg: "예: 7개 도구를 옮겨다니며 한 보고서" },
  ];
  const colW = 6.0, rowH = 2.25, gap = 0.25;
  const baseX = 0.6, baseY = 2.40;
  probs.forEach((p, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = baseX + col * (colW + gap), y = baseY + row * (rowH + gap);
    addCard(s, x, y, colW, rowH, { accent: C.amber });
    // Icon
    s.addText(p.icon, {
      x: x + 0.3, y: y + 0.25, w: 1.0, h: 1.0,
      fontSize: 36, fontFace: "Arial Black",
      color: C.amber, align: "center", valign: "middle", margin: 0,
    });
    s.addText(p.title, {
      x: x + 1.45, y: y + 0.22, w: colW - 1.65, h: 0.45,
      fontSize: 18, bold: true, fontFace: "Calibri",
      color: C.white, margin: 0,
    });
    s.addText(p.body, {
      x: x + 1.45, y: y + 0.72, w: colW - 1.65, h: 1.0,
      fontSize: 12, fontFace: "Calibri",
      color: C.light, margin: 0, wrap: true,
    });
    s.addText(p.eg, {
      x: x + 1.45, y: y + 1.78, w: colW - 1.65, h: 0.35,
      fontSize: 10, fontFace: "Consolas",
      color: C.muted, margin: 0,
    });
  });
}

// ═════════════════════════════════════════════════════════════════════════════
//   SLIDE 5 — CORE CAPABILITIES
// ═════════════════════════════════════════════════════════════════════════════
{
  const s = newSlide();
  addChrome(s, "▍ CLAUDE CODE  03 · CORE CAPABILITIES", 5);
  addTitle(s, "6가지 핵심 기능", "하나씩 코드와 예시로 살펴봅니다");

  const caps = [
    ["01", "Project Memory",         "CLAUDE.md로 규칙·형식·언어를 영속화"],
    ["02", "File-based Workflow",    "data/ → analysis/ → report/ 자동 흐름"],
    ["03", "Sub-agents",             "4개 영역 병렬 리서치"],
    ["04", "Web Search",             "출처가 박힌 Markdown 자동 생성"],
    ["05", "Mermaid Visualization",  "텍스트 코드 → 차트·다이어그램"],
    ["06", "Git Auto-versioning",    "모든 변경이 commit 이력으로"],
  ];
  const colW = 4.0, rowH = 2.15, gap = 0.2;
  const baseX = 0.6, baseY = 2.45;
  caps.forEach((c, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = baseX + col * (colW + gap), y = baseY + row * (rowH + gap);
    addCard(s, x, y, colW, rowH, { accent: C.cyan });
    s.addText(c[0], {
      x: x + 0.3, y: y + 0.2, w: 1.5, h: 0.7,
      fontSize: 36, bold: true, fontFace: "Arial Black",
      color: C.cyan, margin: 0,
    });
    s.addText(c[1], {
      x: x + 0.3, y: y + 0.95, w: colW - 0.5, h: 0.5,
      fontSize: 18, bold: true, fontFace: "Calibri",
      color: C.white, margin: 0,
    });
    s.addText(c[2], {
      x: x + 0.3, y: y + 1.5, w: colW - 0.5, h: 0.55,
      fontSize: 12, fontFace: "Calibri",
      color: C.mid, margin: 0, wrap: true,
    });
  });
}

// ═════════════════════════════════════════════════════════════════════════════
//   COMPONENT DETAIL SLIDES (6-11) — common helper
// ═════════════════════════════════════════════════════════════════════════════
function componentSlide({ page, label, num, title, subtitle, leftBlocks, codeFile, code }) {
  const s = newSlide();
  addChrome(s, label, page);

  // Big number (top-left zone)
  s.addText(num, {
    x: 0.6, y: 0.85, w: 1.6, h: 1.4,
    fontSize: 72, bold: true, fontFace: "Arial Black",
    color: C.cyan, margin: 0,
  });
  // Title beside number
  s.addText(title, {
    x: 2.2, y: 1.0, w: 9.5, h: 0.7,
    fontSize: 36, bold: true, fontFace: "Arial Black",
    color: C.white, margin: 0,
  });
  s.addText(subtitle, {
    x: 2.2, y: 1.75, w: 9.5, h: 0.4,
    fontSize: 14, fontFace: "Calibri",
    color: C.mid, margin: 0,
  });

  // Left content blocks
  const leftX = 0.6, leftY = 2.7, leftW = 5.6;
  leftBlocks.forEach((b, i) => {
    const y = leftY + i * 1.1;
    s.addText("✱", {
      x: leftX, y: y, w: 0.4, h: 0.4,
      fontSize: 16, bold: true, fontFace: "Calibri",
      color: C.cyan, margin: 0,
    });
    s.addText(b.heading, {
      x: leftX + 0.4, y: y, w: leftW - 0.4, h: 0.4,
      fontSize: 16, bold: true, fontFace: "Calibri",
      color: C.white, margin: 0,
    });
    s.addText(b.body, {
      x: leftX + 0.4, y: y + 0.42, w: leftW - 0.4, h: 0.6,
      fontSize: 12, fontFace: "Calibri",
      color: C.light, margin: 0, wrap: true,
    });
  });

  // Right code panel
  addCodePanel(s, 6.55, 2.55, 6.15, 4.3, codeFile, code, { size: 11.5 });
}

// SLIDE 6 — Project Memory
componentSlide({
  page: 6,
  label: "▍ CLAUDE CODE  03 · COMPONENT 01",
  num: "01",
  title: "Project Memory",
  subtitle: "규칙을 코드로 적어두면 모든 세션이 같은 톤으로 동작한다",
  leftBlocks: [
    { heading: "CLAUDE.md = 프로젝트의 헌법",
      body: "매번 말하지 않아도 자동 적용되는 약속" },
    { heading: "언어·형식·인용 규칙 영속화",
      body: "\"한국어, 수치는 B 단위, 출처 명시\"" },
    { heading: "워크플로우 규칙도 함께",
      body: "\"데이터 추가 시 metadata.md, 변경 시 git commit\"" },
  ],
  codeFile: "CLAUDE.md",
  code: `# 프로젝트 가이드라인

## 필수 규칙
- 모든 문서는 Markdown 형식
- 수치는 억 → B 형식 ($5,516억 → $551.6B)
- 데이터 추가 시 metadata.md 업데이트
- 모든 변경사항은 git commit
- 한국어 작성 (기술 용어는 영어 병기 허용)

## 시각자료
- 2×2 매트릭스는 Mermaid quadrantChart
- 의존 관계는 Mermaid flowchart TD`,
});

// SLIDE 7 — File-based Workflow
{
  const s = newSlide();
  addChrome(s, "▍ CLAUDE CODE  03 · COMPONENT 02", 7);
  s.addText("02", {
    x: 0.6, y: 0.85, w: 1.6, h: 1.4,
    fontSize: 72, bold: true, fontFace: "Arial Black",
    color: C.cyan, margin: 0,
  });
  s.addText("File-based Workflow", {
    x: 2.2, y: 1.0, w: 9.5, h: 0.7,
    fontSize: 36, bold: true, fontFace: "Arial Black",
    color: C.white, margin: 0,
  });
  s.addText("채팅창이 아니라 파일 시스템 위에서 동작한다", {
    x: 2.2, y: 1.75, w: 9.5, h: 0.4,
    fontSize: 14, fontFace: "Calibri",
    color: C.mid, margin: 0,
  });

  // Left — directory flow (3 boxes + arrows)
  const flowY = 3.10;
  const boxes = [
    { label: "data/",     desc: "원시 데이터" },
    { label: "analysis/", desc: "가공·요약" },
    { label: "report/",   desc: "최종 산출물" },
  ];
  const boxW = 1.55, boxH = 1.0;
  const gap = 0.40;
  const totalW = boxes.length * boxW + (boxes.length - 1) * gap;
  const startX = 0.6 + (5.85 - totalW) / 2;
  boxes.forEach((b, i) => {
    const x = startX + i * (boxW + gap);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: flowY, w: boxW, h: boxH,
      fill: { color: C.panel2 },
      line: { color: C.cyan, width: 1.5 },
      rectRadius: 0.08,
    });
    s.addText(b.label, {
      x, y: flowY + 0.1, w: boxW, h: 0.4,
      fontSize: 13, bold: true, fontFace: "Consolas",
      color: C.cyan, align: "center", valign: "middle", margin: 0,
    });
    s.addText(b.desc, {
      x, y: flowY + 0.55, w: boxW, h: 0.4,
      fontSize: 11, fontFace: "Calibri",
      color: C.mid, align: "center", valign: "middle", margin: 0,
    });
    if (i < boxes.length - 1) {
      const arrowX = x + boxW + 0.05;
      s.addText("→", {
        x: arrowX, y: flowY, w: gap - 0.1, h: boxH,
        fontSize: 24, bold: true, fontFace: "Arial Black",
        color: C.cyan, align: "center", valign: "middle", margin: 0,
      });
    }
  });
  s.addText("사용자는 한 번 지시 → AI는 디렉토리를 자동 순회", {
    x: 0.6, y: 4.30, w: 5.85, h: 0.45,
    fontSize: 13, italic: true, fontFace: "Calibri",
    color: C.amber, align: "center", margin: 0,
  });

  // Bullet list under flow
  const bullets = [
    "@data/, @analysis/ 등 디렉토리 참조 문법",
    "파일·메타데이터·git 동시 업데이트",
    "재실행·재사용에 강한 구조",
  ];
  bullets.forEach((b, i) => {
    s.addText("✱  " + b, {
      x: 0.6, y: 4.95 + i * 0.42, w: 5.85, h: 0.4,
      fontSize: 13, fontFace: "Calibri",
      color: C.light, margin: 0,
    });
  });

  // Right — terminal
  addCodePanel(s, 6.55, 2.55, 6.15, 4.3, "terminal", `$ claude

> @data/ 디렉토리의 모든 데이터를 기반으로
  STEEP 분석 표를 만들어
  analysis/steep-table.md에 저장하고
  data/metadata.md에 항목을 추가해줘.

✓ data/ 16개 파일 읽음
✓ analysis/steep-table.md (50개 요인) 생성
✓ data/metadata.md 업데이트
✓ git: "Add STEEP analysis table"`, { color: C.green, size: 12 });
}

// SLIDE 8 — Sub-agents
{
  const s = newSlide();
  addChrome(s, "▍ CLAUDE CODE  03 · COMPONENT 03", 8);
  s.addText("03", {
    x: 0.6, y: 0.85, w: 1.6, h: 1.4,
    fontSize: 72, bold: true, fontFace: "Arial Black",
    color: C.cyan, margin: 0,
  });
  s.addText("Sub-agents", {
    x: 2.2, y: 1.0, w: 9.5, h: 0.7,
    fontSize: 36, bold: true, fontFace: "Arial Black",
    color: C.white, margin: 0,
  });
  s.addText("4개 영역을 동시에 — 1/4 시간으로 끝낸다", {
    x: 2.2, y: 1.75, w: 9.5, h: 0.4,
    fontSize: 14, fontFace: "Calibri",
    color: C.mid, margin: 0,
  });

  // 4-step diagram (left side)
  const steps = [
    { num: "1", title: "DISPATCH", body: "메인 에이전트가\n4개 영역 분배" },
    { num: "2", title: "PARALLEL", body: "Market·Competitor·\nTech·Policy 동시 실행" },
    { num: "3", title: "MERGE",    body: "결과를 하나의\n컨텍스트로 통합" },
    { num: "4", title: "REPORT",   body: "보고서에\n자동 인용" },
  ];
  const sX = 0.6, sY = 2.65, sW = 1.40, sH = 1.85, sGap = 0.06;
  steps.forEach((st, i) => {
    const x = sX + i * (sW + sGap);
    addCard(s, x, sY, sW, sH);
    s.addText(st.num, {
      x, y: sY + 0.12, w: sW, h: 0.45,
      fontSize: 24, bold: true, fontFace: "Arial Black",
      color: C.cyan, align: "center", margin: 0,
    });
    s.addText(st.title, {
      x, y: sY + 0.62, w: sW, h: 0.35,
      fontSize: 11, bold: true, fontFace: "Consolas",
      color: C.white, align: "center", valign: "middle", margin: 0, charSpacing: 1,
    });
    s.addText(st.body, {
      x: x + 0.1, y: sY + 1.05, w: sW - 0.2, h: 0.7,
      fontSize: 10, fontFace: "Calibri",
      color: C.mid, align: "center", valign: "top", margin: 0, wrap: true,
    });
  });

  // Time comparison bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 4.75, w: 5.85, h: 0.55,
    fill: { color: C.panel }, line: { color: "1E2A44", width: 1 },
  });
  s.addText("순차 처리: 4시간   →   병렬 처리: 1시간", {
    x: 0.6, y: 4.75, w: 5.85, h: 0.55,
    fontSize: 16, bold: true, fontFace: "Consolas",
    color: C.amber, align: "center", valign: "middle", margin: 0,
  });

  s.addText("✱  4개의 독립 컨텍스트가 동시에 돌아 메인 컨텍스트를 깨끗하게 유지합니다", {
    x: 0.6, y: 5.55, w: 5.85, h: 0.7,
    fontSize: 12, fontFace: "Calibri",
    color: C.light, margin: 0, wrap: true,
  });

  // Right — code
  addCodePanel(s, 6.55, 2.55, 6.15, 4.3, "sub-agents.py",
`# 한 번의 지시 → 4개 에이전트 자동 분기
agents = [
  Agent("market",     "TrendForce·Yole·BofA"),
  Agent("competitor", "삼성/SK하이닉스/마이크론"),
  Agent("technology", "HBM4·CMX·SCADA"),
  Agent("policy",     "CHIPS Act·VEU·MATCH"),
]
results = parallel(agents)   # 4 in flight
report  = merge(results)
print(report.cite_count)     # 16개 출처 자동 인용`,
    { size: 11.5 });
}

// SLIDE 9 — Web Search
componentSlide({
  page: 9,
  label: "▍ CLAUDE CODE  03 · COMPONENT 04",
  num: "04",
  title: "Web Search",
  subtitle: "출처가 박힌 Markdown으로 정리된다",
  leftBlocks: [
    { heading: "공신력 있는 출처만",
      body: "TrendForce·Yole·BofA·Counterpoint 우선" },
    { heading: "출처 자동 인용",
      body: "표·수치마다 출처와 날짜 footnote" },
    { heading: "단위·형식 통일",
      body: "$5,516억 입력 → $551.6B 자동 변환" },
    { heading: "메타데이터 자동 등록",
      body: "metadata.md에 신뢰도·태그·요약 항목 추가" },
  ],
  codeFile: "data/market/hbm-market.md",
  code: `# HBM 시장 현황 및 전망

## 시장 규모
| 연도 | 규모   | YoY  |
|------|--------|------|
| 2024 | $18.6B | +82% |
| 2025 | $34.0B | +83% |
| 2026 | $54.6B | +61% |
(출처: TrendForce, BofA, 2026)

## 업체별 점유율 (2025)
- 삼성:    42%
- SK하이닉스: 38%
- 마이크론:    20%`,
});

// SLIDE 10 — Mermaid
{
  const s = newSlide();
  addChrome(s, "▍ CLAUDE CODE  03 · COMPONENT 05", 10);
  s.addText("05", {
    x: 0.6, y: 0.85, w: 1.6, h: 1.4,
    fontSize: 72, bold: true, fontFace: "Arial Black",
    color: C.cyan, margin: 0,
  });
  s.addText("Mermaid Visualization", {
    x: 2.2, y: 1.0, w: 9.5, h: 0.7,
    fontSize: 36, bold: true, fontFace: "Arial Black",
    color: C.white, margin: 0,
  });
  s.addText("텍스트 코드 한 줄 → GitHub에서 자동 렌더링", {
    x: 2.2, y: 1.75, w: 9.5, h: 0.4,
    fontSize: 14, fontFace: "Calibri",
    color: C.mid, margin: 0,
  });

  // Left — mermaid code
  addCodePanel(s, 0.6, 2.55, 5.85, 4.0, "scenario-matrix.mmd",
`quadrantChart
  title 시나리오 매트릭스
  x-axis AI 거품 붕괴 --> 수요 지속
  y-axis 관리된 공존 --> 디커플링
  quadrant-1 A 황금 요새
  quadrant-2 C 기술 냉전
  quadrant-3 D 조용한 재편
  quadrant-4 B AI 르네상스 ⭐`,
    { size: 12, color: C.cyan });

  s.addText("→", {
    x: 6.45, y: 4.2, w: 0.4, h: 0.7,
    fontSize: 32, bold: true, fontFace: "Arial Black",
    color: C.amber, align: "center", valign: "middle", margin: 0,
  });

  // Right — rendered preview (white box w/ quadrants)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.95, y: 2.55, w: 5.75, h: 4.0,
    fill: { color: "FFFFFF" }, line: { color: C.cyan, width: 1 },
  });
  s.addText("scenario-matrix · GitHub rendering", {
    x: 6.95, y: 2.55, w: 5.75, h: 0.32,
    fontSize: 9, fontFace: "Consolas",
    color: "888888", align: "center", valign: "middle", margin: 0,
  });
  // axes
  const axesX = 6.95, axesY = 3.0, axesW = 5.75, axesH = 3.4;
  s.addShape(pres.shapes.LINE, {
    x: axesX + axesW / 2, y: axesY + 0.15, w: 0, h: axesH - 0.3,
    line: { color: "999999", width: 1 },
  });
  s.addShape(pres.shapes.LINE, {
    x: axesX + 0.4, y: axesY + axesH / 2, w: axesW - 0.8, h: 0,
    line: { color: "999999", width: 1 },
  });
  // quadrant labels
  s.addText("C 기술 냉전", { x: axesX + 0.4, y: axesY + 0.4, w: axesW / 2 - 0.4, h: 0.3, fontSize: 11, bold: true, fontFace: "Calibri", color: "B91C1C", align: "center", margin: 0 });
  s.addText("A 황금 요새", { x: axesX + axesW / 2, y: axesY + 0.4, w: axesW / 2 - 0.4, h: 0.3, fontSize: 11, bold: true, fontFace: "Calibri", color: "1D4ED8", align: "center", margin: 0 });
  s.addText("D 조용한 재편", { x: axesX + 0.4, y: axesY + axesH - 0.6, w: axesW / 2 - 0.4, h: 0.3, fontSize: 11, bold: true, fontFace: "Calibri", color: "166534", align: "center", margin: 0 });
  s.addText("B AI 르네상스  ⭐", { x: axesX + axesW / 2, y: axesY + axesH - 0.6, w: axesW / 2 - 0.4, h: 0.3, fontSize: 12, bold: true, fontFace: "Calibri", color: "C2410C", align: "center", margin: 0 });
  // axis captions
  s.addText("← AI 거품 붕괴       AI 수요 지속 →", {
    x: axesX, y: axesY + axesH, w: axesW, h: 0.25,
    fontSize: 8, fontFace: "Calibri", color: "777777", align: "center", margin: 0,
  });

  s.addText("지원 차트 — flowchart · quadrantChart · graph · gitGraph · sequenceDiagram · pie · mindmap", {
    x: 0.6, y: 6.7, w: 12.0, h: 0.3,
    fontSize: 10, fontFace: "Consolas",
    color: C.mid, margin: 0,
  });
}

// SLIDE 11 — Git Auto-versioning
componentSlide({
  page: 11,
  label: "▍ CLAUDE CODE  03 · COMPONENT 06",
  num: "06",
  title: "Git Auto-versioning",
  subtitle: "모든 변경이 자동 커밋 — 언제든 되돌릴 수 있다",
  leftBlocks: [
    { heading: "자동 commit",
      body: "파일 변경 발생 시 자연어로 메시지 생성" },
    { heading: "PROMPT.md 누적 기록",
      body: "모든 사용자 지시가 날짜별로 로깅" },
    { heading: "PR·Push까지 통합",
      body: "gh pr create로 GitHub PR 생성 가능" },
    { heading: "언제든 git revert",
      body: "잘못 만든 섹션은 한 번에 복구" },
  ],
  codeFile: "terminal",
  code: `$ git log --oneline

1e44831 Add seminar content
c74e59c quadrantChart로 매트릭스 교체
5844ab8 대규모 멀티파일 수정 (Mermaid·B표기)
405e187 경쟁사 투자 전략 추가
b41c46b NVIDIA CMX·SCADA 반영
de3737f CMX/SCADA 기술 데이터 추가
5dce379 PROMPT.md 누락 로깅
...
27 commits in 5 days`,
});

// ═════════════════════════════════════════════════════════════════════════════
//   SLIDE 12 — END-TO-END EXAMPLE
// ═════════════════════════════════════════════════════════════════════════════
{
  const s = newSlide();
  addChrome(s, "▍ CLAUDE CODE  04 · END-TO-END EXAMPLE", 12);
  addTitle(s, "통합 사례 — 시나리오 플래닝 보고서",
              "6가지 컴포넌트가 한 프로젝트 안에서 모두 보이는 모습");

  addCodePanel(s, 0.6, 2.50, 12.05, 4.05, "workflow.md",
`# 1. CLAUDE.md 생성             (① Project Memory)
$ claude
> 시나리오 플래닝 보고서 프로젝트 시작.
  CLAUDE.md와 디렉토리 구조 만들어줘.

# 2. 데이터 수집                   (② File Workflow + ④ Web Search)
> @data/ 16개 영역에 시장·경쟁사·기술·정책 데이터 수집.

# 3. 병렬 분석                     (③ Sub-agents)
> 4개 영역 동시 분석 → analysis/

# 4. 보고서 작성 + Mermaid          (⑤ Visualization)
> Shell 시나리오 플래닝으로 612줄 보고서 작성.
  매트릭스는 Mermaid quadrantChart로.

# 5. 자동 커밋                     (⑥ Git)
✓ 27 commits · github.com/k31001/action-learning`,
    { size: 12.5 });

  s.addText("✱ 6가지 컴포넌트가 단 한 프로젝트 안에서 자연스럽게 흐릅니다.", {
    x: 0.6, y: 6.65, w: 12.05, h: 0.35,
    fontSize: 12, italic: true, fontFace: "Calibri",
    color: C.cyan, margin: 0,
  });
}

// ═════════════════════════════════════════════════════════════════════════════
//   SLIDE 13 — LIVE DEMO PLACEHOLDER
// ═════════════════════════════════════════════════════════════════════════════
{
  const s = newSlide();
  addChrome(s, "▍ CLAUDE CODE  04 · LIVE DEMO", 13);
  addTitle(s, "데모 화면", "이 자리에 실제 산출물 스크린샷을 넣습니다");

  // Big dashed slot
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.2, y: 2.5, w: 10.8, h: 4.0,
    fill: { color: C.panel },
    line: { color: C.cyan, width: 1.5, dashType: "dash" },
  });
  s.addText("▢", {
    x: 1.2, y: 3.0, w: 10.8, h: 1.0,
    fontSize: 64, fontFace: "Arial Black",
    color: C.cyan, align: "center", valign: "middle", margin: 0,
  });
  s.addText("[ 보고서 / 슬라이드 / Mermaid 렌더링 캡처 삽입 ]", {
    x: 1.2, y: 4.3, w: 10.8, h: 0.45,
    fontSize: 18, fontFace: "Calibri",
    color: C.white, align: "center", valign: "middle", margin: 0,
  });
  s.addText("권장: 1920×1080 PNG · 또는 짧은 GIF (< 5초)", {
    x: 1.2, y: 4.85, w: 10.8, h: 0.35,
    fontSize: 12, fontFace: "Calibri",
    color: C.mid, align: "center", valign: "middle", margin: 0,
  });
  s.addText("report/scenario-planning-report.md  ·  presentation/slide-outline.md  ·  GitHub Mermaid 렌더링 — 가장 임팩트 있는 한 장면", {
    x: 1.2, y: 5.55, w: 10.8, h: 0.4,
    fontSize: 11, fontFace: "Calibri",
    color: C.muted, align: "center", margin: 0, wrap: true,
  });
}

// ═════════════════════════════════════════════════════════════════════════════
//   SLIDE 14 — BEST PRACTICES
// ═════════════════════════════════════════════════════════════════════════════
{
  const s = newSlide();
  addChrome(s, "▍ CLAUDE CODE  05 · LESSONS", 14);
  addTitle(s, "Best Practices", "보고서 30편을 만들면서 배운 것");

  const lessons = [
    ["01", "CLAUDE.md를 가장 먼저",      "형식·인용·단위 규칙을 시작 시 박아두면 후반 통일 작업이 사라진다."],
    ["02", "한 번에 하나의 지시",        "다섯 가지를 한꺼번에 시키면 흐려진다. 좁고 명확하게."],
    ["03", "출처는 반드시 검증",         "AI가 정리한 수치라도 1차 출처를 사람이 확인. 구조는 믿어도 숫자는 확인."],
    ["04", "데이터·분석·보고서 분리",    "디렉토리를 분리해야 재사용·재실행이 가능하다."],
    ["05", "PROMPT.md를 살려라",         "다음 세션이 과거 의도를 이해할 수 있게 모든 지시를 누적 기록."],
    ["06", "사람을 루프에 두기",         "전략 판단·민감 정보·승인은 반드시 사람이. AI는 초안과 형식."],
  ];
  const colW = 4.0, rowH = 2.0, gap = 0.2;
  const baseX = 0.6, baseY = 2.45;
  lessons.forEach((l, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = baseX + col * (colW + gap), y = baseY + row * (rowH + gap);
    addCard(s, x, y, colW, rowH, { accent: C.amber });
    s.addText(l[0], {
      x: x + 0.3, y: y + 0.18, w: 1.5, h: 0.55,
      fontSize: 28, bold: true, fontFace: "Arial Black",
      color: C.amber, margin: 0,
    });
    s.addText(l[1], {
      x: x + 0.3, y: y + 0.78, w: colW - 0.5, h: 0.45,
      fontSize: 16, bold: true, fontFace: "Calibri",
      color: C.white, margin: 0,
    });
    s.addText(l[2], {
      x: x + 0.3, y: y + 1.28, w: colW - 0.5, h: 0.65,
      fontSize: 11, fontFace: "Calibri",
      color: C.light, margin: 0, wrap: true,
    });
  });
}

// ═════════════════════════════════════════════════════════════════════════════
//   SLIDE 15 — ECOSYSTEM
// ═════════════════════════════════════════════════════════════════════════════
{
  const s = newSlide();
  addChrome(s, "▍ CLAUDE CODE  06 · ECOSYSTEM", 15);
  addTitle(s, "함께 쓰면 좋은 도구", "보고서·문서 워크플로우를 더 강하게 만드는 것들");

  const cats = [
    { hdr: "EDITOR & TERMINAL", items: ["VS Code", "iTerm2", "Cursor", "Warp"] },
    { hdr: "VISUALIZATION",     items: ["Mermaid", "D3.js", "matplotlib", "Excalidraw"] },
    { hdr: "PUBLISHING",        items: ["GitHub", "Notion", "Obsidian", "Pandoc"] },
    { hdr: "MCP CONNECTORS",    items: ["Notion MCP", "Google Drive", "Gmail", "Slack"] },
  ];
  const colW = 3.0, gap = 0.13;
  const baseX = 0.6, baseY = 2.5, colH = 4.0;
  cats.forEach((c, i) => {
    const x = baseX + i * (colW + gap);
    addCard(s, x, baseY, colW, colH, { accent: C.cyan });
    s.addText(c.hdr, {
      x: x + 0.3, y: baseY + 0.25, w: colW - 0.5, h: 0.4,
      fontSize: 11, bold: true, fontFace: "Consolas",
      color: C.cyan, charSpacing: 2, margin: 0,
    });
    // separator
    s.addShape(pres.shapes.LINE, {
      x: x + 0.3, y: baseY + 0.75, w: colW - 0.6, h: 0,
      line: { color: "1E2A44", width: 1 },
    });
    c.items.forEach((it, j) => {
      const itemY = baseY + 1.0 + j * 0.65;
      s.addText("▸", {
        x: x + 0.3, y: itemY, w: 0.3, h: 0.4,
        fontSize: 16, bold: true, fontFace: "Calibri",
        color: C.cyan, margin: 0,
      });
      s.addText(it, {
        x: x + 0.65, y: itemY, w: colW - 0.85, h: 0.4,
        fontSize: 14, fontFace: "Consolas",
        color: C.white, valign: "middle", margin: 0,
      });
    });
  });
}

// ═════════════════════════════════════════════════════════════════════════════
//   SLIDE 16 — Q&A / CLOSING
// ═════════════════════════════════════════════════════════════════════════════
{
  const s = newSlide();
  s.addText("▍ THANK YOU", {
    x: 0.6, y: 0.55, w: 8.0, h: 0.35,
    fontSize: 12, bold: true, fontFace: "Calibri",
    color: C.cyan, charSpacing: 4, margin: 0,
  });
  s.addText("Questions", {
    x: 0.6, y: 2.20, w: 12.0, h: 1.4,
    fontSize: 84, bold: true, fontFace: "Arial Black",
    color: C.white, margin: 0,
  });
  s.addText("&  Discussion.", {
    x: 0.6, y: 3.40, w: 12.0, h: 1.4,
    fontSize: 84, bold: true, fontFace: "Arial Black",
    color: C.cyan, margin: 0,
  });
  s.addText("Claude Code = 보고서를 만들어내는 LLM 에이전트.", {
    x: 0.6, y: 4.85, w: 12.0, h: 0.4,
    fontSize: 18, fontFace: "Calibri",
    color: C.light, margin: 0,
  });
  s.addText("시작은 CLAUDE.md 한 줄, 그 다음은 자동입니다.", {
    x: 0.6, y: 5.30, w: 12.0, h: 0.4,
    fontSize: 16, italic: true, fontFace: "Calibri",
    color: C.mid, margin: 0,
  });
  s.addText("발표자료 / 코드: github.com/k31001/action-learning", {
    x: 0.6, y: 6.40, w: 12.0, h: 0.35,
    fontSize: 13, fontFace: "Consolas",
    color: C.cyan, margin: 0,
  });
  s.addText("연락: euihyeok.kwon@gmail.com", {
    x: 0.6, y: 6.78, w: 12.0, h: 0.35,
    fontSize: 12, fontFace: "Calibri",
    color: C.muted, margin: 0,
  });
}

// ═════════════════════════════════════════════════════════════════════════════
//   WRITE
// ═════════════════════════════════════════════════════════════════════════════
const outPath = "working-style/seminar-claude-code-report/seminar-claude-code.pptx";
pres.writeFile({ fileName: outPath })
  .then(() => console.log("✓ Created:", outPath))
  .catch(err => console.error("Error:", err));
