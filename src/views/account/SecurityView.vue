<script setup lang="ts">
import AccountPanel from '@/components/account/AccountPanel.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { sessions } from '@/data/account'
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">My Account</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Security</h1>
    </div>

    <div class="grid gap-6 xl:grid-cols-2">
      <AccountPanel title="Change Password">
        <div class="space-y-4">
          <label v-for="f in ['Current Password', 'New Password', 'Confirm New Password']" :key="f" class="block">
            <span class="mb-1.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim">{{ f }}</span>
            <span class="relative block">
              <AppIcon name="lock" :size="15" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold/70" />
              <input type="password" placeholder="••••••••" class="h-12 w-full rounded-lg border border-border-gold/60 bg-black/40 pl-11 pr-4 text-sm text-ink placeholder:text-ink-dim focus:border-gold focus:outline-none" />
            </span>
          </label>
        </div>
        <GoldButton variant="solid" size="md" class="mt-6">Update Password</GoldButton>
      </AccountPanel>

      <AccountPanel title="Two-Factor Authentication">
        <div class="flex items-start gap-4 rounded-xl border border-border-gold/50 bg-gold/[0.04] p-4">
          <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border-gold text-gold-bright">
            <AppIcon name="shield" :size="18" />
          </span>
          <div>
            <p class="font-sans text-[13px] font-semibold text-ink">2FA is enabled</p>
            <p class="mt-1 font-sans text-[12px] leading-relaxed text-ink-dim">
              Your throne is guarded — a one-time code from your authenticator app is required at every gate.
            </p>
            <GoldButton variant="outline" size="sm" class="mt-3">Manage 2FA</GoldButton>
          </div>
        </div>

        <p class="mt-6 mb-3 font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-ink-dim">Active Sessions</p>
        <ul class="divide-y divide-white/5">
          <li v-for="s in sessions" :key="s.device" class="flex items-center gap-3.5 py-3.5">
            <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-champagne">
              <AppIcon name="monitor" :size="15" />
            </span>
            <div class="min-w-0 flex-1">
              <p class="font-sans text-[13px] font-semibold text-ink">{{ s.device }}</p>
              <p class="font-sans text-[11px] text-ink-dim">{{ s.place }} · {{ s.time }}</p>
            </div>
            <span v-if="s.current" class="rounded-full border border-border-gold px-2.5 py-0.5 font-sans text-[9px] font-bold uppercase tracking-[0.16em] text-gold-bright">Current</span>
            <button v-else class="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-gold-bright">Revoke</button>
          </li>
        </ul>
      </AccountPanel>
    </div>
  </div>
</template>
