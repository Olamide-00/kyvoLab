# KyvoLab

A product studio site — fintech product design and engineering for African startups.
Multi-page React app (React Router), built with Vite + TypeScript.

## Getting started

```bash
npm i
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Other commands

```bash
npm run build     # type-check + production build to dist/
npm run preview   # serve the production build locally
npm run lint      # run eslint
```

## Project structure

```
src/
  components/     # Navbar, Footer, AlgorithmCanvas (bg animation), PhoneFrame,
                   # Reveal (scroll animations), MagCard (tilt), Typed, Toast, PageTransition
  data/
    projects.ts   # real client project data — add new projects/screens here
  pages/
    Home.tsx
    Services.tsx
    Work.tsx        # project index/grid
    CaseStudy.tsx    # dynamic /work/:slug case study page
    Referral.tsx
    Commission.tsx
    Contact.tsx
    NotFound.tsx
  assets/work/    # real client screenshots, imported into projects.ts
  styles/
    global.css    # all site styles (design tokens, layout, components)
```

## Adding a new project / client screens

1. Drop the screenshot(s) into `src/assets/work/`.
2. Open `src/data/projects.ts` and either add a new entry to `PROJECTS`, or — for
   SwiftPay, which is already scaffolded as a placeholder — import the new images,
   set `cover`, `coverAlt`, fill in `gallery`, `highlights`, and flip `status` to
   `"shipped"`. The case study page, work grid, and footer links all update
   automatically since they're all driven from this one file.

## Routes

| Path              | Page                          |
|-------------------|-------------------------------|
| `/`                | Home                          |
| `/services`        | Services                      |
| `/work`             | Work index (all projects)     |
| `/work/:slug`       | Case study (depay, jaan, swiftpay) |
| `/referral`         | Referral program              |
| `/commission`       | Commission structure          |
| `/contact`          | Contact                       |
| any other path      | 404                            |
