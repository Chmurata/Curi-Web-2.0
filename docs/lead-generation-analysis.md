# Lead Generation & Capture Solutions Analysis

## Context

Curi's website has evolved through three iterations:
1. **WordPress** (V1)
2. **Webflow** (V2)
3. **React/Vite** (V3 - Current)

Currently using **Kajabi** for lead generation and capture. This document analyzes whether Kajabi remains the right choice for a React-based website and explores alternative solutions.

---

## Current Solution: Kajabi

### What is Kajabi?

Kajabi is an **all-in-one platform** primarily designed for:
- Online course creators
- Coaches and consultants
- Membership site owners
- Digital product sellers

It includes built-in email marketing, landing pages, sales funnels, and payment processing.

### Kajabi + React Integration

#### How It Works

1. **Public API (V1)** - Available on Pro Plan (as of Sept 16, 2025)
   - OAuth 2.0 authentication (client_id + client_secret)
   - `POST /contacts` endpoint for lead capture
   - Access to contacts, products, offers, orders

2. **Webhooks** - For real-time data sync
   - Triggers on form submissions, purchases
   - Requires backend server to receive payloads

3. **Form Embedding** - JavaScript embed code
   - Drop Kajabi forms directly into React pages
   - Limited styling control

4. **Third-Party Bridges** - Zapier, Make.com, SaveMyLeads
   - No-code connections between Kajabi and other tools

---

## Pros & Cons of Kajabi for React Websites

### ✅ Pros

| Advantage | Details |
|-----------|---------|
| **All-in-one ecosystem** | Email marketing, landing pages, payments, courses in one platform |
| **No additional subscriptions** | Reduces tool sprawl if already using Kajabi for other features |
| **Webhook support** | Real-time form submission notifications |
| **Community & templates** | Large ecosystem of course/membership templates |
| **Contact management** | Built-in CRM-like features for leads |

### ❌ Cons

| Disadvantage | Details |
|--------------|---------|
| **API locked behind Pro Plan** | $399/month (as of Sept 2025) - expensive just for API access |
| **Not developer-friendly** | Limited documentation, no official React SDK |
| **No native React integration** | Requires custom API work or iframe embeds |
| **Form styling limitations** | Embedded forms hard to match your design system |
| **Overkill for lead capture only** | If not using courses/memberships, paying for unused features |
| **Vendor lock-in** | Moving contacts to another platform requires migration |
| **No client library** | Must build all API integrations from scratch |
| **Support doesn't help with code** | Explicitly stated - custom coding questions not supported |

### Verdict

> **Kajabi makes sense if you're heavily invested in its course/membership ecosystem.**
> 
> **For a React website focused on lead capture + email marketing, it's likely overkill and creates unnecessary friction.**

---

## Recommended Alternatives for React Websites

### Tier 1: Best for React Integration

These solutions offer the best developer experience with React:

#### 1. **HubSpot** (Recommended for B2B/Enterprise)

| Feature | Details |
|---------|---------|
| **Free CRM tier** | Up to 1,000,000 contacts for free |
| **Extensive API** | CRM, marketing, forms, analytics |
| **React libraries** | `@ez-digital/react-hubspot-hook-form`, native JS API |
| **Form options** | Embed HubSpot forms OR submit custom React forms via API |
| **Pricing** | Free → $45/mo (Starter) → $450/mo (Professional) |

**Integration Example:**
```tsx
// Using react-hook-form with HubSpot API
const onSubmit = async (data) => {
  await fetch('/api/hubspot/contact', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};
```

**Best for:** Companies wanting a full CRM + marketing automation platform with excellent developer support.

---

#### 2. **Mailchimp** (Best for Email-First Approach)

| Feature | Details |
|---------|---------|
| **Simple API** | Focus on audiences and campaigns |
| **React libraries** | `react-mailchimp-subscribe`, `use-mailchimp-form` |
| **JSONP support** | Client-side form submission without CORS issues |
| **Pricing** | Free (500 contacts) → $13/mo (Essentials) → $20/mo (Standard) |

**Integration Example:**
```tsx
import MailchimpSubscribe from "react-mailchimp-subscribe";

<MailchimpSubscribe
  url="https://your-mailchimp-form-url"
  render={({ subscribe, status }) => (
    <CustomForm onSubmit={formData => subscribe(formData)} />
  )}
/>
```

**Best for:** Newsletter signups, simple lead capture, email campaigns.

---

#### 3. **ConvertKit** (Best for Creators)

| Feature | Details |
|---------|---------|
| **Creator-focused** | Built for bloggers, podcasters, content creators |
| **Simple API** | Forms, sequences, broadcasts |
| **Tag-based system** | Powerful segmentation |
| **Pricing** | Free (1,000 subscribers) → $29/mo (Creator) |

**Best for:** Content creators, newsletter-driven businesses.

---

#### 4. **Resend + React Email** (Modern & Developer-First)

| Feature | Details |
|---------|---------|
| **Built for developers** | React-native email templates |
| **Simple API** | Send transactional + marketing emails |
| **Modern DX** | Great TypeScript support |
| **Pricing** | Free (100 emails/day) → $20/mo (Pro) |

**Integration Example:**
```tsx
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'Curi <hello@curiapp.ai>',
  to: lead.email,
  subject: 'Welcome to Curi!',
  react: <WelcomeEmail name={lead.name} />
});
```

**Best for:** Transactional emails, developer teams, custom email templates.

---

### Tier 2: Headless Form Solutions

These are API-first form backends that integrate seamlessly with React:

#### 5. **Formspree**

| Feature | Details |
|---------|---------|
| **Drop-in forms** | Just point your form action to their endpoint |
| **React component** | `@formspree/react` official library |
| **File uploads** | Built-in support |
| **Pricing** | Free (50 submissions/mo) → $10/mo (Starter) |

**Integration Example:**
```tsx
import { useForm, ValidationError } from '@formspree/react';

function ContactForm() {
  const [state, handleSubmit] = useForm("YOUR_FORM_ID");
  
  if (state.succeeded) return <p>Thanks for your submission!</p>;
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" />
      <ValidationError field="email" errors={state.errors} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

#### 6. **Basin**

| Feature | Details |
|---------|---------|
| **Simple form backend** | No server needed |
| **Spam filtering** | Built-in protection |
| **Integrations** | Zapier, webhooks, email notifications |
| **Pricing** | Free (100 submissions/mo) → $8/mo (Basic) |

---

#### 7. **Getform**

| Feature | Details |
|---------|---------|
| **Form backend** | REST API for all frameworks |
| **File storage** | Up to 5GB |
| **Spam protection** | reCAPTCHA, Akismet |
| **Pricing** | Free (50 submissions/mo) → $13/mo (Starter) |

---

### Tier 3: Full Marketing Automation

For sophisticated lead nurturing and scoring:

#### 8. **ActiveCampaign**

| Feature | Details |
|---------|---------|
| **Advanced automation** | Visual workflow builder |
| **CRM included** | Sales + marketing in one |
| **Lead scoring** | Automatic lead qualification |
| **Pricing** | $29/mo (Lite) → $49/mo (Plus) |

---

#### 9. **Brevo (formerly Sendinblue)**

| Feature | Details |
|---------|---------|
| **Transactional + marketing** | Combined email platform |
| **API-first** | Excellent REST API |
| **SMS marketing** | Built-in SMS capabilities |
| **Pricing** | Free (300 emails/day) → $25/mo (Starter) |

---

## Comparison Matrix

| Platform | React DX | API Quality | Free Tier | Best For | Monthly Cost |
|----------|----------|-------------|-----------|----------|--------------|
| **Kajabi** | ⭐⭐ | ⭐⭐⭐ | ❌ | Course creators | $149-$399 |
| **HubSpot** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ (CRM) | B2B, full marketing | Free-$450 |
| **Mailchimp** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ | Email marketing | Free-$20 |
| **ConvertKit** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ | Creators | Free-$29 |
| **Formspree** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ | Simple forms | Free-$10 |
| **Resend** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ | Developer teams | Free-$20 |
| **ActiveCampaign** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ❌ | Automation | $29+ |
| **Brevo** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ | Budget-friendly | Free-$25 |

---

## Recommended Stack for Curi

Based on your React/Vite website and B2B focus, here's my recommended approach:

### Option A: HubSpot (Recommended)

```
React Website → Custom Forms → HubSpot API → CRM + Email Automation
```

**Why:**
- Free CRM tier handles unlimited contacts
- Best-in-class API documentation
- Native form integration options
- Scales with your business
- Industry standard for B2B

**Implementation:**
1. Create free HubSpot account
2. Use their Forms API or embed forms
3. Build custom React forms that submit to HubSpot
4. Set up automated email sequences

---

### Option B: Formspree + Mailchimp (Simple & Affordable)

```
React Website → Formspree (@formspree/react) → Webhook → Mailchimp
```

**Why:**
- Minimal setup
- Beautiful React component
- Affordable for startups
- Proven reliability

---

### Option C: Keep Kajabi (If Heavy User)

```
React Website → Custom Forms → Backend API → Kajabi API → Kajabi CRM
```

**Only if:**
- Already paying for Kajabi Pro Plan
- Using courses/memberships extensively
- Don't want to migrate existing data

---

## Migration Checklist (If Switching from Kajabi)

- [ ] Export all contacts from Kajabi
- [ ] Map custom fields to new platform
- [ ] Set up new email sequences
- [ ] Update form endpoints on website
- [ ] Test lead capture flow end-to-end
- [ ] Configure webhooks/integrations
- [ ] Update tracking/analytics
- [ ] Notify team of new workflow

---

## Conclusion

**For a modern React website focused on lead generation:**

1. **If you need full CRM + marketing automation** → **HubSpot** (Free tier is generous)
2. **If you need simple email signups** → **Mailchimp** or **Formspree**
3. **If you're developer-focused** → **Resend + React Email**
4. **If you're a content creator** → **ConvertKit**

**Kajabi** is excellent for course creators and membership sites but introduces unnecessary complexity and cost for a React-based marketing website primarily focused on lead capture.

---

*Document created: January 18, 2026*
*Author: AI Assistant*
