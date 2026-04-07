import SiteLayout from '../components/SiteLayout.jsx'

export default function AboutPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-to-br from-primary/90 to-secondary/90 py-[90px] text-center text-white md:py-[110px]" data-animate="fade-up">
        <div className="container">
          <h1 className="text-[36px] font-bold md:text-[48px]">关于我们</h1>
          <p className="mx-auto mt-4 max-w-[820px] text-white/90 md:text-[20px]">
            体育加AI是一家专注于体育产业数字化转型的科技公司，致力于通过AI技术为体育产业提供智能解决方案
          </p>
          <a href="#about" className="btn mt-8">
            了解更多
          </a>
        </div>
      </section>

      <section className="bg-white py-[90px] md:py-[110px]" id="about">
        <div className="container">
          <div className="text-center" data-animate="fade-up">
            <h2 className="text-[28px] font-bold text-dark md:text-[36px]">公司简介</h2>
            <p className="mx-auto mt-4 max-w-[820px] text-[16px] text-text-light md:text-[18px]">
              体育加AI成立于2020年，是一家专注于体育产业数字化转型的科技公司
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-[980px] rounded-2xl bg-graybg p-8" data-animate="fade-up">
            <h3 className="text-[20px] font-bold text-primary md:text-[24px]">我们的使命</h3>
            <p className="mt-3 text-text-light">
              通过人工智能技术，赋能体育产业，推动体育产业数字化转型，为全球体育产业提供智能解决方案，助力体育产业实现可持续发展。
            </p>
            <h3 className="mt-8 text-[20px] font-bold text-primary md:text-[24px]">我们的愿景</h3>
            <p className="mt-3 text-text-light">
              成为全球领先的体育产业AI解决方案提供商，通过技术创新，为体育产业创造更大的价值。
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}

