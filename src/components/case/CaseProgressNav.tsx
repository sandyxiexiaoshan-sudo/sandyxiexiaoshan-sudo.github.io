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
    document.getElementById(`slide-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <nav
        className="fixed right-4 top-1/2 z-40 hidden max-h-[70vh] -translate-y-1/2 flex-col gap-1 overflow-y-auto rounded-lg border border-white/10 bg-black/60 p-2 backdrop-blur-md lg:flex"
        aria-label="章节导航"
      >
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => scrollTo(s.id)}
            title={`第 ${i + 1} 屏`}
            className={`h-2 w-2 rounded-full transition ${
              activeId === s.id
                ? 'scale-125 bg-[var(--color-accent)]'
                : 'bg-white/30 hover:bg-white/60'
            }`}
          />
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
