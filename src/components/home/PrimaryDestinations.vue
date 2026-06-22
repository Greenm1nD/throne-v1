<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import { useReveal } from '@/composables/useReveal'

/**
 * Primary platform gateways — Casino · Live Casino · Sports. Three cinematic
 * cards of equal weight, each a single clear action into the product.
 */
const router = useRouter()
const root = ref<HTMLElement | null>(null)
useReveal(root, { stagger: 0.12 })

const destinations = [
  { title: 'Casino', lines: ['The private slot vault', 'Endless entertainment'], image: '/assets/images/dest-casino.webp', to: '/casino' },
  { title: 'Live Casino', lines: ['High-limit roulette salon', 'Real dealers, real glory'], image: '/assets/images/dest-live.webp', to: '/live-casino' },
  { title: 'Sports', lines: ['Your private stadium suite', 'Bet on your passion'], image: '/assets/images/dest-sports.webp', to: '/sports' },
]
</script>

<template>
  <section ref="root" class="container-royal pt-12 sm:pt-16">
    <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
      <article v-for="d in destinations" :key="d.title" data-reveal
        class="group relative aspect-[16/11] cursor-pointer overflow-hidden rounded-[20px] border border-border-gold/20 transition-all duration-500 hover:border-gold hover:shadow-card-lift md:aspect-[4/5] lg:aspect-[16/11]"
        @click="router.push(d.to)">
        <div v-lazybg="`linear-gradient(105deg, rgba(4,4,5,0.94) 8%, rgba(4,4,5,0.55) 48%, rgba(4,4,5,0.2)), url('${d.image}')`"
          class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none"
          :style="{ backgroundColor: '#0a0a0c' }" />
        <!-- gold hairline shimmer on hover -->
        <div class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style="background: radial-gradient(120% 80% at 0% 100%, rgba(212,175,55,0.12), transparent 55%)" />

        <div class="relative z-10 flex h-full flex-col justify-between p-6 sm:p-7">
          <div>
            <h3 class="font-display text-3xl font-semibold uppercase tracking-[0.14em] text-gold-gradient sm:text-[2rem]">{{ d.title }}</h3>
            <div class="mt-3 space-y-0.5">
              <p v-for="l in d.lines" :key="l" class="font-sans text-[13px] leading-relaxed text-ink-muted">{{ l }}</p>
            </div>
          </div>
          <span class="inline-flex w-fit items-center gap-2 rounded-full border border-border-gold/50 bg-black/30 px-5 py-2 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-gold-bright backdrop-blur transition-all duration-300 group-hover:border-gold group-hover:bg-gold-gradient group-hover:text-[#1a1407]">
            Play Now <AppIcon name="arrowRight" :size="13" />
          </span>
        </div>
      </article>
    </div>
  </section>
</template>
