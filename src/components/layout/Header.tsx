import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { site } from '@/data/site'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const reduced = useReducedMotion()

  if (location.pathname === '/') {
    return null
  }

  const linkClass = (href: string) => {
    const active =
      href === '/'
        ? location.pathname === '/'
        : href !== '#contact' && location.pathname.startsWith(href)
    return [
      'w-fit rounded-full border px-3 py-1 text-[10px] transition sm:text-xs',
      active
        ? 'border-[var(--color-accent)] text-[var(--color-accent)]'
        : 'border-white/15 text-white/85 hover:border-white/40 hover:text-white',
    ].join(' ')
  }

  return (
    <header className="fixed left-1/2 top-0 z-50 w-[calc(100%-1.5rem)] max-w-[1818px] -translate-x-1/2 bg-black/55 py-3 backdrop-blur-md sm:w-[calc(100%-2.5rem)] md:w-[calc(100%-4rem)]">
      <div>
        <nav className="hidden items-center justify-between text-white md:flex">
          {site.nav.map((item) =>
            item.href === '#contact' ? (
              <a
                key={item.label}
                href="/#contact"
                className={linkClass(item.href)}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className={linkClass(item.href)}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center justify-between md:hidden">
          <Link to="/" className="text-sm font-medium tracking-tight text-white">
            {site.name}
          </Link>
          <button
            type="button"
            className="text-white"
            onClick={() => setOpen(!open)}
            aria-label="菜单"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-black/90 md:hidden"
          >
            <nav className="flex flex-col gap-4 px-5 py-4">
              {site.nav.map((item) =>
                item.href === '#contact' ? (
                  <a
                    key={item.label}
                    href="/#contact"
                    className={linkClass(item.href)}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={linkClass(item.href)}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
