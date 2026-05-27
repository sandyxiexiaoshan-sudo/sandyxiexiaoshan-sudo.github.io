import type { CaseStudy } from '@/types/case'

export const smileToU: CaseStudy = {
  slug: 'Smile to u',
  title: '麦图花艺',
  subtitle: '',
  year: 'Project',
  coverImage: '/cases/Smile to u/00.png',
  slides: Array.from({ length: 20 }, (_, index) => {
    const id = String(index).padStart(2, '0')
    return {
      id,
      nodeId: `smile-to-u:${id}`,
      title: `Smile to u ${id}`,
      ...(id === '05' ? { width: 1800, height: 1800 } : {}),
    }
  }),
}
