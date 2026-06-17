<script setup lang="ts">
import FontIcon from '@/components/ui/FontIcon.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { kingdomPage } from '@/data/pages'

const masters = kingdomPage.gameMasters
const initials = (name: string) => name.replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase()
</script>

<template>
  <section class="container-royal pt-12 sm:pt-16">
    <div class="mb-6">
      <p class="eyebrow mb-1">Who rules each table</p>
      <h3 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Masters of the Games</h3>
    </div>

    <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <div
        v-for="m in masters"
        :key="m.game"
        class="card-lux flex flex-col items-center gap-2 p-5 text-center hover:translate-y-0"
        :class="m.you && 'ring-1 ring-gold/40'"
        data-reveal
      >
        <span class="text-[26px] leading-none text-gold/80"><FontIcon :name="m.font" /></span>
        <p class="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-ink-dim">{{ m.game }}</p>

        <span class="relative mt-1">
          <span class="grid h-11 w-11 place-items-center rounded-full border border-border-gold/50 font-display text-[13px] font-bold text-champagne" style="background: radial-gradient(circle, rgba(212,175,55,0.12), transparent 72%)">
            {{ initials(m.name) }}
          </span>
          <img :src="m.crown" alt="" class="absolute -bottom-1 -right-1 h-4 w-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]" />
        </span>

        <p class="font-sans text-[13px] font-semibold text-ink">
          {{ m.name }}
          <span v-if="m.you" class="ml-1 align-middle font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-gold-bright">You</span>
        </p>
        <p class="flex items-center gap-1 font-display text-[13px] font-bold tabular-nums text-gold-gradient">
          <AppIcon name="crown" :size="12" class="text-gold/70" />{{ m.points.toLocaleString() }}
        </p>
      </div>
    </div>
  </section>
</template>
