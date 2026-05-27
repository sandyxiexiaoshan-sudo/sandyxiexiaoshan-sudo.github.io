#!/usr/bin/env node
/**
 * Export Figma frames to public/ via Figma REST Images API.
 *
 * Usage:
 *   FIGMA_ACCESS_TOKEN=xxx npm run sync:figma
 *
 * Get token: Figma → Settings → Personal access tokens
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const manifest = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'manifest.json'), 'utf8'),
)

const token = process.env.FIGMA_ACCESS_TOKEN
if (!token) {
  console.error(
    'Missing FIGMA_ACCESS_TOKEN.\n' +
      'Set env and re-run: FIGMA_ACCESS_TOKEN=xxx npm run sync:figma\n' +
      'Or export PNGs from Figma manually into public/cases/{slug}/{id}.png',
  )
  process.exit(1)
}

const fileKey = manifest.fileKey
const allNodes = []

for (const c of manifest.cases) {
  for (const s of c.slides) {
    allNodes.push({ out: `cases/${c.slug}/${s.id}.png`, nodeId: s.nodeId })
  }
}
for (const a of manifest.assets || []) {
  allNodes.push({ out: a.path, nodeId: a.nodeId })
}

async function fetchImageUrls(ids) {
  const param = ids.map((id) => encodeURIComponent(id)).join(',')
  const url = `https://api.figma.com/v1/images/${fileKey}?ids=${param}&format=png&scale=2`
  const res = await fetch(url, {
    headers: { 'X-Figma-Token': token },
  })
  if (!res.ok) {
    throw new Error(`Figma API ${res.status}: ${await res.text()}`)
  }
  const json = await res.json()
  if (json.err) throw new Error(json.err)
  return json.images
}

async function download(url, dest) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Download failed ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.writeFileSync(dest, buf)
}

const BATCH = 10
for (let i = 0; i < allNodes.length; i += BATCH) {
  const batch = allNodes.slice(i, i + BATCH)
  const ids = batch.map((b) => b.nodeId)
  console.log(`Fetching batch ${i / BATCH + 1} (${ids.length} nodes)…`)
  const images = await fetchImageUrls(ids)
  for (const item of batch) {
    const imageUrl = images[item.nodeId]
    if (!imageUrl) {
      console.warn(`  skip ${item.out} — no URL`)
      continue
    }
    const dest = path.join(root, 'public', item.out)
    if (fs.existsSync(dest)) {
      console.log(`  exists ${item.out}`)
      continue
    }
    await download(imageUrl, dest)
    console.log(`  saved ${item.out}`)
  }
}

console.log('Done.')
