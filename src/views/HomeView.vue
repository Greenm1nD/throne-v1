<script setup lang="ts">
import { ref } from 'vue'
import HeroSection from '@/components/home/HeroSection.vue'
import TheInvitation from '@/components/home/TheInvitation.vue'
import KingdomStatus from '@/components/home/KingdomStatus.vue'
import HallOfKings from '@/components/home/HallOfKings.vue'
import RoyalCollection from '@/components/home/RoyalCollection.vue'
import GameCarousel from '@/components/home/GameCarousel.vue'
import RoyalDistricts from '@/components/home/RoyalDistricts.vue'
import FeatureGrid from '@/components/home/FeatureGrid.vue'
import TreasuryBanner from '@/components/home/TreasuryBanner.vue'
import RoyalTreasures from '@/components/home/RoyalTreasures.vue'
import TheCourt from '@/components/home/TheCourt.vue'
import RoyalDivider from '@/components/ui/RoyalDivider.vue'
import { lobbyGames } from '@/data/casinoGames'
import { useReveal } from '@/composables/useReveal'

// Continue Playing — recent picks; Trending — curated hot/new mix.
const continuePlaying = lobbyGames.slice(0, 6)
const trending = [
  'Zeus vs Hades', 'The Ultimate 5', 'Gates of Olympus', 'Release the Kraken',
  'Octobeer Fortunes', 'Candy Blitz', 'Bounty Gold', 'Starlight Princess',
].map((n) => lobbyGames.find((g) => g.name === n)!)

// Bottom row (Treasures + Court) shares one reveal pass.
const communityRow = ref<HTMLElement | null>(null)
useReveal(communityRow, { stagger: 0.14 })
</script>

<template>
  <main>
    <HeroSection />
    <KingdomStatus />
    <HallOfKings />
    <RoyalCollection />

    <!-- Continue Playing -->
    <section class="container-royal pt-16 sm:pt-24">
      <GameCarousel title="Continue Playing" :games="continuePlaying" variant="lg" view-all-to="/casino" />
    </section>

    <!-- The Royal Districts -->
    <RoyalDistricts />

    <!-- Trending Now -->
    <section class="container-royal pt-16 sm:pt-24">
      <GameCarousel title="Trending Now" :games="trending" variant="lg" view-all-to="/games" />
    </section>

    <!-- Exclusivity & scarcity -->
    <TheInvitation />

    <FeatureGrid />

    <div class="container-royal pt-16 sm:pt-24">
      <RoyalDivider />
    </div>
    <TreasuryBanner />

    <!-- Royal Treasures + The Court, side by side -->
    <section
      ref="communityRow"
      class="container-royal grid grid-cols-1 gap-5 pt-16 sm:pt-24 lg:grid-cols-2"
    >
      <RoyalTreasures />
      <TheCourt />
    </section>
  </main>
</template>
