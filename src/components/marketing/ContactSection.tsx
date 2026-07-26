import { Reveal } from './Reveal'

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-[1882px] border-t border-white/15 px-3 py-24 sm:px-5 md:px-8">
      <div className="grid gap-8 md:grid-cols-2 md:gap-x-4">
        <Reveal>
          <h2 className="section-label">Contact</h2>
        </Reveal>
        <div>
          <Reveal>
            <h2 className="text-3xl font-medium tracking-tight text-white md:text-4xl">
              Ready to work together?
            </h2>
            <p className="mt-4 max-w-xl text-lg marketing-muted">
              欢迎就自由职业项目、合作机会或全职岗位与我联系。
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-10">
            <div className="flex w-fit flex-col gap-4">
              <div className="w-[168px] overflow-hidden bg-white p-2">
                <img
                  src="/resume/weixin.png"
                  alt="微信二维码"
                  className="aspect-square w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const image = e.currentTarget
                    image.style.display = 'none'
                    image.parentElement?.classList.add('bg-white/10')
                    image.parentElement?.setAttribute('aria-label', '请将微信二维码图片放到 public/resume/weixin.png')
                  }}
                />
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  )
}
