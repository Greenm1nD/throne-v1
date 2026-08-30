# Management backlog

For the management Claude Code session — marketing, SEO, analytics and automation. Read
[`README.md`](README.md) first.

---

## The constraint everything sits under

Every scalable acquisition channel is licence-gated, and the product will be global and open,
which means no national licence. So:

| Channel | Status | Why |
|---|---|---|
| Google Ads · YouTube | **Closed** | Requires a valid local licence plus per-country certification. Free subdomains and non-owned domains are ineligible outright — `thronev1-greenbet.vercel.app` can never be advertised. |
| Meta · Instagram | **Closed** | Authorisation is per ad account, per URL, per territory, and needs the licence. |
| TikTok | **Closed** | Certification is rep-mediated and needs the licence. |
| App Store · Google Play | **Closed** | A licence in every jurisdiction of distribution, plus a corporate developer entity. Ship a PWA and say so. |
| Telegram Ads | **Banned outright** | Telegram's own guidelines §5.6 prohibit ads for games of chance. Affiliate blogs calling it "restricted, not banned" are selling their own networks. |
| **SEO and content** | **Open** | The only channel no platform policy gates. |
| **Affiliates and review portals** | **Open after licence** | AskGamblers, Casino Guru, LCB require proof of licence to list. |
| **Communities, referral, sponsorship** | **Open** | Discord, Telegram groups, X, Reddit. |

There is no clever media buy around this and no agency that has a way in. Treat any pitch that
claims otherwise as a test of whether they have read the current rules.

---

## Sequence

Nothing in the paid column starts before there is a licensed product taking deposits. Paid
acquisition against the current prototype would land real people on a demo and be spent twice.

1. **Decide capital.** Below ~€600k committed, the honest route is brand-first or a skin on
   someone else's licence — not a smaller launch.
2. **Own a domain and clear the name.** `throne.com` is a live creator platform with roughly a
   million creators, on the exact-match domain and the same search audience. Trademark clearance
   is upstream of every other line.
3. **Fix the four P0 site issues** (see [`frontend-backlog.md`](frontend-backlog.md)). Days of
   work, and they gate everything organic.
4. **Instrument analytics** before a single euro of traffic.
5. **SEO groundwork** — the only channel with a 9–18 month lead time, so it starts first and is
   judged at month 9 on one non-brand keyword in the top 20.
6. **Affiliate relationships** — terms drafted before recruiting anyone.

---

## Analytics — the minimum before any spend

No analytics exist today. Use a privacy-first, self-hostable stack: Plausible or PostHog. GA4 is
a liability for an unlicensed gambling brand.

Minimum event set:

```
page_view                route name, referrer, partner id if present
age_gate_accepted
registration_started
registration_completed
deposit_started          method
deposit_completed        amount, method, first_time_depositor: bool
game_opened              game slug, vertical
withdrawal_requested     amount, method
withdrawal_paid          amount, latency_seconds     ← the Withdrawal Writ SLA depends on this
```

`first_time_depositor` is the one flag every acquisition number in the plan is denominated in.
Without it, cost per FTD cannot be computed and no channel can be judged.

---

## KPIs

| Metric | Target | Note |
|---|---|---|
| Cost per FTD | ≤ €200 provisional | No published benchmark is trustworthy — the same sources give $50–$250, $150–$400 and €400–€650 for the same quantity, and each sells traffic. Re-derive as 30–33% of measured 12-month NGR per depositor once you have 100 real depositors. |
| NGR : CAC | ≥ 2× at day 90, ≥ 3× at 12 months | The gate on funding a second market. |
| ROAS on 90-day NGR | affiliates 4–6× · paid 3–4× | Measured on deduplicated 90-day NGR, never first-deposit revenue. Kill anything below 3×. |
| Affiliate quality | ≥ 40% of affiliate FTDs still depositing at day 90 | Plus every affiliate landing page scraped monthly. An affiliate's breach is your breach. |
| Complaint response | < 24h, tracked publicly | Review portals score operators on this and a bad public thread is close to permanent. |
| Marketing as % of online NGR | 60–120% year one → 20–26% by month 24 | Audited comparables put steady-state at 16–21% of online revenue excluding affiliate commission. |

Deliberately absent: registrations, impressions, reach, follower counts. None predicts revenue in
this category.

---

## Copy that cannot ship

CAP 16.3.6 prohibits suggesting gambling confers superiority, recognition or admiration; 16.3.4
prohibits framing it as financial security; 16.3.14 requires anyone depicted to plainly read as
over 25. CAP's remit reaches non-UK operators advertising into the UK.

THRONE's narrative sits directly on the prohibited idea. The rule that works: **describe what the
house is, never what the player becomes.**

| Cannot say | Can say |
|---|---|
| Become a Sovereign | Sovereign — the fifth tier of service |
| Rise through the ranks | Five tiers. Each is a level of service, not a level of you |
| Where fortunes are decided | Where the house keeps its word |
| Only 9 seats remain | The roster is capped at 500 — stated once as a fact, never as pressure |
| Claim your throne | Enter the Kingdom |

**These lines are currently live in the product**: "Rise Through The Ranks"
(`KingdomStatus.vue`), "Claim your throne" (`config.ts`), "Only 9 seats at the royal table"
(`HeroSection.vue`), "seats remain" (`TheInvitation.vue`).

Ban scarcity and urgency copy in the affiliate terms in writing, before recruiting anyone.
"Only 50 seats remain" is exactly the line an affiliate will write on your behalf, and under
LCCP-style rules that is your breach and your fine.

---

## n8n automation — where it earns its place

The n8n MCP server needs authorising before any of this can be built (`/mcp` in an interactive
session). Candidates, most valuable first:

1. **Withdrawal SLA watchdog.** Poll withdrawal latency; when a payout breaches its rank SLA,
   credit the penalty automatically and post to an ops channel. This is the one automation the
   brand promise literally depends on — the Withdrawal Writ says the house pays when it is late,
   and a promise nobody enforces is worse than none.
2. **Affiliate landing-page scraper.** Monthly crawl of every affiliate page carrying your links;
   diff against the approved copy; flag scarcity/urgency language. Their breach is your breach.
3. **Monthly statement dispatch.** The Crown's Accounts run, rendered and sent on the 1st.
4. **Review-portal monitor.** Watch AskGamblers / Casino Guru / Trustpilot for new complaints and
   route them inside the 24-hour SLA.
5. **Rank-gate reminders.** When a player passes a tribute floor but has not cleared the
   compliance gate, notify the host — never the player automatically, because that turns a
   compliance step into a marketing nudge.

Do not automate: anything that contacts a player based on inactivity, loss, or proximity to a
tier. Those are the exact patterns the progression design rules out, and an automation is not a
loophole.

---

## Open decisions

- Georgian rank names — direct mapping or authentic hierarchy. Both drawn in the Georgian Figma
  file.
- Whether to operate as a skin on an existing licence-holder. It changes every number by an order
  of magnitude and is the realistic small-team route.
- Who owns compliance — not as a title, as the named person who legals every line of ad copy and
  has the authority to kill a campaign.
