import { useEffect } from 'react'

const STYLE_ID = 'dify-animate-style'
const ATTR = 'data-animate'
const READY_CLASS = 'da-ready'
const IN_CLASS = 'da-in'

function ensureStyle() {
  if (document.getElementById(STYLE_ID)) return
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent =
    '/* Dify Animate (injected) */\n' +
    `[${ATTR}]{--da-delay:0ms;--da-duration:520ms;--da-ease:cubic-bezier(0.22,1,0.36,1);}\n` +
    `[${ATTR}].${READY_CLASS}{opacity:0;transform:translate3d(var(--da-x,0),var(--da-y,12px),0) scale(var(--da-scale,1));` +
    'filter:blur(var(--da-blur,0px));transition-property:opacity,transform,filter;transition-duration:var(--da-duration);' +
    'transition-timing-function:var(--da-ease);transition-delay:var(--da-delay);will-change:opacity,transform;}\n' +
    `[${ATTR}].${READY_CLASS}.${IN_CLASS}{opacity:1;transform:translate3d(0,0,0) scale(1);filter:blur(0px);}\n` +
    `[${ATTR}][data-animate="fade"]{--da-y:0px;--da-x:0px;}\n` +
    `[${ATTR}][data-animate="fade-up"]{--da-y:16px;}\n` +
    `[${ATTR}][data-animate="fade-down"]{--da-y:-16px;}\n` +
    `[${ATTR}][data-animate="fade-left"]{--da-x:16px;--da-y:0px;}\n` +
    `[${ATTR}][data-animate="fade-right"]{--da-x:-16px;--da-y:0px;}\n` +
    `[${ATTR}][data-animate="zoom"]{--da-scale:0.96;--da-y:10px;}\n` +
    '@media (prefers-reduced-motion: reduce){' +
    `[${ATTR}].${READY_CLASS}{transition:none !important;transform:none !important;filter:none !important;opacity:1 !important;}` +
    '}\n'
  document.head.appendChild(style)
}

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function toNumber(val, fallback) {
  const n = parseFloat(val)
  return Number.isFinite(n) ? n : fallback
}

function toBool(val, fallback) {
  if (val == null) return fallback
  const s = String(val).toLowerCase().trim()
  if (s === 'true') return true
  if (s === 'false') return false
  return fallback
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

function prepareElement(el) {
  el.classList.add(READY_CLASS)
  const delay = toNumber(el.getAttribute('data-anim-delay'), 0)
  const duration = toNumber(el.getAttribute('data-anim-duration'), 520)
  const ease = el.getAttribute('data-anim-ease') || 'cubic-bezier(0.22, 1, 0.36, 1)'
  el.style.setProperty('--da-delay', `${delay}ms`)
  el.style.setProperty('--da-duration', `${duration}ms`)
  el.style.setProperty('--da-ease', ease)
}

function animateIn(el) {
  requestAnimationFrame(() => el.classList.add(IN_CLASS))
}

export default function DifyAnimate() {
  useEffect(() => {
    ensureStyle()
    const nodes = Array.from(document.querySelectorAll(`[${ATTR}]`))
    if (!nodes.length) return

    if (prefersReducedMotion()) {
      nodes.forEach((el) => {
        el.classList.add(READY_CLASS)
        el.classList.add(IN_CLASS)
      })
      return
    }

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((el) => {
        prepareElement(el)
        animateIn(el)
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target
          animateIn(el)
          const once = toBool(el.getAttribute('data-anim-once'), true)
          if (once) observer.unobserve(el)
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.01 },
    )

    const localObservers = []
    nodes.forEach((el) => {
      prepareElement(el)
      const offset = clamp(toNumber(el.getAttribute('data-anim-offset'), 0.12), 0, 1)
      if (offset === 0.12) {
        observer.observe(el)
        return
      }
      const px = Math.round(window.innerHeight * offset)
      const local = new IntersectionObserver(
        (entries, obs) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            animateIn(entry.target)
            const once = toBool(entry.target.getAttribute('data-anim-once'), true)
            if (once) obs.unobserve(entry.target)
          }
        },
        { root: null, rootMargin: `0px 0px -${px}px 0px`, threshold: 0.01 },
      )
      local.observe(el)
      localObservers.push(local)
    })

    return () => {
      observer.disconnect()
      localObservers.forEach((o) => o.disconnect())
    }
  }, [])

  return null
}

