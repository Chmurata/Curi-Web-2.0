# Flywheel Section — Concept Documentation

> **The Employee Interaction Confidence Flywheel**
> 3 visual concepts exploring how to present Curi's 6-step coaching cycle.

---

## Shared Foundation

All 3 concepts share the same content, color system, and animation framework.

### Content (6 Steps)

| Step | Label |
|------|-------|
| 01 | Employee 1 Receives Coaching |
| 02 | Sends Invitation to Engage |
| 03 | Employee 2 Receives Coaching |
| 04 | Successful Facilitated Conversation |
| 05 | Employees Insight: All Parties Receive Coaching |
| 06 | Insight Builds Confidence to Engage in Challenging Conversations |

### Color System

Blue-to-teal gradient progression across 6 steps:

| Step | Primary Color | Glow/Accent Color |
|------|--------------|-------------------|
| 01 | `#275E92` | `#3496DE` |
| 02 | `#1D5486` | `#275E92` |
| 03 | `#2A688E` | `#2A688E` |
| 04 | `#3BA099` | `#3B9F9F` |
| 05 | `#1D9392` | `#2EBAA6` |
| 06 | `#2EBAA6` | `#1C6E60` |

### Tech Stack

- **React 18.3.1** + **TypeScript**
- **Motion** (Framer Motion fork) from `motion/react`
- **Tailwind CSS v4**
- Scroll-driven via `useScroll` + `useSpring` + `useMotionValueEvent`
- All components wrapped in `memo()` for performance
- Font: Bricolage Grotesque throughout

### Responsive Strategy

- **Mobile breakpoint:** `max-width: 767px` via `matchMedia`
- Mobile layouts are completely separate render paths (not CSS-only)
- Desktop uses scroll-hijacked sticky layouts
- Mobile uses standard vertical flow with `whileInView` triggers

---

## Concept 1: The Relay

**File:** `src/app/components/FlywheelRelay.tsx` (676 lines)

### Visual Description

A **horizontal scroll-hijacked cinema** where 6 glass-morphism cards slide left-to-right as the user scrolls vertically. A glowing baton (light orb with comet trail) travels along the track, passing through each card. At the end, a loop-close SVG arrow appears to signify the cycle repeats.

### Desktop Layout

```
┌─────────────────────────────────────────┐
│              Section Title               │
│                                          │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   │
│  │ 01   │ │ 02   │ │ 03   │ │ 04   │ →→│ ← Horizontal scroll track
│  │ Step │ │ Step │ │ Step │ │ Step │   │
│  └──────┘ └──────┘ └──────┘ └──────┘   │
│           ● ● ● ● ● ●                   │ ← Progress dots
│  ═══════════●═══════════════             │ ← Glowing baton
└─────────────────────────────────────────┘
```

### Key Architectural Decisions

- **Scroll container:** `h-[500vh]` with `sticky top-0 h-screen` viewport
- **Horizontal translation:** `useTransform(smoothProgress, [0.04, 0.88], ["2%", "-72%"])` maps vertical scroll to horizontal card movement
- **Step mapping:** 0–0.85 scroll maps to steps 0–5, 0.85–1.0 reserved for loop-close animation
- **Background:** `bg-gradient-to-b from-[#f2f7fb] via-[#f8fbfe] to-white`

### Sub-Components

| Component | Purpose |
|-----------|---------|
| `StepCard` | Desktop glass-morphism card with accent bar, large number, label. Active card scales 1.03x with glow border |
| `MobileStepCard` | Compact horizontal card with number badge + label |
| `GlowingBaton` | Animated light orb that follows scroll progress across the track. Pulsing box-shadow glow + comet trail |
| `LoopClose` | Curved SVG arrow with gradient stroke, appears at end via AnimatePresence |
| `ProgressDots` | 6 dots below the track — active dot expands to 24px width pill shape |
| `AmbientOrb` | Parallax background orbs that drift at different rates based on scroll |

### Animation Details

- **Card states:** Active (scale 1.03, full opacity, glow border), Past (opacity 0.55), Future (full opacity, no glow)
- **Baton:** `useTransform` for position, infinite pulsing box-shadow animation (2s cycle)
- **Spring config (smooth scroll):** `stiffness: 80, damping: 28, restDelta: 0.0005`
- **Card spring:** `stiffness: 260, damping: 28`

### Mobile Layout

Standard vertical card stack with `whileInView` staggered entrance (0.08s delay per card). No scroll-hijacking, no baton. Loop-close arrow appears via `whileInView` at the bottom.

---

## Concept 2: The DNA Helix

**File:** `src/app/components/FlywheelHelix.tsx` (641 lines)

### Visual Description

Two interweaving **sinusoidal SVG strands** (blue and teal) drawn progressively as the user scrolls. Circular step cards appear at each crossover point where the strands intersect, alternating left and right. The strands create a DNA double-helix illusion with depth — one strand passes in front of the other at each crossover using clipped opacity segments.

### Desktop Layout

```
┌─────────────────────────────────────────┐
│              Section Title               │
│                                          │
│    ┌───┐                                 │
│    │ 1 │ ─────╲                          │
│    └───┘       ╲                         │
│                 ╳ ← crossover point      │
│                ╱ ╲                        │
│               ╱   ┌───┐                  │
│              ╱    │ 2 │                  │
│    ┌───┐   ╱     └───┘                  │
│    │ 3 │──╱                              │
│    └───┘  ╲                              │
│            ╳                             │
│           ╱ ╲                            │
│          ╱   ┌───┐                       │
│         ╱    │ 4 │                       │
│        ╱     └───┘                       │
│  ... continues for all 6 steps ...       │
└─────────────────────────────────────────┘
```

### Key Architectural Decisions

- **Scroll container:** `h-[500vh]` with `sticky top-0 h-screen` viewport
- **SVG generation:** Algorithmically generated sinusoidal paths using Catmull-Rom cubic bezier fitting (24 samples per period for C1 continuity)
- **Depth illusion:** SVG divided into 6 vertical clip-path segments. In each segment, the "back" strand renders at 0.35 opacity and the "front" strand at 1.0 opacity. Front/back alternates per segment
- **Step cards:** Positioned as absolute HTML elements overlaid on the SVG, centered at crossover points using `topPercent = (crossover.y / svgHeight) * 100`
- **No background color** — uses a subtle radial gradient overlay only

### Sub-Components

| Component | Purpose |
|-----------|---------|
| `StepCard` | Circular glass-morphism card with number badge + label. Cards alternate left/right of center (`right: 55%` or `left: 55%`). Animated opacity + slide in from the side |
| `TravelingDot` | Glowing dot that animates along strand paths using SVG `<animateMotion>`. Appears after all 6 steps revealed |
| `generateHelixPath()` | Pure function generating sinusoidal SVG path with Catmull-Rom bezier curves |
| `generateReturnPath()` | Dashed curved return path from strand end back to center |
| `getCrossoverPoints()` | Calculates the 6 crossover y-positions (evenly distributed, centered in each segment) |
| `getStrandFrontAtStep()` | Determines which strand is visually in front at each segment (alternates: blue, teal, blue...) |

### SVG Configuration

- **Viewport:** 600 × 900 with `preserveAspectRatio="xMidYMid meet"`
- **Amplitude:** 140px desktop, 80px mobile
- **Periods:** 3 full sine periods = 6 half-period crossovers (one per step)
- **Strand width:** 4px desktop, 3px mobile
- **Gradients:** Blue strand `#275E92 → #1D5486 → #3496DE`, Teal strand `#3BA099 → #1D9392 → #2EBAA6`

### Animation Details

- **Strand drawing:** `useTransform(smoothProgress, [0.05, 0.85], [0, 1])` drives `pathLength` on both strands
- **Card visibility:** Progressive thresholds — card `i` appears at `0.08 + (i * 0.78) / 6` scroll progress
- **Card entrance:** 0.5s ease-out with slide from the card's side direction (left cards slide from -30x, right cards from +30x)
- **Return loop:** Dashed strands at 0.5 opacity appear when `progress >= 0.9`
- **Traveling dots:** SVG `<animateMotion>` along strand paths, 3s duration, infinite repeat with opacity fade in/out
- **Dynamic willChange:** Managed via scroll timeout — adds `willChange: "transform"` during active scrolling, removes after 150ms idle

### Mobile Layout

Same helix visualization but with reduced amplitude (80px). Cards centered horizontally instead of alternating left/right. No separate mobile-only component — same render path with responsive values.

---

## Concept 3: The Sticky Hub

**File:** `src/app/components/FlywheelStickyHub.tsx` (807 lines)

### Visual Description

A **rotating hexagonal diagram** on the left with a **cross-fading text panel** on the right. Six chat-bubble-shaped nodes (using HugeiconsIcon Comment02Icon) are arranged as hexagon vertices, connected by gradient arcs. As the user scrolls, the entire hexagon rotates to align the active node with the text panel. The center features the Curi logo that progressively grows with each step.

### Desktop Layout

```
┌─────────────────────────────────────────┐
│         The Employee Interaction          │
│         Confidence Flywheel              │
│                                          │
│    ┌─────────────┐   ┌────────────────┐  │
│    │      💬1     │   │                │  │
│    │   💬6  💬2   │   │  01            │  │
│    │    [LOGO]    │   │                │  │
│    │   💬5  💬3   │   │  Employee 1    │  │
│    │      💬4     │   │  Receives      │  │
│    │              │   │  Coaching       │  │
│    └─────────────┘   └────────────────┘  │
│                                          │
│     ↻ Rotates to        Cross-fades     │
│       align active      with delay       │
│       node right                         │
└─────────────────────────────────────────┘
```

### Key Architectural Decisions

- **Scroll container:** `h-[400vh]` with `sticky top-0 h-screen` viewport (20% shorter than other concepts)
- **Two-column layout:** `grid grid-cols-2` with diagram left, text right
- **Hexagonal node positions:** Calculated via trigonometry — 6 vertices starting at 12 o'clock (-90°), proceeding clockwise at 60° intervals
- **Rotation:** Whole diagram rotates via spring to align active node at 3 o'clock (right side, next to text panel). Rotation angles: `[90, 30, -30, -90, -150, -210]`
- **Chat bubble nodes:** HTML `<HugeiconsIcon icon={Comment02Icon}>` overlaid on SVG arcs. SVG paths force-filled via `useCallback` ref to make them solid
- **Counter-rotation:** Both chat bubble icons and center logo counter-rotate to stay upright as the diagram spins
- **No background color** — transparent section, ambient orbs only

### Sub-Components

| Component | Purpose |
|-----------|---------|
| `HexNode` | Chat bubble icon (Comment02Icon from @hugeicons) filled with step color. Sizes: inactive 52px, completed 65px, active 78px. Counter-rotates to stay upright. Checkmark badge on completed nodes |
| `HexArc` | SVG arc path between adjacent nodes with gradient stroke. Background arc at 10% opacity, drawn arc animates `pathLength` |
| `HexDiagram` | Container for SVG arcs + HTML nodes + center logo. Manages node states and arc draw progress |
| `StepDescriptionPanel` | Cross-fading text panel using `AnimatePresence mode="wait"`. Shows large gradient step number + label. Choreographed timing: fast 150ms exit, 350ms delayed spring enter |
| `MobileStepCard` | Compact card with left accent bar, number badge, label |

### Hex Math

```
hexPositions(cx, cy, radius):
  for i in 0..5:
    angle = -π/2 + i * (2π / 6)     // start top, clockwise
    x = cx + radius * cos(angle)
    y = cy + radius * sin(angle)

arcPath(from, to, radius):
  arcRadius = radius * 1.15          // gentle inward curve
  "M {from} A {arcRadius} {arcRadius} 0 0 1 {to}"
```

### Animation Choreography

The key design principle is **"wheel leads, text follows"**:

1. **User scrolls** → `smoothProgress` updates via spring (`stiffness: 80, damping: 28`)
2. **Active step changes** → `setActiveStep(idx)` triggers re-render
3. **Diagram rotation begins** → spring (`stiffness: 60, damping: 20`) — settles in ~400ms
4. **Text panel exits** → fast 150ms upward tween (old text vanishes while wheel is mid-rotation)
5. **Text panel enters** → 350ms delay + spring (`stiffness: 220, damping: 24`) — text appears after wheel has settled
6. **Logo squeeze-bounce** → `key={activeStep}` re-mounts, progressive 5% growth per step (`1 + step * 0.05`)

### Step-to-Scroll Mapping

| Scroll Range | State |
|--------------|-------|
| 0.00 – 0.05 | Title settles, step 0 active |
| 0.05 – 0.80 | Steps 0–5 (each ~12.5% of range) |
| 0.80 – 1.00 | All-complete state (20% hold) |

### Node States

| State | Size | Opacity | Scale | Glow |
|-------|------|---------|-------|------|
| Inactive | 52px | 0.4 | 1.0 | None |
| Active | 78px | 1.0 | 1.1 | `drop-shadow(0 0 12px {glowColor}80)` |
| Completed | 65px | 1.0 | 1.0 | None, checkmark badge |

### Center Logo Animation

Progressive squeeze-bounce — logo grows 5% per step:

```
Step 0: scale 1.00
Step 1: scale 1.05
Step 2: scale 1.10
Step 3: scale 1.15
Step 4: scale 1.20
Step 5: scale 1.25
Step 6: scale 1.30 (all complete)
```

Each transition uses `initial: targetScale - 0.1` with a bouncy spring (`stiffness: 300, damping: 15`).

### Mobile Layout

Complete diagram shown at all-complete state (250px). Below it, a vertical stack of `MobileStepCard` components with staggered `whileInView` entrances. Loop-close SVG arrow at the bottom. No scroll hijacking.

---

## Comparison Matrix

| Feature | Relay | Helix | Sticky Hub |
|---------|-------|-------|------------|
| **Layout** | Horizontal scroll cinema | Vertical sticky with SVG overlay | Two-column: diagram + text |
| **Scroll height** | 500vh | 500vh | 400vh |
| **Primary visual** | Glass cards sliding horizontally | Interweaving DNA strands | Rotating hexagonal diagram |
| **Step presentation** | Cards with large numbers + labels | Circular cards at crossover points | Chat bubble nodes + separate text panel |
| **Node shape** | Rectangular glass cards | Circular glass cards | Chat bubbles (HugeiconsIcon) |
| **Unique element** | Glowing baton + comet trail | 3D depth illusion via clip-path opacity | Diagram rotation + logo squeeze-bounce |
| **Cycle indicator** | Loop-close SVG arrow | Dashed return paths + traveling dots | Final arc closes the hexagon |
| **Background** | Blue-to-white gradient | Subtle radial gradient | Transparent (ambient orbs) |
| **Text approach** | Embedded in cards | Embedded in circular cards | Separate panel, cross-fading |
| **Dependencies** | motion/react | motion/react | motion/react, @hugeicons/react, @hugeicons/core-free-icons |
| **Lines of code** | 676 | 641 | 807 |

---

## File Structure

```
src/app/components/
├── FlywheelSection.tsx          # Concept switcher (dropdown selector)
├── CircularCycleDiagram.tsx     # Original diagram (pre-concepts)
├── FlywheelRelay.tsx            # Concept 1: The Relay
├── FlywheelHelix.tsx            # Concept 2: The DNA Helix
├── FlywheelStickyHub.tsx        # Concept 3: The Sticky Hub
├── FlywheelStickyHub.backup.tsx # Pre-chat-bubble backup
└── flywheel-backups/
    ├── FlywheelRipple.tsx       # Removed: The Ripple
    └── FlywheelCascade.tsx      # Removed: The Cascade
```

---

**Last Updated:** February 18, 2026
