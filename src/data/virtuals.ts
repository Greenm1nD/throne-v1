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

export const virtualsMostPlayed = [
  { name: 'Horse Racing', players: '4,820', bets: '12.4k', pct: 92, image: horse },
  { name: 'Virtual Football', players: '4,210', bets: '10.8k', pct: 84, image: football },
  { name: 'Greyhounds', players: '3,540', bets: '8.9k', pct: 74, image: greyhound },
  { name: 'Motorbikes', players: '2,910', bets: '6.2k', pct: 61, image: motorsport },
  { name: 'Tennis', players: '2,380', bets: '5.1k', pct: 50, image: tennis },
]

export interface VirtualChampionship {
  name: string
  prize: string
  startsIn: string
  participants: string
  icon: string
}
export const virtualsChampionships: VirtualChampionship[] = [
  { name: 'World Cup Finals', prize: '€500,000', startsIn: '02:14:30', participants: '18,402', icon: 'trophy' },
  { name: 'Champions League', prize: '€250,000', startsIn: '04:40:12', participants: '12,118', icon: 'crown' },
  { name: 'Grand Prix Series', prize: '€180,000', startsIn: '06:05:48', participants: '9,640', icon: 'bolt' },
  { name: 'Royal Derby', prize: '€120,000', startsIn: '08:20:05', participants: '7,205', icon: 'crown' },
  { name: 'Throne Cup', prize: '€1,000,000', startsIn: '23:59:59', participants: '24,591', icon: 'crown' },
]

export const virtualsFeatures = [
  { icon: 'clock', title: '24/7 Action', sub: 'New events every 2–3 minutes' },
  { icon: 'bolt', title: 'Every 2 Minutes', sub: 'No waiting for fixtures' },
  { icon: 'monitor', title: 'HD Graphics', sub: 'Realistic 3D virtual experience' },
  { icon: 'sparkle', title: 'Instant Results', sub: 'Settled in seconds' },
  { icon: 'shield', title: 'Provably Fair', sub: 'RNG-certified technology' },
  { icon: 'star', title: 'Mobile Ready', sub: 'Play anywhere, anytime' },
]
