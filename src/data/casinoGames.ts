/** Casino lobby catalogue — thumbnails live in /public/assets/images/games. */

export interface LobbyGame {
  name: string
  provider: string
  image: string
  hot?: boolean
  isNew?: boolean
  rtp?: string
  /** Provider game-launch URL — when set, the play page embeds it */
  src?: string
}

const img = (slug: string) => `/assets/images/games/${slug}.webp`

/** URL slug for the play route, derived from the thumbnail filename. */
export const gameSlug = (g: LobbyGame) =>
  g.image.split('/').pop()!.replace('.webp', '')

export const findGame = (slug: string) =>
  lobbyGames.find((g) => gameSlug(g) === slug)

export const lobbyGames: LobbyGame[] = [
  { name: 'Gates of Olympus', provider: 'Pragmatic Play', image: img('gates-of-olympus'), rtp: '96.5', hot: true },
  { name: 'Sugar Rush', provider: 'Pragmatic Play', image: img('sugar-rush'), rtp: '96.5' },
  { name: 'Starlight Princess', provider: 'Pragmatic Play', image: img('starlight-princess'), rtp: '96.5' },
  { name: 'Zeus vs Hades', provider: 'Pragmatic Play', image: img('zeus-vs-hades'), rtp: '96.1', hot: true },
  { name: 'Bounty Gold', provider: 'Pragmatic Play', image: img('bounty-gold'), rtp: '96.4' },
  { name: 'Release the Kraken', provider: 'Pragmatic Play', image: img('release-the-kraken'), rtp: '96.7', isNew: true },
  { name: 'Candy Blitz', provider: 'Pragmatic Play', image: img('candy-blitz'), rtp: '96.2' },
  { name: 'Fruit Rainbow', provider: 'Pragmatic Play', image: img('fruit-rainbow'), rtp: '96.5' },
  { name: 'Pyramid Treasure', provider: 'Platin Gaming', image: img('pyramid-treasure'), rtp: '95.9' },
  { name: 'Octobeer Fortunes', provider: 'Platin Gaming', image: img('octobeer'), rtp: '96.0', isNew: true },
  { name: 'Fishin Reels', provider: 'Pragmatic Play', image: img('fishin-reels'), rtp: '96.3' },
  { name: 'The Wild Gang', provider: 'Pragmatic Play', image: img('the-wild-gang'), rtp: '96.5' },
  { name: 'Great Stick-Up', provider: 'Pragmatic Play', image: img('great-stick-up'), rtp: '96.3' },
  { name: 'Empty the Bank', provider: 'Pragmatic Play', image: img('empty-the-bank'), rtp: '96.5' },
  { name: 'The Ultimate 5', provider: 'Pragmatic Play', image: img('the-ultimate-5'), rtp: '96.6', hot: true },
  { name: 'Smugglers Cove', provider: 'Pragmatic Play', image: img('smugglers-cove'), rtp: '96.4' },
]

export const lobbyProviders = [...new Set(lobbyGames.map((g) => g.provider))]
