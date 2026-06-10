<script setup lang="ts">
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { assets } from '@/data/assets'
import type { Feature } from '@/data/features'

const props = defineProps<{ feature: Feature }>()
const img = assets[props.feature.image]
</script>

<template>
  <article
    class="card-lux group relative flex h-[300px] flex-col justify-between overflow-hidden p-6"
    data-reveal
  >
    <!-- 16:9 image layer -->
    <div
      class="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
      :style="{
        backgroundImage: `linear-gradient(180deg, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.25) 40%, rgba(5,5,5,0.85)), url('${img.src}')`,
        backgroundColor: '#0d0d10',
      }"
    />

    <!-- Top-left: title, subtitle, CTA -->
    <div class="relative z-10 flex flex-col items-start gap-3">
      <div>
        <h3 class="font-display text-2xl font-semibold tracking-[0.08em] text-gold-gradient">
          {{ feature.title }}
        </h3>
        <p class="mt-1 font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-ink-muted">
          {{ feature.subtitle }}
        </p>
      </div>
      <GoldButton variant="outline" size="sm">
        {{ feature.cta }} <AppIcon name="arrowRight" :size="13" />
      </GoldButton>
    </div>

    <!-- Bottom meta row (only when the feature provides one) -->
    <div
      v-if="feature.meta.length"
      class="relative z-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-3"
    >
      <span
        v-for="m in feature.meta"
        :key="m.label"
        class="flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.12em] text-ink-muted"
      >
        <AppIcon :name="m.icon" :size="15" class="text-gold/70" />
        {{ m.label }}
      </span>
    </div>
  </article>
</template>
