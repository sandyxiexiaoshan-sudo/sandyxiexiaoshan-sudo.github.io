import type { CaseStudy } from '@/types/case'

export const autelMdgl: CaseStudy = {
  slug: 'autel-mdgl',
  title: '门店管理',
  subtitle: '',
  year: 'Project',
  coverImage: '/cases/autel-mdgl/00.png',
  slides: Array.from({ length: 12 }, (_, index) => {
    const id = String(index).padStart(2, '0')
    return {
      id,
      nodeId: `autel-mdgl:${id}`,
      title: `autel-mdgl ${id}`,
    }
  }),
}
