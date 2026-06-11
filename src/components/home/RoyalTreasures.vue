<script setup lang="ts">
import IconBadge from '@/components/ui/IconBadge.vue'
import { royalTreasures } from '@/data/rewards'
</script>

<template>
  <div
    class="card-lux h-full p-7 hover:translate-y-0 hover:shadow-card-glow sm:p-8"
    data-reveal
  >
    <h3 class="font-display text-xl font-semibold tracking-[0.14em] text-gold-gradient">
      Royal Treasures
    </h3>

    <div class="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
      <article
        v-for="r in royalTreasures"
        :key="r.title"
        class="group/reward flex flex-col items-center gap-3 rounded-xl border border-transparent p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:border-border-gold hover:bg-gold/[0.04]"
      >
        <IconBadge :icon="r.icon" size="md" />
        <div>
          <h4
            class="font-sans text-[11px] font-semibold uppercase leading-tight tracking-[0.16em] text-ink-muted transition-colors group-hover/reward:text-gold-bright"
          >
            {{ r.title }}
          </h4>
          <p class="mt-1.5 font-sans text-[10px] leading-snug text-ink-dim">
            {{ r.description }}
          </p>
        </div>
      </article>
    </div>
  </div>
</template>
