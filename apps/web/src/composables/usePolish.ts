/**
 * THRONE UI/UX Polish Test — single source of truth for the experimental
 * refinement layer (branch feature/throne-ui-ux-polish-test).
 *
 * Gated entirely by VITE_ENABLE_THRONE_POLISH_TEST. When not 'true',
 * `polishEnabled` is false: the `html.polish` class is never added and every
 * polish-only override/branch is skipped — the site renders as the current
 * stable (premium) design. Flipping the flag is the full revert.
 */
export const polishEnabled =
  (import.meta as any).env?.VITE_ENABLE_THRONE_POLISH_TEST === 'true'
