const OPTIMIZED_IMAGE_EXTENSIONS = /\.(png|jpe?g)$/i
const CASE_IMAGE_PATH = /^\/cases\/(.+)\.(png|jpe?g)$/i
const RESPONSIVE_IMAGE_WIDTHS = [900, 1400, 1800] as const

type ImageDimensions = {
  width: number
  height: number
}

const DEFAULT_WIDE_DIMENSIONS: ImageDimensions = { width: 1800, height: 1012 }

const SPECIAL_CASE_DIMENSIONS: Record<string, ImageDimensions> = {
  'Smile to u/05': { width: 1800, height: 1800 },
  'autel-mapper/05': { width: 1773, height: 1800 },
  'autel-mapper/06': { width: 1800, height: 1334 },
  'autel-mapper/10': { width: 1800, height: 1530 },
  'autel-wxal/03': { width: 1800, height: 1466 },
  'tx/00': { width: 1800, height: 1013 },
  'tx/01': { width: 1800, height: 1013 },
  'tx/02': { width: 1800, height: 1011 },
  'web/00': { width: 928, height: 1800 },
  'web/01': { width: 1106, height: 1800 },
  'web/04': { width: 716, height: 1800 },
  'web/05': { width: 1800, height: 1775 },
}

function caseImageStem(src: string): string | undefined {
  return src.match(CASE_IMAGE_PATH)?.[1]
}

export function optimizedImagePath(src: string): string {
  const stem = caseImageStem(src)

  if (stem) {
    return `/optimized/cases/${stem}.jpg`
  }

  if (!OPTIMIZED_IMAGE_EXTENSIONS.test(src) || src.startsWith('/optimized/')) {
    return src
  }

  return `/optimized${src.replace(OPTIMIZED_IMAGE_EXTENSIONS, '.jpg')}`
}

export function thumbnailImagePath(src: string): string {
  const stem = caseImageStem(src)
  return stem ? `/thumbs/cases/${stem}.jpg` : optimizedImagePath(src)
}

export function responsiveImageSrcSet(src: string): string | undefined {
  const stem = caseImageStem(src)

  if (!stem) {
    return undefined
  }

  return RESPONSIVE_IMAGE_WIDTHS.map((width) => `/responsive/cases/${stem}-${width}.jpg ${width}w`).join(', ')
}

export function caseMediaDimensions(slug: string, slideId: string, fallback?: ImageDimensions): ImageDimensions {
  return SPECIAL_CASE_DIMENSIONS[`${slug}/${slideId}`] ?? fallback ?? DEFAULT_WIDE_DIMENSIONS
}
