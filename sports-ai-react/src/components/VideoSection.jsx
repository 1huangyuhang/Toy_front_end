import { useMemo } from 'react'

function isMp4(url) {
  return /\.mp4(\?.*)?$/i.test(url)
}

export default function VideoSection({
  title = 'AI如何改变体育产业',
  description = '通过先进的人工智能技术，我们正在改变体育产业的各个方面，从训练到赛事，从管理到营销，为体育产业带来前所未有的机遇和挑战。',
  ctaText = '联系我们',
  ctaHref = '/contact',
  // 默认给一个稳定可播放的 MP4（避免第三方 iframe 在某些网络环境下无法播放）
  videoUrl = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  posterUrl = '',
}) {
  const useVideoTag = useMemo(() => isMp4(videoUrl), [videoUrl])
  const iframeUrl = useMemo(() => {
    try {
      const u = new URL(videoUrl)
      // 尝试开启 autoplay（第三方是否允许取决于平台策略）
      u.searchParams.set('autoplay', '1')
      u.searchParams.set('muted', '1')
      u.searchParams.set('playsinline', '1')
      return u.toString()
    } catch {
      return videoUrl
    }
  }, [videoUrl])

  return (
    <section className="bg-white py-[90px] md:py-[110px]" data-animate="fade-up">
      <div className="container flex flex-wrap items-center gap-10 md:gap-12">
        <div className="min-w-[300px] flex-1" data-animate="fade-up">
          <h2 className="text-[28px] font-bold text-dark md:text-[32px]">{title}</h2>
          <p className="mt-4 text-[16px] text-text-light md:text-[18px]">{description}</p>
          <a className="btn mt-8" href={ctaHref}>
            {ctaText}
          </a>
        </div>

        <div className="min-w-[300px] flex-1" data-animate="fade-up" data-anim-delay="120">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#0b1020] shadow-[0_10px_30px_rgba(0,0,0,0.12)]" aria-label="视频播放器">
            {useVideoTag ? (
              <video
                src={videoUrl}
                // 浏览器大多要求“静音”才能自动播放
                muted
                autoPlay
                playsInline
                loop
                controls
                poster={posterUrl || undefined}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <iframe
                src={iframeUrl}
                title="视频"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

