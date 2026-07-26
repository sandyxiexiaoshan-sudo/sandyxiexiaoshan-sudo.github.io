import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs'
import { relative, resolve, dirname, join, parse } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const sourceDir = resolve(root, process.env.IMAGE_SOURCE_DIR ?? 'public/cases')
const outputDir = resolve(root, process.env.WEBP_OUTPUT_DIR ?? 'public/webp/cases')
const quality = process.env.WEBP_QUALITY ?? '88'
const converter = process.env.WEBP_CONVERTER ?? 'cwebp'
const clearOutput = process.argv.includes('--clean')
const supportedExtensions = new Set(['.png', '.jpg', '.jpeg'])

function commandExists(command) {
  const versionArgs = command === 'sips' ? ['-h'] : ['-version']
  return spawnSync(command, versionArgs, { stdio: 'ignore' }).error === undefined
}

function collectImages(dir) {
  const images = []
  const entries = readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)

    if (entry.isDirectory()) {
      images.push(...collectImages(fullPath))
      continue
    }

    if (entry.isFile() && supportedExtensions.has(parse(entry.name).ext.toLowerCase())) {
      images.push(fullPath)
    }
  }

  return images
}

function run(command, args) {
  const result = spawnSync(command, args, { encoding: 'utf8' })

  if (result.status !== 0) {
    throw new Error(`${command} failed: ${result.stderr || result.stdout}`)
  }
}

function convertWithCwebp(input, output) {
  run('cwebp', ['-quiet', '-q', quality, '-metadata', 'none', input, '-o', output])
}

function convertWithSips(input, output) {
  run('sips', ['-s', 'format', 'webp', '-s', 'formatOptions', quality, input, '--out', output])
}

if (!existsSync(sourceDir)) {
  throw new Error(`Source directory does not exist: ${sourceDir}`)
}

if (clearOutput && existsSync(outputDir)) {
  rmSync(outputDir, { recursive: true, force: true })
}

mkdirSync(outputDir, { recursive: true })

const useCwebp = converter === 'cwebp'
const useSips = converter === 'sips'

if (!useCwebp && !useSips) {
  throw new Error('WEBP_CONVERTER must be either cwebp or sips.')
}

if (useCwebp && !commandExists('cwebp')) {
  throw new Error('cwebp is not installed. Install it with: brew install webp')
}

if (useSips && !commandExists('sips')) {
  throw new Error('sips is not available on this system. Use WEBP_CONVERTER=cwebp instead.')
}

const images = collectImages(sourceDir)
let converted = 0
let originalBytes = 0
let webpBytes = 0

for (const image of images) {
  const rel = relative(sourceDir, image)
  const parsed = parse(rel)
  const output = join(outputDir, parsed.dir, `${parsed.name}.webp`)
  mkdirSync(dirname(output), { recursive: true })

  if (useCwebp) {
    convertWithCwebp(image, output)
  } else {
    convertWithSips(image, output)
  }

  converted += 1
  originalBytes += statSync(image).size
  webpBytes += statSync(output).size
}

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`

console.log(`Converted ${converted} images to WebP using ${useCwebp ? 'cwebp' : 'sips'}.`)
console.log(`Source: ${relative(root, sourceDir)}`)
console.log(`Output: ${relative(root, outputDir)}`)
console.log(`Original total: ${mb(originalBytes)}`)
console.log(`WebP total: ${mb(webpBytes)}`)
