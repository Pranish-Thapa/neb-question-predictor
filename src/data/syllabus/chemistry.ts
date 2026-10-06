import type { SyllabusSubject } from '../../engine/types';
import { buildSubject, type SubjectLiteral } from './build';

/**
 * Grade 12 Chemistry syllabus — CDC / NEB (NCF 2076, applicable 2081+).
 * All 21 official units with subtopics, reproduced from research source
 * `syllabus-chemistry-nebexam` and cross-checked against the official
 * Grade-12 Chemistry textbook TOC (`textbook-chemistry-12`) and the CDC
 * 2076 curriculum text. Teaching hours are the officially published hours.
 */
const CHEMISTRY_LITERAL: SubjectLiteral = {
  id: 'chemistry',
  name: 'Chemistry',
  shortName: 'Chemistry',
  subjectCode: '3021',
  gradeLabel: 'Grade XII (Class 12)',
  prefix: 'chm',
  areas: ['General and Physical Chemistry', 'Inorganic Chemistry', 'Organic Chemistry', 'Applied Chemistry'],
  sourceIds: ['syllabus-chemistry-nebexam', 'textbook-chemistry-12', 'cdc-elibrary'],
  sourceNote:
    'Official 21-unit Grade-12 Chemistry syllabus. Unit names verified against the official CDC textbook table of contents; subtopics verified against the CDC 2076 curriculum text.',
  chapters: [
    {
      n: 1, area: 'General and Physical Chemistry', name: 'Volumetric Analysis', hours: 8, core: [5, 6, 7],
      topics: [
        ['Introduction to gravimetric analysis, volumetric analysis and equivalent weight', []],
        ['Relationship between equivalent weight, atomic weight and valency', []],
        ['Equivalent weight of compounds (acid, base, salt, oxidising and reducing agents)', []],
        ['Concentration of solutions: percentage, g/L, molarity, molality, normality, formality, ppm, ppb', []],
        ['Primary and secondary standard substances', []],
        ['Law of equivalence and normality equation', []],
        ['Titration and its types: acid–base titration, redox titration (related numerical problems)', ['indicator selection', 'normality/molarity numericals']],
      ],
    },
    {
      n: 2, area: 'General and Physical Chemistry', name: 'Ionic Equilibrium', hours: 10, core: [9, 10, 12],
      topics: [
        ['Acid–base concepts: limitations of Arrhenius; Brønsted–Lowry; Lewis', ['conjugate acid–base pairs', 'relative strength of acids and bases']],
        ["Ionisation of a weak electrolyte (Ostwald's dilution law)", []],
        ['Ionic product of water (Kw)', []],
        ['Dissociation constant of acid and base (Ka, Kb); pKa and pKb', []],
        ['pH scale: pH of strong and weak acids and bases', ['pH numericals']],
        ['Solubility and solubility product principle', ['Ksp numericals']],
        ['Common ion effect', []],
        ['Application of solubility product and common ion effect in precipitation reactions', []],
        ['Buffer solution and its application', []],
        ['Indicators and selection of indicators in acid–base titration', []],
        ['Types of salts: acidic, basic, simple, complex salts', []],
        ['Hydrolysis of salts (strong acid–strong base, weak acid–strong base, weak base–strong acid)', ['related numerical problems']],
      ],
    },
    {
      n: 3, area: 'General and Physical Chemistry', name: 'Chemical Kinetics', hours: 7, core: [6, 7],
      topics: [
        ['Rate of reactions: average and instantaneous rate', []],
        ['Rate law and its expressions; rate constant and its units', []],
        ['Order and molecularity', ['differences']],
        ['Integrated rate equation for zero and first order reactions', []],
        ['Half-life of zero and first order reactions', ['half-life numericals']],
        ['Collision theory; activation energy and activated complex', ['energy profile diagram']],
        ['Factors affecting rate: concentration, temperature (Arrhenius equation), catalyst', []],
        ['Catalysis: homogeneous, heterogeneous and enzyme catalysis', []],
        ['Numericals based on rate, rate constant and order of zero and first order reactions', ['rate law from experimental data']],
      ],
    },
    {
      n: 4, area: 'General and Physical Chemistry', name: 'Thermodynamics', hours: 8, core: [3, 4, 6],
      topics: [
        ['Internal energy; first law of thermodynamics', []],
        ['Enthalpy and enthalpy changes; endothermic and exothermic processes', ['energy profile diagram']],
        ['Enthalpy of reaction, solution, formation and combustion', []],
        ['Laws of thermochemistry: Laplace law and Hess’s law', ['Hess law numericals']],
        ['Entropy and spontaneity; second law of thermodynamics', []],
        ["Gibbs' free energy: ΔG = ΔH − TΔS", ['prediction of spontaneity']],
        ['Relationship between ΔG and equilibrium constant', []],
      ],
    },
    {
      n: 5, area: 'General and Physical Chemistry', name: 'Electrochemistry', hours: 7, core: [1, 3, 5],
      topics: [
        ['Electrode potential and standard electrode potential', []],
        ['Types of electrodes: standard hydrogen electrode and calomel electrode', []],
        ['Electrochemical series and its applications', ['predicting feasibility', 'comparing reducing/oxidising power']],
        ['Voltaic cell: Zn–Cu cell, Ag–Cu cell; cell potential and standard cell potential', ['cell notation', 'E°cell numericals']],
        ['Relationship between cell potential and free energy', []],
        ['Commercial batteries and fuel cells (hydrogen/oxygen)', []],
      ],
    },
    {
      n: 6, area: 'Inorganic Chemistry', name: 'Transition Metals', hours: 5, core: [1, 4],
      topics: [
        ['Characteristics of transition metals; oxidation states', []],
        ['Complex ions and metal complexes; shapes of complex ions', []],
        ['d-orbitals in complex ions (simple crystal field theory for octahedral complex)', ['colour of transition metal compounds']],
        ['Catalytic properties of transition metals', []],
      ],
    },
    {
      n: 7, area: 'Inorganic Chemistry', name: 'Studies of Heavy Metals', hours: 15, core: [1, 2, 5],
      topics: [
        ['Copper: occurrence, extraction from copper pyrite, properties, uses; blue vitriol (preparation, properties, uses); red and black oxide of copper', ['blast furnace / extraction diagrams']],
        ['Zinc: occurrence, extraction from zinc blende, properties, uses; white vitriol', []],
        ['Mercury: occurrence, extraction from cinnabar, properties; calomel and corrosive sublimate (preparation, properties, uses)', []],
        ['Iron: occurrence, extraction, properties, uses; manufacture of steel (Basic Oxygen and Open Hearth processes); corrosion of iron and its prevention', ['rusting chemistry']],
        ['Silver: extraction by cyanide process; preparation and uses of silver chloride and silver nitrate', []],
      ],
    },
    {
      n: 8, area: 'Organic Chemistry', name: 'Haloalkanes', hours: 8, core: [5, 7],
      topics: [
        ['Nomenclature, isomerism and classification of monohaloalkanes', []],
        ['Preparation of monohaloalkanes from alkanes, alkenes and alcohols', []],
        ['Physical properties of monohaloalkanes', []],
        ['Chemical properties: substitution reactions, SN1 and SN2 (basic concept)', []],
        ['Formation of alcohol, nitrile, amine, ether, thioether, carbylamines, nitrite and nitroalkane from haloalkanes', []],
        ['Elimination reaction (dehydrohalogenation — Saytzeff’s rule); reduction; Wurtz reaction', []],
        ['Preparation of trichloromethane from ethanol and propanone', []],
        ['Chemical properties of trichloromethane: oxidation, reduction, action on silver powder, conc. nitric acid, propanone and aqueous alkali', ['chloroform storage with ethanol']],
      ],
    },
    {
      n: 9, area: 'Organic Chemistry', name: 'Haloarenes', hours: 3, core: [2, 4],
      topics: [
        ['Nomenclature and isomerism of haloarenes', []],
        ['Preparation of chlorobenzene from benzene and benzene diazonium chloride', []],
        ['Low reactivity of haloarenes toward nucleophilic substitution compared with haloalkanes', []],
        ['Chemical properties: reduction, electrophilic substitution, action with Na (Fittig and Wurtz–Fittig), action with chloral', []],
        ['Uses of haloarenes', []],
      ],
    },
    {
      n: 10, area: 'Organic Chemistry', name: 'Alcohols', hours: 7, core: [3, 7],
      topics: [
        ['Nomenclature, isomerism and classification of monohydric alcohols', []],
        ['Distinction of primary, secondary and tertiary alcohols by Victor Meyer’s method', []],
        ['Preparation from haloalkanes, primary amines and esters', []],
        ['Industrial preparation: oxo process, hydroboration–oxidation of ethene, fermentation of sugar', []],
        ['Common terms: absolute alcohol, power alcohol, denatured alcohol, rectified spirit', []],
        ['Chemical properties: reaction with HX, PX3, PCl5, SOCl2; action with metals; dehydration; oxidation of 1°, 2°, 3° alcohols; catalytic dehydrogenation; esterification', []],
        ['Tests of ethanol', []],
      ],
    },
    {
      n: 11, area: 'Organic Chemistry', name: 'Phenols', hours: 4, core: [2, 4],
      topics: [
        ['Introduction and nomenclature of phenol', []],
        ['Preparation of phenol from chlorobenzene, diazonium salt and benzene sulphonic acid', []],
        ['Acidic nature of phenol (comparison with alcohol and water)', []],
        ['Chemical properties: action with NH3, Zn, Na, benzene diazonium chloride, phthalic anhydride; acylation; Kolbe’s reaction; Reimer–Tiemann reaction', ['named reactions']],
        ['Electrophilic substitution: nitration, sulphonation, bromination, Friedel–Crafts alkylation', []],
        ['Tests of phenol: FeCl3 test, aqueous bromine test, Liebermann’s test', []],
        ['Uses of phenol', []],
      ],
    },
    {
      n: 12, area: 'Organic Chemistry', name: 'Ethers', hours: 2, core: [3, 4],
      topics: [
        ['Nomenclature, classification and isomerism of ethers', []],
        ["Preparation of aliphatic and aromatic ethers by Williamson's synthesis", []],
        ['Physical properties of ether', []],
        ['Chemical properties of ethoxyethane: action with HI, conc. HCl, conc. H2SO4, air and Cl2', []],
        ['Uses of ethers', []],
      ],
    },
    {
      n: 13, area: 'Organic Chemistry', name: 'Aldehydes and Ketones', hours: 10, core: [4, 5, 9],
      topics: [
        ['Nomenclature, isomerism of aliphatic aldehydes and ketones', []],
        ['Preparation: dehydrogenation/oxidation of alcohols, ozonolysis of alkenes, acid chlorides, gem dihaloalkanes, catalytic hydration of alkynes', []],
        ['Structure and nature of the carbonyl group', []],
        ['Distinction between aldehydes and ketones using 2,4-DNP, Tollens’ reagent and Fehling’s solution', ['qualitative tests']],
        ['Addition reactions: H2, HCN, NaHSO3; action with ammonia derivatives (NH2OH, hydrazine, phenylhydrazine, semicarbazide)', []],
        ['Aldol condensation; Cannizzaro’s reaction', ['named reactions']],
        ["Clemmensen's reduction; Wolf–Kishner reduction", ['named reactions']],
        ['Action with PCl5 and LiAlH4; action of methanal with ammonia and phenol', []],
        ['Aromatic aldehydes/ketones: preparation of benzaldehyde from toluene and acetophenone from benzene; Perkin condensation; Benzoin condensation; electrophilic substitution', ['named reactions']],
        ['Formalin and its uses', []],
      ],
    },
    {
      n: 14, area: 'Organic Chemistry', name: 'Carboxylic Acid and its Derivatives', hours: 9, core: [5, 6],
      topics: [
        ['Nomenclature and isomerism of aliphatic and aromatic carboxylic acids', []],
        ['Preparation of monocarboxylic acids from aldehydes, nitriles, dicarboxylic acids, sodium alkoxide and trihaloalkanes; benzoic acid from alkylbenzene', []],
        ['Chemical properties: action with alkalies, metal oxides, carbonates, bicarbonates, PCl3, LiAlH4; dehydration of carboxylic acids', []],
        ['Hell–Volhard–Zelinsky reaction; electrophilic substitution of benzoic acid; effect of substituents on acidic strength; abnormal behaviour of methanoic acid', ['named reaction']],
        ['Derivatives of carboxylic acids: acid halides, amides, esters, anhydrides — preparation and comparative physical/chemical properties (hydrolysis, ammonolysis, alcoholysis, reduction)', []],
        ['Claisen condensation; Hofmann bromamide reaction; amphoteric nature of amide; relative reactivity of acid derivatives', ['named reactions']],
      ],
    },
    {
      n: 15, area: 'Organic Chemistry', name: 'Nitro Compounds', hours: 3, core: [4],
      topics: [
        ['Nitroalkanes: nomenclature, isomerism, preparation from haloalkanes and alkanes', []],
        ['Physical properties of nitroalkanes; reduction', []],
        ['Nitrobenzene: preparation from benzene; physical and chemical properties', []],
        ['Reduction of nitrobenzene in different media (Fe/HCl, Sn/HCl, Zn/NH4Cl, catalytic)', ['products in acidic, neutral, alkaline media']],
        ['Electrophilic substitution: nitration, sulphonation, bromination; uses of nitro compounds', []],
      ],
    },
    {
      n: 16, area: 'Organic Chemistry', name: 'Amines', hours: 7, core: [3, 5],
      topics: [
        ['Aliphatic amines: nomenclature, classification, isomerism', []],
        ["Separation of primary, secondary and tertiary amines by Hoffmann's method (diethyl oxalate method)", []],
        ['Preparation of primary amines from haloalkanes, nitriles, nitroalkanes and amides (Hofmann degradation)', []],
        ['Basicity of amines: comparative study of 1°, 2°, 3° amines', []],
        ['Reactions of primary amines with chloroform, conc. HCl, R–X, RCOX and nitrous acid (NaNO2/HCl)', ['carbylamine reaction']],
        ['Tests of 1°, 2° and 3° amines (nitrous acid test)', []],
        ['Aniline: preparation from nitrobenzene and phenol; basicity comparison with ammonia and aliphatic amines', []],
        ['Chemical properties of aniline: alkylation, acylation, diazotization, carbylamine and coupling reactions; nitration, sulphonation and bromination', ['diazotization & coupling']],
        ['Uses of aniline', []],
      ],
    },
    {
      n: 17, area: 'Organic Chemistry', name: 'Organometallic Compounds', hours: 2, core: [3],
      topics: [
        ['Organolithium, organocopper and organocadmium compounds: general formula and examples', []],
        ['Nature of the metal–carbon bond', []],
        ['Grignard reagent: preparation from haloalkanes and haloarenes', []],
        ['Reactions of Grignard reagent with water, aldehydes and ketones (1°, 2°, 3° alcohols), CO2, HCN, RCN, esters and acid chlorides', ['synthesis applications']],
      ],
    },
    {
      n: 18, area: 'Applied Chemistry', name: 'Chemistry in the Service of Mankind', hours: 4, core: [1, 3],
      topics: [
        ['Polymers: addition and condensation polymers; elastomers and fibres; natural and synthetic polymers; polythene, PVC, Teflon, polystyrene, nylon, bakelite', []],
        ['Dyes: introduction; types of dyes by structure and application', []],
        ['Drugs: characteristics, natural and synthetic drugs, classification, habit-forming drugs and drug addiction', []],
        ['Pesticides: insecticides, herbicides and fungicides', []],
      ],
    },
    {
      n: 19, area: 'Applied Chemistry', name: 'Cement', hours: 4, core: [2, 4],
      topics: [
        ['Introduction to cement', []],
        ['Raw materials for cement production', []],
        ['Main steps: crushing and grinding, strong heating, final grinding; Portland cement process with flow-sheet diagram', []],
        ['Types of cement: OPC and PPC; cement industry in Nepal', []],
      ],
    },
    {
      n: 20, area: 'Applied Chemistry', name: 'Paper and Pulp', hours: 3, core: [3],
      topics: [
        ['Introduction; raw materials; sources of raw materials', []],
        ['Stages in the production of paper; flow-sheet diagram', []],
        ['Quality of paper', []],
      ],
    },
    {
      n: 21, area: 'Applied Chemistry', name: 'Nuclear Chemistry and Application of Radioactivity', hours: 2, core: [3],
      topics: [
        ['Natural and artificial radioactivity; units of radioactivity', []],
        ['Nuclear reactions; nuclear fission and fusion reactions', []],
        ['Nuclear power and nuclear weapons', []],
        ['Industrial and medical uses of radioactivity; radiocarbon dating', []],
        ['Harmful effects of nuclear radiations', []],
      ],
    },
  ],
};

export const CHEMISTRY: SyllabusSubject = buildSubject(CHEMISTRY_LITERAL);
