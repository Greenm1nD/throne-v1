<script setup lang="ts">
import { ref } from 'vue'
import HeroSection from '@/components/home/HeroSection.vue'
import TheInvitation from '@/components/home/TheInvitation.vue'
import KingdomStatus from '@/components/home/KingdomStatus.vue'
import HallOfKings from '@/components/home/HallOfKings.vue'
import RoyalCollection from '@/components/home/RoyalCollection.vue'
import GameCarousel from '@/components/home/GameCarousel.vue'
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

    <!-- Founder-approved order: KingdomStatus sits directly on the hero seam
         (its own sm:-mt-12 overlaps the hero), then the collection, then the
         first game rail. -->
    <KingdomStatus />
    <RoyalCollection />

    <section class="container-royal pt-10 sm:pt-14">
      <GameCarousel title="Continue Playing" :games="continuePlaying" variant="lg" view-all-to="/casino" />
    </section>

    <HallOfKings />

    <!-- Trending Now -->
    <section class="container-royal pt-10 sm:pt-14">
      <GameCarousel title="Trending Now" :games="trending" variant="lg" view-all-to="/games" />
    </section>

    <!-- Trust panel — what the house will never do -->
    <TheInvitation />

    <FeatureGrid />

    <div class="container-royal pt-10 sm:pt-14">
      <RoyalDivider />
    </div>
    <TreasuryBanner />

    <!-- Royal Treasures + The Court, side by side -->
    <section
      ref="communityRow"
      class="container-royal grid grid-cols-1 gap-5 pt-10 sm:pt-14 lg:grid-cols-2"
    >
      <RoyalTreasures />
      <TheCourt />
    </section>
  </main>
</template>
