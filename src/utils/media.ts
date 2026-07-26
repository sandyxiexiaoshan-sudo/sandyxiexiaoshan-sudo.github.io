const OPTIMIZED_IMAGE_EXTENSIONS = /\.(png|jpe?g)$/i

export function optimizedImagePath(src: string): string {
  if (!OPTIMIZED_IMAGE_EXTENSIONS.test(src) || src.startsWith('/optimized/')) {
    return src
  }

  return `/optimized${src.replace(OPTIMIZED_IMAGE_EXTENSIONS, '.jpg')}`
}
