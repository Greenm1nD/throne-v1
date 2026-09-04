<script setup lang="ts">
/**
 * AccountIcon — consistent champagne-gold LINE icons for account navigation.
 * One 24×24 grid, uniform stroke, currentColor (so the parent nav item drives
 * default/active/hover colour). Decorative: the accessible label lives on the
 * parent nav item, so these are aria-hidden.
 */
withDefaults(defineProps<{ name: string; size?: number }>(), { size: 22 })

// Each value is the inner SVG markup (paths inherit the wrapper's stroke).
const paths: Record<string, string> = {
  dashboard:
    '<rect x="3.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.6"/>',
  user: '<circle cx="12" cy="8" r="3.3"/><path d="M5.5 19.5a6.5 6.5 0 0 1 13 0"/>',
  verify: '<path d="M12 3.2l7 2.8v5c0 4.4-3 7.4-7 8.8-4-1.4-7-4.4-7-8.8V6z"/><path d="M9 11.8l2.2 2.2 4-4.2"/>',
  wallet:
    '<rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 9.5h18"/><circle cx="16.5" cy="13.2" r="1.1"/>',
  deposit:
    '<path d="M4 13v4.5A2.5 2.5 0 0 0 6.5 20h11a2.5 2.5 0 0 0 2.5-2.5V13"/><path d="M12 3.5v9"/><path d="M8.5 9L12 12.5 15.5 9"/>',
  withdraw:
    '<path d="M4 13v4.5A2.5 2.5 0 0 0 6.5 20h11a2.5 2.5 0 0 0 2.5-2.5V13"/><path d="M12 12.5v-9"/><path d="M8.5 7L12 3.5 15.5 7"/>',
  transfers: '<path d="M4 9h13"/><path d="M14 6l3 3-3 3"/><path d="M20 15H7"/><path d="M10 12l-3 3 3 3"/>',
  gift:
    '<rect x="4" y="9.5" width="16" height="10.5" rx="1.6"/><path d="M3 9.5h18"/><path d="M12 9.5V20"/><path d="M12 9.5C9.8 9.5 8.2 5 11 5.6c1 .2 1 2.4 1 3.9z"/><path d="M12 9.5c2.2 0 3.8-4.5 1-3.9-1 .2-1 2.4-1 3.9z"/>',
  spin: '<path d="M20.5 12a8.5 8.5 0 1 1-2.7-6.2"/><path d="M20.5 3.5v4.2h-4.2"/>',
  cashback: '<circle cx="12" cy="12" r="8.3"/><path d="M15.5 9.2a4 4 0 1 0 .6 4.4"/><path d="M15.5 6.5v3h-3"/>',
  rewards:
    '<rect x="3.3" y="3.3" width="17.4" height="17.4" rx="3.4"/><path d="M12 7.4l1.55 3.15 3.45.5-2.5 2.45.6 3.45L12 15.8l-3.1 1.6.6-3.45-2.5-2.45 3.45-.5z"/>',
  vip: '<path d="M4 8.5l3.2 3 4.8-5 4.8 5 3.2-3v8.5H4z"/><path d="M5 19.5h14"/>',
  receipt: '<path d="M6 3.2h12v17.6l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3L6 20.8z"/><path d="M9 8h6"/><path d="M9 12h6"/><path d="M9 16h3.5"/>',
  ticket:
    '<path d="M4 7.5A2 2 0 0 1 6 5.5h12a2 2 0 0 1 2 2V10a2 2 0 0 0 0 4v2.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V14a2 2 0 0 0 0-4z"/><path d="M14.5 5.8v12.4" stroke-dasharray="1.6 2"/>',
  cards: '<rect x="4" y="5" width="10.5" height="14.5" rx="2"/><path d="M16.5 8l3.6 1.3-3 8.9-3.6-1.3"/>',
  activity: '<path d="M3 12h4l2.2-6.5 4.4 13L16 12h5"/>',
  document: '<path d="M7 3.2h7l5 5v12.6H7z"/><path d="M14 3.2V8.2h5"/><path d="M9.5 13h6"/><path d="M9.5 16.5h6"/>',
  key: '<circle cx="8" cy="8.2" r="4.2"/><path d="M11 11.2l8.5 8.5"/><path d="M16.5 16.5l2-2"/>',
  twofa:
    '<path d="M12 3.2l7 2.8v5c0 4.4-3 7.4-7 8.8-4-1.4-7-4.4-7-8.8V6z"/><circle cx="9.4" cy="11.2" r=".7" fill="currentColor" stroke="none"/><circle cx="12" cy="11.2" r=".7" fill="currentColor" stroke="none"/><circle cx="14.6" cy="11.2" r=".7" fill="currentColor" stroke="none"/>',
  devices: '<rect x="3" y="5" width="13" height="9.5" rx="1.6"/><path d="M6 17.5h7"/><rect x="16.5" y="8.5" width="5" height="11" rx="1.4"/>',
  sessions: '<path d="M20 12a8 8 0 1 1-3-6.25"/><path d="M20 4.2v4h-4"/><path d="M12 8.2V12l2.6 1.6"/>',
  headset:
    '<path d="M5 13.5v-1.2a7 7 0 0 1 14 0v1.2"/><rect x="3.4" y="13.2" width="3.8" height="6" rx="1.5"/><rect x="16.8" y="13.2" width="3.8" height="6" rx="1.5"/><path d="M19 19.2a3 3 0 0 1-3 3h-2"/>',
  responsible:
    '<path d="M12 3.2l7 2.8v5c0 4.4-3 7.4-7 8.8-4-1.4-7-4.4-7-8.8V6z"/><path d="M12 14.8s-2.9-1.8-2.9-3.8a1.55 1.55 0 0 1 2.9-.7 1.55 1.55 0 0 1 2.9.7c0 2-2.9 3.8-2.9 3.8z"/>',
  concierge:
    '<path d="M5 14v-1.1a7 7 0 0 1 14 0V14"/><rect x="3.4" y="13.8" width="3.6" height="5.6" rx="1.4"/><rect x="17" y="13.8" width="3.6" height="5.6" rx="1.4"/><path d="M9 5.5L12 3l3 2.5"/>',
  logout: '<path d="M10 4H6a1.5 1.5 0 0 0-1.5 1.5v13A1.5 1.5 0 0 0 6 20h4"/><path d="M14.5 12h7"/><path d="M18 8l3.5 4-3.5 4"/>',
}
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    v-html="paths[name] || ''"
  />
</template>
