<script setup lang="ts">
import AccountPanel from '@/components/account/AccountPanel.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { passwordRules } from '@/data/account'
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">Account</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Password Security</h1>
      <p class="mt-1 font-sans text-[12px] text-ink-dim">Set a strong password that only you know.</p>
    </div>

    <div class="grid gap-6 xl:grid-cols-2">
      <AccountPanel title="Change Password">
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
      </AccountPanel>

      <AccountPanel title="Secure Password Rules">
        <ul class="space-y-2.5">
          <li v-for="r in passwordRules" :key="r" class="flex items-center gap-2.5 font-sans text-[13px] text-ink-muted">
            <AppIcon name="check" :size="12" class="text-gold/80" /> {{ r }}
          </li>
        </ul>
        <p class="mt-6 border-t border-border-gold/20 pt-4 font-sans text-[12px] leading-relaxed text-ink-dim">
          Never share your password with anyone. No one — including our support team — will ever ask you for it.
        </p>
      </AccountPanel>
    </div>
  </div>
</template>
