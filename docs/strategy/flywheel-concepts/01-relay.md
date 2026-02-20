# Concept 1: The Relay (FlywheelRelay)

**File:** `src/app/components/FlywheelRelay.tsx` (~675 lines)
**Status:** Superseded by Concept 3 (Sticky Hub)

---

## Animation Idea

A horizontal cinema track where glass cards slide left as the user scrolls. A glowing "baton" orb travels across the track, passing energy from step to step — like a relay race. The metaphor: each step hands off momentum to the next.

## Key Mechanics

- **Scroll-hijacked horizontal:** `h-[500vh]` container, `trackX` maps scrollProgress [0.04, 0.88] to ["2%", "-72%"] horizontal translation
- **Glass cards:** `clamp(280px, 22vw, 400px)` wide, `backdrop-filter: blur(16px)`, left accent gradient bar, large step number (semi-transparent), step label
- **Glowing baton:** Follows scroll via `batonX = useTransform(scrollProgress, [0,1], ["8%", "88%"])`, has comet trail (gradient div with blur) + pulsing core orb with animated `boxShadow`
- **Active card:** Scales to 1.03, brighter border/glow; past cards fade to 0.55 opacity
- **Loop close:** After step 6, a curved SVG arrow appears suggesting the cycle continues
- **Progress dots:** Bottom indicator — active dot expands to 24px width with step color

## Visual Style

- Glassmorphism cards (rgba white backgrounds, blur, subtle borders)
- Ambient parallax orbs (3 orbs with different drift rates)
- Blue-to-teal color progression across steps
- Baton glow pulses on 2s infinite cycle

## Mobile Layout

- No scroll-hijack — vertical card stack with `whileInView` stagger animations
- Each card slides in from below (y: 40 -> 0) with spring physics
- Left accent bars + numbered badges
- Simplified background orbs

## Why It Was Not Chosen

The horizontal scroll-hijack felt less natural than a sticky hub approach. The relay metaphor, while interesting, didn't communicate the "flywheel building momentum" as clearly as the hexagonal hub with rotating nodes.
