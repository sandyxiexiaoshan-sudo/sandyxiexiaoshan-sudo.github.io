import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import type { CaseStudy } from '@/types/case'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type NextWorkProps = {
  nextStudy: CaseStudy
}

export function NextWork({ nextStudy }: NextWorkProps) {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 92%', 'center 70%'],
  })
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 32,
    mass: 0.42,
  })
  const visualProgress = useTransform(smoothProgress, (value) => {
    if (value >= 0.985) return 1
    if (value <= 0.015) return 0
    return value
  })
  const opacity = useTransform(visualProgress, [0, 1], [0, 1])
  const y = useTransform(visualProgress, [0, 1], [120, 0])
  const rotateX = useTransform(visualProgress, [0, 1], [-30, 0])
  const scale = useTransform(visualProgress, [0, 1], [0.96, 1])

  return (
    <section ref={sectionRef} className="mx-auto max-w-[1882px] px-3 pb-8 pt-32 sm:px-5 md:px-8 md:pt-44">
      <Link to={`/works/${nextStudy.slug}`} className="group block text-white">
        <div className="mx-auto w-[422px] max-w-full [perspective:1200px]">
          <motion.div
            style={reduced ? undefined : { opacity, y, rotateX, scale }}
            className="origin-bottom [transform-style:preserve-3d] will-change-transform"
          >
            <div className="mb-4 text-center text-xs text-white [backface-visibility:hidden]">
              <span className="section-label">Next work</span>
              <h2 className="mt-2 text-2xl font-medium tracking-[-0.04em] text-white md:text-3xl">
                {nextStudy.title}
              </h2>
            </div>

            <div className="group/thumb relative aspect-video w-full overflow-hidden bg-white/5 [backface-visibility:hidden]">
              <img
                src={nextStudy.coverImage}
                alt={nextStudy.title}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/thumb:scale-[1.02]"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover/thumb:opacity-100">
                <span className="rounded-md border border-white/15 bg-black/45 px-5 py-3 text-sm font-medium text-white shadow-lg backdrop-blur-md">
                  View project
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </Link>
    </section>
  )
}
