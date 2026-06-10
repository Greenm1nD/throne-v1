/**
 * Central registry of all image assets used across the THRONE dashboard.
 * Replace the `src` paths here when real generated artwork is available —
 * every component reads from this map, so nothing else needs to change.
 *
 * Recommended source render sizes are noted per asset.
 */

export interface ImageAsset {
  /** Public path (served from /public or /src/assets) */
  src: string
  /** Descriptive alt text for accessibility */
  alt: string
  /** Recommended source render size, for reference */
  recommended: string
}

export const assets = {
  logoMark: {
    src: '/assets/images/throne-logo-mark.png',
    alt: 'THRONE crown and T monogram',
    recommended: 'transparent PNG, portrait ~315x373',
  },
  logoWordmark: {
    src: '/assets/images/throne-logo-wordmark.png',
    alt: 'THRONE — VIP Gaming Club wordmark',
    recommended: 'transparent PNG, wide ~650x228',
  },
  logoFull: {
    src: '/assets/images/throne-logo-full.png',
    alt: 'THRONE full logo lockup',
    recommended: 'transparent PNG, ~650x602',
  },
  heroThroneRoom: {
    src: '/assets/images/hero-throne-room.webp',
    alt: 'The royal throne room of THRONE, lit by golden light',
    recommended: '1920x720 — used as the hero video poster / fallback',
  },
  authBadge: {
    src: '/assets/images/auth-badge.png',
    alt: 'THRONE crown emblem',
    recommended: 'transparent PNG, square ~600x600, ornate gold ring + crown/T',
  },
  authThrone: {
    src: '/assets/images/auth-throne.webp',
    alt: 'THRONE throne room — auth panel',
    recommended: 'portrait ~900x1100, throne + glowing ring + lions',
  },
  heroVideo: {
    src: '/assets/images/hero-animation.mp4',
    alt: 'Animated THRONE throne room',
    recommended: 'MP4 (H.264), 1920x1080, muted + looping, ~6–12s, object-fit: cover',
  },
  gameRoulette: {
    src: '/assets/images/game-roulette.webp',
    alt: 'Imperial Roulette wheel in gold and obsidian',
    recommended: '800x600 (4:3)',
  },
  gameRouletteHover: {
    src: '/assets/images/game-roulette-hover.mp4',
    alt: 'Imperial Roulette wheel spinning',
    recommended: 'MP4 (H.264), 4:3, muted + looping, plays on card hover',
  },
  gameBlackjack: {
    src: '/assets/images/game-blackjack.webp',
    alt: 'Sovereign Blackjack table with gold-trimmed cards',
    recommended: '800x600 (4:3)',
  },
  gameBlackjackHover: {
    src: '/assets/images/game-blackjack-hover.mp4',
    alt: 'Sovereign Blackjack animation',
    recommended: 'MP4 muted loop, plays on card hover',
  },
  gameBaccarat: {
    src: '/assets/images/game-baccarat.webp',
    alt: 'Crown Baccarat aces on a dark felt table',
    recommended: '800x600 (4:3)',
  },
  gameBaccaratHover: {
    src: '/assets/images/game-baccarat-hover.mp4',
    alt: 'Crown Baccarat animation',
    recommended: 'MP4 muted loop, plays on card hover',
  },
  gameSlots: {
    src: '/assets/images/game-slots.webp',
    alt: 'Monarch Slots golden 777 reels',
    recommended: '800x600 (4:3)',
  },
  gameSlotsHover: {
    src: '/assets/images/game-slots-hover.mp4',
    alt: 'Monarch Slots animation',
    recommended: 'MP4 muted loop, plays on card hover',
  },
  liveCasino: {
    src: '/assets/images/live-casino.webp',
    alt: 'The Royal Tables — live dealer casino floor',
    recommended: '1000x562 (16:9)',
  },
  sportsbookArena: {
    src: '/assets/images/sportsbook-arena.webp',
    alt: 'The Arena — floodlit sportsbook stadium',
    recommended: '1000x562 (16:9)',
  },
  vipClub: {
    src: '/assets/images/vip-club.webp',
    alt: 'The Inner Circle — opulent VIP lounge',
    recommended: '1000x562 (16:9)',
  },
  treasuryBanner: {
    src: '/assets/images/treasury-banner.webp',
    alt: 'The Treasury — luxury car, watch, jet and skyline',
    recommended: '2100x600 (21:6)',
  },
} satisfies Record<string, ImageAsset>

export type AssetKey = keyof typeof assets
