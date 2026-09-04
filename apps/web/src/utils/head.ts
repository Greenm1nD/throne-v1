/**
 * Runtime <head> for the SPA shell.
 *
 * vercel.json serves one HTML document for every path, so any URL-bearing or
 * page-specific tag baked into it is wrong everywhere except the homepage.
 * These helpers rewrite them on each navigation.
 *
 * scripts/prerender.mjs writes the same values into a static file per public
 * route at build time. This is the runtime half, for in-app navigation and for
 * crawlers that do execute JavaScript.
 */
function upsert(selector: string, create: () => HTMLElement): HTMLElement {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  return el
}

function meta(attr: 'name' | 'property', key: string): HTMLElement {
  return upsert(`meta[${attr}="${key}"]`, () => {
    const m = document.createElement('meta')
    m.setAttribute(attr, key)
    return m
  })
}

export interface HeadInput {
  /** Full title as rendered, including the brand suffix. */
  title: string
  description: string
  /** Absolute-path canonical, e.g. "/vip". Aliases pass their target. */
  canonicalPath: string
  /** null clears any robots directive set by a previous route. */
  robots: string | null
}

export function applyHead({ title, description, canonicalPath, robots }: HeadInput) {
  const url = window.location.origin + canonicalPath

  document.title = title
  meta('name', 'description').setAttribute('content', description)
  meta('property', 'og:title').setAttribute('content', title)
  meta('property', 'og:description').setAttribute('content', description)
  meta('property', 'og:url').setAttribute('content', url)

  // Never both: a canonical on a noindex page can carry the noindex across to
  // the page it points at. A noindex page simply has no canonical.
  if (robots?.includes('noindex')) {
    document.head.querySelector('link[rel="canonical"]')?.remove()
  } else {
    ;(upsert('link[rel="canonical"]', () => {
      const l = document.createElement('link')
      l.rel = 'canonical'
      return l
    }) as HTMLLinkElement).href = url
  }

  setRobots(robots)
}

/**
 * `robots` for the current route. The router clears it on every navigation so
 * a noindex set by one view cannot leak into the next — the DOM outlives the
 * page in a SPA.
 */
function setRobots(value: string | null) {
  const existing = document.head.querySelector('meta[name="robots"]')
  if (value === null) {
    existing?.remove()
    return
  }
  meta('name', 'robots').setAttribute('content', value)
}
