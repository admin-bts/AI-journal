// Firebase Storage helpers — Phase 1+
// Placeholder for Sprint 1 implementation

export function buildAssetPath(
  userId: string,
  journalId: string,
  pageId: string,
  assetId: string
): string {
  return `users/${userId}/journals/${journalId}/pages/${pageId}/assets/${assetId}`;
}
