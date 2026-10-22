# UPR ZX GBA Randomizer Lab (experimental browser port)

This is a mobile-first, local-processing browser beta inspired by Universal Pokémon Randomizer ZX 4.6.1. It is **not full feature parity** with the Java project. It is intended for testing on copies of supported retail ROMs.

## Included experimental features
- Starter randomization, with per-slot manual species selection and mixed manual/random slots.
- Wild encounter species randomization for detected Gen 3 wild-table structures.
- Trainer party species randomization for common Gen 3 trainer party formats.
- Base-stat shuffle (keeps each Pokémon's total base stats), type randomization, ability randomization, level-up learnset move randomization, evolution destination randomization, and TM/HM compatibility randomization.
- Seeded choices, ROM remains unmodified in memory, and separate randomized ROM export.
- Service-worker app-shell caching for offline use after first online visit.

## Important limitations
- Advanced options are experimental. Do not assume the generated ROM is bug-free or balanced. Test with an emulator and retain clean backups.
- Some operations intentionally alter all applicable species records and can produce strange or unwinnable game balance. Evolution randomization changes destinations but does not preserve evolution families. Learnset randomization preserves level slots but not move learnability/balance. Ability randomization uses the Gen 3 ability ID range, but this is not a full semantic port of UPR ZX's ability logic.
- Trainer randomization replaces species in detected trainer party structures but does not port UPR ZX's boss/early-game restrictions, themed teams, held-item/move logic, or similar constraints. Static encounters, trades, in-game gifts, move tutors, field items, shop items, TM moves, type effectiveness, and all advanced UPR ZX rules are not implemented.
- ROM support is limited to header IDs listed in `rom-database.json`. Header matching alone cannot guarantee an unmodified retail dump. Hacks, translations, expanded ROMs, and unsupported revisions should be treated as unsupported.
- No automated real-ROM boot validation has been performed.

## GitHub Pages / offline setup
Upload the contents of this folder to the repository root, enable GitHub Pages for the main branch/root, open the HTTPS page once online, wait for it to finish loading, then Add to Home Screen. The app shell is cached for offline opening. ROM processing occurs locally in Safari; no ROM upload code is included.

## License and attribution
The included `UPRZX-LICENSE.txt` is the upstream license file from Universal Pokémon Randomizer ZX 4.6.1. Review its terms before redistributing derived code. This is not affiliated with Nintendo or The Pokémon Company.
