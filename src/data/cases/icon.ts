import type { CaseStudy } from '@/types/case'

export const icon: CaseStudy = {
  slug: 'icon',
  title: '图标',
  subtitle: '图标设计作品',
  year: '2013',
  coverImage: '/cases/icon/00.jpg',
  slides: ['00.jpg', '01.jpg', '02.jpg', '03.jpg'].map((fileName, index) => ({
    id: String(index).padStart(2, '0'),
    nodeId: `icon:${index}`,
    title: `图标 ${String(index + 1).padStart(2, '0')}`,
    imagePath: `/cases/icon/${fileName}`,
  })),
}
