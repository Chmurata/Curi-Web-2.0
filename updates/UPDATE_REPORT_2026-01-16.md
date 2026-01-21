# Update Report: Standardizing & Stabilizing Curi Landing Page
**Date:** January 16, 2026
**Focus:** Visual Consistency, Responsive Robustness ("Safe Sticky"), and Premium Polish.

## 🚀 Executive Summary
Today's session focused on elevating the landing page's user experience by standardizing scrolling behaviors and ensuring layout stability across all devices. We implemented a robust **"Safe Sticky Pattern"** to prevent content cutoff, synchronized animation timings across major sections, and polished card-based layouts for a cleaner, more professional look.

---

## 🛡️ Major Architectural Upgrade: "Safe Sticky Pattern"
We identified and fixed a critical responsive issue where sticky sections (using `h-screen`) were cutting off content on smaller laptops or mobile devices.

**The Fix:**
*   **Dynamic Height:** Replaced `h-screen` with `min-h-screen`, allowing containers to expand if content is taller than the viewport.
*   **Overflow Safety:** Removed `overflow-hidden` from sticky wrappers to allow content to "breathe".
*   **Mobile Padding:** Added `pt-20` (80px) padding specifically for mobile devices to prevent headlines from getting hidden behind browser URL bars.

**Applied to:**
1.  `SayDoGapSection`
2.  `ActivationSection`
3.  `CultureBehaviorSection`
4.  `PerformanceSection`
5.  `PlansSection`

---

## 🎨 Visualization & Animation Refinements

### 1. Unified Scroll Animation
Standardized the "Appearance Animation" across all sticky sections to a **Pure Vertical Scroll**.
*   **Behavior:** Content slides from `110vh` (off-screen bottom) to `0vh` (rest position).
*   **Cleanliness:** Removed distracting fade, blur, and scale effects for a solid, high-performance feel.
*   **Affected Sections:** `Activation`, `Performance`, `Plans`, `SayDoGap`.

### 2. Say-Do Gap Section Tuning
*   **Removed Fades:** Content remains fully visible immediately for quicker readability.
*   **Subtle Parallax:** Reduced phone scaling intensity by 50% (from 5% range to 2.5% range) for a more elegant, "breathing" effect.

### 3. Layout Polish
*   **Activation Section:** Enforced specific line breaks on desktop for better typography balance.
*   **Performance Section:** Reduced distances between titles and content; adjusted phone frame sizing and subtitle typography (40px).

### 4. 💠 Quadrant Section Overhaul (Visual & Logic)
*   **Thicker, Glowing Axes:** Increased axis stroke width to `3px` and added a `#235e9a` drop-shadow for a neon/tech aesthetic.
*   **Clearer Central Hub:** Removed the distracting "reticle" circles. Scaled up the central Curi logo (3.6x) and added a powerful dual-layer drop shadow for emphasis.
*   **Smart Connection Paths:** Fixed path logic for specific nodes (Copilot, ChatGPT) to ensure lines connect cleanly from the correct edge.
*   **Title Repositioning:** Moved quadrant titles inwards (closer to the center) for a tighter, more cohesive grouping.
*   **Visual Logic:** Exception handling for specific node gradients ("lattice", "workday", "perceptyx") to ensure visual hierarchy.

### 5. 💎 Global Branding Updates
*   **Unified Color System:** Updated all primary logo assets (`Curi Logo.svg`, `Footer Logo.svg`) to use the new Deep Blue `#235e9a`.
*   **Brand Consistency:** This color shift aligns the global brand identity with the new high-contrast axes and diagram elements in the Quadrant section.

---

## 🃏 Component Refinements: Cards & Grids

### 1. Process Steps ("How to get started")
*   **Equalized Heights:** Forces all cards to match height (`items-stretch`).
*   **Refined Spacing:** Reduced internal padding to `p-6` and tightened gaps between title, grid, and CTA.
*   **Cleaned Content:** Removed manual `<br>` tags for better responsive text flow.
*   **CTA Placement:** Moved the "Request Demo" button to flow naturally below the grid rather than floating absolutely on top.

### 2. Features List ("Endless aligned conversations")
*   **Mirrored Design:** Applied the exact same refinements as Process Steps to ensure visual consistency.
*   **Layout:** Equal height cards, consistent `mt-6` spacing for the CTA button.

---

## 🎭 Session 2: Animation & Polish Updates (Afternoon)

### 1. "Rise from Bottom" Standardisation
We replaced the generic fade-in animations with a dramatic, consistent **"Rise from Bottom"** effect across key sections to create a sense of depth and momentum.
*   **Culture Section:** Text blocks now rise from `600px` below. Removed opacity fades so elements are fully visible as they rise.
*   **One Conversation Section:** Replicated the exact same `600px` rising logic for consistency.

### 2. Mobile Parallax Implementation
Added a subtle, breathing parallax effect to phone frames to make them feel alive during scroll.
*   **Behavior:** Scale `0.975` → `1.025` and vertical shift `30px` → `-30px`.
*   **Applied to:** `CultureBehaviorSection` and `PerformanceSection` (matching the `SayDoGap` reference).

### 3. Z-Index & Interaction Fixes
*   **Hero CTA:** Fixed a "dead click" zone where the `Hero` sticky container was overlapping the `Culture` section's button. Removed `z-10` from Hero to allow natural stacking.
*   **Infinite Scroll:** Lowered z-index from `70` to `20` to prevent it from scrolling *over* the sticky Header menu (`z-50`).

### 4. Component Customization
*   **Bubble Menu (Quadrant Section):** Implemented a dark-mode variant with custom colors (`#14181C` bg, `#171D21` border/hover) specific to the Quadrant section.
*   **Performance Section:**
    *   **Phone Resize:** Reduced phone frame size by **15%** (Mobile: 170px, Desktop: 246px).
    *   **Typography:** Removed manual line breaks from the headline for better responsiveness.
    *   **Spacing:** Increased margin between title and content by ~30% for better visual separation.

---

## 📦 Codebase Status
*   **Git:** All changes have been committed and pushed to `main`.
*   **Stability:** Mobile and Tablet views are significantly more robust due to the formatting updates.
