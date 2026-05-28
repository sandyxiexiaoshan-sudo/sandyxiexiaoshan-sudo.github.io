import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import type { CaseStudy } from '@/types/case'
import { projects } from '@/data/site'
import { CaseSlide } from './CaseSlide'
import { CaseProgressNav } from './CaseProgressNav'
import { NextWork } from './NextWork'
import { caseStudyList } from '@/data/cases'

type CaseDeckProps = {
  study: CaseStudy
}

export function CaseDeck({ study }: CaseDeckProps) {
  const [activeId, setActiveId] = useState(study.slides[0]?.id ?? '')
  const currentIndex = caseStudyList.findIndex((item) => item.slug === study.slug)
  const cardSubtitle = projects.find((project) => project.slug === study.slug)?.subtitle ?? study.subtitle
  const nextStudy = caseStudyList[(currentIndex + 1) % caseStudyList.length] ?? caseStudyList[0]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    setActiveId(study.slides[0]?.id ?? '')
  }, [study.slug, study.slides])

  useEffect(() => {
    const ids = study.slides.map((s) => s.id)
    const observers: IntersectionObserver[] = []

    ids.forEach((id) => {
      const el = document.getElementById(`slide-${id}`)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id)
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [study.slides])

  return (
    <div className="pb-24">
      <div className="mx-auto max-w-[1600px] px-4 pt-8 md:px-8">
        <Link
          to="/works"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] transition hover:text-[var(--color-accent)]"
        >
          <ArrowLeft size={16} /> 返回作品集
        </Link>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {study.title}
        </h1>
        <p className="mt-2 text-[var(--color-text-muted)]">{cardSubtitle}</p>
      </div>

      <div className="mt-8 snap-y snap-proximity">
        {study.slides.map((slide, index) => (
          <CaseSlide
            key={slide.id}
            slug={study.slug}
            slide={slide}
            index={index}
            projectTitle={study.title}
          />
        ))}
      </div>

      <NextWork nextStudy={nextStudy} />

      <CaseProgressNav slides={study.slides} activeId={activeId} />

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="回到顶部"
        className="fixed bottom-4 right-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white/80 backdrop-blur transition hover:border-white/35 hover:bg-white hover:text-black"
      >
        <ArrowLeft size={18} className="rotate-90" />
      </button>
    </div>
  )
}
