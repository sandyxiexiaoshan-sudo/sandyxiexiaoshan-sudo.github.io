import { autelEnterprise } from './autel-enterprise'
import { autelHcjc } from './autel-hcjc'
import { autelMapper } from './autel-mapper'
import { autelMdgl } from './autel-mdgl'
import { autelWxal } from './autel-wxal'
import { smileToU } from './smile-to-u'
import type { CaseStudy } from '@/types/case'

export const caseStudies: Record<string, CaseStudy> = {
  'autel-enterprise': autelEnterprise,
  'autel-hcjc': autelHcjc,
  'autel-mapper': autelMapper,
  'autel-mdgl': autelMdgl,
  'autel-wxal': autelWxal,
  'Smile to u': smileToU,
}

export const caseStudyList: CaseStudy[] = [
  autelEnterprise,
  autelHcjc,
  autelMapper,
  autelMdgl,
  autelWxal,
  smileToU,
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug]
}

export function slideImagePath(slug: string, slideId: string): string {
  return `/cases/${slug}/${slideId}.png`
}
