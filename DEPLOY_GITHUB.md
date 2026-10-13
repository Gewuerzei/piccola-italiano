# Deploy Piccola Italiano on GitHub Pages (separate project)

1. **Create a dedicated repository** at https://github.com/new. Suggested name `piccola-italiano`, visibility Public. Do **not** choose `-Piccola` (it hosts Cassola production). You can initialize with README.
2. If ChatGPT's GitHub integration is installed with access restricted to selected repositories, authorize this newly created repository in the GitHub App installation configuration: https://github.com/settings/installations . Until it has permission, ChatGPT cannot push to the new repository.
3. Upload the content of this folder to the **root** of the new repository. Keep `index.html`, `app.js`, `content.js`, `mission.js`, `styles.css`, `sw.js`, `manifest.webmanifest`, and `icons/` in their relative paths. If uploading manually via GitHub web interface, drag these files and the `icons` folder contents, then commit to `main`.
4. In the new repository, open **Settings → Pages → Build and deployment → Deploy from a branch**. Choose `main` and folder `/ (root)` and save.
5. Wait for GitHub Pages to show its public URL (normally `https://YOUR-GITHUB-USERNAME.github.io/piccola-italiano/`). Open the actual URL in iPhone Safari, then use **Share → Add to Home Screen**.
6. Test offline after first online load; create a sample study record, reload and verify it still exists. Export a JSON backup before testing reinstalls or clearing browser data.

**Never commit personal study backups** (they may contain role-play response text). GitHub Pages with public repositories is public content; the PWA's local browser database is not part of the repository or published page.

**Connector limitation at build time:** Only `Gewuerzei/-Piccola` was visible to the connected GitHub integration. The connector cannot create repositories or enable Pages using its currently exposed actions. New repo creation and Pages source selection therefore require the user's one-time GitHub UI actions; after access is granted, the assistant can help with code uploads/updates if suitable operations are available.
