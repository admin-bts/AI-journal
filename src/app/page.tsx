"use client";

import { CanvasSpike } from "@/components/canvas/CanvasSpike";

// ---------------------------------------------------------------------------
// Phase 0 entry point — client component so tldraw runs in browser only.
// Replaced by the journal home screen in Phase 1.
// ---------------------------------------------------------------------------

export default function Phase0Page() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-neutral-100">
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <span className="text-xs font-mono bg-amber-100 text-amber-700 px-3 py-1 rounded-full shadow-sm select-none">
          Phase 0 · Canvas Spike · Test S Pen / touch / undo / persist
        </span>
      </div>
      <CanvasSpike />
    </main>
  );
}
