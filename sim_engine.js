/* sim_engine.js
 * Shared deterministic vitals-trajectory engine for the real-time scenario tool.
 * Both student and assessor views load this file and compute vitals independently
 * from the SAME inputs (baseline, severity, treatment event log, elapsed time) —
 * no server-side "ticking" process required. Only the event log needs to sync.
 *
 * Public API:
 *   SimEngine.getVitals(scenarioConfig, nowMs) -> { HR, BP:{sys,dia}, SpO2, RR, EtCO2, ...+ raw trend }
 *   SimEngine.SEVERITY_PRESETS
 *   SimEngine.DRUG_LIBRARY (starter set; to be expanded from CPG data)
 */
(function (global) {
  'use strict';

  // ---- Severity presets ------------------------------------------------
  // Each preset describes where CONTINUOUS vitals trend toward, and how long
  // the deterioration/improvement takes to reach that target from baseline.
  const SEVERITY_PRESETS = {
    mild:     { label: 'Mild',     rampMinutes: 20, target: { HR: 15,  RR: 4,  SpO2: -3,  EtCO2: 3,  BPsys: -6,  BPdia: -3  } },
    moderate: { label: 'Moderate', rampMinutes: 14, target: { HR: 30,  RR: 8,  SpO2: -7,  EtCO2: 6,  BPsys: -15, BPdia: -8  } },
    severe:   { label: 'Severe',   rampMinutes: 9,  target: { HR: 45,  RR: 14, SpO2: -14, EtCO2: 10, BPsys: -30, BPdia: -15 } },
    critical: { label: 'Critical', rampMinutes: 5,  target: { HR: 60,  RR: 20, SpO2: -22, EtCO2: 15, BPsys: -45, BPdia: -22 } }
  };
  // target deltas are ADDED to baseline (or subtracted, e.g. SpO2) as the ramp progresses.
  // Direction (deteriorating vs improving) is controlled by scenarioConfig.direction.
  // NOTE: BP deltas assume a shock-type deterioration (BP falling as condition
  // worsens, e.g. anaphylaxis, sepsis, haemorrhage). Not every condition behaves
  // this way (e.g. some causes of deterioration raise BP) — this is a generic
  // placeholder shared across all severities/conditions for now, same
  // simplification already applied to HR/RR/SpO2/EtCO2, flagged for review
  // once conditions become distinguishable (i.e. once a scenario library exists).

  // ---- Starter drug library ---------------------------------------------
  // Onset/peak/duration in minutes. Effect deltas applied on top of trend value
  // at treatment's current "potency" (rises to peak, then wanes over duration).
  // NOTE: starter values only — flag for Tim's clinical review before trusting.
  const DRUG_LIBRARY = {
    'morphine':   { route: 'IV', onsetMin: 2,  peakMin: 10, durationMin: 90,
                    effectPerMg: { RR: -1.2, HR: -2, SpO2: -0.5 } },
    'fentanyl':   { route: 'IV', onsetMin: 1,  peakMin: 5,  durationMin: 45,
                    effectPerMcg: { RR: -0.05, HR: -0.1 } },
    'salbutamol': { route: 'NEB', onsetMin: 3, peakMin: 15, durationMin: 120,
                    effectPerMg: { HR: 4, RR: -1 } },
    'adrenaline': { route: 'IM', onsetMin: 3,  peakMin: 8,  durationMin: 20,
                    effectPerMg: { HR: 25, RR: -3, SpO2: 4 } },
    'oxygen':     { route: 'O2', onsetMin: 0.5, peakMin: 2, durationMin: 9999,
                    effectPerL: { SpO2: 1.2, EtCO2: -0.3 } },
    'glucose10':  { route: 'IV', onsetMin: 1,  peakMin: 10, durationMin: 60,
                    effectPerGram: { HR: -1 } } // rough proxy for correcting hypoglycaemia tachycardia
  };

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

  function rampProgress(elapsedMin, rampMinutes) {
    // 0 -> 1 over rampMinutes, then holds at 1 (plateau at target severity)
    if (rampMinutes <= 0) return 1;
    return Math.max(0, Math.min(1, elapsedMin / rampMinutes));
  }

  function treatmentPotency(elapsedMinSinceGiven, drug) {
    // 0 -> 1 rising to peak, holds briefly, then decays to 0 by end of duration.
    if (elapsedMinSinceGiven < 0) return 0;
    if (elapsedMinSinceGiven <= drug.onsetMin) {
      return (elapsedMinSinceGiven / Math.max(drug.onsetMin, 0.01)) * 0.3; // slow start
    }
    if (elapsedMinSinceGiven <= drug.peakMin) {
      const span = Math.max(drug.peakMin - drug.onsetMin, 0.01);
      return 0.3 + 0.7 * ((elapsedMinSinceGiven - drug.onsetMin) / span);
    }
    if (elapsedMinSinceGiven >= drug.durationMin) return 0;
    const waneSpan = Math.max(drug.durationMin - drug.peakMin, 0.01);
    return Math.max(0, 1 - (elapsedMinSinceGiven - drug.peakMin) / waneSpan);
  }

  function doseAmount(event) {
    // event.dose is a plain number; unit implied by drug's effect key (mg/mcg/L/gram)
    return typeof event.dose === 'number' ? event.dose : 1;
  }

  function applyTreatments(baseDeltas, events, nowMin, instantMode) {
    const deltas = Object.assign({}, baseDeltas);
    events.forEach(ev => {
      const drug = DRUG_LIBRARY[ev.drug];
      if (!drug) return; // unknown drug -> no modelled effect yet
      const potency = instantMode ? 1 : treatmentPotency(nowMin - ev.givenAtMin, drug);
      if (potency <= 0) return;
      const effectKey = Object.keys(drug).find(k => k.startsWith('effectPer'));
      const effects = drug[effectKey] || {};
      const amount = doseAmount(ev);
      Object.keys(effects).forEach(vital => {
        deltas[vital] = (deltas[vital] || 0) + effects[vital] * amount * potency;
      });
    });
    return deltas;
  }

  // ---- Raw trend (no overrides, no jitter): baseline + severity ramp + treatments,
  // evaluated at an arbitrary point in time (not just "now"). This is what overrides
  // are layered on top of.
  function rawTrendDeltasAt(cfg, tMs) {
    const elapsedMin = Math.max(0, (tMs - cfg.startTimeMs) / 60000);
    const preset = SEVERITY_PRESETS[cfg.severity] || SEVERITY_PRESETS.moderate;
    const dir = cfg.direction === 'improving' ? -1 : (cfg.direction === 'stable' ? 0 : 1);
    const progress = cfg.instantMode ? 1 : rampProgress(elapsedMin, preset.rampMinutes);
    let deltas = {
      HR: preset.target.HR * progress * dir,
      RR: preset.target.RR * progress * dir,
      SpO2: preset.target.SpO2 * progress * dir,
      EtCO2: preset.target.EtCO2 * progress * dir,
      BPsys: preset.target.BPsys * progress * dir,
      BPdia: preset.target.BPdia * progress * dir
    };
    return applyTreatments(deltas, cfg.treatments || [], elapsedMin, cfg.instantMode);
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
  function applyOverrides(cfg, key, nowMs) {
    const events = (cfg.overrides && cfg.overrides[key]) || [];
    const raw = (t) => rawTrendAt(cfg, key, t);
    let offset = 0;
    const sorted = events.slice().sort((a, b) => a.startMs - b.startMs);
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
  //   baseline: { HR, RR, SpO2, EtCO2, BPsys, BPdia },
  //   severity: 'mild'|'moderate'|'severe'|'critical',
  //   direction: 'deteriorating'|'improving'|'stable',
  //   startTimeMs: <scenario start epoch ms>,
  //   treatments: [{ drug:'morphine', dose:5, givenAtMin: 3.2 }, ...],
  //   overrides: { HR: [{targetValue,startMs,endMs}], BPsys: [...], ... },
  //   instantMode: boolean (skips onset/peak delay, effect applies immediately)
  // }
  function getVitals(scenarioConfig, nowMs) {
    const cfg = scenarioConfig;
    const nowSec = Math.floor(nowMs / 1000);

    const hrVal    = applyOverrides(cfg, 'HR', nowMs);
    const rrVal    = applyOverrides(cfg, 'RR', nowMs);
    const spo2Val  = Math.min(100, applyOverrides(cfg, 'SpO2', nowMs));
    const etco2Val = applyOverrides(cfg, 'EtCO2', nowMs);
    const bpSysVal = applyOverrides(cfg, 'BPsys', nowMs);
    const bpDiaVal = applyOverrides(cfg, 'BPdia', nowMs);

    return {
      HR: Math.round(jitter(hrVal, 2, nowSec, 1)),
      RR: Math.round(jitter(rrVal, 1, nowSec, 2)),
      SpO2: Math.round(Math.min(100, jitter(spo2Val, 0.5, nowSec, 3))),
      EtCO2: Math.round(jitter(etco2Val, 1, nowSec, 4)),
      BPsys: Math.round(bpSysVal),
      BPdia: Math.round(bpDiaVal),
      _elapsedMin: Math.max(0, (nowMs - cfg.startTimeMs) / 60000)
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

  global.SimEngine = { SEVERITY_PRESETS, DRUG_LIBRARY, ACTION_DURATIONS, getActionDurationSec, getVitals, getSimNow };
})(typeof window !== 'undefined' ? window : this);

