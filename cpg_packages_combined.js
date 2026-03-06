/**
 * AV CPG CLINICAL PACKAGES - REBUILT EDITION
 * Source: ALS-MICA Clinical Practice Guidelines v3.13.1 (December 2025)
 * Rebuilt: March 2026
 *
 * ============================================================
 * ⚠️  CRITICAL WARNING TO ALL AI MODELS — READ BEFORE MODIFYING
 * ============================================================
 *
 * This file contains clinical content used in paramedic training.
 * Errors in clinical content can directly harm patients.
 *
 * THE FOLLOWING FIELDS MUST NEVER BE MODIFIED, ADDED TO, OR INFERRED
 * UNLESS TIM EXPLICITLY AND SPECIFICALLY REQUESTS IT:
 *
 *   - careObjectives[]    — verbatim from CPG Care Objectives section
 *   - management[]        — verbatim ALS-scope steps from CPG
 *   - management_mica[]   — verbatim MICA-scope steps from CPG
 *
 * "VERBATIM" MEANS:
 *   - Copied directly from ALS-MICA-CPG-December-2025.pdf
 *   - No paraphrasing, summarising, or rewriting
 *   - No adding steps that seem clinically reasonable but are not in the CPG
 *   - No inferring management from differentials, pathophysiology, or drug names
 *   - No filling gaps based on clinical knowledge or training data
 *
 * PREVIOUS AI ERRORS TO LEARN FROM:
 *   - A thiamine administration step was added to a Wernicke encephalopathy
 *     package based on clinical inference — it was NOT in the source CPG.
 *     This type of error is the exact problem this warning exists to prevent.
 *
 * THE ONLY FIELD THAT MAY CONTAIN NON-CPG TEXT:
 *   - notes: (used for AI scenario generation context only, not displayed to users)
 *
 * IF ASKED TO UPDATE CLINICAL CONTENT:
 *   - Ask Tim to confirm the specific CPG version and page reference
 *   - Only make the change he describes — do not add anything else
 *   - Do not "improve" adjacent steps while you are there
 *
 * ============================================================
 *
 * STRUCTURE:
 *   cpg:              CPG reference number (e.g. "A0601")
 *   title:            Full CPG title
 *   careObjectives:   Verbatim from Care Objectives section
 *   management:       ALS-scope management steps, verbatim
 *   management_mica:  MICA-only steps, verbatim
 *   notes:            AI context summary only — not CPG text, not displayed to users
 */

// ============================================================
// AV CPG CLINICAL PACKAGES - Version 3.13.1 (December 2025)
// Rebuilt from ALS-MICA-CPG-December-2025.pdf
// ============================================================

const CPG_PACKAGES = {

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
      "CPR: 100–120 compressions/min, ≥5 cm depth, full recoil. 30:2 ratio (no advanced airway); continuous with ETT/SGA in situ.",
      "2-minute compressor rotations. Minimise interruptions to ≤3 seconds.",
      "Defibrillation: first shock ≤2 minutes from arrival. Pad placement: sternal right chest below clavicle; apex left mid-axillary 6th ICS.",
      "Airway: SGA appropriate initially for continuous compressions. ETT should not interrupt compressions.",
      "Adrenaline 1 mg IV/IO — shockable: after 2nd shock, then 3rd, 5th, 7th, 9th shock. Non-shockable: as soon as resources allow without interrupting HP-CPR.",
      "Amiodarone 300 mg IV/IO after 3rd shock (refractory VF/VT); 150 mg after 5th shock. Compatible with D5W only. C/I in TCA toxicity, QTc >500ms.",
      "Lidocaine: alternative to amiodarone if not available.",
      "Fluids — shockable rhythms: limit to medication flush and TKVO only.",
      "Capnography: ETCO2 as surrogate for CPR quality. Gradual fall = CPR fatigue; sudden rise = ROSC.",
      "ECMO eligibility: age 16–70, suspected cardiac cause, witnessed arrest, initial rhythm VF/VT, collapse-to-ED <60 min achievable. Centres: Alfred (24/7), Austin, Box Hill, Royal Melbourne, St Vincent's, Victorian Heart Hospital, Geelong."
    ],
    management_mica: [
      "Ventricular assist devices (VAD) — Anterior-posterior pad placement if possible: — Apex pad: Left anterior chest wall, halfway between the xiphoid process and the left nipple. — Sternal pad: To the left of the spine and below the scapula. — Do not disconnect the pump. — Contact the Alfred Hospital Heart Failure Registrar or Consultant via the AV Clinician as soon as possible. — Patients with a VAD do not generally have a palpable pulse. Pulse checks cannot be used to diagnose cardiac arrest or ROSC. Interfering CPR-induced consciousness (CPRIC)",
      "Where any of the following are present: — Interference with CPR — Gag reflex is present preventing adequate oxygenation / ventilation or SGA / ETT insertion — Suspected awareness / pain / combative movements interrupting resuscitation",
      "Administer: — Ketamine 50 – 100 mg IV every 1-2 minutes (no max. dose). — No IV access: Ketamine 200 mg IM (single dose). — Consider Rocuronium 150 mg IV to facilitate intubation if unable to provide adequate oxygenation / ventilation following at least 1.5 mg / kg IV Ketamine.",
      "Thrombolysis should only be considered if there are sufficient resources at the scene to continue HP- CPR for up to 60 minutes post administration of thrombolysis."
    ],
    notes: "HP-CPR priority. ALS: adrenaline after 2nd shock (VF/VT) or ASAP (PEA/asystole). Antiarrhythmics for refractory VF/VT after 3 shocks. ECMO transport if eligible. Special: pregnant (uterine displacement), hypothermia <30°C (double drug intervals), tension pneumothorax, hyperkalaemia (confirmed only)."
  },

  traumatic_cardiac_arrest: {
    cpg: "A0201-2",
    title: "Traumatic Cardiac Arrest",
    careObjectives: [
      "Major haemorrhage control over all other interventions",
      "Management of correctable causes in order of clinical need: — Hypoxia — Tension pneumothorax — Hypovolaemia",
      "Standard cardiac arrest management concurrent to addressing correctable causes (if resources permit)"
    ],
    management: [
      "The potential causes of cardiac arrest should be managed in order of clinical need.",
      "Treating correctable causes should be prioritised over standard cardiac arrest care (chest compressions and adrenaline).",
      "Uncertain cause: in the absence of a clear cause, or where it is probable there are multiple causes, it is reasonable to apply all interventions in the CPG in the order presented (i.e. haemorrhage control, airway, breathing, circulation). This is likely to be the most common type of traumatic arrest. If resources permit, multiple interventions should be performed concurrently including standard cardiac arrest care.",
      "Obvious causes: Where there is a clear etiology (e.g. amputation), it is not mandatory to provide all interventions in this CPG (e.g. chest decompression). In cases of witnessed traumatic arrest, prioritise treatment to address the most likely cause first. If there is any doubt as to the cause, all interventions should be provided. Standard medical arrest Chest compressions are not likely to be effective in the setting of hypoxia, tension pneumothorax and severe hypovolaemia. As such they are not the priority. However, there is no requirement that standard cardiac arrest care be delayed until correctable causes have been addressed. Ideally, haemorrhage control, airway management, chest decompression, fluid resuscitation, chest compressions and adrenaline should be delivered simultaneously.",
      "Where clear signs of prolonged cardiac arrest are present or continued resuscitation may be futile, Major haemorrhage",
      "Control of major haemorrhage is the absolute priority in all circumstances. It can be achieved with: — Arterial tourniquets — Haemostatic dressings / wound packing — Direct pressure",
      "Undifferentiated blunt trauma: A pelvic splint should be applied after other interventions.",
      "Where pelvic fracture is clearly contributing to cardiac arrest, a pelvic splint may be applied earlier. Blood components",
      "Where available, Packed Red Blood Cells (PRBC) are preferred for fluid resuscitation over normal saline.",
      "MICA paramedics credentialed in blood component administration may administer PRBC.",
      "Legal minor: PRBC must only be administered to a child < 18 years if: — A parent / legal guardian can be contacted and the parent / legal guardian consents to the administration of a blood transfusion. OR — A medical doctor approves administration (preferably AV Medical Advisor via the AV Clinician or RCH)",
      "Religious objection: PRBC must not be administered to a patient with a known religious objection to blood transfusion (e.g. Jehovah’s Witness) and who refuses consent. Chest decompression",
      "Perform needle thoracostomy if finger thoracostomy is delayed or not available. Ultrasound",
      "Where all correctible causes have been addressed, focused assessment with sonography for trauma may be considered (where credentialled) to: — Assess cardiac wall motion and identify patients with a low flow state (low cardiac output). — Assess for cardiac tamponade. — Ensure correctible causes have been adequately managed (e.g. tension pneumothorax). Perfusion assessment",
      "ETCO can be used as a surrogate marker for cardiac output and may assist in identifying patients 2 with a low flow state. Return of Spontaneous Circulation Special circumstances Penetrating truncal trauma and PEA",
      "Where a Major Trauma Service is within 20 minutes from loss of vital signs: — Immediately transport Signal 1 with early notification. — Do not stop to manage the patient if they lose vital signs en-route to hospital. Provide an updated notification to hospital and continue Signal 1. — Only perform limited interventions: haemorrhage control, basic airway management (+/- SGA) and chest decompression. — Chest compressions are not required during transport. — Do not delay for MICA, mCPR, IV or ETT insertion.",
      "Release tension pneumothorax",
      "Allow direct control of intrathoracic haemorrhage Severe crush injury Cardiac Arrest - “Hyperkalaemia”: — Calcium gluconate 10% 6.6 mmol (3 g) IV (slow push) — Sodium bicarbonate 8.4% 100 mL IV"
    ],
    management_mica: [
      "Finger thoracostomy is the preferred method for chest decompression (where credentialed).",
      "Provide surgical relief of cardiac tamponade"
    ],
    notes: "Correctable causes priority over CPR: haemorrhage → hypoxia → tension pneumothorax → hypovolaemia. PRBC preferred over NS (MICA credentialled). Penetrating truncal PEA within 20 min MTS: transport immediately, minimal interventions only."
  },

  rosc_management: {
    cpg: "A0202",
    title: "ROSC Management",
    careObjectives: [],
    management: [
      "Excessive fluid administration during the intra-arrest and post-ROSC period may be detrimental. Judicious administration of fluid may be especially important in VF/ VT. The total volume of fluid administered during cardiac arrest and post-ROSC management, including RSI, should not exceed 20 mL/kg unless correcting suspected hypovolaemia.",
      "Where the cause of arrest is unclear, paramedics should assume a cardiac cause and transport to a PCI capable facility where possible."
    ],
    management_mica: [
      "Where resources allow and other priorities have been addressed, BGL should be measured post The extremely combative patient",
      "Severe post-ROSC agitation / combativeness that is obstructing further care (e.g. oxygenation and ventilation in preparation for RSI) may be sedated using the following dose regimen: — Ketamine 50 – 100 mg IV every 1-2 minutes (no max. dose). — No IV access: Ketamine 200 mg IM (single dose). — Consider the patient’s weight and severity of symptoms to determine dose. — Consider a half dose if the patient is shocked. Flowchart"
    ],
    notes: "Total fluids ≤20 mL/kg (arrest + post-ROSC). Assume cardiac cause unless clear otherwise — transport to PCI facility. Check BGL post-ROSC. Combative post-ROSC: ketamine 50–100 mg IV (preparation for RSI/MICA)."
  },

  withholding_ceasing_resuscitation: {
    cpg: "A0203-1",
    title: "Withholding or Ceasing Resuscitation",
    careObjectives: [
      "Identify patients who will not benefit from resuscitation or where there is a legal requirement to withhold resuscitation",
      "Provide guidance for the cessation of resuscitation following an unsuccessful resuscitation attempt"
    ],
    management: [
      "Where it is unclear whether to withhold resuscitation, commence resuscitation while continuing to gather information through history taking, reviewing medical documentation (if available), and visual observations. Obvious death",
      "Obvious death is characterised by any of the following: — Injuries where survival is impossible (e.g. decapitation, incineration, cranial destruction, hemicorporectomy) — Rigor mortis — Postmortem lividity — Putrefaction / decomposition — Death that has been declared by a doctor who is or was at the scene Advance Care Directives",
      "Paramedics have a legal obligation and duty of care to act in accordance with an Advance Care Directive (ACD) or the decisions of a medical treatment decision maker.",
      "A paramedic may provide or withhold treatment based upon the patient’s wishes as recorded on an ACD that is sighted by them, or paramedics may accept, in good faith, the advice from those present at the scene of the patient’s wishes and that this supporting documentation exists.",
      "A patient's ACD must be followed even where the emergency is not directly related to a pre-existing illness. If the person’s wishes are unknown or there is doubt about the documentation or its existence, paramedics are to provide routine care.",
      "Please note: The law permits provision of medical treatment in an emergency (e.g. resuscitation), without consent, to a person who does not have decision-making capacity. Emergency treatment should not be delayed while searching for an ACD (or a medical treatment decision maker), but a health practitioner must comply with a known ACD. Except in circumstances where: — The ACD instructs a health care professional to provide medically futile or unethical treatment, or — The ACD instructs a health care professional to take action(s) that would go against their code of conduct, or — The ACD cannot be readily and confidently understood and applied by the health care professional. For",
      "Less than 1% of patients presenting to paramedics in an asystolic or agonal rhythm survive to hospital discharge. Resuscitation should only be commenced on this patient cohort if they have received prior defibrillation or are known to have a bystander witnessed collapse AND paramedics begin resuscitative attempts within 10 minutes of that collapse, or a paramedic witnessed arrest.",
      "Bystander CPR and/or normal temperature is not associated with increased survival in patients with asystolic or agonal rhythms and is not a compelling reason to commence or continue resuscitation.",
      "Patients who initially present to AV in asystole following traumatic cardiac arrest not witnessed by paramedics have a 0% survival rate. Commencing resuscitation is not indicated. Initial presenting rhythm",
      "“Initial presenting rhythm” refers to the results of the first rhythm analysis conducted on the patient, regardless of provider (i.e. including public access defibrillation, EMR, etc.). If a patient has received defibrillation prior to AV arrival, the patient is assumed to have presented in VF / VT.",
      "Where patients present with Pulseless Electrical Activity (PEA), a heart rate < 20 is considered to be an agonal rhythm.",
      "The duration of resuscitation should be based on the initial rhythm rather than the rhythm the patient is presenting in at the time of deciding to cease resuscitation. Expected death",
      "Patients who are at or near end-of-life are unlikely to benefit from resuscitation or life prolonging measures. In this patient cohort the risk of potential harm and suffering outweighs any chances of meaningful survival.",
      "Withhold resuscitation where the death was expected due to the progression of a specific, advanced incurable disease. There will often be a period of deterioration in the days or weeks leading up to death.",
      "Some patients may not have an ACD in place or the family may be unsure of the details.",
      "Consider consulting the AV Medical Advisor via the AV Clinician if there is uncertainty around the decision to withhold resuscitation (e.g. there are differences of opinion in a family around the patient’s treatment).",
      "Patients with significant functional decline and frailty or severe, life limiting co-morbidities may not meet the criteria for expected death or other criteria to withhold resuscitation. — In this circumstance, early cessation of resuscitation may be considered in consultation with the AV Medical Advisor via the AV Clinician. This is considered separately to frail patients where a medical treatment decision maker is available at scene to make an informed decision on behalf of the patient.",
      "Patients with significant frailty or severe comorbidity rarely recover from cardiac arrest. This includes patients who are dependent on others for personal care (frailty score ≥ 7) or comorbidities such as severe COPD, chronic renal failure, advanced dementia.",
      "Current health legislation and AV policy support health practitioners, including paramedics, in not offering or administering medically futile or non-beneficial treatments. However, these decisions are often complex and challenging and it is appropriate to continue resuscitative efforts while information is collected and consultation with the AV Medical Advisor occurs.",
      "While most patients with significant comorbidities will not have the physiological reserve to recover from resuscitation, some patients may benefit from resuscitation such as a patient with renal failure who is receiving dialysis awaiting kidney transplant. Voluntary Assisted Dying",
      "In Victoria, patients with a terminal diagnosis may choose to undertake Voluntary Assisted Dying (VAD).",
      "The medication used leads to deep sedation and respiratory depression. In most patients, death from respiratory depression occurs within one hour after oral ingestion.",
      "Where AV attends a patient who is actively involved in a VAD case, it is important to note: — There will be a documented instructional Advance Care Directive for \"no resuscitation\". — Family members or other health professionals (including paramedics) are not permitted to assist in the administration of the VAD medicine. — Attending paramedics are not to administer active clinical therapy or resuscitation such as oxygen therapy, assisted ventilation or IV drug / fluid administration. — Supportive care such as positioning and other comfort measures are encouraged.",
      "If the dying process is prolonged, paramedics / remote area nurses are encouraged to contact the VAD care navigator or patient’s specialist VAD doctor. If this is unsuccessful, please contact the patient’s palliative care team.",
      "Mass casualty incidents are in part characterised by the available resources being overwhelmed by larger patient numbers. Where this is the case, the AV Emergency Management Unit provides guidance (CPG F0026) for patient assessment that may differ significantly from guidelines used in other situations. Aeromedical",
      "Resuscitation efforts may be ceased during Air Ambulance transport when cardiac arrest occurs in the setting of severe injury, a quickly reversible cause for the cardiac arrest has been excluded (i.e. pneumothorax, cardiac arrhythmia) and it is not practical to continue chest compressions to hospital. Communicating death, dying and comfort care",
      "If it is safe and appropriate to do so, you may offer to support a family member in viewing resuscitation efforts before they are discontinued.",
      "Studies have shown that some people benefit from witnessing resuscitative efforts on their loved one. If someone elects to watch the resuscitation efforts, it is essential to pre-brief them and outline the expectation of how the scene looks, how the patient looks (they will not look like themself, they will appear deceased, they may have tubes and machinery attached to them) prior to them witnessing the resuscitation. Ensure all team members are aware that a family member will be viewing the resuscitation.",
      "Once the decision to withhold or cease resuscitation is made, the priority should be providing comfort care to the patient and their family. Paramedics should consult with relevant stakeholders such as family, palliative care services, VVED, and/or the AV Medical Advisor regarding further steps in providing comfort care through the dying process.",
      "Principles that can be used to communicate when a death has occurred include: — Speak slowly, clearly and concisely. — Clump information together in 1-3 sentences and leave a pause in between to help the receiver process the news. — Use the D- words to convey death “Death” “Dying” “Die” “Dead”. Avoid phrases such as “passed away” or “your loss”. — Content may need to be repeated several times — Use a non-judgemental approach as people may respond with a range of reactions. — Provide practical guidance on next steps",
      "AV staff can use the Palliative Care Advice Service (PCAS) for advice and support in navigating both expected and unexpected deaths. PCAS can also provide grief counselling to the family both whilst AV is on scene and at a later time.",
      "The SPIKES communication framework provides a helpful approach to conversations around death and dying."
    ],
    management_mica: [],
    notes: "Obvious death: injuries incompatible with survival, rigor mortis, lividity, putrefaction, doctor declaration on scene. ACD legally binding. Prolonged asystole: withhold unless bystander-witnessed AND AV within 10 min. Consult AV Medical Advisor where uncertain."
  },

  verification_of_death: {
    cpg: "A0203-2",
    title: "Verification of Death",
    careObjectives: [],
    management: [
      "Verification of Death refers to ‘establishing that a death has occurred after thorough clinical assessment of a body’.",
      "Registered Paramedics can provide verification if in the context of employment and if there is certainty of death. Providing verification of death is not mandatory for Paramedics.",
      "Certification of death must still ultimately be provided by a Medical Practitioner as to cause of death. This falls outside the scope of verification of death.",
      "Clinical assessment of a deceased person includes 6 clinical elements. These are the ‘determinants of death’: — No palpable carotid pulse. — No heart sounds heard for 2 minutes. — No breath sounds heard for 2 minutes. — Fixed (non-responsive to light) and dilated pupils (may be varied from underlying eye illness). — No response to centralised stimulus (supraorbital pressure, mandibular pressure or sternal pressure). — No motor (withdrawal) response or facial grimace to painful stimulus (pinching inner aspect of elbow or nail bed pressure). N.B. ECG strip that shows asystole over 2 minutes is a seventh and optional finding that may be included. Ideally the determinants of death should be evaluated 5 - 10 minutes after cessation of resuscitation to ensure late ROSC does not occur.",
      "The Verification of Death form should include all findings along with the full name of person (if known), location of death, estimated date and time of death (if known), name of the Paramedic conducting the assessment and if the treating doctor has been notified.",
      "Police must be notified in cases of reportable or reviewable death with the attending crew remaining on scene until their arrival. Cases of SIDS are considered reportable.",
      "A reportable death would include unexpected, unnatural or violent death, death following a medical procedure, death of a person held in custody or care (alcohol or mental health), a person otherwise under the auspice of the Mental Health and Wellbeing Act but not in care or a person unknown.",
      "A reviewable death is required following death of a child (< 18 years) where the death is the second or subsequent death of a child of the parent, guardian or foster parent.",
      "The original Verification of Death form should be left with the deceased and the copy attached to the printed PCR."
    ],
    management_mica: [],
    notes: "6 clinical determinants: no carotid pulse, no heart sounds ×2 min, no breath sounds ×2 min, fixed dilated pupils, no response to central stimulus, no motor response to painful stimulus. Optional 7th: ECG asystole ×2 min. Assess 5–10 min post-cessation."
  },

  essential_airway_management: {
    cpg: "A0301",
    title: "Essential Airway Management",
    careObjectives: [
      "Safe and effective maintenance of airway patency, oxygenation, and ventilation"
    ],
    management: [
      "Concurrent management with appropriate airway positioning as per CWI/OPS/190 Airway Manoeuvres & Positioning will improve all attempts at management of airway patency, oxygenation and ventilation Bag-Valve Mask Ventilation Ensure the BVM pressure release (“pop off”) valve is set to ‘override’ (valve closed) prior to delivery of assisted ventilations",
      "The early use of appropriate adjuncts (e.g. oropharyngeal and / or nasopharyngeal airway[s]) improves the likelihood of successful ventilation",
      "Many issues in the delivery of assisted ventilations relate to operator technique – consider the use of two-person ventilation technique using VE or CE grip as per CWI/OPS/059 Bag Valve Mask whenever possible",
      "All delivery of ventilation must be supported by the use of continuous waveform end-tidal capnography (ETCO ) as soon as practicable 2",
      "Patients with obesity may require a higher level of positive end-expiratory pressure (PEEP) to support effective oxygenation",
      "Use of an oropharyngeal or nasopharyngeal airway may support more effective bag-valve mask ventilation Supraglottic Airway",
      "There is no requirement to trial alternative airway adjuncts prior to insertion of a supraglottic airway where the clinician identifies the supraglottic airway is the most appropriate adjunct for the patient condition — Supraglottic airways are well tolerated by patients with reduced conscious state and have a high rate of first-attempt insertion success",
      "The iGel ® is sized based on patient predicted body weight rather than actual body weight — In general, adult patients < 170 cm in height will be indicated for a Size 3 while those > 200 cm will be indicated for a Size 5"
    ],
    management_mica: [],
    notes: "All patients ≥12 years. Override (close) BVM pop-off valve. Two-person BVM preferred. Continuous waveform ETCO2 ASAP. SGA: no need to trial other adjuncts first if most appropriate. Conscious state alone insufficient to predict airway need."
  },

  endotracheal_intubation: {
    cpg: "A0302",
    title: "Endotracheal Intubation",
    careObjectives: [
      "To safely and effectively undertake endotracheal intubation in patients who cannot be managed with other airway techniques"
    ],
    management: [],
    management_mica: [
      "To safely and effectively undertake endotracheal intubation in patients who cannot be managed with other airway techniques Intended patient group",
      "Patients ≥ 12 years of age receiving endotracheal intubation General Notes Risk-Benefit Analysis",
      "Pre-hospital intubation can result in significant patient harm",
      "A dynamic risk-benefit analysis is required for every pre-hospital intubation and should include evaluation of the anatomical, physiological, and situational difficulty",
      "Pre-hospital RSI should not significantly delay transport, especially for patients that will benefit from definitive hospital care — This may result in patients indicated for intubation arriving to hospital unintubated — Clear communication during notification will support hospital staff to prepare for RSI on patient arrival",
      "In rural and regional areas RSI may be undertaken or withheld by single-responder MICA paramedics — If proceeding with RSI, MICA paramedics must consult the AV Medical Advisor via the AV Clinician before the procedure Equipment and Patient Positioning",
      "Video laryngoscopy (VL) with a Macintosh blade should be routinely used in conjunction with a bougie for all first attempts at intubation",
      "Place patients in the “sniffing position” during both pre-oxygenation and intubation attempts unless contraindicated by injury or physiology. The external auditory meatus should be level with the sternal notch. The Physiologically Difficult Airway",
      "A physiologically difficult airway occurs in patients undergoing intubation where physiological complications (e.g. hypoxaemia, cardiovascular instability, right ventricular dysfunction, increased intracranial pressure, obesity, pregnancy) increase the risk of complications during intubation and the transition to positive pressure ventilation — Some of these issues are not correctible in the pre-hospital space and benefit from prolonged resuscitation prior to intubation Perfusion",
      "Patients requiring active resuscitation should preferentially have a second IV or IO access prior to intubation — This may include the administration of blood products or noradrenaline and / or adrenaline infusions prior to intubation",
      "Patients with a physiologically difficult airway or other risk factors for peri-intubation hypotension (e.g. increasing age, frailty, active bleeding, initial shock index > 1) should receive a half dose of ketamine for induction and a bolus of metaraminol Pre-Oxygenation",
      "Pre-oxygenation should be performed using either a BVM (with PEEP valve) or BiPAP non-invasive ventilation (NIV) — If using BiPAP NIV, be aware of the apnoea backup rate of the ventilator which may continue to provide ventilations during the onset of anaesthesia and mask apnoea",
      "Routinely place a nasal cannula (15 L / min) to assist pre-oxygenation and allow apnoeic oxygenation",
      "In some patient cohorts, pre-oxygenation may occur via a supraglottic airway",
      "A critical desaturation threshold must be identified and verbalised by the team. For the adequately oxygenated patient this may be defined as < 90%. In difficult to oxygenate patients this will be lower — If critical desaturation occurs it must be immediately managed with rescue airway strategies Delayed Sequence Intubation",
      "This pathway is intended for patients with combativeness preventing safe and effective pre- oxygenation",
      "These patients are at high risk of peri-intubation complications. Strongly consider a trial of NIV.",
      "Patients with pain-producing pathology who are agitated prior to intubation should be managed with",
      "DSI should be considered where undifferentiated peri-intubation agitation prevents safe pre- oxygenation and patient optimisation",
      "In these cases, optimisation of oxygen saturation is the goal prior to paralytic administration (as opposed to normalisation)",
      "Avoid rapid administration of ketamine as this can produce apnoea and a loss of intrinsic airway reflexes",
      "Following pre-oxygenation, some patients may clinically improve and may no longer be indicated for intubation. Consult with AV Medical Advisor via AV Clinician in these cases",
      "IM or IV ketamine may be required for immediate control of a combative patient who endangers themselves or the crew and prevents full assessment — If suspicion of shock exists, a half dose of ketamine should be provided Crash RSI (MFP Only)",
      "This pathway is not a shortcut bypassing peri-intubation resuscitation and should only be used by MICA Flight Paramedics in the most extreme of circumstances",
      "The aim is to secure the airway rapidly while avoiding haemodynamic compromise and extended scene / procedure times in unconscious patients who require immediate airway management to prevent cardiac arrest",
      "A small procedural bolus of ketamine (20 – 30 mg) is required prior to administration of a full dose of paralysis Capnography Remove the ETT immediately if there is any doubt about tracheal placement",
      "The recording of pre- and post-intubation capnography is essential to confirm endotracheal placement and must be noted by all paramedics",
      "A monitor and a portable capnograph (or a second monitor as a last resort) must both be connected and functional prior to all attempts at intubation",
      "Following intubation, if a waveform / reading is lost on one device, immediately check the other capnograph If waveform is lost on both devices and airway circuit remains connected and pressure relief valve is closed, immediately remove ETT and enter the Difficult Airway Guideline",
      "If waveform remains on one capnograph, troubleshooting should include: — Check airway circuit connections for kinks, check monitor connections — Ensure the BVM pressure release (“pop off”) valve is set to ‘override’ (valve closed) — Remove PEEP valve — Change disposable capnography sensor and in-line filter — Connect new capnograph Post-Intubation Sedation and Paralysis",
      "A fentanyl / midazolam infusion is preferred for post-intubation analgesia and sedation",
      "Morphine / midazolam may be considered for patients contraindicated for fentanyl (e.g. serotonin syndrome)",
      "Where available, propofol may be considered for post intubation sedation at a rate of 100 mg – 300 mg / hr — Ensure a concurrent infusion of fentanyl or morphine is added for provision of analgesia — Propofol at 50 – 200 mg / hr may also be layered onto a fentanyl / midazolam infusion for patients with seizures who appear resistant to therapy — Provide propofol 0.5 mg / kg bolus as required OR infusion at 50 mg / hr if hypertension is present (SBP > 140 mmHg) despite fentanyl 100 mcg / hr and midazolam 10 mg / hr in a patient with suspected neurological emergency",
      "Routine post-intubation paralysis is indicated in patients with suspected neurological emergencies (e.g. traumatic brain injury, suspected intracranial haemorrhage) and for prevention of shivering in patients being therapeutically cooled",
      "Ongoing paralysis may be required for patients with refractory hypoxia and / or ventilator asynchrony Infusions Fentanyl and Midazolam Infusion",
      "Dilute Fentanyl 300 mcg (6 mL) and Midazolam 30 mg (6 mL) to 30 mL with Dextrose 5% or Normal Saline (in a 50 mL syringe)",
      "Dose: 1 – 15 mL / hr",
      "Fentanyl dose: 10 – 150 mcg / hr",
      "Midazolam dose: 1 – 15 mg / hr Morphine and Midazolam Infusion",
      "Dilute Morphine 30 mg (3 mL) and Midazolam 30 mg (6 mL) to 30 mL with Dextrose 5% or Normal Saline (in a 50 mL syringe)",
      "Volume: 1 – 15 mL / hr",
      "Morphine dose: 1 – 15 mg / hr",
      "Midazolam dose: 1 – 15 mg / hr"
    ],
    notes: "MICA. VL + bougie standard. Sniffing position. Pre-oxygenation mandatory. Nasal cannula 15 L/min for apnoeic oxygenation. Dual capnography before and after. DSI for combative patient preventing pre-oxygenation. Post-intubation: fentanyl/midazolam infusion preferred."
  },

  difficult_airway_guideline: {
    cpg: "A0303",
    title: "Difficult Airway Guideline",
    careObjectives: [
      "Safe oxygenation and ventilation of patients receiving endotracheal intubation",
      "Escalation of airway interventions in response to unsuccessful attempts at securing the airway"
    ],
    management: [],
    management_mica: [],
    notes: "MICA. Failed first intubation attempt triggers DAG. Maintain oxygenation. Options: optimise position, suction, bougie, change blade, SGA, surgical airway. Scalpel-finger-bougie for surgical airway. Never abandon oxygenation attempt."
  },

  mechanical_ventilation: {
    cpg: "A0307",
    title: "Mechanical Ventilation",
    careObjectives: [
      "Lung-protective ventilation of patients receiving mechanical ventilation",
      "Management of patient-ventilator asynchrony"
    ],
    management: [],
    management_mica: [
      "Use Post-Intubation Hypoxia / High Pressures Emergency Checklist",
      "Some conditions (e.g. asthma) will require tolerance of extremely high airway pressures while managing the underlying physiology.",
      "Where PIP is elevated but not Pplat, the issue is likely to be related to increased airway resistance. — Bronchospasm — — Airway secretions — Pinching of endotracheal tube — Kinks in circuit tubing — ETT positioning (i.e. endobronchial intubation)",
      "If PIP and Pplat are both elevated, the issue is likely to be related to decreased compliance. — Abdominal distension — Pleural effusions — Pneumothorax — Pulmonary oedema — Acute Respiratory Distress Syndrome (ARDS) Patient-Ventilator Synchrony",
      "Attempts should generally be made at troubleshooting synchrony and optimisation of sedation before administration of neuromuscular paralysis.",
      "General steps: — Check ETT position, cuff pressure and circuit connections. — Check tidal volume, PEEP and respiratory rate are appropriate for the patient and pathology (use Adult Mechanical Ventilation Calculator). — The respiratory rate makes the largest difference to patients beginning to breath and should be actively supported. — Consider increasing sedation if patient comfort is in question. Sedative boluses may be useful if the clinical context allows. — Actively treat bronchospasm and suction the ETT as per https://av-digital- cpg.web.app/assets/pdf/CWI/CWI OPS 208 In-Line Endotracheal Suction.pdf if appropriate. Failure to Trigger",
      "AutoPEEP is present in many cases of failure to trigger and should be managed according to the underlying pathology. — A degree of AutoPEEP is often present when paralysis is wearing off. If failure to trigger is occurring as the paralytic agent wears off, consider monitoring before any intervention. — AutoPEEP may also be generated by excessive ventilation, consider whether the current ventilation strategy is contributing to failure to trigger.",
      "Reduce the trigger threshold sufficiently to increase triggering without promoting autotriggering. Autotriggering",
      "Where possible identify the source of artefact (such as fluid in ventilator circuit or air leaks).",
      "Increase trigger threshold gradually until artefact does not trigger breaths. Inadequate Flow",
      "In cases of severe acidosis inadequate flow may often be present. It is generally beneficial to maintain spontaneous respirations to support CO offloading whenever possible (except in 2 concurrent TBI).",
      "Reduce rise time",
      "Manage pain and distress",
      "Promote temperature maintenance",
      "Increase sedation Flow Overshoot",
      "Lengthen rise time",
      "If lung compliance is poor, may require paralysis Premature Cycling",
      "Increase inspiratory time",
      "Decrease cycle threshold to prolong the period of inspiratory support Delayed Cycling",
      "Shorten inspiratory time (may require reduction in tidal volume)",
      "Increase the flow threshold for cycling to shorten the breath"
    ],
    notes: "Post-intubation. Lung-protective: Vt 6–8 mL/kg IBW. PEEP per pathology. Target ETCO2 35–45 mmHg. Continuous waveform capnography mandatory. FiO2 titrate to SpO2 94–98%."
  },

  choking: {
    cpg: "A0308",
    title: "Choking",
    careObjectives: [
      "To identify the severity of foreign body airway obstruction",
      "Immediately manage foreign body airway obstruction causing inadequate ventilation"
    ],
    management: [
      "Foreign body airway obstruction is treated based on the adequacy of ventilation.",
      "The best indicator of the adequacy of ventilation is the effectiveness of the patient’s cough, although other signs are important in determining adequacy of ventilation. Further information",
      "Adequate ventilation: The obstruction is incomplete and allows enough air to pass by. No interventions are necessary. Attempts to remove or investigate the obstruction may cause deterioration and should be delayed until the right resources are available to definitively manage a complete airway obstruction (e.g. in hospital).",
      "Inadequate ventilation: The obstruction is either complete or so severe that it does not allow enough air to pass by to sustain life. Immediate intervention is required. Adequate ventilation Inadequate ventilation Effective cough Ineffective cough Able to speak Unable to speak Able to take a breath prior to coughing Unable to breathe, silent chest, cyanosis Normal conscious state Altered conscious state Effective cough Incomplete obstruction with adequate ventilation",
      "Encourage the patient to cough.",
      "Monitor closely for deterioration as the obstruction may shift, becoming more severe. Ineffective cough Complete or severe obstruction with inadequate ventilation",
      "Alternate between back blows and chest thrusts as required until the obstruction is dislodged, or the patient deteriorates.",
      "Assess the patient in between each blow or thrust. There is no need to continue once the obstruction is dislodged. Back blows",
      "Technique: Strike the patient firmly and suddenly in the centre of the back between their shoulder blades using the heel of the hand.",
      "Position: Ideally the patient should brace against a supportive object or surface to provide stability during back blows. — There are no specific ages or weights at which one position may be used over another. It will depend on the size of the patient and what is easiest to achieve in the circumstances. — Adults and larger children: brace or lean against a chair, bed, or other support — Smaller children: across the clinician’s knees — Infants: head down, chest supported by the clinician’s forearm and head supported by the clinician’s hand Infant Back Blows Smaller Child Back Blows Larger Child Back Blows Adult Back Blows Chest thrusts",
      "Technique: A rapid, forceful thrust delivered to the centre of the chest while the back is supported. — Similar to chest compressions but delivered in a sharper movement and at a slower rate, allowing reassessment in between thrusts.",
      "Position: Position the back against any immediately available surface that can provide the most counter pressure against force of the thrust (e.g. ground, wall, or the clinician’s other hand or body). Infant Chest Thrusts Smaller Child Chest Thrusts Adult Chest Thrusts Unconscious Perform concurrent efforts to remove the obstruction:",
      "Manually remove any visible obstruction in the upper airway and suction as required.",
      "Laryngoscope and Magill’s forceps — Attempted with concurrent chest thrusts or CPR"
    ],
    management_mica: [
      "Chest thrusts or CPR as required — There is little different between chest thrusts and CPR from the perspective of clearing a FBAO in an unconscious patient. If in any doubt regarding the presence of a pulse, default to CPR with a continued emphases on the use of laryngoscope and Magill’s forceps. Cricothyroidotomy (MICA) Guideline with concurrent efforts to clear the airway by other means if resources allow in case of failure to clear obstruction.",
      "Immediately proceed to cricothyroidotomy if the obstruction cannot be relieved by laryngoscopy and Magills forceps or intubation is not successful on first attempt."
    ],
    notes: "Mild: encourage coughing. Severe conscious: 5 back blows + 5 abdominal thrusts. Unconscious: CPR, check mouth before each breath. Infant: back blows + chest thrusts. Laryngoscopy + Magill forceps if trained. Surgical airway last resort."
  },

  acute_coronary_syndromes: {
    cpg: "A0401",
    title: "Acute Coronary Syndromes",
    careObjectives: [
      "Rapid identification of STEMI to facilitate timely reperfusion (PCI or PHT) is the primary goal of prehospital management.",
      "Provision of antiplatelet therapy (aspirin).",
      "Reduce cardiac workload by treating associated symptoms (e.g. nausea, pain)."
    ],
    management: [
      "Aspirin: 300 mg chewable/soluble PO. Supplement if lower dose already given prehospital.",
      "Gtn: GTN S/L 300–600 mcg. Repeat every 3–5 min if BP ≥100 mmHg. C/I: BP <100, HR <50 or >150, VT, PDE5 inhibitors.",
      "Pain: GTN first. If unresolved: opioids as per CPG A0501.",
      "Nausea: As per CPG A0701",
      "Lvf: As per CPG A0406 Cardiogenic Pulmonary Oedema",
      "Oxygen: NOT routine. Only if SpO2 <94% as per CPG A0001. Hyperoxia detrimental in STEMI.",
      "Heparin: Per CPG D038 — for eligible STEMI patients pre-thrombolysis"
    ],
    management_mica: [],
    notes: "Aspirin 300 mg. GTN S/L if SBP >100. O2 if SpO2 <94%. 12-lead ECG (→ STEMI pathway if indicated). Analgesia: morphine or fentanyl IV. Anti-emetic if required. Ticagrelor 180 mg (MICA, STEMI pathway activated)."
  },

  bradycardia: {
    cpg: "A0402",
    title: "Bradycardia",
    careObjectives: [
      "To increase heart rate where bradycardia is causing haemodynamic compromise, heart failure or life threatening arrhythmia."
    ],
    management: [
      "First line: Atropine 600 mcg IV. Repeat up to total 3000 mcg (5 doses of 600 mcg).",
      "Atropine limitations: Unlikely effective in Mobitz II or 3rd degree (complete) heart block — but still give. Ineffective AND harmful post cardiac transplant. Caution in MI — tachycardia worsens ischaemia."
    ],
    management_mica: [],
    notes: "Unstable: hypotension, reduced consciousness, severe chest pain, APO, syncope. Atropine 600 mcg IV (repeat to max 3000 mcg). TCP if atropine fails. Consider reversible causes. Isoprenaline infusion: MICA."
  },

  tachycardia_narrow_complex: {
    cpg: "A0403",
    title: "Tachycardia (Narrow Complex)",
    careObjectives: [
      "Rapid termination of life threatening arrhythmias and transport to a facility capable of definitive care.",
      "Rapid transport to facilitate the treatment of the arrhythmia where treatment is not available in the prehospital environment.",
      "Early termination of stable SVT where possible, following ECG capture."
    ],
    management: [
      "Stable SVT — Modified Valsalva: semi-recumbent 45°, forced expiration, lay flat + raise legs 45° for 15 sec. Only if SBP ≥90 mmHg.",
      "Stable SVT — Adenosine 6 mg rapid IV push through large proximal vein + NS flush. If no effect: 12 mg. Record 12-lead ECG first.",
      "Stable SVT — 12-lead ECG mandatory before treatment unless immediate management required.",
      "Unstable SVT/AF/Flutter — Synchronised cardioversion 200J after sedation (midazolam ± fentanyl). Repeat if needed.",
      "AF/Flutter deteriorating to cardiac arrest — Synchronised cardioversion 200J."
    ],
    management_mica: [],
    notes: "Stable SVT: vagal manoeuvres → adenosine 6 mg IV (MICA, repeat 12 mg). AF/flutter: rate control not routine prehospital cardioversion. Unstable any rhythm: synchronised cardioversion. Verapamil: MICA after adenosine fails."
  },

  tachycardia_broad_complex: {
    cpg: "A0404",
    title: "Tachycardia (Broad Complex)",
    careObjectives: [
      "Rapid termination of life threatening arrhythmias and transport to a facility capable of definitive care.",
      "Rapid transport to facilitate the treatment of the arrhythmia where treatment is not available in the prehospital environment."
    ],
    management: [
      "Unstable: Synchronised cardioversion 200J after sedation.",
      "Pulseless: Treat as VF — defibrillation as per CPG A0201-1"
    ],
    management_mica: [],
    notes: "Treat as VT unless proven otherwise. Stable: amiodarone 150 mg IV over 10 min (MICA). Unstable: synchronised cardioversion. Torsades de Pointes: magnesium sulphate (MICA). Cardiac arrest: treat as VF."
  },

  cardiogenic_pulmonary_oedema: {
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
      "Gtn: GTN S/L 400–800 mcg. Repeat every 3–5 min. Infusion if on NIV and requiring ongoing doses. C/I: BP <100, HR <50 or >150.",
      "Furosemide: 40–80 mg IV if clear fluid overload and responding to GTN/NIV. Second-line."
    ],
    management_mica: [
      "Nitrates should be administered to all patients presenting with symptomatic cardiogenic APO unless contraindicated. Patients with respiratory failure should receive GTN while NIV is applied concurrently.",
      "Minimise interruption to CPAP / BiPAP NIV for ongoing GTN administration — Once CPAP / BiPAP NIV has been applied and an adequate seal is achieved, avoid removing the mask to give further S/L GTN if the patient is responding well to NIV. — If NIV is not providing adequate effect, there is significant hypertension despite initial GTN or transport time is prolonged, consider briefly removing the mask to administer further doses. GTN Infusion",
      "Consider GTN infusion in patients receiving NIV requiring additional preload reduction with BP > 140 mmHg. — GTN S/L is the preferred route in patients without NIV.",
      "Remove the GTN patch before commencing GTN infusion.",
      "Closely monitor blood pressure, assessing at least every 5 minutes.",
      "GTN infusion should be carefully titrated to patient symptoms and blood pressure, targeting an SBP of 120 -140 mmHg.",
      "Cease infusion if SBP < 100 mmHg. — Closely monitor SBP after ceasing infusion",
      "Administer GTN infusion via a separate IV line.",
      "Ensure the infusion line is primed with the infusion medication and minimise attachments to the cannula. — Unprimed attachments (e.g. 3-way extension) can lead to delays in the patient receiving infusion medication. GTN Infusion preparation",
      "Dilute Glyceryl Trinitrate 15 mg (3 mL) to 50 mL with Normal Saline or Dextrose 5% (in a 50 mL syringe)",
      "1 mL = 300 mcg",
      "2 mL / hr = 10 mcg / min Health and safety",
      "Wear gloves when preparing GTN infusion.",
      "Exposure of GTN to skin can lead to symptoms such as hypotension and headaches. Furosemide",
      "Furosemide should be considered in all patients with cardiogenic APO with signs of fluid overload (e.g. raised JVP, peripheral oedema, ascites). — Nitrates and oxygen therapy / NIV (where required) should be the initial priority. — Where indicated, administer furosemide en-route to hospital after initial management.",
      "Furosemide is not indicated for management of fluid overload due to other causes (e.g. renal failure) without signs of cardiogenic APO. Inadequate perfusion / shock"
    ],
    notes: "GTN S/L (all unless SBP <100). CPAP/BiPAP for respiratory failure. Furosemide if signs of fluid overload. GTN infusion: MICA if SBP >140 on NIV. Adrenaline infusion for cardiogenic shock (MICA). Avoid salbutamol unless confirmed bronchospasm history."
  },

  inadequate_perfusion_cardiogenic: {
    cpg: "A0407",
    title: "Inadequate Perfusion (Cardiogenic)",
    careObjectives: [
      "To achieve a perfusion target appropriate to the patient’s condition."
    ],
    management: [],
    management_mica: [],
    notes: "Cardiogenic shock: SBP <90 despite adequate filling. MICA: vasopressors (noradrenaline/metaraminol infusion). IV fluid if hypovolaemic component. PANDA trial consideration. Transport to PCI/cardiac surgery facility."
  },

  stemi_management: {
    cpg: "A0408",
    title: "STEMI Management",
    careObjectives: [
      "In the setting of STEMI, time from onset of symptoms to coronary reperfusion correlates to the amount of permanent myocardial damage and risk of death. Once STEMI is identified, all efforts should aim to expedite coronary reperfusion whether via PCI or PHT. The primary destination is intended to be a PCI centre in all cases."
    ],
    management: [],
    management_mica: [],
    notes: "Code STEMI activation. Aspirin 300 mg + ticagrelor 180 mg. Primary PCI preferred. Tenecteplase if PCI >120 min from symptom onset (MICA credentialled). Heparin concurrent with thrombolysis (MICA). Intra-arrest thrombolysis for witnessed PE arrest (consult AV Medical Advisor)."
  },

  hypertension: {
    cpg: "A0410",
    title: "Hypertension",
    careObjectives: [
      "Identify patients suffering from hypertension and the severity.",
      "Symptomatic management as required.",
      "Plan care pathway appropriate to patient’s condition and risk profile."
    ],
    management: [
      "If patient has no competing clinical priorities requiring ED care, they may be safely referred for an appointment with their own general practitioner as soon as feasible. — In patients with limited access or delayed access to a regular GP, consider referring the patient to a PPCC for earlier review.",
      "The importance of this follow-up should be emphasised with the patient, given the deleterious effects of uncontrolled hypertension (neurological, renal, and cardiovascular disease). Self-care advice",
      "Dependent on a holistic assessment, paramedics may provide some general advice for patients with hypertension including: — Accumulate 150 - 300 minutes of moderate activity, or 75 - 150 minutes of vigorous activity, each week. — Reduce salt consumption to 6 g or less per day and consume five serves of vegetables and two serves of fruit daily. — Engage in smoking cessation programs if patient currently smokes. — For adults without high-risk drinking behaviours, consume no more than two standard drinks on any day and no more than four on one occasion.",
      "Further information for patients is available from Better Health Victoria Safety netting",
      "Call 000 if patient develops: — — Chest pain — Shortness of breath — Severe headache — Reduced or absent urine production — Syncope or collapse Severe hypertension Referral",
      "If patient has no competing clinical priorities requiring ED care, consult with Victorian Virtual Emergency Department (VVED). Self-care advice",
      "As per mild-moderate disposition Safety netting",
      "Call 000 if patient develops: — Chest pain — Shortness of breath — Severe headache — Reduced or absent urine production — Syncope or collapse Hypertensive emergency",
      "Requires urgent care in hospital.",
      "Provide care as per relevant CPG for any end-organ dysfunction identified on examination. — CPG A0401 Acute Coronary Syndrome — CPG A0406 Pulmonary Oedema — CPG A0502 Headache — CPG A0711 Suspected Stroke or TIA"
    ],
    management_mica: [],
    notes: "Hypertensive emergency: SBP >180 with end-organ damage. GTN for APO/ACS component. Avoid rapid BP reduction. Do not treat isolated hypertension in suspected stroke. MICA: GTN infusion."
  },

  pain_relief: {
    cpg: "A0501-1",
    title: "Pain Relief",
    careObjectives: [
      "To reduce the suffering associated with the experience of pain to a degree that the patient is comfortable."
    ],
    management: [
      "Moderate: IV opioids + paracetamol preferred. IV preferred in elderly/frail.",
      "Moderate: IN fentanyl or IN ketamine + paracetamol",
      "Severe: IV morphine or IV fentanyl titrated to effect. Consult for further doses beyond maximum.",
      "Severe: Limited effect from opioids, opioids contraindicated, opioid tolerant, patient declines opioids",
      "Ketamine: Anxiety/psychosis history — use with caution. Elderly/frail — prefer IN fentanyl.",
      "Ketamine: ETCO2 monitoring and line-of-sight required when ketamine used.",
      "Intranasal: Half dose each nostril. Max 1 mL per nostril per dose. Add 0.1 mL for dead space in small doses.",
      "Monitoring: Minimum every 15 minutes: airway, RR, SpO2, HR, BP, SAT score"
    ],
    management_mica: [
      "Hypersalivation is a known side effect of ketamine: — Suction: On most occasions suctioning will be sufficient — Atropine 600 mcg IV/IM (MICA only) where hypersalivation becomes difficult to manage or the airway is compromised",
      "Ketamine 50 mg up to 50 mL with Normal Saline to make 1 mg/mL dilution.",
      "Recommended infusion rate: 0.1 – 0.3 mg/kg/hr Supply issue"
    ],
    notes: "Multi-modal preferred. Moderate: IV opioids + paracetamol (IV) or IN fentanyl/ketamine + paracetamol (no IV). Severe: opioids + ketamine. IV ketamine: MICA or ALS consult. Atropine for ketamine hypersalivation (MICA only). SAT score monitoring mandatory."
  },

  headache: {
    cpg: "A0502",
    title: "Headache",
    careObjectives: [
      "Risk stratify patients with headache",
      "Select appropriate care pathway based on risk profile: — High-risk: Transport to ED — Low-moderate risk: VVED referral"
    ],
    management: [
      "High risk: Transport to ED",
      "Low moderate risk: VVED referral. Analgesia as per CPG A0501-1 Pain Relief."
    ],
    management_mica: [],
    notes: "Red flags: thunderclap, worst ever, meningism, focal neuro, post-trauma, fever — consider SAH/meningitis. Paracetamol + ibuprofen. Metoclopramide or prochlorperazine for migraine. Cluster: high flow O2 + sumatriptan (own supply). Droperidol (MICA)."
  },

  oxygen_therapy: {
    cpg: "A0001",
    title: "Oxygen Therapy",
    careObjectives: [
      "Provide oxygen therapy for patients with hypoxaemia or critical illness as required",
      "Provide targeted oxygen therapy to avoid harms associated with excessive oxygen administration",
      "Provide continuous high flow oxygen regardless of SpO for management of specific conditions 2 where required"
    ],
    management: [
      "Oxygen is a treatment specifically for hypoxaemia and has no impact on the sensation of breathlessness in patients without hypoxaemia.",
      "Administer oxygen to achieve the target SpO while continuously monitoring for changes in 2 condition.",
      "Oxygen should not be administered unless indicated as it may be harmful.",
      "The potential risks due to hyperoxaemia with oxygen therapy include1: — Respiratory effects: increased PaCO , absorption atelectasis and direct pulmonary 2 toxicity — Cardiovascular effects: increased systemic vascular resistance and blood pressure, reduced coronary artery blood flow, reduced cardiac output — Cerebrovascular (reduced cerebral blood flow) effects and increased reperfusion injury due to increased reactive oxygen species.",
      "A large systematic review and meta-analysis found that in spontaneously ventilating patients when compared with a conservative oxygen strategy, a liberal oxygen strategy was associated with an increased risk of mortality in-hospital for conditions including sepsis, stroke, trauma and myocardial infarction2.",
      "In patients who are acutely short of breath or have a critical illness, prioritise administering oxygen before assessing SpO . Oxygen can later be titrated to the target saturation range. 2",
      "If pulse oximetry is not available or unreliable, oxygen can be provided until a reliable SpO reading 2 can be obtained or symptoms resolve. — 2 - 6 L / min via nasal cannulae, or — 15 L / min through a non-rebreather reservoir mask if severe hypoxaemia is suspected Oxygen delivery",
      "The FiO levels delivered to the patient vary by the delivery system: 2 — Standard nasal cannulae: FiO 0.24 – 0.44 at 1 – 6 L / min 2 — Non-rebreather mask: FiO 0.6 – 0.9 at 10 – 15 L / min 2",
      "Position the conscious patient upright if possible, as this can improve oxygenation.",
      "Non-rebreather masks should not be used at flow rates < 10 L / min due to the risk of CO retention. 2",
      "Nasal cannulae work effectively for mouth-breathers, however, use a face mask if nasal passages are congested or blocked. Severe hypoxaemia / critical illness",
      "Early aggressive oxygen administration may benefit patients with severe hypoxaemia or critical illnesses such as cardiac arrest or resuscitation, major trauma, shock, severe sepsis and anaphylaxis.",
      "Administer high flow oxygen, regardless of whether the patient is at risk of hypercapnic respiratory failure. Once the patient is haemodynamically stable and the SpO can be reliably obtained, titrate 2 oxygen appropriately: — 92 – 96% (most patients) — 88 – 92% (risk of hypercapnic respiratory failure)",
      "Patients receiving preoxygenation for RSI should be administered oxygen therapy as per CPG A0302 Endotracheal Intubation. Risk of hypercapnic respiratory failure",
      "Some patients are prone to hypercapnic respiratory failure. This is most commonly seen in COPD but may occur in other diseases including neuromuscular disorders, cystic fibrosis, bronchiectasis, severe kyphoscoliosis or obesity. — Any patient prescribed home BiPAP is at high risk of hypercapnic respiratory failure.",
      "If no COPD diagnosis is known, target reduced oxygen saturations if the patient has: — History of chronic breathlessness on minor exertion such as walking on level ground — Risk factors including smoking (or ex-smoker), exposure to occupational dusts / gases or family history — No other known cause of breathlessness",
      "Some patients may carry an oxygen alert card or bracelet if they are at risk of hypercapnic respiratory failure.",
      "Target an SpO of 88 – 92% in these patients. 2",
      "Unless a patient has already experienced hypercapnic respiratory failure, it is not possible to predict if a patient with COPD will develop hypercapnia during an acute exacerbation. Therefore, all patients with moderate or severe COPD should be considered to be at risk of this complication until blood results are available and SpO should be targeted to 88% - 2 92%.",
      "Proposed mechanisms for oxygen-induced hypercapnia include: — Increased ventilation perfusion mismatch due to reduced hypoxic pulmonary vasoconstriction, — Reduced ventilatory drive, — Atelectasis — The Haldane effect (increased PaCO due to displacement from haemoglobin by O ) 2 2",
      "Targeting SpO to this lower range has been shown to significantly decrease mortality. 2 Oxygen therapy regardless of SpO 2",
      "Some patients require high flow oxygen therapy due to specific disease processes. Maintain oxygen therapy regardless of SpO or signs of breathlessness. 2",
      "All patients suspected of having inhaled potentially toxic gases (e.g. house fires) should be given high concentration oxygen due to the risks associated with carbon monoxide, cyanide and other gases. — — Where the patient may have been exposed to other poisons, administer oxygen to maintain an appropriate target SpO . Consult VPIC for toxicology advice. 2",
      "Cluster headache is characterised by attacks of severe unilateral pain which can occur multiple times per day and last up to several hours. High concentration oxygen therapy via a non-rebreather mask has been shown to provide pain relief to patients experiencing cluster headache. Administer high flow oxygen where the patient can confirm their diagnosis and",
      "Decompression illness requires high concentration oxygen to promote nitrogen off",
      "Patients with sickle cell disease may present with an acute painful crisis. Oxygen should be given to prevent hypoxaemia and prevent further intravascular sickling. Paraquat poisoning",
      "Low target oxygen saturations of 85 – 88% are recommended. This is due to: — The risk of potentiating lung injury by administration of oxygen. — Evidence suggests that oxygen saturations around 85% do not cause harm.",
      "Paraquat is a highly toxic restricted herbicide that is used in Australia. Poisoning is uncommon but even small ingestions may be potentially lethal. Avoidance of oxygen is one of the mainstays of treatment."
    ],
    management_mica: [],
    notes: "Target SpO2 94–98% most patients. COPD/hypercapnia risk: 88–92%. Continuous high flow (regardless of SpO2): CO poisoning, cyanide, suspected toxic inhalation, sickle cell, cluster headache, decompression illness. Paraquat: target 85–88%."
  },

  asthma: {
    cpg: "A0601",
    title: "Asthma",
    careObjectives: [
      "Assess severity",
      "Bronchodilation: — Inhaled bronchodilators in patients with adequate ventilation — Parenteral adrenaline (IM or IV) in patients without adequate ventilation (i.e. those who cannot adequately inhale a bronchodilator)",
      "NIV or early intubation in patients with respiratory failure unresponsive to initial treatment",
      "Magnesium for severe or life-threatening asthma",
      "Reduce airway inflammation with systemic corticosteroids for all but the most mild presentations"
    ],
    management: [
      "Mild: Salbutamol 2.5–5 mg nebulised or pMDI + spacer (4–8 puffs). Dexamethasone 8 mg PO/IV.",
      "Moderate: Salbutamol 5 mg neb + Ipratropium 500 mcg neb. Dexamethasone 8 mg. Repeat salbutamol every 20 min.",
      "Severe: As moderate PLUS: Adrenaline 500 mcg IM (anterolateral thigh). IV access. Prepare for deterioration.",
      "Corticosteroids: Dexamethasone 8 mg PO/IV/IM for all but mildest presentations"
    ],
    management_mica: [
      "Monitoring: — The patient on BiPAP NIV must be continuously observed by at least one MICA paramedic and any extrication / egress plan must incorporate this requirement as a priority. — — ETCO monitoring must be commenced as soon as practicable. 2",
      "BiPAP should be viewed as a part of a comprehensive bundle of care, including an adrenaline infusion and other pharmacological interventions as required. Prepare to rapidly progress to RSI in any patient commenced on NIV for asthma.",
      "Severe asthma patients can deteriorate rapidly. In the period immediately following initiation (approx. 10 minutes), one of three pathways are possible. Deterioration No change / small change Improvement Remove Consult AV Medical Advisor via the Clinician Continue BiPAP NIV BiPAP Options include: Consider immediate • Adjusting BiPAP settings intubation",
      "Intubation Due to the dynamic nature of this pathology including the risks of iatrogenic barotrauma and the impairment of venous return, changes to BiPAP settings should only be made following consultation.",
      "Signs of deterioration (indications for removal of BiPAP): — Ineffective (cardiac / respiratory arrest, mask intolerance, decreasing respiratory effort, nil improvement in work of breathing) — Deteriorating vital signs — Risk to patient (loss of airway control, copious secretions, active vomiting, paramedic judgement of clinical deterioration)",
      "BiPAP should be commenced with an FiO of 1.0. Once treatment efficacy and patient comfort / 2 tolerance are established, the FiO should be gradually titrated to normalise SpO levels dependent 2 2 on the patient’s presentation and pathology.",
      "Consider NIV where intubation is clinically indicated but not possible due to an ACD specifically declining intubation. In this context, it may be applied even if the patient has a reduced level of consciousness that would usually contraindicate NIV.",
      "Ongoing bronchodilation: Provide pMDI salbutamol via an in-line connector once NIV is established.",
      "CPAP: In exceptional circumstances (austere environments, ventilator failure, ventilator not available, etc.), MICA paramedics may consider administering CPAP of 5 - 10 cmH O using the Flow-Safe II. 2 Dysynchrony",
      "Ventilator dysynchrony is a predictor of failed NIV and should be addressed urgently when commencing NIV.",
      "A common cause of all ventilator dysynchrony is a poor mask seal – this should be addressed first before moving into further troubleshooting.",
      "Consider early consultation with the AV Medical Advisor via the AV Clinician if having difficulties managing complications or dysynchronies of NIV.",
      "Ventilator inspiratory time exceed patient’s inspiratory time OR percentage of flow decay at which ventilator cycles from inspiration to exhalation is too low.",
      "Reduce inspiratory time and increase cycle % from 25% to 40% or more. Ineffective triggering",
      "Patient attempts to take breath but ventilator fails to trigger.",
      "Decrease the magnitude of the trigger pressure (i.e. make it less negative; e.g. change from -2 cmH O to -1 cmH O) but consider if this may be due to excessive auto-PEEP. 2 2 Flow dysynchrony",
      "Decrease rise time, cautiously increase pressure support and consider nasal cannula at 15 L / min below the NIV mask. Flow excess dysynchrony",
      "May occur in distressed patients who are being commenced on NIV, particularly if leak compensation is active and generating high inspiratory pressures.",
      "Consider a temporary reduction in PS and an increase in rise time. Intubated patients",
      "High ETCO levels should be anticipated in the intubated asthmatic patient and are considered safe. 2",
      "Despite high ETCO levels, treatment should not be adjusted and managing ventilation should be 2 conscious of the effect of gas trapping when attempting to reduce ETCO . 2 Tension pneumothorax (TPT)",
      "Bilateral chest decompression should only be considered if all the following criteria are present: 1•. IPPV via ETT 2•. Sudden loss of cardiac output 3•. Rhythm is PEA 4•. No response to 1 minute of apnoea and IV adrenaline Asthma and COPD",
      "In patients with features of both COPD and asthma with severe respiratory distress who do not respond to initial management, consider the risks / benefits of further asthma management. Infusions Adrenaline infusion",
      "Dilute Adrenaline 3 mg (3 mL of 1:1000) to 50 mL with 5% Dextrose or Normal Saline (in a 50 mL syringe)",
      "1 mL = 60 mcg",
      "1 mL / hr = 1 mcg / min",
      "Dose: 5 - 25 mcg / minute Magnesium",
      "Dilute Magnesium Sulfate 10 mmol (2.5 g) to 25 mL with Normal Saline (this equals 100 mg / 1 mL) for IV administration.",
      "Administer 10 mmol (2.5 g) via infusion pump over 20 minutes. Further resources"
    ],
    notes: "Salbutamol neb + ipratropium bromide. Dexamethasone 8 mg PO/IV. IV magnesium sulphate for severe/life-threatening (MICA). IV adrenaline for life-threatening/arrest (ALS: IM only). NIV for refractory. RSI (MICA) if deteriorating."
  },

  copd: {
    cpg: "A0602",
    title: "COPD",
    careObjectives: [
      "Reduce airflow obstruction with bronchodilators",
      "Controlled oxygen therapy if hypoxaemic to avoid risks associated with hypercapnia",
      "Reduce inflammation with corticosteroids to improve symptoms and decrease recovery time",
      "NIV for management of respiratory failure with inadequate response to initial treatment",
      "Select appropriate disposition - VVED or ED"
    ],
    management: [
      "Bronchodilators: Salbutamol 5 mg neb + Ipratropium 500 mcg neb. Repeat salbutamol every 20 min if needed.",
      "Corticosteroids: Dexamethasone 8 mg PO/IV/IM",
      "Oxygen: Target 88–92% — use controlled low-flow. Over-oxygenation → hypercapnia → respiratory depression."
    ],
    management_mica: [
      "Consider early initiation of CPAP / BiPAP in patients with severe respiratory distress, where nebulised therapy is unlikely to be effectively delivered. — Administer salbutamol as required via in-line pMDI as per https://av-digital- cpg.web.app/assets/pdf/CWI/CWI-OPS-204 Medication Administration by Pressure Metered Dose Inhaler (pMDI)_v1.pdf",
      "Monitoring: — The patient on CPAP / BiPAP NIV must be continuously observed by at least one paramedic and any extrication / egress plan must incorporate this requirement as a priority. — ETCO monitoring must be commenced as soon as practicable when using the Z-Vent. 2",
      "Remove NIV if any signs of deterioration: — Ineffective (cardiac / respiratory arrest, mask intolerance, decreasing respiratory effort) — Deteriorating vital signs — COPD CPG A0602 — Risk to patient (loss of airway control, copious secretions, active vomiting, paramedic judgement of clinical deterioration)",
      "ALS paramedics may apply CPAP in patients with severe respiratory distress where MICA is not immediately available",
      "Consider contraindications for CPAP as per CWI/OPS/157 Continuous Positive Airway Pressure CPAP via Flow-Safe II Device",
      "Consult the AV Clinician for the earliest possible critical care advice. — The clinician can assist with planning based on the patient’s clinical course and may advise on continuing or adjusting CPAP, including increasing the pressure to 10 cm H O. 2 — If unable to contact the clinician, closely monitor the patient and remove CPAP if indicated. — If RV with MICA or arrival at hospital is expected within a few minutes of commencing CPAP, consult is not required. BiPAP",
      "BiPAP is the preferred method of NIV where available.",
      "BiPAP should commence with an FiO of 1.0. Once treatment efficacy and patient comfort / 2 tolerance is established, the FiO should be titrated to target SpO 88 - 92%. 2 2",
      "In a patient with known COPD who is also known or strongly suspected to be a CO retainer, BiPAP 2 may be applied if the patient is obtunded, as long as they are protecting their airway. Some patients with severe COPD may be obtunded due to hypercarbia which may be successfully treated with BiPAP. These patients are at high risk of deterioration and must be monitored very closely.",
      "Consider NIV where intubation is clinically indicated but not possible due to an ACD specifically declining intubation. In this context, it may be applied even if the patient has a reduced level of consciousness that would usually contraindicate NIV. Extrication",
      "Have fewer comorbidities. The potential benefits of aggressive bronchodilation are greater and the potential risks of exacerbating comorbidities are lower. In patients with features of both COPD and asthma with severe respiratory distress, consider the risk and benefits of asthma-specific management in addition to initial bronchodilators and NIV. This includes repeat doses of salbutamol, as well as magnesium and / or adrenaline."
    ],
    notes: "Target SpO2 88–92%. Salbutamol + ipratropium bromide. Dexamethasone. NIV (CPAP/BiPAP) for respiratory failure. Avoid high-flow O2."
  },

  upper_airway_obstruction: {
    cpg: "A0603",
    title: "Upper Airway Obstruction",
    careObjectives: [
      "To urgently identify and manage potential airway obstruction (where appropriate) indicated by stridor in adults."
    ],
    management: [
      "Follow patient's action plan if they have one",
      "Degree of respiratory distress dictates urgency",
      "Intubation is likely to be difficult — prepare dual setup (CPG A0303 Difficult Airway)",
      "Supraglottic techniques unlikely to be effective",
      "Inter-hospital transfer without intubation: notify Adult Retrieval Victoria and formulate airway plan"
    ],
    management_mica: [],
    notes: "Causes: croup, epiglottitis, anaphylaxis, foreign body, angioedema, trauma. Adrenaline neb for croup/anaphylaxis. Dexamethasone. Avoid agitation in epiglottitis. Surgical airway if complete obstruction (MICA)."
  },

  dyspnoea: {
    cpg: "A0604",
    title: "Dyspnoea",
    careObjectives: [
      "Assess and identify the most likely cause of dyspnoea and manage as per the appropriate guideline",
      "Manage respiratory distress and hypoxia in undifferentiated or other causes of dyspnoea with oxygen or NIV if required"
    ],
    management: [
      "Adequate fluid replacement is the goal of pre-hospital care",
      "Normal Saline: standard patients max 2000 mL, fluid overload risk max 1000 mL, administer over 1 hour if BP >90 mmHg otherwise bolus",
      "Do NOT administer insulin prehospital — worsens clinical status without blood chemistry",
      "Do NOT encourage patient to self-administer insulin prior to transport",
      "Intubate only if unable to maintain airway or severely decompensating respiratorily — tachypnoea manages metabolic acidosis",
      "Transport to ED"
    ],
    management_mica: [
      "Be prepared to adjust management. If new findings emerge (e.g. change in breath sounds, new ECG findings, or a clearer history), transition to condition-specific management as indicated. Non-invasive ventilation CPAP vs BiPAP",
      "CPAP provides continuous pressure support and is most effective for oxygenation issues",
      "CPAP is most effective in patients with “wet lungs”: — Type 1 respiratory failure / low oxygenation (e.g. APO, pneumonia, ARDS) — Normal / low CO 2 — Strong respiratory drive, no issues with ventilation",
      "BiPAP provides variable pressure support (higher on inspiration, lower on expiration) and assists with both oxygenation and ventilation",
      "BiPAP is more effective, and CPAP is less effective in patients with “tired lungs”: — Type 2 respiratory failure / CO retention 2 — Respiratory muscle fatigue NIV considerations",
      "Both CPAP and BiPAP are appropriate treatments for undifferentiated respiratory failure with persistent hypoxia. — Hypoxia should be interpreted in the context of the patient’s baseline respiratory status. For example, SpO₂ < 88% may represent hypoxia in a COPD patient, while a higher value may be concerning in an otherwise healthy individual.",
      "BiPAP is the preferred method of NIV where available.",
      "BiPAP may also be initiated for signs of respiratory muscle fatigue regardless of SpO levels, 2 including: — Accessory muscle use — Paradoxical motion of the abdomen — Retraction of the intercostal spaces — Patient appears exhausted",
      "ALS paramedics must consult the AV Clinician as soon as possible after initiating CPAP in patients with dyspnoea of undifferentiated or other cause for clinical advice and support. — The clinician can assist with planning based on the patient’s clinical course and may advise on continuing or adjusting CPAP, including increasing the pressure to 10 cm H O. 2 — If unable to contact the clinician, closely monitor the patient and remove CPAP if indicated (see indications for removal below).",
      "Consider contraindications for CPAP as per CWI/OPS/157 Continuous Positive Airway Pressure CPAP via Flow-Safe II Device.",
      "There is a higher risk of deterioration and potentially limited benefit to NIV in some respiratory conditions. — — Positive pressure reduces venous return in pulmonary embolism, worsening any RV strain — Positive pressure may force more air into the pleural space and worsen a pneumothorax. Monitoring",
      "The patient on CPAP / BiPAP NIV must be continuously observed by at least one paramedic and any extrication / egress plan must incorporate this requirement as a priority.",
      "Remove NIV if any signs of deterioration: — Ineffective (cardiac / respiratory arrest, mask intolerance, decreasing respiratory effort) — Deteriorating vital signs — Risk to patient (loss of airway control, copious secretions, active vomiting, paramedic judgement of clinical deterioration)",
      "Consider removing NIV if — No improvement in work of breathing (options include adjusting NIV settings or intubation) — Marked improvement in work of breathing such that NIV may no longer be required — ALS paramedics must consult the AV Clinician prior to ceasing NIV for decision support BiPAP specific considerations",
      "BiPAP should commence with an FiO of 1.0. Once treatment efficacy and patient comfort / 2 tolerance is established, the FiO should be gradually titrated to normalise SpO levels dependent on 2 2 the patient’s presentation and pathology.",
      "Consider BiPAP NIV where intubation is clinically indicated but not possible due to an ACD specifically declining intubation. In this context, it may be applied even if the patient has a reduced level of consciousness that would usually contraindicate NIV.",
      "Where CPAP has already been applied by ALS, MICA paramedics should assess and consider if a switch to BiPAP is required, particularly if signs of respiratory muscle fatigue are present. Extrication"
    ],
    notes: "Treat underlying cause. Non-cardiogenic APO: NIV. Consider: cardiac, respiratory, anaphylaxis, PE, pneumothorax. NIV can worsen pneumothorax — exclude first."
  },

  pulmonary_embolism: {
    cpg: "A0605",
    title: "Pulmonary Embolism",
    careObjectives: [
      "Identify patients in whom pulmonary embolism is a likely diagnosis",
      "Maintain adequate oxygenation and perfusion through supportive care",
      "Provide targeted management of pulmonary embolism in the setting of cardiac arrest"
    ],
    management: [
      "Oxygen as per CPG A0001",
      "Avoid NIV if PE is the most likely cause and perfusion is borderline — positive pressure worsens preload",
      "NIV acceptable if other causes more probable and perfusion adequate",
      "Caution with intubation — right heart strain patients prone to sudden decompensation",
      "Manage shock as per Cardiogenic/Inadequate Perfusion CPG",
      "Cardiac arrest: consult AV Clinician for thrombolysis consideration if witnessed arrest due to known/strongly suspected PE. Requires resources for 60 min CPR post-thrombolysis.",
      "ECMO eligible — consult AV Clinician early"
    ],
    management_mica: [],
    notes: "Oxygen. Intra-arrest thrombolysis for witnessed PE arrest (consult AV Medical Advisor). Haemodynamically unstable PE: urgent transport. Wells criteria for pre-test probability. IV fluids cautiously — RV failure risk."
  },

  nausea_and_vomiting: {
    cpg: "A0701",
    title: "Nausea and Vomiting",
    careObjectives: [],
    management: [
      "General: If nausea/vomiting tolerated — basic care and referral/transport only",
      "General: IV Normal Saline reduces nausea regardless of antiemetic (avoid in cardiac/renal failure history)",
      "General: Pregnant patients: prefer fluid rehydration first; consider severity before ondansetron",
      "Ondansetron: ODT (oral disintegrating tablet) preferred. IV available. IM permissible if oral/IV impossible: 4 mg IM (8 mg max).",
      "Ondansetron: Long QT syndrome — do NOT give. If VT/TdP follows ondansetron, do NOT give amiodarone (further QT prolongation). Cardiovert instead.",
      "Ondansetron: Do NOT use ondansetron for tramadol-induced nausea — antagonises analgesia at same receptor.",
      "Prochlorperazine: IM route only"
    ],
    management_mica: [],
    notes: "Ondansetron 4–8 mg IV/ODT first-line. Address underlying cause. IV fluids if dehydrated. Droperidol: MICA."
  },

  hypoglycaemia: {
    cpg: "A0702",
    title: "Hypoglycaemia",
    careObjectives: [
      "Identification of high-risk hypoglycaemia",
      "Normalisation of blood glucose level",
      "Identification of appropriate patient disposition"
    ],
    management: [
      "Conscious_can eat: Oral glucose (15–20 g fast-acting carbohydrate). Repeat if BSL <4 after 15 min.",
      "Conscious_cannot eat: Dextrose 10% IV: 200 mL (20 g) slow IV push. Reassess BSL. Repeat if needed.",
      "Unconscious_iv access: Dextrose 10% IV 200 mL. Reassess BSL in 5 min.",
      "Unconscious_no iv access: Glucagon 1 mg IM. Onset 5–10 min. Lay patient lateral (risk of vomiting).",
      "Target b g l: ≥4 mmol/L before considering referral away from ED",
      "Disposition: Patients may be suitable for community management following resolution if: insulin-related, BGL normalised, able to eat, responsible adult present, no high-risk features"
    ],
    management_mica: [],
    notes: "BGL <4.0 mmol/L + symptoms. Conscious: oral glucose. Unconscious/unable to swallow: Dextrose 10% 200 mL IV. Glucagon 1 mg IM if no IV. Recheck BGL 10 min post-treatment. Thiamine 100 mg IV if alcohol-related or malnourished."
  },

  hyperglycaemia_and_ketosis: {
    cpg: "A0713",
    title: "Hyperglycaemia and Ketosis",
    careObjectives: [
      "Identification of high-risk hyperglycaemia",
      "Hydration where indicated"
    ],
    management: [
      "Adequate fluid replacement is the goal of pre-hospital care",
      "Normal Saline: standard patients max 2000 mL, fluid overload risk max 1000 mL, administer over 1 hour if BP >90 mmHg otherwise bolus",
      "Do NOT administer insulin prehospital — worsens clinical status without blood chemistry",
      "Do NOT encourage patient to self-administer insulin prior to transport",
      "Intubate only if unable to maintain airway or severely decompensating respiratorily — tachypnoea manages metabolic acidosis",
      "Transport to ED"
    ],
    management_mica: [
      "It is advised to only intubate where the patient is unable to maintain their airway or is demonstrating a severely decompensating respiratory status (periods of apnoea). This may require tolerating a profoundly low GCS without providing advanced airway management.",
      "Tachypnoea is the body’s mechanism to manage metabolic acidosis. It is a significant consideration to intubate the acutely unwell hyperglycaemic patient as mechanical ventilation can impact acid- base balance, potentially worsening the patient’s metabolic derangements.",
      "For the patient being considered for community-based care with near normal physiological status, — Patient concern, social supports, access to services — Patients age, frailty, and other comorbidities — Unusual findings based on patient's usual disease process with no cause identified — Recency of diagnosis / health literacy — Ability to comply with treatment plan and self-regulate insulin — SGLT2i medication — Nausea / vomiting not responding to antiemetics — Presence of abnormal findings such as abdominal pain, jaundice, fever",
      "Where the patient is acutely unwell and point of care pathology is available including pH, bicarbonate, and potassium, consult ARV to guide care planning which may include IV infusion- based therapies.",
      "AV often cares for patients with glycaemic emergencies, including DKA, who are being transferred to a specialist unit at another facility. Some of these patients may have an insulin, insulin / dextrose or potassium infusion running via a syringe driver/s. Please note: Where there is an insulin / dextrose infusion commenced, potassium levels can fall rapidly."
    ],
    notes: "DKA vs HHS. IV normal saline for dehydration/shock. Do not administer insulin prehospital. Anti-emetic for nausea. Treat precipitating cause. Transport for definitive care."
  },

  seizures: {
    cpg: "A0703",
    title: "Seizures",
    careObjectives: [
      "Early termination of status epilepticus",
      "Appropriate disposition planning based on risk profile"
    ],
    management: [
      "First line benzo: Midazolam: IM 10 mg (adult ≥40 kg) OR IV 5 mg. May repeat once.",
      "Second line: If 2 doses midazolam (IV + IM) insufficient: Levetiracetam IV 60 mg/kg (max 4500 mg) infusion over 5 min.",
      "Airway: Position lateral. Suction if required. High-flow O2. Only use OPA/NPA if needed.",
      "Bsl: If BSL <4 mmol/L: treat hypoglycaemia concurrently",
      "Post ictal: Postictal aggression is usually self-limiting (<30 min) and rarely requires sedation",
      "Patient plan: Some patients have neurologist-prescribed plans — follow if available, consult AV Clinician if uncertain"
    ],
    management_mica: [
      "Airway management, oxygenation, and ventilatory support should occur concurrently with attempts to terminate seizure activity",
      "In patients not requiring ventilatory support, avoid the use of the bag-valve mask (BVM) to provide high-concentration oxygen Status Epilepticus",
      "If administering Midazolam, be prepared to support airway and ventilation",
      "Deliver infusion over 5 minutes Age Weight Dose Vials Dilutant Volume in VTBI * (kg) (mg) Syringe (mL) 0 - 2 3.5 210 1 5mL 10mL 4.2 months 3 months 6 360 1 5mL 10mL 7.2 6 months 8 480 1 5mL 10mL 9.6 1 year 10 600 2 10mL 20mL 12 2 12 720 2 10mL 20mL 14.4 3 14 840 2 10mL 20mL 16.8 4 16 960 2 10mL 20mL 19.2 5 18 1080 3 15mL 30mL 21.6 6 20 1200 3 15mL 30mL 24 7 22 1320 3 15mL 30mL 26.4 8 24 1440 3 15mL 30mL 28.8 9 26 1560 4 20mL 40mL 31.2 10 33 1980 4 20mL 40mL 39.6 11 36 2160 5 25mL 50mL 43.2 VTBI = Volume to be infused (i.e. the amount which should be programmed into the syringe pump to be delivered over 5 minutes). Patient ≥ 40 kg (Age 12 +)",
      "Deliver infusion over 5 minutes Weight (kg) Dose (mg) Vials Dilutant Volume in Syringe VTBI * (mL) 40 2400 5 N/A 25mL 24 50 3000 6 N/A 30mL 30 60 3600 8 N/A 40mL 36 70 4200 9 N/A 45mL 42 80 + 4500 9 N/A 45mL 45 VTBI = Volume to be infused (i.e. the amount which should be programmed into the syringe pump to be delivered over 5 minutes). Functional Seizures",
      "Provide reassurance that the patient is safe, and that the seizure activity will stop Intubation Decision-Making",
      "Patients receiving benzodiazepines and levetiracetam may often experience periods of hypoventilation requiring assisted ventilation. This alone does not necessitate intubation, and patience is required to evaluate for the presence of on-going NCSE compared with prolonged patient recovery following seizure termination.",
      "Among adult patients who continue to seize (either CSE or NCSE with impairment of airway or oxygenation) 5 minutes following the completion of the levetiracetam infusion, intubation will often be required",
      "Paediatric patients are comparatively more readily able to tolerate the consequences of on-going seizure activity and intubation is less urgent except in cases where basic airway manoeuvres are not sufficient to provide effective oxygenation and ventilation — Excluding cases of airway compromise preventing oxygenation, intubation of paediatric patients should generally not occur earlier than 30 minutes following the completion of the levetiracetam infusion — If the patient remains seizing following completion of levetiracetam and transport time is expected to be significant, consult with AV Medical Advisor via the AV Clinician to identify nearest appropriate source of paediatric advanced airway management Disposition Low Risk"
    ],
    notes: "BGL mandatory. Midazolam for active seizure: IV/IM/IN/buccal. Repeat at 5 min if still seizing. Levetiracetam IV (MICA) for refractory. RSI (MICA) for refractory status epilepticus. Consider: hypoglycaemia, eclampsia, toxicology, structural."
  },

  anaphylaxis: {
    cpg: "A0704",
    title: "Anaphylaxis",
    careObjectives: [
      "Adrenaline (IM) with minimal delay",
      "Airway and perfusion support",
      "Hospital-based observation (usually 4 hours) at a minimum"
    ],
    management: [
      "First line: Adrenaline 500 mcg (0.5 mg) IM anterolateral mid-thigh. Repeat every 5 min if no improvement.",
      "Iv adrenaline: Only if extremely poor perfusion or cardiac arrest imminent. Always after IM adrenaline.",
      "Bronchospasm: If bronchospasm persists after adrenaline: Salbutamol nebulised + Ipratropium bromide + Dexamethasone. These are NEVER first-line.",
      "Fluid resuscitation: Normal saline IV if hypotension persists",
      "Glucagon indication: Persistent hypotension after 2 x adrenaline doses if patient has heart failure OR is on beta blockers",
      "Positioning: Supine. Sitting if severe respiratory distress. Semi-recumbent in pregnancy.",
      "Transport: All patients transport to hospital for minimum 4-hour observation"
    ],
    management_mica: [
      "Adrenaline infusion: — Where the initial two doses of IM Adrenaline have not been effective. IM Adrenaline every 5 minutes is appropriate if MICA is not available or while the infusion is being prepared. — An infusion is the preferred method of administering IV adrenaline."
    ],
    notes: "Adrenaline 500 mcg IM anterolateral mid-thigh — priority. Repeat every 5 min if no improvement. Adrenaline infusion (MICA) if 2 IM doses fail. Concurrent: NIV, salbutamol for bronchospasm (not first-line), IV fluids for hypotension, glucagon for beta-blocker patients. All cases transport (biphasic reaction risk, 4-hour observation)."
  },

  shock: {
    cpg: "A0705",
    title: "Shock",
    careObjectives: [
      "To achieve a perfusion target appropriate to the patient and their presenting illness."
    ],
    management: [
      "Iv access: 18G or larger. Large proximal vein for vasopressors/inotropes.",
      "Fluid normal: Normal saline IV. Titrate to response. Max 2000 mL.",
      "Fluid high risk: Cardiac failure, chronic renal failure, elderly: max 1000 mL. Titrate.",
      "Metaraminol: Boluses if: inadequate response after 500–1000 mL NS, OR profound hypotension (BP <70 mmHg, altered mental status, no radial pulse) — can give in parallel with fluid.",
      "Noradrenaline: MICA. 18G cannula or larger in large proximal vein. Risk of tissue necrosis if extravasation.",
      "Target: Perfusion adequate for presentation — not a specific BP number in all cases"
    ],
    management_mica: [
      "Noradrenaline / adrenaline should be administered through an 18G cannula or larger in a large proximal vein (e.g. antecubital fossa). Vasoconstrictive action carries a higher risk of local tissue necrosis if extravasation occurs.",
      "Fluid and metaraminol may be administered through any size cannula. Metaraminol does not act directly at the site of injection but rather stimulates the release of endogenous noradrenaline systemically.",
      "If access is difficult or a second larger line is being inserted for vasopressor/inotrope, consider using ultrasound (if available) to place cannula and confirm placement in vein. Metaraminol",
      "Metaraminol boluses may be required: — Following initial fluid if there is an inadequate response or deterioration. The amount of fluid given prior to progressing to metaraminol and what constitutes an inadequate response is based on clinical judgement. It will generally involve no or minimal improvement in blood pressure following 500 – 1000 mL of normal saline. — In parallel to initial fluid if the patient presents with profound hypotension. This is based on clinical judgement but may include BP < 70 mmHg, altered mental status or no radial pulses.",
      "There is no requirement to wait for a particular volume of fluid to be infused prior to administering metaraminol.",
      "Metaraminol boluses may be continued if there is a delay to noradrenaline / adrenaline infusion or adequate infusion pumps are not available.",
      "Metaraminol 0.5 mg IV increments will be appropriate for most patients. Higher doses (1 mg) may be required in some patients who are significantly hypotensive. Adrenaline / noradrenaline",
      "Do not bolus noradrenaline under any circumstance as effects can be exaggerated and unpredictable.",
      "Adrenaline / noradrenaline infusions may run through the same IV cannula, but this cannula should not be used for bolus medicines / flush. Vasopressor/inotrope complications IV extravasation / skin changes 1. Stop infusion and disconnect infusion, leaving the cannula in place 2. Get alternative access and recommence infusion at alternative site (patient may be dependent on vasopressor infusion) 3. Attempt to aspirate residual drug from the cannula 4. Remove cannula whilst aspirating 5. Elevate the limb 6. Mark affected site 7. Hand over to receiving facility 8. Document details clearly including precise location Palpitations, hypertension",
      "Reduce rate of infusion Reflex bradycardia",
      "Reflex bradycardia in response to metaraminol or noradrenaline may require the addition of an adrenaline infusion +/- a reduction in the rate of infusion. Medication Preparation Noradrenaline Infusion",
      "Dilute Noradrenaline 3 mg to 50 mL with Dextrose 5% or Normal Saline (in a 50 mL syringe)",
      "1 mL / hr = 1 mcg/min Adrenaline Infusion",
      "1 mL / hr = 1 mcg/min"
    ],
    notes: "Hypovolaemic, distributive (septic/anaphylactic/neurogenic), obstructive, cardiogenic. IV fluids: 250 mL boluses titrated. Vasopressors (MICA): metaraminol or noradrenaline for refractory hypotension. Treat the cause."
  },

  meningococcal_septicaemia: {
    cpg: "A0706",
    title: "Meningococcal Septicaemia",
    careObjectives: [],
    management: [],
    management_mica: [],
    notes: "Non-blanching purpura/petechiae + fever/shock = high suspicion. Benzylpenicillin or ceftriaxone IV (MICA). IV fluids for shock. Oxygen. Urgent transport. Contact precautions."
  },

  acute_behavioural_disturbance: {
    cpg: "A0708",
    title: "Acute Behavioural Disturbance",
    careObjectives: [
      "Maintain safe environment for patients, staff, other emergency responders, family and bystanders",
      "Use the least restrictive means possible, maintaining verbal and environmental de-escalation strategies throughout the interaction",
      "Consider clinical causes of acute behavioural disturbance"
    ],
    management: [
      "De-escalation: nominate one person to build rapport and communicate. Non-threatening stance; quiet, calm, reassuring voice.",
      "De-escalation: reduce stimulus — noise, light, crowding. Use patient's name; give simple one-at-a-time instructions. No threats or ultimatums.",
      "Oral sedation: olanzapine wafer (if cooperative).",
      "IM sedation first line: droperidol IM. Midazolam IM if droperidol unavailable or contraindicated.",
      "Monitor: ECG (QTc), SpO2, conscious state post-sedation. Airway positioning."
    ],
    management_mica: [],
    notes: "De-escalation first. Exclude medical causes. Chemical sedation: droperidol IM first-line. Midazolam IM adjunct. Ketamine IM for extreme violence (MICA or ALS consult). SAT monitoring mandatory. Mechanical restraint: least restrictive, never prone unmonitored."
  },

  autonomic_dysreflexia: {
    cpg: "A0710",
    title: "Autonomic Dysreflexia",
    careObjectives: [],
    management: [
      "Transport the patient even if the symptoms are relieved as this presentation meets the criteria of autonomic dysreflexia, a medical emergency that requires identification of probable cause and treatment in hospital to prevent cerebrovascular catastrophe. Flowchart"
    ],
    management_mica: [],
    notes: "SCI ≥T6. Severe hypertension + bradycardia + headache + flushing/sweating above lesion. Sit upright. Identify and remove trigger (bladder/bowel most common). GTN if severe hypertension persists (MICA)."
  },

  suspected_stroke_or_tia: {
    cpg: "A0711",
    title: "Suspected Stroke or TIA",
    careObjectives: [
      "Assess suspected Stroke / TIA cases using MASS",
      "Transport to appropriate destination (thrombolysis, ECR or neurosurgical stroke centre)",
      "Hospital pre-notification"
    ],
    management: [
      "Oxygen: Only if SpO2 <92%",
      "Bsl: Mandatory — exclude hypoglycaemia as mimic",
      "Bp: Do not aggressively lower BP prehospital. Post-intubation target 120–140 mmHg.",
      "Opioids: Caution — risk of consciousness deterioration",
      "Notification: Pre-notification mandatory for MASS positive patients"
    ],
    management_mica: [],
    notes: "FAST/BEFAST. Time of last known well critical. BGL mandatory (exclude hypoglycaemia). No aspirin if haemorrhagic stroke possible. Target SBP 140–180 ischaemic stroke. Code Stroke activation. Stroke Centre transport."
  },

  palliative_care: {
    cpg: "A0712",
    title: "Palliative Care",
    careObjectives: [
      "The purpose of this CPG is to provide paramedics with guidance in managing patients who are currently registered with a community palliative care service and call an ambulance due to new or escalating symptoms. These symptoms are likely to be nausea/vomiting, pain, agitation/anxiety or dyspnoea.",
      "The intent of treatment is to provide relief from distressing symptoms, not the treatment of any underlying disease process. For example, SOB caused by pulmonary oedema should be treated with morphine, not GTN and diuretics.",
      "This CPG applies ONLY to patients with advanced, incurable disease who are no longer receiving active treatment, are currently registered with a community palliative care service and express a wish to stay at home."
    ],
    management: [],
    management_mica: [],
    notes: "ACD/advance care plan review. Goals of care conversation. Symptom management: pain, dyspnoea, agitation, nausea. Consult PCAS. Do not commence futile resuscitation against ACD. Subcutaneous medications (MICA)."
  },

  adrenal_insufficiency: {
    cpg: "A0715",
    title: "Adrenal Insufficiency",
    careObjectives: [
      "Prioritise corticosteroid therapy",
      "Support perfusion with IV fluid",
      "Transport to closest hospital preferably with ICU"
    ],
    management: [
      "Patients with a history of PAI must be considered for treatment with hydrocortisone where any physiological or psychological stressor is considered moderate or severe in order to avoid potential adrenal crisis.",
      "Signs and symptoms of adrenal insufficiency are not required to manage this patient group.",
      "Patients with PAI are generally well educated about their illness and can often identify when they are suffering symptoms of adrenal insufficiency. Accordingly patients may have initiated their ‘sick day management plan’ including administration of their own IM injection of hydrocortisone. Alternatively patients may request Paramedics administer hydrocortisone. Review the patient's care plan as a part of your assessment.",
      "The patient with a history of PAI may have very poor veins for IV access. Do not delay hydrocortisone while trying to gain IV access. Use the IM route. Extended travel time > 1 hour",
      "Consult with the patient’s endocrine specialist or AV Medical Advisor via the AV Clinician to establish ongoing IV fluid management plan and any other care priorities. Hydrocortisone is unlikely to cause harm but has the potential to be life-saving. If there is any doubt, initiate Hydrocortisone and IV fluids."
    ],
    management_mica: [],
    notes: "Adrenal crisis: hypotension + known adrenal insufficiency/steroid use. Hydrocortisone 200 mg IV (MICA). IV normal saline. BGL. Consider in anyone on long-term steroids presenting unwell."
  },

  syncope: {
    cpg: "A0725",
    title: "Syncope",
    careObjectives: [
      "Identify patients suffering from syncope",
      "Symptomatic management if required",
      "Identify care pathway appropriate to patient’s condition and risk profile"
    ],
    management: [
      "Low risk: Refer to VVED. Must send 12-lead ECG with VVED referral. Self-care: lie flat, elevate feet, move slowly when standing.",
      "High risk: Transport to ED. Manage as per appropriate CPG for underlying condition."
    ],
    management_mica: [],
    notes: "TLOC with rapid complete spontaneous recovery. ECG, BGL, lying/standing BP, trauma assessment. High risk: structural heart disease, abnormal ECG, exertional, age >70, recurrent. Consider: vasovagal, orthostatic, cardiac arrhythmia."
  },

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
      "Membrane stabilisation: Calcium gluconate 10 mL (931 mg) IV over 2–5 min (may be faster in arrest). C/I in digoxin toxicity.",
      "Intracellular shift: Salbutamol 10–20 mg nebulised (activates Na/K pumps). Dextrose + insulin (hospital). Sodium bicarbonate if severe acidosis.",
      "Transport: Urgent to ICU-capable facility"
    ],
    management_mica: [
      "Manage: Preference adrenaline infusion over noradrenaline (see below - Intracellular shifting of potassium) Membrane stabilisation",
      "Administer Calcium Gluconate to any patient with a strong clinical history of hyperkalaemia and significant or progressive ECG changes prior to confirmation with laboratory sampling. Intracellular shifting of potassium"
    ],
    notes: "ECG changes: peaked T → wide QRS → sine wave → VF. Calcium gluconate 10% 6.6 mmol IV (membrane stabilisation). Salbutamol 10–20 mg neb (intracellular K+ shift). Sodium bicarbonate if metabolic acidosis. Insulin/dextrose (MICA). Cardiac arrest + hyperkalaemia: calcium gluconate + NaHCO3."
  },

  allergic_reaction: {
    cpg: "A0731",
    title: "Allergic Reaction",
    careObjectives: [
      "Recognise mild reactions and rule out life threats. If in doubt treat as anaphylaxis.",
      "Facilitate patients to receive appropriate follow up care."
    ],
    management: [],
    management_mica: [],
    notes: "Distinguish from anaphylaxis. Antihistamine: promethazine 25 mg IM or cetirizine 10 mg PO. Dexamethasone for urticaria/angioedema. If any systemic involvement: treat as anaphylaxis. Transport if airway-threatening angioedema."
  },

  suspected_gastroenteritis: {
    cpg: "A0732",
    title: "Suspected Gastroenteritis",
    careObjectives: [
      "Differentiate suspected gastroenteritis-like illness from other similar high-risk diagnoses.",
      "Manage appropriate patient cohorts safely at home.",
      "Transport high risk patients for further investigation and management."
    ],
    management: [
      "Limit treatment to oral antiemetics, rehydration and pain relief where possible.",
      "Oral rehydration should involve advice to drink small amounts / sips of fluid (such as water, Gastrolyte, Hydralyte, or iceblocks) every 5 to 10 minutes.",
      "Patients who meet all Low risk criteria and have not received intravenous management may remain home without VVED referral. This includes patients who have received ODT ondansetron and / or oral paracetamol.",
      "Patients who meet Moderate risk criteria or who require intravenous management should not be left at home without paramedic-initiated VVED referral.",
      "Intravenous ondansetron is only indicated for patients who cannot tolerate oral intake, or on the advice of a VVED clinician.",
      "It is appropriate to commence intravenous therapy while waiting for VVED consult.",
      "Elderly patients present greater risk due to increased diagnostic uncertainty and reduced capacity to tolerate disease (e.g. dehydration). Maintain a low threshold for escalation of care (e.g. consultation, referral or transport). Disposition High risk – Transport transported per that guideline.",
      "Concerning ECG findings: If electrolyte or cardiac ischaemia is suspected on the basis of the ECG, the patient should be transported to ED. Moderate risk – Virtual ED",
      "VVED is appropriate for: — Any additional moderate risk factor that may complicate the course or increase the risk of a more serious cause of diarrhoea.",
      "Patients requiring intravenous therapy, as they are at higher risk and more likely to need ongoing antiemetics to maintain hydration.",
      "Recently returned from overseas due to potential for serious foreign infectious disease.",
      "Diarrhoea onset while taking antibiotics due to potential differential diagnosis of clostridium difficile.",
      "Non-specific ECG changes: The ECG is not obviously suggestive of electrolyte disturbance or cardiac ischaemia, but is abnormal in some way. Any ECG abnormalities of uncertain cause should prompt a VVED consultation.",
      "Symptoms ongoing for > 48 hours due to increased diagnostic uncertainty and higher risk of dehydration.",
      "Inflammatory bowel disease past history (e.g. Crohn’s disease, ulcerative colitis) due to being at higher risk of complications. Self-Care Advice Expected course",
      "Gastroenteritis is common and typically does not require hospital treatment.",
      "Diarrhoea usually lasts one to three days; but can last up to ten.",
      "Nausea and vomiting may last a day or two.",
      "Stomach cramps and mild fever.",
      "Symptoms of severe gastroenteritis are typically caused by dehydration and include: — Failing to keep down any fluids at all — Not passing much urine — Feeling faint when standing up Home-care",
      "Maintain fluid intake. Drink oral solutions like Gastrolyte or Hydralyte. Avoid sports drinks.",
      "Eat if hungry. Start with bland foods such as crackers, rice, bananas or dry toast.",
      "Should be consuming normal fluids and food within 48 – 72 hours. Medications",
      "Anti-diarrhoea medications may be advised by a pharmacist or doctor.",
      "Anti-nausea medications may be prescribed by a doctor. — They are not recommended for all cases.",
      "Antibiotics are only needed if the gastroenteritis is caused by bacteria or parasites. — A diarrhoea sample may be tested by a local doctor. Stopping the spread of gastroenteritis",
      "Gastroenteritis is highly contagious.",
      "The very old and very young are most at risk.",
      "Wash hands well (for at least 10 seconds) with warm soapy water after using the toilet, changing nappies, cleaning up vomit and before eating or cooking meals.",
      "Do not share towels, face washer, toothbrush, drinks or cutlery with others.",
      "People who have gastroenteritis should not prepare or handle food for others.",
      "Clean bathrooms and toilets often.",
      "Stay at home and away from others until 48 hours after last symptom. Safety Netting Advise patient to call 000 if they experience ANY of the following:",
      "Black, offensive smelling, jelly-like bowel motions. This may indicate bleeding from the bowel.",
      "Vomit that is dark red / brown and looks like used coffee grounds as this may indicate bleeding from the stomach.",
      "Fainting or collapse. Advise patient to contact their GP / VVED if they experience ANY of the following:",
      "Inability to keep down enough fluids.",
      "Dizziness when standing.",
      "Significant worsening of symptoms.",
      "Symptoms do not improve after 48 hours.",
      "Temperature > 40°C.",
      "Stomach pain that is getting worse.",
      "Frequent vomiting or diarrhoea or both.",
      "Blood or mucus in their faeces (diarrhoea).",
      "Passing little or no urine, or urine is dark or smelly."
    ],
    management_mica: [],
    notes: "Exclude surgical causes (appendicitis, obstruction, bowel ischaemia). Ondansetron anti-emetic. IV fluids if dehydrated. Assess: dehydration, electrolyte imbalance, haematemesis."
  },

  lower_back_pain: {
    cpg: "A0733",
    title: "Lower Back Pain",
    careObjectives: [],
    management: [],
    management_mica: [],
    notes: "Red flags: AAA, cauda equina, fracture, malignancy, infection. Simple mechanical: paracetamol + ibuprofen + methoxyflurane. Position of comfort. Avoid opioids if possible. Movement encouraged."
  },

  sepsis_and_infection: {
    cpg: "A0729",
    title: "Sepsis and Infection",
    careObjectives: [
      "Identify and treat patients with clear signs of sepsis",
      "Risk stratify patients presenting with infection to inform an appropriate disposition"
    ],
    management: [
      "Oxygen: Target SpO2 ≥94% (88–92% if COPD)",
      "Iv access: 18G or larger",
      "Fluid: Normal saline IV 500–1000 mL bolus if hypotensive. Titrate.",
      "Vasopressors: Metaraminol or noradrenaline if fluid inadequate. MICA preferred.",
      "Antibiotics: Not prehospital — prioritise transport",
      "Transport: Urgent. Pre-notification where possible."
    ],
    management_mica: [
      "Hypotension that persists despite fluid resuscitation should be treated with vasopressors."
    ],
    notes: "qSOFA ≥2: RR >22, altered mentation, SBP ≤100 = high risk. NEWS2 for risk stratification. IV fluid 250–500 mL boluses. Vasopressors (MICA) for refractory hypotension. Oxygen. Urgent transport. Do not delay transport for IV access."
  },

  influenza_like_illness_covid: {
    cpg: "A0716",
    title: "Influenza-Like Illness and COVID",
    careObjectives: [
      "Identify patients with influenza-like illness or COVID-19",
      "Identify severity of disease and risk",
      "Identify a care pathway appropriate to the patient’s condition / risk profile"
    ],
    management: [],
    management_mica: [],
    notes: "PPE: surgical mask, gloves, gown, eye protection (aerosol-generating procedures). Symptomatic management. Escalate to sepsis pathway if deteriorating. Follow current AV infection control protocols."
  },

  mental_health_conditions: {
    cpg: "A0107",
    title: "Mental Health Conditions",
    careObjectives: [],
    management: [
      "Low risk: Refer to VVED. Must send 12-lead ECG with VVED referral. Self-care: lie flat, elevate feet, move slowly when standing.",
      "High risk: Transport to ED. Manage as per appropriate CPG for underlying condition."
    ],
    management_mica: [],
    notes: "Trauma-informed approach. Exclude medical causes for altered mental state. Safe transport. Chemical sedation only for acute danger to self/others. Consult Mental Health Clinician via AV Clinician. Consider CATT referral."
  },

  major_trauma: {
    cpg: "A0810",
    title: "Major Trauma",
    careObjectives: [
      "Immediate control of major haemorrhage",
      "Ensure: — Airway patency — Breathing (adequate oxygenation and ventilation) — Circulation (adequate perfusion for the patient’s presentation)",
      "Prioritise transport",
      "Supportive care as required"
    ],
    management: [
      "Haemorrhage control: direct pressure, wound packing, tourniquets for limb haemorrhage. Pelvic binder for suspected pelvic fracture.",
      "Tranexamic acid (TXA) 1 g IV/IO infusion over 10 min (or slow push). C/I if injury >3 hours ago. IM alternative (2 x 5 mL injections lateral upper thigh) if IV delayed.",
      "Fluid: hypotensive resuscitation for penetrating truncal trauma. Target radial pulse present or MAP ~50–65 mmHg.",
      "TBI: maintain normal or supranormal BP. Target SpO2 94–98%, ETCO2 35–45 mmHg. Head of stretcher 10–15°.",
      "Transport: shocked or penetrating truncal trauma — transport immediately, treat only immediately life-threatening conditions en route. Destination: major trauma centre.",
      "Analgesia: morphine/fentanyl — cautious use if hypotensive."
    ],
    management_mica: [],
    notes: "cABCDE. Catastrophic haemorrhage control first. Permissive hypotension: SBP 80–90 (penetrating), 100–110 (TBI). PRBC preferred (MICA credentialled). Tourniquet, haemostatic dressings, wound packing. Code Trauma activation."
  },

  traumatic_head_injury: {
    cpg: "A0803",
    title: "Traumatic Head Injury",
    careObjectives: [
      "Moderate-Severe TBI: Optimise airway patency, oxygenation, ventilation, and cerebral perfusion pressure to prevent secondary brain injury",
      "Mild TBI / other head injuries: — Identify high risk patients and triage to neurosurgical facility where possible — Identify moderate risk patients and transport to ED for CT or observation — Identify low risk patients and refer into the community with self-care advice"
    ],
    management: [
      "Oxygen: Target SpO2 94–98%. Avoid hypoxia AND hyperoxia.",
      "Ventilation: Target ETCO2 35–45 mmHg. Avoid hypocapnia.",
      "Bp: Target normal/supranormal MAP — counteracts elevated ICP. Avoid hypotension.",
      "Position: Head of stretcher 10–15° if no spinal precautions preclude it.",
      "Gcs: GCS reduction ≥2 points is significant. GCS <13 = significant TBI until proven otherwise."
    ],
    management_mica: [],
    notes: "Avoid hypotension (SBP >100, ideally >110). Avoid hypoxia (SpO2 >94%). Target ETCO2 35–45 (normocapnia). Head of bed 30° if no spinal concern. Mannitol/hypertonic saline (MICA) for herniation signs."
  },

  chest_injury: {
    cpg: "A0802",
    title: "Chest Injury",
    careObjectives: [
      "Adequate oxygenation",
      "Effective pain relief to assist in maintaining adequate ventilation",
      "Early identification and management of tension pneumothorax"
    ],
    management: [
      "Tension pneumothorax: Decompress as per CPG A0802 flowchart.",
      "Open wound: Do NOT cover open chest wounds unless there is significant haemorrhage — covering may worsen or cause tension pneumothorax. Leave wound open and monitor closely. Vented chest seals only if wound has already been sealed by other agencies.",
      "Pain: Adequate analgesia essential — pain limits ventilation. IV opioids + paracetamol.",
      "Rib: Monitor and supportive care. High index of suspicion for underlying pneumothorax."
    ],
    management_mica: [
      "Chest decompression by finger thoracostomy (where accredited) is recommended for intubated patients only.",
      "Finger thoracostomy is a sterile procedure. Consider potential delays due to preparation."
    ],
    notes: "Tension pneumothorax: needle decompression 2nd ICS MCL (ALS) or finger thoracostomy (MICA). Open chest wound: 3-sided chest seal. Flail: NIV + analgesia. Haemothorax: IV fluids cautiously. Rib fractures: analgesia priority. Tamponade: urgent transport."
  },

  spinal_injury: {
    cpg: "A0804",
    title: "Spinal Injury",
    careObjectives: [
      "Identify patients with suspected SCI and transfer them to the appropriate facility.",
      "To protect and support the integrity of the spinal column where SCI is suspected or unstable vertebral injury cannot be excluded.",
      "To avoid unnecessary immobilisation by clinically excluding patients without injury to the spinal column."
    ],
    management: [],
    management_mica: [],
    notes: "Manual in-line stabilisation. Cervical collar not mandatory if causes distress/airway compromise. Neurogenic shock: cautious fluids + vasopressors (MICA). Spinal board for extrication only. Avoid excessive neck extension."
  },

  burns: {
    cpg: "A0805",
    title: "Burns",
    careObjectives: [
      "To identify and manage potential airway burns as a priority",
      "To minimise the impact of injury by maintaining tissue and organ perfusion, minimising pain, appropriate burn wound cooling and minimising heat loss during transfer to hospital."
    ],
    management: [
      "Cooling: Running water 5–15°C for 20 minutes. Stop if shivering or temp ≤35°C. No ice/iced water. Dirty water avoided. Chemical burns: irrigate until pain resolves.",
      "Dressing: Cling wrap applied longitudinally (allows for swelling). Preferred for all burns.",
      "Heat loss: Normothermia is vital. Assess temperature early. Remove burnt/chemical clothing when safe — do not remove adhered matter.",
      "Fluids: Volume replacement calculated for burn only. Electrical burns: extra fluid for rhabdomyolysis risk.",
      "Analgesia: As per CPG A0501-1"
    ],
    management_mica: [],
    notes: "20 min cool running water. Rule of Nines for TBSA%. Parkland: 4 mL/kg/%TBSA Hartmann's (first 8 h from injury). Cling wrap after cooling. Analgesia. Inhalation injury: early intubation consideration. Consult Burns unit."
  },

  elderly_frail_non_injury_fall: {
    cpg: "A0808",
    title: "Elderly / Frail Non-Injury Fall",
    careObjectives: [],
    management: [],
    management_mica: [],
    notes: "Clinical Frailty Scale. Exclude medical cause. Long lie assessment. Ambulation Risk Assessment (A0112). Consider community referral pathways. Transport if injury, medical cause, or unfit for discharge."
  },

  wound_care: {
    cpg: "A0812",
    title: "Wound Care",
    careObjectives: [
      "Clean, close (where possible) and dress acute wounds",
      "Identify appropriate disposition: — Self-care for superficial non-contaminated closed wounds — Referral to primary care for superficial wounds requiring non-urgent review — Transport / self-present to ED for deep or complex wounds requiring urgent review"
    ],
    management: [],
    management_mica: [],
    notes: "Haemorrhage control: direct pressure, elevation, tourniquet for arterial bleeding. Wound assessment: depth, contamination, NV status. Irrigate with normal saline. Appropriate dressing. Refer for suturing if required."
  },

  fracture_dislocation: {
    cpg: "A0806",
    title: "Fracture / Dislocation",
    careObjectives: [
      "Haemorrhage control",
      "Realignment if gross deformity or neurological / vascular compromise"
    ],
    management: [],
    management_mica: [],
    notes: "Analgesia priority. Immobilise in position found (unless vascular compromise). Traction splint for femur shaft fractures. NV assessment before and after. Pelvic binder for pelvic fractures. Open fracture: sterile dressing. Ice/elevation."
  },

  anterior_shoulder_dislocation: {
    cpg: "A0811",
    title: "Anterior Shoulder Dislocation",
    careObjectives: [
      "Identify uncomplicated anterior shoulder dislocations",
      "Reduce the dislocation if appropriate",
      "Identify appropriate disposition: — Referral if uncomplicated, successful reduction — Transport if unsuccessful reduction or complications"
    ],
    management: [
      "A combination of methoxyflurane, fentanyl and paracetamol is recommended",
      "Informed consent is required prior to reduction. Principles of reduction",
      "Relaxation of the muscles: general reassurance, coaching to relax the shoulders & pain relief.",
      "Sustained pressure: continuous traction (BHM technique) or attempts at abduction/external rotation (Self-assisted Milch), allowing time for sufficient relaxation (approximately 5 minutes).",
      "Slow application: should be slow, involve constant reassurance and be controlled by the patient. Pause if there is muscle spasm or increased pain.",
      "One attempt.",
      "10 minute maximum duration.",
      "Use the technique most similar to what has worked previously: — BHM – traction — Self-assisted Milch – external rotation and abduction",
      "Gripping the knee, tucking the elbows towards the knees and relaxing the shoulders AND",
      "Leaning the chest, head and neck back as much as possible Full Procedure: CWI/OPS/202 Shoulder reduction - BHM Self-assisted Milch technique",
      "Use unaffected arm to raise the effected arm to above the head Full Procedure: CWI/OPS/203 Shoulder reduction – Self-assisted Milch Following reduction",
      "Successful reduction is indicated by: — Sudden reduction in pain — Change in shoulder shape (indicating the return of the humeral head to a normal position) — Improved range of motion: the reduction is successful if the patient can touch their opposite shoulder with the hand of the affected shoulder",
      "Support the shoulder with a sling Uncomplicated / successful reduction Self-care advice",
      "Rest: limit use of the arm, especially any movement involving raising it",
      "Ice: consider icing the shoulder if pain persists. 10-15 minutes, four times a day. May reduce pain but may delay healing.",
      "Paracetamol or ibuprofen for subsequent pain Safety netting",
      "Advise patient to seek immediate help if: — Abnormal distal neurovascular signs or symptoms in the subsequent days following reduction (numbness, changing colour) — Severe pain returns",
      "Provide Health Information Sheet Referral",
      "Non urgent follow-up is required (2-3 days)",
      "Appropriate dispositions may include: — GP — Existing physiotherapist / specialist Unsuccessful or complicated reduction",
      "Require transport to hospital.",
      "Neurovascular abnormalities at any stage should be considered a complication.",
      "Consider transport if other factors increasing the likelihood of complications are present: — Presence of patient safety risk factors. — Abnormally long dislocation duration close to the 24 hour cut off — Any uncertainty regarding the procedure (e.g. unexpected sounds, pain, etc) Documentation",
      "Case nature",
      "Secondary survey — Dislocation: site, time, mechanism of injury, history (initial/recurrent) — Neurovascular observations: Add two sets of entries with two different times (pre and post- reduction)",
      "Management: — Analgesia — VED (if utilized): consultation > Virtual ED — Reduction attempt > Shoulder reduction (technique), spontaneous (if the joint spontaneously relocates while in attendance), withheld, or refused.",
      "Final diagnosis: select the type of dislocation that applies",
      "Transport: — Referred to LMO/Locum: Use this for successful reductions where patient is referred to a GP. If VED is also consulted. Include “Virtual ED” in the management. — Referred to other provider: Use if referring the patient to physiotherapy or other specialist such as an orthopaedic surgeon."
    ],
    management_mica: [],
    notes: "FARES, Cunningham or Milch technique. Analgesia + methoxyflurane before procedure. Post-reduction NV assessment. Sling post-reduction. Check for associated fracture. Limited attempts if resistance."
  },

  patella_dislocation: {
    cpg: "A0809",
    title: "Patella Dislocation",
    careObjectives: [
      "Identify uncomplicated, isolated patella dislocation",
      "Reduce the dislocation if appropriate",
      "Identify appropriate disposition: — Referral if uncomplicated, successful reduction — Transport if unsuccessful reduction or complications"
    ],
    management: [],
    management_mica: [],
    notes: "Lateral dislocation most common. Extension of knee + medial push for reduction. Analgesia before procedure. NV assessment pre/post. Splint in extension post-reduction."
  },

  diving_related_emergencies: {
    cpg: "A0807",
    title: "Diving Related Emergencies",
    careObjectives: [
      "Supine or lateral positioning",
      "High-flow oxygen",
      "IV rehydration",
      "Transport to a hyperbaric facility"
    ],
    management: [
      "Reduces the effect of gravity on the mobility of gas emboli High-flow oxygen",
      "Oxygen must be delivered in the highest concentration possible to promote nitrogen off-gassing. This will likely be 15 LPM via non-rebreather mask or BVM IV rehydration",
      "Dehydration occurs frequently in diving. Rehydration of patients complements hyperbaric management in hospital.",
      "Recompression reduces the size of inert gas emboli and increases the partial pressure of oxygen delivered to the patient.",
      "It is no longer considered necessary to withhold opioid analgesia if the patient is in pain. Treat as per CPG A0501 Pain Relief. Non-recent dive (> 12 hours)",
      "Patients with a GCS of 15 who have been suffering symptoms for > 12 hours before calling can be kept on simple face mask, but still require transport to a recompression facility with their equipment.",
      "If cardiovascular or neurological symptoms are present, patient remains time-critical. Transport",
      "Dive computers: It is essential that any dive computers and gauges be transported to the recompression facility",
      "Destination: The only public recompression facility in Victoria is at the Alfred Hospital. There is also a facility at the Royal Adelaide Hospital",
      "Air transport: Helicopter transport at < 300 m (approx. 900 feet) altitude or pressurised fixed wing aircraft are the preferred options",
      "Consultation: Early consultation with the on-call hyperbaric physician at The Alfred Hospital can assist with paramedic decision making and provide early notification of hospital based services. Paramedics should have a low threshold for contacting The Alfred Hospital to discuss patient management. This can be done via the Clinician. Flowchart"
    ],
    management_mica: [],
    notes: "Decompression illness: 100% O2 continuous. Arterial gas embolism: supine, 100% O2. IV fluids. DAN (Divers Alert Network) or Hyperbaric Unit contact. Transport to recompression facility."
  },

  hypothermia_cold_exposure: {
    cpg: "A0901",
    title: "Hypothermia / Cold Exposure",
    careObjectives: [
      "To identify and appropriately manage hypothermic patients",
      "To minimise the risk of major trauma patients becoming hypothermic"
    ],
    management: [
      "All patients: Ambulance patient compartment target ≥24°C",
      "All patients: Remove wet clothes, dry patient, thermal protection",
      "All patients: Warm IV fluids via fluid warmer if available",
      "All patients: Do not microwave IV fluid bags",
      "Cardiac arrhythmias: Arrhythmias associated with <33°C. Gentle handling essential. Atrial arrhythmias/bradycardia resolve on rewarming — no antiarrhythmics unless decompensation. Defibrillation and cardioactive drugs may be ineffective at <30°C.",
      "Cardiac arrest: If temp <30°C, double interval between adrenaline and amiodarone doses (as per cardiac arrest CPG). VF may resolve spontaneously on rewarming."
    ],
    management_mica: [
      "Intubated hypothermic patients should have their temperature monitored with an oesophageal temperature probe where available.",
      "Intubated patients who are sedated and paralysed are at risk of becoming hypothermic and should have thermal management initiated once stabilised. Flowchart"
    ],
    notes: "Mild >32°C, moderate 28–32°C, severe <28°C. Remove wet clothing, insulate. Active rewarming for moderate/severe. Cardiac arrest <30°C: double drug intervals. ROSC unlikely >3 shocks at <30°C — ECMO transport if eligible."
  },

  hyperthermia_heat_stress: {
    cpg: "A0902",
    title: "Hyperthermia / Heat Stress",
    careObjectives: [
      "To identify and appropriately manage hyperthermic patients with an urgency relative to their presentation.",
      "The focus of treatment must be on aggressive cooling."
    ],
    management: [
      "Cooling: Strip / spray / fan. Vigorous active fanning required — passive AC inadequate. Ice bath if available (especially exertional). Target temperature <40°C within 30 minutes.",
      "Fluids: Cold IV fluid titrated to perfusion. Slower rate in elderly or impaired cardiac/renal function. Cold oral fluids if patient able.",
      "Position: Flat or lateral. Avoid head-up — worsens hypotension."
    ],
    management_mica: [],
    notes: "Heat exhaustion (no AMS) vs heat stroke (altered consciousness). Remove from heat, ice packs neck/groin/axillae, wet skin + fan. IV cold saline. Heat stroke: target <38.5°C within 30 min. Manage seizures and airway."
  },

  principles_of_toxicology: {
    cpg: "A0707",
    title: "Principles of Toxicology",
    careObjectives: [
      "Supportive care based on presenting symptoms",
      "Identify poison, toxin and / or toxidrome to guide specific management",
      "Consult relevant services to access specialist treatments",
      "Minimise the time from exposure to definitive care Notes",
      "A patient presentation following toxic exposure may occur in almost any setting and can vary from mild symptoms to life threatening. The toxic agent is not always known and accordingly a considered approach using these principles will assist in the assessment and care for the patient who is at risk of toxic exposure. Scene safety",
      "Assess risk of exposure to gases and other toxins by completing a dynamic risk assessment",
      "Consider the need for enhanced PPE. See WIN/OPS/198 Transport of Patients Exposed to Toxic Substances",
      "Consider the potential that this may be a deliberate event",
      "Do not enter scene where there is a threat of chemical, biological, radiological (CBR) exposure — Protect scene and prevent further exposure to others — Notify other emergency service agencies e.g. fire, rescue, police — Escalate response through the DM to the Regional Health Commander — Prepare for the potential for multi casualty event (e.g. Triage/Transport Officer, ETHANE SitRep) — Prepare to manage the patients who have been exposed",
      "Liaise with incident controller regarding appropriate decontamination"
    ],
    management: [
      "Minimise the time from exposure to definitive care — Definitive care may include access to specialist medicines and advanced interventions such as antidotes and antivenom, or intubation and ECMO. These may not be available at the closest hospital. Consider this in your decision making in cooperation with the AV Clinician, VPIC, and ARV / PIPER.",
      "Airway — Consider risk of aspiration or airway obstruction",
      "Breathing — Respiratory depression causing hypoventilation is common in agents that cause sedation and coma — Hyperventilation is the body’s respiratory compensatory mechanism for metabolic acidosis which is common in toxic ingestions.",
      "Circulation — May require management of shock including IV fluid and vasopressors where poor perfusion continues — Arrhythmias - approach will depend on the toxic agent. Consider VPIC consultation for administration of sodium bicarbonate in any patient with possible sodium channel blockade (e.g. wide QRS, arrythmias). In addition to tricyclic antidepressants, sodium channel blockade may occur in toxicity due to anaesthetics (including cocaine) and other cardiac sodium channel blocking agents such as propranolol.",
      "Cardiac Arrest — Follow cardiac arrest guidelines — Prolonged CPR and consideration of ECMO or hospital-based therapies should occur in all cases of witnessed cardiac arrest. — Some patients may benefit from early transport with mCPR to receive an antidote at hospital. — Consult early with VPIC and the AV Medical Advisor via the AV Clinician",
      "Consider the potential for delayed toxic effects of extended release (ER) formulation in assessment and care planning. Some extended-release formulations will produce immediate effects when the tablet is broken. Note: As well as extended-release formulation (ER or XR), other formulations include sustained release (SR), controlled release (CR), and enteric coated (EC) which is a type of delayed release (DR). These can all be considered modified release (MR) medicines. The terms do mean slightly different things but a cautious approach remains for all.",
      "Prolonged unconsciousness may lead to pressure related complications such as rhabdomyolysis which can cause hyperkalaemia. Consider clinical management in consultation with VPIC. Patient decontamination",
      "Decontamination using the fire service is ideal however not always required. If unsure about decontamination requirements, consult VPIC for advice.",
      "Decontamination should always be undertaken by fire services when: — The agent is unknown — The agent poses significant risk to others should decontamination be undertaken incorrectly (e.g. industrial chemicals) — Inadequate decontamination infrastructure is available on site.",
      "It is important that even when a patient is time critical that correct decontamination is undertaken as the transport of these patients pose a significant risk to staff and hospitals",
      "Decontamination required will depend on the agent and route of exposure",
      "Staff safety / prevent ongoing exposure — Move patient to safe location to minimise risk of staff exposure / further exposure to patient, e.g. move patient to well ventilated area / upwind / uphill. — Consider simple dry decontamination techniques such as removal of first layer of clothing and wipe down with paper towel.",
      "Gastrointestinal — Avoid inducing vomiting — Instruct patient not to eat or drink — Isolate contaminated vomit in clinical waste (if chemical exposure) — Hospital management may involve administration of activated charcoal for some ingestions.",
      "Eye exposure — Irrigate affected eye(s) for 15 minutes",
      "Skin exposure — Remove clothing and place in plastic bag — Wash skin / rinse mouth — If caustic / corrosive exposure, rinse skin with copious amounts of water or saline (consider using a shower if available) Antidotes / Antivenom",
      "Access to definitive care often means early access to an antidote or antivenom as soon as possible after exposure.",
      "If the antidote or antivenom is available in the out of hospital care environment, urgent administration by paramedics may be required and is permissible. Consult VPIC via the AV Clinician in these circumstances. Other management",
      "Provide supportive care as required (e.g. pain relief, anti-emetic).",
      "Patients presenting with withdrawal of drugs of dependance (including alcohol) may present with sweating, tremors, nausea / vomiting, agitation, mydriasis, lacrimation and/or convulsions.",
      "Benzodiazepines are considered first-line agents for symptoms of withdrawal. Consult VPIC for management advice. Monitoring",
      "Ongoing monitoring will be required for patients presenting with actual or potential toxic exposure.",
      "Cardiac monitoring and a minimum of 15 minutely observations will be required for most patients including: — BP, HR, resp rate, temp — SpO +/- capnography 2 Clinical advice and support",
      "The Victoria Poisons Information Centre (VPIC) is staffed by specialist pharmacist and toxicologists to assist in the assessment and care of patients who have potentially been exposed to toxic agents.",
      "Ambulance Victoria has a priority line to access VPIC services.",
      "Consult VPIC for: — Complex cases — High acuity (or high likelihood of deterioration in AV care) — Unfamiliar agents — Longer transport times for ongoing management advice such as IV fluid, medication, and ventilation advice.",
      "Consult VPIC directly or via the AV Clinician. Consider the following: — Consult VPIC directly – basic enquiry. e.g. unknown agent, unknown toxic potential. — Consult VPIC via the AV Clinician – More complex, high acuity. As well as needing VPIC expertise, these cases may need support from the AV Clinician such as destination advice, scope of practice variation, ARV, PIPER, and or AV Medical Advisor support.",
      "Illicit drug exposure is commonly experienced at events such as music festivals. These events are frequently supported by first aid facilities which may be staffed by skilled paramedics, nurses and medical specialists who may have access to life saving equipment (e.g. ice baths). Working in cooperation with these experts and their resources will optimise patient outcomes. Disposition",
      "Transport will be required for many patients who have had an intentional overdose for assessment and monitoring. Emergency department care usually includes screening via a blood test to assess for potentially harmful levels of ingested substances. This is particularly important where there is any risk that paracetamol has been ingested.",
      "Alternate pathways and mental health support may be considered in some circumstances including telehealth (TelePROMPT), community mental health teams and specialist mental health facilities."
    ],
    management_mica: [],
    notes: "VPIC (13 11 26) for complex/unknown toxicology. Resuscitation principles apply. Toxidrome recognition. Symptomatic management. Specific antidotes where available."
  },

  acute_alcohol_intoxication: {
    cpg: "A0726",
    title: "Acute Alcohol Intoxication (Ethanol)",
    careObjectives: [
      "Identify patients experiencing ethanol toxicity (acute alcohol intoxication) and the severity.",
      "Protect and support patient dignity.",
      "Manage symptoms as required.",
      "Identify appropriate disposition. — Low-moderate risk: Self-care or transport to sobering services (where available) — High risk: Transport to ED"
    ],
    management: [
      "Low moderate risk: Supportive care. Monitor. Consider sobering services.",
      "High risk: Transport to ED. Manage complications (airway, hypoglycaemia, seizure)."
    ],
    management_mica: [],
    notes: "Exclude medical causes (hypoglycaemia, head injury, sepsis, stroke). BGL mandatory. Airway protection — recovery position. Thiamine 100 mg IV if malnourished/Wernicke risk. SAT score monitoring. Do not assume AMS is alcohol alone."
  },

  alcohol_withdrawal_syndrome: {
    cpg: "A0727",
    title: "Alcohol Withdrawal Syndrome",
    careObjectives: [
      "Identify patients experiencing, and assess the severity of, alcohol withdrawal syndrome",
      "Symptomatic management",
      "Reduce risk of progression to severe alcohol withdrawal",
      "Identify appropriate disposition: — Mild and moderate alcohol withdrawal, without features associated with complex withdrawal: community-based withdrawal management — — Moderate alcohol withdrawal with features associated with complex withdrawal or severe alcohol withdrawal: paramedic transport to ED"
    ],
    management: [
      "Antiemetic: As per N&V CPG",
      "Analgesia: As per Pain Relief CPG",
      "Benzodiazepines: Significant distress and/or agitation",
      "Benzodiazepines: Rousable drowsiness (SAT 0 or -1). Avoid heavy sedation (SAT -2 or -3).",
      "Benzodiazepines: Midazolam IV preferred. IM same dose if IV access challenging in severe withdrawal.",
      "Benzodiazepines: Symptom-based dosing minimises dose and respiratory depression risk"
    ],
    management_mica: [],
    notes: "AWS onset 6–24h from last drink. Seizures 6–48h. Delirium tremens 24–72h. Diazepam/midazolam for severe AWS/seizures. Thiamine 200–500 mg IV before any dextrose. IV fluids. Urgent transport."
  },

  beta_blocker_toxicity: {
    cpg: "A0717",
    title: "Beta-Blocker Toxicity",
    careObjectives: [
      "Targeted management of bradycardia and inadequate perfusion",
      "Early consultation with VPIC, particularly if co-ingestion with other medications, refractory hypotension, or arrhythmias",
      "Supportive management of hypoglycaemia and seizures"
    ],
    management: [
      "Atropine: Treat bradycardia with IV fluids and atropine. Administer through a free-running IV line. An adequate response is not common — further doses may delay progression to other care. If patient initially responds but effect not sustained: repeat 600 mcg to a max total of 3000 mcg.",
      "Fluid resuscitation: Normal Saline titrated to response. Standard max 2000 mL, fluid overload risk max 1000 mL.",
      "Hypoglycaemia: Treat as per Hypoglycaemia CPG",
      "Seizures: Midazolam as per Seizures CPG",
      "Ecmo: Consider ECMO centre transport if severe cardiogenic shock or cardiac arrest — consult VPIC",
      "Consultation: VPIC early — especially co-ingestion, refractory hypotension, arrhythmias"
    ],
    management_mica: [],
    notes: "Bradycardia + hypotension. Atropine (usually ineffective but give). Calcium gluconate. Glucagon 5 mg IV. High-dose insulin-euglycaemia: MICA consult. Vasopressors (MICA). Lipid emulsion therapy (MICA). VPIC consult."
  },

  calcium_channel_blocker_toxicity: {
    cpg: "A0718",
    title: "Calcium Channel Blocker Toxicity",
    careObjectives: [
      "Targeted management of bradycardia and inadequate perfusion.",
      "Early administration of calcium gluconate.",
      "Early consultation with VPIC to guide management."
    ],
    management: [
      "Calcium gluconate: 10% Calcium Gluconate 30 mL (3 g) IV over 3–5 min. Repeat once if inadequate response.",
      "Atropine: 600 mcg IV. Atropine often inadequate in CCB toxicity — do not delay calcium for atropine. Max total 3000 mcg if patient initially responds but not sustained.",
      "Fluids: Normal Saline titrated. Standard max 2000 mL, fluid overload max 1000 mL.",
      "Consultation: VPIC early. For cardiac arrest — consider mechanical CPR to closest ED (consult VPIC).",
      "Note: Graduated approach: calcium → IV fluids → vasopressors/inotropes"
    ],
    management_mica: [
      "Inadequate and extremely poor perfusion requires a graduated approach which includes calcium, IV fluids and vasopressors / inotropes."
    ],
    notes: "Bradycardia + hypotension (diltiazem/verapamil). Calcium gluconate IV. Atropine. Glucagon. High-dose insulin euglycaemia (MICA). Vasopressors (MICA). Lipid emulsion (MICA). VPIC consult."
  },

  corrosive_agent_exposure: {
    cpg: "A0730",
    title: "Corrosive Agent Exposure",
    careObjectives: [
      "Personal safety",
      "Early decontamination",
      "Stabilise systemic toxicity",
      "Pain management",
      "Monitor for deterioration",
      "Consider specialist care via burns center"
    ],
    management: [
      "Remove clothing and wash skin with soap and water",
      "Rinse mouth with clean water unless at risk of swallowing e.g. children <12 years, altered conscious state, confused.",
      "Irrigate eyes with clean water or saline if ocular exposure",
      "Do not encourage vomiting. Do not insert an orogastric or nasogastric tube. The gastrointestinal lining may be fragile, increasing the risk of perforation. Limited water or large numbers of patients – dry decontamination",
      "Where there are large numbers of patients or where there is limited access to water, use a cloth or dry paper towel to wipe off contaminant (known as dry decontamination)",
      "Do not use this technique if there are obvious signs of burns or skin irritation. Airway and Breathing",
      "Dermal exposures — Apply calcium gluconate gel liberally to the exposure site. Place hand in latex glove with the gel for treatment of hand / finger exposure. — Some industrial sites may have a prepared calcium gluconate gel available on site. If not, mix 10 mL 10% calcium gluconate IV preparation with 30 mL lubricating gel. — Where lubricating gel is in limited supply, apply a Calcium gluconate compress: Soak gauze in calcium gluconate 10% solution and apply to the affected area. Note that once the gauze is dry it will become ineffective. — ALS Paramedics may initiate this therapy where calcium is available. — In rare and extreme cases, VPIC may recommend subcutaneous infiltration of calcium gluconate. Follow VPIC care advice in these circumstances. Further information",
      "Subcutaneous infiltration of calcium gluconate may be considered for severe hydrofluoric acid burns as it neutralises toxic fluoride ions that penetrate deep tissues, preventing further necrosis and relieving intense pain.",
      "The procedure involves injecting calcium gluconate into the affected area using subcutaneous injections, targeting approximately 0.5 mL per cm² of burned tissue using a fine-gauge needle.",
      "This procedure must not be performed on fingers",
      "Systemic fluorosis. — Symptoms of fluorosis include hypotension, seizure, ventricular arrhythmias and cardiac arrest. — Manage as per flowchart. — Cardiac arrest — 30 mL Calcium gluconate 10% IV (slow push) every 5 minutes until ROSC — Magnesium sulfate 2.5 g (10 mmol) IV (slow push) every 5 minutes until ROSC Paraquat Apply the following measures in addition to the above approach.",
      "Decontamination: — Immediate food if tolerated Food can act as a binding substance limiting the body’s absorption. Food is not recommended for other corrosive agent management, paraquat exposure is an exception. — Activated charcoal 50 g where available",
      "Pulmonary toxicity is exacerbated by oxygen – avoid oxygen therapy unless hypoxic (defined as less than 90%), targeting Sp02 85-88%.",
      "Transfer immediately to hospital and pre-notify Button Battery",
      "Definitive assessment and management includes x-ray and endoscopic removal if lodged in airway or oesophagus. This should occur within 2 hours to prevent severe burns.",
      "Some battery brands release a blue dye when ingested which may be visible on the patient’s hands or mouth.",
      "Decontamination is not required.",
      "If honey is available, give 10 mL every 10 minutes (child aged > 1 year), however do not delay transport to ED. Disposition",
      "Consult VPIC via the AV Clinician for care planning advice where specialist services may be required or community-based care is being considered. Identification Yourself: Name and role (e.g. ALS, MICA). Patient: age and sex. Mechanism Agent. Illness Dose, route, timing for each agent. Intent (if relevant). Signs / Symptoms Clinical findings, vital signs, and trajectory. Treatment Care provided prior to consultation. Consider risk of undisclosed agent and co-ingestants",
      "Exposure to corrosive agents such as hydrofluoric acid and paraquat and suspicion of button battery ingestion will require emergency department assessment and management. Consider the need for intensive care and advanced therapies such as haemodialysis in consultation with VPIC and ARV."
    ],
    management_mica: [
      "If there are signs of upper airway injury with oedema, stridor or obstruction, early intubation is indicated before life-threatening deterioration occurs.",
      "Corrosive agents causing inhalation injury may include oedema to the airways and may present in non-cardiac pulmonary oedema. Commence CPAP / BiPAP NIV therapy using the same approach as CPG A0604 Dyspnoea. Pulmonary oedema indicates a poor prognosis and may lead to further deterioration. Accordingly, escalate care and prepare for intubation. Hydrofluoric acid Apply the following measures in addition to the above approach."
    ],
    notes: "Decontamination: remove clothing, copious water ≥20 min. Do not neutralise. Eye: minimum 20 min irrigation. Ingestion: do not induce vomiting, small sips water. Inhalation: O2, remove from source. Early airway assessment. VPIC consult."
  },

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
      "Antidote: Hydroxocobalamin (Cyanokit) — binds cyanide ions, allows renal excretion",
      "Antidote: 5 g in glass vial, reconstituted with 200 mL normal saline. Given IV.",
      "Antidote: NOT standard AV supply. May be available at high-risk industrial sites.",
      "Antidote: Early administration essential — rapid deterioration risk",
      "Supportive: Oxygen (100%), IV fluids, vasopressors if required",
      "House fires: Always consider concurrent carbon monoxide poisoning"
    ],
    management_mica: [],
    notes: "House fire + altered consciousness + refractory hypoxia = suspect cyanide. 100% O2. Hydroxocobalamin 5 g IV (MICA). Remove from source. Do not mouth-to-mouth. VPIC consult."
  },

  drug_induced_hyperthermia: {
    cpg: "A0719",
    title: "Drug Induced Hyperthermia",
    careObjectives: [
      "Early identification",
      "Control temperature - sedate, cool, hydrate",
      "Supportive care"
    ],
    management: [
      "Mild: Monitor for deterioration. Reduce stimulus — calming environment. Transport.",
      "Moderate: Midazolam — reduces physical activity/tremor/clonus contributing to hyperthermia AND manages ABD. Do NOT use physical restraints without sedation.",
      "Moderate: Active cooling — strip/spray/fan. IV fluids.",
      "Moderate: VPIC via AV Clinician",
      "Severe: Midazolam — titrate to effect",
      "Severe: Aggressive active cooling. Ice bath if available.",
      "Severe: VPIC mandatory"
    ],
    management_mica: [
      "More severe serotonin toxicity with symptoms of progressive hyperthermia, rigidity and seizures is life-threatening. Sedation and rapid cooling are the care priorities. Intubation may be required to assist in cooling the patient or due to airway/ventilation/oxygenation compromise."
    ],
    notes: "Serotonin syndrome vs NMS vs anticholinergic vs stimulant. Aggressive cooling. Midazolam for agitation/rigidity. Avoid haloperidol/droperidol in NMS. VPIC consult. RSI (MICA) for refractory agitation + hyperthermia."
  },

  envenomation: {
    cpg: "A0714",
    title: "Envenomation",
    careObjectives: [
      "Patient history alone is enough to suspect envenomation",
      "Effective PBI if required – limit patient movement (bandage and splint)",
      "Transport patient urgently to appropriate destination – consider consulting with ARV/PIPER"
    ],
    management: [
      "Contact ARV / PIPER via Clinician for management advice.",
      "In the case of a patient who is symptomatic after a suspected or confirmed snake bite, if transport time > 30 minutes to ED consult early with ARV to facilitate transport of the patient to an appropriate destination for anti-venom.",
      "Caring for the patients in the hours following envenomation (e.g. including inter-hospital transfer care) will include monitoring for signs of coagulopathy (bleeding from bite site or cannulae) and renal impairment. This may include measuring urine output where possible. Paediatrics",
      "Envenomation should be considered when faced with a paediatric patient with sudden unexplained illness",
      "Children are at high risk due to venom / body weight ratios. Antivenom",
      "Once approved by ARV / PIPER, you may be required to initiate snake antivenom. Follow administration advice from ARV / PIPER which may include the following: — Maintain first aid including PBI — Closely monitor vital signs — IV access x 2 is optimal. Connect IV fluid (TKVO or OFF) and prepare IV Adrenaline in case of anaphylaxis response to antivenom — Draw up the antivenom recommended by the toxicologist (via ARV / PIPER) and add it into a new bag of Sodium Chloride 0.9% 500 mL — Administer the full 500 mL via a separate IV giving set over 20-30 mins — ​ There is a risk of anaphylaxis following antivenom administration. If detected, stop the infusion discuss ongoing patient care Flowchart"
    ],
    management_mica: [],
    notes: "Snake/funnel-web spider: pressure immobilisation bandage (PIB), splint limb. Red-back: cold pack (not PIB). Box jellyfish: vinegar. Anaphylaxis protocol if systemic reaction. VPIC consult. Antivenom: hospital only."
  },

  opioid_toxicity: {
    cpg: "A0722",
    title: "Opioid Toxicity",
    careObjectives: [
      "Airway patency and adequate ventilation",
      "Reverse opioid action sufficiently to permit adequate spontaneous respiration without causing opioid withdrawal"
    ],
    management: [
      "Airway: BVM ventilation first. Position patient. Suction if needed.",
      "Naloxone_heroin: 0.4 mg IV/IM. Titrate to adequate respiration (not full reversal — avoid precipitating withdrawal and aggression). May repeat. Duration 30–45 min — shorter than most opioids.",
      "Naloxone_other: Smaller titrated doses. Higher risk of rebound toxicity with long-acting opioids (methadone, slow-release oxycodone).",
      "Naloxone_ c i: Do NOT give naloxone following opioid-associated cardiac arrest (maintain ventilation). Do NOT give after head injury.",
      "Referral: Isolated heroin: may be left with carer if complete reversal and carer present for 4 hours + take-home naloxone."
    ],
    management_mica: [],
    notes: "Triad: miosis, respiratory depression, decreased consciousness. Naloxone: IV 400–800 mcg titrated (avoid full reversal). IM 800 mcg if no IV. IN 800 mcg each nostril. Assisted ventilation priority over naloxone. Reassess frequently — naloxone shorter duration than most opioids."
  },

  organophosphate_toxicity: {
    cpg: "A0709",
    title: "Organophosphate Toxicity",
    careObjectives: [
      "Recognise organophosphate toxicity / cholinergic toxidrome",
      "Ensure scene safety and provide decontamination where required",
      "Administer atropine and ensure sufficient supply Notes"
    ],
    management: [
      "Decontamination: Remove clothing → plastic bag. Wash skin with soap and water. Isolate emesis. Adequate ventilation.",
      "Atropine: Any muscarinic effects present",
      "Atropine: Atropine IV every 5 minutes, doubling previous dose: 1200 mcg → 2400 mcg → 4800 mcg etc. Up to 25 mg. Paediatric: 50 mcg/kg doubling same pattern.",
      "Atropine: Drying of secretions, not HR or pupil size",
      "Atropine: 10–20% of total atropine used, per hour (consult VPIC via AV Clinician)",
      "Support care: Airway, seizures (midazolam), fluids",
      "Consultation: VPIC via AV Clinician for inadequate response or complex presentations"
    ],
    management_mica: [
      "An atropine infusion is usually required following adequate atropinisation at a dose of 10 - 20% of total atropine used, per hour. Consult VPIC via the AV Clinician to establish appropriate infusion regimen. Antidote - Other",
      "Pralidoxime or Obidoxime may be available in some locations. Not routinely used. Consult VPIC. Airway",
      "Administer atropine prior to intubation. Inadequate Perfusion"
    ],
    notes: "SLUDGE/DUMBELS toxidrome. PPE mandatory (secondary contamination). Decontamination. Atropine 2–4 mg IV (repeat until secretions dry). Pralidoxime (MICA): early. Benzodiazepines for seizures. VPIC consult."
  },

  quetiapine_toxicity: {
    cpg: "A0721",
    title: "Quetiapine Toxicity",
    careObjectives: [
      "Airway management",
      "Management of inadequate perfusion"
    ],
    management: [
      "General: Supportive care is mainstay. Notify hospital early even when symptoms not yet severe.",
      "Inadequate perfusion: IV fluids first line",
      "Inadequate perfusion: Metaraminol or noradrenaline as first-line vasopressors if hypotension persists",
      "Inadequate perfusion: Adrenaline with caution (may worsen hypotension via beta-mediated vasodilation) — only after VPIC consultation",
      "Inadequate perfusion: Cardiac arrest: adrenaline as per Medical Cardiac Arrest CPG",
      "Airway: Monitor closely. Intubate if unable to protect airway."
    ],
    management_mica: [
      "Metaraminol or noradrenaline can be used as first-line vasopressors if hypotension persists."
    ],
    notes: "Sedation, hypotension, tachycardia, QTc prolongation. Airway management priority. IV fluids for hypotension. Vasopressors (MICA) if refractory. Avoid QTc-prolonging drugs. Sodium bicarbonate for wide QRS (MICA). VPIC consult."
  },

  tricyclic_antidepressant_toxicity: {
    cpg: "A0723",
    title: "Tricyclic Antidepressant Toxicity",
    careObjectives: [
      "Management of tricyclic antidepressant (TCA) toxicity with Sodium Bicarbonate.",
      "Supportive management of airway, perfusion, and seizures. Notes"
    ],
    management: [
      "Indications for Sodium Bicarbonate: QRS widening, hypotension, ventricular arrhythmias (NOT QT prolongation alone)",
      "Sodium Bicarbonate 8.4%: 1–2 mL/kg (up to 100 mL) IV every 3–5 min. Max total 6 mL/kg. Aim pH 7.50–7.55 if iSTAT available. Max 2 doses without consult.",
      "Pre-intubation: Give 100 mL NaHCO3 IV just prior to intubation to limit acidosis",
      "Seizures: Midazolam as per seizures CPG"
    ],
    management_mica: [
      "Metabolic acidosis worsens TCA toxicity. In patients with severe TCA toxicity who are intubated and ventilated, hyperventilation with a ETCO target of 25 - 30 mmHg is recommended. 2 Seizure control",
      "Prepare for intubation. Cardiac arrest",
      "Metaraminol and / or Noradrenaline if inadequate perfusion persists (adult patients only).",
      "Metaraminol boluses may be continued if there is a delay to noradrenaline infusion or adequate infusion pumps are not available. Noradrenaline",
      "Do not bolus noradrenaline under any circumstance. Adrenaline",
      "Adrenaline is indicated as a third line vasopressor/inotrope where the patient remains hypotensive despite IV fluid, sodium bicarbonate (2 doses), metaraminol and noradrenaline management. See CPG A0705 Shock."
    ],
    notes: "QRS >120ms = severe. Sodium bicarbonate 8.4% 100 mL IV for QRS >120 or hypotension (MICA). Midazolam for seizures. Amiodarone contraindicated. Vasopressors (MICA). VPIC consult."
  },

  the_maternity_patient: {
    cpg: "M0101-1",
    title: "The Maternity Patient",
    careObjectives: [],
    management: [
      "Field: Supportive care. Early hospital notification. Consult PIPER via Clinician or 1300 137 650.",
      "Iht_mica only: 10 mg oral, repeat after 30 minutes if inadequate",
      "Iht_mica only: 4 g IV over 10–15 min loading (or IM). Maintenance 1 g/hr for ≥24 hrs post-delivery or last seizure. Dedicated line + controlled infusion device + ECG monitoring.",
      "Iht_mica only: 20 mg IV over 2 min. Repeat every 10 min to max 300 mg. Or 20–160 mg/hr infusion.",
      "Iht_mica only: 5–10 mg IV bolus"
    ],
    management_mica: [],
    notes: "Physiological changes: HR↑15-20, BP↓5-15 mmHg, increased RR, GFR↑. SAMPLE + obstetric history. Left lateral tilt ≥20 weeks. IV access. Two patients: maternal wellbeing = fetal wellbeing. PIPER early for high-risk maternity."
  },

  antepartum_haemorrhage: {
    cpg: "M0201",
    title: "Antepartum Haemorrhage",
    careObjectives: [],
    management: [],
    management_mica: [],
    notes: "Placenta praevia vs abruption. Do NOT perform vaginal examination. IV fluids. O2. Urgent transport to maternity unit. Massive APH: haemorrhagic shock management."
  },

  pre_eclampsia_eclampsia: {
    cpg: "M0202",
    title: "Pre-eclampsia / Eclampsia",
    careObjectives: [],
    management: [
      "Field: Supportive care. Early hospital notification. Consult PIPER via Clinician or 1300 137 650.",
      "Iht_mica only: 10 mg oral, repeat after 30 minutes if inadequate",
      "Iht_mica only: 4 g IV over 10–15 min loading (or IM). Maintenance 1 g/hr for ≥24 hrs post-delivery or last seizure. Dedicated line + controlled infusion device + ECG monitoring.",
      "Iht_mica only: 20 mg IV over 2 min. Repeat every 10 min to max 300 mg. Or 20–160 mg/hr infusion.",
      "Iht_mica only: 5–10 mg IV bolus"
    ],
    management_mica: [],
    notes: "Pre-eclampsia: BP ≥140/90 after 20 weeks + proteinuria/end-organ. Eclampsia: seizures in pre-eclampsia. Magnesium sulphate for seizures (MICA). Left lateral. Urgent transport to maternity unit."
  },

  normal_birth: {
    cpg: "M0301",
    title: "Normal Birth",
    careObjectives: [],
    management: [
      "If birth imminent with crowning: encourage pushing — prepare for newborn resuscitation",
      "Otherwise: relieve cord compression — elevate presenting part off cord manually",
      "Minimise cord handling — vasospasm/contraction risk",
      "Urgent transport to obstetric facility with surgical capability (C-section preferred delivery method)",
      "PIPER consult via Clinician or 1300 137 650"
    ],
    management_mica: [],
    notes: "Controlled delivery of head. Support perineum. Check cord around neck. Delayed cord clamping 1–3 min. Dry, warm, stimulate newborn. Assess and resuscitate. Third stage: oxytocin (MICA) after delivery."
  },

  breech_compound: {
    cpg: "M0302",
    title: "Breech / Compound",
    careObjectives: [],
    management: [
      "If birth imminent with crowning: encourage pushing — prepare for newborn resuscitation",
      "Otherwise: relieve cord compression — elevate presenting part off cord manually",
      "Minimise cord handling — vasospasm/contraction risk",
      "Urgent transport to obstetric facility with surgical capability (C-section preferred delivery method)",
      "PIPER consult via Clinician or 1300 137 650"
    ],
    management_mica: [],
    notes: "Do not pull on breech baby. Support body as it delivers. Head delivery: Mauriceau-Smellie-Veit manoeuvre if entrapped. Compound: reduce prolapsed limb if possible. Urgent transport."
  },

  preterm_labour: {
    cpg: "M0303",
    title: "Preterm Labour",
    careObjectives: [],
    management: [
      "There is a high possibility of abnormal presentation.",
      "Tocolytics are drugs intended to suppress premature labour. They are contraindicated in the setting of massive maternal haemorrhage (APH) and pregnancy induced hypertension (pre-eclampsia / eclampsia).",
      "Consider transporting patient semi-prone with hips elevated over folded towels in order to take pressure off amniotic sac. Inter hospital transfer",
      "Some women may be receiving tocolytics to suppress preterm labour. This may include pharmacotherapy including: Nifedipine",
      "The drug of choice. Initial dose of up to 20 mg orally given by hospital. Monitor for adverse reaction prior to transport. Can repeat if contractions persist after 30 minutes. Ongoing monitoring of blood pressure and pulse is required. GTN Patch 50 mg (0.4 mg/hour) transdermal",
      "Placed on abdomen. A further 50 mg (0.4 mg/hour) patch may be added after 1 hour if contractions persist (maximum dose 100 mg in 24 hours).",
      "A 50 mg Transiderm patch delivers 10 mg per 24 hours at 0.4 mg/hour. Obstetric services may quote 10 mg patch instead of 50 mg as actual dose being delivered. Contact PIPER via Clinician or on 1300 137 650 for advice Flowchart"
    ],
    management_mica: [],
    notes: "<37 weeks gestation. Notify receiving hospital early. Prepare for high-risk newborn if imminent delivery. IV access. PIPER for <28 weeks."
  },

  cord_prolapse: {
    cpg: "M0304",
    title: "Cord Prolapse",
    careObjectives: [],
    management: [
      "If birth imminent with crowning: encourage pushing — prepare for newborn resuscitation",
      "Otherwise: relieve cord compression — elevate presenting part off cord manually",
      "Minimise cord handling — vasospasm/contraction risk",
      "Urgent transport to obstetric facility with surgical capability (C-section preferred delivery method)",
      "PIPER consult via Clinician or 1300 137 650"
    ],
    management_mica: [],
    notes: "Manual elevation of presenting part off cord. Knee-chest or Trendelenburg. Wrap cord in warm moist dressing. IV access. Signal 1 to maternity unit. Continuous monitoring if possible."
  },

  shoulder_dystocia: {
    cpg: "M0305",
    title: "Shoulder Dystocia",
    careObjectives: [],
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
    management_mica: [],
    notes: "Turtle sign = shoulder dystocia. HELPERR: Help, Episiotomy, Legs McRoberts, Pressure suprapubic, Enter, Remove posterior arm, Roll. McRoberts + suprapubic pressure first. No fundal pressure. Limited traction on head."
  },

  the_newborn_baby: {
    cpg: "N0101",
    title: "The Newborn Baby",
    careObjectives: [
      "Establish and maintain effective respiration",
      "Prevent hypothermia",
      "Transport to appropriate facility"
    ],
    management: [
      "Where the newborn is vigorous, dry the newborn and place the newborn naked, skin-to-skin on the mother’s chest. Dry the head and place a beanie. Cover both mother and newborn with warm blankets/towels. Newborns lose heat via the large surface area of their head and by evaporation from their wet bodies.",
      "Where resuscitation is required, the newborn should be placed on a warm, flat surface. Dry the head and place a beanie. Ensure the environment is appropriately warm. Bubble wrap may be placed over the newborn’s body to maintain warmth. NB. Chemical self-warming blankets must not to be used to warm neonates. Preterm infants",
      "Preterm infants may experience greater difficulty in establishing and maintaining effective respiration due to incomplete maturity of the lungs.",
      "All newborns are vulnerable to hypothermia. Preterm newborns are especially vulnerable. Hypothermia is an independent predictor of poor outcomes and should be aggressively prevented.",
      "The ideal order of steps varies depending on gestational age and whether the birth was witnessed. — Term / preterm (32 - 42 wks): Place the newborn skin to skin on mother, simultaneously dry them, cover with fresh towels / blanket or bubble wrap, place a beanie. — — Very Preterm (< 32 wks), witnessed: Leave the newborn wet as the remaining fluid remains warm and will assist in maintaining the newborn’s temperature. Place them straight into a polyethylene bag with a hole pre-cut for the head, dry head and place a beanie. — Very Preterm (< 32 wks), unwitnessed: Dry the newborn as the remaining fluid is likely now cold and should be removed to assist in maintaining temperature. Place them in a polyethene bag with a hole pre-cut for the head and place a beanie. Suction",
      "Routine suction is not required in vigorous newborns, even if the infant was born through meconium stained amniotic fluid. Newborns generally clear their own airways very effectively. Excessive suctioning may delay onset of respiration and induce bradycardia. Suction is only indicated when airway obstruction is suspected. Cutting the cord",
      "Vigorous newborn: Cutting the cord in the vigorous newborn is not urgent. Wait until the cord has stopped pulsating (approximately 1-2 minutes) unless parental preference is to remain attached (e.g. Lotus birth)",
      "Non vigorous newborn: Paramedics should prioritise resuscitation (e.g. IPPV). Cutting the cord earlier may be required to facilitate resuscitation if access to the newborn is compromised by the intact cord. Tertiary Centres",
      "Monash Children’s Hospital (MCH), Mercy Hospital for Women (MHW), Royal Women’s Hospital, Parkville (RWH), Royal Children’s Hospital (RCH) or Joan Kirner Women’s and Children’s Hospital.",
      "Paramedics should consult with PIPER where transfer time to a tertiary centre is prolonged. Transfer to a closer hospital followed by retrieval by PIPER may be appropriate. Flowchart APGAR APGAR scores should not be used as a guide for resuscitation. The time intervals used for resuscitation are contained elsewhere within this CPG. The APGAR should be conducted at 1 minute and 5 minutes post birth, then repeated at 5 minute intervals until APGAR score > 7. 0 1 2 Appearance Blue / pale Body pink, extremities blue Totally pink Pulse Absent < 100 > 100 Grimace None Grimaces Cries Activity Limp Extremity flexion Active motion Respiratory Effort Absent Weak / gasping / ineffective Strong cry 7 - 10 Satisfactory 4 - 6 Respiratory depression, may require ventilation 0 - 3 Requires ongoing resuscitation"
    ],
    management_mica: [],
    notes: "Apgar at 1 and 5 min. Normal: dry, warm, stimulate. Vitamin K (MICA). Hypoglycaemia: BGL <2.6 mmol/L. Meconium: do not suction unless obstructed. Temperature maintenance critical."
  },

  newborn_resuscitation: {
    cpg: "N0201",
    title: "Newborn Resuscitation",
    careObjectives: [
      "Temperature: Maintain normothermia.",
      "Ventilation: Establish and maintain effective ventilation.",
      "Escalation of care: Seek early backup, expert advice and ensure transport to a facility appropriate for the patient’s acuity."
    ],
    management: [],
    management_mica: [],
    notes: "30 sec: warm, dry, stimulate. If not breathing: 5 inflation breaths (30 cmH2O, 2–3 sec). Compressions if HR <60 after ventilation. 3:1 ratio. Adrenaline 10–30 mcg/kg IV if HR <60 despite. Glucose 10% 2 mL/kg if hypoglycaemic. PIPER early notification."
  },

  paediatric_assessment: {
    cpg: "P0101-1",
    title: "Paediatric Assessment",
    careObjectives: [],
    management: [
      "In the majority of guidelines, the separation between adult and paediatric management is defined by the age threshold of < 16 years. There are limited exceptions to this, outlined in table 1. Table 1: Summary of age thresholds 18 Age ← 10 11 12 13 14 15 16 17 → Adult CPGs / Most CPGs / CPPs Paediatric CPGs / CPPs CPPs Paediatric Airway / ETT Airway CPGs Adult Airway / ETT CPGs CPGs Emergency Paediatric Adult Department Major Trauma Royal Children's Hospital RMH / Alfred Destination",
      "Paediatric drug doses are calculated by weight to adjust for anatomical and physiological changes in a developing child.",
      "For specific management of the newborn, refer to appropriate newborn guidelines.",
      "Caregiver level of concern is a valid symptom when assessing a child and it should not be discounted. Consider asking how the child is different from normal and whether the caregiver feels they are getting better or worse since calling AV.",
      "Assessment should consider the clinical trajectory of the child – at which point in their illness or injury are Paramedics encountering them? Are they likely to improve or deteriorate from this point?",
      "Children generally suffer cardiac arrest following a period of circulatory or respiratory insufficiency. If these conditions are recognised and treated promptly, cardiac arrest may be avoided.",
      "The RCH will accept any patient up to and including the age of 15 years and is the destination of choice for trauma and burns in this age range. If the patient has a relevant past history at RCH, they will accept patients up to and including the age of 18 years.",
      "If the management recommended in these guidelines is not successful or if further guidance is required, consult the AV Clinician.",
      "Paediatric Infant Perinatal Emergency Retrieval (PIPER – formerly NETS, PETS and PERS) can also be accessed via the Clinician or on 1300 137 650 for clinical advice or support.",
      "Children presenting with abnormal vital signs must be transported to hospital.",
      "Rarely, paediatric patients may present with stroke or pain insufficiently managed by a palliative care program. The following adult CPGs contain information relevant to these patients and may be applied to paediatric patients following consultation with AV Clinician: — CPG A0711 Stroke / TIA — CPG A0712 Palliative Care Paediatric Assessment Triangle",
      "The Paediatric Assessment Triangle provides an accurate method for a simple “first impression” assessment to guide urgency of care, particularly for non-verbal children. It can be conducted rapidly and without equipment. If the patient exhibits abnormal findings then proceed immediately to the primary survey.",
      "Look at and listen to the child to rapidly estimate their level of criticality. This assessment should take no more than a few seconds. Criteria Well child Unwell child Tone Active, reaching, moving, strong grip Still, floppy, quiet Interactivity Interested in the environment, looking, smiling Not interested in their surroundings Consolability Easily comforted/consoled Inconsolable Look/gaze Looks at caregivers or items of interest Staring, not engaging in eye contact Speech/cry Cries Moaning, grunting or quiet Adapted from “Detect Junior: The Paediatric Approach”, Clinical Excellence Commission NSW, 2012"
    ],
    management_mica: [],
    notes: "PAT: Appearance, Work of Breathing, Circulation to skin. Age-appropriate vital signs. Broselow tape for weight. GCS modified for age. Involve parents."
  },

  paediatric_resuscitation: {
    cpg: "P0001",
    title: "Paediatric Resuscitation",
    careObjectives: [
      "Provide oxygen therapy for patients with hypoxaemia or critical illness as required",
      "Provide continuous high flow oxygen regardless of SpO for management of specific conditions 2 where required"
    ],
    management: [
      "Oxygen is a treatment specifically for hypoxaemia and has no impact on the sensation of breathlessness in patients without hypoxaemia.",
      "Administer oxygen to achieve the target SpO while continuously monitoring for changes in 2 condition.",
      "Oxygen should not be administered unless indicated as it may be harmful.",
      "The potential risks due to hyperoxaemia with high-concentration oxygen therapy include: — Respiratory (increased PaCO , absorption atelectasis and direct pulmonary toxicity), 2 — Cardiovascular (increased systemic vascular resistance and blood pressure, reduced coronary artery blood flow, reduced cardiac output), — Cerebrovascular (reduced cerebral blood flow) effects and increased reperfusion injury due to increased reactive oxygen species.",
      "In patients who are acutely short of breath or have a critical illness, prioritise administering oxygen before assessing SpO . Oxygen can later be titrated to the target saturation range. 2",
      "If pulse oximetry is not available or unreliable, oxygen can be provided until a reliable SpO reading 2 can be obtained or symptoms resolve. Oxygen delivery",
      "The FiO levels delivered to the patient vary by the delivery system: 2 — Standard nasal cannulae: FiO 0.24 – 0.35 at 1 – 4 L / min 2 — Non-rebreather mask: FiO 0.6 – 0.9 at 10 – 15 L / min 2",
      "Position the conscious patient upright if possible, as this can improve oxygenation.",
      "Non-rebreather masks should not be used at flow rates < 10 L / min due to the risk of CO retention. 2",
      "Nasal cannulae work effectively for mouth-breathers, however, use a face mask if nasal passages are congested or blocked.",
      "Nasal cannulae are more likely to be tolerated in younger paediatric patients. Severe hypoxaemia / critical illness",
      "Early aggressive oxygen administration may benefit patients with severe hypoxaemia or critical illnesses such as cardiac arrest or resuscitation, major trauma, shock, severe sepsis and anaphylaxis. Major trauma",
      "Major trauma in this context refers to paediatric patients identified based on clinical assessment and injury severity, not solely by a high-risk mechanism.",
      "Administer high flow oxygen, regardless of whether the patient is at risk of hypercapnic respiratory failure. Once the patient is haemodynamically stable and the SpO can be reliably obtained, titrate 2 oxygen to ≥ 92%.",
      "Patients receiving preoxygenation for RSI should be administered oxygen therapy as per CPG P0301 Endotracheal Intubation. Low SpO required 2",
      "Patients with congenital cyanotic heart disease require lower target oxygen concentrations. The target saturation range may vary between patients.",
      "Target oxygen saturations will be prescribed by a specialist and the patient’s family will be aware.",
      "Paraquat poisoning is extremely rare in paediatric patients. Consult VPIC for management advice in this situation. Oxygen therapy regardless of SpO 2",
      "Some patients require continuous high flow oxygen therapy due to specific disease processes. Maintain oxygen therapy regardless of SpO or signs of breathlessness. 2",
      "All patients suspected of having inhaled potentially toxic gases (e.g. house fires) should be given high concentration oxygen due to the risks associated with carbon monoxide, cyanide and other gases. — Where the patient may have been exposed to other poisons, administer oxygen to maintain an appropriate target SpO . Consult VPIC for toxicology advice. 2",
      "Cluster headache is characterised by attacks of severe unilateral pain which can occur multiple times per day and last up to several hours. High concentration oxygen therapy via a non-rebreather mask has been shown to provide pain relief to patients experiencing cluster headache. Administer high flow oxygen where the patient can confirm their diagnosis and consider further pain relief.",
      "Decompression illness requires high concentration oxygen to promote nitrogen off",
      "Patients with sickle cell disease may present with an acute painful crisis. Oxygen should be given to prevent hypoxaemia and prevent further intravascular sickling."
    ],
    management_mica: [],
    notes: "Weight-based dosing. BLS: 15:2 (health professionals). Defibrillation: 4 J/kg. Adrenaline 10 mcg/kg IV/IO. IO early if IV delayed. PIPER consultation. Broselow tape."
  },

  paediatric_medical_cardiac_arrest: {
    cpg: "P0201-1",
    title: "Paediatric Medical Cardiac Arrest",
    careObjectives: [
      "Prioritise effective airway control and adequate ventilation and oxygenation",
      "High quality chest compressions with minimal interruptions",
      "Rapid defibrillation of VF / Pulseless VT (if in doubt, shock)",
      "Advanced care (e.g. adrenaline, antiarrhythmics, intubation) where it does not interrupt high-quality compressions / defibrillation",
      "Address correctable causes where possible"
    ],
    management: [
      "Position airway, insert OPA / NPA if required, commence BVM ventilation and then apply defibrillation pads. — Airway positioning appropriate for patient’s age as per CWI/OPS/190 Airway Manoeuvres & Positioning.",
      "Cardiac arrest in children and infants is most commonly due to respiratory (e.g. hypoxia) or circulatory (e.g. hypovolaemia) causes. Cardiac arrest following a respiratory arrest may be corrected with ventilation prior to commencing chest compressions.",
      "An SGA is an appropriate option to manage the airway initially and to facilitate continuous compressions. When ETT is attempted, it should not interrupt compressions. Vascular access",
      "Proceed directly to IO access if IV access cannot be achieved within 60 seconds.",
      "Fluid administration in shockable rhythms may be detrimental and should be limited to medication flush and TKVO only. Defibrillation pads",
      "The Zoll branded Pedi-padz defibrillation pads are designed for patients aged 8 years and younger (< 25 kg). 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 Adult < 25 kg ≥ 25 kg Paediatric Pads Adult Feedback Pads Pad position",
      "Use the anterior / lateral position when applying adult pads",
      "Use the anterior / posterior position when applying paediatric pads",
      "The anterior pad is placed mid-chest immediately left to the sternum",
      "The posterior pad is placed in the middle of the back between the scapulae High-Performance CPR",
      "Prioritise airway and ventilation",
      "Perform high-quality CPR — Rate: 100 - 120 compressions per minute — Depth: 1/3 chest depth, allow for full recoil — Ventilation duration: 1 second per ventilation — 2 minute rotations of compressor",
      "Minimise interruptions to chest compressions ≤ 3 seconds — Focus on team performance and communication — Charge defibrillator during compressions — On-screen rhythm interpretation — Hover hands over chest and resume compressions immediately after defibrillation or disarm",
      "Utilise Team Leader and checklist",
      "Pause CPR briefly to interpret the rhythm before delivering a shock. A decision to defibrillate should not be made on the basis of ‘See-Thru CPR’ as it is often misleading.",
      "Defibrillation using shock advisory mode is not compatible with high-performance CPR and should not be combined. Compression technique Infant",
      "Two rescuers: Two-thumb technique The hands encircle the chest and thumbs compress the sternum. Take care not to restrict chest expansion during recoil or ventilation.",
      "Single rescuer: Two-finger technique Preferred to minimise transition time between compressions and ventilations. Small child",
      "One-hand technique Medium child, adolescent",
      "Two-hand technique (as for adults) Compression / Ventilation ratios",
      "15 compressions : 2 ventilations (two rescuers)",
      "30 compressions : 2 ventilations (single rescuer) No ETT / SGA in situ",
      "Pause for ventilations",
      "Infants: 25 ventilations / min",
      "Small child: 20 ventilations / min",
      "Medium child: 15 ventilations / min ETT / SGA in situ",
      "Adolescent: 10 ventilations / min",
      "No pause for ventilations Antiarrhythmics",
      "HP-CPR should always be prioritised over medication administration. Antiarrhythmics should not be considered until there are sufficient resources to continue uninterrupted HP-CPR in parallel to medication administration.",
      "Antiarrhythmics should be administered for VF / VT refractory to 3 shocks including shocks delivered prior to AV arrival. Consultation",
      "Consider consultation with the AV Medical Advisor via the AV Clinician once initial management has been provided. This may include advice around: — Complex patients — — Management of reversible causes — Cessation of resuscitation — Cases suitable for prolonged resuscitation Mechanical CPR (mCPR)",
      "The Corpuls mCPR device may be applied to patients aged ≥ 8 years. — The long stamp should be used routinely in paediatric patients. — Assess position of the stamp on the chest at each rhythm check. Small children are more likely to move under the device and be at risk of organ injury.",
      "mCPR should not be used routinely in paediatric patients except for transport in consultation with AV Medical Advisor via the AV Clinician. Transport",
      "Continue adrenaline 10 mcg / kg IV every 4 minutes",
      "Perform rhythm check every 2 minutes. If a potentially perfusing rhythm is present, check for pulse. Do not stop vehicle for confirmation of shockable rhythm or pulse check.",
      "Consider mCPR as a last resort if: — Limited resources at scene (e.g. 1 - 2 staff) — All staff are extremely fatigued — There are no other options to provide effective HP-CPR with manual chest compressions",
      "mCPR should not routinely be applied to patients outside of these circumstances. It should never be applied to facilitate other interventions such as IV access. Special Circumstances Cardiac arrest secondary to hypothermia < 30°C",
      "The primary goal is to prevent further heat loss prior to ROSC or transport - significant improvement in temperature from prehospital intervention is unlikely.",
      "Double the interval for adrenaline and amiodarone doses.",
      "ROSC is unlikely to be achieved if more than 3 shocks are required while the patient remains severely hypothermic - consider AAV or mCPR for transport. Where these resources are not available, continue DCCS as per standard cardiac arrest.",
      "For patients in cardiac arrest where hypothermia is clearly the cause, mCPR to hospital may be appropriate. Consult the AV Medical Advisor via the AV Clinician for management advice. Tension pneumothorax",
      "Where tension pneumothorax is considered to be the cause of cardiac arrest, in either medical or traumatic arrest, decompress the chest bilaterally.",
      "Chest decompression should not be routine in medical cardiac arrest. Hyperkalaemia",
      "Indiscriminate use of calcium in cardiac arrest is associated with harm.1",
      "A hyperkalaemic cause of arrest should only be considered if: — The potassium level has been measured and is known to be elevated (>6 mmol/L) or — Hyperkalaemia is very strongly suspected (typically only patients with renal failure / dialysis or following a significant crush injury).",
      "Outside of these settings, the use of calcium will cause more harm than any benefit obtained.",
      "Flush with 10 mL normal saline between administration of calcium gluconate and sodium bicarbonate. Hypovolaemia / anaphylaxis",
      "In PEA arrest where hypovolaemia or anaphylaxis is suspected or the patient has a rhythm that may be fluid responsive, administer normal saline 20 mL / kg IV. Asthma",
      "Provide immediate interventions in witnessed arrest including apnoea, adrenaline IM/IV and normal",
      "Measure BGL after all other management is established. Manage hypoglycaemia as per CPG A0702 Hypoglycaemia."
    ],
    management_mica: [
      "Prioritise IV adrenaline and early intubation. Hypoglycaemia"
    ],
    notes: "Primarily respiratory cause — ventilation priority. 15:2 ratio. Adrenaline 10 mcg/kg (0.1 mL/kg of 1:10,000) IV/IO. Amiodarone for shockable. PIPER early. IO if IV delayed >90 sec."
  },

  paediatric_choking: {
    cpg: "P0304",
    title: "Paediatric Choking",
    careObjectives: [
      "Safe and effective maintenance of airway patency, oxygenation, and ventilation"
    ],
    management: [
      "Concurrent management with appropriate airway positioning as per CWI/OPS/190 Airway Manoeuvres & Positioning will improve all attempts at management of airway patency, oxygenation and ventilation Bag-Valve Mask Ventilation Ensure the BVM pressure release (“pop off”) valve is set to ‘override’ (valve closed) prior to delivery of assisted ventilations",
      "The bag-valve mask does not provide oxygen in spontaneously breathing patients without the delivery of assisted ventilations in line with the patient’s respiratory rate and a non-rebreather mask is more appropriate in this setting",
      "The early use of appropriate adjuncts (e.g. oropharyngeal and / or nasopharyngeal airway[s]) improves the likelihood of successful ventilation",
      "Many issues in the delivery of assisted ventilations relate to operator technique – consider the use of two-person ventilation technique using VE or CE grip as per CWI/OPS/059 Bag Valve Mask whenever possible",
      "All delivery of ventilation must be supported by the use of continuous waveform end-tidal capnography (ETCO ) as soon as practicable 2",
      "Use of an oropharyngeal or nasopharyngeal airway may support more effective bag-valve mask ventilation Supraglottic Airway",
      "There is no requirement to trial alternative airway adjuncts prior to insertion of a supraglottic airway where the clinician identifies the supraglottic airway is the most appropriate adjunct for the patient condition — Supraglottic airways are well tolerated by patients with reduced conscious state and have a high rate of first-attempt insertion success",
      "The iGel ® is sized based on patient predicted body weight rather than actual body weight — Use the Page per Age Calculator to determine the most appropriate iGel ® size"
    ],
    management_mica: [],
    notes: "Infant: 5 back blows + 5 chest thrusts. Child >1yr: 5 back blows + 5 abdominal thrusts. Unconscious: CPR. Check mouth before each breath."
  },

  paediatric_essential_airway_management: {
    cpg: "P0301",
    title: "Paediatric Essential Airway Management",
    careObjectives: [
      "To safely and effectively undertake endotracheal intubation in patients who cannot be managed with other airway techniques"
    ],
    management: [],
    management_mica: [],
    notes: "Larger occiput (positioning differences). Neutral position <1yr, sniffing older. Narrowest at cricoid. Uncuffed ETT <8 years. Age-appropriate adjunct sizing."
  },

  paediatric_nausea_vomiting: {
    cpg: "P0501",
    title: "Paediatric Nausea and Vomiting",
    careObjectives: [
      "To reduce the suffering associated with the experience of pain to a degree that the patient is comfortable."
    ],
    management: [
      "General: If nausea/vomiting tolerated — basic care and referral/transport only",
      "General: IV Normal Saline reduces nausea regardless of antiemetic (avoid in cardiac/renal failure history)",
      "General: Pregnant patients: prefer fluid rehydration first; consider severity before ondansetron",
      "Ondansetron: ODT (oral disintegrating tablet) preferred. IV available. IM permissible if oral/IV impossible: 4 mg IM (8 mg max).",
      "Ondansetron: Long QT syndrome — do NOT give. If VT/TdP follows ondansetron, do NOT give amiodarone (further QT prolongation). Cardiovert instead.",
      "Ondansetron: Do NOT use ondansetron for tramadol-induced nausea — antagonises analgesia at same receptor.",
      "Prochlorperazine: IM route only"
    ],
    management_mica: [],
    notes: "Ondansetron weight-based. IV fluids if dehydrated. Consider cause. Oral rehydration if tolerating. Avoid metoclopramide (dystonic reactions)."
  },

  paediatric_asthma: {
    cpg: "P0601_1",
    title: "Paediatric Asthma",
    careObjectives: [
      "Identify severity",
      "Dexamethasone for all cases",
      "Adrenaline for severe cases",
      "Identify appropriate disposition — Mild: Self care — Moderate: VED Referral +/- transport to ED — Severe: AV Transport to ED"
    ],
    management: [],
    management_mica: [],
    notes: "Salbutamol weight-based neb. Ipratropium bromide. Dexamethasone 0.3 mg/kg. IV magnesium sulphate severe (MICA). NIV for severe. Consider anaphylaxis if food exposure."
  },

  paediatric_copd_wheeze: {
    cpg: "P0602",
    title: "Paediatric COPD / Wheeze",
    careObjectives: [
      "Assess severity",
      "Bronchodilation: — Inhaled bronchodilators in patients with adequate ventilation — Parenteral adrenaline (IM or IV) in patients without adequate ventilation (i.e. those who cannot adequately inhale a bronchodilator)",
      "NIV or early intubation in patients with respiratory failure unresponsive to initial treatment",
      "Magnesium for severe or life-threatening asthma",
      "Reduce airway inflammation with systemic corticosteroids for all but the most mild presentations"
    ],
    management: [
      "Asthma is dynamic and patients can show initial improvement with treatment then deteriorate rapidly. The management of the patient should be tailored to changes in the condition.",
      "Patients with severe and life-threatening asthma are at high risk of deterioration during extrication. — Management should be started prior to any attempt to extricate. It is reasonable to allow some time for the initial treatment to take effect prior to extricating. — Prepare for deterioration prior to extrication (e.g. IV access, adrenaline drawn up, resuscitation equipment immediately available). — Patient exertion must be minimised as much as reasonably possible. — Monitor patient closely throughout extrication.",
      "Corticosteroids should be administered, except in the mildest cases (e.g. mild symptoms that respond quickly and completely to salbutamol therapy).",
      "If referring to VVED, remain on scene as vital signs and repeat assessment will be required. Bronchodilators for < 2 year olds",
      "Asthma is uncommon in < 2-year-olds.",
      "Wheeze is typically triggered by viral infections (e.g. bronchiolitis).",
      "Do not administer bronchodilators if a virally induced wheeze is the most likely diagnosis (e.g. fever, URTI symptoms).",
      "Consider a trial of salbutamol if bronchospasm is suspected based on clinical judgement. Cause of wheeze in < 2-year-olds Viral-induced wheeze more likely Bronchospasm more likely Symptoms of respiratory infection present Previous response to bronchodilators No asthma diagnosis Asthma diagnosis Wheezing only present during respiratory infection Wheeze in between episodes of viral illness Family history of atopy",
      "Do not continue salbutamol if there is no clear improvement. A lack of response most likely indicates non-bronchospastic pathology, not the need for more salbutamol. Further salbutamol in this setting can cause metabolic derangement. Magnesium",
      "Administration should not delay other priorities. Consider establishing the infusion during transport.",
      "If the patient deteriorates, prioritise adrenaline administration over magnesium sulfate. Non-invasive ventilation",
      "Contraindications (asthma): altered level of consciousness.",
      "Risks: pneumothorax, drop in conscious state and / or respiratory failure.",
      "For patients with obstructive lung pathology consider manually turning on the “Auto-PEEP” alarm: — Select “menu” button on left — Select “alarm configuration” — Change “Auto-PEEP” to On",
      "Mechanical flow that is inadequate for patient demand.",
      "TPT is very unlikely in the spontaneously ventilating patient or patients receiving ventilation via a BVM.",
      "TPT may occur as a result of forceful ventilation via ETT.",
      "If there are clear signs of unilateral TPT then decompression of the affected side is indicated.",
      "1 mL = 6 mcg",
      "Dilute Magnesium Sulfate 10 mmol (2.5 g) to 25 mL with Normal Saline (this equals 100 mg / 1 mL) for IV administration.",
      "Consult the AV Clinician for CPAP — ALS paramedics may initiate CPAP following consultation"
    ],
    management_mica: [
      "NIV should only be considered for adolescent patients (aged 12-15 years). NIV is unlikely to be successful in younger children due to equipment and compliance challenges.",
      "Monitoring: — The patient on BiPAP NIV must be continuously observed by at least one MICA paramedic and any extrication / egress plan must incorporate this requirement as a priority. — ETCO monitoring must be commenced as soon as practicable. 2",
      "BiPAP should be viewed as a part of a comprehensive bundle of care, including an adrenaline infusion and other pharmacological interventions as required. Prepare to rapidly progress to RSI in any patient commenced on NIV for asthma.",
      "Severe asthma patients can deteriorate rapidly. In the period immediately following initiation (approx. 10 minutes), one of three pathways are possible. Deterioration No change / small change Improvement Remove Consult the AV Medical Advisor via the AV Clinician Continue BiPAP NIV BiPAP Options include: Consider immediate • Adjusting BiPAP settings intubation",
      "Intubation Due to the dynamic nature of this pathology including the risks of iatrogenic barotrauma and the impairment of venous return, changes to BiPAP settings should only be made following consultation.",
      "Signs of deterioration (indications for removal of BiPAP): — Ineffective (cardiac / respiratory arrest, mask intolerance, decreasing respiratory effort, nil improvement in work of breathing) — Deteriorating vital signs — Risk to patient (loss of airway control, copious secretions, active vomiting, paramedic judgement of clinical deterioration)",
      "BiPAP should commence with an FiO of 1.0. Once treatment efficacy and patient comfort / 2 tolerance are established, the FiO should be gradually titrated to normalise SpO levels dependent 2 2 on the patient’s presentation and pathology.",
      "Consider NIV where intubation is clinically indicated but not possible due to an ACD specifically declining intubation. In this context, it may be applied even if the patient has a reduced level of consciousness that would usually contraindicate NIV.",
      "Ongoing bronchodilation: Provide pMDI salbutamol via an in-line connector once NIV is established. Dysynchrony",
      "Ventilator dysynchrony is a predictor of failed NIV and should be addressed urgently when commencing NIV.",
      "A common cause of all ventilator dysynchrony is a poor mask seal – this should be addressed first before moving into further troubleshooting.",
      "Consider early consultation with the AV Medical Advisor via the AV Clinician if having difficulties managing complications or dysynchronies of NIV.",
      "Ventilator inspiratory time exceed patient’s inspiratory time OR percentage of flow decay at which ventilator cycles from inspiration to exhalation is too low.",
      "Reduce inspiratory time and increase cycle % from 25% to 40% or more. Ineffective triggering",
      "Patient attempts to take breath but ventilator fails to trigger.",
      "Decrease the magnitude of the trigger pressure (i.e. make it less negative; e.g. change from -2 cmH O to -1 cmH O) but consider if this may be due to excessive auto-PEEP. 2 2 Flow dysynchrony",
      "Decrease rise time, cautiously increase pressure support and consider nasal cannula at 15 L / min below the NIV mask Flow excess dysynchrony",
      "May occur in distressed patients who are being commenced on NIV, particularly if leak compensation is active and generating high inspiratory pressures.",
      "Consider a temporary reduction in pressure support and an increase in rise time. Intubated patients",
      "High ETCO levels should be anticipated in the intubated asthmatic patient and are considered safe. 2",
      "Despite high ETCO levels, treatment should not be adjusted and managing ventilation should be 2 conscious of the effect of gas trapping when attempting to reduce ETCO . 2 Tension pneumothorax (TPT)",
      "Bilateral chest decompression should only be considered if all the following criteria are present: 1•. IPPV via ETT 2•. Sudden loss of cardiac output 3•. Rhythm is PEA 4•. No response to 1 minute of apnoea and IV adrenaline Infusions Adrenaline infusion",
      "Dilute Adrenaline 300 mcg (3 mL of 1:10,000) to 50 mL with 5% Dextrose or Normal Saline (in a 50 mL syringe)",
      "1 mL / hr = 0.1 mcg / min At low flow rates in younger children an infusion may not be as effective as providing boluses. Clinical judgement should be applied regarding the most effective route of administration. Magnesium",
      "Administer 50 mg / kg (max 2000 mg) via infusion pump over 20 minutes Age Weight Dose Dose Total volume Rate (years) (kg) (mg) (g) (mL) (mL / hr) 1 - 3 months 6 300 0.3 3 9 6 months 8 400 0.4 4 12 1 year 10 500 0.5 5 15 2 12 600 0.6 6 18 3 14 700 0.7 7 21 4 16 800 0.8 8 24 5 18 900 0.9 9 27 6 20 1000 1 10 30 7 22 1100 1.1 11 33 8 24 1200 1.2 12 36 9 26 1300 1.3 13 39 10 33 1650 1.65 16.5 49.5 11 36 1800 1.8 18 54 12 - 15 ≥ 40 2000 2 20 60"
    ],
    notes: "Bronchiolitis vs asthma vs viral wheeze. Salbutamol trial. Ipratropium bromide. Dexamethasone. Hypertonic saline neb for bronchiolitis. Avoid over-treatment in bronchiolitis."
  },

  paediatric_seizures: {
    cpg: "P0703",
    title: "Paediatric Seizures",
    careObjectives: [
      "Early termination of status epilepticus",
      "Appropriate disposition planning based on risk profile"
    ],
    management: [
      "Be aware of the potential for uncapped sharps from bystander emergency anti-epileptic medications",
      "Some patients may be aggressive during the postictal period — This aggression is generally self-limiting and short-lived (30 minutes maximum) and very rarely requires sedation Patient Management Plans",
      "Some patients may have specific management plans prepared by their neurologist or general practitioner which may differ from AV CPGs — This may include the administration of buccal midazolam prior to paramedic arrival, which does not contribute towards the maximum AV midazolam dosing",
      "In this case, the patient specific management plan should be followed, which may include the Outside Scope of Practice",
      "If staff are concerned or unfamiliar with details contained within the management plan, they should commence management and contact the AV Clinician urgently for support and discussion Supportive Care",
      "If possible, create a safe working environment which minimises the risk of accidental injury to patients experiencing seizure activity",
      "Rapid control of seizure activity is the primary objective in status epilepticus",
      "If IV access is not already in situ, the initial dose of midazolam should be administered IM",
      "Failure to control status epilepticus is often related to under-dosing of the initial dose of benzodiazepine",
      "Providing additional doses beyond two doses of Midazolam is unlikely to provide additional benefit and may be associated with increased risk — Consult the AV Medical Advisor via the AV Clinician if two doses of Midazolam have been administered but additional doses are considered to be of potential benefit Levetiracetam Infusion",
      "Draw up the required number of vials in a 50 mL syringe",
      "Dilute levetiracetam with an equal volume of normal saline as per table (50 mg/mL)",
      "Administer 60 mg/kg (max 4500 mg)",
      "Draw up the required number of vials in a 50 mL syringe",
      "Do not dilute (100 mg/mL)",
      "Administer 60 mg/kg (max 4500 mg)",
      "If there is any doubt regarding whether the patient is experiencing a functional seizure or status epilepticus, they should be managed according to status epilepticus",
      "Patients experiencing functional seizures may be unable to respond if they are in a dissociative state",
      "If one exists, follow the patient’s management plan for episodes of functional seizures",
      "Avoid touch, and if necessary, explain what you are doing and why",
      "Do NOT attempt to “prove” the patient is not experiencing a seizure",
      "Do not stop family members or close personal contacts from filming the patient as this may have been requested by their regular care team",
      "Consider referral to the patient’s own general practitioner if the patient has a known seizure disorder (including functional seizures) and — The seizure activity has been resolved within 5 minutes — The seizure has followed the regular pattern for the patient — A responsible adult is available to continue monitoring the patient",
      "Patients who have experienced a seizure and are to be referred to their regular GP should be advised they should not operate a motor vehicle until assessed by a general practitioner or specialist as per the national driver medical standards — If the patient does not heed this advice and chooses to drive immediately following the case, paramedics should request support from Victoria Police",
      "Where delays are anticipated accessing the patient’s regular GP, consider referral to a UCC or VVED"
    ],
    management_mica: [
      "Airway management, oxygenation, and ventilatory support should occur concurrently with attempts to terminate seizure activity",
      "In patients not requiring ventilatory support, avoid the use of the bag-valve mask (BVM) to provide high-concentration oxygen Status Epilepticus",
      "If administering Midazolam, be prepared to support airway and ventilation",
      "Deliver infusion over 5 minutes Age Weight Dose Vials Dilutant Volume in VTBI * (kg) (mg) Syringe (mL) 0 - 2 3.5 210 1 5mL 10mL 4.2 months 3 months 6 360 1 5mL 10mL 7.2 6 months 8 480 1 5mL 10mL 9.6 1 year 10 600 2 10mL 20mL 12 2 12 720 2 10mL 20mL 14.4 3 14 840 2 10mL 20mL 16.8 4 16 960 2 10mL 20mL 19.2 5 18 1080 3 15mL 30mL 21.6 6 20 1200 3 15mL 30mL 24 7 22 1320 3 15mL 30mL 26.4 8 24 1440 3 15mL 30mL 28.8 9 26 1560 4 20mL 40mL 31.2 10 33 1980 4 20mL 40mL 39.6 11 36 2160 5 25mL 50mL 43.2 VTBI = Volume to be infused (i.e. the amount which should be programmed into the syringe pump to be delivered over 5 minutes). Patient ≥ 40 kg (Age 12 +)",
      "Deliver infusion over 5 minutes Weight (kg) Dose (mg) Vials Dilutant Volume in Syringe VTBI * (mL) 40 2400 5 N/A 25mL 24 50 3000 6 N/A 30mL 30 60 3600 8 N/A 40mL 36 70 4200 9 N/A 45mL 42 80 + 4500 9 N/A 45mL 45 VTBI = Volume to be infused (i.e. the amount which should be programmed into the syringe pump to be delivered over 5 minutes). Functional Seizures",
      "Provide reassurance that the patient is safe, and that the seizure activity will stop Intubation Decision-Making",
      "Patients receiving benzodiazepines and levetiracetam may often experience periods of hypoventilation requiring assisted ventilation. This alone does not necessitate intubation, and patience is required to evaluate for the presence of on-going NCSE compared with prolonged patient recovery following seizure termination.",
      "Among adult patients who continue to seize (either CSE or NCSE with impairment of airway or oxygenation) 5 minutes following the completion of the levetiracetam infusion, intubation will often be required",
      "Paediatric patients are comparatively more readily able to tolerate the consequences of on-going seizure activity and intubation is less urgent except in cases where basic airway manoeuvres are not sufficient to provide effective oxygenation and ventilation — Excluding cases of airway compromise preventing oxygenation, intubation of paediatric patients should generally not occur earlier than 30 minutes following the completion of the levetiracetam infusion — If the patient remains seizing following completion of levetiracetam and transport time is expected to be significant, consult with AV Medical Advisor via the AV Clinician to identify nearest appropriate source of paediatric advanced airway management Disposition Low Risk"
    ],
    notes: "BGL mandatory. Midazolam buccal/IN: 0.2–0.5 mg/kg preferred. IV if access. Febrile: paracetamol/ibuprofen + cooling. Levetiracetam IV (MICA) for status. PIPER for prolonged."
  },

  paediatric_anaphylaxis: {
    cpg: "P0704",
    title: "Paediatric Anaphylaxis",
    careObjectives: [
      "Adrenaline (IM) with minimal delay",
      "Airway and perfusion support",
      "Hospital-based observation (usually 4 hours) at a minimum"
    ],
    management: [],
    management_mica: [],
    notes: "Adrenaline 0.01 mg/kg IM (max 500 mcg) anterolateral mid-thigh. Repeat every 5 min. Adrenaline infusion (MICA). Salbutamol for bronchospasm after adrenaline. IV fluids for hypotension. Transport (4-hour observation)."
  },

  paediatric_acute_behavioural_disturbance: {
    cpg: "P0708",
    title: "Paediatric Acute Behavioural Disturbance",
    careObjectives: [
      "Maintain safe environment for patients, staff, other emergency responders, family and bystanders",
      "Use the least restrictive means possible, maintaining verbal and environmental de-escalation strategies throughout the interaction",
      "Consider clinical causes of acute behavioural disturbance"
    ],
    management: [
      "Use interventions proportionate to the severity of risk posed by the acute disturbance. Always use the least restrictive intervention available unless there is an imminent risk of significant harm to self or others.",
      "Patients displaying these behaviours almost always have a clinical cause for their agitation, and as such it is reasonable that the AV crews are the lead decision-makers at the case. Police at scene will ensure scene safety. Safety",
      "Patient and paramedic safety is paramount at all times. Do not attempt any element of this CPG unless all necessary assistance is available.",
      "Paramedics should continue to utilise their Dynamic Risk Assessment throughout the case.",
      "Consider exit strategy (e.g. position yourself near exit).",
      "Verbal and environmental de-escalation with the patient is essential and should be maintained throughout all phases of care.",
      "Where sedation or physical restraint is absolutely necessary, clear communication with all parties involved in restraining the patient is a key factor in reducing the risk of needle-stick or other injuries. Correctable Causes",
      "If a correctable cause of agitation is identified (e.g. hypotension, hypoxia, hypoglycaemia), the preference is to treat the cause rather than provide sedation.",
      "In some circumstances, agitation may be so severe that the cause cannot be treated without sedation. Sedation may be administered if it is required to facilitate safe treatment of the underlying cause. De-escalation should continue while correctable causes are addressed. Psychostimulant affected patients",
      "Patients affected by methamphetamine may present with severe agitation and violence. These patients may need to be managed as per the Extreme Safety Risk section of this CPG using ketamine (consult only) if necessary.",
      "Consult the AV Medical Advisor via the AV Clinician for management of drug induced hyperthermia in psychostimulant toxicity patients. Traumatic brain injury",
      "Severe agitation: Extraordinary and immediate risk may be managed with ketamine regardless of head injury.",
      "Mild / Moderate agitation: Manage with judicious analgesia. The hypotensive effects of midazolam and droperidol can be detrimental to patient outcomes. Restrictive practices Any form of restrictive practice should only be used as a last resort (e.g. chemical, physical or mechanical restraint).",
      "If de-escalation strategies are unsuccessful or there is an immediate and likely risk of harm to the patient or staff, oral or IM sedation may be considered. This may or may not require the use of mechanical or physical restraint. Physical / mechanical restraint",
      "Physical restraint means the use by a person of their body to prevent or restrict another person's movement, where mechanical restraint means the use of a device to prevent or restrict a person's movement",
      "Mechanical restraint must be proportionate to the risk of harm, and only be employed for the minimum duration that ensures the safety of the patient, staff and others.",
      "Mechanical restraint devices may be used without the use of sedation in circumstances where the patient complies with the restraint and will not sustain further harm by fighting against the restraints.",
      "Observe the patient continuously to ensure their airway, breathing and circulation are not obstructed, and the restraint devices are not causing injury.",
      "Where the patient has been sedated and mechanical restraints are still required, the patient should be positioned in the lateral position to avoid aspiration.",
      "DO NOT restrain the patient in the prone position. This position has been associated with asphyxia and death.",
      "Mechanical restraints should be removed and the patient repositioned if there is risk or harm occurring to the patient; e.g. asphyxia, aspiration.",
      "The indications for the use of restraints, type of restraint, the time of application and removal, the patient’s response, and any adverse outcomes must be documented on the PCR.",
      "Manual Handling Reference Sheet Sedation",
      "The AV Clinician must be consulted prior to any sedation.",
      "The AV Clinician may approve sedation in the following circumstances: — Oral sedation in paediatric patients of all ages. — Parenteral sedation in adolescent patients with weight > 50 kg.",
      "Consultation with the AV Medical Advisor via the AV Clinician is required in all other circumstances.",
      "The use of sedation to manage acute behavioural disturbance in patients with a mental health illness is also known as chemical restraint.",
      "Monitoring and resuscitation equipment must be prepared prior to sedation and immediately available at all times.",
      "The patient who has taken multiple medicines, drugs or who is intoxicated is at greater risk of airway compromise when sedation is administered.",
      "Parenteral sedation should aim for rousable drowsiness which is defined as the patient being asleep but rousing if their name is called. Aim to use the lowest dose possible and carefully monitor for side effects.",
      "Droperidol or midazolam should be used where there is a serious and imminent risk to safety and oral medication is not appropriate or the patient refuses. — Droperidol is therapeutic and has a longer duration of action. It is the preferred parenteral sedative in most circumstances. — Use when safety is not immediately at extreme risk (i.e. does not urgently require control within seconds to minutes) but there is significant potential for harm if the patient is not chemically restrained. — Midazolam is the preferred agent if paramedics are aware that the patient has QT prolongation. However, the nature of cases involving agitation will often mean this history is difficult to identify. There is no requirement that this is systematically excluded prior to providing sedation.",
      "Ketamine should only be used if there is an extreme and immediate risk. — Ketamine has a shorter duration, is non-therapeutic and does not treat the underlying cause of agitation, but has a slightly shorter onset time. — The intent is that ketamine be limited to situations where the risk is so overwhelming that the shorter onset time of ketamine is necessary to prevent harm, despite the medication’s disadvantages. This is usually in the context of extreme violence, psychostimulant involvement, and ongoing significant resistance to police restraint. — Extreme risk relates to a substantial potential for death or serious injury. — Immediate risk refers to the risk being present right now or occurring very soon (i.e. seconds).",
      "Avoid cutting clothing or administration of an IM injection through patient clothing where possible.",
      "Consider the use of oral olanzapine to maintain a calm state where the agitated patient has responded to de-escalation yet has the propensity to re-escalate.",
      "Do not sedate a patient with a history of agitation ‘just in case’ where they do not display any anxiety or agitation.",
      "Sedation checklist Combining sedation agents",
      "A combination of sedative agents can cause profound sedation requiring advanced airway management.",
      "Multiple parenteral agents should only be used for initial sedation where advanced airway management is possible (MICA only) and where the full onset time of the initial medicine administered has passed. If advanced airway management is not possible (e.g. no MICA on scene), ALS paramedics must consult the AV Medical Advisor via the AV Clinician prior to combining different parenteral sedatives.",
      "The use of olanzapine may be considered where care times are extended and the therapeutic effects of droperidol are wearing off and the patient is cooperative but remains agitated.",
      "Where ketamine is required to manage extreme agitation in the patient who is also experiencing serotonin toxicity or severe drug withdrawal, midazolam can be therapeutic. Prepare for advanced airway management. Consult the AV Medical Advisor via the AV Clinician for midazolam where ketamine has already been administered. Post-sedation care",
      "Where parenteral sedation has taken effect and SAT < -1, a minimum standard of monitoring and supportive care is required. Supportive care",
      "Supportive care should be provided as required including: — Airway management — Position patient in lateral position — Provide high flow oxygen Hyperthermia / heat stress — Reassessment and management of clinical causes of acute behavioural disturbance — Ketamine: Management of hypersalivation. On most occasions suctioning will be sufficient. Where hypersalivation becomes difficult to manage, consult AV Medical Advisor via the AV Clinician for advice including potential need for Atropine 20 mcg/kg IV/IM (MICA) Monitoring",
      "Maintain line-of-sight monitoring at all times.",
      "At a minimum, observations must be undertaken and documented every 15 mins.",
      "Minimum repeat assessment: — Airway patency — — RR, HR — Skin – pallor / mottling / cyanosis — Sedation Assessment Tool — SpO 2 — Continuous cardiac monitoring — Neurovascular status of restrained limbs — Injury from mechanical restraints — Blood pressure (if compliant) — ETCO : Any time ketamine is used or sedation SAT < 0, nasal ETCO monitoring must be 2 2 commenced, line-of-sight monitoring initiated, and consideration given to more frequent vital sign assessment.",
      "SAT: Use of the Sedation Assessment Tool (SAT) will assist in ongoing monitoring, clinical handover and case documentation. SCORE RESPONSIVENESS SPEECH +3 Combative, violent out of control Continual loud outbursts +2 Very anxious and agitated Loud outbursts +1 Anxious / restless Normal / talkative 0 Awake and calm / cooperative Speaks normally -1 Asleep but rouses if name is called Slurring or prominent slowing -2 Responds to physical stimulation Few recognizable words -3 No response to stimulation Nil Transport destination",
      "If possible, transport to the patient’s usual health service if they have a significant past history of care at a particular hospital.",
      "If this is not possible or appropriate, transport to a hospital with an emergency department capable of accepting paediatric patients. Aeromedical",
      "The agitated patient, regardless of the cause, has the potential to endanger both aircrew and the aircraft. A strong index of suspicion should be maintained for the potential for agitation or escalation of behaviour for any patient requiring aeromedical transport and a lower threshold for intervention should form an essential part of the dynamic risk assessment.",
      "All patients requiring aeromedical transport must be screened for any potential behaviours of concern prior to loading onto an aircraft. All reasonable steps must be undertaken including the use of an appropriate sedation regime as outlined in this CPG and/or mechanical restraints as necessary to ensure crew and aircraft safety.",
      "If any doubt exists as to any potential safety issues resulting from patient behaviour or potential behaviour, Aeromedical crew may elect to refuse air transport and notwithstanding the presenting clinical problem, may request transport of the patient by road to the nearest appropriate facility.",
      "Under CASA law, the pilot in command (PIC) can determine that the carriage of a patient may be unsafe and request further steps be undertaken to mitigate any potential risks. The PIC has the statutory power to refuse transport of a patient or persons at any time."
    ],
    management_mica: [],
    notes: "Trauma-informed. De-escalation. Exclude medical cause. Chemical sedation: droperidol weight-based. Midazolam IM/IN. PIPER consultation. Minimum restraint."
  },

  paediatric_hypoglycaemia: {
    cpg: "P0715",
    title: "Paediatric Hypoglycaemia",
    careObjectives: [
      "Prioritise corticosteroid therapy",
      "Support perfusion with IV fluid",
      "Transport to closest emergency department"
    ],
    management: [
      "Patients with a history of PAI must be considered for treatment with hydrocortisone where any physiological or psychological stressor is considered moderate or severe in order to avoid potential adrenal crisis.",
      "Signs and symptoms of adrenal insufficiency are not required to manage this patient group.",
      "Parent / carers of children with PAI are generally well educated about the illness and can often identify symptoms of adrenal insufficiency. Accordingly the parent / carer may have initiated their ‘sick day management plan’ including administration of their own IM injection of hydrocortisone. Alternatively the parent / carer may request Paramedics administer hydrocortisone. Review the patient's care plan as a part of your assessment.",
      "The patient with a history of PAI may have very poor veins for IV access. Do not delay hydrocortisone while trying to gain IV access. Use the IM route. Extended travel time > 1 hour",
      "Consult with the patient’s endocrine specialist or Medical Advisor via AV Clinician to establish ongoing IV fluid management plan and any other care priorities. Hydrocortisone is unlikely to cause harm but has the potential to be life-saving. If there is any doubt, initiate Hydrocortisone and IV fluids."
    ],
    management_mica: [],
    notes: "BGL <2.6 mmol/L. Conscious: oral glucose gel. IV: Dextrose 10% 2 mL/kg. Glucagon 500 mcg IM (<12yr), 1 mg (≥12yr) if no IV. Recheck BGL 10 min. PIPER for neonatal hypoglycaemia."
  },

  paediatric_hyperglycaemia: {
    cpg: "P0718",
    title: "Paediatric Hyperglycaemia and Ketosis",
    careObjectives: [
      "Identify and treat patients with clear signs of sepsis",
      "Risk stratify patients presenting with infection to inform an appropriate disposition"
    ],
    management: [],
    management_mica: [],
    notes: "DKA common in paediatrics. IV normal saline for dehydration/shock. No insulin prehospital. Anti-emetic. PIPER consultation for severe DKA."
  },

  paediatric_major_trauma: {
    cpg: "P0806",
    title: "Paediatric Major Trauma",
    careObjectives: [
      "Immediate control of major haemorrhage",
      "Ensure: — Airway patency — Breathing (adequate oxygenation and ventilation) — Circulation (adequate perfusion)",
      "Prioritise transport",
      "Supportive care as required"
    ],
    management: [],
    management_mica: [],
    notes: "cABCDE. Haemorrhage control first. No permissive hypotension in paediatrics. IO if IV >90 sec. PRBC (MICA credentialled). Consider non-accidental injury. PIPER consultation."
  },

  paediatric_burns: {
    cpg: "P0805",
    title: "Paediatric Burns",
    careObjectives: [
      "Moderate-Severe TBI: Optimise airway patency, oxygenation, ventilation, and cerebral perfusion pressure to prevent secondary brain injury",
      "Mild TBI / other head injuries: — Identify high risk patients and triage to neurosurgical facility where possible — Identify moderate risk patients and transport to ED for CT or observation — Identify low risk patients and refer into the community with self-care advice"
    ],
    management: [],
    management_mica: [],
    notes: "20 min cool water. Lund and Browder chart. Parkland weight-based. Analgesia weight-based. Non-accidental injury consideration. PIPER for significant burns."
  },

  paediatric_chest_injury: {
    cpg: "P0802",
    title: "Paediatric Chest Injury",
    careObjectives: [
      "Adequate oxygenation",
      "Effective pain relief to assist in maintaining adequate ventilation",
      "Early identification and management of tension pneumothorax"
    ],
    management: [
      "Sitting upright (awake and spontaneously ventilating patients) Optimises respiratory mechanics",
      "Lie supine / 10-15 degrees head-up: where patient is hypo perfused or requires spinal precautions Oxygenation",
      "Consider the need for oxygen in any patient with chest injury or impaired ventilation. Pain relief",
      "Early and effective analgesia is essential. Pain associated with rib fractures can lead to hypoventilation. Methoxyflurane may be less effective if pain on inspiration impedes administration.",
      "Do not splint chest injury This is not effective and may increase pain. Open chest wounds",
      "Do not cover open chest wounds unless there is significant haemorrhage. Covering will seal the wound and may worsen or cause a tension pneumothorax.",
      "Leave the wound open and monitor the patient closely. Vented Chest seals",
      "Chest seals may have already been applied to open chest wounds by other agencies such as the police special operations group",
      "Remove chest seal if there is evidence of tension pneumothorax Needle thoracostomy",
      "Chest decompression by needle thoracostomy is the primary management for tension pneumothorax. — ARS or IV Cannula: CWI/OPS/169 — Arrow® Pneumothorax Kit: CWI/OPS/073",
      "Do not perform needle thoracostomy unless there is evidence of tension pneumothorax.",
      "Consult AV Medical Advisor via the AV Clinician for suspected tension pneumothorax where cardiac arrest is not imminent.",
      "Local anaesthetic with lidocaine is not recommended due to the risk of damage to underlying vessels in paediatric patients.",
      "An uncomplicated pneumothorax does not routinely require decompression for flight."
    ],
    management_mica: [],
    notes: "Elastic thorax — rib fractures uncommon but significant. Needle decompression 2nd ICS MCL. Tension pneumothorax: high suspicion even without rib fractures. Pulmonary contusion common."
  },

  paediatric_spinal_injury: {
    cpg: "P0804",
    title: "Paediatric Spinal Injury",
    careObjectives: [
      "Identify patients with suspected SCI and transfer them to the appropriate facility.",
      "To protect and support the integrity of the spinal column where SCI is suspected or unstable vertebral injury cannot be excluded.",
      "To avoid unnecessary immobilisation by clinically excluding patients without injury to the spinal column."
    ],
    management: [],
    management_mica: [],
    notes: "SCIWORA more common. Cervical immobilisation. Avoid excessive extension. Paediatric-sized collar."
  },

  paediatric_traumatic_head_injury: {
    cpg: "P0803",
    title: "Paediatric Traumatic Head Injury",
    careObjectives: [
      "To identify and manage potential airway burns as a priority",
      "To minimise the impact of injury by maintaining tissue and organ perfusion, minimising pain, appropriate burn wound cooling and minimising heat loss during transfer to hospital."
    ],
    management: [],
    management_mica: [],
    notes: "Age-appropriate BP targets. Avoid hypoxia. ETCO2 35–45. Non-accidental injury consideration. GCS modified for age. Intubation (MICA) for GCS ≤8 or deteriorating."
  },

  paediatric_hypothermia: {
    cpg: "P0901",
    title: "Paediatric Hypothermia / Cold Exposure",
    careObjectives: [
      "To identify and appropriately manage hypothermic patients",
      "To minimise the risk of major trauma patients becoming hypothermic"
    ],
    management: [
      "The target temperature for the patient compartment of the ambulance for patients suffering or at risk of hypothermia is 24°C or higher.",
      "If a patient has wet clothes on they must be removed, the patient dried and then thermally protected. If a patient has dry clothes on, they should only be removed if required to assess and treat injuries.",
      "Where IV fluid is indicated it should be delivered via a fluid warmer if available.",
      "Bags of IV fluid are not to be warmed in a microwave and either administered to a patient, or used as a hot water bottle. Cardiac arrest",
      "The onset and duration of medications is prolonged during hypothermia. In cardiac arrest if the patient has a temperature < 30°C, the interval between doses of adrenaline or amiodarone is doubled Intubation"
    ],
    management_mica: [
      "Intubated hypothermic patients should have their temperature monitored with an oesophageal temperature probe where available.",
      "Intubated patients who are sedated and paralysed are at risk of becoming hypothermic and should have thermal management initiated once stabilised. Flowchart"
    ],
    notes: "Remove wet clothing, insulate. Active rewarming moderate/severe. PIPER consultation. Neonates: exothermic blanket."
  },

  paediatric_hyperthermia: {
    cpg: "P0902",
    title: "Paediatric Hyperthermia / Heat Stress",
    careObjectives: [
      "To identify and appropriately manage hyperthermic patients with an urgency relative to their presentation.",
      "The focus of treatment must be on aggressive cooling."
    ],
    management: [
      "Consult VPIC Flowchart"
    ],
    management_mica: [],
    notes: "Remove from heat. Cool water/ice packs. IV cold saline. Paracetamol/ibuprofen. Midazolam for prolonged febrile seizures. PIPER for severe."
  }

};

const ASSESSMENT_TOOLS = {

  GCS: {
    name: "Glasgow Coma Scale",
    cpg: "A0104",
    description: "Objective measure of consciousness. Patient receives highest score in each category based on response.",
    eye_opening: { "4": "Spontaneous", "3": "To voice", "2": "To pain", "1": "None" },
    verbal_response: { "5": "Orientated", "4": "Confused", "3": "Inappropriate words", "2": "Incomprehensible sounds", "1": "None" },
    motor_response: { "6": "Obeys command", "5": "Localises to pain", "4": "Withdraws from pain", "3": "Flexion to pain", "2": "Extension to pain", "1": "None" },
    total_range: "3–15",
    notes: "A low GCS in isolation does not dictate airway management — consider full clinical picture. Use AVPU if aphasia, facial injury, or language barrier. AVPU to GCS approximation: V ≈ 10–14, P ≈ 7–9, U < 7."
  },

  AVPU: {
    name: "AVPU Scale",
    cpg: "A0104",
    description: "Quick conscious state assessment. Appropriate for both adult and paediatric patients.",
    scores: {
      "A": "Alert",
      "V": "Responds to Voice",
      "P": "Responds to Pain",
      "U": "Unresponsive"
    },
    notes: "Preferred for paediatric patients where adapting the GCS is problematic. Use formal GCS for advanced decision-making (e.g. RSI threshold)."
  },

  NEWS2: {
    name: "National Early Warning Score 2",
    cpg: "A0729",
    description: "Used in conjunction with qSOFA and risk factors to risk-stratify patients with suspected infection.",
    parameters: ["Respiratory rate", "SpO2 (Scale 1 or 2 for COPD)", "Systolic BP", "Pulse rate", "Consciousness (AVPU)", "Temperature", "Supplemental oxygen use"],
    interpretation: {
      "0–4": "Low risk",
      "5–6": "Medium risk — escalate care",
      "≥7": "High risk — urgent escalation"
    },
    notes: "NEWS2 alone is insufficient to judge overall sepsis risk. Combine with qSOFA and clinical risk factors. Elderly patients may not present with aberrant vital signs. Clinical judgement required."
  },

  qSOFA: {
    name: "Quick Sequential Organ Failure Assessment",
    cpg: "A0729",
    description: "Identifies patients with infection at increased risk of sepsis, ICU admission and mortality.",
    criteria: [
      "Hypotension (SBP ≤ 100 mmHg)",
      "Altered conscious state (GCS < 15 unless normal for patient)",
      "Tachypnoea (RR ≥ 22)"
    ],
    interpretation: "qSOFA ≥ 2 in setting of suspected infection = high risk for sepsis",
    notes: "Use alongside NEWS2 and clinical risk factors. Does not replace clinical judgement."
  },

  Apgar: {
    name: "Apgar Score",
    cpg: "N0101",
    description: "Assessed at 1 minute and 5 minutes post birth, then at 5-minute intervals until score > 7. Not to be used as guide for resuscitation timing.",
    categories: {
      "Appearance": { "0": "Blue/pale", "1": "Body pink, extremities blue", "2": "Totally pink" },
      "Pulse":      { "0": "Absent",    "1": "< 100",                        "2": "> 100" },
      "Grimace":    { "0": "None",       "1": "Grimaces",                     "2": "Cries" },
      "Activity":   { "0": "Limp",       "1": "Extremity flexion",            "2": "Active motion" },
      "Respiratory effort": { "0": "Absent", "1": "Weak/gasping/ineffective", "2": "Strong cry" }
    },
    interpretation: { "7–10": "Normal", "4–6": "Moderate concern", "0–3": "Requires immediate resuscitation" },
    notes: "Apgar scores should NOT guide resuscitation timing — use 30-second assessment cycles as per N0201."
  },

  Rule_of_Nines: {
    name: "Rule of Nines (Burns TBSA)",
    cpg: "A0805",
    description: "Estimate total body surface area (TBSA) of burns in adults.",
    regions: {
      "Head and neck": "9%",
      "Each arm": "9%",
      "Anterior trunk": "18%",
      "Posterior trunk": "18%",
      "Each thigh": "9%",
      "Each lower leg": "9%",
      "Genitalia/perineum": "1%"
    },
    notes: "Use Lund and Browder chart for paediatrics — more accurate due to head/leg proportions. Palm of patient's hand (including fingers) ≈ 1% TBSA for irregular burn estimation."
  },

  Clinical_Frailty_Scale: {
    name: "Clinical Frailty Scale (CFS)",
    cpg: "A0808",
    description: "Assesses frailty in elderly patients to inform clinical decision-making.",
    scores: {
      "1": "Very fit — robust, active, energetic, motivated",
      "2": "Well — no active disease, less fit than category 1",
      "3": "Managing well — medical problems well controlled, not regularly active",
      "4": "Vulnerable — not dependent but symptoms limit activities",
      "5": "Mildly frail — limited dependence in higher-order ADLs",
      "6": "Moderately frail — help needed with all outside activities and housekeeping",
      "7": "Severely frail — completely dependent in personal care",
      "8": "Very severely frail — completely dependent, approaching end of life",
      "9": "Terminally ill — life expectancy < 6 months"
    },
    notes: "CFS ≥ 5 = frail. Use to inform resuscitation decisions, disposition, and referral pathways."
  },

  PAT: {
    name: "Paediatric Assessment Triangle",
    cpg: "P0101-1",
    description: "Rapid 'first impression' assessment for paediatric patients. Conducted without equipment in seconds.",
    components: {
      "Appearance": "Tone, interactivity, consolability, look/gaze, speech/cry",
      "Work of Breathing": "Abnormal sounds (stridor, grunting, wheezing), abnormal positioning, retractions, nasal flaring",
      "Circulation to Skin": "Pallor, mottling, cyanosis"
    },
    interpretation: {
      "All normal": "Stable — complete assessment",
      "Abnormal appearance only": "Primary brain/metabolic problem",
      "Abnormal work of breathing only": "Primary respiratory problem",
      "Abnormal circulation only": "Primary cardiovascular problem",
      "Abnormal appearance + breathing": "Respiratory failure",
      "Abnormal appearance + circulation": "Shock with brain involvement",
      "All abnormal": "Cardiopulmonary failure — immediate action"
    },
    notes: "Abnormal findings on PAT → proceed immediately to primary survey."
  },

  Pain_Scales: {
    name: "Pain Assessment Scales",
    cpg: "A0501-1",
    description: "Used to quantify pain and assess analgesic response.",
    scales: {
      "NRS (Numeric Rating Scale)": "0 (no pain) to 10 (worst imaginable). Patient self-reports.",
      "VRS (Verbal Rating Scale)": "None / Mild / Moderate / Severe / Excruciating",
      "FLACC (Paediatric)": "Face, Legs, Activity, Cry, Consolability — scored 0–2 each (total 0–10). For non-verbal children.",
      "Faces Pain Scale": "6 faces from neutral to crying. For children ≥ 3 years."
    },
    notes: "Inability to report or rate pain (dementia, intellectual disability, non-English speaking) should not preclude analgesia. Assess for discomfort in context of pain-producing stimuli."
  },

  Wells_Criteria_PE: {
    name: "Wells Criteria for PE",
    cpg: "A0605",
    description: "Pre-test probability assessment for pulmonary embolism.",
    criteria: [
      "Clinical signs/symptoms of DVT (leg swelling, pain on palpation) — 3 points",
      "PE is #1 diagnosis, or equally likely — 3 points",
      "Heart rate > 100 bpm — 1.5 points",
      "Immobilisation ≥ 3 days or surgery in previous 4 weeks — 1.5 points",
      "Previous objectively diagnosed PE or DVT — 1.5 points",
      "Haemoptysis — 1 point",
      "Malignancy (on treatment, treated in last 6 months, or palliative) — 1 point"
    ],
    interpretation: {
      "≤ 4": "PE unlikely",
      "> 4": "PE likely"
    },
    notes: "Prehospital utility is limited — use to inform clinical suspicion. Dyspnoea, tachypnoea, and pleuritic pain occur in >90% of PE cases."
  }

};


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
  module.exports = { CPG_PACKAGES, ASSESSMENT_TOOLS, DRUG_REFERENCE_EXTENDED, CPG_COMBINATIONS };
}
