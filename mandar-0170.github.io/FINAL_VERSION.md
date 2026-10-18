# Approved final portfolio

The user approved the website as it stood on 18 October 2026, including the finishing pass with the VProfile architecture explorer and the new mp. favicon. The user explicitly approved this updated version as final. This is the designated rollback version. Suggestions made afterward are proposals only until the user asks to implement them.

## Saved checkpoint

- Archive: `.portfolio-checkpoints/final-2026-10-18-with-favicon/portfolio-final.zip`
- Integrity manifest: `.portfolio-checkpoints/final-2026-10-18-with-favicon/manifest.json`
- Restore utility: `.portfolio-checkpoints/final-2026-10-18-with-favicon/restore.py`

The archive contains 102 project files, including HTML, CSS, JavaScript, images, fonts, vendor files, favicon assets, configuration, and the existing design notes. Operating-system metadata is excluded. This document, AGENTS.md, and checkpoint tooling are excluded from the snapshot and do not change the website.

The earlier `.portfolio-checkpoints/final-2026-10-18/` backup is retained unchanged for history. Future requests to revert to the final version use the favicon-inclusive checkpoint above.

Never overwrite or replace this checkpoint with a later experiment. A new design becomes the rollback baseline only if the user explicitly approves that change.

## Verify or restore

Run from the project directory:

```sh
python3 .portfolio-checkpoints/final-2026-10-18-with-favicon/restore.py
```

This checks the archive and compares saved files against the current project without changing anything.

When the user asks to revert to the approved final version:

```sh
python3 .portfolio-checkpoints/final-2026-10-18-with-favicon/restore.py --restore
```

The utility validates the archive, saves current versions of files that will be replaced into a timestamped archive, restores the saved files, and verifies their hashes. Files introduced after this checkpoint are left in place to avoid deleting unrelated work; review any such experimental files separately. Refresh the local browser afterward and check the restored site.

The archive is a local rollback copy, not an off-device backup. Keep checkpoint files out of a public deployment package.
