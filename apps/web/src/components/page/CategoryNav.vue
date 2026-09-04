<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import { categoryNav } from '@/data/categoryPages'

/**
 * The single primary navigation line — a full-width, integrated bar under the
 * slim header. Products first, then THRONE sections. Champagne-gold underline +
 * glow on active; muted inactive. Decorative diamond + gold-line ornaments flank
 * both ends on desktop (reference). Centred on desktop, horizontal-scroll on mobile.
 */
const route = useRoute()
const router = useRouter()
const isActive = (to: string) =>
  to === '/' ? route.path === '/' : route.path === to || route.path.startsWith(to + '/')
</script>

<template>
  <nav class="category-nav border-y border-border-gold/10 bg-black/35 backdrop-blur" aria-label="Primary">
    <div class="container-royal flex items-center">
      <!-- Left ornament: diamond → line -->
      <div class="hidden flex-1 items-center gap-2 pr-4 lg:flex" aria-hidden="true">
        <span class="h-1.5 w-1.5 rotate-45 bg-gold-gradient shadow-[0_0_6px_rgba(245,215,122,0.7)]" />
        <span class="h-px flex-1 bg-gradient-to-r from-gold/45 to-transparent" />
      </div>

      <ul class="flex shrink-0 justify-start gap-0.5 overflow-x-auto py-2 [scrollbar-width:none] lg:overflow-visible [&::-webkit-scrollbar]:hidden">
        <li v-for="c in categoryNav" :key="c.to" class="shrink-0">
          <button
            class="group relative flex items-center gap-2 px-3 py-2 font-sans text-[12.5px] font-medium tracking-[0.04em] transition-colors duration-200 xl:px-4"
            :class="isActive(c.to) ? 'text-gold-bright' : 'text-ink-muted hover:text-ink'"
            :aria-current="isActive(c.to) ? 'page' : undefined"
            @click="router.push(c.to)"
          >
            <AppIcon :name="c.icon" :size="16" :class="isActive(c.to) ? 'text-gold-bright' : 'text-white/50 group-hover:text-gold/90'" />
            <span class="whitespace-nowrap">{{ c.label }}</span>
            <!-- active underline + glow (fades in on hover) -->
            <span
              class="absolute -bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-gold-gradient transition-all duration-200 xl:left-4 xl:right-4"
              :class="isActive(c.to) ? 'opacity-100 shadow-[0_0_8px_rgba(245,215,122,0.7)]' : 'opacity-0 group-hover:opacity-40'"
            />
          </button>
        </li>
      </ul>

      <!-- Right ornament: line → diamond -->
      <div class="hidden flex-1 items-center gap-2 pl-4 lg:flex" aria-hidden="true">
        <span class="h-px flex-1 bg-gradient-to-l from-gold/45 to-transparent" />
        <span class="h-1.5 w-1.5 rotate-45 bg-gold-gradient shadow-[0_0_6px_rgba(245,215,122,0.7)]" />
      </div>
    </div>
  </nav>
</template>
