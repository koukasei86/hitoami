# Hitoami maintenance instructions

## User's standing request

Every time this app is edited or updated, also reflect the finished changes in its GitHub repository. The requested destination is the public repository `https://github.com/koukasei86/hitoami` (branch `main`), explicitly authorized by the user. Check `GITHUB.md` for the verified destination and setup status; do not claim synchronization succeeded until GitHub confirms it.

- Preserve the existing Sites project ID and its private audience. Use the Sites skill for app edits and deployments.
- After relevant checks pass, save the same finished application source and assets to GitHub, including documentation and this instruction file.
- Use the GitHub connector when no authenticated Git CLI is available. Read the current remote branch before updating. Preserve unrelated remote changes; do not force push.
- Do not replace the Sites source repository with GitHub. They are separate destinations.
- Never upload `.env`, API keys, credentials, browser data, user photos, localStorage, scratch files, or `.git`. `.env.example` with blank credentials is allowed.
- Verify the saved GitHub commit and report its repository or commit link. If authorization or a connection prevents saving, explicitly report that GitHub is not yet updated.
- This is a standing workflow for future agent edits, not a background file watcher. Do not describe it as unattended automatic synchronization unless such infrastructure is actually installed and verified.

## Project

Static JavaScript app in `dist/`; run with `node server.mjs`. Relevant core checks: `node --test tests/core.test.mjs`. Use mobile browser checks for UI changes. Keep stable project/step IDs to preserve saved progress.
