# Kajabi Lead Capture Integration Plan

## Overview
This plan outlines the strategies to integrate your current React application with your existing Kajabi platform specifically for **Lead Capture** (Waitlist/Signup).

## Integration Strategies

You currently use a custom `LoginModal` in the React app. We have three primary ways to connect this to Kajabi.

### Option A: The "Link Out" (Simplest)
Instead of opening a modal on your site, the "Join Waitlist" button redirects the user directly to your existing Kajabi Landing Page URL.

*   **Pros:** 
    *   Zero development work.
    *   Uses your proven Kajabi page logic exactly as is.
*   **Cons:** 
    *   User leaves your new premium site.
    *   Experience feels slightly disjointed (jumping between designs).

### Option B: The "Embedded" Form (Reliable)
We replace the input fields inside your current `LoginModal` with a standard **Kajabi Form Embed Code**.

*   **Pros:** 
    *   User stays on your site.
    *   Data submission is handled directly by Kajabi script.
*   **Cons:** 
    *   **Design Mismatch:** Hard to style the embedded form to match the premium "Glassmorphism" look of the current React site.
    *   Limited control over validation and error messages.

### Option C: Custom Form + Webhook/Zapier (Recommended)
We keep the current, beautiful `LoginModal` (React controlled). When the user clicks "Join", we send the data (Name, Email) to a middleware service which then adds them to Kajabi.

*   **Workflow:**
    1.  User enters email in React Modal.
    2.  React sends data to **Zapier** (via Webhook) or **Make.com**.
    3.  Zapier/Make pushes the contact into **Kajabi** (and tags them as "Waitlist").
    4.  React shows a custom "Success" animation.
*   **Pros:** 
    *   **Premium UX:** Maintains the high-quality design of your new site.
    *   **Seamless:** No page reloads or redirects.
    *   **Flexible:** Can trigger other actions (e.g., Slack notification, custom email) easily.
*   **Cons:** 
    *   Requires a Zapier/Make account (Free tier often suffices for low volume).

## Recommended Action: Option C
Since you have invested in a high-end UI design ("Nano Capsule", "Glassmorphism"), **Option C** is the best choice to maintain that brand standard.

### Execution Steps for Option C:
1.  **Refine `LoginModal.tsx`**:
    *   Rename to `WaitlistModal`.
    *   Remove "Password" field (if this is for new leads).
    *   Add "Name" field (optional but recommended).
    *   Update Copy: "Curi Login" -> "Join the Waitlist".
2.  **Setup Backend/Middleware**:
    *   Create a "Catch Hook" in Zapier.
    *   Update the React `handleSubmit` function to `POST` JSON data to that Webhook URL.
3.  **Connect Kajabi**:
    *   In Zapier, add an action: *Kajabi > Create Process_Form_Submission*.
