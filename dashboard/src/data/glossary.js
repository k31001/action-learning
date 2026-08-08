// 전략·분석 키 코드 용어집 — Storyline 탭의 마우스오버 툴팁 + 딥링크 소스
// RS·D 항목은 strategies.js(단일 소스)에서 자동 파생. MB/SE/SA/SD·DF·CMO 로컬 코드는 수동 정의.
// hash가 있는 키는 해당 탭으로 링크, 없는 키는 툴팁만 표시한다.
import { ROBUST_STRATEGIES, DECISIONS } from './strategies'

const GLOSSARY = {}

// RS-1~9 — Robust 전략 (strategies.js 파생)
for (const rs of ROBUST_STRATEGIES) {
  GLOSSARY[rs.id] = {
    label: `${rs.id} · ${rs.title.replace(' (NEW)', '')} — Robust 전략 (${rs.axis})`,
    hash: '#/strategy/robust',
  }
}

// D1~D17 — 실행 결정 (strategies.js 파생)
for (const d of DECISIONS) {
  GLOSSARY[d.id] = {
    label: `${d.id} · ${d.title.replace(' (NEW)', '')} — 실행 결정 (기한 ${d.deadline})`,
    hash: '#/strategy/decisions',
  }
}

// Main Bet / Side Bet — 핵심전략 (수동)
Object.assign(GLOSSARY, {
  'MB-1': { label: 'MB-1 · HBM 기술 1위 탈환 — Main Bet (실행은 인증·기술 순위전 한정)', hash: '#/strategy/core' },
  'MB-2': { label: 'MB-2 · 동서 균형 공급자 — Main Bet (평택·시안·Taylor 분산 공급망)', hash: '#/strategy/core' },
  'MB-4': { label: 'MB-4 · 커스텀 AI 메모리 솔루션 — Main Bet (고부가 층 창출)', hash: '#/strategy/core' },
  'MB-5': { label: 'MB-5 · 텍사스 테일러 2기 — Main Bet (단계화 투자·미국 생산 옵션)', hash: '#/strategy/core' },
  'SE-1': { label: 'SE-1 · 3D DRAM 전담 조직 + IMEC 공동연구 — Side Bet (시나리오 E 대비)', hash: '#/strategy/core' },
  'SE-2': { label: 'SE-2 · CXL 표준화 기구(SIG) 주도권 — Side Bet (시나리오 E 대비)', hash: '#/strategy/core' },
  'SE-3': { label: 'SE-3 · AI 인프라 수직 진출(Vertical Ascent) — Side Bet (Stargate Korea LOI)', hash: '#/strategy/core' },
  'SA-2': { label: 'SA-2 · 일본 R&D 허브 + 나노임프린트(NIL, EUV 우회) — Side Bet (시나리오 A 대비)', hash: '#/strategy/core' },
  'SD-1': { label: 'SD-1 · HBM 독립 P&L 분리 — Side Bet (시나리오 D 대비, 현행 체계에선 RS-5로 흡수)', hash: '#/strategy/core' },
  'SD-2': { label: 'SD-2 · 산업용 AI 메모리(자동차·의료) — Side Bet (시나리오 D 대비)', hash: '#/strategy/core' },
})

// 핵심 Driving Forces (툴팁만 — 시나리오 축)
Object.assign(GLOSSARY, {
  DF1: { label: 'DF1 · AI 수요의 지속성 — 시나리오 매트릭스 세로축 (핵심 동인 1)' },
  DF2: { label: 'DF2 · 미·중 관계 — 시나리오 매트릭스 가로축 (핵심 동인 2)' },
  DF3: { label: 'DF3 · 기술 패러다임 전환(3D DRAM·CXL 등) — 와일드카드 E의 축 (핵심 동인 3)' },
})

// CMO 렌즈 로컬 코드 — §5 액션(A)·§6 벤치마킹(B)·CMO-4 예측 행(M) (툴팁만)
Object.assign(GLOSSARY, {
  A1: { label: 'A1 · 위기 국면 사업부 통합 (2008~09) — CMO §5 액션, 판정 ◎ 효과 분명' },
  A2: { label: 'A2 · 경쟁사 퇴출 직후 역사이클 증설 5.5조→9조 (2010) — CMO §5 액션, 판정 ◎' },
  A3: { label: 'A3 · 재무 요새 유지 (현금 ~$63B, 전 기간) — CMO §5 액션, 판정 ◎ (전제 조건)' },
  A4: { label: 'A4 · Taylor 다운사이클 착공 (2022) — CMO §5 액션, 판정 ◎ (장비는 옵션형 분리)' },
  A5: { label: 'A5 · "인위적 감산 없다" 선언 → 2023-04-07 감산 공식화 선회 — CMO §5 액션, 판정 ✕ 불발·자진 철회' },
  A6: { label: 'A6 · HBM 니치 후순위 자원배분 (2019 팀 축소~2022/23) — CMO §5 액션, 판정 ✕ 역효과(40%→17%)' },
  B1: { label: 'B1 · SK: 적자 속에서도 HBM 니치 방향 유지 — CMO §6 벤치마킹 → D13·D6 이식' },
  B2: { label: 'B2 · SK: HBM4 아키텍처 고객 공동설계 락인 — CMO §6 벤치마킹 → MB-4·RS-3 이식' },
  B3: { label: 'B3 · 마이크론: 파산 엘피다 다운턴 M&A + PMI(중앙 운영) — CMO §6 벤치마킹 → D9 각본 이식' },
  B4: { label: 'B4 · 마이크론: 수요 선점→팹 건설 역순 + SCA·보조금 레버리지 — CMO §6 벤치마킹 → RS-8·D12 가속' },
  B5: { label: 'B5 · Kioxia·YMTC: 제약 국면의 아키텍처 선행(CBA·Xtacking) — CMO §6 벤치마킹 → SA-2·자체 IP' },
  M1: { label: 'M1 · 계약 바닥 선점 (RS-8·RS-4·D12) — CMO-4 예측 매트릭스 제안 액션' },
  M2: { label: 'M2 · 다운사이클 M&A + PMI 각본 (D9) — CMO-4 예측 매트릭스 제안 액션' },
  M3: { label: 'M3 · R&D 하한 + 차세대 별동대 (D6·D13) — CMO-4 예측, cause-robust ◎ᶠ' },
  M4: { label: 'M4 · 옵션형 캐파 + 재무 요새 (RS-1·RS-5) — CMO-4 예측, cause-robust ◎ᶠ' },
  M5: { label: 'M5 · 게임 분리 (RS-6·RS-2·MB-4) — CMO-4 예측 매트릭스 제안 액션' },
  M6: { label: 'M6 · 맥락 EWI + 조직 대응 매뉴얼 (RS-9·D15·D16) — CMO-4 예측, cause-robust ◎ᶠ (원인 판별기)' },
})

export { GLOSSARY }

// 텍스트를 [일반 문자열 | 용어집 키] 조각으로 분해 — 키 앞뒤가 영숫자·하이픈이면 매치 제외
// (예: "HBM4" 속 "M4", "D-150" 속 "D1" 오탐 방지). lookbehind 미사용(구형 Safari 호환).
const KEY_ALT = new RegExp(
  Object.keys(GLOSSARY)
    .sort((a, b) => b.length - a.length)
    .map(k => k.replace(/-/g, '\\-'))
    .join('|'),
  'g',
)

export function tokenizeKeys(text) {
  if (typeof text !== 'string' || !text) return null
  KEY_ALT.lastIndex = 0
  const out = []
  let last = 0
  let m
  while ((m = KEY_ALT.exec(text))) {
    const start = m.index
    const end = start + m[0].length
    const prev = text[start - 1]
    const next = text[end]
    if ((prev && /[A-Za-z0-9-]/.test(prev)) || (next && /[A-Za-z0-9-]/.test(next))) continue
    if (start > last) out.push({ key: false, v: text.slice(last, start) })
    out.push({ key: true, v: m[0] })
    last = end
  }
  if (out.length === 0) return null
  if (last < text.length) out.push({ key: false, v: text.slice(last) })
  return out
}
