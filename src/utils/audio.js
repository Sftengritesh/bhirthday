// Princess Fairytale Web Audio Synthesizer & Sound Effects
let audioCtx = null
let musicInterval = null
let isMusicPlaying = false
let bgAudioElement = null

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (AudioContext) {
      audioCtx = new AudioContext()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

// Gentle music-box chime generator
function playMusicBoxNote(freq, duration = 1.2, time = 0) {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, ctx.currentTime + time)

    // Soft music box envelope (instant pluck, bell-like decay)
    gain.gain.setValueAtTime(0, ctx.currentTime + time)
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + time + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + time + duration)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(ctx.currentTime + time)
    osc.stop(ctx.currentTime + time + duration + 0.05)
  } catch (e) {
    // Graceful fallback
  }
}

// A gentle, dreamy fairytale music-box melody in C major / A minor
const MELODY = [
  // Phrase 1 (Dreamy romantic harp)
  { note: 523.25, d: 0.5 }, // C5
  { note: 659.25, d: 0.5 }, // E5
  { note: 783.99, d: 0.5 }, // G5
  { note: 1046.50, d: 1.0 }, // C6
  { note: 880.00, d: 0.5 }, // A5
  { note: 783.99, d: 0.5 }, // G5
  { note: 659.25, d: 1.0 }, // E5

  // Phrase 2 (Sweet princess theme)
  { note: 587.33, d: 0.5 }, // D5
  { note: 698.46, d: 0.5 }, // F5
  { note: 880.00, d: 0.5 }, // A5
  { note: 987.77, d: 1.0 }, // B5
  { note: 783.99, d: 0.5 }, // G5
  { note: 659.25, d: 0.5 }, // E5
  { note: 523.25, d: 1.2 }, // C5

  // Phrase 3 (Warm & affectionate)
  { note: 440.00, d: 0.5 }, // A4
  { note: 523.25, d: 0.5 }, // C5
  { note: 659.25, d: 0.5 }, // E5
  { note: 880.00, d: 0.8 }, // A5
  { note: 783.99, d: 0.5 }, // G5
  { note: 659.25, d: 0.5 }, // E5
  { note: 587.33, d: 1.0 }, // D5

  // Phrase 4 (Soft resolution)
  { note: 523.25, d: 0.5 }, // C5
  { note: 659.25, d: 0.5 }, // E5
  { note: 783.99, d: 0.8 }, // G5
  { note: 1046.50, d: 1.8 }, // C6
]

export const toggleBackgroundMusic = (shouldPlay) => {
  if (shouldPlay) {
    startFairytaleMusic()
  } else {
    stopFairytaleMusic()
  }
}

export const startFairytaleMusic = () => {
  if (isMusicPlaying) return
  isMusicPlaying = true

  // 1. Play our custom-edited 320kbps master cut of 'She Is' by The Fray
  if (!bgAudioElement) {
    const audio = new Audio('/audio/background-music.mp3')
    audio.loop = true
    audio.volume = 0.55
    bgAudioElement = audio
    audio.play().then(() => {
      // playing smoothly
    }).catch((err) => {
      console.log('Audio autoplay prevented or waiting for interaction:', err)
      // 2. Play built-in Web Audio API Music Box synthesizer if audio file blocked
      startSyntheticMusicBox()
    })
  } else {
    bgAudioElement.play().catch(() => startSyntheticMusicBox())
  }
}

function startSyntheticMusicBox() {
  getAudioContext()
  let noteIndex = 0

  const playNextNote = () => {
    if (!isMusicPlaying) return

    const current = MELODY[noteIndex]
    playMusicBoxNote(current.note, current.d * 1.5)

    noteIndex = (noteIndex + 1) % MELODY.length
    const nextDelay = current.d * 680

    musicInterval = setTimeout(playNextNote, nextDelay)
  }

  playNextNote()
}

export const stopFairytaleMusic = () => {
  isMusicPlaying = false
  if (musicInterval) {
    clearTimeout(musicInterval)
    musicInterval = null
  }
  if (bgAudioElement) {
    bgAudioElement.pause()
  }
}

export const sounds = {
  click: () => {
    playMusicBoxNote(880, 0.4)
  },
  success: () => {
    playMusicBoxNote(523.25, 0.5, 0)
    playMusicBoxNote(659.25, 0.5, 0.1)
    playMusicBoxNote(783.99, 0.5, 0.2)
    playMusicBoxNote(1046.50, 0.8, 0.3)
  },
  wish: () => {
    // Harp sparkle arpeggio
    [523, 659, 784, 988, 1047, 1318].forEach((freq, idx) => {
      playMusicBoxNote(freq, 1.0, idx * 0.09)
    })
  },
  celebration: () => {
    // Royal Birthday Fanfare Chimes
    const notes = [523.25, 523.25, 587.33, 523.25, 698.46, 659.25]
    notes.forEach((freq, idx) => {
      playMusicBoxNote(freq, 0.8, idx * 0.2)
    })
    setTimeout(() => {
      [784, 880, 1047, 1318].forEach((f, i) => {
        playMusicBoxNote(f, 1.2, i * 0.12)
      })
    }, 1400)
  },
}
