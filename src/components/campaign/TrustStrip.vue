<!--
  TrustStrip — the compliance line every campaign lander ends on.
  Mandatory lander elements per marketing_strategy/03_ad_networks.md §5.5:
  18+ mark, licence line, payout-times statement, limits link. Compact,
  always at the bottom of the lander.
-->
<template>
  <footer class="border-t border-border-gold/30 bg-surface/80">
    <div
      class="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-4 text-center font-sans text-[11px] leading-relaxed text-ink-dim"
    >
      <span
        class="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-ink-dim/60 text-[10px] font-bold text-ink-muted"
        >18+</span
      >
      <span>Licence: holder, number and issuing authority published here on issue (placeholder).</span>
      <span>Payout times are published as measured medians, not promises.</span>
      <RouterLink
        to="/account/limits"
        class="inline-flex min-h-[44px] items-center underline decoration-border-gold underline-offset-4 transition-colors duration-swift hover:text-gold-bright"
      >
        Writ of Restraint — deposit &amp; loss limits
      </RouterLink>
    </div>
  </footer>
</template>
