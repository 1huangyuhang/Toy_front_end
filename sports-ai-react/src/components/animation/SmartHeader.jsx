import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/**
 * SmartHeader (scroll animation)
 * - Scroll up: expand (slide down & show)
 * - Scroll down: collapse (slide up & hide)
 *
 * Notes:
 * - Uses rAF to avoid scroll handler thrash.
 * - Has a small deadzone to prevent jitter.
 * - Always shown near the very top.
 */
export default function SmartHeader({ top = null, menuExpanded = false, children, className = '' }) {
  const [collapsed, setCollapsed] = useState(false)
  const collapsedRef = useRef(false)
  const headerRef = useRef(null)
  const topRef = useRef(null)
  const contentRef = useRef(null)
  const lastYRef = useRef(0)
  const rafRef = useRef(0)
  const pendingYRef = useRef(0)
  const touchYRef = useRef(0)
  const dirRef = useRef(0)
  const accRef = useRef(0)
  const lastToggleAtRef = useRef(0)

  useLayoutEffect(() => {
    const headerEl = headerRef.current
    if (!headerEl) return

    function measure() {
      const topH = topRef.current?.offsetHeight || 0
      const contentH = contentRef.current?.offsetHeight || 0
      headerEl.style.setProperty('--sh-h', `${topH + contentH}px`)
    }

    measure()
    window.addEventListener('resize', measure, { passive: true })
    return () => window.removeEventListener('resize', measure)
  }, [top])

  useEffect(() => {
    // Expose menu open state to CSS (for reading progress visibility)
    document.documentElement.dataset.menuExpanded = menuExpanded ? '1' : '0'
    return () => {
      delete document.documentElement.dataset.menuExpanded
    }
  }, [menuExpanded])

  useEffect(() => {
    collapsedRef.current = collapsed
  }, [collapsed])

  useEffect(() => {
    lastYRef.current = window.scrollY || 0
    pendingYRef.current = lastYRef.current

    function tryToggle(nextCollapsed) {
      const now = performance.now()
      if (now - lastToggleAtRef.current < 160) return
      lastToggleAtRef.current = now
      setCollapsed(nextCollapsed)
    }

    function onWheel(e) {
      // Ignore tiny trackpad noise; use wheel only as hint, not direct toggle.
      if (Math.abs(e.deltaY) < 6) return
      // down => collapse, up => expand
      const next = e.deltaY > 0
      tryToggle(next)
    }

    function onTouchStart(e) {
      const t = e.touches && e.touches[0]
      if (!t) return
      touchYRef.current = t.clientY
    }

    function onTouchMove(e) {
      const t = e.touches && e.touches[0]
      if (!t) return
      const dy = touchYRef.current - t.clientY
      touchYRef.current = t.clientY
      if (Math.abs(dy) < 6) return
      // dy > 0 means finger moved up (page scrolls down) => collapse
      tryToggle(dy > 0)
    }

    function onScroll() {
      pendingYRef.current = window.scrollY || 0
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0
        const y = pendingYRef.current
        const last = lastYRef.current
        const delta = y - last
        lastYRef.current = y

        // Near top: keep shown
        if (y <= 12) {
          if (collapsedRef.current) setCollapsed(false)
          dirRef.current = 0
          accRef.current = 0
          return
        }

        // Deadzone to avoid jitter
        if (Math.abs(delta) < 2) return

        const dir = delta > 0 ? 1 : -1
        if (dirRef.current !== dir) {
          dirRef.current = dir
          accRef.current = 0
        }
        accRef.current += delta

        // Require a meaningful accumulated movement before toggling (prevents flicker).
        if (dirRef.current === 1 && accRef.current > 28) {
          // scrolling down => collapse
          if (!collapsedRef.current) tryToggle(true)
          accRef.current = 0
        } else if (dirRef.current === -1 && accRef.current < -22) {
          // scrolling up => expand
          if (collapsedRef.current) tryToggle(false)
          accRef.current = 0
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const cls = `glass-nav smart-header ${collapsed ? 'is-collapsed' : 'is-expanded'} ${className}`.trim()

  return (
    <header ref={headerRef} className={cls}>
      {top ? (
        <div ref={topRef} className="smart-header__top">
          {top}
        </div>
      ) : null}
      <div ref={contentRef} className="smart-header__content">
        {children}
      </div>
    </header>
  )
}

