<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import { kingdomPage } from '@/data/pages'

const champions = kingdomPage.hallOfKings
const orders = kingdomPage.orders
const initials = (name: string) => name.replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase()
</script>

<template>
  <section class="container-royal pt-12 sm:pt-16">
    <div class="mb-6">
      <p class="eyebrow mb-1">Enshrined forever</p>
      <h3 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">The Hall of Kings</h3>
    </div>

    <!-- Past champions -->
    <div class="grid gap-4 sm:grid-cols-3">
      <article
        v-for="c in champions"
        :key="c.season"
        class="card-lux flex flex-col items-center gap-2 p-6 text-center hover:translate-y-0"
        data-reveal
      >
        <span class="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim">{{ c.season }} Champion</span>
        <img :src="c.crown" alt="" class="h-12 w-auto drop-shadow-[0_0_16px_rgba(245,215,122,0.6)]" loading="lazy" decoding="async" />
        <span class="grid h-12 w-12 place-items-center rounded-full border border-border-gold/50 font-display text-[14px] font-bold text-champagne" style="background: radial-gradient(circle, rgba(212,175,55,0.12), transparent 72%)">
          {{ initials(c.name) }}
        </span>
        <p class="font-display text-lg font-bold tracking-[0.06em] text-gold-gradient">{{ c.name }}</p>
        <p class="font-sans text-[10px] uppercase tracking-[0.14em] text-ink-dim">{{ c.tier }} · won {{ c.prize }}</p>
        <p class="mt-1 font-sans text-[12px] italic leading-relaxed text-ink-muted">“{{ c.quote }}”</p>
      </article>
    </div>

    <!-- Orders of merit -->
    <h4 class="mb-4 mt-8 font-display text-sm font-semibold uppercase tracking-[0.2em] text-champagne">Orders of Merit</h4>
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
      <div
        v-for="o in orders"
        :key="o.name"
        class="card-lux flex flex-col items-center gap-2 p-4 text-center hover:translate-y-0"
        :class="!o.unlocked && 'opacity-55'"
        data-reveal
      >
        <span
          class="relative grid h-12 w-12 place-items-center rounded-full border"
          :class="o.unlocked ? 'border-border-gold text-gold-bright' : 'border-border-gold/20 text-ink-dim'"
          :style="o.unlocked ? 'background: radial-gradient(circle, rgba(212,175,55,0.14), transparent 70%)' : ''"
        >
          <AppIcon :name="o.icon" :size="19" />
          <span v-if="!o.unlocked" class="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full border border-border-gold/20 bg-surface text-ink-dim">
            <AppIcon name="lock" :size="10" />
          </span>
        </span>
        <p class="font-sans text-[11px] font-bold uppercase tracking-[0.1em]" :class="o.unlocked ? 'text-champagne' : 'text-ink-muted'">{{ o.name }}</p>
        <p class="font-sans text-[10px] leading-snug text-ink-dim">{{ o.desc }}</p>
      </div>
    </div>
  </section>
</template>
