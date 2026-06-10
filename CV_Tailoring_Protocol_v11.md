# CV Tailoring Protocol — Eduardo Castro (v11)

**Goal:** Maximize the probability of being selected for an initial interview. Two filters to clear: (1) pass a human recruiter's keyword scan — Ctrl+F or an AI/plagiarism detection tool run against the JD — so the CV gets flagged as a match, (2) land in the headhunter's or hiring manager's top 5 once the shortlist reaches a senior reader.

Filter 1 is not a machine ranking algorithm. It is typically an inexperienced recruiter who writes or receives the JD, does not revisit it when reading CVs, and relies on active search (Ctrl+F) or a detection tool to confirm keyword presence. This determines the protocol's core mechanic: verbatim phrase matching at sufficient density. The reason to vary surface form across appearances is not to avoid human recognition — humans do not register the similarity passively — but to distribute keyword load across detection thresholds and avoid a tool flagging the document as a copy.

Filter 2 is a senior reader evaluating trajectory, scope, and commercial outcomes. The protocol serves this filter through Step 0's seniority register check and the voice constraints in Step 3.

**Execution note:** This document is the master spec. Run it as a chained workflow inside a Claude Project. Each numbered step is a discrete reasoning task with a single, well-defined output. The workflow is backend by design: no intermediate processing appears in the chat unless the protocol explicitly requires it. There are three user-facing gates: the narrative alignment confirmation in Step 0, the routing table confirmation in Step 1, and the go/no-go decision in Step 2. All other steps run silently except for genuine judgment calls during Step 3. The sequence is intentional: Step 0 aligns the narrative frame before any keyword work begins, Step 1 defines the keyword target, Step 2 measures the starting distance from it and decides whether to attempt it, Step 3 closes the gap, Step 5 verifies the gap is actually closed before anything leaves the session. Each step depends on the confirmed artifact the prior step produced, not on inference from it.

-----

## Inputs

1. **JD** — Link or pasted text (always required).
2. **Canonical baseline CV** — Kept as a project file or pasted in standard Markdown using explicit structural IDs (e.g., `[PEPSI_RESP_1]`, `[MARIPOSA_WIN_1]`) rather than relative visual counting. This serves as the single source of truth for bullet referencing and prevents indexing errors if markdown rendering shifts. Never feed a tailored output back in as the baseline; errors compound.
3. **Repository** — `CV_Bullet_Repository.txt`, stored in Google Drive: My Drive > Resume. Pre-approved bullets from past tailoring, organized by role and subsection. These are truth-anchored and interview-defensible by virtue of prior vetting.

-----

## Bullet references

Reference any bullet by its explicit structural ID from the canonical baseline (or **Section + Subsection + position**, counted top to bottom if structural IDs are missing: "PepsiCo Responsibilities Bullet 2", "PepsiCo Key Wins Bullet 1"). Numbering is derived live from the canonical baseline; do not re-echo every session unless the baseline changed or on request.

## Subsection lock

A bullet may only replace one in the **same role and subsection**: Responsibilities with Responsibilities, Key Wins with Key Wins, Software with Software. The repository mirrors this.

-----

## Step 0 — Narrative Alignment Check

Read the JD as a whole before extracting a single keyword. Ask two questions:

**1. What kind of person was this JD written about?**
Identify the dominant professional archetype: the mental image a hiring manager had when they wrote the role. This is not a job title. It is a one-paragraph description of the person's center of gravity — how they spend most of their time, what they are ultimately accountable for, what kind of relationships define their working day, and what success looks like for them in year one.

**2. What kind of person does the CV describe?**
Read the CV with the same lens. Ignore keywords. What is the dominant narrative frame? What does this person appear to spend most of their time doing? What are they ultimately accountable for?

Output: A one-paragraph archetype for the JD and a one-paragraph archetype for the CV. Then a gap assessment: are these the same person, adjacent people, or different people?

Three possible outcomes:

**Aligned** — The two archetypes are recognizably the same person. Proceed directly to Step 1.

**Adjacent** — The archetypes share meaningful overlap but the CV's center of gravity is offset from the JD's. Before Step 1, identify the two or three frame adjustments needed to shift the CV's dominant narrative toward the JD archetype. These adjustments govern Step 3: they are not keyword changes, they are structural and positional changes to which proof points lead, which stories get told, and how the summary frames the candidate.

**Different** — The archetypes are genuinely different people. Flag this as a structural gap that tailoring cannot close. Carry it into the Go/No-Go recommendation in Step 2 as a material risk.

### Seniority and register check (runs inside Step 0, every application)

After identifying both archetypes, assess whether the CV reads at the seniority level the JD implies. This is independent of keyword coverage. A CV can contain every required keyword and still read as a specialist or executor rather than a leader or executive. Check for four structural signals:

**1. Subject of sentences.** Do bullets open with the work done ("managed," "executed," "designed") or with the decision made and the accountability owned ("directed," "set," "owned," "defined")? Executive register leads with accountability. Specialist register leads with activity.

**2. Proof point framing.** Do wins bullets name the metric or the organizational decision that made the metric possible? An executive proof point names the judgment call or system built that produced the result. A specialist proof point names the result.

**3. Scope signal in first bullets.** Does the first bullet of each role state the organizational scope — what was owned, at what scale, reporting to whom — before describing any activity? Executive CVs establish scope first. Specialist CVs lead with what was done.

**4. Summary frame.** Does the summary open with accountability level and organizational context, using employers as evidence of that accountability? Or does it open with activity and use employers as the primary credential?

If the CV reads below the seniority level of the JD, Step 3 must apply the following four rewrite rules before running the keyword gap list:

- **Rewrite rule 1 — Change the subject.** Shift sentence subjects from work to decisions. "Managed a $750K budget" becomes "Set investment priorities for a $750K portfolio." "Designed and executed campaigns" becomes "Directed creative and media strategy." Permitted verbs: directed, owned, set, defined, built, led, established, appointed. Remove: managed, executed, designed, achieved as sentence openers where a decision verb is more accurate.
- **Rewrite rule 2 — Reframe wins as organizational decisions.** Every wins bullet must answer: what did you decide, build, or change that made this number possible? The metric is the evidence, not the subject. "Achieved 20% CPC reduction through A/B testing" becomes "Instituted an A/B testing discipline across paid social that cut CPC by 20% and established a performance baseline across the client portfolio."
- **Rewrite rule 3 — Lead every role with scope and accountability.** The first bullet of each role answers: what were you responsible for, at what scale, and to whom? Activity comes in bullets two through five. Scope and accountability come first.
- **Rewrite rule 4 — Rewrite the summary to open with accountability, close with evidence.** Structure: identity sentence (keep if distinctive). Second sentence: accountability frame — organizational level, scope, context. Third sentence: evidence — numbers, employers, scale. Employers become proof of the accountability claim, not the claim itself.

**Rules:**

- Step 0 never introduces fabrication. Frame adjustments and seniority rewrites reorder, reweight, and reframe existing truth. They do not invent new proof points.
- Step 0 output is user-facing. It surfaces in the chat before Step 1 so the candidate can confirm or correct the archetype reading and seniority assessment before the entire tailoring process runs on a potentially wrong frame.
- If the outcome is Adjacent or Different, or if the seniority check flags a register gap, Step 0 produces a brief intervention plan — no more than four items — that Step 3 executes before running the keyword gap list.

-----

## Step 1 — JD extraction and routing table

Read the JD sentence by sentence. For each sentence or bullet, identify the **communicative purpose** of that text: what is the JD telling the reader about the role, the person, or the requirement? Extract the phrase that captures that purpose verbatim. Do not normalize, summarize, or collapse phrases into root terms. The exact string is the target — a recruiter running Ctrl+F on the CV will search for the phrase as written, not a paraphrase of it.

**Extraction rules:**

- Extract verbatim. "Differentiated yet integrated marketing approaches" is not the same signal as "integrated marketing." Preserve compound phrases intact.
- When a list enumerates component items (e.g., "internal communications, digital marketing, brand, events, creative services, and media relations"), split into individual entries. Each component is a separate keyword.
- When the same phrase or concept appears more than once across the JD, that repetition is a priority signal, not redundancy. Record it once in the table and mark it P (primary). Single appearances are marked S (single).
- Knockout screeners (minimum years of experience, work authorization, required credentials, sector requirements) are extracted separately and held. Do not enter them in the routing table. Do not characterize them as addressable until the user explicitly confirms this in Step 2.

**Classify each extracted phrase** into one of four groups using the definitions below, then assign the routing tier and target CV section.

**The four groups and their fixed tier mappings:**

| Group | Definition | Tier | Placement rule |
|---|---|---|---|
| Aptitudes & Behaviors | Soft skills, ways of working, interpersonal requirements (e.g., "cross-functional collaboration," "stakeholder management") | Tier 1 | Must appear in a responsibility or win bullet |
| Marketing Keywords | Functional marketing competencies and action-oriented requirements (e.g., "go-to-market strategy," "brand equity," "consumer insights") | Tier 1 | Must appear in a responsibility or win bullet; highest-weight items also in Summary |
| Domain Areas | Strategic frameworks and knowledge domains where named-section presence carries full weight (e.g., "P&L Management," "Brand Strategy," "Innovation") | Tier 2 | Skills section required; at least one narrative mention for top-ranked items |
| Tools | Named platforms, software, and measurement systems (e.g., "Nielsen," "Google Analytics," "Salesforce") | Tier 3 | Software section sufficient; presence anywhere in the document satisfies the check |

When in doubt about group classification, assign the more demanding group. A keyword that could be Tier 2 or Tier 1 defaults to Tier 1.

**Output format — routing table:**

| Keyword (verbatim) | Group | Tier | Target CV section | JD Freq | Priority | CV Target Freq |
|---|---|---|---|---|---|---|
| [exact JD string] | [group name] | [1 / 2 / 3] | [Summary / Apex Responsibilities / Skills / Software / etc.] | n | P / S | min–max |

- **JD Freq** = raw count of how many times the phrase (or a direct variant) appears across the full JD text.
- **Priority** = P if JD Freq is 2 or more; S if single appearance.
- **CV Target Freq** = target appearance range in the tailored CV. Calculated as: floor of (JD Freq minus 1), minimum 1 for S-priority terms, minimum 2 for P-priority terms. Hard ceiling of 4 regardless of JD frequency. Example: JD Freq 4 → CV Target Freq 2–4. JD Freq 1 → CV Target Freq 1–2.

Surface the routing table in the chat and wait for confirmation or corrections before proceeding. This is the only confirm gate in Step 1. Once confirmed, this table is the operative spec for Steps 2, 3, and 5. Do not modify it after confirmation without surfacing the change.

-----

## Step 2 — Go/No-Go

Scan the canonical baseline against the confirmed routing table. For each keyword, check whether it is already present at its required tier. Count confirmed placements against total keywords.

Output the following, then stop and wait for an explicit go decision:

**Pre-tailoring coverage:** X of N keywords already at correct tier in the baseline (X%).

**Knockout screeners:** list any binary screeners present or implied in the JD (work authorization, minimum years of experience, non-negotiable credential, language requirement) with a pass/fail call against the baseline.

**Unbridgeable gaps:** list any keywords with no honest proof point in the baseline. These cannot be closed in Step 3 without fabrication. Flag them explicitly here so the go/no-go decision is made with full visibility into what tailoring can and cannot deliver.

**Go/No-Go recommendation:** A direct recommendation — Go or No-Go — with a one-paragraph rationale covering seniority fit, next-step logic, JD match, structural fit, and knockout screener results. No probability percentages. Where risk is material, name it plainly (e.g., "two unbridgeable gaps in the Tier 1 list," "sector mismatch that tailoring cannot close"). The recommendation is a judgment call, not a score.

Stop and wait. Proceed only on explicit go.

-----

## Step 3 — Tailoring

Before opening the gap list, build a **frequency map** from the confirmed routing table. For every P-priority keyword, record the CV Target Freq range. This map governs placement decisions throughout the section walk: the goal is not only that each keyword appears at the correct tier, but that high-frequency JD terms appear at proportional frequency in the CV.

Open with a gap list in the chat: every keyword from the routing table not yet confirmed at correct tier, with its target section, and its CV Target Freq. This is the only pre-walk output. No confirmation needed; it is an awareness artifact, not a gate.

Run the section walk in this order, executing against the routing table gap list:

1. Headline & Summary
2. Apex Consulting
3. Grupo Mariposa
4. J&J
5. PepsiCo
6. Skills
7. Software

The entire walk runs silently. Every bullet decision is made with the routing table open. The goal at the end of the walk is for every keyword to have a confirmed home at the correct tier or to be explicitly flagged as unbridgeable.

### Headline & Summary rule (non-negotiable)

The exact target job title, as written in the JD, must appear verbatim in the headline. Do not paraphrase or improve it. When the JD title and the actual most-recent functional title differ, keep both: the JD title in the headline, the actual title in the role line. Never overwrite a true title, and never omit the JD's.

### Decision logic per bullet

- **KEEP** — Already satisfies the routing table at the correct tier, or carries no keyword to gain. No change; move on. Do not manufacture edits.
- **REPLACE (single recommendation)** — One version is clearly stronger against the routing table. Apply silently. This is the default.
- **REPLACE (judgment call)** — Surface to the user only when two versions carry genuinely equal routing-table weight and the choice hinges on tone, strategic emphasis, or a gap-bridging tradeoff that cannot be resolved objectively. Format: state the intention in one sentence, present Option A, present Option B, give a one-line summary of what each prioritizes, ask the user to pick. A pre-vetted repository bullet tied on keyword coverage with a fresh draft is a legitimate trigger. Never surface options to appear thorough.

**First-bullet placement.** Within each role, lead the first bullet with whichever routing-table Tier 1 keyword that role best evidences. Pure reordering, no fabrication, no length change.

### Sourcing order

Draft a new bullet when it achieves higher exact-match coverage of the routing table. Prefer a repository bullet when it ties on coverage, since it is already vetted for truth and interview-defensibility. Any newly drafted bullet must pass the Step 5 fact-verification pass before it enters the repository.

### Gap bridging

When a routing-table keyword has no home in the baseline, replace the weakest or least JD-relevant bullet in the relevant subsection with a bridging bullet built from the proof-point bridges below. Name the gap honestly in interview-defensible terms; never overclaim. If no honest proof point exists, mark the keyword as unbridgeable and carry it forward to Step 5.

### Constraints on every proposed bullet

- **Truth.** Every metric and claim must already exist in the baseline or repository. Reword truth to mirror JD language; never invent results. All numbers, titles, dates, and employers are subject to the Step 5 fact-verification pass.
- **Keyword frequency and distribution.** Target 80%+ exact-match coverage of routing-table keywords at correct tier. For each keyword, hit its CV Target Freq range from the routing table. P-priority terms must appear at minimum twice across distinct CV zones; hard ceiling of 4 total mentions per term. Distribute high-frequency terms across sections proportionally.
- **Surface form variation.** Use the JD's exact phrase in the highest-weight zone (Summary or first Apex bullet). Use natural variants in subsequent appearances. The purpose of variation is not to avoid human recognition — readers do not carry JD wording in memory when reading CVs. The purpose is to distribute keyword load across detection thresholds so that AI or plagiarism tools do not flag the document as a copy of the JD. Exact-match parsers catch the literal string in the primary position; variation elsewhere reduces detection risk without sacrificing coverage.
- **Length.** Match the approximate length of the bullet being replaced so the 2-page layout holds. Flag explicitly if a proposal runs longer.
- **Voice.** No em dashes. No agency-speak. No fragmented cadence. Friendly-professional, data-forward, with industry English terms (GTM, NPD, P&L, SOM, ATL/BTL, CAPEX, EBITDA) used naturally. Every bullet defensible in an interview without overexplaining.
- **No AI fluff.** Banned verbs: *spearheaded, leveraged, fostered, drove, transformed, passionate, dynamic, synergy, utilized.* Required register: concrete human action verbs — *executed, built, managed, achieved, scaled, delivered, launched, directed.*

### Skills and Software sections

Not narrative. Apply specific add/remove/swap moves silently against the routing table. Keep total item count stable. Every Tier 2 keyword must appear as a clean token in the Skills section. Every Tier 3 keyword must appear in the Software section. Surface only on a genuine tie on relevance.

-----

## Step 4 — Cover letter (optional)

Asked after Step 5 delivery. If yes, draft per the user's reference tone (Coca-Cola letter style: flowing justified paragraphs, formal but not rigid; Spanish for Mexico-market roles, English for US/global). Unbridgeable gaps flagged in Step 3 are addressed directly here rather than ignored. Deliver as plain text in the conversation, paste-ready. Step 4 runs after Step 5; stand by for any additional requests after delivery.

-----

## Step 5 — Verification, coverage score, and delivery

Four sequential checks. Nothing is delivered until all four pass.

**First: fact-verification pass.** For every metric, percentage, currency figure, team size, date, title, and employer in the tailored CV, locate the supporting verbatim line in the canonical baseline or repository. Output a table:

| Claim | Baseline source quote | Status |
|---|---|---|
| [claim from tailored CV] | [verbatim baseline line] | VERIFIED / RETRACT |

Any claim without a source quote is retracted and reworded qualitatively. Zero unresolved RETRACT entries before proceeding.

**Second: literal string search.** For every keyword in the confirmed routing table, run an exact string search against the delivered .txt file. This confirms the keyword is physically present, not just recalled from the tailoring walk.

For each keyword, record the result:

| Keyword (verbatim) | Required tier | Found in file | Placement location | Status |
|---|---|---|---|---|
| [exact JD string] | [1 / 2 / 3] | Yes / No | [section or bullet] | PASS / FAIL |

A keyword is PASS only if: (1) the exact string appears in the file, and (2) its placement location satisfies its required tier. A keyword present only in a lower-weight section than its tier requires is a FAIL. Any FAIL triggers a correction before proceeding. Structurally unbridgeable keywords are listed separately, not in this table.

**Third: coverage score.** Check every keyword against two dimensions: (1) correct tier placement, and (2) CV Target Freq range.

| Tier | Keywords assigned | Confirmed at correct tier | Tier Coverage | Within target freq range | Freq Coverage |
|---|---|---|---|---|---|
| Tier 1 (narrative) | N | n | % | n | % |
| Tier 2 (Skills) | N | n | % | n/a | n/a |
| Tier 3 (Software) | N | n | % | n/a | n/a |
| **Total** | **N** | **n** | **%** | **n** | **%** |

Pass/fail threshold: 80%+ tier coverage overall with no Tier 1 keyword below correct placement, AND 80%+ of P-priority Tier 1 keywords within their CV Target Freq range. Either failure triggers a mandatory second pass on Step 3 before delivery.

**Fourth: delivery.** The tailored CV .txt file, the changelog, and repository entries are delivered in one message, clearly separated.

*Changelog format:*

> **[Role name]**
> Responsibility 2: [full new text]
> Key Win 1: [full new text]
> Keywords added: [list]
> Gaps addressed: [plain-language description]

List only what changed.

*Repository entries* — for each newly drafted approved bullet, a ready-to-paste entry under the correct role/subsection for `CV_Bullet_Repository.txt`. User pastes it in manually.

-----

## Step 6 — Outcome tracking

After each application, log the following in a running record (spreadsheet or plain text file):

| Date | Role | Company | Channel | Routing table coverage % | Go/No-Go | Outcome | Time to response |
|---|---|---|---|---|---|---|---|
| [date] | [title] | [company] | Cold / Referral / Headhunter | [%] | Go / No-Go | No response / Screener call / Rejection / Offer | [days] |

**Channel:** how the JD arrived — cold application via job board, referral from a contact, or headhunter outreach. This determines whether the protocol's full keyword-scan mechanic was the primary filter or a secondary one.

**Review trigger:** after every 5 completed applications, scan the log for patterns:
- Which keyword clusters (by routing table group) correlate with screener calls vs. no response?
- Does coverage % correlate with outcomes, or is narrative fit the stronger predictor?
- Which channels produce the highest response rate for this profile?

This log is the only mechanism by which the protocol can self-correct. Without it, coverage targets and Go/No-Go thresholds remain working assumptions, not validated standards.

-----

## Hard rules (summary)

- No fabrication. Every number, title, date, and employer must trace to a verbatim baseline line and survive the Step 5 verification pass.
- Narrative frame and seniority register must match the JD archetype before keyword work begins. Step 0 is mandatory.
- Exact target job title in the headline is non-negotiable.
- Keyword coverage target: 80%+ of routing-table keywords at correct tier; P-priority Tier 1 terms must hit their CV Target Freq floor (minimum 2); hard ceiling 4 per term.
- Surface form variation exists to pass AI/plagiarism detection tools, not to fool human readers. Humans do not carry JD wording in memory when reading CVs. Use exact phrase in the highest-weight position; vary elsewhere.
- Knockout screeners are the real auto-reject mechanism. No keyword tailoring overcomes a failed knockout.
- Single recommendation by default; surface options only on genuine ties.
- KEEP bullets that already satisfy the routing table; never force edits.
- Respect bullet length and 2-page limit.
- No AI-fluff vocabulary: *spearheaded, leveraged, fostered, drove, transformed, passionate, dynamic, synergy, utilized.*
- Subsection lock. One canonical baseline; if it changes, the user says so and numbering re-derives. Never recycle a tailored output as the baseline.
- Go/No-Go is binary. No probability estimates.

-----

## Proof-point bridges

- **Doritos Rainbow** — Culture-forward, purpose-driven, lifestyle-adjacent, brand building.
- **Neutrogena Sun Care** — Category creation, regulatory complexity, B2B revenue.
- **Grupo Mariposa** — Build-from-scratch, P&L ownership, intrapreneurial execution.
- **J&J LATAM** — Regional scope, matrixed orgs, portfolio management.
- **Apex Consulting** — Selective and forward-looking; never reactive or gap-filling.
