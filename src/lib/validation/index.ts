// Input validation helpers for API routes

export function requireString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${field} is required and must be a non-empty string`);
  }
  return value.trim();
}

export function optionalString(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value !== "string") return undefined;
  return value.trim() || undefined;
}

export function requireOneOf<T extends string>(
  value: unknown,
  field: string,
  allowed: readonly T[]
): T {
  if (!allowed.includes(value as T)) {
    throw new Error(`${field} must be one of: ${allowed.join(", ")}`);
  }
  return value as T;
}
