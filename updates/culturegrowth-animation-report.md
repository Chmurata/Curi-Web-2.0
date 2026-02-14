# CultureGrowth Section — Animated Scenario Spotlights

## Project Report  
**Date:** February 12, 2026  
**Section:** "Moment by moment, watch your culture grow."  
**Commit:** `189ca89`  
**Repos:** [MyCuri/Curi-website](https://github.com/MyCuri/Curi-website) · [Chmurata/Curi-Web-2.0](https://github.com/Chmurata/Curi-Web-2.0)

---

## Executive Summary

Transformed the CultureGrowth section from a static 3-column card grid into an immersive, scroll-triggered sequential experience. Each card is now paired with a looping animated illustration that demonstrates the Curi coaching concept in action — using real Curi design system patterns adapted for light mode.

---

## 1. Planning & Ideation

### Original State
- **Layout:** 3 cards in a responsive grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- **Content:** Static icons + title + description per card
- **Engagement:** Minimal — no motion, no storytelling, no visual demonstration of Curi's value

### Brainstormed Approaches
Multiple layout concepts were evaluated before settling on the final direction:

| Approach | Description | Verdict |
|----------|-------------|---------|
| Animated icon overlays | Icons animate on scroll | Too subtle, doesn't tell a story |
| Lottie illustrations | Custom Lottie files per card | Too heavy, requires designer assets |
| **Scenario Spotlights** | Mini chat scenes showing Curi in action | ✅ Chosen — authentic, demonstrates product value |
| Parallax card stack | Cards stack/unstack on scroll | Visually interesting but doesn't add meaning |

### Key Design Decisions
1. **Reuse Curi's own design system** — chat bubbles, coaching messages, and avatars adapted from `Message.tsx` components
2. **Light mode adaptation** — original components are dark-themed; all colors remapped for the landing page's light context
3. **Looping animations** — initially planned as play-once, changed to continuous loops with breathing pauses
4. **Scroll-triggered reveal** — show one combo at a time rather than all three simultaneously

---

## 2. Curi Design System Integration

Components sourced from `/curi-design-system/src/components/Message.tsx`:

### Adapted Components

| Original | Landing Page Adaptation |
|----------|------------------------|
| `CoachMessage` (dark bg, Curi logo) | Blue accent border-left, `bg-[#2b72ba]/8`, Curi logo PNG |
| `UserMessage` (dark bubble) | `bg-[#0b1220]` dark bubble, right-aligned |
| `PersonaMessage` (avatar + border) | Real avatar images, white bubble with gray border |

### Assets
- **`curi-logo.png`** — copied from design system, used in all Curi coaching bubbles
- **Avatar images** — real profile photos replacing letter placeholders (Scene 1 & 3)

---

## 3. Animation Scenes — Final Implementations

### Scene 1: "The message you're afraid to send"
**File:** `SceneMessage.tsx`

```
Sequence: Persona asks → User types harsh reply → Curi coaches → Text morphs to kind version ✓
```

- **Alex's message** slides in: *"Can we talk about what happened in the meeting?"*
- **User's harsh reply** appears with blinking cursor: *"I think you were out of li—"*
- **Curi coaching** fades in: *"Try leading with how it made **you** feel."*
- **Text crossfade**: harsh text dissolves → *"I felt caught off guard—can we align on this?"* with ✓

**Technical note:** Uses an invisible spacer paragraph matching the longer "kind" text to prevent bubble height collapse during the crossfade.

---

### Scene 2: "The conflict that keeps getting postponed"
**File:** `SceneConflict.tsx`

```
Sequence: Notification card → Curi nudge → Snooze fades → Card morphs to guided framework
```

- **Notification card**: *"Feedback conversation with Jordan"* with Snooze/Address Now buttons
- **Curi nudge**: *"This has been postponed **3 times**."*
- **Button shift**: Snooze dims to 0.3 opacity, Address Now gets blue ring highlight
- **Morph**: Notification card scales down, replaced by 3-step guided framework card

---

### Scene 3: "The commitment that usually slips"
**File:** `SceneCommitment.tsx`

```
Sequence: Sam asks → User gives vague reply → Curi challenges → Commitment pill appears ✓
```

- **Sam's message**: *"Can you get the report done?"*
- **User's vague reply**: *"Yeah I'll try to get to it."*
- **Curi challenge**: *"Make it **specific** and trackable."*
- **Commitment pill**: Dark bubble transforms into a bordered pill: *"📌 Q3 Report → Oct 18 → You ✓"*

---

## 4. Scroll-Triggered Architecture

### How It Works

```
┌─────────────────────────────────────┐
│  <section>  height: 300vh          │  ← Scroll runway
│                                     │
│  ┌──────────────────────────────┐   │
│  │  <div> sticky top-0 h-screen │   │  ← Fixed viewport
│  │                              │   │
│  │  "Moment by moment..."       │   │  ← Persistent heading
│  │                              │   │
│  │  ┌── ScrollCombo ──────────┐ │   │
│  │  │ Card (45%) │ Anim (55%) │ │   │  ← Swaps as you scroll
│  │  └────────────────────────-┘ │   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

### Scroll Progress Mapping
- **Scroll 0%–33%:** Combo 1 (Message) — fade in, hold, fade out
- **Scroll 33%–66%:** Combo 2 (Conflict) — fade in, hold, fade out
- **Scroll 66%–100%:** Combo 3 (Commitment) — fade in, hold (no exit fade)

Each segment uses 15% of its range for enter/exit transitions, with 70% holding the active state.

### Framer Motion Hooks Used
- `useScroll({ target, offset })` — tracks section scroll progress (0→1)
- `useTransform()` — maps scroll progress to opacity and y-offset per combo
- `useAnimate()` — imperative animation sequences inside each scene
- `useInView()` — triggers animation loops only when visible

---

## 5. Iteration History

### Round 1: Split-View Grid
All 3 cards visible simultaneously with animations beside them, alternating left/right.
**User feedback:** *"Show them one by one with scroll-triggered motion."*

### Round 2: Scroll-Triggered Sequential
Implemented sticky viewport + scroll runway. All combos visible one at a time.
**User feedback:** *"Make them bigger, reduce title gap, fix text cutoff."*

### Round 3: Sizing & Polish
- Increased animation content area (340px → 420px)
- Scaled up text (xs → sm/base), avatars (28px → 36px), Curi logo (24px → 36px)
- Reduced heading-to-combo gap
- Fixed SceneMessage bubble height cutoff with invisible spacer technique

### Round 4: Layout Consistency
- Removed alternating left/right — cards always left, animations always right
- Removed card shadow for cleaner look
- Matched animation container `border-radius` to card's `clamp(16px, 2.5vw, 32px)`

### Round 5: Transition Exploration
Tested multiple transition styles:
- ❌ Scale + slide (100% → -100%) — too dramatic
- ❌ Zoom in/out with slight fade — didn't feel right
- ✅ **Original fade + y-slide** (opacity 0→1, y 40→0→-40) — clean and natural

### Round 6: Avatar Images
Replaced letter placeholders ("A", "S") with real profile photos for authenticity.

---

## 6. File Summary

| File | Type | Purpose |
|------|------|---------|
| `CultureGrowthSection.tsx` | Modified | Scroll-triggered layout, Card component, ScrollCombo orchestrator |
| `culture-growth/SceneMessage.tsx` | New | Animation scene 1 — coaching a harsh reply |
| `culture-growth/SceneConflict.tsx` | New | Animation scene 2 — addressing postponed feedback |
| `culture-growth/SceneCommitment.tsx` | New | Animation scene 3 — making commitments specific |
| `assets/curi-logo.png` | New | Curi coaching bubble avatar |

---

## 7. Technical Specs

| Property | Value |
|----------|-------|
| Animation duration | ~3s per loop |
| Pause between loops | ~2s hold + 0.8s reset |
| Animation engine | Framer Motion (`motion/react`) |
| Scroll runway | 300vh (3 × 100vh segments) |
| Transition style | Opacity fade (0→1→0) + y-slide (40→0→-40px) |
| Reduced motion | Animations only trigger when `useInView` returns true |
| Animation properties | `opacity`, `y`, `scale`, `x` — GPU-composited |
| Content max-width | 420px per animation scene |
| Layout | Card 45% left · Animation 55% right |
| Border radius | `clamp(16px, 2.5vw, 32px)` — matched card ↔ animation |

---

*This section demonstrates Curi's core value proposition through authentic interaction patterns — showing, not just telling, how AI coaching transforms everyday workplace conversations.*
