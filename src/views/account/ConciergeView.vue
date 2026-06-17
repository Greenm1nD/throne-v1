<script setup lang="ts">
import AccountPanel from '@/components/account/AccountPanel.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { user } from '@/data/account'

// A dedicated, named host — the heart of the high-net-worth experience.
// A name and a face turn "support" into personal service.
const host = {
  name: 'Seraphina Vale',
  initials: 'SV',
  title: 'Your Personal Concierge',
  reply: 'Replies within 2 minutes',
  hours: 'At your side, 24/7',
  langs: 'EN · KA · FR · AR',
}

const services = [
  { icon: 'crown', t: 'Private Tables', d: 'Reserved live tables with elevated limits, arranged on request.' },
  { icon: 'gift', t: 'Bespoke Offers', d: 'Bonuses tailored to your play, not the public board.' },
  { icon: 'calendar', t: 'Court Events', d: 'Invitations to tournaments and gatherings of the Inner Circle.' },
  { icon: 'bolt', t: 'Instant Resolutions', d: 'Your requests bypass every queue in the kingdom.' },
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">Support</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">VIP Concierge</h1>
    </div>

    <div class="group relative overflow-hidden rounded-2xl border border-border-gold shadow-card-glow">
      <div v-lazybg="`linear-gradient(90deg, rgba(5,5,5,0.94) 35%, rgba(5,5,5,0.4)), url('/assets/images/vip-lounge.webp'), url('/assets/images/vip-club.webp')`"
        class="absolute inset-0 bg-cover bg-center" />
      <div class="relative z-10 px-7 py-10 sm:px-10">
        <p class="eyebrow mb-2">At your service, {{ user.tier }} {{ user.name }}</p>
        <h2 class="font-display text-2xl font-bold tracking-[0.1em] text-gold-gradient">The Royal Concierge</h2>
        <p class="mt-3 max-w-xl font-sans text-[13px] leading-relaxed text-ink-muted">
          You are not assigned a queue — you are assigned a person. One word, and it is done.
        </p>

        <!-- Your named host: monogram crest, live presence, the promises that matter -->
        <div class="mt-7 flex flex-col gap-5 rounded-xl border border-border-gold/50 bg-black/35 p-5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center gap-4">
            <span
              class="relative grid h-14 w-14 shrink-0 place-items-center rounded-full border border-border-gold font-display text-base font-bold tracking-[0.08em] text-gold-gradient"
              style="background: radial-gradient(circle, rgba(212,175,55,0.16), transparent 72%)"
              aria-hidden="true"
            >
              {{ host.initials }}
              <span class="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-bg bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
            </span>
            <div>
              <p class="eyebrow mb-0.5">{{ host.title }}</p>
              <p class="font-display text-base font-semibold tracking-[0.06em] text-ink">{{ host.name }}</p>
              <p role="status" class="mt-0.5 flex items-center gap-1.5 font-sans text-[11px] font-medium text-emerald-300/90">
                <span class="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
                Online now · {{ host.reply }}
              </p>
            </div>
          </div>
          <dl class="flex shrink-0 gap-6 border-t border-border-gold/30 pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
            <div>
              <dt class="font-sans text-[10px] uppercase tracking-[0.18em] text-ink-dim">Availability</dt>
              <dd class="mt-1 font-sans text-[12px] text-champagne">{{ host.hours }}</dd>
            </div>
            <div>
              <dt class="font-sans text-[10px] uppercase tracking-[0.18em] text-ink-dim">Speaks</dt>
              <dd class="mt-1 font-sans text-[12px] text-champagne">{{ host.langs }}</dd>
            </div>
          </dl>
        </div>

        <div class="mt-6 flex flex-wrap gap-3">
          <GoldButton variant="solid" size="md"><AppIcon name="headset" :size="15" /> Message {{ host.name.split(' ')[0] }}</GoldButton>
          <RouterLink to="/account/contact"><GoldButton variant="outline" size="md">Leave a Message</GoldButton></RouterLink>
        </div>
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <AccountPanel v-for="s in services" :key="s.t">
        <div class="flex items-start gap-4">
          <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border-gold/60 text-champagne" style="background: radial-gradient(circle, rgba(212,175,55,0.08), transparent 70%)">
            <AppIcon :name="s.icon" :size="17" />
          </span>
          <div>
            <p class="font-display text-[14px] font-semibold tracking-[0.1em] text-ink">{{ s.t }}</p>
            <p class="mt-1 font-sans text-[12px] leading-relaxed text-ink-dim">{{ s.d }}</p>
          </div>
        </div>
      </AccountPanel>
    </div>
  </div>
</template>
