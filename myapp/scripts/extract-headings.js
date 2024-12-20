import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

// Polyfills for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize markdown parser
const md = new MarkdownIt();

// Input and output directories
const POSTS_DIR = path.join(__dirname, '../src/posts');
const OUTPUT_FILE = path.join(__dirname, '../src/data/headings.json');

// Function to extract headings
const extractHeadings = (markdown) => {
  const tokens = md.parse(markdown, {});
  const headings = [];

  tokens.forEach((token, index) => {
    if (token.type === 'heading_open' && (token.tag === 'h1' || token.tag === 'h2')) {
      const textToken = tokens[index + 1];
      if (textToken && textToken.type === 'inline') {
        headings.push({
          level: token.tag, // h1 or h2
          text: textToken.content, // Heading text
        });
      }
    }
  });

  return headings;
};

// Main function to process markdown files
const processMarkdownFiles = () => {
  const result = {};

  const files = fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith('.md'));

  files.forEach((file) => {
    const filePath = path.join(POSTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { content: markdownContent } = matter(content);

    const headings = extractHeadings(markdownContent);

    result[file] = headings;
  });

  // Write to JSON file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));
  console.log('Headings extracted successfully:', OUTPUT_FILE);
};

processMarkdownFiles();
