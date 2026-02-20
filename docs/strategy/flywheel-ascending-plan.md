# Flywheel Ascending Spiral — Implementation Plan

**Date:** Feb 20, 2026
**Context:** Pete picked Concept 3 (The Sticky Hub) as the winning flywheel. He wants the flywheel effect visualized — each time step 6 feeds back into step 1, the cycle ascends with bigger/brighter steps. Users should also be able to spin the hex diagram with mouse/finger independently of scroll.

**Skills applied:** `frontend-design/animation-guide`, `frontend-design/motion-graphics`, `frontend-design/visual-effects`, `performance-profiling`, `mobile-design/touch-psychology`, `mobile-design/mobile-performance`

**Agents consulted:** `frontend-specialist` (animation choreography, interaction design), `performance-optimizer` (frame budget, GPU concerns, existing bugs)

---

## Files to Modify

| File | Change | Effort |
|------|--------|--------|
| FlywheelSection.tsx | Remove concept dropdown, render StickyHub directly | Small |
| FlywheelStickyHub.tsx | Multi-cycle logic, ascending visuals, drag/spin, perf fixes | Large |

---

## Step 0: Fix Existing Performance Bugs (Found by Performance Agent)

### Bug 1: `setActiveStep` called every frame (not just on change)
The `useMotionValueEvent` callback calls `setActiveStep(nextStep)` unconditionally on every scroll frame (~60/sec). React bails out since the value hasn't changed, but it's unnecessary overhead.

**Fix:** Guard with `if (nextStep !== prevStepRef.current)` before calling `setActiveStep`.

### Bug 2: HexNode animates `width` and `height` (layout thrashing)
Current code: `animate={{ width: size, height: size, scale: ... }}`. Animating `width`/`height` triggers CPU layout recalculation on every frame — violates GPU-only rule.

**Fix:** Set width/height to max size statically, use `scale` exclusively.

---

## Step 1: Remove Concept Dropdown

- Remove imports for `CircularCycleDiagram`, `FlywheelRelay`, `FlywheelHelix`
- Remove dropdown, render `<FlywheelStickyHub />` directly
- Move unused concept files to `flywheel-backups/`

---

## Step 2: Multi-Cycle State & Scroll Mapping

### Scroll Height: `h-[800vh]`
Each cycle is progressively shorter to simulate flywheel acceleration:

| Range | Cycle | Steps | Scroll per step |
|-------|-------|-------|-----------------|
| 0.03-0.38 | 1 | 0-5 | ~47vh (leisurely) |
| 0.38-0.42 | - | transition | ascending moment |
| 0.42-0.66 | 2 | 0-5 | ~32vh (quicker) |
| 0.66-0.69 | - | transition | ascending moment |
| 0.69-0.87 | 3 | 0-5 | ~24vh (rapid) |
| 0.87-1.00 | 3 | all complete | final hold |

---

## Step 3: Visual Ascending Effect

- Pre-computed colors at module scope (3 cycles x 6 steps, brightness factors: 0%, 15%, 30%)
- Node scaling multipliers: [1.0, 1.15, 1.35]
- Glow intensity increases per cycle (radius: 12/18/28px)
- Arc stroke width instant change (not animated): 3 + cycle * 0.5
- Vertical shift: `animate={{ y: currentCycle * -12 }}`
- Center logo scale: [1.0, 1.15, 1.35]
- Concentric ring indicators (3 thin SVG arcs outside hexagon)
- Background orb opacity increases: 8% -> 12% -> 19%

---

## Step 4: Cycle Transition Animation (~1200ms)

**Phase 1 (0-400ms):** Closing arc glow pulse from node 0
**Phase 2 (200-800ms):** Scale-up + vertical ascend + color brighten
**Phase 3 (400-1000ms):** Arc reset (fade out, pathLength to 0, fade back in) + logo squeeze-bounce
**Phase 4 (800-1200ms):** Step reset to 0, hex rotates to STEP_ROTATIONS[0]

Optional: 3D perspective tilt during transition (`perspective(1000px) rotateX(-6deg)` -> springs back)

---

## Step 5: Drag/Spin Interaction (Desktop Only)

- `useMotionValue` for drag rotation (NOT useState — zero React re-renders at 60fps)
- `onPan` handlers for rotational drag (cross-product math for rotation direction)
- Inertia spring: stiffness 20, damping 8, mass 2 (heavy flywheel feel, ~2-3s coasting)
- Snap-back after 3s idle: spring stiffness 15, damping 12
- Visual affordance: `cursor: grab/grabbing`, one-time dashed arrow hint
- NO drag on mobile (touch-action:none blocks scroll on 40-60% of viewport)

---

## Step 6: Mobile Layout

- Keep current static diagram + card stack approach
- Add concentric ring indicators for cycle progression
- No drag interaction
- Refinements based on Pete's mobile feedback later

---

## Performance Safeguards

- Pre-computed colors at module scope (zero runtime cost)
- useMotionValue for drag (0 React re-renders during drag)
- Static width/height on HexNode (fix existing layout thrashing)
- Guard setActiveStep on change only (eliminate 95% redundant calls)
- strokeWidth instant (not GPU-accelerated, don't animate)
- IntersectionObserver for off-screen pause
- Dynamic willChange (only during animation/drag/transition)
- rAF velocity threshold (stop inertia loop when < 0.5 deg/s)
- contain: layout style paint on diagram
- prefers-reduced-motion support

---

## Spring Config Reference

| Animation | Stiffness | Damping | Mass | Feel |
|-----------|-----------|---------|------|------|
| Scroll smoothing | 80 | 28 | 1 | Smooth tracking (existing) |
| Step rotation | 60 | 20 | 1 | Hex rotation (existing) |
| Drag inertia | 20 | 8 | 2 | Heavy flywheel coasting |
| Snap-back | 15 | 12 | 1 | Gentle return |
| Cycle scale-up | 40 | 14 | 1 | Weighty ascend with overshoot |
| 3D tilt | 50 | 18 | 1 | Momentary lift-and-settle |
| Glow pulse | 120 | 12 | 1 | Bouncy energy burst |
| Logo bounce | 300 | 15 | 1 | Quick squeeze-bounce (existing) |

---

## Verification

1. Scroll all 3 cycles — steps 1-6 progress, loop back bigger/brighter each time
2. Flywheel acceleration — cycle 1 is leisurely, cycle 3 is rapid
3. Cycle transition — visible glow pulse + ascending moment
4. Drag to spin — grab hex, spin freely, momentum on release, snaps back after 3s
5. Drag independence — spinning doesn't affect scroll step progression
6. Performance — 0 React re-renders during drag, < 16.67ms frame time
7. Mobile — static layout, ring indicators, no drag conflicts
8. No concept dropdown — FlywheelSection renders StickyHub directly
9. No new content — only visual indicators (rings, dots), no invented text
10. Reduced motion — respects prefers-reduced-motion
