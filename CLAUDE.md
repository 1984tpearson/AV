# AV — Paramedic Training Simulation Tools

A collection of standalone HTML/JS tools for EMS/paramedic training. No
build step — everything is loaded either as static files (GitHub Pages,
auto-deploys on push to `main` via `.github/workflows/static.yml`) or as
absolute `https://1984tpearson.github.io/AV/...` `<script src>` references
between the tools themselves (not relative paths — matters when testing
locally, since a plain `python3 -m http.server` won't serve those cross-file
references without intercepting/redirecting them).

Backend is Supabase (`sim_sessions`, `scenarios`, `scenario_sim_timelines`
tables; anon key is hardcoded client-side, this is a training tool not a
security boundary). Two edge functions exist (`generate-avatar`,
`generate-featured-blurb`) — unrelated to the sim engine below.

## The real-time scenario simulator (most active area)

Three files work together:

- **`sim_engine.js`** — shared deterministic vitals engine. Both
  `sim_control.html` (assessor) and `sim_patient.html` (student) load it
  and independently compute the same vitals from the same inputs
  (baseline, override list, elapsed time) — no server-side ticking, only
  the override/treatment data needs to sync (via Supabase polling, ~3s).
- **`sim_control.html`** — assessor/instructor control panel: trajectory
  graph, treatment log, "Script an Event" command field, session
  creation.
- **`sim_patient.html`** — student-facing patient view: monitor, ECG,
  voice-driven "Treat / Assess / Talk" interactions.
- **`ecg_engine.js`** — shared with *other* tools in this collection
  (`monitor.html`, `scenario.html`, etc), not written for this sim
  specifically, but fully appropriate to reuse here. Renders real
  waveform morphology per named rhythm key (`nsr`, `af`, `vf`, `asys`,
  `stemi-inf`, ~40 more) and has `mapRhythm(text, hr)` to fuzzy-match
  free clinical text to an engine key.

### Vitals model: baseline + overrides

`cfg.overrides[vitalKey] = [{ targetValue, startMs, endMs }, ...]`. A vital's
value at time T interpolates toward `targetValue` between `startMs`/`endMs`;
once an override completes, it becomes a permanent additive offset (the
raw baseline trend "resumes drifting" from that point, not freezing) — see
`applyOverrides()` in `sim_engine.js`. **Chained entries must run end-to-end
with no gaps** — the renderer doesn't interpolate between chain links.

### AI trajectory generation — three call sites, one shared splice rule

- `generateSimTimeline(scenario)` — the untreated baseline course, run once
  per scenario and cached in `scenario_sim_timelines` (keyed by
  `scenario.updated_at`, so editing a scenario invalidates the cache).
- `regenerateTimelineAfterTreatment(action, givenAtMs)` — reasons about a
  crew treatment's actual pharmacological effect. Skeptical by design: no
  real mechanism → no effect, even if "something was done."
- `regenerateTimelineForScriptedEvent(command, givenAtMs)` — the assessor
  directly authors a clinical event ("put patient into cardiac arrest in
  5 minutes"). Authoritative by design: it's a direct command, not
  something to second-guess for plausibility.

**All three are Sonnet-only, deliberately.** `classifyTreatmentWithHaiku()`
is the *only* legitimate Haiku call in the treatment path — it's a router
that fuzzy-matches free text against a fixed catalogue of already-reviewed
simple actions (aspirin, tourniquet, etc.) so obvious cases skip an AI
reasoning call entirely. Full physiological reasoning (either of the two
functions above) must never run on Haiku — it was previously configurable
via a model picker and that's exactly why the cascade bugs below existed;
the picker was removed for this reason. Don't reintroduce a Haiku option
for those two calls.

Both `regenerateTimeline*` functions share `spliceAiOverridePlan()` — the
non-obvious part of this whole system:
1. An override key the AI didn't mention in its response is left **completely
   untouched**, including its future — omission means "nothing changes here,"
   not "erase what was scheduled." This took two iterations to get right;
   see the comment above `spliceAiOverridePlan` for the two bugs it fixes.
2. For a key the AI *did* touch: anything already fully in the past is kept
   as history, anything mid-transition right now is truncated to end exactly
   at `givenAtMs` (frozen at its real current value), and anything still in
   the future is dropped before the new chain is spliced in. Otherwise a
   stale wide-window override keeps "winning" over the new plan for its
   entire original duration (the engine always uses whichever override, in
   start-time order, contains "now").

**Cascade rule baked into both prompts**: if an event causes cardiac arrest /
severe shock / LOC change, the AI must write overrides for *every* vital that
state implies (HR, BP, SpO2, EtCO2, RR, GCS) — not just the one it reasoned
about first — or the graph shows a contradictory picture (e.g. HR flatlined
at 0 while RR keeps breathing normally on its old schedule). Pain/nausea are
self-reported and must cut to 0 in lockstep with LOC, not fade out
independently.

### Rhythm — separate from vitals, deliberately

HR is a number; a rhythm (VF vs asystole vs PEA vs sinus) is a distinct
concept that can't be inferred from HR alone (all three of those can be
"HR 0" but render completely differently, and PEA specifically looks
organized despite no pulse). `overrides.rhythm` is a **step-function** list
— `{ label, startMs }`, no `endMs`/`targetValue` — read via
`SimEngine.getRhythmAt(cfg, nowMs)` (last entry at-or-before `nowMs` wins,
`null` if nothing's been scripted). Spliced separately via
`spliceRhythmPlan()` (much simpler than the vitals splice: no in-progress
truncation needed since it's discrete, just drop superseded future entries).

Both AI prompts can return an optional `rhythm` array alongside `overrides`,
using the ECG engine's recognised terminology (sinus rhythm/tachy/brady, AF,
VF, asystole, PEA, heart blocks, STEMI territories, etc — see the prompt
text for the full list `mapRhythm` understands). Cardiac arrest **always**
needs a rhythm entry — never leave it to the engine to guess.

`generator.html` has long had a per-scenario `vitals.Rhythm` free-text field
(e.g. "SVT") for other tools in this collection — plenty of scenarios
*start* with an abnormal rhythm already showing, not just one reached via a
treatment/event. `createSession()` seeds `overrides.rhythm` from
`scenario.vitals.Rhythm` (via `parseScenarioStartingRhythm()`) at session
creation, so this doesn't depend on any AI call firing first.

`sim_patient.html`'s `ensureECG()` prefers this explicit scripted rhythm
over the old `deriveRhythmFromHR()` fallback (which only ever picks
sinus brady/normal/tachy — falls back to it only when nothing's been
scripted). `sim_control.html`'s `renderGraph()` draws a vertical marker +
label at each in-scenario rhythm change in view, plus a persistent
"♥ CURRENT RHYTHM" badge (skips drawing a marker line for the scenario's
starting entry itself — the badge already covers that).

### Graph rendering

`renderGraph()` in `sim_control.html` is hand-rolled SVG (no charting
library) — fixed `viewBox` coordinate math (`xForMin`/`yFor`), with
ghost-line overlays for "no treatment" baseline and "plan before the last
change." If extending it, follow the existing layering order (grid →
rhythm markers → ghosts → main paths → hit-paths → override markers →
playhead → ...) — later layers draw on top.

## Gotchas

- **Backticks inside a prompt string break the JS parse.** The AI system
  prompts are themselves JS template literals (backtick-delimited) — never
  use `` ` `` for markdown-style emphasis inside that text (use single
  quotes instead). Always run a syntax check after editing a prompt block:
  `python3 -c "import re; ..."` to extract `<script>` contents, then
  `node --check`.
- No test suite. Verify changes by extracting/checking JS syntax and, for
  UI changes, a local `http.server` + Playwright screenshot (remote
  `1984tpearson.github.io` script/asset URLs need request interception to
  serve local copies when testing offline).
- Git flow observed so far: work on a `claude/*` branch, fast-forward merge
  to `main` directly (no PR process used yet) — GitHub Pages redeploys
  automatically on every push to `main`.
