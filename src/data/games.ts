import { assets, type AssetKey } from './assets'

export interface Game {
  /** Royal word shown large at the top of the card */
  name: string
  /** Game category shown beneath the name */
  category: string
  image: AssetKey
  /** Optional looping video that plays when the card is hovered */
  hoverVideo?: AssetKey
}

export const royalCollection: Game[] = [
  { name: 'Imperial', category: 'Roulette', image: 'gameRoulette', hoverVideo: 'gameRouletteHover' },
  { name: 'Sovereign', category: 'Blackjack', image: 'gameBlackjack', hoverVideo: 'gameBlackjackHover' },
  { name: 'Crown', category: 'Baccarat', image: 'gameBaccarat', hoverVideo: 'gameBaccaratHover' },
  { name: 'Monarch', category: 'Slots', image: 'gameSlots', hoverVideo: 'gameSlotsHover' },
]

/** Helper so components can resolve the asset record from a game. */
export const gameImage = (game: Game) => assets[game.image]
