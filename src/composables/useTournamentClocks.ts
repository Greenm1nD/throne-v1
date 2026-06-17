import { onUnmounted, reactive } from 'vue'
import type { Tournament } from '@/data/pages'

/**
 * Live countdowns for tournaments. Each tournament with an `etaMin` gets a target
 * time anchored per-device in localStorage (re-anchored once it elapses, so the
 * prototype always reads sensibly). Live → "Ends in …", upcoming → "Starts in …".
 * Reduced-motion users get a static value (no per-second ticking).
 */
const KEY = 'throne.tclock.'

function anchor(slug: string, etaMin: number): number {
  let v = Number(localStorage.getItem(KEY + slug))
  if (!v || v < Date.now()) {
    v = Date.now() + etaMin * 60_000
    localStorage.setItem(KEY + slug, String(v))
  }
  return v
}

function fmt(ms: number): string {
  if (ms <= 0) return 'now'
  const h = Math.floor(ms / 3_600_000)
  const m = Math.floor((ms % 3_600_000) / 60_000)
  const s = Math.floor((ms % 60_000) / 1000)
  const pad = (n: number) => String(n).padStart(2, '0')
  return h > 0 ? `${h}h ${pad(m)}m ${pad(s)}s` : `${m}m ${pad(s)}s`
}

export function useTournamentClocks(tournaments: Tournament[]) {
  const targets: Record<string, number> = {}
  const labels = reactive<Record<string, string>>({})

  const build = () => {
    for (const t of tournaments) {
      if (!t.etaMin) continue
      if (!targets[t.slug]) targets[t.slug] = anchor(t.slug, t.etaMin)
      const prefix = t.status === 'live' ? 'Ends in' : 'Starts in'
      labels[t.slug] = `${prefix} ${fmt(targets[t.slug] - Date.now())}`
    }
  }
  build()

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduce) {
    const id = window.setInterval(build, 1000)
    onUnmounted(() => clearInterval(id))
  }

  // Live label when we have a clock; otherwise the tournament's fixed `when`.
  const label = (t: Tournament) => labels[t.slug] ?? t.when
  return { label }
}
