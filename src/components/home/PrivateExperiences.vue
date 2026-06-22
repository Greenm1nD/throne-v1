<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { useReveal } from '@/composables/useReveal'

/**
 * Private Experiences — three rooms inside the kingdom. Cinematic, minimal text,
 * maximum atmosphere. These read as destinations, not content widgets.
 */
const router = useRouter()
const root = ref<HTMLElement | null>(null)
useReveal(root, { stagger: 0.12 })

const rooms = [
  { title: 'The Royal Tables', sub: 'High Stakes. Higher Standards.', cta: 'Enter Tables', image: '/assets/images/page-casino-hero.webp', to: '/live-casino' },
  { title: 'The Arena', sub: 'Competition. Glory. Legacy.', cta: 'Enter Arena', image: '/assets/images/sportsbook-arena.webp', to: '/sports' },
  { title: 'The Inner Circle', sub: 'Invite Only. Beyond Access.', cta: 'Enter Circle', image: '/assets/images/vip-lounge.webp', to: '/vip' },
]
</script>

<template>
  <section ref="root" class="container-royal pt-16 sm:pt-24">
    <SectionHeader title="Private Experiences" eyebrow="Rooms Within The Kingdom" align="center" />

    <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
      <article v-for="r in rooms" :key="r.title" data-reveal
        class="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-[20px] border border-border-gold/20 transition-all duration-500 hover:border-gold hover:shadow-card-lift"
        @click="router.push(r.to)">
        <div v-lazybg="`linear-gradient(180deg, rgba(5,5,7,0.45) 30%, rgba(5,5,7,0.92)), url('${r.image}')`"
          class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none" :style="{ backgroundColor: '#0a0a0c' }" />
        <div class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style="background: radial-gradient(120% 70% at 50% 100%, rgba(212,175,55,0.16), transparent 55%)" />

        <div class="relative z-10 flex h-full flex-col justify-end p-7">
          <h3 class="font-display text-2xl font-semibold tracking-[0.06em] text-gold-gradient">{{ r.title }}</h3>
          <p class="mt-1.5 font-sans text-[12px] uppercase tracking-[0.14em] text-ink-muted">{{ r.sub }}</p>
          <span class="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-border-gold/50 bg-black/30 px-5 py-2 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-gold-bright backdrop-blur transition-all duration-300 group-hover:border-gold group-hover:bg-gold-gradient group-hover:text-[#1a1407]">
            {{ r.cta }} <AppIcon name="arrowRight" :size="12" />
          </span>
        </div>
      </article>
    </div>
  </section>
</template>
