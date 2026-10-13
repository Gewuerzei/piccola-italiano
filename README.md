# 🇮🇹 Piccola Italiano · v0.2.0

**Independent, local-first Italian-learning PWA** for Pietro. No dependency on the Cassola inventory/staff repository, its GitHub Pages, or Supabase.

## What is in v0.2.0

- 44 interconnected knowledge items (words, grammar, sentences, scenes) plus 25 scored language questions.
- 9 real-life role-play scenes, including 6 newly added stories (sushi shortage, Bassano small talk, right-of-way discussion, shift swap, car mechanic, neighbor complaint).
- 2–3 consecutive turns in the new stories. Write your reply, read example, self-grade each turn. Completed transcript and summary saved locally. **No AI grading.**
- Veneto words such as *schei*, *toso*, *ciacole*, *òcio* and *mona* have regional/register notes. Never treat slang as required formal Italian.
- **Operazione Patente B:** 14-day study plan with explicit start button, 28 manual completion checks, progress indicator and fixed end date based on the user's local date.
- 40 original educational true/false driving-theory examples, with a **30-question / 20-minute** random timed simulation, a 3-error threshold, automatic timeout, report and past results.
- Driving-program vocabulary is connected to the language knowledge graph where possible.
- Spaced review, mistake recording for language exercises, IndexedDB-first storage, JSON backup and non-destructive import merge including mission history.
- Responsive mobile/desktop, app manifest, offline cached shell, light/dark mode.

**Important:** The 40 driving questions are original study examples, **not the official ministerial exam question bank**. Finishing the 14 days or passing these demo simulations is not evidence of exhaustive theory coverage. Review the full updated question bank from the motor vehicle authority or an approved autoscuola.

Italian authority exam format: 30 vero/falso questions, 20 minutes, no more than 3 mistakes. Official reference: https://www.ilportaledellautomobilista.it/web/portale-automobilista/foglio-rosa-e-prove-new

## Local preview on a computer

Unzip. Enter the `piccola-italiano-v0.2.0/` folder and run:

```bash
python -m http.server 8080
```

Open `http://localhost:8080/`. On iPhone you need an HTTPS deployment such as GitHub Pages and **Safari → Share → Add to Home Screen**. Simply tapping the ZIP does not install a PWA.

## Deployment

See [DEPLOY_GITHUB.md](DEPLOY_GITHUB.md). A **new** repository is required; do not upload into `Gewuerzei/-Piccola`.

## Backups & migration

The on-device database is `piccola-italiano`, object store `data`, key `state`, data schema version `1` (extended additively with `mission`). An old v0.1 backup imports into v0.2; an updated v0.2 backup also includes mission history. Export frequently, especially on iOS. Backups can include personal text entered into scenes and should **not** be committed to a public repository.

Manual checkmarks indicate completion only by user's own confirmation. They do not track the ministerial full question bank. Study challenge starts on pressing **正式启动14天挑战**, not on opening/installing the app. It does not wipe records upon expiration.

## Known limitations

- Browser-embedded interaction tests passed, but navigation to `localhost` or `file://` was blocked in the test sandbox. Actual service-worker installation, IndexedDB persistence, background timer behavior and iOS Safari still require real-device validation after HTTPS deployment.
- No voice recognition, audio lessons, AI feedback, external question-bank synchronization or cloud backup in this version.
- An active mock exam does not survive page reload (finished exam results do persist if browser storage works). Do not rely on a demo score alone.
