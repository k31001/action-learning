import { useState } from 'react'
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine,
} from 'recharts'

const RANGE_OPTIONS = [
  { label: '1년', months: 12 },
  { label: '2년', months: 24 },
  { label: '3년', months: 36 },
  { label: '5년', months: 60 },
  { label: '전체', months: Infinity },
]

function filterByRange(data, months, dateKey = 'date') {
  if (months === Infinity) return data
  const cutoff = new Date()
  cutoff.setMonth(cutoff.getMonth() - months)
  return data.filter(d => new Date(d[dateKey]) >= cutoff)
}

function tickDate(str) {
  if (!str) return ''
  const d = new Date(str)
  return `${d.getFullYear().toString().slice(2)}/${String(d.getMonth() + 1).padStart(2, '0')}`
}

const CustomTooltip = ({ active, payload, label, unit, formatValue }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-slate-100 border border-slate-300 rounded-lg p-2.5 text-xs shadow-xl">
      <div className="text-slate-500 mb-1.5">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <span style={{ color: p.color }}>●</span>
          <span className="text-slate-700">{p.name}:</span>
          <span className="font-mono font-bold" style={{ color: p.color }}>
            {formatValue ? formatValue(p.value) : p.value?.toLocaleString('ko-KR', { maximumFractionDigits: 2 })}
            {unit ? ` ${unit}` : ''}
          </span>
        </div>
      ))}
    </div>
  )
}

// Stock price chart (single symbol)
export function StockHistoryChart({ data, color = '#10b981', unit = '', formatValue }) {
  const [range, setRange] = useState(36)
  if (!data?.history?.length) return <EmptyChart />

  const filtered = filterByRange(data.history, range)
  const base = filtered[0]?.close
  const pct = base ? ((filtered[filtered.length - 1]?.close - base) / base * 100) : 0

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs font-medium ${pct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
          범위 내 {pct >= 0 ? '+' : ''}{pct.toFixed(1)}%
        </span>
        <div className="flex gap-1">
          {RANGE_OPTIONS.map(o => (
            <button
              key={o.months}
              onClick={() => setRange(o.months)}
              className={`px-2 py-0.5 rounded text-xs transition-colors ${
                range === o.months
                  ? 'bg-slate-200 text-slate-900'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={filtered} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`grad_${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis dataKey="date" tickFormatter={tickDate} tick={{ fill: '#475569', fontSize: 10 }} interval="preserveStartEnd" />
          <YAxis tick={{ fill: '#475569', fontSize: 10 }} width={50}
            tickFormatter={v => unit === '$' ? `$${v.toFixed(0)}` : v.toFixed(0)} />
          <Tooltip content={<CustomTooltip unit={unit} formatValue={formatValue} />} />
          <Area
            type="monotone" dataKey="close" name="종가"
            stroke={color} strokeWidth={2}
            fill={`url(#grad_${color.replace('#', '')})`}
            dot={false} activeDot={{ r: 4, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

// BigTech CapEx chart
export function CapExChart({ data }) {
  const [range, setRange] = useState(36)
  if (!data?.quarterly) return <EmptyChart />

  const filtered = filterByRange(data.quarterly, range, 'period')

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-slate-500">분기별 합산 AI CapEx</span>
        <div className="flex gap-1">
          {RANGE_OPTIONS.slice(0, 4).map(o => (
            <button key={o.months} onClick={() => setRange(o.months)}
              className={`px-2 py-0.5 rounded text-xs transition-colors ${
                range === o.months ? 'bg-slate-200 text-slate-900' : 'text-slate-500 hover:text-slate-700'
              }`}>
              {o.label}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={filtered} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis dataKey="period" tick={{ fill: '#475569', fontSize: 10 }} />
          <YAxis tick={{ fill: '#475569', fontSize: 10 }} width={40}
            tickFormatter={v => `$${v}B`} />
          <Tooltip content={<CustomTooltip unit="$B" />} />
          <Bar dataKey="total" name="4사 합산" fill="#6366f1" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// HBM market share chart
export function HbmShareChart({ data }) {
  const [view, setView] = useState('hbm')
  if (!data) return <EmptyChart />

  const source = view === 'hbm' ? data.data : data.dram_share?.data
  if (!source?.length) return <EmptyChart />

  const COLORS = {
    samsung: '#1428a0',
    skhynix: '#e8192c',
    micron: '#e85d26',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-1">
          <button onClick={() => setView('hbm')}
            className={`px-2 py-0.5 rounded text-xs ${view === 'hbm' ? 'bg-slate-200 text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>
            HBM
          </button>
          <button onClick={() => setView('dram')}
            className={`px-2 py-0.5 rounded text-xs ${view === 'dram' ? 'bg-slate-200 text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>
            DRAM 전체
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={source} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis dataKey="period" tick={{ fill: '#475569', fontSize: 9 }} />
          <YAxis domain={[0, 80]} tick={{ fill: '#475569', fontSize: 10 }} tickFormatter={v => `${v}%`} width={36} />
          <Tooltip content={<CustomTooltip unit="%" />} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <ReferenceLine y={50} stroke="#374151" strokeDasharray="4 3" />
          <Line type="monotone" dataKey="samsung" name="삼성전자" stroke={COLORS.samsung} strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
          <Line type="monotone" dataKey="skhynix" name="SK하이닉스" stroke={COLORS.skhynix} strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
          <Line type="monotone" dataKey="micron" name="마이크론" stroke={COLORS.micron} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// Multi-stock comparison chart (normalized to 100)
export function StockCompareChart({ stocksData }) {
  const [range, setRange] = useState(24)

  const validStocks = Object.entries(stocksData).filter(([, v]) => v?.history?.length)
  if (!validStocks.length) return <EmptyChart />

  // Merge dates from all symbols and normalize
  const allDates = [...new Set(
    validStocks.flatMap(([, v]) => v.history.map(h => h.date))
  )].sort()

  const cutoff = new Date()
  cutoff.setMonth(cutoff.getMonth() - range)

  const filteredDates = allDates.filter(d => new Date(d) >= cutoff)

  const mergedData = filteredDates.map(date => {
    const row = { date }
    validStocks.forEach(([sym, v]) => {
      const point = v.history.find(h => h.date === date)
      row[sym] = point?.close ?? null
    })
    return row
  })

  // Normalize to 100 at first available point
  const bases = {}
  validStocks.forEach(([sym]) => {
    const first = mergedData.find(r => r[sym] != null)
    bases[sym] = first?.[sym] ?? 1
  })

  const normalized = mergedData.map(row => {
    const n = { date: row.date }
    validStocks.forEach(([sym]) => {
      n[sym] = row[sym] != null ? +((row[sym] / bases[sym]) * 100).toFixed(1) : null
    })
    return n
  })

  const COLORS = {
    NVDA: '#76b900',
    MU: '#e85d26',
    '000660.KS': '#e8192c',
    '005930.KS': '#1428a0',
    SMH: '#8b5cf6',
  }

  const NAMES = {
    NVDA: 'NVDA',
    MU: 'MU',
    '000660.KS': 'SK하이닉스',
    '005930.KS': '삼성전자',
    SMH: 'SMH',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-slate-500">기준: 선택 기간 시작 = 100</span>
        <div className="flex gap-1">
          {RANGE_OPTIONS.slice(0, 4).map(o => (
            <button key={o.months} onClick={() => setRange(o.months)}
              className={`px-2 py-0.5 rounded text-xs transition-colors ${
                range === o.months ? 'bg-slate-200 text-slate-900' : 'text-slate-500 hover:text-slate-700'
              }`}>
              {o.label}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={normalized} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis dataKey="date" tickFormatter={tickDate} tick={{ fill: '#475569', fontSize: 10 }} interval="preserveStartEnd" />
          <YAxis tick={{ fill: '#475569', fontSize: 10 }} width={40} tickFormatter={v => `${v}`} />
          <Tooltip content={<CustomTooltip unit="" />} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <ReferenceLine y={100} stroke="#374151" strokeDasharray="4 3" />
          {validStocks.map(([sym]) => (
            <Line key={sym} type="monotone" dataKey={sym} name={NAMES[sym] ?? sym}
              stroke={COLORS[sym] ?? '#64748b'} strokeWidth={2} dot={false}
              connectNulls activeDot={{ r: 4, strokeWidth: 0 }} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function EmptyChart() {
  return (
    <div className="h-32 flex items-center justify-center text-xs text-slate-400">
      데이터 로딩 중...
    </div>
  )
}
