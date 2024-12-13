/*
This script extracts all the markdown files in the postsDir and 
renders it into .html using the markdown-it library. It then writes
the results into /root/public/generated. 
*/

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter'); // Use gray-matter to parse frontmatter
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

const postsDir = path.join('/', 'myapp', 'src', 'posts');
const outputDir = path.join('/', 'myapp', 'public', 'generated');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Process each Markdown file
fs.readdirSync(postsDir).forEach(file => {
  if (path.extname(file) === '.md') {
    const markdown = fs.readFileSync(path.join(postsDir, file), 'utf8');

    // Use gray-matter to strip frontmatter
    const parsed = matter(markdown); // parsed.content contains the clean Markdown content

    // Render the Markdown content (excluding frontmatter) to HTML
    const html = md.render(parsed.content);

    // Save the rendered HTML
    const outputFile = path.join(outputDir, file.replace('.md', '.html'));
    fs.writeFileSync(outputFile, html, 'utf8');
    console.log(`Processed: ${file} -> ${outputFile}`);
  }
});
