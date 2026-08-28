@AGENTS.md

# CLAUDE.md --- AI Journal Web App

## 1. Project Identity

Project name: **AI Journal** (working title)

This is a **tablet-first web application** that combines a beautiful
digital journal/scrapbook experience with an embedded AI journaling
companion.

The core product idea:

> A private, aesthetic journal for people who want to journal but often
> do not know what to write, and who want their journal to respond,
> reflect, summarize, and help them express themselves.

The journal itself is the hero. AI is embedded into the journal
experience rather than presented as a generic chatbot.

### Primary devices

1.  Samsung/Android tablet with stylus/S Pen
2.  iPad with Apple Pencil
3.  Desktop/laptop browser
4.  Mobile browser

The application is **web-first**. Do not assume a native iOS/Android
app.

------------------------------------------------------------------------

## 2. Product Principles

### 2.1 Journal first, AI second

The product must feel like a beautiful journal, not ChatGPT inside a
diary.

AI should appear through contextual actions such as:

-   ✨ Ask Journal
-   💭 Give Me a Prompt
-   💌 Talk to Me
-   🪄 Transform This
-   📖 Summarise My Month
-   🌱 Reflect With Me

Do not make a persistent AI chat window the primary interface.

### 2.2 Creativity without pressure

The product solves the blank-page problem.

A user should be able to:

-   receive a prompt
-   answer one question at a time
-   type naturally
-   handwrite naturally
-   add photos
-   decorate the page
-   ask the AI to respond
-   turn their writing into creative elements

### 2.3 User remains the author

AI should help the user express themselves, not write their life for
them.

Default behaviour:

-   encourage reflection
-   ask gentle follow-up questions
-   validate feelings without diagnosing
-   summarize
-   identify themes
-   offer creative transformations

Avoid overconfident psychological conclusions.

### 2.4 Privacy is a product feature

Journal content is highly personal.

Never expose journal entries publicly by default.

Do not create social features that require public posting.

Do not use journal content for advertising.

Keep data ownership and deletion pathways clear.

------------------------------------------------------------------------

## 3. Development Environment

Primary development:

-   VS Code
-   Claude Code
-   Git
-   GitHub

Recommended local workflow:

```
VS Code → Claude Code → Local development server → Laptop LAN IP / temporary HTTPS tunnel → Samsung tablet browser → S Pen testing
```

The developer must be able to test the application on a real Samsung
tablet during development.

Do not treat desktop browser testing as sufficient.

------------------------------------------------------------------------

## 4. Technology Direction

Preferred stack:

-   Next.js (v16, App Router)
-   React
-   TypeScript (strict mode)
-   Tailwind CSS
-   Firebase (Auth, Firestore, Storage, Cloud Functions where needed)
-   Gemini API for AI features
-   tldraw for canvas prototype (evaluated in Phase 0)
-   GitHub for source control

------------------------------------------------------------------------

## 5. Non-Negotiable UX Requirements

### Tablet-first

The primary interaction is:

> Open the web app on a tablet → open a journal page → write with a stylus.

Touch and stylus interaction must be first-class.

### Input types

A journal page must eventually support:

-   handwriting
-   typed text
-   images/photos
-   stickers
-   icons
-   widgets
-   AI response blocks
-   decorative elements

### Page model

A page is a bounded journal surface, not an infinite whiteboard.

### Autosave

Journal edits should save automatically. Never require a Save button.
Use debounced persistence with a lightweight save state indicator.

------------------------------------------------------------------------

## 6. Engineering Rules

### Code quality

-   TypeScript strict mode.
-   Avoid `any` unless documented.
-   Prefer small, composable components.
-   Keep business logic out of presentation components.
-   Use clear domain types.
-   Validate external input.
-   Never expose server-only API keys in client code.
-   Keep secrets in environment variables.
-   Do not hard-code Firebase/Gemini credentials.
-   Never commit `.env*` files.
-   Rotate any credential immediately if exposed.

### Architecture

```
UI → Domain/application logic → Services → External providers

AI: UI → AI application service → Prompt/context builder → AI provider adapter → Gemini
```

------------------------------------------------------------------------

## 7. AI Safety and Behaviour

AI must not:

-   diagnose mental-health conditions
-   claim to be a therapist
-   encourage dependency on the AI
-   shame or manipulate the user
-   provide dangerous instructions

AI should:

-   use age-appropriate language
-   encourage healthy reflection
-   avoid overclaiming
-   suggest trusted adult/support when content appears serious

------------------------------------------------------------------------

## 8. MVP Development Order

### Phase 0 — Device Canvas Spike (CURRENT)

Build only:

-   Next.js shell ✅
-   tldraw canvas ✅
-   pen input
-   touch interaction
-   basic text
-   erase
-   undo/redo
-   simple persistence

**Test on Samsung tablet. Do not build AI yet.**

### Phase 1 — Journal Foundation

-   authentication
-   journals / pages
-   page navigation
-   autosave
-   Firestore schema / storage
-   responsive layout

### Phase 2 — Creative Journal

-   page templates / backgrounds / stickers / icons / photos / widgets
-   object manipulation

### Phase 3 — AI Companion

-   daily prompt / guided prompting / AI response / Ask Journal / Talk to Me / Transform This

### Phase 4 — Journal Memory

-   monthly summary / themes / memory cards / On This Day / Future Me

------------------------------------------------------------------------

## 9. Testing Rules

Every significant canvas feature must be tested on:

-   Samsung tablet + S Pen
-   desktop mouse/trackpad

Do not declare tablet support based solely on Chrome DevTools device emulation.

------------------------------------------------------------------------

## 10. UI/Design Direction

Visual language: aesthetic, warm, playful, personal, scrapbook-inspired, premium but not corporate, calming, expressive.

Avoid: enterprise dashboards, excessive cards, generic SaaS UI, clinical mental-health aesthetics.

Potential theme families: Sakura, Cloud, Night, Forest, Ocean, Cozy, Study, Minimal.

The design system must support theme tokens.

------------------------------------------------------------------------

## 11. Performance

Canvas performance is critical.

Use: local/in-memory canvas state, batched persistence, debounced saves, Firebase Storage for binary assets, Firestore for metadata, lazy loading, thumbnails where appropriate.

Avoid: rerendering the entire page for every pointer event, saving every stroke point to Firestore individually.

------------------------------------------------------------------------

## 12. Git Workflow

Use small, understandable commits:

```
feat: add tablet canvas prototype
feat: persist journal pages
fix: prevent touch scrolling while drawing
```

Do not mix unrelated features in one commit.

------------------------------------------------------------------------

## 13. Claude Code Behaviour

Before implementing a major feature:

1.  Read this file.
2.  Read `TECHNICAL_SPEC.md`.
3.  Inspect the existing architecture.
4.  Identify dependencies.
5.  Make the smallest appropriate implementation.
6.  Test locally.
7.  Explain assumptions and tradeoffs.
8.  Do not silently introduce major architectural changes.

Do not build features outside the current phase unless explicitly requested.

------------------------------------------------------------------------

## 14. Definition of Done

A feature is complete when:

-   it works in the intended browser
-   it works on Samsung tablet where applicable
-   it handles touch/stylus correctly
-   it persists correctly
-   loading/error states exist
-   TypeScript has no avoidable errors
-   no secrets are exposed
-   the UI matches the design direction

------------------------------------------------------------------------

## 15. Product North Star

> "I actually want to open my journal."
> "It feels like my journal understands me."
