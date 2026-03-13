/**
 * Entropy Press — Playable Worlds Launch Video
 * Remotion component — renders at 1920x1080, 30fps, ~61 seconds
 *
 * Install: npx create-video@latest (then copy this file)
 * Render:  npx remotion render EntropyPressLaunch out/launch.mp4
 *          --props='{}' --audio=voiceover-slow.wav
 */

import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  spring,
} from 'remotion'

const BG = '#0b0e0b'
const GOLD = '#c8a951'
const GOLD_DIM = '#8a7035'
const CREAM = '#e8e0cc'
const GREEN_DIM = '#4a6a35'
const MUTED = '#7a7a6a'

const FPS = 30

function useOpacity(startFrame, duration = 20) {
  const frame = useCurrentFrame()
  return interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.ease,
  })
}

function useFadeOut(startFrame, duration = 15) {
  const frame = useCurrentFrame()
  return interpolate(frame, [startFrame, startFrame + duration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.ease,
  })
}

// Single line of text that fades in
function Line({ text, style = {}, startFrame, color = CREAM, size = 28, weight = 400, duration = 20 }) {
  const opacity = useOpacity(startFrame, duration)
  return (
    <p style={{
      fontFamily: 'Georgia, serif',
      fontSize: size,
      fontWeight: weight,
      color,
      margin: 0,
      opacity,
      letterSpacing: '0.02em',
      lineHeight: 1.4,
      ...style,
    }}>
      {text}
    </p>
  )
}

// Flashing mathematician name
function MathName({ name, startFrame, endFrame }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 8, endFrame - 5, endFrame],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity,
    }}>
      <p style={{
        fontFamily: 'Georgia, serif',
        fontSize: 72,
        fontWeight: 400,
        color: GOLD,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        margin: 0,
      }}>
        {name}
      </p>
    </div>
  )
}

// Section: opening lines (0–8s)
function Opening() {
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', padding: '0 140px' }}>
      <div style={{ textAlign: 'center', maxWidth: 800 }}>
        <Line text="Every problem that ever felt impossible" startFrame={10} color={MUTED} size={26} />
        <div style={{ height: 16 }} />
        <Line text="started as exactly that." startFrame={30} color={CREAM} size={32} />
      </div>
    </AbsoluteFill>
  )
}

// Section: 3 early mathematicians with brief captions (8–22s)
function EarlyNames() {
  const frame = useCurrentFrame()

  const names = [
    { name: 'FERMAT', caption: "couldn't prove his theorem. He changed the game.", start: 0, end: 80 },
    { name: 'EULER', caption: "couldn't cross the bridges. He invented graph theory.", start: 80, end: 160 },
    { name: 'GAUSS', caption: "couldn't add fast enough. He found the invariant.", start: 160, end: 240 },
  ]

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20 }}>
      {names.map(({ name, caption, start, end }) => {
        const nameOpacity = interpolate(frame, [start, start + 8, end - 8, end], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
        const captionOpacity = interpolate(frame, [start + 10, start + 22, end - 8, end], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
        return (
          <div key={name} style={{ position: 'absolute', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Georgia,serif', fontSize: 68, fontWeight: 400, color: GOLD, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 12px', opacity: nameOpacity }}>
              {name}
            </p>
            <p style={{ fontFamily: 'Georgia,serif', fontSize: 22, color: MUTED, margin: 0, fontStyle: 'italic', opacity: captionOpacity }}>
              {caption}
            </p>
          </div>
        )
      })}
    </AbsoluteFill>
  )
}

// Section: cascade of 18 names (22–38s)
function NameCascade() {
  const frame = useCurrentFrame()

  const allNames = [
    'FERMAT', 'EULER', 'GAUSS', 'LOVELACE', 'GALOIS', 'RIEMANN',
    'NOETHER', 'HOPPER', 'VON NEUMANN', 'NASH', 'SCHELLING',
    'SHANNON', 'GOLDWASSER', 'DIFFIE', 'SATOSHI',
  ]

  // Build a grid of names, each fading in staggered
  const cols = 3
  const rows = Math.ceil(allNames.length / cols)

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: '24px 60px',
        maxWidth: 1200,
        padding: '0 60px',
      }}>
        {allNames.map((name, i) => {
          const delay = i * 8
          const opacity = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
          const scale = interpolate(frame, [delay, delay + 12], [0.85, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
          return (
            <p key={name} style={{
              fontFamily: 'Georgia, serif',
              fontSize: 32,
              fontWeight: 400,
              color: GOLD,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              margin: 0,
              opacity,
              transform: `scale(${scale})`,
              transformOrigin: 'left center',
              textAlign: 'center',
            }}>
              {name}
            </p>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

// Section: thesis statement (38–44s)
function Thesis() {
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', padding: '0 140px' }}>
      <div style={{ textAlign: 'center', maxWidth: 760 }}>
        <Line text="Eighteen thinkers." startFrame={5} color={CREAM} size={36} />
        <div style={{ height: 20 }} />
        <Line text="Eighteen times someone changed the frame" startFrame={20} color={MUTED} size={26} />
        <Line text="and made an impossible problem playable." startFrame={32} color={MUTED} size={26} />
      </div>
    </AbsoluteFill>
  )
}

// Section: the book (44–50s)
function TheBook() {
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', padding: '0 140px' }}>
      <div style={{ textAlign: 'center', maxWidth: 700 }}>
        <Line text="Playable Worlds" startFrame={5} color={GOLD} size={52} weight={400} />
        <div style={{ height: 16 }} />
        <Line text="is a book about that lineage." startFrame={18} color={CREAM} size={28} />
      </div>
    </AbsoluteFill>
  )
}

// Section: the game mechanic (50–56s)
function TheGame() {
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', padding: '0 140px' }}>
      <div style={{ textAlign: 'center', maxWidth: 700 }}>
        <Line text="But it's also a game." startFrame={5} color={CREAM} size={40} />
        <div style={{ height: 28 }} />
        <Line text="Each chapter arrives with a question." startFrame={30} color={MUTED} size={22} />
        <Line text="You answer before you get the next one." startFrame={44} color={MUTED} size={22} />
        <div style={{ height: 20 }} />
        <Line text="Your response is woven into your copy." startFrame={58} color={MUTED} size={22} style={{ fontStyle: 'italic' }} />
      </div>
    </AbsoluteFill>
  )
}

// Section: the promise (56–60s)
function ThePromise() {
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', padding: '0 140px' }}>
      <div style={{ textAlign: 'center', maxWidth: 700 }}>
        <Line text="No two copies are the same." startFrame={5} color={GOLD} size={42} />
      </div>
    </AbsoluteFill>
  )
}

// Section: end card (60s+)
function EndCard() {
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20 }}>
      <div style={{ textAlign: 'center' }}>
        <Line text="100 founding readers." startFrame={5} color={MUTED} size={22} />
        <div style={{ height: 8 }} />
        <Line text="One agent who read it first." startFrame={18} color={MUTED} size={22} />
        <div style={{ height: 48 }} />
        {/* Entropy Press mark */}
        <Line text="∞" startFrame={30} color={GOLD} size={64} />
        <div style={{ height: 16 }} />
        <Line text="ENTROPY PRESS" startFrame={40} color={GOLD} size={24} style={{ letterSpacing: '0.3em' }} />
        <div style={{ height: 16 }} />
        <Line text="entropypress.xyz" startFrame={52} color={GOLD_DIM} size={18} style={{ fontFamily: 'monospace', letterSpacing: '0.1em' }} />
      </div>
    </AbsoluteFill>
  )
}

// ── Main composition ──────────────────────────────────────────────────────────

const SECTIONS = [
  { component: Opening,    start: 0,   end: 8   },   // 0–8s
  { component: EarlyNames, start: 8,   end: 22  },   // 8–22s (3 × 80 frames = 240 frames = 8s)
  { component: NameCascade,start: 22,  end: 38  },   // 22–38s
  { component: Thesis,     start: 38,  end: 44  },   // 38–44s
  { component: TheBook,    start: 44,  end: 50  },   // 44–50s
  { component: TheGame,    start: 50,  end: 56  },   // 50–56s
  { component: ThePromise, start: 56,  end: 60  },   // 56–60s
  { component: EndCard,    start: 60,  end: 68  },   // 60–68s
]

export const EntropyPressLaunch = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const currentSec = frame / fps

  return (
    <AbsoluteFill style={{ background: BG }}>
      {/* Audio */}
      <Audio src={staticFile('voiceover-slow.wav')} />

      {/* Sections — render the active one */}
      {SECTIONS.map(({ component: Component, start, end }) => {
        if (currentSec < start || currentSec >= end) return null
        const localFrame = Math.round((currentSec - start) * fps)
        return (
          <AbsoluteFill key={start}>
            <LocalFrameContext frame={localFrame}>
              <Component />
            </LocalFrameContext>
          </AbsoluteFill>
        )
      })}

      {/* Global fade-in at very start */}
      {frame < 15 && (
        <AbsoluteFill style={{
          background: BG,
          opacity: interpolate(frame, [0, 15], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }} />
      )}
    </AbsoluteFill>
  )
}

// Remotion requires a composition registration — put in Root.jsx
export const remotionConfig = {
  id: 'EntropyPressLaunch',
  component: EntropyPressLaunch,
  durationInFrames: 68 * 30, // 68 seconds at 30fps
  fps: 30,
  width: 1920,
  height: 1080,
}
