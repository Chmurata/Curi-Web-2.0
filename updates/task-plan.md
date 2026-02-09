# Curi Landing Page 2.0 — Task Plan (Revised)

---

## Task 1: Speech Bubbles — Rounded & More Faint ✅ COMPLETE

**File:** `src/app/components/CultureSection.tsx`

Replaced all 4 SVG speech bubbles with the icons8 rounded speech bubble shape. Right-side bubbles (A, C) mirrored horizontally. All sizes increased 10%. Max opacity reduced from 0.4–0.5 → 0.15–0.20.

---

## Task 2: Remove Scrollytelling Delays

**Goal:** "User should never scroll and not see something moving." — No perceived pause between scrolling and animation response.

**Scope:** Scrollytelling (sticky scroll) sections only. These use tall scroll containers (`h-[150vh]`, `h-[300vh]`, etc.) with `position: sticky` viewports and `useScroll`/`useTransform` to drive animations from scroll position.

### Analysis: Which scrollytelling sections have delay issues?

**Sections WITH lag/delays:**
- **CultureSection** — `useSpring` adds smoothing lag + word stagger `delay: i * 0.06`
- **QuadrantSection** — `useSpring` adds smoothing lag
- **FeaturesList** — `whileInView` desktop stagger `delay: index * 0.1` (up to 500ms)

**Sections already clean (no delays, no springs):**
- Hero (explicitly avoids springs — comment: "snappy, performant scrolling")
- ProcessSteps, CircularCycleDiagram, TestimonialsSection, PlansSection, CultureGrowthSection — all use raw `scrollYProgress` directly

### Changes:

**A. `CultureSection.tsx` — Remove `useSpring` (Lines 28-32)**
```
// REMOVE spring smoothing — use raw scrollYProgress like Hero does
const smoothProgress = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001
});
```
Replace all references to `smoothProgress` with `scrollYProgress`. The spring adds visible lag between scroll input and animation — Hero section proves raw progress works well. All bubble parallax transforms and bigText/content animations should reference `scrollYProgress` directly.

**B. `CultureSection.tsx` — Reduce word stagger (Line 175)**
```
delay: i * 0.06  →  delay: i * 0.025
```
The word-by-word headline stagger. Removing entirely would look flat. Reducing from 60ms to 25ms per word keeps the cascade feel but completes in ~250ms total (11 words × 25ms) instead of 660ms.

**C. `QuadrantSection.tsx` — Remove `useSpring` (Lines 406-410)**
```
// REMOVE spring smoothing — use raw scrollYProgress
const scrollSmooth = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001,
});
```
Replace all references to `scrollSmooth` with `scrollYProgress`. Same fix as CultureSection — removes the lag between scroll and SVG line-draw / logo reveal animations.

**D. `FeaturesList.tsx` — Remove whileInView stagger (Line 69)**
```
delay: index * 0.1  →  delay: 0
```
The `whileInView` cards stagger 0–500ms. With zero delay, all visible cards animate simultaneously on viewport entry. The scroll-linked desktop stacking animation (separate system) has no delay and needs no change.

### Files to modify: 3 files (CultureSection.tsx, QuadrantSection.tsx, FeaturesList.tsx)

---

## Task 3: Reduce Section Spacing (Targeted)

**Goal:** Tighten vertical spacing between sections — but targeted per gap, not a blanket 1/3 rule.

**Important distinction:** Only reduce padding/margin that creates GAPS between sections. Do NOT reduce scroll container heights (`h-[400vh]`, `h-[300vh]`, etc.) — those drive scroll-linked animation timing.

### Analysis: Gap sizes at 1440px desktop

| Gap | Desktop | Mobile | Source |
|-----|---------|--------|--------|
| CultureSection → InfiniteScroll | ~181px | ~42px | CultureSection `mb-[20vh]` + InfiniteScroll top padding |
| InfiniteScroll → SayDoGap | ~186px | ~80px | InfiniteScroll bottom + SayDoGap top `clamp(4rem,8vw,10rem)` |
| **SayDoGap → Activation** | **288px** | **128px** | Both sections' symmetric padding stacking |
| **Activation → CultureBehavior** | **288px** | **128px** | Same double-padding stacking |
| CultureBehavior → Flywheel | 160px | 64px | Single-sided (Flywheel has 0 top padding) |
| Flywheel → FeaturesList | 128px | 96px | Single-sided (FeaturesList `pt-32`) |
| FeaturesList → Performance | 160px | 64px | Single-sided (FeaturesList has 0 bottom) |
| Performance → ProcessSteps | 160px | 64px | Single-sided (ProcessSteps has 0 top) |
| ProcessSteps → QuadrantSection | 0px | 0px | Zero-gap scrollytelling flow (5 sections) |
| **Quadrant → OneConversation** | **320px** | **128px** | Handled separately in Task 6 |
| OneConversation → Footer | 192px | 112px | User confirmed this looks fine — NO CHANGE |

### Root cause of the biggest gaps

The 4 "symmetric padding" sections (SayDoGap, Activation, CultureBehavior, Performance) all use `clamp(4rem, 8vw, 10rem)` on BOTH top and bottom. When two adjacent ones stack, the gap doubles to 288-320px. When they sit next to scrollytelling sections (0px padding), the 160px gap is actually reasonable.

### Changes (targeted per gap):

**A. The 4 symmetric sections — reduce padding ~40%**
These are the main source of oversized gaps. Reduce from `clamp(4rem, 8vw, 10rem)` to `clamp(2.5rem, 4.5vw, 5.5rem)`:
- Mobile: 40px/side (was 64px)
- Desktop: 88px/side (was 160px)
- Adjacent pair gap: ~176px desktop (was 288px — 39% reduction)
- Next-to-scrollytelling gap: ~88px desktop (was 160px — 45% reduction)

| # | Section | Current | New | File |
|---|---------|---------|-----|------|
| 1 | SayDoGapSection | `clamp(4rem, 8vw, 10rem)` | `clamp(2.5rem, 4.5vw, 5.5rem)` | SayDoGapSection.tsx |
| 2 | ActivationSection | `clamp(4rem, 8vw, 8rem)` | `clamp(2.5rem, 4.5vw, 5rem)` | ActivationSection.tsx |
| 3 | CultureBehaviorSection | `clamp(4rem, 8vw, 10rem)` | `clamp(2.5rem, 4.5vw, 5.5rem)` | CultureBehaviorSection.tsx |
| 4 | PerformanceSection | `clamp(4rem, 8vw, 10rem)` | `clamp(2.5rem, 4.5vw, 5.5rem)` | PerformanceSection.tsx |

**B. FeaturesList top padding — moderate reduction (~25%)**
Current 128px desktop gap after Flywheel is a bit generous but not extreme:

| # | Section | Current | New | File |
|---|---------|---------|-----|------|
| 5 | FeaturesList | `pt-24 md:pt-32` | `pt-20 md:pt-24` | FeaturesList.tsx |

**C. NO CHANGE — leave these alone:**
- Hero, CultureSection, InfiniteScroll — spacing already minimized
- QuadrantSection bottom margin → Task 6 handles this with targeted fix
- OneConversationSection margins → Task 6 handles top padding; bottom margin to footer is fine
- All zero-gap scrollytelling sections (ProcessSteps → CultureGrowth → Plans → Testimonials → Quadrant)

### Files to modify: 5 files (SayDoGap, Activation, CultureBehavior, Performance, FeaturesList)

---

## Task 4: InfiniteScroll — 60% Less Space Above & Below

**File:** `src/app/components/InfiniteScroll.tsx`

### Changes:

**Container padding (fluidStyles.container):**
```
paddingTop: "clamp(2.5rem, 8vw, 8rem)"    →  "clamp(1rem, 3.2vw, 3.2rem)"
padding:    "clamp(2.5rem, 5vw, 4rem) ..."  →  "clamp(1rem, 2vw, 1.6rem) ..."
```

This reduces both top and bottom padding to 40% of current (= 60% reduction). The horizontal padding stays unchanged.

### Files to modify: 1 file (InfiniteScroll.tsx)

---

## Task 5: Competitor Animation — Hover Lights Up Line + Curi Dots Dance

**File:** `src/app/components/QuadrantSection.tsx`

This is the most complex task. Three sub-changes:

### A. Remove Flying Dots

Delete or disable:
- `TravelingDot` component (lines 289-347) — remove usage, keep component for reference
- `DOT_ASSIGNMENTS` array (lines 364-368) — delete
- `DOT_DESTINATIONS` object (lines 354-362) — delete
- `generateDotPath` function — delete
- `packetProgress` / `packetOpacity` scroll transforms (lines 462-468) — delete
- The "Converging Dots" `<g>` rendering block (lines 857-880) — delete
- The per-logo hover traveling dot (lines 624-635) — delete

Keep `curiDotsOpacity` but change it to fade in when lines finish drawing (around 0.90-0.92 scroll) instead of waiting for dots to arrive (0.935-0.94).

### B. Hover Lights Up Connecting Line

**Current behavior:** Hovered line goes from strokeWidth 1 → 1.5. Same opacity for all lines.

**New behavior:**
- **Default state (no hover):** All lines at base opacity (current `linesOpacity`)
- **Hover state:** The hovered logo's line gets:
  - `strokeWidth: 2.5` (more visible contrast)
  - `opacity: 1` (full brightness)
  - Apply `filter="url(#strong-glow)"` for a neon-like glow effect
  - Brighter gradient (use a highlight gradient with higher stopOpacity)
- **Non-hovered lines during hover:** Dim to `opacity: 0.15` so the active line stands out
- **Transition:** 300ms ease for smooth crossfade

### C. Curi Dots Dance on Hover

The 3 Curi dots are SVG `<path>` elements (green #8EF4AE, olive #A9BD75, blue #235e9a) rendered at lines 842-849 inside a `<motion.g>`.

**New behavior:** When ANY competitor logo is hovered (`activeLogo !== null`):
- Each dot gets a staggered vertical bounce animation (translateY oscillation)
- Dot 1: bounces with 0ms delay
- Dot 2: bounces with 100ms delay
- Dot 3: bounces with 200ms delay
- Bounce amplitude: ~3-4px, duration ~600ms, ease: easeInOut, repeat: Infinity
- On mouse leave: animation stops, dots return to rest position

**Implementation approach:**
- Wrap each dot `<path>` in individual `<motion.path>` elements
- Use `animate` prop conditionally based on `activeLogo !== null`
- Use `transition` with staggered `delay` per dot

### Files to modify: 1 file (QuadrantSection.tsx)

---

## Task 6: OneConversation Section — Spacing & Phone Position

**File:** `src/app/components/OneConversationSection.tsx` + `QuadrantSection.tsx`

### Problem A: Huge gap above the section (Quadrant → Phone)

**Root cause:** QuadrantSection's `mb-16 md:mb-48` (64/192px) + OneConversationSection's `pt-16 md:pt-32` (64/128px) = **128px mobile / 320px desktop** of combined dead space.

**Fix:** Slash both values. Since this section transitions from the dark QuadrantSection to the light background, some breathing room is needed but not 320px:
```
QuadrantSection:         mb-16 md:mb-48  →  mb-8 md:mb-16
OneConversationSection:  pt-16 md:pt-32  →  pt-8 md:pt-16
```
Combined gap: 64px mobile / 128px desktop (60% reduction).

### Problem B: Huge gap between rotated phone and text below

**Root cause:** CSS `transform: rotate(90deg)` does NOT change the layout box. The phone container is 240×456px (desktop), but when rotated to 90° landscape, it visually becomes ~456×240px. However, the layout still reserves the full 456px of vertical space. This creates **~216px of phantom empty space** below the visible phone before the text starts.

**Fix:** Add negative top margin to the text block to pull it up into the phantom space:
```
// Text container — pull up to close the phantom gap from rotation
className="flex flex-col items-center justify-center space-y-2"
→  className="flex flex-col items-center justify-center space-y-2 -mt-24 md:-mt-32"
```
This pulls the text up 96/128px, closing roughly half the phantom gap (leaving some natural breathing room).

### Problem C: Phone scrolls too high off screen

**Root cause:** The animation completes at `scrollYProgress: 0.5` using offset `["start end", "end start"]`. The section is short (auto height), so the phone finishes animating then quickly scrolls off the top.

**Fix:** Delay the animation start and add min-height:
```
// Scroll offset — tighter range
offset: ["start end", "end start"]  →  ["start 0.85", "end 0.15"]

// Phone rotation — start later
[0, 0.5] → [135, 90]  →  [0.15, 0.55] → [135, 90]

// Phone scale
[0, 0.5] → [0.8, 1]  →  [0.15, 0.55] → [0.85, 1]

// Text Y — reduced travel distance
[0, 0.5] → [80, 0]  →  [0.15, 0.55] → [50, 0]

// Text Opacity
[0, 0.4] → [0, 1]  →  [0.15, 0.5] → [0, 1]

// Section — add min-height so it doesn't rush through
className="relative pt-8 md:pt-16 ..."  →  "relative min-h-[60vh] pt-8 md:pt-16 ..."
```

### Files to modify: 2 files (OneConversationSection.tsx, QuadrantSection.tsx)

---

## Task 7: Flywheel — Label Swell/Highlight + Mobile Sizing

**File:** `src/app/components/CircularCycleDiagram.tsx`

### A. Label Swell & Highlight

**Current state:**
- Text bounce: scale `[0.8, 1.12, 1]` — exists but is subtle
- Opacity: `[0, 1]` — simple fade-in
- No highlight effect (comments in code: "Removed glow for cleaner look", "Removed strong shadow")

The boss says this "still hasn't been added" — meaning the current bounce is not noticeable enough and the highlight effect is missing entirely.

**Changes to textMotionValues (line ~185-194):**

1. **More pronounced swell:**
```
scale: [0.8, 1.12, 1]  →  [0.5, 1.25, 1]
```
Start smaller (0.5) and overshoot higher (1.25) for a more dramatic pop-in.

2. **Add highlight glow:**
Create a new motion value for each segment that controls a `filter` or `textShadow`:
```
highlight: useTransform(scrollYProgress,
  [start, start + 0.04, start + 0.08, end],
  [0, 1, 1, 0]
)
```
At peak swell, apply a white text-shadow glow (`0 0 12px rgba(255,255,255,0.8)`) that fades out as the label settles. This creates a brief "flash" when each label appears.

3. **Brighter entrance:**
During the swell, briefly increase fill brightness:
```
filter: brightness(1.5)  →  brightness(1.0)  (over 0.04 scroll range)
```

**Apply to both number labels (line 351-362) and text labels (line 364-379).**

### B. Mobile/Responsive Sizing

**Current problem:** The 800×800px container uses `transform: scale(clamp(0.72, ..., 1))` which doesn't affect layout dimensions. On mobile, the 800px container overflows and relies on the sticky `overflow: hidden` to clip.

**Fix:** Same approach as ActivationSection — replace `transform: scale()` with `zoom`:
```
// Line 225-228
style={{
  transform: 'scale(clamp(0.72, ...))'  →  zoom: 'clamp(0.45, calc(0.45 + 0.55 * (100vw - 375px) / 1025px), 1)'
  transformOrigin: 'center center'       →  (remove)
}}
```

Note: using a lower minimum (0.45 instead of 0.72) since the boss said it was "too big" on mobile. At 375px viewport, the flywheel visual size becomes 800 × 0.45 = 360px, which fits comfortably.

Also adjust the `-mt-24` mobile offset since zoom will affect the layout dimensions now.

The 400vh scroll container height stays unchanged — the scroll-to-animation ratio should remain the same.

### Files to modify: 1 file (CircularCycleDiagram.tsx)

---

## Questions for You (Remaining)

1. **Task 5 (Competitor hover):** For the Curi dots "dance" — I'll go with a staggered vertical bounce (like a wave). Does that work, or would you prefer a different style?

2. **Task 7 (Flywheel mobile):** The current minimum scale was 0.72. I'm proposing 0.45 since boss said "too big." Does that feel right, or should I try a different minimum?

---

## Implementation Order

| Priority | Task | Effort | Files |
|----------|------|--------|-------|
| 1 | Task 3 — Section spacing ×0.67 | Quick | 8 files |
| 2 | Task 4 — InfiniteScroll ×0.40 | Quick | 1 file |
| 3 | Task 2 — Remove scroll delays | Quick | 3 files |
| 4 | Task 6 — OneConversation spacing + phone fix | Moderate | 2 files |
| 5 | Task 7 — Flywheel labels + mobile | Moderate | 1 file |
| 6 | Task 5 — Competitor hover rework | Complex | 1 file |

Tasks 1-3 can be batched together (quick changes). Task 4-6 need individual testing.
