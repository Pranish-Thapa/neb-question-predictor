import type { EvidenceRecord, PaperRecord, QuestionCandidate, QuestionFamily } from '../../engine/types';

/**
 * COMPUTER SCIENCE research database (subject code 4281).
 * Honesty rules are the same as physics/chemistry:
 *  - `extraction: 'verbatim'` = wording read directly from the source page.
 *  - `extraction: 'concept'`  = only topic-level analysis was readable (no verbatim wording claimed).
 *  - marks = 0 means "mark value not readable from the source" (never guessed).
 * The 2081 board, 2082 board and 2083 board sources are question-by-question *analyses*,
 * not full paper text, so their evidence is recorded at topic level with marks = 0.
 * Only the 2081 model question exposes group-level (A/B/C) structure, so those records
 * carry the group marks from the verified spec grid (1 / 5 / 8).
 */

export const CS_PAPERS: PaperRecord[] = [
  { id: 'p-cs-2081', subject: 'cs', label: 'NEB Board 2081 (2024) — code 4281 analysis', examType: 'neb-board', bsYear: 2081, adYear: 2024, sourceId: 'paper-cs-2081', extraction: 'concept' },
  { id: 'p-cs-2082', subject: 'cs', label: 'NEB Board 2082 (2025) — code 4281 tested-topic list', examType: 'neb-board', bsYear: 2082, adYear: 2025, sourceId: 'paper-cs-2082', extraction: 'concept' },
  { id: 'p-cs-2083', subject: 'cs', label: 'NEB Board 2083 (2026) Set C — code 4281 analysis', examType: 'neb-board', bsYear: 2083, adYear: 2026, sourceId: 'paper-cs-2083', extraction: 'concept' },
  { id: 'p-cs-2081m', subject: 'cs', label: 'NEB Model Question 2081/82 — code 4281 (group topics)', examType: 'neb-model', bsYear: 2081, adYear: 2025, sourceId: 'model-cs-2081', extraction: 'concept' },
  { id: 'p-cs-2081supp', subject: 'cs', label: 'NEB Board 2081 Supplementary (code 4281) — structure copy only', examType: 'neb-board', bsYear: 2081, adYear: 2024, sourceId: 'paper-cs-2081supp', extraction: 'concept' },
];

const fam = (id: string, chapterId: string, concept: string, aliases: string[] = []): QuestionFamily => ({
  id, subject: 'cs', chapterId, concept, aliases,
});

export const CS_FAMILIES: QuestionFamily[] = [
  /* Unit 1 — Database Management System */
  fam('cs-dbms-basics', 'csc-01', 'DBMS concepts: data, information, database, advantages over file systems', ['Define DBMS', 'Advantages of DBMS over file system']),
  fam('cs-db-models', 'csc-01', 'Database models (hierarchical, network, relational) and the ER model / ER diagrams', ['Compare database models', 'Draw an ER diagram']),
  fam('cs-keys', 'csc-01', 'Relational keys: primary key, foreign key, candidate key, domain, tuple', ['Define primary key', 'Difference between primary and foreign key']),
  fam('cs-sql', 'csc-01', 'SQL: DDL and DML statements and query writing (WHERE, ORDER BY, GROUP BY, HAVING)', ['Write an SQL query', 'What is the difference between DDL and DML?']),
  fam('cs-normalization', 'csc-01', 'Functional dependency and normalization to 1NF, 2NF and 3NF', ['Explain 1NF 2NF 3NF', 'What is functional dependency?']),
  fam('cs-db-security', 'csc-01', 'Database security and integrity constraints', ['Types of integrity constraints', 'How is a database secured?']),
  /* Unit 2 — Data Communication and Networking */
  fam('cs-communication-components', 'csc-02', 'Components of data communication: sender, receiver, medium, message, protocol', ['List components of data communication']),
  fam('cs-transmission-media', 'csc-02', 'Guided and unguided transmission media (twisted pair, coaxial, fibre, radio, microwave, Wi-Fi)', ['Compare guided and unguided media', 'Why is fibre optic better?']),
  fam('cs-transmission-impairments', 'csc-02', 'Transmission impairments: noise, crosstalk, distortion, jitter, echo, bandwidth', ['Define crosstalk', 'Difference between noise and distortion']),
  fam('cs-topologies', 'csc-02', 'Network topologies: bus, star, ring, mesh, hybrid with advantages/disadvantages', ['Compare bus and star topology', 'Draw a mesh topology']),
  fam('cs-network-types-devices', 'csc-02', 'LAN/MAN/WAN/PAN and network devices (hub, switch, router, bridge, gateway, NIC)', ['Difference between hub and switch', 'When is a router used?']),
  fam('cs-osi-tcpip', 'csc-02', 'OSI (7 layers) and TCP/IP (4 layers) models with the function of each layer', ['Explain the seven OSI layers', 'OSI vs TCP/IP']),
  fam('cs-ip-addressing', 'csc-02', 'IPv4/IPv6 addressing, subnet mask, gateway, MAC address, DNS, DHCP numericals', ['Calculate subnet mask', 'Difference between IPv4 and IPv6']),
  fam('cs-cloud-computing', 'csc-02', 'Cloud computing: public/private/hybrid types and IaaS/PaaS/SaaS service models', ['Explain SaaS PaaS IaaS', 'Types of cloud']),
  /* Unit 3 — Web Technology II */
  fam('cs-html-css', 'csc-03', 'Advanced HTML5 (semantic tags, multimedia) and CSS (box model, flexbox, media queries)', ['What is a semantic tag?', 'Explain the CSS box model']),
  fam('cs-javascript', 'csc-03', 'JavaScript: variables, operators, control structures, functions, events and DOM basics', ['Write a JavaScript loop', 'Explain JavaScript data types']),
  fam('cs-php', 'csc-03', 'PHP fundamentals: variables, operators, control structures, functions and form handling ($_GET/$_POST)', ['Explain $_GET and $_POST', 'Write a PHP form handler']),
  fam('cs-php-mysql', 'csc-03', 'Connecting PHP to MySQL and executing SQL statements from PHP', ['Connect PHP to MySQL', 'Write an SQL query from PHP']),
  fam('cs-web-security', 'csc-03', 'Web security: HTTPS, SSL/TLS and secure protocols', ['What is HTTPS?', 'Explain SSL/TLS']),
  /* Unit 4 — Programming in C */
  fam('cs-c-basics', 'csc-04', 'C review: data types, operators, control structures, arrays and strings', ['Write a C program using arrays', 'Difference between while and for loop']),
  fam('cs-c-structures', 'csc-04', 'Structures in C: declaration, members, array of structures and nested structures', ['Write a program using a structure', 'Array of structures']),
  fam('cs-c-pointers', 'csc-04', 'Pointers: declaration, arithmetic, pointer to array/function, call by reference', ['Explain call by reference', 'Pointer arithmetic program']),
  fam('cs-c-file-handling', 'csc-04', 'File handling in C: fopen, fclose, fread, fwrite, fprintf, fscanf and file modes', ['Explain file modes in C', 'Read a file using fread']),
  fam('cs-c-dynamic-memory', 'csc-04', 'Dynamic memory allocation: malloc, calloc, realloc and free', ['Difference between malloc and calloc']),
  fam('cs-c-functions', 'csc-04', 'C functions: declaration, prototypes, parameters and return values', ['Write a function declaration', 'Call by value vs call by reference']),
  /* Unit 5 — Object-Oriented Programming */
  fam('cs-oop-concepts', 'csc-05', 'OOP concepts: class, object, encapsulation, inheritance, polymorphism, abstraction', ['Define encapsulation', 'Difference between class and object']),
  fam('cs-cpp-class', 'csc-05', 'C++ classes and objects: member functions, constructors and destructors', ['Write a C++ class', 'What is a constructor?']),
  fam('cs-inheritance', 'csc-05', 'Inheritance types (single, multilevel, multiple) and access specifiers', ['Explain multiple inheritance', 'Public vs private inheritance']),
  fam('cs-polymorphism', 'csc-05', 'Polymorphism: function overloading, operator overloading, virtual functions', ['Function overloading in C++', 'Explain virtual functions']),
  fam('cs-cpp-basics', 'csc-05', 'C++ basics: program structure, cin/cout and differences between C and C++', ['Difference between C and C++']),
  /* Unit 6 — Software Process Model */
  fam('cs-sdlc', 'csc-06', 'Software engineering need/goals and the software development life cycle (SDLC)', ['What is SDLC?', 'Why is software engineering needed?']),
  fam('cs-process-models', 'csc-06', 'Software process models: Waterfall, Prototype, Spiral, Agile with phases, pros and cons', ['Compare Waterfall and Spiral', 'Explain the Agile model']),
  fam('cs-project-management', 'csc-06', 'Software project management: planning, scheduling, risk management, cost estimation', ['Explain project scheduling']),
  fam('cs-testing', 'csc-06', 'Software testing: unit, integration, system, acceptance; black-box and white-box testing', ['Black-box vs white-box testing']),
  fam('cs-quality', 'csc-06', 'Software quality assurance, quality attributes, ISO standards, documentation and feasibility', ['What is feasibility analysis?']),
  /* Unit 7 — Recent Trends in Technology */
  fam('cs-ai', 'csc-07', 'Artificial intelligence: definition, types, machine learning basics and applications', ['Define artificial intelligence', 'Types of machine learning']),
  fam('cs-robotics', 'csc-07', 'Robotics: definition, components, types and applications', ['Components of a robot']),
  fam('cs-vr-ar', 'csc-07', 'Virtual reality and augmented reality: definitions, hardware and applications', ['Difference between VR and AR']),
  fam('cs-iot', 'csc-07', 'Internet of Things: concept, architecture, examples and applications', ['Explain IoT architecture']),
  fam('cs-big-data', 'csc-07', 'Big data: the 5 Vs, tools (Hadoop, Spark) and applications', ['What are the 5 Vs of big data?']),
  fam('cs-blockchain', 'csc-07', 'Blockchain: distributed ledger, working and applications', ['How does a blockchain work?']),
  fam('cs-ecommerce', 'csc-07', 'E-commerce and digital payments: types, gateways, wallets (eSewa, Khalti, ConnectIPS)', ['Types of e-commerce payment']),
];

let eN = 0;
const e = (
  paperId: string, familyId: string, chapterId: string, text: string, marks: number,
  questionType: EvidenceRecord['questionType'], extra: Partial<EvidenceRecord> = {},
): EvidenceRecord => ({ id: `e-cs-${++eN}`, paperId, familyId, chapterId, text, marks, questionType, extraction: 'concept', ...extra });

export const CS_EVIDENCE: EvidenceRecord[] = [
  /* ---- NEB Board 2081 — chapter-wise weightage read at topic level (no slot/mark text) ---- */
  e('p-cs-2081', 'cs-sql', 'csc-01', 'Topic-level weightage: DBMS questions (SQL query writing) in this paper', 0, 'programming', { note: 'Source gives chapter-wise weightage only; question number and marks were not machine-readable.' }),
  e('p-cs-2081', 'cs-keys', 'csc-01', 'Topic-level weightage: relational keys / database design in this paper', 0, 'short-answer', { note: 'Topic-level record; slot and marks not readable.' }),
  e('p-cs-2081', 'cs-osi-tcpip', 'csc-02', 'Topic-level weightage: data communication and networking in this paper', 0, 'short-answer', { note: 'Topic-level record; slot and marks not readable.' }),
  e('p-cs-2081', 'cs-javascript', 'csc-03', 'Topic-level weightage: JavaScript in this paper', 0, 'programming', { note: 'Topic-level record; slot and marks not readable.' }),
  e('p-cs-2081', 'cs-php', 'csc-03', 'Topic-level weightage: PHP in this paper', 0, 'programming', { note: 'Topic-level record; slot and marks not readable.' }),
  e('p-cs-2081', 'cs-c-functions', 'csc-04', 'Topic-level weightage: C programming in this paper', 0, 'programming', { note: 'Topic-level record; slot and marks not readable.' }),
  e('p-cs-2081', 'cs-inheritance', 'csc-05', 'Topic-level weightage: object-oriented programming in this paper', 0, 'short-answer', { note: 'Topic-level record; slot and marks not readable.' }),
  e('p-cs-2081', 'cs-sdlc', 'csc-06', 'Topic-level weightage: software development life cycle / software process in this paper', 0, 'short-answer', { note: 'Topic-level record; slot and marks not readable.' }),
  e('p-cs-2081', 'cs-ai', 'csc-07', 'Topic-level weightage: artificial intelligence in this paper', 0, 'short-answer', { note: 'Topic-level record; slot and marks not readable.' }),

  /* ---- NEB Board 2082 — explicit tested-topic list (no group/slot information published) ---- */
  e('p-cs-2082', 'cs-keys', 'csc-01', 'Tested topic: primary keys', 0, 'short-answer'),
  e('p-cs-2082', 'cs-sql', 'csc-01', 'Tested topic: SQL ALTER statement', 0, 'programming'),
  e('p-cs-2082', 'cs-normalization', 'csc-01', 'Tested topic: second normal form (2NF) and third normal form (3NF)', 0, 'short-answer'),
  e('p-cs-2082', 'cs-transmission-media', 'csc-02', 'Tested topic: transmission media', 0, 'short-answer'),
  e('p-cs-2082', 'cs-web-security', 'csc-03', 'Tested topic: HTTPS', 0, 'short-answer'),
  e('p-cs-2082', 'cs-javascript', 'csc-03', 'Tested topic: JavaScript loops', 0, 'programming'),
  e('p-cs-2082', 'cs-c-functions', 'csc-04', 'Tested topic: C function declaration', 0, 'programming'),
  e('p-cs-2082', 'cs-c-structures', 'csc-04', 'Tested topic: array and structure programs in C', 0, 'programming'),
  e('p-cs-2082', 'cs-inheritance', 'csc-05', 'Tested topic: OOP inheritance', 0, 'short-answer'),

  /* ---- NEB Board 2083 Set C — topic-level weightage ---- */
  e('p-cs-2083', 'cs-db-models', 'csc-01', 'Topic-level weightage: database design in this paper', 0, 'short-answer', { note: 'Topic-level record; slot and marks not readable.' }),
  e('p-cs-2083', 'cs-sql', 'csc-01', 'Topic-level weightage: SQL in this paper', 0, 'programming', { note: 'Topic-level record; slot and marks not readable.' }),
  e('p-cs-2083', 'cs-javascript', 'csc-03', 'Topic-level weightage: JavaScript in this paper', 0, 'programming', { note: 'Topic-level record; slot and marks not readable.' }),
  e('p-cs-2083', 'cs-php', 'csc-03', 'Topic-level weightage: PHP in this paper', 0, 'programming', { note: 'Topic-level record; slot and marks not readable.' }),
  e('p-cs-2083', 'cs-c-functions', 'csc-04', 'Topic-level weightage: C functions in this paper', 0, 'programming', { note: 'Topic-level record; slot and marks not readable.' }),
  e('p-cs-2083', 'cs-c-structures', 'csc-04', 'Topic-level weightage: C structures in this paper', 0, 'programming', { note: 'Topic-level record; slot and marks not readable.' }),
  e('p-cs-2083', 'cs-oop-concepts', 'csc-05', 'Topic-level weightage: object-oriented programming in this paper', 0, 'short-answer', { note: 'Topic-level record; slot and marks not readable.' }),
  e('p-cs-2083', 'cs-network-types-devices', 'csc-02', 'Topic-level weightage: networking in this paper', 0, 'short-answer', { note: 'Topic-level record; slot and marks not readable.' }),
  e('p-cs-2083', 'cs-process-models', 'csc-06', 'Topic-level weightage: software engineering models in this paper', 0, 'short-answer', { note: 'Topic-level record; slot and marks not readable.' }),
  e('p-cs-2083', 'cs-cloud-computing', 'csc-02', 'Topic-level weightage: cloud computing in this paper', 0, 'short-answer', { note: 'Topic-level record; slot and marks not readable.' }),
  e('p-cs-2083', 'cs-iot', 'csc-07', 'Topic-level weightage: Internet of Things in this paper', 0, 'short-answer', { note: 'Topic-level record; slot and marks not readable.' }),

  /* ---- NEB Model Question 2081/82 — group-level topics (marks from the verified 50-mark grid) ---- */
  e('p-cs-2081m', 'cs-sql', 'csc-01', 'Group A — SQL question (multiple choice)', 1, 'mcq', { slot: 'A', note: 'Model question exposes group-level topics only; question number not published in the source.' }),
  e('p-cs-2081m', 'cs-topologies', 'csc-02', 'Group A — network topology question (multiple choice)', 1, 'mcq', { slot: 'A' }),
  e('p-cs-2081m', 'cs-javascript', 'csc-03', 'Group A — JavaScript question (multiple choice)', 1, 'mcq', { slot: 'A' }),
  e('p-cs-2081m', 'cs-html-css', 'csc-03', 'Group A — web (HTML/CSS) question (multiple choice)', 1, 'mcq', { slot: 'A', note: 'Source listed the topic only as "web"; assigned to the Web Technology family.' }),
  e('p-cs-2081m', 'cs-dbms-basics', 'csc-01', 'Group B — DBMS short-answer question', 5, 'short-answer', { slot: 'B' }),
  e('p-cs-2081m', 'cs-c-functions', 'csc-04', 'Group B — programming short-answer question', 5, 'short-answer', { slot: 'B', note: 'Source listed the topic only as "programming"; recorded against the C programming family.' }),
  e('p-cs-2081m', 'cs-php', 'csc-03', 'Group B — web short-answer question', 5, 'short-answer', { slot: 'B', note: 'Source listed the topic only as "web".' }),
  e('p-cs-2081m', 'cs-ip-addressing', 'csc-02', 'Group C — IP addressing long-answer question', 8, 'long-answer', { slot: 'C' }),
  e('p-cs-2081m', 'cs-c-basics', 'csc-04', 'Group C — arrays long-answer question', 8, 'programming', { slot: 'C' }),

  /* ---- NEB Board 2081 Supplementary — structure copy only, no question text machine-readable ---- */
  /* No question-level evidence was extracted from this source; it is kept in CS_PAPERS because it
     corroborates the 50-mark three-group structure used by the verified spec grid. */
];

let cN = 0;
const c = (
  chapterId: string, topicId: string | undefined, familyId: string, text: string,
  marks: number, questionType: QuestionCandidate['questionType'], specSection: QuestionCandidate['specSection'],
  conceptual: QuestionCandidate['conceptual'],
  extra: Partial<QuestionCandidate> = {},
): QuestionCandidate => ({
  id: `q-cs-${++cN}`, subject: 'cs', chapterId, topicId, familyId, text, marks,
  questionType, specSection, conceptual, origin: 'syllabus-derived', ...extra,
});

export const CS_CANDIDATES: QuestionCandidate[] = [
  /* ---- Group A: 1-mark MCQs (verified grid needs 9; derived grid needs 11) ---- */
  c('csc-01', 'csc-01-t3', 'cs-keys', 'Which key uniquely identifies each record in a relational table? (A) Foreign key  (B) Candidate key  (C) Primary key  (D) Domain', 1, 'mcq', 'A', 'core', { options: ['Foreign key', 'Candidate key', 'Primary key', 'Domain'], answerIndex: 2 }),
  c('csc-01', 'csc-01-t4', 'cs-sql', 'Which SQL statement is used to modify the structure of an existing table? (A) INSERT  (B) ALTER  (C) UPDATE  (D) DELETE', 1, 'mcq', 'A', 'core', { options: ['INSERT', 'ALTER', 'UPDATE', 'DELETE'], answerIndex: 1 }),
  c('csc-01', 'csc-01-t5', 'cs-normalization', 'A relation is in second normal form (2NF) when it is in 1NF and: (A) has no repeating groups  (B) every non-key attribute is fully functionally dependent on the primary key  (C) has no composite attributes  (D) all attributes are atomic', 1, 'mcq', 'A', 'core', { options: ['has no repeating groups', 'every non-key attribute is fully functionally dependent on the primary key', 'has no composite attributes', 'all attributes are atomic'], answerIndex: 1 }),
  c('csc-02', 'csc-02-t2', 'cs-transmission-media', 'Which guided transmission medium is least affected by electromagnetic interference? (A) Twisted pair  (B) Coaxial cable  (C) Optical fibre  (D) Telephone line', 1, 'mcq', 'A', 'core', { options: ['Twisted pair', 'Coaxial cable', 'Optical fibre', 'Telephone line'], answerIndex: 2 }),
  c('csc-02', 'csc-02-t6', 'cs-osi-tcpip', 'The OSI layer responsible for end-to-end error recovery and flow control is: (A) Network layer  (B) Transport layer  (C) Session layer  (D) Presentation layer', 1, 'mcq', 'A', 'core', { options: ['Network layer', 'Transport layer', 'Session layer', 'Presentation layer'], answerIndex: 1 }),
  c('csc-02', 'csc-02-t4', 'cs-topologies', 'In a star topology, every node is connected to: (A) every other node  (B) a central hub or switch  (C) a single ring  (D) a shared bus cable', 1, 'mcq', 'A', 'core', { options: ['every other node', 'a central hub or switch', 'a single ring', 'a shared bus cable'], answerIndex: 1 }),
  c('csc-03', 'csc-03-t3', 'cs-javascript', 'Which JavaScript method selects an HTML element by its id attribute? (A) getElementById()  (B) getElementByName()  (C) selectId()  (D) findElement()', 1, 'mcq', 'A', 'standard', { options: ['getElementById()', 'getElementByName()', 'selectId()', 'findElement()'], answerIndex: 0 }),
  c('csc-03', 'csc-03-t6', 'cs-web-security', 'HTTPS encrypts web traffic using: (A) SSL/TLS  (B) FTP  (C) SMTP  (D) DHCP', 1, 'mcq', 'A', 'core', { options: ['SSL/TLS', 'FTP', 'SMTP', 'DHCP'], answerIndex: 0 }),
  c('csc-04', 'csc-04-t4', 'cs-c-file-handling', 'Which function is used to open a file in C? (A) open()  (B) fopen()  (C) fileOpen()  (D) startFile()', 1, 'mcq', 'A', 'core', { options: ['open()', 'fopen()', 'fileOpen()', 'startFile()'], answerIndex: 1 }),
  c('csc-04', 'csc-04-t5', 'cs-c-dynamic-memory', 'Which function allocates a single block of memory and initialises every byte to zero in C? (A) malloc()  (B) calloc()  (C) realloc()  (D) free()', 1, 'mcq', 'A', 'standard', { options: ['malloc()', 'calloc()', 'realloc()', 'free()'], answerIndex: 1 }),
  c('csc-05', 'csc-05-t4', 'cs-inheritance', 'Inheritance in object-oriented programming means: (A) a class acquires the properties of another class  (B) a class hides its data  (C) a function has two names  (D) an object is created dynamically', 1, 'mcq', 'A', 'core', { options: ['a class acquires the properties of another class', 'a class hides its data', 'a function has two names', 'an object is created dynamically'], answerIndex: 0 }),
  c('csc-05', 'csc-05-t1', 'cs-oop-concepts', 'Binding data and the functions that operate on it into a single unit is called: (A) Inheritance  (B) Encapsulation  (C) Polymorphism  (D) Abstraction', 1, 'mcq', 'A', 'core', { options: ['Inheritance', 'Encapsulation', 'Polymorphism', 'Abstraction'], answerIndex: 1 }),
  c('csc-06', 'csc-06-t2', 'cs-process-models', 'The software process model that follows a linear, phase-by-phase sequence with little feedback is: (A) Spiral  (B) Waterfall  (C) Prototype  (D) Agile', 1, 'mcq', 'A', 'core', { options: ['Spiral', 'Waterfall', 'Prototype', 'Agile'], answerIndex: 1 }),
  c('csc-06', 'csc-06-t4', 'cs-testing', 'Testing that checks the internal logic and structure of a program is called: (A) Black-box testing  (B) White-box testing  (C) Acceptance testing  (D) Regression testing', 1, 'mcq', 'A', 'standard', { options: ['Black-box testing', 'White-box testing', 'Acceptance testing', 'Regression testing'], answerIndex: 1 }),
  c('csc-07', 'csc-07-t4', 'cs-iot', 'IoT stands for: (A) Internet of Things  (B) Input over Transmission  (C) Integrated Operating Tool  (D) Information on Terminal', 1, 'mcq', 'A', 'core', { options: ['Internet of Things', 'Input over Transmission', 'Integrated Operating Tool', 'Information on Terminal'], answerIndex: 0 }),
  c('csc-07', 'csc-07-t6', 'cs-blockchain', 'A blockchain is best described as: (A) a centralised database  (B) a distributed ledger shared among nodes  (C) a type of network topology  (D) an antivirus tool', 1, 'mcq', 'A', 'standard', { options: ['a centralised database', 'a distributed ledger shared among nodes', 'a type of network topology', 'an antivirus tool'], answerIndex: 1 }),
  c('csc-03', 'csc-03-t1', 'cs-html-css', 'Which of the following is an HTML5 semantic tag? (A) <div>  (B) <span>  (C) <article>  (D) <font>', 1, 'mcq', 'A', 'standard', { options: ['<div>', '<span>', '<article>', '<font>'], answerIndex: 2 }),

  /* ---- Group B: 5-mark short answers (verified grid needs 5; derived needs 8) ---- */
  c('csc-01', 'csc-01-t4', 'cs-sql', 'Write SQL statements to (a) create a table Student(roll, name, marks) (b) insert one record into it (c) display all records with marks greater than 50 sorted by name.', 5, 'programming', 'B', 'core'),
  c('csc-01', 'csc-01-t5', 'cs-normalization', 'What is functional dependency? Convert the given relation into second normal form and then into third normal form, removing partial and transitive dependencies.', 5, 'short-answer', 'B', 'core'),
  c('csc-01', 'csc-01-t2', 'cs-db-models', 'Compare the hierarchical, network and relational database models with suitable examples. What is an entity–relationship diagram used for?', 5, 'comparison', 'B', 'core'),
  c('csc-02', 'csc-02-t2', 'cs-transmission-media', 'Distinguish between guided and unguided transmission media. Give two examples of each and state one advantage of optical fibre over twisted pair.', 5, 'comparison', 'B', 'core'),
  c('csc-02', 'csc-02-t6', 'cs-osi-tcpip', 'List the seven layers of the OSI model and state the function of each layer. How does the TCP/IP model differ from it?', 5, 'short-answer', 'B', 'core'),
  c('csc-02', 'csc-02-t7', 'cs-ip-addressing', 'Explain IPv4 and IPv6 addressing. What are a subnet mask, a default gateway and a MAC address? How are they obtained using DHCP?', 5, 'short-answer', 'B', 'core'),
  c('csc-03', 'csc-03-t3', 'cs-javascript', 'Explain JavaScript variables and data types. Write a script that displays the numbers 1 to 10 using a loop and shows the sum in an alert box.', 5, 'programming', 'B', 'core'),
  c('csc-03', 'csc-03-t4', 'cs-php', 'What is server-side scripting? Explain PHP form handling using $_GET and $_POST with a small example.', 5, 'programming', 'B', 'core'),
  c('csc-03', 'csc-03-t6', 'cs-web-security', 'What is HTTPS? Explain the role of SSL/TLS in securing web communication and mention two situations where HTTPS is essential.', 5, 'short-answer', 'B', 'core'),
  c('csc-04', 'csc-04-t2', 'cs-c-structures', 'Explain structures in C. Write a program that stores the roll number and marks of three students in an array of structures and displays them.', 5, 'programming', 'B', 'core'),
  c('csc-04', 'csc-04-t4', 'cs-c-file-handling', 'Explain file handling in C: the file modes accepted by fopen(), and the functions fclose(), fread() and fwrite(). Write a program to copy the contents of one file into another.', 5, 'programming', 'B', 'core'),
  c('csc-05', 'csc-05-t4', 'cs-inheritance', 'What is inheritance? Explain single, multilevel and multiple inheritance with diagrams and state the use of public, private and protected access specifiers.', 5, 'short-answer', 'B', 'core'),
  c('csc-05', 'csc-05-t3', 'cs-cpp-class', 'What is a class in C++? Write a C++ program with a class having data members, a constructor and a member function that displays the values.', 5, 'programming', 'B', 'core'),
  c('csc-06', 'csc-06-t4', 'cs-testing', 'Distinguish between black-box testing and white-box testing. Give one example of each and state where each is used in the software life cycle.', 5, 'comparison', 'B', 'core'),
  c('csc-06', 'csc-06-t2', 'cs-process-models', 'What is a software process model? Briefly describe the Waterfall and Prototype models with their phases, advantages and limitations.', 5, 'short-answer', 'B', 'core'),
  c('csc-07', 'csc-07-t1', 'cs-ai', 'Define artificial intelligence. Mention its main types, two applications and one limitation of machine learning systems.', 5, 'short-answer', 'B', 'core'),
  c('csc-07', 'csc-07-t4', 'cs-iot', 'What is the Internet of Things? Explain IoT architecture with a labelled diagram and give two real-life examples from daily life in Nepal.', 5, 'short-answer', 'B', 'standard'),
  c('csc-01', 'csc-01-t1', 'cs-dbms-basics', 'What is a DBMS? Explain four advantages of a DBMS over a traditional file system with suitable examples.', 5, 'short-answer', 'B', 'core'),
  c('csc-01', 'csc-01-t6', 'cs-db-security', 'What are integrity constraints? Explain entity, referential, domain and key constraints and describe two database security mechanisms.', 5, 'short-answer', 'B', 'standard'),
  c('csc-02', 'csc-02-t1', 'cs-communication-components', 'What is data communication? Explain its components — sender, receiver, transmission medium, message and protocol — with a neat diagram.', 5, 'short-answer', 'B', 'standard'),
  c('csc-02', 'csc-02-t3', 'cs-transmission-impairments', 'What are transmission impairments? Explain noise, crosstalk, distortion and jitter and state how each affects signal quality.', 5, 'short-answer', 'B', 'standard'),
  c('csc-02', 'csc-02-t5', 'cs-network-types-devices', 'Distinguish between LAN, MAN and WAN. Explain the functions of a hub, a switch and a router in a network.', 5, 'comparison', 'B', 'core'),
  c('csc-02', 'csc-02-t8', 'cs-cloud-computing', 'What is cloud computing? Explain public, private and hybrid clouds and the service models IaaS, PaaS and SaaS with examples.', 5, 'short-answer', 'B', 'core'),
  c('csc-03', 'csc-03-t1', 'cs-html-css', 'What are semantic HTML5 tags? Explain the CSS box model and show how media queries are used to make a web page responsive.', 5, 'short-answer', 'B', 'core'),
  c('csc-04', 'csc-04-t1', 'cs-c-functions', 'Explain function declaration, function prototype and function call in C. Distinguish call by value from call by reference with an example.', 5, 'programming', 'B', 'core'),
  c('csc-04', 'csc-04-t1', 'cs-c-basics', 'Explain control structures in C. Write a program using nested loops and a switch statement to print the grade of a student from a given percentage.', 5, 'programming', 'B', 'standard'),
  c('csc-05', 'csc-05-t2', 'cs-cpp-basics', 'How does a C++ program differ from a C program? Explain cin and cout and write the structure of a basic C++ program.', 5, 'comparison', 'B', 'standard'),
  c('csc-06', 'csc-06-t1', 'cs-sdlc', 'What is software engineering? State its goals and explain the phases of the software development life cycle (SDLC).', 5, 'short-answer', 'B', 'core'),
  c('csc-06', 'csc-06-t3', 'cs-project-management', 'What is software project management? Explain project planning, scheduling and risk management with one example each.', 5, 'short-answer', 'B', 'standard'),
  c('csc-06', 'csc-06-t5', 'cs-quality', 'What is software quality assurance? List quality attributes of software and explain feasibility analysis carried out before a project starts.', 5, 'short-answer', 'B', 'standard'),
  c('csc-07', 'csc-07-t2', 'cs-robotics', 'What is robotics? Explain the components and types of robots and mention two real-life applications.', 5, 'short-answer', 'B', 'standard'),
  c('csc-07', 'csc-07-t3', 'cs-vr-ar', 'Distinguish between virtual reality and augmented reality. Mention the hardware required and one application of each.', 5, 'comparison', 'B', 'standard'),
  c('csc-07', 'csc-07-t5', 'cs-big-data', 'What is big data? Explain the five Vs of big data and mention the tools commonly used to process it.', 5, 'short-answer', 'B', 'standard'),
  c('csc-07', 'csc-07-t7', 'cs-ecommerce', 'What is e-commerce? Explain its types and describe digital payment gateways and wallets such as eSewa, Khalti and ConnectIPS.', 5, 'short-answer', 'B', 'standard'),

  /* ---- Group C: 8-mark long answers (verified grid needs 2; derived needs 3) ---- */
  c('csc-01', 'csc-01-t2', 'cs-db-models', 'Explain the hierarchical, network and relational database models in detail, comparing their structure, advantages and limitations. Draw an ER diagram for a library management system showing entities, attributes and relationships.', 8, 'long-answer', 'C', 'core'),
  c('csc-01', 'csc-01-t5', 'cs-normalization', 'What is normalisation? Define functional dependency and explain 1NF, 2NF and 3NF with a worked example, showing how partial and transitive dependencies are removed.', 8, 'long-answer', 'C', 'core'),
  c('csc-02', 'csc-02-t7', 'cs-ip-addressing', 'Explain IPv4 and IPv6 addressing in detail. Calculate the subnet mask and the number of usable hosts for a given network, and describe the roles of the default gateway, DNS and DHCP.', 8, 'long-answer', 'C', 'core'),
  c('csc-03', 'csc-03-t5', 'cs-php-mysql', 'Write a PHP script that connects to a MySQL database, executes a SELECT query with a WHERE clause and displays the result as an HTML table. Explain each step of the connection.', 8, 'programming', 'C', 'core'),
  c('csc-04', 'csc-04-t3', 'cs-c-pointers', 'What is a pointer? Explain pointer arithmetic, a pointer to an array and call by reference. Write a C program that sorts an array of integers using a function with call by reference.', 8, 'programming', 'C', 'core'),
  c('csc-04', 'csc-04-t2', 'cs-c-structures', 'Explain structures and nested structures in C. Write a program that reads the records of five students (roll, name and marks) into an array of structures, writes them to a file and reads them back to display the topper.', 8, 'programming', 'C', 'core'),
  c('csc-05', 'csc-05-t5', 'cs-polymorphism', 'Explain polymorphism in C++. Describe function overloading, operator overloading and virtual functions with programs, and show how runtime polymorphism is achieved.', 8, 'programming', 'C', 'core'),
  c('csc-06', 'csc-06-t2', 'cs-process-models', 'What is the Spiral model of software development? Explain its phases with a neat diagram, state its advantages and limitations, and compare it with the Waterfall model. When should each model be used?', 8, 'long-answer', 'C', 'core'),
  c('csc-07', 'csc-07-t1', 'cs-ai', 'Define artificial intelligence and explain its major types with the working of machine learning. Describe three applications of AI and discuss its ethical and social limitations.', 8, 'long-answer', 'C', 'standard'),
];
