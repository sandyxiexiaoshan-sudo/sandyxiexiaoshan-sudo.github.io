import { projects } from '@/data/site'
import { FeaturedWorksCylinder } from './FeaturedWorksCylinder'
import { Reveal } from './Reveal'

export function WorksSection({
  showTitle = true,
  className = '',
  reveal = true,
}: {
  showTitle?: boolean
  className?: string
  reveal?: boolean
}) {
  const featuredProjects = projects.slice(0, 6)

  const content = (
    <section className={`mx-auto max-w-[1882px] px-3 pb-16 pt-0 sm:px-5 md:px-8 md:pb-20 md:pt-0 ${className}`}>
      {showTitle && <h2 className="section-label mb-16">Selected works</h2>}
      <FeaturedWorksCylinder projects={featuredProjects} />
    </section>
  )

  return reveal ? <Reveal>{content}</Reveal> : content
}
