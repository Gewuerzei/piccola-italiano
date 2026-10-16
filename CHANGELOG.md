# Changelog · Piccola Italiano

历史版本的已完成工作记录。当前功能与施工规则请分别查看 [README](README.md) 和 [AGENTS](AGENTS.md)。

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
