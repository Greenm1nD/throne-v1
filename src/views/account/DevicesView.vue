<script setup lang="ts">
import AccountPanel from '@/components/account/AccountPanel.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { devices } from '@/data/account'
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="eyebrow mb-1">Security</p>
      <h1 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">My Devices</h1>
      <p class="mt-1 font-sans text-[12px] text-ink-dim">View every trusted device signed in to your account — remove any you don't recognise.</p>
    </div>

    <AccountPanel>
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-gold/50 bg-gold/[0.04] px-5 py-3.5">
        <p class="font-sans text-[12px] text-ink-muted">
          Device Lock is <span class="font-bold text-gold-bright">ON</span> — only the trusted devices below can sign in. New devices have to be approved through an email confirmation.
        </p>
        <span class="rounded-full border border-border-gold px-3 py-1 font-sans text-[9px] font-bold uppercase tracking-[0.16em] text-gold-bright">Enabled</span>
      </div>

      <ul class="space-y-3">
        <li v-glow v-for="d in devices" :key="d.fingerprint" class="rounded-xl border border-border-gold/30 bg-black/30 p-5 transition-colors hover:border-border-gold/70">
          <div class="flex flex-wrap items-center gap-4">
            <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border-gold/50 text-champagne" style="background: radial-gradient(circle, rgba(212,175,55,0.08), transparent 70%)">
              <AppIcon name="monitor" :size="17" />
            </span>
            <div class="min-w-0 flex-1">
              <p class="font-sans text-[13px] font-semibold text-ink">
                {{ d.device }}
                <span v-if="d.current" class="ml-1.5 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-gold-bright">● This device</span>
              </p>
              <dl class="mt-1.5 flex flex-wrap gap-x-5 gap-y-1 font-sans text-[11px] tabular-nums text-ink-dim">
                <span><dt class="inline uppercase tracking-[0.12em]">Fingerprint</dt> <dd class="inline text-ink-muted">{{ d.fingerprint }}</dd></span>
                <span><dt class="inline uppercase tracking-[0.12em]">Added</dt> <dd class="inline text-ink-muted">{{ d.added }}</dd></span>
                <span><dt class="inline uppercase tracking-[0.12em]">Last seen</dt> <dd class="inline text-ink-muted">{{ d.lastSeen }}</dd></span>
              </dl>
            </div>
            <button class="rounded-full border border-border-gold/30 px-4 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted transition-colors hover:border-gold hover:text-gold-bright">
              Remove Device
            </button>
          </div>
        </li>
      </ul>
    </AccountPanel>
  </div>
</template>
