import type { CaseStudy } from '@/types/case'

export const autelWxal: CaseStudy = {
  slug: 'autel-wxal',
  title: 'Autel-维修案例',
  subtitle: '',
  year: 'Project',
  coverImage: '/cases/autel-wxal/00.png',
  slides: Array.from({ length: 5 }, (_, index) => {
    const id = String(index).padStart(2, '0')
    return {
      id,
      nodeId: `autel-wxal:${id}`,
      title: `autel-wxal ${id}`,
      ...(id === '03' ? { width: 1920, height: 1564 } : {}),
    }
  }),
}
