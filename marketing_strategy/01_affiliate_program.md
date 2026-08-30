# Affiliate Program — Launch Playbook

**Owner:** CMO / Head of Affiliates
**Applies to:** Curaçao (LOK) licensed operator, global excl. prohibited jurisdictions
**Status:** build spec — every number here is a starting position, not a floor

---

## 0. The one thing that decides whether this program works

Affiliates do not compare your **headline RevShare**. They compare your **effective rate on GGR**
after your NGR deductions, and they compare your **negative carryover clause**. A 50% RevShare with
an aggressive deduction stack pays less than a 35% deal with a clean one, and every serious affiliate
manager knows it.

So publish the deduction stack. It is the cheapest differentiator available to a new brand with no
track record, and it is the first thing an AskGamblers or GPWA listing reviewer will ask you for.

---

## 1. Launch sequence

### Phase 0 — Prerequisites (before you talk to a single affiliate)

| # | Item | Why it blocks launch |
|---|---|---|
| 1 | Affiliate platform live in staging | You cannot onboard without working `btag` attribution |
| 2 | S2S postback endpoint deployed + signed | Affiliates will test with their own tracker on day one |
| 3 | Published Affiliate T&C page | Required for AskGamblers/GPWA listing and for dispute defence |
| 4 | Withdrawal SLA documented and honoured | The #1 reason a portal delists a brand |
| 5 | Deduction stack written into the T&C | See §2.2 |
| 6 | Geo-blocklist enforced at registration | An affiliate sending traffic from a blocked geo will demand payment for it |
| 7 | RG pages live: self-exclusion, deposit limits, 18+ | Listing requirement, not optional |

### Phase 1 — Platform selection (week 1)

| Platform | Model | Fit |
|---|---|---|
| **Affilka by SoftSwiss** | SaaS, % of affiliate payout | Best fit if you are on a SoftSwiss/turnkey stack — native integration, no custom postbacks needed |
| **MyAffiliates** | Licence + hosting | Strong for multi-brand, mature reporting, self-hosted control |
| **Income Access (Paysafe)** | SaaS | Deep network of existing affiliates, higher cost, slower onboarding |
| **Cellxpert** | SaaS | Good middle ground, strong for hybrid deals |
| **PostAffiliatePro** | Cheap SaaS | Generic e-commerce tool. Avoid — no NGR modelling, no negative carryover logic |

**Recommendation:** Affilka if your platform is SoftSwiss-adjacent; MyAffiliates otherwise. Budget
$1.5k–4k/month at launch scale.

### Phase 2 — Commercial design (week 1–2)
Lock the tiers, the deduction stack, the carryover policy, and the CPA geo-grid. §2 and §3.

### Phase 3 — Technical (week 2–3)
Postback in/out, `btag` cookie + server-side attribution, FTD event, test account for affiliates. §5.

### Phase 4 — Seed recruitment (week 3–6)
Do **not** open public signup first. Hand-recruit 15–25 affiliates you actually want, so the program
has data and testimonials before it is publicly reviewable.

Priority order:
1. **Mid-tier geo-specialists** in your open markets (Mexico, Chile, Peru, Ecuador, Paraguay, Guatemala, DR) — they convert fastest and are reachable.
2. **Telegram channel owners** in LatAm — high FTD volume, low sophistication, needs fraud watch.
3. **Comparison/review sites** — slow to rank but compounding.
4. **Only then**: the big portals (§4).

### Phase 5 — Portal listings (week 6+)
AskGamblers, Casino Guru, GPWA, LatestCasinoBonuses, SlotCatalog. Requires §1 Phase 0 complete.
These reviewers will test your withdrawal SLA with a real account. Assume it.

### Phase 6 — Public program open (month 3)
Only after you can show payment history. An affiliate program with no payment history and a public
signup form reads as a scam to the exact people you want.

---

## 2. Commission structures

### 2.1 The NGR formula

```
GGR  = total wagers − total wins                       (gaming basis)

NGR  = GGR
       − bonus cost (issued and wagered by the player)
       − payment processing fees
       − game provider royalties
       − chargebacks and confirmed fraud
       − duty/licence fees attributable to the player
       ( − administrative fee — see warning below )
```

> **Warning on admin fees.** A flat "10% administrative fee" deduction is the single most common
> reason a program gets a bad reputation on GPWA. If you need the margin, take it in a lower headline
> rate instead. A transparent 35% beats an opaque 45%.

### 2.2 Published deduction stack (recommended)

| Deduction | Take it? | Rate |
|---|---|---|
| Bonus cost | Yes | actual |
| Payment processing | Yes | actual, ~4–7% of deposits in LatAm |
| Game provider royalties | Yes | actual, 10–15% of GGR |
| Chargebacks / fraud | Yes | actual |
| Duty / licence fee | Yes | actual |
| **Administrative fee** | **No** | — |
| **Negative carryover** | **No** (see §2.5) | — |

### 2.3 RevShare tiers

Tiered on **NGR generated in the calendar month**, not on FTD count. FTD-count tiers invite
low-quality volume.

| Tier | Monthly NGR | RevShare |
|---|---:|---:|
| 1 | $0 – $5,000 | 25% |
| 2 | $5,001 – $15,000 | 30% |
| 3 | $15,001 – $35,000 | 35% |
| 4 | $35,001 – $75,000 | 40% |
| 5 | $75,001 – $150,000 | 45% |
| 6 | $150,001+ | **50%** (negotiated, contract addendum) |

Tier is **retroactive within the month** — hitting Tier 3 pays 35% on the whole month's NGR, not just
the increment. Retroactive tiering is a materially better pitch and costs less than you think,
because the tail of affiliates never leaves Tier 1.

### 2.4 Worked example — RevShare

**Scenario:** Affiliate `AFF-2291` sends 40 FTDs in March. Market: Mexico.

```
Deposits from cohort                         $4,800
Total wagers                                $71,000
Total wins                                  $67,600
─────────────────────────────────────────────────────
Gross Gaming Revenue (GGR)                   $3,400

Deductions
  Bonus cost (issued + wagered)               −$600
  Payment processing (5.0% of deposits)       −$240
  Game provider royalties (12% of GGR)        −$408
  Chargebacks and confirmed fraud              −$50
  Duty / licence fee attributable              −$0     (Curaçao: no GGR duty)
─────────────────────────────────────────────────────
Net Gaming Revenue (NGR)                     $2,102

NGR $2,102 → Tier 1 (25%)                     $525.50
```

**Effective rate on GGR = 525.50 / 3,400 = 15.5%.**

This is the number the affiliate will compute. Show it to them before they compute it themselves.
At Tier 4 (40%) the same cohort pays $840.80 — an effective **24.7% of GGR**.

### 2.5 Negative carryover — the clause that wins deals

If one referred player wins big, that affiliate's NGR for the month goes negative.

**With negative carryover** (industry default, widely disliked):

| Month | NGR | Payout | Carried |
|---|---:|---:|---:|
| March | −$4,000 | $0 | −$4,000 |
| April | +$3,100 | $0 | −$900 |
| May | +$2,600 | $595 (35% of $1,700) | $0 |

The affiliate worked three months and got paid once. They will stop sending traffic in April.

**Without negative carryover** (recommended):

| Month | NGR | Payout |
|---|---:|---:|
| March | −$4,000 | $0 (reset) |
| April | +$3,100 | $930 |
| May | +$2,600 | $780 |

**Cost to you:** the $4,000 you were going to eat anyway — the player won it, it is a real loss
regardless of how you account for the affiliate. **Value to you:** "No negative carryover" is a
headline in every recruitment message and every GPWA thread.

**Guardrail:** reset monthly, but reserve the right to reinstate carryover for a specific affiliate on
evidence of bonus abuse or collusive play, with 30 days' notice. Put that in the T&C.

### 2.6 CPA — geo grid

CPA is paid per **qualified FTD** (§2.8), once per player, ever.

| Market | Status | CPA range (USD) | Notes |
|---|---|---:|---|
| Mexico | Grey — workable | $50 – 100 | Primary LatAm target |
| Chile | Grey — workable | $55 – 110 | High ARPU, bill pending |
| Peru | Regulating (MINCETUR) | $45 – 90 | Licence now required — legal review before scaling |
| Ecuador | Open | $35 – 70 | Low CPA, low ARPU, good volume |
| Paraguay / Bolivia | Open | $30 – 60 | Small but clean |
| Guatemala / DR / CR | Open | $35 – 75 | Underserved |
| Argentina | Province-by-province | $40 – 85 | CABA/BA licensed — offshore is grey |
| **Brazil** | **Closed to Curaçao** | — | Federal SPA licence required since 01-01-2025 |
| **Colombia** | **Closed to Curaçao** | — | Coljuegos licensed market, offshore blocked |
| India | **Prohibited** | — | Online Money Gaming Act 2025 |
| Philippines | Hostile | — | POGO ban Dec 2024 |
| China / Korea / Singapore / Indonesia / Thailand / Vietnam | **Criminal** | — | Do not target. Do not accept traffic. |
| Japan | Grey, enforcement rising | $150 – 300 | Only with counsel sign-off |

> Asia is not a volume market for a Curaçao licence in 2026. Treat the open Asian surface as
> **Japan (with counsel) and diaspora traffic only**, and put the budget in LatAm. See
> `03_ad_networks.md` §1.

### 2.7 Hybrid

`CPA + reduced RevShare` — the best structure for a new brand, because it de-risks the affiliate
without giving away the tail.

**Standard offer:** `$40 CPA + 20% RevShare (lifetime)`

Worked comparison on the same 40-FTD March cohort ($2,102 NGR, 12-month cohort NGR $8,400):

| Deal | Month 1 cost | 12-month cost | Affiliate 12-mo revenue |
|---|---:|---:|---:|
| Pure CPA @ $80 | $3,200 | $3,200 | $3,200 |
| Pure RevShare @ 35% | $736 | $2,940 | $2,940 |
| **Hybrid $40 + 20%** | **$2,020** | **$3,280** | **$3,280** |

Hybrid costs you the most in absolute terms and is still the right opening offer, because it is the
only one an unproven affiliate will accept without a track record from you.

### 2.8 Qualified FTD definition — put this verbatim in the T&C

A deposit qualifies for CPA only if **all** hold:

1. First-ever real-money deposit on the account.
2. Deposit ≥ **$20** (or local equivalent from the published table).
3. Player has **wagered ≥ 1× the deposit** on eligible games within 30 days.
4. Account passed KYC to the level required for withdrawal.
5. Deposit not reversed, charged back, or refunded within 60 days.
6. Player is not a duplicate of an existing account (device, payment instrument, or document match).
7. Player is not in a blocked geo, and the click did not originate from one.
8. Click-to-registration within the **90-day** attribution window.

CPA is clawed back if (5) or (6) is discovered post-payment. Clawback is capped at the current
month's payable balance — never invoice an affiliate.

### 2.9 Sub-affiliate

**5% of the sub-affiliate's earnings, paid by you, not deducted from them**, for 12 months.
Do not run 2nd-tier sub-affiliation. It attracts pyramid recruiters, not traffic.

---

## 3. Payment terms

| Term | Value |
|---|---|
| Cycle | Monthly, NET-15 (by the 15th for the prior month) |
| Minimum payout | $100 (rolls over) |
| Methods | Bank wire, Skrill, Neteller, USDT (TRC-20), Wise |
| Fees | Operator absorbs, except bank wire under $500 |
| Currency | USD or EUR, affiliate's choice, locked at declaration |
| Self-billing | Yes — you issue the statement, affiliate confirms in-panel |
| Reporting | Real-time: clicks, regs, FTDs, deposits, GGR, NGR, commission |
| Dispute window | 30 days from statement |

**Reporting transparency is a recruitment weapon.** Affiliates are used to seeing "commission" and
nothing else. Show them GGR *and* the deduction lines *and* NGR per player cohort.

---

## 4. Portal pitch templates

### 4.1 AskGamblers

AskGamblers is a **review and complaint** portal, not an ad network. Their leverage is the
AskGamblers Casino Complaint Service (ACCS). A listing is worth having only if you intend to answer
ACCS cases quickly — an unanswered case tanks your score publicly.

**What they will check before listing:** licence validity, T&C fairness (max-win caps, dormancy fees,
withdrawal limits), payout speed, RG tooling, and whether your bonus T&Cs contain predatory clauses.

**Fix before you apply:** any max-cashout cap on deposit-match bonuses under 10×, any monthly
withdrawal cap under $10k, any dormancy fee, any clause allowing confiscation for "irregular play"
without definition.

---

**Subject:** Casino listing request — THRONE (Curaçao LOK) — full T&C disclosure attached

> Hi [Name],
>
> I'm [Name], [Title] at THRONE, a Curaçao-licensed casino ([licence no.], [issuing entity]) that
> went live in [month year]. I'd like to request a listing and, more importantly, to enrol in ACCS
> from day one rather than after our first complaint.
>
> I'll skip the pitch and give you the four things I know you check:
>
> **1. Withdrawal terms.** No monthly withdrawal cap. No max-cashout multiplier on deposit-match
> bonuses. Pending period 12 hours; e-wallet payouts settle same-day, cards 1–3 business days.
> Our published SLA and our actual last-90-day median are both in the attached sheet — they match.
>
> **2. Bonus T&Cs.** 35× wagering on bonus only (not deposit + bonus). $5 max bet during wagering,
> enforced by the platform rather than by manual review. Game weighting published per provider.
> No "irregular play" confiscation clause — we removed it before applying to you.
>
> **3. Responsible gambling.** Deposit, loss, and session limits self-serve in-account with a
> 24-hour cooling-off on increases and immediate effect on decreases. Self-exclusion 6/12/24 months
> and permanent. Reality checks. All promotional messaging suppressed for any player who has set a
> limit or requested a break — enforced in our CRM, not by policy.
>
> **4. Complaints.** [Name], [email] is the named ACCS contact with a 24-hour first-response
> commitment. It reaches a person, not a queue.
>
> Attached: licence certificate, full T&C, bonus T&C, RG policy, 90-day payout data, and our
> affiliate T&C (no negative carryover, published deduction stack — relevant if you also review
> affiliate programs).
>
> Happy to open a test account with real funds for your review team.
>
> [Name] · [Title] · [direct email] · [Telegram]

---

### 4.2 GPWA

GPWA is a **webmaster community** with a Code of Conduct. You do not "pitch" GPWA — you apply for
approved-program status and then participate in the forums as a named affiliate manager. Cold
promotional posts get you flamed.

**What the community punishes:** negative carryover, retroactive term changes, account hijacking
(taking players from an affiliate after N months), non-payment, and affiliate managers who disappear.

**What earns credibility:** a named human with a real photo and history, answering hard questions in
public, and lifetime revshare with no expiry.

---

**Forum introduction post — `Affiliate Program Announcements`**

> **THRONE Affiliates — no negative carryover, published NGR deductions, lifetime revshare**
>
> I'm [Name], affiliate manager at THRONE. New program, Curaçao LOK licence [no.], live since
> [month]. I'd rather post our actual terms than a banner, so here they are, including the parts
> most programs bury.
>
> **Commission:** 25–50% RevShare, tiered on monthly NGR, **retroactive within the month**. Hybrid
> $40 CPA + 20% RevShare available from day one, no volume commitment. CPA-only by negotiation.
>
> **Negative carryover: none.** Monthly reset. If one of your players hits a jackpot, that is our
> loss, not a debt we make you work off. We reserve the right to reinstate carryover on evidence of
> bonus abuse, with 30 days' written notice — that is the only exception and it is in the T&C.
>
> **Our NGR deductions, in full:** bonus cost, payment processing (actual), game provider royalties
> (actual, 10–15% of GGR), chargebacks and confirmed fraud, duty. **No administrative fee.** Your
> dashboard shows every deduction line per cohort, not just a commission number.
>
> **Lifetime revshare.** No expiry, no reduction after N months, no "inactive affiliate" clause that
> reassigns your players. If you stop sending traffic, you keep earning on the players you sent.
>
> **Attribution:** 90-day cookie plus server-side click_id, last non-direct click. S2S postbacks for
> reg and FTD; we support Voluum, Binom, Keitaro, RedTrack out of the box.
>
> **Payments:** NET-15 monthly, $100 minimum, wire / Skrill / Neteller / USDT-TRC20 / Wise. We pay
> the fees.
>
> **Markets we accept:** MX, CL, PE, EC, PY, BO, GT, DO, CR, AR. **Markets we block at
> registration**, so please do not send traffic you will not be paid for: BR, CO, US, UK, FR, NL,
> plus the full prohibited list in the T&C. Blocked-geo traffic is not payable and I would rather
> you know that before you buy it than after.
>
> **What we do not have yet:** brand recognition, a payment history longer than [N] months, and a
> Spanish-language support team past 22:00 UTC-6. I would rather say that now than have you find it.
>
> AMA in this thread — I answer everything including the uncomfortable ones.
>
> [Name] · [email] · Telegram @[handle] · GPWA verified [pending/approved]

---

### 4.3 Direct outreach — mid-tier affiliate

**Subject:** THRONE — $40 + 20% hybrid, no negative carryover, [Market] focus

> Hi [Name],
>
> Saw your [site/channel] ranks for [specific keyword] in [market]. We're a new Curaçao-licensed
> casino targeting exactly that market and I'd like to be your test brand for a month.
>
> Opening offer, no volume commitment: **$40 CPA + 20% lifetime RevShare**, no negative carryover,
> NET-15.
>
> Three things that are actually different:
> - We publish our NGR deduction stack and show every line in your dashboard.
> - We block BR/CO at registration, so you'll never buy traffic we won't pay for.
> - Our welcome bonus is 35× on bonus only with a platform-enforced $5 max bet — which means your
>   players actually clear it, which means they redeposit, which means your revshare tail is real.
>
> Want a test account with real balance to look at the product before you decide?
>
> [Name] · [Telegram]

---

## 5. S2S postback — technical flow

### 5.1 Why S2S rather than pixel

Client-side pixels are lost to ad blockers, ITP/ETP cookie truncation (Safari caps client-set cookies
at 7 days, or 24 hours for script-set cookies with a cross-site referrer), and iOS in-app browsers.
For a 90-day attribution window a pixel is not viable. Server-to-server is the only reliable option.

### 5.2 End-to-end flow

```
┌─ 1. CLICK ────────────────────────────────────────────────────────────────┐
│ Affiliate sends:                                                          │
│   https://throne.example/?btag=AFF2291_camp45&click_id={clickid}          │
│   (&sub1= &sub2= … passed through untouched)                              │
└───────────────────────────────────────────────────────────────────────────┘
                    │
┌─ 2. LAND ─────────┴───────────────────────────────────────────────────────┐
│ Edge/server (NOT client JS) writes a first-party HttpOnly cookie:         │
│   thr_attr = {click_id, btag, ts, landing_url, ip_country}  90d           │
│ AND writes an attribution row keyed by a server-generated visitor_id.     │
│ Server-set cookies survive ITP; script-set ones do not.                   │
└───────────────────────────────────────────────────────────────────────────┘
                    │
┌─ 3. REGISTER ─────┴───────────────────────────────────────────────────────┐
│ On account creation the attribution row is copied onto the player record  │
│ and FROZEN. Never re-read the cookie after registration — that is how     │
│ affiliates steal each other's players.                                    │
│   → fire postback: event=registration                                     │
└───────────────────────────────────────────────────────────────────────────┘
                    │
┌─ 4. FIRST DEPOSIT ┴───────────────────────────────────────────────────────┐
│ PSP webhook → verify signature → settle deposit → evaluate FTD:           │
│   is_first_ever AND amount >= min AND geo_allowed                         │
│   → INSERT INTO ftd_events (player_id UNIQUE)   ← idempotency lives here  │
│   → enqueue postback job                                                  │
└───────────────────────────────────────────────────────────────────────────┘
                    │
┌─ 5. POSTBACK ─────┴───────────────────────────────────────────────────────┐
│ GET https://track.partner.com/postback                                    │
│     ?cid=<click_id>&event=ftd&payout=80.00&currency=USD                   │
│     &txid=<deposit_id>&ts=<unix>&sig=<hmac_sha256>                        │
│ 200 → done. 5xx/timeout → retry 1m, 5m, 30m, 2h, 6h → dead-letter.        │
│ 4xx → do NOT retry, alert.                                                │
└───────────────────────────────────────────────────────────────────────────┘
```

Implementation: `../tech_integrations/tracking_and_postbacks.js`

### 5.3 Parameter contract

| Param | Type | Notes |
|---|---|---|
| `cid` | string | The affiliate's `click_id`, echoed back **verbatim** |
| `event` | enum | `registration` · `ftd` · `deposit` · `revshare` |
| `payout` | decimal | CPA amount, or 0 for non-payable events |
| `currency` | ISO 4217 | Always the currency the payout is denominated in |
| `txid` | string | Your transaction id — the network's dedup key |
| `ts` | int | Unix seconds, used for replay rejection |
| `sig` | hex | HMAC-SHA256 over sorted params + shared secret |
| `sub1..sub5` | string | Passed through untouched from the click |

### 5.4 Security rules — non-negotiable

1. **Never put PII in a postback URL.** No email, no name, no document number, no IP. Query strings
   land in the partner's access logs, their CDN logs, and their analytics.
2. **Sign every postback.** HMAC-SHA256 over the sorted parameter string plus a per-partner secret.
3. **Reject replays.** `ts` older than 300 seconds is rejected on inbound.
4. **Compare signatures in constant time.** `crypto.timingSafeEqual`, never `===`.
5. **Allowlist outbound hosts.** A compromised affiliate record must not be able to point your
   postback at an arbitrary URL — that is an SSRF into your own infrastructure.
6. **Idempotency in the database, not the queue.** A `UNIQUE` constraint on `player_id` in the FTD
   table is the only thing that survives a duplicate PSP webhook.
7. **Retry only 5xx and network errors.** Retrying a 4xx creates duplicate conversions on the
   partner side and gets your postbacks blocked.
8. **Rotate secrets per partner**, and support two valid secrets during rotation.

### 5.5 Inbound testing tool

Ship an affiliate-facing test page that fires a signed test postback with `event=test`. Affiliates
will ask for it on day one; not having it costs you a week of back-and-forth per partner.

---

## 6. Fraud controls

| Vector | Detection | Response |
|---|---|---|
| Incentivised/fake FTDs | Deposit → immediate withdrawal, no wagering | §2.8(3) wagering requirement kills it at source |
| Multi-accounting | Device fingerprint, payment instrument, KYC document hash | Void CPA, close accounts, suspend affiliate |
| Bonus abuse rings | Correlated bet patterns, shared IP/device across affiliates | Reinstate carryover for that affiliate (§2.5) |
| Click stuffing / cookie stuffing | Click-to-reg ratio > 5,000:1; clicks with no landing pageview | Attribution audit, terminate |
| Brand bidding | Automated SERP monitoring on brand + variants | Warning → void month → terminate. Put the ban in the T&C |
| Blocked-geo traffic | `ip_country` at click vs. registration geo | Not payable; flag if repeated |

Review the top 10 affiliates by CPA spend **monthly** on cohort quality: D7 retention, deposit #2
rate, and wager-to-deposit ratio. A cohort with a 90% D1 churn and a 1.0× wager ratio is
incentivised traffic regardless of what the affiliate says.

---

## 7. KPIs

| Metric | Formula | Target (month 6) |
|---|---|---|
| Affiliate share of FTDs | affiliate FTDs / all FTDs | 45–60% |
| Blended CPA | total affiliate cost / FTDs | ≤ $75 |
| CPA : 12-mo NGR | 12-mo cohort NGR / CPA cost | ≥ 2.5 : 1 |
| CPA payback | months to cumulative NGR = CPA | ≤ 4 |
| Active affiliates | ≥ 1 FTD in month | 60+ |
| Top-10 concentration | top 10 affiliates' share of FTDs | ≤ 50% |
| Reg → FTD | FTDs / registrations | ≥ 35% |
| Affiliate D30 retention | cohort still depositing at D30 | ≥ 22% |

**The concentration metric is the risk one.** If your top 10 affiliates are 80% of volume, you do not
have an affiliate program — you have ten counterparties who can all raise their price at once.

---

## 8. What this codebase would need

Not present in `throne_v1` today. All of §5 depends on it.

- [ ] Server-side `btag`/`click_id` capture at the edge, written to an HttpOnly cookie
- [ ] `attribution` table, frozen onto the player record at registration
- [ ] Real auth with persistent player records (`useAuth.ts` is client-side only today)
- [ ] PSP integration with signed deposit webhooks
- [ ] `ftd_events` table with a `UNIQUE` constraint on `player_id`
- [ ] Postback dispatch worker with retry + dead-letter
- [ ] Geo-blocklist enforced at registration, not just at the CDN
