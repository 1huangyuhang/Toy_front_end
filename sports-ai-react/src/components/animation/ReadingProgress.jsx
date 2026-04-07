import { useEffect, useRef } from 'react'

function clamp01(n) {
  if (!Number.isFinite(n)) return 0
  return Math.max(0, Math.min(1, n))
}

function getScroller() {
  const candidates = [document.scrollingElement, document.documentElement, document.body].filter(Boolean)
  for (const el of candidates) {
    const maxScroll = (el.scrollHeight || 0) - (el.clientHeight || 0)
    if (maxScroll > 2) return el
  }
  return document.documentElement
}

function getProgress(scroller) {
  const el = scroller || getScroller()

  const scrollTop = Math.max(
    el.scrollTop || 0,
    window.scrollY || 0,
    window.pageYOffset || 0,
    document.documentElement.scrollTop || 0,
    document.body.scrollTop || 0,
  )

  const scrollHeight = Math.max(el.scrollHeight || 0, document.documentElement.scrollHeight || 0, document.body.scrollHeight || 0)
  const clientHeight = Math.max(el.clientHeight || 0, window.innerHeight || 0)

  const maxScroll = Math.max(1, scrollHeight - clientHeight)
  const EPS_PX = 3
  if (scrollTop >= maxScroll - EPS_PX) return 1
  return clamp01(scrollTop / maxScroll)
}

/**
 * ReadingProgress
 * - Updates CSS vars only (no React re-render on scroll).
 * - Visible only when menu/header is NOT expanded (controlled by SmartHeader).
 */
export default function ReadingProgress() {
  const rootRef = useRef(null)
  const rafRef = useRef(0)
  const scrollerRef = useRef(null)
  const intervalRef = useRef(0)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    let lastP = -1
    scrollerRef.current = getScroller()

    function schedule() {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0
        const p = getProgress(scrollerRef.current)
        // Keep it responsive: only skip extremely tiny diffs
        if (Math.abs(p - lastP) < 0.0001) return
        lastP = p
        el.style.setProperty('--rp', String(p))
        // At top, should be truly 0 (no pre-filled segment).
        el.style.setProperty('--rpv', String(p))
        const pct = `${(p * 100).toFixed(3)}%`
        el.style.setProperty('--rp-pct', pct)
        // Head dot should not overflow at 100%.
        el.style.setProperty('--rp-head', pct)
        el.style.setProperty('--rp-head-shift', p >= 0.999 ? '-100%' : '-50%')
      })
    }

    function onAnyScroll(e) {
      // Capture the actual scroll container if the page scroll is inside an element
      // (e.g. a wrapper with overflow: auto).
      const target = e?.target
      if (target && target !== document && target !== window && target !== document.documentElement) {
        const t = target
        const maxScroll = (t.scrollHeight || 0) - (t.clientHeight || 0)
        if (maxScroll > 2) scrollerRef.current = t
      }
      schedule()
    }

    function ensureInterval() {
      if (intervalRef.current) return
      // Poll briefly to catch engines that don't emit reliable scroll events
      // (or when scrollTop changes without a scroll event).
      intervalRef.current = window.setInterval(schedule, 80)
      window.setTimeout(() => {
        if (!intervalRef.current) return
        window.clearInterval(intervalRef.current)
        intervalRef.current = 0
      }, 2500)
    }

    schedule()
    window.addEventListener('scroll', onAnyScroll, { passive: true })
    document.addEventListener('scroll', onAnyScroll, { passive: true, capture: true })
    scrollerRef.current?.addEventListener?.('scroll', onAnyScroll, { passive: true })
    window.addEventListener('wheel', ensureInterval, { passive: true })
    window.addEventListener('touchmove', ensureInterval, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    window.addEventListener('load', schedule, { passive: true })

    let ro
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(() => schedule())
      ro.observe(document.documentElement)
    }

    return () => {
      window.removeEventListener('scroll', onAnyScroll)
      document.removeEventListener('scroll', onAnyScroll, { capture: true })
      scrollerRef.current?.removeEventListener?.('scroll', onAnyScroll)
      window.removeEventListener('wheel', ensureInterval)
      window.removeEventListener('touchmove', ensureInterval)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('load', schedule)
      if (ro) ro.disconnect()
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = 0
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className="reading-progress"
      aria-hidden="true"
      style={{ '--rp': '0', '--rpv': '0', '--rp-pct': '0%', '--rp-head': '0%', '--rp-head-shift': '-50%' }}
    >
      <div className="reading-progress__bar" />
    </div>
  )
}

