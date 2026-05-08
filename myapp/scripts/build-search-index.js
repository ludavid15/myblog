import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.resolve("src", "posts");
const outFile = path.resolve("src", "data", "search-index.json");

function stripMarkdown(md) {
  let s = md;
  // Remove fenced code blocks
  s = s.replace(/```[\s\S]*?```/g, " ");
  // Remove inline code
  s = s.replace(/`[^`]*`/g, " ");
  // Remove images entirely
  s = s.replace(/!\[[^\]]*]\([^)]*\)/g, " ");
  // Keep link text only: [text](url) -> text
  s = s.replace(/\[([^\]]+)]\(([^)]+)\)/g, "$1");
  // Remove headings markers / blockquotes / list markers
  s = s.replace(/^#{1,6}\s+/gm, "");
  s = s.replace(/^\s*>\s+/gm, "");
  s = s.replace(/^\s*[-*+]\s+/gm, "");
  s = s.replace(/^\s*\d+\.\s+/gm, "");
  // Collapse whitespace
  s = s.replace(/\s+/g, " ").trim();
  return s;
}

async function buildSearchIndex() {
  await fs.mkdir(path.dirname(outFile), { recursive: true });

  const files = await fs.readdir(postsDir);
  const docs = [];

  for (const file of files) {
    if (!file.endsWith(".md")) continue;

    const slug = file.replace(/\.md$/, "");
    const filePath = path.join(postsDir, file);
    const raw = await fs.readFile(filePath, "utf8");

    const { data: frontmatter, content } = matter(raw);
    const title = frontmatter?.title || slug;
    const topic = frontmatter?.topic;
    const date = frontmatter?.date;

    const body = stripMarkdown(content);

    docs.push({
      slug,
      title,
      ...(topic ? { topic } : {}),
      ...(date ? { date } : {}),
      body,
    });
  }

  docs.sort((a, b) => String(a.title).localeCompare(String(b.title)));

  await fs.writeFile(outFile, JSON.stringify(docs, null, 2), "utf8");
  console.log(`Search index saved to ${outFile} (${docs.length} docs)`);
}

buildSearchIndex().catch((err) => {
  console.error("Error building search index:", err);
  process.exitCode = 1;
});

