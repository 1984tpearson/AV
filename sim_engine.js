/* sim_engine.js
 * Shared deterministic vitals-trajectory engine for the real-time scenario tool.
 * Both student and assessor views load this file and compute vitals independently
 * from the SAME inputs (baseline, severity, treatment event log, elapsed time) —
 * no server-side "ticking" process required. Only the event log needs to sync.
 *
 * Public API:
 *   SimEngine.getVitals(scenarioConfig, nowMs) -> { HR, BP:{sys,dia}, SpO2, RR, EtCO2, ...+ raw trend }
 */
(function (global) {
  'use strict';

  // ---- Severity presets ------------------------------------------------
  // REMOVED: the old generic severity/direction-driven autonomous ramp.
  // Vitals progression is now entirely authored per-scenario by AI-generated
  // overrides (see scenario_sim_timelines), which are clinically grounded in
  // the specific condition rather than a generic shock-pattern placeholder.
  // rawTrendDeltasAt() below now just returns a flat (zero) baseline trend.

  // ---- Treatments -------------------------------------------------------
  // REMOVED: the old generic per-drug effect table (DRUG_LIBRARY) and its
  // onset/peak/duration potency curve. Treatment effects are now decided by
  // the AI per-patient, per-condition, per-action — it directly authors new
  // overrides for the future (see regenerateTimelineAfterTreatment() in
  // sim_control.html) rather than this engine applying a generic delta.
  // cfg.treatments is still stored/logged for the assessor's record, but no
  // longer feeds vitals calculation here.

  // ---- Action durations (reveal-delay system) ---------------------------
  // Seconds each assessment action takes before its value/waveform reveals.
  // ecg12lead is conditional: faster if monitoring leads are already on.
  const ACTION_DURATIONS = {
    ecg: 20,
    ecg12lead: { withMonitoring: 35, fromScratch: 50 },
    rr: 30,
    spo2: 12,
    etco2: 15,
    bp: 35,
    temp: 8,
    gcs: 5,
    bgl: 15,
    ketones: 15,
    pain: 3
  };
  function getActionDurationSec(key, context) {
    const d = ACTION_DURATIONS[key];
    if (typeof d === 'number') return d;
    if (key === 'ecg12lead') {
      return (context && context.ecgApplied) ? d.withMonitoring : d.fromScratch;
    }
    return 10; // fallback
  }

  // ---- Raw trend (no overrides, no jitter): flat baseline, evaluated at an
  // arbitrary point in time (not just "now"). This is what overrides are
  // layered on top of. Treatments no longer contribute here (see note above).
  function rawTrendDeltasAt(cfg, tMs) {
    return {
      HR: 0, RR: 0, SpO2: 0, EtCO2: 0, BPsys: 0, BPdia: 0,
      temp: 0, bgl: 0, ketones: 0, pain: 0, nausea: 0, gcsE: 0, gcsV: 0, gcsM: 0
    };
  }
  function rawTrendAt(cfg, key, tMs) {
    const deltas = rawTrendDeltasAt(cfg, tMs);
    const raw = cfg.baseline[key] + (deltas[key] || 0);
    return key === 'SpO2' ? Math.min(100, raw) : raw;
  }

  // ---- Overrides -----------------------------------------------------------
  // overrides[key] = [{ targetValue, startMs, endMs }, ...] sorted by time.
  // A completed override becomes a permanent additive OFFSET from the raw curve
  // from that point on (so the vital keeps drifting per the underlying trend/
  // treatments, just shifted to pass through the target at the moment the
  // override finished) — i.e. "resume drifting", not "hold and freeze".
  //
  // The graph re-evaluates this many times per render (once per sample point,
  // per visible vital) and callers frequently re-render dozens of times a
  // second while dragging — re-sorting the same small array on every single
  // call was showing up as real, visible lag (particularly on iPad). Cached
  // per array reference, since a given overrides array is only ever appended
  // to, spliced, or replaced wholesale — never sorted in place — so a stale
  // cache entry is impossible: any mutation either changes the reference
  // (cache miss, correctly re-sorts) or wouldn't be reflected without one.
  const _sortedOverridesCache = new WeakMap();
  function sortedOverrides(events) {
    let sorted = _sortedOverridesCache.get(events);
    if (!sorted) {
      sorted = events.slice().sort((a, b) => a.startMs - b.startMs);
      _sortedOverridesCache.set(events, sorted);
    }
    return sorted;
  }
  function applyOverrides(cfg, key, nowMs) {
    const events = (cfg.overrides && cfg.overrides[key]) || [];
    const raw = (t) => rawTrendAt(cfg, key, t);
    let offset = 0;
    const sorted = events.length ? sortedOverrides(events) : events;
    for (let i = 0; i < sorted.length; i++) {
      const ov = sorted[i];
      if (nowMs < ov.startMs) break; // not started yet — ignore
      const startVal = raw(ov.startMs) + offset;
      if (nowMs < ov.endMs) {
        const span = Math.max(ov.endMs - ov.startMs, 1);
        const progress = Math.min(1, Math.max(0, (nowMs - ov.startMs) / span));
        return startVal + (ov.targetValue - startVal) * progress;
      }
      // override complete — shift the curve to pass through target at endMs
      offset = ov.targetValue - raw(ov.endMs);
    }
    return raw(nowMs) + offset;
  }

  // ---- Beat-to-beat jitter -----------------------------------------------
  // Seeded by the current second so any device computing "now" gets a very
  // similar wobble — cosmetic only, doesn't need to match exactly.
  function seededRand(seedInt) {
    const x = Math.sin(seedInt * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  }
  function jitter(value, magnitude, seedSecond, offset) {
    const r = seededRand(seedSecond * 31 + offset) * 2 - 1; // -1..1
    return value + r * magnitude;
  }

  // ---- Main entry point ---------------------------------------------------
  // scenarioConfig = {
  //   baseline: { HR, RR, SpO2, EtCO2, BPsys, BPdia, temp, bgl, ketones, pain, nausea, gcsE, gcsV, gcsM },
  //   startTimeMs: <scenario start epoch ms>,
  //   treatments: [{ action, detail, givenAtMin }, ...] — logged for the record only, doesn't drive vitals here
  //   overrides: { HR: [{targetValue,startMs,endMs}], BPsys: [...], ... },
  //   instantMode: boolean (currently unused now that treatments don't have onset/peak timing here)
  // }
  // ---- Raw (unjittered) vitals — useful for graphing/projection, where the
  // small cosmetic wobble would just add noise to a planning chart.
  function getVitalsRaw(scenarioConfig, nowMs) {
    const cfg = scenarioConfig;
    const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
    return {
      HR: applyOverrides(cfg, 'HR', nowMs),
      RR: applyOverrides(cfg, 'RR', nowMs),
      SpO2: Math.min(100, applyOverrides(cfg, 'SpO2', nowMs)),
      EtCO2: applyOverrides(cfg, 'EtCO2', nowMs),
      BPsys: applyOverrides(cfg, 'BPsys', nowMs),
      BPdia: applyOverrides(cfg, 'BPdia', nowMs),
      temp: applyOverrides(cfg, 'temp', nowMs),
      bgl: Math.max(0, applyOverrides(cfg, 'bgl', nowMs)),
      ketones: Math.max(0, applyOverrides(cfg, 'ketones', nowMs)),
      pain: clamp(applyOverrides(cfg, 'pain', nowMs), 0, 10),
      nausea: clamp(applyOverrides(cfg, 'nausea', nowMs), 0, 10),
      gcsE: clamp(applyOverrides(cfg, 'gcsE', nowMs), 1, 4),
      gcsV: clamp(applyOverrides(cfg, 'gcsV', nowMs), 1, 5),
      gcsM: clamp(applyOverrides(cfg, 'gcsM', nowMs), 1, 6)
    };
  }


  function getVitals(scenarioConfig, nowMs) {
    const nowSec = Math.floor(nowMs / 1000);
    const raw = getVitalsRaw(scenarioConfig, nowMs);
    const hrVal = raw.HR, rrVal = raw.RR, spo2Val = raw.SpO2, etco2Val = raw.EtCO2,
          bpSysVal = raw.BPsys, bpDiaVal = raw.BPdia;

    return {
      HR: Math.round(jitter(hrVal, 2, nowSec, 1)),
      RR: Math.round(jitter(rrVal, 1, nowSec, 2)),
      SpO2: Math.round(Math.min(100, jitter(spo2Val, 0.5, nowSec, 3))),
      EtCO2: Math.round(jitter(etco2Val, 1, nowSec, 4)),
      BPsys: Math.round(bpSysVal),
      BPdia: Math.round(bpDiaVal),
      _elapsedMin: Math.max(0, (nowMs - scenarioConfig.startTimeMs) / 60000)
    };
  }

  // ---- Pause-aware clock --------------------------------------------------
  // Every timestamp fed into getVitals/overrides/treatments should be this
  // "sim time", not raw Date.now(), so the whole trajectory (and any
  // in-progress override transition) genuinely freezes while paused rather
  // than just hiding the fact that time kept moving underneath.
  // cfg needs: isPaused, pausedAtMs (when the current pause began), totalPausedMs
  // (sum of all completed pauses, not including one currently in progress).
  function getSimNow(cfg, rawNowMs) {
    const totalPaused = cfg.totalPausedMs || 0;
    const pausedNow = cfg.isPaused
      ? Math.max(0, rawNowMs - (cfg.pausedAtMs != null ? cfg.pausedAtMs : rawNowMs))
      : 0;
    return rawNowMs - totalPaused - pausedNow;
  }

  // ---- Static-vital history (Temp/GCS/BGL/Ketones/Pain) -------------------
  // These aren't continuous curves — they're point-in-time readings that hold
  // until explicitly reassessed. Modelled as a step function: a list of
  // {..., atMin} entries, and "current value at time T" is whichever entry's
  // atMin is the most recent one at-or-before T.
  function getStaticVitalAt(historyArr, atMin) {
    if (!historyArr || !historyArr.length) return null;
    const sorted = historyArr.slice().sort((a, b) => a.atMin - b.atMin);
    let result = sorted[0];
    for (const ev of sorted) {
      if (ev.atMin <= atMin) result = ev; else break;
    }
    return result;
  }

  // ---- ECG rhythm (AI/assessor-scripted, step function) -------------------
  // HR is just a number and can't tell the ECG display whether the patient
  // is in sinus rhythm, VF, asystole, complete heart block, etc — those are
  // distinct rhythm TYPES, several of which can share the same HR (or lack
  // of one). cfg.overrides.rhythm holds discrete step-change events —
  // { label, startMs } — authored by the AI alongside the numeric vitals
  // whenever an event actually changes the rhythm. "Current rhythm at time
  // T" is whichever entry's startMs is the most recent one at-or-before T;
  // null means nothing's been explicitly scripted yet, so callers should
  // fall back to deriving a plain sinus rate from HR themselves.
  function getRhythmAt(cfg, nowMs) {
    const events = (cfg.overrides && cfg.overrides.rhythm) || [];
    if (!events.length) return null;
    const sorted = events.slice().sort((a, b) => a.startMs - b.startMs);
    let current = null;
    for (const ev of sorted) {
      if (ev.startMs <= nowMs) current = ev.label; else break;
    }
    return current;
  }

  // ---- Defibrillation (shared, deterministic — no AI call) ----------------
  // Fully hardcoded rather than routed through Sonnet/Haiku like drug
  // treatments: defib physiology is well-established and predictable enough
  // not to need per-patient AI reasoning, and — critically — this needs to
  // run instantly on sim_patient.html the moment the crew hits Shock, not
  // after a network round trip to an LLM. Lives here (not in sim_control.html
  // alone) so BOTH pages can compute the identical outcome locally: the
  // patient device runs it the instant Shock is tapped for a zero-delay
  // response, then writes the result to the session row for sim_control.html
  // to pick up on its normal poll (see sim_patient.html's handleShockBtn()
  // and sim_control.html's applyDefibrillation(), which now just does the
  // read/write plumbing around a call here).
  //
  // Modelled loosely on real defibrillation outcomes (AHA/ILCOR-style
  // figures): biphasic first-shock termination of VF/pulseless VT is
  // commonly cited around 60-90% with prompt, adequately-energised shocks,
  // falling off fast with downtime (survival is often quoted as dropping
  // roughly 7-10%/min without bystander CPR, ~3-4%/min with it). Termination
  // of the rhythm on a given shock is NOT the same figure as eventual
  // survival-to-discharge — a patient can need several shocks before
  // converting and still survive overall, or convert on the first shock and
  // still not survive the admission — so this deliberately keeps two related
  // but separate numbers: a per-patient survivability score
  // (computeSurvivabilityScore) and a per-shock conversion chance
  // (computeShockableOutcome) that USES the survivability score as one
  // input among several, rather than being it.

  const HIGH_RISK_CONDITION_KEYWORDS = [
    'heart failure', 'chf', 'cardiomyopathy', 'copd', 'emphysema', 'chronic bronchitis',
    'renal failure', 'dialysis', 'ckd', 'cancer', 'malignancy', 'metastatic',
    'dementia', 'alzheimer', 'stroke', 'cva', 'diabetes', 'obesity', 'morbidly obese',
    'ischaemic heart disease', 'ischemic heart disease', 'coronary artery disease', 'cad',
    'previous mi', 'myocardial infarction', 'atrial fibrillation', 'valve disease',
    'cirrhosis', 'immunocompromised', 'frailty', 'frail'
  ];

  // Age/weight aren't structured fields anywhere in the schema (see
  // CLAUDE.md — only free-text demographics like "45yo Male"), so this
  // parses the same "[age]yo" convention generator.html always writes into
  // title/subtitle/dispatch, same spirit as the gender title-sniffing
  // fallback in sim_patient.html's connectSession(). Weight is similarly
  // free text ("82 kg") in vitals.Weight. scenarioMeta only needs to carry
  // whatever subset of these fields the caller has on hand — every lookup
  // here tolerates a missing field.
  function parseAgeFromScenario(scenario) {
    const text = `${scenario.title || ''} ${scenario.subtitle || ''} ${scenario.dispatch || ''}`;
    const m = text.match(/(\d{1,3})\s*(?:yo\b|y\.?o\.?\b|year[- ]old)/i);
    return m ? parseInt(m[1], 10) : 55; // unknown — a neutral middle-aged default
  }
  function parseWeightKgFromScenario(scenario) {
    const raw = (scenario.vitals && scenario.vitals.Weight) || '';
    const m = String(raw).match(/(\d{1,3}(?:\.\d+)?)/);
    return m ? parseFloat(m[1]) : 80; // unknown — an unremarkable adult default
  }

  // 0-100. Deliberately NOT the same number as any single shock's conversion
  // chance — see the comment above this section.
  function computeSurvivabilityScore(scenario, downtimeMs) {
    let score = 70; // an average adult, witnessed arrest, prompt care
    const age = parseAgeFromScenario(scenario);
    if (age <= 1) score += 10; // infants/neonates are a genuinely different model in reality — out of scope, kept neutral rather than penalised
    else if (age <= 35) score += 15;
    else if (age <= 55) score += 5;
    else if (age <= 70) score -= 5;
    else if (age <= 85) score -= 15;
    else score -= 25;

    const weightKg = parseWeightKgFromScenario(scenario);
    if (weightKg >= 120) score -= 10;
    else if (weightKg >= 100) score -= 5;
    else if (age > 15 && weightKg < 45) score -= 5; // frailty/cachexia proxy — only meaningful for an adult-sized patient

    const conditionsText = (scenario.medical_conditions || []).join(' ').toLowerCase();
    const hits = HIGH_RISK_CONDITION_KEYWORDS.filter(k => conditionsText.includes(k)).length;
    score -= Math.min(30, hits * 6);

    const downtimeMin = downtimeMs / 60000;
    score -= downtimeMin * 5; // downtime dominates, per the AHA figures cited above

    return Math.max(2, Math.min(95, Math.round(score)));
  }

  // Buckets a rhythm label into what matters for a defib decision — NOT the
  // same bucketing as ecg_engine.js's mapRhythm(), which is purely about
  // waveform rendering and conflates clinically distinct things (e.g. PEA
  // and sinus bradycardia both render as its 'sbrad' key, but PEA is
  // pulseless arrest and sinus brady isn't — defib logic cannot use that
  // mapping).
  function classifyRhythmForDefib(label) {
    const s = (label || '').toLowerCase();
    if (/torsades|polymorphic|\bvt\b|ventricular tach|\bvf\b|ventricular fib/.test(s)) return 'shockable';
    if (/asystole|\bpea\b|pulseless electrical/.test(s)) return 'nonshockable-arrest';
    return 'organized';
  }

  // Fallback rhythm when nothing's been explicitly scripted on the rhythm
  // timeline yet (see getRhythmAt above) — the single canonical version
  // both pages' ECG/defib code call, since (unlike the avatar functions)
  // this must produce byte-identical results wherever it runs.
  function deriveRhythmFromHR(hr) {
    if (hr < 60) return 'sinus bradycardia';
    if (hr > 100) return 'sinus tachycardia';
    return 'sinus rhythm';
  }

  // Walks backwards through the rhythm timeline from a shockable/
  // nonshockable-arrest entry to find when this arrest actually began (the
  // start of the contiguous run of arrest-classified entries containing
  // "now") — downtime for the survivability score above. Returns 0 if the
  // patient isn't currently in an arrest rhythm at all.
  function msSinceArrestStart(cfg, nowMs) {
    const events = ((cfg.overrides && cfg.overrides.rhythm) || []).slice().sort((a, b) => a.startMs - b.startMs);
    let idx = -1;
    for (let i = 0; i < events.length; i++) { if (events[i].startMs <= nowMs) idx = i; else break; }
    if (idx === -1 || classifyRhythmForDefib(events[idx].label) === 'organized') return 0;
    let arrestStartMs = events[idx].startMs;
    for (let i = idx - 1; i >= 0; i--) {
      if (classifyRhythmForDefib(events[i].label) === 'organized') break;
      arrestStartMs = events[i].startMs;
    }
    return Math.max(0, nowMs - arrestStartMs);
  }

  // Real-world energy dosing is weight-based for paediatrics (2-4 J/kg) but
  // a fixed protocol dose for adults (typically 120-200J biphasic, with
  // little added benefit much past that) — NOT weight-based for adults, so
  // this deliberately branches on age rather than applying one formula to
  // both.
  function computeEnergyFactor(joules, age, weightKg) {
    if (age < 12) {
      const idealLow = weightKg * 2, idealHigh = weightKg * 4;
      if (joules < idealLow * 0.5) return 0.3;
      if (joules < idealLow) return 0.6;
      if (joules <= idealHigh * 1.5) return 1;
      return 0.85; // over-energised for a child — likely still works, just not the guideline dose
    }
    if (joules < 100) return 0.55;
    if (joules < 120) return 0.8;
    return 1;
  }

  // Per-shock outcome for a genuinely shockable rhythm (VF/pulseless VT/
  // torsades). Three possible outcomes, not just success/fail — post-shock
  // asystole is a real, recognised (if less common) outcome, and is more
  // likely the worse the underlying prognosis.
  function computeShockableOutcome(survivability, energyFactor, downtimeMs) {
    const downtimeMin = downtimeMs / 60000;
    const downtimeDecay = Math.exp(-downtimeMin / 8); // ~50% remaining by ~5.5 min — "every minute counts"
    const survivabilityFactor = 0.4 + (survivability / 100) * 0.8; // even a low-survivability patient can still convert on any given shock
    let convertChance = 0.75 * energyFactor * downtimeDecay * survivabilityFactor;
    convertChance = Math.max(0.03, Math.min(0.92, convertChance));

    let asystoleChance = 0.03 + (1 - survivability / 100) * 0.12;
    asystoleChance = Math.min(0.35, asystoleChance);

    const r = Math.random();
    const outcome = r < convertChance ? 'converted' : r < convertChance + asystoleChance ? 'asystole' : 'unchanged';
    return { outcome, convertChance, asystoleChance };
  }

  // Shocking a patient who has a pulse (organized rhythm) is never actually
  // indicated, but the sim allows it — this models the real risk: an
  // unsynchronised shock landing on a vulnerable point in the cycle can
  // precipitate VF (the R-on-T mechanism, well known as the reason
  // cardioversion is normally synchronised), more likely on already-
  // ischaemic myocardium. Short of that, an unsynchronised shock CAN still
  // cardiovert a disorganised atrial/re-entry tachyarrhythmia back to sinus
  // (cruder and riskier than a proper synchronised cardioversion, but not
  // physiologically impossible) — otherwise it just hurts, with no rhythm
  // change at all.
  function computeOrganizedShockOutcome(rhythmLabel, joules) {
    const s = (rhythmLabel || '').toLowerCase();
    const isIschaemic = /stemi|nstemi|ischaemia|ischemia/.test(s);
    const isTachyarrhythmia = /fibrillation|flutter|svt|supraventricular|tachycardia/.test(s);
    let induceVfChance = isIschaemic ? 0.12 : 0.04;
    induceVfChance *= Math.max(0.6, Math.min(1.3, joules / 150));

    if (Math.random() < induceVfChance) return { outcome: 'induced-vf', induceVfChance };
    if (isTachyarrhythmia && Math.random() < 0.35) return { outcome: 'cardioverted', induceVfChance };
    return { outcome: 'no-change', induceVfChance };
  }

  // A transient bump (onset -> hold -> fade) that fades back to whatever
  // this vital would have been doing anyway rather than a flat pre-shock
  // number — same "evaluate the untouched natural schedule" trick
  // applyCodedEffect (sim_control.html) uses for wearOffMin. Takes cfg
  // directly (not a separately-snapshotted overrides object): this is
  // always called before any splicing happens against cfg, so cfg.overrides
  // is still exactly the untouched pre-shock schedule.
  function buildFadeToNaturalChain(cfg, key, bumpTarget, onsetMin, holdMin, fadeMin, givenAtMs) {
    const holdEndMin = onsetMin + holdMin;
    const fadeEndMin = holdEndMin + fadeMin;
    const fadeEndMs = givenAtMs + fadeEndMin * 60000;
    const naturalAtFadeEnd = getVitalsRaw(cfg, fadeEndMs)[key];
    return [
      { targetValue: bumpTarget, startMin: 0, endMin: onsetMin },
      { targetValue: bumpTarget, startMin: onsetMin, endMin: holdEndMin },
      { targetValue: naturalAtFadeEnd, startMin: holdEndMin, endMin: fadeEndMin }
    ];
  }

  // The main entry point: decides the outcome and builds the override/rhythm
  // plan, but does NOT splice or persist anything — callers pass the result
  // to spliceAiOverridePlan/spliceRhythmPlan below and handle their own I/O
  // (sim_control.html reads/writes the DB directly; sim_patient.html applies
  // to its local testConfig immediately, then syncs to the DB in the
  // background). scenarioMeta needs at most { title, subtitle, dispatch,
  // vitals, medical_conditions } — whatever subset the caller has fetched.
  function computeDefibrillationEffect(cfg, scenarioMeta, joules, givenAtMs) {
    const vitalsNow = getVitalsRaw(cfg, givenAtMs);
    const rhythmLabel = getRhythmAt(cfg, givenAtMs) || deriveRhythmFromHR(vitalsNow.HR);
    const rhythmClass = classifyRhythmForDefib(rhythmLabel);

    const parsedOverrides = {};
    const parsedRhythm = [];
    let note;
    // Tracked separately from the prose note so callers (sim_control.html's
    // pollSession, deciding whether a follow-up AI re-projection is needed)
    // don't have to regex-match the note text — see resultOutcome below.
    let resultOutcome;

    if (rhythmClass === 'shockable') {
      const downtimeMs = msSinceArrestStart(cfg, givenAtMs);
      const survivability = computeSurvivabilityScore(scenarioMeta, downtimeMs);
      const age = parseAgeFromScenario(scenarioMeta);
      const weightKg = parseWeightKgFromScenario(scenarioMeta);
      const energyFactor = computeEnergyFactor(joules, age, weightKg);
      const { outcome, convertChance } = computeShockableOutcome(survivability, energyFactor, downtimeMs);
      resultOutcome = outcome;

      if (outcome === 'converted') {
        const postTachy = Math.random() < 0.65; // catecholamine surge post-ROSC — tachycardia is the more common immediate picture
        const postLabel = postTachy ? 'sinus tachycardia' : 'sinus rhythm';
        const postHR = postTachy ? 100 + Math.random() * 30 : 70 + Math.random() * 30;
        parsedRhythm.push({ label: postLabel, startMin: 0 });
        // Full cascade — ROSC is as much a state transition as arresting is,
        // same "every implied vital, together" rule CLAUDE.md documents for
        // the AI-authored paths.
        parsedOverrides.HR = [{ targetValue: postHR, startMin: 0, endMin: 0.15 }];
        parsedOverrides.BPsys = [{ targetValue: 70 + Math.random() * 25, startMin: 0, endMin: 0.3 }]; // post-ROSC hypotension is the norm, not the exception
        parsedOverrides.BPdia = [{ targetValue: 40 + Math.random() * 20, startMin: 0, endMin: 0.3 }];
        parsedOverrides.SpO2 = [{ targetValue: 85 + Math.random() * 7, startMin: 0, endMin: 1 }, { targetValue: 93 + Math.random() * 5, startMin: 1, endMin: 5 }];
        parsedOverrides.EtCO2 = [{ targetValue: 35 + Math.random() * 10, startMin: 0, endMin: 0.15 }]; // the classic abrupt EtCO2 jump taught as a ROSC sign
        parsedOverrides.RR = [{ targetValue: 4 + Math.random() * 6, startMin: 0, endMin: 0.5 }]; // usually still apnoeic/agonal immediately post-ROSC, needing support
        parsedOverrides.gcsE = [{ targetValue: 1, startMin: 0, endMin: 0.1 }];
        parsedOverrides.gcsV = [{ targetValue: 1, startMin: 0, endMin: 0.1 }];
        parsedOverrides.gcsM = [{ targetValue: 1 + Math.round(Math.random()), startMin: 0, endMin: 0.1 }];
        parsedOverrides.pain = [{ targetValue: 0, startMin: 0, endMin: 0.1 }];
        parsedOverrides.nausea = [{ targetValue: 0, startMin: 0, endMin: 0.1 }];
        note = `Defibrillation ${joules}J: ${rhythmLabel} terminated — ROSC, reverted to ${postLabel}. Survivability score ${survivability}/100, ~${Math.round(convertChance * 100)}% conversion chance modelled for this shock (hardcoded, no AI call).`;
      } else if (outcome === 'asystole') {
        parsedRhythm.push({ label: 'asystole', startMin: 0 });
        parsedOverrides.HR = [{ targetValue: 0, startMin: 0, endMin: 0.1 }];
        parsedOverrides.BPsys = [{ targetValue: 0, startMin: 0, endMin: 0.2 }];
        parsedOverrides.BPdia = [{ targetValue: 0, startMin: 0, endMin: 0.2 }];
        parsedOverrides.SpO2 = [{ targetValue: 0, startMin: 0, endMin: 1 }];
        parsedOverrides.EtCO2 = [{ targetValue: 5 + Math.random() * 5, startMin: 0, endMin: 0.5 }];
        parsedOverrides.RR = [{ targetValue: 0, startMin: 0, endMin: 0.1 }];
        parsedOverrides.gcsE = [{ targetValue: 1, startMin: 0, endMin: 0.1 }];
        parsedOverrides.gcsV = [{ targetValue: 1, startMin: 0, endMin: 0.1 }];
        parsedOverrides.gcsM = [{ targetValue: 1, startMin: 0, endMin: 0.1 }];
        parsedOverrides.pain = [{ targetValue: 0, startMin: 0, endMin: 0.1 }];
        parsedOverrides.nausea = [{ targetValue: 0, startMin: 0, endMin: 0.1 }];
        note = `Defibrillation ${joules}J: deteriorated to asystole post-shock. Survivability score ${survivability}/100 (hardcoded, no AI call).`;
      } else {
        note = `Defibrillation ${joules}J: no effect — remains in ${rhythmLabel}. Survivability score ${survivability}/100, ~${Math.round(convertChance * 100)}% conversion chance modelled for this shock (hardcoded, no AI call).`;
      }
    } else if (rhythmClass === 'nonshockable-arrest') {
      // Real ACLS teaching point: asystole/PEA are not shockable — there's
      // no fibrillating myocardium for a shock to terminate. Deliberately a
      // pure no-op, not a randomised low chance of something.
      resultOutcome = 'nonshockable-arrest';
      note = `Defibrillation ${joules}J: not indicated for ${rhythmLabel} — no effect (hardcoded, no AI call).`;
    } else {
      const conscious = vitalsNow.gcsV >= 4; // same "can this patient perceive/report it" threshold the AI treatment prompt uses for pain/nausea
      const { outcome, induceVfChance } = computeOrganizedShockOutcome(rhythmLabel, joules);
      resultOutcome = outcome;

      if (outcome === 'induced-vf') {
        parsedRhythm.push({ label: 'ventricular fibrillation', startMin: 0.05 });
        parsedOverrides.HR = [{ targetValue: 0, startMin: 0.05, endMin: 0.15 }];
        parsedOverrides.BPsys = [{ targetValue: 0, startMin: 0.05, endMin: 0.25 }];
        parsedOverrides.BPdia = [{ targetValue: 0, startMin: 0.05, endMin: 0.25 }];
        parsedOverrides.SpO2 = [{ targetValue: 0, startMin: 0.05, endMin: 1 }];
        parsedOverrides.EtCO2 = [{ targetValue: 5 + Math.random() * 5, startMin: 0.05, endMin: 0.5 }];
        parsedOverrides.RR = [{ targetValue: 0, startMin: 0.05, endMin: 0.15 }];
        parsedOverrides.gcsE = [{ targetValue: 1, startMin: 0.05, endMin: 0.15 }];
        parsedOverrides.gcsV = [{ targetValue: 1, startMin: 0.05, endMin: 0.15 }];
        parsedOverrides.gcsM = [{ targetValue: 1, startMin: 0.05, endMin: 0.15 }];
        parsedOverrides.pain = [{ targetValue: 0, startMin: 0.05, endMin: 0.15 }];
        parsedOverrides.nausea = [{ targetValue: 0, startMin: 0.05, endMin: 0.15 }];
        note = `Defibrillation ${joules}J: inappropriate shock on ${rhythmLabel} precipitated ventricular fibrillation (~${Math.round(induceVfChance * 100)}% chance modelled, hardcoded, no AI call).`;
      } else if (outcome === 'cardioverted') {
        parsedRhythm.push({ label: 'sinus rhythm', startMin: 0 });
        parsedOverrides.HR = [{ targetValue: 70 + Math.random() * 25, startMin: 0, endMin: 0.15 }];
        if (conscious) parsedOverrides.pain = buildFadeToNaturalChain(cfg, 'pain', 8 + Math.random() * 2, 0.05, 0.5, 4, givenAtMs);
        note = `Defibrillation ${joules}J: ${rhythmLabel} cardioverted to sinus rhythm${conscious ? ' — painful, unsynchronised shock' : ''} (hardcoded, no AI call).`;
      } else if (conscious) {
        parsedOverrides.pain = buildFadeToNaturalChain(cfg, 'pain', 8 + Math.random() * 2, 0.05, 0.5, 4, givenAtMs);
        parsedOverrides.HR = buildFadeToNaturalChain(cfg, 'HR', vitalsNow.HR + 20 + Math.random() * 15, 0.05, 0.5, 3, givenAtMs);
        note = `Defibrillation ${joules}J: no rhythm change (remains ${rhythmLabel}) — painful stimulus only (hardcoded, no AI call).`;
      } else {
        note = `Defibrillation ${joules}J: no rhythm change (remains ${rhythmLabel}); patient unresponsive, no pain response (hardcoded, no AI call).`;
      }
    }

    // A follow-up AI re-projection is only worth it for an outcome that
    // actually changes the patient's underlying trajectory going forward —
    // ROSC or a successful cardioversion. An unattended VF/VT would, in
    // reality, eventually degrade further on its own, but that's not worth
    // modelling: a crew that does nothing after a failed shock has
    // effectively walked away, not created a scenario branch worth AI time.
    // asystole/nonshockable-arrest/induced-vf are all static without further
    // intervention, and "no-change" never touched the rhythm at all — none
    // of those need anything beyond the hardcoded cascade already applied.
    // 5 minutes safely clears the longest hardcoded cascade phase in either
    // qualifying outcome (ROSC's SpO2 recovery ends at minute 5; a
    // cardioverted patient's pain fade-out ends around minute 4.55) so a
    // follow-up plan splicing in at that point never clobbers this cascade.
    const followUpDelayMin = (resultOutcome === 'converted' || resultOutcome === 'cardioverted') ? 5 : null;

    return { parsedOverrides, parsedRhythm, note, vitalsNow, outcome: resultOutcome, followUpDelayMin };
  }

  // Splices a computed override plan (AI-authored, or the hardcoded defib
  // plan above) into the session's existing overrides. For every vital key
  // the plan actually returned entries for: anything already fully in the
  // past is kept as accurate history, anything mid-transition right now is
  // truncated to end exactly at givenAtMs (at its real current value), and
  // anything still in the future is dropped before the new chain is
  // appended — otherwise the engine (which always uses whichever override,
  // in start-time order, contains "now") would let the OLD trajectory keep
  // winning for its entire remaining duration. A vital the plan didn't
  // mention is left completely untouched — omission means "keep whatever
  // was already scheduled", not "erase it with nothing to replace it".
  // Graph-UI side effects (auto-enabling a series' visibility) are the
  // caller's responsibility, not this function's — this file has no DOM.
  function spliceAiOverridePlan(freshOverrides, parsedOverrides, vitalsNow, givenAtMs) {
    const affectedKeys = new Set(Object.keys(parsedOverrides || {}).filter(k => Array.isArray(parsedOverrides[k]) && parsedOverrides[k].length));
    Object.keys(freshOverrides).forEach(key => {
      if (!affectedKeys.has(key)) return;
      const arr = freshOverrides[key] || [];
      const kept = [];
      arr.forEach(ov => {
        if (ov.endMs <= givenAtMs) {
          kept.push(ov);
        } else if (ov.startMs < givenAtMs) {
          kept.push({ startMs: ov.startMs, endMs: givenAtMs, targetValue: vitalsNow[key] });
        }
        // else: startMs >= givenAtMs — superseded future plan, drop (this vital IS being replaced below)
      });
      freshOverrides[key] = kept;
    });
    Object.entries(parsedOverrides || {}).forEach(([key, arr]) => {
      if (!Array.isArray(arr) || !arr.length) return;
      const cleanArr = arr
        .filter(ov => typeof ov.targetValue === 'number' && typeof ov.startMin === 'number' && typeof ov.endMin === 'number')
        .map(ov => ({
          targetValue: ov.targetValue,
          startMs: givenAtMs + Math.min(60, Math.max(0, ov.startMin)) * 60000,
          endMs: givenAtMs + Math.min(60, Math.max(0, ov.endMin)) * 60000
        }));
      if (!freshOverrides[key]) freshOverrides[key] = [];
      freshOverrides[key] = freshOverrides[key].concat(cleanArr);
    });
    return freshOverrides;
  }

  // Splices a computed rhythm plan into freshOverrides.rhythm — a separate,
  // much simpler mechanism from spliceAiOverridePlan because a rhythm is a
  // discrete step-change list (see getRhythmAt above), not an interpolated
  // curve: no in-progress truncation is needed, just drop anything scheduled
  // at/after givenAtMs (a superseded future plan) and append the new
  // entries. If the plan didn't return a rhythm array at all, the existing
  // schedule — including its future — is left completely alone, same
  // "omission means don't touch it" rule as vitals.
  function spliceRhythmPlan(freshOverrides, parsedRhythm, givenAtMs) {
    if (!Array.isArray(parsedRhythm) || !parsedRhythm.length) return;
    const existing = ((freshOverrides.rhythm || [])).filter(ev => ev.startMs < givenAtMs);
    const clean = parsedRhythm
      .filter(ev => typeof ev.label === 'string' && ev.label.trim() && typeof ev.startMin === 'number')
      .map(ev => ({ label: ev.label.trim(), startMs: givenAtMs + Math.min(60, Math.max(0, ev.startMin)) * 60000 }));
    freshOverrides.rhythm = existing.concat(clean);
  }

  // ---- Live appearance state (derived from vitals, no AI) -----------------
  // Same severity bands sim_control.html's assessor-facing Appearance tab
  // uses, kept here as the one shared source so sim_patient.html's avatar
  // reads identical thresholds instead of a second drifting copy. Only
  // gates on consciousness where a working brain is actually required
  // (eye-opening) — skin colour/moisture/work-of-breathing are physical
  // findings and stay live regardless of GCS.
  function hrSeverity(hr) {
    if (hr <= 0) return 4;
    if (hr < 40 || hr > 140) return 3;
    if (hr < 50 || hr > 120) return 2;
    if (hr < 60 || hr > 100) return 1;
    return 0;
  }
  function rrSeverity(rr) {
    if (rr <= 0) return 4;
    if (rr <= 6 || rr > 30) return 3;
    if (rr <= 9 || rr > 24) return 2;
    if (rr < 12 || rr > 20) return 1;
    return 0;
  }
  function spo2Severity(spo2) {
    if (spo2 < 80) return 4;
    if (spo2 < 85) return 3;
    if (spo2 < 90) return 2;
    if (spo2 < 95) return 1;
    return 0;
  }
  function painSeverity(pain) {
    if (pain >= 7) return 3;
    if (pain >= 4) return 2;
    if (pain >= 1) return 1;
    return 0;
  }
  function bpSysSeverity(sys) {
    if (sys <= 0) return 4;
    if (sys < 70) return 3;
    if (sys < 90) return 2;
    if (sys < 100) return 1;
    return 0;
  }
  // Real session data can momentarily lack a key (older scenarios, a field
  // mid-splice) or carry a non-finite value — this must never throw, since
  // sim_patient.html's tick() depends on everything after its avatar call
  // still running (timer, override polling, etc). Non-finite input maps to
  // a safe, unremarkable default rather than propagating NaN into severity
  // comparisons (which silently evaluate false, not throw, but would render
  // a misleading "resting" appearance instead of an honest fallback).
  function numOr(x, fallback) {
    return Number.isFinite(x) ? x : fallback;
  }
  function clamp01(x) { return Math.max(0, Math.min(1, x)); }
  // Continuous 0-1 counterparts to the discrete severity bands above — same
  // clinical thresholds (e.g. spo2Abnormality reaches 1 right where
  // spo2Severity would hit its top band), but smoothly graduated instead of
  // stepped. These exist purely to drive how DEEP a live appearance effect
  // (skin tint blend, sweat amount) reads, not to change which clinical
  // category applies — the discrete severity()/skinColour/moisture logic
  // below is untouched, so nothing that read those band labels changes
  // behaviour. Without this, applySkinTint()/setSweat() had only an on/off
  // (or fixed-blend) signal to work with, so the avatar's skin tint and
  // diaphoresis snapped straight to a fixed intensity the instant a
  // threshold ticked over, rather than deepening as the vital drifted
  // further past it.
  function hrAbnormality(hr) {
    if (hr <= 0) return 1;
    return Math.max(clamp01((60 - hr) / 60), clamp01((hr - 100) / 100));
  }
  function bpSysAbnormality(sys) {
    if (sys <= 0) return 1;
    return clamp01((100 - sys) / 60);
  }
  function spo2Abnormality(spo2) {
    return clamp01((95 - spo2) / 20);
  }
  function painAbnormality(pain) {
    return clamp01(pain / 10);
  }
  function getAppearanceState(v) {
    v = v || {};
    const hr = numOr(v.HR, 80), rr = numOr(v.RR, 16), spo2 = numOr(v.SpO2, 98),
          bpSys = numOr(v.BPsys, 120), pain = numOr(v.pain, 0),
          gcsE = numOr(v.gcsE, 4), gcsV = numOr(v.gcsV, 5), gcsM = numOr(v.gcsM, 6);
    const unresponsive = (gcsE + gcsV + gcsM) <= 8;
    const hypoxia = spo2Severity(spo2);
    const perfusion = Math.max(hrSeverity(hr), bpSysSeverity(bpSys));
    const distressLevel = Math.max(hrSeverity(hr), rrSeverity(rr), hypoxia, painSeverity(pain));
    const hypoxiaFrac = spo2Abnormality(spo2);
    const perfusionFrac = Math.max(hrAbnormality(hr), bpSysAbnormality(bpSys));
    let skinColour;
    if (hypoxia >= 3) skinColour = 'cyanotic';
    else if (perfusion >= 3) skinColour = 'mottled';
    else if (perfusion >= 1 || hypoxia >= 1) skinColour = 'pale';
    else skinColour = 'normal';
    // How strongly to blend toward that category's tint hex — graduated
    // within the category (deeper hypoxia/perfusion = deeper tint) rather
    // than a fixed amount, so e.g. SpO2 easing from 84 down to 75 keeps
    // visibly darkening instead of looking identical the whole way down.
    let skinTintAmount = 0;
    if (skinColour === 'cyanotic') skinTintAmount = 0.3 + hypoxiaFrac * 0.4;
    else if (skinColour === 'mottled') skinTintAmount = 0.25 + perfusionFrac * 0.35;
    else if (skinColour === 'pale') skinTintAmount = 0.12 + Math.max(hypoxiaFrac, perfusionFrac) * 0.3;
    const moistureLvl = Math.max(perfusion, painSeverity(pain));
    const moisture = moistureLvl >= 2 ? 'diaphoretic' : moistureLvl >= 1 ? 'clammy' : 'dry';
    // Continuous 0-1 sweat amount — same clammy/diaphoretic categories drive
    // which visual tier shows, but this lets drop size/opacity/count ramp
    // smoothly with severity instead of the sweat graphic just snapping
    // fully on the moment moisture crosses into "clammy".
    const moistureFrac = Math.max(perfusionFrac, painAbnormality(pain));
    const wob = rr <= 0 ? 'apnoeic' : rr <= 4 ? 'agonal' : Math.max(rrSeverity(rr), hypoxia);
    return { unresponsive, distressLevel, skinColour, skinTintAmount, moisture, moistureFrac, wob, gcsE, pain };
  }

  global.SimEngine = {
    ACTION_DURATIONS, getActionDurationSec, getVitals, getVitalsRaw, getSimNow, getStaticVitalAt, getRhythmAt, getAppearanceState,
    deriveRhythmFromHR, classifyRhythmForDefib, computeSurvivabilityScore, computeDefibrillationEffect, spliceAiOverridePlan, spliceRhythmPlan,
    parseAgeFromScenario
  };
})(typeof window !== 'undefined' ? window : this);

