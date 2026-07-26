import { useEffect, useRef, useState } from 'react'
import type { CaseSlide as CaseSlideType } from '@/types/case'
import { slideImagePath } from '@/data/cases'
import { caseMediaDimensions, cdnImagePath } from '@/utils/media'

type CaseSlideProps = {
  slug: string
  slide: CaseSlideType
  index: number
  projectTitle: string
}

export function CaseSlide({ slug, slide, index, projectTitle }: CaseSlideProps) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const [shouldRenderMedia, setShouldRenderMedia] = useState(index === 0)
  const sectionRef = useRef<HTMLElement>(null)
  const src = slide.imagePath ?? slideImagePath(slug, slide.id)
  const isVideo = /\.(mp4|webm|mov)$/i.test(src)
  const [imageSrc, setImageSrc] = useState(() => cdnImagePath(src))
  const shouldLoadEagerly = index === 0
  const fallbackDimensions = slide.width && slide.height ? { width: slide.width, height: slide.height } : undefined
  const dimensions = caseMediaDimensions(slug, slide.id, fallbackDimensions)
  const aspectRatio = `${dimensions.width} / ${dimensions.height}`

  useEffect(() => {
    if (index === 0 || shouldRenderMedia) return

    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        setShouldRenderMedia(true)
        observer.disconnect()
      },
      { rootMargin: '1600px 0px' },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [index, shouldRenderMedia])

  const slideLabel = `${projectTitle} · ${String(index + 1).padStart(2, '0')}`

  return (
    <section
      ref={sectionRef}
      id={`slide-${slide.id}`}
      className="scroll-mt-20 snap-start px-4 py-6 md:px-8 md:py-10"
      aria-label={slideLabel}
    >
      <div className="mx-auto max-w-[1600px]">
        <div
          id={`slide-image-${slide.id}`}
          style={{ aspectRatio }}
          className="relative overflow-hidden rounded-lg border border-white/10 bg-[var(--color-card-bg)] shadow-2xl [content-visibility:auto] [contain-intrinsic-size:900px]"
        >
          {shouldRenderMedia && !failed ? (
            isVideo ? (
              <video
                src={src}
                className={`block h-full w-full object-contain transition-opacity duration-300 ${
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
                width={dimensions.width}
                height={dimensions.height}
                className={`block h-full w-full object-contain transition-opacity duration-300 ${
                  loaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading={shouldLoadEagerly ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={shouldLoadEagerly ? 'high' : 'low'}
                onLoad={() => setLoaded(true)}
                onError={() => {
                  if (imageSrc !== src) {
                    setImageSrc(src)
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
