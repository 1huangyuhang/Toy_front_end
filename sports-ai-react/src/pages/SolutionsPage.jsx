import SiteLayout from '../components/layout/SiteLayout.jsx'

const SECTIONS = [
  {
    id: 'academy',
    title: '青训数据化',
    desc: '从选材、训练到比赛评估，建立统一的成长档案与指标体系。',
    items: ['成长档案与能力模型', '训练计划与负荷管理', '比赛表现评估', '人才对比与推荐'],
  },
  {
    id: 'proteam',
    title: '一线队训练闭环',
    desc: '把训练与比赛联动起来，形成可持续迭代的训练闭环。',
    items: ['训练-比赛关联分析', '战术训练目标对齐', '数据驱动调整', '周/月度复盘报告'],
  },
  {
    id: 'medical',
    title: '医疗康复协同',
    desc: '队医、体能与教练多角色协作，提升康复效率与复出质量。',
    items: ['伤病与负荷联合分析', '康复流程协同', '复出评估与门槛', '风险控制与预案'],
  },
  {
    id: 'venueops',
    title: '智慧场馆运营',
    desc: '覆盖票务、客流、资源与服务触点，提升运营效率与体验。',
    items: ['客流预测与排班', '票务策略与分层', '服务质量与评价', '运营指标看板'],
  },
  {
    id: 'matchops',
    title: '赛事数据服务',
    desc: '为赛事组织与转播团队提供稳定的数据采集、分析与分发能力。',
    items: ['实时数据采集', '指标体系与可视化', '数据分发与 API', '赞助权益数据'],
  },
  {
    id: 'broadcast',
    title: '转播与内容生产',
    desc: '用AI提升内容生产效率，支持短视频与直播运营。',
    items: ['关键镜头自动剪辑', '高光集锦生成', '解说辅助与字幕', '内容标签与检索'],
  },
  {
    id: 'fan',
    title: '球迷互动与会员',
    desc: '以会员体系为核心，提升留存与互动，支持多渠道运营。',
    items: ['会员分层与权益', '互动任务与积分', '活动与票务联动', '数据分析与增长'],
  },
  {
    id: 'sponsor',
    title: '赞助与权益评估',
    desc: '把曝光与互动量化，帮助商业团队更好地评估与优化权益。',
    items: ['曝光与触达估算', '权益执行追踪', 'ROI 评估报告', '权益组合建议'],
  },
  {
    id: 'marketing',
    title: '数据驱动营销',
    desc: '打通内容、渠道与转化路径，持续优化投放与运营。',
    items: ['人群洞察与分群', '渠道投放归因', '自动化运营触达', '增长实验与迭代'],
  },
]

export default function SolutionsPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-to-br from-primary/90 to-secondary/90 py-[90px] text-center text-white md:py-[110px]" data-animate="fade-up">
        <div className="container">
          <h1 className="text-[36px] font-bold md:text-[48px]">解决方案</h1>
          <p className="mx-auto mt-4 max-w-[820px] text-white/90 md:text-[20px]">
            面向俱乐部、场馆与商业增长的整体解决方案，按业务目标组合落地
          </p>
          <a href="#academy" className="btn mt-8">
            浏览方案
          </a>
        </div>
      </section>

      <section className="bg-graybg py-[90px] md:py-[110px]">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SECTIONS.map((s, idx) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-2xl bg-white p-7 shadow-card transition hover:-translate-y-1"
                data-animate="fade-up"
                data-anim-delay={idx * 70}
              >
                <div className="text-[20px] font-bold text-primary md:text-[22px]">{s.title}</div>
                <div className="mt-3 text-text-light">{s.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-[90px] md:py-[110px]">
        <div className="container">
          <div className="space-y-12">
            {SECTIONS.map((s, idx) => (
              <div key={s.id} id={s.id} className="rounded-2xl bg-graybg p-8 md:p-10" data-animate="fade-up" data-anim-delay={idx * 60}>
                <h2 className="text-[22px] font-bold text-dark md:text-[28px]">{s.title}</h2>
                <p className="mt-3 max-w-[980px] text-text-light">{s.desc}</p>
                <ul className="mt-5 grid grid-cols-1 gap-3 text-text-light md:grid-cols-2">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span className="font-bold text-secondary">✓</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}

