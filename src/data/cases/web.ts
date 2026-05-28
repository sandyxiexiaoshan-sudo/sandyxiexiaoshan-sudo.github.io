import type { CaseStudy } from '@/types/case'

export const web: CaseStudy = {
  slug: 'web',
  title: '网页设计',
  subtitle: '网页视觉设计',
  year: '2013',
  coverImage: '/cases/web/00.jpeg',
  slides: ['00.jpeg', '01.jpeg', '02.jpeg', '03.jpeg'].map((fileName, index) => ({
    id: String(index).padStart(2, '0'),
    nodeId: `web:${index}`,
    title: `网页设计 ${String(index + 1).padStart(2, '0')}`,
    imagePath: `/cases/web/${fileName}`,
  })),
}
