<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import KingdomStatus from '@/components/home/KingdomStatus.vue'
import RoyalCollection from '@/components/home/RoyalCollection.vue'
import FeatureGrid from '@/components/home/FeatureGrid.vue'
import TreasuryBanner from '@/components/home/TreasuryBanner.vue'
import RoyalTreasures from '@/components/home/RoyalTreasures.vue'
import TheCourt from '@/components/home/TheCourt.vue'
import RoyalDivider from '@/components/ui/RoyalDivider.vue'
import { useReveal } from '@/composables/useReveal'

// Bottom row (Treasures + Court) shares one reveal pass.
const communityRow = ref<HTMLElement | null>(null)
useReveal(communityRow, { stagger: 0.14 })
</script>

<template>
  <div class="min-h-screen">
    <AppHeader />
    <main>
      <HeroSection />
      <KingdomStatus />
      <RoyalCollection />
      <FeatureGrid />

      <div class="container-royal pt-16 sm:pt-20">
        <RoyalDivider />
      </div>
      <TreasuryBanner />

      <!-- Royal Treasures + The Court, side by side -->
      <section
        ref="communityRow"
        class="container-royal grid grid-cols-1 gap-5 pt-12 sm:pt-16 lg:grid-cols-2"
      >
        <RoyalTreasures />
        <TheCourt />
      </section>
    </main>
    <AppFooter />
  </div>
</template>
