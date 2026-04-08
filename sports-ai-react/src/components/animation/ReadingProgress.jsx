import { useEffect, useRef } from 'react'

function clamp01(n) {
  if (!Number.isFinite(n)) return 0
  return Math.max(0, Math.min(1, n))
}

function isRootScrollSurface(el) {
  if (!el || el === document) return true
  const se = document.scrollingElement
  return el === document.documentElement || el === document.body || (se && el === se)
}

/**
 * 主文档滚动进度（桌面/移动端视口滚动）。
 * 用 window + 文档最大高度，避免 html/body height:100% 时选错 scrollingElement 导致进度卡住。
 */
function getViewportDocumentProgress() {
  const y =
    window.scrollY ??
    window.pageYOffset ??
    document.documentElement?.scrollTop ??
    document.body?.scrollTop ??
    0

  const h = Math.max(
    document.documentElement?.scrollHeight ?? 0,
    document.body?.scrollHeight ?? 0,
    document.documentElement?.offsetHeight ?? 0,
    document.body?.offsetHeight ?? 0,
    document.documentElement?.clientHeight ?? 0,
    document.body?.clientHeight ?? 0,
  )

  const vh = window.innerHeight || 0
  const maxScroll = Math.max(0, h - vh)
  if (maxScroll <= 1) return 0

  const EPS_PX = 2
  if (y >= maxScroll - EPS_PX) return 1
  return clamp01(y / maxScroll)
}

function getNestedScrollProgress(el) {
  const st = el.scrollTop || 0
  const maxScroll = Math.max(1, (el.scrollHeight || 0) - (el.clientHeight || 0))
  const EPS_PX = 2
  if (st >= maxScroll - EPS_PX) return 1
  return clamp01(st / maxScroll)
}

function getProgress(nestedScroller) {
  if (nestedScroller && !isRootScrollSurface(nestedScroller)) {
    return getNestedScrollProgress(nestedScroller)
  }
  return getViewportDocumentProgress()
}

/**
 * ReadingProgress
 * - Updates CSS vars only (no React re-render on scroll).
 * - Visible only when menu/header is NOT expanded (controlled by SmartHeader).
 */
export default function ReadingProgress() {
  const rootRef = useRef(null)
  const rafRef = useRef(0)
  /** null = 主文档视口滚动；非 null = 内部 overflow 容器 */
  const nestedScrollerRef = useRef(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    let lastP = -1
    let lastHeadVisible = null
    let lastBarVisible = null

    function applyProgress(p) {
      el.style.setProperty('--rp', String(p))
      el.style.setProperty('--rpv', String(p))

      const pct = `${(p * 100).toFixed(3)}%`
      el.style.setProperty('--rp-pct', pct)
      // Head dot should not overflow at 100%.
      el.style.setProperty('--rp-head-shift', p >= 0.999 ? '-100%' : '-50%')

      // Aggressively remove glow when near 0 to eliminate occasional "ghost halo"
      // caused by box-shadow / blur painting even when width is ~0.
      const barVisible = p > 0.0005
      const headVisible = p > 0.003 && p < 0.9995

      el.style.setProperty('--rp-head-opacity', headVisible ? '0.85' : '0')
      el.style.setProperty(
        '--rp-bar-shadow',
        barVisible ? '0 0 0 1px rgba(255, 255, 255, 0.18), 0 10px 30px var(--progress-glow)' : 'none',
      )
      el.style.setProperty('--rp-head-shadow', headVisible ? '0 10px 30px var(--progress-glow)' : 'none')

      lastBarVisible = barVisible
      lastHeadVisible = headVisible
    }

    function schedule() {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0
        const p = getProgress(nestedScrollerRef.current)
        const barVisible = p > 0.0005
        const headVisible = p > 0.003 && p < 0.9995
        // Skip only when both value and visibility states are stable.
        if (Math.abs(p - lastP) < 1e-5 && barVisible === lastBarVisible && headVisible === lastHeadVisible) return
        lastP = p
        applyProgress(p)
      })
    }

    function onAnyScroll(e) {
      const target = e?.target
      if (isRootScrollSurface(target)) {
        nestedScrollerRef.current = null
      } else if (target && target instanceof Element) {
        const maxScroll = (target.scrollHeight || 0) - (target.clientHeight || 0)
        if (maxScroll > 2) nestedScrollerRef.current = target
      }
      schedule()
    }

    schedule()
    window.addEventListener('scroll', onAnyScroll, { passive: true })
    document.addEventListener('scroll', onAnyScroll, { passive: true, capture: true })
    window.addEventListener('resize', schedule, { passive: true })
    window.addEventListener('load', schedule, { passive: true })
    document.addEventListener('scrollend', onAnyScroll, { passive: true, capture: true })

    let ro
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(() => schedule())
      ro.observe(document.documentElement)
      const root = document.getElementById('root')
      if (root) ro.observe(root)
    }

    return () => {
      window.removeEventListener('scroll', onAnyScroll)
      document.removeEventListener('scroll', onAnyScroll, { capture: true })
      document.removeEventListener('scrollend', onAnyScroll, { capture: true })
      window.removeEventListener('resize', schedule)
      window.removeEventListener('load', schedule)
      if (ro) ro.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className="reading-progress"
      aria-hidden="true"
      style={{
        '--rp': '0',
        '--rpv': '0',
        '--rp-pct': '0%',
        '--rp-head-shift': '-50%',
        '--rp-head-opacity': '0',
        '--rp-bar-shadow': 'none',
        '--rp-head-shadow': 'none',
      }}
    >
      <div className="reading-progress__bar" />
    </div>
  )
}

