const OPTIMIZED_IMAGE_EXTENSIONS = /\.(png|jpe?g)$/i
const CDN_BASE_URL = 'https://cdn.jsdelivr.net/gh/sandyxiexiaoshan-sudo/sandyxiexiaoshan-sudo.github.io@main'
const CDN_ELIGIBLE_PATHS = ['/cases/', '/resume/', '/optimized/', '/webp/']

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

export function cdnImagePath(src: string): string {
  if (!src.startsWith('/') || !CDN_ELIGIBLE_PATHS.some((path) => src.startsWith(path))) {
    return src
  }

  return encodeURI(`${CDN_BASE_URL}${src}`)
}

export function preloadImage(src: string): void {
  if (typeof window === 'undefined') return

  const image = new Image()
  image.decoding = 'async'
  image.src = cdnImagePath(src)
}

export function optimizedImagePath(src: string): string {
  if (!OPTIMIZED_IMAGE_EXTENSIONS.test(src) || src.startsWith('/optimized/')) {
    return src
  }

  return `/optimized${src.replace(OPTIMIZED_IMAGE_EXTENSIONS, '.jpg')}`
}

export function caseMediaDimensions(slug: string, slideId: string, fallback?: ImageDimensions): ImageDimensions {
  return SPECIAL_CASE_DIMENSIONS[`${slug}/${slideId}`] ?? fallback ?? DEFAULT_WIDE_DIMENSIONS
}
