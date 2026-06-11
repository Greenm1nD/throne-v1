<script setup lang="ts">
import { ref } from 'vue'
import AccountPanel from '@/components/account/AccountPanel.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'

const enabled = ref(false)
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">Security</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Two-Factor Auth</h1>
      <p class="mt-1 font-sans text-[12px] text-ink-dim">Add a second verification step to protect against unauthorised access.</p>
    </div>

    <AccountPanel title="Enable & Disable Security">
      <div v-glow class="flex items-start gap-4 rounded-xl border p-5" :class="enabled ? 'border-border-gold/50 bg-gold/[0.04]' : 'border-border-gold/30 bg-black/30'">
        <span class="grid h-12 w-12 shrink-0 place-items-center rounded-full border" :class="enabled ? 'border-border-gold text-gold-bright' : 'border-border-gold/40 text-ink-dim'">
          <AppIcon name="shield" :size="19" />
        </span>
        <div class="flex-1">
          <p class="font-sans text-[13px] font-semibold text-ink">
            Google 2FA verification is currently {{ enabled ? 'enabled' : 'disabled' }}
          </p>
          <p class="mt-1 font-sans text-[12px] leading-relaxed text-ink-dim">
            {{ enabled ? 'A one-time code from your authenticator guards every gate.' : 'Enable Google Authenticator to guard every gate of your account.' }}
          </p>

          <div v-if="!enabled" class="mt-5 grid gap-4 sm:grid-cols-[1fr_auto]">
            <label class="block">
              <span class="mb-1.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim">Password</span>
              <input type="password" placeholder="••••••••" class="h-12 w-full rounded-lg border border-border-gold/60 bg-black/40 px-4 text-sm text-ink placeholder:text-ink-dim focus:border-gold focus:outline-none" />
            </label>
            <div class="flex items-end">
              <GoldButton variant="solid" size="md" @click="enabled = true">Activate</GoldButton>
            </div>
          </div>

          <div v-else class="mt-5 space-y-4">
            <div class="flex flex-col items-center gap-3 rounded-xl border border-border-gold/30 bg-black/40 p-5 sm:flex-row sm:items-center">
              <span class="grid h-28 w-28 shrink-0 place-items-center rounded-lg border border-border-gold/50 font-sans text-[9px] uppercase tracking-[0.2em] text-ink-dim">QR Code</span>
              <div>
                <p class="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim">Secret Key</p>
                <p class="mt-1 font-sans text-[13px] font-bold tabular-nums tracking-[0.1em] text-champagne">THRN-K9Q2-M4X7-PL08</p>
                <p class="mt-2 font-sans text-[11px] text-ink-dim">Scan with Google Authenticator, then confirm with a code below.</p>
              </div>
            </div>
            <div class="grid gap-4 sm:grid-cols-[1fr_auto]">
              <input placeholder="6-digit code" inputmode="numeric" maxlength="6" class="h-12 w-full rounded-lg border border-border-gold/60 bg-black/40 px-4 text-center text-sm tabular-nums text-ink placeholder:text-ink-dim focus:border-gold focus:outline-none" />
              <div class="flex gap-3">
                <GoldButton variant="solid" size="md">Confirm</GoldButton>
                <GoldButton variant="outline" size="md" @click="enabled = false">Disable</GoldButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AccountPanel>
  </div>
</template>
