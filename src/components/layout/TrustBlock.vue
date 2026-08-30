<script setup lang="ts">
import { computed } from 'vue'
import { trust, preparationNotice, helpOrganisations } from '@/config/trust'

/**
 * The footer trust block — the rows an affiliate network or review portal
 * looks for before it will list a brand.
 *
 * Everything here is either true today (18+, the responsible-gaming route, the
 * three global help lines, the preparation notice) or driven by src/config/trust.ts
 * and absent until it becomes true. Nothing is placeheld.
 */
const hasEntity = computed(
  () => !!(trust.legalEntity || trust.registrationNumber || trust.registeredAddress),
)
const hasContact = computed(() => !!(trust.supportEmail || trust.complaintsUrl || trust.adrProvider))
</script>

<template>
  <div class="border-t border-border-gold/10 pt-7">
    <!-- While the product is not live, this line is the most important one here -->
    <p
      v-if="preparationNotice"
      class="text-center font-sans text-[11px] uppercase tracking-[0.16em] text-champagne/80"
    >
      {{ preparationNotice }}
    </p>

    <!-- Company. Renders only once there is a company to name. -->
    <p
      v-if="hasEntity"
      class="mt-4 text-center font-sans text-[11px] leading-relaxed text-ink-dim"
    >
      <span v-if="trust.legalEntity">{{ trust.legalEntity }}</span>
      <span v-if="trust.registrationNumber"> · Reg. {{ trust.registrationNumber }}</span>
      <span v-if="trust.registeredAddress"> · {{ trust.registeredAddress }}</span>
    </p>

    <!-- Licence. Absent until one is held and verifiable on the authority's register. -->
    <p v-if="trust.licence" class="mt-1.5 text-center font-sans text-[11px] text-ink-dim">
      Licensed by {{ trust.licence.authority }} —
      <a
        :href="trust.licence.verifyUrl"
        rel="noopener noreferrer"
        target="_blank"
        class="underline decoration-gold/40 underline-offset-2 transition-colors hover:text-champagne"
        >licence {{ trust.licence.number }}</a
      >
    </p>

    <p v-if="hasContact" class="mt-1.5 text-center font-sans text-[11px] text-ink-dim">
      <a
        v-if="trust.supportEmail"
        :href="`mailto:${trust.supportEmail}`"
        class="transition-colors hover:text-champagne"
        >{{ trust.supportEmail }}</a
      >
      <template v-if="trust.complaintsUrl">
        <span v-if="trust.supportEmail"> · </span>
        <RouterLink :to="trust.complaintsUrl" class="transition-colors hover:text-champagne"
          >Complaints</RouterLink
        >
      </template>
      <template v-if="trust.adrProvider">
        <span> · Disputes: </span>
        <a
          :href="trust.adrProvider.url"
          rel="noopener noreferrer"
          target="_blank"
          class="transition-colors hover:text-champagne"
          >{{ trust.adrProvider.name }}</a
        >
      </template>
    </p>

    <p
      v-if="trust.restrictedTerritories?.length"
      class="mt-1.5 text-center font-sans text-[11px] text-ink-dim"
    >
      Not available in {{ trust.restrictedTerritories.join(', ') }}.
    </p>

    <!-- Age, the responsible-gaming route, and help that works from anywhere -->
    <div class="mt-5 flex flex-col items-center gap-3">
      <div class="flex items-center gap-3">
        <span
          class="grid h-8 w-8 place-items-center rounded-full border border-ink-dim/60 font-sans text-[10px] font-bold text-ink-muted"
          aria-label="Eighteen plus"
          >18+</span
        >
        <RouterLink
          to="/responsible-gaming"
          class="font-sans text-[11px] uppercase tracking-[0.14em] text-ink-dim transition-colors hover:text-champagne"
        >
          Play Responsibly
        </RouterLink>
      </div>

      <!-- Names, never logos: a logo reads as endorsement or supervision. -->
      <p class="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-sans text-[11px] text-ink-dim">
        <span class="uppercase tracking-[0.12em]">Confidential help:</span>
        <!-- The separator sits outside the anchor: inside it, a screen reader
             reads the link as "Gambling Therapy comma". -->
        <template v-for="(o, i) in helpOrganisations" :key="o.name">
          <a
            :href="o.href"
            rel="noopener noreferrer"
            target="_blank"
            class="underline decoration-ink-dim/40 underline-offset-2 transition-colors hover:text-champagne"
            >{{ o.name }}</a
          ><span v-if="i < helpOrganisations.length - 1" class="sr-only">,</span>
        </template>
      </p>
    </div>
  </div>
</template>
