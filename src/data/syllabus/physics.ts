import type { SyllabusSubject } from '../../engine/types';
import { buildSubject, type SubjectLiteral } from './build';

/**
 * Grade 12 Physics syllabus — CDC / NEB, NCF 2076 (as revised, applicable 2081+).
 * Topic-level text reproduced from research source `syllabus-physics-jayantbist`
 * (cross-checked against merosiksha.com chapter list and CDC curriculum structure).
 * Only Grade-12 content. Grade-11 chapters are NOT included.
 */
const PHYSICS_LITERAL: SubjectLiteral = {
  id: 'physics',
  name: 'Physics',
  shortName: 'Physics',
  subjectCode: '1021',
  gradeLabel: 'Grade XII (Class 12)',
  prefix: 'phy',
  areas: ['Mechanics', 'Heat and Thermodynamics', 'Wave and Optics', 'Electricity and Magnetism', 'Modern Physics'],
  sourceIds: ['syllabus-physics-jayantbist', 'cdc-elibrary'],
  sourceNote:
    'Official Grade-12 Physics syllabus (25 chapters, 5 content areas). Per-chapter teaching hours are not published in any source consulted, so teachingHours = 0 means "not verified" (not zero hours).',
  chapters: [
    {
      n: 1, area: 'Mechanics', name: 'Rotational dynamics', hours: 0, core: [3, 6],
      topics: [
        ['Equation of angular motion; relation between linear and angular kinematics', ['angular displacement, velocity and acceleration', 'v = rω, a = rα']],
        ['Kinetic energy of rotation of a rigid body', []],
        ['Moment of inertia; radius of gyration', ['definition', 'MI of a uniform rod']],
        ['Torque and angular acceleration for a rigid body', []],
        ['Work and power in rotational motion', []],
        ['Angular momentum; conservation of angular momentum', []],
      ],
    },
    {
      n: 2, area: 'Mechanics', name: 'Periodic motion', hours: 0, core: [1, 4],
      topics: [
        ['Equation of simple harmonic motion (SHM)', ['differential equation of SHM', 'solution and phase']],
        ['Energy in SHM', ['kinetic and potential energy variation']],
        ['Applications of SHM: vertical oscillation of a mass suspended from a coiled spring', []],
        ['Angular SHM; simple pendulum', ['time period of a simple pendulum']],
        ['Oscillatory motion: damped oscillation, forced oscillation and resonance', []],
      ],
    },
    {
      n: 3, area: 'Mechanics', name: 'Fluid statics', hours: 0, core: [6, 8],
      topics: [
        ['Fluid statics: pressure in a fluid; buoyancy', ['pressure depth relation', "Archimedes' principle"]],
        ['Surface tension: theory of surface tension; surface energy', []],
        ['Angle of contact; capillarity and its applications', ['Jurin\'s law']],
        ["Newton's formula for viscosity in a liquid; coefficient of viscosity", []],
        ["Poiseuille's formula and its application", []],
        ["Stokes' law and its applications", ['terminal velocity']],
        ['Equation of continuity and its applications', []],
        ["Bernoulli's equation and its applications", []],
      ],
    },
    {
      n: 4, area: 'Heat and Thermodynamics', name: 'First law of thermodynamics', hours: 0, core: [3, 6],
      topics: [
        ['Thermodynamic systems', []],
        ['Work done during volume change', []],
        ['Heat and work; internal energy and the first law of thermodynamics', []],
        ['Thermodynamic processes: adiabatic, isochoric, isothermal and isobaric', []],
        ['Heat capacities of an ideal gas at constant pressure and volume and the relation between them', ['Cp − Cv = R']],
        ['Isothermal and adiabatic processes for an ideal gas', ['derivations of work done']],
      ],
    },
    {
      n: 5, area: 'Heat and Thermodynamics', name: 'Second law of thermodynamics', hours: 0, core: [2, 4],
      topics: [
        ['Thermodynamic systems and direction of thermodynamic processes', []],
        ['Second law of thermodynamics', ['Kelvin–Planck and Clausius statements']],
        ['Heat engines', ['efficiency of a heat engine']],
        ['Internal combustion engines: Otto cycle, Diesel cycle; Carnot cycle', []],
        ['Refrigerator', ['coefficient of performance']],
        ['Entropy and disorder (introduction only)', []],
      ],
    },
    {
      n: 6, area: 'Wave and Optics', name: 'Wave motion', hours: 0, core: [2, 3],
      topics: [
        ['Progressive waves', ['longitudinal and transverse waves']],
        ['Mathematical description of a wave', ['wave equation y = a sin(kx − ωt)']],
        ['Stationary waves', ['formation, nodes and antinodes']],
      ],
    },
    {
      n: 7, area: 'Wave and Optics', name: 'Mechanical waves', hours: 0, core: [2, 3],
      topics: [
        ['Speed of wave motion; velocity of sound in solid and liquid', []],
        ['Velocity of sound in a gas', ["Newton's formula", "Laplace's correction"]],
        ['Effect of temperature, pressure and humidity on velocity of sound', []],
      ],
    },
    {
      n: 8, area: 'Wave and Optics', name: 'Wave in pipes and strings', hours: 0, core: [1, 6],
      topics: [
        ['Stationary waves in closed and open pipes', []],
        ['Harmonics and overtones in closed and open organ pipes', ['frequency relations']],
        ['End correction in pipes', []],
        ['Velocity of transverse waves along a stretched string', ['v = √(T/μ)']],
        ['Vibration of a string and overtones', []],
        ["Laws of vibration of a fixed string", ['sonometer experiments']],
      ],
    },
    {
      n: 9, area: 'Wave and Optics', name: 'Acoustic phenomena', hours: 0, core: [3],
      topics: [
        ['Sound waves: pressure amplitude', []],
        ['Characteristics of sound: intensity; loudness, quality and pitch', []],
        ["Doppler's effect", ['apparent frequency expression']],
      ],
    },
    {
      n: 10, area: 'Wave and Optics', name: 'Nature and propagation of light', hours: 0, core: [1],
      topics: [
        ["Huygen's principle", []],
        ['Reflection and refraction according to wave theory', []],
      ],
    },
    {
      n: 11, area: 'Wave and Optics', name: 'Interference', hours: 0, core: [2],
      topics: [
        ['Phenomenon of interference; coherent sources', []],
        ["Young's double slit experiment", ['fringe width expression']],
      ],
    },
    {
      n: 12, area: 'Wave and Optics', name: 'Diffraction', hours: 0, core: [1],
      topics: [
        ['Diffraction from a single slit', []],
        ['Diffraction pattern of an image; diffraction grating', []],
        ['Resolving power of optical instruments', []],
      ],
    },
    {
      n: 13, area: 'Wave and Optics', name: 'Polarization', hours: 0, core: [2],
      topics: [
        ['Phenomenon of polarization', []],
        ["Brewster's law; transverse nature of light", []],
        ['Polaroid', []],
      ],
    },
    {
      n: 14, area: 'Electricity and Magnetism', name: 'Electrical circuits', hours: 0, core: [1, 2, 3],
      topics: [
        ["Kirchhoff's laws", ['junction and loop rules']],
        ['Wheatstone bridge circuit; meter bridge', ['balanced condition derivation']],
        ['Potentiometer: comparison of e.m.f.; measurement of internal resistance of a cell', ['potential gradient']],
        ['Superconductors; perfect conductors', []],
        ['Conversion of a galvanometer into a voltmeter and ammeter; ohmmeter', []],
        ["Joule's law of heating", []],
      ],
    },
    {
      n: 15, area: 'Electricity and Magnetism', name: 'Thermoelectric effects', hours: 0, core: [1],
      topics: [
        ['Seebeck effect; thermocouples', []],
        ['Peltier effect: variation of thermoelectric e.m.f. with temperature; thermopile', []],
      ],
    },
    {
      n: 16, area: 'Electricity and Magnetism', name: 'Magnetic field', hours: 0, core: [6, 7],
      topics: [
        ['Magnetic field lines and magnetic flux; Oersted\'s experiment', []],
        ['Force on a moving charge; force on a conductor', ["F = qv × B", "F = IL × B"]],
        ['Force and torque on a rectangular coil; moving coil galvanometer', []],
        ['Hall effect', []],
        ['Magnetic field of a moving charge', []],
        ['Biot–Savart law and its applications to a circular coil, a long straight conductor and a long solenoid', []],
        ["Ampère's law and its applications to a long straight conductor, a straight solenoid and a toroidal solenoid", []],
        ['Force between two parallel conductors carrying current; definition of ampère', []],
      ],
    },
    {
      n: 17, area: 'Electricity and Magnetism', name: 'Magnetic properties of materials', hours: 0, core: [3],
      topics: [
        ['Flux density in a magnetic material; relative permeability; susceptibility', []],
        ['Hysteresis; hysteresis loop', []],
        ['Dia-, para- and ferro-magnetic materials', []],
      ],
    },
    {
      n: 18, area: 'Electricity and Magnetism', name: 'Electromagnetic induction', hours: 0, core: [1, 2],
      topics: [
        ["Faraday's laws; induced electric fields", []],
        ["Lenz's law; motional electromotive force", []],
        ['A.C. generators; eddy currents', []],
        ['Self-inductance and mutual inductance', []],
        ['Energy stored in an inductor', []],
        ['Transformer', []],
      ],
    },
    {
      n: 19, area: 'Electricity and Magnetism', name: 'Alternating currents', hours: 0, core: [4, 5],
      topics: [
        ['Peak and r.m.s. values of AC current and voltage', []],
        ['AC through a resistor, a capacitor and an inductor', []],
        ['Phasor diagram', []],
        ['Series circuits containing a combination of resistance, capacitance and inductance (LCR)', []],
        ['Series resonance; quality factor', []],
        ['Power in AC circuits; power factor; choke coil', []],
      ],
    },
    {
      n: 20, area: 'Modern Physics', name: 'Electrons', hours: 0, core: [3],
      topics: [
        ["Millikan's oil drop experiment", []],
        ['Motion of an electron beam in electric and magnetic fields', []],
        ["Thomson's experiment to determine the specific charge of electrons", []],
      ],
    },
    {
      n: 21, area: 'Modern Physics', name: 'Photons', hours: 0, core: [2],
      topics: [
        ['Quantum nature of radiation', []],
        ["Einstein's photoelectric equation; stopping potential", []],
        ["Measurement of Planck's constant", []],
      ],
    },
    {
      n: 22, area: 'Modern Physics', name: 'Semiconductor devices', hours: 0, core: [4],
      topics: [
        ['P–N junction', ['forward and reverse bias']],
        ['Semiconductor diode: characteristics in forward and reverse bias', []],
        ['Full-wave rectification', ['filter circuit']],
        ['Logic gates: NOT, OR, AND, NAND and NOR', ['truth tables']],
      ],
    },
    {
      n: 23, area: 'Modern Physics', name: 'Quantization of energy', hours: 0, core: [1, 4],
      topics: [
        ["Bohr's theory of the hydrogen atom", ['radius, velocity, energy levels']],
        ['Spectral series; excitation and ionization potentials', []],
        ['Energy levels; emission and absorption spectra', []],
        ["De Broglie theory; wave–particle duality", []],
        ['Heisenberg uncertainty principle', []],
        ['X-rays: nature and production; uses', []],
        ['X-ray diffraction; Bragg\'s law', []],
      ],
    },
    {
      n: 24, area: 'Modern Physics', name: 'Radioactivity and nuclear reaction', hours: 0, core: [2, 3],
      topics: [
        ['Alpha, beta and gamma particles/rays', []],
        ['Laws of radioactive disintegration', []],
        ['Half-life, mean-life and decay constant', ['decay equation numericals']],
        ['Geiger–Müller tube', []],
        ['Carbon dating', []],
        ['Medical use of nuclear radiation and possible health hazards', []],
      ],
    },
    {
      n: 25, area: 'Modern Physics', name: 'Recent trends in physics', hours: 0, core: [],
      topics: [
        ['Surface waves: Rayleigh and Love waves; internal waves: S and P waves; wave patterns of the 2015 Gorkha earthquake', []],
        ['Gravitational waves', []],
        ['Nanotechnology (introductory idea)', []],
        ['Higgs boson (introductory idea)', []],
      ],
    },
  ],
}

export const PHYSICS: SyllabusSubject = buildSubject(PHYSICS_LITERAL);
