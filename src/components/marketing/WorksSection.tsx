import { projects } from '@/data/site'
import { ProjectCard } from './ProjectCard'
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
  const content = (
    <section className={`mx-auto max-w-[1882px] px-3 pb-20 pt-0 sm:px-5 md:px-8 md:pb-28 md:pt-0 ${className}`}>
      {showTitle && <h2 className="section-label mb-8">Selected works</h2>}
      <div className="grid gap-x-4 gap-y-10 md:grid-cols-2 md:gap-x-5">
        {projects.map((p) => (
          <ProjectCard key={p.slug} {...p} />
        ))}
      </div>
    </section>
  )

  return reveal ? <Reveal>{content}</Reveal> : content
}
