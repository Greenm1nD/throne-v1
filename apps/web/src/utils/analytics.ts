/**
 * Plausible analytics.
 *
 * Chosen over GA4 deliberately: an unlicensed gambling brand handing Google a
 * behavioural profile of its players is a liability, and Plausible needs no
 * cookie banner (no cookies, no personal data), which keeps the consent layer
 * off a conversion funnel that has enough friction already.
 *
 * Inert until VITE_PLAUSIBLE_DOMAIN is set — no script, no requests, no events.
 * That way the wiring can ship before the account exists.
 */
type Props = Record<string, string | number | boolean>

declare global {
  interface Window {
    plausible?: { (event: string, opts?: { props?: Props }): void; q?: unknown[] }
  }
}

// `env.d.ts` is outside tsconfig's include, so env access is untyped here —
// same idiom as usePremiumMotion.ts.
const env = (import.meta as any).env
const DOMAIN: string | undefined = env?.VITE_PLAUSIBLE_DOMAIN
/** Override when self-hosting. */
const HOST: string = env?.VITE_PLAUSIBLE_HOST ?? 'https://plausible.io'

export function initAnalytics() {
  if (!DOMAIN || typeof document === 'undefined') return

  // Queue anything fired before the script lands, per Plausible's own snippet.
  const queue: { (event: string, opts?: { props?: Props }): void; q?: unknown[] } = function (
    ...args: unknown[]
  ) {
    ;(queue.q = queue.q ?? []).push(args)
  } as typeof queue
  window.plausible = window.plausible ?? queue

  const s = document.createElement('script')
  s.defer = true
  s.dataset.domain = DOMAIN
  // `manual` so the pageview fires after the router has set title and canonical,
  // not on pushState before them. `pageview-props` carries the route name.
  s.src = `${HOST}/js/script.manual.pageview-props.js`
  document.head.appendChild(s)
}

export function track(event: string, props?: Props) {
  window.plausible?.(event, props ? { props } : undefined)
}

export function trackPageview(route: string) {
  track('pageview', { route })
}
