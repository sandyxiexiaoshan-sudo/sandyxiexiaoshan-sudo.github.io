import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { site } from '@/data/site'
import { MarketingNav } from '@/components/marketing/MarketingNav'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { pathname, hash } = location
  const reduced = useReducedMotion()

  if (pathname === '/' && hash !== '#contact') {
    return null
  }

  return (
    <header className="fixed left-1/2 top-0 z-50 w-[calc(100%-1.5rem)] max-w-[1818px] -translate-x-1/2 bg-black/55 py-3 backdrop-blur-md sm:w-[calc(100%-2.5rem)] md:w-[calc(100%-4rem)]">
      <div>
        <MarketingNav className="hidden md:flex" />

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
            <MarketingNav className="flex-col items-start gap-4 px-5 py-4" onNavigate={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
