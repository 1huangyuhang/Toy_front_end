import SiteLayout from '../components/SiteLayout.jsx'
import VideoSection from '../components/VideoSection.jsx'

export default function HomePage() {
  return (
    <SiteLayout>
      <section
        id="home"
        data-animate="fade-up"
        className="bg-gradient-to-br from-primary/90 to-secondary/90 py-[90px] text-center text-white md:py-[110px]"
      >
        <div className="container">
          <h1 className="text-[36px] font-bold leading-tight md:text-[48px]">体育加AI - 智能赋能体育产业</h1>
          <p className="mx-auto mt-4 max-w-[820px] text-[16px] text-white/90 md:mt-5 md:text-[20px]">
            为全球体育产业提供专属解决方案，从训练到赛事，从管理到营销，赋能体育全链路，助力解决训练效率、赛事分析、球迷互动、商业变现等问题，提高体育产业竞争力和吸引力。
          </p>
          <a href="#solutions" className="btn mt-8">
            了解解决方案
          </a>
        </div>
      </section>

      <section id="solutions" className="bg-graybg py-[90px] md:py-[110px]">
        <div className="container">
          <div className="text-center" data-animate="fade-up">
            <h2 className="text-[28px] font-bold text-dark md:text-[36px]">智能解决方案</h2>
            <p className="mx-auto mt-4 max-w-[820px] text-[16px] text-text-light md:text-[18px]">
              基于人工智能技术，为体育产业提供全方位的智能解决方案，助力体育产业数字化转型
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div
              className="rounded-2xl bg-white p-8 shadow-card transition hover:-translate-y-1"
              data-animate="fade-up"
              data-anim-delay="0"
            >
              <h3 className="text-[20px] font-bold text-primary md:text-[24px]">智能训练系统</h3>
              <p className="mt-3 text-text-light">
                利用AI技术分析运动员训练数据，提供个性化训练方案，优化训练效果，减少运动损伤。
              </p>
              <ul className="mt-4 space-y-2 text-text-light">
                {['实时数据分析与反馈', '个性化训练计划制定', '运动损伤风险预测', '训练效果评估与优化'].map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="font-bold text-secondary">✓</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-2xl bg-white p-8 shadow-card transition hover:-translate-y-1"
              data-animate="fade-up"
              data-anim-delay="90"
            >
              <h3 className="text-[20px] font-bold text-primary md:text-[24px]">赛事分析平台</h3>
              <p className="mt-3 text-text-light">
                通过AI技术对赛事数据进行深度分析，为教练和球队提供战术建议，提高比赛胜率。
              </p>
              <ul className="mt-4 space-y-2 text-text-light">
                {['实时赛事数据采集与分析', '对手战术分析与预测', '球员表现评估与对比', '战术建议与优化'].map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="font-bold text-secondary">✓</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-2xl bg-white p-8 shadow-card transition hover:-translate-y-1"
              data-animate="fade-up"
              data-anim-delay="180"
            >
              <h3 className="text-[20px] font-bold text-primary md:text-[24px]">智能场馆管理</h3>
              <p className="mt-3 text-text-light">利用AI技术优化场馆运营管理，提高场馆利用率，提升观众体验。</p>
              <ul className="mt-4 space-y-2 text-text-light">
                {['智能票务管理与分析', '场馆资源优化配置', '观众行为分析与个性化服务', '安防监控与应急响应'].map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="font-bold text-secondary">✓</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <VideoSection />
    </SiteLayout>
  )
}

