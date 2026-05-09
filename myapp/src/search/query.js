export function normalizeQuery(q) {
  return String(q || '')
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}
