/**
 * Whether to render live WebGL 3D (model-viewer) for this visit.
 *
 * Desktop with motion enabled → yes. We deliberately skip 3D on phones, for
 * reduced-motion users, and on Save-Data connections: a model-viewer instance
 * pulls ~1MB of JS plus the model, and runs a continuous render loop that
 * drains mobile battery/CPU. On those devices the static gold poster (already
 * the fallback) looks identical at a glance and keeps the page light.
 */
export function allow3D(): boolean {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (window.matchMedia('(max-width: 767px)').matches) return false
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  if (conn?.saveData) return false
  return true
}
