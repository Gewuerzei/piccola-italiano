# Piccola Italiano · Learning Architecture

**Status:** S0 complete; S1 curriculum shipped v0.9.0; limited S2 placement shipped v0.10.0 (2026-10-16). iPhone device QA still open. S3 pathway and an initial S4 comparative studio have shipped; deeper S4 and S5 remain planned.

## Current delivered scope · S1

`curriculum.js` defines 25 teaching nodes, five per layer, with prerequisite connections, existing content references and a simple validator. The PWA shows the map through Home and Library, without storing learner scores. `curriculum.css` provides responsive cards. The Latin sound-lab demo shows IPA and modern-language TTS buttons only if corresponding device voices exist. Ancient Latin audio is not fabricated. iPhone PWA/offline/audio device verification is still outstanding.

## Current delivered scope · S2 limited orientation

`placement.js` supplies 15 authored items (five difficulty layers per reading/grammar/lexicon), drawing four per area with bounded response-dependent difficulty. The optional 'chancery orientation' permits skips, pause/resume and a non-AI self-rated free-writing prompt. `state.placement` stores only selection evidence, completion state and self-rating; the raw free-writing answer is not persisted. Reports distinguish measured quiz samples from unmeasured listening and speaking, and avoid inferring certified CEFR levels. The small pool is uncalibrated and repeated exposure can bias observations. Completed attempts in JSON backup can be merged conservatively; do not overwrite an active local attempt. Device QA pending.

## Current delivered scope · S3 and S4 preview

v0.11 provides five explainable, read-only study suggestions using prerequisite structure, utility and optional limited placement evidence. v0.12 adds a four-card cross-Romance studio: noctem/notte/noche/nuit, octo/otto/ocho/huit, lactem/latte/leche/lait, plus necessity constructions that are functionally comparable but not equivalent etymologies. Classical Latin IPA is explicitly reconstructed, and modern TTS requires an installed voice. Source links are pointers, not a completed academic review. Device QA remains pending.

## North star

Turn the current Italian-learning feature collection into a coherent learning system. First map knowledge, then measure demonstrated skills, then recommend learning, and only then expand to cross-language comparison.

Three dimensions must remain separate:

- **Knowledge layer (L1-L5):** structural depth of a concept, not a learner label or a CEFR certificate.
- **Mastery evidence:** recognition, comprehension, independent production, transfer and memory retention, with unmeasured explicitly allowed.
- **Personal utility:** core prerequisites, practical goal relevance (including driving theory), and exploration interests such as medieval documents.

## Five curriculum layers

| Layer | Name | Knowledge examples |
| --- | --- | --- |
| L1 | Fondamenta | Basic clause, articles, essere/avere, personal pronouns |
| L2 | Autonomia | Narrating events, passato prossimo, everyday requests and object pronouns |
| L3 | Connessioni | Causal, relative and coordinated clauses; connected discourse |
| L4 | Precisione | Exception and condition markers, congiuntivo, counterfactuals, style precision |
| L5 | Metalinguaggio | Comparative grammar, language history, morphological and semantic analysis |

Some topics span layers as understanding deepens; do not treat all words at a level as mandatory prerequisites for entering the next one.

## Evidence-aware competency map

Track reading, listening, grammar, lexicon, written production, spoken production and metalinguistic reasoning separately. Each needs coverage, observation type, observation count and confidence. Distinguish unmeasured from low skill. Multiple-choice recognition cannot certify speaking or independent production. Free-writing self-assessment is self-report, never AI grading.

Mastery: unmeasured; M0 emerging; M1 recognizes; M2 comprehends; M3 produces independently; M4 transfers to new contexts. Do not use XP or visits as mastery. Repeat observations at varied intervals and contexts; do not downgrade based on a single mistake.

Priority A = high frequency, crucial prerequisite or real user goal; B = broadly useful extension; C = specialist/exploration. The 'important 20%' idea is a heuristic for selecting key concepts, not a literal quota. Value is personal and dynamic.

## Delivery gates

| Stage | Proposed release | Deliverable | Acceptance |
| --- | --- | --- | --- |
| S0 | no runtime bump | This document, handoff pointer | terms and boundaries agreed |
| S1 | v0.9 target | 20-30 reviewed nodes, prerequisites, read-only five-layer map | graph has no cycles, links to existing content IDs work |
| S2 | v0.10 target | short, optional adaptive placement, skill-specific evidence | confidence displayed, no made-up speaking score |
| S3 | v0.11 target | explainable weak-skill recommendations and review loop | daily high-value practice without forcing a single path |
| S4 | v0.12 target | abstract grammar and cross-language transfer studio | hand-checked examples and non-equivalence warnings |
| S5 | v1.0+ concept | source-grounded multilingual atlas | etymology and historical claims traceable to evidence |

Version numbers are planning labels and are not promises of dates or shipped behavior.

## Stage 1 technical proposal

Create a separate `curriculum.js` defining nodes with stable id, layer, skill dimensions, utility, prerequisite node IDs, existing contentRefs and practiceRefs, plus a reviewed rationale. Add after current content modules and before app.js only after testing script order. Preserve SEED, EXERCISES, VIVO_TASKS, MYSTERIES, CHANCERY_CASES and all existing IDs.

Select 20-30 high-impact nodes by hand to start, especially auxiliaries, pronouns, past narration, causal and relative clauses, exception and condition markers. Mark unmatched content 'unmapped', rather than inventing metadata. Build a read-only map that navigates to existing knowledge detail and validates that every prerequisite and reference resolves. Save no diagnostic scores during Stage 1.

## Stage 2 placement approach

Use an optional 8-12 minute 'new chancery clerk' storyline. Mix short reading, written grammar and limited production prompts. Adjust difficulty gradually across several responses; do not decide level after one success or error. Make pauses, skips and 'practice only' available. Mark listening and speaking unmeasured without suitable tasks. Explain recommendations with observed evidence, not humiliating pass/fail labels.

## Stage 3 onwards

Recommend using prerequisites + utility + due reviews + evidence uncertainty + learner interests. Every round should move from understanding to application to new-context transfer to spaced retrieval. Keep the medieval and etymological games optional but integrated as evidence-bearing tasks only when their scoring is valid.

Stage 4 compares Italian conditionals, aspect, mood, clause structure and etymology with Spanish, French, Portuguese, Romanian and others. Mark false friends and structures that are not directly equivalent. Stage 5 can extend into a historically sourced language atlas.

## Latin companion: Latino in tasca (cross-cutting curriculum)

Latin is an **always-available explanatory companion** to Italian, not a new prerequisite course or a sixth level. When an Italian learning item invites a useful historical explanation, learners can open a short Latin sidecar. Default focus remains on usable contemporary Italian.

| Italian layer | Optional Latin companion |
| --- | --- |
| L1 Fondamenta | A short, source-checked Latin ancestor alongside useful modern vocabulary, without declension memorization |
| L2 Autonomia | Repeatable sound changes and word-formation patterns, distinguishing regular changes from coincidences |
| L3 Connessioni | Compare specific Italian constructions with selected Latin patterns and note where the syntax is not equivalent |
| L4 Precisione | Explain aspects of the development of subordination, mood, tense and modal meanings without substituting historical rules for current Italian |
| L5 Metalinguaggio | Original Latin morphology, case systems, historical sources and cross-Romance comparisons, available to motivated learners |

**Micro-example:** Latin accusative *noctem* > Italian *notte*; Latin *octo* > Italian *otto*; Latin accusative *lactem* > Italian *latte*. Explain the common `-ct-` > `-tt-` correspondence as a simplified historical pattern, not an exceptionless mechanical translator. Related Spanish *noche* and French *nuit* are parallel descendants, not descendants of modern Italian.

**Accuracy gates:** Classical written Latin is not identical to the diverse spoken Latin varieties from which Romance languages developed. Distinguish inherited vernacular words, learned Latin loans, Greek or other borrowings, reborrowings, and later analogical formations. Store source, original form with inflection/case where relevant, modern form, historically supported link, confidence and any disputed explanations. Never infer etymology solely because words look similar; avoid copying dictionary definitions.

**Build incrementally:** Stage S1 can annotate a *small number* of verified existing nodes with optional Latin notes (e.g. notte/noctem, otto/octo, latte/lactem) only when the current node and source exist; unverified notes stay absent. S2 placement never requires Latin to prove everyday Italian ability. At S3, Latin notes can support memory and conceptual understanding, but are not mandatory for language-use mastery. Stages S4–S5 add structured historical and multilingual comparisons. Make every sidecar dismissible and keep the main task short.

**Engineering boundary:** No new user-data field is needed for read-only Latin hints. Preserve existing etymology IDs, source links and item progress. The learner may opt into active Latin study later, but the default Italian path remains intact.
## Pronunciation track · Sound is part of the atlas

Written cognates are not enough. Learners should be able to **hear**, **compare**, **slow down**, and **see IPA** for each independently verified language form. Pronunciation belongs alongside the Latin companion at every learning layer, and later gains its own historical-phonology map.

### Example comparison (general teaching notation)

| Language and variety | Form | Illustrative IPA |
| --- | --- | --- |
| Reconstructed Classical Latin, accusative | noctem | /ˈnɔk.tɛm/ |
| Standard Italian | notte | /ˈnɔt.te/ |
| Standard Spanish | noche | /ˈno.tʃe/ |
| Standard Metropolitan French | nuit | /nɥi/ |

Phoneme strings illustrate broad contrasts; authentic speech varies by region and speaker. Teach Latin `-ct-` to Italian `-tt-` alongside Spanish palatalized developments, but do not suggest French inherited its sound from Italian. Separate reconstructed Classical Latin, later colloquial Latin and Italian-influenced ecclesiastical Latin. Pronunciation of a historical reconstruction should **never be presented as an actual ancient recording**.

### Data contract for each pronunciation sample

- `language` (BCP-47 where supported; `la` for Latin in metadata), `variety`, `period`, `form`, `ipa`, `stress`, `syllables`.
- `phonologyNote` with a short explanation of the key sound change; attach reliable sources and a confidence status.
- `audioMode`: `native_tts`, `verified_recording`, or `no_audio`; a trustworthy supported voice or licensed recording must be available before showing a working listen button.
- `playbackLocale`: e.g. `it-IT`, `es-ES`, `fr-FR` for modern languages when supported; **do not silently synthesize Latin with an Italian voice or label it authentic reconstructed Latin**.
- Avoid assuming two languages with identical spelling share pronunciation; allow explicitly selected varieties and accent-specific variants without flooding novice learners.

### Progressive delivery

- **Stage S1 (proposed v0.9):** introduce IPA display and optional modern-Italian sound playback for *a few curated knowledge-map items*. Check actual device `speechSynthesis.getVoices()` availability; show unavailable or text-only gracefully. Do not require network or audio for completing the Italian lesson.
- **Stage S2:** add optional recognition/listening probes only where actual comparable audio is available. No audio playback means **unmeasured listening**, not failure. Speech recognition, if ever added, cannot be presumed available offline or accurate.
- **Stage S3:** add phonetic contrast drills (listen, choose, repeat, compare), pitch/speed control only as supported by the voice source. Careful with synthesized slow speech changing timing quality.
- **Stage S4:** multilingual comparisons with language-appropriate modern TTS/verified clips and side-by-side IPA. Preserve individual language tags and accent labels. Latin audio only after a reliable reading convention and a compatible audio source are selected.
- **Stage S5:** interactive historical sound-change paths and variants with dated provenance; reconstructed pronunciation labeled as reconstruction throughout.

### Testing and rights

Test voice availability, default accent, offline availability, player interruption and retry on iPhone Safari/PWA. Voice assets, if hosted, need proper permission/license, size constraints and PWA cache budgeting. Never imply browser TTS availability or pronunciation accuracy just because the Web Speech API exists.
## Non-destructive rules

- The source of truth is current main code, not this document or conversation memory.
- Never clear or overwrite existing IndexedDB `piccola-italiano`, object store `data`, key `state`, schemaVersion 1; do not clear localStorage.
- Any future placement data is an additive optional field, backup-mergeable and labeled by source task, dimension, evidence type, scoring method, timestamp and whether self-assessed.
- No public upload of learner backups, no covert tracking and no unsupported official CEFR certification.
- Read AGENTS.md, PROJECT_HANDOFF.md, CHANGELOG.md, inspect main and test before editing code.
- Complete one stage, test its acceptance gate, then start the next.
