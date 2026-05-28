import { Reveal } from './Reveal'
import { useCopyEmail } from '@/hooks/useCopyEmail'
import { site } from '@/data/site'

export function ContactSection() {
  const { copied, copy } = useCopyEmail()

  return (
    <section id="contact" className="mx-auto max-w-[1882px] border-t border-white/15 px-3 py-24 sm:px-5 md:px-8">
      <div className="ml-auto max-w-[909px]">
        <Reveal>
          <h2 className="text-3xl font-medium tracking-tight text-white md:text-4xl">
            Ready to work together?
          </h2>
          <p className="mt-4 max-w-xl text-lg marketing-muted">
            欢迎就自由职业项目、合作机会或全职岗位与我联系。
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={`mailto:${site.email}`}
            className="text-xl font-medium text-[var(--color-accent)] underline-offset-4 hover:underline md:text-2xl"
          >
            {site.email}
          </a>
          <button type="button" onClick={copy} className="btn-secondary w-fit px-5 py-2.5">
            {copied ? 'Copied' : 'Copy Email'}
          </button>
          <a href={site.resumePdfPath} download="sandy-resume.pdf" className="btn-primary w-fit px-5 py-2.5">
            下载简历
          </a>
        </Reveal>
      </div>
    </section>
  )
}
