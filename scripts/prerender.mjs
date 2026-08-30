#!/usr/bin/env node
/**
 * Build-time per-route HTML.
 *
 * vercel.json rewrites every path to /index.html, so all ~19 public URLs ship
 * one identical <head>: one title, one description, one canonical, one og:url.
 * To a crawler that is fifty duplicates of the homepage.
 *
 * This runs after `vite build` and writes a real file per public route, each
 * with its own title, description, canonical, OG tags and robots directive.
 * Vercel serves a matching static file before it consults `rewrites`, so these
 * win; every other path (dynamic slugs, /account/*) still falls through to the
 * SPA shell.
 *
 * Deliberately dependency-free: string surgery on the built index.html, no
 * headless browser. It fixes the metadata, not the empty <body> — rendering
 * body content needs SSR and is a separate decision.
 *
 * Single source of truth: src/data/seo-routes.json, which the router also
 * imports for its runtime <title>.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const MANIFEST = join(ROOT, 'src/data/seo-routes.json')

/** Production origin. Overridable so a rename does not need a code change. */
const SITE = (process.env.VITE_SITE_URL ?? 'https://thronev1-greenbet.vercel.app').replace(/\/$/, '')

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * Replace a tag if it exists, otherwise insert it before </head>. Both branches
 * are needed: index.html ships a description and og:title, but no canonical.
 */
function upsert(html, matcher, tag) {
  return matcher.test(html) ? html.replace(matcher, tag) : html.replace('</head>', `  ${tag}\n  </head>`)
}

/**
 * Most link unfurlers do not resolve a root-relative og:image. On a brand whose
 * whole acquisition plan is sharing, a card without an image is a measurable
 * loss — make them absolute at build time, when the origin is known.
 */
const absoluteImages = (html) =>
  html.replace(/(<meta\s+(?:property="og:image"|name="twitter:image")\s+content=")\/(?!\/)/g, `$1${SITE}/`)

function headFor(html, route) {
  const url = SITE + route.path
  const title = `${route.title} · THRONE`
  const desc = route.description
  // Alias routes (/throne-club, /esports) serve content identical to another
  // URL. They point at the original rather than claiming to be the original.
  const canonical = SITE + (route.canonical ?? route.path)

  let out = html
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
  out = upsert(out, /<meta\s+name="description"[\s\S]*?\/?>/, `<meta name="description" content="${esc(desc)}" />`)
  out = upsert(out, /<meta\s+property="og:title"[\s\S]*?\/?>/, `<meta property="og:title" content="${esc(title)}" />`)
  out = upsert(out, /<meta\s+property="og:description"[\s\S]*?\/?>/, `<meta property="og:description" content="${esc(desc)}" />`)
  out = upsert(out, /<meta\s+property="og:url"[\s\S]*?\/?>/, `<meta property="og:url" content="${esc(url)}" />`)
  out = upsert(out, /<link\s+rel="canonical"[\s\S]*?\/?>/, `<link rel="canonical" href="${esc(canonical)}" />`)

  out = absoluteImages(out)
  return out
}

function sitemap(routes) {
  const urls = routes
    .filter((r) => !r.canonical) // an alias is never its own sitemap entry
    .map((r) => `  <url><loc>${esc(SITE + r.path)}</loc><priority>${r.priority ?? 0.7}</priority></url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

function main() {
  const shellPath = join(DIST, 'index.html')
  if (!existsSync(shellPath)) {
    console.error('prerender: dist/index.html missing — run `vite build` first')
    process.exit(1)
  }

  // The BUILT shell: Vite has already replaced /src/main.ts with the hashed
  // bundle. Reading the repo-root index.html instead would ship white screens.
  const shell = readFileSync(shellPath, 'utf8')
  if (shell.includes('/src/main.ts')) {
    console.error('prerender: dist/index.html still references /src/main.ts — not a built file')
    process.exit(1)
  }

  const routes = JSON.parse(readFileSync(MANIFEST, 'utf8'))

  // dist/index.html is otherwise BOTH the homepage and the catch-all fallback,
  // so every unprerendered path (game slugs, tournaments, /account, 404s) would
  // serve homepage metadata — the exact defect this exists to remove. Give the
  // fallback its own document: no canonical, no page claim, noindex.
  let fallback = shell
    .replace(/<link\s+rel="canonical"[\s\S]*?\/?>/, '')
    .replace(/<meta\s+property="og:url"[\s\S]*?\/?>/, '')
  fallback = fallback.replace('</head>', '  <meta name="robots" content="noindex" />\n  </head>')
  writeFileSync(join(DIST, 'shell.html'), absoluteImages(fallback))

  let written = 0
  for (const route of routes) {
    const html = headFor(shell, route)
    // cleanUrls in vercel.json serves dist/casino.html at /casino. That is the
    // documented mechanism; directory-index resolution is not documented.
    const target = route.path === '/' ? shellPath : join(DIST, `${route.path.replace(/^\//, '')}.html`)
    mkdirSync(dirname(target), { recursive: true })
    writeFileSync(target, html)
    written++
  }

  const indexed = routes.filter((r) => !r.canonical)
  writeFileSync(join(DIST, 'sitemap.xml'), sitemap(routes))

  console.log(`prerender: ${written} route documents + shell.html, sitemap with ${indexed.length} urls`)
}

main()
