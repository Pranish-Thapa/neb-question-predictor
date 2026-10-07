import type { EvidenceRecord, PaperRecord, QuestionCandidate, QuestionFamily, QuestionType } from '../../engine/types';

/**
 * ECONOMICS research database.
 * Every EvidenceRecord is traceable to a paper record -> source registry URL.
 * Board papers 2079 (regular + grade-increment), 2080, 2081, 2082, 2083, the official 2079 model
 * question and one real 2082 school terminal paper were analyzed. Records marked `verbatim` were
 * read as question text; the paper-level label reflects what was readable on that page.
 * marks = 0 means "mark value not readable from the source" (never guessed).
 */

export const ECONOMICS_PAPERS: PaperRecord[] = [
  { id: 'p-eco-2079', subject: 'economics', label: 'NEB Board 2079 (2022) — Economics, code 3041 H (Group A + start of B readable)', examType: 'neb-board', bsYear: 2079, adYear: 2022, sourceId: 'eco-paper-2079', extraction: 'verbatim' },
  { id: 'p-eco-2079gi', subject: 'economics', label: 'NEB Board 2079 (2022) — Economics Grade Improvement / supplementary', examType: 'neb-board', bsYear: 2079, adYear: 2023, sourceId: 'eco-paper-2079gi', extraction: 'verbatim' },
  { id: 'p-eco-2080', subject: 'economics', label: 'NEB Board 2080 (2023) — Economics, code 3041', examType: 'neb-board', bsYear: 2080, adYear: 2023, sourceId: 'eco-paper-2080', extraction: 'verbatim' },
  { id: 'p-eco-2081', subject: 'economics', label: 'NEB Board 2081 (2024) — Economics, code 3041 Q (selected questions readable)', examType: 'neb-board', bsYear: 2081, adYear: 2024, sourceId: 'eco-paper-2081', extraction: 'verbatim' },
  { id: 'p-eco-2082', subject: 'economics', label: 'NEB Board 2082 (2025) — Economics, code 3041 B (selected questions readable)', examType: 'neb-board', bsYear: 2082, adYear: 2025, sourceId: 'eco-paper-2082', extraction: 'verbatim' },
  { id: 'p-eco-2083', subject: 'economics', label: 'NEB Board 2083 (2026) — Economics, code 3041', examType: 'neb-board', bsYear: 2083, adYear: 2026, sourceId: 'eco-paper-2083', extraction: 'verbatim' },
  { id: 'p-eco-2079m', subject: 'economics', label: 'Official NEB Model Question 2079 (for 2080 batch) — Economics 3041', examType: 'neb-model', bsYear: 2079, adYear: 2023, sourceId: 'eco-model-2079', extraction: 'verbatim' },
  { id: 'p-eco-2082t', subject: 'economics', label: 'Shree Tribhuwan Shanti S.S. School — Terminal Exam 2082, Class 12 Economics, F.M. 75', examType: 'terminal', bsYear: 2082, adYear: 2025, sourceId: 'eco-terminal-2082', extraction: 'verbatim' },
];

const fam = (id: string, chapterId: string, concept: string, aliases: string[] = []): QuestionFamily => ({
  id, subject: 'economics', chapterId, concept, aliases,
});

export const ECONOMICS_FAMILIES: QuestionFamily[] = [
  fam('eco-opportunity-cost', 'eco-01', 'Opportunity cost, choice and allocation of resources', ['What is opportunity cost?', 'What is allocation of resources?', 'Write the meaning of opportunity cost in economics with example.']),
  fam('eco-division-of-labour', 'eco-01', 'Division of labour and its advantages', ['What is division of labour? Explain its advantages.', 'Write any two advantages of division of labour.']),
  fam('eco-economic-systems', 'eco-01', 'Economic systems: capitalist, socialist and mixed economy — features', ['What is capitalist economy? Explain its features.', 'What is socialist economy? Explain its features.']),
  fam('eco-ppc', 'eco-01', 'Production possibility curve: concept, shape, table and diagram', ['Explain the production possibility curve with diagram.', 'PPC with table and diagram']),
  fam('eco-revenue-curves', 'eco-02', 'Total, average and marginal revenue: relationship and curves', ['Complete the table and draw average and marginal revenue curves.', 'Define TR, AR and MR and explain the relationship between them under perfect competition.']),
  fam('eco-revenue-cost-numerical', 'eco-02', 'Revenue, cost and profit numericals from formulas (TR, MR, profit)', ['If total revenue of a firm is Rs. 5,000 and total cost is Rs. 4,200, then find the total profit using formula.', 'If TR = 7Q² − 8Q + 30 and TC = 6Q² − 10Q + 20, find the total profit.']),
  fam('eco-cost-curves', 'eco-02', 'Cost concepts and short-run cost curves (fixed, variable, AC, MC)', ['Show marginal cost curve in a diagram.', 'fixed vs variable cost', 'Complete the table of output, TFC, TVC, TC, AC and MC.']),
  fam('eco-firm-equilibrium', 'eco-02', 'Equilibrium of a firm using the MR–MC approach (perfect competition / monopoly)', ['How is equilibrium output determined by a firm using MR-MC approach under monopoly market?', 'Describe the short-run equilibrium under perfect competition with diagram.']),
  fam('eco-rent-theory', 'eco-02', 'Ricardian theory of rent', ['Explain the Ricardian theory of rent.']),
  fam('eco-wages-theory', 'eco-02', 'Wage theories (wage fund / subsistence)', ['Explain the Wage Fund Theory of wages.']),
  fam('eco-interest-theory', 'eco-02', 'Classical theory of interest', ['Explain the classical theory of interest.']),
  fam('eco-profit-theory', 'eco-02', 'Theories of profit (risk-bearing / uncertainty-bearing)', ['Explain the risk-bearing theory of profit. What are its criticisms?', 'Describe the Uncertainty Bearing Theory of Profit and point out its weaknesses.']),
  fam('eco-commercial-bank', 'eco-03', 'Commercial banks: functions and classification in Nepal', ['Describe the main functions of commercial bank.', 'Describe the classification of banks in Nepal.']),
  fam('eco-central-bank-monetary', 'eco-03', 'Central bank functions, money/capital market and monetary policy', ['Define expansionary monetary policy.', 'What is monetary policy? Explain its type.', 'Which bank is called lender of last resort?']),
  fam('eco-tax-system', 'eco-03', 'Government revenue, kinds of taxes and qualities of a good tax system', ['What is progressive tax?', 'Explain the application of various qualities of a good tax system.', 'Explain the sources of government revenue in reference to Nepal.']),
  fam('eco-budget', 'eco-03', 'Government budget and expenditure (current vs capital expenditure)', ['Write the meaning of current expenditure.', 'Why does capital expenditure play a vital role in the economic development of a country?']),
  fam('eco-international-trade', 'eco-03', 'Free trade vs protective trade and the comparative cost argument', ['Write any two arguments in favour of free trade.', 'What is free trade? Why are developing countries not always benefited?']),
  fam('eco-poverty', 'eco-04', 'Poverty and inequality in Nepal: concept and reduction efforts', ['Evaluate the efforts made by the government for the reduction of poverty in Nepal.', 'Define relative poverty.']),
  fam('eco-hdi', 'eco-04', 'Human Development Index and human resources in development', ['What is Human Development Index (HDI)?', 'Mention any two importance of human resource for economic development.']),
  fam('eco-unemployment', 'eco-04', 'Unemployment in Nepal', ['unemployment in Nepal']),
  fam('eco-foreign-trade-nepal', 'eco-05', 'Nepalese foreign trade: direction, problems and trade deficit', ['Examine the direction and problems of Nepalese foreign trade.', 'Evaluate the causes of increasing trade deficit in Nepal.']),
  fam('eco-foreign-employment', 'eco-05', 'Foreign employment and remittance: contribution and problems', ['How can foreign employment contribute to the Nepalese economy?', 'Write any two importance of remittance in Nepalese economy.']),
  fam('eco-plan-nepal', 'eco-05', 'Development planning in Nepal: formulation, goals and priorities', ['Explain how plan is formulated in Nepal.', 'Describe any five priorities of the current plan of Nepal.']),
  fam('eco-sdg', 'eco-05', 'UN Sustainable Development Goals relevant to Nepal', ['Write one of the 17 SDGs not directly relevant to Nepal.', 'Evaluate any four sustainable development goals relevant to the Nepalese context with examples.']),
  fam('eco-trade-orgs', 'eco-05', 'International trade organisations: WTO and SAFTA', ['What is South Asian Free Trade Area (SAFTA)?', 'Mention any two advantages that Nepal can get from WTO.']),
  fam('eco-statistics-basics', 'eco-06', 'Statistics: definition, importance, limitations, census vs sampling and data types', ['What is Primary Data?', 'Why is sampling more economical than census?', 'Write any two importance of statistics in economics.']),
  fam('eco-mean-median', 'eco-06', 'Mean, median and mode numericals', ["Find the value of X if the mean of the given data is 35.", 'If median = 23 and mode = 25, find the value of arithmetic mean.']),
  fam('eco-dispersion', 'eco-06', 'Measures of dispersion: range, mean deviation, standard deviation, coefficient of variation', ['Find the Range from the following data.', 'Find coefficient of variation from SD and mean.', 'Find the standard deviation and explain why it is superior to mean deviation.']),
  fam('eco-index', 'eco-06', 'Index numbers: Laspeyre\'s and Paasche\'s', ["Paasche's index number", "Laspeyre's index number", "If the value of current year's price index number is 150, what does it mean?"]),
];

const ev = (
  paperId: string,
  familyId: string,
  chapterId: string,
  slot: string,
  marks: number,
  questionType: QuestionType,
  text: string,
  note?: string,
): EvidenceRecord => ({
  id: `e-${paperId}-${slot.toLowerCase().replace(/\s/g, '')}`,
  paperId, familyId, chapterId, slot, marks, questionType,
  text, extraction: 'verbatim', ...(note ? { note } : {}),
});

const FIG = 'Numerical figures printed in the paper are not reproduced in this record.';

export const ECONOMICS_EVIDENCE: EvidenceRecord[] = [
  /* ---------- 2079 regular board paper (Group A + start of Group B readable) ---------- */
  ev('p-eco-2079', 'eco-opportunity-cost', 'eco-01', 'A1', 1, 'definition', 'What is opportunity cost?'),
  ev('p-eco-2079', 'eco-revenue-cost-numerical', 'eco-02', 'A2', 1, 'numerical', 'If total revenue of a firm is Rs. 6,000 and total cost is Rs. 4,800, then find the total profit by using formula.'),
  ev('p-eco-2079', 'eco-central-bank-monetary', 'eco-03', 'A3', 1, 'definition', 'What is monetary policy?'),
  ev('p-eco-2079', 'eco-tax-system', 'eco-03', 'A4', 1, 'short-answer', 'Write any two examples of indirect tax.'),
  ev('p-eco-2079', 'eco-hdi', 'eco-04', 'A5', 1, 'short-answer', 'Mention any two importance of human resource for the economic development.'),
  ev('p-eco-2079', 'eco-trade-orgs', 'eco-05', 'A6', 1, 'definition', 'What is World Trade Organization?'),
  ev('p-eco-2079', 'eco-foreign-trade-nepal', 'eco-05', 'A7', 1, 'short-answer', 'Write any two problems of Nepalese foreign trade.'),
  ev('p-eco-2079', 'eco-sdg', 'eco-05', 'A8', 1, 'identification', 'Which one of the 17 goals of sustainable development is not directly relevant to Nepal.'),
  ev('p-eco-2079', 'eco-statistics-basics', 'eco-06', 'A9', 1, 'short-answer', 'Write any two uses of statistics in economics.'),
  ev('p-eco-2079', 'eco-statistics-basics', 'eco-06', 'A10', 1, 'explanation', 'Why is the census method of collecting data more expensive than the sampling method?'),
  ev('p-eco-2079', 'eco-mean-median', 'eco-06', 'A11', 1, 'numerical', "Find the value of 'x' if the mean of given data is 22. Income (in Rs.): 15, 20, x, 30, 35."),
  ev('p-eco-2079', 'eco-ppc', 'eco-01', 'B12', 5, 'explanation', 'Explain the production possibility curve with diagram.'),
  ev('p-eco-2079', 'eco-economic-systems', 'eco-01', 'B12or', 5, 'explanation', 'What is socialist economy? Explain its features.', 'OR alternative printed inside the same question slot.'),
  ev('p-eco-2079', 'eco-wages-theory', 'eco-02', 'B13', 5, 'explanation', 'Explain the Wage Fund Theory of wages.'),

  /* ---------- 2079 grade-increment paper (full) ---------- */
  ev('p-eco-2079gi', 'eco-economic-systems', 'eco-01', 'A1', 1, 'short-answer', 'Write any two features of capitalism.'),
  ev('p-eco-2079gi', 'eco-cost-curves', 'eco-02', 'A2', 1, 'diagram', 'Show marginal cost curve in a diagram.'),
  ev('p-eco-2079gi', 'eco-central-bank-monetary', 'eco-03', 'A3', 1, 'short-answer', 'Mention any two features of capital market.'),
  ev('p-eco-2079gi', 'eco-tax-system', 'eco-03', 'A4', 1, 'explanation', 'Why is the progressive tax system more appropriate than the other tax system? Give any two reasons.'),
  ev('p-eco-2079gi', 'eco-hdi', 'eco-04', 'A5', 1, 'definition', 'What is human development index?'),
  ev('p-eco-2079gi', 'eco-foreign-employment', 'eco-05', 'A6', 1, 'definition', 'What is remittance?'),
  ev('p-eco-2079gi', 'eco-plan-nepal', 'eco-05', 'A7', 1, 'explanation', 'Why is a plan necessary in the development process?'),
  ev('p-eco-2079gi', 'eco-foreign-employment', 'eco-05', 'A8', 1, 'short-answer', 'Write any two demerits of foreign employment.'),
  ev('p-eco-2079gi', 'eco-statistics-basics', 'eco-06', 'A9', 1, 'definition', 'What is secondary data?'),
  ev('p-eco-2079gi', 'eco-dispersion', 'eco-06', 'A10', 1, 'numerical', 'Calculate coefficient of variation if standard deviation and mean are 7 and 14 respectively.'),
  ev('p-eco-2079gi', 'eco-index', 'eco-06', 'A11', 1, 'explanation', "If the value of current year's price index number of an economy is 150 (P = 150), what does it mean?"),
  ev('p-eco-2079gi', 'eco-firm-equilibrium', 'eco-02', 'C20', 8, 'long-answer', 'What is monopoly? How are equilibrium price and output determined in the short run by using the MR-MC approach under it? Explain.'),
  ev('p-eco-2079gi', 'eco-tax-system', 'eco-03', 'C21', 8, 'long-answer', 'What are the qualities that a tax system needs to be good? Explain them.'),
  ev('p-eco-2079gi', 'eco-sdg', 'eco-05', 'C22', 8, 'long-answer', 'What is sustainable development? Review the progress of Nepal in the field of quality education.'),
  ev('p-eco-2079gi', 'eco-plan-nepal', 'eco-05', 'C22or', 8, 'long-answer', 'Describe the plan formulation process in Nepal and mention any four importance of planned development.', 'OR alternative printed inside the same question slot.'),

  /* ---------- 2080 board paper (full) ---------- */
  ev('p-eco-2080', 'eco-opportunity-cost', 'eco-01', 'A1', 1, 'definition', 'What is allocation of resources?'),
  ev('p-eco-2080', 'eco-revenue-cost-numerical', 'eco-02', 'A2', 1, 'numerical', 'If total revenue of a firm is Rs. 5,000 and total cost is Rs. 4,200, then find the total profit using formula.'),
  ev('p-eco-2080', 'eco-tax-system', 'eco-03', 'A3', 1, 'definition', 'What is progressive tax?'),
  ev('p-eco-2080', 'eco-international-trade', 'eco-03', 'A4', 1, 'short-answer', 'Write any two arguments in favour of free trade.'),
  ev('p-eco-2080', 'eco-hdi', 'eco-04', 'A5', 1, 'definition', 'What is Human Development Index (HDI)?'),
  ev('p-eco-2080', 'eco-trade-orgs', 'eco-05', 'A6', 1, 'definition', 'What is South Asian Free Trade Area (SAFTA)?'),
  ev('p-eco-2080', 'eco-foreign-employment', 'eco-05', 'A7', 1, 'short-answer', 'Write any two importance of remittance in Nepalese economy.'),
  ev('p-eco-2080', 'eco-sdg', 'eco-05', 'A8', 1, 'identification', 'Write one of the 17 SDGs not directly relevant to Nepal.'),
  ev('p-eco-2080', 'eco-statistics-basics', 'eco-06', 'A9', 1, 'short-answer', 'Write any two importance of statistics in economics.'),
  ev('p-eco-2080', 'eco-statistics-basics', 'eco-06', 'A10', 1, 'explanation', 'Why is sampling more economical than census?'),
  ev('p-eco-2080', 'eco-mean-median', 'eco-06', 'A11', 1, 'numerical', 'Find the value of X if the mean of the given data is 35. Income in Rs.: 10, 20, X, 40, 60.'),
  ev('p-eco-2080', 'eco-division-of-labour', 'eco-01', 'B12', 5, 'explanation', 'What is division of labour? Explain its advantages.'),
  ev('p-eco-2080', 'eco-economic-systems', 'eco-01', 'B12or', 5, 'explanation', 'What is capitalist economy? Explain its features.', 'OR alternative printed inside the same question slot.'),
  ev('p-eco-2080', 'eco-rent-theory', 'eco-02', 'B13', 5, 'explanation', 'Explain the Ricardian theory of rent.'),
  ev('p-eco-2080', 'eco-revenue-curves', 'eco-02', 'B14', 5, 'diagram', 'Complete the given table (i) and (ii) draw average and marginal revenue curves.', FIG),
  ev('p-eco-2080', 'eco-firm-equilibrium', 'eco-02', 'B15', 5, 'explanation', 'How is equilibrium output determined by a firm using the MR-MC approach under monopoly market?'),
  ev('p-eco-2080', 'eco-commercial-bank', 'eco-03', 'B16', 5, 'explanation', 'Describe the main functions of a commercial bank.'),
  ev('p-eco-2080', 'eco-poverty', 'eco-04', 'B17', 5, 'long-answer', 'Evaluate the efforts made by the government for the reduction of poverty in Nepal.'),
  ev('p-eco-2080', 'eco-plan-nepal', 'eco-05', 'B18', 5, 'long-answer', 'Explain how a plan is formulated in Nepal.'),
  ev('p-eco-2080', 'eco-dispersion', 'eco-06', 'B19', 5, 'numerical', 'Find the standard deviation of the given data and explain why standard deviation is considered superior to mean deviation.', FIG),
  ev('p-eco-2080', 'eco-index', 'eco-06', 'B19or', 5, 'numerical', "Find Paasche's index number from the given data.", 'OR alternative printed inside the same question slot.'),
  ev('p-eco-2080', 'eco-cost-curves', 'eco-02', 'C20', 8, 'long-answer', 'Answer the following questions based on the given table of output, TFC, TVC, TC, AC and MC [6+2].', FIG),
  ev('p-eco-2080', 'eco-budget', 'eco-03', 'C21', 8, 'long-answer', 'Why does capital expenditure play a vital role in the economic development of a country?'),
  ev('p-eco-2080', 'eco-foreign-trade-nepal', 'eco-05', 'C22', 8, 'long-answer', 'Examine the direction and problems of Nepalese foreign trade.'),
  ev('p-eco-2080', 'eco-foreign-employment', 'eco-05', 'C22or', 8, 'long-answer', 'How can foreign employment contribute to the Nepalese economy?', 'OR alternative printed inside the same question slot.'),

  /* ---------- 2081 board paper (selected readable questions) ---------- */
  ev('p-eco-2081', 'eco-revenue-cost-numerical', 'eco-02', 'A2', 1, 'numerical', 'If the total revenue of a firm is TR = 7Q² − 8Q + 30 and total cost is TC = 6Q² − 10Q + 20, then find the total profit.'),
  ev('p-eco-2081', 'eco-mean-median', 'eco-06', 'A11', 1, 'numerical', 'If median = 23 and mode = 25, find the value of arithmetic mean.'),
  ev('p-eco-2081', 'eco-profit-theory', 'eco-02', 'B13', 5, 'explanation', 'Explain the risk-bearing theory of profit. What are its criticisms?'),
  ev('p-eco-2081', 'eco-tax-system', 'eco-03', 'C21', 8, 'long-answer', 'Explain the sources of government revenue in reference to Nepal.'),
  ev('p-eco-2081', 'eco-foreign-employment', 'eco-05', 'C22', 8, 'long-answer', 'Examine the advantages and disadvantages of foreign employment of Nepal.'),
  ev('p-eco-2081', 'eco-foreign-trade-nepal', 'eco-05', 'C22or', 8, 'long-answer', 'Major problems of Nepalese foreign trade.', 'OR alternative printed inside the same question slot.'),

  /* ---------- 2082 board paper (selected readable questions) ---------- */
  ev('p-eco-2082', 'eco-cost-curves', 'eco-02', 'A2', 1, 'numerical', 'If total cost of producing 7th and 8th units are Rs. 624 and Rs. 727 respectively, find marginal cost.'),
  ev('p-eco-2082', 'eco-central-bank-monetary', 'eco-03', 'A3', 1, 'definition', 'Which bank is called lender of last resort?'),
  ev('p-eco-2082', 'eco-plan-nepal', 'eco-05', 'A7', 1, 'short-answer', 'Write any two objectives of the sixteenth plan.'),
  ev('p-eco-2082', 'eco-interest-theory', 'eco-02', 'B13', 5, 'explanation', 'Explain the classical theory of interest.'),
  ev('p-eco-2082', 'eco-firm-equilibrium', 'eco-02', 'B15', 5, 'numerical', 'Let cost function TC = 60 + 7Q² and revenue function TR = 120Q − 5Q². Find equilibrium level of output and profit.'),
  ev('p-eco-2082', 'eco-international-trade', 'eco-03', 'C21', 8, 'long-answer', 'What is free trade? Why are developing countries not always benefited from it?'),
  ev('p-eco-2082', 'eco-foreign-trade-nepal', 'eco-05', 'C22', 8, 'long-answer', 'Evaluate the causes of increasing trade deficit in Nepal.'),
  ev('p-eco-2082', 'eco-plan-nepal', 'eco-05', 'C22or', 8, 'long-answer', 'Evaluate the achievement of the fifteenth periodic plan of Nepal.', 'OR alternative printed inside the same question slot.'),

  /* ---------- 2083 board paper (full) ---------- */
  ev('p-eco-2083', 'eco-budget', 'eco-03', 'A1', 1, 'definition', 'Write the meaning of current expenditure.'),
  ev('p-eco-2083', 'eco-statistics-basics', 'eco-06', 'A2', 1, 'definition', 'What is Primary Data?'),
  ev('p-eco-2083', 'eco-opportunity-cost', 'eco-01', 'A3', 1, 'definition', 'Write the meaning of opportunity cost in economics with example.'),
  ev('p-eco-2083', 'eco-revenue-cost-numerical', 'eco-02', 'A4', 1, 'numerical', 'If a business firm sells 25 units of apple at per unit price Rs. 30, find Total Revenue by using formula.'),
  ev('p-eco-2083', 'eco-central-bank-monetary', 'eco-03', 'A5', 1, 'definition', 'Define expansionary monetary policy.'),
  ev('p-eco-2083', 'eco-hdi', 'eco-04', 'A6', 1, 'definition', 'What is human development index?'),
  ev('p-eco-2083', 'eco-trade-orgs', 'eco-05', 'A7', 1, 'short-answer', 'Write any two member countries of SAFTA.'),
  ev('p-eco-2083', 'eco-foreign-trade-nepal', 'eco-05', 'A8', 1, 'short-answer', 'State any two items that Nepal exports to other countries.'),
  ev('p-eco-2083', 'eco-trade-orgs', 'eco-05', 'A9', 1, 'short-answer', 'Mention any two advantages that Nepal can get from WTO.'),
  ev('p-eco-2083', 'eco-dispersion', 'eco-06', 'A10', 1, 'numerical', 'Find the Range from the following data.'),
  ev('p-eco-2083', 'eco-dispersion', 'eco-06', 'A11', 1, 'numerical', 'If mean and S.D. are 400, 10 and 25 respectively, find coefficient of S.D.'),
  ev('p-eco-2083', 'eco-ppc', 'eco-01', 'B12', 5, 'diagram', 'Explain the production possibility curve with the help of a table and diagram [5].', FIG),
  ev('p-eco-2083', 'eco-division-of-labour', 'eco-01', 'B12or', 5, 'explanation', 'Explain division of labour and its advantages.', 'OR alternative printed inside the same question slot.'),
  ev('p-eco-2083', 'eco-cost-curves', 'eco-02', 'B13', 5, 'comparison', 'Distinguish between fixed cost and variable cost [5].'),
  ev('p-eco-2083', 'eco-revenue-curves', 'eco-02', 'B14', 5, 'numerical', 'From the given demand and cost functions, find MR and MC functions [5].', FIG),
  ev('p-eco-2083', 'eco-commercial-bank', 'eco-03', 'B15', 5, 'explanation', 'Describe the classification of banks in Nepal [5].'),
  ev('p-eco-2083', 'eco-revenue-curves', 'eco-02', 'B16', 5, 'numerical', 'From the given table, find TR, MR and AR [2+3].', FIG),
  ev('p-eco-2083', 'eco-unemployment', 'eco-04', 'B17', 5, 'long-answer', 'Explain the situation and causes of unemployment in Nepal [5].'),
  ev('p-eco-2083', 'eco-plan-nepal', 'eco-05', 'B18', 5, 'long-answer', 'Describe any five priorities of the current plan of Nepal [5].'),
  ev('p-eco-2083', 'eco-dispersion', 'eco-06', 'B19', 5, 'numerical', 'Find the mean deviation of the given data [5].', FIG),
  ev('p-eco-2083', 'eco-index', 'eco-06', 'B19or', 5, 'numerical', "Find Laspeyre's index number from the given data [5].", 'OR alternative printed inside the same question slot.'),
  ev('p-eco-2083', 'eco-firm-equilibrium', 'eco-02', 'C20', 8, 'long-answer', 'Describe the short-run equilibrium under perfect competition with diagram.'),
  ev('p-eco-2083', 'eco-tax-system', 'eco-03', 'C21', 8, 'long-answer', 'Explain the application of various qualities of a good tax system.'),
  ev('p-eco-2083', 'eco-foreign-employment', 'eco-05', 'C22', 8, 'long-answer', 'Evaluate the effects of foreign employment on the long-term economic development of Nepal.'),
  ev('p-eco-2083', 'eco-sdg', 'eco-05', 'C22or', 8, 'long-answer', 'Evaluate any four sustainable development goals relevant to the Nepalese context with examples.', 'OR alternative printed inside the same question slot.'),

  /* ---------- Official model question 2079 (English lines verbatim) ---------- */
  ev('p-eco-2079m', 'eco-division-of-labour', 'eco-01', 'A1', 1, 'short-answer', 'Write any two advantages of division of labour.'),
  ev('p-eco-2079m', 'eco-revenue-cost-numerical', 'eco-02', 'A2', 1, 'numerical', 'A seller earns Rs. 700 from the sale of 10 units of a good. If s/he sells 1 more unit, her/his total revenue becomes Rs. 750, then find marginal revenue by using formula.'),
  ev('p-eco-2079m', 'eco-central-bank-monetary', 'eco-03', 'A3', 1, 'definition', 'What is the policy applied by central bank to control the money supply and credit called?'),
  ev('p-eco-2079m', 'eco-dispersion', 'eco-06', 'A11', 1, 'numerical', 'If the difference and sum of first quartile (Q1) and third quartile (Q3) are 45 and 75 respectively, find the coefficient of quartile-deviation and interpret it.'),
  ev('p-eco-2079m', 'eco-opportunity-cost', 'eco-01', 'B12', 5, 'explanation', 'What is the meaning of allocation of resources? Identify and describe the three major issues of an economy [5].'),
  ev('p-eco-2079m', 'eco-economic-systems', 'eco-01', 'B12or', 5, 'explanation', 'What is Market Economy? Explain any four features of it.', 'OR alternative printed inside the same question slot.'),
  ev('p-eco-2079m', 'eco-profit-theory', 'eco-02', 'B13', 5, 'explanation', 'Describe the Uncertainty Bearing Theory of Profit and point out any four weaknesses.'),
  ev('p-eco-2079m', 'eco-foreign-employment', 'eco-05', 'C22', 8, 'long-answer', 'Explain your ideas in four points for each about foreign employment.'),
  ev('p-eco-2079m', 'eco-sdg', 'eco-05', 'C22or', 8, 'long-answer', 'Prioritize and list out any four major SDGs of the UN that are directly relevant to Nepal.', 'OR alternative printed inside the same question slot.'),

  /* ---------- 2082 school terminal paper (real school exam, see source caveat) ---------- */
  ev('p-eco-2082t', 'eco-opportunity-cost', 'eco-01', 'A1', 1, 'definition', 'Define choice. (छनोटको परिभाषा दिनुहोस्।)'),
  ev('p-eco-2082t', 'eco-central-bank-monetary', 'eco-03', 'A2', 1, 'definition', 'Define money market.'),
  ev('p-eco-2082t', 'eco-division-of-labour', 'eco-01', 'B12', 5, 'explanation', 'What is division of labor? Explain its advantages.'),
  ev('p-eco-2082t', 'eco-central-bank-monetary', 'eco-03', 'B19', 5, 'explanation', 'What is monetary policy? Explain its type.'),
  ev('p-eco-2082t', 'eco-firm-equilibrium', 'eco-02', 'B19b', 5, 'numerical', 'P = 56 − 2Q while cost function is TC = 50 + 2Q + 0.25Q². Find the profit maximizing price, output and maximum profit.'),
  ev('p-eco-2082t', 'eco-revenue-curves', 'eco-02', 'C20', 8, 'long-answer', 'Define TR, AR and MR. Explain the relationship between TR, AR and MR under perfect competition.'),
  ev('p-eco-2082t', 'eco-firm-equilibrium', 'eco-02', 'C21', 8, 'long-answer', 'Explain the equilibrium of a firm under monopoly market in short run.'),
  ev('p-eco-2082t', 'eco-rent-theory', 'eco-02', 'C22', 8, 'long-answer', 'Explain the Ricardian theory of rent.'),
];

const cand = (
  id: string,
  chapterId: string,
  familyId: string,
  text: string,
  marks: number,
  specSection: 'A' | 'B' | 'C',
  questionType: QuestionType,
  conceptual: 'core' | 'standard' | 'supporting',
  answerHint?: string,
): QuestionCandidate => ({
  id, subject: 'economics', chapterId, familyId, text, marks, questionType,
  origin: 'syllabus-derived', specSection, conceptual, ...(answerHint ? { answerHint } : {}),
});

export const ECONOMICS_CANDIDATES: QuestionCandidate[] = [
  cand('q-eco-opportunity', 'eco-01', 'eco-opportunity-cost', 'What is opportunity cost? Explain it with an example, or what is allocation of resources?', 1, 'A', 'definition', 'core', 'Opportunity cost = the value of the next best alternative forgone when a choice is made. Allocation of resources answers what, how and for whom to produce under scarcity.'),
  cand('q-eco-division', 'eco-01', 'eco-division-of-labour', 'What is division of labour? Explain its advantages.', 5, 'B', 'explanation', 'core', 'Division of labour = splitting work into separate tasks performed by specialists. Advantages: greater skill and speed, less time lost changing tools, better use of machinery, higher quality and output.'),
  cand('q-eco-division-short', 'eco-01', 'eco-division-of-labour', 'Write any two advantages of division of labour.', 1, 'A', 'short-answer', 'standard', 'Greater skill and speed, less time lost changing tools/positions, better use of machinery, higher quality and greater output — any two with a line each.'),
  cand('q-eco-systems', 'eco-01', 'eco-economic-systems', 'What is a capitalist (market) economy? Explain its features, or distinguish it from a socialist economy.', 5, 'B', 'explanation', 'standard', 'Capitalist features: private ownership of means of production, profit motive, price mechanism through demand and supply, competition, consumer sovereignty. Socialist: state ownership, central planning, social welfare motive.'),
  cand('q-eco-systems-short', 'eco-01', 'eco-economic-systems', 'Write any two features of capitalism (a capitalist economy).', 1, 'A', 'short-answer', 'standard', 'Private ownership of the means of production, profit motive, price mechanism through demand and supply, competition, consumer sovereignty — any two with one line each.'),
  cand('q-eco-ppc', 'eco-01', 'eco-ppc', 'Explain the production possibility curve with the help of a table and a diagram.', 5, 'B', 'diagram', 'core', 'PPC shows maximum combinations of two goods an economy can produce with given resources and technology. It is concave to the origin because of increasing opportunity cost; it shifts outward when resources or technology improve.'),
  cand('q-eco-revenue-curves', 'eco-02', 'eco-revenue-curves', 'Define TR, AR and MR and explain the relationship between them under perfect competition; or complete the given table and draw the AR and MR curves.', 5, 'B', 'diagram', 'core', 'TR = P × Q; AR = TR/Q = P; MR = change in TR from one more unit. Under perfect competition P is constant so AR = MR (horizontal line); under monopoly AR falls and MR lies below AR, becoming zero when TR is maximum.'),
  cand('q-eco-revenue-numerical', 'eco-02', 'eco-revenue-cost-numerical', 'From the given total revenue and total cost (or a revenue function), find total profit / marginal revenue by formula.', 1, 'A', 'numerical', 'core', 'Profit = TR − TC. MR = change in TR ÷ change in output (or differentiate the TR function). Use the exact figures printed in your paper.'),
  cand('q-eco-cost-curves', 'eco-02', 'eco-cost-curves', 'Distinguish between fixed and variable cost, or complete the TFC/TVC/TC/AC/MC table and show the marginal cost curve in a diagram.', 5, 'B', 'diagram', 'core', 'Fixed cost does not vary with output (rent, insurance); variable cost varies (raw material, wages). AC = TC/Q; MC = change in TC per extra unit; MC cuts AC at its minimum. MC curve is U-shaped due to law of variable proportions.'),
  cand('q-eco-equilibrium', 'eco-02', 'eco-firm-equilibrium', 'Describe the short-run equilibrium of a firm under perfect competition with diagram, or how equilibrium is determined under monopoly using the MR-MC approach.', 8, 'C', 'long-answer', 'core', 'Equilibrium where MR = MC and MC rises. Under perfect competition P = MR so equilibrium is at P = MC; the firm produces only if P ≥ AVC in the short run. Under monopoly the equilibrium price is read from the demand (AR) curve at the MR = MC output.'),
  cand('q-eco-rent', 'eco-02', 'eco-rent-theory', 'Explain the Ricardian theory of rent.', 5, 'B', 'explanation', 'standard', 'Rent is the difference between the produce of the marginal (last, no-rent) land and the more fertile land, arising from diminishing returns and differences in fertility of land.'),
  cand('q-eco-wages', 'eco-02', 'eco-wages-theory', 'Explain the wage fund theory of wages.', 5, 'B', 'explanation', 'supporting', 'Wages are paid out of a fixed wage fund accumulated by capitalists; wage level depends on the size of the fund relative to the working population. Criticised for treating wages as a residual and ignoring trade-union bargaining.'),
  cand('q-eco-interest', 'eco-02', 'eco-interest-theory', 'Explain the classical theory of interest.', 5, 'B', 'explanation', 'standard', 'Interest is the reward for waiting/abstinence and is determined by the equilibrium of saving and investment in the loanable-funds market (demand for and supply of capital).'),
  cand('q-eco-profit', 'eco-02', 'eco-profit-theory', 'Explain the risk-bearing / uncertainty-bearing theory of profit and point out its weaknesses.', 5, 'B', 'explanation', 'standard', 'Profit is the reward for bearing uninsurable risk (Knight) or for bearing uncertainty and making non-routine decisions (Hawley). Weaknesses: profit may be due to monopoly power or innovation rather than risk bearing.'),
  cand('q-eco-commercial-bank', 'eco-03', 'eco-commercial-bank', 'Describe the main functions of a commercial bank, or the classification of banks in Nepal.', 5, 'B', 'explanation', 'standard', 'Functions: accepting deposits (current, savings, fixed), lending (overdraft, term loan, cash credit), agency services (cheque collection, bill payment, transfer), general utility (locker, foreign exchange). Nepal: development banks, commercial banks, finance companies as classified by NRB.'),
  cand('q-eco-central-bank', 'eco-03', 'eco-central-bank-monetary', 'What is monetary policy? Explain its types, or the functions of the central bank (lender of last resort, bank of issue, banker to government).', 5, 'B', 'explanation', 'core', 'Monetary policy = central bank measures to control money supply and credit to achieve price stability and growth. Expansionary: lower repo/CRR, more lending to raise money supply. Contractionary: the reverse. Central bank functions: bank of issue, banker to government, lender of last resort, banker\'s bank, control of credit.'),
  cand('q-eco-tax', 'eco-03', 'eco-tax-system', 'Explain the qualities of a good tax system, or the sources of government revenue in Nepal.', 8, 'C', 'long-answer', 'core', 'Good tax: equity (ability to pay), certainty, convenience, economy of collection, productivity, elasticity. Revenue sources in Nepal: tax revenue (indirect — VAT, excise; direct — income, land revenue, property) and non-tax revenue (fees, profits, royalties). Progressive tax takes a higher proportion as income rises.'),
  cand('q-eco-tax-short', 'eco-03', 'eco-tax-system', 'What is progressive tax? Write any two examples of indirect tax.', 1, 'A', 'definition', 'standard', 'Progressive tax takes a higher proportion of income as income rises. Indirect taxes: VAT, excise duty, customs duty (any two).'),
  cand('q-eco-budget', 'eco-03', 'eco-budget', 'Write the meaning of current expenditure, or why capital expenditure is vital for economic development.', 5, 'B', 'explanation', 'supporting', 'Current expenditure meets day-to-day running costs (salaries, interest, maintenance) and creates no asset; capital expenditure creates assets (roads, schools, power projects) and raises productive capacity, so it directly supports long-term development.'),
  cand('q-eco-free-trade', 'eco-03', 'eco-international-trade', 'Write any two arguments in favour of free trade, or why developing countries are not always benefited from free trade.', 5, 'B', 'explanation', 'standard', 'Free trade advantages: wider market and specialisation, economies of scale, lower prices, transfer of technology. Arguments against for developing countries: infant-industry argument, adverse terms of trade, unequal bargaining power, dependence on primary exports.'),
  cand('q-eco-poverty', 'eco-04', 'eco-poverty', 'Evaluate the government efforts made for the reduction of poverty in Nepal.', 5, 'B', 'long-answer', 'standard', 'Poverty = inability to fulfil basic needs. Causes: low productivity, unemployment, unequal land distribution, illiteracy. Government efforts: poverty alleviation programmes, rural employment, micro-credit, social security allowance, targeted programmes for Dalit/Madhesi/women.'),
  cand('q-eco-hdi', 'eco-04', 'eco-hdi', 'What is the Human Development Index? Mention the importance of human resources in economic development.', 1, 'A', 'definition', 'core', 'HDI is a composite index of life expectancy, education (mean and expected years of schooling) and GNI per capita, ranked 0–1. Human resources matter because productive, healthy and educated people raise output and innovation.'),
  cand('q-eco-unemployment', 'eco-04', 'eco-unemployment', 'Explain the situation and causes of unemployment in Nepal.', 5, 'B', 'long-answer', 'standard', 'Types: seasonal, disguised, frictional, structural. Causes in Nepal: subsistence agriculture, low capital formation, population growth, lack of skill-based industry, education–job mismatch, out-migration of skilled labour.'),
  cand('q-eco-foreign-trade', 'eco-05', 'eco-foreign-trade-nepal', 'Examine the direction and problems of Nepalese foreign trade, or evaluate the causes of the increasing trade deficit.', 8, 'C', 'long-answer', 'core', 'Direction: trade is concentrated with India and a few partners; exports primary/agro and carpet products, imports fuels, vehicles, machinery and consumer goods. Problems: narrow export base, low value addition, infrastructural bottlenecks, trade openness with India, smuggling, quality issues. Trade deficit widens because import growth outruns export growth.'),
  cand('q-eco-foreign-employment', 'eco-05', 'eco-foreign-employment', 'Evaluate the effects of foreign employment on the long-term economic development of Nepal, or the contribution of remittance to the Nepalese economy.', 8, 'C', 'long-answer', 'core', 'Effects: large remittance inflow supports consumption, reserves and poverty reduction, but can cause dutch-disease appreciation, reduce labour supply and encourage unskilled migration. Problems: exploitation, unsafe employment, family separation, loss of productive labour.'),
  cand('q-eco-plan', 'eco-05', 'eco-plan-nepal', 'Explain how a plan is formulated in Nepal, or describe any five priorities of the current plan of Nepal.', 8, 'C', 'long-answer', 'core', 'Formulation: needs assessment → National Planning Commission prepares the plan → periodic plan document → approval and budget allocation → implementation and monitoring. Priorities of recent plans include productive employment, agriculture modernisation, energy and infrastructure, social protection, education and health.'),
  cand('q-eco-sdg', 'eco-05', 'eco-sdg', 'Evaluate any four sustainable development goals relevant to the Nepalese context with examples.', 8, 'C', 'long-answer', 'core', '17 SDGs adopted by the UN in 2015. Nepal-relevant examples: SDG 1 no poverty, SDG 2 zero hunger, SDG 4 quality education, SDG 8 decent work and economic growth, SDG 13 climate action. Identify any goal that is not directly relevant to Nepal as the question asks.'),
  cand('q-eco-wto', 'eco-05', 'eco-trade-orgs', 'What is SAFTA / WTO? Mention any two advantages or member countries.', 1, 'A', 'definition', 'standard', 'WTO = World Trade Organization (1995, successor to GATT) governing global trade rules. SAFTA = South Asian Free Trade Area (2006) among SAARC members to reduce tariffs on intraregional trade.'),
  cand('q-eco-statistics', 'eco-06', 'eco-statistics-basics', 'What is primary data? Why is sampling more economical than census? Write any two importance / limitations of statistics.', 1, 'A', 'definition', 'core', 'Primary data collected firsthand (survey, interview); secondary data already collected. Sampling is cheaper and faster than census when the population is large and heterogeneous. Statistics helps in planning, comparison and decision making but is subject to errors of data and interpretation.'),
  cand('q-eco-central-tendency', 'eco-06', 'eco-mean-median', 'Find the value of X / arithmetic mean from the given data (or find mean from median and mode).', 1, 'A', 'numerical', 'core', 'Mean = Σx / n. If median and mode are given use the empirical relation Mean = (3 × Median − Mode) / 2, and check the relationship requested by the question.'),
  cand('q-eco-dispersion', 'eco-06', 'eco-dispersion', 'Find the range / mean deviation / standard deviation, or the coefficient of variation from the given data.', 1, 'A', 'numerical', 'core', 'Range = maximum − minimum. Mean deviation = Σ|x − mean| / n. SD = √(Σ(x − mean)² / n). Coefficient of variation = (SD / mean) × 100 and is used to compare variability of series with different units or means.'),
  cand('q-eco-index', 'eco-06', 'eco-index', "Find Laspeyre's / Paasche's index number, or interpret a given price index number.", 1, 'A', 'numerical', 'core', "Laspeyre's uses base-year quantities in the denominator (Σp1q0 / Σp0q0 × 100); Paasche's uses current-year quantities (Σp1q1 / Σp0q1 × 100). An index of 150 means prices are 50% higher than the base year."),
];
