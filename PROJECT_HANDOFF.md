# PROJECT_HANDOFF · Piccola Italiano v0.7.0

- Repo: `Gewuerzei/piccola-italiano` (NOT `Gewuerzei/-Piccola`).
- PWA is local-first; IndexedDB name `piccola-italiano`, object store `data`, key `state`, schemaVersion=1.
- Do not clear Safari/IndexedDB/localStorage or overwrite user data during upgrades.
- Modules: content.js (seed), mission.js (14-day plan and timer), adventure.js (interactive story choices), bank.js (conservative user-file importer), app.js (app shell, persistence, actions), sw.js (cache v004).
- Importer intentionally rejects unrecognized official TXT format rather than guessing correct answers. JSON/CSV/TSV with explicit question and bool answer supported. Claiming an official fully imported bank requires a real downloaded file and parsed row-count validation.
- Stories provide scored selections, **not AI evaluation**. XP rewarded once per chapter step correctly chosen and once per completed episode, capped.
- Repo deployment: index.html/styles.css/app.js/content.js/mission.js/adventure.js/bank.js/manifest.webmanifest/sw.js/icons/*.
- Real iPhone offline, voice synthesis and storage persistence need device-level verification.

- v0.4 adds `archaeology.js` with ETYMOLOGY and MYSTERIES; includes sources from Treccani. Root dossiers are linked from knowledge detail cards.
- `state.mysteries` is additive: `completed`, `firstSolve`, `logs`. Merge backup gently. `ui.rootsReturn` holds temporary in-session puzzle state when opening a reference card.
- Never scrape/redistribute the Treccani definitions; v0.4 contains brief authored etymology descriptions and source links. Original v0.3 contents and current 14-day task preserved.
- v0.5 adds `excavation.js`: pushes 16 dossiers and 4 cases into `ETYMOLOGY`/`MYSTERIES`, and introduces 12 root inference puzzles under the archive + adventure panel. File must load after archaeology.js and before app.js.
- `state.mysteries.inferences` is an additional plain-object field, not a schema bump. Keep all existing progress and unknown local data. Import merges solved flags only (no destructive reset).
- The new 15-word seed and 15 language quiz items live in `content.js`; they are not certified road-test questions. Source links in dossiers point to Treccani entries.
- Cache `piccola-italiano-v005`, current display version 0.5.0. JS syntax and mocked puzzle-flow tests passed; iPhone/IDB persistence and service worker update need live-device validation.

- v0.6: 12 added dossiers and 3 three-stage medieval document cases in `codex.js`; load after `archaeology.js` and `excavation.js`, before `app.js`.
- Browser theme cycles `light` → `dark` → `codex` → `light`. Existing `settings.theme` values continue working. No database schema upgrade or destructive migration.
- New seed knowledge and language drills appended in `content.js`; all old IDs/progress remain intact.
- SW cache: `piccola-italiano-v006`; old caches may be deleted by service worker, **but never clear IndexedDB / localStorage**.
- Verify all live JS assets, Pages build, phone appearance, offline cache, and imported bank state before claiming full iPhone verification.

## v0.7 · Cancelleria (2026-10-14)

- New independent `chancery.js` script (after `codex.js`, BEFORE `app.js`): six original fictional medieval city-state disputes, 24 evidence notes, 18 witness statements, 12 typed language puzzle checks, three unique verdict choices per case and lasting outcomes. Historical settings are fiction; Italian clauses are **modern teaching paraphrases**, not claimed authentic medieval Italian.
- `chancery.js` appends twelve `EXTRA_SEED` lexical entries and twelve `EXTRA_EXERCISES` entries before app.js consumes them; do not move script after app.js.
- New state field `state.chancery={cases:{},logs:[]}`, additive under same IndexedDB `piccola-italiano`, store data/key state/schemaVersion=1. No clearing/replacing preexisting data. Progress records contain evidence[], witnesses[], answers{}, first decision, completedAt and logs; points derived from first judgments only; verdict cannot be changed or farmed.
- Backup import merges known-case evidence/witnesses/puzzle answers and only validates/restores first judgment after prerequisites are met. Existing local decisions are never overwritten by importing older/different backup.
- Entry buttons on Home and Adventure panel; active case screen: dossier/evidence/witness/language/verdict, link to existing etymology with return bridge.
- Scoped parchment CSS in `styles.css` works even if user keeps light/dark theme. Service worker `piccola-italiano-v007`, caches new script; no remote API.
- No official B1 driving bank auto-import or official-question provenance claim. iPhone offline / IndexedDB must be verified on device. Last static and mock-action tests passed, but device interaction remains unverified.
