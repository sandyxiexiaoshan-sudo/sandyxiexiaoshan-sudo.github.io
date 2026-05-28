import { Hero } from '@/components/marketing/Hero'
import { WorksSection } from '@/components/marketing/WorksSection'
import { AboutSummary, WhatIDo, WorkExperience } from '@/components/marketing/AboutSections'
import { ContactSection } from '@/components/marketing/ContactSection'

export function HomePage() {
  return (
    <>
      <Hero showBody={false} />
      <Hero.Body />
      <WorksSection reveal={false} />
      <AboutSummary />
      <WhatIDo />
      <WorkExperience />
      <ContactSection />
    </>
  )
}
