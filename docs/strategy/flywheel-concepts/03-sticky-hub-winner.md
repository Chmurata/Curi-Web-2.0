# Concept 3: The Sticky Hub (FlywheelStickyHub) — WINNER

**File:** `src/app/components/FlywheelStickyHub.tsx` (~815 lines)
**Status:** Selected by Pete (Feb 20, 2026). Being evolved with ascending multi-cycle effect.

---

## Animation Idea

A hexagonal hub with 6 chat-bubble nodes arranged at vertices. As the user scrolls, the hex diagram rotates to align each active node with a text description panel on the right. Arcs progressively draw between nodes showing the flow. The center Curi logo grows with each step. The metaphor: a hub-and-spoke conversation network where each interaction strengthens the whole.

## Key Mechanics

- **Hexagonal layout:** `hexPositions(cx, cy, radius)` calculates 6 vertices starting at 12 o'clock (-90deg), clockwise
- **Scroll mapping:** `h-[400vh]` container, scrollProgress [0.05, 0.80] maps to steps 0-5, [0.80, 1.00] = all complete
- **Hex rotation:** `STEP_ROTATIONS = [90, 30, -30, -90, -150, -210]` aligns active node with right side. Spring: stiffness 60, damping 20
- **Chat bubble nodes:** HugeIcons `Comment02Icon` filled with step color, step number centered in white. Active nodes scale 1.5x with glow drop-shadow. Completed nodes show checkmark badge
- **Counter-rotation:** Node content and center logo counter-rotate to stay upright as hex spins
- **Arc drawing:** SVG arcs between adjacent nodes with gradient strokes, progressive `pathLength` animation. Arc radius = hexRadius * 1.15 for gentle curves
- **Step description panel:** AnimatePresence cross-fade with directional enter/exit (from top when scrolling down, from bottom when scrolling up). Shows large gradient step number + step label
- **Logo growth:** Center logo scales by 5% per step (1.0 -> 1.30 at step 6) with squeeze-bounce spring (stiffness 300, damping 15)
- **Dynamic willChange:** Only active during scroll animation (`isAnimating` flag based on scroll position)

## Visual Style

- Two-column layout: hex diagram left, text panel right
- Blue-to-teal color gradient: #275E92 -> #1D5486 -> #2A688E -> #3BA099 -> #1D9392 -> #2EBAA6
- Ambient background orbs (3 at different positions, blur 80px, 8-15% opacity)
- Light background with subtle gradient feel
- Chat bubble icon gives it personality (conversation-focused brand)

## Mobile Layout

- Static hex diagram at top (shows all 6 steps completed, no rotation)
- Vertical card stack below with staggered `whileInView` entrance
- Glass-style cards with left accent bars and numbered badges
- Loop-close SVG arrow at bottom
- No scroll-driven animation (simple, performant)

## What Pete Wants Next (Feb 20 Feedback)

1. **Ascending multi-cycle:** 3 cycles through steps 1-6, each bigger/brighter than the last
2. **Flywheel acceleration:** Cycle 1 is leisurely, cycle 3 is rapid (less scroll per step)
3. **Drag/spin interaction:** Users can spin the hex diagram independently with mouse (desktop only)
4. **No concept dropdown:** Render StickyHub directly, remove switcher

See: `docs/strategy/flywheel-ascending-plan.md` for full implementation plan.
