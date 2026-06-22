<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue'
import ContinuePlaying from '@/components/home/ContinuePlaying.vue'
import PrimaryDestinations from '@/components/home/PrimaryDestinations.vue'
import YourAscent from '@/components/home/YourAscent.vue'
import TrendingRoyale from '@/components/home/TrendingRoyale.vue'
import KingsPodium from '@/components/home/KingsPodium.vue'
import PrivateExperiences from '@/components/home/PrivateExperiences.vue'
import RewardsVault from '@/components/home/RewardsVault.vue'
import RoyalPrivileges from '@/components/home/RoyalPrivileges.vue'
import CommunityHub from '@/components/home/CommunityHub.vue'
import RoyalDivider from '@/components/ui/RoyalDivider.vue'
</script>

<template>
  <main>
    <!-- Hero (unchanged) -->
    <HeroSection />

    <!-- 1 · Resume -->
    <ContinuePlaying />

    <!-- 2 · Enter a room -->
    <PrimaryDestinations />

    <!-- 3 · Personal progression -->
    <YourAscent />

    <!-- 4 · Curated discovery + live wins -->
    <TrendingRoyale />

    <!-- 5 · The competition (centerpiece) -->
    <KingsPodium />

    <!-- 6 · Private rooms -->
    <PrivateExperiences />

    <!-- 7 · Earned rewards -->
    <RewardsVault />

    <!-- 8 · Member benefits -->
    <RoyalPrivileges />

    <div class="container-royal pt-16 sm:pt-24">
      <RoyalDivider />
    </div>

    <!-- 9 · Belonging -->
    <CommunityHub />
  </main>
</template>
