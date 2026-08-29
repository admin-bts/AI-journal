"use client";

import { Tldraw, StateNode, DrawShapeUtil, defaultShapeUtils } from "tldraw";
import "tldraw/tldraw.css";
import type { Editor, TLUiOverrides, TLStateNodeConstructor } from "tldraw";

// ---------------------------------------------------------------------------
// Phase 0 — Canvas spike
// Goal: prove S Pen / touch handwriting works in a browser before Phase 1.
// Uses tldraw with a persistence key so strokes survive page refresh.
// ---------------------------------------------------------------------------

// --- Fast eraser -----------------------------------------------------------
// tldraw's built-in eraser sweeps a line segment against the geometry of every
// nearby stroke on every pointer move AND re-renders each candidate faded while
// you drag. On the Samsung tablet that's visibly laggy over dense handwriting.
//
// This replacement (same tool id, so it takes the built-in's place) does the
// cheapest thing that still feels like an eraser: one single-point hit test per
// move, then delete the whole shape under the cursor. No fade pass, no scribble,
// no per-stroke re-renders. Trade-off: it removes a stroke at a time rather than
// nibbling part of one — the lower draw-point cap below keeps long strokes split
// into smallish pieces so that still feels reasonable.
class FastEraserTool extends StateNode {
  static override id = "eraser";
  private isErasing = false;

  override onEnter() {
    this.editor.setCursor({ type: "cross", rotation: 0 });
  }

  override onPointerDown() {
    this.isErasing = true;
    this.editor.markHistoryStoppingPoint("fast erase");
    this.eraseUnderPointer();
  }

  override onPointerMove() {
    if (this.isErasing) this.eraseUnderPointer();
  }

  override onPointerUp() {
    this.isErasing = false;
  }

  override onCancel() {
    this.isErasing = false;
  }

  override onInterrupt() {
    this.isErasing = false;
  }

  private eraseUnderPointer() {
    const { editor } = this;
    const hit = editor.getShapeAtPoint(editor.inputs.getCurrentPagePoint(), {
      hitInside: true,
      margin: 6,
      renderingOnly: true,
    });
    if (!hit) return;

    const target = editor.getOutermostSelectableShape(hit);
    if (editor.isShapeOrAncestorLocked(target)) return;

    editor.deleteShapes([target.id]);
  }
}

const tools: TLStateNodeConstructor[] = [FastEraserTool];

// Phase 0 journal tools only. Keep tldraw's own toolbar component and just drop
// the tools a journal page doesn't need (arrows, geo shapes, frames, notes,
// laser…). Eraser stays in this set so it's visible in the main toolbar.
const KEPT_TOOLS = new Set(["select", "hand", "draw", "eraser", "text"]);

const overrides: TLUiOverrides = {
  tools(_editor, toolItems) {
    for (const id of Object.keys(toolItems)) {
      if (!KEPT_TOOLS.has(id)) delete toolItems[id];
    }
    return toolItems;
  },
};

// Cap points per stroke (default 600) so long strokes split into smaller shapes.
// Cheaper hit-testing, and the whole-shape eraser above then removes a segment
// of a long line rather than the entire line.
const DrawShapeUtilLite = DrawShapeUtil.configure({ maxPointsPerShape: 250 });
const shapeUtils = defaultShapeUtils.map((util) =>
  util === DrawShapeUtil ? DrawShapeUtilLite : util
);

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
        tools={tools}
        overrides={overrides}
        shapeUtils={shapeUtils}
      />
    </div>
  );
}
