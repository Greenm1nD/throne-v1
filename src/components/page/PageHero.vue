<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

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
  }>(),
  { icon: 'crown', posY: '50%' },
)

const emit = defineEmits<{ primary: []; secondary: [] }>()

const content = ref<HTMLElement | null>(null)
const bgEl = ref<HTMLElement | null>(null)

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

const bg = `linear-gradient(90deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.62) 32%, rgba(5,5,5,0.18) 58%, rgba(5,5,5,0.35) 100%), url('${props.image}'), url('${props.fallback}')`

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce || !content.value) return
  gsap.from(content.value.children, {
    opacity: 0,
    y: 22,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.09,
    delay: 0.1,
  })
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <section
    class="grain relative flex min-h-[500px] items-center overflow-hidden lg:min-h-[640px]"
  >
    <div
      ref="bgEl"
      class="absolute inset-0 bg-cover"
      :style="{ backgroundImage: bg, backgroundColor: '#07070a', backgroundPosition: `center ${posY}` }"
    />

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
