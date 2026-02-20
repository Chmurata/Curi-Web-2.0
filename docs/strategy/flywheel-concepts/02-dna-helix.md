# Concept 2: The DNA Helix (FlywheelHelix)

**File:** `src/app/components/FlywheelHelix.tsx` (~640 lines)
**Status:** Superseded by Concept 3 (Sticky Hub)

---

## Animation Idea

Two interweaving strands (blue and teal) draw downward as the user scrolls, like a DNA double helix. Step cards appear at the crossover points where the strands intersect. The metaphor: the flywheel steps are encoded in the organization's DNA, intertwined and inseparable.

## Key Mechanics

- **Sine wave paths:** `generateHelixPath()` uses high-resolution sampling (24 points/period) with Catmull-Rom cubic bezier fitting for smooth curves. Blue strand at phase=0, teal at phase=PI
- **3 periods = 6 crossovers:** Each half-period crossing corresponds to one step
- **Depth illusion:** SVG clip paths divide the helix into 6 vertical segments. In each segment, the "front" strand renders at full opacity, the "back" strand at 0.35 — alternating which is in front per segment (`getStrandFrontAtStep`)
- **Progressive drawing:** `strandDrawProgress` maps scrollProgress [0.05, 0.85] to pathLength [0, 1]
- **Step cards:** Circular badges (120-160px) positioned at crossover points, alternating left/right sides. Fade in progressively as scroll passes thresholds
- **Return paths:** Dashed SVG curves from strand ends back toward center, appearing at 90% scroll
- **Traveling dots:** `<animateMotion>` circles that follow the strand paths after cycle completes, with fade-in/out opacity animation

## Visual Style

- Clean white background with subtle radial gradient
- Blue strand: #275E92 -> #1D5486 -> #3496DE vertical gradient
- Teal strand: #3BA099 -> #1D9392 -> #2EBAA6 vertical gradient
- Crossover dots at intersection points
- Step cards are circular with gradient borders matching step colors
- Glow filter on traveling dots (`feGaussianBlur stdDeviation=3`)

## Mobile Layout

- Same vertical helix, narrower amplitude (80px vs 140px)
- Smaller crossover dots (4px vs 5px)
- Cards use `clamp(120px, 34vw, 160px)` sizing
- Centered cards (all at 50% left) instead of alternating

## Why It Was Not Chosen

While visually striking, the helix metaphor was more abstract and didn't clearly communicate the cyclical "flywheel" nature — it felt more linear (top to bottom) than circular. The crossover depth illusion was technically impressive but subtle. Pete preferred the hexagonal hub's clearer step-by-step circular progression.
