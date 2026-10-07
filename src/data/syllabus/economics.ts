import type { SyllabusSubject } from '../../engine/types';
import { buildSubject, type SubjectLiteral } from './build';

/**
 * Grade 12 Economics syllabus — CDC / NEB, course code Eco. 304 (Grade 12; Grade 11 is Eco. 303 and
 * is NOT included here). Reproduced from the CDC syllabus text read in research (sources
 * `eco-syllabus-cdc-text` and `eco-grid-iswori`), cross-checked against the official CDC curriculum
 * PDF (`eco-curriculum-cdc`). 6 units, 120 theory hours + 40 practical/project hours (160 total).
 * teachingHours below are the theory hours per unit; practical hours are listed in each unit's topics.
 * Some portals chapterise the same content into 14 chapters — the CDC structure is 6 units.
 */
const ECONOMICS_LITERAL: SubjectLiteral = {
  id: 'economics',
  name: 'Economics',
  shortName: 'Economics',
  subjectCode: '3041',
  gradeLabel: 'Grade XII (Class 12)',
  prefix: 'eco',
  areas: ['Basic Economics', 'Micro Economics', 'Macro Economics', 'Development Economics', 'Nepalese Economy', 'Quantitative Techniques'],
  sourceIds: ['eco-curriculum-cdc', 'eco-syllabus-cdc-text', 'eco-grid-iswori'],
  sourceNote:
    'Official CDC Grade-12 Economics syllabus (Eco. 304): 6 units, 120 theory hours + 40 practical hours. ' +
    'Unit order and topics follow the CDC syllabus text; unit hours are theory hours (practical hours noted per unit). ' +
    'Grade-11 Economics content is excluded. The unit-wise specification table exists only in syllabus ' +
    'reproductions (marked secondary in the research log) — the written-paper structure itself is verified from actual NEB papers.',
  chapters: [
    {
      n: 1, area: 'Basic Economics', name: 'Basic concept of economics and resource allocation', hours: 8, core: [2, 3],
      topics: [
        ['Scarcity, choice and opportunity cost', ['scarcity and choice', 'opportunity cost with examples']],
        ['Production possibility curve (PPC)', ['concept and shape of PPC', 'shift of the curve']],
        ['Allocation of resources', ['division of labour and specialization']],
        ['Economic systems', ['market (capitalist) economy', 'command (socialist) economy', 'mixed economy']],
      ],
    },
    {
      n: 2, area: 'Micro Economics', name: 'Micro economics', hours: 38, core: [3, 5],
      topics: [
        ['Market and revenue curves', ['total, average and marginal revenue', 'TR/AR/MR under perfect competition', 'TR/AR/MR under monopoly']],
        ['Cost curves', ['explicit, implicit, fixed and variable cost', 'short-run cost curves and their derivation']],
        ['Price and output determination', ['equilibrium of a firm under perfect competition', 'equilibrium under monopoly using MR–MC']],
        ['Factor pricing: rent', ['Ricardian theory of rent']],
        ['Factor pricing: wages', ['subsistence theory', 'wage-fund theory']],
        ['Factor pricing: interest', ['classical theory of interest', 'gross and net interest']],
        ['Factor pricing: profit', ['risk-bearing theory of profit', 'uncertainty-bearing theory of profit']],
      ],
    },
    {
      n: 3, area: 'Macro Economics', name: 'Macro economics', hours: 25, core: [1, 3],
      topics: [
        ['Banking system and monetary policy', ['functions of central bank', 'functions of commercial bank', 'money market and capital market in Nepal', 'expansionary and contractionary monetary policy']],
        ['Government finance', ['government expenditure and revenue', 'direct and indirect taxes', 'progressive, regressive and proportional taxes', 'qualities of a good tax system', 'borrowing and budget']],
        ['International trade', ['balance of trade and balance of payments', 'trade deficit', 'exchange rate', 'free trade vs protective trade', 'comparative cost theory']],
      ],
    },
    {
      n: 4, area: 'Development Economics', name: 'Development economics', hours: 8, core: [1, 3],
      topics: [
        ['Poverty, inequality and unemployment', ['concepts and causes', 'measures of poverty and inequality']],
        ['Human resources and human development', ['human development index and other HD indicators']],
        ['Population of Nepal', ['size, structure, distribution and growth']],
      ],
    },
    {
      n: 5, area: 'Nepalese Economy', name: 'Nepalese economy', hours: 28, core: [1, 3],
      topics: [
        ['Foreign trade of Nepal', ['growth, trend and direction of trade', 'problems of Nepalese foreign trade', 'WTO and SAFTA']],
        ['Foreign employment and remittance', ['contribution and problems of foreign employment', 'importance of remittance']],
        ['Development planning in Nepal', ['past and present periodic plans', 'plan formulation process']],
        ['UN SDGs and Nepal', ['17 sustainable development goals', 'goals relevant to Nepal']],
      ],
    },
    {
      n: 6, area: 'Quantitative Techniques', name: 'Quantitative techniques in economics', hours: 13, core: [3, 4],
      topics: [
        ['Basic statistics', ['definition, scope, importance and limitations']],
        ['Data collection', ['primary methods: census and sampling', 'secondary sources']],
        ['Measures of dispersion', ['range, mean deviation, standard deviation', 'coefficient of variation and quartile deviation']],
        ['Index numbers', ["Laspeyre's index", "Paasche's index"]],
        ['Measures of central tendency', ['mean, median and mode', 'solved numerical problems']],
      ],
    },
  ],
};

export const ECONOMICS: SyllabusSubject = buildSubject(ECONOMICS_LITERAL);
