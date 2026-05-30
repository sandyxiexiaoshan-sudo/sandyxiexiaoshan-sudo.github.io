import { Check, Copy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { site, projects } from '@/data/site'
import { resume } from '@/data/resume'
import { useCopyEmail } from '@/hooks/useCopyEmail'
import { Reveal } from './Reveal'

const personalDetails = [
  { label: '姓名', value: '谢小珊' },
  { label: '年龄', value: '38' },
  { label: '学历', value: '本科' },
  { label: '婚育', value: '已婚已育' },
  { label: '居住地', value: '深圳' },
  { label: '政治面貌', value: '党员' },
  { label: '邮箱', value: 'sandyxiexiaoshan@gmail.com' },
  { label: '电话', value: '13510104003' },
]

export function AboutSummary({
  showTopBorder = true,
  className = '',
}: {
  showTopBorder?: boolean
  className?: string
}) {
  const { copied, copy } = useCopyEmail()

  return (
    <section className={`mx-auto max-w-[1882px] px-3 py-16 sm:px-5 md:px-8 ${showTopBorder ? 'border-t border-white/15' : ''} ${className}`}>
      <div className="grid gap-8 md:grid-cols-2 md:gap-x-4">
        <Reveal>
          <h2 className="section-label">About me</h2>
        </Reveal>
        <div className="grid gap-x-10 gap-y-5 border-b border-white/15 pb-8 md:grid-cols-[minmax(0,1fr)_minmax(160px,1fr)]">
          {personalDetails.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.04}>
              <div className={item.label === '邮箱' ? 'md:col-span-2' : undefined}>
                <p className="text-sm uppercase tracking-[0.24em] text-white/35">{item.label}</p>
                <div className="mt-2 flex min-w-0 items-center gap-3">
                  <p className="min-w-0 break-words text-[20px] leading-snug text-white/85">{item.value}</p>
                  {item.label === '邮箱' && (
                    <button
                      type="button"
                      onClick={copy}
                      aria-label={copied ? '邮箱已复制' : '复制邮箱'}
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-white/35 hover:text-white"
                    >
                      {copied ? <Check size={15} /> : <Copy size={15} />}
                    </button>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={personalDetails.length * 0.04} className="mt-5 md:col-span-2">
            <a href={site.resumePdfPath} download="sandy-resume.pdf" className="btn-primary w-fit px-5 py-2.5">
              下载简历
            </a>
          </Reveal>
        </div>
      </div>
      <div className="mt-[30px] grid gap-8 md:grid-cols-2 md:gap-x-4">
        <div className="grid gap-6 md:col-start-2 md:grid-cols-[2fr_1fr] md:items-end md:gap-x-4">
          <Reveal delay={0.08}>
            <div className="aspect-[4/5] overflow-hidden bg-white/10">
              <img
                src="/resume/photo.png"
                alt="Sandy Xie portrait"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="aspect-[4/3] overflow-hidden bg-white/10 md:mt-56">
              <img
                src="/resume/photo2.png"
                alt="Selected design illustration"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </div>
      <div className="mt-[40px] grid gap-8 md:grid-cols-2 md:gap-x-4">
        <div className="grid grid-cols-3 gap-6 md:col-start-2 md:gap-12">
          {site.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <p className="text-5xl font-medium tracking-[-0.05em] text-white md:text-7xl">{s.value}</p>
              <p className="mt-2 text-sm text-white/55">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const softwareTools = [
  { name: 'Figma', icon: '/resume/00.png' },
  { name: 'Cursor', icon: '/resume/01.png' },
  { name: 'Github', icon: '/resume/02.png' },
  { name: 'Gemini', icon: '/resume/03.png' },
  { name: '豆包', icon: '/resume/04.png' },
  { name: 'Coze', icon: '/resume/05.png' },
  { name: '即梦', icon: '/resume/06.png' },
  { name: '可灵', icon: '/resume/07.png' },
  { name: 'Sketch', icon: '/resume/08.png' },
]

export function WhatIDo() {
  return (
    <section className="mx-auto max-w-[1882px] border-t border-white/15 px-3 py-20 sm:px-5 md:px-8">
      <div className="grid gap-8 md:grid-cols-2 md:gap-x-4">
        <Reveal>
          <h2 className="section-label">What i do</h2>
        </Reveal>
        <div className="flex flex-wrap gap-3">
          {site.services.map((s, i) => (
            <Reveal key={s} delay={i * 0.04}>
              <span
                className={
                  s === 'Vide Coding'
                    ? 'inline-flex rounded-full bg-white/10 px-5 py-2 text-[20px] font-semibold text-white shadow-[0_0_30px_rgba(255,255,255,0.12)]'
                    : 'inline-flex rounded-full bg-white/10 px-4 py-2 text-[20px] text-white/75'
                }
              >
                {s}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SoftwareTools() {
  return (
    <section className="mx-auto max-w-[1882px] border-t border-white/15 px-3 py-20 sm:px-5 md:px-8">
      <div className="grid gap-8 md:grid-cols-2 md:gap-x-4">
        <Reveal>
          <h2 className="section-label">Software & AI Tools</h2>
        </Reveal>
        <div className="grid grid-cols-3 gap-x-6 gap-y-8 sm:grid-cols-4 lg:grid-cols-6">
          {softwareTools.map((tool, i) => (
            <Reveal key={tool.name} delay={i * 0.035}>
              <div className="flex w-fit flex-col items-center gap-3 text-center">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-[18px] border border-white/10 bg-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.28)] backdrop-blur">
                  <img src={tool.icon} alt={`${tool.name} icon`} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <p className="text-sm text-white/60">{tool.name}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function WorkExperience() {
  return (
    <section className="mx-auto max-w-[1882px] border-t border-white/15 px-3 py-20 sm:px-5 md:px-8">
      <div className="grid gap-8 md:grid-cols-2 md:gap-x-4">
        <Reveal>
          <h2 className="section-label">Work experience</h2>
        </Reveal>
        <div className="space-y-0">
          {resume.experience.map((job, i) => (
            <Reveal key={job.period} delay={i * 0.05}>
              <div
                className={`grid gap-2 py-6 sm:grid-cols-[1fr_1fr_auto] sm:items-baseline ${
                  i === 0 ? '' : 'border-t border-white/15'
                }`}
              >
                <p className="text-xl font-medium tracking-[-0.03em] text-white md:text-2xl">{job.role}</p>
                <p className="text-sm text-white/55 md:text-base">{job.company}</p>
                <p className="text-sm text-white/55 md:text-base">{job.period}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function AboutCta() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-20 md:px-8">
      <Reveal className="flex flex-wrap gap-4">
        <Link to="/resume" className="btn-primary">
          下载 PDF 简历
        </Link>
        <Link to={`/works/${projects[0].slug}`} className="btn-secondary">
          查看完整案例
        </Link>
      </Reveal>
    </section>
  )
}
