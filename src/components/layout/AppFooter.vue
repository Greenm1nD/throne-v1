<script setup lang="ts">
import CrownLogo from '@/components/ui/CrownLogo.vue'
import FontIcon from '@/components/ui/FontIcon.vue'
import { footerColumns } from '@/data/navigation'

// Real brand glyphs from the bundled fontello casino icon font.
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
      <div class="grid grid-cols-2 items-start gap-10 lg:grid-cols-3">
        <!-- Left links -->
        <ul class="space-y-3">
          <li v-for="link in footerColumns[0].links" :key="link">
            <a
              href="#"
              class="font-sans text-[13px] text-ink-muted transition-colors hover:text-gold-bright"
            >
              {{ link }}
            </a>
          </li>
        </ul>

        <!-- Center: crest + tagline + socials -->
        <div class="order-last col-span-2 flex flex-col items-center lg:order-none lg:col-span-1">
          <CrownLogo :size="52" :with-text="false" />
          <p class="mt-4 font-display text-[11px] uppercase tracking-[0.5em] text-ink-dim">
            Built for the Crowned
          </p>
          <div class="mt-5 flex gap-3">
            <a
              v-for="s in footerSocials"
              :key="s.label"
              :href="s.href"
              :aria-label="s.label"
              class="grid h-10 w-10 place-items-center rounded-full border border-border-gold text-[18px] text-champagne transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold-bright"
            >
              <FontIcon :name="s.icon" />
            </a>
          </div>
        </div>

        <!-- Right links -->
        <ul class="space-y-3 lg:text-right">
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
