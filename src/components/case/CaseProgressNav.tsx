import { useEffect, useState } from 'react'
import type { CaseSlide } from '@/types/case'

type CaseProgressNavProps = {
  slides: CaseSlide[]
  activeId: string
}

export function CaseProgressNav({ slides, activeId }: CaseProgressNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [activeId])

  const scrollTo = (id: string) => {
    const target = document.getElementById(`slide-image-${id}`) ?? document.getElementById(`slide-${id}`)
    if (!target) return

    const fixedHeaderOffset = 236
    const top = target.getBoundingClientRect().top + window.scrollY - fixedHeaderOffset
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className="fixed right-4 top-1/2 z-40 hidden max-h-[70vh] -translate-y-1/2 flex-col gap-2 overflow-y-auto rounded-lg border border-white/10 bg-black/60 p-2 backdrop-blur-md lg:flex"
        aria-label="章节导航"
      >
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => scrollTo(s.id)}
            title={`第 ${i + 1} 屏`}
            className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-medium leading-none transition ${
              activeId === s.id
                ? 'scale-125 bg-[var(--color-accent)] text-black'
                : 'bg-white/30 text-white/80 hover:bg-white/60 hover:text-black'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </nav>

      <div className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 gap-2 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-full border border-white/20 bg-black/70 px-4 py-2 text-xs text-white backdrop-blur"
        >
          第 {slides.findIndex((s) => s.id === activeId) + 1} / {slides.length} 屏
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-x-4 bottom-16 z-50 max-h-48 overflow-y-auto rounded-xl border border-white/10 bg-black/90 p-3 backdrop-blur lg:hidden">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollTo(s.id)}
              className={`block w-full rounded px-2 py-2 text-left text-xs ${
                activeId === s.id
                  ? 'bg-[var(--color-accent)]/20 text-[var(--color-accent)]'
                  : 'text-[var(--color-text-muted)]'
              }`}
            >
              第 {i + 1} 屏
            </button>
          ))}
        </div>
      )}
    </>
  )
}
