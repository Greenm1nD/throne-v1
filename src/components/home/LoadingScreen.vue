<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'
import { allow3D } from '@/utils/render3d'

const emit = defineEmits<{ done: [] }>()

// 3D coin fades in over the PNG poster once the model is ready.
const crownReady = ref(false)
// On mobile / reduced-motion / save-data we keep the static poster (no WebGL).
const use3D = ref(false)

// Backstop: the intro must never stick, even if rAF/GSAP is starved (e.g. by
// the WebGL crown decoding). Whichever fires first wins; finish is idempotent.
let safety = 0
let finished = false
function finish() {
  if (finished) return
  finished = true
  clearTimeout(safety)
  emit('done')
}

const screen = ref<HTMLElement | null>(null)
const stage = ref<HTMLElement | null>(null)
const spark = ref<HTMLElement | null>(null)
const ringCircle = ref<SVGCircleElement | null>(null)
const ringGlow = ref<HTMLElement | null>(null)
const mark = ref<HTMLElement | null>(null)
const tagline = ref<HTMLElement | null>(null)
const flash = ref<HTMLElement | null>(null)

// Circumference for the r=46 ring in the 0-100 viewBox.
const CIRC = 2 * Math.PI * 46

// Energy-gathering particles — scattered start offsets (deterministic).
const particles = Array.from({ length: 22 }, (_, i) => {
  const ang = i * 137.5 * (Math.PI / 180)
  const rad = 60 + ((i * 29) % 90)
  return {
    x: Math.round(Math.cos(ang) * rad),
    y: Math.round(Math.sin(ang) * rad),
    s: [2, 3, 1.5, 2.5][i % 4],
  }
})

// Four cardinal crest diamonds (top, right, bottom, left of the ring).
const diamonds = [
  { top: '-5%', left: '50%' },
  { top: '50%', left: '105%' },
  { top: '105%', left: '50%' },
  { top: '50%', left: '-5%' },
]

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    emit('done')
    return
  }

  // Light 3D coin on capable devices; phones keep the static poster.
  if (allow3D()) {
    use3D.value = true
    import('@google/model-viewer')
  }

  // Hard cap on the whole intro (timeline runs ~3.45s) — setTimeout fires even
  // when rAF is throttled, so the loader can never trap the user.
  safety = window.setTimeout(finish, 4500)

  const root = stage.value!
  const dots = Array.from(root.querySelectorAll<HTMLElement>('.spark-dot'))
  const gems = Array.from(root.querySelectorAll<HTMLElement>('.crest-diamond'))

  // Scatter the particles via transform (margin keeps them self-centred).
  dots.forEach((d, i) => gsap.set(d, { x: particles[i].x, y: particles[i].y }))
  gsap.set(gems, { rotation: 45 })

  const tl = gsap.timeline({ onComplete: finish })

  // 1–2 · First spark
  tl.fromTo(spark.value, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }, 0.1)

  // 3 · Energy gathering
  tl.fromTo(dots, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.45, stagger: 0.015, ease: 'power1.out' }, 0.35)

  // 4–5 · Ring draws, halo completes
  tl.to(spark.value, { opacity: 0, scale: 0.4, duration: 0.3 }, 0.7)
  tl.fromTo(ringCircle.value, { strokeDashoffset: CIRC }, { strokeDashoffset: 0, duration: 0.65, ease: 'power2.inOut' }, 0.7)
  tl.fromTo(ringGlow.value, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }, 1.1)

  // 6 · Particles converge inward + fade
  tl.to(dots, { x: 0, y: 0, opacity: 0, scale: 0.2, duration: 0.55, stagger: 0.008, ease: 'power2.in' }, 1.05)

  // 7–9 · THRONE 3D logo appears directly — clean fade + settle (no blur wipe,
  // so a frozen frame during model decode still reads as the crisp logo).
  tl.fromTo(
    mark.value,
    { opacity: 0, scale: 0.82 },
    { opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out' },
    0.25,
  )

  // 10 · Royal crest diamonds pop in
  tl.fromTo(gems, { opacity: 0, scale: 0, rotation: 45 }, { opacity: 1, scale: 1, rotation: 45, duration: 0.4, stagger: 0.06, ease: 'back.out(2.2)' }, 1.95)

  // 11 · Tagline reveal
  tl.fromTo(tagline.value, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 2.2)

  // 12–13 · Premium hold → portal transition (crest expands + flash)
  tl.to(stage.value, { scale: 2.7, duration: 0.6, ease: 'power2.in' }, 2.78)
  tl.to([mark.value, tagline.value, ...gems], { opacity: 0, duration: 0.3 }, 2.8)
  tl.to(ringGlow.value, { scale: 1.4, opacity: 0.9, duration: 0.6 }, 2.78)
  tl.fromTo(flash.value, { opacity: 0 }, { opacity: 0.55, duration: 0.2 }, 2.9)
  tl.to(flash.value, { opacity: 0, duration: 0.35 }, 3.1)

  // 14–15 · Dissolve into the homepage
  tl.to(screen.value, { opacity: 0, duration: 0.45, ease: 'power2.in' }, 3.0)
})

onBeforeUnmount(() => clearTimeout(safety))
</script>

<template>
  <div ref="screen" class="fixed inset-0 z-overlay grid place-items-center overflow-hidden bg-bg">
    <!-- Portal flash overlay -->
    <div
      ref="flash"
      class="pointer-events-none absolute inset-0 opacity-0"
      style="background: radial-gradient(circle at center, rgba(245,215,122,0.9), rgba(212,175,55,0.2) 40%, transparent 70%)"
    />

    <div class="flex flex-col items-center">
      <!-- Crest stage -->
      <div ref="stage" class="relative h-[260px] w-[260px]">
        <!-- Soft halo glow -->
        <div
          ref="ringGlow"
          class="pointer-events-none absolute inset-0 rounded-full opacity-0"
          style="background: radial-gradient(circle, rgba(245,215,122,0.22), rgba(212,175,55,0.06) 45%, transparent 70%); filter: blur(6px)"
        />

        <!-- First spark (centred via margin so GSAP scale is free) -->
        <div
          ref="spark"
          class="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-gold-bright opacity-0"
          style="margin-left: -4px; margin-top: -4px; box-shadow: 0 0 18px 6px rgba(245,215,122,0.9)"
        />

        <!-- Gathering particles -->
        <span
          v-for="(p, i) in particles"
          :key="i"
          class="spark-dot absolute left-1/2 top-1/2 rounded-full bg-gold-bright opacity-0"
          :style="{
            width: `${p.s}px`,
            height: `${p.s}px`,
            marginLeft: `${-p.s / 2}px`,
            marginTop: `${-p.s / 2}px`,
            boxShadow: '0 0 8px 2px rgba(245,215,122,0.7)',
          }"
        />

        <!-- Drawing ring -->
        <svg class="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100" fill="none">
          <circle
            ref="ringCircle"
            cx="50"
            cy="50"
            r="46"
            stroke="#F5D77A"
            stroke-width="1.4"
            stroke-linecap="round"
            :stroke-dasharray="CIRC"
            :stroke-dashoffset="CIRC"
            class="drop-shadow-[0_0_6px_rgba(245,215,122,0.8)]"
          />
          <circle cx="50" cy="50" r="40" stroke="rgba(212,175,55,0.25)" stroke-width="0.4" />
        </svg>

        <!-- Crest diamonds (centred via margin; GSAP owns rotation+scale) -->
        <span
          v-for="(d, i) in diamonds"
          :key="`d${i}`"
          class="crest-diamond absolute h-3 w-3 bg-gold-gradient opacity-0"
          :style="{ top: d.top, left: d.left, marginLeft: '-6px', marginTop: '-6px', boxShadow: '0 0 8px rgba(245,215,122,0.6)' }"
        />

        <!-- THRONE logo mark: live 3D over a PNG poster fallback -->
        <div
          ref="mark"
          class="absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 opacity-0"
        >
          <!-- Round champagne glow behind the coin (replaces the square-clipping drop-shadow) -->
          <span
            v-if="use3D && crownReady"
            class="pointer-events-none absolute inset-0 z-0"
            style="background: radial-gradient(circle, rgba(245,215,122,0.4), rgba(245,215,122,0.1) 42%, transparent 64%); filter: blur(6px)"
            aria-hidden="true"
          />
          <img
            v-show="!crownReady"
            src="/assets/images/throne-logo-mark.webp"
            alt=""
            class="absolute inset-0 h-full w-full object-contain drop-shadow-[0_4px_24px_rgba(212,175,55,0.5)]"
          />
          <model-viewer
            v-if="use3D"
            src="/assets/models/coin.glb"
            loading="eager"
            reveal="auto"
            auto-rotate
            auto-rotate-delay="0"
            rotation-per-second="120deg"
            interaction-prompt="none"
            camera-orbit="0deg 80deg 155%"
            min-camera-orbit="auto 80deg auto"
            max-camera-orbit="auto 80deg auto"
            shadow-intensity="0"
            exposure="1.35"
            tone-mapping="aces"
            environment-image="neutral"
            field-of-view="28deg"
            class="absolute inset-0 z-[1] h-full w-full transition-opacity duration-500"
            :class="crownReady ? 'opacity-100' : 'opacity-0'"
            style="background: transparent; --poster-color: transparent"
            @load="crownReady = true"
          />
        </div>
      </div>

      <!-- Tagline -->
      <p
        ref="tagline"
        class="mt-9 font-sans text-[10px] font-medium uppercase tracking-[0.5em] text-ink-dim opacity-0"
      >
        Enter the Kingdom
      </p>
    </div>
  </div>
</template>
