import type { CaseStudy } from '@/types/case'

export const autelHcjc: CaseStudy = {
  slug: 'autel-hcjc',
  title: '环车检测',
  subtitle: '智能车损检测平台',
  year: 'Project',
  coverImage: '/cases/autel-hcjc/00.png',
  slides: Array.from({ length: 8 }, (_, index) => {
    const id = String(index).padStart(2, '0')
    return {
      id,
      nodeId: `autel-hcjc:${id}`,
      title: `autel-hcjc ${id}`,
      imagePath:
        id === '02' ? '/cases/autel-hcjc/02-1.gif' : id === '07' ? '/cases/autel-hcjc/07.mp4' : undefined,
    }
  }),
}
