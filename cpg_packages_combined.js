/**
 * AV Scenario Trainer — CPG Packages
 * Source: Ambulance Victoria ALS-MICA Clinical Practice Guidelines v3.13.1 (December 2025)
 *
 * ============================================================
 * ⚠️  CRITICAL WARNING — READ BEFORE MODIFYING THIS FILE ⚠️
 * ============================================================
 *
 * The fields careObjectives, management, and management_mica are PROTECTED.
 * Their content must be VERBATIM from the AV CPG source document only.
 *
 * DO NOT:
 *   - Add management steps not present in the CPG
 *   - Infer, summarise, or paraphrase clinical content
 *   - Add drug doses, drug names, or clinical rules from memory
 *   - Modify these fields without Tim's explicit instruction
 *
 * EXAMPLE OF THE KIND OF ERROR TO AVOID:
 *   A previous version added a thiamine administration step inferred from
 *   a Wernicke's encephalopathy differential — this was NOT in the CPG.
 *   This type of error is clinically dangerous.
 *
 * The 'notes' field is the ONLY field that may contain non-verbatim content.
 * It is used for AI scenario generation context only and is never displayed.
 *
 * If you are asked to update clinical content, ask Tim to confirm before proceeding.
 * ============================================================
 *
 * Structure:
 *   careObjectives  — verbatim from CPG "Care Objectives" section
 *   management      — ALS-scope steps, verbatim, flat string array
 *   management_mica — MICA-only steps, verbatim, flat string array
 *   notes           — optional AI context only, non-displayed
 *
 * ALS/MICA split rules:
 *   - ALS-scope steps (including "consult for X") → management
 *   - MICA-only steps (infusions, intubation, BiPAP/NIV detail, vasopressors,
 *     finger thoracostomy, thrombolysis, RSI drugs) → management_mica
 *   - Steps appear in one array only, never both
 */

// =============================================================
// ADULT CPGs — A SERIES
// =============================================================

const CPG_PACKAGES = {

  // -----------------------------------------------------------
  // A0001 Oxygen Therapy
  // -----------------------------------------------------------
  oxygen_therapy: {
    cpg: "A0001",
    title: "Oxygen Therapy",
    careObjectives: [
      "Provide oxygen therapy for patients with hypoxaemia or critical illness as required",
      "Provide targeted oxygen therapy to avoid harms associated with excessive oxygen administration",
      "Provide continuous high flow oxygen regardless of SpO\u2082 for management of specific conditions where required"
    ],
    management: [
      "Oxygen is a treatment specifically for hypoxaemia and has no impact on the sensation of breathlessness in patients without hypoxaemia",
      "Administer oxygen to achieve the target SpO\u2082 while continuously monitoring for changes in condition",
      "Oxygen should not be administered unless indicated as it may be harmful",
      "Target SpO\u2082 92\u201396% (most patients)",
      "Target SpO\u2082 88\u201392% if risk of hypercapnic respiratory failure: COPD, neuromuscular disorders, cystic fibrosis, bronchiectasis, severe kyphoscoliosis, obesity, any patient prescribed home BiPAP",
      "Prioritise administering oxygen before assessing SpO\u2082 in acutely breathless or critically ill patients \u2014 titrate to target once stable",
      "If pulse oximetry unavailable or unreliable: 2\u20136 L/min via nasal cannulae, or 15 L/min via NRB mask if severe hypoxaemia suspected",
      "Standard nasal cannulae: FiO\u2082 0.24\u20130.44 at 1\u20136 L/min",
      "Non-rebreather mask: FiO\u2082 0.6\u20130.9 at 10\u201315 L/min. Do not use at flow rates < 10 L/min (CO\u2082 retention risk)",
      "Position conscious patient upright if possible",
      "Severe hypoxaemia / critical illness (cardiac arrest, major trauma, shock, severe sepsis, anaphylaxis): administer high flow oxygen regardless of hypercapnic failure risk; titrate once haemodynamically stable and reliable SpO\u2082 obtained",
      "Maintain oxygen therapy regardless of SpO\u2082 in: suspected toxic gas inhalation (CO, cyanide, house fires), cluster headache (patient confirms diagnosis), decompression illness, sickle cell acute crisis",
      "Paraquat poisoning: target SpO\u2082 85\u201388% (oxygen potentiates lung injury)"
    ],
    management_mica: [],
    notes: "Core supportive CPG applied across almost all clinical scenarios. Key teaching points: avoid hyperoxia, hypercapnic failure risk in COPD/chronic lung disease, high flow unrestricted in critical illness."
  },

  // -----------------------------------------------------------
  // A0201-1 Medical Cardiac Arrest
  // -----------------------------------------------------------
  medical_cardiac_arrest: {
    cpg: "A0201-1",
    title: "Medical Cardiac Arrest",
    careObjectives: [
      "High quality chest compressions with minimal interruptions",
      "Rapid defibrillation of VF / pulseless VT (if in doubt, shock)",
      "Advanced care (e.g. adrenaline, antiarrhythmics, intubation) where it does not interrupt high-quality compressions / defibrillation",
      "Address correctable causes where possible"
    ],
    management: [
      "Prioritise immediate rhythm interpretation and defibrillation on arrival \u2014 time to first defibrillation \u2264 2 minutes",
      "Perform chest compressions while defibrillator is being applied",
      "HP-CPR: Rate 100\u2013120/min, depth \u2265 5 cm, full recoil, 1 second per ventilation, 2 minute compressor rotations",
      "Minimise interruptions to chest compressions \u2264 3 seconds",
      "Charge defibrillator during compressions; resume compressions immediately after shock or disarm",
      "Pause CPR briefly to interpret rhythm before delivering shock \u2014 do not make defibrillation decision on See-Thru CPR alone",
      "Shock advisory mode not compatible with HP-CPR \u2014 do not combine",
      "C:V ratio no airway/SGA: 30:2, pause for ventilations",
      "C:V ratio ETT/SGA in situ: 15:1, 6\u20138 ventilations/minute, no pause for ventilations",
      "SGA is appropriate initial airway option to facilitate continuous compressions. ETT should not interrupt compressions",
      "Fluid in shockable rhythms may be detrimental \u2014 limit to medication flush and TKVO only",
      "Refractory VF/VT (\u2265 3 shocks): check pad placement. Sternal pad: right chest under clavicle above nipple. Apex pad: left mid-axillary line, 6th ICS",
      "Monitored VF/VT: up to 3 stacked shocks \u2014 first shock within 20 seconds; < 10 second pause between shocks. Treat stacked shocks as single shock for medication purposes",
      "Adrenaline 1 mg IV/IO: VF/VT \u2014 after 2nd shock; PEA/Asystole \u2014 as soon as resources allow without interrupting HP-CPR",
      "Antiarrhythmics for refractory VF/VT: administer after 3rd shock (and 5th, 7th, 9th). Acceptable in same HP-CPR cycle as adrenaline",
      "ECMO transport eligibility (all must be met): age 16\u201370, suspected cardiac cause, bystander or paramedic witnessed, timely effective compressions, initial rhythm VF/VT, no major comorbidities, collapse-to-ED < 60 min achievable, ECMO-1 not dispatched",
      "ECMO workflow: ~10 rounds (20 min) HP-CPR + intubation before transport. Do not apply mCPR until 16 min of resuscitation. Notify hospital early. Prefer Alfred Hospital if transport times approximately equal",
      "During ECMO transport: continue adrenaline 1 mg IV/IO every 4 minutes; rhythm check every 2 minutes",
      "mCPR as last resort only: limited resources (1\u20132 staff), all staff extremely fatigued, no other option for effective manual CPR. Never apply mCPR to facilitate other interventions",
      "Pregnant patient (> 20 weeks): manual uterine displacement to the left throughout arrest; or 15\u201330\u00b0 left tilt if not feasible",
      "VAD patient: anterior-posterior pad placement. Do not disconnect pump. Contact Alfred Heart Failure Registrar/Consultant via AV Clinician ASAP",
      "Hypothermia < 30\u00b0C: double interval for adrenaline, amiodarone, lidocaine doses",
      "Tension pneumothorax as cause of arrest: decompress bilaterally. Do not routinely decompress in medical arrest without confirmation (use POCUS if credentialled)",
      "Hyperkalaemia arrest: only use calcium if K\u207a known > 6 mmol/L OR strongly suspected (renal failure/dialysis, significant crush injury). Flush 10 mL NS between calcium gluconate and sodium bicarbonate",
      "PEA where hypovolaemia or anaphylaxis suspected: normal saline 1000\u20132000 mL IV",
      "Asthma arrest: immediate interventions \u2014 adrenaline IM/IV; prioritise IV adrenaline and early intubation",
      "Hypoglycaemia: measure BGL after all other management established \u2014 do not interrupt other care",
      "Consider CPG A0203 Withholding or Ceasing Resuscitation where clear signs of prolonged arrest or futility"
    ],
    management_mica: [
      "CPRIC: if interference with CPR, gag reflex preventing oxygenation/ventilation/SGA/ETT insertion, or combative movements \u2014 Ketamine 50\u2013100 mg IV every 1\u20132 minutes (no max dose); no IV access: Ketamine 200 mg IM single dose. Consider patient weight and severity",
      "Consider Rocuronium 150 mg IV to facilitate intubation if unable to provide adequate oxygenation/ventilation following at least 1.5 mg/kg IV Ketamine",
      "Intra-arrest thrombolysis: consult AV Medical Advisor via AV Clinician as per CPG A0408 STEMI Management if witnessed arrest due to known or strongly suspected PE. Only if sufficient resources for HP-CPR for up to 60 minutes post-administration"
    ],
    notes: "Highest frequency critical CPG. Key scenario variables: rhythm, witness status, downtime, cause, ECMO eligibility, special circumstances (pregnancy, hypothermia, hyperkalaemia, PE, asthma)."
  },

  // -----------------------------------------------------------
  // A0201-2 Traumatic Cardiac Arrest
  // -----------------------------------------------------------
  traumatic_cardiac_arrest: {
    cpg: "A0201-2",
    title: "Traumatic Cardiac Arrest",
    careObjectives: [
      "Major haemorrhage control over all other interventions",
      "Management of correctable causes in order of clinical need: Hypoxia, Tension pneumothorax, Hypovolaemia",
      "Standard cardiac arrest management concurrent to addressing correctable causes (if resources permit)"
    ],
    management: [
      "Treat correctable causes in order of clinical need \u2014 prioritised over standard cardiac arrest care (compressions, adrenaline)",
      "Haemorrhage control is absolute priority: arterial tourniquets, haemostatic dressings/wound packing, direct pressure",
      "Undifferentiated blunt trauma: pelvic splint after other interventions; if pelvic fracture clearly contributing to arrest, may apply earlier",
      "Airway: manage hypoxia \u2014 basic airway management and SGA appropriate",
      "Chest decompression: needle thoracostomy if finger thoracostomy unavailable or delayed",
      "Fluid resuscitation: normal saline; packed red blood cells (PRBC) preferred where available",
      "PRBC in legal minor (< 18 years): only if parent/guardian consents OR medical doctor approves",
      "PRBC with religious objection: do not administer to patient with known objection (e.g. Jehovah\u2019s Witness) who refuses consent",
      "Standard cardiac arrest care concurrently if resources permit",
      "Penetrating truncal trauma with PEA, Major Trauma Service within 20 minutes: transport immediately Signal 1, early notification. Limited interventions only: haemorrhage control, basic airway \u00b1 SGA, chest decompression. No compressions during transport. Do not delay for MICA, mCPR, IV or ETT",
      "Severe crush injury arrest: manage Hyperkalaemia as per CPG A0201-1 Medical Cardiac Arrest",
      "ROSC achieved: manage as per CPG A0810 Major Trauma",
      "Consider CPG A0203 Withholding or Ceasing Resuscitation where clear signs of prolonged arrest or futility"
    ],
    management_mica: [
      "Finger thoracostomy: preferred method for chest decompression in traumatic arrest (where credentialed)",
      "PRBC administration: MICA paramedics credentialed in blood component administration may administer PRBC",
      "Focused assessment with sonography for trauma (FAST/POCUS): where all correctable causes addressed, may assess cardiac wall motion, cardiac tamponade, and adequacy of decompression (where credentialled)"
    ],
    notes: "Key differentiator from medical arrest: haemorrhage control and H's first. Penetrating truncal trauma scoop-and-run rule. Pelvic splint timing."
  },

  // -----------------------------------------------------------
  // A0202 ROSC Management
  // -----------------------------------------------------------
  rosc_management: {
    cpg: "A0202",
    title: "ROSC Management",
    careObjectives: [],
    management: [
      "Excessive fluid during intra-arrest and post-ROSC period may be detrimental \u2014 total fluid (including RSI) should not exceed 20 mL/kg unless correcting suspected hypovolaemia",
      "Cause of arrest unclear: assume cardiac cause, transport to PCI-capable facility where possible",
      "Measure BGL post-ROSC where resources allow and other priorities addressed; treat hypoglycaemia as per CPG A0702"
    ],
    management_mica: [
      "Severe post-ROSC agitation/combativeness obstructing care: Ketamine 50\u2013100 mg IV every 1\u20132 minutes (no max dose); no IV access: Ketamine 200 mg IM single dose. Consider half dose if patient is shocked"
    ],
    notes: "Post-ROSC: fluid restriction, PCI destination, BGL. MICA: sedation for combative post-ROSC patient, RSI preparation."
  },

  // -----------------------------------------------------------
  // A0203-1 Withholding or Ceasing Resuscitation
  // -----------------------------------------------------------
  withholding_resuscitation: {
    cpg: "A0203-1",
    title: "Withholding or Ceasing Resuscitation",
    careObjectives: [
      "Identify patients who will not benefit from resuscitation or where there is a legal requirement to withhold resuscitation",
      "Provide guidance for the cessation of resuscitation following an unsuccessful resuscitation attempt"
    ],
    management: [
      "Where unclear whether to withhold: commence resuscitation while gathering information",
      "Obvious death criteria \u2014 withhold resuscitation if any of: injuries where survival is impossible (decapitation, incineration, cranial destruction, hemicorporectomy), rigor mortis, postmortem lividity, putrefaction/decomposition, death declared by doctor at scene",
      "Advance Care Directive (ACD): legal obligation to act in accordance with a sighted ACD; accept in good faith from those present that supporting documentation exists",
      "ACD must be followed even where emergency is unrelated to pre-existing illness. If wishes unknown or documentation doubtful: provide routine care",
      "Emergency treatment may be provided without consent to person lacking decision-making capacity \u2014 do not delay searching for ACD; must comply with a known ACD",
      "Medical treatment decision maker: determined as per CPG A0111 Consent and Capacity"
    ],
    management_mica: [],
    notes: "Process/legal CPG. Obvious death criteria, ACD obligations, decision maker hierarchy."
  },

  // -----------------------------------------------------------
  // A0203-2 Verification of Death
  // -----------------------------------------------------------
  verification_of_death: {
    cpg: "A0203-2",
    title: "Verification of Death",
    careObjectives: [],
    management: [
      "Verification of Death: establishing that death has occurred after thorough clinical assessment. Registered Paramedics can provide verification if in context of employment and certainty of death exists \u2014 not mandatory",
      "Six clinical determinants of death (all must be present): (1) No palpable carotid pulse; (2) No heart sounds for 2 minutes; (3) No breath sounds for 2 minutes; (4) Fixed and dilated pupils; (5) No response to centralised stimulus (supraorbital, mandibular or sternal pressure); (6) No motor response or facial grimace to painful stimulus (inner elbow or nail bed pressure)",
      "Optional seventh finding: ECG asystole over 2 minutes",
      "Ideally assess determinants 5\u201310 minutes after cessation of resuscitation to ensure no late ROSC",
      "Verification of Death form: record all findings, full name (if known), location, estimated date/time of death, paramedic name, whether treating doctor notified",
      "Notify police for reportable or reviewable death \u2014 crew remain on scene until police arrive. SIDS cases are reportable",
      "Certification of cause of death remains with a Medical Practitioner"
    ],
    management_mica: [],
    notes: "Six determinants all required. Certification of cause remains with medical practitioner."
  },

  // -----------------------------------------------------------
  // A0301 Essential Airway Management
  // -----------------------------------------------------------
  essential_airway: {
    cpg: "A0301",
    title: "Essential Airway Management",
    careObjectives: [
      "Safe and effective maintenance of airway patency, oxygenation, and ventilation"
    ],
    management: [
      "A requirement for airway support may range from transient fundamental management to emergency surgical airway — the guideline does not need to be followed sequentially",
      "Fundamental airway techniques are often appropriate for the pre-hospital phase, particularly if advanced airway would delay hospital arrival in patients who benefit from definitive care (e.g. trauma)",
      "Conscious state alone is not sufficient to predict need for airway management — consider in conjunction with overall clinical presentation and underlying cause",
      "Prepare for each airway as an anticipated difficult airway",
      "BONES mnemonic (difficult BVM): Beard, Obese, No teeth, Elderly, Sleep apnoea/snoring",
      "RODS mnemonic (SGA may be difficult): Restricted mouth opening, Obstruction (including c-spine), Distorted airway, Stiff lungs (bronchospasm)",
      "BVM: ensure pop-off valve set to override (closed). Use oropharyngeal and/or nasopharyngeal airways early. Use two-person VE or CE grip technique wherever possible",
      "Continuous waveform ETCO\u2082 must be used for all assisted ventilations as soon as practicable",
      "Obese patients may require higher PEEP to support effective oxygenation",
      "SGA: no requirement to trial other adjuncts prior to insertion if clinician identifies SGA as most appropriate for condition",
      "iGel\u00ae sized by predicted body weight not actual body weight. Generally: < 170 cm \u2192 Size 3; > 200 cm \u2192 Size 5",
      "Escalation of care for any patient requiring active airway management and/or assisted ventilation (may be stood down if cause is identified and rectified, e.g. opioid toxicity resolving with naloxone)"
    ],
    management_mica: [],
    notes: "Foundational airway CPG. BONES and RODS mnemonics for anticipating difficulty. iGel sizing. BVM technique points."
  },

  // -----------------------------------------------------------
  // A0302 Endotracheal Intubation (MICA)
  // -----------------------------------------------------------
  endotracheal_intubation: {
    cpg: "A0302",
    title: "Endotracheal Intubation",
    careObjectives: [
      "To safely and effectively undertake endotracheal intubation in patients who cannot be managed with other airway techniques"
    ],
    management: [],
    management_mica: [
      "Pre-hospital intubation requires dynamic risk-benefit analysis: anatomical, physiological, and situational difficulty. Should not significantly delay transport",
      "Single-responder MICA in rural/regional areas: must consult AV Medical Advisor via AV Clinician before proceeding with RSI",
      "Video laryngoscopy (VL) with Macintosh blade and bougie: routinely used for all first attempts",
      "Patient positioning: 'sniffing position' during pre-oxygenation and intubation \u2014 external auditory meatus level with sternal notch",
      "Physiologically difficult airway (hypoxaemia, cardiovascular instability, RV dysfunction, raised ICP, obesity, pregnancy): benefit from prolonged resuscitation prior to intubation",
      "Shocked patients: second IV or IO access preferred prior to intubation. Manage as per CPG A0705 Shock / A0407 Cardiogenic / A0810 Major Trauma first (may include blood products or vasopressor infusions)",
      "Peri-intubation hypotension risk factors (increasing age, frailty, active bleeding, shock index > 1): use half dose ketamine for induction and a bolus of metaraminol",
      "Pre-oxygenation: BVM with PEEP valve or BiPAP NIV. Routinely place nasal cannula 15 L/min for apnoeic oxygenation",
      "Verbalise critical desaturation threshold to team. For adequately oxygenated patient: < 90%. Lower in difficult-to-oxygenate patients",
      "Delayed Sequence Intubation (DSI): for combativeness preventing safe pre-oxygenation. Avoid rapid ketamine administration (risk apnoea). Goal is optimisation of SpO\u2082 prior to paralytic, not normalisation",
      "Following DSI pre-oxygenation: if patient clinically improves, consult AV Medical Advisor before proceeding",
      "Crash RSI (MFP only): for unconscious patients requiring immediate airway management to prevent arrest. Small procedural ketamine bolus (20\u201330 mg) required prior to full dose paralysis",
      "Remove ETT immediately if any doubt about tracheal placement",
      "Two capnographs must be connected and functional prior to all intubation attempts. If waveform lost on both devices with circuit connected and valve closed: immediately remove ETT and enter Difficult Airway Guideline",
      "Post-intubation sedation: fentanyl/midazolam infusion preferred. Morphine/midazolam if fentanyl contraindicated (e.g. serotonin syndrome). Propofol may be considered where available",
      "Fentanyl/Midazolam infusion: Fentanyl 300 mcg + Midazolam 30 mg diluted to 30 mL. Rate: 1\u201315 mL/hr (Fentanyl 10\u2013150 mcg/hr, Midazolam 1\u201315 mg/hr)",
      "Morphine/Midazolam infusion: Morphine 30 mg + Midazolam 30 mg diluted to 30 mL. Rate: 1\u201315 mL/hr",
      "Routine post-intubation paralysis indicated in suspected neurological emergencies (TBI, intracranial haemorrhage) and for prevention of shivering during therapeutic cooling"
    ],
    notes: "MICA-only CPG. RSI pathways: Standard, Dose-Adjusted, High GCS, Delayed Sequence, Crash (MFP only). Physiologically difficult airway concept important for scenario generation."
  },

  // -----------------------------------------------------------
  // A0303 Difficult Airway Guideline (MICA)
  // -----------------------------------------------------------
  difficult_airway: {
    cpg: "A0303",
    title: "Difficult Airway Guideline",
    careObjectives: [
      "Safe oxygenation and ventilation of patients receiving endotracheal intubation",
      "Escalation of airway interventions in response to unsuccessful attempts at securing the airway"
    ],
    management: [],
    management_mica: [
      "Plan A: Optimised first intubation attempt. Standard: Macintosh video laryngoscope and bougie. Patients should be adequately resuscitated prior to commencing Plan A",
      "Head-Scope-Throat analysis on Grade 3/4 view: Head (position, right lip retraction, head elevation, change intubator); Scope (blade length, tongue position, extra lift, hyper-angulated VL); Throat (external laryngeal manipulation)",
      "Plan B: Optimised alternative second attempt. Must involve alternative strategy correcting identified Plan A issues. Consider stylet and/or hyper-angulated video laryngoscope. Generally limit to 2 attempts; third attempt only if SpO\u2082 maintained, prolonged transfer, and identified corrective strategy",
      "Plan C: Rescue airway strategy. Preferred: SGA. Alternative: two-handed BVM with basic adjuncts. If successful in non-arrest: commence sedation per CPG A0302 and consult AV Medical Advisor for care planning",
      "Dual setup: one MICA paramedic attempts ONE ETT while other is immediately prepared for front of neck access (cricothyroid membrane marked, equipment ready). Used where intubation unavoidable despite very high anticipated difficulty (airway burns, neck trauma, anaphylaxis)",
      "Plan D: Cricothyroidotomy \u2014 CICO situation (can't intubate, can't oxygenate) is life-threatening. Proceed without delay. In critical desaturation at immediate risk of cardiac arrest, may proceed directly to Plan D"
    ],
    notes: "MICA-only airway escalation. Plans A\u2013D. CICO \u2192 immediate cricothyroidotomy."
  },

  // -----------------------------------------------------------
  // A0306 Tracheostomy / Laryngectomy Airway Emergencies
  // -----------------------------------------------------------
  tracheostomy_laryngectomy: {
    cpg: "A0306",
    title: "Tracheostomy / Laryngectomy Airway Emergencies",
    careObjectives: [
      "Secretion clearance",
      "Establish airway (stoma) patency",
      "Oxygenation +/- ventilation via the stoma"
    ],
    management: [
      "Tracheostomy: stoma to trachea with larynx intact \u2014 patient may breathe via stoma and potentially mouth/nose",
      "Laryngectomy: larynx completely removed \u2014 patient CANNOT be oxygenated, ventilated or intubated via the mouth. Only airway is the stoma",
      "Default route of oxygenation and ventilation: the stoma (appropriate for both tracheostomy and laryngectomy)",
      "Where patient history uncertain: provide oxygen via both stoma and mouth. Stoma is priority",
      "If two oxygen sources available: second mask to face (some tracheostomy patients benefit from oxygenation via partially patent upper airway)",
      "Suction: adult 10\u201312 FG Y catheter. Insert > 10 cm, apply continuous suction, slowly withdraw < 10 seconds",
      "Establish patency: remove potentially blocked devices and pass suction catheter (remove cap, cover, speaking valve, HME filter, inner tube if present). Do not remove outer tracheostomy tube or laryngectomy tube at this stage. Do not remove tracheoesophageal puncture valves",
      "If suction catheter can be passed: suction as required. Repeat as needed for copious secretions",
      "If tube is blocked and has a cuff: deflate cuff without removing tube \u2014 may partially correct displacement and allow spontaneous ventilation. Suction following deflation (secretions may release into lower airways)",
      "Unable to pass suction catheter and cuff deflation ineffective: remove tracheostomy tube",
      "Apnoeic/cardiac arrest: attempt ventilation/intubation via the stoma. Assess for air leak through mouth during stoma ventilation \u2014 if present, cover stoma with occlusive dressing and manage via upper airway",
      "Patients and carers often familiar with management \u2014 consider their advice and follow any action plans present"
    ],
    management_mica: [],
    notes: "Key distinction: tracheostomy has intact larynx (two airways), laryngectomy has no upper airway. Always default to stoma."
  },

  // -----------------------------------------------------------
  // A0307 Mechanical Ventilation (MICA)
  // -----------------------------------------------------------
  mechanical_ventilation: {
    cpg: "A0307",
    title: "Mechanical Ventilation",
    careObjectives: [
      "Lung-protective ventilation of patients receiving mechanical ventilation",
      "Management of patient-ventilator asynchrony"
    ],
    management: [],
    management_mica: [
      "Preferred ventilator mode: Volume-controlled SIMV+PS (synchronised intermittent mandatory ventilation with pressure support)",
      "Accurate patient height measurement required for lung-protective ventilation optimisation",
      "Peak inspiratory pressure (PIP): reflects airway resistance. Maintain below 35 cmH\u2082O where feasible",
      "Plateau pressure (Pplat): reflects alveolar pressure/compliance. Maintain below 30 cmH\u2082O",
      "Elevated PIP (not Pplat): likely airway resistance issue \u2014 bronchospasm, secretions, kinked ETT, circuit kink, endobronchial intubation",
      "Elevated PIP and Pplat: likely compliance issue \u2014 abdominal distension, pleural effusion, pneumothorax, pulmonary oedema, ARDS",
      "Asynchrony troubleshooting steps: check ETT position/cuff/circuit; check tidal volume/PEEP/RR using Adult Mechanical Ventilation Calculator; increase respiratory rate (largest difference); consider increasing sedation; treat bronchospasm; suction ETT",
      "Failure to trigger: manage AutoPEEP per underlying pathology; reduce trigger threshold to increase triggering without autotriggering",
      "Autotriggering: identify artefact source (fluid in circuit, air leak); increase trigger threshold gradually",
      "Inadequate flow (severe acidosis): maintain spontaneous respirations to support CO\u2082 offloading (except concurrent TBI); reduce rise time; manage pain and distress; increase sedation",
      "Flow overshoot: lengthen rise time; paralysis if poor lung compliance",
      "Premature cycling: increase inspiratory time; decrease cycle threshold",
      "Delayed cycling: shorten inspiratory time (may need reduced tidal volume); increase flow threshold for cycling",
      "Asthma: will require tolerance of extremely high airway pressures while managing underlying physiology",
      "Use Post-Intubation Hypoxia / High Pressures Emergency Checklist"
    ],
    notes: "MICA-only CPG. Entire CPG is post-intubation ventilator management. SIMV+PS preferred mode."
  },

  // -----------------------------------------------------------
  // A0308 Choking
  // -----------------------------------------------------------
  choking: {
    cpg: "A0308",
    title: "Choking",
    careObjectives: [
      "To identify the severity of foreign body airway obstruction",
      "Immediately manage foreign body airway obstruction causing inadequate ventilation"
    ],
    management: [
      "Adequate ventilation (effective cough, able to speak, able to breathe, normal conscious state): encourage patient to cough; monitor closely for deterioration",
      "Inadequate ventilation (ineffective cough, unable to speak, unable to breathe/silent chest/cyanosis, altered conscious state): immediate intervention required",
      "Alternate back blows and chest thrusts until obstruction dislodged or patient deteriorates. Assess between each blow/thrust",
      "Back blows: firm heel-of-hand strike between shoulder blades. Adults/larger children: brace against support; smaller children: across clinician's knees; infants: head down on clinician's forearm",
      "Chest thrusts: rapid forceful thrust to centre of chest with back supported. Similar to chest compressions but sharper and slower rate",
      "Unconscious: manually remove visible obstruction; suction; laryngoscope and Magill's forceps (concurrent with chest thrusts or CPR); CPR as required"
    ],
    management_mica: [
      "Cricothyroidotomy: prepare using dual setup as per CPG A0303 with concurrent airway clearance attempts. Proceed immediately to cricothyroidotomy if obstruction cannot be relieved by laryngoscopy/Magill's or intubation unsuccessful on first attempt"
    ],
    notes: "FBAO management. Adequate vs inadequate ventilation distinction. Back blows and chest thrusts. Unconscious: laryngoscope/Magill's. MICA: cricothyroidotomy for CICO."
  },

  // -----------------------------------------------------------
  // A0401 Acute Coronary Syndromes
  // -----------------------------------------------------------
  acs: {
    cpg: "A0401",
    title: "Acute Coronary Syndromes",
    careObjectives: [
      "Rapid identification of STEMI to facilitate timely reperfusion (PCI or PHT) is the primary goal of prehospital management.",
      "Provision of antiplatelet therapy (aspirin).",
      "Reduce cardiac workload by treating associated symptoms (e.g. nausea, pain)."
    ],
    management: [
      { type: "assess", items: ["Signs and symptoms", "12-lead ECG (within 10 minutes)", "Rx already administered (e.g. aspirin, GTN)"] },
      { type: "stop", text: "Request early MICA / aeromedical support in suspected STEMI and provide early hospital notification" },
      { type: "header", text: "Antiplatelet Rx" },
      { type: "action", text: "Aspirin 300 mg oral if not already administered" },
      { type: "header", text: "Pain Relief" },
      { type: "action", text: "GTN 600 mcg S/L if SBP > 100 mmHg" },
      { type: "action", text: "GTN 300 mcg S/L if no prev. admin, borderline BP or small (\u2264 60 kg), elderly or frail Pts" },
      { type: "action", text: "Repeat 300 or 600 mcg S/L @ 5 minute intervals titrated to pain or side effects" },
      { type: "action", text: "GTN patch 50 mg (0.4 mg/hr) upper torso / arms" },
      { type: "action", text: "Remove patch if BP falls < 100 mmHg" },
      { type: "subheader", text: "Inadequate response or Nitrates C/I" },
      { type: "action", text: "Treat with opioids as per CPG A0501 Pain Relief" },
      { type: "header", text: "Isolated Hypertension" },
      { type: "note", items: ["SBP > 160 mmHg or", "DBP > 100 mmHg"] },
      { type: "mica", text: "GTN 300 mcg S/L" },
      { type: "mica", text: "Repeat 300 mcg @ 5 minute intervals if hypertension persists" },
      { type: "header", text: "STEMI" },
      { type: "action", text: "If onset < 12 hours continue Rx as per CPG A0408 STEMI Management" },
      { type: "action", text: "If onset > 12 hours transmit 12-lead ECG and provide hospital notification" },
      { type: "action", text: "Notify ARV via clinician where secondary transfer may be required" },
      { type: "header", text: "NSTEACS / unstable angina" },
      { type: "action", text: "Transport to appropriate facility" }
    ],
    notes: "STEMI = PCI destination primary. PHT (pre-hospital thrombolysis) when PCI not accessible in time. STEMI management under A0408."
  },

  // -----------------------------------------------------------
  // A0402 Bradycardia
  // -----------------------------------------------------------
  bradycardia: {
    cpg: "A0402",
    title: "Bradycardia",
    careObjectives: [
      "To increase heart rate where bradycardia is causing haemodynamic compromise, heart failure or life threatening arrhythmia."
    ],
    management: [
      { type: "assess", items: ["Perfusion status", "Cardiac rhythm", "Heart failure", "Ischaemic chest pain"] },
      { type: "header", text: "Unstable" },
      { type: "note", items: [
        "Less than adequate perfusion (including acute STEMI and ischaemic chest pain)",
        "Profound bradycardia (HR < 40 bpm) and APO",
        "Runs of VT or ventricular escape rhythms",
        "HR < 20 bpm"
      ]},
      { type: "action", text: "Atropine 600 mcg IV" },
      { type: "action", text: "Repeat 1200 mcg after 3 \u2013 5 minutes if inadequate response" },
      { type: "header", text: "Adequate response" },
      { type: "action", text: "Continue Atropine 600 mcg IV at 3 \u2013 5 minute intervals as required (max. 3000 mcg)" },
      { type: "action", text: "Mx as per Inadequate response if patient deteriorates" },
      { type: "header", text: "Inadequate response" },
      { type: "note", items: ["Inadequate or extremely poor perfusion persists after Atropine 1800 mcg IV"] },
      { type: "mica", text: "Adrenaline infusion 5 mcg/minute" },
      { type: "mica", text: "Increase to 10 mcg/minute if required" },
      { type: "header", text: "Extremely poor perfusion" },
      { type: "note", items: ["Altered conscious state / unconscious, and", "HR < 50, and", "BP < 60"] },
      { type: "action", text: "Transthoracic pacing" },
      { type: "mica", text: "Midazolam 1 \u2013 2 mg IV and Fentanyl 50 mcg IV as required" },
      { type: "mica", text: "Commence pacing at 30mA and a heart rate of 70/min" }
    ],
    notes: "ALS: atropine. MICA: adrenaline infusion and pacing. Mobitz II/complete heart block unlikely to respond to atropine."
  },

  // -----------------------------------------------------------
  // A0403 Tachycardia (Narrow Complex)
  // -----------------------------------------------------------
  tachycardia_narrow: {
    cpg: "A0403",
    title: "Tachycardia (Narrow Complex)",
    careObjectives: [
      "Rapid termination of life threatening arrhythmias and transport to a facility capable of definitive care.",
      "Rapid transport to facilitate the treatment of the arrhythmia where treatment is not available in the prehospital environment.",
      "Early termination of stable SVT where possible, following ECG capture."
    ],
    management: [
      { type: "note", items: ["QRS < 0.12 sec"] },
      { type: "stop", text: "If patient loses C.O. at any stage Mx with synchronised cardioversion in addition to CPG A0201 Cardiac Arrest (MICA only)" },
      { type: "stop", text: "Mx of sinus tachycardia should be directed at the underlying cause (e.g. hypovolaemia, pain) and not treated using this CPG" },
      { type: "header", text: "Stable \u2013 SVT (AVNRT or AVRT)" },
      { type: "subheader", text: "Exclude AF and atrial flutter" },
      { type: "note", items: ["SBP \u2265 90 mmHg:"] },
      { type: "action", text: "Record 12 lead ECG prior to commencing Mx" },
      { type: "action", text: "Modified Valsalva or Standard Valsalva (if manual handling or environmental concern)" },
      { type: "action", text: "Repeat x2 @ 2 minute intervals (Max. 3 attempts)" },
      { type: "note", items: ["SBP < 90 mmHg or no reversion with Valsalva:"] },
      { type: "action", text: "Adenosine 6 mg IV" },
      { type: "action", text: "Adenosine 12 mg IV if no reversion after 2 minutes" },
      { type: "action", text: "Adenosine 12 mg IV if no reversion after a further 2 minutes" },
      { type: "subheader", text: "VVED referral" },
      { type: "action", items: ["Reversion to sinus rhythm", "Stable vital signs", "No red flags remain", "No paramedic concern"] },
      { type: "action", text: "Paramedic-initiated VVED referral" },
      { type: "action", text: "Transmit 12 lead ECG to VVED" },
      { type: "header", text: "Stable \u2013 Other rhythms" },
      { type: "note", items: ["Atrial fibrillation", "Atrial flutter", "Multifocal atrial tachycardia"] },
      { type: "header", text: "Unstable and rapidly deteriorating" },
      { type: "mica", text: "Synchronised cardioversion: Midazolam 1 \u2013 2 mg IV and Fentanyl 50 mcg IV as required" },
      { type: "mica", text: "Cardioversion: DCCS 150 J" },
      { type: "mica", text: "Repeat once if required" },
      { type: "mica", text: "If unsuccessful change pads to anterior-posterior vector and DCCS 200 J" },
      { type: "header", text: "Action (all pathways)" },
      { type: "action", text: "Pain relief as per CPG A0501 Pain relief" }
    ],
    notes: "Modified Valsalva first for stable SVT. Adenosine for refractory SVT. Cardioversion for unstable or arrest."
  },

  // -----------------------------------------------------------
  // A0404 Tachycardia (Broad Complex)
  // -----------------------------------------------------------
  tachycardia_broad: {
    cpg: "A0404",
    title: "Tachycardia (Broad Complex)",
    careObjectives: [
      "Rapid termination of life threatening arrhythmias and transport to a facility capable of definitive care.",
      "Rapid transport to facilitate the treatment of the arrhythmia where treatment is not available in the prehospital environment."
    ],
    management: [
      { type: "note", items: ["QRS \u2265 0.12 sec"] },
      { type: "stop", text: "If patient loses C.O. at any stage Mx as per CPG A0201 Cardiac Arrest" },
      { type: "header", text: "Stable: VT or unclear" },
      { type: "stop", text: "Only dilute Amiodarone with D5W" },
      { type: "stop", text: "Do not administer Amiodarone if suspected TCA toxicity. Mx as per CPG A0723 Tricyclic Antidepressant Toxicity" },
      { type: "stop", text: "Do not administer Amiodarone if VT follows Ondansetron administration" },
      { type: "mica", text: "Amiodarone infusion 5 mg/kg IV (max. 300 mg) over 20 minutes once only" },
      { type: "mica", text: "Rx as per Unstable and rapidly deteriorating if patient deteriorates" },
      { type: "header", text: "Unstable and rapidly deteriorating" },
      { type: "mica", text: "Synchronised cardioversion: Midazolam 1-2 mg IV and Fentanyl 50 mcg IV as required" },
      { type: "mica", text: "Cardioversion: DCCS 150 J" },
      { type: "mica", text: "Repeat once if required" },
      { type: "mica", text: "If unsuccessful change pads to anterior-posterior vector and DCCS 200 J" },
      { type: "header", text: "No reversion OR reversion to narrow complex rhythm" },
      { type: "action", text: "Amiodarone infusion per Stable (if not already established)" },
      { type: "action", text: "Other rhythms (e.g. slow wide complex): Rx as per appropriate CPG" }
    ],
    notes: "If uncertain, treat broad complex tachycardia as VT. Unstable: cardioversion. Amiodarone: D5W only, not in TCA toxicity or post-ondansetron."
  },

  // -----------------------------------------------------------
  // A0406 Cardiogenic Pulmonary Oedema
  // -----------------------------------------------------------
  pulmonary_oedema: {
    cpg: "A0406",
    title: "Cardiogenic Pulmonary Oedema",
    careObjectives: [
      "Oxygen therapy if hypoxic.",
      "NIV for management of respiratory failure.",
      "Reduce preload and afterload with nitrates to improve cardiac function and reduce pulmonary congestion.",
      "Furosemide as a second line treatment for management of fluid overload.",
      "Adrenaline infusion for management of cardiogenic shock."
    ],
    management: [
      { type: "assess", items: ["Acute vs chronic symptoms", "Comorbidities / differential diagnosis", "Identify patients with palliative care needs"] },
      { type: "header", text: "Short of breath and crackles" },
      { type: "action", text: "Oxygen as per CPG A0001 Oxygen Therapy" },
      { type: "header", text: "Adequate perfusion / hypertensive" },
      { type: "action", text: "GTN S/L: 600 mcg if SBP > 100 mmHg" },
      { type: "action", text: "GTN S/L: 300 mcg if no previous admin, borderline BP or < 60 kg / frail / elderly" },
      { type: "action", text: "Repeat dose at 5 minute intervals titrated to pain or side effects (no max)" },
      { type: "action", text: "GTN patch 50 mg (0.4 mg / hr) upper torso / arms" },
      { type: "action", text: "Remove patch if BP < 100 mmHg" },
      { type: "action", text: "Request MICA if: Severe respiratory distress, or Moderate respiratory distress with limited or no improvement after 2 doses of GTN" },
      { type: "subheader", text: "Signs of fluid overload:" },
      { type: "mica", text: "Furosemide 20 \u2013 40 mg IV or patient\u2019s daily dose IV as a single dose (max 80 mg)" },
      { type: "mica", text: "Administer en-route to hospital once other treatment is established" },
      { type: "header", text: "Inadequate perfusion / shock" },
      { type: "action", text: "Request MICA" },
      { type: "mica", text: "Consider adrenaline infusion as per CPG A0407 Inadequate Perfusion (Cardiogenic)" },
      { type: "header", text: "Severe APO" },
      { type: "note", items: [
        "Severe respiratory distress, full field crackles, persistent hypoxia or no improvement from initial management"
      ]},
      { type: "action", text: "Request MICA" },
      { type: "mica", text: "CPAP 10 cm H\u2082O" },
      { type: "mica", text: "Consider initiating CPAP prior to extrication" },
      { type: "mica", text: "BiPAP NIV \u2014 IPAP: 10 cmH\u2082O, EPAP: 5 cmH\u2082O, FiO\u2082: 1.0" },
      { type: "mica", text: "Increase IPAP to 15 cmH\u2082O and EPAP to 10 cmH\u2082O if no improvement" },
      { type: "mica", text: "Consult the AV Medical Advisor via the AV Clinician for further adjustments if no improvement" },
      { type: "mica", text: "Titrate FiO\u2082 as per CPG A0001 Oxygen Therapy once treatment established and effective" },
      { type: "subheader", text: "Patient on NIV, BP > 140 mmHg (without vasopressors) and limited / no clinical improvement:" },
      { type: "mica", text: "GTN infusion \u2014 Start: 10 mcg/min (2 mL/hr), Increase: 10 mcg/min at 5 min intervals, Target: SBP 120\u2013140 mmHg, Max: 200 mcg/min (40 mL/hr), Cease: if SBP < 100 mmHg" },
      { type: "mica", text: "Reassess BP at least every 5 minutes during infusion and titrate to response" }
    ],
    notes: "GTN S/L is ALS. GTN infusion, BiPAP, furosemide are MICA. Non-cardiogenic APO: no GTN, no furosemide. Cardiogenic shock: A0407."
  },

  // -----------------------------------------------------------
  // A0407 Inadequate Perfusion (Cardiogenic)
  // -----------------------------------------------------------
  inadequate_perfusion_cardiogenic: {
    cpg: "A0407",
    title: "Inadequate Perfusion (Cardiogenic)",
    careObjectives: [
      "To achieve a perfusion target appropriate to the patient\u2019s condition."
    ],
    management: [
      { type: "note", items: ["Inadequate perfusion: cardiogenic causes"] },
      { type: "stop", text: "Mx other causes, e.g. arrhythmia, pain, hypovolaemia" },
      { type: "assess", items: ["Signs of pulmonary oedema (crackles)"] },
      { type: "header", text: "Crackles" },
      { type: "mica", text: "Adrenaline infusion as per Inadequate or extremely poor perfusion" },
      { type: "header", text: "No crackles" },
      { type: "action", text: "Normal Saline 250 mL IV" },
      { type: "action", text: "Repeat 250 mL IV if chest clear and inadequate or extremely poor perfusion persists" },
      { type: "header", text: "Inadequate or extremely poor perfusion persists" },
      { type: "action", text: "Adrenaline infusion (3 mg/50 mL D5W / Normal Saline) commencing @ 5 mcg/min (5 mL/hr)" },
      { type: "action", text: "Titrate to achieve systolic BP 100 mmHg (max 250 mcg/min)" },
      { type: "action", text: "Reassess patient and delivery system prior to increasing rate beyond 50 mcg/min" },
      { type: "subheader", text: "If syringe pump unavailable:" },
      { type: "action", text: "Adrenaline 10 mcg IV as required" },
      { type: "action", text: "If poor response, Adrenaline 50\u2013100 mcg IV as required" },
      { type: "action", text: "If chest clear continue Normal Saline 250 mL IV boluses up to 20 mL/kg" }
    ],
    notes: "PANDA trial enrolment consideration. Use metaraminol while assessing eligibility criteria. Adrenaline infusion for cardiogenic shock."
  },

  // -----------------------------------------------------------
  // A0408 STEMI Management
  // -----------------------------------------------------------
  stemi_management: {
    cpg: "A0408",
    title: "STEMI Management",
    careObjectives: [
      "In the setting of STEMI, time from onset of symptoms to coronary reperfusion correlates to the amount of permanent myocardial damage and risk of death. Once STEMI is identified, all efforts should aim to expedite coronary reperfusion whether via PCI or PHT. The primary destination is intended to be a PCI centre in all cases."
    ],
    management: [
      { type: "header", text: "STEMI identified or monitor identifies acute infarct" },
      { type: "action", text: "Transmit ECG" },
      { type: "action", text: "Request MICA (ALS)" },
      { type: "action", text: "Treat as per CPG A0401 Acute Coronary Syndromes" },
      { type: "action", text: "Apply pads" },
      { type: "assess", items: ["Time to PCI", "Inclusion criteria", "Exclusion criteria", "Relative contraindications"] },
      { type: "header", text: "Symptoms > 12 hours" },
      { type: "action", text: "Continue Mx as per CPG A0401 Acute Coronary Syndromes" },
      { type: "action", text: "Transport with notification" },
      { type: "header", text: "Urgent transport to PCI facility" },
      { type: "note", items: [
        "Time to PCI < 90 minutes (PHT endorsed and equipped paramedic) OR",
        "Does not meet all inclusion criteria OR",
        "Meets one or more exclusion criteria"
      ]},
      { type: "stop", text: "Paramedics should consult AV Clinician if there is any uncertainty regarding diagnosis of STEMI or thrombolysis" },
      { type: "stop", text: "ALS paramedics MUST consult AV Clinician prior to administering Heparin" },
      { type: "stop", text: "Do not delay transport" },
      { type: "action", text: "Continue Mx as per CPG A0401 Acute Coronary Syndromes" },
      { type: "action", text: "Transport with hospital notification" },
      { type: "action", text: "Heparin IV bolus 4000 IU" },
      { type: "action", text: "Repeat Heparin IV bolus 1000 IU at 1 hour intervals" },
      { type: "action", text: "Capture a repeat ECG 30 minutes prior to arrival and transmit to receiving hospital with notification" },
      { type: "header", text: "Prehospital thrombolysis" },
      { type: "note", items: [
        "Time to PCI > 90 minutes (PHT endorsed and equipped paramedic) AND",
        "All inclusion criteria met AND",
        "No exclusion criteria met"
      ]},
      { type: "stop", text: "ALS paramedics MUST consult AV Clinician prior to progressing to thrombolysis in all cases" },
      { type: "stop", text: "MICA paramedics must consult AV Clinician where any relative C/I are present" },
      { type: "mica", text: "IV access x 2, Normal Saline TKVO" },
      { type: "mica", text: "Complete checklist and read information statement to Pt" },
      { type: "mica", text: "Tenecteplase IV bolus (see Table 1)" },
      { type: "mica", text: "Heparin IV bolus 4000 IU" },
      { type: "mica", text: "Repeat Heparin IV bolus 1000 IU at 1 hour intervals" },
      { type: "mica", text: "Transport with hospital notification" },
      { type: "mica", text: "Transmit 12-lead ECG to receiving hospital" },
      { type: "mica", text: "Capture a repeat ECG 30 minutes prior to arrival and transmit to receiving hospital with notification" },
      { type: "header", text: "Post Thrombolysis Care" },
      { type: "assess", items: ["Perfusion status", "Cardiac rhythm", "Conscious state", "Potential bleeding sites"] },
      { type: "header", text: "Inadequate perfusion (post thrombolysis)" },
      { type: "note", items: ["Avoid hypotension, target SBP > 100 mmHg"] },
      { type: "action", text: "See CPG A0407 Inadequate Perfusion Cardiogenic Causes" },
      { type: "header", text: "Altered conscious state (post thrombolysis)" },
      { type: "action", text: "Monitor patient\u2019s GCS as per CPG A0104 Conscious State Assessment" },
      { type: "action", text: "If altered conscious state develops consider and correct other causes e.g. poor perfusion, hypoglycaemia etc." },
      { type: "action", text: "If altered conscious state persists, Mx as per CPG A0711 Stroke / TIA" },
      { type: "header", text: "Arrhythmia Mx (post thrombolysis)" },
      { type: "note", items: [
        "Reperfusion arrhythmias are common and to be expected post thrombolysis.",
        "Anti-arrhythmic agents are indicated only if the arrhythmia persists for > 2/60 and/or perfusion is compromised."
      ]},
      { type: "action", text: "See: CPG A0402 Bradycardia, CPG A0403 Tachycardia (narrow complex), CPG A0404 Tachycardia (wide complex)" },
      { type: "action", text: "If cardiac arrest, Rx immediately as per CPG A0201 Cardiac Arrest - Medical" }
    ],
    notes: "PHT is MICA-only. PCI preferred in all cases. Post-thrombolysis care includes 15-min ECGs, bleeding monitoring, symptom management."
  },

  // -----------------------------------------------------------
  // A0410 Hypertension
  // -----------------------------------------------------------
  hypertension: {
    cpg: "A0410",
    title: "Hypertension",
    careObjectives: [
      "Identify patients suffering from hypertension and the severity.",
      "Symptomatic management as required.",
      "Plan care pathway appropriate to patient\u2019s condition and risk profile."
    ],
    management: [
      { type: "assess", items: [
        "History and physical examination",
        "ECG",
        "Pregnancy/post-partum status",
        "Competing medical conditions or significant traumatic injury",
        "Signs & symptoms of end-organ dysfunction: Severe headache, Altered level of consciousness, Seizure, Chest pain, Ischaemic ECG, Dyspnoea, Pulmonary oedema, Acute renal failure, Anuria"
      ]},
      { type: "header", text: "Mild to moderate hypertension" },
      { type: "note", items: ["Asymptomatic", "BP < 180/110 mmHg"] },
      { type: "action", text: "Self-care advice" },
      { type: "action", text: "Safety netting" },
      { type: "action", text: "GP referral when next available (consider PPCC if delays to regular GP appointment)" },
      { type: "header", text: "Severe hypertension" },
      { type: "note", items: ["May have signs or symptoms, but not of end-organ dysfunction", "BP 180 \u2013 220/110 \u2013 140 mmHg"] },
      { type: "action", text: "Symptom relief if required" },
      { type: "action", text: "VVED referral for potential community management" },
      { type: "header", text: "Hypertensive emergency" },
      { type: "note", items: ["Signs and/or symptoms of end-organ dysfunction", "BP generally > 220/140 mmHg, but may be lower"] },
      { type: "action", text: "Transport" },
      { type: "action", text: "Manage symptoms as per appropriate CPG: CPG A0401 Acute Coronary Syndrome, CPG A0406 Pulmonary Oedema, CPG A0502 Headache, CPG A0711 Suspected Stroke or TIA" }
    ],
    notes: "Mild/moderate: GP referral. Severe: VVED. Emergency (end-organ damage): treat per organ-specific CPG. Pregnancy excluded."
  },

  // -----------------------------------------------------------
  // A0501-1 Pain Relief
  // -----------------------------------------------------------
  pain_relief: {
    cpg: "A0501-1",
    title: "Pain Relief",
    careObjectives: [
      "To reduce the suffering associated with the experience of pain to a degree that the patient is comfortable"
    ],
    management: [
      "Patient reporting comfort is the most important indicator of adequate analgesia",
      "Inability to report pain (dementia, intellectual disability, non-English speaking) does not preclude analgesia \u2014 where discomfort is evident with possible pain-producing stimuli, analgesia may be indicated",
      "Consider dose reductions or longer intervals in small, frail or elderly patients",
      "Multi-modal analgesia preferred: smaller doses of multiple agents (e.g. paracetamol + opioid + methoxyflurane vs morphine alone)",
      "Moderate pain with IV access: IV opioids + paracetamol preferred",
      "Moderate pain without IV access: IN fentanyl or IN ketamine + paracetamol preferred",
      "IN ketamine: preferred first line if opioids limited effect, contraindicated, opioid tolerant, or declined. Preferred over IN fentanyl in elderly/frail patients \u2014 wait, IN fentanyl preferred in elderly/frail over IN ketamine",
      "Paracetamol: always administer in addition to other analgesics where oral route not contraindicated (not if surgery or procedural sedation likely)",
      "IM morphine: if IN fentanyl/ketamine contraindicated/limited effect AND no IV access",
      "Methoxyflurane: preferred for procedural pain or pain related to movement; may be used as third-line agent",
      "Severe pain: opioids + ketamine preferred. No requirement to give large opioid doses before ketamine. Leave 3\u20135 min between agents to gauge response",
      "IV ketamine (ALS with consult): ALS paramedics should consult for IV ketamine where initial IN ketamine management is inadequate",
      "Cardiac chest pain: do NOT administer ketamine for suspected ACS",
      "Fentanyl preferred over morphine for: morphine contraindication, short duration desired (dislocations), hypotension, nausea/vomiting, severe headache (see A0502)",
      "Ketamine caution: anxiety/psychosis history \u2014 administer with caution; consider other agents for moderate pain",
      "Ketamine caution: elderly/frail \u2014 greater side-effect profile; prefer IN fentanyl where available",
      "IN administration: half dose into each nostril where possible; limit 1 mL per nostril per dose",
      "Respiratory depression from opioids: titrate small doses IV naloxone as per CPG A0722. Avoid complete reversal",
      "Hypersalivation from ketamine: suction usually sufficient",
      "Emergence reactions (ketamine): transient; minimise by administering IV doses slowly over 1\u20132 min and reassuring patient",
      "Midazolam 0.5\u20131 mg IV (ALS \u2014 consult only): consider for significant or persistent emergence reactions",
      "Monitoring with ketamine: nasal ETCO\u2082 monitoring, line-of-sight monitoring, SAT score",
      "ALS: consult for IV ketamine and/or further opioid doses where maximum doses reached and patient remains in pain"
    ],
    management_mica: [
      "IV ketamine: MICA may use IV ketamine in preference to IN ketamine if IV access immediately available",
      "Atropine 600 mcg IV/IM: for ketamine-induced hypersalivation where difficult to manage or airway compromised (MICA only)",
      "Ketamine infusion: Ketamine 50 mg up to 50 mL with Normal Saline (1 mg/mL dilution). Rate: 0.1\u20130.3 mg/kg/hr"
    ],
    notes: "Multi-modal analgesia. IV ketamine is ALS with consult. IN ketamine is ALS. Ketamine infusion is MICA. No ketamine for ACS chest pain."
  },

  // -----------------------------------------------------------
  // A0502 Headache
  // -----------------------------------------------------------
  headache: {
    cpg: "A0502",
    title: "Headache",
    careObjectives: [
      "Risk stratify patients with headache",
      "Select appropriate care pathway based on risk profile: High-risk: Transport to ED; Low-moderate risk: VVED referral"
    ],
    management: [
      "Primary headache (tension, migraine, cluster): not life-threatening. Secondary headache: may have serious underlying cause",
      "Focus of paramedic management: identify high-risk features of secondary headache warranting urgent ED investigation",
      "High-risk features (transport to ED): systemic signs/fever, known neoplasm, neurological deficit or altered conscious state, sudden/abrupt onset ('thunderclap'), onset after age 50, pattern change or recent new onset, positional headache, headache precipitated by sneezing/coughing/exercise, papilloedema, progressive/atypical presentation, pregnant or puerperium, painful eye with autonomic features, post-traumatic onset, immunocompromised, painkiller overuse",
      "Post-traumatic headache: lower threshold for transport in elderly/frail patients (can develop serious injury from low-impact mechanism; susceptible to chronic subdural haematomas weeks after minor insult)",
      "Migraine: may mimic stroke, ICH or meningitis. In absence of previous diagnosis, do not attribute concerning symptoms (severe headache, vertigo, meningism) to migraine",
      "Low-moderate risk without high-risk features: VVED referral appropriate even if pain is significant",
      "Opioids: limited benefit for migraine and headache. Fentanyl should only be used for severe headache where benefits outweigh risks (e.g. other measures failed, patient in severe pain, transport > 15 min)",
      "Prochlorperazine: may benefit migraine with nausea/vomiting/vertigo. Do NOT administer if increased risk of ICH/SAH (risk of oversedation, hypotension causing secondary brain injury, extrapyramidal effects, seizure)",
      "Aspirin: do not administer unless on VVED clinician advice or as part of patient's management plan",
      "Nausea/vomiting and severe dehydration: manage as per CPG A0701 where indicated"
    ],
    management_mica: [],
    notes: "Risk stratification is the key skill. SNNOOP10 criteria inform high-risk features. Thunderclap = immediate ED. Low-moderate = VVED."
  },

  // -----------------------------------------------------------
  // A0601 Asthma
  // -----------------------------------------------------------
  asthma: {
    cpg: "A0601",
    title: "Asthma",
    careObjectives: [
      "Assess severity.",
      "Bronchodilation: inhaled bronchodilators in patients with adequate ventilation; parenteral adrenaline (IM or IV) in patients without adequate ventilation.",
      "NIV or early intubation in patients with respiratory failure unresponsive to initial treatment.",
      "Magnesium for severe or life-threatening asthma.",
      "Reduce airway inflammation with systemic corticosteroids for all but the most mild presentations."
    ],
    management: [
      { type: "assess", items: ["Severity", "If patient has individual patient management plan, this should be followed", "Risk factors for severe asthma"] },
      { type: "stop", text: "Consider anaphylaxis if: sudden onset, food allergy Hx, hypotension in conscious patient, skin symptoms, no Hx of asthma" },
      { type: "header", text: "Mild \u2013 moderate" },
      { type: "note", items: ["Alert and active", "Speech: Sentences / phrases", "WOB: Increased", "HR: Normal or mild tachycardia"] },
      { type: "action", text: "Salbutamol pMDI and spacer: 4 \u2013 12 doses, repeat at 20 minute intervals as required" },
      { type: "action", text: "Dexamethasone 8 mg Oral in all but most mild cases" },
      { type: "subheader", text: "Paramedic-initiated VVED referral if:" },
      { type: "action", items: ["Dyspnoea resolved / significant improvement 10\u201320 mins following initial treatment", "Known history of asthma"] },
      { type: "action", text: "OR Transport" },
      { type: "header", text: "Severe" },
      { type: "note", items: ["Distressed / agitated", "Speech: Words", "WOB: Markedly increased", "HR: Tachycardia"] },
      { type: "action", text: "Salbutamol 5 mg nebulised every 20 minutes or more frequently as required" },
      { type: "action", text: "Ipratropium Bromide 500 mcg nebulised (single dose)" },
      { type: "action", text: "Dexamethasone 8 mg IV / IM / Oral" },
      { type: "action", text: "Request MICA" },
      { type: "action", text: "Prepare for deterioration prior to extrication (IV access, adrenaline)" },
      { type: "subheader", text: "Inadequate response (no significant response after 20 minutes):" },
      { type: "mica", text: "Magnesium Sulfate 10 mmol (2.5 g) IV infusion over 20 minutes" },
      { type: "header", text: "Life threat" },
      { type: "note", items: ["Altered conscious / drowsy / exhausted", "Speech: Unable to speak", "WOB: Maximal or poor respiratory effort", "HR: Marked tachycardia, bradycardia or deteriorating heart rate", "Skin: Cyanosis"] },
      { type: "action", text: "Salbutamol via continuous nebulisation" },
      { type: "action", text: "Ipratropium 500 mcg nebulised (single dose)" },
      { type: "action", text: "Adrenaline 500 mcg IM (1:1000) \u2014 repeat at 5 minute intervals (no max)" },
      { type: "action", text: "Request MICA" },
      { type: "action", text: "Dexamethasone 8 mg IV / IM" },
      { type: "action", text: "Prepare for deterioration prior to extrication (IV access, adrenaline)" },
      { type: "note", items: ["If no response to initial IM adrenaline, consult the AV Clinician for: Adrenaline 20 mcg IV at 2 minute intervals"] },
      { type: "mica", text: "BiPAP NIV \u2014 IPAP: 10 cmH\u2082O, EPAP: 5 cmH\u2082O, FiO\u2082: 1.0" },
      { type: "mica", text: "Salbutamol 12 doses pMDI with in-line connector every 5\u201320 minutes as required" },
      { type: "mica", text: "Magnesium Sulfate 10 mmol (2.5 g) IV infusion over 20 minutes (via second point of IV access)" },
      { type: "mica", items: [
        "If no response to initial IM adrenaline or inadequate ventilation:",
        "Adrenaline 50\u2013100 mcg IV at 2 minute intervals if peri arrest or delay to adrenaline infusion",
        "Adrenaline infusion 5\u201325 mcg/min (5\u201325 mL/hr) IV"
      ]},
      { type: "header", text: "Asthma (Unconscious)" },
      { type: "note", items: ["Unconscious / becomes unconscious with poor or no ventilation but still with cardiac output"] },
      { type: "action", text: "Ventilate if poor or no ventilation: 5\u20138 ventilations/minute, moderately high inspiratory pressure, allow for prolonged expiratory phase" },
      { type: "action", text: "Adrenaline as per CPG A0601 Asthma \u2013 Life Threat" },
      { type: "action", text: "Consider intubation if inadequate response" },
      { type: "header", text: "Asthma (Loss of Cardiac Output)" },
      { type: "stop", text: "Stop ventilations / disconnect ventilator, pause and reassess (\u2264 15 seconds)" },
      { type: "action", text: "If no ROSC, Mx as per CPG A0201 Cardiac Arrest with focus on: chest compressions, no ventilations for 1 minute, prioritise IV adrenaline (IM if any delay to IV access), Normal saline" },
      { type: "action", text: "Early intubation (if not already intubated)" }
    ],
    notes: "Consider anaphylaxis in all asthma presentations. Life threat: parenteral adrenaline. Magnesium for severe/life-threat."
  },

  // -----------------------------------------------------------
  // A0602 COPD
  // -----------------------------------------------------------
  copd: {
    cpg: "A0602",
    title: "COPD",
    careObjectives: [
      "Reduce airflow obstruction with bronchodilators.",
      "Controlled oxygen therapy if hypoxaemic to avoid risks associated with hypercapnia.",
      "Reduce inflammation with corticosteroids to improve symptoms and decrease recovery time.",
      "NIV for management of respiratory failure with inadequate response to initial treatment.",
      "Select appropriate disposition \u2014 VVED or ED."
    ],
    management: [
      { type: "assess", items: ["Respiratory status assessment \u2014 consider patient\u2019s usual baseline", "Patient\u2019s COPD Action Plan", "Comorbidities / differential diagnosis", "Goals of care"] },
      { type: "header", text: "All exacerbations of COPD" },
      { type: "action", text: "Salbutamol 4\u201312 puffs via pMDI every 1 hour as required (preferred)" },
      { type: "action", text: "OR if unable to use pMDI: Salbutamol 5 mg nebulised every 1 hour as required" },
      { type: "action", text: "Ipratropium Bromide 500 mcg nebulised every 1 hour as required (if unable to use pMDI)" },
      { type: "action", text: "Oxygen as per CPG A0001 \u2014 Target SpO\u2082 88\u201392%; limit oxygen therapy as much as possible outside target range" },
      { type: "action", text: "Dexamethasone 8 mg Oral / IV / IM" },
      { type: "header", text: "Adequate response" },
      { type: "note", items: ["Improved or progressing towards baseline respiratory status following management"] },
      { type: "action", text: "VVED referral if all criteria met: SpO\u2082 \u2265 88% on room air or home oxygen, no signs of severe exacerbation, mobilising normally for patient, adequate social support and able to cope at home" },
      { type: "action", text: "OR Transport if patient does not meet all criteria" },
      { type: "header", text: "Inadequate response / deterioration" },
      { type: "note", items: ["Minimal or no improvement in respiratory status", "Ongoing oxygen requirement"] },
      { type: "action", text: "Assess ventilation and consider management as per Severe exacerbation" },
      { type: "action", text: "Transport" },
      { type: "header", text: "Severe exacerbation" },
      { type: "note", items: [
        "Severe respiratory distress with either:",
        "Persistent or worsening hypoxia (relative to normal SpO\u2082) OR",
        "Signs of respiratory muscle fatigue (e.g. accessory muscle use, intercostal retraction, paradoxical abdominal movement, or exhaustion)"
      ]},
      { type: "action", text: "Request MICA" },
      { type: "mica", text: "CPAP NIV 7.5 cm H\u2082O \u2014 consult AV Clinician at earliest opportunity for critical care advice; consider initiating and stabilising on CPAP prior to extrication" },
      { type: "mica", text: "Consider Salbutamol 4\u201312 puffs via pMDI every 1 hour with in-line connector" },
      { type: "mica", text: "BiPAP NIV \u2014 IPAP: 10 cmH\u2082O, EPAP: 5 cmH\u2082O, FiO\u2082: 1.0" },
      { type: "mica", text: "Increase IPAP to 15 cm H\u2082O if no improvement in ventilation; EPAP remains at 5 cm H\u2082O" },
      { type: "mica", text: "Titrate FiO\u2082 to SpO\u2082 88\u201392% once treatment established and effective" },
      { type: "header", text: "Poor or no ventilation" },
      { type: "action", text: "Ventilate" },
      { type: "mica", text: "Consider ETT as per CPG A0302 Endotracheal Intubation" }
    ],
    notes: "Target SpO\u2082 88\u201392% in COPD. VVED referral if meets criteria. NIV for severe exacerbation."
  },

  // -----------------------------------------------------------
  // A0603 Upper Airway Obstruction
  // -----------------------------------------------------------
  upper_airway_obstruction: {
    cpg: "A0603",
    title: "Upper Airway Obstruction",
    careObjectives: [
      "To urgently identify and manage potential airway obstruction (where appropriate) indicated by stridor in adults."
    ],
    management: [
      { type: "stop", text: "Imminent risk of life-threatening airway obstruction \u2014 MICA MUST be requested" },
      { type: "stop", text: "Manage anaphylaxis as per CPG A0704 Anaphylaxis" },
      { type: "stop", text: "Manage choking as per CPG A0308 Choking" },
      { type: "assess", items: ["Acute or chronic", "Respiratory status"] },
      { type: "action", text: "Escalate care" },
      { type: "action", text: "Adrenaline 5 mg nebulised \u2014 consult AV Medical Advisor via AV Clinician for repeat dose if required" },
      { type: "action", text: "Dexamethasone 8 mg IV / IM" },
      { type: "subheader", text: "If known history of inducible laryngeal obstruction and unresponsive to other management:" },
      { type: "mica", text: "Consider CPAP 5 cm H\u2082O" },
      { type: "mica", text: "Consult with AV Medical Advisor via AV Clinician for further management advice" },
      { type: "subheader", text: "If severe respiratory distress:" },
      { type: "mica", text: "Consider intubation as per CPG A0302 Endotracheal Intubation" },
      { type: "mica", text: "Prepare with dual setup as per CPG A0303 Difficult Airway Guideline" }
    ],
    notes: "Stridor = emergency. MICA mandatory. Adrenaline nebulised first line. Distinguish from anaphylaxis and choking."
  },

  // -----------------------------------------------------------
  // A0604 Dyspnoea
  // -----------------------------------------------------------
  dyspnoea: {
    cpg: "A0604",
    title: "Dyspnoea",
    careObjectives: [
      "Identify and manage the underlying cause of dyspnoea."
    ],
    management: [
      { type: "note", items: ["Dyspnoea (non-traumatic)"] },
      { type: "assess", items: ["Respiratory status assessment", "History and physical exam: acute, subacute or chronic dyspnoea; other signs and symptoms; 12 Lead ECG; goals of care"] },
      { type: "stop", text: "Dyspnoea \u2014 manage as per relevant CPG: Asthma (A0601), COPD (A0602), Cardiogenic pulmonary oedema (A0406), Upper airway obstruction (A0603), Choking (A0308), Anaphylaxis (A0704), Pneumothorax (A0802), Palliative care (A0712), DKA (A0713), Pulmonary embolism (A0605), Hyperventilation as per CPG notes" }
    ],
    notes: "Dyspnoea is a symptom \u2014 direct management to the underlying cause CPG."
  },

  // -----------------------------------------------------------
  // A0605 Pulmonary Embolism
  // -----------------------------------------------------------
  pulmonary_embolism: {
    cpg: "A0605",
    title: "Pulmonary Embolism",
    careObjectives: [
      "Identify patients in whom pulmonary embolism is a likely diagnosis.",
      "Maintain adequate oxygenation and perfusion through supportive care.",
      "Provide targeted management of pulmonary embolism in the setting of cardiac arrest."
    ],
    management: [
      { type: "assess", items: ["Risk factors", "Clinical signs", "Consider differential diagnoses"] },
      { type: "header", text: "Suspected PE" },
      { type: "action", text: "Oxygen as per CPG A0001 Oxygen Therapy" },
      { type: "action", text: "Pain relief" },
      { type: "action", text: "Manage shock as per CPG A0407 Inadequate Perfusion (Cardiogenic)" },
      { type: "header", text: "Cardiac arrest with known or strongly suspected PE" },
      { type: "mica", text: "Consider consultation with AV Medical Advisor via AV Clinician for intra-arrest thrombolysis or transport with mCPR for ECMO" }
    ],
    notes: "Supportive care only in pre-arrest. Intra-arrest thrombolysis consideration is MICA with consultation."
  },

  // -----------------------------------------------------------
  // A0701 Nausea and Vomiting
  // -----------------------------------------------------------
  nausea_vomiting: {
    cpg: "A0701",
    title: "Nausea and Vomiting",
    careObjectives: [
      "Identify and treat significant dehydration",
      "Antiemetic therapy where indicated",
      "Appropriate disposition planning"
    ],
    management: [
      "If nausea and vomiting is being tolerated, basic care and referral or transport is the only required treatment",
      "IV fluids (Normal Saline) may reduce nausea/vomiting irrespective of antiemetic. Administer unless contraindicated (history of cardiac or renal failure)",
      "Ondansetron ODT: dissolves in mouth in a few seconds. IM route permissible if oral and IV not possible (4 mg IM; 8 mg if symptoms extreme via 2 injections)",
      "Ondansetron is a 5-HT3 antagonist — same receptor as Tramadol's analgesic mechanism. Do NOT use ondansetron as antiemetic if nausea/vomiting follows Tramadol (reduces analgesic effect)",
      "Long Q-T Syndrome (known or suspected): do NOT administer ondansetron (risk of VT/TdP). If VT follows ondansetron: do NOT give amiodarone (further Q-T prolongation). Manage with cardioversion (or defibrillation if pulseless)",
      "Prochlorperazine: IM route only",
      "Preferred treatment for pregnant patient with dehydration: fluid rehydration. Consider severity before treating with ondansetron",
      "VVED referral appropriate for: viral gastroenteritis, influenza-like illness/COVID-19, UTI, food poisoning, medication side effects (antibiotics, opioids, chemotherapy), hyperemesis of pregnancy, diagnosed migraines, inner ear disorders (Meniere's, labyrinthitis, BPPV), environmental heat illness"
    ],
    management_mica: [],
    notes: "Ondansetron blocks Tramadol analgesia. No ondansetron in Long QT. Prochlorperazine IM only. Fluids often work regardless of antiemetic."
  },

  // -----------------------------------------------------------
  // A0702 Hypoglycaemia
  // -----------------------------------------------------------
  hypoglycaemia: {
    cpg: "A0702",
    title: "Hypoglycaemia",
    careObjectives: [
      "Identification of high-risk hypoglycaemia",
      "Normalisation of blood glucose level",
      "Identification of appropriate patient disposition"
    ],
    management: [
      "Most common symptoms: diaphoresis, tremors, tachycardia. Can progress to altered conscious state, slurred speech, seizures, loss of consciousness",
      "Assess BGL and ketones in any patient with diabetes (or symptoms suggestive) presenting with any illness or injury. Also assess BGL/ketones in all pregnant patients",
      "Accelerated starvation ketosis: may occur in some paediatric patients after short decreased caloric intake. Presents with hypoglycaemia + significantly elevated ketones without diabetes diagnosis. Common symptoms: abdominal pain, nausea, vomiting. Glucagon unlikely to benefit — prioritise antiemetics to enable oral replacement",
      "CGM fingerstick readings more reliable than CGM at extreme values. Base care on AV glucometer",
      "Insulin pump patients: no urgency to pause/discontinue pump as hypoglycaemia generally responds to usual therapies",
      "Suitable for oral intake: glucose paste preferred. Alternatives: 6-7 jellybeans, 3 tsp honey, 150 mL full-strength soft drink, 150-200 mL fruit juice. If no improvement after 2 oral attempts, manage as unsuitable for oral intake",
      "Unsuitable for oral intake (unable to respond to commands to safely swallow): IV dextrose 10% first-line",
      "Glucagon IM: if unable to obtain IV access in adults. Consciousness usually restored within 15 minutes. Glucagon may be ineffective in: chronic hypoglycaemia, adrenal insufficiency, alcohol-induced hypoglycaemia, ketogenic/low-carb diet, starvation-induced hypoglycaemia, prolonged exercise",
      "Adrenal crisis: unlikely to respond to dextrose until corticosteroids initiated. Manage as per CPG A0715 Adrenal Insufficiency",
      "Transport to ED: incomplete recovery, unknown/serious precipitating cause, > 2 doses IV dextrose, seizure secondary to hypoglycaemia, pregnancy",
      "VVED consult (before considering community care): continuous insulin pump, taking oral hypoglycaemics, taking high-dose/tapering steroids, no prior diabetes history, CKD, no glucagon prescription or requires new prescription, Type 1 without CGM",
      "Suitable for GP referral (post-correction): provide advice — no driving until GP/endocrinologist assessment; avoid strenuous exercise today; re-check BGL every 15 min for 1 hr (if glucagon) or hourly for 4 hrs (if IV dextrose); ensure adequate oral intake. Consume long-acting carbohydrate before leaving"
    ],
    management_mica: [],
    notes: "Oral route preferred if safe to swallow. Dextrose 10% IV for altered patients. Glucagon if no IV access. Many patients suitable for community care."
  },

  // -----------------------------------------------------------
  // A0713 Hyperglycaemia and Ketosis
  // -----------------------------------------------------------
  hyperglycaemia: {
    cpg: "A0713",
    title: "Hyperglycaemia and Ketosis",
    careObjectives: [
      "Identification of high-risk hyperglycaemia",
      "Hydration where indicated"
    ],
    management: [
      "DKA characterised by hyperglycaemia, elevated ketones, and metabolic acidosis. Classic signs: dehydration, polyuria, polydipsia, tachypnoea. May also include nausea/vomiting, abdominal pain, confusion, altered conscious state",
      "Ketones < 0.6 mmol/L: normal. Ketones 0.6\u20133 mmol/L: medical assessment required (VVED appropriate if no severe illness). Ketones > 3 mmol/L: suspect DKA",
      "Approx. half of DKA cases present with moderate hyperglycaemia (11\u201329 mmol/L). DKA may occur without prior diabetes diagnosis (particularly pregnancy, children, elderly)",
      "Euglycaemic DKA: near-normal BGL with elevated ketones. Occurs with SGLT2i use (dapagliflozin/Forxiga, empagliflozin/Jardiance), especially when unwell/fasting/perioperative/excess alcohol. Any SGLT2i patient who is unwell: check ketones regardless of BGL. If ketones > 3 mmol/L: likely euglycaemic DKA",
      "HHS: severe hyperglycaemia + profound dehydration, no elevated ketones. Occurs mostly in Type 2. Mortality 5\u201320% (vs DKA < 1%). Patients may have combined DKA/HHS features",
      "LADA (Latent Autoimmune Diabetes in Adults): shares Type 1 and 2 features. Manage as Type 1 in hyperglycaemic emergency: check ketones, do not withhold long-acting insulin, consider IV fluids. VVED or transport if high risk",
      "Adequate fluid replacement is the primary treatment goal. Do NOT encourage patient to self-administer additional insulin before transport",
      "IV fluids: risk of fluid overload (cardiac failure, CKD, elderly): max 1000 mL. All other patients: max 2000 mL. Administer over 1 hr if BP > 90 mmHg; otherwise as bolus",
      "ECG monitoring: hyperglycaemia may cause unstable potassium — monitor for dysrhythmia. Consider CPG A0724 Hyperkalaemia",
      "Intubation: only where patient cannot maintain airway or has severely decompensating respiratory status (periods of apnoea). Tolerate profoundly low GCS without advanced airway where possible. Tachypnoea compensates for metabolic acidosis — IPPV may worsen metabolic derangements. Target ETCO\u2082 25\u201330 mmHg (individual trends should guide)"
    ],
    management_mica: [],
    notes: "Fluids are the main prehospital treatment. No insulin from AV. SGLT2i = euglycaemic DKA risk. Intubation risks worsening acidosis — use cautiously."
  },

  // -----------------------------------------------------------
  // A0703 Seizures
  // -----------------------------------------------------------
  seizures: {
    cpg: "A0703",
    title: "Seizures",
    careObjectives: [
      "Early termination of status epilepticus",
      "Appropriate disposition planning based on risk profile"
    ],
    management: [
      "Convulsive status epilepticus (CSE): seizures with prominent motor symptoms + impaired consciousness lasting \u2265 5 min, or repeated seizures with no return to baseline. Non-convulsive SE (NCSE): continuous seizure activity with altered conscious state, no prominent motor symptoms > 10 min. Up to 40% of CSE may deteriorate to NCSE if unabated",
      "Assessment and management occur concurrently if actively seizing",
      "Risk factors for intracranial pathology: head injury (current or recent), age > 40, fever or systemic symptoms in adults, anticoagulation, malignancy, new focal neurological deficit, first focal seizure, persistent altered mental state, persistent headache",
      "Lateral tongue trauma and/or incontinence in setting of clear postictal phase: strongly indicative of true seizure",
      "Consider pregnancy testing in patients of child-bearing age. Lactate > 4.75 mmol/L suggests seizure rather than syncope",
      "Be aware of uncapped sharps from bystander emergency anti-epileptic medications. Some patients aggressive post-ictally (generally self-limiting \u2264 30 min; rarely requires sedation)",
      "Patient management plans: buccal midazolam administered before AV arrival does not contribute to AV midazolam dosing limit. Follow patient plan; contact AV Clinician if concerned",
      "Avoid BVM oxygen unless ventilatory support needed",
      "Status epilepticus: if no IV access, first midazolam dose given IM. Prepare to support airway/ventilation. Under-dosing is a common reason for failure to control SE. More than 2 doses of midazolam: unlikely additional benefit + increased risk. Consult AV Medical Advisor if 2 doses given but more considered",
      "Functional seizures: if any doubt, manage as status epilepticus. Avoid touch; do not attempt to prove functional. Do not stop family filming (may be requested by treating team). Reassure patient is safe"
    ],
    management_mica: [
      "Levetiracetam infusion: 60 mg/kg (max 4500 mg). Patients \u2265 40 kg: undiluted (100 mg/mL), delivered over 5 min via syringe pump. Patients < 40 kg: dilute 1:1 with normal saline (50 mg/mL), delivered over 5 min",
      "Intubation (adult): if patient continues seizing (CSE or NCSE with airway/oxygenation impairment) 5 min after completing levetiracetam infusion",
      "Intubation (paediatric): comparatively more tolerant of ongoing seizure activity. Unless basic airway manoeuvres inadequate for oxygenation, generally do not intubate before 30 min post-levetiracetam completion. If seizing after levetiracetam and significant transport time: consult AV Medical Advisor for nearest paediatric advanced airway resource"
    ],
    notes: "SE more resistant to treatment the longer it continues. Under-dose is the commonest failure mode. Levetiracetam infusion = MICA. Functional seizures: don't prove it, don't provoke it."
  },

  // -----------------------------------------------------------
  // A0704 Anaphylaxis
  // -----------------------------------------------------------
  anaphylaxis: {
    cpg: "A0704",
    title: "Anaphylaxis",
    careObjectives: [
      "Adrenaline (IM) with minimal delay",
      "Airway and perfusion support",
      "Hospital-based observation (usually 4 hours) at a minimum"
    ],
    management: [
      "Severe, potentially life-threatening systemic hypersensitivity reaction. Can involve any combination of: respiratory (distress, wheeze, stridor), skin (hives, angioedema), cardiovascular (hypotension), abdominal (pain, nausea, vomiting). May be limited to single body system",
      "Rapid onset (usually within 30 min; up to 4 hrs). If 2 systemic manifestations observed: accept anaphylaxis regardless of known allergen exposure",
      "Maintain high index of suspicion for anaphylaxis in patients with asthma or food allergy (bronchospasm is common presenting symptom — can be mistaken for asthma alone)",
      "Non-allergic angioedema (ACE-inhibitor-induced, hereditary angioedema/HAE): will NOT respond to anaphylaxis management. Urticaria/itching typically absent; slower onset than anaphylaxis. If patient has own HAE medication: follow patient's treatment plan. Otherwise consider standard anaphylaxis management",
      "Adrenaline IM: primary treatment. Administration site: anterolateral mid-thigh. Deaths from anaphylaxis far more likely from delay than inadvertent administration. Patient's own autoinjector counts \u2014 if responds well, further adrenaline may not be required",
      "Risk factors for refractory anaphylaxis / deterioration (consider MICA escalation): history of refractory anaphylaxis/ICU admission, hypotension BP < 90 mmHg, medication-precipitated, respiratory symptoms/distress, asthma/multiple comorbidities, OR no response to initial IM dose",
      "Adrenaline infusion: where initial two IM doses not effective. IM adrenaline every 5 min appropriate while infusion being prepared or if MICA unavailable",
      "IV adrenaline bolus: ONLY if extremely poor perfusion or cardiac arrest is imminent. Always subsequent to IM adrenaline",
      "Adrenaline toxicity: nausea/vomiting/shaking/tachycardia/arrhythmias WITH some symptom improvement AND normal/elevated BP \u2014 consider toxicity rather than worsening anaphylaxis before giving more adrenaline",
      "Bronchospasm persisting after adrenaline: salbutamol, ipratropium bromide, dexamethasone. Never first-line for bronchospasm in anaphylaxis",
      "Hypotension persisting after adrenaline (BP < 90 mmHg): IV fluid may be required to support vasopressor administration",
      "Glucagon: indicated if remains hypotensive after 2 doses adrenaline AND history of heart failure OR taking beta-blockers. Must not delay adrenaline",
      "All patients: transport to hospital regardless of severity or response. Minimum 4 hr observation for biphasic reaction (occurs in ~20%)"
    ],
    management_mica: [
      "Adrenaline infusion: Adrenaline 3 mg (3 mL 1:1000) to 50 mL with D5W or NS. 1 mL = 60 mcg. 1 mL/hr = 1 mcg/min"
    ],
    notes: "Adrenaline IM is always first. IV bolus only if imminent arrest. Infusion = MICA. Glucagon for beta-blocker/HF patients. All patients to hospital — biphasic reaction in ~20%."
  },

  // -----------------------------------------------------------
  // A0705 Shock (Undifferentiated)
  // -----------------------------------------------------------
  shock: {
    cpg: "A0705",
    title: "Shock",
    careObjectives: [
      "To achieve a perfusion target appropriate to the patient and their presenting illness"
    ],
    management: [
      "Shock: state of cellular and tissue hypoxia due to reduced oxygen delivery, increased oxygen consumption, inadequate oxygen utilization, or combination. Strongest indicator: profound hypotension (may be offset by compensatory tachycardia)",
      "Consider PANDA enrolment. Use metaraminol while assessing eligibility criteria",
      "Do not stand or walk the patient. Extricate supine or sitting as appropriate",
      "IV access: ideally 18G or larger. Noradrenaline/adrenaline must be administered through 18G or larger in a large proximal vein (e.g. antecubital fossa) — vasoconstrictive action carries higher risk of local tissue necrosis if extravasation occurs. Fluid and metaraminol may be administered through any size cannula",
      "Metaraminol boluses required: after initial fluid if inadequate response/deterioration (generally no/minimal BP improvement after 500\u20131000 mL NS); OR in parallel with initial fluid if profound hypotension (BP < 70 mmHg, altered mental status, or no radial pulses). No requirement to wait for a particular fluid volume before giving metaraminol",
      "Metaraminol 0.5 mg IV increments appropriate for most. Higher doses (1 mg) may be needed in significantly hypotensive patients",
      "Do NOT bolus noradrenaline under any circumstance (effects can be exaggerated and unpredictable)",
      "Adrenaline/noradrenaline infusions may run through the same IV cannula but that cannula must NOT be used for bolus medicines or flush",
      "IV extravasation: stop and disconnect infusion, leave cannula in place, get alternative access and recommence at new site, aspirate residual drug, remove cannula while aspirating, elevate limb, mark affected site, hand over to receiving facility, document clearly",
      "Reflex bradycardia from metaraminol/noradrenaline: may require addition of adrenaline infusion +/- reduction in infusion rate",
      "Fluid volumes: risk of fluid overload (cardiac failure, CKD, elderly): max 1000 mL titrated to response. All other patients: max 2000 mL titrated to response"
    ],
    management_mica: [
      "Noradrenaline infusion: Noradrenaline 3 mg to 50 mL with D5W or NS. 1 mL = 60 mcg. 1 mL/hr = 1 mcg/min",
      "Adrenaline infusion: Adrenaline 3 mg to 50 mL with D5W or NS. 1 mL = 60 mcg. 1 mL/hr = 1 mcg/min",
      "Metaraminol boluses continued if delay to noradrenaline/adrenaline infusion or adequate infusion pumps unavailable"
    ],
    notes: "No bolus noradrenaline ever. Vasopressors through 18G proximal vein only. Extravasation protocol. PANDA consideration."
  },

  // -----------------------------------------------------------
  // A0706 Meningococcal Septicaemia
  // -----------------------------------------------------------
  meningococcal: {
    cpg: "A0706",
    title: "Meningococcal Septicaemia",
    careObjectives: [
      "Rapid identification of purpuric rash and sepsis features",
      "Prompt ceftriaxone administration",
      "Urgent transport"
    ],
    management: [
      "Typical purpuric rash may be subtle in some cases and present as a single 'spot' only",
      "Rapid onset symptoms of sepsis +/- rash may be a sign of meningococcal septicaemia",
      "Meningococcal is transmitted by close personal exposure to airway secretions/droplets. Ensure face mask protection especially during intubation/suctioning. Ensure medical follow-up for staff post-exposure",
      "Consider consultation where diagnosis is uncertain",
      "Ceftriaxone IV preparation: 1g vial dilute with 9.5 mL water for injection to 10 mL; 2g vial dilute with 19 mL water for injection to 20 mL. Administer total dose over 4 minutes",
      "Ceftriaxone IM preparation: 1g vial dilute with 3.5 mL lidocaine 1% to 4 mL; 2g vial dilute with 7 mL lidocaine 1% to 8 mL. Administer each 1g dose separately into lateral upper thigh"
    ],
    management_mica: [],
    notes: "Rash can be a single spot. Treat on suspicion. PPE essential. IM ceftriaxone into lateral upper thigh in divided 1g doses."
  },

  // -----------------------------------------------------------
  // A0711 Suspected Stroke or TIA
  // -----------------------------------------------------------
  stroke: {
    cpg: "A0711",
    title: "Suspected Stroke or TIA",
    careObjectives: [
      "Assess suspected Stroke/TIA cases using MASS",
      "Transport to appropriate destination (thrombolysis, ECR or neurosurgical stroke centre)",
      "Hospital pre-notification"
    ],
    management: [
      "Stroke mimics: hypo/hyperglycaemia, seizures, migraine, sepsis, intoxication, brain tumour, inner ear disorder (vertigo), subdural haematoma, syncope, electrolyte disturbance, multiple sclerosis",
      "Patients still having signs/symptoms at assessment (even if improving): suspected stroke",
      "TIA: can only be diagnosed after hospital investigation. Any patient suspected TIA should be transported",
      "Oxygen: reserved for SpO\u2082 < 92% as per CPG A0001",
      "ICH likelihood features: rapid deterioration in conscious state (GCS < 8), severe headache, nausea/vomiting, bradycardia/hypertension. ICH is ~15\u201320% of strokes; ischaemic stroke and ICH are not clinically distinguishable",
      "ICH transport: awake (following commands) \u2192 nearest stroke hospital. Comatose (not eye opening/not following commands) \u2192 neurosurgical centre (Metro: RMH, SVH, Austin, Alfred, MMC; Rural: consider HEMS)",
      "Opioid analgesia: use with caution due to risk of deterioration in conscious state",
      "Prochlorperazine for ICH/SAH: unlikely beneficial effect. Only give if patient has nausea/vomiting AND ondansetron cannot be given",
      "Thrombolysis eligibility: potentially up to 12 hours from symptom onset. Symptom onset = time last seen well. Woke with symptoms = time went to bed",
      "Orolingual angioedema post-thrombolysis (~1%): nebulised adrenaline 5 mg in 5 mL. If deteriorates: IV adrenaline (ALS under consult only). IM adrenaline avoided post-thrombolysis (bleeding risk)",
      "ECR: effective for large vessel clots up to 24 hours from onset. ACT-FAST assessment tool informs ECR eligibility. Stroke-capable ambulance (SCA) area: use Zeus app for all MASS positive patients",
      "Intubation: where difficulty maintaining airway/oxygenation/ventilation. Post-intubation target BP: 120\u2013140 mmHg",
      "Heavily dependent patients (e.g. dementia, nursing home residents): unlikely to receive thrombolysis. Transport Code 2 without notification",
      "Hospital pre-notification: allows CT to be requested prior to arrival, reduces time to treatment"
    ],
    management_mica: [],
    notes: "MASS assessment. 12h thrombolysis window (from last seen well). ICH = neurosurgical centre if comatose. ECR up to 24h. No IM adrenaline post-thrombolysis."
  },

  // -----------------------------------------------------------
  // A0712 Palliative Care
  // -----------------------------------------------------------
  palliative_care: {
    cpg: "A0712",
    title: "Palliative Care",
    careObjectives: [
      "Provide relief from distressing symptoms (pain, nausea/vomiting, agitation/anxiety, dyspnoea) in patients registered with community palliative care service",
      "Intent: symptom relief, not treatment of underlying disease process"
    ],
    management: [
      "Applies ONLY to: patients with advanced, incurable disease, no longer receiving active treatment, currently registered with community palliative care service, who express a wish to stay at home",
      "For care advice and planning: contact patient's palliative care team. If unavailable: Palliative Care Advice Service (1800 360 000, 7am\u201310pm, 7 days)",
      "Agitation in palliative patient may be due to: pain, hypoxia, hypotension, sepsis, urinary retention, electrolyte imbalance",
      "Morphine SC: primary treatment. Calculate dose using AV CPG App to determine total equivalent daily oral morphine dose",
      "If total equivalent daily oral morphine < 50 mg: administer Morphine 2.5 mg SC",
      "If total equivalent daily oral morphine \u2265 50 mg: administer 20% of that total equivalent daily dose (converted to SC by AV CPG App). Max SC morphine dose: 20 mg. Doses > 10 mg: discuss with Clinician",
      "Morphine/fentanyl equivalence: Morphine 2.5 mg = Fentanyl 25 mcg; Morphine 20 mg = Fentanyl 200 mcg. If patient unable to have morphine: use equivalent fentanyl dose",
      "Midazolam SC: where agitation is not associated with pain. DO NOT administer morphine AND midazolam to same patient unless directed by the community palliative care service (risk of respiratory depression)",
      "Do not use in situ subcutaneous access devices unless familiar with them or guided by someone who is",
      "Paediatric palliative care: MUST consult Victorian Paediatric Palliative Care Program at RCH (9345 5522, 24 hrs) even if symptom management plan is present",
      "Document medications on AV Health Information Sheet. Leave with patient/carers for palliative care team"
    ],
    management_mica: [],
    notes: "Symptom relief only, not disease treatment. Morphine SC dosed via AV CPG App. No morphine + midazolam together without palliative care direction. Paediatric = always consult RCH."
  },

  // -----------------------------------------------------------
  // A0729 Sepsis and Infection
  // -----------------------------------------------------------
  sepsis: {
    cpg: "A0729",
    title: "Sepsis and Infection",
    careObjectives: [
      "Identify patients with suspected sepsis using qSOFA and NEWS2",
      "Fluid resuscitation and vasopressors where indicated",
      "Appropriate disposition"
    ],
    management: [
      "Sepsis: life-threatening organ dysfunction caused by dysregulated response to infection. Septic shock: sepsis with circulatory/metabolic abnormalities substantially increasing mortality (persistent hypotension requiring vasopressors + serum lactate > 2 mmol/L despite fluid — hospital mortality > 40%)",
      "qSOFA (identifies increased risk): hypotension (SBP \u2264 100 mmHg), altered conscious state (GCS < 15 unless normal for patient), tachypnoea (RR \u2265 22). Two or more criteria in setting of suspected infection: reliable predictor of sepsis. Absence does not rule out sepsis",
      "Patients with suspected infection AND hypotension: treat without delay, no need to calculate NEWS2 first",
      "NEWS2 \u2265 7: very high risk. Fluid bolus (even if normotensive) and other sepsis care",
      "NEWS2 5\u20136: high risk. Transport to hospital. Consider fluid bolus (especially if other risk factors or tachycardia)",
      "NEWS2 2\u20134: moderate risk. Timely ED review (VVED, self-presentation, or transport)",
      "NEWS2 0\u20132, no other risk factors: low risk. Self-care or GP referral may be appropriate",
      "Risk factors increasing sepsis risk independent of vital signs: diabetes (uncontrolled, or with skin/soft tissue infection), elderly/frail (risk increases progressively above 65 yrs; cachexia/functional impairment markers of significant frailty), severe obesity (BMI > 40), chemotherapy within 4 weeks, neutropenia, recent pregnancy (birth/miscarriage/termination within ~6 weeks)",
      "Moderate risk: VVED appropriate if complexity present but low overall risk and no high-risk signs/symptoms. Transport if multiple moderate-risk features present",
      "High risk (normotensive patients): fluid bolus still beneficial. Patients who normalise BP do not require further fluid beyond initial bolus",
      "Persistent hypotension after fluid: treat with vasopressors",
      "Suspected meningococcal septicaemia: ceftriaxone as per CPG A0706"
    ],
    management_mica: [],
    notes: "qSOFA + NEWS2 together, not in isolation. NEWS2 \u2265 7 = fluids even if normotensive. Vasopressors for fluid-refractory hypotension. Meningococcal = ceftriaxone."
  },

  // -----------------------------------------------------------
  // A0715 Adrenal Insufficiency
  // -----------------------------------------------------------
  adrenal_insufficiency: {
    cpg: "A0715",
    title: "Adrenal Insufficiency",
    careObjectives: [
      "Prioritise corticosteroid therapy",
      "Support perfusion with IV fluid",
      "Transport to closest hospital preferably with ICU"
    ],
    management: [
      "Adrenal insufficiency: inadequate production of cortisol +/- aldosterone leading to impaired glucose regulation and cardiovascular function. Can lead to adrenal crisis — severe, life-threatening",
      "Primary (PAI): includes Addison's Disease and Congenital Adrenal Hyperplasia. Due to adrenal gland destruction/impairment. Triggered by physiological or psychological stress",
      "Secondary (SAI): pituitary/hypothalamic impairment reduces ACTH. Can occur following prolonged glucocorticoid steroid therapy (> 20 mg prednisone/day for > 3 weeks; evening dose \u2265 5 mg for more than a few weeks; Cushingoid appearance). SAI is comparable in severity to PAI",
      "PAI patients with any moderate or severe physiological or psychological stress: treat with hydrocortisone to prevent adrenal crisis. Signs and symptoms of adrenal insufficiency are NOT required to treat this patient group",
      "Do not delay hydrocortisone while trying to gain IV access — use IM route if poor veins",
      "Patients may have initiated their own sick day management plan including IM hydrocortisone. Review care plan as part of assessment",
      "Early signs: mood swings, irritability, joint pain, fatigue, difficulty to rouse, abdominal cramping",
      "ECG: due to risk of hyperkalaemia. BGL: due to risk of hypoglycaemia",
      "Extended travel time > 1 hour: consult endocrine specialist or AV Medical Advisor via AV Clinician for ongoing IV fluid management and care priorities",
      "Hydrocortisone is unlikely to cause harm but has the potential to be life-saving. If any doubt, initiate hydrocortisone and IV fluids"
    ],
    management_mica: [],
    notes: "Treat suspected adrenal crisis early — don't wait for signs. IM if poor IV access. Hydrocortisone is safe; delay is dangerous."
  },

  // -----------------------------------------------------------
  // A0724 Hyperkalaemia
  // -----------------------------------------------------------
  hyperkalaemia: {
    cpg: "A0724",
    title: "Hyperkalaemia",
    careObjectives: [
      "Identification of patients with suspected hyperkalaemia",
      "Stabilisation of cardiac membrane",
      "Intracellular shifting of potassium",
      "Where feasible, transfer to facility with intensive care capability"
    ],
    management: [
      "Symptoms are vague and non-specific. Profound weakness or fatigue is common. Degree of symptoms relates to rate of potassium rise, not absolute level",
      "Patients with known CKD may have non-clinically relevant elevated potassium. In absence of ECG changes or demonstrated rapid rise: do NOT manage for hyperkalaemia prehospital",
      "Suspect hyperkalaemia in severe crush injury or rhabdomyolysis if also presenting with ECG changes",
      "ECG changes (degree does not correlate with specific K+ levels): bradyarrhythmia, tall peaked T waves with shortened QT, prolonged PR, absent P waves, widened QRS, sine wave pattern. Progression of ECG findings strongly supports hyperkalaemia",
      "Isolated ECG findings (e.g. bradycardia, first-degree block) should be clinically correlated. Consider period of observation before initiating management",
      "Absence of ECG changes does not exclude hyperkalaemia — maintain strong index of suspicion in at-risk patients",
      "Membrane stabilisation: Calcium Gluconate to any patient with strong clinical history of hyperkalaemia AND significant/progressive ECG changes. Administer prior to laboratory confirmation",
      "Intracellular shifting: salbutamol and adrenaline activate Na-K pumps and shift K+ into cells (temporising, not definitive). Adrenaline preferred vasoactive agent when shock + hyperkalaemia (strong beta-adrenergic effect)",
      "Sodium bicarbonate: controversial and not generally supported except in severe metabolic acidosis — consult AV Medical Advisor",
      "Manage underlying causes: hypoperfusion (CPG A0705, prefer adrenaline over noradrenaline), DKA (CPG A0713), adrenal crisis (CPG A0715)",
      "Transport to ICU-capable facility where possible within reasonable time. If not feasible: early notification + consider ARV consultation for retrieval"
    ],
    management_mica: [],
    notes: "ECG progression, not absolute level, guides treatment. Calcium = membrane stabilisation. Salbutamol/adrenaline = temporising shift. Adrenaline preferred over noradrenaline in hyperkalaemic shock."
  },

  // -----------------------------------------------------------
  // A0725 Syncope
  // -----------------------------------------------------------
  syncope: {
    cpg: "A0725",
    title: "Syncope",
    careObjectives: [
      "Identify patients suffering from syncope",
      "Symptomatic management if required",
      "Identify appropriate care pathway based on risk profile"
    ],
    management: [
      "Syncope: transient loss of consciousness due to cerebral hypoperfusion. Defining characteristics: rapid onset, short duration, spontaneous complete recovery. Can be reflex, orthostatic, or cardiovascular",
      "Syncope may present with tonic-clonic motions similar to seizures. Tongue biting, incontinence, postictal phase, and/or absence of autonomic activation (diaphoresis) prior to collapse: suggestive of seizure, not syncope",
      "May also present with stroke-like symptoms consistent with TIA — requires urgent hospital investigation",
      "Orthostatic hypotension: SBP drop \u2265 20 mmHg or DBP drop \u2265 10 mmHg on standing. Broad differential: fever/infection, alcohol, antihypertensives/diuretics, dehydration, significant blood loss",
      "Concerning ECG findings (suggest cardiovascular syncope): bradycardia not explained by conditioning, 2nd or 3rd degree AV block, SVT or paroxysmal AF, pre-excited QRS complexes",
      "Consider pregnancy testing in patients of child-bearing age. Lactate > 4.75 mmol/L suggests seizure rather than syncope",
      "Low-risk (reflex syncope or uncomplicated orthostatic hypotension): refer to VVED. 12-lead ECG must be sent to VVED clinician for review during handover",
      "Self-care: lie flat and elevate feet if feeling faint; fresh air; remain flat 10 min, then stand slowly; follow VVED advice regarding driving",
      "High-risk syncope: requires prolonged observation/monitoring/ED care. Transport and manage as per appropriate CPG for underlying condition"
    ],
    management_mica: [],
    notes: "VVED appropriate for low-risk. ECG must go with VVED referral. High-risk features = ED. Lactate differentiates syncope from seizure."
  },

  // -----------------------------------------------------------
  // A0810 Major Trauma
  // -----------------------------------------------------------
  major_trauma: {
    cpg: "A0810",
    title: "Major Trauma",
    careObjectives: [
      "Immediate control of major haemorrhage",
      "Ensure airway patency, adequate oxygenation/ventilation, adequate perfusion",
      "Prioritise transport",
      "Supportive care as required"
    ],
    management: [
      "Hierarchy of priorities: major haemorrhage control first, then ABC. Minimise scene time for all major trauma. Penetrating truncal trauma or shock: treat only immediately life-threatening conditions before transport. IV access for fluids is not as important as transport for surgical intervention",
      "Major haemorrhage control is the absolute priority throughout the entire episode of care. Reassess regularly — dressings and tourniquets may dislodge, splints may be forgotten, bleeding may resume as BP recovers",
      "NPA preferred airway adjunct over OPA in head injury (OPA may trigger gag reflex and raise ICP). NPA may be used in suspected base of skull fracture if airway cannot be maintained without it — airway occlusion risk outweighs NPA risk",
      "RSI: identify candidate early and begin planning in parallel with other priorities to minimise scene time",
      "Shock WITHOUT TBI: target BP 70\u201390 mmHg (permissive hypotension). Factors favouring lower target: radial pulse present, normal mentation, penetrating truncal trauma, young/healthy, active massive bleeding, shorter transport times. Factors favouring higher target: no radial pulse, abnormal mentation, blunt trauma, older/comorbid, controlled bleeding, longer transport times",
      "Shock WITH TBI: target BP 120 mmHg. Where both TBI and haemorrhagic shock present: prevent secondary brain injury from hypotension. If any doubt about TBI, target higher BP",
      "Vasopressors: only for hypotension refractory to fluid resuscitation after haemorrhage control measures are confirmed adequate and chest decompression considered. Never before fluid. Continue fluid in parallel to vasopressors",
      "Blood components (PRBC, MICA credentialed): preferred over normal saline where available. PRBC in legal minors: requires parent/guardian consent or medical doctor approval (AV Medical Advisor via Clinician or RCH)",
      "TXA: administer if injury < 2 hours ago AND COAST score \u2265 3 OR suspected severe injuries with hypotension. TXA benefit reduced 10% per 15 min delay. DO NOT delay life-saving interventions or transport to administer TXA. NOT indicated for GIT haemorrhage or AAA",
      "Hypocalcaemia: Calcium Gluconate 10% empirically after 4 units PRBC, or if iCa confirms hypocalcaemia (if point-of-care pathology available)",
      "Agitation (mild/moderate): pain relief. Agitation (severe): ketamine as per CPG A0708 (half dose if shocked: < 60kg 100 mg, 60\u201390 kg 150 mg, > 90 kg 200 mg). Agitation preventing preoxygenation: ketamine 20\u201340 mg IV small bolus to enable preoxygenation before RSI. Midazolam NOT for combativeness prior to RSI in head injury",
      "Prevent hypothermia: heat ambulance, remove wet clothes, dry patient, apply blankets, chemical warming blanket if shocked/intubated/hypothermic",
      "Spinal immobilisation as per CPG A0804. If intubation required: apply cervical collar after intubation",
      "Pregnant patients with major trauma: consult AV Medical Advisor via Clinician at earliest opportunity. APH + major trauma: consult PIPER. AAA or massive GIT haemorrhage: fluid/vasopressors per this CPG, TXA not indicated"
    ],
    management_mica: [
      "RSI: manage as per CPG A0303 Difficult Airway if indicated. TBI post-intubation target BP: 120\u2013140 mmHg",
      "PRBC administration: where credentialed. Blood products preferred over normal saline for major trauma resuscitation",
      "TXA: 1 g IV over 10 minutes",
      "Adrenaline/noradrenaline infusion for vasopressor-refractory shock"
    ],
    notes: "Haemorrhage control always first. Permissive hypotension 70-90 mmHg (unless TBI then 120). TXA < 2 hrs only. Ketamine half-dose if shocked. No midazolam pre-RSI in TBI."
  },

  // -----------------------------------------------------------
  // A0803 Traumatic Head Injury
  // -----------------------------------------------------------
  head_injury: {
    cpg: "A0803",
    title: "Traumatic Head Injury",
    careObjectives: [
      "Moderate-severe TBI: optimise airway patency, oxygenation, ventilation, and cerebral perfusion pressure to prevent secondary brain injury",
      "Mild TBI: identify high-risk patients (neurosurgical facility), moderate-risk (CT-capable ED), low-risk (community with self-care advice)"
    ],
    management: [
      "Secondary brain injury is caused by abnormal physiology (hypoxia, hypercapnia, hypotension) — prehospital management focuses on optimising physiology",
      "Moderate-severe TBI: maintain normal or supranormal MAP (target BP 120 mmHg) to counteract elevated ICP and maintain CPP. Oxygen to maintain normal SpO\u2082, ETCO\u2082 management to maintain normal ventilation",
      "Suspect moderate-severe TBI in any patient with head injury + significantly altered conscious state. GCS reduction > 2 points is significant (usually GCS < 13)",
      "High-risk features: altered conscious state/coma, penetrating cranial injury, base of skull fracture signs (haemotympanum, CSF from ears/nose, Battle sign, raccoon eyes — may take up to 3 days to appear), seizure following head trauma, GCS < 13, focal neurological deficit, coagulopathy or anticoagulation",
      "Moderate-risk features: LOC, amnesia, altered mental status (agitation, drowsiness, repeated questioning, slow verbal response), age \u2265 65 or coagulopathy (as sole risk factor), significant mechanism",
      "Low-risk: absence of high or moderate risk features. May include concussion symptoms (mild headache, nausea, fatigue). Self-care appropriate",
      "ICH transport: awake (following commands) \u2192 nearest stroke hospital. Comatose (not eye opening/not following commands) \u2192 neurosurgical centre",
      "Opioid analgesia: use with caution (risk of deterioration in conscious state)",
      "Concussion self-care: rest (limit physical and cognitive activity including screen time), paracetamol for headaches, no driving/alcohol/sedatives for 24 hrs, competent adult to monitor for 4\u201324 hrs",
      "Safety netting: seek immediate help for severe/increasing headache, repeated vomiting, increasing confusion/agitation, altered conscious state, seizures, weakness/altered sensation",
      "Pupils: 15-minutely monitoring in transported patients"
    ],
    management_mica: [
      "RSI if unable to maintain airway, oxygenation, or ventilation. Post-intubation target BP: 120\u2013140 mmHg"
    ],
    notes: "Normal or supranormal BP in TBI (120 mmHg). Avoid hypoxia and hypercapnia. High-risk = neurosurgical or stroke centre. Base of skull signs may take 3 days."
  },

  // -----------------------------------------------------------
  // A0802 Chest Injury
  // -----------------------------------------------------------
  chest_injury: {
    cpg: "A0802",
    title: "Chest Injury",
    careObjectives: [
      "Adequate oxygenation",
      "Effective pain relief to assist in maintaining adequate ventilation",
      "Early identification and management of tension pneumothorax"
    ],
    management: [
      "Tension pneumothorax: suspect in patient with likely mechanism and clinical deterioration. Signs: inadequate perfusion, increasing respiratory distress, SpO\u2082 < 92% despite oxygen. Distended neck veins and tracheal deviation: unreliable and late signs",
      "Spontaneously breathing tension PTX: tends to progress slowly; predominantly hypoxaemia and increasing respiratory distress; haemodynamic compromise is usually a late sign",
      "Ventilated tension PTX: tends to develop rapidly (seconds to minutes); predominantly haemodynamic compromise + hypoxaemia; increased peak inspiratory pressure/stiff bag; decreased ETCO\u2082. Consider in ventilated cardiac arrest patients with sudden deterioration in SpO\u2082 and ETCO\u2082 after vigorous CPR",
      "Positioning: awake spontaneously ventilating \u2192 sitting upright. Hypoperfused or spinal precautions \u2192 supine or 10\u201315 degrees head-up",
      "Pain relief: essential and early. Rib fracture pain leads to hypoventilation. Do NOT splint chest injury (not effective, increases pain). Methoxyflurane may be less effective if pain on inspiration impedes administration",
      "Open chest wounds: DO NOT cover (sealing may worsen or cause tension PTX). Leave open and monitor closely",
      "Vented chest seals (applied by police/other agencies): remove if evidence of tension pneumothorax",
      "Needle thoracostomy: primary management for tension pneumothorax. Local anaesthetic with lidocaine required prior to procedure in patients with awareness (responsive to voice or alert). Max lidocaine 1% dose: 3 mg/kg. Do NOT perform unless evidence of tension PTX",
      "Uncomplicated pneumothorax: does NOT routinely require decompression for flight (previous practice of routine pre-flight decompression is no longer recommended)",
      "Finger thoracostomy (if accredited): intubated patients only. Sterile procedure. If any delay: needle thoracostomy first as bridge",
      "Shock: manage concurrently as per CPG A0810 Major Trauma"
    ],
    management_mica: [
      "Finger thoracostomy (if accredited): for intubated patients with tension PTX"
    ],
    notes: "Don't cover open wounds. Don't decompress without tension. Lidocaine before needle thoracostomy in awake patients. Finger thoracostomy = intubated only."
  },

  // -----------------------------------------------------------
  // A0804 Spinal Injury
  // -----------------------------------------------------------
  spinal_injury: {
    cpg: "A0804",
    title: "Spinal Injury",
    careObjectives: [
      "Identify patients with suspected SCI and transfer to appropriate facility",
      "Protect spinal column where SCI is suspected or unstable vertebral injury cannot be excluded",
      "Avoid unnecessary immobilisation by clinically excluding patients without injury"
    ],
    management: [
      "Spinal cord injury causes neurological deficits. Unstable vertebral injury causes pain but no deficits (unless assessment obscured). Both require spinal immobilisation and urgent transport",
      "Neurogenic shock: loss of sympathetic tone from SCI. Signs: hypotension, bradycardia, flushed warm skin, hypothermia. Manage as per CPG A0810/A0705",
      "Penetrating trauma: do NOT routinely immobilise. Immobilisation of penetrating trauma patients is associated with higher mortality. Only apply if patient has a neurological deficit",
      "High-risk mechanisms: hyper-flexion, hyper-extension, hyper-rotation, axial loading. Young/healthy: requires significant force. Older/frail (\u2265 65 yrs, ankylosing spondylitis, spinal stenosis, rheumatoid arthritis, previous spinal fusion or injury): far less force required",
      "Spinal clearance criteria (ALL must be met): no neurological deficit, no vertebral pain/tenderness on palpation, no factors increasing assessment difficulty (altered conscious state, distracting injury, intoxication), no increased risk of injury (e.g. ankylosing spondylitis), normal neck range of motion",
      "Altered conscious state includes: GCS < 15 for any reason, concussion, dementia",
      "Distracting injury: injuries causing significant pain/distress (e.g. fractures, burns) that may distract from vertebral pain. Small haematomas/lacerations are NOT usually considered distracting",
      "SCI or major trauma (neurological deficit or trauma criteria): not candidates for spinal clearance — spinal immobilisation and expedited transport",
      "Age as sole risk factor: consider consultation with VVED. NEXUS criteria were not designed for severely injured patients",
      "Intubation required: apply cervical collar after intubation. Attempt to minimise jugular vein compression"
    ],
    management_mica: [],
    notes: "Penetrating trauma = no routine immobilisation. Clearance requires ALL five criteria met. Age alone = VVED consult. Apply collar after, not before, intubation."
  },


  // -----------------------------------------------------------
  // A0805 Burns
  // -----------------------------------------------------------
  burns: {
    cpg: "A0805",
    title: "Burns",
    careObjectives: [
      "Identify and manage potential airway burns as a priority",
      "Minimise the impact of injury by maintaining tissue and organ perfusion, minimising pain, appropriate burn wound cooling and minimising heat loss during transfer to hospital"
    ],
    management: [
      "Signs of airway burns: evidence of burns to upper torso, neck and face; facial and upper airway oedema; sooty sputum; burns in enclosed space; singed facial hair; respiratory distress (dyspnoea +/- wheeze, tachycardia, stridor); hypoxia (restlessness, irritability, cyanosis, decreased GCS)",
      "Volume replacement calculated for burn injury only. Manage other injuries including additional fluid requirements accordingly",
      "Electrical burns: increased risk of AKI secondary to profound muscle damage – may require extra fluid",
      "Small, isolated, superficial burn with unbroken skin or sunburn: consider Treat and Refer pathway TR0205",
      "Burn cooling: ideally 20 minutes with gentle running water 5–15°C. Stop cooling if patient begins shivering or temperature ≤ 35°C. Ice and iced water not desirable. Dirty water should be avoided",
      "If running water unavailable: cool by immersion, spray bottle, or moist towels",
      "Chemical burns: irrigate for as long as pain persists. Avoid washing chemicals onto unaffected areas, especially eyes",
      "Remove burnt clothing or clothing containing chemicals or hot liquid when safe. Do not remove matter adhered to underlying tissue. Remove jewellery prior to swelling",
      "Minimise heat loss: maintaining normothermia is vital. Assess temperature as soon as practicable",
      "Elevation: if clinically appropriate, elevate affected area during transport to minimise swelling, especially in circumferential burns",
      "Dressing: cling wrap is appropriate and preferred. Apply longitudinally to allow for swelling",
      "Wallace rule of nines: Head 9%, Torso 18% front (abdomen and chest) and 18% back, Arm 9% each, Leg 18% each, Groin 1%",
      "Transport: > 20% TBSA, suspected airway burns, > 1000 volt electrical burns = time critical. Transport to Alfred Hospital if within 60 minutes transport time; otherwise nearest highest level trauma service",
      "Burns involving face, hands, feet, genitalia, major joints, or circumferential burns: recommended for major burns service assessment",
      "Consult AV Medical Advisor via AV Clinician for significant burn injury for management, appropriate destination and hospital notification"
    ],
    management_mica: [
      "Patients receiving intubation and paralysis are at increased risk of hypothermia. Once long term paralytic administered, temperature management becomes a more significant priority"
    ],
    notes: "Airway burns = highest priority. Cool 20 min with running water 5-15°C. Cling wrap preferred dressing - apply longitudinally. Rule of nines for TBSA estimation. Alfred Hospital is preferred destination for time-critical burns."
  },

  // -----------------------------------------------------------
  // A0901 Hypothermia / Cold Exposure
  // -----------------------------------------------------------
  hypothermia: {
    cpg: "A0901",
    title: "Hypothermia / Cold Exposure",
    careObjectives: [
      "Identify and appropriately manage hypothermic patients",
      "Minimise the risk of major trauma patients becoming hypothermic"
    ],
    management: [
      "Classification: Mild 32–35°C, Moderate 28–32°C, Severe < 28°C",
      "Hypothermia is insidious and rarely occurs in isolation if the patient is part of a group",
      "Elderly patients are at particular risk irrespective of initial complaint",
      "Potential major trauma patients should receive thermal management under this guideline irrespective of their temperature",
      "Cardiac arrhythmias associated with temperatures < 33°C. Gentle handling essential to avoid stimulating lethal arrhythmias",
      "Atrial arrhythmias, bradycardias or A-V blocks will generally resolve on rewarming. Antiarrhythmics or pacing usually not required unless decompensation has occurred",
      "Defibrillation and cardioactive medications may not be effective at temperatures < 30°C. VF may resolve spontaneously upon rewarming",
      "Target temperature for patient compartment of ambulance: 24°C or higher",
      "Wet clothes: must be removed, patient dried, then thermally protected. Dry clothes: only remove if required to assess and treat injuries",
      "IV fluid where indicated: deliver via fluid warmer if available. Do not warm IV bags in microwave",
      "Cardiac arrest: if temperature < 30°C, double the interval between doses of adrenaline or amiodarone as per CPG A0201"
    ],
    management_mica: [
      "Intubated hypothermic patients: monitor temperature with oesophageal temperature probe where available",
      "Intubated patients who are sedated and paralysed are at risk of hypothermia and should have thermal management initiated once stabilised"
    ],
    notes: "Mild 32-35°C, Moderate 28-32°C, Severe <28°C. VF may self-terminate on rewarming. Defib/meds less effective < 30°C. Double adrenaline/amiodarone interval in cardiac arrest if temp < 30°C. Gentle handling to avoid arrhythmia trigger."
  },

  // -----------------------------------------------------------
  // A0902 Hyperthermia / Heat Stress
  // -----------------------------------------------------------
  hyperthermia_environmental: {
    cpg: "A0902",
    title: "Hyperthermia / Heat Stress",
    careObjectives: [
      "Identify and appropriately manage hyperthermic patients with an urgency relative to their presentation",
      "The focus of treatment must be on aggressive cooling"
    ],
    management: [
      "Heat stroke: generally defined as temperature > 40°C with associated CNS dysfunction – urgent medical emergency",
      "Cause may be environmental, exertional, or chemically mediated. There may be cross-over – regardless, focus of management is aggressive cooling",
      "If signs/symptoms of heat stroke and other causes of CNS dysfunction are ruled out: actively and aggressively cool. Temperature will typically be > 38°C but the exact number should not be the defining factor",
      "Exertional heat illness may affect patients in groups. Consider requesting further resources including ice and bottled water",
      "Position: gentle handling is essential. Position flat or lateral. Avoid head-up positioning to avoid hypotension and arrhythmias",
      "Strip / spray / fan: air flow over wet skin must be vigorously promoted. Passively blowing air conditioning is not adequate – aggressive fanning required",
      "Oral fluids: if patient is able, cold oral fluids are a suitable method of rehydration",
      "IV fluids: cold IV fluid titrated to adequate perfusion and consideration of temperature. Slower rate for elderly or patients with impaired renal or cardiac function",
      "Ice bath / cold shower: consider where facilities are readily accessible (e.g. sporting environments, music festivals) while preparing for transport",
      "Target temperature: aim for < 40°C within 30 minutes of onset of symptoms if possible",
      "Elderly / frail: at increased risk. Low threshold for transport even if purely for monitoring in air conditioned environment. Age ≥ 65 is independent factor increasing risk of hospital/ICU admission and death",
      "Toxin induced hyperthermia: standard cooling techniques in isolation are less likely effective. See CPG A0719 Drug Induced Hyperthermia"
    ],
    management_mica: [
      "Muscle paralysis (RSI): in toxin induced hyperthermia, neuromuscular paralysis may assist in more severe cases and RSI may be appropriate. See CPG A0719",
      "Intubated hyperthermic patients: monitor temperature with oesophageal temperature probe where available"
    ],
    notes: "Heat stroke = >40°C + CNS dysfunction. Aggressive cooling is the treatment. Strip/spray/fan - passive AC not sufficient. Ice bath if available. RSI MICA only for severe toxin-induced hyperthermia."
  },

  // -----------------------------------------------------------
  // A0708 Acute Behavioural Disturbance
  // -----------------------------------------------------------
  acute_behavioural_disturbance: {
    cpg: "A0708",
    title: "Acute Behavioural Disturbance",
    careObjectives: [
      "Maintain safe environment for patients, staff, other emergency responders, family and bystanders",
      "Use the least restrictive means possible, maintaining verbal and environmental de-escalation strategies throughout",
      "Consider clinical causes of acute behavioural disturbance"
    ],
    management: [
      "Causes: physical injury/pain, acute medical conditions (hypoglycaemia, postictal), unmet needs (bladder distension, withdrawal), substance abuse/poisoning, acute mental health condition, dementia/delirium, neurodiversity",
      "Severity: Mild – able to cooperate, not aggressive, anxious/pacing. Moderate – loud outbursts, not aggressive. Severe – combative, violent, cannot cooperate",
      "Assessment should be ongoing as patient's condition is dynamic",
      "Nominate one person to communicate with patient. Non-threatening stance. Quiet, calm reassuring voice. Exaggerate friendly expressions",
      "Environmental de-escalation: reduce stimulus; work with trusted person; minimise noise and light; calming toys, warm blankets, distraction activities, food/drink",
      "Verbal de-escalation: introduce yourself; use patient's name; focus on safety; active listening; one instruction at a time; give extra time for responses; avoid 'no' language; no threats or ultimatums",
      "Correctable cause identified (hypotension, hypoxia, hypoglycaemia): preference is to treat the cause rather than provide sedation",
      "Physical/mechanical restraint: only as last resort. DO NOT restrain in prone position – associated with asphyxia and death. Observe continuously. Lateral position if sedated",
      "Sedation: droperidol is preferred parenteral sedative in most circumstances – therapeutic, longer duration. Midazolam preferred if Lewy body dementia, Parkinson's, or QT prolongation known",
      "Ketamine: only if extreme and immediate risk (substantial potential for death or serious injury, occurring right now or in seconds). Shorter onset, non-therapeutic, does not treat underlying cause",
      "Olanzapine: consider oral olanzapine where agitated patient has responded to de-escalation but has propensity to re-escalate. Patients on olanzapine-only may not require transport – consult TelePROMPT",
      "Psychostimulant affected patients: midazolam, cooling, hydration preferred. Ketamine may be required initially for extreme risk",
      "Elderly/frail: olanzapine as initial pharmacological agent is likely to be effective. Droperidol may worsen Parkinson's/Lewy body dementia",
      "Post-sedation: SAT < -1 requires minimum monitoring standard. Position lateral. SpO2 monitoring. Continuous cardiac monitoring. ETCO2 if ketamine used or SAT < 0"
    ],
    management_mica: [
      "Multiple parenteral agents for initial sedation: only where advanced airway management is possible (MICA) and full onset of initial medicine has passed",
      "ALS must consult AV Medical Advisor via AV Clinician prior to combining different parenteral sedatives if no MICA on scene",
      "Ketamine hypersalivation: suctioning usually sufficient. If airway compromised: atropine 600 mcg IV/IM (MICA)",
      "RSI should follow successful ketamine sedation in patients with traumatic/hypoxic brain injury presenting with severe agitation"
    ],
    notes: "RASS/SAT scoring guides sedation. Droperidol = preferred parenteral. Ketamine = extreme immediate risk only. Prone restraint = prohibited. De-escalation throughout all phases. ETCO2 mandatory with ketamine. Consult TelePROMPT for olanzapine-only cases."
  },

  // -----------------------------------------------------------
  // A0107 Mental Health Conditions
  // -----------------------------------------------------------
  mental_health_conditions: {
    cpg: "A0107",
    title: "Mental Health Conditions",
    careObjectives: [
      "Appropriate assessment and disposition for patients presenting with mental health conditions"
    ],
    management: [
      "Olanzapine-only sedation: patients administered olanzapine may not necessarily require transport to hospital and may be suitable for community-based care",
      "TelePROMPT are able to advise on mental health of patient and whether community treatment may be appropriate",
      "Physical health concerns and administration of any medications remain the responsibility of the paramedic",
      "Ensure olanzapine has not caused adverse reactions in relation to conscious state or vital signs where patient is not being transported",
      "Disposition: use Mental Health Destination Tool, VACIS or AV Clinician to select appropriate destination if transporting to hospital",
      "Consider CPG A1101 Mental Health and Wellbeing Principles"
    ],
    management_mica: [],
    notes: "Primarily a disposition and de-escalation guide. Olanzapine-only patients may not need transport - TelePROMPT consultation recommended. Use Mental Health Destination Tool for transport destination."
  },

  // -----------------------------------------------------------
  // A0722 Opioid Toxicity
  // -----------------------------------------------------------
  opioid_toxicity: {
    cpg: "A0722",
    title: "Opioid Toxicity",
    careObjectives: [
      "Airway patency and adequate ventilation",
      "Reverse opioid action sufficiently to permit adequate spontaneous respiration without causing opioid withdrawal"
    ],
    management: [
      "Scene safety: uncapped sharps at scene or on patient. Dynamic risk assessment. PPE. Assess potential for multi-casualty event",
      "Signs: respiratory depression (SpO2 < 92% on room air) or apnoea; unable to maintain airway; CNS depression (drowsiness to coma); miosis (common but not always present); prolonged QT (methadone, oxycodone, loperamide)",
      "Differential diagnosis: AEIOUTIPS – Alcohol/drug intoxication, Epilepsy (postictal), Insulin/metabolic (hypoglycaemia), Overdose/oxygen (hypoxia), Underdose/withdrawal, Trauma (head), Infection/sepsis, Pain/psychiatric, Stroke/TIA",
      "Isolated heroin toxicity: rebound and complications less likely. If complete reversal, patient may be safely left with family/friends/carer if they observe for at least 4 hours and have take-home naloxone available",
      "Other opioid toxicity (prescription, polydrug, iatrogenic, unknown): smaller titrated doses of naloxone recommended to manage respiratory depression and avoid acute opioid withdrawal. Rebound possible with long-acting opioids",
      "Synthetic opioids: may require higher doses of naloxone. Greater risk of rebound toxicity. Fentanyl analogues may be particularly potent",
      "Prior administered doses (injecting rooms, patient's own prescription IM/IN): administer further naloxone up to prescribed AV dose",
      "Patient responsiveness to naloxone: variable. If respiratory depression returns following naloxone (long-acting opioid or high-potency synthetic): consult VPIC via AV Clinician",
      "Paediatric opioid toxicity: accidental overdosing, dose confusion, or accessing adult preparations (codeine, buprenorphine, methadone). Single tablet or small quantity of methadone/oxycodone can be lethal in a child"
    ],
    management_mica: [],
    notes: "BVM ventilation first, position, suction. Titrate naloxone to adequate respiration - not full reversal. Avoid precipitating withdrawal. Isolated heroin - may leave with carer if complete reversal + 4hr observation + take-home naloxone. Consult VPIC for rebound/synthetic opioids."
  },

  // -----------------------------------------------------------
  // A0723 Tricyclic Antidepressant Toxicity
  // -----------------------------------------------------------
  tca_toxicity: {
    cpg: "A0723",
    title: "Tricyclic Antidepressant Toxicity",
    careObjectives: [
      "Management of tricyclic antidepressant (TCA) toxicity with Sodium Bicarbonate",
      "Supportive management of airway, perfusion, and seizures"
    ],
    management: [
      "Pathophysiology: TCAs block cardiac sodium channels → QRS widening. Sodium channel blockade → myocardial dysfunction and dysrhythmias. Alpha adrenergic blocking → hypotension. Anti-cholinergic effects",
      "Clinical features – Mild/Moderate: CNS sedation, tachycardia, anticholinergic toxidrome (sedation, mydriasis, warm dry skin, dry mouth, urinary retention, delirium, agitation)",
      "Clinical features – Severe: rapid sedation to coma, seizures; QRS widening and tachycardia (early) progressing to bradycardia and ventricular arrhythmias (late); respiratory depression/loss of airway; metabolic acidosis",
      "Onset of symptoms within 30–90 minutes. Ingestions > 10 mg/kg potentially toxic; > 20 mg/kg severe toxicity. In children, lethal with only a few tablets",
      "Sodium Bicarbonate 8.4%: maximum total 2 doses permitted (consult if remains symptomatic, or further doses if iSTAT available and pH measurable). iSTAT available: 1–2 mL/kg up to 100 mL IV every 3–5 min to max 6 mmol/kg; gently hyperventilate (pCO2 30–35) until pH 7.50–7.55",
      "QT prolongation: not an indication for Sodium Bicarbonate",
      "Seizures: usually self-limiting. Manage as per CPG A0703 AND administer Sodium Bicarbonate 8.4% 100 mL IV over 2 minutes. Prepare for intubation",
      "Cardiac arrest: mechanical CPR to closest ED (ECMO-capable facility preferred if travel times similar). Consult VPIC/ARV via AV Clinician",
      "Amiodarone is CONTRAINDICATED for arrhythmias in TCA toxicity",
      "Inadequate perfusion: IV Normal Saline concurrently with Sodium Bicarbonate, then metaraminol and/or noradrenaline if persists (adult only). Consult VPIC for < 16 years vasopressor approach",
      "Normal saline: reassess after 500–1000 mL or earlier if profoundly hypotensive"
    ],
    management_mica: [
      "Consider ETT as per CPG A0302 where patient unable to support airway and severe toxicity persists",
      "Prior to intubation: Sodium Bicarbonate 8.4% 100 mL IV over 2 minutes if two doses not already given, to limit acidosis",
      "Intubated and ventilated with severe TCA toxicity: target ETCO2 25–30 mmHg (hyperventilation recommended)",
      "Noradrenaline: do not bolus under any circumstance",
      "Adrenaline: third line vasopressor/inotrope only (after fluids, sodium bicarb, metaraminol and noradrenaline)"
    ],
    notes: "QRS widening = sodium channel blockade = sodium bicarb. Amiodarone CONTRAINDICATED. Metabolic acidosis worsens TCA toxicity - hyperventilate post-intubation. Consult VPIC for complex management."
  },

  // -----------------------------------------------------------
  // A0717 Beta-Blocker Toxicity
  // -----------------------------------------------------------
  beta_blocker_toxicity: {
    cpg: "A0717",
    title: "Beta-Blocker Toxicity",
    careObjectives: [
      "Targeted management of bradycardia and inadequate perfusion",
      "Early consultation with VPIC, particularly if co-ingestion with other medications, refractory hypotension, or arrhythmias",
      "Supportive management of hypoglycaemia and seizures"
    ],
    management: [
      "Pathophysiology: beta-blockers act on beta1/beta2 adrenoreceptors reducing HR and myocardial contraction. Toxicity → bradyarrhythmias and severe cardiovascular compromise",
      "Propranolol: sodium channel effects → QRS widening. Sotalol: potassium channel effects → QT prolongation",
      "Clinical features (all beta-blockers including sotalol and propranolol): bradycardia, hypotension, pulmonary oedema, heart blocks (1st, 2nd, 3rd degree), hypoglycaemia",
      "Sotalol: prolonged QT, Torsade des Pointes. Propranolol: widened QRS, ventricular arrhythmias, delirium, coma, seizures",
      "Beta blocker toxicity is potentially life-threatening – consult VPIC early",
      "Onset: usually 1–2 hours; may be delayed with modified release preparations",
      "Elderly, underlying cardiac disease, co-ingestion with cardiovascular medicines: at greater risk even with small doses. Propranolol and sotalol more toxic than others",
      "Bradycardia with inadequate perfusion: IV fluids and atropine. If symptoms persist, commence adrenaline. Administer atropine through free running IV line",
      "Adequate atropine response is NOT common in beta-blocker toxicity. Where patient initially responds to two doses of atropine but effect not sustained: repeat atropine 600 mcg as required (max total 3000 mcg)",
      "Pacing may be required if pharmacological chronotropy fails",
      "Consider transport to ECMO centre if severe cardiogenic shock or cardiac arrest – VPIC will advise"
    ],
    management_mica: [
      "Role of sodium bicarbonate in propranolol-induced QRS widening is unclear. Should not be the focus or delay use of inotropes. Consult VPIC first"
    ],
    notes: "Consult VPIC early - complex management. Atropine response often inadequate. Propranolol = QRS widening + CNS effects. Sotalol = QT prolongation + TdP. Consider ECMO centre in severe cases."
  },

  // -----------------------------------------------------------
  // A0718 Calcium Channel Blocker Toxicity
  // -----------------------------------------------------------
  ccb_toxicity: {
    cpg: "A0718",
    title: "Calcium Channel Blocker Toxicity",
    careObjectives: [
      "Targeted management of bradycardia and inadequate perfusion",
      "Early administration of calcium gluconate",
      "Early consultation with VPIC to guide management"
    ],
    management: [
      "Pathophysiology: CCBs block calcium channels → negative inotropy, negative chronotropy, vasodilation. Also inhibit insulin secretion → hyperglycaemia",
      "Non-dihydropyridine (verapamil and diltiazem): cardioselective – generally more toxic. Dihydropyridine (amlodipine, felodipine, lercanidipine, nifedipine, nimodipine): vasoselective",
      "Clinical features – all CCBs: hypotension, vasoplegia, shock; altered conscious state secondary to inadequate perfusion; hyperglycaemia, lactic acidosis; nausea, vomiting",
      "Verapamil and diltiazem: additionally bradycardia/bradyarrhythmias, first degree heart block, pulmonary oedema",
      "Ingestion 2–3 times usual dose may cause serious toxicity. More than 10 tablets can be life threatening. One tablet of diltiazem/verapamil SR can be fatal in children",
      "Onset: usually 1–2 hours; may be delayed in modified release preparations up to 12 hours",
      "Older age, co-existing cardiac disease, co-ingestion with cardiovascular medications increase risk",
      "CCB toxicity potentially life-threatening – consult VPIC early. Some preparations slow release – symptoms may be delayed up to 12 hours",
      "Inadequate and extremely poor perfusion: graduated approach including calcium, IV fluids and vasopressors/inotropes",
      "Atropine response: NOT common in CCB toxicity. Where patient initially responds to two doses but effect not sustained: repeat atropine 600 mcg as required (max 3000 mcg)",
      "Witnessed cardiac arrest: consult VPIC via AV Clinician to consider mechanical CPR to closest ED"
    ],
    management_mica: [],
    notes: "Consult VPIC early. Calcium gluconate is specific antidote. Hyperglycaemia is a feature (not a complication - CCBs inhibit insulin secretion). Verapamil/diltiazem most cardiotoxic. SR preparations delay onset up to 12 hours."
  },

  // -----------------------------------------------------------
  // A0709 Organophosphate Toxicity
  // -----------------------------------------------------------
  organophosphate_toxicity: {
    cpg: "A0709",
    title: "Organophosphate Toxicity",
    careObjectives: [
      "Recognise organophosphate toxicity / cholinergic toxidrome",
      "Ensure scene safety and provide decontamination where required",
      "Administer atropine and ensure sufficient supply"
    ],
    management: [
      "Scene safety: dynamic risk assessment. PPE. Consider potential deliberate act. Assess potential for multi-casualty event",
      "Pathophysiology: inhibit acetylcholinesterase → increased acetylcholine → cholinergic toxidrome",
      "Nicotinic effects: tachycardia, hypertension, muscle fasciculations, weakness, paralysis",
      "Muscarinic effects: SLUDGE (salivation, lacrimation, urination, defecation, GI distress, emesis), bronchorrhoea, bronchospasm, bradycardia, hypotension, miosis, diaphoresis",
      "CNS effects: confusion, agitation, seizures, coma",
      "Decontamination: remove contaminated clothing into plastic bag; wash skin with soap and water; isolate emesis in clinical waste bag; ensure ventilation; identify agent smell does not usually represent risk of secondary poisoning",
      "Antidote – Atropine: indicated when any muscarinic effects present. IV every 5 minutes, doubling previous dose every 5 minutes (e.g. 1200 mcg, 2400 mcg, 4800 mcg). Paediatric: same approach (e.g. 50 mcg/kg, 100 mcg/kg). Large doses may be required (up to 25 mg)",
      "Request support early to source further atropine supply",
      "Consult VPIC via AV Clinician if inadequate response",
      "Atropine infusion: usually required following adequate atropinisation at 10–20% of total atropine used per hour. Consult VPIC to establish appropriate infusion regimen",
      "Pralidoxime or Obidoxime may be available in some locations – consult VPIC. Not routinely used",
      "Inadequate perfusion: IV fluid concurrently with atropine. Vasopressors as per CPG A0705 Shock",
      "Seizures: ensure adequate atropinisation and oxygenation. If persistent/recurrent: treat as per CPG A0703",
      "All patients with organophosphate exposure require transport to ED"
    ],
    management_mica: [
      "Airway: monitor closely. If symptoms deteriorate beyond mild, ETT required. Administer atropine prior to intubation"
    ],
    notes: "SLUDGE + miosis + bronchorrhoea = cholinergic toxidrome. Atropine doubles every 5 min - no max dose. Large amounts required. Early scene decontamination. Consult VPIC for complex cases."
  },

  // -----------------------------------------------------------
  // A0720 Cyanide Toxicity
  // -----------------------------------------------------------
  cyanide_toxicity: {
    cpg: "A0720",
    title: "Cyanide Toxicity",
    careObjectives: [
      "Recognise cyanide toxicity",
      "Early administration of antidote (hydroxocobalamin)",
      "Provide perfusion support if necessary",
      "Transport to the nearest emergency department"
    ],
    management: [
      "Scene safety: dynamic risk assessment. PPE. Consider potential deliberate act. Assess potential for multi-casualty event",
      "Pathophysiology: cyanide blocks cellular oxygen use → intracellular hypoxia → anaerobic metabolism → lactate → intracellular acidosis → widespread cellular hypoxia, respiratory arrest and/or cardiac arrest. Lethal at 1 mg/kg. Onset within 30 minutes. Rapid deterioration thereafter",
      "Settings: industrial (combustion vapour/dust in mining, plastic manufacturing), scientific (electroplating, photography), house fires (inhalation of combustion vapour from plastics, polyurethane). Also stone fruit seeds (crushed), cassava root (incorrect preparation)",
      "House fires: consider and manage concurrent carbon monoxide poisoning",
      "Hydroxocobalamin (Cyanokit): binds to free cyanide ions, inactivating and allowing excretion in urine. NOT supplied by AV – may be available at high-risk environments. Always given IV. Early administration essential",
      "Cyanokit preparation: add 200 mL normal saline to vial using transfer spike; gently invert or rock (do not shake) for at least 60 seconds – solution becomes dark red; discard if particulate matter present or not dark red; administer via infusion set",
      "Adverse effects of hydroxocobalamin: anaphylaxis (rare), hypertension (possible), renal injury (possible), red/orange discolouration of body fluids and skin (may last 2–3 days)",
      "Other antidotes (sodium nitrite): not to be used without VPIC consultation"
    ],
    management_mica: [],
    notes: "Cyanide = cellular hypoxia despite adequate oxygenation. House fires = consider concurrent CO poisoning. Hydroxocobalamin = antidote (not AV-supplied, may be on scene). Red/orange discolouration of fluids is expected with hydroxocobalamin."
  },

  // -----------------------------------------------------------
  // A0719 Drug Induced Hyperthermia
  // -----------------------------------------------------------
  drug_induced_hyperthermia: {
    cpg: "A0719",
    title: "Drug Induced Hyperthermia",
    careObjectives: [
      "Early identification",
      "Control temperature – sedate, cool, hydrate",
      "Supportive care"
    ],
    management: [
      "Key features: hyperthermia, altered mental status, neuromuscular excitation (tremor, increased tone)",
      "Agents: amphetamines (ice, speed), cocaine, lithium, MAO inhibitors, MDMA, PCP, SNRIs, SSRIs, tramadol",
      "Severity: Mild – tremor, tachycardia, anxiety, hyperreflexia, dilated pupils, dry mouth, flushed skin. Moderate – agitation, increased muscle tone, tachycardia, hyperthermia < 39°C. Severe – hyperthermia ≥ 39°C, muscle rigidity, seizures, confusion, severe agitation",
      "Clonus may be present (inducible or sustained) – involuntary rhythmic muscle contraction",
      "Mild toxicity: monitor for deterioration, transport. Reduce stimulus – calming environment",
      "Moderate toxicity – Sedate with midazolam: reduces physical activity/agitation/muscle tremor/clonus contributing to dangerous temperature elevation. Physical restraints must NOT be applied without sedation – exertion while resisting restraint causes further temperature elevation",
      "Moderate toxicity – Cool: active and passive cooling essential (air conditioning, removal of clothing including shoes and socks). Use cold IV fluids where IV hydration indicated",
      "Moderate toxicity – Hydrate: administer cold IV fluid where available",
      "Severe toxicity: sedation and rapid cooling are care priorities. Cool in ice bath where available (e.g. music festivals). Intubation may be required to assist cooling or due to airway/ventilation compromise",
      "Occasionally ketamine may be required for patients displaying severe agitation as per CPG A0708. Ketamine does NOT treat serotonin toxicity. Midazolam should be administered once agitation controlled. Combined therapies likely require airway management",
      "Consultation: VPIC for complex presentations, diagnosis support or management advice"
    ],
    management_mica: [
      "Severe serotonin toxicity: RSI may be appropriate where neuromuscular paralysis is required to assist cooling"
    ],
    notes: "Midazolam = primary sedation (not droperidol). No physical restraint without sedation. Cold IV fluids. Ice bath if available for severe. MDMA/amphetamine/SSRIs/SNRIs = serotonin toxicity. Consult VPIC for complex cases."
  },

  // -----------------------------------------------------------
  // A0721 Quetiapine Toxicity
  // -----------------------------------------------------------
  quetiapine_toxicity: {
    cpg: "A0721",
    title: "Quetiapine Toxicity",
    careObjectives: [
      "Airway management",
      "Management of inadequate perfusion"
    ],
    management: [
      "Pathophysiology: second-generation antipsychotic. Anticholinergic properties. CNS depression and cardiovascular instability in large doses. Available as immediate-release and extended-release (XR). Most common brand: Seroquel",
      "Toxicity: dose dependent. Onset within 4 hours (standard release) up to 12 hours (modified release). Adults: > 3 g associated with greater risk severe CNS depression and hypotension (can occur at lower doses in naive patients). Paediatric: > 100 mg may be associated with severe toxicity. Coma may last > 72 hours following large ingestions",
      "Clinical features: CVS – tachycardia, peripheral vasodilation/hypotension; CNS – sedation (drowsiness to coma), seizures (rare); Respiratory – respiratory depression and/or loss of airway protection; Anticholinergic – delirium, urinary retention",
      "Supportive care is the mainstay of management",
      "Escalate care and notify receiving hospital early where toxic doses ingested, even when symptoms not (yet) severe",
      "Inadequate perfusion: IV fluids first line. Metaraminol or noradrenaline as first-line vasopressors if hypotension persists",
      "Adrenaline: precaution – may worsen hypotension due to possible beta-receptor mediated vasodilation. Only consider in consultation with VPIC when other therapies unsuccessful",
      "Cardiac arrest: administer adrenaline as per CPG A0201-1",
      "Consult AV Medical Advisor and VPIC via AV Clinician for paediatric patients with poor perfusion",
      "Seizures: usually self-limiting. Manage as per CPG A0703"
    ],
    management_mica: [],
    notes: "Supportive care. XR preparations delay onset up to 12 hours. Coma can last >72 hours. Adrenaline may worsen hypotension - avoid unless cardiac arrest or VPIC-directed. Metaraminol/noradrenaline preferred vasopressors."
  },

  // -----------------------------------------------------------
  // A0726 Acute Alcohol Intoxication
  // -----------------------------------------------------------
  alcohol_intoxication: {
    cpg: "A0726",
    title: "Acute Alcohol Intoxication (Ethanol)",
    careObjectives: [
      "Identify patients experiencing ethanol toxicity and the severity",
      "Protect and support patient dignity",
      "Manage symptoms as required",
      "Identify appropriate disposition: Low-moderate risk – self-care or sobering services; High risk – transport to ED"
    ],
    management: [
      "Acute alcohol intoxication causes rapid-onset, dose-related CNS depression. Large quantities can be life-threatening due to aspiration and/or respiratory depression, especially with co-ingested CNS depressants",
      "People presenting with alcohol intoxication are at high risk of unconscious bias and stigma. Comprehensive examination is crucial to exclude undetected critical illness masked by intoxication",
      "Differential diagnoses to exclude: seizure/postictal, hypoglycaemia, hypoxia, co-ingestion, withdrawal syndrome, head trauma, infection/sepsis, psychiatric, stroke/TIA, Wernicke encephalopathy",
      "Wernicke encephalopathy: acute neurological emergency from severe thiamine deficiency. Suspect in chronic alcohol users with: acute altered mental status or memory deficit, disordered eye movements (nystagmus), ataxic gait",
      "AUDIT-C screening tool: Males ≥ 4 = alcohol misuse; Females ≥ 3 = alcohol misuse",
      "Airway: basic airway support or lateral positioning. Advanced airway rarely required unless simple manoeuvres cannot address airway/breathing compromise",
      "Hypotension: usually responds to fluid. Manage as per CPG A0705 Shock",
      "Nausea/vomiting: antiemetic as per CPG A0701. Avoid IV in low/moderate risk patients unless unable to tolerate oral",
      "Hypoglycaemia: manage as per CPG A0702. Avoid glucagon in chronic alcohol users (may suppress gluconeogenesis and glycogen stores depleted)",
      "Low risk: self-care advice – no more alcohol, lateral position, warm, hydrated, paracetamol for mild pain. Safety netting: competent sober adult present",
      "Moderate risk: consider sobering service (contact prior to transport to confirm acceptance) or ED if any doubt",
      "High risk: transport to hospital. Ongoing symptom management and escalate as required"
    ],
    management_mica: [],
    notes: "Exclude other causes before attributing purely to alcohol. Wernicke risk with chronic use. AUDIT-C scores guide alcohol misuse. Avoid glucagon in chronic users. Consider sobering service for moderate risk."
  },

  // -----------------------------------------------------------
  // A0727 Alcohol Withdrawal Syndrome
  // -----------------------------------------------------------
  alcohol_withdrawal: {
    cpg: "A0727",
    title: "Alcohol Withdrawal Syndrome",
    careObjectives: [
      "Identify patients experiencing alcohol withdrawal and assess severity",
      "Symptomatic management",
      "Reduce risk of progression to severe alcohol withdrawal",
      "Identify appropriate disposition: Mild/moderate without complex features – community-based management; Moderate with complex features or severe – paramedic transport to ED"
    ],
    management: [
      "Alcohol withdrawal typically occurs 6–24 hours after last drink or following severe reduction. Patient may experience withdrawal despite appearing clinically intoxicated if regular consumption is high",
      "Symptoms peak 36–72 hours, subsiding within 5–7 days (aside from severe withdrawal)",
      "AWS (Alcohol Withdrawal Scale) – Mild: < 5; Moderate: 5–14; Severe: > 14",
      "Physical exam required to exclude: infections (especially if febrile), hyperthyroidism, withdrawal from other sedating substances",
      "Features increasing likelihood of complex withdrawal: seizure during current episode; history of alcohol withdrawal delirium or seizure; previous withdrawal episodes; age > 65; co-occurring illness (especially TBI); long duration heavy alcohol use; concomitant other substances; psychiatric disorder",
      "Benzodiazepines: preferred option for significant distress/agitation. Goal: rousable drowsiness (SAT 0 or -1). Heavy sedation (SAT -2 or -3) should be avoided",
      "IV midazolam strongly preferred. IM acceptable for severe withdrawal and Delirium Tremens where IV access challenging",
      "Benzodiazepines should only commence in patients with moderate AWS following consultation with VVED and/or Drug and Alcohol Clinical Advisory Service (DACAS)",
      "Severe AWS: paramedics empowered to commence benzodiazepines. Contact DACAS if any doubt about dosing",
      "Mild AWS: referral to GP or VVED. Self-care: low stimulation environment, non-caffeinated fluids, normal diet, multivitamin, oral thiamine 100 mg PO three times per day, paracetamol for mild pain",
      "Safety netting: call 000 or attend ED if agitation/tremor not resolving, more severe symptoms develop, existing conditions worsen, or patient appears over-sedated"
    ],
    management_mica: [],
    notes: "AWS scale guides severity. Benzodiazepines for moderate-severe. Consult VVED/DACAS before commencing in moderate. IV midazolam preferred. Self-care oral thiamine for mild. Features of complex withdrawal = transport to ED."
  },

  // -----------------------------------------------------------
  // M0101-1 The Maternity Patient
  // -----------------------------------------------------------
  maternity_patient: {
    cpg: "M0101-1",
    title: "The Maternity Patient",
    careObjectives: [
      "Assessment and safe management of the pregnant patient",
      "Prioritise assessment and resuscitation of the mother – welfare of the fetus is optimised by providing best available care to the mother"
    ],
    management: [
      "Term: 37–42 weeks. Preterm: 23–< 37 weeks. Imminent birth: active pushing/grunting, rectal pressure, anal pouting/bulging perineum, unstoppable urge to push, presenting part on view (crowning), mother states 'I am going to have the baby'",
      "Normal pregnancy HR: 80–110 bpm. BP: significant if SBP > 170 mmHg or DBP > 110 mmHg. Cardiac output ↑ by 30–40%. Blood volume ↑ 30–50% (5500 mL at term)",
      "Position if > 20 weeks pregnant: allow position of comfort. If supine, left lateral tilt to reduce aorta-caval compression. 30° tilt (wedge under right hip) can significantly improve BP. If spinal immobilisation required: 15° tilt as entire unit",
      "Supplemental O2: to maintain SpO2 > 94%",
      "IV access: early access required in emergencies. Mother may lose 30–35% (2 L) circulating blood volume before showing signs of shock/hypotension. Fetus may be compromised even when mother appears stable",
      "Stabilisation: assessment and resuscitation of mother takes priority",
      "Trauma: fetal morbidity/mortality can occur with seemingly minor blunt trauma. All injured pregnant women should have obstetric assessment due to placental abruption risk. Even minor injuries may be associated with feto-maternal haemorrhage",
      "Contact PIPER 24/7 via Clinician or on 1300 137 650 if any doubt about maternity CPG application"
    ],
    management_mica: [],
    notes: "Left lateral tilt > 20 weeks to prevent aorto-caval compression. High compensatory capacity - significant haemorrhage before signs of shock. Fetus may deteriorate even when mother appears stable. PIPER = 1300 137 650."
  },

  // -----------------------------------------------------------
  // M0202 Pre-eclampsia / Eclampsia
  // -----------------------------------------------------------
  preeclampsia_eclampsia: {
    cpg: "M0202",
    title: "Pre-eclampsia / Eclampsia",
    careObjectives: [
      "Time critical emergency requiring early recognition, intervention and prompt transport to reduce perinatal and maternal mortality"
    ],
    management: [
      "Signs and symptoms of pre-eclampsia: headache; cerebral irritability/agitation; visual disturbances (flashing lights, shimmering); nausea/vomiting; heartburn/epigastric or abdominal pain; hyper-reflexia. An elevation of 20 mmHg above normal BP may be sufficient if other signs/symptoms present",
      "Uterine pain and/or PV bleeding may signify abruption",
      "Most common cause of seizures in pregnancy: pre-existing epilepsy. New onset seizures in latter half of pregnancy: most commonly eclampsia",
      "Seizures may occur during or post birth, usually within 48 hours of birth. There are no reliable clinical indicators to predict eclampsia",
      "Eclamptic seizures usually do not last longer than 90 seconds and are self-limiting",
      "The only definitive treatment is birth of the baby",
      "Provide early hospital notification. Contact PIPER via Clinician or on 1300 137 650",
      "IHT Nifedipine: initial hospital dose 10 mg oral, repeated after 30 minutes if inadequate response"
    ],
    management_mica: [
      "IHT – IV Magnesium Sulphate: loading doses and infusions should be established prior to transport. Indicated for severe pre-eclampsia and seizure prophylaxis. Loading dose 4 g IV over 10–15 minutes (or IM). Maintenance infusion usually 1 g/hr (4 mmol/hr) until at least 24 hours post delivery or last seizure. Via dedicated line with controlled infusion device and ECG monitoring",
      "IHT – IV Labetalol: initial IV bolus 20 mg over 2 minutes. Repeat every 10 minutes until optimal BP or max 300 mg. Alternatively 20–160 mg/hr infusion",
      "IHT – IV Hydralazine: initial IV bolus 5–10 mg over 5–10 minutes. Repeat twice at 30 minute intervals. Maintenance infusion 5 mg/hr. Target BP 140–160/90–100 mmHg. Do not lower below 140/80 mmHg"
    ],
    notes: "Visual disturbances + headache + hypertension = pre-eclampsia until proven otherwise. New seizure in second half of pregnancy = eclampsia. Self-limiting seizures. Definitive treatment = birth. Magnesium sulphate for seizure prophylaxis (MICA IHT). PIPER for advice."
  },

  // -----------------------------------------------------------
  // M0301 Normal Birth
  // -----------------------------------------------------------
  normal_birth: {
    cpg: "M0301",
    title: "Normal Birth",
    careObjectives: [
      "Safe management of normal out-of-hospital birth"
    ],
    management: [
      "Prepare environment: warm room, clean flat surface, towels/blankets, cord clamp/tie, suction equipment",
      "Imminent birth: allow mother to adopt comfortable position. Encourage controlled pushing with contractions",
      "Crowning: support perineum gently. Allow head to deliver slowly between contractions. Do not pull",
      "Nuchal cord: if cord loose around neck, slip over head. If tight, may need to clamp and cut before delivering body",
      "Delivery of shoulders: gentle downward traction on head to deliver anterior shoulder; upward traction to deliver posterior shoulder",
      "Dry, warm and stimulate newborn immediately. Assess breathing and muscle tone",
      "Delayed cord clamping: wait until cord stops pulsating (approximately 1–2 minutes) unless resuscitation required",
      "Third stage: delivery of placenta – do not pull on cord. Fundal massage only if uterus is NOT firm/contracted",
      "Contact PIPER via Clinician or 1300 137 650 for advice as required",
      "Manage newborn as per CPG N0101 and N0201 if resuscitation required"
    ],
    management_mica: [],
    notes: "Hands-off approach for delivery. Do not pull baby. Delayed cord clamping preferred unless resuscitation needed. Fundal massage only if uterus not contracted. PIPER for complications."
  },

  // -----------------------------------------------------------
  // M0302 Breech / Compound Presentation
  // -----------------------------------------------------------
  breech_birth: {
    cpg: "M0302",
    title: "Breech / Compound Presentation",
    careObjectives: [
      "Safe management of breech or compound presentation birth"
    ],
    management: [
      "Types: Frank breech (buttocks first, hips flexed, legs extended – most common, ½ of all breech). Complete breech (buttocks first, hips and knees flexed). Footling (one or both feet present)",
      "Meconium passage is normal as buttocks squeezed. Cord prolapse is more common with breech",
      "If known breech and birth not imminent: transport to booked obstetric unit with surgical capacity. Provide early hospital notification",
      "Precipitous delivery with back not uppermost: consider positioning mother kneeling on all fours",
      "Position mother with buttocks to bed edge, legs supported (lithotomy position). Standing or squatting more physiologically sound but not suited to transport",
      "Hands-off approach: encourages baby to maintain flexion. Only touch to gently support. Too much stimulus causes baby to extend flexed head",
      "Main force of birth is maternal effort. DO NOT attempt to pull baby out. Allow birth to occur spontaneously with minimal handling",
      "Most additional manoeuvres only required in event of delay",
      "Prevent hypothermia: warm environment. Warm towels or bubble wrap if body exposed for extended period. Cool air may stimulate breathing if head remains unborn",
      "Contact PIPER via Clinician or 1300 137 650 for advice"
    ],
    management_mica: [],
    notes: "Hands-off approach. Do not pull. Position = lithotomy. Cool air can stimulate breathing before head delivered. Cord prolapse risk higher with breech. PIPER for complex cases."
  },

  // -----------------------------------------------------------
  // M0304 Cord Prolapse
  // -----------------------------------------------------------
  cord_prolapse: {
    cpg: "M0304",
    title: "Cord Prolapse",
    careObjectives: [
      "Time critical emergency – early diagnosis, immediate intervention and prompt transport to reduce perinatal mortality"
    ],
    management: [
      "Notify receiving hospital early",
      "In most instances caesarean section is the preferred method of birth. If birth is imminent: encourage mother to push ONLY when presenting part is distending the perineum and mother is pushing uncontrollably. Prepare for newborn resuscitation as per CPG N0201",
      "Cord prolapse usually associated with unstable lie or malpresentation",
      "Cord handling should be kept to a minimum – can lead to vasospasm or contraction of umbilical vessels",
      "Key history: time membranes ruptured, how long cord visible, due date, fetal movement, onset of labour, contractions, fetal presentation if known, PV bleeding",
      "Contact PIPER via Clinician or 1300 137 650 for advice"
    ],
    management_mica: [],
    notes: "Time critical. Minimise cord handling. C-section destination. Push only if birth imminent. PIPER immediately."
  },

  // -----------------------------------------------------------
  // M0305 Shoulder Dystocia
  // -----------------------------------------------------------
  shoulder_dystocia: {
    cpg: "M0305",
    title: "Shoulder Dystocia",
    careObjectives: [
      "Time critical – 5–7 minutes to deliver baby due to cord compression against pelvic rim"
    ],
    management: [
      "Explain situation to mother to gain maximum co-operation",
      "Document times: birth of head, timing of manoeuvres, delivery of body",
      "Newborn likely to be compromised and require resuscitation. Prepare for resuscitation",
      "Be prepared for sudden release of resistance – be ready to take hold of baby",
      "Process of releasing baby may cause injury, particularly clavicle fracture. Manage appropriately including arm immobilisation",
      "If manoeuvres not successful: consult PIPER regarding when to abandon attempts to deliver and initiate transport",
      "Contact PIPER via Clinician or 1300 137 650 for advice"
    ],
    management_mica: [],
    notes: "5-7 minute window. Prepare for newborn resuscitation. HELPERR manoeuvres (per PIPER guidance). If unsuccessful - consult PIPER about transport vs continued attempts."
  },

  // -----------------------------------------------------------
  // N0101 The Newborn Baby
  // -----------------------------------------------------------
  the_newborn: {
    cpg: "N0101",
    title: "The Newborn Baby",
    careObjectives: [
      "Initial assessment and management of the newborn baby"
    ],
    management: [
      "Normal values: weight average 3.5 kg; blood volume 80 mL/kg; HR 110–170; RR 25–60; temperature 36.5–37.5°C; BGL 2.6–3.2 mmol/L",
      "Targeted SpO2 post birth: 1 min 60–70%; 3 mins 70–90%; 5 mins 80–90%; 7–10 mins > 90%. Pulse oximeter on right wrist/hand (pre-ductal)",
      "Appearance: dusky and peripherally cyanosed in first few minutes is normal. Blue-ish/purple hands and feet normal in first 24 hours. Supplemental oxygen generally not required if breathing effectively and HR > 100",
      "Vigorous newborn: dry and place naked skin-to-skin on mother's chest. Dry head and apply beanie. Cover both with warm blankets/towels",
      "Resuscitation required: place on warm flat surface. Dry head, apply beanie, ensure warm environment. Bubble wrap over body. Chemical self-warming blankets must NOT be used to warm neonates",
      "Preterm (32–42 wks): skin-to-skin on mother, simultaneously dry, cover with towels/blanket or bubble wrap, apply beanie",
      "Very preterm (< 32 wks), witnessed: leave wet (fluid is warm). Straight into polyethylene bag with hole pre-cut for head, dry head, apply beanie",
      "Very preterm (< 32 wks), unwitnessed: dry (fluid now cold), place in polyethylene bag with hole pre-cut for head, apply beanie",
      "Suction: NOT routine in vigorous newborns even with meconium stained fluid. Only when airway obstruction suspected",
      "Cord clamping – vigorous: not urgent, wait until cord stops pulsating (~1–2 minutes). Cord clamping – non-vigorous: may cut earlier to facilitate resuscitation if cord impedes access",
      "APGAR at 1 and 5 minutes, then every 5 minutes until > 7. Not to be used as guide for resuscitation",
      "Treat as per CPG N0201 if newborn does not rapidly develop effective respirations and good tone after drying/stimulating, or if deteriorates at any stage"
    ],
    management_mica: [],
    notes: "Skin-to-skin for vigorous newborn. Polyethylene bag for very preterm (<32 wks). SpO2 norms are LOW at birth - targets increase over first 10 min. APGAR not a resuscitation guide. Routine suction not recommended."
  },

  // -----------------------------------------------------------
  // N0201 Newborn Resuscitation
  // -----------------------------------------------------------
  newborn_resuscitation: {
    cpg: "N0201",
    title: "Newborn Resuscitation",
    careObjectives: [
      "Temperature: maintain normothermia",
      "Ventilation: establish and maintain effective ventilation",
      "Escalation of care: seek early backup, expert advice and ensure transport to appropriate facility"
    ],
    management: [
      "Ventilation and temperature are the most important principles. Other elements (supplemental O2, IV access, adrenaline) are not as important and unlikely to add value if they come at the expense of ventilation and temperature",
      "Escalation: newborn resuscitation is complex, high acuity, low occurrence. Early PIPER backup is essential",
      "Initial assessment: adequacy of breathing (regular spontaneous breathing within 15–30 seconds with stimulation) and muscle tone (moving all limbs, flexed posture)",
      "Good muscle tone and adequate breathing: unlikely to need resuscitation",
      "Inadequate breathing or poor muscle tone: position in resuscitation area; place airway in neutral position (folded towel under shoulders); continue drying and stimulation",
      "If poor tone or inadequate breathing clearly persist: no need to delay initiating resuscitation to auscultate HR. Proceed directly to IPPV",
      "PPV: initiate within first 60 seconds in non-vigorous newborn. Correctly sized facemask. OPAs not for routine use",
      "Heart rate increase > 100 bpm is the most important indicator of adequate ventilation",
      "If HR does not increase: most likely cause is inadequate ventilation. Focus on troubleshooting BVM, then progress to SGA or ETT if unsuccessful",
      "CPR: 3:1 compression to ventilation ratio. 90 compressions and 30 ventilations per minute (120 events/min) with 0.5 second pause for ventilation. Compression depth approximately 1/3 chest depth",
      "Two thumb, hand encircling technique preferred for CPR. Two-finger technique if tibial IO insertion required",
      "Single rescuer: focus on effective PPV until backup arrives. 3:1 ratio as single operator unlikely to be effective",
      "Shockable rhythms extremely rare in newborns. If observed: multifunction electrode pads, defibrillate in manual mode using 4 J/kg at 2-minute intervals",
      "Pulse oximetry: attach to right hand or right wrist (pre-ductal). See CPG N0101 for normal SpO2 values",
      "Withhold resuscitation: < 22 weeks gestation – no possibility of successful resuscitation. Any doubt about gestation: attempt resuscitation and consult PIPER",
      "Legal requirement: any infant ≥ 20 weeks gestation OR ≥ 400 g birth weight OR showing signs of life must be registered, regardless of gestation"
    ],
    management_mica: [
      "Advanced airway: EMMA capnograph with infant airway adaptor required for neonates. Both monitor and EMMA must be used to confirm placement",
      "ETT sizes: extremely preterm < 1 kg (< 28 wks) – 2.5 mm, lip length 6–7 cm; moderately preterm 1–3 kg (28–34 wks) – 3.0 mm, lip length 7–9 cm; term/near term > 3 kg (≥ 35 wks) – 3.5 mm, lip length 9–10 cm"
    ],
    notes: "Ventilation and warmth = highest priorities. HR rise = best indicator of adequate ventilation. 3:1 CPR ratio. PPV within 60 seconds. PIPER early. Do not resuscitate < 22 weeks. EMMA infant adaptor essential for MICA intubation."
  }

};

// Export for use in application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.cpgPackages;
}
