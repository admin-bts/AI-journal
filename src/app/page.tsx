"use client";

import { CanvasSpike } from "@/components/canvas/CanvasSpike";

// ---------------------------------------------------------------------------
// Phase 0 entry point — client component so tldraw runs in browser only.
// Replaced by the journal home screen in Phase 1.
// ---------------------------------------------------------------------------

// Bump this string on every revision so the tablet can confirm it loaded the
// newest build (compare the tag shown in the badge).
const BUILD = "b7 · 2026-08-29 12:38 · fast-eraser";

export default function Phase0Page() {
  return (
    <main className="fixed left-0 top-0 h-[100dvh] w-[100dvw] overflow-hidden bg-neutral-100">
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <span className="text-xs font-mono bg-amber-100 text-amber-700 px-3 py-1 rounded-full shadow-sm select-none">
          Phase 0 · Canvas Spike · build {BUILD}
        </span>
      </div>
      <CanvasSpike />
    </main>
  );
}
