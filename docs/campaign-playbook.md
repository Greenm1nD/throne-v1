# Campaign Playbook — one lander per traffic source

A campaign at THRONE is a **config entry, not a redesign**. Every acquisition source (an affiliate
review site, a Kick streamer, a push network) gets its own entry in the campaign manifest and its
own URL on the shared lander. The lander itself never changes per campaign — only the copy, the
calculator preset and the proof block do.

## 1. Launch a campaign for a new website/source

1. **Add a manifest entry** in `src/data/campaigns.ts`:

   ```ts
   {
     id: 'affiliate-review-mx',          // becomes the URL: /c/affiliate-review-mx
     source: 'affiliate-review',         // 'affiliate-review' | 'kick-streamer' | 'push-network' | 'direct'
     geo: 'MX',
     locale: 'es-MX',
     headline: '…',                      // factual, English, no urgency, no countdowns
     sub: '…',
     heroNote: '…',
     calculatorDefaults: { monthlyWager: 2000, houseEdgePct: 4 },
     proof: 'rates',                     // 'rates' | 'trust' | 'sla' — which proof line leads
     ctaLabel: 'Create account',
   }
   ```

2. **Share the link** with the partner, with their tracking parameters appended:

   ```
   /c/<id>?btag=<partner-tag>&click_id={clickid}&sub1=…&sub5=…
   ```

   An unknown or missing `<id>` renders the default campaign — a shared link never dead-ends
   in a 404.

3. That is the whole launch. No new page, no new route, no design work.

## 2. Sample URLs (the three seeded campaigns)

```
https://throne.example/c/affiliate-review-mx?btag=AFF2291_camp45&click_id={clickid}&sub1={pageid}
https://throne.example/c/kick-streamer-cl?btag=KICK_CL_01&click_id={clickid}&sub1={stream_date}
https://throne.example/c/push-latam?btag=PUSHNET_123&click_id={clickid}&sub1={zoneid}&sub2={creativeid}
```

`{clickid}`, `{zoneid}` etc. are the partner network's macros — they fill them in at click time.

## 3. What gets captured on landing

On first visit the lander stores the tracking parameters in `localStorage` under the key
`thr_attr` (see `src/utils/attribution.ts`):

| Field | Source |
|---|---|
| `click_id` | `click_id` / `clickid` / `cid` — stored verbatim, echoed back verbatim later |
| `btag` | `btag` / `aff` / `a_aid` |
| `subs` | `sub1..sub5`, passed through untouched |
| `utm` | any `utm_*` parameter |
| `landing_url` | origin + path (query excluded) |
| `ts` | capture time — the start of the **90-day** attribution window |

Two invariants, both kept when this moves server-side:

- **First touch is frozen.** An existing capture is never overwritten by a later click.
- **90-day window**, matching the published affiliate T&C.

This client-side capture is the **demo mirror** of the production design, where capture happens at
the edge into an HttpOnly cookie plus a server-side attribution row
(`tech_integrations/tracking_and_postbacks.js` §3 — read-only reference).

## 4. How this becomes a postback later

When the backend exists (see `marketing_strategy/01_affiliate_program.md` §5 for the full
contract):

1. **Registration** — the captured attribution is copied onto the player record and frozen;
   a signed S2S postback fires with `event=registration`.
2. **First deposit** — the PSP webhook settles, the FTD check runs (unique per player, ever), and
   a signed postback fires with `event=ftd`, echoing the original `click_id` and `sub1..sub5`.
3. Postbacks are HMAC-signed, host-allowlisted, retried only on 5xx/network errors, and carry no
   PII — all per §5.4 of the same document.

Nothing in the lander or the manifest needs to change for that step: the fields captured today are
exactly the fields the postback contract consumes.
