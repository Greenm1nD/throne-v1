import { onUnmounted, ref } from 'vue'
import { kingdomPage } from '@/data/pages'

/**
 * Season countdown. The season runs `lengthDays` (4 weeks). The end is anchored
 * per-device in localStorage the first time it's seen; once it passes, a fresh
 * window is started (a new season begins) so the timer always reads sensibly in
 * this front-end prototype. Reduced-motion users get a static value (no ticking).
 */
const KEY = 'throne.season.endsAt'
const DAY = 86_400_000

function anchorEnd(): number {
  let v = Number(localStorage.getItem(KEY))
  if (!v || v < Date.now()) {
    v = Date.now() + kingdomPage.season.lengthDays * DAY
    localStorage.setItem(KEY, String(v))
  }
  return v
}

function format(ms: number): string {
  if (ms <= 0) return '0d 00h 00m'
  const d = Math.floor(ms / DAY)
  const h = Math.floor((ms % DAY) / 3_600_000)
  const m = Math.floor((ms % 3_600_000) / 60_000)
  const s = Math.floor((ms % 60_000) / 1000)
  const pad = (n: number) => String(n).padStart(2, '0')
  // Days shown when present; otherwise fall back to a tense HH:MM:SS in the final day.
  return d > 0 ? `${d}d ${pad(h)}h ${pad(m)}m` : `${pad(h)}h ${pad(m)}m ${pad(s)}s`
}

export function useSeason() {
  const endsAt = anchorEnd()
  const label = ref(format(endsAt - Date.now()))
  const finalDay = ref(endsAt - Date.now() < DAY)

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduce) {
    const tick = () => {
      const left = endsAt - Date.now()
      label.value = format(left)
      finalDay.value = left < DAY
    }
    // Tick every second in the final day (HH:MM:SS), otherwise once a minute.
    const id = window.setInterval(tick, finalDay.value ? 1000 : 60_000)
    onUnmounted(() => clearInterval(id))
  }

  return { label, finalDay }
}
