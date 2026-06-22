<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { premiumEnabled } from '@/composables/usePremiumMotion'
import { mobilePolishEnabled, useViewport } from '@/composables/useMobilePolish'

/**
 * Shared cinematic hero for section pages: right-weighted artwork,
 * left text block (crown/icon, title, tagline, sub, CTAs).
 */
const props = withDefaults(
  defineProps<{
    title: string
    tagline: string
    sub?: string
    cta: string
    cta2?: string
    image: string
    fallback: string
    icon?: string
    /** Vertical focal point of the artwork (background-position-y) */
    posY?: string
    /** Optional ambient mp4 — loops over the still, which stays as poster/fallback */
    video?: string
    /** Optional portrait crop used on mobile/tablet under the mobile flag */
    imageMobile?: string
  }>(),
  { icon: 'crown', posY: '50%', video: undefined, imageMobile: undefined },
)

const emit = defineEmits<{ primary: []; secondary: [] }>()

const content = ref<HTMLElement | null>(null)
const bgEl = ref<HTMLElement | null>(null)
const vid = ref<HTMLVideoElement | null>(null)

// Scroll parallax: artwork drifts into depth, copy lifts away (as on Home).
let ticking = false
function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const y = window.scrollY
    if (bgEl.value) bgEl.value.style.transform = `translateY(${y * 0.25}px) scale(1.05)`
    if (content.value) {
      content.value.style.transform = `translateY(${y * -0.1}px)`
      content.value.style.opacity = String(Math.max(0, 1 - y / 500))
    }
    ticking = false
  })
}

// Mobile/tablet (flag on) prefer the portrait crop; a bottom-weighted scrim keeps
// the title legible over a centred subject. Desktop keeps the left-weighted scrim.
const { lite } = useViewport()
const heroImg = computed(() =>
  lite.value && props.imageMobile ? props.imageMobile : props.image,
)
const bg = computed(() => {
  const scrim =
    lite.value && props.imageMobile
      ? 'linear-gradient(180deg, rgba(5,5,5,0.62) 0%, rgba(5,5,5,0.2) 38%, rgba(5,5,5,0.55) 78%, rgba(5,5,5,0.92) 100%)'
      : 'linear-gradient(90deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.62) 32%, rgba(5,5,5,0.18) 58%, rgba(5,5,5,0.35) 100%)'
  return `${scrim}, url('${heroImg.value}'), url('${props.fallback}')`
})

// Hero video plays ONCE on entry, then freezes on its last frame (becomes a
// still). It replays only on remount — i.e. a page refresh or re-navigation.
// Premium flag + no reduced-motion + desktop only. Paused below the fold until
// it has finished; once ended we stop observing so scrolling never restarts it.
const cinemagraph = premiumEnabled && !!props.video
let io: IntersectionObserver | null = null

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // With the mobile flag on, tablets (768–1023) also use the static poster, so
  // the ambient video plays on true desktop only.
  const desktopMin = mobilePolishEnabled ? 1024 : 768
  const desktop = window.matchMedia(`(min-width: ${desktopMin}px)`).matches
  if (cinemagraph && !reduce && desktop && vid.value) {
    const v = vid.value
    let finished = false
    // Hold on the final frame once the clip ends; never auto-restart this mount.
    v.addEventListener('ended', () => {
      finished = true
      io?.disconnect()
    })
    io = new IntersectionObserver(
      ([e]) => {
        if (!vid.value || finished) return
        if (e.isIntersecting) vid.value.play().catch(() => {})
        else vid.value.pause()
      },
      { threshold: 0.15 },
    )
    io.observe(v)
  }
  if (reduce || !content.value) return
  gsap.from(content.value.children, {
    opacity: 0,
    y: 22,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.09,
    delay: 0.1,
  })
  // Skip continuous scroll parallax on mobile/tablet (scroll-jank) under the flag.
  if (!(mobilePolishEnabled && !desktop)) {
    window.addEventListener('scroll', onScroll, { passive: true })
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  io?.disconnect()
})
</script>

<template>
  <section
    class="page-hero grain relative flex min-h-[500px] items-center overflow-hidden lg:min-h-[640px]"
  >
    <div
      ref="bgEl"
      class="absolute inset-0 bg-cover"
      :style="{ backgroundImage: bg, backgroundColor: '#07070a', backgroundPosition: `center ${posY}` }"
    >
      <template v-if="cinemagraph && !lite">
        <!-- Plays once on entry, then freezes on the last frame (the still). -->
        <video
          ref="vid"
          :src="video"
          :poster="image"
          muted
          playsinline
          preload="auto"
          class="absolute inset-0 h-full w-full object-cover"
          :style="{ objectPosition: `center ${posY}` }"
        />
        <div
          class="pointer-events-none absolute inset-0"
          style="background: linear-gradient(90deg, rgba(5, 5, 5, 0.92) 0%, rgba(5, 5, 5, 0.62) 32%, rgba(5, 5, 5, 0.18) 58%, rgba(5, 5, 5, 0.35) 100%)"
        />
      </template>

      <!-- Ambient light-sweep (premium, CSS-only; static poster stays beneath) -->
      <div v-if="premiumEnabled" class="pm-hero-sweep" aria-hidden="true" />
    </div>

    <div class="container-royal relative z-10">
      <div ref="content" class="max-w-xl py-16">
        <!-- Real gold crown emblem (line-art glyph kept for non-crown icons) -->
        <img
          v-if="icon === 'crown'"
          src="/assets/images/crown-duke.png"
          alt=""
          class="h-11 w-auto drop-shadow-[0_4px_14px_rgba(212,175,55,0.45)]"
        />
        <AppIcon v-else :name="icon" :size="30" class="text-gold-bright drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]" />
        <h1
          class="mt-3 font-display text-5xl font-bold tracking-[0.12em] text-gold-gradient sm:text-6xl"
        >
          {{ title }}
        </h1>
        <p class="mt-4 font-sans text-sm font-medium uppercase tracking-[0.3em] text-ink">
          {{ tagline }}
        </p>
        <p v-if="sub" class="mt-4 max-w-md font-sans text-sm leading-relaxed text-ink-muted">
          {{ sub }}
        </p>
        <div class="mt-8 flex flex-wrap items-center gap-4">
          <GoldButton variant="solid" size="lg" @click="emit('primary')">
            {{ cta }} <AppIcon name="arrowRight" :size="15" />
          </GoldButton>
          <GoldButton v-if="cta2" variant="outline" size="lg" @click="emit('secondary')">
            {{ cta2 }}
          </GoldButton>
        </div>
        <slot name="below" />
      </div>
    </div>
  </section>
</template>
