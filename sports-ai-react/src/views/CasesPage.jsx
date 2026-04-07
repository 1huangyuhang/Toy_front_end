import SiteLayout from '../components/SiteLayout.jsx'

export default function CasesPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-to-br from-primary/90 to-secondary/90 py-[90px] text-center text-white md:py-[110px]" data-animate="fade-up">
        <div className="container">
          <h1 className="text-[36px] font-bold md:text-[48px]">成功案例</h1>
          <p className="mx-auto mt-4 max-w-[820px] text-white/90 md:text-[20px]">
            探索体育加AI如何帮助全球体育产业实现数字化转型，提升运营效率和商业价值
          </p>
          <a href="#cases" className="btn mt-8">
            查看案例
          </a>
        </div>
      </section>

      <section className="bg-graybg py-[90px] md:py-[110px]" id="cases">
        <div className="container">
          <div className="text-center" data-animate="fade-up">
            <h2 className="text-[28px] font-bold text-dark md:text-[36px]">我们的成功案例</h2>
            <p className="mx-auto mt-4 max-w-[820px] text-[16px] text-text-light md:text-[18px]">
              从专业运动队到大型体育场馆，我们的AI解决方案已经帮助众多客户实现了数字化转型
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-7 shadow-card" data-animate="fade-up">
              <h3 className="text-[20px] font-bold text-primary md:text-[24px]">英超足球俱乐部智能训练系统</h3>
              <p className="mt-3 text-text-light">
                  为某英超俱乐部提供智能训练系统，通过AI分析球员训练数据，制定个性化训练方案，显著提升了球员体能和技术水平，减少了运动损伤。
              </p>
            </div>
            <div className="rounded-2xl bg-white p-7 shadow-card" data-animate="fade-up" data-anim-delay="120">
              <h3 className="text-[20px] font-bold text-primary md:text-[24px]">大型体育场馆智能管理系统</h3>
              <p className="mt-3 text-text-light">
                为某大型体育场馆提供智能管理系统，通过AI优化票务管理、资源配置和观众服务，提升了场馆利用率和观众体验。
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}

