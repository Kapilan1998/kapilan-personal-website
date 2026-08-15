# Work Log

Running log of work done on this project. Add a new entry at the top for each work session, newest first.

---

## 2026-08-15

Performance investigation and optimization of the deployed site (`kapilan-personal-website.vercel.app`), triggered by the user noticing slow page loads and sharing a Chrome DevTools Network tab screenshot + screen recording.

**Diagnosis** (from the Network tab screenshot — the video itself couldn't be processed since binary video files can't be read directly):
- 49 requests, 4.4 MB uncompressed, DOMContentLoaded/Load at 13.82s, fully finished at 18.90s — roughly 5-6x slower than a healthy target (~2-3s).
- Biggest issues found: the HTML document itself took 6.49s (TTFB-type issue, flagged as needing separate hosting-side investigation, not a code fix); `kapilan.png` profile photo was 1.55 MB despite displaying at ≤288px; Google Fonts CSS took 6.78s for a 1.4KB file (queued behind the huge image, plus a render-blocking `@import` chain); `favicon.ico` was 163KB (should be a few KB); ~25 separate external requests to `cdn.jsdelivr.net` for tech-stack icons, each adding connection/queuing overhead; main JS bundle was 444KB transferred (matches the earlier build warning about a 1.4MB unsplit bundle, largely from bundling `three.js`/`@react-three` eagerly with everything else).

**Fixes applied:**
- **Image optimization**: converted `public/kapilan.png` (1.55MB, 864×1091) to `public/kapilan.webp` (52KB) via a temporary local `sharp` install (not added to `package.json`) — a 96.6% size reduction. Updated all 3 references (Hero.tsx `<img>`, `og:image`, `twitter:image` in `index.html`) and corrected the declared `og:image:width/height` to the new 700×884 dimensions. Deleted the original oversized PNG. Added `fetchPriority="high"` to the Hero image tag since it's the LCP element.
- **Favicon**: regenerated a proper small favicon set from the source photo (`favicon.ico` 4.3KB via a temporary `png-to-ico` install, plus `favicon-32x32.png`, `favicon-192x192.png`, `apple-touch-icon.png`) replacing the old 245KB `favicon.ico`. Added explicit `<link rel="icon">`/`<link rel="apple-touch-icon">` tags to `index.html` (previously relied on the browser's implicit `/favicon.ico` request with no `<link>` tag at all).
- **Font loading**: moved Google Fonts loading out of `src/index.css`'s render-blocking `@import` into `index.html` `<link rel="preconnect">` + `<link rel="stylesheet">` tags, so the browser discovers and fetches fonts in parallel from the start of HTML parsing instead of nested inside another CSS file.
- **Code-splitting the 3D scene**: converted the `FloatingGeometry` (Three.js/`@react-three/fiber`/`@react-three/drei`) import in `Hero.tsx` to `React.lazy()` wrapped in `<Suspense fallback={null}>`. Build output confirms this split the ~1.4MB unified bundle into a 618KB (208KB gzip) main bundle + an 824KB (222KB gzip) separate `FloatingGeometry` chunk that loads non-blocking after first render — roughly a 51% cut in critical-path JS.
- **Self-hosted tech-stack icons**: downloaded all 25 active devicon SVGs referenced in `Skills.tsx` from `cdn.jsdelivr.net` into `public/icons/` and updated every reference to local paths (`/icons/java.svg`, etc.), removing ~25 external third-party requests in favor of same-origin assets served alongside the rest of the build.
- Verified `npm run lint` (same 12 pre-existing issues, no new ones), `npm run build` (succeeds, bundle split confirmed), and `npm run preview` (spot-checked `index.html`, `kapilan.webp`, `favicon.ico`, and a sample icon all return HTTP 200).

**Not fixed / follow-up needed:**
- The 6.49s document TTFB and general Vercel response time — this needs investigation from the hosting/infra side (e.g. Vercel deployment region, cold starts), not a code change.
- Main JS bundle is still 618KB (208KB gzip) — further splitting (e.g. gsap, recharts) was considered but not pursued this round; diminishing returns relative to the fixes already made.
- A dedicated 1200×630 landscape OG banner (with name/title text) would look more polished for social shares than the current portrait profile photo, but wasn't requested/designed this round.

### Later same day — second optimization round

**Skills icon images**: the 12 remaining local PNG logos (`checkmk`, `proxmox`, `dokploy`, `nexus`, `tailscale`, `github-actions`, `wazuh`, `crowdsec`, `kafka`, `spring-boot`, `hetzner`, `streamlit`) were self-hosted and lazy-loaded already (so they weren't hurting initial load), but were 300-700px source images displayed at only ~40-56px — wasted bandwidth whenever a visitor scrolled to Skills. Resized each (preserving aspect ratio, sized ~2x the effective on-screen size incl. any CSS zoom already applied per-icon) and converted to WebP via a temporary local `sharp` install (not persisted to `package.json`). Combined size dropped from 683KB → 101KB (85% reduction). Updated all 12 references in `Skills.tsx`, deleted the old PNGs.

**Lazy-loaded remaining below-the-fold sections**: `Skills`, `Experience`, `Projects`, and `Contact` were all imported eagerly at the top of `pages/Index.tsx`, bundling their code (notably `gsap` for Skills' scroll animations, `react-hook-form`/`zod` for the Contact form) into the same critical-path chunk as Hero/Navbar — even though none of them are visible without scrolling. Converted all four to `React.lazy()` + `Suspense` (matching the `Loader2` spinner pattern already used by the existing `About`/`LazyAbout` code). Result: main bundle dropped from 618KB (208KB gzip) to **452.62KB (146.60KB gzip)**, with Skills/Experience/Projects/Contact now loading as their own small independent chunks (9-124KB each).

**Cumulative bundle result this whole optimization effort**: original single bundle was 1,441.60KB (429.40KB gzip) → main critical-path bundle now 452.62KB (146.60KB gzip), a **~66% reduction**, with the 3D scene, all section code, and about a dozen images either deferred to lazy chunks or shrunk by 85-97%.

Verified `npm run lint` (same 12 pre-existing issues), `npm run build` (bundle split confirmed via output sizes), and `npm run preview` (spot-checked new `.webp` assets return HTTP 200). Could not visually browser-test this round (Chrome extension declined) — relied on code review to confirm no Tailwind/JSX responsive classes were touched by any of today's changes, only asset paths and import/lazy-loading structure.

**Not fixed / follow-up needed** (still applies from earlier in the day): the 6.49s document TTFB needs hosting-side investigation, not a code fix. User should manually re-verify mobile responsiveness with `npm run dev` before redeploying, since no browser tool was available this session to confirm visually.

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

### Later same day — additional round

**Skills (`Skills.tsx`)**
- Added Express.js to the Backend category, with a `dark:invert` filter on its icon since the devicon logo is solid black and would be invisible against this site's dark theme by default.

**Experience (`Experience.tsx`)**
- HomeIt System location was set to "Remote (Germany)" then changed again to "Remote (Srilanka)" — current state is **"Remote (Srilanka)"**.
- User directly trimmed/adjusted several bullets and tags further (e.g. dropped the standalone Node.js/Redis/Kafka bullet and its corresponding tags; current tech tags list no longer includes Redis or Kafka).

**Projects (`Projects.tsx`)**
- Added a third project: **Event Management Platform** (Full Stack — React, TypeScript, Tailwind CSS, Node.js, Express, PostgreSQL/Supabase, JWT, QR Code, Nginx, PM2; `QrCode` icon; no public links, private client work). Went through many rounds of iterative shortening/professionalizing of its description bullets — settled on 6 bullets covering: platform overview (registration/attendance/logistics/staff management), QR check-in with duplicate-scan prevention, bulk spreadsheet import with validation, database-level meal/certificate uniqueness enforcement, and cut manual on-site tracking effort + deployment (serverless frontend + self-managed Linux server).
- Noted but not yet fixed: two pre-existing TS diagnostics unrelated to this work — `Github` icon import is deprecated, and `ShoppingCart` import is unused (its project entry is commented out).

**SEO / Open Graph (`index.html`)**
- Full meta tag overhaul to match the new Full Stack & DevOps Engineer positioning and fix real bugs found during review:
  - Title/description/keywords updated from "DevOps & Backend Developer, 3 years" to "Full Stack & DevOps Engineer, 3.5+ years" (React, Node.js, Spring Boot, cloud, DevOps, security).
  - Fixed `og:url` and `og:image` — were pointing to a stale `kapilan-portfolio-website.netlify.app` domain instead of the actual live site `kapilan-personal-website.vercel.app`.
  - Enabled the previously-commented-out Twitter card tags, using the real handle `@skapilan1998`.
  - Fixed `og:image:width`/`og:image:height` — were declared as 1200×630 (landscape) but the actual image (`kapilan.png`) is 864×1091 (portrait); corrected to match reality so crawlers don't mis-render the share preview.
  - Flagged for later (not done): the share preview image is still just the portrait profile photo; a dedicated 1200×630 landscape banner (name/title text baked in) would look more polished if the user wants to design one.

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
