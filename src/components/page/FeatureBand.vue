<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import FontIcon from '@/components/ui/FontIcon.vue'
import type { BandItem } from '@/data/pages'

/** Bottom features band: circular gold glyph + title + optional subline. */
defineProps<{ items: BandItem[] }>()
</script>

<template>
  <section class="container-royal pt-12 sm:pt-16">
    <div
      class="grid gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] sm:grid-cols-2"
      :class="items.length > 4 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'"
      :style="items.length === 6 ? 'grid-template-columns: repeat(auto-fit, minmax(180px, 1fr))' : ''"
    >
      <div
        v-for="b in items"
        :key="b.title"
        class="group flex items-center gap-3.5 bg-card/60 px-5 py-5"
      >
        <span
          class="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border-gold text-champagne transition-all duration-300 group-hover:text-gold-bright group-hover:shadow-gold-soft"
          style="background: radial-gradient(circle, rgba(212,175,55,0.1), transparent 70%)"
        >
          <FontIcon v-if="b.font" :name="b.font" class="text-[20px]" />
          <AppIcon v-else-if="b.icon" :name="b.icon" :size="20" />
        </span>
        <div>
          <p class="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-champagne">
            {{ b.title }}
          </p>
          <p v-if="b.sub" class="mt-0.5 font-sans text-[11px] leading-snug text-ink-dim">
            {{ b.sub }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
