import type { EvidenceRecord, PaperRecord, QuestionCandidate, QuestionFamily, QuestionType } from '../../engine/types';

/**
 * ACCOUNTANCY research database.
 * Every EvidenceRecord is traceable to a paper record -> source registry URL.
 * All three board papers below were read page by page from official paper scans:
 * 22/22 questions extracted verbatim per paper. No terminal/pre-board paper for
 * Grade-12 Accountancy was found in this research, so none is claimed.
 * marks = 0 means "mark value not readable from the source" (never guessed).
 */

export const ACCOUNTANCY_PAPERS: PaperRecord[] = [
  { id: 'p-acc-2081', subject: 'accountancy', label: 'NEB Board 2081 (2024) — Accounting, Sub.Code 1041 B', examType: 'neb-board', bsYear: 2081, adYear: 2024, sourceId: 'acc-paper-2081', extraction: 'verbatim' },
  { id: 'p-acc-2082', subject: 'accountancy', label: 'NEB Board 2082 (2025) — Accounting, Sub.Code 1041 K', examType: 'neb-board', bsYear: 2082, adYear: 2025, sourceId: 'acc-paper-2082', extraction: 'verbatim' },
  { id: 'p-acc-2083', subject: 'accountancy', label: 'NEB Board 2083 (2026) — Accounting, Sub.Code 1041 C', examType: 'neb-board', bsYear: 2083, adYear: 2026, sourceId: 'acc-paper-2083', extraction: 'verbatim' },
  { id: 'p-acc-2078m', subject: 'accountancy', label: 'NEB Model Question 2078 — Accountancy Acc.104 (header verified, body not transcribed)', examType: 'neb-model', bsYear: 2078, adYear: 2022, sourceId: 'acc-model-2078', extraction: 'concept' },
];

const fam = (id: string, chapterId: string, concept: string, aliases: string[] = []): QuestionFamily => ({
  id, subject: 'accountancy', chapterId, concept, aliases,
});

export const ACCOUNTANCY_FAMILIES: QuestionFamily[] = [
  fam('acc-company-concept', 'acc-01', 'Company: meaning, features and types (private, public, statutory)', ['What is statutory company?', 'Write any two features of Public Company', 'Write the meaning of company.']),
  fam('acc-share-capital', 'acc-02', 'Share capital and kinds of shares (authorised, paid-up, preference share types)', ['Define authorized capital.', 'Define paid up capital.', 'Mention any two types of preference shares.']),
  fam('acc-share-issue-journal', 'acc-02', 'Issue of shares: application, allotment and call entries with over-subscription / pro-rata allotment', ['Entries for Application, Allotment and First and Final call', 'Journal entries for share allotment, first and final call', 'A company issued 6,000 shares of Rs.100 each payable as follows...']),
  fam('acc-share-asset-issue', 'acc-02', 'Issue of shares for purchase of assets', ['Journal entries for assets purchased by issuing shares', 'सम्पत्ति खरिद तथा शेयर निष्कासन बीचहरू']),
  fam('acc-share-forfeiture', 'acc-02', 'Forfeiture and re-issue of shares', ['Share forfeiture journal entry', 'शेयरको जफ्त']),
  fam('acc-debenture-issue', 'acc-03', 'Issue and redemption of debentures at par/premium/discount', ['Entries for issue and redemption of debentures', 'Entries for issued and redemption of Debentures']),
  fam('acc-fixed-assets', 'acc-04', 'Fixed assets: definition and items', ['Define fixed assets.', 'List any two items of fixed assets.', 'Write any two items of assets.']),
  fam('acc-financial-accounting-limits', 'acc-04', 'Limitations of financial accounting', ['State any two limitations of financial accounting.']),
  fam('acc-adjustment-entries', 'acc-04', 'Adjustment entries (prepaid/outstanding items, provision for tax, proposed dividend)', ['Prepare adjustment entry of Rs. 20,000 for proposed dividend.', 'Prepare adjustment entry of provision for tax of Rs. 1,00,000.']),
  fam('acc-trading-pl', 'acc-04', 'Trading account and profit & loss account from ledger balances', ['Trading Account and P&L Account', 'व्यापार हिसाब खाता र नाफा नोक्सान खाता']),
  fam('acc-pl-appropriation', 'acc-04', 'Profit & loss account and profit & loss appropriation account', ['P&L account and P&L appropriation account', 'नाफा नोक्सान खाता र नाफा नोक्सान बँडफँड खाता']),
  fam('acc-nfrs-statements', 'acc-04', 'Financial statements under NFRS: income statement and statement of financial position (OR multi-step income statement and SOFP)', ['NFRS profit and loss statement and statement of financial position', 'बहुचरण आय विवरण र वित्तीय अवस्थाको विवरण']),
  fam('acc-multi-step-statements', 'acc-04', 'Multi-step income statement and statement of financial position (traditional-format OR alternative printed with the NFRS long question)', ['multi step income statement and statement of financial position']),
  fam('acc-worksheet', 'acc-05', 'Worksheet (12-column work sheet) prepared from a trial balance with adjustments', ['कार्य विवरण (Work sheet)', '१२ महलिये कार्य विवरण (12 column work sheet)']),
  fam('acc-cash-flow', 'acc-06', 'Cash flow statement from balance sheet / trial balance data (direct and indirect methods)', ['Cash flow statement using direct method', 'अप्रत्यक्ष विधिबाट नगद प्रवाह विवरण']),
  fam('acc-cash-flow-basic', 'acc-06', 'Short cash-flow computations for operating or financing activities', ['Cash flow from operating activities under indirect method', 'compute cash flow from financing activities']),
  fam('acc-creditors-cash', 'acc-06', 'Cash paid to creditors from purchase and creditors data', ['calculate cash paid to creditors in second year']),
  fam('acc-cost-concept', 'acc-07', 'Cost accounting: meaning, importance and limitations', ['Write the meaning of cost accounting', 'Write any two importance of Cost Accounting', 'State any two limitations of cost accounting']),
  fam('acc-cost-element-classification', 'acc-07', 'Classification of cost on the basis of elements (direct/indirect material, labour, expenses)', ['Explain the classification of cost on the basis of element', 'What is cost?']),
  fam('acc-material-control', 'acc-08', 'Material control: stores, bin card, material codification and centralised/decentralised purchase', ['What is centralized store?', 'Write the meaning of decentralized store.', 'Define Bin-Card.']),
  fam('acc-inventory-valuation', 'acc-08', 'Inventory valuation and cost of goods sold under FIFO / LIFO / average', ['Value of closing stock and cost of goods sold using First In First Out (FIFO) method', 'LIFO periodic: closing stock value and cost of goods sold']),
  fam('acc-eoq', 'acc-08', 'Economic order quantity and number of orders', ['Find out number of order.', 'Economic Order Quantity (EOQ)']),
  fam('acc-wage-system', 'acc-09', 'Wage systems (time rate, piece rate), time cards and total wage computation', ['Mention any two advantages of time rate wage system.', 'Total wages payable', 'Write about time card.']),
  fam('acc-overhead', 'acc-10', 'Overhead: meaning, classification, allocation, apportionment and absorption', ['Write the meaning of fixed overhead.', 'Classify the overhead on the basis of control.', 'Write the meaning of allocation of overhead.', 'Write the meaning of indirect material.']),
  fam('acc-unit-cost', 'acc-11', 'Cost sheet / historical cost statement and tender price', ['लागत विवरण (Cost Sheet)', 'Cost Sheet showing ... tender price for next lot']),
  fam('acc-cost-reconciliation', 'acc-12', 'Cost reconciliation statement (reconciling cost and financial profit)', ['लागत हिसाब मिलान विवरण (Cost reconciliation statement)']),
  fam('acc-cost-financial-reconciliation', 'acc-12', 'Reconciliation of cost accounts and financial accounts from given differences', ['लागत तथा वित्तीय लेखाको हिसाब मिलान विवरण']),
  fam('acc-computer-system', 'acc-13', 'Computer system in accountancy: elements and importance', ['Explain any five elements of computer system in accounting.', 'Explain any five importance of computer system in accounting.']),
  fam('acc-computerized-benefits', 'acc-14', 'Computerised accounting: software systems and their benefits', ['Write the meaning of software in accounting and explain any three advantages', 'State any two benefits of computerized accounting.']),
  fam('acc-excel', 'acc-14', 'Records maintained in MS Excel (depreciation schedule, loan repayment, payroll)', ['Write about MS Excel.']),
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

export const ACCOUNTANCY_EVIDENCE: EvidenceRecord[] = [
  /* ---------- 2081 board paper (22/22 verbatim) ---------- */
  ev('p-acc-2081', 'acc-company-concept', 'acc-01', 'A1', 1, 'definition', 'What is statutory company?'),
  ev('p-acc-2081', 'acc-share-capital', 'acc-02', 'A2', 1, 'short-answer', 'Mention any two types of preference shares.'),
  ev('p-acc-2081', 'acc-fixed-assets', 'acc-04', 'A3', 1, 'short-answer', 'List any two items of fixed assets.'),
  ev('p-acc-2081', 'acc-financial-accounting-limits', 'acc-04', 'A4', 1, 'short-answer', 'State any two limitations of financial accounting.'),
  ev('p-acc-2081', 'acc-overhead', 'acc-10', 'A5', 1, 'definition', 'Write the meaning of fixed overhead.'),
  ev('p-acc-2081', 'acc-material-control', 'acc-08', 'A6', 1, 'definition', 'What is centralized store?'),
  ev('p-acc-2081', 'acc-wage-system', 'acc-09', 'A7', 1, 'short-answer', 'Mention any two advantages of time rate wage system.'),
  ev('p-acc-2081', 'acc-excel', 'acc-14', 'A8', 1, 'short-answer', 'Write about MS Excel.'),
  ev('p-acc-2081', 'acc-adjustment-entries', 'acc-04', 'A9', 1, 'numerical', 'Prepare the adjustment entry for advance rent of Rs. 5,000 charged to rent expense.'),
  ev('p-acc-2081', 'acc-cash-flow-basic', 'acc-06', 'A10', 1, 'numerical', 'From the following information, compute cash flow from financing activities (share capital 2,00,000 to 4,00,000; debentures 1,00,000 to 50,000; dividend paid nil to 20,000).'),
  ev('p-acc-2081', 'acc-eoq', 'acc-08', 'A11', 1, 'numerical', 'If the number of orders is 6 times and the economic order quantity is 3,000 kg, find the annual requirement.'),
  ev('p-acc-2081', 'acc-share-issue-journal', 'acc-02', 'B12', 5, 'numerical', 'A company issued 5,000 shares of Rs.100 each at 10% discount, payable application Rs.30 / allotment Rs.40 / first and final call Rs.20, with 7,000 applications received and pro-rata allotment. Required: Entries for Application, Allotment and First and Final call [1.5+2+1.5].', FIG),
  ev('p-acc-2081', 'acc-share-asset-issue', 'acc-02', 'B13a', 2, 'numerical', 'A company agreed to purchase assets for Rs. 5,50,000 and paid by issuing Rs.100 shares at 10% premium. Required: Entries for purchase of assets and issue of share [1+1].', FIG),
  ev('p-acc-2081', 'acc-debenture-issue', 'acc-03', 'B13b', 3, 'numerical', '4,000 debentures of Rs.100 each issued at par and redeemed after 5 years at 10% premium. Required: Entries for issue and redemption of debentures [3].'),
  ev('p-acc-2081', 'acc-trading-pl', 'acc-04', 'B14', 5, 'numerical', 'From the given financial transactions (opening stock, purchases, factory expenses, sales, capital and adjustments) prepare: a Trading Account and b Profit and Loss Account [2+3].', FIG),
  ev('p-acc-2081', 'acc-worksheet', 'acc-05', 'B15', 5, 'numerical', 'Trial balance (total 63,500) with additional information (outstanding wages, depreciation on machinery @10%, proposed dividend @10%). Required: Work sheet [5].'),
  ev('p-acc-2081', 'acc-cost-element-classification', 'acc-07', 'B16', 5, 'explanation', 'What is cost? Explain the classification of cost on the basis of element [2+3].'),
  ev('p-acc-2081', 'acc-material-control', 'acc-08', 'B17a', 2, 'definition', 'What is material codification? [2]'),
  ev('p-acc-2081', 'acc-inventory-valuation', 'acc-08', 'B17b', 3, 'numerical', 'Inventories: Chaitra 1 opening 650 @ 8; Chaitra 6 purchase 500 @ 9; Chaitra 15 purchase 800 @ 10; physical count 550 (periodic system). Required: Cost of goods sold and cost of closing stock using FIFO [3].'),
  ev('p-acc-2081', 'acc-wage-system', 'acc-09', 'B18a', 2, 'numerical', 'Hourly production 4 units, hourly wage rate Rs.200, total production 800 units. Required: Total wages payable [2].'),
  ev('p-acc-2081', 'acc-cost-financial-reconciliation', 'acc-12', 'B18b', 3, 'numerical', 'Reconciliation table (depreciation, closing stock, dividend received, profit as per cost account). Required: Reconciliation of cost and financial accounts [3].', FIG),
  ev('p-acc-2081', 'acc-computerized-benefits', 'acc-14', 'B19', 5, 'explanation', 'Write the meaning of software in accounting. Explain any three advantages of software systems [2+3].'),
  ev('p-acc-2081', 'acc-nfrs-statements', 'acc-04', 'C20', 8, 'long-answer', "Udhyog Company's trial balance as on 31 Asar with adjustments (closing stock, prepaid insurance expired, depreciation 10%, provision for tax 30%). Required [4+4]: a) NFRS profit and loss statement b) statement of financial position OR a) multi-step income statement b) statement of financial position.", FIG),
  ev('p-acc-2081', 'acc-cash-flow', 'acc-06', 'C21', 8, 'long-answer', "Udhyog Company's two-year balance sheet with additional information (sales, COGS, operating expense, investment purchase, tax paid, equipment sold/purchased, dividend paid). Required: Cash flow statement using direct method [4+1.5+1.5+1].", FIG),
  ev('p-acc-2081', 'acc-unit-cost', 'acc-11', 'C22', 8, 'long-answer', 'Food industry data (direct materials, direct wages, factory and office overhead, next lot data, profit 20% on cost). Required [4+4]: a) Cost Sheet of previous year b) Tender price for next lot.', FIG),

  /* OR alternative printed inside the same long question (slot C20) */
  ev('p-acc-2081', 'acc-multi-step-statements', 'acc-04', 'C20or', 8, 'long-answer', 'Required [4+4]: a) multi-step income statement b) statement of financial position.', 'OR alternative printed inside the same long question (slot C20).'),

  /* ---------- 2082 board paper (22/22 verbatim) ---------- */
  ev('p-acc-2082', 'acc-company-concept', 'acc-01', 'A1', 1, 'short-answer', 'Write any two features of Public Company.'),
  ev('p-acc-2082', 'acc-share-capital', 'acc-02', 'A2', 1, 'definition', 'Define authorized capital.'),
  ev('p-acc-2082', 'acc-fixed-assets', 'acc-04', 'A3', 1, 'short-answer', 'Write any two items of assets.'),
  ev('p-acc-2082', 'acc-cost-concept', 'acc-07', 'A4', 1, 'short-answer', 'Write any two importance of Cost Accounting.'),
  ev('p-acc-2082', 'acc-overhead', 'acc-10', 'A5', 1, 'identification', 'Classify the overhead on the basis of control.'),
  ev('p-acc-2082', 'acc-material-control', 'acc-08', 'A6', 1, 'definition', 'Write the meaning of decentralized store.'),
  ev('p-acc-2082', 'acc-wage-system', 'acc-09', 'A7', 1, 'short-answer', 'Write about time card.'),
  ev('p-acc-2082', 'acc-computer-system', 'acc-13', 'A8', 1, 'short-answer', 'State any two elements of computer system in accounting.'),
  ev('p-acc-2082', 'acc-adjustment-entries', 'acc-04', 'A9', 1, 'numerical', 'Prepare adjustment entry of provision for tax of Rs. 1,00,000.'),
  ev('p-acc-2082', 'acc-creditors-cash', 'acc-06', 'A10', 1, 'numerical', 'From the following information, calculate cash paid to creditors in second year: total purchase Rs. 12,00,000; sundry creditors Rs. 80,000 (year one) and Rs. 1,20,000 (year two).'),
  ev('p-acc-2082', 'acc-eoq', 'acc-08', 'A11', 1, 'numerical', 'Annual requirement is 18,000 kg and Economic Order Quantity is 3,000 kg. Find out number of order.'),
  ev('p-acc-2082', 'acc-share-issue-journal', 'acc-02', 'B12', 5, 'numerical', 'A company issued 6,000 shares of Rs.100 each payable on application Rs.30, allotment Rs.45, first and final call Rs.25; 9,000 applications received; 3,000 full, 4,000 pro-rata, 2,000 refunded; final call money on 500 shares not received. Required [2+1.5+1.5]: a) Share application b) Share allotment c) First and final call.', FIG),
  ev('p-acc-2082', 'acc-share-asset-issue', 'acc-02', 'B13a', 2, 'numerical', 'Shares of Rs.100 each issued at 10% discount to purchase Plant and machinery 6,00,000, Furniture 2,00,000, Inventory 1,00,000. Required: Journal entries for assets purchased by issuing shares [1+1].'),
  ev('p-acc-2082', 'acc-debenture-issue', 'acc-03', 'B13b', 3, 'numerical', 'C Company issued 500, 10% Debentures of Rs.1,000 each at 5% premium, redeemable at 10% discount after 5 years. Required: Entries for issue and redemption of Debentures [1+1+1].'),
  ev('p-acc-2082', 'acc-trading-pl', 'acc-04', 'B14', 5, 'numerical', 'Closing ledger balances with adjustments (closing stock 50,000, income tax provision 25%, outstanding rent 3,000). Required [2+3]: a) Trading Account b) P&L Account.', FIG),
  ev('p-acc-2082', 'acc-worksheet', 'acc-05', 'B15', 5, 'numerical', 'Trial balance (total 8,70,000) with adjustments (prepaid rent expired 12,000, depreciation on machinery @10%). Required: Work sheet (prepare the format yourself) [5].'),
  ev('p-acc-2082', 'acc-cost-concept', 'acc-07', 'B16', 5, 'explanation', 'Write the meaning of cost accounting and explain any three of its limitations [2+3].'),
  ev('p-acc-2082', 'acc-material-control', 'acc-08', 'B17a', 2, 'explanation', 'Explain any two advantages of centralized purchase [2].'),
  ev('p-acc-2082', 'acc-inventory-valuation', 'acc-08', 'B17b', 3, 'numerical', 'Magh 1 opening 500 units @ Rs.20; Magh 7 purchase 600 @ Rs.22; Magh 15 purchase 800 @ Rs.23; Magh 25 sold 1,500 units. Required [1+2]: Value of closing stock and cost of goods sold using FIFO under periodic inventory system.'),
  ev('p-acc-2082', 'acc-wage-system', 'acc-09', 'B18a', 2, 'numerical', 'A worker produces 400 units in a week; normal production per hour 10 units; wage rate per hour Rs.50. Required: Earning of the worker in a week [2].'),
  ev('p-acc-2082', 'acc-cost-reconciliation', 'acc-12', 'B18b', 3, 'numerical', 'Net profit as per cost account Rs.25,000; factory overhead over recorded 10,000; over valuation of opening stock 5,000; depreciation under recorded 3,000. Required: Cost reconciliation statement [3].'),
  ev('p-acc-2082', 'acc-computer-system', 'acc-13', 'B19', 5, 'explanation', 'Explain any five importance of computer system in accounting [5].'),
  ev('p-acc-2082', 'acc-nfrs-statements', 'acc-04', 'C20', 8, 'long-answer', 'Trial balance as on 31st Asar 2081 (total 13,75,000) with adjustments (closing stock, depreciation 10%, provision for bad debts 5%, outstanding salary). Required [4+4]: a) NFRS P&L b) NFRS statement of financial position OR a) multi-step income statement b) statement of financial position.', FIG),
  ev('p-acc-2082', 'acc-cash-flow', 'acc-06', 'C21', 8, 'long-answer', 'Balance sheets for 2080 and 2081 with income statement (sales, COGS, expenses, net profit, dividend) and additional information (plant sold at book value, new plant purchased). Required: Cash flow statement using indirect method [4+2+1+1].', FIG),
  ev('p-acc-2082', 'acc-unit-cost', 'acc-11', 'C22', 8, 'long-answer', 'Factory data (material purchase, carriage, direct wages, chargeable expenses, indirect material, factory rent, depreciation of factory machinery/office furniture/delivery van, stock of goods opening and closing, profit 20% on cost). Required: Cost Sheet [8].', FIG),

  /* OR alternative printed inside the same long question (slot C20) */
  ev('p-acc-2082', 'acc-multi-step-statements', 'acc-04', 'C20or', 8, 'long-answer', 'Required [4+4]: a) multi-step income statement b) statement of financial position.', 'OR alternative printed inside the same long question (slot C20).'),

  /* ---------- 2083 board paper (22/22 verbatim) ---------- */
  ev('p-acc-2083', 'acc-company-concept', 'acc-01', 'A1', 1, 'definition', 'Write the meaning of company.'),
  ev('p-acc-2083', 'acc-share-capital', 'acc-02', 'A2', 1, 'definition', 'Define paid up capital.'),
  ev('p-acc-2083', 'acc-fixed-assets', 'acc-04', 'A3', 1, 'definition', 'Define fixed assets.'),
  ev('p-acc-2083', 'acc-cost-concept', 'acc-07', 'A4', 1, 'short-answer', 'State any two limitations of cost accounting.'),
  ev('p-acc-2083', 'acc-overhead', 'acc-10', 'A5', 1, 'definition', 'Write the meaning of allocation of overhead.'),
  ev('p-acc-2083', 'acc-overhead', 'acc-10', 'A6', 1, 'definition', 'Write the meaning of indirect material.'),
  ev('p-acc-2083', 'acc-material-control', 'acc-08', 'A7', 1, 'definition', 'Define Bin-Card.'),
  ev('p-acc-2083', 'acc-computerized-benefits', 'acc-14', 'A8', 1, 'short-answer', 'State any two benefits of computerized accounting.'),
  ev('p-acc-2083', 'acc-adjustment-entries', 'acc-04', 'A9', 1, 'numerical', 'Prepare adjustment entry of Rs. 20,000 for proposed dividend.'),
  ev('p-acc-2083', 'acc-cash-flow-basic', 'acc-06', 'A10', 1, 'numerical', 'Net income Rs. 36,000; depreciation Rs. 12,000; decrease in current assets Rs. 10,000. Required: Cash flow from operating activities under indirect method.'),
  ev('p-acc-2083', 'acc-eoq', 'acc-08', 'A11', 1, 'numerical', 'Annual requirement 2,00,000 units; ordering cost per order Rs.100; carrying cost per unit Rs.40. Required: Economic Order Quantity (EOQ).'),
  ev('p-acc-2083', 'acc-share-issue-journal', 'acc-02', 'B12', 5, 'numerical', 'A company issued 10,000 shares of Rs.100 each at 10% premium payable application Rs.20, allotment Rs.50, first and final call Rs.40; 15,000 applications; 3,000 rejected and rest allotted pro-rata; one shareholder holding 500 shares failed to pay the call. Required [2+2+1]: Journal voucher for a) share allotment b) first and final call c) share forfeiture.', FIG),
  ev('p-acc-2083', 'acc-share-forfeiture', 'acc-02', 'B12c', 1, 'numerical', 'Share forfeiture: journal entry for forfeiture of the shares on which call money was not received (part c of the share-issue question) [1].', 'Extracted as a separate concept from the same printed question (B12).'),
  ev('p-acc-2083', 'acc-share-asset-issue', 'acc-02', 'B13a', 2, 'numerical', 'A company issued shares of Rs.100 each to purchase land Rs.7,80,000 and closing stock Rs.40,000 (printed share count differs between the Nepali and English lines). Required: entries for purchase of assets and issue of share [1+1].', 'Printed inconsistency in the source (5,000 shares in Nepali vs 8,000 in English) — quoted as printed, not corrected.'),
  ev('p-acc-2083', 'acc-debenture-issue', 'acc-03', 'B13b', 3, 'numerical', 'X company issued 7,000, 10% debentures of Rs.100 each at 5% premium, redeemable at 10% premium after 5 years. Required: Entries for issue and redemption of Debentures [1+1+1].'),
  ev('p-acc-2083', 'acc-pl-appropriation', 'acc-04', 'B14', 5, 'numerical', 'Closing ledger balances (total 11,36,000) with adjustments (proposed dividend 80,000, depreciation on equipment @10%, accrued income 8,000). Required [4+1]: a) P&L account b) P&L appropriation account.', FIG),
  ev('p-acc-2083', 'acc-worksheet', 'acc-05', 'B15', 5, 'numerical', "ABC Company's trial balance as on Chaitra month-end 2081 (total 6,25,000). Required: 12 column work sheet (prepare the format yourself) [5].", FIG),
  ev('p-acc-2083', 'acc-cost-concept', 'acc-07', 'B16', 5, 'explanation', 'Explain any five advantages of cost accounting [5].'),
  ev('p-acc-2083', 'acc-material-control', 'acc-08', 'B17a', 2, 'comparison', 'Distinguish between centralised and decentralised purchase [1+1].'),
  ev('p-acc-2083', 'acc-inventory-valuation', 'acc-08', 'B17b', 3, 'numerical', 'June 1 opening 1,000 @ 10; June 5 purchase 700 @ 12; June 18 purchase 900 @ 15; June 30 sold 1,800. Required: closing stock value and cost of goods sold using LIFO under periodic system [3].'),
  ev('p-acc-2083', 'acc-wage-system', 'acc-09', 'B18a', 2, 'numerical', 'A worker produced 300 units in a month; standard time 5 hours per unit; wage rate Rs.60 per hour. Required: Total wages for the month [2].'),
  ev('p-acc-2083', 'acc-cost-reconciliation', 'acc-12', 'B18b', 3, 'numerical', 'Net profit as per cost account Rs.3,50,000; bank interest credited in financial record 2,000; work overhead under recorded 10,000; income tax recorded in financial account 80,000. Required: Cost reconciliation statement [3].'),
  ev('p-acc-2083', 'acc-computer-system', 'acc-13', 'B19', 5, 'explanation', 'Explain any five elements of computer system in accounting [5].'),
  ev('p-acc-2083', 'acc-nfrs-statements', 'acc-04', 'C20', 8, 'long-answer', 'Trial balance as on 30th Ashar 2082 (total 12,80,000) with adjustments. Required [4+4]: a) multi-step income statement b) statement of financial position OR a) NFRS profit and loss statement b) NFRS statement of financial position.', FIG),
  ev('p-acc-2083', 'acc-cash-flow', 'acc-06', 'C21', 8, 'long-answer', 'Balance sheets for 2081 and 2082 (totals 6,80,000 / 7,90,000) with income statement and additional information (purchase of fixed assets Rs.1,00,000). Required: Cash flow statement under direct or indirect method [4+1+2+1].', FIG),
  ev('p-acc-2083', 'acc-unit-cost', 'acc-11', 'C22', 8, 'long-answer', 'ABC manufacturing company data (raw material purchase 3,60,000; freight 20,000; productive labour 2,00,000; direct expenses 1,50,000; factory expenses 50% of productive labour; office rent, depreciation, selling overheads; expected profit 15% on cost; opening and closing stocks). Required [8]: Cost Sheet showing cost of raw material consumed, prime cost, factory cost, cost of production, cost of goods sold, cost of sales, profit amount and total sales amount.'),
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
  id, subject: 'accountancy', chapterId, familyId, text, marks, questionType,
  origin: 'syllabus-derived', specSection, conceptual, ...(answerHint ? { answerHint } : {}),
});

export const ACCOUNTANCY_CANDIDATES: QuestionCandidate[] = [
  cand('q-acc-company', 'acc-01', 'acc-company-concept', 'What is statutory company? Write any two features of a public company.', 1, 'A', 'definition', 'core'),
  cand('q-acc-share-capital', 'acc-02', 'acc-share-capital', 'Define paid-up capital and mention any two types of preference shares.', 1, 'A', 'definition', 'core'),
  cand('q-acc-share-issue', 'acc-02', 'acc-share-issue-journal', 'A company issued shares of Rs.100 each payable on application, allotment and first and final call, with over-subscription allotted pro-rata. Pass the journal entries for application, allotment and call.', 5, 'B', 'numerical', 'core', 'Follow the printed figures of the year you are attempting: application/allotment/call amounts, number of shares applied for, pro-rata ratio, and any share whose call money was not received. Entries: bank a/c Dr to share application money; share application to share allotment (on allotment); share allotment and calls to share capital (on call); calls-in-arrears to the defaulting shareholder.'),
  cand('q-acc-share-assets', 'acc-02', 'acc-share-asset-issue', 'A company purchased assets and paid for them by issuing shares. Pass the journal entries for purchase of assets and issue of shares.', 5, 'B', 'numerical', 'standard', 'Assets at agreed value debited, share capital (and securities premium, if issued at premium) credited; any excess of agreed price over asset values goes to capital reserve.'),
  cand('q-acc-share-forfeit', 'acc-02', 'acc-share-forfeiture', 'Pass the journal entry for forfeiture of shares on which the call money was not received.', 5, 'B', 'numerical', 'standard', 'Share forfeiture a/c Dr to share capital (only the amount already called-up on the forfeited shares); re-issue, if any, transfers balance to capital reserve.'),
  cand('q-acc-debenture', 'acc-03', 'acc-debenture-issue', 'Issue 10% debentures at a premium and redeem them after five years. Pass the entries for issue and redemption of debentures.', 5, 'B', 'numerical', 'core', 'Bank a/c Dr to debentures (with securities premium where issued at premium); on redemption: debentures a/c Dr, premium on redemption to bank, with the premium written back against securities premium or as a loss per the printed instruction.'),
  cand('q-acc-fixed-assets', 'acc-04', 'acc-fixed-assets', 'Define fixed assets and list any two items of fixed assets.', 1, 'A', 'definition', 'standard'),
  cand('q-acc-fin-limits', 'acc-04', 'acc-financial-accounting-limits', 'State any two limitations of financial accounting.', 1, 'A', 'short-answer', 'supporting'),
  cand('q-acc-adjustment', 'acc-04', 'acc-adjustment-entries', 'Prepare the adjustment entry for proposed dividend / provision for tax / advance rent.', 1, 'A', 'numerical', 'standard', 'Proposed dividend: profit and loss appropriation a/c Dr to dividend payable. Provision for tax: profit and loss a/c Dr to provision for tax. Advance rent charged as expense: prepaid rent a/c Dr to rent expense.'),
  cand('q-acc-trading-pl', 'acc-04', 'acc-trading-pl', 'From the given ledger balances and adjustments, prepare the Trading Account and the Profit and Loss Account.', 5, 'B', 'numerical', 'core', 'Trading account: opening stock, purchases, direct expenses (carriage inward, wages, factory expenses) against sales, closing stock. P&L: indirect expenses (salaries, rent, stationery, depreciation, bad debts) and incomes (interest, discount received), adjusted for outstanding/prepaid items.'),
  cand('q-acc-pl-app', 'acc-04', 'acc-pl-appropriation', 'Prepare the Profit and Loss Account and the Profit and Loss Appropriation Account from the given balances.', 5, 'B', 'numerical', 'standard', 'P&L ends with net profit; appropriation transfers net profit and adds other incomes/less appropriations (dividend, transfers to reserves) to show how profit is distributed.'),
  cand('q-acc-nfrs', 'acc-04', 'acc-nfrs-statements', 'From the given trial balance and adjustments, prepare (a) the NFRS profit and loss statement and statement of financial position, OR (b) the multi-step income statement and statement of financial position.', 8, 'C', 'long-answer', 'core', 'Adjust the trial balance first (closing stock, prepaid/outstanding items, depreciation, bad debts, provision for tax), then: multi-step income statement = revenue − COGS = gross profit − operating expenses = operating profit − other income/expense = profit before tax − tax = net profit. Statement of financial position lists non-current assets, current assets, equity and liabilities. Use the printed OR whichever is asked.'),
  cand('q-acc-multi-step', 'acc-04', 'acc-multi-step-statements', 'From the given trial balance and adjustments, prepare (a) a multi-step income statement and (b) a statement of financial position (the traditional-format OR alternative printed with the NFRS long question).', 8, 'C', 'long-answer', 'standard', 'Adjust the trial balance first, then: multi-step income statement = revenue − COGS = gross profit − operating expenses = operating profit ± other income/expense = profit before tax − tax = net profit; statement of financial position lists non-current assets, current assets, then equity and liabilities. This is the traditional-format option printed as the OR inside the NFRS question.'),
  cand('q-acc-worksheet', 'acc-05', 'acc-worksheet', 'Prepare a 12-column work sheet from the given trial balance and adjustments.', 5, 'B', 'numerical', 'core', 'Columns: trial balance Dr/Cr, adjustments Dr/Cr, adjusted trial balance Dr/Cr, income statement Dr/Cr, balance sheet Dr/Cr. Every adjustment is posted twice (debit and credit); the two pairs of column totals must each balance.'),
  cand('q-acc-cash-flow', 'acc-06', 'acc-cash-flow', 'Prepare the cash flow statement (direct or indirect method) from the given balance sheets and additional information.', 8, 'C', 'long-answer', 'core', 'Indirect method: start from net profit, adjust for non-cash items (depreciation, loss on sale), working-capital changes, then add/subtract investing and financing effects (asset purchase/sale, investment, dividend, tax, loan/debenture movement). Direct method lists cash receipts and cash payments by category. Reconcile the opening and closing cash/bank balance.'),
  cand('q-acc-cash-flow-short', 'acc-06', 'acc-cash-flow-basic', 'From the given information, compute cash flow from operating or financing activities (indirect method).', 1, 'A', 'numerical', 'standard', 'Operating: net income + depreciation − increase in current assets + increase in current liabilities (or the changes as printed). Financing: closing − opening of capital/debenture accounts, less dividend paid.'),
  cand('q-acc-creditors', 'acc-06', 'acc-creditors-cash', 'From total purchase and opening/closing sundry creditors, calculate the cash paid to creditors in the second year.', 1, 'A', 'numerical', 'supporting', 'Cash paid = purchases + opening creditors − closing creditors (adjust for any cash purchase given in the printed data).'),
  cand('q-acc-cost-concept', 'acc-07', 'acc-cost-concept', 'Write the meaning of cost accounting and explain its importance / limitations.', 5, 'B', 'explanation', 'core', 'Meaning: recording, classifying and analysing costs to control them. Importance: cost control and fixation, better planning, price fixation, elimination of waste. Limitations: requires costly installation, duplication with financial accounts, based on estimates, not useful for very small units.'),
  cand('q-acc-cost-importance', 'acc-07', 'acc-cost-concept', 'Mention any two importance of cost accounting (or any two limitations).', 1, 'A', 'short-answer', 'standard', 'Importance: cost control and cost fixation, better planning and price fixation, elimination of waste. Limitations: costly installation, duplication with financial accounts, based on estimates.'),
  cand('q-acc-cost-classification', 'acc-07', 'acc-cost-element-classification', 'What is cost? Explain the classification of cost on the basis of element.', 5, 'B', 'explanation', 'standard', 'By element: direct material, direct labour (direct wages) and direct expenses = prime cost; indirect material, indirect labour and indirect expenses = factory/overhead cost. Give one example for each.'),
  cand('q-acc-material', 'acc-08', 'acc-material-control', 'Explain material control, bin card and centralised vs decentralised purchase.', 5, 'B', 'explanation', 'core', 'Material control = the system that ensures right quantity of material at right time with minimum investment. Bin card: store record card showing quantity received, issued and balance. Centralised purchase advantages: bulk discount, fewer staff, standardisation; decentralised: local knowledge, speed, less transport.'),
  cand('q-acc-inventory', 'acc-08', 'acc-inventory-valuation', 'From the given inventory transactions, value closing stock and cost of goods sold using FIFO / LIFO (periodic system).', 5, 'B', 'numerical', 'core', 'FIFO: earliest purchases are issued first, so closing stock is valued at the latest prices. LIFO (periodic): latest purchases are in closing stock first. COGS = opening stock + purchases − closing stock. Check whether the printed data is periodic or perpetual.'),
  cand('q-acc-eoq', 'acc-08', 'acc-eoq', 'Find EOQ / number of orders / annual requirement from the given ordering cost, carrying cost and demand.', 1, 'A', 'numerical', 'standard', 'EOQ = √(2 × annual demand × ordering cost per order ÷ carrying cost per unit). Number of orders = annual demand ÷ EOQ. Annual requirement = number of orders × EOQ.'),
  cand('q-acc-wages', 'acc-09', 'acc-wage-system', 'Compute total wages under time rate / piece rate, or explain the time rate wage system and time cards.', 5, 'B', 'numerical', 'core', 'Time rate = hours worked × rate per hour. Piece rate = units produced × rate per unit. Check for normal time, overtime premium or bonus conditions in the printed data; time card records attendance hours used for time-rate payment.'),
  cand('q-acc-overhead', 'acc-10', 'acc-overhead', 'Explain overhead: classification, allocation, apportionment and absorption; or classify overhead on the basis of control.', 5, 'B', 'explanation', 'standard', 'Overhead = indirect cost. Classification: by element (material/labour/expense), by function (factory, office, selling), by behaviour (fixed, variable, semi-variable) and by control (controllable/uncontrollable). Allocation = charging overhead to a cost centre directly attributable; apportionment = dividing on a suitable basis (area, labour cost, machine hours).'),
  cand('q-acc-cost-sheet', 'acc-11', 'acc-unit-cost', 'Prepare the cost sheet showing prime cost, factory cost, cost of production, cost of goods sold and cost of sales; or find the tender price for the next lot.', 8, 'C', 'long-answer', 'core', 'Order: raw material consumed → + direct labour and direct expenses = prime cost → + factory overhead = factory cost → + office/administrative overhead = cost of production → + opening − closing finished stock = cost of goods sold → + selling & distribution overhead = cost of sales. Tender price = cost of sales + profit (percent as printed, often "on cost" — convert to "on sales" carefully).'),
  cand('q-acc-cost-recon', 'acc-12', 'acc-cost-reconciliation', 'Prepare the cost reconciliation statement from the given profit figures and reconciling items.', 5, 'B', 'numerical', 'standard', 'Net profit as per cost account ± items recorded only in financial accounts (bank interest, bad debts, discount, rent, depreciation differences) = net profit as per financial account. Show each item as a separate line; make both sides agree.'),
  cand('q-acc-cost-fin-recon', 'acc-12', 'acc-cost-financial-reconciliation', 'Reconcile cost accounts and financial accounts from the given differences (depreciation, closing stock, dividend, profit per cost account).', 5, 'B', 'numerical', 'standard', 'Start from profit as per one record, add/subtract each printed difference in the direction shown by which record contains it, and arrive at the profit per the other record.'),
  cand('q-acc-computer', 'acc-13', 'acc-computer-system', 'Explain the elements / importance of a computer system in accounting.', 5, 'B', 'explanation', 'standard', 'Elements: input (source documents such as vouchers, purchase orders, barcodes), processing (journals, ledgers, reports), output (statements) and storage (data files/backup). Importance: speed, accuracy, storage, simultaneous access, reports.'),
  cand('q-acc-computer-elements', 'acc-13', 'acc-computer-system', 'State any two elements of a computer system in accounting.', 1, 'A', 'short-answer', 'standard', 'Input, processing, output and storage — name any two with a line of explanation each (source documents enter as input, journals/ledgers are processed, statements are the output).'),
  cand('q-acc-software', 'acc-14', 'acc-computerized-benefits', 'Write the meaning of accounting software and explain its advantages / benefits of computerised accounting.', 5, 'B', 'explanation', 'standard', 'Software modules for a small project: company creation, ledger master, journal, ledger, trial balance, income statement, balance sheet and reconciliation. Advantages: speed, accuracy, no arithmetic errors, easy consolidation, statutory reports.'),
  cand('q-acc-excel', 'acc-14', 'acc-excel', 'Write about MS Excel as used in accountancy.', 1, 'A', 'short-answer', 'supporting', 'Excel is used for fixed-asset depreciation schedules, loan repayment schedules and payroll sheets — spreadsheets with formulas, tables and charts.'),
];
