import { NavLink } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'

export default function SiteNav() {
  const { user, loading, logout } = useAuth()
  return (
    <nav aria-label="主导航">
      <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <li>
          <NavLink className={({ isActive }) => `font-medium transition hover:text-primary ${isActive ? 'text-primary' : 'text-text'}`} to="/" end>
            首页
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => `font-medium transition hover:text-primary ${isActive ? 'text-primary' : 'text-text'}`} to="/#solutions">
            解决方案
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => `font-medium transition hover:text-primary ${isActive ? 'text-primary' : 'text-text'}`} to="/cases">
            案例
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => `font-medium transition hover:text-primary ${isActive ? 'text-primary' : 'text-text'}`} to="/about">
            关于我们
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => `font-medium transition hover:text-primary ${isActive ? 'text-primary' : 'text-text'}`} to="/contact">
            联系我们
          </NavLink>
        </li>
        {!loading && !user ? (
          <>
            <li>
              <NavLink className={({ isActive }) => `font-semibold transition hover:text-primary ${isActive ? 'text-primary' : 'text-text'}`} to="/login">
                登录
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => `font-semibold transition hover:text-primary ${isActive ? 'text-primary' : 'text-text'}`} to="/register">
                注册
              </NavLink>
            </li>
          </>
        ) : null}
        {!loading && user ? (
          <li>
            <button
              type="button"
              className="font-semibold text-text transition hover:text-primary"
              onClick={logout}
              title={user.email}
            >
              退出
            </button>
          </li>
        ) : null}
      </ul>
    </nav>
  )
}

