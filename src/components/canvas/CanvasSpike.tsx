"use client";

import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import type { Editor } from "tldraw";

// ---------------------------------------------------------------------------
// Phase 0 — Canvas spike
// Goal: prove S Pen / touch handwriting works in a browser before Phase 1.
// Uses tldraw with a persistence key so strokes survive page refresh.
// ---------------------------------------------------------------------------

interface CanvasSpikeProps {
  persistenceKey?: string;
}

export function CanvasSpike({ persistenceKey = "journal-spike-v1" }: CanvasSpikeProps) {
  function handleMount(editor: Editor) {
    // Start in draw mode so the user can write immediately
    editor.setCurrentTool("draw");

    // Disable grid — journal pages don't show a dot grid by default
    editor.updateInstanceState({ isGridMode: false });
  }

  return (
    <div className="absolute inset-0">
      <Tldraw
        persistenceKey={persistenceKey}
        onMount={handleMount}
        // Keep the default tldraw UI so toolbar/tools are accessible during testing
      />
    </div>
  );
}
