# Research Log — NEB Class 12 Question Predictor & Exam Simulator

**Project folder:** `C:\Users\acer\neb-question-predictor` (fully isolated project; no existing project was read, modified, or depended on.)
**Research conducted:** 2026-10-06 (2083 B.S.)
**Environment:** No browser automation; research used live web search/fetch. PDF binaries (CDC/NEB scans) could generally **not** be parsed directly — findings below rely on text reproductions that were cross-checked across multiple independent sites.

---

## 1. Verified syllabus (source of truth for the app)

### Physics — Grade 12 (Subject code 1021), CDC curriculum (NCF 2076, as revised)
Cross-checked: `jayantbist.com.np` (full topic-level syllabus), `merosiksha.com`, `ndds.com.np`, `iswori.com.np`, CDC curriculum PDF mirror (`dhanraj.com.np` / `lib.moecdc.gov.np`).

**5 content areas, 25 chapters:**
- **Mechanics:** 1 Rotational dynamics, 2 Periodic motion, 3 Fluid statics
- **Heat and Thermodynamics:** 4 First law of thermodynamics, 5 Second law of thermodynamics
- **Wave and Optics:** 6 Wave motion, 7 Mechanical waves, 8 Wave in pipes and strings, 9 Acoustic phenomena, 10 Nature and propagation of light, 11 Interference, 12 Diffraction, 13 Polarization
- **Electricity and Magnetism:** 14 Electrical circuits, 15 Thermoelectric effects, 16 Magnetic field, 17 Magnetic properties of materials, 18 Electromagnetic induction, 19 Alternating currents
- **Modern Physics:** 20 Electrons, 21 Photons, 22 Semiconductor devices, 23 Quantization of energy, 24 Radioactivity and nuclear reaction, 25 Recent trends in physics

### Chemistry — Grade 12 (Subject code 3021)
Cross-checked: `iswori.com.np`, `nebexam.com`, `dhanraj.com.np` (CDC curriculum 2076 text), `jayantbist.com.np`, textbook PDF (`collegenp.com` — official Grade 12 Chemistry textbook TOC).

**4 content areas, 21 units** (Volumetric Analysis → Nuclear chemistry), unit names verified against the official textbook table of contents.

### Computer Science — Grade 12 (Subject code 4281)
Cross-checked: `nneducation.com` (unit-level syllabus), `merosiksha.com`, `ndds.com.np`, `iswori.com.np`, `learncampusbook.blogspot.com` (CDC curriculum text).

**7 units:** 1 DBMS, 2 Data Communication and Networking, 3 Web Technology II, 4 Programming in C, 5 Object-Oriented Programming, 6 Software Process Model, 7 Recent Trends in Technology.

### Explicitly excluded (enforced in code)
Mathematics, English, Nepali, Biology, Class 11 material, technical-stream papers (codes 91xx), A-Level/CBSE/ICSE content, bachelor-level content.

---

## 2. Verified specification grids (paper structure)

### Physics (75 marks, 3 hours) — VERIFIED
`Group A: 11 MCQ × 1 = 11` · `Group B: 8 short × 5 = 40` · `Group C: 3 long × 8 = 24` → **75**
- Cross-checked against: actual 2079 board paper (dhanrajgurung.com), 2080 Set P, 2081 Set D, 2082 Set H analyses (nneducation.com), iswori/ndds grid pages, collegenp spec-chart PDF description.
- Internal choice: Group B questions "with OR options for most questions"; Group C frequently has OR (e.g., 2079 model Q.21 "Wave Optics OR Sound Waves"). Group A: no choice, MCQs distributed 30 minutes after start.

### Chemistry (75 marks, 3 hours) — VERIFIED
Same structure: `11 MCQ + 8×5 + 3×8 = 75`.
- Cross-checked: 2081 Set P, 2081 Supplementary Set A, 2082 Set D analyses (nneducation.com), sajhanotes.com full question text for 2081/2082 board papers, iswori grid page.
- Internal choice: "OR" in several Group B and C slots (e.g., 2082 D: Q13, Q15, Q20, Q21, Q22).

### Computer Science (50 marks, 2 hours) — VERIFIED (board theory)
`Group A: 9 MCQ × 1 = 9` · `Group B: 5 short × 5 = 25` · `Group C: 2 long × 8 = 16` → **50**
- Cross-checked: actual 2081 board paper and 2083 board paper analyses (nneducation.com), iswori/ndds spec-grid pages, nebexam.com (Full Marks 50, pass 20, 2 hrs), scribd copy of 2081 supplementary paper ("total of 50 marks").
- **Ambiguity disclosed:** `nneducation.com` syllabus page states "75 (Theory) + 25 (Practical)". This conflicts with every actual board paper found (all 50 marks, 2 h). **The app follows the actual board-paper evidence (50 marks)** and also offers a clearly-labelled *derived* 75-mark school-terminal adaptation (11+8×5+3×8) marked `verification: DERIVED — not an official NEB grid`.
- Practical/internal: 25 marks (school-conducted) — outside the written paper.

---

## 3. Papers analyzed (only what was actually read)

### Physics — board papers
| Paper | Type | What was read | Source | Tier |
|---|---|---|---|---|
| 2079 (2022) board, code 1021'O' | Board | Header/structure + MCQ 1–3 full text | dhanrajgurung.com | 2 |
| 2079 model (for 2080 batch) | Model (NEB) | Group B/C questions Q12–Q22 with topics | iswori.com.np, nneducation.com | 2 |
| 2080 Set P | Board | Question-by-question topic map (Q1–Q22) | nneducation.com | 2 |
| 2081 Set D | Board | Question-by-question topic map (Q12–Q22) | nneducation.com | 2 |
| 2082 Set H | Board | Group A/B/C with sub-parts and marks (Q14–Q19 detailed) | nneducation.com | 2 |
| 2082 general stream 1021'H' | Board | Header + structure confirmed | dhanraj.com.np | 2 |

### Chemistry — board papers
| Paper | Type | What was read | Source | Tier |
|---|---|---|---|---|
| 2081 Set P | Board | Group B/C full analysis Q12–Q22 | nneducation.com | 2 |
| 2081 Supp. Set A | Board | Group B/C full analysis Q12–Q22 | nneducation.com | 2 |
| 2082 Set D | Board | Group B/C full analysis Q12–Q22 + weightage | nneducation.com | 2 |
| 2081 board (3021) | Board | Full text Q12, Q20 with solutions | sajhanotes.com | 2 |
| 2082 board (3021) | Board | Full text Q12 with solution | sajhanotes.com | 2 |
| 2081 model | Model | Group B/C presence confirmed | webnotee.com, sajhanotes.com | 2 |

### Computer Science — board papers
| Paper | Type | What was read | Source | Tier |
|---|---|---|---|---|
| 2081 board 4281 | Board | Structure + topic-level weightage (DBMS, networks, JS/PHP, C, OOP, SDLC, AI) | nneducation.com | 2 |
| 2082 board 4281 | Board | Topic list (primary keys, SQL ALTER, 2NF/3NF, transmission media, HTTPS, JS loops, C functions, OOP inheritance, array/structure programs) | nneducation.com | 2 |
| 2083 board 4281'C' | Board | Structure + weightage (DB design/SQL, JS/PHP, C functions/structures, OOP, networking, SE, cloud/IoT) | nneducation.com | 2 |
| 2081 model | Model (NEB) | Group topics: SQL, topology, JS, web / DBMS, programming, web / IP addressing, arrays | ndds.com.np, iswori.com.np | 2 |
| 2081 supplementary 4281 | Board | Structure (50 marks, Group A/B/C, ORs) | scribd.com | 2 |

### Terminal / school papers — HONEST STATUS
- **Economics — one real terminal paper registered:** Shree Tribhuwan Shanti Secondary School, Terminal Examination 2082, Class 12 Economics, F.M. 75, 3 Hrs. School name, class, subject, marks and full question text (Groups A, B, C) are readable on the hosting page (askfilo.com, Tier 3). **Caveat recorded in the source entry:** the host is a user-generated Q&A platform, so authenticity rests on the page content alone (single source, not corroborated by the school). It mirrors the official board structure exactly.
- **Physics / Chemistry / Computer Science / Accountancy:** no terminal question text was retrievable in this research. The St. Xavier's College 2080/081 Physics terminal is confirmed to exist (Tier 3) but was not machine-readable, so no records were extracted from it.
- The app therefore reports terminal evidence **per subject**: Economics shows real terminal appearances; the other four subjects report "Insufficient verified data" instead of inventing counts (enforced by scoring code and tests).

---

## 4. Data-quality commitments made during research
1. No question, frequency count, source, or grid cell was invented. Every `paperEvidence` record in the app points to a source ID in `src/data/sources.ts` with a URL and access date.
2. Where a paper was only available as a *topic-level analysis* (not full verbatim text), records are stored as **concept-level evidence** (`extraction: 'concept'`) rather than verbatim questions; verbatim records are marked `extraction: 'verbatim'`.
3. Frequency counts in the UI are **computed at runtime** from the records that exist — never hard-coded.
4. Subjects excluded by requirement (Math/English/Nepali) appear nowhere in data files; an automated QA test enforces this.
5. Scoring labels are priority labels (🔥/🟠/🟡/⚪), never probabilities or guarantees.

## 5. Known limitations (surfaced inside the app)
- Terminal-paper corpus is still thin: one real terminal paper (Economics 2082) and nothing for the other four subjects → the terminal component reads "Insufficient verified data" for those subjects.
- Not every year of every paper was readable (PDF scans) → counts represent *verified appearances only*.
- Specification grids change; each grid in `src/data/specGrids.ts` stores its `verifiedFrom` sources and `lastVerified` date.


---

## 6. Implementation status (same session)

Built in `C:\Users\acer\neb-question-predictor` - React 19 + TypeScript + Vite, fully local (no network calls at runtime).

**Data (`src/data`)**
- `syllabus/` - verified 25-chapter Physics, 21-unit Chemistry, 7-unit Computer Science, 14-chapter Accountancy and 6-unit Economics syllabi; exclusion list enforced in code.
- `sources.ts` - 46 registered sources with tier, URL and access date.
- `specGrids.ts` - `phy-75-verified`, `chm-75-verified`, `cs-50-verified`, `acc-75-verified`, `eco-75-verified`, plus `cs-75-derived` (flagged DERIVED, opt-in).
- `db/` - physics (6 papers), chemistry (5), computer science (5), accountancy (4), economics (8), each with question families, evidence records and rankable candidates; every evidenced concept has at least one candidate (enforced by a test).

**Engine (`src/engine`)**
- `validators.ts` - syllabus, grid and cross-reference integrity checks (also rendered in the app's Research Log page).
- `scoring.ts` - 10-component, 100-point evidence score: syllabus 15, spec 15, board 20, model 10, terminal 10, recency 10, variation 5, mark pattern 5, conceptual 5, cross-source 5; plus a coverage ratio and priority thresholds 80/65/45. Personal (student/teacher) signals are kept OUT of the evidence score as a separate, labelled boost.
- `predictor.ts` - filtering (subject/chapter/group/marks/search), ranking modes, syllabus coverage stats, chapter summaries.
- `paperGenerator.ts` - seeded, reproducible papers that match the grid arithmetic exactly, one concept per slot, OR alternatives per `choiceSlots`, and honest warnings when a chapter filter leaves slots unfilled.

**App (`src/pages`)** - Dashboard, Question Predictor, Paper Generator, Exam Simulator (timer, auto-graded Group A, self-marked written answers), "Why this rank?" audit view, Syllabus browser, Research Log, Settings (weights, derived-grid toggle, local data reset).

**Verification**: `npx tsc -b` clean; `npm test` = 36 tests passing (data integrity, excluded subjects, grid arithmetic, exact paper totals, seed reproducibility, per-subject terminal honesty, top-N for every subject, SSR render of every page); `npm run build` succeeds.

---

## 7. Extension research — Accountancy & Economics (2026-10-07)

Same verification pipeline as the Science subjects: syllabus → specification grid → past papers → terminal (if any) → question families → frequency → recency → cross-source → score → rank. Strictly Class 12 NEB; Class 11 (Acc. 103 / Eco. 303), bachelor/CA and CBSE content excluded.

### Accountancy — Grade 12 (Board code 1041, CDC `Acc. 104`, "लेखाविधि" / Accounting)
- **Syllabus:** official CDC Grade-12 curriculum PDF (mirror, Tier 2) + official Grade-12 specification grid PDF (gov.np, Tier 1): **4 units / 14 chapters**, 120 theory hours + 40 project hours. Unit hours/marks from the grid: 19/12, 50/29, 41/28, 10/6. Chapter teaching-hours cells sum to **118** while both official documents print 120 — the 2-hour cell-vs-total gap is documented in the syllabus `sourceNote`, not corrected by guess.
- **Grid (`acc-75-verified`):** official grid prints `11×1 + 8×5 + 3×8 = 22 questions = 75 marks`, 3 hrs, theory 75 + internal 25 = 100. The official grid states OR choices in any two 5-mark and any one 8-mark question, but the three actual board scans show the OR **only inside Group C (Q20)** — the registered grid follows the papers (Group B `choiceSlots: 0`, Group C `choiceSlots: 1`) and the conflict is recorded in the grid `note`.
- **Papers read (all verbatim, 22/22 questions each):** 2081 Sub.Code 1041 B, 2082 1041 K, 2083 1041 C (EducateNepal 8-page scans, Tier 2) + official Model Question 2078 header (Tier 1, body not transcribed → concept only).
- **Choice modelling:** Q20's printed OR ("NFRS statements **OR** multi-step income statement + SOFP") is intra-slot, so it is modelled as a separate family (`acc-multi-step-statements`) with its own `C20or` evidence records — the same convention Economics already uses for `B12or`/`C22or`.
- **Terminal papers:** none found for Accountancy; the database claims none.

### Economics — Grade 12 (Board code 3041, CDC `Eco. 304`)
- **Syllabus:** official CDC "New Curriculum of Class 11 & 12 Optional Subjects (Third, 2076)" PDF (Tier 1, Grade-11 `Eco. 303` excluded) cross-checked with two independent syllabus reproductions (Tier 4): **6 units**, 120 theory + 40 practical hours.
- **Grid (`eco-75-verified`):** `11×1 + 8×5 (2 OR) + 3×8 (1 OR) = 75`, 3 Hrs — read identically from 2079 (regular + grade-increment), 2080, 2081, 2082, 2083 board papers, the official 2079 NEB model question (Tier 1 PDF) and the 2082 school terminal paper. OR counts vary a little year to year, so `choiceSlots` records the observed typical pattern, documented in the grid `note`.
- **Papers read:** 6 board papers (2079 regular, 2079 grade-increment, 2080, 2081, 2082, 2083 — full or selected verbatim text), official 2079 model question, and **one real terminal paper** (Shree Tribhuwan Shanti S.S. School, 2082, F.M. 75) — Tier 3 with an explicit single-source caveat in the registry.
- **Terminal honesty:** the terminal scoring layer is now keyed **per subject** — Economics scores real terminal appearances; Physics/Chemistry/CS/Accountancy still report "Insufficient verified data" for that component (test-enforced).

### What was added (code)
- `types.ts`: `SubjectId` extended; `SUBJECT_ORDER` = physics, chemistry, cs, accountancy, economics.
- New: `syllabus/accountancy.ts`, `syllabus/economics.ts`, `db/accountancy.ts`, `db/economics.ts`; +15 registry sources; +2 verified grids.
- `scoring.ts`: terminal component detail is now per subject (`subjectsWithTerminalEvidence`).
- UI: Science/Commerce `<optgroup>` subject pickers (Dashboard, Predictor, Paper Generator, Exam, Analysis, Syllabus, Settings), dynamic header subject line, Dashboard terminal notice and Research Log "Research coverage per subject" table that show the live per-subject figures.

### Verification status
- `npx tsc -b` clean; `npm test` 36/36 passing; `npm run build` succeeds.
- Automated checks cover: no validation errors anywhere (all 5 subjects), grid arithmetic for every grid, excluded-subject name scan, every evidenced family has a rankable candidate, generated papers equal each subject's own verified grid total (75/75/50/75/75), honest per-subject terminal reporting, top 5/10/15/20 for both new subjects, SSR render of every page.