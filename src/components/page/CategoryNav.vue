<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import { categoryNav } from '@/data/categoryPages'

/**
 * The single primary navigation line — a full-width, integrated bar under the
 * slim header (products first, then THRONE sections). Premium underline active
 * state (not pill chips); centred on desktop, horizontal-scroll on mobile.
 */
const route = useRoute()
const router = useRouter()
const isActive = (to: string) =>
  to === '/' ? route.path === '/' : route.path === to || route.path.startsWith(to + '/')
</script>

<template>
  <nav class="category-nav border-y border-white/5 bg-black/30 backdrop-blur" aria-label="Primary">
    <div class="container-royal">
      <ul class="flex justify-start gap-1 overflow-x-auto py-2 [scrollbar-width:none] lg:justify-center [&::-webkit-scrollbar]:hidden">
        <li v-for="c in categoryNav" :key="c.to" class="shrink-0">
          <button
            class="group relative flex items-center gap-2 px-3.5 py-2 font-sans text-[12.5px] font-medium tracking-[0.04em] transition-colors xl:px-4"
            :class="isActive(c.to) ? 'text-gold-bright' : 'text-ink-muted hover:text-ink'"
            :aria-current="isActive(c.to) ? 'page' : undefined"
            @click="router.push(c.to)"
          >
            <AppIcon :name="c.icon" :size="15" :class="isActive(c.to) ? 'text-gold-bright' : 'text-gold/60 group-hover:text-gold/90'" />
            <span class="whitespace-nowrap">{{ c.label }}</span>
            <!-- active underline + diamond, matching the old header nav -->
            <span class="absolute -bottom-0.5 left-3.5 right-3.5 h-px bg-gold transition-all duration-300 xl:left-4 xl:right-4"
              :class="isActive(c.to) ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'" />
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>
