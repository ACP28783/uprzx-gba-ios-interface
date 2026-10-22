# UPR ZX GBA Starter Randomizer (iOS Safari)

This project is an on-device browser implementation based on the uploaded Universal Pokémon Randomizer ZX 4.6.1 source and the existing iOS-friendly prototype.

## Current functionality

- Reads a `.gba` ROM locally in Safari.
- Detects and supports only these original retail revisions: Ruby (US/EU), Sapphire (US/EU), Emerald (US), FireRed (US 1.0/1.1), and LeafGreen (US 1.0/1.1).
- Uses the Gen 3 Pokédex-order pointer table to translate between internal species IDs and National Pokédex numbers.
- Randomizes the three starter choices, including the repeated FireRed/LeafGreen script references required by those games.
- Supports a deterministic seed and a preset that can include/exclude legendary and mythical Pokémon.
- Exports a new `.gba` file without modifying the original selected file.
- Caches the app shell and game offset database for offline use after first visit over HTTPS.

## Important limitations

**This is not full UPR ZX feature parity.** The current web engine only randomizes starters. It does not yet randomize wild encounters, trainers, static/gift Pokémon, base stats, types, moves, abilities, evolutions, items, TMs, trades, or other original desktop features. It should be considered an early functional port, not a release-quality replacement for UPR ZX. Test generated ROMs in an emulator and retain backups.

The ROM detector uses game code and revision byte plus structural pointer-table validation. This is not a cryptographic validation of a clean dump. Unsupported revisions, ROM hacks, and patched files are expected to fail validation. Do not use save files or ROMs you do not have the right to use.

## Publish from iPhone using GitHub Pages

1. Extract this ZIP in the iOS Files app.
2. In Safari, sign in to GitHub and create a repository.
3. Upload the *contents* of this folder to the repository root: `index.html`, `style.css`, `app.js`, `service-worker.js`, `manifest.webmanifest`, `rom-database.json`, `README.md`, and `UPRZX-LICENSE.txt`.
4. In repository Settings → Pages, choose Deploy from a branch, branch `main`, folder `/ (root)`, then save.
5. Open the GitHub Pages URL while online and allow it to finish loading. Add to Home Screen if desired.
6. Test the app offline after the first successful load. iOS may evict cached website data, so periodically open it online again.

## Local privacy

The app contains no upload endpoint, network API calls, analytics, or remote script dependencies. Its only network requests are same-origin app files used for loading and caching. The selected ROM is read via the browser File API and never intentionally sent to a server.

## Attribution and license

This work references Universal Pokémon Randomizer ZX 4.6.1. The upstream license text is included as `UPRZX-LICENSE.txt`. Preserve the license and attribution when redistributing. This is an independent project and is not affiliated with Nintendo or The Pokémon Company.
