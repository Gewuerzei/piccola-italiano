# PROJECT_HANDOFF · Piccola Italiano v0.4.0

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