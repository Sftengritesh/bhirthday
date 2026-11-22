// Shared audio utility — plays sounds with graceful fallback
let bgMusic = null

export const sounds = {
  click: () => playTone(800, 0.1, 'sine'),
  success: () => playTone(1000, 0.2, 'sine', [0, 0.1, 0.1, 0.5]),
  wish: () => playChord([523, 659, 784], 0.15, 1.5),
  celebration: () => playCelebration(),
}

function playTone(freq, vol = 0.1, type = 'sine', envelope = [0, 0.01, 0.01, 0.3]) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = type
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + (envelope[1] || 0.01))
    gain.gain.linearRampToValueAtTime(vol * 0.8, ctx.currentTime + (envelope[2] || 0.1))
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + (envelope[3] || 0.3))
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + (envelope[3] || 0.3) + 0.05)
  } catch (e) { /* silent fail */ }
}

function playChord(freqs, vol, duration) {
  freqs.forEach((f, i) => {
    setTimeout(() => playTone(f, vol, 'sine', [0, 0.05, 0.1, duration]), i * 100)
  })
}

function playCelebration() {
  const notes = [523, 659, 784, 1047]
  notes.forEach((note, i) => {
    setTimeout(() => playTone(note, 0.15, 'sine', [0, 0.05, 0.05, 0.4]), i * 150)
  })
}

export const startBgMusic = () => {
  // We use a tone-based ambient music since we can't load external audio files
  // In production, replace with actual MP3
  if (bgMusic) return
  // placeholder: real music would be loaded from /audio/background-music.mp3
}

export const stopBgMusic = () => {
  if (bgMusic) {
    bgMusic.pause()
    bgMusic = null
  }
}
