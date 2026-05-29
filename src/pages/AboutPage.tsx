import { AboutSummary, SoftwareTools, WhatIDo, WorkExperience } from '@/components/marketing/AboutSections'
import { ContactSection } from '@/components/marketing/ContactSection'

export function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-[1882px] px-3 pt-16 sm:px-5 md:px-8">
        <h1 className="hero-title">Info</h1>
        <p className="mt-4 max-w-xl text-lg marketing-muted">关于我、能力与经历</p>
      </section>
      <AboutSummary showTopBorder={false} className="mt-[70px]" />
      <WhatIDo />
      <SoftwareTools />
      <WorkExperience />
      <ContactSection />
    </>
  )
}
