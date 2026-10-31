# Changelog · Piccola Italiano

历史版本的已完成工作记录。当前功能与施工规则请分别查看 [README](README.md) 和 [AGENTS](AGENTS.md)。

## 0.15.0 · 2026-10-31

- Completed starter micro-lessons for all L1–L3 units: 27 lessons and 324 original questions across the fixed 40-unit catalogue. Added two isolated content files with 24 lessons / 288 questions; retained the original pronoun IDs. Thirteen L4–L5 units remain planned.
- Generalized adaptive selection from hard-coded pronouns to four named learning focuses per lesson. Each eight-turn session balances objectives, preserves bounded repair, and distinguishes recognition, constrained production, assistance and skipped questions.
- Added optional mixed review with a persisted eight-question plan drawn from practiced courses, prioritizing recent difficulties and fresh equivalents. Cross-course review does not mark whole courses complete.
- Added durable per-lesson records alongside the rolling 60-run history. Additive v0.14 recovery and validated backup merging preserve prior course evidence, local active sessions and all legacy schema-1 fields.
- Generalized question labels and inputs, replaced a growing course-card wall with five collapsible route sections, and added honest practiced/due markers. The homepage retains one primary learning action.
- Added manually requested Italian system speech for examples and answer feedback, matching available Italian voices and falling back to text without changing evidence. Listening, speaking and free writing remain unmeasured.
- Accepted harmless nonnumeric commas while preserving grammatical accents and word order. Cross-reviewed both new content packs and corrected legitimate elision/word-order variants and overly broad prompts.
- Added PROJECT_PLAN and COURSE_AUTHORING to fix product priorities, module boundaries and authoring scope. Added a single `scripts/check.cjs` entry point: content-only validation for course edits; full behavioral validation for runtime/state changes. Reduced recurring handoff material and replaced blanket manual rereview with scope-based work.
- Validation: content contracts plus 38 behavioral checks pass; the parameterized teaching gate covers 432 complete lesson paths. New continuity tests cover history rollover, record-only imports, identity collisions, mixed-plan persistence, source membership, upgrade routing and audio fallback. Real iPhone/device offline and speech verification remain separate.
- Updated runtime to 0.15.0 and cache to `piccola-italiano-v0150`; all course content is included in the offline asset list.

## 0.14.0 · 2026-10-31

- Added `COURSE_BLUEPRINT.md` and `course-data.js`: a 40-unit curriculum skeleton with stable IDs, prerequisites, observable goals and links to all 25 existing map nodes. Three units are ready; 37 are explicitly planned. Modern Italian core has 34 units and optional exploration has six.
- Added three original present-tense micro-lessons for direct object pronouns, contextual reference and negation: 36 questions balanced across lo/la/li/le, recognition, gaps and constrained sentence rewriting.
- Added `auto.js`, `auto-view.js` and `auto.css`: a primary homepage learning action, one question at a time, concise explanations, hints, bounded adaptive scaffolding, eight-turn sessions, summaries and a read-only full catalogue. Earlier activities remain under an optional exploration section and their existing navigation.
- Added optional `state.autoTutor` within schema 1 for active lessons, saved feedback/drafts and the latest 60 completed runs. Import revalidates question references and answer evidence, rejects malformed/duplicate records, preserves local active sessions and can restore a valid backup session when none is active.
- Hints and automatic worked examples are recorded as assisted practice. Skips are not wrong answers; repeat clicks do not earn duplicate evidence. Recognition and constrained writing are separated from unmeasured listening, speaking and free writing. Weak lessons can receive one immediate repeat; review suggestions use a transparent 1–2 day heuristic.
- Added dependency-free `tests/regression.cjs` and `tests/auto.cjs`: 30 checks pass, including 48 full-session paths, prior-module compatibility, persistence and non-destructive backup merging. Real iPhone Safari/PWA and device offline/audio testing remain separate.
- Verified the deployed application in Chrome: a complete eight-turn mixed session, adaptive choice-to-text progression, specific error feedback, assisted-answer labeling, skip/summary, catalogue navigation, and draft-preserving pause/reload/resume. Real iPhone device behavior remains unverified.
- Updated application version to 0.14.0 and Service Worker cache to `piccola-italiano-v0140`; all new runtime files are precached. Existing knowledge IDs, progress, IndexedDB and localStorage records are retained.

## 0.13.0 · 2026-10-16

- Added `transfer.js` / `transfer.css` with six original multiple-choice transfer exercises and explanations of historical sound correspondences, functional grammar comparisons and false friends.
- Users can skip without penalty, restart, or jump to a related bridge. Answers stay in ephemeral UI state; no grade, XP, progress or database changes.
- Added homepage entry and PWA precache v0130. Browser/device interaction QA remains pending.

## 0.12.0 · 2026-10-16

- Added `bridges.js` / `bridges.css`: read-only four-card Romance comparison studio with three historical cognate sets (noctem, octo, lactem) and one non-equivalent necessity-construction comparison.
- IPA and optional installed-voice TTS for modern Italian, Spanish and French; reconstructed Classical Latin is labeled and has no audio. Notes distinguish inherited words from similar modern grammar functions.
- External reference entry links included; examples are teaching selections, not a completed source-by-source scholarly audit. Device voice/IPA QA remains pending.
- Bumped offline cache to `piccola-italiano-v0120`; existing IndexedDB schema and learner data unchanged.

## 0.11.0 · 2026-10-16

- Added `pathway.js` / `pathway.css`: five explainable recommendations using curriculum prerequisites, utility tags and optional latest limited placement evidence.
- Added homepage entry, knowledge-map deep links and placement navigation. Recommendations are heuristic and read-only, not CEFR placement or certified learning outcomes.
- Updated offline cache to `piccola-italiano-v0110`; IndexedDB schema unchanged. iPhone device QA pending.

## 0.10.0 · 2026-10-16

- Added `placement.js` / `placement.css`, an optional fictional chancery orientation with 15 authored questions across reading, grammar and lexicon; each session selects four prompts per dimension by a simple response-dependent rule (12 selections total).
- Added a final written appointment-change prompt. Learners type locally, compare with an example and self-rate; raw writing is not persisted, and this is not AI grading.
- Added skips with no wrong-answer penalty, automatic in-session difficulty adjustment, pause/resume, simple answer evidence with timestamps, and limited result history.
- Results distinguish the three observed quiz areas from self-rated writing, while marking listening and spoken production unmeasured. All levels refer to question difficulty, not CEFR proficiency; the task bank is small and uncalibrated.
- Added optional `state.placement` and conservative merge of completed runs from JSON backups; old IndexedDB schema 1 and earlier module data remain unchanged.
- Updated PWA cache to `piccola-italiano-v0100`. JS unit/mock checks passed; iPhone Safari/PWA device testing pending.

## 0.9.0 · 2026-10-16

- Added `curriculum.js`/`curriculum.css`: 25-node, five-layer read-only knowledge map, prerequisites, existing knowledge card links and utility metadata.
- Entry points on Home and Library with layer tabs and node-detail navigation. No new learner level, score, persistence field or false adaptive-assessment claim.
- Added a `Latino in tasca` sound lab preview: reconstructed Classical Latin IPA for noctem, modern Italian notte, Spanish noche and French nuit. Optional browser TTS for modern languages is attempted only with a matching installed voice; no fabricated ancient recording.
- Validated graph references and acyclicity; JS syntax and synthetic map rendering passed. Real iPhone Safari/offline/audio testing remains outstanding.
- Preserved IndexedDB schemaVersion=1, existing study progress and all earlier game modes. Service Worker cache v0090.

## 0.8.0 · 2026-10-14

- Added `Italiano Vivo` four-mode offline practice module (`vivo.js`, `vivo.css`): 12 NPC dialogue turns across four life scenes, 6 circumlocution challenges, 6 grammar repair tasks, and 6 root-to-modern-word tasks (30 prompts total).
- Free-form answers compare against examples with transparent learner self-rating, not AI grading; constrained word answers use normalized exact matching and feedback.
- Per-task first-success records and bounded attempt history under `state.vivo`; added non-destructive import merge of vivo records. IndexedDB schema remains 1; prior learning records and modules are untouched.
- Added entry points on home and practice screens, adapted mobile styling, PWA pre-cache and Service Worker v0080.

## 0.7.1 · 2026-10-14

- Hotfix: removed accidental sparse entry in `content.js` caused by `},,`, which made the home-page metrics throw `TypeError` and display “初始化失败”.
- Guarded built-in seed/exercise imports against invalid empty items. Preserved all existing learner data and IndexedDB schema 1.
- Updated `content.js` and `app.js` script URLs with cache-busting query strings; advanced Service Worker cache to `piccola-italiano-v0071` so iPhone users can recover without clearing storage.

## 0.7.0 · 2026-10-14

- Added fictional historical chancery interactive investigations (six dossiers, 24 evidence fragments, 18 witness accounts, 12 written clause checks, 18 possible verdict endings).
- Added scoped parchment UI, evidence notebook, civic standing ledger and no-farming first verdict persistence.
- Added twelve linked vocabulary cards and twelve related language practice questions.
- Non-destructive state import and local persistence for chancery cases; IndexedDB schema stays 1.
- New offline asset `chancery.js`; service worker cache v007. Does not import or claim official driving bank data.

## 0.6.0 · 2026-10-14

- Optional Codex parchment theme with paper/ink visual treatment for language archaeology and mysteries.
- Twelve medieval-document etymology dossiers; three new mysteries (9 total), and nine new puzzle stages.
- Twelve linked vocabulary cards and ten language exercises; all v0.5 content retained.
- Added codex.js and SW cache v006, no schema migration or data reset.
- Official theory-question bank is still not verified/imported.

## 0.5.0 · 2026-10-14

- 16 checked etymology dossiers added; 24 total. Source links included in each record.
- Four new three-stage clue mysteries; six total.
- 12 typed root-inference puzzles with hints and local completion records.
- 15 new linked learning entries and 15 additional language exercises.
- Local-first backup merge extended for root puzzle history; database schema unchanged.
- PWA cache v005 and offline asset pre-cache updated.
- No official theory-question bank imported or redistributed.

## 0.4.0

- Etymology archive and the first two three-stage mysteries.

## 0.3.0

- Scene adventure, original scored episodes, driving bank import interface.
