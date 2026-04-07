import SiteLayout from '../components/layout/SiteLayout.jsx'

export default function AboutPage() {
  const timeline = [
    {
      year: '2026',
      items: ['发布新一代“体育数字资产”协同平台', '将 AI 训练洞察覆盖到更多运动项目与场景'],
    },
    {
      year: '2024',
      items: ['推出智能训练与伤病风险预警解决方案', '与多家场馆完成票务与运营系统集成'],
    },
    {
      year: '2022',
      items: ['完成核心算法与数据中台建设', '建立多模态视频/传感器数据处理链路'],
    },
    {
      year: '2020',
      items: ['团队成立，聚焦体育产业数字化', '启动首批俱乐部与场馆试点项目'],
    },
  ]

  const offices = [
    { city: '杭州', addr: '滨江区 · 数字产业园', tag: '总部' },
    { city: '上海', addr: '浦东新区 · 张江', tag: '研发中心' },
    { city: '深圳', addr: '南山区 · 科技园', tag: '合作中心' },
    { city: '伦敦', addr: 'City of London', tag: '海外' },
  ]

  return (
    <SiteLayout>
      <section className="bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 py-[96px] text-white md:py-[120px]">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] font-semibold tracking-wide text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                关于我们
              </div>
              <h1 className="mt-5 text-[40px] font-extrabold leading-tight md:text-[56px]">
                打造体育产业的 <span className="text-sky-300">AI 增长引擎</span>
              </h1>
              <p className="mt-5 max-w-[720px] text-[16px] leading-relaxed text-white/75 md:text-[18px]">
                体育加AI成立于2020年，专注体育产业数字化转型。我们将视频与传感器数据、训练方法论与业务流程整合到一套可扩展的平台中，让训练更科学、赛事更可控、运营更高效。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a className="btn btn-primary" href="/contact">
                  联系我们
                </a>
                <a className="btn" href="#timeline">
                  了解历程
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-4 rounded-3xl border border-white/10 bg-white/5 p-6">
                {[
                  { k: '成立', v: '2020' },
                  { k: '覆盖', v: '训练 / 赛事 / 场馆' },
                  { k: '交付', v: '企业级项目' },
                  { k: '目标', v: '可持续增长' },
                ].map((s) => (
                  <div key={s.k} className="rounded-2xl bg-white/5 p-4">
                    <div className="text-[12px] font-semibold text-white/60">{s.k}</div>
                    <div className="mt-2 text-[16px] font-bold text-white md:text-[18px]">{s.v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-3xl border border-white/10 bg-gradient-to-br from-sky-500/15 to-indigo-500/10 p-6">
                <div className="text-sm font-semibold text-white/80">我们的理念</div>
                <div className="mt-2 text-[18px] font-bold leading-snug">
                  让 AI 成为每一次决策的“第二大脑”
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-white/70">
                  以可观测的数据、可落地的流程与可扩展的平台能力，持续提升训练质量与运营效率。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-[90px] md:py-[110px]">
        <div className="container">
          <div className="mx-auto max-w-[820px] text-center">
            <h2 className="text-[30px] font-extrabold text-slate-900 md:text-[40px]">价值主张</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-slate-600 md:text-[18px]">
              我们以工程化的 AI 能力与行业理解，帮助客户在真实业务中获得稳定收益。
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: '可信数据',
                desc: '统一采集、清洗与指标体系，保证结果可复现、可解释。',
              },
              {
                title: '以人为本',
                desc: '围绕教练、运营与管理角色设计工作流，降低使用门槛。',
              },
              {
                title: '开放协同',
                desc: '可与现有业务系统集成，支持多团队、多部门协作交付。',
              },
              {
                title: '持续创新',
                desc: '以可观测与反馈闭环驱动迭代，让能力随业务共同成长。',
              },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-[18px] font-bold text-slate-900">{c.title}</div>
                <div className="mt-3 text-[14px] leading-relaxed text-slate-600">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="timeline" className="bg-slate-50 py-[90px] md:py-[110px]">
        <div className="container">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-[30px] font-extrabold text-slate-900 md:text-[40px]">发展历程</h2>
              <p className="mt-3 text-[16px] text-slate-600 md:text-[18px]">用里程碑记录每一次能力升级。</p>
            </div>
          </div>

          <div className="mt-10 grid gap-6">
            {timeline.map((t) => (
              <div key={t.year} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <div className="text-[22px] font-extrabold text-slate-900">{t.year}</div>
                  <div className="text-[12px] font-semibold text-slate-500">Milestone</div>
                </div>
                <ul className="mt-4 grid gap-2 text-[14px] leading-relaxed text-slate-700 md:text-[15px]">
                  {t.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-[90px] md:py-[110px]">
        <div className="container">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-[30px] font-extrabold text-slate-900 md:text-[40px]">办公地点</h2>
              <p className="mt-3 text-[16px] text-slate-600 md:text-[18px]">以全球化协作方式服务客户。</p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {offices.map((o) => (
              <div key={o.city} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="text-[18px] font-bold text-slate-900">{o.city}</div>
                  <div className="rounded-full bg-slate-900 px-2.5 py-1 text-[12px] font-semibold text-white">{o.tag}</div>
                </div>
                <div className="mt-3 text-[14px] leading-relaxed text-slate-600">{o.addr}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-50 to-indigo-50 p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-[22px] font-extrabold text-slate-900">想进一步了解我们如何落地？</div>
                <div className="mt-2 text-[14px] text-slate-600 md:text-[15px]">
                  告诉我们你的业务目标，我们会给出可执行的方案与落地路径。
                </div>
              </div>
              <a className="btn btn-primary" href="/contact">
                预约沟通
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}

