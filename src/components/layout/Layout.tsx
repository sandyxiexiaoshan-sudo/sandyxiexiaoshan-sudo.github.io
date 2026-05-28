import { Outlet, useLocation } from 'react-router-dom'
import { CustomCursor } from './CustomCursor'
import { Header } from './Header'
import { Footer } from './Footer'
import { PageTransition } from './PageTransition'

export function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="marketing-page min-h-screen">
      <Header />
      <main className={isHome ? undefined : 'pt-[50px]'}>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <CustomCursor />
    </div>
  )
}
