<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import FontIcon from '@/components/ui/FontIcon.vue'
import type { StripItem } from '@/data/pages'

/** Horizontal category rail: gold glyph + label, separators, active underline. */
defineProps<{ items: StripItem[] }>()
</script>

<template>
  <section class="container-royal -mt-9 relative z-20">
    <div
      class="flex items-stretch overflow-x-auto rounded-2xl border border-white/5 bg-card/90 shadow-card-glow backdrop-blur [scrollbar-width:none]"
    >
      <button
        v-for="(item, i) in items"
        :key="item.label"
        class="group relative flex min-w-[110px] flex-1 flex-col items-center gap-2.5 px-4 py-5 transition-colors hover:bg-gold/[0.04]"
        :class="i > 0 && 'border-l border-white/5'"
      >
        <span
          class="text-[26px] leading-none transition-all duration-300"
          :class="item.active ? 'text-gold-bright' : 'text-gold/80 group-hover:text-gold-bright'"
        >
          <FontIcon v-if="item.font" :name="item.font" />
          <AppIcon v-else-if="item.icon" :name="item.icon" :size="26" />
        </span>
        <span
          class="max-w-[130px] text-center font-sans text-[10px] font-semibold uppercase leading-tight tracking-[0.14em]"
          :class="item.active ? 'text-gold-bright' : 'text-ink-muted group-hover:text-ink'"
        >
          {{ item.label }}
        </span>
        <span
          class="absolute bottom-2 h-px bg-gold transition-all duration-300"
          :class="item.active ? 'w-8' : 'w-0 group-hover:w-8'"
        />
      </button>
    </div>
  </section>
</template>
