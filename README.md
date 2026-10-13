# Piccola Italiano v0.6.0 · Storie & Patente

Independent local-first PWA, built for learning Italian from real contexts. **Unrelated to Cassola**.

## New in v0.3

- 🎲 Six original, three-beat branching-response stories: weekend sushi shift, Veneto café, driving instructor, Questura, neighbors and Timo's veterinarian.
- Choices display concrete linguistic feedback; Italian voice read-aloud uses the device's native speech synthesizer (may require an installed Italian voice).
- Capped, repeat-safe XP and badges, no punishment for skipped days or failure. Two-way links between stories and existing words/grammar.
- Original freeform writing/roleplay and 14-day challenge remain available.
- 🏛️ Driving-theory bank import interface. MIT 2024 source and licence attribution are included. File importer supports **CSV/TSV/JSON with explicit question-and-answer fields**; conservatively parses a few delimited TXT patterns, but has **not yet been verified against MIT's raw TXT layout**. Unrecognized formats are rejected without replacing local data. User must validate provenance and relevance of any imported bank.
- 30-question / 20-minute simulation draws from imported questions when at least 30 valid records are present, otherwise the 40 original demo questions. This is **practice**, not a verified simulation of the official sampling algorithm or current bank.
- Old IndexedDB database schema retained (version 1); new `adventure` and `mission.bank` data are additive. Backups merge new fields without resetting previous work.

## Deployment

Upload the files **at repository root** of the independent repo `Gewuerzei/piccola-italiano`. Enable Pages `main` + `/root`. Live URL: https://gewuerzei.github.io/piccola-italiano/ .

## Data and legal

All personal progress stored in browser IndexedDB with localStorage fallback. Export JSON before clearing Safari website data; never commit personal backups to a public repository. MIT link: https://www.mit.gov.it/normativa/circolare-protocollo-19281-del-05072024. MIT site legal notice defaults to CC BY 3.0 unless otherwise specified: https://www.mit.gov.it/note-legali .

**Restrictions:** Nothing here guarantees the current official written examination question list is identical to the 2024 publication. Ask driving school / Portale dell'Automobilista for current bank. No AI automatic grading and no official import auto-sync.

## v0.4: Words through time + actual mysteries

- 🏛️ Eight manually checked etymology dossiers with explicit source links to Treccani. Differentiate direct inheritance, modern derivation and calques/models; no claims of original Greek automobiles. Six new linked word entries in the main library.
- 🔐 Two three-stage puzzle cases: Bassano's letter and a driving license dossier. Typed answers plus ordered reconstruction, clues, optional hints, answer checking, solved badges. This is **not** just a choice quiz.
- Puzzle solve state is stored locally under `mysteries` and included in JSON backup merging. No data wipe, schemaVersion stays 1, no forced deadlines, no unlimited points farming.
- `archaeology.js` is loaded before `app.js`, included in offline cache v004. Treccani links require Internet; authored learning content runs offline.
## v0.5: 词根推理实验室 · 四宗新案

- Added 16 etymology dossiers (24 total), each with authored Chinese etymology explanations and linked Treccani references. These are linguistic hints, not copied dictionary definitions.
- Added 4 three-stage clue cases (6 cases total) and 12 **typed** root-reconstruction challenges. Answers are normalized and verified; optional hints reveal information, not automatic AI grading.
- Added 15 linked word entries (library seed 65 total), 15 additional language drills (40 total). Original 14-day driving mission and separate official-bank importer are unchanged; the expansion is **not** an official exam-bank import.
- Quest state is additive under `state.mysteries.inferences`. Existing IDB schema v1 and existing progress stay intact. JSON backup import now merges first successful root solves without erasing local successes.
- Scripts: `archaeology.js` followed by `excavation.js`, then `app.js`; service worker cache `piccola-italiano-v005`.
- Tests: source JS parsing for all changed scripts and synthetic action tests for root answers + persistence passed. Real iPhone PWA remains to be tested.

## v0.6 · Codex parchment edition

- New optional global third theme: light → dark → Codex (paper, wax seals, illuminated-document styling). Select from the top-right appearance toggle or Settings; stored in the existing settings object.
- Twelve original etymology dossiers with Treccani source links, emphasizing parchment, seals, notaries, charters, edicts, and archives. Avoid copying dictionary definitions.
- Three additional three-stage, typed/sequence mysteries set in a medieval scriptorium, at a city gate and in a notary's vault (nine cases total). These are fictional teaching scenarios, not claims about a specific historical event.
- Twelve additional linked vocabulary entries and ten language drills. v0.5 root-inference features, stories and all existing data remain.
- Added `codex.js` after `excavation.js` and before `app.js`; service worker cache `piccola-italiano-v006`.
- No change to the official driving bank import status; full MIT question list is **not** imported.
