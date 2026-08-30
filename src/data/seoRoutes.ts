import routes from './seo-routes.json'

/**
 * Per-route metadata — the single source of truth for three consumers:
 *   1. the router, for the runtime <title>, description and canonical
 *   2. scripts/prerender.mjs, which bakes the same values into a static file
 *      per route at build time (crawlers that do not run JS see them)
 *   3. the generated sitemap
 *
 * It is JSON rather than TS precisely so the Node build script can read it
 * without a compile step. Two copies of this data is how the original defect
 * — fifty URLs claiming to be the homepage — happened in the first place.
 */
export interface SeoRoute {
  path: string
  name: string
  title: string
  description: string
  priority: number
  /**
   * Set when this path renders content identical to another route
   * (/throne-club → /vip, /esports → /sports). The alias points at the
   * original instead of claiming to be one, and stays out of the sitemap.
   */
  canonical?: string
}

export const seoRoutes = routes as SeoRoute[]

const byName = new Map(seoRoutes.map((r) => [r.name, r]))
export const seoRouteFor = (name: string): SeoRoute | undefined => byName.get(name)
