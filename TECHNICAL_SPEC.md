# TECHNICAL_SPEC.md --- AI Journal Web App

## 1. Document Purpose

This document defines the initial product and technical architecture for
an aesthetic, tablet-first AI journaling web application.

Working product name: **AI Journal**

The application is a web app accessed through a browser. It is not
initially a native mobile application.

Primary test device:

> Samsung tablet with S Pen

Secondary target:

> iPad with Apple Pencil

------------------------------------------------------------------------

# 2. Product Vision

## 2.1 Problem

Many people want to journal but struggle with:

-   not knowing what to write
-   feeling intimidated by a blank page
-   difficulty making a journal visually creative
-   wanting reflection after writing
-   wanting summaries of their personal journey
-   wanting to preserve memories with photos and decorations

Traditional digital journals usually solve storage but not the creative
and reflective experience.

## 2.2 Solution

Create a private, aesthetic digital journal where users can:

-   write by hand
-   type
-   add photos
-   add stickers
-   add icons
-   add widgets
-   choose page styles
-   decorate pages
-   receive AI prompts
-   receive AI reflections
-   place AI responses directly onto the journal page
-   summarize their journal over time
-   optionally build a personal journal memory

Core principle:

> The journal is the product. AI is embedded intelligence inside the
> journal.

------------------------------------------------------------------------

# 3. Target Experience

## Primary flow

``` text
Open website
    ↓
Sign in
    ↓
Choose/create journal
    ↓
Choose page style
    ↓
Open page
    ↓
Write / type / decorate
    ↓
Ask Journal or receive prompt
    ↓
AI responds
    ↓
User optionally places response on page
    ↓
Autosave
    ↓
Return later
```

------------------------------------------------------------------------

# 4. Device and Browser Strategy

## 4.1 Web-first

The initial application must run through a normal browser.

No native app dependency.

Recommended initial browsers:

-   Chrome on Android/Samsung tablet
-   Safari on iPad
-   Chrome/Edge/Safari on desktop

## 4.2 Tablet-first

Responsive priorities:

1.  Tablet
2.  Desktop
3.  Mobile

The UI must be touch-friendly.

Minimum interactive target size should generally be approximately 44px
or larger.

------------------------------------------------------------------------

# 5. Local Development and Real Device Testing

Development is performed in VS Code using Claude Code.

The application runs locally.

Typical flow:

``` text
VS Code
   ↓
npm run dev
   ↓
Local development server
   ↓
Laptop LAN IP
   ↓
Samsung tablet browser
   ↓
S Pen interaction
```

Example:

``` text
http://192.168.x.x:3000
```

The exact IP is environment-dependent and must not be hard-coded.

If local network access is unavailable, use a temporary HTTPS
development tunnel.

Do not assume `localhost` on the tablet refers to the laptop. The
tablet's `localhost` refers to the tablet itself.

------------------------------------------------------------------------

# 6. Recommended Technology Stack

  Layer                   Technology
  ----------------------- --------------------------------------------
  Framework               Next.js
  UI                      React
  Language                TypeScript
  Styling                 Tailwind CSS
  Canvas prototype        tldraw
  Authentication          Firebase Authentication
  Database                Cloud Firestore
  File storage            Firebase Storage
  Server-side functions   Firebase Cloud Functions where appropriate
  AI                      Gemini API
  Source control          Git + GitHub
  Development             VS Code + Claude Code
  AI experimentation      Google AI Studio
  Hosting                 To be selected after prototype

The architecture must keep hosting loosely coupled where practical.

------------------------------------------------------------------------

# 7. Canvas Architecture

## 7.1 Core decision

The journal page should be implemented as a bounded visual canvas.

The canvas engine should be treated as an abstraction rather than
allowing vendor-specific concepts to leak throughout the application.

Create a domain-level interface such as:

``` ts
JournalCanvas
CanvasObject
CanvasStroke
CanvasPage
```

The underlying implementation may initially use tldraw.

## 7.2 Why tldraw is being evaluated

tldraw provides a strong starting point for:

-   canvas interaction
-   object manipulation
-   drawing
-   selection
-   transforms
-   undo/redo
-   pointer interaction

However, it must pass real-device testing before becoming a permanent
dependency.

## 7.3 Device spike

Before implementing the complete product, create a canvas prototype
with:

-   pen drawing
-   eraser
-   undo
-   redo
-   zoom
-   touch
-   object selection
-   basic text
-   basic persistence

Test on Samsung S Pen.

Acceptance criteria:

-   writing feels natural
-   no severe input lag
-   finger and pen interactions are distinguishable where needed
-   page does not unexpectedly scroll while writing
-   strokes survive refresh

If the prototype fails, evaluate alternative canvas engines.

------------------------------------------------------------------------

# 8. Journal Page Model

A journal consists of:

``` text
User
 └── Journal
      └── Page
           ├── TextObject
           ├── DrawingObject
           ├── ImageObject
           ├── StickerObject
           ├── IconObject
           ├── WidgetObject
           └── AIResponseObject
```

A page is a fixed visual surface.

------------------------------------------------------------------------

# 9. Object Model

All visual elements should share common transform properties.

Example conceptual model:

``` ts
interface BaseJournalObject {
  id: string;
  type: JournalObjectType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity?: number;
  zIndex: number;
}
```

Possible types:

``` ts
type JournalObjectType =
  | "text"
  | "drawing"
  | "image"
  | "sticker"
  | "icon"
  | "widget"
  | "ai-response";
```

Do not store implementation-specific canvas objects as the primary
domain representation if avoidable.

------------------------------------------------------------------------

# 10. Handwriting

## 10.1 Input

Support stylus input through browser pointer events/canvas capabilities.

The implementation must distinguish, where supported:

-   pen/stylus
-   finger
-   mouse

## 10.2 Storage

Handwriting should be stored as vector stroke data where practical.

Conceptual structure:

``` ts
interface Stroke {
  id: string;
  points: Array<{
    x: number;
    y: number;
    pressure?: number;
    timestamp?: number;
  }>;
  color: string;
  width: number;
}
```

Do not store every pointer event as a Firestore write.

Use local canvas state and batched/debounced persistence.

## 10.3 Future handwriting recognition

Future functionality:

``` text
Handwriting
   ↓
Recognition
   ↓
Extracted text
   ↓
AI context
```

The original handwriting must remain intact.

AI should not replace the user's handwriting automatically.

------------------------------------------------------------------------

# 11. Typed Text

Text objects should support at minimum:

-   content
-   font family
-   font size
-   weight
-   alignment
-   color
-   line height
-   width
-   rotation

The first version should avoid trying to reproduce Microsoft Word.

The objective is expressive journal typography.

------------------------------------------------------------------------

# 12. Images and Photos

Users should be able to select images from:

-   tablet photo library
-   device file picker
-   desktop file system

Binary assets should be uploaded to Firebase Storage.

Firestore should store metadata/reference information, not large binary
files.

Conceptual:

``` text
Firebase Storage
/users/{userId}/journals/{journalId}/pages/{pageId}/assets/{assetId}
```

Firestore:

``` text
{
  type: "image",
  storagePath: "...",
  width: ...,
  height: ...,
  x: ...,
  y: ...,
  rotation: ...
}
```

------------------------------------------------------------------------

# 13. Stickers and Icons

Initial implementation should use curated local assets.

Supported formats can include:

-   SVG
-   PNG
-   WebP

Sticker object:

``` ts
interface StickerObject extends BaseJournalObject {
  type: "sticker";
  assetId: string;
}
```

Do not build a marketplace in MVP.

Future possibility:

> Theme/sticker marketplace

------------------------------------------------------------------------

# 14. Widgets

Widgets are small visual modules that can be placed onto a page.

Initial examples:

-   date
-   time
-   mood
-   weather
-   gratitude
-   quote
-   countdown
-   daily prompt

Widgets should be implemented as configurable components.

Example:

``` ts
interface WidgetObject extends BaseJournalObject {
  type: "widget";
  widgetType: string;
  configuration: Record<string, unknown>;
}
```

Avoid creating dozens of widgets before validating which ones users
actually use.

------------------------------------------------------------------------

# 15. Page Styles and Themes

A journal page can have:

-   background colour
-   paper texture
-   border
-   decorative elements
-   typography style
-   default sticker/icon set

Potential initial themes:

-   Sakura
-   Cloud
-   Night
-   Forest
-   Ocean
-   Cozy
-   Study
-   Minimal

Themes should be represented by design tokens/configuration.

Example:

``` ts
interface JournalTheme {
  id: string;
  name: string;
  background: string;
  texture?: string;
  primaryFont: string;
  accentFont?: string;
  stickerPackId?: string;
}
```

------------------------------------------------------------------------

# 16. AI Architecture

AI must not be called directly from the browser using a secret API key.

Preferred flow:

``` text
Browser
   ↓
Next.js server/API route or secure backend function
   ↓
AI service
   ↓
Prompt/context builder
   ↓
Gemini provider
   ↓
Structured AI result
   ↓
Browser
```

## 16.1 AI service abstraction

Create a provider-independent interface.

Conceptual:

``` ts
interface AIProvider {
  generateJournalPrompt(input: PromptInput): Promise<PromptResult>;
  respondToJournal(input: JournalResponseInput): Promise<JournalResponse>;
  summarizeJournal(input: SummaryInput): Promise<JournalSummary>;
}
```

Gemini is the first implementation.

This avoids vendor lock-in.

------------------------------------------------------------------------

# 17. AI Features

## MVP AI features

### Daily Prompt

Generate an age-appropriate, creative prompt based on:

-   mood
-   optional recent context
-   journal preferences
-   date
-   selected theme

### Guided Prompting

Instead of asking:

> "Tell me about your day."

The AI can ask one question at a time.

Example:

``` text
What happened?

↓
Who were you with?

↓
What did you feel?

↓
What do you want to remember?
```

### Talk to Me

User explicitly asks the journal for a response.

### AI Reflection

AI returns a short reflection based on the current entry.

### Add to Page

The user can approve an AI response and turn it into an
AIResponseObject.

------------------------------------------------------------------------

# 18. AI Response Object

Conceptual:

``` ts
interface AIResponseObject extends BaseJournalObject {
  type: "ai-response";
  content: string;
  responseType:
    | "reflection"
    | "prompt"
    | "summary"
    | "quote"
    | "encouragement";
  generatedAt: string;
}
```

The AI must never silently overwrite the original user content.

------------------------------------------------------------------------

# 19. AI Context Strategy

Do not send the entire journal to the AI for every interaction.

Use layered context.

## Layer 1 --- Current context

Current page/entry.

## Layer 2 --- Recent context

Recent selected entries where useful.

## Layer 3 --- Long-term memory

Explicitly derived, user-controlled memories.

Example:

``` text
Current Entry
+
Relevant Recent Entries
+
Optional Journal Memory
```

The AI context builder decides what is necessary.

------------------------------------------------------------------------

# 20. Journal Memory

Long-term memory is a future feature.

Potential memory categories:

-   recurring interests
-   important events
-   goals
-   favourite activities
-   recurring themes
-   user-selected memories

Do not automatically store every journal sentence as memory.

Future UX:

> "Save this as a journal memory?"

Allow users to inspect/delete memories.

------------------------------------------------------------------------

# 21. Monthly Summary

Future feature:

``` text
August Journal

18 entries
7 happy moments
4 challenging days
11 creative moments

Themes:
- friendship
- school
- creativity

AI reflection:
"You seemed to feel most energized when..."
```

Avoid presenting mood summaries as medical or psychological assessments.

------------------------------------------------------------------------

# 22. Database Architecture

Recommended Firestore structure:

``` text
users/{userId}

journals/{journalId}

journals/{journalId}/pages/{pageId}

journals/{journalId}/pages/{pageId}/objects/{objectId}

users/{userId}/memories/{memoryId}

users/{userId}/settings/{document}
```

Alternative denormalized structures can be used if performance/testing
demonstrates a need.

## User

``` ts
interface UserProfile {
  id: string;
  createdAt: Timestamp;
  displayName?: string;
  avatarUrl?: string;
  preferredThemeId?: string;
}
```

## Journal

``` ts
interface Journal {
  id: string;
  userId: string;
  title: string;
  coverThemeId?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## Page

``` ts
interface JournalPage {
  id: string;
  journalId: string;
  pageNumber: number;
  templateId?: string;
  themeId?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## Object

``` ts
interface JournalObject {
  id: string;
  pageId: string;
  type: JournalObjectType;
  payload: Record<string, unknown>;
  transform: {
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
  };
  zIndex: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

------------------------------------------------------------------------

# 23. Persistence Strategy

Canvas interaction should be local-first during editing.

Recommended conceptual flow:

``` text
User interaction
      ↓
Canvas state
      ↓
Local state / local cache
      ↓
Debounced save
      ↓
Firestore
```

For larger stroke data or page snapshots, evaluate whether storing a
serialized page document is more efficient than one Firestore document
per object.

Do not optimize prematurely.

The first prototype should prioritize correctness and user experience.

------------------------------------------------------------------------

# 24. Offline Considerations

Future support:

-   local editing
-   offline page access
-   queued synchronization

Firebase's offline capabilities can be evaluated.

Offline support should not be promised publicly until tested thoroughly
with:

-   tablet
-   browser refresh
-   intermittent Wi-Fi
-   conflicting edits

------------------------------------------------------------------------

# 25. Security

## Authentication

Start with:

-   email/password or email link
-   optional Google sign-in if appropriate

Future:

-   Apple sign-in
-   other identity providers

## Firestore rules

Users may only access their own journals and associated assets.

Conceptual:

``` text
request.auth.uid == resource.data.userId
```

Exact rules must be designed against the final data model.

## Storage

Users may only read/write assets belonging to their own journal.

## API keys

Gemini API credentials must remain server-side.

Never put secrets into `NEXT_PUBLIC_*` variables.

Store secrets in `.env.local` for local development, and in the
hosting platform's environment/secret manager for staging and
production. Never commit `.env*` files to Git; ensure they are listed
in `.gitignore`. Rotate a credential immediately if it is ever exposed
in logs, client bundles, git history, or a public repository.

------------------------------------------------------------------------

# 26. Privacy

The product handles highly personal information.

Minimum requirements:

-   private journals by default
-   user-controlled deletion
-   clear data export strategy as product matures
-   no public journal feed in MVP
-   no advertising based on journal content
-   no selling journal content
-   transparent AI processing disclosure

Because minors may use the product, privacy and safety requirements must
be reviewed before public launch.

------------------------------------------------------------------------

# 27. Project Structure

Recommended initial structure:

``` text
src/
  app/
    (auth)/
    (journal)/
    api/
      ai/
  components/
    journal/
    canvas/
    editor/
    stickers/
    widgets/
    ai/
    ui/
  features/
    journals/
    pages/
    canvas/
    ai/
    media/
    themes/
  lib/
    firebase/
    ai/
    storage/
    validation/
  types/
    journal.ts
    canvas.ts
    ai.ts
```

The exact structure may evolve.

Do not create folders merely for the sake of abstraction.

------------------------------------------------------------------------

# 28. API Direction

Potential endpoints:

``` text
POST /api/ai/prompt
POST /api/ai/respond
POST /api/ai/summarize
POST /api/ai/transform
```

Future:

``` text
POST /api/ai/memory
GET  /api/ai/memories
DELETE /api/ai/memories/:id
```

Use authenticated requests.

Validate all payloads server-side.

------------------------------------------------------------------------

# 29. AI Prompt Design

Prompts should explicitly define:

-   role
-   user age context where available
-   tone
-   allowed behaviour
-   current journal content
-   relevant context
-   requested output format

Prefer structured outputs where useful.

Example response schema:

``` ts
interface JournalAIResponse {
  response: string;
  suggestedFollowUps?: string[];
  canAddToPage: boolean;
  responseType: "reflection" | "prompt" | "encouragement";
}
```

------------------------------------------------------------------------

# 30. UX Screens

Initial screens:

### Authentication

-   sign in
-   create account

### Journal Home

-   journals
-   recent pages
-   create journal

### Journal Page

Primary experience:

-   page canvas
-   top navigation
-   add menu
-   writing tools
-   AI actions
-   page controls

### Theme Picker

-   page styles
-   backgrounds
-   theme previews

### Sticker/Asset Picker

-   stickers
-   icons
-   uploads

### AI Panel

Contextual rather than persistent.

### Journal Insights

Future:

-   monthly summary
-   memories
-   patterns
-   on-this-day

------------------------------------------------------------------------

# 31. Journal Page Interaction

Suggested tablet layout:

``` text
┌───────────────────────────────────────────┐
│ ← Journal       Aug 27       ✨ AI    ⋮   │
├───────────────────────────────────────────┤
│                                           │
│             JOURNAL PAGE                  │
│                                           │
│       Text / handwriting / photos         │
│       stickers / widgets / AI             │
│                                           │
│                                           │
├───────────────────────────────────────────┤
│ ✍️  🧽  ↩  ↪     +     🌸     ✨ AI       │
└───────────────────────────────────────────┘
```

The toolbar should adapt to tablet orientation.

------------------------------------------------------------------------

# 32. Autosave UX

The application should use a lightweight save indicator:

``` text
Saving...
Saved ✓
Offline
Syncing...
```

Do not interrupt the user with modal save dialogs.

------------------------------------------------------------------------

# 33. Performance Requirements

The canvas must remain responsive during handwriting.

Priority order:

1.  Pointer/stylus latency
2.  Smooth rendering
3.  Reliable persistence
4.  Image loading
5.  AI response speed

AI can load asynchronously.

A slow AI response must never block writing.

------------------------------------------------------------------------

# 34. Image Optimization

When users upload photos:

-   preserve original where required
-   create optimized display versions
-   use thumbnails for journal overview
-   avoid loading full-resolution images unnecessarily
-   consider WebP/AVIF for display copies

Future: image compression pipeline.

------------------------------------------------------------------------

# 35. Subscription Architecture

Do not implement billing in the first canvas prototype.

Future model:

### Free

-   limited journals/pages
-   limited AI prompts
-   basic themes

### Premium

-   unlimited journaling
-   unlimited AI
-   premium themes
-   AI monthly summaries
-   advanced memory
-   creative transformations

Potential pricing can be validated later.

The architecture should keep subscription state separate from core
journal data.

------------------------------------------------------------------------

# 36. Development Roadmap

## Sprint 0 --- Technical Spike

Goal:

> Prove Samsung S Pen web handwriting works well.

Build:

-   Next.js
-   tldraw prototype
-   simple page
-   pen
-   eraser
-   undo/redo
-   basic text
-   local persistence

No Firebase requirement unless needed for testing.

Acceptance:

-   comfortable handwriting
-   no major lag
-   tablet browser works
-   touch behaviour acceptable

------------------------------------------------------------------------

## Sprint 1 --- Journal Foundation

Build:

-   Firebase project
-   authentication
-   journal CRUD
-   pages
-   Firestore persistence
-   Storage
-   responsive shell

------------------------------------------------------------------------

## Sprint 2 --- Creative Canvas

Build:

-   text objects
-   handwriting
-   photos
-   stickers
-   icons
-   widgets
-   templates
-   transforms
-   autosave

------------------------------------------------------------------------

## Sprint 3 --- AI Companion

Build:

-   prompt generation
-   guided questions
-   AI response
-   AI response object
-   Ask Journal
-   Talk to Me
-   Transform This

------------------------------------------------------------------------

## Sprint 4 --- Memory and Delight

Build:

-   monthly summary
-   memory cards
-   Future Me
-   On This Day
-   personalized prompts
-   journal garden / visual progression

------------------------------------------------------------------------

# 37. Google AI Studio Role

Google AI Studio should be used as an **AI experimentation
environment**, not the primary application development environment.

Use it to test:

-   Gemini model selection
-   prompt quality
-   AI response tone
-   structured outputs
-   summarization
-   prompt generation
-   safety behaviour

Then move validated prompts/logic into the application's AI service
layer.

Primary application development remains:

> VS Code + Claude Code

------------------------------------------------------------------------

# 38. Future PWA Direction

The architecture should remain compatible with a future Progressive Web
App.

Potential future features:

-   home-screen installation
-   fullscreen experience
-   notifications
-   improved caching
-   limited offline operation

Do not make PWA complexity a blocker for MVP.

------------------------------------------------------------------------

# 39. Future Native App Decision

Do not build native apps until there is evidence that the web experience
has product-market fit.

Possible future:

``` text
Web app
   ↓
PWA
   ↓
Native iOS/Android
```

Only proceed when justified by:

-   usage
-   retention
-   performance limitations
-   user demand
-   device-specific capabilities

------------------------------------------------------------------------

# 40. MVP Definition

The first real MVP is complete when a user can:

1.  Create an account.
2.  Create a journal.
3.  Open a beautiful journal page.
4.  Choose a page style.
5.  Handwrite with S Pen.
6.  Type.
7.  Add a photo.
8.  Add a sticker.
9.  Save automatically.
10. Return later and see the exact page.
11. Request an AI prompt.
12. Write an entry.
13. Ask the AI to respond.
14. Add the AI response to the page.
15. View previous pages.

Everything else is secondary.

------------------------------------------------------------------------

# 41. Success Criteria for First Prototype

The first prototype should answer three questions:

### Technical

> Can a user comfortably handwrite on a Samsung tablet through a web
> browser?

### Product

> Is the journal page enjoyable enough that the user wants to keep using
> it?

### AI

> Does the AI response make journaling feel meaningfully better than a
> normal blank journal?

If these three are successful, continue building.

------------------------------------------------------------------------

# 42. North Star

The final experience should feel like:

**A beautiful personal space + creative scrapbook + journal + gentle AI
companion.**

The emotional outcome is:

> "I don't know what to write."

becomes:

> "The journal gave me something to think about."

Then:

> "I wrote it down."

Then:

> "The journal responded."

And eventually:

> "It remembers my journey."

That is the product.
