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
nothing (or hides the data) until it's configured. Do the steps in this order —
later steps depend on earlier ones.

### 2.1 GTM (tagmanager.google.com → GTM-TGGFXCRN)

**a. Data Layer Variables** — create 12, type "Data Layer Variable" (version 2),
named `DLV - <param>`, one per parameter:

`click_location` · `platform` · `percent_scrolled` · `seconds_visible` ·
`section` · `company` · `story` · `project` · `theme` · `institution` ·
`message_index` · `chat_session_id`

**b. One trigger** — type "Custom Event", check **"Use regex matching"**,
event name:

```
^(resume_download|chat_open|chat_close|chat_message_sent|chat_capped|social_click|email_click|linkedin_click|scroll_depth|prologue_shown|prologue_dismissed|section_view|experience_expand|story_select|gallery_nav|theme_toggle|credential_click)$
```

One regex trigger beats 17 separate triggers: adding an event later means
editing one string (and the §1 inventory).

**c. Tag "GA4 - All Custom Events"** — type "Google Analytics: GA4 Event":
- Event Name: `{{Event}}` (built-in variable — passes each dataLayer event
  name through as-is)
- Event Parameters: map all 12 — parameter name = plain name (`section`,
  `company`, …), value = matching `{{DLV - …}}`. GTM drops parameters whose
  value is undefined on a given event, so one tag safely serves all 17 events.
- Trigger: the regex trigger from (b).

**d. Existing GA4 Configuration / Google tag** (fires on Initialization – All
Pages): under **User Properties**, add `chat_session_id` = `{{DLV -
chat_session_id}}`. The code pushes it as persistent dataLayer state before
events fire, so every hit carries it user-scoped — this is what makes
"lead email → GA session" lookups work.

**e. Publish the container.** Preview-mode testing does not ship anything.

### 2.2 GA4 Admin (analytics.google.com → Admin)

**a. Custom dimensions** (Custom definitions → Create custom dimension,
event-scoped) — until registered, GA4 collects these but hides them from
every report:

| Dimension name | Event parameter |
|---|---|
| Click location | `click_location` |
| Platform | `platform` |
| Percent scrolled | `percent_scrolled` |
| Section | `section` |
| Company | `company` |
| Story | `story` |
| Project | `project` |
| Theme | `theme` |
| Institution | `institution` |
| Message index | `message_index` |
| Chat session ID | `chat_session_id` |

Plus **one user-scoped dimension**: "Chat session ID (user)" → user property
`chat_session_id`.

**b. Custom metric, not dimension**: "Seconds visible" → parameter
`seconds_visible`, unit Standard. It's continuous — as a metric you get
averages ("mean time on prologue"); as a dimension it fragments into hundreds
of one-off values.

**c. Key events** (Admin → Events → "Mark as key event"): `resume_download`,
`email_click`, `chat_message_sent`. Event names appear in that list within
~24h of first being received — toggle them then.

**d. Data retention** (Admin → Data settings → Data retention): set **event
data retention to 14 months**. The default is **2 months**, after which
event-level data silently ages out of Explorations. Not retroactive — do it
before the data you care about exists.

**e. Enhanced measurement** (Admin → Data streams → stream → gear icon):
- **File downloads: OFF** — otherwise every resume click double-counts as an
  auto `file_download` next to `resume_download`. (Or leave on and ignore
  `file_download`; off is cleaner.)
- **Scrolls: OFF** — GA4's auto event only fires at 90%; the site's
  `scroll_depth` (25/50/75/100) supersedes it.
- Outbound clicks, page views: ON (default) — harmless, complementary.

**f. Internal traffic filter**: Data streams → stream → Configure tag
settings → Define internal traffic → add Eddie's IP(s); then Admin → Data
filters → set the Internal Traffic filter to **Active**. Without it, Eddie's
own sessions pollute exactly the source/medium data the UTM scheme exists for.

### 2.3 Verify (after publishing the GTM container)

1. GTM → **Preview** (Tag Assistant) → load the site. Walk the page: dismiss
   the prologue, scroll to the footer, open a role, click a story, arrow a
   gallery, toggle theme, send a chat message.
2. GA4 → **DebugView**: confirm each event arrives **with its parameters** —
   click an event and check the parameter panel shows `section`, `company`,
   etc. A missing parameter = a DLV name typo in the tag mapping.
3. Realtime shows the same events within seconds. Standard reports and custom
   dimensions populate in 24–48h — empty custom-dimension reports on day one
   are lag, not loss.

### 2.4 Timing dependencies (why pickers look empty)

GA4's UI pickers (funnel step conditions, key-event list, dimension pickers in
Explorations) only offer **event names and dimension values the property has
actually received**. A custom event that has never fired on the deployed
production site — because the code is still on a preview branch, or the GTM
container isn't published — will not appear anywhere in GA4's admin or Explore
UI. Order of operations: merge/deploy the code → publish the GTM container →
visit the production site once and trigger each interaction → wait ~24h →
then build funnels, register key events, and expect pickers to be populated.

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
