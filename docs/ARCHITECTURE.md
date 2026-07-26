# Project Architecture

> Personal portfolio website for Sriranjan Kapilan.
> Live: https://kapilan-personal-website.vercel.app/

Last reviewed: 2026-07-26

## 1. Overview

A single-page portfolio application built with **React + TypeScript + Vite**, styled with **Tailwind CSS** and **shadcn/ui** (Radix UI primitives). The site is one scrolling page (`Index`) composed of sections: Hero, About, Skills, Experience, Projects, Contact. Contact form submissions are sent to a third-party form backend (Web3Forms) via a client-side API call, no custom backend/server code lives in this repo.

## 2. Tech Stack

### Core
- **React 18** (`react`, `react-dom`)
- **TypeScript 5**
- **Vite 7** — dev server & build tool, using `@vitejs/plugin-react-swc` (SWC-based fast refresh)
- **React Router DOM 6** — client-side routing (`/` → `Index`, `*` → `NotFound`)

### Styling / UI
- **Tailwind CSS 3** (+ `tailwindcss-animate`, `@tailwindcss/typography`) — utility-first styling, custom theme (see `tailwind.config.ts`)
- **shadcn/ui** — component generator/style built on Radix UI (`components.json` config, `style: default`, baseColor `slate`)
- **Radix UI primitives** — accordion, dialog, dropdown, tabs, toast, tooltip, popover, select, etc. (headless, accessible components under `src/components/ui`)
- **Framer Motion** — section/element animations
- **GSAP** — additional animation library
- **React Three Fiber** + **drei** + **three.js** — 3D elements (`src/components/3d/FloatingGeometry.tsx`)
- **Lucide React** — icon set
- **next-themes** — light/dark theme switching (wrapped by `src/components/ThemeProvider.tsx`)

### State / Data / Forms
- **TanStack React Query 5** — provided via `QueryClientProvider` in `App.tsx` (currently no active queries, set up for future data fetching)
- **React Hook Form** + **Zod** + `@hookform/resolvers` — form state & schema validation
- **Context API** — theme state, via `ThemeProvider`

### Misc UI libraries
- **Recharts** — charts (available via `src/components/ui/chart.tsx`)
- **Embla Carousel** — carousels
- **Sonner** — toast notifications
- **cmdk**, **vaul**, **input-otp**, **react-resizable-panels**, **react-day-picker**, **date-fns** — supporting shadcn/ui components

### Tooling
- **ESLint 9** + `typescript-eslint` + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh` — linting
- **PostCSS** + **Autoprefixer** — CSS processing
- **Vercel** — hosting/deployment (`vercel.json`, `public/_redirects`)

## 3. Folder Structure

```
kapilan-personal-website/
├── docs/                        # Project documentation (this file + DOCUMENTATION.md work log)
├── public/                      # Static assets served as-is
│   ├── *.png                    # Tech/tool logos used in Skills/Experience sections
│   ├── pdf/                     # Resume PDF
│   ├── favicon.ico
│   └── _redirects               # Vercel/Netlify-style SPA redirect rules
├── src/
│   ├── main.tsx                 # App entry point, mounts <App /> to #root
│   ├── App.tsx                  # Providers (QueryClient, Theme, Tooltip, Toasters), Router, routes
│   ├── App.css / index.css      # Global styles, CSS variables (theme tokens)
│   ├── vite-env.d.ts            # Vite/TS ambient types
│   ├── pages/
│   │   ├── Index.tsx            # Main single-page layout, composes all sections
│   │   └── NotFound.tsx         # 404 route
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # Top navigation
│   │   │   └── Footer.tsx       # Footer
│   │   ├── sections/            # Page sections (one per portfolio block)
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── about/           # About section broken into sub-components
│   │   │   │   ├── AboutContent.tsx
│   │   │   │   ├── Highlights.tsx
│   │   │   │   ├── Journey.tsx
│   │   │   │   ├── LazyAbout.tsx  # Lazy-loaded wrapper for About
│   │   │   │   └── index.ts
│   │   │   ├── Skills.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Contact.tsx      # Section wrapper, form submission logic (Web3Forms)
│   │   │   ├── ContactForm.tsx  # Form fields/inputs
│   │   │   ├── ContactInfo.tsx  # Static contact details
│   │   │   └── ContactPopup.tsx # Success/confirmation popup
│   │   ├── 3d/
│   │   │   └── FloatingGeometry.tsx  # React Three Fiber 3D visual
│   │   ├── ui/                  # shadcn/ui generated primitives (button, dialog, card, etc.)
│   │   ├── NavLink.tsx          # Custom nav link component
│   │   └── ThemeProvider.tsx    # next-themes wrapper / theme context
│   ├── hooks/
│   │   ├── use-mobile.tsx       # Responsive/viewport detection hook
│   │   └── use-toast.ts         # Toast state hook (shadcn/ui pattern)
│   └── lib/
│       └── utils.ts             # `cn()` helper (clsx + tailwind-merge)
├── components.json              # shadcn/ui CLI configuration
├── tailwind.config.ts           # Tailwind theme, colors, animations
├── postcss.config.js
├── vite.config.ts               # Vite config, dev server port 8080, `@` alias → src
├── tsconfig*.json                # TypeScript project configs (app/node split)
├── eslint.config.js
├── vercel.json                  # Vercel deployment config
├── index.html                   # HTML shell / entry
├── package.json
└── README.md
```

## 4. Code Structure Conventions

- **Path alias**: `@/*` maps to `src/*` (configured in `vite.config.ts` and `tsconfig.app.json`) — always import via `@/components/...`, `@/lib/...`, `@/hooks/...` rather than relative `../../` paths.
- **Sections pattern**: Each major page block lives in `src/components/sections/`. Larger sections (e.g. About) are split into a folder with sub-components + an `index.ts` barrel export, keeping `Index.tsx` clean.
- **UI primitives vs. feature components**: `src/components/ui/` holds generic, reusable, shadcn/ui-generated primitives (no business logic). `src/components/sections/`, `layout/`, `3d/` hold feature/page-specific components.
- **Lazy loading**: Heavier sections (e.g. `LazyAbout.tsx`) can be lazy-loaded to reduce initial bundle size.
- **Forms**: Contact form uses React Hook Form + Zod for validation, split into `ContactForm.tsx` (fields), `Contact.tsx` (submission logic/state), `ContactInfo.tsx` (static info), `ContactPopup.tsx` (result feedback).
- **Styling**: Tailwind utility classes directly in JSX; shared conditional class logic goes through the `cn()` helper in `src/lib/utils.ts`. Theme colors are defined as CSS variables (HSL) in `src/index.css` and referenced in `tailwind.config.ts`.
- **Fonts**: `Space Grotesk` (sans) and `JetBrains Mono` (mono), configured in Tailwind theme.

## 5. Data & State

There is no backend/database in this repository — it's a static frontend.

- **Local/UI state**: React `useState`/`useEffect` within components (e.g. scroll position tracking, form state in `App.tsx`/`Contact.tsx`).
- **Persisted state**: `sessionStorage` used in `App.tsx`'s `ScrollRestoration` to save/restore scroll position per route across refreshes.
- **Theming**: `next-themes` + `ThemeProvider` context manage light/dark mode, persisted via `next-themes`' own localStorage mechanism.
- **Server state**: `@tanstack/react-query`'s `QueryClient` is initialized in `App.tsx` but not currently used for active data fetching — reserved for future API integration.
- **External API call**: `Contact.tsx` posts form submissions directly to the **Web3Forms** API (`https://api.web3forms.com/submit`) using an access token read from the environment variable `VITE_WEB_ACCESS_TOKEN` (set in `.env`, not committed).
- **Validation schema**: Zod schemas define the shape/rules for the contact form, resolved via `@hookform/resolvers`.

## 6. Environment Variables

| Variable | Purpose | Where used |
|---|---|---|
| `VITE_WEB_ACCESS_TOKEN` | Web3Forms API access key for the contact form | `src/components/sections/Contact.tsx` |

`.env` is git-ignored; a value must be supplied locally (and in Vercel project settings for production) for the contact form to function.

## 7. Build & Deployment

- **Dev**: `npm run dev` — starts Vite dev server on port 8080 (`vite.config.ts`, host `::`).
- **Build**: `npm run build` (production) / `npm run build:dev` (development-mode build).
- **Lint**: `npm run lint`.
- **Preview**: `npm run preview` — serves the production build locally.
- **Hosting**: Deployed on **Vercel** (`vercel.json`), with SPA fallback rules in `public/_redirects`.

## 8. Notable Dependencies Reference

Full list lives in `package.json`; key ones grouped by purpose:

- **Routing**: react-router-dom
- **Animation**: framer-motion, gsap, tailwindcss-animate
- **3D**: three, @react-three/fiber, @react-three/drei
- **Forms/validation**: react-hook-form, zod, @hookform/resolvers
- **UI primitives**: @radix-ui/react-* (accordion, dialog, dropdown-menu, popover, select, tabs, toast, tooltip, etc.)
- **Data viz**: recharts
- **UX helpers**: sonner (toasts), embla-carousel-react (carousels), cmdk (command palette), vaul (drawers), input-otp, react-resizable-panels, react-day-picker, date-fns
- **Icons**: lucide-react
- **Class utilities**: clsx, tailwind-merge, class-variance-authority

## 9. Maintenance Notes

- Update this document whenever: the folder structure changes materially, a new major dependency/tool is introduced or removed, the deployment target changes, or a new environment variable is added.
- Work log entries (what was done, on which date) belong in `docs/DOCUMENTATION.md`, not in this file.
