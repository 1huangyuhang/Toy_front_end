/**
 * Footer Reveal 动画（Defi 风格：滚动到底部时“抽出”页脚）
 *
 * 用法：
 * - 在页面末尾渲染一个固定在底部的 footer 容器，并在内容末尾放一个 spacer。
 * - 调用 setupFooterReveal({ footerEl, spacerEl })
 *
 * 说明：
 * - 通过 scroll 计算进度 progress(0~1)，写到 CSS 变量 --footer-reveal
 * - footer 使用“遮罩高度”让它从底部逐步揭开
 */

function clamp01(n) {
  return Math.max(0, Math.min(1, n))
}

export function setupFooterReveal({ footerEl, contentEl, spacerEl, options = {} }) {
  if (!footerEl || !contentEl || !spacerEl) return () => {}

  // 只在“接近底部的最后一段”才开始显现
  const revealRange = typeof options.revealRange === 'number' ? options.revealRange : 240
  // 距离底部 <= startAt 时视为完全显现（progress=1）
  const startAt = typeof options.startAt === 'number' ? options.startAt : 40

  let raf = 0
  let cachedFooterH = 0
  let lastEased = -1

  function measureFooterHeight() {
    // 注意：外层 footerEl 的高度会被遮罩设为 0~N，不能用来测“真实 footer 内容高度”
    const h = Math.ceil(contentEl.getBoundingClientRect().height || 0)
    spacerEl.style.height = `${h}px`
    return h
  }

  function tick() {
    raf = 0
    const docH = document.documentElement.scrollHeight
    const winH = window.innerHeight
    const scrollY = window.scrollY || window.pageYOffset || 0

    // 距离底部还有多少
    const remaining = docH - (scrollY + winH)

    // Far away from bottom: keep hidden without any layout reads.
    if (remaining > startAt + revealRange && lastEased <= 0) return

    // Ensure we have a measured footer height when reveal begins.
    if (!cachedFooterH) cachedFooterH = measureFooterHeight()

    // 进入“最后 revealRange 像素”才开始 reveal；越靠近底部越接近 1
    // remaining > startAt + revealRange => 0
    // remaining <= startAt             => 1
    const progress = clamp01((startAt + revealRange - remaining) / revealRange)
    // 更像 Defi：前段更隐，后段更快显现
    const eased = progress * progress * (3 - 2 * progress) // smoothstep

    if (Math.abs(eased - lastEased) < 0.002) return
    lastEased = eased

    footerEl.style.setProperty('--footer-reveal', String(eased))
    // 遮罩高度：从 0 -> footerH，形成“从底端揭开”的感觉
    footerEl.style.setProperty('--footer-reveal-h', `${Math.round(cachedFooterH * eased)}px`)
    // 不做渐隐：只用遮罩高度控制“揭开”，不改 opacity/display

    // 防止 footer 覆盖内容交互：接近底部才允许点击
    footerEl.style.pointerEvents = eased > 0.1 ? 'auto' : 'none'
  }

  function requestTick() {
    if (raf) return
    raf = window.requestAnimationFrame(tick)
  }

  const ro = new ResizeObserver(() => {
    cachedFooterH = measureFooterHeight()
    requestTick()
  })
  ro.observe(contentEl)

  window.addEventListener('scroll', requestTick, { passive: true })
  window.addEventListener('resize', requestTick, { passive: true })

  requestTick()

  return () => {
    if (raf) cancelAnimationFrame(raf)
    ro.disconnect()
    window.removeEventListener('scroll', requestTick)
    window.removeEventListener('resize', requestTick)
  }
}

