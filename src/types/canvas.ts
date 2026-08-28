import type { Stroke } from "./journal";

// ---------------------------------------------------------------------------
// Canvas tool modes
// ---------------------------------------------------------------------------

export type CanvasToolMode =
  | "draw"
  | "erase"
  | "select"
  | "text"
  | "image"
  | "sticker"
  | "pan";

// ---------------------------------------------------------------------------
// Canvas state (local, not persisted directly)
// ---------------------------------------------------------------------------

export interface CanvasState {
  activeTool: CanvasToolMode;
  strokeColor: string;
  strokeWidth: number;
  isDrawing: boolean;
  currentStroke: Stroke | null;
  saveState: SaveState;
}

export type SaveState = "idle" | "saving" | "saved" | "offline" | "error";

// ---------------------------------------------------------------------------
// Input pointer type
// ---------------------------------------------------------------------------

export type PointerInputType = "pen" | "touch" | "mouse";

// ---------------------------------------------------------------------------
// Canvas page bounds (journal page is bounded, not infinite)
// ---------------------------------------------------------------------------

export interface CanvasPageBounds {
  width: number;
  height: number;
}

// A4-ish portrait page at 96dpi scale
export const DEFAULT_PAGE_BOUNDS: CanvasPageBounds = {
  width: 794,
  height: 1123,
};

// ---------------------------------------------------------------------------
// Canvas event payloads (domain-level, not vendor-specific)
// ---------------------------------------------------------------------------

export interface CanvasPointerEvent {
  x: number;
  y: number;
  pressure: number;
  inputType: PointerInputType;
  timestamp: number;
}
