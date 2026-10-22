# UPR ZX iOS Web Prototype (GBA priority)

## Current feature status
This iPhone-friendly browser app supports **starter randomization and manually selecting individual starter Pokémon** for the game revisions listed below. It is not yet a full port of Universal Pokémon Randomizer ZX.

- Load a supported `.gba` ROM in Safari.
- Set any of the three starter slots to a specific Pokémon, leaving other slots set to Random.
- Prevent duplicate manually selected Pokémon; random slots are filled without duplicating fixed selections.
- Optionally include legendary/mythical Pokémon in the random pool and exclude the ROM's current starters from random choices.
- Use a seed to reproduce the same choices with the same ROM/settings.
- Export a separate `-starters.gba` file. The original selected file is not changed.

The implementation currently changes starter references only. Wild encounters, trainer parties, stats, types, moves, abilities, evolutions, items, and other UPR ZX features are not implemented. Output has not been exhaustively validated against real retail ROM dumps, so keep backups and test the result in an emulator before relying on it.

The supplied Universal Pokémon Randomizer ZX 4.6.1 source is a Java desktop project. Full GBA feature parity requires porting and validating the Gen 3 ROM handler and its dependencies, including species/data tables, binary utilities, randomization rules, and patching logic. Replacing the Swing interface alone is not sufficient.

## Privacy and offline behavior
- ROM bytes are read in Safari on the iPhone. This prototype has no code that uploads ROMs.
- The service worker caches the app shell (HTML, CSS, JavaScript, and manifest) after the first successful visit over HTTPS.
- Once cached, the **prototype interface** can open offline. This does not add the missing randomization engine.
- The app shell does not intentionally cache the selected ROM or generated output.

## iPhone-only setup using GitHub Pages
You can do this from Safari; no computer is required. GitHub's mobile interface can change, so labels may differ slightly.

1. On the iPhone, download and extract `uprzx-ios-web-prototype.zip` in the Files app.
2. In Safari, sign in at GitHub and create a new **public** repository, for example `uprzx-gba-web`. Do not initialize it with a README if GitHub offers that choice.
3. Open the new repository, choose **Add file → Upload files**, and upload the contents of the extracted `uprzx-ios-web` folder. Upload these files at the repository root: `index.html`, `style.css`, `app.js`, `manifest.webmanifest`, and `service-worker.js`. Upload `README.md` too if desired. Do not upload the ZIP as the only file.
4. Open repository **Settings → Pages**. Under build/deployment, select **Deploy from a branch**, choose `main` and `/ (root)`, then save.
5. Wait for GitHub Pages to publish, then open the Pages URL in Safari. Visit it while online and wait for the page to finish loading so the service worker can cache the app shell.
6. In Safari, tap **Share → Add to Home Screen**. Open it once while online, then test airplane mode.
7. Use **Choose ROM from Files**. The selected ROM is read locally, and starter edits are made in browser memory. Save the output through the generated download link.

If the upload UI does not let you select several files at once, add them one by one using **Add file → Create new file** or the repository's upload interface. Ensure the five runtime files are in the repository root, not nested inside another folder.

## Supported header IDs in this prototype
The current list includes common IDs for US and Japanese versions of FireRed, LeafGreen, Emerald, Ruby, and Sapphire. A matching game code is not proof that a ROM revision is supported by a future randomization engine.

## Original source and attribution
This prototype was developed with reference to Universal Pokémon Randomizer ZX 4.6.1. Consult the original project's `LICENSE.txt` for applicable license terms. This project is not affiliated with Nintendo or The Pokémon Company.
