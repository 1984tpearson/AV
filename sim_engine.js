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

  global.SimEngine = { ACTION_DURATIONS, getActionDurationSec, getVitals, getVitalsRaw, getSimNow, getStaticVitalAt, getRhythmAt };
})(typeof window !== 'undefined' ? window : this);

