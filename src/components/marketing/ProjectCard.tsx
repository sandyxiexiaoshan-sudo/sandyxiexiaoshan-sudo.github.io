import { Link } from 'react-router-dom'
import { optimizedImagePath } from '@/utils/media'

type ProjectCardProps = {
  slug: string
  title: string
  subtitle: string
  year: string
  coverImage: string
  priority?: boolean
}

export function ProjectCard({ slug, title, subtitle, year, coverImage, priority = false }: ProjectCardProps) {
  const optimizedCoverImage = optimizedImagePath(coverImage)

  return (
    <article className="group">
      <Link to={`/works/${slug}`} className="block text-white" data-cursor="view">
        <div className="mb-2 flex items-center justify-between gap-3 text-xs text-white">
          <h3 className="min-w-0 truncate font-medium tracking-[-0.03em]">{title}</h3>
          <div className="flex shrink-0 items-center gap-2">
            <span className="max-w-[160px] truncate rounded-[1px] bg-white/25 px-2 py-0.5 text-xs font-medium text-white/70">
              {subtitle}
            </span>
            <span className="rounded-[1px] bg-white/25 px-2 py-0.5 text-xs font-medium text-white/70">
              {year}
            </span>
          </div>
        </div>
        <div className="relative aspect-video overflow-hidden bg-white/5">
          <img
            src={optimizedCoverImage}
            alt={title}
            className={`h-full w-full object-cover transition-transform duration-300 ease-out will-change-transform group-hover:scale-[1.066] ${
              slug === 'web' ? 'object-top' : ''
            }`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'low'}
            onError={(e) => {
              const t = e.currentTarget

              if (t.src !== new URL(coverImage, window.location.href).href) {
                t.src = coverImage
                return
              }

              t.style.display = 'none'
              t.parentElement?.classList.add('bg-white/10')
            }}
          />
        </div>
      </Link>
    </article>
  )
}
