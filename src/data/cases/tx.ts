import type { CaseStudy } from '@/types/case'

export const tx: CaseStudy = {
  slug: 'tx',
  title: '腾讯魔方工作室宣传图',
  subtitle: '品牌宣传视觉',
  year: '2015',
  coverImage: '/cases/tx/00.png',
  slides: ['00.png', '01.png', '02.png'].map((fileName, index) => ({
    id: String(index).padStart(2, '0'),
    nodeId: `tx:${index}`,
    title: `腾讯魔方工作室宣传图 ${String(index + 1).padStart(2, '0')}`,
    imagePath: `/cases/tx/${fileName}`,
  })),
}
