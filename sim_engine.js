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
    mild:     { label: 'Mild',     rampMinutes: 20, target: { HR: 15,  RR: 4,  SpO2: -3,  EtCO2: 3  } },
    moderate: { label: 'Moderate', rampMinutes: 14, target: { HR: 30,  RR: 8,  SpO2: -7,  EtCO2: 6  } },
    severe:   { label: 'Severe',   rampMinutes: 9,  target: { HR: 45,  RR: 14, SpO2: -14, EtCO2: 10 } },
    critical: { label: 'Critical', rampMinutes: 5,  target: { HR: 60,  RR: 20, SpO2: -22, EtCO2: 15 } }
  };
  // target deltas are ADDED to baseline (or subtracted, e.g. SpO2) as the ramp progresses.
  // Direction (deteriorating vs improving) is controlled by scenarioConfig.direction.

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

  // ---- Core trajectory math ----------------------------------------------
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
  //   instantMode: boolean (skips onset/peak delay, effect applies immediately)
  // }
  function getVitals(scenarioConfig, nowMs) {
    const cfg = scenarioConfig;
    const elapsedMin = Math.max(0, (nowMs - cfg.startTimeMs) / 60000);
    const preset = SEVERITY_PRESETS[cfg.severity] || SEVERITY_PRESETS.moderate;
    const dir = cfg.direction === 'improving' ? -1 : (cfg.direction === 'stable' ? 0 : 1);
    const progress = cfg.instantMode ? 1 : rampProgress(elapsedMin, preset.rampMinutes);

    let deltas = {
      HR: preset.target.HR * progress * dir,
      RR: preset.target.RR * progress * dir,
      SpO2: preset.target.SpO2 * progress * dir,
      EtCO2: preset.target.EtCO2 * progress * dir
    };
    deltas = applyTreatments(deltas, cfg.treatments || [], elapsedMin, cfg.instantMode);

    const nowSec = Math.floor(nowMs / 1000);
    const trend = {
      HR: cfg.baseline.HR + deltas.HR,
      RR: cfg.baseline.RR + deltas.RR,
      SpO2: Math.min(100, cfg.baseline.SpO2 + deltas.SpO2),
      EtCO2: cfg.baseline.EtCO2 + deltas.EtCO2
    };

    return {
      HR: Math.round(jitter(trend.HR, 2, nowSec, 1)),
      RR: Math.round(jitter(trend.RR, 1, nowSec, 2)),
      SpO2: Math.round(Math.min(100, jitter(trend.SpO2, 0.5, nowSec, 3))),
      EtCO2: Math.round(jitter(trend.EtCO2, 1, nowSec, 4)),
      BPsys: Math.round(cfg.baseline.BPsys + deltas.HR * 0.4 * (dir >= 0 ? 1 : 1)),
      BPdia: Math.round(cfg.baseline.BPdia + deltas.HR * 0.2),
      _elapsedMin: elapsedMin,
      _progress: progress
    };
  }

  global.SimEngine = { SEVERITY_PRESETS, DRUG_LIBRARY, getVitals };
})(typeof window !== 'undefined' ? window : this);
