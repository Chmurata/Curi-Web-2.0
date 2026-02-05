# Hero Section Analysis: Current Specifications &amp; Improvement Opportunities

**Project:** Curi Landing Page 2.0  
**Component:** `src/app/components/Hero.tsx`  
**Date:** February 5, 2026  
**Analyst:** UI/UX Pro Max Analysis

---

## Executive Summary

The Curi Hero section employs a **visually striking, animation-first approach** that immediately communicates the product's human-centric value proposition. The central phone mockup surrounded by expressive human portraits creates an emotional connection, while the sophisticated parallax effects deliver a premium, Apple-grade feel.

However, the current implementation prioritizes **visual spectacle over conversion clarity**. Key opportunities exist to strengthen the value proposition, improve accessibility, and optimize for both user engagement and business outcomes.

---

## UI/UX Pro Max Recommendations

> *Generated using `python3 .agent/.shared/ui-ux-pro-max/scripts/search.py`*

### Design System Analysis

| Attribute | Recommendation |
|-----------|----------------|
| **Pattern** | AI Personalization Landing |
| **Style** | Social Proof-Focused |
| **Typography** | Satoshi / DM Sans (premium, modern, clean) |
| **Colors** | Primary `#3B82F6`, CTA `#F97316`, Background `#F8FAFC` |

**Recommended Section Order:**
1. Dynamic hero (personalized)
2. Relevant features
3. Tailored testimonials
4. Smart CTA

### Landing Pattern: Scroll-Triggered Storytelling

Since Curi uses parallax scrolling, the **Scroll-Triggered Storytelling** pattern is most relevant:

| Aspect | Recommendation |
|--------|----------------|
| **Structure** | Intro hook → Problem → Journey → Solution → Climax CTA |
| **CTA Placement** | End of each "chapter" (mini) + Final climax CTA |
| **Must Have** | Progress indicator (scroll progress bar) |
| **Mobile** | Simplify animations for performance |

### Accessibility Guidelines (HIGH Severity)

| Issue | Requirement |
|-------|-------------|
| **Reduced Motion** | Must check `prefers-reduced-motion` media query |
| **Motion Sensitivity** | Parallax/scroll-jacking can cause nausea — provide fallback |
| **Excessive Motion** | Animate 1-2 key elements per view maximum |

```css
/* Required accessibility pattern */
@media (prefers-reduced-motion: reduce) {
  .parallax-element {
    transform: none !important;
    transition: none !important;
  }
}
```

### Pre-Delivery Checklist (from UI/UX Pro Max)

- [ ] No emojis as icons (use SVG: Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard nav
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px

---

## Current State: Visual Documentation

### Initial View (Above the Fold)
![Hero Initial State](/Users/anikroy/Downloads/Curi Landing Page 2.0/docs/hero_initial_state.png)

### Parallax State (After Scrolling)
![Hero Parallax State](/Users/anikroy/Downloads/Curi Landing Page 2.0/docs/hero_parallax_state.png)

---

## Current Specifications

### Layout Architecture

| Aspect | Current Implementation |
|--------|------------------------|
| **Container Height** | 300vh (mobile) / 360vh (desktop) — Extended scroll canvas |
| **Positioning** | Sticky container with scroll-linked transforms |
| **Z-Index Strategy** | Phone at z-50, inner images z-5, outer images z-0 |
| **Responsiveness** | Fluid via `clamp()` functions |

### Visual Elements

| Element | Specification |
|---------|---------------|
| **Phone Mockup** | 260-340px width, 497-650px height, 36px border-radius |
| **Avatar Images** | 4 cards (2 outer: 180-240px, 2 inner: 220-290px) |
| **Background Text** | "Culture Realized" — Large, low-opacity typography |
| **Color Palette** | Soft blue gradient (`#e0e8f0` tone), Navy CTA (`#235e9a`) |

### Animation System

| Animation | Trigger | Values |
|-----------|---------|--------|
| **Phone Y-Translation** | Scroll 0-60% | 0vh → -165vh |
| **Phone Scale** | Scroll 0-30% | 1.0 → 0.9 |
| **Background Scale** | Scroll 0-15% | 1.0 → 0.9 |
| **Avatar Collapse** | Scroll 0-25% | Outer ±100%, Inner ±50% |
| **Initial Load** | On mount | Fade + scale + Y-offset (staggered 0.2-0.55s) |

### Technical Implementation

```tsx
// Scroll-linked transforms (no spring physics)
const phoneY = useTransform(scrollYProgress, [0, 0.6], ["0vh", "-165vh"]);
const phoneScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);

// GPU acceleration
style={{ transform: 'translateZ(0)' }}
```

---

## Key Strengths

### 1. Emotional Resonance ✅
The diverse human portraits immediately communicate that Curi is about **people**, not just software. The expressive faces (curiosity, surprise, contemplation) trigger emotional engagement.

### 2. Premium Motion Design ✅
The parallax system is smooth and sophisticated. The staggered entrance animations and scroll-linked transforms create a **polished, high-end feel** comparable to Apple or Stripe.

### 3. Fluid Responsiveness ✅
The `clamp()` sizing ensures smooth scaling across breakpoints without jarring "snap" transitions.

### 4. Performance Optimization ✅
GPU acceleration via `translateZ(0)` and direct `useTransform` (no springs) ensure **60fps scrolling**.

---

## Improvement Opportunities

### 🔴 Critical: Missing Value Proposition

**Current State:** No headline, subheadline, or explicit value proposition visible above the fold.

**The Problem:**  
Users arriving at the page see beautiful imagery but have no immediate answer to:
- *"What is this product?"*
- *"What problem does it solve?"*
- *"Why should I care?"*

The "Culture Realized" background text is:
1. Too subtle (low contrast, hidden behind elements)
2. Too vague (doesn't communicate the product's function)

**Recommendation:**

Add a prominent headline + subheadline above or alongside the phone:

```
Headline:     "The AI Coach That Understands Your Team"
Subheadline:  "Curi uses neurointelligent coaching to help leaders make smarter decisions, faster."
```

**Design Approach:**
- Position text to the **left of the phone** on desktop (split-screen layout)
- On mobile, place text **above** the phone carousel
- Use high-contrast typography (dark text on light background)
- Animate text entrance **before** the images for information hierarchy

---

### 🔴 Critical: CTA Visibility &amp; Clarity

**Current State:** The "Join Waitlist" button exists in the navigation bar but:
1. It's small and peripheral
2. It competes with navigation items
3. It's the **only** CTA in the entire hero section

**The Problem:**  
The hero section spans **300-360vh of scroll height** but contains zero conversion opportunities within that space.

**Recommendation:**

1. **Add a primary CTA button** in the hero content area (not just the nav):
   ```
   [Get Started Free] [Watch Demo →]
   ```

2. **Repeat the CTA** after the parallax completes (as the phone reaches its final position)

3. **Use action-oriented language:**
   - Instead of: "Join Waitlist"
   - Consider: "Start Coaching Free" or "See Curi in Action"

---

### 🟡 Important: Scroll Indicator Missing

**Current State:** No visual cue that the page is scrollable or that scrolling reveals more content.

**The Problem:**  
Users may not realize the full experience requires scrolling. The static initial view could be mistaken for the complete hero.

**Recommendation:**

Add a subtle scroll indicator:
- Animated chevron or mouse icon at the bottom of the viewport
- "Scroll to explore" micro-copy (optional)
- Fade out after user begins scrolling

```tsx
<motion.div 
  className="absolute bottom-8 left-1/2 -translate-x-1/2"
  animate={{ y: [0, 10, 0] }}
  transition={{ repeat: Infinity, duration: 1.5 }}
>
  <ChevronDown className="w-6 h-6 text-slate-400" />
</motion.div>
```

---

### 🟡 Important: Accessibility Gaps

| Issue | Current | Fix |
|-------|---------|-----|
| **Alt Text** | Generic "App Interface" | Descriptive: "Curi mobile app showing AI coaching conversation" |
| **Motion Sensitivity** | No `prefers-reduced-motion` | Disable parallax for users who prefer reduced motion |
| **Keyboard Navigation** | Not applicable (no interactive elements) | Add focusable CTA buttons |
| **Screen Readers** | No semantic structure | Add `<h1>` for headline, `role="banner"` |

**Reduced Motion Implementation:**
```tsx
const prefersReducedMotion = useReducedMotion();

// Disable scroll animations if user prefers
const phoneY = prefersReducedMotion 
  ? "0vh" 
  : useTransform(scrollYProgress, [0, 0.6], ["0vh", "-165vh"]);
```

---

### 🟡 Important: Background Text Optimization

**Current State:** "Culture Realized" appears as the user scrolls.

**Issues:**
1. Low contrast makes it nearly invisible on some monitors
2. Appears *after* the hero images have already set expectations
3. Text is purely decorative, not functional

**Recommendations:**

**Option A: Make it functional**
- Increase opacity from ~5% to ~15%
- Position it so it's visible **on initial load** (above the fold)
- Consider making it the actual headline with supporting copy below

**Option B: Enhance it as a reveal moment**
- Keep current timing but add a subtle color shift or glow as it reveals
- Animate individual letters for a more premium "reveal" effect

---

### 🟢 Nice-to-Have: Micro-Interactions

**Opportunity:** The avatar images are currently passive. Adding micro-interactions would increase engagement.

**Suggestions:**
1. **Hover State:** Subtle scale (1.02x) + border highlight on desktop
2. **Cursor Effect:** Custom cursor when hovering over faces
3. **Tooltip Tease:** On hover, show a speech bubble with a coaching quote

---

### 🟢 Nice-to-Have: Loading State

**Current:** Phone image loads with a simple fade.

**Enhancement:** Add a skeleton loader or shimmer effect for slower connections:
```tsx
<div className="animate-pulse bg-slate-200 rounded-3xl" 
     style={{ width: 'clamp(260px, 28vw, 340px)', height: 'clamp(497px, 54vw, 650px)' }} 
/>
```

---

## Competitive Benchmark: AskNiles.ai

Based on our prior competitor analysis, here's how Curi's hero compares:

| Aspect | Curi | AskNiles | Winner |
|--------|------|----------|--------|
| **Value Proposition** | Implicit (Culture Realized) | Explicit headline + subtext | AskNiles |
| **CTA Prominence** | Nav only | Hero center + repeated | AskNiles |
| **Visual Impact** | High (parallax + humans) | Medium (floating UI) | Curi |
| **Animation Quality** | Premium (GPU-optimized) | Premium (spring physics) | Tie |
| **Scroll Indicator** | None | Animated chevron | AskNiles |

**Key Takeaway:** Curi wins on **visual impact** but loses on **conversion clarity**.

---

## Implementation Priority

| Priority | Item | Effort | Impact |
|----------|------|--------|--------|
| **P0** | Add headline + subheadline | 2 hrs | 🔥🔥🔥 |
| **P0** | Add primary CTA button | 1 hr | 🔥🔥🔥 |
| **P1** | Add scroll indicator | 30 min | 🔥🔥 |
| **P1** | Fix accessibility (alt text, reduced motion) | 2 hrs | 🔥🔥 |
| **P2** | Enhance background text reveal | 1 hr | 🔥 |
| **P3** | Add avatar hover interactions | 2 hrs | 🔥 |

---

## Next Steps

1. **Review this analysis** with the team
2. **Approve priority items** for implementation
3. **Provide copy** for headline, subheadline, and CTA text
4. **Run A/B test** after implementation to measure conversion impact

---

*This analysis was generated using UI/UX Pro Max methodology, focusing on balancing aesthetic excellence with conversion optimization and accessibility compliance.*
