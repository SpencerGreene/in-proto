# Restricted Dataset Management

Plaintext data files in this directory are **not bundled** into the app. They are encrypted by a build script, and only the encrypted blobs ship in the bundle.

## Files

- `mc-thailand.ts` — MC Thailand dataset (projects + dimensions)
- `nlm.ts` — NLM dataset (projects + dimensions)

Each file exports `label`, `dimensions`, and `projects`.

## Editing data

1. Edit the `.ts` files in this directory
2. Run `npm run encrypt-data`
3. This regenerates `src/app/portfolio-list/encrypted-data.ts`
4. Commit both the updated source file and the regenerated `encrypted-data.ts`

## Adding a new restricted dataset

1. Create a new `.ts` file in this directory exporting `label`, `dimensions`, and `projects` (follow the structure of existing files)
2. In `scripts/encrypt-data.ts`, import the new file and add it to the `datasets` array
3. Run `npm run encrypt-data`
4. Commit the new source file, the updated script, and the regenerated `encrypted-data.ts`

## Changing the password

1. Edit the `PASSWORD` constant in `scripts/encrypt-data.ts`
2. Run `npm run encrypt-data` — this re-encrypts all datasets with the new password and updates the hash
3. Commit the updated `scripts/encrypt-data.ts` and `encrypted-data.ts`

## How it works

- The script derives an AES-256-GCM key from the password using PBKDF2 (100k iterations, SHA-256)
- Each dataset is encrypted with a unique IV; all share one salt
- A SHA-256 hash of the password is stored for quick client-side validation before attempting decryption
- At runtime, the browser uses the Web Crypto API to derive the same key and decrypt
- Auth state lives in React context (in-memory only) — resets on page refresh and auto-expires after 30 minutes
