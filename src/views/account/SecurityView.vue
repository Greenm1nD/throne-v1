<script setup lang="ts">
import AccountPanel from '@/components/account/AccountPanel.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { devices, passwordRules, sessions } from '@/data/account'
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">My Account</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Security</h1>
    </div>

    <div class="grid gap-6 xl:grid-cols-2">
      <AccountPanel title="Change Password">
        <p class="mb-4 font-sans text-[12px] text-ink-dim">Set a strong password that only you know.</p>
        <div class="space-y-4">
          <label v-for="f in ['Current Password', 'New Password', 'Repeat New Password']" :key="f" class="block">
            <span class="mb-1.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim">{{ f }}</span>
            <span class="relative block">
              <AppIcon name="lock" :size="15" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold/70" />
              <input type="password" placeholder="••••••••" class="h-12 w-full rounded-lg border border-border-gold/60 bg-black/40 pl-11 pr-4 text-sm text-ink placeholder:text-ink-dim focus:border-gold focus:outline-none" />
            </span>
          </label>
        </div>
        <GoldButton variant="solid" size="md" class="mt-6">Update Password</GoldButton>

        <p class="mb-3 mt-7 font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-ink-dim">Secure Password Rules</p>
        <ul class="space-y-1.5">
          <li v-for="r in passwordRules" :key="r" class="flex items-center gap-2 font-sans text-[12px] text-ink-muted">
            <AppIcon name="check" :size="11" class="text-gold/80" /> {{ r }}
          </li>
        </ul>
        <p class="mt-4 border-t border-white/5 pt-4 font-sans text-[11px] leading-relaxed text-ink-dim">
          Never share your password with anyone. No one — including our support team — will ever ask you for it.
        </p>
      </AccountPanel>

      <div class="space-y-6">
        <AccountPanel title="Two-Factor Authentication">
          <p class="mb-4 font-sans text-[12px] text-ink-dim">Add a second verification step to protect against unauthorised access.</p>
          <div class="flex items-start gap-4 rounded-xl border border-white/8 bg-black/30 p-4">
            <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 text-ink-dim">
              <AppIcon name="shield" :size="18" />
            </span>
            <div>
              <p class="font-sans text-[13px] font-semibold text-ink">Google 2FA verification is currently disabled</p>
              <p class="mt-1 font-sans text-[12px] leading-relaxed text-ink-dim">Enable Google Authenticator to guard every gate of your account.</p>
              <GoldButton variant="outline" size="sm" class="mt-3">Enable Google Authenticator</GoldButton>
            </div>
          </div>
        </AccountPanel>

        <AccountPanel title="My Devices">
          <div class="mb-4 flex items-center justify-between rounded-xl border border-border-gold/50 bg-gold/[0.04] px-4 py-3">
            <p class="font-sans text-[12px] text-ink-muted">Device Lock is <span class="font-bold text-gold-bright">ON</span> — only trusted devices below can sign in.</p>
            <span class="rounded-full border border-border-gold px-2.5 py-0.5 font-sans text-[9px] font-bold uppercase tracking-[0.16em] text-gold-bright">Enabled</span>
          </div>
          <ul class="divide-y divide-white/5">
            <li v-for="d in devices" :key="d.fingerprint" class="flex items-center gap-3.5 py-3.5">
              <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-champagne">
                <AppIcon name="monitor" :size="15" />
              </span>
              <div class="min-w-0 flex-1">
                <p class="font-sans text-[13px] font-semibold text-ink">
                  {{ d.device }}
                  <span v-if="d.current" class="ml-1.5 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-gold-bright">● This device</span>
                </p>
                <p class="font-sans text-[11px] tabular-nums text-ink-dim">{{ d.fingerprint }} · Added {{ d.added }} · Last seen {{ d.lastSeen }}</p>
              </div>
              <button class="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-gold-bright">Remove</button>
            </li>
          </ul>
        </AccountPanel>

        <AccountPanel title="Session History">
          <p class="mb-3 font-sans text-[12px] text-ink-dim">{{ sessions.length }} total sessions — a record of every login to your account.</p>
          <ul class="divide-y divide-white/5">
            <li v-for="s in sessions" :key="s.time" class="flex items-center gap-3.5 py-3">
              <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-champagne">
                <AppIcon name="globe" :size="14" />
              </span>
              <div class="min-w-0 flex-1">
                <p class="font-sans text-[13px] font-semibold text-ink">Successful login</p>
                <p class="font-sans text-[11px] tabular-nums text-ink-dim">{{ s.ip }} · {{ s.time }} · {{ s.ago }}</p>
              </div>
              <span class="rounded-full border border-border-gold px-2.5 py-0.5 font-sans text-[9px] font-bold uppercase tracking-[0.16em] text-gold-bright">Verified</span>
            </li>
          </ul>
        </AccountPanel>
      </div>
    </div>
  </div>
</template>
