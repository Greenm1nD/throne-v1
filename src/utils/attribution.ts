/**
 * Client-side first-touch attribution — the DEMO mirror of the real thing.
 *
 * Production capture is server-side at the edge: an HttpOnly `thr_attr` cookie
 * plus an attribution row, because script-set storage does not survive Safari
 * ITP or iOS in-app browsers (tech_integrations/tracking_and_postbacks.js §3,
 * read-only reference; marketing_strategy/01_affiliate_program.md §5.2). Until
 * that backend exists, this captures the same fields into localStorage so
 * campaign links can be exercised end-to-end in the demo.
 *
 * Two rules survive the port to the backend unchanged:
 *   • FIRST TOUCH IS FROZEN — an existing capture is never overwritten. A later
 *     click must not steal the original referrer's attribution.
 *   • The window is 90 days (ATTRIBUTION_WINDOW_DAYS) — the number published in
 *     the affiliate T&C; the stored `ts` is what the window is measured from.
 */

/** Attribution window in days. Must match the published affiliate T&C. */
export const ATTRIBUTION_WINDOW_DAYS = 90

/** Same key the edge cookie will use, so the demo and the spec read alike. */
const STORAGE_KEY = 'thr_attr'

export interface Attribution {
  /** The network's own id — echoed back verbatim in postbacks, never normalised. */
  click_id: string | null
  btag: string | null
  /** sub1..sub5, passed through untouched. */
  subs: Record<string, string>
  /** utm_* parameters, for channels that use them instead of subs. */
  utm: Record<string, string>
  /** Origin + path only — the query stays out of stored URLs. */
  landing_url: string
  /** Unix ms at capture — the start of the 90-day window. */
  ts: number
}

/** Bound param length: these land in storage now and a DB column later. */
const clip = (v: string) => v.slice(0, 255)

/**
 * Capture attribution params from the current URL into localStorage.
 *
 * No-ops when a capture already exists (first-touch frozen) or when the URL
 * carries nothing attributable. Safe to call on every lander mount.
 */
export function captureAttribution(): void {
  try {
    if (window.localStorage.getItem(STORAGE_KEY)) return // first touch is frozen
  } catch {
    return // storage unavailable (privacy mode) — the demo capture simply skips
  }

  const p = new URLSearchParams(window.location.search)

  // The same aliases the edge parser accepts.
  const clickId = p.get('click_id') || p.get('clickid') || p.get('cid')
  const btag = p.get('btag') || p.get('aff') || p.get('a_aid')

  const subs: Record<string, string> = {}
  for (let i = 1; i <= 5; i++) {
    const v = p.get(`sub${i}`)
    if (v) subs[`sub${i}`] = clip(v)
  }

  const utm: Record<string, string> = {}
  for (const [k, v] of p) {
    if (k.startsWith('utm_') && v) utm[clip(k)] = clip(v)
  }

  if (!clickId && !btag && !Object.keys(subs).length && !Object.keys(utm).length) return

  const record: Attribution = {
    click_id: clickId ? clip(clickId) : null,
    btag: btag ? clip(btag) : null,
    subs,
    utm,
    landing_url: window.location.origin + window.location.pathname,
    ts: Date.now(),
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
  } catch {
    /* quota exceeded — nothing to do in the demo */
  }
}

/**
 * Read the frozen capture, expiring it past the attribution window.
 * Registration copies this once onto the account and never re-reads the store —
 * the same freeze rule the server enforces in tracking_and_postbacks.js §3.
 */
export function getAttribution(): Attribution | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const attr = JSON.parse(raw) as Attribution
    const ageDays = (Date.now() - attr.ts) / 86_400_000
    return ageDays <= ATTRIBUTION_WINDOW_DAYS ? attr : null
  } catch {
    return null
  }
}
