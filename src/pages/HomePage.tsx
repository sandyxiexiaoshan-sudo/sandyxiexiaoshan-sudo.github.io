import { ArrowLeft } from 'lucide-react'
import { Hero } from '@/components/marketing/Hero'
import { WorksSection } from '@/components/marketing/WorksSection'
import { Reveal } from '@/components/marketing/Reveal'
import { AboutSummary, SoftwareTools, WhatIDo, WorkExperience } from '@/components/marketing/AboutSections'
import { ContactSection } from '@/components/marketing/ContactSection'

export function HomePage() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Hero showBody={false} />
      <Reveal delay={0.55}>
        <Hero.Body reveal={false} />
        <WorksSection reveal={false} />
      </Reveal>
      <AboutSummary />
      <WhatIDo />
      <SoftwareTools />
      <WorkExperience />
      <ContactSection />
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="回到顶部"
        className="fixed bottom-4 right-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white/80 backdrop-blur transition hover:border-white/35 hover:bg-white hover:text-black"
      >
        <ArrowLeft size={18} className="rotate-90" />
      </button>
    </>
  )
}
