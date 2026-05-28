import type { MouseEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { site } from '@/data/site'

type MarketingNavProps = {
  className?: string
  onNavigate?: () => void
}

const navLinkClass = 'w-fit rounded-full border border-white/15 px-4 py-1.5 text-white/85 transition hover:border-white/40 hover:text-white'

export function MarketingNav({ className, onNavigate }: MarketingNavProps) {
  const location = useLocation()
  const navigate = useNavigate()

  const replayHome = (event: MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname !== '/') return

    event.preventDefault()
    navigate('/', { replace: true, state: { replay: Date.now() } })
    onNavigate?.()
  }

  const scrollToContact = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    if (location.pathname !== '/') {
      window.sessionStorage.setItem('contactNavigationMode', 'jump')
      navigate('/#contact')
      onNavigate?.()
      return
    }

    const target = document.getElementById('contact')
    if (!target) return

    const headerOffset = 50
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset
    window.scrollTo({ top, behavior: 'smooth' })
    window.history.replaceState(null, '', '/#contact')
    onNavigate?.()
  }

  return (
    <nav className={['flex items-center justify-between text-xs text-white sm:text-[15px]', className].filter(Boolean).join(' ')}>
      {site.nav.map((item) =>
        item.href === '#contact' ? (
          <a key={item.label} href="/#contact" className={navLinkClass} onClick={scrollToContact}>
            {item.label}
          </a>
        ) : (
          <Link
            key={item.label}
            to={item.href}
            className={navLinkClass}
            onClick={item.href === '/' ? replayHome : onNavigate}
          >
            {item.label}
          </Link>
        ),
      )}
    </nav>
  )
}
