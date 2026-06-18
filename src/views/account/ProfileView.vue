<script setup lang="ts">
import { ref } from 'vue'
import AccountPanel from '@/components/account/AccountPanel.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { user } from '@/data/account'

const fields = [
  { label: 'First Name', value: user.firstName },
  { label: 'Last Name', value: user.lastName },
  { label: 'Date of Birth', value: user.dob },
  { label: 'National ID', value: user.nationalId },
  { label: 'Email Address', value: user.email },
  { label: 'Phone Number', value: user.phone },
]

// Ready-made royal portrait catalogue — members pick one, no uploads.
const portraits = Array.from({ length: 8 }, (_, i) => `/assets/images/avatars/royal-${String(i + 1).padStart(2, '0')}.webp`)

const current = ref(user.avatar)
const showPicker = ref(false)
const draft = ref(current.value)

function openPicker() {
  draft.value = current.value
  showPicker.value = true
}
function apply() {
  current.value = draft.value
  user.avatar = draft.value
  showPicker.value = false
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">My Account</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Profile</h1>
    </div>

    <AccountPanel title="Royal Identity">
      <div class="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <div class="relative">
          <img :src="current" alt="" class="h-20 w-20 rounded-full border-2 border-border-gold object-cover shadow-gold-soft" />
          <img src="/assets/images/crown-duke.png" alt="" class="absolute -top-3 left-1/2 h-6 w-auto -translate-x-1/2" />
        </div>
        <div>
          <p class="font-display text-lg font-semibold tracking-[0.08em] text-ink">{{ user.name }}</p>
          <p class="font-sans text-[11px] uppercase tracking-[0.2em] text-gold-bright">{{ user.tier }} · {{ user.handle }} · Member since {{ user.memberSince }}</p>
          <GoldButton variant="outline" size="sm" class="mt-3" @click="openPicker">
            <AppIcon name="user" :size="13" /> Change Portrait
          </GoldButton>
        </div>
      </div>
    </AccountPanel>

    <AccountPanel title="Personal Information">
      <p class="mb-5 font-sans text-[12px] text-ink-dim">For security, these fields can only be updated via support.</p>
      <dl class="grid gap-x-6 gap-y-4 sm:grid-cols-2">
        <div v-glow v-for="f in fields" :key="f.label" class="rounded-xl border border-border-gold/30 bg-black/30 px-4 py-3">
          <dt class="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim">{{ f.label }}</dt>
          <dd class="mt-1 font-sans text-[13px] font-semibold tabular-nums text-ink">{{ f.value }}</dd>
        </div>
      </dl>
      <p class="mt-5 border-t border-border-gold/20 pt-4 font-sans text-[12px] text-ink-dim">
        To update email, phone or identity details, please
        <RouterLink to="/account/contact" class="text-champagne underline-offset-4 transition-colors hover:text-gold-bright hover:underline">contact support</RouterLink>.
      </p>
    </AccountPanel>

    <AccountPanel title="Preferences">
      <ul class="divide-y divide-border-gold/20">
        <li v-for="p in [
            { t: 'Royal correspondence', d: 'Exclusive offers and court announcements by email', on: true },
            { t: 'Ambient music', d: 'Throne hall soundtrack across the kingdom', on: true },
            { t: 'Discreet mode', d: 'Hide balances until hovered', on: false },
          ]" :key="p.t" class="flex items-center justify-between gap-4 py-4">
          <div>
            <p class="font-sans text-[13px] font-semibold text-ink">{{ p.t }}</p>
            <p class="font-sans text-[11px] text-ink-dim">{{ p.d }}</p>
          </div>
          <label class="relative inline-flex cursor-pointer items-center">
            <input type="checkbox" class="peer sr-only" :checked="p.on" />
            <span class="h-6 w-11 rounded-full border border-border-gold/30 bg-black/50 transition-colors peer-checked:border-border-gold peer-checked:bg-gold/20" />
            <span class="absolute left-1 h-4 w-4 rounded-full bg-ink-dim transition-all peer-checked:left-6 peer-checked:bg-gold-bright" />
          </label>
        </li>
      </ul>
    </AccountPanel>

    <!-- Portrait picker — choose from the royal catalogue (no upload) -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showPicker"
          class="fixed inset-0 z-[100] flex items-center justify-center p-4"
          @click.self="showPicker = false"
        >
          <div class="absolute inset-0 bg-black/75 backdrop-blur-sm" />
          <div class="card-lux relative z-10 w-full max-w-lg p-6 hover:translate-y-0 sm:p-7">
            <div class="mb-1 flex items-start justify-between gap-4">
              <div>
                <p class="eyebrow">Choose your likeness</p>
                <h3 class="mt-1 font-display text-xl font-semibold tracking-[0.1em] text-gold-gradient">Royal Portraits</h3>
              </div>
              <button
                class="grid h-9 w-9 place-items-center rounded-full border border-border-gold/40 text-ink-muted transition-colors hover:border-gold hover:text-gold-bright"
                aria-label="Close"
                @click="showPicker = false"
              >
                <AppIcon name="x" :size="14" />
              </button>
            </div>
            <p class="mb-5 font-sans text-[12px] text-ink-dim">Pick a ready-made portrait from the court collection.</p>

            <div class="grid grid-cols-3 gap-3 sm:grid-cols-4">
              <button
                v-for="(src, i) in portraits"
                :key="src"
                class="group relative aspect-square overflow-hidden rounded-xl border-2 transition-all duration-200"
                :class="draft === src ? 'border-gold shadow-card-glow' : 'border-border-gold/30 hover:border-border-gold'"
                :aria-pressed="draft === src"
                :aria-label="`Portrait ${i + 1}`"
                @click="draft = src"
              >
                <img :src="src" alt="" loading="lazy" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <span
                  v-if="draft === src"
                  class="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-gold-gradient text-bg shadow-gold-soft"
                >
                  <AppIcon name="check" :size="12" />
                </span>
              </button>
            </div>

            <div class="mt-6 flex items-center justify-end gap-3">
              <button
                class="font-sans text-[12px] uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-ink"
                @click="showPicker = false"
              >
                Cancel
              </button>
              <GoldButton variant="solid" size="md" :disabled="draft === current" @click="apply">
                Set Portrait <AppIcon name="check" :size="14" />
              </GoldButton>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
