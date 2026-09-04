/**
 * Tiny Web-Audio sound effects — synthesized in code, no audio assets needed.
 * Safe to call from user-gesture handlers (autoplay policy compliant);
 * every call is wrapped so an unsupported browser just stays silent.
 */
let ctx: AudioContext | null = null
const audio = () => (ctx ??= new AudioContext())

/**
 * Royal gate opening — the kingdom's doors part for the guest:
 * 1) a brass latch click, 2) a deep stone-and-timber rumble that swells as the
 * doors swing, 3) air rushing through the opening, 4) a stately golden chord
 * once the hall is revealed. ~1.7s, mixed quiet.
 */
export function playRoyalGate() {
  try {
    const a = audio()
    if (a.state === 'suspended') void a.resume()
    const t = a.currentTime

    const master = a.createGain()
    master.gain.value = 0.17
    master.connect(a.destination)

    const noiseBuf = (dur: number) => {
      const len = Math.floor(a.sampleRate * dur)
      const buf = a.createBuffer(1, len, a.sampleRate)
      const d = buf.getChannelData(0)
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1
      return buf
    }

    // 1 · Latch: tight metallic click
    {
      const src = a.createBufferSource()
      src.buffer = noiseBuf(0.06)
      const bp = a.createBiquadFilter()
      bp.type = 'bandpass'
      bp.frequency.value = 2400
      bp.Q.value = 6
      const g = a.createGain()
      g.gain.setValueAtTime(0.5, t)
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.07)
      src.connect(bp).connect(g).connect(master)
      src.start(t)
    }

    // 2 · Massive doors: low rumble (filtered noise) + sub swell rising 48→66Hz
    {
      const src = a.createBufferSource()
      src.buffer = noiseBuf(1.4)
      const lp = a.createBiquadFilter()
      lp.type = 'lowpass'
      lp.frequency.setValueAtTime(140, t + 0.08)
      lp.frequency.linearRampToValueAtTime(260, t + 0.9)
      const g = a.createGain()
      g.gain.setValueAtTime(0, t + 0.08)
      g.gain.linearRampToValueAtTime(0.5, t + 0.45)
      g.gain.exponentialRampToValueAtTime(0.001, t + 1.4)
      src.connect(lp).connect(g).connect(master)
      src.start(t + 0.08)

      const sub = a.createOscillator()
      sub.type = 'sine'
      sub.frequency.setValueAtTime(48, t + 0.08)
      sub.frequency.linearRampToValueAtTime(66, t + 1.0)
      const sg = a.createGain()
      sg.gain.setValueAtTime(0, t + 0.08)
      sg.gain.linearRampToValueAtTime(0.4, t + 0.5)
      sg.gain.exponentialRampToValueAtTime(0.001, t + 1.3)
      sub.connect(sg).connect(master)
      sub.start(t + 0.08)
      sub.stop(t + 1.4)
    }

    // 3 · Air rushing through the opening
    {
      const src = a.createBufferSource()
      src.buffer = noiseBuf(0.9)
      const bp = a.createBiquadFilter()
      bp.type = 'bandpass'
      bp.Q.value = 0.9
      bp.frequency.setValueAtTime(320, t + 0.35)
      bp.frequency.exponentialRampToValueAtTime(1400, t + 1.0)
      const g = a.createGain()
      g.gain.setValueAtTime(0, t + 0.35)
      g.gain.linearRampToValueAtTime(0.22, t + 0.6)
      g.gain.exponentialRampToValueAtTime(0.001, t + 1.15)
      src.connect(bp).connect(g).connect(master)
      src.start(t + 0.35)
    }

    // 4 · The hall revealed: low stately chord (E3 · B3 · E4 · G#4)
    ;[164.81, 246.94, 329.63, 415.3].forEach((freq, i) => {
      const osc = a.createOscillator()
      osc.type = 'sine'
      osc.frequency.value = freq
      const g = a.createGain()
      const start = t + 0.8 + i * 0.05
      g.gain.setValueAtTime(0, start)
      g.gain.linearRampToValueAtTime(0.3 / (i * 0.6 + 1), start + 0.06)
      g.gain.exponentialRampToValueAtTime(0.001, start + 1.5)
      osc.connect(g).connect(master)
      osc.start(start)
      osc.stop(start + 1.6)
    })
  } catch {
    /* no audio support — stay silent */
  }
}

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
