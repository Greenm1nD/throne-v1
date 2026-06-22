<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'

export interface DistrictTag {
  label: string
  icon: string
}
export interface District {
  title: string
  description: string
  icon: string
  image: string
  alt: string
  tags: DistrictTag[]
  cta: string
  href: string
}

defineProps<{ district: District }>()
</script>

<template>
  <RouterLink
    :to="district.href"
    :aria-label="`${district.title} — ${district.cta}`"
    class="district group relative block min-h-[460px] overflow-hidden rounded-[22px] border border-border-gold/25 transition-all duration-200 ease-out hover:-translate-y-[3px] hover:border-gold hover:shadow-card-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 motion-reduce:transform-none sm:min-h-[520px]"
    data-reveal
  >
    <!-- Cinematic background -->
    <img
      :src="district.image"
      :alt="district.alt"
      loading="lazy"
      decoding="async"
      class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04] motion-reduce:transform-none"
    />
    <div class="pointer-events-none absolute inset-0" style="background: linear-gradient(180deg, rgba(5,5,7,0.55) 0%, rgba(5,5,7,0.2) 34%, rgba(5,5,7,0.72) 66%, rgba(5,5,7,0.95) 100%)" />
    <!-- Gold glow on hover -->
    <div class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style="background: radial-gradient(120% 60% at 50% 100%, rgba(212,175,55,0.16), transparent 55%)" />

    <!-- Icon badge -->
    <div class="absolute left-1/2 top-7 z-10 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full border border-border-gold/50 bg-black/45 text-gold-bright backdrop-blur transition-colors duration-200 group-hover:border-gold">
      <AppIcon :name="district.icon" :size="22" />
    </div>

    <!-- Content -->
    <div class="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-6 pb-7 text-center">
      <h3 class="font-display text-2xl font-semibold tracking-[0.1em] text-gold-gradient sm:text-[1.7rem]">{{ district.title }}</h3>
      <p class="mt-2.5 max-w-[19rem] font-sans text-[13px] leading-6 text-ink-muted">{{ district.description }}</p>

      <!-- Tags -->
      <div class="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span
          v-for="t in district.tags"
          :key="t.label"
          class="inline-flex items-center gap-1.5 rounded-full border border-border-gold/30 bg-black/45 px-2.5 py-1 font-sans text-[9px] font-semibold uppercase tracking-[0.12em] text-champagne/90 backdrop-blur"
        >
          <AppIcon :name="t.icon" :size="10" class="text-gold/80" /> {{ t.label }}
        </span>
      </div>

      <!-- CTA (the whole card is the link) -->
      <span class="cta-sweep mt-6 inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold-gradient px-6 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#1a1407] transition-shadow duration-200 group-hover:shadow-gold-soft">
        {{ district.cta }} <AppIcon name="arrowRight" :size="13" />
      </span>
    </div>
  </RouterLink>
</template>

<style scoped>
/* Light sweep across the CTA on hover */
.cta-sweep { position: relative; }
.cta-sweep::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg, transparent 30%, rgba(255, 255, 255, 0.45) 50%, transparent 70%);
  transform: translateX(-120%);
}
.group:hover .cta-sweep::after { animation: ctaSweep 0.7s ease-out; }
@keyframes ctaSweep { to { transform: translateX(120%); } }
@media (prefers-reduced-motion: reduce) {
  .group:hover .cta-sweep::after { animation: none; }
}
</style>
