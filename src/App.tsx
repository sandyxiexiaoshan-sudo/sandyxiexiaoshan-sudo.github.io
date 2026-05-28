import { lazy, Suspense, useEffect, useLayoutEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { AboutPage } from '@/pages/AboutPage'
import { WorksPage } from '@/pages/WorksPage'
import { ResumePage } from '@/pages/ResumePage'

const CaseStudyPage = lazy(() =>
  import('@/pages/CaseStudyPage').then((m) => ({ default: m.CaseStudyPage })),
)

function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-[var(--color-text-muted)]">
      加载中…
    </div>
  )
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useLayoutEffect(() => {
    if (hash === '#contact') {
      const scrollToContact = () => {
        const target = document.getElementById('contact')
        if (!target) return

        const headerOffset = 50
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset
        const shouldJump = window.sessionStorage.getItem('contactNavigationMode') === 'jump'
        window.sessionStorage.removeItem('contactNavigationMode')
        window.scrollTo({ top, left: 0, behavior: shouldJump ? 'instant' : 'smooth' })
      }

      scrollToContact()
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="works" element={<WorksPage />} />
          <Route
            path="works/:slug"
            element={
              <Suspense fallback={<PageLoader />}>
                <CaseStudyPage />
              </Suspense>
            }
          />
          <Route path="resume" element={<ResumePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
