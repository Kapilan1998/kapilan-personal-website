# Work Log

Running log of work done on this project. Add a new entry at the top for each work session, newest first.

---

## 2026-07-28

Content refresh of the portfolio to reflect ~6 months of skill/experience growth since the last update (project was last touched mid-Jan 2026), ahead of new job applications. Also added `.env.example`.

**Hero (`Hero.tsx`)**
- Title changed from "Backend & DevOps Engineer" to "Full Stack & DevOps Engineer".
- Rotating `roles` list: added "Full Stack Developer" and "Node.js Backend Developer".
- Description paragraph: "backend development with Spring Boot" → "full stack development with React, Node.js, and Spring Boot" (years-of-experience figure kept at 3.5, per explicit instruction not to bump it yet).
- Profile photo enlarged responsively: `w-44/md:w-52/lg:w-60` → `w-48/md:w-60/lg:w-72`.

**About (`about/AboutContent.tsx`, `about/Journey.tsx`, `about/Highlights.tsx`)**
- Header tagline changed to "Full Stack Engineering, Backed by DevOps"; subtitle shortened after a follow-up request.
- "My Expertise" bio rewritten around the user's cover letter: CodeLantic (Trainee → Associate SE) foundation, HomeIt System backend (Node.js/Express, Redis, Kafka) + frontend (Next.js/React) work, and a DevOps/security bullet list. Confirmed Spring Boot work continues at HomeIt (not dropped). "CodeLantic" styled purple, "HomeIt System" kept green — link to `homeit-system.com/de` was added then removed per request (plain text now, no hyperlink).
- Highlight cards renamed/rewritten: Backend Development → **Full Stack Development**, Cloud & DevOps → **Cloud & Infrastructure**, System Architecture → **DevOps Automation** (now names Cronicle, AWS/Kubernetes as foundational-level only), Automation & Monitoring → **Security & Observability** (now names Tailscale, PatchMon — no URLs per request).

**Skills (`Skills.tsx`)**
- Discussed adding Express.js (Backend) and Supabase (Databases) for consistency with About's claims — user declined Supabase and declined the broader gap list (Redis/PatchMon/Cronicle/pfSense-HAProxy/TypeScript) for now.
- User separately uncommented previously-disabled entries themselves: Nexus Repository, Tailscale, GitHub Actions, Wazuh, Crowdsec, Apache Kafka.
- Discussed swapping Postman for Redis in Tech & Tools; recommended against it (Postman is a standard expected keyword; Redis fits Databases conceptually better) — not applied, still just a suggestion on the table.

**Experience (`Experience.tsx`)**
- HomeIt System location changed to "Remote (Germany)" to reflect the remote arrangement with a Germany-based company.
- Analyzed the cover letter against the existing HomeIt System bullets/tags and identified gaps: Node.js/Express/Redis/Kafka, Next.js/React frontend delivery, core networking fundamentals, AdGuard, AWS/Kubernetes, and the whole security stack (Wazuh, CrowdSec, Headscale/Tailscale, PatchMon) were missing. User asked to add all of them.
- Rewrote the HomeIt System description bullets and technologies tags to cover all identified gaps (grew from 8→11 bullets, 11→24 tags at first; user has since trimmed/adjusted some wording directly, e.g. dropped the standalone Redis/Kafka bullet and Java 21/React mentions in a couple of lines).
- Reconciled a discrepancy: Checkmk alerting changed from "email" to "real time Google Chat alerting" per the cover letter.
- Split the combined Ansible/Hetzner + AWS/Kubernetes bullet into two separate bullets for clarity.

**Projects (`Projects.tsx`)**
- Added two new projects, both without public GitHub/live/docs links (private client work): **Point-of-Sale & E-Commerce Platform** (Full Stack — React/TypeScript, Express, PostgreSQL/Supabase, jsPDF, SheetJS, Nginx/Cloudflare) and **Cleaning Services Booking Website** (Frontend — Next.js App Router, React, TypeScript, Tailwind CSS).
- Added support for bullet-point project descriptions (array of strings) alongside the existing paragraph-string format, so new/future projects can render as bullets like the Experience section, without touching the other 10 existing projects.

**Environment**
- Confirmed `.env` was already git-ignored and never committed (no secret leak). Added `.env.example` with a dummy `VITE_WEB_ACCESS_TOKEN` value as a safe-to-commit template.

**Standing note**: user requires all styling/UI changes to be verified responsive across mobile/tablet/desktop — saved to assistant memory.

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
