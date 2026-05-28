import { autelEnterprise } from './autel-enterprise'
import { autelHcjc } from './autel-hcjc'
import { autelMapper } from './autel-mapper'
import { autelMdgl } from './autel-mdgl'
import { autelWxal } from './autel-wxal'
import { chahua } from './chahua'
import { icon } from './icon'
import { smileToU } from './smile-to-u'
import { tx } from './tx'
import { web } from './web'
import type { CaseStudy } from '@/types/case'

export const caseStudies: Record<string, CaseStudy> = {
  'autel-enterprise': autelEnterprise,
  'autel-hcjc': autelHcjc,
  'autel-mapper': autelMapper,
  'autel-mdgl': autelMdgl,
  'autel-wxal': autelWxal,
  'Smile to u': smileToU,
  tx,
  web,
  chahua,
  icon,
}

export const caseStudyList: CaseStudy[] = [
  autelEnterprise,
  autelMapper,
  autelMdgl,
  autelHcjc,
  autelWxal,
  smileToU,
  web,
  chahua,
  icon,
  tx,
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug]
}

export function slideImagePath(slug: string, slideId: string): string {
  return `/cases/${slug}/${slideId}.png`
}
