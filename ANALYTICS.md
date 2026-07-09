# ANALYTICS.md — Measurement Reference

> Companion to `STRATEGY.md` §3.1. This file is the **inventory of every analytics
> event the code emits**, the GTM/GA4 admin configuration those events depend on,
> and the UTM taxonomy for sharing links. Update the inventory whenever an event
> is added, renamed, or retired — the code (`src/lib/gtm.ts` callers) and this
> table must agree.
>
> Architecture: GTM (`GTM-TGGFXCRN`, loaded in `src/app/layout.tsx`) receives
> `dataLayer` pushes from components via `pushGtmEvent()` / `setGtmState()`
> (`src/lib/gtm.ts`). GA4 lives inside the GTM container. Vercel Analytics +
> SpeedInsights run in parallel for Core Web Vitals and a sanity-check pageview
> count; they are independent of GTM and need no configuration here.

-----

## 1. Event inventory

| Event | Parameters | Fires when | Where |
|---|---|---|---|
| `resume_download` | `click_location` (hero / nav / nav_mobile) | Resume CTA clicked | `hero.tsx`, `nav-bar.tsx` |
| `chat_open` / `chat_close` | `click_location` (hero, CTA only) | Widget toggled or hero CTA | `chat-widget.tsx`, `hero.tsx` |
| `chat_message_sent` | `message_index` (1-based per session), `chat_session_id` | Visitor sends a chat message | `chat-widget.tsx` |
| `chat_capped` | `chat_session_id` | 20-message session cap reached | `chat-widget.tsx` |
| `social_click` | `click_location`, `platform` | Hero LinkedIn CTA | `hero.tsx` |
| `email_click` / `linkedin_click` | `click_location` (contact) | Contact-section card clicked | `contact.tsx` |
| `scroll_depth` | `percent_scrolled` (25/50/75/100) | Scroll milestones, once each | `nav-bar.tsx` |
| `prologue_shown` | — | Orientation overlay appears | `orientation-layer.tsx` |
| `prologue_dismissed` | `seconds_visible` | Overlay dismissed (any path) | `orientation-layer.tsx` |
| `section_view` | `section` (id: hero, doritos-rainbow, …, contact) | Section becomes ≥20% visible, once per page view | `section-view-tracker.tsx` |
| `experience_expand` | `company` | Visitor opens a role in the timeline (not the default-open first entry, not collapses) | `experience.tsx` |
| `story_select` | `story` (title) | How-I-Work story activated (only on change) | `how-i-work.tsx` |
| `gallery_nav` | `project` | **First** manual navigation of a project gallery / Doritos carousel — one per gallery per page view, an "engaged with the evidence" signal, not a per-photo counter | `defining-work.tsx`, `doritos-rainbow.tsx` |
| `theme_toggle` | `theme` (dark / light) | Nav theme switch | `nav-bar.tsx` |
| `credential_click` | `institution` | Outbound education/cert link | `credentials.tsx` |

**dataLayer state (not an event):** `chat_session_id` — pushed on page load and
whenever the server reassigns the id (`setGtmState`, `chat-widget.tsx`). This is
the same UUID the lead-summary email prints as "Session ID", which is the join:
*lead email → GA4 session → source/medium/campaign + everything they did.*

Retired: `contact_cta_click` (CTA removed 2026-07-08 — see STRATEGY.md §1.2).

## 2. GTM / GA4 admin checklist (cannot be configured from this repo)

The code only pushes to `dataLayer`. For each item below, GA4 silently receives
nothing (or hides the data) until it's configured in GTM / GA4 admin:

1. **GTM triggers + tags.** One GA4 event tag per event name above (or a single
   tag with a Custom Event trigger matching the full list via regex). Any event
   without a trigger is dropped.
2. **Forward the parameters.** Each tag must map its event parameters
   (`click_location`, `section`, `company`, `story`, `project`, `theme`,
   `institution`, `platform`, `percent_scrolled`, `seconds_visible`,
   `message_index`, `chat_session_id`) from dataLayer variables of the same name.
3. **Register custom dimensions** (GA4 Admin → Custom definitions), event-scoped,
   for every parameter in item 2 — `chat_session_id` ideally *also* as a
   user-scoped property attached via the GA4 config tag. Unregistered parameters
   are collected but invisible in reports.
4. **Mark key events**: `resume_download`, `email_click`, `chat_message_sent`.
5. **Enhanced measurement**: if "File downloads" is enabled on the GA4 stream, an
   auto `file_download` fires alongside `resume_download` — keep `resume_download`
   as the key event and ignore `file_download`, or turn that toggle off.
6. **Verify with GA4 DebugView** (Tag Assistant preview) after wiring: load the
   site, dismiss the prologue, open a role, send a chat message — each should
   appear with its parameters.

## 3. UTM taxonomy for sharing links

Three parameters, all lowercase, hyphens, one canonical spelling per company
(GA4 treats `PepsiCo` and `pepsico` as different sources forever):

| Parameter | Meaning | Examples |
|---|---|---|
| `utm_source` | who — the company | `pepsico`, `grupo-bimbo` |
| `utm_medium` | where the link lived | `application`, `resume-pdf`, `email`, `linkedin-dm` |
| `utm_campaign` | which application — role + month | `marketing-director-2026-07` |

### The `/via/` short-link helper

`src/app/via/[[...slug]]/route.ts` turns clean, application-friendly URLs into
fully tagged visits — segments are `[source, medium?, campaign?]`, medium
defaults to `application`:

- `eduardo.casjor.com/via/pepsico` → source `pepsico`, medium `application`
- `eduardo.casjor.com/via/pepsico/resume-pdf` → medium `resume-pdf`
- `eduardo.casjor.com/via/pepsico/application/marketing-director-2026-07` → full triple

Values are normalized server-side (lowercase, `[a-z0-9-]`), so casing/typos in
shared links can't fragment GA4 sources. `/via/` with no segments redirects home
untagged. Keep a running list of slugs used per application so spellings stay
canonical.

### Reading it in GA4

- Default **Traffic acquisition** report shows *channel groups* — custom mediums
  land in **"Unassigned"**, which is expected, not broken. Switch the primary
  dimension to **Session source/medium** (or add **Session campaign** as
  secondary).
- The working view: **Explore → Free form**, rows = Session source + Session
  medium, values = Sessions, Engaged sessions, Key events; drill a company by
  adding Event name.
- When a lead email arrives, filter an Exploration on its `chat_session_id`
  custom dimension to see that visitor's source and full event trail.
- Expectations: recruiters copy URLs without params, ATS bots pre-crawl links
  (filter on engaged sessions), and a next-day return shows as `direct`. UTMs
  here are best-effort signal, not a turnstile.

## 4. Conventions

- All pushes go through `src/lib/gtm.ts` — no inline `window.dataLayer` access.
- Clickable tracked elements also carry `data-gtm-event` (+ `data-gtm-*` params)
  attributes as self-documenting markers (STRATEGY.md checklist: tracking status
  is always intentional).
- One-shot events (`section_view`, `gallery_nav`, `scroll_depth`, `prologue_*`)
  fire at most once per page view by design — don't "fix" that into repeat
  firing without a reason.
