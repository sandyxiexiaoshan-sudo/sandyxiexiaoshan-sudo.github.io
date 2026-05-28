import type { CaseStudy } from '@/types/case'

export const chahua: CaseStudy = {
  slug: 'chahua',
  title: '插画',
  subtitle: '视觉插画作品',
  year: '2013',
  coverImage: '/cases/chahua/00.jpg',
  slides: ['00.jpg', '01.jpg', '02.jpg'].map((fileName, index) => ({
    id: String(index).padStart(2, '0'),
    nodeId: `chahua:${index}`,
    title: `插画 ${String(index + 1).padStart(2, '0')}`,
    imagePath: `/cases/chahua/${fileName}`,
  })),
}
