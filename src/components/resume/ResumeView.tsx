import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { resume } from '@/data/resume'
import { DownloadButton } from './DownloadButton'

function Tag({ children, highlight = false }: { children: string; highlight?: boolean }) {
  return (
    <span
      className={`rounded px-1.5 py-1 text-xs ${
        highlight
          ? 'border border-[rgba(0,168,255,0.15)] text-[var(--color-accent)]'
          : 'border border-[rgba(0,168,255,0.15)] text-[var(--color-text-label)]'
      } bg-[#0d1a2e]`}
    >
      {children}
    </span>
  )
}

export function ResumeView() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col lg:flex-row">
      <aside className="w-full shrink-0 border-b border-white/10 bg-sidebar-gradient lg:w-[270px] lg:border-r lg:border-b-0">
        <div className="border-b border-white/[0.06] px-8 py-7 text-center lg:px-6">
          <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full bg-[#0d1a2e]">
            <img
              src={resume.avatar}
              alt={resume.name}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
          <h1 className="text-xl font-semibold text-white">{resume.name}</h1>
          <p className="mt-1 text-[10px] tracking-[0.14em] text-[var(--color-accent)] uppercase">
            {resume.title}
          </p>
        </div>

        <div className="space-y-0 px-8 py-5 lg:px-[30px]">
          <SideBlock title="基本信息">
            <InfoRow label={resume.contact.phone} />
            <InfoRow label={resume.contact.email} />
            <InfoRow label={resume.contact.location} />
          </SideBlock>
          <SideBlock title="求职意向">
            {resume.jobIntent.map((j) => (
              <li key={j} className="flex items-start gap-2 text-[var(--color-text-primary)]">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-sm bg-[var(--color-accent)]" />
                <span className="text-base">{j}</span>
              </li>
            ))}
          </SideBlock>
          <SideBlock title="学历">
            <p className="font-semibold text-white">{resume.education}</p>
          </SideBlock>
          <SideBlock title="自我评价">
            <ul className="space-y-2">
              {resume.selfEvaluation.map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-[var(--color-text-primary)]">
                  <span className="mt-2 h-0.5 w-0.5 shrink-0 rounded-full bg-[var(--color-text-label)]" />
                  {t}
                </li>
              ))}
            </ul>
          </SideBlock>
        </div>
      </aside>

      <div className="min-w-0 flex-1 p-6 md:p-10">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-wide text-[var(--color-text-label)] uppercase">
              {resume.tagline}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white md:text-[28px]">
              专注智能硬件{' '}
              <span className="text-[var(--color-accent)]">用户体验设计</span>
            </h2>
          </div>
          <DownloadButton />
        </div>

        <div className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {resume.stats.map((s) => (
            <div
              key={s.label}
              className="rounded border border-[rgba(0,168,255,0.18)] bg-[rgba(0,168,255,0.08)] px-4 py-3 text-center"
            >
              <p className="text-lg font-semibold text-[var(--color-accent)]">{s.value}</p>
              <p className="text-[10px] text-[var(--color-text-label)]">{s.label}</p>
            </div>
          ))}
        </div>

        <SectionBar cn="专业技能" en="Skills" />
        <div className="mb-8 flex flex-col gap-6 md:flex-row">
          <div className="md:w-52">
            <h4 className="mb-2 text-sm text-[#878b94] tracking-wider">UX 全流程</h4>
            <div className="flex flex-wrap gap-1">
              {resume.skills.ux.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <h4 className="mb-2 mt-4 text-sm text-[#878b94] tracking-wider">智能硬件领域</h4>
            <div className="flex flex-wrap gap-1">
              {resume.skills.hardware.map((t) => (
                <Tag key={t} highlight>
                  {t}
                </Tag>
              ))}
            </div>
            <h4 className="mb-2 mt-4 text-sm text-[#878b94] tracking-wider">工具</h4>
            <div className="flex flex-wrap gap-1">
              {resume.skills.tools.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>

          <div className="min-w-0 flex-1 rounded border border-[rgba(0,168,255,0.15)] p-4 md:p-6">
            <SectionBar cn="最近项目经验" en="Recent Project Experience" />
            <div className="mt-4 space-y-4">
              {resume.projects.map((p) => (
                <div
                  key={p.title}
                  className="border-b border-[rgba(14,165,233,0.4)] border-l-[3px] border-l-[#0ea5e9] pb-4 pl-4 last:border-b-0"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
                      {p.title}
                    </h4>
                    {'link' in p && p.link && (
                      <Link
                        to={p.link}
                        className="inline-flex items-center gap-1 text-sm text-[#0ea5e9] hover:underline"
                      >
                        查看案例 <ExternalLink size={12} />
                      </Link>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-label)]">
                    {p.description}
                  </p>
                  {'highlights' in p && p.highlights && (
                    <p className="mt-1 text-sm text-[var(--color-text-label)]">{p.highlights}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <h3 className="mb-4 text-sm tracking-[0.18em] text-[var(--color-text-label)] uppercase">
          工作经历
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {resume.experience.map((job) => (
            <div
              key={job.period}
              className="rounded border-l-[3px] border-l-[var(--color-accent)] bg-[rgba(27,80,212,0.09)] px-4 py-3"
            >
              <p className="text-[10px] text-[#0ea5e9]">{job.period}</p>
              <p className="mt-1 font-semibold text-[var(--color-text-primary)]">{job.role}</p>
              <p className="text-xs text-[var(--color-text-label)]">{job.company}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SideBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-white/[0.06] py-4 last:border-b-0">
      <p className="mb-3 text-sm tracking-[0.18em] text-[var(--color-text-label)] uppercase">
        {title}
      </p>
      <div className="space-y-2 text-sm">{children}</div>
    </div>
  )
}

function InfoRow({ label }: { label: string }) {
  return <p className="text-lg text-[var(--color-text-primary)]">{label}</p>
}

function SectionBar({ cn, en }: { cn: string; en: string }) {
  return (
    <div className="mb-4 flex items-center gap-2 rounded bg-gradient-to-r from-[#1d4ed8] to-[#0369a1] px-3.5 py-1.5">
      <span className="text-[13px] font-semibold text-white">{cn}</span>
      <span className="font-mono text-sm tracking-wider text-white/55 uppercase">{en}</span>
    </div>
  )
}
