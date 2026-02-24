# All changes made today (for ChatGPT context)

**Project:** Next.js 15 App Router portfolio (`portfolio-next`).  
**Stack:** React, TypeScript, Tailwind, Bootstrap 5 (Offcanvas only), Docker, Cloudflare Tunnel.

Use this so you know exactly what exists and what was changed. Do not assume old custom mobile menu or force-dynamic hacks still exist.

---

## 1. CONTENT & DATA

### `content/learning.json` (CREATED)
- New file. Valid JSON only.
- **profile:** name Joseph Kano, roleTargets (DevOps/Cloud/Platform Engineer), location Virginia, links.github.
- **highlights:** self-host portfolio, Cloudflare cache fix, Tailscale SSH, Kubernetes progress, document failures.
- **aws:** summary (hands-on/labs, not job), handsOn list (Free Tier, CLI, IAM, EC2, VPC, CloudWatch, S3, Well-Architected), **wellArchitectedPillars:** 6 pillars (Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, **Sustainability**). Each has whatItMeans[] and howIApplyIt[].
- **kubernetes:** status (section0/1 completed, section2 in_progress, current "Pod to Node placement"), keyLearnings[], nextUp[].
- **selfHostingAndDevOps:** stack[], whatILearned[], lessonsLearned[] (Cloudflare cache, Tailscale, docker replace, verify with curl).
- **proof:** array of { title, result, howToVerify[] } (Cloudflare purge, Ingress fix, container replace, cloudflared verify).

### `data/projects.json` (MODIFIED)
- **New first project:** id `"landing-zone"`, title "Cloud Foundation Landing Zone", subtitle, tags/stack (AWS, Azure mapping, IAM or RBAC, Networking, Logging, Governance), href `/projects#landing-zone`, status "In progress", highlights[], proof[], repoLink (github.com/jkanodev), note ("Hands on labs and build project, not job experience"), goal (string), architecture[] (5 bullets), exercises[] (5 items), cloudMapping[] (5 rows: aws/azure pairs for IAM, VPC/VNet, CloudWatch/Log Analytics, Config/Policy, Accounts/Subscriptions).
- Rest of array unchanged (self-hosted-portfolio, kubernetes-labs, aws-ec2-deploy, web-games).

---

## 2. TYPES

### `types/index.ts` (MODIFIED)
- **Project** type: existing fields (id, title, stack, one_liner, architecture?, workflow_commands?, linked_errors?, prevention_checklist?). **Added optional:** subtitle?, tags?, href?, status?, highlights?, proof?, repoLink?, note?, goal?, exercises?, cloudMapping?: { aws: string; azure: string }[].
- **Learning types:** LearningProfile, WellArchitectedPillar, LearningData (profile, highlights, aws with wellArchitectedPillars as 6 pillars, kubernetes, selfHostingAndDevOps, proof). JSDoc on wellArchitectedPillars says "6 pillars" including Sustainability.

---

## 3. PAGES

### `app/page.tsx` (MODIFIED)
- **Hero:** Uses data from `content/learning.json` (profile.name, profile.roleTargets). Tagline shortened. **Experience bullets added** (concise, truthful): self-hosted portfolio + Docker + GitHub Actions deploys; Cloudflare caching incident and fix; Tailscale SSH (ISP port 22 blocks); Kubernetes sections 0&1 done, 2 in progress (Pod to Node); AWS hands-on (Free Tier, CLI, IAM, VPC, S3, CloudWatch, Well-Architected). All bullets with bullet character and spacing.
- **Featured Project section (NEW):** Heading "Featured Project", one card linking to `/projects#landing-zone` ("Cloud Foundation Landing Zone", short description), min-height 44px tap target, ArrowRight icon.
- **Projects section:** First item is Landing Zone link to `/projects#landing-zone`, then Self-Hosted, Kubernetes, AWS EC2. All links `min-h-[44px]`. "View all projects" link to /projects.
- **What I've Learned:** Three cards (AWS, Kubernetes, Self-Hosting) from learning.json; no change to structure.
- **Proof:** Cards from data.proof; unchanged.
- **Knowledge Base:** Links to Errors Wiki, Commands, Kubernetes Notes; unchanged.
- No force-dynamic; server component; imports learningData from `@/content/learning.json`.

### `app/projects/page.tsx` (MODIFIED)
- Imports **Project** from `@/types` (no local Project type).
- **Landing Zone detail block:** When project with id `"landing-zone"` exists and has `goal`, a **section with id="landing-zone"** is rendered below the grid. Contains: title, status, note; **Goal** (paragraph); **Architecture** (bullets); **Exercises checklist** (numbered list, 44px min height); **Cloud mapping (AWS vs Azure)** (table, overflow-x-auto); **Proof checklist** (checkmarks); **GitHub** link if repoLink. Mobile-first, scannable.
- **Grid:** Each project card wrapped in a div. **id is set only when project.id !== "landing-zone"** (so only the detail section has id="landing-zone", no duplicate ids).
- Metadata description updated to mention Landing Zone.

### `app/knowledge/page.tsx` (MODIFIED)
- **Removed:** both duplicate lines `export const dynamic = "force-dynamic"`. Page is static.

### `app/projects/page.tsx` (already covered above)

### `app/about/page.tsx` (MODIFIED)
- **Removed:** both duplicate lines `export const dynamic = "force-dynamic"`.

### `app/knowledge/errors/page.tsx` (MODIFIED)
- **Removed:** single `export const dynamic = "force-dynamic"`. Page uses Suspense + ErrorsClient (client component).

### `app/knowledge/commands/page.tsx` (MODIFIED)
- **Removed:** `export const dynamic = "force-dynamic"` (invalid in a "use client" page). Still "use client".

---

## 4. LAYOUT / ROUTES
- No changes to `app/layout.tsx` (still ThemeProvider, Header, main, Footer, globals.css).

---

## 5. COMPONENTS

### `components/Header.tsx` (MODIFIED)
- **Bootstrap JS:** Loaded only in **useEffect** with `import("bootstrap")` (no top-level import) so prerender never runs Bootstrap (avoids "document is not defined").
- **Nav items:** Home, Projects, **Landing Zone** (href `/projects#landing-zone`), What I've Learned, Proof, Knowledge Base, About, Contact.
- **Hamburger button:** `data-bs-toggle="offcanvas"` `data-bs-target="#mobileNav"` `aria-controls="mobileNav"`. **min-h-[44px] min-w-[44px]**, Menu icon h-6 w-6. Visible only `md:hidden`.
- **Header z-index:** z-40 (below Bootstrap offcanvas).
- Renders **MobileMenuOffcanvas** with same nav items.

### `components/MobileMenuOffcanvas.tsx` (CREATED – replaced old MobileMenu)
- **Bootstrap Offcanvas:** div with class `offcanvas offcanvas-end d-md-none`, id `mobileNav`, tabIndex -1, aria-labelledby mobileNavLabel.
- **offcanvas-header:** title "Menu" (id mobileNavLabel), **btn-close** with data-bs-dismiss="offcanvas", aria-label "Close menu". Inline style minWidth/minHeight 44 for close button.
- **offcanvas-body:** nav with links; each Link has class `nav-link-mobile` and **data-bs-dismiss="offcanvas"** (so clicking a link closes the menu).
- **Inline style:** backgroundColor "var(--bg)" on the offcanvas div so panel is never transparent.
- No custom overlay logic; Bootstrap handles backdrop, scroll lock, focus.

### `components/MobileMenu.tsx` (DELETED)
- Old custom overlay implementation was removed when we switched to Bootstrap Offcanvas.

---

## 6. STYLES

### `app/globals.css` (MODIFIED)
- **After Tailwind:** `@import "bootstrap/dist/css/bootstrap.min.css";`
- **Scroll:** `[id] { scroll-margin-top: 4rem; }` for anchor links below sticky header.
- **Offcanvas overrides (theme + phone):**
  - `.offcanvas`: background var(--bg) !important, border-left, box-shadow, -webkit-overflow-scrolling: touch.
  - Fallback **opaque** backgrounds: `:root .offcanvas` and `html:not(.light) .offcanvas` → #0b0f14; `html.light .offcanvas` → #f8fafc (so never transparent).
  - `.offcanvas-header`: border-bottom, padding, min-height 56px.
  - `.offcanvas-title`: color, font-size, font-weight.
  - `.offcanvas-header .btn-close`: filter invert for dark, min-width/height 44px, padding, opacity.
  - `.offcanvas-body`: padding 0, overflow-y auto, -webkit-overflow-scrolling: touch.
  - `.nav-link-mobile`: min-height 48px, flex align center, color, border-bottom, padding, font-size 1rem, -webkit-tap-highlight-color transparent; hover/active use var(--surface).
  - **.offcanvas-backdrop:** background rgba(0,0,0,0.85) !important, opacity 1 !important (fully opaque).
  - `.offcanvas.show`: opacity 1 !important, visibility visible !important.
  - **@media (max-width: 767.98px):** .offcanvas.offcanvas-end width min(320px, 85vw), max-width 100%.

---

## 7. CONFIG & BUILD

### `next.config.ts` (MODIFIED)
- **output: "standalone"** added for Docker production build.

---

## 8. DEPENDENCIES

### `package.json` (MODIFIED)
- **Added dependency:** `"bootstrap": "^5.3.3"`.

---

## 9. DOCKER & DEPLOY

### `Dockerfile` (CREATED/REPLACED)
- **Stage 1 (builder):** node:20-alpine, WORKDIR /app, COPY package.json + lock, npm ci, COPY . , npm run build.
- **Stage 2 (runner):** node:20-alpine, NODE_ENV=production, COPY .next/standalone, .next/static, public; EXPOSE 3000; CMD ["node", "server.js"].

### `docker-compose.yml` (CREATED)
- **app:** build ., container_name portfolio, expose 3000, restart unless-stopped.
- **nginx:** image nginx:alpine, ports 80:80, volumes nginx.conf to /etc/nginx/conf.d/default.conf, depends_on app.

### `nginx.conf` (CREATED)
- server listen 80; proxy_pass http://app:3000; proxy_set_header Host, X-Real-IP, X-Forwarded-For, X-Forwarded-Proto, Upgrade, Connection; proxy_cache_bypass.

### `.github/workflows/deploy.yml` (CREATED)
- On push to main: checkout, Docker Buildx, build image (load only, no push), SSH (appleboy/ssh-action) to server using secrets DEPLOY_HOST, DEPLOY_USER, DEPLOY_SSH_KEY, DEPLOY_PATH. Script: cd DEPLOY_PATH, git fetch/reset hard origin/main, docker build, docker stop/rm portfolio, docker run -d --name portfolio -p 3000:3000, sudo systemctl restart cloudflared. Comment at top: required secrets listed.

### `deploy.sh` (CREATED)
- Build image (default tag portfolio:latest), docker stop/rm container (name portfolio), docker run -d --restart unless-stopped -p PORT:3000. Env overrides: IMAGE_NAME, CONTAINER_NAME, PORT.

### `public/.gitkeep` (CREATED)
- Empty file so public/ exists for Dockerfile COPY public.

---

## 10. WHAT WAS REMOVED OR REPLACED
- **Removed:** All `export const dynamic = "force-dynamic"` (and duplicates) from knowledge, projects, about, errors, commands pages.
- **Removed:** Custom MobileMenu component (overlay, focus trap, scroll lock) — replaced by Bootstrap Offcanvas.
- **Removed:** Top-level `import "bootstrap"` from Header — replaced by useEffect(() => import("bootstrap")).

---

## 11. KEY BEHAVIORS TO PRESERVE
- **Build:** Must succeed without force-dynamic. Bootstrap JS only in useEffect so prerender never sees document/window.
- **Mobile menu:** Bootstrap 5 Offcanvas only; no custom overlay. Backdrop and panel must stay opaque (no transparency). Tap targets 44px+ for hamburger and nav links.
- **Data:** Projects from data/projects.json; learning/experience from content/learning.json. Project type supports both simple and extended (Landing Zone) entries.
- **Single id="landing-zone":** Only on the projects page detail section, not on the card wrapper in the grid.
- **No Bootstrap JS** introduced for anything other than Offcanvas (user asked not to add Bootstrap JS elsewhere).

---

End of changes document. Use this to continue work or fix issues without breaking the above.
