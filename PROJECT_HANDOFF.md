# Piccola Italiano · v0.2.0 handoff (2026-10-13)

- Separate from the Cassola inventory/staff PWA and Supabase. Do not edit `Gewuerzei/-Piccola` for Italian learning deployment.
- Present bundle status: local independent PWA source package, not yet deployed. GitHub connector currently shows only `-Piccola`, no repository creation or Pages settings action. User must create a dedicated repo and grant connector access; assistant may then upload files.
- Modules: 44 linked knowledge items, 25 language exercises, 9 scenes (6 new multistep), 14-day patente B mission (14 chapters, 2 checks/day), 40 original driving Qs, timed 30Q/20min exam, results history, review and local backups.
- Files: `index.html`, `styles.css`, `app.js`, `content.js` (new seed+exercise+mission data), `mission.js` (mission UI/actions/timer), `sw.js`, `manifest.webmanifest`, `icons/`.
- Data: schemaVersion remains 1. v0.1 and v0.2 both store in IndexedDB `piccola-italiano/data/state` with fallback localStorage `piccola-italiano-state`. v0.2 adds `mission: { startedAt, checks, tests }`; original records remain untouched. User backups version-tagged via `appVersion` and unchanged `format`.
- Merge import handles mission start date, checks for the same mission start, unique-by-id tests. Local chosen mission is retained if incoming start date differs. Never silently clear or replace local data.
- Scenes support old one-turn format and new `scene.steps[]`. Self-rating only; no AI grading, no API keys.
- The driving questions are original educational examples, **not official ministerial question bank**. UI explicitly flags this and links the Italian authority's official exam rules. Do not represent exam scores as a guarantee of readiness.
- Test: Chromium via inline page injection because runtime navigation to local HTTP/file URLs is blocked. Main view, 3-turn scene and saved transcript, 14-day task activation/checks, simulated exam scoring and timeout all passed with zero uncaught JS errors. Real-service-worker/iPhone HTTPS behavior untested.
- Future: (a) deploy separate GitHub Pages repo; (b) test offline/IndexedDB/backup import on iPhone; (c) official chapter coverage with legally obtained up-to-date quiz questions; (d) optional voice and supervised AI feedback with a secure backend.
- Official exam rules source: https://www.ilportaledellautomobilista.it/web/portale-automobilista/foglio-rosa-e-prove-new
