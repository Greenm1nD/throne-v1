<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'
import RotatingCrownRing from './RotatingCrownRing.vue'
import FloorSmoke from './FloorSmoke.vue'
import Crown3D from '@/components/ui/Crown3D.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { useRouter } from 'vue-router'
import { useEnter } from '@/composables/useEnter'
import { assets } from '@/data/assets'

const router = useRouter()
const { enter, enterLabel } = useEnter()

const eyebrow = ref<HTMLElement | null>(null)
const heading = ref<HTMLElement | null>(null)
const sub = ref<HTMLElement | null>(null)
const ctas = ref<HTMLElement | null>(null)
const backdrop = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)

// Scarcity signals — exclusivity is felt, not stated. A live presence count
// that gently drifts, and a closing "intake" window, both tick on a timer.
const online = ref(1247)
const seatsLeft = ref(9)
let secs = 2 * 3600 + 47 * 60 // ~2h47m until the next intake closes
const countdown = ref('')
let timer: ReturnType<typeof setInterval> | undefined

function fmt() {
  const h = Math.floor(secs / 3600)
  const m = Math.floor((secs % 3600) / 60)
  const s = secs % 60
  countdown.value = `${h}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`
}

let ticking = false
function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const y = window.scrollY
    // Background drifts slowest; foreground lifts and fades out.
    if (backdrop.value) backdrop.value.style.transform = `translateY(${y * 0.25}px) scale(1.05)`
    if (content.value) {
      content.value.style.transform = `translateY(${y * -0.1}px)`
      content.value.style.opacity = String(Math.max(0, 1 - y / 500))
    }
    ticking = false
  })
}

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 })
  tl.from(backdrop.value, { opacity: 0, scale: 1.08, duration: 1.4, ease: 'power2.out' })
    .from(eyebrow.value, { opacity: 0, y: 16, duration: 0.6 }, '-=1.0')
    .from(
      heading.value,
      { opacity: 0, y: 24, filter: 'blur(14px)', duration: 0.9 },
      '-=0.5',
    )
    .from(sub.value, { opacity: 0, y: 16, duration: 0.6 }, '-=0.5')
    .from(ctas.value, { opacity: 0, y: 16, duration: 0.6 }, '-=0.4')

  window.addEventListener('scroll', onScroll, { passive: true })

  // Tick the live signals. Frozen for reduced-motion (still shown, just static).
  fmt()
  if (!reduce) {
    timer = setInterval(() => {
      if (secs > 0) secs--
      fmt()
      // Presence drifts within a tight band so it reads as live, not random.
      const drift = Math.round((Math.random() - 0.45) * 4)
      online.value = Math.min(1289, Math.max(1208, online.value + drift))
    }, 1000)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  if (timer) clearInterval(timer)
})
</script>

<template>
  <section
    class="cinematic-overlay grain relative flex min-h-[620px] w-full flex-col items-center justify-between overflow-hidden py-14 lg:h-[660px] lg:py-16"
  >
    <!-- Animated throne-room backdrop (video, poster = static fallback) -->
    <div ref="backdrop" class="absolute inset-0" style="background-color: #07070a">
      <video
        class="hero-zoom h-full w-full object-cover"
        :poster="assets.heroThroneRoom.src"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
        aria-hidden="true"
      >
        <source :src="assets.heroVideo.src" type="video/mp4" />
      </video>
      <!-- Cinematic gradient scrim so the title/CTAs stay legible -->
      <div
        class="absolute inset-0"
        style="
          background: linear-gradient(
            180deg,
            rgba(5, 5, 5, 0.55) 0%,
            rgba(5, 5, 5, 0.12) 32%,
            rgba(5, 5, 5, 0.2) 60%,
            rgba(5, 5, 5, 0.9) 100%
          );
        "
      />
    </div>

    <!-- Drifting smoke along the floor -->
    <FloorSmoke />

    <!-- Subtle rotating golden sparkles layered over the painted ring -->
    <RotatingCrownRing variant="sparkle" />

    <!-- Top: title block, seated in the dark upper band above the throne -->
    <div ref="content" class="container-royal relative z-10 flex flex-col items-center text-center">
      <div ref="eyebrow" class="mb-2">
        <Crown3D
          src="/assets/models/crown.glb"
          poster="/assets/images/crown-duke.png"
          :size="150"
        />
      </div>

      <h1
        ref="heading"
        class="font-display text-6xl font-bold tracking-[0.16em] text-gold-gradient drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] sm:text-7xl lg:text-8xl"
      >
        THRONE
      </h1>

      <p
        ref="sub"
        class="mt-4 font-sans text-xs font-medium uppercase tracking-[0.5em] text-ink-muted drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-sm"
      >
        Enter the Kingdom
      </p>
    </div>

    <!-- Bottom: scarcity signals + CTAs over the marble floor -->
    <div
      ref="ctas"
      class="container-royal relative z-10 flex flex-col items-center gap-5"
    >
      <!-- Live presence + closing intake window -->
      <div
        class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-full border border-border-gold/40 bg-black/45 px-5 py-2 backdrop-blur-sm"
      >
        <span class="flex items-center gap-2 font-sans text-[11px] tracking-[0.04em] text-ink-muted">
          <span class="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] motion-safe:animate-pulse" />
          <span class="font-semibold tabular-nums text-champagne">{{ online.toLocaleString() }}</span> nobles in the hall
        </span>
        <span class="hidden h-3 w-px bg-border-gold/40 sm:block" />
        <span class="flex items-center gap-2 font-sans text-[11px] tracking-[0.04em] text-ink-muted">
          Next intake closes in
          <span class="font-semibold tabular-nums text-champagne">{{ countdown }}</span>
        </span>
        <span class="hidden h-3 w-px bg-border-gold/40 sm:block" />
        <span class="font-sans text-[11px] tracking-[0.04em] text-ink-muted">
          Only <span class="font-semibold text-champagne">{{ seatsLeft }}</span> seats at the royal table
        </span>
      </div>

      <div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <GoldButton variant="solid" size="lg" @click="enter()">
          {{ enterLabel }}
          <AppIcon name="arrowRight" :size="16" />
        </GoldButton>
        <GoldButton variant="outline" size="lg" @click="router.push('/vip')">Explore VIP</GoldButton>
      </div>
    </div>
  </section>
</template>
