import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define the directory containing the Markdown files
const postsDir = path.resolve('src', 'posts');

// Output JSON file
const outputFile = path.resolve('src', 'data', 'blog-frontmatter.json');

// Utility function to trim text to the first 150 words
const trimToWords = (text, wordCount) => {
  return text.split(/\s+/).slice(0, wordCount).join(' ') + (text.split(/\s+/).length > wordCount ? '...' : '');
};

async function extractFrontmatter() {
  try {
    // Read all files in the Markdown directory
    const files = await fs.readdir(postsDir);

    const postsData = [];

    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(postsDir, file);
        const fileContent = await fs.readFile(filePath, 'utf8');

        // Parse the frontmatter using gray-matter
        const { data: frontmatter } = matter(fileContent);

        // Add the frontmatter and slug to the JSON object
        postsData.push({
          slug: file.replace(/\.md$/, ''), // Use the filename as the slug
          title: frontmatter.title || 'Untitled',
          topic: frontmatter.topic || 'Miscellaneous', // Default topic
          date: frontmatter.date,
          preview: trimToWords(frontmatter.preview || 'Preview not available.', 150), // Trim preview or fallback to content
        });
      }
    }

    // Write the extracted data to the JSON file
    await fs.writeFile(outputFile, JSON.stringify(postsData, null, 2), 'utf8');

    console.log(`Extracted frontmatter saved to ${outputFile}`);
  } catch (error) {
    console.error('Error extracting frontmatter:', error);
  }
}

// Run the extraction
extractFrontmatter();
