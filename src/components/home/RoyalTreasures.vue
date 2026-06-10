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

    <div class="mt-7 grid grid-cols-2 gap-6 sm:grid-cols-4">
      <div
        v-for="r in royalTreasures"
        :key="r.title"
        class="flex flex-col items-center gap-3 text-center"
      >
        <IconBadge :icon="r.icon" size="md" />
        <h4
          class="font-sans text-[11px] font-semibold uppercase leading-tight tracking-[0.16em] text-ink-muted"
        >
          {{ r.title }}
        </h4>
      </div>
    </div>
  </div>
</template>
