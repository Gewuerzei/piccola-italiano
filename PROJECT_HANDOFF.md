# PROJECT_HANDOFF · Piccola Italiano v0.3.0

- Repo: `Gewuerzei/piccola-italiano` (NOT `Gewuerzei/-Piccola`).
- PWA is local-first; IndexedDB name `piccola-italiano`, object store `data`, key `state`, schemaVersion=1.
- Do not clear Safari/IndexedDB/localStorage or overwrite user data during upgrades.
- Modules: content.js (seed), mission.js (14-day plan and timer), adventure.js (interactive story choices), bank.js (conservative user-file importer), app.js (app shell, persistence, actions), sw.js (cache v003).
- Importer intentionally rejects unrecognized official TXT format rather than guessing correct answers. JSON/CSV/TSV with explicit question and bool answer supported. Claiming an official fully imported bank requires a real downloaded file and parsed row-count validation.
- Stories provide scored selections, **not AI evaluation**. XP rewarded once per chapter step correctly chosen and once per completed episode, capped.
- Repo deployment: index.html/styles.css/app.js/content.js/mission.js/adventure.js/bank.js/manifest.webmanifest/sw.js/icons/*.
- Real iPhone offline, voice synthesis and storage persistence need device-level verification.