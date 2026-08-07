/**
 * Helper to serialize JSON-LD schema objects safely.
 * Escapes unsafe HTML characters (<, >, &) to prevent XSS vulnerabilities.
 */
export function stringifyJsonLd(data: Record<string, unknown> | Array<Record<string, unknown>>): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}
