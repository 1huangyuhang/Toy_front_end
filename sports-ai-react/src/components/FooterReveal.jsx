import { useEffect, useRef } from 'react'
import { setupFooterReveal } from '../animations/footerReveal.js'

export default function FooterReveal({ children }) {
  const footerRef = useRef(null)
  const contentRef = useRef(null)
  const spacerRef = useRef(null)

  useEffect(() => {
    const cleanup = setupFooterReveal({
      footerEl: footerRef.current,
      contentEl: contentRef.current,
      spacerEl: spacerRef.current,
      options: {
        revealRange: 240,
        startAt: 40,
      },
    })
    return cleanup
  }, [])

  return (
    <>
      {/* Spacer: 让页面能滚动到 footer reveal 区域 */}
      <div ref={spacerRef} aria-hidden="true" />

      {/* Fixed footer: 接近底部时“抽出” */}
      <div
        ref={footerRef}
        className="footer-reveal"
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          height: 'var(--footer-reveal-h, 0px)',
          overflow: 'hidden',
          transition: 'height 220ms cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'height',
        }}
      >
        <div ref={contentRef} style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
          {children}
        </div>
      </div>
    </>
  )
}

