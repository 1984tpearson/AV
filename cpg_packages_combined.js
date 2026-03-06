/**
 * AV CPG CLINICAL PACKAGES - COMBINED EDITION
 * Source: ALS-MICA Clinical Practice Guidelines v3.13.1
 * Exported: 02/12/2025
 *
 * ⚠️  DO NOT MODIFY CLINICAL CONTENT WITHOUT EXPLICIT INSTRUCTION FROM TIM.
 * These guidelines are extracted directly from official AV CPG documentation.
 * Any updates must be traceable to a specific CPG version change.
 *
 * Combined from cpg_packages.js and cpg_packages_extended.js.
 * All original content preserved exactly — no additions or modifications.
 */

// ============================================================
// AV CPG CLINICAL PACKAGES - Version 3.13.1 (December 2025)
// Extracted from ALS-MICA-CPG-December-2025.pdf
// Used to ground AI scenario generation in accurate AV CPG content
// ============================================================

const CPG_PACKAGES = {

  // ─────────────────────────────────────────────
  // ANAPHYLAXIS (CPG A0704 / P0704)
  // ─────────────────────────────────────────────
  anaphylaxis: {
    cpg: "A0704",
    version: "7.1.0",
    title: "Anaphylaxis",
    patientGroup: "≥16 years (adult); paediatric version P0704",
    careObjectives: [
      "Adrenaline (IM) with minimal delay",
      "Airway and perfusion support",
      "Hospital-based observation (minimum 4 hours)"
    ],
    diagnosis: {
      definition: "Severe, potentially life-threatening systemic hypersensitivity reaction. Rapid onset (usually within 30 min, up to 4 hours). Two or more systemic manifestations = accept anaphylaxis.",
      systems: {
        respiratory: "Respiratory distress, SOB, wheeze, cough, stridor (bronchoconstriction or upper airway oedema)",
        cardiovascular: "Hypotension (vasodilation/hyperpermeability)",
        skin: "Hives, welts, flushing, angioedema (lips/tongue)",
        abdominal: "Pain, nausea, vomiting, diarrhoea"
      },
      commonAllergens: ["insect stings (bees, wasps, jack jumper ants)", "food (peanuts, tree nuts, egg, shellfish, dairy, sesame)", "medications (antibiotics, anaesthetic agents, IV contrast)", "exercise-induced (rare)", "idiopathic (rare)"],
      riskFactorsForRefractory: ["BP <90 mmHg", "respiratory symptoms/distress", "medication as cause (antibiotics, IV contrast)", "history of asthma or refractory anaphylaxis", "no response to initial IM adrenaline"]
    },
    management: {
      firstLine: "Adrenaline 500 mcg (0.5 mg) IM anterolateral mid-thigh. Repeat every 5 min if no improvement.",
      adrenalineInfusion: "If 2 x IM doses ineffective: Adrenaline infusion (MICA). IM adrenaline every 5 min while infusion being prepared.",
      ivAdrenaline: "Only if extremely poor perfusion or cardiac arrest imminent. Always after IM adrenaline.",
      bronchospasm: "If bronchospasm persists after adrenaline: Salbutamol nebulised + Ipratropium bromide + Dexamethasone. These are NEVER first-line.",
      fluidResuscitation: "Normal saline IV if hypotension persists",
      glucagonIndication: "Persistent hypotension after 2 x adrenaline doses if patient has heart failure OR is on beta blockers",
      positioning: "Supine. Sitting if severe respiratory distress. Semi-recumbent in pregnancy.",
      transport: "All patients transport to hospital for minimum 4-hour observation"
    },
    pitfalls: [
      "Asthma history increases fatal anaphylaxis risk — maintain high suspicion",
      "ACE-inhibitor angioedema does NOT respond to adrenaline",
      "Adrenaline toxicity mimics worsening anaphylaxis (nausea, tachycardia, shaking) — reassess before repeating"
    ]
  },

  // ─────────────────────────────────────────────
  // SEIZURES (CPG A0703) — adult
  // ─────────────────────────────────────────────
  seizures: {
    cpg: "A0703",
    version: "6.1.0",
    title: "Seizures",
    patientGroup: "All patients experiencing seizure (excluding resolved febrile seizure age 6 months–6 years → CPG P0719)",
    careObjectives: [
      "Early termination of status epilepticus",
      "Appropriate disposition based on risk profile"
    ],
    diagnosis: {
      statusEpilepticus: "Convulsive SE (CSE): motor symptoms + loss of consciousness ≥5 min, OR repeated without return to baseline. Non-convulsive SE (NCSE): altered consciousness without prominent motor symptoms >10 min.",
      keyHistory: ["exact description of events from bystanders", "aura or pre-seizure symptoms", "nature: tonic-clonic vs focal vs irregular", "duration and postictal state", "sweating, pallor, incontinence, fever"],
      precipitants: ["metabolic (hypoglycaemia, hypo-Na)", "drugs/withdrawal (alcohol, benzos, TCAs, tramadol)", "intracranial pathology", "infection", "eclampsia (pregnant/postpartum → CPG M0202)"],
      bslMandatory: "Check BSL in ALL seizure patients — hypoglycaemia is a common and reversible cause",
      functionalSeizure: "Suggested by: closed eyelids at seizure peak, fluctuating intensity, intense rotation, emotional distress post-event, asynchronous limb movement, side-to-side head shaking. Do NOT attempt harm-causing manoeuvres."
    },
    management: {
      firstLineBenzo: "Midazolam: IM 10 mg (adult ≥40 kg) OR IV 5 mg. May repeat once.",
      secondLine: "If 2 doses midazolam (IV + IM) insufficient: Levetiracetam IV 60 mg/kg (max 4500 mg) infusion over 5 min.",
      airway: "Position lateral. Suction if required. High-flow O2. Only use OPA/NPA if needed.",
      bsl: "If BSL <4 mmol/L: treat hypoglycaemia concurrently",
      postIctal: "Postictal aggression is usually self-limiting (<30 min) and rarely requires sedation",
      patientPlan: "Some patients have neurologist-prescribed plans — follow if available, consult AV Clinician if uncertain"
    },
    drugs: {
      midazolam: "5 mg/mL. IM onset 3–5 min; IV onset 1–3 min. Duration IM 30 min, IV 20 min.",
      levetiracetam: "500 mg/5 mL vial. 60 mg/kg IV infusion over 5 min (≥40 kg: undiluted; <40 kg: dilute 1:1 with NS)"
    }
  },

  // ─────────────────────────────────────────────
  // HYPOGLYCAEMIA (CPG A0702)
  // ─────────────────────────────────────────────
  hypoglycaemia: {
    cpg: "A0702",
    version: "6.1.0",
    title: "Hypoglycaemia",
    patientGroup: "Patients >24 hours old with hypoglycaemia",
    careObjectives: [
      "Identify high-risk hypoglycaemia",
      "Normalise blood glucose level",
      "Identify appropriate patient disposition"
    ],
    diagnosis: {
      threshold: "BGL <4 mmol/L",
      symptoms: ["diaphoresis (most common)", "tremors", "tachycardia", "altered conscious state", "slurred speech", "seizures", "loss of consciousness"],
      commonCauses: ["excess insulin/oral hypoglycaemics", "exercise/fasting", "alcohol", "intercurrent illness (sepsis, renal impairment)", "intentional/accidental overdose"],
      paediatricNote: "Accelerated starvation ketosis — hypoglycaemia + elevated ketones without diabetes. Treat nausea first, then oral glucose. Glucagon unlikely helpful."
    },
    management: {
      conscious_canEat: "Oral glucose (15–20 g fast-acting carbohydrate). Repeat if BSL <4 after 15 min.",
      conscious_cannotEat: "Dextrose 10% IV: 200 mL (20 g) slow IV push. Reassess BSL. Repeat if needed.",
      unconscious_ivAccess: "Dextrose 10% IV 200 mL. Reassess BSL in 5 min.",
      unconscious_noIvAccess: "Glucagon 1 mg IM. Onset 5–10 min. Lay patient lateral (risk of vomiting).",
      targetBGL: "≥4 mmol/L before considering referral away from ED",
      disposition: "Patients may be suitable for community management following resolution if: insulin-related, BGL normalised, able to eat, responsible adult present, no high-risk features"
    },
    drugs: {
      dextrose10: "250 mL bag (25 g). IV/IO. Onset 3 min. Administer via large vein (risk of thrombophlebitis).",
      glucagon: "1 mg vial. Reconstitute with supplied water. IM. Onset 5–10 min. Duration 12–25 min. Reduced effect in alcohol-induced hypoglycaemia, chronic liver disease."
    },
    highRiskFeatures: ["elderly or frail", "unknown cause", "prolonged hypoglycaemia", "recurrent episode", "BSL difficult to normalise", "on long-acting insulin or sulphonylureas", "alcohol co-ingestion"]
  },

  // ─────────────────────────────────────────────
  // MEDICAL CARDIAC ARREST (CPG A0201-1)
  // ─────────────────────────────────────────────
  cardiac_arrest: {
    cpg: "A0201-1",
    version: "8.2.0",
    title: "Medical Cardiac Arrest",
    patientGroup: "≥16 years in cardiac arrest",
    careObjectives: [
      "High quality chest compressions with minimal interruptions",
      "Rapid defibrillation of VF/pulseless VT",
      "Advanced care (adrenaline, antiarrhythmics, intubation) without interrupting CPR",
      "Address correctable causes (4H/4T)"
    ],
    management: [
      "CPR: 100–120 compressions/min, ≥5 cm depth, full recoil. 30:2 ratio (no advanced airway); continuous with ETT/SGA in situ.",
      "2-minute compressor rotations. Minimise interruptions to ≤3 seconds.",
      "Defibrillation: first shock ≤2 minutes from arrival. Pad placement: sternal right chest below clavicle; apex left mid-axillary 6th ICS.",
      "After 3 shocks: consider double sequential defibrillation (MICA). Adjust pad placement.",
      "Airway: SGA appropriate initially for continuous compressions. ETT should not interrupt compressions.",
      "Adrenaline 1 mg IV/IO — shockable: after 2nd shock, then 3rd, 5th, 7th, 9th shock. Non-shockable: as soon as resources allow without interrupting HP-CPR.",
      "Amiodarone 150 mg IV over 10 min (MICA). Consult AV Clinician (ALS).",
      "Amiodarone 300 mg IV/IO after 3rd shock (refractory VF/VT); 150 mg after 5th shock. Compatible with D5W only. C/I in TCA toxicity, QTc >500ms.",
      "Lidocaine: alternative to amiodarone if not available.",
      "Fluids — shockable rhythms: limit to medication flush and TKVO only.",
      "Capnography: ETCO2 as surrogate for CPR quality. Gradual fall = CPR fatigue; sudden rise = ROSC.",
      "ECMO eligibility: age 16–70, suspected cardiac cause, witnessed arrest, initial rhythm VF/VT, collapse-to-ED <60 min achievable. Centres: Alfred (24/7), Austin, Box Hill, Royal Melbourne, St Vincent's, Victorian Heart Hospital, Geelong."
    ]
  },

  // ─────────────────────────────────────────────
  // ACS / STEMI (CPG A0401 / A0408)
  // ─────────────────────────────────────────────
  acs_stemi: {
    cpg: "A0401 / A0408",
    version: "2.1.1 / 4.4.1",
    title: "Acute Coronary Syndrome / STEMI",
    careObjectives: [
      "Rapid STEMI identification for timely reperfusion (PCI or pre-hospital thrombolysis)",
      "Antiplatelet therapy (aspirin)",
      "Reduce cardiac workload — treat pain, nausea, LVF"
    ],
    diagnosis: {
      spectrum: "UA → NSTEACS → STEMI",
      atypicalGroups: "Elderly, female, diabetic patients may not present with chest pain",
      ecg: "Absence of ischaemic ECG changes does NOT exclude AMI",
      stemi: "12-lead ECG showing ST elevation meeting standard criteria",
      vaccineMyo: "Chest pain 1–10 days post mRNA vaccine (Pfizer/Moderna), especially males 12–29. Usually self-resolves. Low-risk young patients without ECG changes → GP review 24 hrs."
    },
    management: {
      aspirin: "300 mg chewable/soluble PO. Supplement if lower dose already given prehospital.",
      gtn: "GTN S/L 300–600 mcg. Repeat every 3–5 min if BP ≥100 mmHg. C/I: BP <100, HR <50 or >150, VT, PDE5 inhibitors.",
      pain: "GTN first. If unresolved: opioids as per CPG A0501.",
      nausea: "As per CPG A0701",
      lvf: "As per CPG A0406 Cardiogenic Pulmonary Oedema",
      oxygen: "NOT routine. Only if SpO2 <94% as per CPG A0001. Hyperoxia detrimental in STEMI.",
      heparin: "Per CPG D038 — for eligible STEMI patients pre-thrombolysis"
    },
    thrombolysis: {
      drug: "Tenecteplase (TNK) IV bolus",
      dosing: "<60 kg: 30 mg | 60–69 kg: 35 mg | 70–79 kg: 40 mg | 80–89 kg: 45 mg | ≥90 kg: 50 mg",
      ageOver75: "HALVE the dose. Requires consultation.",
      indication: "STEMI where PCI not achievable within recommended timeframe",
      destination: "Post-thrombolysis: transport to nearest PCI centre"
    },
    transport: "PCI centre if within timeframe. Pre-notification mandatory."
  },

  // ─────────────────────────────────────────────
  // ASTHMA (CPG A0601) — adult
  // ─────────────────────────────────────────────
  asthma: {
    cpg: "A0601",
    version: "7.0.0",
    title: "Asthma",
    patientGroup: "≥16 years with acute asthma",
    careObjectives: [
      "Assess severity",
      "Bronchodilation: inhaled if adequate ventilation, parenteral adrenaline if inadequate",
      "NIV or early intubation in respiratory failure unresponsive to treatment",
      "Magnesium for severe/life-threatening",
      "Corticosteroids for all but mildest presentations"
    ],
    severity: {
      mild: "Talking in sentences. SpO2 ≥95%. HR <100. No accessory muscle use.",
      moderate: "Talking in phrases. SpO2 92–95%. HR 100–120. Some accessory muscle use.",
      severe: "Talking in words. SpO2 <92%. HR >120. Marked accessory muscle use. PEFR <50%.",
      lifeThreatening: "Silent chest, cyanosis, altered consciousness, unable to speak, SpO2 <90%, bradycardia, exhaustion"
    },
    diagnosis: {
      silentChest: "No wheeze = insufficient airflow = imminent respiratory arrest — do NOT reassure",
      anaphylaxisDD: "Always consider anaphylaxis: sudden onset, no asthma history, skin symptoms, hypotension, food/medication trigger",
      spO2Caution: "Normal SpO2 does NOT rule out severe asthma"
    },
    management: {
      mild: "Salbutamol 2.5–5 mg nebulised or pMDI + spacer (4–8 puffs). Dexamethasone 8 mg PO/IV.",
      moderate: "Salbutamol 5 mg neb + Ipratropium 500 mcg neb. Dexamethasone 8 mg. Repeat salbutamol every 20 min.",
      severe: "As moderate PLUS: Adrenaline 500 mcg IM (anterolateral thigh). IV access. Prepare for deterioration.",
      lifeThreatening: "Adrenaline IM/IV. IV adrenaline if IM not effective (ALS consult with Clinician). Magnesium sulfate IV (MICA). BiPAP NIV.",
      corticosteroids: "Dexamethasone 8 mg PO/IV/IM for all but mildest presentations",
      magnesium: "Magnesium sulfate 2.5 g IV over 20 min (MICA). Do not delay other priorities.",
      niv: "BiPAP for respiratory failure (MICA). C/I if altered consciousness. Continuous monitoring mandatory."
    },
    extrication: "Patients with severe/life-threatening asthma: treat BEFORE extrication. IV access, adrenaline drawn up, resuscitation ready.",
    drugs: {
      salbutamol: "5 mg/2.5 mL nebule or 100 mcg/dose pMDI. Onset 5–15 min. Duration 15–30 min.",
      ipratropium: "500 mcg (adult) nebulised. Used with salbutamol in moderate–severe.",
      adrenaline_im: "500 mcg (0.5 mg) IM anterolateral thigh for life-threatening asthma.",
      dexamethasone: "8 mg PO/IV/IM"
    }
  },

  // ─────────────────────────────────────────────
  // COPD (CPG A0602)
  // ─────────────────────────────────────────────
  copd: {
    cpg: "A0602",
    version: "2.0.0",
    title: "COPD Exacerbation",
    patientGroup: "≥16 years with exacerbation of COPD",
    careObjectives: [
      "Bronchodilators to reduce airflow obstruction",
      "Controlled oxygen therapy to avoid hypercapnia",
      "Corticosteroids to reduce inflammation",
      "NIV for respiratory failure unresponsive to initial treatment",
      "Appropriate disposition"
    ],
    oxygenTarget: "SpO2 88–92% (controlled O2 — avoid over-oxygenation causing hypercapnia)",
    management: {
      bronchodilators: "Salbutamol 5 mg neb + Ipratropium 500 mcg neb. Repeat salbutamol every 20 min if needed.",
      corticosteroids: "Dexamethasone 8 mg PO/IV/IM",
      niv: "CPAP for respiratory failure — ALS may initiate when MICA unavailable, consult Clinician. BiPAP preferred (MICA). Bring patient's own home NIV machine.",
      oxygen: "Target 88–92% — use controlled low-flow. Over-oxygenation → hypercapnia → respiratory depression."
    },
    differentials: "Consider concurrent heart failure, pneumonia, PE, pneumothorax",
    disposition: "Most patients require hospital. VVED if mild, responsive, no high-risk features."
  },

  // ─────────────────────────────────────────────
  // CARDIOGENIC PULMONARY OEDEMA (CPG A0406)
  // ─────────────────────────────────────────────
  pulmonary_oedema: {
    cpg: "A0406",
    version: "6.0.0",
    title: "Cardiogenic Pulmonary Oedema",
    patientGroup: "≥16 years with cardiogenic pulmonary oedema",
    careObjectives: [
      "Oxygen therapy if hypoxic",
      "NIV (CPAP/BiPAP) for respiratory failure",
      "GTN to reduce preload and afterload",
      "Furosemide as second line for fluid overload",
      "Adrenaline infusion for cardiogenic shock"
    ],
    diagnosis: {
      features: ["acute dyspnoea", "bilateral fine crackles on auscultation", "orthopnoea / PND history", "raised JVP, peripheral oedema", "frothy/pink sputum", "history of heart failure"],
      ecg: "12-lead mandatory — exclude AMI or arrhythmia as precipitant",
      nonCardiogenic: "Non-cardiogenic APO (smoke inhalation, near-drowning, anaphylaxis) — GTN and furosemide NOT indicated. Manage as CPG A0604 Dyspnoea."
    },
    management: {
      gtn: "GTN S/L 400–800 mcg. Repeat every 3–5 min. Infusion if on NIV and requiring ongoing doses. C/I: BP <100, HR <50 or >150.",
      niv: "CPAP 5–10 cmH2O or BiPAP (MICA). First-line respiratory support. Do not interrupt for GTN once NIV applied if patient responding.",
      furosemide: "40–80 mg IV if clear fluid overload and responding to GTN/NIV. Second-line.",
      cardiogenicShock: "Adrenaline infusion (MICA): vasopressor/inotrope support"
    }
  },

  // ─────────────────────────────────────────────
  // BRADYCARDIA (CPG A0402)
  // ─────────────────────────────────────────────
  bradycardia: {
    cpg: "A0402",
    version: "7.0.1",
    title: "Bradycardia",
    careObjectives: ["Increase HR where bradycardia causes haemodynamic compromise, heart failure or life-threatening arrhythmia"],
    threshold: "HR <60 bpm. Practical management threshold ~50 bpm. Asymptomatic HR >50 may need monitoring only.",
    management: {
      firstLine: "Atropine 600 mcg IV. Repeat up to total 3000 mcg (5 doses of 600 mcg).",
      atropineLimitations: "Unlikely effective in Mobitz II or 3rd degree (complete) heart block — but still give. Ineffective AND harmful post cardiac transplant. Caution in MI — tachycardia worsens ischaemia.",
      secondLine: "Adrenaline infusion (MICA): 3 mg in 50 mL D5W/NS. 1 mL/hr = 1 mcg/min. Titrate to response. Start 2–10 mcg/min.",
      pacing: "If no HR increase after adrenaline 10 mcg/min → commence transthoracic pacing (MICA)"
    }
  },

  // ─────────────────────────────────────────────
  // TACHYCARDIA — NARROW COMPLEX (CPG A0403)
  // ─────────────────────────────────────────────
  tachycardia_narrow: {
    cpg: "A0403",
    version: "7.1.0",
    title: "Tachycardia — Narrow Complex (SVT/AF/Flutter)",
    careObjectives: [
      "Rapid termination of life-threatening arrhythmias",
      "Transport to definitive care facility"
    ],
    unstableFeatures: ["inadequate perfusion/shock", "acutely altered consciousness", "ischaemic chest pain", "APO", "usually with HR ≥150 bpm"],
    stable_svt: {
      valsalva: "Modified Valsalva: semi-recumbent 45°, forced expiration, lay flat + raise legs 45° for 15 sec. Only if SBP ≥90 mmHg. Superior reversion rates.",
      adenosine: "6 mg rapid IV push through large proximal vein (e.g. antecubital fossa) + NS flush. If no effect: 12 mg. Record 12-lead ECG first.",
      notes: "12-lead ECG mandatory before treatment unless immediate Mx required."
    },
    unstable: "Synchronised cardioversion: sedate first (midazolam ± fentanyl). 200J. Repeat if needed.",
    af_flutter_arrest: "Synchronised cardioversion 200J if deteriorating to cardiac arrest"
  },

  // ─────────────────────────────────────────────
  // TACHYCARDIA — BROAD COMPLEX (CPG A0404)
  // ─────────────────────────────────────────────
  tachycardia_broad: {
    cpg: "A0404",
    version: "7.0.1",
    title: "Tachycardia — Broad Complex (VT)",
    vtDefinition: "Duration >30 sec, rate >100, QRS >0.12 sec, regular (mostly), AV dissociation or absent P waves",
    rule: "Treat regular broad complex tachycardia as VT until proven otherwise",
    unstableFeatures: ["hypotension/shock", "altered consciousness", "ischaemic chest pain", "APO"],
    management: {
      stable: "Amiodarone 150 mg IV over 10 min (MICA). Consult AV Clinician (ALS).",
      unstable: "Synchronised cardioversion 200J after sedation.",
      pulseless: "Treat as VF — defibrillation as per CPG A0201-1"
    },
    notes: "Consider time to MICA support vs time to hospital — these patients can deteriorate rapidly."
  },

  // ─────────────────────────────────────────────
  // SHOCK (CPG A0705)
  // ─────────────────────────────────────────────
  shock: {
    cpg: "A0705",
    version: "5.3.0",
    title: "Shock",
    patientGroup: "≥16 years with inadequate perfusion not addressed by a specific CPG",
    careObjectives: ["Achieve perfusion target appropriate to patient and presentation"],
    definition: "Cellular/tissue hypoxia from reduced O2 delivery, increased consumption, or inadequate utilisation. Signs: profound hypotension, compensatory tachycardia, altered consciousness, tachypnoea, diaphoresis, pallor, cold peripheries.",
    management: {
      ivAccess: "18G or larger. Large proximal vein for vasopressors/inotropes.",
      fluidNormal: "Normal saline IV. Titrate to response. Max 2000 mL.",
      fluidHighRisk: "Cardiac failure, chronic renal failure, elderly: max 1000 mL. Titrate.",
      metaraminol: "Boluses if: inadequate response after 500–1000 mL NS, OR profound hypotension (BP <70 mmHg, altered mental status, no radial pulse) — can give in parallel with fluid.",
      noradrenaline: "MICA. 18G cannula or larger in large proximal vein. Risk of tissue necrosis if extravasation.",
      target: "Perfusion adequate for presentation — not a specific BP number in all cases"
    }
  },

  // ─────────────────────────────────────────────
  // SUSPECTED STROKE / TIA (CPG A0711)
  // ─────────────────────────────────────────────
  stroke: {
    cpg: "A0711",
    version: "2.2.2",
    title: "Suspected Stroke or TIA",
    careObjectives: [
      "Assess using MASS (Melbourne Ambulance Stroke Screen)",
      "Transport to appropriate destination (thrombolysis / ECR / neurosurgical centre)",
      "Hospital pre-notification"
    ],
    assessment: {
      mass: "MASS: Face (droop), Arm (drift), Speech (slurred/absent), Time (onset)",
      actFast: "ACT-FAST: additional assessment for Large Vessel Occlusion (LVO) — used in SCA catchment",
      onsetTime: "Thrombolysis window: up to 12 hours from last seen well. ECR: up to 24 hours.",
    },
    strokeMimics: ["hypoglycaemia", "seizure/postictal", "migraine", "sepsis", "intoxication", "brain tumour", "vertigo", "subdural haematoma", "syncope", "electrolyte disturbance", "MS"],
    ich: {
      likelihood: "ICH more likely with: rapid deterioration, GCS <8, severe headache, nausea/vomiting, bradycardia/hypertension",
      transport: {
        awake: "Nearest stroke hospital",
        comatose: "Neurosurgical centre (RMH, SVH, Austin, Alfred, MMC in metro)"
      }
    },
    management: {
      oxygen: "Only if SpO2 <92%",
      bsl: "Mandatory — exclude hypoglycaemia as mimic",
      bp: "Do not aggressively lower BP prehospital. Post-intubation target 120–140 mmHg.",
      opioids: "Caution — risk of consciousness deterioration",
      notification: "Pre-notification mandatory for MASS positive patients"
    }
  },

  // ─────────────────────────────────────────────
  // SEPSIS (CPG A0729)
  // ─────────────────────────────────────────────
  sepsis: {
    cpg: "A0729",
    version: "1.0.0",
    title: "Sepsis and Infection",
    patientGroup: "≥16 years with suspected infection or sepsis",
    careObjectives: [
      "Identify and treat patients with clear signs of sepsis",
      "Risk stratify for appropriate disposition"
    ],
    diagnosis: {
      definition: "Life-threatening organ dysfunction caused by dysregulated response to infection",
      qSOFA: "2 of 3: SBP ≤100 mmHg, GCS <15, RR ≥22 — in context of suspected infection",
      septicShock: "Persistent hypotension needing vasopressors to maintain MAP >65 mmHg OR BP ≥100 mmHg AND lactate >2 mmol/L. Mortality >40%.",
      signsOfInfection: ["fever/chills/rigors", "altered mental status", "productive cough/dyspnoea", "abdominal pain/tenderness", "dysuria/frequency", "wound/cellulitis"]
    },
    management: {
      oxygen: "Target SpO2 ≥94% (88–92% if COPD)",
      ivAccess: "18G or larger",
      fluid: "Normal saline IV 500–1000 mL bolus if hypotensive. Titrate.",
      vasopressors: "Metaraminol or noradrenaline if fluid inadequate. MICA preferred.",
      antibiotics: "Not prehospital — prioritise transport",
      transport: "Urgent. Pre-notification where possible."
    }
  },

  // ─────────────────────────────────────────────
  // MAJOR TRAUMA (CPG A0810)
  // ─────────────────────────────────────────────
  major_trauma: {
    cpg: "A0810",
    version: "1.3.0",
    title: "Major Trauma",
    patientGroup: "≥16 years with traumatic injuries",
    careObjectives: [
      "Immediate control of major haemorrhage",
      "Airway patency, oxygenation, ventilation",
      "Adequate circulation for presentation",
      "Prioritise transport — minimise scene time"
    ],
    priorities: "HAEMORRHAGE → AIRWAY → BREATHING → CIRCULATION → TRANSPORT",
    haemorrhage: {
      control: "Direct pressure, wound packing, tourniquets for limb haemorrhage. Pelvic binder for suspected pelvic fracture.",
      txa: "Tranexamic acid 1 g IV/IO infusion over 10 min (or slow push). C/I if injury >2 hours ago. IM alternative if IV delayed.",
      fluidTarget: "Hypotensive resuscitation for penetrating truncal trauma. Target radial pulse present or MAP ~50–65 mmHg."
    },
    tbi: {
      target_bp: "Normal or supranormal BP — maintain MAP to counter raised ICP",
      oxygen: "Target SpO2 94–98%, ETCO2 35–45 mmHg",
      position: "Head of stretcher 10–15° to aid venous drainage"
    },
    transport: {
      priority: "Shocked or penetrating truncal trauma: transport immediately, treat only immediately life-threatening conditions en route",
      destination: "Major trauma centre"
    },
    drugs: {
      txa: "1 g / 10 mL. IV/IO infusion: add 1 g to 100 mL D5W or NS, infuse over 10 min. IM: 2 x 5 mL injections lateral upper thigh.",
      morphine_fentanyl: "Pain management — cautious use if hypotensive"
    }
  },

  // ─────────────────────────────────────────────
  // TRAUMATIC HEAD INJURY (CPG A0803)
  // ─────────────────────────────────────────────
  head_injury: {
    cpg: "A0803",
    version: "6.0.1",
    title: "Traumatic Head Injury",
    patientGroup: "≥16 years with potential traumatic head injury",
    careObjectives: {
      moderate_severe: ["Optimise airway, oxygenation, ventilation, and cerebral perfusion pressure to prevent secondary brain injury"],
      mild: ["Identify high-risk → neurosurgical facility", "Moderate risk → ED for CT/observation", "Low risk → community with self-care advice"]
    },
    secondary_brain_injury: "Caused by hypoxia, hypercapnia, hypotension. Primary injury = fixed. Secondary = preventable.",
    management: {
      airway: "Maintain airway with positioning/adjuncts. RSI if indicated (GCS <8 or airway threat) (MICA).",
      oxygen: "Target SpO2 94–98%. Avoid hypoxia AND hyperoxia.",
      ventilation: "Target ETCO2 35–45 mmHg. Avoid hypocapnia.",
      bp: "Target normal/supranormal MAP — counteracts elevated ICP. Avoid hypotension.",
      position: "Head of stretcher 10–15° if no spinal precautions preclude it.",
      gcs: "GCS reduction ≥2 points is significant. GCS <13 = significant TBI until proven otherwise."
    },
    riskCategories: {
      high: "GCS <13, focal neurology, seizure, suspected open/depressed skull fracture, penetrating injury → neurosurgical centre",
      moderate: "GCS 13–14, loss of consciousness, amnesia, vomiting >1 episode, age >65 → ED for CT",
      low: "GCS 15, no LOC, no amnesia, no high-risk features → self-care advice"
    },
    contraindications: "Naloxone should NOT be given post head injury"
  },

  // ─────────────────────────────────────────────
  // OPIOID TOXICITY (CPG A0722)
  // ─────────────────────────────────────────────
  opioid_toxicity: {
    cpg: "A0722",
    version: "4.2.0",
    title: "Opioid Toxicity",
    careObjectives: [
      "Airway patency and adequate ventilation",
      "Reverse opioid action sufficiently for adequate spontaneous respiration WITHOUT causing withdrawal"
    ],
    signs: ["respiratory depression (SpO2 <92% on room air) or apnoea", "CNS depression (drowsiness to coma)", "miosis (often but not always)", "prolonged QT (methadone, oxycodone, loperamide)"],
    management: {
      airway: "BVM ventilation first. Position patient. Suction if needed.",
      naloxone_heroin: "0.4 mg IV/IM. Titrate to adequate respiration (not full reversal — avoid precipitating withdrawal and aggression). May repeat. Duration 30–45 min — shorter than most opioids.",
      naloxone_other: "Smaller titrated doses. Higher risk of rebound toxicity with long-acting opioids (methadone, slow-release oxycodone).",
      naloxone_CI: "Do NOT give naloxone following opioid-associated cardiac arrest (maintain ventilation). Do NOT give after head injury.",
      referral: "Isolated heroin: may be left with carer if complete reversal and carer present for 4 hours + take-home naloxone."
    },
    differentials: "AEIOUTIPS: Alcohol, Epilepsy, Insulin/metabolic, Overdose/oxygen, Underdose/withdrawal, Trauma, Infection, Psychiatric, Stroke",
    sceneSafety: "Uncapped sharps. PPE. Multi-casualty potential."
  },

  // ─────────────────────────────────────────────
  // HYPERKALAEMIA (CPG A0724)
  // ─────────────────────────────────────────────
  hyperkalaemia: {
    cpg: "A0724",
    version: "1.0.0",
    title: "Hyperkalaemia",
    patientGroup: "≥16 years with suspected or confirmed hyperkalaemia",
    careObjectives: [
      "Identification of suspected hyperkalaemia",
      "Membrane stabilisation (calcium gluconate)",
      "Intracellular shifting of potassium",
      "Transport to ICU-capable facility"
    ],
    suspectIn: ["known renal failure/dialysis patients", "severe crush injury/rhabdomyolysis", "severe burns", "patients on potassium-sparing diuretics, ACE inhibitors, ARBs"],
    ecgChanges: ["tall peaked T waves (early)", "prolonged PR interval", "absent P waves", "widened QRS", "sine wave pattern (pre-arrest)", "bradyarrhythmia"],
    note: "ECG changes do NOT correlate with specific potassium levels. Progression of changes = urgent management.",
    management: {
      membraneStabilisation: "Calcium gluconate 10 mL (931 mg) IV over 2–5 min (may be faster in arrest). C/I in digoxin toxicity.",
      intracellularShift: "Salbutamol 10–20 mg nebulised (activates Na/K pumps). Dextrose + insulin (hospital). Sodium bicarbonate if severe acidosis.",
      transport: "Urgent to ICU-capable facility"
    }
  },

  // ─────────────────────────────────────────────
  // DRUG REFERENCE — Key Drugs
  // ─────────────────────────────────────────────
  drug_reference: {
    adrenaline: {
      presentation: "1 mg/mL ampoule",
      routes: "IM / IV / IO / infusion",
      doses: {
        anaphylaxis_IM: "500 mcg (0.5 mg) IM anterolateral thigh. Repeat 5-minutely.",
        cardiac_arrest: "1 mg IV/IO per cardiac arrest protocol",
        bradycardia_infusion: "3 mg in 50 mL D5W/NS. 1 mL/hr = 1 mcg/min. Titrate 2–10 mcg/min.",
        asthma_severe_IM: "500 mcg IM",
        croup_nebulised: "5 mg in 5 mL NS nebulised"
      },
      CI: "None absolute",
      cautions: "MAOIs, TCAs (potentiate effects). Beta blockers (may blunt response). Hypovolaemia (treat first). Quetiapine toxicity."
    },
    midazolam: {
      presentation: "5 mg/1 mL or 15 mg/3 mL",
      routes: "IM / IV",
      doses: {
        seizure_IM: "10 mg IM (≥40 kg adult)",
        seizure_IV: "5 mg IV",
        sedation_cardioversion: "Per procedural sedation protocol"
      },
      onset: "IM 3–5 min. IV 1–3 min.",
      duration: "IM 30 min. IV 20 min.",
      CI: "Benzodiazepine hypersensitivity",
      cautions: "Respiratory depression. Incompatible with dexamethasone, furosemide, hydrocortisone, NaHCO3."
    },
    levetiracetam: {
      presentation: "500 mg/5 mL vial (100 mg/mL)",
      route: "IV infusion",
      dose: "60 mg/kg (max 4500 mg). ≥40 kg: undiluted. <40 kg: dilute 1:1 with NS. Infuse over 5 min via pump.",
      indication: "Status epilepticus — second line after 2 doses of midazolam failed"
    },
    dextrose10: {
      presentation: "250 mL bag (25 g)",
      route: "IV/IO",
      dose: "200 mL (20 g) for adult hypoglycaemia",
      onset: "3 min",
      caution: "Risk of vein irritation/thrombophlebitis. Do not co-administer with blood products."
    },
    glucagon: {
      presentation: "1 mg vial + 1 mL water for injection (reconstitute before use)",
      route: "IM",
      dose: "1 mg IM",
      onset: "5–10 min",
      duration: "12–25 min",
      indication: "Hypoglycaemia with no IV access, OR anaphylaxis with persistent hypotension + beta blocker use/heart failure after 2x adrenaline",
      cautions: "Reduced effect in alcohol-induced hypoglycaemia, chronic liver disease. Nausea/vomiting common — position lateral."
    },
    gtn: {
      presentation: "Spray 400 mcg/dose. Tablets 300 mcg and 600 mcg.",
      route: "Sublingual (or buccal substitute)",
      dose: "300–600 mcg SL. Repeat every 3–5 min.",
      CI: "BP <100, HR <50 or >150, VT, PDE5 inhibitors (sildenafil/tadalafil), riociguat, bleeding in pregnancy",
      cautions: "Elderly/no prior GTN exposure/recent MI: start 300 mcg. RV infarction/inferior STEMI + SBP <160: use cautiously."
    },
    aspirin: {
      presentation: "300 mg chewable or soluble tablet",
      route: "Oral",
      dose: "300 mg PO",
      indication: "ACS (antiplatelet)",
      CI: "Aspirin hypersensitivity, active peptic ulcer bleeding, bleeding disorders, suspected dissecting aortic aneurysm, psychostimulant OD with SBP >160 mmHg"
    },
    amiodarone: {
      presentation: "150 mg/3 mL ampoule",
      route: "IV/IO",
      doses: {
        cardiac_arrest_3rd_shock: "300 mg IV/IO",
        cardiac_arrest_5th_shock: "150 mg IV/IO",
        stable_VT: "150 mg IV over 10 min"
      },
      CI: "TCA toxicity, QTc >500 ms, VT post-ondansetron, pregnancy (unless arrest)",
      compatibility: "D5W only for infusion. Flush thoroughly before/after if line used for dexamethasone, heparin, hydrocortisone, NaHCO3."
    },
    atropine: {
      presentation: "0.6 mg/mL or 1.2 mg/mL polyamp",
      route: "IV",
      dose: "600 mcg IV. Repeat to max 3000 mcg (5 doses).",
      onset: "<2 min. Duration 2–6 hours.",
      CI: "Cardiac transplant",
      cautions: "Mobitz II and 3rd degree block: unlikely effective but still give. Do not increase HR >100 bpm (except paeds <6 yr). Flush with 10 mL NS before IV adrenaline if both being given."
    },
    naloxone: {
      presentation: "0.4 mg/mL ampoule",
      route: "IV / IM",
      dose: "0.4 mg IV/IM. Titrate to adequate respiration.",
      onset: "1–3 min (both routes). Duration 30–45 min.",
      note: "Duration shorter than most opioids — re-sedation possible. Avoid full reversal (precipitates withdrawal/aggression in opioid-dependent patients). Do NOT give in opioid arrest or head injury."
    },
    morphine: {
      presentation: "10 mg/mL ampoule",
      route: "IV / IM / SC",
      dose: "2.5–5 mg IV titrated. IM 5–10 mg.",
      onset: "IV 2–5 min. IM 10–30 min.",
      CI: "Morphine hypersensitivity, renal failure, late second stage labour",
      cautions: "Elderly, hypotension, respiratory depression, asthma, alcohol"
    },
    fentanyl: {
      presentation: "100 mcg/2 mL ampoule",
      route: "IN / IM / SC / IV / IO",
      dose: "1 mcg/kg IV titrated. 1.5 mcg/kg IM/IN.",
      onset: "Immediate (IV). Duration 30–60 min.",
      CI: "Serotonin toxicity, MAOIs within 14 days, late second stage labour",
      note: "Not compatible with hydroxocobalamin. Risk of chest wall rigidity with rapid IV push — give slowly."
    },
    calcium_gluconate: {
      presentation: "931 mg/10 mL (2.2 mmol)",
      route: "Slow IV into large peripheral vein",
      dose: "10 mL over 2–5 min (may be faster in arrest)",
      indication: "Hyperkalaemia with ECG changes, calcium channel blocker toxicity, post-PRBC transfusion",
      CI: "Suspected digoxin toxicity",
      cautions: "Tissue necrosis if extravasation. Rapid administration → bradycardia, hypotension, arrhythmias."
    },
    tranexamic_acid: {
      presentation: "1 g/10 mL",
      route: "IV/IO infusion or slow push. IM as alternative.",
      dose: "1 g IV over 10 min. Add to 100 mL D5W or NS.",
      im_dose: "Two 5 mL injections lateral upper thigh",
      CI: "Injury >2 hours ago",
      indications: "Major trauma at risk of acute traumatic coagulopathy. Severe postpartum haemorrhage.",
      cautions: "Rapid administration → hypotension. Do not co-administer with blood products or penicillins through same line."
    }
  },


  // ═══════════════════════════════════════════════
  // BEHAVIOURAL / MENTAL HEALTH
  // ═══════════════════════════════════════════════

  acute_behavioural_disturbance: {
    cpg: "A0708",
    version: "6.5.0",
    title: "Acute Behavioural Disturbance",
    patientGroup: "Patients ≥16 years with agitation, aggression, or violent behaviour",
    careObjectives: [
      "Maintain safe environment for patients, staff, and bystanders",
      "Use least restrictive means possible; maintain verbal and environmental de-escalation throughout",
      "Consider clinical causes of acute behavioural disturbance"
    ],
    agitationSeverity: {
      mild: "Able to cooperate, not aggressive. Anxious, pacing, restless, hypervigilant, rapid shallow breathing.",
      moderate: "Loud outbursts, frequent non-purposeful movements. Not aggressive or violent.",
      severe: "Combative, violent, immediate danger. Unable to cooperate. Yelling, verbally abusive."
    },
    causes: [
      "Physical injury / pain (e.g. head injury)",
      "Acute medical conditions (e.g. hypoglycaemia, postictal state)",
      "Unmet needs (e.g. bladder distension, hunger, alcohol/nicotine withdrawal)",
      "Substance abuse / poisoning (e.g. methamphetamine, alcohol)",
      "Acute mental health condition (e.g. panic attack, acute mania)",
      "Dementia / delirium",
      "Neurodiversity (e.g. autism, ADHD) — especially in young patients"
    ],
    management: {
      deEscalation: [
        "Nominate one person to build rapport and communicate",
        "Non-threatening stance; quiet, calm, reassuring voice",
        "Reduce stimulus — noise, light, crowding",
        "Use patient's name; give simple one-at-a-time instructions",
        "No threats, ultimatums, or show of force"
      ],
      sedation: {
        mildAgitation: "Verbal/environmental de-escalation only",
        moderateAgitation: "Consider oral olanzapine or droperidol IM",
        severeAgitation: "Droperidol IM first line. Midazolam IM if droperidol unavailable or contraindicated.",
        drugs: {
          droperidol: "10 mg IM. Onset 5–10 min.",
          midazolam: "10 mg IM (or 5 mg IV/IO). Use if droperidol unavailable.",
          olanzapine: "10 mg IM or oral. Do NOT combine with benzodiazepines (respiratory depression risk)."
        },
        safetyNote: "Do not apply physical restraints without concurrent sedation. Physical exertion against restraint worsens risk."
      }
    },
    pitfalls: [
      "Always exclude medical causes — hypoglycaemia, head injury, postictal state mimic ABD",
      "Never olanzapine + benzodiazepine simultaneously — high risk respiratory depression",
      "Neurodiversity requires adapted communication — seek family/carer input",
      "Assessment is ongoing — severity is dynamic"
    ]
  },

  mental_health_conditions: {
    cpg: "A0107",
    version: "2.3.1",
    title: "Mental Health Conditions",
    note: "Framework CPG. Key guidance: olanzapine-only sedation patients may not require transport — TelePROMPT can advise community-based care. Use Mental Health Destination Tool / VACIS for appropriate ED destination.",
    disposition: "Use Mental Health Destination Tool, VACIS, or AV Clinician to select appropriate destination"
  },

  // ═══════════════════════════════════════════════
  // CARDIOVASCULAR
  // ═══════════════════════════════════════════════

  syncope: {
    cpg: "A0725",
    version: "1.0.1",
    title: "Syncope",
    patientGroup: "Patients ≥16 years with transient loss of consciousness",
    careObjectives: [
      "Identify patients suffering from syncope",
      "Symptomatic management if required",
      "Identify appropriate care pathway based on risk profile"
    ],
    overview: "Syncope = transient loss of consciousness due to cerebral hypoperfusion. Rapid onset, short duration, spontaneous complete recovery.",
    classification: {
      reflex: "Vasovagal — preceded by unpleasant stimulus, prolonged standing, meals. Autonomic symptoms (pallor, sweating, nausea). Recurrent history. No pre-existing heart disease.",
      orthostatic: "Occurs on standing or immediately post-exertion. Systolic drop ≥20 mmHg or diastolic drop ≥10 mmHg on standing.",
      cardiovascular: "During exertion or when supine. Sudden onset palpitations immediately before collapse. Structural heart or coronary artery disease. Concerning ECG findings."
    },
    highRiskFeatures: [
      "Syncope during exertion",
      "Syncope when supine",
      "Family history of unexplained sudden death at young age",
      "Structural heart or coronary artery disease",
      "Bradycardia not explained by conditioning",
      "2nd or 3rd degree AV block",
      "SVT or paroxysmal AF",
      "Pre-excited QRS complexes (WPW)"
    ],
    management: {
      lowRisk: "Refer to VVED. Must send 12-lead ECG with VVED referral. Self-care: lie flat, elevate feet, move slowly when standing.",
      highRisk: "Transport to ED. Manage as per appropriate CPG for underlying condition."
    },
    differentials: "Syncope may mimic seizure (tonic-clonic movements) — look for tongue biting, incontinence, postictal phase. May also mimic TIA/stroke."
  },

  pulmonary_embolism: {
    cpg: "A0605",
    version: "1.0.0",
    title: "Pulmonary Embolism",
    patientGroup: "All patients with suspected PE",
    careObjectives: [
      "Identify patients in whom PE is a likely diagnosis",
      "Maintain adequate oxygenation and perfusion through supportive care",
      "Targeted management in setting of cardiac arrest"
    ],
    riskFactors: [
      "Previous DVT/PE",
      "Immobilisation or surgery within 4 weeks",
      "Malignancy within 6 months",
      "Oral contraceptive or oestrogen use",
      "Pregnancy",
      "Known thrombophilia"
    ],
    diagnosis: {
      commonSigns: "Dyspnoea, tachypnoea, pleuritic pain — at least one present in >90% of patients with PE",
      ecgFindings: "Sinus tachycardia most common. T wave inversion V1-V4 and Lead III, RBBB, right axis deviation, S1Q3T3 (uncommon). ~25% have no ECG changes."
    },
    management: [
      "Oxygen as per CPG A0001",
      "Avoid NIV if PE is the most likely cause and perfusion is borderline — positive pressure worsens preload",
      "NIV acceptable if other causes more probable and perfusion adequate",
      "Caution with intubation — right heart strain patients prone to sudden decompensation",
      "Manage shock as per Cardiogenic/Inadequate Perfusion CPG",
      "Cardiac arrest: consult AV Clinician for thrombolysis consideration if witnessed arrest due to known/strongly suspected PE. Requires resources for 60 min CPR post-thrombolysis.",
      "ECMO eligible — consult AV Clinician early"
    ]
  },

  // ═══════════════════════════════════════════════
  // RESPIRATORY
  // ═══════════════════════════════════════════════

  upper_airway_obstruction: {
    cpg: "A0603",
    version: "2.0.0",
    title: "Upper Airway Obstruction",
    patientGroup: "Patients aged ≥12 with stridor",
    careObjectives: ["Urgently identify and manage airway obstruction indicated by stridor"],
    overview: "Stridor = obstruction of ≥50% of internal upper airway diameter. Always an emergency. Can be mistaken for asthma — bronchodilators will NOT help.",
    causes: {
      acute: "Infectious (epiglottitis, Ludwig's angina), foreign body, allergic reaction, airway burns",
      chronic: "Structural abnormalities, tumours. Inducible laryngeal obstruction (vocal cord dysfunction)."
    },
    management: [
      "Follow patient's action plan if they have one",
      "Degree of respiratory distress dictates urgency",
      "Intubation is likely to be difficult — prepare dual setup (CPG A0303 Difficult Airway)",
      "Supraglottic techniques unlikely to be effective",
      "Inter-hospital transfer without intubation: notify Adult Retrieval Victoria and formulate airway plan"
    ]
  },

  dyspnoea: {
    cpg: "A0604",
    version: "1.0.0",
    title: "Dyspnoea (Undifferentiated)",
    patientGroup: "Patients aged ≥16 years with dyspnoea",
    careObjectives: [
      "Assess and identify most likely cause; manage as per appropriate guideline",
      "Manage respiratory distress and hypoxia with oxygen or NIV if required"
    ],
    overview: "Dyspnoea is a subjective sensation of breathing discomfort. Wide range of causes. May not be possible to confirm diagnosis in prehospital setting.",
    differentials: {
      respiratory: "Asthma, COPD, pneumonia, PE, pneumothorax, upper airway obstruction, pleural effusion",
      cardiac: "ACS, APO, arrhythmia, cardiac tamponade",
      other: "Stroke, DKA, sepsis, anaphylaxis, toxidromes, anaemia, anxiety/hyperventilation"
    },
    keyDifferentiation: {
      asthma: "Minutes to hours onset. Wheeze/cough/chest tightness. Known history, triggers.",
      copd: "Hours to days. Progressive dyspnoea, increased sputum. Known COPD, smoker.",
      apoCPO: "Hours to days. Pink frothy sputum, orthopnoea. History of cardiac failure.",
      pe: "Acute onset. Pleuritic pain, tachypnoea. Risk factors (DVT, surgery, malignancy)."
    },
    note: "This is a framework CPG — direct to specific CPG once likely cause identified."
  },

  // ═══════════════════════════════════════════════
  // ENDOCRINE / METABOLIC
  // ═══════════════════════════════════════════════

  hyperglycaemia: {
    cpg: "A0713",
    version: "2.0.0",
    title: "Hyperglycaemia and Ketosis (DKA/HHS)",
    patientGroup: "All patients with hyperglycaemia",
    careObjectives: [
      "Identification of high-risk hyperglycaemia",
      "Hydration where indicated"
    ],
    overview: "DKA and HHS are the two most serious metabolic complications of diabetes. DKA = hyperglycaemia + elevated ketones + metabolic acidosis. HHS = severe hyperglycaemia + profound dehydration without elevated ketones.",
    diagnosis: {
      dka: {
        definition: "Ketones >3 mmol/L. Classic signs: dehydration, polyuria, polydipsia, tachypnoea, nausea/vomiting, abdominal pain, altered GCS.",
        ketoneThresholds: "Normal <0.6 | Needs medical review 0.6–3 | DKA suspected >3",
        notes: "DKA can occur at BGL 11–29 mmol/L (euglycaemic DKA possible with SGLT2i). Can occur in undiagnosed diabetes."
      },
      hhs: {
        definition: "Severe hyperglycaemia + profound dehydration, without elevated ketones. Mostly type 2 diabetes. Mortality 5–20%."
      },
      euglycaemicDKA: "SGLT2i (dapagliflozin/empagliflozin) patients can have DKA with near-normal BGL. Check ketones if on SGLT2i and unwell."
    },
    management: [
      "Adequate fluid replacement is the goal of pre-hospital care",
      "Normal Saline: standard patients max 2000 mL, fluid overload risk max 1000 mL, administer over 1 hour if BP >90 mmHg otherwise bolus",
      "Do NOT administer insulin prehospital — worsens clinical status without blood chemistry",
      "Do NOT encourage patient to self-administer insulin prior to transport",
      "Intubate only if unable to maintain airway or severely decompensating respiratorily — tachypnoea manages metabolic acidosis",
      "Transport to ED"
    ],
    pitfalls: [
      "SGLT2i patients can have DKA with normal BGL — always check ketones if on these drugs and unwell",
      "DKA is NOT only young type 1 diabetics — occurs in type 2, elderly, pregnancy",
      "Withholding patient's usual long-acting insulin not recommended"
    ]
  },

  // ═══════════════════════════════════════════════
  // GASTROINTESTINAL / GENERAL
  // ═══════════════════════════════════════════════

  nausea_vomiting: {
    cpg: "A0701",
    version: "3.1.0",
    title: "Nausea and Vomiting",
    patientGroup: "All patients with nausea/vomiting",
    management: {
      general: [
        "If nausea/vomiting tolerated — basic care and referral/transport only",
        "IV Normal Saline reduces nausea regardless of antiemetic (avoid in cardiac/renal failure history)",
        "Pregnant patients: prefer fluid rehydration first; consider severity before ondansetron"
      ],
      ondansetron: {
        route: "ODT (oral disintegrating tablet) preferred. IV available. IM permissible if oral/IV impossible: 4 mg IM (8 mg max).",
        contraindications: "Long QT syndrome — do NOT give. If VT/TdP follows ondansetron, do NOT give amiodarone (further QT prolongation). Cardiovert instead.",
        interaction: "Do NOT use ondansetron for tramadol-induced nausea — antagonises analgesia at same receptor."
      },
      prochlorperazine: "IM route only"
    },
    vvedReferral: "Viral gastroenteritis, influenza-like illness, UTI, food poisoning, medication side effects, hyperemesis of pregnancy, migraine, inner ear disorders, heat illness — all suitable if adequate social support."
  },

  headache: {
    cpg: "A0502",
    version: "2.0.0",
    title: "Headache",
    patientGroup: "Patients ≥16 years with headache",
    careObjectives: [
      "Risk stratify patients with headache",
      "High-risk: transport to ED. Low-moderate risk: VVED referral"
    ],
    classification: {
      primary: "No identifiable pathology — tension, migraine, cluster. Painful but benign.",
      secondary: "Underlying pathology — ranges from life-threatening (ICH, meningitis) to benign (URTI)."
    },
    highRiskFeatures: [
      "Thunderclap headache (sudden onset, worst of life)",
      "New onset ≥50 years",
      "Headache with fever, neck stiffness, photophobia (meningitis)",
      "Progressive headache over days/weeks",
      "Headache after head trauma",
      "Associated neurological symptoms",
      "Headache with immunosuppression or known malignancy",
      "Worsened by position change, coughing, sneezing"
    ],
    migraine: {
      history: "Onset typically adolescence. Recurrent episodes 4–72 hours. Family history common. May have aura.",
      pitfall: "Migraine can mimic stroke, ICH, meningitis. Do NOT attribute symptoms to migraine without previous diagnosis."
    },
    management: {
      highRisk: "Transport to ED",
      lowModerateRisk: "VVED referral. Analgesia as per CPG A0501-1 Pain Relief."
    }
  },

  pain_relief: {
    cpg: "A0501-1",
    version: "Current",
    title: "Pain Relief",
    careObjectives: ["Reduce pain to a degree the patient is comfortable"],
    approach: "Multi-modal analgesia preferred — smaller doses of multiple agents rather than large doses of single agent",
    management: {
      moderate: {
        withIVAccess: "IV opioids + paracetamol preferred. IV preferred in elderly/frail.",
        withoutIVAccess: "IN fentanyl or IN ketamine + paracetamol"
      },
      severe: {
        firstLine: "IV morphine or IV fentanyl titrated to effect. Consult for further doses beyond maximum.",
        ketamineIndications: "Limited effect from opioids, opioids contraindicated, opioid tolerant, patient declines opioids"
      },
      ketamine: {
        cautions: "Anxiety/psychosis history — use with caution. Elderly/frail — prefer IN fentanyl.",
        monitoring: "ETCO2 monitoring and line-of-sight required when ketamine used."
      },
      intranasal: "Half dose each nostril. Max 1 mL per nostril per dose. Add 0.1 mL for dead space in small doses.",
      monitoring: "Minimum every 15 minutes: airway, RR, SpO2, HR, BP, SAT score"
    },
    contraindications: {
      morphine: "Hypotension, nausea/vomiting, severe headache. If contraindicated IM: use fentanyl IM."
    }
  },

  // ═══════════════════════════════════════════════
  // TRAUMA
  // ═══════════════════════════════════════════════

  burns: {
    cpg: "A0805",
    version: "3.2.1",
    title: "Burns",
    careObjectives: [
      "Identify and manage potential airway burns as priority",
      "Maintain tissue perfusion, minimise pain, cool burns appropriately, minimise heat loss"
    ],
    airwayBurnSigns: [
      "Burns to upper torso, neck, face",
      "Facial and upper airway oedema",
      "Sooty sputum",
      "Burns in enclosed space",
      "Singed facial hair (nasal, eyebrows, eyelashes)",
      "Respiratory distress, stridor",
      "Hypoxia (restlessness, irritability, cyanosis, decreased GCS)"
    ],
    management: {
      cooling: "Running water 5–15°C for 20 minutes. Stop if shivering or temp ≤35°C. No ice/iced water. Dirty water avoided. Chemical burns: irrigate until pain resolves.",
      dressing: "Cling wrap applied longitudinally (allows for swelling). Preferred for all burns.",
      heatLoss: "Normothermia is vital. Assess temperature early. Remove burnt/chemical clothing when safe — do not remove adhered matter.",
      fluids: "Volume replacement calculated for burn only. Electrical burns: extra fluid for rhabdomyolysis risk.",
      analgesia: "As per CPG A0501-1"
    },
    wallaceNines: "Head 9%, Torso front 18%, Torso back 18%, Each arm 9%, Each leg 18%, Groin 1%",
    transport: {
      criteria: ">20% TBSA, suspected airway burns, >1000V electrical burns — transport to Alfred Hospital if within 60 min. >60 min: nearest highest trauma service.",
      faceHandsFeetGenitalsJoints: "Assess at major burns service (not necessarily Alfred if distance prohibitive — secondary transfer acceptable)"
    },
    pitfalls: [
      "Intubation + paralysis increases hypothermia risk — temperature management becomes critical",
      "Electrical burns underestimate injury — high rhabdomyolysis risk, extra fluids"
    ]
  },

  chest_injury: {
    cpg: "A0802",
    version: "7.0.1",
    title: "Chest Injury",
    patientGroup: "Patients ≥16 with chest injury",
    careObjectives: [
      "Adequate oxygenation",
      "Effective pain relief to maintain adequate ventilation",
      "Early identification and management of tension pneumothorax"
    ],
    pathologies: {
      ribFractures: ">3 fractures associated with higher complication rates. Flail segment: multiple fractures in >1 location each, segment moves paradoxically on inspiration.",
      pneumothorax: "Air in pleural cavity → partial lung collapse. Simple/open/closed. Monitor for tension progression.",
      haemothorax: "Blood in pleural cavity. Massive >1500 mL can cause tension and hypovolaemia.",
      tensionPneumothorax: "Air valve → progressive expansion → mediastinal shift → obstructive shock + cardiac arrest."
    },
    tensionDiagnosis: {
      spontaneouslyBreathing: "Progressive worsening. Predominantly hypoxaemia and increasing respiratory distress. Haemodynamic compromise is a late sign.",
      ventilated: "Rapid (seconds to minutes). Predominantly haemodynamic compromise + hypoxaemia. Increased peak inspiratory pressure, decreased ETCO2. High index of suspicion post-CPR or in major trauma."
    },
    tensionSigns: "Inadequate perfusion, increasing respiratory distress, SpO2 <92% on O2, distended neck veins, tracheal deviation (unreliable late signs)",
    management: {
      tensionPneumothorax: "Decompress as per CPG A0802 flowchart.",
      openWound: "Do NOT cover open chest wounds unless there is significant haemorrhage — covering may worsen or cause tension pneumothorax. Leave wound open and monitor closely. Vented chest seals only if wound has already been sealed by other agencies.",
      pain: "Adequate analgesia essential — pain limits ventilation. IV opioids + paracetamol.",
      rib: "Monitor and supportive care. High index of suspicion for underlying pneumothorax."
    },
    pitfalls: [
      "Equal air entry does NOT exclude pneumothorax — referred sounds in ventilated patients",
      "Subcutaneous emphysema not always present in pneumothorax",
      "Ventilated patients develop tension rapidly — always high suspicion in major trauma with chest injury"
    ]
  },

  // ═══════════════════════════════════════════════
  // ENVIRONMENTAL
  // ═══════════════════════════════════════════════

  hypothermia: {
    cpg: "A0901",
    version: "3.0.1",
    title: "Hypothermia / Cold Exposure",
    patientGroup: "Patients ≥16 years with hypothermia",
    classification: {
      mild: "32–35°C",
      moderate: "28–32°C",
      severe: "<28°C"
    },
    careObjectives: [
      "Identify and appropriately manage hypothermic patients",
      "Minimise risk of major trauma patients becoming hypothermic"
    ],
    management: {
      allPatients: [
        "Ambulance patient compartment target ≥24°C",
        "Remove wet clothes, dry patient, thermal protection",
        "Warm IV fluids via fluid warmer if available",
        "Do not microwave IV fluid bags"
      ],
      cardiacArrhythmias: "Arrhythmias associated with <33°C. Gentle handling essential. Atrial arrhythmias/bradycardia resolve on rewarming — no antiarrhythmics unless decompensation. Defibrillation and cardioactive drugs may be ineffective at <30°C.",
      cardiacArrest: "If temp <30°C, double interval between adrenaline and amiodarone doses (as per cardiac arrest CPG). VF may resolve spontaneously on rewarming."
    },
    pitfalls: [
      "Hypothermia is insidious — consider in elderly regardless of presenting complaint",
      "Potential major trauma patients get thermal management regardless of temperature",
      "Do not give antiarrhythmics routinely — arrhythmias usually resolve on rewarming"
    ]
  },

  hyperthermia_environmental: {
    cpg: "A0902",
    version: "4.1.0",
    title: "Hyperthermia / Heat Stress",
    careObjectives: [
      "Identify and appropriately manage hyperthermic patients",
      "Aggressive cooling is the focus"
    ],
    definition: "Heat stroke = temperature >40°C with CNS dysfunction. Urgent medical emergency. Treat aggressively if symptoms consistent even if exact temperature not met.",
    management: {
      cooling: "Strip / spray / fan. Vigorous active fanning required — passive AC inadequate. Ice bath if available (especially exertional). Target temperature <40°C within 30 minutes.",
      fluids: "Cold IV fluid titrated to perfusion. Slower rate in elderly or impaired cardiac/renal function. Cold oral fluids if patient able.",
      position: "Flat or lateral. Avoid head-up — worsens hypotension.",
      toxinInduced: "Standard cooling less effective if toxin not addressed. RSI/neuromuscular paralysis may be appropriate in severe toxin-induced hyperthermia (MICA) — see CPG A0719 Drug Induced Hyperthermia."
    },
    riskGroups: "Elderly ≥65 — independent risk factor for hospital/ICU admission and death. Low threshold for transport.",
    exertionalGroups: "Groups affected (e.g. events) — request ice/water resources for multiple patients"
  },

  // ═══════════════════════════════════════════════
  // TOXICOLOGY
  // ═══════════════════════════════════════════════

  tca_toxicity: {
    cpg: "A0723",
    version: "4.1.1",
    title: "Tricyclic Antidepressant (TCA) Toxicity",
    patientGroup: "All patients with suspected TCA toxicity",
    careObjectives: [
      "Management with Sodium Bicarbonate",
      "Supportive management of airway, perfusion, and seizures"
    ],
    commonTCAs: "Amitriptyline (Endep, Entrip) — most common. Also: clomipramine, dosulepin, doxepin, imipramine, nortriptyline.",
    pathophysiology: "Sodium channel blockade → QRS widening + myocardial dysfunction. Alpha-adrenergic blockade → hypotension. Anticholinergic effects.",
    toxicityRisk: "Onset 30–90 min. >10 mg/kg potentially toxic. Severe toxicity >20 mg/kg.",
    clinicalFeatures: {
      mildModerate: "Sedation, tachycardia, anticholinergic toxidrome (mydriasis, warm dry skin, dry mouth, urinary retention, delirium)",
      severe: "Rapid sedation → coma, seizures. QRS widening + tachycardia (early). Progressive QRS widening + bradycardia + ventricular arrhythmias + hypotension (late). Respiratory depression."
    },
    management: {
      soduimBicarbonate: {
        indications: "QRS widening, hypotension, ventricular arrhythmias (NOT QT prolongation alone)",
        dose: "8.4% Sodium Bicarbonate 1–2 mL/kg (up to 100 mL) IV every 3–5 min. Max total 6 mL/kg. Aim pH 7.50–7.55 if iSTAT available. Max 2 doses without consult.",
        preIntubation: "Give 100 mL NaHCO3 IV just prior to intubation to limit acidosis"
      },
      airway: "Consider intubation (ETT) if unable to support own airway + severe toxicity persists",
      seizures: "Midazolam as per seizures CPG"
    },
    pitfalls: [
      "QT prolongation alone is NOT an indication for NaHCO3 — only QRS widening",
      "Rapid deterioration — QRS widening → seizures → cardiac arrest possible quickly",
      "Acidosis worsens toxicity — hyperventilate and give NaHCO3 prior to intubation"
    ]
  },

  beta_blocker_toxicity: {
    cpg: "A0717",
    version: "1.1.2",
    title: "Beta-Blocker Toxicity",
    patientGroup: "Patients with suspected beta-blocker toxicity",
    careObjectives: [
      "Targeted management of bradycardia and inadequate perfusion",
      "Early consultation with VPIC",
      "Supportive management of hypoglycaemia and seizures"
    ],
    pathophysiology: "Beta-blockade → bradyarrhythmias + reduced cardiac output. Propranolol also has Na channel effects (QRS widening). Sotalol has K channel effects (QT prolongation).",
    toxicityRisk: "Onset 1–2 hours (delayed in modified release). Propranolol and sotalol most toxic. Elderly, cardiac disease, co-ingestion with CV medications = higher risk at lower doses.",
    clinicalFeatures: {
      allBetaBlockers: "Bradycardia, hypotension, pulmonary oedema, 1st/2nd/3rd degree heart block. Hypoglycaemia (metabolic).",
      sotalol: "Prolonged QT, Torsade de Pointes",
      propranolol: "Widened QRS complex, ventricular arrhythmias, seizures (Na channel effect)"
    },
    management: {
      atropine: "Treat bradycardia with IV fluids and atropine. Administer through a free-running IV line. An adequate response is not common — further doses may delay progression to other care. If patient initially responds but effect not sustained: repeat 600 mcg to a max total of 3000 mcg.",
      fluidResuscitation: "Normal Saline titrated to response. Standard max 2000 mL, fluid overload risk max 1000 mL.",
      vasopressors: "Commence adrenaline if symptoms persist despite atropine.",
      pacing: "May be required if pharmacological chronotropy fails.",
      hypoglycaemia: "Treat as per Hypoglycaemia CPG",
      seizures: "Midazolam as per Seizures CPG",
      ecmo: "Consider ECMO centre transport if severe cardiogenic shock or cardiac arrest — consult VPIC",
      consultation: "VPIC early — especially co-ingestion, refractory hypotension, arrhythmias"
    },
    pitfalls: [
      "Consult VPIC early — management is complex",
      "Modified release preparations: onset may be delayed",
      "Sotalol → TdP — do NOT give amiodarone",
      "Propranolol → QRS widening (sodium channel) — role of NaHCO3 is unclear; should not be the focus or delay inotropes. Consult VPIC first."
    ]
  },

  ccb_toxicity: {
    cpg: "A0718",
    version: "1.2.0",
    title: "Calcium Channel Blocker (CCB) Toxicity",
    patientGroup: "Patients with suspected CCB toxicity",
    careObjectives: [
      "Targeted management of bradycardia and inadequate perfusion",
      "Early administration of calcium gluconate",
      "Early consultation with VPIC"
    ],
    classification: {
      nonDihydropyridine: "Verapamil, diltiazem — cardioselective, most toxic. Bradycardia + heart block + myocardial depression.",
      dihydropyridine: "Amlodipine, felodipine, lercanidipine, nifedipine, nimodipine — vasoselective. Hypotension, tachycardia (reflex), less bradycardia."
    },
    toxicityRisk: "2–3x usual dose = serious toxicity. >10 tablets can be life-threatening. Onset 1–2 hrs (delayed up to 12 hrs for modified release). One diltiazem/verapamil SR tablet can be fatal in children.",
    clinicalFeatures: {
      all: "Hypotension, shock, altered GCS, hyperglycaemia, lactic acidosis, nausea/vomiting",
      nonDihydropyridine: "Bradycardia/bradyarrhythmias, 1st degree heart block, pulmonary oedema"
    },
    management: {
      calciumGluconate: "10% Calcium Gluconate 30 mL (3 g) IV over 3–5 min. Repeat once if inadequate response.",
      atropine: "600 mcg IV. Atropine often inadequate in CCB toxicity — do not delay calcium for atropine. Max total 3000 mcg if patient initially responds but not sustained.",
      fluids: "Normal Saline titrated. Standard max 2000 mL, fluid overload max 1000 mL.",
      vasopressors: "Adrenaline or noradrenaline if calcium + fluids insufficient (MICA preferred)",
      consultation: "VPIC early. For cardiac arrest — consider mechanical CPR to closest ED (consult VPIC).",
      note: "Graduated approach: calcium → IV fluids → vasopressors/inotropes"
    },
    pitfalls: [
      "Symptoms may be delayed 12 hours with modified release — monitor prolonged period",
      "Atropine often inadequate — do not rely on it, do not delay calcium",
      "Hyperglycaemia expected — CCBs inhibit insulin secretion",
      "ECMO or mechanical support may be required — consult VPIC early"
    ]
  },

  organophosphate_toxicity: {
    cpg: "A0709",
    version: "5.1.1",
    title: "Organophosphate Toxicity",
    patientGroup: "All patients with suspected organophosphate toxicity",
    careObjectives: [
      "Recognise organophosphate toxicity / cholinergic toxidrome",
      "Ensure scene safety and decontamination where required",
      "Administer atropine and ensure sufficient supply"
    ],
    sceneSafety: "Dynamic risk assessment. PPE. Consider deliberate act. Multi-casualty potential.",
    pathophysiology: "Inhibits acetylcholinesterase → excess acetylcholine → cholinergic toxidrome",
    toxidrome: {
      nicotinic: "Tachycardia, hypertension, muscle fasciculations, weakness, paralysis",
      muscarinic: "SLUDGE (salivation, lacrimation, urination, defecation, GI distress, emesis), bronchorrhea, bronchospasm, bradycardia, hypotension, miosis, diaphoresis",
      cns: "Confusion, agitation, seizures, coma"
    },
    management: {
      decontamination: "Remove clothing → plastic bag. Wash skin with soap and water. Isolate emesis. Adequate ventilation.",
      atropine: {
        indication: "Any muscarinic effects present",
        dose: "Atropine IV every 5 minutes, doubling previous dose: 1200 mcg → 2400 mcg → 4800 mcg etc. Up to 25 mg. Paediatric: 50 mcg/kg doubling same pattern.",
        endpoint: "Drying of secretions, not HR or pupil size",
        infusion: "10–20% of total atropine used, per hour (consult VPIC via AV Clinician)"
      },
      supportCare: "Airway, seizures (midazolam), fluids",
      consultation: "VPIC via AV Clinician for inadequate response or complex presentations"
    },
    pitfalls: [
      "Source sufficient atropine early — very large doses required",
      "Do NOT use atropine HR as endpoint — secretion control is the target",
      "Smell from patient is usually solvent, not secondary OP poisoning risk"
    ]
  },

  cyanide_toxicity: {
    cpg: "A0720",
    version: "1.1.0",
    title: "Cyanide Toxicity",
    patientGroup: "All patients with suspected cyanide toxicity",
    careObjectives: [
      "Recognise cyanide toxicity",
      "Early administration of antidote (hydroxocobalamin)",
      "Provide perfusion support if necessary",
      "Transport to nearest ED"
    ],
    sceneSafety: "Dynamic risk assessment. PPE. Consider deliberate act. Multi-casualty potential.",
    pathophysiology: "Blocks oxygen use at cellular level → intracellular hypoxia → anaerobic metabolism → lactic acidosis → widespread cellular hypoxia → respiratory/cardiac arrest. 1 mg/kg ingestion may be lethal. Onset within 30 minutes.",
    sources: "House fires (burning plastics, polyurethane), industrial (mining, electroplating), stone fruit seeds (crushed/blended), cassava root (incorrect preparation)",
    management: {
      antidote: {
        drug: "Hydroxocobalamin (Cyanokit) — binds cyanide ions, allows renal excretion",
        preparation: "5 g in glass vial, reconstituted with 200 mL normal saline. Given IV.",
        availability: "NOT standard AV supply. May be available at high-risk industrial sites.",
        timing: "Early administration essential — rapid deterioration risk"
      },
      supportive: "Oxygen (100%), IV fluids, vasopressors if required",
      houseFires: "Always consider concurrent carbon monoxide poisoning"
    },
    pitfalls: [
      "Consider in ALL house fire patients with unexplained altered GCS or cardiovascular collapse",
      "Hydroxocobalamin not on ambulance — locate at scene (industrial sites may have it)",
      "Concurrent CO poisoning common in house fires"
    ]
  },

  drug_induced_hyperthermia: {
    cpg: "A0719",
    version: "1.0.3",
    title: "Drug Induced Hyperthermia (Serotonin Syndrome / Stimulant Toxidrome)",
    patientGroup: "Patients ≥16 years with suspected drug induced hyperthermia",
    careObjectives: [
      "Early identification",
      "Control temperature — sedate, cool, hydrate",
      "Supportive care"
    ],
    keyFeatures: "Hyperthermia + altered mental status + neuromuscular excitation (tremor, increased tone)",
    causativeAgents: "Amphetamines (ice, speed), cocaine, MDMA (XTC), SSRIs, SNRIs, MAO inhibitors, lithium, tramadol, PCP",
    severity: {
      mild: "Tremor, tachycardia, anxiety, hyperreflexia, dilated pupils, dry mouth, flushed skin",
      moderate: "Agitation, increased muscle tone, tachycardia, hyperthermia <39°C",
      severe: "Hyperthermia ≥39°C, muscle rigidity, seizures, confusion, severe agitation. Clonus may be present."
    },
    management: {
      mild: "Monitor for deterioration. Reduce stimulus — calming environment. Transport.",
      moderate: {
        sedate: "Midazolam — reduces physical activity/tremor/clonus contributing to hyperthermia AND manages ABD. Do NOT use physical restraints without sedation.",
        cool: "Active cooling — strip/spray/fan. IV fluids.",
        consultation: "VPIC via AV Clinician"
      },
      severe: {
        sedate: "Midazolam — titrate to effect",
        cool: "Aggressive active cooling. Ice bath if available.",
        airway: "RSI/intubation may be required — neuromuscular paralysis assists cooling in toxin-induced cases (MICA)",
        consultation: "VPIC mandatory"
      }
    },
    pitfalls: [
      "Physical restraints without sedation are dangerous — exertion worsens hyperthermia",
      "Standard cooling less effective without addressing underlying toxin — may need RSI for neuromuscular paralysis",
      "Clonus is a key diagnostic feature — rhythmic involuntary muscle contractions"
    ]
  },

  quetiapine_toxicity: {
    cpg: "A0721",
    version: "1.2.1",
    title: "Quetiapine Toxicity",
    patientGroup: "Patients with suspected quetiapine toxicity",
    careObjectives: [
      "Airway management",
      "Management of inadequate perfusion"
    ],
    brands: "Seroquel (most common), Kaptan, Quetia, Syquet, Quepine XR, Quetia XR, Tevatiapine XR",
    pathophysiology: "Anticholinergic properties + CNS depression + cardiovascular instability in large doses. Immediate-release and extended-release (XR) available.",
    toxicityRisk: "Adults: >3 g associated with severe CNS depression/hypotension. Onset <4 hrs (standard release), up to 12 hrs (XR). Coma may last >72 hrs after large ingestions.",
    clinicalFeatures: "Tachycardia, hypotension, sedation → coma, respiratory depression, anticholinergic delirium/urinary retention. Seizures rare.",
    management: {
      general: "Supportive care is mainstay. Notify hospital early even when symptoms not yet severe.",
      inadequatePerfusion: [
        "IV fluids first line",
        "Metaraminol or noradrenaline as first-line vasopressors if hypotension persists",
        "Adrenaline with caution (may worsen hypotension via beta-mediated vasodilation) — only after VPIC consultation",
        "Cardiac arrest: adrenaline as per Medical Cardiac Arrest CPG"
      ],
      airway: "Monitor closely. Intubate if unable to protect airway."
    },
    pitfalls: [
      "Avoid adrenaline as first-line vasopressor — may worsen hypotension",
      "XR preparation can have delayed onset up to 12 hrs — prolonged observation required",
      "Coma may last >72 hrs — early hospital notification essential"
    ]
  },

  alcohol_intoxication: {
    cpg: "A0726",
    version: "1.1.0",
    title: "Acute Alcohol Intoxication (Ethanol)",
    patientGroup: "Patients ≥16 years with suspected acute ethanol intoxication, no other acute medical conditions",
    careObjectives: [
      "Identify and assess severity of ethanol toxicity",
      "Protect and support patient dignity",
      "Manage symptoms as required",
      "Low-moderate risk: self-care or sobering services | High risk: transport to ED"
    ],
    overview: "Dose-related CNS depression. Life-threatening with large quantities (aspiration, respiratory depression) especially with CNS depressant co-ingestion.",
    differentials: "Always exclude: seizure/postictal, hypoglycaemia, hypoxia, co-ingestion, acute withdrawal, head trauma, infection/sepsis, psychiatric, stroke/TIA, Wernicke encephalopathy",
    assessment: {
      auditC: "Screening tool for harmful alcohol use. Males ≥4 = misuse. Females ≥3 = misuse.",
      highRiskFeatures: "Features requiring ED: altered GCS, respiratory compromise, suspected co-ingestion, head trauma, withdrawal risk, hypoglycaemia"
    },
    management: {
      lowModerateRisk: "Supportive care. Monitor. Consider sobering services.",
      highRisk: "Transport to ED. Manage complications (airway, hypoglycaemia, seizure)."
    },
    pitfalls: [
      "Chronic alcohol users at risk of withdrawal syndrome even when intoxicated — screen carefully",
      "Aboriginal and Torres Strait Islander people: high risk of unconscious bias from healthcare — be consciously equitable",
      "Toxic alcohols (methanol, ethylene glycol) require VPIC consultation — do NOT manage under this CPG"
    ]
  },

  alcohol_withdrawal: {
    cpg: "A0727",
    version: "1.0.0",
    title: "Alcohol Withdrawal Syndrome",
    patientGroup: "Patients ≥16 years with alcohol withdrawal syndrome",
    careObjectives: [
      "Identify and assess severity",
      "Symptomatic management",
      "Reduce risk of progression to severe withdrawal",
      "Mild/moderate without complex features: community withdrawal | Moderate with complex features/severe: transport to ED"
    ],
    overview: "Up to 50% of alcohol use disorder patients will experience withdrawal when stopping or reducing. Onset 6–24 hours after last drink. Peak 36–72 hours. Subsides within 5–7 days.",
    severity: {
      mild: "Score <5",
      moderate: "Score 5–14",
      severe: "Score >14 (risk of Delirium Tremens)"
    },
    management: {
      antiemetic: "As per N&V CPG",
      analgesia: "As per Pain Relief CPG",
      benzodiazepines: {
        indication: "Significant distress and/or agitation",
        goal: "Rousable drowsiness (SAT 0 or -1). Avoid heavy sedation (SAT -2 or -3).",
        drug: "Midazolam IV preferred. IM same dose if IV access challenging in severe withdrawal.",
        note: "Symptom-based dosing minimises dose and respiratory depression risk"
      }
    },
    pitfalls: [
      "Alcohol withdrawal can occur despite appearing intoxicated in high-volume chronic users",
      "Screen for concurrent mental health conditions — complicates management",
      "Resistance to benzodiazepines is exceedingly rare — consider alternative diagnoses first"
    ]
  },

  // ═══════════════════════════════════════════════
  // MATERNITY
  // ═══════════════════════════════════════════════

  maternity_patient: {
    cpg: "M0101-1",
    title: "The Maternity Patient — General Assessment Framework",
    definitions: {
      term: "37–42 weeks",
      preterm: "23–<37 weeks",
      show: "Vaginal discharge of mucous and blood",
      srom: "Spontaneous rupture of membranes — gush of clear/pink fluid",
      meconium: "Greenish/brown stained amniotic fluid",
      firstStage: "Onset of regular contractions (every 2–20 min, 20–60 sec duration) to full cervical dilatation",
      secondStage: "Full cervical dilatation to birth. Primipara 1–2 hours, Multipara 15–45 minutes.",
      imminentBirth: "Active pushing/grunting, rectal pressure, bulging perineum, presenting part crowning, mother states 'I'm going to have the baby'",
      precipitateBirth: "Unusually rapid labour <4 hours. Rapid intrauterine pressure change may cause cerebral irritation in newborn."
    },
    homeBirthRole: "AV paramedic works with hospital-endorsed midwives. Paramedic takes clinical lead in non-hospital-program home births. PIPER for obstetric emergencies."
  },

  preeclampsia_eclampsia: {
    cpg: "M0202",
    version: "2.0.1",
    title: "Pre-eclampsia / Eclampsia",
    overview: "Time-critical emergencies. Early recognition + intervention + prompt transport reduces mortality.",
    preeclampsiaFeatures: "Headache, cerebral irritability/agitation, visual disturbances (flashing lights), nausea/vomiting, heartburn/epigastric pain, hyper-reflexia. BP elevation of ≥20 mmHg above normal may indicate pre-eclampsia if other signs present.",
    eclampsia: {
      overview: "Most common cause of seizures in pregnancy = pre-existing epilepsy. New onset seizures in latter half of pregnancy most commonly eclampsia.",
      seizures: "Usually <90 seconds and self-limiting. May occur up to 48 hours post-birth. No reliable clinical predictor.",
      definitiveRx: "Birth of the baby"
    },
    management: {
      field: "Supportive care. Early hospital notification. Consult PIPER via Clinician or 1300 137 650.",
      iht_micaOnly: {
        nifedipine: "10 mg oral, repeat after 30 minutes if inadequate",
        magnesiumSulphate: "4 g IV over 10–15 min loading (or IM). Maintenance 1 g/hr for ≥24 hrs post-delivery or last seizure. Dedicated line + controlled infusion device + ECG monitoring.",
        labetalol: "20 mg IV over 2 min. Repeat every 10 min to max 300 mg. Or 20–160 mg/hr infusion.",
        hydralazine: "5–10 mg IV bolus"
      }
    },
    consultation: "PIPER via AV Clinician or 1300 137 650"
  },

  normal_birth: {
    cpg: "M0301",
    version: "2",
    title: "Normal Birth",
    note: "Flowchart-based CPG. Key: imminent birth signs → prepare equipment → warm environment → controlled delivery → clamp and cut cord → assess newborn (CPG N0101) → placenta delivery → PIPER consult if complications."
  },

  breech_birth: {
    cpg: "M0302",
    version: "2",
    title: "Breech / Compound Presentation",
    types: {
      frankBreech: "Buttocks first, flexed hips, extended legs. Most common = 50% of all breech.",
      completeBreech: "Buttocks first, flexed hips and knees.",
      footling: "One or both feet presenting."
    },
    keyPrinciples: [
      "Hands-off approach — encourage spontaneous birth. Do not pull baby.",
      "Only touch to gently support.",
      "Meconium passage is normal as buttocks are compressed.",
      "Cord prolapse more common with breech — be vigilant.",
      "If birth not imminent and known breech: transport to obstetric unit with surgical capacity.",
      "Warm environment essential — cool air can stimulate breathing before head delivered.",
      "Prepare for newborn resuscitation as per CPG N0201."
    ],
    position: "Lithotomy position on stretcher/bed or kneeling on all fours if back not uppermost."
  },

  cord_prolapse: {
    cpg: "M0304",
    version: "2.1.0",
    title: "Cord Prolapse",
    overview: "Time-critical emergency. Early diagnosis + immediate intervention + prompt transport reduces perinatal mortality. Notify hospital early.",
    management: [
      "If birth imminent with crowning: encourage pushing — prepare for newborn resuscitation",
      "Otherwise: relieve cord compression — elevate presenting part off cord manually",
      "Minimise cord handling — vasospasm/contraction risk",
      "Urgent transport to obstetric facility with surgical capability (C-section preferred delivery method)",
      "PIPER consult via Clinician or 1300 137 650"
    ],
    keyHistory: "Time membranes ruptured, duration cord visible, due date, fetal movement, onset of labour, contractions, fetal presentation, PV bleeding"
  },

  shoulder_dystocia: {
    cpg: "M0305",
    version: "2",
    title: "Shoulder Dystocia",
    overview: "Time-critical — 5–7 minutes to deliver due to cord compression against pelvic rim. Newborn likely compromised — prepare resuscitation.",
    management: [
      "Explain situation to mother — maximise cooperation",
      "HELPERR mnemonic approach",
      "McRoberts manoeuvre (hyperflexion of hips) first line",
      "Suprapubic pressure — directed downward",
      "Internal rotational manoeuvres (Rubin, Woods screw)",
      "Deliver posterior arm",
      "If unsuccessful: consult PIPER regarding transport",
      "Document times: head born, manoeuvres used, body delivered"
    ],
    note: "May cause clavicle fracture — manage with arm immobilisation",
    consultation: "PIPER via Clinician or 1300 137 650"
  },

  the_newborn: {
    cpg: "N0101",
    version: "2.3.0",
    title: "The Newborn Baby",
    careObjectives: [
      "Establish and maintain effective respiration",
      "Prevent hypothermia",
      "Transport to appropriate facility"
    ],
    normalValues: {
      weight: "3.5 kg avg full term",
      bloodVolume: "80 mL/kg",
      hr: "110–170",
      rr: "25–60",
      temp: "36.5–37.5°C",
      bgl: "2.6–3.2 mmol/L"
    },
    targetSpO2: {
      min1: "60–70%",
      min3: "70–90%",
      min5: "80–90%",
      min7to10: ">90%"
    },
    oxygenNote: "Supplemental O2 not required if breathing effectively and HR >100. Pulse oximeter: right wrist/hand (pre-ductal).",
    appearance: "Dusky/peripherally cyanosed normal in first few minutes. Blue-ish hands/feet normal first 24 hours.",
    initialAssessment: "Heart rate = most important indicator of effective ventilation. If not breathing effectively + good tone with drying/stimulation → CPG N0201 Newborn Resuscitation.",
    transport: "≥37 weeks no complications → appropriate maternity service. Preterm or required resuscitation → higher level of care. Consult PIPER.",
    viability: "Withhold resuscitation at <22 weeks gestation regardless of signs of life. Consult PIPER for uncertainty."
  },

  newborn_resuscitation: {
    cpg: "N0201",
    version: "3.0.0",
    title: "Newborn Resuscitation",
    patientGroup: "Newborns requiring resuscitation after birth (first 24 hours of life)",
    coreprinciples: [
      "VENTILATION + TEMPERATURE are the most important principles",
      "Supplemental oxygen, IV access, adrenaline are less important and add little value if at expense of ventilation and temperature",
      "Escalate early — call PIPER. Newborn resuscitation = complex, high-acuity, low-frequency skill."
    ],
    initialCare: {
      term32to42wks: "Skin-to-skin on mother. Dry simultaneously. Cover with towels/blanket/bubble wrap. Place beanie.",
      veryPreterm32wksWitnessed: "Leave wet (fluid still warm). Straight into polyethylene bag (hole for head). Dry head and place beanie.",
      veryPreterm32wksUnwitnessed: "Fluid likely cold — dry. Into polyethylene bag with head hole. Beanie."
    },
    initialAssessment: {
      focus: "Adequacy of breathing (regular spontaneous breathing within 15–30 sec with stimulation) + muscle tone (all limbs moving, flexed posture)",
      goodToneAdequateBreathing: "Unlikely to need resuscitation",
      inadequate: "Position in resuscitation area → assess HR → commence positive pressure ventilation if HR <100"
    },
    resuscitationSteps: [
      "Warm and dry",
      "Position airway, suction if required",
      "Stimulate",
      "Positive pressure ventilation (PPV) if HR <100 or inadequate breathing",
      "SpO2 monitoring (right wrist pre-ductal)",
      "Cardiac monitoring",
      "If HR <60 despite PPV: commence chest compressions (3:1 ratio)",
      "IV/IO access — adrenaline 10–30 mcg/kg if HR <60 despite compressions"
    ],
    consultation: "PIPER via Clinician or 1300 137 650"
  }

};

// ═══════════════════════════════════════════════
// ADDITIONAL DRUG REFERENCE (extended)
// ═══════════════════════════════════════════════

const DRUG_REFERENCE_EXTENDED = {
  ondansetron: {
    indications: "Nausea and vomiting",
    routes: "ODT (oral disintegrating tablet), IV, IM",
    doses: {
      adult: "4–8 mg PO/IV. IM: 4 mg (8 mg max as 2 injections for extreme symptoms)",
      paediatric: "Per weight as per paeds CPG"
    },
    contraindications: "Long QT syndrome. If VT/TdP occurs post-ondansetron: do NOT give amiodarone. Cardiovert instead.",
    interaction: "Do NOT use for tramadol-induced nausea — antagonises analgesia"
  },
  sodium_bicarbonate: {
    indications: "TCA toxicity (QRS widening, hypotension, ventricular arrhythmias), pre-intubation in acidosis",
    route: "IV",
    doses: {
      tca: "8.4% NaHCO3 1–2 mL/kg (up to 100 mL) IV every 3–5 min. Max 6 mL/kg total. Max 2 doses without consult.",
      preIntubation: "100 mL 8.4% IV over 2 minutes"
    },
    target: "pH 7.50–7.55 if iSTAT available"
  },
  droperidol: {
    indications: "Acute behavioural disturbance — moderate to severe agitation",
    route: "IM",
    doses: {
      adult: "10 mg IM",
      onset: "5–10 minutes"
    },
    contraindications: "Do NOT combine with benzodiazepines"
  },
  olanzapine: {
    indications: "Acute behavioural disturbance — mild to moderate. Alternative sedation in psychiatric presentations.",
    routes: "IM, oral (ODT)",
    doses: {
      adult: "10 mg IM or oral ODT"
    },
    contraindications: "Do NOT combine with benzodiazepines (respiratory depression risk)"
  },
  hydroxocobalamin: {
    indications: "Cyanide toxicity",
    route: "IV",
    preparation: "5 g in glass vial, reconstituted with 200 mL normal saline",
    availability: "NOT standard AV supply. May be at industrial/mining sites.",
    mechanism: "Binds free cyanide ions → renal excretion"
  },
  calcium_gluconate_extended: {
    indications: "CCB toxicity (primary antidote), hyperkalaemia",
    route: "IV",
    doses: {
      ccbToxicity: "10% Calcium Gluconate 30 mL (3 g) IV over 3–5 min. Repeat once if inadequate.",
      hyperkalaemia: "As per Hyperkalaemia CPG"
    }
  },
  metaraminol: {
    indications: "Vasodilatory shock/hypotension (e.g. quetiapine toxicity, CCB toxicity with vasoplegia)",
    route: "IV",
    note: "First-line vasopressor in quetiapine toxicity (preferred over adrenaline)"
  },
  noradrenaline: {
    indications: "Septic shock, vasodilatory shock where adrenaline may worsen (e.g. quetiapine toxicity)",
    route: "IV infusion",
    note: "Used as first-line vasopressor in quetiapine toxicity alongside metaraminol"
  }
};

const CPG_COMBINATIONS = {
  seizure_hypoglycaemia: {
    cpgs: ["A0703", "A0702"],
    note: "Hypoglycaemia is a common seizure precipitant. BSL mandatory in ALL seizure patients. If BSL <4: treat hypoglycaemia concurrently with seizure management. Dextrose 10% IV 200 mL while managing airway. Midazolam still indicated if actively seizing.",
    priority: "Both simultaneously — airway + glucose correction + seizure termination"
  },
  anaphylaxis_asthma: {
    cpgs: ["A0704", "A0601"],
    note: "Asthma + food allergy in adolescents frequently co-present. Bronchospasm may be anaphylaxis — maintain high index of suspicion. Adrenaline IM is first-line for BOTH. Do NOT manage bronchospasm with salbutamol alone if anaphylaxis is possible.",
    priority: "Adrenaline IM immediately. Salbutamol adjunct only after adrenaline."
  },
  acs_cardiac_arrest: {
    cpgs: ["A0401", "A0201-1"],
    note: "STEMI or ACS can rapidly deteriorate to VF arrest. Treat ACS if perfusing; transition to cardiac arrest CPG if arrest occurs.",
    priority: "Definitive rhythm management. If VF: defibrillation → CPR → drugs."
  },
  stemi_apulmonary_oedema: {
    cpgs: ["A0401", "A0408", "A0406"],
    note: "STEMI with acute LVF (Killip class III/IV). Treat STEMI (aspirin, GTN cautiously, heparin) AND APO (NIV, GTN). STEMI activation and transport priority.",
    priority: "STEMI pathway. APO management concurrent. Aggressive GTN use in LVF STEMI — but cautious in RV infarction."
  },
  trauma_head_injury: {
    cpgs: ["A0810", "A0803"],
    note: "Major trauma with TBI. HAEMORRHAGE control first. Then optimise physiology for brain: normotension (or supranormal), SpO2 94–98%, ETCO2 35–45. Avoid hypotension AND excessive fluid.",
    priority: "Haemorrhage → airway → BP maintenance → ventilation targets → urgent transport."
  },
  sepsis_shock: {
    cpgs: ["A0729", "A0705"],
    note: "Septic shock: sepsis + persistent hypotension despite fluid. qSOFA ≥2 in suspected infection = high risk. Fluid resuscitation + vasopressors if inadequate. Urgent transport.",
    priority: "IV access → fluid → vasopressors if inadequate → transport."
  },
  stroke_hypoglycaemia: {
    cpgs: ["A0711", "A0702"],
    note: "Hypoglycaemia is one of the most common stroke mimics. BSL mandatory in all suspected stroke patients. Treat hypoglycaemia first — neurological deficits may resolve completely.",
    priority: "BSL check immediately. Treat hypoglycaemia if present before labelling as stroke."
  },
  bradycardia_hyperkalaemia: {
    cpgs: ["A0402", "A0724"],
    note: "Hyperkalaemia causes bradyarrhythmia and can progress to sine wave pattern and cardiac arrest. In renal failure patients with bradycardia + ECG changes: suspect hyperkalaemia. Calcium gluconate first (membrane stabilisation), then salbutamol (shift K+ intracellularly). Atropine less effective for hyperkalaemic bradycardia.",
    priority: "Calcium gluconate → salbutamol neb → transport urgently."
  },
  opioid_seizure: {
    cpgs: ["A0722", "A0703"],
    note: "Opioid toxicity can cause seizures (especially tramadol, meperidine). Also consider hypoxia from opioid-induced respiratory depression as seizure cause. Naloxone for respiratory depression. Midazolam if actively seizing.",
    priority: "Airway/ventilation first. Naloxone for respiratory depression. Midazolam for active seizure."
  }
};

// Export for use in scenario trainer
if (typeof module !== 'undefined') {
  module.exports = { CPG_PACKAGES, DRUG_REFERENCE_EXTENDED, CPG_COMBINATIONS };
}
