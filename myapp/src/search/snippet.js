function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeQuery(q) {
  return String(q || "")
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

export function makeSnippetHtml(text, query, opts = {}) {
  const before = opts.before ?? 80;
  const after = opts.after ?? 140;
  const haystack = String(text || "");
  const tokens = normalizeQuery(query);

  if (!haystack) return "";
  if (tokens.length === 0) return escapeHtml(haystack.slice(0, before + after));

  const lower = haystack.toLowerCase();
  let firstIdx = -1;
  let firstTok = "";
  for (const tok of tokens) {
    const idx = lower.indexOf(tok);
    if (idx !== -1 && (firstIdx === -1 || idx < firstIdx)) {
      firstIdx = idx;
      firstTok = tok;
    }
  }

  let start = 0;
  let end = Math.min(haystack.length, before + after);
  if (firstIdx !== -1) {
    start = Math.max(0, firstIdx - before);
    end = Math.min(haystack.length, firstIdx + firstTok.length + after);
  }

  // Expand to word-ish boundaries
  while (start > 0 && /\S/.test(haystack[start - 1])) start--;
  while (end < haystack.length && /\S/.test(haystack[end])) end++;

  const prefix = start > 0 ? "…" : "";
  const suffix = end < haystack.length ? "…" : "";

  const windowText = haystack.slice(start, end);
  let html = escapeHtml(windowText);

  // Highlight all tokens (safe because we escaped first)
  for (const tok of tokens) {
    if (!tok) continue;
    const escapedTok = escapeHtml(tok);
    const re = new RegExp(escapedTok.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    html = html.replace(re, (m) => `<mark>${m}</mark>`);
  }

  return `${prefix}${html}${suffix}`;
}

