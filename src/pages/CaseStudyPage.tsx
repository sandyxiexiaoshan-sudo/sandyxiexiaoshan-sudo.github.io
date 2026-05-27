import { Navigate, useParams } from 'react-router-dom'
import { getCaseStudy } from '@/data/cases'
import { CaseDeck } from '@/components/case/CaseDeck'

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const study = slug ? getCaseStudy(slug) : undefined

  if (!study) {
    return <Navigate to="/works" replace />
  }

  return <CaseDeck study={study} />
}
