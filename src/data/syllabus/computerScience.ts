import type { SyllabusSubject } from '../../engine/types';
import { buildSubject, type SubjectLiteral } from './build';

/**
 * Grade 12 Computer Science syllabus — CDC / NEB (NCF 2076).
 * 7 official units with topics, reproduced from research source
 * `syllabus-cs-nneducation` and cross-checked against merosiksha.com and
 * CDC curriculum reproductions. Grade-11 units are NOT included.
 * Per-unit teaching hours: only partially published in consulted sources,
 * so hours = 0 means "not verified".
 */
const CS_LITERAL: SubjectLiteral = {
  id: 'cs',
  name: 'Computer Science',
  shortName: 'Comp. Sci.',
  subjectCode: '4281',
  gradeLabel: 'Grade XII (Class 12)',
  prefix: 'csc',
  areas: [
    'Database and Networking',
    'Web and Programming',
    'Software and Emerging Technology',
  ],
  sourceIds: ['syllabus-cs-nneducation', 'cdc-elibrary'],
  sourceNote:
    'Official 7-unit Grade-12 Computer Science syllabus. Only Grade-12 content is included; Grade-11 topics (number systems, HTML basics, OS, multimedia, cyber law) are excluded from this database.',
  chapters: [
    {
      n: 1, area: 'Database and Networking', name: 'Database Management System (DBMS)', hours: 12, core: [3, 4],
      topics: [
        ['Concepts: data, information, database, DBMS; advantages of DBMS over file systems', []],
        ['Database models: hierarchical, network, relational — comparison and examples; Entity–Relationship (ER) model and ER diagrams', ['entities, attributes, relationships']],
        ['Relational database concepts: tables, tuples, attributes, domains, primary key, foreign key, candidate key', ['keys questions']],
        ['SQL: DDL (CREATE, ALTER, DROP), DML (INSERT, UPDATE, DELETE, SELECT), queries with WHERE, ORDER BY, GROUP BY, HAVING', ['SQL query writing']],
        ['Normalization: functional dependency, 1NF, 2NF, 3NF with examples', []],
        ['Database security and integrity constraints', []],
      ],
    },
    {
      n: 2, area: 'Database and Networking', name: 'Data Communication and Networking', hours: 12, core: [4, 5],
      topics: [
        ['Data communication components: sender, receiver, transmission medium, message, protocol', []],
        ['Transmission media: guided (twisted pair, coaxial, fiber optic) and unguided (radio, microwave, infrared, Bluetooth, Wi-Fi)', ['comparisons']],
        ['Transmission impairments: jitter, echo, crosstalk, distortion, noise, bandwidth', []],
        ['Network topologies: bus, star, ring, mesh, hybrid — advantages and disadvantages', ['topology diagrams']],
        ['Network types: LAN, MAN, WAN, PAN; network devices: hub, switch, router, bridge, gateway, repeater, NIC, modem', ['device differences']],
        ['Network models: OSI (7 layers) and TCP/IP (4 layers) with functions of each layer', []],
        ['Internet concepts: IPv4/IPv6, subnet mask, gateway, MAC address, DNS, DHCP; intranet vs extranet vs internet', ['IP addressing numericals']],
        ['Cloud computing: types (public, private, hybrid), service models (IaaS, PaaS, SaaS), cloud storage', []],
      ],
    },
    {
      n: 3, area: 'Web and Programming', name: 'Web Technology II', hours: 12, core: [4, 5],
      topics: [
        ['Advanced HTML: semantic tags, HTML5 multimedia (audio, video)', []],
        ['Advanced CSS: box model, float, positioning, flexbox basics, media queries', []],
        ['JavaScript: variables, data types, operators, control structures, functions, events, DOM basics', ['JavaScript coding questions']],
        ['Server-side web technology: PHP fundamentals — variables, operators, control structures, functions, form handling ($_GET, $_POST)', ['PHP coding questions']],
        ['PHP and MySQL connection: connecting to a database and executing SQL through PHP', []],
        ['Web security: HTTPS, SSL/TLS and secure protocols', []],
      ],
    },
    {
      n: 4, area: 'Web and Programming', name: 'Programming in C', hours: 12, core: [4, 5],
      topics: [
        ['Review of C: data types, operators, control structures, arrays, strings, functions', []],
        ['Structures (struct): declaration, accessing members, array of structures, nested structures', ['C program writing']],
        ['Pointers: declaration, arithmetic, pointer to arrays, pointer to functions, call by reference', []],
        ['File handling: fopen, fclose, fread, fwrite, fprintf, fscanf; file modes', ['file handling programs']],
        ['Dynamic memory allocation: malloc, calloc, realloc, free', []],
      ],
    },
    {
      n: 5, area: 'Web and Programming', name: 'Object-Oriented Programming (OOP)', hours: 10, core: [3, 4],
      topics: [
        ['Concepts of OOP: class, object, encapsulation, inheritance, polymorphism, abstraction', ['definition/short answer']],
        ['C++ basics: structure of a C++ program, cin/cout, differences between C and C++', []],
        ['Classes and objects: defining a class, member functions, constructors and destructors', ['C++ program writing']],
        ['Inheritance: single, multilevel, multiple; access specifiers (public, private, protected)', ['diagram + program']],
        ['Polymorphism: function overloading, operator overloading, virtual functions and runtime polymorphism', []],
        ['Introduction to Java as a pure OOP language', []],
      ],
    },
    {
      n: 6, area: 'Software and Emerging Technology', name: 'Software Process Model', hours: 10, core: [2, 3],
      topics: [
        ['Software engineering: definition, need, goals; software development life cycle (SDLC)', []],
        ['Software process models: Waterfall, Prototype, Spiral, Agile — phases, advantages, disadvantages', ['model comparison (long answer)']],
        ['Software project management: planning, scheduling, risk management, cost estimation', []],
        ['Software testing: unit, integration, system, acceptance testing; black-box and white-box testing', []],
        ['Software quality assurance: quality attributes, ISO standards, documentation', ['feasibility analysis questions']],
      ],
    },
    {
      n: 7, area: 'Software and Emerging Technology', name: 'Recent Trends in Technology', hours: 8, core: [1],
      topics: [
        ['Artificial intelligence: definition, types, machine learning basics, applications', []],
        ['Robotics: definition, components, types; applications', []],
        ['Virtual reality and augmented reality: definitions, hardware, applications', []],
        ['Internet of Things (IoT): concept, architecture, examples', []],
        ['Big data: the 5 Vs, tools (Hadoop, Spark), applications', []],
        ['Blockchain: distributed ledger, working, applications', []],
        ['E-commerce and digital payment: types, gateways, wallets (eSewa, Khalti, ConnectIPS)', []],
      ],
    },
  ],
};

export const COMPUTER_SCIENCE: SyllabusSubject = buildSubject(CS_LITERAL);
