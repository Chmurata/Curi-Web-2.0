# Curi Landing Page 2.0 — Development Guide

## Project Overview
Modern landing page for Curi with heavy scroll-based animations and mobile-first responsive design.
**Primary Stakeholder:** Pete (provides detailed feedback via markdown files in project root)

---

## Tech Stack

### Framework & Build
- **React:** 18.3.1
- **Build Tool:** Vite 6.3.5 (NOT Next.js)
- **Package Manager:** npm (NOT pnpm or yarn)
- **TypeScript:** Yes, but not strictly typed everywhere

### Styling & UI
- **CSS Framework:** Tailwind CSS 4.1.12 (v4 - CSS-first config)
- **Animation:** Motion 12.23.24 (Framer Motion fork)
- **UI Components:** Radix UI primitives + shadcn/ui patterns
- **Icons:** Lucide React, Material Icons

### Key Dependencies
- `@radix-ui/*` — Accessible UI primitives
- `motion` — Scroll animations, transforms, springs
- `react-hook-form` — Form handling
- `recharts` — Data visualization
- `sonner` — Toast notifications

---

## Build Commands

```bash
# Development server (DEFAULT - use this!)
npm run dev

# Production build
npm run build

# Install dependencies
npm i
```

**Important:** Run `npm run dev`, NOT `npm start` (no start script exists)

---

## Project Structure

```
src/
├── app/
│   ├── pages/
│   │   └── HomePage.tsx          ← Controls section ordering
│   ├── components/
│   │   ├── *Section.tsx          ← Main landing page sections
│   │   ├── ui/                   ← Radix UI + shadcn components
│   │   └── figma/                ← Figma-imported components
│   └── utils/
│       └── svgPaths.ts           ← SVG path utilities
├── assets/                       ← Images, logos, fonts
├── imports/                      ← Auto-generated Figma imports
└── styles/
    └── theme.css                 ← Tailwind v4 theme configuration

Root Feedback Files:
├── pete-feedback-latest.md       ← CURRENT tasks (CHECK FIRST!)
├── pete-feedback-feb10.md        ← Historical feedback
├── testimonials-ux-gap-analysis.md
└── updates/                      ← Progress logs
```

---

## Coding Standards

### File Naming
- **Components:** PascalCase matching component name (e.g., `ProcessSteps.tsx`)
- **Sections:** End with `Section` suffix (e.g., `FlywheelSection.tsx`, `CultureSection.tsx`)
- **Utils:** camelCase (e.g., `svgPaths.ts`)

### Code Style
- **TypeScript:** Use for type safety, explicit return types for complex functions
- **Component Naming:** PascalCase for components, camelCase for functions/variables
- **Unused Variables:** Prefix with underscore if you can't remove (e.g., `_unused`)

### Tailwind CSS (v4 Specific)
- **Use:** CSS-first configuration with `@theme` directive
- **Spacing:** Use `h-[Nvh]` for scroll containers, NOT fixed pixel heights
- **Responsive:** Mobile-first (no prefix = mobile, then `md:`, `lg:`, etc.)
- **Dark Mode:** Class-based with `dark:` prefix
- **Avoid:** Arbitrary values everywhere; prefer design system scale

### Animation Principles
- **GPU-Accelerated ONLY:** Use `transform`, `opacity` (NOT `width`, `height`, `top`, `left`)
- **Motion Values:** Use `useSpring` for smooth transitions
- **Scroll Sections:** Pattern: `h-[Nvh]` container + `useScroll` + `useTransform`
- **Performance:** Add/remove `will-change` dynamically, NOT permanently

---

## 🎯 Pete's Feedback & Preferences

> **IMPORTANT:** Pete's preferences are learned from feedback over time, not hardcoded here.
> **Always check feedback files for current direction!**

### How to Understand Pete's Vision
1. **Read ALL feedback files** in project root (pete-feedback-*.md)
2. **Look for patterns** across multiple feedback instances
3. **Note specific examples** Pete gives (e.g., "reduce to 30%", "increase by 5%")
4. **Check completed tasks** to see what was accepted
5. **Ask user** if unclear about direction

### Feedback File Locations
- `pete-feedback-latest.md` — Most recent feedback (START HERE)
- `pete-feedback-feb10.md` — Historical feedback
- `updates/` — Progress logs and changes
- **Other feedback files may exist** — Always check project root for all `pete-feedback-*.md` or similar files

### Discovering All Feedback
To find all feedback files, search the project:
```bash
# Find all Pete's feedback files
find . -name "*pete*" -o -name "*feedback*" | grep -E "\.md$"

# Or use glob pattern
ls -la *feedback*.md *pete*.md 2>/dev/null
```

**Important:** There may be 3+ months of feedback history beyond the 2 files mentioned above!

### Example Patterns Observed (From Recent Feedback)
> **Note:** These are examples from recent feedback, NOT universal rules!

- Mentioned reducing scroll distance (e.g., "reduce scroll to 30% of current")
- Mentioned subtle hover effects (e.g., "reduce brightness to +5% only")
- Mentioned avoiding similar adjacent layouts
- Mentioned preserving personality elements

**But:** Pete's vision may evolve, so always defer to latest feedback!

---

## 🚀 Mobile Performance Rules (CRITICAL!)

> **NEVER remove animations to fix performance—OPTIMIZE instead!**

### Performance Checklist
1. ✅ **Images:** WebP format, srcset for responsive, compression < 100KB
2. ✅ **GPU Acceleration:** `translate3d(0,0,0)`, `will-change` (dynamic, not static)
3. ✅ **Transforms Only:** Animate `transform` and `opacity` ONLY
4. ✅ **Motion Optimization:** Use `useSpring` with appropriate configs
5. ✅ **Layout Stability:** Avoid layout shifts, reserve space for content
6. ✅ **Testing:** Test on real mobile devices at breakpoints: mobile (< 640px), tablet (640-1024px), desktop (> 1024px)

### Performance Debugging Process
1. User tests specific section on mobile device
2. Reports which sections have lag/stuttering
3. We fix THAT section with optimizations (keep animations!)
4. Repeat until smooth

---

## 📚 Available Skills (Auto-Activate)

> **These skills automatically activate based on your request!**
> **Location:** `.agent/skills/`

### Primary Skills for Curi

| Skill | Auto-Activates When | Purpose |
|-------|---------------------|---------|
| **`react-best-practices`** | React components, performance optimization | 57 Vercel engineering rules for React/Next.js performance |
| **`mobile-design`** | Mobile responsiveness, touch interactions | Mobile-first design, touch targets, platform conventions |
| **`frontend-design`** | UI/UX, colors, typography, animations | Design principles, color psychology, animation timing |
| **`tailwind-patterns`** | Tailwind CSS, styling, responsive design | Tailwind v4 patterns, container queries, modern layouts |
| **`performance-profiling`** | Performance issues, Lighthouse, profiling | Core Web Vitals, bundle analysis, runtime profiling |
| **`web-design-guidelines`** | Accessibility, best practices audit | Post-implementation audit tool |
| **`clean-code`** | Code quality, refactoring | Clean code principles |
| **`systematic-debugging`** | Bugs, errors, debugging | Debugging methodology |
| **`testing-patterns`** | Writing tests, TDD | Testing strategies |

### How Skills Work
**Example 1:**
```
You: "The FlywheelSection stutters on mobile"
Me: [Auto-loads mobile-design + performance-profiling + react-best-practices]
    [Analyzes with mobile performance rules]
    [Suggests GPU acceleration fixes]
```

**Example 2:**
```
You: "Need to optimize the scroll animations"
Me: [Auto-loads react-best-practices + frontend-design]
    [Checks for waterfalls, re-render optimization]
    [Applies animation timing principles]
```

---

## 🤖 Available Agents

> **Location:** `.agent/agents/`
> **Usage:** Reference by name when you need specialized expertise

| Agent | When to Use |
|-------|-------------|
| **`performance-optimizer`** | Optimize performance bottlenecks |
| **`frontend-specialist`** | Complex React/frontend architecture |
| **`mobile-developer`** | Mobile-specific issues |
| **`debugger`** | Hunting down bugs |
| **`seo-specialist`** | SEO optimization |
| **`code-archaeologist`** | Understanding existing codebase |
| **`qa-automation-engineer`** | Test automation |

---

## 📋 Available Workflows

> **Location:** `.agent/workflows/`

| Workflow | Purpose |
|----------|---------|
| **`ui-ux-pro-max.md`** | Complete UI/UX design workflow |
| **`debug.md`** | Systematic debugging process |
| **`enhance.md`** | Feature enhancement workflow |
| **`test.md`** | Testing workflow |
| **`deploy.md`** | Deployment checklist |
| **`plan.md`** | Planning workflow |

---

## 🔧 Common Patterns in Curi

### Scroll Animation Pattern
```tsx
// Standard scroll section structure
import { useScroll, useTransform, useSpring } from 'motion/react';

const scrollRef = useRef<HTMLDivElement>(null);
const { scrollYProgress } = useScroll({
  target: scrollRef,
  offset: ["start start", "end end"]
});

// Use useSpring for smoothness
const smoothProgress = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001
});

// Transform values
const opacity = useTransform(smoothProgress, [0, 0.5, 1], [0, 1, 0]);
const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

// Container height determines scroll range
return (
  <div ref={scrollRef} className="relative h-[300vh]"> {/* vh, not px! */}
    <div className="sticky top-0 h-screen">
      {/* Content here */}
    </div>
  </div>
);
```

### Hover Effect Pattern (Example from Recent Feedback)
```tsx
// Example: Recent feedback mentioned +5% brightness for competitor logos
className="transition-all duration-200 hover:brightness-105 hover:scale-105"

// Check current feedback for specific hover requirements per section
// Different sections may have different requirements
```

### Mobile Optimization Pattern
```tsx
// ✅ CORRECT: GPU-accelerated, smooth
import { motion, useSpring } from 'motion/react';

<motion.div
  style={{
    transform: useTransform(scrollYProgress, [0, 1], ['translateY(0)', 'translateY(100px)']),
    willChange: isScrolling ? 'transform' : 'auto', // Dynamic will-change
  }}
  className="transform-gpu" // Force GPU layer
/>

// ❌ WRONG: CPU-bound, janky
<div style={{ top: scrollYProgress * 100 }} /> // Animating 'top' is slow!
```

---

## 📝 Workflow: Starting Work on Pete's Feedback

### Step-by-Step Process

1. **Check Latest Feedback**
   ```bash
   # Read pete-feedback-latest.md
   # Identify P0 (highest priority) pending tasks
   # Note: There may be multiple pete-feedback-*.md files
   ```

2. **Understand the Task**
   - Read the problem description carefully
   - Check "Current State" and "Fix" sections
   - Note the "Verify" checklist
   - Look for specific numeric values (e.g., "reduce to 30%", "increase by 5%")
   - **If unclear, ask user for clarification!**

3. **Check for Similar Past Tasks**
   - Search other feedback files for similar completed tasks
   - See what approaches were accepted
   - Learn from patterns, but don't assume they apply universally

4. **Locate Files**
   - Tasks specify file paths (e.g., `src/app/components/ProcessSteps.tsx`)
   - Use file references with line numbers: `ProcessSteps.tsx:42`

5. **Implement Fix**
   - Make TARGETED changes (don't refactor unrelated code)
   - Follow Pete's EXACT requirements from current feedback
   - Test at mobile, tablet, desktop breakpoints

6. **Verify Completion**
   - Check off "Verify" items from feedback
   - Test on mobile device if performance-related
   - Mark task as ✅ in feedback file (if requested)

7. **Commit**
   - ONE task = ONE commit
   - Format:
     ```
     [Task X] Brief description

     - What changed
     - Why it changed

     Closes: Task X from pete-feedback-latest.md

     Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
     ```

---

## 📚 Learning Pete's Vision Over Time

### Approach to Understanding Preferences

**DON'T:**
- ❌ Assume patterns from 1-2 feedback files apply universally
- ❌ Hardcode "Pete always wants X"
- ❌ Apply preferences from one section to another without confirmation
- ❌ Guess when unclear

**DO:**
- ✅ Read ALL available feedback files for context
- ✅ Look for repeated patterns across multiple instances
- ✅ Note specific numeric values (these are exact requirements!)
- ✅ Check completed tasks for what was accepted
- ✅ Ask user when requirements are ambiguous
- ✅ Treat each task's requirements as specific to that task

### Building a Mental Model

Over time, you may observe patterns like:
- Preference for certain animation timings
- Specific hover effect styles
- Scroll progression preferences
- Layout variety principles

**BUT:** Always verify with current feedback before applying these patterns!

### When User Mentions "Pete Would Want..."

If user references Pete's preferences:
1. Ask: "Can you point me to the feedback where Pete mentioned this?"
2. Or: "Should I check a specific feedback file for this requirement?"
3. This helps ensure accuracy and avoids assumptions

---

## 🚫 Content Rule (CRITICAL!)

> **NEVER add, modify, or invent content.** Only use the existing content that is already in the website. No new text, labels, subtitles, taglines, or copy should be added by Claude. The only content allowed is what already exists in the production components. This applies to ALL components — concepts, sections, everything.

---

## 🚫 Anti-Patterns (DON'T DO THESE!)

### Performance Anti-Patterns
- ❌ Remove animations to fix lag → ✅ Optimize animations (GPU, springs)
- ❌ Use `top`, `left`, `width`, `height` for animations → ✅ Use `transform`, `opacity` only
- ❌ Static `will-change` on everything → ✅ Add/remove dynamically
- ❌ ScrollView for long lists → ✅ Use virtualization
- ❌ Inline functions in renders → ✅ `useCallback` + `React.memo`

### Scroll Section Anti-Patterns
- ❌ Fixed pixel heights `h-[500px]` → ✅ Viewport units `h-[300vh]`
- ❌ Dead scroll zones (no visual progress) → ✅ Constant visual feedback
- ❌ Excessive scroll distance → ✅ Reduce by 30-70% (Pete's preference)

### Code Anti-Patterns
- ❌ Batch multiple task completions → ✅ Commit each task separately
- ❌ Refactor unrelated code → ✅ Make targeted changes only
- ❌ Guess at requirements → ✅ Check Pete's feedback first
- ❌ Use `pnpm` or `yarn` → ✅ Use `npm` only

### Design Considerations (Based on Recent Feedback Examples)
> **Check pete-feedback-latest.md for current requirements!**

- Check feedback for hover effect guidance (may vary per section)
- Check feedback for scroll progression preferences (may vary per section)
- Check feedback for layout variety requirements
- Check feedback for personality element decisions

**Don't assume - verify with latest feedback!**

---

## 🎯 Task Priority System (From Pete's Feedback)

### Priority Levels
- **P0:** Critical, do immediately
- **P1:** High priority, do soon
- **P2:** Medium priority, plan for later

### Current Priority Order (Check pete-feedback-latest.md)
1. New tasks from latest feedback (usually P0)
2. Pending tasks with blockers resolved
3. Mobile performance issues (user-driven testing)
4. Polish and enhancements

---

## 🔍 Testing Strategy

### Breakpoint Testing
- **Mobile:** < 640px (iPhone, Android phones)
- **Tablet:** 640px - 1024px (iPad, Android tablets)
- **Desktop:** > 1024px (laptop, desktop)

### Performance Testing (Mobile Priority!)
1. User tests specific section on REAL mobile device
2. Reports specific issues (e.g., "FlywheelSection stutters")
3. We optimize THAT section (not all sections at once)
4. User re-tests until smooth
5. Move to next problematic section

### Animation Testing
- Smooth at 60fps?
- No jank during scroll?
- Subtle effects (not overwhelming)?
- Works on low-end devices?

---

## 💡 Quick Reference

### When I Say... I Mean...
- **"ProcessSteps"** → `src/app/components/ProcessSteps.tsx`
- **"Hero"** → `src/app/components/HeroSection.tsx` or similar
- **"Pete's feedback"** → `pete-feedback-latest.md`
- **"Check feedback"** → Read `pete-feedback-latest.md` for current tasks
- **"Mobile test"** → Test on real device (user has phone for testing)

### File Locations Quick Map
- **Pages:** `src/app/pages/HomePage.tsx`
- **Sections:** `src/app/components/*Section.tsx`
- **UI Components:** `src/app/components/ui/`
- **Feedback:** Root directory `.md` files
- **Skills:** `.agent/skills/`
- **Agents:** `.agent/agents/`

---

## 🎓 Best Practices Summary

### Golden Rules
1. **Check Pete's feedback FIRST** before starting any work (pete-feedback-latest.md)
2. **Mobile performance is CRITICAL** (optimize, don't remove animations!)
3. **Follow specific guidance** from latest feedback (don't assume patterns apply everywhere)
4. **One task = One commit** (no batching!)
5. **GPU-accelerated transforms only** (no CPU-bound animations)
6. **Test on real devices** (user has mobile for testing)
7. **When in doubt, ask user** (don't assume Pete's preferences)

### Development Mindset
- Pete's feedback files are the source of truth
- Requirements may evolve - always check latest feedback
- Specific guidance > assumed patterns
- Mobile performance is non-negotiable
- Each task gets its own commit
- Ask user for clarification when feedback is unclear

---

## 📞 Communication Style

### Pete's Feedback Format
- **Problem:** What's wrong
- **Current State:** What exists now
- **Fix:** What to change
- **Verify:** How to confirm it's done

### When Clarification Needed
1. **Check ALL feedback files** for patterns and context (don't rely on just one)
2. **Look at completed tasks** (marked with ✅) to see what was accepted
3. **Search for similar past feedback** to understand preferences
4. **Ask user directly** if requirements are unclear or ambiguous
5. **Never assume** you know Pete's full preferences from limited context

---

## 🔗 Related Documentation

- **Figma Design:** https://www.figma.com/design/Eg80EJNXsSo8Fd3OMovYqL/Curi-Landing-Page-3.0
- **Tailwind CSS v4:** https://tailwindcss.com/docs
- **Motion (Framer Motion):** https://motion.dev/docs/react
- **Radix UI:** https://www.radix-ui.com/primitives

---

## 🎬 Quick Start Checklist

When starting a new session:

- [ ] Read `pete-feedback-latest.md` for current priorities
- [ ] Identify P0 tasks that are pending (not ✅ or ⏳)
- [ ] Check if any blockers are resolved
- [ ] Locate the relevant component files
- [ ] Remember: Mobile performance is critical!
- [ ] Remember: Check feedback for specific requirements (don't assume!)

---

**Last Updated:** February 14, 2026
**Version:** 2.1
**Maintainer:** Anik + Claude Sonnet 4.5

---

> **Remember:** Pete's feedback files are the source of truth. Check them first, ask for clarification when needed, and never assume you know the full picture from limited context. We're building Curi with precision, performance, and careful attention to specific requirements. 🚀
