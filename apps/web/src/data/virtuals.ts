/**
 * THRONE Virtuals — page content (single source). Cinematic black-gold imagery
 * generated for each sport (public/assets/images/virtual/*). Fast betting,
 * instant results, premium experience.
 */
const IMG = '/assets/images/virtual'
const horse = `${IMG}/horse.webp`
const greyhound = `${IMG}/greyhound.webp`
const football = `${IMG}/football.webp`
const motorsport = `${IMG}/motorsport.webp`
const tennis = `${IMG}/tennis.webp`
const basketball = `${IMG}/basketball.webp`

export const virtualsHero = {
  label: 'Virtual Sports',
  titleA: 'Virtual Sports.',
  titleB: 'Real Adrenaline.',
  sub: 'Instant races. Instant football. Instant results.',
  body: 'Bet every few minutes — non-stop action, settled in seconds.',
  image: motorsport,
  highlights: [
    { icon: 'clock', title: '24/7 Action', sub: 'Always running' },
    { icon: 'bolt', title: 'Fast Rounds', sub: 'Every 2–3 minutes' },
    { icon: 'monitor', title: 'Realistic', sub: 'HD virtuals' },
    { icon: 'shield', title: 'Fair & Secure', sub: 'Provably fair' },
  ],
}

export const virtualsLiveEvents = [
  { name: 'Virtual Horse Racing', kind: 'Next race', time: '00:01:24', image: horse },
  { name: 'Virtual Greyhounds', kind: 'Next race', time: '00:02:10', image: greyhound },
  { name: 'Virtual Football League', kind: 'Next match', time: '00:03:00', image: football },
  { name: 'Virtual Motorbikes', kind: 'Next race', time: '00:01:55', image: motorsport },
  { name: 'Virtual Tennis Challenge', kind: 'Next match', time: '00:02:40', image: tennis },
]

export const virtualsCategories = [
  'All Games', 'Horse Racing', 'Greyhounds', 'Football', 'Motorbikes', 'Tennis', 'Basketball', 'World Cup', 'Specials',
]

export const virtualsStartingSoon = [
  { name: 'Horse Racing', kind: 'Next race', time: '00:01:24', image: horse },
  { name: 'Greyhounds', kind: 'Next race', time: '00:02:10', image: greyhound },
  { name: 'Virtual Football', kind: 'Next match', time: '00:03:00', image: football },
  { name: 'Motorbikes', kind: 'Next race', time: '00:01:55', image: motorsport },
  { name: 'Tennis', kind: 'Next match', time: '00:02:40', image: tennis },
  { name: 'Basketball', kind: 'Next match', time: '00:04:15', image: basketball },
]

export interface VirtualGame {
  title: string
  sub: string
  image: string
  cat: string
}
export const virtualsLobby: VirtualGame[] = [
  { title: 'Horse Racing', sub: 'Every 3 min', image: horse, cat: 'Horse Racing' },
  { title: 'Greyhounds', sub: 'Every 2 min', image: greyhound, cat: 'Greyhounds' },
  { title: 'Virtual Football', sub: 'Every 3 min', image: football, cat: 'Football' },
  { title: 'Virtual Tennis', sub: 'Every 2 min', image: tennis, cat: 'Tennis' },
  { title: 'Motorbikes', sub: 'Every 3 min', image: motorsport, cat: 'Motorsport' },
  { title: 'World Cup', sub: 'Seasonal', image: football, cat: 'Football' },
  { title: 'Basketball Cup', sub: 'Every 4 min', image: basketball, cat: 'Basketball' },
  { title: 'Formula Racing', sub: 'Every 3 min', image: motorsport, cat: 'Motorsport' },
  { title: 'Champions League', sub: 'Nightly', image: football, cat: 'Football' },
  { title: 'Euro Cup', sub: 'Seasonal', image: football, cat: 'Football' },
  { title: 'Speedway', sub: 'Every 3 min', image: motorsport, cat: 'Motorsport' },
  { title: 'Tennis Cup', sub: 'Every 2 min', image: tennis, cat: 'Tennis' },
]

export const virtualsFeatures = [
  { icon: 'clock', title: '24/7 Action', sub: 'New events every 2–3 minutes' },
  { icon: 'bolt', title: 'Every 2 Minutes', sub: 'No waiting for fixtures' },
  { icon: 'monitor', title: 'HD Graphics', sub: 'Realistic 3D virtual experience' },
  { icon: 'sparkle', title: 'Instant Results', sub: 'Settled in seconds' },
  { icon: 'shield', title: 'Provably Fair', sub: 'RNG-certified technology' },
  { icon: 'star', title: 'Mobile Ready', sub: 'Play anywhere, anytime' },
]
