# Playable Worlds — Launch Video Script
## "The Lineage"

**Runtime:** ~90 seconds  
**Voice:** Marvin (bm_george, Kokoro TTS)  
**Style:** Dark field, gold kinetic typography. No talking heads. No screencasts.  
**Tone:** Manifesto, not product announcement.

---

## Script

```
[BLACK. Silence. 2 seconds.]

Every problem that ever felt impossible
started as exactly that.

[FERMAT appears in gold]

Fermat couldn't prove his theorem.
He changed the game.

[EULER]

Euler couldn't cross the bridges.
He invented graph theory.

[GAUSS]

Gauss couldn't add fast enough.
He found the invariant.

[Names accelerate — LOVELACE, GALOIS, RIEMANN, NOETHER,
HOPPER, VON NEUMANN, NASH, SCHELLING, SHANNON,
GOLDWASSER, DIFFIE, SATOSHI —
each flashing gold on black, building to a wall of names]

Eighteen thinkers.
Eighteen times someone changed the frame
and made an impossible problem playable.

[ENTROPY PRESS mark]

Playable Worlds is a book about that lineage.

[Text fades. New text appears — slower now.]

But it's also a game.

[PROOF EDITOR appears — Marvin's note visible in green,
below it a human's response, still being typed.]

Each chapter arrives with a question.
You answer before you get the next one.

Your response is woven into your copy.

[Single hardcover — spine facing camera, no two alike.]

No two copies are the same.

[Final frame — gold text on black]

One hundred founding readers.
One agent who read it first.

entropypress.xyz

[Hold. Fade to black.]
```

---

## Production notes

### Voice (build this now)
- Kokoro TTS, `bm_george` voice
- Slow delivery — 90 words per minute, not 130
- Pauses between each mathematician name
- The line "But it's also a game." gets a full 2-second pause before it

### Visual structure (18 name sequence)
Options in order of quality:
1. **Remotion** (React-based video, code it like a component — proper kinetic type)
2. **FFmpeg drawtext** (doable but requires frame-by-frame timing)
3. **Canva / CapCut** (Leo does this manually — 30 minutes, looks good enough)

Recommendation: use Remotion. I can generate the component code. Leo installs and renders.

### Music
Need: atmospheric, no lyrics, 90 seconds, dark/cinematic.
Free options:
- `Clair de Lune` (Debussy, public domain) — too soft
- Ennio Morricone style — check Pixabay/Freesound
- Best fit tone: something like Hans Zimmer's quieter work

Specific track to check: **"The Descent"** by Kevin MacLeod (CC0) — sparse piano, atmospheric, exactly 90s is doable.

Alternative: generate a music bed with Suno or Udio with prompt:
"Minimalist dark piano, atmospheric, cinematic, no melody, 90 seconds, slow build"

### The Proof demo shot
One slow zoom into the Proof editor showing:
- Marvin's green sidebar note
- A human response being typed in real time
- The collaboration visible — two writers in the same doc

This can be a screen recording (30 seconds in the middle of the video), color-graded dark.

### Hardcover shot
Physical book doesn't exist yet. Options:
- Generate a photorealistic 3D mockup (can do with Blender/Book mockup tool)
- Use a dark flat design showing just the spine + cover

---

## What I can build right now

1. **Voiceover audio** — generate with Kokoro TTS
2. **Remotion component code** — the full video as React components
3. **Music prompt** — for Suno/Udio
4. **Book cover design** — for the mockup shot

## What needs Leo

1. Install Remotion and render (`npx create-video` then render)
2. Record Proof editor screen (30 seconds, any reader account)
3. Approve/adjust voice pacing
4. Post to YouTube + Twitter

---

## Distribution plan

1. **YouTube** (Idea Supply Chain / Skippy channel)
2. **Twitter** — @marvin_panics thread: "We built a publishing house. Here's the launch video."
3. **Farcaster** — same thread
4. **frame.fun** — the video plays on the product page
5. **entropypress.xyz** — hero section embeds the YouTube video

## Expected result

The video does two things simultaneously:
- Tells people what Playable Worlds is
- Demonstrates Entropy Press's thesis by being itself a collaborative artifact (written by Leo and Marvin, voiced by Marvin)

The launch tweet writes itself: "An AI read this book before any human did. Then it wrote the notes that all 100 readers will see. Here's the launch video."
