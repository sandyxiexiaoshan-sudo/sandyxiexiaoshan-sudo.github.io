import type { projects } from '@/data/site'
import { ProjectCard } from './ProjectCard'

type Project = (typeof projects)[number]

type FeaturedWorksCylinderProps = {
  projects: readonly Project[]
}

export function FeaturedWorksCylinder({ projects }: FeaturedWorksCylinderProps) {
  const featuredProjects = projects.slice(0, 6)

  return (
    <div className="grid gap-x-[1.333rem] gap-y-[3.333rem] md:grid-cols-2">
      {featuredProjects.map((project) => (
        <ProjectCard
          key={project.slug}
          slug={project.slug}
          title={project.title}
          subtitle={project.subtitle}
          year={project.year}
          coverImage={project.coverImage}
        />
      ))}
    </div>
  )
}
