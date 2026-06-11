<script setup lang="ts">
import CrownBadge from '@/components/ui/CrownBadge.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import FontIcon from '@/components/ui/FontIcon.vue'
import ParticleLayer from '@/components/ui/ParticleLayer.vue'
import { footerColumns } from '@/data/navigation'

const footerSocials = [
  { label: 'Instagram', icon: 'instagram-circle', href: '#instagram' },
  { label: 'X', icon: 'twitter-x', href: '#x' },
  { label: 'YouTube', icon: 'youtube-play', href: '#youtube' },
  { label: 'Telegram', icon: 'telegram', href: '#telegram' },
  { label: 'Discord', icon: 'discord', href: '#discord' },
]
</script>

<template>
  <footer class="marble veined relative mt-20 border-t border-border-gold">
    <!-- top gold accent line -->
    <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

    <div class="container-royal py-16">
      <!-- Main row: links · crest · links -->
      <div class="grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
        <!-- Left links -->
        <ul class="order-2 space-y-3 lg:order-none">
          <li v-for="link in footerColumns[0].links" :key="link">
            <a
              href="#"
              class="font-sans text-[13px] text-ink-muted transition-colors hover:text-gold-bright"
            >
              {{ link }}
            </a>
          </li>
        </ul>

        <!-- Center crest with ornamental flourishes -->
        <div class="relative order-1 flex flex-col items-center px-2 lg:order-none">
          <ParticleLayer :count="12" />

          <div class="relative flex items-center justify-center gap-3">
            <!-- left flourish -->
            <div class="hidden items-center gap-2 text-gold/60 sm:flex">
              <AppIcon name="arrowLeft" :size="14" />
              <span class="h-px w-14 bg-gradient-to-l from-gold/50 to-transparent" />
              <span class="h-1.5 w-1.5 rotate-45 bg-gold/70" />
            </div>

            <CrownBadge :size="112" />

            <!-- right flourish -->
            <div class="hidden items-center gap-2 text-gold/60 sm:flex">
              <span class="h-1.5 w-1.5 rotate-45 bg-gold/70" />
              <span class="h-px w-14 bg-gradient-to-r from-gold/50 to-transparent" />
              <AppIcon name="arrowRight" :size="14" />
            </div>
          </div>

          <p class="mt-4 font-display text-[11px] uppercase tracking-[0.5em] text-ink-dim">
            Built for the Crowned
          </p>

          <!-- Socials -->
          <div class="mt-5 flex gap-3">
            <a
              v-for="s in footerSocials"
              :key="s.label"
              :href="s.href"
              :aria-label="s.label"
              class="grid h-9 w-9 place-items-center rounded-full border border-border-gold text-[15px] text-champagne transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold-bright"
            >
              <FontIcon :name="s.icon" />
            </a>
          </div>
        </div>

        <!-- Right links -->
        <ul class="order-3 space-y-3 lg:order-none lg:text-right">
          <li v-for="link in footerColumns[1].links" :key="link">
            <a
              href="#"
              class="font-sans text-[13px] text-ink-muted transition-colors hover:text-gold-bright"
            >
              {{ link }}
            </a>
          </li>
        </ul>
      </div>

      <p class="mt-12 border-t border-white/5 pt-8 text-center font-sans text-[11px] text-ink-dim">
        © 2026 THRONE · VIP Gaming Club. Play responsibly.
      </p>
    </div>
  </footer>
</template>
