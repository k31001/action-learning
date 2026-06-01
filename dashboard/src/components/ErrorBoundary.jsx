import { Component } from 'react'

// 한 컴포넌트의 렌더 오류가 대시보드 전체를 백지(white screen)로 만들지 않도록 격리.
// App 에서 탭별로 key={topTab} 로 감싸면 탭 전환 시 자동 리셋된다.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    // 프로덕션에서도 콘솔로 추적 가능하도록 기록
    console.error('Dashboard render error:', error, info?.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="m-2 rounded-hig-lg border border-red-200 bg-red-50 p-5 text-sm">
          <h3 className="font-semibold text-red-700 mb-1">이 화면을 표시하는 중 오류가 발생했습니다</h3>
          <p className="text-red-600/90 text-xs mb-2">
            다른 탭은 정상 동작합니다. 아래 버튼으로 다시 시도하거나 페이지를 새로고침해 주세요.
          </p>
          <pre className="text-[11px] text-red-500 whitespace-pre-wrap break-words bg-white/70 border border-red-200 rounded p-2 max-h-40 overflow-auto">
            {String(this.state.error?.message || this.state.error)}
          </pre>
          <button
            onClick={() => this.setState({ error: null })}
            className="mt-2 px-3 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700"
          >
            다시 시도
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
