/* sim_config_schema.js
 * Shared schema + defaults for the sim-tuning admin editor (sim_config_admin.html).
 * Loaded as a plain global (window.SimConfigSchema), same convention as
 * sim_engine.js/avatar_assets.js/nav.js — no bundler, no ES modules anywhere
 * in this repo. Also loaded by sim_control.html/sim_patient.html, which use
 * ONLY the `default` value of each field (never the metadata) to seed their
 * own local state before merging in whatever was actually saved to the
 * `sim_config` Supabase table.
 *
 * sim_engine.js does NOT load this file (see its own _cfg block) — it keeps
 * its literal defaults inline so it stays self-sufficient if this file fails
 * to load. The defaults for engine-owned fields below (medications.
 * ACTION_DURATIONS, medications.HIGH_RISK_CONDITION_KEYWORDS, medications.
 * MOOD_MAP, severity.*, defib.ENERGY_FACTOR_TABLE) are kept in sync with
 * sim_engine.js's _cfg defaults BY HAND — if you change one, change the
 * other. There is no automated check for this (no build step in this repo).
 *
 * Field shape: { type, default, label, help?, columns? (for type:'table'),
 * validate?(value, sectionData, ctx) -> string|null, readonly?, derivedFrom? }
 *
 * Field types:
 *   number        - scalar
 *   string        - scalar
 *   string_list   - string[]
 *   number_list   - number[] (order is meaningful — do not auto-sort)
 *   map_str_str   - {k: string}
 *   map_str_num   - {k: number}
 *   table         - object[], shape described by `columns`
 *   color_list    - string[] of hex colors
 *   map_str_list  - {k: string[]}
 *   nested_durations - the exact SimEngine.ACTION_DURATIONS shape (a few
 *                   plain-number keys, two conditional {a,b} sub-objects) —
 *                   bespoke renderer in sim_config_admin.html, not a generic
 *                   table, since it's the one field with a genuinely
 *                   irregular per-key shape.
 *
 * Table columns may use `number_range` ([number,number] pair) as a column
 * type, so the stored/edited value for a range field (e.g. CODED_EFFECT_
 * ACTIONS' delta/onsetMin/wearOffMin) matches its runtime array shape
 * exactly — no separate converter needed between admin-edited rows and what
 * sim_control.html actually reads.
 */
(function (global) {
  'use strict';

  function subsetValidate(subsetOfSection, subsetOfField) {
    return function (value, sectionData, ctx) {
      const pool = (ctx && ctx.allSections && ctx.allSections[subsetOfSection] && ctx.allSections[subsetOfSection][subsetOfField])
        || (sectionData && sectionData[subsetOfField]);
      if (!Array.isArray(pool)) return null; // pool not loaded yet — skip, don't block
      const bad = (value || []).filter(v => !pool.includes(v));
      return bad.length ? `Not in ${subsetOfField}: ${bad.join(', ')}` : null;
    };
  }

  function assetKeyValidate(assetGroup) {
    return function (value, sectionData, ctx) {
      const assets = ctx && ctx.AvatarAssets && ctx.AvatarAssets[assetGroup];
      if (!assets) return null; // avatar_assets.js not loaded in this context — skip, don't block
      const validKeys = Object.keys(assets);
      const bad = Object.entries(value || {}).filter(([, v]) => v && !validKeys.includes(v));
      return bad.length ? `Unknown ${assetGroup} key(s): ${bad.map(([k, v]) => `${k}=${v}`).join(', ')}` : null;
    };
  }

  global.SimConfigSchema = {
    sections: {

      medications: {
        label: 'Medications & Treatment Response',
        owner: 'sim_engine.js + sim_control.html',
        fields: {
          ACTION_DURATIONS: {
            type: 'nested_durations',
            label: 'Assessment reveal durations (seconds)',
            help: 'Seconds each assessment action takes before its value/waveform reveals. ecg12lead and bp are conditional (two possible durations depending on context) — the other keys are a plain number.',
            conditionalKeys: {
              ecg12lead: { aLabel: 'withMonitoring (faster — leads already on)', bLabel: 'fromScratch' },
              bp: { aLabel: 'firstApplication (cuff not yet on)', bLabel: 'subsequent' }
            },
            default: {
              ecg: 20,
              ecg12lead: { withMonitoring: 35, fromScratch: 50 },
              rr: 30,
              spo2: 12,
              etco2: 15,
              bp: { firstApplication: 55, subsequent: 35 },
              temp: 8,
              gcs: 5,
              bgl: 15,
              ketones: 15,
              pain: 3
            }
          },
          NO_EFFECT_ACTIONS: {
            type: 'table',
            label: 'No-effect medication catalogue',
            help: 'Drugs/interventions with a deliberately fixed "no modelled vitals effect" outcome — the Haiku router matches free text against this list before falling back to full Sonnet reasoning.',
            columns: [
              { name: 'id', type: 'string' },
              { name: 'label', type: 'string' },
              { name: 'note', type: 'string' }
            ],
            default: [
              { id: 'aspirin', label: 'Aspirin (PO)', note: 'Antiplatelet effect is days-scale — no modelled effect on tracked vitals.' },
              { id: 'dexamethasone', label: 'Dexamethasone', note: 'Steroid — onset of any real effect is hours, not minutes — no modelled effect.' },
              { id: 'hydrocortisone', label: 'Hydrocortisone', note: 'Steroid — same reasoning as dexamethasone — no modelled effect.' },
              { id: 'ceftriaxone', label: 'Ceftriaxone', note: 'Antibiotic — no acute vitals effect.' },
              { id: 'heparin', label: 'Heparin', note: 'Anticoagulant — no acute vitals effect (like aspirin, effect is not on this timescale).' },
              { id: 'tranexamic_acid', label: 'Tranexamic Acid (TXA)', note: 'Reduces mortality over hours, does not rapidly reverse hypovolaemia — deliberately zero acute effect here, this is the correct teaching point, not a simplification.' },
              { id: 'water_for_injection', label: 'Water for Injection', note: 'Diluent, not a drug — no effect.' },
              { id: 'cervical_collar', label: 'Cervical collar / spinal immobilisation', note: 'Mechanical precaution — no modelled effect on tracked vitals.' },
              { id: 'dressing', label: 'Simple wound dressing (non-haemorrhage-control)', note: 'Mechanical — no modelled effect on tracked vitals.' },
              { id: 'ecg_monitor', label: 'ECG / cardiac monitoring application', note: 'Assessment/monitoring, not a treatment — no modelled effect.' },
              { id: 'iv_access', label: 'IV cannulation (access only, nothing given through it)', note: 'Access alone — no modelled effect until something is administered.' },
              { id: 'consent', label: 'Obtaining verbal consent / handover', note: 'Documentation/communication action — no modelled effect.' }
            ]
          },
          CODED_EFFECT_ACTIONS: {
            type: 'table',
            label: 'Coded-effect medication catalogue',
            help: 'Predictable DIRECTION of effect, randomised magnitude/onset, applied directly as a graph override with no AI call. delta/onsetMin/wearOffMin are [min,max] ranges (runtime shape, stored as-is); wearOffMin is optional (only for short-acting agents).',
            columns: [
              { name: 'id', type: 'string' },
              { name: 'label', type: 'string' },
              { name: 'vital', type: 'string', help: "'pain' or 'nausea'" },
              { name: 'delta', type: 'number_range' },
              { name: 'onsetMin', type: 'number_range' },
              { name: 'wearOffMin', type: 'number_range', optional: true }
            ],
            default: [
              { id: 'paracetamol', label: 'Paracetamol (PO/IV)', vital: 'pain', delta: [-3, -1], onsetMin: [10, 20] },
              { id: 'ibuprofen', label: 'Ibuprofen (PO)', vital: 'pain', delta: [-4, -2], onsetMin: [15, 30] },
              { id: 'methoxyflurane', label: 'Methoxyflurane (Penthrox)', vital: 'pain', delta: [-5, -3], onsetMin: [2, 5], wearOffMin: [15, 25] },
              { id: 'splint', label: 'Splinting a limb fracture', vital: 'pain', delta: [-2, -1], onsetMin: [1, 3] },
              { id: 'sling', label: 'Sling / arm immobilisation', vital: 'pain', delta: [-2, -1], onsetMin: [1, 3] },
              { id: 'ondansetron', label: 'Ondansetron (antiemetic)', vital: 'nausea', delta: [-5, -3], onsetMin: [5, 10] },
              { id: 'prochlorperazine', label: 'Prochlorperazine (antiemetic)', vital: 'nausea', delta: [-5, -3], onsetMin: [10, 20] },
              { id: 'metoclopramide', label: 'Metoclopramide (antiemetic)', vital: 'nausea', delta: [-5, -3], onsetMin: [10, 20] }
            ]
          },
          ACTION_LOG_VERB: {
            type: 'map_str_str',
            label: 'Action log phrasing',
            help: 'Friendlier wording for the assessor Log’s completed-action lines than the raw tile label.',
            default: {
              ecg: 'ECG (Lead II) applied', ecg12lead: '12-Lead ECG applied', rr: 'Resp Rate assessed', spo2: 'SpO₂ assessed',
              etco2: 'EtCO₂ assessed', bp: 'BP taken', temp: 'Temperature assessed', gcs: 'GCS assessed',
              bgl: 'BGL taken', ketones: 'Ketones taken', pain: 'Pain score assessed'
            }
          },
          ACTION_LABELS: {
            type: 'map_str_str',
            label: 'Assessment tile labels (patient view)',
            help: 'Display labels for assessment tiles on sim_patient.html, also pushed to Supabase for sim_control.html’s Actions tab.',
            default: {
              ecg: 'ECG (Lead II)', ecg12lead: '12-Lead ECG', spo2: 'SpO₂',
              etco2: 'EtCO₂', bp: 'Blood Pressure', temp: 'Temperature', gcs: 'GCS',
              bgl: 'BGL', ketones: 'Ketones', pain: 'Pain Score'
            }
          },
          HIGH_RISK_CONDITION_KEYWORDS: {
            type: 'string_list',
            label: 'High-risk condition keywords',
            help: 'Free-text substrings matched against a scenario’s medical_conditions to penalize the defib survivability score.',
            default: [
              'heart failure', 'chf', 'cardiomyopathy', 'copd', 'emphysema', 'chronic bronchitis',
              'renal failure', 'dialysis', 'ckd', 'cancer', 'malignancy', 'metastatic',
              'dementia', 'alzheimer', 'stroke', 'cva', 'diabetes', 'obesity', 'morbidly obese',
              'ischaemic heart disease', 'ischemic heart disease', 'coronary artery disease', 'cad',
              'previous mi', 'myocardial infarction', 'atrial fibrillation', 'valve disease',
              'cirrhosis', 'immunocompromised', 'frailty', 'frail'
            ]
          },
          GCS_V2_SOUNDS: {
            type: 'string_list',
            label: 'GCS-Verbal 2 fixed sounds',
            help: 'Fixed, non-AI utterances for GCS-Verbal tier 2 (incomprehensible sounds) — deliberately not left to the AI, so a low-GCS patient never accidentally speaks coherently.',
            default: ['Nnnghhh...', 'Uhhh... hnnn...', 'Mmm... hhh... mmm...', '...ngh... uhh...']
          },
          GCS_V3_WORDS: {
            type: 'string_list',
            label: 'GCS-Verbal 3 fixed words',
            help: 'Fixed, non-AI utterances for GCS-Verbal tier 3 (inappropriate words).',
            default: ["...dog... the blue one...", "...where's... my keys...", '...no... stop the light...', '...mum? ...mum...', '...cold... the cold one...']
          },
          MOOD_MAP: {
            type: 'table',
            label: 'Scenario mood keyword map',
            help: 'Fuzzy-maps a scenario’s free-text mood into the avatar’s expression set. Order matters — checked top-to-bottom, first match wins. Keywords are plain substrings (not regex).',
            columns: [
              { name: 'mood', type: 'string', enum: ['angry', 'agitated', 'tearful', 'anxious', 'confused'] },
              { name: 'keywords', type: 'string_list' }
            ],
            default: [
              { mood: 'angry', keywords: ['angry', 'hostile', 'aggressive', 'combative', 'furious', 'irate'] },
              { mood: 'agitated', keywords: ['agitat', 'restless', 'irritable', 'uncooperative', 'on edge'] },
              { mood: 'tearful', keywords: ['tearful', 'crying', 'weeping', 'sobbing'] },
              { mood: 'anxious', keywords: ['anxious', 'worried', 'frightened', 'scared', 'fearful', 'panick'] },
              { mood: 'confused', keywords: ['confus', 'disorient', 'vague', 'bewildered'] }
            ]
          }
        }
      },

      defib: {
        label: 'Defibrillation',
        owner: 'sim_patient.html + sim_engine.js',
        fields: {
          JOULE_LEVELS: {
            type: 'number_list',
            label: 'Selectable joule levels',
            help: 'Ordered energy-select tower values, highest first.',
            default: [200, 150, 120, 100, 85, 70, 50, 30, 20, 15, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
          },
          CHARGE_STEP_MS: {
            type: 'number',
            label: 'Charge animation step (ms)',
            help: 'Time per charge-tower row fill during the defib charging animation.',
            default: 180
          },
          ENERGY_FACTOR_TABLE: {
            type: 'map_str_num',
            label: 'Shock energy-efficacy thresholds',
            help: 'Adult dosing is a fixed protocol threshold (100/120J); paediatric is weight-based (2-4 J/kg), branched separately. These feed computeEnergyFactor() in sim_engine.js.',
            default: {
              pediatricAgeThreshold: 12,
              pediatricJPerKgLow: 2, pediatricJPerKgHigh: 4,
              pediatricUnderHalfFactor: 0.3, pediatricLowMultiplier: 0.5,
              pediatricUnderIdealFactor: 0.6,
              pediatricWithinFactor: 1, pediatricHighMultiplier: 1.5,
              pediatricOverFactor: 0.85,
              adultLowJoules: 100, adultLowFactor: 0.55,
              adultMidJoules: 120, adultMidFactor: 0.8,
              adultFullFactor: 1
            }
          }
        },
        readonlyNotes: [
          'The per-shock outcome PROBABILITY math (computeShockableOutcome, computeOrganizedShockOutcome in sim_engine.js ~lines 373-412) is not editable here — it’s a tangle of coupled formulas (downtime decay, survivability weighting, induced-VF chance), not independent named constants. Changing it needs a code change, not a config edit.'
        ]
      },

      timers: {
        label: 'Timers & Polling',
        owner: 'sim_control.html + sim_patient.html',
        fields: {
          HEALTH_WINDOW_MS: {
            type: 'number',
            label: 'Health-score trailing window (ms)',
            help: 'How far back healthScore() looks for its lag/smoothing window.',
            default: 90000
          },
          HEALTH_SAMPLES: {
            type: 'number',
            label: 'Health-score sample count',
            help: 'Samples spread evenly across the trailing window, including "now".',
            default: 4
          },
          HEALTH_INSTABILITY_SWING: {
            type: 'map_str_num',
            label: 'Health-score instability swing',
            help: 'How far a vital needs to swing peak-to-trough within the window before it reads as fully "unstable" on the Health line. Tuned by eye — adjust if the line reads too jumpy or too sluggish.',
            default: { HR: 40, RR: 8, SpO2: 15, BPsys: 30 }
          },
          GRAPH_ZOOM_LEVELS: {
            type: 'number_list',
            label: 'Graph zoom levels (minutes)',
            help: 'Discrete zoom window widths the assessor graph steps through.',
            default: [1, 5, 10, 30, 60, 90, 120, 240]
          },
          VITALS_TICK_MS: {
            type: 'number',
            label: 'Vitals tick interval (ms)',
            help: 'How often sim_control.html recomputes/redraws live vitals.',
            default: 1000
          },
          DB_POLL_MS: {
            type: 'number',
            label: 'Session DB poll interval (ms)',
            help: 'Fallback REST poll interval alongside the realtime channel.',
            default: 1500
          },
          BP_INFLATE_MS: {
            type: 'number',
            label: 'BP cuff inflate/hold/deflate cycle (ms)',
            help: 'Derives from Medications → ACTION_DURATIONS → bp.contextB (subsequent), ×1000 — not independently editable, shown for reference only. Editing ACTION_DURATIONS.bp there also moves this.',
            readonly: true,
            derivedFrom: { section: 'medications', field: 'ACTION_DURATIONS' },
            default: 35000
          }
        }
      },

      graph: {
        label: 'Graph & Display',
        owner: 'sim_control.html',
        fields: {
          GRAPH_SERIES: {
            type: 'table',
            label: 'Vital plot styling',
            help: 'Per-vital plot definition. The value-accessor logic itself stays hardcoded in sim_control.html (JS, not data) — only styling/range fields are editable here.',
            columns: [
              { name: 'key', type: 'string', readonly: true },
              { name: 'label', type: 'string' },
              { name: 'color', type: 'color' },
              { name: 'unit', type: 'string' },
              { name: 'min', type: 'number' },
              { name: 'max', type: 'number' },
              { name: 'plotMax', type: 'number', help: 'Optional — extra headroom above max so a mid-scale "normal" value sits mid-chart instead of near the top.' }
            ],
            default: [
              { key: 'HR', label: 'HR', color: '#dc1114', unit: 'bpm', min: 0, max: 300 },
              { key: 'BPsys', label: 'BP Sys', color: '#65b440', unit: 'mmHg', min: 0, max: 260 },
              { key: 'BPdia', label: 'BP Dia', color: '#8bbf2c', unit: 'mmHg', min: 0, max: 220 },
              { key: 'SpO2', label: 'SpO₂', color: '#2980c5', unit: '%', min: 0, max: 100, plotMax: 120 },
              { key: 'RR', label: 'RR', color: '#dc5e19', unit: '/min', min: 0, max: 50 },
              { key: 'EtCO2', label: 'EtCO₂', color: '#f3e511', unit: 'mmHg', min: 0, max: 100 },
              { key: 'temp', label: 'Temp', color: '#4e4193', unit: '°C', min: 20, max: 43 },
              { key: 'bgl', label: 'BGL', color: '#54bec4', unit: 'mmol/L', min: 0, max: 40 },
              { key: 'ketones', label: 'Ketones', color: '#a96aab', unit: 'mmol/L', min: 0, max: 15 },
              { key: 'gcs', label: 'GCS', color: '#d02e8b', unit: '/15', min: 3, max: 15, plotMax: 18 },
              { key: 'pain', label: 'Pain', color: '#dd9806', unit: '/10', min: 0, max: 10 },
              { key: 'nausea', label: 'Nausea', color: '#14b8a6', unit: '/10', min: 0, max: 10 },
              { key: 'health', label: 'Health', color: '#000000', unit: '', min: 0, max: 100, plotMax: 200 }
            ]
          },
          GRAPH_DEFAULT_ON: {
            type: 'map_str_str',
            label: 'Series visible by default',
            help: 'true/false per series key.',
            default: { HR: true, BPsys: true, BPdia: true, SpO2: true, RR: true, EtCO2: true, temp: false, bgl: false, ketones: false, gcs: false, pain: false, nausea: false, health: false }
          },
          VITAL_DEFS: {
            type: 'table',
            label: 'Vital tile definitions',
            help: 'Metadata for the override-editing modal’s vital tiles.',
            columns: [
              { name: 'key', type: 'string' },
              { name: 'label', type: 'string' },
              { name: 'unit', type: 'string' },
              { name: 'overrideKeys', type: 'string_list' },
              { name: 'isGCS', type: 'boolean' },
              { name: 'isHealth', type: 'boolean' }
            ],
            default: [
              { key: 'HR', label: 'HR', unit: 'bpm', overrideKeys: ['HR'] },
              { key: 'BP', label: 'NIBP', unit: 'mmHg', overrideKeys: ['BPsys', 'BPdia'] },
              { key: 'SpO2', label: 'SpO₂', unit: '%', overrideKeys: ['SpO2'] },
              { key: 'RR', label: 'Resp', unit: '/min', overrideKeys: ['RR'] },
              { key: 'EtCO2', label: 'EtCO₂', unit: 'mmHg', overrideKeys: ['EtCO2'] },
              { key: 'Temp', label: 'Temp', unit: '°C', overrideKeys: ['temp'] },
              { key: 'BGL', label: 'BGL', unit: 'mmol/L', overrideKeys: ['bgl'] },
              { key: 'Ketones', label: 'Ketones', unit: 'mmol/L', overrideKeys: ['ketones'] },
              { key: 'Pain', label: 'Pain', unit: '/10', overrideKeys: ['pain'] },
              { key: 'Nausea', label: 'Nausea', unit: '/10', overrideKeys: ['nausea'] },
              { key: 'GCS', label: 'GCS', unit: '/15', overrideKeys: ['gcsE', 'gcsV', 'gcsM'], isGCS: true },
              { key: 'Health', label: 'Health', unit: '', overrideKeys: [], isHealth: true }
            ]
          },
          SS_LABELS: {
            type: 'map_str_str',
            label: 'Secondary survey body-region labels',
            help: '⚠ Must be kept in sync with scenario.html’s SS_FIELD_LABELS (a separate file, not managed by this admin page) — editing only here will make the two pages show different wording for the same finding.',
            default: {
              head: 'Head and face', neck: 'Neck', chest: 'Chest', abdomen: 'Abdomen', back: 'Back', pelvis: 'Pelvis', limbs: 'Limbs',
              neuro: 'Neurological', cardio: 'Cardiovascular', resp: 'Respiratory', gi: 'Gastrointestinal', gu: 'Genitourinary',
              msk: 'Musculoskeletal', skin: 'Integumentary/Skin', other: 'Other/consideration'
            }
          },
          OVERRIDE_KEY_LABELS: {
            type: 'map_str_str',
            label: 'Override-modal key labels',
            default: {
              HR: 'HR', BPsys: 'BP Sys', BPdia: 'BP Dia', SpO2: 'SpO₂', RR: 'RR', EtCO2: 'EtCO₂',
              temp: 'Temp', bgl: 'BGL', ketones: 'Ketones', pain: 'Pain',
              gcsE: 'GCS Eye', gcsV: 'GCS Verbal', gcsM: 'GCS Motor'
            }
          },
          INFO_TAB_ORDER: {
            type: 'string_list',
            label: 'Scenario Info tab order',
            default: ['dispatch', 'history', 'medhx', 'appearance', 'survey', 'clinical']
          }
        }
      },

      severity: {
        label: 'Severity & Survivability',
        owner: 'sim_engine.js (sim_control.html’s duplicate copy is deleted by this refactor)',
        fields: {
          SEVERITY_BANDS: {
            type: 'table',
            label: 'Vital severity breakpoints',
            help: 'Threshold numbers only — the severity band VALUES (0-4) are a fixed ordinal scale. spo2 also accepts a per-call chronic-respiratory shift (handled in code, not stored here).',
            columns: [
              { name: 'vital', type: 'string', readonly: true },
              { name: 'extremeLow', type: 'number' }, { name: 'extremeHigh', type: 'number' },
              { name: 'severeLow', type: 'number' }, { name: 'severeHigh', type: 'number' },
              { name: 'mildLow', type: 'number' }, { name: 'mildHigh', type: 'number' },
              { name: 'band4', type: 'number' }, { name: 'band3', type: 'number' }, { name: 'band2', type: 'number' }, { name: 'band1', type: 'number' }
            ],
            default: [
              { vital: 'hr', extremeLow: 40, extremeHigh: 140, severeLow: 50, severeHigh: 120, mildLow: 60, mildHigh: 100 },
              { vital: 'rr', extremeLow: 6, extremeHigh: 30, severeLow: 9, severeHigh: 24, mildLow: 12, mildHigh: 20 },
              { vital: 'spo2', band4: 80, band3: 85, band2: 90, band1: 95 },
              { vital: 'pain', band3: 7, band2: 4, band1: 1 },
              { vital: 'bpSys', band3: 70, band2: 90, band1: 100 }
            ]
          },
          SURVIVABILITY: {
            type: 'table',
            label: 'Defib survivability score bands',
            help: 'Feeds computeSurvivabilityScore() in sim_engine.js — base score 70 (average adult, witnessed arrest, prompt care), adjusted by age band (first match wins, age ≤ maxAge), weight, condition keywords, and downtime.',
            columns: [
              { name: 'maxAge', type: 'number' },
              { name: 'delta', type: 'number' }
            ],
            default: [
              { maxAge: 1, delta: 10 },
              { maxAge: 35, delta: 15 },
              { maxAge: 55, delta: 5 },
              { maxAge: 70, delta: -5 },
              { maxAge: 85, delta: -15 }
            ]
          },
          SURVIVABILITY_SCALARS: {
            type: 'map_str_num',
            label: 'Survivability scalar adjustments',
            default: {
              baseScore: 70, ageAboveAllBandsDelta: -25,
              weightHighKg: 120, weightHighDelta: -10,
              weightModerateKg: 100, weightModerateDelta: -5,
              frailtyMinAge: 15, frailtyWeightKg: 45, frailtyDelta: -5,
              conditionPenaltyPerHit: 6, conditionPenaltyCap: 30,
              downtimePenaltyPerMin: 5,
              clampMin: 2, clampMax: 95
            }
          },
          CHRONIC_RESP_KEYWORDS: {
            type: 'string_list',
            label: 'Chronic respiratory disease keywords',
            help: 'Shifts what counts as a "normal" SpO2 reading for this patient (e.g. COPD resting at 85% isn’t distress).',
            default: [
              'copd', 'chronic obstructive', 'emphysema', 'chronic bronchitis', 'bronchiectasis',
              'pulmonary fibrosis', 'interstitial lung', 'chronic respiratory failure', 'chronic lung disease', 'home oxygen'
            ]
          }
        },
        readonlyNotes: [
          'Skin-appearance blend math (getAppearanceState() in sim_engine.js ~lines 695-748: cyanosis/pallor/flush/mottle fractions and blend depths) is not editable here — those are inline magic numbers inside a single expression-heavy function, not independent named constants.'
        ]
      },

      avatar: {
        label: 'Avatar Build',
        owner: 'sim_patient.html',
        fields: {
          AGE_SCALE_AT_ZERO: { type: 'number', label: 'Whole-figure scale at newborn', default: 0.94 },
          EYE_SCALE_X_AT_ZERO: { type: 'number', label: 'Eye width scale at newborn', default: 1.1 },
          EYE_SCALE_Y_AT_ZERO: { type: 'number', label: 'Eye height scale at newborn', default: 1.6 },
          FACE_LOWER_OFFSET_AT_ZERO: { type: 'number', label: 'Eyes/eyebrows vertical drop at newborn', default: 12 },
          MOUTH_LOWER_OFFSET_AT_ZERO: { type: 'number', label: 'Mouth vertical drop at newborn', default: 6.5 },
          HEAD_BULGE_RX_AT_ZERO: { type: 'number', label: 'Head-bulge X radius at newborn', default: 1.16 },
          HEAD_BULGE_RY_AT_ZERO: { type: 'number', label: 'Head-bulge Y radius at newborn', default: 1.19 },
          HAIR_SCALE_AT_ZERO: { type: 'number', label: 'Hair scale at newborn', default: 1 },
          HAIR_OFFSET_Y_AT_ZERO: { type: 'number', label: 'Hair Y offset at newborn', default: -2 },
          HAIR_COLOURS: {
            type: 'color_list', label: 'Hair colour pool',
            default: ['#1b1410', '#3b2b20', '#5a3b23', '#8a5a2b', '#c9a227', '#7a2e1d', '#8c8c8c', '#b0b0b0', '#e8e4dc']
          },
          GREY_HAIR_COLOURS: {
            type: 'color_list', label: 'Colours treated as "grey" for age-weighting',
            help: 'Must be a subset of Hair colour pool above.',
            validate: subsetValidate('avatar', 'HAIR_COLOURS'),
            default: ['#8c8c8c', '#b0b0b0', '#e8e4dc']
          },
          CLOTHES_COLOURS: {
            type: 'color_list', label: 'Clothing colour pool',
            default: ['#3b6ea5', '#22577a', '#5c4b8a', '#7a2e2e', '#2f6d4f', '#4a4a4a', '#8a5a2b', '#1a1a1a', '#c9a227', '#6b4c9a', '#b0392f', '#3d3d3d']
          },
          ADULT_ONLY_HAIR: {
            type: 'string_list', label: 'Adult-only hairstyles',
            help: 'Structured/receding-hairline-prone cuts excluded from the pool below teen age. Must be valid AvatarAssets.top keys.',
            validate: assetKeyValidate('top'),
            default: ['theCaesar', 'theCaesarAndSidePart', 'shavedSides', 'sides']
          },
          HEADWEAR: {
            type: 'string_list', label: 'Headwear (top keys that are garments, not hair)',
            validate: assetKeyValidate('top'),
            default: ['hat', 'hijab', 'turban', 'winterHat1', 'winterHat02', 'winterHat03', 'winterHat04']
          },
          CASUAL_HEADWEAR: {
            type: 'string_list', label: 'Casual headwear (down-weighted subset of Headwear)',
            help: 'Must be a subset of Headwear above.',
            validate: subsetValidate('avatar', 'HEADWEAR'),
            default: ['hat', 'winterHat1', 'winterHat02', 'winterHat03', 'winterHat04']
          },
          FACE_FRAMING_HEADWEAR: {
            type: 'string_list', label: 'Face-framing headwear (excluded below teen)',
            help: 'Must be a subset of Headwear above.',
            validate: subsetValidate('avatar', 'HEADWEAR'),
            default: ['hijab', 'turban']
          },
          HAIR_STYLE_LEAN: {
            type: 'map_str_str',
            label: 'Hairstyle gender lean',
            help: "Each hairstyle tagged 'm' (masc-leaning), 'f' (femme-leaning), or 'n' (neutral) — a soft weighting, not a hard filter.",
            default: {
              hat: 'n', hijab: 'f', turban: 'm', winterHat1: 'n', winterHat02: 'n', winterHat03: 'n', winterHat04: 'n',
              bob: 'f', bun: 'f', curly: 'n', curvy: 'f', dreads: 'n', frida: 'f', fro: 'n', froBand: 'f',
              longButNotTooLong: 'f', miaWallace: 'f', shavedSides: 'm', straight02: 'f', straight01: 'f',
              straightAndStrand: 'f', dreads01: 'n', dreads02: 'n', frizzle: 'n', shaggy: 'm', shaggyMullet: 'm',
              shortCurly: 'm', shortFlat: 'm', shortRound: 'm', shortWaved: 'm', sides: 'm', theCaesar: 'm',
              theCaesarAndSidePart: 'm', bigHair: 'f'
            }
          },
          MOUTH_VARIANT: {
            type: 'map_str_str',
            label: 'Mouth state → asset variant',
            help: 'Values must be real AvatarAssets.mouth keys.',
            validate: assetKeyValidate('mouth'),
            default: {
              neutral: 'default', mild: 'serious', distress: 'concerned', grimace: 'grimace', slack: 'sad', talkOpen: 'screamOpen',
              angry: 'default', agitated: 'concerned', tearful: 'sad', anxious: 'concerned', confused: 'disbelief'
            }
          },
          MOOD_EYEBROW: {
            type: 'map_str_str',
            label: 'Mood → eyebrow asset variant',
            help: "'calm' deliberately has no entry — falls back to the patient’s own per-scenario eyebrow pick. Values must be real AvatarAssets.eyebrows keys.",
            validate: assetKeyValidate('eyebrows'),
            default: { angry: 'angryNatural', agitated: 'frownNatural', tearful: 'sadConcernedNatural', anxious: 'sadConcernedNatural', confused: 'upDownNatural' }
          },
          MAX_CONCURRENT: {
            type: 'number', label: 'Max concurrent pending assessments',
            default: 2
          },
          MONITORING_KEYS: {
            type: 'string_list', label: '"Apply All Monitoring" action keys',
            default: ['ecg', 'spo2', 'etco2', 'bp']
          }
        }
      },

      voice: {
        label: 'Voice',
        owner: 'sim_patient.html',
        fields: {
          MALE_VOICE_HINTS: {
            type: 'string_list', label: 'Male voice name hints',
            help: 'Substrings matched against SpeechSynthesisVoice.name to guess gender when the platform gives no gender field.',
            default: ['male', 'david', 'daniel', 'alex', 'fred', 'guy', 'ryan', 'mark', 'thomas', 'james', 'george', 'oliver', 'aaron']
          },
          FEMALE_VOICE_HINTS: {
            type: 'string_list', label: 'Female voice name hints',
            default: ['female', 'samantha', 'victoria', 'karen', 'susan', 'zira', 'emma', 'amy', 'joanna', 'salli', 'kate', 'moira', 'tessa']
          },
          PIPER_VOICE_POOL: {
            type: 'map_str_list',
            label: 'HQ (Piper) voice pool',
            help: 'A few voices per gender, one picked deterministically per patient. Same "medium" quality tier throughout.',
            default: {
              male: ['en_GB-alan-medium', 'en_US-ryan-medium', 'en_GB-northern_english_male-medium'],
              female: ['en_GB-jenny_dioco-medium', 'en_US-amy-medium', 'en_GB-alba-medium']
            }
          },
          VOICE_MODE_LABELS: {
            type: 'map_str_str',
            label: 'Voice modal title per mode',
            default: { treatment: 'Give Treatment', exam: 'Assessment', chat: 'Talk to Patient' }
          },
          VOICE_MODE_REPLY_LABELS: {
            type: 'map_str_str',
            label: 'Reply-line prefix per mode',
            default: { exam: 'Finding:', chat: 'Patient replied:' }
          },
          PIPER_MODULE_URL: {
            type: 'string',
            label: 'Piper (vits-web) module CDN URL',
            default: 'https://cdn.jsdelivr.net/npm/@diffusionstudio/vits-web@1/+esm'
          },
          ELLIPSIS_PAUSE_MS: {
            type: 'number',
            label: 'Pause after "…" / "..." (ms, HQ voice only)',
            help: 'How long playPiperChunks() waits after a chunk that ends in an ellipsis before speaking the next chunk — reads as a longer, trailing-off pause than a plain "." "!" "?". Only applies to the HQ (Piper) voice path; the standard Web Speech voice has no equivalent per-chunk pause control.',
            default: 550
          },
          SENTENCE_PAUSE_MS: {
            type: 'number',
            label: 'Pause after "." / "!" / "?" (ms, HQ voice only)',
            help: 'Same mechanism as the ellipsis pause above, for ordinary sentence-ending punctuation.',
            default: 220
          },
          YOUTH_VOICE_RATE_AT_ZERO: {
            type: 'number',
            label: 'Youth voice pitch/rate multiplier at newborn',
            help: 'Approximates a younger-sounding voice by speeding up/pitching up the adult voice (real vocal pitch does run higher in young children). Ramps linearly down to 1.0/no-change by age 18 — same ageRamp() shape as the avatar’s age-scaling constants. Applied as audio.playbackRate for the HQ (Piper) voice, and as utterance.pitch for the standard Web Speech voice. Kept deliberately moderate — too high reads as "chipmunk".',
            default: 1.22
          },
          PIPER_WARM_STALL_MS: {
            type: 'number',
            label: 'HQ voice prefetch stall timeout (ms)',
            help: 'warmPiperVoice()’s background prefetch (run on session connect / toggling HQ Voice on) gives up and reports "Unavailable" if this long passes with no progress. Long on purpose — nothing else is waiting on this prefetch, and the OPFS write/verify tail reports no progress at all on slower devices.',
            default: 60000
          },
          PIPER_REPLY_STALL_MS: {
            type: 'number',
            label: 'HQ voice live-reply stall timeout (ms)',
            help: 'speakPatientReply()’s watchdog for an actual in-conversation reply — shorter than the prefetch timeout above since a live conversation needs to fall back to the standard voice promptly instead of sitting in silence.',
            default: 25000
          }
        }
      }

    }
  };
})(typeof window !== 'undefined' ? window : this);
