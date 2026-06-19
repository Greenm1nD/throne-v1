<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import { categoryNav } from '@/data/categoryPages'

/**
 * Shared product category strip (Sport · Live · E-Sport · Casino · Live Casino ·
 * Virtual · Games · Poker). Horizontal scroll on small screens, active item in
 * gold. Rendered at the top of each category page so the whole set is one tap away.
 */
const route = useRoute()
const router = useRouter()
const isActive = (to: string) => route.path === to || route.path.startsWith(to + '/')
</script>

<template>
  <nav class="container-royal" aria-label="Categories">
    <ul class="flex gap-1 overflow-x-auto rounded-2xl border border-white/5 bg-card/80 px-2 py-2 backdrop-blur [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <li v-for="c in categoryNav" :key="c.to" class="shrink-0">
        <button
          class="flex items-center gap-2 rounded-xl px-4 py-2.5 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors"
          :class="isActive(c.to) ? 'bg-gold/[0.1] text-gold-bright' : 'text-ink-muted hover:bg-white/[0.04] hover:text-champagne'"
          :aria-current="isActive(c.to) ? 'page' : undefined"
          @click="router.push(c.to)"
        >
          <AppIcon :name="c.icon" :size="16" :class="isActive(c.to) ? 'text-gold-bright' : 'text-gold/70'" />
          {{ c.label }}
        </button>
      </li>
    </ul>
  </nav>
</template>
