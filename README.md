# Joseph Kano – Next.js 15 Portfolio

Production-grade Next.js 15 App Router portfolio with a Wikipedia-style Knowledge Base for DevOps errors, fixes, and commands.

## Tech stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- next-themes (dark mode)
- lucide-react (icons)
- fuse.js (client-side search)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Structure

- **app/** – Routes: `/`, `/projects`, `/knowledge`, `/knowledge/errors`, `/knowledge/commands`, `/knowledge/kubernetes`, `/about`, `/contact`
- **components/** – Header, Footer, MobileMenu, SearchBar, FilterChips, ErrorCard, CommandCard, ProjectCard, Modal, CopyButton, ReadAloudButton, VoicePicker, Section
- **data/** – `errors.json`, `commands.json`, `projects.json`, `kubernetes.json` (content loaded from here; do not hardcode)
- **lib/** – fuse.ts (search index), seo.ts, speech.ts (Web Speech API), utils.ts

## Features

- **Search** – Knowledge Base layout has a top search bar; Fuse.js indexes errors, commands, and projects for instant client-side search. Filter chips on Errors and Commands pages.
- **Read Aloud** – Every error card and error detail has a Read Aloud button. Uses Web Speech API; voice, rate, and pitch are configurable via Voice settings (under search in Knowledge Base) and saved in localStorage.
- **Dark mode** – Default theme is dark; toggle in header.
- **SEO** – Title template "Joseph Kano – DevOps and Cloud Engineer", per-page meta description, basic Open Graph.

## Data

Edit JSON in **data/** to add or change errors, commands, projects, and Kubernetes roadmap. No secrets, IPs, or tokens in the repo.
