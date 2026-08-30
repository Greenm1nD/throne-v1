<script setup lang="ts">
/**
 * CampaignLanderView — one shared lander, configured per traffic source by a
 * manifest entry in src/data/campaigns.ts. Fast and single-purpose: brand band,
 * campaign headline, the rakeback calculator, one register CTA, trust strip.
 * No hero video, no extra chrome. Unknown campaign ids render the default
 * campaign — a shared link must never dead-end.
 */
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import GoldButton from '@/components/ui/GoldButton.vue'
import RakebackCalculator from '@/components/campaign/RakebackCalculator.vue'
import TrustStrip from '@/components/campaign/TrustStrip.vue'
import { campaignById, type CampaignSource } from '@/data/campaigns'
import { RANKS, formatBp, totalReturnBp } from '@/data/progression'
import { useAuthModal } from '@/composables/useAuthModal'
import { captureAttribution } from '@/utils/attribution'

const route = useRoute()
const authModal = useAuthModal()

const campaign = computed(() => {
  const raw = route.params.campaignId
  return campaignById(typeof raw === 'string' ? raw : '')
})

/** Plain-word label for the source tag in the eyebrow — no hidden targeting. */
const SOURCE_LABELS: Record<CampaignSource, string> = {
  'affiliate-review': 'For review readers',
  'kick-streamer': 'For the stream audience',
  'push-network': 'From a push notification',
  direct: 'Direct',
}

/**
 * Proof facts per campaign. Every figure is computed from the progression
 * ladder; the one demo-only line says so on its face.
 */
const proofFacts = computed<string[]>(() => {
  const first = RANKS[0]
  const last = RANKS[RANKS.length - 1]
  switch (campaign.value.proof) {
    case 'rates':
      return [
        `${RANKS.length} ranks, every rate published`,
        `${formatBp(totalReturnBp(first))} – ${formatBp(totalReturnBp(last))} of tribute returned`,
        'The same ladder for every member',
      ]
    case 'trust':
      return [
        '18+ only',
        'Writ of Restraint — deposit & loss limits, set by you',
        'Rank never decays',
      ]
    case 'sla':
      return [
        'Payout times published as measured medians',
        'Demo figures until the cashier is live',
        'Priority withdrawals from Duke — rank 3 of 6',
      ]
  }
})

// First-touch capture of btag / click_id / utm_* / sub1..5 — frozen thereafter.
onMounted(captureAttribution)
</script>

<template>
  <main class="flex min-h-[70vh] flex-col bg-bg">
    <!-- Slim brand band -->
    <div class="border-b border-border-gold/25 bg-surface/60">
      <div class="container-royal flex h-12 items-center justify-between">
        <span class="font-display text-sm font-bold tracking-royal text-gold">THRONE</span>
        <span class="font-sans text-[10px] uppercase tracking-[0.2em] text-ink-dim"
          >Private gaming club</span
        >
      </div>
    </div>

    <div class="container-royal flex-1 py-10 sm:py-14">
      <header class="max-w-2xl">
        <p class="eyebrow mb-2">{{ SOURCE_LABELS[campaign.source] }} · {{ campaign.geo }}</p>
        <h1 class="font-display text-3xl font-bold tracking-[0.06em] text-gold-gradient sm:text-4xl">
          {{ campaign.headline }}
        </h1>
        <p class="mt-4 font-sans text-sm leading-relaxed text-ink-muted">{{ campaign.sub }}</p>
        <p class="mt-2 font-sans text-xs leading-relaxed text-ink-dim">{{ campaign.heroNote }}</p>
      </header>

      <!-- Proof line -->
      <ul class="mt-6 flex max-w-2xl flex-wrap gap-x-6 gap-y-2">
        <li
          v-for="fact in proofFacts"
          :key="fact"
          class="flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.14em] text-ink-muted"
        >
          <span class="h-1 w-1 rotate-45 bg-gold/60" /> {{ fact }}
        </li>
      </ul>

      <div class="mt-8 max-w-2xl">
        <RakebackCalculator :defaults="campaign.calculatorDefaults" />
      </div>

      <!-- The one CTA -->
      <div class="mt-8 max-w-2xl">
        <GoldButton variant="solid" size="lg" @click="authModal.open('register')">
          {{ campaign.ctaLabel }}
        </GoldButton>
        <p class="mt-3 font-sans text-[11px] leading-relaxed text-ink-dim">
          Registration is free. The ladder above is the one your account runs on.
        </p>
      </div>
    </div>

    <TrustStrip />
  </main>
</template>
