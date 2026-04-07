import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SiteLayout from '../components/SiteLayout.jsx'
import { useAuth } from '../auth/AuthContext.jsx'

export default function RegisterPage() {
  const { register } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await register({ email, password })
      nav('/')
    } catch (e2) {
      setError(e2?.message || '注册失败')
    } finally {
      setBusy(false)
    }
  }

  return (
    <SiteLayout>
      <section className="py-[90px] pb-[110px] bg-gradient-to-b from-blue-600/10 to-sky-500/5" data-animate="fade-up">
        <div className="container">
          <div className="mx-auto max-w-[520px] rounded-2xl bg-white p-8 shadow-card">
            <h1 className="mb-1 text-[28px] font-bold text-dark">注册</h1>
            <p className="mb-5 text-text-light">创建账号后即可绑定用户并上传素材。</p>
            <form onSubmit={onSubmit} className="grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-text-light">邮箱</span>
                <input className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-text-light">密码（至少 6 位）</span>
                <input className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required minLength={6} />
              </label>
              <button className="btn btn-primary w-full" type="submit" disabled={busy}>
                {busy ? '注册中…' : '注册'}
              </button>
              {error ? <div className="rounded-xl bg-accent/10 px-3 py-2 text-[13px] text-[#a3124d]">{error}</div> : null}
            </form>
            <div className="mt-4 text-text-light">
              已有账号？<Link to="/login">去登录</Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}

