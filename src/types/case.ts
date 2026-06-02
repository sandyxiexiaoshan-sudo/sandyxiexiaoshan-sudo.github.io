export interface CaseSlide {
  id: string
  nodeId: string
  title: string
  imagePath?: string
  width?: number
  height?: number
}

export interface CaseStudy {
  slug: string
  title: string
  subtitle: string
  year: string
  coverImage: string
  productLink?: string
  slides: CaseSlide[]
}
