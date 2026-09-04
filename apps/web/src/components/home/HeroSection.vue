<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import gsap from 'gsap'
import RotatingCrownRing from './RotatingCrownRing.vue'
import FloorSmoke from './FloorSmoke.vue'
import Crown3D from '@/components/ui/Crown3D.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { useRouter } from 'vue-router'
import { useEnter } from '@/composables/useEnter'
import { useViewport } from '@/composables/useMobilePolish'
import { introDone } from '@/composables/useIntroDone'
import { assets } from '@/data/assets'
import { RANKS, formatBp } from '@/data/progression'

const router = useRouter()
const { enter, enterLabel } = useEnter()

// The one real differentiator, stated plainly. Standing Order rates come from
// the progression ladder itself, so this line can never drift from the data.
const minRateBp = Math.min(...RANKS.map((r) => r.standingOrderBp))
const maxRateBp = Math.max(...RANKS.map((r) => r.standingOrderBp))
const offerRange = `${formatBp(minRateBp)}–${formatBp(maxRateBp)}`

// Lite hero on mobile/tablet (flag on): static poster instead of autoplay video,
// crown image instead of the 3D model, no smoke/sparkles, no scroll parallax.
const { lite } = useViewport()

const eyebrow = ref<HTMLElement | null>(null)
const heading = ref<HTMLElement | null>(null)
const sub = ref<HTMLElement | null>(null)
const ctas = ref<HTMLElement | null>(null)
const backdrop = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const bloom = ref<HTMLElement | null>(null)

let ticking = false
function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const y = window.scrollY
    // Background drifts slowest; foreground lifts and fades out.
    if (backdrop.value) backdrop.value.style.transform = `translate3d(0, ${y * 0.25}px, 0) scale3d(1.05, 1.05, 1)`
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

  // "Lights come on in the palace" — the hall waits in near-darkness, then the
  // golden ring flares and the hero brightens as the loader dissolves. Initial
  // dark state is set immediately (invisible under the loader) so the reveal
  // starts from black the moment the page appears.
  gsap.set(backdrop.value, { filter: 'brightness(0.05) saturate(0.75)' })
  gsap.set([eyebrow.value, sub.value, ctas.value], { opacity: 0, y: 16 })
  gsap.set(heading.value, { opacity: 0, y: 24, filter: 'blur(14px)' })

  const start = () => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.to(backdrop.value, { filter: 'brightness(1) saturate(1)', duration: 2.4, ease: 'power2.inOut', clearProps: 'filter' }, 0)
      // Gold ring ignition flare, blooming then settling
      .fromTo(bloom.value, { opacity: 0 }, { opacity: 0.55, duration: 0.9, ease: 'power2.in' }, 0.4)
      .to(bloom.value, { opacity: 0, duration: 1.3, ease: 'power2.out' }, 1.35)
      // Content emerges once the hall is lit
      .to(eyebrow.value, { opacity: 1, y: 0, duration: 0.6 }, 1.1)
      .to(heading.value, { opacity: 1, y: 0, filter: 'blur(0px)', clearProps: 'filter', duration: 0.9 }, 1.35)
      .to(sub.value, { opacity: 1, y: 0, duration: 0.6 }, 1.7)
      .to(ctas.value, { opacity: 1, y: 0, duration: 0.6 }, 1.9)
  }

  // Play in view: wait for the intro loader to dissolve (or start at once on
  // SPA navigation back to home).
  if (introDone.value) start()
  else {
    const stop = watch(introDone, (v) => {
      if (v) {
        stop()
        start()
      }
    })
  }

  // Continuous scroll parallax is a scroll-jank risk on touch devices — skip it
  // in lite mode (the static hero stays put).
  if (!lite.value) window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <section
    class="home-hero cinematic-overlay grain relative flex min-h-[620px] w-full flex-col items-center justify-between overflow-hidden py-14 lg:h-[660px] lg:py-16"
  >
    <!-- Animated throne-room backdrop. The home cinemagraph is kept on mobile
         too (it sits well and is locked-camera/lightweight); only the 3D crown
         and particle layers are dropped on small screens. -->
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

    <!-- Golden ignition bloom over the throne ring (entrance only) -->
    <div
      ref="bloom"
      class="pointer-events-none absolute inset-0 z-[5] opacity-0"
      style="background: radial-gradient(46% 62% at 50% 44%, rgba(245, 215, 122, 0.42), rgba(212, 175, 55, 0.14) 46%, transparent 72%)"
      aria-hidden="true"
    />

    <!-- Decorative motion — desktop only (skipped on mobile/tablet for perf) -->
    <template v-if="!lite">
      <!-- Drifting smoke along the floor -->
      <FloorSmoke />
      <!-- Subtle rotating golden sparkles layered over the painted ring -->
      <RotatingCrownRing variant="sparkle" />
    </template>

    <!-- Top: title block, seated in the dark upper band above the throne -->
    <div ref="content" class="container-royal relative z-10 flex flex-col items-center text-center">
      <div ref="eyebrow" class="mb-2">
        <!-- 3D crown on desktop; lightweight static crown image on mobile/tablet -->
        <Crown3D
          v-if="!lite"
          src="/assets/models/crown.glb"
          poster="/assets/images/crown-duke.png"
          :size="150"
        />
        <img
          v-else
          src="/assets/images/crown-duke.png"
          alt=""
          class="mx-auto h-[88px] w-auto drop-shadow-[0_4px_18px_rgba(212,175,55,0.5)]"
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

    <!-- Bottom: the offer in plain words + CTAs over the marble floor -->
    <div
      ref="ctas"
      class="container-royal relative z-10 flex flex-col items-center gap-5"
    >
      <!-- The house's actual offer — rates read from the progression ladder -->
      <p
        class="hero-offer max-w-xl rounded-full border border-border-gold/40 bg-black/45 px-5 py-2 text-center font-sans text-[11px] leading-5 tracking-[0.04em] text-ink-muted backdrop-blur-sm"
      >
        The Standing Order — <span class="font-semibold tabular-nums text-champagne">{{ offerRange }}</span>
        of every settled bet returns to you. Rates published, no wagering requirements.
      </p>

      <div class="hero-ctas flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
        <GoldButton variant="solid" size="lg" block class="sm:w-auto" @click="enter()">
          {{ enterLabel }}
          <AppIcon name="arrowRight" :size="16" />
        </GoldButton>
        <GoldButton variant="outline" size="lg" block class="sm:w-auto" @click="router.push('/vip')">Explore VIP</GoldButton>
      </div>
    </div>
  </section>
</template>
