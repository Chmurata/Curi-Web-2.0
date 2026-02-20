# Original: Circular Wheel (CircularCycleDiagram)

**File:** `src/app/components/CircularCycleDiagram.tsx` (~518 lines)
**Status:** Superseded by Concept 3 (Sticky Hub)

---

## Animation Idea

A classic circular flywheel with 6 arrow-shaped glass segments arranged around a center Curi logo. The wheel builds sequentially during a scroll-pinned phase, then rotates via scroll parallax once fully built.

## Key Mechanics

- **SVG-based:** 800x800 viewBox, polar coordinate math (`p2c` helper) for segment positioning
- **Arrow geometry:** Each segment is a wedge with arrowhead tip pointing clockwise, inner radius 100px, outer 250px, tip at 162px
- **Glass effect:** Gradient fills + `url(#glassShine)` soft-light overlay + drop shadow filter
- **Build phase:** `h-[200vh]` container with sticky inner. Segments fade in sequentially (buildProgress 0.05-0.47), then container collapses to `auto` height with `useLayoutEffect` scroll compensation
- **Rotation:** After build, `viewportProgress` maps to 60deg rotation with offset continuity between phases
- **Text counter-rotation:** Segment labels stay upright via `negRotation = useTransform(rotationValue, v => -v)`
- **Performance:** IntersectionObserver pauses ambient orbs when off-screen, pre-calculated arrow paths via `useMemo`, `willChange` on GPU layers

## Visual Style

- Blue-to-teal gradient palette across 6 segments
- Light mode design (white/light backgrounds, `mixBlendMode: 'multiply'` orbs)
- Center logo with gentle breathing scale animation (1 -> 1.05 -> 1)
- Ambient gradient orbs with blur(80px)

## Why It Was Replaced

Pete wanted to explore more dynamic, narrative-driven flywheel visualizations that better communicate the step-by-step progression and the "flywheel effect" of momentum building over cycles.
