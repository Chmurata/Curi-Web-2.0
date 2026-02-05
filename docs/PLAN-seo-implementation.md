# SEO Implementation Plan: Curi Landing Page 2.0

> **Project Type:** WEB
> **Primary Agents:** `seo-specialist`, `performance-optimizer`
> **Skills Used:** `seo-fundamentals`, `geo-fundamentals`, `performance-profiling`
> **Date:** 2026-02-04

---

## Overview

The Curi Landing Page 2.0 currently has **minimal SEO infrastructure**. This plan outlines a comprehensive implementation to achieve best-in-class SEO and GEO (Generative Engine Optimization) readiness.

### Current State (Gaps Identified)

| Category | Current Status | Gap |
|----------|----------------|-----|
| **Title Tag** | "Curi Web 2.0" (generic) | ❌ Not optimized, no keywords |
| **Meta Description** | Missing | ❌ Critical gap |
| **Schema Markup** | None | ❌ No structured data |
| **robots.txt** | Missing | ❌ Crawlers have no guidance |
| **sitemap.xml** | Missing | ❌ Indexing difficulty |
| **Open Graph / Twitter** | Missing | ❌ Poor social sharing |
| **Canonical Tags** | Missing | ❌ Duplicate content risk |
| **Core Web Vitals** | Unknown | ⚠️ Needs audit |
| **GEO Readiness** | None | ❌ Not AI-citable |

---

## Success Criteria

| Metric | Target |
|--------|--------|
| Lighthouse SEO Score | ≥ 95 |
| Lighthouse Performance | ≥ 90 |
| LCP | < 2.5s |
| INP | < 200ms |
| CLS | < 0.1 |
| All meta tags present | ✅ |
| Schema validation | ✅ No errors |
| AI Citation Readiness | ✅ GEO checklist complete |

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Vite + React | Current stack (CSR) |
| react-helmet-async | Dynamic meta tags |
| JSON-LD | Schema markup |
| vite-plugin-sitemap | Sitemap generation |

---

## File Structure (Changes)

```
/
├── public/
│   ├── robots.txt          [NEW]
│   ├── sitemap.xml         [NEW]
│   └── favicon.ico         [VERIFY]
├── src/
│   ├── components/
│   │   └── SEO.tsx         [NEW] - Reusable SEO component
│   ├── data/
│   │   └── seo-config.ts   [NEW] - Centralized SEO data
│   └── main.tsx            [MODIFY] - Add HelmetProvider
├── index.html              [MODIFY] - Base SEO tags
└── vite.config.ts          [MODIFY] - Sitemap plugin
```

---

## Task Breakdown

### Phase 1: Technical SEO Foundation

#### Task 1.1: Create `robots.txt`
| Field | Value |
|-------|-------|
| **Agent** | `seo-specialist` |
| **Priority** | P0 |
| **Dependencies** | None |
| **INPUT** | None |
| **OUTPUT** | `public/robots.txt` with crawler rules |
| **VERIFY** | File accessible at `/robots.txt` |

```
Content:
- Allow all search engine bots
- Allow AI crawlers (GPTBot, PerplexityBot) for GEO
- Reference sitemap location
```

---

#### Task 1.2: Create `sitemap.xml`
| Field | Value |
|-------|-------|
| **Agent** | `seo-specialist` |
| **Priority** | P0 |
| **Dependencies** | None |
| **INPUT** | Page routes |
| **OUTPUT** | `public/sitemap.xml` |
| **VERIFY** | Valid XML, accessible at `/sitemap.xml` |

---

#### Task 1.3: Update `index.html` with Base SEO
| Field | Value |
|-------|-------|
| **Agent** | `seo-specialist` |
| **Priority** | P0 |
| **Dependencies** | None |
| **INPUT** | Current `index.html` |
| **OUTPUT** | Enhanced with meta description, OG tags, canonical |
| **VERIFY** | Facebook Debugger and Twitter Card Validator pass |

**Required Tags:**
- `<meta name="description" content="...">`
- `<link rel="canonical" href="https://curi.ai/">`
- `<meta property="og:title" content="...">`
- `<meta property="og:description" content="...">`
- `<meta property="og:image" content="...">`
- `<meta property="og:url" content="...">`
- `<meta name="twitter:card" content="summary_large_image">`

---

### Phase 2: Schema Markup Implementation

#### Task 2.1: Create SEO Component with JSON-LD
| Field | Value |
|-------|-------|
| **Agent** | `seo-specialist` |
| **Priority** | P1 |
| **Dependencies** | Task 1.3 |
| **INPUT** | SEO config data |
| **OUTPUT** | `src/components/SEO.tsx` |
| **VERIFY** | Schema validated via Google Rich Results Test |

**Schema Types to Implement:**
- `Organization` - Company info
- `WebSite` - Site-level data
- `WebPage` - Per-page data
- `FAQPage` - If FAQ section exists
- `SoftwareApplication` - For the Curi product

---

#### Task 2.2: Create Centralized SEO Config
| Field | Value |
|-------|-------|
| **Agent** | `seo-specialist` |
| **Priority** | P1 |
| **Dependencies** | None |
| **INPUT** | Brand guidelines |
| **OUTPUT** | `src/data/seo-config.ts` |
| **VERIFY** | TypeScript compiles without errors |

---

### Phase 3: Performance Optimization (Core Web Vitals)

#### Task 3.1: Run Lighthouse Audit
| Field | Value |
|-------|-------|
| **Agent** | `performance-optimizer` |
| **Priority** | P1 |
| **Dependencies** | Task 1.3 |
| **INPUT** | Running dev server |
| **OUTPUT** | Lighthouse report with scores |
| **VERIFY** | SEO ≥ 90, Performance ≥ 80 |

---

#### Task 3.2: Optimize LCP (Largest Contentful Paint)
| Field | Value |
|-------|-------|
| **Agent** | `performance-optimizer` |
| **Priority** | P2 |
| **Dependencies** | Task 3.1 |
| **INPUT** | Lighthouse report |
| **OUTPUT** | Optimized hero images, preloading |
| **VERIFY** | LCP < 2.5s |

**Actions:**
- Preload critical fonts
- Optimize hero images (WebP/AVIF)
- Add `fetchpriority="high"` to LCP element

---

#### Task 3.3: Optimize CLS (Cumulative Layout Shift)
| Field | Value |
|-------|-------|
| **Agent** | `performance-optimizer` |
| **Priority** | P2 |
| **Dependencies** | Task 3.1 |
| **INPUT** | Lighthouse report |
| **OUTPUT** | Reserved dimensions for images, fonts |
| **VERIFY** | CLS < 0.1 |

---

### Phase 4: GEO (AI Citation Readiness)

#### Task 4.1: Add Last Updated Timestamp
| Field | Value |
|-------|-------|
| **Agent** | `seo-specialist` |
| **Priority** | P2 |
| **Dependencies** | Task 2.1 |
| **INPUT** | Page component |
| **OUTPUT** | Visible "Last updated" date |
| **VERIFY** | Date visible, schema includes dateModified |

---

#### Task 4.2: Add FAQ Section with Schema
| Field | Value |
|-------|-------|
| **Agent** | `seo-specialist` |
| **Priority** | P2 |
| **Dependencies** | Task 2.1 |
| **INPUT** | Content team FAQ content |
| **OUTPUT** | FAQ component with FAQPage schema |
| **VERIFY** | Schema validates in Rich Results Test |

---

#### Task 4.3: Configure AI Bot Access
| Field | Value |
|-------|-------|
| **Agent** | `seo-specialist` |
| **Priority** | P1 |
| **Dependencies** | Task 1.1 |
| **INPUT** | robots.txt |
| **OUTPUT** | AI crawler permissions configured |
| **VERIFY** | GPTBot, PerplexityBot allowed |

---

## Phase X: Final Verification

### Automated Checks

```bash
# Run all verification scripts
npm run build  # Ensure no build errors

# Lighthouse audit (requires running server)
python .agent/skills/performance-profiling/scripts/lighthouse_audit.py http://localhost:5173

# Security scan
python .agent/skills/vulnerability-scanner/scripts/security_scan.py .
```

### Manual Checklist

- [ ] Meta description ≤ 160 characters
- [ ] Title tag ≤ 60 characters
- [ ] OG image dimensions 1200x630px
- [ ] robots.txt accessible at `/robots.txt`
- [ ] sitemap.xml accessible at `/sitemap.xml`
- [ ] Schema validated at schema.org validator
- [ ] No console errors
- [ ] Mobile-friendly (Responsive test)
- [ ] WCAG AA contrast ratios met

### External Tool Validation

| Tool | Purpose | URL |
|------|---------|-----|
| Google Rich Results Test | Schema validation | [link](https://search.google.com/test/rich-results) |
| Facebook Sharing Debugger | OG tags | [link](https://developers.facebook.com/tools/debug/) |
| Twitter Card Validator | Twitter cards | [link](https://cards-dev.twitter.com/validator) |
| PageSpeed Insights | Core Web Vitals | [link](https://pagespeed.web.dev/) |

---

## Questions for Pete (SEO Guidance Needed)

> [!IMPORTANT]
> The following items require business/content decisions before implementation:

1. **Target Keywords:** What are the primary keywords Curi wants to rank for?
   - Examples: "AI coaching platform", "leadership coaching software", "enterprise coaching tool"

2. **Meta Description Copy:** Should this be written by marketing or can we draft it?

3. **OG Image:** Do we have an approved social sharing image (1200x630px)?

4. **FAQ Content:** Does the content team have FAQs ready, or should we defer Task 4.2?

5. **AI Bot Policy:** Should we allow all AI crawlers (for GEO) or restrict any?
   - `GPTBot` (OpenAI/ChatGPT)
   - `PerplexityBot` (Perplexity)
   - `Claude-Web` (Anthropic)

6. **Canonical URL:** What is the canonical domain? `https://curi.ai/` or `https://www.curi.ai/`?

---

## Timeline Estimate

| Phase | Estimated Duration |
|-------|-------------------|
| Phase 1: Technical SEO | 2-3 hours |
| Phase 2: Schema Markup | 2-3 hours |
| Phase 3: Performance | 3-4 hours |
| Phase 4: GEO | 1-2 hours |
| Phase X: Verification | 1 hour |
| **Total** | **9-13 hours** |

---

## Next Steps

1. ✅ Review this plan
2. 🔲 Pete provides answers to "Questions for Pete" section
3. 🔲 Run `/create` to begin implementation
