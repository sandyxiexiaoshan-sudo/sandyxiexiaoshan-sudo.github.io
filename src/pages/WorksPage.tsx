import { WorksSection } from '@/components/marketing/WorksSection'
import { Reveal } from '@/components/marketing/Reveal'

export function WorksPage() {
  return (
    <>
      <section className="mx-auto max-w-[1882px] px-3 pt-16 sm:px-5 md:px-8">
        <Reveal>
          <h1 className="hero-title">Works</h1>
        </Reveal>
      </section>
      <WorksSection showTitle={false} className="mt-10" />
    </>
  )
}
