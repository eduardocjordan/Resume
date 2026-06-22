# REDESIGN.md — Eduardo Castro Portfolio Full Redesign
**Repo:** eduardocjordan/Resume  
**Branch:** dev-test (work here, do not push to main)  
**Read CLAUDE.md before starting.**

---

## HOW TO USE THIS FILE

This brief is structured for sub-agent execution. Spawn parallel sub-agents for Phase 2 — all component tasks are independent and can run simultaneously. Phase 1 must complete before Phase 2 starts. Phase 3 runs after all Phase 2 agents finish.

**Design reference files** (already in /design-handoff/ in the repo):
- `/design-handoff/web.html` — authoritative desktop spec for sections 1–3
- `/design-handoff/mobile.html` — authoritative mobile spec for sections 1–3
- Sections 4–10 are fully specified in this file. No additional design files exist for them.

---

## DESIGN SYSTEM

Use Tailwind semantic tokens throughout. No raw hex in component className strings — use CSS custom properties or Tailwind utilities defined in tailwind.config.ts.

### Color tokens
```
bg-ink          #1a1c1b    dark backgrounds, heavy sections
bg-paper        #f9f9f7    primary light background
bg-paper-dark   #f4f4f2    secondary light background
text-accent     #d4622a    terracotta accent
text-ink        #1a1c1b
text-paper      #f9f9f7
```

### Font tokens (Tailwind fontFamily)
```
font-display    Cormorant Garamond — headlines, titles, italic moments
font-headline   Cormorant Garamond — alias, same as display (backwards compat)
font-body       Plus Jakarta Sans  — body copy, descriptions
font-label      Space Mono         — nav, kickers, tags, metadata, uppercase labels
font-stat       Bebas Neue         — numbers, stats, large figures
font-sans       Plus Jakarta Sans  — default
```

### Section atmospheric sequence
```
01 Orientation   #0a0a0a    — dark, Space Mono, loader callback
02 Hero          #f9f9f7    — warm light, Cormorant at scale
03 Doritos       #d4622a    — accent peak, full orange
04 DefiningWork  #f4f4f2    — paper-dark, editorial
05 Impact        #1a1c1b    — ink dark, authoritative
06 Experience    #f9f9f7    — warm light, archival
07 BrandsGrid    #f9f9f7    — warm light, continuous with Experience
08 HowIWork      #1a1c1b    — ink dark, philosophical
09 Credentials   #f4f4f2    — paper-dark, formal
10 Contact       #1a1c1b    — ink dark, the ask
```

### Shared animation keyframes (add to globals.css if not present)
```css
@keyframes ecBob {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(7px); }
}
@keyframes ecGrain {
  0%   { transform: translate(0,0); }
  20%  { transform: translate(-4%,3%); }
  40%  { transform: translate(3%,-5%); }
  60%  { transform: translate(-3%,4%); }
  80%  { transform: translate(4%,-2%); }
  100% { transform: translate(0,0); }
}
@keyframes ecDrift {
  0%   { transform: translateX(-1.5%); }
  100% { transform: translateX(1.5%); }
}
```

### FadeIn usage
The existing `src/components/fade-in.tsx` wrapper is the standard scroll-reveal mechanism. Use it on content blocks within every section. Stagger sibling elements with delay increments of 0.08s. Use `direction="none"` for elements that should simply fade without movement.

### Accessibility requirements (apply to all sections)
- Minimum 4.5:1 contrast ratio for all text
- All interactive elements: min 44×44px touch target
- All images: descriptive alt text
- `prefers-reduced-motion`: wrap animation-heavy elements in a motion check
- Use semantic HTML (section, h2, p, button, a) — not div soup

---

## TASK GRAPH

```
PHASE 1 — FOUNDATION [SEQUENTIAL — run in order]
  F1: globals.css    keyframes + font rule
  F2: tailwind.config.ts
  F3: data.ts        remove Doritos, renumber projects
  F4: layout.tsx     update Google Fonts import

PHASE 2 — COMPONENTS [PARALLEL — all can run simultaneously after Phase 1]
  S1:  orientation-layer.tsx   NEW
  S2:  hero.tsx                REWRITE
  S3:  doritos-rainbow.tsx     NEW
  S4:  defining-work.tsx       REWRITE
  S5:  impact.tsx              REWRITE
  S6:  experience.tsx          REWRITE
  S7:  brands-grid.tsx         REFINE (keep marquee mechanics)
  S8:  how-i-work.tsx          REWRITE
  S9:  credentials.tsx         REWRITE
  S10: contact.tsx             REWRITE
  S11: chat-widget.tsx         PATCH (add event listener only)

PHASE 3 — INTEGRATION [SEQUENTIAL — after all Phase 2 complete]
  I1: page.tsx   final render order

PHASE 4 — VERIFICATION [SEQUENTIAL]
  V1: next build — zero TypeScript errors
  V2: responsive check — mobile 375px, tablet 768px, desktop 1440px
```

---

## PHASE 1 — FOUNDATION

### F1 — src/app/globals.css

1. Update h1/h2/h3/h4 font rule:
```css
h1, h2, h3, h4 {
  font-family: 'Cormorant Garamond', serif;
}
```

2. Add keyframes ecBob, ecGrain, ecDrift (see Design System above) — keep existing marquee keyframe untouched.

3. No other changes.

---

### F2 — tailwind.config.ts

Replace the fontFamily extend block:
```js
fontFamily: {
  display:  ['Cormorant Garamond', 'serif'],
  headline: ['Cormorant Garamond', 'serif'],  // alias — keep for backwards compat
  body:     ['Plus Jakarta Sans', 'sans-serif'],
  label:    ['Space Mono', 'monospace'],
  stat:     ['Bebas Neue', 'sans-serif'],
  sans:     ['Plus Jakarta Sans', 'sans-serif'],
},
```

No other changes to tailwind.config.ts.

---

### F3 — src/lib/data.ts

Remove the Doritos Rainbow entry from the projects array. It becomes a standalone section.

Renumber remaining projects index strings sequentially:
```
"01" — ERG Leadership & Inclusion
"02" — Neutrogena Sun Care Launch
"03" — Brand Built from Zero
```

No other changes to data.ts.

---

### F4 — src/app/layout.tsx

Replace the Google Fonts href with:
```
https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap
```

Remove Newsreader. Keep Material Symbols Outlined link unchanged. No other changes.

---

## PHASE 2 — COMPONENT SPECIFICATIONS

---

### S1 — src/components/orientation-layer.tsx [NEW]

**Reference:** /design-handoff/web.html (section "01 Orientation") and /design-handoff/mobile.html (Frame 1)
**Atmosphere:** #0a0a0a, Space Mono, dark loader callback

Implement exactly as specified in /design-handoff/web.html for desktop and /design-handoff/mobile.html for mobile. Key points not to miss:

- Height 75vh desktop, so top of hero is visible below fold — creates pull to scroll
- The #ff4d00 color (loader orange) is intentional — it echoes the loader's visual language
- Grain texture overlay uses ecGrain animation
- "↓ Start" button smoothly scrolls to #hero on click
- FadeIn on the centered content block (direction "none", delay 0.3)
- No id, not a nav section — the NavBar IntersectionObserver must NOT trigger from this section

---

### S2 — src/components/hero.tsx [REWRITE]

**Reference:** /design-handoff/web.html (section "02 Hero") and /design-handoff/mobile.html (Frame 2)
**Atmosphere:** #f9f9f7, Cormorant Garamond at scale

Implement exactly as specified in /design-handoff/web.html for desktop and /design-handoff/mobile.html for mobile. Key points:

- Keep id="hero" — NavBar IntersectionObserver depends on it
- Keep all GTM data-gtm-event attributes and dataLayer pushes — do not remove any
- Keep useScroll / h1Opacity / h1Scale motion values on the h1
- LinkedIn: text link only — NOT a button, NOT outlined. Small, Space Mono, demoted
- "Talk to My Second Brain" button: on click, dispatch `window.dispatchEvent(new CustomEvent('chat:open'))`
  Add GTM: `data-gtm-event="chat_open"` `data-gtm-location="hero"` and corresponding dataLayer push
- Stats on mobile: horizontal swipeable carousel with scroll-snap (see mobile reference)

---

### S3 — src/components/doritos-rainbow.tsx [NEW]

**Reference:** /design-handoff/web.html (section "03 Doritos Rainbow") and /design-handoff/mobile.html (Frame 3)
**Atmosphere:** #d4622a, Cormorant italic, accent peak

Implement exactly as specified in design-handoff files. Key points:

- "Ink on accent" color treatment: ink text (#1a1c1b) on terracotta (#d4622a) background
- Use actual image: src="/assets/20160812_102324-1.jpeg" — not the placeholder hatching from Design
- "2016" background element uses ecDrift animation
- Bottom transition bar links visually into DefiningWork
- FadeIn on text column and photo column (delay 0.2 on photo)
- Photo card: transform rotate(-2.2deg) on wrapper

---

### S4 — src/components/defining-work.tsx [REWRITE]

**Atmosphere:** bg-paper-dark (#f4f4f2)  
**Layout:** Full-width alternating stack — one project per row, text/image sides flip

#### Desktop layout

Section header row (min-height 30vh, display flex, align-items flex-end, padding bottom 48px):
```
Space Mono kicker:   "Selected Projects · 01–03"
                     11px, letter-spacing 0.3em, uppercase, text-accent, margin-bottom 16px
Headline:            "Defining Work"
                     font-display, clamp(3.5rem,8vw,8rem), text-ink, line-height 0.9
```

Each project row (loop through `projects` from data.ts — now 3 items):
```
min-height: 80vh
display: grid
grid-template-columns: 1fr 1fr
border-bottom: 1px solid rgba(26,28,27,0.08)

Odd index (0, 2): text LEFT, image RIGHT
Even index (1):   image LEFT, text RIGHT
```

Text column:
```
position: relative
padding: clamp(48px,7vw,96px)
display: flex, flex-direction: column, justify-content: center
overflow: hidden

Ghost index number (position absolute, pointer-events none):
  font-stat, 200px, line-height 1, color rgba(26,28,27,0.05)
  bottom: -20px (or visually behind content)

Company kicker:
  font-label, 11px, letter-spacing 0.3em, uppercase, text-accent
  margin-bottom 16px

Title:
  font-display, italic, clamp(2.5rem,5vw,4.5rem), text-ink, line-height 1.0
  margin-bottom 20px

Description:
  font-body, 16px, line-height 1.7, color rgba(26,28,27,0.72)
  max-width 520px

Metrics:
  margin-top 28px, padding-top 20px
  border-top: 1px solid rgba(26,28,27,0.15)
  font-label, 11px, letter-spacing 0.08em, color rgba(26,28,27,0.55)

Wrap entire text column content in FadeIn (direction "left" for left column, "none" for right, delay i*0.08)
```

Image column:
```
position: relative, overflow: hidden
Next.js Image: fill, object-fit cover, object-position center
On hover: scale 1.04, transition 0.7s
```

#### Mobile layout (<md)

Stack vertically — no carousel. Each project:
```
flex-direction: column
Image: aspect-ratio 4/3, width 100%, above text block
Text block: padding 32px 28px
Ghost index: 120px font-stat, color rgba(26,28,27,0.05)
Company/title/description/metrics: same as desktop, full-width
```

---

### S5 — src/components/impact.tsx [REWRITE]

**Atmosphere:** bg-ink (#1a1c1b)  
**Height:** min-h-dvh  
**Layout:** section header + 3×2 stat grid (desktop)

#### Section header (keep existing copy, upgrade typography)
```
Space Mono kicker:  "05 / Impact"
                    11px, letter-spacing 0.3em, uppercase, text-accent, margin-bottom 16px

"Results that":     font-display, clamp(3rem,6vw,6rem), color #f9f9f7, line-height 1.0

"hold up.":         font-display, italic, same size, text-accent

Subtext:            keep existing paragraph text
                    font-body, 20px, font-weight 300, color rgba(241,239,233,0.65)
                    max-width 480px
```

#### Stat grid (desktop 3×2 — remove current card backgrounds)

Replace current card-with-background approach with borderless floating stats:

Each stat block:
```
border-left: 3px solid rgba(212,98,42,0.4)
padding-left: 28px
padding-top: 8px, padding-bottom: 8px

Company label (above number):
  font-label, 10px, letter-spacing 0.26em, uppercase
  color rgba(241,239,233,0.4), margin-bottom 8px

Number:
  font-stat, clamp(80px,8vw,110px), line-height 0.82, color #f9f9f7
  Suffix (+, %, M): text-accent

Metric label (below number):
  font-body, 13px, font-weight 600, letter-spacing 0.06em, uppercase
  color rgba(241,239,233,0.65), margin-top 10px

On hover:
  border-left-color: #d4622a (full accent)
  transition: 0.3s
  Wrap in motion.div whileHover for consistency with existing pattern
```

FadeIn on each stat block with stagger (delay i*0.07)

#### Mobile

Keep existing 2-per-page swipeable carousel pattern. Update typography to match above spec.

---

### S6 — src/components/experience.tsx [REWRITE]

**Atmosphere:** bg-paper (#f9f9f7)  
**Height:** min-h-dvh  
**Layout:** editorial timeline with accordion — keep accordion logic, redesign visuals

#### Section header
```
Space Mono kicker:  "06 / Career"
                    11px, letter-spacing 0.3em, uppercase, text-accent, margin-bottom 16px

Headline:           "Where I've" + italic "worked."
                    font-display, clamp(3rem,7vw,7rem), text-ink
                    "worked." has font-style: italic

Subtext:            keep existing paragraph text, font-body, rgba(26,28,27,0.7)
```

#### Timeline entry redesign

Timeline dot:
```
width: 10px, height: 10px, border-radius: 9999px
background: #d4622a
border: 3px solid #f9f9f7
box-shadow: 0 0 0 1px #d4622a
```

Timeline line: 2px solid rgba(26,28,27,0.1) (slightly more visible than current)

Each entry — closed state typography:
```
Date:     font-label, 10px, letter-spacing 0.2em, uppercase, color rgba(26,28,27,0.45)
Company:  font-display, clamp(1.4rem,2.5vw,2rem), text-ink, font-weight 600
Title:    font-body, 14px, color rgba(26,28,27,0.6), margin-top 4px
```

Each entry — expanded state typography:
```
Description:  font-body, 15px, line-height 1.7, color rgba(26,28,27,0.75)
Bullets:      keep accent dot, font-body, 14px
Bold labels:  font-weight 600, color text-ink
Tags:         font-label, 10px, letter-spacing 0.12em, uppercase
              border: 1px solid rgba(26,28,27,0.2), padding: 5px 12px, border-radius: 2px
```

Keep all existing Framer Motion AnimatePresence accordion animation on expand/collapse.  
Keep all existing logo assets and logoText fallback logic.

#### Mobile

Keep existing layout — accordion works well on mobile. Apply typography updates only.

---

### S7 — src/components/brands-grid.tsx [REFINE — keep marquee mechanics]

**Atmosphere:** bg-paper (#f9f9f7)  
**Marquee logic:** do not change the existing RAF-based animation or drag behavior

#### Section header redesign only
```
Space Mono kicker:  "12+ brands · across FMCG & CPG"
                    11px, letter-spacing 0.3em, uppercase, text-accent, margin-bottom 16px

Headline:           "Brands I've helped grow"
                    font-display, italic, clamp(3rem,6vw,6rem), text-ink, line-height 0.95
```

#### Marquee visual refinements
```
Brand card hover overlay text: change from current font to font-display italic
  — the brand name on hover reads in Cormorant Garamond italic, white, 16px

Marquee row background: add a subtle bg-paper-dark (#f4f4f2) strip behind each row
  — gives the logos a slightly elevated feel vs the section background
```

**Do not change:** MarqueeRow component logic, RAF animation, drag behavior, brand data,
logo file references, or any animation timing.

---

### S8 — src/components/how-i-work.tsx [REWRITE]

**Atmosphere:** bg-ink (#1a1c1b)  
**Height:** min-h-dvh  
**Layout:** section header + 2×2 story grid + blockquote

#### Section header
```
Space Mono kicker:  "08 / Method"
                    11px, letter-spacing 0.3em, uppercase, text-accent

Headline:           "How I Work"
                    font-display, italic, clamp(3.5rem,8vw,9rem), color #f9f9f7, line-height 0.9

Divider:            keep existing 1px border below header
```

#### 4 story cards redesign (2×2 grid desktop)

Remove current card backgrounds (bg-paper/5) and card borders. Stories float against the dark background with minimal separation:

Each story:
```
border-top: 1px solid rgba(241,239,233,0.1) — top rule separating cards
padding-top: 32px

Ghost number (position: relative, before title):
  font-stat, 100px, line-height 0.8
  color rgba(212,98,42,0.12) — very subtle orange ghost
  display: block, margin-bottom: -16px (pulls title up over it slightly)

Title:
  font-display, italic, clamp(1.5rem,2.5vw,2.2rem), color #f9f9f7

Body:
  font-body, 15px, line-height 1.75, color rgba(241,239,233,0.65)
  font-weight 300, margin-top 14px
```

FadeIn on each card with stagger (delay i*0.08)

#### Blockquote redesign
```
border-top: 1px solid rgba(241,239,233,0.15) — keep existing
SVG quote mark: keep, make slightly larger (28px)

Quote text:
  font-display, italic, clamp(2.5rem,5vw,5rem), color rgba(241,239,233,0.95)
  line-height 1.1, max-width 900px
```

#### Mobile

Keep existing horizontal carousel pattern for the 4 stories.  
Ghost numbers visible on mobile cards.  
Blockquote on mobile: keep existing mobile-specific blockquote block.

---

### S9 — src/components/credentials.tsx [REWRITE]

**Atmosphere:** bg-paper-dark (#f4f4f2)  
**Height:** min-h-dvh  
**Layout:** section header + 3-column grid (keep column structure)

#### Section header
```
Space Mono kicker:  "09 / Credentials"
                    11px, letter-spacing 0.3em, uppercase, text-accent, margin-bottom 16px

Headline:           "Credentials"
                    font-display, clamp(3rem,6vw,7rem), text-ink, line-height 0.9
```

#### Column header labels
```
font-label, 10px, letter-spacing 0.3em, uppercase, text-accent
margin-bottom 32px
```
Keep existing labels: "Education & Certifications", "Honors & Awards", "Languages" + tools section

#### Education items typography
```
Degree name:   font-display, 18px, text-ink, line-height 1.3, font-weight 400
Institution:   font-label, 11px, color rgba(26,28,27,0.5)
Year:          font-label, 11px, color rgba(26,28,27,0.45) (inline with institution)
Logo:          keep existing (max-height 24px, opacity-70 hover:opacity-100 transition)
```

#### Award items typography
```
Icon:         keep material-symbols-outlined, text-accent
Award name:   font-display, 18px, text-ink
Org:          font-label, 11px, color rgba(26,28,27,0.5), margin-top 4px
```

#### Languages typography
```
Language name:  font-display, 18px, text-ink
Level:          font-label, 10px, letter-spacing 0.12em, uppercase, color rgba(26,28,27,0.5)
Divider:        keep border-b border-ink/20
```

#### Tools tags
```
font-label, 10px, letter-spacing 0.12em, uppercase
border: 1px solid rgba(26,28,27,0.2)
padding: 6px 14px, border-radius: 2px
bg-paper on hover, transition
```

#### Mobile

Keep existing 3-slide carousel. Apply typography updates to all slides.

---

### S10 — src/components/contact.tsx [REWRITE]

**Atmosphere:** bg-ink (#1a1c1b) — changed from current paper-dark  
**Height:** min-h-dvh  
**Layout:** 2-column grid (keep existing structure, update visuals)

#### Section header redesign
```
"Let's"   font-display, clamp(5rem,12vw,12rem), color #f9f9f7, line-height 0.85
"Talk."   font-display, italic, clamp(5rem,12vw,12rem), text-accent, line-height 0.85
```

Keep existing logic: `<h2>Let&rsquo;s<br/><span className="italic text-accent">Talk.</span></h2>`
Just update font and scale — font-display at the above clamp scale.

#### Subtext
```
font-body, 20px, font-weight 300, color rgba(241,239,233,0.65)
line-height 1.6, max-width 420px
Keep existing copy: "If you're building a brand..."
```

#### Contact link cards (desktop — the 3 cards)
```
background: rgba(241,239,233,0.05)    — very subtle lift against ink dark
border-left: 4px solid rgba(212,98,42,0.4)   — keep accent left border
padding: 28px 32px                           — slightly more generous

On hover (keep existing whileHover):
  y: -4, box-shadow: 0 20px 40px rgba(0,0,0,0.3)
  border-left-color: rgba(212,98,42,0.8)

Icon label:
  font-label, text-xs (10px), letter-spacing 0.3em, uppercase
  color rgba(241,239,233,0.45)

Value text:
  font-display, italic, 22px, color #f9f9f7
```

#### Mobile contact
Keep existing mobile fallback (simple text links).  
Update link styling: font-display italic for the email/LinkedIn values.  
Color: rgba(241,239,233,0.8) on ink background.

#### Keep all GTM instrumentation
All data-gtm-event attributes and dataLayer pushes must survive the rewrite.

---

### S11 — src/components/chat-widget.tsx [PATCH — minimal change]

Add one useEffect that listens for the 'chat:open' custom event dispatched by the hero CTA:

```tsx
useEffect(() => {
  const handler = () => setIsOpen(true);
  window.addEventListener('chat:open', handler);
  return () => window.removeEventListener('chat:open', handler);
}, []);
```

Place this alongside the existing useEffects. No other changes to this file.

---

## PHASE 3 — INTEGRATION

### I1 — src/app/page.tsx

Add imports:
```tsx
import { OrientationLayer } from "@/components/orientation-layer";
import { DoritosRainbow } from "@/components/doritos-rainbow";
```

Final render order:
```tsx
<>
  <Loader />
  <OrientationLayer />
  <CookieBanner />
  <ProgressBar />
  <NavBar />
  <main id="main-content">
    <Hero />
    <DoritosRainbow />
    <DefiningWork />
    <Impact />
    <Experience />
    <BrandsGrid />
    <HowIWork />
    <Credentials />
    <Contact />
  </main>
  <Footer />
  <ChatWidget />
</>
```

---

## PHASE 4 — VERIFICATION

1. Run `next build` — zero TypeScript errors required before reporting complete.

2. Report in your summary:
   - Commit hash on dev-test branch
   - Whether `chat:open` event correctly opens the widget from the hero
   - Any contrast issues found (minimum 4.5:1 required — text on ink backgrounds is the highest risk)
   - Any responsive issues at 375px, 768px, or 1440px

3. Check `prefers-reduced-motion`: any animation using CSS `animation:` property must be wrapped:
   ```css
   @media (prefers-reduced-motion: reduce) {
     animation: none;
   }
   ```
   Apply this to ecBob, ecGrain, ecDrift keyframe usages.

---

## HARD CONSTRAINTS

**Do not change under any circumstances:**
- Any file in `src/lib/` except `data.ts`
- `src/app/api/` routes
- `data/knowledge/*.md` files
- `CLAUDE.md`
- `.env.local.example`
- `supabase/schema.sql`
- The chatbot session logic, message cap, spend ceiling, or system prompt

**Do not invent:**
- Facts, metrics, dates, or employer names not present in data.ts or knowledge base
- New sections not listed in this brief
- New nav items not in the existing nav link array

**Do not remove:**
- Any existing GTM instrumentation
- The id="hero" attribute on the Hero section
- The id="main-content" on the main element
- The skip-link in layout.tsx
