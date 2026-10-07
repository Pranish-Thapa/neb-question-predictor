import type { SyllabusSubject } from '../../engine/types';
import { buildSubject, type SubjectLiteral } from './build';

/**
 * Grade 12 Accountancy (लेखाविधि / "Accounting") syllabus — CDC, माध्यमिक शिक्षा पाठ्यक्रम २०७६,
 * subject code Acc. 104 (Class 12 only; Class 11 is Acc. 103 and is NOT included here).
 * Topic text reproduced from the CDC curriculum PDF read in research (source `acc-curriculum-cdc`,
 * mirror of the CDC publication) and the official Grade-12 specification grid (`acc-spec-grid-cdc`,
 * Acc.104 pages 13–16). 4 units / 14 chapters, 120 theory hours + 40 project hours.
 * Unit hours and marks below come from the official specification grid.
 */
const ACCOUNTANCY_LITERAL: SubjectLiteral = {
  id: 'accountancy',
  name: 'Accountancy',
  shortName: 'Accountancy',
  subjectCode: '1041',
  gradeLabel: 'Grade XII (Class 12)',
  prefix: 'acc',
  areas: ['Company Accountancy', 'Corporate Financial Statements', 'Cost Accountancy', 'Computerised Accounting'],
  sourceIds: ['acc-curriculum-cdc', 'acc-spec-grid-cdc', 'cdc-elibrary'],
  sourceNote:
    'Official CDC Grade-12 syllabus (Acc. 104): 4 units, 14 chapters, 120 theory hours + 40 project hours. ' +
    'Per-unit hours/marks (19/12, 50/29, 41/28, 10/6) are read from the official Grade-12 specification grid. ' +
    'Chapter-level teachingHours reproduce the curriculum cells as printed: they sum to 118 while both official ' +
    'documents print a 120-hour total (known 2-hour cell-vs-total gap, documented, not corrected by guess). ' +
    'Class-11 content (Acc. 103: fundamentals of accounting, double entry, proprietor final accounts, depreciation, ' +
    'bills, non-profit, government accounting) is deliberately excluded.',
  chapters: [
    {
      n: 1, area: 'Company Accountancy', name: 'Corporate concept', hours: 6, core: [1, 3],
      topics: [
        ['Company: meaning, private vs public company', ['meaning and features', 'private and public company: differences']],
        ['Documents of a company', ['memorandum of association', 'articles of association', 'prospectus']],
        ['Financial sources of a company', ['share capital', 'debentures', 'reserves and loans']],
      ],
    },
    {
      n: 2, area: 'Company Accountancy', name: 'Share accountancy', hours: 7, core: [3, 4],
      topics: [
        ['Share capital', ['authorised, issued, subscribed, called-up and paid-up capital']],
        ['Shares: kinds', ['ordinary shares', 'preference shares and their types (cumulative, redeemable, convertible, participatory)']],
        ['Issue of shares', ['issue at par, premium and discount', 'lump-sum and instalment methods', 'oversubscription: minimum–maximum and pro-rata allotment', 'issue for cash']],
        ['Accounting for share issue', ['application, allotment and call entries', 'share forfeiture and re-issue', 'issue of shares for purchase of assets', 'bonus and secret (pro-rata) issue']],
      ],
    },
    {
      n: 3, area: 'Company Accountancy', name: 'Debenture accountancy', hours: 5, core: [1, 3],
      topics: [
        ['Debentures: meaning and types', ['registered, secured/unsecured, redeemable debentures', 'debenture vs share']],
        ['Issue of debentures', ['at par, premium and discount', 'lump-sum and instalment issue']],
        ['Redemption of debentures', ['redemption at par/premium/discount', 'conversion into shares']],
      ],
    },
    {
      n: 4, area: 'Corporate Financial Statements', name: 'Corporate financial statements', hours: 24, core: [3, 4],
      topics: [
        ['Meaning and importance of financial statements', ['users of financial statements']],
        ['Traditional statements', ['trading account', 'profit and loss account', 'profit and loss appropriation account', 'balance sheet']],
        ['Modern statements (NAS / NFRS)', ['income statement', 'statement of changes in equity', 'statement of financial position', 'adjusted and unadjusted trial balance']],
        ['Adjustment entries and preparation', ['closing stock, outstanding and prepaid items', 'depreciation and bad debts', 'provision for tax and proposed dividend']],
      ],
    },
    {
      n: 5, area: 'Corporate Financial Statements', name: 'Worksheet', hours: 7, core: [2],
      topics: [
        ['Worksheet: introduction and need', ['meaning and importance of the worksheet']],
        ['Preparation of the worksheet', ['12-column worksheet from trial balance', 'adjustment columns and financial statement columns']],
      ],
    },
    {
      n: 6, area: 'Corporate Financial Statements', name: 'Cash flow statement', hours: 18, core: [2],
      topics: [
        ['Cash flow statement: meaning and importance', ['cash and cash equivalents', 'operating, investing and financing activities']],
        ['Preparation', ['from worksheet / adjusted trial balance', 'direct and indirect methods', 'comparative balance sheet method']],
      ],
    },
    {
      n: 7, area: 'Cost Accountancy', name: 'Concept of cost accounting', hours: 4, core: [2, 3],
      topics: [
        ['Cost accounting: purpose, importance and limitations', ['relationship with financial accounting']],
        ['Methods of costing', ['job, contract, process, service, unit/multiple and operating costing']],
        ['Classification of cost', ['by nature/process/function/behaviour/control']],
      ],
    },
    {
      n: 8, area: 'Cost Accountancy', name: 'Material and material control', hours: 10, core: [3, 4],
      topics: [
        ['Purchasing procedure', ['purchase department: centralised and decentralised']],
        ['Stores and stores records', ['stores ledger and bin card']],
        ['Issue pricing methods', ['FIFO', 'LIFO', 'simple and weighted average', 'standard price']],
        ['Inventory levels', ['re-order level and re-order quantity', 'minimum, maximum and average level', 'economic order quantity (EOQ): formula and determinants']],
      ],
    },
    {
      n: 9, area: 'Cost Accountancy', name: 'Labour accountancy', hours: 4, core: [2, 3],
      topics: [
        ['Labour cost control', ['time and job cards', 'biometric and other attendance records']],
        ['Wage systems', ['time rate and piece rate', 'premium and incentive plans']],
        ['Total wage determination', ['earnings under time and piece rate systems']],
      ],
    },
    {
      n: 10, area: 'Cost Accountancy', name: 'Overhead', hours: 2, core: [1, 2],
      topics: [
        ['Classification of overhead', ['by element, function, behaviour and control']],
        ['Allocation and apportionment of overhead', ['absorption of overhead', 'under-absorption and over-absorption']],
      ],
    },
    {
      n: 11, area: 'Cost Accountancy', name: 'Unit / production cost determination', hours: 16, core: [1, 3],
      topics: [
        ['Elements of cost', ['prime cost, factory cost, cost of production, cost of goods sold, cost of sales']],
        ['Historical cost statement', ['cost sheet preparation']],
        ['Tender / estimate cost', ['tender price from cost data', 'profit loading']],
      ],
    },
    {
      n: 12, area: 'Cost Accountancy', name: 'Cost reconciliation statement', hours: 5, core: [2],
      topics: [
        ['Cost reconciliation: meaning and need', ['differences between cost and financial profit']],
        ['Preparation of reconciliation statement', ['reconciling cost account and financial account profits']],
      ],
    },
    {
      n: 13, area: 'Computerised Accounting', name: 'Computer use in accountancy', hours: 6, core: [1, 3],
      topics: [
        ['Computer system: meaning, elements, importance and limitations', ['input, process, output and storage']],
        ['Data collection and processing', ['source documents: voucher, purchase order, copy, barcode', 'information analysis', 'journals, ledgers and reports']],
        ['Records in Excel', ['fixed asset depreciation schedule', 'loan repayment schedule', 'payroll sheet']],
      ],
    },
    {
      n: 14, area: 'Computerised Accounting', name: 'Software systems in accountancy', hours: 4, core: [1],
      topics: [
        ['Accounting software systems', ['language and processor', 'company creation and ledger master']],
        ['Software modules for a small project', ['journal, ledger and trial balance', 'income statement, balance sheet and reconciliation']],
      ],
    },
  ],
};

export const ACCOUNTANCY: SyllabusSubject = buildSubject(ACCOUNTANCY_LITERAL);
