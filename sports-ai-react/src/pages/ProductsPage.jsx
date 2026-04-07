import SiteLayout from '../components/layout/SiteLayout.jsx'

const SECTIONS = [
  {
    id: 'training',
    title: '智能训练系统',
    desc: '采集训练数据、视频与传感器信息，自动生成训练负荷、动作质量与个性化建议，形成“计划-执行-评估-优化”的闭环。',
    items: ['实时负荷监测与预警', '动作识别与技术纠错', '个性化训练处方', '训练效果追踪'],
  },
  {
    id: 'injury',
    title: '伤病风险预警',
    desc: '融合训练负荷、体测、历史伤病与赛程强度，预测风险区间，辅助队医与教练做出更稳健的决策。',
    items: ['风险评分与趋势', '关键因素解释', '训练强度建议', '人群分层管理'],
  },
  {
    id: 'recovery',
    title: '体能评估与恢复',
    desc: '围绕体能、疲劳与恢复，构建可视化指标体系，支持恢复流程协同与效果评估。',
    items: ['体测指标面板', '疲劳与睡眠管理', '恢复计划编排', '恢复效果对比'],
  },
  {
    id: 'match',
    title: '赛事分析平台',
    desc: '从比赛视频与事件数据中提取关键指标，支持实时与赛后分析，快速产出战术洞察与复盘报告。',
    items: ['攻防指标与趋势', '关键事件回看', '对手画像与预测', '自动化报告生成'],
  },
  {
    id: 'tactics',
    title: '战术洞察与复盘',
    desc: '把战术从“经验描述”变成“可量化结构”，帮助教练组高效对齐共识并迭代策略。',
    items: ['阵型与空间占位', '推进链路分析', '压迫与反击识别', '战术对比复盘'],
  },
  {
    id: 'player',
    title: '球员表现画像',
    desc: '围绕位置职责与比赛场景，输出球员能力画像与成长曲线，服务选材、训练与转会决策。',
    items: ['位置职责模型', '能力雷达与对比', '成长曲线追踪', '关键场景表现'],
  },
  {
    id: 'venue',
    title: '智能场馆管理',
    desc: '覆盖票务、客流、资源与服务运营，提升利用率与观众体验。',
    items: ['客流预测与调度', '资源排班优化', '服务触点分析', '运营指标看板'],
  },
  {
    id: 'ticket',
    title: '票务与入场',
    desc: '统一票务、闸机、核验与风控，降低拥堵与风险。',
    items: ['票务策略与分层', '核验与异常识别', '入场动线优化', '黑产风控'],
  },
  {
    id: 'security',
    title: '安防与应急',
    desc: '基于视频智能与事件联动，提升安防效率与应急响应。',
    items: ['重点区域监测', '异常行为识别', '预案联动', '应急演练评估'],
  },
]

export default function ProductsPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-to-br from-primary/90 to-secondary/90 py-[90px] text-center text-white md:py-[110px]" data-animate="fade-up">
        <div className="container">
          <h1 className="text-[36px] font-bold md:text-[48px]">公司产品</h1>
          <p className="mx-auto mt-4 max-w-[820px] text-white/90 md:text-[20px]">
            面向训练、赛事与场馆运营的产品矩阵，支持模块化组合与快速落地
          </p>
          <a href="#training" className="btn mt-8">
            浏览产品
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

