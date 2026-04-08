import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext.jsx'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

function NavItem({ to, children, onNavigate }) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        `nav-link ${isActive ? 'is-active' : ''}`.trim()
      }
    >
      {children}
    </NavLink>
  )
}

export default function SiteNav({ onExpandedChange }) {
  const { user, loading, logout } = useAuth()
  const location = useLocation()
  const [openKey, setOpenKey] = useState(null)
  const closeTimerRef = useRef(0)

  const menu = useMemo(
    () => [
      { label: '首页', to: '/' },
      {
        label: '公司产品',
        key: 'products',
        panel: {
          title: '公司产品',
          subtitle: '面向训练、赛事与场馆运营的产品矩阵',
          groups: [
            {
              title: '训练产品',
              items: [
                { label: '智能训练系统', desc: '训练负荷与动作质量的闭环优化', to: '/products#training' },
                { label: '伤病风险预警', desc: '多源数据融合的风险评分与建议', to: '/products#injury' },
                { label: '体能评估与恢复', desc: '体测、疲劳与恢复流程协同', to: '/products#recovery' },
              ],
            },
            {
              title: '赛事产品',
              items: [
                { label: '赛事分析平台', desc: '实时/赛后指标体系与复盘报告', to: '/products#match' },
                { label: '战术洞察与复盘', desc: '空间与链路的可量化战术分析', to: '/products#tactics' },
                { label: '球员表现画像', desc: '能力画像与成长曲线追踪', to: '/products#player' },
              ],
            },
            {
              title: '场馆产品',
              items: [
                { label: '智能场馆管理', desc: '客流、资源与服务触点运营', to: '/products#venue' },
                { label: '票务与入场', desc: '票务策略、核验与风控联动', to: '/products#ticket' },
                { label: '安防与应急', desc: '视频智能与应急预案联动', to: '/products#security' },
              ],
            },
          ],
        },
      },
      {
        label: '解决方案',
        key: 'solutions',
        panel: {
          title: '解决方案',
          subtitle: '以业务目标为核心的端到端落地方案',
          groups: [
            {
              title: '俱乐部',
              items: [
                { label: '青训数据化', desc: '选材、训练、比赛评估一体化', to: '/solutions#academy' },
                { label: '一线队训练闭环', desc: '训练-比赛关联的持续迭代', to: '/solutions#proteam' },
                { label: '医疗康复协同', desc: '队医/体能/教练多角色协作', to: '/solutions#medical' },
              ],
            },
            {
              title: '场馆与赛事',
              items: [
                { label: '智慧场馆运营', desc: '票务、客流、资源与服务提升', to: '/solutions#venueops' },
                { label: '赛事数据服务', desc: '采集、分析与分发的稳定链路', to: '/solutions#matchops' },
                { label: '转播与内容生产', desc: 'AI 提升内容生产与分发效率', to: '/solutions#broadcast' },
              ],
            },
            {
              title: '商业增长',
              items: [
                { label: '球迷互动与会员', desc: '会员分层、权益与互动增长', to: '/solutions#fan' },
                { label: '赞助与权益评估', desc: '曝光与互动量化的 ROI 评估', to: '/solutions#sponsor' },
                { label: '数据驱动营销', desc: '分群、归因与自动化触达', to: '/solutions#marketing' },
              ],
            },
          ],
        },
      },
      { label: '客户成功', to: '/cases' },
      { label: '关于我们', to: '/about' },
      { label: '联系我们', to: '/contact' },
    ],
    [],
  )

  useEffect(() => {
    // route changed -> close menu
    setOpenKey(null)
  }, [location.pathname, location.search, location.hash])

  useEffect(() => {
    onExpandedChange?.(Boolean(openKey))
  }, [openKey, onExpandedChange])

  useEffect(() => {
    if (!openKey) return
    const prevOverflow = document.body.style.overflow
    const prevPaddingRight = document.body.style.paddingRight

    // Prevent layout shift when scrollbar disappears.
    const scrollBarW = window.innerWidth - document.documentElement.clientWidth
    if (scrollBarW > 0) document.body.style.paddingRight = `${scrollBarW}px`
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = prevOverflow
      document.body.style.paddingRight = prevPaddingRight
    }
  }, [openKey])

  useEffect(() => {
    if (!openKey) return
    function onKeyDown(e) {
      if (e.key === 'Escape') setOpenKey(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [openKey])

  function clearCloseTimer() {
    if (!closeTimerRef.current) return
    window.clearTimeout(closeTimerRef.current)
    closeTimerRef.current = 0
  }

  function open(key) {
    clearCloseTimer()
    setOpenKey(key)
  }

  function scheduleClose() {
    clearCloseTimer()
    closeTimerRef.current = window.setTimeout(() => setOpenKey(null), 120)
  }

  function close() {
    clearCloseTimer()
    setOpenKey(null)
  }

  function onNavigate() {
    close()
  }

  const activeMenu = openKey ? menu.find((m) => m.key === openKey) : null

  return (
    <nav aria-label="主导航" className="nav-root" onMouseLeave={scheduleClose} onMouseEnter={clearCloseTimer}>
      <ul className="nav-list">
        {menu.map((m) =>
          m.panel ? (
            <li key={m.key} className={`nav-item ${openKey === m.key ? 'is-open' : ''}`}>
              <button
                type="button"
                className="nav-link nav-trigger"
                aria-haspopup="true"
                aria-expanded={openKey === m.key}
                onMouseEnter={() => open(m.key)}
                onFocus={() => open(m.key)}
                onClick={() => (openKey === m.key ? close() : open(m.key))}
              >
                {m.label}
                <span className="nav-caret" aria-hidden="true">
                  ▾
                </span>
              </button>
            </li>
          ) : (
            <li key={m.to} className="nav-item">
              <NavItem to={m.to} onNavigate={onNavigate}>
                {m.label}
              </NavItem>
            </li>
          ),
        )}

        {!loading && !user ? (
          <>
            <li>
              <NavLink className="nav-link nav-strong" to="/login" onClick={onNavigate}>
                登录
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link nav-strong" to="/register" onClick={onNavigate}>
                注册
              </NavLink>
            </li>
          </>
        ) : null}
        {!loading && user ? (
          <li>
            <button
              type="button"
              className="nav-link nav-strong"
              onClick={() => {
                onNavigate()
                logout()
              }}
              title={user.email}
            >
              退出
            </button>
          </li>
        ) : null}
      </ul>

      {/* Mega menu is portaled to body to avoid being clipped by header overflow/filters */}
      {activeMenu?.panel
        ? createPortal(
            <div
              className="nav-mega"
              role="dialog"
              aria-label={`${activeMenu.label} 菜单`}
              onMouseEnter={clearCloseTimer}
              onMouseLeave={scheduleClose}
            >
              <button type="button" className="nav-mega-scrim" aria-label="关闭菜单" onClick={close} />
              <div className="nav-mega-inner" role="document" onMouseEnter={clearCloseTimer} onMouseLeave={scheduleClose}>
                <aside className="nav-mega-aside">
                  <div className="nav-mega-title">{activeMenu.panel.title}</div>
                  {activeMenu.panel.subtitle ? <div className="nav-mega-subtitle">{activeMenu.panel.subtitle}</div> : null}
                </aside>

                <div className="nav-mega-grid">
                  {activeMenu.panel.groups.map((g) => (
                    <div key={g.title} className="nav-mega-col">
                      <div className="nav-mega-col-title">{g.title}</div>
                      <ul className="nav-mega-links">
                        {g.items.map((it) => (
                          <li key={it.to}>
                            <NavLink className="nav-mega-link" to={it.to} onClick={onNavigate}>
                              <span className="nav-mega-link-label">{it.label}</span>
                              {it.desc ? <span className="nav-mega-link-desc">{it.desc}</span> : null}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </nav>
  )
}

