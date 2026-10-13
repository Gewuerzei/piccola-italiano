# Piccola Italiano v0.3.0 · Storie & Patente

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