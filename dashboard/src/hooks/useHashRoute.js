// 해시 기반 딥링크 라우팅 — 페이지·서브탭마다 고유 URL 부여 (#/페이지/서브탭)
// 라우터 의존성 없이 location.hash 세그먼트를 useState처럼 다루는 훅.
// 예: #/strategy/transformation, #/ewi/triggers, #/interviews/ai-infra-supercycle
import { useCallback, useEffect, useSyncExternalStore } from 'react'

function subscribe(onChange) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

export function getHashSegments() {
  return window.location.hash
    .replace(/^#\/?/, '')
    .split('/')
    .filter(Boolean)
    .map(s => {
      try {
        return decodeURIComponent(s)
      } catch {
        return s
      }
    })
}

function buildHash(segments) {
  return '#/' + segments.map(encodeURIComponent).join('/')
}

// index 깊이의 해시 세그먼트를 [value, setValue]로 노출.
// - validIds가 주어지면 그 외 값은 fallback으로 대체
// - normalize=true면 마운트 시 세그먼트가 비었거나 유효하지 않을 때 URL을 실제
//   표시 상태로 교정(히스토리 추가 없음) — 최상위 탭(index 0)에서만 사용.
//   하위 세그먼트가 setValue로 상위보다 먼저 쓰이는 일이 없도록 보장하는 역할.
// - setValue는 더 깊은 세그먼트를 잘라낸다 (페이지 전환 시 서브탭 초기화)
export function useHashSegment(index, fallback, validIds, normalize = false) {
  const raw = useSyncExternalStore(subscribe, () => getHashSegments()[index] ?? '')
  const value = validIds
    ? (validIds.includes(raw) ? raw : fallback)
    : (raw || fallback)

  useEffect(() => {
    if (!normalize || raw === value || value == null) return
    const segs = getHashSegments().slice(0, index)
    segs[index] = value
    window.history.replaceState(null, '', buildHash(segs))
  }, [normalize, index, raw, value])

  const setValue = useCallback(next => {
    const segs = getHashSegments().slice(0, index)
    segs[index] = next
    window.location.hash = buildHash(segs)
  }, [index])

  return [value, setValue]
}
