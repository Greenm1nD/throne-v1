<script setup lang="ts">
import { ref } from 'vue'
import CrownBadge from '@/components/ui/CrownBadge.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import FontIcon from '@/components/ui/FontIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { footerNav, paymentMethods } from '@/data/navigation'
import { useAuthModal } from '@/composables/useAuthModal'

const { open } = useAuthModal()

// Column order around the centre crest: [Throne, Experience] crest [Support, Connect]
const leftCols = footerNav.slice(0, 2)
const rightCols = footerNav.slice(2)

// Lion crest artwork (includes THRONE + tagline baked in). Until the file is
// dropped at /assets/images/footer-crest.png we fall back to badge + text.
const crestFailed = ref(false)
</script>

<template>
  <footer
    class="veined relative mt-24 bg-cover bg-center"
    style="background-image: linear-gradient(180deg, rgba(5,5,5,0.86), rgba(5,5,5,0.94)), url('/assets/images/texture-marble.webp'); background-color: #08080a"
  >
    <!-- Top rule with centre diamond ornament -->
    <div class="absolute inset-x-0 top-0 flex items-center justify-center">
      <div class="h-px flex-1 bg-gradient-to-r from-transparent via-gold/50 to-gold/60" />
      <span class="mx-2 h-2 w-2 rotate-45 bg-gold-gradient shadow-[0_0_8px_rgba(245,215,122,0.6)]" />
      <div class="h-px flex-1 bg-gradient-to-l from-transparent via-gold/50 to-gold/60" />
    </div>

    <div class="container-royal pb-10 pt-16">
      <!-- Link columns + centre crest -->
      <div
        class="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-[1fr_1fr_auto_1fr_1fr] lg:gap-x-10"
      >
        <!-- Left columns -->
        <div v-for="col in leftCols" :key="col.title">
          <h4 class="font-display text-sm font-semibold uppercase tracking-[0.2em] text-champagne">
            {{ col.title }}
          </h4>
          <div class="mt-2 flex items-center gap-1.5">
            <span class="h-px w-9 bg-gold/40" />
            <span class="h-1 w-1 rotate-45 bg-gold/60" />
          </div>
          <ul class="mt-5 space-y-3.5">
            <li v-for="l in col.links" :key="l.label">
              <a
                href="#"
                class="group flex items-center gap-2.5 font-sans text-[13px] uppercase tracking-[0.08em] text-ink-muted transition-colors hover:text-gold-bright"
              >
                <AppIcon
                  v-if="l.icon"
                  :name="l.icon"
                  :size="15"
                  class="shrink-0 text-gold/70 transition-colors group-hover:text-gold-bright"
                />
                {{ l.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Centre crest -->
        <div
          class="order-first col-span-2 flex flex-col items-center px-4 text-center lg:order-none lg:col-span-1 lg:min-w-[280px]"
        >
          <!-- Lion crest lockup (wordmark + tagline are part of the artwork) -->
          <img
            v-if="!crestFailed"
            :src="'/assets/images/footer-crest.png'"
            alt="THRONE — Built for the Crowned"
            class="w-[280px] drop-shadow-[0_10px_40px_rgba(212,175,55,0.25)]"
            loading="lazy"
            decoding="async"
            @error="crestFailed = true"
          />
          <!-- Fallback until the crest artwork lands -->
          <template v-else>
            <CrownBadge :size="210" />
            <p class="-mt-2 font-display text-3xl font-bold tracking-[0.22em] text-gold-gradient">
              THRONE
            </p>
            <p class="mt-2 font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-champagne/80">
              Built for the Crowned
            </p>
            <span class="mt-3 h-1.5 w-1.5 rotate-45 bg-gold/60" />
          </template>
        </div>

        <!-- Right columns -->
        <div v-for="col in rightCols" :key="col.title">
          <h4 class="font-display text-sm font-semibold uppercase tracking-[0.2em] text-champagne">
            {{ col.title }}
          </h4>
          <div class="mt-2 flex items-center gap-1.5">
            <span class="h-px w-9 bg-gold/40" />
            <span class="h-1 w-1 rotate-45 bg-gold/60" />
          </div>
          <ul class="mt-5 space-y-3.5">
            <li v-for="l in col.links" :key="l.label">
              <a
                href="#"
                class="group flex items-center gap-2.5 font-sans text-[13px] uppercase tracking-[0.08em] text-ink-muted transition-colors hover:text-gold-bright"
              >
                <FontIcon
                  v-if="l.fontIcon"
                  :name="l.fontIcon"
                  class="shrink-0 text-[15px] text-gold/70 transition-colors group-hover:text-gold-bright"
                />
                {{ l.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Concierge · CTA · Security band -->
      <div
        class="mt-14 grid gap-8 rounded-2xl border border-white/5 bg-white/[0.02] px-8 py-8 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-white/5"
      >
        <div class="flex items-center gap-4 lg:pr-8">
          <span
            class="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-border-gold text-champagne"
            style="background: radial-gradient(circle, rgba(212,175,55,0.12), transparent 70%)"
          >
            <AppIcon name="headset" :size="24" />
          </span>
          <div>
            <p class="font-display text-sm font-semibold uppercase tracking-[0.16em] text-gold-gradient">
              Royal Concierge
            </p>
            <p class="mt-1 font-sans text-[11px] uppercase tracking-[0.12em] text-ink-muted">
              24/7 VIP Assistance
            </p>
            <p class="font-sans text-[11px] uppercase tracking-[0.12em] text-ink-dim">
              We are here for you
            </p>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center gap-4 lg:px-8">
          <p class="font-display text-xs font-semibold uppercase tracking-[0.3em] text-champagne">
            Enter a World of Privilege
          </p>
          <GoldButton variant="outline" size="md" @click="open('register')">
            Join the Kingdom <AppIcon name="arrowRight" :size="14" />
          </GoldButton>
        </div>

        <div class="flex items-center gap-4 lg:justify-end lg:pl-8">
          <span
            class="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-border-gold text-champagne"
            style="background: radial-gradient(circle, rgba(212,175,55,0.12), transparent 70%)"
          >
            <AppIcon name="shield" :size="24" />
          </span>
          <div>
            <p class="font-display text-sm font-semibold uppercase tracking-[0.16em] text-gold-gradient">
              Safe &amp; Secure
            </p>
            <p class="mt-1 font-sans text-[11px] uppercase tracking-[0.12em] text-ink-muted">
              Advanced Security
            </p>
            <p class="font-sans text-[11px] uppercase tracking-[0.12em] text-ink-dim">
              Your safety, our priority
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom bar: copyright · payments · responsibility -->
      <div
        class="mt-10 flex flex-col items-center gap-6 border-t border-white/5 pt-8 lg:flex-row lg:justify-between"
      >
        <p class="font-sans text-[11px] uppercase tracking-[0.12em] text-ink-dim">
          © 2026 THRONE. All rights reserved.
        </p>

        <ul class="flex flex-wrap items-center justify-center gap-5">
          <li
            v-for="p in paymentMethods"
            :key="p"
            class="font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-dim transition-colors hover:text-ink-muted"
          >
            {{ p }}
          </li>
        </ul>

        <div class="flex items-center gap-4">
          <span class="font-sans text-[11px] uppercase tracking-[0.14em] text-ink-dim">
            Play Responsibly
          </span>
          <span class="h-4 w-px bg-white/10" />
          <span
            class="grid h-9 w-9 place-items-center rounded-full border border-ink-dim/60 font-sans text-[10px] font-bold text-ink-muted"
          >
            18+
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>
