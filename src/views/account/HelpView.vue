<script setup lang="ts">
import { ref } from 'vue'
import AccountPanel from '@/components/account/AccountPanel.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { faqs } from '@/data/account'

const open = ref<number | null>(0)
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">Support</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Help Center</h1>
    </div>

    <AccountPanel title="Frequently Asked">
      <ul class="divide-y divide-white/5">
        <li v-for="(f, i) in faqs" :key="f.q">
          <button class="flex w-full items-center justify-between gap-4 py-4 text-left" @click="open = open === i ? null : i">
            <span class="font-sans text-[13px] font-semibold" :class="open === i ? 'text-gold-bright' : 'text-ink'">{{ f.q }}</span>
            <AppIcon name="chevronDown" :size="15" class="shrink-0 text-ink-dim transition-transform duration-300" :class="open === i && 'rotate-180 text-gold-bright'" />
          </button>
          <p v-show="open === i" class="pb-4 pr-8 font-sans text-[12px] leading-relaxed text-ink-dim">{{ f.a }}</p>
        </li>
      </ul>
    </AccountPanel>

    <AccountPanel title="Still Need Counsel?">
      <div class="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p class="font-sans text-[13px] text-ink-dim">The court is at your disposal day and night.</p>
        <div class="flex gap-3">
          <RouterLink to="/account/contact" class="rounded-full border border-border-gold px-5 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-champagne transition-colors hover:border-gold hover:text-gold-bright">Contact Support</RouterLink>
          <RouterLink to="/account/concierge" class="rounded-full bg-gold-gradient px-5 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1a1407] transition-all hover:brightness-110">VIP Concierge</RouterLink>
        </div>
      </div>
    </AccountPanel>
  </div>
</template>
