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

### Patient avatar (`sim_patient.html` only)

The `#head-wrap` placeholder is a hand-built inline SVG face, not a photo —
deliberately no AI/image generation involved. The artwork itself lives in
`avatar_assets.js`, extracted once from DiceBear's "Avataaars" style (MIT
core, art free for personal/commercial use — see that file's header for the
full licensing note and extraction method) rather than calling DiceBear at
runtime: this repo is otherwise all static files, and a live external
avatar-service call is a new failure mode this training tool doesn't need.
`window.AvatarAssets = { eyes, eyebrows, mouth, top, headBodyPaths }` — hair
(`top`) keeps a `__HAIRCOLOR__` token, the head/body path a `__SKINCOLOR__`
token, substituted at render time rather than baked in, so colour stays
dynamic. Two layers on top of that shared data:

- **Build** (fixed per scenario): skin tone from `scenario.patient_meta.skin_colour`
  (hex swatch, already stored by `generator.html` — see
  `pickSkinToneForEthnicity()`, weighted by the same `patient.ethnicity` the
  name pool picked via `SKIN_TONE_LEAN`, one weight table per ethnicity key
  — a soft lean toward population-typical tones, not a lookup: every
  ethnicity keeps a nonzero chance at every swatch, verified against 5000
  draws per ethnicity. Previously generated fully independently of
  ethnicity "to avoid caricature" — changed because in practice an
  uncorrelated pick was actively working against the inclusive/
  representative goal the field exists for, not serving it),
  hair style/colour and eyebrow style all picked deterministically from a hash
  of `scenario_id` (each with a differently-suffixed hash so they don't land
  in lockstep) so they're stable across reconnects rather than re-rolling
  each page load. Hair style is softly weighted by `patient_meta.gender` via
  `HAIR_STYLE_LEAN` (each of the 34 styles tagged masc/femme/neutral-leaning)
  and `weightedPick()` — a *soft* bias (male ≈61% masc/13% femme/26% neutral
  in practice, mirrored for female), not a hard filter: gender-unset scenarios
  and eyebrow/colour selection stay fully unweighted. Went through two prior
  versions of this: first hard-restricted to 2-3 hand-drawn hair shapes by
  gender (too rigid), then dropped gender entirely once real variety existed
  (came across as arbitrary — see conversation history) — this weighted
  middle ground is what stuck. `buildAvatarBase()` in `sim_patient.html`.
  `hashStr()` is a simple rolling hash with poor avalanche behaviour for
  inputs differing only in a short numeric suffix (e.g. sequential test
  seeds) — fine for real `scenario_id` UUIDs (verified: near-uniform
  distribution across 300 real-shaped seeds) but worth knowing if ever
  seeding from something more patterned.

  Clothing colour — the patient's own, not a uniform — is picked the same
  way: `CLOTHES_COLOURS`, unweighted (no gender/age lean; a pool this broad
  doesn't need one). Rendered as a flat-colour fill only, no separate
  neckline/collar graphic: a duplicate of `headBodyPaths` re-filled
  (`#av-clothes-static-path`, plus `#av-chest-path` reused from the
  breathing layer below), both sharing `#av-chest-clip` (y=199, the same
  boundary the breathing layer uses) rather than a separate, higher
  boundary of their own. Went through two prior versions: DiceBear's own
  hand-drawn neckline graphics (crew neck, v-neck, hoodie, etc, layered on
  top for visual variety) first — dropped, since those are positioned for
  stock Avataaars' eye/eyebrow placement, which sits higher than ours
  (`#av-eyes` is at y90-112 here), so every one of them (and especially
  decorative details like the hoodie's drawstrings around y63-110) crossed
  the eyes/eyebrows instead of sitting on the shoulders. Then a flat fill
  clipped higher, at y175 — verified pixel-for-pixel against the rendered
  SVG to sit well clear of the head/jaw path geometry — which still visibly
  read as the collar touching the chin: y175 is only ~15px below the
  mouth's own drawn shape (origin y134), not the wide margin the path
  geometry alone suggested. Matching the breathing layer's own y199 is far
  more conservative (no collar creeping up the neck at all — the shirt
  starts right at the shoulder line) but guarantees clothing can't read as
  touching the face again, regardless of age band or head-bulge amount.

`patient_meta.age` (verbatim `patient.age` from generator.html — a plain
number of years, a "N months" string, or the literal string "newborn";
older scenarios predate the field and fall through to 'adult', not a guess)
drives two more build-time effects, added after a paediatric scenario
rendered as a literal middle-aged adult:
- **`AGE_SCALE`**: the whole figure is scaled (`av-scale-group`, anchored at
  the top of the head at (140,36) so it shrinks toward that point rather
  than the viewBox origin) — infant 0.78 through teen 0.95, adult 1. Kept
  fairly close to 1 (an earlier version went down to 0.6 for infants) —
  most of the "younger" cue now comes from `HEAD_BULGE` below rather than
  shrinking the whole figure hard, which read as "a tiny adult" and made
  infants disappear on screen rather than looking younger.
- **`ADULT_ONLY_HAIR`**: a small set of structured/receding-hairline-prone
  cuts (theCaesar, theCaesarAndSidePart, shavedSides, sides) excluded from
  the hair pool below teen — a hard filter, unlike the gender lean, since
  there's no equivalent "some variety is good here" case for a toddler
  landing on a middle-aged man's haircut. Infants skip the hair pool
  entirely (`avatarBuild.hairStyle = null`, `#av-top` left empty) — real
  babies are frequently bald or near-bald and nothing in the pool reads as
  "infant hair," the shortest options are still styled cuts.
- **`EYE_SCALE`/`FACE_LOWER_OFFSET`**: the classic cartoon "younger = bigger
  eyes, face sits lower/rounder" cues, layered on top of `AGE_SCALE` since
  eyes/eyebrows/mouth are already independent groups that can move/scale on
  their own — `#av-eyes` scales around its own on-screen centre (56,22) so
  both eyes grow symmetrically rather than spreading apart, while
  eyes/eyebrows/mouth all shift down as a unit, hair/head outline
  untouched.
- **`HEAD_BULGE`**: makes the head outline itself read as proportionally
  bigger for younger bands (infant 1.2 down to adult 1), which `EYE_SCALE`/
  `FACE_LOWER_OFFSET` alone don't touch — the head/body outline is one
  rigid path shared with the torso, no separate head/body art to scale
  independently. Worked around with `#av-head-bulge`, a same-fill circle
  behind `#av-head-path` centred on the head arc's own centre (cx=132,
  cy=92, matching the path's own "a56 56" head arc) at a LARGER radius:
  because it's a circle, it naturally tapers to zero width by y~148-167
  (depending on band), safely above the jaw/neck curve, so a bigger radius
  reads as a wider/rounder head+cheeks with no clipping and no seam against
  the body below — avoids the whole "second chin" class of bug by
  construction, since there's no hard edge to mismatch.
- **`greyWeight()`**: separately, hair *colour* (not style) softly ramps
  toward grey/silver/white (`GREY_HAIR_COLOURS`) as age climbs from 40 to
  75+ (≈7% grey at 20, ≈47% at 45, ≈83% at 80 — verified against 500
  seeds per age) — same weighted-pick mechanism as the gender lean, low but
  nonzero baseline at any age rather than a hard young/old split. Eyebrows
  are NOT recoloured to match — `avatar_assets.js`'s eyebrow paths have
  their fill baked in (`fill="#000"`, no `__COLOR__` token like hair has),
  so this would need SVG surgery on the asset file to add; skipped as
  out of scope for now. Excludes `HEADWEAR` (hat, hijab, turban, the four
  winter hats) — those `top` entries share the same `__HAIRCOLOR__` token
  for lack of a more specific one, but they're a garment, not hair, so
  greying them with age makes no sense; an elderly patient in a hijab or
  turban gets an unweighted colour draw instead of a grey-leaning one.
- **Live state** (re-derived every tick): eyes are NOT one of
  `avatar_assets.js`'s pre-baked variants — several of those (including
  `default`, the plain look) are just flat pupil dots with no sclera
  underneath, and none expose the pupil as independently sizeable. Sclera
  (`av-eye-l/r-sclera`) and pupil (`av-eye-l/r-pupil`) are separate elements
  instead, deliberately so pupil size/reactivity can later be driven by
  clinical state (dilated/pinpoint/unequal — anisocoria, blown pupils) as
  its own axis, not baked into a fixed shape per eye-openness level. Both
  stay full-size at all times; "droopy" (GCS E2) is a skin-toned eyelid
  path (`av-eye-l/r-lid`) occluding the top ~70% of each eye instead of
  shrinking the eyeball — shrinking it used to still read as a small OPEN
  eye rather than a heavy/half-closed one. `closed` still reuses the real
  `AvatarAssets.eyes.closed` asset (a plain eyelid crease, no sclera
  needed) via the always-present `av-eyes-closed-overlay` group, toggled
  visible instead of swapped in. Skin tint blended toward
  cyanotic/mottled/pale (applied to `#av-head-path`/`#av-head-bulge`/eyelids
  only — clothing is deliberately NOT tinted, since cyanosis/pallor/
  mottling wouldn't show through fabric), sweat droplets shown for
  diaphoretic/clammy, and a resting mouth expression
  (neutral/mild/distress/grimace/slack, mapped onto Avataaars' named mouth
  shapes — `grimace` for pain is a literal match) from pain score, distress
  level, and consciousness. Driven by `SimEngine.getAppearanceState(v)` — the
  same severity bands (`hrSeverity`/`rrSeverity`/`spo2Severity`/
  `painSeverity`/`bpSysSeverity`) `sim_control.html`'s assessor-facing
  Appearance tab computes independently, kept in `sim_engine.js` as the one
  shared source rather than two threshold tables drifting apart.
  `updateAvatarFace()`, called from `tick()` — always as the LAST thing
  tick() does, wrapped in try/catch (see Gotchas): tick() runs once
  synchronously before the setInterval(tick,...) that keeps the page live
  even gets registered, so a throw anywhere earlier in the avatar path would
  silently freeze vitals/override-sync too, not just the avatar.

GCS eye-opening (E) maps to clinical exam findings, not a linear scale: E4
open spontaneously, E3 ("opens to voice") droopy/half-open at rest and only
opens fully while `_voiceModalOpen` is true (i.e. a crew member is actively
mid-interaction via Treat/Assess/Talk — that's the actual voice stimulus
being modelled, not just cosmetic). E2 ("opens to pain") and E1 ("none")
both render closed — there's no pain-stimulus interaction modelled here, so
E2 has nothing to open in response to and stays closed, same as E1. An
earlier version had this backwards (E2 droopy/half-open, E3 closed at rest)
which read as the patient looking MORE responsive at a lower GCS than a
higher one — ordering it E4 > E3(droopy, or open mid-interaction) > E2/E1
(closed) is what actually matches the clinical severity gradient.

Driven by `gcsE` ALONE — deliberately not folded together with
`app.unresponsive` (`getAppearanceState()`'s overall-GCS-≤8 flag, used
elsewhere for e.g. resting mouth expression), even though an earlier
version did exactly that. E is specifically the eye-opening component of
the scale; a real E4/V1/M1 presentation (eyes open, no other response) is
rare but clinically possible and should still render open eyes, which
`app.unresponsive` (4+1+1=6 ≤ 8) would otherwise force closed.

Idle animations run independently of the 1s vitals tick (a 1s-stepped
animation reads as a slideshow, not motion), all inside one
`requestAnimationFrame` loop (`idleMotionLoop()`):

- **Blink** every ~2.5–6s (`scheduleNextBlink()`/`doBlink()`, only from a
  fully-open resting state — skipped for droopy/closed, restores to
  whatever `_restingEyeLevel` is AT RESTORE time so a vitals change
  mid-blink isn't clobbered back open).
- **Breathing** is two independently-driven layers, both period-matched to
  live RR and stopping dead at RR≤0 (an apnoeic patient shouldn't still
  look like they're breathing): `#av-chest-group` is a same-shape
  duplicate of the head/body path, clipped to just the shoulder region
  (`av-chest-clip`, a `<rect>` over the lower part of the shape) and
  sitting BEHIND `#av-face-group` — at rest the two perfectly overlap so
  the clipped duplicate is invisible, only becoming visible as "shoulder
  rise" once its own transform diverges from the face group's. This is
  the primary, always-present breathing cue. The clip's top edge (y=199)
  matters more than it looks: it's set just past where the path's
  neck-to-shoulder curve resolves into the flat shoulder taper — set any
  higher (into the curvy jaw/neck transition) and that curve peeks out as
  a visible "second chin" whenever the chest offset diverges enough from
  the face's. The *head* itself (`#av-face-group`) barely moves normally —
  real quiet breathing doesn't bob the head; visible head movement is
  actually a laboured-breathing sign (accessory muscle use, tripoding) —
  so its amplitude is scaled by `_wobAmplitude`, set from
  `SimEngine.getAppearanceState(v).wob` in `updateAvatarFace()`,
  near-zero for a calm patient and progressively more pronounced toward
  agonal/severe distress. Phase is a running angle accumulator
  (`_breathAngle`, advanced each frame by `(dt/period)*2π`) rather than
  recomputed fresh from the absolute rAF timestamp — RR can change
  mid-breath, and recomputing `sin(tsMs/period)` straight from `tsMs` kept
  the numerator growing while the denominator jumped, causing a visible
  phase discontinuity on nearly every RR change (read as the breathing
  "resetting" and looking too fast). Accumulating means a period change
  only changes the rate of future advancement, not the current position
  in the cycle — verified by sampling chest-Y across a live RR change:
  smooth acceleration, no jump. Sway below uses a fixed period so it was
  never affected.
- **Idle sway**: a slow ~7s side-to-side on `#av-face-group`'s X, unrelated
  to any vital sign — purely "not a frozen photo". `#av-top` (hair) gets a
  slightly larger version of the same sway on top of inheriting the face
  group's, a cheap parallax cue (nearer layer moves more) rather than the
  whole head reading as one flat sticker. Scaled by `_swayScale` — derived
  from total GCS in `updateAvatarFace()`, tapering to zero as GCS drops
  toward the unresponsive threshold, since an unconscious patient idly
  looking around would be the wrong signal.

Mouth also flaps between a talking frame and the current resting expression
while patient TTS is actually speaking (`utter.onstart`/`onend` in
`checkForPatientReply()` drive `startTalkAnimation()`/`stopTalkAnimation()`)
— so a distressed patient still looks distressed mid-sentence, not neutral.

Mouth also flaps between a talking frame and the current resting expression
while patient TTS is actually speaking (`utter.onstart`/`onend` in
`checkForPatientReply()` drive `startTalkAnimation()`/`stopTalkAnimation()`)
— so a distressed patient still looks distressed mid-sentence, not neutral.

`avatar_lab.html` is a standalone playground (sliders for vitals/GCS, build
controls including direct hair/eyebrow pickers, preset states, dropdowns to
browse every raw eyes/mouth variant by name, an SVG-source viewer) that runs
the exact same avatar functions against slider input instead of a real
session — for iterating on the artwork/thresholds without needing a live
scenario. It loads `avatar_assets.js` the same way `sim_patient.html` does
(shared data, no duplication), but keeps its own copy of the render
functions (`updateAvatarFace()` etc — not shared via a script include) since
the two have different plumbing around them (real session state vs. slider
state).

### Graph rendering

`renderGraph()` in `sim_control.html` is hand-rolled SVG (no charting
library) — fixed `viewBox` coordinate math (`xForMin`/`yFor`), with
ghost-line overlays for "no treatment" baseline and "plan before the last
change." If extending it, follow the existing layering order (grid →
rhythm markers → ghosts → main paths → hit-paths → override markers →
playhead → ...) — later layers draw on top.

### Manual editing — Add/Move/Remove tools, rebuild-from-flat-list model

Edit Mode lets the assessor hand-author overrides directly on the graph.
Arm a tile (`handleVtileClick`), then use one of three tools (icon buttons,
bottom-left of the graph, `setEditTool()`):

- **Add** — tap/drag anywhere after "now" drops a point there.
- **Move** — drags ANY existing future point (including ones from the
  scenario's original AI-generated timeline, not just manually-added
  ones) to a new value/time, and it's free to cross past a neighbouring
  point in time to reorder them — "now" is the only floor, there's no
  constraint against crossing siblings.
- **Remove** — tap a point (confirm) to delete it.

All three funnel through `handleGraphZonePointerDown()`, which branches on
`editTool`. Move/Remove locate the target point via `findNearestFuturePoint()`
— a generous-radius distance check in pixel space, not native SVG hit-testing
against a tiny circle (which was unreliable on touch — see Gotchas). Marker
circles are purely decorative (`pointer-events:none`) for exactly that
reason: without it, an inert circle silently swallows taps meant for the
invisible catcher underneath.

The underlying model: rather than upserting one entry in place, a
series' entire future is rebuilt every time from a flat, unordered
`{value, atMs}` target list (`futureTargetsFor()` reads the current one,
`rebuildSeriesArray()`/`rebuildGcsArrays()` sort it by time and re-chain
end-to-end with no gaps). This is what makes reordering — and deleting
out of the middle without leaving a gap — both just work: nothing holds
a point by reference to its neighbours, everything is recomputed from
scratch each time a point is added, moved, or removed. Releasing commits
immediately (`commitPendingPoint()`, no confirm step for Add/Move) and
leaves the tool armed for the next action.

BP arms two series at once (sys+dia sharing one tile); Add resolves a
click to whichever series is visually closer in Y at that moment
(`resolveArmedSeriesAtClick`).

This only changes the *editing interaction* — the underlying interpolation
is still the same straight-line ramp `sim_engine.js` always computed, so
what the patient's monitor displays is unaffected.

**Performance**: this whole area re-renders the entire SVG on every
pointermove while dragging, which was genuinely laggy/unresponsive on
iPad. Two mitigations: `scheduleGraphRender()` throttles renders to one
per animation frame instead of one per pointer event, and `SAMPLES` (the
per-series sample count in `renderGraph()`) drops while `pendingDrag` is
set. Separately, `sim_engine.js`'s `applyOverrides()` now caches the
sorted overrides array per array reference (WeakMap) instead of
re-sorting on every single sample — it was re-sorting the same small
array dozens of times per render, across both pages, not just while
editing.

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
- **A decorative SVG element without `pointer-events:none` silently
  swallows clicks meant for whatever's underneath it** — it doesn't need
  an `onclick`/`onpointerdown` to intercept the event, just to exist on
  top in z-order. Bit the graph's marker circles once already (drawn
  after the invisible catcher rect, with no handlers, no `pointer-events`
  override — any tap landing on one did nothing instead of reaching the
  catcher). Anything added to `renderGraph()`'s output purely for display
  needs `pointer-events:none` if it can overlap an interactive layer
  drawn earlier.
- `renderGraph()`-local closures (`xForMin`, `yFor`) are NOT the same
  functions as the standalone `minForX`/`valForY`/`xForMinVal`/`yForVal`
  outside it, despite near-identical names/math — code called from
  outside a render pass (hit-testing, tool logic) must use the standalone
  versions (which read `_lastLayout`), not assume the local ones are in
  scope. Mixing them up is a silent `ReferenceError` at the call site.
- Git flow observed so far: work on a `claude/*` branch, fast-forward merge
  to `main` directly (no PR process used yet) — GitHub Pages redeploys
  automatically on every push to `main`.
- **`max-height:<percent>` on an element inside a flex column compounds with
  the container's own flex-shrink, instead of just capping it once.** Bit
  `sim_patient.html`'s avatar: its containing block (`#head-wrap`, sized
  by content) has no explicit height, so the percentage resolves against
  whatever *already-shrunk* height the flex algorithm just gave it — every
  time something elsewhere in the column grows (e.g. the voice-modal panel
  taking more vertical space), the avatar shrinks by 45% of an already-
  reduced box, not 45% of the original one, compounding on every layout
  pass. `#patient-graphic img { max-width:100%; max-height:100%; object-fit:
  contain; }` doesn't have this problem — `object-fit:contain` scales
  exactly once against whatever final box the flex layout settles on. Any
  new image/SVG dropped into a flex column here should use that pattern,
  not an ad hoc percentage.
- **A flex item's default `min-height`/`min-width` is `auto`, which resolves
  to its own content size — not 0 — and silently wins over `max-height`/
  `max-width` when they conflict.** Bit `#head-wrap` when the avatar's SVG
  grew from a small hand-drawn placeholder to real artwork sized to its full
  viewBox: `max-height:100%` looked like it should cap the element, but the
  browser was still enforcing an implicit minimum equal to the SVG's
  intrinsic height (from its `width`/`height` attributes) — so instead of
  shrinking, `#head-wrap` refused to shrink and got pushed out of its
  `overflow:hidden` container by `#patient-graphic`'s `justify-content:
  center` (the *top* of the face — eyes, eyebrows — went missing, since
  centering overflow clips symmetrically and head-wrap is the first child).
  Setting `min-height:0` fixes the clip but can overcorrect the other way —
  once nothing protects it, `#head-wrap` can lose ALL the flex-shrink
  contest to sibling elements with their own intact auto-minimums (here,
  `#voice-fab-strip` has `flex-shrink:0`, so all the pressure landed on
  `#head-wrap` alone and it collapsed toward 0). The actual fix is a small
  explicit floor — `min-height:50px; min-width:50px;` — small enough to let
  real shrinking happen under space pressure, non-zero so the avatar can't
  fully disappear. Any element sized from an SVG/image's own intrinsic
  dimensions inside a shrinking flex container needs an explicit min-size;
  never assume `max-*` alone is enough.
