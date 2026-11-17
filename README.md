# info.ahsansuny.com

Research and professional hub for MD Shahnauze Ahsan (Ahsan Suny). Built with **Next.js 16 + Tailwind CSS 4**, using the same brand as ahsansuny.com (`#364bc5`, Parkinsans/Geist). Exported as a fully static site.

## Run locally
```bash
npm install
npm run dev      # http://localhost:3000  (draft blog posts are visible here)
npm run build    # static site in out/
```

## Where to edit things
All content is plain files. Edit them, then commit and push; Vercel rebuilds the site.

| What | File(s) |
|---|---|
| Name, headline, bio, social links, CV & portfolio PDFs, photos | `data/profile.json` |
| Photos | `public/images/`: `ahsan-portrait-light.jpg` / `ahsan-portrait-dark.jpg` (home), `ahsan-mentor.jpg` (About), `profile.jpg` (search/social preview) |
| Downloadable PDFs (CV, portfolio, poster) | `public/files/` |
| Education & career timeline | `data/timeline.json` |
| Skills | `data/skills.json` |
| Publications | `data/publications.bib`. Optional fields: `abbr` (badge), `selected = {true}` (home page), `abstract`, `award`, `pdf`, `code`, `slides`, `video`, `preview` (image) |
| Projects (each gets its own page) | `content/projects/<slug>.md`. Set `category`, `context`, `image`, `imageFit`, `gallery`, `videos` (YouTube IDs), `repo`, `paper` (BibTeX key), and write the story in the body |
| Project images | `public/images/projects/<slug>/` |
| Research | `content/research/*.md` (`status: current` puts it at the top) |
| News | `content/news/*.md` (`date`, `title`, optional `link`) |
| Blogs | `content/blog/*.md` (`lang: bn` for Bengali, `draft: true` hides it) |
| Achievements, lab alumni | `content/achievements/*.md` (`type`: award, scholarship, invited, teaching, talk, media, certificate; optional `link`, `linkLabel`, `links`, `note`), `content/people/*.md` |

Example news item, `content/news/2026-11-20-new-site.md`:
```md
---
date: 2026-11-20
title: "Launched info.ahsansuny.com"
category: career
---
```

## Code map
- `src/app/`: pages: `/`, `/about`, `/research/[slug]`, `/publications`, `/projects/[slug]`, `/lab`, `/news`, `/blog/[slug]`, `/achievements`, `/contact`, plus `rss.xml`, `sitemap.xml` and `robots.txt`
- `src/lib/content.ts`: reads `content/` and `data/` at build time
- `src/lib/bibtex.ts`: BibTeX parser
- `src/lib/markdown.ts`: Markdown → HTML, with a table of contents
- `src/components/`: header, footer, publication entry, project card and UI helpers
- `src/app/globals.css`: brand colours and fonts (Tailwind `@theme`)

## Deploy on Vercel
1. Push this repo to GitHub, e.g. `Ahsan728/info-site`.
2. In Vercel, choose **Add New → Project** and import the repo. The defaults work; Vercel detects Next.js and the static export.
3. Under **Settings → Domains**, add `info.ahsansuny.com`.
4. At the DNS provider for ahsansuny.com, add `CNAME info → cname.vercel-dns.com`.
