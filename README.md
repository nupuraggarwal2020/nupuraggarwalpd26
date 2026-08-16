# nupur-site

Conversion-focused portfolio: editorial hero, sticky stacking case-study
cards with parallax placeholder visuals, a more-work grid, and a
curtain-reveal footer with googly eyes, a cursor-following pill, and
confetti + email copy on click.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 (tokens in `app/globals.css`)
- `motion` for scroll-linked parallax
- `canvas-confetti` for the footer moment
- Fonts: Instrument Serif (display) + Inter (UI), via `next/font`

## Run it

```bash
npm install
npm run dev   # http://localhost:3002
```

## Structure

- `lib/content.ts` — all copy: hero, four main case studies, more-work
  projects, email/links. Edit words here.
- `components/CaseStack.tsx` — sticky stacking cards; the placeholder
  visual panels live here and get replaced with real project imagery.
- `components/Footer.tsx` — the interactive footer.
- `app/about/page.tsx` — stub awaiting content.
- `app/work/[slug]/page.tsx` — shared case-study placeholder.
