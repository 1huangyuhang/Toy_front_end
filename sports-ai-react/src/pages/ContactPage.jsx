import SiteLayout from '../components/layout/SiteLayout.jsx'

export default function ContactPage() {
  function onSubmit(e) {
    e.preventDefault()
    alert('表单提交成功！我们会尽快与您联系。')
    e.target?.reset?.()
  }

  return (
    <SiteLayout>
      <section className="bg-gradient-to-br from-primary/90 to-secondary/90 py-[90px] text-center text-white md:py-[110px]" data-animate="fade-up">
        <div className="container">
          <h1 className="text-[36px] font-bold md:text-[48px]">联系我们</h1>
          <p className="mx-auto mt-4 max-w-[820px] text-white/90 md:text-[20px]">
            无论您有任何问题或需求，我们都随时准备为您提供专业的咨询和服务
          </p>
          <a href="#contact" className="btn mt-8">
            立即联系
          </a>
        </div>
      </section>

      <section className="bg-graybg py-[90px] md:py-[110px]" id="contact">
        <div className="container">
          <div className="text-center" data-animate="fade-up">
            <h2 className="text-[28px] font-bold text-dark md:text-[36px]">联系方式</h2>
            <p className="mx-auto mt-4 max-w-[820px] text-[16px] text-text-light md:text-[18px]">
              您可以通过以下方式联系我们，我们将在24小时内回复您
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-10" data-animate="fade-up">
            <div className="min-w-[280px] flex-1">
              <h3 className="text-[20px] font-bold text-primary md:text-[24px]">联系信息</h3>
              <p className="mt-3 text-text-light">北京市朝阳区科技园区88号体育加AI大厦</p>
              <p className="mt-2 text-text-light">contact@sportsai.com</p>
            </div>

            <div className="min-w-[280px] flex-[2]">
              <h3 className="text-[20px] font-bold text-primary md:text-[24px]">在线咨询</h3>
              <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-text-light">姓名</span>
                  <input className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm" type="text" placeholder="请输入您的姓名" required />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-text-light">邮箱</span>
                  <input className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm" type="email" placeholder="请输入您的邮箱" required />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-text-light">留言</span>
                  <textarea className="min-h-[150px] w-full resize-y rounded-xl border border-zinc-200 px-4 py-3 text-sm" placeholder="请描述您的需求" required />
                </label>
                <div>
                  <button className="btn btn-primary" type="submit">
                    提交
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}

