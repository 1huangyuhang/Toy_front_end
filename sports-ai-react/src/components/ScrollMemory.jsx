import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

function keyForLocation(location) {
  // 按页面路径记忆（不把 hash 纳入 key，避免同页不同锚点混乱）
  return `sports-ai-scroll:${location.pathname}${location.search}`
}

export default function ScrollMemory() {
  const location = useLocation()
  const prevLocationRef = useRef(location)

  useEffect(() => {
    // 路由切换前：保存上一页滚动位置
    const prev = prevLocationRef.current
    try {
      sessionStorage.setItem(keyForLocation(prev), String(window.scrollY))
    } catch {
      // ignore
    }

    // 路由切换后：优先 hash，否则恢复
    const hash = location.hash
    if (hash) {
      // 让页面先渲染一帧，避免找不到元素
      requestAnimationFrame(() => {
        const el = document.querySelector(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      })
    } else {
      let raw = null
      try {
        raw = sessionStorage.getItem(keyForLocation(location))
      } catch {
        raw = null
      }
      if (raw != null) {
        const y = parseInt(raw, 10)
        if (!Number.isNaN(y) && y >= 0) window.scrollTo(0, y)
      } else {
        window.scrollTo(0, 0)
      }
    }

    prevLocationRef.current = location
  }, [location])

  useEffect(() => {
    // 刷新/关闭：保存当前页
    const handler = () => {
      try {
        sessionStorage.setItem(keyForLocation(prevLocationRef.current), String(window.scrollY))
      } catch {
        // ignore
      }
    }
    window.addEventListener('pagehide', handler)
    return () => window.removeEventListener('pagehide', handler)
  }, [])

  return null
}

