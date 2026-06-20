<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import { categoryNav } from '@/data/categoryPages'

/**
 * Primary navigation — a premium floating capsule under the slim top bar.
 * Champagne-gold active state (center-out underline + restrained pill glow),
 * muted inactive, smooth hover. Throne Club carries a slightly warmer, stronger
 * treatment. Diamond + short-line ornaments flank both ends (desktop). Centred
 * on desktop, horizontal-scroll on tablet/mobile.
 */
const route = useRoute()
const router = useRouter()
const isActive = (to: string) =>
  to === '/' ? route.path === '/' : route.path === to || route.path.startsWith(to + '/')
</script>

<template>
  <div class="category-nav container-royal mt-3">
    <nav
      class="category-capsule flex items-center rounded-2xl px-2"
      aria-label="Primary"
    >
      <!-- Left ornament: diamond → short line -->
      <div class="hidden shrink-0 items-center gap-2 pl-2 pr-3 lg:flex" aria-hidden="true">
        <span class="ornament-diamond" />
        <span class="h-px w-10 bg-gradient-to-r from-gold/55 to-transparent" />
      </div>

      <ul class="flex flex-1 justify-start gap-0.5 overflow-x-auto py-2.5 [scrollbar-width:none] lg:justify-center lg:overflow-visible [&::-webkit-scrollbar]:hidden">
        <li v-for="c in categoryNav" :key="c.to" class="shrink-0">
          <button
            class="nav-item group relative flex items-center gap-2 rounded-xl px-3 py-2 font-sans text-[12.5px] font-medium tracking-[0.03em] transition-colors duration-200 ease-out xl:px-3.5"
            :class="[
              isActive(c.to)
                ? 'is-active text-gold-bright'
                : 'text-white/[0.58] hover:text-white/[0.86]',
              c.special && 'is-special',
            ]"
            :aria-current="isActive(c.to) ? 'page' : undefined"
            @click="router.push(c.to)"
          >
            <!-- restrained active pill glow -->
            <span v-if="isActive(c.to)" class="pointer-events-none absolute inset-0 rounded-xl bg-gold/[0.07]" aria-hidden="true" />
            <AppIcon
              :name="c.icon"
              :size="17"
              class="nav-icon relative transition-[color,transform] duration-200 ease-out group-hover:-translate-y-px motion-reduce:transform-none"
              :class="isActive(c.to) ? 'text-gold-bright' : 'text-white/[0.46] group-hover:text-gold/90'"
            />
            <span class="relative whitespace-nowrap">{{ c.label }}</span>
            <!-- center-out underline -->
            <span
              class="nav-underline pointer-events-none absolute -bottom-px left-2.5 right-2.5 h-0.5 origin-center rounded-full bg-gold-gradient transition-transform duration-200 ease-out motion-reduce:transition-none xl:left-3 xl:right-3"
              :class="[
                isActive(c.to) ? 'scale-x-100 opacity-100 shadow-[0_0_8px_rgba(245,215,122,0.75)]' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-60',
                c.special && 'group-hover:shadow-[0_0_10px_rgba(245,215,122,0.8)]',
              ]"
            />
          </button>
        </li>
      </ul>

      <!-- Right ornament: short line → diamond -->
      <div class="hidden shrink-0 items-center gap-2 pl-3 pr-2 lg:flex" aria-hidden="true">
        <span class="h-px w-10 bg-gradient-to-l from-gold/55 to-transparent" />
        <span class="ornament-diamond" />
      </div>
    </nav>
  </div>
</template>

<style scoped>
/* Floating luxury capsule — dark glass, faint gold edge, soft depth. */
.category-capsule {
  background: rgba(8, 8, 8, 0.92);
  border: 1px solid rgba(212, 175, 55, 0.12);
  backdrop-filter: blur(14px) saturate(1.05);
  -webkit-backdrop-filter: blur(14px) saturate(1.05);
  box-shadow:
    inset 0 1px 0 rgba(245, 215, 122, 0.05),
    inset 0 0 24px rgba(0, 0, 0, 0.5),
    0 12px 30px -16px rgba(0, 0, 0, 0.85);
}
.ornament-diamond {
  height: 9px;
  width: 9px;
  rotate: 45deg;
  background: linear-gradient(135deg, #f5d76e, #d4af37);
  box-shadow: 0 0 8px rgba(245, 215, 122, 0.7);
  border-radius: 1px;
}
/* Throne Club: a touch warmer + stronger glow on hover (when not active). */
.nav-item.is-special:hover:not(.is-active) {
  color: #f7e08f;
}
.nav-item.is-special:hover:not(.is-active) .nav-icon {
  color: #f7e08f;
  filter: drop-shadow(0 0 6px rgba(245, 215, 122, 0.55));
}
</style>
