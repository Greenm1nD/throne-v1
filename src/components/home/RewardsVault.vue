<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { useReveal } from '@/composables/useReveal'

/**
 * Member Rewards Vault — achievement-driven progression (not luxury flexing).
 * Milestones unlock privileges; the next one shows live progress.
 */
const router = useRouter()
const root = ref<HTMLElement | null>(null)
useReveal(root, { stagger: 0.1 })

const milestones = [
  { xp: '25,000 XP', label: 'Private Cashback', icon: 'star', locked: false },
  { xp: '50,000 XP', label: 'Elite Reward', icon: 'shield', locked: false },
  { xp: '100,000 XP', label: "King's Gift", icon: 'gift', locked: false },
  { xp: '250,000 XP', label: 'Legacy Status', icon: 'lock', locked: true },
]
</script>

<template>
  <section ref="root" class="container-royal pt-16 sm:pt-24">
    <div class="overflow-hidden rounded-[22px] border border-border-gold/20 bg-cover bg-center p-6 sm:p-9"
      style="background-image: linear-gradient(180deg, rgba(11,11,14,0.86), rgba(7,7,9,0.94)), url('/assets/images/texture-marble.webp')" data-reveal>
      <div class="grid grid-cols-1 gap-7 lg:grid-cols-4 lg:gap-8">
        <!-- Intro -->
        <div class="lg:col-span-1">
          <p class="eyebrow">Earned, Never Given</p>
          <h2 class="mt-1 font-display text-2xl font-semibold tracking-[0.12em] text-gold-gradient">Member Rewards Vault</h2>
          <p class="mt-3 font-sans text-[13px] leading-relaxed text-ink-muted">Achievements unlock privileges. Privileges unlock the kingdom.</p>
          <GoldButton variant="solid" size="sm" class="mt-6" @click="router.push('/rewards')">Open Vault <AppIcon name="arrowRight" :size="13" /></GoldButton>
        </div>

        <!-- Milestones -->
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-3 lg:grid-cols-5">
          <!-- Next milestone -->
          <div class="col-span-2 flex flex-col justify-between rounded-[16px] border border-gold/40 bg-black/35 p-4 shadow-[inset_0_1px_0_rgba(245,215,122,0.1)]">
            <div>
              <p class="font-sans text-[9px] uppercase tracking-[0.18em] text-champagne/70">Next Milestone</p>
              <p class="mt-1 font-display text-xl font-bold tracking-[0.06em] text-gold-gradient">15,000 XP</p>
              <p class="font-sans text-[11px] text-ink-muted">Royal Bonus</p>
            </div>
            <div class="mt-4">
              <div class="h-2 w-full overflow-hidden rounded-full bg-white/[0.08]">
                <div class="h-full rounded-full bg-gold-gradient shadow-[0_0_10px_rgba(245,215,122,0.5)]" style="width: 83%" />
              </div>
              <p class="mt-2 text-right font-sans text-[10px] tabular-nums text-ink-dim">12,450 / 15,000</p>
            </div>
          </div>

          <!-- Locked/unlocked tiers -->
          <div v-for="m in milestones" :key="m.label"
            class="group flex flex-col items-center justify-center gap-2.5 rounded-[16px] border border-border-gold/15 bg-black/25 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-border-gold/50"
            :class="m.locked ? 'opacity-70' : ''">
            <span class="grid h-11 w-11 place-items-center rounded-full border border-border-gold/40 transition-colors group-hover:border-gold"
              :class="m.locked ? 'text-ink-dim' : 'text-gold-bright'">
              <AppIcon :name="m.icon" :size="18" />
            </span>
            <p class="font-display text-[13px] font-bold tabular-nums text-champagne">{{ m.xp }}</p>
            <p class="font-sans text-[10px] uppercase tracking-[0.1em] text-ink-dim">{{ m.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
