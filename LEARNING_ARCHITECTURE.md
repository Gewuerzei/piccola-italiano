# Piccola Italiano · Learning Architecture

**Status:** Design Stage S0, 2026-10-16. Runtime remains v0.8.0. This is a design document, not a released feature.

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

## Non-destructive rules

- The source of truth is current main code, not this document or conversation memory.
- Never clear or overwrite existing IndexedDB `piccola-italiano`, object store `data`, key `state`, schemaVersion 1; do not clear localStorage.
- Any future placement data is an additive optional field, backup-mergeable and labeled by source task, dimension, evidence type, scoring method, timestamp and whether self-assessed.
- No public upload of learner backups, no covert tracking and no unsupported official CEFR certification.
- Read AGENTS.md, PROJECT_HANDOFF.md, CHANGELOG.md, inspect main and test before editing code.
- Complete one stage, test its acceptance gate, then start the next.
