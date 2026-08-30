/**
 * ============================================================================
 *  AFFILIATE TRACKING & CONVERSION POSTBACKS
 * ============================================================================
 *
 *  Server-to-server (S2S) conversion tracking for an online casino.
 *  Node.js 20+ ESM. No framework dependency beyond the Express handlers at the
 *  bottom, which are illustrative and easy to port.
 *
 *  WHY S2S AND NOT A PIXEL
 *  -----------------------
 *  Client-side conversion pixels do not survive the environment we operate in:
 *    - Safari ITP truncates script-set first-party cookies to 24h when the
 *      landing referrer is cross-site, and 7 days otherwise.
 *    - Ad blockers strip third-party conversion tags outright.
 *    - iOS in-app browsers (Instagram, Telegram) sandbox storage per session.
 *  A 90-day affiliate attribution window is simply not expressible client-side.
 *  Attribution is therefore captured server-side at the edge and replayed
 *  server-to-server at conversion time.
 *
 *  THE FIVE INVARIANTS
 *  -------------------
 *   1. An FTD fires EXACTLY ONCE per player, ever. Enforced by a UNIQUE
 *      constraint in the database — not by queue semantics, not by a cache.
 *   2. Attribution is FROZEN at registration. The cookie is never re-read
 *      afterwards; that is how affiliates steal each other's players.
 *   3. No PII ever enters a postback URL. Query strings land in the partner's
 *      access logs, their CDN logs, and their analytics warehouse.
 *   4. Outbound postback hosts are ALLOWLISTED. A writable affiliate record
 *      that feeds an outbound URL is an SSRF into your own network.
 *   5. Retry 5xx and network errors only. Retrying a 4xx manufactures
 *      duplicate conversions on the partner side.
 *
 *  See: ../marketing_strategy/01_affiliate_program.md §5
 * ============================================================================
 */

import crypto from 'node:crypto';

// ---------------------------------------------------------------------------
// 1. CONFIGURATION
// ---------------------------------------------------------------------------

/**
 * Outbound postback hosts we are willing to call. Invariant 4.
 *
 * Affiliate records are operator-editable, and an editable field that becomes
 * an outbound HTTP request is a server-side request forgery primitive. The
 * allowlist is the control: a compromised or careless admin cannot point a
 * postback at 169.254.169.254 or at an internal service.
 */
const ALLOWED_POSTBACK_HOSTS = new Set([
  'track.voluum.com',
  'trk.voluum.com',
  'postback.affilka.com',
  'api.affilka.com',
  'postback.income-access.com',
  'trk.myaffiliates.com',
]);

/** Retry schedule in milliseconds. Roughly 1m, 5m, 30m, 2h, 6h. */
const RETRY_SCHEDULE_MS = [60_000, 300_000, 1_800_000, 7_200_000, 21_600_000];

/** Outbound request timeout. Partners are slow; they are not this slow. */
const POSTBACK_TIMEOUT_MS = 8_000;

/** Inbound signature freshness window. Anything older is a replay. */
const REPLAY_WINDOW_SECONDS = 300;

/** Attribution window. Must match what is published in the affiliate T&C. */
export const ATTRIBUTION_WINDOW_DAYS = 90;

/**
 * Minimum qualifying first deposit, in minor units, per currency.
 * Mirrors affiliate T&C §2.8(2). Keep this in sync with the published table or
 * you will be arguing with affiliates about individual conversions.
 */
const MIN_QUALIFYING_DEPOSIT_MINOR = {
  USD: 2000, // $20.00
  EUR: 2000,
  MXN: 35000, // ~$20
  CLP: 1900000, // ~$20
  PEN: 7500,
};

// ---------------------------------------------------------------------------
// 2. CRYPTOGRAPHY
// ---------------------------------------------------------------------------

/**
 * Canonical string for signing: parameters sorted by key, joined `k=v&k=v`.
 *
 * Sorting matters. If signer and verifier disagree on parameter order, every
 * signature fails, and the failure looks like a shared-secret problem — which
 * is a genuinely unpleasant afternoon.
 *
 * `sig` itself is always excluded from its own input.
 *
 * @param {Record<string, string|number>} params
 * @returns {string}
 */
function canonicalize(params) {
  return Object.keys(params)
    .filter((k) => k !== 'sig' && params[k] !== undefined && params[k] !== null)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&');
}

/**
 * HMAC-SHA256 over the canonical parameter string.
 *
 * @param {Record<string, string|number>} params
 * @param {string} secret Per-partner shared secret. Never a global secret —
 *   one leaked partner must not be able to forge another partner's postbacks.
 * @returns {string} lowercase hex digest
 */
export function signParams(params, secret) {
  return crypto.createHmac('sha256', secret).update(canonicalize(params)).digest('hex');
}

/**
 * Constant-time signature verification. Invariant: never use `===`.
 *
 * A naive string comparison short-circuits on the first differing byte, which
 * leaks the correct prefix through timing and makes the signature forgeable
 * byte by byte. `timingSafeEqual` does not short-circuit — but it THROWS on
 * length mismatch, so the length is checked first and a mismatch is simply a
 * failed verification.
 *
 * @param {Record<string, string|number>} params Received params, including `sig`
 * @param {string} secret
 * @param {string} receivedSig
 * @returns {boolean}
 */
export function verifySignature(params, secret, receivedSig) {
  if (typeof receivedSig !== 'string') return false;

  const expected = Buffer.from(signParams(params, secret), 'utf8');
  const received = Buffer.from(receivedSig, 'utf8');

  // Length check before timingSafeEqual, which throws on unequal lengths.
  // This leaks only the length of the signature, which is a public constant.
  if (expected.length !== received.length) return false;

  return crypto.timingSafeEqual(expected, received);
}

/**
 * Reject stale requests. Without this, a signed URL captured from a log is
 * replayable forever, and replaying an FTD postback is free money for whoever
 * captured it.
 *
 * @param {number|string} ts Unix seconds from the request
 * @returns {boolean}
 */
export function isFresh(ts) {
  const t = Number(ts);
  if (!Number.isFinite(t)) return false;
  return Math.abs(Math.floor(Date.now() / 1000) - t) <= REPLAY_WINDOW_SECONDS;
}

/**
 * Redact secrets and PII before anything reaches a log sink.
 *
 * Postback URLs are logged by default by most HTTP clients and APM agents.
 * Route every logged URL through this.
 *
 * @param {string} url
 * @returns {string}
 */
export function redactUrl(url) {
  try {
    const u = new URL(url);
    for (const key of ['sig', 'secret', 'token', 'key', 'email', 'phone', 'ip']) {
      if (u.searchParams.has(key)) u.searchParams.set(key, '[REDACTED]');
    }
    return u.toString();
  } catch {
    return '[unparseable-url]';
  }
}

// ---------------------------------------------------------------------------
// 3. CLICK CAPTURE & ATTRIBUTION
// ---------------------------------------------------------------------------

/**
 * Parse affiliate parameters off a landing request.
 *
 * Runs at the EDGE (middleware / CDN worker), before the SPA boots. Client-side
 * capture loses ad-blocked and JS-disabled users, and — more importantly —
 * a script-set cookie is capped at 24h by Safari when arriving from a
 * cross-site referrer, which is every affiliate click.
 *
 * @param {URL} url
 * @returns {{click_id: string, btag: string, subs: Record<string,string>} | null}
 */
export function parseClick(url) {
  const p = url.searchParams;

  // `click_id` is the affiliate network's own identifier and MUST be echoed
  // back verbatim. Networks match on exact string equality; any normalisation
  // (trimming, lowercasing, re-encoding) breaks attribution silently.
  const clickId = p.get('click_id') || p.get('clickid') || p.get('cid');
  const btag = p.get('btag') || p.get('aff') || p.get('a_aid');

  if (!clickId && !btag) return null;

  // Bound the length: these land in a cookie and in a database column, and an
  // unbounded attacker-supplied string is a denial-of-service on both.
  const clamp = (v) => (typeof v === 'string' ? v.slice(0, 255) : '');

  const subs = {};
  for (let i = 1; i <= 5; i++) {
    const v = p.get(`sub${i}`);
    if (v) subs[`sub${i}`] = clamp(v);
  }

  return { click_id: clamp(clickId || ''), btag: clamp(btag || ''), subs };
}

/**
 * Cookie options for the attribution cookie.
 *
 * `httpOnly` is what makes this survive ITP: a cookie set by a Set-Cookie
 * response header is not subject to the 7-day (or 24-hour) script-set cookie
 * cap. It also means client JS cannot read or tamper with attribution.
 *
 * `sameSite: 'lax'` allows the cookie to be sent on the top-level navigation
 * that follows an affiliate click. `strict` would drop it and break everything.
 */
export const ATTRIBUTION_COOKIE = 'thr_attr';
export const ATTRIBUTION_COOKIE_OPTIONS = Object.freeze({
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  maxAge: ATTRIBUTION_WINDOW_DAYS * 24 * 60 * 60 * 1000,
  path: '/',
});

/**
 * Freeze attribution onto the player at registration. Invariant 2.
 *
 * After this runs, the cookie is irrelevant for this player forever. Re-reading
 * it later — for example on a second deposit — lets a subsequent affiliate's
 * cookie overwrite the original referrer, which is the most common and most
 * expensive attribution bug in the category.
 *
 * @param {object} db Transaction-capable client
 * @param {string} playerId
 * @param {{click_id: string, btag: string, subs: object}} attribution
 * @param {{ip_country: string, landing_url: string, clicked_at: Date}} meta
 */
export async function freezeAttribution(db, playerId, attribution, meta) {
  // ON CONFLICT DO NOTHING: registration can be retried by the client, and the
  // FIRST attribution written is the correct one. Do not upsert.
  await db.query(
    `INSERT INTO player_attribution
       (player_id, click_id, btag, subs, ip_country, landing_url, clicked_at, frozen_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, now())
     ON CONFLICT (player_id) DO NOTHING`,
    [
      playerId,
      attribution.click_id,
      attribution.btag,
      JSON.stringify(attribution.subs ?? {}),
      meta.ip_country,
      meta.landing_url,
      meta.clicked_at,
    ],
  );
}

// ---------------------------------------------------------------------------
// 4. FTD DETECTION
// ---------------------------------------------------------------------------

/**
 * Decide whether a settled deposit is a payable First Time Deposit, and record
 * it atomically. Invariant 1.
 *
 * The idempotency guarantee is the UNIQUE constraint on `ftd_events.player_id`.
 * It is not the queue, not a Redis lock, and not an `if (alreadyExists)` check —
 * those all lose to two concurrent PSP webhook retries hitting two app
 * instances. The database is the only thing that arbitrates correctly.
 *
 *   CREATE TABLE ftd_events (
 *     player_id       UUID PRIMARY KEY,          -- ← the entire guarantee
 *     deposit_id      TEXT NOT NULL UNIQUE,
 *     amount_minor    BIGINT NOT NULL,
 *     currency        TEXT NOT NULL,
 *     click_id        TEXT,
 *     btag            TEXT,
 *     qualified       BOOLEAN NOT NULL,
 *     disqualify_code TEXT,
 *     created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
 *   );
 *
 * @returns {Promise<{isFtd: boolean, qualified: boolean, reason?: string, attribution?: object}>}
 */
export async function recordFtdIfFirst(db, deposit) {
  const { playerId, depositId, amountMinor, currency } = deposit;

  return db.transaction(async (tx) => {
    const { rows: attrRows } = await tx.query(
      `SELECT click_id, btag, subs, ip_country, frozen_at
         FROM player_attribution
        WHERE player_id = $1`,
      [playerId],
    );
    const attribution = attrRows[0] ?? null;

    // ---- Qualification checks. Mirrors affiliate T&C §2.8. ----------------
    let qualified = true;
    let reason;

    if (!attribution) {
      qualified = false;
      reason = 'no_attribution'; // Organic. Still an FTD, just not payable.
    } else if (amountMinor < (MIN_QUALIFYING_DEPOSIT_MINOR[currency] ?? Infinity)) {
      qualified = false;
      reason = 'below_minimum';
    } else if (isOutsideAttributionWindow(attribution.frozen_at)) {
      qualified = false;
      reason = 'window_expired';
    } else if (await isGeoBlocked(tx, playerId)) {
      // An affiliate sending blocked-geo traffic is not payable for it. Say so
      // in the T&C and enforce it here, or you will pay for traffic you had to
      // refund anyway.
      qualified = false;
      reason = 'geo_blocked';
    } else if (await isDuplicateAccount(tx, playerId)) {
      qualified = false;
      reason = 'duplicate_account';
    }

    // ---- The atomic claim. ------------------------------------------------
    // Exactly one concurrent caller wins this INSERT. Everyone else gets zero
    // rows back and returns isFtd:false, which is the correct answer for them.
    const { rowCount } = await tx.query(
      `INSERT INTO ftd_events
         (player_id, deposit_id, amount_minor, currency, click_id, btag, qualified, disqualify_code)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       ON CONFLICT (player_id) DO NOTHING`,
      [
        playerId,
        depositId,
        amountMinor,
        currency,
        attribution?.click_id ?? null,
        attribution?.btag ?? null,
        qualified,
        reason ?? null,
      ],
    );

    if (rowCount === 0) {
      // Not the first deposit, or a concurrent worker already claimed it.
      return { isFtd: false, qualified: false };
    }

    return { isFtd: true, qualified, reason, attribution };
  });
}

function isOutsideAttributionWindow(frozenAt) {
  if (!frozenAt) return true;
  const ageDays = (Date.now() - new Date(frozenAt).getTime()) / 86_400_000;
  return ageDays > ATTRIBUTION_WINDOW_DAYS;
}

/** Placeholder — implement against your geo policy. */
async function isGeoBlocked(tx, playerId) {
  const { rows } = await tx.query(
    `SELECT 1 FROM players p
       JOIN blocked_countries b ON b.country = p.registration_country
      WHERE p.id = $1`,
    [playerId],
  );
  return rows.length > 0;
}

/** Placeholder — device fingerprint / payment instrument / KYC document match. */
async function isDuplicateAccount(tx, playerId) {
  const { rows } = await tx.query(
    `SELECT 1 FROM player_duplicate_flags WHERE player_id = $1 AND confirmed = true`,
    [playerId],
  );
  return rows.length > 0;
}

// ---------------------------------------------------------------------------
// 5. OUTBOUND POSTBACK DISPATCH
// ---------------------------------------------------------------------------

/**
 * Build a signed postback URL.
 *
 * Invariant 3 is enforced here structurally: this function accepts only the
 * fields below. There is no `extra` or `...rest` parameter through which an
 * email address could ever reach a query string.
 *
 * @param {string} template Partner postback template, e.g.
 *   `https://track.voluum.com/postback?cid={click_id}&payout={payout}`
 * @param {object} event
 * @param {string} secret Per-partner shared secret
 * @returns {string}
 */
export function buildPostbackUrl(template, event, secret) {
  const params = {
    cid: event.clickId,
    event: event.type, // registration | ftd | deposit | revshare
    payout: (event.payoutMinor / 100).toFixed(2),
    currency: event.currency,
    txid: event.transactionId, // the partner's deduplication key
    ts: Math.floor(Date.now() / 1000),
    ...Object.fromEntries(
      Object.entries(event.subs ?? {}).filter(([k]) => /^sub[1-5]$/.test(k)),
    ),
  };

  params.sig = signParams(params, secret);

  // Support both `{placeholder}` templates and plain base URLs.
  let url;
  if (template.includes('{')) {
    url = new URL(
      template.replace(/\{(\w+)\}/g, (_, key) =>
        encodeURIComponent(params[key] ?? params[key === 'click_id' ? 'cid' : key] ?? ''),
      ),
    );
    // Signature is appended rather than templated, so partners cannot omit it.
    url.searchParams.set('sig', params.sig);
    url.searchParams.set('ts', String(params.ts));
  } else {
    url = new URL(template);
    // URLSearchParams handles escaping. Never concatenate query strings by hand.
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  }

  assertHostAllowed(url);
  return url.toString();
}

/** Invariant 4. Called on every constructed URL, with no bypass. */
function assertHostAllowed(url) {
  if (url.protocol !== 'https:') {
    throw new Error(`Postback must be https, got ${url.protocol}`);
  }
  if (!ALLOWED_POSTBACK_HOSTS.has(url.hostname)) {
    throw new Error(`Postback host not allowlisted: ${url.hostname}`);
  }
}

/**
 * Send a postback. Returns a disposition telling the caller whether to retry.
 *
 * Retry policy (invariant 5):
 *   2xx        → done
 *   408 / 429  → retry (transient by definition)
 *   4xx other  → PERMANENT FAILURE, do not retry. A 400 usually means a
 *                malformed template or a revoked partner; retrying it creates
 *                duplicate conversions on their side and gets you throttled.
 *   5xx        → retry
 *   network    → retry
 *
 * @returns {Promise<{ok: boolean, retryable: boolean, status?: number}>}
 */
export async function sendPostback(url, { attempt = 0 } = {}) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      // AbortSignal.timeout is the modern replacement for a manual
      // AbortController + setTimeout, and it cannot leak the timer.
      signal: AbortSignal.timeout(POSTBACK_TIMEOUT_MS),
      headers: { 'User-Agent': 'ThroneTracking/1.0 (+https://throne.example/postback)' },
    });

    if (res.ok) return { ok: true, retryable: false, status: res.status };

    const retryable = res.status >= 500 || res.status === 408 || res.status === 429;
    if (!retryable) {
      console.error('[postback] permanent failure', {
        url: redactUrl(url), // Invariant: never log a raw signed URL.
        status: res.status,
        attempt,
      });
    }
    return { ok: false, retryable, status: res.status };
  } catch (err) {
    // Network error, DNS failure, or timeout. All transient.
    console.warn('[postback] network error', {
      url: redactUrl(url),
      error: err.name,
      attempt,
    });
    return { ok: false, retryable: true };
  }
}

/**
 * Queue-backed dispatch with bounded retry and a dead-letter terminus.
 *
 * `postback_jobs` carries its own UNIQUE constraint on
 * (partner_id, event_type, transaction_id) so that a duplicate upstream event
 * cannot enqueue a duplicate postback even if the FTD check were bypassed.
 * Defence in depth: two independent uniqueness guarantees, at different layers.
 */
export async function processPostbackJob(db, job) {
  const partner = await getPartner(db, job.partnerId);
  if (!partner?.active) {
    await markJob(db, job.id, 'cancelled', 'partner_inactive');
    return;
  }

  let url;
  try {
    url = buildPostbackUrl(partner.postbackTemplate, job.event, partner.secret);
  } catch (err) {
    // Allowlist rejection or malformed template — never retryable.
    await markJob(db, job.id, 'dead_letter', err.message);
    return;
  }

  const result = await sendPostback(url, { attempt: job.attempt });

  if (result.ok) {
    await markJob(db, job.id, 'delivered', null);
    return;
  }

  if (!result.retryable || job.attempt >= RETRY_SCHEDULE_MS.length - 1) {
    await markJob(db, job.id, 'dead_letter', `status=${result.status ?? 'network'}`);
    // Alert. A dead-lettered FTD is an unpaid affiliate, and an unpaid
    // affiliate is a public complaint within about a week.
    return;
  }

  await db.query(
    `UPDATE postback_jobs
        SET attempt = attempt + 1,
            next_attempt_at = now() + ($2 || ' milliseconds')::interval,
            status = 'pending'
      WHERE id = $1`,
    [job.id, RETRY_SCHEDULE_MS[job.attempt]],
  );
}

async function markJob(db, id, status, note) {
  await db.query(
    `UPDATE postback_jobs SET status = $2, note = $3, updated_at = now() WHERE id = $1`,
    [id, status, note],
  );
}

async function getPartner(db, partnerId) {
  const { rows } = await db.query(
    `SELECT id, active, postback_template AS "postbackTemplate", secret
       FROM affiliate_partners WHERE id = $1`,
    [partnerId],
  );
  return rows[0];
}

// ---------------------------------------------------------------------------
// 6. PARTNER TEMPLATES
// ---------------------------------------------------------------------------

/**
 * Voluum expects its own `cid` back and takes payout as a decimal. `et=` marks
 * a custom event type; omit it for a standard conversion.
 */
export const VOLUUM_TEMPLATE =
  'https://track.voluum.com/postback?cid={cid}&payout={payout}&txid={txid}&et={event}';

/**
 * Affilka (SoftSwiss) uses its own event vocabulary. If you are on a SoftSwiss
 * stack, Affilka reads deposits natively and you may not need this path at all —
 * confirm before building it.
 */
export const AFFILKA_TEMPLATE =
  'https://postback.affilka.com/v1/conversion?click_id={cid}&type={event}&amount={payout}&currency={currency}&external_id={txid}';

/** Generic S2S — Binom, Keitaro, RedTrack all accept this shape. */
export const GENERIC_TEMPLATE =
  'https://{host}/postback?cid={cid}&event={event}&payout={payout}&currency={currency}&txid={txid}';

// ---------------------------------------------------------------------------
// 7. INBOUND WEBHOOK — PSP DEPOSIT SETTLEMENT
// ---------------------------------------------------------------------------

/**
 * Verify an inbound PSP webhook.
 *
 * The raw body is required — `JSON.parse` then `JSON.stringify` does not
 * round-trip byte-for-byte (key order, unicode escapes, number formatting), so
 * verifying against a re-serialised body fails intermittently and
 * inexplicably. Mount `express.raw()` on this route specifically.
 *
 * @param {Buffer} rawBody
 * @param {string} signatureHeader
 * @param {string} timestampHeader
 * @param {string} secret
 */
export function verifyPspWebhook(rawBody, signatureHeader, timestampHeader, secret) {
  if (!isFresh(timestampHeader)) {
    return { valid: false, reason: 'stale_timestamp' };
  }

  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${timestampHeader}.`)
    .update(rawBody)
    .digest('hex');

  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(String(signatureHeader ?? ''), 'utf8');
  if (a.length !== b.length) return { valid: false, reason: 'signature_mismatch' };
  if (!crypto.timingSafeEqual(a, b)) return { valid: false, reason: 'signature_mismatch' };

  return { valid: true };
}

// ---------------------------------------------------------------------------
// 8. EXPRESS HANDLERS
// ---------------------------------------------------------------------------

/**
 * POST /webhooks/psp/deposit-settled
 *
 * Mount with: app.post(path, express.raw({ type: 'application/json' }), handler)
 */
export function depositSettledHandler({ db, enqueue, pspSecret }) {
  return async (req, res) => {
    const check = verifyPspWebhook(
      req.body,
      req.get('X-Signature'),
      req.get('X-Timestamp'),
      pspSecret,
    );

    if (!check.valid) {
      // 401, not 400. Do not tell an unauthenticated caller which of the two
      // checks failed — that is a probing oracle.
      console.warn('[psp-webhook] rejected', { reason: check.reason });
      return res.status(401).json({ error: 'unauthorized' });
    }

    let payload;
    try {
      payload = JSON.parse(req.body.toString('utf8'));
    } catch {
      return res.status(400).json({ error: 'invalid_json' });
    }

    // ACK FIRST, PROCESS AFTER. PSPs retry aggressively on timeout, and a slow
    // synchronous handler turns one deposit into five webhook deliveries.
    res.status(200).json({ received: true });

    try {
      const result = await recordFtdIfFirst(db, {
        playerId: payload.player_id,
        depositId: payload.transaction_id,
        amountMinor: payload.amount_minor,
        currency: payload.currency,
      });

      if (!result.isFtd || !result.qualified) return;

      // Enqueue rather than send inline: the postback must survive a process
      // restart, and it must retry on the partner's downtime, not ours.
      await enqueue('postback', {
        partnerId: result.attribution.btag,
        event: {
          type: 'ftd',
          clickId: result.attribution.click_id,
          payoutMinor: await resolveCpaMinor(db, result.attribution.btag, payload.country),
          currency: 'USD', // Payouts are denominated in the partner's currency.
          transactionId: payload.transaction_id,
          subs: result.attribution.subs,
        },
      });
    } catch (err) {
      // Already ACKed, so this cannot be surfaced to the PSP. It must page.
      console.error('[psp-webhook] post-ack failure', {
        transaction_id: payload?.transaction_id,
        error: err.message,
      });
    }
  };
}

/** CPA rate lookup — per partner, per geo. See 01_affiliate_program.md §2.6. */
async function resolveCpaMinor(db, partnerId, country) {
  const { rows } = await db.query(
    `SELECT cpa_minor FROM affiliate_cpa_rates
      WHERE partner_id = $1 AND country = $2
      UNION ALL
     SELECT cpa_minor FROM affiliate_cpa_rates
      WHERE partner_id = $1 AND country = '*'
      LIMIT 1`,
    [partnerId, country],
  );
  return rows[0]?.cpa_minor ?? 0;
}

/**
 * GET /affiliate/test-postback
 *
 * Affiliates ask for this on day one. Shipping it saves roughly a week of
 * back-and-forth per partner integration.
 */
export function testPostbackHandler({ db }) {
  return async (req, res) => {
    const partner = await getPartner(db, req.affiliate.id); // set by auth middleware
    if (!partner) return res.status(404).json({ error: 'partner_not_found' });

    const clickId = String(req.query.click_id ?? 'TEST-CLICK-ID').slice(0, 255);

    let url;
    try {
      url = buildPostbackUrl(
        partner.postbackTemplate,
        {
          type: 'test',
          clickId,
          payoutMinor: 0,
          currency: 'USD',
          transactionId: `test_${crypto.randomUUID()}`,
          subs: {},
        },
        partner.secret,
      );
    } catch (err) {
      return res.status(400).json({ error: 'invalid_template', detail: err.message });
    }

    const result = await sendPostback(url);
    return res.json({
      sent_to: redactUrl(url), // Never echo the signature back, even to the partner.
      delivered: result.ok,
      status: result.status ?? null,
    });
  };
}

// ---------------------------------------------------------------------------
// 9. SCHEMA REFERENCE
// ---------------------------------------------------------------------------

/**
 * CREATE TABLE player_attribution (
 *   player_id     UUID PRIMARY KEY REFERENCES players(id),
 *   click_id      TEXT,
 *   btag          TEXT,
 *   subs          JSONB NOT NULL DEFAULT '{}',
 *   ip_country    TEXT,
 *   landing_url   TEXT,
 *   clicked_at    TIMESTAMPTZ,
 *   frozen_at     TIMESTAMPTZ NOT NULL DEFAULT now()
 * );
 * CREATE INDEX ON player_attribution (btag);
 *
 * CREATE TABLE ftd_events (
 *   player_id       UUID PRIMARY KEY REFERENCES players(id),
 *   deposit_id      TEXT NOT NULL UNIQUE,
 *   amount_minor    BIGINT NOT NULL CHECK (amount_minor > 0),
 *   currency        TEXT NOT NULL,
 *   click_id        TEXT,
 *   btag            TEXT,
 *   qualified       BOOLEAN NOT NULL,
 *   disqualify_code TEXT,
 *   created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
 * );
 *
 * CREATE TABLE postback_jobs (
 *   id              BIGSERIAL PRIMARY KEY,
 *   partner_id      TEXT NOT NULL,
 *   event_type      TEXT NOT NULL,
 *   transaction_id  TEXT NOT NULL,
 *   payload         JSONB NOT NULL,
 *   attempt         INT NOT NULL DEFAULT 0,
 *   status          TEXT NOT NULL DEFAULT 'pending',
 *   next_attempt_at TIMESTAMPTZ NOT NULL DEFAULT now(),
 *   note            TEXT,
 *   created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
 *   updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
 *   UNIQUE (partner_id, event_type, transaction_id)   -- defence in depth
 * );
 * CREATE INDEX ON postback_jobs (status, next_attempt_at)
 *   WHERE status = 'pending';
 */
