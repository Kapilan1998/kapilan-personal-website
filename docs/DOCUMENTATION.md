# Work Log

Running log of work done on this project. Add a new entry at the top for each work session, newest first.

---

## 2026-10-04

**About section refreshed against the two latest resumes (`about/Journey.tsx`, `about/Highlights.tsx`)**

User supplied their current Full Stack and DevOps resumes and asked what in About was stale. Reviewed both against the section and applied the gaps.

- **Biggest factual correction: AWS is no longer "foundational exposure."** Both resumes now describe Ansible-automated AWS provisioning — EC2 inside a VPC, RDS, S3, IAM least-privilege. The old bullet ("CI/CD pipelines through Jenkins, with foundational exposure to AWS and Kubernetes") was actively undershooting. AWS now has its own bullet; Kubernetes stays accurately scoped as "working knowledge".
- `Journey.tsx` para 1 (CodeLantic): added the monolith → independently deployable microservices decomposition (Feign Client, WebClient, API Gateway), the fintech domain, Flyway-managed MySQL migrations and the 80%+ test coverage figure.
- `Journey.tsx` para 2 (HomeIt): added RSA-encrypted transfer to Hetzner S3, PostgreSQL + Flyway, Sentry monitoring, TypeScript, and LLM-powered features via function calling over access-scoped read-only tools (previously absent entirely, and now relevant given the Team Weekly Reporting project added 2026-10-02).
- `Journey.tsx` bullets rewritten 6 → 6, now carrying the quantified outcomes the resumes added: 25+ VMs/LXC with setup cut ~2h → 15min; two-node Proxmox HA cluster with Proxmox Backup Server at 65% lower spend / 99% uptime; Jenkins + Nexus + Dokploy taking deployments 30–40min → 5–10min; 10+ production hosts under Wazuh/CrowdSec/PatchMon/Checkmk/Prometheus/Grafana/Sentry. Added Traefik, Cloudflare Zero Trust and Headscale/Tailscale per-user ACLs.
- `Highlights.tsx` all 4 card descriptions rewritten. **Dropped Cronicle** — it appears in neither resume, so it looks retired. Moved AWS out of the DevOps card into Cloud & Infrastructure where it now belongs, and added Nexus/Dokploy/SonarQube to the DevOps card.
- Side effect worth noting: the 4 descriptions were rebalanced to 206–214 chars (previously ~195–235), tightening the 2×2 card grid's height variance with no CSS change. (Corrected: after the user's later wording edits the spread is 213/226/209/206 — card 2 gained "using Backup Server" and now runs slightly long, though still tighter than the original spread.)
- Removed a dead `ExternalLink` import from `Journey.tsx`, orphaned since the HomeIt hyperlink was dropped on 2026-07-28.
- **Deliberately not changed:** the header tagline ("Full Stack Engineering, Backed by DevOps") and subtitle — both still accurate at 3.5+ years. **Deliberately dropped:** Matomo from the About bullets (still present in `Experience.tsx`, and Prometheus/Grafana/Sentry are the stronger observability signal for a summary).
- Not added, to avoid bloating a summary section — available if wanted: Kata Containers/VLANs/AdGuard (medical-practice security work), the Lighthouse 85+ SEO / 80+ performance figures, the 5-minute Google Chat outage alerting, and the AI-assisted-development angle (Claude/Gemini/OpenCode as tools, distinct from the LLM-feature work that was added).
- Per user instruction, no browser verification this session. `npx tsc --noEmit` clean, `npx eslint src/components/sections/about/` reports zero issues, `npm run build` succeeds — `AboutContent` chunk 7.46KB → 8.11KB (text only), critical-path bundle unchanged at 301.52KB.

**Follow-up flagged (not actioned):** `Skills.tsx` is now out of step with both resumes — missing TypeScript, Next.js, Express.js, Redis, Supabase, Flyway, Sentry, Traefik, HAProxy and pfSense, several of which About and Projects now reference by name.

---

## 2026-10-04 (continued) — HomeIt System experience entry

**`Experience.tsx` HomeIt System entry brought in line with the two latest resumes**

- **Same undersell as the About section had: AWS.** The bullet "Gained hands on exposure to AWS and foundational experience with Kubernetes deployments" was replaced with the actual work both resumes describe — Ansible-automated AWS provisioning (EC2 inside a VPC, RDS, S3, IAM least-privilege). Kubernetes kept honestly scoped as "working knowledge".
- Bullets 11 → 13 (as committed; a 14th was drafted and removed by the user — see the refinements entry below). Expanded existing ones and added genuinely missing work:
  - Spring Boot API bullet now carries PostgreSQL + Flyway migrations, Redis caching and Apache Kafka async processing (previously only RSA/S3).
  - Next.js site bullet now carries the Lighthouse 85+ SEO / 80+ performance figures and Sentry error/performance monitoring.
  - **New:** medical practice security work — isolated VLANs, default-deny firewall rules, Ansible-automated Wazuh behind Traefik, internet-facing services in Kata Containers microVMs.
  - **New:** two-node Proxmox HA cluster on Hetzner dedicated hardware, encrypted incremental off-site backups via Proxmox Backup Server to NAS — 65% lower spend vs managed cloud at 99% uptime.
  - **New:** self-hosted open-source business apps as Docker containers via Dokploy, each on its own subdomain behind HAProxy with TLS termination and Cloudflare Zero Trust.
  - Ansible bullet gained scale and outcome: 25+ VMs/LXC, setup ~2h → 15min, weekly patch cycles.
  - CI/CD bullet gained Nexus, Docker Compose, Jenkins agents and the 30-40min → 5-10min deployment figure.
  - Monitoring bullet gained the 10+ production hosts scale and the HTTP health checks pushing Google Chat alerts within 5 minutes of a non-200.
  - Matomo bullet sharpened from "user tracking for websites" to self-hosted first-party analytics covering traffic, page engagement, scroll depth and click paths.
- Tech tags 22 → 30: added Redis, Apache Kafka, Sentry, Nexus, HAProxy, Traefik, pfSense, Matomo, and reordered into dev → data → CI/CD → infra → security groups. (Flyway and Dokploy were also proposed but dropped by the user — see the refinements entry below.)
- **Note for the user:** Redis and Apache Kafka tags were deliberately removed from this entry back on 2026-07-28. Re-added because both resumes now name them explicitly in the HomeIt role. Flagged rather than assumed.
- Card is now materially taller (13 bullets, 30 tags). Structure/CSS untouched, so it inherits the existing responsive card — bullets use `flex items-start` and tags `flex flex-wrap`, both of which wrap cleanly. No browser verification run this session; offered to the user.
- `npx tsc --noEmit` clean, `npx eslint src/components/sections/Experience.tsx` zero issues, `npm run build` succeeds — `Experience` chunk 9.14KB → 10.64KB (text only), critical-path bundle unchanged at 301.52KB.

**Still outstanding:** the two CodeLantic entries have the same kind of drift — the Associate role is missing the monolith → microservices decomposition narrative, the 3-project scope (retail operations, real estate transactions with 2FA/KPI dashboards) and Flyway; the Trainee role is missing Hibernate Validator, Mockito and the 80%+ coverage figure. Also `Skills.tsx` still lacks TypeScript, Next.js, Express.js, Redis, Supabase, Flyway, Sentry, Traefik, HAProxy and pfSense.

---

## 2026-10-04 (continued) — user refinements + Clerk project retired

Changes the user applied directly on top of the two entries above, recorded here so the log matches the committed file state rather than the drafts.

**`Experience.tsx` (HomeIt entry)**
- Dropped the drafted "Built a Node.js operations dashboard surfacing security alerts and patch status across managed hosts" bullet — 14 → 13 bullets.
- Dropped the `Flyway` and `Dokploy` tags from the proposed tag additions — 32 → 30 tags. Note both tools are still named in the bullet text (Flyway in the Spring Boot API bullet, Dokploy in the CI/CD and self-hosted-apps bullets), so they are the only tools mentioned without a matching tag. Left as-is per the user's edit; flagged, not reverted.
- Reworded the Matomo bullet from "Rolled out self hosted Matomo…" to "Deployed self hosted Matomo…" and moved it up from last to third position, grouping it with the other application/delivery work ahead of the infrastructure bullets.

**`about/Journey.tsx` and `about/Highlights.tsx`**
- Removed the em dashes from several of the rewritten bullets and sentences, replacing them with plain connectives (e.g. "A two node Proxmox HA cluster … **which is** 65% lower infrastructure spend at 99% uptime", and "Spring Boot services **including** RSA encrypted file transfer…"). One artefact of this: the first Journey bullet now reads "…Proxmox, Hetzner Cloud and AWS  25+ VMs…" with no connective where the em dash was. Renders fine (HTML collapses the double space) but reads slightly abruptly — optional tidy-up.
- Added "using Backup Server" to the Cloud & Infrastructure highlight card, which pushed that description to 226 chars against ~206–213 for the other three.

**`Projects.tsx`**
- Commented out the **Secure Role Based Authentication with Next.js & Clerk** entry, taking the active project count from 13 back to 12. This incidentally resolves the pagination issue flagged on 2026-10-02 — 12 projects at 4 per page is exactly 3 full pages, with no lone trailing card. `Projects` chunk 21.81KB → 20.89KB. `ShoppingCart` and `Shield` icon imports are now both unused (their only entries are commented out), joining the pre-existing deprecated `Github` import.

**Verification after all refinements:** `npx tsc --noEmit` clean, `npm run build` succeeds — `AboutContent` 8.12KB, `Experience` 10.64KB, `Projects` 20.89KB, critical-path bundle unchanged at 301.52KB (98.18KB gzip).

**Also this session (no code change):** reviewed the five uncommitted files and supplied a per-file commit message for the user to apply manually; nothing was committed or staged by the assistant.

---

## 2026-10-02

**New project added (`Projects.tsx`)**
- Added **Team Weekly Reporting & Review Platform** as the first entry in `allProjects` so it lands on page 1 of the paginated grid. Uses the existing `string[]` description format (6 bullets), 17 tech tags, `ClipboardCheck` icon (verified present and not one of lucide's deprecated brand icons), category "Full Stack, DevOps", `color: 'primary'`. No public links supplied — treated as private/internal work, so the View Code / Live Demo / Documentation buttons stay conditionally hidden like the other three client projects.
- Project count 12 → 13. At `projectsPerPage = 4` this grew pagination from 3 to 4 pages, and page 4 now holds a single card occupying the left half of the 2-column desktop grid. Flagged to the user — moving `projectsPerPage` to 5 would give 5/5/3 and remove the lone trailing card. **Resolved 2026-10-04:** the user commented out the Clerk project, returning the count to 12 (exactly 3 pages), so `projectsPerPage` stays at 4 and no change is needed.
- Pure data addition: no markup or CSS touched, so the card inherits the existing responsive card shell. Verified in a real browser against `vite preview` at 375px, 390px (light theme), 768px and 1440px — no horizontal overflow at any width, all 17 tech tags wrap inside the card bounds, the "Full Stack, DevOps" badge stays on one line, the title wraps to 2 lines without clipping, tablet/desktop siblings keep equal grid-stretch heights, and in light theme the card border (`rgb(144,157,180)`) and tag contrast both render correctly.
- `npx tsc --noEmit` clean. Lint on the file reports only the pre-existing `ref.current` cleanup warning (unrelated, line number shifted by the insert). `npm run build` succeeds with the critical-path bundle unchanged at 301.52KB (98.18KB gzip) — the new entry lands only in the lazy `Projects` chunk (21.81KB).
- Kept the user's wording verbatim, including the British "Containerised"; note `Experience.tsx` uses American "containerization" if consistency is wanted later.

---

## 2026-08-16

**Dual resume downloads (`Hero.tsx`)**
- User is now maintaining two separate tailored resumes (a Full Stack Software Engineer version and a DevOps & Platform Engineer version) for job applications, discussed as standard/recommended practice given the genuinely dual skill profile the portfolio already reflects. Replaced the single "Download CV" button with two: **"Download CV (Full Stack)"** → `/pdf/Sriranjan_Kapilan_FullStack_Resume.pdf`, and **"Download CV (DevOps)"** → `/pdf/Sriranjan_Kapilan_DevOps_Resume.pdf` (both files added to `public/pdf/` by the user; old space-containing filename `Sriranjan Kapilan.pdf` retired).
- Added `flex-wrap` to the button row container so the now-3-button row (View My Work + 2 resume downloads) wraps gracefully on medium-width screens instead of squeezing/overflowing, while mobile still stacks all three full-width as before.
- Verified zero performance impact: main bundle went from 300.23KB → 301.52KB (~1KB, just extra label text/markup); the PDFs are only fetched on click, never preloaded.

**Light theme border/contrast fix (`index.css`, `Hero.tsx`)**
- User reported that in light theme, the 2 resume-download buttons and the 5 social icon circles had no visible border (looked fine in dark theme). Root cause: the shared `--border`/`--input` CSS variables for light theme were `220 13% 91%` — nearly the same lightness as the light theme's near-white background/card colors, so the `.glass` utility class (used by the social icons and ~20 other spots sitewide: About/Skills/Experience badges, form inputs, Navbar, etc.) rendered an effectively invisible border in light mode despite looking fine in dark mode.
- Fixed by darkening `.light`'s `--border`/`--input` to `220 13% 80%` — improves contrast for every `.glass` usage sitewide in light theme, not just the reported spots.
- Separately, the two resume-download buttons had a hardcoded `border-white/10` (only visible against dark backgrounds) rather than using the semantic `--border` variable. Changed to `border-black/15 dark:border-white/10` so it's visible in both themes; dark mode rendering is unchanged.
- Verified lint clean and build succeeds (pure CSS/class change, no bundle size impact). Could not visually confirm in a real browser this session (no browser tool available) — user should double check both themes render correctly after next deploy.

---

## 2026-08-15 (continued) — post-deploy verification + third optimization round

User redeployed to Vercel and re-tested in an incognito window, sharing a new Network tab screenshot (`release-1.png`). Confirmed real-world results from the prior optimization work:

| Metric | Before | After redeploy |
|---|---|---|
| DOMContentLoaded/Load | 13.82s | **2.04s** (-85%) |
| Finish | 18.90s | **3.07s** (-84%) |
| Requests | 49 | **20** |
| Transferred | 3.1 MB | **583 KB** (-81%) |

**Further round of optimization** based on the new trace:
- Found via grep that **`Toaster`, `Sonner` (both toast systems), `TooltipProvider`, and `QueryClientProvider`** were all wrapped unconditionally in `App.tsx` (non-lazy, so always in the critical bundle) but had **zero call sites anywhere in the actual app** — pure unused scaffolding left over from the original shadcn/Vite template. Removed all four from `App.tsx`. Left the now-orphaned `ui/toaster.tsx`, `ui/sonner.tsx`, `ui/tooltip.tsx`, `hooks/use-toast.ts` files in place (zero bundle cost either way since Vite only bundles reachable imports; treated as an optional future hygiene cleanup, not a performance one).
- Result: main bundle dropped from 452.62KB (146.60KB gzip) → **300.23KB (98.12KB gzip)**.
- Skip loading the decorative 3D scene (`FloatingGeometry`, 824KB/222KB gzip chunk) entirely on screens narrower than 768px, via a `matchMedia('(min-width: 768px)')` check in `Hero.tsx` — saves mobile visitors that whole chunk's bandwidth/parse cost for a purely decorative background effect.
- Verified `npm run lint` (same 12 pre-existing issues), `npm run build`, and `npm run preview` (title/HTTP 200 spot check) all pass after these changes.

**Cumulative result across the whole optimization effort**: original single bundle 1,441.60KB (429.40KB gzip) → main critical-path bundle now 300.23KB (98.12KB gzip), roughly **77% smaller**, plus the 3D chunk no longer loads at all on mobile.

**Still outstanding**: document TTFB/hosting-side investigation (Vercel region/cold start) not yet done — was ~6.49s pre-optimization, dropped to ~897ms post-redeploy already, likely mostly resolved by the other fixes reducing contention, but worth keeping an eye on.

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
