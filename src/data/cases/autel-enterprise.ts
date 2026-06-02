import type { CaseStudy } from '@/types/case'

export const autelEnterprise: CaseStudy = {
  slug: 'autel-enterprise',
  title: 'Autel Enterprise',
  subtitle: '遥控器移动端飞行操控软件',
  year: '2025',
  coverImage: '/cases/autel-enterprise/00.png',
  productLink: 'https://www.autelrobotics.cn/productdetail/evo-max-4t/',
  slides: Array.from({ length: 23 }, (_, index) => {
    const id = String(index).padStart(2, '0')
    return {
      id,
      nodeId: `autel-enterprise:${id}`,
      title: `Autel Enterprise ${id}`,
    }
  }),
}
