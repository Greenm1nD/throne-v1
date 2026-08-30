# Email · SMS · Push — Conversion Templates

**Owner:** CRM Lead
**Bound to:** `automation_flows.json` → `bonus_catalog` and `flows[].steps[].template`
**Markets:** MX · CL · PE · EC · PY · GT · DO — EN master, ES-419 / ES-MX localised

---

## Rules that bind every template here

| Rule | Why |
|---|---|
| **No countdown timers, no fake scarcity** | The mechanic that converts hardest is also the one that generates complaints, fails ad-network compliance review, and appears in every regulator's dark-pattern guidance. Expiry dates are stated as facts, never as ticking clocks. |
| **No "you're so close", no loss-chasing framing** | Never reference a player's losses, never imply a win is due, never suggest playing to recover. |
| **No status/success claims** | Nothing implying gambling brings admiration, popularity, or life improvement. This is CAP 16.3.6-shaped and it is also what gets an account suspended at network review. |
| **18+ mark and RG link in every message** | Including SMS and push, where space is tightest. Something else gets cut first. |
| **Bonus T&Cs summarised in-message, linked in full** | Wagering multiplier, basis, max bet and expiry appear in the message body — not only behind a link. |
| **Suppression is upstream** | These templates assume `global.suppression` in `automation_flows.json` has already filtered out limited, cooling-off, and self-excluded players. Never re-implement that check here. |

**Personalisation tokens:** `{{first_name}}` `{{currency}}` `{{country}}` `{{bonus_amount}}`
`{{deposit_amount}}` `{{expiry_date}}` `{{manager_first_name}}` `{{cta_url}}` `{{unsub_url}}`

Every token needs a fallback. `Hi ,` is worse than `Hi there,` and it is the single most common
CRM embarrassment in the category.

---

## 1. EMAIL — Welcome Bonus (100% Match + Free Spins)

**Flow:** `flow_welcome` → step 2 (Day 1)
**Template id:** `email_welcome_bonus`
**Segment:** `seg_new_registrant` (registered, zero deposits)
**Send window:** 17:00–21:00 player local
**Bonus payload:** `BNS_WELCOME_100` + `BNS_WELCOME_FS100`

### Subject lines — A/B/C

| Variant | Subject | Preheader | Logic |
|---|---|---|---|
| **A — direct** | `Your 100% welcome match is ready, {{first_name}}` | `Plus 100 free spins, 20 a day for 5 days.` | Clear, no cleverness. The control. |
| **B — mechanic** | `35x wagering. On the bonus only — not the deposit.` | `Most casinos double that number. Here is ours in full.` | Attacks the term players distrust most. Lower open rate, materially higher click-to-deposit. |
| **C — name-led** | `{{first_name}}, your account is open` | `Your welcome match and 100 spins are waiting inside.` | Highest open rate, lowest intent. Useful as a deliverability warm-up on cold domains. |

> **Do not use** emoji-stuffed or all-caps subject lines. In LatAm, Gmail and Outlook filtering on
> gambling-adjacent senders is aggressive; "🎰💰 GET YOUR BONUS NOW!!!" is a spam-folder guarantee.

### Body

```
─────────────────────────────────────────────────────────────
  [THRONE logo]                                        18+
─────────────────────────────────────────────────────────────

  Welcome, {{first_name|there}}.

  Your account is open. Your first deposit is matched 100%,
  up to {{currency}}200 — and it comes with 100 free spins.


  ┌─────────────────────────────────────────────────────┐
  │                                                     │
  │   100% MATCH        up to {{currency}}200           │
  │   100 FREE SPINS    20 a day for 5 days             │
  │                                                     │
  │   [  Claim your match  ]                            │
  │                                                     │
  └─────────────────────────────────────────────────────┘


  THE TERMS, IN FULL — NOT BEHIND A LINK

  • 35x wagering, on the bonus only. Not on deposit + bonus.
    Deposit {{currency}}100, get {{currency}}100 bonus, and you
    wager {{currency}}3,500 — not {{currency}}7,000.

  • {{currency}}5 maximum bet while wagering. Enforced by the
    platform, so you cannot break it by accident and lose
    the bonus.

  • Slots count 100%. Live casino 10%. Table games 5%.

  • No maximum cashout. What you win is what you withdraw.

  • 7 days to clear it, from {{expiry_date}}.

  • Free spins: {{currency}}0.20 each, 20x on winnings only,
    {{currency}}100 maximum win.


  WHY WE PRINT THE ARITHMETIC

  Because most operators do not, and the ones that do not are
  usually hiding a 40x on deposit-plus-bonus with a max-bet
  rule they enforce manually, after you have won.

  Full bonus terms → {{terms_url}}


─────────────────────────────────────────────────────────────
  {{operator_legal_name}} · Curaçao licence {{licence_no}}
  18+ only. Play for entertainment, never with money you
  cannot afford to lose.
  Deposit limits and self-exclusion → {{rg_url}}
  {{local_help_service}}
  Unsubscribe → {{unsub_url}}
─────────────────────────────────────────────────────────────
```

### ES-MX

```
  Bienvenido, {{first_name|}}.

  Tu cuenta está abierta. Tu primer depósito se duplica al
  100%, hasta {{currency}}200 — y trae 100 giros gratis.

  [  Reclamar mi bono  ]

  LOS TÉRMINOS COMPLETOS — NO ESCONDIDOS EN UN ENLACE

  • Rollover 35x, solo sobre el bono. No sobre depósito + bono.
    Depositas {{currency}}100, recibes {{currency}}100, y
    apuestas {{currency}}3,500 — no {{currency}}7,000.
  • Apuesta máxima de {{currency}}5 durante el rollover,
    bloqueada por la plataforma.
  • Tragamonedas 100%. Casino en vivo 10%. Mesa 5%.
  • Sin límite de retiro. Lo que ganas, lo retiras.
  • 7 días desde {{expiry_date}}.
  • Giros: {{currency}}0.20 cada uno, 20x sobre ganancias,
    máximo {{currency}}100.

  +18. Juega por entretenimiento, nunca con dinero que no
  puedas permitirte perder.
```

### Notes

- **The terms block is the creative**, not a footer. Every competitor buries the wagering
  requirement; printing it as the body copy is the differentiator, and it pre-empts the complaint
  that otherwise arrives at withdrawal.
- **`{{currency}}` must resolve to local currency**, not USD. MXN in Mexico, CLP in Chile. A Mexican
  player reading "$200" and receiving MX$200 will open a complaint, and they will be right to.
- **Plain-text alternative is mandatory.** HTML-only email from a new gambling domain is a
  spam-folder signal.
- **Single CTA.** One button, repeated at most twice. Competing CTAs measurably reduce clicks.
- **Deliverability:** authenticate with SPF, DKIM and DMARC before the first send, and warm the
  domain over 2–3 weeks. A cold domain sending 10k gambling emails on day one is dead on arrival.

---

## 2. SMS — Weekend Reload Bonus

**Segment:** `seg_weekend_reload_eligible` (2+ deposits, active in last 10 days, ≥ $40 lifetime NGR)
**Bonus payload:** `BNS_RELOAD_50` (50% up to $100, 30x bonus-only, $5 max bet, 3 days)
**Send:** Friday 18:00–20:00 player local
**Frequency cap:** 2 SMS per rolling 7 days (`automation_flows.json` → `global.frequency_caps`)

SMS is the most expensive and most intrusive channel you own. Use it for offers with a genuine
time boundary and a high enough value to justify the interruption — not for newsletters.

### EN — 158 chars incl. opt-out

```
{{first_name}}: 50% reload up to {{currency}}100 this weekend.
30x on bonus only. Ends Sun.
{{short_url}}
18+ {{rg_short_url}}
Stop: reply STOP
```

`─ 158 characters. One segment (GSM-7 limit is 160). ─`

### ES-MX — 157 chars

```
{{first_name}}: 50% de recarga hasta {{currency}}100 este fin
de semana. Rollover 30x solo bono. Termina dom.
{{short_url}}
+18 {{rg_short_url}}
STOP para salir
```

`─ 157 characters. Watch accented characters — see below. ─`

### Character economics

| Encoding | Chars per segment | Trigger |
|---|---:|---|
| GSM-7 | 160 (153 in a multipart) | Plain Latin, no accents |
| UCS-2 | **70** (67 in a multipart) | **Any** `á é í ó ú ñ ¿ ¡ →` character |

**One `ñ` more than halves your capacity and doubles your cost per message.** Two options:

1. **Strip accents** — `Bienvenido` not `Bienvenído`, `manana` not `mañana`. Reads slightly wrong to
   a native speaker but costs half.
2. **Accept UCS-2** and write to 70 characters:
   ```
   50% recarga hasta {{currency}}100. Rollover 30x. Dom.
   {{short_url}} +18 STOP
   ```
   `─ 69 characters, UCS-2 safe ─`

**Recommendation:** accept UCS-2 and write short. Correct Spanish is worth the send cost, and a
70-character SMS outperforms a 160-character one regardless.

### SMS rules

| Rule | Detail |
|---|---|
| Sender ID | Registered alphanumeric where supported (MX, CL). Never a random long code |
| Opt-out | Mandatory in every message. `STOP` (EN) / `STOP` (ES — keep the English keyword, carriers standardise on it) |
| Opt-out latency | Honoured within seconds, not at the next batch |
| Quiet hours | 22:00–09:00 local, hard block. An SMS at 03:00 gets you carrier-blocked, not just complained about |
| Link | Branded short domain on your own DNS. Generic shorteners are filtered by LatAm carriers as spam |
| Phone verified | Required. Never SMS an unverified number — you will pay to message a typo |
| Cost | ~$0.03–0.08/segment in LatAm. At 50k sends a 2-segment message is $3–8k instead of $1.5–4k |

### What not to send by SMS

- Anything without a real deadline (that is email's job).
- Win-back offers to dormant players — dormancy plus an interruptive channel reads as pursuit.
- Anything to a player who has ever set a limit. Already blocked upstream; do not add an exception.
- More than one message per weekend, ever.

---

## 3. PUSH — Deposit Abandonment Recovery

**Flow:** `flow_deposit_abandonment` → step 1
**Template id:** `push_deposit_abandon` (+ branch variants)
**Trigger:** `deposit_initiated`, not completed, 20 minutes elapsed
**Cap:** 2 entries per player per week, 72h cooldown

The insight this template is built on: **most abandoned deposits in LatAm are failed payments, not
changed minds.** Card decline rates on cross-border gambling MCCs run 30–60% in the region. So the
message leads with a fix, not with a bonus. A bonus offered to someone whose card just declined
reads as tone-deaf, because their problem is not motivation.

### Variant A — card declined (`push_deposit_declined_alt_method`)

```
Title:  Your card was declined — not your fault
Body:   {{country}} cards often block gaming payments. SPEI and
        OXXO go through in under 2 minutes.
Deep link: /cashier?method=spei&amount={{deposit_amount}}
```
`─ Title 41 / Body 89. Android ~65 title, ~240 body. iOS ~178 total. ─`

**ES-MX**
```
Title:  Tu tarjeta fue rechazada — no es tu culpa
Body:   Los bancos en México suelen bloquear estos pagos. Con
        SPEI u OXXO entra en menos de 2 minutos.
```

### Variant B — session timeout (`push_deposit_timeout`)

```
Title:  Your deposit did not go through
Body:   The session timed out before it completed. Nothing was
        charged. Your {{currency}}{{deposit_amount}} is one tap away.
Deep link: /cashier?amount={{deposit_amount}}&method={{last_method}}
```

**"Nothing was charged" is the most important sentence in this file.** The player's actual fear is a
double charge. Answering it converts better than any incentive.

### Variant C — user abandoned (`push_deposit_abandon`)

```
Title:  Still there, {{first_name}}?
Body:   Your cashier is open with {{currency}}{{deposit_amount}}
        ready. Pick up where you left off.
Deep link: /cashier?amount={{deposit_amount}}
```

**ES-MX**
```
Title:  ¿Sigues ahí, {{first_name}}?
Body:   Tu caja está abierta con {{currency}}{{deposit_amount}}
        lista. Continúa donde te quedaste.
```

### Push specs

| Element | Android | iOS |
|---|---|---|
| Title | ~65 chars visible | ~178 total (title + body) |
| Body | ~240 collapsed, more expanded | truncated at ~178 |
| Icon | 24×24 monochrome, transparent | app icon |
| Image | 1440×720 optional | 1038×1038 optional |
| Deep link | Required — never open the home page | Required |

**Deep link straight into the cashier with the amount pre-filled.** Dropping an abandoner on the
home page loses most of them; they have already done this once and will not do it twice.

### Push rules

| Rule | Detail |
|---|---|
| Timing | 20 minutes. Under 10 feels like surveillance; over 60 the intent is gone |
| Frequency | Max 2 abandonment pushes per week per player, 72h cooldown |
| Quiet hours | 22:00–09:00 local, hard block |
| Badge | Never use a badge count for promotional pushes. Reserve badges for account and withdrawal events |
| No timers | No "expires in 15 minutes". No countdown. The cashier does not expire |
| Sequence | Two attempts (push at 20m, email at 4h), then stop |

### Why there is no bonus in any of these

An abandonment incentive teaches players to abandon. Once a "come back and get 20% extra" push
exists, a measurable share of players learn to open the cashier and close it. The recovery message
solves a payment problem; it does not bid for the deposit.

If a bonus is genuinely warranted, put it in the **4-hour email** (step 2), not the 20-minute push —
by then it is a re-engagement message rather than a bid placed mid-decision.

---

## 4. Message-level compliance checklist

Run before any template ships.

- [ ] 18+ mark present and legible
- [ ] Link to responsible gambling / self-exclusion present
- [ ] Local help-service reference where one exists for the geo
- [ ] Licence holder name and number (email only — SMS/push may link)
- [ ] Unsubscribe (email) / STOP (SMS) / notification settings link (push)
- [ ] Wagering multiplier **and basis** stated, not just the multiplier
- [ ] Max bet during wagering stated
- [ ] Expiry stated as a **date**, not a countdown
- [ ] Max cashout stated, or explicitly stated as uncapped
- [ ] No claim of guaranteed, likely, or due outcomes
- [ ] No implication of status, admiration, or social success
- [ ] No reference to the player's losses or to recovering them
- [ ] No urgency device: no timer, no "last chance", no "only today"
- [ ] Currency token resolves to **local** currency
- [ ] Every token has a fallback; render-tested with all tokens empty
- [ ] Suppression verified: sample 20 recipients against the RG exclusion list
- [ ] Spanish reviewed by a native speaker of the **target country's** variant

---

## 5. Benchmarks

| Channel | Metric | Category benchmark | Target |
|---|---|---:|---:|
| Email — welcome | Open rate | 22–30% | 32% |
| Email — welcome | Click rate | 3–6% | 8% |
| Email — welcome | Reg → FTD attributed | 12–18% | 22% |
| Email — all | Unsubscribe | < 0.5% | < 0.3% |
| Email — all | Spam complaint | < 0.1% | < 0.05% |
| SMS — reload | Click rate | 8–14% | 16% |
| SMS — reload | Deposit rate | 3–6% | 7% |
| SMS — all | Opt-out | < 2% | < 1% |
| Push — abandonment | Open rate | 4–9% | 11% |
| Push — abandonment | Recovery within 24h | 15–25% | 22% |
| Push — all | Disable rate | < 3% | < 2% |

Read every one of these against the flow's **holdout control group**
(`automation_flows.json` → `global.global_control_group`). A 22% recovery rate is worthless if the
control group recovers at 20% on its own — that is a 2-point lift being reported as a 22-point one.
