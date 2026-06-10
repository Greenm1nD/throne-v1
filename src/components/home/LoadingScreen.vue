<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { assets } from '@/data/assets'

const emit = defineEmits<{ done: [] }>()

const screen = ref<HTMLElement | null>(null)
const ring = ref<HTMLElement | null>(null)
const logo = ref<HTMLElement | null>(null)
const rule = ref<HTMLElement | null>(null)
const sub = ref<HTMLElement | null>(null)

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    emit('done')
    return
  }

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete: () => emit('done'),
  })

  tl.from(ring.value, { opacity: 0, scale: 0.78, duration: 0.9, ease: 'power2.out' })
    .from(
      logo.value,
      { opacity: 0, scale: 0.85, filter: 'blur(12px)', duration: 0.8 },
      '-=0.6',
    )
    .fromTo(
      rule.value,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, ease: 'power2.inOut' },
      '-=0.2',
    )
    .from(sub.value, { opacity: 0, y: 10, duration: 0.5 }, '-=0.25')
    .to({}, { duration: 0.4 }) // hold
    .to(screen.value, { opacity: 0, y: -40, duration: 0.6, ease: 'power2.in' })
})
</script>

<template>
  <!-- Flexbox centering: reliably dead-center on every screen size -->
  <div
    ref="screen"
    class="fixed inset-0 z-[100] flex items-center justify-center bg-bg grain"
  >
    <div class="flex flex-col items-center">
      <!-- Spinner ring with the logo centered inside -->
      <div ref="ring" class="relative flex h-[320px] w-[320px] items-center justify-center">
        <!-- Soft glow -->
        <div
          class="pointer-events-none absolute inset-0 rounded-full"
          style="
            background: radial-gradient(circle, rgba(245,215,122,0.20), rgba(212,175,55,0.06) 45%, transparent 70%);
            filter: blur(8px);
          "
        />

        <!-- Faint full track -->
        <svg class="absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="47" stroke="rgba(212,175,55,0.16)" stroke-width="0.5" />
        </svg>

        <!-- Spinning gold arc (the loader animation) -->
        <svg
          class="absolute inset-0 h-full w-full animate-ringRotate"
          style="animation-duration: 2.8s"
          viewBox="0 0 100 100"
          fill="none"
        >
          <defs>
            <linearGradient id="spinGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#F5D77A" />
              <stop offset="100%" stop-color="#D4AF37" stop-opacity="0.15" />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="47"
            stroke="url(#spinGrad)"
            stroke-width="0.8"
            stroke-linecap="round"
            stroke-dasharray="74 220"
          />
        </svg>

        <!-- Counter-rotating dashed accent -->
        <svg
          class="absolute inset-[15%] h-[70%] w-[70%] animate-ringRotateReverse"
          style="animation-duration: 7s"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle
            cx="50"
            cy="50"
            r="48"
            stroke="rgba(245,215,122,0.26)"
            stroke-width="0.5"
            stroke-dasharray="1 9"
          />
        </svg>

        <!-- The logo, dead-center inside the ring -->
        <img
          ref="logo"
          :src="assets.logoFull.src"
          :alt="assets.logoFull.alt"
          class="relative w-[180px] drop-shadow-[0_8px_36px_rgba(212,175,55,0.4)]"
        />
      </div>

      <!-- Gold line draws in -->
      <div
        ref="rule"
        class="mt-8 h-px w-44 origin-center bg-gradient-to-r from-transparent via-gold to-transparent"
      />
      <p
        ref="sub"
        class="mt-4 font-sans text-[10px] font-medium uppercase tracking-[0.5em] text-ink-dim"
      >
        Enter the Kingdom
      </p>
    </div>
  </div>
</template>
