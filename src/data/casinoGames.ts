/** Casino lobby catalogue — thumbnails live in /public/assets/images/games. */

export interface LobbyGame {
  name: string
  provider: string
  image: string
  hot?: boolean
  isNew?: boolean
}

const img = (slug: string) => `/assets/images/games/${slug}.webp`

export const lobbyGames: LobbyGame[] = [
  { name: 'Gates of Olympus', provider: 'Pragmatic Play', image: img('gates-of-olympus'), hot: true },
  { name: 'Sugar Rush', provider: 'Pragmatic Play', image: img('sugar-rush') },
  { name: 'Starlight Princess', provider: 'Pragmatic Play', image: img('starlight-princess') },
  { name: 'Zeus vs Hades', provider: 'Pragmatic Play', image: img('zeus-vs-hades'), hot: true },
  { name: 'Bounty Gold', provider: 'Pragmatic Play', image: img('bounty-gold') },
  { name: 'Release the Kraken', provider: 'Pragmatic Play', image: img('release-the-kraken'), isNew: true },
  { name: 'Candy Blitz', provider: 'Pragmatic Play', image: img('candy-blitz') },
  { name: 'Fruit Rainbow', provider: 'Pragmatic Play', image: img('fruit-rainbow') },
  { name: 'Pyramid Treasure', provider: 'Platin Gaming', image: img('pyramid-treasure') },
  { name: 'Octobeer Fortunes', provider: 'Platin Gaming', image: img('octobeer'), isNew: true },
  { name: 'Fishin Reels', provider: 'Pragmatic Play', image: img('fishin-reels') },
  { name: 'The Wild Gang', provider: 'Pragmatic Play', image: img('the-wild-gang') },
  { name: 'Great Stick-Up', provider: 'Pragmatic Play', image: img('great-stick-up') },
  { name: 'Empty the Bank', provider: 'Pragmatic Play', image: img('empty-the-bank') },
  { name: 'The Ultimate 5', provider: 'Pragmatic Play', image: img('the-ultimate-5'), hot: true },
  { name: 'Smugglers Cove', provider: 'Pragmatic Play', image: img('smugglers-cove') },
]

export const lobbyProviders = [...new Set(lobbyGames.map((g) => g.provider))]
