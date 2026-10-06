import type { EvidenceRecord, PaperRecord, QuestionCandidate, QuestionFamily } from '../../engine/types';

/**
 * PHYSICS research database.
 * Every EvidenceRecord is traceable to a paper record -> source registry URL.
 * `extraction: 'verbatim'` = wording read directly from the source page.
 * `extraction: 'concept'`  = only topic-level analysis was readable (no verbatim wording claimed).
 * marks = 0 means "mark value not readable from the source" (never guessed).
 */

export const PHYSICS_PAPERS: PaperRecord[] = [
  { id: 'p-phy-2079b', subject: 'physics', label: 'NEB Board 2079 (2022) — code 1021 O', examType: 'neb-board', bsYear: 2079, adYear: 2022, sourceId: 'paper-phy-2079', extraction: 'concept' },
  { id: 'p-phy-2079m', subject: 'physics', label: 'NEB Model Question 2079 (for 2080 batch)', examType: 'neb-model', bsYear: 2079, adYear: 2023, sourceId: 'model-phy-2079', extraction: 'concept' },
  { id: 'p-phy-2080p', subject: 'physics', label: 'NEB Board 2080 (2023) — Set P', examType: 'neb-board', bsYear: 2080, adYear: 2023, sourceId: 'paper-phy-2080p', extraction: 'concept' },
  { id: 'p-phy-2081d', subject: 'physics', label: 'NEB Board 2081 (2024) — Set D', examType: 'neb-board', bsYear: 2081, adYear: 2024, sourceId: 'paper-phy-2081d', extraction: 'concept' },
  { id: 'p-phy-2082h', subject: 'physics', label: 'NEB Board 2082 (2025) — Set H', examType: 'neb-board', bsYear: 2082, adYear: 2025, sourceId: 'paper-phy-2082h', extraction: 'concept' },
  { id: 'p-phy-2082g', subject: 'physics', label: 'NEB Board 2082 (2025) — General Stream 1021 H (structure verified only)', examType: 'neb-board', bsYear: 2082, adYear: 2025, sourceId: 'paper-phy-2082gen', extraction: 'concept' },
];

const fam = (id: string, chapterId: string, concept: string, aliases: string[] = []): QuestionFamily => ({
  id, subject: 'physics', chapterId, concept, aliases,
});

export const PHYSICS_FAMILIES: QuestionFamily[] = [
  /* Mechanics */
  fam('phy-rotational-application', 'phy-01', 'Rotational dynamics application questions (torque, angular acceleration, MI)', ['Find the torque...', 'A body rotates with...']),
  fam('phy-moment-of-inertia', 'phy-01', 'Moment of inertia and radius of gyration', ['Define moment of inertia', 'Obtain the MI of a uniform rod', 'What is radius of gyration?']),
  fam('phy-angular-momentum', 'phy-01', 'Conservation of angular momentum', ['State conservation of angular momentum', 'Derive angular momentum conservation']),
  fam('phy-shm-basics', 'phy-02', 'Simple harmonic motion: definition, equation and energy', ['Define SHM', 'Derive the equation of SHM', 'Obtain the solution of the differential equation of SHM']),
  fam('phy-shm-spring-pendulum', 'phy-02', 'Time period of a spring–mass oscillator and simple pendulum', ['Derive T of a simple pendulum', 'Time period of mass-suspended spring']),
  fam('phy-resonance', 'phy-02', 'Damped and forced oscillation; resonance', ['What is resonance?', 'Distinguish forced and damped oscillations']),
  fam('phy-bernoulli', 'phy-03', "Bernoulli's principle and its applications", ["Derive Bernoulli's equation", "State Bernoulli's theorem and prove it", "Obtain the relation between pressure and speed of fluid"]),
  fam('phy-stokes', 'phy-03', "Stokes' law and terminal velocity", ["State Stokes' law", "Derive expression for terminal velocity", "Explain why a sphere reaches terminal velocity"]),
  fam('phy-poiseuille', 'phy-03', "Poiseuille's formula and viscosity measurement", ["Derive Poiseuille's formula", "How is coefficient of viscosity determined experimentally?"]),
  fam('phy-surface-tension', 'phy-03', 'Surface tension, surface energy, angle of contact and capillarity', ['Define surface tension', 'Explain capillarity and Jurin law']),
  fam('phy-equation-continuity', 'phy-03', 'Equation of continuity', ['Derive equation of continuity']),
  /* Heat and thermodynamics */
  fam('phy-first-law', 'phy-04', 'First law of thermodynamics', ['State first law of thermodynamics', 'Show first law is conservation of energy']),
  fam('phy-isothermal-adiabatic', 'phy-04', 'Isothermal and adiabatic processes; work done; heat capacities', ['Derive work done in isothermal process', 'Derive PV^gamma = constant', 'Show Cp - Cv = R']),
  fam('phy-second-law', 'phy-05', 'Second law of thermodynamics (Kelvin-Planck and Clausius statements)', ['State second law of thermodynamics']),
  fam('phy-carnot-heat-engine', 'phy-05', 'Carnot cycle, heat engine and efficiency', ["Describe Carnot's engine and derive efficiency", 'Calculate efficiency of Carnot engine']),
  fam('phy-otto-diesel', 'phy-05', 'Otto and Diesel cycles; petrol/diesel engine', ['Explain petrol engine with P-V diagram', 'Otto cycle efficiency']),
  fam('phy-refrigerator', 'phy-05', 'Refrigerator and coefficient of performance', ['Explain refrigerator and COP']),
  fam('phy-entropy', 'phy-05', 'Entropy and disorder', ['Define entropy', 'What is entropy increase?']),
  /* Waves and optics */
  fam('phy-wave-equation', 'phy-06', 'Progressive wave equation and stationary waves', ['Derive equation of a progressive wave', 'Explain stationary waves']),
  fam('phy-velocity-sound', 'phy-07', 'Velocity of sound in gases; Newton-Laplace; effect of temperature/pressure/humidity', ["Derive Newton's formula for velocity of sound", "Explain Laplace's correction", 'Effect of temperature on velocity of sound']),
  fam('phy-organ-pipes', 'phy-08', 'Stationary waves in pipes; harmonics, overtones, end correction', ['Frequencies of closed and open organ pipe', 'Explain end correction']),
  fam('phy-sonometer', 'phy-08', 'Sonometer and laws of vibration of a stretched string', ['State laws of vibration of stretched string', 'Describe sonometer experiment']),
  fam('phy-doppler', 'phy-09', "Doppler's effect in sound", ["Derive Doppler's effect expression", 'Apparent frequency when source approaches']),
  fam('phy-sound-characteristics', 'phy-09', 'Characteristics of sound: intensity, loudness, pitch, quality', ['Define intensity of sound', 'Distinguish loudness and intensity']),
  fam('phy-huygens', 'phy-10', "Huygen's principle; reflection and refraction by wave theory", ["State Huygen's principle", 'Explain reflection using wave theory']),
  fam('phy-youngs-ds', 'phy-11', "Young's double slit experiment, fringe width and interference", ["Derive fringe width in Young's experiment", 'Explain YDSE with intensity distribution']),
  fam('phy-diffraction', 'phy-12', 'Diffraction from a single slit and diffraction grating', ['Explain diffraction pattern', 'Resolving power of grating']),
  fam('phy-brewster', 'phy-13', "Polarization and Brewster's law", ["State Brewster's law", 'Show light is transverse by polarization']),
  /* Electricity and magnetism */
  fam('phy-kirchhoffs', 'phy-14', "Kirchhoff's laws of electrical circuits", ["State Kirchhoff's laws", 'Apply junction and loop rules']),
  fam('phy-wheatstone', 'phy-14', 'Wheatstone bridge and meter bridge', ['Obtain balanced condition of Wheatstone bridge', 'Explain meter bridge experiment', 'Why is meter bridge preferred over Wheatstone?']),
  fam('phy-potentiometer', 'phy-14', 'Potentiometer: potential gradient, comparison of e.m.f., internal resistance', ['Explain potential gradient', 'Compare e.m.f.s using potentiometer', 'Determine internal resistance of a cell']),
  fam('phy-galvanometer-conv', 'phy-14', 'Conversion of galvanometer into voltmeter/ammeter; ohmmeter', ['Convert galvanometer into voltmeter']),
  fam('phy-joules-law', 'phy-14', "Joule's law of heating", ["State Joule's law"]),
  fam('phy-thermoelectric', 'phy-15', 'Seebeck effect, thermocouple, Peltier effect and thermopile', ['Explain Seebeck effect', 'Peltier effect and thermopile']),
  fam('phy-biot-savart', 'phy-16', 'Biot-Savart law and its applications (coil, straight wire, solenoid)', ["State Biot-Savart law", 'Magnetic field at centre of circular coil', 'Field due to long solenoid']),
  fam('phy-ampere-law', 'phy-16', "Ampere's law applications (straight conductor, solenoid, toroid)", ["State Ampere's circuital law", 'Field inside toroidal solenoid']),
  fam('phy-force-conductors', 'phy-16', 'Force between two parallel current-carrying conductors; definition of ampere', ['Force per unit length between conductors', 'Define ampère using parallel wires']),
  fam('phy-force-charge', 'phy-16', 'Force on a moving charge and on a current-carrying conductor', ['Derive F = IL x B', 'Lorentz force']),
  fam('phy-mc-galvanometer', 'phy-16', 'Torque on rectangular coil; moving coil galvanometer; Hall effect', ['Derive torque on coil in magnetic field', 'Explain moving coil galvanometer']),
  fam('phy-hysteresis', 'phy-17', 'Hysteresis loop and classification of magnetic materials', ['Explain hysteresis loop', 'Dia-, para-, ferromagnetic materials']),
  fam('phy-faraday-lenz', 'phy-18', "Faraday's laws and Lenz's law of electromagnetic induction", ["State Faraday's laws", "State Lenz's law and its significance", 'Induced emf in rotating coil']),
  fam('phy-inductor-energy', 'phy-18', 'Self/mutual inductance and energy stored in an inductor', ['Derive energy stored in an inductor', 'Self inductance and mutual inductance']),
  fam('phy-eddy-transformer', 'phy-18', 'Eddy currents, AC generator and transformer', ['Explain transformer action', 'Eddy currents and their uses']),
  fam('phy-lcr-resonance', 'phy-19', 'Series LCR circuit, resonance and quality factor', ['Derive impedance of series LCR', 'Resonance condition and Q factor']),
  fam('phy-ac-power', 'phy-19', 'Power in AC circuits, power factor and choke coil', ['Define power factor', 'Why is choke coil used?', 'Explain choke coil in AC circuits']),
  fam('phy-rms-ac', 'phy-19', 'Peak and r.m.s. values of AC; AC through R, L, C', ['Derive relation between peak and r.m.s value']),
  /* Modern physics */
  fam('phy-thomson', 'phy-20', "Thomson's experiment for specific charge of electron", ["Describe Thomson's e/m experiment", 'Why is E perpendicular to B in Thomson method?']),
  fam('phy-millikan', 'phy-20', "Millikan's oil drop experiment", ["Explain Millikan's oil drop experiment", 'Terminal velocity of charged oil drop in field']),
  fam('phy-photoelectric', 'phy-21', "Einstein's photoelectric equation, stopping potential, Planck's constant", ["State Einstein's photoelectric equation", 'Determine Planck constant experimentally', 'Photoelectric graph (stopping potential vs frequency)']),
  fam('phy-rectification', 'phy-22', 'P-N junction, diode characteristics and full-wave rectification', ['Explain full wave rectification using two diodes', 'Forward and reverse bias characteristics']),
  fam('phy-logic-gates', 'phy-22', 'Logic gates, truth tables and combinations', ['Write truth table of NAND gate', 'Implement NOT using NAND']),
  fam('phy-bohr', 'phy-23', "Bohr's hydrogen atom, energy levels and spectral series", ["Derive Bohr's radius and energy", 'Explain spectral series of hydrogen', 'Energy level diagram of hydrogen']),
  fam('phy-debroglie', 'phy-23', 'De Broglie wavelength, duality and uncertainty principle', ['Derive de Broglie wavelength', 'State uncertainty principle']),
  fam('phy-bragg', 'phy-23', 'X-rays, production, uses and Bragg law', ['Explain Bragg law', 'Nature and production of X-rays']),
  /* Radioactivity and trends */
  fam('phy-radioactive-laws', 'phy-24', 'Laws of radioactive disintegration; alpha, beta, gamma rays', ['State laws of radioactive disintegration', 'Differentiate alpha, beta, gamma rays']),
  fam('phy-half-life', 'phy-24', 'Half-life, mean life, decay constant and decay law', ['Derive radioactive decay law', 'Define half-life and mean life', 'Solve half-life numericals']),
  fam('phy-gm-dating', 'phy-24', 'Geiger-Muller tube and carbon dating', ['Explain Geiger-Muller tube', 'How is carbon dating done?']),
  fam('phy-medical-nuclear', 'phy-24', 'Medical uses of nuclear radiation and health hazards', ['Medical uses of radioactivity', 'Health hazards of nuclear radiation']),
  fam('phy-recent-trends', 'phy-25', 'Recent trends: seismic waves, gravitational waves, nanotechnology, Higgs boson', ['What are gravitational waves?', 'Types of seismic waves']),
];

let eN = 0;
const e = (
  paperId: string, familyId: string, chapterId: string, text: string, marks: number,
  questionType: EvidenceRecord['questionType'], extra: Partial<EvidenceRecord> = {},
): EvidenceRecord => ({ id: `e-phy-${++eN}`, paperId, familyId, chapterId, text, marks, questionType, extraction: 'concept', ...extra });

export const PHYSICS_EVIDENCE: EvidenceRecord[] = [
  /* NEB Board 2079 (2022) — Group A wording readable on source page */
  e('p-phy-2079b', 'phy-rotational-application', 'phy-01', 'In rotational motion, the physical quantity that imparts angular acceleration is: (A) Force (B) Torque (C) Moment of inertia (D) Angular momentum', 1, 'mcq', { extraction: 'verbatim', slot: 'A-1' }),
  e('p-phy-2079b', 'phy-shm-spring-pendulum', 'phy-02', 'Two identical springs arranged with a block give oscillation frequency f; if one spring is removed, the frequency of oscillation will be: (A) f (B) 2f (C) √2 f (D) f/√2', 1, 'mcq', { extraction: 'verbatim', slot: 'A-2' }),
  e('p-phy-2079b', 'phy-surface-tension', 'phy-03', 'A liquid does not wet the surface of a solid if the angle of contact is: (A) 90° (B) less than 90° (C) greater than 90° (D) 0°', 1, 'mcq', { extraction: 'verbatim', slot: 'A-3' }),

  /* NEB Model Question 2079 (for 2080 batch) — Group B/C topics */
  e('p-phy-2079m', 'phy-shm-basics', 'phy-02', 'Simple Harmonic Motion (short answer)', 5, 'short-answer', { slot: 'B-12' }),
  e('p-phy-2079m', 'phy-bernoulli', 'phy-03', "Bernoulli's principle and fluid mechanics", 5, 'short-answer', { slot: 'B-13' }),
  e('p-phy-2079m', 'phy-otto-diesel', 'phy-05', 'Thermodynamics: petrol engine', 5, 'short-answer', { slot: 'B-14' }),
  e('p-phy-2079m', 'phy-sonometer', 'phy-08', 'Waves: sonometer and standing waves', 5, 'short-answer', { slot: 'B-15' }),
  e('p-phy-2079m', 'phy-faraday-lenz', 'phy-18', "Electromagnetic induction: Lenz's law", 5, 'short-answer', { slot: 'B-16' }),
  e('p-phy-2079m', 'phy-potentiometer', 'phy-14', 'Potentiometer (comparison of e.m.f. / internal resistance) — first part of Q17', 5, 'short-answer', { slot: 'B-17a', note: 'Q17 combined potentiometer and meter bridge; split into two concept records.' }),
  e('p-phy-2079m', 'phy-wheatstone', 'phy-14', 'Meter bridge / Wheatstone bridge — second part of Q17', 5, 'short-answer', { slot: 'B-17b', note: 'Same paper slot as B-17a (one question, two concepts).' }),
  e('p-phy-2079m', 'phy-photoelectric', 'phy-21', 'Photoelectric effect', 5, 'short-answer', { slot: 'B-18' }),
  e('p-phy-2079m', 'phy-millikan', 'phy-20', "Millikan's oil drop experiment", 5, 'short-answer', { slot: 'B-19' }),
  e('p-phy-2079m', 'phy-bohr', 'phy-23', 'Atomic physics and hydrogen spectrum (Bohr model)', 8, 'long-answer', { slot: 'C-20' }),
  e('p-phy-2079m', 'phy-youngs-ds', 'phy-11', 'Wave optics (main option of Q.21)', 8, 'long-answer', { slot: 'C-21' }),
  e('p-phy-2079m', 'phy-velocity-sound', 'phy-07', 'Sound waves (OR alternative of Q.21)', 8, 'long-answer', { slot: 'C-21-OR', note: 'The OR option was labelled only "Sound Waves" in the source.' }),
  e('p-phy-2079m', 'phy-ac-power', 'phy-19', 'AC circuits and choke coil', 8, 'long-answer', { slot: 'C-22' }),

  /* NEB Board 2080 Set P — topic-level map */
  e('p-phy-2080p', 'phy-otto-diesel', 'phy-05', 'MCQ with P–V diagram of a thermodynamic cycle', 1, 'mcq', { slot: 'A-4' }),
  e('p-phy-2080p', 'phy-stokes', 'phy-03', "Stokes' law sphere figure — terminal velocity numerical", 5, 'numerical', { slot: 'B-13' }),
  e('p-phy-2080p', 'phy-wheatstone', 'phy-14', 'Wheatstone bridge circuit', 5, 'diagram', { slot: 'B-19' }),
  e('p-phy-2080p', 'phy-photoelectric', 'phy-21', 'Photoelectric graph question (stopping potential vs frequency)', 8, 'explanation', { slot: 'C-21' }),
  e('p-phy-2080p', 'phy-force-conductors', 'phy-16', 'Figure of parallel current-carrying conductors — force between them', 8, 'derivation', { slot: 'C-22' }),
  e('p-phy-2080p', 'phy-lcr-resonance', 'phy-19', 'LCR circuit diagram (OR option of Q.22)', 8, 'explanation', { slot: 'C-22-OR' }),
  e('p-phy-2080p', 'phy-thermoelectric', 'phy-15', 'Thermocouple question (mentioned in Set P analysis; slot not readable)', 0, 'short-answer', { note: 'Marks/slot not machine-readable from the source analysis.' }),

  /* NEB Board 2081 Set D — topic-level map with OR pairs */
  e('p-phy-2081d', 'phy-rotational-application', 'phy-01', 'Rotational dynamics short question (main option of Q.12)', 5, 'short-answer', { slot: 'B-12' }),
  e('p-phy-2081d', 'phy-shm-basics', 'phy-02', 'Simple harmonic motion (OR option of Q.12)', 5, 'short-answer', { slot: 'B-12-OR' }),
  e('p-phy-2081d', 'phy-isothermal-adiabatic', 'phy-04', 'Adiabatic process (part a of Q.14)', 5, 'short-answer', { slot: 'B-14a' }),
  e('p-phy-2081d', 'phy-refrigerator', 'phy-05', 'Refrigerator (part b of Q.14)', 0, 'short-answer', { slot: 'B-14b', note: 'Sub-part marks not readable.' }),
  e('p-phy-2081d', 'phy-sonometer', 'phy-08', 'Sonometer (part a of Q.15)', 5, 'short-answer', { slot: 'B-15a' }),
  e('p-phy-2081d', 'phy-organ-pipes', 'phy-08', 'Organ pipe (part b of Q.15)', 0, 'short-answer', { slot: 'B-15b', note: 'Sub-part marks not readable.' }),
  e('p-phy-2081d', 'phy-potentiometer', 'phy-14', 'Potential gradient (part a of Q.16)', 5, 'short-answer', { slot: 'B-16a' }),
  e('p-phy-2081d', 'phy-wheatstone', 'phy-14', 'Meter bridge (part b of Q.16)', 0, 'short-answer', { slot: 'B-16b', note: 'Sub-part marks not readable.' }),
  e('p-phy-2081d', 'phy-rms-ac', 'phy-19', 'AC circuits (Q.17)', 5, 'short-answer', { slot: 'B-17', note: 'Analysis headed only "AC Circuits"; assigned to the AC fundamentals family.' }),
  e('p-phy-2081d', 'phy-rectification', 'phy-22', 'Semiconductor (Q.18)', 5, 'short-answer', { slot: 'B-18' }),
  e('p-phy-2081d', 'phy-bohr', 'phy-23', 'Atomic physics (Q.19)', 5, 'short-answer', { slot: 'B-19' }),
  e('p-phy-2081d', 'phy-velocity-sound', 'phy-07', 'Sound (main option of Q.20)', 8, 'long-answer', { slot: 'C-20' }),
  e('p-phy-2081d', 'phy-youngs-ds', 'phy-11', 'Wave optics (OR option of Q.20)', 8, 'long-answer', { slot: 'C-20-OR' }),
  e('p-phy-2081d', 'phy-faraday-lenz', 'phy-18', 'Electromagnetic induction (part of Q.21)', 8, 'long-answer', { slot: 'C-21a' }),
  e('p-phy-2081d', 'phy-eddy-transformer', 'phy-18', 'Eddy currents (part of Q.21)', 0, 'long-answer', { slot: 'C-21b', note: 'Sub-part marks not readable.' }),
  e('p-phy-2081d', 'phy-thomson', 'phy-20', "Thomson's method (part of Q.22)", 8, 'long-answer', { slot: 'C-22a' }),
  e('p-phy-2081d', 'phy-photoelectric', 'phy-21', 'Photoelectric effect (part of Q.22)', 0, 'long-answer', { slot: 'C-22b', note: 'Sub-part marks not readable.' }),

  /* NEB Board 2082 Set H — Group B readable with sub-part marks */
  e('p-phy-2082h', 'phy-rotational-application', 'phy-01', 'Group A MCQ on rotational mechanics (Q.1)', 1, 'mcq', { slot: 'A-1' }),
  e('p-phy-2082h', 'phy-millikan', 'phy-20', 'Group A MCQ referencing Millikan oil drop (Q.9, main)', 1, 'mcq', { slot: 'A-9a' }),
  e('p-phy-2082h', 'phy-thomson', 'phy-20', 'Group A MCQ referencing Thomson experiment (Q.9, related part)', 1, 'mcq', { slot: 'A-9b', note: 'Source describes Q.9 jointly as Millikan/Thomson; split into two concept records.' }),
  e('p-phy-2082h', 'phy-carnot-heat-engine', 'phy-05', "A Carnot's engine with a sink at ... °C: by how much must the source temperature be increased to raise efficiency ... (numerical)", 3, 'numerical', { extraction: 'concept', slot: 'B-14a', note: 'Numerical wording partially truncated on the source page; sub-mark [3] printed.' }),
  e('p-phy-2082h', 'phy-first-law', 'phy-04', 'State first law of thermodynamics. Does it follow the principle of conservation of energy? Explain.', 0, 'short-answer', { slot: 'B-14b', note: 'Sub-part mark not printed in readable text (marks=0, not guessed).' }),
  e('p-phy-2082h', 'phy-velocity-sound', 'phy-07', 'Effect of temperature on velocity of sound', 2, 'short-answer', { slot: 'B-15a' }),
  e('p-phy-2082h', 'phy-doppler', 'phy-09', 'A train is approaching a cliff at 10 m/s; driver sounds a horn of frequency 600 Hz — find observed frequency (v = 340 m/s)', 3, 'numerical', { slot: 'B-15b' }),
  e('p-phy-2082h', 'phy-kirchhoffs', 'phy-14', "State the two Kirchhoff's laws of electrical circuit", 2, 'definition', { slot: 'B-16a' }),
  e('p-phy-2082h', 'phy-wheatstone', 'phy-14', 'Obtain an expression for the balanced condition of Wheatstone bridge using Kirchhoff laws', 3, 'derivation', { slot: 'B-16b' }),
  e('p-phy-2082h', 'phy-faraday-lenz', 'phy-18', "State Lenz's law", 1, 'definition', { slot: 'B-17a' }),
  e('p-phy-2082h', 'phy-faraday-lenz', 'phy-18', 'Plot a graph showing variation of induced e.m.f. in a coil rotating in a uniform magnetic field with time', 1, 'diagram', { slot: 'B-17b' }),
  e('p-phy-2082h', 'phy-inductor-energy', 'phy-18', 'Derive an expression for the energy stored in an inductor', 3, 'derivation', { slot: 'B-17c' }),
  e('p-phy-2082h', 'phy-logic-gates', 'phy-22', 'Write the symbol and truth table of NAND gate', 2, 'diagram', { slot: 'B-18a' }),
  e('p-phy-2082h', 'phy-rectification', 'phy-22', 'Establish full wave rectification using two P-N junction diodes', 3, 'explanation', { slot: 'B-18b' }),
  e('p-phy-2082h', 'phy-millikan', 'phy-20', 'Oil drop of given mass/radius carrying 10 excess electrons — terminal velocity without field and in an electric field (numerical)', 2, 'numerical', { slot: 'B-19a' }),
  e('p-phy-2082h', 'phy-thomson', 'phy-20', "In Thomson's method for e/m of an electron, why is the electric field kept perpendicular to the magnetic field? Justify.", 2, 'explanation', { slot: 'B-19b' }),
  e('p-phy-2082h', 'phy-millikan', 'phy-20', 'What is the use of X-rays in Millikan oil drop experiment?', 1, 'short-answer', { slot: 'B-19c' }),
  e('p-phy-2082h', 'phy-potentiometer', 'phy-14', 'Group C long answer involving potentiometer (Q.21)', 8, 'long-answer', { slot: 'C-21', note: 'Group C analysis text partially truncated; only the potentiometer component was readable.' }),
];

let cN = 0;
const c = (
  chapterId: string, topicId: string | undefined, familyId: string, text: string,
  marks: number, questionType: QuestionCandidate['questionType'], specSection: QuestionCandidate['specSection'],
  conceptual: QuestionCandidate['conceptual'],
  extra: Partial<QuestionCandidate> = {},
): QuestionCandidate => ({
  id: `q-phy-${++cN}`, subject: 'physics', chapterId, topicId, familyId, text, marks,
  questionType, specSection, conceptual, origin: 'syllabus-derived', ...extra,
});

export const PHYSICS_CANDIDATES: QuestionCandidate[] = [
  /* ---- Group A: 1-mark MCQs ---- */
  c('phy-01', 'phy-01-t3', 'phy-moment-of-inertia', 'The moment of inertia of a uniform rod of mass M and length L about an axis through its centre and perpendicular to its length is: (A) ML²/3  (B) ML²/6  (C) ML²/12  (D) ML²/4', 1, 'mcq', 'A', 'core', { options: ['ML²/3', 'ML²/6', 'ML²/12', 'ML²/4'], answerIndex: 2 }),
  c('phy-01', 'phy-01-t4', 'phy-rotational-application', 'In rotational motion, angular acceleration is produced by: (A) Force  (B) Torque  (C) Linear momentum  (D) Angular momentum', 1, 'mcq', 'A', 'core', { options: ['Force', 'Torque', 'Linear momentum', 'Angular momentum'], answerIndex: 1 }),
  c('phy-02', 'phy-02-t1', 'phy-shm-basics', 'In simple harmonic motion, the acceleration is maximum when: (A) displacement is zero  (B) displacement is maximum  (C) velocity is maximum  (D) kinetic energy is maximum', 1, 'mcq', 'A', 'core', { options: ['displacement is zero', 'displacement is maximum', 'velocity is maximum', 'kinetic energy is maximum'], answerIndex: 1 }),
  c('phy-03', 'phy-03-t4', 'phy-stokes', 'The SI unit of coefficient of viscosity is: (A) N·s/m²  (B) N/m  (C) J/s  (D) Wb', 1, 'mcq', 'A', 'standard', { options: ['N·s/m²', 'N/m', 'J/s', 'Wb'], answerIndex: 0 }),
  c('phy-04', 'phy-04-t6', 'phy-isothermal-adiabatic', 'For an isothermal process carried out on an ideal gas: (A) PV = constant  (B) P/V = constant  (C) Q = 0  (D) ΔU ≠ 0', 1, 'mcq', 'A', 'core', { options: ['PV = constant', 'P/V = constant', 'Q = 0', 'ΔU ≠ 0'], answerIndex: 0 }),
  c('phy-05', 'phy-05-t4', 'phy-carnot-heat-engine', 'A Carnot engine works between reservoirs at 500 K and 300 K. Its efficiency is: (A) 0.2  (B) 0.4  (C) 0.6  (D) 1.67', 1, 'mcq', 'A', 'core', { options: ['0.2', '0.4', '0.6', '1.67'], answerIndex: 1 }),
  c('phy-06', 'phy-06-t3', 'phy-wave-equation', 'In a stationary wave, the distance between two consecutive nodes is: (A) λ  (B) λ/2  (C) λ/4  (D) 2λ', 1, 'mcq', 'A', 'standard', { options: ['λ', 'λ/2', 'λ/4', '2λ'], answerIndex: 1 }),
  c('phy-07', 'phy-07-t3', 'phy-velocity-sound', 'The velocity of sound in air increases with: (A) increase of pressure alone  (B) increase of temperature  (C) decrease of temperature  (D) increase of density', 1, 'mcq', 'A', 'core', { options: ['increase of pressure alone', 'increase of temperature', 'decrease of temperature', 'increase of density'], answerIndex: 1 }),
  c('phy-08', 'phy-08-t2', 'phy-organ-pipes', 'The frequency of the first overtone of a closed organ pipe is (fundamental = f): (A) f  (B) 2f  (C) 3f  (D) 4f', 1, 'mcq', 'A', 'core', { options: ['f', '2f', '3f', '4f'], answerIndex: 2 }),
  c('phy-09', 'phy-09-t3', 'phy-doppler', 'When a sound source moves towards a stationary observer, the apparent frequency heard is: (A) less than the true frequency  (B) equal to the true frequency  (C) greater than the true frequency  (D) always zero', 1, 'mcq', 'A', 'core', { options: ['less than the true frequency', 'equal to the true frequency', 'greater than the true frequency', 'always zero'], answerIndex: 2 }),
  c('phy-11', 'phy-11-t2', 'phy-youngs-ds', 'In Young\'s double slit experiment, the fringe width is directly proportional to: (A) d/D  (B) λ  (C) 1/D  (D) 1/λ', 1, 'mcq', 'A', 'core', { options: ['d/D', 'λ', '1/D', '1/λ'], answerIndex: 1 }),
  c('phy-14', 'phy-14-t2', 'phy-wheatstone', 'A Wheatstone bridge is balanced when: (A) P/Q = R/S  (B) P/R = Q/S  (C) P·S = Q·R  (D) P·Q = R·S', 1, 'mcq', 'A', 'core', { options: ['P/Q = R/S', 'P/R = Q/S', 'P·S = Q·R', 'P·Q = R·S'], answerIndex: 0 }),
  c('phy-16', 'phy-16-t6', 'phy-biot-savart', 'The magnetic field at the centre of a circular coil of N turns carrying current I and radius r is proportional to: (A) I·r  (B) N·I/r  (C) N·I·r  (D) N/r', 1, 'mcq', 'A', 'core', { options: ['I·r', 'N·I/r', 'N·I·r', 'N/r'], answerIndex: 1 }),
  c('phy-18', 'phy-18-t2', 'phy-faraday-lenz', "Lenz's law in electromagnetic induction is a consequence of the conservation of: (A) charge  (B) momentum  (C) energy  (D) mass", 1, 'mcq', 'A', 'core', { options: ['charge', 'momentum', 'energy', 'mass'], answerIndex: 2 }),
  c('phy-19', 'phy-19-t4', 'phy-lcr-resonance', 'At resonance in a series LCR circuit, the impedance of the circuit is: (A) maximum  (B) minimum and equal to R  (C) zero  (D) equal to X_L + X_C', 1, 'mcq', 'A', 'core', { options: ['maximum', 'minimum and equal to R', 'zero', 'equal to X_L + X_C'], answerIndex: 1 }),
  c('phy-21', 'phy-21-t2', 'phy-photoelectric', 'In the photoelectric effect, the stopping potential depends on: (A) intensity of incident light  (B) frequency of incident light  (C) area of the metal  (D) brightness of light', 1, 'mcq', 'A', 'core', { options: ['intensity of incident light', 'frequency of incident light', 'area of the metal', 'brightness of light'], answerIndex: 1 }),
  c('phy-22', 'phy-22-t3', 'phy-rectification', 'A full-wave rectifier converts: (A) AC into steady DC  (B) AC into pulsating DC  (C) DC into AC  (D) light into electricity', 1, 'mcq', 'A', 'core', { options: ['AC into steady DC', 'AC into pulsating DC', 'DC into AC', 'light into electricity'], answerIndex: 1 }),
  c('phy-23', 'phy-23-t3', 'phy-bohr', 'The energy of the electron in the ground state (n = 1) of the hydrogen atom is: (A) −13.6 eV  (B) −3.4 eV  (C) 0 eV  (D) +13.6 eV', 1, 'mcq', 'A', 'core', { options: ['−13.6 eV', '−3.4 eV', '0 eV', '+13.6 eV'], answerIndex: 0 }),
  c('phy-24', 'phy-24-t3', 'phy-half-life', 'A radioactive sample has a half-life of 10 days. The fraction of the sample remaining after 30 days is: (A) 1/2  (B) 1/4  (C) 1/8  (D) 1/16', 1, 'mcq', 'A', 'core', { options: ['1/2', '1/4', '1/8', '1/16'], answerIndex: 2 }),
  c('phy-17', 'phy-17-t3', 'phy-hysteresis', 'The material suitable for making a permanent magnet is one with: (A) high permeability and low retentivity  (B) high retentivity and high coercivity  (C) low coercivity and low retentivity  (D) zero area of hysteresis loop', 1, 'mcq', 'A', 'standard', { options: ['high permeability and low retentivity', 'high retentivity and high coercivity', 'low coercivity and low retentivity', 'zero area of hysteresis loop'], answerIndex: 1 }),

  /* ---- Group B: 5-mark short answers ---- */
  c('phy-01', 'phy-01-t3', 'phy-moment-of-inertia', 'Derive an expression for the moment of inertia of a uniform rod about an axis through its centre and perpendicular to its length.', 5, 'derivation', 'B', 'core'),
  c('phy-01', 'phy-01-t6', 'phy-angular-momentum', 'State and explain the principle of conservation of angular momentum with one everyday example.', 5, 'explanation', 'B', 'standard'),
  c('phy-02', 'phy-02-t4', 'phy-shm-spring-pendulum', 'Derive an expression for the time period of a simple pendulum. On what factors does it depend?', 5, 'derivation', 'B', 'core'),
  c('phy-02', 'phy-02-t5', 'phy-resonance', 'Distinguish between damped and forced oscillations. What do you understand by resonance?', 5, 'comparison', 'B', 'standard'),
  c('phy-03', 'phy-03-t8', 'phy-bernoulli', "Derive Bernoulli's equation for the steady flow of an ideal liquid.", 5, 'derivation', 'B', 'core'),
  c('phy-03', 'phy-03-t6', 'phy-stokes', "State Stokes' law. Derive an expression for the terminal velocity of a spherical body falling through a viscous liquid.", 5, 'derivation', 'B', 'core'),
  c('phy-03', 'phy-03-t3', 'phy-surface-tension', 'What is capillarity? State Jurin\'s law and explain why mercury is depressed in a glass tube.', 5, 'explanation', 'B', 'standard'),
  c('phy-04', 'phy-04-t3', 'phy-first-law', 'State the first law of thermodynamics and show that it is nothing but the law of conservation of energy applied to a thermodynamic system.', 5, 'explanation', 'B', 'core'),
  c('phy-04', 'phy-04-t6', 'phy-isothermal-adiabatic', 'Derive an expression for the work done when an ideal gas expands isothermally.', 5, 'derivation', 'B', 'core'),
  c('phy-05', 'phy-05-t4', 'phy-carnot-heat-engine', 'Describe the working of a Carnot engine with a diagram and derive an expression for its efficiency.', 5, 'derivation', 'B', 'core'),
  c('phy-05', 'phy-05-t2', 'phy-second-law', 'State the second law of thermodynamics. Give its Kelvin–Planck and Clausius statements.', 5, 'definition', 'B', 'core'),
  c('phy-06', 'phy-06-t2', 'phy-wave-equation', 'Derive the equation of a progressive wave and explain the meaning of each term.', 5, 'derivation', 'B', 'core'),
  c('phy-07', 'phy-07-t2', 'phy-velocity-sound', "Derive Newton's formula for the velocity of sound in a gas and explain Laplace's correction.", 5, 'derivation', 'B', 'core'),
  c('phy-08', 'phy-08-t2', 'phy-organ-pipes', 'Derive expressions for the frequencies of the fundamental note and overtones in closed and open organ pipes.', 5, 'derivation', 'B', 'core'),
  c('phy-08', 'phy-08-t6', 'phy-sonometer', 'State the laws of vibration of a stretched fixed string and describe how they are verified with a sonometer.', 5, 'explanation', 'B', 'core'),
  c('phy-09', 'phy-09-t3', 'phy-doppler', "Derive an expression for the apparent frequency heard by an observer when the source of sound moves towards a stationary observer.", 5, 'derivation', 'B', 'core'),
  c('phy-11', 'phy-11-t2', 'phy-youngs-ds', "Derive an expression for the fringe width in Young's double slit experiment.", 5, 'derivation', 'B', 'core'),
  c('phy-13', 'phy-13-t2', 'phy-brewster', "State Brewster's law. How does it provide evidence for the transverse nature of light?", 5, 'explanation', 'B', 'standard'),
  c('phy-14', 'phy-14-t2', 'phy-wheatstone', "State Kirchhoff's laws and obtain the balanced condition of a Wheatstone bridge.", 5, 'derivation', 'B', 'core'),
  c('phy-14', 'phy-14-t3', 'phy-potentiometer', 'Explain how a potentiometer is used to compare the e.m.f.s of two primary cells.', 5, 'explanation', 'B', 'core'),
  c('phy-16', 'phy-16-t6', 'phy-biot-savart', "State Biot–Savart law and use it to find the magnetic field due to a long straight current-carrying conductor.", 5, 'derivation', 'B', 'core'),
  c('phy-16', 'phy-16-t8', 'phy-force-conductors', 'Derive the expression for the force per unit length between two parallel current-carrying conductors and define ampère.', 5, 'derivation', 'B', 'standard'),
  c('phy-18', 'phy-18-t1', 'phy-faraday-lenz', "State Faraday's laws of electromagnetic induction and Lenz's law. Why is Lenz's law consistent with conservation of energy?", 5, 'explanation', 'B', 'core'),
  c('phy-19', 'phy-19-t4', 'phy-lcr-resonance', 'Derive the impedance of a series LCR circuit and obtain the condition for resonance.', 5, 'derivation', 'B', 'core'),
  c('phy-20', 'phy-20-t3', 'phy-thomson', "Describe Thomson's experiment to determine the specific charge (e/m) of an electron.", 5, 'explanation', 'B', 'core'),
  c('phy-22', 'phy-22-t3', 'phy-rectification', 'Explain full-wave rectification using two P–N junction diodes with a circuit diagram.', 5, 'diagram', 'B', 'core'),
  c('phy-22', 'phy-22-t4', 'phy-logic-gates', 'Write the truth tables of NAND and NOR gates. Show how a NAND gate can be used as a NOT gate.', 5, 'diagram', 'B', 'core'),
  c('phy-23', 'phy-23-t1', 'phy-bohr', "Using Bohr's postulates, obtain expressions for the radius and energy of an electron orbit in the hydrogen atom.", 5, 'derivation', 'B', 'core'),
  c('phy-24', 'phy-24-t2', 'phy-radioactive-laws', 'State the laws of radioactive disintegration. Distinguish between alpha, beta and gamma radiations.', 5, 'comparison', 'B', 'core'),

  /* ---- Group C: 8-mark long answers ---- */
  c('phy-03', 'phy-03-t8', 'phy-bernoulli', "Derive Bernoulli's theorem from the principle of conservation of energy and mention any three of its applications.", 8, 'long-answer', 'C', 'core'),
  c('phy-03', 'phy-03-t5', 'phy-poiseuille', "Derive Poiseuille's formula. Describe an experiment to determine the coefficient of viscosity of a liquid.", 8, 'long-answer', 'C', 'standard'),
  c('phy-04', 'phy-04-t6', 'phy-isothermal-adiabatic', 'Derive PV^γ = constant for an adiabatic process and show that the work done in an adiabatic change is (P₁V₁ − P₂V₂)/(γ − 1).', 8, 'long-answer', 'C', 'core'),
  c('phy-05', 'phy-05-t4', 'phy-carnot-heat-engine', 'Describe the Carnot cycle with a P–V diagram and derive an expression for the efficiency of a Carnot engine. What are the implications of the second law on its efficiency?', 8, 'long-answer', 'C', 'core'),
  c('phy-08', 'phy-08-t1', 'phy-organ-pipes', 'Explain the formation of stationary waves in open and closed organ pipes. Derive the frequencies of harmonics produced and discuss end correction.', 8, 'long-answer', 'C', 'core'),
  c('phy-11', 'phy-11-t2', 'phy-youngs-ds', "Describe Young's double slit experiment. Derive an expression for fringe width and discuss the intensity distribution of fringes.", 8, 'long-answer', 'C', 'core'),
  c('phy-14', 'phy-14-t3', 'phy-potentiometer', 'What is a potentiometer? Derive the expression for potential gradient and explain its use to measure the internal resistance of a cell.', 8, 'long-answer', 'C', 'core'),
  c('phy-16', 'phy-16-t6', 'phy-biot-savart', "Derive an expression for the magnetic field at the centre of a circular coil and at a point inside a long solenoid using Biot–Savart law.", 8, 'long-answer', 'C', 'core'),
  c('phy-18', 'phy-18-t4', 'phy-inductor-energy', 'Derive an expression for the energy stored in an inductor. Explain self-inductance and mutual inductance with their units.', 8, 'long-answer', 'C', 'core'),
  c('phy-19', 'phy-19-t4', 'phy-lcr-resonance', 'Derive the impedance of a series LCR circuit, obtain the resonance condition, explain the quality factor and discuss power factor in AC circuits.', 8, 'long-answer', 'C', 'core'),
  c('phy-21', 'phy-21-t2', 'phy-photoelectric', "Explain Einstein's photoelectric equation and the concept of stopping potential. How is Planck's constant determined experimentally?", 8, 'long-answer', 'C', 'core'),
  c('phy-23', 'phy-23-t1', 'phy-bohr', "Explain Bohr's theory of the hydrogen atom, derive the energy levels and explain the origin of the spectral series. Obtain the de Broglie wavelength of the electron.", 8, 'long-answer', 'C', 'core'),
  c('phy-24', 'phy-24-t3', 'phy-half-life', 'Derive the radioactive decay law. Define half-life and mean-life, and explain how carbon dating is used to determine the age of archaeological samples.', 8, 'long-answer', 'C', 'core'),
  c('phy-14', 'phy-14-t1', 'phy-kirchhoffs', "State Kirchhoff's laws with the help of suitable diagrams. Using the loop rule, obtain the balanced condition of a Wheatstone bridge and explain meter bridge measurements.", 8, 'long-answer', 'C', 'core'),
  /* ---- Concepts evidenced in papers but missing a rankable question ---- */
  c('phy-05', 'phy-05-t4', 'phy-otto-diesel', 'Explain the working of a four-stroke petrol (Otto) engine and of a diesel engine with neat P-V diagrams.', 5, 'explanation', 'B', 'core'),
  c('phy-05', 'phy-05-t5', 'phy-refrigerator', 'Explain the working of a refrigerator with a diagram. Define its coefficient of performance and state how it differs from a heat engine.', 5, 'explanation', 'B', 'standard'),
  c('phy-15', 'phy-15-t1', 'phy-thermoelectric', 'Explain the Seebeck effect. Describe the construction and working of a thermocouple and a thermopile, and mention the Peltier effect.', 5, 'explanation', 'B', 'standard'),
  c('phy-18', 'phy-18-t3', 'phy-eddy-transformer', 'Explain eddy currents and their uses. Describe the working of an AC generator and a transformer with neat diagrams and mention how energy losses in a transformer are minimised.', 8, 'long-answer', 'C', 'core'),
  c('phy-19', 'phy-19-t1', 'phy-rms-ac', 'Derive the relation between the peak value and the r.m.s. value of an alternating current. Describe the variation of current with time through a pure resistor, a pure inductor and a pure capacitor.', 5, 'derivation', 'B', 'core'),
  c('phy-19', 'phy-19-t6', 'phy-ac-power', 'Derive an expression for the power consumed in an AC circuit containing resistance, inductance and capacitance. Define power factor, explain its significance and describe how a choke coil is used to control current.', 8, 'long-answer', 'C', 'core'),
  c('phy-20', 'phy-20-t1', 'phy-millikan', "Describe Millikan's oil drop experiment to determine the charge of an electron. How is the terminal velocity of the drop measured before the field is applied?", 5, 'explanation', 'B', 'core'),
];