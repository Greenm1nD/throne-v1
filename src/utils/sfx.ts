/**
 * Tiny Web-Audio sound effects — synthesized in code, no audio assets needed.
 * Safe to call from user-gesture handlers (autoplay policy compliant);
 * every call is wrapped so an unsupported browser just stays silent.
 */
let ctx: AudioContext | null = null
const audio = () => (ctx ??= new AudioContext())

/** Royal chime: three soft bell partials + a short golden "whoosh". */
export function playRoyalChime() {
  try {
    const a = audio()
    if (a.state === 'suspended') void a.resume()
    const t = a.currentTime

    const master = a.createGain()
    master.gain.value = 0.13
    master.connect(a.destination)

    // Bell partials (E5 / B5 / E6) with exponential decay
    const partials: Array<[number, number]> = [
      [659.25, 0],
      [987.77, 0.03],
      [1318.5, 0.06],
    ]
    partials.forEach(([freq, delay], i) => {
      const osc = a.createOscillator()
      osc.type = 'sine'
      osc.frequency.value = freq
      const gain = a.createGain()
      gain.gain.setValueAtTime(0, t + delay)
      gain.gain.linearRampToValueAtTime(0.55 / (i + 1), t + delay + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 1.15)
      osc.connect(gain).connect(master)
      osc.start(t + delay)
      osc.stop(t + delay + 1.25)
    })

    // Rising band-passed noise — a soft velvet whoosh under the bells
    const len = Math.floor(a.sampleRate * 0.45)
    const buf = a.createBuffer(1, len, a.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len)
    const noise = a.createBufferSource()
    noise.buffer = buf
    const filter = a.createBiquadFilter()
    filter.type = 'bandpass'
    filter.Q.value = 1.2
    filter.frequency.setValueAtTime(380, t)
    filter.frequency.exponentialRampToValueAtTime(1900, t + 0.38)
    const ngain = a.createGain()
    ngain.gain.setValueAtTime(0.3, t)
    ngain.gain.exponentialRampToValueAtTime(0.001, t + 0.45)
    noise.connect(filter).connect(ngain).connect(master)
    noise.start(t)
  } catch {
    /* no audio support — stay silent */
  }
}
