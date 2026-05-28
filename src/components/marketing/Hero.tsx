import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '@/data/site'
import { Reveal } from './Reveal'
import { MarketingNav } from './MarketingNav'

function renderParagraph(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-[var(--color-accent)]">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

export function Hero({ showBody = true }: { showBody?: boolean }) {
  const location = useLocation()
  const isContactHash = location.hash === '#contact'
  const navAnchorRef = useRef<HTMLDivElement>(null)
  const [navFixed, setNavFixed] = useState(false)

  useEffect(() => {
    const updateNavFixed = () => {
      const top = navAnchorRef.current?.getBoundingClientRect().top ?? 0
      setNavFixed(top <= 0)
    }

    updateNavFixed()
    window.addEventListener('scroll', updateNavFixed, { passive: true })
    window.addEventListener('resize', updateNavFixed)

    return () => {
      window.removeEventListener('scroll', updateNavFixed)
      window.removeEventListener('resize', updateNavFixed)
    }
  }, [])

  const navClassName = navFixed
    ? 'fixed left-1/2 top-0 z-50 w-[calc(100%-1.5rem)] max-w-[1818px] -translate-x-1/2 bg-black/55 py-3 backdrop-blur-md sm:w-[calc(100%-2.5rem)] md:w-[calc(100%-4rem)]'
    : 'relative z-50 mt-5 py-3'

  return (
    <section className="relative mx-auto flex max-w-[1882px] flex-col px-3 pt-4 sm:px-5 md:px-8">
      <Reveal className="[container-type:inline-size]" direction="down" duration={1.1}>
        <h1 className="flex w-full select-none justify-between whitespace-nowrap text-[19cqw] font-black leading-[0.78] tracking-[-0.022em] text-white uppercase">
          {'Sandy Xie'.split('').map((char, index) => (
            <span key={`${char}-${index}`} className={char === ' ' ? 'w-[0.18em]' : undefined}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
      </Reveal>

      {!isContactHash && (
        <div ref={navAnchorRef} className={navFixed ? 'mt-5 h-[50px]' : undefined}>
          <div className={navClassName}>
            <Reveal delay={0.55}>
              <MarketingNav />
            </Reveal>
          </div>
        </div>
      )}

      {showBody && <HeroBodyContent delay={0.55} />}
    </section>
  )
}

function HeroBodyContent({ delay = 0 }: { delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="grid pt-[160px] pb-[160px] md:grid-cols-2 md:gap-x-4">
        <div className="w-full pr-[150px] text-left text-[20px] leading-snug text-white/85 md:col-start-2">
          <div className="space-y-2">
            {site.hero.paragraphs.map((p, i) => (
              <p key={i}>{renderParagraph(p)}</p>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

function HeroBody() {
  return (
    <div className="mx-auto w-full max-w-[1882px] px-3 sm:px-5 md:px-8">
      <HeroBodyContent delay={0.55} />
    </div>
  )
}

Hero.Body = HeroBody
