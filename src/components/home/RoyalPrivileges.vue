<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { useReveal } from '@/composables/useReveal'

/**
 * Royal Privileges — six member benefits, equal weight, premium hover. Replaces
 * the old tiny icon row.
 */
const root = ref<HTMLElement | null>(null)
useReveal(root, { stagger: 0.08 })

const privileges = [
  { icon: 'gift', title: 'Royal Gifts', desc: 'Exclusive gifts for loyal members.' },
  { icon: 'vault', title: 'Treasury Rewards', desc: 'Unlock high-value rewards.' },
  { icon: 'percent', title: 'Private Cashback', desc: 'Higher tiers. Higher returns.' },
  { icon: 'star', title: 'Exclusive Campaigns', desc: 'Special campaigns for elite players.' },
  { icon: 'mail', title: 'VIP Invitations', desc: 'Events. Parties. Experiences.' },
  { icon: 'crown', title: 'Private Events', desc: 'By invitation only. Beyond exclusive.' },
]
</script>

<template>
  <section ref="root" class="container-royal pt-16 sm:pt-24">
    <SectionHeader title="Royal Privileges" eyebrow="Membership Has Its Rewards" align="center" />

    <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      <article v-for="p in privileges" :key="p.title" data-reveal
        class="group flex flex-col items-center gap-3 rounded-[16px] border border-border-gold/15 bg-card/60 p-5 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:bg-gold/[0.03]">
        <span class="grid h-12 w-12 place-items-center rounded-full border border-border-gold/40 text-gold-bright transition-all duration-300 group-hover:border-gold group-hover:shadow-gold-soft">
          <AppIcon :name="p.icon" :size="20" />
        </span>
        <h3 class="font-sans text-[12px] font-bold uppercase tracking-[0.1em] text-champagne transition-colors group-hover:text-gold-bright">{{ p.title }}</h3>
        <p class="font-sans text-[11px] leading-snug text-ink-dim">{{ p.desc }}</p>
      </article>
    </div>
  </section>
</template>
