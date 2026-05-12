/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        samsung: {
          blue: '#1428A0',
          dark: '#0A1854',
        },
        // 라이트 테마 base 팔레트 — 중성 zinc (프로 SaaS 표준 톤)
        // Linear / shadcn / Vercel 라이트 모드 계열, slate(cool)·stone(warm) 사이
        canvas: '#f4f4f5',                // 페이지 base — zinc-100, 중성 paper
        surface: {
          DEFAULT: '#ffffff',              // 기본 카드 — 흰색 (zinc bg 위 contrast)
          raised:  '#ffffff',              // 모달/팝오버
          subtle:  '#fafafa',              // 헤더/섹션 미묘한 분리 (zinc-50)
        },
        // ── Apple HIG system palette (Option B token absorption) ──────────
        // Usage: bg-hig-blue, text-hig-red, ring-hig-gray, etc.
        // Source: developer.apple.com/design/human-interface-guidelines/color
        hig: {
          red:    '#FF3B30',
          orange: '#FF9500',
          yellow: '#FFCC00',
          green:  '#34C759',
          mint:   '#00C7BE',
          teal:   '#30B0C7',
          cyan:   '#32ADE6',
          blue:   '#007AFF',
          indigo: '#5856D6',
          purple: '#AF52DE',
          pink:   '#FF2D55',
          brown:  '#A2845E',
          // System grays
          gray:   '#8E8E93',
          gray2:  '#AEAEB2',
          gray3:  '#C7C7CC',
          gray4:  '#D1D1D6',
          gray5:  '#E5E5EA',
          gray6:  '#F2F2F7',
          // Semantic surfaces (light mode)
          background:         '#FFFFFF',
          'background-2':     '#F2F2F7',
          separator:          'rgba(60, 60, 67, 0.29)',
          'separator-opaque': '#C6C6C8',
        },
      },
      fontFamily: {
        sans: [
          'Inter var', 'Inter',
          'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont',
          '"Segoe UI"', '"Apple SD Gothic Neo"', '"Noto Sans KR"', 'Roboto', 'sans-serif',
        ],
        mono: [
          'JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco',
          'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace',
        ],
        // Apple system font stack — use via `font-hig`
        // SF Pro on Apple platforms, system-ui everywhere else; Korean falls back to Apple SD Gothic Neo / Noto Sans KR.
        hig: [
          '-apple-system', 'BlinkMacSystemFont',
          '"SF Pro Display"', '"SF Pro Text"',
          'system-ui', '"Helvetica Neue"',
          '"Apple SD Gothic Neo"', '"Noto Sans KR"',
          'sans-serif',
        ],
      },
      borderRadius: {
        // Apple HIG continuous-corner approximations
        // Usage: rounded-hig-md (10pt button), rounded-hig-lg (14pt card)
        'hig-sm':  '6px',
        'hig-md':  '10px',
        'hig-lg':  '14px',
        'hig-xl':  '20px',
        'hig-2xl': '28px',
      },
      boxShadow: {
        // 라이트 모드 — 미세한 elevation
        soft:    '0 1px 2px rgba(15, 23, 42, .04), 0 0 0 1px rgba(15, 23, 42, .05)',
        elevate: '0 4px 16px rgba(15, 23, 42, .08), 0 0 0 1px rgba(15, 23, 42, .06)',
        // Apple HIG — soft, low-spread elevation
        // Usage: shadow-hig-1 → shadow-hig-4 (1=hairline, 4=floating)
        'hig-1':     '0 1px 2px rgba(0,0,0,0.04), 0 1px 1px rgba(0,0,0,0.03)',
        'hig-2':     '0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'hig-3':     '0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
        'hig-4':     '0 8px 24px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.05)',
        'hig-modal': '0 20px 60px rgba(0,0,0,0.20), 0 8px 16px rgba(0,0,0,0.10)',
      },
      transitionTimingFunction: {
        // Apple spring + standard curves
        'hig-spring':   'cubic-bezier(0.5, 1.5, 0.5, 1)',
        'hig-standard': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
