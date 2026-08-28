# AI Journal

A tablet-first web app that combines a beautiful digital journal/scrapbook with an
embedded AI journaling companion. The journal is the hero; AI is embedded through
contextual actions rather than a chat window.

See [CLAUDE.md](CLAUDE.md) and [TECHNICAL_SPEC.md](TECHNICAL_SPEC.md) for the full
product and architecture direction.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS v4
- tldraw — canvas prototype (under evaluation in Phase 0)
- Firebase (Auth, Firestore, Storage) — Phase 1+
- Gemini API — Phase 3+

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. The current entry point (`/`) is the **Phase 0 canvas
spike**; the Phase 1 journal home lives at `/journals`.

## Testing on a Samsung tablet (Phase 0 goal)

Phase 0 is only "done" once handwriting is verified on a real S Pen device — not
DevTools emulation.

1. `npm run dev`
2. On the tablet browser, open `http://<laptop-LAN-IP>:3000` (not `localhost` —
   that points at the tablet itself). Use an HTTPS dev tunnel if LAN access is
   unavailable.
3. Check: handwriting feels natural, no input lag, pen vs finger behave sensibly,
   the page does not scroll while writing, and strokes survive a refresh.

## Environment

Copy `.env.local.example` to `.env.local` and fill in values as phases require it.
Never commit `.env*` files. Keep the Gemini key server-side (no `NEXT_PUBLIC_`
prefix).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
