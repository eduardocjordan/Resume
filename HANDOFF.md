# Chatbot feature — handoff

Branch: `claude/awesome-cori-i7akex` (pushed, 3 commits ahead of `main`, working tree clean as of this doc).
Repo: `eduardocjordan/resume`. Owner: Eduardo Castro ("Eddie"), non-technical, no terminal/CLI, browser-only.

## What this is

A Claude-powered chat widget on Eddie's personal site that pre-screens visitors: answers questions using only a markdown knowledge base (no vector DB, no freeform generation beyond that grounding), never discloses his target salary number under any framing, and emails Eddie a summary once a conversation goes idle. Built from two planning docs (`chatbotprojectplan.md`, `agentkickoffbriefs.md` — not in the repo, were pasted into the originating chat session).

## Non-negotiable rules (do not relax these without Eddie explicitly asking)

1. API keys/secrets: env vars only, server-side only. Never in client code, never logged.
2. Salary guardrail never states a number — not hypothetically, not under pressure, not via any phrasing trick.
3. No vector DB / embeddings. Knowledge base is markdown stuffed into the system prompt verbatim. Deliberate, not a shortcut.
4. Per-session message cap (default 20, `CHAT_MESSAGE_CAP` env var) blocks the LLM call *before* it happens and returns a canned dead-end reply. Don't remove it or silently raise it.
5. The chat widget rides on the site's existing loader/privacy gating — no second gate.
6. Zero terminal/CLI in anything written for Eddie. Every instruction must be GitHub-web-UI or Vercel-dashboard clickable.

## Architecture

```
src/components/chat-widget.tsx   client FAB + panel, localStorage session id, GTM events
src/app/page.tsx                 renders <ChatWidget /> after <Footer />
src/components/loader.tsx        dispatches "site:loader-complete" CustomEvent when intro animation ends

src/app/api/chat/route.ts        POST handler: cap check → spend-ceiling check → log msg →
                                  call Claude (cached system prompt) → log reply →
                                  best-effort opportunistic finalization sweep (limit 1)
src/app/api/cron/finalize-sessions/route.ts   Vercel cron target, checks Authorization: Bearer
                                  CRON_SECRET, runs finalization sweep (limit 50)

src/lib/knowledge.ts             reads+caches data/knowledge/*.md into one string
src/lib/systemPrompt.ts          buildSystemPrompt() — knowledge block has cache_control:
                                  ephemeral; salary guardrail text built from TARGET_COMP_* env
                                  (falls back to "never judge, just acknowledge" if unset);
                                  prompt-injection hardening instructions
src/lib/sessionGuard.ts          message cap + daily spend ceiling logic, DEAD_END_MESSAGE /
                                  UNAVAILABLE_MESSAGE constants — cap must never be removed
src/lib/db.ts                    Supabase client + all DB access (sessions, messages, summaries,
                                  daily usage). Uses service_role key, server-side only.
src/lib/insights.ts              generateSessionSummary() — forced tool-use call to Claude that
                                  extracts only explicitly-volunteered info; finalizeSession();
                                  runFinalizationSweep({limit, excludeSessionId?})
src/lib/email.ts                 Resend wrapper, sendSessionSummaryEmail()
src/lib/anthropic.ts             Anthropic client singleton
src/lib/constants.ts             CHAT_MODEL = "claude-haiku-4-5-20251001", SESSION_IDLE_MINUTES = 20

data/knowledge/*.md              bio.md, resume.md, projects.md, faq.md — derived from
                                  src/lib/data.ts, no fabricated content; faq.md explicitly
                                  declines on unconfirmed items (work auth, relocation, etc.)
supabase/schema.sql               chat_sessions, chat_messages, chat_session_summaries,
                                  chat_daily_usage + indexes. RLS enabled, zero policies
                                  (service_role bypasses RLS; this just blocks the anon key,
                                  which the app never uses).
vercel.json                       declarative daily cron → /api/cron/finalize-sessions
.env.local.example                 every required env var, documented
DEPLOY-GUIDE.md                    Eddie-facing, browser-only deploy walkthrough
```

### Data flow per chat turn
1. Browser POSTs `{sessionId, message}` to `/api/chat`.
2. Route ensures session row exists, checks message cap and daily spend ceiling *before* calling Claude.
3. Logs user message, loads full transcript, calls Claude with system = [voice/scope/injection-hardening text, knowledge markdown block (cached)].
4. Logs assistant reply, returns it.
5. Fire-and-forget: runs `runFinalizationSweep({limit: 1, excludeSessionId})` — finds idle (>20min, per `SESSION_IDLE_MINUTES`) unfinalized sessions *other than this one*, summarizes each via forced tool-use, emails Eddie via Resend, marks finalized. Wrapped in try/catch — can never break the user's reply.
6. The daily Vercel cron (`vercel.json`, 09:00 UTC) calls the same sweep with `limit: 50` as the guaranteed backstop for idle periods with no chat traffic at all.

## Key decisions made (deviations/resolutions from the original plan)

- **Supabase, not Neon.** Plan left this open. Picked Supabase for its web SQL editor/table browser — matters a lot since Eddie has no terminal.
- **Hosting: GitHub Pages → Vercel.** Static export (`output: "export"`) can't run API routes, so it was removed from `next.config.mjs`. The old `.github/workflows/deploy.yml` and a stale `CNAME` file (pointed at `edu.casjor.com`, a typo — real domain is `eduardo.casjor.com`) were deleted. Migration is staged: feature branch deploys as a Vercel Preview first, gets verified, then merges to `main` (becomes Vercel Production) before the real domain is cut over. Eddie explicitly rejected a "hybrid split" and rejected leaving the old workflow disabled-but-present — he wants the full move.
- **Cron cadence redesign.** The plan called for a ~10-minute idle-check cron. Vercel Hobby (free) tier only allows cron **once per day**, confirmed via research. Compensated with the opportunistic per-chat sweep (step 5 above) as the "soon after idle" mechanism, with the daily cron as backstop. This is a real deviation from what was "confirmed" in planning — already flagged to Eddie in chat, not hidden.
- **`vercel.json` is auto-detected.** Original deploy-ops brief assumed manual dashboard cron setup; corrected — Vercel reads `vercel.json`'s `crons` array automatically on deploy, dashboard Cron Jobs page is read-only/monitoring.
- **RLS enabled with no policies** on all 4 Supabase tables (added after Eddie hit Supabase's RLS prompt) — zero functional effect since the app only ever uses the service_role key server-side; it's a free safety net against the unused anon key.

## Open items — still need Eddie's input or action

1. **Target compensation range is still unset.** `TARGET_COMP_MIN`/`TARGET_COMP_MAX`/`TARGET_COMP_CURRENCY` env vars are wired up in `systemPrompt.ts` with a safe fallback (bot just never judges a number if unset — doesn't violate the salary guardrail, just less useful). Eddie hasn't supplied real numbers yet. No code change needed once he does — just set the Vercel env vars.
2. **Adversarial prompt-injection testing not yet done.** The original `prompt-safety` brief explicitly calls for trying to talk the bot into a number / into ignoring instructions / into breaking its single-voice register, once the live endpoint exists. Blocked on having a real `ANTHROPIC_API_KEY` configured somewhere testable (this sandbox has none). Should happen against the live Vercel preview once env vars are set, or could be done as a manual code-level review of `systemPrompt.ts`'s `INJECTION_HARDENING` block.
3. **Active bug, unresolved as of this doc:** the floating chat icon (bottom-right FAB, opens "Ask about Eduardo") is **not appearing** on Eddie's Vercel preview deployment (`https://resume-gvchatqfd-casjor.vercel.app`). Confirmed that deployment is running the correct commit (`ee15cef`, "Add pre-screening chatbot..."). Details and current debugging state below.

## Active bug: chat icon not rendering on live preview

**Symptom:** Eddie opens the preview URL, site looks normal (Hero, Experience, etc. all render), but the round chat FAB never appears in the bottom-right, even after waiting.

**How the reveal is supposed to work** (`src/components/chat-widget.tsx`):
```ts
const REVEAL_FALLBACK_MS = 8000;
useEffect(() => {
  const reveal = () => setIsRevealed(true);
  window.addEventListener("site:loader-complete", reveal);
  const fallback = window.setTimeout(reveal, REVEAL_FALLBACK_MS);
  return () => { window.removeEventListener("site:loader-complete", reveal); window.clearTimeout(fallback); };
}, []);
if (!isRevealed) return null;
```
`src/components/loader.tsx` dispatches `site:loader-complete` in its GSAP `onComplete` callback, gated behind `document.fonts.ready`. Even if that never fires for some reason, the 8-second fallback timer should force `isRevealed` true regardless — so by code-reading alone, the icon should always show within 8s of load. That it doesn't on the live deployment means either:
- a thrown JS error is breaking hydration of `ChatWidget` (or something it's near) before the timer can fire,
- the deployment/browser is serving a stale cached bundle,
- a CSS/z-index conflict is hiding it (less likely — `position: fixed; z-index: 50` should sit above everything except the now-`display:none` loader at `z-index: 9999`),
- or something specific to that exact deployment/browser not yet identified.

**Ruled out so far:**
- Wrong deployment / stale build: confirmed the preview Eddie tested is built from commit `ee15cef`, which does include `ChatWidget`.
- WebFetch/curl from this sandbox can't load the URL at all — Vercel preview deployments require Vercel-account auth, both attempts got HTTP 403. Cannot inspect the live HTML/console output directly from here.

**Tried and blocked:**
- Attempted to reproduce locally via production build (`npm run build`) + headless Chromium (Playwright) to actually load the page and screenshot/inspect console errors. `npx playwright install chromium --with-deps` failed — this sandbox's network policy returns 403 on the Ubuntu PPAs (`ppa.launchpadcontent.net`) Playwright needs for Chromium's system dependencies. The user also interrupted the `npm run build` call before it completed, so build-success itself wasn't independently reconfirmed in *this* segment (it had passed cleanly in an earlier session segment, before the RLS/deploy-guide commits — those two commits only touched `supabase/schema.sql` and `DEPLOY-GUIDE.md`, not app code, so a build break between then and now is unlikely but not reconfirmed).

**Best next step:** ask Eddie to open the Vercel preview URL, right-click → Inspect (or F12) → Console tab, and report/screenshot anything in red. That's the fastest way to actually see what's failing client-side, since this sandbox can't reach the page itself (auth-walled) and can't spin up a local headless browser (network-policy-blocked). If a console error is reported, trace it back into `chat-widget.tsx` / `loader.tsx` / whatever it names. If there's no console error at all, suspect a CSS stacking/visibility issue instead and have Eddie check computed styles on the button element (if findable in Elements tab) or just try a hard refresh / incognito window to rule out caching.

## Repo/branch state as of this doc

- Branch `claude/awesome-cori-i7akex`, 3 commits ahead of `main`, all pushed to `origin`, working tree clean.
  - `ee15cef` — Add pre-screening chatbot and migrate hosting to Vercel (the full feature)
  - `a454613` — Fix DEPLOY-GUIDE: tell user to switch GitHub branch before opening schema.sql
  - `548eaa4` — Enable Row Level Security on all chatbot tables
- No PR opened yet (not requested by Eddie). Do not merge to `main` until the chat-icon bug above is resolved and Eddie has verified the working flow end-to-end on the preview link, per `DEPLOY-GUIDE.md` step 4 (only then does step 6, the domain cutover, apply).
- `npm install`, `npx tsc --noEmit`, and `npm run build` all passed cleanly the last time they were run in full (earlier in this session, before this doc) — but re-verify build cleanliness in a fresh session since that hasn't been re-confirmed after the two most recent commits (low risk — both were non-code files).

## Environment / accounts (Eddie's side, per DEPLOY-GUIDE.md)

Vercel (hosting, connected via GitHub), Supabase (Postgres — `supabase/schema.sql` already run once, RLS now enabled), Resend (summary emails), Anthropic console (API key, pay-as-you-go). Full env var table with sourcing instructions: `.env.local.example` and `DEPLOY-GUIDE.md` §2. None of these are configured in any sandbox this assistant runs in — Eddie holds all real credentials, set only in Vercel's dashboard.

## Useful context for whoever picks this up

- Eddie has no desktop terminal and limited technical background — keep any new instructions for him GitHub-web-UI / Vercel-dashboard only, plain language, no CLI.
- He responded well to direct, transparent flags of plan deviations (cron cadence, Supabase-vs-Neon) rather than silent adaptation — keep doing that.
- The CLAUDE.md in this repo is a different persona's config (marketing/strategy consulting context, Spanish-default) and largely doesn't apply to this engineering work — it predates this chatbot project and seems to be a leftover/unrelated workspace template. Worth flagging to Eddie at some point but not blocking.
