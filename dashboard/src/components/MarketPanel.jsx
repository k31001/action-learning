import { useState } from 'react'
import { RefreshCw, TrendingUp, TrendingDown, Minus, Wifi, WifiOff } from 'lucide-react'
import {
  useCurrentQuotes, useStockHistory, useCapex, useHbmShare, useApiHealth,
} from '../hooks/useMarketData'
import {
  StockHistoryChart, CapExChart, HbmShareChart, StockCompareChart,
} from './HistoricalChart'

const SYMBOLS = ['NVDA', 'MU', '000660.KS', '005930.KS', 'SMH']
const SYMBOL_META = {
  NVDA: { nameKo: 'NVIDIA', color: '#76b900', group: 'demand', badge: 'AI 수요 프록시', badgeClass: 'bg-emerald-100 text-emerald-700' },
  MU: { nameKo: '마이크론', color: '#e85d26', group: 'memory', badge: '메모리 경쟁', badgeClass: 'bg-orange-100 text-orange-700' },
  '000660.KS': { nameKo: 'SK하이닉스', color: '#e8192c', group: 'memory', badge: 'HBM 경쟁사 1위', badgeClass: 'bg-red-100 text-red-700' },
  '005930.KS': { nameKo: '삼성전자', color: '#1428a0', group: 'memory', badge: '삼성전자', badgeClass: 'bg-sky-100 text-sky-700' },
  SMH: { nameKo: '반도체 ETF (SMH)', color: '#8b5cf6', group: 'sector', badge: '섹터 전반', badgeClass: 'bg-purple-100 text-purple-700' },
}

function QuoteCard({ quote, onClick, selected }) {
  if (!quote) return null
  const m = SYMBOL_META[quote.symbol] ?? {}
  const up = quote.changePct >= 0
  return (
    <button
      onClick={onClick}
      className={`text-left p-3 rounded-xl border transition-all ${
        selected
          ? 'border-zinc-400 bg-zinc-100'
          : 'border-zinc-200 bg-white/80 hover:border-zinc-300 hover:bg-white'
      }`}
    >
      <div className="flex items-start justify-between gap-1 mb-1">
        <div>
          <div className="text-xs font-mono text-zinc-500">{quote.symbol}</div>
          <div className="text-sm font-semibold text-zinc-900">{m.nameKo}</div>
        </div>
        <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${m.badgeClass}`}>
          {m.badge}
        </span>
      </div>
      {quote.error ? (
        <div className="text-xs text-red-600">조회 실패</div>
      ) : (
        <>
          <div className="text-lg font-bold font-mono text-zinc-900">
            {quote.price?.toLocaleString('en-US', { maximumFractionDigits: 2 })}
            <span className="text-xs text-zinc-500 ml-1">{quote.currency}</span>
          </div>
          <div className={`flex items-center gap-1 text-xs font-medium mt-0.5 ${up ? 'text-emerald-600' : 'text-red-600'}`}>
            {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {up ? '+' : ''}{quote.changePct?.toFixed(2)}%
            <span className="text-zinc-400 font-normal ml-1">
              ({up ? '+' : ''}{quote.change?.toFixed(2)})
            </span>
          </div>
        </>
      )}
    </button>
  )
}

function StockDetailPanel({ symbol }) {
  const { data, loading, error } = useStockHistory(symbol)
  const m = SYMBOL_META[symbol] ?? {}

  if (loading) return <div className="h-44 flex items-center justify-center text-xs text-zinc-500">로딩 중…</div>
  if (error) return <div className="h-44 flex items-center justify-center text-xs text-red-600">오류: {error}</div>
  if (!data) return null

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-medium text-zinc-900">{m.nameKo}</span>
        <span className="text-xs text-zinc-500">{symbol} — 주간 종가 (최대 5년)</span>
      </div>
      <StockHistoryChart data={data} color={m.color} unit={data.currency ?? ''} />
    </div>
  )
}

function AllStocksPanel() {
  const stocksData = {}
  const hooks = SYMBOLS.map(s => {
    const result = useStockHistory(s)
    return [s, result]
  })

  hooks.forEach(([sym, result]) => {
    if (result.data) stocksData[sym] = result.data
  })

  const anyLoading = hooks.some(([, r]) => r.loading)

  if (anyLoading && Object.keys(stocksData).length === 0) {
    return <div className="h-44 flex items-center justify-center text-xs text-zinc-500">주가 데이터 로딩 중…</div>
  }

  return (
    <div>
      <p className="text-xs text-zinc-500 mb-3">기간 시작 = 100 기준 상대 수익률 비교</p>
      <StockCompareChart stocksData={stocksData} />
    </div>
  )
}

const TABS = [
  { id: 'compare', label: '비교 차트' },
  { id: 'stock', label: '종목별' },
  { id: 'capex', label: 'BigTech CapEx' },
  { id: 'hbm', label: 'HBM/DRAM 점유율' },
]

export default function MarketPanel() {
  const { data: quotes, loading: qLoading, refetch: qRefetch } = useCurrentQuotes()
  const { data: capex } = useCapex()
  const { data: hbm } = useHbmShare()
  const { data: health } = useApiHealth()
  const [tab, setTab] = useState('compare')
  const [selectedSymbol, setSelectedSymbol] = useState('NVDA')

  const serverOk = !!health?.ok

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-semibold text-zinc-800">시장 데이터 (자동 업데이트)</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Yahoo Finance 자동 수집 — 4시간 캐시</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`flex items-center gap-1 text-xs ${serverOk ? 'text-emerald-600' : 'text-red-600'}`}>
            {serverOk ? <Wifi size={12} /> : <WifiOff size={12} />}
            {serverOk ? 'API 연결' : 'API 오프라인'}
          </span>
          <button
            onClick={qRefetch}
            className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-500 hover:text-zinc-700 transition-colors"
            title="새로고침"
          >
            <RefreshCw size={13} />
          </button>
        </div>
      </div>

      {/* Quote cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
        {SYMBOLS.map(sym => {
          const q = quotes?.find(r => r.symbol === sym)
          return (
            <QuoteCard
              key={sym}
              quote={q ?? { symbol: sym }}
              selected={tab === 'stock' && selectedSymbol === sym}
              onClick={() => { setTab('stock'); setSelectedSymbol(sym) }}
            />
          )
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 border-b border-zinc-200 pb-1">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-t text-xs font-medium transition-colors ${
              tab === t.id
                ? 'bg-zinc-100 text-zinc-900'
                : 'text-zinc-500 hover:text-zinc-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {tab === 'compare' && <AllStocksPanel />}
        {tab === 'stock' && (
          <div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {SYMBOLS.map(sym => {
                const m = SYMBOL_META[sym]
                return (
                  <button
                    key={sym}
                    onClick={() => setSelectedSymbol(sym)}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                      selectedSymbol === sym
                        ? 'bg-zinc-200 text-zinc-900'
                        : 'bg-zinc-100 text-zinc-500 hover:text-zinc-800'
                    }`}
                    style={{ borderBottom: selectedSymbol === sym ? `2px solid ${m?.color}` : '2px solid transparent' }}
                  >
                    {m?.nameKo ?? sym}
                  </button>
                )
              })}
            </div>
            <StockDetailPanel symbol={selectedSymbol} />
          </div>
        )}
        {tab === 'capex' && (
          <div>
            <p className="text-xs text-zinc-500 mb-3">빅테크 4사(Google·MS·Amazon·Meta) 분기별 CapEx 합산 — 2025·2026은 가이던스 기준 추정치</p>
            <CapExChart data={capex} />
          </div>
        )}
        {tab === 'hbm' && (
          <div>
            <p className="text-xs text-zinc-500 mb-1">분기별 HBM·DRAM 시장 점유율 추이 — 2026Q1 이후 추정치</p>
            <HbmShareChart data={hbm} />
          </div>
        )}
      </div>

      <p className="text-xs text-zinc-300 mt-3">
        주가 데이터: Yahoo Finance | CapEx·점유율: 각사 공시·리서치 집계
      </p>
    </div>
  )
}
