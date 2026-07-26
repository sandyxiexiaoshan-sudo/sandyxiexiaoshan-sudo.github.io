import { useState } from 'react'
import type { CaseSlide as CaseSlideType } from '@/types/case'
import { slideImagePath } from '@/data/cases'
import { optimizedImagePath } from '@/utils/media'

type CaseSlideProps = {
  slug: string
  slide: CaseSlideType
  index: number
  projectTitle: string
}

export function CaseSlide({ slug, slide, index, projectTitle }: CaseSlideProps) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const src = slide.imagePath ?? slideImagePath(slug, slide.id)
  const isVideo = /\.(mp4|webm|mov)$/i.test(src)
  const imageSrc = isVideo ? src : optimizedImagePath(src)
  const shouldLoadEagerly = index < 2

  const slideLabel = `${projectTitle} · ${String(index + 1).padStart(2, '0')}`

  return (
    <section
      id={`slide-${slide.id}`}
      className="scroll-mt-20 snap-start px-4 py-6 md:px-8 md:py-10"
      aria-label={slideLabel}
    >
      <div className="mx-auto max-w-[1600px]">
        <div
          id={`slide-image-${slide.id}`}
          className="relative overflow-hidden rounded-lg border border-white/10 bg-[var(--color-card-bg)] shadow-2xl"
        >
          {!failed ? (
            isVideo ? (
              <video
                src={src}
                className={`block h-auto w-full transition-opacity duration-300 ${
                  loaded ? 'opacity-100' : 'opacity-0'
                }`}
                autoPlay
                loop
                muted
                playsInline
                preload={shouldLoadEagerly ? 'metadata' : 'none'}
                onLoadedData={() => setLoaded(true)}
                onError={() => setFailed(true)}
              />
            ) : (
              <img
                src={imageSrc}
                alt={slideLabel}
                className={`block h-auto w-full transition-opacity duration-300 ${
                  loaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading={shouldLoadEagerly ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={shouldLoadEagerly ? 'high' : 'low'}
                onLoad={() => setLoaded(true)}
                onError={(e) => {
                  const t = e.currentTarget

                  if (t.src !== new URL(src, window.location.href).href) {
                    t.src = src
                    return
                  }

                  setFailed(true)
                }}
              />
            )
          ) : null}
          {(!loaded || failed) && (
            <div className="absolute inset-0 flex min-h-[320px] flex-col items-center justify-center gap-3 bg-[var(--color-card-bg)] p-8 text-center">
              <p className="text-sm text-[var(--color-text-muted)]">
                {failed ? '运行 npm run sync:figma 导出画板图片' : '加载中…'}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
