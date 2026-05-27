import { Link } from 'react-router-dom'

type ProjectCardProps = {
  slug: string
  title: string
  subtitle: string
  year: string
  coverImage: string
}

export function ProjectCard({ slug, title, subtitle, year, coverImage }: ProjectCardProps) {
  return (
    <article className="group">
      <Link to={`/works/${slug}`} className="block text-white">
        <div className="mb-2 flex items-center justify-between gap-3 text-xs text-white">
          <h3 className="min-w-0 truncate font-medium tracking-[-0.03em]">{title}</h3>
          <div className="flex shrink-0 items-center gap-2">
            <span className="max-w-[160px] truncate rounded-[1px] bg-white px-2 py-0.5 text-[10px] font-medium text-black">
              {subtitle}
            </span>
            <span className="rounded-[1px] bg-white px-2 py-0.5 text-[10px] font-medium text-black">
              {year}
            </span>
          </div>
        </div>
        <div className="relative aspect-video overflow-hidden bg-white/5">
          <img
            src={coverImage}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 ease-out will-change-transform group-hover:scale-[1.02]"
            loading="lazy"
            onError={(e) => {
              const t = e.currentTarget
              t.style.display = 'none'
              t.parentElement?.classList.add('bg-white/10')
            }}
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100">
            <span className="rounded-md bg-black/60 px-5 py-3 text-sm font-medium text-white shadow-lg">
              View project
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
