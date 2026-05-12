# Mallikarjun S Marabasari — Portfolio

A high-end, design-forward personal portfolio website for Mallikarjun S Marabasari — a CSE fresher actively seeking internship opportunities.

## Run & Operate

- `pnpm --filter @workspace/portfolio run dev` — run the portfolio (port assigned by workflow)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19 + Vite + Tailwind CSS v4
- Routing: Wouter
- Animations: Framer Motion 12
- Icons: Lucide React + React Icons (SI)
- Themes: next-themes (dark-first)
- Loaders: ldrs
- API: Express 5 (scaffolded, not yet wired to contact form)
- DB: PostgreSQL + Drizzle ORM (scaffolded)

## Where things live

- `artifacts/portfolio/src/pages/` — Home, Projects, Education, Contact pages
- `artifacts/portfolio/src/components/` — SideDock, BottomDock, ThemeToggle, SkillsTicker, ProjectCard
- `artifacts/portfolio/src/data/portfolio.ts` — All mock content (personal info, skills, projects, education)
- `artifacts/portfolio/src/index.css` — Full design system CSS vars (dark/light)

## Product

- `/` — Home: animated hero, about, skills ticker, featured projects
- `/projects` — All projects grid with EduCompass callout
- `/education` — Education timeline with institution cards
- `/contact` — Contact form (frontend-only, mocked; shows backend-not-wired notice)
- SideDock (desktop) + BottomDock (mobile) navigation with active route highlighting
- Dark/light theme switcher

## User preferences

- Dark-first theme (pure black #050805 background)
- Neon green accent: #18FFB0 — used for labels, links, CTAs, dots
- Typography: DM Sans (body) + Space Grotesk (headings)
- Design inspired by evekayser.com.br — split-screen hero, horizontal top nav, large bold type
- No SideDock — uses TopNav (horizontal) instead
- No backend for contact form yet (Nodemailer/Gmail SMTP planned for later)
- Skills ticker: horizontal scroll with hover-pause + colored tooltip pop
- EduCompass image: reads from `/public/educompass.png` with graceful fallback

## Gotchas

- `SiCss3` doesn't exist in react-icons/si v5 — use `SiCss` instead
- react-icons `SiC` works for C language icon
- Framer Motion AnimatePresence wraps the Switch with mode="wait" for page transitions
- All CSS vars must be set (no `red` placeholders remain)
- TopNav replaces SideDock/BottomDock — no md:pl-20 offset on main

## Adding your photo / EduCompass screenshot

Place your profile photo at `artifacts/portfolio/public/avatar.jpg` — update the Hero component to use it.
Place a project screenshot at `artifacts/portfolio/public/educompass.png` — it will automatically load in the EduCompass project card.

## Next: Wiring the contact form backend

Add Gmail SMTP credentials to env:
- `GMAIL_USER` — your Gmail address
- `GMAIL_APP_PASSWORD` — 16-char App Password
Then implement a POST `/api/contact` route in `artifacts/api-server/src/routes/` using Nodemailer.
