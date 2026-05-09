import docs from '@/data/search-index.json';
import { normalizeQuery } from '@/search/query';
import { makeSnippetHtml } from '@/search/snippet';

function scoreDoc(doc, tokens) {
  const title = String(doc.title || "").toLowerCase();
  const body = String(doc.body || "").toLowerCase();

  let score = 0;
  for (const t of tokens) {
    const inTitle = title.includes(t);
    const inBody = body.includes(t);
    if (!inTitle && !inBody) return -1; // require all tokens
    if (inTitle) score += 8;
    if (inBody) score += 2;
  }
  return score;
}

export function searchPosts(query, limit = 20) {
  const tokens = normalizeQuery(query);
  if (tokens.length === 0) return [];

  const results = [];
  for (const doc of docs) {
    const score = scoreDoc(doc, tokens);
    if (score < 0) continue;

    results.push({
      slug: doc.slug,
      title: doc.title,
      topic: doc.topic,
      date: doc.date,
      score,
      snippetHtml: makeSnippetHtml(doc.body, query),
    });
  }

  results.sort((a, b) => b.score - a.score || String(a.title).localeCompare(String(b.title)));
  return results.slice(0, limit);
}

