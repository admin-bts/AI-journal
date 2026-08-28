"use client";

import type { SaveState } from "@/types/canvas";

interface SaveIndicatorProps {
  state: SaveState;
}

const labels: Record<SaveState, string> = {
  idle: "",
  saving: "Saving…",
  saved: "Saved ✓",
  offline: "Offline",
  error: "Retry",
};

export function SaveIndicator({ state }: SaveIndicatorProps) {
  if (state === "idle") return null;

  return (
    <span
      aria-live="polite"
      className="text-xs text-neutral-400 select-none transition-opacity duration-300"
    >
      {labels[state]}
    </span>
  );
}
