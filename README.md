# Startup Helper — React

A React + Vite + TypeScript frontend replacement for the original static Startup Helper landing page.

## Run locally

```bash
npm install
npm run dev
```

## Current limitations
This is a frontend prototype. Sample ideas are stored locally in `src/data/ideas.ts`. There is no backend, authentication, persistent saved list, real user accounts, or messaging yet. Those features need a backend/API and database integration.

## Project structure

```text
src/
  components/
    DiscoverPreview.tsx
    Footer.tsx
    HowItWorks.tsx
    IdeaCard.tsx
    Navbar.tsx
  data/
    ideas.ts
  App.tsx
  main.tsx
  styles.css
```