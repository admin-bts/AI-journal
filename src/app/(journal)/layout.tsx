import type { ReactNode } from "react";

// Phase 1 — wrap with auth guard and journal nav
export default function JournalLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
