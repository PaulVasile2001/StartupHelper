# Startup Helper — React

A React + Vite + TypeScript frontend replacement for the original static Startup Helper landing page.

## Run locally

```bash
npm install
npm run dev
```

## Lead collection

The landing page uses Formspree to collect newsletter signups. Create a form in
Formspree, copy its endpoint, then set it in a local `.env` or `.env.local` file:

```text
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

Restart the dev server after changing the environment file. The endpoint is
public in a static site, so do not put private credentials in this variable.

## Analytics

The site uses PostHog for page views, a newsletter signup funnel, and session
replay. Add your PostHog project token to `.env` or `.env.local`; the EU
ingestion host is the default:

```text
VITE_POSTHOG_KEY=your_posthog_project_api_key
VITE_POSTHOG_HOST=https://eu.i.posthog.com
```

Use the ingestion host for your PostHog project region. Analytics and session
replay start only after a visitor accepts; visitors can reject or change their
choice using “Privacy settings”. Input fields are masked in session recordings,
console-log capture, performance capture, and automatic event capture are
disabled. The funnel events are `cta_clicked`,
`newsletter_signup_submitted`, and `newsletter_signup_succeeded`; no email
address is sent as an analytics property. Enable session replay for the project
in PostHog if it is not already enabled.

## Deployment

Pushing to `main` automatically builds and publishes the site through the
GitHub Actions workflow in `.github/workflows/deploy.yml`. The Formspree
endpoint and PostHog project token there are public client-side settings and
are included in the published JavaScript bundle; do not put private credentials
there.

## Current limitations
This is a frontend prototype. Sample ideas are stored locally in `src/data/ideas.ts`. There is no backend, authentication, persistent saved list, real user accounts, or messaging yet. Those features need a backend/API and database integration. Newsletter signups require a configured Formspree endpoint.

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