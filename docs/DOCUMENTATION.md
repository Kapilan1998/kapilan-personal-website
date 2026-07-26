# Work Log

Running log of work done on this project. Add a new entry at the top for each work session, newest first.

---

## 2026-07-26

- Analyzed the full project (folder structure, tech stack, dependencies, code conventions, data/state handling, env vars, build/deploy setup).
- Created `docs/ARCHITECTURE.md` — living technical reference document.
- Created this file, `docs/DOCUMENTATION.md`, as the single running work log.
- Ran `npm audit fix`, reducing vulnerabilities from 13 to 7 (remaining ones require breaking changes with no clean fix currently available — see below).
- Attempted `npm audit fix --force`: reverted the resulting `eslint@10.8.0` bump (invalid peer dep with `eslint-plugin-react-hooks@5.2.0`) back to `eslint@^9.39.5`. Attempted `react-router-dom@^7.18.1` but reverted to `^6.30.4` since v7.18.1 carries its own unresolved high-severity CSRF advisory with no patched version yet.
- Approved pending install scripts for `@swc/core` and `esbuild` via `npm approve-scripts` (recorded in `package.json`'s `allowScripts`).
- Verified `npm run lint` — passes with the same 12 pre-existing issues as before (unrelated to dependency changes).
- `npm run build` initially failed locally: Windows Application Control policy blocks the freshly-installed `@swc/core` native binary after a clean `node_modules` reinstall. Root cause traced to **Smart App Control** (Windows 11) being enabled on this machine, blocking the unsigned native SWC/esbuild binaries.
- Resolved: user disabled Smart App Control (Settings → Privacy & security → Windows Security → App & browser control), then did a clean `rm -rf node_modules package-lock.json && npm i`. `npm run build` and `npm run dev` both confirmed working afterward.
- Remaining non-blocking notes from the clean install: deprecation warnings for `three-mesh-bvh` (used by `@react-three/drei`/`fiber`) and `recharts` (2.x branch no longer active, v3 available) — no action needed now, just candidates for a future dependency bump. Also a Vite bundle-size warning (~1.44 MB main chunk) — optional future optimization via code-splitting/dynamic imports for the 3D/animation-heavy sections.

---
