import { motion } from 'framer-motion'
import { Hero } from '@/components/marketing/Hero'
import { WorksSection } from '@/components/marketing/WorksSection'
import { AboutSummary, WhatIDo, WorkExperience } from '@/components/marketing/AboutSections'
import { ContactSection } from '@/components/marketing/ContactSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function HomePage() {
  const reduced = useReducedMotion()

  return (
    <>
      <Hero showBody={false} />
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.62, ease: [0.19, 1, 0.22, 1] }}
      >
        <Hero.Body />
        <WorksSection reveal={false} />
        <AboutSummary />
        <WhatIDo />
        <WorkExperience />
        <ContactSection />
      </motion.div>
    </>
  )
}
