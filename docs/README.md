# Curi Landing Page 2.0 - Documentation Index

**Last Updated:** February 13, 2026

---

## 📁 Documentation Structure

```
docs/
├── performance/          # Performance optimization & mobile fixes
├── strategy/            # Product strategy, feedback, and planning
├── components/          # Component specifications and designs
├── analysis/            # UX/UI analysis and research
├── integration/         # Third-party integrations (Kajabi, etc.)
└── updates/             # Session logs and progress reports
```

---

## 🚀 Performance Optimization

### Mobile Performance Fixes

📄 **[MOBILE-OPTIMIZATION-SUMMARY.md](./performance/MOBILE-OPTIMIZATION-SUMMARY.md)** ⭐ **START HERE**
- **Comprehensive summary** of all mobile performance optimizations
- Covers 3 major components: FeaturesList, TestimonialsSection, QuadrantSection
- Before/after metrics, implementation details, best practices
- **Target:** 55-60 FPS on mobile ✅ **ACHIEVED**

📄 **[featureslist-mobile-performance-fix.md](./performance/featureslist-mobile-performance-fix.md)**
- Deep-dive analysis of FeaturesList component
- 8 critical issues identified and fixed
- Phase 1 (Quick Wins) + Phase 2 (Fine-tuning) implementation
- **Result:** 30-45 FPS → 55-60 FPS

📄 **[quadrantsection-mobile-performance-fix.md](./performance/quadrantsection-mobile-performance-fix.md)**
- Deep-dive analysis of QuadrantSection component
- 9 critical/moderate issues identified and fixed
- Phase 1 (Critical) + Phase 2 (Additional) optimizations
- **Result:** 18-25 FPS → 55-60 FPS (140% improvement)

---

## 📋 Strategy & Planning

📄 **[pete-feedback-feb10.md](./strategy/pete-feedback-feb10.md)**
- Comprehensive feedback from Pete (February 10, 2026)
- 10 major tasks with detailed specifications
- Mobile responsiveness audit and implementation roadmap
- Priority mapping and severity ratings

📄 **[pete-feedback-latest.md](./strategy/pete-feedback-latest.md)**
- Most recent product feedback and direction

📄 **[ACTION-ITEMS-pete-meeting-feb5.md](./ACTION-ITEMS-pete-meeting-feb5.md)**
- Actionable tasks from Pete's meeting (February 5, 2026)
- 9 major improvements prioritized
- Sticky button, animations, layouts, color adjustments

📄 **[MEMO-seo-for-pete.md](./MEMO-seo-for-pete.md)**
- SEO implementation guidance memo
- Executive summary of SEO gaps
- 6 key questions requiring Pete's input

📄 **[PLAN-seo-implementation.md](./PLAN-seo-implementation.md)**
- Detailed SEO implementation roadmap
- 4 phases with task breakdown
- Success criteria: Lighthouse SEO ≥95, Performance ≥90

---

## 🎨 Component Documentation

### Navigation Components

📄 **[BubbleMenu.md](./BubbleMenu.md)**
- Animated floating menu with glassmorphism design
- Light/dark variants, staggered animations
- Full source code backup

📄 **[GlassThreadNav.md](./GlassThreadNav.md)**
- Minimalist thread-based navigation
- Thin horizontal thread connecting nodes
- Spring animations, variant theming

📄 **[MagneticDotNav.md](./MagneticDotNav.md)**
- Ultra-minimalist dot navigation
- Idle dots → expanding pill buttons on hover
- Smooth cubic-bezier animations

📄 **[NanoCapsuleNav.md](./NanoCapsuleNav.md)**
- Refined sticky navigation with hamburger collapse
- Morphing capsule shape on scroll
- Ultra-transparent glass, compact padding

📄 **[SplitHudNav.md](./SplitHudNav.md)**
- Technical agency-style HUD navigation
- Floating dock with uppercase tracking
- Tech underlines, bracket hover effects

📄 **[Navigation_Design_Ideas.md](./Navigation_Design_Ideas.md)**
- 4 design concepts with pros/cons
- Recommendation for hybrid "Glass Circuit" design

### Animations

📄 **[CuriConfidenceFlywheelAnimation.md](./CuriConfidenceFlywheelAnimation.md)**
- Complete Flywheel animation documentation
- Full working code for CircularCycleDiagram.tsx
- Scroll-based animations, SVG geometry
- 6-segment flywheel configuration

---

## 🔍 Analysis & Research

📄 **[ANALYSIS-hero-section.md](./ANALYSIS-hero-section.md)**
- Comprehensive Hero section UI/UX analysis
- Strengths, improvement opportunities
- Competitive benchmark vs AskNiles
- Implementation priority with effort/impact ratings

📄 **[testimonials-ux-gap-analysis.md](./analysis/testimonials-ux-gap-analysis.md)**
- UX psychology analysis of Testimonials section
- 12 critical UX gaps identified
- Prioritized action plan, quick wins, metrics

---

## 🔗 Integrations

📄 **[lead-generation-analysis.md](./integration/lead-generation-analysis.md)**
- Lead generation and Kajabi integration analysis
- Current Kajabi solution pros/cons
- 8 alternative platforms evaluated
- Recommended stacks for Curi

📄 **[kajabi_integration_plan.md](./integration/kajabi_integration_plan.md)**
- Kajabi integration strategy for lead capture
- 3 integration options with pros/cons
- Recommended Option C for premium UX

---

## 📊 Updates & Reports

📄 **[SESSION-LOG-2026-02-07.md](./SESSION-LOG-2026-02-07.md)**
- Development session log (February 7)

📄 **[SESSION-LOG-2026-02-08.md](./SESSION-LOG-2026-02-08.md)**
- Development session log (February 8)

📄 **[FluidResponsiveness-Session-2026-01-30.md](./FluidResponsiveness-Session-2026-01-30.md)**
- Fluid responsive design implementation
- clamp() function implementation across 5 sections

📄 **[UPDATE_REPORT_2026-01-16.md](../updates/UPDATE_REPORT_2026-01-16.md)**
- Development progress report (January 16)

📄 **[UPDATE_REPORT_2026-01-18.md](../updates/UPDATE_REPORT_2026-01-18.md)**
- Development progress report (January 18)

📄 **[2026-01-18-contact-page-refinements.md](../updates/2026-01-18-contact-page-refinements.md)**
- Contact page refinement documentation

📄 **[culturegrowth-animation-report.md](../updates/culturegrowth-animation-report.md)**
- CultureGrowth section animation implementation

📄 **[flywheel-label-review.md](../updates/flywheel-label-review.md)**
- Flywheel label review and updates

📄 **[task-plan.md](../updates/task-plan.md)**
- Task planning document

---

## 📖 Project Information

📄 **[README.md](../README.md)** (Root)
- Project overview and setup instructions
- Links to Figma design
- Installation: `npm i`, `npm run dev`

📄 **[ATTRIBUTIONS.md](./ATTRIBUTIONS.md)**
- Credits and licensing for third-party assets
- shadcn/ui (MIT license)
- Unsplash photo attributions

---

## 🤖 Agent Framework

The `.agent/` directory contains an extensive AI agent skill system:

- **Agents (20 profiles):** Backend specialist, frontend specialist, debugger, database architect, DevOps engineer, etc.
- **Skills (100+ guides):** API patterns, app building, architecture, database design, frontend design, game dev, mobile design, Next.js/React, performance profiling, testing, and more
- **Workflows (11 orchestrations):** Brainstorm, create, debug, deploy, enhance, plan, test, etc.

---

## 🎯 Quick Start Guide

### For Performance Optimization
1. Read **[MOBILE-OPTIMIZATION-SUMMARY.md](./performance/MOBILE-OPTIMIZATION-SUMMARY.md)** for complete overview
2. Review component-specific guides for deep-dive analysis
3. Apply patterns to new scroll-linked animations

### For Product Strategy
1. Check **[pete-feedback-latest.md](./strategy/pete-feedback-latest.md)** for current priorities
2. Review **[ACTION-ITEMS-pete-meeting-feb5.md](./ACTION-ITEMS-pete-meeting-feb5.md)** for task list
3. Consult SEO planning docs for marketing strategy

### For Component Design
1. Browse **components/** folder for navigation and animation specs
2. Check **[Navigation_Design_Ideas.md](./Navigation_Design_Ideas.md)** for design concepts
3. Review **[CuriConfidenceFlywheelAnimation.md](./CuriConfidenceFlywheelAnimation.md)** for complex animations

### For UX Improvements
1. Read **[ANALYSIS-hero-section.md](./ANALYSIS-hero-section.md)** for Hero optimization
2. Review **[testimonials-ux-gap-analysis.md](./analysis/testimonials-ux-gap-analysis.md)** for social proof improvements
3. Check **analysis/** folder for research findings

---

## 📝 Documentation Standards

### File Naming
- Use kebab-case: `component-name-description.md`
- Include dates for session logs: `SESSION-LOG-YYYY-MM-DD.md`
- Use prefixes for type clarity: `ANALYSIS-`, `PLAN-`, `MEMO-`

### Structure
- Always include date at top
- Use clear headings (##, ###)
- Include code examples in fenced blocks
- Add "Before/After" comparisons for optimizations
- List files modified with line numbers
- Include impact metrics (FPS, bundle size, etc.)

### Maintenance
- Update README.md when adding new docs
- Archive outdated documents to `docs/archive/`
- Keep session logs in chronological order
- Update "Last Updated" dates

---

**Total Documentation Files:** 190+ (including agent framework)
**Core Documentation Files:** 50+ (excluding agent framework)
**Last Major Update:** February 13, 2026 (Mobile optimization completion)
