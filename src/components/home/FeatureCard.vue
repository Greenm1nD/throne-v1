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
    :class="feature.vip && 'border-border-gold shadow-[0_0_0_1px_rgba(212,175,55,0.4),0_24px_60px_-28px_rgba(0,0,0,0.9)]'"
    data-reveal
  >
    <!-- 16:9 image layer -->
    <div
      v-lazybg="`linear-gradient(180deg, rgba(5,5,5,0.6) 0%, rgba(5,5,5,0.25) 42%, rgba(5,5,5,0.9)), url('${img.src}')`"
      class="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
      :style="{ backgroundColor: '#0d0d10' }"
    />

    <!-- VIP badge -->
    <span
      v-if="feature.vip"
      class="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-border-gold bg-black/50 px-3 py-1 font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-gold-bright backdrop-blur"
    >
      <AppIcon name="crown" :size="11" /> Invite Only
    </span>

    <!-- Hover shine -->
    <span class="shine-beam z-0" />

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
