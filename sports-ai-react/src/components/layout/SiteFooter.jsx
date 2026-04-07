import { Link } from 'react-router-dom'

export default function SiteFooter() {
  return (
    <footer className="bg-dark py-14 text-white">
      <div className="container grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="mb-5 text-[20px] font-bold">体育加AI</h3>
          <p className="mb-3 text-white/75">为全球体育产业提供智能解决方案，助力体育产业数字化转型。</p>
          <p className="mb-3 text-white/75">邮箱：contact@sportsai.com</p>
          <p className="mb-3 text-white/75">电话：400-123-4567</p>
        </div>
        <div>
          <h3 className="mb-5 text-[20px] font-bold">解决方案</h3>
          <ul className="space-y-2">
            {['智能训练系统', '赛事分析平台', '智能场馆管理', '数字营销解决方案', '智能裁判辅助系统', '球迷互动平台'].map((t) => (
              <li key={t}>
                <Link className="text-white/75 transition hover:text-white" to="/#solutions">
                  {t}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-5 text-[20px] font-bold">关于我们</h3>
          <ul className="space-y-2">
            <li>
              <Link className="text-white/75 transition hover:text-white" to="/about#about">
                公司简介
              </Link>
            </li>
            <li>
              <Link className="text-white/75 transition hover:text-white" to="/about">
                团队介绍
              </Link>
            </li>
            <li>
              <Link className="text-white/75 transition hover:text-white" to="/about">
                合作伙伴
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-5 text-[20px] font-bold">联系我们</h3>
          <ul className="space-y-2">
            {['在线咨询', '意见反馈', '服务支持'].map((t) => (
              <li key={t}>
                <Link className="text-white/75 transition hover:text-white" to="/contact">
                  {t}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container mt-10 pt-5 text-center text-white/70">
        <div className="mx-auto mb-5 h-px max-w-[720px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <p>&copy; 2026 体育加AI. 保留所有权利.</p>
      </div>
    </footer>
  )
}

