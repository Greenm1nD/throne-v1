<script setup lang="ts">
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import CrownLogo from '@/components/ui/CrownLogo.vue'
import ParticleLayer from '@/components/ui/ParticleLayer.vue'
import { courtChannels } from '@/data/rewards'
</script>

<template>
  <div
    id="vip"
    class="card-lux flex h-full flex-col items-center gap-8 bg-cover bg-center p-7 hover:translate-y-0 hover:shadow-card-glow sm:p-8 lg:flex-row lg:justify-between"
    style="background-image: linear-gradient(180deg, rgba(13,13,16,0.82), rgba(8,8,10,0.9)), url('/assets/images/texture-marble.webp')"
    data-reveal
  >
    <!-- Left: title + CTA -->
    <div class="text-center lg:text-left">
      <h3 class="font-display text-xl font-semibold tracking-[0.14em] text-gold-gradient">
        The Court
      </h3>
      <p class="eyebrow mt-2">Community &amp; Competitions</p>
      <div class="mt-5 flex justify-center lg:justify-start">
        <GoldButton variant="outline" size="sm">Join the Court</GoldButton>
      </div>
    </div>

    <!-- Center: crest with orbiting particles -->
    <div class="relative hidden shrink-0 place-items-center md:grid">
      <ParticleLayer :count="12" />
      <div
        class="relative grid h-24 w-24 place-items-center rounded-full border border-border-gold"
        style="background: radial-gradient(circle, rgba(212,175,55,0.14), transparent 70%)"
      >
        <div class="absolute inset-3 animate-ringRotate rounded-full border border-dashed border-gold/25" />
        <CrownLogo :size="52" :with-text="false" />
      </div>
    </div>

    <!-- Right: channel list -->
    <ul class="grid grid-cols-2 gap-x-6 gap-y-3 sm:flex sm:flex-col sm:gap-3">
      <li v-for="c in courtChannels" :key="c.label">
        <a
          :href="c.href"
          class="group flex items-center gap-2.5 font-sans text-xs font-medium uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-gold-bright"
        >
          <AppIcon
            :name="c.icon"
            :size="16"
            class="text-gold/70 transition-colors group-hover:text-gold-bright"
          />
          {{ c.label }}
        </a>
      </li>
    </ul>
  </div>
</template>
